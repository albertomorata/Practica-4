/*

  En el anterior prototipo (06-player), el objeto Game permite
  gestionar una colección de tableros (boards). Los tres campos de
  estrellas, la pantalla de inicio, y el sprite de la nave del
  jugador, se añaden como tableros independientes para que Game pueda
  ejecutar sus métodos step() y draw() periódicamente desde su método
  loop(). Sin embargo los objetos que muestran los tableros no pueden
  interaccionar entre sí. Aunque se añadiesen nuevos tableros para los
  misiles y para los enemigos, resulta difícil con esta arquitectura
  pensar en cómo podría por ejemplo detectarse la colisión de una nave
  enemiga con la nave del jugador, o cómo podría detectarse si un
  misil disparado por la nave del usuario ha colisionado con una nave
  enemiga.


  Requisitos:

  Este es precisamente el requisito que se ha identificado para este
  prototipo: diseñar e implementar un mecanismo que permita gestionar
  la interacción entre los elementos del juego. Para ello se diseñará
  la clase GameBoard. Piensa en esta clase como un tablero de un juego
  de mesa, sobre el que se disponen los elementos del juego (fichas,
  cartas, etc.). En Alien Invasion los elementos del juego serán las
  naves enemigas, la nave del jugador y los misiles. Para el objeto
  Game, GameBoard será un board más, por lo que deberá ofrecer los
  métodos step() y draw(), siendo responsable de mostrar todos los
  objetos que contenga cuando Game llame a estos métodos.

  Este prototipo no añade funcionalidad nueva a la que ofrecía el
  prototipo 06.


  Especificación: GameBoard debe

  - mantener una colección a la que se pueden añadir y de la que se
    pueden eliminar sprites como nave enemiga, misil, nave del
    jugador, explosión, etc.

  - interacción con Game: cuando Game llame a los métodos step() y
    draw() de un GameBoard que haya sido añadido como un board a Game,
    GameBoard debe ocuparse de que se ejecuten los métodos step() y
    draw() de todos los objetos que contenga

  - debe ofrecer la posibilidad de detectar la colisión entre
    objetos. Un objeto sprite almacenado en GameBoard debe poder
    detectar si ha colisionado con otro objeto del mismo
    GameBoard. Los misiles disparados por la nave del jugador deberán
    poder detectar gracias a esta funcionalidad ofrecida por GameBoard
    cuándo han colisionado con una nave enemiga; una nave enemiga debe
    poder detectar si ha colisionado con la nave del jugador; un misil
    disparado por la nave enemiga debe poder detectar si ha
    colisionado con la nave del jugador. Para ello es necesario que se
    pueda identificar de qué tipo es cada objeto sprite almacenado en
    el tablero de juegos, pues cada objeto sólo quiere comprobar si ha
    colisionado con objetos de cierto tipo, no con todos los objetos.

*/

describe("Clase GameBoard", function(){


   var canvas, ctx;
   var board;

   beforeEach(function(){
		loadFixtures('index.html');

		canvas = $('#game')[0];
		expect(canvas).toExist();

		ctx = canvas.getContext('2d');
		expect(ctx).toBeDefined();

		board = new GameBoard();
    });
   
	it("add", function(){
		var dummy = function(){}
		//Primera prueba, 1 dummy
		obj = new dummy;
		board.add(obj);
		expect(board.objects[0]).toBe(obj);
		//Segunda prueba, 2 dummy
		obj2 = new dummy;
		board.add(obj2);
		expect(board.objects.length).toBe(2);
    });

	it("remove", function(){
		var dummy = function(){}
		obj = new dummy;
		obj2 = new dummy;
		board.add(obj);
		board.add(obj2);
		board.resetRemoved();
		board.remove(obj);
		board.finalizeRemoved();
		//Borramos obj, por tanto el tablero 
		//debería tener sólo 1 obj
		expect(board.objects.length).toBe(1);
    });

	it("iterate", function(){
		var dummy = function(){
			this.interna = function(){}
		}
		obj = new dummy;
		obj2 = new dummy;
		board.add(obj);
		board.add(obj2);
		spyOn(obj,"interna");
		spyOn(obj2,"interna");
		board.iterate("interna");
		expect(obj.interna).toHaveBeenCalled();
		expect(obj2.interna).toHaveBeenCalled();
    });

	it("detect", function(){
		var dummy = function(){}
		obj = new dummy;
		obj2 = new dummy;
		board.add(obj);
		board.add(obj2);
		comparador = function(dummy){
			if (dummy === obj) {return true};
		}
		expect(board.detect(function() {return comparador(obj) === true})).toBe(obj);
    });
	
	it("step", function(){
		var dummy = function(){
			this.step = function(){}	
		}
		obj = new dummy;
		obj2 = new dummy;
		board.add(obj);
		board.add(obj2);
		spyOn(obj,"step");
		spyOn(obj2,"step");
		board.step(7);
		expect(obj.step).toHaveBeenCalled;
    });


	it("draw", function(){
		var dummy = function(){
			this.draw = function(){}	
		}
		obj = new dummy;
		obj2 = new dummy;
		board.add(obj);
		board.add(obj2);
		spyOn(obj,"draw");
		spyOn(obj2,"draw");
		board.draw();
		expect(obj.draw).toHaveBeenCalled;
		expect(obj2.draw).toHaveBeenCalled;
    });

	it("overlap", function(){
		var dummy = function(x,y,z,b){
			this.x = x;
			this.y = y;
			this.z = z;
			this.b = b;				
		}
		obj = new dummy (0,0,0,0);
		obj2 = new dummy (5,5,5,5);
		expect(board.overlap(obj,obj2)).toBe(true);
    });

	it("collide", function(){
		var dummy = function(x,y,z,b){
			this.x = x;
			this.y = y;
			this.z = z;
			this.b = b;				
		}
		obj = new dummy (0,0,0,0);
		obj2 = new dummy (5,5,5,5);

		board.add(obj);
		board.add(obj2);

		expect(board.collide(obj)).toBe(obj2);
    });
});
