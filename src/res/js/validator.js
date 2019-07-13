/**
 * User: h.ghasempour
 * Date: 7/11/2019
 * Time: 8:01 AM
 */

var Validator = function (element, validationRulesAttribute) {
    this.validate = function () {
        if ($(element).is("[readonly]"))
            return true;
        var rules = getRules(element, validationRulesAttribute);
        var hasError;
        for (var ruleIndex in rules) {
            if (canPassRule(element, rules[ruleIndex])) {
                hasError = false;
                continue;
            }
            hasError = true;
            addError(element, rules[ruleIndex]);
            break;
        }
        if (!hasError)
            emptyError(element);
    };
    this.reset = function () {
        emptyError(element);
    }
};

var getRules = function (element, validationRulesAttribute) {
    var rulesString = $(element).attr(validationRulesAttribute);
    var rules = [];
    var rulesStrings = rulesString.match(/\w+{?(?:\"[^\"]+\":\"?[^\"]+\"?[},])*/gi);
    $.each(rulesStrings, function (index, ruleString) {
        rules.push(new Rule(ruleString))
    });

    return rules;
};

var canPassRule = function (element, rule) {
    switch (rule.getType()) {
        case "required" :
            return canPassRequiredRule(element);
        case "number" :
            return canPassNumberRule(element);
        case "regex":
            return canPassRegexRule(element, rule);
        case "ne" :
            return canPassNotEqualRule(element, rule);
        case "in" :
            return canPassInRule(element, rule);
        case "nin" :
            return canPassNotInRule(element, rule);
        default:
            return true;
    }
};

var canPassRequiredRule = function (element) {
    var elementType = $(element).get(0).tagName;
    switch (elementType) {
        case "SELECT" :
            return $(element).find(":selected").text();
        default:
            return $(element).val().length !== 0;
    }
};

var canPassNumberRule = function (element) {
    return new RegExp("[0-9]+").exec($(element).val())
};

var canPassRegexRule = function (element, rule) {
    var matched = $(element).val().match(new RegExp(rule.getValue().pattern, 'gi'));
    return matched !== null;
};

var canPassNotEqualRule = function (element, rule) {
    var ruleValue = rule.getValue();
    var ruleValueType = ruleValue.value.constructor;
    var inputValue = ruleValueType($(element).val());
    return inputValue !== ruleValue.value;
};

var canPassInRule = function (element, rule) {
    var isInValues = false;
    $.each(rule.getValue().values, function (index, value) {
        var valueType = value.constructor;
        if (valueType($(element).val()) === value)
            isInValues = true;
    });

    return isInValues;
};

var canPassNotInRule = function (element, rule) {
    return !canPassInRule(element, rule);
};

var addError = function (element, rule) {
    $(element).addClass("error");
    var parent = $(element).closest(".input-validator-container");
    if(parent.length === 0) {
        $(element).wrap("<div class='input-validator-container'></div>");
        parent = $(element).closest(".input-validator-container");
    }
    if (parent.find(".error-box").length === 0)
        parent.append("<span class='error-box'></span>");
    parent.find(".error-box").html(rule.getErrorMessage());
};

var emptyError = function (element) {
    $(element).removeClass("error");
    var parent = $(element).parent(".input-validator-container");
    parent.find(".error-box").remove();
};
