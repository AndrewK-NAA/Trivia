var pageCounter = 0;
var totalQuestionsLoaded = 0;
var triviaContainer = window.document.getElementById("trivia-info");
var btn = document.getElementById("btn");
var ink = document.getElementById(`ink`);
var theParent = document.getElementById("trivia-info");

theParent.addEventListener("click", doSomething, false);

function doSomething(event) {
    if (event.target !== event.currentTarget) {
        var clickedItem = event.target.id;
        console.log("Hello1" + clickedItem);
        var pos = clickedItem.indexOf("ink");
        if (pos == 0) {
            var element = document.getElementById(`${clickedItem}`);
            console.log(element);
            element.classList.remove("ink");
            element.classList.add("ink-show");
        } else {
            var pos = clickedItem.indexOf("loadmore");
            if (pos == 0) {
                var element = document.getElementById(`${clickedItem}`);
                console.log("Hello2" + element);
                var ourRequest1 = new XMLHttpRequest();
                ourRequest1.open('GET', 'https://opentdb.com/api.php?amount=10');
                ourRequest1.onload = function() {
                    var ourData = JSON.parse(ourRequest1.responseText);
                    console.log(ourData);
                    renderHTML(ourData);
                    pageCounter++;

                }
                ourRequest1.send();
            }
        }
    };

    event.stopPropagation();
};


btn.addEventListener("click", function() {
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'https://opentdb.com/api.php?amount=10');
    ourRequest.onload = function() {
        var ourData = JSON.parse(ourRequest.responseText);
        //console.log(ourData);
        renderHTML(ourData);
        pageCounter++;
    };
    ourRequest.send();

    pageCounter++;
    if (pageCounter > 3) {
        btn.classList.add("hide-me");
    }
});

function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function renderHTML(data) {
    var htmlString = "";


    for (i = 0; i < data.results.length; i++) {

        var array = [data.results[i].incorrect_answers[0], data.results[i].incorrect_answers[1], data.results[i].incorrect_answers[2], data.results[i].correct_answer];
        var answerarray = shuffle(array);
        console.log(answerarray);
        htmlString += `<span id="Cat">Category: ` + data.results[i].category + "<br/></span><p>" + data.results[i].question + "<br/>" +
            "<br/> A) " + answerarray[0] +
            "<br/> B) " + answerarray[1] +
            "<br/> C) " + answerarray[2] +
            "<br/> D) " + answerarray[3] +
            "<br/>" +
            `<br/><button type="button" id="ink${totalQuestionsLoaded}" class="ink"> ${data.results[i].correct_answer} </button>`;

        htmlString += " </p>";
        totalQuestionsLoaded++;


    }
    htmlString += `<div><button type="button" id="loadmore">Load More Questions</button></div>`
    triviaContainer.insertAdjacentHTML('beforeend', htmlString);


}