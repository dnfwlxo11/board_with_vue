<template>
    <div class="container">
        <div class="wrapper">
            <div class="board-div" style="text-align: center;">
                <table class="table table-hover mt-5 mb-3 d-md-table d-none">
                    <thead>
                        <!-- <span class="material-icons">switch_left</span> -->
                        <th name="index" @click="tableSort">번 호</th>
                        <th name="title" @click="tableSort">제 목</th>
                        <th name="nickname" @click="tableSort">작성자</th>
                        <th name="date" @click="tableSort">작성일</th>
                    </thead>
                    <tbody>
                        <tr v-if="indexNum" v-for="(item, index) in pagenatedData" @click="loadContent($event, data[index].seq)">
                            <td>{{ (pagenatedData.length - index) + (pageNum * listSize) }}</td>
                            <td>{{ item.title }}</td>
                            <td>{{ item.nickname }}</td>
                            <td>{{ item.date }}</td>
                        </tr>
                        <tr v-if="!indexNum" v-for="(item, index) in pagenatedData" @click="loadContent($event, data[index].seq)">
                            <td>{{ (index + 1) + (pageNum * listSize) }}</td>
                            <td>{{ item.title }}</td>
                            <td>{{ item.nickname }}</td>
                            <td>{{ item.date }}</td>
                        </tr>
                    </tbody>
                </table>

                <table class="table table-hover mt-5 mb-3 d-md-none d-table">
                    <tr>
                        <th name="index" @click="tableSort">번 호</th>
                        <th name="title" @click="tableSort">제 목</th>
                        
                    </tr>
                    <tbody>
                        <tr v-if="indexNum" v-for="(item, index) in pagenatedData">
                            <th>{{ (pagenatedData.length - index) + (pageNum * listSize) }}</th>
                            <th>{{ item.title }}</th>
                        </tr>
                        <tr v-if="!indexNum" v-for="(item, index) in pagenatedData">
                            <th>{{ (index + 1) + (pageNum * listSize) }}</th>
                            <th>{{ item.title }}</th>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="row">
                <div class="page-div mb-3 col-3">
                    <button :disabled="pageNum === 0" @click="prevPage" class="btn btn-secondary mr-1">이전</button>
                    <span class="page-count">{{ pageNum + 1 }} / {{ pageCount }} 페이지</span>
                    <button :disabled="pageNum >= pageCount - 1" @click="nextPage" class="btn btn-secondary ml-1">다음</button>
                </div>
                <div class="col-3">
                    <select name="pageSize" class="custom-select" v-model="listSize" @change="pageNum = 0">
                        <option value="">표시할 개수 선택</option>
                        <option value="3">3</option>
                        <option value="5" selected="selected">5</option>
                        <option value="10">10</option>
                    </select>
                </div>
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
            mode: true,
            indexNum: false
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
        },

        tableSort(e) {
            const sortTarget = e.target.getAttribute('name');

            if (sortTarget == 'index') {
                this.data = this.data.reverse();
                this.indexNum = !this.indexNum;
                return true;
            }

            if (this.mode) {
                this.data = this.data.sort((a, b) => { 
                    console.log(typeof(a[sortTarget]), typeof(b[sortTarget]))
                    return a[sortTarget] > b[sortTarget] ? 1 : -1
                });
            } else {
                this.data = this.data.sort((a, b) => {
                    console.log(typeof(a[sortTarget]), typeof(b[sortTarget]))
                    return a[sortTarget] < b[sortTarget] ? 1 : -1
                });
            }

            this.mode = !this.mode;
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