"use strict";
//variables
var $btnStart = document.querySelector("#start");

var $game = document.querySelector("#game");
var $gameTime = document.querySelector("#game-time");

var $time = document.querySelector("#time");
var $timeHeader = document.querySelector("#time-header");

var $result = document.querySelector("#result");
var $resultHeader = document.querySelector("#result-header");

var score = 0;
var isGameStarted = false;

var colors = ["green", "black", "yellow", "red", "blue", "gold", "gray", "pink", "orange"];

//listeners
$btnStart.addEventListener("click", StartGame);
$game.addEventListener("click", clickBox);
$gameTime.addEventListener("input", setGameTime);


//function
function StartGame() {
    score = 0;
    setGameTime();
    isGameStarted = true;
    $gameTime.disabled = true;
    $game.style.background = "#fff";
    $btnStart.style.display = "none";

    var interval = setInterval(function () {
        var time = parseFloat($time.textContent);
        if (time <= 0) {
            clearInterval(interval);
            EndGame();
        } else {
            $time.textContent = (time - 0.1).toFixed(1);
        }

    }, 100);
    RenderBox();
}

function EndGame() {
    isGameStarted = false;
    $game.style.background = "#ccc";
    $btnStart.style.display = "block";
    $game.innerHTML = "";

    $resultHeader.classList.remove("hide");
    $result.textContent = score;
    $timeHeader.classList.add("hide");
    $gameTime.disabled = false;
}

function setGameTime() {
    $time.textContent = $gameTime.value;
    $timeHeader.classList.remove("hide");
    $resultHeader.classList.add("hide");
}

function clickBox(event) {
    if (!isGameStarted) {
        return;
    }

    if (event.target.classList.contains("box")) {
        score++;
        RenderBox();
    }
}

function RandomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function RandArrLength(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function RenderBox() {
    $game.innerHTML = "";
    var boxSize = RandomNum(30, 100);
    var gameSize = $game.getBoundingClientRect();
    var maxTop = gameSize.height - boxSize;
    var maxLeft = gameSize.width - boxSize;

    var box = document.createElement("div");
    box.classList.add("box");
    box.style.height = box.style.width = boxSize + "px";
    box.style.left = RandomNum(0, maxLeft) + "px";
    box.style.top = RandomNum(0, maxTop) + "px";
    box.style.background = RandArrLength(colors);
    $game.insertAdjacentElement('afterbegin', box);

}