
var formqaContentEl = document.querySelector("#quiz-container");
var pagecontainer = document.querySelector("#container");

var titleH1 = document.createElement("h1");
var pContent = document.createElement("p");
var qaContentEl = document.createElement("div");
var ansContentEl = document.createElement("div");
var listtextAnsEl = document.createElement("li");
var correctAns;
var getScore = 0;
var totalScores = 0;

var nextQt = 0;
var totalQt = 0 ;
var totalElItemsQt = 0;
var minusTimer = 1;

// create  array to hold all the questions
var questions = [
    "Commonly used data types DOT Not Include:",
    "The condition in an if / else statement is enclosed with______.",
    "Arrays in JavaScript can be used to store__________.",
    "String values must be enclosed within__________ when being assigned to variables.",
    "A very useful tool used during development and debugging for printing content to the debugger is:"
];

// create array to hold all answers.
var answer = [
    "strings, booleans, alerts-crtans, numbers",
    "quotes, curly brackets-crtans, parenthesis, square brackets",
    "numbers and strings, other arrays, booleans, all of the above-crtans",
    "commas, curly brackets, quotes-crtans, parenthesis",
    "JavaScript, terminal/bash, for loops, console.log-crtans"
];

// create array to hold all score.
var scores = [
    "15",
    "10",
    "25",
    "20",
    "30"
];


// submit questions and answers to localstorage
localStorage.setItem("questions", JSON.stringify(questions));
localStorage.setItem("answers", JSON.stringify(answer));
localStorage.setItem("scores", JSON.stringify(scores));


//  add title and text to first screen 
titleH1.textContent = "Coding Quiz Challenge";
titleH1.className = "text-container";
pContent.innerHTML = "Try to answer the following code-related questions within the time limit."+ "<br />" + "Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
pContent.className = "text-container";

// create start quiz button
var btnButtonStartQuiz = document.createElement("div");
btnButtonStartQuiz.className = "btn-start-quiz";
btnButtonStartQuiz.setAttribute("id","btn-start-quiz");
btnButtonStartQuiz.textContent = "Start Quiz";

// retriev data from localstorages
var getDataQuestions = localStorage.getItem("questions");
var getDataAnswers = localStorage.getItem("answers");
var getDataScores = localStorage.getItem("scores");

totalQt = questions.length-1;

// parse  into array
getDataQuestions = JSON.parse(getDataQuestions);
getDataAnswers = JSON.parse(getDataAnswers);
getDataScores = JSON.parse(getDataScores);


function btnHandler(event) {
    // check which element which clecked
    var targetEl = event.target;
    if(targetEl.matches(".btn-start-quiz")) {
        titleH1.remove();
        pContent.remove();
        btnButtonStartQuiz.remove();
        arrShuffles (getDataQuestions, getDataAnswers, getDataScores);
        loadQuizs(nextQt);
        document.getElementById("countdown-timer").style.display = "block";
        countdownTimer(75);
    }

    if(targetEl.matches(".text-ans-container")) {
        var getElbyID = document.getElementById(targetEl.id);
        var getTextAnswer = getElbyID.innerText.toString();
        checkAnswer(getTextAnswer.trim(), correctAns.split("-")[0].trim()) 
    }

    if(targetEl.matches(".btn-go-back")) {
        location.reload();
    }

    if(targetEl.matches(".btn-view-high-score")) {
        localStorage.clear();
        document.getElementById("text-high-container").innerHTML = "Your score has cleared!";
    }
}

// Shuffles array for question showing in random
function arrShuffles(arr1,arr2, arr3) {
    var j, x, index;
    for(index=arr1.length-1; index>0; index--){
        j = Math.floor(Math.random() * (index + 1));
        
        x = arr1[index];
        arr1[index] = arr1[j];
        arr1[j] = x;

        x = arr2[index];
        arr2[index] = arr2[j];
        arr2[j] = x;

        x = arr3[index];
        arr3[index] = arr3[j];
        arr3[j] = x;

    }

    return arr1, arr2, arr3;
}


// load quiz from arry qustion, answers 
function loadQuizs(arrIndex){
    
    if (!getDataQuestions|| !getDataAnswers) {
        return false;
    }

    // load question
    var textQaEl = document.createElement("h2");
    textQaEl.setAttribute("id", "qa-text-id");
    textQaEl.textContent = getDataQuestions[arrIndex];
    formqaContentEl.appendChild(textQaEl);
    
    // load score
    getScore = getDataScores[arrIndex].trim();

    // load and split answer
    let ansItem = getDataAnswers[arrIndex];
    var ansItems = ansItem.split(",");
    
    // arransShuffles(ansItems);

    for(var j=0; j<ansItems.length; j++){

        y = (j + 1) + "." ;

        let correntAns = ansItems[j];
        const arrAnsCheck = correntAns.split("-");
        if(arrAnsCheck.length > 1) {
            correctAns = ansItems[j] + arrIndex;
        } 

        // add answers
        var divAnsEl =document.createElement("div");
        divAnsEl.className = "qa-ans-container";
        divAnsEl.setAttribute("id","qa-ans-container");
        divAnsEl.innerHTML = "<div class='li-text-ans-container' id='li-text-ans-container"+ j +"'>" + y +"</div>" + "<div class='text-ans-container' id='text-ans-container"+ j +"'>"+ arrAnsCheck[0] +"</div>";
        formqaContentEl.appendChild(divAnsEl);

        totalElItemsQt = totalElItemsQt + 1;
    }
}

