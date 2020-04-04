let offset = 10

let playerSize = 8.5
let arrowKeyPressed = false
let tempDir = [0,0] //Stores the direction after arrow key is pressed but before applied to the player 


class player{
  constructor(color){
    this.currentCell = [14,23] 
    this.xPixel = this.currentCell[0]*cellSize 
    this.yPixel = this.currentCell[1]*cellSize 
    this.color = color
    this.dir = [-1,0]
    this.speed = 1.25// Has to be a multiple of cellSize  
    this.nextCellType = "" //String that indicated if the next cell in current direction is wall or path
    this.lives = 2
  }
  draw(){//Drawing Circle Only
    c.beginPath()
    c.fillStyle = this.color
    c.strokeStyle = this.color
    c.arc(this.xPixel+offset,this.yPixel+offset,playerSize,0,2*Math.PI)
    c.fill()
    c.stroke()
  }
  movePacman(){
    //Movement when Key Pressed
    let nextCellTypeKP = nextCellType(this.currentCell[0],this.currentCell[1],tempDir[0],tempDir[1])
    if(arrowKeyPressed){
      if(this.xPixel%cellSize == 0 && this.yPixel%cellSize == 0){ //if the player is in only 1 cell
        if(nextCellTypeKP == "path"){ //If the new players direction is a path cell. If it is a wall cell then no change 
          this.dir[0] = tempDir[0]
          this.dir[1] = tempDir[1]
          arrowKeyPressed = false
        }
      }
    }

    //Movement when Key not Pressed 
    this.nextCellType = nextCellType(this.currentCell[0],this.currentCell[1],this.dir[0],this.dir[1])
    if(this.nextCellType == "wall"){ //Stop if wall hit
      this.dir[0] = 0
      this.dir[1] = 0 
    }

    //Middle Tube Teleportation 
    if(this.currentCell[0]>27){ //Leave Right, Enter Left
      this.currentCell[0] = 1
      this.xPixel = this.currentCell[0]*cellSize
      this.dir[0] = 1
    }
    if(this.currentCell[0] < 1){ //Leave Left, Enter Right
      this.currentCell[0] = 27
      this.xPixel = this.currentCell[0]*cellSize
      this.currentCell[0] = 27
      this.dir[0] = -1
    }
  }
  update(){
    // Update x and y positions
    this.xPixel += this.dir[0]*this.speed
    this.yPixel += this.dir[1]*this.speed
    
    //Update Current Cell
    if(this.xPixel%cellSize == 0 && this.yPixel%cellSize == 0){
      this.currentCell = [this.xPixel/cellSize,this.yPixel/cellSize]  
    }
  }
}

function findKeyPressed(ev){
  keyCode = ev.keyCode

  //Calculate new direction and store in temp
  if(keyCode == 39){//right
    changeDirection(1,0)
    arrowKeyPressed = true 
  }
  else if(keyCode == 37){//left
    changeDirection(-1,0)
    arrowKeyPressed = true
  }
  else if(keyCode == 38){//up
    changeDirection(0,-1)
    arrowKeyPressed = true
  }
  else if(keyCode == 40){//down
    changeDirection(0,1)
    arrowKeyPressed = true
  }
}

function changeDirection(xdir,ydir){
  tempDir[0] = xdir 
  tempDir[1] = ydir
}

function nextCellType(x,y,dirx,diry){ //Find the next cell based on current moving direction
  return grid[convert(x+dirx,y+diry)].type
}




