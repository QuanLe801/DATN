<template>
  <div class="form-group col-4">
    <label class="popup-form-label" :class="{ 'required-icon': required }"
      >{{ title }}
    </label>
    <div class="group-carlendar">
      <input
        @keypress="handleKeyDown"
        @input="$emit('input', $event.target.value)"
        :class="[
          showIcon ? 'count' : '',
          { 'border-red': isEmptyValue },
          { 'padding-number': showIcon },
        ]"
        :value="[valueInput ? valueInput : defaultValue]"
        :disabled="disabled"
        @blur="invalidInput"
        type="date"
        placeholder="dd/MM/yyyy"
        class="birth_day-label"
      />
    </div>
    <span
      style="
        font-size: 12px;
        line-height: 10px;
        color: red;
        position: absolute;
        bottom: -13px;
        left: 0;
      "
      v-if="isEmptyValue"
      >{{ title }} không được để trống</span
    >
  </div>
</template>
<script>
export default {
  name: 'InputCalendar',
  props: {
    title: String,
    required: Boolean,
    lg: Boolean,
    placeholder: String,
    showIcon: Boolean,
    defaultValue: [String, Number],
    disabled: Boolean,
    valueInput: [String, Number],
    isEmpty: Boolean,
  },
  data() {
    return {
      isEmptyValue: null,
    };
  },
  created() {
    this.isEmptyValue = this.isEmpty;
  },
  watch: {
    isEmpty() {
      this.isEmptyValue = this.isEmpty;
    },
  },
  methods: {
    /**
     * Author:Quân
     * description: phát sự kiệm keydown cho từng input
     */
    handleKeyDown(event) {
      this.$emit('keydownPopup', event);
    },

    /**
     * Author:Quân
     * description: kiểm tra giá trị có rỗng hay không
     */
    invalidInput() {
      if (this.valueInput === '' || this.valueInput === null) {
        this.isEmptyValue = true;
      } else this.isEmptyValue = false;
    },
  },
};
</script>
<style>
@import url('./style.css');
</style>
