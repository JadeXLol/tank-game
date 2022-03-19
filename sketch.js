function preload(){
  //loading textures
  playerBase =  loadImage('sprites/player/playerBase.png');
  playerGun =  loadImage('sprites/player/playerGun.png');
  crosshair = loadImage('sprites/crosshair2.png');
  bullet = loadImage('sprites/bullet.png');
  greenTank = loadImage('sprites/enemy/greenBase.png');
  greyTank = loadImage('sprites/enemy/greyBase.png');
  redTank = loadImage('sprites/enemy/redBase.png');
  yellowTank = loadImage('sprites/enemy/yellowBase.png');
  enemyGun = loadImage('sprites/enemy/enemyBarrel.png');
  wall = loadImage('sprites/tiles/wall.png');
  crate = loadImage('sprites/tiles/crate.png');
  ground = loadImage('sprites/tiles/ground.png');
  brokenCrate = loadImage('sprites/tiles/brokenCrate.png');
  startScreen = loadImage('sprites/titleScreen.png');
  backGround = loadImage('sprites/background.png');
  
  //loading sounds
  bulletShot = loadSound('sounds/bulletShot.wav');
  bulletHit = loadSound('sounds/bulletBreaks.wav'); 
  crateBroken = loadSound('sounds/crateBreak.wav');
  tankExplosion = loadSound('sounds/tankExplosion.wav');
  tankMoving = loadSound('sounds/tankMoving.wav');
  tankMoving2 = loadSound('sounds/tankMoving2.wav');
  tankMoving3 = loadSound('sounds/tankMoving3.wav');
  gameWon = loadSound('sounds/gameWon.wav');
  gameFinished = loadSound('sounds/gameFinished.wav');
  levelWon = loadSound('sounds/levelWon.wav');
  levelLost = loadSound('sounds/levelLost.wav');
  
  //loading music
  level1 = loadSound('music/level1.mp3');
  level2 = loadSound('music/level2.mp3');
  level3 = loadSound('music/level3.mp3');
  level4 = loadSound('music/level4.mp3');
  level5 = loadSound('music/level5.mp3');
  
  //loadfont
  font = loadFont('ARCADE_N.TTF');
}

//defining all the variables
var songPlaying = 0;
var playerX = 0;
var playerY = 0;
var playerAngle = 0;
var playerVelocity = 0;
var playerSpeedX = 0;
var playerSpeedY = 0;
var gunAngle = 0;
var bulletAngle;
var bulletX = [];
var bulletY = [];
var bulletAngle = [];
var bulletCount = 0;
var playerCooldown = 0;
var playerTankSound = 1;

//This is an array that contains all the data for the level layout
var layout = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

//more variables
var currentLevel = 1;
var levelStatus = "GAME START";
var enemyX = [];
var enemyY = [];
var enemyAngle = [];
var enemyGunAngle = [];
var enemyType = [];
var enemyCount = 0;
var enemyCooldown = [];
var waitTime = 0;

function setup() {
  createCanvas(1920, 1080);
  
  //setting music playmode thing
  level1.playMode("untilDone");
  level2.playMode("untilDone");
  level3.playMode("untilDone");
  level4.playMode("untilDone");
  level5.playMode("untilDone");

  tankMoving.playMode("untilDone");
  tankMoving2.playMode("untilDone");
  tankMoving3.playMode("untilDone");

  bulletShot.playMode("sustain");
  bulletHit.playMode("sustain");
  crateBroken.playMode("sustain");
  levelLost.playMode("untilDone");
  levelWon.playMode("untilDone");
  gameWon.playMode("untilDone");
  gameFinished.playMode("untilDone");
}

