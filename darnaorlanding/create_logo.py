from PIL import Image
import os

# Open the SVG and convert to PNG (using ImageMagick)
os.system('convert -density 300 "/c/Users/darna/claudeproject/darnaorlanding/images/logo FitForever.svg" -trim +repage "/c/Users/darna/claudeproject/darnaorlanding/images/logo-icon.png"')

# Crop to square (just the circle/main element)
try:
    img = Image.open('/c/Users/darna/claudeproject/darnaorlanding/images/logo-icon.png')
    width, height = img.size
    # Get the smaller dimension for a square crop
    size = min(width, height)
    left = (width - size) // 2
    top = (height - size) // 2
    right = left + size
    bottom = top + size
    
    # Crop to square
    cropped = img.crop((left, top, right, bottom))
    # Resize to favicon size
    cropped = cropped.resize((512, 512), Image.Resampling.LANCZOS)
    cropped.save('/c/Users/darna/claudeproject/darnaorlanding/images/logo-icon.png')
    print("Logo cropped successfully")
except Exception as e:
    print(f"Error: {e}")
