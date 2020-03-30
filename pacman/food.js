function food(i,j){ 
    this.i = i*cellSize
    this.j = j*cellSize
    this.status = "Not Eaten"
    this.size = 3
    this.superSize = 6
    
    this.show = function(){
        if(this.status == "Not Eaten"){
            c.fillStyle = "#FFFFFF"
            c.fillRect(this.i+offset,this.j+offset,this.size,this.size)
        }
        else if(this.status == "SuperFood"){
            c.beginPath()
            c.strokeStyle = "#FFFFFF"
            c.fillStyle = "#FFFFFF"
            c.arc(this.i+offset,this.j+offset,this.superSize,0,2*Math.PI)
            c.fill()
            c.stroke()
        }
    }
}



