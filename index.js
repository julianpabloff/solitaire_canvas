'use strict';

function start(container) {
	const solitaire = new Solitaire(container);
	function resize() {
		solitaire.resize(container.clientWidth, container.clientHeight);
	}
	window.addEventListener('resize', resize);
}


window.addEventListener('load', function() {
	const container = document.getElementById('container');
	start(container);
});
