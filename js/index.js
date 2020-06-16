const API_KEY = 'd5166b0bfbb44a6693e30d7af18c8045';
const url = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&lang=pt&country=br`;

onload = () => {
    let xhr = new XMLHttpRequest();
    xhr.onload = carregaSlide;
    xhr.onerror = err => console.log(err);
    xhr.open('GET', url)
    xhr.send();
}

function carregaSlide() {
    let news = JSON.parse(this.responseText);
    let carousel = document.getElementById('excludivo');

    let text = '';
    let cont = 0;



    for (i = 0; i < news.articles.length; i++) {

        if (news.articles[i].urlToImage != null && cont < 3) {
            text += `
                <div class="carousel-item ${cont == 0 ? 'active' : ''}">
                    <img src="${news.articles[i].urlToImage}">
                    <div class="carousel-caption">
                        <h3>${news.articles[i].title.substring(0,50) + "..."}</h3>
                        <p>${news.articles[i].content.substring(0,50) + "..."} </p>
                        <a class="linkCarousel" href="${news.articles[i].url}">Leia mais...</a>
                    </div>
                </div>
            `;
            cont++;
        }
    }


    carousel.innerHTML = text;
}