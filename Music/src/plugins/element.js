import Vue from 'vue'
import { Button,RadioButton } from 'element-ui'

import {Form,FormItem} from 'element-ui'
import {Input} from 'element-ui'
import {Message} from 'element-ui'
import {Row} from 'element-ui'
import {Carousel,CarouselItem} from 'element-ui'
import {Tabs,TabPane} from 'element-ui'
import {Pagination} from 'element-ui'
import {Backtop} from 'element-ui'
import {Radio,RadioGroup} from 'element-ui'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Row)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Pagination)
Vue.use(Backtop)
Vue.use(RadioGroup)
Vue.use(Radio);
Vue.use(RadioButton)
Vue.prototype.$message = Message

Vue.use(Button)
