var String = function () {
  var chars = "abcdefghijklmnopqurstuvwxyz";
  randChar = chars.substr( Math.floor(Math.random() * 24), 1);
  //Link
  this.home = 'home';
  this.contractManagement = 'contract-management';
  this.recentContract = 'documents';
  this.pendingContract = 'pending-contracts';
  this.tenantManagement = 'vendor-management';
  this.viewReport = 'report';
  this.schedule = 'schedule';
  this.accountSettings = 'user-profile';
  this.createAtrium = 'contract-management/create/atrium';
  this.createAdSpace = 'contract-management/create/advertising';
  this.createPushCart = 'contract-management/create/pcart';
  this.createKiosk = 'contract-management/create/kiosk';
  this.createLicence = 'contract-management/create/partyroom';
  this.createPartyRoom = 'contract-management/create/advertising';
  this.createOffice = 'contract-management/create/office';
  

  //  Create a Contract

  this.documentTitle = ''
  this.selectCompany = '//span[contains(text(),"Flashset Pte Ltd")]';
  this.companyName = randChar;
  this.itemName ='';
  this.event = 'Test Event: Parabola of Pre-Raphaelitism';
  this.emailSubject= 'Email Invite to Sign';
  // Contract Management
  this.addNote = 'Automate Test Note: Contract note is the legal record of any transaction carried out on a stock exchange through a stockbroker. It serves as the confirmation of trade done on a particular day on behalf of a client on a stock exchange'
  //console.log("Show bien "+ envi);
}
module.exports = new String();