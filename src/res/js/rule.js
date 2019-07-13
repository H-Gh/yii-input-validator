/**
 * User: h.ghasempour
 * Date: 7/03/2019
 * Time: 12:36 PM
 */

function Rule(ruleString) {
    var type = null;
    var value = null;
    var errorMessage = null;
    setType();
    setValue();

    function setType() {
        type = /^([a-z]+){?/.exec(ruleString);
        if (type !== null)
            type = type[1];
    }

    function setValue() {
        value = /({.+})$/.exec(ruleString);
        if (value !== null) {
            value = JSON.parse(value[1]);
            if (value.errorMessage !== undefined) {
                errorMessage = value.errorMessage;
                delete value.errorMessage;
            }
        }
    }

    this.getType = function () {
        return type;
    };

    this.getValue = function () {
        return value;
    };

    this.getErrorMessage = function () {
        if (errorMessage == null)
            errorMessage = getDefaultErrorMessage();
        return errorMessage;
    };

    function getDefaultErrorMessage() {
        switch (type) {
            case "required" :
                return "This field is required.";
            case "number":
                return "This field should be number.";
            case "regex" :
                return "Use only allowed characters follows by " + value.pattern;
            case "ne":
                return "Invalid value.";
            case "in":
                return "The value must in " + value.values;
            case "nin":
                return "The value must not in " + value.values;
        }
    }
}