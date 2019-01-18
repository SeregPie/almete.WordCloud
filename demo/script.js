(function() {

	var svgNS = 'http://www.w3.org/2000/svg';
	var fontFamilyValues = [
		'Abril Fatface',
		'Annie Use Your Telescope',
		'Anton',
		'Bahiana',
		'Baloo Bhaijaan',
		'Barrio',
		'Finger Paint',
		'Fredericka the Great',
		'Gloria Hallelujah',
		'Indie Flower',
		'Life Savers',
		'Londrina Sketch',
		'Love Ya Like A Sister',
		'Merienda',
		'Nothing You Could Do',
		'Pacifico',
		'Quicksand',
		'Righteous',
		'Sacramento',
		'Shadows Into Light',
	];
	var fontSizeRatioValues = [0, 1/20, 1/5, 1/2, 1];
	var gapValues = [0, 1/4, 1/2, 1, 2];
	var rotationItems = [
		{
			value: function() {
				return 0;
			},
			svg: (function() {
				var div = document.createElement('div');
				div.appendChild((function() {
					var svg = document.createElementNS(svgNS, 'svg');
					svg.setAttribute('viewBox', '0 0 12 12');
					svg.appendChild((function() {
						var path = document.createElementNS(svgNS, 'path');
						path.setAttribute('d', 'M0 7 L0 5 L12 5 L12 7 Z');
						return path;
					})());
					return svg;
				})());
				return URL.createObjectURL(new Blob([div.innerHTML]));
			})(),
		},
		{
			value: function() {
				return 7/8;
			},
			svg: (function() {
				var div = document.createElement('div');
				div.appendChild((function() {
					var svg = document.createElementNS(svgNS, 'svg');
					svg.setAttribute('viewBox', '0 0 12 12');
					svg.appendChild((function() {
						var path = document.createElementNS(svgNS, 'path');
						path.setAttribute('d', 'M0 7 L0 5 L12 5 L12 7 Z');
						path.setAttribute('transform', 'rotate(315 6 6)');
						return path;
					})());
					return svg;
				})());
				return URL.createObjectURL(new Blob([div.innerHTML]));
			})(),
		},
		{
			value: function(word) {
				var chance = new Chance(word[0]);
				return chance.pickone([0, 3/4]);
			},
			svg: (function() {
				var div = document.createElement('div');
				div.appendChild((function() {
					var svg = document.createElementNS(svgNS, 'svg');
					svg.setAttribute('viewBox', '0 0 12 12');
					svg.appendChild((function() {
						var path = document.createElementNS(svgNS, 'path');
						path.setAttribute('d', 'M0 7 L0 5 L12 5 L12 7 Z');
						return path;
					})());
					svg.appendChild((function() {
						var path = document.createElementNS(svgNS, 'path');
						path.setAttribute('d', 'M0 7 L0 5 L12 5 L12 7 Z');
						path.setAttribute('transform', 'rotate(90 6 6)');
						return path;
					})());
					return svg;
				})());
				return URL.createObjectURL(new Blob([div.innerHTML]));
			})(),
		},
		{
			value: function(text) {
				var chance = new Chance(text);
				return chance.pickone([0, 1/8, 3/4, 7/8]);
			},
			svg: (function() {
				var div = document.createElement('div');
				div.appendChild((function() {
					var svg = document.createElementNS(svgNS, 'svg');
					svg.setAttribute('viewBox', '0 0 12 12');
					svg.appendChild((function() {
						var path = document.createElementNS(svgNS, 'path');
						path.setAttribute('d', 'M0 7 L0 5 L12 5 L12 7 Z');
						return path;
					})());
					svg.appendChild((function() {
						var path = document.createElementNS(svgNS, 'path');
						path.setAttribute('d', 'M0 7 L0 5 L12 5 L12 7 Z');
						path.setAttribute('transform', 'rotate(45 6 6)');
						return path;
					})());
					svg.appendChild((function() {
						var path = document.createElementNS(svgNS, 'path');
						path.setAttribute('d', 'M0 7 L0 5 L12 5 L12 7 Z');
						path.setAttribute('transform', 'rotate(90 6 6)');
						return path;
					})());
					svg.appendChild((function() {
						var path = document.createElementNS(svgNS, 'path');
						path.setAttribute('d', 'M0 7 L0 5 L12 5 L12 7 Z');
						path.setAttribute('transform', 'rotate(315 6 6)');
						return path;
					})());
					return svg;
				})());
				return URL.createObjectURL(new Blob([div.innerHTML]));
			})(),
		},
		{
			value: function(text) {
				var chance = new Chance(text);
				return chance.random();
			},
			svg: (function() {
				var div = document.createElement('div');
				div.appendChild((function() {
					var svg = document.createElementNS(svgNS, 'svg');
					svg.setAttribute('viewBox', '0 0 2 2');
					svg.appendChild((function() {
						var circle = document.createElementNS(svgNS, 'circle');
						circle.setAttribute('cx', 1);
						circle.setAttribute('cy', 1);
						circle.setAttribute('r', 1);
						return circle;
					})());
					return svg;
				})());
				return URL.createObjectURL(new Blob([div.innerHTML]));
			})(),
		}
	];
	var generateWordsText = function() {
		var words = [];
		var i;
		var ii;
		var weight;
		var word;
		weight = 9;
		for (i = 0, ii = chance.integer({min: 1, max: 3}); i < ii; i++) {
			word = chance.word();
			words.push(word+' '+weight);
		}
		weight = 4;
		for (i = 0, ii = chance.integer({min: 5, max: 15}); i < ii; i++) {
			word = chance.word();
			words.push(word+' '+weight);
		}
		weight = 2;
		for (i = 0, ii = chance.integer({min: 5, max: 15}); i < ii; i++) {
			word = chance.word();
			words.push(word+' '+weight);
		}
		weight = 1;
		for (i = 0, ii = chance.integer({min: 25, max: 150}); i < ii; i++) {
			word = chance.word();
			words.push(word+' '+weight);
		}
		return words.join('\n');
	};

	new Vue({
		el: '#app',

		data: function() {
			return {
				canvasHeight: 0,
				canvasWidth: 0,
				drawer: true,
				fontFamily: chance.pickone(fontFamilyValues),
				fontFamilyValues: fontFamilyValues,
				fontSizeRatioIndex: 0,
				fontSizeRatioValues: fontSizeRatioValues,
				gapIndex: 1,
				gapValues: gapValues,
				rotationIndex: chance.integer({min: 0, max: rotationItems.length - 1}),
				rotationItems: rotationItems,
				wordsText: generateWordsText(),
			};
		},

		computed: {
			drawWordCloud: function() {
				var outerToken;
				return function() {
					var innerToken = outerToken = {};
					var devicePixelRatio = window.devicePixelRatio || 1;
					var $refs = this.$refs;
					var canvas = $refs.canvas;
					var canvasHeight = this.canvasHeight;
					var canvasWidth = this.canvasWidth;
					var fontFamily = this.fontFamily;
					var fontSizeRatio = this.fontSizeRatio;
					var gap = this.gap;
					var words = this.words;
					(new Promise(function(resolve) {
						setTimeout(resolve, 1000);
					}))
						.then(function() {
							if (innerToken !== outerToken) {
								return;
							}
							Promise
								.resolve()
								.then(function() {
									return (new FontFaceObserver(fontFamily)).load();
								})
								.catch(function() {})
								.then(function() {
									if (innerToken !== outerToken) {
										return;
									}
									var ctx = canvas.getContext('2d');
									ctx.clearRect(0, 0, canvas.width, canvas.height);
									var boundedWords = almete.WordCloud(words, canvasWidth, canvasHeight, {
										fontFamily: fontFamily,
										fontSizeRatio: fontSizeRatio,
										gap: gap,
										rotationUnit: 'turn',
									});
									canvas.style.width = canvasWidth+'px';
									canvas.style.height = canvasHeight+'px';
									canvas.width = devicePixelRatio * canvasWidth;
									canvas.height = devicePixelRatio * canvasHeight;
									ctx.scale(devicePixelRatio, devicePixelRatio);
									boundedWords.forEach(function(boundedWord) {
										ctx.save();
										ctx.translate(boundedWord.centerLeft, boundedWord.centerTop);
										ctx.rotate(boundedWord.rotationRad);
										ctx.font = boundedWord.font;
										ctx.textAlign = 'center';
										ctx.textBaseline = 'middle';
										ctx.fillStyle = chance.color({format: 'hex'});
										ctx.fillText(boundedWord.text, 0, 0);
										ctx.restore();
									});
								});
						});
				};
			},

			fontSizeRatio: function() {
				return this.fontSizeRatioValues[this.fontSizeRatioIndex];
			},

			gap: function() {
				return this.gapValues[this.gapIndex];
			},

			rotation: function() {
				return this.rotationItem.value;
			},

			rotationItem: function() {
				return this.rotationItems[this.rotationIndex];
			},

			words: function() {
				var wordsText = this.wordsText;
				var rotation = this.rotation;
				return wordsText
					.split(/[\r\n]+/)
					.map(function(line) {
						return /^(.+)\s+(-?\d+)$/.exec(line);
					})
					.filter(function(matched) {
						return matched;
					})
					.map(function(matched) {
						var text = matched[1];
						var weight = Number.parseInt(matched[2]);
						return {
							text: text,
							weight: weight,
							rotation: rotation(text),
						};
					});
			},
		},

		mounted: function() {
			this.$watch(function() {
				this.drawWordCloud();
			});
		},

		methods: {
			onCanvasContainerResize: function(event) {
				this.canvasWidth = event.w;
				this.canvasHeight = event.h;
			},

			regenerateWordsText: function() {
				this.wordsText = generateWordsText();
			},
		},
	});

})();
