export const email = {
  data() {
    return {
      image: null,
      visible: false
    }
  },
  methods: {
    isValiedEmailAddress(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    success () {
      this.visible = false
      this.$store.commit('OPENE_FORM_DROWER')
      this.$q.notify('Data add successfully')
    },
    error(err) {
      this.visible = false
      const errors = {}
      if (err.response)
        Object.assign(errors, err.response.data)
      for (const err in errors) {
        this.$q.notify(errors[err][0])
      }
    }
  },

}
