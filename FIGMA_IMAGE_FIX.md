# Figma Image Download Issues & Solutions

## Current Issues

### 1. Logo Mismatch Problem
**Problem**: Both Navigation and Testimonials components are using the same image file (`0e1e238a26444c8cba519ce5114ec632284ffba6.png`), which appears to be the Zirkley logo. The Innovin Labs logo is not displaying correctly.

**Root Cause**: Figma Desktop MCP tool generates hash-based filenames based on image content. If two different images have the same hash, they're treated as the same file. This suggests:
- The Innovin Labs logo and Zirkley logo might be the same image instance in Figma, OR
- The wrong image was downloaded for the Navigation component

### 2. Tech Stack Logos Not Displaying
**Problem**: TechStack component shows text placeholders instead of actual logo images.

**Solution**: 39 SVG logo files have been downloaded. The component needs to be updated to use these SVG files instead of text.

### 3. Hash-Based Filenames
**Problem**: Figma Desktop MCP tool always generates hash-based filenames (e.g., `0e1e238a26444c8cba519ce5114ec632284ffba6.png`) instead of descriptive names.

**Solution**: A mapping layer has been created in `lib/imageMapping.ts` to provide descriptive names in code.

## How to Fix the Logo Issue

### Step 1: Verify in Figma Desktop
1. Open your Figma file
2. Check that the **Innovin Labs logo** (used in Navigation) and **Zirkley logo** (used in Testimonials) are **separate image assets**
3. If they're the same instance, create separate instances or use different logo images

### Step 2: Download Innovin Labs Logo Separately
1. In Figma Desktop, select **only the Navigation component/frame** (not the entire home page)
2. Make sure the Innovin Labs logo is visible in the selected frame
3. The MCP tool will download images with hash-based names
4. Check the downloaded file - it should have a **different hash** than the Zirkley logo
5. Update `components/Navigation.tsx` to use the new hash

### Step 3: Update Component References
Once you have the correct Innovin Labs logo file, update:
- `components/Navigation.tsx` - Use the new Innovin Labs logo hash
- `components/Testimonials.tsx` - Keep using the Zirkley logo hash

## Tech Stack Logo Mapping

The 39 SVG files downloaded correspond to tech stack logos. To properly map them:

1. In Figma Desktop, select the **Tech Stack component** (Component 10)
2. Note the order of logos in the design
3. Match each SVG file to its corresponding technology
4. Update `components/TechStack.tsx` to use the mapped SVG files

## Alternative: Manual Image Naming

If you want descriptive filenames:
1. Download images from Figma manually (Export → PNG/SVG)
2. Rename them with descriptive names (e.g., `innovin-labs-logo.png`, `zirkley-logo.png`)
3. Place them in `public/images/`
4. Update component references to use the new filenames

## Image Mapping File

See `lib/imageMapping.ts` for a centralized mapping of hash-based filenames to descriptive names. This makes it easier to:
- Understand what each image is
- Update references if images change
- Maintain the codebase

