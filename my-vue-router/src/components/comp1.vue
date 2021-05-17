<template>
  <div>
    组件内部数据={{ innerNum }}<br />
    props.num={{ num }}<br />
    <button @click="$emit('change')">触发父组件修改数据</button>
  </div>
</template>

<script>
export default {
  name: 'comp1',
  props: ['num'],
  data() {
    return {
      innerNum: 1,
    };
  },
  updated() {
    console.log('父组件num=' + this.num);
  },
}
</script>

<style>

</style>
