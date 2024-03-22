<template>
  <div class="body">
    <div class="group-action">
      <div class="filter">
        <div class="form-group-filter">
          <span class="form-img-filter search"></span>
          <InputFilter
            :textSearch="textSearch"
            v-model="textSearch"
          ></InputFilter>
        </div>
        <div class="form-group-filter">
          <span class="form-img-filter filter"></span>
          <InputSelectFilter
            title="Loại tài sản"
            :selectOptions="selectPartOptions"
            v-model="textDepartmentSearch"
          ></InputSelectFilter>
        </div>
        <div class="form-group-filter">
          <span class="form-img-filter filter"></span>
          <InputSelectFilter
            title="Bộ phận sử dụng"
            :selectOptions="selectTypeOptions"
            v-model="textTypeSearch"
          ></InputSelectFilter>
        </div>
        <div class="action">
          <TheButton
            :variant="true"
            title="Tìm kiếm"
            @click.native="filterData"
          ></TheButton>
        </div>
      </div>
      <div class="action">
        <TheButton
          :variant="true"
          title="+ Thêm tài sản"
          @click.native="showPopup"
        ></TheButton>
        <TheButtonImg
          title="Sao lưu"
          clone
          :dataCount="listItemDel.length"
        ></TheButtonImg>
        <TheButtonImg
          title="Xóa"
          @click.native="showDeleteDialog"
          :dataCount="listItemDel.length"
        ></TheButtonImg>
      </div>
    </div>
    <TheTable
      :listItemDel="listItemDel"
      :data="data"
      @editData="editData"
      v-model="listItemDel"
      :defaultPageSize="defaultPageSize"
      :defaultPage="defaultPage"
      @incrementPage="incrementPage"
      @decrementPage="decrementPage"
      @toggleSelect="toggleSelect"
    ></TheTable>
    <MDialog
      v-if="showDialog"
      @hiddenCancelDialog="hiddenCancelDialog"
      @hiddenDialog="hiddenDialog"
      @saveData="deleteData"
      :form-mode="formMode"
      :item="listItemDel"
    ></MDialog>
  </div>
</template>
<script>
import InputFilter from '../components/InputFilter/InputFilter.vue';
import InputSelectFilter from '../components/InputSelectFilter/InputSelectFilter.vue';
import TheButton from '../components/MButton/MButton.vue';
import TheButtonImg from '../components/MButtonImg/MButtonImg.vue';
import TheTable from '../components/MTable/MTable.vue';
import axios from 'axios';
import MISAEnum from '@/helper/enum';
import MDialog from '@/components/MDialog/MDialog.vue';

export default {
  name: 'TheContent',
  components: {
    InputFilter,
    InputSelectFilter,
    TheButton,
    TheButtonImg,
    TheTable,
    MDialog,
  },
  props: {
    data: Array,
    defaultPageSize: Number,
    defaultPage: Number,
    selectPartOptions: Array,
    selectTypeOptions: Array,
    listItem: Array,
  },
  data() {
    return {
      showDialog: false,
      formMode: '',
      textSearch: null,
      textTypeSearch: null,
      textDepartmentSearch: null,
    };
  },
  mounted() {},
  created() {
    this.listItemDel = this.listItem;
  },
  watch: {
    textSearch(value) {
      setTimeout(() => {
        this.$emit('search', value);
      }, 500);
    },
    textDepartmentSearch(value) {
      setTimeout(() => {
        this.$emit('searchDepartment', value);
      }, 500);
    },
    textTypeSearch(value) {
      setTimeout(() => {
        this.$emit('searchType', value);
      }, 500);
    },
  },
  computed: {
    listItemDel: {
      get() {
        return this.listItem;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
  methods: {
    /**
     * toggle select để xóa
     */
    toggleSelect(item) {
      this.$emit('toggleSelect', item);
    },

    /**
     * Author:Quân
     * description: tăng trang thêm +1
     */
    incrementPage() {
      this.$emit('incrementPage');
    },
    /**
     * Author:Quân
     * description: giảm trang thêm -1
     */
    decrementPage() {
      this.$emit('decrementPage');
    },

    /**
     * Author:Quân
     * description: ẩn hoặc hiện lại dialog
     */
    hiddenDialog() {
      this.showDialog = false;
    },
    hiddenCancelDialog() {
      this.showDialog = false;
    },

    /**
     * Author:Quân
     * description: hiện popup
     */
    showPopup() {
      this.$emit('showPopup');
    },
    /**
     * Author:Quân
     * description: chỉnh sửa data
     */
    editData(item) {
      this.$emit('editData', item);
    },

    filterData() {
      this.$emit('filterData');
    },

    /**
     * Author:Quân
     * description: Xóa nhiều bản ghi cùng lúc
     * step 1: hiện dialog
     */
    showDeleteDialog() {
      this.formMode = MISAEnum.formMode.deleted;
      this.showDialog = true;
    },
    /**
     * Author:Quân
     * step 2: lấy ra danh sách id của các bản ghi
     */
    async deleteData() {
      const idsArray = this.listItemDel.map((item) => item.id);
      await this.deleteItems(idsArray);
      this.showDialog = false;
    },
    /**
     * Author:Quân
     * step 3: xóa nhiều bản ghi
     */
    deleteItems(id) {
      axios
        .delete(`${MISAEnum.api.baseUrl}/Assets`, { data: id })
        .then((res) => {
          console.log(res);
          this.$emit('reloadListItemDel');
          this.$emit('reloadData');
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style>
.filter {
  display: flex;
}

.form-img-filter {
  width: 24px;
  height: 24px;
  position: absolute;
  top: calc(50% - 6px);
  margin-left: 11px;
}
.form-img-filter.search {
  background: url('../assets/icon/qlts-icon.svg') no-repeat -243px -20px;
  width: 24px;
  height: 24px;
}
.form-img-filter.filter {
  background: url('../assets/icon/qlts-icon.svg') no-repeat -243px -64px;
  width: 24px;
  height: 24px;
}

.form-group-filter {
  position: relative;
}

.body {
  height: calc(100% - 50px);
  padding: 0px 20px 13px 20px;
  background-color: #f4f7ff;
}

.action {
  justify-content: center;
  display: flex;
  margin-top: 13px;
}
.group-action {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
@media screen and (max-width: 992px) {
  .group-action {
    display: block;
  }
  .form-group-filter {
    width: 100%;
  }
  .form-input {
    width: 100%;
  }
  .select.filter-input {
    width: 100%;
  }
  .action {
    justify-content: flex-start;
  }
  .filter {
    display: block;
  }
}
</style>