function playerTank(){
  angleMode(DEGREES);
  //key controls
  //s
  if(keyIsDown(83)){
    if(playerAngle < 90){
      playerAngle += 3;
    }
    if(playerAngle > 90){
      if(playerAngle > 270){
        playerAngle +=3;
      }
      else{
        playerAngle -=3;
      }
    }
  }
  //w
  else if(keyIsDown(87) ){
    if(playerAngle < 270){
      if(playerAngle > 90){
        playerAngle += 3;
      }
      else{
        playerAngle -= 3;
      }
    }
    else if(playerAngle > 270){
      playerAngle -=3;
    }
  }
  //a
  else if(keyIsDown(65) && playerAngle != 180){
    if(playerAngle > 180){
      playerAngle -= 3;
    }
    if(playerAngle < 180){
      playerAngle +=3;
    }
  }
  //d
  else if(keyIsDown(68) && playerAngle != 0){
    if(playerAngle > 180){
      playerAngle += 3;
    }
    else{
      playerAngle -=3;
    }
  }
  
  //speed decay
  if(!keyIsDown(83) && !keyIsDown(87) && !keyIsDown(65) && !keyIsDown(68)){
    if(playerVelocity > 0){
      playerVelocity -= 0.5;
    }
    if(playerVelocity < 0){
      playerVelocity += 0.5;
    }
  }
  else{
    if(playerVelocity < 3){
      playerVelocity += 0.5;
    }
  }
  
  //playing sound for movement
  if(playerVelocity != 0){
    if(playerTankSound == 1){
      tankMoving.play(0, 1, 0.1);
      playerTankSound = 0;
      setTimeout(() => {playerTankSound = 2;}, 50);
    }else if(playerTankSound == 2){
      tankMoving2.play(0, 1, 0.1);
      playerTankSound = 0;
      setTimeout(() => {playerTankSound = 3;}, 50);
    }else if(playerTankSound == 3){
      tankMoving3.play(0, 1, 0.1);
      playerTankSound = 0;
      setTimeout(() => {playerTankSound = 1;}, 50);
    }
  }
  
  //player angle movment calculation
  if(playerAngle == 0){
    playerSpeedX = playerVelocity;
    playerSpeedY = 0;
  }else if(playerAngle > 0 && playerAngle < 90){
    playerSpeedX = (90-playerAngle)/90*playerVelocity;
    playerSpeedY = (playerAngle/90)*playerVelocity; 
  }else if(playerAngle == 90){
    playerSpeedX = 0;
    playerSpeedY = playerVelocity;
  }else if(playerAngle > 90 && playerAngle < 180){
    playerSpeedX = 0-((playerAngle-90)/90*playerVelocity);
    playerSpeedY = (180-playerAngle)/90*playerVelocity;
  }else if(playerAngle == 180){
    playerSpeedX = -playerVelocity;
    playerSpeedY = 0;
  }else if(playerAngle > 180 && playerAngle < 270){
    playerSpeedX = 0-((270-playerAngle)/90*playerVelocity);
    playerSpeedY = 0-((playerAngle-180)/90*playerVelocity);
  }else if(playerAngle == 270){
    playerSpeedX = 0;
    playerSpeedY = -playerVelocity;
  }else if(playerAngle > 270 && playerAngle < 360){
    playerSpeedX = (playerAngle-270)/90*playerVelocity;
    playerSpeedY = 0-((360-playerAngle)/90*playerVelocity);
  }
  
  //player movement and collision
  if(playerY+playerSpeedY > 30 && playerY+playerSpeedY < 1050 && playerX+playerSpeedX < 1890 && playerX+playerSpeedX >30){
    if(layout[floor((playerY + playerSpeedY+22)/60)][floor((playerX)/60)] != 1 && layout[floor((playerY + playerSpeedY+22)/60)][floor((playerX)/60)] != 2){
      if(layout[floor((playerY + playerSpeedY-22)/60)][floor((playerX)/60)] != 1 && layout[floor((playerY + playerSpeedY-22)/60)][floor((playerX)/60)] != 2){
        playerY += playerSpeedY;
      }
    }
    if(layout[floor((playerY)/60)][floor((playerX + playerSpeedX+22)/60)] != 1 && layout[floor((playerY)/60)][floor((playerX + playerSpeedX+22)/60)] != 2){
      if(layout[floor((playerY)/60)][floor((playerX + playerSpeedX-22)/60)] != 1 && layout[floor((playerY)/60)][floor((playerX + playerSpeedX-22)/60)] != 2){
        playerX += playerSpeedX;
      }
    }  
  }

    
  //gun angle control
  angleMode(DEGREES);
  if(mouseX-5 > playerX){
    if(mouseY-5 > playerY){
      gunAngle = 90-atan((mouseX-5 - playerX)/(mouseY-5-playerY));
    }else if(mouseY == playerY){
      gunAngle = 0;
    }else{
      gunAngle = 270-atan((mouseX-5 - playerX)/(mouseY-5-playerY));
    }
  }else if(mouseX-5 == playerX){
    if(mouseY-5 > playerY){
      gunAngle = 90;
    }else{
      gunAngle = 270;
    }
  }else{
    if(mouseY-5 > playerY){
      gunAngle = 90-atan((mouseX-5 - playerX)/(mouseY-5-playerY));
    }else if(mouseY == playerY){
      gunAngle = 180;
    }else{
      gunAngle = 270-atan((mouseX-5 - playerX)/(mouseY-5-playerY));
    }
  }
  
  //player bullet detection
  for(let i = 0; i < bulletCount; i++){
      if(dist(playerX, playerY, bulletX[i], bulletY[i]) < 22){
        bulletDelete(i);
        levelStatus = "DEAD";
        setTimeout(() => {levelStatus = "STARTING";}, 3000);
        levelLost.play();
        level1.stop();
        level2.stop();
        level3.stop();
        level4.stop();
        level5.stop();
    }
  }
  
  angleMode(RADIANS);
  //drawing the tank
  push();
  translate(playerX, playerY);
  rotate(radians(playerAngle));
  image(playerBase, -50, -50);
  pop();
  
  //drawing the gun
  push();
  translate(playerX, playerY);
  rotate(radians(gunAngle));
  image(playerGun, -50, -50);
  pop();
}

