const API_KEY = 'd5166b0bfbb44a6693e30d7af18c8045';

onload = () => {
    let exclusivo = new XMLHttpRequest();
    exclusivo.onload = noticiasAPI;
    exclusivo.onerror = err => console.log(err);
    exclusivo.open('GET', `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&lang=pt&country=br`)
    exclusivo.send();
}

//Função preencher pesquisas
    function noticiasAPI() {
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
            } else if (contNews < 4 && news.articles[i].urlToImage != null) {
                textNews += `
                    <a href="${news.articles[i].url}" class="linkNoticia">    
                        <div class="row box-noticia">
                            <div class="col-xs-12 col-md-6">
                                <img src="${news.articles[i].urlToImage}" alt="">
                            </div>
                            <div class="col-xs-12 col-md-6">
                                <span class="titulo">${news.articles[i].title}</span><br>
                                <span class="creditos">${data.toLocaleDateString()} - 
                                    ${news.articles[i].source.name} - 
                                    ${news.articles[i].author}</span><br>
                                <span class="text">
                                    ${news.articles[i].content + "<br> <span style='color: blue'>Clique para continuar lendo</span>"}
                                </span>
                            </div>
                        </div>
                    </a>    
                `;
                contNews++;
            }
        }
        exclusive.innerHTML = textExclusive;
        gradeNews.innerHTML = textNews;
    }

// Pesquisa por seção:
    function executaPesquisa() {
        let fonte = this.id;

        let xhr = new XMLHttpRequest();
        xhr.onload = noticiasAPI;
        xhr.open('GET', `https://newsapi.org/v2/top-headlines?sources=${fonte}&apiKey=${API_KEY}&lang=pt`);
        xhr.send();
    }
    document.querySelectorAll('.nav-item a').forEach(function (btn) {
        btn.addEventListener("click", executaPesquisa);
    });

// Pesquisa por input
    function executarPesquisa () {
        let query = document.getElementById('txtPesquisa').value;

        let xhr = new XMLHttpRequest ();
        xhr.onload = noticiasAPI;
        xhr.open ('GET', `https://newsapi.org/v2/top-headlines?q=${query}&apiKey=${API_KEY}&lang=pt`);
        xhr.send ();
    }
    document.getElementById('btnPesquisa').addEventListener('click', executarPesquisa);