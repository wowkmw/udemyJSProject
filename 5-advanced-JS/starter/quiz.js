(function(){
    function Question(question, options, answer){
        this.question = question;
        this.options = options;
        this.answer = answer;
    }

    Question.prototype.askQuestion = function(){
        console.log(this.question);
        for(let i = 0; i < this.options.length; i++){
            console.log(i+1+'. '+ this.options[i]);
        }
    }; 

    function questionAsker(){
        let ans = '';
        let q1 = new Question('Who\'s handsome?', ['muwei kuo', 'wenshin chang', 'others'], 1);
        let q2 = new Question('Who\'s beautiful?', ['wenshin chang', 'muwei kuo', 'others'], 1);
        let q3 = new Question('1+1=?', [1,2,3], 2);
        let qList = [q1,q2,q3];
        while(ans !== 'exit'){
            let q = Math.floor(Math.random()*qList.length);
            qList[q].askQuestion();
            ans = window.prompt('Whats your answer? Type \'exit\' to stop.');
            if (ans == qList[q].answer){
                console.log('Correct answer!');
            }else if(ans == 'exit'){
                console.log('Game stopped.');
            }else{
                console.log('Wrong answer!');
            }
        }
    }

    questionAsker();
})();