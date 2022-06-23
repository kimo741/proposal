<template>
  <div class="form full-width text-center flex">
    <div class="q-pa-md full-width items-center" style="">
      <q-form
        class="q-gutter-md edit-width full-width"
        text-center
      >
        <q-input
          v-model="user.first_name"
          :rules="[
            (val) => (val && val.length > 3) || 'Please type your First name',
          ]"
          dense
          label="Firsrt Name *"
          lazy-rules
        />
        <q-input
          v-model="user.last_name"
          :rules="[
            (val) => (val && val.length > 3) || 'Please type your Last Name',
          ]"
          dense
          label="Last Name *"
          lazy-rules
        />
        <q-input
          v-model="user.email"
          :rules="[
            (val) =>
              isValiedEmailAddress(val) || 'Please type your Email Adreerss',
          ]"
          dense
          label="Email Adrress"
          lazy-rules
          type="email"
        />
        <q-input
          v-model="user.password"
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
        <q-input
          v-model="user.phone"
          :rules="[
            (val) =>
              (val !== null && val !== '') || 'Please type your Phone Number',
            (val) =>
              (val > 0 && val.length < 15) || 'Please type a real Phone Number',
          ]"
          dense
          hint=""
          label="Your Phone Number *"
          lazy-rules
          type="phone"
        />
        <div class="row justify-center">
          <UploadImage :imgSrc="user.image" title="Banner Image" style="width: 50% !important;" @uploadFile="val => {image = val} "/>
        </div>

            <div style="bottom: 15px" class="fixed-bottom">
              <q-separator class="q-mb-md"/>
                <div align="end" class="q-px-lg q-gutter-x-md">
                  <q-btn color="red" label="cancel" outline @click="$store.state.global.formDrawerOpen = false" />
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
import {email} from "src/Mixins/EmailVildate";
import UploadImage from "components/UI/more-info/upload-image";

export default {
  props: ['row'],
  components: {UploadImage},
  mixins: [email],
  data() {
    return {
      user: {
        first_name: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        phone: "",
        image: "",
      },
      isPwd: false,
    }
  },
  watch: {
    row (val) {
      if (val.id) {
        this.user = val;
      } else {
        this.user = {
            first_name: "",
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            phone: "",
            image: "",
          }
      }
    }
  },
  methods: {
    changeImag(val) {
      if (val.type) {
        var imgData = new FileReader();
        imgData.readAsDataURL(val);
        imgData.onload = e => {
          this.user.image = e.target.result;
        };
      }
    },
    async submit() {
      this.visible = true
      const form = new FormData()
      form.append('first_name', this.user.first_name )
      form.append('last_name', this.user.last_name )
      form.append('email', this.user.email )
      form.append('password', this.user.password )
      form.append('phone', this.user.phone )
      form.append('image', this.image )
      if (this.user.id)
        form.append('id', this.user.id )
      await this.$store.dispatch('User/addOrUpdateUser', form)
        .then( data  => {
          this.visible = false
          this.$store.commit('OPENE_FORM_DROWER')
          this.$q.notify('Data add successfully')
        })
        .catch( err => {
          this.error(err)
        })
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
  width: 80% !important;
  margin: auto !important;
}
</style>
