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

function getFureURL() {
    return window.location.href.split('?')[0]
}

function getQuery() {
    const query = window.location.search;
    let querys = {};

    query.replace('?', '').split('&').forEach((item) => {
        let tmp = item.split('=');
        querys[tmp[0]] = tmp[1];
    });

    return querys;
}

function setQuery(value) {
    let querys = getQuery();
    let url = getFureURL() + '?';

    querys.page = 1;
    querys.limit = value;

    for (let key in querys) {
        if (key == 'limit') url += (key + '=' + querys[key]);
        else url += (key + '=' + querys[key] + '&');
    }

    window.location.href = url;
}