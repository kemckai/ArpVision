# ArpVision 2.3

**ArpVision** is a comprehensive, interactive guitar fretboard visualizer that helps guitarists understand and master arpeggios, scales, modes, and chord shapes. Built with precision and attention to musical accuracy, ArpVision provides a beautiful, intuitive interface for exploring the guitar neck.

![ArpVision](https://img.shields.io/badge/version-2.3-purple)
![License](https://img.shields.io/badge/license-MIT-green)

## 🎸 Features

### Core Functionality
- **Interactive Fretboard Visualization** - Real-time display of notes, intervals, and chord tones across the entire neck
- **Multiple Tuning Support** - Standard tuning and custom tunings (Open D, Drop D, etc.)
- **Musically Accurate** - All intervals, scales, and chord shapes are theory-correct

### Arpeggios
- **Triads** - Major, Minor, Diminished, Augmented, Sus2, Sus4
- **7th Chords** - Major 7, Minor 7, Dominant 7, Half-Diminished, Diminished 7, Minor Major 7
- **Extended Chords** - 9ths, 11ths, 13ths, Add9, 6/9, and altered dominants (b9, #9, b5, #5, b13)

### Scales & Modes
- **39 Comprehensive Scales** - Complete collection of scales from classical to exotic
- **Modes** - Ionian, Dorian, Phrygian, Lydian, Mixolydian, Aeolian, Locrian
- **Pentatonics** - Major Pentatonic, Minor Pentatonic, Blues Scale
- **Minor Scales** - Harmonic Minor, Melodic Minor, Dorian b2, Lydian Augmented, Lydian Dominant, Mixolydian b6, Locrian #2, Altered
- **Symmetric Scales** - Whole Tone, Diminished (Half-Whole), Diminished (Whole-Half)
- **Exotic & World Scales** - Hungarian Minor, Neapolitan Minor/Major, Double Harmonic, Persian, Enigmatic, Hirajoshi, In Sen, Iwato, Yo, Scottish Pentatonic
- **Other Scales** - Chromatic, Bebop scales, Augmented, Prometheus, Tritone
- **Scale History & Context** - Each scale includes historical background, cultural origins, and musical usage information in the dropdown

### CAGED System
- **Major CAGED Shapes** - All five major triad shapes (C, A, G, E, D) transposable to any root
- **Minor CAGED Shapes** - All five minor triad shapes (C, A, G, E, D) transposable to any root
- **CAGED Scale Patterns** - Full major and minor scale patterns for each CAGED shape
- Visual representation of classic open-position and barre chord forms
- Toggle between triad and scale views for each shape

### Pentatonic Boxes
- **5 Minor Pentatonic Boxes** - Classic position-based patterns (Boxes 1-5)
- Visual filtering to show specific box patterns on the fretboard

### Hot Licks
- **Artist Presets** - Famous arpeggio licks from legendary guitarists:
  - Eddie Van Halen - Eruption Tapping Triad
  - Jeff Beck - Singing D Major Arp
  - Jimmy Page - Black Dog A7 Arp
- Exact fret/string positions with musical context

### UI Features
- **Smart Note Display** - Color-coded intervals (Root, 3rd, 5th, 7th, extensions)
- **Flat Notation** - Proper musical notation with flat symbol (♭) for flats
- **Dynamic Titles** - Fretboard title updates based on selection (e.g., "A Harmonic Minor", "D Major – C Shape")
- **Theory Panel** - Shows all notes in the current chord/scale with interval names
- **Scrollable Dropdowns** - Easy navigation through extensive scale lists
- **Scale Descriptions** - Historical context and usage information for every scale, including cultural origins, famous examples, and musical characteristics
- **Responsive Design** - Works on desktop and tablet devices
- **Optimized Performance** - Fast, lean rendering with memoization and efficient algorithms
- **Error-Free Execution** - Comprehensive input validation ensures smooth operation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kemckai/ArpVision-2.0.git
   cd ArpVision-2.0
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5000` (or the port shown in terminal)

### Build for Production

```bash
npm run build
npm start
```

## 📖 Usage Guide

### Basic Navigation

1. **Select Root Note** - Click any note button (C, C#, D, etc.) to set the root
2. **Choose Arpeggio Type** - Browse tabs (Triads, 7ths, Extended) and click an arpeggio
3. **View on Fretboard** - See all chord tones highlighted across the neck
4. **Check Theory Panel** - View all notes in the chord with interval names

### Using Scales

1. **Select Scale** - Use the "Scale" dropdown to choose from 39 scales
2. **Read Description** - Each scale shows historical context, cultural origins, and usage information directly in the dropdown
3. **Pick Root Note** - Select your desired root
4. **Visualize** - The fretboard shows all scale tones with color-coded intervals

### CAGED Shapes

1. **Go to CAGED Tab** - Click the "CAGED" tab in the arpeggio selector
2. **Choose Quality** - Toggle between Major and Minor
3. **Choose Type** - Toggle between Triads and Scales
4. **Choose Shape** - Click C, A, G, E, or D to see that shape
5. **Change Root** - The shape transposes automatically to your selected root

### Pentatonic Boxes

1. **Select Minor Pentatonic** - Go to "Pents" tab and click "Minor Pentatonic"
2. **Choose Box** - Use the "Boxes" selector (All, 1, 2, 3, 4, 5)
3. **See Pattern** - The fretboard filters to show only that box pattern

### Hot Licks

1. **Open Licks Tab** - Click the "Licks" tab (with flame icon)
2. **Select Lick** - Click any artist preset
3. **Study Pattern** - See the exact fretboard positions with musical context

## 🎨 Color Coding

- **Hot Pink** - Root notes (R)
- **White** - 3rds (3/b3)
- **Black** - 5ths (5/b5) and extensions (2/4/6/9)
- **Hot Pink (tinted)** - 7ths (b7/7)

## 🛠️ Technology Stack

- **Frontend**
  - React 19
  - TypeScript
  - Tailwind CSS
  - Framer Motion (animations)
  - Radix UI (components)
  - Wouter (routing)

- **Backend**
  - Express.js
  - Node.js

- **Build Tools**
  - Vite
  - TypeScript Compiler

## 📁 Project Structure

```
ArpVision-2.0/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Fretboard.tsx      # Main fretboard visualization
│   │   │   └── ui/                 # UI component library
│   │   ├── lib/
│   │   │   └── music-theory.ts     # All music theory data & logic
│   │   ├── pages/
│   │   │   └── home.tsx            # Main application page
│   │   └── App.tsx
│   └── index.html
├── server/
│   └── index.ts                    # Express server
└── package.json
```

## 🎵 Music Theory Accuracy

ArpVision prioritizes **musical correctness** above all else:

- All intervals are calculated correctly relative to the root
- Chord tones match standard music theory (1-3-5 for triads, etc.)
- Scale patterns follow established music theory
- CAGED shapes are based on standard open-position forms
- Interval names use proper notation (R, b3, 5, b7, 9, 11, 13, etc.)
- Minor pentatonic box positions match classic guitar patterns
- All music theory has been verified for accuracy

## ⚡ Performance & Quality

ArpVision 2.3 includes significant performance improvements:

- **Memoized Calculations** - Active notes and chord tones are cached to prevent unnecessary recalculations
- **Optimized Lookups** - O(1) Map/Set lookups instead of O(n) array searches
- **Efficient Rendering** - React hooks (useMemo, useCallback) minimize re-renders
- **Input Validation** - Comprehensive validation ensures robust error handling
- **Clean Execution** - No console errors, smooth user experience

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Areas for Contribution
- Additional scales or modes
- More Hot Lick presets
- Additional tuning presets
- UI/UX improvements
- Performance optimizations
- Bug fixes

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with love for guitarists who want to understand the fretboard deeply
- Inspired by the need for accurate, visual music theory tools
- Thanks to all the legendary guitarists whose licks are featured

## 📧 Contact

For questions, suggestions, or support, please open an issue on GitHub.

---

**Made with ❤️ for guitarists everywhere**

*ArpVision 2.3 - Visualize. Understand. Master.*

## 📋 Changelog

### Version 2.3
- ✅ Performance optimizations with React memoization
- ✅ Optimized Fretboard component with Map/Set lookups
- ✅ Comprehensive input validation and error handling
- ✅ Fixed flat symbol rendering (♭)
- ✅ Verified all music theory intervals and CAGED shapes
- ✅ Improved code quality and maintainability

### Version 2.1
- Initial release with comprehensive scale library
- CAGED system implementation
- Pentatonic box patterns
- Hot Licks presets

