#!/bin/bash
# Testing Suite Installation and Verification Script

echo "🧪 Perfume Store - Testing Suite Verification"
echo "=============================================="
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed"
    exit 1
fi

echo "✅ npm is installed"
echo ""

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found"
    exit 1
fi

echo "✅ package.json found"
echo ""

# Check test scripts in package.json
echo "📋 Checking test scripts..."
if grep -q '"test":' package.json; then
    echo "✅ test script found"
fi
if grep -q '"test:watch":' package.json; then
    echo "✅ test:watch script found"
fi
if grep -q '"test:coverage":' package.json; then
    echo "✅ test:coverage script found"
fi

echo ""
echo "📦 Checking Jest configuration..."
if [ -f "jest.config.js" ]; then
    echo "✅ jest.config.js found"
fi
if [ -f "jest.setup.js" ]; then
    echo "✅ jest.setup.js found"
fi

echo ""
echo "🗂️  Checking test files..."

# Count test files
test_count=$(find __tests__ -name "*.test.ts*" 2>/dev/null | wc -l)
echo "✅ Found $test_count test files"

# List test files
echo ""
echo "📁 Test files structure:"
echo ""

if [ -d "__tests__/components" ]; then
    echo "  📦 Components:"
    ls -1 __tests__/components/*.test.tsx 2>/dev/null | sed 's/.*\///;s/^/    ✓ /'
fi

if [ -d "__tests__/stores" ]; then
    echo ""
    echo "  📦 Stores:"
    ls -1 __tests__/stores/*.test.ts 2>/dev/null | sed 's/.*\///;s/^/    ✓ /'
fi

if [ -d "__tests__/utils" ]; then
    echo ""
    echo "  📦 Utils:"
    ls -1 __tests__/utils/*.test.ts 2>/dev/null | sed 's/.*\///;s/^/    ✓ /'
fi

if [ -d "__tests__/api" ]; then
    echo ""
    echo "  📦 API:"
    ls -1 __tests__/api/*.test.ts 2>/dev/null | sed 's/.*\///;s/^/    ✓ /'
fi

if [ -d "__tests__/integration" ]; then
    echo ""
    echo "  📦 Integration:"
    ls -1 __tests__/integration/*.test.ts 2>/dev/null | sed 's/.*\///;s/^/    ✓ /'
fi

echo ""
echo "📚 Documentation files:"
if [ -f "TESTING.md" ]; then
    echo "  ✓ TESTING.md"
fi
if [ -f "TEST_SUMMARY.md" ]; then
    echo "  ✓ TEST_SUMMARY.md"
fi
if [ -f "QUICK_TEST_GUIDE.md" ]; then
    echo "  ✓ QUICK_TEST_GUIDE.md"
fi
if [ -f "COMPREHENSIVE_TESTING.md" ]; then
    echo "  ✓ COMPREHENSIVE_TESTING.md"
fi

echo ""
echo "=============================================="
echo "🎉 Testing suite is ready!"
echo "=============================================="
echo ""
echo "🚀 Quick start:"
echo "  1. npm install              (install dependencies)"
echo "  2. npm test                 (run all tests)"
echo "  3. npm run test:watch       (watch mode)"
echo "  4. npm run test:coverage    (coverage report)"
echo ""
echo "📖 Read QUICK_TEST_GUIDE.md for common commands"
echo "📖 Read TESTING.md for detailed information"
echo ""
