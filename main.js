const playerMove = process.argv[2];

const moves = ["rock", "paper", "scissors"];

if (!moves.includes(playerMove)) {
    console.log("Invalid move! Please choose 'rock', 'paper', or 'scissors'.");
    process.exit();
}


const randomIndex = Math.floor(Math.random() * moves.length);
const computerMove = moves[randomIndex];


let result;
if (playerMove === computerMove) {
    result = "It's a tie!";
} else if (
    (playerMove === "rock" && computerMove === "scissors") ||
    (playerMove === "paper" && computerMove === "rock") ||
    (playerMove === "scissors" && computerMove === "paper")
) {
    result = `You win! You chose ${playerMove}, and the computer chose ${computerMove}.`;
} else {
    result = `You lose! You chose ${playerMove}, and the computer chose ${computerMove}.`;
}

console.log(result);
