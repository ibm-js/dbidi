---
layout: default
title: dbidi/TextLayoutEngine
---

# dbidi/TextLayoutEngine

The `dbidi/TextLayoutEngine` module provides a bidi transformation engine used for reordering and shaping bidirectional text.
Engine implements Unicode Bidi Algorithm as specified at [Unicode Standard Annex #9](http://www.unicode.org/reports/tr9/).
Type of the transformation is controlled by parameters, which describe actual format of input and required format of output.
Object holds these parameters as a properties, which allow to reuse them in multiply calls of engine.
Additionally object holds info about relative positions of each character in the source and resulting strings.
This info is placed into sourceToTarget and targetToSource attributes. 

##### Table of Contents
[Instantiation](#instantiation)  
[Parameters](#parameters)  
[Launching](#launching)  
[Utilities](#utilities)  
[Limitations](#limitations)    

<a name="instantiation"></a>
## Instantiation

You can create a `TextLayoutEngine` object with or without parameters, which describe format of input and output of engine.
If parameters are not defined, their default values are used. By default it is assumed, that
* source text has implicit ordering scheme, left-to-right base direction and symmetric swapping;
* resulting text has visual ordering scheme and left-to-right base direction.

```js
require(["dbidi/TextLayoutEngine"], function (TextLayoutEngine) {
  var engine1 = new TextLayoutEngine();
  var engine2 = new TextLayoutEngine({inputFormat: "ILYNN", outputFormat: "VLNNN"});
});
```

<a name="parameters"></a>
## Parameters

Parameters, which describe format of source and resulting text, has the same structure and should be presented by string, containing 5 letters exactly.
Each letter is associated with specific attribute of bidi layout.

1. First letter describes the ordering scheme. Possible values are the following:
   * I  -  implicit ordering scheme
   * V  -  visual ordering scheme
2. Second letter describes the base text direction. Possible values:
   * L  -  left to right base direction
   * R  -  right to left base direction
   * C  -  contextual left to right base direction
   * D  -  contextual right to left base direction
3. Third letter is about symmetric swapping. Possible values:
   * Y  -  text is formatted with symmetric swapping
   * N  -  text is formatted without symmetric swapping
4. Forth letter is about text shaping. Possible values:
   * S  -  text is shaped
   * N  -  text is not shaped
5. Fifth letter describes type of numeral shaping. Currently the only possible value is "N", which means "nominal".

You can set or update values of parameters by one of the following ways:
* create instance of TextLayoutEngine passing their values as arguments
* launch process of text transformation with specific parameters
* set value of each parameter directly, for example:

```js
require(["dbidi/TextLayoutEngine"], function (TextLayoutEngine) {
  var engine = new Engine();
  engine.inputFornat = "ILYNN";
  engine.outputFormat = "VLNNN";
});
```

<a name="launching"></a>
## Launching

Once you have a `TextLayoutEngine` object you can launch the process of text transformation by calling the `bidiTransform()` method.
First argument of this method should be the String, containing source text. Second and third parameters, which describe respectively input and output format of the text, can be omitted. 
 
```js
require(["dbidi/TextLayoutEngine"], function (TextLayoutEngine) {
  var engine = new TextLayoutEngine();
  // transform the text with the given parameters
  String result1 = engine.bidiTransform("SOURCE TEXT","ILYNN","VLNNN");
  // transform the text with the parameters, stored by object
  String result2 = engine.bidiTransform("SOURCE TEXT");
});
```

<a name="utilities"></a>
## Utilities

The `dbidi/TextLayoutEngine` module additionally provides few utilities to deal with bidirectional text:

* checkContextual() -  Determines base direction of a given text according to directionality of its characters
* hasBidiChar() - Detects presence of characters with strong right-to-left direction in a given text. 

<a name="limitations"></a>
## Limitations

1. No support for following numeric shaping options:
   * Hindi
   * Contextual 
   * Nominal
2. No support for following shaping options:
   * Initial shaping
   * Middle shaping
   * Final shaping
   * Isolated shaping
3. No support for bidi marks (they are handled like neutrals).
4. No support for Windows compatibility.
5. No support for code pages.