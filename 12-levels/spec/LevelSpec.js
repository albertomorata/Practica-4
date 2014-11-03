/*

  Requisitos:

    El objetivo de este prototipo es añadir niveles al juego. En cada
    nivel deberán ir apareciendo baterías de enemigos según avanza el
    tiempo.

    Cada nivel termina cuando no quedan enemigos por crear en ninguno
    de sus niveles, y cuando todos los enemigos del nivel han
    desaparecido del tablero de juegos (eliminados por misiles/bolas
    de fuego o desaparecidos por la parte de abajo de la pantalla).

    Cuando terminan todos los niveles sin que la nave haya colisionado
    termina el juego, ganando el jugador.

    Cuando la nave del jugador colisiona con un enemigo debe terminar
    el juego, perdiendo el jugador.


  Especificación:

    El constructor Level() recibirá como argumentos la definición del
    nivel y la función callback a la que llamar cuando termine el
    nivel.

    La definición del nivel tiene este formato:
      [ 
        [ parametros de bateria de enemigos ] , 
        [ parametros de bateria de enemigos ] , 
        ... 
      ]


      Los parámetros de cada batería de enemigos son estos:
           Comienzo (ms),  Fin (ms),   Frecuencia (ms),  Tipo,    Override
 Ejemplo:
         [ 0,              4000,       500,              'step',  { x: 100 } ]


    Cada vez que se llame al método step() del nivel éste comprobará:

      - si ha llegado ya el momento de añadir nuevos sprites de alguna
        de las baterías de enemigos.
    
      - si hay que eliminar alguna batería del nivel porque ya ha
        pasado la ventana de tiempo durante la que hay tiene que crear
        enemigos

      - si hay que terminar porque no quedan baterías de enemigos en
        el nivel ni enemigos en el tablero de juegos.

*/
describe("Clase LevelSpec", function(){


   var canvas, ctx;

   beforeEach(function(){
		loadFixtures('index.html');

		canvas = $('#game')[0];
		expect(canvas).toExist();

		ctx = canvas.getContext('2d');
		expect(ctx).toBeDefined();

		oldGame = Game;
		SpriteSheet.load (sprites,function(){});
		SpriteSheet.load (enemies,function(){});
    	});

    afterEach(function(){
        Game = oldGame;
    });


	it("draw", function(){
		var level1 = [
		  //  Comienzo, Fin,   Frecuencia,  Tipo,       Override
			[ 0,        4000,  300,         'step'    , { x: 20  } ],
		];
		var board = new GameBoard();
		var winGame = function(){};
		board.add(new Level(level1, winGame));
		spyOn(board, 'draw');
		board.draw();
		expect(board.draw).toHaveBeenCalled();
	});

	it("step", function(){
		var level1 = [
		  //  Comienzo, Fin,   Frecuencia,  Tipo,       Override
			[ 0,        400,  300,         'step'    , { x: 20  } ],
		];
		/*var board = new GameBoard();
		var nivel = new Level(level1, winGame);
		nivel.board= {winGame: function(){}};
		nivel.board.cnt = [];
		spyOn(nivel.board, 'winGame');
		var dt = 0.5;//this.t += dt * 1000 = 500;
		expect(nivel.levelData.length).toBe(1);
		nivel.step(dt);
		//expect(nivel.board.removed.length).toEqual(1);
		expect(nivel.levelData.length).toBe(0);
		expect(nivel.callback).toBe(winGame);
		expect(nivel.board.winGame).toHaveBeenCalled();*/

		var hola = {winGame: function(){}};
		var nivel = new Level(level1, hola.winGame);
		nivel.board= {add: function(){}};
		nivel.board.cnt = {};
		spyOn(hola, 'winGame');
		var dt = 0.5;
		expect(nivel.levelData.length).toBe(1);
		nivel.step(dt);
		expect(nivel.levelData.length).toBe(0);
		expect(hola.winGame).toHaveBeenCalled();
	});


});
