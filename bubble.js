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
    total: 0,
    // how many bublles we have popped
    counter: 0,
    ready: 0
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
    game.total = 20
    Gamepad.ready = game.total
    game.counter = 0
    gameBoard.innerHTML = ""
    message.innerHTML = "Click the bubbles"
    scoreUpdater();
    game.ani = window.requestAnimationFrame(mover)
}



function mover() {
    genBubbles()
    const allBubbles = document.querySelectorAll('.bubble')
    if (game.ready <= game.total) {
        game.ready++;
        message.innerHTML = `Bubbles Left ${game.ready - game.counter}`
    }
    allBubbles.forEach((bubble) => {
        // geting X and Y position
        const pos = [bubble.offsetLeft, bubble.offsetTop]
        let speed = bubble.speed
        console.log(pos)
        pos[1] -= speed

        if (pos[1] < -100) {
            bubble.remove()
            game.total++
            game.score--;
            scoreUpdater()
        }
        bubble.style.top = pos[1] + 'px'
        bubble.style.left = pos[0] + 'px'

    })
    game.ani = window.requestAnimationFrame(mover)

    console.log("its running")
}



// in bellow functin we should have a function to generate bubbels
function genBubbles() {

    if (game.total < 0) {
        window.cancelAnimationFrame(game.ani)
        message.innerHTML = "Game Over"
    } else {
        const cSize = gameBoard.getBoundingClientRect();
        // the bubbles that we create we should add to  the bubbles array
        const bubble = elMaker('div', gameBoard, 'bubble', items[ran(0, items.length)])
        game.bubbles.push(bubble)
        bubble.speed = ran(1, 10)
        bubble.style.transform = `scale(${ran(0.5, 3)})`
        bubble.style.left = ran(0, cSize.width - 40) + 'px'
        bubble.style.top = ran(0, cSize.height - 40) + 500 + 'px'
        bubble.style.backgroundColor = `rgb(${ran(0, 255)},${ran(0, 255)},${ran(0, 255)})`
        bubble.addEventListener('mouseover', e => {
            game.score += 10;
            // every time we get one of the bubbels we increase counter by one
            game.counter++
            scoreUpdater()
            bubble.remove();
        })
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