<template>
  <div id="section">
    <div class="loading" v-show="data === null">
      <b-spinner></b-spinner>
    </div>
    <SideBar></SideBar>
    <div class="content">
      <TheHeader></TheHeader>
      <TheContent
        :data="data"
        @showPopup="showPopup"
        @editData="editData"
        @search="search"
        @searchDepartment="searchDepartment"
        @searchType="searchType"
        :defaultPage="defaultPage"
        :defaultPageSize="defaultPageSize"
        @incrementPage="incrementPage"
        @decrementPage="decrementPage"
        @reloadData="reloadData"
        :selectPartOptions="selectPartOptions"
        :selectTypeOptions="selectTypeOptions"
        :listItem="listItem"
        @reloadListItemDel="reloadListItemDel"
        v-model="listItem"
        @toggleSelect="toggleSelect"
        @filterData="filterData"
      ></TheContent>
    </div>
    <ThePopup
      v-model="payload"
      v-if="isShowPopup"
      @hiddenPopup="hiddenPopup"
      :payload="payload"
      :form-mode="formMode"
      :data="data"
      :selectPartOptions="selectPartOptions"
      :selectTypeOptions="selectTypeOptions"
      @reloadData="reloadData"
      :listItem="listItem"
      @reloadListItemDel="reloadListItemDel"
    ></ThePopup>
  </div>
</template>

<script>
import TheHeader from './container/TheHeader.vue';
import TheContent from './container/TheContent.vue';
import SideBar from './container/SideBar.vue';
import ThePopup from './components/MPopup/MPopup.vue';
import axios from 'axios';
import MISAEnum from './helper/enum';
import commonJS from './helper/common';
// import { createRouter, createMemoryHistory } from 'vue-router';

