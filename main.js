lws=0;
rws=0;
rwx=0;
rwy=0;
lwx=0;
lwy=0;
lwyn=0;
a="bjiml.mp3";
b="Eminem-LoseYourSelf.mp3";
song = "";
function preload() {
    song = loadSound(b);
}

function c() {
    song.setVolume(0.2);
    song.rate(3);
    song.play();
}


function setup() {
    y = createCanvas(500, 500);
    y.position(565, 250);
    v = createCapture(VIDEO);
    v.hide();
    posenet = ml5.poseNet(v,modelLoaded);
    posenet.on('pose',gotResults);
}

function draw() {
    image(v, 0, 0, 500, 500);
    fill("#ff0000");
    stroke("#000000");
    if(lws>0.2){
    circle(lwx,lwy,20);
    lwyn = Number(lwy);
    lwyd = Math.floor(lwyn);
    vol = lwyd/500; 
    document.getElementById("spv").innerHTML = "Volume : " + vol;
    song.setVolume(vol);
    console.log(vol);
    }
    circle(rwx,rwy,20);
    if(rwy > 0 && rwy <= 100){
        document.getElementById("sps").innerHTML = "Speed is 0.5x.";
        song.rate(0.5);
    }

    if(rwy > 100 && rwy <= 200){
        document.getElementById("sps").innerHTML = "Speed is 1x.";
        song.rate(1);
    }

    if(rwy > 200 && rwy <= 300){
        document.getElementById("sps").innerHTML = "Speed is 1.5x.";
        song.rate(1.5);
    }

    if(rwy > 300 && rwy <= 400){
        document.getElementById("sps").innerHTML = "Speed is 2x.";
        song.rate(2);
    }
    
    if(rwy > 400 && rwy <= 500){
        document.getElementById("sps").innerHTML = "Speed is 2.5x.";
        song.rate(2.5);
    }

}



function modelLoaded(){
    console.log("Model has been initialised.");
}

function gotResults(results){
    if(results.length>0){
    console.log(results);
    lws = results[0].pose.keypoints[9].score;
    rws = results[0].pose.keypoints[10].score;
    console.log("left wrist score : " + lws + " right wrist score : " + rws);
    lwx = results[0].pose.leftWrist.x;
    lwy = results[0].pose.leftWrist.y;
    rwx = results[0].pose.rightWrist.x;
    rwy = results[0].pose.rightWrist.y;
    console.log("left wrist x : " + lwx + " left wrist y : " + lwy);
    console.log("right wrist x : " + rwx + " right wrist y : " + rwy);
    }
}
