<template>
  <div class="home">
    <board v-bind:data="boardData"></board>
  </div>
</template>

<script>
import Board from './vues/Board.vue'

import axios from 'axios'

export default {
  name: 'Home',
  components: {
    Board
  },
  // data() {
  //   return {
  //     inputVal: ''
  //   }
  // },
  // methods: {
  //   onClickHome(val) {
  //     alert(val)
  //   },
  // }

  data() {
        return {
            boardData: []
        }
    },

    mounted() {
        this.getList();
    },

    methods: {
        async getList() {          
            let res = await axios.get('/api/board/updateContent')

            // mongoDB
            // this.boardData = res.data.contents

            // mysql
            console.log(res.data)
            this.boardData = res.data;
        }
    }
}
</script>
