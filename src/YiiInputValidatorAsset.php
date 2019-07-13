<?php
/**
 * User: h.ghasempour
 * Date: 7/8/2019
 * Time: 3:36 PM
 */

namespace Hgh\YiiInputValidator;

use yii\web\AssetBundle;

/**
 * Class YiiInputValidator
 * @package Hgh\YiiInputValidator
 */
class YiiInputValidatorAsset extends AssetBundle
{
    public $sourcePath = '@vendor/hgh/yii-input-validator/src/res';

    public $js = [
        "js/listener.js",
        "js/validator.js",
        "js/rule.js"
    ];

    public $depends = [
        'yii\web\JqueryAsset',
        'Hgh\YiiJsEventHandler\YiiJsEventHandlerAsset',
    ];
}