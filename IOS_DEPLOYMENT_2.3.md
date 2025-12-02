# iOS Deployment Guide for ArpVision 2.3

This guide provides step-by-step instructions for deploying ArpVision 2.3 to the iOS App Store.

## Quick Start

```bash
# 1. Build the web app
npm run build

# 2. Sync with iOS project
npm run ios:sync

# 3. Open in Xcode
npm run ios:open
```

## Prerequisites

1. **macOS** - Required for iOS development
2. **Xcode** - Install from Mac App Store (free)
3. **Apple Developer Account** - $99/year for App Store distribution
4. **CocoaPods** - Install with `sudo gem install cocoapods`

## Version Information

- **App Version**: 2.3.0
- **Build Number**: 3
- **Bundle ID**: `com.kemckai.arpvision`
- **Minimum iOS**: 14.0

## Pre-Deployment Checklist

- [x] Version numbers updated in Xcode project (2.3.0)
- [x] Build number incremented (3)
- [x] Web app built successfully
- [x] iOS project synced with latest web assets
- [ ] App icons added (1024x1024 required)
- [ ] Screenshots prepared for App Store
- [ ] Privacy policy URL ready
- [ ] App Store Connect listing created

## Step-by-Step Deployment

### 1. Build and Sync

```bash
# Build the production web app
npm run build

# Sync web assets to iOS project
npm run ios:sync
```

### 2. Open in Xcode

```bash
npm run ios:open
```

Or manually:
```bash
open ios/App/App.xcworkspace
```

**Important**: Always open the `.xcworkspace` file, not the `.xcodeproj` file.

### 3. Configure Signing & Capabilities

1. In Xcode, select the **App** project in the navigator
2. Select the **App** target
3. Go to **Signing & Capabilities** tab
4. Check **Automatically manage signing**
5. Select your **Team** (Apple Developer account)
6. Xcode will automatically configure provisioning profiles

### 4. Verify App Information

1. Select **App** target → **General** tab
2. Verify:
   - **Display Name**: ArpVision
   - **Bundle Identifier**: `com.kemckai.arpvision`
   - **Version**: 2.3.0
   - **Build**: 3
   - **Minimum Deployments**: iOS 14.0

### 5. Add App Icons

1. In Xcode, navigate to **Assets.xcassets** → **AppIcon**
2. Add app icons in all required sizes:
   - 20x20 (@2x, @3x) - 40x40, 60x60
   - 29x29 (@2x, @3x) - 58x58, 87x87
   - 40x40 (@2x, @3x) - 80x80, 120x120
   - 60x60 (@2x, @3x) - 120x120, 180x180
   - 1024x1024 (App Store icon) - **Required**

