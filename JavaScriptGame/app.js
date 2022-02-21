const hole = document.querySelector("#hole")
const block = document.querySelector("#block")
const character = document.querySelector("#character")
const scoreKeeper = document.querySelector("#scoreKeeper")
const highScore = document.querySelector("#highScore")
let jumping = 0;
let counter = 0;
let highest = 0;

//generates a new random hole
hole.addEventListener("animationiteration", () => {
    const rand = -((Math.floor(Math.random()*300)) + 150);
    hole.style.top = `${rand}px`;
    counter++;
})

//simulates gravity/touching a pipe
setInterval(function(){
    //simulates gravity
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    if(jumping==0){
        character.style.top = (characterTop+3)+"px";
    }
    const blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    const holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
    const cTop = -(500-characterTop);

    if(counter !== 0){
    scoreKeeper.innerHTML = counter - 1;
    }

    //keeping track of highscore
    if (highest < counter){
        highest = counter;
        highScore.innerHTML = highest - 1;
    }

    //death condition
    if((characterTop>480)||((blockLeft<20)&&(blockLeft>-50)&&((cTop<holeTop)||(cTop>holeTop+130)))){
        alert(`Game over. Final Score : ${counter-1}`);
        character.style.top = 100 + "px";
        counter = 0;
    
    //choosing random colors for the dot
    const random = (Math.floor(Math.random() * 11))
    if(random >= 0 && random < 4 ){
        character.style.backgroundColor = "red"
    }
    if(random >= 4 && random < 8 ){
        character.style.backgroundColor = "blue"
    }
    if(random >= 8 && random <= 11 ){
        character.style.backgroundColor = "yellow"
    }
    }

},10);

//simulates a jump using a click
function jump(){
    jumping = 1;
    let jumpCount = 0;
    var jumpInterval = setInterval(function(){
        var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        if (characterTop>6 && jumpCount<15 ){
            character.style.top = (characterTop-5)+"px";
        }
        if(jumpCount>20){
            clearInterval(jumpInterval);
            jumping=0;
            jumpCount=0;
        }
        jumpCount++;
    },10);
}
