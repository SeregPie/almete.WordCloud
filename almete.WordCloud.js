!function(t,r){"object"==typeof exports&&"undefined"!=typeof module?module.exports=r():"function"==typeof define&&define.amd?define(r):(t.almete=t.almete||{},t.almete.WordCloud=r())}(this,function(){"use strict";function t(t,r){switch(r){case"deg":return t/360;case"rad":return function(t){return t/2/Math.PI}(t)}return t}function r(r,n,e,i,o,a,f,u,h){return r.map(function(r){var c=r.text;void 0===c&&(c=n);var v=r.weight;void 0===v&&(v=e);var d=r.rotation;void 0===d&&(d=i);var s=r.rotationUnit;void 0===s&&(s=o);var l=r.fontFamily;void 0===l&&(l=a);var g=r.fontStyle;void 0===g&&(g=f);var m=r.fontVariant;void 0===m&&(m=u);var p=r.fontWeight;return void 0===p&&(p=h),{text:c,weight:v,rotationTurn:t(d,s),get rotationDeg(){return 360*this.rotationTurn},get rotationRad(){return 2*this.rotationTurn*Math.PI},fontFamily:l,fontStyle:g,fontVariant:m,fontWeight:p,get font(){return[this.fontStyle,this.fontVariant,this.fontWeight,this.fontSize+"px",this.fontFamily].join(" ")},get rectWidth(){return Math.ceil(this.textWidth*Math.abs(Math.cos(this.rotationRad))+this.fontSize*Math.abs(Math.sin(this.rotationRad)))},get rectHeight(){return Math.ceil(this.textWidth*Math.abs(Math.sin(this.rotationRad))+this.fontSize*Math.abs(Math.cos(this.rotationRad)))},get rectLeft(){return this.left-this.rectWidth/2},get rectTop(){return this.top-this.rectHeight/2}}})}function n(t,r){if(t.length>0)return r&&(t=t.map(r)),t.reduce(function(t,r){return Math.min(t,r)})}function e(t,r){if(t.length>0)return r&&(t=t.map(r)),t.reduce(function(t,r){return Math.max(t,r)})}function i(t,r,n,e,i){return e+(t-r)*(i-e)/(n-r)}function o(t,r,n){var e=t.text,i=t.rotationRad,o=t.font,a=t.rectWidth,f=t.rectHeight,u=n(),h=u.getContext("2d"),c=1+2*a,v=1+2*f;u.width=c,u.height=v,h.translate(c/2,v/2),h.rotate(i),h.font=o,h.textAlign="center",h.textBaseline="middle",h.fillText(e,0,0),r>0&&(h.miterLimit=1,h.lineWidth=2*r,h.strokeText(e,0,0));var d=h.getImageData(0,0,c,v).data;return[d=function(t,r,n){for(var e=new Uint8Array(r*n),i=0,o=t.length;i<o;++i)e[i]=t[4*i+3]?1:0;return e}(d,c,v),c,v]}function a(t){var r;return function(n,e,i){var o,a=function(t,r,n){for(var e=[],i=0;i<r;++i)for(var o=0;o<n;++o)t[r*o+i]&&e.push([i,o]);return e}(n,e,i),f=-Math.floor(e/2),u=-Math.floor(i/2);r?(o=function(t,r,n){var e,i,o=t[0],a=t[1],f=r[0],u=r[1];o>a?(e=1,i=a/o):a>o?(i=1,e=o/a):e=i=1;var h=[f,u];if(n(h))return h;for(var c=f,v=u,d=f,s=u,l=c,g=v;;){f-=e,u-=i,c+=e,v+=i;var m=Math.floor(f),p=Math.floor(u),M=Math.ceil(c),x=Math.ceil(v);if(M>l)for(var w=p;w<x;++w){var W=[M,w];if(n(W))return W}if(x>g)for(var y=M;y>m;--y){var S=[y,x];if(n(S))return S}if(m<d)for(var T=x;T>p;--T){var R=[m,T];if(n(R))return R}if(p<s)for(var z=m;z<M;++z){var b=[z,p];if(n(b))return b}d=m,s=p,l=M,g=x}}(t,[f,u],function(t){var n=t[0],e=t[1];return a.every(function(t){var i=t[0],o=t[1];return!r[n+i+"|"+(e+o)]})}),f=o[0],u=o[1]):r={};return a.forEach(function(t){var n=t[0],e=t[1];r[f+n+"|"+(u+e)]=!0}),[f,u]}}return function(t,f,u,h){void 0===h&&(h={});var c=h.text;void 0===c&&(c="");var v=h.weight;void 0===v&&(v=1);var d=h.rotation;void 0===d&&(d=0);var s=h.rotationUnit;void 0===s&&(s="turn");var l=h.fontFamily;void 0===l&&(l="serif");var g=h.fontStyle;void 0===g&&(g="normal");var m=h.fontVariant;void 0===m&&(m="normal");var p=h.fontWeight;void 0===p&&(p="normal");var M=h.spacing;void 0===M&&(M=0);var x=h.fontSizeRatio;void 0===x&&(x=0);var w=h.createCanvas;if(void 0===w&&(w=function(){return document.createElement("canvas")}),t.length>0&&f>0&&u>0){(t=r(t,c,v,d,s,l,g,m,p)).sort(function(t,r){return r.weight-t.weight});var W=function(t,r){if(t.length>0){var o=n(t,function(t){return t.weight}),a=e(t,function(t){return t.weight});if(o<a&&r>0&&r<1/0)return r<1&&(r=1/r),t.map(function(t){return i(t.weight,o,a,1,r)});if(o>0)return t.map(function(t){return t.weight/o});var f=1+a-o;return t.map(function(t){return i(t.weight,o,a,1,f)})}return[]}(t,x),y=a([f,u]);return t.forEach(function(t,r){t.fontSize=W[r],t.textWidth=function(t,r){var n=t.text,e=t.font,i=r().getContext("2d");return i.font=e,i.measureText(n).width}(t,w);var n=o(t,M,w),e=n[0],i=n[1],a=n[2],f=y(e,i,a),u=f[0],h=f[1];t.left=u+i/2,t.top=h+a/2}),function(t,r,i){var o=n(t,function(t){return t.rectLeft}),a=e(t,function(t){return t.rectLeft+t.rectWidth}),f=a-o,u=a+o,h=n(t,function(t){return t.rectTop}),c=e(t,function(t){return t.rectTop+t.rectHeight}),v=c-h,d=c+h,s=Math.min(r/f,i/v);t.forEach(function(t){t.left-=u/2,t.top-=d/2,t.fontSize*=s,t.textWidth*=s,t.left*=s,t.top*=s,t.left+=r/2,t.top+=i/2})}(t,f,u),t}return[]}});
