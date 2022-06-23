<template>
  <div>
    <q-btn
      class="blob-btn"
      :class="['ve-btn', `ve-btn-${color}`, `ve-${size}`, `ve-${unround}`]"
      @click="$emit('click')"
      :flat="flat"
      :round="round"
      :rounded="rounded"
      :dense="dense"
      :ripple="ripple"
      :to="to"
      :q-color="color"
      :type="type"
    >
      <slot> </slot>
      <span class="blob-btn__inner">
        <span class="blob-btn__blobs">
          <span class="blob-btn__blob"></span>
          <span class="blob-btn__blob"></span>
          <span class="blob-btn__blob"></span>
          <span class="blob-btn__blob"></span>
        </span>
      </span>
    </q-btn>
    <br />

    <svg id="fix" xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs>
        <filter id="goo">
          <feGaussianBlur
            in="SourceGraphic"
            result="blur"
            stdDeviation="10"
          ></feGaussianBlur>
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7"
            result="goo"
          ></feColorMatrix>
          <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
        </filter>
      </defs>
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      require: false,
      default: "button",
      validator: function (value) {
        return ["button", "submit"].indexOf(value) !== -1;
      },
    },
    color: {
      type: String,
      require: false,
      default: "primary",
      validator: function (value) {
        return ["primary", "black", "error"].indexOf(value) !== -1;
      },
    },
    unround: {
      type: String,
      require: false,
      default: "unround",
      validator: function (value) {
        return ["unround"].indexOf(value) !== -1;
      },
    },
    size: {
      type: String,
      require: false,
      default: "sm",
      validator: function (value) {
        return ["sm", "md", "lg"].indexOf(value) !== -1;
      },
    },
    disabled: {
      type: Boolean,
      require: false,
      default: false,
    },
    loading: {
      type: Boolean,
      require: false,
      default: false,
    },
    rounded: {
      type: Boolean,
      require: false,
      default: true,
    },
    flat: {
      type: Boolean,
      require: false,
      default: true,
    },
    round: {
      type: Boolean,
      require: false,
      default: true,
    },
    dense: {
      type: Boolean,
      require: false,
      default: true,
    },
    ripple: {
      type: Boolean,
      require: false,
      default: true,
    },
    to: {
      type: String,
      require: false,
      default: "",
    },
  },
};
</script>
<style lang="scss" scoped>
.ve-sm {
  font-size: 11px !important;
  padding: 5px !important;
  width: auto;
  height: auto;
  font-weight: bolder !important;
}
.ve-md {
  font-size: 15px !important;
  padding: 7px !important;
  width: auto;
  height: auto;
  font-weight: bolder !important;
}
.ve-lg {
  font-size: 15px !important;
  padding: 10px !important;
  width: auto;
  height: auto;
  font-weight: bolder !important;
}
.buttons {
  // margin-top: 50px;
  width: 100%;
  height: max-content;
  text-align: center;
  border-radius: 30px;
}

$cyan: #000;
$dark: #ffffff;
$borderW: 2px;

.blob-btn {
  $numOfBlobs: 4;
  z-index: 1;
  position: relative;
  padding: 20px 46px;
  margin-bottom: 30px;
  text-align: center;
  text-transform: uppercase;
  color: $primary;
  font-size: 16px;
  font-weight: bold;
  background-color: transparent;
  outline: none;
  border: none;
  transition: color 0.5s;
  cursor: pointer;
  border-radius: 30px;

  &:before {
    content: "";
    z-index: 1;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border: $borderW solid $primary;
    border-radius: 30px;
  }

  &:after {
    content: "";
    z-index: -2;
    position: absolute;
    left: $borderW * 1.5;
    top: $borderW * 1.5;
    width: 100%;
    height: 100%;

    transition: all 0.3s 0.2s;
    border-radius: 30px;
  }

  &:hover {
    color: $dark;
    border-radius: 30px;

    &:after {
      transition: all 0.3s;
      left: 0;
      top: 0;
      border-radius: 30px;
    }
  }

  &__inner {
    z-index: -1;
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 30px;
    background: #ffffff;
  }

  // additional container created, because in FF blobs are breaking overflow:hidden of element with svg gooey filter
  &__blobs {
    position: relative;
    display: block;
    height: 100%;
    filter: url("#goo");
  }

  &__blob {
    position: absolute;
    top: $borderW;
    width: 100% / $numOfBlobs;
    height: 100%;
    background: $primary;
    border-radius: 100%;
    transform: translate3d(0, 150%, 0) scale(1.7);
    transition: transform 0.45s;

    @supports (filter: url("#goo")) {
      transform: translate3d(0, 150%, 0) scale(1.4);
    }

    @for $i from 1 through $numOfBlobs {
      &:nth-child(#{$i}) {
        left: ($i - 1) * (120% / $numOfBlobs);
        transition-delay: ($i - 1) * 0.08s;
      }
    }

    .blob-btn:hover & {
      transform: translateZ(0) scale(1.7);

      @supports (filter: url("#goo")) {
        transform: translateZ(0) scale(1.4);
      }
    }
  }
}
#fix {
  position: fixed;
}
.sec {
  $second: #ffffff;
  color: black;
  background: aqua;
  .blob-btn__inner {
    .blob-btn__blobs {
      .blob-btn__blob {
        background: red;
      }
    }
  }

  &:hover {
    color: aqua;
  }
  &::before {
    border: $borderW solid red;
  }
}

.ve-btn {
  .disabledd & {
    opacity: 0.5;
    cursor: not-allowed;
  }
  // &:hover {
  //   opacity: 0.5;
  // }
  &-primary {
    color: $primary;
    background: black;
    .blob-btn__inner {
      .blob-btn__blobs {
        .blob-btn__blob {
          background: $primary;
        }
      }
    }

    &:hover {
      color: white;
    }
    &::before {
      border: $borderW solid $primary;
    }
  }
  &-black {
    color: $blue-grey-10;
    font-weight: bolder;
    background: white;
    .blob-btn__inner {
      .blob-btn__blobs {
        .blob-btn__blob {
          background: $blue-grey-10;
        }
      }
    }

    &:hover {
      color: white;
    }
    &::before {
      border: 3px solid $blue-grey-10;
    }
  }
  &-error {
    color: red;
    background: $primary;
    .blob-btn__inner {
      .blob-btn__blobs {
        .blob-btn__blob {
          background: red;
        }
      }
    }

    &:hover {
      color: black;
    }
    &::before {
      border: $borderW solid red;
    }
  }
}
.btn-unround {
  .blob-btn {
    border-radius: none !important;
    &::before {
      border-radius: none !important;
    }
    &::after {
      border-radius: none !important;
    }
    &__inner {
      border-radius: 0 !important;
    }
  }
}
.blob-btn:active {
  transform: scale(0.9);
}
.blob-btn {
  @media (max-width: $breakpoint-xs-max) {
    font-size: 15px !important;
    padding: 5px !important;
    font-weight: bold !important;
  }
}
</style>
