const api_key = "AIzaSyDfF904vE_uzyNlnhKgAyUmNWV9U5vTxZ0";
const pid = "PLHtvRFLN5v-W5bQjvyH8QTdQQhgflJ3nu";
const num = 10;

const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${pid}&key=${api_key}&maxResults=${num}`;

fetch(url)
  .then((data) => data.json()) //문자열의 데이터를 객체나 배열형태로 변환 (parsing)
  .then((json) => {
    //parsing완료된 데이터를 json 파라미터명으로 받아서
    //해당 코드블록안쪽에서 데이터 활용
    console.log(json);
  });
