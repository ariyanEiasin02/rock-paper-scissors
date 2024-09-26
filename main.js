const crypto = require('crypto');

const moves = process.argv.slice(2);

if (moves.length < 3 || moves.length % 2 === 0) {
    console.error("Please provide an odd number of moves, with at least 3.");
    process.exit(1);
}

const secretKey = crypto.randomBytes(32).toString('hex');

const computerMoveIndex = Math.floor(Math.random() * moves.length);
const computerMove = moves[computerMoveIndex];
const hmac = crypto.createHmac('sha256', secretKey).update(computerMove).digest('hex');

console.log("HMAC (proof of computer's move):", hmac);

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question(`Enter your move (${moves.join(', ')}): `, playerMove => {
    playerMove = playerMove.trim().toLowerCase();

    if (!moves.includes(playerMove)) {
        console.log(`Invalid move. Please choose from: ${moves.join(', ')}`);
        readline.close();
        process.exit(1);
    }

    console.log("Computer's move:", computerMove);
    console.log("HMAC key:", secretKey);

    const playerMoveIndex = moves.indexOf(playerMove);
    const half = Math.floor(moves.length / 2);

    let result;
    if (playerMove === computerMove) {
        result = "It's a tie!";
    } else if (
        (playerMoveIndex < computerMoveIndex && computerMoveIndex - playerMoveIndex <= half) ||
        (playerMoveIndex > computerMoveIndex && playerMoveIndex - computerMoveIndex > half)
    ) {
        result = `Computer wins! You chose ${playerMove}, and the computer chose ${computerMove}.`;
    } else {
        result = `You win! You chose ${playerMove}, and the computer chose ${computerMove}.`;
    }

    console.log(result);

    readline.close();
});
