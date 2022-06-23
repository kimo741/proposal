<template>
  <div class="form full-width text-center flex">
    <div class="q-pa-md full-width items-center" style="">
      <q-form
        text-center
        @submit="submit"
        class="q-gutter-md edit-width full-width"
      >
        <div class="row full-width justify-between">
          <div class="col-12 col-sm-5 q-py-md select">
            <q-select
              outlined
              v-model="inventory.type"
              :options="typeOption"
              label="Type"
            />
          </div>

          <div class="col-12 col-sm-5 q-py-md">
            <q-select
              outlined
              v-model="inventory.sub_type"
              :options="sub_typeOption"
              label="Sub Type"
            />
          </div>
        </div>
        <div class="col-12 full-width q-py-md" v-if="inventory.type !== null">
          <q-select
            v-if="inventory.type.value === 'sub'"
            outlined
            v-model="inventory.parent_id"
            :options="parent_idOption"
            label="Parent:id"
          />
          {{parent_idOption}}
        </div>

        <div class="row full-width">
          <q-input
            class="col-12 col-sm-5 q-pb-md q-py-md"
            dense
            lazy-rules
            v-model="inventory.name.en"
            label="Inventory Name en *"
          />
          <q-space />
          <q-input
            class="col-12 col-sm-5 q-py-md"
            dense
            lazy-rules
            v-model="inventory.name.ar"
            label="Inventory Name ar *"
          />
        </div>

        <div class="row full-width">
          <q-input
            class="col-12"
            dense
            lazy-rules
            v-model="inventory.location"
            label="location *"
          />
        </div>

        <q-space />

        <div style="bottom: 15px" class="fixed-bottom">
          <q-separator class="q-mb-md" />
          <div align="end" class="q-px-lg q-gutter-x-md">
            <q-btn
              color="red"
              label="cancel"
              outline
              @click="$store.state.global.formDrawerOpen = false"
            />
            <q-btn color="secondary" label="save" @click="submit" />
          </div>
        </div>

        <q-inner-loading :showing="visible">
          <q-spinner-gears size="50px" color="primary" />
        </q-inner-loading>
      </q-form>
    </div>
  </div>
</template>
<script>
import { email } from "src/Mixins/EmailVildate";
export default {
  props: ["row"],
  mixins: [email],
  data() {
    return {
      typeOption: [
        {
          label: "Main Inventory",
          value: "main",
        },
        {
          label: "Sub Inventory",
          value: "sub",
        },
      ],
      sub_typeOption: [
        {
          label: "Online Inventory",
          value: "online",
        },
        {
          label: "Offline Inventory",
          value: "offline",
        },
        {
          label: "Hub Inventory",
          value: "hub",
        },
        {
          label: "Maintenance Inventory",
          value: "maintenance",
        },
        {
          label: "Recycling Inventory",
          value: "recycling",
        },
      ],
      inventory: {
        type: null,
        sub_type: null,
        parent_id: null,
        name: { ar: "", en: "" },
        location: "",
      },
    };
  },
  computed: {
    parent_idOption() {
      return this.$store.getters["Inv/invList"];
    },
  },
  watch: {
    row(val) {
      if (val.id) {
        Object.assign(this.inventory, val);
        this.inventory.type = this.typeOption.filter(option => option.value === val.type)[0]
        this.inventory.sub_type = this.sub_typeOption.filter(option => option.value === val.sub_type)[0]
        if (this.inventory.parent_id)
          this.inventory.parent_id = this.parent_idOption.filter(option => option.value === val.parent_id)[0]
      } else {
        this.inventory = {
          type: null,
          sub_type: null,
          parent_id: null,
          name: { ar: "", en: "" },
          location: "",
        };
      }
    },
  },
  methods: {
    submit() {
      this.visible = true
      const form = new FormData();
      form.append("type", this.inventory.type.value);
      form.append("sub_type", this.inventory.sub_type.value);
      if (this.inventory.parent_id !== null)
        form.append("parent_id", this.inventory.parent_id.value);
      form.append("name", JSON.stringify(this.inventory.name));
      form.append("location", this.inventory.location);
      if (this.inventory.id) form.append("id", this.inventory.id);

      this.$store
        .dispatch("Inv/addOrUpdateInv", form)
        .then( data => {
          this.visible = false
          this.$store.commit('OPENE_FORM_DROWER')
          this.$q.notify('Data add successfully')
        })
        .catch((err) => {
          this.error(err);
        });
    },
    getlist() {
      this.$store.dispatch("Inv/getInvList")
    },
  },
  created() {
    this.getlist();
  }
};
</script>
<style lang="scss" scoped>
.form {
  text-align: center;
  margin: auto !important;
  width: 100% !important;
  text-align: center;
}
.edit-width {
  .select {
    @media (max-width: $breakpoint-sm-max) {
      // padding-bottom: 20px !important;
    }
  }
  width: 100% !important;
  margin: auto !important;
}
// .size-image {
//   margin: 50px auto;
//   width: 80%;
//   height: 200px;
// }
</style>
