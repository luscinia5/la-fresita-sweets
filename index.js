// fetches the header that is in every html page of this website
fetch('header.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('nav-bar-header').innerHTML = html;
        applyLanguage(detectLanguage()); // translates header AND body
    });

function detectLanguage() {
    const saved = localStorage.getItem('lang');
    if (saved) return saved;
    const browserLang = navigator.language.slice(0, 2);
    return browserLang === 'en' ? 'en' : 'es'; // default to ES otherwise

}

async function applyLanguage(lang) {
    const result = await fetch(`lang/${lang}.json`);
    const dict = await result.json();

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        const value = key.split('.').reduce((obj, k) => obj?.[k], dict);
        if (value) el.innerHTML = value; // used to be textContent
    });

    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang);
}

/* 
Note: innerHTML has a security risk where, if the string injected ever
comes from user input (a comment form, a URL parameter, etc), this is exactly
the mechanism behind XSS attacks. Malicious <script> tags could get
injected and run.

That is not a risk here because these strings are from JSON files that
I write myself, but it's worth noting to not reflexively use innerHTML
later if I add a comment section or a search box that echoes back what
someone typed.
*/