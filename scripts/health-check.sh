#!/usr/bin/env bash
# Health Check Script
# Simulates checking application health endpoints.
# In production, this would hit real HTTP endpoints.

set -e

echo "🏥 Running health check..."
echo "   Checking /health endpoint..."
sleep 2
echo "   ✅ /health — 200 OK (response time: 45ms)"
echo "   Checking /ready endpoint..."
sleep 1
echo "   ✅ /ready — 200 OK (response time: 12ms)"
echo "   Checking database connectivity..."
sleep 1
echo "   ✅ Database — connected (pool: 5/20 active)"
echo ""
echo "✅ All health checks passed"
