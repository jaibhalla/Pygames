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
let pinky = new ghost("pinky",1,1)

// let blinky = new ghost("blinky")
// let inky = new ghost("inky")
// let clyde = new ghost("clyde")


window.requestAnimationFrame(gameLoop)
function gameLoop(){
    drawGrid()
    pacmanStuff()
    ghostStuff()
    foodStuff()
    window.requestAnimationFrame(gameLoop)
}

function drawGrid(){
    c.clearRect(0,0,canvasWidth,canvasHeight)
    let foodCounter = -56 // 56 "food" are in walls or are blank in path
    for(j=0; j<rows;j++){
        for(i=0; i<cols;i++){
            //Count Eaten food
            if(grid[convert(i,j)].cellFood.status == "Eaten"){
                foodCounter++
            }
            
            //Only show food on "path" cell types 
            if(grid[convert(i,j)].type == "path"){
                grid[convert(i,j)].cellFood.show()
            }
            grid[convert(i,j)].draw()
            // nodes[convert(i,j)].draw("showNodes")
            // nodes[convert(i,j)].draw("showPinkyPath")
        }    
    }
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
            console.log("SuperFood Eaten")
        }
        else{ 
            grid[convert(pacman.currentCell[0],pacman.currentCell[1])].cellFood.status = "Eaten"
        }
    }
    //Change status of food if pacman is present at that locaiton 
    grid[convert(pacman.currentCell[0],pacman.currentCell[1])].cellFood.status = "Eaten"
}

function ghostStuff(){
    pinky.drawShape()
    pinky.drawTarget()
    pinky.moveGhost()
    // pinky.drawPath()
    // blinky.draw()
    // inky.draw()
    // clyde.draw()
}

//To use grid[] like a 2D matrix
function convert(i,j){
    return i + j*cols
}



