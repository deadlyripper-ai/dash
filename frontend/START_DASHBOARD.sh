#!/bin/bash

# Inception Dashboard — Local Server Starter
# This script starts the dashboard on your Mac

PORT=${1:-3000}

echo "🚀 Starting Inception Dashboard..."
echo "📊 Dashboard will open at: http://localhost:$PORT"
echo ""

# Check if we have Node.js
if command -v node &> /dev/null; then
    echo "✅ Using Node.js"
    npm start -- -p $PORT
elif command -v python3 &> /dev/null; then
    echo "✅ Using Python 3"
    cd "$(dirname "$0")"
    python3 -m http.server $PORT --directory .
    exit $?
else
    echo "❌ Error: Neither Node.js nor Python found"
    exit 1
fi
