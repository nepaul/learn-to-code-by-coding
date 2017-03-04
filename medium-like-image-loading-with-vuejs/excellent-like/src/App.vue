<template>
  <transition-group name="blur" tag="div">
    <div v-show="currentSrc === null" class="placeholder blur-transition" key="placeholder"></div>
    <canvas v-show="currentSrc === lowResSrc" height="17" width="27" key="canvas" class="blur-transition"></canvas>
    <img v-show="currentSrc === highResSrc" :src="highResSrc" key="image" class="blur-transition"></img>
  </transition-group>
</template>

<style scoped>
  img canvas .placeholder {
    height: 600px;
    width: 900px;
    position: absolute;
  }
  .placeholder {
    background-color: rgba(0, 0, 0, .05);
  }
  canvas {
    filter: blure(10px);
  }
  .blur-transition {
    transition: opacity linear .4s 0s;
    opacity: 1;
  }
  .blure-enter .blure-leave {
    opacity: 0;
  }
</style>

<script>
  export default {
    props: [
      'highResSrc',
      'lowResSrc',
    ],
    data: function () {
      return {
        currentSrc: null
      };
    },
    mounted: function () {
      var lowResImg = new Image();
      var highResImg = new Image();
      var context = this.$el.getElementsByTagName('canvas')[0].getContext('2d');
      var that = this;

      lowResImg.onload = function () {
        context.drawImage(lowResImg, 0, 0);
        that.currentSrc = that.lowResSrc;
      }
      highResImg.onload = function () {
        that.currentSrc = that.highResSrc;
      }
      lowResImg.src = that.lowResSrc;
      highResImg.src = that.highResSrc;
    }
  }
</script>
