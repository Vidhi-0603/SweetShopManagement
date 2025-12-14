# Test Report

## Project Name
Sweet Shop Management System

---

## Test Environment

- **Testing Framework:** Jest
- **HTTP Testing:** Supertest
- **Runtime:** Node.js
- **Database:** MongoDB (mocked for unit tests)
- **Architecture:** Controller–Service–DAO pattern
- **Testing Strategy:** Unit Tests + Integration Tests (TDD approach)

---

## Test Suites Executed

### ✅ Unit Tests

#### Auth Service Tests
- User registration logic
- User login logic
- Token generation and validation scenarios

**File:**  
`tests/unit/service/auth.service.test.js`

---

#### Sweet Service Tests
- Fetching sweets
- Adding new sweets
- Updating sweets
- Deleting sweets
- Purchasing sweets
- Restocking sweets

**File:**  
`tests/unit/service/sweet.service.test.js`

---

### ✅ Integration Tests

#### Auth Route Tests
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

**File:**  
`tests/integration/auth.route.test.js`

---

#### Sweets Route Tests
- `GET /api/sweets`
- `POST /api/sweets`
- `PUT /api/sweets/:id`
- `DELETE /api/sweets/:id`

**File:**  
`tests/integration/sweets.route.test.js`

---

## Test Execution Summary

- PASS tests/unit/service/auth.service.test.js
- PASS tests/unit/service/sweet.service.test.js
- PASS tests/integration/auth.route.test.js
- PASS tests/integration/sweets.route.test.js

- Test Suites: 4 passed, 4 total
- Tests: 24 passed, 24 total
- Snapshots: 0 total
- Time: 1.777 s


---

## Key Highlights

- All **24 test cases passed successfully**
- Clear separation between **unit tests** and **integration tests**
- External dependencies (database, authentication middleware) were mocked for unit testing
- Integration tests validated complete request–response flows
- Tests were written following **Test-Driven Development (Red–Green–Refactor)** principles

---

## Conclusion

The test suite validates the correctness, reliability, and stability of the Sweet Shop Management System.  
Both core business logic and API endpoints were thoroughly tested, ensuring confidence in the application before deployment.
