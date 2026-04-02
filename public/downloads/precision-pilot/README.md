# Precision Pilot downloads

Place published assets here so the URLs in `src/config/precisionPilot.js` work without code changes.

| Platform | Expected filename (default config) | Notes |
|----------|-----------------------------------|--------|
| Android (release) | `precision-pilot-release.apk` | **arm64-v8a** slice from `flutter build apk --release --split-per-abi` (fits GitHub file limits; most phones). |
| Android (debug) | `precision-pilot-debug.apk` | **armeabi-v7a** slice from `flutter build apk --debug --split-per-abi` (under GitHub’s 100 MB cap; full universal/arm64 debug APKs can exceed that). For a local arm64 debug build, run Flutter in the app repo instead. |
| Android (AAB) | `precision-pilot-android.aab` | Optional; update `fileUrl` in config if you prefer AAB over APK for Play upload. |
| iOS | `precision-pilot-ios.ipa` | Direct IPA hosting is uncommon; usually set `storeUrl` to App Store / TestFlight public link instead. |
| Web | — | Set `fileUrl` to your production web app URL in config (not necessarily a file here). |
| Windows | `precision-pilot-windows.msix` | Or `.exe` / `.appinstaller` — update `fileUrl` accordingly. |

After adding a file:

1. Set `enabled: true` for that platform in `src/config/precisionPilot.js`.
2. Optionally set `storeUrl` so the primary button opens the store listing.

Rebuild or refresh the dev server after changing files in `public/`.
