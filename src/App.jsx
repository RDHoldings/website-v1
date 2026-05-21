import { Routes, Route } from 'react-router-dom'
import { ScrollToTop } from './components/ScrollToTop'
import { SkipLink } from './components/SkipLink'
import { TrailingSlashRedirect } from './components/TrailingSlashRedirect'
import { AccessGateLayout } from './components/AccessGateLayout'
import { AccessGateProvider } from './contexts/AccessGateContext'
import { AdminAccessPage } from './pages/AdminAccessPage'
import { Home } from './pages/Home'
import { AccessRequestPage } from './pages/AccessRequestPage'
import { LivingBibleWebPage } from './pages/LivingBibleWebPage'
import { PrecisionPilotWebPage } from './pages/PrecisionPilotWebPage'
import { PrivacyPolicy } from './pages/PrivacyPolicy'
import { TermsOfService } from './pages/TermsOfService'
import { DmcaPolicy } from './pages/DmcaPolicy'

function App() {
  return (
    <AccessGateProvider>
      <SkipLink />
      <ScrollToTop />
      <TrailingSlashRedirect />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/precision-pilot"
          element={
            <AccessGateLayout>
              <PrecisionPilotWebPage variant="production" />
            </AccessGateLayout>
          }
        />
        <Route
          path="/precision-pilot-test"
          element={
            <AccessGateLayout>
              <PrecisionPilotWebPage variant="test" />
            </AccessGateLayout>
          }
        />
        <Route
          path="/living-bible"
          element={
            <AccessGateLayout>
              <LivingBibleWebPage variant="production" />
            </AccessGateLayout>
          }
        />
        <Route
          path="/living-bible-test"
          element={
            <AccessGateLayout>
              <LivingBibleWebPage variant="test" />
            </AccessGateLayout>
          }
        />
        <Route path="/access" element={<AccessRequestPage />} />
        <Route path="/access-request" element={<AccessRequestPage />} />
        <Route path="/admin/access" element={<AdminAccessPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/dmca" element={<DmcaPolicy />} />
        <Route path="/legal" element={<DmcaPolicy />} />
      </Routes>
    </AccessGateProvider>
  )
}

export default App
