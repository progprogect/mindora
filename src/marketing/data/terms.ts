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
  sections: TermsSection[]
}

const EN_SECTIONS: TermsSection[] = [
  {
    title: "Company Information",
    blocks: [
      { kind: "p", content: [
          { kind: "text", value: "Thank you for visiting our website " },
          { kind: "extWebsite" },
          { kind: "text", value: " (hereinafter referred to as the \"Website\")." },
        ] },
      { kind: "companyDetails" },
      { kind: "p", content: "Note: In this document, the terms \"Company\", \"we\", \"us\", and \"our\" refer to the above-mentioned legal entity. \"Service\" refers to the above-mentioned service name, including the Website and all related services." },
      { kind: "p", content: "Before using any function of the Website or any products and services available through the Website, please take the time to carefully read and understand these Terms and Conditions (hereinafter referred to as the \"Terms\"), as these Terms govern all relationships between you (hereinafter referred to as the \"User\", \"you\", or \"Customer\") and us." },
      { kind: "p", content: "The Company makes no representations that the Service is available, suitable, or legally available for use in your jurisdiction, and access to and use of the Service are prohibited in territories where such use would be unlawful. You access the Service on your own initiative and are responsible for complying with local laws." },
      { kind: "p", content: "Please do not continue to make any purchases on the Website if you have not carefully read and understood the provisions of these Terms, because whenever you purchase anything from us, these Terms will be considered a legally binding agreement between you and us." },
      { kind: "p", content: "The Website includes subscriptions that automatically renew. Please carefully read these Terms before starting a trial or completing the purchase of an automatically renewing subscription service on our Website." },
      { kind: "p", content: "To avoid being charged, you must expressly cancel your subscription at least 24 hours before the end of the trial period or current subscription period. When purchasing an automatically renewing subscription, you agree to the nature of the automatic renewal and its terms, as specified near the place of purchase." },
      { kind: "p", content: "Regardless of where you purchased your subscription, if you do not know how to cancel your subscription or trial, please contact our customer support service on the Website or by email." },
      { kind: "p", content: [
          { kind: "text", value: "Our privacy rules are detailed in our " },
          { kind: "link", route: "privacy", label: "Privacy Policy" },
          { kind: "text", value: " . Please read it to understand how your personal information is collected, used, and shared." },
        ] },
    ],
  },
  {
    title: "1. Acceptance of Terms",
    blocks: [
      { kind: "p", content: "1.1. These Terms govern the relationship between you and the Company regarding your use of the Service, including the Website, Telegram bot, and related services (\"Service\"), including all information, text, graphics, software, and services available for your use (\"Content\")." },
      { kind: "p", content: "1.2. These Terms establish legally binding contractual relations between you and the Company. Accordingly, PLEASE READ THE TERMS CAREFULLY BEFORE USING THE SERVICE." },
      { kind: "p", content: "1.3. To create a profile and use certain features of the Service, you must be at least 18 years old. Users aged 14-17 may use the Service only under the supervision and with the consent of a parent or legal representative who agrees to comply with these Terms. We do not guarantee that our Digital Content and other Services will be suitable and useful for everyone, therefore, before making any purchases on the Website, please individually assess whether the Service is personally suitable for you." },
      { kind: "p", content: [
          { kind: "text", value: "1.4. Please also review our " },
          { kind: "link", route: "privacy", label: "Privacy Policy" },
          { kind: "text", value: " . The Privacy Policy and other additional terms are expressly incorporated into this document by reference." },
        ] },
      { kind: "p", content: "1.5. Any translation from this language version is provided solely for your convenience. In the event of discrepancies, this language version shall prevail." },
      { kind: "p", content: "1.6. To the extent permitted by applicable law, we may modify these Terms. We will notify you of material changes as required by applicable law." },
      { kind: "p", content: "1.7. If you do not agree with the changes, stop using the Service, delete your account, or cancel your subscription before the changes take effect. By continuing to use the Service after the changes, you accept the updated Terms." },
    ],
  },
  {
    title: "2. User Information",
    blocks: [
      { kind: "p", content: "2.1 If you wish to use the Services, you must meet the following requirements:" },
      { kind: "ul", items: [
            "You have reached the legal age required to enter into distance contracts under the laws of your place of residence. The Website and any Service program are designed and intended for use only by adults. Users aged 14-17 may use the Service only under the supervision and with the consent of a parent or legal representative who agrees to comply with these Terms.",
            "You have read these Terms and agree to comply with them.",
            "You must provide us with your correct contact details, payment information, and other information necessary for the operation of the Service.",
            "You use a credit/debit/bank card or another payment method that belongs to you, or the card/payment method owner has authorized you to use the card, and such authorization was provided in the form required by the laws of your place of residence."
        ] },
      { kind: "p", content: "2.2 To use all functionality of the Website, Services, and Digital Content of the Service, you may be required to provide your personal data, such as your age, preferences, expectations, and aspirations regarding what you would like to achieve. Please note that we will only be able to provide you with high-quality personalized services if you provide us with truthful information." },
      { kind: "p", content: "2.3 By agreeing to these Terms, you confirm that you understand that the Services cannot be refused after they have been provided to you. The Services are deemed to have been provided to you from the moment the Telegram bot is activated and you log into it. However, you may cancel your subscription at any time, and if you do so, we will not renew your subscription and will stop charging you for subsequent periods." },
      { kind: "p", content: "2.4 Please note that this Website, our Services, and any digital content you receive from us may only be used for your personal needs. You are not entitled to use the Website content, digital content, or our Services for resale, distribution, rental, or any other type of commercial use." },
      { kind: "p", content: "2.5 You may not use the Website or our Services for any illegal or unauthorized purposes and may not violate any laws while using the Service. All Website content and the content of all materials received from us (including graphic designs and other content) and the relevant parts belong to the Company and are protected by copyright laws. Any use of any copyrights for purposes other than personal use of Our Services, without a Provider's license, constitutes copyright infringement." },
    ],
  },
  {
    title: "3. Prices of Our Services and Payment Methods",
    blocks: [
      { kind: "p", content: "3.1 The Service provides Customers with access to various digital content developed under license according to users' needs and preferences, online artificial intelligence courses, educational materials, video lessons, practical assignments, guides, examples, prompts, support, and access to a Telegram group for subscribers only (hereinafter referred to as the \"Services\"). The content of the Website and Services may change from time to time as we continuously update and improve them." },
      { kind: "p", content: "3.2 Please note that all of our Services are provided only in the form of digital content. Accordingly, our Services are deemed to have been provided to you from the moment you first activate the Telegram bot. Certain features of the Service may be offered by subscription for a specified fee. You may purchase a subscription directly from the Company." },
      { kind: "p", content: "3.3 Please note that our educational and personalized Services are prepared and provided according to the information you provide to us. For this reason, we ask you to provide only accurate and truthful information about yourself. Personalized plans and other Services received from us are suitable only for you because they will be created according to your personal information." },
      { kind: "p", content: "3.4 Our Services are intended solely for educational purposes and do not constitute professional advice in the fields of law, finance, investment, business, programming, or any other professional activity." },
      { kind: "p", content: "3.5 You may use our Services by purchasing a \"Services\" plan, which is billed every 1 month. You authorize us to charge the applicable fees to the payment method you provide. After this prepaid period expires, you will automatically be charged the amount for the subsequent period of the same duration as your initial payment or, when signing up for a subscription trial period, after the trial expires, you will be charged the full amount for the selected billing period." },
      { kind: "p", content: [
          { kind: "strong", value: "Automatic subscription renewal." },
          { kind: "text", value: " By subscribing to certain subscriptions, you agree that your subscription may automatically renew. If you do not cancel your subscription, you authorize us to charge you for the renewal term. The automatic renewal period will be the same as your initial subscription period unless otherwise specified in the Terms. The renewal price will not exceed the price of the immediately preceding subscription period, except for any promotional (introductory) and discounted prices, unless we notify you of a change in the rate before automatic renewal." },
        ] },
      { kind: "p", content: [
          { kind: "text", value: "3.6 The monthly plan will provide you with access to an online system containing digital content and services. All plans and practices of the Service may be accompanied by video lessons, guides, and prompts. To the maximum extent permitted by applicable law, we may change the Purchase fee at any time. We will notify you in advance of any such price changes. If you do not wish to pay the new fees, you may cancel the relevant subscription before the changes take effect. See also our " },
          { kind: "link", route: "billing", label: "Billing & Plans" },
          { kind: "text", value: " page." },
        ] },
      { kind: "p", content: "3.7 On the Website checkout page, you may see different prices if a special sales tax applies in your state that may legally be added to the total cost." },
      { kind: "p", content: "3.8 Please note that we will never apply any conversion rates or fees depending on the payment method you choose. However, some banks apply conversion rates to outgoing payments and international transfers — therefore, we are not responsible for any bank fees or conversion rates that your bank may apply to any payment made to Us." },
      { kind: "p", content: "3.9 We accept payments only by credit and debit cards. We do not accept checks, cash, or other means of payment." },
      { kind: "p", content: "3.10 Trial subscription. We may offer a paid trial subscription to the Service. The trial provides you with access to the Service for a specified period, the details of which are indicated when subscribing to the offer. If this is not the case, you will purchase our subscription without a trial period." },
      { kind: "p", content: "3.11 Free or paid trial. We may offer a free or paid (for a small fee) trial subscription to this service. If you do not cancel your subscription before the end of the trial period, you will automatically be charged the amount indicated on the payment screen for the selected subscription period. We may also offer discounted offers from time to time that renew at the full non-discounted price." },
      { kind: "p", content: "3.12 The subscription automatically renews at the end of each period (weekly, monthly, 6 months, annually, or otherwise, depending on the option you selected during purchase) until you cancel it." },
      { kind: "p", content: "3.13 Payment method. Payment will be charged using the payment method you provided during purchase upon confirmation of payment or after the trial period ends. You authorize us to charge the applicable subscription fee to the payment method used." },
      { kind: "p", content: "3.14. The cost of a course provided by the Service may range from $20 to $40 per course, depending on the specific offer and the page (landing page) from which the purchase is made." },
      { kind: "p", content: "3.15. The cost of a subscription to the Service may range from $19.99 to $39.99 depending on the selected plan, access duration, and landing page from which the subscription is purchased." },
      { kind: "p", content: "3.16. The current price is always indicated on the checkout page and confirmed by the User before payment." },
      { kind: "p", content: "3.17. All prices are stated in United States dollars (USD). The Company reserves the right to change the cost of services and subscriptions by notifying Users through publication of updated terms on the Website or checkout page." },
    ],
  },
  {
    title: "4. Discount Policy",
    blocks: [
      { kind: "p", content: "4.1 From time to time, we may offer special discounts on plan prices. We may offer you a discount if:" },
      { kind: "ul", items: [
            "You are using our Services for the first time, you may be eligible for a discount on your first purchase of a plan from us; and/or",
            "You provide us with your email address and agree to receive our newsletter."
        ] },
      { kind: "p", content: "4.2 Current discounts may change from time to time. We will provide more detailed information about the discount amount whenever we announce its availability." },
      { kind: "p", content: "4.3 We reserve the right to launch and cancel our discount programs and change discount amounts at any time, except where a specific period or time during which the discount will be available is specified in a particular discount advertisement." },
      { kind: "p", content: "By purchasing a course at a promotional price, the User may receive access to a Service subscription with a free trial period (from 3 to 30 days, unless otherwise stated on the landing page). At the end of the trial period, the subscription automatically renews for the next paid period, while the subscription cost may range from $20 to $40 depending on the plan and the landing page from which the order is placed." },
      { kind: "p", content: "The User may cancel the subscription at any time through the Stripe personal account or on the subscription cancellation page for the channel, if necessary by contacting support. Cancellation is carried out without penalties or restrictions. By placing an order at a promotional price, the User confirms their agreement to the subscription terms, including automatic renewal after the trial period ends." },
    ],
  },
  {
    title: "5. Subscription Cancellation",
    blocks: [
      { kind: "p", content: "Your subscription automatically renews at the end of each period until you cancel it. Please note that deleting/blocking the Telegram bot does not cancel your subscriptions." },
      { kind: "p", content: "5.1 If you wish to cancel your subscription plan, you may do so in your personal account on the Website or by contacting our customer support service and informing us of your decision to terminate the subscription. Your cancellation will take effect upon expiration of the plan term to which you subscribed and which you have already paid for." },
      { kind: "p", content: "5.2 If you do not want the Services to renew automatically, please cancel your subscription in your personal account or notify us of your decision to cancel the subscription at least 24 hours before the end of the current billing period, in which case the Services will be terminated upon expiration of the current term and you will not be charged for subsequent periods." },
      { kind: "p", content: [
          { kind: "text", value: "5.3 Please note that if you cancel your subscription, we will not refund money for previous periods during which you used or had the opportunity to use the Services. For more information about refunds, please see " },
          { kind: "link", route: "refund", label: "Refund Policy" },
          { kind: "text", value: " . You must cancel your subscription in accordance with the cancellation procedure disclosed to you for the specific subscription." },
        ] },
      { kind: "p", content: "5.4 Cancellation of subscription trial period. If you do not cancel your subscription before the end of the trial period or unless otherwise stated, your access to the Service will automatically continue and you will be charged for renewal of access to the Service. Except where inapplicable or prohibited by law, we reserve the right, at our discretion, to modify or terminate any trial offer, your access to the Service during the trial subscription, or any of these terms without prior notice and without any liability. We reserve the right to limit your ability to use multiple trial periods." },
      { kind: "p", content: "5.5 The term of the Service and your rights to use it expire at the end of the paid period of your subscription. If you do not pay the fees or charges due, we may make reasonable efforts to notify you and resolve the issue; however, we reserve the right to disable or terminate your access to the Service (and may do so without prior notice)." },
      { kind: "p", content: "5.6 If you decide to cancel your subscription and notify us of this, your subscription and account will terminate upon expiration of the subscription period for which you have already paid. If you wish to close your account immediately, please let us know and your account will be closed immediately; however, we will not refund money for subscription months that have already been paid for the Services, except as described in sections 5.3 and 6.2." },
    ],
  },
  {
    title: "6. Refunds",
    blocks: [
      { kind: "p", content: "We provide refunds in accordance with the law and our Terms, which may be published from time to time. Please note that after your subscription period has expired, we will not be able to refund you because the service will be considered fully used." },
      { kind: "p", content: "6.1 Since our Services are provided only in the form of digital content, we do not issue refunds if you have accessed your personal account and decided to cancel your subscription. Once you cancel your subscription, we will stop charging the regular subscription fee, but we will not refund amounts for already paid periods. You agree that the Purchase is final, that the Company will not refund any transaction after it has been completed, and that the Purchase cannot be canceled, except as expressly provided in these Terms and solely to the extent required by applicable law." },
      { kind: "h3", text: "6.2 Refunds for courses and subscriptions" },
      { kind: "ul", items: [
            [
              { kind: "strong", value: "Courses." },
              { kind: "text", value: " The User has the right to a refund for a purchased Course within 14 (fourteen) calendar days from the date of payment, provided that the User submits a refund request within this period. After 14 days, a refund for Courses is not possible." },
            ],
            [
              { kind: "strong", value: "Subscriptions." },
              { kind: "text", value: " All subscriptions to the Service are non-refundable. Subscription payment is final and non-refundable after it has been made. In the event of subscription cancellation, further charges will stop, but amounts paid for an already started or paid period are non-refundable." },
            ],
            [
              { kind: "strong", value: "Upsells and additional purchases." },
              { kind: "text", value: " All purchases made after the main checkout (for example, upsells, additional materials, special offers) are final and non-refundable." },
            ]
        ] },
      { kind: "p", content: "6.2.1 Subscription payments are non-refundable regardless of whether the Service has been used, partially used, not used, or due to changes in your personal plans." },
      { kind: "p", content: "6.2.2 Paid subscription periods, including automatic renewals, are not subject to partial or prorated refunds." },
      { kind: "p", content: "6.2.3 Changes in price, promotional period, content assortment, or temporary unavailability of individual features (&lt;24 hours) are not grounds for a refund." },
      { kind: "p", content: "6.2.4 Upsells/additional purchases (products/services purchased at steps after the main checkout) are final and non-refundable." },
      { kind: "p", content: "6.2.5 Exceptions: duplicate charges or a technical error in the payment system resulting in lack of access — upon our confirmation, such charges will be canceled/refunded to the original payment method." },
      { kind: "p", content: "6.2.6 If a Course is purchased together with a trial subscription, a refund for the Course within 14 days does not affect the subscription terms; upon approval of the refund for the Course, we will terminate access to the Course and cancel automatic renewal of the trial subscription if its payment has not yet become due." },
      { kind: "p", content: "However, you are entitled to a refund if you did not achieve visible results from our course, provided that all of the following conditions are met:" },
      { kind: "ul", items: [
            [
              { kind: "text", value: "you contact us within " },
              { kind: "moneyBackDays" },
              { kind: "text", value: " days after your initial purchase and before the end of the subscription period" },
            ],
            [
              { kind: "text", value: "you followed our program for at least 14 consecutive days during the first " },
              { kind: "moneyBackDays" },
              { kind: "text", value: " days after purchase (for monthly and longer subscription periods, as well as subscription trial periods)" },
            ],
            "you can demonstrate that you followed the program by providing screenshots from your personal account confirming that you completed at least 14 educational videos or other activities"
        ] },
      { kind: "p", content: [
          { kind: "text", value: "Please note that a refund under the Money-Back Guarantee is available only if the above requirements are met. We will review your request and notify you (by email or otherwise) whether it has been approved. Full public-facing details are also set out on our " },
          { kind: "link", route: "refund", label: "Refund Policy" },
          { kind: "text", value: " page." },
        ] },
      { kind: "p", content: "6.3 We can issue a refund only to the same payment method you used to pay for our Services. We will not issue a refund through any payment method other than the one you used to pay for your subscription." },
    ],
  },
  {
    title: "7. Personal Data and Contacts",
    blocks: [
      { kind: "p", content: "7.1 To protect your personal information, we take reasonable precautions and follow industry best practices to ensure that it is not improperly lost, misused, accessed, disclosed, altered, or destroyed." },
      { kind: "p", content: "7.2 Your personal information may be used to assist us in our research and further development of the Services. In addition, we are permitted to collect and use information that you provide to us while using our Services. However, under no circumstances will we use your image or any personal data for purposes other than the development of our products and services." },
      { kind: "p", content: "7.3. If you choose to leave us feedback, you agree that we may display it on our Website for 5 years after receiving it from you. We will not state your real name or will only indicate your initials in the review unless you specifically instruct us that we may state your full name." },
      { kind: "p", content: "7.4 Please note that we may contact you by phone or email if we need to confirm any details of your order or if your order request was not successfully processed for technical reasons." },
      { kind: "p", content: [
          { kind: "text", value: "7.5 We guarantee that all personal data will be collected and processed in accordance with all applicable laws. To learn more about how we use and process personal data, please review our " },
          { kind: "link", route: "privacy", label: "Privacy Policy" },
          { kind: "text", value: " ." },
        ] },
    ],
  },
  {
    title: "8. Rules of Conduct",
    blocks: [
      { kind: "p", content: "8.1 You may not use our Services and/or Website for any illegal or unauthorized purposes or violate any laws when using the Website. All content of the Website and all materials received from us belong to the Company and are protected by copyright laws." },
      { kind: "p", content: "8.2 We have the right, but not the obligation, to investigate any illegal and/or unauthorized use of the Website and take appropriate legal action. When using the Website, you must:" },
      { kind: "ul", items: [
            "Not use the Website or any of its content for any illegal purpose or in violation of any local, state, national, or international law",
            "Not violate or encourage others to violate the rights of third parties, including intellectual property rights",
            "Comply with all rules posted on the Website",
            "Not transfer, legally or factually, your registered account to any other person without our written consent",
            "Provide us with honest and accurate information",
            "Not use the Website or any of its content for any commercial purposes, including the distribution of any advertising or solicitation",
            "Not reformat or mirror any portion of any Website web page",
            "Not create any links or redirects to the Website through other websites or emails without our prior written consent",
            "Not attempt to interfere with the proper functioning of the Website or the use of the Website by other users",
            "Not commercially resell, distribute, or transfer any Products you purchase from us",
            "Not interfere in any way with the security-related functions of the Website",
            "Not access, monitor, or copy any content or information from the Website using any robots, spiders, scrapers, or other automated means without our express written permission",
            "Not falsely state an affiliation, access other users' accounts without authorization, or falsify your identity",
            "Not engage in any other activity that would violate these Terms or applicable law"
        ] },
      { kind: "p", content: "8.3 We have the right to immediately terminate your Subscription without a refund and/or restrict your access to the Website if we have reason to believe that you do not meet the requirements specified in Section 2.1, have violated any provision of Section 8.1, or use the Website in any other illegal manner." },
      { kind: "p", content: "8.4. By using the Service, you represent and warrant that you have legal capacity and agree to comply with these Terms; you are 18 years old; you will not access the Service through automated or non-human means; you will not use the Service for any illegal or unauthorized purposes; and your use of the Service will not violate any applicable laws or regulations. If you provide any information that is false, inaccurate, outdated, or incomplete, we have the right to refuse any current or future use of the Service." },
      { kind: "p", content: "8.5 You may not access or use the Service for any purpose other than those for which we provide the Service. The Service may not be used for any commercial purposes except those specifically permitted or approved by us." },
      { kind: "p", content: "8.7 As a user of the Service, you agree not to:" },
      { kind: "ul", items: [
            "systematically obtain data or other content from the Service to create a collection, compilation, database, or directory without our written permission",
            "engage in any unauthorized use of the Service",
            "make any modifications, adaptations, improvements, additions, translations, or derivative works from the Service",
            "use the Service for any income-generating purposes, commercial enterprises, or other purposes for which it is not intended",
            "make the Service available through a network that allows access or use by multiple devices or users simultaneously",
            "use the Service to create a product, service, or software that directly or indirectly competes with or in any way replaces the Service",
            "circumvent, disable, or otherwise interfere with the security-related features of the Service",
            "interfere with, disrupt, or create an excessive load on the Service",
            "upload or distribute files containing viruses, worms, trojans, corrupted files, or any other similar software",
            "use, launch, develop, or distribute any automated system, including any spider, robot, scraper, or unauthorized script",
            "demean, defame, or otherwise harm, in our opinion, us and/or the Service",
            "use the Service in a manner inconsistent with any applicable laws or regulations"
        ] },
      { kind: "p", content: "8.8 When communicating with representatives of our customer support service, we ask you to maintain respectful and kind behavior. If your behavior toward any of our customer support representatives or other employees is at any time perceived as threatening, harassing, or abusive, we reserve the right to immediately terminate your account and terminate the dialogue." },
    ],
  },
  {
    title: "9. Disclaimer",
    blocks: [
      { kind: "p", content: "9.1 Nothing on this Website is intended to provide professional legal, financial, investment, tax, or other specialized advice. We provide educational digital content dedicated to artificial intelligence, AI tools, technologies, and the practical use of such tools." },
      { kind: "p", content: "The Service may contain information about third-party AI platforms, software, artificial intelligence models, automation, content creation, and other technologies. We do not guarantee the continued availability, unchanged features, prices, or technical specifications of third-party services." },
      { kind: "p", content: "The Service is intended as an educational tool and may be useful for acquiring knowledge and practical skills in working with AI. However, we do not guarantee that use of the Service will result in a specific level of income, employment, cost savings, business growth, increased sales, or any other specific result." },
      { kind: "p", content: "9.2 You use the Website, Service, and any information contained therein solely at your own risk. We are not responsible for any losses or damages, including indirect, special, incidental, or punitive damages, arising from the use of the Website, Service, courses, materials, or information contained in or provided through the Service." },
      { kind: "p", content: "All users who use our Services agree to independently evaluate the information received and make decisions regarding its application. Information about artificial intelligence and software may quickly become outdated. When using third-party services, you must independently review their official documentation, terms of use, and limitations." },
      { kind: "p", content: "Use of the Service does not represent or create a professional consultant-client relationship between you and the Company unless otherwise expressly provided by a separate written agreement." },
      { kind: "p", content: "9.3 Each user's level of preparation and goals differ, therefore we do not provide any guarantees that our Services will be equally suitable or effective for every user. Testimonials and examples that may be provided in the Service are examples of specific results and are not intended to represent or guarantee that any user will achieve the same or similar results." },
      { kind: "p", content: "9.4 The Website may contain links to other websites maintained by third parties. Any information, products, software, or services provided on or through third-party websites are controlled by the operators of such websites, not by us or our affiliates." },
      { kind: "p", content: "9.5 We respect the privacy of our customers, therefore all reviews and/or comments posted on the Website may contain fictional names and associated images." },
      { kind: "p", content: "9.6 Unless otherwise stated, this Website is our property, and all source code, databases, functionality, software, design, texts, photographs, and graphic images on the Website are owned or controlled by us and protected by copyright and trademark laws." },
      { kind: "p", content: "9.7 The services offered on or through the website are provided \"as is\" and without any warranties, whether express or implied. To the maximum extent permitted by applicable law, we disclaim all warranties, including implied warranties of merchantability and fitness for a particular purpose." },
      { kind: "p", content: "9.8 We do not guarantee that the website or any of its functions will operate uninterrupted or error-free, that defects will be corrected, or that any part of this website or the servers that make the website available are free of viruses or other harmful components." },
      { kind: "p", content: "9.9 Any information presented on the Website is for educational and informational purposes only. The materials of the Service do not guarantee any specific result and should not be considered professional legal, financial, investment, tax, or other advice." },
      { kind: "p", content: "9.10 We have made every effort to display the materials, images, interfaces, and descriptions of the services presented on the Website as accurately as possible. However, we cannot guarantee that the display of the materials on your device will fully correspond to their actual appearance." },
    ],
  },
  {
    title: "10. Indemnification",
    blocks: [
      { kind: "p", content: "10.1 You agree to indemnify, defend, and hold harmless us and our affiliates, as well as the respective officers, directors, owners, agents, information providers, and licensors, from and against any claims, liabilities, losses, damages, costs, and expenses (including attorneys' fees) in connection with: (a) your use of or connection to Our website; (b) any use or alleged use of Your account or Your account password by any person, whether authorized by You or not; (c) the content of the information provided by You to Us; (d) your violation of the rights of any other individual or legal entity; (e) your violation of any applicable laws, rules, or regulations." },
      { kind: "p", content: "10.2 We reserve the right, at our own expense, to assume the defense and control of any matter otherwise subject to indemnification by you, and in such case, you agree to cooperate with us in the defense of such claim." },
      { kind: "p", content: "10.3 You agree to indemnify and hold harmless the Company, its successors, subsidiaries, affiliates, any related companies, its suppliers, licensors, and partners, as well as the officers, directors, employees, agents, and representatives of each of them, from liability, including costs and attorneys' fees, arising from any claim or demand brought by any third party in connection with or as a result of your use of the Service or the Products, your User Content, or your violation of these Terms." },
      { kind: "p", content: "10.4 The Company reserves the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify us, and you agree to cooperate with our defense of such claims. You agree not to settle any matter without the Company's prior written consent." },
    ],
  },
  {
    title: "11. Limitation of Liability",
    blocks: [
      { kind: "p", content: "11.1 In no event shall we, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers, or licensors be liable for any errors, losses, lost profits, or other consequences, damages, claims, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind arising from your use of any of the service or any products purchased using the Services." },
      { kind: "p", content: "11.2 If You are dissatisfied with the Website, any materials, products, or services presented on the Website, or any terms of use of the Website, your sole remedy is to discontinue using the Website." },
      { kind: "p", content: "11.3 Under no circumstances shall we (and our affiliates) be liable to you or any third party for any lost profits or any indirect, consequential, exemplary, incidental, special, or punitive damages arising from these Terms or your use of or inability to use the Service." },
      { kind: "p", content: "11.4 Notwithstanding anything contained herein, you agree that the Company's aggregate liability to you for any claims arising from the use of the application, content, Service, or Products is limited to the amount paid by you to the Company for access to and use of the Service." },
      { kind: "p", content: "11.5 If you are a resident of California, you hereby waive Section 1542 of the California Civil Code, which provides: \"A general release does not extend to claims that the creditor or releasing party does not know or suspect exist in his or her favor at the time of executing the release and that, if known by him or her, would have materially affected his or her settlement with the debtor or released party.\"" },
      { kind: "p", content: "11.6 Some jurisdictions do not allow the limitation or exclusion of liability for incidental or consequential damages, so the above limitation or exclusion may not apply to you. If one or any aspect of the limitations set forth above does not apply, all other aspects shall remain in effect." },
    ],
  },
  {
    title: "12. Intellectual Property",
    blocks: [
      { kind: "p", content: "12.1 All intellectual property rights, including, without limitation, trademarks, copyrights, domain names, database rights, design rights, patents, and all other rights in any creations of any kind, whether registered or not (\"Intellectual Property\") on the Website are protected by the Digital Millennium Copyright Act." },
      { kind: "p", content: "12.2 You may not copy, repurpose, or distribute any Intellectual Property or any other content obtained from us or found on the Website for any purpose without our express written permission. Use of our content for commercial purposes is prohibited unless you have our express written permission." },
      { kind: "p", content: "12.3 All Intellectual Property posted on the Website or provided to you in any other form belongs to the Company, except for third-party trademarks, service marks, or other materials that we use." },
      { kind: "p", content: "12.4 If you notice that any third party is using the Company's Intellectual Property on their websites, please report such cases to our customer support service." },
    ],
  },
  {
    title: "13. Governing Law and Disputes",
    blocks: [
      { kind: "p", content: "13.1 If you have any complaints regarding the Website, charges, refunds, the quality of the Services, or anything related to the use of the Website, You must first contact our customer support service by email before taking any action through third parties. Please note that by agreeing to these Terms, you expressly agree not to request any refunds from your bank or credit card provider without first contacting us and giving us an opportunity to resolve any issues you may have." },
      { kind: "p", content: "13.2 All complaints or claims submitted by you must be processed within 30 days of receipt. When contacting us with your complaints, you must always identify yourself using the same first and last name that you provided to us when making a purchase on the Website." },
      { kind: "p", content: "13.3 The legal relationship between you and us is governed by the laws of the UAE, except where your local law excludes other jurisdictions in consumer-related disputes." },
      { kind: "p", content: "13.4 Any claim must be brought in an individual capacity by the initiating party and not as a plaintiff or member of a class in any class action or other similar proceeding or arbitration proceeding." },
      { kind: "p", content: "13.5 Initial Dispute Resolution. We are always interested in resolving disputes amicably and efficiently. If you have a dispute with the Company, you agree that, before taking any formal action, you will contact us by email and provide a brief written description of the dispute and your contact information. Good faith negotiations shall be a condition precedent for either party." },
      { kind: "p", content: "13.6 Class Action Waiver and Collective Relief. Except as provided in the terms defined in \"batch arbitration,\" there shall be no right or authority for any claims to be heard in arbitration or litigation on a class, joint, or consolidated basis or on grounds including claims brought in a purported representative capacity on behalf of the general public, other users of the Services, or any other persons." },
    ],
  },
  {
    title: "14. Miscellaneous",
    blocks: [
      { kind: "p", content: "14.1 If any provision of these Terms is found to be unlawful, void, or unenforceable, such provision shall nevertheless be enforceable to the maximum extent permitted by applicable law, and the unenforceable portion shall be deemed severed from these Terms of Service. You may review the most current version of the Terms of Service at any time on this page." },
      { kind: "p", content: "14.2 No delay or omission on our part in exercising any of our rights arising from any failure by you to comply with or perform your obligations under these Terms shall impair any such right or be construed as a waiver thereof." },
      { kind: "p", content: "14.3 Subject to Section 13, if any provision of these Terms is found to be invalid or unenforceable, these Terms shall remain in full force and effect and shall be modified to become valid and enforceable while reflecting the intentions of the parties to the maximum extent permitted by law." },
      { kind: "p", content: "14.4 Unless otherwise expressly provided herein, these Terms constitute the entire agreement between you and the Company with respect to their subject matter and supersede all prior promises, agreements, or representations, whether written or oral, regarding such subject matter." },
      { kind: "p", content: "14.5 The Company may transfer or assign any and all of its rights and obligations under these Terms to any other person in any manner, including by novation, and by accepting these Terms, you consent to any such assignment and transfer by the Company." },
      { kind: "p", content: "14.6 All information transmitted through the Service shall be deemed an electronic communication. You agree that we may communicate with you electronically and that such communications are equivalent to communications in writing. You also acknowledge and agree that by clicking the \"SUBMIT,\" \"CONTINUE,\" \"REGISTER,\" \"I AGREE,\" or similar links or buttons, you are submitting a legally binding electronic signature and entering into a legally binding agreement." },
      { kind: "p", content: "14.7 Under no circumstances shall the Company be liable for any failure to comply with these Terms to the extent such failure is caused by factors beyond the Company's reasonable control." },
    ],
  },
  {
    title: "15. Amendments",
    blocks: [
      { kind: "p", content: "15.1 We reserve the right to make changes to these Terms at any time and at our sole discretion. Please check these Terms from time to time to ensure awareness of any new amendments. On this website, we will post any announcements regarding any changes and additions that will be made to the provisions of these Terms. Amendments shall not be retroactive and shall apply from the date of publication." },
      { kind: "p", content: "15.2 To the maximum extent permitted by applicable law, we may change the subscription fee at any time. We will notify you in advance of any such price changes. If you do not wish to pay the new fees, you may cancel the applicable subscription before the changes take effect." },
    ],
  },
  {
    title: "16. Contact Information and Profile Registration",
    blocks: [
      { kind: "p", content: "16.1 You may contact us using the details provided at the beginning of this Document." },
      { kind: "companyDetails" },
      { kind: "p", content: "16.2. To use certain features of the Service, you may be required to register your profile (\"Profile\") and provide certain information about yourself as requested in the registration form." },
      { kind: "p", content: "16.3. If you register a Profile, you represent and warrant to the Company that all required registration information you provide is truthful and accurate; you will maintain the accuracy of such information; and your use of the Service does not violate any applicable laws or regulations or these Terms." },
      { kind: "p", content: "16.4. The Service is not intended for use by persons under the age of 18. By using the Services, you represent and warrant that you are at least 18 years old and have the right, authority, and legal capacity to enter into these Terms." },
      { kind: "p", content: "16.5. The Company reserves the right to suspend or terminate your Profile or your access to the Service, with or without notice to you, in the event of your breach of these Terms." },
      { kind: "p", content: "16.6. You are responsible for maintaining the confidentiality of your Profile login credentials and are fully responsible for all activities that occur under your Profile. You agree to immediately notify the Company of any unauthorized use or suspected unauthorized use of your Profile or any other breach of security." },
    ],
  },
  {
    title: "17. Governing Law and Venue",
    blocks: [
      { kind: "p", content: "17.1 These Terms shall be governed in accordance with the laws of the UAE." },
      { kind: "p", content: "17.2 To the extent that any action relating to any dispute under this Agreement is, for any reason, not submitted to arbitration, each party submits to the exclusive jurisdiction of the courts of the UAE for the resolution of any disputes that may arise out of or in connection with this Agreement." },
      { kind: "p", content: "17.3 The parties unconditionally submit to the personal jurisdiction and venue of the courts of the UAE and waive any objections based on improper venue or inconvenient forum." },
    ],
  },
  {
    title: "18. Additional Disclaimer of Warranties",
    blocks: [
      { kind: "p", content: "18.1 General Disclaimer of Warranties. Except to the extent prohibited by law or otherwise inapplicable, you expressly understand and agree that you use the Service at your own risk, and the Service and Products are provided on an \"as is\" and \"as available\" basis. The Company and its affiliates, officers, employees, agents, partners, and licensors expressly disclaim all warranties of any kind, whether express or implied, including implied warranties of merchantability, fitness for a particular purpose, and non-infringement." },
      { kind: "p", content: "In particular, the released parties do not make and expressly disclaim any warranties that:" },
      { kind: "ul", items: [
            "The Service will meet your requirements",
            "The Service will be uninterrupted, timely, secure, or error-free",
            "the results that may be obtained from the use of the Service, including data, will be accurate and reliable",
            "the quality of any data or services available through the Service will meet your expectations",
            "any errors in the Service will be corrected"
        ] },
      { kind: "p", content: "18.2 No Service Advice. Any statement that may be posted on the Service is intended solely for informational and entertainment purposes and is not intended to replace or substitute for any professional financial, medical, legal, or other advice." },
      { kind: "p", content: "18.3 Modification of Website Information and Services. We may modify all information provided on the Service at our sole discretion without prior notice. We may at any time modify or discontinue, temporarily or permanently, the Service (or any part thereof) at our sole discretion, with or without notice." },
    ],
  },
  {
    title: "19. Service",
    blocks: [
      { kind: "p", content: "19.1. You acknowledge that all text, images, marks, logos, compilations, data, other content, software, and materials displayed on the Service or used by the Company to operate the Service (excluding any User Content) are the property of us or third parties." },
      { kind: "p", content: "19.2. The Company expressly reserves all rights, including all intellectual property rights, in the foregoing, and except as expressly permitted by these Terms, any use, redistribution, sale, decompilation, reverse engineering, disassembly, translation, or other use thereof is strictly prohibited." },
      { kind: "p", content: "19.3. The information you provide to us upon registration, as well as any content, materials, or information that you upload, send, email, display, perform, distribute, publish, or otherwise transmit to us (\"User Content\"), remains your intellectual property." },
      { kind: "p", content: "19.4. The Company does not claim any copyright in User Content. Notwithstanding the foregoing, you agree to grant the Company a license in accordance with Section 21 of these Terms." },
      { kind: "p", content: "19.5. Subject to these Terms, the Company grants you a non-transferable, non-exclusive license (without the right to sublicense) to use the Service solely for personal, non-commercial purposes." },
      { kind: "p", content: "19.6. You agree, represent, and warrant that your use of the Service or any part thereof will comply with the foregoing license, agreements, and restrictions and will not infringe or violate the rights of any other party." },
      { kind: "p", content: "19.7. You are solely responsible for obtaining the equipment and telecommunications services necessary to access the Service, as well as all related charges." },
      { kind: "p", content: "19.8. We reserve the right to make any changes to the Service (whether free or paid features) at any time, with or without notice. If such changes affect your use of the Service, you may delete your account or cancel your subscription at any time." },
      { kind: "p", content: "19.9. You access and use the Service at your own risk. Except where prohibited by law, the Company shall not be liable for any damage to your computer system, loss of data, or other harm to you or any third party arising from your access to or use of the Service." },
      { kind: "p", content: "19.10. The Company is not obligated to provide you with any customer support. However, the Company may, from time to time, provide you with customer support at its sole discretion." },
    ],
  },
  {
    title: "20. Curator Services",
    blocks: [
      { kind: "p", content: "20.1. As part of the Service, the Company may offer interactive curator services that connect you with curators and information that will help you achieve your goals (\"Curator Services\")." },
      { kind: "p", content: "20.2. If you have access to a Subscription, you will be able to interact with curators." },
      { kind: "p", content: "20.3. A curator will help you achieve your goals by providing motivational tools. The Company may, at its discretion, hire or replace any curator with another for Subscription users." },
      { kind: "p", content: "20.4. Curator Services are not medical, mental health, or any other form of healthcare. Curator Services do not provide healthcare services and are not intended to replace professional medical advice, consultation, or treatment from qualified physicians. It is important to consult your physician before using the services of a coach/curator/educator. In the event of a medical emergency, immediately contact your physician or the appropriate emergency service." },
    ],
  },
  {
    title: "21. User Content",
    blocks: [
      { kind: "p", content: "21.1. Grant of License. You hereby grant the Company, its sublicensees, successors, and assigns a royalty-free, perpetual, sublicensable, assignable, non-exclusive right and license to use, license, reproduce, modify, adapt, publish, translate, transmit, edit, reformat, create derivative works from, distribute, derive revenue or other remuneration from, communicate to the public, reproduce, display, and otherwise use any User Content (in whole or in part) throughout the world and/or incorporate User Content into other works in any form, on any media, or using technologies now known or later developed." },
      { kind: "p", content: "21.2. The license granted herein expressly excludes any personal data as defined under applicable privacy laws and regulations." },
      { kind: "p", content: "21.3. You hereby represent and warrant that you own all right, title, and interest in and to the User Content or are otherwise authorized to grant the rights granted to the Company under this section. We are not responsible for retaining copies of any materials that we remove from our Services and shall not be liable for any losses you incur if Content that you post or transmit to our Services is removed." },
      { kind: "p", content: "21.4. If you wish to withdraw the license granted for certain User Content, please contact us by email." },
      { kind: "p", content: [
          { kind: "text", value: "Related: " },
          { kind: "link", route: "privacy", label: "Privacy Policy" },
          { kind: "text", value: " · " },
          { kind: "link", route: "cookie", label: "Cookie Policy" },
          { kind: "text", value: " · " },
          { kind: "link", route: "refund", label: "Refund Policy" },
          { kind: "text", value: " · " },
          { kind: "link", route: "billing", label: "Billing & Plans" },
          { kind: "text", value: " · " },
          { kind: "link", route: "contact", label: "Contact" },
        ] },
    ],
  },
]

