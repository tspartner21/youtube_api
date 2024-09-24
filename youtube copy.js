const api_key = "AIzaSyDbV3rXcmAxk6CmWEZyl2azPELa6U28z9Y";
const pid = "PLHtvRFLN5v-W5bQjvyH8QTdQQhgflJ3nu";
const num = 10;
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${pid}&key=${api_key}&maxResults=${num}`;

const frame = document.querySelector("section");

fetch(url)
  .then((data) => data.json())
  .then((json) => {
    const vidsData = json.items;
    let tags = "";

    vidsData.forEach((data) => {
      tags += `
        <article>
          <h2>${data.snippet.title}</h2>
        </article>
      `;
    });

    console.log(tags);
    frame.innerHTML = tags;
  });
