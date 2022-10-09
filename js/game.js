class Card{
    constructor(fileName){
        this.frontFileUrl  = "url(img/card/back.png)";

        this.backFileUrl   = "url(img/card/"+fileName+".png)";
        this.moveFileUrl   = "url(img/card/"+fileName+".gif)";

        this.isMatch = false;
        this.clickCount = 0;

        //img 태그 요소 생성
        this.createDivEl();
    }

    setBackBackground(imgFileUrl){
        this.backDiv.style.backgroundImage = imgFileUrl;
    }
    
    
    addClass(el, className){
        el.classList.add(className);
    }

    removeClass(el, className){
        el.classList.remove(className);
    }

    rotateCard(){
        this.removeClass(this.cardDiv, "rotationOpst");
        this.addClass(this.cardDiv, "rotation")
    }

    rotateOpstCard(){
        this.removeClass(this.cardDiv, "rotation");
        this.addClass(this.cardDiv, "rotationOpst")
    }


    async movingCardImg(){
        await this.addClass(this.backDiv, "bingo");
        await this.setBackBackground(this.moveFileUrl);
        await setTimeout(() => {
            this.removeClass(this.backDiv, "bingo");
            this.setBackBackground(this.backFileUrl);
        }, 3000);
        // setImgMove();
    }

    createDivEl(){

        // 카드 div
        this.cardDiv = document.createElement("div");
        this.cardDiv.classList.add("card");

        // 카드 앞면을 그려주는 div
        this.frontDiv = document.createElement("div");
        this.frontDiv.classList.add("front");
        this.frontDiv.style.backgroundImage = this.frontFileUrl;
        this.cardDiv.appendChild(this.frontDiv);

        // 카드 뒷면을 그려주는 div
        this.backDiv = document.createElement("div");
        this.backDiv.classList.add("back")
        this.backDiv.style.backgroundImage = this.backFileUrl;
        this.cardDiv.appendChild(this.backDiv);


    }

    insertionImgEl(parentsEl){
        parentsEl.appendChild(this.cardDiv);
    }

}


// 카드 이미지의 주소를 가지고 있는 배열

const imgFileNames = ["free-animated-icon-armadillo-7211995",
                        "free-animated-icon-bear-7211984",
                        "free-animated-icon-camel-7211904",
                        "free-animated-icon-cat-7211991",
                        "free-animated-icon-chicken-7211939",
                        "free-animated-icon-cow-7211887",
                        "free-animated-icon-dog-7211975",
                        "free-animated-icon-duck-7211928",
                        "free-animated-icon-elephant-7212015",
                        "free-animated-icon-goat-7211979",
                        "free-animated-icon-gorilla-7212003",
                        "free-animated-icon-hedgehog-7211999",
                        "free-animated-icon-hen-7212012",
                        "free-animated-icon-hippopotamus-7211959",
                        "free-animated-icon-horse-7211893",
                        "free-animated-icon-jellyfish-7211897",
                        "free-animated-icon-kiwi-7211935",
                        "free-animated-icon-manta-ray-7211915",
                        "free-animated-icon-octopus-7211910",
                        "free-animated-icon-rhinoceros-7212007",
                        "free-animated-icon-seahorse-7211955",
                        "free-animated-icon-seal-7211967",
                        "free-animated-icon-sheep-7211946",
                        "free-animated-icon-snail-7211921",
                        "free-animated-icon-snake-7211876",
                        "free-animated-icon-starfish-7211950",
                        "free-animated-icon-toucan-7211964",
                        "free-animated-icon-wolf-7211972",
                        "free-animated-icon-zebra-7211987"];

// 카드덱 배열
const cardDeck = [];


// 카드덱 배열 갯수
// const CARD_DACK_LEN_8 = 8;
const CARD_DACK_LEN_16 = 16;
// const CARD_DACK_LEN_24 = 24;

// 몇번째로 클릭했는지 확인하기 위한 변수
let clickCount = 1;

let totalCount = 0;

// 시작 시간
const startTimeSecond = new Date();

pushingCardDeck();

console.log(cardDeck);

const gameLogic = gameLogicEvent;

addEventCardDeck(gameLogic);

insertRandImg();


// setInterval 함수를 중지, 재시작 시키기 위해 변수에 담음
let interval = setInterval(() => {drawTimer();}, 1000);
console.log(interval);

// 게임 시작 전에는 중지
clearInterval(interval);

