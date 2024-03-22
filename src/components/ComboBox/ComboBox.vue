<template>
  <div class="form-group col-4">
    <label class="popup-form-label" :class="{ 'required-icon': required }">{{
      title
    }}</label>
    <select
      :class="[{ 'border-red': isEmptyComboBoxValue }]"
      @keypress="handleKeyDown"
      required
      name="input"
      class="popup-form-input"
      v-model="value"
      @blur="invalidInput"
      @change="$emit('input', $event.target.value)"
    >
      <option value="" disabled hidden>{{ placeholder }}</option>
      <option
        v-for="(items, key) in selectOptions"
        :key="key"
        :value="items.value"
      >
        {{ items.name }}
      </option>
    </select>
    <span
      style="
        font-size: 12px;
        line-height: 10px;
        color: red;
        position: absolute;
        bottom: -13px;
        left: 0;
      "
      v-if="isEmptyComboBoxValue"
      >{{ title }} không được để trống
    </span>
  </div>
</template>
<script>
export default {
  name: 'ComboBox',
  props: {
    title: String,
    placeholder: String,
    selectOptions: Array,
    valueInput: String,
    required: Boolean,
    isEmpty: Boolean,
  },
  data() {
    return {
      value: '',
      isEmptyComboBoxValue: null,
    };
  },
  methods: {
    /**
     * Author:Quân
     * description:gán sự kiện khi nhấn nút
     */
    handleKeyDown(event) {
      this.$emit('keydownPopup', event);
    },
    /**
     * Author:Quân
     * description: Validate các giá trị và hiện ra error text
     */
    invalidInput() {
      if (this.value === '' || this.value === null) {
        this.isEmptyComboBoxValue = true;
      } else this.isEmptyComboBoxValue = false;
    },
  },
  watch: {
    /**
     * Author:Quân
     * description: kiểm tra xem field có rỗng hay không
     */
    isEmpty() {
      this.isEmptyComboBoxValue = this.isEmpty;
    },
  },
  created() {
    /**
     * Author:Quân
     * description: truyề các props vào value
     */
    this.isEmptyComboBoxValue = this.isEmpty;
    if (this.valueInput) {
      this.value = this.valueInput;
    } else this.value = '';
  },
};
</script>
<style scoped>
@import url('./style.css');
</style>
