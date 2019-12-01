import { IFormDataHelper } from '../Abstractions';
import { CSharpType } from '../Enumerations';
import { CrocoTypeDescription } from '../Models';

export class FormDataHelper implements IFormDataHelper {

    /**
    * Константа для обозначения null значений и вычленения их из строки
    * */
    public readonly NullValue: string = "VALUE_NULL";

    FillData(object: Object): void {
        this.FillDataByPrefix(object, "");
    }

    FillDataByPrefix(object: Object, prefix: string): void {

        for (let index in object) {

            let valueOfProp = object[index];

            if (valueOfProp === null || valueOfProp === undefined) {
                continue;
            }

            const name = prefix + index;

            const element = document.getElementsByName(name)[0] as any;

            if (element === null || element === undefined) {
                continue;
            }

            if (Array.isArray(valueOfProp)) {

                if (element.type !== "select-multiple") {
                    alert("An attempt to set an array to HTMLInputElement which is not a select with multiple attribute");
                }
                let select = element as HTMLSelectElement;
                for (let i = 0; i < select.options.length; i++) {
                    const opt = select.options[i];

                    const value = valueOfProp.filter(x => opt.value === x).length > 0;

                    opt.selected = value;

                }
                const event = new Event("change");
                element.dispatchEvent(event);

                continue;
            }

            if (element.type === "checkbox") {
                element.checked = valueOfProp;
            }
            else if (element.type === "radio") {
                (document.querySelector(`input[name=${name}][value=${valueOfProp}]`) as HTMLInputElement).checked = true;
            }
            else {
                element.value = valueOfProp;
            }

            //Выбрасываю событие об изменении значения
            const event = new Event("change");
            element.dispatchEvent(event);
        }

    }


    CollectData(object: object): object {
        return this.CollectDataByPrefix(object, "");
    }

    CollectDataByPrefix(object: object, prefix: string): object {

        console.log("FormDataHelper.CollectDataByPrefix", object, prefix);

        for (let index in object) {
            if (object.hasOwnProperty(index)) {

                const name = prefix + index;

                const element = document.getElementsByName(name)[0] as any;

                if (element == null) {
                    alert(`Element with name ${name} not found check the source code`);
                    continue;
                }

                if (element.type === "select-multiple") {

                    object[index] = Array.apply(null, element.options)
                        .filter(option => option.selected)
                        .map(option => option.value);

                    continue;
                }

                if (element.type === "radio") {
                    var value = document.querySelector(`input[name="${name}"]:checked`) != null
                    if (value)
                        (object[index] = document.querySelector(`input[name="${name}"]:checked`) as HTMLInputElement).value;
                    continue;
                }


                //Чекбоксы нужно проверять отдельно потому что у них свойство не value а почему-то checked
                object[index] = element.type === "checkbox" ? element.checked : element.value;
            }
        }
        return object;
    }


    /**
     * Собрать данные с сопоставлением типов
     * @param modelPrefix префикс модели
     * @param typeDescription описание типа
     */
    public CollectDataByPrefixWithTypeMatching(modelPrefix: string, typeDescription: CrocoTypeDescription): object {

        this.CheckData(typeDescription);

        const initData = this.CollectDataByPrefix(this.BuildObject(typeDescription), modelPrefix);

        for (let i = 0; i < typeDescription.Properties.length; i++) {

            const prop = typeDescription.Properties[i];

            let initValue = this.GetInitValue(initData[prop.PropertyName]);

            switch (prop.TypeName) {
                case CSharpType.Decimal.toString():

                    initData[prop.PropertyName] = (initValue !== null) ? Number((initValue).replace(/,/g, '.')) : null;
                    break;
                case CSharpType.Boolean.toString():
                    initData[prop.PropertyName] = (initValue !== null) ? initValue.toLowerCase() === "true" : null;
                    break;
            }
        }

        return initData;
    }

    private GetInitValue(propValue: any): string {
        let strValue = (propValue as string);

        return strValue === this.NullValue ? null : strValue;
    }

    private CheckData(typeDescription: CrocoTypeDescription): void {
        if (!typeDescription.IsClass) {
            const mes = "Тип не являющийся классом не поддерживается";
            alert(mes);
            throw Error(mes);
        }
    }

    private BuildObject(typeDescription: CrocoTypeDescription): object {
        const data = {};

        for (let i = 0; i < typeDescription.Properties.length; i++) {

            const prop = typeDescription.Properties[i];

            data[prop.PropertyName] = "";
        }

        return data;
    }
}