// check correct answer from user clicked.
function checkAnswer(usrAns, correctAns){
    if (usrAns===correctAns){
        document.getElementById("footer").style.display = "block";
        document.getElementById("ans-result").innerHTML = "Correct!";
        setTimeout(() => {
            document.getElementById("footer").style.display = "none";
            loadQuiz2User();
        }, 1000);

        totalScores += Math.floor(getScore);

    }
    if(usrAns != correctAns){
        document.getElementById("footer").style.display = "block";
        document.getElementById("ans-result").innerHTML = "Incorrect!";
        minusTimer = 5;
        setTimeout(() => {
            document.getElementById("footer").style.display = "none";
            loadQuiz2User();
        }, 1000);

    }
}

// load next question after user clicked answer for question.
function loadQuiz2User() {
    if (totalQt > nextQt){
        document.getElementById("qa-text-id").remove();
        
        for(var i = 0; i < totalElItemsQt; i ++){
            var divAnsEl = "text-ans-container" + i
            var divAnsliEl = "li-text-ans-container" + i
            document.getElementById(divAnsEl).remove();
            document.getElementById(divAnsliEl).remove();
            document.getElementById("qa-ans-container").remove();
        }

        nextQt = nextQt + 1;
        totalElItemsQt = 0;
        loadQuizs(nextQt);

    }else {
        document.getElementById("qa-text-id").remove();
       
        for(var i = 0; i < totalElItemsQt; i ++){
            var divAnsEl = "text-ans-container" + i
            var divAnsliEl = "li-text-ans-container" + i
            document.getElementById(divAnsEl).remove();
            document.getElementById(divAnsliEl).remove();
            document.getElementById("qa-ans-container").remove();
        }

        // set final elements to on page.
        var h1ResultEl = document.createElement("h1");
        h1ResultEl.className="text-result";
        h1ResultEl.setAttribute("id", "text-result");
        h1ResultEl.textContent = "All done!";
        

        // show score
        var divShowScoreEl = document.createElement("div");
        divShowScoreEl.className = "final-score";
        divShowScoreEl.setAttribute("id", "final-score");
        

        var forminitEl = document.createElement("form");
        forminitEl.className = "form-ent-init";
        forminitEl.setAttribute("id", "form-ent-init");

        formqaContentEl.appendChild(h1ResultEl);
        divShowScoreEl.innerHTML = "Your final Score is <span><b>" + totalScores + "</b></span>";
        formqaContentEl.appendChild(divShowScoreEl);

        forminitEl.innerHTML = "Enter initial: " + "<input type='text' name='initial-name' class='text-input' placeholder='' id='initial-name' />" + " <button class='btn-save-result' id='btn-save-result' type='submit'>Submit</button>";
        formqaContentEl.appendChild(forminitEl);

    }
}

// timer funciton
var timeoutHandle;
function countdownTimer(seconds) {
    function tick() {
        var counter = document.getElementById("countdown-timer");
        counter.innerHTML = "Timer: " + String(seconds);
       
        if (minusTimer === 1) {
            seconds--;
       }else{
        seconds = seconds - minusTimer;
        minusTimer = 1;
        if (seconds < 1) seconds = 0;
       }
        if (seconds >= 0) {
            timeoutHandle = setTimeout(tick, 1000);
        }

        if(totalQt === nextQt) clearInterval(timeoutHandle);
    }
    tick();
}

// view score to user after submit and save to localStorage.
function saveFormHandler (event) {
    event.preventDefault();
    var initNameInput = document.getElementById("initial-name").value;

    document.getElementById("final-score").remove();
    document.getElementById("text-result").remove();
    document.getElementById("form-ent-init").remove();

    var h1HighScoreEl = document.createElement("h1");
    h1HighScoreEl.className="high-scores";
    h1HighScoreEl.setAttribute("id", "high-score");
    h1HighScoreEl.textContent = "High scores";
    formqaContentEl.appendChild(h1HighScoreEl);

    var textHighScoreEl = document.createElement("div");
    textHighScoreEl.className = "text-high-container";
    textHighScoreEl.setAttribute("id", "text-high-container");
    textHighScoreEl.textContent = "1. " + initNameInput + " - " + totalScores;
    formqaContentEl.appendChild(textHighScoreEl);

    var divEl =document.createElement("div");
    divEl.className = "btn-container";
    divEl.setAttribute("id","btn-container");
    divEl.innerHTML = "<div class='btn-go-back' id='btn-go-back'>Go back</div><div class='btn-view-high-score' id='btn-view-high-score'>View high score</div>";
    formqaContentEl.appendChild(divEl);

    // array for hold initname and score after they completed.
    var userScore = {
        initName:initNameInput,
        score:totalScores
    }

    // save to localStorage.
    localStorage.setItem("userScore",JSON.stringify(userScore));
      
}


// addEventListener to any div tag using event.target
pagecontainer.addEventListener("click", btnHandler);
formqaContentEl.addEventListener("submit", saveFormHandler);


formqaContentEl.appendChild(titleH1);
formqaContentEl.appendChild(pContent);
formqaContentEl.appendChild(btnButtonStartQuiz);

// hide footer and timer.
document.getElementById("footer").style.display = "none";
document.getElementById("countdown-timer").style.display = "none";