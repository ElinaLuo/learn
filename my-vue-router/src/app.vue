<template>
  <div>
    <div>{{ num }}</div>
    <div @click="add">自增</div>
    <comp1 :num="num" @change="add"></comp1>
  </div>
</template>

<script>
import comp1 from "./components/comp1.vue";

export default {
  components: {
    comp1,
  },
  name: "app",
  data() {
    return {
      num: 1,
    };
  },
  methods: {
    add() {
      this.num += 1;
    },
  },
};
</script>
