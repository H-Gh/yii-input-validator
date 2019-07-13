# Yii Input Validator    
Using this library you can validate value of `html` `inputs`.

## Usage
### Register Yii2 Asset  

```php
YiiJsEventHandlerAsset::register($this);
```   

### Instantiate jQuery Plugin
There are two way of instantiate this `jQuery` plugin.
#### Use default attributes
To use default options you have to add two predefined attribute to your `html` element. You put your `rules` into `data-validation-rules`. Separate your `rules` using `space`. Then using `data-validate-on` specify when these `input` should be validate. The values that you can put in `data-validate-on` follows `jQuery` events. Visit [Form events](https://api.jquery.com/category/events/form-events/), [Mouse events](https://api.jquery.com/category/events/mouse-events/) and [keyboard events](https://api.jquery.com/category/events/keyboard-events/) .
```html
<input type='text' data-validate-on="change" data-validation-rules="required" />
```
 
 #### Define your custom attributes  
In other hand, You can define your custom attributes. For this you have to `instantiate` `inputValidator` plugin.
```javascript
$(document).ready(function () {
    $("[data-custom-validate-on]").inputValidator({
        validateOnAttribute: "data-custom-validate-on",  
	validationRulesAttribute: "data-custom-validation-rules",  
	validateValueEvent: "customValidateValue"
    });
});
```
Now, you can use these attributes like this:
```html
<input type='text' data-custom-validate-on="change" data-custom-validation-rules="required" />
```  
***Note:*** Try to use predefined `event` but if you define custom `validateValueEvent`, you have to handle this event yourself. Just predefined `evnet` is handled.

Handle you custom event like this:
```javascript
$(document).on("customValidateValue", function (event) {
    var validator = new Validator(
        // Element which its value will validate 
        event.target,
        // Attribute of your element which holds rules for validation 
        "data-custom-validation-rules");
    validator.validate();
});
```

## Rules
Some pattern can have custom message. If any `rule` get some attributes, it get attributes as a `json`.
### required
##### Description:
This rule, check `length` of `input` value.
##### Predefined message
	This field is required.
##### Sample
```html
<input type='text' data-validate-on="change" data-validation-rules="required" />
```

### number
##### Description
This rule, check if the `input` value is a `number` or not.
##### Predefined message
	This field should be number.
##### sample
```html
<input type='text' data-validate-on="change" data-validation-rules="number" />
```

### ne
##### Description
This rule, check if the `input` value is `not equal` to a `value`.
##### Predefined message
	Invalid value.
##### sample
```html
<!-- This means the value nust not be equal to 0 -->
<input type='text' data-validate-on="change" data-validation-rules='ne{"value":0,"errorMessage":"This input value should not be equal to 0."}' />
```

### nin
##### Description
This rule, check if the `input` value is `not in` in a `list`.
##### Predefined message
	The value must follow {pattern}
##### sample
```html
<!-- This means the value must not be 1, test or 2 -->
<!-- Currently just numbers are supoorted -->
<input type='text' data-validate-on="change" data-validation-rules='nin{"values":[0,1,2],"errorMessage":"This input value should not be equal to 0, 1 or 2."}' />
```

### in
##### Description
This rule, check if the `input` value is `in` in a `list`.
##### Predefined message
	The value must follow {pattern}
##### sample
```html
<!-- This means the value must be 1, test or 2 -->
<!-- Currently just numbers are supoorted -->
<input type='text' data-validate-on="change" data-validation-rules='in{"values":[0,1,2],"errorMessage":"This input value should be equal to 0, 1 or 2."}' />
```


### regex
##### Description
This rule, check if the `input` value match `pattern`.
##### Predefined message
	Use only allowed characters follows by {pattern}
##### sample
```html
<!-- This means the value must follow ^[a-z,_]+$ -->
<input type='text' data-validate-on="change" data-validation-rules='regex{"pattern":"^[a-z,_]+$"}' />
```