**Tip**: Use [AppIcon.co](https://www.appicon.co) or [IconKitchen](https://icon.kitchen) to generate all sizes from a single 1024x1024 image.

### 6. Test on Simulator

1. Select a simulator from the device dropdown (e.g., iPhone 15 Pro)
2. Click **Run** (⌘R) or press the Play button
3. Verify the app loads correctly
4. Test key features:
   - Root note selection
   - Arpeggio display
   - Scale visualization
   - CAGED shapes
   - Pentatonic boxes

### 7. Build Archive

1. Select **Any iOS Device** (or a connected device) from device selector
2. Go to **Product** → **Archive**
3. Wait for the archive to build (may take a few minutes)
4. The **Organizer** window will open automatically

### 8. Validate Archive

1. In the **Organizer**, select your archive
2. Click **Validate App**
3. Follow the wizard:
   - Select your distribution method (App Store)
   - Choose your team
   - Review and validate

### 9. Distribute to App Store Connect

1. In the **Organizer**, select your archive
2. Click **Distribute App**
3. Choose **App Store Connect**
4. Follow the wizard:
   - Select **Upload**
   - Choose distribution options
   - Review and upload

## App Store Connect Setup

### 1. Create App Listing (if first time)

1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. Click **My Apps** → **+** → **New App**
3. Fill in:
   - **Platform**: iOS
   - **Name**: ArpVision
   - **Primary Language**: English
   - **Bundle ID**: `com.kemckai.arpvision`
   - **SKU**: `arpvision-ios`
   - **User Access**: Full Access

### 2. App Information

- **Category**: Music or Education
- **Subtitle**: Interactive Guitar Fretboard Visualizer
- **Privacy Policy URL**: (Required - host your privacy policy)
- **Support URL**: Your GitHub repo or website

### 3. App Store Listing

- **App Name**: ArpVision
- **Subtitle**: Interactive Guitar Fretboard Visualizer
- **Description**: 
```
ArpVision is a comprehensive, interactive guitar fretboard visualizer that helps guitarists understand and master arpeggios, scales, modes, and chord shapes. Built with precision and attention to musical accuracy, ArpVision provides a beautiful, intuitive interface for exploring the guitar neck.

Features:
• Interactive fretboard visualization with color-coded intervals
• 39 comprehensive scales from classical to exotic
• CAGED system for major and minor chords and scales
• 5 minor pentatonic box patterns
• Hot licks from legendary guitarists
• Multiple tuning support
• Optimized performance and error-free execution
```
- **Keywords**: guitar, fretboard, arpeggios, scales, music theory, chords, modes, pentatonic, CAGED
- **Support URL**: Your support/contact URL
- **Marketing URL**: (Optional) Your website

### 4. Screenshots

Required screenshots:
- **iPhone 6.7"** (1290 x 2796 pixels) - Required
- **iPhone 6.5"** (1242 x 2688 pixels) - Required
- **iPhone 5.5"** (1242 x 2208 pixels) - Optional but recommended

**How to take screenshots:**
1. Run app on simulator: `npm run ios:open`
2. In Simulator, go to **Device** → **Screenshot**
3. Or use Cmd+S in simulator
4. Screenshots are saved to Desktop

### 5. Version Information

- **Version**: 2.3.0
- **Copyright**: © 2024 Your Name
- **What's New in This Version**:
```
Version 2.3.0 - Performance & Quality Improvements

• Performance optimizations with React memoization
• Optimized Fretboard component with Map/Set lookups
• Comprehensive input validation and error handling
• Fixed flat symbol rendering (♭)
• Verified all music theory intervals and CAGED shapes
• Minor CAGED shapes and scale patterns support
• Improved code quality and maintainability
```

### 6. Submit for Review

1. After uploading the build, go to **TestFlight** tab to test (optional)
2. Go to **App Store** tab → **+ Version or Platform**
3. Select your build (2.3.0 Build 3)
4. Answer **App Review Information**:
   - Contact information
   - Demo account (if needed)
   - Notes for reviewer: "ArpVision is a music education tool for guitarists. No user accounts or data collection required."
5. Submit for review

## Testing with TestFlight (Recommended)

1. Upload build to App Store Connect
2. Go to **TestFlight** tab
3. Add internal testers (up to 100)
4. Test on real devices before submitting
5. Gather feedback and fix any issues

## Common Issues & Solutions

### Issue: "No signing certificate found"
**Solution**: 
- Make sure you have an Apple Developer account
- Sign in to Xcode: **Xcode** → **Settings** → **Accounts**
- Add your Apple ID

### Issue: CocoaPods errors
**Solution**: 
```bash
cd ios/App
pod deintegrate
pod install
cd ../..
```

### Issue: Build fails
**Solution**: 
1. Clean build folder: **Product** → **Clean Build Folder** (Shift+Cmd+K)
2. Delete DerivedData: `rm -rf ~/Library/Developer/Xcode/DerivedData`
3. Rebuild

### Issue: Web assets not updating
**Solution**: 
Always run `npm run build` before `npm run ios:sync`

### Issue: Version mismatch
**Solution**: 
- Verify MARKETING_VERSION = 2.3.0 in project.pbxproj
- Verify CURRENT_PROJECT_VERSION = 3 in project.pbxproj
- Clean and rebuild

## Useful Commands

```bash
# Build web app and sync to iOS
npm run ios:sync

# Open Xcode project
npm run ios:open

# Build web app only
npm run build

# Clean iOS build
cd ios/App
rm -rf Pods Podfile.lock
pod install
cd ../..

# Check Capacitor version
npx cap --version
```

## App Store Guidelines Compliance

Ensure your app complies with:
- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- No copyrighted content without permission
- Privacy policy required (must be hosted online)
- Proper app description and screenshots
- No misleading information

## Timeline

- **First Submission**: 1-3 days for review
- **Updates**: Usually faster (24-48 hours)
- **Rejections**: Fix issues and resubmit (usually quick turnaround)

## Version 2.3.0 Release Notes

### What's New
- Performance optimizations with React memoization
- Optimized Fretboard component with Map/Set lookups
- Comprehensive input validation and error handling
- Fixed flat symbol rendering (♭)
- Verified all music theory intervals and CAGED shapes
- Minor CAGED shapes and scale patterns support
- Improved code quality and maintainability

### Technical Improvements
- O(1) note lookups instead of O(n) searches
- Memoized calculations prevent unnecessary recalculations
- Input validation ensures robust error handling
- Clean execution with no console errors

## Resources

- [Capacitor iOS Documentation](https://capacitorjs.com/docs/ios)
- [App Store Connect Help](https://help.apple.com/app-store-connect/)
- [Apple Developer Documentation](https://developer.apple.com/documentation/)
- [Xcode User Guide](https://developer.apple.com/documentation/xcode)

## Support

If you encounter issues:
1. Check Capacitor documentation
2. Review Xcode build logs
3. Check App Store Connect status
4. Contact Apple Developer Support if needed

---

**Good luck with your App Store submission! 🚀**

*ArpVision 2.3.0 - Visualize. Understand. Master.*

