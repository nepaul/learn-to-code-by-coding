import Vue from 'vue';
import BlurryImage from './components/BlurryImage.vue';

new Vue({
  el: '#app',
  render: function (createElement) {
    return createElement(BlurryImage, {
      props: {
        highResSrc: 'https://cdn-images-1.medium.com/max/1800/1*sg-uLNm73whmdOgKlrQdZA.jpeg',
        lowResSrc: 'https://cdn-images-1.medium.com/freeze/max/27/1*sg-uLNm73whmdOgKlrQdZA.jpeg?q=20'
      }
    })
  }
})
