var prisoner, prisonerIdleImg, prisonerLeftImg, prisonerRightImg;
var bgImg,bg;
var invisibleGround, invisibleGroundGroup, invisibleGround2;
var platformLeftImg, platformImg, platformRightImg;
var startingPlatform, platformGroup, platform, plt2, plt3;
var platformDisappearing;


function preload(){
    prisonerIdleImg = loadImage("assets/Prisoner_Idle-removebg-preview.png");
    prisonerLeftImg = loadImage("assets/Prisoner_Running-removebg-preview(1).png");
    prisonerRightImg = loadImage("assets/Prisoner_Running-removebg-preview.png");
    bgImg = loadImage("assets/Background.png");
    platformLeftImg = loadImage("assets/tile1.png");
    platformImg = loadImage("assets/tile2.png");
    platformRightImg = loadImage("assets/tile3.png");
    platformDisappearing = loadAnimation("assets/trap2.png", "assets/trap3.png", "assets/trap4.png");
}

function setup(){
    createCanvas(windowWidth,windowHeight);
    bg = createSprite(windowWidth/2,windowHeight/2,windowWidth*6,windowHeight*20);
    bg.addImage(bgImg);
    bg.scale = 4
    bg.velocityY = 2

    startingPlatform = createSprite(windowWidth/2, windowHeight-200, 20, 20)
    invisibleGround2 = createSprite(startingPlatform.x, startingPlatform.y, 30, 10);
    
    
    prisoner = createSprite(startingPlatform.x,windowHeight-220,20,20);
    prisoner.addImage("idle",prisonerIdleImg);
    prisoner.addImage("left",prisonerLeftImg);
    prisoner.addImage("right",prisonerRightImg);

    startingPlatform.addImage("middle",platformImg);
    startingPlatform.velocityY = 2;
    invisibleGround2.velocityY = 2;
    startingPlatform.lifetime = 400;
    invisibleGround2.lifetime = startingPlatform.lifetime;
    
    prisoner.scale = 0.3;

    platformGroup = new Group();
    invisibleGroundGroup = new Group()
}

function draw(){
    background(0);


    spawnPlatform();

    if(bg.y > windowHeight/2){
        bg.y = 100;
    }

    

    if(keyIsDown(UP_ARROW)){
        prisoner.y = prisoner.y -20;
    }

    if(keyIsDown(LEFT_ARROW)){
        prisoner.changeImage("left");
        prisoner.x = prisoner.x -10;
    }

    if(keyWentUp(LEFT_ARROW)){
        prisoner.changeImage("idle");
    }

    if(keyIsDown(RIGHT_ARROW)){
        prisoner.changeImage("right");
        prisoner.x = prisoner.x +10;
    }

    if(keyWentUp(RIGHT_ARROW)){
        prisoner.changeImage("idle");
    }

    if(keyIsDown(DOWN_ARROW)){
        prisoner.y = prisoner.y +5
    }

    prisoner.y = prisoner.y + 4.5;

    /*Work in progress:
    if(prisoner.y < 0){
        prisoner.y = windowHeight-20;
        platformGroup.removeSprites();
    }*/
    
    prisoner.collide(invisibleGroundGroup);
    //prisoner.collide(platform);

    invisibleGroundGroup.add(invisibleGround2);

    //console.log(frameCount);

    if(prisoner.y < windowHeight){
        //platform.velocityY = 0;
        fill("#FFFF");
        textAlign("center");
        textSize(40);
        text("You win!",windowWidth/2, windowHeight/2);

        
    }

    drawSprites()
}
    //Platform collision not working, tweak spawn time and locations:
    function spawnPlatform(){
        if(frameCount % 80 === 0){
            platform = createSprite(Math.round(random(prisoner.x-350, prisoner.x+350)), Math.round(random(prisoner.y-200, prisoner.y-80)),20,20);
            invisibleGround = createSprite(platform.x, platform.y, 50, 10);

            plt2 = createSprite(platform.x-50, platform.y, 30,10);
            plt3 = createSprite(platform.x+50, platform.y, 30,10);
            

            platform.addImage(platformImg);
            plt2.addImage(platformLeftImg);
            plt3.addImage(platformRightImg);

            platform.velocityY = 2.4;
            invisibleGround.velocityY = platform.velocityY;
            plt2.velocityY= platform.velocityY
            plt3.velocityY= platform.velocityY


            platform.lifetime = 410
            plt2.lifetime = 410
            plt3.lifetime = 410
            invisibleGround.lifetime = 410;
            platformGroup.add(platform);
            invisibleGroundGroup.add(invisibleGround)

            // add if condition with lifetime

            

            
        }
            
    }

    



 