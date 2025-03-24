## Playwright test automation course with TypeScript
Best practices, API testing, Page Objects, Advanced features  
https://www.udemy.com/course/playwright-from-zero-to-hero/?couponCode=ST22MT240325G2

## App for practice  
https://github.com/bondar-artem/pw-practice-app

## Start js/ts file
> node lesson1.js

## Install playwright
> npm init playwright@latest  
> npm init playwright@latest --force

## Start tests in console
> npx playwright test    
> npx playwright test --project=chromium

**Runs the tests in a specific file**
> npx playwright test example</code>
> npx playwright test example.spec.ts  --project=chromium

**Runs a specific test by name**
> npx playwright test -g "has title"  --project=chromium

## Start tests with UI
**Run tests in visible (headed) mode with Chromium, allowing you to observe the browser during test execution.**
> npx playwright test --project=chromium --headed

**Launch the Playwright Test UI**  
**Visual interface to run, filter, and review test results**
> npx playwright test --ui</code>

## Report
**Show the Playwright test report filtered for the Chromium project, with details like pass/fail status, screenshots, and logs.**
> npx playwright show-report --project=chromium  

## Debug
> npx playwright test --project=chromium --debug
> npx playwright test --project=chromium --trace on

## Playwright plugin
You can download plugin and start and debug tests here 

