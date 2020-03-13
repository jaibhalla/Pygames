import pygame
import random 
pygame.init()

gridSize = 700
tileSize = 700//4
fontPos = tileSize//2

gridColor = 187,173,160
backgroundColor = 205,193,180
tileColor2 = 238,228,218
tileColor4 = 237,224,200
tileColor8 = 242,177,121
tileColor16 = 245,149,99
tileColor32 = 246,124,95
tileColor64 = 246,94,59
tileColor128 = 237,207,114
tileColor256 = 237,204,97
tileColor512 = 237,200,80
tileColor1024 = 237,197, 63
tileColor2048 = 237,194,46

textColor1 = 119,110,101
textColor2 = 249,246,241

screen = pygame.display.set_mode([gridSize,gridSize])
board = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]

counter = 0

def writeToScreen(text,fsize,color,tpos):
    font = pygame.font.SysFont("Helvetica Neue",fsize)
    text = font.render(text,True, color)
    finposition = text.get_rect(center = (tpos))
    screen.blit(text,finposition)       

def drawGrid():
    for i in range(2, 700, 174):
        pygame.draw.line(screen, gridColor,(i,0),(i,gridSize),7)
        pygame.draw.line(screen, gridColor,(0,i),(gridSize,i),7)

def drawTile(number, j, i):
    if number == 0: 
        pygame.draw.rect(screen,backgroundColor,(j*175,i*175,tileSize,tileSize))
    elif number == 2: 
        pygame.draw.rect(screen, tileColor2,(j*175,i*175,tileSize,tileSize))
        writeToScreen("2",80,textColor1,(j*175 + fontPos, i*175 + fontPos))
    elif number == 4: 
        pygame.draw.rect(screen, tileColor4,(j*175,i*175,tileSize,tileSize))
        writeToScreen("4",80,textColor1,(j*175 + fontPos, i*175 + fontPos))
    elif number == 8: 
        pygame.draw.rect(screen, tileColor8,(j*175,i*175,tileSize,tileSize))
        writeToScreen("8",80,textColor1,(j*175 + fontPos, i*175 + fontPos))
    elif number == 16: 
        pygame.draw.rect(screen, tileColor16,(j*175,i*175,tileSize,tileSize))
        writeToScreen("16",80,textColor1,(j*175 + fontPos, i*175 + fontPos))
    elif number == 32: 
        pygame.draw.rect(screen, tileColor32,(j*175,i*175,tileSize,tileSize))
        writeToScreen("32",80,textColor1,(j*175 + fontPos, i*175 + fontPos))
    elif number == 64: 
        pygame.draw.rect(screen, tileColor64,(j*175,i*175,tileSize,tileSize))
        writeToScreen("64",80,textColor1,(j*175 + fontPos, i*175 + fontPos))
    elif number == 128: 
        pygame.draw.rect(screen, tileColor128,(j*175,i*175,tileSize,tileSize))
        writeToScreen("128",80,textColor2,(j*175 + fontPos, i*175 + fontPos))
    elif number == 256: 
        pygame.draw.rect(screen, tileColor256,(j*175,i*175,tileSize,tileSize))
        writeToScreen("256",80,textColor2,(j*175 + fontPos, i*175 + fontPos))
    elif number == 512: 
        pygame.draw.rect(screen, tileColor512,(j*175,i*175,tileSize,tileSize))
        writeToScreen("512",80,textColor2,(j*175 + fontPos, i*175 + fontPos))
    elif number == 1024: 
        pygame.draw.rect(screen, tileColor1024,(j*175,i*175,tileSize,tileSize))
        writeToScreen("1024",60,textColor2,(j*175 + fontPos, i*175 + fontPos))
    elif number == 2048: 
        pygame.draw.rect(screen, tileColor2048,(j*175,i*175,tileSize,tileSize))
        writeToScreen("2048",60,textColor2,(j*175 + fontPos, i*175 + fontPos))

 

def addNum():
    global board
    options = []
    for i in range(4):
        for j in range(4):
            if board[i][j] == 0:
                options.append([i,j])
    try: 
        newTile = random.choice(options)
        if random.uniform(0,1)<0.9:
            board[newTile[0]][newTile[1]] = 2
        else: 
            board[newTile[0]][newTile[1]] = 4
    except IndexError:
        print("You Lost")
        pygame.quit()
        exit()



    
def move(direction):   
    if direction == "right":
        for i in range(4):
            for j in range(2,-1,-1):
                if board[i][j] == board[i][j+1]:
                    board[i][j+1] += board[i][j+1]
                    board[i][j] = 0 
                if board[i][j] != 0: 
                    for k in range(1,4-j):
                        if board[i][-k] == 0:
                            board[i][-k] = board[i][j]
                            board[i][j] = 0
                            if board[i][-k] == board[i][-k+1]:
                                board[i][-k+1] += board[i][-k+1]
                                board[i][-k] = 0 

    elif direction == "left":
        for i in range(4):
            for j in range(1,4):
                if board[i][j] == board[i][j-1]:
                    board[i][j-1] += board[i][j-1]
                    board[i][j] = 0 
                if board[i][j] != 0: 
                    for k in range(0,j):
                        if board[i][k] == 0:
                            board[i][k] = board[i][j]
                            board[i][j] = 0
                            if board[i][k] == board[i][k-1]:
                                board[i][k-1] += board[i][k-1]
                                board[i][k] = 0 
   
    elif direction == "up":
        for i in range(4):
            for j in range(1,4):
                if board[j][i] == board[j-1][i]:
                    board[j-1][i] += board[j-1][i] 
                    board[j][i] = 0 
                if board[j][i] != 0: 
                    for k in range(0,j):
                        if board[k][i] == 0:
                            board[k][i] = board[j][i]
                            board[j][i] = 0
                            if board[k][i] == board[k-1][i]:
                                board[k-1][i] += board[k-1][i] 
                                board[k][i] = 0 
    
    elif direction == "down":
        for i in range(4):
            for j in range(2,-1,-1):
                if board[j][i] == board[j+1][i]:
                    board[j+1][i] += board[j+1][i] 
                    board[j][i] = 0 
                if board[j][i] != 0: 
                    for k in range(1,4-j):
                        if board[-k][i] == 0:
                            board[-k][i] = board[j][i]
                            board[j][i] = 0
                            if board[-k][i] == board[-k+1][i]:
                                board[-k+1][i] += board[-k+1][i] 
                                board[-k][i] = 0


def play():
    global counter
    for i in range(4):
        for j in range(4):
            drawTile(board[i][j],j,i)     
    
    if counter == 0: 
        addNum()
        addNum()
        counter +=1
    else:
        pressed = pygame.key.get_pressed()  
        if pressed[pygame.K_RIGHT]:
            move("right")
            addNum()
        elif pressed[pygame.K_LEFT]:
            move("left")
            addNum()
        elif pressed[pygame.K_UP]:
            move("up")
            addNum()
        elif pressed[pygame.K_DOWN]:
            move("down") 
            addNum()
       
            

def loop():
    screen.fill(backgroundColor)
    play()
    drawGrid()
    pygame.display.flip()



def main():
    loopChecker = True 
    while loopChecker:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                loopChecker = False 
            loop()

main()
