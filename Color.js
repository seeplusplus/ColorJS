var Color = (function () {
    'use strict';
    var Color = function (colorValue) {
        colorValue = colorValue.replace('#', '');

        if (!Color.isHex(colorValue) && !Color.isRgb(colorValue)) {
            throw Color.InvalidColorException;
        }
        this.colorValue = colorValue;
    };

    /* ################ Namespace Variables ################ */

    Color.InvalidColorException = "Input string is not valid for Color";
    Color.rgbRegExp = new RegExp(/[\w|\d]{1,3}\s?,\s?[\w|\d]{1,3}\s?,\s?[\w|\d]{1,3}/);
    Color.hexRegExp = new RegExp(/#?[0-9a-f]{6}/i);
    Color.shortHexRegExp = new RegExp(/#?[0-9a-f]{3}/i);
    Color.HEX_DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

    /* ################ End of Namespace Variables ################ */

    /* ################ Static Functions ################ */

    Color.intToHex = function (number) {
        var hexChar = Color.HEX_DIGITS[number % 16];
        if (number / 16 >= 1) {
            hexChar = Color.intToHex(Math.floor(number / 16)) + hexChar;
        }

        return hexChar;
    };

    Color.isHex = function (colorString) {

        var strLength = colorString.replace('#', '').length;
        return (strLength === 6 && Color.hexRegExp.test(colorString)) ||
            (strLength === 3 && Color.shortHexRegExp.test(colorString));
    };
    Color.isRgb = function (colorString) {
        return Color.rgbRegExp.test(colorString);
    };

    Color.shortHexToLongHex = function (hexColorString) {
        var longHexString = '', hexIdx, hexChar;

        if (hexColorString.length !== 3 || !this.isHex(hexColorString)) {
            throw Color.InvalidColorException;
        }

        for (hexIdx in hexColorString) {
            if (hexColorString.hasOwnProperty(hexIdx)) {
                hexChar = hexColorString[hexIdx];
                longHexString += (hexChar + hexChar);
            }
        }
        return longHexString;
    };
    Color.hexToRgbArray = function (hexColorString) {
        if (hexColorString.length !== 6 || !Color.isHex(hexColorString)) {
            return undefined;
        }
        var rgbArray = [],
            rgb = [hexColorString.substr(0, 2), hexColorString.substr(2, 2), hexColorString.substr(4, 2)];
        rgb.forEach(function toHex(currentItem) {
            rgbArray.push(parseInt(currentItem, 16));
        });
        return rgbArray;
    };
    Color.rgbArrayToHex = function (rgbArray) {
        var hexString = '';
        rgbArray.forEach(function (currentValue) {
            var tempString = Color.intToHex(parseInt(currentValue, 10));
            if (tempString.length < 2) {
                tempString = '0' + tempString;
            }
            hexString = hexString + tempString;
        });
        return hexString;
    };
    /* ################ End Static Functions ################ */


    /* ################ Prototype Functions ################ */

    Color.prototype.isColor = function () {
        return Color.isRgb(this.colorValue) || Color.isHex(this.colorValue);
    };



    Color.prototype.asRgb = function () {
        var rgbArray = [], tempString = this.colorValue.replace('#', '');
        if (Color.isRgb(this.colorValue)) {
            return this.colorValue;
        }
        if (!Color.isHex(this.colorValue)) {
            return undefined;
        }

        if (tempString.length === 3 && Color.shortHexRegExp.test(tempString)) {
            tempString = Color.shortHexToLongHex(tempString);
        }
        rgbArray = Color.hexToRgbArray(tempString);
        return rgbArray.join(',');
    };

    Color.prototype.asHex = function () {
        var hexString = '';
        if (Color.isHex(this.colorValue)) {
            return (this.colorValue.length === 3) ? Color.shortHexToLongHex(this.colorValue) : this.colorValue;
        }
        if (!Color.isRgb(this.colorValue)) {
            return undefined;
        }
        hexString = Color.rgbArrayToHex(this.colorValue.split(',').map(function (currentValue) {
            return currentValue.trim();
        }));
        return hexString;
    };

    Color.prototype.asInverted = function () {
        var currentColor = this.asHex(),
            invertedRgbArray = [],
            currentColorRgbArray =  Color.hexToRgbArray(currentColor),
            value = '';
        for (value in currentColorRgbArray) {
            if (currentColorRgbArray.hasOwnProperty(value)) {
                invertedRgbArray.push(Math.abs(255 - parseInt(currentColorRgbArray[value], 10)));
            }
        }
        return Color.rgbArrayToHex(invertedRgbArray);
    };

    Color.prototype.isDark = function () {
        var currentColor = this.asHex(),
            rgbArray = Color.hexToRgbArray(currentColor),
            isDark = true,
            v = null;
        for (v in rgbArray) {
            if (rgbArray.hasOwnProperty(v) && rgbArray[v] > 126) {
                isDark = false;
            }
        }
        return isDark;
    };

    /* ################ End Prototype Functions ################ */
    return Color;
}());