const MenuController = function(c) {
	this.update = function(keyCode) {
		this.up = this.down = this.enter = this.esc = false;
		switch(keyCode) {
			case 38: case 75: this.up = true; return true;
			case 40: case 74: this.down = true; return true;
			case 13: this.enter = true; return true;
			case 27: this.esc = true; return true;
		}
		return false;
	}
	this.up = this.down = this.enter = this.esc = false;

	let menuOption = 0; const optionCount = 3;
	this.reset = () => {menuOption = 0; return menuOption;}
	this.handleScreen = function() {
		if (this.up) {
			menuOption = c.cycle(menuOption, optionCount, false);
			return c.outputCommand('move', menuOption);
		} else if (this.down) {
			menuOption = c.cycle(menuOption, optionCount);
			return c.outputCommand('move', menuOption);
		} else if (this.esc) return c.outputCommand('quit');
		else if (this.enter) {
			switch(menuOption) {
				case 0: return c.outputCommand('newGame');
				case 1: 
					// const data = [c.settings.buffer, c.settings.code];
					const data = [0, 0];
					return c.outputCommand('settings', data);
				case 2: return c.outputCommand('quit');
				default: return false;
			}
		}
	}
	this.getData = () => menuOption;
}
