console.log("Welcome to Tic Tac Toe");
let music = new Audio("music.mp3");
let audioTurn = new Audio("ting.wav");
let gamewin = new Audio("gamewin.mp3");
let turn = "X";
let isgameover = false;

//Function to change the turn
const changeTurn = ()=>{
    return turn === "X"?"0": "X"
}

//Function to check for a win
const checkWin = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    wins.forEach(e => {
        if (
            boxtext[e[0]].innerText !== "" &&
            boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
            boxtext[e[1]].innerText === boxtext[e[2]].innerText
        ) {
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won";
            isgameover = true;
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";
            gamewin.play();
        }
    });
};


// Game logic
music.play();
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element =>{
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', ()=>{
        if(boxtext.innerText === ''){
            boxtext.innerText = turn;
            turn = changeTurn();
            audioTurn.play();
            checkWin();
            if (!isgameover){
                //check for draw (all boxes filled and no winner)
                const allFilled = Array.from(document.querySelectorAll('.boxtext'))
                    .every(box => box.innerText !== '');

                if (allFilled) {
                    document.querySelector('.info').innerText = "It's a Draw!!!😑";
                    isgameover = true;
                } else{
                    document.getElementsByClassName("info")[0].innerText = `Turn for ${turn}`;

                }
                
            }
            
        }
    })
})

//Add onclick listener to reset button
reset.addEventListener('click', ()=>{
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = ''
    });
    turn = "X";
    isgameover = false
    document.getElementsByClassName("info")[0].innerText = "Turn for" + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px"

    //stop and reset gamewin audio
    gamewin.pause();
    gamewin.currentTime = 0;
})


