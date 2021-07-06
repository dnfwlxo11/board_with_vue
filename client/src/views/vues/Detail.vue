<template>
    <div v-if="loading">
        <div class="container mt-5">
        <div class="card bg-light mb-3" style="min-height: 600px;">
            <div class="card-header pl-5">제 목 : <span id="title">{{ data.title }}</span></div>
            <div class="card-header pl-5">작성자 : <span id="nickname">{{ data.nickname }}</span></div>
            <div class="card-body">
                <p class="cart-text m-5">
                    {{ data.content }}
                </p>
                <div class="card-text"></div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-8">
                <button type="button" class="btn btn-secondary mr-1" @click="backwardPage">목록보기</button>
                <button type="button" class="btn btn-danger" @click="onClickContentDelete">삭 제</button>
            </div>
            <div class="col-md-4">
                <input id="pass" type="password" class="form-control" placeholder="비밀번호" v-model="contentPass">
            </div>
        </div>
    </div>
    <div class="container card mt-5 p-3" style="max-width: 1100px;">
        <form>
            <input name="author" type="text" class="form-control mt-3" placeholder="작성자를 입력하세요." style="max-width: 300px;" v-model="commentAuthor">
            <input name="pass" type="password" class="form-control mt-3" placeholder="비밀번호를 입력하세요." style="max-width: 300px;" v-model="commentPass">
            <input name="content" type="text" class="form-control mt-3" placeholder="댓글 내용을 입력하세요." style="min-height: 100px;" v-model="commentContent">
            <button type="button" class="btn btn-primary mt-3" @click="onClickCommentAdd">등록</button>
        </form>
    </div>
    <div class="container card mt-5 mb-5" style="max-width: 1100px;">
            <div class="row no-gutters border" v-for="item of comments" :key="item.id">
                <div class="col-md-2">
                    <div class="d-flex h-100 justify-content-center align-items-center">
                        <div class="w-100">
                            <img class="w-100 mb-2" src="/user.png" alt="anounymous">
                            <div class="text-center">작성자 : {{ item.author }}</div>
                        </div>
                    </div>
                </div>
                <div class="col-md-10">
                    <div class="card-body">
                        <form>
                            <span class="reply-id" style="display: none;">123</span>
                            <h5 class="card-title"></h5>
                            <p class="card-text">내용 : {{ item.content }}</p>
                            <p class="card-text"><small class="text-muted">작성일 : {{ item.date }}</small></p>
                            <button type="button" class="btn btn-danger" @click="onClickCommentDelete(item)">삭제</button>
                            <input type="password" class="pass form-control mt-3" placeholder="비밀번호를 입력하세요." style="max-width: 200px;" v-model.trim="item.input_pass">
                        </form>
                    </div>
                </div>
            </div>
    </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Detail',

    data() {
        return {
            data: '',
            loading: false,
            contentPass: '',
            contentSeq: '',
            comments: [],
            commentAuthor: '',
            commentContent: '',
            commentPass: '',
            commentDeletePass: '',
        }
    },

    created() {
        this.loadContent();
    },

    methods: {
        async loadContent() {
            this.seq = this.$route.params.id;
            let res = await axios(`/api/board/loadContent/${this.seq}`)
            this.data = res.data.item;
            this.comments = res.data.item.comments.reduce((acc, item)=>{
                item.input_pass = ''
                acc.push(item)
                return acc
            }, []);
            console.log(this.comments)
            this.loading = true;
        },

        async onClickCommentAdd() {
            let res = await axios({
                method: 'POST', 
                url: `/api/comment/addComment/${this.seq}`,
                data: {
                    content: this.commentContent,
                    pass: this.commentPass,
                    author: this.commentAuthor
                }
            })

            if (res.data.success) {
                window.location.reload();
            } else {
                alert(res.data.msg)
            }
        },

        async onClickContentDelete() {
            let res = await axios({
                method: 'POST', 
                url: `/api/board/deleteContent/${this.seq}`,
                data: {
                    pass: this.contentPass
                }
            })

            if (res.data.success) {
                alert('삭제 완료')
                window.location.href = '/';
            } else {
                alert(res.data.msg)
            }
        },

        async onClickCommentDelete(data) {
            const id = data._id
            console.log(data)
            if(data.pass != data.input_pass){
                alert('비밀번호가 다릅니다.')
                return false
            }

            let res = await axios({
                method: 'POST', 
                url: `/api/comment/deleteComment/${this.seq}`,
                data: {
                    _id: id,
                    pass: data.input_pass
                }
            })

            if (res.data.success) {
                alert('삭제 완료')
                window.location.reload();
            } else {
                alert(res.data.msg)
            }
        },

        backwardPage() {
            window.location.href = '/';
        }
    }
}
</script>

<style>

</style>