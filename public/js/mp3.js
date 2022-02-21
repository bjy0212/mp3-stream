"use strict";

const audio = document.querySelector("audio");
let playbarLoop = null;
audio.onplay = function (ev) {
    document.querySelector(".played").style.width = "0%";

    if (playbarLoop !== null) clearInterval(playbarLoop);

    playbarLoop = setInterval(function () {
        document.querySelector(".played").style.width =
            Math.floor((audio.currentTime / audio.duration) * 100) + "%";
    }, 1000);
};

async function Play(url, info) {
    console.log(`${location.origin}/player/listen?url=${url}`);

    audio.src = `${location.origin}/player/listen?url=${url}`;

    audio.play();

    console.log("playing?");
}

async function Search(query) {
    let data = (
        await (
            await fetch(`${location.origin}/player/yt-search?q=${query}`, {
                method: "GET",
            })
        ).json()
    ).result;

    return data.videos;
}

function ShowSearchResult(videos) {
    ClearResult();

    let container = document
        .getElementsByClassName("search-result-container")
        .item(0);

    for (let i in videos) {
        if (i > 10) break;

        let result = new SearchResult();

        result.url = videos[i].url;
        result.info = {
            title: videos[i].title,
            author: videos[i].author.name,
            thumb: videos[i].thumbnail,
            seconds: videos[i].seconds,
        };

        result.setAttribute("thumb", videos[i].thumbnail);
        result.setAttribute("title", videos[i].title);
        result.setAttribute("author", videos[i].author.name);
        result.setAttribute("time", videos[i].timestamp);

        result.onclick = function () {
            Play(this.url);
            ControllerUpdate(this.info);
        };

        container.append(result);
        // Object.keys(videos[0])
        // > ['type', 'videoId', 'url', 'title', 'description', 'image', 'thumbnail', 'seconds', 'timestamp', 'duration', 'ago', 'views', 'author']
    }
}

function ControllerUpdate(info) {
    document.querySelector(".music-title").innerHTML = info.title;
    document.querySelector(".music-author").innerHTML = info.author;
}

function ClearResult() {
    document
        .getElementsByClassName("search-result-container")
        .item(0).innerHTML = "";
}

class SearchResult extends HTMLElement {
    connectedCallback() {
        let html = `<div class="search-result">
            <div class="search-result-thumbnail" style="background-image: url($thumb$)"></div>
            <div class="search-result-info-container">
                <div class="search-result-title">$title$</div>
                <div class="search-result-detail">$author$ | $time$</div>
            </div>
        </div>`;

        for (let attr of ["thumb", "title", "author", "time"]) {
            html = html.replace(`$${attr}$`, this.getAttribute(attr));
        }

        this.innerHTML = html;
    }
}

customElements.define("search-result", SearchResult);

function ShowLoading() {
    
}

(function () {
    document.querySelector(".search-btn").onclick = function (ev) {
        let typer = document.querySelector(".search-typer");

        let q = typer.value.trim();

        typer.value = "";

        if (q.length > 0)
            Search(q).then((videos) => {
                ShowSearchResult(videos);
            });
    };

    document.querySelector(".search-typer").onkeydown = function (ev) {
        if (ev.key === "Enter") {
            let typer = document.querySelector(".search-typer");

            let q = typer.value.trim();

            typer.value = "";

            if (q.length > 0)
                Search(q).then((videos) => {
                    ShowSearchResult(videos);
                });
        }
    };
})();

// Search("미란이 발로란트").then((videos) => {
//     ShowSearchResult(videos);
// });
