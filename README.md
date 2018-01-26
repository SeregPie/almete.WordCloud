# almete.WordCloud

`almete.WordCloud(words, cloudWidth, cloudHeight, {text = '', weight = 1, rotation = 0, fontFamily = 'serif', fontStyle = 'normal', fontVariant = 'normal', fontWeight = 'normal', fontSizeRatio = 0,fontSizeRatio = 0, createCanvas})`

A word cloud generator.

| argument | description |
| ---: | :--- |
| `words` | ... |
| `cloudWidth` | ... |
| `cloudHeight` | ... |

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
