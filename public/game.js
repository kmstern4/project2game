
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

var player;
var cursors;
var farmzombie;
var keydown = false;
var playerhealth = 10;
var farmzombiehealth = 10;
var textcontainer;
var textbox;
var text;

var game = new Phaser.Game(config);

function preload() {
    this.load.atlas("hoodgirl", "assets/hoodgirl.png", "assets/hoodgirl.json");
    this.load.atlas("farmzombie", "assets/farmzombie.png", "assets/farmzombie.json");
    this.load.image("volcano", "assets/volcano.png");
    this.load.image("textbox", "assets/600wguibox.png");
}

function create() {
    this.add.image(400, 300, "volcano");
    textbox = this.add.image(0, 0, "textbox");
    text = this.add.text(-100, -10, "Farmer zombie has died");
    text.visible = false;
    player = this.add.sprite(-100, 450, "hoodgirl", "idle001.png");
    farmzombie = this.add.sprite(900, 450, "farmzombie", "idle001.png");

// setting the text container
    textcontainer = this.add.container(400, 200, textbox);
    textcontainer.visible = false;

    textcontainer.setSize(400, 100);

    textcontainer.setInteractive();

    textcontainer.on("pointerover", function() {
        textbox.setTint(0x44ff44);
    });

    textcontainer.on("pointerout", function() {
        textbox.clearTint();
    });


// Tweens
    tween = this.tweens.add({
        targets: player,
        x: 200,
        ease: "power1",
        duration: 2500,
        repeat: 0
    });

    ztween = this.tweens.add({
        targets: farmzombie,
        x: 600,
        ease: "power1",
        duration: 2500,
        repeat: 0
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


// when scene loads start playing idle animations for player and zombie
    player.play("hgwalking");
    farmzombie.play("fzwalking");

    player.on("animationcomplete", function() {
        player.play("hgidle");
    });

    farmzombie.on("animationcomplete", function() {
        console.log(this.anims.currentAnim.key);
        if (this.anims.currentAnim.key == "fzdying") {
            textcontainer.visible = true;
            textcontainer.add(text);
            text.visible = true;
            this.anims.pause();
        } else {
            farmzombie.play("fzidle");
        }
    });

    cursors = this.input.keyboard.createCursorKeys()
}

function update() {



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
    farmzombiehealth = farmzombiehealth - 2;
    console.log("current zombie health is " + farmzombiehealth);
    if (farmzombiehealth === 0) {
        setTimeout(function() {
            farmzombie.anims.play("fzdying", true)
        }, 200);
    } else {
        setTimeout(function() {
            farmzombie.anims.play("fzhurt", true);
        }, 200);
        setTimeout(fzAttack, 1000);
    }
}

function fzAttack() {
    farmzombie.anims.play("fzattack", true);
    playerhealth = playerhealth - 1;  
    console.log("current player health is " + playerhealth);  
    if (playerhealth === 0) {
        setTimeout(function() {
            player.anims.play("hgdying", true)
        }, 200);
    } else {
        player.anims.play("hghurt", true);
        setTimeout(function() {
            keydown = false;
        }, 500);
    }
}
