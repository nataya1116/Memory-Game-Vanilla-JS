const gameConsole = document.querySelector("#_game_icon");

const rankingMenu = document.querySelector("#_ranking");
const settingsMenu = document.querySelector("#_settings")

const diff16 = document.querySelector("#_diff16");

if(gameConsole){
    gameConsole.onmouseenter = function(){
        gameConsole.src = "img/icon/game-console-hover.png";
    }
    gameConsole.onmouseleave = function(){
        gameConsole.src = "img/icon/game-console.png";
    }    
}

if(rankingMenu){
    rankingMenu.onclick = function(){
        location.href = "ranking.html";
    }
    rankingMenu.onmouseenter = function(){
        rankingMenu.src = "img/icon/first-prize-hover.png";
    }
    rankingMenu.onmouseleave = function(){
        rankingMenu.src = "img/icon/first-prize.png";
    }  
}

if(settingsMenu){
    settingsMenu.onclick = function(){
        alert("준비 중 입니다.");
    }
    settingsMenu.onmouseenter = function(){
        settingsMenu.src = "img/icon/settings-hover.png";
    }
    settingsMenu.onmouseleave = function(){
        settingsMenu.src = "img/icon/settings.png";
    }  
}

if(diff16){
    diff16.onclick = function(){
        location.href = "game.html";
    }
    diff16.onmouseenter = function(){
        diff16.style.backgroundColor = "rgb(166, 219, 166)"
    }
    diff16.onmouseleave = function(){
        diff16.style.backgroundColor = "rgb(206, 248, 206)"
    }
    // background-color: rgb(206, 248, 206);
}