function bulletFunc(){ 
  for(let i = 0; i < bulletCount; i++){
    //drawing bullet
    push();
    translate(bulletX[i], bulletY[i]);
    rotate(radians(bulletAngle[i]+90));
    image(bullet, -6, -10);
    pop();
    
    //bullet movement
    if(bulletAngle[i] == 0){
      bulletX[i] += 7;
    }else if(bulletAngle[i] > 0 && bulletAngle[i] < 90){
      bulletX[i] += (90-bulletAngle[i])/90*7;
      bulletY[i] += (bulletAngle[i]/90)*7; 
    }else if(bulletAngle[i] == 90){
      bulletY[i] += 7;
    }else if(bulletAngle[i] > 90 && bulletAngle[i] < 180){
      bulletX[i] += 0-((bulletAngle[i]-90)/90*7);
      bulletY[i] += (180-bulletAngle[i])/90*7;
    }else if(bulletAngle[i] == 180){
      bulletX[i] += -7;
    }else if(bulletAngle[i] > 180 && bulletAngle[i] < 270){
      bulletX[i] += 0-((270-bulletAngle[i])/90*7);
      bulletY[i] += 0-((bulletAngle[i]-180)/90*7);
    }else if(bulletAngle[i] == 270){
      bulletY[i] += -7;
    }else if(bulletAngle[i] > 270 && bulletAngle[i] < 360){
      bulletX[i] += (bulletAngle[i]-270)/90*7;
      bulletY[i] += 0-((360-bulletAngle[i])/90*7);
    }
    //bullet collision with edges
    if(bulletX[i] > 1910 || bulletX[i] < 10 || bulletY[i] < 10 || bulletY[i] > 1070){
      bulletDelete(i);
    }
    //bullet collision with walls
    if(layout[floor(bulletY[i]/60)][floor(bulletX[i]/60)] == 1){
      bulletDelete(i);
    }
    //bullet collision with crates
    if(layout[floor(bulletY[i]/60)][floor(bulletX[i]/60)] == 2){
      layout[floor(bulletY[i]/60)][floor(bulletX[i]/60)] = 3;
      bulletDelete(i);
      crateBroken.play();
    }
    //bullet collision with other bullets
    for(let j = i+1; j < bulletCount; j++){
      if(dist(bulletX[i],bulletY[i],bulletX[j],bulletY[j]) < 15){
        bulletDelete(i);
        bulletDelete(j);
      }
    }
  }
}

function bulletDelete(i){
  bulletX[i] = bulletX[bulletCount-1];
  bulletY[i] = bulletY[bulletCount-1];
  bulletAngle[i] = bulletAngle[bulletCount-1];
  bulletCount -= 1;
}

