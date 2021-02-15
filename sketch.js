var START = 0;
var PLAY = 1;
var END = 2;
var gameState = START;
var path,boy,cash,diamonds,jwellery,sword,end;
var pathImg,boyRunning,boyCollided,cashImg,diamondsImg,jwelleryImg,swordImg,endImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;


function preload(){
  pathImg = loadImage("Road.png");
  boyRunning = loadAnimation("runner1.png","runner2.png");
  boyCollided = loadAnimation("runner1.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadImage("gameOver.png");
}


function setup(){
  createCanvas(800,800);
  
  path=createSprite(400,400);
  path.addImage(pathImg);
  path.velocityY = 4;

  boy = createSprite(70,730,20,20);
  boy.addAnimation("SahilRunning",boyRunning);
  boy.addAnimation("SahilCollided",boyCollided);
  boy.scale=0.08;
  
  cashG=new Group();
  diamondsG=new Group();
  jwelleryG=new Group();
  swordGroup=new Group();
  
  end=createSprite(400,400,20,20);
  end.addImage(endImg);
  end.visible=false;
}


function draw() {
  if (gameState===START){
    background(28, 33, 30);
    
    path.visible=false;
    boy.visible=false;
    cashG.visibleEach=false;
    diamondsG.visibleEach=false;
    jwelleryG.visibleEach=false;
    swordGroup.visibleEach=false;
    
    textSize(40);
    fill("Red");
    text("Press SPACE KEY to start",175,400);
    
    if (keyDown("SPACE")){
      gameState=PLAY;
    }
  }
  
  else if (gameState===PLAY){
    path.visible=true;
    boy.visible=true;
    cashG.visibleEach=true;
    diamondsG.visibleEach=true;
    jwelleryG.visibleEach=true;
    swordGroup.visibleEach=true;
    
    boy.x = World.mouseX;
  
    edges= createEdgeSprites();
    boy.collide(edges);
  
    if(path.y > 800 ){
      path.y = height/2;
    }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+100;
    }    
    else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection=treasureCollection+150;
    }    
    else if(swordGroup.isTouching(boy)) {
      swordGroup.destroyEach();
      treasureCollection=treasureCollection-200;
      gameState=END;
    }
  }
  
  else if(gameState===END){
    end.visible=true;
    
    boy.changeAnimation("SahilCollided",boyCollided);
    
    path.velocityY=0;
    cashG.setVelocityYEach(0);
    diamondsG.setVelocityYEach(0);
    jwelleryG.setVelocityYEach(0);
    swordGroup.setVelocityYEach(0);
    
    cashG.setVelocityYEach(0);
    diamondsG.setVelocityYEach(0);
    jwelleryG.setVelocityYEach(0);
    swordGroup.setVelocityYEach(0);
  }
  
  drawSprites();
  
  textSize(40);
  fill("Red");
  text("Treasure: "+ treasureCollection,300,40);
}  
  

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, 750),100, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 300;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, 750),100, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 300;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50, 750),100, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 300;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 750),100, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 300;
  swordGroup.add(sword);
  }
}