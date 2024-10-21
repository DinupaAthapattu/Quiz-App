const questions = [
    {
        question: "What is the capital city of France?",
        answers: [
            {text: "Berlin", Correct: false},
            {text: "London", Correct: false},
            {text: "Paris", Correct: true},
            {text: "Marid", Correct: false},
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            {text: "Jupiter", Correct: false},
            {text: "Mars", Correct: true},
            {text: "Venus", Correct: false},
            {text: "Saturn", Correct: false},
        ]
    },
    {
        question: "Who wrote the play Romeo and Juliet?",
        answers: [
            {text: "William Shakespeare", Correct: true},
            {text: "Jane Austen", Correct: false},
            {text: "Charles Dickens", Correct: false},
            {text: "Scott Fitzgerald", Correct: false},
        ] 
    },
    {
        question: "What is the chemical symbol for water?",
        answers: [
            {text: "O2", Correct: false},
            {text: "CO2", Correct: false},
            {text: "H2O", Correct: true},
            {text: "N2", Correct: false},
        ] 
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.Correct){
            button.dataset.Correct = answer.Correct;
        }
        button.addEventListener("click", selectAnswer)
    })
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.Correct === "true"
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.Correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Try Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz()