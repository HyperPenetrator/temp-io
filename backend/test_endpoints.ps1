# Test script for backend endpoints
# Run this from PowerShell with the backend server running

$base = 'http://localhost:8000'

Write-Host "Testing health..."
try{
  $h = Invoke-RestMethod -Uri "$base/api/health" -ErrorAction Stop
  Write-Host "Health:" ($h | ConvertTo-Json -Depth 1)
}catch{
  Write-Host "Health check failed: $_" -ForegroundColor Red
}

Write-Host "\nTesting geocode suggest (Karnataka, query 'Benga')..."
try{
  $g = Invoke-RestMethod -Uri "$base/api/geocode/suggest?state=Karnataka&q=Benga" -ErrorAction Stop
  Write-Host "Suggest results:" ($g | ConvertTo-Json -Depth 2)
}catch{
  Write-Host "Suggest failed: $_" -ForegroundColor Red
}

Write-Host "\nTesting by-region (Karnataka, Bengaluru)..."
try{
  $r = Invoke-RestMethod -Uri "$base/api/weather/by-region?state=Karnataka&district=Bengaluru" -ErrorAction Stop
  Write-Host "By-region:" ($r | ConvertTo-Json -Depth 3)
}catch{
  Write-Host "By-region failed: $_" -ForegroundColor Red
}

Write-Host "\nTesting AI endpoint (rule-based)..."
$body = @{ query = 'Will it rain today?'; lat = 12.9716; lon = 77.5946 } | ConvertTo-Json
try{
  $a = Invoke-RestMethod -Uri "$base/api/ai/query" -Method POST -Body $body -ContentType 'application/json' -ErrorAction Stop
  Write-Host "AI response:" ($a | ConvertTo-Json -Depth 2)
}catch{
  Write-Host "AI failed: $_" -ForegroundColor Red
}

Write-Host "\nAll tests done." 
