const questions = [
    {
        question: "Who started hiphop ?",
        answers: [
            { text: "Eminem", correct: false},
            { text: "Coke la Rock", correct: true},
            { text: "Jayz", correct: false},
            { text: "J Hope", correct: false},
        ]
    },
    {
        question: "Who was the first female emcee on the earth?",
        answers: [
            { text: "Mc ShaRock", correct: true},
            { text: "Cardi B", correct: false},
            { text: "Nicki Minaj", correct: false},
            { text: "Missy Elliot", correct: false},
        ]
    },
    {
        question: "Miss Nandini Parashar are you willing to go out with Jatin Sharma ?",
        answers: [
            { text: "yes", correct: true},
            { text: "yes", correct: true},
            { text: "yes", correct: true},
            { text: "yes", correct: true},
        ]
    },
     {
        question: " How many shows did jayz do in 2006 in 1 day ?",
        answers: [
            { text: "5", correct: false},
            { text: "7", correct: true},
            { text: "6", correct: false},
            { text: "10", correct: false},
        ]
    },
     {
        question: " Will you go as per your plan , or should i excecute mine ?",
        answers: [
            { text: "mine", correct: false},
            { text: "yours", correct: true},
            { text: "mine", correct: false},
            { text: "mine", correct: false},
        ]
    },
       {
        question: "Name the album that k dot dropped last night",
        answers: [
            { text: "tpab", correct: false},
            { text: "gnx", correct: true},
            { text: "damn", correct: false},
            { text: "born sinner", correct: false},
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
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
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
});


startQuiz();
