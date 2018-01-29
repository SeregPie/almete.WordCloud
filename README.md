# almete.WordCloud

```
almete.WordCloud(words, cloudWidth, cloudHeight, {
  text = '',
  weight = 1,
  rotation = 0,
  rotationUnit = 'rad',
  fontFamily = 'serif',
  fontStyle = 'normal',
  fontVariant = 'normal',
  fontWeight = 'normal',
  fontSizeRatio = 0,
  createCanvas = function() {
    return document.createElement('canvas');
  },
})
```

Generates a cloud out of the words.

| argument | description |
| ---: | :--- |
| `words` | The words to place into the cloud. Each word is resolved to `{text, weight, rotation, rotationUnit, fontFamily, fontStyle, fontVariant, fontWeight, color}`.<br/>Possible values for `rotationUnit` are `'rad'`, `'deg'` and `'turn'`.<br/>Possible values for `fontStyle` are `'normal'`, `'italic'` and `'oblique'`.<br/>Possible values for `fontVariant` are `'normal'` and `'small-caps'`.<br/>Possible values for `fontWeight` are `'normal'`, `'bold'`, `'bolder'`, `'lighter'` and `'100'` to `'900'`. |
| `cloudWidth` | ... |
| `cloudHeight` | ... |
| `text` | The default text for each word. |
| `weight` | The default weight for each word. |
| `rotation` | The default rotation of each word. |
| `rotationUnit` | The default rotation unit of each word. |
| `fontFamily` | The default font family for each word. |
| `fontStyle` | The default font style for each word. |
| `fontVariant` | The default font variant for each word. |
| `fontWeight` | The default font weight for each word. |
| `fontSizeRatio` | The font size of the words will be scaled to respect the given ratio. For example, if the value equals `5`, then the biggest word will be 5 times bigger than the smallest one. The value can be an integer or a fraction. For example, the value `4` has the same effect as the value `1/4`. |
| `createCanvas` | ... |

Returns bounded words.

```
[{
  text,  
  rotationRad,
  rotationDeg,
  rotationTurn,
  fontStyle,
  fontVariant,
  fontWeight,
  fontSize,
  fontFamily,
  font,
  textWidth,
  rectWidth,
  rectHeight,
  rectLeft,
  rectTop,
  left,
  top,
}]
```

## demo

[Try it out!](https://seregpie.github.io/almete.WordCloud/)

## dependencies

*no dependencies*

## setup

### npm

```shell
npm install almete.wordcloud
```

### ES module

```javascript
import WordCloud from 'almete.wordcloud';
```

### Node

```javascript
const WordCloud = require('almete.wordcloud');
```

### browser

```html
<script src="https://unpkg.com/almete.wordcloud"></script>
```

The function `WordCloud` will be available under the namespace `almete`.

## usage

```javascript
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
ctx.clearRect(0, 0, canvas.width, canvas.height);
let cloudWords = almete.WordCloud(words, canvas.width, canvas.height);
cloudWords.forEach(({text, rotationRad, font, left, top}) => {
  ctx.save();
  ctx.translate(left, top);
  ctx.rotate(rotationRad);
  ctx.font = font;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'LightCoral';
  ctx.fillText(text, 0, 0);
  ctx.restore();
});
```

## see also

- [VueWordCloud](https://github.com/SeregPie/VueWordCloud)
