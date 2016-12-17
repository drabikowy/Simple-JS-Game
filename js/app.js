$(document).ready(function() {



   function Furry() {
      this.x = 0;
      this.y = 0;
      this.direction = 'right';
   }

   function Coin() {
      this.x = Math.floor(Math.random() * 10);
      this.y = Math.floor(Math.random() * 10);
   }

   function Game() {
      this.board = $('#board').children();
      this.furry = new Furry();
      this.coin = new Coin();
      this.score = 0;

      this.position = function(x,y) {
         var index = x + y * 10;
         return index;
      };

      this.moveFurry = function(){
         var dir = this.furry.direction;
         switch (dir) {
            case 'left':
            this.furry.x -= 1;
            break;
            case 'right':
            this.furry.x += 1;
            break;
            case 'up':
            this.furry.y -= 1;
            break;
            case 'down':
            this.furry.y += 1;
            default:
            return false;
         }
      };

      this.showFurry = function(){
         this.board.each(function(){
            $(this).removeClass('furry');
         })
         var f = this.position(this.furry.x, this.furry.y);
         this.board.eq(f).addClass('furry');
      }

      this.keyboard = function(){
         var thisObject = this;
         $(document).keydown(function(e){
            if(e.which==37) {thisObject.furry.direction='left'}
            else if(e.which==38) {thisObject.furry.direction='up'}
            else if(e.which==39) {thisObject.furry.direction='right'}
            else if (e.which==40) {thisObject.furry.direction='down'}
            else {
               var interval = setInterval(function(){thisObject.gameStep()},200);

               // thisObject.moveFurry();
               // thisObject.showFurry();
               // thisObject.onCoin();
               // thisObject.onWall();
            }
         });

      }


      this.showCoin = function(){
         var c = this.position(this.coin.x, this.coin.y);
         this.board.eq(c).addClass('coin');

      }

      this.onCoin = function(){
         var c = this.position(this.coin.x, this.coin.y);
         var f = this.position(this.furry.x, this.furry.y);

         if (f == c) {
            console.log('jest rowne');
            this.board.eq(c).removeClass('coin');
            this.score += 1;
            $('#score').text(this.score);
            if(this.score==3){
               alert('You Won!');
               location.reload();
            }
            this.coin = new Coin();
            this.showCoin();
         }
      }

      this.onWall = function(){
         if (this.furry.x>9 || this.furry.x<0 || this.furry.y>9 || this.furry.y<0){
            alert('game over');
            location.reload();

         }
      }

      this.gameStep = function(){
         this.moveFurry();
         this.showFurry();
         this.onCoin();
         this.onWall();
      }

      this.newGame = function(){
         var game = new Game();
         $('#score').text(game.score);
         game.keyboard();
         game.showFurry();
         game.showCoin();

         var step = this.gameStep();
         var play = window.setInterval(step(),200);
      }

// koniec obiektu
   }





   var game = new Game();
   game.keyboard();
   game.showFurry();
   game.showCoin();


   // var refreshId = window.setInterval(step, 300);








});
