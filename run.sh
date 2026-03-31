#!/bin/bash

BASE="${BASE:-http://127.0.0.1:3000}"
PASS=0
FAIL=0

TS=$(date +%s)
EMAIL="test_${TS}@test.com"
UPDATED_EMAIL="updated_${TS}@test.com"
PASSWORD="password123"
NEW_PASSWORD="newpassword123"

GREEN='\033[0;32m'
RED='\033[0;31m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
RESET='\033[0m'

section() {
  echo -e "\n${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
  echo -e "${CYAN}  $1${RESET}"
  echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
}

check() {
  local label="$1"
  local method="$2"
  local url="$3"
  local body="$4"
  local auth="$5"

  local args=(-s -w "\n__STATUS__%{http_code}" -X "$method" "$BASE$url" -H "Content-Type: application/json")
  [ -n "$auth" ] && args+=(-H "Authorization: Bearer $auth")
  [ -n "$body" ] && args+=(-d "$body")

  local raw=$(curl "${args[@]}")
  local status="${raw##*__STATUS__}"
  local body_out="${raw%__STATUS__*}"

  if [[ "$status" =~ ^2 ]]; then
    echo -e "${GREEN}[PASS]${RESET} $label (HTTP $status)"
    PASS=$((PASS+1))
  else
    echo -e "${RED}[FAIL]${RESET} $label (HTTP $status)"
    FAIL=$((FAIL+1))
  fi

  echo "$body_out" | jq . 2>/dev/null || echo "$body_out"
  echo ""
}

require_id() {
  local name="$1"
  local value="$2"

  if [ -z "$value" ]; then
    echo -e "${RED}[STOP]${RESET} $name が取得できません。ここで停止します。"
    exit 1
  fi
}

# ── 認証 ──
section "認証"

check "register" POST /api/auth/register "{\"name\":\"田中太郎\",\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}"

LOGIN_RES=$(curl -s -X POST "$BASE/api/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}")

TOKEN=$(echo "$LOGIN_RES" | tr -d '"')

require_id "TOKEN" "$TOKEN"

echo -e "${GREEN}[PASS]${RESET} login"
echo -e "TOKEN: ${TOKEN:0:40}...\n"
PASS=$((PASS+1))

# ── アカウント ──
section "アカウント"

check "GET accounts" GET /api/accounts "" "$TOKEN"

check "PATCH accounts" PATCH /api/accounts "{\"name\":\"massango\",\"email\":\"$UPDATED_EMAIL\"}" "$TOKEN"

check "PATCH password" PATCH /api/accounts/password "{\"currentPassword\":\"$PASSWORD\",\"newPassword\":\"$NEW_PASSWORD\"}" "$TOKEN"

# 再ログイン
LOGIN_RES2=$(curl -s -X POST "$BASE/api/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$UPDATED_EMAIL\",\"password\":\"$NEW_PASSWORD\"}")

TOKEN=$(echo "$LOGIN_RES2" | tr -d '"')
require_id "TOKEN(再ログイン)" "$TOKEN"

echo -e "${GREEN}[PASS]${RESET} 再ログイン成功"
PASS=$((PASS+1))

# ── 顧客 ──
section "顧客"

CUST=$(curl -s -X POST "$BASE/api/customers" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"株式会社テスト"}')

CUST_ID=$(echo "$CUST" | jq -r '.id // empty')
require_id "CUST_ID" "$CUST_ID"

echo -e "${GREEN}[PASS]${RESET} customer created ($CUST_ID)"
PASS=$((PASS+1))

# ── 案件 ──
section "案件"

CASE=$(curl -s -X POST "$BASE/api/cases" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"name\":\"Web制作\",
    \"startDate\":\"2024-01-01T00:00:00.000Z\",
    \"amount\":100000,
    \"status\":\"IN_PROGRESS\",
    \"withholdingTax\":false,
    \"isRecurring\":false,
    \"customerId\":$CUST_ID
  }")

echo "$CASE" | jq . 2>/dev/null || echo "$CASE"

CASE_ID=$(echo "$CASE" | jq -r '.id // empty')
require_id "CASE_ID" "$CASE_ID"

echo -e "${GREEN}[PASS]${RESET} case created ($CASE_ID)"
PASS=$((PASS+1))

# ── 請求書 ──
section "請求書"

INV=$(curl -s -X POST "$BASE/api/invoices" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"number\":\"INV-001\",
    \"subtotal\":100000,
    \"tax\":10000,
    \"total\":110000,
    \"date\":\"2024-01-01T00:00:00.000Z\",
    \"dueDate\":\"2024-01-31T00:00:00.000Z\",
    \"caseId\":$CASE_ID
  }")

echo "$INV" | jq . 2>/dev/null || echo "$INV"

INV_ID=$(echo "$INV" | jq -r '.id // empty')
require_id "INV_ID" "$INV_ID"

echo -e "${GREEN}[PASS]${RESET} invoice created ($INV_ID)"
PASS=$((PASS+1))

# ── 明細 ──
section "明細"

LI=$(curl -s -X POST "$BASE/api/line-items" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"name\":\"デザイン\",
    \"amount\":100000,
    \"quantity\":1,
    \"taxRate\":10,
    \"invoiceId\":$INV_ID
  }")

echo "$LI" | jq . 2>/dev/null || echo "$LI"

LI_ID=$(echo "$LI" | jq -r '.id // empty')
require_id "LI_ID" "$LI_ID"

echo -e "${GREEN}[PASS]${RESET} line item created ($LI_ID)"
PASS=$((PASS+1))

# ── サマリ ──
section "結果"

TOTAL=$((PASS+FAIL))
echo "TOTAL: $TOTAL"
echo -e "${GREEN}PASS: $PASS${RESET}"
echo -e "${RED}FAIL: $FAIL${RESET}"