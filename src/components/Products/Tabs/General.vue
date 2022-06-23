<template>
  <div>
    <div class="text-h6">Basic information</div>
    <!-- Product Name -->
    <div class="text-subtitle1 text-grey-6 q-mt-lg q-mb-md">
      Product Name <MoreInfo :text="name_mssg" ></MoreInfo>
    </div>
    <div class="row ">
      <q-input
        v-model="text"
        class="col-12 col-md-6 q-pr-sm-none q-pr-md"
        dense
        autogrow
        clearable
        clear-icon="close"
        label="Name ar *"
        lazy-rules
      />

      <q-input
        v-model="text"
        class="col-12 col-md-6 q-pl-sm-none q-pl-md"
        dense
        autogrow
        clearable
        clear-icon="close"
        label="Name ar *"
        lazy-rules
      />
    </div>

    <q-separator class="q-mt-xl q-mb-lg" />

    <!-- Product Description -->
    <div class="text-subtitle1 text-grey-6 q-mb-lg">
      Product Description <MoreInfo :text="desc_mssg" ></MoreInfo>
    </div>
    <q-editor v-model="desc_ar" class="full-width q-mb-lg" placeholder="Description Arabic" min-height="7rem" />

    <q-editor v-model="desc_en" class="full-width" placeholder="Description English" min-height="7rem" />

    <q-separator class="q-mt-xl q-mb-lg" />
    <!-- Product Description -->
    <div class="text-subtitle1 text-grey-6 q-mb-lg">
      More Information
    </div>
    <div class="row justify-around" >

      <div class="col-12 col-md-4">
        <UploadImage title="Hover Image" />
      </div>

      <div class="col-12 col-md-4">
        <UploadImage title="Banner Image" />
      </div>
    </div>
  </div>
</template>

<script>
import MoreInfo from "components/UI/more-info/more-info";
import UploadImage from "components/UI/more-info/upload-image";

export default {
  components: {
    MoreInfo,
    UploadImage,
  },
  data () {
    return {
      text: '',
      name_mssg: 'You must add the product name in both Arabic and English and we will display the product name in the language of the customer\'s browser',
      desc_mssg: 'You must add the product Description in both Arabic and English and we will display the product Description in the language of the customer\'s browser',
      imageHint: 'Set the product hover image. Only *.png, *.jpg and *.jpeg image files are accepted',
      desc_ar: '',
      desc_en: '',
    }
  }
}
</script>
