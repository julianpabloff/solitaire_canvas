'use strict';

const previewData = {
	game : {
		text : [
			' │            │              ░░░░░░░░░░░░░░    ░░░░░░░░░░░░░░    │      ',
			' │ ♠        J │              ░░░░░░░░░░░░░░    ░░░░░░░░░░░░░░    │ ♦    ',
			'─└────────────┘              ░░░░░░░░░░░░░░    ░░░░░░░░░░░░░░    └──────',
			'                                                                        ',
			'                                                                        ',
			'E 2            PILE 3            PILE 4            PILE 5            PIL',
			'                                                                        ',
			'──────┐    ┌────────────┐    ┌────────────┐    ┌────────────┐    ┌──────',
			'    ♠ │    │. . . . . . │    │ K        ♥ │    │. . . . . . │    │. . . ',
			'──────┐    ┌────────────┐    ┌────────────┐    ┌────────────┐    ┌──────',
			'    ♥ │    │. . . . . . │    │ Q        ♠ │    │. . . . . . │    │. . . ',
			' _    │    ┌────────────┐    ┌────────────┐    ┌────────────┐    ┌──────',
			'/ \\   │    │ J        ♣ │    │ J        ♦ │    │. . . . . . │    │. . . ',
			'  /   │    ┌────────────┐    ┌────────────┐    ┌────────────┐    ┌──────',
			' /    │    │ 10       ♦ │    │ 10       ♠ │    │ 8        ♥ │    │. . . ',
			'/     │    ┌────────────┐    │     /\\     │    ┌────────────┐    ┌──────',
			'      │    │ 9        ♣ │    │    /  \\    │    │ 7        ♣ │    │ 6    '
		],
		color : [
			[['h',1],['s',14],['tab',50],['d',7]],
			[['h',1],['s',14],['tab',50],['d',7]],
			[['h',1],['s',14],['tab',50],['d',7]],
			[['tab',72]],
			[['tab',72]],
			[['tab',11],['cur',14],['tab',22],['tom',14],['tab',11]],
			[['tab',72]],
			[['s',7],['tab',4],['bac',14],['tab',4],['h',14],['tab',4],['bac',14],['tab',4],['bac',7]],
			[['s',7],['tab',4],['bac',14],['tab',4],['h',14],['tab',4],['bac',14],['tab',4],['bac',7]],
			[['h',7],['tab',4],['bac',14],['tab',4],['s',14],['tab',4],['bac',14],['tab',4],['bac',7]],
			[['h',7],['tab',4],['bac',14],['tab',4],['s',14],['tab',4],['bac',14],['tab',4],['bac',7]],
			[['h',7],['tab',4],['c',14],['tab',4],['d',14],['tab',4],['bac',14],['tab',4],['bac',7]],
			[['h',7],['tab',4],['c',14],['tab',4],['d',14],['tab',4],['bac',14],['tab',4],['bac',7]],
			[['h',7],['tab',4],['d',14],['tab',4],['s',14],['tab',4],['h',14],['tab',4],['bac',7]],
			[['h',7],['tab',4],['d',14],['tab',4],['s',14],['tab',4],['h',14],['tab',4],['bac',7]],
			[['h',7],['tab',4],['c',14],['tab',4],['s',14],['tab',4],['c',14],['tab',4],['s',7]],
			[['h',7],['tab',4],['c',14],['tab',4],['s',14],['tab',4],['c',14],['tab',4],['s',7]]
		]
	}
};

const Preview = function(d) {
	this.draw = function(x, y, scene, theme, labels = false) {
		const preview = previewData[scene];
		const previewRows = preview.text.length;
		for (let i = 0; i < previewRows; i++) {
			const textIndex = i == 5 && !labels ? 4 : i;
			let position = 0;
			for (const item of preview.color[i]) {
				const changeToModeCursor = item[0] == 'tom' && theme['tom'].bg == theme['cur'].bg;
				const color = changeToModeCursor ? theme['tab'] : theme[item[0]];
				const count = item[1];
				for (let j = 0; j < count; j++) {
					let char = changeToModeCursor ? '░' : preview.text[textIndex][position];
					if (!labels) {
						switch (char.charCodeAt(0)) {
							case 9824: case 9827: case 9829: case 9830:
								char = ' ';
						}
					}
					d.color = color;
					d.draw(char, x + position, y + i);
					position++;
				}
			}
		}
	}
}
