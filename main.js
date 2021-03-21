

$(document).ready(() => {
    $("#SubmitBox").on("submit", (e) => {
        let searchtext  = $("#searchbox").val();
        localStorage.setItem("Searchtext",searchtext);
        window.location.assign("search.html");
        e.preventDefault();
    });
    

});

function GetData(data) {
    let output = ""; 
    axios.get(data)
    .then (function (response) {
        let animes = response.data.top;
        console.log(response.data.top);
        $.each(animes, (i , anime) => {
                output += `
                <a onclick="Animeselected(${anime.mal_id})" href="anime.html" style="text-decoration:none">
                <div id="anime" style="background-image:linear-gradient(to bottom,rgba(0,0,0,0) 0%,rgba(0,0,0,1) 100%),
                url(${anime.image_url});
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;">
                <div class="play">
                <img src="play.png" width="50">
                </div>
                
                <strong>${anime.title}</strong>
                </div>
                </a>
                `;
            
        });

        $("#animes").html(output);
    })
}

function Search(searchtext) {
    let output ="";
    axios.get("https://api.jikan.moe/v3/search/anime?q="+searchtext)
    .then (function (response) {
        let animes = response.data.results;
        $.each(animes, (i , anime) => {
                output += `
                <a onclick="Animeselected(${anime.mal_id})" href="anime.html" style="text-decoration:none">
                <div id="anime" style="background-image:linear-gradient(to bottom,rgba(0,0,0,0) 0%,rgba(0,0,0,1) 100%),
                url(${anime.image_url});
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;">
                <div class="play">
                <img src="play.png" width="50">
                </div>
                
                <strong>${anime.title}</strong>
                </div>
                </a>
                `;
            
        });
    
        $("#animes").html(output);
    })
    .catch(function (response) {
        console.log(response);
    })
    }


    function Animeselected(id) {
        localStorage.setItem("animeid",id);
    }


    function GetAnime(anime) {
        let output = ""; 
        axios.get(anime)
        .then (function (response) {
            let anime = response.data;
            var genres = "";
            for(var i in anime.genres) {
                 genres += anime.genres[i].name +", ";
            }
            console.log(response);
                    output += `
                    <img src="${anime.image_url}">
                    <div id="info">
                    <p>Estado: ${anime.status}</p>
                    <p> Duración: ${anime.duration}</p>
                    <p>Episodios: ${anime.episodes}</p>
                    <p> Genres: ${genres}</p>
                    </div>
                    <div id="synopsis">
                    <h2>${anime.title}</h2>
                    <p>${anime.synopsis}</p>
                    <iframe src="${anime.trailer_url}" frameBorder="0" width="560" height="315"></iframe>
                    </div>
                    <h1>Reviews</h1>
                    `;
        
            $("#animepage").html(output);
        })

        axios.get(anime+"/reviews")
        .then (function (response) {
            let anime = response.data.reviews;
            console.log(anime);
            anime.forEach(review => {
                output += `
                <div class="reviews">
                <div id="reviewimg" style="background-image: url(${review.reviewer.image_url})"></div>
                    <h2>${review.reviewer.username} <strong>${review.reviewer.scores.overall}/10</strong></h2>
                    <p>${review.content}</p>
                    <a href="${review.url}">Full review</a>
                </div>
                    `;
            });
                    
        
            $("#animepage").html(output);
        })
        
    }





