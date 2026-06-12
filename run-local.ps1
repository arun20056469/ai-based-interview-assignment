$port = 5500

Write-Host "Starting AI Mock Interview Platform on http://localhost:$port"
Write-Host "Press Ctrl+C to stop the server."

python -m http.server $port
