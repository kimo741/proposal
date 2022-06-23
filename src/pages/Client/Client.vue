<template>
  <q-page>
    <div>
      <header-info @addNew="addNew"> Clints </header-info>
    </div>
    <dynamic-table
      :show="show"
      :actions="actions"
      :data="getClints"
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
        Client
      </template>
      <template #form-content>
        <client-form :row="rowToEdit"></client-form>
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
import ClientForm from "src/components/Client/client-form.vue";
export default {
  mixins: [table, email],
  components: {
    DynamicTable,
    HeaderInfo,
    Drower,
    ClientForm,
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
          name: "email",
          label: "Email",
          align: "left",
          sort: true,
          search: true,
        },
        {
          name: "phone",
          label: "Phone",
          align: "left",
          sort: true,
          search: true,
        },
        {
          name: "created_at",
          label: "Created at",
          align: "left",
          sort: true,
          search: true,
        },
        {
          name: "updated_at",
          label: "Created at",
          align: "left",
          sort: true,
          search: true,
        },
      ],
    };
  },
  computed: {
    getClints() {
      return this.$store.getters["Client/clints"];
    },
  },

  methods: {
    async deleteRow(val) {
      for (const i in val) {
        await this.$store
          .dispatch("Client/deletClients", val[i].id)
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
    this.getData("Client/getCLints");
  },
};
</script>

<style></style>
