"use strict";

var $btnStart = document.querySelector("#start");
var $game = document.querySelector("#game");
var score = 0;
var $time = document.querySelector("#time");

$btnStart.addEventListener("click", StartGame);

function StartGame() {
    $game.style.background = "#fff";
    $btnStart.style.display = "none";
    var interval = setInterval(function () {
        var time = parseFloat($time.textContent);
        if (time <= 0) {
            // END GAME
        } else {
            $time.textContent = (time - 0.1).toFixed(1);
        }

    }, 100);
    RenderBox();
}

$game.addEventListener("click", function (event) {
    if (event.target.classList.contains("box")) {
        score++;
        RenderBox();
    }
});


function RandomNum(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function RandArrLength(arr) {
    return arr[Math.round(Math.random() * arr.length)];
}

var boxParam = {
    colors: ["green", "black", "yellow", "red", "blue", "gold", "gray", "pink", "orange"]
};


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
    box.style.background = RandArrLength(boxParam.colors);
    $game.insertAdjacentElement('afterbegin', box);

}