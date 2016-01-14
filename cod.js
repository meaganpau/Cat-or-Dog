var array = [];
document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
            alert('left');
            break;
        case 39:
            alert('right');
            break;
    }
};

function start() 
{   
    showPic ();   
    document.getElementById("showButtons").innerHTML = "<button id='cat_button' onclick='showPic()'>Cat</button><button id='dog_button' onclick='showPic()'>Dog</button>";
    document.getElementById("startButton").innerHTML = "";
    document.getElementById("startTime").innerHTML = "<div id='timer'></div>";
    countdown("timer", 0, 30);
}

function showPic() 
{
    var random_number = Math.floor((Math.random() * 61) + 1);
    var randomIsInArray = array.indexOf(random_number) >= 0

    while(randomIsInArray) {
        if(array.length === 2) {
            break;
        }
        else    {
        random_number = Math.floor((Math.random() * 61) + 1);
        var randomIsInArray = array.indexOf(random_number) >= 0
    }
    }

    array.push(random_number)

    document.getElementById("image").innerHTML = "<img src='images/" + random_number + ".jpg'; height='200px'>";
}

function countdown( elementName, minutes, seconds )
{
    var element, endTime, hours, mins, msLeft, time;
    element = document.getElementById( "timer" );

    function twoDigits( n )
    {
        return (n <= 9 ? "0" + n : n);
    }

    function updateTimer()
    {
        msLeft = endTime - (+new Date);
        if ( msLeft < 1000 ) {
            element.innerHTML = "Time's Up!";
            document.getElementById("showButtons").innerHTML = "";
        } else {
            time = new Date( msLeft );
            hours = time.getUTCHours();
            mins = time.getUTCMinutes();
            element.innerHTML = (hours ? hours + ':' + twoDigits( mins ) : mins) + ':' + twoDigits( time.getUTCSeconds() );
            setTimeout( updateTimer, time.getUTCMilliseconds() + 500 );
        }
    }

    endTime = (+new Date) + 1000 * (60*minutes + seconds) + 500;
    updateTimer();
}



