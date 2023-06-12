"use strict";(self.webpackChunkweb=self.webpackChunkweb||[]).push([[625],{8625:function(n,e,t){t.r(e),t.d(e,{default:function(){return N}});var i,s=t(4942),r=t(1413),c=t(885),o=t(168),d=t(2791),u=t(71),l=t(2978),a=t(3023),h=t(8586),x=t(1068),f=t(6871),j=t(9970),m=t(629),p=t(1484),b=t(144),g=t(9478),v=t(7820),k=t(2482),y=t(9696),C=t(3953),S=t(6856),Z=t(7691),w=t(184),I=Z.ZP.div(i||(i=(0,o.Z)(["\n  display: flex;\n  flex-direction: row;\n  justify-content: ",";\n  align-items: ",";\n  height: ",";\n  padding: ",";\n  width: ",";\n  margin: ",";\n  ","\n"])),(function(n){return n.justifyContent}),(function(n){return n.alignItems}),(function(n){return n.height}),(function(n){return n.padding}),(function(n){return n.width}),(function(n){return n.margin}),(function(n){return n.link&&"cursor:pointer;"}));function N(){var n=(0,f.s0)(),e=(0,l.I0)(),t=((0,l.v9)((function(n){return n.reducer.auth.token})),(0,d.useState)([])),i=(0,c.Z)(t,2),o=i[0],Z=i[1],N=(0,l.oR)(),A=(0,x.d)().setModal,B=(0,d.useState)({}),E=(0,c.Z)(B,2),M=E[0],P=E[1],_=(0,d.useState)(!1),z=(0,c.Z)(_,2),F=z[0],J=z[1],L=(0,y.UV)(),R=L.data,U=L.isLoading,D=(L.isSuccess,(0,y.X)()),T=D.data,W=D.isLoading,G=(D.isSuccess,(0,y.dt)()),K=(0,c.Z)(G,1)[0],O=(0,y.Mg)(),V=(0,c.Z)(O,1)[0],X=(0,d.useMemo)((function(){return null!==R&&void 0!==R&&R.results?R.results[0]:null}),[R]);(0,d.useEffect)((function(){Z(T)}),[T]),(0,d.useEffect)((function(){var n={};o.forEach((function(e){var t=e.id;n[t]=!1})),P({})}),[P]);(0,d.useEffect)((function(){!function(){var n={};o.forEach((function(e){var t=e.id;n[t]=F})),P(n)}()}),[F]);return(0,w.jsxs)(w.Fragment,{children:[(0,w.jsxs)(I,{padding:"15px 24px",alignItems:"center",justifyContent:"space-between",className:"flex_column",children:[(0,w.jsxs)(I,{alignItems:"center",children:[(0,w.jsx)(S.dWm,{style:{cursor:"pointer"},onClick:function(){return n(-1)},size:25}),(0,w.jsx)(a.Dx,{fontWeight:"650",margin:"8px 0px 0px 40px",children:"My Buddies"})]}),(0,w.jsxs)(I,{children:[(0,w.jsx)(v.Z,{options:[{Icon:m,text:"My Buddies",onClick:function(){n("/home/my-buddies")}},{Icon:b,text:"My transactions",onClick:function(){n("/home/transactions")}},{Icon:g,text:"Send Feedback",onClick:function(){n("/home/send/feedback")}},{Icon:p,text:"Logout",onClick:function(){e((0,j.kS)()),n("/")}}]}),(0,w.jsx)(a.hU,{onClick:function(){n("/home/notifications")},children:(0,w.jsx)(u.bI9,{size:20})})]})]}),Boolean(U||W)?(0,w.jsx)(C.Z,{}):(0,w.jsxs)(w.Fragment,{children:[(0,w.jsxs)(I,{justifyContent:"space-between",alignItems:"center",width:"100%",margin:"24px 0 12px",className:"mt-0",children:[(0,w.jsx)(a.nv,{bold:!0,fontSize:"24px",color:"#000",children:"All Buddies"}),(0,w.jsx)(a.zx,{color:"#00A652",onClick:function(){var e;"active"===(null===X||void 0===X||null===(e=X.subscription)||void 0===e?void 0:e.status)||o.length<2?A((0,w.jsx)(h.ZB,{addBuddies:K,store:N})):A((0,w.jsx)(k.Z,{message:"Please Subscribe for adding more buddies \u263a\ufe0f",buttonText:"Subscribe",onSubmit:function(){n("/subscriptions")}}))},children:"+ Add new Buddy"})]}),(0,w.jsx)("div",{className:"table_responsive",children:(0,w.jsxs)(h.iA,{children:[(0,w.jsx)("thead",{children:(0,w.jsxs)(h.U8,{children:[(0,w.jsx)("th",{children:(0,w.jsx)(a.Jg,{checked:F,onChange:function(){return J(!F)}})}),(0,w.jsx)("th",{children:"Contact Name"}),(0,w.jsx)("th",{children:"Relation"}),(0,w.jsx)("th",{children:"Phone Number"}),(0,w.jsx)("th",{children:"Email"}),(0,w.jsx)("th",{children:"Member Type"})]})}),(0,w.jsx)("tbody",{children:null===o||void 0===o?void 0:o.map((function(n,e){var t,i,c;return(0,w.jsxs)(h.sh,{children:[(0,w.jsx)("td",{children:(0,w.jsx)(a.Jg,{checked:!0===M[n.id],onChange:function(){return e=n.id,void P((function(n){return(0,r.Z)((0,r.Z)({},n),{},(0,s.Z)({},e,!n[e]))}));var e}})}),(0,w.jsx)("td",{children:(0,w.jsxs)(I,{alignItems:"center",children:[n.profile_picture&&(0,w.jsx)(a.Ee,{width:"36px",height:"36px",borderRadius:"50%",objectFit:"cover",src:n.profile_picture,alt:"Person"}),n.buddydetail?n.buddydetail.username:"N/A"]})}),(0,w.jsx)("td",{children:null!==(t=n.relationship)&&void 0!==t?t:"N/A"}),(0,w.jsx)("td",{children:n.buddydetail?n.buddydetail.phone_number:"N/A"}),(0,w.jsx)("td",{children:null!==(i=n.email)&&void 0!==i?i:"N/A"}),(0,w.jsx)("td",{children:1===n.member_type?"General member":null!==(c="Sub prime")?c:"N/A"}),(0,w.jsx)("td",{children:(0,w.jsx)(a.lK,{options:[{text:"Promote SubPrime",onClick:function(){}},{text:"Delete",onClick:function(){var e;e=n.id,V(e).unwrap().then().catch((function(n){console.log(n),alert(JSON.stringify(n))}))}}]})})]},e)}))})]})})]})]})}}}]);
//# sourceMappingURL=625.dc2fd737.chunk.js.map