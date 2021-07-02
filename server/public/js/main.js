const tbody = document.getElementById('board-body');

function createContent() {
    const body = document.querySelector('body');
    const form = document.createElement("form");
    
    form.setAttribute('method', 'get');
    form.setAttribute('action', '/api/newContent');

    body.appendChild(form);

    form.submit();
}

function loadContent(seq) {
    const body = document.querySelector('body');
    const form = document.createElement('form');
    body.appendChild(form);

    form.setAttribute('action', `/api/loadContent/${seq}`)

    form.submit();
}

function changeLimit(value) {
    console.log(window.location.href.split('limit=')[0] + `limit${value}`)
    window.location.href = window.location.href.split('?limit=')[0] + `?limit=${value}`;
}