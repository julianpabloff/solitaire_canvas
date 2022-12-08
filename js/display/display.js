'use strict';

const Display = function(width, height) {
	this.canvas = document.createElement('canvas');
	this.canvas.oncontextmenu = () => false;
	const context = this.canvas.getContext('2d');

	const setFontSize = function(pixels) {
		context.font = pixels + 'px monospace';
		const charMeasure = context.measureText('█');
		charWidth = Math.ceil(charMeasure.actualBoundingBoxRight - charMeasure.actualBoundingBoxLeft);
		charAscent = charMeasure.actualBoundingBoxAscent;
		charHeight = Math.ceil(charAscent + charMeasure.actualBoundingBoxDescent);
	}
	let charWidth, charHeight, charAscent;

	this.resize = function(width, height) {
		const fontSize = 14 + 4 * (width > 1000);
		setFontSize(fontSize);

		columns = Math.floor(width / charWidth);
		rows = Math.floor(height / charHeight);
		this.canvas.width = width - (width % charWidth);
		this.canvas.height = height - (height % charHeight);
		context.font = fontSize + 'px monospace';
	}
	let columns, rows;
	this.resize(width, height);

	this.centerWidth = width => { return Math.floor(columns/2 - width/2); }
	this.centerHeight = height => { return Math.floor(rows/2 - height/2); }
	this.centerString = (string, width = columns) => { return Math.floor(width / 2 - string.length / 2); }

	this.themes = new Themes();
	this.color = this.themes.getColor('tab');
	this.setColor = attribute => this.color = this.themes.getColor(attribute);

	this.clear = () => context.clearRect(0, 0, context.canvas.width, context.canvas.height);
	this.applyBackground = function() {
		this.setColor('tab');
		context.fillStyle = this.color.bg;
		context.fillRect(0, 0, context.canvas.width, context.canvas.height);
	}

	this.draw = function(string, gridX, gridY) {
		for (let i = 0; i < string.length; i++) {
			const x = (gridX + i) * charWidth;
			const y = gridY * charHeight;
			const char = string[i];
			
			if (char == '█') {
				context.fillStyle = this.color.fg;
				context.fillRect(x, y, charWidth, charHeight);
			} else if (char == '▄') {
				context.fillStyle = this.color.fg;
				context.fillRect(x, y + charHeight / 2, charWidth, charHeight / 2);
			} else if (char == '▀') {
				context.fillStyle = this.color.fg;
				context.fillRect(x, y, charWidth, charHeight / 2);
			} else {
				context.fillStyle = this.color.bg;
				context.fillRect(x, y, charWidth, charHeight);

				context.fillStyle = this.color.fg;
				context.fillText(char, x, y + charAscent);
			}
		}
	}

	this.fillRectGrid = function(gridX, gridY, gridWidth, gridHeight) {
		const x = gridX * charWidth;
		const y = gridY * charHeight;
		const w = gridWidth * charWidth;
		const h = gridHeight * charHeight;
		context.fillStyle = this.color.bg;
		context.fillRect(x, y, w, h);
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
