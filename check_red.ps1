Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromFile('C:/Users/Chamindu/.gemini/antigravity/brain/be8c9391-ebe8-4a24-95bc-48de60a8ca9f/.user_uploaded/media_1793710716835_00c2821d.jpg')
$points = [System.Collections.Generic.List[object]]::new()
for ($y = 0; $y -lt $bmp.Height; $y += 2) {
    for ($x = 0; $x -lt $bmp.Width; $x += 2) {
        $p = $bmp.GetPixel($x, $y)
        # Check for orange/red drawn lines
        if ($p.R -gt 200 -and $p.G -gt 50 -and $p.G -lt 140 -and $p.B -lt 60) {
            $points.Add([PSCustomObject]@{ X = $x; Y = $y; R = $p.R; G = $p.G; B = $p.B })
        }
    }
}
$bmp.Dispose()
Write-Host "Total orange-red points: $($points.Count)"
$xGroups = $points | Group-Object X | Sort-Object Count -Descending | Select-Object -First 10
foreach ($g in $xGroups) {
    Write-Host "X = $($g.Name), Count = $($g.Count)"
}
