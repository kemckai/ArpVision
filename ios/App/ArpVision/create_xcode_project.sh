#!/bin/bash

# Script to help create an Xcode project for ArpVision Native
# This script provides instructions and can open Xcode

echo "ArpVision Native - Xcode Project Setup"
echo "======================================="
echo ""
echo "This script will help you set up the Xcode project."
echo ""
echo "Option 1: Create project manually (Recommended)"
echo "  1. Open Xcode"
echo "  2. File → New → Project"
echo "  3. Select iOS → App"
echo "  4. Product Name: ArpVisionNative"
echo "  5. Interface: SwiftUI"
echo "  6. Language: Swift"
echo "  7. Save in: ios/App/"
echo "  8. Copy files from App-Native/ into the new project"
echo ""
echo "Option 2: Open existing workspace and add new target"
echo "  Opening Xcode workspace..."
echo ""

# Get the directory of this script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
WORKSPACE_DIR="$(dirname "$SCRIPT_DIR")"

if [ -f "$WORKSPACE_DIR/App.xcworkspace/contents.xcworkspacedata" ]; then
    echo "Found existing workspace. Opening..."
    open "$WORKSPACE_DIR/App.xcworkspace"
else
    echo "No existing workspace found."
    echo "Please create a new Xcode project manually."
    echo ""
    echo "Opening Xcode..."
    open -a Xcode
fi

echo ""
echo "Next steps:"
echo "  1. Create a new target or project as described above"
echo "  2. Add all files from App-Native/ to your project"
echo "  3. Build and run!"
echo ""

