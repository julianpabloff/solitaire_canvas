'use strict';

const MenuDisplay = function(d) {
	const logoText = [
		'  █████████  █████████  ██        ████████  ████████  █████████  ████████  █████████  █████████  ',
		'  ██         ██     ██  ██           ██        ██     ██     ██     ██     ██     ██  ██         ',
		'  █████████  ██     ██  ██           ██        ██     █████████     ██     █████████  ████████   ',
		'         ██  ██     ██  ██           ██        ██     ██     ██     ██     ██    ██   ██         ',
		'  █████████  █████████  ████████  ████████     ██     ██     ██  ████████  ██     ██  █████████  '
	];
	const optionText = ['START GAME', 'SETTINGS', 'QUIT'];

	this.resize = function() {
		logo = {
			w: logoText[0].length + 2,
			h: logoText.length + 4,
			x: d.centerWidth(logoText[0].length),
			y: d.centerHeight(20)
		}
		options = {
			w: 16,
			h: optionText.length + 4,
			x: d.centerWidth(16),
			y: logo.y + logoText.length + 6
		}
	}
	let logo, options;
	this.resize();

	this.draw = function(index = 0) {
		d.applyBackground();
		d.setColor('txt');
		d.drawSquare(logo.x, logo.y, logo.w, logo.h);
		for (let i = 0; i < logoText.length; i++)
			d.draw(logoText[i], logo.x + 1, logo.y + 2 + i);
		d.drawSquare(options.x, options.y, options.w, options.h);
		for (let i = 0; i < optionText.length; i++) {
			const y = options.y + 2 * i + 1;
			if (i == index) {
				d.setColor('txtcur');
				d.fillRectGrid(options.x + 1, y, options.w - 2, 1);
			} else d.setColor('txt');
			const spacing = (options.w - optionText[i].length - 2) / 2 + 1;
			d.draw(optionText[i], options.x + spacing, y);
		}
	}
}
