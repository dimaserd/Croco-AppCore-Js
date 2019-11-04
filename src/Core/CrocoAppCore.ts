import { CookieWorker, FormDataHelper } from './Implementations';
import {
	IFormDataHelper,
	IModalWorker,
	IAJaxLoader,
	ICrocoLogger,
	IToastrWorker,
	ICrocoRequester
} from './Abstractions';

export class CrocoAppCore {
	static CookieWorker: CookieWorker;

	static FormDataHelper: IFormDataHelper;

	/**
	 * Диспетчер модальных окон
	 */
	static ModalWorker: IModalWorker;

	static AjaxLoader: IAJaxLoader;

	static Logger: ICrocoLogger;

	static ToastrWorker: IToastrWorker;

	static Requester: ICrocoRequester;

	static InitFields() {
		CrocoAppCore.CookieWorker = new CookieWorker();
		CrocoAppCore.FormDataHelper = new FormDataHelper();
		CrocoAppCore.AjaxLoader.InitAjaxLoads();
	}
}
