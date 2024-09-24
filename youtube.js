const api_key = "AIzaSyDfF904vE_uzyNlnhKgAyUmNWV9U5vTxZ0";
const pid = "PLHtvRFLN5v-W5bQjvyH8QTdQQhgflJ3nu";
const num = 10
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${pid}&key=${api_key}&maxResults=${num}`;

const frame = document.querySelector("section");

fetch(url)
  .then((data) => data.json())
  .then((json) => {

    const vidsData = json.items;
    let tags = "";

    vidsData.forEach((data) => {
      let title = 
      data.snippet.title.length > 60
      ? data.snippet.title.substring(0, 60) + "..."
      : data.snippet.title;

      let desc = 
      data.snippet.description.length > 120
      ? data.snippet.description.substring(0, 120) + "..."
      : data.snippet.description;

      let date = data.snippet.publishedAt.split("T")[0].split("-").join(".");

      tags += `
        <article>
          <h2 class='vidTitle' data-id=${data.snippet.resourceId.videoId}>${title}</h2>
          <div class='txt'>
            <p>${desc}</p>
            <span>${date}</span>
          </div>
          <div class='pic'>
            <img src=${data.snippet.thumbnails.standard.url} alt=${data.snippet.title}>
          </div>
        </article>
      `;
    });

    frame.innerHTML = tags;

  });

document.addEventListener("click", function(e){

  const vidID = e.target.getAttribute("data-id");

  if(e.target.className === 'vidTitle'){
    console.log("you clicked VidTitle");  

    const asideEl = document.createElement("aside");
    asideEl.innerHTML = `<div class='con'>
    <iframe src="http://www.youtube.com/embed/${vidID} frameborder="0"></iframe>
    </div>
    <button class='btnClose'>close</button>`;
    document.body.appendChild(asideEl);
  }
});

document.body.addEventListener("click", e =>{
  if(e.target.className === 'btnClose'){
    document.body.removeChild(document.querySelector("aside"));
  }
});