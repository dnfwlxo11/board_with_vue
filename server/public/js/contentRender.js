const pass = document.getElementById('pass')

function onClickDelete() {
    const url = window.location.href.split('/')
    const seq = url[url.length - 1].replace('?', '');

    fetch(`/api/deleteContent/${seq}`, {
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
                window.history.back();
            } else {
                alert('삭제 중 에러가 발생했습니다.', data.msg);
            }
        })
    })
}

function onClickList() {
    window.history.back();
}