let currentQuestion = 0;
let score = 0;

const quizData = [
    {
        question: "What is Javascript ?",
        options: ["Programming Language", "Scripting Language", "Markup Language", "Both A and B"],
        correct: "Both A and B",
    },

    {
        question: "Which of the following uses javascript?",
        options: ["Web Development", "Mobile App Development", "Game Development", "All of the above"],
        correct: "All of the above",
    }
]

const questions = document.querySelector("p");
const option = document.querySelectorAll("input[name = 'answer']");
const nextbtn = document.querySelector("button");


nextbtn.disabled = true;


function loadquestion() {
    const current = quizData[currentQuestion];

    questions.textContent = current.question;
    document.getElementById("progress").textContent = 
     `Question ${currentQuestion + 1} of ${quizData.length}`;

    option.forEach((option, index) => {
        option.checked = false;
        option.nextElementSibling.textContent = current.options[index];

        option.parentElement.classList.remove("correct", "wrong");
    });

    nextbtn.disabled = true;
}

option.forEach((opt) => {
        opt.addEventListener("change" ,() => {
            nextbtn.disabled = false;
        });
    });

function getSelectedAnswer() {
    let selected = null;

    option.forEach((opt) => {
        if(opt.checked) {
            selected = opt.nextElementSibling.textContent;
        }
    });

    return selected;
}

nextbtn.addEventListener("click" , () => {
    const selectedAnswer =  getSelectedAnswer();

    if(!selectedAnswer) return;

    // if (selectedAnswer === quizData[currentQuestion].correct) {
    //     score++;
    // }

    // currentQuestion++;

    // if(currentQuestion < quizData.length) {
    //     loadquestion();
    // } else {
    //     alert("Quiz is Finished! Your score is : " +  score);
    // }

    option.forEach((opt) => {
        const label = opt.parentElement;
        // label.classList.remove("correct" , "wrong");

        if(opt.nextElementSibling.textContent === quizData[currentQuestion].correct) {
            label.classList.add("correct");
        }

        if(opt.checked && opt.nextElementSibling.textContent !== quizData[currentQuestion].correct) {
            label.classList.add("wrong");
        }
    });

    if(selectedAnswer === quizData[currentQuestion].correct) {
        score++;
    }

    setTimeout(() => {
        currentQuestion++;

        if(currentQuestion < quizData.length) {
            loadquestion();
        } else {
            showResult();
        }
    }, 1000);
});

function showResult() {
    document.querySelector(".quiz").style.display = "none";
    document.getElementById("result").style.display = "block";
    document.getElementById("scoreText").textContent = 
    score + " / " + quizData.length;
}

loadquestion();