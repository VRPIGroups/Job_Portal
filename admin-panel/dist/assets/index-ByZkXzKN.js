function up(e,t){for(var n=0;n<t.length;n++){const r=t[n];if(typeof r!="string"&&!Array.isArray(r)){for(const s in r)if(s!=="default"&&!(s in e)){const l=Object.getOwnPropertyDescriptor(r,s);l&&Object.defineProperty(e,s,l.get?l:{enumerable:!0,get:()=>r[s]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const l of s)if(l.type==="childList")for(const i of l.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(s){const l={};return s.integrity&&(l.integrity=s.integrity),s.referrerPolicy&&(l.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?l.credentials="include":s.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(s){if(s.ep)return;s.ep=!0;const l=n(s);fetch(s.href,l)}})();function dp(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var iu={exports:{}},fa={},ou={exports:{}},V={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Wr=Symbol.for("react.element"),fp=Symbol.for("react.portal"),pp=Symbol.for("react.fragment"),hp=Symbol.for("react.strict_mode"),mp=Symbol.for("react.profiler"),gp=Symbol.for("react.provider"),xp=Symbol.for("react.context"),yp=Symbol.for("react.forward_ref"),vp=Symbol.for("react.suspense"),wp=Symbol.for("react.memo"),jp=Symbol.for("react.lazy"),_o=Symbol.iterator;function kp(e){return e===null||typeof e!="object"?null:(e=_o&&e[_o]||e["@@iterator"],typeof e=="function"?e:null)}var cu={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},uu=Object.assign,du={};function Wn(e,t,n){this.props=e,this.context=t,this.refs=du,this.updater=n||cu}Wn.prototype.isReactComponent={};Wn.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Wn.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function fu(){}fu.prototype=Wn.prototype;function wi(e,t,n){this.props=e,this.context=t,this.refs=du,this.updater=n||cu}var ji=wi.prototype=new fu;ji.constructor=wi;uu(ji,Wn.prototype);ji.isPureReactComponent=!0;var Ro=Array.isArray,pu=Object.prototype.hasOwnProperty,ki={current:null},hu={key:!0,ref:!0,__self:!0,__source:!0};function mu(e,t,n){var r,s={},l=null,i=null;if(t!=null)for(r in t.ref!==void 0&&(i=t.ref),t.key!==void 0&&(l=""+t.key),t)pu.call(t,r)&&!hu.hasOwnProperty(r)&&(s[r]=t[r]);var o=arguments.length-2;if(o===1)s.children=n;else if(1<o){for(var c=Array(o),u=0;u<o;u++)c[u]=arguments[u+2];s.children=c}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)s[r]===void 0&&(s[r]=o[r]);return{$$typeof:Wr,type:e,key:l,ref:i,props:s,_owner:ki.current}}function bp(e,t){return{$$typeof:Wr,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function bi(e){return typeof e=="object"&&e!==null&&e.$$typeof===Wr}function Sp(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var To=/\/+/g;function Fa(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Sp(""+e.key):t.toString(36)}function ks(e,t,n,r,s){var l=typeof e;(l==="undefined"||l==="boolean")&&(e=null);var i=!1;if(e===null)i=!0;else switch(l){case"string":case"number":i=!0;break;case"object":switch(e.$$typeof){case Wr:case fp:i=!0}}if(i)return i=e,s=s(i),e=r===""?"."+Fa(i,0):r,Ro(s)?(n="",e!=null&&(n=e.replace(To,"$&/")+"/"),ks(s,t,n,"",function(u){return u})):s!=null&&(bi(s)&&(s=bp(s,n+(!s.key||i&&i.key===s.key?"":(""+s.key).replace(To,"$&/")+"/")+e)),t.push(s)),1;if(i=0,r=r===""?".":r+":",Ro(e))for(var o=0;o<e.length;o++){l=e[o];var c=r+Fa(l,o);i+=ks(l,t,n,c,s)}else if(c=kp(e),typeof c=="function")for(e=c.call(e),o=0;!(l=e.next()).done;)l=l.value,c=r+Fa(l,o++),i+=ks(l,t,n,c,s);else if(l==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return i}function rs(e,t,n){if(e==null)return e;var r=[],s=0;return ks(e,r,"","",function(l){return t.call(n,l,s++)}),r}function Np(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var Ce={current:null},bs={transition:null},Cp={ReactCurrentDispatcher:Ce,ReactCurrentBatchConfig:bs,ReactCurrentOwner:ki};function gu(){throw Error("act(...) is not supported in production builds of React.")}V.Children={map:rs,forEach:function(e,t,n){rs(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return rs(e,function(){t++}),t},toArray:function(e){return rs(e,function(t){return t})||[]},only:function(e){if(!bi(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};V.Component=Wn;V.Fragment=pp;V.Profiler=mp;V.PureComponent=wi;V.StrictMode=hp;V.Suspense=vp;V.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Cp;V.act=gu;V.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=uu({},e.props),s=e.key,l=e.ref,i=e._owner;if(t!=null){if(t.ref!==void 0&&(l=t.ref,i=ki.current),t.key!==void 0&&(s=""+t.key),e.type&&e.type.defaultProps)var o=e.type.defaultProps;for(c in t)pu.call(t,c)&&!hu.hasOwnProperty(c)&&(r[c]=t[c]===void 0&&o!==void 0?o[c]:t[c])}var c=arguments.length-2;if(c===1)r.children=n;else if(1<c){o=Array(c);for(var u=0;u<c;u++)o[u]=arguments[u+2];r.children=o}return{$$typeof:Wr,type:e.type,key:s,ref:l,props:r,_owner:i}};V.createContext=function(e){return e={$$typeof:xp,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:gp,_context:e},e.Consumer=e};V.createElement=mu;V.createFactory=function(e){var t=mu.bind(null,e);return t.type=e,t};V.createRef=function(){return{current:null}};V.forwardRef=function(e){return{$$typeof:yp,render:e}};V.isValidElement=bi;V.lazy=function(e){return{$$typeof:jp,_payload:{_status:-1,_result:e},_init:Np}};V.memo=function(e,t){return{$$typeof:wp,type:e,compare:t===void 0?null:t}};V.startTransition=function(e){var t=bs.transition;bs.transition={};try{e()}finally{bs.transition=t}};V.unstable_act=gu;V.useCallback=function(e,t){return Ce.current.useCallback(e,t)};V.useContext=function(e){return Ce.current.useContext(e)};V.useDebugValue=function(){};V.useDeferredValue=function(e){return Ce.current.useDeferredValue(e)};V.useEffect=function(e,t){return Ce.current.useEffect(e,t)};V.useId=function(){return Ce.current.useId()};V.useImperativeHandle=function(e,t,n){return Ce.current.useImperativeHandle(e,t,n)};V.useInsertionEffect=function(e,t){return Ce.current.useInsertionEffect(e,t)};V.useLayoutEffect=function(e,t){return Ce.current.useLayoutEffect(e,t)};V.useMemo=function(e,t){return Ce.current.useMemo(e,t)};V.useReducer=function(e,t,n){return Ce.current.useReducer(e,t,n)};V.useRef=function(e){return Ce.current.useRef(e)};V.useState=function(e){return Ce.current.useState(e)};V.useSyncExternalStore=function(e,t,n){return Ce.current.useSyncExternalStore(e,t,n)};V.useTransition=function(){return Ce.current.useTransition()};V.version="18.3.1";ou.exports=V;var v=ou.exports;const xu=dp(v),Ep=up({__proto__:null,default:xu},[v]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var _p=v,Rp=Symbol.for("react.element"),Tp=Symbol.for("react.fragment"),Pp=Object.prototype.hasOwnProperty,zp=_p.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Lp={key:!0,ref:!0,__self:!0,__source:!0};function yu(e,t,n){var r,s={},l=null,i=null;n!==void 0&&(l=""+n),t.key!==void 0&&(l=""+t.key),t.ref!==void 0&&(i=t.ref);for(r in t)Pp.call(t,r)&&!Lp.hasOwnProperty(r)&&(s[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)s[r]===void 0&&(s[r]=t[r]);return{$$typeof:Rp,type:e,key:l,ref:i,props:s,_owner:zp.current}}fa.Fragment=Tp;fa.jsx=yu;fa.jsxs=yu;iu.exports=fa;var a=iu.exports,gl={},vu={exports:{}},Be={},wu={exports:{}},ju={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(z,S){var T=z.length;z.push(S);e:for(;0<T;){var B=T-1>>>1,H=z[B];if(0<s(H,S))z[B]=S,z[T]=H,T=B;else break e}}function n(z){return z.length===0?null:z[0]}function r(z){if(z.length===0)return null;var S=z[0],T=z.pop();if(T!==S){z[0]=T;e:for(var B=0,H=z.length,Y=H>>>1;B<Y;){var ge=2*(B+1)-1,_e=z[ge],Xe=ge+1,Re=z[Xe];if(0>s(_e,T))Xe<H&&0>s(Re,_e)?(z[B]=Re,z[Xe]=T,B=Xe):(z[B]=_e,z[ge]=T,B=ge);else if(Xe<H&&0>s(Re,T))z[B]=Re,z[Xe]=T,B=Xe;else break e}}return S}function s(z,S){var T=z.sortIndex-S.sortIndex;return T!==0?T:z.id-S.id}if(typeof performance=="object"&&typeof performance.now=="function"){var l=performance;e.unstable_now=function(){return l.now()}}else{var i=Date,o=i.now();e.unstable_now=function(){return i.now()-o}}var c=[],u=[],d=1,h=null,y=3,j=!1,x=!1,m=!1,w=typeof setTimeout=="function"?setTimeout:null,f=typeof clearTimeout=="function"?clearTimeout:null,p=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function g(z){for(var S=n(u);S!==null;){if(S.callback===null)r(u);else if(S.startTime<=z)r(u),S.sortIndex=S.expirationTime,t(c,S);else break;S=n(u)}}function b(z){if(m=!1,g(z),!x)if(n(c)!==null)x=!0,F(E);else{var S=n(u);S!==null&&q(b,S.startTime-z)}}function E(z,S){x=!1,m&&(m=!1,f(C),C=-1),j=!0;var T=y;try{for(g(S),h=n(c);h!==null&&(!(h.expirationTime>S)||z&&!N());){var B=h.callback;if(typeof B=="function"){h.callback=null,y=h.priorityLevel;var H=B(h.expirationTime<=S);S=e.unstable_now(),typeof H=="function"?h.callback=H:h===n(c)&&r(c),g(S)}else r(c);h=n(c)}if(h!==null)var Y=!0;else{var ge=n(u);ge!==null&&q(b,ge.startTime-S),Y=!1}return Y}finally{h=null,y=T,j=!1}}var P=!1,_=null,C=-1,I=5,L=-1;function N(){return!(e.unstable_now()-L<I)}function D(){if(_!==null){var z=e.unstable_now();L=z;var S=!0;try{S=_(!0,z)}finally{S?U():(P=!1,_=null)}}else P=!1}var U;if(typeof p=="function")U=function(){p(D)};else if(typeof MessageChannel<"u"){var M=new MessageChannel,ke=M.port2;M.port1.onmessage=D,U=function(){ke.postMessage(null)}}else U=function(){w(D,0)};function F(z){_=z,P||(P=!0,U())}function q(z,S){C=w(function(){z(e.unstable_now())},S)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(z){z.callback=null},e.unstable_continueExecution=function(){x||j||(x=!0,F(E))},e.unstable_forceFrameRate=function(z){0>z||125<z?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):I=0<z?Math.floor(1e3/z):5},e.unstable_getCurrentPriorityLevel=function(){return y},e.unstable_getFirstCallbackNode=function(){return n(c)},e.unstable_next=function(z){switch(y){case 1:case 2:case 3:var S=3;break;default:S=y}var T=y;y=S;try{return z()}finally{y=T}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(z,S){switch(z){case 1:case 2:case 3:case 4:case 5:break;default:z=3}var T=y;y=z;try{return S()}finally{y=T}},e.unstable_scheduleCallback=function(z,S,T){var B=e.unstable_now();switch(typeof T=="object"&&T!==null?(T=T.delay,T=typeof T=="number"&&0<T?B+T:B):T=B,z){case 1:var H=-1;break;case 2:H=250;break;case 5:H=1073741823;break;case 4:H=1e4;break;default:H=5e3}return H=T+H,z={id:d++,callback:S,priorityLevel:z,startTime:T,expirationTime:H,sortIndex:-1},T>B?(z.sortIndex=T,t(u,z),n(c)===null&&z===n(u)&&(m?(f(C),C=-1):m=!0,q(b,T-B))):(z.sortIndex=H,t(c,z),x||j||(x=!0,F(E))),z},e.unstable_shouldYield=N,e.unstable_wrapCallback=function(z){var S=y;return function(){var T=y;y=S;try{return z.apply(this,arguments)}finally{y=T}}}})(ju);wu.exports=ju;var Op=wu.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ap=v,Ue=Op;function R(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var ku=new Set,kr={};function fn(e,t){An(e,t),An(e+"Capture",t)}function An(e,t){for(kr[e]=t,e=0;e<t.length;e++)ku.add(t[e])}var yt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),xl=Object.prototype.hasOwnProperty,Dp=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Po={},zo={};function Mp(e){return xl.call(zo,e)?!0:xl.call(Po,e)?!1:Dp.test(e)?zo[e]=!0:(Po[e]=!0,!1)}function Fp(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Ip(e,t,n,r){if(t===null||typeof t>"u"||Fp(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function Ee(e,t,n,r,s,l,i){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=s,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=l,this.removeEmptyString=i}var me={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){me[e]=new Ee(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];me[t]=new Ee(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){me[e]=new Ee(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){me[e]=new Ee(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){me[e]=new Ee(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){me[e]=new Ee(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){me[e]=new Ee(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){me[e]=new Ee(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){me[e]=new Ee(e,5,!1,e.toLowerCase(),null,!1,!1)});var Si=/[\-:]([a-z])/g;function Ni(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Si,Ni);me[t]=new Ee(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Si,Ni);me[t]=new Ee(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Si,Ni);me[t]=new Ee(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){me[e]=new Ee(e,1,!1,e.toLowerCase(),null,!1,!1)});me.xlinkHref=new Ee("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){me[e]=new Ee(e,1,!1,e.toLowerCase(),null,!0,!0)});function Ci(e,t,n,r){var s=me.hasOwnProperty(t)?me[t]:null;(s!==null?s.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Ip(t,n,s,r)&&(n=null),r||s===null?Mp(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):s.mustUseProperty?e[s.propertyName]=n===null?s.type===3?!1:"":n:(t=s.attributeName,r=s.attributeNamespace,n===null?e.removeAttribute(t):(s=s.type,n=s===3||s===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var kt=Ap.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,ss=Symbol.for("react.element"),xn=Symbol.for("react.portal"),yn=Symbol.for("react.fragment"),Ei=Symbol.for("react.strict_mode"),yl=Symbol.for("react.profiler"),bu=Symbol.for("react.provider"),Su=Symbol.for("react.context"),_i=Symbol.for("react.forward_ref"),vl=Symbol.for("react.suspense"),wl=Symbol.for("react.suspense_list"),Ri=Symbol.for("react.memo"),_t=Symbol.for("react.lazy"),Nu=Symbol.for("react.offscreen"),Lo=Symbol.iterator;function Zn(e){return e===null||typeof e!="object"?null:(e=Lo&&e[Lo]||e["@@iterator"],typeof e=="function"?e:null)}var se=Object.assign,Ia;function or(e){if(Ia===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Ia=t&&t[1]||""}return`
`+Ia+e}var Ua=!1;function Ba(e,t){if(!e||Ua)return"";Ua=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(u){var r=u}Reflect.construct(e,[],t)}else{try{t.call()}catch(u){r=u}e.call(t.prototype)}else{try{throw Error()}catch(u){r=u}e()}}catch(u){if(u&&r&&typeof u.stack=="string"){for(var s=u.stack.split(`
`),l=r.stack.split(`
`),i=s.length-1,o=l.length-1;1<=i&&0<=o&&s[i]!==l[o];)o--;for(;1<=i&&0<=o;i--,o--)if(s[i]!==l[o]){if(i!==1||o!==1)do if(i--,o--,0>o||s[i]!==l[o]){var c=`
`+s[i].replace(" at new "," at ");return e.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",e.displayName)),c}while(1<=i&&0<=o);break}}}finally{Ua=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?or(e):""}function Up(e){switch(e.tag){case 5:return or(e.type);case 16:return or("Lazy");case 13:return or("Suspense");case 19:return or("SuspenseList");case 0:case 2:case 15:return e=Ba(e.type,!1),e;case 11:return e=Ba(e.type.render,!1),e;case 1:return e=Ba(e.type,!0),e;default:return""}}function jl(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case yn:return"Fragment";case xn:return"Portal";case yl:return"Profiler";case Ei:return"StrictMode";case vl:return"Suspense";case wl:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Su:return(e.displayName||"Context")+".Consumer";case bu:return(e._context.displayName||"Context")+".Provider";case _i:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Ri:return t=e.displayName||null,t!==null?t:jl(e.type)||"Memo";case _t:t=e._payload,e=e._init;try{return jl(e(t))}catch{}}return null}function Bp(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return jl(t);case 8:return t===Ei?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Wt(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Cu(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function $p(e){var t=Cu(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var s=n.get,l=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return s.call(this)},set:function(i){r=""+i,l.call(this,i)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(i){r=""+i},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function as(e){e._valueTracker||(e._valueTracker=$p(e))}function Eu(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=Cu(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function Ms(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function kl(e,t){var n=t.checked;return se({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Oo(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=Wt(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function _u(e,t){t=t.checked,t!=null&&Ci(e,"checked",t,!1)}function bl(e,t){_u(e,t);var n=Wt(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Sl(e,t.type,n):t.hasOwnProperty("defaultValue")&&Sl(e,t.type,Wt(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Ao(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Sl(e,t,n){(t!=="number"||Ms(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var cr=Array.isArray;function Rn(e,t,n,r){if(e=e.options,t){t={};for(var s=0;s<n.length;s++)t["$"+n[s]]=!0;for(n=0;n<e.length;n++)s=t.hasOwnProperty("$"+e[n].value),e[n].selected!==s&&(e[n].selected=s),s&&r&&(e[n].defaultSelected=!0)}else{for(n=""+Wt(n),t=null,s=0;s<e.length;s++){if(e[s].value===n){e[s].selected=!0,r&&(e[s].defaultSelected=!0);return}t!==null||e[s].disabled||(t=e[s])}t!==null&&(t.selected=!0)}}function Nl(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(R(91));return se({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Do(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(R(92));if(cr(n)){if(1<n.length)throw Error(R(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:Wt(n)}}function Ru(e,t){var n=Wt(t.value),r=Wt(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function Mo(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Tu(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Cl(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Tu(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var ls,Pu=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,s){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,s)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(ls=ls||document.createElement("div"),ls.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=ls.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function br(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var pr={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Hp=["Webkit","ms","Moz","O"];Object.keys(pr).forEach(function(e){Hp.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),pr[t]=pr[e]})});function zu(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||pr.hasOwnProperty(e)&&pr[e]?(""+t).trim():t+"px"}function Lu(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,s=zu(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,s):e[n]=s}}var Wp=se({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function El(e,t){if(t){if(Wp[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(R(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(R(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(R(61))}if(t.style!=null&&typeof t.style!="object")throw Error(R(62))}}function _l(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Rl=null;function Ti(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Tl=null,Tn=null,Pn=null;function Fo(e){if(e=Jr(e)){if(typeof Tl!="function")throw Error(R(280));var t=e.stateNode;t&&(t=xa(t),Tl(e.stateNode,e.type,t))}}function Ou(e){Tn?Pn?Pn.push(e):Pn=[e]:Tn=e}function Au(){if(Tn){var e=Tn,t=Pn;if(Pn=Tn=null,Fo(e),t)for(e=0;e<t.length;e++)Fo(t[e])}}function Du(e,t){return e(t)}function Mu(){}var $a=!1;function Fu(e,t,n){if($a)return e(t,n);$a=!0;try{return Du(e,t,n)}finally{$a=!1,(Tn!==null||Pn!==null)&&(Mu(),Au())}}function Sr(e,t){var n=e.stateNode;if(n===null)return null;var r=xa(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(R(231,t,typeof n));return n}var Pl=!1;if(yt)try{var er={};Object.defineProperty(er,"passive",{get:function(){Pl=!0}}),window.addEventListener("test",er,er),window.removeEventListener("test",er,er)}catch{Pl=!1}function Vp(e,t,n,r,s,l,i,o,c){var u=Array.prototype.slice.call(arguments,3);try{t.apply(n,u)}catch(d){this.onError(d)}}var hr=!1,Fs=null,Is=!1,zl=null,qp={onError:function(e){hr=!0,Fs=e}};function Jp(e,t,n,r,s,l,i,o,c){hr=!1,Fs=null,Vp.apply(qp,arguments)}function Qp(e,t,n,r,s,l,i,o,c){if(Jp.apply(this,arguments),hr){if(hr){var u=Fs;hr=!1,Fs=null}else throw Error(R(198));Is||(Is=!0,zl=u)}}function pn(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function Iu(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Io(e){if(pn(e)!==e)throw Error(R(188))}function Kp(e){var t=e.alternate;if(!t){if(t=pn(e),t===null)throw Error(R(188));return t!==e?null:e}for(var n=e,r=t;;){var s=n.return;if(s===null)break;var l=s.alternate;if(l===null){if(r=s.return,r!==null){n=r;continue}break}if(s.child===l.child){for(l=s.child;l;){if(l===n)return Io(s),e;if(l===r)return Io(s),t;l=l.sibling}throw Error(R(188))}if(n.return!==r.return)n=s,r=l;else{for(var i=!1,o=s.child;o;){if(o===n){i=!0,n=s,r=l;break}if(o===r){i=!0,r=s,n=l;break}o=o.sibling}if(!i){for(o=l.child;o;){if(o===n){i=!0,n=l,r=s;break}if(o===r){i=!0,r=l,n=s;break}o=o.sibling}if(!i)throw Error(R(189))}}if(n.alternate!==r)throw Error(R(190))}if(n.tag!==3)throw Error(R(188));return n.stateNode.current===n?e:t}function Uu(e){return e=Kp(e),e!==null?Bu(e):null}function Bu(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Bu(e);if(t!==null)return t;e=e.sibling}return null}var $u=Ue.unstable_scheduleCallback,Uo=Ue.unstable_cancelCallback,Xp=Ue.unstable_shouldYield,Yp=Ue.unstable_requestPaint,ie=Ue.unstable_now,Gp=Ue.unstable_getCurrentPriorityLevel,Pi=Ue.unstable_ImmediatePriority,Hu=Ue.unstable_UserBlockingPriority,Us=Ue.unstable_NormalPriority,Zp=Ue.unstable_LowPriority,Wu=Ue.unstable_IdlePriority,pa=null,ut=null;function eh(e){if(ut&&typeof ut.onCommitFiberRoot=="function")try{ut.onCommitFiberRoot(pa,e,void 0,(e.current.flags&128)===128)}catch{}}var tt=Math.clz32?Math.clz32:rh,th=Math.log,nh=Math.LN2;function rh(e){return e>>>=0,e===0?32:31-(th(e)/nh|0)|0}var is=64,os=4194304;function ur(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Bs(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,s=e.suspendedLanes,l=e.pingedLanes,i=n&268435455;if(i!==0){var o=i&~s;o!==0?r=ur(o):(l&=i,l!==0&&(r=ur(l)))}else i=n&~s,i!==0?r=ur(i):l!==0&&(r=ur(l));if(r===0)return 0;if(t!==0&&t!==r&&!(t&s)&&(s=r&-r,l=t&-t,s>=l||s===16&&(l&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-tt(t),s=1<<n,r|=e[n],t&=~s;return r}function sh(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function ah(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,s=e.expirationTimes,l=e.pendingLanes;0<l;){var i=31-tt(l),o=1<<i,c=s[i];c===-1?(!(o&n)||o&r)&&(s[i]=sh(o,t)):c<=t&&(e.expiredLanes|=o),l&=~o}}function Ll(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Vu(){var e=is;return is<<=1,!(is&4194240)&&(is=64),e}function Ha(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Vr(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-tt(t),e[t]=n}function lh(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var s=31-tt(n),l=1<<s;t[s]=0,r[s]=-1,e[s]=-1,n&=~l}}function zi(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-tt(n),s=1<<r;s&t|e[r]&t&&(e[r]|=t),n&=~s}}var Q=0;function qu(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Ju,Li,Qu,Ku,Xu,Ol=!1,cs=[],At=null,Dt=null,Mt=null,Nr=new Map,Cr=new Map,Tt=[],ih="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Bo(e,t){switch(e){case"focusin":case"focusout":At=null;break;case"dragenter":case"dragleave":Dt=null;break;case"mouseover":case"mouseout":Mt=null;break;case"pointerover":case"pointerout":Nr.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Cr.delete(t.pointerId)}}function tr(e,t,n,r,s,l){return e===null||e.nativeEvent!==l?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:l,targetContainers:[s]},t!==null&&(t=Jr(t),t!==null&&Li(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,s!==null&&t.indexOf(s)===-1&&t.push(s),e)}function oh(e,t,n,r,s){switch(t){case"focusin":return At=tr(At,e,t,n,r,s),!0;case"dragenter":return Dt=tr(Dt,e,t,n,r,s),!0;case"mouseover":return Mt=tr(Mt,e,t,n,r,s),!0;case"pointerover":var l=s.pointerId;return Nr.set(l,tr(Nr.get(l)||null,e,t,n,r,s)),!0;case"gotpointercapture":return l=s.pointerId,Cr.set(l,tr(Cr.get(l)||null,e,t,n,r,s)),!0}return!1}function Yu(e){var t=Yt(e.target);if(t!==null){var n=pn(t);if(n!==null){if(t=n.tag,t===13){if(t=Iu(n),t!==null){e.blockedOn=t,Xu(e.priority,function(){Qu(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ss(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Al(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Rl=r,n.target.dispatchEvent(r),Rl=null}else return t=Jr(n),t!==null&&Li(t),e.blockedOn=n,!1;t.shift()}return!0}function $o(e,t,n){Ss(e)&&n.delete(t)}function ch(){Ol=!1,At!==null&&Ss(At)&&(At=null),Dt!==null&&Ss(Dt)&&(Dt=null),Mt!==null&&Ss(Mt)&&(Mt=null),Nr.forEach($o),Cr.forEach($o)}function nr(e,t){e.blockedOn===t&&(e.blockedOn=null,Ol||(Ol=!0,Ue.unstable_scheduleCallback(Ue.unstable_NormalPriority,ch)))}function Er(e){function t(s){return nr(s,e)}if(0<cs.length){nr(cs[0],e);for(var n=1;n<cs.length;n++){var r=cs[n];r.blockedOn===e&&(r.blockedOn=null)}}for(At!==null&&nr(At,e),Dt!==null&&nr(Dt,e),Mt!==null&&nr(Mt,e),Nr.forEach(t),Cr.forEach(t),n=0;n<Tt.length;n++)r=Tt[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<Tt.length&&(n=Tt[0],n.blockedOn===null);)Yu(n),n.blockedOn===null&&Tt.shift()}var zn=kt.ReactCurrentBatchConfig,$s=!0;function uh(e,t,n,r){var s=Q,l=zn.transition;zn.transition=null;try{Q=1,Oi(e,t,n,r)}finally{Q=s,zn.transition=l}}function dh(e,t,n,r){var s=Q,l=zn.transition;zn.transition=null;try{Q=4,Oi(e,t,n,r)}finally{Q=s,zn.transition=l}}function Oi(e,t,n,r){if($s){var s=Al(e,t,n,r);if(s===null)Za(e,t,r,Hs,n),Bo(e,r);else if(oh(s,e,t,n,r))r.stopPropagation();else if(Bo(e,r),t&4&&-1<ih.indexOf(e)){for(;s!==null;){var l=Jr(s);if(l!==null&&Ju(l),l=Al(e,t,n,r),l===null&&Za(e,t,r,Hs,n),l===s)break;s=l}s!==null&&r.stopPropagation()}else Za(e,t,r,null,n)}}var Hs=null;function Al(e,t,n,r){if(Hs=null,e=Ti(r),e=Yt(e),e!==null)if(t=pn(e),t===null)e=null;else if(n=t.tag,n===13){if(e=Iu(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Hs=e,null}function Gu(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Gp()){case Pi:return 1;case Hu:return 4;case Us:case Zp:return 16;case Wu:return 536870912;default:return 16}default:return 16}}var zt=null,Ai=null,Ns=null;function Zu(){if(Ns)return Ns;var e,t=Ai,n=t.length,r,s="value"in zt?zt.value:zt.textContent,l=s.length;for(e=0;e<n&&t[e]===s[e];e++);var i=n-e;for(r=1;r<=i&&t[n-r]===s[l-r];r++);return Ns=s.slice(e,1<r?1-r:void 0)}function Cs(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function us(){return!0}function Ho(){return!1}function $e(e){function t(n,r,s,l,i){this._reactName=n,this._targetInst=s,this.type=r,this.nativeEvent=l,this.target=i,this.currentTarget=null;for(var o in e)e.hasOwnProperty(o)&&(n=e[o],this[o]=n?n(l):l[o]);return this.isDefaultPrevented=(l.defaultPrevented!=null?l.defaultPrevented:l.returnValue===!1)?us:Ho,this.isPropagationStopped=Ho,this}return se(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=us)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=us)},persist:function(){},isPersistent:us}),t}var Vn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Di=$e(Vn),qr=se({},Vn,{view:0,detail:0}),fh=$e(qr),Wa,Va,rr,ha=se({},qr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Mi,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==rr&&(rr&&e.type==="mousemove"?(Wa=e.screenX-rr.screenX,Va=e.screenY-rr.screenY):Va=Wa=0,rr=e),Wa)},movementY:function(e){return"movementY"in e?e.movementY:Va}}),Wo=$e(ha),ph=se({},ha,{dataTransfer:0}),hh=$e(ph),mh=se({},qr,{relatedTarget:0}),qa=$e(mh),gh=se({},Vn,{animationName:0,elapsedTime:0,pseudoElement:0}),xh=$e(gh),yh=se({},Vn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),vh=$e(yh),wh=se({},Vn,{data:0}),Vo=$e(wh),jh={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},kh={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},bh={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Sh(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=bh[e])?!!t[e]:!1}function Mi(){return Sh}var Nh=se({},qr,{key:function(e){if(e.key){var t=jh[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Cs(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?kh[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Mi,charCode:function(e){return e.type==="keypress"?Cs(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Cs(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Ch=$e(Nh),Eh=se({},ha,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),qo=$e(Eh),_h=se({},qr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Mi}),Rh=$e(_h),Th=se({},Vn,{propertyName:0,elapsedTime:0,pseudoElement:0}),Ph=$e(Th),zh=se({},ha,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Lh=$e(zh),Oh=[9,13,27,32],Fi=yt&&"CompositionEvent"in window,mr=null;yt&&"documentMode"in document&&(mr=document.documentMode);var Ah=yt&&"TextEvent"in window&&!mr,ed=yt&&(!Fi||mr&&8<mr&&11>=mr),Jo=" ",Qo=!1;function td(e,t){switch(e){case"keyup":return Oh.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function nd(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var vn=!1;function Dh(e,t){switch(e){case"compositionend":return nd(t);case"keypress":return t.which!==32?null:(Qo=!0,Jo);case"textInput":return e=t.data,e===Jo&&Qo?null:e;default:return null}}function Mh(e,t){if(vn)return e==="compositionend"||!Fi&&td(e,t)?(e=Zu(),Ns=Ai=zt=null,vn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return ed&&t.locale!=="ko"?null:t.data;default:return null}}var Fh={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Ko(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Fh[e.type]:t==="textarea"}function rd(e,t,n,r){Ou(r),t=Ws(t,"onChange"),0<t.length&&(n=new Di("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var gr=null,_r=null;function Ih(e){hd(e,0)}function ma(e){var t=kn(e);if(Eu(t))return e}function Uh(e,t){if(e==="change")return t}var sd=!1;if(yt){var Ja;if(yt){var Qa="oninput"in document;if(!Qa){var Xo=document.createElement("div");Xo.setAttribute("oninput","return;"),Qa=typeof Xo.oninput=="function"}Ja=Qa}else Ja=!1;sd=Ja&&(!document.documentMode||9<document.documentMode)}function Yo(){gr&&(gr.detachEvent("onpropertychange",ad),_r=gr=null)}function ad(e){if(e.propertyName==="value"&&ma(_r)){var t=[];rd(t,_r,e,Ti(e)),Fu(Ih,t)}}function Bh(e,t,n){e==="focusin"?(Yo(),gr=t,_r=n,gr.attachEvent("onpropertychange",ad)):e==="focusout"&&Yo()}function $h(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return ma(_r)}function Hh(e,t){if(e==="click")return ma(t)}function Wh(e,t){if(e==="input"||e==="change")return ma(t)}function Vh(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var rt=typeof Object.is=="function"?Object.is:Vh;function Rr(e,t){if(rt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var s=n[r];if(!xl.call(t,s)||!rt(e[s],t[s]))return!1}return!0}function Go(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Zo(e,t){var n=Go(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Go(n)}}function ld(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?ld(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function id(){for(var e=window,t=Ms();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Ms(e.document)}return t}function Ii(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function qh(e){var t=id(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&ld(n.ownerDocument.documentElement,n)){if(r!==null&&Ii(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var s=n.textContent.length,l=Math.min(r.start,s);r=r.end===void 0?l:Math.min(r.end,s),!e.extend&&l>r&&(s=r,r=l,l=s),s=Zo(n,l);var i=Zo(n,r);s&&i&&(e.rangeCount!==1||e.anchorNode!==s.node||e.anchorOffset!==s.offset||e.focusNode!==i.node||e.focusOffset!==i.offset)&&(t=t.createRange(),t.setStart(s.node,s.offset),e.removeAllRanges(),l>r?(e.addRange(t),e.extend(i.node,i.offset)):(t.setEnd(i.node,i.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Jh=yt&&"documentMode"in document&&11>=document.documentMode,wn=null,Dl=null,xr=null,Ml=!1;function ec(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Ml||wn==null||wn!==Ms(r)||(r=wn,"selectionStart"in r&&Ii(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),xr&&Rr(xr,r)||(xr=r,r=Ws(Dl,"onSelect"),0<r.length&&(t=new Di("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=wn)))}function ds(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var jn={animationend:ds("Animation","AnimationEnd"),animationiteration:ds("Animation","AnimationIteration"),animationstart:ds("Animation","AnimationStart"),transitionend:ds("Transition","TransitionEnd")},Ka={},od={};yt&&(od=document.createElement("div").style,"AnimationEvent"in window||(delete jn.animationend.animation,delete jn.animationiteration.animation,delete jn.animationstart.animation),"TransitionEvent"in window||delete jn.transitionend.transition);function ga(e){if(Ka[e])return Ka[e];if(!jn[e])return e;var t=jn[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in od)return Ka[e]=t[n];return e}var cd=ga("animationend"),ud=ga("animationiteration"),dd=ga("animationstart"),fd=ga("transitionend"),pd=new Map,tc="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function qt(e,t){pd.set(e,t),fn(t,[e])}for(var Xa=0;Xa<tc.length;Xa++){var Ya=tc[Xa],Qh=Ya.toLowerCase(),Kh=Ya[0].toUpperCase()+Ya.slice(1);qt(Qh,"on"+Kh)}qt(cd,"onAnimationEnd");qt(ud,"onAnimationIteration");qt(dd,"onAnimationStart");qt("dblclick","onDoubleClick");qt("focusin","onFocus");qt("focusout","onBlur");qt(fd,"onTransitionEnd");An("onMouseEnter",["mouseout","mouseover"]);An("onMouseLeave",["mouseout","mouseover"]);An("onPointerEnter",["pointerout","pointerover"]);An("onPointerLeave",["pointerout","pointerover"]);fn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));fn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));fn("onBeforeInput",["compositionend","keypress","textInput","paste"]);fn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));fn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));fn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var dr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Xh=new Set("cancel close invalid load scroll toggle".split(" ").concat(dr));function nc(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,Qp(r,t,void 0,e),e.currentTarget=null}function hd(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],s=r.event;r=r.listeners;e:{var l=void 0;if(t)for(var i=r.length-1;0<=i;i--){var o=r[i],c=o.instance,u=o.currentTarget;if(o=o.listener,c!==l&&s.isPropagationStopped())break e;nc(s,o,u),l=c}else for(i=0;i<r.length;i++){if(o=r[i],c=o.instance,u=o.currentTarget,o=o.listener,c!==l&&s.isPropagationStopped())break e;nc(s,o,u),l=c}}}if(Is)throw e=zl,Is=!1,zl=null,e}function G(e,t){var n=t[$l];n===void 0&&(n=t[$l]=new Set);var r=e+"__bubble";n.has(r)||(md(t,e,2,!1),n.add(r))}function Ga(e,t,n){var r=0;t&&(r|=4),md(n,e,r,t)}var fs="_reactListening"+Math.random().toString(36).slice(2);function Tr(e){if(!e[fs]){e[fs]=!0,ku.forEach(function(n){n!=="selectionchange"&&(Xh.has(n)||Ga(n,!1,e),Ga(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[fs]||(t[fs]=!0,Ga("selectionchange",!1,t))}}function md(e,t,n,r){switch(Gu(t)){case 1:var s=uh;break;case 4:s=dh;break;default:s=Oi}n=s.bind(null,t,n,e),s=void 0,!Pl||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(s=!0),r?s!==void 0?e.addEventListener(t,n,{capture:!0,passive:s}):e.addEventListener(t,n,!0):s!==void 0?e.addEventListener(t,n,{passive:s}):e.addEventListener(t,n,!1)}function Za(e,t,n,r,s){var l=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var i=r.tag;if(i===3||i===4){var o=r.stateNode.containerInfo;if(o===s||o.nodeType===8&&o.parentNode===s)break;if(i===4)for(i=r.return;i!==null;){var c=i.tag;if((c===3||c===4)&&(c=i.stateNode.containerInfo,c===s||c.nodeType===8&&c.parentNode===s))return;i=i.return}for(;o!==null;){if(i=Yt(o),i===null)return;if(c=i.tag,c===5||c===6){r=l=i;continue e}o=o.parentNode}}r=r.return}Fu(function(){var u=l,d=Ti(n),h=[];e:{var y=pd.get(e);if(y!==void 0){var j=Di,x=e;switch(e){case"keypress":if(Cs(n)===0)break e;case"keydown":case"keyup":j=Ch;break;case"focusin":x="focus",j=qa;break;case"focusout":x="blur",j=qa;break;case"beforeblur":case"afterblur":j=qa;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":j=Wo;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":j=hh;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":j=Rh;break;case cd:case ud:case dd:j=xh;break;case fd:j=Ph;break;case"scroll":j=fh;break;case"wheel":j=Lh;break;case"copy":case"cut":case"paste":j=vh;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":j=qo}var m=(t&4)!==0,w=!m&&e==="scroll",f=m?y!==null?y+"Capture":null:y;m=[];for(var p=u,g;p!==null;){g=p;var b=g.stateNode;if(g.tag===5&&b!==null&&(g=b,f!==null&&(b=Sr(p,f),b!=null&&m.push(Pr(p,b,g)))),w)break;p=p.return}0<m.length&&(y=new j(y,x,null,n,d),h.push({event:y,listeners:m}))}}if(!(t&7)){e:{if(y=e==="mouseover"||e==="pointerover",j=e==="mouseout"||e==="pointerout",y&&n!==Rl&&(x=n.relatedTarget||n.fromElement)&&(Yt(x)||x[vt]))break e;if((j||y)&&(y=d.window===d?d:(y=d.ownerDocument)?y.defaultView||y.parentWindow:window,j?(x=n.relatedTarget||n.toElement,j=u,x=x?Yt(x):null,x!==null&&(w=pn(x),x!==w||x.tag!==5&&x.tag!==6)&&(x=null)):(j=null,x=u),j!==x)){if(m=Wo,b="onMouseLeave",f="onMouseEnter",p="mouse",(e==="pointerout"||e==="pointerover")&&(m=qo,b="onPointerLeave",f="onPointerEnter",p="pointer"),w=j==null?y:kn(j),g=x==null?y:kn(x),y=new m(b,p+"leave",j,n,d),y.target=w,y.relatedTarget=g,b=null,Yt(d)===u&&(m=new m(f,p+"enter",x,n,d),m.target=g,m.relatedTarget=w,b=m),w=b,j&&x)t:{for(m=j,f=x,p=0,g=m;g;g=mn(g))p++;for(g=0,b=f;b;b=mn(b))g++;for(;0<p-g;)m=mn(m),p--;for(;0<g-p;)f=mn(f),g--;for(;p--;){if(m===f||f!==null&&m===f.alternate)break t;m=mn(m),f=mn(f)}m=null}else m=null;j!==null&&rc(h,y,j,m,!1),x!==null&&w!==null&&rc(h,w,x,m,!0)}}e:{if(y=u?kn(u):window,j=y.nodeName&&y.nodeName.toLowerCase(),j==="select"||j==="input"&&y.type==="file")var E=Uh;else if(Ko(y))if(sd)E=Wh;else{E=$h;var P=Bh}else(j=y.nodeName)&&j.toLowerCase()==="input"&&(y.type==="checkbox"||y.type==="radio")&&(E=Hh);if(E&&(E=E(e,u))){rd(h,E,n,d);break e}P&&P(e,y,u),e==="focusout"&&(P=y._wrapperState)&&P.controlled&&y.type==="number"&&Sl(y,"number",y.value)}switch(P=u?kn(u):window,e){case"focusin":(Ko(P)||P.contentEditable==="true")&&(wn=P,Dl=u,xr=null);break;case"focusout":xr=Dl=wn=null;break;case"mousedown":Ml=!0;break;case"contextmenu":case"mouseup":case"dragend":Ml=!1,ec(h,n,d);break;case"selectionchange":if(Jh)break;case"keydown":case"keyup":ec(h,n,d)}var _;if(Fi)e:{switch(e){case"compositionstart":var C="onCompositionStart";break e;case"compositionend":C="onCompositionEnd";break e;case"compositionupdate":C="onCompositionUpdate";break e}C=void 0}else vn?td(e,n)&&(C="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(C="onCompositionStart");C&&(ed&&n.locale!=="ko"&&(vn||C!=="onCompositionStart"?C==="onCompositionEnd"&&vn&&(_=Zu()):(zt=d,Ai="value"in zt?zt.value:zt.textContent,vn=!0)),P=Ws(u,C),0<P.length&&(C=new Vo(C,e,null,n,d),h.push({event:C,listeners:P}),_?C.data=_:(_=nd(n),_!==null&&(C.data=_)))),(_=Ah?Dh(e,n):Mh(e,n))&&(u=Ws(u,"onBeforeInput"),0<u.length&&(d=new Vo("onBeforeInput","beforeinput",null,n,d),h.push({event:d,listeners:u}),d.data=_))}hd(h,t)})}function Pr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Ws(e,t){for(var n=t+"Capture",r=[];e!==null;){var s=e,l=s.stateNode;s.tag===5&&l!==null&&(s=l,l=Sr(e,n),l!=null&&r.unshift(Pr(e,l,s)),l=Sr(e,t),l!=null&&r.push(Pr(e,l,s))),e=e.return}return r}function mn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function rc(e,t,n,r,s){for(var l=t._reactName,i=[];n!==null&&n!==r;){var o=n,c=o.alternate,u=o.stateNode;if(c!==null&&c===r)break;o.tag===5&&u!==null&&(o=u,s?(c=Sr(n,l),c!=null&&i.unshift(Pr(n,c,o))):s||(c=Sr(n,l),c!=null&&i.push(Pr(n,c,o)))),n=n.return}i.length!==0&&e.push({event:t,listeners:i})}var Yh=/\r\n?/g,Gh=/\u0000|\uFFFD/g;function sc(e){return(typeof e=="string"?e:""+e).replace(Yh,`
`).replace(Gh,"")}function ps(e,t,n){if(t=sc(t),sc(e)!==t&&n)throw Error(R(425))}function Vs(){}var Fl=null,Il=null;function Ul(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Bl=typeof setTimeout=="function"?setTimeout:void 0,Zh=typeof clearTimeout=="function"?clearTimeout:void 0,ac=typeof Promise=="function"?Promise:void 0,em=typeof queueMicrotask=="function"?queueMicrotask:typeof ac<"u"?function(e){return ac.resolve(null).then(e).catch(tm)}:Bl;function tm(e){setTimeout(function(){throw e})}function el(e,t){var n=t,r=0;do{var s=n.nextSibling;if(e.removeChild(n),s&&s.nodeType===8)if(n=s.data,n==="/$"){if(r===0){e.removeChild(s),Er(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=s}while(n);Er(t)}function Ft(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function lc(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var qn=Math.random().toString(36).slice(2),ct="__reactFiber$"+qn,zr="__reactProps$"+qn,vt="__reactContainer$"+qn,$l="__reactEvents$"+qn,nm="__reactListeners$"+qn,rm="__reactHandles$"+qn;function Yt(e){var t=e[ct];if(t)return t;for(var n=e.parentNode;n;){if(t=n[vt]||n[ct]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=lc(e);e!==null;){if(n=e[ct])return n;e=lc(e)}return t}e=n,n=e.parentNode}return null}function Jr(e){return e=e[ct]||e[vt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function kn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(R(33))}function xa(e){return e[zr]||null}var Hl=[],bn=-1;function Jt(e){return{current:e}}function Z(e){0>bn||(e.current=Hl[bn],Hl[bn]=null,bn--)}function X(e,t){bn++,Hl[bn]=e.current,e.current=t}var Vt={},je=Jt(Vt),Le=Jt(!1),sn=Vt;function Dn(e,t){var n=e.type.contextTypes;if(!n)return Vt;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var s={},l;for(l in n)s[l]=t[l];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=s),s}function Oe(e){return e=e.childContextTypes,e!=null}function qs(){Z(Le),Z(je)}function ic(e,t,n){if(je.current!==Vt)throw Error(R(168));X(je,t),X(Le,n)}function gd(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var s in r)if(!(s in t))throw Error(R(108,Bp(e)||"Unknown",s));return se({},n,r)}function Js(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Vt,sn=je.current,X(je,e),X(Le,Le.current),!0}function oc(e,t,n){var r=e.stateNode;if(!r)throw Error(R(169));n?(e=gd(e,t,sn),r.__reactInternalMemoizedMergedChildContext=e,Z(Le),Z(je),X(je,e)):Z(Le),X(Le,n)}var ht=null,ya=!1,tl=!1;function xd(e){ht===null?ht=[e]:ht.push(e)}function sm(e){ya=!0,xd(e)}function Qt(){if(!tl&&ht!==null){tl=!0;var e=0,t=Q;try{var n=ht;for(Q=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}ht=null,ya=!1}catch(s){throw ht!==null&&(ht=ht.slice(e+1)),$u(Pi,Qt),s}finally{Q=t,tl=!1}}return null}var Sn=[],Nn=0,Qs=null,Ks=0,We=[],Ve=0,an=null,mt=1,gt="";function Kt(e,t){Sn[Nn++]=Ks,Sn[Nn++]=Qs,Qs=e,Ks=t}function yd(e,t,n){We[Ve++]=mt,We[Ve++]=gt,We[Ve++]=an,an=e;var r=mt;e=gt;var s=32-tt(r)-1;r&=~(1<<s),n+=1;var l=32-tt(t)+s;if(30<l){var i=s-s%5;l=(r&(1<<i)-1).toString(32),r>>=i,s-=i,mt=1<<32-tt(t)+s|n<<s|r,gt=l+e}else mt=1<<l|n<<s|r,gt=e}function Ui(e){e.return!==null&&(Kt(e,1),yd(e,1,0))}function Bi(e){for(;e===Qs;)Qs=Sn[--Nn],Sn[Nn]=null,Ks=Sn[--Nn],Sn[Nn]=null;for(;e===an;)an=We[--Ve],We[Ve]=null,gt=We[--Ve],We[Ve]=null,mt=We[--Ve],We[Ve]=null}var Ie=null,Fe=null,ee=!1,et=null;function vd(e,t){var n=qe(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function cc(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Ie=e,Fe=Ft(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Ie=e,Fe=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=an!==null?{id:mt,overflow:gt}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=qe(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Ie=e,Fe=null,!0):!1;default:return!1}}function Wl(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Vl(e){if(ee){var t=Fe;if(t){var n=t;if(!cc(e,t)){if(Wl(e))throw Error(R(418));t=Ft(n.nextSibling);var r=Ie;t&&cc(e,t)?vd(r,n):(e.flags=e.flags&-4097|2,ee=!1,Ie=e)}}else{if(Wl(e))throw Error(R(418));e.flags=e.flags&-4097|2,ee=!1,Ie=e}}}function uc(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Ie=e}function hs(e){if(e!==Ie)return!1;if(!ee)return uc(e),ee=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Ul(e.type,e.memoizedProps)),t&&(t=Fe)){if(Wl(e))throw wd(),Error(R(418));for(;t;)vd(e,t),t=Ft(t.nextSibling)}if(uc(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(R(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){Fe=Ft(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}Fe=null}}else Fe=Ie?Ft(e.stateNode.nextSibling):null;return!0}function wd(){for(var e=Fe;e;)e=Ft(e.nextSibling)}function Mn(){Fe=Ie=null,ee=!1}function $i(e){et===null?et=[e]:et.push(e)}var am=kt.ReactCurrentBatchConfig;function sr(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(R(309));var r=n.stateNode}if(!r)throw Error(R(147,e));var s=r,l=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===l?t.ref:(t=function(i){var o=s.refs;i===null?delete o[l]:o[l]=i},t._stringRef=l,t)}if(typeof e!="string")throw Error(R(284));if(!n._owner)throw Error(R(290,e))}return e}function ms(e,t){throw e=Object.prototype.toString.call(t),Error(R(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function dc(e){var t=e._init;return t(e._payload)}function jd(e){function t(f,p){if(e){var g=f.deletions;g===null?(f.deletions=[p],f.flags|=16):g.push(p)}}function n(f,p){if(!e)return null;for(;p!==null;)t(f,p),p=p.sibling;return null}function r(f,p){for(f=new Map;p!==null;)p.key!==null?f.set(p.key,p):f.set(p.index,p),p=p.sibling;return f}function s(f,p){return f=$t(f,p),f.index=0,f.sibling=null,f}function l(f,p,g){return f.index=g,e?(g=f.alternate,g!==null?(g=g.index,g<p?(f.flags|=2,p):g):(f.flags|=2,p)):(f.flags|=1048576,p)}function i(f){return e&&f.alternate===null&&(f.flags|=2),f}function o(f,p,g,b){return p===null||p.tag!==6?(p=ol(g,f.mode,b),p.return=f,p):(p=s(p,g),p.return=f,p)}function c(f,p,g,b){var E=g.type;return E===yn?d(f,p,g.props.children,b,g.key):p!==null&&(p.elementType===E||typeof E=="object"&&E!==null&&E.$$typeof===_t&&dc(E)===p.type)?(b=s(p,g.props),b.ref=sr(f,p,g),b.return=f,b):(b=Ls(g.type,g.key,g.props,null,f.mode,b),b.ref=sr(f,p,g),b.return=f,b)}function u(f,p,g,b){return p===null||p.tag!==4||p.stateNode.containerInfo!==g.containerInfo||p.stateNode.implementation!==g.implementation?(p=cl(g,f.mode,b),p.return=f,p):(p=s(p,g.children||[]),p.return=f,p)}function d(f,p,g,b,E){return p===null||p.tag!==7?(p=nn(g,f.mode,b,E),p.return=f,p):(p=s(p,g),p.return=f,p)}function h(f,p,g){if(typeof p=="string"&&p!==""||typeof p=="number")return p=ol(""+p,f.mode,g),p.return=f,p;if(typeof p=="object"&&p!==null){switch(p.$$typeof){case ss:return g=Ls(p.type,p.key,p.props,null,f.mode,g),g.ref=sr(f,null,p),g.return=f,g;case xn:return p=cl(p,f.mode,g),p.return=f,p;case _t:var b=p._init;return h(f,b(p._payload),g)}if(cr(p)||Zn(p))return p=nn(p,f.mode,g,null),p.return=f,p;ms(f,p)}return null}function y(f,p,g,b){var E=p!==null?p.key:null;if(typeof g=="string"&&g!==""||typeof g=="number")return E!==null?null:o(f,p,""+g,b);if(typeof g=="object"&&g!==null){switch(g.$$typeof){case ss:return g.key===E?c(f,p,g,b):null;case xn:return g.key===E?u(f,p,g,b):null;case _t:return E=g._init,y(f,p,E(g._payload),b)}if(cr(g)||Zn(g))return E!==null?null:d(f,p,g,b,null);ms(f,g)}return null}function j(f,p,g,b,E){if(typeof b=="string"&&b!==""||typeof b=="number")return f=f.get(g)||null,o(p,f,""+b,E);if(typeof b=="object"&&b!==null){switch(b.$$typeof){case ss:return f=f.get(b.key===null?g:b.key)||null,c(p,f,b,E);case xn:return f=f.get(b.key===null?g:b.key)||null,u(p,f,b,E);case _t:var P=b._init;return j(f,p,g,P(b._payload),E)}if(cr(b)||Zn(b))return f=f.get(g)||null,d(p,f,b,E,null);ms(p,b)}return null}function x(f,p,g,b){for(var E=null,P=null,_=p,C=p=0,I=null;_!==null&&C<g.length;C++){_.index>C?(I=_,_=null):I=_.sibling;var L=y(f,_,g[C],b);if(L===null){_===null&&(_=I);break}e&&_&&L.alternate===null&&t(f,_),p=l(L,p,C),P===null?E=L:P.sibling=L,P=L,_=I}if(C===g.length)return n(f,_),ee&&Kt(f,C),E;if(_===null){for(;C<g.length;C++)_=h(f,g[C],b),_!==null&&(p=l(_,p,C),P===null?E=_:P.sibling=_,P=_);return ee&&Kt(f,C),E}for(_=r(f,_);C<g.length;C++)I=j(_,f,C,g[C],b),I!==null&&(e&&I.alternate!==null&&_.delete(I.key===null?C:I.key),p=l(I,p,C),P===null?E=I:P.sibling=I,P=I);return e&&_.forEach(function(N){return t(f,N)}),ee&&Kt(f,C),E}function m(f,p,g,b){var E=Zn(g);if(typeof E!="function")throw Error(R(150));if(g=E.call(g),g==null)throw Error(R(151));for(var P=E=null,_=p,C=p=0,I=null,L=g.next();_!==null&&!L.done;C++,L=g.next()){_.index>C?(I=_,_=null):I=_.sibling;var N=y(f,_,L.value,b);if(N===null){_===null&&(_=I);break}e&&_&&N.alternate===null&&t(f,_),p=l(N,p,C),P===null?E=N:P.sibling=N,P=N,_=I}if(L.done)return n(f,_),ee&&Kt(f,C),E;if(_===null){for(;!L.done;C++,L=g.next())L=h(f,L.value,b),L!==null&&(p=l(L,p,C),P===null?E=L:P.sibling=L,P=L);return ee&&Kt(f,C),E}for(_=r(f,_);!L.done;C++,L=g.next())L=j(_,f,C,L.value,b),L!==null&&(e&&L.alternate!==null&&_.delete(L.key===null?C:L.key),p=l(L,p,C),P===null?E=L:P.sibling=L,P=L);return e&&_.forEach(function(D){return t(f,D)}),ee&&Kt(f,C),E}function w(f,p,g,b){if(typeof g=="object"&&g!==null&&g.type===yn&&g.key===null&&(g=g.props.children),typeof g=="object"&&g!==null){switch(g.$$typeof){case ss:e:{for(var E=g.key,P=p;P!==null;){if(P.key===E){if(E=g.type,E===yn){if(P.tag===7){n(f,P.sibling),p=s(P,g.props.children),p.return=f,f=p;break e}}else if(P.elementType===E||typeof E=="object"&&E!==null&&E.$$typeof===_t&&dc(E)===P.type){n(f,P.sibling),p=s(P,g.props),p.ref=sr(f,P,g),p.return=f,f=p;break e}n(f,P);break}else t(f,P);P=P.sibling}g.type===yn?(p=nn(g.props.children,f.mode,b,g.key),p.return=f,f=p):(b=Ls(g.type,g.key,g.props,null,f.mode,b),b.ref=sr(f,p,g),b.return=f,f=b)}return i(f);case xn:e:{for(P=g.key;p!==null;){if(p.key===P)if(p.tag===4&&p.stateNode.containerInfo===g.containerInfo&&p.stateNode.implementation===g.implementation){n(f,p.sibling),p=s(p,g.children||[]),p.return=f,f=p;break e}else{n(f,p);break}else t(f,p);p=p.sibling}p=cl(g,f.mode,b),p.return=f,f=p}return i(f);case _t:return P=g._init,w(f,p,P(g._payload),b)}if(cr(g))return x(f,p,g,b);if(Zn(g))return m(f,p,g,b);ms(f,g)}return typeof g=="string"&&g!==""||typeof g=="number"?(g=""+g,p!==null&&p.tag===6?(n(f,p.sibling),p=s(p,g),p.return=f,f=p):(n(f,p),p=ol(g,f.mode,b),p.return=f,f=p),i(f)):n(f,p)}return w}var Fn=jd(!0),kd=jd(!1),Xs=Jt(null),Ys=null,Cn=null,Hi=null;function Wi(){Hi=Cn=Ys=null}function Vi(e){var t=Xs.current;Z(Xs),e._currentValue=t}function ql(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function Ln(e,t){Ys=e,Hi=Cn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(ze=!0),e.firstContext=null)}function Qe(e){var t=e._currentValue;if(Hi!==e)if(e={context:e,memoizedValue:t,next:null},Cn===null){if(Ys===null)throw Error(R(308));Cn=e,Ys.dependencies={lanes:0,firstContext:e}}else Cn=Cn.next=e;return t}var Gt=null;function qi(e){Gt===null?Gt=[e]:Gt.push(e)}function bd(e,t,n,r){var s=t.interleaved;return s===null?(n.next=n,qi(t)):(n.next=s.next,s.next=n),t.interleaved=n,wt(e,r)}function wt(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var Rt=!1;function Ji(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Sd(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function xt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function It(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,J&2){var s=r.pending;return s===null?t.next=t:(t.next=s.next,s.next=t),r.pending=t,wt(e,n)}return s=r.interleaved,s===null?(t.next=t,qi(r)):(t.next=s.next,s.next=t),r.interleaved=t,wt(e,n)}function Es(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,zi(e,n)}}function fc(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var s=null,l=null;if(n=n.firstBaseUpdate,n!==null){do{var i={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};l===null?s=l=i:l=l.next=i,n=n.next}while(n!==null);l===null?s=l=t:l=l.next=t}else s=l=t;n={baseState:r.baseState,firstBaseUpdate:s,lastBaseUpdate:l,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function Gs(e,t,n,r){var s=e.updateQueue;Rt=!1;var l=s.firstBaseUpdate,i=s.lastBaseUpdate,o=s.shared.pending;if(o!==null){s.shared.pending=null;var c=o,u=c.next;c.next=null,i===null?l=u:i.next=u,i=c;var d=e.alternate;d!==null&&(d=d.updateQueue,o=d.lastBaseUpdate,o!==i&&(o===null?d.firstBaseUpdate=u:o.next=u,d.lastBaseUpdate=c))}if(l!==null){var h=s.baseState;i=0,d=u=c=null,o=l;do{var y=o.lane,j=o.eventTime;if((r&y)===y){d!==null&&(d=d.next={eventTime:j,lane:0,tag:o.tag,payload:o.payload,callback:o.callback,next:null});e:{var x=e,m=o;switch(y=t,j=n,m.tag){case 1:if(x=m.payload,typeof x=="function"){h=x.call(j,h,y);break e}h=x;break e;case 3:x.flags=x.flags&-65537|128;case 0:if(x=m.payload,y=typeof x=="function"?x.call(j,h,y):x,y==null)break e;h=se({},h,y);break e;case 2:Rt=!0}}o.callback!==null&&o.lane!==0&&(e.flags|=64,y=s.effects,y===null?s.effects=[o]:y.push(o))}else j={eventTime:j,lane:y,tag:o.tag,payload:o.payload,callback:o.callback,next:null},d===null?(u=d=j,c=h):d=d.next=j,i|=y;if(o=o.next,o===null){if(o=s.shared.pending,o===null)break;y=o,o=y.next,y.next=null,s.lastBaseUpdate=y,s.shared.pending=null}}while(!0);if(d===null&&(c=h),s.baseState=c,s.firstBaseUpdate=u,s.lastBaseUpdate=d,t=s.shared.interleaved,t!==null){s=t;do i|=s.lane,s=s.next;while(s!==t)}else l===null&&(s.shared.lanes=0);on|=i,e.lanes=i,e.memoizedState=h}}function pc(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],s=r.callback;if(s!==null){if(r.callback=null,r=n,typeof s!="function")throw Error(R(191,s));s.call(r)}}}var Qr={},dt=Jt(Qr),Lr=Jt(Qr),Or=Jt(Qr);function Zt(e){if(e===Qr)throw Error(R(174));return e}function Qi(e,t){switch(X(Or,t),X(Lr,e),X(dt,Qr),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Cl(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Cl(t,e)}Z(dt),X(dt,t)}function In(){Z(dt),Z(Lr),Z(Or)}function Nd(e){Zt(Or.current);var t=Zt(dt.current),n=Cl(t,e.type);t!==n&&(X(Lr,e),X(dt,n))}function Ki(e){Lr.current===e&&(Z(dt),Z(Lr))}var te=Jt(0);function Zs(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var nl=[];function Xi(){for(var e=0;e<nl.length;e++)nl[e]._workInProgressVersionPrimary=null;nl.length=0}var _s=kt.ReactCurrentDispatcher,rl=kt.ReactCurrentBatchConfig,ln=0,ne=null,ce=null,de=null,ea=!1,yr=!1,Ar=0,lm=0;function xe(){throw Error(R(321))}function Yi(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!rt(e[n],t[n]))return!1;return!0}function Gi(e,t,n,r,s,l){if(ln=l,ne=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,_s.current=e===null||e.memoizedState===null?um:dm,e=n(r,s),yr){l=0;do{if(yr=!1,Ar=0,25<=l)throw Error(R(301));l+=1,de=ce=null,t.updateQueue=null,_s.current=fm,e=n(r,s)}while(yr)}if(_s.current=ta,t=ce!==null&&ce.next!==null,ln=0,de=ce=ne=null,ea=!1,t)throw Error(R(300));return e}function Zi(){var e=Ar!==0;return Ar=0,e}function ot(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return de===null?ne.memoizedState=de=e:de=de.next=e,de}function Ke(){if(ce===null){var e=ne.alternate;e=e!==null?e.memoizedState:null}else e=ce.next;var t=de===null?ne.memoizedState:de.next;if(t!==null)de=t,ce=e;else{if(e===null)throw Error(R(310));ce=e,e={memoizedState:ce.memoizedState,baseState:ce.baseState,baseQueue:ce.baseQueue,queue:ce.queue,next:null},de===null?ne.memoizedState=de=e:de=de.next=e}return de}function Dr(e,t){return typeof t=="function"?t(e):t}function sl(e){var t=Ke(),n=t.queue;if(n===null)throw Error(R(311));n.lastRenderedReducer=e;var r=ce,s=r.baseQueue,l=n.pending;if(l!==null){if(s!==null){var i=s.next;s.next=l.next,l.next=i}r.baseQueue=s=l,n.pending=null}if(s!==null){l=s.next,r=r.baseState;var o=i=null,c=null,u=l;do{var d=u.lane;if((ln&d)===d)c!==null&&(c=c.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),r=u.hasEagerState?u.eagerState:e(r,u.action);else{var h={lane:d,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};c===null?(o=c=h,i=r):c=c.next=h,ne.lanes|=d,on|=d}u=u.next}while(u!==null&&u!==l);c===null?i=r:c.next=o,rt(r,t.memoizedState)||(ze=!0),t.memoizedState=r,t.baseState=i,t.baseQueue=c,n.lastRenderedState=r}if(e=n.interleaved,e!==null){s=e;do l=s.lane,ne.lanes|=l,on|=l,s=s.next;while(s!==e)}else s===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function al(e){var t=Ke(),n=t.queue;if(n===null)throw Error(R(311));n.lastRenderedReducer=e;var r=n.dispatch,s=n.pending,l=t.memoizedState;if(s!==null){n.pending=null;var i=s=s.next;do l=e(l,i.action),i=i.next;while(i!==s);rt(l,t.memoizedState)||(ze=!0),t.memoizedState=l,t.baseQueue===null&&(t.baseState=l),n.lastRenderedState=l}return[l,r]}function Cd(){}function Ed(e,t){var n=ne,r=Ke(),s=t(),l=!rt(r.memoizedState,s);if(l&&(r.memoizedState=s,ze=!0),r=r.queue,eo(Td.bind(null,n,r,e),[e]),r.getSnapshot!==t||l||de!==null&&de.memoizedState.tag&1){if(n.flags|=2048,Mr(9,Rd.bind(null,n,r,s,t),void 0,null),fe===null)throw Error(R(349));ln&30||_d(n,t,s)}return s}function _d(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=ne.updateQueue,t===null?(t={lastEffect:null,stores:null},ne.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Rd(e,t,n,r){t.value=n,t.getSnapshot=r,Pd(t)&&zd(e)}function Td(e,t,n){return n(function(){Pd(t)&&zd(e)})}function Pd(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!rt(e,n)}catch{return!0}}function zd(e){var t=wt(e,1);t!==null&&nt(t,e,1,-1)}function hc(e){var t=ot();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Dr,lastRenderedState:e},t.queue=e,e=e.dispatch=cm.bind(null,ne,e),[t.memoizedState,e]}function Mr(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=ne.updateQueue,t===null?(t={lastEffect:null,stores:null},ne.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function Ld(){return Ke().memoizedState}function Rs(e,t,n,r){var s=ot();ne.flags|=e,s.memoizedState=Mr(1|t,n,void 0,r===void 0?null:r)}function va(e,t,n,r){var s=Ke();r=r===void 0?null:r;var l=void 0;if(ce!==null){var i=ce.memoizedState;if(l=i.destroy,r!==null&&Yi(r,i.deps)){s.memoizedState=Mr(t,n,l,r);return}}ne.flags|=e,s.memoizedState=Mr(1|t,n,l,r)}function mc(e,t){return Rs(8390656,8,e,t)}function eo(e,t){return va(2048,8,e,t)}function Od(e,t){return va(4,2,e,t)}function Ad(e,t){return va(4,4,e,t)}function Dd(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Md(e,t,n){return n=n!=null?n.concat([e]):null,va(4,4,Dd.bind(null,t,e),n)}function to(){}function Fd(e,t){var n=Ke();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Yi(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Id(e,t){var n=Ke();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Yi(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Ud(e,t,n){return ln&21?(rt(n,t)||(n=Vu(),ne.lanes|=n,on|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,ze=!0),e.memoizedState=n)}function im(e,t){var n=Q;Q=n!==0&&4>n?n:4,e(!0);var r=rl.transition;rl.transition={};try{e(!1),t()}finally{Q=n,rl.transition=r}}function Bd(){return Ke().memoizedState}function om(e,t,n){var r=Bt(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},$d(e))Hd(t,n);else if(n=bd(e,t,n,r),n!==null){var s=Se();nt(n,e,r,s),Wd(n,t,r)}}function cm(e,t,n){var r=Bt(e),s={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if($d(e))Hd(t,s);else{var l=e.alternate;if(e.lanes===0&&(l===null||l.lanes===0)&&(l=t.lastRenderedReducer,l!==null))try{var i=t.lastRenderedState,o=l(i,n);if(s.hasEagerState=!0,s.eagerState=o,rt(o,i)){var c=t.interleaved;c===null?(s.next=s,qi(t)):(s.next=c.next,c.next=s),t.interleaved=s;return}}catch{}finally{}n=bd(e,t,s,r),n!==null&&(s=Se(),nt(n,e,r,s),Wd(n,t,r))}}function $d(e){var t=e.alternate;return e===ne||t!==null&&t===ne}function Hd(e,t){yr=ea=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Wd(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,zi(e,n)}}var ta={readContext:Qe,useCallback:xe,useContext:xe,useEffect:xe,useImperativeHandle:xe,useInsertionEffect:xe,useLayoutEffect:xe,useMemo:xe,useReducer:xe,useRef:xe,useState:xe,useDebugValue:xe,useDeferredValue:xe,useTransition:xe,useMutableSource:xe,useSyncExternalStore:xe,useId:xe,unstable_isNewReconciler:!1},um={readContext:Qe,useCallback:function(e,t){return ot().memoizedState=[e,t===void 0?null:t],e},useContext:Qe,useEffect:mc,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Rs(4194308,4,Dd.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Rs(4194308,4,e,t)},useInsertionEffect:function(e,t){return Rs(4,2,e,t)},useMemo:function(e,t){var n=ot();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=ot();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=om.bind(null,ne,e),[r.memoizedState,e]},useRef:function(e){var t=ot();return e={current:e},t.memoizedState=e},useState:hc,useDebugValue:to,useDeferredValue:function(e){return ot().memoizedState=e},useTransition:function(){var e=hc(!1),t=e[0];return e=im.bind(null,e[1]),ot().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=ne,s=ot();if(ee){if(n===void 0)throw Error(R(407));n=n()}else{if(n=t(),fe===null)throw Error(R(349));ln&30||_d(r,t,n)}s.memoizedState=n;var l={value:n,getSnapshot:t};return s.queue=l,mc(Td.bind(null,r,l,e),[e]),r.flags|=2048,Mr(9,Rd.bind(null,r,l,n,t),void 0,null),n},useId:function(){var e=ot(),t=fe.identifierPrefix;if(ee){var n=gt,r=mt;n=(r&~(1<<32-tt(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=Ar++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=lm++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},dm={readContext:Qe,useCallback:Fd,useContext:Qe,useEffect:eo,useImperativeHandle:Md,useInsertionEffect:Od,useLayoutEffect:Ad,useMemo:Id,useReducer:sl,useRef:Ld,useState:function(){return sl(Dr)},useDebugValue:to,useDeferredValue:function(e){var t=Ke();return Ud(t,ce.memoizedState,e)},useTransition:function(){var e=sl(Dr)[0],t=Ke().memoizedState;return[e,t]},useMutableSource:Cd,useSyncExternalStore:Ed,useId:Bd,unstable_isNewReconciler:!1},fm={readContext:Qe,useCallback:Fd,useContext:Qe,useEffect:eo,useImperativeHandle:Md,useInsertionEffect:Od,useLayoutEffect:Ad,useMemo:Id,useReducer:al,useRef:Ld,useState:function(){return al(Dr)},useDebugValue:to,useDeferredValue:function(e){var t=Ke();return ce===null?t.memoizedState=e:Ud(t,ce.memoizedState,e)},useTransition:function(){var e=al(Dr)[0],t=Ke().memoizedState;return[e,t]},useMutableSource:Cd,useSyncExternalStore:Ed,useId:Bd,unstable_isNewReconciler:!1};function Ge(e,t){if(e&&e.defaultProps){t=se({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Jl(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:se({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var wa={isMounted:function(e){return(e=e._reactInternals)?pn(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=Se(),s=Bt(e),l=xt(r,s);l.payload=t,n!=null&&(l.callback=n),t=It(e,l,s),t!==null&&(nt(t,e,s,r),Es(t,e,s))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=Se(),s=Bt(e),l=xt(r,s);l.tag=1,l.payload=t,n!=null&&(l.callback=n),t=It(e,l,s),t!==null&&(nt(t,e,s,r),Es(t,e,s))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Se(),r=Bt(e),s=xt(n,r);s.tag=2,t!=null&&(s.callback=t),t=It(e,s,r),t!==null&&(nt(t,e,r,n),Es(t,e,r))}};function gc(e,t,n,r,s,l,i){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,l,i):t.prototype&&t.prototype.isPureReactComponent?!Rr(n,r)||!Rr(s,l):!0}function Vd(e,t,n){var r=!1,s=Vt,l=t.contextType;return typeof l=="object"&&l!==null?l=Qe(l):(s=Oe(t)?sn:je.current,r=t.contextTypes,l=(r=r!=null)?Dn(e,s):Vt),t=new t(n,l),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=wa,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=s,e.__reactInternalMemoizedMaskedChildContext=l),t}function xc(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&wa.enqueueReplaceState(t,t.state,null)}function Ql(e,t,n,r){var s=e.stateNode;s.props=n,s.state=e.memoizedState,s.refs={},Ji(e);var l=t.contextType;typeof l=="object"&&l!==null?s.context=Qe(l):(l=Oe(t)?sn:je.current,s.context=Dn(e,l)),s.state=e.memoizedState,l=t.getDerivedStateFromProps,typeof l=="function"&&(Jl(e,t,l,n),s.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(t=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),t!==s.state&&wa.enqueueReplaceState(s,s.state,null),Gs(e,n,s,r),s.state=e.memoizedState),typeof s.componentDidMount=="function"&&(e.flags|=4194308)}function Un(e,t){try{var n="",r=t;do n+=Up(r),r=r.return;while(r);var s=n}catch(l){s=`
Error generating stack: `+l.message+`
`+l.stack}return{value:e,source:t,stack:s,digest:null}}function ll(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function Kl(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var pm=typeof WeakMap=="function"?WeakMap:Map;function qd(e,t,n){n=xt(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){ra||(ra=!0,ai=r),Kl(e,t)},n}function Jd(e,t,n){n=xt(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var s=t.value;n.payload=function(){return r(s)},n.callback=function(){Kl(e,t)}}var l=e.stateNode;return l!==null&&typeof l.componentDidCatch=="function"&&(n.callback=function(){Kl(e,t),typeof r!="function"&&(Ut===null?Ut=new Set([this]):Ut.add(this));var i=t.stack;this.componentDidCatch(t.value,{componentStack:i!==null?i:""})}),n}function yc(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new pm;var s=new Set;r.set(t,s)}else s=r.get(t),s===void 0&&(s=new Set,r.set(t,s));s.has(n)||(s.add(n),e=Em.bind(null,e,t,n),t.then(e,e))}function vc(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function wc(e,t,n,r,s){return e.mode&1?(e.flags|=65536,e.lanes=s,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=xt(-1,1),t.tag=2,It(n,t,1))),n.lanes|=1),e)}var hm=kt.ReactCurrentOwner,ze=!1;function be(e,t,n,r){t.child=e===null?kd(t,null,n,r):Fn(t,e.child,n,r)}function jc(e,t,n,r,s){n=n.render;var l=t.ref;return Ln(t,s),r=Gi(e,t,n,r,l,s),n=Zi(),e!==null&&!ze?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~s,jt(e,t,s)):(ee&&n&&Ui(t),t.flags|=1,be(e,t,r,s),t.child)}function kc(e,t,n,r,s){if(e===null){var l=n.type;return typeof l=="function"&&!co(l)&&l.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=l,Qd(e,t,l,r,s)):(e=Ls(n.type,null,r,t,t.mode,s),e.ref=t.ref,e.return=t,t.child=e)}if(l=e.child,!(e.lanes&s)){var i=l.memoizedProps;if(n=n.compare,n=n!==null?n:Rr,n(i,r)&&e.ref===t.ref)return jt(e,t,s)}return t.flags|=1,e=$t(l,r),e.ref=t.ref,e.return=t,t.child=e}function Qd(e,t,n,r,s){if(e!==null){var l=e.memoizedProps;if(Rr(l,r)&&e.ref===t.ref)if(ze=!1,t.pendingProps=r=l,(e.lanes&s)!==0)e.flags&131072&&(ze=!0);else return t.lanes=e.lanes,jt(e,t,s)}return Xl(e,t,n,r,s)}function Kd(e,t,n){var r=t.pendingProps,s=r.children,l=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},X(_n,Me),Me|=n;else{if(!(n&1073741824))return e=l!==null?l.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,X(_n,Me),Me|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=l!==null?l.baseLanes:n,X(_n,Me),Me|=r}else l!==null?(r=l.baseLanes|n,t.memoizedState=null):r=n,X(_n,Me),Me|=r;return be(e,t,s,n),t.child}function Xd(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Xl(e,t,n,r,s){var l=Oe(n)?sn:je.current;return l=Dn(t,l),Ln(t,s),n=Gi(e,t,n,r,l,s),r=Zi(),e!==null&&!ze?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~s,jt(e,t,s)):(ee&&r&&Ui(t),t.flags|=1,be(e,t,n,s),t.child)}function bc(e,t,n,r,s){if(Oe(n)){var l=!0;Js(t)}else l=!1;if(Ln(t,s),t.stateNode===null)Ts(e,t),Vd(t,n,r),Ql(t,n,r,s),r=!0;else if(e===null){var i=t.stateNode,o=t.memoizedProps;i.props=o;var c=i.context,u=n.contextType;typeof u=="object"&&u!==null?u=Qe(u):(u=Oe(n)?sn:je.current,u=Dn(t,u));var d=n.getDerivedStateFromProps,h=typeof d=="function"||typeof i.getSnapshotBeforeUpdate=="function";h||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(o!==r||c!==u)&&xc(t,i,r,u),Rt=!1;var y=t.memoizedState;i.state=y,Gs(t,r,i,s),c=t.memoizedState,o!==r||y!==c||Le.current||Rt?(typeof d=="function"&&(Jl(t,n,d,r),c=t.memoizedState),(o=Rt||gc(t,n,o,r,y,c,u))?(h||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(t.flags|=4194308)):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=c),i.props=r,i.state=c,i.context=u,r=o):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{i=t.stateNode,Sd(e,t),o=t.memoizedProps,u=t.type===t.elementType?o:Ge(t.type,o),i.props=u,h=t.pendingProps,y=i.context,c=n.contextType,typeof c=="object"&&c!==null?c=Qe(c):(c=Oe(n)?sn:je.current,c=Dn(t,c));var j=n.getDerivedStateFromProps;(d=typeof j=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(o!==h||y!==c)&&xc(t,i,r,c),Rt=!1,y=t.memoizedState,i.state=y,Gs(t,r,i,s);var x=t.memoizedState;o!==h||y!==x||Le.current||Rt?(typeof j=="function"&&(Jl(t,n,j,r),x=t.memoizedState),(u=Rt||gc(t,n,u,r,y,x,c)||!1)?(d||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(r,x,c),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(r,x,c)),typeof i.componentDidUpdate=="function"&&(t.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof i.componentDidUpdate!="function"||o===e.memoizedProps&&y===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||o===e.memoizedProps&&y===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=x),i.props=r,i.state=x,i.context=c,r=u):(typeof i.componentDidUpdate!="function"||o===e.memoizedProps&&y===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||o===e.memoizedProps&&y===e.memoizedState||(t.flags|=1024),r=!1)}return Yl(e,t,n,r,l,s)}function Yl(e,t,n,r,s,l){Xd(e,t);var i=(t.flags&128)!==0;if(!r&&!i)return s&&oc(t,n,!1),jt(e,t,l);r=t.stateNode,hm.current=t;var o=i&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&i?(t.child=Fn(t,e.child,null,l),t.child=Fn(t,null,o,l)):be(e,t,o,l),t.memoizedState=r.state,s&&oc(t,n,!0),t.child}function Yd(e){var t=e.stateNode;t.pendingContext?ic(e,t.pendingContext,t.pendingContext!==t.context):t.context&&ic(e,t.context,!1),Qi(e,t.containerInfo)}function Sc(e,t,n,r,s){return Mn(),$i(s),t.flags|=256,be(e,t,n,r),t.child}var Gl={dehydrated:null,treeContext:null,retryLane:0};function Zl(e){return{baseLanes:e,cachePool:null,transitions:null}}function Gd(e,t,n){var r=t.pendingProps,s=te.current,l=!1,i=(t.flags&128)!==0,o;if((o=i)||(o=e!==null&&e.memoizedState===null?!1:(s&2)!==0),o?(l=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(s|=1),X(te,s&1),e===null)return Vl(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(i=r.children,e=r.fallback,l?(r=t.mode,l=t.child,i={mode:"hidden",children:i},!(r&1)&&l!==null?(l.childLanes=0,l.pendingProps=i):l=ba(i,r,0,null),e=nn(e,r,n,null),l.return=t,e.return=t,l.sibling=e,t.child=l,t.child.memoizedState=Zl(n),t.memoizedState=Gl,e):no(t,i));if(s=e.memoizedState,s!==null&&(o=s.dehydrated,o!==null))return mm(e,t,i,r,o,s,n);if(l){l=r.fallback,i=t.mode,s=e.child,o=s.sibling;var c={mode:"hidden",children:r.children};return!(i&1)&&t.child!==s?(r=t.child,r.childLanes=0,r.pendingProps=c,t.deletions=null):(r=$t(s,c),r.subtreeFlags=s.subtreeFlags&14680064),o!==null?l=$t(o,l):(l=nn(l,i,n,null),l.flags|=2),l.return=t,r.return=t,r.sibling=l,t.child=r,r=l,l=t.child,i=e.child.memoizedState,i=i===null?Zl(n):{baseLanes:i.baseLanes|n,cachePool:null,transitions:i.transitions},l.memoizedState=i,l.childLanes=e.childLanes&~n,t.memoizedState=Gl,r}return l=e.child,e=l.sibling,r=$t(l,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function no(e,t){return t=ba({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function gs(e,t,n,r){return r!==null&&$i(r),Fn(t,e.child,null,n),e=no(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function mm(e,t,n,r,s,l,i){if(n)return t.flags&256?(t.flags&=-257,r=ll(Error(R(422))),gs(e,t,i,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(l=r.fallback,s=t.mode,r=ba({mode:"visible",children:r.children},s,0,null),l=nn(l,s,i,null),l.flags|=2,r.return=t,l.return=t,r.sibling=l,t.child=r,t.mode&1&&Fn(t,e.child,null,i),t.child.memoizedState=Zl(i),t.memoizedState=Gl,l);if(!(t.mode&1))return gs(e,t,i,null);if(s.data==="$!"){if(r=s.nextSibling&&s.nextSibling.dataset,r)var o=r.dgst;return r=o,l=Error(R(419)),r=ll(l,r,void 0),gs(e,t,i,r)}if(o=(i&e.childLanes)!==0,ze||o){if(r=fe,r!==null){switch(i&-i){case 4:s=2;break;case 16:s=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:s=32;break;case 536870912:s=268435456;break;default:s=0}s=s&(r.suspendedLanes|i)?0:s,s!==0&&s!==l.retryLane&&(l.retryLane=s,wt(e,s),nt(r,e,s,-1))}return oo(),r=ll(Error(R(421))),gs(e,t,i,r)}return s.data==="$?"?(t.flags|=128,t.child=e.child,t=_m.bind(null,e),s._reactRetry=t,null):(e=l.treeContext,Fe=Ft(s.nextSibling),Ie=t,ee=!0,et=null,e!==null&&(We[Ve++]=mt,We[Ve++]=gt,We[Ve++]=an,mt=e.id,gt=e.overflow,an=t),t=no(t,r.children),t.flags|=4096,t)}function Nc(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),ql(e.return,t,n)}function il(e,t,n,r,s){var l=e.memoizedState;l===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:s}:(l.isBackwards=t,l.rendering=null,l.renderingStartTime=0,l.last=r,l.tail=n,l.tailMode=s)}function Zd(e,t,n){var r=t.pendingProps,s=r.revealOrder,l=r.tail;if(be(e,t,r.children,n),r=te.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Nc(e,n,t);else if(e.tag===19)Nc(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(X(te,r),!(t.mode&1))t.memoizedState=null;else switch(s){case"forwards":for(n=t.child,s=null;n!==null;)e=n.alternate,e!==null&&Zs(e)===null&&(s=n),n=n.sibling;n=s,n===null?(s=t.child,t.child=null):(s=n.sibling,n.sibling=null),il(t,!1,s,n,l);break;case"backwards":for(n=null,s=t.child,t.child=null;s!==null;){if(e=s.alternate,e!==null&&Zs(e)===null){t.child=s;break}e=s.sibling,s.sibling=n,n=s,s=e}il(t,!0,n,null,l);break;case"together":il(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Ts(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function jt(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),on|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(R(153));if(t.child!==null){for(e=t.child,n=$t(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=$t(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function gm(e,t,n){switch(t.tag){case 3:Yd(t),Mn();break;case 5:Nd(t);break;case 1:Oe(t.type)&&Js(t);break;case 4:Qi(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,s=t.memoizedProps.value;X(Xs,r._currentValue),r._currentValue=s;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(X(te,te.current&1),t.flags|=128,null):n&t.child.childLanes?Gd(e,t,n):(X(te,te.current&1),e=jt(e,t,n),e!==null?e.sibling:null);X(te,te.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return Zd(e,t,n);t.flags|=128}if(s=t.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),X(te,te.current),r)break;return null;case 22:case 23:return t.lanes=0,Kd(e,t,n)}return jt(e,t,n)}var ef,ei,tf,nf;ef=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};ei=function(){};tf=function(e,t,n,r){var s=e.memoizedProps;if(s!==r){e=t.stateNode,Zt(dt.current);var l=null;switch(n){case"input":s=kl(e,s),r=kl(e,r),l=[];break;case"select":s=se({},s,{value:void 0}),r=se({},r,{value:void 0}),l=[];break;case"textarea":s=Nl(e,s),r=Nl(e,r),l=[];break;default:typeof s.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Vs)}El(n,r);var i;n=null;for(u in s)if(!r.hasOwnProperty(u)&&s.hasOwnProperty(u)&&s[u]!=null)if(u==="style"){var o=s[u];for(i in o)o.hasOwnProperty(i)&&(n||(n={}),n[i]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(kr.hasOwnProperty(u)?l||(l=[]):(l=l||[]).push(u,null));for(u in r){var c=r[u];if(o=s!=null?s[u]:void 0,r.hasOwnProperty(u)&&c!==o&&(c!=null||o!=null))if(u==="style")if(o){for(i in o)!o.hasOwnProperty(i)||c&&c.hasOwnProperty(i)||(n||(n={}),n[i]="");for(i in c)c.hasOwnProperty(i)&&o[i]!==c[i]&&(n||(n={}),n[i]=c[i])}else n||(l||(l=[]),l.push(u,n)),n=c;else u==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,o=o?o.__html:void 0,c!=null&&o!==c&&(l=l||[]).push(u,c)):u==="children"?typeof c!="string"&&typeof c!="number"||(l=l||[]).push(u,""+c):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(kr.hasOwnProperty(u)?(c!=null&&u==="onScroll"&&G("scroll",e),l||o===c||(l=[])):(l=l||[]).push(u,c))}n&&(l=l||[]).push("style",n);var u=l;(t.updateQueue=u)&&(t.flags|=4)}};nf=function(e,t,n,r){n!==r&&(t.flags|=4)};function ar(e,t){if(!ee)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function ye(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var s=e.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags&14680064,r|=s.flags&14680064,s.return=e,s=s.sibling;else for(s=e.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags,r|=s.flags,s.return=e,s=s.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function xm(e,t,n){var r=t.pendingProps;switch(Bi(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return ye(t),null;case 1:return Oe(t.type)&&qs(),ye(t),null;case 3:return r=t.stateNode,In(),Z(Le),Z(je),Xi(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(hs(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,et!==null&&(oi(et),et=null))),ei(e,t),ye(t),null;case 5:Ki(t);var s=Zt(Or.current);if(n=t.type,e!==null&&t.stateNode!=null)tf(e,t,n,r,s),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(R(166));return ye(t),null}if(e=Zt(dt.current),hs(t)){r=t.stateNode,n=t.type;var l=t.memoizedProps;switch(r[ct]=t,r[zr]=l,e=(t.mode&1)!==0,n){case"dialog":G("cancel",r),G("close",r);break;case"iframe":case"object":case"embed":G("load",r);break;case"video":case"audio":for(s=0;s<dr.length;s++)G(dr[s],r);break;case"source":G("error",r);break;case"img":case"image":case"link":G("error",r),G("load",r);break;case"details":G("toggle",r);break;case"input":Oo(r,l),G("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!l.multiple},G("invalid",r);break;case"textarea":Do(r,l),G("invalid",r)}El(n,l),s=null;for(var i in l)if(l.hasOwnProperty(i)){var o=l[i];i==="children"?typeof o=="string"?r.textContent!==o&&(l.suppressHydrationWarning!==!0&&ps(r.textContent,o,e),s=["children",o]):typeof o=="number"&&r.textContent!==""+o&&(l.suppressHydrationWarning!==!0&&ps(r.textContent,o,e),s=["children",""+o]):kr.hasOwnProperty(i)&&o!=null&&i==="onScroll"&&G("scroll",r)}switch(n){case"input":as(r),Ao(r,l,!0);break;case"textarea":as(r),Mo(r);break;case"select":case"option":break;default:typeof l.onClick=="function"&&(r.onclick=Vs)}r=s,t.updateQueue=r,r!==null&&(t.flags|=4)}else{i=s.nodeType===9?s:s.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Tu(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=i.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=i.createElement(n,{is:r.is}):(e=i.createElement(n),n==="select"&&(i=e,r.multiple?i.multiple=!0:r.size&&(i.size=r.size))):e=i.createElementNS(e,n),e[ct]=t,e[zr]=r,ef(e,t,!1,!1),t.stateNode=e;e:{switch(i=_l(n,r),n){case"dialog":G("cancel",e),G("close",e),s=r;break;case"iframe":case"object":case"embed":G("load",e),s=r;break;case"video":case"audio":for(s=0;s<dr.length;s++)G(dr[s],e);s=r;break;case"source":G("error",e),s=r;break;case"img":case"image":case"link":G("error",e),G("load",e),s=r;break;case"details":G("toggle",e),s=r;break;case"input":Oo(e,r),s=kl(e,r),G("invalid",e);break;case"option":s=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},s=se({},r,{value:void 0}),G("invalid",e);break;case"textarea":Do(e,r),s=Nl(e,r),G("invalid",e);break;default:s=r}El(n,s),o=s;for(l in o)if(o.hasOwnProperty(l)){var c=o[l];l==="style"?Lu(e,c):l==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&Pu(e,c)):l==="children"?typeof c=="string"?(n!=="textarea"||c!=="")&&br(e,c):typeof c=="number"&&br(e,""+c):l!=="suppressContentEditableWarning"&&l!=="suppressHydrationWarning"&&l!=="autoFocus"&&(kr.hasOwnProperty(l)?c!=null&&l==="onScroll"&&G("scroll",e):c!=null&&Ci(e,l,c,i))}switch(n){case"input":as(e),Ao(e,r,!1);break;case"textarea":as(e),Mo(e);break;case"option":r.value!=null&&e.setAttribute("value",""+Wt(r.value));break;case"select":e.multiple=!!r.multiple,l=r.value,l!=null?Rn(e,!!r.multiple,l,!1):r.defaultValue!=null&&Rn(e,!!r.multiple,r.defaultValue,!0);break;default:typeof s.onClick=="function"&&(e.onclick=Vs)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return ye(t),null;case 6:if(e&&t.stateNode!=null)nf(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(R(166));if(n=Zt(Or.current),Zt(dt.current),hs(t)){if(r=t.stateNode,n=t.memoizedProps,r[ct]=t,(l=r.nodeValue!==n)&&(e=Ie,e!==null))switch(e.tag){case 3:ps(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&ps(r.nodeValue,n,(e.mode&1)!==0)}l&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[ct]=t,t.stateNode=r}return ye(t),null;case 13:if(Z(te),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(ee&&Fe!==null&&t.mode&1&&!(t.flags&128))wd(),Mn(),t.flags|=98560,l=!1;else if(l=hs(t),r!==null&&r.dehydrated!==null){if(e===null){if(!l)throw Error(R(318));if(l=t.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(R(317));l[ct]=t}else Mn(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;ye(t),l=!1}else et!==null&&(oi(et),et=null),l=!0;if(!l)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||te.current&1?ue===0&&(ue=3):oo())),t.updateQueue!==null&&(t.flags|=4),ye(t),null);case 4:return In(),ei(e,t),e===null&&Tr(t.stateNode.containerInfo),ye(t),null;case 10:return Vi(t.type._context),ye(t),null;case 17:return Oe(t.type)&&qs(),ye(t),null;case 19:if(Z(te),l=t.memoizedState,l===null)return ye(t),null;if(r=(t.flags&128)!==0,i=l.rendering,i===null)if(r)ar(l,!1);else{if(ue!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(i=Zs(e),i!==null){for(t.flags|=128,ar(l,!1),r=i.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)l=n,e=r,l.flags&=14680066,i=l.alternate,i===null?(l.childLanes=0,l.lanes=e,l.child=null,l.subtreeFlags=0,l.memoizedProps=null,l.memoizedState=null,l.updateQueue=null,l.dependencies=null,l.stateNode=null):(l.childLanes=i.childLanes,l.lanes=i.lanes,l.child=i.child,l.subtreeFlags=0,l.deletions=null,l.memoizedProps=i.memoizedProps,l.memoizedState=i.memoizedState,l.updateQueue=i.updateQueue,l.type=i.type,e=i.dependencies,l.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return X(te,te.current&1|2),t.child}e=e.sibling}l.tail!==null&&ie()>Bn&&(t.flags|=128,r=!0,ar(l,!1),t.lanes=4194304)}else{if(!r)if(e=Zs(i),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),ar(l,!0),l.tail===null&&l.tailMode==="hidden"&&!i.alternate&&!ee)return ye(t),null}else 2*ie()-l.renderingStartTime>Bn&&n!==1073741824&&(t.flags|=128,r=!0,ar(l,!1),t.lanes=4194304);l.isBackwards?(i.sibling=t.child,t.child=i):(n=l.last,n!==null?n.sibling=i:t.child=i,l.last=i)}return l.tail!==null?(t=l.tail,l.rendering=t,l.tail=t.sibling,l.renderingStartTime=ie(),t.sibling=null,n=te.current,X(te,r?n&1|2:n&1),t):(ye(t),null);case 22:case 23:return io(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?Me&1073741824&&(ye(t),t.subtreeFlags&6&&(t.flags|=8192)):ye(t),null;case 24:return null;case 25:return null}throw Error(R(156,t.tag))}function ym(e,t){switch(Bi(t),t.tag){case 1:return Oe(t.type)&&qs(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return In(),Z(Le),Z(je),Xi(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Ki(t),null;case 13:if(Z(te),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(R(340));Mn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Z(te),null;case 4:return In(),null;case 10:return Vi(t.type._context),null;case 22:case 23:return io(),null;case 24:return null;default:return null}}var xs=!1,ve=!1,vm=typeof WeakSet=="function"?WeakSet:Set,O=null;function En(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){le(e,t,r)}else n.current=null}function ti(e,t,n){try{n()}catch(r){le(e,t,r)}}var Cc=!1;function wm(e,t){if(Fl=$s,e=id(),Ii(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var s=r.anchorOffset,l=r.focusNode;r=r.focusOffset;try{n.nodeType,l.nodeType}catch{n=null;break e}var i=0,o=-1,c=-1,u=0,d=0,h=e,y=null;t:for(;;){for(var j;h!==n||s!==0&&h.nodeType!==3||(o=i+s),h!==l||r!==0&&h.nodeType!==3||(c=i+r),h.nodeType===3&&(i+=h.nodeValue.length),(j=h.firstChild)!==null;)y=h,h=j;for(;;){if(h===e)break t;if(y===n&&++u===s&&(o=i),y===l&&++d===r&&(c=i),(j=h.nextSibling)!==null)break;h=y,y=h.parentNode}h=j}n=o===-1||c===-1?null:{start:o,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(Il={focusedElem:e,selectionRange:n},$s=!1,O=t;O!==null;)if(t=O,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,O=e;else for(;O!==null;){t=O;try{var x=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(x!==null){var m=x.memoizedProps,w=x.memoizedState,f=t.stateNode,p=f.getSnapshotBeforeUpdate(t.elementType===t.type?m:Ge(t.type,m),w);f.__reactInternalSnapshotBeforeUpdate=p}break;case 3:var g=t.stateNode.containerInfo;g.nodeType===1?g.textContent="":g.nodeType===9&&g.documentElement&&g.removeChild(g.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(R(163))}}catch(b){le(t,t.return,b)}if(e=t.sibling,e!==null){e.return=t.return,O=e;break}O=t.return}return x=Cc,Cc=!1,x}function vr(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var s=r=r.next;do{if((s.tag&e)===e){var l=s.destroy;s.destroy=void 0,l!==void 0&&ti(t,n,l)}s=s.next}while(s!==r)}}function ja(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function ni(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function rf(e){var t=e.alternate;t!==null&&(e.alternate=null,rf(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[ct],delete t[zr],delete t[$l],delete t[nm],delete t[rm])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function sf(e){return e.tag===5||e.tag===3||e.tag===4}function Ec(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||sf(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function ri(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Vs));else if(r!==4&&(e=e.child,e!==null))for(ri(e,t,n),e=e.sibling;e!==null;)ri(e,t,n),e=e.sibling}function si(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(si(e,t,n),e=e.sibling;e!==null;)si(e,t,n),e=e.sibling}var pe=null,Ze=!1;function Et(e,t,n){for(n=n.child;n!==null;)af(e,t,n),n=n.sibling}function af(e,t,n){if(ut&&typeof ut.onCommitFiberUnmount=="function")try{ut.onCommitFiberUnmount(pa,n)}catch{}switch(n.tag){case 5:ve||En(n,t);case 6:var r=pe,s=Ze;pe=null,Et(e,t,n),pe=r,Ze=s,pe!==null&&(Ze?(e=pe,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):pe.removeChild(n.stateNode));break;case 18:pe!==null&&(Ze?(e=pe,n=n.stateNode,e.nodeType===8?el(e.parentNode,n):e.nodeType===1&&el(e,n),Er(e)):el(pe,n.stateNode));break;case 4:r=pe,s=Ze,pe=n.stateNode.containerInfo,Ze=!0,Et(e,t,n),pe=r,Ze=s;break;case 0:case 11:case 14:case 15:if(!ve&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){s=r=r.next;do{var l=s,i=l.destroy;l=l.tag,i!==void 0&&(l&2||l&4)&&ti(n,t,i),s=s.next}while(s!==r)}Et(e,t,n);break;case 1:if(!ve&&(En(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(o){le(n,t,o)}Et(e,t,n);break;case 21:Et(e,t,n);break;case 22:n.mode&1?(ve=(r=ve)||n.memoizedState!==null,Et(e,t,n),ve=r):Et(e,t,n);break;default:Et(e,t,n)}}function _c(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new vm),t.forEach(function(r){var s=Rm.bind(null,e,r);n.has(r)||(n.add(r),r.then(s,s))})}}function Ye(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var s=n[r];try{var l=e,i=t,o=i;e:for(;o!==null;){switch(o.tag){case 5:pe=o.stateNode,Ze=!1;break e;case 3:pe=o.stateNode.containerInfo,Ze=!0;break e;case 4:pe=o.stateNode.containerInfo,Ze=!0;break e}o=o.return}if(pe===null)throw Error(R(160));af(l,i,s),pe=null,Ze=!1;var c=s.alternate;c!==null&&(c.return=null),s.return=null}catch(u){le(s,t,u)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)lf(t,e),t=t.sibling}function lf(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Ye(t,e),lt(e),r&4){try{vr(3,e,e.return),ja(3,e)}catch(m){le(e,e.return,m)}try{vr(5,e,e.return)}catch(m){le(e,e.return,m)}}break;case 1:Ye(t,e),lt(e),r&512&&n!==null&&En(n,n.return);break;case 5:if(Ye(t,e),lt(e),r&512&&n!==null&&En(n,n.return),e.flags&32){var s=e.stateNode;try{br(s,"")}catch(m){le(e,e.return,m)}}if(r&4&&(s=e.stateNode,s!=null)){var l=e.memoizedProps,i=n!==null?n.memoizedProps:l,o=e.type,c=e.updateQueue;if(e.updateQueue=null,c!==null)try{o==="input"&&l.type==="radio"&&l.name!=null&&_u(s,l),_l(o,i);var u=_l(o,l);for(i=0;i<c.length;i+=2){var d=c[i],h=c[i+1];d==="style"?Lu(s,h):d==="dangerouslySetInnerHTML"?Pu(s,h):d==="children"?br(s,h):Ci(s,d,h,u)}switch(o){case"input":bl(s,l);break;case"textarea":Ru(s,l);break;case"select":var y=s._wrapperState.wasMultiple;s._wrapperState.wasMultiple=!!l.multiple;var j=l.value;j!=null?Rn(s,!!l.multiple,j,!1):y!==!!l.multiple&&(l.defaultValue!=null?Rn(s,!!l.multiple,l.defaultValue,!0):Rn(s,!!l.multiple,l.multiple?[]:"",!1))}s[zr]=l}catch(m){le(e,e.return,m)}}break;case 6:if(Ye(t,e),lt(e),r&4){if(e.stateNode===null)throw Error(R(162));s=e.stateNode,l=e.memoizedProps;try{s.nodeValue=l}catch(m){le(e,e.return,m)}}break;case 3:if(Ye(t,e),lt(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Er(t.containerInfo)}catch(m){le(e,e.return,m)}break;case 4:Ye(t,e),lt(e);break;case 13:Ye(t,e),lt(e),s=e.child,s.flags&8192&&(l=s.memoizedState!==null,s.stateNode.isHidden=l,!l||s.alternate!==null&&s.alternate.memoizedState!==null||(ao=ie())),r&4&&_c(e);break;case 22:if(d=n!==null&&n.memoizedState!==null,e.mode&1?(ve=(u=ve)||d,Ye(t,e),ve=u):Ye(t,e),lt(e),r&8192){if(u=e.memoizedState!==null,(e.stateNode.isHidden=u)&&!d&&e.mode&1)for(O=e,d=e.child;d!==null;){for(h=O=d;O!==null;){switch(y=O,j=y.child,y.tag){case 0:case 11:case 14:case 15:vr(4,y,y.return);break;case 1:En(y,y.return);var x=y.stateNode;if(typeof x.componentWillUnmount=="function"){r=y,n=y.return;try{t=r,x.props=t.memoizedProps,x.state=t.memoizedState,x.componentWillUnmount()}catch(m){le(r,n,m)}}break;case 5:En(y,y.return);break;case 22:if(y.memoizedState!==null){Tc(h);continue}}j!==null?(j.return=y,O=j):Tc(h)}d=d.sibling}e:for(d=null,h=e;;){if(h.tag===5){if(d===null){d=h;try{s=h.stateNode,u?(l=s.style,typeof l.setProperty=="function"?l.setProperty("display","none","important"):l.display="none"):(o=h.stateNode,c=h.memoizedProps.style,i=c!=null&&c.hasOwnProperty("display")?c.display:null,o.style.display=zu("display",i))}catch(m){le(e,e.return,m)}}}else if(h.tag===6){if(d===null)try{h.stateNode.nodeValue=u?"":h.memoizedProps}catch(m){le(e,e.return,m)}}else if((h.tag!==22&&h.tag!==23||h.memoizedState===null||h===e)&&h.child!==null){h.child.return=h,h=h.child;continue}if(h===e)break e;for(;h.sibling===null;){if(h.return===null||h.return===e)break e;d===h&&(d=null),h=h.return}d===h&&(d=null),h.sibling.return=h.return,h=h.sibling}}break;case 19:Ye(t,e),lt(e),r&4&&_c(e);break;case 21:break;default:Ye(t,e),lt(e)}}function lt(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(sf(n)){var r=n;break e}n=n.return}throw Error(R(160))}switch(r.tag){case 5:var s=r.stateNode;r.flags&32&&(br(s,""),r.flags&=-33);var l=Ec(e);si(e,l,s);break;case 3:case 4:var i=r.stateNode.containerInfo,o=Ec(e);ri(e,o,i);break;default:throw Error(R(161))}}catch(c){le(e,e.return,c)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function jm(e,t,n){O=e,of(e)}function of(e,t,n){for(var r=(e.mode&1)!==0;O!==null;){var s=O,l=s.child;if(s.tag===22&&r){var i=s.memoizedState!==null||xs;if(!i){var o=s.alternate,c=o!==null&&o.memoizedState!==null||ve;o=xs;var u=ve;if(xs=i,(ve=c)&&!u)for(O=s;O!==null;)i=O,c=i.child,i.tag===22&&i.memoizedState!==null?Pc(s):c!==null?(c.return=i,O=c):Pc(s);for(;l!==null;)O=l,of(l),l=l.sibling;O=s,xs=o,ve=u}Rc(e)}else s.subtreeFlags&8772&&l!==null?(l.return=s,O=l):Rc(e)}}function Rc(e){for(;O!==null;){var t=O;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:ve||ja(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!ve)if(n===null)r.componentDidMount();else{var s=t.elementType===t.type?n.memoizedProps:Ge(t.type,n.memoizedProps);r.componentDidUpdate(s,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var l=t.updateQueue;l!==null&&pc(t,l,r);break;case 3:var i=t.updateQueue;if(i!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}pc(t,i,n)}break;case 5:var o=t.stateNode;if(n===null&&t.flags&4){n=o;var c=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&n.focus();break;case"img":c.src&&(n.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var u=t.alternate;if(u!==null){var d=u.memoizedState;if(d!==null){var h=d.dehydrated;h!==null&&Er(h)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(R(163))}ve||t.flags&512&&ni(t)}catch(y){le(t,t.return,y)}}if(t===e){O=null;break}if(n=t.sibling,n!==null){n.return=t.return,O=n;break}O=t.return}}function Tc(e){for(;O!==null;){var t=O;if(t===e){O=null;break}var n=t.sibling;if(n!==null){n.return=t.return,O=n;break}O=t.return}}function Pc(e){for(;O!==null;){var t=O;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{ja(4,t)}catch(c){le(t,n,c)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var s=t.return;try{r.componentDidMount()}catch(c){le(t,s,c)}}var l=t.return;try{ni(t)}catch(c){le(t,l,c)}break;case 5:var i=t.return;try{ni(t)}catch(c){le(t,i,c)}}}catch(c){le(t,t.return,c)}if(t===e){O=null;break}var o=t.sibling;if(o!==null){o.return=t.return,O=o;break}O=t.return}}var km=Math.ceil,na=kt.ReactCurrentDispatcher,ro=kt.ReactCurrentOwner,Je=kt.ReactCurrentBatchConfig,J=0,fe=null,oe=null,he=0,Me=0,_n=Jt(0),ue=0,Fr=null,on=0,ka=0,so=0,wr=null,Pe=null,ao=0,Bn=1/0,pt=null,ra=!1,ai=null,Ut=null,ys=!1,Lt=null,sa=0,jr=0,li=null,Ps=-1,zs=0;function Se(){return J&6?ie():Ps!==-1?Ps:Ps=ie()}function Bt(e){return e.mode&1?J&2&&he!==0?he&-he:am.transition!==null?(zs===0&&(zs=Vu()),zs):(e=Q,e!==0||(e=window.event,e=e===void 0?16:Gu(e.type)),e):1}function nt(e,t,n,r){if(50<jr)throw jr=0,li=null,Error(R(185));Vr(e,n,r),(!(J&2)||e!==fe)&&(e===fe&&(!(J&2)&&(ka|=n),ue===4&&Pt(e,he)),Ae(e,r),n===1&&J===0&&!(t.mode&1)&&(Bn=ie()+500,ya&&Qt()))}function Ae(e,t){var n=e.callbackNode;ah(e,t);var r=Bs(e,e===fe?he:0);if(r===0)n!==null&&Uo(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&Uo(n),t===1)e.tag===0?sm(zc.bind(null,e)):xd(zc.bind(null,e)),em(function(){!(J&6)&&Qt()}),n=null;else{switch(qu(r)){case 1:n=Pi;break;case 4:n=Hu;break;case 16:n=Us;break;case 536870912:n=Wu;break;default:n=Us}n=gf(n,cf.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function cf(e,t){if(Ps=-1,zs=0,J&6)throw Error(R(327));var n=e.callbackNode;if(On()&&e.callbackNode!==n)return null;var r=Bs(e,e===fe?he:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=aa(e,r);else{t=r;var s=J;J|=2;var l=df();(fe!==e||he!==t)&&(pt=null,Bn=ie()+500,tn(e,t));do try{Nm();break}catch(o){uf(e,o)}while(!0);Wi(),na.current=l,J=s,oe!==null?t=0:(fe=null,he=0,t=ue)}if(t!==0){if(t===2&&(s=Ll(e),s!==0&&(r=s,t=ii(e,s))),t===1)throw n=Fr,tn(e,0),Pt(e,r),Ae(e,ie()),n;if(t===6)Pt(e,r);else{if(s=e.current.alternate,!(r&30)&&!bm(s)&&(t=aa(e,r),t===2&&(l=Ll(e),l!==0&&(r=l,t=ii(e,l))),t===1))throw n=Fr,tn(e,0),Pt(e,r),Ae(e,ie()),n;switch(e.finishedWork=s,e.finishedLanes=r,t){case 0:case 1:throw Error(R(345));case 2:Xt(e,Pe,pt);break;case 3:if(Pt(e,r),(r&130023424)===r&&(t=ao+500-ie(),10<t)){if(Bs(e,0)!==0)break;if(s=e.suspendedLanes,(s&r)!==r){Se(),e.pingedLanes|=e.suspendedLanes&s;break}e.timeoutHandle=Bl(Xt.bind(null,e,Pe,pt),t);break}Xt(e,Pe,pt);break;case 4:if(Pt(e,r),(r&4194240)===r)break;for(t=e.eventTimes,s=-1;0<r;){var i=31-tt(r);l=1<<i,i=t[i],i>s&&(s=i),r&=~l}if(r=s,r=ie()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*km(r/1960))-r,10<r){e.timeoutHandle=Bl(Xt.bind(null,e,Pe,pt),r);break}Xt(e,Pe,pt);break;case 5:Xt(e,Pe,pt);break;default:throw Error(R(329))}}}return Ae(e,ie()),e.callbackNode===n?cf.bind(null,e):null}function ii(e,t){var n=wr;return e.current.memoizedState.isDehydrated&&(tn(e,t).flags|=256),e=aa(e,t),e!==2&&(t=Pe,Pe=n,t!==null&&oi(t)),e}function oi(e){Pe===null?Pe=e:Pe.push.apply(Pe,e)}function bm(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var s=n[r],l=s.getSnapshot;s=s.value;try{if(!rt(l(),s))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Pt(e,t){for(t&=~so,t&=~ka,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-tt(t),r=1<<n;e[n]=-1,t&=~r}}function zc(e){if(J&6)throw Error(R(327));On();var t=Bs(e,0);if(!(t&1))return Ae(e,ie()),null;var n=aa(e,t);if(e.tag!==0&&n===2){var r=Ll(e);r!==0&&(t=r,n=ii(e,r))}if(n===1)throw n=Fr,tn(e,0),Pt(e,t),Ae(e,ie()),n;if(n===6)throw Error(R(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Xt(e,Pe,pt),Ae(e,ie()),null}function lo(e,t){var n=J;J|=1;try{return e(t)}finally{J=n,J===0&&(Bn=ie()+500,ya&&Qt())}}function cn(e){Lt!==null&&Lt.tag===0&&!(J&6)&&On();var t=J;J|=1;var n=Je.transition,r=Q;try{if(Je.transition=null,Q=1,e)return e()}finally{Q=r,Je.transition=n,J=t,!(J&6)&&Qt()}}function io(){Me=_n.current,Z(_n)}function tn(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,Zh(n)),oe!==null)for(n=oe.return;n!==null;){var r=n;switch(Bi(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&qs();break;case 3:In(),Z(Le),Z(je),Xi();break;case 5:Ki(r);break;case 4:In();break;case 13:Z(te);break;case 19:Z(te);break;case 10:Vi(r.type._context);break;case 22:case 23:io()}n=n.return}if(fe=e,oe=e=$t(e.current,null),he=Me=t,ue=0,Fr=null,so=ka=on=0,Pe=wr=null,Gt!==null){for(t=0;t<Gt.length;t++)if(n=Gt[t],r=n.interleaved,r!==null){n.interleaved=null;var s=r.next,l=n.pending;if(l!==null){var i=l.next;l.next=s,r.next=i}n.pending=r}Gt=null}return e}function uf(e,t){do{var n=oe;try{if(Wi(),_s.current=ta,ea){for(var r=ne.memoizedState;r!==null;){var s=r.queue;s!==null&&(s.pending=null),r=r.next}ea=!1}if(ln=0,de=ce=ne=null,yr=!1,Ar=0,ro.current=null,n===null||n.return===null){ue=1,Fr=t,oe=null;break}e:{var l=e,i=n.return,o=n,c=t;if(t=he,o.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var u=c,d=o,h=d.tag;if(!(d.mode&1)&&(h===0||h===11||h===15)){var y=d.alternate;y?(d.updateQueue=y.updateQueue,d.memoizedState=y.memoizedState,d.lanes=y.lanes):(d.updateQueue=null,d.memoizedState=null)}var j=vc(i);if(j!==null){j.flags&=-257,wc(j,i,o,l,t),j.mode&1&&yc(l,u,t),t=j,c=u;var x=t.updateQueue;if(x===null){var m=new Set;m.add(c),t.updateQueue=m}else x.add(c);break e}else{if(!(t&1)){yc(l,u,t),oo();break e}c=Error(R(426))}}else if(ee&&o.mode&1){var w=vc(i);if(w!==null){!(w.flags&65536)&&(w.flags|=256),wc(w,i,o,l,t),$i(Un(c,o));break e}}l=c=Un(c,o),ue!==4&&(ue=2),wr===null?wr=[l]:wr.push(l),l=i;do{switch(l.tag){case 3:l.flags|=65536,t&=-t,l.lanes|=t;var f=qd(l,c,t);fc(l,f);break e;case 1:o=c;var p=l.type,g=l.stateNode;if(!(l.flags&128)&&(typeof p.getDerivedStateFromError=="function"||g!==null&&typeof g.componentDidCatch=="function"&&(Ut===null||!Ut.has(g)))){l.flags|=65536,t&=-t,l.lanes|=t;var b=Jd(l,o,t);fc(l,b);break e}}l=l.return}while(l!==null)}pf(n)}catch(E){t=E,oe===n&&n!==null&&(oe=n=n.return);continue}break}while(!0)}function df(){var e=na.current;return na.current=ta,e===null?ta:e}function oo(){(ue===0||ue===3||ue===2)&&(ue=4),fe===null||!(on&268435455)&&!(ka&268435455)||Pt(fe,he)}function aa(e,t){var n=J;J|=2;var r=df();(fe!==e||he!==t)&&(pt=null,tn(e,t));do try{Sm();break}catch(s){uf(e,s)}while(!0);if(Wi(),J=n,na.current=r,oe!==null)throw Error(R(261));return fe=null,he=0,ue}function Sm(){for(;oe!==null;)ff(oe)}function Nm(){for(;oe!==null&&!Xp();)ff(oe)}function ff(e){var t=mf(e.alternate,e,Me);e.memoizedProps=e.pendingProps,t===null?pf(e):oe=t,ro.current=null}function pf(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=ym(n,t),n!==null){n.flags&=32767,oe=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{ue=6,oe=null;return}}else if(n=xm(n,t,Me),n!==null){oe=n;return}if(t=t.sibling,t!==null){oe=t;return}oe=t=e}while(t!==null);ue===0&&(ue=5)}function Xt(e,t,n){var r=Q,s=Je.transition;try{Je.transition=null,Q=1,Cm(e,t,n,r)}finally{Je.transition=s,Q=r}return null}function Cm(e,t,n,r){do On();while(Lt!==null);if(J&6)throw Error(R(327));n=e.finishedWork;var s=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(R(177));e.callbackNode=null,e.callbackPriority=0;var l=n.lanes|n.childLanes;if(lh(e,l),e===fe&&(oe=fe=null,he=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||ys||(ys=!0,gf(Us,function(){return On(),null})),l=(n.flags&15990)!==0,n.subtreeFlags&15990||l){l=Je.transition,Je.transition=null;var i=Q;Q=1;var o=J;J|=4,ro.current=null,wm(e,n),lf(n,e),qh(Il),$s=!!Fl,Il=Fl=null,e.current=n,jm(n),Yp(),J=o,Q=i,Je.transition=l}else e.current=n;if(ys&&(ys=!1,Lt=e,sa=s),l=e.pendingLanes,l===0&&(Ut=null),eh(n.stateNode),Ae(e,ie()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)s=t[n],r(s.value,{componentStack:s.stack,digest:s.digest});if(ra)throw ra=!1,e=ai,ai=null,e;return sa&1&&e.tag!==0&&On(),l=e.pendingLanes,l&1?e===li?jr++:(jr=0,li=e):jr=0,Qt(),null}function On(){if(Lt!==null){var e=qu(sa),t=Je.transition,n=Q;try{if(Je.transition=null,Q=16>e?16:e,Lt===null)var r=!1;else{if(e=Lt,Lt=null,sa=0,J&6)throw Error(R(331));var s=J;for(J|=4,O=e.current;O!==null;){var l=O,i=l.child;if(O.flags&16){var o=l.deletions;if(o!==null){for(var c=0;c<o.length;c++){var u=o[c];for(O=u;O!==null;){var d=O;switch(d.tag){case 0:case 11:case 15:vr(8,d,l)}var h=d.child;if(h!==null)h.return=d,O=h;else for(;O!==null;){d=O;var y=d.sibling,j=d.return;if(rf(d),d===u){O=null;break}if(y!==null){y.return=j,O=y;break}O=j}}}var x=l.alternate;if(x!==null){var m=x.child;if(m!==null){x.child=null;do{var w=m.sibling;m.sibling=null,m=w}while(m!==null)}}O=l}}if(l.subtreeFlags&2064&&i!==null)i.return=l,O=i;else e:for(;O!==null;){if(l=O,l.flags&2048)switch(l.tag){case 0:case 11:case 15:vr(9,l,l.return)}var f=l.sibling;if(f!==null){f.return=l.return,O=f;break e}O=l.return}}var p=e.current;for(O=p;O!==null;){i=O;var g=i.child;if(i.subtreeFlags&2064&&g!==null)g.return=i,O=g;else e:for(i=p;O!==null;){if(o=O,o.flags&2048)try{switch(o.tag){case 0:case 11:case 15:ja(9,o)}}catch(E){le(o,o.return,E)}if(o===i){O=null;break e}var b=o.sibling;if(b!==null){b.return=o.return,O=b;break e}O=o.return}}if(J=s,Qt(),ut&&typeof ut.onPostCommitFiberRoot=="function")try{ut.onPostCommitFiberRoot(pa,e)}catch{}r=!0}return r}finally{Q=n,Je.transition=t}}return!1}function Lc(e,t,n){t=Un(n,t),t=qd(e,t,1),e=It(e,t,1),t=Se(),e!==null&&(Vr(e,1,t),Ae(e,t))}function le(e,t,n){if(e.tag===3)Lc(e,e,n);else for(;t!==null;){if(t.tag===3){Lc(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Ut===null||!Ut.has(r))){e=Un(n,e),e=Jd(t,e,1),t=It(t,e,1),e=Se(),t!==null&&(Vr(t,1,e),Ae(t,e));break}}t=t.return}}function Em(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=Se(),e.pingedLanes|=e.suspendedLanes&n,fe===e&&(he&n)===n&&(ue===4||ue===3&&(he&130023424)===he&&500>ie()-ao?tn(e,0):so|=n),Ae(e,t)}function hf(e,t){t===0&&(e.mode&1?(t=os,os<<=1,!(os&130023424)&&(os=4194304)):t=1);var n=Se();e=wt(e,t),e!==null&&(Vr(e,t,n),Ae(e,n))}function _m(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),hf(e,n)}function Rm(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,s=e.memoizedState;s!==null&&(n=s.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(R(314))}r!==null&&r.delete(t),hf(e,n)}var mf;mf=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||Le.current)ze=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return ze=!1,gm(e,t,n);ze=!!(e.flags&131072)}else ze=!1,ee&&t.flags&1048576&&yd(t,Ks,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Ts(e,t),e=t.pendingProps;var s=Dn(t,je.current);Ln(t,n),s=Gi(null,t,r,e,s,n);var l=Zi();return t.flags|=1,typeof s=="object"&&s!==null&&typeof s.render=="function"&&s.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Oe(r)?(l=!0,Js(t)):l=!1,t.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,Ji(t),s.updater=wa,t.stateNode=s,s._reactInternals=t,Ql(t,r,e,n),t=Yl(null,t,r,!0,l,n)):(t.tag=0,ee&&l&&Ui(t),be(null,t,s,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Ts(e,t),e=t.pendingProps,s=r._init,r=s(r._payload),t.type=r,s=t.tag=Pm(r),e=Ge(r,e),s){case 0:t=Xl(null,t,r,e,n);break e;case 1:t=bc(null,t,r,e,n);break e;case 11:t=jc(null,t,r,e,n);break e;case 14:t=kc(null,t,r,Ge(r.type,e),n);break e}throw Error(R(306,r,""))}return t;case 0:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:Ge(r,s),Xl(e,t,r,s,n);case 1:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:Ge(r,s),bc(e,t,r,s,n);case 3:e:{if(Yd(t),e===null)throw Error(R(387));r=t.pendingProps,l=t.memoizedState,s=l.element,Sd(e,t),Gs(t,r,null,n);var i=t.memoizedState;if(r=i.element,l.isDehydrated)if(l={element:r,isDehydrated:!1,cache:i.cache,pendingSuspenseBoundaries:i.pendingSuspenseBoundaries,transitions:i.transitions},t.updateQueue.baseState=l,t.memoizedState=l,t.flags&256){s=Un(Error(R(423)),t),t=Sc(e,t,r,n,s);break e}else if(r!==s){s=Un(Error(R(424)),t),t=Sc(e,t,r,n,s);break e}else for(Fe=Ft(t.stateNode.containerInfo.firstChild),Ie=t,ee=!0,et=null,n=kd(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Mn(),r===s){t=jt(e,t,n);break e}be(e,t,r,n)}t=t.child}return t;case 5:return Nd(t),e===null&&Vl(t),r=t.type,s=t.pendingProps,l=e!==null?e.memoizedProps:null,i=s.children,Ul(r,s)?i=null:l!==null&&Ul(r,l)&&(t.flags|=32),Xd(e,t),be(e,t,i,n),t.child;case 6:return e===null&&Vl(t),null;case 13:return Gd(e,t,n);case 4:return Qi(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Fn(t,null,r,n):be(e,t,r,n),t.child;case 11:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:Ge(r,s),jc(e,t,r,s,n);case 7:return be(e,t,t.pendingProps,n),t.child;case 8:return be(e,t,t.pendingProps.children,n),t.child;case 12:return be(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,s=t.pendingProps,l=t.memoizedProps,i=s.value,X(Xs,r._currentValue),r._currentValue=i,l!==null)if(rt(l.value,i)){if(l.children===s.children&&!Le.current){t=jt(e,t,n);break e}}else for(l=t.child,l!==null&&(l.return=t);l!==null;){var o=l.dependencies;if(o!==null){i=l.child;for(var c=o.firstContext;c!==null;){if(c.context===r){if(l.tag===1){c=xt(-1,n&-n),c.tag=2;var u=l.updateQueue;if(u!==null){u=u.shared;var d=u.pending;d===null?c.next=c:(c.next=d.next,d.next=c),u.pending=c}}l.lanes|=n,c=l.alternate,c!==null&&(c.lanes|=n),ql(l.return,n,t),o.lanes|=n;break}c=c.next}}else if(l.tag===10)i=l.type===t.type?null:l.child;else if(l.tag===18){if(i=l.return,i===null)throw Error(R(341));i.lanes|=n,o=i.alternate,o!==null&&(o.lanes|=n),ql(i,n,t),i=l.sibling}else i=l.child;if(i!==null)i.return=l;else for(i=l;i!==null;){if(i===t){i=null;break}if(l=i.sibling,l!==null){l.return=i.return,i=l;break}i=i.return}l=i}be(e,t,s.children,n),t=t.child}return t;case 9:return s=t.type,r=t.pendingProps.children,Ln(t,n),s=Qe(s),r=r(s),t.flags|=1,be(e,t,r,n),t.child;case 14:return r=t.type,s=Ge(r,t.pendingProps),s=Ge(r.type,s),kc(e,t,r,s,n);case 15:return Qd(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:Ge(r,s),Ts(e,t),t.tag=1,Oe(r)?(e=!0,Js(t)):e=!1,Ln(t,n),Vd(t,r,s),Ql(t,r,s,n),Yl(null,t,r,!0,e,n);case 19:return Zd(e,t,n);case 22:return Kd(e,t,n)}throw Error(R(156,t.tag))};function gf(e,t){return $u(e,t)}function Tm(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function qe(e,t,n,r){return new Tm(e,t,n,r)}function co(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Pm(e){if(typeof e=="function")return co(e)?1:0;if(e!=null){if(e=e.$$typeof,e===_i)return 11;if(e===Ri)return 14}return 2}function $t(e,t){var n=e.alternate;return n===null?(n=qe(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Ls(e,t,n,r,s,l){var i=2;if(r=e,typeof e=="function")co(e)&&(i=1);else if(typeof e=="string")i=5;else e:switch(e){case yn:return nn(n.children,s,l,t);case Ei:i=8,s|=8;break;case yl:return e=qe(12,n,t,s|2),e.elementType=yl,e.lanes=l,e;case vl:return e=qe(13,n,t,s),e.elementType=vl,e.lanes=l,e;case wl:return e=qe(19,n,t,s),e.elementType=wl,e.lanes=l,e;case Nu:return ba(n,s,l,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case bu:i=10;break e;case Su:i=9;break e;case _i:i=11;break e;case Ri:i=14;break e;case _t:i=16,r=null;break e}throw Error(R(130,e==null?e:typeof e,""))}return t=qe(i,n,t,s),t.elementType=e,t.type=r,t.lanes=l,t}function nn(e,t,n,r){return e=qe(7,e,r,t),e.lanes=n,e}function ba(e,t,n,r){return e=qe(22,e,r,t),e.elementType=Nu,e.lanes=n,e.stateNode={isHidden:!1},e}function ol(e,t,n){return e=qe(6,e,null,t),e.lanes=n,e}function cl(e,t,n){return t=qe(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function zm(e,t,n,r,s){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Ha(0),this.expirationTimes=Ha(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ha(0),this.identifierPrefix=r,this.onRecoverableError=s,this.mutableSourceEagerHydrationData=null}function uo(e,t,n,r,s,l,i,o,c){return e=new zm(e,t,n,o,c),t===1?(t=1,l===!0&&(t|=8)):t=0,l=qe(3,null,null,t),e.current=l,l.stateNode=e,l.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Ji(l),e}function Lm(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:xn,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function xf(e){if(!e)return Vt;e=e._reactInternals;e:{if(pn(e)!==e||e.tag!==1)throw Error(R(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Oe(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(R(171))}if(e.tag===1){var n=e.type;if(Oe(n))return gd(e,n,t)}return t}function yf(e,t,n,r,s,l,i,o,c){return e=uo(n,r,!0,e,s,l,i,o,c),e.context=xf(null),n=e.current,r=Se(),s=Bt(n),l=xt(r,s),l.callback=t??null,It(n,l,s),e.current.lanes=s,Vr(e,s,r),Ae(e,r),e}function Sa(e,t,n,r){var s=t.current,l=Se(),i=Bt(s);return n=xf(n),t.context===null?t.context=n:t.pendingContext=n,t=xt(l,i),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=It(s,t,i),e!==null&&(nt(e,s,i,l),Es(e,s,i)),i}function la(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Oc(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function fo(e,t){Oc(e,t),(e=e.alternate)&&Oc(e,t)}function Om(){return null}var vf=typeof reportError=="function"?reportError:function(e){console.error(e)};function po(e){this._internalRoot=e}Na.prototype.render=po.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(R(409));Sa(e,t,null,null)};Na.prototype.unmount=po.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;cn(function(){Sa(null,e,null,null)}),t[vt]=null}};function Na(e){this._internalRoot=e}Na.prototype.unstable_scheduleHydration=function(e){if(e){var t=Ku();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Tt.length&&t!==0&&t<Tt[n].priority;n++);Tt.splice(n,0,e),n===0&&Yu(e)}};function ho(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Ca(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Ac(){}function Am(e,t,n,r,s){if(s){if(typeof r=="function"){var l=r;r=function(){var u=la(i);l.call(u)}}var i=yf(t,r,e,0,null,!1,!1,"",Ac);return e._reactRootContainer=i,e[vt]=i.current,Tr(e.nodeType===8?e.parentNode:e),cn(),i}for(;s=e.lastChild;)e.removeChild(s);if(typeof r=="function"){var o=r;r=function(){var u=la(c);o.call(u)}}var c=uo(e,0,!1,null,null,!1,!1,"",Ac);return e._reactRootContainer=c,e[vt]=c.current,Tr(e.nodeType===8?e.parentNode:e),cn(function(){Sa(t,c,n,r)}),c}function Ea(e,t,n,r,s){var l=n._reactRootContainer;if(l){var i=l;if(typeof s=="function"){var o=s;s=function(){var c=la(i);o.call(c)}}Sa(t,i,e,s)}else i=Am(n,t,e,s,r);return la(i)}Ju=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=ur(t.pendingLanes);n!==0&&(zi(t,n|1),Ae(t,ie()),!(J&6)&&(Bn=ie()+500,Qt()))}break;case 13:cn(function(){var r=wt(e,1);if(r!==null){var s=Se();nt(r,e,1,s)}}),fo(e,1)}};Li=function(e){if(e.tag===13){var t=wt(e,134217728);if(t!==null){var n=Se();nt(t,e,134217728,n)}fo(e,134217728)}};Qu=function(e){if(e.tag===13){var t=Bt(e),n=wt(e,t);if(n!==null){var r=Se();nt(n,e,t,r)}fo(e,t)}};Ku=function(){return Q};Xu=function(e,t){var n=Q;try{return Q=e,t()}finally{Q=n}};Tl=function(e,t,n){switch(t){case"input":if(bl(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var s=xa(r);if(!s)throw Error(R(90));Eu(r),bl(r,s)}}}break;case"textarea":Ru(e,n);break;case"select":t=n.value,t!=null&&Rn(e,!!n.multiple,t,!1)}};Du=lo;Mu=cn;var Dm={usingClientEntryPoint:!1,Events:[Jr,kn,xa,Ou,Au,lo]},lr={findFiberByHostInstance:Yt,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Mm={bundleType:lr.bundleType,version:lr.version,rendererPackageName:lr.rendererPackageName,rendererConfig:lr.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:kt.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Uu(e),e===null?null:e.stateNode},findFiberByHostInstance:lr.findFiberByHostInstance||Om,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var vs=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!vs.isDisabled&&vs.supportsFiber)try{pa=vs.inject(Mm),ut=vs}catch{}}Be.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Dm;Be.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!ho(t))throw Error(R(200));return Lm(e,t,null,n)};Be.createRoot=function(e,t){if(!ho(e))throw Error(R(299));var n=!1,r="",s=vf;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(s=t.onRecoverableError)),t=uo(e,1,!1,null,null,n,!1,r,s),e[vt]=t.current,Tr(e.nodeType===8?e.parentNode:e),new po(t)};Be.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(R(188)):(e=Object.keys(e).join(","),Error(R(268,e)));return e=Uu(t),e=e===null?null:e.stateNode,e};Be.flushSync=function(e){return cn(e)};Be.hydrate=function(e,t,n){if(!Ca(t))throw Error(R(200));return Ea(null,e,t,!0,n)};Be.hydrateRoot=function(e,t,n){if(!ho(e))throw Error(R(405));var r=n!=null&&n.hydratedSources||null,s=!1,l="",i=vf;if(n!=null&&(n.unstable_strictMode===!0&&(s=!0),n.identifierPrefix!==void 0&&(l=n.identifierPrefix),n.onRecoverableError!==void 0&&(i=n.onRecoverableError)),t=yf(t,null,e,1,n??null,s,!1,l,i),e[vt]=t.current,Tr(e),r)for(e=0;e<r.length;e++)n=r[e],s=n._getVersion,s=s(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,s]:t.mutableSourceEagerHydrationData.push(n,s);return new Na(t)};Be.render=function(e,t,n){if(!Ca(t))throw Error(R(200));return Ea(null,e,t,!1,n)};Be.unmountComponentAtNode=function(e){if(!Ca(e))throw Error(R(40));return e._reactRootContainer?(cn(function(){Ea(null,null,e,!1,function(){e._reactRootContainer=null,e[vt]=null})}),!0):!1};Be.unstable_batchedUpdates=lo;Be.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!Ca(n))throw Error(R(200));if(e==null||e._reactInternals===void 0)throw Error(R(38));return Ea(e,t,n,!1,r)};Be.version="18.3.1-next-f1338f8080-20240426";function wf(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(wf)}catch(e){console.error(e)}}wf(),vu.exports=Be;var Fm=vu.exports,Dc=Fm;gl.createRoot=Dc.createRoot,gl.hydrateRoot=Dc.hydrateRoot;/**
 * @remix-run/router v1.23.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Ir(){return Ir=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Ir.apply(null,arguments)}var Ot;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(Ot||(Ot={}));const Mc="popstate";function Im(e){e===void 0&&(e={});function t(r,s){let{pathname:l,search:i,hash:o}=r.location;return ci("",{pathname:l,search:i,hash:o},s.state&&s.state.usr||null,s.state&&s.state.key||"default")}function n(r,s){return typeof s=="string"?s:ia(s)}return Bm(t,n,null,e)}function re(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function mo(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function Um(){return Math.random().toString(36).substr(2,8)}function Fc(e,t){return{usr:e.state,key:e.key,idx:t}}function ci(e,t,n,r){return n===void 0&&(n=null),Ir({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?Jn(t):t,{state:n,key:t&&t.key||r||Um()})}function ia(e){let{pathname:t="/",search:n="",hash:r=""}=e;return n&&n!=="?"&&(t+=n.charAt(0)==="?"?n:"?"+n),r&&r!=="#"&&(t+=r.charAt(0)==="#"?r:"#"+r),t}function Jn(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substr(r),e=e.substr(0,r)),e&&(t.pathname=e)}return t}function Bm(e,t,n,r){r===void 0&&(r={});let{window:s=document.defaultView,v5Compat:l=!1}=r,i=s.history,o=Ot.Pop,c=null,u=d();u==null&&(u=0,i.replaceState(Ir({},i.state,{idx:u}),""));function d(){return(i.state||{idx:null}).idx}function h(){o=Ot.Pop;let w=d(),f=w==null?null:w-u;u=w,c&&c({action:o,location:m.location,delta:f})}function y(w,f){o=Ot.Push;let p=ci(m.location,w,f);u=d()+1;let g=Fc(p,u),b=m.createHref(p);try{i.pushState(g,"",b)}catch(E){if(E instanceof DOMException&&E.name==="DataCloneError")throw E;s.location.assign(b)}l&&c&&c({action:o,location:m.location,delta:1})}function j(w,f){o=Ot.Replace;let p=ci(m.location,w,f);u=d();let g=Fc(p,u),b=m.createHref(p);i.replaceState(g,"",b),l&&c&&c({action:o,location:m.location,delta:0})}function x(w){let f=s.location.origin!=="null"?s.location.origin:s.location.href,p=typeof w=="string"?w:ia(w);return p=p.replace(/ $/,"%20"),re(f,"No window.location.(origin|href) available to create URL for href: "+p),new URL(p,f)}let m={get action(){return o},get location(){return e(s,i)},listen(w){if(c)throw new Error("A history only accepts one active listener");return s.addEventListener(Mc,h),c=w,()=>{s.removeEventListener(Mc,h),c=null}},createHref(w){return t(s,w)},createURL:x,encodeLocation(w){let f=x(w);return{pathname:f.pathname,search:f.search,hash:f.hash}},push:y,replace:j,go(w){return i.go(w)}};return m}var Ic;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(Ic||(Ic={}));function $m(e,t,n){return n===void 0&&(n="/"),Hm(e,t,n)}function Hm(e,t,n,r){let s=typeof t=="string"?Jn(t):t,l=$n(s.pathname||"/",n);if(l==null)return null;let i=jf(e);Wm(i);let o=null,c=tg(l);for(let u=0;o==null&&u<i.length;++u)o=Zm(i[u],c);return o}function jf(e,t,n,r){t===void 0&&(t=[]),n===void 0&&(n=[]),r===void 0&&(r="");let s=(l,i,o)=>{let c={relativePath:o===void 0?l.path||"":o,caseSensitive:l.caseSensitive===!0,childrenIndex:i,route:l};c.relativePath.startsWith("/")&&(re(c.relativePath.startsWith(r),'Absolute route path "'+c.relativePath+'" nested under path '+('"'+r+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),c.relativePath=c.relativePath.slice(r.length));let u=Ht([r,c.relativePath]),d=n.concat(c);l.children&&l.children.length>0&&(re(l.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+u+'".')),jf(l.children,t,d,u)),!(l.path==null&&!l.index)&&t.push({path:u,score:Ym(u,l.index),routesMeta:d})};return e.forEach((l,i)=>{var o;if(l.path===""||!((o=l.path)!=null&&o.includes("?")))s(l,i);else for(let c of kf(l.path))s(l,i,c)}),t}function kf(e){let t=e.split("/");if(t.length===0)return[];let[n,...r]=t,s=n.endsWith("?"),l=n.replace(/\?$/,"");if(r.length===0)return s?[l,""]:[l];let i=kf(r.join("/")),o=[];return o.push(...i.map(c=>c===""?l:[l,c].join("/"))),s&&o.push(...i),o.map(c=>e.startsWith("/")&&c===""?"/":c)}function Wm(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:Gm(t.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}const Vm=/^:[\w-]+$/,qm=3,Jm=2,Qm=1,Km=10,Xm=-2,Uc=e=>e==="*";function Ym(e,t){let n=e.split("/"),r=n.length;return n.some(Uc)&&(r+=Xm),t&&(r+=Jm),n.filter(s=>!Uc(s)).reduce((s,l)=>s+(Vm.test(l)?qm:l===""?Qm:Km),r)}function Gm(e,t){return e.length===t.length&&e.slice(0,-1).every((r,s)=>r===t[s])?e[e.length-1]-t[t.length-1]:0}function Zm(e,t,n){let{routesMeta:r}=e,s={},l="/",i=[];for(let o=0;o<r.length;++o){let c=r[o],u=o===r.length-1,d=l==="/"?t:t.slice(l.length)||"/",h=ui({path:c.relativePath,caseSensitive:c.caseSensitive,end:u},d),y=c.route;if(!h)return null;Object.assign(s,h.params),i.push({params:s,pathname:Ht([l,h.pathname]),pathnameBase:lg(Ht([l,h.pathnameBase])),route:y}),h.pathnameBase!=="/"&&(l=Ht([l,h.pathnameBase]))}return i}function ui(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=eg(e.path,e.caseSensitive,e.end),s=t.match(n);if(!s)return null;let l=s[0],i=l.replace(/(.)\/+$/,"$1"),o=s.slice(1);return{params:r.reduce((u,d,h)=>{let{paramName:y,isOptional:j}=d;if(y==="*"){let m=o[h]||"";i=l.slice(0,l.length-m.length).replace(/(.)\/+$/,"$1")}const x=o[h];return j&&!x?u[y]=void 0:u[y]=(x||"").replace(/%2F/g,"/"),u},{}),pathname:l,pathnameBase:i,pattern:e}}function eg(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!0),mo(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let r=[],s="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(i,o,c)=>(r.push({paramName:o,isOptional:c!=null}),c?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(r.push({paramName:"*"}),s+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?s+="\\/*$":e!==""&&e!=="/"&&(s+="(?:(?=\\/|$))"),[new RegExp(s,t?void 0:"i"),r]}function tg(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return mo(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function $n(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&r!=="/"?null:e.slice(n)||"/"}const ng=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,rg=e=>ng.test(e);function sg(e,t){t===void 0&&(t="/");let{pathname:n,search:r="",hash:s=""}=typeof e=="string"?Jn(e):e,l;if(n)if(rg(n))l=n;else{if(n.includes("//")){let i=n;n=bf(n),mo(!1,"Pathnames cannot have embedded double slashes - normalizing "+(i+" -> "+n))}n.startsWith("/")?l=Bc(n.substring(1),"/"):l=Bc(n,t)}else l=t;return{pathname:l,search:ig(r),hash:og(s)}}function Bc(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(s=>{s===".."?n.length>1&&n.pop():s!=="."&&n.push(s)}),n.length>1?n.join("/"):"/"}function ul(e,t,n,r){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(r)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function ag(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function go(e,t){let n=ag(e);return t?n.map((r,s)=>s===n.length-1?r.pathname:r.pathnameBase):n.map(r=>r.pathnameBase)}function xo(e,t,n,r){r===void 0&&(r=!1);let s;typeof e=="string"?s=Jn(e):(s=Ir({},e),re(!s.pathname||!s.pathname.includes("?"),ul("?","pathname","search",s)),re(!s.pathname||!s.pathname.includes("#"),ul("#","pathname","hash",s)),re(!s.search||!s.search.includes("#"),ul("#","search","hash",s)));let l=e===""||s.pathname==="",i=l?"/":s.pathname,o;if(i==null)o=n;else{let h=t.length-1;if(!r&&i.startsWith("..")){let y=i.split("/");for(;y[0]==="..";)y.shift(),h-=1;s.pathname=y.join("/")}o=h>=0?t[h]:"/"}let c=sg(s,o),u=i&&i!=="/"&&i.endsWith("/"),d=(l||i===".")&&n.endsWith("/");return!c.pathname.endsWith("/")&&(u||d)&&(c.pathname+="/"),c}const bf=e=>e.replace(/\/\/+/g,"/"),Ht=e=>bf(e.join("/")),lg=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),ig=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,og=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function cg(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}const Sf=["post","put","patch","delete"];new Set(Sf);const ug=["get",...Sf];new Set(ug);/**
 * React Router v6.30.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Ur(){return Ur=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Ur.apply(null,arguments)}const _a=v.createContext(null),Nf=v.createContext(null),bt=v.createContext(null),Ra=v.createContext(null),St=v.createContext({outlet:null,matches:[],isDataRoute:!1}),Cf=v.createContext(null);function dg(e,t){let{relative:n}=t===void 0?{}:t;Qn()||re(!1);let{basename:r,navigator:s}=v.useContext(bt),{hash:l,pathname:i,search:o}=Pa(e,{relative:n}),c=i;return r!=="/"&&(c=i==="/"?r:Ht([r,i])),s.createHref({pathname:c,search:o,hash:l})}function Qn(){return v.useContext(Ra)!=null}function Kn(){return Qn()||re(!1),v.useContext(Ra).location}function Ef(e){v.useContext(bt).static||v.useLayoutEffect(e)}function Ta(){let{isDataRoute:e}=v.useContext(St);return e?Cg():fg()}function fg(){Qn()||re(!1);let e=v.useContext(_a),{basename:t,future:n,navigator:r}=v.useContext(bt),{matches:s}=v.useContext(St),{pathname:l}=Kn(),i=JSON.stringify(go(s,n.v7_relativeSplatPath)),o=v.useRef(!1);return Ef(()=>{o.current=!0}),v.useCallback(function(u,d){if(d===void 0&&(d={}),!o.current)return;if(typeof u=="number"){r.go(u);return}let h=xo(u,JSON.parse(i),l,d.relative==="path");e==null&&t!=="/"&&(h.pathname=h.pathname==="/"?t:Ht([t,h.pathname])),(d.replace?r.replace:r.push)(h,d.state,d)},[t,r,i,l,e])}const pg=v.createContext(null);function hg(e){let t=v.useContext(St).outlet;return t&&v.createElement(pg.Provider,{value:e},t)}function Pa(e,t){let{relative:n}=t===void 0?{}:t,{future:r}=v.useContext(bt),{matches:s}=v.useContext(St),{pathname:l}=Kn(),i=JSON.stringify(go(s,r.v7_relativeSplatPath));return v.useMemo(()=>xo(e,JSON.parse(i),l,n==="path"),[e,i,l,n])}function mg(e,t){return gg(e,t)}function gg(e,t,n,r){Qn()||re(!1);let{navigator:s}=v.useContext(bt),{matches:l}=v.useContext(St),i=l[l.length-1],o=i?i.params:{};i&&i.pathname;let c=i?i.pathnameBase:"/";i&&i.route;let u=Kn(),d;if(t){var h;let w=typeof t=="string"?Jn(t):t;c==="/"||(h=w.pathname)!=null&&h.startsWith(c)||re(!1),d=w}else d=u;let y=d.pathname||"/",j=y;if(c!=="/"){let w=c.replace(/^\//,"").split("/");j="/"+y.replace(/^\//,"").split("/").slice(w.length).join("/")}let x=$m(e,{pathname:j}),m=jg(x&&x.map(w=>Object.assign({},w,{params:Object.assign({},o,w.params),pathname:Ht([c,s.encodeLocation?s.encodeLocation(w.pathname).pathname:w.pathname]),pathnameBase:w.pathnameBase==="/"?c:Ht([c,s.encodeLocation?s.encodeLocation(w.pathnameBase).pathname:w.pathnameBase])})),l,n,r);return t&&m?v.createElement(Ra.Provider,{value:{location:Ur({pathname:"/",search:"",hash:"",state:null,key:"default"},d),navigationType:Ot.Pop}},m):m}function xg(){let e=Ng(),t=cg(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,s={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return v.createElement(v.Fragment,null,v.createElement("h2",null,"Unexpected Application Error!"),v.createElement("h3",{style:{fontStyle:"italic"}},t),n?v.createElement("pre",{style:s},n):null,null)}const yg=v.createElement(xg,null);class vg extends v.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,n){return n.location!==t.location||n.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:n.error,location:n.location,revalidation:t.revalidation||n.revalidation}}componentDidCatch(t,n){console.error("React Router caught the following error during render",t,n)}render(){return this.state.error!==void 0?v.createElement(St.Provider,{value:this.props.routeContext},v.createElement(Cf.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function wg(e){let{routeContext:t,match:n,children:r}=e,s=v.useContext(_a);return s&&s.static&&s.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(s.staticContext._deepestRenderedBoundaryId=n.route.id),v.createElement(St.Provider,{value:t},r)}function jg(e,t,n,r){var s;if(t===void 0&&(t=[]),n===void 0&&(n=null),r===void 0&&(r=null),e==null){var l;if(!n)return null;if(n.errors)e=n.matches;else if((l=r)!=null&&l.v7_partialHydration&&t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let i=e,o=(s=n)==null?void 0:s.errors;if(o!=null){let d=i.findIndex(h=>h.route.id&&(o==null?void 0:o[h.route.id])!==void 0);d>=0||re(!1),i=i.slice(0,Math.min(i.length,d+1))}let c=!1,u=-1;if(n&&r&&r.v7_partialHydration)for(let d=0;d<i.length;d++){let h=i[d];if((h.route.HydrateFallback||h.route.hydrateFallbackElement)&&(u=d),h.route.id){let{loaderData:y,errors:j}=n,x=h.route.loader&&y[h.route.id]===void 0&&(!j||j[h.route.id]===void 0);if(h.route.lazy||x){c=!0,u>=0?i=i.slice(0,u+1):i=[i[0]];break}}}return i.reduceRight((d,h,y)=>{let j,x=!1,m=null,w=null;n&&(j=o&&h.route.id?o[h.route.id]:void 0,m=h.route.errorElement||yg,c&&(u<0&&y===0?(Eg("route-fallback"),x=!0,w=null):u===y&&(x=!0,w=h.route.hydrateFallbackElement||null)));let f=t.concat(i.slice(0,y+1)),p=()=>{let g;return j?g=m:x?g=w:h.route.Component?g=v.createElement(h.route.Component,null):h.route.element?g=h.route.element:g=d,v.createElement(wg,{match:h,routeContext:{outlet:d,matches:f,isDataRoute:n!=null},children:g})};return n&&(h.route.ErrorBoundary||h.route.errorElement||y===0)?v.createElement(vg,{location:n.location,revalidation:n.revalidation,component:m,error:j,children:p(),routeContext:{outlet:null,matches:f,isDataRoute:!0}}):p()},null)}var _f=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(_f||{}),Rf=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(Rf||{});function kg(e){let t=v.useContext(_a);return t||re(!1),t}function bg(e){let t=v.useContext(Nf);return t||re(!1),t}function Sg(e){let t=v.useContext(St);return t||re(!1),t}function Tf(e){let t=Sg(),n=t.matches[t.matches.length-1];return n.route.id||re(!1),n.route.id}function Ng(){var e;let t=v.useContext(Cf),n=bg(),r=Tf();return t!==void 0?t:(e=n.errors)==null?void 0:e[r]}function Cg(){let{router:e}=kg(_f.UseNavigateStable),t=Tf(Rf.UseNavigateStable),n=v.useRef(!1);return Ef(()=>{n.current=!0}),v.useCallback(function(s,l){l===void 0&&(l={}),n.current&&(typeof s=="number"?e.navigate(s):e.navigate(s,Ur({fromRouteId:t},l)))},[e,t])}const $c={};function Eg(e,t,n){$c[e]||($c[e]=!0)}function _g(e,t){e==null||e.v7_startTransition,e==null||e.v7_relativeSplatPath}function Pf(e){let{to:t,replace:n,state:r,relative:s}=e;Qn()||re(!1);let{future:l,static:i}=v.useContext(bt),{matches:o}=v.useContext(St),{pathname:c}=Kn(),u=Ta(),d=xo(t,go(o,l.v7_relativeSplatPath),c,s==="path"),h=JSON.stringify(d);return v.useEffect(()=>u(JSON.parse(h),{replace:n,state:r,relative:s}),[u,h,s,n,r]),null}function Rg(e){return hg(e.context)}function Te(e){re(!1)}function Tg(e){let{basename:t="/",children:n=null,location:r,navigationType:s=Ot.Pop,navigator:l,static:i=!1,future:o}=e;Qn()&&re(!1);let c=t.replace(/^\/*/,"/"),u=v.useMemo(()=>({basename:c,navigator:l,static:i,future:Ur({v7_relativeSplatPath:!1},o)}),[c,o,l,i]);typeof r=="string"&&(r=Jn(r));let{pathname:d="/",search:h="",hash:y="",state:j=null,key:x="default"}=r,m=v.useMemo(()=>{let w=$n(d,c);return w==null?null:{location:{pathname:w,search:h,hash:y,state:j,key:x},navigationType:s}},[c,d,h,y,j,x,s]);return m==null?null:v.createElement(bt.Provider,{value:u},v.createElement(Ra.Provider,{children:n,value:m}))}function Pg(e){let{children:t,location:n}=e;return mg(di(t),n)}new Promise(()=>{});function di(e,t){t===void 0&&(t=[]);let n=[];return v.Children.forEach(e,(r,s)=>{if(!v.isValidElement(r))return;let l=[...t,s];if(r.type===v.Fragment){n.push.apply(n,di(r.props.children,l));return}r.type!==Te&&re(!1),!r.props.index||!r.props.children||re(!1);let i={id:r.props.id||l.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(i.children=di(r.props.children,l)),n.push(i)}),n}/**
 * React Router DOM v6.30.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function oa(){return oa=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},oa.apply(null,arguments)}function zf(e,t){if(e==null)return{};var n={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(t.indexOf(r)!==-1)continue;n[r]=e[r]}return n}function zg(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function Lg(e,t){return e.button===0&&(!t||t==="_self")&&!zg(e)}const Og=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],Ag=["aria-current","caseSensitive","className","end","style","to","viewTransition","children"],Dg="6";try{window.__reactRouterVersion=Dg}catch{}const Mg=v.createContext({isTransitioning:!1}),Fg="startTransition",Hc=Ep[Fg];function Ig(e){let{basename:t,children:n,future:r,window:s}=e,l=v.useRef();l.current==null&&(l.current=Im({window:s,v5Compat:!0}));let i=l.current,[o,c]=v.useState({action:i.action,location:i.location}),{v7_startTransition:u}=r||{},d=v.useCallback(h=>{u&&Hc?Hc(()=>c(h)):c(h)},[c,u]);return v.useLayoutEffect(()=>i.listen(d),[i,d]),v.useEffect(()=>_g(r),[r]),v.createElement(Tg,{basename:t,children:n,location:o.location,navigationType:o.action,navigator:i,future:r})}const Ug=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",Bg=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,fr=v.forwardRef(function(t,n){let{onClick:r,relative:s,reloadDocument:l,replace:i,state:o,target:c,to:u,preventScrollReset:d,viewTransition:h}=t,y=zf(t,Og),{basename:j}=v.useContext(bt),x,m=!1;if(typeof u=="string"&&Bg.test(u)&&(x=u,Ug))try{let g=new URL(window.location.href),b=u.startsWith("//")?new URL(g.protocol+u):new URL(u),E=$n(b.pathname,j);b.origin===g.origin&&E!=null?u=E+b.search+b.hash:m=!0}catch{}let w=dg(u,{relative:s}),f=Hg(u,{replace:i,state:o,target:c,preventScrollReset:d,relative:s,viewTransition:h});function p(g){r&&r(g),g.defaultPrevented||f(g)}return v.createElement("a",oa({},y,{href:x||w,onClick:m||l?r:p,ref:n,target:c}))}),it=v.forwardRef(function(t,n){let{"aria-current":r="page",caseSensitive:s=!1,className:l="",end:i=!1,style:o,to:c,viewTransition:u,children:d}=t,h=zf(t,Ag),y=Pa(c,{relative:h.relative}),j=Kn(),x=v.useContext(Nf),{navigator:m,basename:w}=v.useContext(bt),f=x!=null&&Wg(y)&&u===!0,p=m.encodeLocation?m.encodeLocation(y).pathname:y.pathname,g=j.pathname,b=x&&x.navigation&&x.navigation.location?x.navigation.location.pathname:null;s||(g=g.toLowerCase(),b=b?b.toLowerCase():null,p=p.toLowerCase()),b&&w&&(b=$n(b,w)||b);const E=p!=="/"&&p.endsWith("/")?p.length-1:p.length;let P=g===p||!i&&g.startsWith(p)&&g.charAt(E)==="/",_=b!=null&&(b===p||!i&&b.startsWith(p)&&b.charAt(p.length)==="/"),C={isActive:P,isPending:_,isTransitioning:f},I=P?r:void 0,L;typeof l=="function"?L=l(C):L=[l,P?"active":null,_?"pending":null,f?"transitioning":null].filter(Boolean).join(" ");let N=typeof o=="function"?o(C):o;return v.createElement(fr,oa({},h,{"aria-current":I,className:L,ref:n,style:N,to:c,viewTransition:u}),typeof d=="function"?d(C):d)});var fi;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(fi||(fi={}));var Wc;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(Wc||(Wc={}));function $g(e){let t=v.useContext(_a);return t||re(!1),t}function Hg(e,t){let{target:n,replace:r,state:s,preventScrollReset:l,relative:i,viewTransition:o}=t===void 0?{}:t,c=Ta(),u=Kn(),d=Pa(e,{relative:i});return v.useCallback(h=>{if(Lg(h,n)){h.preventDefault();let y=r!==void 0?r:ia(u)===ia(d);c(e,{replace:y,state:s,preventScrollReset:l,relative:i,viewTransition:o})}},[u,c,d,r,s,n,e,l,i,o])}function Wg(e,t){t===void 0&&(t={});let n=v.useContext(Mg);n==null&&re(!1);let{basename:r}=$g(fi.useViewTransitionState),s=Pa(e,{relative:t.relative});if(!n.isTransitioning)return!1;let l=$n(n.currentLocation.pathname,r)||n.currentLocation.pathname,i=$n(n.nextLocation.pathname,r)||n.nextLocation.pathname;return ui(s.pathname,i)!=null||ui(s.pathname,l)!=null}const Lf=v.createContext(),Vg=({children:e})=>{const[t,n]=v.useState(()=>{const s=localStorage.getItem("admin_theme");return s||"dark"});v.useEffect(()=>{const s=document.documentElement;t==="light"?(s.classList.remove("theme-dark"),s.classList.add("theme-light")):(s.classList.remove("theme-light"),s.classList.add("theme-dark")),localStorage.setItem("admin_theme",t)},[t]);const r=()=>{n(s=>s==="light"?"dark":"light")};return a.jsx(Lf.Provider,{value:{theme:t,toggleTheme:r,isDark:t==="dark"},children:e})},qg=()=>{const e=v.useContext(Lf);if(!e)throw new Error("useTheme must be used within a ThemeProvider");return e};/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jg=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Of=(...e)=>e.filter((t,n,r)=>!!t&&r.indexOf(t)===n).join(" ");/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Qg={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kg=v.forwardRef(({color:e="currentColor",size:t=24,strokeWidth:n=2,absoluteStrokeWidth:r,className:s="",children:l,iconNode:i,...o},c)=>v.createElement("svg",{ref:c,...Qg,width:t,height:t,stroke:e,strokeWidth:r?Number(n)*24/Number(t):n,className:Of("lucide",s),...o},[...i.map(([u,d])=>v.createElement(u,d)),...Array.isArray(l)?l:[l]]));/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W=(e,t)=>{const n=v.forwardRef(({className:r,...s},l)=>v.createElement(Kg,{ref:l,iconNode:t,className:Of(`lucide-${Jg(e)}`,r),...s}));return n.displayName=`${e}`,n};/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ws=W("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pi=W("Award",[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xg=W("Ban",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m4.9 4.9 14.2 14.2",key:"1m5liu"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yg=W("Bell",[["path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9",key:"1qo2s2"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0",key:"qgo35s"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yo=W("Briefcase",[["path",{d:"M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",key:"jecpp"}],["rect",{width:"20",height:"14",x:"2",y:"6",rx:"2",key:"i6l2r4"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dl=W("Building2",[["path",{d:"M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z",key:"1b4qmf"}],["path",{d:"M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2",key:"i71pzd"}],["path",{d:"M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2",key:"10jefs"}],["path",{d:"M10 6h4",key:"1itunk"}],["path",{d:"M10 10h4",key:"tcdvrf"}],["path",{d:"M10 14h4",key:"kelpxr"}],["path",{d:"M10 18h4",key:"1ulq68"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Br=W("Building",[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2",ry:"2",key:"76otgf"}],["path",{d:"M9 22v-4h6v4",key:"r93iot"}],["path",{d:"M8 6h.01",key:"1dz90k"}],["path",{d:"M16 6h.01",key:"1x0f13"}],["path",{d:"M12 6h.01",key:"1vi96p"}],["path",{d:"M12 10h.01",key:"1nrarc"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M16 10h.01",key:"1m94wz"}],["path",{d:"M16 14h.01",key:"1gbofw"}],["path",{d:"M8 10h.01",key:"19clt8"}],["path",{d:"M8 14h.01",key:"6423bh"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gg=W("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Af=W("CircleAlert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ca=W("CircleCheckBig",[["path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14",key:"g774vq"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zg=W("CircleHelp",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ex=W("CircleX",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vc=W("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Df=W("ExternalLink",[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tx=W("EyeOff",[["path",{d:"M9.88 9.88a3 3 0 1 0 4.24 4.24",key:"1jxqfv"}],["path",{d:"M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68",key:"9wicm4"}],["path",{d:"M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61",key:"1jreej"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nx=W("Eye",[["path",{d:"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z",key:"rwhkz3"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ua=W("FileText",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rx=W("Globe",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sx=W("Info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hi=W("Layers",[["path",{d:"m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z",key:"8b97xw"}],["path",{d:"m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65",key:"dd6zsq"}],["path",{d:"m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65",key:"ep9fru"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ax=W("LayoutDashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lx=W("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $r=W("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hr=W("MapPin",[["path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z",key:"2oe9fu"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ix=W("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ox=W("Moon",[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xn=W("Pen",[["path",{d:"M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z",key:"5qss01"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cx=W("Phone",[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kr=W("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nt=W("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ft=W("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mf=W("ShieldAlert",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"M12 8v4",key:"1got3b"}],["path",{d:"M12 16h.01",key:"1drbdi"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vo=W("Shield",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ux=W("Sun",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dx=W("Tag",[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",key:"vktsd0"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor",key:"kqv944"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const un=W("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fx=W("TriangleAlert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const px=W("Upload",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hx=W("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ff=W("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ct=W("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),If=v.createContext(),mx=({children:e})=>{const[t,n]=v.useState([]),r=v.useCallback((i,o="success",c=4e3)=>{const u=Math.random().toString(36).substr(2,9);n(d=>[...d,{id:u,message:i,type:o}]),setTimeout(()=>{s(u)},c)},[]),s=v.useCallback(i=>{n(o=>o.filter(c=>c.id!==i))},[]),l=i=>{switch(i){case"success":return a.jsx(ca,{size:18});case"warning":return a.jsx(fx,{size:18});case"error":return a.jsx(Af,{size:18});case"info":default:return a.jsx(sx,{size:18})}};return a.jsxs(If.Provider,{value:{showToast:r},children:[e,a.jsx("div",{className:"toast-container",children:t.map(i=>a.jsxs("div",{className:`toast-card toast-${i.type} animate-slide-in`,children:[a.jsx("div",{className:"toast-icon-wrapper",children:l(i.type)}),a.jsx("div",{className:"toast-content",children:i.message}),a.jsx("button",{className:"toast-close-btn",onClick:()=>s(i.id),children:a.jsx(Ct,{size:14})})]},i.id))}),a.jsx("style",{children:`
        .toast-container {
          position: fixed;
          bottom: 24px;
          right: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          z-index: 9999;
          max-width: 360px;
          width: calc(100vw - 48px);
        }

        .toast-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: var(--radius-sm);
          background-color: var(--bg-secondary);
          border-left: 4px solid var(--primary);
          box-shadow: var(--shadow-lg);
          color: var(--text-primary);
          font-size: 14px;
          font-weight: 500;
          transition: all var(--transition-normal);
        }

        .toast-success { border-left-color: var(--success); }
        .toast-error { border-left-color: var(--danger); }
        .toast-warning { border-left-color: var(--warning); }
        .toast-info { border-left-color: var(--primary); }

        .toast-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .toast-success .toast-icon-wrapper { color: var(--success); }
        .toast-error .toast-icon-wrapper { color: var(--danger); }
        .toast-warning .toast-icon-wrapper { color: var(--warning); }
        .toast-info .toast-icon-wrapper { color: var(--primary); }

        .toast-content {
          flex-grow: 1;
          word-break: break-word;
        }

        .toast-close-btn {
          color: var(--text-tertiary);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color var(--transition-fast);
          background: none;
          border: none;
        }

        .toast-close-btn:hover {
          color: var(--text-primary);
        }

        @keyframes toastSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-slide-in {
          animation: toastSlideIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `})]})},st=()=>{const e=v.useContext(If);if(!e)throw new Error("useToast must be used within a ToastProvider");return e};function Uf(e,t){return function(){return e.apply(t,arguments)}}const{toString:gx}=Object.prototype,{getPrototypeOf:za}=Object,{iterator:La,toStringTag:Bf}=Symbol,Oa=(e=>t=>{const n=gx.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),at=e=>(e=e.toLowerCase(),t=>Oa(t)===e),Aa=e=>t=>typeof t===e,{isArray:Yn}=Array,Hn=Aa("undefined");function Xr(e){return e!==null&&!Hn(e)&&e.constructor!==null&&!Hn(e.constructor)&&De(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const $f=at("ArrayBuffer");function xx(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&$f(e.buffer),t}const yx=Aa("string"),De=Aa("function"),Hf=Aa("number"),Yr=e=>e!==null&&typeof e=="object",vx=e=>e===!0||e===!1,Os=e=>{if(Oa(e)!=="object")return!1;const t=za(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Bf in e)&&!(La in e)},wx=e=>{if(!Yr(e)||Xr(e))return!1;try{return Object.keys(e).length===0&&Object.getPrototypeOf(e)===Object.prototype}catch{return!1}},jx=at("Date"),kx=at("File"),bx=e=>!!(e&&typeof e.uri<"u"),Sx=e=>e&&typeof e.getParts<"u",Nx=at("Blob"),Cx=at("FileList"),Ex=e=>Yr(e)&&De(e.pipe);function _x(){return typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}}const qc=_x(),Jc=typeof qc.FormData<"u"?qc.FormData:void 0,Rx=e=>{if(!e)return!1;if(Jc&&e instanceof Jc)return!0;const t=za(e);if(!t||t===Object.prototype||!De(e.append))return!1;const n=Oa(e);return n==="formdata"||n==="object"&&De(e.toString)&&e.toString()==="[object FormData]"},Tx=at("URLSearchParams"),[Px,zx,Lx,Ox]=["ReadableStream","Request","Response","Headers"].map(at),Ax=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function Gr(e,t,{allOwnKeys:n=!1}={}){if(e===null||typeof e>"u")return;let r,s;if(typeof e!="object"&&(e=[e]),Yn(e))for(r=0,s=e.length;r<s;r++)t.call(null,e[r],r,e);else{if(Xr(e))return;const l=n?Object.getOwnPropertyNames(e):Object.keys(e),i=l.length;let o;for(r=0;r<i;r++)o=l[r],t.call(null,e[o],o,e)}}function Wf(e,t){if(Xr(e))return null;t=t.toLowerCase();const n=Object.keys(e);let r=n.length,s;for(;r-- >0;)if(s=n[r],t===s.toLowerCase())return s;return null}const en=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,Vf=e=>!Hn(e)&&e!==en;function mi(...e){const{caseless:t,skipUndefined:n}=Vf(this)&&this||{},r={},s=(l,i)=>{if(i==="__proto__"||i==="constructor"||i==="prototype")return;const o=t&&Wf(r,i)||i,c=gi(r,o)?r[o]:void 0;Os(c)&&Os(l)?r[o]=mi(c,l):Os(l)?r[o]=mi({},l):Yn(l)?r[o]=l.slice():(!n||!Hn(l))&&(r[o]=l)};for(let l=0,i=e.length;l<i;l++)e[l]&&Gr(e[l],s);return r}const Dx=(e,t,n,{allOwnKeys:r}={})=>(Gr(t,(s,l)=>{n&&De(s)?Object.defineProperty(e,l,{__proto__:null,value:Uf(s,n),writable:!0,enumerable:!0,configurable:!0}):Object.defineProperty(e,l,{__proto__:null,value:s,writable:!0,enumerable:!0,configurable:!0})},{allOwnKeys:r}),e),Mx=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),Fx=(e,t,n,r)=>{e.prototype=Object.create(t.prototype,r),Object.defineProperty(e.prototype,"constructor",{__proto__:null,value:e,writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(e,"super",{__proto__:null,value:t.prototype}),n&&Object.assign(e.prototype,n)},Ix=(e,t,n,r)=>{let s,l,i;const o={};if(t=t||{},e==null)return t;do{for(s=Object.getOwnPropertyNames(e),l=s.length;l-- >0;)i=s[l],(!r||r(i,e,t))&&!o[i]&&(t[i]=e[i],o[i]=!0);e=n!==!1&&za(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},Ux=(e,t,n)=>{e=String(e),(n===void 0||n>e.length)&&(n=e.length),n-=t.length;const r=e.indexOf(t,n);return r!==-1&&r===n},Bx=e=>{if(!e)return null;if(Yn(e))return e;let t=e.length;if(!Hf(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},$x=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&za(Uint8Array)),Hx=(e,t)=>{const r=(e&&e[La]).call(e);let s;for(;(s=r.next())&&!s.done;){const l=s.value;t.call(e,l[0],l[1])}},Wx=(e,t)=>{let n;const r=[];for(;(n=e.exec(t))!==null;)r.push(n);return r},Vx=at("HTMLFormElement"),qx=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,r,s){return r.toUpperCase()+s}),gi=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),Jx=at("RegExp"),qf=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),r={};Gr(n,(s,l)=>{let i;(i=t(s,l,e))!==!1&&(r[l]=i||s)}),Object.defineProperties(e,r)},Qx=e=>{qf(e,(t,n)=>{if(De(e)&&["arguments","caller","callee"].includes(n))return!1;const r=e[n];if(De(r)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},Kx=(e,t)=>{const n={},r=s=>{s.forEach(l=>{n[l]=!0})};return Yn(e)?r(e):r(String(e).split(t)),n},Xx=()=>{},Yx=(e,t)=>e!=null&&Number.isFinite(e=+e)?e:t;function Gx(e){return!!(e&&De(e.append)&&e[Bf]==="FormData"&&e[La])}const Zx=e=>{const t=new WeakSet,n=r=>{if(Yr(r)){if(t.has(r))return;if(Xr(r))return r;if(!("toJSON"in r)){t.add(r);const s=Yn(r)?[]:{};return Gr(r,(l,i)=>{const o=n(l);!Hn(o)&&(s[i]=o)}),t.delete(r),s}}return r};return n(e)},ey=at("AsyncFunction"),ty=e=>e&&(Yr(e)||De(e))&&De(e.then)&&De(e.catch),Jf=((e,t)=>e?setImmediate:t?((n,r)=>(en.addEventListener("message",({source:s,data:l})=>{s===en&&l===n&&r.length&&r.shift()()},!1),s=>{r.push(s),en.postMessage(n,"*")}))(`axios@${Math.random()}`,[]):n=>setTimeout(n))(typeof setImmediate=="function",De(en.postMessage)),ny=typeof queueMicrotask<"u"?queueMicrotask.bind(en):typeof process<"u"&&process.nextTick||Jf,ry=e=>e!=null&&De(e[La]),k={isArray:Yn,isArrayBuffer:$f,isBuffer:Xr,isFormData:Rx,isArrayBufferView:xx,isString:yx,isNumber:Hf,isBoolean:vx,isObject:Yr,isPlainObject:Os,isEmptyObject:wx,isReadableStream:Px,isRequest:zx,isResponse:Lx,isHeaders:Ox,isUndefined:Hn,isDate:jx,isFile:kx,isReactNativeBlob:bx,isReactNative:Sx,isBlob:Nx,isRegExp:Jx,isFunction:De,isStream:Ex,isURLSearchParams:Tx,isTypedArray:$x,isFileList:Cx,forEach:Gr,merge:mi,extend:Dx,trim:Ax,stripBOM:Mx,inherits:Fx,toFlatObject:Ix,kindOf:Oa,kindOfTest:at,endsWith:Ux,toArray:Bx,forEachEntry:Hx,matchAll:Wx,isHTMLForm:Vx,hasOwnProperty:gi,hasOwnProp:gi,reduceDescriptors:qf,freezeMethods:Qx,toObjectSet:Kx,toCamelCase:qx,noop:Xx,toFiniteNumber:Yx,findKey:Wf,global:en,isContextDefined:Vf,isSpecCompliantForm:Gx,toJSONObject:Zx,isAsyncFn:ey,isThenable:ty,setImmediate:Jf,asap:ny,isIterable:ry},sy=k.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),ay=e=>{const t={};let n,r,s;return e&&e.split(`
`).forEach(function(i){s=i.indexOf(":"),n=i.substring(0,s).trim().toLowerCase(),r=i.substring(s+1).trim(),!(!n||t[n]&&sy[n])&&(n==="set-cookie"?t[n]?t[n].push(r):t[n]=[r]:t[n]=t[n]?t[n]+", "+r:r)}),t};function ly(e){let t=0,n=e.length;for(;t<n;){const r=e.charCodeAt(t);if(r!==9&&r!==32)break;t+=1}for(;n>t;){const r=e.charCodeAt(n-1);if(r!==9&&r!==32)break;n-=1}return t===0&&n===e.length?e:e.slice(t,n)}const iy=new RegExp("[\\u0000-\\u0008\\u000a-\\u001f\\u007f]+","g"),oy=new RegExp("[^\\u0009\\u0020-\\u007e\\u0080-\\u00ff]+","g");function wo(e,t){return k.isArray(e)?e.map(n=>wo(n,t)):ly(String(e).replace(t,""))}const cy=e=>wo(e,iy),uy=e=>wo(e,oy);function Qf(e){const t=Object.create(null);return k.forEach(e.toJSON(),(n,r)=>{t[r]=uy(n)}),t}const Qc=Symbol("internals");function ir(e){return e&&String(e).trim().toLowerCase()}function As(e){return e===!1||e==null?e:k.isArray(e)?e.map(As):cy(String(e))}function dy(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let r;for(;r=n.exec(e);)t[r[1]]=r[2];return t}const fy=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function fl(e,t,n,r,s){if(k.isFunction(r))return r.call(this,t,n);if(s&&(t=n),!!k.isString(t)){if(k.isString(r))return t.indexOf(r)!==-1;if(k.isRegExp(r))return r.test(t)}}function py(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,n,r)=>n.toUpperCase()+r)}function hy(e,t){const n=k.toCamelCase(" "+t);["get","set","has"].forEach(r=>{Object.defineProperty(e,r+n,{__proto__:null,value:function(s,l,i){return this[r].call(this,t,s,l,i)},configurable:!0})})}let Ne=class{constructor(t){t&&this.set(t)}set(t,n,r){const s=this;function l(o,c,u){const d=ir(c);if(!d)throw new Error("header name must be a non-empty string");const h=k.findKey(s,d);(!h||s[h]===void 0||u===!0||u===void 0&&s[h]!==!1)&&(s[h||c]=As(o))}const i=(o,c)=>k.forEach(o,(u,d)=>l(u,d,c));if(k.isPlainObject(t)||t instanceof this.constructor)i(t,n);else if(k.isString(t)&&(t=t.trim())&&!fy(t))i(ay(t),n);else if(k.isObject(t)&&k.isIterable(t)){let o={},c,u;for(const d of t){if(!k.isArray(d))throw TypeError("Object iterator must return a key-value pair");o[u=d[0]]=(c=o[u])?k.isArray(c)?[...c,d[1]]:[c,d[1]]:d[1]}i(o,n)}else t!=null&&l(n,t,r);return this}get(t,n){if(t=ir(t),t){const r=k.findKey(this,t);if(r){const s=this[r];if(!n)return s;if(n===!0)return dy(s);if(k.isFunction(n))return n.call(this,s,r);if(k.isRegExp(n))return n.exec(s);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,n){if(t=ir(t),t){const r=k.findKey(this,t);return!!(r&&this[r]!==void 0&&(!n||fl(this,this[r],r,n)))}return!1}delete(t,n){const r=this;let s=!1;function l(i){if(i=ir(i),i){const o=k.findKey(r,i);o&&(!n||fl(r,r[o],o,n))&&(delete r[o],s=!0)}}return k.isArray(t)?t.forEach(l):l(t),s}clear(t){const n=Object.keys(this);let r=n.length,s=!1;for(;r--;){const l=n[r];(!t||fl(this,this[l],l,t,!0))&&(delete this[l],s=!0)}return s}normalize(t){const n=this,r={};return k.forEach(this,(s,l)=>{const i=k.findKey(r,l);if(i){n[i]=As(s),delete n[l];return}const o=t?py(l):String(l).trim();o!==l&&delete n[l],n[o]=As(s),r[o]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const n=Object.create(null);return k.forEach(this,(r,s)=>{r!=null&&r!==!1&&(n[s]=t&&k.isArray(r)?r.join(", "):r)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,n])=>t+": "+n).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...n){const r=new this(t);return n.forEach(s=>r.set(s)),r}static accessor(t){const r=(this[Qc]=this[Qc]={accessors:{}}).accessors,s=this.prototype;function l(i){const o=ir(i);r[o]||(hy(s,i),r[o]=!0)}return k.isArray(t)?t.forEach(l):l(t),this}};Ne.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);k.reduceDescriptors(Ne.prototype,({value:e},t)=>{let n=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(r){this[n]=r}}});k.freezeMethods(Ne);const my="[REDACTED ****]";function gy(e){if(k.hasOwnProp(e,"toJSON"))return!0;let t=Object.getPrototypeOf(e);for(;t&&t!==Object.prototype;){if(k.hasOwnProp(t,"toJSON"))return!0;t=Object.getPrototypeOf(t)}return!1}function xy(e,t){const n=new Set(t.map(l=>String(l).toLowerCase())),r=[],s=l=>{if(l===null||typeof l!="object"||k.isBuffer(l))return l;if(r.indexOf(l)!==-1)return;l instanceof Ne&&(l=l.toJSON()),r.push(l);let i;if(k.isArray(l))i=[],l.forEach((o,c)=>{const u=s(o);k.isUndefined(u)||(i[c]=u)});else{if(!k.isPlainObject(l)&&gy(l))return r.pop(),l;i=Object.create(null);for(const[o,c]of Object.entries(l)){const u=n.has(o.toLowerCase())?my:s(c);k.isUndefined(u)||(i[o]=u)}}return r.pop(),i};return s(e)}let A=class Kf extends Error{static from(t,n,r,s,l,i){const o=new Kf(t.message,n||t.code,r,s,l);return o.cause=t,o.name=t.name,t.status!=null&&o.status==null&&(o.status=t.status),i&&Object.assign(o,i),o}constructor(t,n,r,s,l){super(t),Object.defineProperty(this,"message",{__proto__:null,value:t,enumerable:!0,writable:!0,configurable:!0}),this.name="AxiosError",this.isAxiosError=!0,n&&(this.code=n),r&&(this.config=r),s&&(this.request=s),l&&(this.response=l,this.status=l.status)}toJSON(){const t=this.config,n=t&&k.hasOwnProp(t,"redact")?t.redact:void 0,r=k.isArray(n)&&n.length>0?xy(t,n):k.toJSONObject(t);return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:r,code:this.code,status:this.status}}};A.ERR_BAD_OPTION_VALUE="ERR_BAD_OPTION_VALUE";A.ERR_BAD_OPTION="ERR_BAD_OPTION";A.ECONNABORTED="ECONNABORTED";A.ETIMEDOUT="ETIMEDOUT";A.ECONNREFUSED="ECONNREFUSED";A.ERR_NETWORK="ERR_NETWORK";A.ERR_FR_TOO_MANY_REDIRECTS="ERR_FR_TOO_MANY_REDIRECTS";A.ERR_DEPRECATED="ERR_DEPRECATED";A.ERR_BAD_RESPONSE="ERR_BAD_RESPONSE";A.ERR_BAD_REQUEST="ERR_BAD_REQUEST";A.ERR_CANCELED="ERR_CANCELED";A.ERR_NOT_SUPPORT="ERR_NOT_SUPPORT";A.ERR_INVALID_URL="ERR_INVALID_URL";A.ERR_FORM_DATA_DEPTH_EXCEEDED="ERR_FORM_DATA_DEPTH_EXCEEDED";const yy=null;function xi(e){return k.isPlainObject(e)||k.isArray(e)}function Xf(e){return k.endsWith(e,"[]")?e.slice(0,-2):e}function pl(e,t,n){return e?e.concat(t).map(function(s,l){return s=Xf(s),!n&&l?"["+s+"]":s}).join(n?".":""):t}function vy(e){return k.isArray(e)&&!e.some(xi)}const wy=k.toFlatObject(k,{},null,function(t){return/^is[A-Z]/.test(t)});function Da(e,t,n){if(!k.isObject(e))throw new TypeError("target must be an object");t=t||new FormData,n=k.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(w,f){return!k.isUndefined(f[w])});const r=n.metaTokens,s=n.visitor||h,l=n.dots,i=n.indexes,o=n.Blob||typeof Blob<"u"&&Blob,c=n.maxDepth===void 0?100:n.maxDepth,u=o&&k.isSpecCompliantForm(t);if(!k.isFunction(s))throw new TypeError("visitor must be a function");function d(m){if(m===null)return"";if(k.isDate(m))return m.toISOString();if(k.isBoolean(m))return m.toString();if(!u&&k.isBlob(m))throw new A("Blob is not supported. Use a Buffer instead.");return k.isArrayBuffer(m)||k.isTypedArray(m)?u&&typeof Blob=="function"?new Blob([m]):Buffer.from(m):m}function h(m,w,f){let p=m;if(k.isReactNative(t)&&k.isReactNativeBlob(m))return t.append(pl(f,w,l),d(m)),!1;if(m&&!f&&typeof m=="object"){if(k.endsWith(w,"{}"))w=r?w:w.slice(0,-2),m=JSON.stringify(m);else if(k.isArray(m)&&vy(m)||(k.isFileList(m)||k.endsWith(w,"[]"))&&(p=k.toArray(m)))return w=Xf(w),p.forEach(function(b,E){!(k.isUndefined(b)||b===null)&&t.append(i===!0?pl([w],E,l):i===null?w:w+"[]",d(b))}),!1}return xi(m)?!0:(t.append(pl(f,w,l),d(m)),!1)}const y=[],j=Object.assign(wy,{defaultVisitor:h,convertValue:d,isVisitable:xi});function x(m,w,f=0){if(!k.isUndefined(m)){if(f>c)throw new A("Object is too deeply nested ("+f+" levels). Max depth: "+c,A.ERR_FORM_DATA_DEPTH_EXCEEDED);if(y.indexOf(m)!==-1)throw Error("Circular reference detected in "+w.join("."));y.push(m),k.forEach(m,function(g,b){(!(k.isUndefined(g)||g===null)&&s.call(t,g,k.isString(b)?b.trim():b,w,j))===!0&&x(g,w?w.concat(b):[b],f+1)}),y.pop()}}if(!k.isObject(e))throw new TypeError("data must be an object");return x(e),t}function Kc(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+"};return encodeURIComponent(e).replace(/[!'()~]|%20/g,function(r){return t[r]})}function jo(e,t){this._pairs=[],e&&Da(e,this,t)}const Yf=jo.prototype;Yf.append=function(t,n){this._pairs.push([t,n])};Yf.toString=function(t){const n=t?function(r){return t.call(this,r,Kc)}:Kc;return this._pairs.map(function(s){return n(s[0])+"="+n(s[1])},"").join("&")};function jy(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function Gf(e,t,n){if(!t)return e;const r=n&&n.encode||jy,s=k.isFunction(n)?{serialize:n}:n,l=s&&s.serialize;let i;if(l?i=l(t,s):i=k.isURLSearchParams(t)?t.toString():new jo(t,s).toString(r),i){const o=e.indexOf("#");o!==-1&&(e=e.slice(0,o)),e+=(e.indexOf("?")===-1?"?":"&")+i}return e}class Xc{constructor(){this.handlers=[]}use(t,n,r){return this.handlers.push({fulfilled:t,rejected:n,synchronous:r?r.synchronous:!1,runWhen:r?r.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){k.forEach(this.handlers,function(r){r!==null&&t(r)})}}const ko={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1,legacyInterceptorReqResOrdering:!0},ky=typeof URLSearchParams<"u"?URLSearchParams:jo,by=typeof FormData<"u"?FormData:null,Sy=typeof Blob<"u"?Blob:null,Ny={isBrowser:!0,classes:{URLSearchParams:ky,FormData:by,Blob:Sy},protocols:["http","https","file","blob","url","data"]},bo=typeof window<"u"&&typeof document<"u",yi=typeof navigator=="object"&&navigator||void 0,Cy=bo&&(!yi||["ReactNative","NativeScript","NS"].indexOf(yi.product)<0),Ey=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",_y=bo&&window.location.href||"http://localhost",Ry=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:bo,hasStandardBrowserEnv:Cy,hasStandardBrowserWebWorkerEnv:Ey,navigator:yi,origin:_y},Symbol.toStringTag,{value:"Module"})),we={...Ry,...Ny};function Ty(e,t){return Da(e,new we.classes.URLSearchParams,{visitor:function(n,r,s,l){return we.isNode&&k.isBuffer(n)?(this.append(r,n.toString("base64")),!1):l.defaultVisitor.apply(this,arguments)},...t})}function Py(e){return k.matchAll(/\w+|\[(\w*)]/g,e).map(t=>t[0]==="[]"?"":t[1]||t[0])}function zy(e){const t={},n=Object.keys(e);let r;const s=n.length;let l;for(r=0;r<s;r++)l=n[r],t[l]=e[l];return t}function Zf(e){function t(n,r,s,l){let i=n[l++];if(i==="__proto__")return!0;const o=Number.isFinite(+i),c=l>=n.length;return i=!i&&k.isArray(s)?s.length:i,c?(k.hasOwnProp(s,i)?s[i]=k.isArray(s[i])?s[i].concat(r):[s[i],r]:s[i]=r,!o):((!k.hasOwnProp(s,i)||!k.isObject(s[i]))&&(s[i]=[]),t(n,r,s[i],l)&&k.isArray(s[i])&&(s[i]=zy(s[i])),!o)}if(k.isFormData(e)&&k.isFunction(e.entries)){const n={};return k.forEachEntry(e,(r,s)=>{t(Py(r),s,n,0)}),n}return null}const gn=(e,t)=>e!=null&&k.hasOwnProp(e,t)?e[t]:void 0;function Ly(e,t,n){if(k.isString(e))try{return(t||JSON.parse)(e),k.trim(e)}catch(r){if(r.name!=="SyntaxError")throw r}return(n||JSON.stringify)(e)}const Zr={transitional:ko,adapter:["xhr","http","fetch"],transformRequest:[function(t,n){const r=n.getContentType()||"",s=r.indexOf("application/json")>-1,l=k.isObject(t);if(l&&k.isHTMLForm(t)&&(t=new FormData(t)),k.isFormData(t))return s?JSON.stringify(Zf(t)):t;if(k.isArrayBuffer(t)||k.isBuffer(t)||k.isStream(t)||k.isFile(t)||k.isBlob(t)||k.isReadableStream(t))return t;if(k.isArrayBufferView(t))return t.buffer;if(k.isURLSearchParams(t))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let o;if(l){const c=gn(this,"formSerializer");if(r.indexOf("application/x-www-form-urlencoded")>-1)return Ty(t,c).toString();if((o=k.isFileList(t))||r.indexOf("multipart/form-data")>-1){const u=gn(this,"env"),d=u&&u.FormData;return Da(o?{"files[]":t}:t,d&&new d,c)}}return l||s?(n.setContentType("application/json",!1),Ly(t)):t}],transformResponse:[function(t){const n=gn(this,"transitional")||Zr.transitional,r=n&&n.forcedJSONParsing,s=gn(this,"responseType"),l=s==="json";if(k.isResponse(t)||k.isReadableStream(t))return t;if(t&&k.isString(t)&&(r&&!s||l)){const o=!(n&&n.silentJSONParsing)&&l;try{return JSON.parse(t,gn(this,"parseReviver"))}catch(c){if(o)throw c.name==="SyntaxError"?A.from(c,A.ERR_BAD_RESPONSE,this,null,gn(this,"response")):c}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:we.classes.FormData,Blob:we.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};k.forEach(["delete","get","head","post","put","patch","query"],e=>{Zr.headers[e]={}});function hl(e,t){const n=this||Zr,r=t||n,s=Ne.from(r.headers);let l=r.data;return k.forEach(e,function(o){l=o.call(n,l,s.normalize(),t?t.status:void 0)}),s.normalize(),l}function ep(e){return!!(e&&e.__CANCEL__)}let es=class extends A{constructor(t,n,r){super(t??"canceled",A.ERR_CANCELED,n,r),this.name="CanceledError",this.__CANCEL__=!0}};function tp(e,t,n){const r=n.config.validateStatus;!n.status||!r||r(n.status)?e(n):t(new A("Request failed with status code "+n.status,n.status>=400&&n.status<500?A.ERR_BAD_REQUEST:A.ERR_BAD_RESPONSE,n.config,n.request,n))}function Oy(e){const t=/^([-+\w]{1,25}):(?:\/\/)?/.exec(e);return t&&t[1]||""}function Ay(e,t){e=e||10;const n=new Array(e),r=new Array(e);let s=0,l=0,i;return t=t!==void 0?t:1e3,function(c){const u=Date.now(),d=r[l];i||(i=u),n[s]=c,r[s]=u;let h=l,y=0;for(;h!==s;)y+=n[h++],h=h%e;if(s=(s+1)%e,s===l&&(l=(l+1)%e),u-i<t)return;const j=d&&u-d;return j?Math.round(y*1e3/j):void 0}}function Dy(e,t){let n=0,r=1e3/t,s,l;const i=(u,d=Date.now())=>{n=d,s=null,l&&(clearTimeout(l),l=null),e(...u)};return[(...u)=>{const d=Date.now(),h=d-n;h>=r?i(u,d):(s=u,l||(l=setTimeout(()=>{l=null,i(s)},r-h)))},()=>s&&i(s)]}const da=(e,t,n=3)=>{let r=0;const s=Ay(50,250);return Dy(l=>{if(!l||typeof l.loaded!="number")return;const i=l.loaded,o=l.lengthComputable?l.total:void 0,c=o!=null?Math.min(i,o):i,u=Math.max(0,c-r),d=s(u);r=Math.max(r,c);const h={loaded:c,total:o,progress:o?c/o:void 0,bytes:u,rate:d||void 0,estimated:d&&o?(o-c)/d:void 0,event:l,lengthComputable:o!=null,[t?"download":"upload"]:!0};e(h)},n)},Yc=(e,t)=>{const n=e!=null;return[r=>t[0]({lengthComputable:n,total:e,loaded:r}),t[1]]},Gc=e=>(...t)=>k.asap(()=>e(...t)),My=we.hasStandardBrowserEnv?((e,t)=>n=>(n=new URL(n,we.origin),e.protocol===n.protocol&&e.host===n.host&&(t||e.port===n.port)))(new URL(we.origin),we.navigator&&/(msie|trident)/i.test(we.navigator.userAgent)):()=>!0,Fy=we.hasStandardBrowserEnv?{write(e,t,n,r,s,l,i){if(typeof document>"u")return;const o=[`${e}=${encodeURIComponent(t)}`];k.isNumber(n)&&o.push(`expires=${new Date(n).toUTCString()}`),k.isString(r)&&o.push(`path=${r}`),k.isString(s)&&o.push(`domain=${s}`),l===!0&&o.push("secure"),k.isString(i)&&o.push(`SameSite=${i}`),document.cookie=o.join("; ")},read(e){if(typeof document>"u")return null;const t=document.cookie.split(";");for(let n=0;n<t.length;n++){const r=t[n].replace(/^\s+/,""),s=r.indexOf("=");if(s!==-1&&r.slice(0,s)===e)return decodeURIComponent(r.slice(s+1))}return null},remove(e){this.write(e,"",Date.now()-864e5,"/")}}:{write(){},read(){return null},remove(){}};function Iy(e){return typeof e!="string"?!1:/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function Uy(e,t){return t?e.replace(/\/?\/$/,"")+"/"+t.replace(/^\/+/,""):e}function np(e,t,n){let r=!Iy(t);return e&&(r||n===!1)?Uy(e,t):t}const Zc=e=>e instanceof Ne?{...e}:e;function dn(e,t){t=t||{};const n=Object.create(null);Object.defineProperty(n,"hasOwnProperty",{__proto__:null,value:Object.prototype.hasOwnProperty,enumerable:!1,writable:!0,configurable:!0});function r(u,d,h,y){return k.isPlainObject(u)&&k.isPlainObject(d)?k.merge.call({caseless:y},u,d):k.isPlainObject(d)?k.merge({},d):k.isArray(d)?d.slice():d}function s(u,d,h,y){if(k.isUndefined(d)){if(!k.isUndefined(u))return r(void 0,u,h,y)}else return r(u,d,h,y)}function l(u,d){if(!k.isUndefined(d))return r(void 0,d)}function i(u,d){if(k.isUndefined(d)){if(!k.isUndefined(u))return r(void 0,u)}else return r(void 0,d)}function o(u,d,h){if(k.hasOwnProp(t,h))return r(u,d);if(k.hasOwnProp(e,h))return r(void 0,u)}const c={url:l,method:l,data:l,baseURL:i,transformRequest:i,transformResponse:i,paramsSerializer:i,timeout:i,timeoutMessage:i,withCredentials:i,withXSRFToken:i,adapter:i,responseType:i,xsrfCookieName:i,xsrfHeaderName:i,onUploadProgress:i,onDownloadProgress:i,decompress:i,maxContentLength:i,maxBodyLength:i,beforeRedirect:i,transport:i,httpAgent:i,httpsAgent:i,cancelToken:i,socketPath:i,allowedSocketPaths:i,responseEncoding:i,validateStatus:o,headers:(u,d,h)=>s(Zc(u),Zc(d),h,!0)};return k.forEach(Object.keys({...e,...t}),function(d){if(d==="__proto__"||d==="constructor"||d==="prototype")return;const h=k.hasOwnProp(c,d)?c[d]:s,y=k.hasOwnProp(e,d)?e[d]:void 0,j=k.hasOwnProp(t,d)?t[d]:void 0,x=h(y,j,d);k.isUndefined(x)&&h!==o||(n[d]=x)}),n}const By=["content-type","content-length"];function $y(e,t,n){if(n!=="content-only"){e.set(t);return}Object.entries(t).forEach(([r,s])=>{By.includes(r.toLowerCase())&&e.set(r,s)})}const Hy=e=>encodeURIComponent(e).replace(/%([0-9A-F]{2})/gi,(t,n)=>String.fromCharCode(parseInt(n,16))),rp=e=>{const t=dn({},e),n=y=>k.hasOwnProp(t,y)?t[y]:void 0,r=n("data");let s=n("withXSRFToken");const l=n("xsrfHeaderName"),i=n("xsrfCookieName");let o=n("headers");const c=n("auth"),u=n("baseURL"),d=n("allowAbsoluteUrls"),h=n("url");if(t.headers=o=Ne.from(o),t.url=Gf(np(u,h,d),e.params,e.paramsSerializer),c&&o.set("Authorization","Basic "+btoa((c.username||"")+":"+(c.password?Hy(c.password):""))),k.isFormData(r)&&(we.hasStandardBrowserEnv||we.hasStandardBrowserWebWorkerEnv?o.setContentType(void 0):k.isFunction(r.getHeaders)&&$y(o,r.getHeaders(),n("formDataHeaderPolicy"))),we.hasStandardBrowserEnv&&(k.isFunction(s)&&(s=s(t)),s===!0||s==null&&My(t.url))){const j=l&&i&&Fy.read(i);j&&o.set(l,j)}return t},Wy=typeof XMLHttpRequest<"u",Vy=Wy&&function(e){return new Promise(function(n,r){const s=rp(e);let l=s.data;const i=Ne.from(s.headers).normalize();let{responseType:o,onUploadProgress:c,onDownloadProgress:u}=s,d,h,y,j,x;function m(){j&&j(),x&&x(),s.cancelToken&&s.cancelToken.unsubscribe(d),s.signal&&s.signal.removeEventListener("abort",d)}let w=new XMLHttpRequest;w.open(s.method.toUpperCase(),s.url,!0),w.timeout=s.timeout;function f(){if(!w)return;const g=Ne.from("getAllResponseHeaders"in w&&w.getAllResponseHeaders()),E={data:!o||o==="text"||o==="json"?w.responseText:w.response,status:w.status,statusText:w.statusText,headers:g,config:e,request:w};tp(function(_){n(_),m()},function(_){r(_),m()},E),w=null}"onloadend"in w?w.onloadend=f:w.onreadystatechange=function(){!w||w.readyState!==4||w.status===0&&!(w.responseURL&&w.responseURL.startsWith("file:"))||setTimeout(f)},w.onabort=function(){w&&(r(new A("Request aborted",A.ECONNABORTED,e,w)),m(),w=null)},w.onerror=function(b){const E=b&&b.message?b.message:"Network Error",P=new A(E,A.ERR_NETWORK,e,w);P.event=b||null,r(P),m(),w=null},w.ontimeout=function(){let b=s.timeout?"timeout of "+s.timeout+"ms exceeded":"timeout exceeded";const E=s.transitional||ko;s.timeoutErrorMessage&&(b=s.timeoutErrorMessage),r(new A(b,E.clarifyTimeoutError?A.ETIMEDOUT:A.ECONNABORTED,e,w)),m(),w=null},l===void 0&&i.setContentType(null),"setRequestHeader"in w&&k.forEach(Qf(i),function(b,E){w.setRequestHeader(E,b)}),k.isUndefined(s.withCredentials)||(w.withCredentials=!!s.withCredentials),o&&o!=="json"&&(w.responseType=s.responseType),u&&([y,x]=da(u,!0),w.addEventListener("progress",y)),c&&w.upload&&([h,j]=da(c),w.upload.addEventListener("progress",h),w.upload.addEventListener("loadend",j)),(s.cancelToken||s.signal)&&(d=g=>{w&&(r(!g||g.type?new es(null,e,w):g),w.abort(),m(),w=null)},s.cancelToken&&s.cancelToken.subscribe(d),s.signal&&(s.signal.aborted?d():s.signal.addEventListener("abort",d)));const p=Oy(s.url);if(p&&!we.protocols.includes(p)){r(new A("Unsupported protocol "+p+":",A.ERR_BAD_REQUEST,e));return}w.send(l||null)})},qy=(e,t)=>{if(e=e?e.filter(Boolean):[],!t&&!e.length)return;const n=new AbortController;let r=!1;const s=function(c){if(!r){r=!0,i();const u=c instanceof Error?c:this.reason;n.abort(u instanceof A?u:new es(u instanceof Error?u.message:u))}};let l=t&&setTimeout(()=>{l=null,s(new A(`timeout of ${t}ms exceeded`,A.ETIMEDOUT))},t);const i=()=>{e&&(l&&clearTimeout(l),l=null,e.forEach(c=>{c.unsubscribe?c.unsubscribe(s):c.removeEventListener("abort",s)}),e=null)};e.forEach(c=>c.addEventListener("abort",s));const{signal:o}=n;return o.unsubscribe=()=>k.asap(i),o},Jy=function*(e,t){let n=e.byteLength;if(n<t){yield e;return}let r=0,s;for(;r<n;)s=r+t,yield e.slice(r,s),r=s},Qy=async function*(e,t){for await(const n of Ky(e))yield*Jy(n,t)},Ky=async function*(e){if(e[Symbol.asyncIterator]){yield*e;return}const t=e.getReader();try{for(;;){const{done:n,value:r}=await t.read();if(n)break;yield r}}finally{await t.cancel()}},eu=(e,t,n,r)=>{const s=Qy(e,t);let l=0,i,o=c=>{i||(i=!0,r&&r(c))};return new ReadableStream({async pull(c){try{const{done:u,value:d}=await s.next();if(u){o(),c.close();return}let h=d.byteLength;if(n){let y=l+=h;n(y)}c.enqueue(new Uint8Array(d))}catch(u){throw o(u),u}},cancel(c){return o(c),s.return()}},{highWaterMark:2})};function Xy(e){if(!e||typeof e!="string"||!e.startsWith("data:"))return 0;const t=e.indexOf(",");if(t<0)return 0;const n=e.slice(5,t),r=e.slice(t+1);if(/;base64/i.test(n)){let i=r.length;const o=r.length;for(let j=0;j<o;j++)if(r.charCodeAt(j)===37&&j+2<o){const x=r.charCodeAt(j+1),m=r.charCodeAt(j+2);(x>=48&&x<=57||x>=65&&x<=70||x>=97&&x<=102)&&(m>=48&&m<=57||m>=65&&m<=70||m>=97&&m<=102)&&(i-=2,j+=2)}let c=0,u=o-1;const d=j=>j>=2&&r.charCodeAt(j-2)===37&&r.charCodeAt(j-1)===51&&(r.charCodeAt(j)===68||r.charCodeAt(j)===100);u>=0&&(r.charCodeAt(u)===61?(c++,u--):d(u)&&(c++,u-=3)),c===1&&u>=0&&(r.charCodeAt(u)===61||d(u))&&c++;const y=Math.floor(i/4)*3-(c||0);return y>0?y:0}if(typeof Buffer<"u"&&typeof Buffer.byteLength=="function")return Buffer.byteLength(r,"utf8");let l=0;for(let i=0,o=r.length;i<o;i++){const c=r.charCodeAt(i);if(c<128)l+=1;else if(c<2048)l+=2;else if(c>=55296&&c<=56319&&i+1<o){const u=r.charCodeAt(i+1);u>=56320&&u<=57343?(l+=4,i++):l+=3}else l+=3}return l}const So="1.16.1",tu=64*1024,{isFunction:js}=k,nu=(e,...t)=>{try{return!!e(...t)}catch{return!1}},Yy=e=>{const t=k.global!==void 0&&k.global!==null?k.global:globalThis,{ReadableStream:n,TextEncoder:r}=t;e=k.merge.call({skipUndefined:!0},{Request:t.Request,Response:t.Response},e);const{fetch:s,Request:l,Response:i}=e,o=s?js(s):typeof fetch=="function",c=js(l),u=js(i);if(!o)return!1;const d=o&&js(n),h=o&&(typeof r=="function"?(f=>p=>f.encode(p))(new r):async f=>new Uint8Array(await new l(f).arrayBuffer())),y=c&&d&&nu(()=>{let f=!1;const p=new l(we.origin,{body:new n,method:"POST",get duplex(){return f=!0,"half"}}),g=p.headers.has("Content-Type");return p.body!=null&&p.body.cancel(),f&&!g}),j=u&&d&&nu(()=>k.isReadableStream(new i("").body)),x={stream:j&&(f=>f.body)};o&&["text","arrayBuffer","blob","formData","stream"].forEach(f=>{!x[f]&&(x[f]=(p,g)=>{let b=p&&p[f];if(b)return b.call(p);throw new A(`Response type '${f}' is not supported`,A.ERR_NOT_SUPPORT,g)})});const m=async f=>{if(f==null)return 0;if(k.isBlob(f))return f.size;if(k.isSpecCompliantForm(f))return(await new l(we.origin,{method:"POST",body:f}).arrayBuffer()).byteLength;if(k.isArrayBufferView(f)||k.isArrayBuffer(f))return f.byteLength;if(k.isURLSearchParams(f)&&(f=f+""),k.isString(f))return(await h(f)).byteLength},w=async(f,p)=>{const g=k.toFiniteNumber(f.getContentLength());return g??m(p)};return async f=>{let{url:p,method:g,data:b,signal:E,cancelToken:P,timeout:_,onDownloadProgress:C,onUploadProgress:I,responseType:L,headers:N,withCredentials:D="same-origin",fetchOptions:U,maxContentLength:M,maxBodyLength:ke}=rp(f);const F=k.isNumber(M)&&M>-1,q=k.isNumber(ke)&&ke>-1;let z=s||fetch;L=L?(L+"").toLowerCase():"text";let S=qy([E,P&&P.toAbortSignal()],_),T=null;const B=S&&S.unsubscribe&&(()=>{S.unsubscribe()});let H;try{if(F&&typeof p=="string"&&p.startsWith("data:")&&Xy(p)>M)throw new A("maxContentLength size of "+M+" exceeded",A.ERR_BAD_RESPONSE,f,T);if(q&&g!=="get"&&g!=="head"){const K=await w(N,b);if(typeof K=="number"&&isFinite(K)&&K>ke)throw new A("Request body larger than maxBodyLength limit",A.ERR_BAD_REQUEST,f,T)}if(I&&y&&g!=="get"&&g!=="head"&&(H=await w(N,b))!==0){let K=new l(p,{method:"POST",body:b,duplex:"half"}),hn;if(k.isFormData(b)&&(hn=K.headers.get("content-type"))&&N.setContentType(hn),K.body){const[ts,ns]=Yc(H,da(Gc(I)));b=eu(K.body,tu,ts,ns)}}k.isString(D)||(D=D?"include":"omit");const Y=c&&"credentials"in l.prototype;if(k.isFormData(b)){const K=N.getContentType();K&&/^multipart\/form-data/i.test(K)&&!/boundary=/i.test(K)&&N.delete("content-type")}N.set("User-Agent","axios/"+So,!1);const ge={...U,signal:S,method:g.toUpperCase(),headers:Qf(N.normalize()),body:b,duplex:"half",credentials:Y?D:void 0};T=c&&new l(p,ge);let _e=await(c?z(T,U):z(p,ge));if(F){const K=k.toFiniteNumber(_e.headers.get("content-length"));if(K!=null&&K>M)throw new A("maxContentLength size of "+M+" exceeded",A.ERR_BAD_RESPONSE,f,T)}const Xe=j&&(L==="stream"||L==="response");if(j&&_e.body&&(C||F||Xe&&B)){const K={};["status","statusText","headers"].forEach(Gn=>{K[Gn]=_e[Gn]});const hn=k.toFiniteNumber(_e.headers.get("content-length")),[ts,ns]=C&&Yc(hn,da(Gc(C),!0))||[];let Eo=0;const cp=Gn=>{if(F&&(Eo=Gn,Eo>M))throw new A("maxContentLength size of "+M+" exceeded",A.ERR_BAD_RESPONSE,f,T);ts&&ts(Gn)};_e=new i(eu(_e.body,tu,cp,()=>{ns&&ns(),B&&B()}),K)}L=L||"text";let Re=await x[k.findKey(x,L)||"text"](_e,f);if(F&&!j&&!Xe){let K;if(Re!=null&&(typeof Re.byteLength=="number"?K=Re.byteLength:typeof Re.size=="number"?K=Re.size:typeof Re=="string"&&(K=typeof r=="function"?new r().encode(Re).byteLength:Re.length)),typeof K=="number"&&K>M)throw new A("maxContentLength size of "+M+" exceeded",A.ERR_BAD_RESPONSE,f,T)}return!Xe&&B&&B(),await new Promise((K,hn)=>{tp(K,hn,{data:Re,headers:Ne.from(_e.headers),status:_e.status,statusText:_e.statusText,config:f,request:T})})}catch(Y){if(B&&B(),S&&S.aborted&&S.reason instanceof A){const ge=S.reason;throw ge.config=f,T&&(ge.request=T),Y!==ge&&(ge.cause=Y),ge}throw Y&&Y.name==="TypeError"&&/Load failed|fetch/i.test(Y.message)?Object.assign(new A("Network Error",A.ERR_NETWORK,f,T,Y&&Y.response),{cause:Y.cause||Y}):A.from(Y,Y&&Y.code,f,T,Y&&Y.response)}}},Gy=new Map,sp=e=>{let t=e&&e.env||{};const{fetch:n,Request:r,Response:s}=t,l=[r,s,n];let i=l.length,o=i,c,u,d=Gy;for(;o--;)c=l[o],u=d.get(c),u===void 0&&d.set(c,u=o?new Map:Yy(t)),d=u;return u};sp();const No={http:yy,xhr:Vy,fetch:{get:sp}};k.forEach(No,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{__proto__:null,value:t})}catch{}Object.defineProperty(e,"adapterName",{__proto__:null,value:t})}});const ru=e=>`- ${e}`,Zy=e=>k.isFunction(e)||e===null||e===!1;function ev(e,t){e=k.isArray(e)?e:[e];const{length:n}=e;let r,s;const l={};for(let i=0;i<n;i++){r=e[i];let o;if(s=r,!Zy(r)&&(s=No[(o=String(r)).toLowerCase()],s===void 0))throw new A(`Unknown adapter '${o}'`);if(s&&(k.isFunction(s)||(s=s.get(t))))break;l[o||"#"+i]=s}if(!s){const i=Object.entries(l).map(([c,u])=>`adapter ${c} `+(u===!1?"is not supported by the environment":"is not available in the build"));let o=n?i.length>1?`since :
`+i.map(ru).join(`
`):" "+ru(i[0]):"as no adapter specified";throw new A("There is no suitable adapter to dispatch the request "+o,"ERR_NOT_SUPPORT")}return s}const ap={getAdapter:ev,adapters:No};function ml(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new es(null,e)}function su(e){return ml(e),e.headers=Ne.from(e.headers),e.data=hl.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),ap.getAdapter(e.adapter||Zr.adapter,e)(e).then(function(r){ml(e),e.response=r;try{r.data=hl.call(e,e.transformResponse,r)}finally{delete e.response}return r.headers=Ne.from(r.headers),r},function(r){if(!ep(r)&&(ml(e),r&&r.response)){e.response=r.response;try{r.response.data=hl.call(e,e.transformResponse,r.response)}finally{delete e.response}r.response.headers=Ne.from(r.response.headers)}return Promise.reject(r)})}const Ma={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{Ma[e]=function(r){return typeof r===e||"a"+(t<1?"n ":" ")+e}});const au={};Ma.transitional=function(t,n,r){function s(l,i){return"[Axios v"+So+"] Transitional option '"+l+"'"+i+(r?". "+r:"")}return(l,i,o)=>{if(t===!1)throw new A(s(i," has been removed"+(n?" in "+n:"")),A.ERR_DEPRECATED);return n&&!au[i]&&(au[i]=!0,console.warn(s(i," has been deprecated since v"+n+" and will be removed in the near future"))),t?t(l,i,o):!0}};Ma.spelling=function(t){return(n,r)=>(console.warn(`${r} is likely a misspelling of ${t}`),!0)};function tv(e,t,n){if(typeof e!="object")throw new A("options must be an object",A.ERR_BAD_OPTION_VALUE);const r=Object.keys(e);let s=r.length;for(;s-- >0;){const l=r[s],i=Object.prototype.hasOwnProperty.call(t,l)?t[l]:void 0;if(i){const o=e[l],c=o===void 0||i(o,l,e);if(c!==!0)throw new A("option "+l+" must be "+c,A.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new A("Unknown option "+l,A.ERR_BAD_OPTION)}}const Ds={assertOptions:tv,validators:Ma},He=Ds.validators;let rn=class{constructor(t){this.defaults=t||{},this.interceptors={request:new Xc,response:new Xc}}async request(t,n){try{return await this._request(t,n)}catch(r){if(r instanceof Error){let s={};Error.captureStackTrace?Error.captureStackTrace(s):s=new Error;const l=(()=>{if(!s.stack)return"";const i=s.stack.indexOf(`
`);return i===-1?"":s.stack.slice(i+1)})();try{if(!r.stack)r.stack=l;else if(l){const i=l.indexOf(`
`),o=i===-1?-1:l.indexOf(`
`,i+1),c=o===-1?"":l.slice(o+1);String(r.stack).endsWith(c)||(r.stack+=`
`+l)}}catch{}}throw r}}_request(t,n){typeof t=="string"?(n=n||{},n.url=t):n=t||{},n=dn(this.defaults,n);const{transitional:r,paramsSerializer:s,headers:l}=n;r!==void 0&&Ds.assertOptions(r,{silentJSONParsing:He.transitional(He.boolean),forcedJSONParsing:He.transitional(He.boolean),clarifyTimeoutError:He.transitional(He.boolean),legacyInterceptorReqResOrdering:He.transitional(He.boolean)},!1),s!=null&&(k.isFunction(s)?n.paramsSerializer={serialize:s}:Ds.assertOptions(s,{encode:He.function,serialize:He.function},!0)),n.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?n.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:n.allowAbsoluteUrls=!0),Ds.assertOptions(n,{baseUrl:He.spelling("baseURL"),withXsrfToken:He.spelling("withXSRFToken")},!0),n.method=(n.method||this.defaults.method||"get").toLowerCase();let i=l&&k.merge(l.common,l[n.method]);l&&k.forEach(["delete","get","head","post","put","patch","query","common"],x=>{delete l[x]}),n.headers=Ne.concat(i,l);const o=[];let c=!0;this.interceptors.request.forEach(function(m){if(typeof m.runWhen=="function"&&m.runWhen(n)===!1)return;c=c&&m.synchronous;const w=n.transitional||ko;w&&w.legacyInterceptorReqResOrdering?o.unshift(m.fulfilled,m.rejected):o.push(m.fulfilled,m.rejected)});const u=[];this.interceptors.response.forEach(function(m){u.push(m.fulfilled,m.rejected)});let d,h=0,y;if(!c){const x=[su.bind(this),void 0];for(x.unshift(...o),x.push(...u),y=x.length,d=Promise.resolve(n);h<y;)d=d.then(x[h++],x[h++]);return d}y=o.length;let j=n;for(;h<y;){const x=o[h++],m=o[h++];try{j=x(j)}catch(w){m.call(this,w);break}}try{d=su.call(this,j)}catch(x){return Promise.reject(x)}for(h=0,y=u.length;h<y;)d=d.then(u[h++],u[h++]);return d}getUri(t){t=dn(this.defaults,t);const n=np(t.baseURL,t.url,t.allowAbsoluteUrls);return Gf(n,t.params,t.paramsSerializer)}};k.forEach(["delete","get","head","options"],function(t){rn.prototype[t]=function(n,r){return this.request(dn(r||{},{method:t,url:n,data:(r||{}).data}))}});k.forEach(["post","put","patch","query"],function(t){function n(r){return function(l,i,o){return this.request(dn(o||{},{method:t,headers:r?{"Content-Type":"multipart/form-data"}:{},url:l,data:i}))}}rn.prototype[t]=n(),t!=="query"&&(rn.prototype[t+"Form"]=n(!0))});let nv=class lp{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(l){n=l});const r=this;this.promise.then(s=>{if(!r._listeners)return;let l=r._listeners.length;for(;l-- >0;)r._listeners[l](s);r._listeners=null}),this.promise.then=s=>{let l;const i=new Promise(o=>{r.subscribe(o),l=o}).then(s);return i.cancel=function(){r.unsubscribe(l)},i},t(function(l,i,o){r.reason||(r.reason=new es(l,i,o),n(r.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const n=this._listeners.indexOf(t);n!==-1&&this._listeners.splice(n,1)}toAbortSignal(){const t=new AbortController,n=r=>{t.abort(r)};return this.subscribe(n),t.signal.unsubscribe=()=>this.unsubscribe(n),t.signal}static source(){let t;return{token:new lp(function(s){t=s}),cancel:t}}};function rv(e){return function(n){return e.apply(null,n)}}function sv(e){return k.isObject(e)&&e.isAxiosError===!0}const vi={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(vi).forEach(([e,t])=>{vi[t]=e});function ip(e){const t=new rn(e),n=Uf(rn.prototype.request,t);return k.extend(n,rn.prototype,t,{allOwnKeys:!0}),k.extend(n,t,null,{allOwnKeys:!0}),n.create=function(s){return ip(dn(e,s))},n}const ae=ip(Zr);ae.Axios=rn;ae.CanceledError=es;ae.CancelToken=nv;ae.isCancel=ep;ae.VERSION=So;ae.toFormData=Da;ae.AxiosError=A;ae.Cancel=ae.CanceledError;ae.all=function(t){return Promise.all(t)};ae.spread=rv;ae.isAxiosError=sv;ae.mergeConfig=dn;ae.AxiosHeaders=Ne;ae.formToJSON=e=>Zf(k.isHTMLForm(e)?new FormData(e):e);ae.getAdapter=ap.getAdapter;ae.HttpStatusCode=vi;ae.default=ae;const{Axios:bv,AxiosError:Sv,CanceledError:Nv,isCancel:Cv,CancelToken:Ev,VERSION:_v,all:Rv,Cancel:Tv,isAxiosError:Pv,spread:zv,toFormData:Lv,AxiosHeaders:Ov,HttpStatusCode:Av,formToJSON:Dv,getAdapter:Mv,mergeConfig:Fv,create:Iv}=ae,op=v.createContext(),$=ae.create({baseURL:"http://localhost:5000/api",headers:{"Content-Type":"application/json"}}),lu=e=>{try{const n=e.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),r=decodeURIComponent(atob(n).split("").map(s=>"%"+("00"+s.charCodeAt(0).toString(16)).slice(-2)).join(""));return JSON.parse(r)}catch{return null}},av=({children:e})=>{const[t,n]=v.useState(null),[r,s]=v.useState(!0),{showToast:l}=st();v.useEffect(()=>{(async()=>{const u=localStorage.getItem("admin_accessToken"),d=localStorage.getItem("admin_refreshToken");if(u){const h=lu(u);if(!(h?h.exp*1e3<Date.now():!0)&&h.role==="admin"){$.defaults.headers.common.Authorization=`Bearer ${u}`;const j=localStorage.getItem("admin_user");n(j?JSON.parse(j):{id:h.id,email:h.email,role:h.role})}else if(d)try{const j=await ae.post("http://localhost:5000/api/auth/refresh-token",{refreshToken:d});if(j.data.success){const{accessToken:x,refreshToken:m,user:w}=j.data;if(localStorage.setItem("admin_accessToken",x),localStorage.setItem("admin_refreshToken",m),$.defaults.headers.common.Authorization=`Bearer ${x}`,w)localStorage.setItem("admin_user",JSON.stringify(w)),n(w);else{const f=lu(x);n({id:f.id,email:f.email,role:f.role})}}else throw new Error("Refresh failed")}catch{localStorage.removeItem("admin_accessToken"),localStorage.removeItem("admin_refreshToken"),localStorage.removeItem("admin_user"),delete $.defaults.headers.common.Authorization,n(null)}else localStorage.removeItem("admin_accessToken"),delete $.defaults.headers.common.Authorization,n(null)}s(!1)})()},[]),v.useEffect(()=>{const c=$.interceptors.response.use(u=>u,async u=>{const d=u.config;if(u.response&&u.response.status===403&&u.response.data.code==="TOKEN_EXPIRED"&&!d._retry){d._retry=!0;try{const h=localStorage.getItem("admin_refreshToken");if(!h)throw new Error("No refresh token available");const y=await ae.post("http://localhost:5000/api/auth/refresh-token",{refreshToken:h});if(y.data.success){const{accessToken:j,refreshToken:x}=y.data;return localStorage.setItem("admin_accessToken",j),localStorage.setItem("admin_refreshToken",x),$.defaults.headers.common.Authorization=`Bearer ${j}`,d.headers.Authorization=`Bearer ${j}`,$(d)}}catch{o(!1),l("Admin session expired. Please log in again.","warning")}}return Promise.reject(u)});return()=>{$.interceptors.response.eject(c)}},[l]);const i=async(c,u)=>{var d,h;try{const y=await $.post("/auth/login",{email:c,password:u});if(y.data.success){const{user:j,accessToken:x,refreshToken:m}=y.data;return j.role!=="admin"?(l("Access Denied. Administrator credentials required.","error"),{success:!1,error:"Forbidden"}):(localStorage.setItem("admin_accessToken",x),localStorage.setItem("admin_refreshToken",m),localStorage.setItem("admin_user",JSON.stringify(j)),$.defaults.headers.common.Authorization=`Bearer ${x}`,n(j),l("🛡️ Welcome to Admin Portal","success"),{success:!0,user:j})}}catch(y){const j=((h=(d=y.response)==null?void 0:d.data)==null?void 0:h.message)||"Login failed. Verify credentials.";return l(j,"error"),{success:!1,error:j}}},o=(c=!0)=>{localStorage.removeItem("admin_accessToken"),localStorage.removeItem("admin_refreshToken"),localStorage.removeItem("admin_user"),delete $.defaults.headers.common.Authorization,n(null),c&&l("Logged out of Admin Portal successfully.","info")};return a.jsx(op.Provider,{value:{admin:t,loading:r,isAuthenticated:!!t,login:i,logout:o},children:e})},Co=()=>{const e=v.useContext(op);if(!e)throw new Error("useAdminAuth must be used within an AdminAuthProvider");return e},lv=({children:e})=>{const{isAuthenticated:t,loading:n}=Co();return n?a.jsxs("div",{className:"admin-protected-route-loading",children:[a.jsx("div",{className:"spinner"}),a.jsx("p",{children:"Verifying Admin session..."}),a.jsx("style",{children:`
          .admin-protected-route-loading {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            gap: 16px;
            color: var(--text-secondary);
          }
        `})]}):t?e:a.jsx(Pf,{to:"/login",replace:!0})},iv=()=>{const{admin:e,logout:t}=Co(),{isDark:n,toggleTheme:r}=qg(),s=Ta(),[l,i]=v.useState(!1),o=()=>{t(),s("/login")},c=()=>{i(!1)};return a.jsxs("div",{className:"admin-layout-wrapper animate-fade",children:[l&&a.jsx("div",{className:"sidebar-backdrop",onClick:()=>i(!1)}),a.jsxs("aside",{className:`admin-sidebar ${l?"open":""}`,children:[a.jsxs("div",{className:"sidebar-logo",children:[a.jsxs("div",{className:"logo-text-group",children:[a.jsx("span",{children:"🛡️"}),a.jsx("span",{children:"JobForge"}),a.jsx("span",{className:"logo-tag",children:"Admin"})]}),a.jsx("button",{className:"sidebar-close-btn",onClick:()=>i(!1),"aria-label":"Close menu",children:a.jsx(Ct,{size:20})})]}),a.jsxs("nav",{className:"sidebar-links",children:[a.jsxs(it,{to:"/",end:!0,className:({isActive:u})=>`sidebar-link ${u?"sidebar-link-active":""}`,onClick:c,children:[a.jsx(ax,{size:18}),a.jsx("span",{children:"Dashboard"})]}),a.jsxs(it,{to:"/jobs",className:({isActive:u})=>`sidebar-link ${u?"sidebar-link-active":""}`,onClick:c,children:[a.jsx(yo,{size:18}),a.jsx("span",{children:"Job Management"})]}),a.jsxs(it,{to:"/companies",className:({isActive:u})=>`sidebar-link ${u?"sidebar-link-active":""}`,onClick:c,children:[a.jsx(Br,{size:18}),a.jsx("span",{children:"Companies"})]}),a.jsxs(it,{to:"/users",className:({isActive:u})=>`sidebar-link ${u?"sidebar-link-active":""}`,onClick:c,children:[a.jsx(Ff,{size:18}),a.jsx("span",{children:"User Directory"})]}),a.jsxs(it,{to:"/applications",className:({isActive:u})=>`sidebar-link ${u?"sidebar-link-active":""}`,onClick:c,children:[a.jsx(ua,{size:18}),a.jsx("span",{children:"Applications"})]}),a.jsxs(it,{to:"/messages",className:({isActive:u})=>`sidebar-link ${u?"sidebar-link-active":""}`,onClick:c,children:[a.jsx($r,{size:18}),a.jsx("span",{children:"Messages"})]}),a.jsxs(it,{to:"/categories",className:({isActive:u})=>`sidebar-link ${u?"sidebar-link-active":""}`,onClick:c,children:[a.jsx(hi,{size:18}),a.jsx("span",{children:"Categories"})]}),a.jsxs(it,{to:"/skills",className:({isActive:u})=>`sidebar-link ${u?"sidebar-link-active":""}`,onClick:c,children:[a.jsx(pi,{size:18}),a.jsx("span",{children:"Skills"})]}),a.jsxs(it,{to:"/locations",className:({isActive:u})=>`sidebar-link ${u?"sidebar-link-active":""}`,onClick:c,children:[a.jsx(Hr,{size:18}),a.jsx("span",{children:"Locations"})]}),a.jsxs(it,{to:"/templates",className:({isActive:u})=>`sidebar-link ${u?"sidebar-link-active":""}`,onClick:c,children:[a.jsx($r,{size:18,style:{opacity:.8}}),a.jsx("span",{children:"Email Templates"})]})]}),a.jsx("div",{className:"sidebar-footer",children:a.jsxs("button",{onClick:o,className:"sidebar-link w-full logout-btn-hover",style:{width:"100%",background:"none",border:"none",textAlign:"left",cursor:"pointer"},children:[a.jsx(lx,{size:18}),a.jsx("span",{children:"Sign Out"})]})})]}),a.jsxs("div",{className:"admin-workspace",children:[a.jsxs("header",{className:"admin-topbar",children:[a.jsxs("div",{className:"topbar-left-section",children:[a.jsx("button",{className:"mobile-menu-toggle-btn",onClick:()=>i(!0),"aria-label":"Open menu",children:a.jsx(ix,{size:20})}),a.jsx("div",{className:"topbar-welcome-info",children:a.jsxs("span",{className:"topbar-admin-badge",children:[a.jsx(vo,{size:14}),a.jsx("span",{children:"Admin Console"})]})})]}),a.jsxs("div",{className:"topbar-search-bar",children:[a.jsx(ft,{size:15,className:"topbar-search-icon"}),a.jsx("input",{type:"text",placeholder:"Search for something",className:"topbar-search-input"})]}),a.jsxs("div",{className:"topbar-actions",children:[a.jsx("button",{className:"theme-toggle-btn",onClick:r,"aria-label":"Toggle Theme",children:n?a.jsx(ux,{size:18}):a.jsx(ox,{size:18})}),a.jsx("button",{className:"topbar-icon-btn","aria-label":"Help",children:a.jsx(Zg,{size:18})}),a.jsx("button",{className:"topbar-icon-btn","aria-label":"Notifications",children:a.jsx(Yg,{size:18})}),a.jsxs("div",{className:"admin-profile-widget",children:[a.jsx("div",{className:"admin-avatar-initials",children:a.jsx(hx,{size:16})}),a.jsxs("div",{className:"admin-details-texts",children:[a.jsxs("div",{className:"admin-widget-name",children:[(e==null?void 0:e.first_name)||"System"," ",(e==null?void 0:e.last_name)||"Admin"]}),a.jsx("div",{className:"admin-widget-email",children:e==null?void 0:e.email})]})]})]})]}),a.jsx("main",{className:"admin-main-viewport",children:a.jsx(Rg,{})})]}),a.jsx("style",{children:`
        .topbar-admin-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background-color: var(--primary-glow);
          border: 1px solid var(--primary);
          color: var(--primary);
          border-radius: var(--radius-full);
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
        }

        /* Topbar Centered Search Input */
        .topbar-search-bar {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
          max-width: 320px;
        }

        .topbar-search-icon {
          position: absolute;
          left: 16px;
          color: var(--primary);
        }

        .topbar-search-input {
          width: 100%;
          height: 38px;
          background-color: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-full);
          padding-left: 42px;
          padding-right: 16px;
          color: var(--text-primary);
          font-size: 13px;
          box-shadow: 0 4px 10px rgba(255, 81, 0, 0.03);
          transition: all var(--transition-fast);
        }

        .topbar-search-input:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px var(--primary-glow), var(--shadow-glow);
        }

        .topbar-icon-btn {
          width: 38px;
          height: 38px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
          background-color: var(--bg-tertiary);
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
        }

        .topbar-icon-btn:hover {
          color: var(--primary-hover);
          border-color: var(--primary);
          background-color: var(--primary-glow);
        }

        .admin-profile-widget {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .admin-avatar-initials {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--primary), var(--accent));
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 13px;
        }

        .admin-details-texts {
          text-align: left;
          line-height: 1.2;
        }

        .admin-widget-name {
          font-weight: 700;
          font-size: 13px;
          color: var(--text-primary);
        }

        .admin-widget-email {
          font-size: 11px;
          color: var(--text-tertiary);
        }

        .logout-btn-hover:hover {
          color: var(--danger) !important;
          background-color: var(--danger-glow) !important;
        }
      `})]})},ov=()=>{const[e,t]=v.useState(""),[n,r]=v.useState(""),[s,l]=v.useState(!1),[i,o]=v.useState(!1),{login:c,isAuthenticated:u,loading:d}=Co(),h=Ta();v.useEffect(()=>{!d&&u&&h("/",{replace:!0})},[u,d,h]);const y=async j=>{if(j.preventDefault(),!e||!n)return;o(!0);const x=await c(e,n);o(!1),x&&x.success&&h("/")};return a.jsxs("div",{className:"split-login-container animate-fade",children:[a.jsxs("div",{className:"login-left-panel",children:[a.jsxs("div",{className:"left-panel-content",children:[a.jsx("h1",{children:"Welcome Back!"}),a.jsx("p",{children:"Verify your administrator credentials to securely log in to the enterprise dashboard management console."}),a.jsx("div",{className:"illustration-wrapper-box",children:a.jsx("img",{src:"/admin_login_illustration.png",alt:"Security Console Isometric Illustration",className:"isometric-security-img"})})]}),a.jsx("div",{className:"left-panel-circle-accent"})]}),a.jsx("div",{className:"login-right-panel",children:a.jsxs("div",{className:"right-panel-content",children:[a.jsxs("div",{className:"brand-logo-section",children:[a.jsxs("div",{className:"logo-brand-flex",children:[a.jsx("span",{className:"logo-icon-shield",children:"🛡️"}),a.jsx("span",{className:"brand-bold-text",children:"JobForge"}),a.jsx("span",{className:"logo-tag-badge",children:"Console"})]}),a.jsx("span",{className:"group-subtext",children:"Enterprise Recruitment System"})]}),a.jsx("h2",{className:"admin-login-title",children:"Admin Login"}),a.jsx("p",{className:"admin-login-subtitle",children:"Hello Admin, Sign-in to your Account and start managing"}),a.jsxs("form",{onSubmit:y,className:"admin-split-form",children:[a.jsxs("div",{className:"split-form-group",children:[a.jsx("label",{className:"split-form-label",htmlFor:"email",children:"Email / Username"}),a.jsx("div",{className:"split-input-wrapper",children:a.jsx("input",{id:"email",type:"email",placeholder:"admin@jobportal.com",className:"split-form-control",value:e,onChange:j=>t(j.target.value),required:!0,disabled:i})})]}),a.jsxs("div",{className:"split-form-group",children:[a.jsx("label",{className:"split-form-label",htmlFor:"password",children:"Password"}),a.jsxs("div",{className:"split-input-wrapper",children:[a.jsx("input",{id:"password",type:s?"text":"password",placeholder:"••••••••••••",className:"split-form-control",value:n,onChange:j=>r(j.target.value),required:!0,disabled:i}),a.jsx("button",{type:"button",className:"split-password-toggle",onClick:()=>l(!s),disabled:i,"aria-label":s?"Hide password":"Show password",children:s?a.jsx(tx,{size:18}):a.jsx(nx,{size:18})})]}),a.jsx("div",{className:"forgot-password-row",children:a.jsx("button",{type:"button",className:"forgot-password-btn-link",onClick:()=>alert("Please contact the database master administrator to manually override system credentials."),children:"Forgot Password?"})})]}),a.jsx("button",{type:"submit",className:"btn btn-split-primary",disabled:i,children:i?a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"spinner",style:{borderTopColor:"#ffffff"}}),a.jsx("span",{children:"Authenticating..."})]}):a.jsx("span",{children:"Login"})})]}),a.jsxs("div",{className:"split-login-footer",children:[a.jsx("span",{children:"Any trouble while logging please contact "}),a.jsx("a",{href:"mailto:support@jobforge.com",className:"footer-email-link",children:"support@jobforge.com"})]})]})}),a.jsx("style",{children:`
        .split-login-container {
          display: flex;
          min-height: 100vh;
          width: 100%;
          background-color: #ffffff;
          overflow: hidden;
        }

        /* Left Panel Styles */
        .login-left-panel {
          width: 42%;
          background-color: #ff5100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px;
          position: relative;
          color: #ffffff;
          overflow: hidden;
          box-shadow: 6px 0 30px rgba(0,0,0,0.06);
        }

        .left-panel-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          width: 100%;
          max-width: 440px;
        }

        .left-panel-content h1 {
          font-size: 36px;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 12px;
          font-family: var(--font-display);
        }

        .left-panel-content p {
          font-size: 14px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 32px;
        }

        .illustration-wrapper-box {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background-color: rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-lg);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.12);
        }

        .isometric-security-img {
          width: 100%;
          max-width: 320px;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 15px 25px rgba(0,0,0,0.12));
          animation: smoothFloat 5s ease-in-out infinite;
        }

        @keyframes smoothFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .left-panel-circle-accent {
          position: absolute;
          bottom: -10%;
          left: -10%;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.03);
          z-index: 1;
        }

        /* Right Panel Styles */
        .login-right-panel {
          width: 58%;
          background-color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px;
        }

        .right-panel-content {
          width: 100%;
          max-width: 440px;
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        /* Brand section */
        .brand-logo-section {
          margin-bottom: 40px;
        }

        .logo-brand-flex {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .logo-icon-shield {
          font-size: 28px;
        }

        .brand-bold-text {
          font-family: var(--font-display);
          font-size: 24px;
          font-weight: 800;
          color: #ff5100;
        }

        .logo-tag-badge {
          background-color: rgba(255, 81, 0, 0.1);
          border: 1px solid #ff5100;
          color: #ff5100;
          font-size: 10px;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: var(--radius-xs);
          text-transform: uppercase;
        }

        .group-subtext {
          font-size: 11px;
          font-weight: 700;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-top: 4px;
          display: block;
        }

        /* Headings */
        .admin-login-title {
          font-size: 32px;
          font-weight: 800;
          color: #1e293b;
          margin-bottom: 8px;
        }

        .admin-login-subtitle {
          font-size: 14px;
          color: #64748b;
          margin-bottom: 32px;
          font-weight: 500;
        }

        /* Forms inputs */
        .admin-split-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .split-form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .split-form-label {
          font-size: 13px;
          font-weight: 700;
          color: #475569;
          text-transform: uppercase;
        }

        .split-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .split-form-control {
          width: 100%;
          height: 48px;
          background-color: #ffffff;
          border: 1px solid #cbd5e1;
          color: #1e293b;
          border-radius: var(--radius-sm);
          padding: 0 16px;
          font-size: 15px;
          transition: all var(--transition-fast);
        }

        .split-form-control:focus {
          border-color: #ff5100;
          box-shadow: 0 0 0 3px rgba(255, 81, 0, 0.15);
        }

        .split-password-toggle {
          position: absolute;
          right: 16px;
          color: #64748b;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: color var(--transition-fast);
        }

        .split-password-toggle:hover {
          color: #ff5100;
        }

        .forgot-password-row {
          text-align: right;
          margin-top: 6px;
        }

        .forgot-password-btn-link {
          font-size: 13px;
          font-weight: 700;
          color: #ff5100;
          cursor: pointer;
          transition: opacity var(--transition-fast);
        }

        .forgot-password-btn-link:hover {
          text-decoration: underline;
        }

        /* Submit Button */
        .btn-split-primary {
          width: 100%;
          height: 48px;
          background-color: #ff5100;
          color: #ffffff;
          border-radius: var(--radius-sm);
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all var(--transition-normal);
          margin-top: 10px;
          box-shadow: 0 4px 12px rgba(255, 81, 0, 0.2);
        }

        .btn-split-primary:hover {
          background-color: #e04700;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(255, 81, 0, 0.35);
        }

        /* Footer */
        .split-login-footer {
          margin-top: 36px;
          text-align: center;
          font-size: 13px;
          color: #64748b;
          font-weight: 500;
        }

        .footer-email-link {
          color: #ff5100;
          font-weight: 700;
          transition: opacity var(--transition-fast);
        }

        .footer-email-link:hover {
          text-decoration: underline;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .login-left-panel {
            display: none;
          }
          
          .login-right-panel {
            width: 100%;
            padding: 24px;
          }
        }
      `})]})},cv=()=>{const[e,t]=v.useState(null),[n,r]=v.useState(!0),{showToast:s}=st();return v.useEffect(()=>{(async()=>{var i,o;try{const c=await $.get("/admin/stats");c.data.success&&t(c.data.data)}catch(c){s(((o=(i=c.response)==null?void 0:i.data)==null?void 0:o.message)||"Failed to load dashboard metrics.","error")}finally{r(!1)}})()},[s]),n?a.jsxs("div",{className:"dashboard-loading animate-fade",children:[a.jsx("div",{className:"stats-cards-row",children:[1,2,3,4].map(l=>a.jsx("div",{className:"stat-card glass-card shimmer-wrapper",style:{height:"110px",opacity:.6}},l))}),a.jsxs("div",{className:"dashboard-grid",children:[a.jsx("div",{className:"glass-card shimmer-wrapper",style:{height:"300px",opacity:.6}}),a.jsx("div",{className:"glass-card shimmer-wrapper",style:{height:"300px",opacity:.6}})]}),a.jsx("style",{children:`
          .dashboard-loading {
            padding: 8px 0;
          }
        `})]}):a.jsxs("div",{className:"dashboard-container animate-fade",children:[a.jsxs("div",{className:"welcome-banner glass-card",children:[a.jsxs("div",{className:"banner-content",children:[a.jsx("h2",{children:"Welcome back, Administrator"}),a.jsx("p",{children:"Here is your portal status snapshot. You have full access to manage job postings, company directories, applicant records, and user status."})]}),a.jsx("div",{className:"banner-visual",children:a.jsx(vo,{size:64,className:"shield-glow"})})]}),a.jsxs("div",{className:"stats-cards-row",children:[a.jsxs("div",{className:"stat-card-pastel pastel-blue",children:[a.jsx("span",{className:"stat-label-pastel",children:"Number of Students"}),a.jsx("span",{className:"stat-number-pastel",children:e!=null&&e.totalUsers?String(e.totalUsers).padStart(2,"0"):"00"})]}),a.jsxs("div",{className:"stat-card-pastel pastel-green",children:[a.jsx("span",{className:"stat-label-pastel",children:"Number of Companies"}),a.jsx("span",{className:"stat-number-pastel",children:e!=null&&e.totalCompanies?String(e.totalCompanies).padStart(2,"0"):"00"})]}),a.jsxs("div",{className:"stat-card-pastel pastel-purple",children:[a.jsx("span",{className:"stat-label-pastel",children:"Number of Active Jobs"}),a.jsx("span",{className:"stat-number-pastel",children:e!=null&&e.activeJobs?String(e.activeJobs).padStart(2,"0"):"00"})]}),a.jsxs("div",{className:"stat-card-pastel pastel-yellow",children:[a.jsx("span",{className:"stat-label-pastel",children:"Number of Applications"}),a.jsx("span",{className:"stat-number-pastel",children:e!=null&&e.totalApplications?String(e.totalApplications).padStart(2,"0"):"00"})]}),a.jsxs("div",{className:"stat-card-pastel pastel-orange",children:[a.jsx("span",{className:"stat-label-pastel",children:"Bookmarks Count"}),a.jsx("span",{className:"stat-number-pastel",children:e!=null&&e.totalSavedJobs?String(e.totalSavedJobs).padStart(2,"0"):"00"})]}),a.jsxs("div",{className:"stat-card-pastel pastel-pink",children:[a.jsx("span",{className:"stat-label-pastel",children:"Collaboration Messages"}),a.jsx("span",{className:"stat-number-pastel",children:e!=null&&e.totalMessages?String(e.totalMessages).padStart(2,"0"):"00"})]})]}),a.jsxs("div",{className:"dashboard-grid",children:[a.jsxs("div",{className:"dashboard-card glass-card",children:[a.jsx("div",{className:"card-header",children:a.jsx("h3",{children:"💼 Job Postings Ratio"})}),a.jsxs("div",{className:"card-body",children:[a.jsxs("div",{className:"ratio-diagram",children:[a.jsxs("div",{className:"ratio-bar",children:[a.jsx("div",{className:"bar-fill active-fill",style:{width:`${(e==null?void 0:e.totalJobs)>0?e.activeJobs/e.totalJobs*100:0}%`}}),a.jsx("div",{className:"bar-fill closed-fill",style:{width:`${(e==null?void 0:e.totalJobs)>0?e.closedJobs/e.totalJobs*100:0}%`}})]}),a.jsxs("div",{className:"ratio-legend",children:[a.jsxs("div",{className:"legend-item",children:[a.jsx("span",{className:"legend-dot dot-active"}),a.jsxs("span",{className:"legend-label",children:["Active Jobs (",(e==null?void 0:e.activeJobs)||0,")"]})]}),a.jsxs("div",{className:"legend-item",children:[a.jsx("span",{className:"legend-dot dot-closed"}),a.jsxs("span",{className:"legend-label",children:["Closed/Inactive (",(e==null?void 0:e.closedJobs)||0,")"]})]})]})]}),a.jsxs("div",{className:"shortcut-box",children:[a.jsx("p",{children:"Post new opportunities, modify existing positions, or review skills keywords metrics instantly."}),a.jsxs(fr,{to:"/jobs",className:"btn btn-primary btn-sm",children:[a.jsx("span",{children:"Manage Jobs"}),a.jsx(ws,{size:14})]})]})]})]}),a.jsxs("div",{className:"dashboard-card glass-card",children:[a.jsx("div",{className:"card-header",children:a.jsx("h3",{children:"⚡ Rapid Console Controls"})}),a.jsxs("div",{className:"card-body controls-list",children:[a.jsxs(fr,{to:"/companies",className:"control-row-item",children:[a.jsx("div",{className:"control-icon icon-pink",children:a.jsx(Br,{size:16})}),a.jsxs("div",{className:"control-desc",children:[a.jsx("h4",{children:"Company Database"}),a.jsx("p",{children:"Register new hiring partners and upload company logos."})]}),a.jsx(ws,{size:16,className:"arrow-hover"})]}),a.jsxs(fr,{to:"/users",className:"control-row-item",children:[a.jsx("div",{className:"control-icon icon-purple",children:a.jsx(Ff,{size:16})}),a.jsxs("div",{className:"control-desc",children:[a.jsx("h4",{children:"Auditing User Directory"}),a.jsx("p",{children:"Monitor user registrations and block suspicious accounts."})]}),a.jsx(ws,{size:16,className:"arrow-hover"})]}),a.jsxs(fr,{to:"/applications",className:"control-row-item",children:[a.jsx("div",{className:"control-icon icon-blue",children:a.jsx(ua,{size:16})}),a.jsxs("div",{className:"control-desc",children:[a.jsx("h4",{children:"Applications Workflow"}),a.jsx("p",{children:"Evaluate resume uploads and update applicant pipeline states."})]}),a.jsx(ws,{size:16,className:"arrow-hover"})]})]})]}),a.jsxs("div",{className:"dashboard-card glass-card",children:[a.jsx("div",{className:"card-header",children:a.jsx("h3",{children:"⭐ Bookmark & Saved Jobs Analytics"})}),a.jsxs("div",{className:"card-body",style:{display:"flex",flexDirection:"column",gap:"20px"},children:[a.jsxs("div",{children:[a.jsxs("h4",{style:{fontSize:"14px",fontWeight:"800",marginBottom:"12px",display:"flex",alignItems:"center",gap:"6px",color:"var(--text-primary)",borderBottom:"1px solid var(--border-color)",paddingBottom:"6px"},children:[a.jsx(yo,{size:16})," Most Saved Jobs"]}),e!=null&&e.mostSavedJobs&&e.mostSavedJobs.length>0?a.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:e.mostSavedJobs.map((l,i)=>a.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"13px",background:"var(--bg-tertiary)",padding:"8px 12px",borderRadius:"4px"},children:[a.jsx("span",{style:{fontWeight:600},children:l.title}),a.jsxs("span",{style:{background:"var(--primary-glow)",color:"var(--primary)",padding:"2px 8px",borderRadius:"10px",fontSize:"11px",fontWeight:800},children:[l.count," saves"]})]},i))}):a.jsx("p",{style:{fontSize:"13px",color:"var(--text-tertiary)"},children:"No jobs have been bookmarked yet."})]}),a.jsxs("div",{children:[a.jsxs("h4",{style:{fontSize:"14px",fontWeight:"800",marginBottom:"12px",display:"flex",alignItems:"center",gap:"6px",color:"var(--text-primary)",borderBottom:"1px solid var(--border-color)",paddingBottom:"6px"},children:[a.jsx(Br,{size:16})," Most Saved Companies"]}),e!=null&&e.mostSavedCompanies&&e.mostSavedCompanies.length>0?a.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:e.mostSavedCompanies.map((l,i)=>a.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"13px",background:"var(--bg-tertiary)",padding:"8px 12px",borderRadius:"4px"},children:[a.jsx("span",{style:{fontWeight:600},children:l.name}),a.jsxs("span",{style:{background:"rgba(99, 102, 241, 0.15)",color:"var(--accent)",padding:"2px 8px",borderRadius:"10px",fontSize:"11px",fontWeight:800},children:[l.count," saves"]})]},i))}):a.jsx("p",{style:{fontSize:"13px",color:"var(--text-tertiary)"},children:"No companies have bookmarks yet."})]})]})]}),a.jsxs("div",{className:"dashboard-card glass-card",style:{gridColumn:"span 2"},children:[a.jsx("div",{className:"card-header",children:a.jsx("h3",{children:"📈 Monthly Candidate Applications Trends"})}),a.jsxs("div",{className:"card-body",style:{padding:"24px 32px"},children:[a.jsx("div",{className:"chart-wrapper",style:{position:"relative",height:"240px",width:"100%"},children:a.jsxs("svg",{viewBox:"0 0 500 200",width:"100%",height:"100%",preserveAspectRatio:"none",children:[a.jsx("line",{x1:"40",y1:"20",x2:"480",y2:"20",stroke:"var(--border-color)",strokeWidth:"0.5",strokeDasharray:"3"}),a.jsx("line",{x1:"40",y1:"60",x2:"480",y2:"60",stroke:"var(--border-color)",strokeWidth:"0.5",strokeDasharray:"3"}),a.jsx("line",{x1:"40",y1:"100",x2:"480",y2:"100",stroke:"var(--border-color)",strokeWidth:"0.5",strokeDasharray:"3"}),a.jsx("line",{x1:"40",y1:"140",x2:"480",y2:"140",stroke:"var(--border-color)",strokeWidth:"0.5",strokeDasharray:"3"}),a.jsx("line",{x1:"40",y1:"170",x2:"480",y2:"170",stroke:"var(--border-color)",strokeWidth:"1"}),a.jsx("defs",{children:a.jsxs("linearGradient",{id:"area-gradient",x1:"0",y1:"0",x2:"0",y2:"1",children:[a.jsx("stop",{offset:"0%",stopColor:"var(--primary)",stopOpacity:"0.4"}),a.jsx("stop",{offset:"100%",stopColor:"var(--primary)",stopOpacity:"0"})]})}),a.jsx("path",{d:"M 40 170 L 40 130 L 113 110 L 186 140 L 259 80 L 332 90 L 405 50 L 480 40 L 480 170 Z",fill:"url(#area-gradient)"}),a.jsx("path",{d:"M 40 130 L 113 110 L 186 140 L 259 80 L 332 90 L 405 50 L 480 40",fill:"none",stroke:"var(--primary)",strokeWidth:"3.5",strokeLinecap:"round",strokeLinejoin:"round"}),a.jsx("circle",{cx:"40",cy:"130",r:"5",fill:"var(--bg-secondary)",stroke:"var(--primary)",strokeWidth:"2.5"}),a.jsx("circle",{cx:"113",cy:"110",r:"5",fill:"var(--bg-secondary)",stroke:"var(--primary)",strokeWidth:"2.5"}),a.jsx("circle",{cx:"186",cy:"140",r:"5",fill:"var(--bg-secondary)",stroke:"var(--primary)",strokeWidth:"2.5"}),a.jsx("circle",{cx:"259",cy:"80",r:"5",fill:"var(--bg-secondary)",stroke:"var(--primary)",strokeWidth:"2.5"}),a.jsx("circle",{cx:"332",cy:"90",r:"5",fill:"var(--bg-secondary)",stroke:"var(--primary)",strokeWidth:"2.5"}),a.jsx("circle",{cx:"405",cy:"50",r:"5",fill:"var(--bg-secondary)",stroke:"var(--primary)",strokeWidth:"2.5"}),a.jsx("circle",{cx:"480",cy:"40",r:"5",fill:"var(--bg-secondary)",stroke:"var(--primary)",strokeWidth:"2.5"})]})}),a.jsxs("div",{className:"chart-x-labels",style:{display:"flex",justifyContent:"space-between",paddingLeft:"40px",fontSize:"11px",fontWeight:"bold",color:"var(--text-tertiary)",marginTop:"8px"},children:[a.jsx("span",{children:"Jan"}),a.jsx("span",{children:"Feb"}),a.jsx("span",{children:"Mar"}),a.jsx("span",{children:"Apr"}),a.jsx("span",{children:"May"}),a.jsx("span",{children:"Jun"}),a.jsx("span",{children:"Jul"})]})]})]})]}),a.jsx("style",{children:`
        .dashboard-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .welcome-banner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 32px;
          background: linear-gradient(135deg, var(--bg-secondary), var(--bg-tertiary));
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
        }

        .banner-content h2 {
          font-size: 24px;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .banner-content p {
          font-size: 14px;
          color: var(--text-secondary);
          max-width: 650px;
          line-height: 1.6;
        }

        .banner-visual {
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 16px;
        }

        .shield-glow {
          filter: drop-shadow(0 0 15px var(--primary-glow));
          animation: float 4s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 24px;
        }

        .dashboard-card {
          background-color: var(--bg-secondary);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          overflow: hidden;
        }

        .card-header {
          padding: 20px 24px;
          border-bottom: 1px solid var(--border-color);
          background-color: var(--bg-tertiary);
        }

        .card-header h3 {
          font-size: 16px;
          font-weight: 700;
        }

        .card-body {
          padding: 24px;
        }

        /* Ratio bar styles */
        .ratio-diagram {
          margin-bottom: 24px;
        }

        .ratio-bar {
          display: flex;
          height: 16px;
          background-color: var(--bg-tertiary);
          border-radius: var(--radius-full);
          overflow: hidden;
          margin-bottom: 16px;
          border: 1px solid var(--border-color);
        }

        .bar-fill {
          height: 100%;
          transition: width var(--transition-normal);
        }

        .active-fill {
          background: linear-gradient(90deg, var(--primary), var(--accent));
        }

        .closed-fill {
          background-color: var(--text-tertiary);
          opacity: 0.5;
        }

        .ratio-legend {
          display: flex;
          gap: 20px;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .legend-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .dot-active {
          background-color: var(--primary);
        }

        .dot-closed {
          background-color: var(--text-tertiary);
        }

        .legend-label {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .shortcut-box {
          border-top: 1px solid var(--border-color);
          padding-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: flex-start;
        }

        .shortcut-box p {
          font-size: 13px;
          color: var(--text-tertiary);
          line-height: 1.5;
        }

        .btn-sm {
          padding: 6px 14px;
          font-size: 13px;
          border-radius: var(--radius-xs);
        }

        /* Controls Panel */
        .controls-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .control-row-item {
          display: flex;
          align-items: center;
          padding: 16px;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
          cursor: pointer;
        }

        .control-row-item:hover {
          background-color: var(--bg-tertiary);
          border-color: var(--primary-glow);
          transform: translateX(4px);
        }

        .control-icon {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-xs);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 16px;
          flex-shrink: 0;
        }

        .control-desc {
          flex-grow: 1;
          text-align: left;
        }

        .control-desc h4 {
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 2px;
          color: var(--text-primary);
        }

        .control-desc p {
          font-size: 12px;
          color: var(--text-tertiary);
        }

        .arrow-hover {
          color: var(--text-tertiary);
          transition: transform var(--transition-fast), color var(--transition-fast);
        }

        .control-row-item:hover .arrow-hover {
          color: var(--primary);
          transform: translateX(3px);
        }

        /* Pastel Stats Cards overrides */
        .stats-cards-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 24px;
          margin-bottom: 32px;
        }

        .stat-card-pastel {
          padding: 24px 28px;
          border-radius: var(--radius-sm);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          box-shadow: 0 4px 15px rgba(0,0,0,0.02);
          border: none !important;
          transition: transform var(--transition-normal), box-shadow var(--transition-normal);
        }

        .stat-card-pastel:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-lg);
        }

        .pastel-blue { background-color: #c2d7ff !important; color: #000000 !important; }
        .pastel-green { background-color: #a8ffa8 !important; color: #000000 !important; }
        .pastel-purple { background-color: #ffc2ff !important; color: #000000 !important; }
        .pastel-yellow { background-color: #fff6c2 !important; color: #000000 !important; }
        .pastel-orange { background-color: #ffd6b3 !important; color: #000000 !important; }
        .pastel-pink { background-color: #ffd2d2 !important; color: #000000 !important; }

        .stat-label-pastel {
          font-size: 15px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 12px;
        }

        .stat-number-pastel {
          font-family: var(--font-sans);
          font-size: 54px;
          font-weight: 800;
          color: #000000 !important;
          line-height: 1;
        }

        @media (max-width: 900px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }
      `})]})},uv=()=>{const[e,t]=v.useState([]),[n,r]=v.useState([]),[s,l]=v.useState([]),[i,o]=v.useState(""),[c,u]=v.useState("all"),[d,h]=v.useState(!0),[y,j]=v.useState(!1),{showToast:x}=st(),[m,w]=v.useState(!1),[f,p]=v.useState("create"),[g,b]=v.useState(null),[E,P]=v.useState(!1),[_,C]=v.useState({title:"",description:"",company_id:"",salary_min:"",salary_max:"",job_type:"Full-time",location:"On-site",experience:"Entry Level",skills:[],status:"active"}),I=async(S=!1)=>{S||h(!0);try{const T=await $.get("/jobs",{params:{search:i||void 0,status:c,limit:100}});T.data.success&&t(T.data.data)}catch{x("Failed to retrieve job directory.","error")}finally{h(!1),j(!1)}},L=async()=>{try{const[S,T]=await Promise.all([$.get("/companies"),$.get("/jobs/skills")]);S.data.success?r(S.data.data):r(S.data),T.data.success&&l(T.data.data)}catch{x("Failed to retrieve companies or skills helper lists.","warning")}};v.useEffect(()=>{const S=setTimeout(()=>{I()},450);return()=>clearTimeout(S)},[i,c]),v.useEffect(()=>{L()},[]);const N=()=>{var S;if(n.length===0){x("Please register at least one company before creating jobs.","warning");return}p("create"),C({title:"",description:"",company_id:((S=n[0])==null?void 0:S.id)||"",salary_min:"",salary_max:"",job_type:"Full-time",location:"On-site",experience:"Entry Level",skills:[],status:"active"}),w(!0)},D=S=>{p("edit"),b(S);const T=Array.isArray(S.skills)?S.skills.map(B=>B.id):[];C({title:S.title||"",description:S.description||"",company_id:S.company_id||"",salary_min:S.salary_min||"",salary_max:S.salary_max||"",job_type:S.job_type||"Full-time",location:S.location||"On-site",experience:S.experience||"Entry Level",skills:T,status:S.status||"active"}),w(!0)},U=S=>{const{name:T,value:B}=S.target;C(H=>({...H,[T]:B}))},M=S=>{C(T=>{const H=T.skills.includes(S)?T.skills.filter(Y=>Y!==S):[...T.skills,S];return{...T,skills:H}})},ke=async S=>{const T=S.status==="active"?"inactive":"active";try{(await $.put(`/jobs/${S.id}`,{status:T})).data.success&&(x(`Job status updated to ${T}.`,"success"),t(e.map(H=>H.id===S.id?{...H,status:T}:H)))}catch{x("Failed to update job status.","error")}},F=async S=>{var T,B;if(S.preventDefault(),!_.title||!_.company_id||!_.salary_min||!_.salary_max){x("All fields marked * are required.","warning");return}if(parseInt(_.salary_min)>parseInt(_.salary_max)){x("Minimum salary cannot exceed maximum salary.","warning");return}P(!0);try{let H;f==="create"?(H=await $.post("/jobs",_),H.data.success&&(x("Job posting published successfully.","success"),w(!1),I(!0))):(H=await $.put(`/jobs/${g.id}`,_),H.data.success&&(x("Job posting modified successfully.","success"),w(!1),I(!0)))}catch(H){x(((B=(T=H.response)==null?void 0:T.data)==null?void 0:B.message)||"Failed to save job details.","error")}finally{P(!1)}},q=async S=>{if(window.confirm("Are you absolutely sure you want to permanently delete this job posting? This action cannot be undone."))try{(await $.delete(`/jobs/${S}`)).data.success&&(x("Job posting permanently deleted.","success"),t(e.filter(B=>B.id!==S)))}catch{x("Failed to delete job posting.","error")}},z=()=>{j(!0),I(!0)};return a.jsxs("div",{className:"job-management-container animate-fade",children:[a.jsxs("div",{className:"management-header",children:[a.jsxs("div",{className:"header-info",children:[a.jsx("h2",{children:"💼 Opportunities & Job Postings"}),a.jsx("p",{children:"Create career opportunities, publish job descriptions, manage skill tags, and audit recruiter requirements."})]}),a.jsxs("div",{className:"header-actions",children:[a.jsx("button",{className:"btn btn-secondary btn-refresh",onClick:z,disabled:y||d,children:a.jsx(Nt,{size:16,className:y?"spin-animation":""})}),a.jsxs("button",{className:"btn btn-primary",onClick:N,children:[a.jsx(Kr,{size:18}),a.jsx("span",{children:"Publish Job Listing"})]})]})]}),a.jsxs("div",{className:"filter-search-card glass-card",children:[a.jsxs("div",{className:"search-box",children:[a.jsx(ft,{size:18,className:"search-icon"}),a.jsx("input",{type:"text",placeholder:"Search jobs by title, company name, skills or keywords...",value:i,onChange:S=>o(S.target.value)})]}),a.jsxs("div",{className:"filter-box",children:[a.jsx("label",{htmlFor:"status-select",children:"Status Filter:"}),a.jsxs("select",{id:"status-select",className:"filter-select",value:c,onChange:S=>u(S.target.value),children:[a.jsx("option",{value:"all",children:"All Statuses"}),a.jsx("option",{value:"active",children:"Active Postings"}),a.jsx("option",{value:"inactive",children:"Closed / Inactive"})]})]})]}),d?a.jsx("div",{className:"directory-skeleton",children:a.jsxs("div",{className:"table-responsive-wrapper",children:[a.jsx("div",{className:"skeleton-header shimmer-wrapper"}),[1,2,3,4,5].map(S=>a.jsx("div",{className:"skeleton-row shimmer-wrapper"},S))]})}):e.length===0?a.jsxs("div",{className:"empty-state glass-card",children:[a.jsx(yo,{size:48,className:"warning-icon"}),a.jsx("h3",{children:"No Job Postings Found"}),a.jsx("p",{children:'No job records match your current directory configurations. Click "Publish Job Listing" to create one.'})]}):a.jsx("div",{className:"table-responsive-wrapper glass-card",children:a.jsxs("table",{className:"admin-data-table",children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{children:"Job Title & Company"}),a.jsx("th",{children:"Job Details"}),a.jsx("th",{children:"Salary Range"}),a.jsx("th",{children:"Required Skill Tags"}),a.jsx("th",{children:"Posting Status"}),a.jsx("th",{children:"Date Published"}),a.jsx("th",{children:"Action Controls"})]})}),a.jsx("tbody",{children:e.map(S=>{var T,B;return a.jsxs("tr",{children:[a.jsx("td",{children:a.jsxs("div",{className:"job-title-cell",children:[a.jsxs("div",{className:"company-logo-badge",children:[S.company_logo?a.jsx("img",{src:`http://localhost:5000/uploads/images/${S.company_logo}`,alt:"",className:"company-logo-mini",onError:H=>{H.target.style.display="none",H.target.nextSibling.style.display="flex"}}):null,a.jsx("div",{className:"company-logo-placeholder-mini",children:S.company_name?S.company_name[0]:"J"})]}),a.jsxs("div",{className:"job-name-wrap",children:[a.jsx("span",{className:"job-fullname-text",children:S.title}),a.jsx("span",{className:"job-company-subtitle",children:S.company_name})]})]})}),a.jsx("td",{children:a.jsxs("div",{className:"job-details-stacked",children:[a.jsx("span",{className:"job-pill-desc",children:S.job_type}),a.jsx("span",{className:"job-pill-desc",children:S.location}),a.jsx("span",{className:"job-pill-desc",children:S.experience})]})}),a.jsx("td",{children:a.jsxs("span",{className:"salary-range-text",children:["₹",(T=S.salary_min)==null?void 0:T.toLocaleString("en-IN")," - ₹",(B=S.salary_max)==null?void 0:B.toLocaleString("en-IN")]})}),a.jsx("td",{children:a.jsx("div",{className:"table-skills-list",children:Array.isArray(S.skills)&&S.skills.length>0?S.skills.map((H,Y)=>a.jsx("span",{className:"skill-item-pill",children:H.name},Y)):a.jsx("span",{className:"text-muted",style:{fontSize:"12px"},children:"None required"})})}),a.jsx("td",{children:a.jsx("span",{className:`status-pill clickable-pill ${S.status==="active"?"pill-active":"pill-inactive"}`,onClick:()=>ke(S),title:"Click to toggle status",children:S.status})}),a.jsx("td",{children:a.jsx("span",{className:"date-published-text",children:new Date(S.created_at).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"})})}),a.jsx("td",{children:a.jsxs("div",{className:"btn-actions-row",children:[a.jsx("button",{className:"btn-icon-action",title:"Edit Job",onClick:()=>D(S),children:a.jsx(Xn,{size:15})}),a.jsx("button",{className:"btn-icon-action btn-icon-danger",title:"Delete Job",onClick:()=>q(S.id),children:a.jsx(un,{size:15})})]})})]},S.id)})})]})}),m&&a.jsx("div",{className:"modal-backdrop animate-fade",children:a.jsxs("div",{className:"modal-content glass-card animate-slide-up",style:{maxWidth:"800px"},children:[a.jsxs("div",{className:"modal-header",children:[a.jsx("h3",{children:f==="create"?"💼 Publish Career Opportunity":"✏️ Modify Job Listing"}),a.jsx("button",{className:"btn-close",onClick:()=>w(!1),children:a.jsx(Ct,{size:20})})]}),a.jsxs("form",{onSubmit:F,className:"modal-form-scrollable",children:[a.jsxs("div",{className:"modal-form-grid",style:{gridTemplateColumns:"1fr 1fr 1fr"},children:[a.jsxs("div",{className:"form-group",style:{gridColumn:"span 2"},children:[a.jsx("label",{className:"form-label",htmlFor:"job-title",children:"Job Title *"}),a.jsx("input",{id:"job-title",type:"text",name:"title",className:"form-control",placeholder:"e.g. Lead React Developer",value:_.title,onChange:U,required:!0})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",htmlFor:"company-select",children:"Hiring Company *"}),a.jsx("select",{id:"company-select",name:"company_id",className:"form-control",value:_.company_id,onChange:U,required:!0,children:n.map(S=>a.jsx("option",{value:S.id,children:S.name},S.id))})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",htmlFor:"job-type",children:"Employment Type"}),a.jsxs("select",{id:"job-type",name:"job_type",className:"form-control",value:_.job_type,onChange:U,children:[a.jsx("option",{value:"Full-time",children:"Full-time"}),a.jsx("option",{value:"Part-time",children:"Part-time"}),a.jsx("option",{value:"Contract",children:"Contract"}),a.jsx("option",{value:"Internship",children:"Internship"})]})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",htmlFor:"job-location",children:"Location Type"}),a.jsxs("select",{id:"job-location",name:"location",className:"form-control",value:_.location,onChange:U,children:[a.jsx("option",{value:"On-site",children:"On-site"}),a.jsx("option",{value:"Remote",children:"Remote"}),a.jsx("option",{value:"Hybrid",children:"Hybrid"})]})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",htmlFor:"job-experience",children:"Experience Level"}),a.jsxs("select",{id:"job-experience",name:"experience",className:"form-control",value:_.experience,onChange:U,children:[a.jsx("option",{value:"Entry Level",children:"Entry Level"}),a.jsx("option",{value:"Mid Level",children:"Mid Level"}),a.jsx("option",{value:"Senior Level",children:"Senior Level"}),a.jsx("option",{value:"Lead / Executive",children:"Lead / Executive"})]})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",htmlFor:"salary-min",children:"Salary Min (₹ INR) *"}),a.jsx("input",{id:"salary-min",type:"number",name:"salary_min",className:"form-control",placeholder:"e.g. 80000",value:_.salary_min,onChange:U,required:!0})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",htmlFor:"salary-max",children:"Salary Max (₹ INR) *"}),a.jsx("input",{id:"salary-max",type:"number",name:"salary_max",className:"form-control",placeholder:"e.g. 120000",value:_.salary_max,onChange:U,required:!0})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",htmlFor:"job-status",children:"Listing Status"}),a.jsxs("select",{id:"job-status",name:"status",className:"form-control",value:_.status,onChange:U,children:[a.jsx("option",{value:"active",children:"Active / Open"}),a.jsx("option",{value:"inactive",children:"Inactive / Closed"})]})]}),a.jsxs("div",{className:"form-group full-width-field",style:{gridColumn:"span 3"},children:[a.jsx("label",{className:"form-label",htmlFor:"job-description",children:"Job Roles, Requirements & Description *"}),a.jsx("textarea",{id:"job-description",name:"description",className:"form-control form-textarea",placeholder:"Provide a comprehensive job description. Outline target responsibilities, expectations, and credentials required...",value:_.description,onChange:U,rows:6,required:!0})]}),a.jsxs("div",{className:"form-group full-width-field",style:{gridColumn:"span 3"},children:[a.jsxs("label",{className:"form-label",style:{display:"flex",alignItems:"center",gap:"6px"},children:[a.jsx(dx,{size:14}),a.jsx("span",{children:"Associate Required Technical Skills"})]}),a.jsx("p",{className:"skills-subtitle",children:"Select the technology credentials applicants should have for automatic matching index scores."}),a.jsx("div",{className:"skills-checkbox-grid",children:s.map(S=>{const T=_.skills.includes(S.id);return a.jsx("div",{className:`skill-checkbox-card ${T?"skill-card-checked":""}`,onClick:()=>M(S.id),children:a.jsx("span",{className:"skill-card-name",children:S.name})},S.id)})})]})]}),a.jsxs("div",{className:"modal-footer",children:[a.jsx("button",{type:"button",className:"btn btn-secondary",onClick:()=>w(!1),disabled:E,children:"Cancel"}),a.jsx("button",{type:"submit",className:"btn btn-primary",disabled:E,children:E?a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"spinner",style:{borderTopColor:"#ffffff"}}),a.jsx("span",{children:"Publishing Posting..."})]}):a.jsx("span",{children:"Save Job Posting"})})]})]})]})}),a.jsx("style",{children:`
        .job-management-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .management-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }

        .header-actions {
          display: flex;
          gap: 12px;
        }

        .header-info h2 {
          font-size: 24px;
          font-weight: 800;
        }

        .header-info p {
          font-size: 14px;
          color: var(--text-secondary);
          margin-top: 4px;
        }

        .filter-search-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          padding: 16px 24px;
          background-color: var(--bg-secondary);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
        }

        .search-box {
          position: relative;
          display: flex;
          align-items: center;
          flex-grow: 1;
          max-width: 600px;
        }

        .search-icon {
          position: absolute;
          left: 14px;
          color: var(--text-tertiary);
        }

        .search-box input {
          width: 100%;
          height: 42px;
          background-color: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding-left: 44px;
          padding-right: 16px;
          color: var(--text-primary);
          transition: border-color var(--transition-fast);
        }

        .search-box input:focus {
          border-color: var(--primary);
        }

        .filter-box {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .filter-box label {
          font-size: 13px;
          font-weight: 700;
          color: var(--text-secondary);
          text-transform: uppercase;
        }

        .filter-select {
          height: 42px;
          padding: 0 16px;
          background-color: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          font-weight: 600;
          cursor: pointer;
        }

        /* Cells custom layout */
        .job-title-cell {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .company-logo-badge {
          position: relative;
          width: 36px;
          height: 36px;
          flex-shrink: 0;
        }

        .company-logo-mini {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-xs);
          object-fit: contain;
          background-color: #ffffff;
          padding: 2px;
          border: 1px solid var(--border-color);
        }

        .company-logo-placeholder-mini {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-xs);
          background-color: var(--bg-tertiary);
          color: var(--text-tertiary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 14px;
          text-transform: uppercase;
          border: 1px solid var(--border-color);
        }

        .job-name-wrap {
          display: flex;
          flex-direction: column;
        }

        .job-fullname-text {
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.2;
        }

        .job-company-subtitle {
          font-size: 12px;
          color: var(--text-tertiary);
          font-weight: 600;
          margin-top: 2px;
        }

        .job-details-stacked {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }

        .job-pill-desc {
          font-size: 11px;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: var(--radius-xs);
          background-color: var(--bg-tertiary);
          color: var(--text-secondary);
          border: 1px solid var(--border-color);
        }

        .salary-range-text {
          font-weight: 700;
          color: var(--text-primary);
          font-family: var(--font-display);
        }

        .table-skills-list {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          max-width: 200px;
        }

        .skill-item-pill {
          font-size: 10px;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: var(--radius-full);
          background-color: var(--primary-glow);
          color: var(--primary);
          border: 1px solid var(--primary);
          text-transform: uppercase;
        }

        .clickable-pill {
          cursor: pointer;
          transition: transform var(--transition-fast);
        }

        .clickable-pill:hover {
          transform: scale(1.05);
        }

        /* Skills checkbox grid */
        .skills-subtitle {
          font-size: 12px;
          color: var(--text-tertiary);
          margin-bottom: 12px;
        }

        .skills-checkbox-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
          gap: 10px;
          max-height: 160px;
          overflow-y: auto;
          padding: 8px;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          background-color: var(--bg-tertiary);
        }

        .skill-checkbox-card {
          padding: 8px 12px;
          border-radius: var(--radius-xs);
          border: 1px solid var(--border-color);
          background-color: var(--bg-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast);
          user-select: none;
        }

        .skill-checkbox-card:hover {
          border-color: var(--primary);
          transform: translateY(-1px);
        }

        .skill-card-checked {
          background-color: var(--primary-glow) !important;
          border-color: var(--primary) !important;
        }

        .skill-card-checked .skill-card-name {
          color: var(--primary);
          font-weight: 700;
        }

        .skill-card-name {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-secondary);
          text-align: center;
          text-transform: uppercase;
        }
      `})]})},dv=()=>{const[e,t]=v.useState([]),[n,r]=v.useState(""),[s,l]=v.useState(!0),[i,o]=v.useState(!1),{showToast:c}=st(),[u,d]=v.useState(!1),[h,y]=v.useState("create"),[j,x]=v.useState(null),[m,w]=v.useState(!1),[f,p]=v.useState({name:"",industry:"",website:"",location:"",description:""}),[g,b]=v.useState(null),[E,P]=v.useState(null),_=v.useRef(null),C=async(F=!1)=>{F||l(!0);try{const q=await $.get("/companies",{params:{search:n||void 0}});q.data.success?t(q.data.data):t(q.data)}catch{c("Failed to retrieve companies.","error")}finally{l(!1),o(!1)}};v.useEffect(()=>{const F=setTimeout(()=>{C()},450);return()=>clearTimeout(F)},[n]);const I=()=>{y("create"),p({name:"",industry:"",website:"",location:"",description:""}),b(null),P(null),d(!0)},L=F=>{y("edit"),x(F),p({name:F.name||"",industry:F.industry||"",website:F.website||"",location:F.location||"",description:F.description||""}),b(null),P(F.logo?`http://localhost:5000/uploads/images/${F.logo}`:null),d(!0)},N=F=>{const q=F.target.files[0];if(q){if(q.size>2*1024*1024){c("Logo must be less than 2MB.","warning");return}b(q);const z=new FileReader;z.onloadend=()=>{P(z.result)},z.readAsDataURL(q)}},D=F=>{const{name:q,value:z}=F.target;p(S=>({...S,[q]:z}))},U=async F=>{var z,S;if(F.preventDefault(),!f.name){c("Company Name is required.","warning");return}w(!0);const q=new FormData;q.append("name",f.name),q.append("industry",f.industry),q.append("website",f.website),q.append("location",f.location),q.append("description",f.description),g&&q.append("logo",g);try{let T;h==="create"?(T=await $.post("/companies",q,{headers:{"Content-Type":"multipart/form-data"}}),T.data.success&&(c("Company registered successfully.","success"),d(!1),C(!0))):(T=await $.put(`/companies/${j.id}`,q,{headers:{"Content-Type":"multipart/form-data"}}),T.data.success&&(c("Company details updated.","success"),d(!1),C(!0)))}catch(T){c(((S=(z=T.response)==null?void 0:z.data)==null?void 0:S.message)||"Failed to save company information.","error")}finally{w(!1)}},M=async F=>{var q,z;if(window.confirm("Are you absolutely sure you want to delete this company? All associated job listings will be deleted as well."))try{(await $.delete(`/companies/${F}`)).data.success&&(c("Company deleted successfully.","success"),t(e.filter(T=>T.id!==F)))}catch(S){c(((z=(q=S.response)==null?void 0:q.data)==null?void 0:z.message)||"Failed to delete company.","error")}},ke=()=>{o(!0),C(!0)};return a.jsxs("div",{className:"company-management-container animate-fade",children:[a.jsxs("div",{className:"management-header",children:[a.jsxs("div",{className:"header-info",children:[a.jsx("h2",{children:"🏢 Partner Companies Directory"}),a.jsx("p",{children:"Register new corporate partners, upload branding, edit corporate bios, and manage hiring company profiles."})]}),a.jsxs("div",{className:"header-actions",children:[a.jsx("button",{className:"btn btn-secondary btn-refresh",onClick:ke,disabled:i||s,children:a.jsx(Nt,{size:16,className:i?"spin-animation":""})}),a.jsxs("button",{className:"btn btn-primary",onClick:I,children:[a.jsx(Kr,{size:18}),a.jsx("span",{children:"Register Company"})]})]})]}),a.jsx("div",{className:"filter-search-card glass-card",children:a.jsxs("div",{className:"search-box",children:[a.jsx(ft,{size:18,className:"search-icon"}),a.jsx("input",{type:"text",placeholder:"Search companies by name, location or industry...",value:n,onChange:F=>r(F.target.value)})]})}),s?a.jsx("div",{className:"directory-skeleton",children:a.jsxs("div",{className:"table-responsive-wrapper",children:[a.jsx("div",{className:"skeleton-header shimmer-wrapper"}),[1,2,3,4].map(F=>a.jsx("div",{className:"skeleton-row shimmer-wrapper"},F))]})}):e.length===0?a.jsxs("div",{className:"empty-state glass-card",children:[a.jsx(dl,{size:48,className:"warning-icon"}),a.jsx("h3",{children:"No Companies Registered"}),a.jsx("p",{children:'No partner companies matched your database query. Click "Register Company" above to add one.'})]}):a.jsx("div",{className:"table-responsive-wrapper glass-card",children:a.jsxs("table",{className:"admin-data-table",children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{children:"Company Name & Logo"}),a.jsx("th",{children:"Industry Segment"}),a.jsx("th",{children:"Website URL"}),a.jsx("th",{children:"Global Location"}),a.jsx("th",{children:"Company Bio Description"}),a.jsx("th",{children:"Control Actions"})]})}),a.jsx("tbody",{children:e.map(F=>a.jsxs("tr",{children:[a.jsx("td",{children:a.jsxs("div",{className:"company-logo-cell",children:[F.logo?a.jsx("img",{src:`http://localhost:5000/uploads/images/${F.logo}`,alt:"",className:"company-logo-img",onError:q=>{q.target.style.display="none",q.target.nextSibling.style.display="flex"}}):null,a.jsx("div",{className:"company-logo-placeholder",children:a.jsx(dl,{size:16})}),a.jsx("span",{className:"company-name-span",children:F.name})]})}),a.jsx("td",{children:a.jsx("span",{className:"company-industry-span",children:F.industry||"—"})}),a.jsx("td",{children:F.website?a.jsxs("a",{href:F.website.startsWith("http")?F.website:`https://${F.website}`,target:"_blank",rel:"noopener noreferrer",className:"company-link-web",children:[a.jsx(rx,{size:14}),a.jsx("span",{children:"Visit Site"})]}):a.jsx("span",{className:"text-muted",children:"—"})}),a.jsx("td",{children:a.jsxs("div",{className:"location-cell",children:[a.jsx(Hr,{size:14}),a.jsx("span",{children:F.location||"—"})]})}),a.jsx("td",{children:a.jsx("p",{className:"company-desc-trunc",title:F.description,children:F.description||"No description provided."})}),a.jsx("td",{children:a.jsxs("div",{className:"btn-actions-row",children:[a.jsx("button",{className:"btn-icon-action",title:"Edit Details",onClick:()=>L(F),children:a.jsx(Xn,{size:15})}),a.jsx("button",{className:"btn-icon-action btn-icon-danger",title:"Delete Partner",onClick:()=>M(F.id),children:a.jsx(un,{size:15})})]})})]},F.id))})]})}),u&&a.jsx("div",{className:"modal-backdrop animate-fade",children:a.jsxs("div",{className:"modal-content glass-card animate-slide-up",children:[a.jsxs("div",{className:"modal-header",children:[a.jsx("h3",{children:h==="create"?"🏢 Register Partner Company":"✏️ Edit Company Details"}),a.jsx("button",{className:"btn-close",onClick:()=>d(!1),children:a.jsx(Ct,{size:20})})]}),a.jsxs("form",{onSubmit:U,className:"modal-form-scrollable",children:[a.jsxs("div",{className:"modal-form-grid",children:[a.jsxs("div",{className:"form-group logo-upload-group",children:[a.jsx("span",{className:"form-label",children:"Corporate Identity Logo"}),a.jsxs("div",{className:"logo-upload-container",children:[a.jsx("div",{className:"logo-upload-preview",children:E?a.jsx("img",{src:E,alt:"Logo Preview"}):a.jsx(dl,{size:32,className:"logo-upload-icon-placeholder"})}),a.jsxs("div",{className:"logo-upload-controls",children:[a.jsxs("button",{type:"button",className:"btn btn-secondary btn-sm",onClick:()=>_.current.click(),children:[a.jsx(px,{size:14}),a.jsx("span",{children:"Select File"})]}),a.jsx("span",{className:"upload-help-text",children:"JPG, PNG, GIF. Max 2MB size."}),a.jsx("input",{type:"file",ref:_,className:"hidden-file-input",accept:"image/*",onChange:N,style:{display:"none"}})]})]})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",htmlFor:"company-name",children:"Company Name *"}),a.jsx("input",{id:"company-name",type:"text",name:"name",className:"form-control",placeholder:"e.g. Acme Tech Corporation",value:f.name,onChange:D,required:!0})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",htmlFor:"company-industry",children:"Industry Sector"}),a.jsx("input",{id:"company-industry",type:"text",name:"industry",className:"form-control",placeholder:"e.g. Software & SaaS Services",value:f.industry,onChange:D})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",htmlFor:"company-website",children:"Corporate Website URL"}),a.jsx("input",{id:"company-website",type:"text",name:"website",className:"form-control",placeholder:"e.g. https://www.acme.corp",value:f.website,onChange:D})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",htmlFor:"company-location",children:"Global Location"}),a.jsx("input",{id:"company-location",type:"text",name:"location",className:"form-control",placeholder:"e.g. San Francisco, CA",value:f.location,onChange:D})]}),a.jsxs("div",{className:"form-group full-width-field",children:[a.jsx("label",{className:"form-label",htmlFor:"company-description",children:"Corporate Bio & Summary"}),a.jsx("textarea",{id:"company-description",name:"description",className:"form-control form-textarea",placeholder:"Provide a comprehensive summary of the company culture, core services, and hiring expectations...",value:f.description,onChange:D,rows:4})]})]}),a.jsxs("div",{className:"modal-footer",children:[a.jsx("button",{type:"button",className:"btn btn-secondary",onClick:()=>d(!1),disabled:m,children:"Cancel"}),a.jsx("button",{type:"submit",className:"btn btn-primary",disabled:m,children:m?a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"spinner",style:{borderTopColor:"#ffffff"}}),a.jsx("span",{children:"Saving Corporate Record..."})]}):a.jsx("span",{children:"Save Company Record"})})]})]})]})}),a.jsx("style",{children:`
        .company-management-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .management-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }

        .header-actions {
          display: flex;
          gap: 12px;
        }

        .header-info h2 {
          font-size: 24px;
          font-weight: 800;
        }

        .header-info p {
          font-size: 14px;
          color: var(--text-secondary);
          margin-top: 4px;
        }

        .filter-search-card {
          display: flex;
          align-items: center;
          padding: 16px 24px;
          background-color: var(--bg-secondary);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
        }

        .search-box {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
        }

        .search-icon {
          position: absolute;
          left: 14px;
          color: var(--text-tertiary);
        }

        .search-box input {
          width: 100%;
          height: 42px;
          background-color: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding-left: 44px;
          padding-right: 16px;
          color: var(--text-primary);
          transition: border-color var(--transition-fast);
        }

        .search-box input:focus {
          border-color: var(--primary);
        }

        /* Logo upload layout */
        .company-logo-cell {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .company-logo-img {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-xs);
          object-fit: contain;
          background-color: #ffffff;
          padding: 3px;
          border: 1px solid var(--border-color);
        }

        .company-logo-placeholder {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-xs);
          background-color: var(--bg-tertiary);
          color: var(--text-tertiary);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border-color);
        }

        .company-name-span {
          font-weight: 700;
          color: var(--text-primary);
        }

        .company-industry-span {
          font-weight: 600;
          color: var(--text-primary);
        }

        .company-link-web {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--primary);
          font-weight: 600;
        }

        .company-link-web:hover {
          text-decoration: underline;
        }

        .location-cell {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--text-secondary);
        }

        .company-desc-trunc {
          max-width: 250px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 13px;
          color: var(--text-tertiary);
        }

        /* Logo Upload Specific Styles */
        .logo-upload-group {
          grid-column: span 2;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 20px;
          margin-bottom: 8px;
        }

        .logo-upload-container {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-top: 10px;
        }

        .logo-upload-preview {
          width: 72px;
          height: 72px;
          border-radius: var(--radius-sm);
          background-color: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .logo-upload-preview img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          background-color: #ffffff;
          padding: 4px;
        }

        .logo-upload-icon-placeholder {
          color: var(--text-tertiary);
        }

        .logo-upload-controls {
          display: flex;
          flex-direction: column;
          gap: 6px;
          align-items: flex-start;
        }

        .upload-help-text {
          font-size: 11px;
          color: var(--text-tertiary);
        }
      `})]})},fv=()=>{const[e,t]=v.useState([]),[n,r]=v.useState(""),[s,l]=v.useState("all"),[i,o]=v.useState(!0),[c,u]=v.useState(!1),{showToast:d}=st(),h=async(x=!1)=>{var m,w;x||o(!0);try{const f=await $.get("/admin/users",{params:{search:n||void 0,role:s!=="all"?s:void 0}});f.data.success&&t(f.data.data)}catch(f){d(((w=(m=f.response)==null?void 0:m.data)==null?void 0:w.message)||"Failed to retrieve user accounts directory.","error")}finally{o(!1),u(!1)}};v.useEffect(()=>{const x=setTimeout(()=>{h()},400);return()=>clearTimeout(x)},[n,s]);const y=async x=>{var m,w;if(x.role==="admin"){d("Administrator accounts cannot be blocked.","warning");return}try{const f=await $.patch(`/admin/users/${x.id}/status`);f.data.success&&(d(f.data.message,"success"),t(e.map(p=>p.id===x.id?{...p,is_blocked:!p.is_blocked}:p)))}catch(f){d(((w=(m=f.response)==null?void 0:m.data)==null?void 0:w.message)||"Failed to update user security status.","error")}},j=()=>{u(!0),h(!0)};return a.jsxs("div",{className:"user-management-container animate-fade",children:[a.jsxs("div",{className:"management-header",children:[a.jsxs("div",{className:"header-info",children:[a.jsx("h2",{children:"👥 User Directory Auditing"}),a.jsx("p",{children:"Audit system users, inspect permissions levels, and restrict/block access to accounts violating platform policies."})]}),a.jsxs("button",{className:"btn btn-secondary btn-refresh",onClick:j,disabled:c||i,children:[a.jsx(Nt,{size:16,className:c?"spin-animation":""}),a.jsx("span",{children:"Refresh Database"})]})]}),a.jsxs("div",{className:"filter-search-card glass-card",children:[a.jsxs("div",{className:"search-box",children:[a.jsx(ft,{size:18,className:"search-icon"}),a.jsx("input",{type:"text",placeholder:"Search users by name, email or phone...",value:n,onChange:x=>r(x.target.value)})]}),a.jsxs("div",{className:"filter-box",children:[a.jsx("label",{htmlFor:"role-select",children:"Role Filter:"}),a.jsxs("select",{id:"role-select",className:"filter-select",value:s,onChange:x=>l(x.target.value),children:[a.jsx("option",{value:"all",children:"All Roles"}),a.jsx("option",{value:"candidate",children:"Candidates Only"}),a.jsx("option",{value:"admin",children:"Administrators Only"})]})]})]}),i?a.jsx("div",{className:"directory-skeleton",children:a.jsxs("div",{className:"table-responsive-wrapper",children:[a.jsx("div",{className:"skeleton-header shimmer-wrapper"}),[1,2,3,4,5].map(x=>a.jsx("div",{className:"skeleton-row shimmer-wrapper"},x))]})}):e.length===0?a.jsxs("div",{className:"empty-state glass-card",children:[a.jsx(Mf,{size:48,className:"warning-icon"}),a.jsx("h3",{children:"No User Accounts Found"}),a.jsx("p",{children:"No registers match your search or filter configuration. Check spelling or clear search filters."})]}):a.jsx("div",{className:"table-responsive-wrapper glass-card",children:a.jsxs("table",{className:"admin-data-table",children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{children:"Profile & Full Name"}),a.jsx("th",{children:"Email Address"}),a.jsx("th",{children:"Phone Number"}),a.jsx("th",{children:"Security Role"}),a.jsx("th",{children:"Account Status"}),a.jsx("th",{children:"Registration Date"}),a.jsx("th",{children:"Auditing Actions"})]})}),a.jsx("tbody",{children:e.map(x=>a.jsxs("tr",{className:x.is_blocked?"row-blocked":"",children:[a.jsx("td",{children:a.jsxs("div",{className:"user-profile-cell",children:[x.profile_image?a.jsx("img",{src:`http://localhost:5000/uploads/images/${x.profile_image}`,alt:"",className:"user-avatar-img",onError:m=>{m.target.style.display="none",m.target.nextSibling.style.display="flex"}}):null,a.jsxs("div",{className:"user-avatar-placeholder",children:[x.first_name[0],x.last_name[0]]}),a.jsxs("div",{className:"user-name-wrapper",children:[a.jsxs("span",{className:"user-fullname",children:[x.first_name," ",x.last_name]}),x.role==="admin"&&a.jsx("span",{className:"badge-shield-icon",title:"Administrator account",children:a.jsx(vo,{size:12})})]})]})}),a.jsx("td",{children:a.jsx("span",{className:"user-email-text",children:x.email})}),a.jsx("td",{children:a.jsx("span",{className:"user-phone-text",children:x.phone||"—"})}),a.jsx("td",{children:a.jsx("span",{className:`role-tag-pill ${x.role==="admin"?"tag-admin":"tag-candidate"}`,children:x.role})}),a.jsx("td",{children:x.is_blocked?a.jsx("span",{className:"status-pill pill-inactive",children:"Blocked"}):a.jsx("span",{className:"status-pill pill-active",children:"Active"})}),a.jsx("td",{children:a.jsx("span",{className:"date-registered-text",children:new Date(x.created_at).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"})})}),a.jsx("td",{children:a.jsx("div",{className:"btn-actions-row",children:x.role==="admin"?a.jsx("span",{className:"action-restricted-text",children:"Restricted"}):a.jsx("button",{className:`btn-icon-action ${x.is_blocked?"btn-icon-unblock":"btn-icon-danger"}`,title:x.is_blocked?"Activate Account":"Block Account",onClick:()=>y(x),children:x.is_blocked?a.jsx(ca,{size:16}):a.jsx(Xg,{size:16})})})})]},x.id))})]})}),a.jsx("style",{children:`
        .user-management-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .management-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }

        .header-info h2 {
          font-size: 24px;
          font-weight: 800;
        }

        .header-info p {
          font-size: 14px;
          color: var(--text-secondary);
          margin-top: 4px;
        }

        .btn-refresh {
          height: 42px;
        }

        .spin-animation {
          animation: spin 1s linear infinite;
        }

        .filter-search-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          padding: 16px 24px;
          background-color: var(--bg-secondary);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
        }

        .search-box {
          position: relative;
          display: flex;
          align-items: center;
          flex-grow: 1;
          max-width: 600px;
        }

        .search-icon {
          position: absolute;
          left: 14px;
          color: var(--text-tertiary);
        }

        .search-box input {
          width: 100%;
          height: 42px;
          background-color: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding-left: 44px;
          padding-right: 16px;
          color: var(--text-primary);
          transition: border-color var(--transition-fast);
        }

        .search-box input:focus {
          border-color: var(--primary);
        }

        .filter-box {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }

        .filter-box label {
          font-size: 13px;
          font-weight: 700;
          color: var(--text-secondary);
          text-transform: uppercase;
        }

        .filter-select {
          height: 42px;
          padding: 0 16px;
          background-color: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          font-weight: 600;
          cursor: pointer;
        }

        /* Table custom cells */
        .user-profile-cell {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .user-avatar-img {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          object-fit: cover;
          border: 1px solid var(--border-color);
        }

        .user-avatar-placeholder {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--primary-glow), var(--border-color));
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 12px;
          text-transform: uppercase;
          border: 1px solid var(--primary);
        }

        .user-name-wrapper {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .user-fullname {
          font-weight: 700;
          color: var(--text-primary);
        }

        .badge-shield-icon {
          color: var(--primary);
          display: inline-flex;
        }

        .role-tag-pill {
          display: inline-flex;
          padding: 3px 8px;
          border-radius: var(--radius-xs);
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
        }

        .tag-admin {
          background-color: var(--primary-glow);
          color: var(--primary);
          border: 1px solid var(--primary);
        }

        .tag-candidate {
          background-color: var(--bg-tertiary);
          color: var(--text-secondary);
          border: 1px solid var(--border-color);
        }

        .row-blocked {
          background-color: rgba(239, 68, 68, 0.02);
        }

        .row-blocked td {
          color: var(--text-tertiary);
        }

        .btn-icon-unblock:hover {
          color: var(--success) !important;
          border-color: var(--success-glow) !important;
          background-color: var(--success-glow) !important;
        }

        .action-restricted-text {
          font-size: 12px;
          color: var(--text-tertiary);
          font-style: italic;
          font-weight: 500;
        }

        /* Empty & Skeleton states */
        .empty-state {
          padding: 60px 40px;
          text-align: center;
          background-color: var(--bg-secondary);
          border-radius: var(--radius-md);
        }

        .warning-icon {
          color: var(--warning);
          margin-bottom: 16px;
        }

        .empty-state h3 {
          font-size: 18px;
          font-weight: 800;
          margin-bottom: 6px;
        }

        .empty-state p {
          font-size: 14px;
          color: var(--text-secondary);
        }

        .directory-skeleton {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .skeleton-header {
          height: 50px;
          border-radius: var(--radius-sm);
          margin-bottom: 8px;
        }

        .skeleton-row {
          height: 60px;
          border-radius: var(--radius-sm);
          margin-bottom: 4px;
        }
      `})]})},pv=()=>{const[e,t]=v.useState([]),[n,r]=v.useState(""),[s,l]=v.useState("all"),[i,o]=v.useState(!0),[c,u]=v.useState(!1),{showToast:d}=st(),h=async(m=!1)=>{var w,f;m||o(!0);try{const p=await $.get("/applications",{params:{search:n||void 0,status:s!=="all"?s:void 0}});p.data.success&&t(p.data.data)}catch(p){d(((f=(w=p.response)==null?void 0:w.data)==null?void 0:f.message)||"Failed to retrieve applications.","error")}finally{o(!1),u(!1)}};v.useEffect(()=>{const m=setTimeout(()=>{h()},450);return()=>clearTimeout(m)},[n,s]);const y=async(m,w)=>{var f,p;try{(await $.patch(`/applications/${m}/status`,{status:w})).data.success&&(d(`Application status set to ${w}.`,"success"),t(e.map(b=>b.id===m?{...b,status:w}:b)))}catch(g){d(((p=(f=g.response)==null?void 0:f.data)==null?void 0:p.message)||"Failed to update application pipeline state.","error")}},j=()=>{u(!0),h(!0)},x=m=>{switch(m){case"Applied":return a.jsx(Vc,{size:14,style:{color:"var(--warning)"}});case"Under Review":return a.jsx(Af,{size:14,style:{color:"var(--primary)"}});case"Shortlisted":return a.jsx(ca,{size:14,style:{color:"var(--success)"}});case"Interview Scheduled":return a.jsx(Vc,{size:14,style:{color:"var(--accent)"}});case"Selected":return a.jsx(ca,{size:14,style:{color:"var(--success)"}});case"Rejected":return a.jsx(ex,{size:14,style:{color:"var(--danger)"}});default:return null}};return a.jsxs("div",{className:"app-management-container animate-fade",children:[a.jsxs("div",{className:"management-header",children:[a.jsxs("div",{className:"header-info",children:[a.jsx("h2",{children:"📄 Application Auditing Dashboard"}),a.jsx("p",{children:"Review candidate profiles, evaluate resumes, filter applicants, and update hiring pipeline status settings."})]}),a.jsxs("button",{className:"btn btn-secondary btn-refresh",onClick:j,disabled:c||i,children:[a.jsx(Nt,{size:16,className:c?"spin-animation":""}),a.jsx("span",{children:"Refresh Records"})]})]}),a.jsxs("div",{className:"filter-search-card glass-card",children:[a.jsxs("div",{className:"search-box",children:[a.jsx(ft,{size:18,className:"search-icon"}),a.jsx("input",{type:"text",placeholder:"Search by candidate name, job title, company or contact info...",value:n,onChange:m=>r(m.target.value)})]}),a.jsxs("div",{className:"filter-box",children:[a.jsx("label",{htmlFor:"app-status-select",children:"Status Filter:"}),a.jsxs("select",{id:"app-status-select",className:"filter-select",value:s,onChange:m=>l(m.target.value),children:[a.jsx("option",{value:"all",children:"All States"}),a.jsx("option",{value:"Applied",children:"Applied"}),a.jsx("option",{value:"Under Review",children:"Under Review"}),a.jsx("option",{value:"Shortlisted",children:"Shortlisted"}),a.jsx("option",{value:"Interview Scheduled",children:"Interview Scheduled"}),a.jsx("option",{value:"Selected",children:"Selected"}),a.jsx("option",{value:"Rejected",children:"Rejected"})]})]})]}),i?a.jsx("div",{className:"directory-skeleton",children:a.jsxs("div",{className:"table-responsive-wrapper",children:[a.jsx("div",{className:"skeleton-header shimmer-wrapper"}),[1,2,3,4,5].map(m=>a.jsx("div",{className:"skeleton-row shimmer-wrapper"},m))]})}):e.length===0?a.jsxs("div",{className:"empty-state glass-card",children:[a.jsx(ua,{size:48,className:"warning-icon"}),a.jsx("h3",{children:"No Applications Received"}),a.jsx("p",{children:"No job application submissions matched your search filters at this time."})]}):a.jsx("div",{className:"table-responsive-wrapper glass-card",children:a.jsxs("table",{className:"admin-data-table",children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{children:"Applicant Name"}),a.jsx("th",{children:"Target Career Job Role"}),a.jsx("th",{children:"Company"}),a.jsx("th",{children:"Applied Date"}),a.jsx("th",{children:"Document Resume"}),a.jsx("th",{children:"Current Status"}),a.jsx("th",{children:"Hiring Pipeline Actions"})]})}),a.jsx("tbody",{children:e.map(m=>a.jsxs("tr",{children:[a.jsx("td",{children:a.jsxs("div",{className:"applicant-cell",children:[a.jsxs("span",{className:"applicant-fullname",children:[m.first_name," ",m.last_name]}),a.jsx("span",{className:"applicant-details-sub",children:m.email}),a.jsx("span",{className:"applicant-details-sub",children:m.phone||"—"})]})}),a.jsx("td",{children:a.jsx("span",{className:"job-target-title",children:m.job_title})}),a.jsx("td",{children:a.jsx("span",{className:"company-text-td",children:m.company_name})}),a.jsx("td",{children:a.jsx("span",{className:"date-td",children:new Date(m.created_at).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"})})}),a.jsx("td",{children:m.resume?a.jsxs("a",{href:`http://localhost:5000/uploads/resumes/${m.resume}`,target:"_blank",rel:"noopener noreferrer",className:"btn-resume-link",children:[a.jsx(ua,{size:14}),a.jsx("span",{children:"View Resume"}),a.jsx(Df,{size:12})]}):a.jsx("span",{className:"text-muted",style:{fontSize:"12px"},children:"No file uploaded"})}),a.jsx("td",{children:a.jsxs("div",{className:"status-cell-wrapper",style:{display:"flex",flexDirection:"column",gap:"6px",alignItems:"flex-start"},children:[a.jsxs("span",{className:`status-pill pill-${m.status.replace(/\s+/g,"")}`,children:[a.jsx("span",{className:"status-bullet-icon",children:x(m.status)}),a.jsx("span",{children:m.status})]}),a.jsxs("div",{className:"status-sub-indicators",style:{display:"flex",flexDirection:"column",gap:"4px",marginTop:"2px"},children:[a.jsx("span",{style:{display:"inline-flex",alignItems:"center",gap:"4px",fontSize:"10px",fontWeight:700,color:m.has_required_skills?"var(--success)":"var(--text-tertiary)",background:m.has_required_skills?"var(--success-glow)":"var(--bg-tertiary)",border:`1px solid ${m.has_required_skills?"var(--success)":"var(--border-color)"}`,padding:"2px 6px",borderRadius:"4px",textTransform:"uppercase"},children:m.has_required_skills?"✓ Skills Matched":"⚠ Skills Missing"}),a.jsx("span",{style:{display:"inline-flex",alignItems:"center",gap:"4px",fontSize:"10px",fontWeight:700,color:["Shortlisted","Interview Scheduled","Selected"].includes(m.status)?"var(--success)":"var(--text-tertiary)",background:["Shortlisted","Interview Scheduled","Selected"].includes(m.status)?"var(--success-glow)":"var(--bg-tertiary)",border:`1px solid ${["Shortlisted","Interview Scheduled","Selected"].includes(m.status)?"var(--success)":"var(--border-color)"}`,padding:"2px 6px",borderRadius:"4px",textTransform:"uppercase"},children:["Shortlisted","Interview Scheduled","Selected"].includes(m.status)?"✓ Shortlisted":"○ Not Shortlisted"}),a.jsx("span",{style:{display:"inline-flex",alignItems:"center",gap:"4px",fontSize:"10px",fontWeight:700,color:m.status==="Selected"?"var(--success)":m.status==="Rejected"?"var(--danger)":"var(--text-tertiary)",background:m.status==="Selected"?"var(--success-glow)":m.status==="Rejected"?"var(--danger-glow)":"var(--bg-tertiary)",border:`1px solid ${m.status==="Selected"?"var(--success)":m.status==="Rejected"?"var(--danger)":"var(--border-color)"}`,padding:"2px 6px",borderRadius:"4px",textTransform:"uppercase"},children:m.status==="Selected"?"🎉 Selected":m.status==="Rejected"?"❌ Rejected":"⏳ Pending Job Decision"})]})]})}),a.jsx("td",{children:a.jsx("div",{className:"pipeline-actions",children:a.jsxs("select",{className:"pipeline-dropdown",value:m.status,onChange:w=>y(m.id,w.target.value),children:[a.jsx("option",{value:"Applied",children:"Applied"}),a.jsx("option",{value:"Under Review",children:"Under Review"}),a.jsx("option",{value:"Shortlisted",children:"Shortlisted"}),a.jsx("option",{value:"Interview Scheduled",children:"Interview Scheduled"}),a.jsx("option",{value:"Selected",children:"Selected"}),a.jsx("option",{value:"Rejected",children:"Rejected"})]})})})]},m.id))})]})}),a.jsx("style",{children:`
        .app-management-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .management-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }

        .header-info h2 {
          font-size: 24px;
          font-weight: 800;
        }

        .header-info p {
          font-size: 14px;
          color: var(--text-secondary);
          margin-top: 4px;
        }

        .filter-search-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          padding: 16px 24px;
          background-color: var(--bg-secondary);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
        }

        .search-box {
          position: relative;
          display: flex;
          align-items: center;
          flex-grow: 1;
          max-width: 600px;
        }

        .search-icon {
          position: absolute;
          left: 14px;
          color: var(--text-tertiary);
        }

        .search-box input {
          width: 100%;
          height: 42px;
          background-color: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding-left: 44px;
          padding-right: 16px;
          color: var(--text-primary);
          transition: border-color var(--transition-fast);
        }

        .search-box input:focus {
          border-color: var(--primary);
        }

        .filter-box {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .filter-box label {
          font-size: 13px;
          font-weight: 700;
          color: var(--text-secondary);
          text-transform: uppercase;
        }

        .filter-select {
          height: 42px;
          padding: 0 16px;
          background-color: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          font-weight: 600;
          cursor: pointer;
        }

        /* Cells custom layout */
        .applicant-cell {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .applicant-fullname {
          font-weight: 700;
          color: var(--text-primary);
        }

        .applicant-details-sub {
          font-size: 12px;
          color: var(--text-tertiary);
          margin-top: 1px;
        }

        .job-target-title {
          font-weight: 700;
          color: var(--text-primary);
        }

        .company-text-td {
          font-weight: 600;
          color: var(--text-secondary);
        }

        .btn-resume-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 700;
          color: var(--primary);
          padding: 6px 12px;
          border-radius: var(--radius-xs);
          border: 1px solid var(--primary);
          background-color: var(--primary-glow);
          transition: all var(--transition-fast);
        }

        .btn-resume-link:hover {
          background-color: var(--primary);
          color: #ffffff;
        }

        /* Pipeline Actions Dropdown */
        .pipeline-dropdown {
          height: 34px;
          padding: 0 8px;
          background-color: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xs);
          color: var(--text-primary);
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .pipeline-dropdown:hover {
          border-color: var(--primary);
        }

        /* Status Badge Colors override */
        .status-cell-wrapper {
          display: flex;
          align-items: center;
        }

        .status-bullet-icon {
          display: inline-flex;
          align-items: center;
          margin-right: 4px;
        }

        .pill-Applied {
          background-color: rgba(245, 158, 11, 0.12);
          color: var(--warning);
          border: 1px solid rgba(245, 158, 11, 0.3);
        }

        .pill-UnderReview {
          background-color: var(--primary-glow);
          color: var(--primary);
          border: 1px solid var(--primary);
        }

        .pill-Shortlisted {
          background-color: var(--success-glow);
          color: var(--success);
          border: 1px solid var(--success);
        }

        .pill-InterviewScheduled {
          background-color: var(--accent-glow);
          color: var(--accent);
          border: 1px solid var(--accent);
        }

        .pill-Selected {
          background-color: var(--success-glow);
          color: var(--success);
          border: 1px solid var(--success);
        }

        .pill-Rejected {
          background-color: var(--danger-glow);
          color: var(--danger);
          border: 1px solid var(--danger);
        }
      `})]})},hv=()=>{const[e,t]=v.useState([]),[n,r]=v.useState(""),[s,l]=v.useState(!0),[i,o]=v.useState(!1),[c,u]=v.useState(null),{showToast:d}=st(),h=async(x=!1)=>{var m,w;x||l(!0);try{const f=await $.get("/admin/messages",{params:{search:n||void 0}});f.data.success&&t(f.data.data)}catch(f){d(((w=(m=f.response)==null?void 0:m.data)==null?void 0:w.message)||"Failed to retrieve collaboration messages.","error")}finally{l(!1),o(!1)}};v.useEffect(()=>{const x=setTimeout(()=>{h()},400);return()=>clearTimeout(x)},[n]);const y=async(x,m)=>{var w,f;if(m.stopPropagation(),!!window.confirm("Are you sure you want to delete this message?"))try{const p=await $.delete(`/admin/messages/${x}`);p.data.success&&(d(p.data.message,"success"),t(e.filter(g=>g.id!==x)),(c==null?void 0:c.id)===x&&u(null))}catch(p){d(((f=(w=p.response)==null?void 0:w.data)==null?void 0:f.message)||"Failed to delete the message.","error")}},j=()=>{o(!0),h(!0)};return a.jsxs("div",{className:"message-management-container animate-fade",children:[a.jsxs("div",{className:"management-header",children:[a.jsxs("div",{className:"header-info",children:[a.jsx("h2",{children:"✉️ Collaboration Messages"}),a.jsx("p",{children:"Inspect incoming contact requests and business collaboration queries submitted via the frontend portal."})]}),a.jsxs("button",{className:"btn btn-secondary btn-refresh",onClick:j,disabled:i||s,children:[a.jsx(Nt,{size:16,className:i?"spin-animation":""}),a.jsx("span",{children:"Refresh List"})]})]}),a.jsx("div",{className:"filter-search-card glass-card",children:a.jsxs("div",{className:"search-box",children:[a.jsx(ft,{size:18,className:"search-icon"}),a.jsx("input",{type:"text",placeholder:"Search messages by name, email, company or content...",value:n,onChange:x=>r(x.target.value)})]})}),s?a.jsx("div",{className:"directory-skeleton",children:a.jsxs("div",{className:"table-responsive-wrapper",children:[a.jsx("div",{className:"skeleton-header shimmer-wrapper"}),[1,2,3,4].map(x=>a.jsx("div",{className:"skeleton-row shimmer-wrapper"},x))]})}):e.length===0?a.jsxs("div",{className:"empty-state glass-card",children:[a.jsx(Mf,{size:48,className:"warning-icon"}),a.jsx("h3",{children:"No Collaboration Messages"}),a.jsx("p",{children:"No contact inquiries match your search query or have been received yet."})]}):a.jsx("div",{className:"table-responsive-wrapper glass-card animate-slide",children:a.jsxs("table",{className:"admin-data-table",children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{children:"Sender Name"}),a.jsx("th",{children:"Company"}),a.jsx("th",{children:"Email ID"}),a.jsx("th",{children:"Contact Number"}),a.jsx("th",{children:"Submission Date"}),a.jsx("th",{children:"Actions"})]})}),a.jsx("tbody",{children:e.map(x=>a.jsxs("tr",{className:"clickable-row",onClick:()=>u(x),title:"Click to view full message details",children:[a.jsx("td",{children:a.jsx("span",{className:"sender-name-text",children:x.name})}),a.jsx("td",{children:a.jsxs("div",{className:"company-cell-info",children:[a.jsx(Br,{size:14,className:"company-icon"}),a.jsx("span",{children:x.company_name})]})}),a.jsx("td",{children:a.jsx("span",{className:"sender-email-text",children:x.email})}),a.jsx("td",{children:a.jsx("span",{className:"sender-phone-text",children:x.business_number})}),a.jsx("td",{children:a.jsx("span",{className:"submission-date-text",children:new Date(x.created_at).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})})}),a.jsx("td",{children:a.jsxs("div",{className:"btn-actions-row",children:[a.jsx("button",{className:"btn-icon-action btn-icon-view",title:"View Details",onClick:m=>{m.stopPropagation(),u(x)},children:a.jsx(Df,{size:16})}),a.jsx("button",{className:"btn-icon-action btn-icon-danger",title:"Delete Message",onClick:m=>y(x.id,m),children:a.jsx(un,{size:16})})]})})]},x.id))})]})}),c&&a.jsx("div",{className:"modal-overlay animate-fade",onClick:()=>u(null),children:a.jsxs("div",{className:"modal-content glass-card animate-slide",onClick:x=>x.stopPropagation(),children:[a.jsxs("div",{className:"modal-header",children:[a.jsx("h3",{children:"Collaboration Query Details"}),a.jsx("button",{className:"modal-close-btn",onClick:()=>u(null),children:a.jsx(Ct,{size:20})})]}),a.jsx("div",{className:"modal-body",children:a.jsxs("div",{className:"details-section",children:[a.jsxs("div",{className:"info-grid",children:[a.jsxs("div",{className:"info-block",children:[a.jsx("span",{className:"block-label",children:"Sender Name"}),a.jsx("span",{className:"block-val",children:c.name})]}),a.jsxs("div",{className:"info-block",children:[a.jsx("span",{className:"block-label",children:"Company Name"}),a.jsxs("span",{className:"block-val flex-val",children:[a.jsx(Br,{size:16})," ",c.company_name]})]}),a.jsxs("div",{className:"info-block",children:[a.jsx("span",{className:"block-label",children:"Company Email ID"}),a.jsxs("span",{className:"block-val flex-val",children:[a.jsx($r,{size:16}),a.jsx("a",{href:`mailto:${c.email}`,className:"email-mailto-link",children:c.email})]})]}),a.jsxs("div",{className:"info-block",children:[a.jsx("span",{className:"block-label",children:"Business Number"}),a.jsxs("span",{className:"block-val flex-val",children:[a.jsx(cx,{size:16})," ",c.business_number]})]}),a.jsxs("div",{className:"info-block full-width-info",children:[a.jsx("span",{className:"block-label",children:"Company Address"}),a.jsxs("span",{className:"block-val flex-val",children:[a.jsx(Hr,{size:16})," ",c.company_address]})]}),a.jsxs("div",{className:"info-block full-width-info",children:[a.jsx("span",{className:"block-label",children:"Submission Timestamp"}),a.jsxs("span",{className:"block-val flex-val",children:[a.jsx(Gg,{size:16}),new Date(c.created_at).toLocaleString(void 0,{weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})]})]})]}),a.jsxs("div",{className:"message-content-box",children:[a.jsx("span",{className:"block-label",children:"Message Details"}),a.jsx("div",{className:"message-body-text",children:c.message})]})]})}),a.jsxs("div",{className:"modal-footer",children:[a.jsx("button",{className:"btn btn-secondary",onClick:()=>u(null),children:"Close Window"}),a.jsxs("button",{className:"btn btn-primary btn-danger-action",onClick:x=>y(c.id,x),children:[a.jsx(un,{size:16}),a.jsx("span",{children:"Delete Message"})]})]})]})}),a.jsx("style",{children:`
        .message-management-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .management-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }

        .header-info h2 {
          font-size: 24px;
          font-weight: 800;
        }

        .header-info p {
          font-size: 14px;
          color: var(--text-secondary);
          margin-top: 4px;
        }

        .btn-refresh {
          height: 42px;
        }

        .spin-animation {
          animation: spin 1s linear infinite;
        }

        .filter-search-card {
          padding: 16px 24px;
          background-color: var(--bg-secondary);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
        }

        .search-box {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: 14px;
          color: var(--text-tertiary);
        }

        .search-box input {
          width: 100%;
          height: 42px;
          background-color: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding-left: 44px;
          padding-right: 16px;
          color: var(--text-primary);
          transition: border-color var(--transition-fast);
        }

        .search-box input:focus {
          border-color: var(--primary);
        }

        .clickable-row {
          cursor: pointer;
          transition: background-color var(--transition-fast);
        }

        .clickable-row:hover {
          background-color: rgba(255, 81, 0, 0.02) !important;
        }

        .company-cell-info {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
        }

        .company-icon {
          color: var(--primary);
        }

        .sender-name-text {
          font-weight: 700;
          color: var(--text-primary);
        }

        .btn-icon-view:hover {
          color: var(--primary) !important;
          border-color: var(--primary-glow) !important;
          background-color: var(--primary-glow) !important;
        }

        /* Modal Layout */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 20px;
        }

        .modal-content {
          width: 100%;
          max-width: 650px;
          background-color: var(--bg-secondary);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-xl);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid var(--border-color);
          background-color: var(--bg-tertiary);
        }

        .modal-header h3 {
          font-size: 18px;
          font-weight: 800;
          margin: 0;
        }

        .modal-close-btn {
          color: var(--text-tertiary);
          background: none;
          border: none;
          cursor: pointer;
          transition: color var(--transition-fast);
        }

        .modal-close-btn:hover {
          color: var(--text-primary);
        }

        .modal-body {
          padding: 24px;
          max-height: 70vh;
          overflow-y: auto;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
          margin-bottom: 24px;
        }

        .info-block {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .full-width-info {
          grid-column: span 2;
        }

        .block-label {
          font-size: 11px;
          font-weight: 700;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .block-val {
          font-size: 14.5px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .flex-val {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .flex-val svg {
          color: var(--primary);
          flex-shrink: 0;
        }

        .email-mailto-link {
          color: var(--primary);
          text-decoration: underline;
        }

        .email-mailto-link:hover {
          color: var(--primary-hover);
        }

        .message-content-box {
          border-top: 1px solid var(--border-color);
          padding-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .message-body-text {
          background-color: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 16px;
          font-size: 14px;
          line-height: 1.6;
          color: var(--text-secondary);
          white-space: pre-wrap;
          font-family: inherit;
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 12px;
          padding: 20px 24px;
          border-top: 1px solid var(--border-color);
          background-color: var(--bg-tertiary);
        }

        .btn-danger-action {
          background-color: var(--danger);
          border-color: var(--danger);
        }

        .btn-danger-action:hover {
          background-color: #dc2626;
          border-color: #dc2626;
        }

        /* Skeleton loader elements */
        .directory-skeleton {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .skeleton-header {
          height: 50px;
          border-radius: var(--radius-sm);
          margin-bottom: 8px;
        }

        .skeleton-row {
          height: 60px;
          border-radius: var(--radius-sm);
          margin-bottom: 4px;
        }

        .empty-state {
          padding: 60px 40px;
          text-align: center;
          background-color: var(--bg-secondary);
          border-radius: var(--radius-md);
        }

        .warning-icon {
          color: var(--warning);
          margin-bottom: 16px;
        }

        .empty-state h3 {
          font-size: 18px;
          font-weight: 800;
          margin-bottom: 6px;
        }

        .empty-state p {
          font-size: 14px;
          color: var(--text-secondary);
        }
      `})]})},mv=()=>{const[e,t]=v.useState([]),[n,r]=v.useState(""),[s,l]=v.useState(!0),[i,o]=v.useState(!1),{showToast:c}=st(),[u,d]=v.useState(!1),[h,y]=v.useState("create"),[j,x]=v.useState(null),[m,w]=v.useState(!1),[f,p]=v.useState({name:"",description:""}),g=async(N=!1)=>{N||l(!0);try{const D=await $.get("/admin/categories");D.data.success&&t(D.data.data)}catch{c("Failed to retrieve categories.","error")}finally{l(!1),o(!1)}};v.useEffect(()=>{g()},[]);const b=()=>{y("create"),p({name:"",description:""}),d(!0)},E=N=>{y("edit"),x(N),p({name:N.name||"",description:N.description||""}),d(!0)},P=N=>{const{name:D,value:U}=N.target;p(M=>({...M,[D]:U}))},_=async N=>{var D,U;if(N.preventDefault(),!f.name){c("Category Name is required.","warning");return}w(!0);try{let M;h==="create"?(M=await $.post("/admin/categories",f),M.data.success&&(c("Job category created successfully.","success"),d(!1),g(!0))):(M=await $.put(`/admin/categories/${j.id}`,f),M.data.success&&(c("Job category updated successfully.","success"),d(!1),g(!0)))}catch(M){c(((U=(D=M.response)==null?void 0:D.data)==null?void 0:U.message)||"Failed to save category information.","error")}finally{w(!1)}},C=async N=>{var D,U;if(window.confirm("Are you sure you want to delete this category? Jobs under this category will have their category reference cleared."))try{(await $.delete(`/admin/categories/${N}`)).data.success&&(c("Category deleted successfully.","success"),t(e.filter(ke=>ke.id!==N)))}catch(M){c(((U=(D=M.response)==null?void 0:D.data)==null?void 0:U.message)||"Failed to delete category.","error")}},I=()=>{o(!0),g(!0)},L=e.filter(N=>N.name.toLowerCase().includes(n.toLowerCase())||N.description&&N.description.toLowerCase().includes(n.toLowerCase()));return a.jsxs("div",{className:"company-management-container animate-fade",children:[a.jsxs("div",{className:"management-header",children:[a.jsxs("div",{className:"header-info",children:[a.jsx("h2",{children:"📂 Job Categories Configuration"}),a.jsx("p",{children:"Organize open job openings by department, discipline, or corporate sectors."})]}),a.jsxs("div",{className:"header-actions",children:[a.jsx("button",{className:"btn btn-secondary btn-refresh",onClick:I,disabled:i||s,children:a.jsx(Nt,{size:16,className:i?"spin-animation":""})}),a.jsxs("button",{className:"btn btn-primary",onClick:b,children:[a.jsx(Kr,{size:18}),a.jsx("span",{children:"Create Category"})]})]})]}),a.jsx("div",{className:"filter-search-card glass-card",children:a.jsxs("div",{className:"search-box",children:[a.jsx(ft,{size:18,className:"search-icon"}),a.jsx("input",{type:"text",placeholder:"Search categories by department or keywords...",value:n,onChange:N=>r(N.target.value)})]})}),s?a.jsx("div",{className:"directory-skeleton",children:a.jsxs("div",{className:"table-responsive-wrapper",children:[a.jsx("div",{className:"skeleton-header shimmer-wrapper"}),[1,2,3].map(N=>a.jsx("div",{className:"skeleton-row shimmer-wrapper"},N))]})}):L.length===0?a.jsxs("div",{className:"empty-state glass-card",children:[a.jsx(hi,{size:48,className:"warning-icon"}),a.jsx("h3",{children:"No Categories Found"}),a.jsx("p",{children:'No job categories match your search parameters. Click "Create Category" to register one.'})]}):a.jsx("div",{className:"table-responsive-wrapper glass-card",children:a.jsxs("table",{className:"admin-data-table",children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{children:"Category Name"}),a.jsx("th",{children:"Description"}),a.jsx("th",{children:"Created Date"}),a.jsx("th",{children:"Control Actions"})]})}),a.jsx("tbody",{children:L.map(N=>a.jsxs("tr",{children:[a.jsx("td",{children:a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px",fontWeight:700,color:"var(--text-primary)"},children:[a.jsx(hi,{size:18,style:{color:"var(--primary)"}}),a.jsx("span",{children:N.name})]})}),a.jsx("td",{children:a.jsx("span",{style:{color:"var(--text-secondary)",fontSize:"13px"},children:N.description||"—"})}),a.jsx("td",{children:a.jsx("span",{style:{color:"var(--text-tertiary)",fontSize:"13.5px"},children:new Date(N.created_at).toLocaleDateString()})}),a.jsx("td",{children:a.jsxs("div",{className:"btn-actions-row",children:[a.jsx("button",{className:"btn-icon-action",title:"Edit Details",onClick:()=>E(N),children:a.jsx(Xn,{size:15})}),a.jsx("button",{className:"btn-icon-action btn-icon-danger",title:"Delete Category",onClick:()=>C(N.id),children:a.jsx(un,{size:15})})]})})]},N.id))})]})}),u&&a.jsx("div",{className:"modal-backdrop animate-fade",children:a.jsxs("div",{className:"modal-content glass-card animate-slide-up",children:[a.jsxs("div",{className:"modal-header",children:[a.jsx("h3",{children:h==="create"?"📂 Create Job Category":"✏️ Edit Job Category"}),a.jsx("button",{className:"btn-close",onClick:()=>d(!1),children:a.jsx(Ct,{size:20})})]}),a.jsxs("form",{onSubmit:_,className:"modal-form-scrollable",children:[a.jsxs("div",{className:"modal-form-grid",children:[a.jsxs("div",{className:"form-group",style:{gridColumn:"span 2"},children:[a.jsx("label",{className:"form-label",htmlFor:"cat-name",children:"Category Title *"}),a.jsx("input",{id:"cat-name",type:"text",name:"name",className:"form-control",placeholder:"e.g. Software Engineering",value:f.name,onChange:P,required:!0})]}),a.jsxs("div",{className:"form-group full-width-field",style:{gridColumn:"span 2"},children:[a.jsx("label",{className:"form-label",htmlFor:"cat-description",children:"Summary Details"}),a.jsx("textarea",{id:"cat-description",name:"description",className:"form-control form-textarea",placeholder:"Provide department details, career branches covered, or general division notes...",value:f.description,onChange:P,rows:4})]})]}),a.jsxs("div",{className:"modal-footer",children:[a.jsx("button",{type:"button",className:"btn btn-secondary",onClick:()=>d(!1),disabled:m,children:"Cancel"}),a.jsx("button",{type:"submit",className:"btn btn-primary",disabled:m,children:m?a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"spinner",style:{borderTopColor:"#ffffff"}}),a.jsx("span",{children:"Saving Category Details..."})]}):a.jsx("span",{children:"Save Category"})})]})]})]})}),a.jsx("style",{children:`
        .company-management-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .management-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }

        .header-actions {
          display: flex;
          gap: 12px;
        }

        .header-info h2 {
          font-size: 24px;
          font-weight: 800;
        }

        .header-info p {
          font-size: 14px;
          color: var(--text-secondary);
          margin-top: 4px;
        }

        .filter-search-card {
          display: flex;
          align-items: center;
          padding: 16px 24px;
          background-color: var(--bg-secondary);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
        }

        .search-box {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
        }

        .search-icon {
          position: absolute;
          left: 14px;
          color: var(--text-tertiary);
        }

        .search-box input {
          width: 100%;
          height: 42px;
          background-color: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding-left: 44px;
          padding-right: 16px;
          color: var(--text-primary);
          transition: border-color var(--transition-fast);
        }

        .search-box input:focus {
          border-color: var(--primary);
        }
      `})]})},gv=()=>{const[e,t]=v.useState([]),[n,r]=v.useState(""),[s,l]=v.useState(!0),[i,o]=v.useState(!1),{showToast:c}=st(),[u,d]=v.useState(!1),[h,y]=v.useState("create"),[j,x]=v.useState(null),[m,w]=v.useState(!1),[f,p]=v.useState({name:""}),g=async(N=!1)=>{N||l(!0);try{const D=await $.get("/admin/skills");D.data.success&&t(D.data.data)}catch{c("Failed to retrieve skills lists.","error")}finally{l(!1),o(!1)}};v.useEffect(()=>{g()},[]);const b=()=>{y("create"),p({name:""}),d(!0)},E=N=>{y("edit"),x(N),p({name:N.name||""}),d(!0)},P=N=>{const{name:D,value:U}=N.target;p(M=>({...M,[D]:U}))},_=async N=>{var D,U;if(N.preventDefault(),!f.name){c("Skill Name is required.","warning");return}w(!0);try{let M;h==="create"?(M=await $.post("/admin/skills",f),M.data.success&&(c("Technical skill created successfully.","success"),d(!1),g(!0))):(M=await $.put(`/admin/skills/${j.id}`,f),M.data.success&&(c("Technical skill updated successfully.","success"),d(!1),g(!0)))}catch(M){c(((U=(D=M.response)==null?void 0:D.data)==null?void 0:U.message)||"Failed to save skill details.","error")}finally{w(!1)}},C=async N=>{var D,U;if(window.confirm("Are you sure you want to delete this technical skill? Jobs requiring this skill will have this requirement detached."))try{(await $.delete(`/admin/skills/${N}`)).data.success&&(c("Skill deleted successfully.","success"),t(e.filter(ke=>ke.id!==N)))}catch(M){c(((U=(D=M.response)==null?void 0:D.data)==null?void 0:U.message)||"Failed to delete skill.","error")}},I=()=>{o(!0),g(!0)},L=e.filter(N=>N.name.toLowerCase().includes(n.toLowerCase()));return a.jsxs("div",{className:"company-management-container animate-fade",children:[a.jsxs("div",{className:"management-header",children:[a.jsxs("div",{className:"header-info",children:[a.jsx("h2",{children:"🏆 Technical Skills Registry"}),a.jsx("p",{children:"Configure technical keywords and framework credentials seekers select on their profiles."})]}),a.jsxs("div",{className:"header-actions",children:[a.jsx("button",{className:"btn btn-secondary btn-refresh",onClick:I,disabled:i||s,children:a.jsx(Nt,{size:16,className:i?"spin-animation":""})}),a.jsxs("button",{className:"btn btn-primary",onClick:b,children:[a.jsx(Kr,{size:18}),a.jsx("span",{children:"Add Skill Tag"})]})]})]}),a.jsx("div",{className:"filter-search-card glass-card",children:a.jsxs("div",{className:"search-box",children:[a.jsx(ft,{size:18,className:"search-icon"}),a.jsx("input",{type:"text",placeholder:"Search skills keywords by name...",value:n,onChange:N=>r(N.target.value)})]})}),s?a.jsx("div",{className:"directory-skeleton",children:a.jsxs("div",{className:"table-responsive-wrapper",children:[a.jsx("div",{className:"skeleton-header shimmer-wrapper"}),[1,2,3].map(N=>a.jsx("div",{className:"skeleton-row shimmer-wrapper"},N))]})}):L.length===0?a.jsxs("div",{className:"empty-state glass-card",children:[a.jsx(pi,{size:48,className:"warning-icon"}),a.jsx("h3",{children:"No Skills Found"}),a.jsx("p",{children:'No technical skills match your search parameters. Click "Add Skill Tag" to register one.'})]}):a.jsx("div",{className:"table-responsive-wrapper glass-card",children:a.jsxs("table",{className:"admin-data-table",children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{children:"Skill Name Keyword"}),a.jsx("th",{children:"Registered On"}),a.jsx("th",{children:"Control Actions"})]})}),a.jsx("tbody",{children:L.map(N=>a.jsxs("tr",{children:[a.jsx("td",{children:a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px",fontWeight:700,color:"var(--text-primary)"},children:[a.jsx(pi,{size:18,style:{color:"var(--accent)"}}),a.jsx("span",{children:N.name})]})}),a.jsx("td",{children:a.jsx("span",{style:{color:"var(--text-tertiary)",fontSize:"13.5px"},children:N.created_at?new Date(N.created_at).toLocaleDateString():"—"})}),a.jsx("td",{children:a.jsxs("div",{className:"btn-actions-row",children:[a.jsx("button",{className:"btn-icon-action",title:"Edit Keyword",onClick:()=>E(N),children:a.jsx(Xn,{size:15})}),a.jsx("button",{className:"btn-icon-action btn-icon-danger",title:"Delete Skill",onClick:()=>C(N.id),children:a.jsx(un,{size:15})})]})})]},N.id))})]})}),u&&a.jsx("div",{className:"modal-backdrop animate-fade",children:a.jsxs("div",{className:"modal-content glass-card animate-slide-up",children:[a.jsxs("div",{className:"modal-header",children:[a.jsx("h3",{children:h==="create"?"🏆 Add Skill Keyword":"✏️ Edit Skill Keyword"}),a.jsx("button",{className:"btn-close",onClick:()=>d(!1),children:a.jsx(Ct,{size:20})})]}),a.jsxs("form",{onSubmit:_,className:"modal-form-scrollable",children:[a.jsx("div",{className:"modal-form-grid",children:a.jsxs("div",{className:"form-group",style:{gridColumn:"span 2"},children:[a.jsx("label",{className:"form-label",htmlFor:"skill-name",children:"Skill Keyword Title *"}),a.jsx("input",{id:"skill-name",type:"text",name:"name",className:"form-control",placeholder:"e.g. Next.js",value:f.name,onChange:P,required:!0})]})}),a.jsxs("div",{className:"modal-footer",children:[a.jsx("button",{type:"button",className:"btn btn-secondary",onClick:()=>d(!1),disabled:m,children:"Cancel"}),a.jsx("button",{type:"submit",className:"btn btn-primary",disabled:m,children:m?a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"spinner",style:{borderTopColor:"#ffffff"}}),a.jsx("span",{children:"Saving Skill Tag..."})]}):a.jsx("span",{children:"Save Skill Tag"})})]})]})]})}),a.jsx("style",{children:`
        .company-management-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .management-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }

        .header-actions {
          display: flex;
          gap: 12px;
        }

        .header-info h2 {
          font-size: 24px;
          font-weight: 800;
        }

        .header-info p {
          font-size: 14px;
          color: var(--text-secondary);
          margin-top: 4px;
        }

        .filter-search-card {
          display: flex;
          align-items: center;
          padding: 16px 24px;
          background-color: var(--bg-secondary);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
        }

        .search-box {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
        }

        .search-icon {
          position: absolute;
          left: 14px;
          color: var(--text-tertiary);
        }

        .search-box input {
          width: 100%;
          height: 42px;
          background-color: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding-left: 44px;
          padding-right: 16px;
          color: var(--text-primary);
          transition: border-color var(--transition-fast);
        }

        .search-box input:focus {
          border-color: var(--primary);
        }
      `})]})},xv=()=>{const[e,t]=v.useState([]),[n,r]=v.useState(""),[s,l]=v.useState(!0),[i,o]=v.useState(!1),{showToast:c}=st(),[u,d]=v.useState(!1),[h,y]=v.useState("create"),[j,x]=v.useState(null),[m,w]=v.useState(!1),[f,p]=v.useState({state:"",city:""}),g=async(N=!1)=>{N||l(!0);try{const D=await $.get("/admin/locations");D.data.success&&t(D.data.data)}catch{c("Failed to retrieve locations list.","error")}finally{l(!1),o(!1)}};v.useEffect(()=>{g()},[]);const b=()=>{y("create"),p({state:"",city:""}),d(!0)},E=N=>{y("edit"),x(N),p({state:N.state||"",city:N.city||""}),d(!0)},P=N=>{const{name:D,value:U}=N.target;p(M=>({...M,[D]:U}))},_=async N=>{var D,U;if(N.preventDefault(),!f.state||!f.city){c("State and City are required.","warning");return}w(!0);try{let M;h==="create"?(M=await $.post("/admin/locations",f),M.data.success&&(c("Job location created successfully.","success"),d(!1),g(!0))):(M=await $.put(`/admin/locations/${j.id}`,f),M.data.success&&(c("Job location updated successfully.","success"),d(!1),g(!0)))}catch(M){c(((U=(D=M.response)==null?void 0:D.data)==null?void 0:U.message)||"Failed to save location details.","error")}finally{w(!1)}},C=async N=>{var D,U;if(window.confirm("Are you sure you want to delete this location? Jobs referencing this location will have their location reference cleared."))try{(await $.delete(`/admin/locations/${N}`)).data.success&&(c("Location deleted successfully.","success"),t(e.filter(ke=>ke.id!==N)))}catch(M){c(((U=(D=M.response)==null?void 0:D.data)==null?void 0:U.message)||"Failed to delete location.","error")}},I=()=>{o(!0),g(!0)},L=e.filter(N=>N.city.toLowerCase().includes(n.toLowerCase())||N.state.toLowerCase().includes(n.toLowerCase()));return a.jsxs("div",{className:"company-management-container animate-fade",children:[a.jsxs("div",{className:"management-header",children:[a.jsxs("div",{className:"header-info",children:[a.jsx("h2",{children:"📍 Geographic Locations Directory"}),a.jsx("p",{children:"Define state and city directories for filtering job listings geographically."})]}),a.jsxs("div",{className:"header-actions",children:[a.jsx("button",{className:"btn btn-secondary btn-refresh",onClick:I,disabled:i||s,children:a.jsx(Nt,{size:16,className:i?"spin-animation":""})}),a.jsxs("button",{className:"btn btn-primary",onClick:b,children:[a.jsx(Kr,{size:18}),a.jsx("span",{children:"Add Location"})]})]})]}),a.jsx("div",{className:"filter-search-card glass-card",children:a.jsxs("div",{className:"search-box",children:[a.jsx(ft,{size:18,className:"search-icon"}),a.jsx("input",{type:"text",placeholder:"Search locations by city or state...",value:n,onChange:N=>r(N.target.value)})]})}),s?a.jsx("div",{className:"directory-skeleton",children:a.jsxs("div",{className:"table-responsive-wrapper",children:[a.jsx("div",{className:"skeleton-header shimmer-wrapper"}),[1,2,3].map(N=>a.jsx("div",{className:"skeleton-row shimmer-wrapper"},N))]})}):L.length===0?a.jsxs("div",{className:"empty-state glass-card",children:[a.jsx(Hr,{size:48,className:"warning-icon"}),a.jsx("h3",{children:"No Locations Found"}),a.jsx("p",{children:'No locations match your search query. Click "Add Location" to register one.'})]}):a.jsx("div",{className:"table-responsive-wrapper glass-card",children:a.jsxs("table",{className:"admin-data-table",children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{children:"City Area"}),a.jsx("th",{children:"State Region"}),a.jsx("th",{children:"Registered On"}),a.jsx("th",{children:"Control Actions"})]})}),a.jsx("tbody",{children:L.map(N=>a.jsxs("tr",{children:[a.jsx("td",{children:a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px",fontWeight:700,color:"var(--text-primary)"},children:[a.jsx(Hr,{size:18,style:{color:"var(--primary)"}}),a.jsx("span",{children:N.city})]})}),a.jsx("td",{children:a.jsx("span",{style:{color:"var(--text-secondary)",fontWeight:600},children:N.state})}),a.jsx("td",{children:a.jsx("span",{style:{color:"var(--text-tertiary)",fontSize:"13.5px"},children:N.created_at?new Date(N.created_at).toLocaleDateString():"—"})}),a.jsx("td",{children:a.jsxs("div",{className:"btn-actions-row",children:[a.jsx("button",{className:"btn-icon-action",title:"Edit Location",onClick:()=>E(N),children:a.jsx(Xn,{size:15})}),a.jsx("button",{className:"btn-icon-action btn-icon-danger",title:"Delete Location",onClick:()=>C(N.id),children:a.jsx(un,{size:15})})]})})]},N.id))})]})}),u&&a.jsx("div",{className:"modal-backdrop animate-fade",children:a.jsxs("div",{className:"modal-content glass-card animate-slide-up",children:[a.jsxs("div",{className:"modal-header",children:[a.jsx("h3",{children:h==="create"?"📍 Add Geographic Location":"✏️ Edit Geographic Location"}),a.jsx("button",{className:"btn-close",onClick:()=>d(!1),children:a.jsx(Ct,{size:20})})]}),a.jsxs("form",{onSubmit:_,className:"modal-form-scrollable",children:[a.jsxs("div",{className:"modal-form-grid",children:[a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",htmlFor:"loc-city",children:"City Name *"}),a.jsx("input",{id:"loc-city",type:"text",name:"city",className:"form-control",placeholder:"e.g. Pune",value:f.city,onChange:P,required:!0})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",htmlFor:"loc-state",children:"State / Region *"}),a.jsx("input",{id:"loc-state",type:"text",name:"state",className:"form-control",placeholder:"e.g. Maharashtra",value:f.state,onChange:P,required:!0})]})]}),a.jsxs("div",{className:"modal-footer",children:[a.jsx("button",{type:"button",className:"btn btn-secondary",onClick:()=>d(!1),disabled:m,children:"Cancel"}),a.jsx("button",{type:"submit",className:"btn btn-primary",disabled:m,children:m?a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"spinner",style:{borderTopColor:"#ffffff"}}),a.jsx("span",{children:"Saving Location Details..."})]}):a.jsx("span",{children:"Save Location"})})]})]})]})}),a.jsx("style",{children:`
        .company-management-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .management-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }

        .header-actions {
          display: flex;
          gap: 12px;
        }

        .header-info h2 {
          font-size: 24px;
          font-weight: 800;
        }

        .header-info p {
          font-size: 14px;
          color: var(--text-secondary);
          margin-top: 4px;
        }

        .filter-search-card {
          display: flex;
          align-items: center;
          padding: 16px 24px;
          background-color: var(--bg-secondary);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
        }

        .search-box {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
        }

        .search-icon {
          position: absolute;
          left: 14px;
          color: var(--text-tertiary);
        }

        .search-box input {
          width: 100%;
          height: 42px;
          background-color: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding-left: 44px;
          padding-right: 16px;
          color: var(--text-primary);
          transition: border-color var(--transition-fast);
        }

        .search-box input:focus {
          border-color: var(--primary);
        }
      `})]})},yv=()=>{const[e,t]=v.useState([]),[n,r]=v.useState(""),[s,l]=v.useState(!0),[i,o]=v.useState(!1),{showToast:c}=st(),[u,d]=v.useState(!1),[h,y]=v.useState(null),[j,x]=v.useState(!1),[m,w]=v.useState({subject:"",body:""}),f=async(C=!1)=>{C||l(!0);try{const I=await $.get("/admin/templates");I.data.success&&t(I.data.data)}catch{c("Failed to retrieve email templates list.","error")}finally{l(!1),o(!1)}};v.useEffect(()=>{f()},[]);const p=C=>{y(C),w({subject:C.subject||"",body:C.body||""}),d(!0)},g=C=>{const{name:I,value:L}=C.target;w(N=>({...N,[I]:L}))},b=async C=>{var I,L;if(C.preventDefault(),!m.subject||!m.body){c("Subject and HTML Body details are required.","warning");return}x(!0);try{(await $.put(`/admin/templates/${h.id}`,m)).data.success&&(c("Email template modified successfully.","success"),d(!1),f(!0))}catch(N){c(((L=(I=N.response)==null?void 0:I.data)==null?void 0:L.message)||"Failed to update template records.","error")}finally{x(!1)}},E=()=>{o(!0),f(!0)},P=e.filter(C=>C.name.toLowerCase().includes(n.toLowerCase())||C.subject.toLowerCase().includes(n.toLowerCase())),_=C=>C.replace(/_/g," ").replace(/\b\w/g,I=>I.toUpperCase());return a.jsxs("div",{className:"company-management-container animate-fade",children:[a.jsxs("div",{className:"management-header",children:[a.jsxs("div",{className:"header-info",children:[a.jsx("h2",{children:"✉️ Notification Email Templates"}),a.jsx("p",{children:"Modify subject lines and HTML notification bodies dispatched to seekers or recruiters."})]}),a.jsx("div",{className:"header-actions",children:a.jsx("button",{className:"btn btn-secondary btn-refresh",onClick:E,disabled:i||s,children:a.jsx(Nt,{size:16,className:i?"spin-animation":""})})})]}),a.jsx("div",{className:"filter-search-card glass-card",children:a.jsxs("div",{className:"search-box",children:[a.jsx(ft,{size:18,className:"search-icon"}),a.jsx("input",{type:"text",placeholder:"Search email templates by name or subject...",value:n,onChange:C=>r(C.target.value)})]})}),s?a.jsx("div",{className:"directory-skeleton",children:a.jsxs("div",{className:"table-responsive-wrapper",children:[a.jsx("div",{className:"skeleton-header shimmer-wrapper"}),[1,2,3].map(C=>a.jsx("div",{className:"skeleton-row shimmer-wrapper"},C))]})}):P.length===0?a.jsxs("div",{className:"empty-state glass-card",children:[a.jsx($r,{size:48,className:"warning-icon"}),a.jsx("h3",{children:"No Templates Found"}),a.jsx("p",{children:"No email templates match your search filter criteria."})]}):a.jsx("div",{className:"table-responsive-wrapper glass-card",children:a.jsxs("table",{className:"admin-data-table",children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{children:"Template Identifier"}),a.jsx("th",{children:"Subject Line Header"}),a.jsx("th",{children:"Registered Date"}),a.jsx("th",{children:"Control Actions"})]})}),a.jsx("tbody",{children:P.map(C=>a.jsxs("tr",{children:[a.jsx("td",{children:a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px",fontWeight:700,color:"var(--text-primary)"},children:[a.jsx($r,{size:18,style:{color:"var(--primary)"}}),a.jsx("span",{children:_(C.name)})]})}),a.jsx("td",{children:a.jsx("span",{style:{color:"var(--text-secondary)",fontWeight:600,fontSize:"13.5px"},children:C.subject})}),a.jsx("td",{children:a.jsx("span",{style:{color:"var(--text-tertiary)",fontSize:"13.5px"},children:C.created_at?new Date(C.created_at).toLocaleDateString():"—"})}),a.jsx("td",{children:a.jsx("div",{className:"btn-actions-row",children:a.jsx("button",{className:"btn-icon-action",title:"Edit Template",onClick:()=>p(C),children:a.jsx(Xn,{size:15})})})})]},C.id))})]})}),u&&a.jsx("div",{className:"modal-backdrop animate-fade",children:a.jsxs("div",{className:"modal-content glass-card animate-slide-up",style:{maxWidth:"750px"},children:[a.jsxs("div",{className:"modal-header",children:[a.jsxs("h3",{children:["✏️ Edit Email Template: ",_(h.name)]}),a.jsx("button",{className:"btn-close",onClick:()=>d(!1),children:a.jsx(Ct,{size:20})})]}),a.jsxs("form",{onSubmit:b,className:"modal-form-scrollable",children:[a.jsxs("div",{className:"modal-form-grid",style:{gridTemplateColumns:"1fr"},children:[a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",htmlFor:"tpl-subject",children:"Email Subject *"}),a.jsx("input",{id:"tpl-subject",type:"text",name:"subject",className:"form-control",placeholder:"Subject line",value:m.subject,onChange:g,required:!0})]}),a.jsxs("div",{className:"form-group full-width-field",children:[a.jsx("label",{className:"form-label",htmlFor:"tpl-body",children:"HTML Body Content *"}),a.jsx("textarea",{id:"tpl-body",name:"body",className:"form-control form-textarea",placeholder:"HTML body contents...",value:m.body,onChange:g,rows:12,style:{fontFamily:"monospace",fontSize:"13px"},required:!0}),a.jsxs("div",{style:{marginTop:"8px",fontSize:"11px",color:"var(--text-tertiary)"},children:["Note: Supported template variables include: ",a.jsx("strong",{children:"{{name}}"}),", ",a.jsx("strong",{children:"{{link}}"}),", ",a.jsx("strong",{children:"{{job_title}}"}),", ",a.jsx("strong",{children:"{{company_name}}"}),"."]})]})]}),a.jsxs("div",{className:"modal-footer",children:[a.jsx("button",{type:"button",className:"btn btn-secondary",onClick:()=>d(!1),disabled:j,children:"Cancel"}),a.jsx("button",{type:"submit",className:"btn btn-primary",disabled:j,children:j?a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"spinner",style:{borderTopColor:"#ffffff"}}),a.jsx("span",{children:"Saving Template..."})]}):a.jsx("span",{children:"Save Template"})})]})]})]})}),a.jsx("style",{children:`
        .company-management-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .management-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }

        .header-actions {
          display: flex;
          gap: 12px;
        }

        .header-info h2 {
          font-size: 24px;
          font-weight: 800;
        }

        .header-info p {
          font-size: 14px;
          color: var(--text-secondary);
          margin-top: 4px;
        }

        .filter-search-card {
          display: flex;
          align-items: center;
          padding: 16px 24px;
          background-color: var(--bg-secondary);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
        }

        .search-box {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
        }

        .search-icon {
          position: absolute;
          left: 14px;
          color: var(--text-tertiary);
        }

        .search-box input {
          width: 100%;
          height: 42px;
          background-color: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding-left: 44px;
          padding-right: 16px;
          color: var(--text-primary);
          transition: border-color var(--transition-fast);
        }

        .search-box input:focus {
          border-color: var(--primary);
        }
      `})]})};function vv(){return a.jsx(Ig,{future:{v7_startTransition:!0,v7_relativeSplatPath:!0},children:a.jsx(mx,{children:a.jsx(Vg,{children:a.jsx(av,{children:a.jsxs(Pg,{children:[a.jsx(Te,{path:"/login",element:a.jsx(ov,{})}),a.jsxs(Te,{path:"/",element:a.jsx(lv,{children:a.jsx(iv,{})}),children:[a.jsx(Te,{index:!0,element:a.jsx(cv,{})}),a.jsx(Te,{path:"jobs",element:a.jsx(uv,{})}),a.jsx(Te,{path:"companies",element:a.jsx(dv,{})}),a.jsx(Te,{path:"users",element:a.jsx(fv,{})}),a.jsx(Te,{path:"applications",element:a.jsx(pv,{})}),a.jsx(Te,{path:"messages",element:a.jsx(hv,{})}),a.jsx(Te,{path:"categories",element:a.jsx(mv,{})}),a.jsx(Te,{path:"skills",element:a.jsx(gv,{})}),a.jsx(Te,{path:"locations",element:a.jsx(xv,{})}),a.jsx(Te,{path:"templates",element:a.jsx(yv,{})})]}),a.jsx(Te,{path:"*",element:a.jsx(Pf,{to:"/",replace:!0})})]})})})})})}gl.createRoot(document.getElementById("root")).render(a.jsx(xu.StrictMode,{children:a.jsx(vv,{})}));
