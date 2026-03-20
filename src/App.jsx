import { Routes, Route } from 'react-router-dom'
import { ScrollToTop } from './components/ScrollToTop'
import { SkipLink } from './components/SkipLink'
import { TrailingSlashRedirect } from './components/TrailingSlashRedirect'
import { Home } from './pages/Home'
import { PrecisionPilotWebPage } from './pages/PrecisionPilotWebPage'
import { PrivacyPolicy } from './pages/PrivacyPolicy'
import { TermsOfService } from './pages/TermsOfService'

function App() {
  return (
    <>
      <SkipLink />
      <ScrollToTop />
      <TrailingSlashRedirect />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/precision-pilot"
          element={<PrecisionPilotWebPage variant="production" />}
        />
        <Route
          path="/precision-pilot-test"
          element={<PrecisionPilotWebPage variant="test" />}
        />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
      </Routes>
    </>
  )
}

export default App
