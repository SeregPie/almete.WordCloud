!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):(t.almete=t.almete||{},t.almete.WordCloud=n())}(this,function(){"use strict";function t(t,n){switch(n.toLowerCase()){case"rad":return t/2/Math.PI;case"deg":return function(t){return t/360}(t)}return t}function n(n,r,e,i,o,a,f,u,c){return n.map(function(n){var h=n.text;void 0===h&&(h=r);var v=n.weight;void 0===v&&(v=e);var d=n.rotation;void 0===d&&(d=i);var s=n.rotationUnit;void 0===s&&(s=o);var l=n.fontFamily;void 0===l&&(l=a);var g=n.fontStyle;void 0===g&&(g=f);var m=n.fontVariant;void 0===m&&(m=u);var p=n.fontWeight;return void 0===p&&(p=c),{text:h,weight:v,rotationTurn:t(d,s),get rotationRad(){return 2*this.rotationTurn*Math.PI},get rotationDeg(){return 360*this.rotationTurn},fontFamily:l,fontStyle:g,fontVariant:m,fontWeight:p,get font(){return t=this.fontStyle,n=this.fontVariant,r=this.fontWeight,e=this.fontSize,i=this.fontFamily,[t,n,r,e+"px",i].join(" ");var t,n,r,e,i},get rectLeft(){return this.left-this.rectWidth/2},get rectTop(){return this.top-this.rectHeight/2}}})}function r(t,n){if(t.length>0)return n&&(t=t.map(n)),t.reduce(function(t,n){return Math.min(t,n)})}function e(t,n){if(t.length>0)return n&&(t=t.map(n)),t.reduce(function(t,n){return Math.max(t,n)})}function i(t,n,r,e,i){return e+(t-n)*(i-e)/(r-n)}function o(t,n){var r=t.text,e=t.font,i=t.fontSize,o=t.rotationRad,a=n(),f=a.getContext("2d");f.font=e;var u,c,h,v=f.measureText(r).width,d=Math.max(f.measureText("m").width,i),s=(u=v,c=i,h=o,[Math.ceil(u*Math.abs(Math.cos(h))+c*Math.abs(Math.sin(h))),Math.ceil(u*Math.abs(Math.sin(h))+c*Math.abs(Math.cos(h)))]),l=s[0],g=s[1],m=l+2*d,p=g+2*d;a.width=m,a.height=p,f.translate(m/2,p/2),f.rotate(o),f.font=e,f.textAlign="center",f.textBaseline="middle",f.fillText(r,0,0);var M=f.getImageData(0,0,m,p).data;return[v,l,g,M=function(t,n,r){for(var e=new Uint8Array(n*r),i=0,o=t.length;i<o;++i)e[i]=t[4*i+3]?1:0;return e}(M,m,p),m,p]}return function(t,a,f,u){void 0===u&&(u={});var c=u.text;void 0===c&&(c="");var h=u.weight;void 0===h&&(h=1);var v=u.rotation;void 0===v&&(v=0);var d=u.rotationUnit;void 0===d&&(d="rad");var s=u.fontFamily;void 0===s&&(s="serif");var l=u.fontStyle;void 0===l&&(l="normal");var g=u.fontVariant;void 0===g&&(g="normal");var m=u.fontWeight;void 0===m&&(m="normal");var p=u.fontSizeRatio;void 0===p&&(p=0);var M,x,w=u.createCanvas;if(void 0===w&&(w=function(){return document.createElement("canvas")}),t.length>0&&a>0&&f>0){t=n(t,c,h,v,d,s,l,g,m),x=function(t){return-t.weight};var y=function(t,n){var o=r(t,function(t){return t.weight}),a=e(t,function(t){return t.weight});if(o<a&&n>0&&n<1/0)return n<1&&(n=1/n),t.map(function(t){return i(t.weight,o,a,1,n)});if(o>0)return t.map(function(t){return t.weight/o});var f=1+Math.abs(o)+Math.abs(a);return t.map(function(t){return i(t.weight,o,a,1,f)})}(t=t.map(function(t){return[x(t),t]}).sort(function(t,n){var r=t[0],e=n[0];return r>e?1:r<e?-1:0}).map(function(t){return t[1]}),p),W=function(t,n,r){var e,i,o=function(t,n,r){for(var e=[],i=0;i<n;++i)for(var o=0;o<r;++o)t[n*o+i]&&e.push([i,o]);return e}(t,n,r),a=-Math.floor(n/2),f=-Math.floor(r/2);return M?(e=[(i=[a,f])[0],i[1]],a=e[0],f=e[1]):M={},o.forEach(function(t){var n=t[0],r=t[1];M[a+n+"|"+(f+r)]=!0}),[a,f]};return t.forEach(function(t,n){var r=y[n];Object.assign(t,{fontSize:r});var e=o(t,w),i=e[0],a=e[1],f=e[2],u=e[3],c=e[4],h=e[5],v=W(u,c,h),d=v[0]+c/2,s=v[1]+h/2;Object.assign(t,{textWidth:i,rectWidth:a,rectHeight:f,left:d,top:s})}),function(t,n,i){var o=r(t,function(t){return t.rectLeft}),a=e(t,function(t){return t.rectLeft+t.rectWidth}),f=a-o,u=a+o,c=r(t,function(t){return t.rectTop}),h=e(t,function(t){return t.rectTop+t.rectHeight}),v=h-c,d=h+c,s=Math.min(n/f,i/v);t.forEach(function(t){t.left-=u/2,t.top-=d/2,t.fontSize*=s,t.textWidth*=s,t.textHeight*=s,t.rectWidth*=s,t.rectHeight*=s,t.left*=s,t.top*=s,t.left+=n/2,t.top+=i/2})}(t,a,f),t}return[]}});
