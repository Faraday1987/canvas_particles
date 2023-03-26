const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];
const MAX_DISTANCE = 80;
const QTY_PARTICLES = 3;
const COLOR_SPEED_HUE = 0.6;
const CONECTION_POINTS_LINE = 0.09;
let hue = 0;

// Interactuando con el mouse
const mouse = {
    x: undefined,
    y: undefined,
}

canvas.addEventListener('click', (evt) => {
    mouse.x = evt.x;
    mouse.y = evt.y;
    console.log(mouse);
    createParticles();
    // drawCircle()
});


canvas.addEventListener('mousemove', (evt) => {
    mouse.x = evt.x;
    mouse.y = evt.y;
    createParticles();
    // drawCircle()
});

createParticles = () =>  {
    for(i = 0; i< QTY_PARTICLES; i++) {
        particlesArray.push(new Particle());
    }
}


// rezise canvas
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

});

/*
    @params(possition x, possition y, width, heigth)
*/
// ctx.fillStyle ='white';
// ctx.fillRect(10, 20, 150, 50);

/*
    @params(coordenadas x, y, radius, angulo de inicio, angulo final en radianes Math.PI * 2)
    Math.PI * 2 -> convierte a 360 grados
*/

// Circulo con reyeno
ctx.fillStyle = "white";
ctx.beginPath();
ctx.arc(100, 100, 50, 0, Math.PI * 2);
// Dibuja el circulo con relleno
ctx.fill();

//circulo solo borde
ctx.strokeStyle = "#ff00cc";
ctx.lineWidth = 4;
ctx.beginPath();
ctx.arc(250, 100, 50, 0, Math.PI * 2);
// Dibuja el circulo solo por fuera
ctx.stroke();

// Si no se comienza un nuevo beginPath() los circulos quedan unidos por el borde

// Circulo combinado
ctx.fyllStye = "#ff0"
ctx.strokeStyle = "blue";
ctx.lineWidth = 6;
ctx.beginPath();
ctx.arc(400, 100, 50, 0, Math.PI * 2);
ctx.fill();
ctx.stroke();


drawCircle = () => {
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2);
    // Dibuja el circulo solo por fuera
    ctx.stroke();
}

class Particle {
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        // this.x = Math.random() * canvas.width;
        // this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1 ;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = `hsl(${hue},100%, 50%`;
    }

    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.size > 0.2) this.size -= 0.03;
    }

    draw() {
        // ctx.fillStyle = "white";
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        // Dibuja el circulo con relleno
        ctx.fill();
    }
}

// function init() {
//     for(let i = 0; i<=100; i++) {
//         particlesArray.push(new Particle());
//     }
// }

// init();

function handleParticles () {
    for(let i = 0; i< particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();



        for(let j = i; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            // CALCULAMOS LA HIPOTENUZA DE UN ANGULO IMAGINARIO DE 90 GRADOS
            const distance = Math.sqrt(dx * dx + dy * dy);

            if( distance < MAX_DISTANCE) {
                ctx.beginPath();
                ctx.strokeStyle = particlesArray[i].color;
                ctx.lineWidth = CONECTION_POINTS_LINE;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
                ctx.closePath();
            }

        }

        if(particlesArray[i].size <= 0.3) {
            particlesArray.splice(i,1);
            console.log(particlesArray.length)
            i--;
        }

    }
}

animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
    // ctx.fillRect(0,0, canvas.width, canvas.height);
    // hue++;
    hue+=COLOR_SPEED_HUE;
    handleParticles();
    requestAnimationFrame(animate);
}

animate();

