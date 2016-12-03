'use strict';

$(function () {

    var gameStarted = false;
    var score = 0;
    var hits = 0;
    var accuracy = 0;

    function selectDog() {
        if (gameStarted) {
            if (folderNumber === 1) {
                score++;
            }
            goFolder();
        }
    }

    function selectCat() {
        if (gameStarted) {
            if (folderNumber === 0) {
                score++;
            }
            goFolder();
        }
    }
    var folderNumber;
    function goFolder() {
        folderNumber = Math.floor(Math.random() * 2);
        if (folderNumber === 1) {
            showCatPic();
        } else {
            showDogPic();
        }
    }

    function showCatPic() {
        var randomNumber = Math.floor(Math.random() * 29 + 1);
        $('#image').html('<img src="images/dog/' + randomNumber + '.jpg">');
    }

    function showDogPic() {
        var randomNumber = Math.floor(Math.random() * 30 + 1);
        $('#image').html('<img src="images/cat/' + randomNumber + '.jpg">');
    }

    function timer() {
        $('.timer').show();
        var timer = 20;
        var interval = setInterval(function () {
            timer--;
            $('.timer').text(timer + 's');
            if (timer === 0) {
                if (hits > 0) {
                    accuracy = (score / hits * 100).toFixed(2);
                } else {
                    accuracy = '--';
                }
                clearInterval(interval);
                $('.timer').hide();
                $('.selectButtons').hide();
                $('#image').hide();
                $('.timesUp').show();
                $('#finalScore').text('Final Score: ' + score);
                $('#accuracy').text('Accuracy: ' + accuracy + '%');
                $('#refresh').css({
                    'display': 'block',
                    'margin': '30px auto'
                });
                gameStarted = false;
            };
        }, 1000);
    }
    document.onkeydown = function (e) {
        switch (e.keyCode) {
            case 37:
                if (gameStarted) {
                    $('#cat_button').addClass('button-select');
                    break;
                }
            case 39:
                if (gameStarted) {
                    $('#dog_button').addClass('button-select');
                    break;
                }
        }
    };

    document.onkeyup = function (e) {
        switch (e.keyCode) {
            case 37:
                if (gameStarted) {
                    selectCat();
                    $('#cat_button').removeClass('button-select');
                    hits++;
                    break;
                }
            case 39:
                if (gameStarted) {
                    selectDog();
                    $('#dog_button').removeClass('button-select');
                    hits++;
                    break;
                }
        }
    };
    $('#start').on('click', function () {
        gameStarted = true;
        goFolder();
        timer();
        $('.selectButtons').fadeIn();
        $(this).hide();
        $('.image-container').show();
        $('.sub-title').hide();
        $('.sub-title2').hide();
    });

    $('#cat_button').on('click', function () {
        selectCat();
        hits++;
    });

    $('#dog_button').on('click', function () {
        selectDog();
        hits++;
    });

    $('#refresh').on('click', function () {
        window.location.reload();
    });

    $('#name-submit').on('click', function (e) {
        e.preventDefault();
        var name = $('#name').val();
        writeUserData(name, score);
        $(this).hide();
        $('#name').hide();
    });

    //------ FIREBASE -------//
    var config = {
        apiKey: "AIzaSyBYTdObPy2fReUgU1b8vkVrsp3BhgVBa7U",
        authDomain: "cat-or-dog-98e22.firebaseapp.com",
        databaseURL: "https://cat-or-dog-98e22.firebaseio.com",
        storageBucket: "cat-or-dog-98e22.appspot.com",
        messagingSenderId: "647247528973"
    };
    firebase.initializeApp(config);
    var database = firebase.database();

    function writeUserData(name, score) {
        firebase.database().ref('leaders/').push({
            name: name,
            score: score,
            accuracy: accuracy
        });
    }

    var getLeaderBoard = firebase.database().ref('leaders/');
    getLeaderBoard.on('value', function (snapshot) {
        var array = [];
        var leaderBoard = snapshot.val();
        var leaderBoardKeys = Object.keys(leaderBoard);
        for (var i = 0; i < leaderBoardKeys.length; i++) {
            var leaderBoardEach = leaderBoard[leaderBoardKeys[i]];
            array.push({ name: leaderBoardEach['name'], score: leaderBoardEach['score'], accuracy: leaderBoardEach['accuracy'] });
        };
        array.sort(function (a, b) {

            if (b.accuracy == a.accuracy) {
                console.log(b.accuracy, a.accuracy);
                return b.score - a.score;
            }
            return b.accuracy - a.accuracy;
        });

        clearLeaderBoard();
        for (var j = 0; j < 5; j++) {
            var $leaderBoardName = $('<td>').text(array[j].name).addClass('leaderBoard-name');
            var $leaderBoardScore = $('<td>').text(array[j].score).addClass('leaderBoard-score');
            var $leaderBoardAccuracy = $('<td>').text(array[j].accuracy).addClass('leaderBoard-accuracy');
            leaderbordAppend($leaderBoardName, $leaderBoardScore, $leaderBoardAccuracy);
        }
    });
    function clearLeaderBoard() {
        $('.leaderboard tbody').remove();
    }
    function leaderbordAppend($leaderBoardName, $leaderBoardScore, $leaderBoardAccuracy) {
        $('.leaderboard').append('<tr>', $leaderBoardName, $leaderBoardScore, $leaderBoardAccuracy, '</tr>');
    }
});