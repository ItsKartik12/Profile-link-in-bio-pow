(() => {
    // Retain variables within an isolated block scope
    let intervalId = null;
    const HEX_CHARS = '0123456789ABCDEF';

    // DOM References Cache
    const bodyTarget = document.body;
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');

    /**
     * Generates a structural 6-digit hex string.
     * Uses bitwise pooling or fast string indexing for optimal efficiency.
     */
    const generateHexColor = () => {
        let hexString = '#';
        for (let i = 0; i < 6; i++) {
            hexString += HEX_CHARS[Math.floor(Math.random() * 16)];
        }
        return hexString;
    };

    const beginColorShift = () => {
        if (intervalId !== null) return; // Safeguard interface state

        // Toggle button active visuals instantly
        startButton.disabled = true;
        stopButton.disabled = false;
        startButton.style.opacity = '0.5';
        stopButton.style.opacity = '1';

        intervalId = setInterval(() => {
            const nextColor = generateHexColor();
            bodyTarget.style.backgroundColor = nextColor;
        }, 1000);
    };

    const terminateColorShift = () => {
        if (intervalId === null) return;

        clearInterval(intervalId);
        intervalId = null;

        // Reset system buttons interaction flags
        startButton.disabled = false;
        stopButton.disabled = true;
        startButton.style.opacity = '1';
        stopButton.style.opacity = '0.5';
    };

    // Attach Event Infrastructure
    startButton.addEventListener('click', beginColorShift);
    stopButton.addEventListener('click', terminateColorShift);

    // Run baseline check to initialize system button states
    stopButton.disabled = true;
    stopButton.style.opacity = '0.5';
})();