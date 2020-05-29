module.exports = function (MallId) {
    var account = {
        loginPassword = "12345678",
        //QC information
        qcNganName = "Ngan Test",
        qcNganEmailA = "yopmailtest@yopmail.com",
        qcNganEmailB = "ngan@averspace.com",
        qcQuynhName = "Quynh Test",
        qcQuynhEmailA = "q@yopmail.com",
        qcQuynhEmailB = "quynh@realestatedoc.co",
    };

    // Maker information
    switch (MallId) {
        case 1:
            account.mallName = "YewTeePoint";
            account.loginUserName = "ytp_maker_01@yopmail.com";
            break;
        case 2:
            account.mallName = "AnchorPoint";
            account.loginUserName = "acp_maker_01@yopmail.com";
            break;
        case 3:
            account.mallName = "BedokPoint";
            account.loginUserName = "bp_maker_01@yopmail.com";
            break;
        case 4:
            account.mallName = "ChangiPoint";
            account.loginUserName = "maker_ccp@yopmail.com";
            break;
        case 5:
            account.mallName = "Centrepoint";
            account.loginUserName = "maker_tcp@yopmail.com";
            break;
        case 6:
            account.mallName = "CausewayPoint";
            account.loginUserName = "maker_cwp@yopmail.com";
            account.caseUATAdSpace = "813";
            break;
        case 7:
            account.mallName = "Northpoint";
            account.loginUserName = "maker_npc@yopmail.com";
            break;
        case 8:
            account.mallName = "Waterway";
            account.loginUserName = "maker_wwp@yopmail.com";
            break;
    }

    return account;
};
