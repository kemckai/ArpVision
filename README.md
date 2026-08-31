# ArpVision 🎸

**ArpVision** is a comprehensive, interactive guitar fretboard visualizer that helps guitarists understand and master arpeggios, scales, modes, and chord shapes. Built with precision and attention to musical accuracy, ArpVision provides a beautiful, intuitive interface for exploring the guitar neck.

![Version](https://img.shields.io/badge/version-3.0-purple)
![License](https://img.shields.io/badge/license-MIT-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)
![React](https://img.shields.io/badge/React-19-blue)

## 🎯 Features

### Core Functionality
- **Interactive Fretboard Visualization** - Real-time display of notes, intervals, and chord tones across the entire neck
- **Multiple Tuning Support** - Standard tuning and 13 custom tunings (Open D, Drop D, DADGAD, etc.)
- **Musically Accurate** - All intervals, scales, and chord shapes are theory-correct and verified

### Arpeggios
- **Triads** - Major, Minor, Diminished, Augmented, Sus2, Sus4
- **7th Chords** - Major 7, Minor 7, Dominant 7, Half-Diminished, Diminished 7, Minor Major 7
- **Extended Chords** - 9ths, 11ths, 13ths, Add9, 6/9, and altered dominants (b9, #9, b5, #5, b13)

### Scales & Modes
- **39 Comprehensive Scales** - Complete collection from classical to exotic
- **Modes** - Ionian, Dorian, Phrygian, Lydian, Mixolydian, Aeolian, Locrian
- **Pentatonics** - Major Pentatonic, Minor Pentatonic, Blues Scale
- **Minor Scales** - Harmonic Minor, Melodic Minor, and melodic minor modes
- **Symmetric Scales** - Whole Tone, Diminished (Half-Whole), Diminished (Whole-Half)
- **Exotic & World Scales** - Hungarian Minor, Neapolitan, Double Harmonic, Persian, Enigmatic, Japanese scales (Hirajoshi, In Sen, Iwato, Yo), Scottish Pentatonic
- **Other Scales** - Chromatic, Bebop scales, Augmented, Prometheus, Tritone
- **Scale Descriptions** - Each scale includes historical background, cultural origins, and musical usage information

### CAGED System
- **Major CAGED Shapes** - All five major triad shapes (C, A, G, E, D) transposable to any root
- **Minor CAGED Shapes** - All five minor triad shapes transposable to any root
- **CAGED Scale Patterns** - Full major and minor scale patterns for each CAGED shape
- Toggle between triad and scale views for each shape

### Pentatonic Boxes
- **5 Minor Pentatonic Boxes** - Classic position-based patterns (Boxes 1-5)
- Visual filtering to show specific box patterns on the fretboard

### Hot Licks
- **28+ Artist Presets** — Randy Rhoads, Prince, Duane Allman, EVH, Yngwie, Slash, Gilmour, Beck, Page
- **Lick Browser** — Search, filter by genre/difficulty, animated playback with audio
- Exact fret/string positions with musical context

### Practice & Theory Tools
- **Audio playback** — Click notes or play licks with Web Audio
- **Metronome** and **backing track loops** (chord-tone arpeggios)
- **Chord progressions** — ii–V–I, blues, pop, rock cadences
- **Scale-over-chord suggestions** — Contextual scale recommendations
- **Chord inversions** — Root, 1st, and 2nd inversion with bass highlighting
- **Diads** — Double-stop patterns with visual pair connections
- **Sweep & Tapping** — Technique pattern library
- **Blues & Harmonic Minor boxes** — Position-based scale boxes

### Display & Sharing
- **Note names**, **left-handed layout**, **open strings**, **fret range** controls
- **Compare mode** — Side-by-side chord comparison
- **Shareable URLs** — Copy link with full app state
- **Custom patterns** — Save patterns locally in your browser
- **Sticky fretboard** — Fretboard follows scroll on desktop

### UI Features
- **Smart Note Display** - Color-coded intervals (Root, 3rd, 5th, 7th, extensions)
- **Proper Musical Notation** - Flat symbol (♭) for flats, correct interval names
- **Dynamic Titles** - Fretboard title updates based on selection
- **Theory Panel** - Shows all notes in the current chord/scale with interval names
- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **Optimized Performance** - Fast rendering with memoization and efficient algorithms

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ and npm
- Modern web browser (Chrome, Firefox, Safari, Edge)
- For iOS development: Xcode and CocoaPods

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kemckai/ArpVision.git
   cd ArpVision
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
   Navigate to `http://localhost:5002` (or the port shown in terminal)

### Development Commands

```bash
# Start development server
npm run dev

# Start client only (port 5000)
npm run dev:client

# Build for production
npm run build

# Build client only
npm run build:client

# Start production server
npm start

# Type checking
npm run check

# iOS development
npm run ios:sync    # Sync Capacitor and open iOS project
npm run ios:open    # Open iOS project in Xcode
npm run ios:build   # Build and sync iOS
```

## 📦 Building for Production

### Web Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Deploy to Vercel

ArpVision is configured for easy deployment on Vercel:

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Import project in Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in with GitHub
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect settings from `vercel.json`

3. **Deploy**
   - Click "Deploy"
   - Your app will be live at `your-project.vercel.app`

The configuration includes:
- Optimized client-only build for faster deployments
- Proper SPA routing (all routes serve `index.html`)
- Static asset caching headers

**Note**: The Vercel deployment uses `vercel-build` which only builds the client. For full-stack deployments with Express, use `npm run build`.

### Deploy to Railway

ArpVision includes a `railway.toml` for full-stack deployment (Express + static client).

1. **Install the Railway CLI** (if needed)
   ```bash
   npm i -g @railway/cli
   railway login
   ```

2. **Create and link a project**
   ```bash
   railway init --name ArpVision
   ```

3. **Deploy**
   ```bash
   railway up
   ```

4. **Generate a public URL**
   ```bash
   railway domain
   ```

Railway runs `npm ci && npm run build` then `npm start`. The server listens on `$PORT` and serves the built client from `dist/public`.

## 📱 iOS Development (Capacitor)

ArpVision includes Capacitor integration for iOS deployment:

### Setup

1. **Install iOS dependencies**
   ```bash
   cd ios/App
   pod install
   cd ../..
   ```

2. **Build and sync**
   ```bash
   npm run build
   npm run ios:sync
   ```

3. **Open in Xcode**
   ```bash
   npm run ios:open
   ```

### Configuration

- App ID: `com.kemckai.arpvision`
- Web directory: `dist/public`
- See `capacitor.config.ts` for full configuration

For detailed iOS setup instructions, see:
- `IOS_DEPLOYMENT.md`
- `SWIFT_INTEGRATION_GUIDE.md`

## 📖 Usage Guide

### Basic Navigation

1. **Select Root Note** - Click any note button (C, C#, D, etc.) to set the root
2. **Choose Arpeggio Type** - Browse tabs (Triads, 7ths, Extended) and click an arpeggio
3. **View on Fretboard** - See all chord tones highlighted across the neck
4. **Check Theory Panel** - View all notes in the chord with interval names

### Using Scales

1. **Select Scale** - Use the "Scale" dropdown to choose from 39 scales
2. **Read Description** - Each scale shows historical context in the dropdown
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

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Radix UI** - Accessible component primitives
- **Wouter** - Lightweight routing
- **TanStack Query** - Data fetching and state management

### Backend
- **Express.js** - Web server
- **Node.js** - Runtime

### Build Tools
- **Vite** - Build tool and dev server
- **TypeScript Compiler** - Type checking
- **ESBuild** - Fast bundling

### Mobile
- **Capacitor** - Cross-platform mobile runtime
- **iOS** - Native iOS app support

### Database (Optional)
- **Drizzle ORM** - Type-safe database toolkit
- **Neon Serverless** - PostgreSQL database (if used)

## 📁 Project Structure

```
ArpVision/
├── client/                    # Frontend React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Fretboard.tsx          # Main fretboard visualization
│   │   │   ├── arpvision/             # Settings, practice, licks, progressions
│   │   │   └── ui/                    # UI component library (Radix UI)
│   │   ├── lib/
│   │   │   ├── music-theory.ts        # Music theory data & logic
│   │   │   ├── audio-engine.ts        # Web Audio playback
│   │   │   ├── app-settings.ts        # Settings & custom patterns (localStorage)
│   │   │   ├── url-state.ts           # Shareable URL state
│   │   │   ├── chord-progressions.ts  # Progressions & scale suggestions
│   │   │   └── practice-data.ts       # Sweep, tapping, backing tracks
│   │   └── pages/
│   │       └── home.tsx               # Main application page
├── server/                    # Express backend
│   ├── index.ts               # Server entry point
│   ├── routes.ts              # API routes
│   ├── static.ts              # Static file serving
│   └── storage.ts             # Storage utilities
├── ios/                       # iOS Capacitor project
│   └── App/
│       └── ArpVision/         # Native iOS app
├── shared/                    # Shared code between client/server
│   └── schema.ts              # Shared TypeScript types/schemas
├── script/                    # Build scripts
│   └── build.ts               # Production build script
├── capacitor.config.ts        # Capacitor configuration
├── vite.config.ts             # Vite configuration
├── drizzle.config.ts          # Database configuration (if used)
├── vercel.json                # Vercel deployment config
└── package.json               # Dependencies and scripts
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

ArpVision includes significant performance optimizations:

- **Memoized Calculations** - Active notes and chord tones are cached
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
- Documentation improvements

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with love for guitarists who want to understand the fretboard deeply
- Inspired by the need for accurate, visual music theory tools
- Thanks to all the legendary guitarists whose licks are featured

## 📧 Support

For questions, suggestions, or support:
- Open an issue on GitHub
- Check the documentation files in the repository

---

**Made with ❤️ for guitarists everywhere**

*ArpVision 3.0 — Visualize. Understand. Master.*
