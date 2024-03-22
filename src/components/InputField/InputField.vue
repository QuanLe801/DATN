<template>
  <div
    class="form-group"
    :class="[lg ? 'col-8' : 'col-4']"
    :ref="isFocus ? 'inputWrapper' : ''"
  >
    <label class="popup-form-label" :class="{ 'required-icon': required }"
      >{{ title }}
    </label>
    <input
      autocomplete="off"
      :maxlength="maxlength"
      @keypress="handleKeyDown"
      @input="$emit('input', $event.target.value)"
      class="popup-form-input"
      :class="[
        showIcon ? 'count' : '',
        { 'border-red': isEmptyValue },
        { 'text-right': textRight },
        { 'padding-number': showIcon },
      ]"
      name="input"
      :value="[value ? value : defaultValue]"
      :placeholder="[placeholder]"
      :disabled="disabled"
      @blur="invalidInput"
    />
    <span
      style="
        font-size: 12px;
        line-height: 10px;
        color: red;
        position: absolute;
        bottom: -13px;
        left: 0;
      "
      v-show="isEmptyValue"
      >{{ title }} không được để trống</span
    >
  </div>
</template>
<script>
export default {
  name: 'InputField',
  props: {
    title: String,
    lg: Boolean,
    placeholder: String,
    showIcon: Boolean,
    defaultValue: [String, Number],
    disabled: Boolean,
    valueInput: [String, Number],
    required: Boolean,
    isEmpty: Boolean,
    invalidCode: Boolean,
    textRight: Boolean,
    isFocus: Boolean,
    maxlength: Number,
  },
  data() {
    return {
      isEmptyValue: null,
      invalid: null,
      formatMoney: null,
      value: this.valueInput,
    };
  },
  created() {
    /**
     * Author:Quân
     * description: gán các prop vào các value
     */
    this.isEmptyValue = this.isEmpty;
    this.invalid = this.invalidCode;
    this.value = this.valueInput;
    /**
     * Author:Quân
     * description:autufocus when popup open
     */
    setTimeout(() => {
      if (this.isFocus) {
        this.$refs.inputWrapper.querySelector('input').focus();
      }
    }, 0);
  },
  watch: {
    /**
     * Author:Quân
     * description: binding hai chiều cho các giá trị
     */
    isEmpty() {
      this.isEmptyValue = this.isEmpty;
    },
    invalidCode() {
      this.invalid = this.invalidCode;
    },
    valueInput() {
      this.value = this.valueInput;
    },
  },
  methods: {
    /**
     * Author:Quân
     * description: gán sự kiện khi nhấn nút
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
<style scoped>
@import url(./style.css);
</style>
