'use strict';

const Solitaire = function(container) {
	const controller = new Controller();
	const display = new Display(container.clientWidth, container.clientHeight);
	const game = new Game();

	// Settings
	let jsonSettings = {
		theme: 'normal',
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
		game.drawAmount = settings.draw;
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
			case 'newGame':
				game.shuffle().dealCards();
				console.log(game.getData());
				display.game.draw(game.getData());
				break;
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
	update.game = function(command) {
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

	const getData = {};
	getData.menu = () => [controller.menu.getData()];
	getData.settings = () => controller.settings.getData();
	// getData.game = () => [game.getData(), controller.game.getData()];
	this.resize = function(width, height) {
		display.resize(width, height);
		display.menu.resize();
		display.settings.resize();
		display.game.resize();
		display[screen].draw(...getData[screen]());
	}
}
