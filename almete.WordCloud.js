!function(t,i){"object"==typeof exports&&"undefined"!=typeof module?module.exports=i():"function"==typeof define&&define.amd?define(i):((t=t||self).almete=t.almete||{},t.almete.WordCloud=i())}(this,function(){"use strict";function j(t,i,n){return Math.ceil(t*Math.abs(Math.sin(n))+i*Math.abs(Math.cos(n)))}function L(t,i,n){return Math.ceil(t*Math.abs(Math.cos(n))+i*Math.abs(Math.sin(n)))}function O(t,i,n,r,h){return[t,i,n,r+"px",h].join(" ")}var S=function(t){this.t=t,this.i()},t={n:{configurable:!0},r:{configurable:!0},h:{configurable:!0},o:{configurable:!0}};t.n.get=function(){return Math.floor((this.a+this.e)/2)},t.r.get=function(){return Math.floor((this.u+this.f)/2)},t.h.get=function(){return this.e-this.a+1},t.o.get=function(){return this.f-this.u+1},S.prototype.s=function(t,i,n){for(var r=0;r<t.width;r++)for(var h=0;h<t.height;h++)if(t.data[4*(t.width*h+r)+3]){var o=i+r,a=n+h;this.v[o+"|"+a]=!0,this.a=Math.min(o,this.a),this.u=Math.min(a,this.u),this.e=Math.max(o,this.e),this.f=Math.max(a,this.f)}},S.prototype.c=function(t,o,a){var e=this;return t.every(function(t){var i=t[0],n=t[1],r=o+i,h=a+n;return!e.v[r+"|"+h]})},S.prototype.d=function(t){for(var r=this,h=[],i=0;i<t.width;i++)for(var n=0;n<t.height;n++)t.data[4*(t.width*n+i)+3]&&h.push([i,n]);if(h.length){var o=h.reduce(function(t,i){var n=t[0],r=t[1],h=i[0],o=i[1];return[Math.min(h,n),Math.min(o,r)]}),a=o[0],e=o[1],u=h.reduce(function(t,i){var n=t[0],r=t[1],h=i[0],o=i[1];return[Math.max(h,n),Math.max(o,r)]}),f=u[0],s=u[1];h=h.map(function(t){var i=t[0],n=t[1];return[i-a,n-e]});var v=function(t,i,n){var r,h,o=t[0],a=t[1],e=i[0],u=i[1];a<o?(r=1,h=a/o):r=o<a?(h=1,o/a):h=1;var f=[e,u];if(n(f))return f;for(var s=e,v=u,c=e,d=u,M=s,l=v;;){e-=r,u-=h,s+=r,v+=h;var g=Math.floor(e),b=Math.floor(u),m=Math.ceil(s),p=Math.ceil(v);if(M<m)for(var w=b;w<p;++w){var x=[m,w];if(n(x))return x}if(l<p)for(var y=m;g<y;--y){var T=[y,p];if(n(T))return T}if(g<c)for(var W=p;b<W;--W){var j=[g,W];if(n(j))return j}if(b<d)for(var L=g;L<m;++L){var O=[L,b];if(n(O))return O}c=g,d=b,M=m,l=p}}(this.t,[Math.floor((this.a+this.e+a-f)/2),Math.floor((this.u+this.f+e-s)/2)],function(t){var i=t[0],n=t[1];return r.c(h,i,n)}),c=v[0],d=v[1];return[c-a,d-e]}return[0,0]},S.prototype.i=function(){this.v={},this.a=1,this.u=1,this.e=0,this.f=0},Object.defineProperties(S.prototype,t);return function(r,i,n,t){void 0===t&&(t={});var s=t.createCanvas;void 0===s&&(s=function(){return document.createElement("canvas")});var v=t.fontFamily;void 0===v&&(v="serif");var h=t.fontSizeRatio;void 0===h&&(h=0);var c=t.fontStyle;void 0===c&&(c="normal");var d=t.fontVariant;void 0===d&&(d="normal");var M=t.fontWeight;void 0===M&&(M="normal");var o=t.gap;void 0===o&&(o=0);var l=t.rotation;void 0===l&&(l=0);var g=t.rotationUnit;void 0===g&&(g="turn");var b=t.text;void 0===b&&(b="");var a,e,m=t.weight;if(void 0===m&&(m=1),i&&n){var p=function(){function t(){this.M=1,this.l=0,this.g=0}var i={b:{configurable:!0},m:{configurable:!0},p:{configurable:!0},w:{configurable:!0},n:{configurable:!0},r:{configurable:!0},h:{configurable:!0},o:{configurable:!0}};return i.b.get=function(){return O(this.x,this.y,this.T,this.M,this.W)},i.m.get=function(){return this.j*this.M},i.p.get=function(){return 180*this.L/Math.PI},i.w.get=function(){return this.L/2/Math.PI},i.n.get=function(){return this.l+this.h/2},i.r.get=function(){return this.g+this.o/2},i.h.get=function(){return L(this.m,this.M,this.L)},i.o.get=function(){return j(this.m,this.M,this.L)},t.prototype.O=function(t){var i=t*this.M,n=s();n.width=Math.round(L(i+2*this.M+this.m,i+3*this.M,this.L)),n.height=Math.round(j(i+2*this.M+this.m,i+3*this.M,this.L));var r=n.getContext("2d");return r.translate(n.width/2,n.height/2),r.rotate(this.L),r.font=this.b,r.textAlign="center",r.textBaseline="middle",r.fillText(this.S,0,0),0<i&&(r.miterLimit=1,r.lineWidth=i,r.strokeText(this.S,0,0)),r.getImageData(0,0,n.width,n.height)},t.prototype.d=function(t){var i=this.O(2*o),n=t.d(i),r=n[0],h=n[1];this.l=r+(i.width-this.h)/2,this.g=h+(i.height-this.o)/2},t.prototype.s=function(t){var i=this.O(0),n=Math.round(this.l-(i.width-this.h)/2),r=Math.round(this.g-(i.height-this.o)/2);t.s(i,n,r)},t.prototype.D=function(t){this.M*=t,this.l*=t,this.g*=t},Object.defineProperties(t.prototype,i),t}();if((r=r.map(function(t){var i=t.fontFamily;void 0===i&&(i=v);var n=t.fontStyle;void 0===n&&(n=c);var r=t.fontVariant;void 0===r&&(r=d);var h=t.fontWeight;void 0===h&&(h=M);var o=t.rotation;void 0===o&&(o=l);var a=t.rotationUnit;void 0===a&&(a=g);var e=t.text;void 0===e&&(e=b);var u,f=t.weight;return void 0===f&&(f=m),Object.assign(new p,{W:i,x:n,y:r,T:h,j:(u=s().getContext("2d"),u.font=O(n,r,h,1,i),u.measureText(e).width),L:function(){switch(a){case"deg":return o*Math.PI/180;case"turn":return o*Math.PI*2}return o}(),S:e,F:f})}).filter(function(t){return t.m})).length){var u=r.slice().sort(function(t,i){return i.F-t.F}),f=u[0],w=(a=u)[(e=a,e.length-1)],x=f.F,y=w.F;y<x&&(h=1<(h=Math.abs(h))?h:0<h?1/h:0<y?x/y:x<0?y/x:1+x-y,r.forEach(function(t){var i,n,r;t.M=4*(i=t.F,(r=1/h)+(i-(n=y))*(1-r)/(x-n))}));var T=new S([i,n]);if(u.reduce(function(t,i,n){if(i.M<4){for(;r.forEach(function(t){t.D(2)}),i.M<4;);u.slice(0,n).forEach(function(t){t.s(T)})}else t.s(T);return i.d(T),i}),w.s(T),T.h&&T.o){var W=Math.min(i/T.h,n/T.o);r.forEach(function(t){t.l-=T.n,t.g-=T.r,t.D(W),t.l+=i/2,t.g+=n/2})}return r.map(function(t){return{centerLeft:t.n,centerTop:t.r,font:t.b,fontFamily:t.W,fontSize:t.M,fontStyle:t.x,fontVariant:t.y,fontWeight:t.T,height:t.o,left:t.l,rotationDeg:t.p,rotationRad:t.L,rotationTurn:t.w,text:t.S,textWidth:t.m,top:t.g,weight:t.F,width:t.h}})}}return[]}});
