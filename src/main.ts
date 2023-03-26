import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index"
import "~/styles/index.scss";
import 'uno.css'
import "element-plus/theme-chalk/src/message.scss"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'

import zhCn from 'element-plus/lib/locale/lang/zh-cn'



const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus, {
  locale: zhCn,
})

app.use(router)
app.use(createPinia())
app.mount("#app");
