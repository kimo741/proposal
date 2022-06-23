<template>
  <div class="form full-width text-center flex">
    <div class="q-pa-md full-width items-center" style="">
      <q-form
        text-center
        @submit="submit"
        class="q-gutter-md edit-width full-width"
      >
        <!-- @input="editeFirstN" -->
        <div class="row">
          <div class="col-12 q-my-lg">
            <q-input
              v-model="setting.item"
              :rules="[(val) => (val && val.length > 3) || ' write the item']"
              dense
              label="Item *"
              lazy-rules
            />
          </div>
          <q-space />          <div class="col-12 q-my-lg">
            <q-input
              v-model="setting.value"
              :rules="[(val) => (val && val.length > 3) || ' \n'+ 'write the value']"
              dense
              label="Value *"
              lazy-rules
            />
          </div>
          <q-space />
          <div class="col-12 q-my-lg">
              <q-input
                v-model="setting.type"
                :rules="[(val) => (val && val.length > 3) || ' write the type ']"
                dense
                label="Type *"
                lazy-rules
              />
          </div>
          <q-space />

          <!-- @input="editEmal" -->
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

      setting: {
        item: "",
        value: "",
        type: "",
      },
    };
  },

  watch: {
    row(val) {
      if (val.id) {
        this.setting = val;
      } else {
        this.setting = {
          item: "",
          value: "",
          type: "",
        };
      }
    },
  },
  methods: {
    submit() {
      this.visible = true;
      this.$store
        .dispatch("Setting/updaSetting", this.setting)
        .then((res) => {
          this.visible = false;
          this.$q.notify("request submit is successful");
          this.$store.commit("OPENE_FORM_DROWER");
        })
        .catch((err) => {
          this.$q.notify(err);
          this.visible = false;
        });
    },
  },
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
  width: 100% !important;
  margin: auto !important;
}
.size-image {
  margin: 50px auto;
  width: 80%;
  height: 200px;
}
</style>
