<template>
  <div class="row q-mt-xl justify-center full-width full-height">
    <div class="col-4 q-pr-lg sm-scrren__title">
      <div
        class="text-h3 text-blue-grey-8 q-pa-0 personal_title sm-scrren__title_h3"
      >
        Rols Info
      </div>
    </div>
    <div class="col-12 col-md-7 q-pa-md">
      <dinamic-card>
        <template #content>
          <div>
            <div text-center class="q-gutter-md edit-width full-width">
              <div class="row full-width justify-between">
                <div class="col-12 col-sm-5 q-py-md select">
                  <q-select
                    outlined
                    v-model="role"
                    :options="roleInfo"
                    label="Roles"
                  />
                </div>
              </div>

              <q-inner-loading :showing="visible">
                <q-spinner-gears size="50px" color="primary" />
              </q-inner-loading>
            </div>
          </div>
        </template>
        <template #button>
          <div style="bottom: 15px">
            <q-separator class="q-mb-md" />
            <div align="end" class="q-px-lg q-gutter-x-md">
              <q-btn
                color="red"
                icon="eva-save-outline"
                label="save"
                @click="submit"
              />
            </div>
          </div>
        </template>
      </dinamic-card>
    </div>
  </div>
</template>
<script>
import dinamicCard from "../UI/dinamic-card.vue";

export default {
  components: { dinamicCard },
  computed: {
    roleInfo() {
      return this.$store.getters["Roles/role"];
    },
  },
  data() {
    return {
      loading: false,
      role: "",
    };
  },
  methods: {
    async submit() {
      this.visible = true;
      await this.$store
        .dispatch("addOrUpdateRole", this.role)
        .then((res) => {
          this.visible = true;
          this.$q.notify(`rols Of ${this.role.label} Is updated`);
        })
        .catch((err) => {
          this.$q.notify(err);
        });
    },
  },
  created() {
    this.$store.dispatch("Roles/getRolesList", "0");
    console.log(this.roleInfo);
  },
};
</script>
<style lang="scss" scoped></style>
