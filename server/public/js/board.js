function onClickAdd(form) {
    const title = (form.title.value) ? form.title.value.trim() : form.title.value;
    const nickname = (form.nickname.value) ? form.nickname.value.trim() : form.nickname.value;
    const content = (form.content.value) ? form.content.value.trim() : form.content.value;

    if (title == '' || nickname == '' || content == '') {
        alert('빈 칸이 있습니다.')
    } else {
        fetch('/api/newContent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                nickname,
                content
            })
        }).then(res => {
            res.json().then(data => {
                if (data.success) {
                    window.history.back();
                } else {
                    alert('게시글 저장 중 문제가 발생했습니다.', data.msg);
                }
            });
        })
    }
}

function onClickCancel() {
    window.history.back();
}

function dateCalc(date) {
    const year = date.getFullYear();
    const month = ("0" + (1 + date.getMonth())).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
}