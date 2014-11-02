/*

  Requisitos:

  El objetivo de este prototipo es que se detecten colisiones entre
  varios tipos de sprites:
  
  - Los misiles tienen ahora una nueva propiedad: el daño (damage) que
    infligen a una nave enemiga cuando colisionan con ella. Cuando un
    misil colisione con una nave enemiga le infligirá un daño de
    cierta cuantía (damage) a la nave enemiga con la que impacta, y
    desaparecerá.

  - Las naves enemigas tienen ahora una nueva propiedad: su salud
    (health).  El daño ocasionado a una nave enemiga por un misil hará
    que disminuya la salud de la nave enemiga, y cuando llegue a cero,
    la nave enemiga desaparecerá.

  - cuando una nave enemiga colisione con la nave del jugador, deberá
    desaparecer tanto la nave enemiga como la nave del jugador.



  Especificación:

  En el prototipo 07-gameboard se añadió el constructor GameBoard. El
  método overlap() de los objetos creados con GameBoard() ofrece
  funcionalidad para comprobar si los rectángulos que circunscriben a
  los sprites que se le pasan como parámetros tienen intersección no
  nula. El método collide() de GameBoard utiliza overlap() para
  detectar si el objeto que se le pasa como primer parámetro ha
  colisionado con algún objeto del tipo que se le pasa como segundo
  parámetro.

  En este prototipo se utilizará el método collide() para detectar los
  siguientes tipos de colisiones:

    a) detectar si un misil disparado por la nave del jugador
       colisiona con una nave enemiga

    b) detectar si una nave enemiga colisiona con la nave del jugador


  En el método step() de los objetos creados con PlayerMissile() y
  Enemy(), tras "moverse" a su nueva posición calculada, se comprobará
  si han colisionado con algún objeto del tipo correspondiente. 

  No interesa comprobar si se colisiona con cualquier otro objeto,
  sino sólo con los de ciertos tipos. El misil tiene que comprobar si
  colisiona con naves enemigas. Por otro lado, tras moverse una nave
  enemiga, ésta tiene que comprobar si colisiona con la nave del
  jugador. Para ello cada sprite tiene un tipo y cuando se comprueba
  si un sprite ha colisionado con otros, se pasa como segundo
  argumento a collide() el tipo de sprites con los que se quiere ver
  si ha colisionado el objeto que se pasa como primer argumento.

  Cuando un objeto detecta que ha colisionado con otro, llama al
  método hit() del objeto con el que ha colisionado. 


  Efectos de las colisiones de un misil con una nave enemiga:

    Cuando el misil llama al método hit() de una nave enemiga, pasa
    como parámetro el daño que provoca para que la nave enemiga pueda
    calcular la reducción de salud que conlleva la colisión. Cuando
    una nave enemiga recibe una llamada a su método .hit() realizada
    por un misil que ha detectado la colisión, la nave enemiga
    recalcula su salud reduciéndola en tantas unidades como el daño
    del misil indique, y si su salud llega a 0 desaparece del tablero
    de juegos, produciéndose en su lugar la animación de una
    explosión.

    El misil, tras informar llamando al métod hit() de la nave enemiga
    con la que ha detectado colisión, desaparece.


  Efectos de las colisiones de una nave enemiga con la nave del jugador:

    Cuando la nave del jugador recibe la llamada .hit() realizada por
    una nave enemiga que ha detectado la colisión, la nave del jugador
    desaparece del tablero.

    La nave enemiga, tras informar llamando a hit() de la nave del
    jugador, desaparece también.

*/
describe("Clase CollisionsSpec", function(){


   var canvas, ctx;

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

	 //que un misil con el daño suficiente que colisiona con una nave
    // enemiga la destruye, eliminándose la nave y el misil del tablero
    // de juegos
	it("Misil destruye nave y desaparece", function(){
		// Start variables for autocheck
		var sprites = {
			missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 },
			enemy_purple: { sx: 37, sy: 0, w: 42, h: 43, frames: 1 },
			explosion: { sx: 0, sy: 64, w: 64, h: 64, frames: 12 }
		};

		var enemies = {
			basic: { x: 49, y: -40, sprite: 'enemy_purple', B: 100, C: 4, E: 100, health: 10 }
		};
		Game = {width: 320, height: 480};
		var board = new GameBoard();
		// Juego
		var misil = new PlayerMissile(50,180);//this.x = x - this.w/2;this.y = y - this.h; 
		board.add(misil);//90 - missile.h (10) + missile.vy * dt (-70) = 10
		var enemigo = new Enemy(enemies.basic);// 180 -10 -210 =  -40
		board.add(enemigo);
		expect(board.objects.length).toEqual(2);// misil y enemigo
		board.step(0.3);
		expect(board.removed.length).toEqual(2); // eliminados enemigo y misil
		expect(enemigo.health).toEqual(0); // vida del enemigo = 0 (10 - 10)
		expect(board.objects.length).toEqual(1); // explosión
	});
	//- que un misil con daño insuficiente que colisiona con una nave
    // enemiga no la destruye, sino que reduce la salud de la nave
    // enemiga, y desaparece del tablero de juegos sin que desaparezca
    // la nave enemiga dañada
	it("Misil no destruye nave, la daña y desaparece misil", function(){
		// Start variables for autocheck
		var sprites = {
			missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 },
			enemy_purple: { sx: 37, sy: 0, w: 42, h: 43, frames: 1 },
			explosion: { sx: 0, sy: 64, w: 64, h: 64, frames: 12 }
		};

		var enemies = {
			basic: { x: 49, y: -40, sprite: 'enemy_purple', B: 100, C: 4, E: 100, health: 15 }
		};
		Game = {width: 320, height: 480};
		var board = new GameBoard();
		// Juego
		var misil = new PlayerMissile(50,180);//this.x = x - this.w/2;this.y = y - this.h; 
		board.add(misil);//90 - missile.h (10) + missile.vy * dt (-70) = 10
		var enemigo = new Enemy(enemies.basic);// 180 -10 -210 =  -40
		board.add(enemigo);
		expect(board.objects.length).toEqual(2);// enemigo y misil
		board.step(0.3);
		expect(board.removed.length).toEqual(1); // eliminado misil
		expect(enemigo.health).toEqual(5); // vida del enemigo = 5 (15 - 10)
		expect(board.objects.length).toEqual(1); // enemigo
	});

   //- que una bola de fuego que colisiona con una nave la destruye
   //  siempre, desapareciendo del tablero de juegos la nave enemiga, y
   //  no desapareciendo la bola de fuego

	it("Fireball destruye enemigo, y sigue fireball", function(){
		// Start variables for autocheck
		var sprites = {
			fireball: { sx: 0, sy: 64, w: 64, h: 64, frames: 1 },
			enemy_purple: { sx: 37, sy: 0, w: 42, h: 43, frames: 1 },
			explosion: { sx: 0, sy: 64, w: 64, h: 64, frames: 12 }
		};
		var xfire = 50 - 64/2 + 70*1.5*0.3;
		var yfire = 180 - 64 -1400*0.3;
		var enemies = {
			basic: { x: xfire, y: yfire, sprite: 'enemy_purple', B: 100, C: 4, E: 100, health: 100 }
		};
		Game = {width: 320, height: 480};
		var board = new GameBoard();
		// Juego
		var fireball = new PlayerFireBall(50,180, 1.5); 
		board.add(fireball);
		var enemigo = new Enemy(enemies.basic);// 180 -10 -210 =  -40
		board.add(enemigo);
		expect(board.objects.length).toEqual(2);// misil y fireball
		board.step(0.3);
		expect(board.removed.length).toEqual(1); // eliminada nave 
		expect(enemigo.health).toEqual(0); // vida del enemigo = 5 (15 - 10)
		expect(board.objects.length).toEqual(2); // enemigo y explosión
	});
	
   //- que una nave enemiga que colisiona con la nave del jugador la
   // destruye, eliminándose tanto la nave enemiga como la nave del
   //  jugador tras aparecer la explosión en la pantalla
	it("Enemigo colisiona con mi nave, desaparecen", function(){
		// Start variables for autocheck
		var sprites = {
			ship: { sx: 0, sy: 0, w: 37, h: 42, frames: 1 },
			enemy_ship: { sx: 116, sy: 0, w: 42, h: 43, frames: 1 },
			explosion: { sx: 0, sy: 64, w: 64, h: 64, frames: 12 }
		};
		Game = {width: 320, height: 480, keys: {'left': false , 'right':false, 'fire': false}};
		var xnave = Game.width/2 - 37/2 + 0; // 141.5
    	//		this.y = Game.height - 10 - this.h;
		var enemies = {
			basic: { x: xnave, y: 308, sprite: 'enemy_ship', E: 120, health: 15 }
		};
		//    this.vy = 100 + 0 * 1 = 100;

		var board = new GameBoard();
		// Juego
		var nave = new PlayerShip(); 
		board.add(nave);
		var enemigo = new Enemy(enemies.basic);
		board.add(enemigo);
		expect(board.objects.length).toEqual(2);// enemigo y minave
		board.step(1);
		expect(board.removed.length).toEqual(2); // eliminada nave y  enemigo 
		expect(board.objects.length).toEqual(0); // no hay elementos en tablero
	});
});
