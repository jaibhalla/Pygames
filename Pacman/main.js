let c = document.querySelector('canvas').getContext('2d')
let cellSize = 20
let canvasHeight = 31*cellSize
let canvasWidth = 29*cellSize
let rows = canvasHeight/cellSize
let cols = canvasWidth/cellSize
// ROWS = 31 , COLS = 29 
let grid = []
let nodes = [] 

//To reduce blurriness of lines and circles
c.canvas.height = canvasHeight*2
c.canvas.width = canvasWidth*2
c.canvas.style.height = canvasHeight.toString().concat("px")
c.canvas.style.width = canvasWidth.toString().concat("px")
c.scale(2,2)

let pacman = new player("#FFFF00")
let pinky = new ghost("pinky",14,11)

let blinky = new ghost("blinky",14,11)
let inky = new ghost("inky",14,12)
let clyde = new ghost("clyde",14,12)

let goToCorner = false  //Used for clyde in Chase mode 

let mainFoodCounter = 0 
let superFoodCounter = false
let activeCollision = false

let idScore = document.getElementById("Score")
let idLives = document.getElementById("Lives")


window.requestAnimationFrame(gameLoop)


function gameLoop(){
    drawGrid()
    pacmanStuff()
    ghostStuff()
    foodStuff()
    updateText()
    window.requestAnimationFrame(gameLoop)
}

function updateText(){
    idLives.innerHTML = "Lives: " + pacman.lives.toString()
    idScore.innerHTML = "Score: " + mainFoodCounter.toString() + "/249"
    if(blinky.mode == "Stop"){
        idLives.innerHTML = "Game Over!" 
    }
}


function drawGrid(){
    c.clearRect(0,0,canvasWidth,canvasHeight)
    let temp = -56 // 56 "food" are in walls or are blank in path
    for(j=0; j<rows;j++){
        for(i=0; i<cols;i++){
            //Count Eaten food
            if(grid[convert(i,j)].cellFood.status == "Eaten"){
                temp++
                mainFoodCounter = temp
            }
            
            //Only show food on "path" cell types 
            if(grid[convert(i,j)].type == "path"){
                grid[convert(i,j)].cellFood.show()
            }
            grid[convert(i,j)].draw()
            // nodes[convert(i,j)].draw("showPinkyPath")
            // nodes[convert(i,j)].draw("showBlinkyPath")
            // nodes[convert(i,j)].draw("showInkyPath")
            // nodes[convert(i,j)].draw("showClydePath")
        }    
    }
    c.beginPath()
    c.lineWidth = 2
    c.strokeStyle = "#FFFFFF"
    c.moveTo(13*cellSize,12*cellSize)
    c.lineTo(16*cellSize,12*cellSize)
    c.stroke()
}

function pacmanStuff(){
    pacman.draw()
    pacman.movePacman()
    pacman.update()
    window.addEventListener("keydown",findKeyPressed)
}

function foodStuff(){
    //Check if Superfood eaten 
    if(pacman.currentCell[0] == 1 && pacman.currentCell[1] == 3){
        superfoodEaten()
    }
    if(pacman.currentCell[0] == 1 && pacman.currentCell[1] == 23){
        superfoodEaten()
    }
    if(pacman.currentCell[0] == 27 && pacman.currentCell[1] == 3){
        superfoodEaten()
    }
    if(pacman.currentCell[0] == 27 && pacman.currentCell[1] == 23){
        superfoodEaten()
    }    
    function superfoodEaten(index){
        if(grid[convert(pacman.currentCell[0],pacman.currentCell[1])].cellFood.status == "SuperFood"){
            superFoodCounter = true
            pinky.mode = "Scared"
            blinky.mode = "Scared"
            inky.mode = "Scared"
            clyde.mode = "Scared"
        }
        else{ 
            grid[convert(pacman.currentCell[0],pacman.currentCell[1])].cellFood.status = "Eaten"
        }
    }
    //Change status of food if pacman is present at that locaiton 
    grid[convert(pacman.currentCell[0],pacman.currentCell[1])].cellFood.status = "Eaten"
}
function ghostStuff(){
    if(mainFoodCounter > 0){
        blinkyStuff()
    }
    if(mainFoodCounter > 3){
        pinkyStuff()
    }
    if(mainFoodCounter>30){
        inkyStuff()
    }
    if(mainFoodCounter>70){ //mainFoodCounter is used for when the ghosts are allowed to Enter - According to Pac-Man's Spec
        clydeStuff()
    }
}




function blinkyStuff(){
    blinky.drawShape()
    blinky.moveGhost()
    
    blinky.collide()
    if(superFoodCounter == false && activeCollision == false){//Super Food is not Eaten
        blinky.timing(true)
        if(blinky.mode == "Chase"){
            blinky.color = "#FF0000" 
            blinky.inCorner = false
            blinky.path = findPath(blinky.currentCell,pacman.currentCell)
        }
        else if(blinky.mode == "Scatter"){
            blinky.color = "#FF0000" 
            blinky.scatterMode()
        }
    }
    else if(activeCollision == true){
        if (blinky.mode == "Stop"){
            blinky.stopMode()
        }
        else if(blinky.mode == "Restart"){
            blinky.restartMode()
        }
    }
    else{// superFoodCounter becomes false after 10 seconds
        blinky.timing(false)
        if(blinky.mode == "Scared"){
            blinky.scaredMode()
        }
        else if (blinky.mode == "Eaten"){
            blinky.eatenMode()
        }
    }
    
}


