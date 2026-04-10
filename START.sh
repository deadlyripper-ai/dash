#!/bin/bash

# Inception Efficiency Dashboard — Local Start Script
# Run this to start both backend + frontend simultaneously

echo "════════════════════════════════════════════════════════"
echo "🚀 Inception Efficiency Dashboard — Local Testing"
echo "════════════════════════════════════════════════════════"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if backend node_modules exist
if [ ! -d "backend/node_modules" ]; then
  echo -e "${YELLOW}📦 Installing backend dependencies...${NC}"
  cd backend
  npm install --silent
  cd ..
fi

# Check if frontend node_modules exist
if [ ! -d "frontend/node_modules" ]; then
  echo -e "${YELLOW}📦 Installing frontend dependencies...${NC}"
  cd frontend
  npm install --silent
  cd ..
fi

echo ""
echo -e "${BLUE}Starting services...${NC}"
echo ""

# Start backend in background
echo -e "${GREEN}✓ Starting backend on http://localhost:3001${NC}"
cd backend
npm run dev > /tmp/backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Wait for backend to be ready
sleep 2

# Start frontend in background
echo -e "${GREEN}✓ Starting frontend on http://localhost:3000${NC}"
cd frontend
npm run dev > /tmp/frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

echo ""
echo "════════════════════════════════════════════════════════"
echo "✅ Services started!"
echo "════════════════════════════════════════════════════════"
echo ""
echo -e "${BLUE}📊 Dashboard:${NC}"
echo "   http://localhost:3000/dashboard/overview"
echo ""
echo -e "${BLUE}🔌 API Endpoints:${NC}"
echo "   http://localhost:3001/api/kpis/overview"
echo "   http://localhost:3001/api/okrs"
echo "   http://localhost:3001/api/projects"
echo "   http://localhost:3001/api/pipeline"
echo ""
echo -e "${BLUE}📋 Logs:${NC}"
echo "   Backend:  tail -f /tmp/backend.log"
echo "   Frontend: tail -f /tmp/frontend.log"
echo ""
echo -e "${YELLOW}⌨️  Press Ctrl+C to stop all services${NC}"
echo ""

# Handle cleanup on exit
cleanup() {
  echo ""
  echo -e "${YELLOW}🛑 Stopping services...${NC}"
  kill $BACKEND_PID 2>/dev/null
  kill $FRONTEND_PID 2>/dev/null
  echo -e "${GREEN}✓ Services stopped${NC}"
}

trap cleanup EXIT INT TERM

# Keep script running
wait
