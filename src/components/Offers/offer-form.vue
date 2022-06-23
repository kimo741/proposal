<template>
  <div class="form full-width text-center flex">
    <div class="q-pa-md full-width items-center" style="">
      <q-form
        text-center
        @submit="submit"
        class="q-gutter-md edit-width full-width"
      >
        <div class="row full-width justify-between">
          <q-input
            class="col-12 col-sm-5 q-pb-md q-py-md"
            dense
            lazy-rules
            v-model="addOffers.name.ar"
            label="Offer name arabic *"
          />
          <q-space />
          <q-input
            class="col-12 col-sm-5 q-py-md"
            dense
            lazy-rules
            v-model="addOffers.name.en"
            label="Offer name english *"
          />
        </div>
        <q-space />

        <div class="row full-width justify-between">
          <q-input
            class="col-12 col-sm-5 q-py-md"
            dense
            lazy-rules
            v-model="addOffers.code"
            label="Code *"
          />
          <q-input
            class="col-12 col-sm-5 q-py-md"
            dense
            lazy-rules
            v-model.number="addOffers.cost"
            type="number"
            label="Cost *"
          />
        </div>
        <div class="row full-width justify-between">
          <div class="col-12 col-sm-5 q-py-md select">
            <q-select
              outlined
              v-model="addOffers.type"
              :options="optionTibe"
              label="Type"
            />
          </div>
          <!-- <q-input
            class="col-12 col-sm-5 q-py-md"
            dense
            lazy-rules
            v-model="addOffers.type"
            label="Type *"
          /> -->
          <q-input
            class="col-12 col-sm-5 q-py-md"
            dense
            lazy-rules
            v-model.number="addOffers.numberOfusers"
            type="number"
            label="Number Of users *"
          />
        </div>
        <div class="row full-width justify-between">
          <q-input
            class="col-12 col-sm-5 q-py-md"
            dense
            lazy-rules
            v-model="addOffers.capacity"
            label="Capacity *"
          />
          <div class="col-12 col-sm-5 q-py-md">
            <div class="">
              <q-input dense lazy-rules v-model="addOffers.end_date">
                <template v-slot:prepend>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        v-model="addOffers.end_date"
                        mask="YYYY-MM-DD HH:mm"
                      >
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>

                <template v-slot:append>
                  <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-time
                        v-model="addOffers.end_date"
                        mask="YYYY-MM-DD HH:mm"
                        format24h
                        dense
                        lazy-rules
                      >
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            dense
                            lazy-rules
                            label="Close"
                            color="primary"
                          />
                        </div>
                      </q-time>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
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
      addOffers: {
        name: { ar: "", en: "" },
        code: "",
        cost: null,
        numberOfusers: null,
        type: "",
        //////////////////////////////////////////////////////////////////////////////////////////
        // capacity stay string for now but i will change it ti string in future 👈📌📌📌📌📌//
        //////////////////////////////////////////////////////////////////////////////////////////
        capacity: "",
        end_date: "",
      },
      optionTibe: [
        {
          label: "Offer",
          value: "offer",
        },
        {
          label: "CoPuon",
          value: "copuon",
        },
      ],
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
        this.addOffers = val;
      } else {
        this.addOffers = {
          name: { ar: "", en: "" },
          code: "",
          cost: null,
          numberOfusers: null,
          type: "",
          //////////////////////////////////////////////////////////////////////////////////////////
          // capacity stay string for now but i will change it ti string in future 👈📌📌📌📌📌//
          //////////////////////////////////////////////////////////////////////////////////////////
          capacity: "",
          end_date: null,
        };
      }
    },
  },
  methods: {
    submit() {
      this.visible = true;
      console.log(this.addOffers);
      const form = new FormData();
      form.append("name", JSON.stringify(this.addOffers.name));
      form.append("code", this.addOffers.code);
      form.append("cost", this.addOffers.cost);
      form.append("numberOfusers", this.addOffers.numberOfusers);
      form.append("type", this.addOffers.type.value);
      form.append("capacity", this.addOffers.capacity.toString());
      form.append("end_date", this.addOffers.end_date);
      // if (this.inventory.id) form.append("id", this.inventory.id);

      this.$store
        .dispatch("Offer/addOrUpdateOffer", form)
        .then((data) => {
          this.visible = false;
          this.$store.commit("OPENE_FORM_DROWER");
          this.$q.notify("Data add successfully");
        })
        .catch((err) => {
          this.error(err);
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
