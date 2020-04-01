class ghost{
    constructor(personality){
        switch(personality){
            case "pinky": 
                this.currentCell = [1,1] 
                this.color = "#FFB8FF"
                this.dir = [1,0]
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
        this.path = []
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
}

