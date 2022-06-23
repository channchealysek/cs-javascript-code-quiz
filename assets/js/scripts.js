
var hearderContainerEl = document.querySelector("#header");
var startQaContainerEl = document.querySelector("#start-qa-container");
var qAAnsContainerEl = document.querySelector("#qaans-container");
var footerContainerEl = document.querySelector("#footer-container");

// create header elements - veiw high score and timer

// variable minus timer with wrong answer clicked
var minusTimer = 0;
var getScore = 0;
var totalScores = 0;

var numQuestion2Load = 1;
var totalQt = 0 ;
var totalElItemsQt = 0;

var usrAns; 
var correctAns;
var initNameInput;

var getScoreFromCurrentUser = 0;

var viewHighScoreEl = document.createElement("div");
var timerCountdown = document.createElement("div");

viewHighScoreEl.className = "view-high-score";
viewHighScoreEl.setAttribute("id", "view-high-score");
viewHighScoreEl.textContent = "View High Scores";
hearderContainerEl.appendChild(viewHighScoreEl);

timerCountdown.className = "countdown-timer";
timerCountdown.setAttribute("id", "countdown-timer");
timerCountdown.textContent = "Timer: 00";
hearderContainerEl.appendChild(timerCountdown);

var arrQuestions = {
    qa:{
        qa1:"Commonly used data types DOT Not Include:",
        qa2:"The condition in an if / else statement is enclosed with______.",
        qa3:"Arrays in JavaScript can be used to store__________.",
        qa4:"String values must be enclosed within__________ when being assigned to variables.",
        qa5:"A very useful tool used during development and debugging for printing content to the debugger is:"
    },

    ans:{
        ans1:"strings, booleans, alerts-crtans, numbers",
        ans2:"quotes, curly brackets-crtans, parenthesis, square brackets",
        ans3:"numbers and strings, other arrays, booleans, all of the above-crtans",
        ans4:"commas, curly brackets, quotes-crtans, parenthesis",
        ans5: "JavaScript, terminal/bash, for loops, console.log-crtans"
    },

    scores:{
        score1: "15",
        score2: "10",
        score3: "25",
        score4: "20",
        score5: "30",
    }

};
// load total number of questions
totalQt = Object.keys(arrQuestions.qa).length;
// start Quiz

var divPageStartQuizEl = document.createElement("div");
divPageStartQuizEl.className = "start-quiz-contianer";
divPageStartQuizEl.setAttribute("id", "start-quiz-contianer");

var h1Text = "<h1>Coding Quiz Challenge</h1>";
var pText = "<p>Try to answer the following code-related questions within the time limit."+ "<br />" + "Keep in mind that incorrect answers will penalize your score/time by ten seconds!</p>";
var buttonStartQuiz = "<div><input type='button' value = 'Start Quiz' class='start-quiz' id='start-quiz' /></div>";

divPageStartQuizEl.innerHTML = h1Text + pText + buttonStartQuiz;


// funciton load quiz
function btnSartQuizHandler(event) {
    // check which element which clecked
    var targetEl = event.target;
    if(targetEl.matches(".start-quiz")) {
        getScoreFromCurrentUser = 1;
        divPageStartQuizEl.remove();
        loadQuiz(numQuestion2Load);
        countdownTimer(75);
    }
}

// funciton check answer
function btnCheckAnsHandler(event) {
    // check which element which clecked
    var targetEl = event.target;
    if(targetEl.matches(".text-ans-container")) {
        var getElbyID = document.getElementById(targetEl.id);
        var getTextAnswer = getElbyID.innerText.toString();
        checkAnswer(getTextAnswer.trim(), correctAns.split("-")[0].trim()) 
    }

    if(targetEl.matches(".btn-save-result")) {
        saveFormHandler();
    }

    if(targetEl.matches(".btn-go-back")) {
        location.reload();
    }

    if(targetEl.matches(".btn-view-high-score")) {
        getScoreFromCurrentUser = 0;
        document.getElementById("text-high-container").remove();
        listScoresView();
        // correct get data from local array and view
    }
}

