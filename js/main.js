'use strict';

const Solitaire = function(container) {
	const controller = new Controller();
	const display = new Display(container.clientWidth, container.clientHeight);

	// Settings
	let jsonSettings = {
		theme: 'dark',
		label: false,
		draw: 3
	};
	const allSettings = {
		theme: display.themes.listThemes(),
		label: [true, false],
		draw: [1, 3]
	};
	function applySettings(settings) {
		display.themes.setTheme(settings.theme);
		// game.drawAmount = settings.draw;
	}
	for (const k of Object.keys(allSettings))
		controller.settings.counts.push(allSettings[k].length);
	for (const k of Object.keys(jsonSettings))
		controller.settings.code.push(allSettings[k].indexOf(jsonSettings[k]));
	applySettings(jsonSettings);

	// Update functions
	const update = {};
	update.menu = function(command) {
		switch (command.type) {
			case 'move': display.menu.draw(command.data); break;
			case 'settings': switchTo('settings', command.data); break;
		}
	}
	update.settings = function(command) {
		switch (command.type) {
			case 'move': display.settings.draw(...command.data); break;
			case 'back':
				const newSettings = controller.settings.exportChanges(allSettings);
				applySettings(newSettings);
				controller.settings.reset();
				switchTo('menu', [controller.menu.reset()]);
				break;
		}
	}

	// Screen Switching
	let screen = 'menu';
	function switchTo(destination, data = []) {
		console.log('switching to ' + destination);
		display[destination].draw(...data);
		screen = destination;
	}

	// App Start
	container.append(display.canvas);
	display.menu.draw();

	// Events
	window.addEventListener('keydown', function(event) {
		const keyValid = controller[screen].update(event.keyCode);
		if (keyValid) {
			const action = controller[screen].handleScreen();
			if (action.ran) update[screen](action.command);
		}
	});

	this.resize = function(width, height) {
		display.resize(width, height);
		display.menu.resize();
		display.settings.resize();
		display[screen].draw();
	}
}
