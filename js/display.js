'use strict';

class Display {
	constructor(width, height) {
		console.log('creating display');
		this.canvas = document.createElement('canvas');
		this.canvas.oncontextmenu = () => false;
		this.ctx = this.canvas.getContext('2d');
		this.containerWidth = width;
		this.containerHeight = height;
		this.resize();

		this.fg = 'white';
		this.bg = 'red';
	}

	setFontSize(pixels) {
		this.ctx.font = pixels + 'px monospace';
		const charMeasure = this.ctx.measureText('█');
		this.charWidth = Math.ceil(charMeasure.actualBoundingBoxRight - charMeasure.actualBoundingBoxLeft);
		this.charAscent = charMeasure.actualBoundingBoxAscent;
		this.charHeight = Math.ceil(this.charAscent + charMeasure.actualBoundingBoxDescent);
		console.log('grid cell width: ' + this.charWidth + 'px');
		console.log('grid cell height: ' + this.charHeight + 'px');
	}

	clear() {
		this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
	}

	resize(width = this.containerWidth, height = this.containerHeight) {
		const fontSize = 14 + 4 * (width > 1000);
		console.log('setting font size to ' + fontSize + 'px');
		this.setFontSize(fontSize);

		this.columns = Math.floor(width / this.charWidth);
		this.rows = Math.floor(height / this.charHeight);
		this.canvas.width = width - (width % this.charWidth);
		this.canvas.height = height - (height % this.charHeight);
		this.ctx.font = fontSize + 'px monospace';
		console.log('canvas dimensions:');
		console.log('    width: ' + this.canvas.width);
		console.log('    height: ' + this.canvas.height);
		console.log('canvas text dimensions:');
		console.log('    columns: ' + this.columns);
		console.log('    rows: ' + this.rows);
	}

	draw(string, gridX, gridY) {
		for (let i = 0; i < string.length; i++) {
			const x = (gridX + i) * this.charWidth;
			const y = gridY * this.charHeight;
			
			this.ctx.fillStyle = this.bg;
			this.ctx.fillRect(x, y, this.charWidth, this.charHeight);

			const char = string[i];
			this.ctx.fillStyle = this.fg;
			this.ctx.fillText(char, x, y + this.charAscent);
		}
	}
}
