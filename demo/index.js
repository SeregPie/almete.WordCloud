(function() {

	new Vue({
		el: '#App',

		data: function() {
			return {
				form: {
					words: {
						value: '',
					},

					fontFamily: (function() {
						var values = [
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
							'Lora',
							'Love Ya Like A Sister',
							'Merienda',
							'Nothing You Could Do',
							'Pacifico',
							'Quicksand',
							'Righteous',
							'Sacramento',
							'Shadows Into Light',
						];
						return {
							values: values,
							value: chance.pickone(values),
						};
					})(),

					rotation: (function() {
						var values = [
							function() {
								return 0;
							},
							function() {
								return 7/8;
							},
							function() {
								return chance.pickone([0, 3/4]);
							},
							function() {
								return chance.pickone([0, 1/8, 3/4, 7/8]);
							},
							function() {
								return Math.random();
							},
						];
						return {
							values: values,
							value: chance.pickone(values),
						};
					})(),

					fontSizeRatio: {
						values: [0, 1, 2, 3, 4, 5, 10, 20, 30],
						valueIndex: 0,
					},
				},

				canvasWidth: 0,
				canvasHeight: 0,

				drawer: true,
			};
		},

		computed: {
			words: function() {
				var formRotationValue = this.form.rotation.value;
				var formWordsValue = this.form.words.value;

				return formWordsValue
					.split(/[\r\n]+/)
					.map(function(line) {
						return /^(.+)\s+(-?\d+)$/.exec(line);
					})
					.filter(function(matched) {
						return matched;
					})
					.map(function(matched) {
						return {
							text: matched[1],
							weight: Number.parseInt(matched[2]),
							rotation: formRotationValue(),
						};
					});
			},

			fontFamily: function() {
				return this.form.fontFamily.value;
			},

			fontSizeRatio: function() {
				var values = this.form.fontSizeRatio.values;
				var valueIndex = this.form.fontSizeRatio.valueIndex;

				return values[valueIndex];
			},

			drawWordCloud: function() {
				var words = this.words;
				var canvasWidth = this.canvasWidth;
				var canvasHeight = this.canvasHeight;
				var fontFamily = this.fontFamily;
				var fontSizeRatio = this.fontSizeRatio;
				var canvas = this.$refs.canvas;

				if (canvas) {
					var ctx = canvas.getContext('2d');
					ctx.clearRect(0, 0, canvas.width, canvas.height);
					var cloudWords = almete.WordCloud(words, canvasWidth, canvasHeight, {
						rotationUnit: 'turn',
						fontFamily: fontFamily,
						fontSizeRatio: fontSizeRatio,
					});
					canvas.width = canvasWidth;
					canvas.height = canvasHeight;
					cloudWords.forEach(function(cloudWord) {
						ctx.save();
						ctx.translate(cloudWord.left, cloudWord.top);
						ctx.rotate(cloudWord.rotationRad);
						ctx.font = [
							cloudWord.fontStyle,
							cloudWord.fontVariant,
							cloudWord.fontWeight,
							cloudWord.fontSize + 'px',
							cloudWord.fontFamily,
						].join(' ');
						ctx.textAlign = 'center';
						ctx.textBaseline = 'middle';
						ctx.fillStyle = 'LightCoral';
						ctx.fillText(cloudWord.text, 0, 0);
						ctx.restore();
					});
				}
			},
		},

		watch: {
			drawWordCloud: function() {},
		},

		created: function() {
			this.generateRandomText();
		},

		methods: {
			generateRandomText: function() {
				this.form.words.value = [
					[9, 1, 3],
					[4, 5, 15],
					[2, 5, 15],
					[1, 25, 100],
				]
					.reduce(function(returns, item) {
						var weigh = item[0];
						var min = item[1];
						var max = item[2];
						chance.n(chance.word, chance.integer({min: min, max: max}))
							.forEach(function(word) {
								returns.push(word + ' ' + weigh);
							});
						return returns;
					}, [])
					.join('\n');
			},

			onCanvasContainerResize: function(size) {
				this.canvasWidth = size.width;
				this.canvasHeight = size.height;
			},
		},
	});

})();
