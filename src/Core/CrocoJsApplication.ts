import { CookieWorker } from "Core/Implementations"
import { FormDataUtils } from "Core/Services"
import { IFormDataHelper, ICrocoLogger, IModalWorker, ICrocoRequester } from "Core/Abstractions"

export class CrocoJsApplication<TRequester extends ICrocoRequester> {
    public CookieWorker: CookieWorker;
    public FormDataUtils: FormDataUtils;
    public FormDataHelper: IFormDataHelper;
    public Requester: TRequester;
    public Logger: ICrocoLogger;
    public ModalWorker: IModalWorker;
}