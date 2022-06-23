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
              v-model="employee.name"
              :rules="[
                (val) =>
                  (val && val.length > 3) || ' Please type the employee name',
              ]"
              dense
              label="Employee Firsrt *"
              lazy-rules
            />
          </div>
          <q-space />

          <!-- @input="editEmal" -->
          <div class="col-12 q-my-lg">
            <q-input
              v-model="employee.job_title"
              :rules="[
                (val) => (val && val.length > 3) || 'Please type job title',
              ]"
              dense
              label="Job title *"
              lazy-rules
            />
          </div>
        </div>
        <q-space />
        <!-- @input="Editephone" -->
        <div class="q-my-lg">
          <q-input
            v-model="employee.month_salary"
            :rules="[
              (val) =>
                (val !== null && val !== '') || 'Please type Month Salary',
              (val) =>
                (val > 0 && val.length < 15) ||
                'Please type a real Month Salary',
            ]"
            dense
            hint=""
            label="Month Salary *"
            lazy-rules
            type="number"
          />
        </div>
        <div class="q-my-lg">
          <q-input
            v-model="employee.hour_cost"
            :rules="[
              (val) =>
                (val !== null && val !== '') || 'Please type cost per hour ',
              (val) =>
                (val > 0 && val.length < 15) ||
                'Please type a Please type cost per hour',
            ]"
            dense
            hint=""
            label="Cost per hour *"
            lazy-rules
            type="number"
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
      employee: {
        name: "",
        job_title: "",
        month_salary: "",
        hour_cost: "",
      },
    };
  },

  watch: {
    row(val) {
      if (val.id) {
        this.employee = val;
      } else {
        this.client = {
          name: "",
          job_title: "",
          month_salary: "",
          hour_cost: "",
        };
      }
    },
  },
  methods: {
    submit() {
      this.visible = true;
      this.$store
        .dispatch("Employee/updateEmployee", this.employee)
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
