!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):((t=t||self).almete=t.almete||{},t.almete.WordCloud=n())}(this,function(){"use strict";var t=Math.PI/180;var n=180/Math.PI;var i=2/Math.PI;var r=2*Math.PI;function o(t,n,i){return Math.ceil(t*Math.abs(Math.sin(i))+n*Math.abs(Math.cos(i)))}function a(t,n,i){return Math.ceil(t*Math.abs(Math.cos(i))+n*Math.abs(Math.sin(i)))}function e(t,n,i,r,o){return[t,n,i,r+"px",o].join(" ")}var h=function(t){this.t=t,this.i()},u={o:{configurable:!0},h:{configurable:!0},u:{configurable:!0},v:{configurable:!0}};u.o.get=function(){return Math.floor((this.s+this.M)/2)},u.h.get=function(){return Math.floor((this.l+this.g)/2)},u.u.get=function(){return this.M-this.s+1},u.v.get=function(){return this.g-this.l+1},h.prototype._=function(t,n,i){for(var r=0;r<t.width;r++)for(var o=0;o<t.height;o++)if(t.data[4*(t.width*o+r)+3]){var a=n+r,e=i+o;this.m[a+"|"+e]=!0,this.s=Math.min(a,this.s),this.l=Math.min(e,this.l),this.M=Math.max(a,this.M),this.g=Math.max(e,this.g)}},h.prototype.p=function(t,n,i){var r=this;return t.every(function(t){var o=t[0],a=t[1],e=n+o,h=i+a;return!r.m[e+"|"+h]})},h.prototype.T=function(t){for(var n=this,i=[],r=0;r<t.width;r++)for(var o=0;o<t.height;o++)t.data[4*(t.width*o+r)+3]&&i.push([r,o]);if(i.length){var a=i.reduce(function(t,n){var i=t[0],r=t[1],o=n[0],a=n[1];return[Math.min(o,i),Math.min(a,r)]}),e=a[0],h=a[1],u=i.reduce(function(t,n){var i=t[0],r=t[1],o=n[0],a=n[1];return[Math.max(o,i),Math.max(a,r)]}),f=u[0],v=u[1],c=i.map(function(t){var n=t[0],i=t[1];return[n-e,i-h]}),s=f-e+1,d=v-h+1,M=function(t,n,i){var r,o,a=t[0],e=t[1],h=n[0],u=n[1];a>e?(r=1,o=e/a):e>a?(o=1,r=a/e):r=o=1;var f=[h,u];if(i(f))return f;for(var v=h,c=u,s=h,d=u,M=v,l=c;;){h-=r,u-=o,v+=r,c+=o;var g=Math.floor(h),_=Math.floor(u),b=Math.ceil(v),m=Math.ceil(c);if(b>M)for(var p=_;p<m;++p){var w=[b,p];if(i(w))return w}if(m>l)for(var x=b;x>g;--x){var y=[x,m];if(i(y))return y}if(g<s)for(var T=m;T>_;--T){var W=[g,T];if(i(W))return W}if(_<d)for(var j=g;j<b;++j){var L=[j,_];if(i(L))return L}s=g,d=_,M=b,l=m}}(this.t,[this.o-Math.floor(s/2),this.h-Math.floor(d/2)],function(t){var i=t[0],r=t[1];return n.p(c,i,r)}),l=M[0],g=M[1];return[l-e,g-h]}return[0,0]},h.prototype.i=function(){this.m={},this.s=1,this.l=1,this.M=0,this.g=0},Object.defineProperties(h.prototype,u);var f=4;return function(u,v,c,s){void 0===s&&(s={});var d=s.createCanvas;void 0===d&&(d=function(){return document.createElement("canvas")});var M=s.fontFamily;void 0===M&&(M="serif");var l=s.fontSizeRatio;void 0===l&&(l=0);var g=s.fontStyle;void 0===g&&(g="normal");var _=s.fontVariant;void 0===_&&(_="normal");var b=s.fontWeight;void 0===b&&(b="normal");var m=s.gap;void 0===m&&(m=0);var p=s.rotation;void 0===p&&(p=0);var w=s.rotationUnit;void 0===w&&(w="turn");var x=s.text;void 0===x&&(x="");var y,T=s.weight;if(void 0===T&&(T=1),v&&c){var W=function(){function t(){this.W=1,this.j=0,this.L=0}var r={O:{configurable:!0},S:{configurable:!0},D:{configurable:!0},F:{configurable:!0},o:{configurable:!0},h:{configurable:!0},u:{configurable:!0},v:{configurable:!0}};return r.O.get=function(){return e(this.R,this.V,this.k,this.W,this.q)},r.S.get=function(){return this.A*this.W},r.D.get=function(){return this.B*n},r.F.get=function(){return this.B*i},r.o.get=function(){return this.j+this.u/2},r.h.get=function(){return this.L+this.v/2},r.u.get=function(){return a(this.S,this.W,this.B)},r.v.get=function(){return o(this.S,this.W,this.B)},t.prototype.C=function(t){var n=t*this.W,i=d();i.width=Math.round(a(n+2*this.W+this.S,n+3*this.W,this.B)),i.height=Math.round(o(n+2*this.W+this.S,n+3*this.W,this.B));var r=i.getContext("2d");return r.translate(i.width/2,i.height/2),r.rotate(this.B),r.font=this.O,r.textAlign="center",r.textBaseline="middle",r.fillText(this.G,0,0),n>0&&(r.miterLimit=1,r.lineWidth=n,r.strokeText(this.G,0,0)),r.getImageData(0,0,i.width,i.height)},Object.defineProperties(t.prototype,r),t}();u=u.map(function(n){var i=n.fontFamily;void 0===i&&(i=M);var o=n.fontStyle;void 0===o&&(o=g);var a=n.fontVariant;void 0===a&&(a=_);var h=n.fontWeight;void 0===h&&(h=b);var u=n.rotation;void 0===u&&(u=p);var f=n.rotationUnit;void 0===f&&(f=w);var v=n.text;void 0===v&&(v=x);var c,s=n.weight;return void 0===s&&(s=T),Object.assign(new W,{q:i,R:o,V:a,k:h,A:(c=d().getContext("2d"),c.font=e(o,a,h,1,i),c.measureText(v).width),B:function(){switch(f){case"deg":return u*t;case"turn":return function(t){return t*r}(u)}return u}(),G:v,H:s})}).filter(function(t){return t.S});var j=function(t){u.forEach(function(n){n.W*=t,n.j*=t,n.L*=t})},L=function(t,n){u.forEach(function(i){i.j+=t,i.L+=n})};if(u.length){var O=u.slice().sort(function(t,n){return n.H-t.H}),S=O[0],D=(y=O)[function(t){return t.length-1}(y)],F=S.H,R=D.H;R<F&&(l=(l=Math.abs(l))>1?l:l>0?1/l:R>0?F/R:F<0?R/F:1+F-R,u.forEach(function(t){var n,i,r;t.W=(n=t.H,((r=1/l)+(n-(i=R))*(1-r)/(F-i))*f)}));var V=new h([v,c]),z=function(t){var n=t.C(0),i=Math.round(t.j-(n.width-t.u)/2),r=Math.round(t.L-(n.height-t.v)/2);V._(n,i,r)};return O.reduce(function(t,n,i){if(n.W<f){do{j(2)}while(n.W<f);V.i(),O.slice(0,i).forEach(function(t){z(t)})}else z(t);return function(t){var n=t.C(2*m),i=V.T(n),r=i[0],o=i[1];t.j=r+(n.width-t.u)/2,t.L=o+(n.height-t.v)/2}(n),n}),z(D),V.u&&V.v&&(L(-V.o,-V.h),j(Math.min(v/V.u,c/V.v)),L(v/2,c/2)),u.map(function(t){return{centerLeft:t.o,centerTop:t.h,font:t.O,fontFamily:t.q,fontSize:t.W,fontStyle:t.R,fontVariant:t.V,fontWeight:t.k,height:t.v,left:t.j,rotationDeg:t.D,rotationRad:t.B,rotationTurn:t.F,text:t.G,textWidth:t.S,top:t.L,weight:t.H,width:t.u}})}}return[]}});
