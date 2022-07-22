console.log("Is this thing on?");

let quizEl = document.getElementById("quiz");

// ------- Loop to add all questions on the page ----------//
for (let [number, question] of Object.entries(quiz)) {
  let allQuestions = "";

  if (question.type == "mc") {
    questionDisplay = `
    <form action="" class="check answer-form">
    <div class="feedbackbox">
      <h4>${question.question}</h4>
        <input type="checkbox" name="question" value="${number}" hidden checked="checked"/>
          <div class="row">
            <div class="choicescolumn" id="mc-question">
              <div>
                <input type="radio" name="radio" value="${
                  Object.keys(question.choices)[0]
                }"><label>${question.choices.a}</label>
                <span class="checkmark"></span>
              </div>
              <div>
                <input type="radio" name="radio" value="${
                  Object.keys(question.choices)[1]
                }"><label>${question.choices.b}</label>
                <span class="checkmark"></span>
              </div>
              <div>
                <input type="radio" name="radio" value="${
                  Object.keys(question.choices)[2]
                }"><label>${question.choices.c}</label>
                <span class="checkmark"></span>
              </div>
              <div>
                <input type="radio" name="radio" value="${
                  Object.keys(question.choices)[3]
                }"><label>${question.choices.d}</label>
                <span class="checkmark"></span>
              </div>
              </div>
              <div><button type="submit"> Check</button></div>
    </div>
      </form>
      </div>
      <hr>    
    `;
    allQuestions += questionDisplay;
  }
  if (question.type == "ow") {
    questionDisplay = ` 
    <div>
    <form class="check" id="question-${number}">
    <div class="feedbackbox">
    <h4>${question.question}</h4>
      <div class="row">
        <input type="checkbox" name="question" value="${number}" hidden checked="checked"/>
          <div id="ow-question">
            <input type="text" name="radio" id="radio"/>
          </div>
          <div><button type="submit"> Check </button></div>
      </div>
      </form></div>
    </div>
    <hr>
    `;
    allQuestions += questionDisplay;
  }
  quizEl.innerHTML += allQuestions;
}

//------- Functionality for checking the answers -----------//
let checkForm = document.getElementsByClassName("check");

for (let response of checkForm) {
  response.addEventListener("submit", (event) => {
    event.preventDefault();
    let answerData = new FormData(response);
    let answer = answerData.get("radio");
    let number = answerData.get("question");
    let boxFade = response.children[0];

    if (answerFeedback(answer, number)) {
      boxFade.classList.add("correct");
      setTimeout(() => {
        boxFade.classList.remove("correct");
      }, "3500");
    } else {
      boxFade.classList.add("incorrect");
      setTimeout(() => {
        boxFade.classList.remove("incorrect");
      }, "3500");
    }
  });
}

function answerFeedback(answer, questionNum) {
  console.log(quiz[questionNum].correctAns == answer);
  return quiz[questionNum].correctAns == answer;
}
