#!/usr/bin/env bash
# Traffic Simulation Script
# Simulates shifting traffic between stable and canary deployments.
# Usage: ./simulate-traffic.sh <percentage>

set -e

PERCENTAGE=${1:-10}
STABLE=$((100 - PERCENTAGE))

echo "🔀 Traffic Shift Configuration"
echo "   ├── Canary:  ${PERCENTAGE}%"
echo "   └── Stable:  ${STABLE}%"
echo ""
echo "Applying traffic rules..."
sleep 2

# Simulate gradual shift with progress
echo "   [$(printf '█%.0s' $(seq 1 $((PERCENTAGE / 5))))$(printf '░%.0s' $(seq 1 $((20 - PERCENTAGE / 5))))] ${PERCENTAGE}% → canary"
echo ""
echo "✅ Traffic split active: ${PERCENTAGE}% canary / ${STABLE}% stable"

# Simulate request logging
echo ""
echo "📊 Sample traffic (last 10 requests):"
for i in $(seq 1 10); do
  if [ $((RANDOM % 100)) -lt "$PERCENTAGE" ]; then
    echo "   → request #$i → canary"
  else
    echo "   → request #$i → stable"
  fi
done
