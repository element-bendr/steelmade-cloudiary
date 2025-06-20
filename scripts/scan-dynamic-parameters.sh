#!/bin/bash

# Script to find all dynamic route directories and report their parameter names

SCRIPT_DIR="$(dirname "$0")"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
APP_DIR="$PROJECT_ROOT/app"

echo "Scanning for dynamic route directories in: $APP_DIR"
echo "==================================================="

# Find all directories that match the pattern [*]
find "$APP_DIR" -type d -name "[[]*[]]*" | while read dir; do
  # Extract the parameter name without brackets
  param_name=$(basename "$dir" | sed 's/\[\(.*\)\]/\1/')
  
  # Calculate path depth to determine expected parameter name
  rel_path="${dir#$APP_DIR/}"
  depth=$(echo "$rel_path" | tr -cd '/' | wc -c)
  depth=$((depth + 1))
  
  # Determine the expected parameter name based on depth
  case $depth in
    1) expected="categoryId" ;;
    2) expected="seriesId" ;;
    3) expected="productId" ;;
    4) expected="variantId" ;;
    *) expected="level${depth}Id" ;;
  esac
  
  # Print directory info
  echo "Directory: $dir"
  echo "  Parameter: $param_name"
  echo "  Depth: $depth"
  echo "  Expected: $expected"
  
  # Check if the parameter name matches the expected one
  if [ "$param_name" != "$expected" ]; then
    echo "  ⚠️  MISMATCH: Parameter should be $expected"
    
    # Calculate the new directory name
    parent_dir=$(dirname "$dir")
    new_dir="$parent_dir/[$expected]"
    
    echo "  ✓  Should rename to: $new_dir"
  else
    echo "  ✓  Parameter name is correct"
  fi
  
  echo ""
done

echo "==================================================="
echo "To fix parameter naming issues, run: node scripts/fix-parameter-inconsistency.js"