
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
var healthText;
var enemyText;
var potionText;
var playerhealth = 50;
var farmzombiehealth = 50;
var hgAttackStat = 15;
var fzAttackStat = 10;
var hgDefenseStat = 5;
var fzDefenseStat = 1;
var hgEvasionStat = 10;
var fzEvasionStat = 5;
var zombieAttack = 0; 
var zombieDefense = 0; 
var playerAttack = 0; 
var playerDefense = 0; 
var special = 0;
var hppotion = true;
var textFormat = {
    align: "center",
    wordWrap: {width: 350}, 
};
var storyText;
var storyText2;
var storyText3;
var storyText4;
var storyText5;
var storyText6;
var storyText7;
var storyText8;
var storyText9;
var beginText;


var game = new Phaser.Game(config);

function preload() { // preloading all images and atlases
    this.load.atlas("hoodgirl", "assets/hoodgirl.png", "assets/hoodgirl.json");
    this.load.atlas("farmzombie", "assets/farmzombie.png", "assets/farmzombie.json");
    this.load.image("textbox", "assets/600wguibox.png");
    // ajax call to grab dialogue
    $.ajax({
        method: 'GET',
        url: '/api/speech'
    }).then(function (response) {
        dialogue = response;
        console.log(dialogue);
    })
    this.load.image("forest", "assets/forest.png");
}

