function createContent() {
    const body = document.querySelector('body');
    const form = document.createElement("form");
    
    form.setAttribute('method', 'get');
    form.setAttribute('action', '/api/newContent');

    body.appendChild(form);

    form.submit();
}

function showContent(data) {
    const tbody = document.getElementById('board-body');
    
    Array.from(data.contents).forEach((item) => {
        const tr = document.createElement('tr');
        const th_title = document.createElement('th');
        const th_date = document.createElement('th');

        th_title.innerText = item.title;
        th_date.innerText = item.date;

        tr.appendChild(th_title);
        tr.appendChild(th_date);
        tbody.appendChild(tr);
        console.log(item);
    })
}

function refreshContent() {
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