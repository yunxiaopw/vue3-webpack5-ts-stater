import { createApp } from "vue";
import App from "./app.vue";
import store from "./store/index";
import router from "./router/index";
import "@/assets/fonts/iconfont.css";
const app = createApp(App);

app.use(store);
app.use(router);
app.mount("#app");
