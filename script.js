function appendValue(value) {
    document.getElementById('display').value += value;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function backspace() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

function calculate() {
    const display = document.getElementById('display');
    let input = display.value;

    // Check for unbalanced parentheses
    if (input.split('(').length !== input.split(')').length) {
        display.value = "Error";
        return;
    }

    // Replace sin, cos, tan with their respective Math functions
    input = input.replace(/sin\(([^)]+)\)/g, 'Math.sin(degreesToRadians($1))');
    input = input.replace(/cos\(([^)]+)\)/g, 'Math.cos(degreesToRadians($1))');
    input = input.replace(/tan\(([^)]+)\)/g, 'Math.tan(degreesToRadians($1))');

    // Handle permutations and combinations
    input = input.replace(/(\d+)P(\d+)/g, 'permutation($1, $2)');
    input = input.replace(/(\d+)C(\d+)/g, 'combination($1, $2)');

    // Attempt to evaluate the expression
    try {
        const result = eval(input);
        display.value = result !== undefined ? result : "Error";
    } catch {
        display.value = "Error";
    }
}

// Convert degrees to radians
function degreesToRadians(degrees) {
    const value = parseFloat(degrees);
    if (isNaN(value)) {
        return 0; // Default to 0 for invalid inputs
    }
    return value * (Math.PI / 180);
}

function appendFunction(func) {
    const display = document.getElementById('display');
    const lastChar = display.value.charAt(display.value.length - 1);

    // If the last character is a number or a closing parenthesis, append the function
    if (/[0-9)]/.test(lastChar)) {
        display.value += ` * ${func}(`; // Insert multiplication for function call
    } else {
        display.value += `${func}(`; // Just append the function
    }
}

// Permutation function
function permutation(n, r) {
    if (r > n) return 0;
    return factorial(n) / factorial(n - r);
}

// Combination function
function combination(n, r) {
    if (r > n) return 0;
    return factorial(n) / (factorial(r) * factorial(n - r));
}

// Factorial function
function factorial(n) {
    if (n < 0) return 0;
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Detect the closing parenthesis for auto calculation
document.getElementById('display').addEventListener('input', function(event) {
    const display = event.target.value;
    if (display.endsWith(')')) {
        calculate();
    }
});
