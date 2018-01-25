# almete.WordCloud

`almete.WordCloud(words, cloudWidth, cloudHeight, {fontSizeRatio = 0, padding = 1, createCanvas})`

A word cloud generator.

| argument | description |
| ---: | :--- |
| `words` | ... |
| `cloudWidth` | ... |
| `cloudHeight` | ... |
| `fontSizeRatio` | ... |
| `padding` | ... |
| `createCanvas` | ... |

Returns bounded words.

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
let cloudWords = almete.WordCloud(words, canvas.width, canvas.height);
let ctx = canvas.getContext('2d');
cloudWords.forEach(({
  text,
  rotation,
  fontStyle,
  fontVariant,
  fontWeight,
  fontSize,
  fontFamily,
  //textWidth,
  //textHeight,
  rectLeft,
  rectTop,
  rectWidth,
  rectHeight,
}) => {
  ctx.save();
  ctx.translate(rectLeft + rectWidth / 2, rectTop + rectHeight / 2);
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
