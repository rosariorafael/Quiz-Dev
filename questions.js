// Jamie Morris Homework-4 Code Quiz 
// Var with array and object for questions 
var questions = [
    {
        title: "Sobre uma página HTML, assinale a alternativa que indica para que é utilizada a tag <select></select>.",
        choices: ["Representar um controle que apresenta um menu de opções", "Representar as opções de dentro de um menu", "Inserir links previamente selecionados", "Definir um texto selecionado para ficar em negrito"],
        answer: "Representar um controle que apresenta um menu de opções"
    },
    {
        title: "Se um elemento HTML possui o atributo ________, ele pode ser identificado na linguagem CSS por meio do caracter # (hashtag). Qual opção preenche corretamente a lacuna?",
        choices: ["id", "class", "tag", "fixed", "head"],
        answer: "class"
    },
    {
        title: "É sabido que Javascript é uma linguagem de tipagem dinâmica. Isso significa que:",
        choices: ["é sempre necessário declarar os tipos de variável antes da sua atribuição.", "os outputs funcionam automaticamente.", "as funções precisam ter um tipo na sua sintaxe de declaração.", "não é necessário declarar o tipo de variável antes de sua atribuição."],
        answer: "não é necessário declarar o tipo de variável antes de sua atribuição."
    },
    {
        title: "Em Javascript existem diferentes tipos de operadores, marque a alternativa que contém somente operadores relacionais?",
        choices: ["Typeof, In", "<=, >=, <<, >>", "In, Instanceof", "==, !="],
        answer: "In, Instanceof"
    },
    {
        title: "Na linguagem JavaScript, ao invocar o método getElementsByClassName, do objeto document, será retornado:",
        choices: ["Um objeto.", "Uma função.", "Um valor numérico.", "Um array."],
        answer: "Um array."
    },

];
// Declared variables
var score = 0;
var questionIndex = 0;

// Start working code 
// Declared variables
var currentTime = document.querySelector(".currentTime");
var timer = document.querySelector(".startTime");
var questionsDiv = document.querySelector(".questionsDiv");
var wrapper = document.querySelector(".wrapper");

// Segundos por pergunta:
var secondsLeft = 80;
// Tempo de intervalo
var holdInterval = 0;
// Penalclassad em segundos por erro
var penalty = 10;
// Creates new element
var ulCreate = document.createElement("ul");

// Triggers timer on button, shows user a display on the screen
timer.addEventListener("click", function () {
    // We are checking zero because its originally set to zero
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Tempo: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Seu tempo acabou!";
            }
        }, 1000);
    }
    render(questionIndex);
});

// Renders questions and choices to page: 
function render(questionIndex) {
    // Clears existing data 
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    // For loops to loop through all info in array
    for (var i = 0; i < questions.length; i++) {
        // Appends question title only
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }
    // New for each for question choices
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
// Event to compare choices with answer
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("class", "createDiv");
        // Correct condition 
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Acertou! A resposta correta foi:  " + questions[questionIndex].answer;
            // Correct condition 
        } else {
            // Will deduct -5 seconds off secondsLeft for wrong answers
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Errou! A resposta correta é:  " + questions[questionIndex].answer;
        }

    }
    // Question Index determines number question user is on
    questionIndex++;

    if (questionIndex >= questions.length) {
        // All done will append last page with user stats
        allDone();
        createDiv.textContent = "Você acertou  " + score + "/" + questions.length + " perguntas.";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);

}
// All done will append last page
function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    // Heading:
    var createH1 = document.createElement("h1");
    createH1.setAttribute("class", "createH1");
    createH1.textContent = "Fim!"

    questionsDiv.appendChild(createH1);

    // Paragraph
    var createP = document.createElement("p");
    createP.setAttribute("class", "createP");

    questionsDiv.appendChild(createP);

    // Calculates time remaining and replaces it with score
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = `Sua pontuação final foi: ${timeRemaining} pontos`;

        questionsDiv.appendChild(createP2);
    }

    // Label
    var createLabel = document.createElement("label");
    createLabel.setAttribute("class", "createLabel");
    createLabel.textContent = "Digite seu nome: ";

    questionsDiv.appendChild(createLabel);

    // input
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("class", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    // submit
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("class", "Submit");
    createSubmit.textContent = "Enviar";

    questionsDiv.appendChild(createSubmit);

    // Event listener to capture initials and local storage for initials and score
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // Travels to final page
            window.location.replace("./HighScores.html");
        }
    });

}


