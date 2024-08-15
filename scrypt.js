const player = document.getElementById('player');
const gameContainer = document.getElementById('gameContainer');
const scoreDisplay = document.getElementById('score');

let score = 0;
let intervalId;
let shapeIntervalId;
let difficultyLevel = 1;

// Mueve la esfera con el puntero del mouse
document.addEventListener('mousemove', (e) => {
    let x = e.clientX - gameContainer.getBoundingClientRect().left;
    let y = e.clientY - gameContainer.getBoundingClientRect().top;
    player.style.left = `${x - player.clientWidth / 2}px`;
    player.style.top = `${y - player.clientHeight / 2}px`;
});

// Genera las formas enemigas
function createShape() {
    const shape = document.createElement('div');
    shape.classList.add('shape');
    
    // Determina el tamaño y velocidad según el nivel de dificultad
    const size = Math.random() * (30 + difficultyLevel * 10) + 20; // Tamaño entre 20px y 30px + dificultad
    shape.style.width = `${size}px`;
    shape.style.height = `${size}px`;

    shape.style.top = `${Math.random() * (gameContainer.clientHeight - size)}px`;
    shape.style.left = `${Math.random() * (gameContainer.clientWidth - size)}px`;

    const speed = difficultyLevel * 0.5 + 1; // Velocidad de las formas

    shape.style.transition = `all ${speed}s linear`;

    gameContainer.appendChild(shape);

    // Mueve las formas enemigas hacia el jugador
    setTimeout(() => {
        shape.style.top = `${parseFloat(shape.style.top) + gameContainer.clientHeight}px`;
    }, 100);

    // Detecta colisiones
    shape.addEventListener('transitionend', () => {
        if (isCollision(player, shape)) {
            endGame();
        }
        gameContainer.removeChild(shape);
    });
}

// Verifica si hay colisión entre dos elementos
function isCollision(el1, el2) {
    const rect1 = el1.getBoundingClientRect();
    const rect2 = el2.getBoundingClientRect();

    return !(rect1.right < rect2.left ||
             rect1.left > rect2.right ||
             rect1.bottom < rect2.top ||
             rect1.top > rect2.bottom);
}

// Termina el juego
function endGame() {
    clearInterval(intervalId);
    clearInterval(shapeIntervalId);
    alert(`¡Juego terminado! Tiempo sobrevivido: ${Math.floor(score)} segundos`);
}

// Actualiza el temporizador y dificultad
function updateTimer() {
    score += 0.1;
    scoreDisplay.textContent = `Tiempo: ${Math.floor(score)} segundos`;
    if (Math.floor(score) % 15 === 0) {
        difficultyLevel += 1;
    }
}

// Configura el intervalo para generar formas enemigas
function startGame() {
    intervalId = setInterval(updateTimer, 100);
    shapeIntervalId = setInterval(createShape, 1000);
}

startGame();
