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
    this.load.spritesheet("hoodgirl", "assets/testspritesheet.png", { frameWidth: 200, frameHeight: 200, endFrame: 11 });
    // this.load.spritesheet("hgidle", "assets/hgidle.png", { frameWidth: , frameHeight: , endFrame:  });
    // this.load.spritesheet("hghurt", "assets/hghurt.png", { frameWidth: , frameHeight: , endFrame:  });
    // this.load.spritesheet("wzattack", "assets/wzattack.png", { frameWidth: , frameHeight: , endFrame:  });
    // this.load.spritesheet("wzidle", "assets/wzidle.png", { frameWidth: , frameHeight: , endFrame:  });
    // this.load.spritesheet("wzhurt", "assets/wzhurt.png", { frameWidth: , frameHeight: , endFrame:  });
    this.load.image("volcano", "assets/volcano.png");
}

function create() {
    this.add.image(400, 300, "volcano");

    player = this.physics.add.sprite(100, 450, "hoodgirl");
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    this.anims.create({
        key: "swing",
        frames: this.anims.generateFrameNumbers("hoodgirl", { start: 0, end: 11, first: 0 }),
        frameRate: 30,
        repeat: 0
    });

    this.anims.create({
        key: "idle",
        frames: [ { key: "hoodgirl", frame: 0 } ],
        frameRate: 20
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
    if (event.key === "h") {
        console.log("H WAS PRESSED YAY");
        player.anims.play("swing", true);
    }
})