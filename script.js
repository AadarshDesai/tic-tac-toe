let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");
let newGame = document.querySelector("#new");
let congratsGif = document.querySelector("#congrats1");
let drawGif = document.querySelector("#draw");
let turn0 = true;
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [0 ,3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const reset = () =>{
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    congratsGif.classList.add("hide");
    drawGif.classList.add("hide");
    count = 0
}

resetBtn.addEventListener("click" , reset);
newGame.addEventListener("click" , reset);
boxes.forEach(box => {
    box.addEventListener("click" , () =>{
        if(turn0){
            box.innerText = "O";
            box.style.color = "red";
            turn0=false;
        }
        else{
            box.innerText = "X";
            box.style.color = "green";
            turn0 = true;
        }
        checkWinner();
        box.disabled = true;
        if(count == 8){
            msgContainer.classList.remove("hide");
            msg.innerText = `Try Again , Match Is Draw`;
            count = -1;
            congratsGif.classList.add("hide");
            drawGif.classList.remove("hide");
        }
        count++
    })
});

const showWinner = (winner) => {
    msgContainer.classList.remove("hide");
    congratsGif.classList.remove("hide");
    drawGif.classList.add("hide");
    msg.innerText = `Congratulations , Winner Is ${winner}`;
}

const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val == pos2Val && pos2Val == pos3Val){
                boxes.forEach(box =>{
                    box.disabled = true;
                    count=0;
                    showWinner(pos1Val);
                });
            }
                
            
        }
    }
}


const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
    }
}

const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}