function mousePressed(){
  if(playerCooldown == 0 && levelStatus == "ONGOING"){
    //creating a bullet to shoot, and shooting it
    bulletCount++;
    if(gunAngle == 0){
      bulletX.splice(0, 0, playerX+48);
      bulletY.splice(0, 0, playerY);
      bulletAngle.splice(0, 0, gunAngle);
    }else if(gunAngle > 0 && gunAngle < 90){
      bulletX.splice(0, 0, playerX+(90-gunAngle)/90*67);
      bulletY.splice(0, 0, playerY+(gunAngle/90)*67);
      bulletAngle.splice(0, 0, gunAngle);
    }else if(gunAngle == 90){
      bulletX.splice(0, 0, playerX);
      bulletY.splice(0, 0, playerY+48);
      bulletAngle.splice(0, 0, 90);
    }else if(gunAngle > 90 && gunAngle < 180){
      bulletX.splice(0, 0, playerX-((gunAngle-90)/90*67));
      bulletY.splice(0, 0, playerY+((180-gunAngle)/90*67));
      bulletAngle.splice(0, 0, gunAngle);
    }else if(gunAngle == 180){
      bulletX.splice(0, 0, playerX-48);
      bulletY.splice(0, 0, playerY);
      bulletAngle.splice(0, 0, 180);
    }else if(gunAngle > 180 && gunAngle < 270){
      bulletX.splice(0, 0, playerX-((270-gunAngle)/90*67));
      bulletY.splice(0, 0, playerY-((gunAngle-180)/90*67));
      bulletAngle.splice(0, 0, gunAngle);
    }else if(gunAngle == 270){
      bulletX.splice(0, 0, playerX);
      bulletY.splice(0, 0, playerY-48);
      bulletAngle.splice(0, 0, 270);
    }else if(gunAngle > 270 && gunAngle < 360){
      bulletX.splice(0, 0, playerX+(gunAngle-270)/90*67);
      bulletY.splice(0, 0, playerY-((360-gunAngle)/90*67));
      bulletAngle.splice(0, 0, gunAngle);
    }
    playerCooldown = 1;
    setTimeout(() => {playerCooldown = 0;}, 200);
    bulletShot.play(0,1,0.6);
  }
}

