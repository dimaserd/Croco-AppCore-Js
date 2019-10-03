var CrocoAppCore = /** @class */ (function () {
    function CrocoAppCore() {
    }
    CrocoAppCore.InitFields = function () {
        CrocoAppCore.CookieWorker = new CookieWorker();
        CrocoAppCore.FormDataHelper = new FormDataHelper();
        CrocoAppCore.AjaxLoader.InitAjaxLoads();
    };
    return CrocoAppCore;
}());
