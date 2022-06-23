<template>
  <q-page class="flex flex-center login-page">
    <!--    forgetpassword-->

    <q-dialog v-model="popUpForget">
      <q-card class="popup-edit">
        <q-card-section align="center">
          <forgetPassword @closeForget="popUpForget = false"/>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!--    forgeypasswod -->
    <div>
      <div class="text-h1 text-center">
        <q-img src="logo/logo-black.png"/>
      </div>

      <div class="q-pa-lg box">
        <q-form
          class=" "
          style="min-width: 400px"
          @reset="onReset"
          @submit="onSubmit"
        >
          <q-input
            v-model="form.user"
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
            dense
            hint="Name and surname"
            label="User name *"
            lazy-rules
          />
          <q-input
            v-model="form.password"
            :rules="[
              (val) =>
              (val !== null && val !== '') || 'Please type your Password',
              ]"
            :type="isPwd ? 'password' : 'text'"
            dense
            label="Passwword *"
            lazy-rules
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <div>
            <q-btn color="primary" label="Submit" type="submit"/>
          </div>
          <div>
            <text-caption
              class="text-blue-5 cursor-pointer q-mt-lg"
              @click="popUpForget = true"
            >
              forget password ?
            </text-caption>
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>
<script>
import {email} from "src/Mixins/EmailVildate";
import ForgetPassword from "components/Account/Users/forget-password";

export default {
  components: {ForgetPassword},
  mixins: [email],
  data() {
    return {
      popUpForget: false,
      isPwd: true,
      tab: "Admin",
      showPassword: "",
      form: {
        user: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit() {
      this.visible = true;
      if (this.tab == "Admin") {
        this.$store.dispatch("auth/AdminLogin", this.form);
      } else {
        this.$store
          .dispatch("auth/AdminLogin", this.form)
          .then((res) => {
            this.visible = false;
            this.$q.notify("Login successfully");
          })
          .catch((err) => {
            this.error(err);
          });
      }
    },
    onReset() {
      this.form = {
        user: null,
        password: null,
      };
    },
  },
  // components: { ButtonAnimat }
};
</script>
<style lang="scss">
.login-page {
  background: $mainBackground;

  .box {
    box-shadow: 0px 20px 60px 0px rgb(11 34 56 / 10%);
    border-radius: 20px;
  }
}

.popup-edit {
  width: 50% !important;
  border-radius: 20px !important;
  @media (max-width: $breakpoint-sm-max) {
    width: 90% !important;
  }
}
</style>
