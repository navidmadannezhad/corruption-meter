<template>
  <div id="map-wrap" style="height: 100vh">
    <client-only>
      <l-map :zoom=13 :center="[55.9464418,8.1277591]" :options="options">
        <l-tile-layer url="https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibmF2aWRtbnpoMTExIiwiYSI6ImNsMTdsYTRsNzE1bHgzZGthMWppNTdscTkifQ.cimHgKp_fzMY5v5roiDaOA"></l-tile-layer>
        <l-geo-json :geojson="geojson" :options-style="style"></l-geo-json>
      </l-map>
    </client-only>
</div>
</template>

<script>
import axios from "axios";
import fill_color from "@/utils/style";
import { modified_geoJSON } from "@/utils/shortcuts";

export default {
  name: 'IndexPage',
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

      geojson: null
    }
  },

  methods: {
    get_data(){
      axios.all([this.get_geoJSON_data(), this.get_corruption_data()])

      .then(axios.spread(
        (res1, res2) => {
          this.geojson = modified_geoJSON(this.$store.state.corruption_data, this.$store.state.geoJSON_data);
          console.log(this.geojson);
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

    style(feature){
        let rank = feature.properties.rank;
        return {
            fillColor: fill_color(rank),
            opacity: 0.6,
            color: fill_color(rank),
            fillOpacity: 0.3
        }
    }
    // give ranks to geoJSON countries
    // initialize :geoJSON and :style
  },

  mounted(){
    this.get_data();
  }
}
</script>

<style lang="scss" scoped>

</style>
