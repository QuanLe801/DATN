<template>
  <button class="sub-btn" :disabled="isEmpty" :class="{ disabled: isEmpty }">
    <span :class="[clone ? 'clone' : 'delete']"></span>
  </button>
</template>
<script>
export default {
  name: 'TheButtonImg',
  props: {
    clone: Boolean,
    dataCount: Number,
  },
  computed: {
    isEmpty() {
      if (this.dataCount === 0) {
        return true;
      }
      return false;
    },
  },
};
</script>
<style scoped>
@import url(./style.css);
</style>
