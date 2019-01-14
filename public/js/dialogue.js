var speech = [
    {
        narration: {
            scene1A: "Greetings Adventurer! This is an urgent letter! It bares the mark of the King of outerlands. It would not be wise to keep him waiting.",
            scene1B: "To any able bodied adventurer, Dreary cove town has not sent their taxes in nearly three months. My subjects love paying taxes, who doesn't?.",
            scene1C: "Recently there have been terrible rumors and I fear the worst! Talk of the undead has surfaced and I need you to silence these troubles.",
            scene1D: "With haste, head to the town and investigate! If you are able to determine and fix the problem, you will be rewarded with 200 gold pieces.", 
            scene1E: "Time is of utmost importance here, I fear someone is trying to raise an undead army. Signed, King Erich",
            scene2A: "After a short journey you approach the outskirts of Dreary Cove and you begin to hear screaming and what sounds like battle.",
            scene2B: "As you pick up your pace, you spot a townsperson making a break for it in your direction.",
            scene2C: "As the man takes off running, you notice another figure slowly making its' way towards you.",
            scene2D: "Once it gets close enough, you see that although it's better looking than the old man, it's definitely a zombie.",
            scene4A: "As you enter the town you notice the poor conditions all around. Zombies and villagers alike litter the ground and only three structures remain standing.",
            scene4B: "You slowly enter the house ready for anything. It's nearly silent save for some rustling at the back of the house.",
            scene4C: "A small dirty child crawls out from his hiding spot.",
            scene5A: "You swing the doors of the tavern open. The Spooky Tap may have been nice at one point, but that time is long gone.",
            scene5B: "Sprawled out in the middle of a table is a large detailed map of the area. There's a large X right on a cave not far from town.",
            scene5C: "Next to the map is a note that reads 'Map to secret hideout. Burn after reading! -Lord of Bones'",
            scene6A: "You enter the church through a shattered stain glass window. ",
            scene6B: "Immediately catching your eye, you see a zombie shambling through the pews.",
            scene6C: "It notices you too and begins to attack.",
            scene6D: "The zombie falls over motionless. As you search the body you notice writing on the zombies clothing.",
            scene6E: "It reads 'If lost return to Lord of Bone's secret cave 1 mile down the road from Dreary Cove.'",
            scene7A: "While there was nearly nothing left of the town, everything pointed you to a cave close to town.",
            scene7B: "The cave is lit by torches and as you traverse further in you hear the distinct sound of two human voices.",
            scene7C: "Before you stands two figures. One with a skull face, and the other with a red mask.",
            scene7D: "The man in the red mask charges at you!",
            scene8A: "You've won the fight, but the henchman isn't convinced.",
            scene8B: "The man in the red mask has a heart attack and dies. As he falls over his mask shatters revealing the old man you saw earlier.",
            scene8C: "The second figure with the skull mask turns and addresses you for the first time.",
            scene8D: "After a tough battle, the lord of bones falls. Exhausted, you gather proof of your victory and prepare to return to the King.",
            scene8E: "You enter the castle and show your proof of victory to the king."
        }
    },
    {
        oldMan: {
            dialogue: [
                "Old Man:'What are you crazy? You’re supposed to run away!'",
                {
                    Q1: "Hero:'What’s going on?'",
                    A1: "Old Man:'Zombies are overrunning Dreary Cove! Stay as far away as you can!'",
                    Q2: "Hero:'You're just going to leave everyone behind?'",
                    A2: "Old Man:'I’m just an old man, I can’t fight zombies!'",
                    Q3: "Hero:'Are you from Dreary Cove?'",
                    A3: "Old Man'Obviously, are you daft?'"
                }
            ]
        }
    },
    {
        child: {
            dialogue: [
                "'Ahhh a zombie!'",
                "'Wait you're just ugly, are you here to save us?'",
                {
                    Q1: "'Where's your family?'",
                    A1: "'My grandpa just ran off, i'm all alone.'",
                    Q2: "'Can you help me?'",
                    A2: "'Here, my grandpa says these make you feel better. You should take it.'",
                    Q3: "'How'd you survive?'",
                    A3: "'I just ran and hid, i'm so scared.'"
                }
            ]
        }
    },
    {
        manInMask: {
            dialogue: [
                "'And then I just ran away Hahahaha! That zombie must have eaten him fo... How'd you get in here?'",
                "'It matters not, you won't make it out of here alive and our zombie army will kill the king! No more taxes for us muahahahha!'",
                "'You think i've been beaten? Nothing you can do will sto..'"
            ]
        }
    },
    {
        boneLord: {
            dialogue: [
                "'Thank you, he was beyond annoying'",
                "'Enough talk, time to end this!'",
                {
                    Q1: "Wasn't he your friend?",
                    A1: "No, simply an obnoxious old man.",
                    Q2: "Why are you doing this?",
                    A2: "Well to rule the kingdom of course.",
                    Q3: "Who are you?",
                    A3: "What? You mean you don't recognize me? Oooh I'm so scared save me. I can't believe you bought that muahahaha!"
                }
            ]

        }
    },
    {
        king: {
            dialogue: [
                "'Brave adventurer, you have done the impossible! I cannot express how much you've done for this kingdom. Let the taxes flow!'",
                "'Oh, before I forget, heres your payment of 150 ahmph I mean 200 gold pieces.'",
                "'You've proven your worth, how would you feel about completing more quests for me?'",
            ]
        }
    }
]


module.exports = speech;