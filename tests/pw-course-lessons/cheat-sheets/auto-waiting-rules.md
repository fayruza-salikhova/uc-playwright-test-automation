# Playwright Cheat Sheet: Await, Auto-Wait & Timeouts

## Main rule
### If a method returns a Promise → always use await.
### If a method returns a locator or a synchronous value → await is not needed.
## Documentation
Locator-based assertions: https://playwright.dev/docs/test-assertions

Auto-wait / Actionability: https://playwright.dev/docs/actionability

Wait for response: https://playwright.dev/docs/api/class-page#page-wait-for-response

```ts
// Locators
const button = page.locator('button'); // NOT async, await not needed
const input  = page.locator('#username'); // NOT async, await not needed

// Actions with Locators
await button.click();        // async, auto-wait up to 30 seconds
await input.fill('text');    // async, auto-wait up to 30 seconds

// Timeout can be set locally
await button.click({ timeout: 5000 }); // wait max 5 seconds
// Locator-based assertions
await expect(button).toBeVisible();           // async, auto-wait up to 5 seconds
await expect(input).toHaveText('Hello');     // async, auto-wait up to 5 seconds
// Change timeout for assertions
await expect(button).toBeVisible({ timeout: 10000 }); // wait up to 10 seconds

// Methods that return values
const text = await button.textContent(); // async, auto-wait up to 30 seconds
// Manual wait example for allTextContents
await input.waitFor({ state: 'attached' }); // wait for the element to appear in the DOM
const allTexts = await input.allTextContents(); // async, manual wait required

// Manual waiting methods
await locator.waitFor({ state: 'visible' }); // wait for visibility
await page.waitForSelector('.bg-success');   // wait for element in DOM
await page.waitForResponse(resp => resp.url().includes('/ajax') && resp.status() === 200);
await page.waitForLoadState('networkidle');  // wait for all network requests (not always reliable)
````