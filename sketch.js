var PLAY = 1;
var END = 0;
var gameState = 1;

var background1, backgroundImg;
var dog, dogImg;
var edges;
var obstacleGroup;
var obstacle, obstacleImg;
var deformedObsImg;
var ground;
var bone, boneImg;
var score = 0;
var boneTouch;

function preload(){
  backgroundImg = loadImage("beachbg.jpg");
  dogImg = loadImage("dog2.png");
  obstacleImg = loadImage("obstacle.png");
  deformedObsImg = loadImage("deformedObstacle.png");
  boneImg = loadImage("bone.png");
  boneTouch = loadSound("sound1.mp3");
}


function setup() {
  createCanvas(1200,600);

  //background1 = createSprite(550,300,1200,600);
  //background1.addImage(backgroundImg);
  //background1.scale = 0.9;
  background.velocityX = -4;

  dog = createSprite(1000, 500, 400, 400);
  dog.addImage(dogImg);
  dog.scale = 0.3;

  dog.setCollider("rectangle", 0,0,50,50);
  dog.debug = "true";
  

  edges = createEdgeSprites();

  ground = createSprite(600, 595, 2200, 20);
  ground.velocityX = -4;

  obstacleGroup = createGroup();
  boneGroup = createGroup();

  
}

function draw() {
  background(backgroundImg);


  
if(gameState === PLAY){

  if(boneGroup.collide(dog)){
    console.log("hello");
    score = score + 2;
    boneTouch.play();
    boneGroup.destroyEach();
    
  }

  obstacles();
  bones();

  if(background.x < 0){
    background.x = background.width/2;
   }
   
   
   if(ground.x < 0){
    ground.x = ground.width/2;
   }
    
  
  if(keyDown(LEFT_ARROW)){
    dog.velocityX = -4;
  }
  
  if(keyWentUp(LEFT_ARROW)){
    dog.velocityX = 0;
  }
  
  if(keyDown(RIGHT_ARROW)){
    dog.velocityX = 4;
  }
  
  if(keyWentUp(RIGHT_ARROW)){
    dog.velocityX = 0;
  }
  
  if(keyDown(UP_ARROW)){
    dog.velocityY = -5;
  }

  if(keyDown(DOWN_ARROW)){
    dog.velocityY = 4;
  }
  dog.velocityY = dog.velocityY + 0.2;

  

  if(obstacleGroup.isTouching(dog)){
    gameState = END;
    console.log("game over");
    
  }

  
}

else
{
if(gameState === END){
  textSize(25);
  fill("black");
  text("GAME OVER", 550,300);
  

  obstacleGroup.destroyEach();
  boneGroup.destroyEach();

  background1.velocityX = 0;
  ground.velocityX = 0;

  
  


}
}

 

dog.collide(ground);

textSize(25);
fill("black");
text("Score: " + score, 800,50);

  drawSprites();
}

function obstacles(){
  var obstacle = createSprite(-100,0,30,30);
  obstacle.addImage(obstacleImg);

  if(frameCount % 80 === 0){
  obstacle.y = Math.round(random(200,400));
  obstacle.x = Math.round(random(100,1000));
  obstacle.velocityX = 4;

  obstacle.lifeTime = 50;
  }

  obstacleGroup.add(obstacle);
}


function bones(){
  var bone = createSprite(-100,400,30,30);
  bone.addImage(boneImg);
  bone.scale = 0.3;

  if(frameCount % 50 === 0){
    bone.x = Math.round(random(100,1000));
    bone.y = Math.round(random(200,400));
    bone.velocityX = 4;
    
    bone.lifeTime = 50;
    
  }

  boneGroup.add(bone);
}