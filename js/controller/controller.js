const Controller = function() {
	this.menu = new MenuController(this);
	this.settings = new SettingsController(this);

	this.cycle = function(number, count, up = true) {
		const max = count - 1;
		const end = up * max;
		const start = max - end;
		if (number == end) number = start;
		else number = number - (2 * !up) + 1;
		return number;
	}
	this.outputCommand = function(type, data) {
		return {
			ran: true,
			command: { type: type, data: data }
		}
	};
}