function levelSetup(){
  playerAngle = 0;
  playerVelocity = 0;
  playerSpeedX = 0;
  playerSpeedY = 0;
  gunAngle = 0;
  bulletX = [];
  bulletY = [];
  bulletAngle = [];
  bulletCount = 0;
  playerCooldown = 0;
  enemyX = [];
  enemyY = [];
  enemyAngle = [];
  enemyGunAngle = [];
  enemyType = [];
  enemyCount = 0;
  enemyCooldown = [];

  //set up tutorial level layout
  if(currentLevel == 1){
    //defining the layout
    layout = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    
    //defining player position and enemies
    playerX = 180;
    playerY = 540;
    enemyX.splice(0, 0, 960);
    enemyY.splice(0, 0, 540);
    enemyAngle.splice(0, 0, 0);
    enemyType.splice(0, 0, "GREY");
    enemyCooldown.splice(0, 0, 0);
    enemyX.splice(0, 0, 1320);
    enemyY.splice(0, 0, 420);
    enemyAngle.splice(0, 0, 0);
    enemyType.splice(0, 0, "GREY");
    enemyCooldown.splice(0, 0, 0);
    enemyX.splice(0, 0, 1380);
    enemyY.splice(0, 0, 660);
    enemyAngle.splice(0, 0, 0);
    enemyType.splice(0, 0, "GREY");
    enemyCooldown.splice(0, 0, 0);
    enemyX.splice(0, 0, 1620);
    enemyY.splice(0, 0, 420);
    enemyAngle.splice(0, 0, 0);
    enemyType.splice(0, 0, "GREEN");
    enemyCooldown.splice(0, 0, 0);
    enemyX.splice(0, 0, 1740);
    enemyY.splice(0, 0, 660);
    enemyAngle.splice(0, 0, 0);
    enemyType.splice(0, 0, "GREEN");
    enemyCooldown.splice(0, 0, 0);
    enemyCount = 5;
  }
  if(currentLevel == 2){
    //defining 2nd level layout
    layout = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 1, 0, 0, 0, 2, 2, 0, 0, 0, 2, 2, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 2, 0, 0, 0, 2, 2, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 2, 0, 0, 0, 2, 2, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      [2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    
    //defining player start pos
    playerX = 180;
    playerY = 120;
    
    //creating all the enemies
    enemyX.splice(0, 0, 210);
    enemyY.splice(0, 0, 540);
    enemyAngle.splice(0, 0, 0);
    enemyType.splice(0, 0, "GREY");
    enemyCooldown.splice(0, 0, 0);
    enemyX.splice(0, 0, 450);
    enemyY.splice(0, 0, 540);
    enemyAngle.splice(0, 0, 0);
    enemyType.splice(0, 0, "GREY");
    enemyCooldown.splice(0, 0, 0);
    enemyX.splice(0, 0, 990);
    enemyY.splice(0, 0, 690);
    enemyAngle.splice(0, 0, 0);
    enemyType.splice(0, 0, "GREEN");
    enemyCooldown.splice(0, 0, 0);
    enemyX.splice(0, 0, 820);
    enemyY.splice(0, 0, 330);
    enemyAngle.splice(0, 0, 0);
    enemyType.splice(0, 0, "GREEN");
    enemyCooldown.splice(0, 0, 0);
    enemyCooldown.splice(0, 0, 0);
    enemyX.splice(0, 0, 1220);
    enemyY.splice(0, 0, 180);
    enemyAngle.splice(0, 0, 0);
    enemyType.splice(0, 0, "GREEN");
    enemyCooldown.splice(0, 0, 0);
    enemyX.splice(0, 0, 1220);
    enemyY.splice(0, 0, 960);
    enemyAngle.splice(0, 0, 0);
    enemyType.splice(0, 0, "GREEN");
    enemyCooldown.splice(0, 0, 0);
    enemyX.splice(0, 0, 1800);
    enemyY.splice(0, 0, 180);
    enemyAngle.splice(0, 0, 0);
    enemyType.splice(0, 0, "GREEN");
    enemyCooldown.splice(0, 0, 0);
    enemyX.splice(0, 0, 1800);
    enemyY.splice(0, 0, 960);
    enemyAngle.splice(0, 0, 0);
    enemyType.splice(0, 0, "GREEN");
    enemyCooldown.splice(0, 0, 0);
    enemyX.splice(0, 0, 1530);
    enemyY.splice(0, 0, 570);
    enemyAngle.splice(0, 0, 0);
    enemyType.splice(0, 0, "YELLOW");
    enemyCooldown.splice(0, 0, 0);
    enemyCount = 9;
  }
  if(currentLevel == 3){
    layout = [
      [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2],
      [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2],
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0]
    ];
    
    playerX = 180;
    playerY = 120;
    enemyX.splice(0, 0, 960);
    enemyY.splice(0, 0, 150);
    enemyAngle.splice(0, 0, 0);
    enemyCooldown.splice(0, 0, 0);
    enemyType.splice(0, 0, "GREEN");
    enemyX.splice(0, 0, 1260);
    enemyY.splice(0, 0, 90);
    enemyAngle.splice(0, 0, 0);
    enemyCooldown.splice(0, 0, 0);
    enemyType.splice(0, 0, "GREEN");
    enemyX.splice(0, 0, 1800);
    enemyY.splice(0, 0, 270);
    enemyAngle.splice(0, 0, 0);
    enemyCooldown.splice(0, 0, 0);
    enemyType.splice(0, 0, "GREEN");
    enemyX.splice(0, 0, 1780);
    enemyY.splice(0, 0, 810);
    enemyAngle.splice(0, 0, 0);
    enemyCooldown.splice(0, 0, 0);
    enemyType.splice(0, 0, "GREEN");
    enemyX.splice(0, 0, 960);
    enemyY.splice(0, 0, 900);
    enemyAngle.splice(0, 0, 0);
    enemyCooldown.splice(0, 0, 0);
    enemyType.splice(0, 0, "GREEN");
    enemyX.splice(0, 0, 660);
    enemyY.splice(0, 0, 990);
    enemyAngle.splice(0, 0, 0);
    enemyCooldown.splice(0, 0, 0);
    enemyType.splice(0, 0, "GREEN");
    enemyX.splice(0, 0, 480);
    enemyY.splice(0, 0, 540);
    enemyAngle.splice(0, 0, 0);
    enemyCooldown.splice(0, 0, 0);
    enemyType.splice(0, 0, "YELLOW");
    enemyX.splice(0, 0, 960);
    enemyY.splice(0, 0, 540);
    enemyAngle.splice(0, 0, 0);
    enemyCooldown.splice(0, 0, 0);
    enemyType.splice(0, 0, "YELLOW");
    enemyX.splice(0, 0, 1280);
    enemyY.splice(0, 0, 540);
    enemyAngle.splice(0, 0, 0);
    enemyCooldown.splice(0, 0, 0);
    enemyType.splice(0, 0, "RED");
    
    enemyCount = 9;
  }
  if(currentLevel == 4){
    layout = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    playerX = 960;
    playerY = 540;
    enemyX.splice(0, 0, 540);
    enemyY.splice(0, 0, 540);
    enemyAngle.splice(0, 0, 0);
    enemyType.splice(0, 0, "RED");
    enemyCooldown.splice(0, 0, 0);
    enemyX.splice(0, 0, 1380);
    enemyY.splice(0, 0, 540);
    enemyAngle.splice(0, 0, 0);
    enemyType.splice(0, 0, "RED");
    enemyCooldown.splice(0, 0, 0);
    enemyX.splice(0, 0, 150);
    enemyY.splice(0, 0, 150);
    enemyAngle.splice(0, 0, 0);
    enemyType.splice(0, 0, "YELLOW");
    enemyCooldown.splice(0, 0, 0);
    enemyX.splice(0, 0, 150);
    enemyY.splice(0, 0, 930);
    enemyAngle.splice(0, 0, 0);
    enemyType.splice(0, 0, "YELLOW");
    enemyCooldown.splice(0, 0, 0);
    enemyX.splice(0, 0, 1770);
    enemyY.splice(0, 0, 150);
    enemyAngle.splice(0, 0, 0);
    enemyType.splice(0, 0, "YELLOW");
    enemyCooldown.splice(0, 0, 0);
    enemyX.splice(0, 0, 1770);
    enemyY.splice(0, 0, 930);
    enemyAngle.splice(0, 0, 0);
    enemyType.splice(0, 0, "YELLOW");
    enemyCooldown.splice(0, 0, 0);
    enemyCount = 6;
  }
  if(currentLevel == 5){
    layout = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    playerX = 960;
    playerY = 540;
    enemyX.splice(0, 0, 150);
    enemyY.splice(0, 0, 150);
    enemyAngle.splice(0, 0, 0);
    enemyType.splice(0, 0, "RED");
    enemyCooldown.splice(0, 0, 0);
    enemyX.splice(0, 0, 150);
    enemyY.splice(0, 0, 930);
    enemyAngle.splice(0, 0, 0);
    enemyType.splice(0, 0, "RED");
    enemyCooldown.splice(0, 0, 0);
    enemyX.splice(0, 0, 1770);
    enemyY.splice(0, 0, 150);
    enemyAngle.splice(0, 0, 0);
    enemyType.splice(0, 0, "RED");
    enemyCooldown.splice(0, 0, 0);
    enemyX.splice(0, 0, 1770);
    enemyY.splice(0, 0, 930);
    enemyAngle.splice(0, 0, 0);
    enemyType.splice(0, 0, "RED");
    enemyCooldown.splice(0, 0, 0);
    enemyCount = 4;
  }
  levelStatus = "ONGOING";
}    

