const container = document.querySelector('.game')

const elMaker = (elType, elParent, elClass, html) => {
    const ele = document.createElement(elType)
    elParent.append(ele)
    ele.classList.add(elClass)
    ele.innerHTML = html
    return ele
}

// items which need to be popped
const items = ["A", "B", "C"]

// Global mai object
const game = {
    score: 0,
    bubbles: [],
    ani: {},
    total: 100
}

// we need an option for the score
const scoreBoard = elMaker('div', container, 'scoreBoard', "SCORE")
const gameBoard = elMaker('div', container, 'gameBoard', "GAMEBOARD")
const message = elMaker('div', container, 'message', "MESSAGE")
const btn = elMaker('button', message, 'btn', 'CLICK TO START')

btn.addEventListener('click', startGame)



function startGame() {
    btn.style.display = 'none';
    game.score = 0
    gameBoard.innerHTML = ""
    message.innerHTML = "Click the bubbles"
    scoreUpdater();
    game.ani = window.requestAnimationFrame(mover)
}



function mover() {
    genBubbles()
    const allBubbles = document.querySelectorAll('.bubble')
    allBubbles.forEach((bubble) => {
        // geting X and Y position
        const pos = [bubble.offsetLeft, bubble.offsetTop]
        const speed = bubble.speed
        pos[1] -= speed
        bubble.style.top = pos[1] + 'px'
    })
    game.ani = window.requestAnimationFrame(mover)


}



// in bellow functin we should have a function to generate bubbels
function genBubbles() {
    game.total--;
    message.innerHTML = `Bubbles Left ${game.total}`
    if (game.total < 0) {
        window.cancelAnimationFrame(game.ani)
        message.innerHTML = "Game Over"
    } else {
        // the bubbles that we create we should add to  the bubbles array
        const bubble = elMaker('div', gameBoard, 'bubble', "A")
        game.bubbles.push(bubble)
        bubble.speed = ran(1, 10)
        bubble.style.left = ran(0, 500) + 'px'
        bubble.style.top = ran(0, 500) + 500 + 'px'
    }

}


// create a functon to update the scoreboard
function scoreUpdater() {
    scoreBoard.innerHTML = `You Score : ${game.score}`;
}


// this function will return a number between a range
function ran(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}