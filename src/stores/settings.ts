import { defineStore } from "pinia";

export const useSettingsStore = defineStore('settings', {
    state:():{useDarkTheme:boolean}=>({useDarkTheme:false}),
    actions:{
        toggleUseDefaultTheme(){
            const darkBg = window.getComputedStyle(document.documentElement).getPropertyValue('--dark-color');
            const lightBg = window.getComputedStyle(document.documentElement).getPropertyValue('--light-color')
            const currentBgIsDark = this.useDarkTheme;
            currentBgIsDark
                ? document.body.style.setProperty('--background-color', lightBg)
                : document.body.style.setProperty('--background-color', darkBg)
            this.useDarkTheme = !this.useDarkTheme;
        }
    },
    getters:{
        themeName():String{
            return this.useDarkTheme?'dark':'light'
        }
    }
});