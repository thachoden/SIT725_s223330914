const { validationTests, putValidationTests } = require("./testData");
// ============================================
// CONFIGURATION
// ============================================

const API_BASE_URL = "http://localhost:3000/api/books";
const TEST_DELAY = 300; // ms between tests

// ============================================
// UTILITY FUNCTIONS
// ============================================

function generateFetchScript(method, endpoint, payload) {
  const body =
    method === "POST"
      ? `body: JSON.stringify(${JSON.stringify(payload)})`
      : `body: JSON.stringify(${JSON.stringify(payload)})`;

  return `fetch('${API_BASE_URL}${endpoint}', {
  method: '${method}',
  headers: { 'Content-Type': 'application/json' },
  ${body}
}).then(r => r.json().then(data => ({ status: r.status, data })))`;
}

// ============================================
// TEST EXECUTION FUNCTIONS
// ============================================

async function executeTest(method, endpoint, payload, expectedStatus) {
  try {
    const url = `${API_BASE_URL}${endpoint}`;

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const actualStatus = response.status;
    const passed = actualStatus === expectedStatus;

    return {
      actualStatus,
      passed,
      error: null,
    };
  } catch (error) {
    return {
      actualStatus: null,
      passed: false,
      error: error.message,
    };
  }
}

async function executePostTest(testData) {
  const result = await executeTest(
    "POST",
    "/",
    testData.payload,
    testData.expectedStatus
  );

  return {
    test: testData.test,
    method: "POST",
    script: generateFetchScript("POST", "/", testData.payload),
    expectedStatus: testData.expectedStatus,
    ...result,
  };
}

async function executePutTest(testData) {
  const result = await executeTest(
    "PUT",
    `/${testData.id}`,
    testData.payload,
    testData.expectedStatus
  );

  return {
    test: testData.test,
    method: "PUT",
    script: generateFetchScript("PUT", `/${testData.id}`, testData.payload),
    expectedStatus: testData.expectedStatus,
    ...result,
  };
}

// ============================================
// LOGGING FUNCTIONS
// ============================================

function logTestResult(testResult, index, total) {
  const statusIcon = testResult.passed ? "✅" : "❌";
  console.log(`[${index}/${total}] ${statusIcon} ${testResult.test}`);
  console.log(
    `    Expected: ${testResult.expectedStatus} | Actual: ${testResult.actualStatus}`
  );
  console.log(`\n📜 Script:`);
  console.log(testResult.script);

  if (testResult.error) {
    console.log(`\n⚠️  Error: ${testResult.error}`);
  }
  console.log();
}

function logSummary(results) {
  const passedTests = results.filter((r) => r.passed).length;
  const totalTests = results.length;
  const passRate = ((passedTests / totalTests) * 100).toFixed(2);

  console.log("\n" + "=".repeat(70));
  console.log("📊 TEST SUMMARY");
  console.log("=".repeat(70));
  console.log(`Total Tests:  ${totalTests}`);
  console.log(`Passed:       ${passedTests} ✅`);
  console.log(`Failed:       ${totalTests - passedTests} ❌`);
  console.log(`Pass Rate:    ${passRate}%`);
  console.log("=".repeat(70));

  console.log("\n📋 DETAILED RESULTS:");
  console.table(
    results.map((r) => ({
      Test: r.test,
      Method: r.method,
      Expected: r.expectedStatus,
      Actual: r.actualStatus,
      Result: r.passed ? "✅ PASS" : "❌ FAIL",
    }))
  );
}

// ============================================
// MAIN TEST RUNNER
// ============================================

async function runAllTests() {
  console.log("🧪 Starting API Validation Tests...\n");
  const results = [];

  // POST Tests
  console.log("📝 POST METHOD TESTS");
  console.log("-".repeat(70));
  for (let i = 0; i < validationTests.length; i++) {
    const testResult = await executePostTest(validationTests[i]);
    results.push(testResult);
    logTestResult(testResult, i + 1, validationTests.length);
    await new Promise((resolve) => setTimeout(resolve, TEST_DELAY));
  }

  // PUT Tests
  console.log("\n📝 PUT METHOD TESTS");
  console.log("-".repeat(70));
  for (let i = 0; i < putValidationTests.length; i++) {
    const testResult = await executePutTest(putValidationTests[i]);
    results.push(testResult);
    logTestResult(testResult, i + 1, putValidationTests.length);
    await new Promise((resolve) => setTimeout(resolve, TEST_DELAY));
  }

  // Summary
  logSummary(results);

  return results;
}

// ============================================
// EXECUTE TESTS
// ============================================

runAllTests().then((results) => {
  console.log("\n✨ Test execution completed!");
});

module.exports = [
  generateFetchScript,
]