import { defineStore } from 'pinia';
import { UserState } from '../types/user';

export const useUserStore = defineStore('user', {
    state: (): UserState => ({
        userName: '张三',
        role: 'admin'
    }),
    actions: {
        setUserInfo(partial: Partial<UserState>) {
            this.$patch(partial);
        }
    }
})