const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;
let score = 0;

// Create a function to make a random time for mole to pop from the hole
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const index = Math.floor(Math.random() * holes.length);
    const hole = holes[index];

    // Prevent same hole from getting the same number
    if (hole === lastHole) {
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    const time = randomTime(400, 550); // Get a random time to determine how long mole should peep
    const hole = randomHole(holes); // Get the random hole from the randomHole function
    hole.classList.add('up'); // Add the CSS class so selected mole can "pop up"
    setTimeout(() => {
        hole.classList.remove('up'); // Make the selected mole "pop down" after a random time
        if (!timeUp) {
            peep();
        }
    }, time);
}

function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 25000) // Show random moles for 15 seconds
}

function wack(e) {
    if (!e.isTrusted) return; // ** new thing I learned */
    score++;
    this.parentNode.classList.remove('up'); // This refers to item clicked
    scoreBoard.textContent = score;
    showSparkler(this); // Show sparkler effect
}

function showSparkler(mole) {
    const sparkler = document.createElement('div');
    sparkler.classList.add('sparkler');
    mole.parentNode.appendChild(sparkler);
    setTimeout(() => sparkler.remove(), 500); // Remove the sparkler after the animation
}

moles.forEach(mole => mole.addEventListener('click', wack));
