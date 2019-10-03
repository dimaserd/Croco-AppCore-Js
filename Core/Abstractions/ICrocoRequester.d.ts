interface ICrocoRequester {
    DeleteCompletedRequest(link: string): void;
    ParseDate(date: string): string;
    GetCombinedData(prefix: string, obj: Object): Object;
    GetParams(obj: Object): string;
    SendPostRequestWithAnimation(link: string, data: Object, onSuccessFunc: Function, onErrorFunc: Function): void;
    UploadFilesToServer(inputId: string, onSuccessFunc: Function, onErrorFunc: Function): any;
    IsRequestGoing(link: string): boolean;
    SendAjaxGet(link: string, data: Object, onSuccessFunc: Function, onErrorFunc: Function): any;
    SendAjaxPost(link: string, data: Object, onSuccessFunc: Function, onErrorFunc: Function, animations: boolean): any;
}
