<template>
  <div class="row">

    <div class="text-h6">Product Colors <MoreInfo :text="name_mssg" ></MoreInfo></div>
    <q-space />
    <ButtonAnimat size="lg" color="black" rounded @click="addColor">
      <q-icon name="add" />
      <q-tooltip content-class="bg-black text-white" v-if="!$q.screen.lt.md" class="bg-red-5 text-black">
        Add New Color
      </q-tooltip>
    </ButtonAnimat>

    <transition-group
      appear
      enter-active-class="animated slideInDown"
      leave-active-class="animated fadeOut"
      class="col-12 bg-transparent q-mb-lg">

      <q-card v-for="(color, i) in colors" :key="i" class="card-shadow q-mb-lg" >

        <q-btn
          v-if="i > 0"
          @click="removeColor(i)"
          round
          flat
          text-color="red"
          class=" color-action z-max q-pa-sm"
          size="sm"
          icon="eva-trash-2-outline" />
        <q-card-section class="row ">

          <div class="col-12 col-md-6 q-pa-md" >
            <q-input
              v-model="color.name"
              class="col-12 col-md-6 q-pr-sm-none q-pr-md"
              dense
              autogrow
              clearable
              clear-icon="close"
              label="Name ar *"
              lazy-rules
            />
          </div>

          <div class="col-12 col-md-6 q-pa-md" >
            <q-input
              v-model="color.code"
              class="col-12 col-md-6 q-pr-sm-none q-pr-md"
              dense
              autogrow
              clearable
              clear-icon="close"
              label="Name ar *"
              lazy-rules
            />
          </div>
        </q-card-section>

        <q-card-section class="row q-pt-none">
          <div class="col-12 col-md-6 q-pa-md" >
            <q-input
              v-model="color.quantity"
              class="col-12 col-md-6 q-pr-sm-none q-pr-md"
              dense
              autogrow
              clearable
              clear-icon="close"
              label="Name ar *"
              lazy-rules
            />
          </div>

          <div class="col-12 col-md-6 q-pa-md" >
            <q-input
              v-model="color.price"
              class="col-12 col-md-6 q-pr-sm-none q-pr-md"
              dense
              autogrow
              clearable
              clear-icon="close"
              label="Name ar *"
              lazy-rules
            />
          </div>
        </q-card-section>

      </q-card>
    </transition-group>
  </div>
</template>

<script>
import ButtonAnimat from "components/UI/button-animat";
import MoreInfo from "components/UI/more-info/more-info";
import UploadImage from "components/UI/more-info/upload-image";

export default {
  components: {
    ButtonAnimat,
    MoreInfo,
    // UploadImage
  },
  data () {
    return {
      colors: [
        {
          name: '',
          code: '',
          quantity: 0,
          price: 0,
          imgs: []
        }
      ],
      colorsForImgs: [{
        imgs: []
      }],
      text: '',
      name_mssg: ''
    }
  },
  methods: {
    addColor () {
      this.colors.push({
        name: '',
        code: '',
        quantity: 0,
        price: 0,
        imgs: []
      })
      this.colorsForImgs.push({
        imgs: []
      })
    },
    removeColor (i) {
      this.colors.splice(i, 1);
      this.colorsForImgs.splice(i, 1);
    },
    multipleImgs(i, files){
      this.colorsForImgs[i].imgs = files
      console.log(i, files, this.colorsForImgs)
    }
  },
  created() {
  }
}
</script>

<style lang="scss" scoped>
.color-action {
  position: absolute;
  right: 10px;
  cursor: pointer;
  top: 10px
}
.add-new-img {
  min-height: 108.4px;
  background: #eceff1;
  cursor: pointer;
}
.img-action {
  position: absolute;
  right: 28px;
  top: 40px
}
</style>
