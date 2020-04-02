class ghost{
    constructor(personality,i,j){
        switch(personality){
            case "pinky": 
                this.currentCell = [i,j] 
                this.color = "#FFB8FF"
                this.dir = [0,0]
                break

            case "blinky": 
                this.currentCell = [27,1]
                this.color = "#FF0000" 
                this.dir = [1,0]
                break
            
            case "clyde": 
                this.currentCell = [1,29] 
                this.color = "#FFB852"
                this.dir = [1,0]
                break
            
            case "inky":
                this.currentCell = [27,29] 
                this.color = "#00FFFF"
                this.dir = [1,0]
                break

            }

        this.xPixel = this.currentCell[0]*cellSize 
        this.yPixel = this.currentCell[1]*cellSize 
        this.speed = 1.25// Has to be a multiple of cellSize  
        this.targetCell = [16,23] //Dependant on the mode it is in 
        this.mode = "Chase" // Chase, frightend, Scatter, Eaten 
        this.pathInfo = [[],[]] //contains path of nodes[0] and directions when reaching node[1]
        this.path = []
        this.pathDirection = []
        this.nodeToTest = []
    }
    drawShape(){//Drawing Circle and Target 
        c.beginPath()
        c.fillStyle = this.color
        c.strokeStyle = this.color
        c.arc(this.xPixel+offset,this.yPixel+offset,playerSize,0,2*Math.PI)
        c.fill()
        c.stroke()
    }
    drawTarget(){
        c.fillRect(this.targetCell[0]*cellSize,this.targetCell[1]*cellSize,cellSize,cellSize)
    }
    updateDirection(){
        if(this.path.length>0){
            // console.log(this.currentCell)
            
            if(this.currentCell[0] == this.path[0].i && this.currentCell[1] == this.path[0].j){
                // console.log(this.pathDirection[0])
                this.dir[0] = this.pathDirection[0][0]
                this.dir[1] = this.pathDirection[0][1]
                this.path.shift()
                this.pathDirection.shift()
            }
        }
        
        
    }
    
    moveGhost(){
        this.updateDirection()
        this.xPixel += this.dir[0]*this.speed
        this.yPixel += this.dir[1]*this.speed
        
        if(this.xPixel%cellSize == 0 && this.yPixel%cellSize == 0){
            this.currentCell[0] = this.xPixel/cellSize
            this.currentCell[1] = this.yPixel/cellSize
        }

        // console.log(this.currentCell)
    }
}

