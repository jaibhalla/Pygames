let c = document.querySelector('canvas').getContext('2d')
let cellSize = 20

let canvasHeight = 31*cellSize
let canvasWidth = 29*cellSize


let rows = canvasHeight/cellSize
let cols = canvasWidth/cellSize
// ROWS = 31 , COLS = 29 

c.canvas.height = canvasHeight*2
c.canvas.width = canvasWidth*2
c.canvas.style.height = canvasHeight.toString().concat("px")
c.canvas.style.width = canvasWidth.toString().concat("px")
c.scale(2,2)

let pacman = new player(1,1, "#FFFF00")

let grid = []
let foodGrid = [] 
let wallColor = "#2121DE"

function cell(i,j){
    this.i = i
    this.j = j 
    this.wall = [false,false,false,false] //Top, Right, Bottom, Left
    this.type = "path"
    this.cellFood = new food(this.i,this.j)
    this.draw = function(){
        if(this.wall[0]){
            drawLine(i,j,i+1,j)
        }
        if(this.wall[1]){
            drawLine(i+1,j,i+1,j+1)
        }
        if(this.wall[2]){
            drawLine(i,j+1,i+1,j+1)
        }
        if(this.wall[3]){
            drawLine(i,j,i,j+1)
        }
    }
    this.color = function(){
        if(this.type == "wall"){
            c.fillStyle = "#2121DE" //Blue if wall
            c.fillRect(i*cellSize,j*cellSize, cellSize,cellSize)

        }

    }
}


function drawLine(startx,starty,endx,endy){
    startx *= cellSize
    starty *= cellSize
    endx *= cellSize
    endy *= cellSize
    c.beginPath()
    c.lineWidth = 0
    c.strokeStyle = wallColor
    c.moveTo(startx,starty)
    c.lineTo(endx,endy)
    c.stroke()
}

for(i=0; i<rows;i++){
    for(j=0; j<cols;j++){
        grid.push(new cell(j,i))
        // foodGrid.push(new food(j,i))
    }
}

window.requestAnimationFrame(gameLoop)
function gameLoop(){
    drawGrid()
    
    pacman.draw()
    pacman.movePacman()
    pacman.update()
    
    foodEaten()

    window.addEventListener("keydown",findKeyPressed)
    window.requestAnimationFrame(gameLoop)
}

let superFoodCounter = 0 
function foodEaten(){
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
    grid[convert(pacman.currentCell[0],pacman.currentCell[1])].cellFood.status = "Eaten"

}

function superfoodEaten(index){
    if(grid[convert(pacman.currentCell[0],pacman.currentCell[1])].cellFood.status == "SuperFood"){
        console.log("SuperFood Eaten")
    }
    else{ 
        grid[convert(pacman.currentCell[0],pacman.currentCell[1])].cellFood.status = "Eaten"
    }
}



// 1,3 
// 27,3 
// 1,23    ===> Super Food Position 
// 27,23



function drawGrid(){
    c.clearRect(0,0,canvasWidth,canvasHeight)
    // showLines()
    var foodCounter = -56 // 56 "food" are in walls or are blank in path
    for(i=0; i<cols;i++){
        for(j=0; j<rows;j++){
            if(grid[convert(i,j)].cellFood.status == "Eaten"){
                foodCounter++
            }
            grid[convert(i,j)].draw()
            if(grid[convert(i,j)].type == "path"){
                grid[convert(i,j)].cellFood.show()
            }
        }    
    }
}



function showLines(){
    for(i=0;i<=canvasHeight;i+=cellSize){
        c.beginPath()
        c.lineWidth = 1
        c.strokeStyle = "#FFFFFF"
        c.moveTo(0,i)
        c.lineTo(canvasWidth,i)
        c.stroke()
    }
    for(i=0;i<=canvasWidth;i+=cellSize){
        c.beginPath()
        c.lineWidth = 1
        c.strokeStyle = "#FFFFFF"
        c.moveTo(i,0)
        c.lineTo(i,canvasHeight)
        c.stroke()
    }
}

function convert(i,j){
    return i + j*cols
}

