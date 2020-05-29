{ describe, before, after, it } require('selenium-webdriver/testing');
const { Builder, By, Key, until } = require('selenium-webdriver');
const readline = require('readline-sync');
var express = require('express');
var sql = require("mssql");
var app = express();
const notify = require('../Settings/basic');
var locator = require('../Objects/Locator');
var string = require('../Objects/String');
var timeout = 70000;
var companyArray, atriumArray, adspaceArray, kioskArray, licenceArray;

////////////// CONNECTING TO DATABASE /////////////

var config = {
    server: "averspace-dev.database.windows.net",
    user: "averspace-dev",
    database: 'fraser-demo',
    password: "avpdb@123",
    encrypt: true
};
var server = app.listen(5000);

////////////// GET DATASET /////////////

sql.connect(config, function (err) {
    var request = new sql.Request();

    request.query(locator.qCustomer)
        .then(recordset => {
            companyArray = recordset.recordset;
        })

    request.query(locator.atriumLocation)
        .then(recordset => {
            atriumArray = recordset.recordset;
        })

    request.query(locator.adspaceLocation)
        .then(recordset => {
            adspaceArray = recordset.recordset;
        })

    request.query(locator.kioskLocation)
        .then(recordset => {
            kioskArray = recordset.recordset;
            console.log(kioskArray);
        })

    request.query(locator.licenceLocation)
        .then(recordset => {
            licecneArray = recordset.recordset;
            console.log(licenceArray);
        })

});

