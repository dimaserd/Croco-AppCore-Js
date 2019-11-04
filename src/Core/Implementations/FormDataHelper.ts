import { IFormDataHelper } from '../Abstractions';

export class FormDataHelper implements IFormDataHelper {
    FillData(object: Object) : void {
        this.FillDataByPrefix(object, '');
    }

    FillDataByPrefix(object: Object, prefix: string) : void {

        for (let index in object) {

            const name = prefix + index;

            const element = document.getElementsByName(name)[0] as any;

            if (element === null || element === undefined) {
                continue;
            }

            if (Array.isArray(object[index])) {

                if (element.type !== 'select-multiple') {
                    alert('An attempt to set an array to HTMLInputElement which is not a select with multiple attribute');
                }
                let select = element as HTMLSelectElement;
                for (let i = 0; i < select.options.length; i++) {
                    const opt = select.options[i];

                    const value = object[index].filter(x => opt.value === x).length > 0;

                    opt.selected = value;

                }
                const event = new Event('change');
                element.dispatchEvent(event);

                continue;
            }

            if (element.type === 'checkbox') {
                element.checked = object[index];
            }
            else if (element.type === 'radio') {
                (document.querySelector(`input[name=${name}][value=${object[index]}]`) as HTMLInputElement).checked = true;
            }
            else {
                element.value = object[index];
            }

            //Выбрасываю событие об изменении значения
            const event = new Event('change');
            element.dispatchEvent(event);
        }

    }

    
    CollectData(object: object): object {
        return this.CollectDataByPrefix(object, '');
    }

    CollectDataByPrefix(object: object, prefix: string): object {

        console.log('FormDataHelper.CollectDataByPrefix', object, prefix);

        for (let index in object) {
            if (object.hasOwnProperty(index)) {

                const name = prefix + index;

                const element = document.getElementsByName(name)[0] as any;

                if (element == null) {
                    alert(`Element with name ${name} not found check the source code`);
                    continue;
                }

                if (element.type === 'select-multiple') {

                    object[index] = Array.apply(null, element.options)
                        .filter(option => option.selected)
                        .map(option => option.value);

                    continue;
                }

                if (element.type === 'radio') {
                    var value = document.querySelector(`input[name='${name}']:checked`) != null
                    if (value)
                        (object[index] = document.querySelector(`input[name='${name}']:checked`) as HTMLInputElement).value;
                    continue;
                }


                //Чекбоксы нужно проверять отдельно потому что у них свойство не value а почему-то checked
                object[index] = element.type === 'checkbox' ? element.checked : element.value;
            }
        }
        return object;
    }
}