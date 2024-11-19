// Import Selenium WebDriver
const { Builder, By, Key, until } = require('selenium-webdriver');

async function runTest() {
    // Initialize the driver for Chrome
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Open the signup page
        await driver.get('http://localhost:3001/signup'); // Update with the correct route if needed

        // Wait until the signup form is loaded
        await driver.wait(until.elementLocated(By.name('name')), 5000);

        // Fill out the signup form
        await driver.findElement(By.name('name')).sendKeys('Test User');
        await driver.findElement(By.name('email')).sendKeys('testuser@example.com');
        await driver.findElement(By.name('password')).sendKeys('testpassword');

        // Submit the form
        await driver.findElement(By.css('button[type="submit"]')).click();

        // Wait for the success message or redirection to the login page
        await driver.wait(until.urlContains('/login'), 5000); // Adjust the timeout as needed
        console.log("Signup successful and redirected to login page");

        // Optionally, check if the login page has loaded by verifying an element there
        await driver.wait(until.elementLocated(By.name('username')), 5000);
        console.log("Login page loaded after signup");

    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        // Quit the driver
        await driver.quit();
    }
}

// Run the test
runTest();
