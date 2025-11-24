<#
Create .env in the backend folder with OPENAI_API_KEY.
Usage: run this script from PowerShell by double-clicking or from the backend folder:
  cd d:\Projects\backend
  .\set_env.ps1

This writes plaintext .env for local development. Do not commit this file to git.
#>

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Write-Host "This will create or update '$scriptDir\.env' with your OpenAI API key." -ForegroundColor Yellow

$key = Read-Host -Prompt "Enter your OpenAI API key (sk-...)" 
$key = $key.Trim()
if ([string]::IsNullOrWhiteSpace($key)) {
    Write-Host "No key entered. Aborting." -ForegroundColor Red
    exit 1
}

$envPath = Join-Path $scriptDir ".env"
if (Test-Path $envPath) {
    $choice = Read-Host "'.env' already exists. Overwrite? (y/N)"
    if ($choice.ToLower() -ne 'y') {
        Write-Host "Aborted; existing .env left unchanged." -ForegroundColor Cyan
        exit 0
    }
}

# Write the key to .env
Set-Content -Path $envPath -Value ("OPENAI_API_KEY=" + $key) -Encoding UTF8
Write-Host "Wrote OPENAI_API_KEY to $envPath" -ForegroundColor Green
Write-Host "Reminder: do not commit .env to git. Use this file for local development only." -ForegroundColor Yellow