function pinkyStuff(){ 
    pinky.drawShape()
    pinky.moveGhost()
    pinky.collide()
    if(superFoodCounter == false && activeCollision == false){//Super Food is not Eaten. Active Collision is used to check collison in these states
        pinky.timing(true)
        if(pinky.mode == "Chase"){
            pinky.color = "#FFB8FF" 
            pinky.inCorner = false
            pinky.path = findPath(pinky.currentCell,findPinkyTarget())
        }
        else if(pinky.mode == "Scatter"){
            pinky.color = "#FFB8FF" 
            pinky.scatterMode()
        }
    }
    else if(activeCollision == true){
        if (pinky.mode == "Stop"){
            pinky.stopMode()
        }
        else if(pinky.mode == "Restart"){
            pinky.restartMode()
        }
    }
    else{// superFoodCounter becomes false after 10 seconds
        pinky.timing(false)
        if(pinky.mode == "Scared"){
            pinky.scaredMode()
        }
        else if (pinky.mode == "Eaten"){
            pinky.eatenMode()
        }
    }

}

function inkyStuff(){
    inky.drawShape()
    inky.moveGhost()
    inky.collide()
    if(superFoodCounter == false && activeCollision == false){//Super Food is not Eaten
        inky.timing(true)
        if(inky.mode == "Chase"){
            inky.color = "#00FFFF" 
            inky.inCorner = false
            inky.path = findPath(inky.currentCell,findInkyTarget())
        }
        else if(inky.mode == "Scatter"){
            inky.color = "#00FFFF" 
            inky.scatterMode()
        }
    }
    else if(activeCollision == true){
        if (inky.mode == "Stop"){
            inky.stopMode()
        }
        else if(inky.mode == "Restart"){
            inky.restartMode()
        }
    }
    else{// superFoodCounter becomes false after 10 seconds
        inky.timing(false)
        if(inky.mode == "Scared"){
            inky.scaredMode()
        }
        else if (inky.mode == "Eaten"){
            inky.eatenMode()
        }
    }
}

function clydeStuff(){
    clyde.drawShape()
    clyde.moveGhost()
    clyde.collide()
    if(superFoodCounter == false && activeCollision == false){//Super Food is not Eaten
        clyde.timing(true)
        if(clyde.mode == "Chase"){
            clyde.color = "#FFB852"
            clyde.inCorner = false
            if(goToCorner == false){
                clyde.path = findPath(clyde.currentCell,pacman.currentCell)
                if(distanceToTarget(clyde.currentCell,pacman.currentCell)<8){
                    goToCorner = true
                }
            }
            else{
                clyde.path = findPath(clyde.currentCell,clyde.corner1)
                if(clyde.currentCell[0] == clyde.corner1[0] && clyde.currentCell[1] == clyde.corner1[1])
                goToCorner = false
            }
        }
        else if(clyde.mode == "Scatter"){
            clyde.color = "#FFB852" 
            clyde.scatterMode()
        }
    }
    else if(activeCollision == true){
        if (clyde.mode == "Stop"){
            clyde.stopMode()
        }
        else if(clyde.mode == "Restart"){
            clyde.restartMode()
        }
    }
    else{// superFoodCounter becomes false after 10 seconds
        clyde.timing(false)

        if(clyde.mode == "Scared"){
            clyde.scaredMode()
        }
        else if (clyde.mode == "Eaten"){
            clyde.eatenMode()

        }
    }
}


//To use grid[] like a 2D matrix
function convert(i,j){
    return i + j*cols
}


function findPinkyTarget(){ //In Chase mode, Pinky looks 4 steps ahead at maximum. If this is outside the maze, then 3 steps ahead, etc 
    if(distanceToTarget(pinky.currentCell,pacman.currentCell)<5){ //Choose pacman cell if less than or equal to 4 cells away
        return pacman.currentCell
    }
    else{
        for(k=0;k<=4;k++){
            targetCell = [pacman.currentCell[0] + (k*pacman.dir[0]),pacman.currentCell[1]+ (k*pacman.dir[1])]
            nextTargetCell = [pacman.currentCell[0] + ((k+1)*pacman.dir[0]),pacman.currentCell[1]+ ((k+1)*pacman.dir[1])] //Used to check if the next increment is outside the maze
            if(nodes[convert(targetCell[0],targetCell[1])].real == true && nodes[convert(nextTargetCell[0],nextTargetCell[1])].real == false){
                break
            }
        }
        return targetCell

    }
}

function distanceToTarget(currentNode,targetNode){ //Clyde Chase Mode 
    let iDistance = targetNode[0] - currentNode[0] // a
    let jDistance = targetNode[1] - currentNode[1] // b
    let total = Math.pow(iDistance,2) + Math.pow(jDistance,2) //c2 = a2 + b2

    return Math.round(Math.sqrt(total)) 
}

function findInkyTarget(){//Inky Chase Mode 
    if(distanceToTarget(inky.currentCell,pacman.currentCell)<3){
        return pacman.currentCell
    }
    else{
        for(k=0;k<=2;k++){
            targetCell = [pacman.currentCell[0] + (k*pacman.dir[0]),pacman.currentCell[1]+ (k*pacman.dir[1])]
            nextTargetCell = [pacman.currentCell[0] + ((k+1)*pacman.dir[0]),pacman.currentCell[1]+ ((k+1)*pacman.dir[1])] //Used to check if the next increment is outside the maze
            if(nodes[convert(targetCell[0],targetCell[1])].real == true && nodes[convert(nextTargetCell[0],nextTargetCell[1])].real == false){
                break
            }
        }
        return targetCell

    }
}
