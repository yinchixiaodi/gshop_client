<template>
  <div>
    <h1>EventTest组件</h1>
    <!-- 绑定原生DOM时间监听的两种情况 -->
    <button @click="test1">绑定原生DOM时间监听</button>
    <button @click="test2($event)">绑定原生DOM时间监听</button>
    <br />
    <br />
    <Event1 @click.native="test3" />
    <br />
    <br />
    <Event2 @click="test4" @xxx="test5" />
    <br />
    <br />
    <Event2 @click="test4($event)" @xxx="test5($event)" />
  </div>
</template>

<script type="text/ecmascript-6">
import Event1 from './Event1.vue'
import Event2 from './Event2.vue'

export default {
  name: 'EventTest',

  components: {
    Event1,
    Event2,
  },

  methods: {
    test1(event){
      alert('原生DOM--'+ event.target.innerHTML)
    },
    test2(event){
      alert('原生DOM2--'+ event.target.innerHTML)
    },
    test3(event){
      alert('自定义转原生--'+ event.target.innerHTML)
      console.log(event)
    },
    test4(data){
      alert('自定义1--'+ data)
    },
    test5(data){
      alert('自定义XXX---' + data.name)
      console.log(this)
    }
  }
}
</script>
