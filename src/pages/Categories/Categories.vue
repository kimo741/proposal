<template>
  <div>
    <div>
      <header-info @addNew="addNew"> Category </header-info>
    </div>
    <!-- {{ getCats }} -->
    <!-- :show="show" -->
    <dynamic-table
      :actions="actions"
      :loading="loading"
      :data="getCats"
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
        Categore
      </template>
      <template #form-content>
        <CategoryForm :row="rowToEdit" />
      </template>
    </drower>
  </div>
</template>
<script>
import { table } from "src/Mixins/DynamicTable";
import { email } from "src/Mixins/EmailVildate";
import DynamicTable from "src/components/Table/dynamic.vue";
import HeaderInfo from "src/components/UI/header-info";
import CategoryForm from "src/components/Category/category-form.vue";
import Drower from "src/components/UI/drower.vue";
export default {
  mixins: [table, email],
  components: {
    DynamicTable,
    HeaderInfo,
    Drower,
    CategoryForm,
  },
  data() {
    return {
      column: [
        {
          name: "name",
          label: "Name",
          align: "left",
          sort: true,
          search: true,
          search: true,
        },
      ],
    };
  },
  computed: {
    getCats() {
      return this.$store.getters["Cat/cats"];
    },
  },
  methods: {
    async deleteRow(val) {
      for (const i in val) {
        await this.$store
          .dispatch("Cat/deleteCat", val[i].id)
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
    this.getData("Cat/getCats");
  },
};
</script>

<style></style>
