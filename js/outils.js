function getHeure(_heure){
  let match = _heure.match(/(\d{1,2}:\d{2}):\d{2}$/);

let heureMinute = match ? match[1] : "00:00";

 let h  = heureMinute.charAt(0)+heureMinute.charAt(1);
 h = parseInt(h)

  let m  = heureMinute.charAt(3)+heureMinute.charAt(4)
 m = parseInt(m)

 let hm = h + m/60
 return hm
}


function miseEnExergue(_texte, mot) {
  // vérifier si le mot existe dans le texte
  if (!_texte.toLowerCase().includes(mot.toLowerCase())) {
    return _texte; // mot non trouvé → on retourne le texte original
  }

  // expression régulière pour encadrer le mot exact
  const regex = new RegExp(`\\b(${mot})\\b`, 'gi'); 
  return _texte.replace(regex, '<i class='+mot+'>$1</i>');
}



function neContientPas(_texte, mot){
  let condition = true
  for (let i = 0; i <mot.length; i++) {
    if(_texte.includes(mot[i])){
      condition=false
    }
    
  }
  return condition
}

function contient(_texte, mot){
  let condition = false
  for (let i = 0; i <mot.length; i++) {
    if(_texte.includes(mot[i])){
      condition=true
    }
    
  }
  return condition
}


function listeMotsAvecFrequences(smsArray) {
  let compteur = {};
  for (let sms of smsArray) {
     let texte = sms.cont;
      if( typeof texte === "object") {
       texte = texte.__text
    }

    // normalisation
    texte = texte.toLowerCase();
   // texte = texte.replace(/[^\p{L}\p{N}\s]/gu, ""); // enlève ponctuation
    let mots = texte.split(/\s+/);

    for (let mot of mots) {
    //   if (mot.length>2){
        if (!compteur[mot]) {
        compteur[mot] = 1;
      } else {
        compteur[mot]++;
      }
      }

      
    // }
  }

  // convertir en tableau
  let resultat = [];
  for (let mot in compteur) {
    resultat.push({
      mot: mot,
      count: compteur[mot]
    });
  }

  resultat.sort((a, b) => b.count - a.count);
  print(resultat);
}



function getJour(_date) {
  let decoupe = _date.split(" ")
  return parseInt(decoupe[0]);
}

function getMois(_date) {
  const mois = ["janv.", "févr.", "mars", "avr.", "mai", "juin",
                "juil.", "août", "sept.", "oct.", "nov.", "déc."];
 for (let i = 0; i<mois.length; i++) {
 if(_date.includes(mois[i])){
  return i+1
 }
 }
}