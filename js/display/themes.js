'use strict';

const themes = {
	normal : {
		h: {fg: '#bdd2d5', bg: '#a63838'},
		c: {fg: '#bdd2d5', bg: '#1c2126'},
		d: {fg: '#bdd2d5', bg: '#a63838'},
		s: {fg: '#bdd2d5', bg: '#1c2126'},
		bac: {fg: '#2e3440', bg: '#bdd2d5'},
		tab : {fg: '#343c34', bg: '#4c7e4c'},
		cur : {fg: '#2e3440', bg: '#bdd2d5'},
		tom : {fg: '#bdd2d5', bg: '#1c2126'},
		txt : {fg: '#bdd2d5', bg: '#27323b'},
		txtcur : {fg: '#27323b', bg: '#bdd2d5'}
	}
};

const Themes = function() {
	let theme = themes.normal;
	this.setTheme = function(title) {
		theme = themes[title];
	}

	this.getTheme = function(title) {
		console.log(themes[title]);
		return themes[title];
	}

	this.getColor = function(attribute) {
		return theme[attribute];
	}

	this.listThemes = function(toUpper = false) {
		const list = [];
		for (const key of Object.keys(themes)) {
			list.push(toUpper ? key.toUpperCase() : key);
		}
		return list;
	}
}
