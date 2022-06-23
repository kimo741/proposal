<template>
  <div v-if="!loading" class="dinamic-card">
    <div
      class="full-width bg-white"
      :class="[
        'dc',
        `dc-${dc_size}`,
        `dc-${dc_border}`,
        `dc-${dc_color}`,
        `dc-${dc_frame}`,
        `dc-${dc_hover}`,
      ]"
    >
      <slot name="title"> </slot>
      <!-- upper image card -->
      <slot v-if="up_imagesrc" name="image-up"
        ><div class="image-container">
          <q-img class="image-src" :src="up_imagesrc" />
        </div>
      </slot>
      <!-- content -->
      <slot name="content"></slot>
      <!-- last  image card  -->
      <slot v-if="imagesrc" name="image"
        ><div class="image-container">
          <q-img class="image-src" :src="imagesrc" />
        </div>
      </slot>
      <slot name="image"></slot>
      <slot name="button"></slot>
      <!--  -->
    </div>
  </div>
  <!-- skotlen loader  -->

  <div v-else>
    <q-card flat class="full-width">
      <q-skeleton class="full-width" height="50px" square />

      <q-card-section height="200px">
        <q-skeleton
          width="60%"
          height="30px"
          type="text"
          class="text-subtitle1"
        />
        <q-skeleton height="30px" type="text" class="text-subtitle1" />
        <q-skeleton
          width="80%"
          height="30px"
          type="text"
          class="text-caption"
        />
        <q-skeleton height="30px" type="text" class="text-subtitle1" />
        <q-skeleton
          width="40%"
          height="30px"
          type="text"
          class="text-subtitle1"
        />
        <q-skeleton
          width="100%"
          height="30px"
          type="text"
          class="text-caption"
        />
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
// --------------------------------------------------
/////////////////////////////////////////////////////
// size//+++++++++++
// md, sm, lg, xs//
/////////////////////////////////////////////////////
//border radio// +++++6++++++++++++++++++
// radio", "noradio", "shape", "shape-rev"
/////////////////////////////////////////////////////
// backfround+++++++++++++++++++++++++++++++++++
// gedient", "grey", "black", "white" , "animate"
/////////////////////////////////////////////////////
// frame++++++++++++++++++++++
// "shadow", "frame", "border"
// /////////////////////////////////////////////////
//hover++++++++++++++++++++++++
// zoom-out", "zoom-in", "trans" ,"shrink"
// /////////////////////////////////////////////////
// quasar class
// q-class = "class"
// /////////////////////////////////////////////////
// for image
// slot image and pind image-src
// --------------------------------------------------

export default {
  props: {
    dc_size: {
      type: String,
      require: false,
      default: "md",
      validator: function (value) {
        return ["md", "sm", "lg", "xs"].indexOf(value) !== -1;
      },
      class: {
        type: String,
        require: false,
        default: "default",
      },
    },
    dc_border: {
      type: String,
      require: false,
      default: "radio",
      validator: function (value) {
        return ["radio", "noradio", "shape", "shape-rev"].indexOf(value) !== -1;
      },
    },
    dc_color: {
      type: String,
      require: false,
      default: "white",
      validator: function (value) {
        return (
          ["gedient", "grey", "black", "white", "animate"].indexOf(value) !== -1
        );
      },
    },
    // butIcon: {
    //   type: String,
    //   require: false,
    //   default: "eva-save",
    // },
  },
  dc_frame: {
    type: String,
    require: false,
    default: "shadow",
    validator: function (value) {
      return ["shadow", "frame", "border", "flat"].indexOf(value) !== -1;
    },
  },
  dc_hover: {
    type: String,
    require: false,
    default: "trans",
    validator: function (value) {
      return ["zoom-out", "zoom-in", "shrink", "trans"].indexOf(value) !== -1;
    },
  },
  imagesrc: {
    type: String,
    require: false,
    default: null,
  },
  up_imagesrc: {
    type: String,
    require: false,
    default: null,
  },
  loading: {
    type: Boolean,
    require: false,
    default: false,
  },
};
</script>
<style lang="scss" scoped>
.dc {
  box-sizing: border-box;
  display: block;
  margin: 10px;
  text-align: center;
  //size//
  &-xs {
    width: 15%;
    padding: 8px;
  }
  &-sm {
    width: 25%;
    padding: 10px;
  }
  &-md {
    width: 50%;
    padding: 20px;
  }
  &-lg {
    width: 75%;
    padding: 20px;
  }
  &-xl {
    width: 100%;
    padding: 25px;
  }
  //border
  &-radio {
    border-radius: 20px !important;
  }
  &-noradio {
    border-radius: none;
  }
  &-frame {
    position: relative;
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: $grey-8;
      transform: translate(-50%, -50%) scale(1.02);
    }
  }
  &-frame {
    border: 2px black solid !important;
  }
  &-shape {
    clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
    overflow: visible !important;
    box-sizing: border-box;
    position: relative;
  }
  &-shape-rev {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 95%);
  }
  &-gedient {
    background-image: linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%);
  }
  &-grey {
    background-color: $blue-grey-2;
  }
  &-black {
    background-color: $blue-grey-10;
  }
  &-black {
    background-color: #fff;
  }
  &-shadow {
    box-shadow: 0px 20px 60px 0px rgb(11 34 56 / 10%);
  }
  &-border {
    border: 2px black solid !important;
  }
  &-zoom-out {
    &:hover {
      transform: scale(0.9);
    }
  }
  &-zoom-in {
    &:hover {
      transform: scale(1.03);
    }
  }
  &-animate {
    background: linear-gradient(-45deg, $grey-1, $grey-2, $grey-4, $grey-7);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
  }
  &-shrink {
    &:hover {
      animation: shrink 0.4s ease-in-out;
    }
  }
  &-trans {
    &:hover {
      opacity: 0.9;
    }
  }
  .image-container {
    position: relative;
    margin: 20px auto;
    width: 50%;
    border-radius: 10px;
    height: 50%;
    text-align: center;
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      top: 50%;
      left: 50%;
      z-index: 2;
      border-radius: 10px;
      transform: translate(-50%, -50%) scale(1.1);
      background: $grey-4;
    }
  }
  .image-src {
    margin: auto;
    width: 100%;
    height: 100%;
    z-index: 3;
    border-radius: 10px;
    &:hover {
      opacity: 0.9;
      animation: shrink 1s ease-in-out;
    }
  }
}
//animation
@keyframes shrink {
  0% {
    transform: scale(0.9.1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
// .but-container {
//   position: relative;
//   width: 100%;
//   &__but {
//     position: absolute;
//     top: 50%;
//     left: 70%;
//     transform: translate(-50%, -50%);
//   }
// }
</style>

