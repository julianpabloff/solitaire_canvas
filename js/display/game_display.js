const GameDisplay = function(d) {
	const cardWidth = 14;
	const cardHeight = 10;
	const margin = 4;
	const totalWidth = cardWidth * 7 + margin * 6;

	this.resize = function() {
		// cardX = Math.floor((d.width - (cardWidth + margin) * 7 + margin) / 2);
		// cardY = Math.floor((d.height - cardHeight) / 2);
		cardX = d.centerWidth(totalWidth);
		topY = d.centerHeight(45);
		cardY = topY + cardHeight + 5;
		foundationsX = [];
		for (let i = 0; i < 4; i++) foundationsX.push(findPileX(3 + i));
	}
	let cardX, cardY, topY, foundationsX;
	const findPileX = index => cardX + (cardWidth + margin) * index;
	this.resize();

	const cardSuits = {
		'h' : ['  _  _  ', ' / \\/ \\ ', ' \\    / ', '  \\  /  ', '   \\/   '],
		'c' : ['   __   ', ' _|  |_ ', '[      ]', '[__  __]', '   /\\   '],
		'd' : ['        ', '   /\\   ', '  /  \\  ', '  \\  /  ', '   \\/   '],
		's' : ['   /\\   ', '  /  \\  ', ' /    \\ ', ' \\_/\\_/ ', '   /\\   '],
	}
	const cardVals = [null,'A','2','3','4','5','6','7','8','9','10','J','Q','K'];
	const cardSuitChars = {'h': '♥', 'c': '♣', 'd': '♦', 's': '♠'};
	const drawCardSpot = function(x, y) {
		d.setColor('tab');
		for (let i = 0; i < cardHeight; i++) d.draw('░'.repeat(cardWidth), x, i);
	}
	const drawCardBack = function(x, y) {
		d.setColor('bac');
		d.drawSquare(x, y, cardWidth, cardHeight);
		for (let i = 1; i < 9; i += 2) {
			d.draw('· · · · · · ', x + 1, y + i);
			d.draw(' · · · · · ·', x + 1, y + i + 1);
		}
	}
	const drawCard = function(card, x, y) {
		if (!card.faceUp) { drawCardBack(buffer, x, y); return; }
		d.setColor(card.suit);
		d.drawSquare(x, y, cardWidth, cardHeight);
		for (let i = 0; i < 5; i++) d.draw(cardSuits[card.suit][i], x + 3, y + 2 + i);
		const value = cardVals[card.value].toString();
		d.draw(value, x + 2, y + 1).draw(value, x + 12 - value.length, y + 8);
	}

	const drawStock = function(stock) {
		if (!stock.length) drawCardSpot(cardX, topY);
		else drawCardBack(cardX, topY);
	}

	this.draw = function(cardData) {
		d.applyBackground();
		d.draw('bitch', d.centerWidth(5), d.centerHeight(1));
		drawStock(cardData.stock);
	}
}
