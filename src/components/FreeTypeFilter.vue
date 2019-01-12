<template>
  <div class="free-type-filter">
      <form>
          <input placeholder="Start Typing to Filter Spots..." name="name" v-model="term" @keyup="queryName()" />
      </form>
      <p>{{ this.term }}</p>
  </div>
</template>

<script>
import { db } from '../main'
export default {
  name: 'free-type-filter',
  data () {
    return {
      term: ''
    }
  },
  firestore () {
    return {
      spots: db.collection('spots')
    }
  },
  methods: {
    queryName () {
      this.spots = db.collection('spots').orderByChild('name').equalTo(this.term).on('value', function (snapshot) {
      })
    }
  }
}
</script>

<style scoped lang="scss">
    .free-type-filter {
        position:absolute;
        top:5%;
        left:5%;
        z-index:1;
        input {
          padding:10px 10px 10px 20px;
          width:240px;
          outline:0;
        }
    }
</style>
