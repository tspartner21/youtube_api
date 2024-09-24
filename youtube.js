/*
  QueryString : 기본 요청 URL뒤에 문자열형태로 옵션값을 달아서 서버에 요청하는 형태
  https://www.abc.com?pwd=1234&name=abc;
  www.abc.com //기본 요청 URL
  ?뒤에 있는 key=value값 문자열 형태로 지정한 추가 요청사항 
  요청사항이 여러개일때에는 &로 구분
*/

const api_key = "AIzaSyDfF904vE_uzyNlnhKgAyUmNWV9U5vTxZ0";
const pid = "PLHtvRFLN5v-WSMMckC0kyUPBzYhXVREHD";

const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${pid}&key=${api_key}`;

fetch(url)
  .then((data) => data.json())
  .then((json) => {
    console.log(json);
  });
