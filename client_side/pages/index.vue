<template>
  <div id="map-wrap" style="height: 100vh">
    <client-only>
      <l-map :zoom=13 :center="[55.9464418,8.1277591]" :options="options">
        <l-tile-layer url="https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibmF2aWRtbnpoMTExIiwiYSI6ImNsMTdsYTRsNzE1bHgzZGthMWppNTdscTkifQ.cimHgKp_fzMY5v5roiDaOA"></l-tile-layer>
        <l-marker :lat-lng="[55.9464418,8.1277591]"></l-marker>
      </l-map>
    </client-only>
</div>
</template>

<script>
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
    }
  }
}
</script>

<style lang="scss" scoped>

</style>