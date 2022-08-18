import { writable } from 'svelte/store';

export const items = {
	list: writable([]),
	setList: function (data) {
		this.list.set(data);
	},
};
