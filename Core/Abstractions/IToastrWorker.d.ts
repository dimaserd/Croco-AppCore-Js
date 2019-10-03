interface IToastrWorker {
    ShowError(text: string): void;
    ShowSuccess(text: string): void;
    HandleBaseApiResponse(data: IBaseApiResponse): void;
}
