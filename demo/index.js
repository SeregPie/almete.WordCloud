(function() {

	var svgNS = 'http://www.w3.org/2000/svg';

	new Vue({
		el: '#app',

		data: function() {
			return {
				drawer: true,
				canvasWidth: 0,
				canvasHeight: 0,
				wordsText: undefined,
				rotationItemIndex: undefined,
				rotationItems: [
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
						value: function(text) {
							var chance = new Chance(text);
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
				],
				fontFamily: undefined,
				fontFamilyValues: [
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
				],
				spacingValueIndex: 1,
				spacingValues: [0, 1/4, 1/2, 1, 2],
				fontSizeRatioValueIndex: 0,
				fontSizeRatioValues: [0, 1/20, 1/5, 1/2, 1],
			};
		},

		computed: {
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

			rotation: function() {
				var item = this.rotationItems[this.rotationItemIndex];
				return item.value;
			},

			spacing: function() {
				return this.spacingValues[this.spacingValueIndex];
			},

			fontSizeRatio: function() {
				return this.fontSizeRatioValues[this.fontSizeRatioValueIndex];
			},

			drawWordCloud: function() {
				var outerToken;
				return function(canvas, canvasWidth, canvasHeight, words, fontFamily, spacing, fontSizeRatio) {
					var innerToken = outerToken = {};
					(new FontFaceObserver(fontFamily)).load()
						.catch(function() {})
						.then(function() {
							if (innerToken === outerToken) {
								var ctx = canvas.getContext('2d');
								ctx.clearRect(0, 0, canvas.width, canvas.height);
								var boundedWords = almete.WordCloud(words, canvasWidth, canvasHeight, {
									rotationUnit: 'turn',
									fontFamily: fontFamily,
									spacing: spacing,
									fontSizeRatio: fontSizeRatio,
								});
								canvas.width = canvasWidth;
								canvas.height = canvasHeight;
								boundedWords.forEach(function(boundedWord) {
									ctx.save();
									ctx.translate(boundedWord.left, boundedWord.top);
									ctx.rotate(boundedWord.rotationRad);
									ctx.font = boundedWord.font;
									ctx.textAlign = 'center';
									ctx.textBaseline = 'middle';
									ctx.fillStyle = chance.color({format: 'hex'});
									ctx.fillText(boundedWord.text, 0, 0);
									ctx.restore();
								});
							}
						});
				};
			},
		},

		created: function() {
			this.generateWordsText();
			this.rotationItemIndex = chance.integer({min: 0, max: this.rotationItems.length - 1});
			this.fontFamily = chance.pickone(this.fontFamilyValues);
			this.$watch(function() {
				var canvas = this.$refs.canvas;
				var canvasWidth = this.canvasWidth;
				var canvasHeight = this.canvasHeight;
				var words = this.words;
				var fontFamily = this.fontFamily;
				var spacing = this.spacing;
				var fontSizeRatio = this.fontSizeRatio;
				if (canvas) {
					return setTimeout(function() {
						this.drawWordCloud(canvas, canvasWidth, canvasHeight, words, fontFamily, spacing, fontSizeRatio);
					}.bind(this), 1000);
				}
			}, function(newTimeoutId, oldTimeoutId) {
				clearTimeout(oldTimeoutId);
			});
		},

		methods: {
			generateWordsText: function() {
				this.wordsText = [
					[9, 1, 3],
					[4, 5, 15],
					[2, 5, 15],
					[1, 25, 150],
				]
					.reduce(function(returns, item) {
						var weight = item[0];
						var minCount = item[1];
						var maxCount = item[2];
						var count = chance.integer({min: minCount, max: maxCount});
						chance.n(function() {
							var word = chance.word();
							returns.push(word+' '+weight);
						}, count);
						return returns;
					}, [])
					.join('\n');
			},

			onCanvasContainerResize: function(event) {
				this.canvasWidth = event.w;
				this.canvasHeight = event.h;
			},
		},
	});

})();
