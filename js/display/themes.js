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
	},
	dark : {
		h: {fg: '#a51d20', bg: 'black'},
		c: {fg: 'white', bg: 'black'},
		d: {fg: '#a51d20', bg: 'black'},
		s: {fg: 'white', bg: 'black'},
		bac: {fg: 'white', bg: 'black'},
		tab : {fg: 'white', bg: 'black'},
		cur : {fg: 'black', bg: 'white'},
		tom : {fg: 'black', bg: '#a51d20'},
		txt : {fg: '#a51d20', bg: 'black'},
		txtcur : {fg: 'black', bg: '#a51d20'}
	},
	ice: {
		h: {fg: 'black', bg: '#2abdea'},
		c: {fg: 'white', bg: '#384493'},
		d: {fg: 'black', bg: '#2abdea'},
		s: {fg: 'white', bg: '#384493'},
		bac: {fg: 'black', bg: 'white'},
		tab : {fg: 'white', bg: 'black'},
		cur : {fg: 'black', bg: 'white'},
		tom : {fg: 'white', bg: '#384493'},
		txt : {fg: 'black', bg: '#2abdea'},
		txtcur : {fg: 'black', bg: 'white'}
	},
	pipboy : {
		h: {fg: 'black', bg: '#2dfc2d'},
		c: {fg: '#2dfc2d', bg: 'black'},
		d: {fg: 'black', bg: '#2dfc2d'},
		s: {fg: '#2dfc2d', bg: 'black'},
		bac: {fg: '#2dfc2d', bg: 'black'},
		tab : {fg: '#2dfc2d', bg: 'black'},
		cur : {fg: 'black', bg: '#2dfc2d'},
		tom : {fg: 'black', bg: '#2dfc2d'},
		txt : {fg: '#2dfc2d', bg: 'black'},
		txtcur : {fg: 'black', bg: '#2dfc2d'}
	}
};

const Themes = function() {
	let theme;
	this.setTheme = function(title) {
		theme = themes[title];
	}

	this.getTheme = function(title = false) {
		if (!title) return theme;
		return themes[title];
	}

	this.getColor = function(attribute) {
		return theme[attribute];
	}

	this.listThemes = function() {
		const list = [];
		for (const key of Object.keys(themes)) list.push(key);
		return list;
	}
}
