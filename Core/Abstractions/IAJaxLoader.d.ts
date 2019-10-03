interface IAJaxLoader {
    InitAjaxLoads(): void;
    LoadInnerHtmlToElement(element: Element, onSuccessFunc: Function): void;
}
