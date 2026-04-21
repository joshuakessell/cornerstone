#!/bin/bash
set -e

echo "Verifying project tooling..."

if command -v gh &> /dev/null; then
  if gh auth status &> /dev/null; then
    echo "✓ GitHub CLI authenticated"
  else
    echo "✗ GitHub CLI not authenticated. Run: gh auth login"
    exit 1
  fi
else
  echo "⚠ GitHub CLI not installed. Run: brew install gh"
fi

if command -v vercel &> /dev/null; then
  if vercel whoami &> /dev/null; then
    echo "✓ Vercel CLI authenticated"
  else
    echo "✗ Vercel CLI not authenticated. Run: vercel login"
    exit 1
  fi
else
  echo "⚠ Vercel CLI not installed. Run: npm i -g vercel"
fi

if command -v codebase-memory-mcp &> /dev/null; then
  echo "✓ codebase-memory-mcp installed ($(codebase-memory-mcp --version 2>/dev/null | head -1))"
else
  echo "⚠ codebase-memory-mcp not installed. Run: ~/.claude/install-graph-tools.sh"
fi

echo ""
echo "Tooling verification complete!"