function create() {
    this.add.image(400, 300, "forest"); // adding background image
    textbox = this.add.image(0, 0, "textbox"); // adding textbox image
    text = this.add.text(-100, -10, "Farmer zombie has died");
    text.visible = false; // hiding text on page load
    player = this.add.sprite(-100, 450, "hoodgirl", "idle001.png"); 
    farmzombie = this.add.sprite(900, 450, "farmzombie", "idle001.png");
    healthText = this.add.text(16, 16, 'Hp: ' + playerhealth, { fontSize: '32px', color: '#D3D3D3', stroke: '#000000', strokeThickness: .5});
    potionText = this.add.text(192, 16, 'Potions: 1', {fontSize: '32px', color: '#D3D3D3', stroke: '#000000', strokeThickness: .5});
    enemyText = this.add.text(512, 552, 'Enemy Hp: ' + farmzombiehealth, { fontSize: '32px', color: '#D3D3D3', stroke: '#000000', strokeThickness: .5});
    hittext = this.add.text(260, 380, "", { color: "#ff3434", fontSize: 20 });
    hittext.setAlpha(0);
    hittext.setFontStyle("bold");
    zombietext = this.add.text(510, 380, "", { color: "#ff3434", fontSize: 20 });
    zombietext.setAlpha(0);
    zombietext.setFontStyle("bold");
    beginText = this.add.text(-120, -10, "Press 'n' to begin story");
   

// Narration variables
    // Story intro scene
    storyText = this.add.text(-170, -40, dialogue[0].narration.scene1A, textFormat);
    storyText2 = this.add.text(-170, -40, dialogue[0].narration.scene1B, textFormat);
    storyText3 = this.add.text(-170, -40, dialogue[0].narration.scene1C, textFormat);
    storyText4 = this.add.text(-170, -40, dialogue[0].narration.scene1D, textFormat);
    storyText5 = this.add.text(-170, -40, dialogue[0].narration.scene1E, textFormat);
    // Old man zombie scene
    storyText6 = this.add.text(-170, -40, dialogue[0].narration.scene2A, textFormat);
    storyText7 = this.add.text(-170, -40, dialogue[0].narration.scene2B, textFormat);
    storyText8 = this.add.text(-170, -40, dialogue[0].narration.scene2C, textFormat);
    storyText9 = this.add.text(-170, -40, dialogue[0].narration.scene2D, textFormat);
   

// Hiding text until called on
    storyText.visible = false;
    storyText2.visible = false;
    storyText3.visible = false;
    storyText4.visible = false;
    storyText5.visible = false;

    storyText6.visible = false;
    storyText7.visible = false;
    storyText8.visible = false;
    storyText9.visible = false;

// setting the text container
    textcontainer = this.add.container(400, 200, textbox);
    textcontainer.visible = true;
    textcontainer = this.add.container(400, 200, textbox); // creating container including textbox
    // textcontainer.visible = false; // hiding container on page load, also hides textbox

    textcontainer.setSize(400, 100); // setting container size to be inside of borders of textbox

    textcontainer.setInteractive(); 

    textcontainer.on("pointerover", function() {
        textbox.setTint(0x44ff44);
    });

    textcontainer.on("pointerout", function() {
        textbox.clearTint();
    });
    
    textcontainer.add(beginText);

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

    // text becomes visible
    alphaup = this.tweens.add({
        targets: hittext,
        alpha: 1,
        duration: 200
    });

    // text fades away
    alphadown = this.tweens.add({
        targets: hittext,
        alpha: 0,
        delay: 600,
        duration: 200
    });

    zalphaup = this.tweens.add({
        targets: zombietext,
        alpha: 1,
        duration: 200
    });

    zalphadown = this.tweens.add({
        targets: zombietext,
        alpha: 0,
        delay: 600,
        duration: 200
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

// Event Listener for beginning the narration
document.addEventListener("keypress", function(event) {
    if (keydown) {
        return false;
    }
    if (event.key === "n" || event.key === "N") {
        // storyText.visible = true;
        timedStoryTelling2();
    }
});


document.addEventListener("keypress", function(event) {
    if (keydown) {
        return false;
    }
    if (event.key === "a" || event.key === "A") {
        hgAttack();
        storyText9.visible = false;
    }
    if (event.key === "s" || event.key === "S") {
        if (special > 0) {
            return false;
        } else {
            hgSpecial();
        }
    }
    if (event.key === "h" || event.key === "H") {
        usePotion();
    }
});




function hgAttack() {
    keydown = true;
    special = special - 1;
    player.anims.play("hgattack", true);
    console.log(hgevade);
        
    var evasionGenerate = Math.floor(Math.random() * 100);
    combatRoll()

    if (farmzombiehealth <= 0) {
        setTimeout(function() {
            farmzombie.anims.play("fzdying", true)
        }, 200);
    } else if (evasionGenerate > fzEvasionStat) {
        setTimeout(function() {
            farmzombie.anims.play("fzhurt", true);
        }, 200);
        zombietext.setText("Hit!");
        zalphaup.restart();
        zalphadown.restart();
        setTimeout(fzAttack, 1000);
        farmzombiehealth -= (playerAttack - zombieDefense);
        console.log("You hit the zombie, current zombie health is " + farmzombiehealth);
        enemyText.setText('Enemy Hp: ' + farmzombiehealth)
    } else { 
        farmzombie.anims.play("fzrunning", true);
        fzevade.restart();
        zombietext.setText("Miss!");
        zalphaup.restart();
        zalphadown.restart();
        setTimeout(fzAttack, 1000);
        farmzombiehealth -= 0;
        console.log("Z Evade");
    }
};

function hgSpecial() {
    keydown = true;
    special = 2;
    player.anims.play("hgattack", true);
    combatRoll()
    if (farmzombiehealth <= 0) {
        setTimeout(function() {
            farmzombie.anims.play("fzdying", true)
        }, 200);
    } else {
        setTimeout(function() {
            farmzombie.anims.play("fzhurt", true);
        }, 200);
        zombietext.setText("Crit!");
        zalphaup.restart();
        zalphadown.restart();
        setTimeout(fzAttack, 1000);
        farmzombiehealth -= ((playerAttack * 1.5) - zombieDefense)
        console.log("Z Hit current zombie health is " + farmzombiehealth);
        enemyText.setText('Enemy Hp: ' + farmzombiehealth)
    }
}

// Narration cycle in textbox
    // Intro Story
function timedStoryTelling1() {
    setTimeout(function () {
        beginText.visible = false;
        storyText.visible = true;
        textcontainer.add(storyText);
    }, 500);
    setTimeout(function () {
        storyText.visible = false;
        storyText2.visible = true;
        textcontainer.add(storyText2);
    }, 8000);
    setTimeout(function () {
        storyText2.visible = false;
        storyText3.visible = true;
        textcontainer.add(storyText3);
    }, 16000);
    setTimeout(function () {
        storyText3.visible = false;
        storyText4.visible = true;
        textcontainer.add(storyText4);
    }, 24000);
    setTimeout(function () {
        storyText4.visible = false;
        storyText5.visible = true;
        textcontainer.add(storyText5);
    }, 32000);
};

    // Old man story
function timedStoryTelling2() {
    setTimeout(function () {
        beginText.visible = false;
        storyText6.visible = true;
        textcontainer.add(storyText6);
    }, 500);
    setTimeout(function () {
        storyText6.visible = false;
        storyText7.visible = true;
        textcontainer.add(storyText7);
    }, 8000);
    setTimeout(function () {
        storyText7.visible = false;
        storyText8.visible = true;
        textcontainer.add(storyText8);
    }, 16000);
    setTimeout(function () {
        storyText8.visible = false;
        storyText9.visible = true;
        textcontainer.add(storyText9);
    }, 24000);
};


function fzAttack() {
    if (farmzombiehealth <= 0) {
        setTimeout(function() {
            farmzombie.anims.play("fzdying", true)
        }, 200);
    } else {
        farmzombie.anims.play("fzattack", true);
        
        var evasionGenerate = Math.floor(Math.random() * 100);
        combatRoll()

        if (playerhealth <= 0) {
            setTimeout(function() {
                player.anims.play("hgdying", true)
            }, 200);
        } else if (evasionGenerate > hgEvasionStat) {
            player.anims.play("hghurt", true);
            setTimeout(function() {
                keydown = false;
            }, 500);
            hittext.setText("Hit!");
            alphaup.restart();
            alphadown.restart();
            playerhealth -= (zombieAttack - playerDefense);
            healthText.setText('Hp: ' + playerhealth)
            console.log("Zombie hits you, current player health is " + playerhealth);
            
            var updates = {
                hp: playerhealth,
                defense: hgDefenseStat,
                evasion: hgEvasionStat,
                attack: hgAttackStat,
            }
            
            $.ajax({
                type: "PUT",
                url: "/api/update",
                data: updates,
            });

        } else {
            player.anims.play("hgrunning", true);
            hgevade.restart();
            hittext.setText("Miss!");
            alphaup.restart();
            alphadown.restart();
            console.log(hgevade);
            playerhealth -= 0
            console.log("Hg evade")
            keydown = false;
        }
    } 
}

function combatRoll() {
    zombieDefense = Math.floor(Math.random() * (fzDefenseStat - 1 + 1)) + 1;
    zombieAttack = Math.floor(Math.random() * (fzAttackStat - 10 + 1)) + 10;
    playerDefense = Math.floor(Math.random() * (hgDefenseStat - 1 + 1)) + 1;
    playerAttack = Math.floor(Math.random() * (hgAttackStat - 10 + 1)) + 10;
}

function usePotion () {
    if (hppotion === true) {
        playerhealth += 25
        healthText.setText('Hp: ' + playerhealth)
        potionText.setText('Potions: 0')
        hppotion = false
    }
}









