let cam;
let s=0;
let precision=5;
let imgPrecedante;
let augmentation=2;


let flakesActifs = false; // les flocons ne démarrent pas tout de suite

let taille = ['grand','moyen','petit'];
let flakes = [];
const NB = 120;

let smsListe = [
  "pas d'obligation de continuer, sous condition de prévenir 1 mois à l'avance si on veut arrêter",
  "confiance",
  "honneteté",
  "spontannéité",
  "communication",
  "complicité",
  "soutien",
  "empathie",
  "écoute",
  "patience",
  "reflexion",
  "émotions",
  "viens on fait des aventures",
  "c'est dur de pas te dire je t'aime parfois surtout quand on est ensemble, mais si l'un des membres en souffre le mot doit être remplacé par un autre mot",
  "le sex ne doit pas être basé à 100% sur le désir physique",
  "le scrolling after sex peut être considéré comme avoir coucher avec autruie, et peut déclencher une utilisation obligatoire de la capote ",
  "1m55 c'est une taille parfaite",
  "be kind",
  "si on arrive pas à communiquer ou exprimer ses émotions c'est ok, si l'info est importante on peut s'exprimer avec un autre medium, type ecriture, chanson, dessin,etc",
  ""
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
    this.y += 1.5 * (this.r / 3);
    this.x += 0.4 + sin(frameCount * 0.02 + this.wobble) * this.wAmp;
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
}

function setup() {


  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent(document.body);

  cam = createCapture(VIDEO);
  cam.size(640, 480);
  cam.hide();
  imgPrecedante = cam.get();

  // --- ajout des textes ---
  for (let i = 0; i < smsListe.length; i++) {
    let texte = smsListe[i];
    let p = createP(texte);
    p.addClass(random(taille));
    let delay = random(10);
    p.style("animation-delay", delay + "s");
  }

    // --- champ pour ajouter une phrase ---
  let inputTexte = createInput('');
  inputTexte.attribute('placeholder', 'stv écrire?...');
  inputTexte.id('inputPhrase');

  let boutonAjouter = createButton('ajouter phrace ephemere');
  boutonAjouter.mousePressed(() => {
    let texte = inputTexte.value();
    if (texte.trim() !== '') {
      let p = createP(texte);
      p.addClass(random(taille));
      let delay = random(10);
      p.style("animation-delay", delay + "s");
      inputTexte.value(''); // vide le champ après ajout
    }
  });
   inputTexte.elt.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      boutonAjouter.elt.click();
    }
  });
  // --- bouton Accepter : lance les flocons ---
  let boutonAccepter = createButton('Accepter');
  boutonAccepter.id('boutonAccepter'); // ← ajouté ici
  boutonAccepter.mousePressed(() => {
    flakesActifs = true;
    for (let i = 0; i < NB; i++) {
      flakes.push(new Flake());
    }
  });
}

function draw() {
  background(255);
  let mouvement = mouvementDetect(cam, imgPrecedante, 30, 5);
  augmentation += mouvement;
  augmentation = constrain(augmentation, 0, 30);
  print(augmentation);

  ellipse(width/2, height/2, augmentation)
  cam.loadPixels();
  let largeurVideo = cam.width;
  let hauteurVideo = cam.height;
  for (let x = 0; x < largeurVideo; x+=precision) {
    for (let y = 0; y < hauteurVideo; y+=precision) {
      let c = getPixel(x,y,cam);
      fill(0,augmentation,0)
      noStroke()
      let r = c[0]
      let xConverti = map(x,0,largeurVideo,0,height);
      let yConverti = map(y,0,hauteurVideo,0,height);
      let opacity = map(c[1],250,0,0,210);
      fill(20,augmentation,0)
      let taillePixel = map(r,0,255,0,augmentation);
      strokeWeight(0.5);
      square(xConverti, yConverti, taillePixel);
      ellipse(xConverti+random(augmentation), yConverti, taillePixel);
      square(xConverti, yConverti, taillePixel);
    }
  }
  imgPrecedante = cam.get()

  // --- mise à jour et affichage des flocons ---
  for (const f of flakes) {
    f.update();
    f.draw();
  }
}

/////////////////////////////NE PAS TOUCHER !!!
function getPixel(x, y, img) {
  let i = 4 * (y * img.width + x);
  return [
    img.pixels[i],
    img.pixels[i + 1],
    img.pixels[i + 2],
    img.pixels[i + 3]
  ];
}
function mouvementDetect(_cam,_previousFrame,threshold,vitesse){
    precisionAnalyse = 5;
    _cam.loadPixels();
    _previousFrame.loadPixels();
    let diffGlobale = 0;
    for (let y = 0; y < _cam.height; y += precisionAnalyse) {
      for (let x = 0; x < _cam.width; x += precisionAnalyse) {
        let pixel = getPixel(x,y,_cam)
        let r1 = pixel[0];
        let g1 = pixel[1];
        let b1 = pixel[2];
        let pixel2 = getPixel(x,y,_previousFrame);
        let r2 = pixel2[0];
        let g2 = pixel2[1];
        let b2 = pixel2[2];
        let diff = dist(r1, g1, b1, r2, g2, b2);
        if (diff > threshold) {
          diffGlobale += diff;
        }
      }
    }
    let aug = map(diffGlobale, 0, _cam.width * _cam.height/precisionAnalyse, -vitesse,vitesse);
    aug = constrain(aug,-vitesse,vitesse)
    return aug
}