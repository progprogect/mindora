import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import vm from 'node:vm'
import { describe, it } from 'node:test'
import { flowCancelPath, flowFunnelSource } from './funnelKits.js'
import {
  createFunnelSession,
  flowLandingPath,
  signFunnelToken,
  verifyFunnelToken,
} from './funnelToken.js'
import { isFunnelPriceVariant, kitPricing, pricePayload } from './funnelVariant.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const read = (rel: string) => readFileSync(path.join(root, rel), 'utf8')

/** Text a visitor can see: no HTML / CSS / JS comments. */
function withoutComments(html: string): string {
  return html.replace(/<!--[\s\S]*?-->/g, '').replace(/\/\*[\s\S]*?\*\//g, '')
}

const BASE_ONLY = /\$ ?1(?!\d|[.,]\d)|\$391\.95|\$390\.95/
const OFFER_ONLY = /\$4\.99|\$500|\$495\.01/

describe('price variants: table', () => {
  it('base is the original $1 funnel, offer is $4.99 / $500 / $495.01', () => {
    assert.deepEqual(
      [kitPricing().cents, kitPricing().display, kitPricing().oldTotal, kitPricing().savings, kitPricing().off],
      [100, '$1', '$391.95', '$390.95', '−99%'],
    )
    const offer = kitPricing('offer')
    assert.deepEqual(
      [offer.cents, offer.display, offer.value, offer.oldTotal, offer.savings, offer.off],
      [499, '$4.99', 4.99, '$500', '$495.01', '−99%'],
    )
    assert.equal(isFunnelPriceVariant('offer'), true)
    assert.equal(isFunnelPriceVariant('free'), false)
    assert.equal(pricePayload('offer').priceVariant, 'offer')
    assert.equal(pricePayload().priceVariant, '')
  })

  it('discount badge stays true for both variants (savings / total)', () => {
    for (const v of [undefined, 'offer'] as const) {
      const p = kitPricing(v)
      const total = Number(p.oldTotal.replace('$', ''))
      const saved = Number(p.savings.replace('$', ''))
      assert.equal(Math.floor((saved / total) * 100), 99)
    }
  })
})

describe('price variants: session token and paths', () => {
  it('the variant survives signing and verification; unknown values are dropped', () => {
    const session = createFunnelSession({ kit: 'starter', flow: 'sub_out', step: 'membership', priceVariant: 'offer' })
    const back = verifyFunnelToken(signFunnelToken(session))
    assert.equal(back?.priceVariant, 'offer')

    const plain = verifyFunnelToken(signFunnelToken(createFunnelSession({ kit: 'starter', flow: 'sub_out', step: 'membership' })))
    assert.equal(plain?.priceVariant, undefined)

    const forged = { ...session, priceVariant: 'free' } as unknown as typeof session
    assert.equal(verifyFunnelToken(signFunnelToken(forged))?.priceVariant, undefined)
  })

  it('landing, cancel path and funnel source follow the variant; the original funnel is unchanged', () => {
    assert.equal(flowLandingPath('sub_out'), '/start-kit-sub-out')
    assert.equal(flowLandingPath('sub_out', 'offer'), '/start-kit-sub-out-offer')
    assert.equal(flowCancelPath('sub_out'), '/start-kit-sub-out')
    assert.equal(flowCancelPath('sub_out', 'offer'), '/start-kit-sub-out-offer')
    assert.equal(flowFunnelSource('sub_out'), 'start-kit-sub-out')
    assert.equal(flowFunnelSource('sub_out', 'offer'), 'start-kit-sub-out-offer')
    assert.equal(flowFunnelSource('sub_in'), 'start-kit-sub-in')
  })
})

describe('price variants: Stripe Checkout amount', () => {
  process.env.STRIPE_SECRET_KEY ||= 'sk_test_stub'

  async function checkoutAmount(priceVariant?: 'offer', withFlow = true) {
    const flow = withFlow ? ('sub_out' as const) : undefined
    const { getStripe } = await import('./stripe.js')
    const { createDollarCheckoutSession } = await import('./funnelCheckout.js')
    let params: any
    ;(getStripe() as unknown as Record<string, any>).checkout.sessions.create = async (p: unknown) => {
      params = p
      return { id: 'cs_stub', url: 'https://checkout.stripe.test/x' }
    }
    const c = { req: { url: 'http://localhost:3000/api/checkout', header: () => undefined } } as any
    const out = await createDollarCheckoutSession({
      c,
      kit: 'starter',
      productName: 'Mindora AI Starter Kit',
      productDescription: 'desc',
      lang: 'en',
      cancelPath: flow ? flowCancelPath(flow, priceVariant) : '/start-kit',
      metadata: { kit: 'starter' },
      flow,
      priceVariant,
    })
    return { params, out }
  }

  it('offer charges 499 cents, tags the metadata and returns to the offer landing on cancel', async () => {
    const { params, out } = await checkoutAmount('offer')
    assert.equal(params.line_items[0].price_data.unit_amount, 499)
    assert.equal(params.metadata.price_variant, 'offer')
    assert.equal(params.metadata.flow, 'sub_out')
    assert.match(params.cancel_url, /\/en\/start-kit-sub-out-offer\?cancelled=1$/)
    assert.equal(verifyFunnelToken(out.token)?.priceVariant, 'offer')
  })

  it('without a variant it is still $1 and carries no price_variant', async () => {
    const { params, out } = await checkoutAmount(undefined)
    assert.equal(params.line_items[0].price_data.unit_amount, 100)
    assert.equal(params.metadata.price_variant, undefined)
    assert.match(params.cancel_url, /\/en\/start-kit-sub-out\?cancelled=1$/)
    assert.equal(verifyFunnelToken(out.token)?.priceVariant, undefined)
  })

  it('a variant never applies to a funnel without a flow', async () => {
    const { params } = await checkoutAmount('offer', false)
    assert.equal(params.line_items[0].price_data.unit_amount, 100)
    assert.equal(params.metadata.price_variant, undefined)
  })
})

describe('price variants: pages show the right price everywhere', async () => {
  const { applyPriceTokens } = await import('../routes/funnelPages.js')
  const landing = read('funnel-pages/landing-sub-out.html')

  it('offer landing has no $1, $391.95 or $390.95 left in the visible text', () => {
    const html = withoutComments(applyPriceTokens(landing, 'offer'))
    assert.equal(html.includes('{{'), false, 'unfilled placeholder')
    const leftovers = html.split('\n').filter((line) => BASE_ONLY.test(line))
    assert.deepEqual(leftovers, [])
    assert.match(html, /Start for \$4\.99/)
    assert.match(html, /You save \$495\.01/)
    assert.match(html, /<s>\$500<\/s>/)
    assert.match(html, /Today: \$4\.99/)
    assert.match(html, /name="description" content="[^"]*for \$4\.99\./, 'link preview description')
    assert.match(html, /Same \$4\.99\./)
  })

  it('the original landing still shows $1 / $391.95 / $390.95 and nothing of the offer', () => {
    const html = withoutComments(applyPriceTokens(landing, undefined))
    assert.equal(html.includes('{{'), false)
    assert.equal(OFFER_ONLY.test(html), false)
    assert.match(html, /Start for \$1</)
    assert.match(html, /You save \$390\.95/)
    assert.match(html, /<s>\$391\.95<\/s>/)
    assert.match(html, /−99%/)
  })

  it('pages shared by both variants do not hard-code the kit price', () => {
    const member = withoutComments(read('funnel-pages/membership-sub-out.html'))
    assert.equal(/value: ?1\.00/.test(member), false, 'purchase value must come from FUNNEL.priceValue')
    assert.match(member, /FUNNEL\.priceValue/)
    assert.equal(/\$ ?1(?!\d|[.,]\d)/.test(member), false)
    assert.equal(/\$ ?1(?!\d|[.,]\d)/.test(withoutComments(read('funnel-pages/onboard.html'))), false)
    assert.equal(/\$ ?1(?!\d|[.,]\d)/.test(withoutComments(read('funnel-pages/verify.html'))), false)
  })

  it('the landing sends the variant with the checkout request', () => {
    assert.match(landing, /price_variant: \(window\.FUNNEL && FUNNEL\.priceVariant\)/)
  })

  it('RU translation of the offer landing keeps the offer price', () => {
    const src = read('public/funnel-assets/i18n.js')
    const ru = JSON.parse(/var RU = (\{.*\});\n/.exec(src)![1]!) as Record<string, string>
    const slice = src.slice(src.indexOf('var PRICE_PAIRS'), src.indexOf('var orig=new WeakMap'))
    const tr = new vm.Script(`(function(window,RU,PATTERNS){${slice};return tr;})`).runInThisContext() as (
      w: unknown,
      r: unknown,
      p: unknown,
    ) => (s: string) => string | null
    const offer = tr({ FUNNEL: pricePayload('offer') }, ru, [])
    const base = tr({ FUNNEL: pricePayload() }, ru, [])
    assert.equal(offer('Start for $4.99'), 'Начать за $4.99')
    assert.equal(offer('You save $495.01 · yours forever'), 'Экономия $495.01 · навсегда ваше')
    assert.equal(offer('Mindora Academy — Start for $4.99'), 'Mindora Academy — начните за $4.99')
    assert.equal(offer('15 minutes a day. $4.99 to start.'), '15 минут в день. $4.99 на старт.')
    assert.equal(offer('pack, free. Same $4.99.'), 'бесплатно. Всё тот же $4.99.')
    assert.equal(offer('. Start with 6 AI courses for $4.99.'), '. Начните с 6 AI-курсов за $4.99.')
    // Unrelated dollar amounts are never rewritten.
    assert.equal(offer('Instead of $1,716+'), 'Вместо $1 716+')
    assert.equal(offer('Each Mindora course sells for $39 on its own. Separately, the same program costs over $1,700.'),
      'Каждый курс Mindora отдельно стоит $39. По отдельности та же программа стоит больше $1 700.')
    // The original funnel translates exactly as before.
    assert.equal(base('Start for $1'), 'Начать за $1')
    assert.equal(base('You save $390.95 · yours forever'), 'Экономия $390.95 · навсегда ваше')
  })
})

