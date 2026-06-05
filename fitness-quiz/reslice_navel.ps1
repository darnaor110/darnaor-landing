Add-Type -AssemblyName System.Drawing

$OutputDir = "c:\Users\darna\claudeproject\fitness-quiz\images"
$outW = 200          # fixed output size (square 200×200 px)
$outH = 200
$navelAt = 0.5       # navel lands at 50% from top of the output crop

# ─── MALE IMAGE ──────────────────────────────────────────────────────────────
# Source: 2095×1536, 9 fat% cols × 6 muscle rows + header row
$srcM = [System.Drawing.Image]::FromFile("c:\Users\darna\claudeproject\menbodyfatprentage.png")
$fatCols_M    = @(8, 12, 16, 20, 24, 28, 32, 36, 40)
$muscleRows_M = 6
$headerH_M    = [int]($srcM.Height * 0.075)  # ~115px header row with % labels
$cellH_M      = ($srcM.Height - $headerH_M) / $muscleRows_M
$cellW_M      = $srcM.Width / $fatCols_M.Count
$navelFrac_M  = 0.50  # navel is at ~50% of cell height in this image

Write-Host "Male image: $($srcM.Width)x$($srcM.Height), cellH=$([int]$cellH_M), headerH=$headerH_M"

for ($row = 0; $row -lt $muscleRows_M; $row++) {
    for ($colIdx = 0; $colIdx -lt $fatCols_M.Count; $colIdx++) {
        $fat = $fatCols_M[$colIdx]
        # Row 0 (top) = least muscular in source → muscleLevel 6
        # Row 5 (bottom) = most muscular in source → muscleLevel 1
        $muscleLevel = $muscleRows_M - $row

        # Cell center X (used to crop outW wide area centered in the cell)
        $cellCenterX = ($colIdx + 0.5) * $cellW_M
        $cropX = [int]($cellCenterX - $outW / 2)
        $cropX = [Math]::Max(0, [Math]::Min($cropX, $srcM.Width - $outW))

        # Navel Y position in source image, crop centered on it
        $navelY = [int]($headerH_M + $row * $cellH_M + $navelFrac_M * $cellH_M)
        $cropY  = [int]($navelY - $outH * $navelAt)
        $cropY  = [Math]::Max(0, [Math]::Min($cropY, $srcM.Height - $outH))

        $bmp = New-Object System.Drawing.Bitmap($outW, $outH)
        $gfx = [System.Drawing.Graphics]::FromImage($bmp)
        $gfx.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $gfx.DrawImage($srcM,
            [System.Drawing.Rectangle]::new(0, 0, $outW, $outH),
            [System.Drawing.Rectangle]::new($cropX, $cropY, $outW, $outH),
            [System.Drawing.GraphicsUnit]::Pixel)
        $gfx.Dispose()
        $bmp.Save("$OutputDir\m_${fat}_${muscleLevel}.png", [System.Drawing.Imaging.ImageFormat]::Png)
        $bmp.Dispose()
    }
}
$srcM.Dispose()
Write-Host "Male: DONE (54 images)"

# ─── FEMALE IMAGE ────────────────────────────────────────────────────────────
# Source: 1873×963, 8 fat% cols × 4 muscle rows (no header)
$srcF = [System.Drawing.Image]::FromFile("c:\Users\darna\claudeproject\fitness-quiz\images\womennewBFP.png")
$fatCols_F    = @(16, 20, 24, 28, 32, 36, 40, 44)
$muscleRows_F = 4
$cellH_F      = $srcF.Height / $muscleRows_F
$cellW_F      = $srcF.Width / $fatCols_F.Count
$navelFrac_F  = 0.55  # navel is at ~55% of cell height in this image

Write-Host "Female image: $($srcF.Width)x$($srcF.Height), cellH=$([int]$cellH_F)"

for ($row = 0; $row -lt $muscleRows_F; $row++) {
    for ($colIdx = 0; $colIdx -lt $fatCols_F.Count; $colIdx++) {
        $fat = $fatCols_F[$colIdx]
        # Row 0 (top) = least muscular → muscleLevel 4
        # Row 3 (bottom) = most muscular → muscleLevel 1
        $muscleLevel = $muscleRows_F - $row

        $cellCenterX = ($colIdx + 0.5) * $cellW_F
        $cropX = [int]($cellCenterX - $outW / 2)
        $cropX = [Math]::Max(0, [Math]::Min($cropX, $srcF.Width - $outW))

        $navelY = [int]($row * $cellH_F + $navelFrac_F * $cellH_F)
        $cropY  = [int]($navelY - $outH * $navelAt)
        $cropY  = [Math]::Max(0, [Math]::Min($cropY, $srcF.Height - $outH))

        $bmp = New-Object System.Drawing.Bitmap($outW, $outH)
        $gfx = [System.Drawing.Graphics]::FromImage($bmp)
        $gfx.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $gfx.DrawImage($srcF,
            [System.Drawing.Rectangle]::new(0, 0, $outW, $outH),
            [System.Drawing.Rectangle]::new($cropX, $cropY, $outW, $outH),
            [System.Drawing.GraphicsUnit]::Pixel)
        $gfx.Dispose()
        $bmp.Save("$OutputDir\f_${fat}_${muscleLevel}.png", [System.Drawing.Imaging.ImageFormat]::Png)
        $bmp.Dispose()
    }
}
$srcF.Dispose()
Write-Host "Female: DONE (32 images)"
Write-Host "All done! Total: 86 images in $OutputDir"
