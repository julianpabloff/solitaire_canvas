const MenuController = function(c) {
	this.update = function(keyCode) {
		up = down = enter = esc = false;
		switch (keyCode) {
			case 38: case 75: up = true; return true;
			case 40: case 74: down = true; return true;
			case 13: enter = true; return true;
			case 27: esc = true; return true;
		}
		return false;
	}
	let up, down, enter, esc;

	let menuOption = 0; const optionCount = 3;
	this.reset = () => {menuOption = 0; return 0;}
	this.handleScreen = function() {
		if (up) {
			menuOption = c.cycle(menuOption, optionCount, false);
			return c.outputCommand('move', menuOption);
		} else if (down) {
			menuOption = c.cycle(menuOption, optionCount);
			return c.outputCommand('move', menuOption);
		} else if (esc) return c.outputCommand('quit');
		else if (enter) {
			switch(menuOption) {
				case 0: return c.outputCommand('newGame');
				case 1: 
					// const data = [c.settings.buffer, c.settings.code];
					const data = [c.settings.buffer, c.settings.code];
					return c.outputCommand('settings', data);
				case 2: return c.outputCommand('quit');
				default: return false;
			}
		}
	}
	this.getData = () => menuOption;
}
