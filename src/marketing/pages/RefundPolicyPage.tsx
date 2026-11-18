import { useEffect } from 'react'
import { useI18n } from '../../../authorisation/src/i18n/I18nProvider'
import refundPolicyEn from '@/marketing/data/refundPolicyHtml/en.html?raw'
import refundPolicyRu from '@/marketing/data/refundPolicyHtml/ru.html?raw'
import usePageTitle from '@/marketing/hooks/usePageTitle'

// Static policy text supplied as ready-made HTML (update_181126). Source files: src/marketing/data/refundPolicyHtml/.
const PAGES = {
  en: {
    html: refundPolicyEn,
    title: 'Refund Policy — Mindora Academy',
    description: 'Mindora Academy refund and subscription cancellation terms: what can and cannot be refunded.',
  },
  ru: {
    html: refundPolicyRu,
    title: 'Политика возврата — Mindora Academy',
    description: 'Условия возврата и отмены подписки Mindora Academy: что можно вернуть, а что нет.',
  },
} as const

const META_SELECTORS = {
  description: 'meta[name="description"]',
  'og:title': 'meta[property="og:title"]',
  'og:description': 'meta[property="og:description"]',
} as const

function useRefundMeta(title: string, description: string) {
  useEffect(() => {
    const values = { description, 'og:title': title, 'og:description': description }
    const restore: Array<() => void> = []
    for (const [key, selector] of Object.entries(META_SELECTORS)) {
      let el = document.head.querySelector<HTMLMetaElement>(selector)
      if (el) {
        const prev = el.content
        restore.push(() => {
          el!.content = prev
        })
      } else {
        el = document.createElement('meta')
        if (key === 'description') el.name = key
        else el.setAttribute('property', key)
        document.head.appendChild(el)
        const created = el
        restore.push(() => created.remove())
      }
      el.content = values[key as keyof typeof values]
    }
    return () => restore.forEach((fn) => fn())
  }, [title, description])
}

export default function RefundPolicyPage() {
  const { locale } = useI18n()
  const page = PAGES[locale === 'ru' ? 'ru' : 'en']
  usePageTitle(page.title)
  useRefundMeta(page.title, page.description)

  return (
    <>
      <style>{'.refund-policy a{color:#15803d}.refund-policy a:hover{color:#166534}'}</style>
      <div className="refund-policy" dangerouslySetInnerHTML={{ __html: page.html }} />
    </>
  )
}
