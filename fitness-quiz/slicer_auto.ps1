# Auto-slicer for body composition tables
# Run from c:\Users\darna\claudeproject\fitness-quiz\
# Output: fitness-quiz/images/  (m_8_1.png ... f_40_3.png)

Add-Type -AssemblyName System.Drawing

$outDir = "c:\Users\darna\claudeproject\fitness-quiz\images"
if (-not (Test-Path $outDir)) { New-Item -ItemType Directory $outDir | Out-Null }

# ─── MALE IMAGE ───────────────────────────────────────────────
# 2095 x 1536 px | 9 columns (fat%) × 6 rows (muscle) + header row
$maleFile = "c:\Users\darna\claudeproject\menbodyfatprentage.png"
$fatCols   = @(8, 12, 16, 20, 24, 28, 32, 36, 40)   # 9 values
$muscleRows = 6

$imgM = [System.Drawing.Image]::FromFile($maleFile)
$W = $imgM.Width   # 2095
$H = $imgM.Height  # 1536

# Header row is ~7.5% of height (the row with "8% 12%..." text)
$headerH = [int]($H * 0.075)     # ~115 px
$cellW   = [int](($W) / 9)
$cellH   = [int](($H - $headerH) / $muscleRows)

Write-Host "Male: ${W}x${H} | header=${headerH}px | cell=${cellW}x${cellH}px"

for ($col = 0; $col -lt 9; $col++) {
    for ($row = 0; $row -lt $muscleRows; $row++) {
        $x1 = $col * $cellW
        $y1 = $headerH + ($row * $cellH)

        # Slight inset (+2px each side) to avoid grid separator lines
        $inset = 2
        $cropRect = [System.Drawing.Rectangle]::new($x1 + $inset, $y1 + $inset, $cellW - $inset*2, $cellH - $inset*2)

        $cell = [System.Drawing.Bitmap]::new($cropRect.Width, $cropRect.Height)
        $g    = [System.Drawing.Graphics]::FromImage($cell)
        $g.DrawImage($imgM, [System.Drawing.Rectangle]::new(0,0,$cropRect.Width,$cropRect.Height), $cropRect, [System.Drawing.GraphicsUnit]::Pixel)
        $g.Dispose()

        # row 0 (top) = most muscular = level 6; row 5 = least = level 1
        $muscleLevel = $muscleRows - $row
        $fat = $fatCols[$col]
        $outPath = "$outDir\m_${fat}_${muscleLevel}.png"
        $cell.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
        $cell.Dispose()
        Write-Host "  Saved: m_${fat}_${muscleLevel}.png"
    }
}
$imgM.Dispose()
Write-Host "Male done: $($fatCols.Count * $muscleRows) files"

# ─── FEMALE IMAGE ─────────────────────────────────────────────
# 372 x 552 px | 3 columns (muscle) × 7 rows (fat%) + right-side label bubbles
$femaleFile = "c:\Users\darna\claudeproject\womenbodyfatrefrence.png"
$fatRowsF   = @(16, 20, 24, 28, 32, 36, 40)   # 7 values
$muscleColsF = 3

$imgF = [System.Drawing.Image]::FromFile($femaleFile)
$Wf = $imgF.Width   # 372
$Hf = $imgF.Height  # 552

# Right side has label bubbles — crop ~14% from right
$rightCrop  = [int]($Wf * 0.14)   # ~52px
$usableW    = $Wf - $rightCrop
$cellWf     = [int]($usableW / $muscleColsF)
$cellHf     = [int]($Hf / $fatRowsF.Count)

Write-Host "Female: ${Wf}x${Hf} | rightCrop=${rightCrop}px | cell=${cellWf}x${cellHf}px"

for ($row = 0; $row -lt $fatRowsF.Count; $row++) {
    for ($col = 0; $col -lt $muscleColsF; $col++) {
        $x1 = $col * $cellWf
        $y1 = $row * $cellHf

        $inset = 1
        $cropRect = [System.Drawing.Rectangle]::new($x1 + $inset, $y1 + $inset, $cellWf - $inset*2, $cellHf - $inset*2)

        $cell = [System.Drawing.Bitmap]::new($cropRect.Width, $cropRect.Height)
        $g    = [System.Drawing.Graphics]::FromImage($cell)
        $g.DrawImage($imgF, [System.Drawing.Rectangle]::new(0,0,$cropRect.Width,$cropRect.Height), $cropRect, [System.Drawing.GraphicsUnit]::Pixel)
        $g.Dispose()

        $muscleLevel = $col + 1   # 1=left(least muscular), 3=right(most)
        $fat = $fatRowsF[$row]
        $outPath = "$outDir\f_${fat}_${muscleLevel}.png"
        $cell.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
        $cell.Dispose()
        Write-Host "  Saved: f_${fat}_${muscleLevel}.png"
    }
}
$imgF.Dispose()
Write-Host "Female done: $($fatRowsF.Count * $muscleColsF) files"

Write-Host ""
Write-Host "=== COMPLETE ==="
$total = (Get-ChildItem $outDir -Filter "*.png").Count
Write-Host "Total files in $outDir : $total"
