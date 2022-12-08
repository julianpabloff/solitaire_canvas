'use strict';

const Solitaire = function(container) {
	console.log('width: ' + container.clientWidth + 'px');
	console.log('height: ' + container.clientHeight + 'px');
	const display = new Display(container.clientWidth, container.clientHeight);
	container.append(display.canvas);

	display.draw('hello world', 1, 1);


	this.resize = function(width, height) {
		display.resize(width, height);
	}
}
