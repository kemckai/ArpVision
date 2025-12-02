# iOS App Store Deployment Guide for ArpVision

This guide will walk you through deploying ArpVision to the iOS App Store.

## Prerequisites

1. **macOS** - You need a Mac to build iOS apps
2. **Xcode** - Install from the Mac App Store (free)
3. **Apple Developer Account** - $99/year subscription required for App Store distribution
4. **CocoaPods** - Dependency manager for iOS (install with `sudo gem install cocoapods`)

## Setup Steps

### 1. Install Xcode and Command Line Tools

```bash
# Install Xcode from Mac App Store, then:
xcode-select --install
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
```

### 2. Install CocoaPods

```bash
sudo gem install cocoapods
```

### 3. Install iOS Dependencies

```bash
cd ios/App
pod install
cd ../..
```

### 4. Build and Sync

```bash
# Build the web app
npm run build

# Sync with iOS project
npm run ios:sync
```

## Building for App Store

### 1. Open in Xcode

```bash
npm run ios:open
```

Or manually:
```bash
open ios/App/App.xcworkspace
```

### 2. Configure Signing & Capabilities

1. In Xcode, select the **App** project in the navigator
2. Select the **App** target
3. Go to **Signing & Capabilities** tab
4. Check **Automatically manage signing**
5. Select your **Team** (your Apple Developer account)
6. Xcode will automatically create/select a provisioning profile

### 3. Configure App Information

1. Select **App** target → **General** tab
2. Update:
   - **Display Name**: ArpVision
   - **Bundle Identifier**: `com.kemckai.arpvision` (or your own)
   - **Version**: 2.1.0
   - **Build**: 1
   - **Minimum Deployments**: iOS 13.0 (recommended)

### 4. Add App Icons

1. In Xcode, go to **Assets.xcassets** → **AppIcon**
2. Add app icons in all required sizes:
   - 20x20 (@2x, @3x)
   - 29x29 (@2x, @3x)
   - 40x40 (@2x, @3x)
   - 60x60 (@2x, @3x)
   - 1024x1024 (App Store icon)

You can use an online tool like [AppIcon.co](https://www.appicon.co) to generate all sizes from a single 1024x1024 image.

### 5. Configure Launch Screen

1. The launch screen is in `ios/App/App/Base.lproj/LaunchScreen.storyboard`
2. You can customize it to match your app's branding
3. Or create a simple splash screen image

### 6. Build Archive

1. In Xcode, select **Any iOS Device** (or a connected device) from the device selector
2. Go to **Product** → **Archive**
3. Wait for the archive to build
4. The **Organizer** window will open automatically

### 7. Upload to App Store Connect

1. In the **Organizer**, select your archive
2. Click **Distribute App**
3. Choose **App Store Connect**
4. Follow the wizard:
   - Select **Upload**
   - Choose your distribution options
   - Review and upload

## App Store Connect Setup

### 1. Create App Listing

1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. Click **My Apps** → **+** → **New App**
3. Fill in:
   - **Platform**: iOS
   - **Name**: ArpVision
   - **Primary Language**: English
   - **Bundle ID**: Select `com.kemckai.arpvision`
   - **SKU**: `arpvision-ios` (unique identifier)
   - **User Access**: Full Access

### 2. App Information

Fill in:
- **Category**: Music or Education
- **Subtitle**: Guitar Fretboard Visualizer
- **Privacy Policy URL**: (required - host your privacy policy)
- **Support URL**: Your GitHub repo or website

### 3. App Store Listing

- **App Name**: ArpVision
- **Subtitle**: Interactive Guitar Fretboard Visualizer
- **Description**: (Use content from README.md)
- **Keywords**: guitar, fretboard, arpeggios, scales, music theory, chords, modes, pentatonic
- **Support URL**: Your support/contact URL
- **Marketing URL**: (optional) Your website

### 4. Screenshots

You'll need screenshots for:
- iPhone 6.7" (1290 x 2796 pixels) - Required
- iPhone 6.5" (1242 x 2688 pixels) - Required
- iPhone 5.5" (1242 x 2208 pixels) - Optional but recommended

Take screenshots on a simulator or device:
```bash
# Open iOS Simulator
npm run ios:open
# Then take screenshots from Simulator → Device → Screenshot
```

### 5. App Preview Video (Optional)

Create a short video (15-30 seconds) showing the app in action.

### 6. Version Information

- **Version**: 2.1.0
- **Copyright**: © 2024 Your Name
- **What's New**: Initial release of ArpVision for iOS

### 7. Submit for Review

1. After uploading the build, go to **TestFlight** tab to test (optional)
2. Go to **App Store** tab → **+ Version or Platform**
3. Select your build
4. Answer **App Review Information**:
   - Contact information
   - Demo account (if needed)
   - Notes for reviewer
5. Submit for review

## Testing Before Submission

### TestFlight (Recommended)

1. Upload build to App Store Connect
2. Go to **TestFlight** tab
3. Add internal testers (up to 100)
4. Test on real devices before submitting

### Local Testing

```bash
# Build and run on simulator
npm run ios:open
# Then click Run in Xcode
```

## Common Issues & Solutions

### Issue: "No signing certificate found"
**Solution**: Make sure you have an Apple Developer account and Xcode is signed in.

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
**Solution**: Always run `npm run build` before `npm run ios:sync`

## Useful Commands

```bash
# Build web app and sync to iOS
npm run ios:sync

# Open Xcode project
npm run ios:open

# Clean iOS build
cd ios/App
rm -rf Pods Podfile.lock
pod install
cd ../..
```

## App Store Guidelines

Make sure your app complies with:
- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- No copyrighted content without permission
- Privacy policy required
- Proper app description and screenshots

## Timeline

- **First Submission**: 1-3 days for review
- **Updates**: Usually faster (24-48 hours)
- **Rejections**: Fix issues and resubmit (usually quick turnaround)

## Resources

- [Capacitor iOS Documentation](https://capacitorjs.com/docs/ios)
- [App Store Connect Help](https://help.apple.com/app-store-connect/)
- [Apple Developer Documentation](https://developer.apple.com/documentation/)

## Support

If you encounter issues:
1. Check Capacitor documentation
2. Review Xcode build logs
3. Check App Store Connect status
4. Contact Apple Developer Support if needed

---

Good luck with your App Store submission! 🚀

