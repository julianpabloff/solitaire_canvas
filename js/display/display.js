'use strict';

const Display = function(width, height) {
	this.canvas = document.createElement('canvas');
	this.canvas.oncontextmenu = () => false;
	const ctx = this.canvas.getContext('2d');

	const setFontSize = function(pixels) {
		ctx.font = pixels + 'px monospace';
		const charMeasure = ctx.measureText('█');
		charWidth = Math.ceil(charMeasure.actualBoundingBoxRight - charMeasure.actualBoundingBoxLeft);
		charAscent = charMeasure.actualBoundingBoxAscent;
		charDescent = charMeasure.actualBoundingBoxDescent;
		// charAscent = Math.floor(charMeasure.actualBoundingBoxAscent);
		charHeight = Math.ceil(charAscent + charDescent);
	}
	let charWidth, charHeight, charAscent, charDescent;

	this.resize = function(width, height) {
		const fontSize = 14 + 4 * (width > 1400);
		setFontSize(fontSize);

		columns = Math.floor(width / charWidth);
		rows = Math.floor(height / charHeight);
		this.canvas.width = width - (width % charWidth);
		this.canvas.height = height - (height % charHeight);
		ctx.font = fontSize + 'px monospace';
	}
	let columns, rows;
	this.resize(width, height);

	this.centerWidth = width => { return Math.floor(columns/2 - width/2); }
	this.centerHeight = height => { return Math.floor(rows/2 - height/2); }
	this.centerString = (string, width = columns) => { return Math.floor(width / 2 - string.length / 2); }

	this.themes = new Themes();
	this.color = 'black';
	this.setColor = attribute => this.color = this.themes.getColor(attribute);

	this.clear = () => ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	this.applyBackground = function() {
		this.setColor('tab');
		ctx.fillStyle = this.color.bg;
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	}

	this.draw = function(string, gridX, gridY) {
		for (let i = 0; i < string.length; i++) {
			const x = (gridX + i) * charWidth;
			const y = gridY * charHeight;
			const char = string[i];
			const code = char.charCodeAt(0);
			const fill = ctx.fillStyle;
			let descentDelta = 0;
			
			let drawChar = false;
			switch (code) {
				case 9608: ctx.fillStyle = this.color.fg; ctx.fillRect(x, y, charWidth, charHeight); break;
				case 9604: ctx.fillStyle = this.color.fg; ctx.fillRect(x, y + charHeight / 2, charWidth, charHeight / 2); break;
				case 9600: ctx.fillStyle = this.color.fg; ctx.fillRect(x, y, charWidth, charHeight / 2); break;
				case 9617:
					const descent = ctx.measureText(String.fromCharCode(code)).actualBoundingBoxDescent;
					// descentDelta = charDescent - descent;
					descentDelta = 5; // hard coding to draw this character lower, may be device-specific
					drawChar = true; break;
				default: drawChar = true; break;
			}
			if (drawChar) {
				ctx.fillStyle = this.color.bg;
				ctx.fillRect(x, y, charWidth, charHeight);

				ctx.fillStyle = this.color.fg;
				ctx.fillText(char, x, y + charAscent + descentDelta);
			}
		}
	}

	this.fillRectGrid = function(gridX, gridY, gridWidth, gridHeight) {
		const x = gridX * charWidth;
		const y = gridY * charHeight;
		const w = gridWidth * charWidth;
		const h = gridHeight * charHeight;
		ctx.fillStyle = this.color.bg;
		ctx.fillRect(x, y, w, h);
	}

	const square = {tl: '┌', tr: '┐', bl: '└', br: '┘', h: '─', v: '│'};
	this.drawSquare = function(x, y, width, height, fill = true) {
		this.draw(square.tl + square.h.repeat(width - 2) + square.tr, x, y);
		for (let i = 0; i < height - 2; i++) {
			this.draw(square.v, x, y + 1 + i);
			this.draw(square.v, x + width - 1, y + 1 + i);
		}
		if (fill) this.fillRectGrid(x + 1, y + 1, width - 2, height - 2);
		this.draw(square.bl + square.h.repeat(width - 2) + square.br, x, y + height - 1);
	}

	this.menu = new MenuDisplay(this);
	this.settings = new SettingsDisplay(this);
	this.preview = new Preview(this);
}
