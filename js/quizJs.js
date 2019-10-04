
document.addEventListener("DOMContentLoaded", function (e) {
    // Class for the quiz, keeps track of name and 
    class Quiz {
        constructor(name, quests, ansQuestsCorr = 0, ansQuestsIncorr = 0) {
            this.name = name;
            this.quests = quests.options[quests.selectedIndex].text;
            this.ansQuestsCorr = ansQuestsCorr;
            this.ansQuestsIncorr = ansQuestsIncorr;
        }
        getNumQuest() {
            console.log(this.quests);
        }
        checkInfo() {
            if (this.name == "") {
                alert("Please enter your name before starting.");
            } else {
                document.getElementById("questWin").classList.remove("hidden");
                document.getElementById("alterWin").classList.remove("hidden");
                document.getElementById("enterInfo").classList.add("hidden");
            }
        }
    }

    class Question {
        constructor(catgor, currQuest, ansAlt, trueAns, falseAns, ansParCorrResp, ansFullCorrResp) {
            this.catgor = catgor;
            this.currQuest = currQuest;
            this.ansAlt = ansAlt;
            this.trueAns = trueAns;
            this.falseAns = falseAns;
            this.ansParCorrResp = ansParCorrResp;
            this.ansFullCorrResp = ansFullCorrResp;
        }
        addQuests(){
            //Create new question with category as title
            let newQuestDiv = document.createElement("div");
            let newH2 = document.createElement("h2");            
            let newCat = document.createTextNode(this.catgor);
            newH2.appendChild(newCat);
            newQuestDiv.appendChild(newH2);
            let targetDiv = document.getElementById("questMain");
            targetDiv.appendChild(newQuestDiv);

        }

    }

    
    let submit = document.getElementById("postNum");
    submit.addEventListener("click", function (e) {
        let chosQuests = [];

        let game = new Quiz(document.getElementById("name").value, document.getElementById("numOfQuest"));
        game.checkInfo();
        game.getNumQuest();

        var requestJSON = new XMLHttpRequest();
        requestJSON.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var myQuest = JSON.parse(this.responseText);
                for (let i = 0; i < game.quests; i++) {
                    let question = new Question(myQuest.questionsArr[i].catgor, myQuest.questionsArr[i].question, 
                        [myQuest.questionsArr[i].ansAlt1, myQuest.questionsArr[i].ansAlt2, myQuest.questionsArr[i].ansAlt3], 
                        [myQuest.questionsArr[i].trueAns1, myQuest.questionsArr[i].trueAns2, myQuest.questionsArr[i].trueAns3],
                        myQuest.questionsArr[i].ansIncorrResp, myQuest.questionsArr[i].ansParCorrResp, myQuest.questionsArr[i].ansFullCorrResp);
                    chosQuests.push(question);
                    console.log(chosQuests);
                    chosQuests[i].addQuests();
                }
            }
            
        }
        requestJSON.open("GET", "../json/questions.json", true);
        requestJSON.send();


    })

    let answer = document.getElementById("");




});