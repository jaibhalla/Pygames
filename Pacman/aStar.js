pinky.path = aStar(nodes[convert(1,1)],nodes[convert(pinky.targetCell[0],pinky.targetCell[1])])

function aStar(sourceNode,targetNode){ //Pass Nodes to function 
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
    
        while(temp != sourceNode){
            path.unshift(temp) //Added to begining of array
            temp = temp.parent[0]
        }
        return path
    }
    
    function distanceToTarget(currentNode,targetNode){ //Pythagoras Theorem. Returning the distance * 10 - rounded to integer. 
        let iDistance = targetNode.i - currentNode.i  // a
        let jDistance = targetNode.j - currentNode.j // b
        let total = Math.pow(iDistance,2) + Math.pow(jDistance,2) //c2 = a2 + b2

        return Math.round(Math.sqrt(total)) 
    }
}


