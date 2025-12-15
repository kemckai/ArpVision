# Swift Playgrounds Guide for ArpVision

This guide explains how to use ArpVision in Swift Playgrounds on Mac and iPad.

## What is Swift Playgrounds?

Swift Playgrounds is Apple's interactive coding environment that lets you:
- Write and run Swift code instantly
- See results in real-time
- Learn Swift programming
- Prototype SwiftUI apps

## Option 1: Mac - Xcode Playground

### Step 1: Create Playground in Xcode

1. **Open Xcode**
   ```bash
   open -a Xcode
   ```

2. **Create New Playground**
   - File → New → Playground
   - Choose "iOS" → "Blank"
   - Name it "ArpVision"
   - Save it anywhere

3. **Copy Code**
   - Open `ArpVision.playground/Contents.swift` from this repo
   - Copy all the code
   - Paste into your new playground

4. **Run**
   - Click the "Run" button (▶️) or press `Cmd + Shift + Return`
   - The live view will appear in the assistant editor

### Step 2: Enable Live View

If you don't see the live view:
1. Click the "Show/Hide Assistant Editor" button (two circles)
2. Or: View → Assistant Editor → Show Assistant Editor
3. Make sure "Live View" is selected in the assistant editor

## Option 2: iPad - Swift Playgrounds App

### Step 1: Install Swift Playgrounds

1. Download **Swift Playgrounds** from the App Store (free)
2. Open the app

### Step 2: Create New Playground

1. Tap the **+** button
2. Choose **"Blank"**
3. Name it "ArpVision"

### Step 3: Copy Code

1. Open `ArpVision.playground/Contents.swift` on your Mac
2. Copy all the code
3. AirDrop or email it to your iPad
4. Paste into the playground

### Step 4: Run

1. Tap the **Run My Code** button (▶️)
2. The app will appear in the live view

## Option 3: Import Playground File

### On Mac (Xcode)

1. **Open Xcode**
2. **File → Open**
3. Navigate to `ArpVision.playground` folder
4. Click **Open**
5. Click **Run** (▶️)

### On iPad (Swift Playgrounds App)

1. **AirDrop** the `ArpVision.playground` folder to your iPad
2. Open it in **Files** app
3. Tap **Share** → **Swift Playgrounds**
4. It will open in Swift Playgrounds

## Features in Playground

The playground version includes:
- ✅ All 12 chromatic notes
- ✅ 6 common arpeggio types (Major, Minor, Diminished, Maj7, Min7, Dom7)
- ✅ Interactive root note selector
- ✅ Arpeggio type picker
- ✅ Fretboard visualization (12 frets)
- ✅ Color-coded notes (Root = Purple, Others = Blue)

## Limitations in Playgrounds

Compared to the full app:
- ⚠️ Limited to 12 frets (full app has 19)
- ⚠️ Only 6 arpeggio types (full app has 28)
- ⚠️ No scales (full app has 39 scales)
- ⚠️ No CAGED system
- ⚠️ No pentatonic boxes
- ⚠️ Simplified UI

## Customizing the Playground

### Add More Arpeggios

Add to `ArpeggioType.all`:
```swift
ArpeggioType(id: "aug", name: "Augmented", intervals: [0, 4, 8]),
ArpeggioType(id: "sus4", name: "Sus4", intervals: [0, 5, 7]),
```

### Change Number of Frets

In `ContentView`, change:
```swift
numFrets: 12  // Change to 15 or 19
```

### Add Scales

Add a `ScaleType` struct and generation function (see full app code).

## Troubleshooting

### Issue: "Cannot find type 'Note' in scope"
**Solution**: Make sure all the code is in the same playground file

### Issue: Live view not showing
**Solution**: 
- Mac: Enable Assistant Editor (View → Assistant Editor)
- iPad: Make sure you tapped "Run My Code"

### Issue: Code won't run
**Solution**:
- Check for syntax errors (red marks)
- Make sure `PlaygroundPage.current.setLiveView(contentView)` is at the end
- Try restarting the playground

### Issue: Performance is slow
**Solution**: 
- Reduce `numFrets` to 8 or 10
- Limit the number of notes generated

## Tips

1. **Experiment**: Change colors, sizes, layouts
2. **Add Features**: Try adding more arpeggios or scales
3. **Learn**: Read the code to understand SwiftUI
4. **Share**: Export your playground to share with others

## Next Steps

Once you're comfortable with the playground:
1. Open the full Xcode project
2. Integrate features from the playground
3. Build the complete app

## Resources

- [Swift Playgrounds Documentation](https://www.apple.com/swift/playgrounds/)
- [SwiftUI Tutorials](https://developer.apple.com/tutorials/swiftui)
- [Swift Language Guide](https://docs.swift.org/swift-book/)

---

**Have fun coding!** 🎸












