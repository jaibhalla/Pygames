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
            c.lineWidth = 3
            c.strokeStyle = pinky.color
            c.moveTo(pinky.xPixel+offset,pinky.yPixel+offset)
            for(k=0;k<pinky.path.length;k++){
                c.lineTo(pinky.path[k].i*cellSize+offset,pinky.path[k].j*cellSize+offset)
            }
            c.stroke()
            c.lineWidth = 1
        }
        else if(value == "showBlinkyPath"){
            c.beginPath()
            c.lineWidth = 3
            c.strokeStyle = blinky.color
            c.moveTo(blinky.xPixel+offset,blinky.yPixel+offset)
            for(k=0;k<blinky.path.length;k++){
                c.lineTo(blinky.path[k].i*cellSize+offset,blinky.path[k].j*cellSize+offset)
            }
            c.stroke()
            c.lineWidth = 1
        }
        else if(value == "showInkyPath"){
            c.beginPath()
            c.lineWidth = 3
            c.strokeStyle = inky.color
            c.moveTo(inky.xPixel+offset,inky.yPixel+offset)
            for(k=0;k<inky.path.length;k++){
                c.lineTo(inky.path[k].i*cellSize+offset,inky.path[k].j*cellSize+offset)
            }
            c.stroke()
            c.lineWidth = 1
        }
        else if(value == "showClydePath"){
            c.beginPath()
            c.lineWidth = 3
            c.strokeStyle = clyde.color
            c.moveTo(clyde.xPixel+offset,clyde.yPixel+offset)
            for(k=0;k<clyde.path.length;k++){
                c.lineTo(clyde.path[k].i*cellSize+offset,clyde.path[k].j*cellSize+offset)
            }
            c.stroke()
            c.lineWidth = 1
        }
        else if(value == "none"){} //empty block is the same as pass in python
    }
}

//Placing "real" nodes in cells where direction can change. 
// function addNodes(){
//     for(i = 0; i<=rows;i++){
//         for(j = 0; j<=cols; j++){
//             if(grid[convert(i,j)].type == "path" && checkChangeDirection(i,j)){
//                 nodes[convert(i,j)].real = true  //Node Exists 
//             }
//         }
//     }
//     nodes[convert(14,11)].real = true
// }

function addNodes(){ //Adding nodes to all cells that are paths
    for(i = 0; i<=rows;i++){
        for(j = 0; j<=cols; j++){
            if(grid[convert(i,j)].type == "path"){
                nodes[convert(i,j)].real = true  //Node Exists 
            }
        }
    }
    nodes[convert(14,12)].real = true
    
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
    nodes[convert(14,11)].nextNodes.push(nodes[convert(14,12)])
    nodes[convert(14,11)].nextNodesDistance.push(1)

    nodes[convert(14,12)].nextNodes.push(nodes[convert(14,11)])
    nodes[convert(14,12)].nextNodesDistance.push(1)
    
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