function levelFunc(){
  for(let i = 0; i < layout[0].length; i++){
    for(let j = 0; j < layout.length; j++){
      if(layout[j][i] == 0){
        image(ground, i*60, j*60);
      }
      else if(layout[j][i] == 1){
        image(wall, i*60, j*60);
      }
      else if(layout[j][i] == 2){
        image(crate, i*60, j*60);
      }
      else if(layout[j][i] == 3){
        image(ground, i*60, j*60);
        image(brokenCrate, i*60, j*60);
      }
    }
  }
  if(levelStatus == "ONGOING"){
    if(enemyCount == 0){
      if(currentLevel != 5){
        setTimeout(() => {levelStatus = "SWITCHING"}, 3000);
        waitTime = 0;
        levelWon.play();
        level1.stop();
        level2.stop();
        level3.stop();
        level4.stop();
        level5.stop();
      }
      else{
        setTimeout(() => {levelStatus = "GAME WON"}, 5000); 
        gameWon.play();
      }
    }
  }
}

function levelSwitch(){
  background(180, 230, 250);
  textSize(40);
  if(waitTime == 0){
    text("THE NEXT LEVEL IS LOADING...", 200, 520);
    setTimeout(() => {waitTime = 1}, 5000);
  }
  if(waitTime == 1){
    text(" Press any button to start the next level!", 150, 560);
  }
}

