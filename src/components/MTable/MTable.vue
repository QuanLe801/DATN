<template>
  <div class="table">
    <table id="table">
      <tr class="table-header">
        <th>
          <input
            type="checkbox"
            style="z-index: 10"
            @click="checkAll"
            v-model="allSelected"
          />
        </th>
        <th>STT</th>
        <th>Mã tài sản</th>
        <th>Tên tài sản</th>
        <th>Loại tài sản</th>
        <th>Bộ phận sử dụng</th>
        <th style="text-align: right">Số lượng</th>
        <th style="text-align: right">Nguyên giá</th>
        <th style="text-align: right">HM/KH lũy kế</th>
        <th style="text-align: right">Giá trị còn lại</th>
        <th style="text-align: center">Chức năng</th>
      </tr>
      <tbody>
        <tr
          v-for="(item, key) in data"
          :key="key"
          @dblclick="editData(item)"
          @click="toggleSelect(item, key)"
          :class="{ 'selected-item': listItemDel.includes(item) }"
          :ref="item.id"
        >
          <td><input type="checkbox" :value="item" v-model="listChecked" /></td>
          <td>{{ key + 1 }}</td>
          <td>{{ item.code }}</td>
          <td :title="item.name">{{ item.name }}</td>
          <td>{{ item.type }}</td>
          <td>{{ item.department }}</td>
          <td>{{ item.count.toLocaleString('vi') }}</td>
          <td :title="Number(item.price * item.count).toLocaleString('vi')">
            {{ Number(item.price * item.count).toLocaleString('vi') }}
          </td>
          <td>
            {{
              item.accumulated.toLocaleString('vi', {
                minimumFractionDigits: 2,
              })
            }}
          </td>
          <td
            :title="
              (
                Number(item.count) * Number(item.price) -
                Number(item.accumulated)
              ).toLocaleString('vi', { minimumFractionDigits: 2 })
            "
          >
            {{
              (
                Number(item.count) * Number(item.price) -
                Number(item.accumulated)
              ).toLocaleString('vi', { minimumFractionDigits: 2 })
            }}
          </td>
          <td>
            <span
              id="icon-option edit"
              class="icon-option edit"
              @click="editData(item)"
              v-b-tooltip.hover
              title="Sửa"
            ></span>
            <span
              id="icon-option copy"
              class="icon-option delete-one"
              v-b-tooltip.hover
              @click="cloneData(item)"
              title="Sao chép"
            ></span>
          </td>
        </tr>
      </tbody>
      <tr style="border-bottom: 0" class="footer-table">
        <td colspan="6">
          <div class="table-footer">
            <span
              >Tổng số:
              <span id="total" style="font-weight: bold">{{
                data && data.length
              }}</span>
              bản ghi</span
            >
            <div class="table-footer-records">
              <button>
                50
                <img
                  src="../../assets/icon/arrow-down.png"
                  width="7px"
                  height="7px"
                />
              </button>
            </div>
            <div
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <button class="page" @click="decrementPage">
                <img
                  src="../../assets/icon/arrow-previous.png"
                  width="9px"
                  height="9px"
                />
              </button>
              <button
                class="page"
                style="
                  margin: 0px 10px 0px 0px;
                  font-weight: bold;
                  background-color: #f5f5f5;
                "
              >
                1
              </button>
              <button class="page" style="margin: 0px 10px 0px 0px">2</button>
              <button class="page none-hover" style="margin: 0px 10px 0px 0px">
                ...
              </button>
              <button class="page" style="margin: 0px 0px">10</button>
              <button class="page" @click="incrementPage">
                <img
                  src="../../assets/icon/arrow-next.png"
                  width="9px"
                  height="9px"
                />
              </button>
            </div>
          </div>
        </td>
        <td style="text-align: right; font-weight: bold" id="total-count">
          {{ TotalCount.toLocaleString('vi') }}
        </td>
        <td
          style="text-align: right; font-weight: bold"
          id="total-price"
          :title="TotalPrice.toLocaleString('vi')"
        >
          {{ TotalPrice.toLocaleString('vi') }}
        </td>
        <td
          style="text-align: right; font-weight: bold"
          id="total-accumulated"
          :title="TotalAccumulated.toLocaleString('vi')"
        >
          {{ TotalAccumulated.toLocaleString('vi') }}
        </td>
        <td
          style="text-align: right; font-weight: bold"
          id="total-real-price"
          :title="TotalRealPrice.toLocaleString('vi')"
        >
          {{ TotalRealPrice.toLocaleString('vi') }}
        </td>
        <td style="text-align: center"></td>
      </tr>
    </table>
  </div>
</template>
<script>
import axios from 'axios';
import MISAEnum from '@/helper/enum';

export default {
  name: 'TheTable',
  props: {
    data: Array,
    listItemDel: Array,
    defaultPageSize: Number,
    defaultPage: Number,
  },
  data() {
    return {
      // listChecked: null,
      showFullText: false,
      allSelected: false,
      // markedData: null,
    };
  },
  created() {
    // this.listChecked = this.listItemDel;
  },
  updated() {},
  methods: {
    /**
     * Author:Quân
     * description: thay đổi page trang
     */
    incrementPage() {
      this.$emit('incrementPage');
    },
    decrementPage() {
      this.$emit('decrementPage');
    },
    editData(item) {
      this.$emit('editData', item);
    },
    async cloneData(item) {
      let newCode;
      await axios
        .get(`${MISAEnum.api.baseUrl}/Assets/newCode`)
        .then((res) => {
          newCode = res.data;
        })
        .catch((e) => {
          console.log(e);
        });

      const cloneItem = {
        ...item,
        code: newCode,
      };
      this.$emit('editData', cloneItem);
    },

    /**
     * Author:Quân
     * description: tích all cho tất cả item
     */
    toggleSelect(item) {
      this.allSelected = false;
      if (this.listChecked.includes(item)) {
        this.$emit('toggleSelect', item);
      } else {
        this.listChecked.push(item);
      }
    },

    /**
     * Author:Quân
     * description: add all item to checked
     */
    checkAll() {
      this.listChecked = [];
      this.allSelected = !this.allSelected;
      if (this.allSelected) {
        this.listChecked = this.data;
      }
    },
  },
  computed: {
    listChecked: {
      get() {
        return this.listItemDel;
      },
      set(value) {
        this.$emit('input', value);
      },
    },

    /**
     * Author:Quân
     * description: tính tổng cho số lượng các tài sản
     */
    TotalCount() {
      let total = 0;
      this.data && this.data.map((item) => (total += item.count));
      return total;
    },

    /**
     * Author:Quân
     * description: tính tổng giá tiền cho các tài sản
     */
    TotalPrice() {
      let total = 0;
      this.data && this.data.map((item) => (total += item.count * item.price));
      return total;
    },

    /**
     * Author:Quân
     * description: tính tổng lũy kế cho các tài sản
     */
    TotalAccumulated() {
      let total = 0;
      this.data && this.data.map((item) => (total += item.accumulated));
      return total;
    },

    /**
     * Author:Quân
     * description: tính tổng giá thực cho các tài sản
     */
    TotalRealPrice() {
      let total = this.TotalPrice - this.TotalAccumulated;
      return total;
    },
  },
};
</script>
<style>
@import url(./style.css);
</style>
