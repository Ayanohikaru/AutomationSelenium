var Locator = function () {

  var rand = (Math.floor(Math.random() * 28) + 1);
  maList = [ "","YewTee Point","Anchorpoint","Bedok Point", "Changi City Point", "The Centrepoint",  "Causeway Point",  "Northpoint City",  "Waterway Point","Melbourne City Point","Sydney City Point","Adelaide City Point","Queensland Point"];
  mlist = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  var rand1 = (Math.floor(Math.random() * 28) + 1);
  var rand2 = (Math.floor(Math.random() * 28) + 1);
  var mrand1 = Math.floor(Math.random() * 10);
  var mrand2 = Math.floor(Math.random() * (10 - mrand1 + 1)) + mrand1 + 1
  var mstart = mlist[mrand1];
  var mend = mlist[mrand2];
  var MallId = 8;

  //  Query
  this.qCustomer = "SELECT TOP 10 CustomerName FROM vendor where mallId = " + MallId + " ORDER BY NEWID()";
  this.atriumLocation = "SELECT TOP 10 Name FROM location where mallId = " + MallId + " and ParentId is Null and Type = 'atriumSpace' and isActive = 1  ORDER BY NEWID()";
  this.adspaceLocation = "SELECT TOP 10 Name FROM location where mallId = " + MallId + " and ParentId is Null and Type = 'advertisingSpace' and isActive = 1  ORDER BY NEWID()";
  this.kioskLocation = "SELECT TOP 10 Name FROM location where mallId = " + MallId + " and ParentId is Null and Type = 'kiosk' and isActive = 1  ORDER BY NEWID()";
  this.licenceLocation = "SELECT TOP 10 Name FROM location where mallId = " + MallId + " and ParentId is Null and Type = 'licences' and isActive = 1  ORDER BY NEWID()";

  //  Login Page
  this.loginEmail = "//input[@placeholder='Corporate Email']"
  this.loginPassword = "//input[@placeholder='Password']";
  this.rememberMe = "mat-checkbox-inner-container";
  this.btnLogin = "//button[contains(.,'LOG IN')]";

  // Homepage
  this.selectMall = "/html[1]/body[1]/app-root[1]/app-layout-app[1]/header[1]/div[2]/div[1]/div[1]/div[1]/div[1]/mat-icon[1]"
  this.homeWelcome = "//span[contains(text(),'Welcome')]";
  this.homeContract = "";
  this.homeActive = "";
  this.homeNote = "";
  this.homeRemindOn = "";
  this.moreAction = "//button[@ng-reflect-message='More Actions']";
  this.mSignManual = "//button[contains(text(),'Sign Manually')]";
  this.confirm = "//span[contains(text(),'CONFIRM')]";
  this.dMall = "//div[@class='mall-selected']";
  //this.mallList = "//button[contains(.,'Causeway Point')]";
  this.mallList = "//button[contains(.,'" + maList[MallId] + "')]";

  //Create document page
  this.selectItemDropDown = "//span[@class='mat-option-text'][1]"
  this.txtGeneralInto = "//div[contains(text(),'General Info')]";
  this.managerName = "/html[1]/body[1]/app-root[1]/app-layout-app[1]/mat-sidenav-container[1]/mat-sidenav-content[1]/div[1]/div[1]/app-create-license[1]/form[1]/section[1]/div[1]/mat-accordion[1]/mat-expansion-panel[1]/div[1]/div[1]/div[1]/mat-form-field[2]/div[1]/div[1]/div[1]/mat-select[1]";
  this.managerMulti = "//span[contains(text(),'Multi Manager 01 (multimanager_01@mailinator.com)')]";
  this.searchCompany = "//input[@placeholder='Search Tenant']";
  this.createDocument = '/html[1]/body[1]/app-root[1]/app-layout-app[1]/mat-sidenav-container[1]/mat-sidenav-content[1]/div[1]/div[1]/app-create-case[1]/form[1]/section[1]/section[1]/mat-card[2]/div[1]/button[1]/span[1]/div[1]/div[1]';
  this.docTitle = "//input[@placeholder='Contract Title']";
  this.searchItem = "//input[@placeholder='Search Item *']";
  this.selectItem = "//span[@class='location-name']";
  this.btnTerm1 = "//div[contains(text(),'Add License Term Item 1')]";

  this.startDate = "//input[@ng-reflect-name='licenseTermStartDate']";
  this.startDateBackYear = "//button[@aria-label='Choose month and year']";
  this.startDateYear = "//div[contains(text(),'2020')]";
  this.startDateMonth = "//div[contains(text(),'" + mstart + "')]";
  this.startDateDay = "//div[contains(@class, 'mat-calendar-body-cell-content') and text() = " + rand2 + "]";

  this.endDate = "//input[@ng-reflect-name='licenseTermEndDate']";
  this.endDateBackYear = "//button[@aria-label='Choose month and year']";
  this.endDateYear = "//div[contains(text(),'2020')]";
  this.endDateMonth = "//div[contains(text(),'" + mend + "')]";
  this.endDateDay = "//div[contains(@class, 'mat-calendar-body-cell-content') and text() = " + rand1 + "]";

  this.eventPermitted = "//input[@placeholder='Event/Permitted Use']";

  //Create doc - button
  this.btnSave = "//span[contains(text(),'SAVE')]";
  this.btnPreviewDocument = "//span[contains(text(),' PREVIEW CONTRACT')]";
  this.btnPrepareDocument = "//span[contains(text(),'PREPARE DOCS FOR SIGNING')]";
  //this.btnInviteSigner = '//span[contains(text(),"Invite Signer")]';
  this.btnInviteSigner = "//button[@class='btn-signature-actions mat-button']";
  this.reviewerButton = "//div[@class='mat-checkbox-inner-container']";
  this.permitedUse = "/html[1]/body[1]/app-root[1]/app-layout-app[1]/mat-sidenav-container[1]/mat-sidenav-content[1]/div[1]/div[1]/app-create-license[1]/form[1]/section[1]/div[1]/mat-accordion[1]/mat-expansion-panel[5]/div[1]/div[1]/div[1]/mat-form-field[1]/div[1]/div[1]/div[1]/input[1]";
  this.fSignerName = '(//input[@placeholder="Name"])[2]';
  this.fSignerEmail = '(//input[@placeholder="Email"])[3]';
  this.fSubject = '//input[@placeholder="Subject"]';
  this.btnSend = "//span[contains(*,'SEND')]";;

  // Recent Contracts
  // View Report
  // Contact us

}

module.exports = new Locator();