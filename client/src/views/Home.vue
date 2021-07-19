<template>
  <div class="home">
    <board v-bind:data="boardData"></board>
  </div>
</template>

<script>
import Board from './vues/Board.vue'
import { getContent } from '../api/index'

export default {
  name: 'Home',
  components: {
    Board
  },

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
            let res = await getContent()

            // mongoDB
            this.boardData = res.data.contents

            // mysql
            // console.log(res.data)
            // this.boardData = res.data;
        }
    }
}
</script>
