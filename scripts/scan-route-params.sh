#!/bin/bash

# This script scans the app directory for dynamic route parameters
# and helps identify inconsistencies

# Define the app directory
APP_DIR="e:/steelmade-cloudiary-chairs/app"

# Function to extract parameters from folder names
extract_params() {
  find "$APP_DIR" -type d -name "[[]*[]]*" | while read dir; do
    # Extract the parameter name without brackets
    param_name=$(basename "$dir" | sed 's/\[\(.*\)\]/\1/')
    echo "$(dirname "$dir" | sed "s|$APP_DIR||"): $param_name"
  done
}

# Display header
echo "=== Dynamic Route Parameter Analysis ==="
echo "Looking for parameter inconsistencies..."
echo

# Extract and display parameters
echo "Parameters by directory path:"
extract_params | sort

echo
echo "=== Analysis Complete ==="
echo "To fix: Ensure consistent parameter naming at each level of the URL path"
echo "- First level should always use 'categoryId'"
echo "- Second level should always use 'seriesId'"
echo "- Third level should always use 'productId'"