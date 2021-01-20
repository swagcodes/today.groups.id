  function Tank(posX,posY){
	   this.id='';
	   this.x=posX;
	   this.y=posY;
	   this.zidanX =  this.x+12;
	   this.zidanY = this.y-6;
	   this.direction = 'stop';	//移动的方向
	   this.live = 0;	//生命数量，大于0时可攻击
	   this.status = 'die';	//生命状态。die状态时不可移动
	   this.face = 'up';	//坦克面对的方向，判断是否可移动
	   this.moveInterval = 0;	//移动的定时器
	   this.zidanInterval = 0;	//子弹的定时器
	   this.zidan = $('<div id="zidan" style="height:10px;width:6px;position:absolute"></div>');
	   this.type = 'me';	//敌，我类型分类
	   this.enemyType = 'my';	//敌方类型分类
	   this.auto = [0,0,0,0	]//上下左右
   }
   Tank.prototype = {
		  
		   create:function(Id,enemyType){
			   if(Id){	//创建地方坦克
				   this.id = Id;
				   $(this.id).css({
					   'height':'30px',
					   'width':'30px',
					   'left':this.x,
					   'top':this.y
				   })

				   var that = this;
					  var count = 0;
					   function initGo(){
						   $(that.id).css('display','block');
						   $(that.id).css('background','url("./imgs/tankAll.gif") '+(256+count*32)*(-1)+'px -32px');
						   if(count >= 7){
							   clearInterval(initInterval);
							   $(that.id).css('background','url("./imgs/tankAll.gif") 0px -30px');
							   that.live = 1;
							   that.status = 'live';
							   that.move();
						   }
						   count++;
					   }
					   var initInterval = setInterval(initGo,200);
				   var random = parseInt(Math.random()*10)%4;
				   this.auto = [0,0,0,0];
				   this.auto[random] = 1;
				   this.type = 'enemy';
				   this.enemyType = 'enemy'+enemyType;
				  // this.live = 1;

			   }else{
				   this.id = '#myTank';
				   
				   $(this.id).css({
					   'height':'30px',
					   'width':'30px',
					   'left':this.x,
					   'top':this.y
				   });
				  var that = this;
				  var count = 0;
				   function initGo(){
					   $(that.id).css('background','url("./imgs/tankAll.gif") '+(256+count*32)*(-1)+'px -32px');
					   if(count >= 7){
						   clearInterval(initInterval);
						   $(that.id).css('background','url("./imgs/tankAll.gif") 0px 0px');
						   //$(that.id).css('display','block');
						   that.status = 'live';
						   that.live = 3;
					   }
					   count++;
				   }
				   var initInterval = setInterval(initGo,200);
			   }
			 
		   },
		   relive:function(){
			   if(this.id == '#myTank'){
				   this.stop();
				   //$(this.id).css('background-position','0px 0px');
				   this.face = 'up';
				    
				   $(this.id).css({
					   'height':'30px',
					   'width':'30px',
					   'left':(gameWidth-32)/2-40,
					   'top':(gameHeight-32)
				   });
				   this.x=(gameWidth-32)/2-40;
				   this.y=(gameHeight-32);
				   this.zidanX =  this.x+12;
					this.zidanY = this.y-6;
					/*var temLive = this.live;
					this.live = 0;*/
					var that = this;
					  var count = 0;
					   function initGo(){
						   $(that.id).css('display','block');
						   $(that.id).css('background','url("./imgs/tankAll.gif") '+(256+count*32)*(-1)+'px -32px');
						   if(count >= 7){
							   clearInterval(initInterval);
							   $(that.id).css('background','url("./imgs/tankAll.gif") 0px 0px');
							  // that.live = temLive;
							   that.status = 'live';
						   }
						   count++;
					   }
					   var initInterval = setInterval(initGo,200);
					
					
					
			   }else{
				   
			   }
		   },
		   move:function(event){
			   var e = event || window.enevt;
			   var tankMove;
			   var that = this;
			   if(this.status == 'die'){
				   return;
			   }
			   
		        if((e && e.keyCode == 65) || that.auto[2]){  //左
		            if(that.direction == 'left'){	//如果之前就是向左的，则返回，不在启动定时器
		            	return;
		            }else{	//如果之前不是向左的，则停止之前的运动，向左。
		            	that.stop();
		            	that.direction = 'left';
			            that.face = 'left';
			            if(that.enemyType == 'enemy0'){	//敌方坦克0
			            	$(that.id).css('background-position','-64px -32px');
			            }else if(that.enemyType == 'enemy1'){	//敌方坦克1
			            	$(that.id).css('background-position','-192px 0px');
			            }else if(that.enemyType == 'my'){	//我的坦克
			            	$(that.id).css('background-position','-64px 0px');
			            }
			            
		            	tankMove = function(){
		            		var flag = checkCanmove();	
		            		if(!flag){
		            			return;
		            		}
		            		if(that.x <= 10){ //超出左边界
		            			if(that.type == 'enemy'){
		            				changeDirection();
		            				that.move();
		            				return;
		            			}else{
		            				return;
		            			}
		            			
		            		}
				            that.x-=2;
				            that.zidanX =  that.x;
				            that.zidanY = that.y + 12;
				            $(that.id).css('left',that.x);
				            
			            }
		            }
		        }
		        if((e && e.keyCode == 68) || that.auto[3]){  //右
		        	 if(that.direction == 'right'){
			            	return;
			            }else{
			            	that.stop();
			            	 that.direction = 'right';
					         that.face = 'right';
					         if(that.enemyType == 'enemy0'){	//敌方坦克0
					        	 $(that.id).css('background-position','-96px -32px');
					         }else if(that.enemyType == 'my'){
					        	 $(that.id).css('background-position','-96px 0px');
					         }
					         
			            	tankMove = function(){
			            		var flag = checkCanmove();	
			            		if(!flag){
			            			return;
			            		}
			            		if(that.x >= gameWidth -30){ //超出右边界
			            			if(that.type == 'enemy'){
			            				changeDirection();
			            				that.move();
			            				return;
			            			}else{
			            				return;
			            			}
			            			
			            		}
					            that.x+=2;
					            that.zidanX =  that.x+30;
					            that.zidanY = that.y+12;
					            $(that.id).css('left',that.x);
					           
				            }
			            }
		        }
		        if((e && e.keyCode == 83) || that.auto[1]){  //下
		        	if(that.direction == 'down'){
		            	return;
		            }else{
		            	that.stop();
		            	that.direction = 'down';
			            that.face = 'down';
			            if(that.enemyType == 'enemy0'){	//敌方坦克0
			            	$(that.id).css('background-position','-32px -32px');
			            }else if(that.enemyType == 'my'){
			            	$(that.id).css('background-position','-32px 0px');
			            }
			            
		            	tankMove = function(){
			            	var flag = checkCanmove();	
		            		if(!flag){
		            			return;
		            		}
		            		if(that.y >= gameHeight -30){ //超出下边界
		            			if(that.type == 'enemy'){
		            				changeDirection();
		            				that.move();
		            				return;
		            			}else{
		            				return;
		            			}
		            			
		            		}
				            that.y +=2;
			            	that.zidanY = that.y +30;
			            	that.zidanX = that.x +13;
				            $(that.id).css('top',that.y);
				            
			            }
		            }
		        }
		        if((e && e.keyCode == 87) || that.auto[0]){  //上
		        	if(that.direction == 'up'){
		            	return;
		            }else{
		            	that.stop();
		            	that.direction = 'up';
			            that.face = 'up';
			            if(that.enemyType == 'enemy0'){	//敌方坦克0
			            	$(that.id).css('background-position','0px -32px');
			            }else if(that.enemyType == 'my'){
			            	$(that.id).css('background-position','0px 0px');
			            }
			            
		            	tankMove = function(){
		            		var flag = checkCanmove();	
		            		if(!flag){
		            			return;
		            		}
		            		if(that.y <= 10){ //超出上边界
		            			if(that.type == 'enemy'){
		            				changeDirection();
		            				that.move();
		            				return;
		            			}else{
		            				return;
		            			}
		            			
		            		}
				            that.y -=2;
				            that.zidanY = that.y + 0;
				            that.zidanX = that.x +13;
				            $(that.id).css('top',that.y);
				            
			            }
		            }
		        }
		        function changeDirection(){
		        	var random = parseInt(Math.random()*10)%4;
		        	
		        	that.auto = [0,0,0,0];
		        	that.auto[random] =1;
		        }
		        function checkCanmove(){
		        	//碰到土墙
		        	for(var j = 0; j< wallArray.length; j++){
		        		if(that.face == 'up' &&that.y>=wallArray[j][1]*15-5 &&  that.y <= wallArray[j][1]*15+15 && that.x <= wallArray[j][0]*15 +15 && that.x >= wallArray[j][0]*15 - 30){
		        			if(that.type == 'enemy'){
	            				changeDirection();
	            				that.move();
	            				return;
	            			}
		        			//停止
		        			that.stop();
		        			clearInterval(that.moveInterval);
		        			return false;
		        		}
		        		if(that.face == 'down'&& that.y <= wallArray[j][1]*15 -28 && that.y >= wallArray[j][1]*15-33 && that.x <= wallArray[j][0]*15 +15 && that.x >= wallArray[j][0]*15 - 30){
		        			if(that.type == 'enemy'){
	            				changeDirection();
	            				that.move();
	            				return;
	            			}
		        			that.stop();
		        			clearInterval(that.moveInterval);
		        			return false;
		        		}
		        		if(that.face =='left' && that.x <= wallArray[j][0]*15 + 18 && that.x >= wallArray[j][0]*15 + 13 && that.y <=wallArray[j][1]*15+10 && that.y >= wallArray[j][1]*15 -30){
		        			if(that.type == 'enemy'){
	            				changeDirection();
	            				that.move();
	            				return;
	            			}
		        			that.stop();
		        			clearInterval(that.moveInterval);
		        			return false;
		        		}
		        		if(that.face == 'right' && that.x >= wallArray[j][0]*15 -35 && that.x <= wallArray[j][0]*15 -30 && that.y <=wallArray[j][1]*15 +10 && that.y >= wallArray[j][1]*15-30){
		        			if(that.type == 'enemy'){
	            				changeDirection();
	            				that.move();
	            				return;
	            			}
		        			that.stop();
		        			clearInterval(that.moveInterval);
		        			return false;
		        		}
		        	}
		        	
		        	
		        	//碰到石墙
		        	for(var j = 0; j< stoneArray.length; j++){
		        		if(that.face == 'up' &&that.y>=stoneArray[j][1]*15-5 &&  that.y <= stoneArray[j][1]*15+15 && that.x <= stoneArray[j][0]*15 +15 && that.x >= stoneArray[j][0]*15 - 30){
		        			if(that.type == 'enemy'){
	            				changeDirection();
	            				that.move();
	            				return;
	            			}
		        			//停止
		        			that.stop();
		        			clearInterval(that.moveInterval);
		        			return false;
		        		}
		        		if(that.face == 'down'&& that.y <= stoneArray[j][1]*15 -28 && that.y >= stoneArray[j][1]*15-33 && that.x <= stoneArray[j][0]*15 +15 && that.x >= stoneArray[j][0]*15 - 30){
		        			if(that.type == 'enemy'){
	            				changeDirection();
	            				that.move();
	            				return;
	            			}
		        			that.stop();
		        			clearInterval(that.moveInterval);
		        			return false;
		        		}
		        		if(that.face =='left' && that.x <= stoneArray[j][0]*15 + 18 && that.x >= stoneArray[j][0]*15 + 13 && that.y <=stoneArray[j][1]*15+10 && that.y >= stoneArray[j][1]*15 -30){
		        			if(that.type == 'enemy'){
	            				changeDirection();
	            				that.move();
	            				return;
	            			}
		        			that.stop();
		        			clearInterval(that.moveInterval);
		        			return false;
		        		}
		        		if(that.face == 'right' && that.x >= stoneArray[j][0]*15 -35 && that.x <= stoneArray[j][0]*15 -30 && that.y <=stoneArray[j][1]*15 +10 && that.y >= stoneArray[j][1]*15-30){
		        			if(that.type == 'enemy'){
	            				changeDirection();
	            				that.move();
	            				return;
	            			}
		        			that.stop();
		        			clearInterval(that.moveInterval);
		        			return false;
		        		}
		        	}
		        	return true;
		        }
		        if(that.enemyType == 'enemy0'){
		        	 that.moveInterval = setInterval(tankMove,30)
		        }else {
		        	 that.moveInterval = setInterval(tankMove,30)
		        }
		   },
		   stop:function(){
			   if (this.moveInterval != 0){
				   clearInterval(this.moveInterval);
				   this.direction = 'stop';
			   }
		   },
		   destroy:function(){
			   this.stop();
			   this.status = 'die';
			   var count = 0;
			   var destroyTankInterval;
			   var that = this;
			   var destroyTankLeft = parseInt($(that.id).css('left'))-15;
			   var destroyTankTop = parseInt($(that.id).css('top'))-15;
			   
			   function destroyGo(){
				   $(that.id).css({
					   'background':'url("./imgs/tankAll.gif") '+count*(-66)+'px -160px',
					   'height':'70px',
					   'left':destroyTankLeft + 'px',
					   'top':destroyTankTop + 'px',
					   'width':'70px'
				   });
				   count++;
				   if(count >= 4){
					   clearInterval(destroyTankInterval);
					   //$(that.id).remove();
					   $(that.id).css('display','none');
					   that.live--;
					   if(that.live > 0){
						   that.relive();
						   
					   }else {
						   if(that.id == '#myTank'){
							   $('#gameOver').css({'display':'block',
								'left':gameWidth/2-30,
								'top':gameHeight/2
								});
								setTimeout('location.reload()',1000);
						   }
					   }
				   }
			   }
			   destroyTankInterval = setInterval(destroyGo,100)
			   
		   },
		   attack:function(){
			   if(this.zidan.is(':visible') || this.live == 0){	//如果已有子弹，返回
				   return;
			   }
		  	   var that= this;
		  	  
		  	   if(that.face == 'up'){ //向上出子弹
		  		 $('#gameDiv').append(this.zidan);
		  		 that.zidan.css('background','url("./imgs/tankAll.gif") -80px -95px')
				   that.zidan.css('left',that.zidanX);
				   that.zidan.css('top',that.zidanY);
				   var zidanSelfX = parseInt(that.zidanX);
				   var zidanSelfY = parseInt(that.zidanY);
				   
				   function zidango(){
					  if(zidanSelfY <= 0){	//超出上边界，删除子弹
						  that.zidan.remove();
						  clearInterval(that.zidanInterval);
					   }else{
						   checkWallDestroy();
						   checkEnemyDestroy();
						   that.zidan.css('left',zidanSelfX);
						   that.zidan.css('top',zidanSelfY);
						   zidanSelfY--;
					   }
				   }
				   //this.zidanInterval = setInterval(zidango,10);
		  	   }else if(this.face == 'down'){	//向下射出子弹
		  		 $('#gameDiv').append(this.zidan);
		  		 that.zidan.css('background','url("./imgs/tankAll.gif") -86px -95px')
				   that.zidan.css('left',that.zidanX);
				   that.zidan.css('top',that.zidanY );
				   var zidanSelfX = parseInt(that.zidanX);
				   var zidanSelfY = parseInt(that.zidanY);
				   function zidango(){
					  if(zidanSelfY >= gameHeight){	//超出下边界，删除子弹
						  that.zidan.remove();
						  clearInterval(that.zidanInterval);
					   }else{
						   checkWallDestroy();
						   checkEnemyDestroy();
						   that.zidan.css('left',zidanSelfX);
						   that.zidan.css('top',zidanSelfY);
						   zidanSelfY++;
					   }
				   }
		  	   }else if(this.face == 'left'){
		  		 $('#gameDiv').append(this.zidan);
		  		 that.zidan.css('background','url("./imgs/tankAll.gif") -92px -95px')
				   that.zidan.css('left',that.zidanX);
				   that.zidan.css('top',that.zidanY );
				   var zidanSelfX = parseInt(that.zidanX);
				   var zidanSelfY = parseInt(that.zidanY);
				   function zidango(){
					  if(zidanSelfX <= 0){	//超出左边界，删除子弹
						  that.zidan.remove();
						  clearInterval(that.zidanInterval);
					   }else{
						   checkWallDestroy();
						   checkEnemyDestroy();
						   that.zidan.css('left',zidanSelfX);
						   that.zidan.css('top',zidanSelfY);
						   zidanSelfX--;
					   }
				   }
		  	   }else if(this.face =='right'){
		  		 $('#gameDiv').append(this.zidan);
		  		 that.zidan.css('background','url("./imgs/tankAll.gif") -98px -95px')
				   that.zidan.css('left',that.zidanX);
				   that.zidan.css('top',that.zidanY);
				   var zidanSelfX = parseInt(that.zidanX);
				   var zidanSelfY = parseInt(that.zidanY);
				   function zidango(){
					  if(zidanSelfX >= gameWidth){	//超出右边界，删除子弹
						  that.zidan.remove();
						  clearInterval(that.zidanInterval);
					   }else{
						   checkWallDestroy();
						   checkEnemyDestroy();
						   that.zidan.css('left',zidanSelfX);
						   that.zidan.css('top',zidanSelfY);
						   zidanSelfX++;
					   }
					 
				   }
		  	   }
		  	   
		  	   function checkWallDestroy(){
		  		//判断是否打击到墙
					  var count = 0;
					  //打击到土墙
					  for(var i = 0;i < wallArray.length; i++){
						  if(wallArray[i] != 'null' && ((zidanSelfY == wallArray[i][1]*15 && zidanSelfX >= wallArray[i][0]*15 && zidanSelfX <= wallArray[i][0]*15+15)|| (zidanSelfX == wallArray[i][0]*15 && zidanSelfY >= wallArray[i][1]*15 && zidanSelfY <= wallArray[i][1]*15+15))){
							  that.zidan.remove();
							  clearInterval(that.zidanInterval);
							  var index = wallArray.indexOf(wallArray[i]);
							  wallArray.splice(index,1,'null');
							  var destroyWallLeft = parseInt($('#wall').find('.wallDiv:eq('+index+')').css('left'))-7;
							  var destroyWallTop = parseInt($('#wall').find('.wallDiv:eq('+index+')').css('top'))-7;
							  function wallDestroy(){
								  $('#wall').find('.wallDiv:eq('+index+')').css({
									  'height':'30px',
									  'left':destroyWallLeft,
									  'top':destroyWallTop,
									  'width':'30px',
									  'background':'url("./imgs/tankAll.gif") '+(325+count*30)*(-1)+'px -4px '});
								  count++;
								  if(count >=3){
									  clearInterval(wallDestroyInterval);
									  $('#wall').find('.wallDiv:eq('+index+')').css('display','none');
								  }
							  }
							  var wallDestroyInterval = setInterval(wallDestroy,150);
						  }
					  }
					  //打击到石墙,
					  var stoneCount = 0
					  for(var i = 0;i < stoneArray.length; i++){
						  if((zidanSelfY == stoneArray[i][1]*15 && zidanSelfX >= stoneArray[i][0]*15 && zidanSelfX <= stoneArray[i][0]*15+15)|| (zidanSelfX == stoneArray[i][0]*15 && zidanSelfY >= stoneArray[i][1]*15 && zidanSelfY <= stoneArray[i][1]*15+15)){
							  clearInterval(that.zidanInterval);
							  var index = stoneArray.indexOf(stoneArray[i]);
							  var destroyWallLeft = parseInt($('#stone').find('.stoneDiv:eq('+index+')').css('left'))-7;
							  var destroyWallTop = parseInt($('#stone').find('.stoneDiv:eq('+index+')').css('top'))-7;
							  function wallDestroy(){
								  that.zidan.css({
									  'height':'30px',
									  'left':destroyWallLeft,
									  'top':destroyWallTop,
									  'width':'30px',
									  'background':'url("./imgs/tankAll.gif") '+(325+stoneCount*30)*(-1)+'px -4px '});
								  stoneCount++;
								  if(stoneCount >=3){
									  clearInterval(wallDestroyInterval);
									  that.zidan.css({
										  'height':'10px',
										  'width':'6px',
										  });
									  that.zidan.remove();
								  }
							  }
							  var wallDestroyInterval = setInterval(wallDestroy,150);
						  }
					  }
					  //打击到我方基地
					  if(zidanSelfX >= parseInt($('#home').css('left')) && zidanSelfX <= parseInt($('#home').css('left')) + 20 && zidanSelfY >= parseInt($('#home').css('top')) && zidanSelfY <= parseInt($('#home').css('top')) +20){
						  $('#gameOver').css({'display':'block',
							'left':gameWidth/2-30,
							'top':gameHeight/2
						  });
						  that.zidan.remove();
						  $('#home').css('background','url("./imgs/tankAll.gif") -286px 0px');
						  setTimeout('location.reload()',1000);
					  }

					  
		  	   }
		  	   //判断是否把敌方击毁
		  	   function checkEnemyDestroy(){
					if(that.type == 'me'){
						for(var i = 0; i< enemyArray.length ;i++){
					  
						   if(enemyArray[i].live > 0 && zidanSelfY <= enemyArray[i].y+25 && zidanSelfY >= enemyArray[i].y+5 && zidanSelfX <= enemyArray[i].x+25 && zidanSelfX >= enemyArray[i].x +5){
							 clearInterval(that.zidanInterval);
							 that.zidan.remove();
							  enemyArray[i].destroy();
							  sysEnemyTankCount++;
							  $('#number').html(sysEnemyTankCount);
							  break;
						   }
					   }
					}else if(that.type =='enemy'){
		
						if(myTankSys.live > 0 && zidanSelfY <= myTankSys.y+25 && zidanSelfY >= myTankSys.y+5 && zidanSelfX <= myTankSys.x+25 && zidanSelfX >= myTankSys.x +5){
							 clearInterval(that.zidanInterval);
						
							 that.zidan.remove();
							 myTankSys.destroy();
						   }
					}
		  		   
				  
				   
		  	   }
		  	 this.zidanInterval = setInterval(zidango,5);
		  	  
		   },
   }
   
   var gameWidth = 600;
   var gameHeight = 300;
   var enemyArray = [];
   var enemyTankInfoArray = [[180,10,'#enemyTank0',0],[470,10,'#enemyTank1',0],[100,10,'#enemyTank2',0],[400,10,'#enemyTank3',0]]
    var myTankSys;
   jQuery().ready(function(){
	   //创建墙
	   createWall()
	   //创建石墙
	   createStoneWall()
	   //创建家
	   createHome();
	   //坦克
	  var myTank = new Tank((gameWidth-32)/2-40,gameHeight-32);
	   myTank.create();
	   myTankSys = myTank;
	   
	   function initEnemyTank(){
		   for(var i = 0;i < enemyTankInfoArray.length; i++){
			   //if($(enemyTankInfoArray[i][2]).css('display') != 'block'){
				//   $('#gameDiv').append($('<div id='+enemyTankInfoArray[i][2]+' class="enemyTank" style="display:block"></div>'));
				   enemyArray[enemyArray.length] = (new Tank(enemyTankInfoArray[i][0],enemyTankInfoArray[i][1]));
				   enemyArray[enemyArray.length - 1].create(enemyTankInfoArray[i][2],enemyTankInfoArray[i][3]);
				   //setTimeout('enemyArray[enemyArray.length - 1].move()',2200);
				   
			   //}
			   
		   }
	   }
	   initEnemyTank();
	   
	   
	   function start(){
		   for(var j = 0;j < enemyArray.length; j++){
			  if(enemyArray[j].live >0 ){
				  enemyArray[j].attack();
				  
			  }else if(enemyArray[j].live <= 0){	//复活敌方坦克
				 
				  var random = parseInt(Math.random()*10);
				   if(random >= 1){
					   enemyArray[j] = (new Tank(enemyTankInfoArray[j][0],enemyTankInfoArray[j][1]));
					   enemyArray[j].create(enemyTankInfoArray[j][2],enemyTankInfoArray[j][3]);
					   //enemyArray[j].move();
				   }
				  
			  }
		   }
	   }
	   var sysInterval = setInterval(start,3000);
	   document.onkeydown = function(e){
	    	var event = e || window.event;
		   if(event && (event.keyCode == 65 ||event.keyCode == 68 ||event.keyCode == 83 || event.keyCode == 87)){
			   myTank.move(event);
	    	}
		   if(event && event.keyCode == 74){
			   myTank.attack();
			   
		   }
	    	//alert(event.keyCode)
	    }
	   document.onkeyup = function(e){
		   var event = e || window.event;
		   if(event && (event.keyCode == 65 ||event.keyCode == 68 ||event.keyCode == 83 || event.keyCode == 87)){
			   myTank.stop();
		   }
	   }
   })
   
   
   //系统变量
   var wallArray = [];
   var sysEnemyTankCount = 0;
   function createWall(){
	   wallArray = [[1,14],[1,15],[1,17],[1,18],
	                [2,14],[2,15],[2,17],[2,18],
	                [4,4],[4,5],[4,6],[4,7],[4,8],[4,9],[4,10],
                    [5,4],[5,5],[5,6],[5,7],[5,8],[5,9],[5,10],
                    
                    [8,15],[8,16],
                    [9,4],[9,5],[9,6],[9,7],[9,8],[9,9],[9,10], [9,15],[9,16],
                    [10,4],[10,5],[10,6],[10,7],[10,8],[10,9],[10,10],
                    
                    
                    
                    [14,4],[14,5],[14,6],[14,7],[14,8],[14,9],[14,10],
                    [15,4],[15,5],[15,6],[15,7],[15,8],[15,9],[15,10],
                    
                    [19,17],[19,18],[19,19],
                    /*[19,4],[19,5],[19,6],[19,7],[19,8],[19,9],[19,10],[19,17],[19,18],[19,19],
                    [20,4],[20,5],[20,6],[20,7],[20,8],[20,9],[20,10],*/
                    
                    [20,17],
                    [21,17],
                 
                    [22,17],[22,18],[22,19],
                    
                    [24,4],[24,5],[24,6],[24,7],[24,8],[24,9],[24,10],
                    [25,4],[25,5],[25,6],[25,7],[25,8],[25,9],[25,10],
                    
                    
                    
                    [29,4],[29,5],[29,6],[29,7],[29,8],[29,9],[29,10],
                    [30,4],[30,5],[30,6],[30,7],[30,8],[30,9],[30,10],[30,15],[30,16],
                    
                    [31,15],[31,16],
                    
                    [34,4],[34,5],[34,6],[34,7],[34,8],[34,9],[34,10],
                    [35,4],[35,5],[35,6],[35,7],[35,8],[35,9],[35,10],
                    
                    [37,14],[37,15],[37,17],[37,18],
                    [38,14],[38,15],[38,17],[38,18]
                    ];
	   
	   for(var i = 0;i < wallArray.length; i++){
		   var wallDiv = "<div class='wallDiv wallOne' style='position:absolute;left:"+wallArray[i][0]*15+"px;top:"+wallArray[i][1]*15+"px'></div>"
		  // $(wallDiv).css({'left':wallArray[i][0]*15+'px','top':wallArray[i][1]*15+'px'})
		   $('#wall').append(wallDiv);
	   }
   }
   //石墙
   var stoneArray = [];
   function createStoneWall(){
	    stoneArray = 	[[10,12],[10,13],
	                 	 [11,12],[11,13],
	                 	 
	                 	 [19,4],[19,5],
	                 	 [20,4],[20,5],
						 [21,4],[21,5],
						 
						 [28,12],[28,13],
						 [29,12],[29,13],
	                     ]
	   
	   for(var i = 0;i < stoneArray.length; i++){
		   var stoneDiv = "<div class='stoneDiv' style='position:absolute;left:"+stoneArray[i][0]*15+"px;top:"+stoneArray[i][1]*15+"px '></div>";
		   $('#stone').append(stoneDiv);
	   }
   }
   //家
   function createHome(){
	   $('#home').css({'left':gameWidth/2,
						'top':gameHeight-32
		});
	  
   }
