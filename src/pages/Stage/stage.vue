<template>
  <q-page>
    <div>
      <header-info @addNew="addNew"> Stages </header-info>
    </div>
    <dynamic-table
      :show="show"
      :actions="actions"
      :data="getStages"
      :column="column"
      :loading="loading"
      @sort="sort"
      @pagination="pagination"
      @search="search"
      @edit="edit"
      @deleteRow="confirmDelete"
    />
    <drower>
      <template #form-header>
        {{ formPageTtitel }}
        Stage
      </template>
      <template #form-content>
        <!--        <client-form :row="rowToEdit"></client-form>-->
        <StageForm :row="rowToEdit" />
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
import StageForm from "src/components/Stage/stage-form.vue";
export default {
  mixins: [table, email],
  components: {
    DynamicTable,
    HeaderInfo,
    Drower,
    StageForm,
  },
// {
//   "id": 3,
//   "name": "stage name 3",
//   "description": "stage desc 3"
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
          label: "Description",
          align: "left",
          sort: true,
          search: true,
        },
      ],
    };
  },
  computed: {
    getStages() {
      return this.$store.getters["Stage/stages"];
    },
  },

  methods: {
    async deleteRow(val) {
      for (const i in val) {
        await this.$store
          .dispatch("Stage/deletStage", val[i].id)
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
    this.getData("Stage/getStages");
  },
};
</script>

<style></style>
