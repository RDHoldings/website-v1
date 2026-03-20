import { LegalPageLayout, LegalSection } from './LegalPageLayout'

const UPDATED = 'March 20, 2026'

export function PrivacyPolicy() {
  return (
    <LegalPageLayout title="Privacy Policy" updated={UPDATED}>
      <p className="text-[#9ca3af]">
        Red Domino Holdings and its affiliates (collectively, “Red Domino,” “we,” “us,” or “our”) are
        committed to protecting privacy. This Privacy Policy (“Policy”) explains how we collect, use,
        disclose, retain, secure, and otherwise process information—including personal information—in
        connection with our public website located at the domain(s) where this Policy is posted (the
        “Site”). This Policy is designed to meet common expectations of regulators, business partners,
        and visitors, including where applicable the California Consumer Privacy Act as amended by the
        California Privacy Rights Act (“CCPA/CPRA”), the Virginia Consumer Data Protection Act
        (“VCDPA”), the Colorado Privacy Act (“CPA”), the Connecticut Data Privacy Act (“CTDPA”), the
        Utah Consumer Privacy Act (“UCPA”), the Texas Data Privacy and Security Act (“TDPSA”), the
        Oregon Consumer Privacy Act (“OCPA”), the Montana Consumer Data Privacy Act (“MCDPA”), the
        Delaware Personal Data Privacy Act (“DPDPA”), the EU and UK General Data Protection Regulation
        (“GDPR”), the UK Data Protection Act 2018, and the Swiss Federal Act on Data Protection (“FADP”).
        This Policy does not govern information collected in other contexts (for example, separate
        enterprise agreements, mobile applications, employee or applicant programs, or investor
        relations portals), which are governed by their own terms and notices.
      </p>

      <LegalSection title="1. Scope of this Policy">
        <p>
          This Policy applies to personal information we process when you interact with the Site,
          including when you browse, use features, submit forms, communicate with us, or otherwise
          engage with us online in connection with the Site. It also applies to offline collection that
          we associate with the Site (for example, if you email us referencing a page on the Site).
        </p>
        <p>
          <strong className="text-[#f3f4f6]">Not covered by this Policy.</strong> This Policy does not
          apply to: (a) information processed solely in an employment, contractor, or human resources
          context; (b) information processed pursuant to written agreements with our business customers
          where we act as a service provider or processor; (c) de-identified or aggregated information
          that cannot reasonably be linked to an individual; or (d) information processed by third-party
          sites or services that we do not control, even if linked from the Site.
        </p>
        <p>
          By accessing or using the Site, you acknowledge that you have read this Policy. If you do
          not agree, please discontinue use of the Site.
        </p>
      </LegalSection>

      <LegalSection title="2. Definitions">
        <p>For purposes of this Policy, the following definitions apply:</p>
        <ul className="list-disc space-y-2 pl-5 text-[#d1d5db]">
          <li>
            <strong className="text-[#f3f4f6]">“Personal information”</strong> means information that
            identifies, relates to, describes, is reasonably capable of being associated with, or could
            reasonably be linked—directly or indirectly—with a particular individual or household. It
            includes “personal data” as defined under GDPR and analogous terms under other laws.
          </li>
          <li>
            <strong className="text-[#f3f4f6]">“Sensitive personal information”</strong> means categories
            designated as sensitive under applicable law, such as government identifiers, precise
            geolocation, racial or ethnic origin, religious beliefs, union membership, genetic data,
            biometric information, health information, sex life or sexual orientation, and certain
            account credentials, as defined by the relevant statute.
          </li>
          <li>
            <strong className="text-[#f3f4f6]">“Processing”</strong> means any operation performed on
            personal information, including collection, recording, organization, structuring, storage,
            adaptation, retrieval, consultation, use, disclosure, dissemination, alignment, combination,
            restriction, erasure, or destruction.
          </li>
          <li>
            <strong className="text-[#f3f4f6]">“Service providers,” “processors,” “contractors,”</strong>{' '}
            and <strong className="text-[#f3f4f6]">“third parties”</strong> are used consistent with
            applicable U.S. state privacy laws and GDPR, as the context requires.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Categories of personal information we collect">
        <p>
          Depending on how you interact with the Site, we may collect the categories below. Not all
          categories will apply to every visitor.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-[#d1d5db]">
          <li>
            <strong className="text-[#f3f4f6]">Identifiers</strong> such as name, alias, postal address,
            unique personal identifier, online identifier, Internet Protocol address, email address,
            account name, or similar identifiers.
          </li>
          <li>
            <strong className="text-[#f3f4f6]">Customer records</strong> (Cal. Civ. Code § 1798.80(e))
            such as telephone number, physical address, employment information, or financial
            information, if you choose to provide it.
          </li>
          <li>
            <strong className="text-[#f3f4f6]">Commercial information</strong> such as records of
            services considered, obtained, or considered, or other purchasing or consuming histories or
            tendencies, if you engage with us in that manner.
          </li>
          <li>
            <strong className="text-[#f3f4f6]">Internet or other electronic network activity</strong>{' '}
            including browsing history, search history, and information regarding your interaction with
            the Site, advertisements, or social media features.
          </li>
          <li>
            <strong className="text-[#f3f4f6]">Geolocation data</strong> such as general location
            derived from IP address or device settings; we do not intend to collect precise geolocation
            through the Site unless we specifically disclose otherwise at collection.
          </li>
          <li>
            <strong className="text-[#f3f4f6]">Professional or employment-related information</strong>{' '}
            such as employer name, title, industry, or business contact details, if you provide them.
          </li>
          <li>
            <strong className="text-[#f3f4f6]">Inferences</strong> drawn from any of the information
            identified above to create a profile reflecting preferences, characteristics, behavior, or
            aptitudes.
          </li>
          <li>
            <strong className="text-[#f3f4f6]">Sensitive personal information</strong> only if you
            voluntarily provide it and we have a lawful basis to process it, or as otherwise permitted
            by law. Unless we expressly request it, please do not submit health data, government ID
            numbers, or other sensitive information through the Site.
          </li>
          <li>
            <strong className="text-[#f3f4f6]">Audio, electronic, visual, or similar information</strong>{' '}
            if you upload files, participate in video calls we schedule, or otherwise provide media.
          </li>
          <li>
            <strong className="text-[#f3f4f6]">Communications content</strong> including the content of
            emails, contact forms, chat transcripts, or other messages you send us.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Sources of personal information">
        <p>We collect personal information from the following categories of sources:</p>
        <ul className="list-disc space-y-2 pl-5 text-[#d1d5db]">
          <li>
            <strong className="text-[#f3f4f6]">You</strong> when you submit forms, subscribe to updates,
            correspond with us, respond to surveys, or otherwise provide information.
          </li>
          <li>
            <strong className="text-[#f3f4f6]">Automatic technologies</strong> on the Site, such as
            cookies, pixels, SDKs, server logs, and similar tools.
          </li>
          <li>
            <strong className="text-[#f3f4f6]">Service providers and analytics partners</strong> that
            assist in hosting, performance monitoring, security, fraud prevention, or analytics.
          </li>
          <li>
            <strong className="text-[#f3f4f6]">Social networks and advertising platforms</strong> when
            you interact with our branded content or ads on those platforms, subject to their policies.
          </li>
          <li>
            <strong className="text-[#f3f4f6]">Public sources</strong> such as corporate filings,
            professional directories, or information you publish publicly, where permitted by law.
          </li>
          <li>
            <strong className="text-[#f3f4f6]">Affiliates</strong> within our corporate family for
            internal administration, security, and consistency of communications.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="5. Purposes for which we use personal information">
        <p>We use personal information for the following business and commercial purposes:</p>
        <ul className="list-disc space-y-2 pl-5 text-[#d1d5db]">
          <li>
            <strong className="text-[#f3f4f6]">Provide and maintain the Site</strong>, including
            debugging, troubleshooting, performance optimization, and personalization of content layout
            where applicable.
          </li>
          <li>
            <strong className="text-[#f3f4f6]">Communicate with you</strong> regarding inquiries,
            requests, events, or relationship management.
          </li>
          <li>
            <strong className="text-[#f3f4f6]">Security and fraud prevention</strong>, including
            detecting, investigating, and preventing malicious activity, spam, abuse, and unauthorized
            access.
          </li>
          <li>
            <strong className="text-[#f3f4f6]">Analytics and product improvement</strong> to understand
            how visitors use the Site and to develop new features, offerings, and materials.
          </li>
          <li>
            <strong className="text-[#f3f4f6]">Marketing and advertising</strong> where permitted,
            including measuring effectiveness of campaigns, retargeting, and creating lookalike or
            custom audiences on ad platforms, subject to your choices and applicable law.
          </li>
          <li>
            <strong className="text-[#f3f4f6]">Compliance and legal process</strong> including
            responding to lawful requests from public authorities, enforcing our Terms of Service,
            protecting rights, privacy, safety, or property, and pursuing available remedies.
          </li>
          <li>
            <strong className="text-[#f3f4f6]">Corporate transactions</strong> such as mergers,
            acquisitions, financings, reorganizations, or asset sales, including diligence and transition
            planning.
          </li>
          <li>
            <strong className="text-[#f3f4f6]">De-identification and aggregation</strong> to create
            statistical or research datasets that do not identify individuals.
          </li>
          <li>
            <strong className="text-[#f3f4f6]">Any other purpose</strong> disclosed at the time of
            collection or with your consent.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="6. Legal bases for processing (EEA, UK, and Switzerland)">
        <p>
          Where GDPR, the UK GDPR, or the FADP applies, we rely on one or more of the following legal
          bases:
        </p>
        <ul className="list-disc space-y-2 pl-5 text-[#d1d5db]">
          <li>
            <strong className="text-[#f3f4f6]">Consent</strong>, where we have obtained your voluntary,
            informed, and specific agreement (for example, non-essential cookies or marketing emails
            where required).
          </li>
          <li>
            <strong className="text-[#f3f4f6]">Contract</strong>, where processing is necessary to take
            steps at your request prior to entering a contract or to perform a contract with you.
          </li>
          <li>
            <strong className="text-[#f3f4f6]">Legitimate interests</strong> that are not overridden by
            your rights and interests, such as securing the Site, understanding usage patterns,
            improving services, and corporate governance, where permitted.
          </li>
          <li>
            <strong className="text-[#f3f4f6]">Legal obligation</strong> where we must process data to
            comply with applicable law.
          </li>
          <li>
            <strong className="text-[#f3f4f6]">Vital interests</strong> in rare cases involving
            protection of life or physical safety.
          </li>
        </ul>
        <p>
          You may withdraw consent where processing is based on consent, without affecting the
          lawfulness of processing before withdrawal. Where we rely on legitimate interests, you may
          object as described in Section 21.
        </p>
      </LegalSection>

      <LegalSection title="7. Cookies, pixels, and similar technologies">
        <p>
          We and our partners use cookies (small text files stored on your device), pixels (transparent
          graphics used with cookies), local storage, session storage, scripts, software development
          kits, and similar technologies (“Cookies”) for purposes that may include:
        </p>
        <ul className="list-disc space-y-2 pl-5 text-[#d1d5db]">
          <li>
            <strong className="text-[#f3f4f6]">Strictly necessary</strong> operation of the Site
            (security, load balancing, cookie consent storage).
          </li>
          <li>
            <strong className="text-[#f3f4f6]">Functional</strong> preferences such as language or
            display settings.
          </li>
          <li>
            <strong className="text-[#f3f4f6]">Analytics</strong> to measure traffic, funnels, and
            engagement.
          </li>
          <li>
            <strong className="text-[#f3f4f6]">Advertising or social</strong> to deliver, measure, or
            personalize ads and to enable social sharing features.
          </li>
        </ul>
        <p>
          Cookies may be first-party (set by us) or third-party (set by another domain). Session Cookies
          expire when you close your browser; persistent Cookies remain until they expire or you delete
          them. You can control Cookies through browser settings, industry opt-out tools (where
          available), and any cookie banner or preference center we provide. Disabling Cookies may impair
          Site functionality.
        </p>
        <p>
          <strong className="text-[#f3f4f6]">Do Not Track.</strong> There is no uniform industry
          standard for how to respond to “Do Not Track” signals. Unless otherwise required by law, we
          do not currently respond to such signals.
        </p>
      </LegalSection>

      <LegalSection title="8. Analytics, advertising, and social features">
        <p>
          We may use analytics providers (for example, to measure page views, referrers, devices, and
          events) and advertising partners (for example, to serve or measure ads, build audiences, or
          attribute conversions). These providers may set Cookies, collect device and usage data, and
          combine information they collect on the Site with information from other sites or services.
        </p>
        <p>
          Social plugins or embedded media (for example, social share buttons, embedded video, or
          maps) may cause your browser to send information to the platform operator even if you do not
          click the plugin. Those interactions are governed by the platform’s privacy policy.
        </p>
        <p>
          Where required, we will obtain consent before using non-essential Cookies or similar
          technologies, and we will honor applicable opt-out rights for sale, sharing, or targeted
          advertising as described below.
        </p>
      </LegalSection>

      <LegalSection title="9. How we disclose personal information">
        <p>We may disclose personal information to the following categories of recipients:</p>
        <ul className="list-disc space-y-2 pl-5 text-[#d1d5db]">
          <li>
            <strong className="text-[#f3f4f6]">Affiliates</strong> within our corporate group for
            purposes consistent with this Policy.
          </li>
          <li>
            <strong className="text-[#f3f4f6]">Service providers and processors</strong> who host the
            Site, provide IT infrastructure, analytics, communications, customer relationship tools,
            security, professional services, and similar functions, subject to contractual
            confidentiality and security obligations.
          </li>
          <li>
            <strong className="text-[#f3f4f6]">Professional advisors</strong> including lawyers,
            auditors, insurers, and consultants under confidentiality obligations.
          </li>
          <li>
            <strong className="text-[#f3f4f6]">Authorities and others</strong> when required by law,
            regulation, legal process, or governmental request, or when we believe disclosure is
            necessary to protect rights, safety, or property.
          </li>
          <li>
            <strong className="text-[#f3f4f6]">Corporate transactions</strong> involving a prospective
            or actual buyer, investor, assignee, or successor in a merger, acquisition, financing,
            reorganization, bankruptcy, or sale of assets, subject to standard confidentiality
            protections.
          </li>
          <li>
            <strong className="text-[#f3f4f6]">With your direction or consent</strong>, including when
            you ask us to share information with a third party.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="10. Sale, sharing, and targeted advertising">
        <p>
          Certain U.S. state laws treat disclosures of personal information for cross-context
          behavioral advertising or to advertising technology partners as “sharing” or a “sale”
          (even if no money is exchanged). We will describe any such activities in our just-in-time
          notices, cookie disclosures, and state-specific sections below. Where required, we will
          provide a clear method to opt out of sale/sharing or targeted advertising, including a
          “Do Not Sell or Share My Personal Information” link if applicable.
        </p>
        <p>
          We do not knowingly sell or share the personal information of consumers under 16 years of age
          without affirmative authorization as required by law.
        </p>
      </LegalSection>

      <LegalSection title="11. Retention">
        <p>
          We retain personal information for as long as reasonably necessary to fulfill the purposes
          described in this Policy, including satisfying legal, accounting, tax, or reporting
          requirements, resolving disputes, and enforcing agreements. Criteria used to determine
          retention periods include the nature and sensitivity of the data, potential risk of harm from
          unauthorized use or disclosure, the purposes for which we process the data and whether those
          purposes can be achieved through other means, and applicable legal requirements.
        </p>
        <p>
          When retention is no longer necessary, we will delete, anonymize, or securely isolate the
          information in accordance with our internal policies and applicable law.
        </p>
      </LegalSection>

      <LegalSection title="12. Security">
        <p>
          We implement administrative, technical, and organizational safeguards designed to protect
          personal information against accidental or unlawful destruction, loss, alteration,
          unauthorized disclosure, or access. Measures may include access controls, encryption in transit
          where appropriate, vulnerability management, logging and monitoring, secure development
          practices, vendor assessments, and workforce training.
        </p>
        <p>
          No method of transmission over the Internet or electronic storage is completely secure. We
          cannot guarantee absolute security. If we become aware of a breach affecting your personal
          information where notification is required by law, we will provide notice in accordance with
          applicable requirements.
        </p>
      </LegalSection>

      <LegalSection title="13. Data minimization and integrity">
        <p>
          We endeavor to collect personal information that is relevant, adequate, and not excessive for
          the purposes stated, and to keep it accurate and up to date where appropriate. You may help us
          by informing us of changes to your contact details.
        </p>
      </LegalSection>

      <LegalSection title="14. Automated decision-making and profiling">
        <p>
          We do not use the Site to make solely automated decisions that produce legal or similarly
          significant effects about you, unless we disclose otherwise at the time and provide any
          rights required by law.           We may use analytics and segmentation that could be considered
          “profiling” for marketing or Site improvement; you may have rights to object or opt out as
          described in Sections 16, 18, 19, and 21.
        </p>
      </LegalSection>

      <LegalSection title="15. International transfers">
        <p>
          Red Domino is based in the United States. If you access the Site from outside the United
          States, you understand that your personal information may be transferred to, stored in, and
          processed in the United States and other countries where we or our service providers operate,
          which may have data protection laws different from those in your country.
        </p>
        <p>
          Where GDPR, UK GDPR, or FADP applies and transfers originate in those jurisdictions, we will
          implement appropriate safeguards such as Standard Contractual Clauses approved by the European
          Commission or UK government, supplementary measures where required, or other lawful transfer
          mechanisms. You may request a copy of relevant safeguards by contacting us.
        </p>
      </LegalSection>

      <LegalSection title="16. Your privacy rights (general)">
        <p>
          Depending on your location and subject to applicable exceptions, you may have the right to:
        </p>
        <ul className="list-disc space-y-2 pl-5 text-[#d1d5db]">
          <li>Access or know the categories and specific pieces of personal information we hold;</li>
          <li>Correct inaccurate personal information;</li>
          <li>Delete personal information;</li>
          <li>Obtain a portable copy of personal information you provided (where technically feasible);</li>
          <li>Opt out of sale, sharing, or targeted advertising (where applicable);</li>
          <li>Limit use or disclosure of sensitive personal information (where applicable);</li>
          <li>Object to or restrict certain processing (where applicable);</li>
          <li>Withdraw consent (where processing is consent-based); and</li>
          <li>Not receive discriminatory treatment for exercising privacy rights (where prohibited).</li>
        </ul>
        <p>
          To submit a request, use the contact methods in Section 24. We will verify your identity
          before fulfilling requests and may deny or limit requests as permitted by law (for example,
          where retention is legally required or a request is manifestly unfounded or excessive).
        </p>
      </LegalSection>

      <LegalSection title="17. Authorized agents">
        <p>
          Where permitted by law, you may designate an authorized agent to submit requests on your
          behalf. We may require proof of the agent’s authority (for example, a signed permission or
          power of attorney) and may still require you to verify your identity directly with us for
          certain requests.
        </p>
      </LegalSection>

      <LegalSection title="18. California residents (CPRA)">
        <p>
          If you are a California resident, this section supplements the Policy. California law may
          require us to disclose additional details in a “notice at collection.”
        </p>
        <p>
          <strong className="text-[#f3f4f6]">Categories collected, purposes, and retention.</strong> The
          categories of personal information we collect are described in Section 3. The purposes are
          described in Sections 5 and 8. Retention criteria are described in Section 11.
        </p>
        <p>
          <strong className="text-[#f3f4f6]">Sensitive personal information.</strong> We collect
          sensitive personal information only as disclosed at collection and only for permitted purposes.
          You may have the right to limit certain uses of sensitive personal information as provided by
          law.
        </p>
        <p>
          <strong className="text-[#f3f4f6]">Your CPRA rights.</strong> You may have the right to request
          access, correction, deletion, and information about our disclosure practices, and to opt out
          of sale/sharing of personal information and certain profiling for decisions with legal or
          similar effects, subject to exceptions. We will not discriminate against you for exercising
          CPRA rights.
        </p>
        <p>
          <strong className="text-[#f3f4f6]">Financial incentives.</strong> We do not currently offer
          financial incentives in exchange for personal information through the Site. If that changes,
          we will provide a separate notice that complies with CPRA.
        </p>
        <p>
          <strong className="text-[#f3f4f6]">Shine the Light.</strong> California Civil Code § 1798.83
          permits California residents to request certain information regarding disclosure of personal
          information to third parties for their direct marketing purposes. We do not disclose personal
          information to third parties for their direct marketing purposes as described in that statute
          without appropriate consent and disclosures; you may contact us for more information.
        </p>
      </LegalSection>

      <LegalSection title="19. Other U.S. state privacy rights">
        <p>
          Residents of states with comprehensive privacy laws (including, as enacted and amended,
          Virginia, Colorado, Connecticut, Utah, Texas, Oregon, Montana, Delaware, Nebraska, New
          Hampshire, New Jersey, Minnesota, Tennessee, Indiana, Iowa, Maryland, Kentucky, and others as
          laws become effective) may have rights substantially similar to those described in Section
          16, including rights to confirm processing, access, delete, correct, obtain a portable copy,
          and opt out of targeted advertising, sale, or certain profiling, subject to exceptions.
        </p>
        <p>
          <strong className="text-[#f3f4f6]">Appeals.</strong> If we deny a request where an appeal
          process is required, we will provide instructions to appeal our decision within the timeframe
          and manner required by your state’s law.
        </p>
        <p>
          <strong className="text-[#f3f4f6]">Sensitive data.</strong> Where a state law requires consent
          or opt-in for processing sensitive data, we will obtain such consent or provide opt-out
          mechanisms as required.
        </p>
      </LegalSection>

      <LegalSection title="20. Nevada residents">
        <p>
          Nevada law (NRS 603A) permits Nevada consumers to direct certain operators of websites not
          to sell certain personal information we have collected or will collect. We do not sell covered
          information as defined by Nevada law in the manner described in that statute; however, you
          may submit a sale opt-out request through our contact information below and we will honor
          applicable rights.
        </p>
      </LegalSection>

      <LegalSection title="21. EEA, UK, and Switzerland">
        <p>
          If you are located in the EEA, UK, or Switzerland, you have the rights described under
          applicable data protection law, including to access, rectify, erase, restrict processing,
          data portability, object to processing based on legitimate interests or for direct marketing,
          and withdraw consent. You may lodge a complaint with a supervisory authority in your country of
          residence, place of work, or place of an alleged infringement. A list of EU supervisory
          authorities is available from the European Data Protection Board. In the UK, the supervisory
          authority is the Information Commissioner’s Office (ICO).
        </p>
        <p>
          <strong className="text-[#f3f4f6]">Controller.</strong> The data controller responsible for
          personal information collected through the Site is Red Domino Holdings, unless we identify a
          different controller in a supplemental notice.
        </p>
        <p>
          <strong className="text-[#f3f4f6]">Representatives.</strong> Where GDPR requires an EU or UK
          representative, we will publish their contact details in this Policy or a linked addendum.
        </p>
      </LegalSection>

      <LegalSection title="22. Children’s privacy">
        <p>
          The Site is not directed to children under 16 (or the age required by applicable law), and we
          do not knowingly collect personal information from children in violation of the Children’s
          Online Privacy Protection Act (“COPPA”) or analogous laws. If you believe we have collected
          information from a child, please contact us promptly with sufficient detail to locate the
          information. If we learn we have collected personal information from a child without required
          parental consent, we will delete it in accordance with applicable law.
        </p>
      </LegalSection>

      <LegalSection title="23. Biometric information">
        <p>
          We do not use the Site to collect biometric identifiers or biometric information as defined
          under applicable U.S. state laws unless we provide a separate, conspicuous notice and obtain
          any required consent.
        </p>
      </LegalSection>

      <LegalSection title="24. Changes to this Policy">
        <p>
          We may update this Policy to reflect changes in our practices, technologies, legal
          requirements, or other factors. We will post the revised Policy on the Site and update the
          “Last updated” date. If changes are material, we will provide additional notice as required by
          law (for example, a banner, email, or consent prompt where appropriate).
        </p>
      </LegalSection>

      <LegalSection title="25. Accessibility">
        <p>
          We seek to present this Policy in a readable format. If you need this Policy in an alternative
          format, please contact us and we will make reasonable efforts to accommodate your request
          where practicable.
        </p>
      </LegalSection>

      <LegalSection title="26. Contact us">
        <p>
          For questions, complaints, or requests regarding this Policy or our privacy practices—including
          to exercise privacy rights—please contact Red Domino Holdings using the contact methods
          published on the Site (including any dedicated privacy inbox) or the mailing address
          published for Red Domino Holdings. Please include sufficient detail for us to evaluate and
          respond to your request, including your name, contact information, the nature of your request,
          and your jurisdiction if relevant.
        </p>
        <p>
          We will respond within the timeframe required by applicable law. If we need additional
          information to verify or process your request, we will notify you.
        </p>
      </LegalSection>

      <p className="border-t border-white/10 pt-8 text-xs text-[#6b7280]">
        This Privacy Policy is a general template for informational purposes only and does not
        constitute legal advice. Privacy laws change frequently and vary by jurisdiction. You should
        consult qualified legal counsel to ensure this Policy meets your organization’s specific
        obligations, including completing any required regulatory filings, cookie consent mechanisms,
        data processing agreements, transfer mechanisms, and industry-specific rules.
      </p>
    </LegalPageLayout>
  )
}
