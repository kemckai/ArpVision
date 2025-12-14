# SwiftUI Integration Guide

This guide explains how to integrate the SwiftUI native app into your Xcode project.

## Current Status

✅ **Created:**
- `Models/MusicTheory.swift` - Core music theory models
- `Views/FretboardView.swift` - Fretboard visualization
- `Views/ContentView.swift` - Main app interface
- `ArpVisionApp.swift` - App entry point

## Integration Steps

### Option 1: Create New SwiftUI Target (Recommended)

This keeps the Capacitor app and creates a separate native app:

1. **Open Xcode**
   ```bash
   npm run ios:open
   ```

2. **Create New Target**
   - File → New → Target
   - Choose "App" under iOS
   - Product Name: `ArpVisionNative`
   - Interface: SwiftUI
   - Language: Swift
   - Click Finish

3. **Add Swift Files**
   - Right-click the new target's folder
   - Add Files to "ArpVisionNative"
   - Select:
     - `Models/MusicTheory.swift`
     - `Views/FretboardView.swift`
     - `Views/ContentView.swift`
   - Make sure "Copy items if needed" is checked
   - Add to target: `ArpVisionNative`

4. **Update App Entry Point**
   - Replace the default `App.swift` with `ArpVisionApp.swift`
   - Or rename `ArpVisionApp.swift` to match your app name

5. **Build and Run**
   - Select the `ArpVisionNative` scheme
   - Build and run

### Option 2: Replace Capacitor with SwiftUI

Convert the existing Capacitor app to use SwiftUI:

1. **Update Info.plist**
   - Remove or comment out `UIMainStoryboardFile` key
   - This tells iOS not to use the storyboard

2. **Update AppDelegate.swift**
   ```swift
   import SwiftUI
   import UIKit
   
   @UIApplicationMain
   class AppDelegate: UIResponder, UIApplicationDelegate {
       var window: UIWindow?
       
       func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
           let contentView = ContentView()
           
           window = UIWindow(frame: UIScreen.main.bounds)
           window?.rootViewController = UIHostingController(rootView: contentView)
           window?.makeKeyAndVisible()
           
           return true
       }
   }
   ```

3. **Add Swift Files to Project**
   - In Xcode, right-click the App folder
   - Add Files to "App"
   - Select the Swift files
   - Make sure they're added to the App target

4. **Remove Capacitor Dependencies** (Optional)
   - If you want a pure SwiftUI app, remove Capacitor pods
   - Update Podfile to remove Capacitor references
   - Run `pod install`

### Option 3: Hybrid Approach

Keep Capacitor but add SwiftUI views:

1. **Create SwiftUI Bridge**
   - Create a SwiftUI view wrapper
   - Use `UIHostingController` to embed in UIKit
   - Add as a modal or navigation destination

2. **Add Navigation**
   - Use Capacitor for main app
   - Present SwiftUI views for specific features
   - Best of both worlds

## File Structure

After integration, your project should look like:

```
ios/App/App/
├── Models/
│   └── MusicTheory.swift
├── Views/
│   ├── FretboardView.swift
│   └── ContentView.swift
├── ArpVisionApp.swift (or App.swift)
├── AppDelegate.swift (if using UIKit)
└── Info.plist
```

## Requirements

- **iOS 14.0+** (for SwiftUI features)
- **Xcode 12+** (for SwiftUI 2.0)
- **Swift 5.3+**

## Testing

1. **Build the Project**
   ```bash
   # In Xcode: Product → Build (⌘B)
   ```

2. **Run on Simulator**
   - Select a simulator
   - Click Run (⌘R)

3. **Test Features**
   - Root note selection
   - Arpeggio type changes
   - Scale visualization
   - Tuning changes

## Troubleshooting

### Issue: "Cannot find type 'Note' in scope"
**Solution**: Make sure `MusicTheory.swift` is added to your target

### Issue: "Use of undeclared type 'FretNote'"
**Solution**: Check that all model files are included in the build

### Issue: Preview not working
**Solution**: 
- Make sure you're using Xcode 12+
- Check that SwiftUI previews are enabled
- Try Product → Clean Build Folder

### Issue: Build errors
**Solution**:
1. Clean build folder: Product → Clean Build Folder (⇧⌘K)
2. Delete DerivedData: `rm -rf ~/Library/Developer/Xcode/DerivedData`
3. Rebuild

## Next Steps

Once integrated, you can:

1. **Add More Scales** - Port all 39 scales from TypeScript
2. **Implement CAGED** - Add CAGED shape visualization
3. **Add Pentatonic Boxes** - Implement box patterns
4. **Polish UI** - Match web app design
5. **Add Animations** - SwiftUI transitions
6. **iPad Optimization** - Larger screen layouts

## Performance

The SwiftUI version should be:
- **Faster** - No JavaScript bridge
- **Smoother** - Native rendering
- **Smaller** - No web assets bundle
- **More Responsive** - Direct Swift execution

## Comparison: Capacitor vs SwiftUI

| Feature | Capacitor | SwiftUI |
|---------|-----------|---------|
| Development | Web technologies | Native Swift |
| Performance | Good (web view) | Excellent (native) |
| Code Sharing | Share with web | iOS only |
| Updates | OTA possible | App Store only |
| Learning Curve | Web devs | iOS devs |

Choose based on your needs:
- **Capacitor**: Cross-platform, web devs, faster iteration
- **SwiftUI**: Native performance, iOS-only, best UX

---

**Ready to integrate?** Follow Option 1 for the easiest path, or Option 2 if you want to fully replace Capacitor.