function keyPressed(){
  if(levelStatus == "GAME START"){
    levelStatus = "INSTRUCTIONS";
  }else if(levelStatus == "INSTRUCTIONS"){
    levelStatus = "STARTING";
  }
  if(levelStatus == "SWITCHING" && waitTime == 1){
    waitTime = 0;
    currentLevel++;
    levelStatus = "STARTING";
    levelSetup();
  }
}

function enemyFunc(){
  for(let i = 0; i < enemyCount; i++){
    //seeing if there is a line of sight to the person
    
    angleMode(DEGREES);
    //enemy gun angle control
    if(playerX > enemyX[i]){
      if(playerY > enemyY[i]){
        enemyGunAngle[i] = 90-atan((playerX - enemyX[i])/(playerY-enemyY[i]));
      }else if(playerY == enemyY[i]){
        enemyGunAngle[i] = 0;
      }else{
        enemyGunAngle[i] = 270-atan((playerX - enemyX[i])/(playerY-enemyY[i]));
      }
    }else if(playerX == enemyX[i]){
      if(playerY > enemyY[i]){
        enemyGunAngle[i] = 90;
      }else{
        enemyGunAngle[i] = 270;
      }
    }else{
      if(playerY > enemyY[i]){
        enemyGunAngle[i] = 90-atan((playerX - enemyX[i])/(playerY-enemyY[i]));
      }else if(playerY == enemyY[i]){
        enemyGunAngle[i] = 180;
      }else{
        enemyGunAngle[i] = 270-atan((playerX - enemyX[i])/(playerY-enemyY[i]));
      }
    }
    
    //enemy gun angle keeping within 360
    if(enemyGunAngle[i] > 360){
      enemyGunAngle[i] -= 360;
    }if(enemyGunAngle[i] < 0){
      enemyGunAngle[i] += 360;
    }
    
    //making the enemy face towards it's gun
    enemyAngle[i] = enemyGunAngle[i];
    
    //drawing enemy tank
    push();
    translate(enemyX[i], enemyY[i]);
    rotate(enemyAngle[i]);
    if(enemyType[i] == "GREEN"){
      image(greenTank, -50, -50);
    }
    if(enemyType[i] == "GREY"){
      image(greyTank, -50, -50);
    }
    if(enemyType[i] == "YELLOW"){
      image(yellowTank, -50, -50);
    }
    if(enemyType[i] == "RED"){
      image(redTank, -50, -50);
    }
    pop();
    
    //drawing enemy gun
    push();
    translate(enemyX[i], enemyY[i]);
    rotate(enemyGunAngle[i]);
    image(enemyGun, -50, -50);
    pop();
    
    //shooting
    if(enemyCooldown[i] == 0){
      if(enemyGunAngle[i] == 0){
      bulletX.splice(0, 0, enemyX[i]+48);
      bulletY.splice(0, 0, enemyY[i]);
      bulletAngle.splice(0, 0, 0-10+random(20));
    }else if(enemyGunAngle[i] > 0 && enemyGunAngle[i] < 90){
      bulletX.splice(0, 0, enemyX[i]+(90-enemyGunAngle[i])/90*67);
      bulletY.splice(0, 0, enemyY[i]+(enemyGunAngle[i]/90)*67);
      bulletAngle.splice(0, 0, enemyGunAngle[i]-10+random(20));
    }else if(enemyGunAngle[i] == 90){
      bulletX.splice(0, 0, enemyX[i]);
      bulletY.splice(0, 0, enemyY[i]+48);
      bulletAngle.splice(0, 0, 90-10+random(20));
    }else if(enemyGunAngle[i] > 90 && enemyGunAngle[i] < 180){
      bulletX.splice(0, 0, enemyX[i]-((enemyGunAngle[i]-90)/90*67));
      bulletY.splice(0, 0, enemyY[i]+((180-enemyGunAngle[i])/90*67));
      bulletAngle.splice(0, 0, enemyGunAngle[i]-10+random(20));
    }else if(enemyGunAngle[i] == 180){
      bulletX.splice(0, 0, enemyX[i]-48);
      bulletY.splice(0, 0, enemyY[i]);
      bulletAngle.splice(0, 0, 180-10+random(20));
    }else if(enemyGunAngle[i] > 180 && enemyGunAngle[i] < 270){
      bulletX.splice(0, 0, enemyX[i]-((270-enemyGunAngle[i])/90*67));
      bulletY.splice(0, 0, enemyY[i]-((enemyGunAngle[i]-180)/90*67));
      bulletAngle.splice(0, 0, enemyGunAngle[i]-10+random(20));
    }else if(enemyGunAngle[i] == 270){
      bulletX.splice(0, 0, enemyX[i]);
      bulletY.splice(0, 0, enemyY[i]-48);
      bulletAngle.splice(0, 0, 270-10+random(20));
    }else if(enemyGunAngle[i] > 270 && enemyGunAngle[i] < 360){
      bulletX.splice(0, 0, enemyX[i]+(enemyGunAngle[i]-270)/90*67);
      bulletY.splice(0, 0, enemyY[i]-((360-enemyGunAngle[i])/90*67));
      bulletAngle.splice(0, 0, enemyGunAngle[i]-10+random(20));
    }
      bulletCount++;
      enemyCooldown[i] = 1;
      if(enemyType[i] == "GREY"){
        setTimeout(() => {enemyCooldown[i] = 0;}, 1800+random(400));
      }
      else if(enemyType[i] == "GREEN"){
        setTimeout(() => {enemyCooldown[i] = 0;}, 1350+random(300));
      }
      else if(enemyType[i] == "YELLOW"){
        setTimeout(() => {enemyCooldown[i] = 0;}, 900+random(200));
      }
      else if(enemyType[i] == "RED"){
        setTimeout(() => {enemyCooldown[i] = 0;}, 400+random(200));
      }
    }
    
    //bullet hit detection
    for(let j = 0; j < bulletCount; j++){
      if(dist(enemyX[i], enemyY[i], bulletX[j], bulletY[j]) < 22){
        var temp = i;
        i = j;
        bulletDelete(i);
        i = temp;
        enemyX[i] = enemyX[enemyCount-1];
        enemyY[i] = enemyY[enemyCount-1];
        enemyGunAngle[i] = enemyGunAngle[enemyCount-1];
        enemyType[i] = enemyType[enemyCount-1];
        enemyAngle[i] = enemyAngle[enemyCount-1];
        enemyCooldown[i] = enemyCooldown[enemyCount-1];
        enemyCount -= 1;
        tankExplosion.play();
      }
    }
  }
}

