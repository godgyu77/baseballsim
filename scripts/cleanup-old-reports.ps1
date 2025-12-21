$ErrorActionPreference = 'Stop'

$cutoff = (Get-Date).AddDays(-7)

function Remove-OldMarkdownFiles([string]$path, [string[]]$excludeNames) {
  if (-not (Test-Path -LiteralPath $path)) { return }

  Get-ChildItem -LiteralPath $path -Recurse -File -Filter *.md |
    Where-Object { $_.LastWriteTime -lt $cutoff -and ($excludeNames -notcontains $_.Name) } |
    ForEach-Object {
      Write-Host ("DELETE " + $_.FullName)
      Remove-Item -LiteralPath $_.FullName -Force
    }
}

# 1) 보고서/분석 디렉토리(README 제외)
Remove-OldMarkdownFiles -path 'docs/reports' -excludeNames @('README.md')
Remove-OldMarkdownFiles -path 'docs/analysis' -excludeNames @('README.md')

# 2) docs 루트의 보고서성 파일(7일 초과)
if (Test-Path -LiteralPath 'docs') {
  Get-ChildItem -LiteralPath 'docs' -File -Filter *.md |
    Where-Object {
      $_.LastWriteTime -lt $cutoff -and (
        $_.Name -match 'REPORT|AUDIT|ANALYSIS|SUMMARY'
      )
    } |
    ForEach-Object {
      Write-Host ("DELETE " + $_.FullName)
      Remove-Item -LiteralPath $_.FullName -Force
    }
}

Write-Host "DONE"


