'use strict';

const Solitaire = function(container) {
	console.log('width: ' + container.clientWidth + 'px');
	console.log('height: ' + container.clientHeight + 'px');
	const display = new Display(container.clientWidth, container.clientHeight);
	container.append(display.canvas);

	display.menu.draw();

	this.resize = function(width, height) {
		display.resize(width, height);
	}
}
