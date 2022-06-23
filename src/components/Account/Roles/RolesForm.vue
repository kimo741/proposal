<template>
  <div class="form full-width text-center flex">
    <div class="q-pa-md full-width items-center" style="">
      <q-form
        class="q-gutter-md edit-width full-width"
        text-center
      >
        <q-input
          v-model="role.name"
          :rules="[
            (val) => (val && val.length > 3) || 'Please type Role Name',
          ]"
          dense
          label="Name *"
          lazy-rules
        />

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
export default {
  props: ['row'],
  mixins: [email],
  data() {
    return {
      role: {
        name: "",
      },
      isPwd: false,
    }
  },
  watch: {
    row (val) {
      console.log('watch')
      if (val.id) {
        this.role = val;
      } else {
        this.role = {
          name: "",
        }
      }
    }
  },
  methods: {
    async submit() {
      this.visible = true
      await this.$store.dispatch('Roles/addOrUpdateRole', this.role)
        .then( data  => {
          this.visible = false
          this.$store.commit('OPENE_FORM_DROWER')
          this.$q.notify('Data add successfully')
        })
        .catch( err => {
          this.error(err)
        })
    }
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
