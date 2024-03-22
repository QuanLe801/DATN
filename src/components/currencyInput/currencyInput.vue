<template>
  <div class="form-group" :class="[lg ? 'col-8' : 'col-4']">
    <label class="popup-form-label" :class="{ 'required-icon': required }"
      >{{ title }}
    </label>
    <Money
      autocomplete="off"
      @keypress.native="handleKeyDown"
      @input="handleInput"
      class="popup-form-input"
      :class="[
        showIcon ? 'count' : '',
        { 'border-red': isEmptyValue },
        { 'text-right': type === 'number' || textRight },
        { 'padding-number': showIcon },
      ]"
      name="input"
      :placeholder="[placeholder]"
      :disabled="disabled"
      @blur.native="invalidInput"
      v-bind="moneyOptions"
      v-model="localValue"
    ></Money>
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
import { Money } from 'v-money';

export default {
  name: 'currencyInput',
  props: {
    title: String,
    lg: Boolean,
    type: String,
    placeholder: String,
    showIcon: Boolean,
    disabled: Boolean,
    valueInput: Number,
    required: Boolean,
    isEmpty: Boolean,
    textRight: Boolean,
    moneyOptions: Object,
    maxPercent: Boolean,
  },
  components: { Money },
  data() {
    return {
      // maxNumber:null,
      isEmptyValue: null,
      localValue: this.valueInput,
    };
  },
  created() {
    this.isEmptyValue = this.isEmpty;
  },
  watch: {
    /**
     * Author:Quân
     * description: kiểm tra xem nó có rỗng hay không
     */
    isEmpty() {
      this.isEmptyValue = this.isEmpty;
    },

    /**
     * Author:Quân
     * description: binding hai chiều cho value
     */
    localValue(newValue) {
      this.$emit('input', newValue);
    },
    valueInput(newValue) {
      this.localValue = newValue;
    },
  },
  methods: {
    /**
     * Author:Quân
     * description:gán sự kiện khi nhấn nút esc là validate và submid data
     */
    handleKeyDown(event) {
      this.$emit('keydownPopup', event);
    },

    /**
     * Author:Quân
     * description: nếu flag maxPercent = true, chỉ cho phép tối đa giá trị = 100
     */
    handleInput(value) {
      if (this.maxPercent) {
        if (value === 100) {
          this.localValue = 100;
        }
        if (value > 100) {
          this.localValue = value.toString().slice(0, 5);
        }
      }
      console.log(this.localValue);
    },

    /**
     * Author:Quân
     * description: kiểm tra value có rỗng hay không
     */
    invalidInput() {
      if (this.valueInput === 0) {
        this.isEmptyValue = true;
      } else this.isEmptyValue = false;
    },
  },
};
</script>
<style scoped>
@import url(./style.css);
</style>
