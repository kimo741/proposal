<template>
  <div class="col-12 col-md-3">
    <q-card  class="card-shadow col-12 col-md-3 " >
      <q-card-section class="q-pa-lg">
        <UploadImage title="humbnail Image" />
      </q-card-section>
    </q-card>

    <q-card  class="card-shadow q-mt-xl " >
      <q-card-section class="q-pa-lg">
        <div class="text-h6">Related Products</div>
        <q-select
          filled
          v-model="model"
          class="q-mt-lg"
          label="Simple select"
          :options="stringOptions"
          behavior="dialog"
        />
      </q-card-section>
    </q-card>

    <q-card  class="card-shadow q-mt-xl " >
      <q-card-section class="q-pa-lg">
        <div class="text-h6">Category</div>
        <q-select
          filled
          v-model="model"
          class="q-mt-lg"
          label="Simple select"
          :options="stringOptions"
          behavior="dialog"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import UploadImage from "components/UI/more-info/upload-image";
export default {
  components: {
    UploadImage,
  },
  data () {
    return {
      stringOptions : [],
      model: null
    }
  }
}
</script>
