<template>
  <div class="row q-mt-xl justify-center full-width full-height">
    <div class="col-4 q-pr-lg sm-scrren__title">
      <div
        class="text-h3 text-blue-grey-8 q-pa-0 personal_title sm-scrren__title_h3"
      >
        Personal Informaton
      </div>
    </div>
    <div class="col-12 col-md-7 q-pa-md">
      <!-- q-mx-auto form_info -->
      <dinamic-card>
        <template #content>
          <q-form class="q-gutter-md edit-width full-width" text-center>
            <q-input
              v-model="usersData.first_name"
              @input="editeFirstN"
              :rules="[
                (val) =>
                  (val && val.length > 3) || 'Please type your First name',
              ]"
              dense
              label="Firsrt Name *"
              lazy-rules
            />

            <q-input
              v-model="usersData.last_name"
              @input="editeLasttN"
              :rules="[
                (val) =>
                  (val && val.length > 3) || 'Please type your Last Name',
              ]"
              dense
              label="Last Name *"
              lazy-rules
            />
            <q-input
              v-model="usersData.email"
              @input="editEmal"
              :rules="[
                (val) =>
                  isValiedEmailAddress(val) ||
                  'Please type your Email Adreerss',
              ]"
              dense
              label="Email Adrress"
              lazy-rules
              type="email"
            />
            <q-input
              v-model="usersData.phone"
              @input="Editephone"
              :rules="[
                (val) =>
                  (val !== null && val !== '') ||
                  'Please type your Phone Number',
                (val) =>
                  (val > 0 && val.length < 15) ||
                  'Please type a real Phone Number',
              ]"
              dense
              hint=""
              label="Your Phone Number *"
              lazy-rules
              type="phone"
            />
            <q-inner-loading :showing="visible">
              <q-spinner-gears size="50px" color="primary" />
            </q-inner-loading>
          </q-form>
        </template>
        <template #image>
          <div class="image-upload">
            <UploadImage @uploadFile="uploadFile" :src="formEdit.image" />
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
                @click="dialog = true"
              />
              <!-- check password -->

              <q-dialog v-model="dialog">
                <q-card
                  class="popup-edit"
                  :class="faildPassword ? 'faild-pass' : ''"
                >
                  <q-card-section align="center">
                    <div class="text-h4 text-grey-8">type your password</div>
                    <q-input
                      v-model="password"
                      :rules="[
                        (val) =>
                          (val !== null && val !== '') ||
                          'Please type your Password to edit our information ',
                      ]"
                      type="password"
                      dense
                      label="type password to edite passwword *"
                      lazy-rules
                    >
                    </q-input>
                  </q-card-section>
                  <q-card-actions align="center">
                    <q-btn
                      flat
                      label="Cancel"
                      color="red"
                      v-close-popup
                      @click="dialog = false"
                    />
                    <q-btn
                      flat
                      label="Change My Info"
                      color="primary"
                      @click="submit"
                    />
                  </q-card-actions>
                </q-card>
              </q-dialog>
              <!-- @click="submit" -->
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
import UploadImage from "../UI/more-info/upload-image.vue";
export default {
  mixins: [email],
  components: { DinamicCard, UploadImage },
  data() {
    return {
      faildPassword: false,
      dialog: false,
      cancelEnabled: false,
      adaddad: "",
      loading: false,
      password: "",
      formEdit: {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        image: "",
      },
    };
  },

  computed: {
    usersData() {
      return this.$store.getters["User/user"];
    },
    // checkPssword() {
    //   return this.$store.getters["User/user"];
    // },
  },
  created() {
    this.$store.dispatch("User/getUser", "1");
    console.log(this.usersData);
  },
  methods: {
    editeFirstN(e) {
      this.changeToEdite = true;
      this.formEdit.first_name = e;
    },
    editeLasttN(e) {
      this.formEdit.last_name = e;
    },
    editEmal(e) {
      this.formEdit.email = e;
    },
    Editephone(e) {
      this.formEdit.phone = e;
    },
    correctPassword() {
      this.$store
        .dispatch("User/addOrUpdateUser", this.formEdit)
        .then((res) => {
          this.visible = false;
          this.faildPassword = false;
        })
        .catch((err) => {
          this.visible = false;
          this.faildPassword = false;
        });
    },
    uncorrectPassword() {
      this.faildPassword = true;
      this.visible = false;
      this.dialog = true;
      setTimeout(() => {
        this.faildPassword = false;
      }, 2000);
    },

    async submit() {
      this.visible = true;
      await this.$store
        .dispatch("User/CheckPassword", this.password)
        .then((res) => {
          if (res.status === 200) {
            this.$q.notify(this.res.message);
            this.correctPassword();
          } else {
            this.$q.notify(this.res.message);
            this.uncorrectPassword();
          }
        })
        .catch((err) => {
          this.visible = false;
          console.log(err);
        });
    },
    uploadFile(e) {
      this.image = e;
    },
  },
};
</script>
<style lang="scss">
.form_info {
  // background-color: $grey-5;
  padding: 30px 10px;
  border-radius: 20px;
}
.personal_title {
  display: block;
  margin: auto;
  margin-top: 20px;
}
.popup-edit {
  width: 50% !important;
  border-radius: 20px !important;
  @media (max-width: $breakpoint-sm-max) {
    width: 90% !important;
  }
}
.faild-pass {
  animation-name: shake;
  animation-duration: 0.7s, 0.35s;
  animation-iteration-count: 1, 2;
  border: 2px solid red;
}
@keyframes shake {
  0%,
  20%,
  40%,
  60%,
  80% {
    transform: translateX(8px);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(-8px);
  }
}
.image-upload {
  @media (max-width: $breakpoint-sm-max) {
    width: 100% !important;
  }
  width: 50%;
  margin: auto;
}
</style>