function cellType(){ 
    for(i = 0; i<cols;i++){
        grid[convert(i,0)].type = "wall"
        grid[convert(i,30)].type = "wall"
        if(i<15){
            grid[convert(0,15+i)].type = "wall"
            }
        if(i<13){
            grid[convert(0,1+i)].type = "wall"
        }

        if(i<5){
            grid[convert(7+i,2)].type = "wall"
            grid[convert(7+i,3)].type = "wall"
            grid[convert(7+i,4)].type = "wall"
            
            grid[convert(13,6+i)].type = "wall"
            grid[convert(14,6+i)].type = "wall"
            grid[convert(15,6+i)].type = "wall"

            grid[convert(1,9+i)].type = "wall"
            grid[convert(2,9+i)].type = "wall"
            grid[convert(3,9+i)].type = "wall"
            grid[convert(4,9+i)].type = "wall"
            grid[convert(5,9+i)].type = "wall"

            grid[convert(1,15+i)].type = "wall"
            grid[convert(2,15+i)].type = "wall"
            grid[convert(3,15+i)].type = "wall"
            grid[convert(4,15+i)].type = "wall"
            grid[convert(5,15+i)].type = "wall"

            grid[convert(7,15+i)].type = "wall"
            grid[convert(8,15+i)].type = "wall"

            grid[convert(7+i,21)].type = "wall"
            grid[convert(7+i,22)].type = "wall"

            grid[convert(4,21+i)].type = "wall"
            grid[convert(5,21+i)].type = "wall"

            grid[convert(7,24+i)].type = "wall"
            grid[convert(8,24+i)].type = "wall"

            grid[convert(2+i,28)].type = "wall"
            grid[convert(2+i,27)].type = "wall"

            grid[convert(10,12+i)].type = "wall"
            grid[convert(11,12+i)].type = "wall"
            grid[convert(12,12+i)].type = "wall"
            grid[convert(13,12+i)].type = "wall"
            grid[convert(14,12+i)].type = "wall"

            grid[convert(13,18+i)].type = "wall"
            grid[convert(14,18+i)].type = "wall"

            grid[convert(13,24+i)].type = "wall"
            grid[convert(14,24+i)].type = "wall"
        }

        if(i<4){
            grid[convert(2+i,2)].type = "wall"
            grid[convert(2+i,3)].type = "wall"
            grid[convert(2+i,4)].type = "wall"
            grid[convert(2+i,6)].type = "wall"
            grid[convert(2+i,7)].type = "wall"
            
            grid[convert(13,1+i)].type = "wall"
            grid[convert(14,1+i)].type = "wall"
            grid[convert(15,1+i)].type = "wall"
            
            grid[convert(7,6+i)].type = "wall"
            grid[convert(7,10+i)].type = "wall"
            grid[convert(8,6+i)].type = "wall"
            grid[convert(8,10+i)].type = "wall"

            grid[convert(8+i,9)].type = "wall"
            grid[convert(8+i,10)].type = "wall"

            grid[convert(10+i,6)].type = "wall"
            grid[convert(10+i,7)].type = "wall"
        }
        if(i<3){
            grid[convert(0+i,24)].type = "wall"
            grid[convert(0+i,25)].type = "wall"

            grid[convert(10+i,24)].type = "wall"
            grid[convert(10+i,25)].type = "wall"

            grid[convert(2+i,21)].type = "wall"
            grid[convert(2+i,22)].type = "wall"

            grid[convert(10+i,18)].type = "wall"
            grid[convert(10+i,19)].type = "wall"

            grid[convert(9+i,27)].type = "wall"
            grid[convert(9+i,28)].type = "wall"
        }
    }
}
function design(){
    //SuperFood Design 
    grid[convert(1,3)].cellFood.status = "SuperFood"
    grid[convert(27,3)].cellFood.status = "SuperFood"

    grid[convert(1,23)].cellFood.status = "SuperFood"
    grid[convert(27,23)].cellFood.status = "SuperFood"
    
    //Food Design 
    for(i=0;i<11;i++){ 
        grid[convert(9+i,11)].cellFood.status = "Eaten"
        grid[convert(9+i,17)].cellFood.status = "Eaten"

        if(i<6){
            grid[convert(9,11+i)].cellFood.status = "Eaten"
            grid[convert(19,11+i)].cellFood.status = "Eaten"
            grid[convert(0+i,14)].cellFood.status = "Eaten"
            grid[convert(23+i,14)].cellFood.status = "Eaten"
        }
        if(i<2){
            grid[convert(9,18+i)].cellFood.status = "Eaten"
            grid[convert(19,18+i)].cellFood.status = "Eaten"
            grid[convert(12,9+i)].cellFood.status = "Eaten"
            grid[convert(16,9+i)].cellFood.status = "Eaten"
            grid[convert(7+i,14)].cellFood.status = "Eaten"
            grid[convert(20+i,14)].cellFood.status = "Eaten"
        }
    }
    //Maze Design 
    for(i=0; i<13; i++){
        grid[convert(1+i,30)].wall[0] = true
        grid[convert(14+i,30)].wall[0] = true
        
        if(i<12){
            grid[convert(1+i,1)].wall[0] = true
        }
        if(i<10){
            grid[convert(2+i,29)].wall[0] = true
        }
        if(i<8){
            grid[convert(0,1+i)].wall[1] = true
            grid[convert(6,6+i)].wall[1] = true

        }
        if(i<6){
            grid[convert(0+i,14)].wall[0] = true
            grid[convert(0+i,14)].wall[2] = true
        }
        if(i<5){
            grid[convert(7+i,2)].wall[0] = true
            grid[convert(7+i,5)].wall[0] = true
            grid[convert(1+i,9)].wall[0] = true
            grid[convert(5,9+i)].wall[1] = true
            grid[convert(6,15+i)].wall[1] = true
            grid[convert(5,15+i)].wall[1] = true
            grid[convert(1+i,19)].wall[2] = true
            grid[convert(2+i,27)].wall[0] = true
            grid[convert(9,12+i)].wall[1] = true
            grid[convert(8,15+i)].wall[1] = true
            grid[convert(7+i,21)].wall[0] = true
            grid[convert(7+i,23)].wall[0] = true
            grid[convert(5,21+i)].wall[1] = true
        }
        if(i<4){
            grid[convert(2+i,5)].wall[0] = true
            grid[convert(2+i,5)].wall[2] = true
            grid[convert(2+i,2)].wall[0] = true
            grid[convert(12,1+i)].wall[1] = true
            grid[convert(2+i,7)].wall[2] = true
            grid[convert(0,20+i)].wall[1] = true
            grid[convert(0,26+i)].wall[1] = true
            grid[convert(10+i,24)].wall[0] = true
            grid[convert(10+i,6)].wall[0] = true
            grid[convert(10+i,12)].wall[0] = true
            grid[convert(10+i,17)].wall[0] = true
            grid[convert(10+i,18)].wall[0] = true
            grid[convert(2+i,21)].wall[0] = true
        }
        if(i<3){
            grid[convert(1,2+i)].wall[1] = true
            grid[convert(5,2+i)].wall[1] = true
            grid[convert(6,2+i)].wall[1] = true
            grid[convert(11,2+i)].wall[1] = true
            grid[convert(8,6+i)].wall[1] = true
            grid[convert(9+i,9)].wall[0] = true
            grid[convert(8,11+i)].wall[1] = true
            grid[convert(9+i,10)].wall[2] = true
            grid[convert(6,24+i)].wall[1] = true
            grid[convert(8,24+i)].wall[1] = true
            grid[convert(9+i,27)].wall[0] = true
            grid[convert(12,26+i)].wall[1] = true
            grid[convert(10+i,25)].wall[2] = true
            grid[convert(10+i,8)].wall[0] = true
            grid[convert(12,8+i)].wall[1] = true
            grid[convert(10+i,20)].wall[0] = true
            grid[convert(12,20+i)].wall[1] = true
            grid[convert(3,23+i)].wall[1] = true
        }
        if(i<2){
            grid[convert(1,6+i)].wall[1] = true
            grid[convert(5,6+i)].wall[1] = true
            grid[convert(7+i,14)].wall[0] = true
            grid[convert(7+i,14)].wall[2] = true
            grid[convert(7+i,6)].wall[0] = true
            grid[convert(11,9+i)].wall[1] = true
            grid[convert(1+i,24)].wall[0] = true
            grid[convert(2,24+i)].wall[1] = true
            grid[convert(1+i,26)].wall[0] = true
            grid[convert(11,27+i)].wall[1] = true
            grid[convert(1,27+i)].wall[1] = true
            grid[convert(7+i,24)].wall[0] = true
            grid[convert(9,24+i)].wall[1] = true
            grid[convert(9,6+i)].wall[1] = true
            grid[convert(9,18+i)].wall[1] = true
            grid[convert(7+i,19)].wall[2] = true
            grid[convert(6,21+i)].wall[1] = true
            grid[convert(11,21+i)].wall[1] = true
            grid[convert(1,21+i)].wall[1] = true
            grid[convert(2+i,23)].wall[0] = true
            grid[convert(4+i,26)].wall[0] = true
        }
        if(i<1){
            grid[convert(13,5)].wall[0] = true
            grid[convert(13,28)].wall[2] = true
            grid[convert(13,11)].wall[0] = true
            grid[convert(13,22)].wall[2] = true
            
            grid[convert(14,5)].wall[0] = true
            grid[convert(14,5)].wall[2] = true

            grid[convert(14,11)].wall[0] = true
            grid[convert(14,11)].wall[2] = true

            grid[convert(14,17)].wall[0] = true
            grid[convert(14,17)].wall[2] = true

            grid[convert(14,23)].wall[0] = true
            grid[convert(14,23)].wall[2] = true
            grid[convert(14,29)].wall[0] = true
            grid[convert(14,29)].wall[2] = true
            grid[convert(27,30)].wall[0] = true
        }
    }   
}
function mirror(){
    for(i= 0;i<=rows;i++){
        for(j=0;j<=cols;j++){
            grid[convert(28-i,j)].wall[0] = grid[convert(i,j)].wall[0]
            grid[convert(28-i,j)].wall[2] = grid[convert(i,j)].wall[2]
            grid[convert(28-i,j)].wall[1] = grid[convert(i,j)].wall[3]
            grid[convert(28-i,j)].wall[3] = grid[convert(i,j)].wall[1]
            
            grid[convert(28-i,j)].type = grid[convert(i,j)].type
        }
    } 
}


cellType()
design()
mirror()
