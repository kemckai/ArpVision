# ArpVision Native iOS App

This is a native SwiftUI iOS app for ArpVision, built to run natively on iPhone without Capacitor dependencies.

## Project Structure

```
App-Native/
├── ArpVisionApp.swift      # Main SwiftUI app entry point
├── AppDelegate.swift       # Optional UIKit lifecycle (can be deleted)
├── Info.plist             # App configuration
├── Models/
│   └── MusicTheory.swift  # Music theory models and utilities
├── Views/
│   ├── ContentView.swift  # Main app view
│   └── FretboardView.swift # Fretboard visualization
└── Assets.xcassets/       # App icons and images
```

## Setting Up in Xcode

### Option 1: Create New Xcode Project (Recommended)

1. **Open Xcode**
   - Launch Xcode on your Mac

2. **Create New Project**
   - File → New → Project
   - Select "iOS" → "App"
   - Click "Next"

3. **Configure Project**
   - Product Name: `ArpVisionNative`
   - Team: Select your development team
   - Organization Identifier: `com.yourcompany` (or your preferred identifier)
   - Interface: **SwiftUI**
   - Language: **Swift**
   - Uncheck "Use Core Data" and "Include Tests" (optional)
   - Click "Next"

4. **Save Location**
   - Navigate to: `/Users/spectorclef/Documents/DEV/Guitar_Arpeggios-main/ios/App/`
   - Save the project

5. **Replace Default Files**
   - Delete the default `ContentView.swift` and `AppNameApp.swift` files
   - Copy all files from `App-Native/` folder into your new project:
     - Drag `ArpVisionApp.swift` into the project
     - Drag `AppDelegate.swift` (optional)
     - Drag `Models/` folder
     - Drag `Views/` folder
     - Drag `Assets.xcassets/` folder
   - Make sure "Copy items if needed" is checked
   - Add to target: `ArpVisionNative`

6. **Update Info.plist**
   - In Xcode, select your project in the navigator
   - Select the target
   - Go to "Info" tab
   - Copy settings from `App-Native/Info.plist` or manually configure:
     - Bundle Display Name: `ArpVision`
     - Supported Interface Orientations: Portrait, Landscape Left, Landscape Right

7. **Build and Run**
   - Select a simulator or connected device
   - Press ⌘R to build and run

### Option 2: Use Existing Project Structure

If you want to use the existing Xcode project structure:

1. Open `ios/App/App.xcworkspace` in Xcode
2. Create a new target:
   - File → New → Target
   - Select "App" under iOS
   - Name it `ArpVisionNative`
   - Interface: SwiftUI
3. Add the files from `App-Native/` to the new target
4. Build and run the new target

## Features

- ✅ Pure SwiftUI interface
- ✅ Native iOS performance
- ✅ Music theory models (Notes, Intervals, Arpeggios, Scales)
- ✅ Fretboard visualization
- ✅ Root note selection
- ✅ Arpeggio and scale selection
- ✅ Tuning selection

## Requirements

- iOS 14.0 or later
- Xcode 14.0 or later
- Swift 5.7 or later

## Building

1. Open the project in Xcode
2. Select your target device or simulator
3. Press ⌘R to build and run

## Notes

- This is a pure native SwiftUI app - no Capacitor, no web views
- All music theory logic is implemented in Swift
- The app uses SwiftUI for all UI components
- AppDelegate.swift is optional and can be deleted if you don't need UIKit lifecycle methods

