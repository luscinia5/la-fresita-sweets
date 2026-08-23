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
        if (value) el.textContent = value;
    });

    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang);
}