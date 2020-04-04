class ghost{
    constructor(personality,i,j){
        switch(personality){
            case "pinky": 
                this.color = "#FFB8FF"
                //For Scatter Mode
                this.corner1 = [1,1]
                this.corner2 = [6,1]
                this.corner3 = [6,5]
                this.corner4 = [1,5]
                break

            case "blinky":   
                this.color = "#FF0000" 
                //For Scatter Mode 
                this.corner1 = [27,1]
                this.corner2 = [22,1]
                this.corner3 = [22,5]
                this.corner4 = [27,5]
                break
            
            case "clyde":  
                this.color = "#FFB852"
                //For Scatter Mode
                this.corner1 = [1,29]
                this.corner2 = [12,26]
                this.corner3 = [6,23]
                this.corner4 = [1,26]
                break
            
            case "inky": 
                this.color = "#00FFFF"
                //For Scatter Mode
                this.corner1 = [27,29]
                this.corner2 = [16,26]
                this.corner3 = [22,23]
                this.corner4 = [27,26]
                break

            }
        
        this.currentCell = [i,j]
        this.dir = [0,0]
        this.xPixel = this.currentCell[0]*cellSize 
        this.yPixel = this.currentCell[1]*cellSize 
        this.speed = 1.25// Has to be a multiple of cellSize  
        this.mode = "Scared" // Chase, Scared, Scatter, Eaten, Stationary 
        this.path = []
        this.nodeToTest = []
        this.inCorner = false 
        this.homePoint = [14,12]
        this.isStarting = false 
        this.seconds1 = 0
        this.seconds2 = 0
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
            if(this.currentCell[0] == this.path[0].i && this.currentCell[1] == this.path[0].j){
                if(this.path.length>1){
                    this.path.shift()
                }
            }
            if(this.path[0].i == this.currentCell[0]){
                if(this.path[0].j > this.currentCell[1]){
                    this.dir[0] = 0
                    this.dir[1] = 1 
                }
                else{
                    this.dir[0] = 0
                    this.dir[1] = -1
                }
            }
            else if(this.currentCell[1] == this.path[0].j){
                if(this.path[0].i > this.currentCell[0]){
                    this.dir[0] = 1
                    this.dir[1] = 0
                }
                else{
                    this.dir[0] = -1
                    this.dir[1] = 0
                }
            }            
        }
             
    }
    moveGhost(){
        this.tempDir = [this.dir[0],this.dir[1]]
        this.updateDirection()

        if(this.tempDir[0] == this.dir[0] && this.tempDir[1] == this.dir[1]){
            this.xPixel += this.dir[0]*this.speed
            this.yPixel += this.dir[1]*this.speed
        }
        else{
            this.xPixel = (this.currentCell[0]*cellSize) + (this.dir[0]*this.speed)
            this.yPixel = (this.currentCell[1]*cellSize) + (this.dir[1]*this.speed)
        }

    
        if(this.xPixel%cellSize == 0 && this.yPixel%cellSize == 0){
            this.currentCell[0] = this.xPixel/cellSize
            this.currentCell[1] = this.yPixel/cellSize
        }
    }

    scatterMode(){
        if(this.inCorner == false){
            this.path = findPath(this.currentCell,this.corner1)
            if(this.currentCell[0] == this.corner1[0] && this.currentCell[1] == this.corner1[1]){
                this.inCorner = true
            }
        }
        else{
            if(this.currentCell[0] == this.corner1[0] && this.currentCell[1] == this.corner1[1]){
                this.path = findPath(this.currentCell,this.corner4)
            }
            else if(this.currentCell[0] == this.corner2[0] && this.currentCell[1] == this.corner2[1]){
                this.path = findPath(this.currentCell,this.corner1)
            }
            else if(this.currentCell[0] == this.corner3[0] && this.currentCell[1] == this.corner3[1]){
                this.path = findPath(this.currentCell,this.corner2)
            }
            else if(this.currentCell[0] == this.corner4[0] && this.currentCell[1] == this.corner4[1]){
                this.path = findPath(this.currentCell,this.corner3)
            }
        }
    }
    scaredMode(){
        if(this.seconds2<4){
            this.color = "#1919A6"
        }
        else{
            if((Math.round(this.seconds2) - this.seconds2)>0){
                this.color = "#FFFFFF"
            }
            else{
                this.color = "#1919A6"
            }
        }

        if(this.path.length<2){
            let randomCell = [randomInteger(0,27),randomInteger(0,29)]
            while(nodes[convert(randomCell[0],randomCell[1])].real == false){
                randomCell = [randomInteger(0,27),randomInteger(0,29)]
            }
            this.path = findPath(this.currentCell,randomCell)
        } 
    }
    eatenMode(){
        if(this.seconds2<4){
            this.color = "#555555"
        }
        else{
            if((Math.round(this.seconds2) - this.seconds2)>0){
                this.color = "#FFFFFF"
            }
            else{
                this.color = "#555555"
            }
        }
        if(this.currentCell[0] == this.homePoint[0] && this.currentCell[1] == this.homePoint[1]){
            superFoodCounter = true
            this.mode = "Scared"
        }
        else{
            this.path = findPath(this.currentCell,this.homePoint)
        }        
    }
    stopMode(){
        blinky.path = []
        pinky.path = []
        inky.path = []
        clyde.path = []

        blinky.dir = [0,0]
        pinky.dir = [0,0]
        inky.dir = [0,0]
        clyde.dir = [0,0]
        pacman.dir = [0,0]
    }
    restartMode(){
        this.color = "#FFFFFF"
        if(this.currentCell[0] == this.homePoint[0] && this.currentCell[1] == this.homePoint[1]){
            this.path = [] 
            this.dir = [0,0]
            activeCollision = false
        }
        else{
            this.path = findPath(this.currentCell,this.homePoint)
        }  
    }
    collide(){
        if(this.currentCell[0] == pacman.currentCell[0] && this.currentCell[1] == pacman.currentCell[1]){
            if(this.mode == "Scared" || this.mode == "Eaten"){
                this.mode = "Eaten"
            }
            else if (this.mode != "Restart"){ // If pacman is eaten when ghosts are in chase/scatter mode = every objects stop moving
                activeCollision = true
                
                if(pacman.lives == 3){
                    pacman.lives = 2

                    blinky.mode = "Restart"
                    pinky.mode = "Restart"
                    inky.mode = "Restart"
                    clyde.mode = "Restart"
                }

                else if(pacman.lives == 2){
                    pacman.lives = 1

                    blinky.mode = "Restart"
                    pinky.mode = "Restart"
                    inky.mode = "Restart"
                    clyde.mode = "Restart"
                }
                else if(pacman.lives == 1){
                    pacman.lives = 0

                    blinky.mode = "Restart"
                    pinky.mode = "Restart"
                    inky.mode = "Restart"
                    clyde.mode = "Restart"
                }
                else{
                    blinky.mode = "Stop"
                    pinky.mode = "Stop"
                    inky.mode = "Stop"
                    clyde.mode = "Stop"
                }
                
            }
            
        } 
 
    }

    timing(state){
        if(state){//Chase and Scatter Config - According to Pac-Man Spec
            this.seconds2 = 0
            this.seconds1 += 1/60
            if(this.seconds1>0 && this.seconds1<20){
                this.mode = "Chase"
            }
            else if(this.seconds1>=20 && this.seconds1<27){
                this.mode = "Scatter"
            }
            else if(this.seconds1>=27 && this.seconds1<47){
                this.mode = "Chase"
            }
            else if(this.seconds1>=47 && this.seconds1<54){
                this.mode = "Scatter"
            }
            else if(this.seconds1>=54 && this.seconds1<74){
                this.mode = "Chase"
            }
            else if(this.seconds1>=74 && this.seconds1<87){
                this.mode = "Scatter"
            }
            else{
                this.mode = "Chase"
            }
        }

        else{//For Eaten or Scared 
            this.seconds2 += 1/60
            if(this.seconds2 > 9){
                superFoodCounter = false
                state = true
            }
        }
    }
}

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }


