<template>
  <q-page>
    <div>
      <header-info @addNew="addNew"> Items </header-info>
    </div>
    <!-- {{ getEmp }} -->
    <dynamic-table
      :actions="actions"
      :loading="loading"
      :data="getItem"
      :column="column"
      @sort="sort"
      @pagination="pagination"
      @search="search"
      @edit="edit"
      @deleteRow="confirmDelete"
    />
    <drower>
      <template #form-header>
        {{ formPageTtitel }}
        Employee
      </template>
      <template #form-content>
        <!-- <client-form :row="rowToEdit"></client-form> -->
        <Item :row="rowToEdit" />
      </template>
    </drower>
  </q-page>
</template>
<script>
import { table } from "src/Mixins/DynamicTable";
import { email } from "src/Mixins/EmailVildate";
import DynamicTable from "src/components/Table/dynamic.vue";
import HeaderInfo from "src/components/UI/header-info";
import Drower from "src/components/UI/drower.vue";
import Item from "src/components/Item/Item.vue";
export default {
  mixins: [table, email],
  components: {
    DynamicTable,
    HeaderInfo,
    Drower,
    Item,
  },
  // {
  //     "id": 12,
  //     "name": "item name3",
  //     "description": "item desc3",
  //     "hint": "item desc3",
  //     "parent_id": 10,
  //     "category_id": 19,
  //     "category": "category name2",
  //     "parent": "item name3"
  // },
  data() {
    return {
      column: [
        {
          name: "name",
          label: "Name",
          align: "left",
          sort: true,
          search: true,
        },
        {
          name: "description",
          label: "Job Title",
          align: "left",
          sort: true,
          search: true,
        },
        {
          name: "hint",
          label: "Month Salary",
          align: "left",
          sort: true,
          search: true,
        },
        {
          name: "parent",
          label: "Hour Cost",
          align: "left",
          sort: true,
          search: true,
        },
        {
          name: "parent_id",
          label: "Hour Cost",
          align: "left",
          sort: true,
          search: true,
        },
        {
          name: "category",
          label: "Hour Cost",
          align: "left",
          sort: true,
          search: true,
        },
        {
          name: "category_id",
          label: "Hour Cost",
          align: "left",
          sort: true,
          search: true,
        },
      ],
    };
  },
  computed: {
    getItem() {
      return this.$store.getters["Item/items"];
    },
  },

  methods: {
    async deleteRow(val) {
      for (const i in val) {
        await this.$store
          .dispatch("Employee/deletEmployee", val[i].id)
          .then(() => {
            this.$q.notify("Data Deleted successfully");
          })
          .catch((err) => {
            this.error(err);
          });
      }
    },
  },
  created() {
    this.getData("Item/getItems");
  },
};
</script>

<style></style>
