/**
 * User: h.ghasempour
 * Date: 7/11/2019
 * Time: 8:01 AM
 */

(function ($) {
    $.fn.inputValidator = function (options) {
        var baseOptions = {
            validateOnAttribute: "data-validate-on",
            validationRulesAttribute: "data-validation-rules",
            validateValueEvent: "validateValue"
        };
        $.extend(baseOptions, options);
        var elements = $("[" + baseOptions.validationRulesAttribute + "]");
        elements.each(function () {
            if ($(this).is("[readonly]"))
                return true;
            var on = $(this).attr(baseOptions.validateOnAttribute);
            var eventHandler = new EventHandler(this, on, baseOptions.validateValueEvent);
            eventHandler.listen();
        });
    };
})(jQuery);

$(document).ready(function () {
    $("[data-validation-rules]").inputValidator();
});

$(document).on("validateValue", function (event) {
    var validator = new Validator(event.target, "data-validation-rules");
    validator.validate();
});
