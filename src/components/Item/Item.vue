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
              v-model="Item.name"
              :rules="[
                (val) =>
                  (val && val.length > 3) || ' Please type the item name',
              ]"
              dense
              label="Item Name *"
              lazy-rules
            />
          </div>
          <q-space />

          <!-- @input="editEmal" -->
          <div class="col-12 q-my-lg">
            <q-input
              v-model="Item.description"
              type="textarea"
              lazy-rules
              label="Description Of Item"
              filled
              hide-bottom-space
            />
            <!-- bg-color="grey-2" -->
          </div>
          <q-space />

          <div class="col-12 q-my-lg">
            <q-input
              v-model="Item.hint"
              :rules="[
                (val) => (val && val.length > 3) || ' Please type hint of item',
              ]"
              dense
              label="Item hint *"
              lazy-rules
            />
          </div>

          <q-space />
          <!-- <div class="col-5 q-my-lg">
            <q-input
              v-model="Item.parent"
              :rules="[
                (val) =>
                  (val && val.length > 3) || ' Please type the Parent of Item',
              ]"
              dense
              label="Item Parent *"
              lazy-rules
            />
          </div> -->
          <q-space />
          <!-- @input="Editephone" -->
          <div class="col-5 q-my-lg">
            <q-input
              v-model="Item.parent_id"
              :rules="[
                (val) =>
                  (val !== null && val !== '') || 'Please type Parent ID',
                (val) =>
                  (val > 0 && val.length < 15) ||
                  'Please type a real Parent ID',
              ]"
              dense
              hint=""
              label="Parent ID *"
              lazy-rules
              type="number"
            />
          </div>
          <!-- <div class="col-5 q-my-lg">
            <q-input
              v-model="Item.category"
              :rules="[
                (val) =>
                  (val && val.length > 3) ||
                  ' Please type the category of item',
              ]"
              dense
              label="Category *"
              lazy-rules
            />
          </div> -->
          <q-space />
          <div class="col-5 q-my-lg">
            <q-input
              v-model="Item.category_id"
              :rules="[
                (val) =>
                  (val !== null && val !== '') ||
                  'Please type Category ID of item',
                (val) =>
                  (val > 0 && val.length < 15) ||
                  'Please type a real  Category ID of item',
              ]"
              dense
              hint=""
              label="Category ID *"
              lazy-rules
              type="number"
            />
          </div>

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
      Item: {
        name: "",
        description: "",
        hint: "",
        parent: "",
        parent_id: "",
        category: "",
        category_id: "",
      },
    };
  },
  watch: {
    row(val) {
      if (val.id) {
        this.Item = val;
      } else {
        this.Item = {
          name: "",
          description: "",
          hint: "",
          category_id: "",
          parent_id: "",
        };
      }
    },
  },
  methods: {
    submit() {
      this.visible = true;
      this.$store
        .dispatch("Item/updateItem", this.Item)
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
