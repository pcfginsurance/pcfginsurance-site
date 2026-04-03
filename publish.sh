#!/bin/bash
# publish.sh — Build and deploy the PCFG website
# Usage: ./publish.sh "Commit message"
# Runs build in background so agent sessions don't time out mid-build.

set -e

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
MSG="${1:-Publish website update}"
LOG="/tmp/pcfg_publish.log"

cd "$REPO_DIR"

echo "[publish] Starting build at $(date)" | tee "$LOG"
echo "[publish] Message: $MSG" | tee -a "$LOG"

# Build
npm run build >> "$LOG" 2>&1
echo "[publish] Build complete at $(date)" | tee -a "$LOG"

# Stage and commit everything (src + dist)
git add -A
git diff --cached --stat | tee -a "$LOG"

if git diff --cached --quiet; then
  echo "[publish] Nothing to commit — already up to date." | tee -a "$LOG"
  exit 0
fi

git commit -m "$MSG" >> "$LOG" 2>&1
git push origin main >> "$LOG" 2>&1

echo "[publish] Done. Pushed to GitHub at $(date)" | tee -a "$LOG"
echo "[publish] Netlify will auto-deploy. Log: $LOG"
