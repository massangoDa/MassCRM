param(
  [string]$Base = $(if ($env:BASE) { $env:BASE } else { "http://127.0.0.1:3000" })
)

$Pass = 0
$Fail = 0

$ts = [DateTimeOffset]::UtcNow.ToUnixTimeSeconds()
$Email = "test_$ts@test.com"
$UpdatedEmail = "updated_$ts@test.com"
$Password = "password123"
$NewPassword = "newpassword123"

function Section([string]$title) {
  Write-Host ""
  Write-Host "==================================================" -ForegroundColor Cyan
  Write-Host "  $title" -ForegroundColor Cyan
  Write-Host "==================================================" -ForegroundColor Cyan
}

function Check {
  param(
    [string]$Label,
    [string]$Method,
    [string]$Path,
    [hashtable]$Body = $null,
    [string]$Token = ""
  )

  $headers = @{ "Content-Type" = "application/json" }
  if ($Token) {
    $headers["Authorization"] = "Bearer $Token"
  }

  $uri = "$Base$Path"

  try {
    $json = if ($Body) { $Body | ConvertTo-Json -Depth 10 } else { $null }
    $response = Invoke-RestMethod -Method $Method -Uri $uri -Headers $headers -Body $json
    Write-Host "[PASS] $Label" -ForegroundColor Green
    $script:Pass++

    if ($null -ne $response) {
      Write-Host ($response | ConvertTo-Json -Depth 10)
    }
    return $response
  }
  catch {
    $statusCode = $_.Exception.Response.StatusCode.value__
    $message = $_.ErrorDetails.Message
    Write-Host "[FAIL] $Label (HTTP $statusCode)" -ForegroundColor Red
    if ($message) {
      Write-Host $message
    } else {
      Write-Host $_.Exception.Message
    }
    $script:Fail++
    return $null
  }
}

function Require-Value([string]$Name, $Value) {
  if ($null -eq $Value -or "$Value" -eq "") {
    Write-Host "[STOP] Failed to get $Name. Stopping." -ForegroundColor Red
    exit 1
  }
}

Section "Auth"

Check -Label "register" -Method "POST" -Path "/api/auth/register" -Body @{
  name = "Taro Tanaka"
  email = $Email
  password = $Password
} | Out-Null

$token = Check -Label "login" -Method "POST" -Path "/api/auth/login" -Body @{
  email = $Email
  password = $Password
}
Require-Value "TOKEN" $token

Write-Host "TOKEN: $($token.ToString().Substring(0, [Math]::Min(40, $token.ToString().Length)))..." -ForegroundColor Green

Section "Account"

Check -Label "GET accounts" -Method "GET" -Path "/api/accounts" -Token $token | Out-Null

Check -Label "PATCH accounts" -Method "PATCH" -Path "/api/accounts" -Token $token -Body @{
  name = "massango"
  email = $UpdatedEmail
} | Out-Null

Check -Label "PATCH password" -Method "PATCH" -Path "/api/accounts/password" -Token $token -Body @{
  currentPassword = $Password
  newPassword = $NewPassword
} | Out-Null

$token = Check -Label "re-login" -Method "POST" -Path "/api/auth/login" -Body @{
  email = $UpdatedEmail
  password = $NewPassword
}
Require-Value "TOKEN(re-login)" $token

Section "Customer"

$cust = Check -Label "customer created" -Method "POST" -Path "/api/customers" -Token $token -Body @{
  name = "Test Co., Ltd."
}
$custId = $cust.id
Require-Value "CUST_ID" $custId

Section "Case"

$case = Check -Label "case created" -Method "POST" -Path "/api/cases" -Token $token -Body @{
  name = "Website Production"
  startDate = "2024-01-01T00:00:00.000Z"
  amount = 100000
  status = "IN_PROGRESS"
  withholdingTax = $false
  isRecurring = $false
  customerId = $custId
}
$caseId = $case.id
Require-Value "CASE_ID" $caseId

Section "Invoice"

$invoice = Check -Label "invoice created" -Method "POST" -Path "/api/invoices" -Token $token -Body @{
  number = "INV-001"
  subtotal = 100000
  tax = 10000
  total = 110000
  date = "2024-01-01T00:00:00.000Z"
  dueDate = "2024-01-31T00:00:00.000Z"
  caseId = $caseId
}
$invId = $invoice.id
Require-Value "INV_ID" $invId

Section "Line Item"

$lineItem = Check -Label "line item created" -Method "POST" -Path "/api/line-items" -Token $token -Body @{
  name = "Design"
  amount = 100000
  quantity = 1
  taxRate = 10
  invoiceId = $invId
}
$liId = $lineItem.id
Require-Value "LI_ID" $liId

Section "Result"
$total = $Pass + $Fail
Write-Host "TOTAL: $total"
Write-Host "PASS: $Pass" -ForegroundColor Green
Write-Host "FAIL: $Fail" -ForegroundColor Red

