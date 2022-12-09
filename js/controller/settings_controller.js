const SettingsController = function(c) {
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

	this.buffer = [0];
	this.counts = [];
	this.code = [];
	let leftSideIndex = 0;

	this.handleScreen = function() {
		const length = this.buffer.length;
		const countsLength = this.counts.length;
		const prevBuffer = [this.buffer[0], this.buffer[1]];
		let first = this.buffer[0];
		if (length == 1) {
			if (up) this.buffer[0] = c.cycle(first, countsLength, false);
			else if (down) this.buffer[0] = c.cycle(first, countsLength);
			else if (enter) this.buffer.push(this.code[first]);
			else if (esc) return c.outputCommand('back');
		} else if (length == 2) {
			if (up) this.buffer[1] = c.cycle(this.buffer[1], this.counts[first], false);
			else if (down) this.buffer[1] = c.cycle(this.buffer[1], this.counts[first]);
			else if (enter) {
				this.code[first] = this.buffer[1];
				this.buffer.pop();
			} else if (esc) this.buffer.pop();
		}
		const data = [this.buffer, this.code];
		return c.outputCommand('move', data);
	}

	this.getData = () => [this.buffer, this.code];

	this.reset = () => this.buffer = [0];
	this.exportChanges = function(allSettings) {
		let output = {};
		let i = 0;
		for (let k of Object.keys(allSettings)) {
			output[k] = allSettings[k][this.code[i]];
			i++;
		}
		return output;
	}
}
