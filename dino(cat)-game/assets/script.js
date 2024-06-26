const dino = document.getElementById("dino"); 
const cactus = document.getElementById("cactus"); 
const scoreElement = document.getElementById("score"); 
let score = 0; // Inicializa a pontuação
let isJumping = false; // Flag para verificar se o Dino está pulando

// Adiciona um listener para detectar teclas pressionadas
document.addEventListener("keydown", function(event) {
    jump(); // Chama a função de pulo ao pressionar qualquer tecla
});
document.addEventListener("touchstart", function(event) {
    jump(); // Chama a função de pulo ao tocar na tela
});

// Função para fazer o Dino pular
function jump() {
    if (!isJumping) { // Verifica se o Dino não está pulando
        isJumping = true; // Define que o Dino está pulando
        dino.classList.add("jump"); // Adiciona a classe de pulo ao Dino

        // Remove a classe de pulo após 600ms
        setTimeout(function() {
            dino.classList.remove("jump"); 
            isJumping = false; 
        }, 600); 
    }
}

// Verifica constantemente se o Dino está vivo
let isAlive = setInterval(function() {
    // Obtém as posições atuais do Dino e do Cacto
    let dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

    // Detecta colisão entre o Dino e o Cacto
    if (cactusLeft < 50 && cactusLeft > 0 && dinoBottom < 50) {
        alert("Game Over!"); 
        cactus.style.animation = "none"; // Para a animação do Cacto
        setTimeout(function() {
            cactus.style.animation = ""; 
        }, 0);
        score = 0; 
    } else {
        // Aumenta a pontuação se não houve colisão
        score++;
        scoreElement.textContent = score; 
    }
}, 10); // Verifica a cada 10ms
