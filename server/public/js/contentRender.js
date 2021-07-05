const pass = document.getElementById('pass'),
    url = window.location.href.split('/'),
    seq = url[url.length - 1].replace('?', '');

function onClickDelete() {
    fetch(`/api/board/deleteContent/${seq}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            pass: pass.value
        })
    })
    .then(res => {
        res.json().then(data => {
            if (data.success) {
                window.location.href = 'http://localhost:3000/';
            } else {
                alert('삭제 중 에러가 발생했습니다.', data.msg);
            }
        })
    })
}

function onClickList() {
    window.location.href = 'http://localhost:3000/';
}

function onClickCommentAdd(form) {
    const title = document.getElementById('title').innerText;
    const nickname = document.getElementById('nickname').innerText;
    const author = (form.author.value) ? form.author.value.trim() : form.author.value;
    const pass = (form.pass.value) ? form.pass.value.trim() : form.pass.value;
    const content = (form.content.value) ? form.content.value.trim() : form.content.value;

    fetch(`/api/comment/addComment/${seq}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            seq,
            nickname,
            author,
            pass,
            content,
        })
    })
    .then(res => {
        res.json().then(data => {
            if (!data.success) {
                alert('댓글을 저장하는데 실패했습니다.')
            } else {
                window.location.href = window.location.href;
            }
        })
    })
}