import{s as _,f as d,a as u,l as h,g as p,r as v,c as x,h as C,m as g,d as m,i as r,u as y,n as P,v as f}from"../chunks/scheduler.f5bd93bf.js";import{S,i as b}from"../chunks/index.972eeafd.js";function k(l){let t,o="Checkout complete",n,a,i=l[0].message+"",c;return{c(){t=d("h1"),t.textContent=o,n=u(),a=d("p"),c=h(i)},l(e){t=p(e,"H1",{"data-svelte-h":!0}),v(t)!=="svelte-1yi8buf"&&(t.textContent=o),n=x(e),a=p(e,"P",{});var s=C(a);c=g(s,i),s.forEach(m)},m(e,s){r(e,t,s),r(e,n,s),r(e,a,s),y(a,c)},p(e,[s]){s&1&&i!==(i=e[0].message+"")&&P(c,i)},i:f,o:f,d(e){e&&(m(t),m(n),m(a))}}}function q(l,t,o){let{data:n}=t;return l.$$set=a=>{"data"in a&&o(0,n=a.data)},[n]}class j extends S{constructor(t){super(),b(this,t,q,k,_,{data:0})}}export{j as component};
