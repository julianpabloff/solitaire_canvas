'use strict';

const Solitaire = function(container) {
	const controller = new Controller();
	const display = new Display(container.clientWidth, container.clientHeight);

	let jsonSettings = {
		theme: 'grey',
		label: false,
		draw: 3
	};
	const allSettings = {
		theme: display.themes.listThemes(),
		label: [true, false],
		draw: [1, 3],
		rgbMode: [false, true]
	};

	container.append(display.canvas);
	display.menu.draw();

	const update = {};
	update.menu = function(command) {
		switch(command.type) {
			case 'move': display.menu.draw(command.data); break;
			case 'settings': switchTo('settings', command.data); break;
		}
	}
	let screen = 'menu';
	function switchTo(destination, data = []) {
		console.log('switching to ' + destination);
		display[destination].draw(...data);
		screen = destination;
	}

	window.addEventListener('keydown', function(event) {
		const keyValid = controller[screen].update(event.keyCode);
		if (keyValid) {
			const action = controller[screen].handleScreen();
			if (action.ran) update[screen](action.command);
		}
	});

	this.resize = function(width, height) {
		display.resize(width, height);
		display[screen].resize();
		display[screen].draw();
	}
}
