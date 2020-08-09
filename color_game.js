/*  
    Filename: color_game.js
    Author: Joshua Santillan 
    CS 330
    Date: 7/28/20
    Descritpion: Manipulated the DOM and created an interactive web page game.
*/
//============================
//Helper Function declarations
//============================
const pickColor = () => {
    //Get Random # [0,5]
    const random = Math.floor(Math.random() * colors.length)
    return colors[random];
}
const generateRandomColor = () => {
    // pick r,g,b values between 0 and 255
    const r = Math.floor(Math.random() *256);
    const g = Math.floor(Math.random() *256);
    const b = Math.floor(Math.random() *256);
    //template sring return
   // `my sentance here ${r}`
    return `rgb(${r}, ${g}, ${b})`
}
const generateRandomColors = (num) => {
    // we use this so we can change difficulties
    // make an array and add "num" to array 
    let output = [];
    for (let i = 0; i < num; i++){
        output.push(generateRandomColor())
    }
    return output;
}
//reset the board 
const reset = () => {
    colors = generateRandomColors(numSquares); 
    pickedColor = pickColor();
    resetButton.textContent = "New Colors";
    colorDisplay.textContent = pickedColor;
    for(let i = 0; i < squares.length; i++){
        if(colors[i]){
            squares[i].style.backgroundColor = colors[i];
        } else{
            squares[i].style.backgroundColor = "black";
        }
    }
    title.style.backgroundColor = "steelblue";
    message.textContent = "";
    
}
//using an arrow function with a foreach paramater taking our square array we change the colors to be the same
const changeColors = (color) => {
    squares.forEach((square) => {
        square.style.backgroundColor = color;
    })
}
//===========================
//  INIT VARIABLES(state)
//===========================
let numSquares = 6;

//============================
//Select Elements
//============================
const squares = document.querySelectorAll(".square");
const colorDisplay = document.getElementById("colorDisplay");
const message = document.getElementById("message");
const title = document.querySelector("h1");
const resetButton = document.getElementById("resetButton")
const modeButtons = document.querySelectorAll(".mode");
let colors = generateRandomColors(numSquares); // setting board up on load
let pickedColor = pickColor(); //winning color chosen @ random
//===========================
//          MAIN CODE
//============================
function main(){   
    colorDisplay.textContent = pickedColor;
    resetButton.addEventListener("click",reset); // being referenced not called 
    modeButtons.forEach((button) => {
            button.addEventListener("click",function(){
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            modeButtons[2].classList.remove("selected");
            this.classList.add("selected");
            if(this.textContent === "Easy"){
                numSquares = 3;
            } else if(this.textContent === "Hard"){
                numSquares = 6;
            } else if(this.textContent === "Very Hard"){
                numSquares = 9;
            }
            reset();
        });
    }); 
    // initialize the squares changing their color to their randomly selected
    for (let i = 0; i < squares.length; i ++){
        squares[i].style.backgroundColor = colors[i];
        squares[i].addEventListener("click", function(){
        const clickedColor = this.style.backgroundColor;
        if (clickedColor === pickedColor){
            message.textContent = "Nice job!";
            changeColors(pickedColor);
            title.style.backgroundColor = pickedColor;
            resetButton.textContent = "Play Again?"
        }
        else{
             this.style.backgroundColor = "black";
            message.textContent = "Sorry, Try Again"
            }
        })
    };
}

main();
