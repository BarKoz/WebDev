parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"mpVp":[function(require,module,exports) {
var i=document.getElementById("canvas"),e=i.getContext("2d"),o={scale:70,x:12,y:8};i.height=o.y*o.scale,i.width=o.x*o.scale;var t={speed:500,howFastSpeedUp:25,position:[{x:3,y:2},{x:2,y:2},{x:1,y:2}],direction:"right",lastDirection:"right",score:0,lastScore:0,bestScore:0},s={position:void 0,premiumPosition:void 0,premiumTimer:0},n=setTimeout(r,1e3);function c(){if(f(),S(),d(t.position[0]),S(),P())return clearInterval(n),k(),t.lastScore>t.bestScore&&(t.bestScore=t.lastScore),void a();p(),u(),y(),t.lastDirection=t.direction}function l(){clearInterval(n),i.removeEventListener("click",l,!1),n=setInterval(c,t.speed)}function r(){p(),m(),i.addEventListener("click",l,!1)}function a(){e.textAlign="center",e.font="50px Arial",e.fillStyle="rgb(255,255,255)",e.fillText("You Score: "+t.lastScore,i.width/2,i.height/2),e.fillText("Best Score: "+t.bestScore,i.width/2,i.height/2+50),e.fillText("Click to new game :)",i.width/2,i.height/2+100),i.addEventListener("click",l,!1)}function p(){e.clearRect(0,0,i.width,i.height),e.fillStyle="rgb(0,0,0)",e.fillRect(0,0,o.x*o.scale,o.y*o.scale)}function m(){e.textAlign="center",e.font="40px Arial",e.fillStyle="rgb(255,255,255)",e.fillText("Click to play!",i.width/2,i.height/2)}function u(){for(var i=0;i<t.position.length;i++)e.fillStyle="rgb(0,200,0)",e.fillRect(t.position[i].x*o.scale+1,t.position[i].y*o.scale+1,o.scale-2,o.scale-2);switch(e.fillStyle="rgb(39,108,200)",t.direction){case"right":e.fillRect(t.position[0].x*o.scale+.75*o.scale,t.position[0].y*o.scale+.3*o.scale,5,5),e.fillRect(t.position[0].x*o.scale+.75*o.scale,t.position[0].y*o.scale+.65*o.scale,5,5);break;case"left":e.fillRect(t.position[0].x*o.scale+.25*o.scale,t.position[0].y*o.scale+.3*o.scale,5,5),e.fillRect(t.position[0].x*o.scale+.25*o.scale,t.position[0].y*o.scale+.65*o.scale,5,5);break;case"up":e.fillRect(t.position[0].x*o.scale+.3*o.scale,t.position[0].y*o.scale+.25*o.scale,5,5),e.fillRect(t.position[0].x*o.scale+.65*o.scale,t.position[0].y*o.scale+.25*o.scale,5,5);break;case"down":e.fillRect(t.position[0].x*o.scale+.3*o.scale,t.position[0].y*o.scale+.75*o.scale,5,5),e.fillRect(t.position[0].x*o.scale+.65*o.scale,t.position[0].y*o.scale+.75*o.scale,5,5);break;default:console.log("Draw snake.direction error")}}function y(){if(void 0===s.position){do{s.position={x:x(o.x),y:x(o.y)}}while(h(s.position));s.premiumTimer=0}if(e.fillStyle="rgb(200,200,200)",e.fillRect(s.position.x*o.scale+1,s.position.y*o.scale+1,o.scale-2,o.scale-2),!(t.score%50)){if(void 0===s.premiumPosition)do{s.premiumPosition={x:x(o.x),y:x(o.y)}}while(h(s.premiumPosition)||g(s.premiumPosition));s.premiumTimer++,s.premiumTimer<16&&(e.fillStyle="rgb(210,214,27)",e.beginPath(),e.moveTo(s.premiumPosition.x*o.scale+.5*o.scale,s.premiumPosition.y*o.scale),e.lineTo(s.premiumPosition.x*o.scale+.6*o.scale,s.premiumPosition.y*o.scale+.3*o.scale),e.lineTo(s.premiumPosition.x*o.scale+o.scale,s.premiumPosition.y*o.scale+.25*o.scale),e.lineTo(s.premiumPosition.x*o.scale+.7*o.scale,s.premiumPosition.y*o.scale+.55*o.scale),e.lineTo(s.premiumPosition.x*o.scale+.9*o.scale,s.premiumPosition.y*o.scale+o.scale),e.lineTo(s.premiumPosition.x*o.scale+.5*o.scale,s.premiumPosition.y*o.scale+.7*o.scale),e.lineTo(s.premiumPosition.x*o.scale+.1*o.scale,s.premiumPosition.y*o.scale+o.scale),e.lineTo(s.premiumPosition.x*o.scale+.3*o.scale,s.premiumPosition.y*o.scale+.55*o.scale),e.lineTo(s.premiumPosition.x*o.scale,s.premiumPosition.y*o.scale+.25*o.scale),e.lineTo(s.premiumPosition.x*o.scale+.4*o.scale,s.premiumPosition.y*o.scale+.3*o.scale),e.fill())}}function f(){switch(t.direction){case"right":t.position.unshift({x:t.position[0].x+1,y:t.position[0].y});break;case"left":t.position.unshift({x:t.position[0].x-1,y:t.position[0].y});break;case"up":t.position.unshift({x:t.position[0].x,y:t.position[0].y-1});break;case"down":t.position.unshift({x:t.position[0].x,y:t.position[0].y+1});break;default:console.log("Error moveSnake()")}t.position.pop()}function d(i){-1===i.x&&(i.x=o.x-1),i.x===o.x&&(i.x=0),-1===i.y&&(i.y=o.y-1),i.y===o.y&&(i.y=0)}function x(i){return Math.floor(Math.random()*i)}function h(i){for(var e=0;e<t.position.length;e++)if(t.position[e].x===i.x&&t.position[e].y===i.y)return!0;return!1}function g(i){return i.x===s.position.x&&i.y===s.position.y}function v(i){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return void 0!==i&&(t.position[0].x===i.x&&t.position[0].y===i.y&&e<15)}function w(){s.position=void 0,t.position.push({x:t.position[t.position.length],y:t.position[t.position.length]})}function S(){v(s.position)?(T(10),w()):v(s.premiumPosition,s.premiumTimer)&&(T(20),s.premiumPosition=void 0)}function P(){for(var i=1;i<t.position.length;i++)if(t.position[i].x===t.position[0].x&&t.position[i].y===t.position[0].y)return!0;return!1}function b(){clearInterval(n),t.howFastSpeedUp>0&&(t.speed-=t.howFastSpeedUp,t.howFastSpeedUp--),n=setInterval(c,t.speed)}function T(i){t.score+=i,document.querySelector("h1").innerHTML="Score: "+t.score,b()}function k(){t={speed:500,howFastSpeedUp:25,position:[{x:3,y:2},{x:2,y:2},{x:1,y:2}],direction:"right",lastDirection:"right",score:0,lastScore:t.score,bestScore:t.bestScore},s={position:void 0,premiumPosition:void 0,premiumTimer:0},document.querySelector("h1").innerHTML="Score: "+t.score,clearInterval(n)}window.addEventListener("keydown",function(i){switch(i.code){case"ArrowLeft":case"KeyA":"right"!==t.direction&&"right"!==t.lastDirection&&(t.direction="left");break;case"ArrowUp":case"KeyW":"down"!==t.direction&&"down"!==t.lastDirection&&(t.direction="up");break;case"ArrowRight":case"KeyD":"left"!==t.direction&&"left"!==t.lastDirection&&(t.direction="right");break;case"ArrowDown":case"KeyS":"up"!==t.direction&&"up"!==t.lastDirection&&(t.direction="down")}},!1);
},{}]},{},["mpVp"], null)