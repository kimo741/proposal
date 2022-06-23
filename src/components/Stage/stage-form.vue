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
              v-model="stage.name"
              :rules="[
                (val) =>
                  (val && val.length > 3) || ' Please type the Stage name',
              ]"
              dense
              label="Stage Name *"
              lazy-rules
            />
          </div>
          <q-space />

          <!-- @input="editEmal" -->
          <div class="col-12 q-my-lg">
            <q-input
              v-model="stage.description"
              type="textarea"
              lazy-rules
              label="Description Of Stage"
              filled
              hide-bottom-space
              :rules="[
                (val) =>
                  (val && val.length > 5) || ' Please type the Stage Description ',
              ]"
            />
            <!-- bg-color="grey-2" -->
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
      stage: {
        name: "",
        description: "",
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
        };
      }
    },
  },
  methods: {
    submit() {
      this.visible = true;
      this.$store
        .dispatch("Stage/updatStage", this.stage)
        .then((res) => {
          console.log(res)
          this.visible = false;
          this.$q.notify("request submit is successful");
          this.$store.commit("OPENE_FORM_DROWER");
        })
        .catch((err) => {
          console.log(err)
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
