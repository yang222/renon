import { defineStore } from 'pinia';


export const usePermissStore = defineStore('permiss', {
	state: () => {
		return {
			user_info:{},
			devInfo:{},
		};
	},
	actions: {
		setUserInfo(info) {
			this.user_info = info;
		},
		setDevId(info) {
			this.devInfo = info;
		},
	}
});
