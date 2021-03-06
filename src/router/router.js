import {subscribe, dispatch} from '../store/store';
import Header from '../header/header';
import Persons from '../person/person-view';
import {ACTIONS} from '../router/router-actions';
import * as personModel from '../person/person-model';
import {getActiveElement} from '../app/app-action';

const getRoute = () => {
	return window.location.pathname.substring(1).split('/')[0];
};

const go = path => {
	if (path === getRoute()) return;
	history.pushState({}, '', path);
};

const route = action => {
	if (action.type === ACTIONS.go) {
		go(action.payload);
	}
	const route = getRoute();
	let body = [];
	switch (route) {
		default: {
			body = [
				Header(),
				Persons(personModel.getProps()),
			];
		}
	}
	const app = document.getElementById('app');
	app.innerHTML = '';
	body.map((el) => app.appendChild(el));
	const activeElement = getActiveElement();
	if (activeElement) {
		activeElement.focus();
	}
};

export const setup = () => {
	window.onpopstate = route;
	subscribe(route);
};
