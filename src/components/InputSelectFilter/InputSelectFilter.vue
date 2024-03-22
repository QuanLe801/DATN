<template>
  <select
    class="select filter-input"
    required
    @change="$emit('input', $event.target.value)"
  >
    <option value="" selected>{{ title }}</option>
    <option v-for="(items, key) in selectOptions" :key="key">
      {{ items.name }}
    </option>
  </select>
</template>
<script>
export default {
  name: 'InputSelectFilter',
  props: {
    title: String,
    selectOptions: Array,
    valueInput: String,
  },
};
</script>
<style>
@import url(./style.css);
</style>
