var treximg;
var trex;
var trexlean
var ground
var groundimg
var cloud
var obstacle
var cloudimg
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6
var obstaclegroup
var cloudgroup
var restart, restartimg
var gameover, gameoverimg
var score=0;
var START=2
var PLAY=1
var END=3
var GameState=START
var bgroup
var bird
var birdimg
var trexsurprised

localStorage["HighestScore"]=0

function preload(){
 treximg=loadAnimation("trex1.png","trex3.png", "trex4.png");
  trexlean=loadAnimation("offline-sprite-2x.png")
  groundimg=loadImage("ground2.png")
  cloudimg=loadImage("cloud.png")
  obstacle1=loadImage("obstacle1.png")
  obstacle2=loadImage("obstacle2.png")
  obstacle3=loadImage("obstacle3.png")
  obstacle4=loadImage("obstacle4.png")
  obstacle5=loadImage("obstacle5.png")
  obstacle6=loadImage("obstacle6.png")
  restartimg=loadImage("restart.png")
  gameoverimg=loadImage("gameOver.png")
  birdimg=loadImage("offline-sprite-2x (2).png")
  trexsurprised=loadImage("trex_collided.png")
}

function setup() {
  createCanvas(600, 200);
  trex=createSprite(50,170,10,10);
  trex.addAnimation("trex1",treximg);
  trex.addAnimation("trex2",trexlean)
  trex.scale=0.5;
  trex.addAnimation("trex3", trexsurprised)
  ground=createSprite(300,180,600,10)
  ground.addImage(groundimg)
  ground2=createSprite(300,190,600,10)
  ground2.visible=false
  ground.velocityX=-4
  cloudgroup=new Group()
  obstaclegroup=new Group()
  restart=createSprite(300,150)
  restart.addImage(restartimg)
  gameover=createSprite(300,100)
  gameover.addImage(gameoverimg)
  gameover.visible=false
  restart.visible=false
  bgroup=new Group()
}

function draw() {
  
  //trex.debug = true;
  background(255);   
  text("Score "+score,500,50)
 
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"]=score
  }
  text("High Score"+localStorage["HighestScore"], 444,30)
  
  if(GameState===START){
        bgroup.setVelocityXEach(0);
        ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclegroup.setVelocityXEach(0);
    cloudgroup.setVelocityXEach(0);
    if(keyDown("space")||keyDown(UP_ARROW)){
      GameState = PLAY;}
  }
  if(GameState===PLAY){
      if(keyDown("space") && trex.y >= 150||keyDown("UP_ARROW")&&trex.y>=150){
      trex.velocityY = -10 ;
    }
         score=score+Math.round(getFrameRate()/60)
  if(keyWentDown("DOWN_ARROW")){
    trex.changeAnimation("trex2",trexlean)
  }
   if(keyWentUp("DOWN_ARROW")){
    trex.changeAnimation("trex1",treximg)
  }
    //add gravity
    trex.velocityY = trex.velocityY + 0.4;
  
  if(ground.x<0){
    ground.x=ground.width/2
  }
spawnObstacles();
  spawnClouds();
    Bird();
  if(obstaclegroup.isTouching (trex)||bgroup.isTouching(trex)){
    GameState=END
  }
  }
  if(GameState===END){
       bgroup.setVelocityXEach(0);
        ground.velocityX = 0;
    trex.velocityY = 0;
    trex.changeAnimation("trex3", trexsurprised)
    obstaclegroup.setVelocityXEach(0);
    cloudgroup.setVelocityXEach(0);
    bgroup.setLifetimeEach(-1)
    cloudgroup.setLifetimeEach(-1)
    obstaclegroup.setLifetimeEach(-1)
    gameover.visible=true
    restart.visible=true
    if(mousePressedOver(restart)){
    reset()  
      
    }
  }
 drawSprites();
  trex.collide(ground2)
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
  obstacle = createSprite(600,160,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) { case 1: obstacle.addImage(obstacle1); break; case 2: obstacle.addImage(obstacle2); break; case 3: obstacle.addImage(obstacle3); break; case 4: obstacle.addImage(obstacle4); break; case 5: obstacle.addImage(obstacle5); break; case 6: obstacle.addImage(obstacle6); break; default: break; }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 110;
    obstaclegroup.add(obstacle)
  }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudimg);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudgroup.add(cloud)
  }
}
function reset(){
  GameState=START
obstaclegroup.destroyEach()
  cloudgroup.destroyEach()
  bgroup.destroyEach()
   score=0
  gameover.visible=false
  restart.visible=false
  trex.changeAnimation("trex1", treximg)
  
}
function Bird(){
   if (frameCount % 200 === 0) {
    bird = createSprite(600,120,40,10);
    bird.y = Math.round(random(80,120));
    bird.addImage(birdimg);
    bird.scale = 0.5;
    bird.velocityX = -3;
     bird.debug=true
     bird.setCollider("circle", 0,0,30)
    
     //assign lifetime to the variable
    bird.lifetime = 200;
     bgroup.add(bird)
}
}