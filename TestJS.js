// test.js
// Import requirement packages
require('chromedriver');
const assert = require('assert');
const {Builder, Key, By, until} = require('selenium-webdriver');
let config = require('./configObject/config.js');

describe('Login Main page', function () {
    let driver;
    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
    });
    // Next, we will write steps for our test. 
    // For the element ID, you can find it by open the browser inspect feature.
    it('open environment', async function() {
        //maximize windoow
        await driver.manage().window().maximize();
        // Load the page
        await driver.get(config.config.url);
        
        // Find the search box by id
        await driver.findElement(By.id('enterButtonTop')).click();
        // Enter keywords and click enter
        await driver.findElement(By.id('emailLogin')).sendKeys(config.config.authEmail, Key.RETURN);
        // Wait for the results box by id
        await driver.findElement(By.id('passwordLogin')).sendKeys(config.config.password, Key.RETURN);
        
        await driver.findElement(By.xpath('//*[@id="vuePopup"]/div[2]/div[1]/div/div[2]/div[2]/div/div[2]/form/div[3]/label/span[4]')).click();
        await driver.findElement(By.xpath('//*[@id="vuePopup"]/div[2]/div[1]/div/div[2]/div[2]/div/div[2]/form/div[4]/button')).click();

        // We will get the title value and test it
        setTimeout(()=> {
                            let profile = driver.findElement(By.xpath('//*[@id="a-profile-block"]/div[2]/div[1]'));
                            assert.equal('Баланс', profile);
                        }, 
                    30000);
        
    });
    // close the browser after running tests
    //after(() => driver && driver.quit());
})