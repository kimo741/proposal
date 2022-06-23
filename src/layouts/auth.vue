
<template>
  <q-layout view="hHh lpR fFf">

    <q-page-container
    class="q-ma-auto full-height "
    style="height : 100vh !important "
    >
    <router-view />
    </q-page-container>

  </q-layout>
</template>
<script>
export default{
  data(){
    return{
      showPassword:'',
      accept:'',
      form:{
        user:'',
        password:'',
      },
    }
  },
  methods:{
    onSubmit(){

    },
    onReset(){

    }
  }
}
</script>
<style lang="scss">

</style>
