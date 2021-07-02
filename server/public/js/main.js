const tbody = document.getElementById('board-body');

function createContent() {
    const body = document.querySelector('body');
    const form = document.createElement("form");
    
    form.setAttribute('method', 'get');
    form.setAttribute('action', '/api/newContent');

    body.appendChild(form);

    form.submit();
}

function createBoardList(str) {
    const th = document.createElement('th');
    th.innerText = str;

    return th;
}

function showContent(data) {
    Array.from(data.contents).forEach((item, idx) => {
        const tr = document.createElement('tr');

        tr.appendChild(createBoardList(idx + 1));
        tr.appendChild(createBoardList(item.title));
        tr.appendChild(createBoardList(item.nickname));
        tr.appendChild(createBoardList(item.date));
        tr.setAttribute('onclick', `loadContent(${item.seq})`);

        tbody.appendChild(tr);
    })
}

function loadContent(seq) {
    const body = document.querySelector('body');
    const form = document.createElement('form');
    body.appendChild(form);
    form.setAttribute('action', `/api/loadContent/${seq}`)
    form.submit();
}

function refreshContent() {
    while (tbody.hasChildNodes()) {
        tbody.removeChild(tbody.firstChild);
    }

    fetch('/api/updateContent')
    .then((res) => {
        res.json().then((data) => {
            showContent(data)
        });
    });
}

function init() {
    refreshContent();
}

init();