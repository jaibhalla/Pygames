import pygame 
import random

width = 600
cubeSize = width//3
screen = pygame.display.set_mode([width,width])
screenColor = 0,0,0
color = 255,255,255
playerCounter = random.randrange(0,2)

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

def winner(a):
    global counter
    if a == 0:
        if counter == 0:
            print("0 is the Winner")
            counter = 1 
    else: 
        if counter == 0:
            print("X is the Winner")
            counter = 1 

def check():
    for i in range(3):
        if array[i][0] == array[i][1] and array[i][1] == array[i][2]:
            winner(array[i][0])
        elif array[0][i] == array[1][i] and array[1][i] == array[2][i]:
            winner(array[0][i])
        elif array[0][0] == array[1][1] and array[1][1] == array[2][2]:
            winner(array[1][1])
        elif array[0][2] == array[1][1] and array[1][1] == array[2][0]:
            winner(array[1][1])

def updateArray():
    global playerCounter
    for i in range(3):
        for j in range(3):
            if mx>j*cubeSize and mx<(j+1)*cubeSize and my>i*cubeSize and my<(i+1)*cubeSize:
                array[i][j] = playerCounter      
                 
def loop():
    screen.fill(screenColor)
    grid()
    draw()
    check()  
    pygame.display.flip()

def main():
    loopChecker = True 
    global mx,my, playerCounter
    while loopChecker:
        for event in pygame.event.get():
            if event.type == pygame.QUIT: 
                loopChecker = False      
            if event.type == pygame.MOUSEBUTTONDOWN:
                mx,my = pygame.mouse.get_pos()
                if playerCounter == 0:
                    playerCounter = 1
                else:
                     playerCounter = 0   
                updateArray()
            loop()
main()
