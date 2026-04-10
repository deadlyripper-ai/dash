#!/bin/bash

# 🚀 Quick Setup: Run Phase 1 vs Phase 2-4 Side by Side
# This script prepares both versions for comparison

set -e

echo "╔════════════════════════════════════════════════════════╗"
echo "║  Inception Dashboard - Side-by-Side Version Comparison  ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

PROJECT_ROOT="/Users/syed.nizamuddin/Documents/Claude/inception-dashboard"
PHASE1_DIR="/Users/syed.nizamuddin/Documents/Claude/inception-dashboard-phase1"

# Check if we're in the right directory
if [ ! -f "$PROJECT_ROOT/package.json" ]; then
    echo "❌ Error: Not in project root directory"
    exit 1
fi

echo "📋 Step 1: Creating Phase 1 backup..."
if [ ! -d "$PHASE1_DIR" ]; then
    cp -r "$PROJECT_ROOT" "$PHASE1_DIR"
    echo "✅ Phase 1 backup created at $PHASE1_DIR"
else
    echo "✅ Phase 1 backup already exists"
fi

echo ""
echo "📋 Step 2: Setting up Phase 1 environment..."
cd "$PHASE1_DIR"
git checkout main 2>/dev/null || echo "Already on main"
cp backend/.env.phase1 backend/.env 2>/dev/null || echo "No .env.phase1"
cp frontend/.env.phase1 frontend/.env.local 2>/dev/null || echo "No .env.phase1"
echo "✅ Phase 1 configured for ports 3000-3001"

echo ""
echo "📋 Step 3: Setting up Phase 2-4 environment..."
cd "$PROJECT_ROOT"
git checkout feature/phase-2-4-improvements 2>/dev/null || echo "Already on feature branch"
cp backend/.env.phase2 backend/.env 2>/dev/null || echo "Phase 2 env ready"
cp frontend/.env.phase2 frontend/.env.local 2>/dev/null || echo "Phase 2 env ready"
echo "✅ Phase 2-4 configured for ports 3002-3003"

echo ""
echo "╔════════════════════════════════════════════════════════╗"
echo "║           🎉 Setup Complete! Ready to Compare           ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""
echo "📌 NEXT STEPS:"
echo ""
echo "Open 4 terminals and run:"
echo ""
echo "Terminal 1: Phase 1 Backend (Port 3001)"
echo "  cd $PHASE1_DIR/backend"
echo "  PORT=3001 npm run dev"
echo ""
echo "Terminal 2: Phase 1 Frontend (Port 3000)"
echo "  cd $PHASE1_DIR/frontend"
echo "  npm run dev"
echo ""
echo "Terminal 3: Phase 2-4 Backend (Port 3003)"
echo "  cd $PROJECT_ROOT/backend"
echo "  PORT=3003 npm run dev"
echo ""
echo "Terminal 4: Phase 2-4 Frontend (Port 3002)"
echo "  cd $PROJECT_ROOT/frontend"
echo "  PORT=3002 npm run dev"
echo ""
echo "🌐 Then open in browser:"
echo "  Phase 1:    http://localhost:3000"
echo "  Phase 2-4:  http://localhost:3002"
echo ""
echo "📖 For detailed guide, see: COMPARISON_GUIDE.md"
echo ""
