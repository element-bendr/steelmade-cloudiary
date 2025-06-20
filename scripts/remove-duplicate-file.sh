#!/bin/bash

# This script safely removes duplicate files after ensuring they are not imported anywhere

# Usage: ./remove-duplicate-file.sh <file-path> <original-file-path>
# Example: ./remove-duplicate-file.sh lib/data/products/chairs/director-series/index-fixed.ts lib/data/products/chairs/director-series/index.ts

# Get file paths from arguments
DUPLICATE_FILE=$1
ORIGINAL_FILE=$2

if [ -z "$DUPLICATE_FILE" ] || [ -z "$ORIGINAL_FILE" ]; then
  echo "Error: Missing required arguments"
  echo "Usage: ./remove-duplicate-file.sh <file-path> <original-file-path>"
  exit 1
fi

# Check if files exist
if [ ! -f "$DUPLICATE_FILE" ]; then
  echo "Error: Duplicate file does not exist: $DUPLICATE_FILE"
  exit 1
fi

if [ ! -f "$ORIGINAL_FILE" ]; then
  echo "Error: Original file does not exist: $ORIGINAL_FILE"
  exit 1
fi

# Get base names for logs
DUPLICATE_BASE=$(basename "$DUPLICATE_FILE")
ORIGINAL_BASE=$(basename "$ORIGINAL_FILE")

echo "===== Checking for imports of $DUPLICATE_FILE ====="

# Find all potential imports of the duplicate file
IMPORT_PATH=$(echo "$DUPLICATE_FILE" | sed 's/\.[^.]*$//' | sed 's/\\/\//g')
GREP_RESULT=$(grep -r "from.*$IMPORT_PATH" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" . 2>/dev/null || echo "No imports found")

if echo "$GREP_RESULT" | grep -q "$IMPORT_PATH"; then
  echo "WARNING: File appears to be imported in other files:"
  echo "$GREP_RESULT"
  echo ""
  echo "Please update these imports to use $ORIGINAL_FILE before removing."
  echo "Operation aborted for safety."
  exit 1
else
  echo "No imports found. Safe to remove."
fi

# Create backup directory if it doesn't exist
BACKUP_DIR="./removed-duplicates-backup"
mkdir -p "$BACKUP_DIR"

# Backup the file before removal
TIMESTAMP=$(date +%Y%m%d%H%M%S)
BACKUP_FILE="$BACKUP_DIR/${DUPLICATE_BASE}_${TIMESTAMP}.bak"
cp "$DUPLICATE_FILE" "$BACKUP_FILE"
echo "Backup created at: $BACKUP_FILE"

# Remove the file
rm "$DUPLICATE_FILE"
echo "Removed: $DUPLICATE_FILE"

# Update the removed files log
LOG_FILE="./docs/removed-files-log.md"
if [ -f "$LOG_FILE" ]; then
  # Find the line containing this file in the log and update it
  TODAY=$(date +%Y-%m-%d)
  sed -i "s|$DUPLICATE_FILE | $ORIGINAL_FILE | | |$DUPLICATE_FILE | $ORIGINAL_FILE | $TODAY | Safely removed after verifying no imports reference it|" "$LOG_FILE"
  echo "Updated removal log in $LOG_FILE"
else
  echo "Warning: Could not find removed-files-log.md to update"
fi

echo "===== File removal complete ====="
echo "Next steps:"
echo "1. Run TypeScript compiler to verify no type errors"
echo "2. Test the application to ensure functionality is preserved"