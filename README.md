# Ploom Website Automated Testing Project

## Project Overview

This project implements automated end-to-end testing for Ploom websites using Playwright and TypeScript, with a focus on extensibility across different market websites.

## Supported Markets

- United Kingdom (https://www.ploom.co.uk/en)
- Poland (https://www.ploom.pl/pl)

## Prerequisites

- Node.js (v18 or higher)
- npm
- TypeScript

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/MarekSwiechowicz/ploom_e2e_tests.git
cd ploom-automated-tests
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install Playwright Browsers

```bash
npx playwright install
```

## Test Cases

### Test Case 1: Add Product to Cart

- **Objective**: Verify product can be added to cart
- **Steps**:
  1. Visit Ploom website
  2. Navigate to Shop
  3. Open product page by SKU
  4. Add product to cart
  5. Verify basket count
  6. Open basket
  7. Confirm product is in basket

### Test Case 2: Remove Product from Cart

- **Objective**: Verify product can be removed from cart
- **Precondition**: Product is in cart
- **Steps**:
  1. Open cart
  2. Remove product
  3. Verify product is no longer in cart
  4. Check basket count is updated

### Test Case 3: Check Product Page Links and Images

- **Objective**: Verify no broken links or images
- **Steps**:
  1. Visit Ploom website
  2. Navigate to Shop
  3. Open product page by SKU
  4. Check all links are functional
  5. Verify all images load correctly

## Running Tests

### Run All Tests

```bash
npm test
```

### Run Specific Test

```bash
npx playwright test cart-tests.spec.ts
```

## Configuration

- Modify `playwright.config.ts` for global test settings

## Reporting

Test results and screenshots are automatically generated in the `test-results/` directory

## Troubleshooting

- Ensure all dependencies are installed
- Check network connectivity
- Verify Playwright browsers are installed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Create a Pull Request
