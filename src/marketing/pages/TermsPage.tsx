import { Link } from 'react-router-dom'
import { CompanyDetails, LegalCard, LegalHero, LegalSection } from '@/marketing/components/LegalBlocks'
import { COMPANY } from '@/marketing/data/company'
import { ROUTES } from '@/marketing/data/nav'
import usePageTitle from '@/marketing/hooks/usePageTitle'

export default function TermsPage() {
  usePageTitle('Terms & Conditions — Mindora Academy')

  return (
    <>
      <LegalHero title="Terms & Conditions" />
      <LegalCard>
        <LegalSection title="Company Information">
          <p>
            Thank you for visiting our website{' '}
            <a href={COMPANY.website} className="text-sw-blue hover:underline" target="_blank" rel="noreferrer">
              {COMPANY.website}
            </a>{' '}
            (hereinafter referred to as the &quot;Website&quot;).
          </p>
          <CompanyDetails />
          <p>
            Note: In this document, the terms &quot;Company&quot;, &quot;we&quot;, &quot;us&quot;,
            and &quot;our&quot; refer to the above-mentioned legal entity. &quot;Service&quot;
            refers to the above-mentioned service name, including the Website and all related
            services.
          </p>
          <p>
            Before using any function of the Website or any products and services available through
            the Website, please take the time to carefully read and understand these Terms and
            Conditions (hereinafter referred to as the &quot;Terms&quot;), as these Terms govern all
            relationships between you (hereinafter referred to as the &quot;User&quot;,
            &quot;you&quot;, or &quot;Customer&quot;) and us.
          </p>
          <p>
            The Company makes no representations that the Service is available, suitable, or legally
            available for use in your jurisdiction, and access to and use of the Service are
            prohibited in territories where such use would be unlawful. You access the Service on
            your own initiative and are responsible for complying with local laws.
          </p>
          <p>
            Please do not continue to make any purchases on the Website if you have not carefully
            read and understood the provisions of these Terms, because whenever you purchase
            anything from us, these Terms will be considered a legally binding agreement between you
            and us.
          </p>
          <p>
            The Website includes subscriptions that automatically renew. Please carefully read these
            Terms before starting a trial or completing the purchase of an automatically renewing
            subscription service on our Website.
          </p>
          <p>
            To avoid being charged, you must expressly cancel your subscription at least 24 hours
            before the end of the trial period or current subscription period. When purchasing an
            automatically renewing subscription, you agree to the nature of the automatic renewal
            and its terms, as specified near the place of purchase.
          </p>
          <p>
            Regardless of where you purchased your subscription, if you do not know how to cancel
            your subscription or trial, please contact our customer support service on the Website
            or by email.
          </p>
          <p>
            Our privacy rules are detailed in our{' '}
            <Link to={ROUTES.privacy} className="text-sw-blue hover:underline">
              Privacy Policy
            </Link>
            . Please read it to understand how your personal information is collected, used, and
            shared.
          </p>
        </LegalSection>

        <LegalSection title="1. Acceptance of Terms">
          <p>
            1.1. These Terms govern the relationship between you and the Company regarding your use
            of the Service, including the Website, Telegram bot, and related services
            (&quot;Service&quot;), including all information, text, graphics, software, and services
            available for your use (&quot;Content&quot;).
          </p>
          <p>
            1.2. These Terms establish legally binding contractual relations between you and the
            Company. Accordingly, PLEASE READ THE TERMS CAREFULLY BEFORE USING THE SERVICE.
          </p>
          <p>
            1.3. To create a profile and use certain features of the Service, you must be at least
            18 years old. Users aged 14-17 may use the Service only under the supervision and with
            the consent of a parent or legal representative who agrees to comply with these Terms.
            We do not guarantee that our Digital Content and other Services will be suitable and
            useful for everyone, therefore, before making any purchases on the Website, please
            individually assess whether the Service is personally suitable for you.
          </p>
          <p>
            1.4. Please also review our{' '}
            <Link to={ROUTES.privacy} className="text-sw-blue hover:underline">
              Privacy Policy
            </Link>
            . The Privacy Policy and other additional terms are expressly incorporated into this
            document by reference.
          </p>
          <p>
            1.5. Any translation from this language version is provided solely for your convenience.
            In the event of discrepancies, this language version shall prevail.
          </p>
          <p>
            1.6. To the extent permitted by applicable law, we may modify these Terms. We will
            notify you of material changes as required by applicable law.
          </p>
          <p>
            1.7. If you do not agree with the changes, stop using the Service, delete your account,
            or cancel your subscription before the changes take effect. By continuing to use the
            Service after the changes, you accept the updated Terms.
          </p>
        </LegalSection>

        <LegalSection title="2. User Information">
          <p>2.1 If you wish to use the Services, you must meet the following requirements:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              You have reached the legal age required to enter into distance contracts under the
              laws of your place of residence. The Website and any Service program are designed and
              intended for use only by adults. Users aged 14-17 may use the Service only under the
              supervision and with the consent of a parent or legal representative who agrees to
              comply with these Terms.
            </li>
            <li>You have read these Terms and agree to comply with them.</li>
            <li>
              You must provide us with your correct contact details, payment information, and other
              information necessary for the operation of the Service.
            </li>
            <li>
              You use a credit/debit/bank card or another payment method that belongs to you, or the
              card/payment method owner has authorized you to use the card, and such authorization
              was provided in the form required by the laws of your place of residence.
            </li>
          </ul>
          <p>
            2.2 To use all functionality of the Website, Services, and Digital Content of the
            Service, you may be required to provide your personal data, such as your age,
            preferences, expectations, and aspirations regarding what you would like to achieve.
            Please note that we will only be able to provide you with high-quality personalized
            services if you provide us with truthful information.
          </p>
          <p>
            2.3 By agreeing to these Terms, you confirm that you understand that the Services cannot
            be refused after they have been provided to you. The Services are deemed to have been
            provided to you from the moment the Telegram bot is activated and you log into it.
            However, you may cancel your subscription at any time, and if you do so, we will not
            renew your subscription and will stop charging you for subsequent periods.
          </p>
          <p>
            2.4 Please note that this Website, our Services, and any digital content you receive
            from us may only be used for your personal needs. You are not entitled to use the
            Website content, digital content, or our Services for resale, distribution, rental, or
            any other type of commercial use.
          </p>
          <p>
            2.5 You may not use the Website or our Services for any illegal or unauthorized purposes
            and may not violate any laws while using the Service. All Website content and the
            content of all materials received from us (including graphic designs and other content)
            and the relevant parts belong to the Company and are protected by copyright laws. Any
            use of any copyrights for purposes other than personal use of Our Services, without a
            Provider&apos;s license, constitutes copyright infringement.
          </p>
        </LegalSection>

        <LegalSection title="3. Prices of Our Services and Payment Methods">
          <p>
            3.1 The Service provides Customers with access to various digital content developed
            under license according to users&apos; needs and preferences, online artificial
            intelligence courses, educational materials, video lessons, practical assignments,
            guides, examples, prompts, support, and access to a Telegram group for subscribers only
            (hereinafter referred to as the &quot;Services&quot;). The content of the Website and
            Services may change from time to time as we continuously update and improve them.
          </p>
          <p>
            3.2 Please note that all of our Services are provided only in the form of digital
            content. Accordingly, our Services are deemed to have been provided to you from the
            moment you first activate the Telegram bot. Certain features of the Service may be
            offered by subscription for a specified fee. You may purchase a subscription directly
            from the Company.
          </p>
          <p>
            3.3 Please note that our educational and personalized Services are prepared and provided
            according to the information you provide to us. For this reason, we ask you to provide
            only accurate and truthful information about yourself. Personalized plans and other
            Services received from us are suitable only for you because they will be created
            according to your personal information.
          </p>
          <p>
            3.4 Our Services are intended solely for educational purposes and do not constitute
            professional advice in the fields of law, finance, investment, business, programming, or
            any other professional activity.
          </p>
          <p>
            3.5 You may use our Services by purchasing a &quot;Services&quot; plan, which is billed
            every 1 month. You authorize us to charge the applicable fees to the payment method you
            provide. After this prepaid period expires, you will automatically be charged the amount
            for the subsequent period of the same duration as your initial payment or, when signing
            up for a subscription trial period, after the trial expires, you will be charged the
            full amount for the selected billing period.
          </p>
          <p>
            <strong className="text-sw-dark">Automatic subscription renewal.</strong> By subscribing
            to certain subscriptions, you agree that your subscription may automatically renew. If
            you do not cancel your subscription, you authorize us to charge you for the renewal
            term. The automatic renewal period will be the same as your initial subscription period
            unless otherwise specified in the Terms. The renewal price will not exceed the price of
            the immediately preceding subscription period, except for any promotional (introductory)
            and discounted prices, unless we notify you of a change in the rate before automatic
            renewal.
          </p>
          <p>
            3.6 The monthly plan will provide you with access to an online system containing digital
            content and services. All plans and practices of the Service may be accompanied by video
            lessons, guides, and prompts. To the maximum extent permitted by applicable law, we may
            change the Purchase fee at any time. We will notify you in advance of any such price
            changes. If you do not wish to pay the new fees, you may cancel the relevant
            subscription before the changes take effect. See also our{' '}
            <Link to={ROUTES.billing} className="text-sw-blue hover:underline">
              Billing &amp; Plans
            </Link>{' '}
            page.
          </p>
          <p>
            3.7 On the Website checkout page, you may see different prices if a special sales tax
            applies in your state that may legally be added to the total cost.
          </p>
          <p>
            3.8 Please note that we will never apply any conversion rates or fees depending on the
            payment method you choose. However, some banks apply conversion rates to outgoing
            payments and international transfers — therefore, we are not responsible for any bank
            fees or conversion rates that your bank may apply to any payment made to Us.
          </p>
          <p>
            3.9 We accept payments only by credit and debit cards. We do not accept checks, cash, or
            other means of payment.
          </p>
          <p>
            3.10 Trial subscription. We may offer a paid trial subscription to the Service. The
            trial provides you with access to the Service for a specified period, the details of
            which are indicated when subscribing to the offer. If this is not the case, you will
            purchase our subscription without a trial period.
          </p>
          <p>
            3.11 Free or paid trial. We may offer a free or paid (for a small fee) trial
            subscription to this service. If you do not cancel your subscription before the end of
            the trial period, you will automatically be charged the amount indicated on the payment
            screen for the selected subscription period. We may also offer discounted offers from
            time to time that renew at the full non-discounted price.
          </p>
          <p>
            3.12 The subscription automatically renews at the end of each period (weekly, monthly, 6
            months, annually, or otherwise, depending on the option you selected during purchase)
            until you cancel it.
          </p>
          <p>
            3.13 Payment method. Payment will be charged using the payment method you provided
            during purchase upon confirmation of payment or after the trial period ends. You
            authorize us to charge the applicable subscription fee to the payment method used.
          </p>
          <p>
            3.14. The cost of a course provided by the Service may range from $20 to $40 per course,
            depending on the specific offer and the page (landing page) from which the purchase is
            made.
          </p>
          <p>
            3.15. The cost of a subscription to the Service may range from $19.99 to $39.99
            depending on the selected plan, access duration, and landing page from which the
            subscription is purchased.
          </p>
          <p>
            3.16. The current price is always indicated on the checkout page and confirmed by the
            User before payment.
          </p>
          <p>
            3.17. All prices are stated in United States dollars (USD). The Company reserves the
            right to change the cost of services and subscriptions by notifying Users through
            publication of updated terms on the Website or checkout page.
          </p>
        </LegalSection>

        <LegalSection title="4. Discount Policy">
          <p>4.1 From time to time, we may offer special discounts on plan prices. We may offer you a discount if:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              You are using our Services for the first time, you may be eligible for a discount on
              your first purchase of a plan from us; and/or
            </li>
            <li>You provide us with your email address and agree to receive our newsletter.</li>
          </ul>
          <p>
            4.2 Current discounts may change from time to time. We will provide more detailed
            information about the discount amount whenever we announce its availability.
          </p>
          <p>
            4.3 We reserve the right to launch and cancel our discount programs and change discount
            amounts at any time, except where a specific period or time during which the discount
            will be available is specified in a particular discount advertisement.
          </p>
          <p>
            By purchasing a course at a promotional price, the User may receive access to a Service
            subscription with a free trial period (from 3 to 30 days, unless otherwise stated on the
            landing page). At the end of the trial period, the subscription automatically renews for
            the next paid period, while the subscription cost may range from $20 to $40 depending on
            the plan and the landing page from which the order is placed.
          </p>
          <p>
            The User may cancel the subscription at any time through the Stripe personal account or
            on the subscription cancellation page for the channel, if necessary by contacting
            support. Cancellation is carried out without penalties or restrictions. By placing an
            order at a promotional price, the User confirms their agreement to the subscription
            terms, including automatic renewal after the trial period ends.
          </p>
        </LegalSection>

        <LegalSection title="5. Subscription Cancellation">
          <p>
            Your subscription automatically renews at the end of each period until you cancel it.
            Please note that deleting/blocking the Telegram bot does not cancel your subscriptions.
          </p>
          <p>
            5.1 If you wish to cancel your subscription plan, you may do so in your personal account
            on the Website or by contacting our customer support service and informing us of your
            decision to terminate the subscription. Your cancellation will take effect upon
            expiration of the plan term to which you subscribed and which you have already paid for.
          </p>
          <p>
            5.2 If you do not want the Services to renew automatically, please cancel your
            subscription in your personal account or notify us of your decision to cancel the
            subscription at least 24 hours before the end of the current billing period, in which
            case the Services will be terminated upon expiration of the current term and you will
            not be charged for subsequent periods.
          </p>
          <p>
            5.3 Please note that if you cancel your subscription, we will not refund money for
            previous periods during which you used or had the opportunity to use the Services. For
            more information about refunds, please see{' '}
            <Link to={ROUTES.refund} className="text-sw-blue hover:underline">
              Refund Policy
            </Link>
            . You must cancel your subscription in accordance with the cancellation procedure
            disclosed to you for the specific subscription.
          </p>
          <p>
            5.4 Cancellation of subscription trial period. If you do not cancel your subscription
            before the end of the trial period or unless otherwise stated, your access to the
            Service will automatically continue and you will be charged for renewal of access to the
            Service. Except where inapplicable or prohibited by law, we reserve the right, at our
            discretion, to modify or terminate any trial offer, your access to the Service during
            the trial subscription, or any of these terms without prior notice and without any
            liability. We reserve the right to limit your ability to use multiple trial periods.
          </p>
          <p>
            5.5 The term of the Service and your rights to use it expire at the end of the paid
            period of your subscription. If you do not pay the fees or charges due, we may make
            reasonable efforts to notify you and resolve the issue; however, we reserve the right to
            disable or terminate your access to the Service (and may do so without prior notice).
          </p>
          <p>
            5.6 If you decide to cancel your subscription and notify us of this, your subscription
            and account will terminate upon expiration of the subscription period for which you have
            already paid. If you wish to close your account immediately, please let us know and your
            account will be closed immediately; however, we will not refund money for subscription
            months that have already been paid for the Services, except as described in sections 5.3
            and 6.2.
          </p>
        </LegalSection>

        <LegalSection title="6. Refunds">
          <p>
            We provide refunds in accordance with the law and our Terms, which may be published from
            time to time. Please note that after your subscription period has expired, we will not
            be able to refund you because the service will be considered fully used.
          </p>
          <p>
            6.1 Since our Services are provided only in the form of digital content, we do not issue
            refunds if you have accessed your personal account and decided to cancel your
            subscription. Once you cancel your subscription, we will stop charging the regular
            subscription fee, but we will not refund amounts for already paid periods. You agree
            that the Purchase is final, that the Company will not refund any transaction after it
            has been completed, and that the Purchase cannot be canceled, except as expressly
            provided in these Terms and solely to the extent required by applicable law.
          </p>
          <h3 className="font-semibold text-sw-dark">6.2 Refunds for courses and subscriptions</h3>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Courses.</strong> The User has the right to a refund for a purchased Course
              within 14 (fourteen) calendar days from the date of payment, provided that the User
              submits a refund request within this period. After 14 days, a refund for Courses is
              not possible.
            </li>
            <li>
              <strong>Subscriptions.</strong> All subscriptions to the Service are non-refundable.
              Subscription payment is final and non-refundable after it has been made. In the event
              of subscription cancellation, further charges will stop, but amounts paid for an
              already started or paid period are non-refundable.
            </li>
            <li>
              <strong>Upsells and additional purchases.</strong> All purchases made after the main
              checkout (for example, upsells, additional materials, special offers) are final and
              non-refundable.
            </li>
          </ul>
          <p>
            6.2.1 Subscription payments are non-refundable regardless of whether the Service has
            been used, partially used, not used, or due to changes in your personal plans.
          </p>
          <p>
            6.2.2 Paid subscription periods, including automatic renewals, are not subject to
            partial or prorated refunds.
          </p>
          <p>
            6.2.3 Changes in price, promotional period, content assortment, or temporary
            unavailability of individual features (&lt;24 hours) are not grounds for a refund.
          </p>
          <p>
            6.2.4 Upsells/additional purchases (products/services purchased at steps after the main
            checkout) are final and non-refundable.
          </p>
          <p>
            6.2.5 Exceptions: duplicate charges or a technical error in the payment system resulting
            in lack of access — upon our confirmation, such charges will be canceled/refunded to the
            original payment method.
          </p>
          <p>
            6.2.6 If a Course is purchased together with a trial subscription, a refund for the
            Course within 14 days does not affect the subscription terms; upon approval of the
            refund for the Course, we will terminate access to the Course and cancel automatic
            renewal of the trial subscription if its payment has not yet become due.
          </p>
          <p>
            However, you are entitled to a refund if you did not achieve visible results from our
            course, provided that all of the following conditions are met:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              you contact us within 30 days after your initial purchase and before the end of the
              subscription period
            </li>
            <li>
              you followed our program for at least 14 consecutive days during the first 30 days
              after purchase (for monthly and longer subscription periods, as well as subscription
              trial periods)
            </li>
            <li>
              you can demonstrate that you followed the program by providing screenshots from your
              personal account confirming that you completed at least 14 educational videos or other
              activities
            </li>
          </ul>
          <p>
            Please note that a refund under the Money-Back Guarantee is available only if the above
            requirements are met. We will review your request and notify you (by email or otherwise)
            whether it has been approved. Full public-facing details are also set out on our{' '}
            <Link to={ROUTES.refund} className="text-sw-blue hover:underline">
              Refund Policy
            </Link>{' '}
            page.
          </p>
          <p>
            6.3 We can issue a refund only to the same payment method you used to pay for our
            Services. We will not issue a refund through any payment method other than the one you
            used to pay for your subscription.
          </p>
        </LegalSection>

        <LegalSection title="7. Personal Data and Contacts">
          <p>
            7.1 To protect your personal information, we take reasonable precautions and follow
            industry best practices to ensure that it is not improperly lost, misused, accessed,
            disclosed, altered, or destroyed.
          </p>
          <p>
            7.2 Your personal information may be used to assist us in our research and further
            development of the Services. In addition, we are permitted to collect and use
            information that you provide to us while using our Services. However, under no
            circumstances will we use your image or any personal data for purposes other than the
            development of our products and services.
          </p>
          <p>
            7.3. If you choose to leave us feedback, you agree that we may display it on our Website
            for 5 years after receiving it from you. We will not state your real name or will only
            indicate your initials in the review unless you specifically instruct us that we may
            state your full name.
          </p>
          <p>
            7.4 Please note that we may contact you by phone or email if we need to confirm any
            details of your order or if your order request was not successfully processed for
            technical reasons.
          </p>
          <p>
            7.5 We guarantee that all personal data will be collected and processed in accordance
            with all applicable laws. To learn more about how we use and process personal data,
            please review our{' '}
            <Link to={ROUTES.privacy} className="text-sw-blue hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </LegalSection>

        <LegalSection title="8. Rules of Conduct">
          <p>
            8.1 You may not use our Services and/or Website for any illegal or unauthorized purposes
            or violate any laws when using the Website. All content of the Website and all materials
            received from us belong to the Company and are protected by copyright laws.
          </p>
          <p>
            8.2 We have the right, but not the obligation, to investigate any illegal and/or
            unauthorized use of the Website and take appropriate legal action. When using the
            Website, you must:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Not use the Website or any of its content for any illegal purpose or in violation of
              any local, state, national, or international law
            </li>
            <li>
              Not violate or encourage others to violate the rights of third parties, including
              intellectual property rights
            </li>
            <li>Comply with all rules posted on the Website</li>
            <li>
              Not transfer, legally or factually, your registered account to any other person
              without our written consent
            </li>
            <li>Provide us with honest and accurate information</li>
            <li>
              Not use the Website or any of its content for any commercial purposes, including the
              distribution of any advertising or solicitation
            </li>
            <li>Not reformat or mirror any portion of any Website web page</li>
            <li>
              Not create any links or redirects to the Website through other websites or emails
              without our prior written consent
            </li>
            <li>
              Not attempt to interfere with the proper functioning of the Website or the use of the
              Website by other users
            </li>
            <li>
              Not commercially resell, distribute, or transfer any Products you purchase from us
            </li>
            <li>Not interfere in any way with the security-related functions of the Website</li>
            <li>
              Not access, monitor, or copy any content or information from the Website using any
              robots, spiders, scrapers, or other automated means without our express written
              permission
            </li>
            <li>
              Not falsely state an affiliation, access other users&apos; accounts without
              authorization, or falsify your identity
            </li>
            <li>Not engage in any other activity that would violate these Terms or applicable law</li>
          </ul>
          <p>
            8.3 We have the right to immediately terminate your Subscription without a refund and/or
            restrict your access to the Website if we have reason to believe that you do not meet
            the requirements specified in Section 2.1, have violated any provision of Section 8.1,
            or use the Website in any other illegal manner.
          </p>
          <p>
            8.4. By using the Service, you represent and warrant that you have legal capacity and
            agree to comply with these Terms; you are 18 years old; you will not access the Service
            through automated or non-human means; you will not use the Service for any illegal or
            unauthorized purposes; and your use of the Service will not violate any applicable laws
            or regulations. If you provide any information that is false, inaccurate, outdated, or
            incomplete, we have the right to refuse any current or future use of the Service.
          </p>
          <p>
            8.5 You may not access or use the Service for any purpose other than those for which we
            provide the Service. The Service may not be used for any commercial purposes except
            those specifically permitted or approved by us.
          </p>
          <p>8.7 As a user of the Service, you agree not to:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              systematically obtain data or other content from the Service to create a collection,
              compilation, database, or directory without our written permission
            </li>
            <li>engage in any unauthorized use of the Service</li>
            <li>
              make any modifications, adaptations, improvements, additions, translations, or
              derivative works from the Service
            </li>
            <li>
              use the Service for any income-generating purposes, commercial enterprises, or other
              purposes for which it is not intended
            </li>
            <li>
              make the Service available through a network that allows access or use by multiple
              devices or users simultaneously
            </li>
            <li>
              use the Service to create a product, service, or software that directly or indirectly
              competes with or in any way replaces the Service
            </li>
            <li>
              circumvent, disable, or otherwise interfere with the security-related features of the
              Service
            </li>
            <li>interfere with, disrupt, or create an excessive load on the Service</li>
            <li>
              upload or distribute files containing viruses, worms, trojans, corrupted files, or any
              other similar software
            </li>
            <li>
              use, launch, develop, or distribute any automated system, including any spider, robot,
              scraper, or unauthorized script
            </li>
            <li>
              demean, defame, or otherwise harm, in our opinion, us and/or the Service
            </li>
            <li>use the Service in a manner inconsistent with any applicable laws or regulations</li>
          </ul>
          <p>
            8.8 When communicating with representatives of our customer support service, we ask you
            to maintain respectful and kind behavior. If your behavior toward any of our customer
            support representatives or other employees is at any time perceived as threatening,
            harassing, or abusive, we reserve the right to immediately terminate your account and
            terminate the dialogue.
          </p>
        </LegalSection>

        <LegalSection title="9. Disclaimer">
          <p>
            9.1 Nothing on this Website is intended to provide professional legal, financial,
            investment, tax, or other specialized advice. We provide educational digital content
            dedicated to artificial intelligence, AI tools, technologies, and the practical use of
            such tools.
          </p>
          <p>
            The Service may contain information about third-party AI platforms, software, artificial
            intelligence models, automation, content creation, and other technologies. We do not
            guarantee the continued availability, unchanged features, prices, or technical
            specifications of third-party services.
          </p>
          <p>
            The Service is intended as an educational tool and may be useful for acquiring knowledge
            and practical skills in working with AI. However, we do not guarantee that use of the
            Service will result in a specific level of income, employment, cost savings, business
            growth, increased sales, or any other specific result.
          </p>
          <p>
            9.2 You use the Website, Service, and any information contained therein solely at your
            own risk. We are not responsible for any losses or damages, including indirect, special,
            incidental, or punitive damages, arising from the use of the Website, Service, courses,
            materials, or information contained in or provided through the Service.
          </p>
          <p>
            All users who use our Services agree to independently evaluate the information received
            and make decisions regarding its application. Information about artificial intelligence
            and software may quickly become outdated. When using third-party services, you must
            independently review their official documentation, terms of use, and limitations.
          </p>
          <p>
            Use of the Service does not represent or create a professional consultant-client
            relationship between you and the Company unless otherwise expressly provided by a
            separate written agreement.
          </p>
          <p>
            9.3 Each user&apos;s level of preparation and goals differ, therefore we do not provide
            any guarantees that our Services will be equally suitable or effective for every user.
            Testimonials and examples that may be provided in the Service are examples of specific
            results and are not intended to represent or guarantee that any user will achieve the
            same or similar results.
          </p>
          <p>
            9.4 The Website may contain links to other websites maintained by third parties. Any
            information, products, software, or services provided on or through third-party websites
            are controlled by the operators of such websites, not by us or our affiliates.
          </p>
          <p>
            9.5 We respect the privacy of our customers, therefore all reviews and/or comments
            posted on the Website may contain fictional names and associated images.
          </p>
          <p>
            9.6 Unless otherwise stated, this Website is our property, and all source code,
            databases, functionality, software, design, texts, photographs, and graphic images on
            the Website are owned or controlled by us and protected by copyright and trademark laws.
          </p>
          <p>
            9.7 The services offered on or through the website are provided &quot;as is&quot; and
            without any warranties, whether express or implied. To the maximum extent permitted by
            applicable law, we disclaim all warranties, including implied warranties of
            merchantability and fitness for a particular purpose.
          </p>
          <p>
            9.8 We do not guarantee that the website or any of its functions will operate
            uninterrupted or error-free, that defects will be corrected, or that any part of this
            website or the servers that make the website available are free of viruses or other
            harmful components.
          </p>
          <p>
            9.9 Any information presented on the Website is for educational and informational
            purposes only. The materials of the Service do not guarantee any specific result and
            should not be considered professional legal, financial, investment, tax, or other
            advice.
          </p>
          <p>
            9.10 We have made every effort to display the materials, images, interfaces, and
            descriptions of the services presented on the Website as accurately as possible.
            However, we cannot guarantee that the display of the materials on your device will fully
            correspond to their actual appearance.
          </p>
        </LegalSection>

        <LegalSection title="10. Indemnification">
          <p>
            10.1 You agree to indemnify, defend, and hold harmless us and our affiliates, as well as
            the respective officers, directors, owners, agents, information providers, and
            licensors, from and against any claims, liabilities, losses, damages, costs, and
            expenses (including attorneys&apos; fees) in connection with: (a) your use of or
            connection to Our website; (b) any use or alleged use of Your account or Your account
            password by any person, whether authorized by You or not; (c) the content of the
            information provided by You to Us; (d) your violation of the rights of any other
            individual or legal entity; (e) your violation of any applicable laws, rules, or
            regulations.
          </p>
          <p>
            10.2 We reserve the right, at our own expense, to assume the defense and control of any
            matter otherwise subject to indemnification by you, and in such case, you agree to
            cooperate with us in the defense of such claim.
          </p>
          <p>
            10.3 You agree to indemnify and hold harmless the Company, its successors, subsidiaries,
            affiliates, any related companies, its suppliers, licensors, and partners, as well as
            the officers, directors, employees, agents, and representatives of each of them, from
            liability, including costs and attorneys&apos; fees, arising from any claim or demand
            brought by any third party in connection with or as a result of your use of the Service
            or the Products, your User Content, or your violation of these Terms.
          </p>
          <p>
            10.4 The Company reserves the right, at your expense, to assume the exclusive defense
            and control of any matter for which you are required to indemnify us, and you agree to
            cooperate with our defense of such claims. You agree not to settle any matter without
            the Company&apos;s prior written consent.
          </p>
        </LegalSection>

        <LegalSection title="11. Limitation of Liability">
          <p>
            11.1 In no event shall we, our directors, officers, employees, affiliates, agents,
            contractors, interns, suppliers, service providers, or licensors be liable for any
            errors, losses, lost profits, or other consequences, damages, claims, or any direct,
            indirect, incidental, punitive, special, or consequential damages of any kind arising
            from your use of any of the service or any products purchased using the Services.
          </p>
          <p>
            11.2 If You are dissatisfied with the Website, any materials, products, or services
            presented on the Website, or any terms of use of the Website, your sole remedy is to
            discontinue using the Website.
          </p>
          <p>
            11.3 Under no circumstances shall we (and our affiliates) be liable to you or any third
            party for any lost profits or any indirect, consequential, exemplary, incidental,
            special, or punitive damages arising from these Terms or your use of or inability to use
            the Service.
          </p>
          <p>
            11.4 Notwithstanding anything contained herein, you agree that the Company&apos;s
            aggregate liability to you for any claims arising from the use of the application,
            content, Service, or Products is limited to the amount paid by you to the Company for
            access to and use of the Service.
          </p>
          <p>
            11.5 If you are a resident of California, you hereby waive Section 1542 of the
            California Civil Code, which provides: &quot;A general release does not extend to claims
            that the creditor or releasing party does not know or suspect exist in his or her favor
            at the time of executing the release and that, if known by him or her, would have
            materially affected his or her settlement with the debtor or released party.&quot;
          </p>
          <p>
            11.6 Some jurisdictions do not allow the limitation or exclusion of liability for
            incidental or consequential damages, so the above limitation or exclusion may not apply
            to you. If one or any aspect of the limitations set forth above does not apply, all
            other aspects shall remain in effect.
          </p>
        </LegalSection>

        <LegalSection title="12. Intellectual Property">
          <p>
            12.1 All intellectual property rights, including, without limitation, trademarks,
            copyrights, domain names, database rights, design rights, patents, and all other rights
            in any creations of any kind, whether registered or not (&quot;Intellectual
            Property&quot;) on the Website are protected by the Digital Millennium Copyright Act.
          </p>
          <p>
            12.2 You may not copy, repurpose, or distribute any Intellectual Property or any other
            content obtained from us or found on the Website for any purpose without our express
            written permission. Use of our content for commercial purposes is prohibited unless you
            have our express written permission.
          </p>
          <p>
            12.3 All Intellectual Property posted on the Website or provided to you in any other
            form belongs to the Company, except for third-party trademarks, service marks, or other
            materials that we use.
          </p>
          <p>
            12.4 If you notice that any third party is using the Company&apos;s Intellectual
            Property on their websites, please report such cases to our customer support service.
          </p>
        </LegalSection>

        <LegalSection title="13. Governing Law and Disputes">
          <p>
            13.1 If you have any complaints regarding the Website, charges, refunds, the quality of
            the Services, or anything related to the use of the Website, You must first contact our
            customer support service by email before taking any action through third parties. Please
            note that by agreeing to these Terms, you expressly agree not to request any refunds
            from your bank or credit card provider without first contacting us and giving us an
            opportunity to resolve any issues you may have.
          </p>
          <p>
            13.2 All complaints or claims submitted by you must be processed within 30 days of
            receipt. When contacting us with your complaints, you must always identify yourself
            using the same first and last name that you provided to us when making a purchase on the
            Website.
          </p>
          <p>
            13.3 The legal relationship between you and us is governed by the laws of the UAE,
            except where your local law excludes other jurisdictions in consumer-related disputes.
          </p>
          <p>
            13.4 Any claim must be brought in an individual capacity by the initiating party and not
            as a plaintiff or member of a class in any class action or other similar proceeding or
            arbitration proceeding.
          </p>
          <p>
            13.5 Initial Dispute Resolution. We are always interested in resolving disputes
            amicably and efficiently. If you have a dispute with the Company, you agree that, before
            taking any formal action, you will contact us by email and provide a brief written
            description of the dispute and your contact information. Good faith negotiations shall
            be a condition precedent for either party.
          </p>
          <p>
            13.6 Class Action Waiver and Collective Relief. Except as provided in the terms defined
            in &quot;batch arbitration,&quot; there shall be no right or authority for any claims to
            be heard in arbitration or litigation on a class, joint, or consolidated basis or on
            grounds including claims brought in a purported representative capacity on behalf of the
            general public, other users of the Services, or any other persons.
          </p>
        </LegalSection>

        <LegalSection title="14. Miscellaneous">
          <p>
            14.1 If any provision of these Terms is found to be unlawful, void, or unenforceable,
            such provision shall nevertheless be enforceable to the maximum extent permitted by
            applicable law, and the unenforceable portion shall be deemed severed from these Terms
            of Service. You may review the most current version of the Terms of Service at any time
            on this page.
          </p>
          <p>
            14.2 No delay or omission on our part in exercising any of our rights arising from any
            failure by you to comply with or perform your obligations under these Terms shall impair
            any such right or be construed as a waiver thereof.
          </p>
          <p>
            14.3 Subject to Section 13, if any provision of these Terms is found to be invalid or
            unenforceable, these Terms shall remain in full force and effect and shall be modified
            to become valid and enforceable while reflecting the intentions of the parties to the
            maximum extent permitted by law.
          </p>
          <p>
            14.4 Unless otherwise expressly provided herein, these Terms constitute the entire
            agreement between you and the Company with respect to their subject matter and supersede
            all prior promises, agreements, or representations, whether written or oral, regarding
            such subject matter.
          </p>
          <p>
            14.5 The Company may transfer or assign any and all of its rights and obligations under
            these Terms to any other person in any manner, including by novation, and by accepting
            these Terms, you consent to any such assignment and transfer by the Company.
          </p>
          <p>
            14.6 All information transmitted through the Service shall be deemed an electronic
            communication. You agree that we may communicate with you electronically and that such
            communications are equivalent to communications in writing. You also acknowledge and
            agree that by clicking the &quot;SUBMIT,&quot; &quot;CONTINUE,&quot;
            &quot;REGISTER,&quot; &quot;I AGREE,&quot; or similar links or buttons, you are
            submitting a legally binding electronic signature and entering into a legally binding
            agreement.
          </p>
          <p>
            14.7 Under no circumstances shall the Company be liable for any failure to comply with
            these Terms to the extent such failure is caused by factors beyond the Company&apos;s
            reasonable control.
          </p>
        </LegalSection>

        <LegalSection title="15. Amendments">
          <p>
            15.1 We reserve the right to make changes to these Terms at any time and at our sole
            discretion. Please check these Terms from time to time to ensure awareness of any new
            amendments. On this website, we will post any announcements regarding any changes and
            additions that will be made to the provisions of these Terms. Amendments shall not be
            retroactive and shall apply from the date of publication.
          </p>
          <p>
            15.2 To the maximum extent permitted by applicable law, we may change the subscription
            fee at any time. We will notify you in advance of any such price changes. If you do not
            wish to pay the new fees, you may cancel the applicable subscription before the changes
            take effect.
          </p>
        </LegalSection>

        <LegalSection title="16. Contact Information and Profile Registration">
          <p>16.1 You may contact us using the details provided at the beginning of this Document.</p>
          <CompanyDetails />
          <p>
            16.2. To use certain features of the Service, you may be required to register your
            profile (&quot;Profile&quot;) and provide certain information about yourself as
            requested in the registration form.
          </p>
          <p>
            16.3. If you register a Profile, you represent and warrant to the Company that all
            required registration information you provide is truthful and accurate; you will
            maintain the accuracy of such information; and your use of the Service does not violate
            any applicable laws or regulations or these Terms.
          </p>
          <p>
            16.4. The Service is not intended for use by persons under the age of 18. By using the
            Services, you represent and warrant that you are at least 18 years old and have the
            right, authority, and legal capacity to enter into these Terms.
          </p>
          <p>
            16.5. The Company reserves the right to suspend or terminate your Profile or your access
            to the Service, with or without notice to you, in the event of your breach of these
            Terms.
          </p>
          <p>
            16.6. You are responsible for maintaining the confidentiality of your Profile login
            credentials and are fully responsible for all activities that occur under your Profile.
            You agree to immediately notify the Company of any unauthorized use or suspected
            unauthorized use of your Profile or any other breach of security.
          </p>
        </LegalSection>

        <LegalSection title="17. Governing Law and Venue">
          <p>17.1 These Terms shall be governed in accordance with the laws of the UAE.</p>
          <p>
            17.2 To the extent that any action relating to any dispute under this Agreement is, for
            any reason, not submitted to arbitration, each party submits to the exclusive
            jurisdiction of the courts of the UAE for the resolution of any disputes that may arise
            out of or in connection with this Agreement.
          </p>
          <p>
            17.3 The parties unconditionally submit to the personal jurisdiction and venue of the
            courts of the UAE and waive any objections based on improper venue or inconvenient
            forum.
          </p>
        </LegalSection>

        <LegalSection title="18. Additional Disclaimer of Warranties">
          <p>
            18.1 General Disclaimer of Warranties. Except to the extent prohibited by law or
            otherwise inapplicable, you expressly understand and agree that you use the Service at
            your own risk, and the Service and Products are provided on an &quot;as is&quot; and
            &quot;as available&quot; basis. The Company and its affiliates, officers, employees,
            agents, partners, and licensors expressly disclaim all warranties of any kind, whether
            express or implied, including implied warranties of merchantability, fitness for a
            particular purpose, and non-infringement.
          </p>
          <p>In particular, the released parties do not make and expressly disclaim any warranties that:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>The Service will meet your requirements</li>
            <li>The Service will be uninterrupted, timely, secure, or error-free</li>
            <li>
              the results that may be obtained from the use of the Service, including data, will be
              accurate and reliable
            </li>
            <li>
              the quality of any data or services available through the Service will meet your
              expectations
            </li>
            <li>any errors in the Service will be corrected</li>
          </ul>
          <p>
            18.2 No Service Advice. Any statement that may be posted on the Service is intended
            solely for informational and entertainment purposes and is not intended to replace or
            substitute for any professional financial, medical, legal, or other advice.
          </p>
          <p>
            18.3 Modification of Website Information and Services. We may modify all information
            provided on the Service at our sole discretion without prior notice. We may at any time
            modify or discontinue, temporarily or permanently, the Service (or any part thereof) at
            our sole discretion, with or without notice.
          </p>
        </LegalSection>

        <LegalSection title="19. Service">
          <p>
            19.1. You acknowledge that all text, images, marks, logos, compilations, data, other
            content, software, and materials displayed on the Service or used by the Company to
            operate the Service (excluding any User Content) are the property of us or third
            parties.
          </p>
          <p>
            19.2. The Company expressly reserves all rights, including all intellectual property
            rights, in the foregoing, and except as expressly permitted by these Terms, any use,
            redistribution, sale, decompilation, reverse engineering, disassembly, translation, or
            other use thereof is strictly prohibited.
          </p>
          <p>
            19.3. The information you provide to us upon registration, as well as any content,
            materials, or information that you upload, send, email, display, perform, distribute,
            publish, or otherwise transmit to us (&quot;User Content&quot;), remains your
            intellectual property.
          </p>
          <p>
            19.4. The Company does not claim any copyright in User Content. Notwithstanding the
            foregoing, you agree to grant the Company a license in accordance with Section 21 of
            these Terms.
          </p>
          <p>
            19.5. Subject to these Terms, the Company grants you a non-transferable, non-exclusive
            license (without the right to sublicense) to use the Service solely for personal,
            non-commercial purposes.
          </p>
          <p>
            19.6. You agree, represent, and warrant that your use of the Service or any part thereof
            will comply with the foregoing license, agreements, and restrictions and will not
            infringe or violate the rights of any other party.
          </p>
          <p>
            19.7. You are solely responsible for obtaining the equipment and telecommunications
            services necessary to access the Service, as well as all related charges.
          </p>
          <p>
            19.8. We reserve the right to make any changes to the Service (whether free or paid
            features) at any time, with or without notice. If such changes affect your use of the
            Service, you may delete your account or cancel your subscription at any time.
          </p>
          <p>
            19.9. You access and use the Service at your own risk. Except where prohibited by law,
            the Company shall not be liable for any damage to your computer system, loss of data, or
            other harm to you or any third party arising from your access to or use of the Service.
          </p>
          <p>
            19.10. The Company is not obligated to provide you with any customer support. However,
            the Company may, from time to time, provide you with customer support at its sole
            discretion.
          </p>
        </LegalSection>

        <LegalSection title="20. Curator Services">
          <p>
            20.1. As part of the Service, the Company may offer interactive curator services that
            connect you with curators and information that will help you achieve your goals
            (&quot;Curator Services&quot;).
          </p>
          <p>
            20.2. If you have access to a Subscription, you will be able to interact with curators.
          </p>
          <p>
            20.3. A curator will help you achieve your goals by providing motivational tools. The
            Company may, at its discretion, hire or replace any curator with another for
            Subscription users.
          </p>
          <p>
            20.4. Curator Services are not medical, mental health, or any other form of healthcare.
            Curator Services do not provide healthcare services and are not intended to replace
            professional medical advice, consultation, or treatment from qualified physicians. It is
            important to consult your physician before using the services of a coach/curator/educator.
            In the event of a medical emergency, immediately contact your physician or the
            appropriate emergency service.
          </p>
        </LegalSection>

        <LegalSection title="21. User Content">
          <p>
            21.1. Grant of License. You hereby grant the Company, its sublicensees, successors, and
            assigns a royalty-free, perpetual, sublicensable, assignable, non-exclusive right and
            license to use, license, reproduce, modify, adapt, publish, translate, transmit, edit,
            reformat, create derivative works from, distribute, derive revenue or other remuneration
            from, communicate to the public, reproduce, display, and otherwise use any User Content
            (in whole or in part) throughout the world and/or incorporate User Content into other
            works in any form, on any media, or using technologies now known or later developed.
          </p>
          <p>
            21.2. The license granted herein expressly excludes any personal data as defined under
            applicable privacy laws and regulations.
          </p>
          <p>
            21.3. You hereby represent and warrant that you own all right, title, and interest in
            and to the User Content or are otherwise authorized to grant the rights granted to the
            Company under this section. We are not responsible for retaining copies of any materials
            that we remove from our Services and shall not be liable for any losses you incur if
            Content that you post or transmit to our Services is removed.
          </p>
          <p>
            21.4. If you wish to withdraw the license granted for certain User Content, please
            contact us by email.
          </p>
          <p>
            Related:{' '}
            <Link to={ROUTES.privacy} className="text-sw-blue hover:underline">
              Privacy Policy
            </Link>{' '}
            ·{' '}
            <Link to={ROUTES.cookie} className="text-sw-blue hover:underline">
              Cookie Policy
            </Link>{' '}
            ·{' '}
            <Link to={ROUTES.refund} className="text-sw-blue hover:underline">
              Refund Policy
            </Link>{' '}
            ·{' '}
            <Link to={ROUTES.billing} className="text-sw-blue hover:underline">
              Billing &amp; Plans
            </Link>{' '}
            ·{' '}
            <Link to={ROUTES.contact} className="text-sw-blue hover:underline">
              Contact
            </Link>
          </p>
        </LegalSection>
      </LegalCard>
    </>
  )
}
