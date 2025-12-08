# Asset Download Scripts

## About Us Page Assets

### Quick Check
Run the asset checker to see which assets are missing:
```bash
npm run check-assets
```

### Downloading Assets

**Option 1: Automatic Download via Figma MCP (Recommended)**
1. Open Figma Desktop application
2. Select the "About Us" page/frame in Figma
3. The assets will automatically download to `public/images/` when the design context is fetched

**Option 2: Manual Export**
1. Open Figma Desktop
2. Select each image/asset
3. Right-click → Export → Choose PNG format
4. Save to `public/images/` with the exact filename from the component

### Required Assets

**Hero Section:**
- `efdf1ab711ffad6d48b3163655ede5890772aaf2.png` (Hero background)

**Team Photos:**
- `573ac6c833b631241442f52f9339c8f43a7bcb76.png`
- `d7fbbc268730dca1329c17ec05aad7e281134f4f.png`
- `af0d73906f117e3a32a5cb2964335364aff6973e.png`
- `e87e7e5ce49a5f43a07cdf9755cceca7ff36ee28.png`

**Leadership Team:**
- `ea9ab769881ecbef17a1ee8f61ef0d854e440010.png` (Vidyanand)
- `1ff65672b25e8ee1fea3e17ba66c200d1c3294f2.png` (Sujith)
- `229320ea590322c52ad0db8e7533da4cd67039f2.png` (Sreeprabha)
- `933fecc62b2892d17dfc22100b977c6d0d0c8765.png` (Stallon)
- `7677f8afea32b88a8e5c37524020b9e07fcacbd5.png` (Vineetha)
- `397fbb475b8669ae9e88c4783d18e3330f7e69ec.png` (Himanshu)
- `26ae0043f4b22f49b21a70a7456c7256843e767c.png` (Sreekanth)

**Core Values Icons:**
- SVG icons are embedded in the component (may be downloaded separately if needed)

### Notes
- The component will automatically fallback to `.jpg` format if `.png` is not found
- File names must match exactly (case-sensitive)
- All assets should be in `public/images/` directory

