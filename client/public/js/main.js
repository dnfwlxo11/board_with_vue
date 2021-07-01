function createContent() {
    const body = document.querySelector('body');
    const form = document.createElement("form");
    
    form.setAttribute('method', 'get');
    form.setAttribute('action', '/api/newContent');

    body.appendChild(form);

    form.submit();
}

function refreshContent() {
    fetch('/api/updateContent')
    .then((res) => {
        res.json().then((data) => {
            console.log(data)
        });
    });
}

function init() {
    refreshContent();
}