/*

  Requisitos:

  El objetivo de este prototipo es añadir al juego el lanzamiento de
  bolas de fuego. Las bolas se lanzarán una vez pulse las teclas n o b.

  El movimiento de la bola será una parábola.

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
		var dt = 0.2;
		enemigo.step(dt);
		expect(enemigo.x).toEqual(enemies.basic.x+(enemigo.vx)*dt);
		expect(enemigo.y).toEqual(enemies.basic.y+(enemigo.vy)*dt);

		// Compruebo el caso y>Game.Height
		var enemigo2 = new Enemy(enemies.basic, { y: Game.height+1});
		enemigo2.board = {remove: function(){}};
		spyOn(enemigo2.board, "remove");
		enemigo2.step(dt);
		expect(enemigo2.board.remove).toHaveBeenCalled();
	});

});
