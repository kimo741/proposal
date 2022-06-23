<template>
  <q-page>
    <div>
      <header-info @addNew="addNew"> Employee </header-info>
    </div>
    <!-- {{ getEmp }} -->
    <dynamic-table
      :actions="actions"
      :loading="loading"
      :data="getEmp"
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
        <Employee :row="rowToEdit" />
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
import Employee from "src/components/Employee/Employee.vue";
export default {
  mixins: [table, email],
  components: {
    DynamicTable,
    HeaderInfo,
    Drower,
    Employee,
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
        },
        {
          name: "job_title",
          label: "Job Title",
          align: "left",
          sort: true,
          search: true,
        },
        {
          name: "month_salary",
          label: "Month Salary",
          align: "left",
          sort: true,
          search: true,
        },
        {
          name: "hour_cost",
          label: "Hour Cost",
          align: "left",
          sort: true,
          search: true,
        },
      ],
    };
  },
  computed: {
    getEmp() {
      return this.$store.getters["Employee/emps"];
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
    // this.getData("Client/getCLints");
    this.getData("Employee/getEmployee");
  },
};
</script>

<style></style>
