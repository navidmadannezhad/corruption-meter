<template>
  <div class="main">

    <div class="sidebar">
      <p class="introduction">
          Corruption-Meter!
      </p>

      <Detail_modal :country_details="details" @close_modal="close_modal" style="height: 100vh; width: 25vw;"/>

      <Records :countries="geojson.features" v-if="geojson"/>
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

export default {
  name: 'IndexPage',

  components:{
    Detail_modal,
    Records
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
      details: null
    }
  },

  methods:{
    get_data(){
      axios.all([this.get_geoJSON_data(), this.get_corruption_data()])

      .then(axios.spread(
        (res1, res2) => {
          this.geojson = modified_geoJSON(this.$store.state.corruption_data, this.$store.state.geoJSON_data);
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
                self.details = e.target.feature;
                console.log("this "+e.clientX);
              }
          });
        }
      }
    },
  },

  mounted(){
    this.get_data();
  }
}
</script>

<style lang="scss" scoped>
div.main{
  @include flex_row_between_start();

  div.sidebar{
    height: 100vh;
    @include flex_column_start_center();
    background-color: #0e0e0e;

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
