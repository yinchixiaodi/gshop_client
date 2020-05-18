<template>
  <div>
    <h2>深入v-model</h2>

    <input type="text" />
    <span>xxx</span>
    <br />
    <br />
    <CustomInput :value="name1" @input="name1 = $event" />
    <span>{{ name1 }}</span>
    <br />
    <br />
    <CustomInput v-model="name2" />
    <span>{{ name2 }}</span>
  </div>
</template>

<script type="text/ecmascript-6">
import CustomInput from './CustomInput.vue'
export default {
  name: 'ModelTest',
  data(){
    return {
      name1:"xiaohong",
      name2:"xiaolv"
    }
  },
  components: {
    CustomInput
  }
}
</script>
