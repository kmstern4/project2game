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

var game = new Phaser.Game(config);

function preload() {
    this.load.atlas("hoodgirl", "assets/hoodgirl.png", "assets/hoodgirl.json");
    this.load.atlas("farmzombie", "assets/farmzombie.png", "assets/farmzombie.json");
    this.load.image("volcano", "assets/volcano.png");
}

function create() {
    this.add.image(400, 300, "volcano");
    player = this.add.sprite(100, 450, "hoodgirl", "idle001.png");
    farmzombie = this.add.sprite(600, 450, "farmzombie", "idle001.png");


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

    player.play("hgidle");
    farmzombie.play("fzidle");

    player.on("animationcomplete", function() {
        console.log("COMPLEEETE")
        player.play("hgidle");
        farmzombie.play("fzidle");
    });

    cursors = this.input.keyboard.createCursorKeys()
}

function update() {



}



document.addEventListener("keypress", function(event) {
    if (keydown) {
        return false;
    }
    console.log(event.key);
    if (event.key === "h" || event.key === "H") {
        console.log("H WAS PRESSED YAY");
        player.anims.play("hgattack", true);
        farmzombie.anims.play("fzhurt", true);
        keydown = true;
        setTimeout(function() {
            keydown = false;
        }, 3000);
    }
});