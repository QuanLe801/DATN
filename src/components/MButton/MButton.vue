<template>
  <button
    tab-index="0"
    class="m-btn"
    :class="[variant ? 'primary' : '', { 'box-shadow': notDropShadow }]"
    id="add-item"
  >
    {{ title }}
  </button>
</template>
<script>
export default {
  name: 'TheButton',
  data() {
    return {};
  },
  methods: {},
  props: {
    title: String,
    variant: Boolean,
    notDropShadow: Boolean,
  },
};
</script>
<style>
@import url(./style.css);
</style>