function gameLogicEvent (event){

    if(totalCount === 0){
        // 처음 카드를 누르면서 재시작
        interval = setInterval(() => {drawTimer();}, 1000);
    }

    // 카드덱에서 이벤트 객체와 동일한 객체를 찾는다.
    const card = findCardDeck(event);

    // 이미 맞춘 카드 리턴
    if(card.isMatch) return;
    
    // 이미 앞면인 카드 리턴
    if(card.cardDiv.classList.contains("rotation")) return;
    
    totalCount++;
    drawCounting();

    // 이미 맞춘 카드도 아니고 이미 앞면도 아닌 카드라면 앞면으로 바꿔준다.
    card.rotateCard();

    // 처음 들어온 카드는 카운트를 늘리고 card객체 clickCount 멤버변수에 clickCount값 넣고 리턴
    if(clickCount === 1){

        card.clickCount = clickCount;
        clickCount++;

        return;
    }


    // 두번째 들어온 카드는 처음 카드와 값 비교해서 같으면 매치 완료 변수에 값 넣기
    // 같지 않으면 카운트만 늘려서 리턴
    if(clickCount === 2){

        checkingSameCard(card);

        const isTotalMationg = totalMatching();

        if(isTotalMationg){

            // 카드덱의 모든 이벤트 해제
            removeEventCardDeck(gameLogic);

            // 시간 경과 타이머 해제
            console.log(interval);
            clearInterval(interval);

            // 결과 화면에 보여주기
            drawResult();
        }

        clickCount++;

        return;
    }
    
    // 세번째 들어온 카드는 먼저 누른 첫번째 두번째 카드가 매칭되지 않은 경우 뒤집어 준다
    // 카운트 리셋해서 리턴
    if(clickCount === 3){

        reverseCard(card);

        // 다음 카드가 온클릭 이벤트로 들어왔을때 3번째 카드와 비교하게 하기 위해 clickCount 값을 2로 준다.
        clickCount = 2;

        // 카드는 2장 씩 비교하므로 3번째 카드는 첫번째로 들어온 카드로 취급하면 된다.
        card.clickCount = 1;

        return;
    }
}

function addEventCardDeck(event){
    cardDeck.map((card)=>{ 
        card.cardDiv.addEventListener("click", event);
    });
}

function removeEventCardDeck(event){
    cardDeck.map((card)=>{
        card.cardDiv.removeEventListener("click", event);
    });
}

function findCardDeck(event){
    return cardDeck.find((card) => { 
        return card.cardDiv  ===  event.currentTarget });
}

function checkingSameCard(card){

    for(let i = 0; i < cardDeck.length; i++){

        if(cardDeck[i].clickCount  === 1
        && cardDeck[i].backFileUrl === card.backFileUrl){

            // 매칭이 완료 되었으므로 변수에 true 대입
            card.isMatch     = true;
            cardDeck[i].isMatch = true;

            // 이미지가 움직이게 처리
            card.movingCardImg();
            cardDeck[i].movingCardImg();

            // 다음 카드 비교를 위해 clickCount 리셋
            card.clickCount     = 0;
            cardDeck[i].clickCount = 0;

            return;
        }
    }
}


function reverseCard(card){

    for(let i = 0; i < cardDeck.length; i++){

        // todo 뒤집는 걸 위에서 할 것
        // 앞면인 카드 중에 지금 뒤집은 카드가 아니고 매칭되지 않은 카드일 경우 뒤집어 준다.
        if(cardDeck[i]         !== card
        && cardDeck[i].isMatch === false
        && cardDeck[i].cardDiv.classList.contains("rotation")){

            // 뒤집어 주기
            cardDeck[i].rotateOpstCard();
            
            // 카운트 리셋
            cardDeck[i].clickCount = 0;
        }
    }
}

// 카드가 모두 매칭되었는지 확인한다.
function totalMatching(){
    return cardDeck.every((card) => {return card.isMatch === true});
}

function drawResult(){
    
    const timerDiv = document.querySelector(".clock div");

    const timerSecond = timerDiv.innerHTML.replace("s", "");

    const counterDiv = document.querySelector(".counter div");

    const totalCount = counterDiv.innerHTML;

    _result.innerHTML = `걸린 시간 ${timerSecond}초 횟수는 ${totalCount}번 만에 성공하셨습니다.<br>기록하시려면 입력해주세요.`;
    _recode.style.display = "flex";
}

function pushingCardDeck(){

    // 같은 이미지의 카드가 두 장씩 들어가므로 배열 갯수의 반만 돌아간다.
    let count = CARD_DACK_LEN_16 / 2;

    while(count > 0){

        const randIndex = Math.floor(Math.random() * imgFileNames.length);

        const fileName = imgFileNames[randIndex];
        const fileUrl = `url(img/card/${fileName}.png)`

        // 카드 앞면 파일 경로 비교로 중복되는 값이 있는지 확인
        const include = cardDeck.findIndex((card) => { return card.backFileUrl === fileUrl; });

        if(include === -1){

            // 같은 이미지를 가진 카드를 두장 삽입한다.
            cardDeck.push(new Card(fileName));
            cardDeck.push(new Card(fileName));

            count--;
        }
    }
}

function insertRandImg(){

    const cardsLen = cardDeck.length;

    let count = cardsLen;

    while(count > 0){

        const randIndex = Math.floor(Math.random() * cardsLen);
        
        const imgNodeList = document.querySelectorAll('#_card_table>div');
        const imgArr = Array.prototype.slice.call(imgNodeList); 
        
        const card = cardDeck[randIndex];
        
        // el 객체 비교로 중복되는 값이 있는지 확인
        const include = imgArr.findIndex((cardDiv) => { return cardDiv === card.cardDiv; });
        
        if(include === -1){

            card.insertionImgEl(_card_table);

            count--;
        }
    }
}



function timer(){
    return Math.floor(( new Date() - startTimeSecond ) / 1000);
}

function drawTimer(){
    const timerDiv = document.querySelector(".clock div");
    timerDiv.innerHTML = timer()+'s';
}

function drawCounting(){
    const counterDiv = document.querySelector(".counter div");
    counterDiv.innerHTML = totalCount;
}