function draw() {
  textFont(font);
  try{
  angleMode(RADIANS);
  ellipseMode(RADIUS);
    
  //keeping angles within 0-360
  if(playerAngle >= 360){
    playerAngle -= 360;
  }
  if(playerAngle < 0){
    playerAngle += 360;
  }
  
  //call functions
  if(levelStatus == "GAME START"){
    image((startScreen), 0, 0);
    textSize(50);
    text("Press any button for instructions.", 180, 720);
  }
  if(levelStatus == "INSTRUCTIONS"){
    image(backGround, 0, 0);
    textSize(80);
    text("INSTRUCTIONS:", 60, 100);
    textSize(20);
    text("The objective is to shoot all enemy tanks (tanks that aren't blue)", 60, 200);
    textSize(30);
    text("Enemies die in one shot, but so do you!", 60, 300);
    textSize(20);
    text("Move WASD to move around. Your angle will automatically be adjusted", 60, 400);
    textSize(30);
    text("Shoot by left clicking on your mouse!", 60, 500);
    text("There are 5 levels, each level being harder than the last!", 60, 600);
    textSize(40);
    text("Press any button to start!", 540, 800);
  }
  if(levelStatus == "GAME WON"){
    level5.stop();
    image(startScreen,0,0);
    textSize(100);
    text("YOU WON!", 600, 700);
    gameFinished.play();
  }
  if(levelStatus == "SWITCHING"){
    levelSwitch();
  }
  else if(levelStatus == "STARTING"){
    levelSetup();
  }
  else if(levelStatus == "ONGOING"){
    if(currentLevel == 1){
      level1.play();
    }
    else if(currentLevel == 2){
      level2.play();
    }
    else if(currentLevel == 3){
      level3.play();
    }
    else if(currentLevel == 4){
      level4.play();
    }    
    else if(currentLevel == 5){
      level5.play();
    }
  background(200, 200, 200);
  levelFunc();
  playerTank();
  bulletFunc();
  enemyFunc();

  //crosshair
  image(crosshair, mouseX-10, mouseY-10);
    }
  }
  catch(err){}
}