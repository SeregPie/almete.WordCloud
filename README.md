# almete.WordCloud

```
almete.WordCloud(words, cloudWidth, cloudHeight, {
  text = '',
  weight = 1,
  rotation = 0,
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
| `words` | The words to place into the cloud. Each word will be resolved to `{text, weight, rotation, fontFamily, fontStyle, fontVariant, fontWeight, color}`. |
| `cloudWidth` | ... |
| `cloudHeight` | ... |
| `text` | The default text for each word. |
| `weight` | The weight for each word. |
| `rotation` | The rotation of each word. The units for the rotation must be turns (1 turn is 360 degrees). |
| `fontFamily` | The font family for each word. |
| `fontStyle` | The font style for each word. Possible values are `'normal'`, `'italic'` and `'oblique'`. |
| `fontVariant` | The font variant for each word. Possible values are `'normal'` and `'small-caps'`. |
| `fontWeight` | The font weight for each word. Possible values are `'normal'`, `'bold'`, `'bolder'`, `'lighter'` and `'100'` to `'900'`. |
| `fontSizeRatio` | The font size of the words will be scaled to respect the given ratio. For example, if the value equals `5`, then the biggest word will be 5 times bigger than the smallest one. The value can be an integer or a fraction. For example, the value `4` has the same effect as the value `1/4`. |
| `createCanvas` | ... |

Returns bounded words.

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
cloudWords.forEach(({
  text,
  rotation,
  fontStyle,
  fontVariant,
  fontWeight,
  fontSize,
  fontFamily,
  //textWidth,
  //rectWidth,
  //rectHeight,
  left,
  top,
}) => {
  ctx.save();
  ctx.translate(left, top);
  ctx.rotate(rotation * 2 * Math.PI);
  ctx.font = [fontStyle, fontVariant, fontWeight, `${fontSize}px`, fontFamily].join(' ');
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'LightCoral';
  ctx.fillText(text, 0, 0);
  ctx.restore();
});
```

## see also

- [VueWordCloud](https://github.com/SeregPie/VueWordCloud)
