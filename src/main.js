import Vue from 'vue'
import VueResource from 'vue-resource'
import Main from 'Components/Main.vue'

Vue.use(VueResource)
Vue.http.options.emulateJSON = true
Vue.http.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
new Vue({
    el: '#app',
    render(createElement){
        return createElement(Main)
    }
})