<template>
    <div id="map">
        <free-type-filter />
        <map-filter/>
        <GmapMap
            v-bind:center=center
            v-bind:zoom=zoom
            :options="mapOptions"
            map-type-id="roadmap"
            style="width: 100vw; height: 100vh"
        >
            <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
                {{infoContent}}
            </gmap-info-window>
            <GmapMarker
                v-bind:key="index"
                v-for="(spot, index) in spots"
                v-bind:position={lat:parseFloat(spot.lat),lng:parseFloat(spot.lng)}
                v-bind:clickable="true"
                @click="toggleInfo(spot, index)"
            />
        </GmapMap>
        <spot-form />
    </div>
</template>

<script>
import Vue from 'vue'
import Filter from './Filter'
import FreeTypeFilter from './FreeTypeFilter'
import Form from './Form'
import { db } from '../main'
import * as VueGoogleMaps from 'vue2-google-maps'

export default {
  name: 'Map',
  data () {
    return {
      filter: '',
      spots: [],
      mapOptions: {
        disableDefaultUI: true
      },
      zoom: 12,
      center: {lat: 51.504692, lng: -0.127963},
      infoContent: '',
      infoWindowPos: null,
      infoWinOpen: false,
      currentSpot: null,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      }
    }
  },
  methods: {
    toggleInfo (spot, i) {
      this.infoWindowPos = {lat: parseFloat(spot.lat), lng: parseFloat(spot.lng)}
      this.infoContent = spot.name
      this.zoom = 16
      this.center = {lat: parseFloat(spot.lat), lng: parseFloat(spot.lng)}

      if (this.currentSpot === i) {
        this.infoWinOpen = !this.infoWinOpen
      } else {
        this.infoWinOpen = true
        this.currentSpot = i
      }
    }
  },
  watch: {
    spots: function (newVal, oldVal) {
      Vue.use(VueGoogleMaps, {
        load: {
          key: 'AIzaSyBsEkBWbOr2OIpwXG_bqoafyrQYqzFLBAc',
          libraries: 'places'
        }
      })
    }
  },
  firestore () {
    return {
      spots: db.collection('spots')
    }
  },
  components: {
    'map-filter': Filter,
    'spot-form': Form,
    'free-type-filter': FreeTypeFilter
  }
}
</script>

<style lang="scss">
  #map {
      position:relative;
  }
</style>