// check correct answer from user clicked.
function checkAnswer(usrAns, correctAns){
    if (usrAns===correctAns){
        document.getElementById("footer").style.display = "block";
        document.getElementById("ans-result-alert").innerHTML = "Correct!";
        setTimeout(() => {
            document.getElementById("footer").style.display = "none";
            loadNextQuiz2User();
        }, 1000);

        totalScores += Math.floor(getScore);

    }
    if(usrAns != correctAns){
        document.getElementById("footer").style.display = "block";
        document.getElementById("ans-result-alert").innerHTML = "Incorrect!";
        minusTimer = 10;
    
        setTimeout(() => {
            document.getElementById("footer").style.display = "none";
            loadNextQuiz2User();
        }, 1000);

    }
}

// load next question after user clicked answer for question.
function loadNextQuiz2User() {
    if (totalQt > numQuestion2Load){
        document.getElementById("question-container").remove();
        
        for(var i = 0; i < totalElItemsQt; i ++){
            var divAnsEl = "text-ans-container" + i
            var divAnsliEl = "li-text-ans-container" + i
            document.getElementById(divAnsEl).remove();
            document.getElementById(divAnsliEl).remove();
            document.getElementById("ans-container").remove();
        }

        numQuestion2Load = numQuestion2Load + 1;
        totalElItemsQt = 0;
        loadQuiz(numQuestion2Load);

    }else {
        clearInterval(timeoutHandle);
        loadFinalScore();
    }
}