describe('price variants: e-mails', async () => {
  process.env.AUTH_RESEND_KEY ||= 're_test_stub'
  const sent: { subject: string; text: string; html: string }[] = []
  const realFetch = globalThis.fetch
  globalThis.fetch = (async (_url: unknown, init?: { body?: string }) => {
    const body = JSON.parse(String(init?.body ?? '{}'))
    sent.push({ subject: body.subject, text: body.text ?? '', html: body.html ?? '' })
    return new Response(JSON.stringify({ id: 'mail_stub' }), { status: 200, headers: { 'content-type': 'application/json' } })
  }) as typeof fetch

  const mail = await import('successwise-app/mail')

  it('receipt for $4.99 names the real amount; the $1 receipt keeps its wording', async () => {
    sent.length = 0
    await mail.sendTrialReceiptEmail({ to: 'a@example.test', amountCents: 499, paidAt: new Date(), locale: 'en' })
    await mail.sendTrialReceiptEmail({ to: 'b@example.test', amountCents: 499, paidAt: new Date(), locale: 'ru' })
    await mail.sendTrialReceiptEmail({ to: 'c@example.test', amountCents: 100, paidAt: new Date(), locale: 'en' })
    assert.equal(sent.length, 3)
    const [en, ru, one] = sent
    assert.match(en!.subject, /\$4\.99/)
    assert.match(en!.text, /Your \$4\.99 receipt/)
    assert.match(en!.text, /receipt for \$4\.99:/)
    assert.equal(/one dollar|\$1 receipt/.test(en!.text + en!.html), false)
    assert.match(ru!.text, /Ваш чек на \$4\.99/)
    assert.equal(/один доллар/.test(ru!.text + ru!.html), false)
    assert.match(one!.text, /Your \$1 receipt/)
    assert.match(one!.text, /receipt for one dollar/)
  })

  it('the duplicate-payment e-mail refunds the amount that was paid', async () => {
    sent.length = 0
    const link = 'https://example.test/x'
    await mail.sendFunnelAccessEmail({ to: 'a@example.test', link, kind: 'access', locale: 'en', amountCents: 499 })
    await mail.sendFunnelAccessEmail({ to: 'b@example.test', link, kind: 'access', locale: 'ru', amountCents: 499 })
    await mail.sendFunnelAccessEmail({ to: 'c@example.test', link, kind: 'access', locale: 'en' })
    assert.match(sent[0]!.text, /the \$4\.99 payment will be refunded/)
    assert.match(sent[1]!.text, /платёж в \$4\.99 будет возвращён/)
    assert.match(sent[2]!.text, /the \$1 payment will be refunded/)
    globalThis.fetch = realFetch
  })
})
