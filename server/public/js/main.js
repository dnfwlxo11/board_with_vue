const tbody = document.getElementById('board-body');

function createContent() {
    window.location.href = `http://localhost:3000/api/newContent`;
}

function loadContent(seq) {
    window.location.href = `http://localhost:3000/api/loadContent/${seq}`;
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