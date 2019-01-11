var SceneA = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function SceneA ()
    {
        Phaser.Scene.call(this, { key: 'sceneA' });
    },

    preload: function ()
    {
        this.load.image('face', 'assets/forest.png');
        this.load.atlas("hoodgirl", "assets/hoodgirl.png", "assets/hoodgirl.json");
        this.load.atlas("farmzombie", "assets/farmzombie.png", "assets/farmzombie.json");
    },

    create: function ()
    {
        this.add.sprite(400, 300, 'face')
        player = this.add.sprite(100, 450, "hoodgirl", "idle001.png");
        farmzombie = this.add.sprite(600, 450, "farmzombie", "idle001.png");

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

// when scene loads start playing idle animations for player and zombie
    player.play("hgidle");
    farmzombie.play("fzidle");

    player.on("animationcomplete", function() {
        player.play("hgidle");
    });

    farmzombie.on("animationcomplete", function() {
        console.log(this.anims.currentAnim.key);
        if (this.anims.currentAnim.key == "fzdying") {
            this.anims.pause();
        } else {
            farmzombie.play("fzidle");
        }
    });


        this.input.once('pointerdown', function () {

            console.log('From SceneA to SceneB');

            this.scene.start('sceneB');

        }, this);
    }

});

var SceneB = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function SceneB ()
    {
        Phaser.Scene.call(this, { key: 'sceneB' });
    },

    preload: function ()
    {
        this.load.image('arrow', 'assets/temple1.png');
        this.load.atlas("hoodgirl", "assets/hoodgirl.png", "assets/hoodgirl.json");
        this.load.atlas("farmzombie", "assets/farmzombie.png", "assets/farmzombie.json");
    },

    create: function ()
    {
        this.arrow = this.add.sprite(400, 300, 'arrow')
        player = this.add.sprite(100, 450, "hoodgirl", "idle001.png");
        farmzombie = this.add.sprite(600, 450, "farmzombie", "idle001.png");

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

// when scene loads start playing idle animations for player and zombie
    player.play("hgidle");
    farmzombie.play("fzidle");

    player.on("animationcomplete", function() {
        player.play("hgidle");
    });

    farmzombie.on("animationcomplete", function() {
        console.log(this.anims.currentAnim.key);
        if (this.anims.currentAnim.key == "fzdying") {
            this.anims.pause();
        } else {
            farmzombie.play("fzidle");
        }
    });


        this.input.once('pointerdown', function (event) {

            console.log('From SceneB to SceneC');

            this.scene.start('sceneC');

        }, this);
    },
});

var SceneC = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function SceneC ()
    {
        Phaser.Scene.call(this, { key: 'sceneC' });
    },

    preload: function ()
    {
        this.load.image('mech', 'assets/temple2.png');
        this.load.atlas("hoodgirl", "assets/hoodgirl.png", "assets/hoodgirl.json");
        this.load.atlas("farmzombie", "assets/farmzombie.png", "assets/farmzombie.json");
    },

    create: function ()
    {
        this.add.sprite(400, 300, 'mech')
        player = this.add.sprite(100, 450, "hoodgirl", "idle001.png");
        farmzombie = this.add.sprite(600, 450, "farmzombie", "idle001.png");

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

// when scene loads start playing idle animations for player and zombie
    player.play("hgidle");
    farmzombie.play("fzidle");

    player.on("animationcomplete", function() {
        player.play("hgidle");
    });

    farmzombie.on("animationcomplete", function() {
        console.log(this.anims.currentAnim.key);
        if (this.anims.currentAnim.key == "fzdying") {
            this.anims.pause();
        } else {
            farmzombie.play("fzidle");
        }
    });


        this.input.once('pointerdown', function (event) {

            console.log('From SceneC to SceneA');

            this.scene.start('sceneA');

        }, this);
    }

});

var config = {
    type: Phaser.AUTO,
    parent: "phaser-example",
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },

    scene: [ SceneA, SceneB, SceneC ]
    // scene: {
    //     preload: preload,
    //     create: create,
    //     update: update
    // }
};

var player;
var cursors;
var farmzombie;
var keydown = false;
var playerhealth = 10;
var farmzombiehealth = 10;

var game = new Phaser.Game(config);

function preload() {
    this.load.atlas("hoodgirl", "assets/hoodgirl.png", "assets/hoodgirl.json");
    this.load.atlas("farmzombie", "assets/farmzombie.png", "assets/farmzombie.json");
    // this.load.image("volcano", "assets/volcano.png");
}

function create() {
    // this.add.image(400, 300, "volcano");
    player = this.add.sprite(100, 450, "hoodgirl", "idle001.png");
    farmzombie = this.add.sprite(600, 450, "farmzombie", "idle001.png");

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

// when scene loads start playing idle animations for player and zombie
    player.play("hgidle");
    farmzombie.play("fzidle");

    player.on("animationcomplete", function() {
        player.play("hgidle");
    });

    farmzombie.on("animationcomplete", function() {
        console.log(this.anims.currentAnim.key);
        if (this.anims.currentAnim.key == "fzdying") {
            this.anims.pause();
        } else {
            farmzombie.play("fzidle");
        }
    });

    cursors = this.input.keyboard.createCursorKeys()
    
    // var config = {
    //     type: Phaser.AUTO,
    //     width: 800,
    //     height: 600,
    //     backgroundColor: '#000000',
    //     parent: 'phaser-example',
    //     scene: [ SceneA, SceneB, SceneC ]
    // };
    
    // var game = new Phaser.Game(config);
    
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
