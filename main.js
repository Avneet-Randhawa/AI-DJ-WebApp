song = "";

function preload(){
    song = loadSound("music.mp3");
}

scoreRightWrist = 0;
scoreLeftWrist = 0;


RightWristX = 0;
LefttWristX = 0;

RightWristY = 0;
LefttWristY = 0;

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',got_results);
}

function modelLoaded(){
    console.log("PoseNet is Intialized!!!");
    window.alert("PoseNet is Intialized!!!");
}

function got_results(results){
    if(results.length > 0){
        console.log(results);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("Right Wrist Score is " + scoreRightWrist + " Left Wrist Score is " + scoreLeftWrist);

        RightWristX = results[0].pose.rightWrist.x;
        RightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X is " + RightWristX + " Right Wrist Y is " + RightWristY);

        LeftWristX = results[0].pose.leftWrist.x;
        LeftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X is " + LeftWristX + " Left Wrist Y is " + LeftWristY);
    }
}

function draw(){
    image(video,0,0,600,500);
    stroke("rgb(0,0,0)");
    fill("rgb(255,255,255)");

    if(scoreRightWrist > 0.0002){

        circle(RightWristX,RightWristY,20);
        if(RightWristY > 0 && RightWristY <= 100){
            document.getElementById("speed").innerHTML = "Speed :- 0.5x";
            song.rate(0.5);
        }
        if(RightWristY > 100 && RightWristY <= 200){
            document.getElementById("speed").innerHTML = "Speed :- 1x";
            song.rate(1);
        }
        if(RightWristY > 200 && RightWristY <= 300){
            document.getElementById("speed").innerHTML = "Speed :- 1.5x";
            song.rate(1.5);
        }
        if(RightWristY > 300 && RightWristY <= 400){
            document.getElementById("speed").innerHTML = "Speed :- 2x";
            song.rate(2);
        }
        if(RightWristY > 400 && RightWristY <= 500){
            document.getElementById("speed").innerHTML = "Speed :- 2.5x";
            song.rate(2.5);
        }
    }

    if(scoreLeftWrist > 0.0002){
        circle(LeftWristX,LeftWristY,20);
        InNumber = Number(LeftWristY);
        RemoveDecimal = floor(InNumber);
        volume = RemoveDecimal/500;
        console.log("Volume is :- " + volume);
        document.getElementById("volume").innerHTML = "Volume :- " + volume;
        song.setVolume(volume);
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}