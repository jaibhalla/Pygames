//Creating Grid 
for(i=0; i<rows;i++){
    for(j=0; j<cols;j++){
        grid.push(new cell(j,i)) //2D array of all cells 
        nodes.push(new node(j,i, false)) //2D array of "Fake Nodes". Nodes used for A* Path Finiding.
    }
}

cellType()
design()
mirror()

addNodes()
addEdges()


//Cell Constructor 
function cell(i,j){
    this.i = i
    this.j = j 
    this.wall = [false,false,false,false] //Top, Right, Bottom, Left
    this.type = "path"
    this.cellFood = new food(this.i,this.j) //Each cell contains food. Even Walls 
    this.draw = function(){
        if(this.wall[0]){
            drawLine(i,j,i+1,j,"#2121DE")
        }
        if(this.wall[1]){
            drawLine(i+1,j,i+1,j+1,"#2121DE")
        }
        if(this.wall[2]){
            drawLine(i,j+1,i+1,j+1,"#2121DE")
        }
        if(this.wall[3]){
            drawLine(i,j,i,j+1,"#2121DE")
        }
        
    }
    this.color = function(){
        if(this.type == "wall"){
            c.fillStyle = "#2121DE" //Blue if wall
            c.fillRect(i*cellSize,j*cellSize, cellSize,cellSize)

        }

    }
}

//Function for Drawing a Line
function drawLine(startx,starty,endx,endy,color){
    startx *= cellSize
    starty *= cellSize
    endx *= cellSize
    endy *= cellSize
    c.beginPath()
    c.lineWidth = 0
    c.strokeStyle = color
    c.moveTo(startx,starty)
    c.lineTo(endx,endy)
    c.stroke()
}
//Defining the cell type to wall if needed  
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

//Adding Blue lines. Food and Superfood placement - Only paths should have food
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

//Flipping design and wall type across vertical center. Flipping left to right
function mirror(){
    for(i=0;i<cols-1;i++){  //cols -1 is used because the vertical center axis lies on a cell 
        for(j=0;j<rows;j++){
            grid[convert(28-i,j)].wall[0] = grid[convert(i,j)].wall[0]
            grid[convert(28-i,j)].wall[2] = grid[convert(i,j)].wall[2]
            grid[convert(28-i,j)].wall[1] = grid[convert(i,j)].wall[3]
            grid[convert(28-i,j)].wall[3] = grid[convert(i,j)].wall[1]
            
            grid[convert(28-i,j)].type = grid[convert(i,j)].type
        }
    } 
}



