<template>
<div>
    <div class="container mt-5">
        <div class="form-group">
            <form>
                <div>
                    <input class="form-control" name="title" type="text" placeholder="제목을 입력하세요." v-model="title">
                    <p></p>
                    <input class="form-control" name="password" type="password" placeholder="암호를 입력하세요." v-model="pass">
                    <p></p>
                    <input class="form-control" name="nickname" type="text" placeholder="닉네임을 입력하세요." v-model="nickname">
                    <p></p>
                    <input class="form-control" name="content" type="text" placeholder="내용을 입력하세요" style="min-height: 500px;" v-model="content">
                </div>
                <div class="mt-5">
                    <button type="button" class="btn btn-primary mr-3" @click="onClickContentAdd">등 록</button>
                    <button type="button" class="btn btn-secondary" @click="onClickCancel">취 소</button>
                </div>
            </form>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Write',

    data() {
        return {
            title: '',
            pass: '',
            nickname: '',
            content: ''
        }
    },

    methods: {
        async onClickContentAdd() {
            let res = await axios({
                url: `/api/board/newContent`,
                method: 'POST',
                data : {
                    title: this.title,
                    password: this.pass,
                    nickname: this.nickname,
                    content: this.content,
                }
            })

            if (res.data.success) {
                alert('글 등록 완료')
                window.location.href = '/';
            } else {
                alert(res.data.err)
            }
        },

        onClickCancel() {
            window.location.href = '/';
        }
    }
}
</script>

<style>

</style>