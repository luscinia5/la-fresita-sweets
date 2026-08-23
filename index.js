// fetches the header that is in every html page of this website
fetch('header.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('nav-bar-header').innerHTML = html;
    });