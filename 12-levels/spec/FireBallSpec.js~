/*

  Requisitos:

  El objetivo de este prototipo es añadir al juego el lanzamiento de
  bolas de fuego. Las bolas se lanzarán una vez pulse las teclas n o b.

  El movimiento de la bola será una parábola.

*/
describe("Clase FireBallSpec", function(){


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

	it("draw()", function(){
		spyOn(SpriteSheet, "draw");
		var fireball = new PlayerFireBall(2,8,2);
		fireball.draw(ctx);
		expect(SpriteSheet.draw).toHaveBeenCalled();
		expect(SpriteSheet.draw.calls[0].args[0]).toEqual(ctx);
		expect(SpriteSheet.draw.calls[0].args[1]).toEqual("fireball");
		expect(SpriteSheet.draw.calls[0].args[2]).toEqual(fireball.x);
		expect(SpriteSheet.draw.calls[0].args[3]).toEqual(fireball.y);
	});

	it("step()", function(){
		//Inicializo
		var sprites = {
			fireball: { sx: 0, sy: 64, w: 64, h: 64, frames: 1 } 
		};
		Game = {width: 320, height: 480};

		var bolafuego = new PlayerFireBall(2,8,2);
		bolafuego.board = {remove: function(){}, collide: function() {}};
		var dt = 2;
		bolafuego.step(dt);
		expect(bolafuego.vx).toEqual(70*2);

		var bolafuego2 = new PlayerFireBall(2,-Game.height-1,2);
		bolafuego2.board = {remove: function(){}, collide: function() {}};
		spyOn(bolafuego2.board, "remove");
		bolafuego2.step(dt);
		expect(bolafuego2.board.remove).toHaveBeenCalled();
	});

	
});
