
<template>
  <q-page>
    <div>
      <header-info @addNew="addNew"> General Setting  </header-info>
    </div>
    <dynamic-table
      :show="show"
      :actions="actions"
      :data="getSettings"
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
        General Setting
      </template>
      <template #form-content>
        <!--        <client-form :row="rowToEdit"></client-form>-->
        <setting-form :row="rowToEdit" />
      </template>
    </drower>
  </q-page>
</template>
<script>
import { table } from "src/Mixins/DynamicTable";
import { email } from "src/Mixins/EmailVildate";
import DynamicTable from "src/components/Table/dynamic.vue";
import Drower from "src/components/UI/drower.vue";
import HeaderInfo from "src/components/UI/header-info";
import SettingForm from "src/components/Setting/setting-form.vue";
export default {
  mixins: [table, email],
  components: {
    DynamicTable,
    HeaderInfo,
    Drower,
    SettingForm
  },

  data() {
    return {
      column: [
        {
          name: "item",
          label: "Item",
          align: "left",
          sort: true,
          search: true,
        },
        {
          name: "value",
          label: "Value",
          align: "left",
          sort: true,
          search: true,
        },
        {
          name: "type",
          label: "Type",
          align: "left",
          sort: true,
          search: true,
        },
      ],
    };
  },
  computed: {
    getSettings() {
      return this.$store.getters["Setting/sets"];
    },
  },

  methods: {
    async deleteRow(val) {
      for (const i in val) {
        await this.$store
          .dispatch("Setting/deletSetting", val[i].id)
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
    this.getData("Setting/getSettings");
  },
};
</script>

<style></style>