export default {
  name: 'App',
  components: {
    TheHeader,
    TheContent,
    SideBar,
    ThePopup,
  },
  data() {
    return {
      listItem: [],
      formMode: '',
      data: null,
      isShowPopup: false,
      isEmptyInput: false,
      defaultPage: 1,
      defaultPageSize: 999,
      markedDataTable: null,

      initPayload: {
        code: null,
        name: null,
        department: null,
        type: null,
        count: 0,
        price: 0,
        accumulated: 0,
        yearsOfUse: null,
        depreciationRate: 0,
        yearOfTracking: new Date().getFullYear(),
        purchaseDate: null,
        dayStartedUsing: null,
      },
      selectPartOptions: null,
      selectTypeOptions: null,
      payload: {},
      searchPayload: {
        textSearch: '',
        searchType: '',
        searchDepartment: '',
      },
    };
  },
  mounted() {},
  created() {
    /**
     * Author:Quân
     * description:thêm sự kiện key down cho body
     */
    document.body.addEventListener('keydown', this.handleKeyDown);
    /**
     * Author:Quân
     * description:gọi api khi render lần đầu
     */
    axios
      .get(`${MISAEnum.api.baseUrl}/Departments`)
      .then((res) => {
        const customOptions = res.data.res.map((item) => {
          return {
            id: item.departmentsId,
            value: item.department,
            name: item.departmentsCode,
          };
        });
        this.selectPartOptions = customOptions;
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`${MISAEnum.api.baseUrl}/Types`)
      .then((res) => {
        const customOptions = res.data.res.map((item) => {
          return {
            id: item.typesId,
            value: item.type,
            name: item.typesCode,
          };
        });
        this.selectTypeOptions = customOptions;
      })
      .catch((error) => {
        console.log(error);
      });

    if (Object.keys(this.$route.query).length !== 0) {
      this.searchData();
    } else {
      axios
        .get(`${MISAEnum.api.baseUrl}/Assets/`)
        .then((data) => {
          data.data.res.map((item) => {
            item.purchaseDate = commonJS.formatDate(item.purchaseDate);
            item.dayStartedUsing = commonJS.formatDate(item.dayStartedUsing);
          });
          this.data = data.data.res;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  watch: {
    $route() {
      this.searchData();
    },
    /**
     * Author:Quân
     * description:xem sự thay đổi page hiện tại và reload lại data theo trang
     */
    defaultPage(value) {
      axios
        .get(
          `${MISAEnum.api.baseUrl}/Assets/GetPaging?page=${value}&size=${this.defaultPageSize}`
        )
        .then((data) => {
          const response = data;
          response.data.map((item) => {
            item.purchaseDate = commonJS.formatDate(item.purchaseDate);
            item.dayStartedUsing = commonJS.formatDate(item.dayStartedUsing);
          });
          this.data = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  methods: {
    /**
     * Author:Quân
     *toggle select để xóa
     */
    toggleSelect(item) {
      this.listItem = this.listItem.filter((value) => item !== value);
    },

    /**
     * Author:Quân
     * reload item selected
     */
    reloadListItemDel() {
      this.listItem = [];
      // this.listItem.push(this.data[0]);
    },
    /**
     * Author:Quân
     * description:gán sự kiện event keypress thêm mới sản phẩm
     */
    handleKeyDown(event) {
      if (event.ctrlKey && event.key === MISAEnum.eventKey.openPopup) {
        event.preventDefault();
        this.showPopup();
      }
    },
    /**
     * Author:Quân
     * description:thay đổi number page trang
     */ incrementPage() {
      if (this.defaultPage < 3) {
        this.defaultPage = this.defaultPage + 1;
      }
    },
    decrementPage() {
      if (this.defaultPage > 1) {
        this.defaultPage = this.defaultPage - 1;
      }
    },
    /**
     * Author:Quân
     * description:hiện popup
     */
    showPopup() {
      this.payload = this.initPayload;
      this.isShowPopup = true;
      this.formMode = MISAEnum.formMode.add;
    },
    /**
     * Author:Quân
     * description:tải lại trang sau khi thực hiện CRUD
     */
    async reloadData(item) {
      await this.reloadListItemDel();
      await axios
        .get(
          `${MISAEnum.api.baseUrl}/Assets/GetPaging?page=${this.defaultPage}&size=${this.defaultPageSize}`
        )
        .then((data) => {
          const response = data;
          response.data.map((value) => {
            value.purchaseDate = commonJS.formatDate(value.purchaseDate);
            value.dayStartedUsing = commonJS.formatDate(value.dayStartedUsing);

            /**
             * Author:Quân
             * description:ghim data nếu sửa hoặc thêm
             */
            if (item) {
              if (item.code === value.code) {
                this.listItem.push(value);
              }
            }
          });
          this.data = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    /**
     * Author:Quân
     * description:Ẩn popup
     */
    hiddenPopup() {
      this.isShowPopup = false;
    },
    /**
     * Author:Quân
     * description:chỉnh sửa data
     */
    editData(item) {
      this.payload = item;
      this.isShowPopup = true;
      this.formMode = MISAEnum.formMode.updated;
    },

    /**
     * Author:Quân
     * description:filter data theo tên,phòng,mã
     * step 1
     */
    searchDepartment(e) {
      this.searchPayload.searchDepartment = e;
      // this.filterData();
    },
    searchType(e) {
      this.searchPayload.searchType = e;
      // this.filterData();
    },
    search(e) {
      this.searchPayload.textSearch = e;
      // this.filterData();
    },
    /**
     * Author:Quân
     * description:filter data theo tên,phòng,mã
     * step 2
     */

    searchData() {
      if (Object.keys(this.$route.query).length !== 0) {
        console.log(this.$route.query);
        const query = `name=${this.$route.query.name}&department=${
          this.$route.query.department !== undefined
            ? this.$route.query.department
            : ''
        }&type=${
          this.$route.query.type !== undefined ? this.$route.query.type : ''
        }`;
        axios
          .get(`${MISAEnum.api.baseUrl}/Assets/GetPaging?${query}`)
          .then((data) => {
            data.data.res.map((item) => {
              item.purchaseDate = commonJS.formatDate(item.purchaseDate);
              item.dayStartedUsing = commonJS.formatDate(item.dayStartedUsing);
            });
            this.data = data.data.res;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    filterData() {
      // const searchDepartmentId = this.selectPartOptions.filter((item) => {
      //   if (item.name === this.searchPayload.searchDepartment) return item;
      // })[0];

      // const searchTypesId = this.selectTypeOptions.filter((item) => {
      //   if (item.name === this.searchPayload.searchType) return item;
      // })[0];

      let queryObject = {};

      // Kiểm tra và thêm các tham số query vào đối tượng query nếu điều kiện đúng
      if (this.searchPayload.textSearch !== null) {
        queryObject['name'] = this.searchPayload.textSearch;
      }
      // if (searchDepartmentId !== null) {
      //   queryObject['department'] = searchDepartmentId;
      // }
      // if (searchTypesId !== null) {
      //   queryObject['type'] = searchTypesId;
      // }
      this.$router.push({
        path: '',
        query: queryObject,
      });
      // const query = `name=${this.searchPayload.textSearch}&department=${
      //   searchDepartmentId ? searchDepartmentId.id : ''
      // }&type=${searchTypesId ? searchTypesId.id : ''}`;
      // axios
      //   .get(`${MISAEnum.api.baseUrl}/Assets/GetPaging?${query}`)
      //   .then((data) => {
      //     data.data.res.map((item) => {
      //       item.purchaseDate = commonJS.formatDate(item.purchaseDate);
      //       item.dayStartedUsing = commonJS.formatDate(item.dayStartedUsing);
      //     });
      //     this.data = data.data.res;
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    },
  },
};
</script>

<style>
@font-face {
  font-family: Roboto;
  src: url('../src/assets/fonts/Roboto-Regular.ttf');
}
#section {
  display: flex;
  font-family: Roboto;
}
.content {
  width: 100%;
}
/* .loading {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.211);
  z-index: 999;
} */

.spinner-border {
  position: absolute;
  top: 50%;
  left: 50%;
}
</style>
import { from } from 'core-js/core/array';
