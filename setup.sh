#!/bin/bash

# JobFlow Pro Setup Script

# Ensure script is run from project root by checking for index.html
if [ ! -f "index.html" ]; then
  echo "Please run this script from the root directory (where index.html is located)."
  exit 1
fi

# Check for Python 3
if ! command -v python3 &> /dev/null
then
    echo "Python3 is not installed. Please install Python3 to continue."
    exit 1
fi

echo "Starting JobFlow Pro at http://localhost:8000 ..."

# Start local server in background
python3 -m http.server 8000 &

SERVER_PID=$!

# Try to open the browser
if command -v xdg-open &> /dev/null; then
  xdg-open http://localhost:8000
elif command -v open &> /dev/null; then
  open http://localhost:8000
else
  echo "Please open http://localhost:8000 in your web browser."
fi

# Wait for user to exit
echo "Press [CTRL+C] to stop the server."
wait $SERVER_PID