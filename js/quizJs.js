
document.addEventListener("DOMContentLoaded", function (e) {
    // Class for the quiz, keeps track of name and 
    class Quiz {
        constructor(name, quests, ansQuests = 0) {
            this.name = name;
            this.quests = quests.options[quests.selectedIndex].text;
            this.ansQuests = ansQuests;
        }
        checkInfo() {
            if (this.name == "") {
                alert("Please enter your name before starting.");
            }
            //Creates the 'quiz' session
            if (this.name != "") {
                document.getElementById("enterInfo").classList.add("hidden");

                let newP = document.createElement("p");
                newP.setAttribute("id", "ansQuestText");
                let newPText = document.createTextNode("You have answered this many questions: ");
                newP.appendChild(newPText);
                let newPNum = document.createTextNode(this.ansQuests);
                newP.appendChild(newPNum);

                let target = document.getElementById("ansQuest");
                target.appendChild(newP);

            }
        }
        updNumQuests(){
            let target = document.getElementById("ansQuest");
            let targetChild = document.getElementById("ansQuestText");
            target.removeChild(targetChild);
            let newP = document.createElement("p");
            newP.setAttribute("id", "ansQuestText");
            let newPText = document.createTextNode("You have answered this many questions: ");
            newP.appendChild(newPText);
            this.ansQuests = ansQuestsUpd;
            let newPNum = document.createTextNode(this.ansQuests);
            newP.appendChild(newPNum);
            
            target.appendChild(newP);
        }
    }

    class Question {
        constructor(catgor, currQuest, ansAlt, trueAns, falseAns, ansParCorrResp, ansFullCorrResp, quests) {
            this.catgor = catgor;
            this.currQuest = currQuest;
            this.ansAlt = ansAlt;
            this.trueAns = trueAns;
            this.falseAns = falseAns;
            this.ansParCorrResp = ansParCorrResp;
            this.ansFullCorrResp = ansFullCorrResp;
            this.quests = quests.options[quests.selectedIndex].text;
            this.questNum = "";
        }
        addQuests() {
            //Create new question as title and category beneath
            let currIndexString = String(currIndex + 1);
            let newQuestDiv = document.createElement("div");
            newQuestDiv.classList.add("question" + currIndexString);
            newQuestDiv.setAttribute("id", "question" + currIndexString);

            currQuests.push("question" + currIndexString);
            //Checks if the question is not the first in its array, if so adds 'hide' class to question div
            if (currIndex != 0) {
                newQuestDiv.classList.add("hidden");
            }
            let newH2 = document.createElement("h2");
            let newH3 = document.createElement("h3");
            let newQuestTit = document.createTextNode("Question " + currIndexString);
            let newCat = document.createTextNode("Category: " + this.catgor);
            let targetDiv = document.getElementById("questMain");
            newH2.appendChild(newQuestTit);
            newH3.appendChild(newCat);
            newQuestDiv.appendChild(newH2);
            newQuestDiv.appendChild(newH3);
            targetDiv.appendChild(newQuestDiv);
            //Adds question itself to tag
            let newQuestP = document.createElement("p");
            newQuestP.classList.add("questText");
            let newQuest = document.createTextNode(this.currQuest);
            newQuestP.appendChild(newQuest);
            newQuestDiv.appendChild(newQuestP);
        }
        addAns() {
            //Creates the answer window with the matching answers for the current question
            let currIndexString = String(currIndex + 1);
            let newQuestDiv = document.createElement("div");
            newQuestDiv.classList.add("answersQuest" + currIndexString);
            let newH4 = document.createElement("h4");
            let newAnsTit = document.createTextNode("Choose your answer(s):");
            newH4.appendChild(newAnsTit);
            newQuestDiv.appendChild(newH4);

            //Loop that creates input tags in the current div
            for (let i = 1; i < 4; i++) {
                let newInput = document.createElement("input");
                let newLabel = document.createElement("label");
                newInput.classList.add("ans" + i);
                newInput.setAttribute("name", "ans" + i);
                newInput.setAttribute("value", this.ansAlt[i - 1]);
                newInput.setAttribute("type", "checkbox");
                newInput.classList.add("ansForQuest" + currIndexString);
                newLabel.setAttribute("for", "ans" + [i])
                newLabel.innerHTML = this.ansAlt[i - 1];
                newQuestDiv.appendChild(newInput);
                newQuestDiv.appendChild(newLabel);
            }

            //Checks if the current index is the first one (0), if so do not create a 'previous' button
            if (currIndex != 0) {
                let newPrevButton = document.createElement("button");
                newPrevButton.classList.add("prevButton");
                newPrevButton.innerHTML = "Previous";
                newQuestDiv.appendChild(newPrevButton);
            }

            //Checks if the index is the last in chosQuest array (all chosen questions by user)
            //and is so creates a 'submit' button
            if (currIndex != this.quests - 1) {
                let newNextButton = document.createElement("button");
                newNextButton.classList.add("nextButton");
                newNextButton.innerHTML = "Next";
                newQuestDiv.appendChild(newNextButton);
            }
            else {
                let newSubmitButton = document.createElement("button");
                newSubmitButton.classList.add("submitButton");
                newSubmitButton.innerHTML = "Submit";
                newQuestDiv.appendChild(newSubmitButton);
            }
            let targetDiv = document.getElementById("question" + currIndexString);
            targetDiv.appendChild(newQuestDiv);
            this.questNum = currIndexString;
        }
        calcCorrAns() {
            let totAns = [];
            let corrAns = [];
            let ansQuestsTemp = document.getElementById("question" + this.questNum);
            let answers = ansQuestsTemp.getElementsByTagName("input");

            for (let i = 0; i < 3; i++) {
                totAns.push(answers[i]);
            }
            for (let string of this.trueAns) {
                if (string !== "") {
                    corrAns.push(string);
                }
            }

            for (let i = 0; i < 3; i++) {
                if (totAns[i].checked) {
                    for (let strings of corrAns) {
                        if (strings === totAns[i].value) {
                            corrAnswers++;
                            console.log(corrAnswers);
                        }
                        else {
                            continue;

                        }
                    }
                }
                else {
                    for (let strings of corrAns) {
                        if (strings === totAns[i].value) {
                            corrAnswers--;
                        }
                        else {
                            continue;
                        }
                    }
                }

                if (totAns[i].value !== corrAns[i] && totAns[i].checked) {
                    corrAnswers--;
                    console.log(corrAnswers);

                }
            }
        }
    }

    //Current index of question being created, for usage in creating div class
    let currIndex = 0;
    let chosQuests = [];
    let currQuests = [];
    let ansQuestsUpd = 0;
    let corrAnswers = 0;



    let submit = document.getElementById("postNum");
    submit.addEventListener("click", function (e) {


        let game = new Quiz(document.getElementById("name").value, document.getElementById("numOfQuest"), ansQuestsUpd);
        game.checkInfo();
        //If the user has entered a name the questions will be added
        if (game.name != "") {
            var requestJSON = new XMLHttpRequest();
            requestJSON.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var myQuest = JSON.parse(this.responseText);
                    for (let i = 0; i < game.quests; i++) {
                        let question = new Question(myQuest.questionsArr[i].catgor, myQuest.questionsArr[i].question,
                            [myQuest.questionsArr[i].ansAlt1, myQuest.questionsArr[i].ansAlt2, myQuest.questionsArr[i].ansAlt3],
                            [myQuest.questionsArr[i].trueAns1, myQuest.questionsArr[i].trueAns2, myQuest.questionsArr[i].trueAns3],
                            myQuest.questionsArr[i].ansIncorrResp, myQuest.questionsArr[i].ansParCorrResp, myQuest.questionsArr[i].ansFullCorrResp, document.getElementById("numOfQuest"));
                        currIndex = i;
                        chosQuests.push(question);
                        console.log(chosQuests);
                        chosQuests[i].addQuests();
                        chosQuests[i].addAns();
                    }
                    console.log(currQuests);
                }

            }
            requestJSON.open("GET", "../json/questions.json", true);
            requestJSON.send();

        }
    //Adds a listener on the 'next' button
    document.addEventListener("click", function (e) {
        if (event.target.classList.contains("nextButton")) {
            for (let i = 0; i < currQuests.length; i++) {
                if (event.target.parentNode.parentNode.className == currQuests[i]) {
                    ansQuestsUpd++;
                    game.updNumQuests()
                    console.log(ansQuestsUpd)
                    document.getElementById(currQuests[i + 1]).classList.remove("hidden");

                }
                
                    
                
            }

            event.target.parentNode.parentNode.classList.add("hidden");

        }
    })
    //Adds a listener on the 'previous' button
    document.addEventListener("click", function (e) {
        if (event.target.classList.contains("prevButton")) {
            for (let i = 0; i < currQuests.length; i++) {
                if (event.target.parentNode.parentNode.className == currQuests[i]) {

                    document.getElementById(currQuests[i - 1]).classList.remove("hidden");
                    ansQuestsUpd--;
                    game.updNumQuests()
                    console.log(ansQuestsUpd)
                }
            }

            event.target.parentNode.parentNode.classList.add("hidden");

        }
    })

    //Adds a listener on the 'submit' button
    document.addEventListener("click", function (e) {
        if (event.target.classList.contains("submitButton")) {
            ansQuestsUpd++;
            game.updNumQuests()
            console.log(ansQuestsUpd)
            event.target.parentNode.parentNode.classList.add("hidden");

            for (let i = 0; i < chosQuests.length; i++) {
                chosQuests[i].calcCorrAns();

            }
            console.log(corrAnswers);
        }
    })
    })



});