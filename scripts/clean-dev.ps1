# clean-dev.ps1 - Arranque limpio para portfolio-3d (Next.js)
# Uso: npm run dev:clean

Write-Host "Verificando puertos 3000 y 3001..." -ForegroundColor Cyan

foreach ($port in @(3000, 3001)) {
  $result = netstat -ano | Select-String "\:$port\s"
  if ($result) {
    $pid_list = @()
    foreach ($line in $result) {
      $parts = ($line.ToString().Trim()) -split '\s+'
      $last = $parts[$parts.Length - 1]
      if ($last -match '^\d+$' -and $last -ne '0') {
        $pid_list += $last
      }
    }
    $pid_list = $pid_list | Sort-Object -Unique
    foreach ($p in $pid_list) {
      Write-Host "  Puerto $port ocupado por PID $p - matando proceso..." -ForegroundColor Yellow
      taskkill /PID $p /F 2>$null
      Write-Host "  PID $p terminado." -ForegroundColor Green
    }
  } else {
    Write-Host "  Puerto $port libre." -ForegroundColor Green
  }
}

Write-Host ""
Write-Host "Limpiando cache de Next.js (.next/dev)..." -ForegroundColor Cyan

if (Test-Path ".\.next\dev") {
  Remove-Item -Recurse -Force ".\.next\dev"
  Write-Host "  Cache dev eliminada." -ForegroundColor Green
} else {
  Write-Host "  No habia cache dev." -ForegroundColor Gray
}

Write-Host ""
Write-Host "Arrancando servidor de desarrollo..." -ForegroundColor Magenta
npm run dev
