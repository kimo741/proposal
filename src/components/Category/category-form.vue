<template>
  <div class="form full-width text-center flex">
    <div class="q-pa-md full-width items-center" style="">
      <q-form
        text-center
        @submit="submit"
        class="q-gutter-md edit-width full-width"
      >
        <div class="row">
          <q-input
            class="col-12 q-pb-lg"
            dense
            lazy-rules
            v-model="category.name"
            label="Category Name *"
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Please type your Category Name',
            ]"
          />
          <q-space />
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
      category: {
        name: "",
      },
    };
  },
  watch: {
    row(val) {
      if (val.id) {
        this.category = val;
      } else {
        this.category = {
          name: "",
        };
      }
    },
  },
  methods: {
    submit() {
      this.visible = true;
      this.$q.notify("Category Is Updated");
      this.$store
        .dispatch("Cat/addOrUpdateCat", { name: this.category.name })
        .then((res) => {
          this.visible = false;
          this.$q.notify("Category Is Updated");
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
