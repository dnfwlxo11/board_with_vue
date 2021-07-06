<template>
    <div class="container">
        <div class="wrapper">
            <div class="board-div" style="text-align: center;">
                <table class="table table-hover mt-5 mb-3 d-md-table d-none">
                    <thead>
                        <th>번 호</th>
                        <th>제 목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in pagenatedData" @click="loadContent($event, data[index].seq)">
                            <td>{{ (index + 1) + (pageNum * listSize) }}</td>
                            <td>{{ item.title }}</td>
                            <td>{{ item.nickname }}</td>
                            <td>{{ item.date }}</td>
                        </tr>
                    </tbody>
                </table>

                <table class="table table-hover mt-5 mb-3 d-md-none d-table">
                    <tr>
                        <th>번 호</th>
                        <th>제 목</th>
                        
                    </tr>
                    <tbody>
                        <tr v-for="(item, index) in pagenatedData">
                            <th>{{ (index + 1) + (pageNum * listSize) }}</th>
                            <th>{{ item.title }}</th>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="page-div mb-3">
                <button :disabled="pageNum === 0" @click="prevPage" class="btn btn-secondary mr-1">이전</button>
                <span class="page-count">{{ pageNum + 1 }} / {{ pageCount }} 페이지</span>
                <button :disabled="pageNum >= pageCount - 1" @click="nextPage" class="btn btn-secondary ml-1">다음</button>
            </div>
            <div class="btn-div">
                <button type="button" class="btn btn-primary" @click="onClickSubmit">등록</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Board',
    props: ['data'],

    data() {
        return {
            pageNum: 0,
            boardList: [],
            listSize: 5,
        }
    },

    methods: {
        loadContent(e, seq) {
            window.location.href = `/content/${seq}`
        },

        onClickSubmit() {
            window.location.href = `/newContent`
        },

        nextPage() {
            this.pageNum += 1;
        },

        prevPage() {
            this.pageNum -= 1;
        }
    },

    computed: {
        pageCount() {
            let dataLength = this.data.length;
            let listSize = this.listSize;
            let page = Math.floor((dataLength - 1) / listSize) + 1;
                
            return page;
        },

        pagenatedData() {
            const start = this.pageNum * this.listSize;
            const end = start + this.listSize;

            return this.data.slice(start, end);
        }
    }
}
</script>

<style>

</style>