////////////// CONNECT TO SELENIUM /////////////

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
            await clickWhenClickable(By.xpath(locator.dMall), timeout);
            await clickWhenClickable(By.xpath(locator.mallList), timeout);
        }
        catch (e) {
            error(e);
        }
    });

    it('TC02: Maker can create new Atrium case', async () => {
        try {
            for (var i = 0; i < 5; i++) {
                var datetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
                await driver.get(link + string.createAtrium);
                console.log(link + string.createAtrium);
                companyName = companyArray[i].CustomerName;
                var atriumName = atriumArray[i].Name;
                await clickWhenClickable(By.xpath(locator.searchCompany), timeout)
                await driver.findElement(By.xpath(locator.searchCompany)).sendKeys(companyName);
                await clickWhenClickable(By.xpath(locator.selectItemDropDown), timeout);
                await driver.findElement(By.xpath(locator.docTitle)).clear();
                await driver.findElement(By.xpath(locator.searchItem)).sendKeys(atriumName);
                await driver.findElement(By.xpath(locator.selectItem)).click();
                await clickWhenClickable(By.xpath(locator.btnTerm1), timeout);
                await clickWhenClickable(By.xpath(locator.startDate), timeout);
                await clickWhenClickable(By.xpath(locator.startDateBackYear), timeout);
                await clickWhenClickable(By.xpath(locator.startDateYear), timeout);
                await clickWhenClickable(By.xpath(locator.startDateMonth), timeout);
                await clickWhenClickable(By.xpath(locator.startDateDay), timeout);

                await clickWhenClickable(By.xpath(locator.endDate), timeout);
                await clickWhenClickable(By.xpath(locator.endDateBackYear), timeout);
                await clickWhenClickable(By.xpath(locator.endDateYear), timeout);
                await clickWhenClickable(By.xpath(locator.endDateMonth), timeout);
                await clickWhenClickable(By.xpath(locator.endDateDay), timeout);
                await driver.sleep(300);

                await clickWhenClickable(By.xpath(locator.btnSave), timeout);

                await driver.wait(until.elementLocated(By.xpath(locator.eventPermitted), timeout));
                await driver.findElement(By.xpath(locator.eventPermitted)).sendKeys(string.event);
                var rand = (Math.floor(Math.random() * (1000)) + 1);
                var tempDocTitle = "[" + rand + "] " + companyName + ", " + atriumName + ", " + datetime;
                await driver.findElement(By.xpath(locator.docTitle)).sendKeys(tempDocTitle);

                await clickWhenClickable(By.xpath(locator.btnPreviewDocument), timeout);
                await driver.sleep(300);
                await clickWhenClickable(By.xpath(locator.btnPrepareDocument), timeout);
                await driver.sleep(8000);
                await clickWhenClickable(By.xpath(locator.btnInviteSigner), timeout);

                await driver.wait(until.elementLocated(By.xpath(locator.fSubject), timeout));
                await driver.findElement(By.xpath(locator.fSubject)).sendKeys(tempDocTitle);
                await driver.findElement(By.xpath(locator.fSignerEmail)).clear();
                testEmail = "testcontract" + rand + "@yopmail.com"
                await driver.findElement(By.xpath(locator.fSignerEmail)).sendKeys(testEmail);
                //await clickWhenClickable(By.xpath(locator.reviewerButton), timeout);
                await driver.sleep(300);
                await clickWhenClickable(By.xpath(locator.btnSend), timeout);

                await driver.sleep(300);

                // await driver.get(link + string.contractManagement);
                // await clickWhenClickable(By.xpath(locator.moreAction), timeout);
                // await clickWhenClickable(By.xpath(locator.mSignManual), timeout);
                // await clickWhenClickable(By.xpath(locator.confirm), timeout);
                // await driver.sleep(500);
            };
        }
        catch (e) {
            error(e);
        }
    })

    // it('TC03: Maker can create Adversting case', async () => {
    //     try {
    //         for (var i = 0; i < 10; i++) {
    //             var datetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    //             await driver.get(link + string.createAdSpace);
    //             var companyName = companyArray[i].CustomerName;
    //             var adspaceName = adspaceArray[i].Name;
    //             await clickWhenClickable(By.xpath(locator.searchCompany), timeout)
    //             await driver.findElement(By.xpath(locator.searchCompany)).sendKeys(companyName);
    //             await clickWhenClickable(By.xpath(locator.selectItemDropDown), timeout);
    //             await driver.findElement(By.xpath(locator.docTitle)).clear();
    //             await driver.findElement(By.xpath(locator.searchItem)).sendKeys(adspaceName);
    //             await driver.findElement(By.xpath(locator.selectItem)).click();
    //             await clickWhenClickable(By.xpath(locator.btnTerm1), timeout);
    //             await clickWhenClickable(By.xpath(locator.startDate), timeout);
    //             await clickWhenClickable(By.xpath(locator.startDateBackYear), timeout);
    //             await clickWhenClickable(By.xpath(locator.startDateYear), timeout);
    //             await clickWhenClickable(By.xpath(locator.startDateMonth), timeout);
    //             await clickWhenClickable(By.xpath(locator.startDateDay), timeout);

    //             await clickWhenClickable(By.xpath(locator.endDate), timeout);
    //             await clickWhenClickable(By.xpath(locator.endDateBackYear), timeout);
    //             await clickWhenClickable(By.xpath(locator.endDateYear), timeout);
    //             await clickWhenClickable(By.xpath(locator.endDateMonth), timeout);
    //             await clickWhenClickable(By.xpath(locator.endDateDay), timeout);
    //             await driver.sleep(300);

    //             await clickWhenClickable(By.xpath(locator.btnSave), timeout);

    //             await driver.wait(until.elementLocated(By.xpath(locator.eventPermitted), timeout));
    //             await driver.findElement(By.xpath(locator.eventPermitted)).sendKeys(string.event);
    //             var rand = (Math.floor(Math.random() * (1000)) + 1);
    //             var tempDocTitle = "[" + rand + "] " + companyName + ", " + adspaceName + ", " + datetime;
    //             await driver.findElement(By.xpath(locator.docTitle)).sendKeys(tempDocTitle);

    //             await clickWhenClickable(By.xpath(locator.btnPreviewDocument), timeout);
    //             await driver.sleep(300);
    //             await clickWhenClickable(By.xpath(locator.btnPrepareDocument), timeout);
    //             await driver.sleep(8000);
    //             await clickWhenClickable(By.xpath(locator.btnInviteSigner), timeout);

    //             await driver.wait(until.elementLocated(By.xpath(locator.fSubject), timeout));
    //             await driver.findElement(By.xpath(locator.fSubject)).sendKeys(tempDocTitle);
    //             await driver.findElement(By.xpath(locator.fSignerEmail)).clear();
    //             testEmail = "testcontract" + rand + "@yopmail.com"
    //             await driver.findElement(By.xpath(locator.fSignerEmail)).sendKeys(testEmail);
    //             await clickWhenClickable(By.xpath(locator.reviewerButton), timeout);
    //             await driver.sleep(300);
    //             await clickWhenClickable(By.xpath(locator.btnSend), timeout);

    //             await driver.sleep(300);

    //             await driver.get(link + string.contractManagement);
    //             await clickWhenClickable(By.xpath(locator.moreAction), timeout);
    //             await clickWhenClickable(By.xpath(locator.mSignManual), timeout);
    //             await clickWhenClickable(By.xpath(locator.confirm), timeout);
    //             await driver.sleep(300);
    //         };
    //     }
    //     catch (e) {
    //         error(e);
    //     }
    // })

    // it('TC04: Maker can create Kiosk', async () => {
    //     try {
    //         for (var i = 0; i < 10; i++) {
    //             var datetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    //             await driver.get(link + string.createKiosk);
    //             var companyName = companyArray[i].CustomerName;
    //             var kioskName = kioskArray[i].Name;
    //             await clickWhenClickable(By.xpath(locator.searchCompany), timeout)
    //             await driver.findElement(By.xpath(locator.searchCompany)).sendKeys(companyName);
    //             await clickWhenClickable(By.xpath(locator.selectItemDropDown), timeout);
    //             await driver.findElement(By.xpath(locator.docTitle)).clear();
    //             await driver.findElement(By.xpath(locator.searchItem)).sendKeys(kioskName);
    //             await driver.findElement(By.xpath(locator.selectItem)).click();
    //             await clickWhenClickable(By.xpath(locator.btnTerm1), timeout);
    //             await clickWhenClickable(By.xpath(locator.startDate), timeout);
    //             await clickWhenClickable(By.xpath(locator.startDateBackYear), timeout);
    //             await clickWhenClickable(By.xpath(locator.startDateYear), timeout);
    //             await clickWhenClickable(By.xpath(locator.startDateMonth), timeout);
    //             await clickWhenClickable(By.xpath(locator.startDateDay), timeout);

    //             await clickWhenClickable(By.xpath(locator.endDate), timeout);
    //             await clickWhenClickable(By.xpath(locator.endDateBackYear), timeout);
    //             await clickWhenClickable(By.xpath(locator.endDateYear), timeout);
    //             await clickWhenClickable(By.xpath(locator.endDateMonth), timeout);
    //             await clickWhenClickable(By.xpath(locator.endDateDay), timeout);
    //             await driver.sleep(300);

    //             await clickWhenClickable(By.xpath(locator.btnSave), timeout);

    //             await driver.wait(until.elementLocated(By.xpath(locator.eventPermitted), timeout));
    //             await driver.findElement(By.xpath(locator.eventPermitted)).sendKeys(string.event);
    //             var rand = (Math.floor(Math.random() * (1000)) + 1);
    //             var tempDocTitle = "[" + rand + "] " + companyName + ", " + kioskName + ", " + datetime;
    //             await driver.findElement(By.xpath(locator.docTitle)).sendKeys(tempDocTitle);

    //             await clickWhenClickable(By.xpath(locator.btnPreviewDocument), timeout);
    //             await driver.sleep(300);
    //             await clickWhenClickable(By.xpath(locator.btnPrepareDocument), timeout);
    //             await driver.sleep(8000);
    //             await clickWhenClickable(By.xpath(locator.btnInviteSigner), timeout);

    //             await driver.wait(until.elementLocated(By.xpath(locator.fSubject), timeout));
    //             await driver.findElement(By.xpath(locator.fSubject)).sendKeys(tempDocTitle);
    //             await driver.findElement(By.xpath(locator.fSignerEmail)).clear();
    //             testEmail = "testcontract" + rand + "@yopmail.com"
    //             await driver.findElement(By.xpath(locator.fSignerEmail)).sendKeys(testEmail);
    //             await clickWhenClickable(By.xpath(locator.reviewerButton), timeout);
    //             await driver.sleep(300);
    //             await clickWhenClickable(By.xpath(locator.btnSend), timeout);

    //             await driver.sleep(300);

    //             await driver.get(link + string.contractManagement);
    //             await clickWhenClickable(By.xpath(locator.moreAction), timeout);
    //             await clickWhenClickable(By.xpath(locator.mSignManual), timeout);
    //             await clickWhenClickable(By.xpath(locator.confirm), timeout);
    //             await driver.sleep(300);
    //             console.log('1');
    //         };
    //     }
    //     catch (e) {
    //         error(e);
    //     }
    // })

    // it('TC04: Maker can create Licence', async () => {
    //     try {
    //         for (var i = 0; i < 10; i++) {
    //             var datetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    //             await driver.get(link + string.createKiosk);
    //             var companyName = companyArray[i].CustomerName;
    //             var licenceName = licenceArray[i].Name;
    //             await clickWhenClickable(By.xpath(locator.searchCompany), timeout)
    //             await driver.findElement(By.xpath(locator.searchCompany)).sendKeys(companyName);
    //             await clickWhenClickable(By.xpath(locator.selectItemDropDown), timeout);
    //             await driver.findElement(By.xpath(locator.docTitle)).clear();
    //             await driver.findElement(By.xpath(locator.searchItem)).sendKeys(licenceName);
    //             await driver.findElement(By.xpath(locator.selectItem)).click();
    //             await clickWhenClickable(By.xpath(locator.btnTerm1), timeout);
    //             await clickWhenClickable(By.xpath(locator.startDate), timeout);
    //             await clickWhenClickable(By.xpath(locator.startDateBackYear), timeout);
    //             await clickWhenClickable(By.xpath(locator.startDateYear), timeout);
    //             await clickWhenClickable(By.xpath(locator.startDateMonth), timeout);
    //             await clickWhenClickable(By.xpath(locator.startDateDay), timeout);

    //             await clickWhenClickable(By.xpath(locator.endDate), timeout);
    //             await clickWhenClickable(By.xpath(locator.endDateBackYear), timeout);
    //             await clickWhenClickable(By.xpath(locator.endDateYear), timeout);
    //             await clickWhenClickable(By.xpath(locator.endDateMonth), timeout);
    //             await clickWhenClickable(By.xpath(locator.endDateDay), timeout);
    //             await driver.sleep(300);

    //             await clickWhenClickable(By.xpath(locator.btnSave), timeout);

    //             await driver.wait(until.elementLocated(By.xpath(locator.eventPermitted), timeout));
    //             await driver.findElement(By.xpath(locator.eventPermitted)).sendKeys(string.event);
    //             var rand = (Math.floor(Math.random() * (1000)) + 1);
    //             var tempDocTitle = "[" + rand + "] " + companyName + ", " + licenceName + ", " + datetime;
    //             await driver.findElement(By.xpath(locator.docTitle)).sendKeys(tempDocTitle);

    //             await clickWhenClickable(By.xpath(locator.btnPreviewDocument), timeout);
    //             await driver.sleep(300);
    //             await clickWhenClickable(By.xpath(locator.btnPrepareDocument), timeout);
    //             await driver.sleep(8000);
    //             await clickWhenClickable(By.xpath(locator.btnInviteSigner), timeout);

    //             await driver.wait(until.elementLocated(By.xpath(locator.fSubject), timeout));
    //             await driver.findElement(By.xpath(locator.fSubject)).sendKeys(tempDocTitle);
    //             await driver.findElement(By.xpath(locator.fSignerEmail)).clear();
    //             testEmail = "testcontract" + rand + "@yopmail.com"
    //             await driver.findElement(By.xpath(locator.fSignerEmail)).sendKeys(testEmail);
    //             await clickWhenClickable(By.xpath(locator.reviewerButton), timeout);
    //             await driver.sleep(300);
    //             await clickWhenClickable(By.xpath(locator.btnSend), timeout);

    //             await driver.sleep(300);

    //             await driver.get(link + string.contractManagement);
    //             await clickWhenClickable(By.xpath(locator.moreAction), timeout);
    //             await clickWhenClickable(By.xpath(locator.mSignManual), timeout);
    //             await clickWhenClickable(By.xpath(locator.confirm), timeout);
    //             await driver.sleep(300);
    //             console.log('1');
    //         };
    //     }
    //     catch (e) {
    //         error(e);
    //     }
    // })

});



var error = function (e) {
    if (e.name === 'NoSuchElementError') {
        notify.msgRed('ERROR: Element not found');
    }
    else {
        notify.msgRed(e);
    }
}

function clickWhenClickable(locator, timeout) {
    return driver.wait(function () {
        return driver.findElement(locator).then(function (element) {
            return element.click().then(function () {
                return true;
            }, function (err) {
                return false;
            })
        }, function (err) {
            return false;
        });
    }, timeout, 'Timeout waiting for ' + locator.value)
}