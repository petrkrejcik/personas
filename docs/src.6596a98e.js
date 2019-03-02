parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"Iw//":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.setState=exports.dispatchUpdate=exports.getState=exports.addListener=void 0;const t=[];let e={googleSyncEnabled:!1,isSignedIn:!1,persons:[]};const s=()=>e;exports.getState=s;const o=t=>{e={...e,...t},p()};exports.setState=o;const p=()=>{t.forEach(t=>{t(s())})};exports.dispatchUpdate=p;const r=e=>{t.push(e)};exports.addListener=r;
},{}],"QH5V":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.fetchData=exports.init=exports.connect=void 0;const e="App-Personas";let n=Function;const i=(e={})=>(t(e),new Promise((e,n)=>{gapi.load("client:auth2",()=>{s().then(e)})}));exports.init=i;const t=({onSignInChange:e})=>{e&&(n=e)},s=()=>(console.info("👉","finding session..."),new Promise((e,n)=>{gapi.client.init({apiKey:"AIzaSyBYItpNT8k2Y2AEHz2E2kI2EqMULh5C4m0",discoveryDocs:["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],clientId:"614338309616-st9nui22tf3sa1cm9m1l3nd439n50frg.apps.googleusercontent.com",scope:"https://www.googleapis.com/auth/drive.file"}).then(()=>{gapi.auth2.getAuthInstance().isSignedIn.listen(o),o(gapi.auth2.getAuthInstance().isSignedIn.get()),e({isInitiated:!0})})})),o=e=>{n(e)},a=()=>{console.info("👉","manual connect"),gapi.auth2.getAuthInstance().isSignedIn.get()?(console.info("👉","already logged"),c()):(console.info("👉","signign in..."),gapi.auth2.getAuthInstance().signIn())};exports.connect=a;const c=()=>l().then(r).then(g);exports.fetchData=c;const l=()=>new Promise((e,n)=>{gapi.client.drive.files.list({q:"name='App-Personas' and trashed=false"}).execute(n=>{0===n.files.length?p().then(e):e(n.files[0].id)})}),p=()=>new Promise((n,i)=>{console.info("👉","creating");const t={name:e,mimeType:"application/vnd.google-apps.folder"};gapi.client.drive.files.create({resource:t}).execute(e=>{console.info("👉","created",e),n(e.id)})}),r=e=>new Promise((n,i)=>{console.info("👉","folderId",e),gapi.client.drive.files.list({q:`name="persons.json" and '${e}' in parents`}).execute(e=>{console.info("👉","find file response",e),0===e.files.length?n(null):n(e.files[0])})}),g=e=>new Promise((n,i)=>{gapi.client.drive.files.get({fileId:e.id,alt:"media"}).execute(e=>{const i=e.result.map(e=>({...e,name:unescape(e.name)}));n(i)})});
},{}],"thyU":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.setup=exports.libLoaded=void 0;var e=require("./google-drive-api.js"),t=require("./state.js");const n=()=>{(0,t.addListener)(s),r().addEventListener("click",e.connect)};exports.setup=n;const o=()=>{const n={onSignInChange:a};(0,e.init)(n).then(e=>{const{isInitiated:n}=e;(0,t.setState)({googleSyncEnabled:n})})};exports.libLoaded=o;const s=e=>{d(e.googleSyncEnabled)},i=e=>{(0,t.setState)({persons:e,isLoading:!1})},a=n=>{n?((0,t.setState)({isSignedIn:n,isLoading:!0}),(0,e.fetchData)().then(i)):(0,t.setState)({isSignedIn:n,isLoading:!1})},d=e=>{e&&r().removeAttribute("disabled")},r=()=>document.querySelector('button[data-prs="googleDriveButton"]');
},{"./google-drive-api.js":"QH5V","./state.js":"Iw//"}],"xLSG":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.renderPersons=exports.clearPersons=void 0;const e=e=>{const r=document.querySelector(".persons");e.sort(t).map(n).forEach(e=>r.appendChild(e))};exports.renderPersons=e;const t=(e,t)=>e.birthday&&t.birthday?o(e.birthday)-o(t.birthday):0,n=e=>{const t=document.createElement("div");return t.classList.add("person"),[r(e.name),s(e.birthday),...d(e.customTexts)].filter(Boolean).forEach(e=>t.appendChild(e)),t},r=e=>{const t=a(e);return t.classList.add("person-title"),t},a=e=>{const t=document.createElement("div");return t.innerHTML=e,t},s=e=>{if(!e)return null;const t=Date.now(),n=new Date(e).getTime(),r=new Date(t-n),a=Math.abs(r.getUTCFullYear()-1970),s=document.createElement("div");return s.innerHTML=`Age: ${a}<br />Birthday in ${o(e)} days (${e})`,s},o=e=>{if(!e)return null;const t=new Date(e),n=(new Date).getUTCFullYear(),r=Date.now()-new Date(`${n}-${t.getMonth()+1}-${t.getDate()}`).getTime();let a;if(r<0)a=Math.abs(Math.ceil(r/1e3/60/60/24));else{const e=Date.now()-new Date(`${n+1}-${t.getMonth()+1}-${t.getDate()}`).getTime();a=Math.abs(Math.ceil(e/1e3/60/60/24))}return a},i=e=>{const t=Date.now(),n=new Date(e).getTime(),r=Math.round((t-n)/1e3/60/60/24),a=document.createElement("div"),s=document.createElement("button");return s.innerText="Dnes",s.addEventListener("click",()=>{console.info("👉","resettings")}),a.innerHTML=`Viděli jsme se před: ${r} dny.`,a.appendChild(s),a},d=e=>e?e.map(a):[],c=()=>{document.querySelector(".persons").innerHTML=""};exports.clearPersons=c;
},{}],"xFxm":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.setup=void 0;var e=require("./state.js");const o={overlay:{selector:'div[data-prs="overlay"]',show:"flex"},loader:{selector:'div[data-prs="loader"]',show:"block"},singIn:{selector:'button[data-prs="googleDriveButton"]',show:"block"}},s=e=>{t(o.loader,e.isLoading),t(o.singIn,!e.isSignedIn),t(o.overlay,e.isLoading||!e.isSignedIn)},t=(e,o)=>{document.querySelector(e.selector).style.display=o?e.show:"none"},r=()=>{(0,e.addListener)(s)};exports.setup=r;
},{"./state.js":"Iw//"}],"H99C":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"googleLibLoaded",{enumerable:!0,get:function(){return r.libLoaded}}),exports.setup=void 0;var e=require("./state.js"),r=require("./google-drive-model.js"),s=require("./persons-view.js"),o=require("./overlay.js");const t=()=>{(0,r.setup)(),(0,o.setup)(),(0,e.addListener)(i)};exports.setup=t;const i=e=>{n(e.persons)},n=e=>{(0,s.clearPersons)(),(0,s.renderPersons)(e)};
},{"./state.js":"Iw//","./google-drive-model.js":"thyU","./persons-view.js":"xLSG","./overlay.js":"xFxm"}]},{},["H99C"], "prs")
//# sourceMappingURL=/personas/src.6596a98e.map