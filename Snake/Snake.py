import pygame 
import random 
pygame.init()

width = 800
height = 600
screenColor = 255, 255, 255
snakeColor = (0, 128, 255)
foodColor = (255, 51, 51)
black = (0,0,0)
cubeSize = 20 
FPS = 20
screen = pygame.display.set_mode([width,height])
score = 0 


def showScore():
    scoreMessage = "Score: " + str(score)
    writeToScreen(scoreMessage,15,black,(width-50, height-20))

def writeToScreen(text,fsize,color,tpos):
    font = pygame.font.SysFont("Helvetica",fsize)
    text = font.render(text,True, color)
    finposition = text.get_rect(center = (tpos))
    screen.blit(text,finposition)

class snake: 
    dx = 1 
    dy = 0 
    new = []
   
    def __init__(self):
        self.body = [[random.randrange(0,(width-cubeSize),cubeSize),random.randrange(0,(height-cubeSize),cubeSize)]] 
    def move(self):
        for i in range(len(s.body)):
            pygame.draw.rect(screen,snakeColor,(self.body[i][0],self.body[i][1],cubeSize,cubeSize))
        
        pressed = pygame.key.get_pressed()

        if pressed[pygame.K_RIGHT] and self.dx != -1:
            self.dx = 1
            self.dy = 0 
        elif pressed[pygame.K_LEFT]and self.dx != 1:
            self.dx = -1
            self.dy = 0 
        elif pressed[pygame.K_UP] and self.dy != 1:
            self.dx = 0
            self.dy = -1
        elif pressed[pygame.K_DOWN] and self.dy != -1:
            self.dx = 0
            self.dy = 1
        
        for i in range(len(s.body)-1,0,-1):
            self.body[i][0] = self.body[i-1][0]
            self.body[i][1] = self.body[i-1][1]
        
        self.body[0][0] += self.dx*cubeSize
        self.body[0][1] += self.dy*cubeSize

    def grow(self):
        if self.dx == 1:
            self.new = [self.body[0][0]-cubeSize,self.body[0][1]]
        elif self.dx == -1:
            self.new = [self.body[0][0]+cubeSize,self.body[0][1]]
        elif self.dy == 1:
            self.new = [self.body[0][0],self.body[0][1]+cubeSize]
        elif self.dy == -1:
            self.new = [self.body[0][0],self.body[0][1]-cubeSize]
        self.body.append(self.new)

class food:
    def __init__(self):
        self.x = random.randrange(0,(width-cubeSize),cubeSize)
        self.y = random.randrange(0,(height-cubeSize),cubeSize)
    
    def draw(self):
        pygame.draw.rect(screen,foodColor,(self.x,self.y,cubeSize,cubeSize))
        if s.body[0][0] == self.x and s.body[0][1] == self.y:
            self.x = random.randrange(0,(width-cubeSize),cubeSize)
            self.y = random.randrange(0,(height-cubeSize),cubeSize)
            s.grow()
            global score 
            score += 1

def gameOver():
    if s.body[0][0] < -cubeSize or s.body[0][1] < -cubeSize or s.body[0][0] > width or s.body[0][1] > height:
        pygame.quit()
        exit()

    for i in range(1,len(s.body)):
        if s.body[0][0] == s.body[i][0] and s.body[0][1] == s.body[i][1]:
            pygame.quit()
            exit()

def drawGrid():
    for i in range(cubeSize,width+cubeSize,cubeSize):
        pygame.draw.line(screen, screenColor,(i,0),(i,height))
    
    for i in range(cubeSize,height+cubeSize,cubeSize):
        pygame.draw.line(screen, screenColor,(0,i),(width,i))

def loop():
        screen.fill(screenColor)
        f.draw()
        s.move()
        drawGrid()
        gameOver()
        showScore()
        pygame.display.flip()

def main():
    global s,f
    s = snake()
    f = food()
    loopChecker = True 
    clock = pygame.time.Clock()
    while loopChecker:
        for event in pygame.event.get():
            if event.type == pygame.QUIT: loopChecker = False         
        loop()
        clock.tick(FPS)
main()