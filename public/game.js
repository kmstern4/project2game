
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// setting all variables as global variables
var player;
var cursors;
var farmzombie;
var keydown = false;
var textcontainer;
var textbox;
var text;
var playerhealth = 50;
var farmzombiehealth = 50;
var hgAttackStat = 15;
var fzAttackStat = 10;
var hgDefenseStat = 5;
var fzDefenseStat = 1;
var hgEvasionStat = 20; //10
var fzEvasionStat = 20; //5

var game = new Phaser.Game(config);

function preload() { // preloading all images and atlases
    this.load.atlas("hoodgirl", "assets/hoodgirl.png", "assets/hoodgirl.json");
    this.load.atlas("farmzombie", "assets/farmzombie.png", "assets/farmzombie.json");
    this.load.image("textbox", "assets/600wguibox.png");
    this.load.image("forest", "assets/forest.png");
}

function create() {
    this.add.image(400, 300, "forest"); // adding background image
    textbox = this.add.image(0, 0, "textbox"); // adding textbox image
    text = this.add.text(-100, -10, "Farmer zombie has died");
    text.visible = false; // hiding text on page load
    player = this.add.sprite(-100, 450, "hoodgirl", "idle001.png"); 
    farmzombie = this.add.sprite(900, 450, "farmzombie", "idle001.png");

// setting the text container
    textcontainer = this.add.container(400, 200, textbox); // creating container including textbox
    textcontainer.visible = false; // hiding container on page load, also hides textbox

    textcontainer.setSize(400, 100); // setting container size to be inside of borders of textbox

    textcontainer.setInteractive(); 

    textcontainer.on("pointerover", function() {
        textbox.setTint(0x44ff44);
    });

    textcontainer.on("pointerout", function() {
        textbox.clearTint();
    });


// Tweens
    // tween to make player walk in to view
    tween = this.tweens.add({
        targets: player,
        x: 200,
        ease: "power1",
        duration: 2500,
        repeat: 0
    });

    // tween to make zombie walk in to view
    ztween = this.tweens.add({
        targets: farmzombie,
        x: 600,
        ease: "power1",
        duration: 2500,
        repeat: 0
    });

    // player moves back on evade, use hgevade.restart() to play
    hgevade = this.tweens.add({
        targets: player,
        x: 160,
        ease: "power1",
        duration: 300,
        paused: true, // won't play on page load
        yoyo: true // player will move to x: 160 and then move back to starting point
    });

    // zombie moves back on evade, use fzevade.restart() to play
    fzevade = this.tweens.add({
        targets: farmzombie,
        x: 640,
        ease: "power1",
        duration: 300,
        paused: true,
        yoyo: true
    });



// Player animation creations
    this.anims.create({
        key: "hgattack",
        frames: this.anims.generateFrameNames("hoodgirl", { 
            prefix: "attack00", 
            suffix: ".png",
            start: 1,
            end: 12 
        }), 
        frameRate: 20,
        repeat: 0
    });

    this.anims.create({
        key: "hgidle",
        frames: this.anims.generateFrameNames("hoodgirl", {
            prefix: "idle00",
            suffix: ".png",
            start: 1,
            end: 18
        }),
        frameRate: 15,
        repeat: -1
    });

    this.anims.create({
        key: "hghurt",
        frames: this.anims.generateFrameNames("hoodgirl", {
            prefix: "hurt00",
            suffix: ".png",
            start: 1,
            end: 12
        }),
        frameRate: 20,
        repeat: 0
    });

    this.anims.create({
        key: "hgdying",
        frames: this.anims.generateFrameNames("hoodgirl", {
            prefix: "dying00",
            suffix: ".png",
            start: 1,
            end: 15
        }),
        frameRate: 20,
        repeat: 0
    });

    this.anims.create({
        key: "hgwalking",
        frames: this.anims.generateFrameNames("hoodgirl", {
            prefix: "walking00",
            suffix: ".png",
            start: 1,
            end: 24
        }),
        frameRate: 20,
        repeat: 1
    });

    this.anims.create({
        key: "hgrunning",
        frames: this.anims.generateFrameNames("hoodgirl", {
            prefix: "running00",
            suffix: ".png",
            start: 1,
            end: 12
        }),
        frameRate: 20,
        repeat: 0
    });


// Zombie animation creations
    this.anims.create({
        key: "fzidle",
        frames: this.anims.generateFrameNames("farmzombie", {
            prefix: "idle00",
            suffix: ".png",
            start: 1,
            end: 12
        }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: "fzattack",
        frames: this.anims.generateFrameNames("farmzombie", {
            prefix: "attack00",
            suffix: ".png",
            start: 1,
            end: 12
        }),
        frameRate: 20,
        repeat: 0
    });

    this.anims.create({
        key: "fzhurt",
        frames: this.anims.generateFrameNames("farmzombie", {
            prefix: "hurt00",
            suffix: ".png",
            start: 1,
            end: 12
        }),
        frameRate: 20,
        repeat: 0
    });

    this.anims.create({
        key: "fzdying",
        frames: this.anims.generateFrameNames("farmzombie", {
            prefix: "dying00",
            suffix: ".png",
            start: 1,
            end: 15
        }),
        frameRate: 20,
        repeat: 0
    });

    this.anims.create({
        key: "fzwalking",
        frames: this.anims.generateFrameNames("farmzombie", {
            prefix: "walking00",
            suffix: ".png",
            start: 1,
            end: 18
        }),
        frameRate: 20,
        repeat: 2
    });

    // dupilicate of fzwalking, just with repeat set to 0, for purpose of evade animation
    this.anims.create({
        key: "fzrunning",
        frames: this.anims.generateFrameNames("farmzombie", {
            prefix: "walking00",
            suffix: ".png",
            start: 1,
            end: 18
        }),
        frameRate: 30,
        repeat: 0
    });


// when scene loads start playing idle animations for player and zombie
    player.play("hgwalking");
    farmzombie.play("fzwalking");

    // any time the player completes an animation (that has a repeat value of 0), the player idle animation is triggered
    player.on("animationcomplete", function() { 
        player.play("hgidle");
    });

    farmzombie.on("animationcomplete", function() {
        // the zombie will idle on animation complete unless it just completed the dying animation
        if (this.anims.currentAnim.key == "fzdying") {
            textcontainer.visible = true;
            textcontainer.add(text);
            text.visible = true;
            this.anims.pause(); // pauses the zombie on the last frame of the dying animation
        } else {
            farmzombie.play("fzidle");
        }
    });
    // allows keyboard inputs to be used to control events/animations
    cursors = this.input.keyboard.createCursorKeys()
}

function update() {
// function that will run 60 times per minute


}



document.addEventListener("keypress", function(event) {
    if (keydown) {
        return false;
    }
    if (event.key === "h" || event.key === "H") {
        hgAttack();
    }
});

function hgAttack() {
    keydown = true;
    player.anims.play("hgattack", true);
    console.log(hgevade);
        
    var evasionGenerate = Math.floor(Math.random() * 100);
    if (farmzombiehealth <= 0) {
        setTimeout(function() {
            farmzombie.anims.play("fzdying", true)
        }, 200);
    } else if (evasionGenerate > fzEvasionStat) {
        setTimeout(function() {
            farmzombie.anims.play("fzhurt", true);
        }, 200);
        setTimeout(fzAttack, 1000);
        var zombieDefense = Math.floor(Math.random() * fzDefenseStat) + 1;
        var playerAttack = Math.floor(Math.random() * hgAttackStat) + 10;
        farmzombiehealth -= Math.floor(Math.random() * (playerAttack - zombieDefense)) + 1;
        console.log("Z Hit current zombie health is " + farmzombiehealth);
    } else {
        farmzombie.anims.play("fzrunning", true);
        fzevade.restart();
        setTimeout(fzAttack, 1000);
        farmzombiehealth -= 0;
        console.log("Z Evade");
    }
}

function fzAttack() {
    farmzombie.anims.play("fzattack", true);
    // 
    var evasionGenerate = Math.floor(Math.random() * 100);

    if (playerhealth === 0) {
        setTimeout(function() {
            player.anims.play("hgdying", true)
        }, 200);
    } else if (evasionGenerate > hgEvasionStat) {
        player.anims.play("hghurt", true);
        setTimeout(function() {
            keydown = false;
        }, 500);
        var zombieAttack = Math.floor(Math.random() * fzAttackStat) + 10;
        var playerDefense = Math.floor(Math.random() * hgDefenseStat) + 1;
        playerhealth -= Math.floor(Math.random() * (zombieAttack - playerDefense)) + 1;
        console.log("Hg Hit current player health is " + playerhealth);  
    } else {
        player.anims.play("hgrunning", true);
        hgevade.restart();
        console.log(hgevade);
        playerhealth -= 0
        console.log("Hg evade")
        keydown = false;
    }

}


