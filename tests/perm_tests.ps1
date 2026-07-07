# Teste de permissões: Admin vs Técnico
# Ajuste BASE_URL se necessário
$BASE_URL = 'https://indicadorhse6.onrender.com'

function Show-Result($label, $result) {
    Write-Host "---- $label ----"
    if ($null -eq $result) { Write-Host "(no response)"; return }
    if ($result.GetType().Name -eq 'Hashtable') {
        $result | ConvertTo-Json -Depth 5 | Write-Host
    } else {
        $result | Write-Host
    }
}

# 1) GET /api/permissoes as Admin
try {
    $headers = @{ 'x-user-login'='admin'; 'x-user-perfil'='Administrador' }
    $resp = Invoke-RestMethod -Uri "$BASE_URL/api/permissoes" -Method GET -Headers $headers -ErrorAction Stop
    Show-Result "GET /api/permissoes (Admin)" $resp
} catch {
    Show-Result "GET /api/permissoes (Admin) - error" $_.Exception.Message
}

# 2) Create an 'inspecoes' entry as Admin (owner: admin)
$payload = @{ titulo = 'Teste permissão'; descricao = 'Criado para teste'; _ownerLogin = 'admin' } | ConvertTo-Json
try {
    $headers = @{ 'x-user-login'='admin'; 'x-user-perfil'='Administrador'; 'Content-Type'='application/json' }
    $created = Invoke-RestMethod -Uri "$BASE_URL/api/inspecoes" -Method POST -Body $payload -Headers $headers -ErrorAction Stop
    Show-Result "POST /api/inspecoes (Admin) -> created" $created
    $createdId = $created.id
} catch {
    Show-Result "POST /api/inspecoes (Admin) - error" $_.Exception.Message
    exit 1
}

Start-Sleep -Seconds 1

# 3) Attempt DELETE as Technician (different login) - expected 403
try {
    $headers = @{ 'x-user-login'='tecnico1'; 'x-user-perfil'='Técnico' }
    Invoke-RestMethod -Uri "$BASE_URL/api/inspecoes/$createdId" -Method DELETE -Headers $headers -ErrorAction Stop
    Show-Result "DELETE /api/inspecoes/$createdId (Técnico)" "(unexpected success)"
} catch {
    Show-Result "DELETE /api/inspecoes/$createdId (Técnico) - expected failure" $_.Exception.Message
}

# 4) Attempt DELETE as Admin - expected success
try {
    $headers = @{ 'x-user-login'='admin'; 'x-user-perfil'='Administrador' }
    $del = Invoke-RestMethod -Uri "$BASE_URL/api/inspecoes/$createdId" -Method DELETE -Headers $headers -ErrorAction Stop
    Show-Result "DELETE /api/inspecoes/$createdId (Admin)" $del
} catch {
    Show-Result "DELETE /api/inspecoes/$createdId (Admin) - error" $_.Exception.Message
}

# 5) Try to PUT /api/permissoes as Admin (save sample)
$perms = @{ menu = @{ dashboard = $true; inspecao = $true }; acoes = @{ alterar = $true; excluir = $false } } | ConvertTo-Json
try {
    $headers = @{ 'x-user-login'='admin'; 'x-user-perfil'='Administrador'; 'Content-Type'='application/json' }
    $resp = Invoke-RestMethod -Uri "$BASE_URL/api/permissoes" -Method PUT -Body $perms -Headers $headers -ErrorAction Stop
    Show-Result "PUT /api/permissoes (Admin)" $resp
} catch {
    Show-Result "PUT /api/permissoes (Admin) - error" $_.Exception.Message
}

# 6) Try to PUT /api/permissoes as Técnico (expected 403)
try {
    $headers = @{ 'x-user-login'='tecnico1'; 'x-user-perfil'='Técnico'; 'Content-Type'='application/json' }
    Invoke-RestMethod -Uri "$BASE_URL/api/permissoes" -Method PUT -Body $perms -Headers $headers -ErrorAction Stop
    Show-Result "PUT /api/permissoes (Técnico)" "(unexpected success)"
} catch {
    Show-Result "PUT /api/permissoes (Técnico) - expected failure" $_.Exception.Message
}

Write-Host "\nTests completed." | Write-Host
