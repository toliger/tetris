!function(t){var e={};function s(i){if(e[i])return e[i].exports;var h=e[i]={i:i,l:!1,exports:{}};return t[i].call(h.exports,h,h.exports,s),h.l=!0,h.exports}s.m=t,s.c=e,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:i})},s.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=0)}([function(t,e,s){"use strict";function i(t){let e=0;for(let s=0;s<t.length;s+=1)t[s][0]>e&&(e=t[s][0]);return e}function h(t){let e=t[0][0];for(let s=0;s<t.length;s+=1)t[s][0]<e&&(e=t[s][0]);return e}function r(t){let e=0;for(let s=0;s<t.length;s+=1)t[s][1]>e&&(e=t[s][1]);return e}function o(t){let e=t[0][1];for(let s=0;s<t.length;s+=1)t[s][1]<e&&(e=t[s][1]);return e}function a(t){let e=0,s=0;for(let i=0;i<t.length;i+=1)t[i][0]>e&&(e=t[i][0],s=i);return t[s]}function c(t){let e=t[0][0],s=0;for(let i=0;i<t.length;i+=1)t[i][0]<e&&(e=t[i][0],s=i);return t[s]}function n(t){let e=0,s=0;for(let i=0;i<t.length;i+=1)t[i][1]>e&&(e=t[i][1],s=i);return t[s]}s.r(e);class l{constructor(t,e,s="#d4f442"){this.shape=[],this.offset=0,this.lcol=[],this.rcol=[],this.dcol=[],this.x=t,this.y=e,this.color=s,this.alpha=1}rotate(){this.offset=this.offset+1>3?0:this.offset+1}getRotated(){return 3===this.offset?this.shape[0]:this.shape[this.offset+1]}moveLeft(){this.x-=1}moveRight(){this.x+=1}moveDown(){this.y+=1}decreaseAlpha(t){this.alpha=t&&this.alpha-.07>=0?this.alpha-.07:0}static getMaxXFromArray(t){let e=0;for(let s=0;s<t.length;s+=1)t[s][0]>e&&(e=t[s][0]);return e}static getMinXFromArray(t){let e=t[0][0];for(let s=0;s<t.length;s+=1)t[s][0]<e&&(e=t[s][0]);return e}static getMaxYFromArray(t){let e=0;for(let s=0;s<t.length;s+=1)t[s][1]>e&&(e=t[s][1]);return e}static getMinYFromArray(t){let e=t[0][1];for(let s=0;s<t.length;s+=1)t[s][1]<e&&(e=t[s][1]);return e}static getMaxXPos(t){let e=0,s=0;for(let i=0;i<t.length;i+=1)t[i][0]>e&&(e=t[i][0],s=i);return t[s]}static getMinXPos(t){let e=t[0][0],s=0;for(let i=0;i<t.length;i+=1)t[i][0]<e&&(e=t[i][0],s=i);return t[s]}static getMaxYPos(t){let e=0,s=0;for(let i=0;i<t.length;i+=1)t[i][1]>e&&(e=t[i][1],s=i);return t[s]}static getMinYPos(t){let e=t[0][1],s=0;for(let i=0;i<t.length;i+=1)t[i][1]<e&&(e=t[i][1],s=i);return t[s]}getCollideElements(){for(let t=0;t<4;t+=1){const e=[],s=[],l=[],p=i(this.shape[t]),u=r(this.shape[t]),d=h(this.shape[t]);for(let i=o(this.shape[t]);i<=u;i+=1){const h=this.shape[t].filter(t=>t[1]===i);s.push(c(h)),e.push(a(h))}this.lcol.push(s),this.rcol.push(e);for(let e=d;e<=p;e+=1){const s=this.shape[t].filter(t=>t[0]===e);l.push(n(s))}this.dcol.push(l)}}getCollisionBlocks(t){switch(t){case"L":return this.lcol[this.offset];case"R":return this.rcol[this.offset];case"D":return this.dcol[this.offset];default:return"BUGGG"}}}class p extends l{constructor(t,e){super(t,e),this.initShapes(),this.getCollideElements()}initShapes(){this.shape.push([[0,1],[1,1],[1,0],[2,1]]),this.shape.push([[1,0],[1,1],[1,2],[2,1]]),this.shape.push([[0,1],[1,1],[1,2],[2,1]]),this.shape.push([[0,1],[1,0],[1,1],[1,2]])}}class u extends l{constructor(t,e){super(t,e),this.initShapes(),this.getCollideElements()}initShapes(){this.shape.push([[0,1],[1,1],[2,1],[2,0]]),this.shape.push([[1,0],[1,1],[1,2],[2,2]]),this.shape.push([[0,1],[1,1],[2,1],[0,2]]),this.shape.push([[0,0],[1,0],[1,1],[1,2]])}}class d extends l{constructor(t,e){super(t,e),this.initShapes(),this.getCollideElements()}initShapes(){this.shape.push([[0,0],[0,1],[1,1],[2,1]]),this.shape.push([[1,0],[1,1],[1,2],[2,0]]),this.shape.push([[0,1],[1,1],[2,1],[2,2]]),this.shape.push([[1,0],[1,1],[1,2],[0,2]])}}class f extends l{constructor(t,e){super(t,e),this.initShapes(),this.getCollideElements()}initShapes(){this.shape.push([[0,0],[1,0],[1,1],[2,1]]),this.shape.push([[1,1],[1,2],[2,0],[2,1]]),this.shape.push([[0,1],[1,1],[1,2],[2,2]]),this.shape.push([[0,1],[0,2],[1,0],[1,1]])}}class g extends l{constructor(t,e){super(t,e),this.initShapes(),this.getCollideElements()}initShapes(){this.shape.push([[0,1],[1,1],[1,0],[2,0]]),this.shape.push([[1,0],[1,1],[2,1],[2,2]]),this.shape.push([[0,2],[1,2],[1,1],[2,1]]),this.shape.push([[0,0],[0,1],[1,1],[1,2]])}}class m extends l{constructor(t,e){super(t,e),this.initShapes(),this.getCollideElements()}initShapes(){this.shape.push([[0,1],[1,1],[2,1],[3,1]]),this.shape.push([[2,0],[2,1],[2,2],[2,3]]),this.shape.push([[0,2],[1,2],[2,2],[3,2]]),this.shape.push([[1,0],[1,1],[1,2],[1,3]])}}class w extends l{constructor(t,e){super(t,e),this.initShapes(),this.getCollideElements()}initShapes(){this.shape.push([[0,0],[0,1],[1,0],[1,1]]),this.shape.push([[0,0],[0,1],[1,0],[1,1]]),this.shape.push([[0,0],[0,1],[1,0],[1,1]]),this.shape.push([[0,0],[0,1],[1,0],[1,1]])}}var x=(t,e)=>Math.floor(Math.random()*e)+t,k=t=>{if(t<10)return`${t}`;switch(t){case 10:return"a";case 11:return"b";case 12:return"c";case 13:return"d";case 14:return"e";case 15:return"f";default:return"0"}};class y{constructor(t,e){$("#mainBoard").css({width:`${e}px`,height:`${t}px`}),$("<canvas>").attr({id:"map"}).css({width:`${e}px`,height:`${t}px`,border:"1px gray double"}).appendTo("#mainBoard");const s=document.getElementById("map");s.width=e,s.height=t,this.ctx=s.getContext("2d")}}class v{constructor(){this.lscore=0,this.pscore=0}updateDisplay(){$("#score").html(this.pscore),$("#lines").html(this.lscore)}set score(t){this.pscore+=20*t,this.updateDisplay()}get score(){return this.pscore}set lines(t){this.lscore=t,this.pscore+=100,this.updateDisplay()}get lines(){return this.lscore}}class b extends y{constructor(t=700,e=400){super(t,e),this.score=new v,this.piece={},this.size={real:{height:t,width:e},abstract:{height:33,width:20}},this.pieces=[new u(8,0),new g(8,0),new f(8,0),new p(8,0),new m(8,0),new w(8,0),new d(8,0)],this.map=this.generateMapArrayDebug(),this.position={x:$("#map").position().top,y:$("#map").position().left},this.blindmode=!1,this.bmode=!1,this.level=0}generateMapArray(){const t=[];t.push([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]);for(let e=0;e<this.size.abstract.height;e+=1)t.push([1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]);return t.push([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]),t}generateMapArrayDebug(){const t=[];t.push([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]);for(let e=0;e<this.size.abstract.height-1;e+=1)t.push([1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]);return t.push([1,[1,"#000000"],0,0,0,[1,"#000000"],[1,"#000000"],[1,"#000000"],[1,"#000000"],[1,"#000000"],[1,"#000000"],[1,"#000000"],[1,"#000000"],[1,"#000000"],[1,"#000000"],[1,"#000000"],[1,"#000000"],[1,"#000000"],[1,"#000000"],[1,"#000000"],[1,"#000000"],1]),t.push([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]),t}clearBoard(){this.ctx.clearRect(0,0,this.size.real.width,this.size.real.height)}drawWallGrind(){this.ctx.fillStyle="#f4c842",this.ctx.fillRect(0,0,this.size.real.width,this.size.real.height),this.ctx.fillStyle="#8c701c",this.ctx.font="80px Arial",this.ctx.textAlign="center",this.ctx.fillText("Wall Grind",this.size.real.width/2,this.size.real.height/2)}drawWall(){this.ctx.globalAlpha=1;for(let t=1;t<this.size.abstract.height+1;t+=1)for(let e=1;e<this.size.abstract.width+1;e+=1){const s=this.map[t][e];if(0!==s){this.ctx.fillStyle=s[1];const i=this.size.real.width/this.size.abstract.width,h=this.size.real.height/this.size.abstract.height;this.ctx.fillRect((e-1)*i,(t-1)*h,i,h)}}}drawPiece(){const t=this.piece;this.ctx.fillStyle=this.piece.color,this.ctx.globalAlpha=this.piece.alpha;const e=t.offset,s=this.size.real.width/this.size.abstract.width,i=this.size.real.height/this.size.abstract.height;for(const h in t.shape[e]){const r=(t.shape[e][h][0]+this.piece.x)*s,o=(t.shape[e][h][1]+this.piece.y)*i;this.ctx.fillRect(r,o,s,i)}}update(){this.clearBoard(),this.drawWall(),this.drawPiece()}newPiece(){this.piece.x=8,this.piece.y=0,this.piece=this.pieces[x(0,6)],this.piece.color=function(){let t="#";for(let e=0;e<6;e+=1)t+=k(x(0,15));return t}(),this.piece.alpha=1}getPos(t){const e=[];for(let s=0;s<t.length;s+=1)e.push([this.piece.x+t[s][0],this.piece.y+t[s][1]]);return e}addPieceToMap(t){for(const e in t)this.map[t[e][1]+1][t[e][0]+1]=[1,this.piece.color]}checkLeftSide(){const t=this.getPos(this.piece.getCollisionBlocks("L"));for(const e in t)if(0!==this.map[t[e][1]+1][t[e][0]])return!1;return!0}checkRightSide(){const t=this.getPos(this.piece.getCollisionBlocks("R"));for(const e in t)if(0!==this.map[t[e][1]+1][t[e][0]+2])return!1;return!0}checkRotate(){const t=this.getPos(this.piece.getRotated());for(const e in t)if(0!==this.map[t[e][1]+1][t[e][0]+1])return!1;return!0}removeLine(t){this.map.splice(t,1),this.map.splice(1,0,[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1])}checkLines(t){for(const e in this.map[t])if(0===this.map[t][e])return;this.removeLine(t),this.score.lines+=1}checkBottomSide(){const t=this.getPos(this.piece.getCollisionBlocks("D"));for(const e in t)if(0!==this.map[t[e][1]+2][t[e][0]+1])return this.addPieceToMap(this.getPos(this.piece.shape[this.piece.offset])),this.checkLines(t[e][1]+1),this.score.score=this.blindmode?2:1,this.newPiece(),!1;return!0}mvLeft(){this.checkLeftSide()&&this.piece.moveLeft()}mvRight(){this.checkRightSide()&&this.piece.moveRight()}mvDown(){this.checkBottomSide()&&(this.piece.moveDown(),this.piece.decreaseAlpha(this.blindmode))}rotate(){this.checkRotate()&&this.piece.rotate()}}class B{constructor(){this.music=new Audio("../ressources/flamingo_8-bit.mp3")}play(){this.music.play()}}class S{constructor(){this.socket=io("https://api.wallgrind.fr"),this.on(),this.emit()}on(){this.socket.on("connection",t=>{console.log("socket",t)}),this.socket.on("message",t=>{console.log(" waza message");const e=$("#textBox");let s=$("#usrinput").val();s=""===s?"Anonymous":s,$("#textBox").append(`<p><span class="username">${s} : </span>${t}</p>`),e.scrollTop(e.prop("scrollHeight"))})}emit(){this.socket.emit("connection"),$("#chatinput").keypress(t=>{"Enter"!==t.key||t.shiftKey||(t.preventDefault(),this.socket.emit("message",$("#chatinput").val()),$("#chatinput").val(""))}),$("#chatbutton").on("click",()=>{this.socket.emit("message",$("#chatinput").val()),$("#chatinput").val("")})}}$(document).ready(()=>{const t=new class{constructor(){this.gameBoard=new b,this.drawLogo(),this.socket=new S,this.difficulty=0}drawLogo(){this.gameBoard.clearBoard(),this.gameBoard.drawWallGrind()}startgame(){$("#checkBlind").is(":checked")&&(this.gameBoard.blindmode=!0),$("#checkBmode").is(":checked")&&(this.gameBoard.bmode=!0),this.gameBoard.clearBoard(),this.gameBoard.newPiece(),this.gameBoard.update(),this.tick(),this.music=new B,this.music.play()}pieceController(){this.gameBoard.mvDown(),this.gameBoard.update()}tick(){const t=this;!function e(){t.pieceController(),setTimeout(e,1e3/(1+2*t.difficulty))}()}},e=t.gameBoard;$(document).keydown(t=>{switch(t.key){case"z":case"ArrowUp":e.rotate(),e.update(),t.preventDefault();break;case"q":case"ArrowLeft":e.mvLeft(),e.update(),t.preventDefault();break;case"d":case"ArrowRight":e.mvRight(),e.update(),t.preventDefault();break;case"s":case"ArrowDown":e.mvDown(),e.update(),t.preventDefault();break;case"h":console.log(e.map),t.preventDefault()}}),$("#diffSelect").change(()=>{t.difficulty=$("#diffSelect").val()}),$("#settings").on("click",()=>{$(".settings").slideToggle(),$("#settings i").toggleClass("fa-angle-down").toggleClass("fa-angle-up")}),$("#start").on("click",()=>{t.startgame()})})}]);