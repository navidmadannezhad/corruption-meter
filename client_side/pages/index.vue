<template>
  <div class="main">
    <transition name="fade">
      <Fullscreen_loader v-if="page_is_loading" />
    </transition>

    <div class="sidebar" style="width: 25vw;">
      <p class="introduction">
          Corruption-Meter!
      </p>

      <transition name="fade">
        <Detail_modal :country_details="details" @close_modal="close_modal" v-if="rerender_key"/>
      </transition>

      <Records :countries="countries_cpi_data" v-if="countries_cpi_data"/>
    </div>

    <div id="map-wrap" style="height: 100vh; width: 75vw;">
      <client-only>
        <l-map :zoom=13 :center="[55.9464418,8.1277591]" :options="options" ref="map">

          <l-tile-layer style="opacity: 0.5;" url="https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibmF2aWRtbnpoMTExIiwiYSI6ImNsMTdsYTRsNzE1bHgzZGthMWppNTdscTkifQ.cimHgKp_fzMY5v5roiDaOA"></l-tile-layer>
          <l-geo-json :geojson="geojson" :options="geoJSON_options"></l-geo-json>

        </l-map>
      </client-only>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { fill_color } from "@/utils/style";
import { modified_geoJSON } from "@/utils/shortcuts";
import Detail_modal from '~/components/detail_modal.vue';
import Records from '~/components/records.vue';
import Fullscreen_loader from '~/components/fullscreen_loader.vue';

export default {
  name: 'IndexPage',

  components:{
    Detail_modal,
    Records,
    Fullscreen_loader
  },

  data: function(){
    return {
      options: {
        noWrap: true,
        continuousWorld: false,
        maxBounds: [
          [-90, -180],
          [90, 180]
        ],
        minZoom: 3,
        maxZoom: 5,
      },

      geojson: null,
      countries_cpi_data: null,
      details: null,
      page_is_loading: true,
      rerender_key: true
    }
  },

  methods:{
    get_data(){
      axios.all([this.get_geoJSON_data(), this.get_corruption_data()])

      .then(axios.spread(
        (res1, res2) => {
          this.countries_cpi_data = this.$store.state.corruption_data;
          this.geojson = modified_geoJSON(this.$store.state.corruption_data, this.$store.state.geoJSON_data);
          this.page_is_loading = false;
        }
      ))
      
    },

    get_corruption_data(){
      return new Promise((resolve, reject) => {

        this.$store.dispatch("fetch_corruption_data");

        let timer = setInterval(() => {
          if(this.$store.state.corruption_data){
            resolve("corruption data is set");
            clearInterval(timer);
          }
        }, 100)

      })
    },

    get_geoJSON_data(){
      return new Promise((resolve, reject) => {

        this.$store.dispatch("fetch_geoJSON_data");

        let timer = setInterval(() => {
          if(this.$store.state.geoJSON_data){
            resolve("geo json data is set");
            clearInterval(timer);
          }
        }, 100)

      })
    },

    close_modal(){
      this.details = null;
    },

  },

  computed:{
    geoJSON_options(){
      let self = this; 
      return {
        style(feature){
          let rank = feature.properties.rank;
          return {
              fillColor: fill_color(rank),
              opacity: 0.6,
              color: fill_color(rank),
              fillOpacity: 0.3
          }
      },

        onEachFeature(feature, layer){
          layer.on({
              click: (e) => {
                self.$refs.map.mapObject.fitBounds(layer.getBounds());
                self.details = e.target.feature;
                self.rerender_key = false;
                setTimeout(() => {
                  self.rerender_key = true;
                });
              }
          });
        }
      }
    },
  },

  mounted(){
    this.get_data();
  },

  watch:{
    "rerender_key"(){
      console.log("rendered again!");
    }
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active{
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to{
  opacity: 0;
}

.fade-leave, .fade-enter-to{
  opacity: 1;
}

div.main{
  @include flex_row_between_start();

  div.sidebar{
    height: 100vh;
    @include flex_column_start_center();
    background-color: #0e0e0e;

    position: relative;

     p.introduction{
        font-size: $font6;
        @include flex_center_center();
        color: white;

        letter-spacing: 4px;
        width: 60%;

        margin-top: 30px;
        padding: 10px 0px;

        border-bottom: 1px solid rgba(255,255,255,0.1);
        border-top: 1px solid rgba(255,255,255,0.1);
    }
  }
}
</style>
