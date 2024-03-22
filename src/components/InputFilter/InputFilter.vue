<template>
  <input
    autocomplete="off"
    type="text"
    class="form-input"
    placeholder="Tìm kiếm tài sản"
    @input="$emit('input', $event.target.value)"
    :value="search"
  />
</template>
<script>
export default {
  name: 'TheContent',
  props: {
    textSearch: String,
  },
  created() {
    if (this.textSearch) {
      this.search = this.textSearch;
    }
  },
  data() {
    return {
      search: null,
    };
  },
};
</script>
<style>
@import url(./style.css);
</style>
