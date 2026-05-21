import { Seo } from '../components/Seo'
import { SEO_COPY } from '../config/site'
import { LegalPageLayout, LegalSection } from './LegalPageLayout'

const UPDATED = 'May 20, 2026'

export function DmcaPolicy() {
  return (
    <>
      <Seo
        title="DMCA & Copyright Policy | Red Domino Holdings"
        description="Copyright and DMCA notice procedures for Red Domino Holdings public properties."
      />
      <LegalPageLayout title="DMCA & Copyright Policy" updated={UPDATED}>
        <p className="rounded-md border border-amber-700/40 bg-amber-950/30 px-3 py-2 text-sm text-amber-200">
          <strong className="text-amber-100">Draft template.</strong> This page is provided for operational
          completeness only and has not been reviewed by legal counsel. Do not rely on it as legal advice.
        </p>

        <p className="mt-4 text-[#9ca3af]">
          Red Domino Holdings (“Red Domino,” “we,” “us”) respects intellectual property rights. If you believe
          content on our Site infringes your copyright, you may submit a notice under the Digital Millennium
          Copyright Act (DMCA), 17 U.S.C. § 512.
        </p>

        <LegalSection title="Designated agent">
          <p className="text-[#d1d5db]">
            Send DMCA notices to our designated copyright agent (update before production reliance):
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-[#d1d5db]">
            <li>Email: legal@reddominoholdings.com (placeholder — confirm with counsel)</li>
            <li>Subject line: “DMCA Notice — [your domain or URL]”</li>
          </ul>
        </LegalSection>

        <LegalSection title="Required notice elements">
          <p className="text-[#d1d5db]">Your written notice should include, to the extent applicable:</p>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-[#d1d5db]">
            <li>Identification of the copyrighted work you claim has been infringed.</li>
            <li>
              Identification of the material claimed to be infringing and information reasonably sufficient to
              permit us to locate it (URL(s) on our Site).
            </li>
            <li>Your contact information (name, address, telephone, and email).</li>
            <li>
              A statement that you have a good-faith belief that use of the material is not authorized by the
              copyright owner, its agent, or the law.
            </li>
            <li>
              A statement, under penalty of perjury, that the information in the notice is accurate and that you
              are authorized to act on behalf of the copyright owner.
            </li>
            <li>Your physical or electronic signature.</li>
          </ul>
        </LegalSection>

        <LegalSection title="Counter-notification">
          <p className="text-[#d1d5db]">
            If you believe material was removed or disabled by mistake or misidentification, you may submit a
            counter-notification that meets the requirements of 17 U.S.C. § 512(g). We may restore material after
            the statutory waiting period unless the original complainant files suit.
          </p>
        </LegalSection>

        <LegalSection title="Repeat infringers">
          <p className="text-[#d1d5db]">
            We may terminate accounts or access for users who are repeat infringers, consistent with our Terms of
            Service and applicable law.
          </p>
        </LegalSection>

        <p className="mt-6 text-sm text-[#6b7280]">
          Related: <a href="/terms" className="text-[#c49a3a] hover:text-[#f2d675]">Terms of Service</a>,{' '}
          <a href="/privacy" className="text-[#c49a3a] hover:text-[#f2d675]">Privacy Policy</a>.
        </p>
      </LegalPageLayout>
    </>
  )
}
