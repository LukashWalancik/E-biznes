$body = @{ message = "Cześć"}
$jsonBody = $body | ConvertTo-Json
irm "http://localhost:8000/chat" -Method POST -ContentType "application/json" -Body $jsonBody