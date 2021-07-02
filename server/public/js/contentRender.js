function onClickDelete() {
    const url = window.location.href.split('/')
    const seq = url[url.length - 1].replace('?', '');

    fetch(`/api/deleteContent/${seq}`)
    .then(res => {
        res.json().then(data => {
            if (data.success) {
                window.history.back();
            } else {
                alert('삭제 중 에러가 발생했습니다.', data.err);
            }
        })
    })
}

function onClickList() {
    const url = 
    fetch(`/`)

    window.history.back();
}