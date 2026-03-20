import { LegalPageLayout, LegalSection } from './LegalPageLayout'

const UPDATED = 'March 20, 2026'

export function TermsOfService() {
  return (
    <LegalPageLayout title="Terms of Service" updated={UPDATED}>
      <p className="text-[#9ca3af]">
        These Terms of Service (“Terms”) form a legally binding agreement between you (“you,” “your,”
        or “user”) and Red Domino Holdings and its affiliates (collectively, “Red Domino,” “we,” “us,”
        or “our”) governing your access to and use of the public website where these Terms are posted
        (the “Site”), including all content, functionality, services, and applications made available
        through the Site (collectively, the “Services”). By accessing or using the Site, clicking an
        “I agree” or similar button where presented, or continuing to use the Site after notice of
        changes, you agree to these Terms and our Privacy Policy (incorporated by reference). If you do
        not agree, you must not access or use the Site.
      </p>

      <LegalSection title="1. Definitions">
        <ul className="list-disc space-y-2 pl-5 text-[#d1d5db]">
          <li>
            <strong className="text-[#f3f4f6]">“Content”</strong> means text, graphics, images, music,
            software, audio, video, works of authorship, compilations, databases, interfaces,
            trademarks, logos, and other materials on or made available through the Site.
          </li>
          <li>
            <strong className="text-[#f3f4f6]">“User Content”</strong> means any information, materials,
            or content that you submit, post, upload, transmit, or otherwise make available through the
            Site, including communications to us.
          </li>
          <li>
            <strong className="text-[#f3f4f6]">“Marks”</strong> means Red Domino’s name, logos, product
            and service names, slogans, and other trademarks, service marks, and trade dress.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="2. Eligibility; capacity">
        <p>
          You represent and warrant that you are at least the age of majority in your jurisdiction (and
          in any event at least 18 years of age where required by law), that you have full legal
          capacity to enter into these Terms, and that you are not barred from using the Site under
          applicable law (including export control, sanctions, or anti-fraud laws). If you use the Site
          on behalf of an entity, you represent that you have authority to bind that entity, and
          “you” includes that entity.
        </p>
      </LegalSection>

      <LegalSection title="3. Description of the Site; changes">
        <p>
          The Site provides general information about Red Domino, our portfolio companies, divisions,
          technology (including references to applications such as “Precision Pilot”), and related
          initiatives. We may change, suspend, or discontinue any aspect of the Site at any time without
          liability, subject to applicable law. We do not guarantee that any particular Content will
          remain available or that the Site will be error-free or uninterrupted.
        </p>
        <p>
          Descriptions of businesses, capabilities, metrics, timelines, and strategies are for
          informational purposes only, may include aspirational goals, and may change without notice.
          The Site does not create any partnership, agency, joint venture, employment, or fiduciary
          relationship unless separately agreed in a signed writing.
        </p>
      </LegalSection>

      <LegalSection title="4. Accounts">
        <p>
          The Site may or may not require registration. If we offer accounts in the future, additional
          terms may apply. You are responsible for maintaining the confidentiality of credentials and
          for all activity under your account. You must notify us promptly of unauthorized use.
        </p>
      </LegalSection>

      <LegalSection title="5. Limited license">
        <p>
          Subject to these Terms, Red Domino grants you a limited, non-exclusive, non-transferable,
          non-sublicensable, revocable license to access and use the Site and Content solely for your
          personal, non-commercial use or internal business evaluation, and solely in accordance with
          these Terms. All rights not expressly granted are reserved.
        </p>
      </LegalSection>

      <LegalSection title="6. Restrictions on use">
        <p>In connection with the Site, you must not—and must not permit others to:</p>
        <ul className="list-disc space-y-2 pl-5 text-[#d1d5db]">
          <li>Violate any law, regulation, contractual obligation, or third-party right;</li>
          <li>
            Copy, reproduce, distribute, publicly display, publicly perform, transmit, broadcast, sell,
            resell, license, rent, lease, or exploit the Site or Content except as expressly permitted;
          </li>
          <li>
            Modify, adapt, translate, reverse engineer, decompile, disassemble, or attempt to derive
            source code from the Site or any software, except to the limited extent such restrictions
            are prohibited by applicable law;
          </li>
          <li>
            Remove, alter, or obscure proprietary notices (copyright, trademark, or otherwise) on the
            Site or Content;
          </li>
          <li>
            Use framing, mirroring, or similar techniques to enclose the Site or Content without our
            prior written consent;
          </li>
          <li>
            Use the Site to develop, train, or improve any machine learning or artificial intelligence
            model or system without our prior written consent (including scraping for that purpose);
          </li>
          <li>
            Use automated means (including bots, scrapers, crawlers, or harvesters) to access the Site
            in a manner that sends more request messages than a human could reasonably produce, bypasses
            robots.txt or rate limits, or impairs Site operation, without our prior written consent;
          </li>
          <li>
            Probe, scan, or test vulnerability of the Site or breach security or authentication
            measures;
          </li>
          <li>
            Interfere with or disrupt the Site, servers, networks, or users (including denial-of-service
            attacks, spam, or malware);
          </li>
          <li>
            Impersonate any person or entity, misrepresent affiliation, or use another user’s account;
          </li>
          <li>
            Collect or store personal information about other users without lawful basis and appropriate
            notice/consent;
          </li>
          <li>
            Use the Site in any manner that is defamatory, obscene, abusive, harassing, hateful, or
            discriminatory in violation of applicable law;
          </li>
          <li>
            Circumvent or attempt to circumvent access controls, paywalls, geographic restrictions, or
            technical limitations we impose.
          </li>
        </ul>
        <p>
          We may investigate violations and cooperate with law enforcement. We may suspend or terminate
          access, remove Content, or take technical and legal remedies, with or without notice, where we
          believe conduct violates these Terms or creates risk.
        </p>
      </LegalSection>

      <LegalSection title="7. User Content and communications">
        <p>
          If you submit User Content (including emails, forms, attachments, or feedback), you represent
          that you have all rights necessary to do so and that your submission does not violate law or
          third-party rights. You grant Red Domino and its successors a perpetual, irrevocable,
          worldwide, royalty-free, fully paid-up, sublicensable, transferable license to use, host,
          store, reproduce, modify, create derivative works from, communicate, publish, publicly perform,
          publicly display, distribute, and otherwise process User Content for any purpose related to
          operating, improving, and promoting our business, subject to our Privacy Policy.
        </p>
        <p>
          Unless we enter a separate written confidentiality agreement, any unsolicited ideas, proposals,
          or feedback you provide may be used by us without restriction or compensation to you. Do not
          send us confidential or proprietary information unless we expressly agree in writing.
        </p>
      </LegalSection>

      <LegalSection title="8. Monitoring and enforcement">
        <p>
          We may—but are not obligated to—monitor use of the Site, review User Content, or disclose
          information to satisfy law, regulation, legal process, governmental request, or to protect
          rights, safety, or property. Our failure to enforce a provision is not a waiver.
        </p>
      </LegalSection>

      <LegalSection title="9. Intellectual property rights">
        <p>
          The Site and Content are owned by Red Domino or our licensors and are protected by United
          States and international copyright, trademark, patent, trade secret, and other intellectual
          property laws. Except for the limited license in Section 5, nothing grants you any right,
          title, or interest in the Site or Content.
        </p>
        <p>
          <strong className="text-[#f3f4f6]">Trademarks.</strong> The Marks are trademarks of Red Domino
          or our affiliates. Third-party names and marks are the property of their respective owners.
          You may not use our Marks without our prior written permission.
        </p>
      </LegalSection>

      <LegalSection title="10. Copyright policy (DMCA)">
        <p>
          We respect intellectual property rights. If you believe Content on the Site infringes your
          copyright, you may send a notice under the Digital Millennium Copyright Act (“DMCA”) to our
          designated copyright agent with the information required by 17 U.S.C. § 512(c)(3), including:
          identification of the work, identification of the allegedly infringing material and its
          location on the Site, your contact information, a statement of good faith belief, a statement
          of accuracy under penalty of perjury, and your physical or electronic signature.
        </p>
        <p>
          <strong className="text-[#f3f4f6]">Designated agent.</strong> Publish the legal name, mailing
          address, email, and phone number of your DMCA agent on the Site or corporate disclosures page
          and replace this placeholder:{' '}
          <em className="text-[#9ca3af]">
            [Insert DMCA agent name, address, email, and phone as required by 17 U.S.C. § 512]
          </em>
          . Counter-notices may be submitted as permitted by law.
        </p>
      </LegalSection>

      <LegalSection title="11. Third-party content and links">
        <p>
          The Site may contain links to third-party websites, applications, or services (“Third-Party
          Services”). Third-Party Services are not under our control. We are not responsible for Third-Party
          Services’ content, accuracy, policies, or practices. Your use of Third-Party Services is at
          your own risk and subject to their terms and privacy policies.
        </p>
      </LegalSection>

      <LegalSection title="12. No professional advice">
        <p>
          Content on the Site is for general informational purposes only and does not constitute legal,
          tax, accounting, investment, insurance, medical, or other professional advice. You should
          consult qualified professionals before making decisions. Reliance on Site Content is solely at
          your own risk.
        </p>
      </LegalSection>

      <LegalSection title="13. Forward-looking statements">
        <p>
          The Site may include forward-looking statements within the meaning of U.S. securities laws and
          other jurisdictions. Such statements involve risks and uncertainties. Actual results may differ
          materially from those anticipated. We undertake no obligation to update forward-looking
          statements except as required by law.
        </p>
      </LegalSection>

      <LegalSection title="14. No offer of securities; no solicitation">
        <p>
          Nothing on the Site constitutes an offer to sell or a solicitation of an offer to buy any
          security or investment product in any jurisdiction. Any offering will be made only by
          definitive offering documents in compliance with applicable law.
        </p>
      </LegalSection>

      <LegalSection title="15. Export controls and sanctions">
        <p>
          The Site may be subject to U.S. export control laws and sanctions programs. You represent that
          you are not located in, ordinarily resident in, or organized under the laws of any country or
          region subject to comprehensive U.S. sanctions, and that you are not listed on any U.S.
          government restricted-party list. You may not access or use the Site in violation of export or
          sanctions laws.
        </p>
      </LegalSection>

      <LegalSection title="16. Disclaimer of warranties">
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE SITE, SERVICES, AND CONTENT ARE PROVIDED
          “AS IS” AND “AS AVAILABLE,” WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR
          STATUTORY, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
          TITLE, QUIET ENJOYMENT, ACCURACY, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SITE WILL
          MEET YOUR REQUIREMENTS, BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE, THAT DEFECTS WILL BE
          CORRECTED, OR THAT THE SITE OR SERVERS ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. SOME
          JURISDICTIONS DO NOT ALLOW CERTAIN DISCLAIMERS; IN THOSE JURISDICTIONS, DISCLAIMERS ARE LIMITED
          TO THE FULLEST EXTENT PERMITTED BY LAW.
        </p>
      </LegalSection>

      <LegalSection title="17. Limitation of liability">
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT WILL RED DOMINO OR ITS
          AFFILIATES, LICENSORS, SERVICE PROVIDERS, OR THEIR RESPECTIVE OFFICERS, DIRECTORS, EMPLOYEES,
          CONTRACTORS, AGENTS, SUCCESSORS, OR ASSIGNS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
          EXEMPLARY, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, REVENUE, DATA, USE,
          GOODWILL, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR RELATED TO YOUR ACCESS TO OR USE OF (OR
          INABILITY TO ACCESS OR USE) THE SITE OR CONTENT, WHETHER BASED ON WARRANTY, CONTRACT, TORT
          (INCLUDING NEGLIGENCE), STATUTE, OR ANY OTHER LEGAL THEORY, EVEN IF WE HAVE BEEN ADVISED OF THE
          POSSIBILITY OF SUCH DAMAGES.
        </p>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, OUR AGGREGATE LIABILITY FOR ALL CLAIMS
          ARISING OUT OF OR RELATED TO THE SITE OR THESE TERMS SHALL NOT EXCEED THE GREATER OF (A) ONE
          HUNDRED U.S. DOLLARS (US $100) OR (B) THE AMOUNTS YOU PAID US (IF ANY) FOR ACCESS TO THE SITE IN
          THE TWELVE (12) MONTHS BEFORE THE EVENT GIVING RISE TO LIABILITY.
        </p>
        <p>
          THE LIMITATIONS IN THIS SECTION APPLY WHETHER THE ALLEGED LIABILITY IS BASED IN CONTRACT,
          TORT, NEGLIGENCE, STRICT LIABILITY, OR ANY OTHER BASIS, EVEN IF A LIMITED REMEDY FAILS OF ITS
          ESSENTIAL PURPOSE. SOME JURISDICTIONS DO NOT ALLOW CERTAIN LIMITATIONS; IN THOSE
          JURISDICTIONS, OUR LIABILITY IS LIMITED TO THE MAXIMUM EXTENT PERMITTED BY LAW.
        </p>
      </LegalSection>

      <LegalSection title="18. Indemnification">
        <p>
          To the fullest extent permitted by law, you agree to defend, indemnify, and hold harmless Red
          Domino and its affiliates, licensors, service providers, and their respective officers,
          directors, employees, contractors, agents, successors, and assigns from and against any claims,
          liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable
          attorneys’ fees) arising out of or related to (a) your use of the Site; (b) your User Content;
          (c) your violation of these Terms; (d) your violation of third-party rights, including
          intellectual property or privacy rights; or (e) your violation of applicable law.
        </p>
      </LegalSection>

      <LegalSection title="19. Release (where permissible)">
        <p>
          To the maximum extent permitted by applicable law, you release Red Domino and its affiliates
          from claims, demands, and damages (actual and consequential) of every kind, known and
          unknown, arising out of or in any way connected with disputes between you and third parties in
          connection with the Site or Third-Party Services. If you are a California resident, you waive
          California Civil Code § 1542 (and any analogous law) to the extent applicable.
        </p>
      </LegalSection>

      <LegalSection title="20. Time limitation on claims">
        <p>
          ANY CAUSE OF ACTION OR CLAIM YOU MAY HAVE ARISING OUT OF OR RELATED TO THESE TERMS OR THE SITE
          MUST BE COMMENCED WITHIN ONE (1) YEAR AFTER THE CAUSE OF ACTION ACCRUES; OTHERWISE, SUCH CAUSE
          OF ACTION OR CLAIM IS PERMANENTLY BARRED TO THE EXTENT PERMITTED BY LAW.
        </p>
      </LegalSection>

      <LegalSection title="21. Dispute resolution and arbitration (U.S. users)">
        <p>
          <strong className="text-[#f3f4f6]">Informal resolution.</strong> Before filing a claim, you
          agree to contact us and attempt to resolve the dispute informally for at least thirty (30)
          days.
        </p>
        <p>
          <strong className="text-[#f3f4f6]">Binding arbitration.</strong> Except for claims that may be
          brought in small claims court on an individual basis or claims for injunctive or equitable
          relief relating to intellectual property or unauthorized access, any dispute arising out of or
          related to these Terms or the Site shall be resolved by binding arbitration administered by
          the American Arbitration Association (“AAA”) under its Consumer Arbitration Rules (or Commercial
          Rules if applicable), as modified by this Section. The arbitration will be conducted in
          English. The arbitrator’s decision may be entered in any court of competent jurisdiction.
        </p>
        <p>
          <strong className="text-[#f3f4f6]">Class action waiver.</strong> YOU AND RED DOMINO AGREE THAT
          EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY AND NOT AS A
          PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS, COLLECTIVE, CONSOLIDATED, OR REPRESENTATIVE
          PROCEEDING. Unless both you and Red Domino agree otherwise, the arbitrator may not consolidate
          more than one person’s claims and may not preside over any form of representative or class
          proceeding.
        </p>
        <p>
          <strong className="text-[#f3f4f6]">Opt-out.</strong> You may opt out of this arbitration
          agreement within thirty (30) days of first accepting these Terms by sending written notice to
          our contact address with your name and a clear statement that you opt out of arbitration.
        </p>
        <p className="text-[#9ca3af] text-sm">
          <em>
            Note: Arbitration and class waiver provisions are heavily regulated and may be unenforceable
            for certain consumers or in certain jurisdictions. Have counsel review and tailor this
            Section, including whether to remove arbitration for public marketing sites.
          </em>
        </p>
      </LegalSection>

      <LegalSection title="22. Governing law; exclusive venue">
        <p>
          These Terms and any dispute not subject to arbitration (or where arbitration is not enforced)
          are governed by the laws of the State of Delaware and the federal laws of the United States,
          without regard to conflict-of-law principles. Subject to Section 21, you consent to the
          exclusive jurisdiction and venue of the state and federal courts located in Delaware, and you
          waive any objection to jurisdiction and venue in those courts.
        </p>
      </LegalSection>

      <LegalSection title="23. Electronic communications">
        <p>
          You consent to receive communications from us electronically (for example, email or notices
          on the Site). You agree that electronic communications satisfy any legal requirement that
          communications be in writing.
        </p>
      </LegalSection>

      <LegalSection title="24. SMS and telephone (if applicable)">
        <p>
          If we offer SMS or telephone communications, additional terms and consent may apply (including
          carrier charges and opt-out instructions). Unless we implement such programs and disclose
          applicable terms, this Section does not create any SMS marketing relationship.
        </p>
      </LegalSection>

      <LegalSection title="25. Beta features">
        <p>
          We may label certain features as alpha, beta, preview, or experimental. Such features are
          provided “as is,” may be unstable, and may be withdrawn at any time.
        </p>
      </LegalSection>

      <LegalSection title="26. Changes to these Terms">
        <p>
          We may modify these Terms at any time. We will post the updated Terms on the Site and update
          the “Last updated” date. If changes are material, we may provide additional notice as required
          by law. Your continued use of the Site after the effective date constitutes acceptance of the
          revised Terms. If you do not agree, you must stop using the Site.
        </p>
      </LegalSection>

      <LegalSection title="27. Termination; survival">
        <p>
          We may suspend or terminate your access to the Site at any time, with or without cause or
          notice. Provisions that by their nature should survive termination—including intellectual
          property, disclaimers, limitations of liability, indemnity, dispute resolution, and governing
          law—will survive.
        </p>
      </LegalSection>

      <LegalSection title="28. General">
        <p>
          These Terms, together with the Privacy Policy and any supplemental terms we provide, constitute
          the entire agreement between you and Red Domino regarding the Site and supersede prior
          agreements on that subject. If any provision is invalid or unenforceable, the remaining
          provisions remain in full force. Our failure to enforce any right or provision is not a
          waiver. You may not assign or transfer these Terms without our consent; we may assign them
          without restriction. Section titles are for convenience only. The English language version
          controls if translated.
        </p>
      </LegalSection>

      <LegalSection title="29. Consumer notices">
        <p>
          California users: You may contact the Complaint Assistance Unit of the Division of Consumer
          Services of the California Department of Consumer Affairs in writing at 1625 North Market Blvd.,
          Suite N 112, Sacramento, CA 95834, or by telephone at (800) 952-5210, for certain consumer
          complaints, as applicable.
        </p>
      </LegalSection>

      <LegalSection title="30. Contact">
        <p>
          For questions about these Terms, please contact Red Domino Holdings using the contact
          information published on the Site or the mailing address published for Red Domino Holdings.
        </p>
      </LegalSection>

      <p className="border-t border-white/10 pt-8 text-xs text-[#6b7280]">
        These Terms are a general template for informational purposes only and do not constitute legal
        advice. Terms must be tailored to your business model, jurisdiction, regulatory requirements,
        and risk tolerance. You should have qualified counsel review these Terms—especially Sections 10
        (DMCA agent information), 21 (arbitration/class waiver), 22 (governing law/venue), and any
        industry-specific obligations—before publication.
      </p>
    </LegalPageLayout>
  )
}
