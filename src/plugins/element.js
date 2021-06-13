import Vue from "vue";
import { Button, Input, Form, FormItem, Message } from "element-ui";

Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
// 挂在全局属性
Vue.prototype.$msg = Message
