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

I created this for another project I was working on. I'm a perfectionist, however I wanted to create something that could be peer reviewed on GitHub. Input and/or constructive criticism into Color.JS in any shape or form would be greatly appreciated.

