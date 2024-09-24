const api_key = "AIzaSyDfF904vE_uzyNlnhKgAyUmNWV9U5vTxZ0";
const pid = "PLHtvRFLN5v-W5bQjvyH8QTdQQhgflJ3nu";
const num = 10;
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${pid}&key=${api_key}&maxResults=${num}`;

const frame = document.querySelector("section");

//유튜브 데이터를 가져와서 동적으로 리스트 출력
fetch(url)
  .then((data) => data.json())
  .then((json) => {
    const vidsData = json.items;
    let tags = "";

    //데이터 반복 돌면서 innerHTML='태그문자열'로 동적 돔 생성
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
          <h2 class='vidTitle'>${title}</h2>         
          
          <div class='txt'>
            <p>${desc}</p>
            <span>${date}</span>
          </div>

          <div class='pic'>
            <img src=${data.snippet.thumbnails.standard.url} alt=${data.snippet.title} />
          </div>
        </article>
      `;
    });

    frame.innerHTML = tags;

  
  });

    
  //cf.) 이벤트 위임 없는 경우 처리방법
  // const titles = document.querySelectorAll("article h2");
  // console.log(titles);

  //위쪽의 fetch 구문의 아래쪽의 동적으로 생성한 DOM요소를 변수에 담는 구문은 동시에 실행됨
  //비동기적으로 동작함
  //코드의 작성순서대로 동작하는게 아니라 동시다발적으로 실행되기 때문에
  //코드흐름의 어그러지는 현상 발생
  //위에처럼 비동기적으로 발생하는 코드의 흐름을 강제적으로 동기적 처리
  //코드 작성순서대로 순차적으로 실행되게 만드는 작업 (동기화)


  //자바스크립트를 이용해서 동적으로 생성된 요소는 일반적인 방법으로는 이벤트 연결이 불가함
  //동적인 요소가 만들어지는 위치가 fetch함수의 then 구문안쪽인데 그 밖에서는 동적인 요소 선택 불가
  //제일 간단한 해결 방법 : 동적 생성 요소 찾는 구문을 돔을 생성하는 코드 블록 안쪽에서 호출
  //위의 방법의 단점 : fetch 함수 코드블록 안쪽에 또다시 복잡한 이벤트 로직을 작성해야 되기 때문에 코드 복잡도 증가
  //기능별로 코드 분리가 불가능
  //위와같은 이유로 부득이하게 동적인 요소의 이벤트 연결을 fetch 함수 밖에서 연결하는 경우가 많음
  //이벤트 위임 : 지금 당장은 없는 dom 요소에 이벤트를 전달학 위해서 항상 존재하는 요소에 이벤트를 맡겨서 
  //추후 동적 요소가 생성완료되면 그때 이벤트를 대신 전달해주는 방식
  //이벤트 위임 : 항상 존재하는 body 요소에 일단은 이벤트를 맡겼다가 동적 요소가 생성완료되면 body가 대신 이벤트 전달
  //하나의 함수는 하나의 기능만 담당해야함

  //body에 이벤트 위임 방식
  //동적 생성 요소에 이벤트 연결해서 동적으로 모달요소 추가
  document.body.addEventListener("click" , function (e) { //이벤트 연결한 선택자
    //console.log(e.target);
    //body 전체에 이벤트를 연결한 뒤 이벤트 발생한 실제대상을 조건문으로 분기처리해서
    //조건에 부합될 때에만 원하는 구문 연결(이처럼 번거로운 작업을 처리하지 않기 위해서 리액트 같은 프레임워크, 라이버러리 사용)
      if(e.target.className === "vidTitle"){ //이벤트 타겟은 이벤트 걸린 대상
        console.log("you clicked VidTitle");
        //동적으로 aside 모달창 생성
        //해당 모달창을 절대 innerHTML로 생성 불가
        //innerHTML을 기존의 선택자 안쪽의 요소들을 다 지우고 새로운 요소들로 바꿔치기 하는 개념
        //지금처럼 기존 목록 요소를 유지하면 모달만 추가하고자 할때는 적합하지 않음
        //해결방법 : 부모선택자 .append(생성할 요소: 돔객체)
        //동적 돔 객체를 메서드를 통해서 직접 생성
        const asideEl = document.createElement("aside"); //aside 라는 엘리먼트 노드를 직접 생성
        //body안쪽의 요소들을 그대로 기존 자식요소 유지하면서 동적으로 생성함
        //innerHTML로 생성하면 안됨. 
        //prepend는 기존 요소 유지하면서 앞에 생성, 보통 잘 사용안함
        //append 기존 요소 유지하면서 뒤쪽에 추가(다 자주 사용)


        ///aside라는 비어있는 엘리먼트 요소 안쪽에 기존처럼 innerHTML 원하는 요소 동적 생성
        //aside 안쪽에 복잡한 자식요소는 덮어써도 상관없기에 생성. 기존처럼 innerHTML 원하는 요소 동적 생성
        asideEl.innerHTML = `<div class='con'></div><button>close</button>`;

        //append로 기존 요소 유지하면서 aside요소 추가 (인수로는 문자가 아닌 엘리먼트 노드 필요)
        document.body.append(asideEl);
      }
    });