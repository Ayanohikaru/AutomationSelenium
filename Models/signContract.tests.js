{ describe, before, after, it } require('selenium-webdriver/testing');
const { Builder, By, Key, until } = require('selenium-webdriver');
const readline = require('readline-sync');
const notify = require('../Settings/basic');
var locator = require('../Objects/Locator');
var string = require('../Objects/String');
var timeout = 50000;

for (var i=0;i<10;i++){
//var envi = readline.question('Input 1 for staging - 2 for uat - 3 for staging 3M?\n');
describe('', async () => {
    before(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().setTimeouts({ implicit: timeout })
        await driver.manage().window().maximize();
        link = 'https://eleasing-realestatedoc-uat.azurewebsites.net/webapp/';
        await driver.get(link);
    })

    after(async () => {
        notify.msgBlue('       All tests have been executed')
        await driver.quit();
    })

    it('TC01: Maker can login to Fraser with correct authentication', async () => {
        try {
            await driver.findElement(By.xpath(locator.loginEmail)).sendKeys("samtran@yopmail.com", Key.ENTER);
            await driver.findElement(By.xpath(locator.loginPassword)).sendKeys('12345678', Key.ENTER);
            await driver.findElement(By.xpath(locator.btnLogin)).click;
            let Maker_name = await driver.findElement(By.className('display-name')).getText();
            let Mall_name = await driver.findElement(By.className('mall-selected')).getText();
            notify.msgBlue('Mall: ' + Mall_name + ' - Name: ' + Maker_name + ' - Email:')
            console.log(link + string.home);
        }
        catch (e) {
            error(e);
        }
    });

    it('TC02: Maker navigate to Pending contract', async () => {
        try {
            // await clickWhenClickable(By.xpath(locator.dMall),timeout);
            // await clickWhenClickable(By.xpath(locator.mallList),timeout); 
            await driver.get(link + string.contractManagement);
            console.log (link + string.pendingContract);
            await clickWhenClickable(By.xpath("(//div[contains(@class,'contract-general')])[2]"),timeout);
            await clickWhenClickable(By.xpath("//span[@class='mat-button-wrapper']//mat-icon[@class='mat-icon notranslate material-icons mat-icon-no-color'][contains(text(),'more_vert')]"),timeout);
            await clickWhenClickable(By.xpath("//button[contains(text(),'Sign Manually')]"));
            await clickWhenClickable(By.xpath("//button[contains(text(),'CONFIRM')]"));
            await driver.sleep(1000)
        }
        catch (e) {
            error(e);}
        });
})
};


var error = function (e) {
    if (e.name === 'NoSuchElementError') {
        notify.msgRed('ERROR: Element not found');
    }
    else {
        notify.msgRed(e);
    }
}

function clickWhenClickable(locator, timeout){
    return driver.wait(function(){
      return driver.findElement(locator).then(function(element){
        return element.click().then(function(){
          return true;
        }, function(err){
          return false;
        })
      }, function(err){
        return false;
      });
    }, timeout, 'Timeout waiting for ' + locator.value)
  };
