#!/bin/bash

# JobFlow Pro Setup Script

# Install Python 3 if not available
if ! command -v python3 &> /dev/null
then
    echo "Python3 is not installed. Please install Python3 to continue."
    exit 1
fi

# Start a local HTTP server
echo "Starting JobFlow Pro at http://localhost:8000 ..."
python3 -m http.server 8000

# (Optional) Detect OS and open browser automatically
if command -v xdg-open &> /dev/null; then
  xdg-open http://localhost:8000
elif command -v open &> /dev/null; then
  open http://localhost:8000
fi
