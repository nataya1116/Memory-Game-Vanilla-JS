
const exRankingJson = [ {"user":"지니","count":"20","second":"15"},
                        {"user":"지원","count":"22","second":"25"},
                        {"user":"석","count":"22","second":"54"},
                        {"user":"수진","count":"48","second":"32"}];

window.onload = function(){

    // 예시를 위해서 저장된 기록이 없을 경우 json 객체를 불러온다.
    const rankingArr = JSON.parse(getLocalStorage(KEY)) ?? exRankingJson;
    // const rankingArr = JSON.parse(getLocalStorage(KEY));

    console.log(getLocalStorage(KEY));

    // if(!rankingArr){
    //     _rankingDiv.innerHTML = "플레이 랭킹이 존재하지 않습니다. 도전해보세요.";
    //     return;
    // }

    const olTag = document.createElement("ol");

    rankingArr.map((recode)=>{
        const liTag = document.createElement("li");
        liTag.innerHTML = `${recode["user"]} 횟수 ${recode["count"]}회 시간 ${recode["second"]}초 `;
        olTag.appendChild(liTag);
    });

    _rankingDiv.appendChild(olTag);

}