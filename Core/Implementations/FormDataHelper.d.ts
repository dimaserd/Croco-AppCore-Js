declare class FormDataHelper implements IFormDataHelper {
    FillData(object: Object): void;
    FillDataByPrefix(object: Object, prefix: string): void;
    CollectData(object: object): object;
    CollectDataByPrefix(object: object, prefix: string): object;
}
