var police, thief;
var obstacle1, obstacle2;
var policeImg, thiefImg, thiefGroup, oGroup;
var edges, gameState, lifeline, score;
var obstacleImg1, obstacleImg2, backgroundImg, bg;

function preload(){

  backgroundImg = loadImage("image/bg.png");
  policeImg = loadImage("image/police.png");
  thiefImg = loadImage("image/thief.png");
  obstacleImg1 = loadImage("image/stone1.png")
  obstacleImg2 = loadImage("image/stone2.png")

}

function setup() {
  createCanvas(700,800);
  // bg = createSprite(700, 800);
  // bg.addImage("background", backgroundImg)
  // bg.scale = 0.5;
  // bg.velocityY = 2;
  
  police = createSprite(350,700);
  police.addImage("police", policeImg);
  police.scale = 0.2;

  thiefGroup = new Group();
  oGroup = new Group();

  edges = createEdgeSprites();

  gameState = "play";

  lifeline = 3;
  score = 0;
}

function draw() {
  background(backgroundImg);  

  fill("white")
  textSize(30)
  text("Lifeline: " + lifeline, 550,35)

  fill("white")
  textSize(30)
  text("score: " + score, 550, 70)

  if(gameState === "play"){

    // if(bg.y > 600){
    //   bg.y = 400;
    // }

    if(keyDown("RIGHT_ARROW")){
      police.x = police.x + 5;
    }
  
    if(keyDown("LEFT_ARROW")){
      police.x = police.x - 5;
    }
  
    if(keyDown("space") && police.y>700){
      police.velocityY = police.velocityY - 5 ; 
    }

    spawnThief();
    obstacle();

    // if(thiefGroup.isTouching(police)){
    //   lifeline -= 1;
    //   thiefGroup.destroyEach();
    // }

    if(thiefGroup.isTouching(police)){
      score = score + 1
      thiefGroup.destroyEach();
    }

    if(oGroup.isTouching(police)){
      lifeline -= 1;
      oGroup.destroyEach();
    }

    if(lifeline === 0){
      gameState = "end";
    }

  }
  else if(gameState === "end"){
   // bg.velocityY = 0;
      thiefGroup.setVelocityYEach(0);
      thiefGroup.setVelocityXEach(0);
      text(score +" ThIeVeS CaUgHt", 250,400);
      text("Police Was Ambushed", 220,450);
  }

  police.velocityY = police.velocityY + 1
  police.collide(edges[3])
  
  drawSprites();
}

function spawnThief(){
  if(frameCount % 150 === 0){
    thief = createSprite(400,-50);
    thief.addImage("thieff", thiefImg);
    thief.velocityY = 2;
    thief.velocityX = 2;
    thief.x = Math.round(random(50, 600));
    thief.scale = 0.1;
    thiefGroup.bounceOff(edges);

    // if(thiefGroup.isTouching(edges)){
    //   thiefGroup.setVelocityXEach(thiefGroup.velocityXEach * (-1))
    // }

    thiefGroup.add(thief);
  }
}

function obstacle(){

  if(frameCount % 150 === 0){
    o = createSprite(400,-50);
    o.addImage("obsta", obstacleImg1);
    o.velocityY = 3;
    o.velocityX = -2;
    o.x = Math.round(random(50, 600));
    o.scale = 0.08;
    oGroup.add(o);
  }

}