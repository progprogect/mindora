import type { MarketingLocale } from '@/marketing/data/moneyBack'

export type TermsLinkRoute = 'privacy' | 'billing' | 'refund' | 'cookie' | 'contact' | 'terms'

export type TermsInlinePart =
  | { kind: 'text'; value: string }
  | { kind: 'extWebsite' }
  | { kind: 'moneyBackDays' }
  | { kind: 'link'; route: TermsLinkRoute; label: string }
  | { kind: 'strong'; value: string }

export type TermsParagraphContent = string | TermsInlinePart[]

export type TermsBlock =
  | { kind: 'p'; content: TermsParagraphContent }
  | { kind: 'h3'; text: string }
  | { kind: 'ul'; items: TermsParagraphContent[] }
  | { kind: 'companyDetails' }

export type TermsSection = {
  title: string
  blocks: TermsBlock[]
}

export type TermsPageCopy = {
  pageTitle: string
  heroTitle: string
  updated: string
  sections: TermsSection[]
}

const EN_SECTIONS: TermsSection[] = [
  {
    title: 'Company Information',
    blocks: [
      {
        kind: 'p',
        content: [
          { kind: 'text', value: 'Thank you for visiting our website ' },
          { kind: 'extWebsite' },
          { kind: 'text', value: ' (hereinafter referred to as the “Website”).' },
        ],
      },
      { kind: 'companyDetails' },
      {
        kind: 'p',
        content:
          'Note: In this document, the terms “Company”, “we”, “us”, and “our” refer to the above-mentioned legal entity. “Service” refers to the above-mentioned service name, including the Website and all related services.',
      },
      {
        kind: 'p',
        content:
          'Before using any function of the Website or any products and services available through the Website, please take the time to carefully read and understand these Terms and Conditions (hereinafter referred to as the “Terms”), as these Terms govern all relationships between you (hereinafter referred to as the “User”, “you”, or “Customer”) and us.',
      },
      {
        kind: 'p',
        content:
          'The Company makes no representations that the Service is available, suitable, or legally available for use in your jurisdiction, and access to and use of the Service are prohibited in territories where such use would be unlawful. You access the Service on your own initiative and are responsible for complying with local laws.',
      },
      {
        kind: 'p',
        content:
          'Please do not continue to make any purchases on the Website if you have not carefully read and understood the provisions of these Terms, because whenever you purchase anything from us, these Terms will be considered a legally binding agreement between you and us, so it is important that you are fully aware of all the terms set forth herein.',
      },
      {
        kind: 'p',
        content:
          'The Website includes subscriptions that automatically renew. Please carefully read these Terms of Use (“Terms”) before starting a trial or completing the purchase of an automatically renewing subscription service on our Website.',
      },
      {
        kind: 'p',
        content:
          'To avoid being charged, you must expressly cancel your subscription at least 24 hours before the end of the trial period or current subscription period.',
      },
      {
        kind: 'p',
        content:
          'When purchasing an automatically renewing subscription, you agree to the nature of the automatic renewal and its terms, as specified near the place of purchase, and acknowledge that in order to avoid being charged, you must cancel the subscription.',
      },
      {
        kind: 'p',
        content:
          'Regardless of where you purchased your subscription, if you do not know how to cancel your subscription or trial, please contact our customer support service on the Website or by email.',
      },
      {
        kind: 'p',
        content:
          'We also strive to provide information about our subscription policy at or near the place of purchase. Please review these rules before making purchases. You may print this information for your reference.',
      },
      {
        kind: 'p',
        content: [
          { kind: 'text', value: 'Our privacy rules are detailed in our ' },
          { kind: 'link', route: 'privacy', label: 'Privacy Policy' },
          {
            kind: 'text',
            value: '. Please read it to understand how your personal information is collected, used, and shared.',
          },
        ],
      },
    ],
  },
  {
    title: '1. Acceptance of Terms',
    blocks: [
      {
        kind: 'p',
        content:
          '1.1. These Terms govern the relationship between you and the Company regarding your use of the Service, including the Website, your Mindora Academy account, the learning platform and related services (“Service”), including all information, text, graphics, software, and services available for your use (“Content”).',
      },
      {
        kind: 'p',
        content:
          '1.2. These Terms establish legally binding contractual relations between you and the Company. Accordingly, PLEASE READ THE TERMS CAREFULLY BEFORE USING THE SERVICE.',
      },
      {
        kind: 'p',
        content:
          '1.3. To create a profile and use the Service, you must be at least 18 years old. We do not guarantee that our Digital Content and other Services will be suitable and useful for everyone, therefore, before making any purchases on the Website, please individually assess whether the Service is personally suitable for you.',
      },
      {
        kind: 'p',
        content: [
          { kind: 'text', value: '1.4. Please also review our ' },
          { kind: 'link', route: 'privacy', label: 'Privacy Policy' },
          { kind: 'text', value: ', ' },
          { kind: 'link', route: 'refund', label: 'Refund Policy' },
          { kind: 'text', value: ', ' },
          { kind: 'link', route: 'billing', label: 'Billing & Plans' },
          { kind: 'text', value: ' page and ' },
          { kind: 'link', route: 'cookie', label: 'Cookie Policy' },
          {
            kind: 'text',
            value: '. These documents and other additional terms are expressly incorporated into this document by reference.',
          },
        ],
      },
      {
        kind: 'p',
        content:
          '1.5. Any translation from this language version is provided solely for your convenience. In the event of discrepancies, this language version shall prevail.',
      },
      {
        kind: 'p',
        content:
          '1.6. To the extent permitted by applicable law, we may modify these Terms. We will notify you of material changes as required by applicable law. Terms in force at the time of a particular purchase continue to apply to that purchase.',
      },
      {
        kind: 'p',
        content:
          '1.7. If you do not agree with the changes, stop using the Service, delete your account, or cancel your subscription before the changes take effect. By continuing to use the Service after the changes, you accept the updated Terms.',
      },
    ],
  },
  {
    title: '2. User Information',
    blocks: [
      {
        kind: 'p',
        content: '2.1 If you wish to use the Services, you must meet the following requirements:',
      },
      {
        kind: 'ul',
        items: [
          'You are at least 18 years old and have reached the legal age required to enter into distance contracts under the laws of your place of residence. The Website and the Service are designed and intended for use only by adults.',
          'You have read these Terms and agree to comply with them.',
          'You must provide us with your correct contact details, payment information, and other information necessary for the operation of the Service.',
          'You use a credit/debit/bank card or another payment method that belongs to you, or the card/payment method owner has authorized you to use the card, and such authorization was provided in the form required by the laws of your place of residence.',
        ],
      },
      {
        kind: 'p',
        content:
          '2.2 To use all functionality of the Website, Services, and Digital Content of the Service, you may be required to provide your personal data, such as your age, preferences, expectations, and aspirations regarding what you would like to achieve. Please note that we will only be able to provide you with high-quality personalized services if you provide us with truthful information.',
      },
      {
        kind: 'p',
        content:
          '2.3 Our Services are supplied as digital content and digital services. Supply begins when access to the purchased product is made available in your account, which normally happens immediately after payment is confirmed or, for a subscription with a trial, at the start of the trial. You may cancel your subscription at any time, and if you do so, we will not renew your subscription and will stop charging you for subsequent periods.',
      },
      {
        kind: 'p',
        content:
          '2.4 Please note that this Website, our Services, and any digital content you receive from us may only be used for your personal needs. You are not entitled to use the Website content, digital content, or our Services for resale, distribution, rental, or any other type of commercial use.',
      },
      {
        kind: 'p',
        content:
          '2.5 You may not use the Website or our Services for any illegal or unauthorized purposes and may not violate any laws while using the Service. All Website content and the content of all materials received from us (including graphic designs and other content) and the relevant parts belong to the Company and are protected by copyright laws. Any use of any copyrights for purposes other than personal use of Our Services, without a Provider’s license, constitutes copyright infringement.',
      },
    ],
  },
  {
    title: '3. Products, Prices and Payment Methods',
    blocks: [
      {
        kind: 'p',
        content:
          '3.1 The Service provides Customers with access to digital content developed according to users’ needs and preferences, including online artificial intelligence courses, educational materials, video lessons, practical assignments, guides, examples, prompts, planners, an AI coach and support (hereinafter referred to as the “Services”). The content of the Website and Services may change from time to time as we continuously update and improve them.',
      },
      {
        kind: 'p',
        content:
          '3.2 Types of purchases. Depending on the offer you choose, the Service may be purchased in one or more of the following forms. Different offers may combine these forms differently; for example, in some offers the initial payment (for example, US$1) is a one-time Entry Product with no subscription, while in other offers the initial payment (for example, US$1) is a paid trial that converts into a subscription. The offer page and payment screen always state which applies. The specific products, prices and terms available to you depend on the offer and the page (landing page) from which you make your purchase:',
      },
      {
        kind: 'ul',
        items: [
          [
            { kind: 'strong', value: 'Entry Products.' },
            {
              kind: 'text',
              value:
                ' One-time digital products offered at the start of an offer, for example the AI Starter Kit, Claude AI Guide Kit, Claude AI Learning Plan or 28-Day AI Plan, at the price shown on the offer page and in the checkout (for example, US$1). An Entry Product is charged once, does not renew and gives lifetime access to the content described in the offer. Purchasing an Entry Product does not by itself start a subscription.',
            },
          ],
          [
            { kind: 'strong', value: 'Paid trial subscription.' },
            {
              kind: 'text',
              value:
                ' A subscription that starts with a paid trial for a small fee (for example, US$1 for 7 days) and, unless cancelled before the trial ends, automatically converts into a paid subscription at the recurring price and billing period shown at the time of purchase (for example, US$29 per month). The trial fee, trial length and recurring price are shown on the offer page and payment screen before you confirm.',
            },
          ],
          [
            { kind: 'strong', value: 'Subscription (“Membership”) started after an Entry Product.' },
            {
              kind: 'text',
              value:
                ' Recurring access to the full Mindora Academy library and features described in the offer. A subscription is started only when you separately confirm it (for example, by clicking “Continue” or a similar button on the subscription offer page). A subscription may start with a free or paid trial (for example, 3 days) and then renews automatically at the recurring price and billing period shown at the time of purchase (for example, US$49.99 per month), until cancelled. We may offer alternative or discounted subscription plans (for example, US$29.99 per month) with their own terms.',
            },
          ],
          [
            { kind: 'strong', value: 'Add-ons and upgrades.' },
            {
              kind: 'text',
              value:
                ' Additional one-time products offered after your main purchase, for example AI Coach (“Ask Mindora”), the AI Prompt Library or Planners, including discounted versions of these offers. Add-ons are charged once, do not renew, give lifetime access to the purchased content and are independent of your subscription: they remain available if your subscription ends.',
            },
          ],
          [
            { kind: 'strong', value: 'Individual courses and certification programmes.' },
            {
              kind: 'text',
              value:
                ' Standalone courses purchased separately at the listed price, charged once with lifetime access to the purchased course.',
            },
          ],
          [
            { kind: 'strong', value: 'Earlier offers.' },
            {
              kind: 'text',
              value:
                ' Customers who purchased under earlier offers continue under the terms that applied at the time of their purchase until those terms end or the subscription is cancelled.',
            },
          ],
        ],
      },
      {
        kind: 'p',
        content:
          '3.3 Price shown at checkout governs. The product, amount, currency, billing period, trial terms and renewal terms shown on the offer page and payment screen before you confirm your purchase govern your order. Prices may differ between offers, landing pages, regions and promotions. A period already paid for is not repriced.',
      },
      {
        kind: 'p',
        content:
          '3.4 Please note that our educational and personalized Services are prepared and provided according to the information you provide to us. For this reason, we ask you to provide only accurate and truthful information about yourself. If you do not provide accurate information, we will not be able to provide educational and personalized Services that would correspond to you and your needs. Personalized plans and other Services received from us are suitable only for you because they will be created according to your personal information.',
      },
      {
        kind: 'p',
        content:
          '3.5 Our Services are intended solely for educational purposes and do not constitute professional advice in the fields of law, finance, investment, business, programming, or any other professional activity.',
      },
      {
        kind: 'p',
        content: [
          { kind: 'strong', value: '3.6 Automatic subscription renewal.' },
          {
            kind: 'text',
            value:
              ' By starting a subscription, you agree that your subscription automatically renews at the end of each billing period (weekly, monthly, quarterly, annually or otherwise, depending on the option you selected) until you cancel it. If you do not cancel your subscription, you authorize us to charge you for each renewal term. The renewal period will be the same as your initial subscription period unless otherwise specified at the time of purchase. Introductory, trial or discounted prices apply only for the period stated in the offer; after that, the regular recurring price shown at the time of purchase applies.',
          },
        ],
      },
      {
        kind: 'p',
        content:
          '3.7 Trials. We may offer a free or paid trial of the subscription. The trial length, its price (if any) and the price that applies after the trial are shown on the offer page before you confirm. If you do not cancel before the end of the trial, your subscription automatically converts to a paid subscription and you will be charged the recurring price for the selected billing period. We may send you a reminder before a trial ends. If no trial is indicated, you purchase the subscription without a trial period.',
      },
      {
        kind: 'p',
        content:
          '3.8 Saved payment method and one-click purchases. When you make your first purchase, your payment details are securely stored by our payment provider, Stripe. You authorize us to charge this saved payment method for: (a) subscription fees, including after a trial and on each renewal; and (b) any subscription, upgrade or add-on that you confirm on a subsequent offer page by clicking the purchase button (for example, “Continue”, “Add to my order” or “Yes, upgrade”), without re-entering your card details. Each such charge is made only after your confirmation, for the amount shown next to the button. Some banks may ask you to confirm a payment (for example, with 3-D Secure).',
      },
      {
        kind: 'p',
        content:
          '3.9 Plan changes and upgrades. Where available, you may switch between subscription plans. Unless otherwise shown at the time of the change, an upgrade to a higher plan takes effect immediately and the amount displayed at the time of the upgrade is charged at that moment; a downgrade or a switch to a lower-priced plan takes effect at the start of the next billing period. Moving between plans does not create a right to a refund of amounts already paid.',
      },
      {
        kind: 'p',
        content:
          '3.10 Price changes. To the maximum extent permitted by applicable law, we may change our prices at any time. Prices for new offers may change without notice. For existing subscribers, we will notify you in advance of any change to your recurring price by email or other prominent means, so that you can cancel before the change takes effect.',
      },
      {
        kind: 'p',
        content: [
          {
            kind: 'text',
            value:
              '3.11 Taxes. Prices may include or be subject to VAT or other sales taxes depending on your location. The total amount, including any applicable tax, is shown on the payment screen before you confirm. See also our ',
          },
          { kind: 'link', route: 'billing', label: 'Billing & Plans' },
          { kind: 'text', value: ' page.' },
        ],
      },
      {
        kind: 'p',
        content:
          '3.12 Please note that we will never apply any conversion rates or fees depending on the payment method you choose. However, some banks apply conversion rates to outgoing payments and international transfers – therefore, we are not responsible for any bank fees or conversion rates that your bank may apply to any payment made to Us. If you notice any differences between product prices on our Website or purchase receipt and the statement from your bank account, please contact your bank for a detailed explanation of any additional charges.',
      },
      {
        kind: 'p',
        content:
          '3.13 We accept payments by credit and debit cards and other payment methods offered in the Stripe checkout. We do not accept checks, cash, or other means of payment.',
      },
      {
        kind: 'p',
        content:
          '3.14 All prices are stated in United States dollars (USD) unless another currency is shown on the payment screen.',
      },
    ],
  },
  {
    title: '4. Discount Policy',
    blocks: [
      {
        kind: 'p',
        content: '4.1 From time to time, we may offer special discounts on plan and product prices. We may offer you a discount if:',
      },
      {
        kind: 'ul',
        items: [
          'You are using our Services for the first time, you may be eligible for a discount on your first purchase from us; and/or',
          'You provide us with your email address and agree to receive our newsletter; and/or',
          'You decline an offer during the purchase flow, in which case we may show you the same or a similar offer at a lower price.',
        ],
      },
      {
        kind: 'p',
        content:
          '4.2 Current discounts may change from time to time. We will provide more detailed information about the discount amount whenever we announce its availability.',
      },
      {
        kind: 'p',
        content:
          '4.3 We reserve the right to launch and cancel our discount programs and change discount amounts at any time, except where a specific period or time during which the discount will be available is specified in a particular discount advertisement, in which case we will provide the discount for the period stated in the advertisement.',
      },
      {
        kind: 'p',
        content:
          '4.4 A discounted or promotional price applies only to the product or period stated in the offer. A discounted Entry Product does not include a subscription; a subscription starts only if you separately confirm it on the subscription offer page.',
      },
    ],
  },
  {
    title: '5. Subscription Cancellation',
    blocks: [
      {
        kind: 'p',
        content:
          'Your subscription automatically renews at the end of each period until you cancel it. Please note that deleting the app, logging out or stopping using the Service does not cancel your subscription.',
      },
      {
        kind: 'p',
        content:
          '5.1 You can cancel your subscription at any time in the subscription section of your personal account on the Website or by contacting our customer support service at support@mindoraacademy.com. Your cancellation will take effect at the end of the trial or billing period that has already started.',
      },
      {
        kind: 'p',
        content:
          '5.2 To avoid being charged for the next period, please cancel before the next charge date shown in your account. We recommend cancelling at least 24 hours before the end of the trial or current billing period. After cancellation, you keep access until the end of the period already paid for and you will not be charged for subsequent periods.',
      },
      {
        kind: 'p',
        content: [
          {
            kind: 'text',
            value:
              '5.3 Cancelling a subscription stops future renewals. It does not by itself request a refund of a previous charge. Refunds are governed by Section 6 and our ',
          },
          { kind: 'link', route: 'refund', label: 'Refund Policy' },
          { kind: 'text', value: '.' },
        ],
      },
      {
        kind: 'p',
        content:
          '5.4 Cancellation during a trial. If you cancel during a free or paid trial, you will not be charged the recurring subscription price; a trial fee already paid is not refunded, to the extent permitted by applicable law. If you do not cancel before the end of the trial, your access will automatically continue and you will be charged as described in Section 3.7. Except where prohibited by law, we reserve the right to modify or terminate any trial offer and to limit your ability to use multiple trials.',
      },
      {
        kind: 'p',
        content:
          '5.5 Cancelling a subscription does not affect Entry Products, add-ons or individual courses you purchased: access to them continues on their own terms.',
      },
      {
        kind: 'p',
        content:
          '5.6 If a subscription payment fails, we may retry the payment and notify you. If the payment is not completed, we may suspend or end your subscription access.',
      },
      {
        kind: 'p',
        content:
          '5.7 If you wish to close your account immediately, please let us know and your account will be closed; however, amounts already paid are not refunded except as described in Section 6 and our Refund Policy.',
      },
    ],
  },
  {
    title: '6. Refunds',
    blocks: [
      {
        kind: 'p',
        content:
          '6.1 General rule. Our Services are digital content and digital services that are made available immediately after purchase, and materials offered for download can be saved straight away. For this reason, the price does not depend on how much of the content you use or how quickly you use it. Once access has been provided, purchases are generally non-refundable because you changed your mind or your plans, did not use the materials, or used or downloaded them quickly, to the extent permitted by applicable law.',
      },
      { kind: 'p', content: '6.2 Rules by type of purchase:' },
      {
        kind: 'ul',
        items: [
          [
            { kind: 'strong', value: 'Entry Products.' },
            {
              kind: 'text',
              value:
                ' Entry Products are non-refundable once access has been provided, to the extent permitted by applicable law.',
            },
          ],
          [
            { kind: 'strong', value: 'Paid trials.' },
            {
              kind: 'text',
              value:
                ' The trial fee (for example, US$1) is non-refundable once access has been provided, to the extent permitted by applicable law. If you cancel before the trial ends, you will not be charged the recurring subscription price.',
            },
          ],
          [
            { kind: 'strong', value: 'Subscriptions.' },
            {
              kind: 'text',
              value:
                ' A trial or billing period that has already started is non-refundable, including automatic renewals, and partial or prorated refunds are not provided, to the extent permitted by applicable law. You may cancel at any time to stop future charges.',
            },
          ],
          [
            { kind: 'strong', value: 'Plan changes and upgrades.' },
            {
              kind: 'text',
              value:
                ' Amounts charged for an upgrade or plan change are non-refundable once the new plan is active, to the extent permitted by applicable law.',
            },
          ],
          [
            { kind: 'strong', value: 'Add-ons.' },
            {
              kind: 'text',
              value:
                ' Add-ons (for example, AI Coach, AI Prompt Library, Planners) are non-refundable once access has been provided, to the extent permitted by applicable law.',
            },
          ],
          [
            { kind: 'strong', value: 'Individual courses.' },
            {
              kind: 'text',
              value:
                ' You may request a refund for an individual course or certification programme purchased separately within 14 calendar days from the date of payment.',
            },
          ],
        ],
      },
      {
        kind: 'p',
        content:
          '6.3 Changes in price, promotional period, content assortment, or temporary unavailability of individual features (less than 24 hours) are not grounds for a refund.',
      },
      {
        kind: 'p',
        content:
          '6.4 Exceptions. This Section does not limit your mandatory rights under applicable consumer law, including rights relating to digital content that is not supplied, is faulty or is not as described, and does not exclude refunds for duplicate, incorrect or unauthorised charges. Where we confirm a duplicate charge, an incorrect charge, or a technical error on our side that prevented you from accessing a paid product, we will refund or otherwise resolve the affected charge.',
      },
      {
        kind: 'p',
        content:
          '6.5 Consumer rights. Consumers in the United Kingdom and the European Union generally have a 14-day right to cancel distance contracts. For digital content, this right may be lost once supply has begun where the legal requirements for this are met. Where mandatory law gives you a right to cancel or to a proportionate refund (including any cooling-off rights for subscriptions that may apply in your country), we will honour that right.',
      },
      {
        kind: 'p',
        content:
          '6.6 Earlier purchases and additional guarantees. Any guarantee or refund terms expressly stated for your purchase at the time you made it continue to apply to that purchase on their stated terms. This version of the Terms does not reduce the refund terms of purchases made before its effective date.',
      },
      {
        kind: 'p',
        content: [
          {
            kind: 'text',
            value:
              '6.7 Refunds are issued only to the original payment method used for the purchase. For full details on how to request a refund, see our ',
          },
          { kind: 'link', route: 'refund', label: 'Refund Policy' },
          { kind: 'text', value: '.' },
        ],
      },
    ],
  },
  {
    title: '7. Personal Data and Contacts',
    blocks: [
      {
        kind: 'p',
        content:
          '7.1 To protect your personal information, we take reasonable precautions and follow industry best practices to ensure that it is not improperly lost, misused, accessed, disclosed, altered, or destroyed.',
      },
      {
        kind: 'p',
        content:
          '7.2 Your personal information may be used to assist us in our research and further development of the Services. In addition, we are permitted to collect and use information that you provide to us while using our Services. However, under no circumstances will we use your image or any personal data for purposes other than the development of our products and services.',
      },
      {
        kind: 'p',
        content:
          '7.3. If you choose to leave us feedback, you agree that we may display it on our Website for 5 years after receiving it from you. We will not state your real name or will only indicate your initials in the review unless you specifically instruct us that we may state your full name.',
      },
      {
        kind: 'p',
        content:
          '7.4 Please note that we may contact you by phone or email if we need to confirm any details of your order or if your order request was not successfully processed for technical reasons. If your order was not completed due to payment processing errors or other reasons, we may send you a text message or email reminding you to complete the necessary actions, or we may contact you by phone if you have provided your phone number.',
      },
      {
        kind: 'p',
        content: [
          {
            kind: 'text',
            value:
              '7.5 We guarantee that all personal data will be collected and processed in accordance with all applicable laws. To learn more about how we use and process personal data, please review our ',
          },
          { kind: 'link', route: 'privacy', label: 'Privacy Policy' },
          { kind: 'text', value: '.' },
        ],
      },
    ],
  },
  {
    title: '8. Rules of Conduct',
    blocks: [
      {
        kind: 'p',
        content:
          '8.1 You may not use our Services and/or Website for any illegal or unauthorized purposes or violate any laws when using the Website. All content of the Website and all materials received from us, as well as the relevant parts of the Website, belong to the Company and are protected by copyright laws. Any use of any copyrights for purposes other than personal use without our license constitutes a violation of our copyrights or other intellectual property rights.',
      },
      {
        kind: 'p',
        content:
          '8.2 We have the right, but not the obligation, to investigate any illegal and/or unauthorized use of the Website and take appropriate legal action, including, but not limited to, civil remedies and injunctive relief, if we have reason to believe that you are violating these Terms or applicable law. When using the Website, you must:',
      },
      {
        kind: 'ul',
        items: [
          'Not use the Website or any of its content for any illegal purpose or in violation of any local, state, national, or international law',
          'Not violate or encourage others to violate the rights of third parties, including intellectual property rights',
          'Comply with all rules posted on the Website',
          'Not transfer, legally or factually, your registered account to any other person without our written consent',
          'Provide us with honest and accurate information',
          'Not use the Website or any of its content for any commercial purposes, including the distribution of any advertising or solicitation',
          'Not reformat or mirror any portion of any Website web page',
          'Not create any links or redirects to the Website through other websites or emails without our prior written consent',
          'Not attempt to interfere with the proper functioning of the Website or the use of the Website by other users',
          'Commercial resale, distribution, or transfer of any Products you purchase from us is prohibited',
          'Not interfere in any way with the security-related functions of the Website',
          'Not access, monitor, or copy any content or information from the Website using any robots, spiders, scrapers, or other automated means or any manual processes for any purpose without our express written permission',
          'Not falsely state an affiliation, access other users’ accounts without authorization, or falsify your identity or any information about yourself, including age or date of birth',
          'Not engage in any other activity that would violate these Terms or applicable law',
        ],
      },
      {
        kind: 'p',
        content:
          '8.3 We have the right to immediately terminate your Subscription without a refund and/or restrict your access to the Website if we have reason to believe that: (a) you do not meet the requirements specified in Section 2.1; (b) you have violated any provision of Section 8.1; or (c) you use the Website or any of its content in any other illegal manner or cause harm to the Website or other Website users.',
      },
      {
        kind: 'p',
        content:
          '8.4. By using the Service, you represent and warrant that: you have legal capacity and agree to comply with these Terms; you are 18 years old; you will not access the Service through automated or non-human means, whether by bot, script, or otherwise; you will not use the Service for any illegal or unauthorized purposes; and your use of the Service will not violate any applicable laws or regulations. If you provide any information that is false, inaccurate, outdated, or incomplete, we have the right to refuse any current or future use of the Service (or any part thereof).',
      },
      {
        kind: 'p',
        content:
          '8.5 You may not access or use the Service for any purpose other than those for which we provide the Service. The Service may not be used for any commercial purposes except those specifically permitted or approved by us.',
      },
      { kind: 'p', content: '8.7 As a user of the Service, you agree not to:' },
      {
        kind: 'ul',
        items: [
          'systematically obtain data or other content from the Service to create or compile, directly or indirectly, a collection, compilation, database, or directory without our written permission',
          'engage in any unauthorized use of the Service',
          'make any modifications, adaptations, improvements, additions, translations, or derivative works from the Service',
          'use the Service for any income-generating purposes, commercial enterprises, or other purposes for which it is not intended or designed',
          'make the Service available through a network or other environment that allows access or use by multiple devices or users simultaneously',
          'use the Service to create a product, service, or software that directly or indirectly competes with or in any way replaces the Service',
          'use any confidential information or any of our interfaces or other intellectual property in designing, developing, manufacturing, licensing, or distributing any applications, accessories, or devices for use with the Service; circumvent, disable, or otherwise interfere with the security-related features of the Service',
          'engage in unauthorized framing or linking to the Service',
          'interfere with, disrupt, or create an excessive load on the Service or networks or services connected to the Service',
          'attempt to circumvent any Service measures designed to prevent or limit access to the Service or any part thereof',
          'upload or distribute in any way files containing viruses, worms, trojans, corrupted files, or any other similar software or programs that may harm the operation of another person’s computer',
          'use, launch, develop, or distribute any automated system, including, without limitation, any spider, robot, cheat utility, scraper, or autonomous reader that accesses the Service, or use or launch any unauthorized script or other software',
          'use the Service to send automated requests to any website or to send unsolicited commercial emails',
          'demean, defame, or otherwise harm, in our opinion, us and/or the Service',
          'use the Service in a manner inconsistent with any applicable laws or regulations; or otherwise violate these Terms',
        ],
      },
      {
        kind: 'p',
        content:
          '8.8 When communicating with representatives of our customer support service, we ask you to maintain respectful and kind behavior. If your behavior toward any of our customer support representatives or other employees is at any time perceived as threatening, harassing, or abusive, we reserve the right to immediately terminate your account and terminate the dialogue.',
      },
    ],
  },
  {
    title: '9. Disclaimer',
    blocks: [
      {
        kind: 'p',
        content:
          '9.1 Nothing on this Website is intended to provide professional legal, financial, investment, tax, or other specialized advice. We provide educational digital content dedicated to artificial intelligence, AI tools, technologies, and the practical use of such tools.',
      },
      {
        kind: 'p',
        content:
          'The Service may contain information about third-party AI platforms, software, artificial intelligence models, automation, content creation, and other technologies. We do not guarantee the continued availability, unchanged features, prices, or technical specifications of third-party services. Such products and services may change, cease to operate, change their terms of use, or become unavailable.',
      },
      {
        kind: 'p',
        content:
          'The Service is intended as an educational tool and may be useful for acquiring knowledge and practical skills in working with AI. However, we do not guarantee that use of the Service will result in a specific level of income, employment, cost savings, business growth, increased sales, or any other specific result.',
      },
      {
        kind: 'p',
        content:
          '9.2 You use the Website, Service, and any information contained therein solely at your own risk. We are not responsible for any losses or damages, including indirect, special, incidental, or punitive damages, arising from the use of the Website, Service, courses, materials, or information contained in or provided through the Service, including errors or omissions in such information.',
      },
      {
        kind: 'p',
        content:
          'All users who use our Services agree to independently evaluate the information received and make decisions regarding its application. Information about artificial intelligence and software may quickly become outdated because technologies, models, interfaces, prices, features, and terms of third-party services may change. We do not guarantee that the information presented in the courses will always be completely up to date for every third-party AI tool. When using third-party services, you must independently review their official documentation, terms of use, and limitations.',
      },
      {
        kind: 'p',
        content:
          'Use of the Service does not represent or create a professional consultant-client relationship between you and the Company unless otherwise expressly provided by a separate written agreement. The Service materials are not intended to replace advice from qualified professionals in the relevant fields.',
      },
      {
        kind: 'p',
        content:
          'The Company is not responsible for inaccuracies or distortions regarding your understanding of courses, lessons, practical assignments, or other Service content. You should carefully study all information provided on the platform and contact our support service if you have any questions.',
      },
      {
        kind: 'p',
        content:
          'Please note that the Service materials are intended solely for educational and informational purposes. They do not guarantee a specific professional, financial, or commercial result. It is important to understand that you independently make decisions regarding the application of the knowledge obtained and are responsible for the results of its use.',
      },
      {
        kind: 'p',
        content:
          '9.3 Each user’s level of preparation and goals differ, therefore we do not provide any guarantees that our Services will be equally suitable or effective for every user. We may personalize the recommendations and educational materials offered to you based on information obtained during registration or training.',
      },
      {
        kind: 'p',
        content:
          'We make every effort to provide high-quality educational materials; however, we do not guarantee that our courses, materials, and recommendations will provide a specific result. We make no guarantees regarding the level of success you may experience, and you accept the risk that results will vary for each individual. Testimonials and examples that may be provided in the Service are examples of specific results and are not intended to represent or guarantee that any user will achieve the same or similar results.',
      },
      {
        kind: 'p',
        content:
          'There is no guarantee that examples of past results can be reproduced in the future. Learning outcomes may vary and depend on many factors, including your initial level of knowledge, practice, tools selected, quality of assignment completion, consistency of learning, and changes in artificial intelligence technologies. Use of the Service should be at your own discretion, and you agree that the Company is not responsible for any success or failure that is directly or indirectly related to the purchase and use of the Service.',
      },
      {
        kind: 'p',
        content:
          '9.4 The Website may contain links to other websites maintained by third parties. Any information, products, software, or services provided on or through third-party websites are controlled by the operators of such websites, not by us or our affiliates. By accessing third-party websites, you do so at your own risk.',
      },
      {
        kind: 'p',
        content:
          '9.5 We respect the privacy of our customers, therefore all reviews and/or comments posted on the Website may contain fictional names and associated images. We know the identity of consumers, but we will never display the real names of our users unless the user gives consent to display their name and/or image.',
      },
      {
        kind: 'p',
        content:
          '9.6 Unless otherwise stated, this Website is our property, and all source code, databases, functionality, software, design, texts, photographs, and graphic images on the Website are owned or controlled by us and protected by copyright and trademark laws. Copying or using any Website content without our prior written permission is prohibited.',
      },
      {
        kind: 'p',
        content:
          '9.7 The services offered on or through the website are provided “as is” and without any warranties, whether express or implied. To the maximum extent permitted by applicable law, we disclaim all warranties, whether express or implied, including, but not limited to, implied warranties of merchantability and fitness for a particular purpose.',
      },
      {
        kind: 'p',
        content:
          '9.8 We do not guarantee that the website or any of its functions will operate uninterrupted or error-free, that defects will be corrected, or that any part of this website or the servers that make the website available are free of viruses or other harmful components. We expressly disclaim liability for any damage caused by any malfunction, error, omission, interruption, deletion, defect, delay in operation or transmission, computer virus, communication line failure, theft or destruction, or unauthorized access to, alteration of, or use of any record, whether resulting from breach of contract, tort, negligence, or any other cause of action. Each user specifically acknowledges that we are not liable for the defamatory, offensive, or unlawful conduct of other third parties, subscribers, members, or other users of the website and that the risk of harm resulting from the foregoing rests entirely with each user.',
      },
      {
        kind: 'p',
        content:
          '9.9 Any information presented on the Website is for educational and informational purposes only. The materials of the Service do not guarantee any specific result and should not be considered professional legal, financial, investment, tax, or other advice. You assume all risks associated with applying the information presented on the Website and in the Service.',
      },
      {
        kind: 'p',
        content:
          '9.10 We have made every effort to display the materials, images, interfaces, and descriptions of the services presented on the Website as accurately as possible. However, we cannot guarantee that the display of the materials on your device will fully correspond to their actual appearance, or that the interfaces or functions of third-party AI services will exactly correspond to those presented in our training materials.',
      },
    ],
  },
  {
    title: '10. Indemnification',
    blocks: [
      {
        kind: 'p',
        content:
          '10.1 You agree to indemnify, defend, and hold harmless us and our affiliates, as well as the respective officers, directors, owners, agents, information providers, and licensors, from and against any claims, liabilities, losses, damages, costs, and expenses (including attorneys’ fees) in connection with: (a) your use of or connection to Our website; (b) any use or alleged use of Your account or Your account password by any person, whether authorized by You or not; (c) the content of the information provided by You to Us; (d) your violation of the rights of any other individual or legal entity; (e) your violation of any applicable laws, rules, or regulations.',
      },
      {
        kind: 'p',
        content:
          '10.2 We reserve the right, at our own expense, to assume the defense and control of any matter otherwise subject to indemnification by you, and in such case, you agree to cooperate with us in the defense of such claim.',
      },
      {
        kind: 'p',
        content:
          '10.3 You agree to indemnify and hold harmless the Company, its successors, subsidiaries, affiliates, any related companies, its suppliers, licensors, and partners, as well as the officers, directors, employees, agents, and representatives of each of them, from liability, including costs and attorneys’ fees, arising from any claim or demand brought by any third party in connection with or as a result of your use of the Service or the Products, your User Content, or your violation of these Terms.',
      },
      {
        kind: 'p',
        content:
          '10.4 The Company reserves the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify us, and you agree to cooperate with our defense of such claims. You agree not to settle any matter without the Company’s prior written consent. The Company will use reasonable efforts to notify you of any such claims, actions, or proceedings as soon as it becomes aware of them.',
      },
    ],
  },
  {
    title: '11. Limitation of Liability',
    blocks: [
      {
        kind: 'p',
        content:
          '11.1 In no event shall we, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers, or licensors be liable for any errors, losses, lost profits, or other consequences, damages, claims, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind, including, without limitation, lost profits, lost revenue, lost savings, loss of data, replacement costs, or any similar damages, whether based in contract, tort (including negligence), strict liability, or otherwise, arising from your use of any of the service or any products purchased using the Services, or for any other claims in any way related to your use of the Services, including, but not limited to, any errors or omissions in any content, or any loss or damage of any kind incurred as a result of the use of the service or any content (or product) posted, transmitted, or otherwise made available through the Services, even if you have been advised of their possibility.',
      },
      {
        kind: 'p',
        content:
          '11.2 If You are dissatisfied with the Website, any materials, products, or services presented on the Website, or any terms of use of the Website, your sole remedy is to discontinue using the Website.',
      },
      {
        kind: 'p',
        content:
          '11.3 Under no circumstances shall we (and our affiliates) be liable to you or any third party for any lost profits or any indirect, consequential, exemplary, incidental, special, or punitive damages arising from these Terms or your use of or inability to use the Service (including the application or content) and third-party products or advertisements, even if we have been advised of the possibility of such damages. Access to and use of the Service (including the application, content, and User Content) and third-party advertisements are at your own discretion and risk, and you are solely responsible for any damage to your computer system or loss of data resulting therefrom.',
      },
      {
        kind: 'p',
        content:
          '11.4 Notwithstanding anything contained herein, you agree that the Company’s aggregate liability to you for any claims arising from the use of the application, content, Service, or Products is limited to the amount paid by you to the Company for access to and use of the Service. The limitations of damages set forth above are fundamental elements of the basis of the Terms between the Company and you.',
      },
      {
        kind: 'p',
        content:
          '11.5 If you are a resident of California, you hereby waive Section 1542 of the California Civil Code, which provides: “A general release does not extend to claims that the creditor or releasing party does not know or suspect exist in his or her favor at the time of executing the release and that, if known by him or her, would have materially affected his or her settlement with the debtor or released party.”',
      },
      {
        kind: 'p',
        content:
          '11.6 Some jurisdictions do not allow the limitation or exclusion of liability for incidental or consequential damages, so the above limitation or exclusion may not apply to you, and you may also have other legal rights that vary depending on the jurisdiction. If one or any aspect of the limitations set forth above does not apply, all other aspects shall remain in effect, even if any remedy is not applicable.',
      },
    ],
  },
  {
    title: '12. Intellectual Property',
    blocks: [
      {
        kind: 'p',
        content:
          '12.1 All intellectual property rights, including, without limitation, trademarks, copyrights, domain names, database rights, design rights, patents, and all other rights in any creations of any kind, whether registered or not (“Intellectual Property”) on the Website are protected by applicable intellectual property laws, including the Copyright, Designs and Patents Act 1988 (United Kingdom).',
      },
      {
        kind: 'p',
        content:
          '12.2 You may not copy, repurpose, or distribute any Intellectual Property or any other content obtained from us or found on the Website for any purpose without our express written permission. Without limiting the foregoing, use of our content for commercial purposes is prohibited unless you have our express written permission.',
      },
      {
        kind: 'p',
        content:
          '12.3 All Intellectual Property posted on the Website or provided to you in any other form belongs to the Company, except for third-party trademarks, service marks, or other materials that we use. None of such Intellectual Property may be used without our or the third party’s prior written consent, where such third party owns such Intellectual Property.',
      },
      {
        kind: 'p',
        content:
          '12.4 If you notice that any third party is using the Company’s Intellectual Property on their websites, please report such cases to our customer support service.',
      },
    ],
  },
  {
    title: '13. Governing Law and Disputes',
    blocks: [
      {
        kind: 'p',
        content:
          '13.1 If you have any complaints regarding the Website, charges, refunds, the quality of the Services, or anything related to the use of the Website, You must first contact our customer support service by email before taking any action through third parties. Please note that by agreeing to these Terms, you agree to contact us before requesting any refund from your bank or credit card provider, so as to give us an opportunity to resolve any issues you may have.',
      },
      {
        kind: 'p',
        content:
          '13.2 All complaints or claims submitted by you must be processed within 30 days of receipt. We always make every effort to resolve any complaint or claim positively. When contacting us with your complaints, you must always identify yourself using the same first and last name that you provided to us when making a purchase on the Website.',
      },
      {
        kind: 'p',
        content:
          '13.3 The legal relationship between you and us is governed by the laws of England and Wales. If you are a consumer, you also keep the benefit of any mandatory protections of the law of the country where you live.',
      },
      {
        kind: 'p',
        content:
          '13.4 To the extent permitted by applicable law, any claim must be brought in an individual capacity by the initiating party and not as a plaintiff or member of a class in any class action or other similar proceeding.',
      },
      {
        kind: 'p',
        content:
          '13.5 Initial Dispute Resolution. We are always interested in resolving disputes amicably and efficiently. If you have a dispute with the Company, you agree that, before taking any formal action, you will contact us by email and provide a brief written description of the dispute and your contact information. The parties agree to use their best efforts to resolve any dispute, claim, issue, or disagreement directly through consultation with the Company, and good faith negotiations shall be a condition precedent for either party. Participation in informal dispute resolution is a prerequisite that must be satisfied before commencing proceedings. The statute of limitations and any filing deadlines shall be observed while the parties participate in the informal dispute resolution process required by this clause.',
      },
      {
        kind: 'p',
        content:
          '13.6 Class Action Waiver and Collective Relief. To the extent permitted by applicable law, there shall be no right or authority for any claims to be heard in litigation on a class, joint, or consolidated basis or on grounds including claims brought in a purported representative capacity on behalf of the general public, other users of the Services, or any other persons. If we initiate proceedings against you and you are a consumer, we will pay all costs associated with the proceedings (but not your attorneys’ fees, if any). The parties are responsible for paying their own attorneys’ fees unless otherwise provided by the applicable rules and/or applicable law.',
      },
    ],
  },
  {
    title: '14. Miscellaneous',
    blocks: [
      {
        kind: 'p',
        content:
          '14.1 If any provision of these Terms is found to be unlawful, void, or unenforceable, such provision shall nevertheless be enforceable to the maximum extent permitted by applicable law, and the unenforceable portion shall be deemed severed from these Terms of Service; such determination shall not affect the validity and enforceability of any other remaining provisions. You may review the most current version of the Terms of Service at any time on this page. We reserve the right, at our sole discretion, to update, change, or replace any part of these Terms of Service by posting updates and changes on our website.',
      },
      {
        kind: 'p',
        content:
          '14.2 No delay or omission on our part in exercising any of our rights arising from any failure by you to comply with or perform your obligations under these Terms shall impair any such right or be construed as a waiver thereof, and the Company’s waiver of any covenant, condition, or agreement that you are required to perform shall not be construed as a waiver of any subsequent breach thereof or of any other covenant, condition, or agreement contained herein.',
      },
      {
        kind: 'p',
        content:
          '14.3 Subject to Section 13, if any provision of these Terms is found to be invalid or unenforceable, these Terms shall remain in full force and effect and shall be modified to become valid and enforceable while reflecting the intentions of the parties to the maximum extent permitted by law.',
      },
      {
        kind: 'p',
        content:
          '14.4 Unless otherwise expressly provided herein, these Terms constitute the entire agreement between you and the Company with respect to their subject matter and supersede all prior promises, agreements, or representations, whether written or oral, regarding such subject matter.',
      },
      {
        kind: 'p',
        content:
          '14.5 The Company may transfer or assign any and all of its rights and obligations under these Terms to any other person in any manner, including by novation, and by accepting these Terms, you consent to any such assignment and transfer by the Company. You acknowledge that posting on the Service a version of these Terms identifying another person as a party to the Terms constitutes valid notice to you of the transfer of the Company’s rights and obligations under the Terms (unless expressly stated otherwise).',
      },
      {
        kind: 'p',
        content:
          '14.6 All information transmitted through the Service shall be deemed an electronic communication. When you communicate with us through the Service or by using other forms of electronic means, such as email, you communicate with us electronically. You agree that we may communicate with you electronically and that such communications, as well as notices, disclosures, agreements, and other communications that we provide to you electronically, are equivalent to communications in writing and shall have the same force and effect as if they were made in writing and signed by the party sending the communication. You also agree that such communication may be carried out using third-party providers. You also acknowledge and agree that by clicking the “SUBMIT,” “CONTINUE,” “REGISTER,” “I AGREE,” or similar links or buttons, you are submitting a legally binding electronic signature and entering into a legally binding agreement. You acknowledge that your electronic submissions constitute your consent and intent to comply with these Terms. You hereby consent to the use of electronic signatures, contracts, orders, and other records, as well as to the electronic delivery of notices, policies, and records of transactions initiated or completed through the Service.',
      },
      {
        kind: 'p',
        content:
          '14.7 Under no circumstances shall the Company be liable for any failure to comply with these Terms to the extent such failure is caused by factors beyond the Company’s reasonable control.',
      },
    ],
  },
  {
    title: '15. Amendments',
    blocks: [
      {
        kind: 'p',
        content:
          '15.1 We reserve the right to make changes to these Terms at any time and at our sole discretion. Please check these Terms from time to time to ensure awareness of any new amendments. On this website, we will post any announcements regarding any changes and additions that will be made to the provisions of these Terms. Amendments shall not be retroactive and shall apply from the date of publication.',
      },
      {
        kind: 'p',
        content:
          '15.2 To the maximum extent permitted by applicable law, we may change the subscription fee at any time. We will notify you in advance of any such price changes by posting the new prices in or through the application and/or by sending you notice by email or by other prominent means. If you do not wish to pay the new fees, you may cancel the applicable subscription before the changes take effect.',
      },
    ],
  },
  {
    title: '16. Contact Information and Profile Registration',
    blocks: [
      {
        kind: 'p',
        content: '16.1 You may contact us using the details provided at the beginning of this Document.',
      },
      { kind: 'companyDetails' },
      {
        kind: 'p',
        content:
          '16.2. To use certain features of the Service, you may be required to register your profile (“Profile”) and provide certain information about yourself as requested in the registration form.',
      },
      {
        kind: 'p',
        content:
          '16.3. If you register a Profile, you represent and warrant to the Company that: all required registration information you provide is truthful and accurate; you will maintain the accuracy of such information; and your use of the Service does not violate any applicable laws or regulations or these Terms. Otherwise, the Service may not function properly, and we may be unable to contact you and provide important notices.',
      },
      {
        kind: 'p',
        content:
          '16.4. The Service is not intended for use by persons under the age of 18. By using the Services, you represent and warrant that you are at least 18 years old and have the right, authority, and legal capacity to enter into these Terms and comply with the provisions and conditions of these Terms.',
      },
      {
        kind: 'p',
        content:
          '16.5. The Company reserves the right to suspend or terminate your Profile or your access to the Service, with or without notice to you, in the event of your breach of these Terms.',
      },
      {
        kind: 'p',
        content:
          '16.6. You are responsible for maintaining the confidentiality of your Profile login credentials and are fully responsible for all activities that occur under your Profile. You agree to immediately notify the Company of any unauthorized use or suspected unauthorized use of your Profile or any other breach of security. The Company cannot and will not be liable for any loss or damage arising from your failure to comply with the foregoing requirements.',
      },
    ],
  },
  {
    title: '17. Governing Law and Venue',
    blocks: [
      {
        kind: 'p',
        content:
          '17.1 These Terms shall be governed by and construed in accordance with the laws of England and Wales.',
      },
      {
        kind: 'p',
        content:
          '17.2 The courts of England and Wales shall have jurisdiction over any dispute arising out of or in connection with these Terms. If you are a consumer living in Scotland or Northern Ireland, you may also bring proceedings in your local courts, and if you are a consumer living elsewhere, you may also bring proceedings in the courts of your country of residence where mandatory law gives you that right.',
      },
      {
        kind: 'p',
        content:
          '17.3 Nothing in this Section deprives a consumer of the protection of mandatory provisions of the law of their country of residence.',
      },
    ],
  },
  {
    title: '18. Additional Disclaimer of Warranties',
    blocks: [
      {
        kind: 'p',
        content:
          '18.1 General Disclaimer of Warranties. Except to the extent prohibited by law or otherwise inapplicable, you expressly understand and agree that you use the Service at your own risk, and the Service and Products are provided on an “as is” and “as available” basis. The Company and its affiliates, officers, employees, agents, partners, and licensors expressly disclaim all warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, and non-infringement, as well as any warranties regarding products or services offered by businesses listed on the Service.',
      },
      {
        kind: 'p',
        content: 'In particular, the released parties do not make and expressly disclaim any warranties that:',
      },
      {
        kind: 'ul',
        items: [
          'The Service will meet your requirements',
          'The Service will be uninterrupted, timely, secure, or error-free',
          'the results that may be obtained from the use of the Service, including data, will be accurate and reliable',
          'the quality of any data or services available through the Service will meet your expectations',
          'any errors in the Service will be corrected',
        ],
      },
      {
        kind: 'p',
        content:
          'Access to any material obtained through the Service is at your own discretion and risk, and you will be solely responsible for any damage to your computer system or mobile device or loss of data resulting from the use of any such material. We cannot guarantee and do not promise any specific results from the use of the Application and/or the Service. You also agree to assume the risk of the termination of the Service for any technical reasons.',
      },
      {
        kind: 'p',
        content:
          '18.2 No Service Advice. Any statement that may be posted on the Service is intended solely for informational and entertainment purposes and is not intended to replace or substitute for any professional financial, medical, legal, or other advice. The Company makes no representations or warranties and, to the maximum extent permitted by law, expressly disclaims any liability associated with your reliance on statements or other information offered or provided in or through the Service. If you have specific concerns or encounter a situation in which you require professional or medical advice, you should consult an appropriately trained and qualified professional.',
      },
      {
        kind: 'p',
        content:
          '18.3 Modification of Website Information and Services. We may modify all information provided on the Service at our sole discretion without prior notice. We may at any time modify or discontinue, temporarily or permanently, the Service (or any part thereof) at our sole discretion, with or without notice.',
      },
    ],
  },
  {
    title: '19. Service',
    blocks: [
      {
        kind: 'p',
        content:
          '19.1. You acknowledge that all text, images, marks, logos, compilations (i.e., the collection, arrangement, and assembly of information), data, other content, software, and materials displayed on the Service or used by the Company to operate the Service (including the Application and Content, excluding any User Content) are the property of us or third parties.',
      },
      {
        kind: 'p',
        content:
          '19.2. The Company expressly reserves all rights, including all intellectual property rights, in the foregoing, and except as expressly permitted by these Terms, any use, redistribution, sale, decompilation, reverse engineering, disassembly, translation, or other use thereof is strictly prohibited. The provision of the Service does not transfer to you or any third party any right, title, or interest in or to such intellectual property rights.',
      },
      {
        kind: 'p',
        content:
          '19.3. The information you provide to us upon registration, as well as any content, materials, or information (including, without limitation, any text, information, graphics, messages, photographs, images, and copyrighted works), questions, comments, suggestions, reviews, or other content that you upload, send, email, display, perform, distribute, publish, or otherwise transmit to us, at our request or at your discretion, on or through the Services, whether related to your use of the Services or otherwise, and whether publicly posted or privately transmitted to us through the Service (“User Content”), remains your intellectual property.',
      },
      {
        kind: 'p',
        content:
          '19.4. The Company does not claim any copyright in User Content. Notwithstanding the foregoing, you agree to grant the Company a license in accordance with Section 20 of these Terms. You also agree that the Company may retain copies of all registration information and User Content and use such information and User Content if reasonably necessary or related to the operation of the Service and as described in these Terms.',
      },
      {
        kind: 'p',
        content:
          '19.5. Subject to these Terms, the Company grants you a non-transferable, non-exclusive license (without the right to sublicense) to use the Service solely for personal, non-commercial purposes.',
      },
      {
        kind: 'p',
        content:
          '19.6. You agree, represent, and warrant that your use of the Service or any part thereof will comply with the foregoing license, agreements, and restrictions and will not infringe or violate the rights of any other party or breach any contract or legal obligation to any other parties. In addition, you agree that you will comply with all applicable laws, rules, and regulations relating to the Service or its use and will be solely responsible for your individual violations of any such laws.',
      },
      {
        kind: 'p',
        content:
          '19.7. You are solely responsible for obtaining the equipment and telecommunications services necessary to access the Service, as well as all related charges (for example, computer equipment and Internet service provider charges).',
      },
      {
        kind: 'p',
        content:
          '19.8. We reserve the right to make any changes to the Service (whether free or paid features) at any time, with or without notice. Except where prohibited by law or otherwise inapplicable, the Company shall not be liable to you or any third party for any modification, suspension, or discontinuation of any feature, component, or content of the Company. If such changes affect your use of the Service, you may delete your account or cancel your subscription at any time.',
      },
      {
        kind: 'p',
        content:
          '19.9. You access and use the Service at your own risk. Except where prohibited by law or otherwise inapplicable, the Company shall not be liable for any damage to your computer system, loss of data, or other harm to you or any third party, including, without limitation, any bodily injury, arising from your access to or use of the Service or from your reliance on any information or advice.',
      },
      {
        kind: 'p',
        content:
          '19.10. The Company is not obligated to provide you with any customer support. However, the Company may, from time to time, provide you with customer support at its sole discretion.',
      },
    ],
  },
  {
    title: '20. Curator Services',
    blocks: [
      {
        kind: 'p',
        content:
          '20.1. As part of the Service, the Company may offer interactive curator services that connect you with curators and information that will help you achieve your goals (“Curator Services”).',
      },
      {
        kind: 'p',
        content: '20.2. If you have access to a Subscription, you will be able to interact with curators.',
      },
      {
        kind: 'p',
        content:
          '20.3. A curator will help you achieve your goals by providing motivational tools. The Company may, at its discretion, hire or replace any curator with another for Subscription users.',
      },
      {
        kind: 'p',
        content:
          '20.4. Curator Services are not medical, mental health, or any other form of healthcare. Curator Services do not provide healthcare services and are not intended to replace professional medical advice, consultation, or treatment from qualified physicians. The Company does not endorse any particular medical professionals, tests, products, procedures, opinions, or other information that may be mentioned in the coaching services. It is important to consult your physician before using the services of a coach/curator/educator. In the event of a medical emergency, immediately contact your physician or the appropriate emergency service.',
      },
    ],
  },
  {
    title: '21. User Content',
    blocks: [
      {
        kind: 'p',
        content:
          '21.1. Grant of License. You hereby grant the Company, its sublicensees, successors, and assigns, and transfer to them a royalty-free, perpetual, sublicensable, assignable, non-exclusive right and license (as well as consent) to use, license, reproduce, modify, adapt, publish, translate, transmit, edit, reformat, create derivative works from, distribute, derive revenue or other remuneration from, communicate to the public, reproduce, display, and otherwise use any User Content (in whole or in part) throughout the world and/or incorporate User Content into other works in any form, on any media, or using technologies now known or later developed, for the entire term of any copyrights, trademarks, and other intellectual and proprietary rights (collectively, “Rights”) that may exist in such User Content.',
      },
      {
        kind: 'p',
        content:
          '21.2. The license granted herein expressly excludes any personal data as defined under applicable privacy laws and regulations.',
      },
      {
        kind: 'p',
        content:
          '21.3. You hereby represent and warrant that you own all right, title, and interest in and to the User Content or are otherwise authorized to grant the rights granted to the Company under this section. You further warrant that, to the extent you are not the exclusive owner of all rights in the User Content, any third party holding any rights, including moral rights, in such User Content has fully and effectively waived all such rights and has lawfully and irrevocably granted you the right to grant the license set forth above. You also acknowledge that we, our successors, and assigns have the right to unrestricted use of the User Content for any purpose, commercial or otherwise, without compensation to the provider of the User Content. Subject to the foregoing, the owner of User Content posted on the Services retains any Rights that may exist in such User Content. We are not responsible for retaining copies of any materials that we remove from our Services and shall not be liable for any losses you incur if Content that you post or transmit to our Services is removed.',
      },
      {
        kind: 'p',
        content:
          '21.4. If you wish to withdraw the license granted for certain User Content, please contact us by email.',
      },
      {
        kind: 'p',
        content: [
          { kind: 'text', value: 'Related: ' },
          { kind: 'link', route: 'privacy', label: 'Privacy Policy' },
          { kind: 'text', value: ' · ' },
          { kind: 'link', route: 'cookie', label: 'Cookie Policy' },
          { kind: 'text', value: ' · ' },
          { kind: 'link', route: 'refund', label: 'Refund Policy' },
          { kind: 'text', value: ' · ' },
          { kind: 'link', route: 'billing', label: 'Billing & Plans' },
          { kind: 'text', value: ' · ' },
          { kind: 'link', route: 'contact', label: 'Contact' },
        ],
      },
    ],
  },
]

