
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
var textcontainer;
var textbox;
var text;
var playerhealth = 50;
var farmzombiehealth = 50;
var hgAttackStat = 15;
var fzAttackStat = 10;
var hgDefenseStat = 5;
var fzDefenseStat = 1;
var hgEvasionStat = 10;
var fzEvasionStat = 5;
var textFormat = {
    font: "13px Gabriella",
    // fill: "#ffffff",
    align: "center",
    wordWrap: {width: 350}, 
};
var storyText;
var storyText2;
var storyText3;
var storyText4;

var game = new Phaser.Game(config);

function preload() {
    this.load.atlas("hoodgirl", "assets/hoodgirl.png", "assets/hoodgirl.json");
    this.load.atlas("farmzombie", "assets/farmzombie.png", "assets/farmzombie.json");
    this.load.image("volcano", "assets/volcano.png");
    this.load.image("textbox", "assets/600wguibox.png");
    // ajax call to grab dialogue
    $.ajax({
        method: 'GET',
        url: '/api/speech'
    }).then(function (response) {
        dialogue = response;
        console.log(dialogue);
    })
}

function create() {
    this.add.image(400, 300, "volcano");
    textbox = this.add.image(0, 0, "textbox");
    text = this.add.text(-100, -10, "Farmer zombie has died");
    text.visible = false;
    player = this.add.sprite(-100, 450, "hoodgirl", "idle001.png");
    farmzombie = this.add.sprite(900, 450, "farmzombie", "idle001.png");

// Narration variables
    storyText = this.add.text(-170, -30, dialogue[0].narration.scene1A, textFormat);
    storyText2 = this.add.text(-170, -30, dialogue[0].narration.scene1B, textFormat);
    storyText3 = this.add.text(-170, -30, dialogue[0].narration.scene1C, textFormat);
    storyText4 = this.add.text(-170, -30, dialogue[0].narration.scene1D, textFormat);

// Hiding text until called on
    storyText.visible = false;
    storyText2.visible = false;
    storyText3.visible = false;
    storyText4.visible = false;

// setting the text container
    textcontainer = this.add.container(400, 200, textbox);
    textcontainer.visible = true;

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
        // console.log(this.anims.currentAnim.key);
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

// Event Listener for beginning the narration
document.addEventListener("keypress", function(event) {
    if (keydown) {
        return false;
    }
    if (event.key === "n" || event.key === "N") {
        // storyText.visible = true;
        timedStoryTelling();
    }
});


document.addEventListener("keypress", function(event) {
    if (keydown) {
        return false;
    }
    if (event.key === "h" || event.key === "H") {
        hgAttack();
        storyText4.visible = false;
    }
});




function hgAttack() {
    keydown = true;
    player.anims.play("hgattack", true);
    
    var evasionGenerate = Math.floor(Math.random() * 100);
    if (evasionGenerate > fzEvasionStat) {
        var zombieDefense = Math.floor(Math.random() * fzDefenseStat) + 1;
        var playerAttack = Math.floor(Math.random() * hgAttackStat) + 10;
        farmzombiehealth -= Math.floor(Math.random() * (playerAttack - zombieDefense)) + 1;
        console.log("Z Hit current zombie health is " + farmzombiehealth);
    } else {
        farmzombiehealth -= 0
        console.log("Z Evade")
    }

    // console.log("current zombie health is " + farmzombiehealth);
    if (farmzombiehealth <= 0) {
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

// Narration cycle in textbox
function timedStoryTelling() {
    setTimeout(function () {
        storyText.visible = true;
        textcontainer.add(storyText);
    }, 500);
    setTimeout(function () {
        storyText.visible = false;
        storyText2.visible = true;
        textcontainer.add(storyText2);
    }, 5000);
    setTimeout(function () {
        storyText2.visible = false;
        storyText3.visible = true;
        textcontainer.add(storyText3);
    }, 10000);
    setTimeout(function () {
        storyText3.visible = false;
        storyText4.visible = true;
        textcontainer.add(storyText4);
    }, 15000);
};


function fzAttack() {
    farmzombie.anims.play("fzattack", true);
    // 
    var evasionGenerate = Math.floor(Math.random() * 100);
    if (evasionGenerate > hgEvasionStat) {
        var zombieAttack = Math.floor(Math.random() * fzAttackStat) + 10;
        var playerDefense = Math.floor(Math.random() * hgDefenseStat) + 1;
        playerhealth -= Math.floor(Math.random() * (zombieAttack - playerDefense)) + 1;
        console.log("Hg Hit current player health is " + playerhealth);  
    } else {
        playerhealth -= 0
        console.log("Hg evade")
    }

    // console.log("current player health is " + playerhealth);  
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
