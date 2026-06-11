// Scope isolation block via IIFE to prevent global namespace pollution
(() => {
    let targetNumber = generateRandomTarget();
    let preGuesses = [];
    const MAX_ATTEMPTS = 10;
    let playGame = true;

    // DOM Engine Queries
    const gameForm = document.querySelector("#game-form");
    const userInput = document.querySelector("#Guess");
    const previousGuessDisplay = document.querySelector("#PreviousGuess");
    const remainingDisplay = document.querySelector("#GuessRemaining");
    const feedbackPrimary = document.querySelector("#lowOrHi");
    const feedbackSecondary = document.querySelector("#lowOrHii");
    const resultContainer = document.querySelector(".resultParas");

    // Memory recycling container for dynamic reset element
    const resetWrapper = document.createElement("div");

    function generateRandomTarget() {
        return Math.floor(Math.random() * 100) + 1;
    }

    // Capture explicit Form Submission rather than button clicks
    gameForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!playGame) return;

        const currentGuess = parseInt(userInput.value, 10);
        processTurn(currentGuess);
    });

    function processTurn(guess) {
        if (isNaN(guess) || guess < 1 || guess > 100) {
            alert("Boundary violation: Provide an integer between 1 and 100.");
            return;
        }

        preGuesses.push(guess);
        updateDisplayMatrix(guess);
        evaluateGameLogic(guess);
    }

    function updateDisplayMatrix(guess) {
        userInput.value = "";
        // Secure context mutation utilizing textContent to mitigate injection vulnerabilities
        previousGuessDisplay.textContent = preGuesses.join(", ");
        remainingDisplay.textContent = String(MAX_ATTEMPTS - preGuesses.length);
    }

    function evaluateGameLogic(guess) {
        const attemptsUsed = preGuesses.length;

        // 1. Check for immediate termination success criteria
        if (guess === targetNumber) {
            renderFeedback("Congratulations! You guessed it!", "guessLow");
            feedbackSecondary.textContent = "Flawless Execution.";
            triggerGameTermination();
            return;
        }

        // 2. Check for ultimate exhaustion criteria
        if (attemptsUsed >= MAX_ATTEMPTS) {
            renderFeedback(`Game Over! The target was ${targetNumber}`, "guessHigh");
            feedbackSecondary.textContent = "Strategic depletion reached.";
            triggerGameTermination();
            return;
        }

        // 3. Compute continuous execution hints
        const structuralDelta = Math.abs(guess - targetNumber);
        if (structuralDelta <= 10) {
            feedbackSecondary.textContent = "Proximity Status: Thermal Lock (Very Closeout)!";
        } else {
            feedbackSecondary.textContent = "";
        }

        if (guess < targetNumber) {
            renderFeedback("Low! Try again.", "guessLow");
        } else {
            renderFeedback("High! Try again.", "guessHigh");
        }
    }

    function renderFeedback(message, dynamicClass) {
        feedbackPrimary.textContent = message;
        // Re-align structural theme flags matching CSS declarations
        feedbackPrimary.className = "";
        if (dynamicClass) {
            feedbackPrimary.classList.add(dynamicClass);
        }
    }

    function triggerGameTermination() {
        userInput.value = "";
        userInput.disabled = true;
        playGame = false;

        // Inject standalone reset action component
        resetWrapper.innerHTML = `<button id="newGame" type="button" style="width:100%; margin-top:20px; background:linear-gradient(135deg, #2b9348, #007200); box-shadow: 0 6px 20px rgba(43, 147, 72, 0.3);">Start New Game</button>`;
        resultContainer.appendChild(resetWrapper);

        document.querySelector("#newGame").addEventListener("click", resetSystemState);
    }

    function resetSystemState() {
        targetNumber = generateRandomTarget();
        preGuesses = [];
        playGame = true;

        previousGuessDisplay.textContent = "";
        remainingDisplay.textContent = String(MAX_ATTEMPTS);
        userInput.disabled = false;

        renderFeedback("", "");
        feedbackSecondary.textContent = "";

        if (resultContainer.contains(resetWrapper)) {
            resultContainer.removeChild(resetWrapper);
        }
        userInput.focus();
    }
})();