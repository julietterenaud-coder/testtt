let data;
let taille= ['grand','moyen','petit']
let angle= ['0','180','360']
let flakes = [];
const NB = 120;
    let smsListe = [
      "construire des souvenirs ensemble",
      "confiance ",
      "honneteté",
      "spontannéité",
      "communication",
      "complicité",
      "soutien",
      "empathie",
      "écoute",
      "patience",
      "reflexion",
      "pourquoi",
      "viens on fait un tour",
      "c'est dur de pas te dire je t'aime parfois surtout quand on est ensemble",
      "le sex seleument si on s'aime",
      "pas de discrimination de taille ",
      "1m55 c'est une taille parfaite",
      "je suis une femme et je suis fière de l'être donc je ne veux pas d'homme qui me rabaisse pour ma taille, mes capacité physiques ou emotionnelles surtout pendant les moments de vulnérabilité",
    ]


class Flake {
  constructor() {
    this.reset(true);
  }

  reset(init) {
    this.x      = random(width);
    this.y      = init ? random(height) : random(-20, -5);
    this.r      = random(1.5, 4.5);
    this.op     = random(140, 255);
    this.wobble = random(1000);
    this.wAmp   = random(0.3, 1.2);
  }

  update() {
    this.y += 1.5 * (this.r / 3);                           // vitesse prop. à la taille
    this.x += 0.4 + sin(frameCount * 0.02 + this.wobble) * this.wAmp; // vent + oscillation
    if (this.y > height + 10 || this.x < -20 || this.x > width + 20) {
      this.reset(false);
    }
  }

  draw() {
    noStroke();
    fill(220, 235, 255, this.op);
    circle(this.x, this.y, this.r * 2);
  }
}

function preload(){
    data = loadJSON('data.json')
}

function setup(){
 let cnv = createCanvas(windowWidth, windowHeight);
cnv.parent(document.body);

  console.log('nbr sms : ' + smsListe.length);

  for (let i = 0; i < smsListe.length; i++) {
    let texte = smsListe[i];
    let p = createP(texte);
    p.addClass(random(taille));

    let delay = random(10);
    p.style("animation-delay", delay + "s");
  }

  for (let i = 0; i < NB; i++) {
    flakes.push(new Flake());
  }
}
 
 function draw() {
  background(10, 15, 30);
  for (const f of flakes) {
    f.update();
    f.draw();
  }
}