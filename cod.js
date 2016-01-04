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


function start ()
{
        document.getElementById("image").innerHTML = "<img src='images/5.jpg'>";
        document.getElementById("showButtons").innerHTML = "<input value='Cat' type='submit' id='cat_button' href='JavaScript:nextImage()''><input value='Dog' type='submit' id='dog_button' href='JavaScript:nextImage()''>";
}


// function countdown( timer, minutes, seconds )
// {
//    var element, endTime, hours, mins, msLeft, time;

//     function twoDigits( n )
//     {
//         return (n <= 9 ? "0" + n : n);
//     }

//     function updateTimer()
//     {
//         msLeft = endTime - (+new Date);
//         if ( msLeft < 1000 ) {
//             element.innerHTML = "Time's up!";
//         } else {
//             time = new Date( msLeft );
//             hours = time.getUTCHours();
//             mins = time.getUTCMinutes();
//             element.innerHTML = (hours ? hours + ':' + twoDigits( mins ) : mins) + ':' + twoDigits( time.getUTCSeconds() );
//             setTimeout( updateTimer, time.getUTCMilliseconds() + 500 );
//         }
//     }

//     element = document.getElementById("timer");
//     endTime = (+new Date) + 1000 * (60*minutes + seconds) + 500;
//     updateTimer();1

//    document.getElementById("startButton").innerHTML = "Pause";
// }

//

// countdown( "timer", 0, 30 );