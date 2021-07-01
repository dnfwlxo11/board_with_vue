function onClickAdd(form) {
    const title = (form.title.value) ? form.title.value.trim() : form.title.value;
    const nickname = form.nickname.value;
    const content = form.content.value;

    if (title == '' || nickname == '' || content == '') {
        alert('빈 칸이 있습니다.')
    } else {
        form.submit();
    }
}

function onChangeContent(evt) {
    console.log(evt.target.value)
}

function onClickCancel() {
    const body = document.querySelector('body');
    const form = document.createElement("form");

    form.setAttribute('method', 'get');
    form.setAttribute('action', '/');

    body.appendChild(form);

    form.submit();
}

function dateCalc(date) {
    const year = date.getFullYear();
    const month = ("0" + (1 + date.getMonth())).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
}