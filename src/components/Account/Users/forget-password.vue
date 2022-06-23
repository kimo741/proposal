<template>
  <div class="q-pa-md full-width items-center forget-edit">
    <q-form
      class="q-gutter-md  full-width"
      text-center
    >
    <div class="col-10 ">
      <q-input
        v-model="oldPassword"
        :type="isPwd_old ? 'password' : 'text'"
        dense
        label="Type Your Old Password *"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== '') || 'Please type your Password',
        ]"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd_old ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd_old = !isPwd_old"
          />
        </template>
      </q-input>
    </div>
    <div class="col-10">
      <q-input
        v-model="newPassword_1"
        :type="isPwd_new_1 ? 'password' : 'text'"
        dense
        label="Type Your Old Password *"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== '') || 'Please type your Password',
        ]"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd_new_1 ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd_new_1 = !isPwd_new_1"
          />
        </template>
      </q-input>
    </div>
    <div class="col-10">
      <q-input
        v-model="newPassword_2"
        :type="isPwd_new_2 ? 'password' : 'text'"
        dense
        label="Type Your Old Password *"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== '') || 'Please type your Password',
        ]"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd_new_2 ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd_new_2 = !isPwd_new_2"
          />
        </template>
      </q-input>
    </div>
    <div
      style="bottom: 15px"
      class=""
    >
      <div
        align="end"
        class="q-px-lg q-gutter-x-md"
      >
        <q-btn
          color="red"
          label="cancel"
          outline
          @click="$emit('closeForget')"
        />
        <q-btn
          color="secondary"
          label="save"
          @click="submit"
        />
      </div>
    </div>
    </q-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      oldPassword: "",
      newPassword_1: "",
      newPassword_2: "",

      isPwd_old: true,
      isPwd_new_1: true,
      isPwd_new_2: true,
    };
  },
  methods: {
    submit() {},
  },
};
</script>
<style lang="scss" scoped>
.forget-edit {
}
</style>
