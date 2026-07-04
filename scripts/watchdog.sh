#!/bin/bash
cd /home/z/my-project

LOG=/home/z/my-project/dev.log
PID_FILE=/tmp/sportsphere-server.pid

# Function to start server
start_server() {
  # Kill any existing
  pkill -9 -f "next dev" 2>/dev/null
  pkill -9 -f "next-server" 2>/dev/null
  sleep 1
  
  # Start dev server
  bun run dev > "$LOG" 2>&1 &
  SERVER_PID=$!
  echo $SERVER_PID > $PID_FILE
  echo "[$(date)] Server started with PID $SERVER_PID" >> "$LOG"
  
  # Wait for it to be ready
  for i in $(seq 1 30); do
    if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/ --max-time 2 | grep -q "200\|304"; then
      echo "[$(date)] Server is ready!" >> "$LOG"
      return 0
    fi
    sleep 1
  done
  echo "[$(date)] Server failed to start in 30s" >> "$LOG"
  return 1
}

# Function to check if server is alive
server_alive() {
  if [ -f "$PID_FILE" ] && kill -0 $(cat $PID_FILE) 2>/dev/null; then
    # Process exists, check if it responds
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/ --max-time 3 2>/dev/null)
    if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "304" ]; then
      return 0
    fi
  fi
  return 1
}

# Main loop
echo "[$(date)] Watchdog started" >> "$LOG"

# Initial start
start_server

# Monitor loop — runs forever
while true; do
  # Check every 15 seconds
  sleep 15
  
  # Ping the server to keep sandbox alive
  curl -s -o /dev/null http://localhost:3000/api/settings/theme --max-time 5 2>/dev/null
  
  # Check if server is alive
  if ! server_alive; then
    echo "[$(date)] Server died, restarting..." >> "$LOG"
    start_server
  fi
done