function findPath(startCell,endCell){ 
    let startNode 
    let endNode 

    startNode = nodes[convert(startCell[0], startCell[1])]
    endNode = nodes[convert(endCell[0], endCell[1])]

    return aStar(startNode,endNode)
}

function aStar(sourceNode,targetNode){ //Pass Nodes to function 
    resetNodes()
    let nodesToTest = []// Only add to array when visited = false  
    sourceNode.sourceDistance = 0
    sourceNode.targetDistance = distanceToTarget(sourceNode, targetNode)
    sourceNode.totalDistance = sourceNode.targetDistance

    nodesToTest.push(sourceNode)
    sourceNode.visited = true
    
    return check(nodesToTest[0])

    function check(currentNode){
        for(i=0;i < currentNode.nextNodes.length; i++){ //Placing all sourceNode's neighbors NodesToTest
            if(currentNode.nextNodes[i].visited == false){//Only non visted nodes are added to this array 
                nodesToTest.push(currentNode.nextNodes[i])
                currentNode.nextNodes[i].visited = true
            }
            
            //Checking if next nodes source distance is less with new route
            tempSourceDistance = currentNode.sourceDistance + currentNode.nextNodesDistance[i]  //Source Distance = Parents Source Distance + Distance from Parent to current node 
            if(tempSourceDistance < currentNode.nextNodes[i].sourceDistance){
                currentNode.nextNodes[i].parent[0] = currentNode //Place Parent
                currentNode.nextNodes[i].sourceDistance = tempSourceDistance 
            }
        
            //Checking if next nodes total distance is less with new route
            tempTotalDistance = currentNode.nextNodes[i].sourceDistance + distanceToTarget(currentNode.nextNodes[i],targetNode) //Total Distance = Source Distance of current node + distance to target node 
            if(tempTotalDistance < currentNode.nextNodes[i].totalDistance){
                currentNode.nextNodes[i].totalDistance = tempTotalDistance 
            }
    
        }
    
        nodesToTest.shift()

        for(i = 0; i<nodesToTest.length;i++){ //Remove target node as we don't want to check its connections
            if(nodesToTest[i] == targetNode.i){
                nodesToTest[i].splice(i,1) //At this index, remove 1 element only 
            }
        }
    
        nodesToTest = ascendingOrder(nodesToTest) 
        
        if(nodesToTest.length>0){
            return check(nodesToTest[0])
        }
        else{
            return finish()
        }
    }
    
    function ascendingOrder(array){ //According to totalDistance - Selection Sort 
        let minNodeIndex
        for(i = 0; i<array.length-1; i++){
            minNodeIndex = i 
            for(j = i+1; j<array.length; j++){
                if(array[j].totalDistance < array[minNodeIndex].totalDistance){
                    minNodeIndex = j
                }
            }
            let temp = array[minNodeIndex]
            array[minNodeIndex] = array[i]
            array[i] = temp
        }
        return array
    }
    
    function finish(){ 
        let temp = targetNode
        let path = []
        
        while(temp != sourceNode){//Find another way 
            path.unshift(temp) //Added to begining of array
            temp = temp.parent[0]
        }
        path.unshift(sourceNode) // Source Node added to the start of the list. // Used for drawing the line
        return path
    }
    
    function distanceToTarget(currentNode,targetNode){ //Pythagoras Theorem. Returning the distance * 10 - rounded to integer. 
        let iDistance = targetNode.i - currentNode.i  // a
        let jDistance = targetNode.j - currentNode.j // b
        let total = Math.pow(iDistance,2) + Math.pow(jDistance,2) //c2 = a2 + b2

        return Math.round(Math.sqrt(total)) 
    }
    function resetNodes(){ //For accurate calculations, every relavent Node should be changed to intital values
        for(j=0;j<rows;j++){
            for(i=0;i<cols;i++){
                nodes[convert(i,j)].visited = false 
                nodes[convert(i,j)].sourceDistance = Infinity
                nodes[convert(i,j)].targetDistance = Infinity
                nodes[convert(i,j)].totalDistance = Infinity
                nodes[convert(i,j)].parent = []
    
            }
        }
    }
    
}

