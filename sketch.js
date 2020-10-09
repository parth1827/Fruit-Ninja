var sword,swordImg;
var fruit , fruit1,fruit2,fruit3,fruit4;
var fruitGroup,monsterGroup;
var monster,monsterImg;
var gameOverImg;

var PLAY = 1;
var END = 0;
var gameState = 1;

var knifeSwooshSound,gameOverSound;

var score;
function preload(){
  
  knifeSwooshSound = loadSound("knifeSwooshSound.mp3");
  gameOverSound = loadSound("gameover.mp3");
  
  monsterImg = loadAnimation("alien1.png","alien2.png");
  swordImg = loadImage("sword.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImg = loadImage("gameover.png");
  
}
function setup(){
  createCanvas(600,600);
  sword = createSprite(40,200,20,20);
  sword.addImage(swordImg);
  sword.scale=0.7;
  
  fruitGroup = new Group();
  monsterGroup = new Group();
  
  score = 0;
}

function draw(){
 background  ("lightgreen");
  
  textSize(20);
  text("Score : "+ score,280,50);
  
  
  if (fruitGroup.isTouching(sword)){
    fruitGroup.destroyEach();
    knifeSwooshSound.play();
    score = score +2;
  }
  
  if (monsterGroup.isTouching(sword)){
    gameState = END;
    gameOverSound.play();
  }
  if(gameState === PLAY){
       sword.x =World.mouseX;
      sword.y = World.mouseY;
    
     }
  
  if (gameState === END){
    sword.addImage(gameOverImg)
    sword.x = 300;
    sword.y = 300;
    fruitGroup.destroyEach();
    monsterGroup.destroyEach();
    fruitGroup.setVelocityX = 0;
    monsterGroup.setVelocityX = 0;
  }
 
  
  fruits();
  enemy();
  
  drawSprites();
}

function fruits(){
  
  if (World.frameCount%80 === 0){
    fruit = createSprite(600,200,20,20);
    fruit.scale=0.2;
    
    //fruit.debug = true
    
    r=Math.round(random(1,4))
    if (r == 1){
      fruit.addImage(fruit1);
    }else if (r == 2){
        fruit.addImage(fruit2);
    }else if (r == 3){
      fruit.addImage(fruit3);
    }else if (r == 4){
      fruit.addImage(fruit4);
    }
      
    fruit.y=Math.round(random(50,340));
    fruit.velocityX = -(7+(score/4));
    fruit.setLifetime = 100;
    
    fruitGroup.add(fruit)
  }
}

function enemy (){
  
  if(World.frameCount%200 === 0){
    monster = createSprite(600,200,20,20);
    monster.addAnimation("monster",monsterImg);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-(8+(score/10));
    monster.setlifetime=50;
    
    monsterGroup.add(monster);
  }
}
  
  

