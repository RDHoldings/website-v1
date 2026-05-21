import { Seo } from '../components/Seo'
import { SEO_COPY } from '../config/site'
import { AccessGateLayout } from '../components/AccessGateLayout'

export function AccessRequestPage() {
  return (
    <>
      <Seo title={SEO_COPY.accessRequest.title} description={SEO_COPY.accessRequest.description} noIndex />
      <AccessGateLayout>
        <main id="site-main" className="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-6 py-10 text-[#e5e7eb]">
          <div className="w-full max-w-2xl rounded-xl border border-white/10 bg-[#111111]/80 p-6">
            <h1 className="text-2xl font-bold text-[#f3f4f6]">Invite-only access</h1>
            <p className="mt-3 text-sm text-[#9ca3af]">
              Open one of the protected routes (<code>/precision-pilot</code>, <code>/precision-pilot-test</code>,{' '}
              <code>/living-bible</code>, or <code>/living-bible-test</code>) to authenticate using an existing invite
              (Google or magic-link).
            </p>
          </div>
        </main>
      </AccessGateLayout>
    </>
  )
}
