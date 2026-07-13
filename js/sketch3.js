let data;
let taille= ['grand','moyen','petit','petit','moyen','moyen','grand','grand']
let angle= ['0','180','360']
let zoom=1;

let positions = [];
let messages = [];


function preload(){
 
    data = loadJSON('data.json')
    //  for (let i = 1; i < 4; i++) {
    //     let smsListe = data.corpus.sms; // Charger les pinceaux
    //     smsListe.push(smsListe); // Ajouter chaque image au tableau imgListe
    // }
    
}

function setup(){
  // createCanvas(windowWidth, windowHeight);
  // let canvas = createCanvas(windowWidth, windowHeight);
  // canvas.parent('canvas'); // attache au canvas existant


	let smsListe = data.corpus.sms;
    let nbrSms = smsListe.length;
  console.log('nbr sms : '+smsListe.length); // affiche le nombre de sms 
  console.log(random(smsListe).cont); //affiche le premier sms
  let texte=random(smsListe).cont
  if(typeof texte == 'object'){
    texte = texte.__text;
  }
  console.log(texte);


positions.push({ x: random(width), y: random(height) });
    messages.push(texte);
  //let p = createP(texte);

  for (let i = 0; i < smsListe.length; i++) {
    let smsData = smsListe[i]; //const element = array[i];
    let texte=smsData.cont;
    if (typeof texte == "object") {
      texte = texte.__text;
    }

    //pour chaque sms on crée une balise p
    let p = createP(texte);
    p.addClass(random(taille));
    
 

    let top = random(55)+'px' //renvoit une valeur entre 0px et 55px
p.style('top', top);



  }
  

fetch('data.json')
  .then(res => res.json())
  .then(data => {
    const smsList = data.corpus.sms;

    smsList.forEach(sms => {
      const div = document.createElement('div');

      // Certains "cont" sont du texte, d'autres sont des objets
      const contenu = typeof sms.cont === 'object' ? sms.cont.__text : sms.cont;

      div.innerHTML = `
        <p><strong>Date :</strong> ${sms.date}</p>
        <p><strong>Message :</strong> ${contenu}</p>
        <hr>
      `;

      document.getElementById('contenu').appendChild(div);
    });
  });
}


  function draw() {
  background(220);
  scale(zoom); // ✅ zoom appliqué ici

  for (let i = 0; i < positions.length; i++) {
    let d = dist(mouseX, mouseY, positions[i].x, positions[i].y);
    if (d < 100) {
      positions[i].x += (positions[i].x - mouseX) * 0.05;
      positions[i].y += (positions[i].y - mouseY) * 0.05;
    }
    text(messages[i], positions[i].x, positions[i].y);
  }
}

function mousePressed() {
  if (mouseButton === LEFT) zoom += 0.1;
  else if (mouseButton === RIGHT) zoom -= 0.1;
  zoom = constrain(zoom, 0.5, 5);
}
// }
// document.addEventListener('mousemove', (e) => {
//   const texte = document.getElementById('monTexte');
//   const rect = texte.getBoundingClientRect();
//   const dx = e.clientX - rect.left;
//   const dy = e.clientY - rect.top;
//   texte.style.transform = `translate(${dx / 10}px, ${dy / 10}px)`;
// });