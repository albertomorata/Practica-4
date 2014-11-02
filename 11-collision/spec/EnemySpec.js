/*

  Requisitos:

  El objetivo de este prototipo es añadir al juego naves enemigas. Las
  naves se añadirán al tablero de juegos (objeto GameBoard) al igual
  que el resto de los elementos del juego (nave del jugador y
  misiles).

  Cada nave enemiga debe tener un patrón de movimiento que exhibirá
  desde que entra por la parte superior del canvas hasta que
  desaparece por la parte inferior. En este prototipo las naves
  enemigos no interaccionan con el resto de los elementos del juego:
  los disparos de la nave del jugador no les afectan. La nave del
  jugador tampoco se ve afectada por la colisión con una nave enemiga.


  Especificación:

  1. El patrón de movimiento lo dictan las ecuaciones que se
     utilizarán para calcular las componentes vx e vy de su velocidad.
     Los parámetros de las ecuaciones que definen vx e vy determinan
     el patrón de comportamiento:

     vx = A + B * sin (C * t + D) 
     vy = E + F * sin (G * t + H)

     siendo t la edad de un enemigo, calculada como el tiempo que ha
     pasado desde que se creó la nave.

     A: componente constante de la velocidad horizontal
     B: fuerza de la velocidad horizontal sinusoidal
     C: periodo de la velocidad horizontal sinusoidal
     D: desplazamiento en el tiempo de la velocidad horizontal
        sinusoidal

     E: componente constante de la velocidad vertical
     F: fuerza de la velocidad vertical sinusoidal
     G: periodo de la velocidad vertical sinusoidal
     H: desplazamiento en el tiempo de la velocidad vertical
        sinusoidal

     Todos estos parámetros tendrán un valor por defecto de 0
     (definido en la variable baseParameters en el constructor), que
     puede ser substituido por otro valor cuando se crea la nave.


  2. Se creará un nuevo constructor/clase Enemy. Los enemigos se
     diferenciarán sólo en su posición inicial, en el sprite que
     utilizan y en el patrón de movimiento (parámetros A..H de la
     velocidad), pero todos serán de la misma clase: Enemy.

     Para definir diferentes tipos de enemigos se pasará al
     constructor una plantilla con valores para las propiedades (x, y,
     sprite, A..H).

     Para poder definir fácilmente enemigos parecidos creados a partir
     de una misma plantilla, se pasará un segundo argumento al
     constructor con valores alternativos para algunas de las
     propiedades de la plantilla.

*/
describe("Clase EnemySpec", function(){


   var canvas, ctx;
   var board;

   beforeEach(function(){
		loadFixtures('index.html');

		canvas = $('#game')[0];
		expect(canvas).toExist();

		ctx = canvas.getContext('2d');
		expect(ctx).toBeDefined();

		oldGame = Game;
		SpriteSheet.load (sprites,function(){});
    	});

    afterEach(function(){
        Game = oldGame;
    });

	it("pruebo constructor", function(){
		// Start variables for autocheck
		var sprites = {
			enemy_purple: { sx: 37, sy: 0, w: 42, h: 43, frames: 1 },
   			enemy_bee: { sx: 79, sy: 0, w: 37, h: 43, frames: 1 }
		};
		
		var enemies = {
		    basic: { x: 100, y: -50, sprite: 'enemy_purple', B: 100, C: 2 , E: 100 },
		};
	
		// Compruebo constructor
		var enemigo = new Enemy(enemies.basic);
		expect(enemigo.y).toBe(-50);

		var enemigo2 = new Enemy(enemies.basic, {x: 50, sprite: 'enemy_bee'});
		expect(enemigo2.x).toBe(50);
		expect(enemigo2.sprite).toEqual('enemy_bee');
	});

	it("draw()", function(){
		// Start variables for autocheck
		var sprites = {
			enemy_purple: { sx: 37, sy: 0, w: 42, h: 43, frames: 1 },
		};
		
		var enemies = {
		    basic: { x: 100, y: -50, sprite: 'enemy_purple', B: 100, C: 2 , E: 100 },
		};
	
		// Compruebo draw
		spyOn(SpriteSheet, "draw");
		var enemigo = new Enemy(enemies.basic);
		enemigo.draw(ctx);
		expect(SpriteSheet.draw).toHaveBeenCalled();
		expect(SpriteSheet.draw.calls[0].args[0]).toEqual(ctx);
		expect(SpriteSheet.draw.calls[0].args[1]).toEqual("enemy_purple");
		expect(SpriteSheet.draw.calls[0].args[1]).toEqual(enemigo.sprite);
		expect(SpriteSheet.draw.calls[0].args[2]).toEqual(enemigo.x);
		expect(SpriteSheet.draw.calls[0].args[3]).toEqual(enemigo.y);
	});

	it("step()", function(){
		// Start variables for autocheck
		var sprites = {
			enemy_purple: { sx: 37, sy: 0, w: 42, h: 43, frames: 1 },
		};
		
		var enemies = {
		    basic: { x: 100, y: -50, sprite: 'enemy_purple', B: 100, C: 2 , E: 100 },
		};

		Game = {width: 320, height: 480};
		// Compruebo step
		var enemigo = new Enemy(enemies.basic);
		enemigo.board = {remove: function(){}, collide: function() {}};
		var dt = 0.2;
		enemigo.step(dt);
		expect(enemigo.x).toEqual(enemies.basic.x+(enemigo.vx)*dt);
		expect(enemigo.y).toEqual(enemies.basic.y+(enemigo.vy)*dt);

		// Compruebo el caso y>Game.Height
		var enemigo2 = new Enemy(enemies.basic, { y: Game.height+1});
		enemigo2.board = {remove: function(){}, collide: function() {}};
		spyOn(enemigo2.board, "remove");
		enemigo2.step(dt);
		expect(enemigo2.board.remove).toHaveBeenCalled();
	});

});
