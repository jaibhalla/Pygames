import pygame 
import random

width = 600
cubeSize = width//3
screen = pygame.display.set_mode([width,width])
screenColor = 0,0,0
color = 255,255,255

playerCounter = 1

mx, my = 0, 0

array = [[3,4,5],[6,7,8],[9,10,11]]

def grid():
    x = width/3
    for i in range(1,3):
        pygame.draw.line(screen,color,(x*i,0),(x*i,width))
        pygame.draw.line(screen,color,(0,x*i,),(width,x*i))

def draw():
    offset = cubeSize//2
    circleRadius = cubeSize//3
    crossOffset = offset - circleRadius
    for i in range(3):
        for j in range(3):
            if array[i][j] == 0: 
                pygame.draw.circle(screen,color,(j*cubeSize + offset,i*cubeSize + offset),circleRadius,1)
            if array[i][j] == 1: 
                pygame.draw.line(screen,color,(j*cubeSize + crossOffset,i*cubeSize + crossOffset),(((j+1)*cubeSize - crossOffset,(i+1)*cubeSize - crossOffset)))  
                pygame.draw.line(screen,color,(j*cubeSize + crossOffset,(i+1)*cubeSize - crossOffset),(((j+1)*cubeSize - crossOffset,i*cubeSize + crossOffset)))    

def check(array):
    tieFlag = 0
    for i in range(3):
        if array[i][0] == array[i][1] and array[i][1] == array[i][2]:
            return array[i][0]
        elif array[0][i] == array[1][i] and array[1][i] == array[2][i]:
            return array[0][i]
        elif array[0][0] == array[1][1] and array[1][1] == array[2][2]:
            return array[1][1]
        elif array[0][2] == array[1][1] and array[1][1] == array[2][0]:
            return array[1][1]
        else: 
            for j in range(3):
                if array[i][j] <2: 
                    tieFlag +=1
        if tieFlag == 9: 
            return 2 
    
def updateArray():
    global playerCounter
    for i in range(3):
        for j in range(3):
            if mx>j*cubeSize and mx<(j+1)*cubeSize and my>i*cubeSize and my<(i+1)*cubeSize:
                array[i][j] = playerCounter                  

counter = 0 
def printWinner(a):
    global counter
    if a == None:
        pass
    elif a == 2: 
        if counter == 0: 
            print("It is a tie")
            counter = 1 
    else:
        if a < 2:
            if counter == 0: 
                print("X is the Winner" if a==1 else "0 is the Winner")
                counter = 1
        else:
            pass    

def loop():
    screen.fill(screenColor)
    grid()
    draw()
    a = check(array) 
    printWinner(a)
    pygame.display.flip()


def AITurn():
    global array, playerCounter
    bestScore = -500
    for i in range(3):
        for j in range(3): 
            if array[i][j] > 1:
                array[i][j] = 1
                score = minimax(array, False)
                array[i][j] = 10
                if(score>bestScore):
                    bestScore = score
                    bestMovePosition = [i,j]
    array[bestMovePosition[0]][bestMovePosition[1]] = 1

def minimax(array, isMaximizing):
    winner = check(array)
    if winner == 1: 
        return 1
    elif winner == 0: 
        return -1 
    elif winner == 2: 
        return 0 
    elif winner == None: 
        pass
    
    if isMaximizing == True:
        bestScore = -500
        for i in range(3):
            for j in range(3): 
                if array[i][j] > 1:
                    array[i][j] = 1
                    score = minimax(array, False)
                    array[i][j] = 10
                    if(score>bestScore):
                        bestScore = score
        return bestScore
    
    elif isMaximizing == False: 
        bestScore = 500
        for i in range(3):
            for j in range(3): 
                if array[i][j] > 1:
                    array[i][j] = 0
                    score = minimax(array, True)
                    array[i][j] = 10
                    if(score<bestScore):
                        bestScore = score  
        return bestScore

def main():
    loopChecker = True 
    global mx,my, playerCounter
    if playerCounter == 1:
        AITurn()
    while loopChecker:
        for event in pygame.event.get():
            if event.type == pygame.QUIT: 
                loopChecker = False      
            if event.type == pygame.MOUSEBUTTONDOWN:
                mx,my = pygame.mouse.get_pos()
                playerCounter = 0
                updateArray()
                AITurn()
            loop()
main()
