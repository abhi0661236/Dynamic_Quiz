$(document).ready(
    function () {
        var questions = [{
            question: "Which is not a keyword in javascript ?",
            choices: ["this", "let", "var", "that", "const"],
            correctAnswer: 3
        }, {
            question: "What is JavaScript ?",
            choices: ["A programming language.", "A server-side scripting language", "A library", "A framework", "All of the above"],
            correctAnswer: 0
        }, {
            question: "Variables declared with const keyword -",
            choices: ["each of these", "are immutable", "can be reassigned", "can not be reassigned", "None of these"],
            correctAnswer: 3
        }, {
            question: "Which is not related ot JavaScript ?",
            choices: ["react", "node", "express", "flask", "vue"],
            correctAnswer: 3
        }, {
            question: "Inside which HTML element do we put the JavaScript?",
            choices: ["In javascript tag", "In scripting tag", "In script tag", "In js tag", "None of these"],
            correctAnswer: 2
        },
        {
            question: "Where is the correct place to insert a JavaScript?",
            choices: ["Both the head section and body section are correct", "head section", "body section", "None of these", "header section"],
            correctanswer: 0
        },
        {
            question: "JavaScript is used to",
            choices: ["Manipulate DOM", "Add event-listener", "Change the content", "All of these", "None of these"],
            correctanswer: 3
        }
        ];

        var questionCounter = 0; // Tracks question number
        var selections = []; // Array containing user choices
        var quiz = $("#quiz"); // holding the quiz element


        // Display initial question.
        displayNext();






        // Display next requested element
        function displayNext() {
            quiz.fadeOut(function () {
                $("#question").remove();

                if (questionCounter < questions.length) {
                    var nextQuestion = createQuestionElement(questionCounter);
                    quiz.append(nextQuestion).fadeIn();

                    if (!(isNaN(selections[questionCounter]))) {
                        $('input[value=' + selections[questionCounter] + ']').prop('checked', true);
                    }

                    // controls display of 'prev' button

                    if (questionCounter === 1) {
                        $("#prev").show();
                    } else if (questionCounter === 0) {
                        $("#prev").hide();
                        $('#next').show();

                    }
                } else {
                    var scoreElem = displayScore();  // see defintion at the end of the file
                    quiz.append(scoreElem).fadeIn();
                    $('#next').hide();
                    $('#prev').hide();
                    $('#start').show();
                }
            });
        }





        // created question elements 

        function createQuestionElement(index) {
            var qElement = $('<div>', { id: 'question' });

            var header = $('<h2>Question ' + (index + 1) + ':</h2>' +'<i id="correct" class="green far fa-check-circle"></i> ' + '<i id="incorrect" class="red far fa-times-circle"></i>');
            qElement.append(header);

            var question = $('<p>').append(questions[index].question);
            qElement.append(question);

            var radioButtons = createRadios(index);
            qElement.append(radioButtons);

            return qElement;
        }





        // created radio elements 

        function createRadios(index) {
            var radioList = $('<ul>');
            var item;
            var input = '';

            for (var i = 0; i < questions[index].choices.length; i++) {
                item = $('<li>');
                input = '<input type="radio" name="answer" value=' + i + ' />';
                input += questions[index].choices[i];
                item.append(input);
                radioList.append(item);
            }

            return radioList;
        }

        // console.log("Hi from console");




        // click handler for next button 
        $('#next').on('click', function (e) {
            e.preventDefault();

            choose();

            // If no user selection, progress is stopped
            if (isNaN(selections[questionCounter])) {
                alert('Please make a selection!');
            } else {
                questionCounter++;
                displayNext();
            }


        });





    // click listener for prev button 
        $('#prev').on('click', function (e) {
            e.preventDefault();
            
            choose();
            questionCounter--;
            displayNext();
          });


        function choose() {
            selections[questionCounter] = +$('input[name="answer"]:checked').val();
            // console.log(selections);
        }




        // check answer and give feedback

        $('#chk-btn').click(function(){
            var index = $('input[name="answer"]:checked').val();
            
            if (index == questions[questionCounter].correctAnswer) {
                $('#correct').show();
                $('#incorrect').hide();
                console.log("Answer is correct");

            }else{
                $('#incorrect').show();
                $('#correct').hide();
                console.log("Answer is incorrect");
            }
        });



        function displayScore() {
            var score = $('<p>',{id: 'question'});
            
            var numCorrect = 0;
            for (var i = 0; i < selections.length; i++) {
              if (selections[i] === questions[i].correctAnswer) {
                numCorrect++;
                console.log(numCorrect);
              }
            }
            
            // console.log(numCorrect);

            var usrScore = numCorrect*10;
            var maxScore = questions.length*10;
            
            
            
            
            
            score.append(`Your Score is ${usrScore} out of ${maxScore}.`);
            return score;
          }


    });