const RU_SECTIONS: TermsSection[] = [
  {
    title: 'Информация о компании',
    blocks: [
      {
        kind: 'p',
        content: [
          { kind: 'text', value: 'Благодарим вас за посещение нашего сайта ' },
          { kind: 'extWebsite' },
          { kind: 'text', value: ' (далее — «Сайт»).' },
        ],
      },
      { kind: 'companyDetails' },
      {
        kind: 'p',
        content:
          'Примечание: в настоящем документе термины «Компания», «мы», «нас» и «наш» относятся к указанному выше юридическому лицу. «Сервис» означает указанное выше наименование сервиса, включая Сайт и все связанные услуги.',
      },
      {
        kind: 'p',
        content:
          'Прежде чем использовать любые функции Сайта или любые продукты и услуги, доступные через Сайт, внимательно прочитайте и поймите настоящие Условия и положения (далее — «Условия»), поскольку они регулируют все отношения между вами (далее — «Пользователь», «вы» или «Клиент») и нами.',
      },
      {
        kind: 'p',
        content:
          'Компания не заявляет, что Сервис доступен, подходит или может законно использоваться в вашей юрисдикции; доступ и использование Сервиса запрещены на территориях, где такое использование незаконно. Вы получаете доступ к Сервису по собственной инициативе и несёте ответственность за соблюдение местного законодательства.',
      },
      {
        kind: 'p',
        content:
          'Не продолжайте совершать покупки на Сайте, если вы не внимательно прочитали и не поняли положения настоящих Условий: при любой покупке у нас эти Условия считаются юридически обязательным соглашением между вами и нами, поэтому важно, чтобы вы полностью понимали все изложенные здесь условия.',
      },
      {
        kind: 'p',
        content:
          'На Сайте предусмотрены подписки с автоматическим продлением. Внимательно прочитайте настоящие Условия использования («Условия») перед началом пробного периода или оформлением подписки с автоматическим продлением на нашем Сайте.',
      },
      {
        kind: 'p',
        content:
          'Чтобы избежать списания средств, вы должны явно отменить подписку не менее чем за 24 часа до окончания пробного или текущего расчётного периода.',
      },
      {
        kind: 'p',
        content:
          'Оформляя подписку с автоматическим продлением, вы соглашаетесь с характером автопродления и его условиями, указанными рядом с местом покупки, и подтверждаете, что для избежания списания подписку необходимо отменить.',
      },
      {
        kind: 'p',
        content:
          'Независимо от того, где вы оформили подписку, если вы не знаете, как отменить подписку или пробный период, свяжитесь со службой поддержки на Сайте или по email.',
      },
      {
        kind: 'p',
        content:
          'Мы также стремимся размещать информацию о политике подписки рядом с местом покупки. Ознакомьтесь с этими правилами перед покупкой. Вы можете распечатать эту информацию для справки.',
      },
      {
        kind: 'p',
        content: [
          { kind: 'text', value: 'Правила обработки персональных данных подробно изложены в нашей ' },
          { kind: 'link', route: 'privacy', label: 'Политике конфиденциальности' },
          {
            kind: 'text',
            value: '. Прочитайте её, чтобы понять, как собирается, используется и передаётся ваша персональная информация.',
          },
        ],
      },
    ],
  },
  {
    title: '1. Принятие Условий',
    blocks: [
      {
        kind: 'p',
        content:
          '1.1. Настоящие Условия регулируют отношения между вами и Компанией в связи с использованием вами Сервиса, включая Сайт, аккаунт Mindora Academy, учебную платформу и связанные услуги («Сервис»), а также всю информацию, текст, графику, программное обеспечение и услуги, доступные для использования («Контент»).',
      },
      {
        kind: 'p',
        content:
          '1.2. Настоящие Условия устанавливают юридически обязательные договорные отношения между вами и Компанией. ПОЭТОМУ ВНИМАТЕЛЬНО ПРОЧТИТЕ УСЛОВИЯ ПЕРЕД ИСПОЛЬЗОВАНИЕМ СЕРВИСА.',
      },
      {
        kind: 'p',
        content:
          '1.3. Для создания профиля и использования Сервиса вам должно быть не менее 18 лет. Мы не гарантируем, что наш цифровой контент и другие услуги подойдут и будут полезны каждому, поэтому перед покупками на Сайте оцените, подходит ли Сервис именно вам.',
      },
      {
        kind: 'p',
        content: [
          { kind: 'text', value: '1.4. Также ознакомьтесь с нашей ' },
          { kind: 'link', route: 'privacy', label: 'Политикой конфиденциальности' },
          { kind: 'text', value: ', ' },
          { kind: 'link', route: 'refund', label: 'Политикой возврата' },
          { kind: 'text', value: ', страницей ' },
          { kind: 'link', route: 'billing', label: 'Оплата и тарифы' },
          { kind: 'text', value: ' и ' },
          { kind: 'link', route: 'cookie', label: 'Политикой cookie' },
          {
            kind: 'text',
            value: '. Эти документы и иные дополнительные условия прямо включены в настоящий документ посредством ссылки.',
          },
        ],
      },
      {
        kind: 'p',
        content:
          '1.5. Любой перевод с данной языковой версии предоставляется исключительно для удобства. При расхождениях приоритет имеет настоящая языковая версия.',
      },
      {
        kind: 'p',
        content:
          '1.6. В пределах, допускаемых применимым законодательством, мы можем изменять настоящие Условия. О существенных изменениях мы уведомим вас в порядке, предусмотренном законом. Условия, действовавшие на момент конкретной покупки, продолжают применяться к этой покупке.',
      },
      {
        kind: 'p',
        content:
          '1.7. Если вы не согласны с изменениями, прекратите использование Сервиса, удалите аккаунт или отмените подписку до вступления изменений в силу. Продолжая использовать Сервис после изменений, вы принимаете обновлённые Условия.',
      },
    ],
  },
  {
    title: '2. Информация о пользователе',
    blocks: [
      {
        kind: 'p',
        content: '2.1 Если вы хотите использовать Услуги, вы должны соответствовать следующим требованиям:',
      },
      {
        kind: 'ul',
        items: [
          'Вам не менее 18 лет, и вы достигли возраста, необходимого для заключения дистанционных договоров по законодательству места вашего проживания. Сайт и Сервис предназначены только для взрослых.',
          'Вы прочитали настоящие Условия и соглашаетесь их соблюдать.',
          'Вы должны предоставить нам корректные контактные данные, платёжную информацию и другие сведения, необходимые для работы Сервиса.',
          'Вы используете кредитную/дебетовую/банковскую карту или другой способ оплаты, принадлежащий вам, либо владелец карты/способа оплаты уполномочил вас на использование, и такое уполномочение оформлено в форме, требуемой законодательством места вашего проживания.',
        ],
      },
      {
        kind: 'p',
        content:
          '2.2 Для использования всего функционала Сайта, Услуг и цифрового контента Сервиса вам может потребоваться предоставить персональные данные, такие как возраст, предпочтения, ожидания и цели. Обратите внимание: качественные персонализированные услуги мы сможем предоставить только при получении от вас достоверной информации.',
      },
      {
        kind: 'p',
        content:
          '2.3 Наши Услуги предоставляются как цифровой контент и цифровые услуги. Предоставление начинается, когда доступ к купленному продукту появляется в вашем аккаунте — обычно сразу после подтверждения оплаты или, для подписки с пробным периодом, с начала пробного периода. Вы можете отменить подписку в любое время — тогда мы не продлим её и прекратим списания за последующие периоды.',
      },
      {
        kind: 'p',
        content:
          '2.4 Обратите внимание: этот Сайт, наши Услуги и любой полученный от нас цифровой контент можно использовать только для личных нужд. Вы не вправе использовать контент Сайта, цифровой контент или наши Услуги для перепродажи, распространения, аренды или иного коммерческого использования.',
      },
      {
        kind: 'p',
        content:
          '2.5 Вы не можете использовать Сайт или наши Услуги в незаконных или несанкционированных целях и не должны нарушать законы при использовании Сервиса. Весь контент Сайта и материалов, полученных от нас (включая графические материалы), принадлежит Компании и защищён авторским правом. Любое использование объектов авторского права не для личного использования наших Услуг без лицензии правообладателя является нарушением.',
      },
    ],
  },
  {
    title: '3. Продукты, цены и способы оплаты',
    blocks: [
      {
        kind: 'p',
        content:
          '3.1 Сервис предоставляет Клиентам доступ к цифровому контенту, разработанному с учётом потребностей и предпочтений пользователей, включая онлайн-курсы по искусственному интеллекту, учебные материалы, видеоуроки, практические задания, руководства, примеры, промпты, планировщики, AI-коуча и поддержку (далее — «Услуги»). Содержание Сайта и Услуг может периодически меняться по мере обновления и улучшения.',
      },
      {
        kind: 'p',
        content:
          '3.2 Виды покупок. В зависимости от выбранного предложения Сервис может быть приобретён в одной или нескольких из следующих форм. Разные предложения могут сочетать эти формы по-разному: например, в одних предложениях первоначальный платёж (например, US$1) — это разовый Entry Product без подписки, а в других — платная пробная подписка, которая превращается в подписку. На странице предложения и экране оплаты всегда указано, какой вариант применяется. Конкретные продукты, цены и условия зависят от предложения и страницы (лендинга), с которой вы совершаете покупку:',
      },
      {
        kind: 'ul',
        items: [
          [
            { kind: 'strong', value: 'Entry Products (входные продукты).' },
            {
              kind: 'text',
              value:
                ' Разовые цифровые продукты в начале предложения, например AI Starter Kit, Claude AI Guide Kit, Claude AI Learning Plan или 28-Day AI Plan, по цене, указанной на странице предложения и в оформлении заказа (например, US$1). Entry Product списывается один раз, не продлевается и даёт пожизненный доступ к контенту, описанному в предложении. Покупка Entry Product сама по себе не запускает подписку.',
            },
          ],
          [
            { kind: 'strong', value: 'Платная пробная подписка.' },
            {
              kind: 'text',
              value:
                ' Подписка, которая начинается с платного пробного периода за небольшую плату (например, US$1 за 7 дней) и, если не отменена до окончания пробного периода, автоматически превращается в платную подписку по регулярной цене и расчётному периоду, указанным при покупке (например, US$29 в месяц). Плата за пробный период, его длительность и регулярная цена показаны на странице предложения и экране оплаты до подтверждения.',
            },
          ],
          [
            { kind: 'strong', value: 'Подписка («Membership»), оформленная после Entry Product.' },
            {
              kind: 'text',
              value:
                ' Периодический доступ к полной библиотеке Mindora Academy и функциям, описанным в предложении. Подписка начинается только когда вы отдельно её подтверждаете (например, нажав «Continue» или аналогичную кнопку на странице предложения подписки). Подписка может начинаться с бесплатного или платного пробного периода (например, 3 дня) и затем автоматически продлевается по регулярной цене и расчётному периоду, указанным при покупке (например, US$49.99 в месяц), до отмены. Мы можем предлагать альтернативные или скидочные планы подписки (например, US$29.99 в месяц) со своими условиями.',
            },
          ],
          [
            { kind: 'strong', value: 'Дополнения и апгрейды.' },
            {
              kind: 'text',
              value:
                ' Дополнительные разовые продукты после основной покупки, например AI Coach («Ask Mindora»), AI Prompt Library или Planners, включая скидочные версии. Дополнения списываются один раз, не продлеваются, дают пожизненный доступ к купленному контенту и независимы от подписки: они остаются доступны, если подписка закончится.',
            },
          ],
          [
            { kind: 'strong', value: 'Отдельные курсы и программы сертификации.' },
            {
              kind: 'text',
              value:
                ' Самостоятельные курсы, купленные отдельно по указанной цене, списываются один раз с пожизненным доступом к купленному курсу.',
            },
          ],
          [
            { kind: 'strong', value: 'Ранее оформленные предложения.' },
            {
              kind: 'text',
              value:
                ' Клиенты, купившие по более ранним предложениям, продолжают пользоваться условиями, действовавшими на момент их покупки, пока эти условия не прекратятся или подписка не будет отменена.',
            },
          ],
        ],
      },
      {
        kind: 'p',
        content:
          '3.3 Цену определяет экран оформления. Продукт, сумма, валюта, расчётный период, условия пробного периода и продления, показанные на странице предложения и экране оплаты до подтверждения покупки, регулируют ваш заказ. Цены могут различаться между предложениями, лендингами, регионами и акциями. Уже оплаченный период не пересчитывается.',
      },
      {
        kind: 'p',
        content:
          '3.4 Образовательные и персонализированные Услуги готовятся и предоставляются на основе информации, которую вы нам предоставляете. Поэтому просим указывать только точные и достоверные сведения о себе. Если вы не предоставите точную информацию, мы не сможем предоставить образовательные и персонализированные Услуги, соответствующие вам и вашим потребностям. Персональные планы и другие Услуги подходят именно вам, поскольку создаются на основе ваших персональных данных.',
      },
      {
        kind: 'p',
        content:
          '3.5 Наши Услуги предназначены исключительно для образовательных целей и не являются профессиональной консультацией в области права, финансов, инвестиций, бизнеса, программирования или иной профессиональной деятельности.',
      },
      {
        kind: 'p',
        content: [
          { kind: 'strong', value: '3.6 Автоматическое продление подписки.' },
          {
            kind: 'text',
            value:
              ' Начиная подписку, вы соглашаетесь, что она автоматически продлевается в конце каждого расчётного периода (еженедельно, ежемесячно, ежеквартально, ежегодно или иначе — в зависимости от выбранного варианта) до её отмены. Если вы не отмените подписку, вы уполномочиваете нас списывать плату за каждый период продления. Период продления совпадает с первоначальным периодом подписки, если при покупке не указано иное. Вводные, пробные или скидочные цены действуют только в период, указанный в предложении; затем применяется обычная регулярная цена, показанная при покупке.',
          },
        ],
      },
      {
        kind: 'p',
        content:
          '3.7 Пробные периоды. Мы можем предложить бесплатный или платный пробный период подписки. Длительность, цена (если есть) и цена после пробного периода показаны на странице предложения до подтверждения. Если вы не отмените до окончания пробного периода, подписка автоматически превращается в платную, и с вас списывается регулярная цена за выбранный расчётный период. Мы можем напомнить вам до окончания пробного периода. Если пробный период не указан, вы приобретаете подписку без него.',
      },
      {
        kind: 'p',
        content:
          '3.8 Сохранённый способ оплаты и покупки в один клик. При первой покупке ваши платёжные данные надёжно сохраняются нашим платёжным провайдером Stripe. Вы уполномочиваете нас списывать с этого сохранённого способа оплаты: (a) плату за подписку, включая после пробного периода и при каждом продлении; и (b) любую подписку, апгрейд или дополнение, которые вы подтверждаете на последующей странице предложения нажатием кнопки покупки (например, «Continue», «Add to my order» или «Yes, upgrade»), без повторного ввода данных карты. Каждое такое списание производится только после вашего подтверждения, на сумму, указанную рядом с кнопкой. Некоторые банки могут запросить подтверждение платежа (например, через 3-D Secure).',
      },
      {
        kind: 'p',
        content:
          '3.9 Смена планов и апгрейды. Если доступно, вы можете переключаться между планами подписки. Если при смене не указано иное, апгрейд на более высокий план вступает в силу сразу, и сумма, показанная при апгрейде, списывается в этот момент; понижение плана или переход на более дешёвый план вступает в силу с начала следующего расчётного периода. Переход между планами не создаёт права на возврат уже уплаченных сумм.',
      },
      {
        kind: 'p',
        content:
          '3.10 Изменение цен. В максимально допустимой законом степени мы можем менять цены в любое время. Цены новых предложений могут меняться без уведомления. Для действующих подписчиков мы заранее уведомим об изменении регулярной цены по email или иным заметным способом, чтобы вы могли отменить подписку до вступления изменения в силу.',
      },
      {
        kind: 'p',
        content: [
          {
            kind: 'text',
            value:
              '3.11 Налоги. Цены могут включать или облагаться НДС или иными налогами с продаж в зависимости от вашего местонахождения. Итоговая сумма с учётом применимого налога показана на экране оплаты до подтверждения. См. также нашу страницу ',
          },
          { kind: 'link', route: 'billing', label: 'Оплата и тарифы' },
          { kind: 'text', value: '.' },
        ],
      },
      {
        kind: 'p',
        content:
          '3.12 Мы никогда не применяем конвертацию или комиссии в зависимости от выбранного способа оплаты. Однако банки могут применять курсы конвертации к исходящим платежам и международным переводам — мы не несём ответственности за банковские комиссии или курсы, которые ваш банк применяет к платежам нам. Если вы заметили расхождения между ценами на Сайте или в чеке покупки и выпиской банка, обратитесь в банк за подробным объяснением дополнительных списаний.',
      },
      {
        kind: 'p',
        content:
          '3.13 Мы принимаем оплату банковскими картами и другими способами, предлагаемыми в оформлении заказа Stripe. Чеки, наличные и иные способы оплаты не принимаются.',
      },
      {
        kind: 'p',
        content:
          '3.14 Все цены указаны в долларах США (USD), если на экране оплаты не показана другая валюта.',
      },
    ],
  },
  {
    title: '4. Политика скидок',
    blocks: [
      {
        kind: 'p',
        content:
          '4.1 Время от времени мы можем предлагать специальные скидки на планы и продукты. Мы можем предложить скидку, если:',
      },
      {
        kind: 'ul',
        items: [
          'вы используете наши Услуги впервые и можете претендовать на скидку на первую покупку у нас; и/или',
          'вы предоставляете нам email и соглашаетесь получать нашу рассылку; и/или',
          'вы отклоняете предложение в процессе покупки, и в этом случае мы можем показать то же или похожее предложение по более низкой цене.',
        ],
      },
      {
        kind: 'p',
        content:
          '4.2 Актуальные скидки могут меняться. Более подробную информацию о размере скидки мы предоставляем при объявлении её доступности.',
      },
      {
        kind: 'p',
        content:
          '4.3 Мы оставляем за собой право запускать и отменять программы скидок и менять размеры скидок в любое время, за исключением случаев, когда в конкретном объявлении о скидке указан период её действия — тогда скидка предоставляется в указанный период.',
      },
      {
        kind: 'p',
        content:
          '4.4 Скидочная или промо-цена применяется только к продукту или периоду, указанному в предложении. Скидочный Entry Product не включает подписку; подписка начинается только если вы отдельно подтвердите её на странице предложения подписки.',
      },
    ],
  },
  {
    title: '5. Отмена подписки',
    blocks: [
      {
        kind: 'p',
        content:
          'Ваша подписка автоматически продлевается в конце каждого периода, пока вы её не отмените. Обратите внимание: удаление приложения, выход из аккаунта или прекращение использования Сервиса не отменяет подписку.',
      },
      {
        kind: 'p',
        content:
          '5.1 Вы можете отменить подписку в любое время в разделе подписки личного кабинета на Сайте или обратившись в службу поддержки по адресу support@mindoraacademy.com. Отмена вступает в силу по окончании уже начавшегося пробного или расчётного периода.',
      },
      {
        kind: 'p',
        content:
          '5.2 Чтобы избежать списания за следующий период, отмените подписку до даты следующего списания, указанной в аккаунте. Рекомендуем отменять не менее чем за 24 часа до окончания пробного или текущего расчётного периода. После отмены доступ сохраняется до конца уже оплаченного периода, и последующие периоды не списываются.',
      },
      {
        kind: 'p',
        content: [
          {
            kind: 'text',
            value:
              '5.3 Отмена подписки останавливает будущие продления. Сама по себе она не является запросом на возврат предыдущего списания. Возвраты регулируются разделом 6 и нашей ',
          },
          { kind: 'link', route: 'refund', label: 'Политикой возврата' },
          { kind: 'text', value: '.' },
        ],
      },
      {
        kind: 'p',
        content:
          '5.4 Отмена во время пробного периода. Если вы отмените во время бесплатного или платного пробного периода, регулярная цена подписки не спишется; уже уплаченная плата за пробный период не возвращается в пределах, допускаемых применимым правом. Если вы не отмените до окончания пробного периода, доступ автоматически продолжится, и списание произойдёт как описано в п. 3.7. Если закон не запрещает, мы оставляем за собой право изменять или прекращать любое пробное предложение и ограничивать возможность использовать несколько пробных периодов.',
      },
      {
        kind: 'p',
        content:
          '5.5 Отмена подписки не затрагивает купленные Entry Products, дополнения или отдельные курсы: доступ к ним продолжается на их собственных условиях.',
      },
      {
        kind: 'p',
        content:
          '5.6 Если платёж за подписку не проходит, мы можем повторить попытку списания и уведомить вас. Если платёж не завершён, мы можем приостановить или прекратить доступ по подписке.',
      },
      {
        kind: 'p',
        content:
          '5.7 Если вы хотите немедленно закрыть аккаунт, сообщите нам — аккаунт будет закрыт; однако уже уплаченные суммы не возвращаются, за исключением случаев, описанных в разделе 6 и Политике возврата.',
      },
    ],
  },
  {
    title: '6. Возвраты',
    blocks: [
      {
        kind: 'p',
        content:
          '6.1 Общее правило. Наши Услуги — это цифровой контент и цифровые услуги, доступ к которым предоставляется сразу после покупки, а материалы для скачивания можно сохранить сразу. Поэтому цена не зависит от того, сколько контента вы используете и как быстро. После предоставления доступа покупки, как правило, не подлежат возврату из‑за изменения мнения или планов, неиспользования материалов либо быстрого использования или скачивания — в пределах, допускаемых применимым правом.',
      },
      { kind: 'p', content: '6.2 Правила по видам покупки:' },
      {
        kind: 'ul',
        items: [
          [
            { kind: 'strong', value: 'Entry Products.' },
            {
              kind: 'text',
              value:
                ' Entry Products не подлежат возврату после предоставления доступа в пределах, допускаемых применимым правом.',
            },
          ],
          [
            { kind: 'strong', value: 'Платные пробные периоды.' },
            {
              kind: 'text',
              value:
                ' Плата за пробный период (например, US$1) не возвращается после предоставления доступа в пределах, допускаемых применимым правом. Если вы отмените до окончания пробного периода, регулярная цена подписки не спишется.',
            },
          ],
          [
            { kind: 'strong', value: 'Подписки.' },
            {
              kind: 'text',
              value:
                ' Уже начавшийся пробный или расчётный период не подлежит возврату, включая автоматические продления; частичные или пропорциональные возвраты не предоставляются в пределах, допускаемых применимым правом. Вы можете отменить подписку в любое время, чтобы остановить будущие списания.',
            },
          ],
          [
            { kind: 'strong', value: 'Смена планов и апгрейды.' },
            {
              kind: 'text',
              value:
                ' Суммы, списанные за апгрейд или смену плана, не возвращаются после активации нового плана в пределах, допускаемых применимым правом.',
            },
          ],
          [
            { kind: 'strong', value: 'Дополнения.' },
            {
              kind: 'text',
              value:
                ' Дополнения (например, AI Coach, AI Prompt Library, Planners) не подлежат возврату после предоставления доступа в пределах, допускаемых применимым правом.',
            },
          ],
          [
            { kind: 'strong', value: 'Отдельные курсы.' },
            {
              kind: 'text',
              value:
                ' Вы можете запросить возврат за отдельный курс или программу сертификации, купленные отдельно, в течение 14 календарных дней с даты оплаты.',
            },
          ],
        ],
      },
      {
        kind: 'p',
        content:
          '6.3 Изменение цены, промо-периода, ассортимента контента или временная недоступность отдельных функций (менее 24 часов) не являются основанием для возврата.',
      },
      {
        kind: 'p',
        content:
          '6.4 Исключения. Настоящий раздел не ограничивает ваши обязательные права по применимому потребительскому праву, включая права в отношении цифрового контента, который не поставлен, неисправен или не соответствует описанию, и не исключает возвраты при дублирующих, ошибочных или несанкционированных списаниях. Если мы подтвердим дублирующее списание, ошибочное списание или техническую ошибку с нашей стороны, из‑за которой вы не получили доступ к оплаченному продукту, мы вернём средства или иным образом урегулируем затронутое списание.',
      },
      {
        kind: 'p',
        content:
          '6.5 Права потребителей. Потребители в Соединённом Королевстве и Европейском союзе, как правило, имеют 14-дневное право на отказ от дистанционных договоров. Для цифрового контента это право может быть утрачено после начала предоставления, если соблюдены законные требования. Если императивное право даёт вам право на отказ или пропорциональный возврат (включая права «cooling-off» для подписок, которые могут применяться в вашей стране), мы соблюдём это право.',
      },
      {
        kind: 'p',
        content:
          '6.6 Ранее оформленные покупки и дополнительные гарантии. Любые гарантии или условия возврата, прямо указанные для вашей покупки на момент её совершения, продолжают применяться к этой покупке на указанных условиях. Настоящая версия Условий не ухудшает условия возврата покупок, совершённых до даты её вступления в силу.',
      },
      {
        kind: 'p',
        content: [
          {
            kind: 'text',
            value:
              '6.7 Возвраты осуществляются только на исходный способ оплаты, использованный при покупке. Подробности о том, как запросить возврат, см. в нашей ',
          },
          { kind: 'link', route: 'refund', label: 'Политике возврата' },
          { kind: 'text', value: '.' },
        ],
      },
    ],
  },
  {
    title: '7. Персональные данные и контакты',
    blocks: [
      {
        kind: 'p',
        content:
          '7.1 Для защиты вашей персональной информации мы принимаем разумные меры предосторожности и следуем отраслевым лучшим практикам, чтобы она не была ненадлежащим образом утрачена, использована не по назначению, доступна, раскрыта, изменена или уничтожена.',
      },
      {
        kind: 'p',
        content:
          '7.2 Ваша персональная информация может использоваться для исследований и дальнейшего развития Услуг. Кроме того, мы вправе собирать и использовать информацию, которую вы предоставляете при использовании Услуг. Однако ни при каких обстоятельствах мы не будем использовать ваше изображение или персональные данные иначе как для развития наших продуктов и услуг.',
      },
      {
        kind: 'p',
        content:
          '7.3. Если вы оставляете отзыв, вы соглашаетесь, что мы можем размещать его на Сайте в течение 5 лет после получения. Мы не укажем ваше настоящее имя или укажем только инициалы, если вы специально не поручите нам указать полное имя.',
      },
      {
        kind: 'p',
        content:
          '7.4 Мы можем связаться с вами по телефону или email, если нужно подтвердить детали заказа или если запрос заказа не был успешно обработан по техническим причинам. Если заказ не завершён из‑за ошибок обработки платежа или иных причин, мы можем отправить SMS или email с напоминанием завершить необходимые действия либо связаться по телефону, если вы указали номер.',
      },
      {
        kind: 'p',
        content: [
          {
            kind: 'text',
            value:
              '7.5 Мы гарантируем, что все персональные данные будут собираться и обрабатываться в соответствии со всеми применимыми законами. Подробнее о том, как мы используем и обрабатываем персональные данные, см. в нашей ',
          },
          { kind: 'link', route: 'privacy', label: 'Политике конфиденциальности' },
          { kind: 'text', value: '.' },
        ],
      },
    ],
  },
  {
    title: '8. Правила поведения',
    blocks: [
      {
        kind: 'p',
        content:
          '8.1 Вы не можете использовать наши Услуги и/или Сайт в незаконных или несанкционированных целях или нарушать законы при использовании Сайта. Весь контент Сайта и все материалы, полученные от нас, а также соответствующие части Сайта принадлежат Компании и защищены авторским правом. Любое использование объектов авторского права не для личного использования без нашей лицензии является нарушением наших авторских или иных прав интеллектуальной собственности.',
      },
      {
        kind: 'p',
        content:
          '8.2 Мы вправе, но не обязаны расследовать любое незаконное и/или несанкционированное использование Сайта и принимать соответствующие правовые меры, включая гражданско-правовые средства защиты и судебные запреты, если у нас есть основания полагать, что вы нарушаете настоящие Условия или применимое право. При использовании Сайта вы обязаны:',
      },
      {
        kind: 'ul',
        items: [
          'не использовать Сайт или любой его контент в незаконных целях или с нарушением местного, государственного, национального или международного права',
          'не нарушать и не побуждать других нарушать права третьих лиц, включая права интеллектуальной собственности',
          'соблюдать все правила, размещённые на Сайте',
          'не передавать зарегистрированный аккаунт другому лицу юридически или фактически без нашего письменного согласия',
          'предоставлять нам честную и точную информацию',
          'не использовать Сайт или любой его контент в коммерческих целях, включая распространение рекламы или предложений',
          'не переформатировать и не зеркалировать любую часть веб-страниц Сайта',
          'не создавать ссылки или перенаправления на Сайт через другие сайты или email без нашего предварительного письменного согласия',
          'не пытаться мешать надлежащей работе Сайта или использованию Сайта другими пользователями',
          'коммерческая перепродажа, распространение или передача любых продуктов, купленных у нас, запрещены',
          'не вмешиваться в функции безопасности Сайта',
          'не получать доступ, не отслеживать и не копировать контент или информацию с Сайта с помощью роботов, пауков, скрейперов или иных автоматизированных средств либо ручных процессов без нашего явного письменного разрешения',
          'не ложно заявлять о аффилированности, не получать доступ к чужим аккаунтам без авторизации и не фальсифицировать личность или сведения о себе, включая возраст или дату рождения',
          'не совершать иные действия, нарушающие настоящие Условия или применимое право',
        ],
      },
      {
        kind: 'p',
        content:
          '8.3 Мы вправе немедленно прекратить вашу подписку без возврата и/или ограничить доступ к Сайту, если у нас есть основания полагать, что: (a) вы не соответствуете требованиям п. 2.1; (b) вы нарушили любое положение п. 8.1; или (c) вы используете Сайт или его контент иным незаконным образом либо причиняете вред Сайту или другим пользователям.',
      },
      {
        kind: 'p',
        content:
          '8.4. Используя Сервис, вы заявляете и гарантируете, что: обладаете правоспособностью и соглашаетесь соблюдать настоящие Условия; вам 18 лет; вы не будете получать доступ к Сервису автоматизированными или нечеловеческими средствами (бот, скрипт и т. п.); не будете использовать Сервис в незаконных или несанкционированных целях; и ваше использование не нарушит применимые законы. Если вы предоставите ложную, неточную, устаревшую или неполную информацию, мы вправе отказать в текущем или будущем использовании Сервиса (или любой его части).',
      },
      {
        kind: 'p',
        content:
          '8.5 Вы не можете получать доступ к Сервису или использовать его иначе, чем для целей, для которых мы предоставляем Сервис. Сервис не может использоваться в коммерческих целях, за исключением специально разрешённых или одобренных нами.',
      },
      { kind: 'p', content: '8.7 Как пользователь Сервиса вы соглашаетесь не:' },
      {
        kind: 'ul',
        items: [
          'систематически извлекать данные или иной контент из Сервиса для создания или составления коллекции, компиляции, базы данных или каталога без нашего письменного разрешения',
          'осуществлять любое несанкционированное использование Сервиса',
          'вносить изменения, адаптации, улучшения, дополнения, переводы или создавать производные произведения на основе Сервиса',
          'использовать Сервис в целях получения дохода, для коммерческих предприятий или иных целей, для которых он не предназначен',
          'делать Сервис доступным через сеть или иную среду, позволяющую одновременный доступ или использование несколькими устройствами или пользователями',
          'использовать Сервис для создания продукта, услуги или ПО, которые прямо или косвенно конкурируют с Сервисом или каким‑либо образом его заменяют',
          'использовать конфиденциальную информацию или любые наши интерфейсы либо иную интеллектуальную собственность при проектировании, разработке, производстве, лицензировании или распространении приложений, аксессуаров или устройств для использования с Сервисом; обходить, отключать или иным образом вмешиваться в функции безопасности Сервиса',
          'осуществлять несанкционированное фреймирование или создание ссылок на Сервис',
          'мешать, нарушать работу или создавать чрезмерную нагрузку на Сервис либо сети или услуги, связанные с Сервисом',
          'пытаться обойти меры Сервиса, предназначенные для предотвращения или ограничения доступа к Сервису или любой его части',
          'загружать или распространять файлы, содержащие вирусы, черви, трояны, повреждённые файлы или аналогичное ПО, способное навредить работе чужого компьютера',
          'использовать, запускать, разрабатывать или распространять любую автоматизированную систему, включая паука, робота, чит-утилиту, скрейпер или автономный ридер, получающий доступ к Сервису, либо использовать или запускать любой несанкционированный скрипт или иное ПО',
          'использовать Сервис для отправки автоматизированных запросов на любой сайт или для рассылки нежелательной коммерческой почты',
          'унижать, порочить или иным образом вредить, по нашему мнению, нам и/или Сервису',
          'использовать Сервис способом, несовместимым с применимыми законами или правилами, либо иным образом нарушать настоящие Условия',
        ],
      },
      {
        kind: 'p',
        content:
          '8.8 При общении с представителями службы поддержки мы просим сохранять уважительное и доброжелательное поведение. Если ваше поведение по отношению к любому сотруднику поддержки или иному сотруднику в любой момент будет воспринято как угрожающее, преследующее или оскорбительное, мы оставляем за собой право немедленно прекратить ваш аккаунт и диалог.',
      },
    ],
  },
  {
    title: '9. Отказ от ответственности',
    blocks: [
      {
        kind: 'p',
        content:
          '9.1 Ничто на этом Сайте не предназначено для предоставления профессиональной юридической, финансовой, инвестиционной, налоговой или иной специализированной консультации. Мы предоставляем образовательный цифровой контент, посвящённый искусственному интеллекту, AI-инструментам, технологиям и практическому использованию таких инструментов.',
      },
      {
        kind: 'p',
        content:
          'Сервис может содержать информацию о сторонних AI-платформах, ПО, моделях искусственного интеллекта, автоматизации, создании контента и других технологиях. Мы не гарантируем постоянную доступность, неизменность функций, цен или технических характеристик сторонних сервисов. Такие продукты и услуги могут меняться, прекращать работу, менять условия использования или становиться недоступными.',
      },
      {
        kind: 'p',
        content:
          'Сервис предназначен как образовательный инструмент и может быть полезен для получения знаний и практических навыков работы с AI. Однако мы не гарантируем, что использование Сервиса приведёт к определённому уровню дохода, трудоустройству, экономии, росту бизнеса, увеличению продаж или любому иному конкретному результату.',
      },
      {
        kind: 'p',
        content:
          '9.2 Вы используете Сайт, Сервис и любую содержащуюся в них информацию исключительно на свой риск. Мы не несём ответственности за любые убытки или ущерб, включая косвенный, особый, случайный или штрафной, возникающие из использования Сайта, Сервиса, курсов, материалов или информации, содержащейся в Сервисе или предоставляемой через него, включая ошибки или упущения в такой информации.',
      },
      {
        kind: 'p',
        content:
          'Все пользователи Услуг соглашаются самостоятельно оценивать полученную информацию и принимать решения о её применении. Информация об искусственном интеллекте и ПО может быстро устаревать, поскольку технологии, модели, интерфейсы, цены, функции и условия сторонних сервисов могут меняться. Мы не гарантируем, что информация в курсах всегда будет полностью актуальной для каждого стороннего AI-инструмента. При использовании сторонних сервисов вы должны самостоятельно изучать их официальную документацию, условия использования и ограничения.',
      },
      {
        kind: 'p',
        content:
          'Использование Сервиса не создаёт профессиональных отношений «консультант — клиент» между вами и Компанией, если иное прямо не предусмотрено отдельным письменным соглашением. Материалы Сервиса не предназначены для замены консультаций квалифицированных специалистов в соответствующих областях.',
      },
      {
        kind: 'p',
        content:
          'Компания не несёт ответственности за неточности или искажения в вашем понимании курсов, уроков, практических заданий или иного контента Сервиса. Вам следует внимательно изучать всю информацию на платформе и обращаться в поддержку при наличии вопросов.',
      },
      {
        kind: 'p',
        content:
          'Обратите внимание: материалы Сервиса предназначены исключительно для образовательных и информационных целей. Они не гарантируют конкретный профессиональный, финансовый или коммерческий результат. Важно понимать, что решения о применении полученных знаний вы принимаете самостоятельно и несёте ответственность за результаты их использования.',
      },
      {
        kind: 'p',
        content:
          '9.3 Уровень подготовки и цели каждого пользователя различаются, поэтому мы не даём гарантий, что наши Услуги будут одинаково подходящими или эффективными для каждого. Мы можем персонализировать рекомендации и учебные материалы на основе информации, полученной при регистрации или обучении.',
      },
      {
        kind: 'p',
        content:
          'Мы прилагаем все усилия для предоставления качественных учебных материалов, однако не гарантируем, что наши курсы, материалы и рекомендации обеспечат конкретный результат. Мы не даём гарантий относительно уровня успеха, который вы можете получить, и вы принимаете риск того, что результаты у каждого будут различаться. Отзывы и примеры в Сервисе — это примеры конкретных результатов и не предназначены гарантировать, что любой пользователь достигнет тех же или схожих результатов.',
      },
      {
        kind: 'p',
        content:
          'Нет гарантии, что примеры прошлых результатов можно воспроизвести в будущем. Результаты обучения могут различаться и зависят от многих факторов, включая исходный уровень знаний, практику, выбранные инструменты, качество выполнения заданий, регулярность обучения и изменения в технологиях искусственного интеллекта. Использование Сервиса должно осуществляться по вашему усмотрению, и вы соглашаетесь, что Компания не несёт ответственности за любой успех или неудачу, прямо или косвенно связанные с покупкой и использованием Сервиса.',
      },
      {
        kind: 'p',
        content:
          '9.4 Сайт может содержать ссылки на другие сайты, поддерживаемые третьими лицами. Любая информация, продукты, ПО или услуги, предоставляемые на сторонних сайтах или через них, контролируются операторами таких сайтов, а не нами или нашими аффилированными лицами. Доступ к сторонним сайтам вы осуществляете на свой риск.',
      },
      {
        kind: 'p',
        content:
          '9.5 Мы уважаем конфиденциальность клиентов, поэтому все отзывы и/или комментарии на Сайте могут содержать вымышленные имена и связанные изображения. Мы знаем личность потребителей, но никогда не отображаем настоящие имена пользователей без их согласия на отображение имени и/или изображения.',
      },
      {
        kind: 'p',
        content:
          '9.6 Если не указано иное, этот Сайт является нашей собственностью, и весь исходный код, базы данных, функциональность, ПО, дизайн, тексты, фотографии и графические изображения на Сайте принадлежат или контролируются нами и защищены законами об авторском праве и товарных знаках. Копирование или использование любого контента Сайта без нашего предварительного письменного разрешения запрещено.',
      },
      {
        kind: 'p',
        content:
          '9.7 Услуги, предлагаемые на сайте или через него, предоставляются «как есть» и без каких‑либо гарантий, явных или подразумеваемых. В максимально допустимой законом степени мы отказываемся от всех гарантий, явных или подразумеваемых, включая, помимо прочего, подразумеваемые гарантии товарной пригодности и пригодности для определённой цели.',
      },
      {
        kind: 'p',
        content:
          '9.8 Мы не гарантируем, что сайт или любые его функции будут работать непрерывно или без ошибок, что дефекты будут исправлены, или что любая часть этого сайта либо серверы, обеспечивающие его работу, свободны от вирусов или иных вредоносных компонентов. Мы прямо отказываемся от ответственности за любой ущерб, вызванный неисправностью, ошибкой, упущением, прерыванием, удалением, дефектом, задержкой в работе или передаче, компьютерным вирусом, сбоем линии связи, кражей или уничтожением, либо несанкционированным доступом к любой записи, её изменением или использованием, независимо от того, возникло ли это вследствие нарушения договора, деликта, небрежности или иной причины иска. Каждый пользователь специально признаёт, что мы не несём ответственности за клеветнические, оскорбительные или незаконные действия других третьих лиц, подписчиков, участников или иных пользователей сайта, и что риск вреда от вышеизложенного полностью лежит на каждом пользователе.',
      },
      {
        kind: 'p',
        content:
          '9.9 Любая информация на Сайте предназначена только для образовательных и информационных целей. Материалы Сервиса не гарантируют конкретный результат и не должны рассматриваться как профессиональная юридическая, финансовая, инвестиционная, налоговая или иная консультация. Вы принимаете на себя все риски, связанные с применением информации, представленной на Сайте и в Сервисе.',
      },
      {
        kind: 'p',
        content:
          '9.10 Мы приложили все усилия, чтобы как можно точнее отобразить материалы, изображения, интерфейсы и описания услуг на Сайте. Однако мы не можем гарантировать, что отображение материалов на вашем устройстве полностью соответствует их реальному виду, или что интерфейсы или функции сторонних AI-сервисов точно соответствуют представленным в наших учебных материалах.',
      },
    ],
  },
  {
    title: '10. Возмещение убытков',
    blocks: [
      {
        kind: 'p',
        content:
          '10.1 Вы соглашаетесь возмещать убытки, защищать и ограждать нас и наших аффилированных лиц, а также соответствующих должностных лиц, директоров, владельцев, агентов, поставщиков информации и лицензиаров от любых претензий, обязательств, убытков, ущерба, затрат и расходов (включая гонорары адвокатов) в связи с: (a) вашим использованием или подключением к нашему сайту; (b) любым использованием или предполагаемым использованием вашего аккаунта или пароля любым лицом, уполномоченным вами или нет; (c) содержанием информации, предоставленной вами нам; (d) нарушением вами прав любого физического или юридического лица; (e) нарушением вами любых применимых законов, правил или нормативных актов.',
      },
      {
        kind: 'p',
        content:
          '10.2 Мы оставляем за собой право за свой счёт принять на себя защиту и контроль любого дела, иначе подлежащего возмещению вами, и в таком случае вы соглашаетесь сотрудничать с нами в защите такой претензии.',
      },
      {
        kind: 'p',
        content:
          '10.3 Вы соглашаетесь возмещать убытки и ограждать Компанию, её правопреемников, дочерние, аффилированные и связанные компании, поставщиков, лицензиаров и партнёров, а также должностных лиц, директоров, сотрудников, агентов и представителей каждого из них от ответственности, включая затраты и гонорары адвокатов, возникающей из любой претензии или требования третьей стороны в связи с использованием вами Сервиса или Продуктов, вашим Пользовательским контентом или нарушением вами настоящих Условий.',
      },
      {
        kind: 'p',
        content:
          '10.4 Компания оставляет за собой право за ваш счёт принять на себя исключительную защиту и контроль любого дела, по которому вы обязаны возмещать нам убытки, и вы соглашаетесь сотрудничать в нашей защите таких претензий. Вы соглашаетесь не урегулировать любое дело без предварительного письменного согласия Компании. Компания приложит разумные усилия, чтобы уведомить вас о любых таких претензиях, действиях или разбирательствах, как только станет о них известно.',
      },
    ],
  },
  {
    title: '11. Ограничение ответственности',
    blocks: [
      {
        kind: 'p',
        content:
          '11.1 Ни при каких обстоятельствах мы, наши директора, должностные лица, сотрудники, аффилированные лица, агенты, подрядчики, стажёры, поставщики, поставщики услуг или лицензиары не несём ответственности за любые ошибки, убытки, упущенную выгоду или иные последствия, ущерб, претензии или любые прямые, косвенные, случайные, штрафные, особые или последующие убытки любого рода, включая, помимо прочего, упущенную выгоду, упущенный доход, упущенную экономию, потерю данных, затраты на замену или аналогичный ущерб, независимо от того, основаны ли они на договоре, деликте (включая небрежность), строгой ответственности или ином основании, возникающие из использования вами любой услуги или любых продуктов, приобретённых с использованием Услуг, либо из любых иных претензий, так или иначе связанных с использованием вами Услуг, включая, помимо прочего, любые ошибки или упущения в любом контенте, либо любой убыток или ущерб любого рода, понесённый в результате использования услуги или любого контента (или продукта), размещённого, переданного или иным образом сделанного доступным через Услуги, даже если вас предупреждали о возможности такого ущерба.',
      },
      {
        kind: 'p',
        content:
          '11.2 Если вы недовольны Сайтом, любыми материалами, продуктами или услугами на Сайте либо любыми условиями использования Сайта, ваше единственное средство защиты — прекратить использование Сайта.',
      },
      {
        kind: 'p',
        content:
          '11.3 Ни при каких обстоятельствах мы (и наши аффилированные лица) не несём ответственности перед вами или любой третьей стороной за упущенную выгоду или любые косвенные, последующие, показательные, случайные, особые или штрафные убытки, возникающие из настоящих Условий или из использования вами Сервиса (включая приложение или контент) и сторонних продуктов или рекламы либо из невозможности их использовать, даже если нас предупреждали о возможности такого ущерба. Доступ к Сервису и его использование (включая приложение, контент и Пользовательский контент) и стороннюю рекламу осуществляются по вашему усмотрению и на ваш риск, и вы единолично несёте ответственность за любой ущерб вашей компьютерной системе или потерю данных в результате этого.',
      },
      {
        kind: 'p',
        content:
          '11.4 Несмотря на что-либо содержащееся в настоящем документе, вы соглашаетесь, что совокупная ответственность Компании перед вами по любым претензиям, возникающим из использования приложения, контента, Сервиса или Продуктов, ограничена суммой, уплаченной вами Компании за доступ к Сервису и его использование. Ограничения ущерба, изложенные выше, являются основополагающими элементами основы Условий между Компанией и вами.',
      },
      {
        kind: 'p',
        content:
          '11.5 Если вы являетесь резидентом Калифорнии, вы настоящим отказываетесь от статьи 1542 Гражданского кодекса Калифорнии, которая предусматривает: «Общий отказ от претензий не распространяется на претензии, о существовании которых кредитор или отказывающаяся сторона не знает или не подозревает в свою пользу на момент исполнения отказа и которые, будь они известны, существенно повлияли бы на урегулирование с должником или освобождённой стороной.»',
      },
      {
        kind: 'p',
        content:
          '11.6 В некоторых юрисдикциях не допускается ограничение или исключение ответственности за случайный или последующий ущерб, поэтому вышеуказанное ограничение или исключение может к вам не применяться, и у вас могут быть иные законные права, зависящие от юрисдикции. Если один или любой аспект ограничений, изложенных выше, не применяется, все остальные аспекты остаются в силе, даже если какое‑либо средство защиты неприменимо.',
      },
    ],
  },
  {
    title: '12. Интеллектуальная собственность',
    blocks: [
      {
        kind: 'p',
        content:
          '12.1 Все права интеллектуальной собственности, включая, помимо прочего, товарные знаки, авторские права, доменные имена, права на базы данных, права на дизайн, патенты и все иные права на любые творения любого рода, зарегистрированные или нет («Интеллектуальная собственность»), на Сайте защищены применимыми законами об интеллектуальной собственности, включая Copyright, Designs and Patents Act 1988 (Соединённое Королевство).',
      },
      {
        kind: 'p',
        content:
          '12.2 Вы не можете копировать, перепрофилировать или распространять любую Интеллектуальную собственность или иной контент, полученный от нас или найденный на Сайте, для любых целей без нашего явного письменного разрешения. Не ограничивая вышеизложенное, использование нашего контента в коммерческих целях запрещено, если у вас нет нашего явного письменного разрешения.',
      },
      {
        kind: 'p',
        content:
          '12.3 Вся Интеллектуальная собственность, размещённая на Сайте или предоставленная вам в иной форме, принадлежит Компании, за исключением товарных знаков, знаков обслуживания или иных материалов третьих лиц, которые мы используем. Никакая такая Интеллектуальная собственность не может использоваться без нашего или третьего лица предварительного письменного согласия, если такое третье лицо владеет этой Интеллектуальной собственностью.',
      },
      {
        kind: 'p',
        content:
          '12.4 Если вы заметите, что третье лицо использует Интеллектуальную собственность Компании на своих сайтах, сообщите об этом в нашу службу поддержки.',
      },
    ],
  },
  {
    title: '13. Применимое право и споры',
    blocks: [
      {
        kind: 'p',
        content:
          '13.1 Если у вас есть жалобы в отношении Сайта, списаний, возвратов, качества Услуг или чего‑либо, связанного с использованием Сайта, вы должны сначала связаться с нашей службой поддержки по email до любых действий через третьих лиц. Обратите внимание: соглашаясь с настоящими Условиями, вы соглашаетесь связаться с нами до запроса возврата у банка или провайдера карты, чтобы дать нам возможность решить любые возникшие вопросы.',
      },
      {
        kind: 'p',
        content:
          '13.2 Все жалобы или претензии, поданные вами, должны быть обработаны в течение 30 дней с момента получения. Мы всегда прилагаем все усилия для позитивного разрешения любой жалобы или претензии. При обращении с жалобами вы всегда должны идентифицировать себя тем же именем и фамилией, которые указывали при покупке на Сайте.',
      },
      {
        kind: 'p',
        content:
          '13.3 Правоотношения между вами и нами регулируются правом Англии и Уэльса. Если вы являетесь потребителем, вы также сохраняете выгоды любых императивных защит права страны вашего проживания.',
      },
      {
        kind: 'p',
        content:
          '13.4 В пределах, допускаемых применимым правом, любая претензия должна предъявляться инициирующей стороной в индивидуальном качестве, а не в качестве истца или участника коллективного иска или иного аналогичного разбирательства.',
      },
      {
        kind: 'p',
        content:
          '13.5 Первичное урегулирование споров. Мы всегда заинтересованы в мирном и эффективном разрешении споров. Если у вас есть спор с Компанией, вы соглашаетесь до любых формальных действий связаться с нами по email и предоставить краткое письменное описание спора и ваши контактные данные. Стороны соглашаются прилагать все усилия для разрешения любого спора, претензии, вопроса или разногласия напрямую через консультации с Компанией, и добросовестные переговоры являются предварительным условием для любой стороны. Участие в неформальном урегулировании споров — обязательное предварительное условие до начала разбирательства. Сроки исковой давности и сроки подачи соблюдаются, пока стороны участвуют в процессе неформального урегулирования, требуемом настоящей оговоркой.',
      },
      {
        kind: 'p',
        content:
          '13.6 Отказ от коллективных исков и коллективной защиты. В пределах, допускаемых применимым правом, отсутствует право или полномочие рассматривать любые претензии в судебном разбирательстве на коллективной, совместной или объединённой основе либо по основаниям, включающим претензии в предполагаемом представительском качестве от имени широкой публики, других пользователей Услуг или любых иных лиц. Если мы инициируем разбирательство против вас, и вы являетесь потребителем, мы оплатим все расходы, связанные с разбирательством (но не ваши гонорары адвокатов, если таковые имеются). Стороны сами оплачивают своих адвокатов, если иное не предусмотрено применимыми правилами и/или правом.',
      },
    ],
  },
  {
    title: '14. Прочие положения',
    blocks: [
      {
        kind: 'p',
        content:
          '14.1 Если какое‑либо положение настоящих Условий будет признано незаконным, ничтожным или неисполнимым, такое положение тем не менее подлежит исполнению в максимальной степени, допускаемой применимым правом, а неисполнимая часть считается отделённой от настоящих Условий обслуживания; такое определение не влияет на действительность и исполнимость любых иных оставшихся положений. Вы можете ознакомиться с актуальной версией Условий обслуживания в любое время на этой странице. Мы оставляем за собой право по своему усмотрению обновлять, изменять или заменять любую часть настоящих Условий обслуживания путём публикации обновлений и изменений на нашем сайте.',
      },
      {
        kind: 'p',
        content:
          '14.2 Никакая задержка или упущение с нашей стороны в осуществлении любых наших прав, возникающих из вашего несоблюдения или неисполнения обязательств по настоящим Условиям, не умаляет такое право и не толкуется как отказ от него, а отказ Компании от любого обязательства, условия или соглашения, которое вы обязаны исполнять, не толкуется как отказ от любого последующего нарушения этого или любого иного обязательства, условия или соглашения, содержащегося в настоящем документе.',
      },
      {
        kind: 'p',
        content:
          '14.3 С учётом раздела 13, если какое‑либо положение настоящих Условий будет признано недействительным или неисполнимым, настоящие Условия остаются в полной силе и подлежат изменению так, чтобы стать действительными и исполнимыми, отражая намерения сторон в максимальной степени, допускаемой законом.',
      },
      {
        kind: 'p',
        content:
          '14.4 Если иное прямо не предусмотрено в настоящем документе, настоящие Условия составляют полное соглашение между вами и Компанией в отношении их предмета и заменяют все предыдущие обещания, соглашения или заявления, письменные или устные, относительно такого предмета.',
      },
      {
        kind: 'p',
        content:
          '14.5 Компания может передать или уступить любые и все свои права и обязательства по настоящим Условиям любому иному лицу любым образом, включая новацию, и принимая настоящие Условия, вы соглашаетесь на любую такую уступку и передачу Компанией. Вы признаёте, что публикация на Сервисе версии Условий, идентифицирующей иное лицо как сторону Условий, составляет действительное уведомление вам о передаче прав и обязательств Компании по Условиям (если прямо не указано иное).',
      },
      {
        kind: 'p',
        content:
          '14.6 Вся информация, передаваемая через Сервис, считается электронным сообщением. Когда вы общаетесь с нами через Сервис или иными электронными средствами, например email, вы общаетесь с нами электронно. Вы соглашаетесь, что мы можем общаться с вами электронно и что такие сообщения, а также уведомления, раскрытия, соглашения и иные сообщения, которые мы предоставляем вам электронно, эквивалентны письменным сообщениям и имеют ту же силу и действие, как если бы они были сделаны письменно и подписаны стороной, отправляющей сообщение. Вы также соглашаетесь, что такое общение может осуществляться с использованием сторонних провайдеров. Вы также признаёте и соглашаетесь, что нажатие «SUBMIT», «CONTINUE», «REGISTER», «I AGREE» или аналогичных ссылок или кнопок является предоставлением юридически обязательной электронной подписи и заключением юридически обязательного соглашения. Вы признаёте, что ваши электронные представления составляют ваше согласие и намерение соблюдать настоящие Условия. Вы настоящим соглашаетесь на использование электронных подписей, договоров, заказов и иных записей, а также на электронную доставку уведомлений, политик и записей транзакций, инициированных или завершённых через Сервис.',
      },
      {
        kind: 'p',
        content:
          '14.7 Ни при каких обстоятельствах Компания не несёт ответственности за несоблюдение настоящих Условий в той мере, в какой такое несоблюдение вызвано факторами вне разумного контроля Компании.',
      },
    ],
  },
  {
    title: '15. Изменения',
    blocks: [
      {
        kind: 'p',
        content:
          '15.1 Мы оставляем за собой право вносить изменения в настоящие Условия в любое время и по своему усмотрению. Периодически проверяйте настоящие Условия, чтобы быть в курсе любых новых поправок. На этом сайте мы будем публиковать объявления о любых изменениях и дополнениях к положениям настоящих Условий. Поправки не имеют обратной силы и применяются с даты публикации.',
      },
      {
        kind: 'p',
        content:
          '15.2 В максимально допустимой законом степени мы можем изменить плату за подписку в любое время. Мы заранее уведомим вас о любых таких изменениях цен путём публикации новых цен в приложении или через него и/или направив уведомление по email или иным заметным способом. Если вы не хотите платить новые суммы, вы можете отменить соответствующую подписку до вступления изменений в силу.',
      },
    ],
  },
  {
    title: '16. Контактная информация и регистрация профиля',
    blocks: [
      {
        kind: 'p',
        content: '16.1 Вы можете связаться с нами, используя реквизиты, указанные в начале настоящего Документа.',
      },
      { kind: 'companyDetails' },
      {
        kind: 'p',
        content:
          '16.2. Для использования отдельных функций Сервиса вам может потребоваться зарегистрировать профиль («Профиль») и предоставить определённую информацию о себе, запрашиваемую в форме регистрации.',
      },
      {
        kind: 'p',
        content:
          '16.3. Если вы регистрируете Профиль, вы заявляете и гарантируете Компании, что: вся требуемая регистрационная информация, которую вы предоставляете, правдива и точна; вы будете поддерживать точность такой информации; и ваше использование Сервиса не нарушает применимые законы или нормативные акты либо настоящие Условия. В противном случае Сервис может работать некорректно, и мы можем быть не в состоянии связаться с вами и предоставить важные уведомления.',
      },
      {
        kind: 'p',
        content:
          '16.4. Сервис не предназначен для использования лицами младше 18 лет. Используя Услуги, вы заявляете и гарантируете, что вам не менее 18 лет и вы обладаете правом, полномочиями и правоспособностью заключить настоящие Условия и соблюдать их положения и условия.',
      },
      {
        kind: 'p',
        content:
          '16.5. Компания оставляет за собой право приостановить или прекратить ваш Профиль или доступ к Сервису с уведомлением или без него в случае нарушения вами настоящих Условий.',
      },
      {
        kind: 'p',
        content:
          '16.6. Вы несёте ответственность за сохранение конфиденциальности учётных данных Профиля и полностью ответственны за все действия, совершаемые под вашим Профилем. Вы соглашаетесь немедленно уведомлять Компанию о любом несанкционированном использовании или подозрении на несанкционированное использование вашего Профиля либо о любом ином нарушении безопасности. Компания не может и не будет нести ответственность за любой убыток или ущерб, возникший из вашего несоблюдения вышеуказанных требований.',
      },
    ],
  },
  {
    title: '17. Применимое право и подсудность',
    blocks: [
      {
        kind: 'p',
        content:
          '17.1 Настоящие Условия регулируются и толкуются в соответствии с правом Англии и Уэльса.',
      },
      {
        kind: 'p',
        content:
          '17.2 Суды Англии и Уэльса обладают юрисдикцией в отношении любого спора, возникающего из настоящих Условий или в связи с ними. Если вы являетесь потребителем, проживающим в Шотландии или Северной Ирландии, вы также можете предъявлять иски в местных судах, а если вы являетесь потребителем, проживающим в ином месте, вы также можете предъявлять иски в судах страны вашего проживания, где императивное право даёт вам такое право.',
      },
      {
        kind: 'p',
        content:
          '17.3 Ничто в настоящем разделе не лишает потребителя защиты императивных положений права страны его проживания.',
      },
    ],
  },
  {
    title: '18. Дополнительный отказ от гарантий',
    blocks: [
      {
        kind: 'p',
        content:
          '18.1 Общий отказ от гарантий. За исключением случаев, запрещённых законом или иным образом неприменимых, вы прямо понимаете и соглашаетесь, что используете Сервис на свой риск, а Сервис и Продукты предоставляются на условиях «как есть» и «как доступно». Компания и её аффилированные лица, должностные лица, сотрудники, агенты, партнёры и лицензиары прямо отказываются от всех гарантий любого рода, явных или подразумеваемых, включая, помимо прочего, подразумеваемые гарантии товарной пригодности, пригодности для определённой цели и ненарушения прав, а также любых гарантий в отношении продуктов или услуг, предлагаемых предприятиями, перечисленными на Сервисе.',
      },
      {
        kind: 'p',
        content: 'В частности, освобождённые стороны не дают и прямо отказываются от любых гарантий того, что:',
      },
      {
        kind: 'ul',
        items: [
          'Сервис будет соответствовать вашим требованиям',
          'Сервис будет непрерывным, своевременным, безопасным или безошибочным',
          'результаты, которые могут быть получены от использования Сервиса, включая данные, будут точными и надёжными',
          'качество любых данных или услуг, доступных через Сервис, будет соответствовать вашим ожиданиям',
          'любые ошибки в Сервисе будут исправлены',
        ],
      },
      {
        kind: 'p',
        content:
          'Доступ к любому материалу, полученному через Сервис, осуществляется по вашему усмотрению и на ваш риск, и вы будете единолично ответственны за любой ущерб вашей компьютерной системе или мобильному устройству либо потерю данных в результате использования любого такого материала. Мы не можем гарантировать и не обещаем каких‑либо конкретных результатов от использования Приложения и/или Сервиса. Вы также соглашаетесь принять риск прекращения Сервиса по любым техническим причинам.',
      },
      {
        kind: 'p',
        content:
          '18.2 Отсутствие консультаций в рамках Сервиса. Любое заявление, которое может быть размещено на Сервисе, предназначено исключительно для информационных и развлекательных целей и не предназначено для замены любой профессиональной финансовой, медицинской, юридической или иной консультации. Компания не делает заявлений или гарантий и в максимально допустимой законом степени прямо отказывается от любой ответственности, связанной с вашей опорой на заявления или иную информацию, предлагаемую или предоставляемую в Сервисе или через него. Если у вас есть конкретные опасения или ситуация, требующая профессиональной или медицинской консультации, вам следует обратиться к соответствующим образом подготовленному и квалифицированному специалисту.',
      },
      {
        kind: 'p',
        content:
          '18.3 Изменение информации Сайта и Услуг. Мы можем изменять всю информацию, предоставляемую на Сервисе, по своему усмотрению без предварительного уведомления. Мы можем в любое время изменять или прекращать, временно или постоянно, Сервис (или любую его часть) по своему усмотрению с уведомлением или без него.',
      },
    ],
  },
  {
    title: '19. Сервис',
    blocks: [
      {
        kind: 'p',
        content:
          '19.1. Вы признаёте, что весь текст, изображения, знаки, логотипы, компиляции (т. е. сбор, расположение и сборка информации), данные, иной контент, ПО и материалы, отображаемые на Сервисе или используемые Компанией для работы Сервиса (включая Приложение и Контент, исключая любой Пользовательский контент), являются собственностью нас или третьих лиц.',
      },
      {
        kind: 'p',
        content:
          '19.2. Компания прямо сохраняет все права, включая все права интеллектуальной собственности, на вышеизложенное, и за исключением случаев, прямо разрешённых настоящими Условиями, любое использование, перераспределение, продажа, декомпиляция, обратная разработка, разборка, перевод или иное использование строго запрещены. Предоставление Сервиса не передаёт вам или любой третьей стороне какое‑либо право, титул или интерес в отношении таких прав интеллектуальной собственности.',
      },
      {
        kind: 'p',
        content:
          '19.3. Информация, которую вы предоставляете нам при регистрации, а также любой контент, материалы или информация (включая, помимо прочего, любой текст, информацию, графику, сообщения, фотографии, изображения и объекты авторского права), вопросы, комментарии, предложения, отзывы или иной контент, которые вы загружаете, отправляете, пересылаете по email, отображаете, исполняете, распространяете, публикуете или иным образом передаёте нам по нашему запросу или по вашему усмотрению на Сервисе или через Услуги, независимо от того, связано ли это с использованием Услуг или иным образом, и независимо от того, опубликовано ли публично или передано нам конфиденциально через Сервис («Пользовательский контент»), остаётся вашей интеллектуальной собственностью.',
      },
      {
        kind: 'p',
        content:
          '19.4. Компания не претендует на авторские права в отношении Пользовательского контента. Несмотря на вышеизложенное, вы соглашаетесь предоставить Компании лицензию в соответствии с разделом 20 настоящих Условий. Вы также соглашаетесь, что Компания может сохранять копии всей регистрационной информации и Пользовательского контента и использовать такую информацию и Пользовательский контент, если это разумно необходимо или связано с работой Сервиса и как описано в настоящих Условиях.',
      },
      {
        kind: 'p',
        content:
          '19.5. С учётом настоящих Условий Компания предоставляет вам непередаваемую, неисключительную лицензию (без права сублицензирования) на использование Сервиса исключительно в личных некоммерческих целях.',
      },
      {
        kind: 'p',
        content:
          '19.6. Вы соглашаетесь, заявляете и гарантируете, что использование вами Сервиса или любой его части будет соответствовать вышеуказанной лицензии, соглашениям и ограничениям и не будет нарушать права любой иной стороны или нарушать любой договор или правовое обязательство перед иными сторонами. Кроме того, вы соглашаетесь соблюдать все применимые законы, правила и нормативные акты, относящиеся к Сервису или его использованию, и будете единолично ответственны за ваши индивидуальные нарушения любых таких законов.',
      },
      {
        kind: 'p',
        content:
          '19.7. Вы единолично несёте ответственность за получение оборудования и телекоммуникационных услуг, необходимых для доступа к Сервису, а также за все связанные расходы (например, компьютерное оборудование и платежи провайдеру интернет-услуг).',
      },
      {
        kind: 'p',
        content:
          '19.8. Мы оставляем за собой право вносить любые изменения в Сервис (бесплатные или платные функции) в любое время с уведомлением или без него. За исключением случаев, запрещённых законом или иным образом неприменимых, Компания не несёт ответственности перед вами или любой третьей стороной за любое изменение, приостановку или прекращение любой функции, компонента или контента Компании. Если такие изменения затрагивают ваше использование Сервиса, вы можете удалить аккаунт или отменить подписку в любое время.',
      },
      {
        kind: 'p',
        content:
          '19.9. Вы получаете доступ к Сервису и используете его на свой риск. За исключением случаев, запрещённых законом или иным образом неприменимых, Компания не несёт ответственности за любой ущерб вашей компьютерной системе, потерю данных или иной вред вам или любой третьей стороне, включая, помимо прочего, любой телесный вред, возникающий из вашего доступа к Сервису или его использования либо из вашей опоры на любую информацию или совет.',
      },
      {
        kind: 'p',
        content:
          '19.10. Компания не обязана предоставлять вам какую‑либо поддержку клиентов. Однако Компания может время от времени предоставлять вам поддержку клиентов по своему усмотрению.',
      },
    ],
  },
  {
    title: '20. Услуги куратора',
    blocks: [
      {
        kind: 'p',
        content:
          '20.1. В рамках Сервиса Компания может предлагать интерактивные услуги куратора, которые связывают вас с кураторами и информацией, помогающей достигать ваших целей («Услуги куратора»).',
      },
      {
        kind: 'p',
        content: '20.2. Если у вас есть доступ к Подписке, вы сможете взаимодействовать с кураторами.',
      },
      {
        kind: 'p',
        content:
          '20.3. Куратор поможет вам достигать целей, предоставляя мотивационные инструменты. Компания может по своему усмотрению нанимать или заменять любого куратора другим для пользователей Подписки.',
      },
      {
        kind: 'p',
        content:
          '20.4. Услуги куратора не являются медицинскими, психиатрическими или иной формой здравоохранения. Услуги куратора не предоставляют медицинских услуг и не предназначены для замены профессиональной медицинской консультации, консультации или лечения квалифицированных врачей. Компания не поддерживает каких‑либо конкретных медицинских специалистов, тесты, продукты, процедуры, мнения или иную информацию, которая может упоминаться в коучинговых услугах. Важно проконсультироваться с врачом перед использованием услуг коуча/куратора/педагога. В случае медицинской чрезвычайной ситуации немедленно обратитесь к врачу или в соответствующую службу экстренной помощи.',
      },
    ],
  },
  {
    title: '21. Пользовательский контент',
    blocks: [
      {
        kind: 'p',
        content:
          '21.1. Предоставление лицензии. Вы настоящим предоставляете Компании, её сублицензиатам, правопреемникам и цессионариям и передаёте им безвозмездное, бессрочное, сублицензируемое, уступаемое, неисключительное право и лицензию (а также согласие) использовать, лицензировать, воспроизводить, изменять, адаптировать, публиковать, переводить, передавать, редактировать, переформатировать, создавать производные произведения, распространять, извлекать доход или иное вознаграждение, сообщать публике, воспроизводить, отображать и иным образом использовать любой Пользовательский контент (полностью или частично) по всему миру и/или включать Пользовательский контент в другие произведения в любой форме, на любых носителях или с использованием технологий, известных сейчас или разработанных позднее, на весь срок любых авторских прав, товарных знаков и иных интеллектуальных и имущественных прав (совместно — «Права»), которые могут существовать в таком Пользовательском контенте.',
      },
      {
        kind: 'p',
        content:
          '21.2. Лицензия, предоставленная в настоящем документе, прямо исключает любые персональные данные в значении применимых законов и нормативных актов о конфиденциальности.',
      },
      {
        kind: 'p',
        content:
          '21.3. Вы настоящим заявляете и гарантируете, что владеете всеми правами, титулом и интересом в отношении Пользовательского контента либо иным образом уполномочены предоставить права, предоставленные Компании по настоящему разделу. Вы далее гарантируете, что в той мере, в какой вы не являетесь исключительным владельцем всех прав на Пользовательский контент, любое третье лицо, владеющее какими‑либо правами, включая моральные права, в таком Пользовательском контенте, полностью и эффективно отказалось от всех таких прав и законно и безотзывно предоставило вам право предоставить лицензию, изложенную выше. Вы также признаёте, что мы, наши правопреемники и цессионарии имеем право на неограниченное использование Пользовательского контента для любых целей, коммерческих или иных, без компенсации поставщику Пользовательского контента. С учётом вышеизложенного владелец Пользовательского контента, размещённого на Услугах, сохраняет любые Права, которые могут существовать в таком Пользовательском контенте. Мы не несём ответственности за сохранение копий любых материалов, которые мы удаляем из наших Услуг, и не будем нести ответственность за любые убытки, которые вы понесёте, если Контент, который вы размещаете или передаёте на наши Услуги, будет удалён.',
      },
      {
        kind: 'p',
        content:
          '21.4. Если вы хотите отозвать лицензию, предоставленную в отношении определённого Пользовательского контента, свяжитесь с нами по email.',
      },
      {
        kind: 'p',
        content: [
          { kind: 'text', value: 'Связанные документы: ' },
          { kind: 'link', route: 'privacy', label: 'Политика конфиденциальности' },
          { kind: 'text', value: ' · ' },
          { kind: 'link', route: 'cookie', label: 'Политика cookie' },
          { kind: 'text', value: ' · ' },
          { kind: 'link', route: 'refund', label: 'Политика возврата' },
          { kind: 'text', value: ' · ' },
          { kind: 'link', route: 'billing', label: 'Оплата и тарифы' },
          { kind: 'text', value: ' · ' },
          { kind: 'link', route: 'contact', label: 'Контакты' },
        ],
      },
    ],
  },
]

export const TERMS_PAGE_COPY: Record<MarketingLocale, TermsPageCopy> = {
  en: {
    pageTitle: 'Terms & Conditions — Mindora Academy',
    heroTitle: 'Terms & Conditions',
    updated: '26 October 2026',
    sections: EN_SECTIONS,
  },
  ru: {
    pageTitle: 'Условия и положения — Mindora Academy',
    heroTitle: 'Условия и положения',
    updated: '26 октября 2026',
    sections: RU_SECTIONS,
  },
}

export function termsPageCopy(locale: MarketingLocale): TermsPageCopy {
  return TERMS_PAGE_COPY[locale]
}
