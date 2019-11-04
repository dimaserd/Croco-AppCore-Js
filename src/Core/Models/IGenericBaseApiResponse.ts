import { IBaseApiResponse } from './IBaseApiResponse';

export interface IGenericBaseApiResponse<T> extends IBaseApiResponse {
	ResponseObject: T;
}
