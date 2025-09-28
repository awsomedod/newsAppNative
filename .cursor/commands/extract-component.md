# Extract Component

## Overview

Take selected JSX code and move it into its own reusable component file for better readability and organization.

## Instructions

When this command is used:

1. Identify the JSX code that should be refactored into its own component.
2. Generate a descriptive and appropriate component name automatically based on the JSX contents
3. Create a new React component file with the following:
   - Import statements for any used dependencies (React, icons, etc.).
   - The extracted JSX wrapped in a functional component with the generated name.
   - Export of the new component.
4. Replace the original JSX with a component call using the generated name.
