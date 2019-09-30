document.addEventListener("DOMContentLoaded", function (e) {
    class Quiz {
        constructor(name, quests, ansQuests = 0) {
            this.name = name;
            this.quests = quests;
            this.ansQuests = ansQuests;
        }
        getNumQuest(){
            let selVal = this.quests.options[this.quests.selectedIndex].text;
            console.log(selVal);
        }
    }

    class Question extends Quiz {
        constructor(cat, currQuest, ansAlt, trueOrFalse) {
            super(name, quests, ansQuests);
            this.cat = cat;
            this.currQuest = currQuest;
            this.ansAlt = ansAlt;
            this.trueOrFalse = trueOrFalse;
        }
    }

    let submit = document.getElementById("postNum");
    submit.addEventListener("click", function (e) {
        let game = new Quiz(document.getElementById("name").value, document.getElementById("numOfQuest"));
        

        game.getNumQuest();
                    
    })

});