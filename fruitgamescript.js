var playing=false;
var score;
var trialleft;
var fruit=['1','2','3','4','5','6','7','8'];
var  step;
var action;
$(function()
{
    $("#start").on("click",function()
    {
        if(playing==true)
        {
            location.reload();
        }
        else
        {
            playing==false;

            //setting the value of score to be 0
            score=0;
            $("#scorevalue").html(score);

            //setting the trials
            $("#trialsleft").show();
            trialleft=3;
            addHeart();

            //change start to rest
            $("#start").html("Re-Start");

            //start sending fruits
            fruitAction();

            //hide game over box
            $("#gameover").hide();
        }
    });

    $("#fruit1").mouseover(function()
    {
        score++;
        $("#scorevalue").html(score); //update score
        //document.getElementById("slicesound").play();
        $("#slicesound")[0].play();//play sound
        
        //stop fruit
        clearInterval(action);
        
        //hide fruit
        $("#fruit1").hide("explode", 500); //slice fruit
        
        //send new fruit
        setTimeout(fruitAction, 800);
    });
     





    function addHeart()
    {
         $("#trialsleft").empty();
         for(i = 0; i < trialleft; i++)
         {
            $("#trialsleft").append('<img src="heart.png" class=life>'+"  ");
         }
    }

    function fruitAction()
    {
        $("#fruit1").show();// to generate fruit

        chooseFruit();// to  choose a fruit

        $("#fruit1").css({'left': Math.round(900*Math.random()), 'top' : 79});//postion of the fruit
         //generate a random step
        step = 1+ Math.round(5*Math.random()); // change step
    
        // Move fruit down by one step every 10ms
        action = setInterval(function()
        {
        
            //move fruit by one step
             $("#fruit1").css('top', $("#fruit1").position().top + step);                              
            
             //check if the fruit is too low
             if($("#fruit1").position().top > $("#question").height())
             {
                 //check if we have trials left
                 if(trialleft > 1 )
                 {
                    //generate a fruit
                     $("#fruit1").show();
                    chooseFruit(); //choose a random fruit
                     $("#fruit1").css({'left' : Math.round(900*Math.random()), 'top' : 79}); //random position

                     //generate a random step
                    step = 1+ Math.round(5*Math.random()); // change step
                
                    //reduce trials by one
                    trialleft --;
                
                     //populate trialsLeft box
                     addHeart();
                
                }
                else
                {    // game over
                     playing = false; //we are not playing anymore
                     $("#start").html("Start Game"); // change button to Start Game
                     $("#gameover").show();
                    $("#gameover").html('<p>Game Over!</p><p>Your score is '+ score +'</p>');
                    $("#trialsleft").hide();
                    stopAction();
                }
            }
        }, 10);

    }

    function chooseFruit()
    {
        $("#fruit1").attr("src"+fruit[Math.round(Math.random()*8)]+".png")
    }
    function stopAction(){
        clearInterval(action);
        $("#fruit1").hide();
    }
    
}
);

