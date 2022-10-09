

const recodeBtn = document.querySelector("#_recode button");
const recodeInput = document.querySelector("#_recode input");

if(recodeBtn){
    recodeBtn.onclick = function(){
        
        if(!recodeInput.value){
            alert("이용자명을 입력해주세요.");
            recodeInput.focus();
            return;
        }

        const timerDiv = document.querySelector(".clock div");

        const timerSecond = timerDiv.innerHTML.replace("s", "");

        const counterDiv = document.querySelector(".counter div");

        const totalCount = counterDiv.innerHTML;

        //로컬 스토리지에서 json 문자열로 저장되어 있던 값을 받아서 객체로 바꿔 저장해준다. 저장된 값이 없을 경우 빈 객체를 저장해준다.
        const rankingArr = JSON.parse(getLocalStorage(KEY)) ?? [];


        rankingArr.push({ user : recodeInput.value,
                          count : totalCount,
                          second : timerSecond});
        console.log(rankingArr);
        
        // 기록이 1개 초과일 경우 순위를 sort한다.
        if(rankingArr.length > 1){
            sortingRankinArr(rankingArr);
        }

        // 랭킹 배열을 로컬 스토리지에 저장한다.
        setLocalStorage(KEY, JSON.stringify(rankingArr));
        console.log(rankingArr);
        location.href = "ranking.html";
    }
}


function sortingRankinArr(rankingArr){
    rankingArr.sort((a, b)=>{
        // 순위 기준은 count이고 count가 같을 경우 시간이 기준이다.
        if(Number(a["count"]) < Number(b["count"])) return -1;
        if(Number(a["count"]) > Number(b["count"])) return 1;
        if(Number(a["second"]) < Number(b["second"])) return -1;
        if(Number(a["second"]) > Number(b["second"])) return 1;
    });
}

