const quizData = {
    easy: [
        { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Layout", "Hyperlink and Text Management Language", "Home Tool Markup Language"], answer: 0 },
        { question: "Which tag is used to create a paragraph in HTML?", options: ["<p>", "<div>", "<span>", "<h1>"], answer: 3 },
        { question: "Which attribute is used to add an image to an HTML page?", options: ["href", "src", "alt", "img"], answer: 1 },
        { question: "Which HTML tag is used to make text bold?", options: ["<bold>", "<b>", "<strong>", "<em>"], answer: 1 },
        { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Creative Style System", "Computer Styled Sheets", "Colorful Style Script"], answer: 0 },
        { question: "Which unit is used to define font size in CSS?", options: [ "cm", "kg","px", "sec"], answer: 2 },
        { question: "Which property changes the text color in CSS?", options: ["color", "text-color", "font-color", "background"], answer: 0 },
        { question: "Which HTML tag is used to create a table?", options: [ "<tab>", "<table>","<tbl>", "<tr>"], answer: 0 },
        { question: "Which symbol is used in CSS to select an ID?", options: ["#", ".", "@", "*"] , answer: 0 },
        { question: "Which of the following is a valid HTML closing tag?", options: ["<p/>", "<close>p</close>", "<p-end>","</p>"], answer: 3 }
    ],
    medium: [
        { question: "Which CSS property makes text bold?", options: ["font-style", "font-weight", "text-bold", "boldness"], answer: 1 },
        { question: "Which JavaScript function is used to print something in the console?", options: ["console.log()", "print()", "log()", "echo()"], answer: 0 },
        { question: "Which element is used to link an external CSS file?", options: ["<css>", "<link>", "<style>", "<stylesheet>"], answer: 1 },
        { question: "Which JavaScript keyword declares a constant variable?", options: ["let", "var", "const", "final"], answer: 2 },
        { question: "Which event is triggered when a user submits a form?", options: ["onchange", "onsubmit", "oninput", "onclick"], answer: 1 },
        { question: "Which CSS property makes an element invisible but keeps its space?", options: ["display: none", "opacity: 0", "visibility: hidden", "hide: true"], answer: 2 },
        { question: "Which HTML tag is used for the largest heading?", options: ["<h1>", "<h6>", "<header>", "<title>"], answer: 0 },
        { question: "Which operator is used for strict equality in JavaScript?", options: ["==", "===", "!=", "=!"], answer: 1 },
        { question: "Which property is used to make a website responsive?", options: ["flexbox", "grid", "@media", "responsive"], answer: 2 },
        { question: "Which JavaScript method removes the last element from an array?", options: ["pop()", "shift()", "splice()", "slice()"], answer: 0 }
    ],
    hard: [
        { question: "Which HTTP status code means 'Internal Server Error'?", options: ["400", "404", "500", "403"], answer: 2 },
        { question: "What does AJAX stand for?", options: ["Asynchronous JavaScript And XML", "Advanced JavaScript And XHTML", "Automated Java And XML", "Async JSON And XML"], answer: 0 },
        { question: "Which function in JavaScript returns a promise that resolves after a timeout?", options: ["setTimeout", "delay", "wait", "setInterval"], answer: 0 },
        { question: "What does the 'defer' attribute in a script tag do?", options: ["Loads script asynchronously", "Delays script execution until HTML is parsed", "Runs script after page loads", "Skips script execution"], answer: 1 },
        { question: "Which JavaScript feature allows defining variables with block scope?", options: ["var", "let", "const", "both let and const"], answer: 3 },
        { question: "Which CSS property controls element stacking order?", options: ["z-index", "layer", "order", "stack"], answer: 0 },
        { question: "Which function makes an HTTP request in JavaScript?", options: ["fetch()", "request()", "ajax()", "http()"], answer: 0 },
        { question: "Which CSS property is used for a sticky element?", options: ["position: relative", "position: fixed", "position: absolute", "position: sticky"], answer: 3 },
        { question: "Which algorithm has a time complexity of O(n log n) in its average case?", options: ["Bubble Sort", "Merge Sort", "Selection Sort", "Insertion Sort"], answer: 1 },
        { question: "Which JavaScript method is used to create a deep copy of an object?", options: ["JSON.stringify() + JSON.parse()", "Object.assign()", "cloneDeep()", "spread operator"], answer: 0 }
    ]
};

let currQuestion = 0;
let score = 0;
let mode = "";
let playerName = "";

const quizContainer = document.getElementById("quiz-container");
const optionsContainer = document.getElementById("options");
const questionElement = document.getElementById("question");
const scoreElement = document.getElementById("score");
const startContainer = document.getElementById("start-container");
const resultContainer = document.getElementById("result-container");
const resultMessage = document.getElementById("result-message");

function startQuiz(difficulty) {
    mode = difficulty;
    score = 0;
    currQuestion = 0;
    playerName = document.getElementById("player-name").value || "Player";
    startContainer.style.display = "none";
    quizContainer.style.display = "block";
    loadQuestion();
}

function loadQuestion() {
    let questionData = quizData[mode][currQuestion];
    questionElement.textContent = questionData.question;
    optionsContainer.innerHTML = "";
    
    questionData.options.forEach((option, index) => {
        let button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-btn");
        button.onclick = () => checkAnswer(index, button, questionData.answer);
        optionsContainer.appendChild(button);
    });

    scoreElement.textContent = `${playerName}'s Score: ${score}`;
}

function checkAnswer(selectedIndex, selectedButton, correctIndex) {
    let buttons = document.querySelectorAll(".option-btn");

    if (selectedIndex === correctIndex) {
        selectedButton.style.border = "4px solid #00e676"; // Green for correct
        score++;
    } else {
        selectedButton.style.border = "4px solid #ff5252"; // Red for wrong
        buttons[correctIndex].style.border = "4px solid #00e676"; // Highlight correct answer
    }

    setTimeout(() => {
        currQuestion++;
        if (currQuestion < quizData[mode].length) {
            loadQuestion();
        } else {
            showResults();
        }
    }, 1000); // 2-second delay before moving to the next question
}

function showResults() {
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";
    resultMessage.textContent = `Well done, ${playerName}! You scored ${score} out of ${quizData[mode].length}!`;
}
