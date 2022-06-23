<template>
  <div class="row q-mt-xl justify-center full-width full-height">
    <div class="col-sm-4 col-12 q-pr-lg sm-scrren__title">
      <div
        class="text-h3 text-blue-grey-8 q-pa-0 personal_title sm-scrren__title_h3"
      >
        Permetions Informaton
      </div>
    </div>
    <div class="col-12 col-sm-7 q-pa-md">
      <dinamic-card>
        <template #content>
          <div class="row">
            <div text-center class="col-6 q-gutter-md edit-width full-width">
              <!-- {{ list }} -->
              <div class="row full-width justify-between">
                <div class="col-12 col-sm-6 q-py-md select">
                  <q-select
                    outlined
                    v-model="permetion"
                    :options="list"
                    label="Type"
                  />
                </div>
                <q-inner-loading :showing="visible">
                  <q-spinner-gears size="50px" color="primary" />
                </q-inner-loading>

                <div class="col-12 col-sm-6">
                  {{ lists }}
                  <div v-for="(list, i) in lists" :key="i" class="row">
                    <div class="col-6 text-h4">{{ list.label }}</div>
                    <div class="col-6">
                      <div class="q-pa-md">
                        <div class="q-gutter-sm">
                          <q-checkbox
                            :v-model="list"
                            color="secondary"
                            true-value="yes"
                            false-value="no"
                          />
                        </div>

                        <div class="q-px-sm">
                          <strong>your status : {{ customModel }}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>

        <template #button>
          <!-- <div class="but-container">
            <q-btn
              class="but-container__but"
              color="red"
              size="20px"
              icon="eva-save-outline"
              @click="butsave"
            />
          </div> -->
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
import DinamicCard from "../UI/dinamic-card.vue";
import { email } from "src/Mixins/EmailVildate";
export default {
  components: { DinamicCard },
  mixins: [email],
  data() {
    return {
      loading: false,
      typeOption: [
        { label: "permetion-1", value: "permetion-1" },
        { label: "permetion-2", value: "permetion-2" },
      ],
      permetion: "",
      customModel: "",
    };
  },
  computed: {
    lists() {
      return this.$store.getters["Permissions/listOfPermissions"];
    },
  },
  methods: {
    async submit() {
      this.visible = true;
      await this.$store
        .dispatch("User/getAssgendPermissions", this.permetion.value)
        .then((res) => {
          this.visible = false;
          this.changeToEdite = false;
        })
        .catch((err) => {
          this.visible = false;
        });
    },
  },
  created() {
    this.$store.dispatch("Permissions/getPermissionsList", "0");
  },
};
</script>
<style lang="scss">
.but-container {
  overflow: visible;
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100px;
  &__but {
    position: absolute;
    z-index: 20000;
    top: 50%;
    left: 80%;
    // transform: translate(-50%, -50%);
  }
}
</style>
