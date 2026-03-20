# Precision Pilot downloads

Place published assets here so the URLs in `src/config/precisionPilot.js` work without code changes.

| Platform | Expected filename (default config) | Notes |
|----------|-----------------------------------|--------|
| Android | `precision-pilot-android.aab` | Or use `.apk` and update `fileUrl` in config. Prefer store URL when live. |
| iOS | `precision-pilot-ios.ipa` | Direct IPA hosting is uncommon; usually set `storeUrl` to App Store / TestFlight public link instead. |
| Web | — | Set `fileUrl` to your production web app URL in config (not necessarily a file here). |
| Windows | `precision-pilot-windows.msix` | Or `.exe` / `.appinstaller` — update `fileUrl` accordingly. |

After adding a file:

1. Set `enabled: true` for that platform in `src/config/precisionPilot.js`.
2. Optionally set `storeUrl` so the primary button opens the store listing.

Rebuild or refresh the dev server after changing files in `public/`.
