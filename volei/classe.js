    //Parte só as classes
    class vetor2D {
    x = 2;
    y = 1;
    constructor() {
        this.x;
        this.y;
    }

}
class objeto {
    position = new vetor2D(); //para criar  o Array
    velocity = new vetor2D();
    accel = new vetor2D();
    size = new vetor2D();
    constructor() {
        this.position = { x: 0, y: 0 };
        this.velocity = { x: 0, y: 0 };
        this.accel = { x: 0, y: 0.1 };
        this.size = { x: 20, y: 20 };;
    }
    update() {
        var ax = this.accel.x;
        var ay = this.accel.y;
        this.velocity.x += ax;
        this.velocity.y += ay;
        var vx = this.velocity.x;
        var vy = this.velocity.y;
        this.position.x += vx;
        this.position.y += vy;
    }
    draw() {
        var px = this.position.x;
        var py = this.position.y;
        var sx = this.size.x;
        var sy = this.size.y;
        ctx.fillRect(px, py, sx, sy);
    }
    collidesWith(objeto2) {
        var objeto1Esquerda = this.position.x;
        var objeto1Direita = this.position.x + this.size.x;
        var objeto2Esquerda = objeto2.position.x;
        var objeto2Direita = objeto2.position.x + objeto2.size.x;
        var objeto1Topo = this.position.y;
        var objeto1Base = this.position.y + this.size.y;
        var objeto2Topo = objeto2.position.y;
        var objeto2Base = objeto2.position.y + objeto2.size.y;
        if (objeto1Direita > objeto2Esquerda && objeto1Esquerda < objeto2Direita &&
            objeto1Topo < objeto2Base && objeto1Base > objeto2Topo) {
            return true;
        }
    }
}

class Bola extends objeto {
    constructor(px, py) {
        super();
        this.position = { x: px, y: py };
        this.size = { x: 10, y: 10 };
        this.velocity = { x: -2, y:0};
    }
    update(player) {
        var ax = this.accel.x;
        var ay = this.accel.y;
        this.velocity.x += ax;
        this.velocity.y += ay;
        var vx = this.velocity.x;
        var vy = this.velocity.y;
        this.position.x += vx;
        this.position.y += vy;
        this.bolaChao();
        this.colidiuParede();
        this.corteBola(player1, player2);
        this.colidiuPlayer(player1 , player2);
        
    }
    junto(player){
        this.update(player);
        this.draw();
    }
    colidiuParede() {//certo
        if(this.position.x <= 0){
            this.position.x =0;
            this.velocity.x = this.velocity.x * -1;
        }
        if(this.position.x >= 310){
            this.position.x =310;
            this.velocity.x = this.velocity.x * -1;
        }
    }
    colidiuChao(){//teste para vê se a bola tava funcionado quando pegava no chão
        if (this.position.y >= 230){
        this.position.y = 230;
        this.velocity.y = this.velocity.y * -1;
        //this.velocity.y += this.accel.y * -1;
        }
        
    }
    posicaoInicial(v) {//certo
        this.position.x = 155;
        this.position.y = 70;
        this.velocity.x = 0;
        this.velocity.y = 0;
        this.velocity.x = v;
    }
    bolaChao() {
        if (this.position.y >= 230 && this.position.x <= 159) {
            this.posicaoInicial( 2);
            this.velocity.x = this.velocity.x * 1;
            console.log("Ponto Time 2");
            pontosTime2();
        }
        else if (this.position.y >= 230 && this.position.x >= 160) {
            this.posicaoInicial(-2);
            this.velocity.x = this.velocity.x * -1;
            console.log("Ponto Time 1");
            pontosTime1();
        }
    }
    colidiuPlayer(player1 , player2) {
        if(this.collidesWith(player1)){
            this.position.y = player1.position.y - (this.size.y + 3);
            this.velocity.y = this.velocity.y * -1;
        }
        if(this.collidesWith(player2)){
            this.position.y = player2.position.y - (this.size.y + 3);
            this.velocity.y = this.velocity.y * -1;
        }
        }
    corteBola(player1 , player2) {
        if(this.collidesWith(player1) && player1.position.y <=219 || this.collidesWith(player2) && player2.position.y <=219){
        this.velocity.x = this.velocity.x * -1;   
        }
        
    }

}

class player extends objeto {
    constructor(px, py) {
        super();
        this.position = { x: px, y: py };
        this.size = { x: 20, y: 20 };
        this.accel = { x: 0, y: 0.0 };
    }
    junto(opcao){
        this.update(opcao);
        this.draw();
    }
    update(opcao){
        this.despular();
        var ay = this.accel.y;
        this.velocity.y += ay;
        var vx = this.velocity.x;
        var vy = this.velocity.y;
        this.position.x += vx;
        this.position.y += vy;
        this.velocity.x =0;
        this.velocity.y =0;
        this.VBase();
        if(opcao == 1){
            this.quadra1(); //player1
        }
        if(opcao == 2){
            this.quadra2(); //player2
        }

    }
    esquerda(){this.velocity.x=-6}
    direita(){this.velocity.x=6}
    pular(){this.accel.y = -5;}
    VBase(){
        var py = this.position.y;
        if(py >= 220){
            this.position.y = 220;
        }
    }
    quadra1(){//player1
        var px = this.position.x;
        if(px <= 0){
            this.position.x = 0;
        }
        if(px >= 139){
            this.position.x = 139;
        }
    }
    quadra2(){ //player2
        var px = this.position.x;
        if(px >= 300){
            this.position.x = 300;
        }
        if(px <= 161){
            this.position.x = 161;
        }
    }
    despular(){
        if(this.position.y >= 200){this.accel.y =+ this.accel.y;}
        else{this.accel.y +=1;}
        this.position.y+=this.accel.y;
    }
    ia(bola){ //Movimento do player 2 em IA
        var numero = Math.round(Math.random()*20);
        this.position.x= bola.position.x;
        if(bola.position.y >= 180 && bola.position.y <= 200 && numero == 10 && bola.position.x >= 160 )  
        {
            this.accel.y = -4;
        }
    }

}

