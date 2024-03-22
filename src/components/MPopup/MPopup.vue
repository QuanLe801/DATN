<template>
  <div class="popup" id="popup" tabindex="0" @keydown="keydownPopup">
    <div class="popup-wrapper">
      <div class="popup-header">
        <img
          src="../../assets/icon/x.svg"
          class="close-btn"
          id="close-btn"
          @click="hiddenPopup"
          title="Đóng"
        />
        <h2 class="popup-header-title">{{ titleFormMode }}</h2>
      </div>
      <div class="popup-body">
        <div class="form-row-group">
          <InputField
            title="Mã tài sản"
            placeholder="Nhập mã tài sản"
            :value-input="dataDetail.code"
            v-model="dataDetail.code"
            :is-empty="validate.code"
            :invalid-code="invalidCode"
            :isFocus="true"
            required
            @keydownPopup="keydownPopup"
            :maxlength="50"
          ></InputField>
          <InputField
            :lg="true"
            title="Tên tài sản"
            placeholder="Nhập tên tài sản"
            :value-input="dataDetail.name"
            v-model="dataDetail.name"
            :is-empty="validate.name"
            required
            @keydownPopup="keydownPopup"
            :maxlength="255"
          ></InputField>
        </div>
        <div class="form-row-group">
          <ComboBox
            title="Mã bộ phân sử dụng"
            placeholder="Chọn mã bộ phận sử dụng"
            :selectOptions="selectPartOptions"
            v-model="dataDetail.department"
            :value-input="dataDetail.department"
            :is-empty="validate.department"
            required
            @keydownPopup="keydownPopup"
          ></ComboBox>
          <InputField
            title="Tên bộ phận sử dụng"
            :disabled="true"
            :lg="true"
            :value-input="dataDetail.department"
          ></InputField>
        </div>
        <div class="form-row-group">
          <ComboBox
            title="Mã loại tài sản"
            placeholder="Chọn mã loại tài sản"
            :selectOptions="selectTypeOptions"
            v-model="dataDetail.type"
            :value-input="dataDetail.type"
            :is-empty="validate.type"
            required
            @keydownPopup="keydownPopup"
          ></ComboBox>
          <InputField
            title="Tên loại tài sản"
            :disabled="true"
            :lg="true"
            :value-input="dataDetail.type"
          ></InputField>
        </div>
        <div class="form-row-group">
          <currencyInput
            required
            title="Số lượng"
            placeholder="Nhập số lượng"
            :showIcon="true"
            :value-input="dataDetail.count"
            :is-empty="validate.count"
            v-model="dataDetail.count"
            :moneyOptions="moneyOptions"
            text-right
            @keydownPopup="keydownPopup"
          ></currencyInput>
          <currencyInput
            required
            title="Nguyên giá"
            placeholder="Nhập nguyên giá"
            :value-input="dataDetail.price"
            :is-empty="validate.price"
            v-model="dataDetail.price"
            :moneyOptions="moneyOptions"
            text-right
            @keydownPopup="keydownPopup"
          ></currencyInput>

          <InputField
            title="Số năm sử dụng"
            placeholder="Nhập số năm sử dụng"
            v-model.number="dataDetail.yearsOfUse"
            :value-input="dataDetail.yearsOfUse"
            :default-value="0"
            text-right
            disabled
          ></InputField>
        </div>
        <div class="form-row-group">
          <currencyInput
            required
            title="Tỷ lệ hao mòn (%)"
            placeholder="Nhập tỷ lệ hao mòn"
            :showIcon="true"
            :value-input="dataDetail.depreciationRate"
            :is-empty="validate.depreciationRate"
            v-model="dataDetail.depreciationRate"
            :moneyOptions="decimalOptions"
            text-right
            max-percent
            @keydownPopup="keydownPopup"
          ></currencyInput>
          <InputField
            title="Giá trị hao mòn năm"
            placeholder="Nhập giá trị hao mòn năm"
            v-model.number="dataDetail.accumulated"
            :value-input="dataDetail.accumulated"
            :default-value="0"
            text-right
            required
            disabled
          ></InputField>
          <InputField
            title="Năm theo dõi"
            placeholder="Năm theo dõi"
            v-model.number="dataDetail.yearOfTracking"
            :value-input="dataDetail.yearOfTracking"
            text-right
            required
            disabled
          ></InputField>
        </div>
        <div class="form-row-group" style="margin-bottom: 16px">
          <InputCalendar
            v-model="dataDetail.purchaseDate"
            :value-input="dataDetail.purchaseDate"
            :is-empty="validate.purchaseDate"
            title="Ngày mua"
            required
            @keydownPopup="keydownPopup"
          ></InputCalendar>
          <InputCalendar
            v-model="dataDetail.dayStartedUsing"
            :value-input="dataDetail.dayStartedUsing"
            :is-empty="validate.dayStartedUsing"
            title="Ngày bắt đầu sử dụng"
            required
            @keydownPopup="keydownPopup"
          ></InputCalendar>
        </div>
      </div>
      <div class="popup-footer">
        <TheButton title="Hủy" @click.native="hiddenPopup"></TheButton>
        <TheButton
          title="Lưu"
          :variant="true"
          @click.native="postData"
        ></TheButton>
      </div>
    </div>
    <MDialog
      v-show="showDialog"
      @hiddenCancelDialog="hiddenCancelDialog"
      @hiddenDialog="hiddenDialog"
      @saveData="saveData"
      :form-mode="formMode"
    ></MDialog>
  </div>
