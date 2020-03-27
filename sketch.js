const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine;
var world;
var backgroundImg;
var gameState = "onSling";
var b1 = "sprites/bg1.png";
var score = 0;
var hour;
var minute;
var A= 0;
var time=0;
var day;
var month;
var year;
function preload() {
  getBackgroundImg();
}

function setup() {
  var canvas = createCanvas(1200, 400);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(600, height, 1200, 20);
  platform = new Ground(150, 225, 300, 12);
  barier = new Ground(300, 325, 12, 212);
  support = new Ground(5, 325, 12, 212);
  box1 = new Box(700, 320, 70, 70);
  box2 = new Box(920, 320, 70, 70);
  pig1 = new Pig(810, 350);
  log1 = new Log(810, 280, 300, PI / 2);
  box3 = new Box(720, 270, 70, 70);
  box4 = new Box(900, 270, 70, 70);
  pig3 = new Pig(810, 220);
  log3 = new Log(810, 210, 280, PI / 2);
  box5 = new Box(810, 160, 70, 70);
  pig7 = new Pig(810, 100);
  bird = new Bird(200, 50);
  log6 = new Log(1100, 250, 200, PI / 1);
  log7 = new Log(1100, 170, 100, PI / 2);
  pig2 = new Pig(1100, 150);
  box6 = new Box(500, 350, 70, 70);
  log8 = new Log(500, 300, 100, PI / 2);
  pig4 = new Pig(500, 270);
  pig5 = new Pig(890, 210 - 25);
  pig6 = new Pig(740, 210 - 25);
  log9 = new Log(810, 130, 200, PI / 2);
  slingshot = new SlingShot(bird.body, {x: 200,y: 50});
}

function draw() {
  if (backgroundImg) background(backgroundImg);
  noStroke();
  textSize(35);
  fill(255);
  text("Score : "+score, width - 300, 50);
  Engine.update(engine);
  bird.display();
  slingshot.display();
  barier.display();
  box1.display();
  box2.display();
  ground.display();
  pig1.display();
  log1.display();
  pig1.score();
  pig2.score();
  pig3.score();
  pig4.score();
  pig6.score();
  pig5.score();
  pig7.score();
  box3.display();
  box4.display();
  pig2.display();
  pig3.display();
  log3.display();
  box5.display();
  pig7.display();
  platform.display();
  log6.display();
  log7.display();
  log8.display();
  box6.display();
  pig4.display();
  pig6.display();
  pig5.display();
  log9.display();
  support.display();
  fill(0);
  textSize(45);
  if (score === 1400) {
    text("You Win !", 500, 200);
  }
  textSize(25);
  text("Date : "+day+" : "+month+" : "+year,30,330);
  if (hour>12) {
    text("Time : "+hour-12+" : "+minute+" PM",30,300);
  }
  if (hour<13) {
      text("Time : "+hour+" : "+minute+" AM",30,300);
  }
}

function mouseDragged() {
  if (gameState !== "launched") {
    Matter.Body.setPosition(bird.body, {x: mouseX,y: mouseY});
  }
}

function mouseReleased() {
  slingshot.fly();
  gameState = "launched";
}

function keyPressed() {
  if (keyCode === 32 && bird.body.speed<1) {
    Matter.Body.setPosition(bird.body,{x:200,y:50});
    slingshot.attach(bird.body);
    gameState = "onsling";
    bird.trajectory=[];
  }

}
async function getBackgroundImg() {
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();
  var datetime = responseJSON.datetime;
  hour = datetime.slice(11, 13);
  minute = datetime.slice(14,16);
  day = datetime.slice(8,10)
  month = datetime.slice(5,7);
  year = datetime.slice(0,4);
  if (hour >= 06 && hour <= 19) {
    bg1 = "bg.png";
  } else {
    bg1 = "bg2.jpg";
  }
  backgroundImg = loadImage(bg1);
  console.log(responseJSON.datetime);
}