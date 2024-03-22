<template>
  <div class="dialog" id="dialog">
    <div class="dialog-wrapper">
      <div class="dialog-content" style="margin-right: 10px">
        <img src="../../assets/icon/warning.png" width="40px" height="40px" />
        <span class="title">{{ titleDialog }}</span>
      </div>
      <ul class="dialog-description" id="dialog-description"></ul>
      <div class="dialog-footer">
        <Button
          @click.native="hiddenCancelDialog"
          :title="titleCancelBtn"
          style="margin-right: 10px; border: 1px solid grey"
          not-drop-shadow
        ></Button>
        <Button
          class="cancel-btn"
          @click.native="hiddenDialog"
          title="Không Lưu"
          style="margin-right: 10px; border: 1px solid grey"
          not-drop-shadow
          v-show="showCanelBtn"
        ></Button>
        <Button
          :title="titleButton"
          :variant="true"
          not-drop-shadow
          @click.native="saveData"
        ></Button>
      </div>
    </div>
  </div>
</template>
<script>
import Button from '../MButton/MButton.vue';
import MISAEnum from '@/helper/enum';

export default {
  name: 'MDialog',
  data() {
    return {};
  },
  components: {
    Button,
  },
  props: {
    formMode: String,
    item: Array,
  },
  methods: {
    /**
     * Author:Quân
     * description: phát sự kiện ra bên ngoài là cancel dialog nhưng không lưu data
     */
    hiddenCancelDialog() {
      this.$emit('hiddenCancelDialog');
    },
    /**
     * Author:Quân
     * description: phát sự kiện ra bên ngoài là cancel dialog nhưng lưu data
     */
    hiddenDialog() {
      this.$emit('hiddenDialog');
    },
    /**
     * Author:Quân
     * description: lưu data
     */
    async saveData() {
      this.$emit('saveData');
    },
  },
  computed: {
    /**
     * Author:Quân
     * description: xem formMode có phải update hay delete để thêm một cancel button
     */
    showCanelBtn() {
      if (this.formMode === MISAEnum.formMode.updated) return true;
      return false;
    },
    /**
     * Author:Quân
     * description: xem formMode có phải update hay delete để đổi title cho cancel button
     */
    titleCancelBtn() {
      if (this.formMode === MISAEnum.formMode.add) return 'Không';
      return 'Hủy bỏ';
    },
    /**
     * Author:Quân
     * description: xem formMode có phải update hay delete để đổi title cho dialog
     */
    titleDialog() {
      if (MISAEnum.formMode.deleted === this.formMode) {
        const singleDel = `Bạn có muốn xóa tài sản ${this.item[0].code} - ${this.item[0].name} `;
        const multiDel = `${this.item.length} tài sản đã được chọn. Bạn có muốn xóa các tài sản này khỏi danh sách?`;
        return this.item.length === 1 ? singleDel : multiDel;
      } else if (MISAEnum.formMode.add === this.formMode)
        return 'Bạn có muốn hủy bỏ khai báo tài sản này?';
      return 'Thông tin thay đổi sẽ không được cập nhật nếu bạn không lưu. Bạn có muốn lưu các thay đổi này?';
    },
    /**
     * Author:Quân
     * description: xem formMode có phải update hay delete để đổi title cho button
     */
    titleButton() {
      if (MISAEnum.formMode.deleted === this.formMode) {
        return 'Xóa';
      } else if (MISAEnum.formMode.add === this.formMode) return 'Hủy bỏ';
      return 'Lưu';
    },
  },
};
</script>
<style scoped>
@import url('./style.css');
</style>
