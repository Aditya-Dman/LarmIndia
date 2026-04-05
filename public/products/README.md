# Product Images Setup Guide

## Directory Structure
Your product images should be organized in the following structure:

```
public/
  products/
    seeds/
      - chia-seeds.png
      - mix-seeds.png
      - pumpkin-seeds.png
      - quinoa-seeds.png
      - ragi-seeds.png
      - red-quinoa-seeds.png
    herbs/
      - mixed-herbs.png
      - oregano-flakes.png
      - rosemary.png
      - basil.png
      - parsley.png
      - sage.png
    ingredients/
      - potato-powder.png
      - tomato-powder.png
      - white-onion-powder.png
      - garlic-powder.png
      - pink-onion-powder.png
      - red-onion-powder.png
    fresheners/
      - black-currant.png
      - green-escort-mixture.png
      - mix-fruit-candy.png
      - ram-ladoo.png
      - royal-fresh-mix-2.png
      - royal-fresh-mix.png
    spices/
      - garam-masala.png
      - cumin-powder.png
      - coriander-powder.png
      - turmeric-powder.png
```

## How to Add Images

### Option 1: Using File Explorer
1. Navigate to your project folder: `c:\Users\hp\Downloads\larmindia\public\products\`
2. Inside each folder (seeds, herbs, ingredients, fresheners, spices), add your product images
3. Name them exactly as listed above (use lowercase with hyphens)
4. The website will automatically display them!

### Option 2: Using VS Code
1. In VS Code Explorer, expand the `public/products/` folder
2. Right-click on each category folder and "Reveal in File Explorer"
3. Drag and drop your images there
4. Refresh the website to see them!

## Image Requirements
- **Format**: PNG, JPG, or WebP
- **Size**: 300x300 pixels recommended (for best quality)
- **File size**: Smaller than 500KB each for faster loading
- **Quality**: High-quality product photos for professional look

## Product Files to Add

### Seeds Folder (6 images)
- Chia Seeds
- Mix Seeds
- Pumpkin Seeds
- Quinoa Seeds
- Ragi Seeds
- Red Quinoa Seeds

### Herbs Folder (6 images)
- Mixed Herbs
- Oregano Flakes
- Rosemary
- Basil
- Parsley
- Sage

### Ingredients Folder (6 images)
- Potato Powder
- Tomato Powder
- White Onion Powder
- Garlic Powder
- Pink Onion Powder
- Red Onion Powder

### Fresheners Folder (6 images)
- Black Currant
- Green Escort Mixture
- Mix Fruit Candy
- Ram Ladoo
- Royal Fresh Mix 2
- Royal Fresh Mix

### Spices Folder (4 images)
- Garam Masala
- Cumin Powder
- Coriander Powder
- Turmeric Powder

## After Adding Images
1. Save all images to their respective folders
2. Go to http://localhost:3000/products
3. Refresh the page (Ctrl+R or Cmd+R)
4. All product images should now appear!

## Troubleshooting
- If images don't appear, check the filename spelling (must match exactly)
- Make sure images are in the correct folder
- Try clearing your browser cache (Ctrl+Shift+Delete)
- Check the browser console for any error messages
