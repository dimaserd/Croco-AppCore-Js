interface IFormDataHelper {
    FillData(object: Object): void;
    /**
     * Собрать данные для свойств объекта с Html страницы
     * @param object   объект, свойства которого нужно заполнить
     * @param prefix   префикс стоящий перед свойствами объекта
     */
    FillDataByPrefix(object: Object, prefix: string): void;
    CollectData(object: object): object;
    /**
     *   Собрать данные с формы по префиксу
     * @param object  объект, свойства которого нужно собрать с формы
     * @param prefix  префикс для свойств объекта
     */
    CollectDataByPrefix(object: object, prefix: string): object;
}
