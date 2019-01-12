<template>
    <div id="form">
        <transition name="fade">
            <form class="addSpot" v-if="this.isOpen" @submit.prevent="addSpot(name, area, lat, lng)">
                <h3>Add a New Spot</h3>
                <input v-model="name" required placeholder="Spot Name">
                <select v-model="area" required>
                    <option value="">Spot Area</option>
                    <option v-bind:key="index" v-for="(area, index) in areas">{{ area.name }}</option>
                </select>
                <input v-model="lat" type="number" step="0.0000001" required placeholder="Spot Latitude">
                <input v-model="lng" type="number" step="0.0000001" required placeholder="Spot Longitude">
                <button type="submit">Add Spot</button>
            </form>
        </transition>
        <button class="formButton " v-bind:class="{ open: isOpen }" @click="showForm()">
            <div class="plus">
                <span class="line--vert"></span>
                <span class="line--hor"></span>
            </div>
        </button>
    </div>
</template>

<script>
import {db} from '../main'

function initialState () {
  return {
    isOpen: false,
    name: '',
    area: '',
    lat: '',
    lng: ''
  }
}

export default {
  name: 'Form',
  data() {
    return initialState()
  },
  firestore () {
    return {
      areas: db.collection('areas')
    }
  },
  methods: {
    addSpot(name, area, lat, lng) {
      db.collection('spots').add({name, area, lat, lng})
      Object.assign(this.$data, initialState())
    },
    showForm() {
      this.isOpen = !this.isOpen
    }
  }
}
</script>

<style scoped lang="scss">
    #form {
        position: absolute;
        bottom: 5%;
        right: 5%;
        z-index: 1;
    }

    .addSpot {
        position: absolute;
        bottom: 90px;
        right: 0;
        background: #fff;
        padding: 10px 30px 20px;
        text-align: left;
        box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.25);
        input, select {
            width: 250px;
            margin-bottom: 20px;
            padding: 20px 0;
            border: none;
            background: #fff;
            color: #757575;
            border-radius: 0;
            appearance: none;
            border-bottom: 1px solid #ececec;
            outline: none;
            font-size: 16px;
            transition: font-size .8s;
            &:active, &:focus {
                font-size: 18px;
            }
        }
        button {
            width: 100%;
            padding: 20px;
            background: #e80c0c;
            color: #fff;
            appearance: none;
            border: none;
            font-family: 'Avenir', Helvetica, Arial, sans-serif;
            font-weight: 400;
            font-size: 18px;
            outline: none;
        }
    }

    .formButton {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 70px;
        height: 70px;
        border-radius: 50%;
        background: #e80c0c;
        outline: none;
        border: 0;
        box-shadow: 1px 2px 5px 1px rgba(0, 0, 0, 0.5);
        cursor: pointer;
        transition: transform .8s;
        .plus {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 30px;
            height: 30px;
            transform: translate(-50%, -50%);
            .line--vert {
                position: absolute;
                top: 0;
                left: 50%;
                transform: translate(-50%);
                width: 3px;
                height: 100%;
                background: #fff;
            }
            .line--hor {
                position: absolute;
                top: 50%;
                left: 0;
                transform: translate(0, -50%);
                width: 100%;
                height: 3px;
                background: #fff;
            }
        }
        &.open {
            transform: rotate(-45deg);
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }
</style>
