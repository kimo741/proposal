import Vue from "vue";
import { date } from "quasar";

export const table = {
  data() {
    return {
      loading: false,
      searchPayload: "",
      sortPayload: "",
      paginationPayload: "",
      formPageTtitel: "Add New",
      showAssignPermissionForm: false,
      payload: "",
      rowToEdit: {},
      btnState: "add",
      actions: [
        {
          icon: "edit",
          label: "Edit this Row",
          color: "blue",
          event: "edit",
        },
        {
          icon: "delete",
          label: "Delete this row",
          color: "red",
          event: "deleteRow",
        },
      ],
      data: [],
      column: [
        {
          name: "name",
          label: "Name",
          align: "left",
          sort: true,
          search: false,
        },
      ],
    };
  },
  methods: {
    LShow() {
      this.loading = true;
    },
    LHide() {
      this.loading = false;
    },
    closeDrawer() {
      this.showAssignPermissionForm = false;
      this.rowToEdit = {};
    },
    addNew() {
      this.rowToEdit = {};
      this.$store.commit("OPENE_FORM_DROWER");
      this.formPageTtitel = "Add New";
    },
    search(val) {
      this.searchPayload =
        "col=" + val.arr.toString() + "&text=" + val.text + "&";
      this.getData();
    },
    sort(val) {
      this.sortPayload = "sortCol=" + val.column + "&desc=" + val.desc + "&";
      this.getData();
    },
    pagination(val) {
      this.paginationPayload =
        "page=" + val.current + "&perPage=" + val.per_page + "&";
      this.getData();
    },
    handelUrl() {
      this.payload =
        this.searchPayload + this.sortPayload + this.paginationPayload;
    },
    // getData () {},
    handelEdit(val) {
      if (val.length > 1) {
        this.$q.notify("You Can only edit on row each time!");
        return true;
      }
      return false;
    },
    edit(val) {
      if (this.handelEdit(val)) return;
      this.rowToEdit = val[0];
      this.formPageTtitel = "Edit";
      this.$store.commit("OPENE_FORM_DROWER");
    },
    confirmDelete(val) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Realy do you need to delete ?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.deleteRow(val);
        });
    },
    deleteRow(val) {
      console.log("delete", val);
    },
    assignRole(val) {
      console.log("assignRole", val);
    },
    getData(action) {
      this.handelUrl();
      this.LShow();
      this.$store.dispatch(`${action}`, this.payload).then(() => {
        this.LHide();
      });
    },
    getDataList(action){
      this.$store.dispatch(`${action}`)
    }
  },
};
