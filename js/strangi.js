let video;
//let ascii = ['$','@','#','S','%','?','*','+',';:',',','.',' ']
let sound;
let amp;

function preload() {
sound = loadSound('sound/Hide - Dorian Concept (Slowed x Reverbed).mp3');
}
function setup() {
    angleMode(DEGREES);
    createCanvas(windowWidth,windowHeight);
    video = createCapture(VIDEO);
    video.hide();
   loadImage();
 
    amp= new p5.Amplitude();
}
function mousePressed() {
    video.loadPixels();
    let x = mouseX;
    let y = mouseY;
    let c = getPixels(x, y, video);
    print(c);
    if (!sound.isPlaying()) {
        sound.play();
    }
}
function draw() {
    let ampValue = amp.getLevel();
   //image(video, 0,0 ,width,height)
   background(255)
   noStroke()
   
    video.loadPixels();
    
    let precision = 4;
    //let aleatoire = random(2)
    let largeurVideo = video.width;
    let hauteurVideo = video.height;

    for (let x = 0; x < largeurVideo; x+=precision) {
        for (let y = 0; y < hauteurVideo; y+=precision) {
            
            let c = getPixel(x, y, video);
            let r = c[0];
            let g = c[1];
            let b = c[2];
            let a = c[3];   
            
            let xConverti = map(x,0,largeurVideo,0,width);
            let yConverti = map(y,0,hauteurVideo,0,height);
            
            let aleatoire = random(1) > 0.5  ;

            let decalage = map(r,0,255,-50,50);
            let taille = map(r,0,255,0,50);
            taille = int(taille);
           //square(xConverti,yConverti,frameCount %10)
            //fill(255)
            // textSize(30)
            // fill(r,g,b)       
            // square(xConverti,yConverti,ampValue*100)   
            // text(ascii[taille],xConverti+decalage,yConverti+decalage)
        //     push()
        //    translate(xConverti,yConverti)
        //       fill(r,g,b)
        //     rotate(ampValue*360)
        //     rectMode(CENTER)
        //     square(0,0,precision*ampValue*10)   
        //     pop()
            fill(r,g,b)
           if (aleatoire > 1) {
            stroke(ascii[taille],xConverti,yConverti);
            noFill( )  ;
            strokeWeight(2);
        } else {
            blendMode(DIFFERENCE);
            square(xConverti,yConverti,precision*20)  ;
            blendMode(BLEND)
    }
}
    }
function getPixel(x, y, img) {
  let i = 4 * (y * img.width + x);
  return [
    img.pixels[i],
    img.pixels[i + 1],
    img.pixels[i + 2],
    img.pixels[i + 3]
  ];
}
}