//Node constructor
function node(i,j,real){
    this.i = i
    this.j = j 
    this.real = real 
    
    this.nextNodes = []
    this.nextNodesDistance = [] 
    this.visited = false 

    this.sourceDistance = Infinity
    this.targetDistance = Infinity
    this.totalDistance = Infinity
    this.parent = []

    this.draw = function(value){
        if(value == "showNodes"){
            if(this.real == true){
                c.fillStyle = "#FFFFFF"
                c.fillRect(this.i*cellSize,this.j*cellSize,cellSize,cellSize)
            }

            for(k = 0; k < this.nextNodes.length; k++){
                drawLine(this.i + 0.5,this.j + 0.5,this.nextNodes[k].i + 0.5,this.nextNodes[k].j + 0.5,"#FFFFFF" )
            }
        }
        else if(value == "showPinkyPath"){
            c.beginPath()
            for(k=-1;k<pinky.path.length-1;k++){
                c.lineWidth = 3
                c.strokeStyle = pinky.color
                if(k==-1){
                    c.moveTo(pinky.xPixel+offset,pinky.yPixel+offset)
                    c.lineTo(pinky.path[0].i*cellSize+offset,pinky.path[0].j*cellSize+offset)
                }
                else{
                    c.moveTo(pinky.path[k].i*cellSize+offset,pinky.path[k].j*cellSize+offset)
                    c.lineTo(pinky.path[k+1].i*cellSize+offset,pinky.path[k+1].j*cellSize+offset)
                }
                
            }
            c.stroke()
            c.lineWidth = 1
        }
        else if(value == "none"){} //empty block is the same as pass in python
    }
}

//Placing "real" nodes in cells where direction can change. 
function addNodes(){
    for(i = 0; i<=rows;i++){
        for(j = 0; j<=cols; j++){
            if(grid[convert(i,j)].type == "path" && checkChangeDirection(i,j)){
                nodes[convert(i,j)].real = true  //Node Exists 
            }
        }
    }
    
}



//Function return True if cell allows for a change in direction 
function checkChangeDirection(i,j){
    if(grid[convert(i-1,j)].type  == "path" && grid[convert(i+1,j)].type  == "path" && grid[convert(i,j-1)].type  == "wall" && grid[convert(i,j+1)].type  == "wall" ){
        return false
    }
    else if(grid[convert(i,j-1)].type  == "path" && grid[convert(i,j+1)].type  == "path" && grid[convert(i-1,j)].type  == "wall" && grid[convert(i+1,j)].type  == "wall"){
        return false
    }
    else{
        return true
    }
}


function addEdges(){
    for(j= 0; j<rows;j++){
        for(i = 0; i<cols; i++){ 
            if(grid[convert(i,j)].type == "path" && nodes[convert(i,j)].real == true ){ // Dont look at walls, or when nodes don't exist 
                if(grid[convert(i+1,j)].type == "path"){//If the next cell is "path" type, node will exist in that direction at one point
                    nodes[convert(i,j)].nextNodes.push(findEdge(i,j,1,0)) //right
                    // console.log([i,j] + " Right is Path") 
                    }
                if(grid[convert(i,j+1)].type == "path"){ //down
                    nodes[convert(i,j)].nextNodes.push(findEdge(i,j,0,1)) 
                    // console.log([i,j] + " down is Path") 
                }
                if(grid[convert(i-1,j)].type == "path"){ //left
                    nodes[convert(i,j)].nextNodes.push(findEdge(i,j,-1,0)) 
                    // console.log([i,j] + " left is Path") 
                }
                if(grid[convert(i,j-1)].type == "path"){ //up
                    nodes[convert(i,j)].nextNodes.push(findEdge(i,j,0,-1))
                    // console.log(i + j + " up is Path") 
                }
            }
        }
    }

 
    
}

function findEdge(i,j,xincrement,yincrement){
    while(nodes[convert(i+xincrement,j+yincrement)].real == false){
        if(xincrement !=0){
            if(xincrement > 0){
                xincrement++
            }
            if((xincrement < 0)){
                xincrement--
            } 
        }
        if(yincrement !=0){
            if(yincrement > 0){
                yincrement++
            }
            if((yincrement < 0)){
                yincrement--
            } 
        }
    }

    if(xincrement != 0){
        nodes[convert(i,j)].nextNodesDistance.push(Math.abs(xincrement))
    }
    else if((yincrement != 0)){
        nodes[convert(i,j)].nextNodesDistance.push(Math.abs(yincrement))
    } 

    return nodes[convert(i+xincrement,j+yincrement)]

}




