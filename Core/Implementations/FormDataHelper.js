var FormDataHelper = /** @class */ (function () {
    function FormDataHelper() {
    }
    FormDataHelper.prototype.FillData = function (object) {
        this.FillDataByPrefix(object, "");
    };
    FormDataHelper.prototype.FillDataByPrefix = function (object, prefix) {
        for (var index in object) {
            var name_1 = prefix + index;
            var element = document.getElementsByName(name_1)[0];
            if (element === null || element === undefined) {
                continue;
            }
            if (Array.isArray(object[index])) {
                if (element.type !== "select-multiple") {
                    alert("An attempt to set an array to HTMLInputElement which is not a select with multiple attribute");
                }
                var select = element;
                var _loop_1 = function (i) {
                    var opt = select.options[i];
                    var value = object[index].filter(function (x) { return opt.value === x; }).length > 0;
                    opt.selected = value;
                };
                for (var i = 0; i < select.options.length; i++) {
                    _loop_1(i);
                }
                var event_1 = new Event("change");
                element.dispatchEvent(event_1);
                continue;
            }
            if (element.type === "checkbox") {
                element.checked = object[index];
            }
            else if (element.type === "radio") {
                document.querySelector("input[name=" + name_1 + "][value=" + object[index] + "]").checked = true;
            }
            else {
                element.value = object[index];
            }
            //Выбрасываю событие об изменении значения
            var event_2 = new Event("change");
            element.dispatchEvent(event_2);
        }
    };
    FormDataHelper.prototype.CollectData = function (object) {
        return this.CollectDataByPrefix(object, "");
    };
    FormDataHelper.prototype.CollectDataByPrefix = function (object, prefix) {
        console.log("FormDataHelper.CollectDataByPrefix", object, prefix);
        for (var index in object) {
            if (object.hasOwnProperty(index)) {
                var name_2 = prefix + index;
                var element = document.getElementsByName(name_2)[0];
                if (element == null) {
                    alert("Element with name " + name_2 + " not found check the source code");
                    continue;
                }
                if (element.type === "select-multiple") {
                    object[index] = Array.apply(null, element.options)
                        .filter(function (option) { return option.selected; })
                        .map(function (option) { return option.value; });
                    continue;
                }
                if (element.type === "radio") {
                    var value = document.querySelector("input[name=\"" + name_2 + "\"]:checked") != null;
                    if (value)
                        (object[index] = document.querySelector("input[name=\"" + name_2 + "\"]:checked")).value;
                    continue;
                }
                //Чекбоксы нужно проверять отдельно потому что у них свойство не value а почему-то checked
                object[index] = element.type === "checkbox" ? element.checked : element.value;
            }
        }
        return object;
    };
    return FormDataHelper;
}());
