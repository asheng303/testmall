import Toast from './Toast'
const obj = {}
obj.install = function (Vue) {
  //创建组件构造器
  const toastContrustor = Vue.extend(Toast)
  //通过new的方法，根据组件构造器，创建出一个组件对象
  const toast = new toastContrustor()
  //将组件对象手动挂载到某个元素上 这里的方法就算main内的方法
  //挂载到一个我们创建的div上
  toast.$mount(document.createElement('div'))
  //此时toast.$el就是我们上面创建的东西
  //再添加到body内
  document.body.appendChild(toast.$el)
  //添加Toast的对象
  Vue.prototype.$Toast = toast
}
export default obj