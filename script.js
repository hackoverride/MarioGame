    let canvas = document.getElementById("game");
    let img = new Image();
    img.src = "mario.png";
    let charHeight = img.height;
    let charWidth = img.width;
    let width = 1000;
    let height = 700;
    let floor = 650;
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
    let posX = 10;
    let posY = floor;
    let speed = 10;
    let enemyHeight = 300;
    let enemyWidth = 50;
    let enemyY = floor - enemyHeight;
    let enemyX = 600;
    let gameOver = false;
    let posisjon = [(floor-20), 500];

    document.addEventListener('keydown', function(event) {
        if(event.key === "ArrowLeft") {
            posX -= speed;
        }
        if(event.key === "ArrowUp") {
            posY -= speed;
        }
        if(event.key === "ArrowDown") {
            if (posY === floor) {return}
            posY += speed;
        }
        if(event.key === "ArrowRight") {
            posX += speed;
        }
        if(event.code === "Space") {
            jump();
        }
    });

    function jump() {
        if (posY == floor) {posY -= 500}
        if (posY <= floor) {posY -= 30;}
    }

    function gravity() {
        if (posY < floor) {posY += 10;}
        if (posY > floor) {posY = floor;}
    }

    function game() {
        if (!gameOver) {
        clear();
        ctx.fillStyle = "black";
        ctx.fillRect(posX, posY-charHeight, charWidth, charHeight);
        ctx.drawImage(img, posX, posY - img.height);
        gravity();
        enemy();
        bonus();
        collide();
        setTimeout(game, 100);}
        if (gameOver) {
            let gmovr = ctx.createLinearGradient(0, 0, 500, 800);
            gmovr.addColorStop(0, "darkred");
            gmovr.addColorStop(1, "red");
            ctx.fillStyle = gmovr;
            ctx.fillRect(0, 0, width, height);
            ctx.fillStyle = "black";
            ctx.font = "150px Arial";
            ctx.textAlign = "center";
            ctx.fillText("Game Over", canvas.width/2, canvas.height/2);
        }
    }

    function clear() { //setter opp "brettet"
        let grd = ctx.createLinearGradient(0, 0, 500 ,400);
        grd.addColorStop(0, "white");
        grd.addColorStop(1, "lightblue");
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, width, height);
        let fgrd = ctx.createLinearGradient(0, 0, 0, 1000);
        fgrd.addColorStop(0, "green");
        fgrd.addColorStop(1, "lightgreen");
        ctx.fillStyle = fgrd;
        ctx.fillRect(0, floor, width, 100);
    }

    function enemy() {
        ctx.fillStyle = "red";
        ctx.fillRect(enemyX, enemyY, enemyWidth, enemyHeight);
        let enemySpeed = document.getElementById("speeder").value;
        enemyX -= enemySpeed;
        if (enemyX <= 0 - enemyWidth) {enemyX = 1300; enemyHeight = Math.random()*600; enemyY = floor-enemyHeight;}
    }

    function bonus() {
        posisjon[1] -= Math.floor(Math.random()*20); //setter litt sporadisk bredde bevegelse
        posisjon[0] -= Math.floor(Math.random()*20); //litt sporadisk flying
        if (posisjon[0] <= floor-20) {posisjon[0] += Math.floor(Math.random()*10);}
        if (posisjon[0] >= floor-20) {posisjon[0] =floor-20;} // litt gravity for denne også!
        ctx.fillStyle = "white";
        ctx.fillRect(posisjon[1], posisjon[0], 20, 20);
        if (posisjon[1] <= -50) {posisjon[1] = 2000;}
        if (posisjon[0] <= -50) {posisjon[0] = floor+200;}
    }

    function collide() {
        let collideY = false; //sjekker om Y axen (høyde) treffer spilleren
        let collideX = false; //sjekker om X axen (bredde) treffer spilleren
        if ((posY >= enemyY) && (posY - charHeight <= enemyY + enemyHeight)) {collideY = true;}
        if ((posX + charWidth) >= enemyX && posX <= (enemyX + enemyWidth)) {collideX = true;}
        if (collideY && collideX) {
            let life = parseInt(document.getElementById("hp").innerHTML);
            life -= 30;
            document.getElementById("hp").innerHTML = life;
            if (life <= 0) {gameOver = true;}
        }
    }

    game();
