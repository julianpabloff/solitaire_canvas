window.addEventListener('load', function() {
	const canvas = document.createElement('canvas');
	canvas.oncontextmenu = () => false;
	const context = canvas.getContext('2d');

	function setSize(width, height) {
		canvas.width = width;
		canvas.height = height;
	}
	setSize(500, 400);

	function setFontSize(pixels) {
		context.font = pixels + 'px monospace';
		const charMeasure = context.measureText('█');
		charWidth = Math.ceil(charMeasure.actualBoundingBoxRight - charMeasure.actualBoundingBoxLeft);
		charAscent = charMeasure.actualBoundingBoxAscent;
		charHeight = Math.ceil(charAscent + charMeasure.actualBoundingBoxDescent);
		console.log('grid cell width: ' + charWidth + 'px');
		console.log('grid cell height: ' + charHeight + 'px');
	}
	let charWidth, charHeight, charAscent;
	setFontSize(18);

	document.body.append(canvas);

	function clear() {
		context.clearRect(0, 0, context.canvas.width, context.canvas.height);
	}
	function gridToCanvas(gridX, gridY) {
		return {
			x: gridX * charWidth,
			y: gridY * charHeight
		}
	}
	let textFg = 'white';
	let textBg = 'red';
	function draw(string, gridX, gridY, move = false) {
		for (let i = 0; i < string.length; i++) {
			const x = (gridX + i) * charWidth;
			const y = gridY * charHeight;

			context.fillStyle = textBg;
			context.fillRect(x, y, charWidth, charHeight);

			const char = string[i];
			context.fillStyle = textFg;
			const charY = y + charAscent;
			// const charY = y + Math.floor(charAscent);
			context.fillText(char, x, charY);
		}
	}

	function test() {
		draw('bl', 0, 0);
		draw('eh', 2, 1);
		draw('nig', 4, 2);
		draw('ger', 7, 3);
	}

	function drawPixel(color, gridX, gridY, half = false) {
		context.fillStyle = color;
		const location = gridToCanvas(gridX, gridY);
		context.fillRect(location.x, location.y + half * charHeight / 2, charWidth, charHeight / 2);
	}

	test();
	setTimeout(() => {
		clear();
		setSize(600, 460);
		setFontSize(24);
		test();
	}, 1500);
});
