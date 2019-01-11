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

var game = new Phaser.Game(config);

function preload() {
    this.load.atlas("hg", "assets/hoodgirl.png", "assets/hoodgirl.json");
    this.load.image("volcano", "assets/volcano.png");
}

function create() {
    this.add.image(400, 300, "volcano");
    player = this.add.sprite(100, 450, "hg", "idle001.png");


    this.anims.create({
        key: "attack",
        frames: this.anims.generateFrameNames("hg", { 
            prefix: "attack00", 
            suffix: ".png",
            start: 1,
            end: 12 
        }), 
        frameRate: 20,
        repeat: 0
    });

    player.on("animationupdate", function() {
        console.log("FRAME UPDATED YO")
    });



    cursors = this.input.keyboard.createCursorKeys()
}

function update() {


    // if (cursors.left.isDown) {
    //     player.anims.play("swing", true);
    // } else {
    //     console.log("YOu're in the else");
    //     player.anims.play("idle");
    // }
}



document.addEventListener("keypress", function(event) {
    console.log(event.key);
    if (event.key === "h" || event.key === "H") {
        console.log("H WAS PRESSED YAY");
        player.anims.play("attack", true);
    }
})