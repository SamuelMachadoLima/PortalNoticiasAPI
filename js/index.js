const API_KEY = 'd5166b0bfbb44a6693e30d7af18c8045';
const url = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&lang=pt&country=br`;

onload = () => {
    let exclusivo = new XMLHttpRequest();
    exclusivo.onload = cardPrincipal;
    exclusivo.onerror = err => console.log(err);
    exclusivo.open('GET', url)
    exclusivo.send();
}

function cardPrincipal() {
    let news = JSON.parse(this.responseText);
    let exclusive = document.getElementById('exclusivo');
    let gradeNews = document.getElementById('gradeNews');

    let textExclusive = '';
    let textNews = '';
    let contExclusive = 0;
    let contNews = 0;



    for (i = 0; i < news.articles.length; i++) {
        let data = new Date(news.articles[i].publishedAt);

        if (news.articles[i].urlToImage != null && contExclusive < 1 && textExclusive == '') {
            textExclusive += `
                    <div class="col-xs-12 col-md-6 destaque_img">
                        <img src="${news.articles[i].urlToImage}" class="exclusive">
                        <h4 class="text-block">Exclusivo</h4>
                    </div>
                    <div class="col-xs-12 col-md-6 exclusive_text">
                        <p>${data.toLocaleDateString() != null ? (data.toLocaleDateString()) : ""}
                        ${news.articles[i].source.name != null ? (" - " + news.articles[i].source.name) : ""}
                        ${news.articles[i].author != null ? (" - " + news.articles[i].author) : ""}</p>
                        <h2>${news.articles[i].title.substring(0, 20) + "..."}</h2>
                        <p>${news.articles[i].content}</p>
                        <p class="cont"><a href="${news.articles[i].url}">Continue Lendo →</a></p>
                    </div>
                `;
            contExclusive++;
        } else if (contNews < 4) {
            textNews += `
                <div class="cards_theNews">
                    <p>${data.toLocaleDateString() != null ? (data.toLocaleDateString()) : ""}
                    ${news.articles[i].source.name != null ? (" - " + news.articles[i].source.name) : ""}
                    ${news.articles[i].author != null ? (" - " + news.articles[i].author) : ""}</p>
                    <h3>${news.articles[i].title.substring(0, 70) + "..."}</h3>
                    <img src="${news.articles[i].urlToImage}" class="exclusive">
                    <p>${news.articles[i].content}</p>
                    <a href="${news.articles[i].url}">Leia mais →</a>
                </div>
            `;
            contNews++;
        }
    }
    exclusive.innerHTML = textExclusive;
    gradeNews.innerHTML = textNews;
}