let testScore = null;
let currentQuestion = 0; 

document.getElementById('js-question').classList.add('-hidden');

function start() {
	initQuestions();
	document.getElementById('js-question').classList.remove('-hidden');
	document.getElementById('js-start').hidden = true;
	document.getElementById('js-title').hidden = true;

};

function initQuestions() {
	document.getElementById('js-totalQuestionCount').innerText = questions.length;
	setNextQuestionData()
};

function setNextQuestionData() {
	document.getElementById('js-questionText').innerText = questions[currentQuestion].questionText;
	document.getElementById('js-questionNumber').innerText = currentQuestion + 1;
	document.getElementById('js-questionAnswers').innerHTML = prepareAnswersMarkdown(questions[currentQuestion].answers)
}

function prepareAnswersMarkdown(answers) {
    let result = '';
    
    answers.forEach(answer => {
    	result += '<li><button class="question__answer" onclick="onAnswerChoose(' + answer.value + ')">' + answer.answerText + '</button></li>';
    });

    return result;
};

function onAnswerChoose(chosenValue) {
	testScore += chosenValue;
	currentQuestion++;
	if (currentQuestion < questions.length) {
		setNextQuestionData();
	} else {
		showTestResult();
	}
};


function showTestResult() {
	
	document.getElementById('js-question').classList.add('-hidden');
	document.getElementById('js-result').classList.remove('-hidden');
	document.getElementById('js-content').style.padding = 'none';
	let resultKey = '';
	if (testScore < 20) {
		resultKey = 'StasIKakProsto';
		document.getElementById("js-resultImage").src = resultData.StasIKakProsto.img;
	} else {
		resultKey = 'bigBoy';
		document.getElementById("js-resultImage").src = resultData.bigBoy.img;
	}

	document.getElementById('js-resultTitle').innerText = resultData[resultKey].title;
	document.getElementById('js-resultDescription').innerText = resultData[resultKey].description;
	document.getElementById('js-resultImage').scr = resultData[resultKey].image;

	document.getElementById('js-resultShare').innerHTML = VK.Share.button(
            {
            	url: 'https://alexust1820.github.io/test/',
            	title: 'Офигеть! Да я же' + resultData[resultKey].title + '. Пройди и узнай кто ты',
            	image: resultData[resultKey].images,
            	noparse: true,
            },

            {
            	text: 'Share with friends',
            },
        );
};

function restartTest() {
	document.getElementById('js-question').classList.remove('-hidden');
	document.getElementById('js-result').classList.add('-hidden');
	currentQuestion = 0;
	initQuestions();
};






