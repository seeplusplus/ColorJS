var HEX_DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

var intToHex = function (number) {
	var hexChar = HEX_DIGITS[number % 16];
	if (number / 16 >= 1) {
		hexChar = intToHex(Math.floor(number / 16)) + hexChar;
	}

	return hexChar;
};


var Color = function (colorValue) {
	this.rgbRegExp = new RegExp(/[\w|\d]{1,3}\s?,\s?[\w|\d]{1,3}\s?,\s?[\w|\d]{1,3}/);
	this.hexRegExp = new RegExp(/#?[0-9a-f]{6}/i);
	this.shortHexRegExp = new RegExp(/#?[0-9a-f]{3}/i);
	this.stringValue = colorValue;
};
Color.prototype.isHex = function () {
	var strLength = this.stringValue.replace('#', '').length;
	return (strLength === 6 && this.hexRegExp.test(this.stringValue)) || (strLength === 3 && this.shortHexRegExp.test(this.stringValue));
};
Color.prototype.isRgb = function () {
	return this.rgbRegExp.test(this.stringValue);
};
Color.prototype.isColor = function () {
	return this.isRgb() || this.isHex();
};
Color.prototype.shortHexToLongHex = function (hexColorString) {
	var longHexString = '', hexIdx, hexChar;
    
    if (hexColorString.length !== 3 || !this.isHex(hexColorString)) {
        return undefined;
    }
    
	for (hexIdx in hexColorString) {
        
		hexChar = hexColorString[hexIdx];
		longHexString += (hexChar + hexChar);
	}
	return longHexString;
};
Color.prototype.hexToRgbArray = function (hexColorString) {
	//This function is only meant to receive 6 digit hexadecimal strings.
	if (hexColorString.length !== 6 || !this.isHex(hexColorString)) {
		return undefined;
	}
	var rgbArray = [],
        rgb = [hexColorString.substr(0, 2), hexColorString.substr(2, 2), hexColorString.substr(4, 2)];
	rgb.forEach(function toHex(currentItem) {
		rgbArray.push(parseInt(currentItem, 16));
	});
	return rgbArray;
};
Color.prototype.rgbArrayToHex = function (rgbArray) {
	var hexString = '';
	rgbArray.forEach(function (currentValue) {
		var tempString =  intToHex(parseInt(currentValue, 10));
		if (tempString.length < 2) {
			tempString = '0' + tempString;
        }
		hexString =  hexString + tempString;
	});
	return hexString;
};
Color.prototype.asRgb = function () {
	var rgbArray = [], tempString = this.stringValue.replace('#', '');
	if (this.isRgb()) {
		return this.stringValue;
	}
	if (!this.isHex()) {
		return undefined;
	}
	
	//there should never be an instance where this is not true if hexRegExp.test(this.stringValue) is false
	if (tempString.length === 3 && this.shortHexRegExp.test(tempString)) {
		tempString = this.shortHexToLongHex(tempString);
    }
	rgbArray = this.hexToRgbArray(tempString);
	return rgbArray.join(',');
};

Color.prototype.asHex = function () {
	var hexString = '';
	if (this.isHex()) {
        return (this.stringValue.length === 3) ? this.shortHexToLongHex(this.stringValue) : this.stringValue;
	}
	if (!this.isRgb()) {
		hexString = undefined;
		return hexString;
	}
	hexString = this.rgbArrayToHex(this.stringValue.split(',').map(function (currentValue) {
		return currentValue.trim();
	}));
	return hexString;
};