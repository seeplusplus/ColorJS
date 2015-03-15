# Color #

JavaScript RGB to Hexadecimal color converter.

# What? #

Color.JS is a small object that can be used to convert RGB color notation to Hexadecimal. 
The JS file adds many useful functions that can be used to validate/generate color formats.


+ **isRgb** and **isHex** - Validate the string used to create the instance of an object  of Color as either RGB or Hexadecimal, respectively.

+ **asRgb** - Returns the current instance's color value as an RGB value.

+ **asHex** - Returns the current instance's color value as a Hexadecimal value.

# How? #

Once executed, Color.js allows you to create Color objects as follows:
```js
var blue = new Color('0000ff');
var red = new Colow('255,0,0');
var purple = new Color('f0f');
```
All of these are proper ways to call the constructor, and all work properly.

# Why? #

I wanted to create a website, which can be found in the examples folder as ColorChanger.html. I wanted an easy way to convert Hex to Rgb to update the page, thus Color.js was born.

Even though Color.js has fulfilled its original purpose, I want to continue expanding it. That being said, I am open to any suggestions or constructive criticism to this project.
