let fundo;

// Snake
let canvaw = 400
let canvah = 400;

// variáveis da snake
let xCobra = 50;
let yCobra = 40;
let wCobra = 20;
let hCobra = 20;

//pontos
let MeusPontos = 0;

//velocidade da movimentação
let velocidadeMovimentacao = 1;

let direcao = "right";

let partes = 1;
let rabo = [];

posicaoXcomida = randomIntFromInterval(11, canvaw - 10);
posicaoYcomida = randomIntFromInterval(11, canvah - 10)

let colidiu = false;
let comeu = false;

//paredes

let wParED = 10;
let hParED = 400;
let posXParE = 0;
let posYParE = 0;
let posXParD = 390;
let posYParD = 0;

// cima | baixo

let wParCB = 400;
let hParCB = 10;
let posXParC = 0;
let posYParC = 0;
let posXParB = 0;
let posYParB = 390;


function setup() {
  createCanvas(canvaw, canvah);
}

function preload(){
  fundo = loadImage("Fundo.png");
  maca = loadImage("Maça.png");
  cobracabeca = loadImage("1.png");
  cobracorpo = loadImage("Corpo.png")
}

function draw() {
  background(fundo);
  desenhaCobra();
  controleMovimentacao();
  desenhaParedes();
  desenhaComida();
  comer();
  pegarPosicaoAtual();
  colisaoNasParedes();
  incluirPontos();
}

function desenhaCobra(){
  let c = color(200,90,90);
  fill(c);
  //rect(xCobra, yCobra, wCobra, hCobra);
  image(cobracabeca, xCobra, yCobra, wCobra, hCobra);

  
  if(rabo.length > 0){
  for(var i = 0; i < rabo.length; i++){
    //rect(rabo[i][0], rabo[i][1], wCobra, hCobra);
    image(cobracorpo, rabo[i][0], rabo[i][1], wCobra, hCobra);

}
  }
}

function controleMovimentacao(){
 
  if (controleCobra()){
      direcao = controleCobra();
      }
 
   if (direcao == "left"){
    xCobra -= velocidadeMovimentacao;
  }
  if (direcao == "right"){
      xCobra += velocidadeMovimentacao;
      }
  if (direcao == "down"){
      yCobra += velocidadeMovimentacao;
      }
    if (direcao == "up"){
      yCobra -= velocidadeMovimentacao;
      }
}

function controleCobra(){
 
  if(keyIsDown(LEFT_ARROW)){
  return "left";
}
   if(keyIsDown(RIGHT_ARROW)){
  return "right";
}
 
   if(keyIsDown(UP_ARROW)){
  return "up";
}
   if(keyIsDown(DOWN_ARROW)){
  return "down";
}
 
}

function randomIntFromInterval(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function desenhaParedes(){
  let b = color(200,200,200);
  fill(b);
  rect(posXParE, posYParE, wParED, hParED);
  rect(posXParD, posYParD, wParED, hParED);
  rect(posXParC, posYParC, wParCB, hParCB);
  rect(posXParB, posYParB, wParCB, hParCB);
}

function desenhaComida(){
  let d = color(120,0,30)
  fill(d)
  //rect(posicaoXcomida, posicaoYcomida, 8, 8);
  image(maca,posicaoXcomida, posicaoYcomida, 25, 25);
}


function colisaoComida() {
  var colisaoComida = collideRectRect( posicaoXcomida, posicaoYcomida, 10, 10, xCobra, yCobra, wCobra, hCobra );
  return colisaoComida;
}

function comer() {
  if (colisaoComida()) {
    posicaoXcomida = randomIntFromInterval(11, canvaw - 10);
    posicaoYcomida = randomIntFromInterval(11, canvah - 10);
    partes += 1;
    marcaPontos();
  }
}

function pegarPosicaoAtual() {
 
  rabo.push([xCobra, yCobra]);
  if (rabo.length > partes) {
    rabo.shift();
  }
}


function colisaoNasParedes() {
  var colisaoDireita = collideRectRect( xCobra, yCobra, wCobra, hCobra, posXParD, posYParD, wParED, hParED );
   var colisaoEquerda = collideRectRect( xCobra, yCobra, wCobra, hCobra, posXParE, posYParE, wParED, hParED   );    
   var colisaoCima = collideRectRect( xCobra, yCobra, wCobra, hCobra, posXParC, posYParC, wParCB, hParCB   );    
   var colisaoBaixo = collideRectRect( xCobra, yCobra, wCobra, hCobra, posXParB, posYParB, wParCB, hParCB   );
  

  if ( colisaoCima == true || colisaoBaixo == true || colisaoDireita == true || colisaoEquerda == true) {
    xCobra = 200;
    yCobra = 200;
    rabo = [];
    partes = 0;
    PerdePontos();
  }
}

function incluirPontos(){
  stroke(255);
  textAlign(CENTER);
  textSize(30);
  fill(color(2, 107, 2));
  rect(195,1,30,30);
  fill(color(255, 255, 255));
  text(MeusPontos, 210,26);
}

function marcaPontos(){
    MeusPontos +=1;
   velocidadeMovimentacao += 0.2;
  }

function PerdePontos(){
  if(MeusPontos > 0){
    MeusPontos -=1;
  }
}

