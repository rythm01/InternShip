"use strict";(self.webpackChunkweb=self.webpackChunkweb||[]).push([[10],{2762:function(e,n,t){t.d(n,{r:function(){return f}});var i,o,r,l,s=t(2791),c=["title","titleId"];function d(){return d=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i])}return e},d.apply(this,arguments)}function a(e,n){if(null==e)return{};var t,i,o=function(e,n){if(null==e)return{};var t,i,o={},r=Object.keys(e);for(i=0;i<r.length;i++)t=r[i],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)t=r[i],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}function u(e,n){var t=e.title,u=e.titleId,f=a(e,c);return s.createElement("svg",d({width:58,height:58,viewBox:"0 0 58 58",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:n,"aria-labelledby":u},f),t?s.createElement("title",{id:u},t):null,i||(i=s.createElement("circle",{cx:29,cy:29,r:29,fill:"#F5F5F5"})),o||(o=s.createElement("circle",{cx:29,cy:29,r:28.5,stroke:"black",strokeOpacity:.05})),r||(r=s.createElement("path",{d:"M20 38L38 20",stroke:"#292D32",strokeWidth:2.5,strokeLinecap:"round",strokeLinejoin:"round"})),l||(l=s.createElement("path",{d:"M38 38L20 20",stroke:"#292D32",strokeWidth:2.5,strokeLinecap:"round",strokeLinejoin:"round"})))}var f=s.forwardRef(u);t.p},5501:function(e,n,t){var i=t(1413),o=t(885),r=t(2791),l=t(7486),s=t(4554),c=t(3023),d=t(2762),a=t(9696),u=t(184),f={position:"absolute",transform:"translate(-50%, -50%)",height:"369px",width:"669px",left:"50%",top:"50%",borderRadius:"20px",backgroundColor:"white",outline:"none",boxShadow:30,p:"45px 15px 25px 15px"};n.Z=function(e){var n=e.open,t=e.close,x=e.folder,p=(0,r.useState)(""),h=(0,o.Z)(p,2),g=h[0],m=h[1],b=(0,a.Kw)(),j=(0,o.Z)(b,1)[0];console.log(x),(0,r.useEffect)((function(){m(x.name)}),[x]);return(0,u.jsx)(l.Z,{open:n,onClose:t,keepMounted:!0,"aria-labelledby":"simple-modal-title","aria-describedby":"simple-modal-description",children:(0,u.jsxs)(s.Z,{style:f,children:[(0,u.jsx)(c.Dx,{fontWeight:"700",margin:"16px 0",children:"Rename Folder"}),(0,u.jsx)(d.r,{style:{position:"absolute",right:20,top:10,cursor:"pointer"},onClick:t}),(0,u.jsxs)(s.Z,{sx:{backgroundColor:"#f5f5f5",p:3,m:3,borderRadius:"20px"},children:[(0,u.jsx)(c.BZ,{width:"545px",label:"Title",placeholder:"Type here",value:g,onChange:function(e){return m(e.target.value)}}),(0,u.jsx)(c.X2,{justifyContent:"flex-end",children:(0,u.jsx)(c.zx,{color:"#00A652",onClick:function(){if(!g)return alert("Please enter a folder name");j((0,i.Z)((0,i.Z)({},x),{},{name:g})).unwrap().then((function(){m(""),t()})).catch((function(){m(""),t()}))},children:"Rename"})})]})]})})}},7637:function(e,n,t){t.d(n,{Z:function(){return C}});var i=t(2982),o=t(885),r=t(1413),l=t(168),s=t(2791),c=t(4554),d=t(7691),a=t(241),u=t(7992),f=t(9696);var x,p,h=t.p+"static/media/close_icon.7d546417947a574b6f7250c3ab5af05d.svg",g=t(8987),m=t(2978),b=t(184),j=d.ZP.span(x||(x=(0,l.Z)(['\n  font-family: "TT Commons";\n  font-style: "normal";\n  font-size: 16px;\n  font-weight: ',";\n  color: black;\n  line-height: 30px;\n  margin-bottom: 0;\n"])),(function(e){return e.fontWeight||500})),v=d.ZP.span(p||(p=(0,l.Z)(['\n  font-family: "TT Commons";\n  font-style: "normal";\n  font-size: 20px;\n  color: black;\n  margin: auto 0;\n  font-weight: 600;\n  line-height: 30px;\n']))),y={control:function(e,n){return(0,r.Z)((0,r.Z)({},e),{},{boxShadow:"none",boxSizing:"border-box",borderColor:"#eef3f7",backgroundColor:"#f5f8fa",borderRadius:"0px",paddingLeft:5,height:"50px",fontSize:"1.15rem",fontWeight:500,cursor:"pointer",transition:"0.2s ease-in-out",border:"1px solid rgba(235, 235, 235, 0.42)",color:"#E0E0E0","&:hover":{borderColor:"#eef3f7",backgroundColor:"#00A65"},"&:focus":{outline:"none",backgroundColor:"#eef3f7"}})},placeholder:function(e,n){return(0,r.Z)((0,r.Z)({},e),{},{color:"#999db7",fontWeight:"light",fontSize:"16px"})},option:function(e,n){return(0,r.Z)((0,r.Z)({},e),{},{color:(n.isSelected||n.isFocused,"black"),backgroundColor:(n.isSelected||n.isFocused,"white"),cursor:"pointer",transition:".2s ease-in-out",margin:0,borderColor:"white",boxShadow:"rgba(10,6,5,0)",borderRadius:"0px"})},menu:function(e,n){return{margin:0,marginTop:"0px",marginBottom:"0px",border:"none",borderWidth:"none",outline:"0px solid transparent",boxShadow:"0 5px 15px 5px #f5f5f5"}},singleValue:function(e,n){return(0,r.Z)((0,r.Z)({},e),{},{color:"#5e6278",border:"0"})}},w=function(e){var n=e.name,t=e.profilePicture;return(0,b.jsxs)(c.Z,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"10px"},children:[(0,b.jsxs)(c.Z,{sx:{display:"flex",alignItems:"center",gap:"10px"},children:[(0,b.jsx)(c.Z,{sx:{width:"30px",height:"30px",borderRadius:"50%",overflow:"hidden"},children:t?(0,b.jsx)("img",{style:{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"},src:t}):(0,b.jsx)("img",{style:{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"},src:g})}),(0,b.jsx)(j,{children:n})]}),"Only Me"!==n&&(0,b.jsx)("img",{style:{width:"20px",height:"20px",cursor:"pointer"},src:h})]})},C=function(e){var n=e.details,t=(0,s.useState)(!1),r=(0,o.Z)(t,2),l=r[0],d=r[1],x=(0,s.useState)([]),p=(0,o.Z)(x,2),h=p[0],C=p[1],k=(0,m.v9)((function(e){return e.reducer.auth.user})),Z=(0,f.X)().data;(0,s.useEffect)((function(){d(!1),C([])}),[n]);var S=(0,s.useMemo)((function(){return Boolean(null===Z||void 0===Z?void 0:Z.length)?Z.filter((function(e){var t;return!Boolean(null===n||void 0===n||null===(t=n.sharedWith)||void 0===t?void 0:t.length)||(null===n||void 0===n?void 0:n.sharedWith.every((function(n){return n.id!==e.id})))})).map((function(e){return{value:e.id,label:e.buddydetail.username,image:e.buddydetail.profile_picture}})):[]}),[Z,n.sharedWith]),P=(0,s.useMemo)((function(){return Boolean(h.length)?S.filter((function(e){return h.every((function(n){return e.value!==n.value}))})):S}),[S,h]);return(0,b.jsxs)(c.Z,{width:"100%",height:"70vh",sx:{boxShadow:"0.5px 0.5px 0.5px #f5f5f5",borderRadius:"15px",paddingX:"20px",paddingY:"10px",border:"1px solid #f5f5f5",backgroundColor:"white",marginTop:"10px",overflowY:"auto"},children:[(0,b.jsx)(v,{children:"Details"}),(0,b.jsx)("hr",{style:{border:"none",borderTop:"1px solid rgba(0, 0, 0, 0.05)"}}),(0,b.jsx)(j,{fontWeight:"600",children:"Uploaded on: 12/03/2022"}),(0,b.jsxs)(c.Z,{sx:{marginTop:"10px"},children:[(0,b.jsx)(j,{fontWeight:"600",children:"Shared with"}),n.sharedWith.length?n.sharedWith.map((function(e){return(0,b.jsx)(w,{name:e.buddydetail.username,profilePicture:e.buddydetail.profile_picture})})):(0,b.jsx)(w,{name:"Only Me",profilePicture:k.imageUrl||k.profile_picture})]}),Boolean(l&&P)&&(0,b.jsx)("div",{style:{marginTop:"20px"},children:(0,b.jsx)(u.ZP,{styles:y,closeMenuOnSelect:!1,components:{DropdownIndicator:function(){return null},IndicatorSeparator:function(){return null},SingleValue:function(){return null}},placeholder:"Add Buddies",onChange:function(e){C([].concat((0,i.Z)(h),[e]))},formatOptionLabel:function(e){return(0,b.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[(0,b.jsx)("div",{style:{width:"30px",height:"30px",borderRadius:"50%",overflow:"hidden"},children:e.image?(0,b.jsx)("img",{style:{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"},src:e.image,alt:"Profile picture"}):(0,b.jsx)("img",{style:{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"},src:g,alt:"Profile picture"})}),(0,b.jsx)(j,{children:e.label})]})},options:P})}),h&&h.map((function(e){return(0,b.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"10px",marginTop:"10px"},className:"country-option",children:[(0,b.jsx)("div",{style:{width:"30px",height:"30px",borderRadius:"50%",overflow:"hidden"},children:e.image?(0,b.jsx)("img",{style:{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"},src:e.image,alt:"Profile picture"}):(0,b.jsx)("img",{style:{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"},src:g,alt:"Profile picture"})}),(0,b.jsx)(j,{children:e.label})]})})),(0,b.jsx)(a.Z,{color:"#00A652",margin:"20px 0 0 0",onClick:function(){return d(!0)},children:l?"Add":"+ Add Buddies"})]})}},7010:function(e,n,t){t.r(n),t.d(n,{default:function(){return I}});var i=t(885),o=t(168),r=t(2791),l=t(71),s=t(6871),c=t(3023),d=t(9970),a=t(629),u=t(1484),f=t(144),x=t(9478),p=t(7820),h=t(8609),g=t(9305);var m=t.p+"static/media/file.b140744ca52678571f8decf2f8d2afc0.svg",b=t(2978),j=t(4554),v=t(8852),y=t(9696),w=t(7486);t.p;t.p;t.p;t.p;var C,k=t(2762),Z=t(5501),S=(t(7637),t(7691)),P=t(184),F=S.ZP.div(C||(C=(0,o.Z)(["\n  display: flex;\n  flex-direction: row;\n  justify-content: ",";\n  align-items: ",";\n  height: ",";\n  padding: ",";\n  width: ",";\n  margin: ",";\n  ","\n"])),(function(e){return e.justifyContent}),(function(e){return e.alignItems}),(function(e){return e.height}),(function(e){return e.padding}),(function(e){return e.width}),(function(e){return e.margin}),(function(e){return e.link&&"cursor:pointer;"}));function I(){var e=(0,s.s0)(),n=(0,b.I0)(),t=(0,r.useState)(!1),o=(0,i.Z)(t,2),C=o[0],S=o[1],I=(0,r.useState)(!1),T=(0,i.Z)(I,2),W=T[0],O=T[1],R=(0,r.useState)({}),z=(0,i.Z)(R,2),B=z[0],D=z[1],E=(0,r.useState)(""),M=(0,i.Z)(E,2),L=M[0],A=M[1],N=(0,y.yC)(),U=(0,i.Z)(N,1)[0],_=((0,b.v9)((function(e){return e.reducer.auth.token})),(0,y.we)()),V=(0,i.Z)(_,1)[0],X=(0,y.VW)().data,K=null!==X&&void 0!==X&&X.results?X.results:[];return(0,P.jsxs)(P.Fragment,{children:[(0,P.jsxs)(F,{padding:"15px 24px",alignItems:"center",justifyContent:"space-between",className:"flex_column",children:[(0,P.jsxs)(F,{alignItems:"center",children:[(0,P.jsx)(h.Z,{}),(0,P.jsx)(c.Dx,{fontWeight:"650",margin:"8px 0px 0px 60px",children:"Uploaded Folders"})]}),(0,P.jsxs)(F,{children:[(0,P.jsx)(p.Z,{options:[{Icon:a,text:"My Buddies",onClick:function(){e("/home/my-buddies")}},{Icon:f,text:"My transactions",onClick:function(){e("/home/transactions")}},{Icon:x,text:"Send Feedback",onClick:function(){e("/home/send/feedback")}},{Icon:u,text:"Logout",onClick:function(){n((0,d.kS)()),e("/")}}]}),(0,P.jsx)(c.hU,{onClick:function(){e("/home/notifications")},children:(0,P.jsx)(l.bI9,{size:20})})]})]}),!Boolean(K.length)&&(0,P.jsx)(F,{justifyContent:"flex-end",children:(0,P.jsx)(c.zx,{color:"#00A652",onClick:function(){return S(!0)},children:"+ Create New Folder"})}),Boolean(K.length)?(0,P.jsxs)(F,{justifyContent:"space-between",children:[(0,P.jsx)("div",{children:(0,P.jsx)(j.Z,{width:"100%",height:"auto",sx:{display:"flex",flexWrap:"wrap"},children:null===K||void 0===K?void 0:K.map((function(n,t){return(0,P.jsxs)("div",{style:{position:"relative"},children:[(0,P.jsx)("div",{onClick:function(){return e("/home/documents/folder/".concat(n.id))},children:(0,P.jsxs)(v.Z,{width:"274px",height:"173px",flexDirection:"column",justifyContent:"flex-start",alignItems:"flex-start",padding:"10px",margin:"10px",borderRadius:"7px",children:[(0,P.jsx)("div",{style:{width:"100%",display:"flex",justifyContent:"space-between"},children:(0,P.jsx)("div",{style:{width:"40px",height:"40px",borderRadius:"50%",backgroundColor:"#ffeeea"},children:(0,P.jsx)("img",{width:"20px",height:"20px",src:g,style:{paddingTop:"10px",paddingLeft:"10px"}})})}),(0,P.jsx)(c.Dx,{fontSize:"22px",margin:"20px 0px 0px 3px",lineHeight:"38px",fontWeight:"600",fontFamily:"TT Commons",children:n.name}),(0,P.jsxs)(c.nv,{fontSize:"16px",margin:"10px 0px 0px 3px",children:[n.files.length," file"]})," "]},t)}),(0,P.jsx)(c.lK,{color:"rgba(0, 0, 0, 0.4)",orientation:"horizontal",options:[{text:"Open",onClick:function(){e("/home/documents/folder/".concat(n.id))}},{text:"Rename",onClick:function(){!function(e){D(e),O(!0)}(n)}},{text:"Delete",onClick:function(){U(n.id)}},{text:"Make a Copy",onClick:function(){}}],position:"absolute"})]})}))})}),(0,P.jsx)(F,{justifyContent:"flex-end",children:(0,P.jsx)("div",{style:{display:"flex",flexDirection:"column"},children:(0,P.jsx)(c.zx,{color:"#00A652",margin:"0",onClick:function(){return S(!0)},children:"+ Create New Folder"})})})]}):(0,P.jsx)(P.Fragment,{children:(0,P.jsx)(F,{height:"100vh",children:(0,P.jsxs)("div",{style:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",height:"100%",width:"100%"},children:[(0,P.jsx)("div",{style:{width:"160px",height:"160px"},children:(0,P.jsx)("img",{style:{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"},src:m})}),(0,P.jsx)("div",{className:"text-center",children:(0,P.jsx)("h1",{style:{fontFamily:"TT Commons",fontWeight:400,fontSize:"24px"},children:"Uploaded file will be displayed here"})})]})})}),(0,P.jsx)(w.Z,{open:C,onClose:function(){return S(!1)},keepMounted:!0,"aria-labelledby":"simple-modal-title","aria-describedby":"simple-modal-description",children:(0,P.jsxs)(j.Z,{style:{position:"absolute",transform:"translate(-50%, -50%)",height:"369px",width:"669px",left:"50%",top:"50%",borderRadius:"20px",backgroundColor:"white",outline:"none",boxShadow:30,p:"45px 15px 25px 15px"},className:"modal",children:[(0,P.jsx)(c.Dx,{fontWeight:"700",margin:"16px auto 0 25px",children:"Create New Folder"}),(0,P.jsx)(k.r,{style:{position:"absolute",right:20,top:10,cursor:"pointer"},onClick:function(){return S(!1)}}),(0,P.jsxs)(j.Z,{sx:{backgroundColor:"#f5f5f5",p:3,m:3,borderRadius:"20px"},children:[(0,P.jsx)(c.BZ,{width:"545px",label:"Title",placeholder:"Type here",value:L,onChange:function(e){return A(e.target.value)}}),(0,P.jsx)(F,{justifyContent:"flex-end",children:(0,P.jsx)(c.zx,{color:"#00A652",onClick:function(){V(L).unwrap().then((function(){S(!1),A("")})).catch((function(){S(!1),A("")}))},children:"Create"})})]})]})}),(0,P.jsx)(Z.Z,{open:W,close:function(){O(!1),D({})},folder:B})]})}},8852:function(e,n,t){var i,o=t(168),r=t(7691).ZP.div(i||(i=(0,o.Z)(["\n  position: relative;\n  display: flex;\n  flex-direction: ",";\n  justify-content: ",";\n  align-items: ",";\n  width: ",";\n  height: ",";\n  border: ",";\n  background: white;\n  box-shadow: 0.5px 0.5px 0.5px #f5f5f5;\n  border-radius: ",";\n  cursor: pointer;\n  margin: ",";\n  padding: ",";\n  flex-shrink: 0;\n  z-index:1\n"])),(function(e){var n;return null!==(n=e.flexDirection)&&void 0!==n?n:"column"}),(function(e){var n;return null!==(n=e.justifyContent)&&void 0!==n?n:"center"}),(function(e){var n;return null!==(n=e.alignItems)&&void 0!==n?n:"center"}),(function(e){return e.width}),(function(e){return e.height}),(function(e){return"1px solid ".concat(e.isSelected?"#00a652":"#f5f5f5")}),(function(e){var n;return null!==(n=e.borderRadius)&&void 0!==n?n:"10px"}),(function(e){var n;return null!==(n=e.margin)&&void 0!==n?n:"0"}),(function(e){var n;return null!==(n=e.padding)&&void 0!==n?n:"0"}));n.Z=r}}]);
//# sourceMappingURL=10.e64fc213.chunk.js.map