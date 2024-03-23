<template>
  <header class="header">
    <p class="header-title">Danh sách tài sản</p>
    <div class="header-option">
      <p class="header-description">Sở tài chính</p>
      <div class="custom-input">
        <input class="header-input" type="number" max="2023" value="2023" />
      </div>
      <div class="header-btn">
        <span class="img bell"></span>
      </div>
      <div class="header-btn">
        <span class="img menu"></span>
      </div>
      <div class="header-btn">
        <span class="img quest"></span>
      </div>
      <div v-if="!isLogin" class="header-btn">
        <TheButton
          :variant="true"
          title="Đăng nhập"
          @click.native="showPopupLogin"
        ></TheButton>
      </div>
      <b-dropdown
        @click.native="logout"
        v-else
        id="dropdown-1"
        :text="'xin chào ' + [profile.display_name]"
        class="header-btn btn_profile"
        offset="-25"
      >
        <b-dropdown-item>
          <img
            class="sub-img"
            src="../assets/icon/image.png"
            width="25px"
            height="25px"
          />
          <span style="margin-left: 6px">Đăng xuất</span>
        </b-dropdown-item>
      </b-dropdown>
    </div>
  </header>
</template>
<script>
import TheButton from '../components/MButton/MButton.vue';

export default {
  name: 'TheHeader',
  components: {
    TheButton,
  },
  props: {
    isLogin: Boolean,
    profile: Object,
    isShowPopupLogin: Boolean,
  },
  methods: {
    showPopupLogin() {
      this.$emit('showPopupLogin');
    },
    logout() {
      localStorage.removeItem('userData');
      this.$emit('logout');
    },
  },
};
</script>
<style>
.btn_profile .btn-secondary {
  border: none;
  font-weight: 500;
  background-color: #1aa4c8;
  color: #fff;
}
.btn_profile:hover .btn-secondary {
  background: #1489a6;
}

.btn_profile:focus .btn-secondary {
  /* outline: 3px solid #1489a6; */
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}
.img.bell {
  background: url('../assets/icon/qlts-icon.svg') no-repeat -332px -109px;
  width: 16px;
  height: 20px;
  transform: scale(1.2);
  margin-right: 10px;
}
.img.menu {
  background: url('../assets/icon/qlts-icon.svg') no-repeat -199px -23px;
  width: 18px;
  height: 18px;
  transform: scale(1.2);
  margin-right: 10px;
}
.img.quest {
  background: url('../assets/icon/qlts-icon.svg') no-repeat -67px -67px;
  width: 18px;
  height: 18px;
  transform: scale(1.2);
  margin-right: 10px;
}
.img.profile {
  background: url('../assets/icon/qlts-icon.svg') no-repeat -23px -23px;
  width: 18px;
  height: 18px;
  transform: scale(1.2);
}
.header-option {
  display: flex;
  align-items: center;
}

.header-title {
  font-weight: 700;
  margin-bottom: 0;
}

.header-description {
  margin-right: 26px;
  font-weight: 500;
  color: #001031;
  margin-bottom: 0;
}

.header-input {
  position: relative;
  height: 30px;
  background-image: url('../assets/icon/sort.png');
  background-repeat: no-repeat;
  background-size: 16px 16px;
  background-position: 95%;
  border: none;
  background-color: rgba(26, 164, 200, 0.2);
  border-radius: 3px;
  margin-right: 27px;
  padding-left: 53px;
  box-sizing: border-box;
  width: 112px;
  font-size: 13px;
  font-weight: 700;
}
.custom-input {
  position: relative;
}

.custom-input::before {
  content: 'Năm';
  position: absolute;
  top: calc(50% - 9.5px);
  font-size: 13px;
  margin-left: 11px;
}
.header-input:hover {
  background-color: rgba(26, 165, 200, 0.097);
  cursor: pointer;
}
.header-input:focus {
  border: 1px solid rgb(0, 145, 255);
  outline: none;
}

.header-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
}
</style>
