const container = document.querySelector('.container')
let grid = document.querySelectorAll('.game')
const playInfo = document.querySelector('.info')
let xToPlay = true
// display range value
const slider = document.querySelector('#grid-size')
const sliderInfo = document.querySelector('.range-info')
let size = 3
slider.value = size
sliderInfo.innerHTML = '3'

// Initializes grid to be ready to play
initGrid()

// Handles resizing of the grid
slider.addEventListener('input', (e) => {
    size = Number(e.target.value)
    sliderInfo.innerHTML = size
    resize()
    grid = document.querySelectorAll('.game')
    initGrid()
})

// Resets the grid
const restartBtn = document.querySelector('#restart')
restartBtn.addEventListener('click', initGrid)

// Handles the flow of the game
function play(e) {
    if (xToPlay) {
        e.target.innerHTML = 'X'
        playInfo.innerHTML = "O's turn"
    } else {
        e.target.innerHTML = 'O'
        playInfo.innerHTML = "X's turn"
    }
    if (isWinner(size)) {
        for (const square of grid) {
            square.removeEventListener('click', play)
        }
        playInfo.innerHTML = xToPlay ? 'X wins!' : 'O wins!'
        container.classList.add('container-win')

        return
    }
    if (isTie()) {
        container.classList.add('container-draw')
        playInfo.innerHTML = "It's a draw!"
    }
    xToPlay = !xToPlay
    e.target.removeEventListener('click', play)
}

//restart
function initGrid() {
    for (const square of grid) {
        square.addEventListener('click', play)
        square.innerHTML = ''
    }
    container.classList.remove('container-win')
    container.classList.remove('container-draw')
    xToPlay = true
    playInfo.innerHTML = "X's turn"
}

// determines if there is a winner
function isWinner(size) {
    let winCombinations = getWinCombinations(size)
    const xWins = 'X'.repeat(size)
    const oWins = 'O'.repeat(size)

    for (const combination of winCombinations) {
        const result = combination.reduce((acc, value) => {
            return acc + grid[value].innerHTML
        }, '')
        if (result === xWins || result === oWins) {
            return true
        }
    }
    return false
}

function getWinCombinations(size) {
    const winCombinations = []
    let combination = []
    for (let i = 0; i < size ** 2; i++) {
        combination.push(i)
        if (combination.length === size) {
            winCombinations.push(combination)
            combination = []
        }
    }
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size ** 2; j++) {
            if (j % size == i) {
                combination.push(j)
            }
        }
        winCombinations.push(combination)
        combination = []
    }
    for (let i = 0; i < size ** 2; i++) {
        if (i % (size + 1) === 0) {
            combination.push(i)
        }
    }
    winCombinations.push(combination)
    combination = []
    for (let i = 0; i < size ** 2; i++) {
        if (i % (size - 1) === 0 && i !== 0 && i !== size ** 2 - 1) {
            combination.push(i)
        }
    }
    winCombinations.push(combination)
    return winCombinations
}

//determines if the game is a tie
function isTie() {
    for (const square of grid) {
        if (square.innerHTML.length == 0) {
            return false
        }
    }
    return true
}

// Resizes the grid
function resize() {
    container.style.width = `${slider.value * 100}px`
    container.innerHTML = ''
    const squares = []
    for (let i = 0; i < slider.value ** 2; i++) {
        const square = document.createElement('div')
        square.classList.add('game')
        squares.push(square)
    }
    container.append(...squares)
}
