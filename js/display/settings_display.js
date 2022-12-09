'use strict';

const SettingsDisplay = function(d) {
	const settingsLogo = [
		'▄▄▄▄ ▄▄▄▄ ▄▄▄▄▄ ▄▄▄▄▄ ▄▄▄▄▄ ▄▄▄▄ ▄▄▄▄ ▄▄▄▄',
		'█▄▄▄ █▄▄▄   █     █     █   █  █ █ ▄▄ █▄▄▄',
		'▄▄▄█ █▄▄▄   █     █   ▄▄█▄▄ █  █ █▄▄█ ▄▄▄█'
	];
	const items = ['THEME', 'LABELS', 'DIFFICULTY'];
	const themeTitles = d.themes.listThemes();
	const options = [
		themeTitles.map(t => t.toUpperCase()),
		['ENABLED', 'DISABLED'],
		['DRAW 1', 'DRAW 3'],
	];

	this.resize = function() {
		w = 80; h = 34;
		x = d.centerWidth(w);
		y = d.centerHeight(h);
	}
	let x, y, w, h;
	this.resize();

	this.draw = function(buffer, code) {
		d.applyBackground();
		d.setColor('txt');
		d.drawSquare(x, y, w, h);
		for (let i = 0; i < settingsLogo.length; i++)
			d.draw(settingsLogo[i], x + 4, y + 2 + i);

		const firstWidth = 23;
		d.drawSquare(x + 3, y + 6, firstWidth, 5, false);
		for (let i = 0; i < items.length; i++) {
			const drawY = y + 7 + i;
			if (i == buffer[0]) {
				d.setColor('txtcur');
				d.fillRectGrid(x + 4, drawY, firstWidth - 2, 1);
			} else d.setColor('txt');
			const output = items[i] + ' - ' + options[i][code[i]];
			d.draw(output, x + 5, drawY);
		}

		d.setColor('txt');
		d.drawSquare(x + 3, y + 12, 74, 19, false);
		d.draw('press esc when done', x + 4, y + 31);
		d.preview.draw(x + 4, y + 13, 'game', d.themes.getTheme(themeTitles[code[0]]), !code[1]);

		if (buffer.length == 2) {
			const secondWidth = 20;
			const secondOptions = options[buffer[0]];
			const secondOptionsCount = secondOptions.length;
			d.setColor('txt');
			d.drawSquare(x + 26, y + 6, secondWidth, 2 + secondOptionsCount, true);
			for (let i = 0; i < secondOptionsCount; i++) {
				const drawY = y + 7 + i;
				if (i == buffer[1]) {
					d.setColor('txtcur');
					d.fillRectGrid(x + firstWidth + 4, drawY, secondWidth - 2, 1);
				} else d.setColor('txt');
				const text = secondOptions[i];
				d.draw(text, x + firstWidth + 5, drawY);
			}
		}
	}
}