function loadFinalScore(){
    
    document.getElementById("question-container").remove();
       
    for(var i = 0; i < totalElItemsQt; i ++){
        var divAnsEl = "text-ans-container" + i
        var divAnsliEl = "li-text-ans-container" + i
        document.getElementById(divAnsEl).remove();
        document.getElementById(divAnsliEl).remove();
        document.getElementById("ans-container").remove();
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

    qAAnsContainerEl.appendChild(h1ResultEl);
    divShowScoreEl.innerHTML = "Your final Score is <span><b>" + totalScores + "</b></span>";
    qAAnsContainerEl.appendChild(divShowScoreEl);

    var buttonSave = "<input type='button' value = 'Submit' class='btn-save-result' id='btn-save-result' />";
    forminitEl.innerHTML = "Enter initial: " + "<input type='text' name='initial-name' class='text-input' placeholder='' id='initial-name' />" + buttonSave;
    qAAnsContainerEl.appendChild(forminitEl);
}

// function countdown timer
var timeoutHandle;
function countdownTimer(seconds) {
    function tick() {

        var counter = document.getElementById("countdown-timer");
        counter.innerHTML = "Timer: " + String(seconds);

        if (minusTimer === 0) {
            seconds--;
        }else{
            seconds = seconds - minusTimer;
            minusTimer = 0;
            if (seconds < 1) seconds = 0;
        }

        if (seconds >= 0) {
            timeoutHandle = setTimeout(tick, 1000);
        }

        if(seconds === 0) {
            loadFinalScore();
            counter.innerHTML = "Timer: 00";
        }

        if((totalQt === numQuestion2Load) && (usrAns != correctAns)){
            seconds = seconds;
            counter.innerHTML = "Timer: " + String(seconds);
        }
    }
    tick();
}

// function to load question
function loadQuiz(atIndex){
    
    if (!arrQuestions) {
        return false;
    }

    // load question
    var idLoadqa = "qa" + atIndex;
    var idLoadans = "ans" + atIndex;
    var idLoadscore = "score" + atIndex;

    var divQuestionEl = document.createElement("div");
    divQuestionEl.className = "question-container";
    divQuestionEl.setAttribute("id", "question-container");

    var Qah2Text = arrQuestions.qa[idLoadqa];
    divQuestionEl.innerHTML = "<h2>" + Qah2Text +"</h2>";
    qAAnsContainerEl.appendChild(divQuestionEl);
    
    // load and split answer
    let ansItem = arrQuestions.ans[idLoadans];

    var ansItems = ansItem.split(",");

    for(var j=0; j<ansItems.length; j++){

        y = (j + 1) + "." ;

        let correntAns = ansItems[j];
        const arrAnsCheck = correntAns.split("-");
        if(arrAnsCheck.length > 1) {
            correctAns = ansItems[j] + atIndex;
        } 

        // add answers
        var divAnsEl =document.createElement("div");
        divAnsEl.className = "ans-container";
        divAnsEl.setAttribute("id","ans-container");
        divAnsEl.innerHTML = "<div class='li-text-ans-container' id='li-text-ans-container"+ j +"'>" + y +"</div>" + "<div class='text-ans-container' id='text-ans-container"+ j +"'>"+ arrAnsCheck[0] +"</div>";
        qAAnsContainerEl.appendChild(divAnsEl);

        totalElItemsQt = totalElItemsQt + 1;
    }

    // get score for question
    getScore = arrQuestions.scores[idLoadscore];
}

// view score to user after submit and save to localStorage.
function saveFormHandler () {
    initNameInput = document.getElementById("initial-name").value;

    document.getElementById("final-score").remove();
    document.getElementById("text-result").remove();
    document.getElementById("form-ent-init").remove();

    var h1HighScoreEl = document.createElement("h1");
    h1HighScoreEl.className="high-scores";
    h1HighScoreEl.setAttribute("id", "high-score");
    h1HighScoreEl.textContent = "High scores";
    qAAnsContainerEl.appendChild(h1HighScoreEl);

    listScoresView();

    var divEl =document.createElement("div");
    divEl.className = "btn-container";
    divEl.setAttribute("id","btn-container");
    divEl.innerHTML = "<div class='btn-go-back' id='btn-go-back'>Go back</div><div class='btn-view-high-score' id='btn-view-high-score'>View high score</div>";
    qAAnsContainerEl.appendChild(divEl);

    // array for hold initname and score after they completed.
    var userScore = {
        initName:initNameInput,
        score:totalScores
    }

    
    SaveDataToLocalStorage(userScore);
}

// save to localStorage.
function SaveDataToLocalStorage(data){
    var arrtemp = [];
    arrtemp = JSON.parse(localStorage.getItem('userScores')) || [];
    arrtemp.push(data);
    localStorage.setItem('userScores', JSON.stringify(arrtemp));
}

function listScoresView() {
    if(getScoreFromCurrentUser === 1) {
        var textHighScoreEl = document.createElement("div");
        textHighScoreEl.className = "text-high-container";
        textHighScoreEl.setAttribute("id", "text-high-container");
        textHighScoreEl.textContent = "1. " + initNameInput + " - " + totalScores;
        qAAnsContainerEl.appendChild(textHighScoreEl);
    }else{
        // do somethings
        var userScores = JSON.parse(localStorage.getItem('userScores')) || [];
        var totalUsers = Object.keys(userScores).length;
        var j = 0;
        for(var i=0; i<totalUsers; i++){
            j = i +1;
            var textHighScoreEl = document.createElement("div");
            textHighScoreEl.className = "text-high-container";
            textHighScoreEl.setAttribute("id", "text-high-container");

            var userInit = userScores[i]['initName'];
            var testScore = userScores[i]['score'];
            textHighScoreEl.textContent = j + ". " + userInit + " - " + testScore;

            qAAnsContainerEl.appendChild(textHighScoreEl);
        }
        
        document.getElementById("btn-container").remove();

        var divEl =document.createElement("div");
        divEl.className = "btn-container";
        divEl.setAttribute("id","btn-container");
        divEl.innerHTML = "<div class='btn-go-back' id='btn-go-back'>Go back</div>";
        qAAnsContainerEl.appendChild(divEl);
    }
}


startQaContainerEl.appendChild(divPageStartQuizEl);
startQaContainerEl.addEventListener("click", btnSartQuizHandler);
qAAnsContainerEl.addEventListener("click", btnCheckAnsHandler);

document.getElementById("footer").style.display = "none";
