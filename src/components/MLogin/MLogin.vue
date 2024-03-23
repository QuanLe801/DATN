<template>
  <div class="popup" id="popup" tabindex="0">
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
            title="Tên đăng nhập"
            placeholder="username"
            :value-input="uname"
            v-model="uname"
            :isFocus="true"
            required
            :maxlength="50"
          ></InputField>
          <InputField
            type-password
            :lg="true"
            title="Mật khẩu"
            placeholder="password"
            :value-input="pass"
            v-model="pass"
            required
            :maxlength="255"
          ></InputField>
        </div>
      </div>
      <div class="popup-footer">
        <TheButton title="Hủy" @click.native="hiddenPopup"></TheButton>
        <TheButton
          title="Đăng nhập"
          :variant="true"
          @click.native="postData"
        ></TheButton>
      </div>
    </div>
  </div>
</template>
<script>
import TheButton from '../MButton/MButton.vue';
import InputField from '../InputField/InputField.vue';
import MISAEnum from '../../helper/enum';
import axios from 'axios';

export default {
  name: 'ThePopupLogin',
  data() {
    return {
      uname: this.username,
      pass: this.password,
    };
  },
  props: {
    formMode: String,
    username: String,
    password: String,
  },
  components: {
    TheButton,
    InputField,
  },
  mounted() {
    /**
     * Author:Quân
     * description:nếu form mode là thêm thì tự động sinh mã tài sản
     */
  },
  methods: {
    /**
     * Author:Quân
     * description:hidden popup
     */
    hiddenPopup() {
      this.$emit('hiddenPopupLogin');
    },
    /**
     * Author:Quân
     * description:Lưu data(step 2)
     */
    async postData() {
      const payload = {
        username: this.uname,
        password: this.pass,
      };
      axios
        .post(`${MISAEnum.api.baseUrl}/login`, payload)
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem('userData', JSON.stringify(response.data));
            this.$emit('isLoginSucc', response.data);

            alert('Đăng nhập thành công');
            // Xử lý khi đăng nhập thành công (status code 200)
            this.hiddenPopup();
          } else if (response.status === 404) {
            // Xử lý khi tên đăng nhập không đúng (status code 404)
            throw new Error('Tên đăng nhập không đúng');
          } else {
            alert('Thông tin đăng nhập sai. Hãy nhập lại!');
          }
        })
        .catch((error) => {
          alert('Tên đăng nhập không đúng');
          console.log(error);
        });
    },
  },
  watch: {},
  computed: {
    /**
     * Author:Quân
     * description: xem formMode là thêm hay sửa để đổi title
     */
    titleFormMode() {
      let title = 'Đăng nhập';
      return title;
    },
  },
};
</script>
<style scoped>
@import url('./style.css');
</style>