const RU_SECTIONS: TermsSection[] = [
  {
    title: "Информация о компании",
    blocks: [
      { kind: "p", content: [
          { kind: "text", value: "Благодарим вас за посещение нашего сайта " },
          { kind: "extWebsite" },
          { kind: "text", value: " (далее — «Сайт»)." },
        ] },
      { kind: "companyDetails" },
      { kind: "p", content: "Примечание: в настоящем документе термины «Компания», «мы», «нас» и «наш» относятся к указанному выше юридическому лицу. «Сервис» означает указанное выше наименование сервиса, включая Сайт и все связанные услуги." },
      { kind: "p", content: "Прежде чем использовать любые функции Сайта или любые продукты и услуги, доступные через Сайт, внимательно прочитайте и поймите настоящие Условия и положения (далее — «Условия»), поскольку они регулируют все отношения между вами (далее — «Пользователь», «вы» или «Клиент») и нами." },
      { kind: "p", content: "Компания не заявляет, что Сервис доступен, подходит или может законно использоваться в вашей юрисдикции; доступ и использование Сервиса запрещены на территориях, где такое использование незаконно. Вы получаете доступ к Сервису по собственной инициативе и несёте ответственность за соблюдение местного законодательства." },
      { kind: "p", content: "Не продолжайте совершать покупки на Сайте, если вы не внимательно прочитали и не поняли положения настоящих Условий: при любой покупке у нас эти Условия считаются юридически обязательным соглашением между вами и нами." },
      { kind: "p", content: "На Сайте предусмотрены подписки с автоматическим продлением. Внимательно прочитайте настоящие Условия перед началом пробного периода или оформлением подписки с автоматическим продлением на нашем Сайте." },
      { kind: "p", content: "Чтобы избежать списания средств, вы должны явно отменить подписку не менее чем за 24 часа до окончания пробного или текущего расчётного периода. Оформляя подписку с автоматическим продлением, вы соглашаетесь с характером автопродления и его условиями, указанными рядом с местом покупки." },
      { kind: "p", content: "Независимо от того, где вы оформили подписку, если вы не знаете, как отменить подписку или пробный период, свяжитесь со службой поддержки на Сайте или по email." },
      { kind: "p", content: [
          { kind: "text", value: "Правила обработки персональных данных подробно изложены в нашей " },
          { kind: "link", route: "privacy", label: "Политике конфиденциальности" },
          { kind: "text", value: ". Прочитайте её, чтобы понять, как собирается, используется и передаётся ваша персональная информация." },
        ] },
    ],
  },
  {
    title: "1. Принятие Условий",
    blocks: [
      { kind: "p", content: "1.1. Настоящие Условия регулируют отношения между вами и Компанией в связи с использованием вами Сервиса, включая Сайт, Telegram-бот и связанные услуги («Сервис»), а также всю информацию, текст, графику, программное обеспечение и услуги, доступные для использования («Контент»)." },
      { kind: "p", content: "1.2. Настоящие Условия устанавливают юридически обязательные договорные отношения между вами и Компанией. ПОЭТОМУ ВНИМАТЕЛЬНО ПРОЧТИТЕ УСЛОВИЯ ПЕРЕД ИСПОЛЬЗОВАНИЕМ СЕРВИСА." },
      { kind: "p", content: "1.3. Для создания профиля и использования отдельных функций Сервиса вам должно быть не менее 18 лет. Пользователи 14–17 лет могут использовать Сервис только под наблюдением и с согласия родителя или законного представителя, который соглашается соблюдать настоящие Условия. Мы не гарантируем, что наш цифровой контент и другие услуги подойдут и будут полезны каждому, поэтому перед покупками на Сайте оцените, подходит ли Сервис именно вам." },
      { kind: "p", content: [
          { kind: "text", value: "1.4. Также ознакомьтесь с нашей " },
          { kind: "link", route: "privacy", label: "Политике конфиденциальности" },
          { kind: "text", value: ". Политика конфиденциальности и другие дополнительные условия прямо включены в настоящий документ посредством ссылки." },
        ] },
      { kind: "p", content: "1.5. Любой перевод с данной языковой версии предоставляется исключительно для удобства. При расхождениях приоритет имеет настоящая языковая версия." },
      { kind: "p", content: "1.6. В пределах, допускаемых применимым законодательством, мы можем изменять настоящие Условия. О существенных изменениях мы уведомим вас в порядке, предусмотренном законом." },
      { kind: "p", content: "1.7. Если вы не согласны с изменениями, прекратите использование Сервиса, удалите аккаунт или отмените подписку до вступления изменений в силу. Продолжая использовать Сервис после изменений, вы принимаете обновлённые Условия." },
    ],
  },
  {
    title: "2. Информация о пользователе",
    blocks: [
      { kind: "p", content: "2.1 Если вы хотите использовать Услуги, вы должны соответствовать следующим требованиям:" },
      { kind: "ul", items: [
            "Вы достигли возраста, необходимого для заключения дистанционных договоров по законодательству места вашего проживания. Сайт и программы Сервиса предназначены только для взрослых. Пользователи 14–17 лет могут использовать Сервис только под наблюдением и с согласия родителя или законного представителя, согласного соблюдать настоящие Условия.",
            "Вы прочитали настоящие Условия и соглашаетесь их соблюдать.",
            "Вы должны предоставить нам корректные контактные данные, платёжную информацию и другие сведения, необходимые для работы Сервиса.",
            "Вы используете кредитную/дебетовую/банковскую карту или другой способ оплаты, принадлежащий вам, либо владелец карты/способа оплаты уполномочил вас на использование, и такое уполномочение оформлено в форме, требуемой законодательством места вашего проживания."
        ] },
      { kind: "p", content: "2.2 Для использования всего функционала Сайта, Услуг и цифрового контента Сервиса вам может потребоваться предоставить персональные данные, такие как возраст, предпочтения, ожидания и цели. Обратите внимание: качественные персонализированные услуги мы сможем предоставить только при получении от вас достоверной информации." },
      { kind: "p", content: "2.3 Соглашаясь с настоящими Условиями, вы подтверждаете, что понимаете: отказаться от Услуг после их предоставления нельзя. Услуги считаются предоставленными с момента активации Telegram-бота и вашего входа в него. Однако вы можете отменить подписку в любое время — тогда мы не продлим её и прекратим списания за последующие периоды." },
      { kind: "p", content: "2.4 Обратите внимание: этот Сайт, наши Услуги и любой полученный от нас цифровой контент можно использовать только для личных нужд. Вы не вправе использовать контент Сайта, цифровой контент или наши Услуги для перепродажи, распространения, аренды или иного коммерческого использования." },
      { kind: "p", content: "2.5 Вы не можете использовать Сайт или наши Услуги в незаконных или несанкционированных целях и не должны нарушать законы при использовании Сервиса. Весь контент Сайта и материалов, полученных от нас (включая графические материалы), принадлежит Компании и защищён авторским правом. Любое использование объектов авторского права не для личного использования наших Услуг без лицензии правообладателя является нарушением." },
    ],
  },
  {
    title: "3. Цены на наши Услуги и способы оплаты",
    blocks: [
      { kind: "p", content: "3.1 Сервис предоставляет Клиентам доступ к различному цифровому контенту, разработанному по лицензии с учётом потребностей пользователей: онлайн-курсы по искусственному интеллекту, учебные материалы, видеоуроки, практические задания, руководства, примеры, промпты, поддержку и доступ к Telegram-группе только для подписчиков (далее — «Услуги»). Содержание Сайта и Услуг может периодически меняться по мере обновления и улучшения." },
      { kind: "p", content: "3.2 Все наши Услуги предоставляются только в форме цифрового контента. Соответственно, Услуги считаются предоставленными с момента первой активации Telegram-бота. Отдельные функции Сервиса могут предлагаться по подписке за установленную плату. Подписку можно приобрести напрямую у Компании." },
      { kind: "p", content: "3.3 Образовательные и персонализированные Услуги готовятся и предоставляются на основе информации, которую вы нам предоставляете. Поэтому просим указывать только точные и достоверные сведения о себе. Персональные планы и другие Услуги подходят именно вам, поскольку создаются на основе ваших персональных данных." },
      { kind: "p", content: "3.4 Наши Услуги предназначены исключительно для образовательных целей и не являются профессиональной консультацией в области права, финансов, инвестиций, бизнеса, программирования или иной профессиональной деятельности." },
      { kind: "p", content: "3.5 Вы можете пользоваться Услугами, приобретая план «Services» с оплатой каждые 1 месяц. Вы уполномочиваете нас списывать применимые платежи с указанного способа оплаты. По истечении предоплаченного периода автоматически списывается сумма за следующий период той же длительности, что и первоначальный платёж; при оформлении пробной подписки после окончания пробного периода списывается полная сумма за выбранный расчётный период." },
      { kind: "p", content: [
          { kind: "strong", value: "Автоматическое продление подписки." },
          { kind: "text", value: " Оформляя определённые подписки, вы соглашаетесь, что подписка может автоматически продлеваться. Если вы не отмените подписку, вы уполномочиваете нас списать плату за период продления. Период автопродления совпадает с первоначальным периодом подписки, если в Условиях не указано иное. Цена продления не превысит цену непосредственно предыдущего периода, за исключением промо (вводных) и скидочных цен, если мы не уведомим об изменении тарифа до автопродления." },
        ] },
      { kind: "p", content: [
          { kind: "text", value: "3.6 Ежемесячный план даёт доступ к онлайн-системе с цифровым контентом и услугами. К планам и практикам Сервиса могут прилагаться видеоуроки, руководства и промпты. В максимально допустимой законом степени мы можем менять плату за покупку в любое время с предварительным уведомлением. Если вы не согласны с новой ценой, отмените подписку до вступления изменений в силу. См. также нашу страницу " },
          { kind: "link", route: "billing", label: "Оплата и тарифы" },
          { kind: "text", value: " странице." },
        ] },
      { kind: "p", content: "3.7 На странице оформления заказа цена может отличаться, если в вашем штате применяется налог с продаж, который законно добавляется к общей стоимости." },
      { kind: "p", content: "3.8 Мы никогда не применяем конвертацию или комиссии в зависимости от выбранного способа оплаты. Однако банки могут применять курсы конвертации к исходящим платежам и международным переводам — мы не несём ответственности за банковские комиссии или курсы, которые ваш банк применяет к платежам нам." },
      { kind: "p", content: "3.9 Мы принимаем оплату только банковскими картами. Чеки, наличные и другие способы оплаты не принимаются." },
      { kind: "p", content: "3.10 Пробная подписка. Мы можем предложить платную пробную подписку на Сервис на указанный при оформлении срок. В противном случае вы приобретаете подписку без пробного периода." },
      { kind: "p", content: "3.11 Бесплатная или платная пробная подписка. Мы можем предложить бесплатную или платную (за небольшую сумму) пробную подписку. Если вы не отмените подписку до конца пробного периода, автоматически спишется сумма, указанная на экране оплаты за выбранный период. Иногда мы предлагаем скидки с последующим продлением по полной цене." },
      { kind: "p", content: "3.12 Подписка автоматически продлевается в конце каждого периода (еженедельно, ежемесячно, на 6 месяцев, ежегодно или иначе — в зависимости от выбранного варианта) до её отмены." },
      { kind: "p", content: "3.13 Способ оплаты. Платёж списывается с указанного при покупке способа оплаты после подтверждения или по окончании пробного периода. Вы уполномочиваете нас списывать применимую плату за подписку с используемого способа оплаты." },
      { kind: "p", content: "3.14. Стоимость курса, предоставляемого Сервисом, может составлять от $20 до $40 за курс в зависимости от конкретного предложения и страницы (лендинга), с которой совершена покупка." },
      { kind: "p", content: "3.15. Стоимость подписки на Сервис может составлять от $19.99 до $39.99 в зависимости от выбранного плана, срока доступа и лендинга, с которого оформлена подписка." },
      { kind: "p", content: "3.16. Актуальная цена всегда указана на странице оформления заказа и подтверждается Пользователем до оплаты." },
      { kind: "p", content: "3.17. Все цены указаны в долларах США (USD). Компания вправе изменять стоимость услуг и подписок, уведомляя Пользователей публикацией обновлённых условий на Сайте или странице оформления заказа." },
    ],
  },
  {
    title: "4. Политика скидок",
    blocks: [
      { kind: "p", content: "4.1 Иногда мы предлагаем специальные скидки на тарифы. Скидка может быть доступна, если:" },
      { kind: "ul", items: [
            "вы впервые используете наши Услуги и можете получить скидку на первую покупку плана; и/или",
            "вы предоставляете email и соглашаетесь получать нашу рассылку."
        ] },
      { kind: "p", content: "4.2 Действующие скидки могут меняться. Подробности о размере скидки мы сообщаем при объявлении акции." },
      { kind: "p", content: "4.3 Мы вправе запускать и отменять программы скидок и менять их размер в любое время, кроме случаев, когда в конкретной рекламе указан фиксированный срок действия скидки." },
      { kind: "p", content: "При покупке курса по промоцене Пользователь может получить доступ к подписке на Сервис с бесплатным пробным периодом (от 3 до 30 дней, если на лендинге не указано иное). По окончании пробного периода подписка автоматически продлевается на следующий платный период; стоимость подписки может составлять от $20 до $40 в зависимости от плана и лендинга заказа." },
      { kind: "p", content: "Пользователь может отменить подписку в любое время через личный кабинет Stripe или на странице отмены подписки канала, при необходимости обратившись в поддержку. Отмена без штрафов и ограничений. Оформляя заказ по промоцене, Пользователь подтверждает согласие с условиями подписки, включая автопродление после пробного периода." },
    ],
  },
  {
    title: "5. Отмена подписки",
    blocks: [
      { kind: "p", content: "Подписка автоматически продлевается в конце каждого периода, пока вы её не отмените. Удаление или блокировка Telegram-бота не отменяет подписку." },
      { kind: "p", content: "5.1 Отменить план подписки можно в личном кабинете на Сайте или через службу поддержки. Отмена вступает в силу по истечении уже оплаченного периода плана." },
      { kind: "p", content: "5.2 Чтобы Услуги не продлевались автоматически, отмените подписку в личном кабинете или уведомите нас не менее чем за 24 часа до конца текущего расчётного периода — тогда Услуги прекратятся по окончании текущего срока без списаний за последующие периоды." },
      { kind: "p", content: [
          { kind: "text", value: "5.3 При отмене подписки возврат за предыдущие периоды, в течение которых вы пользовались или могли пользоваться Услугами, не производится. Подробнее о возвратах см. " },
          { kind: "link", route: "refund", label: "Политику возврата" },
          { kind: "text", value: ". Отмена подписки должна выполняться в порядке, указанном для конкретной подписки." },
        ] },
      { kind: "p", content: "5.4 Отмена пробного периода подписки. Если вы не отмените подписку до конца пробного периода (если не указано иное), доступ к Сервису продолжится автоматически и будет списана плата за продление. Если закон не запрещает, мы вправе по своему усмотрению изменять или прекращать пробные предложения, доступ в пробной подписке или отдельные условия без уведомления и ответственности, а также ограничивать использование нескольких пробных периодов." },
      { kind: "p", content: "5.5 Срок Услуги и ваши права на использование истекают в конце оплаченного периода подписки. При неуплате мы можем уведомить вас и попытаться урегулировать вопрос, но вправе отключить или прекратить доступ к Сервису (в том числе без предварительного уведомления)." },
      { kind: "p", content: "5.6 При отмене подписки с уведомлением нас аккаунт и подписка прекращаются по окончании уже оплаченного периода. Для немедленного закрытия аккаунта сообщите нам — аккаунт будет закрыт сразу; возврат за уже оплаченные месяцы подписки не производится, кроме случаев по п. 5.3 и 6.2." },
    ],
  },
  {
    title: "6. Возвраты",
    blocks: [
      { kind: "p", content: "Мы осуществляем возвраты в соответствии с законом и настоящими Условиями, которые могут периодически обновляться. После окончания периода подписки возврат невозможен, так как услуга считается полностью оказанной." },
      { kind: "p", content: "6.1 Поскольку Услуги предоставляются только в форме цифрового контента, возврат не производится, если вы заходили в личный кабинет и отменили подписку. После отмены регулярная плата не списывается, но суммы за уже оплаченные периоды не возвращаются. Покупка является окончательной; Компания не возвращает средства после завершения транзакции, кроме случаев, прямо предусмотренных Условиями и применимым законом." },
      { kind: "h3", text: "6.2 Возвраты за курсы и подписки" },
      { kind: "ul", items: [
            [
              { kind: "strong", value: "Курсы." },
              { kind: "text", value: " Пользователь вправе запросить возврат за приобретённый Курс в течение 14 (четырнадцати) календарных дней с даты оплаты при подаче запроса в этот срок. После 14 дней возврат за Курсы невозможен." },
            ],
            [
              { kind: "strong", value: "Подписки." },
              { kind: "text", value: " Все подписки на Сервис не подлежат возврату. Оплата подписки окончательна после списания. При отмене дальнейшие списания прекращаются, но суммы за уже начатый или оплаченный период не возвращаются." },
            ],
            [
              { kind: "strong", value: "Допродажи и дополнительные покупки." },
              { kind: "text", value: " Все покупки после основного оформления заказа (допродажи, дополнительные материалы, спецпредложения) окончательны и не подлежат возврату." },
            ]
        ] },
      { kind: "p", content: "6.2.1 Платежи по подписке не возвращаются независимо от того, использовался ли Сервис полностью, частично, не использовался или изменились ли ваши личные планы." },
      { kind: "p", content: "6.2.2 Оплаченные периоды подписки, включая автопродления, не подлежат частичному или пропорциональному возврату." },
      { kind: "p", content: "6.2.3 Изменение цены, промопериода, ассортимента контента или временная недоступность отдельных функций (&lt;24 часов) не являются основанием для возврата." },
      { kind: "p", content: "6.2.4 Допродажи/дополнительные покупки (товары/услуги на шагах после основного оформления) окончательны и не подлежат возврату." },
      { kind: "p", content: "6.2.5 Исключения: дублирующие списания или техническая ошибка платёжной системы, из-за которой нет доступа — после нашего подтверждения такие списания отменяются/возвращаются на исходный способ оплаты." },
      { kind: "p", content: "6.2.6 Если Курс куплен вместе с пробной подпиской, возврат за Курс в течение 14 дней не влияет на условия подписки; после одобрения возврата за Курс мы прекращаем доступ к Курсу и отменяем автопродление пробной подписки, если её оплата ещё не наступила." },
      { kind: "p", content: "Вы вправе на возврат, если не достигли заметных результатов от курса, при одновременном выполнении всех условий:" },
      { kind: "ul", items: [
            [
              { kind: "text", value: "вы связываетесь с нами в течение " },
              { kind: "moneyBackDays" },
              { kind: "text", value: " дней после первоначальной покупки и до окончания периода подписки" },
            ],
            [
              { kind: "text", value: "вы следовали программе не менее 14 дней подряд в первые " },
              { kind: "moneyBackDays" },
              { kind: "text", value: " дней после покупки (для ежемесячных и более длительных подписок, а также пробных периодов)" },
            ],
            "вы можете подтвердить прохождение программы скриншотами из личного кабинета о выполнении не менее 14 обучающих видео или других активностей"
        ] },
      { kind: "p", content: [
          { kind: "text", value: "Возврат по гарантии Money-Back доступен только при выполнении указанных требований. Мы рассмотрим запрос и уведомим вас (по email или иным способом) об одобрении. Публичные подробности также изложены на нашей " },
          { kind: "link", route: "refund", label: "Политику возврата" },
          { kind: "text", value: " странице." },
        ] },
      { kind: "p", content: "6.3 Возврат возможен только на тот же способ оплаты, которым вы оплачивали Услуги. Иной способ оплаты для возврата не используется." },
    ],
  },
  {
    title: "7. Персональные данные и контакты",
    blocks: [
      { kind: "p", content: "7.1 Для защиты персональной информации мы принимаем разумные меры и следуем отраслевым практикам, чтобы предотвратить неправомерную утрату, неправомерное использование, доступ, раскрытие, изменение или уничтожение данных." },
      { kind: "p", content: "7.2 Персональная информация может использоваться для исследований и развития Услуг. Мы вправе собирать и использовать данные, которые вы предоставляете при использовании Услуг. Мы не используем ваше изображение или персональные данные для целей, отличных от разработки наших продуктов и услуг." },
      { kind: "p", content: "7.3. Если вы оставляете отзыв, вы соглашаетесь, что мы можем публиковать его на Сайте в течение 5 лет. Мы не указываем ваше полное имя или указываем только инициалы, если вы явно не разрешите указать полное имя." },
      { kind: "p", content: "7.4 Мы можем связаться с вами по телефону или email для подтверждения деталей заказа или если заказ не был обработан по техническим причинам." },
      { kind: "p", content: [
          { kind: "text", value: "7.5 Мы гарантируем сбор и обработку персональных данных в соответствии с применимым законодательством. Подробнее см. нашу " },
          { kind: "link", route: "privacy", label: "Политике конфиденциальности" },
          { kind: "text", value: "." },
        ] },
    ],
  },
  {
    title: "8. Правила поведения",
    blocks: [
      { kind: "p", content: "8.1 Запрещено использовать Услуги и/или Сайт в незаконных или несанкционированных целях или нарушать законы. Весь контент Сайта и материалы от нас принадлежат Компании и защищены авторским правом." },
      { kind: "p", content: "8.2 Мы вправе (но не обязаны) расследовать незаконное и/или несанкционированное использование Сайта и принимать меры. При использовании Сайта вы обязаны:" },
      { kind: "ul", items: [
            "Не использовать Сайт или его контент в незаконных целях или с нарушением местного, регионального, национального или международного законодательства",
            "Не нарушать и не побуждать других нарушать права третьих лиц, включая права на интеллектуальную собственность",
            "Соблюдать все правила, размещённые на Сайте",
            "Не передавать зарегистрированный аккаунт другому лицу без нашего письменного согласия",
            "Предоставлять нам честную и точную информацию",
            "Не использовать Сайт или его контент в коммерческих целях, включая рекламу или рассылки",
            "Не переформатировать и не зеркалировать страницы Сайта",
            "Не создавать ссылки или редиректы на Сайт с других сайтов или email без нашего письменного согласия",
            "Не пытаться нарушать нормальную работу Сайта или использование Сайта другими пользователями",
            "Не перепродавать, распространять или передавать купленные у нас Продукты в коммерческих целях",
            "Не вмешиваться в функции безопасности Сайта",
            "Не получать доступ, не отслеживать и не копировать контент Сайта роботами, spider-программами, scraper-программами или иными автоматизированными средствами без нашего письменного разрешения",
            "Не заявлять ложную принадлежность, не получать доступ к чужим аккаунтам без разрешения и не подделывать личность",
            "Не совершать иных действий, нарушающих настоящие Условия или применимое законодательство"
        ] },
      { kind: "p", content: "8.3 Мы вправе немедленно прекратить Подписку без возврата и/или ограничить доступ к Сайту, если есть основания полагать, что вы не соответствуете п. 2.1, нарушили п. 8.1 или иным образом незаконно используете Сайт." },
      { kind: "p", content: "8.4. Используя Сервис, вы подтверждаете дееспособность и согласие соблюдать Условия; вам 18 лет; вы не будете получать доступ автоматизированными или нечеловеческими средствами; не будете использовать Сервис незаконно; использование не нарушит законы. При ложных, неточных, устаревших или неполных данных мы вправе отказать в текущем и будущем использовании Сервиса." },
      { kind: "p", content: "8.5 Нельзя использовать Сервис для целей, отличных от тех, для которых мы его предоставляем. Коммерческое использование допускается только с нашего разрешения." },
      { kind: "p", content: "8.7 Как пользователь Сервиса, вы соглашаетесь не:" },
      { kind: "ul", items: [
            "систематически получать данные или контент из Сервиса для создания коллекций, баз данных или каталогов без нашего письменного разрешения",
            "заниматься несанкционированным использованием Сервиса",
            "вносить изменения, адаптации, улучшения, дополнения, переводы или производные произведения на основе Сервиса",
            "использовать Сервис для получения дохода, коммерческих предприятий или иных целей, для которых он не предназначен",
            "делать Сервис доступным через сеть для одновременного использования несколькими устройствами или пользователями",
            "использовать Сервис для создания продукта, услуги или ПО, конкурирующего с Сервисом или заменяющего его",
            "обходить, отключать или иным образом вмешиваться в функции безопасности Сервиса",
            "мешать работе Сервиса, нарушать её или создавать избыточную нагрузку",
            "загружать или распространять файлы с вирусами, червями, троянами, повреждёнными файлами или аналогичным ПО",
            "использовать, запускать, разрабатывать или распространять автоматизированные системы, включая spider, robot, scraper или несанкционированные скрипты",
            "унижать, клеветать или иным образом, по нашему мнению, вредить нам и/или Сервису",
            "использовать Сервис с нарушением применимых законов или норм"
        ] },
      { kind: "p", content: "8.8 При общении со службой поддержки просим соблюдать уважительное поведение. При угрозах, преследовании или оскорблениях в отношении сотрудников мы вправе немедленно заблокировать аккаунт и прекратить диалог." },
    ],
  },
  {
    title: "9. Отказ от ответственности",
    blocks: [
      { kind: "p", content: "9.1 Материалы Сайта не являются профессиональной юридической, финансовой, инвестиционной, налоговой или иной специализированной консультацией. Мы предоставляем образовательный цифровой контент об искусственном интеллекте, AI-инструментах, технологиях и их практическом применении." },
      { kind: "p", content: "Сервис может содержать информацию о сторонних AI-платформах, ПО, моделях ИИ, автоматизации, создании контента и других технологиях. Мы не гарантируем постоянную доступность, неизменность функций, цен или характеристик сторонних сервисов." },
      { kind: "p", content: "Сервис предназначен как образовательный инструмент для получения знаний и навыков работы с ИИ. Мы не гарантируем конкретный уровень дохода, трудоустройства, экономии, роста бизнеса, продаж или иной конкретный результат." },
      { kind: "p", content: "9.2 Вы используете Сайт, Сервис и информацию на свой риск. Мы не отвечаем за убытки или ущерб, включая косвенный, особый, случайный или штрафной, связанные с использованием Сайта, Сервиса, курсов, материалов или информации." },
      { kind: "p", content: "Все пользователи соглашаются самостоятельно оценивать полученную информацию и принимать решения о её применении. Информация об ИИ и ПО может быстро устаревать. При использовании сторонних сервисов изучайте их документацию, условия и ограничения." },
      { kind: "p", content: "Использование Сервиса не создаёт отношений профессионального консультанта и клиента между вами и Компанией, если иное прямо не предусмотрено отдельным письменным соглашением." },
      { kind: "p", content: "9.3 Уровень подготовки и цели пользователей различаются, поэтому мы не гарантируем, что Услуги одинаково подойдут или будут эффективны для каждого. Отзывы и примеры в Сервисе иллюстрируют отдельные результаты и не гарантируют таких же результатов для всех." },
      { kind: "p", content: "9.4 На Сайте могут быть ссылки на сайты третьих лиц. Информация, продукты, ПО или услуги на сторонних сайтах контролируются их операторами, а не нами или аффилированными лицами." },
      { kind: "p", content: "9.5 Мы уважаем конфиденциальность клиентов, поэтому отзывы и комментарии на Сайте могут содержать вымышленные имена и изображения." },
      { kind: "p", content: "9.6 Если не указано иное, Сайт является нашей собственностью; исходный код, базы данных, функциональность, ПО, дизайн, тексты, фотографии и графика принадлежат или контролируются нами и защищены авторским и товарным правом." },
      { kind: "p", content: "9.7 Услуги на сайте предоставляются «как есть» без каких-либо гарантий, явных или подразумеваемых. В максимально допустимой степени мы отказываемся от всех гарантий, включая пригодность для продажи и для определённой цели." },
      { kind: "p", content: "9.8 Мы не гарантируем бесперебойную или безошибочную работу сайта, исправление дефектов или отсутствие вирусов и вредоносных компонентов на сайте или серверах." },
      { kind: "p", content: "9.9 Информация на Сайте предназначена только для образовательных и информационных целей. Материалы Сервиса не гарантируют конкретный результат и не являются профессиональной юридической, финансовой, инвестиционной, налоговой или иной консультацией." },
      { kind: "p", content: "9.10 Мы старались максимально точно отображать материалы, изображения, интерфейсы и описания услуг на Сайте. Однако отображение на вашем устройстве может не полностью соответствовать фактическому виду." },
    ],
  },
  {
    title: "10. Возмещение убытков",
    blocks: [
      { kind: "p", content: "10.1 Вы соглашаетесь возмещать, защищать и ограждать нас и аффилированных лиц, а также должностных лиц, директоров, владельцев, агентов, поставщиков информации и лицензиаров от претензий, обязательств, убытков, расходов (включая гонорары адвокатов) в связи с: (a) использованием вами нашего сайта; (b) использованием или предполагаемым использованием вашего аккаунта или пароля любым лицом; (c) содержанием информации, предоставленной вами; (d) нарушением прав третьих лиц; (e) нарушением применимых законов." },
      { kind: "p", content: "10.2 Мы вправе за свой счёт взять на себя защиту по вопросу, подлежащему возмещению с вашей стороны; в этом случае вы соглашаетесь сотрудничать с нами." },
      { kind: "p", content: "10.3 Вы соглашаетесь возмещать и ограждать Компанию, правопреемников, дочерние и аффилированные компании, поставщиков, лицензиаров и партнёров, а также их должностных лиц и сотрудников от ответственности, включая расходы и гонорары адвокатов, по требованиям третьих лиц в связи с использованием Сервиса или Продуктов, вашим User Content или нарушением Условий." },
      { kind: "p", content: "10.4 Компания вправе за ваш счёт взять исключительную защиту по вопросу, по которому вы обязаны возмещать нам убытки; вы соглашаетесь сотрудничать и не урегулировать вопрос без письменного согласия Компании." },
    ],
  },
  {
    title: "11. Ограничение ответственности",
    blocks: [
      { kind: "p", content: "11.1 Мы, директора, сотрудники, аффилированные лица, агенты, подрядчики, поставщики и лицензиары не несут ответственности за ошибки, убытки, упущенную выгоду или любой прямой, косвенный, случайный, штрафной, особый или последующий ущерб, связанный с использованием сервиса или продуктов, приобретённых через Услуги." },
      { kind: "p", content: "11.2 Если вас не устраивает Сайт, материалы, продукты, услуги или условия использования Сайта, единственное средство защиты — прекратить использование Сайта." },
      { kind: "p", content: "11.3 Ни при каких обстоятельствах мы (и аффилированные лица) не отвечаем перед вами или третьими лицами за упущенную выгоду или косвенный, последующий, примерный, случайный, особый или штрафной ущерб по настоящим Условиям или из-за использования/невозможности использования Сервиса." },
      { kind: "p", content: "11.4 Совокупная ответственность Компании перед вами по любым требованиям, связанным с приложением, контентом, Сервисом или Продуктами, ограничена суммой, уплаченной вами Компании за доступ и использование Сервиса." },
      { kind: "p", content: "11.5 Если вы резидент Калифорнии, вы отказываетесь от действия раздела 1542 Гражданского кодекса Калифорнии, который гласит: «Общий отказ от прав не распространяется на требования, которые кредитор или освобождающая сторона не знает и не подозревает о существовании в свою пользу на момент отказа и которые, будь они известны, существенно повлияли бы на урегулирование с должником или освобождённой стороной»." },
      { kind: "p", content: "11.6 В некоторых юрисдикциях ограничение ответственности за косвенный ущерб не допускается, поэтому указанные ограничения могут к вам не применяться. Если какой-либо аспект ограничений не применим, остальные сохраняют силу." },
    ],
  },
  {
    title: "12. Интеллектуальная собственность",
    blocks: [
      { kind: "p", content: "12.1 Все права на интеллектуальную собственность, включая товарные знаки, авторские права, доменные имена, права на базы данных, дизайн, патенты и иные права на объекты любого рода, зарегистрированные или нет («Интеллектуальная собственность»), на Сайте защищены законодательством об авторском праве, включая DMCA." },
      { kind: "p", content: "12.2 Запрещено копировать, перерабатывать или распространять Интеллектуальную собственность или иной контент, полученный от нас или найденный на Сайте, без нашего письменного разрешения. Коммерческое использование нашего контента запрещено без письменного разрешения." },
      { kind: "p", content: "12.3 Вся Интеллектуальная собственность на Сайте или предоставленная вам иным образом принадлежит Компании, кроме товарных знаков и материалов третьих лиц, которые мы используем." },
      { kind: "p", content: "12.4 Если вы заметили использование Интеллектуальной собственности Компании на сайтах третьих лиц, сообщите в службу поддержки." },
    ],
  },
  {
    title: "13. Применимое право и споры",
    blocks: [
      { kind: "p", content: "13.1 По жалобам, связанным с Сайтом, платежами, возвратами, качеством Услуг или использованием Сайта, сначала свяжитесь со службой поддержки по email до обращения к третьим лицам. Соглашаясь с Условиями, вы прямо соглашаетесь не требовать возврат от банка или платёжной системы без предварительного обращения к нам для урегулирования." },
      { kind: "p", content: "13.2 Жалобы и претензии рассматриваются в течение 30 дней с момента получения. При обращении указывайте те же имя и фамилию, что при покупке на Сайте." },
      { kind: "p", content: "13.3 Правовые отношения между вами и нами регулируются законодательством ОАЭ, если местное законодательство не исключает иные юрисдикции в потребительских спорах." },
      { kind: "p", content: "13.4 Любое требование предъявляется индивидуально инициатором, а не как иск или участие в коллективном иске, аналогичном производстве или арбитраже." },
      { kind: "p", content: "13.5 Первичное урегулирование споров. Мы заинтересованы в досудебном урегулировании. При споре с Компанией до формальных действий вы свяжетесь с нами по email с кратким описанием спора и контактами. Добросовестные переговоры — обязательное условие для сторон." },
      { kind: "p", content: "13.6 Отказ от коллективных исков. Кроме случаев «пакетного арбитража», требования не рассматриваются в арбитраже или суде на коллективной, совместной или консолидированной основе, включая иски в представительском качестве от имени общественности, других пользователей или иных лиц." },
    ],
  },
  {
    title: "14. Прочие положения",
    blocks: [
      { kind: "p", content: "14.1 Если положение Условий признано незаконным, ничтожным или неисполнимым, оно исполняется в максимально допустимой степени, а неисполнимая часть считается отделённой. Актуальная версия Условий доступна на этой странице." },
      { kind: "p", content: "14.2 Задержка или бездействие при реализации прав из-за вашего нарушения Условий не лишает нас этих прав и не считается отказом от них." },
      { kind: "p", content: "14.3 С учётом раздела 13 при недействительности положения Условия остаются в силе и изменяются так, чтобы быть действительными и отражать намерения сторон в максимально допустимой степени." },
      { kind: "p", content: "14.4 Если не указано иное, Условия составляют полное соглашение между вами и Компанией по их предмету и заменяют все предыдущие договорённости, письменные или устные." },
      { kind: "p", content: "14.5 Компания может передавать или уступать свои права и обязанности по Условиям любому лицу, в том числе путём новации; принимая Условия, вы соглашаетесь на такую передачу." },
      { kind: "p", content: "14.6 Информация, передаваемая через Сервис, считается электронной коммуникацией. Вы соглашаетесь на электронное общение, равнозначное письменному. Нажимая «SUBMIT», «CONTINUE», «REGISTER», «I AGREE» или аналогичные кнопки, вы подаёте юридически обязательную электронную подпись и заключаете соглашение." },
      { kind: "p", content: "14.7 Компания не отвечает за несоблюдение Условий, если это вызвано обстоятельствами вне её разумного контроля." },
    ],
  },
  {
    title: "15. Изменения",
    blocks: [
      { kind: "p", content: "15.1 Мы вправе изменять Условия в любое время по своему усмотрению. Периодически проверяйте Условия. На сайте мы публикуем объявления об изменениях. Изменения не имеют обратной силы и применяются с даты публикации." },
      { kind: "p", content: "15.2 В максимально допустимой степени мы можем менять плату за подписку с предварительным уведомлением. Если вы не согласны с новой ценой, отмените подписку до вступления изменений в силу." },
    ],
  },
  {
    title: "16. Контактная информация и регистрация профиля",
    blocks: [
      { kind: "p", content: "16.1 Вы можете связаться с нами по реквизитам в начале настоящего документа." },
      { kind: "companyDetails" },
      { kind: "p", content: "16.2. Для отдельных функций Сервиса может потребоваться регистрация профиля («Profile») и предоставление информации в форме регистрации." },
      { kind: "p", content: "16.3. Регистрируя профиль, вы подтверждаете, что регистрационные данные достоверны и точны; будете поддерживать их актуальность; использование Сервиса не нарушает законы и Условия." },
      { kind: "p", content: "16.4. Сервис не предназначен для лиц младше 18 лет. Используя Услуги, вы подтверждаете, что вам не менее 18 лет и у вас есть право, полномочия и дееспособность для заключения Условий." },
      { kind: "p", content: "16.5. Компания вправе приостановить или прекратить профиль или доступ к Сервису с уведомлением или без при нарушении вами Условий." },
      { kind: "p", content: "16.6. Вы отвечаете за конфиденциальность учётных данных профиля и за все действия под вашим профилем. Немедленно уведомляйте Компанию о несанкционированном использовании или иных нарушениях безопасности." },
    ],
  },
  {
    title: "17. Применимое право и подсудность",
    blocks: [
      { kind: "p", content: "17.1 Настоящие Условия регулируются законодательством ОАЭ." },
      { kind: "p", content: "17.2 Если спор по Соглашению не передан в арбитраж, каждая сторона подчиняется исключительной юрисдикции судов ОАЭ для разрешения споров, возникающих из Соглашения или в связи с ним." },
      { kind: "p", content: "17.3 Стороны безоговорочно подчиняются персональной юрисдикции и месту рассмотрения в судах ОАЭ и отказываются от возражений о неподходящем месте или форуме." },
    ],
  },
  {
    title: "18. Дополнительный отказ от гарантий",
    blocks: [
      { kind: "p", content: "18.1 Общий отказ от гарантий. Если законом не запрещено, вы используете Сервис на свой риск; Сервис и Продукты предоставляются «как есть» и «по мере доступности». Компания и аффилированные лица прямо отказываются от всех гарантий, явных и подразумеваемых, включая пригодность для продажи, для определённой цели и ненарушение прав." },
      { kind: "p", content: "В частности, освобождённые стороны не дают и прямо отказываются от гарантий, что:" },
      { kind: "ul", items: [
            "Сервис будет соответствовать вашим требованиям",
            "Сервис будет бесперебойным, своевременным, безопасным или безошибочным",
            "результаты использования Сервиса, включая данные, будут точными и надёжными",
            "качество данных или услуг через Сервис будет соответствовать вашим ожиданиям",
            "ошибки в Сервисе будут исправлены"
        ] },
      { kind: "p", content: "18.2 Не является консультацией. Любые заявления в Сервисе предназначены только для информации и развлечения и не заменяют профессиональную финансовую, медицинскую, юридическую или иную консультацию." },
      { kind: "p", content: "18.3 Изменение информации и услуг. Мы можем изменять информацию в Сервисе по своему усмотрению без предварительного уведомления и в любое время изменять или прекращать Сервис (полностью или частично), временно или постоянно." },
    ],
  },
  {
    title: "19. Сервис",
    blocks: [
      { kind: "p", content: "19.1. Вы признаёте, что весь текст, изображения, знаки, логотипы, подборки, данные, контент, ПО и материалы в Сервисе или используемые Компанией для работы Сервиса (кроме User Content) принадлежат нам или третьим лицам." },
      { kind: "p", content: "19.2. Компания сохраняет все права, включая права на интеллектуальную собственность; кроме случаев, прямо разрешённых Условиями, использование, распространение, продажа, декомпиляция, обратная разработка, дизассемблирование, перевод или иное использование запрещено." },
      { kind: "p", content: "19.3. Информация при регистрации и любой контент, материалы или сведения, которые вы загружаете, отправляете, публикуете или иным образом передаёте нам («User Content»), остаются вашей интеллектуальной собственностью." },
      { kind: "p", content: "19.4. Компания не заявляет авторских прав на User Content. Тем не менее вы предоставляете Компании лицензию в соответствии с разделом 21." },
      { kind: "p", content: "19.5. При соблюдении Условий Компания предоставляет вам непередаваемую неисключительную лицензию (без права сублицензии) на использование Сервиса только для личных некоммерческих целей." },
      { kind: "p", content: "19.6. Вы подтверждаете, что использование Сервиса соответствует лицензии, соглашениям и ограничениям и не нарушает права третьих лиц." },
      { kind: "p", content: "19.7. Вы самостоятельно обеспечиваете оборудование и телекоммуникационные услуги для доступа к Сервису и несёте связанные расходы." },
      { kind: "p", content: "19.8. Мы вправе в любое время изменять Сервис (бесплатные или платные функции) с уведомлением или без. Если изменения влияют на использование, вы можете удалить аккаунт или отменить подписку." },
      { kind: "p", content: "19.9. Доступ и использование Сервиса на ваш риск. Если законом не запрещено, Компания не отвечает за повреждение системы, потерю данных или иной вред вам или третьим лицам из-за доступа или использования Сервиса." },
      { kind: "p", content: "19.10. Компания не обязана предоставлять поддержку, но может делать это по своему усмотрению." },
    ],
  },
  {
    title: "20. Услуги куратора",
    blocks: [
      { kind: "p", content: "20.1. В рамках Сервиса Компания может предлагать интерактивные услуги куратора, связывающие вас с кураторами и информацией для достижения целей («Curator Services»)." },
      { kind: "p", content: "20.2. При наличии Подписки вы можете взаимодействовать с кураторами." },
      { kind: "p", content: "20.3. Куратор помогает достигать целей с помощью мотивационных инструментов. Компания может по своему усмотрению нанимать или заменять кураторов для пользователей Подписки." },
      { kind: "p", content: "20.4. Услуги куратора не являются медицинской, психиатрической или иной медицинской помощью и не заменяют консультацию или лечение у квалифицированных врачей. Перед использованием услуг коуча/куратора/педагога проконсультируйтесь с врачом. При неотложном состоянии немедленно обратитесь к врачу или в экстренную службу." },
    ],
  },
  {
    title: "21. Контент пользователя",
    blocks: [
      { kind: "p", content: "21.1. Предоставление лицензии. Вы предоставляете Компании, сублицензиатам, правопреемникам и цессионариям безвозмездную бессрочную сублицензируемую уступаемую неисключительную лицензию на использование, воспроизведение, изменение, адаптацию, публикацию, перевод, передачу, редактирование, создание производных произведений, распространение, получение дохода, публичное сообщение, отображение и иное использование User Content (полностью или частично) по всему миру и/или включение в другие произведения в любой форме и на любых носителях, включая технологии, известные сейчас или разработанные позже." },
      { kind: "p", content: "21.2. Предоставленная лицензия прямо исключает персональные данные в значении применимого законодательства о конфиденциальности." },
      { kind: "p", content: "21.3. Вы подтверждаете, что владеете User Content или уполномочены предоставить права Компании. Мы не обязаны хранить копии удалённых материалов и не отвечаем за убытки при удалении контента, который вы разместили или передали." },
      { kind: "p", content: "21.4. Чтобы отозвать лицензию на определённый User Content, свяжитесь с нами по email." },
      { kind: "p", content: [
          { kind: "text", value: "См. также: " },
          { kind: "link", route: "privacy", label: "Политике конфиденциальности" },
          { kind: "text", value: " · " },
          { kind: "link", route: "cookie", label: "Политика cookie" },
          { kind: "text", value: " · " },
          { kind: "link", route: "refund", label: "Политику возврата" },
          { kind: "text", value: " · " },
          { kind: "link", route: "billing", label: "Оплата и тарифы" },
          { kind: "text", value: " · " },
          { kind: "link", route: "contact", label: "Контакты" },
        ] },
    ],
  },
]

export const TERMS_PAGE_COPY: Record<MarketingLocale, TermsPageCopy> = {
  en: {
    pageTitle: 'Terms & Conditions — Mindora Academy',
    heroTitle: 'Terms & Conditions',
    sections: EN_SECTIONS,
  },
  ru: {
    pageTitle: 'Условия и положения — Mindora Academy',
    heroTitle: 'Условия и положения',
    sections: RU_SECTIONS,
  },
}

export function termsPageCopy(locale: MarketingLocale): TermsPageCopy {
  return TERMS_PAGE_COPY[locale]
}