</template>
<script>
import TheButton from '../MButton/MButton.vue';
import InputField from '../InputField/InputField.vue';
import ComboBox from '../ComboBox/ComboBox.vue';
import InputCalendar from '../InputCalendar/InputCalendar.vue';
import axios from 'axios';
import MISAEnum from '@/helper/enum';
import MDialog from '../MDialog/MDialog.vue';
import currencyInput from '../currencyInput/currencyInput.vue';
import commonJS from '@/helper/common';

export default {
  name: 'ThePopup',
  data() {
    return {
      newCode: null,
      price: 0,
      moneyDecimalOptions: {
        decimal: ',',
        thousands: '.',
        prefix: '',
        suffix: '',
        precision: 2,
        masked: false,
      },
      decimalOptions: {
        ...this.moneyOptions,
        thousands: '',
        decimal: ',',
      },
      moneyOptions: {
        ...this.moneyDecimalOptions,
        decimal: '',
        thousands: '.',
        precision: 0,
      },
      dataDetail: null,
      cloneData: null,
      showDialog: false,
      invalidCode: false,
      departmentsCode: null,
      typesCode: null,

      validate: {
        code: false,
        name: false,
        department: false,
        type: false,
        count: false,
        price: false,
        accumulated: false,
        yearsOfUse: false,
        depreciationRate: false,
        yearOfTracking: false,
        purchaseDate: false,
        dayStartedUsing: false,
      },
      partOptions: null,
      typeOptions: null,
    };
  },
  props: {
    payload: Object,
    formMode: String,
    data: Array,
    selectPartOptions: Array,
    selectTypeOptions: Array,
  },
  components: {
    TheButton,
    InputField,
    ComboBox,
    InputCalendar,
    MDialog,
    currencyInput,
  },
  created() {
    /**
     * Author:Quân
     * description:lưu data từ table sang.
     */
    if (this.payload !== undefined) {
      this.dataDetail = { ...this.payload };
      this.cloneData = { ...this.payload };
    } else this.dataDetail = null;
  },
  mounted() {
    /**
     * Author:Quân
     * description:nếu form mode là thêm thì tự động sinh mã tài sản
     */
    axios
      .get(`${MISAEnum.api.baseUrl}/Assets/newCode`)
      .then((res) => {
        this.newCode = res.data;
        if (this.formMode === MISAEnum.formMode.add) {
          this.dataDetail.code = res.data;
          this.cloneData.code = res.data;
        }
      })
      .catch((e) => {
        console.log(e);
      });
  },
  methods: {
    /**
     * Author:Quân
     * description:hidden popup
     */
    hiddenPopup() {
      const dataCheckAccumulated = {
        ...this.dataDetail,
        accumulated: Number(
          this.dataDetail.accumulated.replace(/\./g, '').replace(/,/g, '.')
        ),
      };
      if (
        JSON.stringify(dataCheckAccumulated) != JSON.stringify(this.cloneData)
      ) {
        this.showDialog = true;
      } else this.$emit('hiddenPopup');
    },
    /**
     * Author:Quân
     * description:ẩn dialog
     */
    hiddenDialog() {
      this.dataDetail = { ...this.cloneData };
      this.showDialog = false;
      this.$emit('hiddenPopup');
    },
    hiddenCancelDialog() {
      this.showDialog = false;
    },
    /**
     * Author:Quân
     * description:Lưu data(step 1)
     */
    saveData() {
      if (this.formMode === MISAEnum.formMode.add) {
        this.showDialog = false;
        this.$emit('hiddenPopup');
      } else this.postData();
    },
    /**
     * Author:Quân
     * description:Lưu data(step 2)
     */
    async postData() {
      this.showDialog = false;
      /**
       * Author:Quân
       * description:validate code
       */
      if (this.dataDetail.code.slice(0, 2) !== MISAEnum.baseCode) {
        this.invalidCode = true;
        return false;
      } else this.invalidCode = false;
      /**
       * Author:Quân
       * description:validate isEmpty field
       */
      let currentId = Number(this.dataDetail.code.slice(2));
      if (isNaN(currentId)) {
        this.invalidCode = true;
        return false;
      }
      for (let key in this.dataDetail) {
        if (
          this.dataDetail[key] === null ||
          this.dataDetail[key] === '' ||
          this.dataDetail[key] === 0
        ) {
          this.validate[key] = true;
        } else this.validate[key] = false;
      }
      for (let key in this.validate) {
        if (this.validate[key] === true) {
          return false;
        }
      }

      /**
       * Author:Quân
       * description:kiểm tra mã code có bị trùng không nếu có thì tự động sửa mã code
       */
      if (this.formMode === MISAEnum.formMode.add) {
        let currentId = Number(this.dataDetail.code.slice(2));
        if (isNaN(currentId)) {
          this.invalidCode = true;
          return false;
        }

        this.dataDetail.code = this.newCode;
        /**
         * Author:Quân
         * description:create payload và format các trường từ input
         */
        const searchDepartmentId = this.selectPartOptions.filter((item) => {
          if (item.name === this.departmentsCode) return item;
        })[0].id;

        const searchTypesId = this.selectTypeOptions.filter((item) => {
          if (item.name === this.typesCode) return item;
        })[0].id;

        const payload = {
          ...this.dataDetail,
          // departmentsCode: this.departmentsCode,
          // typesCode: this.typesCode,
          departmentsId: searchDepartmentId,
          typesId: searchTypesId,
          accumulated: Number(
            (
              (this.dataDetail.depreciationRate / 100) *
              this.dataDetail.price
            ).toFixed(2)
          ),
        };
        payload.purchaseDate = commonJS.formatDateUTC(payload.purchaseDate);
        payload.dayStartedUsing = commonJS.formatDateUTC(
          payload.dayStartedUsing
        );
        delete payload.department;
        delete payload.type;

        /**
         * Author:Quân
         * description:create post Data
         */
        await axios
          .post(`${MISAEnum.api.baseUrl}/Assets`, payload)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        this.$emit('reloadData', payload);
        this.$emit('hiddenPopup');
      } else if (this.formMode === MISAEnum.formMode.updated) {
        /**
         * Author:Quân
         * description:update item
         */
        if (
          /**
           * Author:Quân
           * description:nếu người save luôn mà chưa thay đổi dữ liệu gì... Cho phép thoát luôn
           */
          JSON.stringify(this.dataDetail) === JSON.stringify(this.cloneData)
        ) {
          this.$emit('hiddenPopup');
        } else {
          /**
           * Author:Quân
           * description:ngược lại bắt đầu kiểm tra dữ liệu và update data
           */
          let currentId = Number(this.dataDetail.code.slice(2));
          if (isNaN(currentId)) {
            this.invalidCode = true;
            return false;
          }
          const filterData = this.data.filter((item) => {
            const id = Number(item.code.slice(2));
            if (id !== Number(this.cloneData.code.slice(2))) return item;
          });
          /**
           * Author:Quân
           * description:nếu trùng thì tự sinh mã mới
           */
          filterData.map((item) => {
            const id = Number(item.code.slice(2));
            if (id === currentId) {
              this.dataDetail.code = this.newCode;
              return false;
            }
          });

          /**
           * Author:Quân
           * description:tạo payload và convert các trường cần thiết
           */

          const searchDepartmentId = this.selectPartOptions.filter((item) => {
            if (item.name === this.departmentsCode) return item;
          })[0].id;

          const searchTypesId = this.selectTypeOptions.filter((item) => {
            if (item.name === this.typesCode) return item;
          })[0].id;
          const payload = {
            ...this.dataDetail,
            // departmentsCode: this.departmentsCode,
            // typesCode: this.typesCode,
            departmentsId: searchDepartmentId,
            typesId: searchTypesId,
            accumulated: Number(
              (
                (this.dataDetail.depreciationRate / 100) *
                this.dataDetail.price
              ).toFixed(2)
            ),
          };
          payload.purchaseDate = commonJS.formatDateUTC(payload.purchaseDate);
          payload.dayStartedUsing = commonJS.formatDateUTC(
            payload.dayStartedUsing
          );
          delete payload.department;
          delete payload.type;
          await axios
            .put(
              `${MISAEnum.api.baseUrl}/Assets/${this.dataDetail.id}`,
              payload
            )
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
          this.$emit('reloadData', payload);
          this.$emit('hiddenPopup');
        }
      }
    },
    /**
     * Author:Quân
     * description:sử lí sự kiện key press ctrl + s submit form
     */
    keydownPopup(event) {
      if (event.keyCode === MISAEnum.eventKeyCode.esc) {
        if (this.showDialog) {
          this.showDialog = false;
        } else this.hiddenPopup();
      }
      if (event.keyCode === MISAEnum.eventKeyCode.enter) {
        if (this.showDialog) {
          this.showDialog = false;
          this.$emit('hiddenPopup');
        }
      }
      if (event.ctrlKey && event.key === MISAEnum.eventKey.save) {
        event.preventDefault();
        this.postData();
      }
    },
  },
  watch: {
    /**
     * Author:Quân
     * description: xem sự thay đổi của combobox và truyền value vào text field
     */
    'dataDetail.department'(value) {
      this.selectPartOptions.map((item) => {
        if (item.value === value) {
          this.departmentsCode = item.name;
        }
      });
    },
    /**
     * Author:Quân
     * description: xem sự thay đổi của combobox và truyền value vào text field
     */
    'dataDetail.type'(value) {
      this.selectTypeOptions.map((item) => {
        if (item.value === value) {
          this.typesCode = item.name;
        }
      });
    },
    /**
     * Author:Quân
     * description: xem sự thay đổi của ngày sử dụng và truyền value sang số năm sử dụng
     */
    'dataDetail.dayStartedUsing'(value) {
      const currentYear = new Date().getFullYear();
      const valueYear = new Date(value).getFullYear();
      if (value) this.dataDetail.yearsOfUse = currentYear - valueYear + 1;
    },
    /**
     * Author:Quân
     * description: xem sự thay đổi của value và tính toán lại accumulated
     */
    'dataDetail.depreciationRate'(value) {
      this.dataDetail.accumulated = Number(
        ((value / 100) * this.dataDetail.price).toFixed(2)
      ).toLocaleString('vi');
    },
    /**
     * Author:Quân
     * description: xem sự thay đổi của value và tính toán lại accumulated
     */
    'dataDetail.price'(value) {
      this.dataDetail.accumulated = Number(
        (value * (this.dataDetail.depreciationRate / 100)).toFixed(2)
      ).toLocaleString('vi');
    },
  },
  computed: {
    /**
     * Author:Quân
     * description: lấy ra năm hiện tại
     */
    currentYear() {
      const currentYear = new Date().getFullYear();
      return currentYear;
    },
    /**
     * Author:Quân
     * description: xem formMode là thêm hay sửa để đổi title
     */
    titleFormMode() {
      let title = '';
      this.formMode === MISAEnum.formMode.add
        ? (title = 'Thêm tài sản')
        : (title = 'Sửa tài sản');
      return title;
    },
  },
};
</script>
<style scoped>
@import url('./style.css');
</style>
