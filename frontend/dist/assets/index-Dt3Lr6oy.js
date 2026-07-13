function tm(e,t){for(var r=0;r<t.length;r++){const n=t[r];if(typeof n!="string"&&!Array.isArray(n)){for(const s in n)if(s!=="default"&&!(s in e)){const o=Object.getOwnPropertyDescriptor(n,s);o&&Object.defineProperty(e,s,o.get?o:{enumerable:!0,get:()=>n[s]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function r(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=r(s);fetch(s.href,o)}})();function rm(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Hd={exports:{}},Ts={},Vd={exports:{}},W={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ca=Symbol.for("react.element"),nm=Symbol.for("react.portal"),am=Symbol.for("react.fragment"),sm=Symbol.for("react.strict_mode"),om=Symbol.for("react.profiler"),im=Symbol.for("react.provider"),lm=Symbol.for("react.context"),cm=Symbol.for("react.forward_ref"),dm=Symbol.for("react.suspense"),um=Symbol.for("react.memo"),pm=Symbol.for("react.lazy"),sc=Symbol.iterator;function fm(e){return e===null||typeof e!="object"?null:(e=sc&&e[sc]||e["@@iterator"],typeof e=="function"?e:null)}var Wd={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Jd=Object.assign,qd={};function fn(e,t,r){this.props=e,this.context=t,this.refs=qd,this.updater=r||Wd}fn.prototype.isReactComponent={};fn.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};fn.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Yd(){}Yd.prototype=fn.prototype;function Hi(e,t,r){this.props=e,this.context=t,this.refs=qd,this.updater=r||Wd}var Vi=Hi.prototype=new Yd;Vi.constructor=Hi;Jd(Vi,fn.prototype);Vi.isPureReactComponent=!0;var oc=Array.isArray,Qd=Object.prototype.hasOwnProperty,Wi={current:null},Gd={key:!0,ref:!0,__self:!0,__source:!0};function Kd(e,t,r){var n,s={},o=null,i=null;if(t!=null)for(n in t.ref!==void 0&&(i=t.ref),t.key!==void 0&&(o=""+t.key),t)Qd.call(t,n)&&!Gd.hasOwnProperty(n)&&(s[n]=t[n]);var l=arguments.length-2;if(l===1)s.children=r;else if(1<l){for(var c=Array(l),d=0;d<l;d++)c[d]=arguments[d+2];s.children=c}if(e&&e.defaultProps)for(n in l=e.defaultProps,l)s[n]===void 0&&(s[n]=l[n]);return{$$typeof:ca,type:e,key:o,ref:i,props:s,_owner:Wi.current}}function mm(e,t){return{$$typeof:ca,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Ji(e){return typeof e=="object"&&e!==null&&e.$$typeof===ca}function hm(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(r){return t[r]})}var ic=/\/+/g;function so(e,t){return typeof e=="object"&&e!==null&&e.key!=null?hm(""+e.key):t.toString(36)}function Ha(e,t,r,n,s){var o=typeof e;(o==="undefined"||o==="boolean")&&(e=null);var i=!1;if(e===null)i=!0;else switch(o){case"string":case"number":i=!0;break;case"object":switch(e.$$typeof){case ca:case nm:i=!0}}if(i)return i=e,s=s(i),e=n===""?"."+so(i,0):n,oc(s)?(r="",e!=null&&(r=e.replace(ic,"$&/")+"/"),Ha(s,t,r,"",function(d){return d})):s!=null&&(Ji(s)&&(s=mm(s,r+(!s.key||i&&i.key===s.key?"":(""+s.key).replace(ic,"$&/")+"/")+e)),t.push(s)),1;if(i=0,n=n===""?".":n+":",oc(e))for(var l=0;l<e.length;l++){o=e[l];var c=n+so(o,l);i+=Ha(o,t,r,c,s)}else if(c=fm(e),typeof c=="function")for(e=c.call(e),l=0;!(o=e.next()).done;)o=o.value,c=n+so(o,l++),i+=Ha(o,t,r,c,s);else if(o==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return i}function Na(e,t,r){if(e==null)return e;var n=[],s=0;return Ha(e,n,"","",function(o){return t.call(r,o,s++)}),n}function xm(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(r){(e._status===0||e._status===-1)&&(e._status=1,e._result=r)},function(r){(e._status===0||e._status===-1)&&(e._status=2,e._result=r)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var Ie={current:null},Va={transition:null},gm={ReactCurrentDispatcher:Ie,ReactCurrentBatchConfig:Va,ReactCurrentOwner:Wi};function Xd(){throw Error("act(...) is not supported in production builds of React.")}W.Children={map:Na,forEach:function(e,t,r){Na(e,function(){t.apply(this,arguments)},r)},count:function(e){var t=0;return Na(e,function(){t++}),t},toArray:function(e){return Na(e,function(t){return t})||[]},only:function(e){if(!Ji(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};W.Component=fn;W.Fragment=am;W.Profiler=om;W.PureComponent=Hi;W.StrictMode=sm;W.Suspense=dm;W.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=gm;W.act=Xd;W.cloneElement=function(e,t,r){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var n=Jd({},e.props),s=e.key,o=e.ref,i=e._owner;if(t!=null){if(t.ref!==void 0&&(o=t.ref,i=Wi.current),t.key!==void 0&&(s=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(c in t)Qd.call(t,c)&&!Gd.hasOwnProperty(c)&&(n[c]=t[c]===void 0&&l!==void 0?l[c]:t[c])}var c=arguments.length-2;if(c===1)n.children=r;else if(1<c){l=Array(c);for(var d=0;d<c;d++)l[d]=arguments[d+2];n.children=l}return{$$typeof:ca,type:e.type,key:s,ref:o,props:n,_owner:i}};W.createContext=function(e){return e={$$typeof:lm,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:im,_context:e},e.Consumer=e};W.createElement=Kd;W.createFactory=function(e){var t=Kd.bind(null,e);return t.type=e,t};W.createRef=function(){return{current:null}};W.forwardRef=function(e){return{$$typeof:cm,render:e}};W.isValidElement=Ji;W.lazy=function(e){return{$$typeof:pm,_payload:{_status:-1,_result:e},_init:xm}};W.memo=function(e,t){return{$$typeof:um,type:e,compare:t===void 0?null:t}};W.startTransition=function(e){var t=Va.transition;Va.transition={};try{e()}finally{Va.transition=t}};W.unstable_act=Xd;W.useCallback=function(e,t){return Ie.current.useCallback(e,t)};W.useContext=function(e){return Ie.current.useContext(e)};W.useDebugValue=function(){};W.useDeferredValue=function(e){return Ie.current.useDeferredValue(e)};W.useEffect=function(e,t){return Ie.current.useEffect(e,t)};W.useId=function(){return Ie.current.useId()};W.useImperativeHandle=function(e,t,r){return Ie.current.useImperativeHandle(e,t,r)};W.useInsertionEffect=function(e,t){return Ie.current.useInsertionEffect(e,t)};W.useLayoutEffect=function(e,t){return Ie.current.useLayoutEffect(e,t)};W.useMemo=function(e,t){return Ie.current.useMemo(e,t)};W.useReducer=function(e,t,r){return Ie.current.useReducer(e,t,r)};W.useRef=function(e){return Ie.current.useRef(e)};W.useState=function(e){return Ie.current.useState(e)};W.useSyncExternalStore=function(e,t,r){return Ie.current.useSyncExternalStore(e,t,r)};W.useTransition=function(){return Ie.current.useTransition()};W.version="18.3.1";Vd.exports=W;var b=Vd.exports;const Zd=rm(b),vm=tm({__proto__:null,default:Zd},[b]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ym=b,bm=Symbol.for("react.element"),wm=Symbol.for("react.fragment"),jm=Object.prototype.hasOwnProperty,km=ym.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Nm={key:!0,ref:!0,__self:!0,__source:!0};function eu(e,t,r){var n,s={},o=null,i=null;r!==void 0&&(o=""+r),t.key!==void 0&&(o=""+t.key),t.ref!==void 0&&(i=t.ref);for(n in t)jm.call(t,n)&&!Nm.hasOwnProperty(n)&&(s[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps,t)s[n]===void 0&&(s[n]=t[n]);return{$$typeof:bm,type:e,key:o,ref:i,props:s,_owner:km.current}}Ts.Fragment=wm;Ts.jsx=eu;Ts.jsxs=eu;Hd.exports=Ts;var a=Hd.exports,Io={},tu={exports:{}},Ke={},ru={exports:{}},nu={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(P,F){var O=P.length;P.push(F);e:for(;0<O;){var I=O-1>>>1,V=P[I];if(0<s(V,F))P[I]=F,P[O]=V,O=I;else break e}}function r(P){return P.length===0?null:P[0]}function n(P){if(P.length===0)return null;var F=P[0],O=P.pop();if(O!==F){P[0]=O;e:for(var I=0,V=P.length,Z=V>>>1;I<Z;){var xe=2*(I+1)-1,H=P[xe],le=xe+1,me=P[le];if(0>s(H,O))le<V&&0>s(me,H)?(P[I]=me,P[le]=O,I=le):(P[I]=H,P[xe]=O,I=xe);else if(le<V&&0>s(me,O))P[I]=me,P[le]=O,I=le;else break e}}return F}function s(P,F){var O=P.sortIndex-F.sortIndex;return O!==0?O:P.id-F.id}if(typeof performance=="object"&&typeof performance.now=="function"){var o=performance;e.unstable_now=function(){return o.now()}}else{var i=Date,l=i.now();e.unstable_now=function(){return i.now()-l}}var c=[],d=[],u=1,f=null,g=3,w=!1,h=!1,y=!1,j=typeof setTimeout=="function"?setTimeout:null,p=typeof clearTimeout=="function"?clearTimeout:null,m=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function x(P){for(var F=r(d);F!==null;){if(F.callback===null)n(d);else if(F.startTime<=P)n(d),F.sortIndex=F.expirationTime,t(c,F);else break;F=r(d)}}function v(P){if(y=!1,x(P),!h)if(r(c)!==null)h=!0,Ce(N);else{var F=r(d);F!==null&&we(v,F.startTime-P)}}function N(P,F){h=!1,y&&(y=!1,p(R),R=-1),w=!0;var O=g;try{for(x(F),f=r(c);f!==null&&(!(f.expirationTime>F)||P&&!Q());){var I=f.callback;if(typeof I=="function"){f.callback=null,g=f.priorityLevel;var V=I(f.expirationTime<=F);F=e.unstable_now(),typeof V=="function"?f.callback=V:f===r(c)&&n(c),x(F)}else n(c);f=r(c)}if(f!==null)var Z=!0;else{var xe=r(d);xe!==null&&we(v,xe.startTime-F),Z=!1}return Z}finally{f=null,g=O,w=!1}}var C=!1,_=null,R=-1,D=5,A=-1;function Q(){return!(e.unstable_now()-A<D)}function de(){if(_!==null){var P=e.unstable_now();A=P;var F=!0;try{F=_(!0,P)}finally{F?ne():(C=!1,_=null)}}else C=!1}var ne;if(typeof m=="function")ne=function(){m(de)};else if(typeof MessageChannel<"u"){var X=new MessageChannel,ct=X.port2;X.port1.onmessage=de,ne=function(){ct.postMessage(null)}}else ne=function(){j(de,0)};function Ce(P){_=P,C||(C=!0,ne())}function we(P,F){R=j(function(){P(e.unstable_now())},F)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(P){P.callback=null},e.unstable_continueExecution=function(){h||w||(h=!0,Ce(N))},e.unstable_forceFrameRate=function(P){0>P||125<P?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):D=0<P?Math.floor(1e3/P):5},e.unstable_getCurrentPriorityLevel=function(){return g},e.unstable_getFirstCallbackNode=function(){return r(c)},e.unstable_next=function(P){switch(g){case 1:case 2:case 3:var F=3;break;default:F=g}var O=g;g=F;try{return P()}finally{g=O}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(P,F){switch(P){case 1:case 2:case 3:case 4:case 5:break;default:P=3}var O=g;g=P;try{return F()}finally{g=O}},e.unstable_scheduleCallback=function(P,F,O){var I=e.unstable_now();switch(typeof O=="object"&&O!==null?(O=O.delay,O=typeof O=="number"&&0<O?I+O:I):O=I,P){case 1:var V=-1;break;case 2:V=250;break;case 5:V=1073741823;break;case 4:V=1e4;break;default:V=5e3}return V=O+V,P={id:u++,callback:F,priorityLevel:P,startTime:O,expirationTime:V,sortIndex:-1},O>I?(P.sortIndex=O,t(d,P),r(c)===null&&P===r(d)&&(y?(p(R),R=-1):y=!0,we(v,O-I))):(P.sortIndex=V,t(c,P),h||w||(h=!0,Ce(N))),P},e.unstable_shouldYield=Q,e.unstable_wrapCallback=function(P){var F=g;return function(){var O=g;g=F;try{return P.apply(this,arguments)}finally{g=O}}}})(nu);ru.exports=nu;var Sm=ru.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Cm=b,Ge=Sm;function z(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=1;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var au=new Set,Hn={};function Lr(e,t){nn(e,t),nn(e+"Capture",t)}function nn(e,t){for(Hn[e]=t,e=0;e<t.length;e++)au.add(t[e])}var Ft=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Uo=Object.prototype.hasOwnProperty,Em=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,lc={},cc={};function _m(e){return Uo.call(cc,e)?!0:Uo.call(lc,e)?!1:Em.test(e)?cc[e]=!0:(lc[e]=!0,!1)}function zm(e,t,r,n){if(r!==null&&r.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return n?!1:r!==null?!r.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Rm(e,t,r,n){if(t===null||typeof t>"u"||zm(e,t,r,n))return!0;if(n)return!1;if(r!==null)switch(r.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function Ue(e,t,r,n,s,o,i){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=n,this.attributeNamespace=s,this.mustUseProperty=r,this.propertyName=e,this.type=t,this.sanitizeURL=o,this.removeEmptyString=i}var ze={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){ze[e]=new Ue(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];ze[t]=new Ue(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){ze[e]=new Ue(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){ze[e]=new Ue(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){ze[e]=new Ue(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){ze[e]=new Ue(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){ze[e]=new Ue(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){ze[e]=new Ue(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){ze[e]=new Ue(e,5,!1,e.toLowerCase(),null,!1,!1)});var qi=/[\-:]([a-z])/g;function Yi(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(qi,Yi);ze[t]=new Ue(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(qi,Yi);ze[t]=new Ue(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(qi,Yi);ze[t]=new Ue(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){ze[e]=new Ue(e,1,!1,e.toLowerCase(),null,!1,!1)});ze.xlinkHref=new Ue("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){ze[e]=new Ue(e,1,!1,e.toLowerCase(),null,!0,!0)});function Qi(e,t,r,n){var s=ze.hasOwnProperty(t)?ze[t]:null;(s!==null?s.type!==0:n||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Rm(t,r,s,n)&&(r=null),n||s===null?_m(t)&&(r===null?e.removeAttribute(t):e.setAttribute(t,""+r)):s.mustUseProperty?e[s.propertyName]=r===null?s.type===3?!1:"":r:(t=s.attributeName,n=s.attributeNamespace,r===null?e.removeAttribute(t):(s=s.type,r=s===3||s===4&&r===!0?"":""+r,n?e.setAttributeNS(n,t,r):e.setAttribute(t,r))))}var Bt=Cm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Sa=Symbol.for("react.element"),Fr=Symbol.for("react.portal"),Mr=Symbol.for("react.fragment"),Gi=Symbol.for("react.strict_mode"),Bo=Symbol.for("react.profiler"),su=Symbol.for("react.provider"),ou=Symbol.for("react.context"),Ki=Symbol.for("react.forward_ref"),$o=Symbol.for("react.suspense"),Ho=Symbol.for("react.suspense_list"),Xi=Symbol.for("react.memo"),Qt=Symbol.for("react.lazy"),iu=Symbol.for("react.offscreen"),dc=Symbol.iterator;function yn(e){return e===null||typeof e!="object"?null:(e=dc&&e[dc]||e["@@iterator"],typeof e=="function"?e:null)}var fe=Object.assign,oo;function _n(e){if(oo===void 0)try{throw Error()}catch(r){var t=r.stack.trim().match(/\n( *(at )?)/);oo=t&&t[1]||""}return`
`+oo+e}var io=!1;function lo(e,t){if(!e||io)return"";io=!0;var r=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(d){var n=d}Reflect.construct(e,[],t)}else{try{t.call()}catch(d){n=d}e.call(t.prototype)}else{try{throw Error()}catch(d){n=d}e()}}catch(d){if(d&&n&&typeof d.stack=="string"){for(var s=d.stack.split(`
`),o=n.stack.split(`
`),i=s.length-1,l=o.length-1;1<=i&&0<=l&&s[i]!==o[l];)l--;for(;1<=i&&0<=l;i--,l--)if(s[i]!==o[l]){if(i!==1||l!==1)do if(i--,l--,0>l||s[i]!==o[l]){var c=`
`+s[i].replace(" at new "," at ");return e.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",e.displayName)),c}while(1<=i&&0<=l);break}}}finally{io=!1,Error.prepareStackTrace=r}return(e=e?e.displayName||e.name:"")?_n(e):""}function Pm(e){switch(e.tag){case 5:return _n(e.type);case 16:return _n("Lazy");case 13:return _n("Suspense");case 19:return _n("SuspenseList");case 0:case 2:case 15:return e=lo(e.type,!1),e;case 11:return e=lo(e.type.render,!1),e;case 1:return e=lo(e.type,!0),e;default:return""}}function Vo(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Mr:return"Fragment";case Fr:return"Portal";case Bo:return"Profiler";case Gi:return"StrictMode";case $o:return"Suspense";case Ho:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case ou:return(e.displayName||"Context")+".Consumer";case su:return(e._context.displayName||"Context")+".Provider";case Ki:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Xi:return t=e.displayName||null,t!==null?t:Vo(e.type)||"Memo";case Qt:t=e._payload,e=e._init;try{return Vo(e(t))}catch{}}return null}function Tm(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Vo(t);case 8:return t===Gi?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function ur(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function lu(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Lm(e){var t=lu(e)?"checked":"value",r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),n=""+e[t];if(!e.hasOwnProperty(t)&&typeof r<"u"&&typeof r.get=="function"&&typeof r.set=="function"){var s=r.get,o=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return s.call(this)},set:function(i){n=""+i,o.call(this,i)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(i){n=""+i},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Ca(e){e._valueTracker||(e._valueTracker=Lm(e))}function cu(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var r=t.getValue(),n="";return e&&(n=lu(e)?e.checked?"true":"false":e.value),e=n,e!==r?(t.setValue(e),!0):!1}function as(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Wo(e,t){var r=t.checked;return fe({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:r??e._wrapperState.initialChecked})}function uc(e,t){var r=t.defaultValue==null?"":t.defaultValue,n=t.checked!=null?t.checked:t.defaultChecked;r=ur(t.value!=null?t.value:r),e._wrapperState={initialChecked:n,initialValue:r,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function du(e,t){t=t.checked,t!=null&&Qi(e,"checked",t,!1)}function Jo(e,t){du(e,t);var r=ur(t.value),n=t.type;if(r!=null)n==="number"?(r===0&&e.value===""||e.value!=r)&&(e.value=""+r):e.value!==""+r&&(e.value=""+r);else if(n==="submit"||n==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?qo(e,t.type,r):t.hasOwnProperty("defaultValue")&&qo(e,t.type,ur(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function pc(e,t,r){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var n=t.type;if(!(n!=="submit"&&n!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,r||t===e.value||(e.value=t),e.defaultValue=t}r=e.name,r!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,r!==""&&(e.name=r)}function qo(e,t,r){(t!=="number"||as(e.ownerDocument)!==e)&&(r==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+r&&(e.defaultValue=""+r))}var zn=Array.isArray;function Gr(e,t,r,n){if(e=e.options,t){t={};for(var s=0;s<r.length;s++)t["$"+r[s]]=!0;for(r=0;r<e.length;r++)s=t.hasOwnProperty("$"+e[r].value),e[r].selected!==s&&(e[r].selected=s),s&&n&&(e[r].defaultSelected=!0)}else{for(r=""+ur(r),t=null,s=0;s<e.length;s++){if(e[s].value===r){e[s].selected=!0,n&&(e[s].defaultSelected=!0);return}t!==null||e[s].disabled||(t=e[s])}t!==null&&(t.selected=!0)}}function Yo(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(z(91));return fe({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function fc(e,t){var r=t.value;if(r==null){if(r=t.children,t=t.defaultValue,r!=null){if(t!=null)throw Error(z(92));if(zn(r)){if(1<r.length)throw Error(z(93));r=r[0]}t=r}t==null&&(t=""),r=t}e._wrapperState={initialValue:ur(r)}}function uu(e,t){var r=ur(t.value),n=ur(t.defaultValue);r!=null&&(r=""+r,r!==e.value&&(e.value=r),t.defaultValue==null&&e.defaultValue!==r&&(e.defaultValue=r)),n!=null&&(e.defaultValue=""+n)}function mc(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function pu(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Qo(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?pu(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Ea,fu=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,r,n,s){MSApp.execUnsafeLocalFunction(function(){return e(t,r,n,s)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Ea=Ea||document.createElement("div"),Ea.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Ea.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Vn(e,t){if(t){var r=e.firstChild;if(r&&r===e.lastChild&&r.nodeType===3){r.nodeValue=t;return}}e.textContent=t}var Tn={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Om=["Webkit","ms","Moz","O"];Object.keys(Tn).forEach(function(e){Om.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Tn[t]=Tn[e]})});function mu(e,t,r){return t==null||typeof t=="boolean"||t===""?"":r||typeof t!="number"||t===0||Tn.hasOwnProperty(e)&&Tn[e]?(""+t).trim():t+"px"}function hu(e,t){e=e.style;for(var r in t)if(t.hasOwnProperty(r)){var n=r.indexOf("--")===0,s=mu(r,t[r],n);r==="float"&&(r="cssFloat"),n?e.setProperty(r,s):e[r]=s}}var Am=fe({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Go(e,t){if(t){if(Am[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(z(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(z(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(z(61))}if(t.style!=null&&typeof t.style!="object")throw Error(z(62))}}function Ko(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Xo=null;function Zi(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Zo=null,Kr=null,Xr=null;function hc(e){if(e=pa(e)){if(typeof Zo!="function")throw Error(z(280));var t=e.stateNode;t&&(t=Fs(t),Zo(e.stateNode,e.type,t))}}function xu(e){Kr?Xr?Xr.push(e):Xr=[e]:Kr=e}function gu(){if(Kr){var e=Kr,t=Xr;if(Xr=Kr=null,hc(e),t)for(e=0;e<t.length;e++)hc(t[e])}}function vu(e,t){return e(t)}function yu(){}var co=!1;function bu(e,t,r){if(co)return e(t,r);co=!0;try{return vu(e,t,r)}finally{co=!1,(Kr!==null||Xr!==null)&&(yu(),gu())}}function Wn(e,t){var r=e.stateNode;if(r===null)return null;var n=Fs(r);if(n===null)return null;r=n[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(n=!n.disabled)||(e=e.type,n=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!n;break e;default:e=!1}if(e)return null;if(r&&typeof r!="function")throw Error(z(231,t,typeof r));return r}var ei=!1;if(Ft)try{var bn={};Object.defineProperty(bn,"passive",{get:function(){ei=!0}}),window.addEventListener("test",bn,bn),window.removeEventListener("test",bn,bn)}catch{ei=!1}function Dm(e,t,r,n,s,o,i,l,c){var d=Array.prototype.slice.call(arguments,3);try{t.apply(r,d)}catch(u){this.onError(u)}}var Ln=!1,ss=null,os=!1,ti=null,Fm={onError:function(e){Ln=!0,ss=e}};function Mm(e,t,r,n,s,o,i,l,c){Ln=!1,ss=null,Dm.apply(Fm,arguments)}function Im(e,t,r,n,s,o,i,l,c){if(Mm.apply(this,arguments),Ln){if(Ln){var d=ss;Ln=!1,ss=null}else throw Error(z(198));os||(os=!0,ti=d)}}function Or(e){var t=e,r=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(r=t.return),e=t.return;while(e)}return t.tag===3?r:null}function wu(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function xc(e){if(Or(e)!==e)throw Error(z(188))}function Um(e){var t=e.alternate;if(!t){if(t=Or(e),t===null)throw Error(z(188));return t!==e?null:e}for(var r=e,n=t;;){var s=r.return;if(s===null)break;var o=s.alternate;if(o===null){if(n=s.return,n!==null){r=n;continue}break}if(s.child===o.child){for(o=s.child;o;){if(o===r)return xc(s),e;if(o===n)return xc(s),t;o=o.sibling}throw Error(z(188))}if(r.return!==n.return)r=s,n=o;else{for(var i=!1,l=s.child;l;){if(l===r){i=!0,r=s,n=o;break}if(l===n){i=!0,n=s,r=o;break}l=l.sibling}if(!i){for(l=o.child;l;){if(l===r){i=!0,r=o,n=s;break}if(l===n){i=!0,n=o,r=s;break}l=l.sibling}if(!i)throw Error(z(189))}}if(r.alternate!==n)throw Error(z(190))}if(r.tag!==3)throw Error(z(188));return r.stateNode.current===r?e:t}function ju(e){return e=Um(e),e!==null?ku(e):null}function ku(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=ku(e);if(t!==null)return t;e=e.sibling}return null}var Nu=Ge.unstable_scheduleCallback,gc=Ge.unstable_cancelCallback,Bm=Ge.unstable_shouldYield,$m=Ge.unstable_requestPaint,ve=Ge.unstable_now,Hm=Ge.unstable_getCurrentPriorityLevel,el=Ge.unstable_ImmediatePriority,Su=Ge.unstable_UserBlockingPriority,is=Ge.unstable_NormalPriority,Vm=Ge.unstable_LowPriority,Cu=Ge.unstable_IdlePriority,Ls=null,Et=null;function Wm(e){if(Et&&typeof Et.onCommitFiberRoot=="function")try{Et.onCommitFiberRoot(Ls,e,void 0,(e.current.flags&128)===128)}catch{}}var gt=Math.clz32?Math.clz32:Ym,Jm=Math.log,qm=Math.LN2;function Ym(e){return e>>>=0,e===0?32:31-(Jm(e)/qm|0)|0}var _a=64,za=4194304;function Rn(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function ls(e,t){var r=e.pendingLanes;if(r===0)return 0;var n=0,s=e.suspendedLanes,o=e.pingedLanes,i=r&268435455;if(i!==0){var l=i&~s;l!==0?n=Rn(l):(o&=i,o!==0&&(n=Rn(o)))}else i=r&~s,i!==0?n=Rn(i):o!==0&&(n=Rn(o));if(n===0)return 0;if(t!==0&&t!==n&&!(t&s)&&(s=n&-n,o=t&-t,s>=o||s===16&&(o&4194240)!==0))return t;if(n&4&&(n|=r&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=n;0<t;)r=31-gt(t),s=1<<r,n|=e[r],t&=~s;return n}function Qm(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Gm(e,t){for(var r=e.suspendedLanes,n=e.pingedLanes,s=e.expirationTimes,o=e.pendingLanes;0<o;){var i=31-gt(o),l=1<<i,c=s[i];c===-1?(!(l&r)||l&n)&&(s[i]=Qm(l,t)):c<=t&&(e.expiredLanes|=l),o&=~l}}function ri(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Eu(){var e=_a;return _a<<=1,!(_a&4194240)&&(_a=64),e}function uo(e){for(var t=[],r=0;31>r;r++)t.push(e);return t}function da(e,t,r){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-gt(t),e[t]=r}function Km(e,t){var r=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var n=e.eventTimes;for(e=e.expirationTimes;0<r;){var s=31-gt(r),o=1<<s;t[s]=0,n[s]=-1,e[s]=-1,r&=~o}}function tl(e,t){var r=e.entangledLanes|=t;for(e=e.entanglements;r;){var n=31-gt(r),s=1<<n;s&t|e[n]&t&&(e[n]|=t),r&=~s}}var K=0;function _u(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var zu,rl,Ru,Pu,Tu,ni=!1,Ra=[],rr=null,nr=null,ar=null,Jn=new Map,qn=new Map,Kt=[],Xm="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function vc(e,t){switch(e){case"focusin":case"focusout":rr=null;break;case"dragenter":case"dragleave":nr=null;break;case"mouseover":case"mouseout":ar=null;break;case"pointerover":case"pointerout":Jn.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":qn.delete(t.pointerId)}}function wn(e,t,r,n,s,o){return e===null||e.nativeEvent!==o?(e={blockedOn:t,domEventName:r,eventSystemFlags:n,nativeEvent:o,targetContainers:[s]},t!==null&&(t=pa(t),t!==null&&rl(t)),e):(e.eventSystemFlags|=n,t=e.targetContainers,s!==null&&t.indexOf(s)===-1&&t.push(s),e)}function Zm(e,t,r,n,s){switch(t){case"focusin":return rr=wn(rr,e,t,r,n,s),!0;case"dragenter":return nr=wn(nr,e,t,r,n,s),!0;case"mouseover":return ar=wn(ar,e,t,r,n,s),!0;case"pointerover":var o=s.pointerId;return Jn.set(o,wn(Jn.get(o)||null,e,t,r,n,s)),!0;case"gotpointercapture":return o=s.pointerId,qn.set(o,wn(qn.get(o)||null,e,t,r,n,s)),!0}return!1}function Lu(e){var t=br(e.target);if(t!==null){var r=Or(t);if(r!==null){if(t=r.tag,t===13){if(t=wu(r),t!==null){e.blockedOn=t,Tu(e.priority,function(){Ru(r)});return}}else if(t===3&&r.stateNode.current.memoizedState.isDehydrated){e.blockedOn=r.tag===3?r.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Wa(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var r=ai(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(r===null){r=e.nativeEvent;var n=new r.constructor(r.type,r);Xo=n,r.target.dispatchEvent(n),Xo=null}else return t=pa(r),t!==null&&rl(t),e.blockedOn=r,!1;t.shift()}return!0}function yc(e,t,r){Wa(e)&&r.delete(t)}function eh(){ni=!1,rr!==null&&Wa(rr)&&(rr=null),nr!==null&&Wa(nr)&&(nr=null),ar!==null&&Wa(ar)&&(ar=null),Jn.forEach(yc),qn.forEach(yc)}function jn(e,t){e.blockedOn===t&&(e.blockedOn=null,ni||(ni=!0,Ge.unstable_scheduleCallback(Ge.unstable_NormalPriority,eh)))}function Yn(e){function t(s){return jn(s,e)}if(0<Ra.length){jn(Ra[0],e);for(var r=1;r<Ra.length;r++){var n=Ra[r];n.blockedOn===e&&(n.blockedOn=null)}}for(rr!==null&&jn(rr,e),nr!==null&&jn(nr,e),ar!==null&&jn(ar,e),Jn.forEach(t),qn.forEach(t),r=0;r<Kt.length;r++)n=Kt[r],n.blockedOn===e&&(n.blockedOn=null);for(;0<Kt.length&&(r=Kt[0],r.blockedOn===null);)Lu(r),r.blockedOn===null&&Kt.shift()}var Zr=Bt.ReactCurrentBatchConfig,cs=!0;function th(e,t,r,n){var s=K,o=Zr.transition;Zr.transition=null;try{K=1,nl(e,t,r,n)}finally{K=s,Zr.transition=o}}function rh(e,t,r,n){var s=K,o=Zr.transition;Zr.transition=null;try{K=4,nl(e,t,r,n)}finally{K=s,Zr.transition=o}}function nl(e,t,r,n){if(cs){var s=ai(e,t,r,n);if(s===null)wo(e,t,n,ds,r),vc(e,n);else if(Zm(s,e,t,r,n))n.stopPropagation();else if(vc(e,n),t&4&&-1<Xm.indexOf(e)){for(;s!==null;){var o=pa(s);if(o!==null&&zu(o),o=ai(e,t,r,n),o===null&&wo(e,t,n,ds,r),o===s)break;s=o}s!==null&&n.stopPropagation()}else wo(e,t,n,null,r)}}var ds=null;function ai(e,t,r,n){if(ds=null,e=Zi(n),e=br(e),e!==null)if(t=Or(e),t===null)e=null;else if(r=t.tag,r===13){if(e=wu(t),e!==null)return e;e=null}else if(r===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return ds=e,null}function Ou(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Hm()){case el:return 1;case Su:return 4;case is:case Vm:return 16;case Cu:return 536870912;default:return 16}default:return 16}}var Zt=null,al=null,Ja=null;function Au(){if(Ja)return Ja;var e,t=al,r=t.length,n,s="value"in Zt?Zt.value:Zt.textContent,o=s.length;for(e=0;e<r&&t[e]===s[e];e++);var i=r-e;for(n=1;n<=i&&t[r-n]===s[o-n];n++);return Ja=s.slice(e,1<n?1-n:void 0)}function qa(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Pa(){return!0}function bc(){return!1}function Xe(e){function t(r,n,s,o,i){this._reactName=r,this._targetInst=s,this.type=n,this.nativeEvent=o,this.target=i,this.currentTarget=null;for(var l in e)e.hasOwnProperty(l)&&(r=e[l],this[l]=r?r(o):o[l]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?Pa:bc,this.isPropagationStopped=bc,this}return fe(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var r=this.nativeEvent;r&&(r.preventDefault?r.preventDefault():typeof r.returnValue!="unknown"&&(r.returnValue=!1),this.isDefaultPrevented=Pa)},stopPropagation:function(){var r=this.nativeEvent;r&&(r.stopPropagation?r.stopPropagation():typeof r.cancelBubble!="unknown"&&(r.cancelBubble=!0),this.isPropagationStopped=Pa)},persist:function(){},isPersistent:Pa}),t}var mn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},sl=Xe(mn),ua=fe({},mn,{view:0,detail:0}),nh=Xe(ua),po,fo,kn,Os=fe({},ua,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ol,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==kn&&(kn&&e.type==="mousemove"?(po=e.screenX-kn.screenX,fo=e.screenY-kn.screenY):fo=po=0,kn=e),po)},movementY:function(e){return"movementY"in e?e.movementY:fo}}),wc=Xe(Os),ah=fe({},Os,{dataTransfer:0}),sh=Xe(ah),oh=fe({},ua,{relatedTarget:0}),mo=Xe(oh),ih=fe({},mn,{animationName:0,elapsedTime:0,pseudoElement:0}),lh=Xe(ih),ch=fe({},mn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),dh=Xe(ch),uh=fe({},mn,{data:0}),jc=Xe(uh),ph={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},fh={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},mh={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function hh(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=mh[e])?!!t[e]:!1}function ol(){return hh}var xh=fe({},ua,{key:function(e){if(e.key){var t=ph[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=qa(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?fh[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ol,charCode:function(e){return e.type==="keypress"?qa(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?qa(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),gh=Xe(xh),vh=fe({},Os,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),kc=Xe(vh),yh=fe({},ua,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ol}),bh=Xe(yh),wh=fe({},mn,{propertyName:0,elapsedTime:0,pseudoElement:0}),jh=Xe(wh),kh=fe({},Os,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Nh=Xe(kh),Sh=[9,13,27,32],il=Ft&&"CompositionEvent"in window,On=null;Ft&&"documentMode"in document&&(On=document.documentMode);var Ch=Ft&&"TextEvent"in window&&!On,Du=Ft&&(!il||On&&8<On&&11>=On),Nc=" ",Sc=!1;function Fu(e,t){switch(e){case"keyup":return Sh.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Mu(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Ir=!1;function Eh(e,t){switch(e){case"compositionend":return Mu(t);case"keypress":return t.which!==32?null:(Sc=!0,Nc);case"textInput":return e=t.data,e===Nc&&Sc?null:e;default:return null}}function _h(e,t){if(Ir)return e==="compositionend"||!il&&Fu(e,t)?(e=Au(),Ja=al=Zt=null,Ir=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Du&&t.locale!=="ko"?null:t.data;default:return null}}var zh={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Cc(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!zh[e.type]:t==="textarea"}function Iu(e,t,r,n){xu(n),t=us(t,"onChange"),0<t.length&&(r=new sl("onChange","change",null,r,n),e.push({event:r,listeners:t}))}var An=null,Qn=null;function Rh(e){Gu(e,0)}function As(e){var t=$r(e);if(cu(t))return e}function Ph(e,t){if(e==="change")return t}var Uu=!1;if(Ft){var ho;if(Ft){var xo="oninput"in document;if(!xo){var Ec=document.createElement("div");Ec.setAttribute("oninput","return;"),xo=typeof Ec.oninput=="function"}ho=xo}else ho=!1;Uu=ho&&(!document.documentMode||9<document.documentMode)}function _c(){An&&(An.detachEvent("onpropertychange",Bu),Qn=An=null)}function Bu(e){if(e.propertyName==="value"&&As(Qn)){var t=[];Iu(t,Qn,e,Zi(e)),bu(Rh,t)}}function Th(e,t,r){e==="focusin"?(_c(),An=t,Qn=r,An.attachEvent("onpropertychange",Bu)):e==="focusout"&&_c()}function Lh(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return As(Qn)}function Oh(e,t){if(e==="click")return As(t)}function Ah(e,t){if(e==="input"||e==="change")return As(t)}function Dh(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var yt=typeof Object.is=="function"?Object.is:Dh;function Gn(e,t){if(yt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var r=Object.keys(e),n=Object.keys(t);if(r.length!==n.length)return!1;for(n=0;n<r.length;n++){var s=r[n];if(!Uo.call(t,s)||!yt(e[s],t[s]))return!1}return!0}function zc(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Rc(e,t){var r=zc(e);e=0;for(var n;r;){if(r.nodeType===3){if(n=e+r.textContent.length,e<=t&&n>=t)return{node:r,offset:t-e};e=n}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=zc(r)}}function $u(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?$u(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Hu(){for(var e=window,t=as();t instanceof e.HTMLIFrameElement;){try{var r=typeof t.contentWindow.location.href=="string"}catch{r=!1}if(r)e=t.contentWindow;else break;t=as(e.document)}return t}function ll(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Fh(e){var t=Hu(),r=e.focusedElem,n=e.selectionRange;if(t!==r&&r&&r.ownerDocument&&$u(r.ownerDocument.documentElement,r)){if(n!==null&&ll(r)){if(t=n.start,e=n.end,e===void 0&&(e=t),"selectionStart"in r)r.selectionStart=t,r.selectionEnd=Math.min(e,r.value.length);else if(e=(t=r.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var s=r.textContent.length,o=Math.min(n.start,s);n=n.end===void 0?o:Math.min(n.end,s),!e.extend&&o>n&&(s=n,n=o,o=s),s=Rc(r,o);var i=Rc(r,n);s&&i&&(e.rangeCount!==1||e.anchorNode!==s.node||e.anchorOffset!==s.offset||e.focusNode!==i.node||e.focusOffset!==i.offset)&&(t=t.createRange(),t.setStart(s.node,s.offset),e.removeAllRanges(),o>n?(e.addRange(t),e.extend(i.node,i.offset)):(t.setEnd(i.node,i.offset),e.addRange(t)))}}for(t=[],e=r;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof r.focus=="function"&&r.focus(),r=0;r<t.length;r++)e=t[r],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Mh=Ft&&"documentMode"in document&&11>=document.documentMode,Ur=null,si=null,Dn=null,oi=!1;function Pc(e,t,r){var n=r.window===r?r.document:r.nodeType===9?r:r.ownerDocument;oi||Ur==null||Ur!==as(n)||(n=Ur,"selectionStart"in n&&ll(n)?n={start:n.selectionStart,end:n.selectionEnd}:(n=(n.ownerDocument&&n.ownerDocument.defaultView||window).getSelection(),n={anchorNode:n.anchorNode,anchorOffset:n.anchorOffset,focusNode:n.focusNode,focusOffset:n.focusOffset}),Dn&&Gn(Dn,n)||(Dn=n,n=us(si,"onSelect"),0<n.length&&(t=new sl("onSelect","select",null,t,r),e.push({event:t,listeners:n}),t.target=Ur)))}function Ta(e,t){var r={};return r[e.toLowerCase()]=t.toLowerCase(),r["Webkit"+e]="webkit"+t,r["Moz"+e]="moz"+t,r}var Br={animationend:Ta("Animation","AnimationEnd"),animationiteration:Ta("Animation","AnimationIteration"),animationstart:Ta("Animation","AnimationStart"),transitionend:Ta("Transition","TransitionEnd")},go={},Vu={};Ft&&(Vu=document.createElement("div").style,"AnimationEvent"in window||(delete Br.animationend.animation,delete Br.animationiteration.animation,delete Br.animationstart.animation),"TransitionEvent"in window||delete Br.transitionend.transition);function Ds(e){if(go[e])return go[e];if(!Br[e])return e;var t=Br[e],r;for(r in t)if(t.hasOwnProperty(r)&&r in Vu)return go[e]=t[r];return e}var Wu=Ds("animationend"),Ju=Ds("animationiteration"),qu=Ds("animationstart"),Yu=Ds("transitionend"),Qu=new Map,Tc="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function fr(e,t){Qu.set(e,t),Lr(t,[e])}for(var vo=0;vo<Tc.length;vo++){var yo=Tc[vo],Ih=yo.toLowerCase(),Uh=yo[0].toUpperCase()+yo.slice(1);fr(Ih,"on"+Uh)}fr(Wu,"onAnimationEnd");fr(Ju,"onAnimationIteration");fr(qu,"onAnimationStart");fr("dblclick","onDoubleClick");fr("focusin","onFocus");fr("focusout","onBlur");fr(Yu,"onTransitionEnd");nn("onMouseEnter",["mouseout","mouseover"]);nn("onMouseLeave",["mouseout","mouseover"]);nn("onPointerEnter",["pointerout","pointerover"]);nn("onPointerLeave",["pointerout","pointerover"]);Lr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Lr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Lr("onBeforeInput",["compositionend","keypress","textInput","paste"]);Lr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Lr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Lr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Pn="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Bh=new Set("cancel close invalid load scroll toggle".split(" ").concat(Pn));function Lc(e,t,r){var n=e.type||"unknown-event";e.currentTarget=r,Im(n,t,void 0,e),e.currentTarget=null}function Gu(e,t){t=(t&4)!==0;for(var r=0;r<e.length;r++){var n=e[r],s=n.event;n=n.listeners;e:{var o=void 0;if(t)for(var i=n.length-1;0<=i;i--){var l=n[i],c=l.instance,d=l.currentTarget;if(l=l.listener,c!==o&&s.isPropagationStopped())break e;Lc(s,l,d),o=c}else for(i=0;i<n.length;i++){if(l=n[i],c=l.instance,d=l.currentTarget,l=l.listener,c!==o&&s.isPropagationStopped())break e;Lc(s,l,d),o=c}}}if(os)throw e=ti,os=!1,ti=null,e}function se(e,t){var r=t[ui];r===void 0&&(r=t[ui]=new Set);var n=e+"__bubble";r.has(n)||(Ku(t,e,2,!1),r.add(n))}function bo(e,t,r){var n=0;t&&(n|=4),Ku(r,e,n,t)}var La="_reactListening"+Math.random().toString(36).slice(2);function Kn(e){if(!e[La]){e[La]=!0,au.forEach(function(r){r!=="selectionchange"&&(Bh.has(r)||bo(r,!1,e),bo(r,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[La]||(t[La]=!0,bo("selectionchange",!1,t))}}function Ku(e,t,r,n){switch(Ou(t)){case 1:var s=th;break;case 4:s=rh;break;default:s=nl}r=s.bind(null,t,r,e),s=void 0,!ei||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(s=!0),n?s!==void 0?e.addEventListener(t,r,{capture:!0,passive:s}):e.addEventListener(t,r,!0):s!==void 0?e.addEventListener(t,r,{passive:s}):e.addEventListener(t,r,!1)}function wo(e,t,r,n,s){var o=n;if(!(t&1)&&!(t&2)&&n!==null)e:for(;;){if(n===null)return;var i=n.tag;if(i===3||i===4){var l=n.stateNode.containerInfo;if(l===s||l.nodeType===8&&l.parentNode===s)break;if(i===4)for(i=n.return;i!==null;){var c=i.tag;if((c===3||c===4)&&(c=i.stateNode.containerInfo,c===s||c.nodeType===8&&c.parentNode===s))return;i=i.return}for(;l!==null;){if(i=br(l),i===null)return;if(c=i.tag,c===5||c===6){n=o=i;continue e}l=l.parentNode}}n=n.return}bu(function(){var d=o,u=Zi(r),f=[];e:{var g=Qu.get(e);if(g!==void 0){var w=sl,h=e;switch(e){case"keypress":if(qa(r)===0)break e;case"keydown":case"keyup":w=gh;break;case"focusin":h="focus",w=mo;break;case"focusout":h="blur",w=mo;break;case"beforeblur":case"afterblur":w=mo;break;case"click":if(r.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":w=wc;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":w=sh;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":w=bh;break;case Wu:case Ju:case qu:w=lh;break;case Yu:w=jh;break;case"scroll":w=nh;break;case"wheel":w=Nh;break;case"copy":case"cut":case"paste":w=dh;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":w=kc}var y=(t&4)!==0,j=!y&&e==="scroll",p=y?g!==null?g+"Capture":null:g;y=[];for(var m=d,x;m!==null;){x=m;var v=x.stateNode;if(x.tag===5&&v!==null&&(x=v,p!==null&&(v=Wn(m,p),v!=null&&y.push(Xn(m,v,x)))),j)break;m=m.return}0<y.length&&(g=new w(g,h,null,r,u),f.push({event:g,listeners:y}))}}if(!(t&7)){e:{if(g=e==="mouseover"||e==="pointerover",w=e==="mouseout"||e==="pointerout",g&&r!==Xo&&(h=r.relatedTarget||r.fromElement)&&(br(h)||h[Mt]))break e;if((w||g)&&(g=u.window===u?u:(g=u.ownerDocument)?g.defaultView||g.parentWindow:window,w?(h=r.relatedTarget||r.toElement,w=d,h=h?br(h):null,h!==null&&(j=Or(h),h!==j||h.tag!==5&&h.tag!==6)&&(h=null)):(w=null,h=d),w!==h)){if(y=wc,v="onMouseLeave",p="onMouseEnter",m="mouse",(e==="pointerout"||e==="pointerover")&&(y=kc,v="onPointerLeave",p="onPointerEnter",m="pointer"),j=w==null?g:$r(w),x=h==null?g:$r(h),g=new y(v,m+"leave",w,r,u),g.target=j,g.relatedTarget=x,v=null,br(u)===d&&(y=new y(p,m+"enter",h,r,u),y.target=x,y.relatedTarget=j,v=y),j=v,w&&h)t:{for(y=w,p=h,m=0,x=y;x;x=Ar(x))m++;for(x=0,v=p;v;v=Ar(v))x++;for(;0<m-x;)y=Ar(y),m--;for(;0<x-m;)p=Ar(p),x--;for(;m--;){if(y===p||p!==null&&y===p.alternate)break t;y=Ar(y),p=Ar(p)}y=null}else y=null;w!==null&&Oc(f,g,w,y,!1),h!==null&&j!==null&&Oc(f,j,h,y,!0)}}e:{if(g=d?$r(d):window,w=g.nodeName&&g.nodeName.toLowerCase(),w==="select"||w==="input"&&g.type==="file")var N=Ph;else if(Cc(g))if(Uu)N=Ah;else{N=Lh;var C=Th}else(w=g.nodeName)&&w.toLowerCase()==="input"&&(g.type==="checkbox"||g.type==="radio")&&(N=Oh);if(N&&(N=N(e,d))){Iu(f,N,r,u);break e}C&&C(e,g,d),e==="focusout"&&(C=g._wrapperState)&&C.controlled&&g.type==="number"&&qo(g,"number",g.value)}switch(C=d?$r(d):window,e){case"focusin":(Cc(C)||C.contentEditable==="true")&&(Ur=C,si=d,Dn=null);break;case"focusout":Dn=si=Ur=null;break;case"mousedown":oi=!0;break;case"contextmenu":case"mouseup":case"dragend":oi=!1,Pc(f,r,u);break;case"selectionchange":if(Mh)break;case"keydown":case"keyup":Pc(f,r,u)}var _;if(il)e:{switch(e){case"compositionstart":var R="onCompositionStart";break e;case"compositionend":R="onCompositionEnd";break e;case"compositionupdate":R="onCompositionUpdate";break e}R=void 0}else Ir?Fu(e,r)&&(R="onCompositionEnd"):e==="keydown"&&r.keyCode===229&&(R="onCompositionStart");R&&(Du&&r.locale!=="ko"&&(Ir||R!=="onCompositionStart"?R==="onCompositionEnd"&&Ir&&(_=Au()):(Zt=u,al="value"in Zt?Zt.value:Zt.textContent,Ir=!0)),C=us(d,R),0<C.length&&(R=new jc(R,e,null,r,u),f.push({event:R,listeners:C}),_?R.data=_:(_=Mu(r),_!==null&&(R.data=_)))),(_=Ch?Eh(e,r):_h(e,r))&&(d=us(d,"onBeforeInput"),0<d.length&&(u=new jc("onBeforeInput","beforeinput",null,r,u),f.push({event:u,listeners:d}),u.data=_))}Gu(f,t)})}function Xn(e,t,r){return{instance:e,listener:t,currentTarget:r}}function us(e,t){for(var r=t+"Capture",n=[];e!==null;){var s=e,o=s.stateNode;s.tag===5&&o!==null&&(s=o,o=Wn(e,r),o!=null&&n.unshift(Xn(e,o,s)),o=Wn(e,t),o!=null&&n.push(Xn(e,o,s))),e=e.return}return n}function Ar(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Oc(e,t,r,n,s){for(var o=t._reactName,i=[];r!==null&&r!==n;){var l=r,c=l.alternate,d=l.stateNode;if(c!==null&&c===n)break;l.tag===5&&d!==null&&(l=d,s?(c=Wn(r,o),c!=null&&i.unshift(Xn(r,c,l))):s||(c=Wn(r,o),c!=null&&i.push(Xn(r,c,l)))),r=r.return}i.length!==0&&e.push({event:t,listeners:i})}var $h=/\r\n?/g,Hh=/\u0000|\uFFFD/g;function Ac(e){return(typeof e=="string"?e:""+e).replace($h,`
`).replace(Hh,"")}function Oa(e,t,r){if(t=Ac(t),Ac(e)!==t&&r)throw Error(z(425))}function ps(){}var ii=null,li=null;function ci(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var di=typeof setTimeout=="function"?setTimeout:void 0,Vh=typeof clearTimeout=="function"?clearTimeout:void 0,Dc=typeof Promise=="function"?Promise:void 0,Wh=typeof queueMicrotask=="function"?queueMicrotask:typeof Dc<"u"?function(e){return Dc.resolve(null).then(e).catch(Jh)}:di;function Jh(e){setTimeout(function(){throw e})}function jo(e,t){var r=t,n=0;do{var s=r.nextSibling;if(e.removeChild(r),s&&s.nodeType===8)if(r=s.data,r==="/$"){if(n===0){e.removeChild(s),Yn(t);return}n--}else r!=="$"&&r!=="$?"&&r!=="$!"||n++;r=s}while(r);Yn(t)}function sr(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Fc(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="$"||r==="$!"||r==="$?"){if(t===0)return e;t--}else r==="/$"&&t++}e=e.previousSibling}return null}var hn=Math.random().toString(36).slice(2),St="__reactFiber$"+hn,Zn="__reactProps$"+hn,Mt="__reactContainer$"+hn,ui="__reactEvents$"+hn,qh="__reactListeners$"+hn,Yh="__reactHandles$"+hn;function br(e){var t=e[St];if(t)return t;for(var r=e.parentNode;r;){if(t=r[Mt]||r[St]){if(r=t.alternate,t.child!==null||r!==null&&r.child!==null)for(e=Fc(e);e!==null;){if(r=e[St])return r;e=Fc(e)}return t}e=r,r=e.parentNode}return null}function pa(e){return e=e[St]||e[Mt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function $r(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(z(33))}function Fs(e){return e[Zn]||null}var pi=[],Hr=-1;function mr(e){return{current:e}}function oe(e){0>Hr||(e.current=pi[Hr],pi[Hr]=null,Hr--)}function re(e,t){Hr++,pi[Hr]=e.current,e.current=t}var pr={},Oe=mr(pr),He=mr(!1),Er=pr;function an(e,t){var r=e.type.contextTypes;if(!r)return pr;var n=e.stateNode;if(n&&n.__reactInternalMemoizedUnmaskedChildContext===t)return n.__reactInternalMemoizedMaskedChildContext;var s={},o;for(o in r)s[o]=t[o];return n&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=s),s}function Ve(e){return e=e.childContextTypes,e!=null}function fs(){oe(He),oe(Oe)}function Mc(e,t,r){if(Oe.current!==pr)throw Error(z(168));re(Oe,t),re(He,r)}function Xu(e,t,r){var n=e.stateNode;if(t=t.childContextTypes,typeof n.getChildContext!="function")return r;n=n.getChildContext();for(var s in n)if(!(s in t))throw Error(z(108,Tm(e)||"Unknown",s));return fe({},r,n)}function ms(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||pr,Er=Oe.current,re(Oe,e),re(He,He.current),!0}function Ic(e,t,r){var n=e.stateNode;if(!n)throw Error(z(169));r?(e=Xu(e,t,Er),n.__reactInternalMemoizedMergedChildContext=e,oe(He),oe(Oe),re(Oe,e)):oe(He),re(He,r)}var Lt=null,Ms=!1,ko=!1;function Zu(e){Lt===null?Lt=[e]:Lt.push(e)}function Qh(e){Ms=!0,Zu(e)}function hr(){if(!ko&&Lt!==null){ko=!0;var e=0,t=K;try{var r=Lt;for(K=1;e<r.length;e++){var n=r[e];do n=n(!0);while(n!==null)}Lt=null,Ms=!1}catch(s){throw Lt!==null&&(Lt=Lt.slice(e+1)),Nu(el,hr),s}finally{K=t,ko=!1}}return null}var Vr=[],Wr=0,hs=null,xs=0,rt=[],nt=0,_r=null,Ot=1,At="";function vr(e,t){Vr[Wr++]=xs,Vr[Wr++]=hs,hs=e,xs=t}function ep(e,t,r){rt[nt++]=Ot,rt[nt++]=At,rt[nt++]=_r,_r=e;var n=Ot;e=At;var s=32-gt(n)-1;n&=~(1<<s),r+=1;var o=32-gt(t)+s;if(30<o){var i=s-s%5;o=(n&(1<<i)-1).toString(32),n>>=i,s-=i,Ot=1<<32-gt(t)+s|r<<s|n,At=o+e}else Ot=1<<o|r<<s|n,At=e}function cl(e){e.return!==null&&(vr(e,1),ep(e,1,0))}function dl(e){for(;e===hs;)hs=Vr[--Wr],Vr[Wr]=null,xs=Vr[--Wr],Vr[Wr]=null;for(;e===_r;)_r=rt[--nt],rt[nt]=null,At=rt[--nt],rt[nt]=null,Ot=rt[--nt],rt[nt]=null}var Qe=null,Ye=null,ce=!1,xt=null;function tp(e,t){var r=at(5,null,null,0);r.elementType="DELETED",r.stateNode=t,r.return=e,t=e.deletions,t===null?(e.deletions=[r],e.flags|=16):t.push(r)}function Uc(e,t){switch(e.tag){case 5:var r=e.type;return t=t.nodeType!==1||r.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Qe=e,Ye=sr(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Qe=e,Ye=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(r=_r!==null?{id:Ot,overflow:At}:null,e.memoizedState={dehydrated:t,treeContext:r,retryLane:1073741824},r=at(18,null,null,0),r.stateNode=t,r.return=e,e.child=r,Qe=e,Ye=null,!0):!1;default:return!1}}function fi(e){return(e.mode&1)!==0&&(e.flags&128)===0}function mi(e){if(ce){var t=Ye;if(t){var r=t;if(!Uc(e,t)){if(fi(e))throw Error(z(418));t=sr(r.nextSibling);var n=Qe;t&&Uc(e,t)?tp(n,r):(e.flags=e.flags&-4097|2,ce=!1,Qe=e)}}else{if(fi(e))throw Error(z(418));e.flags=e.flags&-4097|2,ce=!1,Qe=e}}}function Bc(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Qe=e}function Aa(e){if(e!==Qe)return!1;if(!ce)return Bc(e),ce=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!ci(e.type,e.memoizedProps)),t&&(t=Ye)){if(fi(e))throw rp(),Error(z(418));for(;t;)tp(e,t),t=sr(t.nextSibling)}if(Bc(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(z(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="/$"){if(t===0){Ye=sr(e.nextSibling);break e}t--}else r!=="$"&&r!=="$!"&&r!=="$?"||t++}e=e.nextSibling}Ye=null}}else Ye=Qe?sr(e.stateNode.nextSibling):null;return!0}function rp(){for(var e=Ye;e;)e=sr(e.nextSibling)}function sn(){Ye=Qe=null,ce=!1}function ul(e){xt===null?xt=[e]:xt.push(e)}var Gh=Bt.ReactCurrentBatchConfig;function Nn(e,t,r){if(e=r.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(r._owner){if(r=r._owner,r){if(r.tag!==1)throw Error(z(309));var n=r.stateNode}if(!n)throw Error(z(147,e));var s=n,o=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===o?t.ref:(t=function(i){var l=s.refs;i===null?delete l[o]:l[o]=i},t._stringRef=o,t)}if(typeof e!="string")throw Error(z(284));if(!r._owner)throw Error(z(290,e))}return e}function Da(e,t){throw e=Object.prototype.toString.call(t),Error(z(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function $c(e){var t=e._init;return t(e._payload)}function np(e){function t(p,m){if(e){var x=p.deletions;x===null?(p.deletions=[m],p.flags|=16):x.push(m)}}function r(p,m){if(!e)return null;for(;m!==null;)t(p,m),m=m.sibling;return null}function n(p,m){for(p=new Map;m!==null;)m.key!==null?p.set(m.key,m):p.set(m.index,m),m=m.sibling;return p}function s(p,m){return p=cr(p,m),p.index=0,p.sibling=null,p}function o(p,m,x){return p.index=x,e?(x=p.alternate,x!==null?(x=x.index,x<m?(p.flags|=2,m):x):(p.flags|=2,m)):(p.flags|=1048576,m)}function i(p){return e&&p.alternate===null&&(p.flags|=2),p}function l(p,m,x,v){return m===null||m.tag!==6?(m=Ro(x,p.mode,v),m.return=p,m):(m=s(m,x),m.return=p,m)}function c(p,m,x,v){var N=x.type;return N===Mr?u(p,m,x.props.children,v,x.key):m!==null&&(m.elementType===N||typeof N=="object"&&N!==null&&N.$$typeof===Qt&&$c(N)===m.type)?(v=s(m,x.props),v.ref=Nn(p,m,x),v.return=p,v):(v=es(x.type,x.key,x.props,null,p.mode,v),v.ref=Nn(p,m,x),v.return=p,v)}function d(p,m,x,v){return m===null||m.tag!==4||m.stateNode.containerInfo!==x.containerInfo||m.stateNode.implementation!==x.implementation?(m=Po(x,p.mode,v),m.return=p,m):(m=s(m,x.children||[]),m.return=p,m)}function u(p,m,x,v,N){return m===null||m.tag!==7?(m=Sr(x,p.mode,v,N),m.return=p,m):(m=s(m,x),m.return=p,m)}function f(p,m,x){if(typeof m=="string"&&m!==""||typeof m=="number")return m=Ro(""+m,p.mode,x),m.return=p,m;if(typeof m=="object"&&m!==null){switch(m.$$typeof){case Sa:return x=es(m.type,m.key,m.props,null,p.mode,x),x.ref=Nn(p,null,m),x.return=p,x;case Fr:return m=Po(m,p.mode,x),m.return=p,m;case Qt:var v=m._init;return f(p,v(m._payload),x)}if(zn(m)||yn(m))return m=Sr(m,p.mode,x,null),m.return=p,m;Da(p,m)}return null}function g(p,m,x,v){var N=m!==null?m.key:null;if(typeof x=="string"&&x!==""||typeof x=="number")return N!==null?null:l(p,m,""+x,v);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case Sa:return x.key===N?c(p,m,x,v):null;case Fr:return x.key===N?d(p,m,x,v):null;case Qt:return N=x._init,g(p,m,N(x._payload),v)}if(zn(x)||yn(x))return N!==null?null:u(p,m,x,v,null);Da(p,x)}return null}function w(p,m,x,v,N){if(typeof v=="string"&&v!==""||typeof v=="number")return p=p.get(x)||null,l(m,p,""+v,N);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case Sa:return p=p.get(v.key===null?x:v.key)||null,c(m,p,v,N);case Fr:return p=p.get(v.key===null?x:v.key)||null,d(m,p,v,N);case Qt:var C=v._init;return w(p,m,x,C(v._payload),N)}if(zn(v)||yn(v))return p=p.get(x)||null,u(m,p,v,N,null);Da(m,v)}return null}function h(p,m,x,v){for(var N=null,C=null,_=m,R=m=0,D=null;_!==null&&R<x.length;R++){_.index>R?(D=_,_=null):D=_.sibling;var A=g(p,_,x[R],v);if(A===null){_===null&&(_=D);break}e&&_&&A.alternate===null&&t(p,_),m=o(A,m,R),C===null?N=A:C.sibling=A,C=A,_=D}if(R===x.length)return r(p,_),ce&&vr(p,R),N;if(_===null){for(;R<x.length;R++)_=f(p,x[R],v),_!==null&&(m=o(_,m,R),C===null?N=_:C.sibling=_,C=_);return ce&&vr(p,R),N}for(_=n(p,_);R<x.length;R++)D=w(_,p,R,x[R],v),D!==null&&(e&&D.alternate!==null&&_.delete(D.key===null?R:D.key),m=o(D,m,R),C===null?N=D:C.sibling=D,C=D);return e&&_.forEach(function(Q){return t(p,Q)}),ce&&vr(p,R),N}function y(p,m,x,v){var N=yn(x);if(typeof N!="function")throw Error(z(150));if(x=N.call(x),x==null)throw Error(z(151));for(var C=N=null,_=m,R=m=0,D=null,A=x.next();_!==null&&!A.done;R++,A=x.next()){_.index>R?(D=_,_=null):D=_.sibling;var Q=g(p,_,A.value,v);if(Q===null){_===null&&(_=D);break}e&&_&&Q.alternate===null&&t(p,_),m=o(Q,m,R),C===null?N=Q:C.sibling=Q,C=Q,_=D}if(A.done)return r(p,_),ce&&vr(p,R),N;if(_===null){for(;!A.done;R++,A=x.next())A=f(p,A.value,v),A!==null&&(m=o(A,m,R),C===null?N=A:C.sibling=A,C=A);return ce&&vr(p,R),N}for(_=n(p,_);!A.done;R++,A=x.next())A=w(_,p,R,A.value,v),A!==null&&(e&&A.alternate!==null&&_.delete(A.key===null?R:A.key),m=o(A,m,R),C===null?N=A:C.sibling=A,C=A);return e&&_.forEach(function(de){return t(p,de)}),ce&&vr(p,R),N}function j(p,m,x,v){if(typeof x=="object"&&x!==null&&x.type===Mr&&x.key===null&&(x=x.props.children),typeof x=="object"&&x!==null){switch(x.$$typeof){case Sa:e:{for(var N=x.key,C=m;C!==null;){if(C.key===N){if(N=x.type,N===Mr){if(C.tag===7){r(p,C.sibling),m=s(C,x.props.children),m.return=p,p=m;break e}}else if(C.elementType===N||typeof N=="object"&&N!==null&&N.$$typeof===Qt&&$c(N)===C.type){r(p,C.sibling),m=s(C,x.props),m.ref=Nn(p,C,x),m.return=p,p=m;break e}r(p,C);break}else t(p,C);C=C.sibling}x.type===Mr?(m=Sr(x.props.children,p.mode,v,x.key),m.return=p,p=m):(v=es(x.type,x.key,x.props,null,p.mode,v),v.ref=Nn(p,m,x),v.return=p,p=v)}return i(p);case Fr:e:{for(C=x.key;m!==null;){if(m.key===C)if(m.tag===4&&m.stateNode.containerInfo===x.containerInfo&&m.stateNode.implementation===x.implementation){r(p,m.sibling),m=s(m,x.children||[]),m.return=p,p=m;break e}else{r(p,m);break}else t(p,m);m=m.sibling}m=Po(x,p.mode,v),m.return=p,p=m}return i(p);case Qt:return C=x._init,j(p,m,C(x._payload),v)}if(zn(x))return h(p,m,x,v);if(yn(x))return y(p,m,x,v);Da(p,x)}return typeof x=="string"&&x!==""||typeof x=="number"?(x=""+x,m!==null&&m.tag===6?(r(p,m.sibling),m=s(m,x),m.return=p,p=m):(r(p,m),m=Ro(x,p.mode,v),m.return=p,p=m),i(p)):r(p,m)}return j}var on=np(!0),ap=np(!1),gs=mr(null),vs=null,Jr=null,pl=null;function fl(){pl=Jr=vs=null}function ml(e){var t=gs.current;oe(gs),e._currentValue=t}function hi(e,t,r){for(;e!==null;){var n=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,n!==null&&(n.childLanes|=t)):n!==null&&(n.childLanes&t)!==t&&(n.childLanes|=t),e===r)break;e=e.return}}function en(e,t){vs=e,pl=Jr=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&($e=!0),e.firstContext=null)}function ot(e){var t=e._currentValue;if(pl!==e)if(e={context:e,memoizedValue:t,next:null},Jr===null){if(vs===null)throw Error(z(308));Jr=e,vs.dependencies={lanes:0,firstContext:e}}else Jr=Jr.next=e;return t}var wr=null;function hl(e){wr===null?wr=[e]:wr.push(e)}function sp(e,t,r,n){var s=t.interleaved;return s===null?(r.next=r,hl(t)):(r.next=s.next,s.next=r),t.interleaved=r,It(e,n)}function It(e,t){e.lanes|=t;var r=e.alternate;for(r!==null&&(r.lanes|=t),r=e,e=e.return;e!==null;)e.childLanes|=t,r=e.alternate,r!==null&&(r.childLanes|=t),r=e,e=e.return;return r.tag===3?r.stateNode:null}var Gt=!1;function xl(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function op(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Dt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function or(e,t,r){var n=e.updateQueue;if(n===null)return null;if(n=n.shared,Y&2){var s=n.pending;return s===null?t.next=t:(t.next=s.next,s.next=t),n.pending=t,It(e,r)}return s=n.interleaved,s===null?(t.next=t,hl(n)):(t.next=s.next,s.next=t),n.interleaved=t,It(e,r)}function Ya(e,t,r){if(t=t.updateQueue,t!==null&&(t=t.shared,(r&4194240)!==0)){var n=t.lanes;n&=e.pendingLanes,r|=n,t.lanes=r,tl(e,r)}}function Hc(e,t){var r=e.updateQueue,n=e.alternate;if(n!==null&&(n=n.updateQueue,r===n)){var s=null,o=null;if(r=r.firstBaseUpdate,r!==null){do{var i={eventTime:r.eventTime,lane:r.lane,tag:r.tag,payload:r.payload,callback:r.callback,next:null};o===null?s=o=i:o=o.next=i,r=r.next}while(r!==null);o===null?s=o=t:o=o.next=t}else s=o=t;r={baseState:n.baseState,firstBaseUpdate:s,lastBaseUpdate:o,shared:n.shared,effects:n.effects},e.updateQueue=r;return}e=r.lastBaseUpdate,e===null?r.firstBaseUpdate=t:e.next=t,r.lastBaseUpdate=t}function ys(e,t,r,n){var s=e.updateQueue;Gt=!1;var o=s.firstBaseUpdate,i=s.lastBaseUpdate,l=s.shared.pending;if(l!==null){s.shared.pending=null;var c=l,d=c.next;c.next=null,i===null?o=d:i.next=d,i=c;var u=e.alternate;u!==null&&(u=u.updateQueue,l=u.lastBaseUpdate,l!==i&&(l===null?u.firstBaseUpdate=d:l.next=d,u.lastBaseUpdate=c))}if(o!==null){var f=s.baseState;i=0,u=d=c=null,l=o;do{var g=l.lane,w=l.eventTime;if((n&g)===g){u!==null&&(u=u.next={eventTime:w,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var h=e,y=l;switch(g=t,w=r,y.tag){case 1:if(h=y.payload,typeof h=="function"){f=h.call(w,f,g);break e}f=h;break e;case 3:h.flags=h.flags&-65537|128;case 0:if(h=y.payload,g=typeof h=="function"?h.call(w,f,g):h,g==null)break e;f=fe({},f,g);break e;case 2:Gt=!0}}l.callback!==null&&l.lane!==0&&(e.flags|=64,g=s.effects,g===null?s.effects=[l]:g.push(l))}else w={eventTime:w,lane:g,tag:l.tag,payload:l.payload,callback:l.callback,next:null},u===null?(d=u=w,c=f):u=u.next=w,i|=g;if(l=l.next,l===null){if(l=s.shared.pending,l===null)break;g=l,l=g.next,g.next=null,s.lastBaseUpdate=g,s.shared.pending=null}}while(!0);if(u===null&&(c=f),s.baseState=c,s.firstBaseUpdate=d,s.lastBaseUpdate=u,t=s.shared.interleaved,t!==null){s=t;do i|=s.lane,s=s.next;while(s!==t)}else o===null&&(s.shared.lanes=0);Rr|=i,e.lanes=i,e.memoizedState=f}}function Vc(e,t,r){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var n=e[t],s=n.callback;if(s!==null){if(n.callback=null,n=r,typeof s!="function")throw Error(z(191,s));s.call(n)}}}var fa={},_t=mr(fa),ea=mr(fa),ta=mr(fa);function jr(e){if(e===fa)throw Error(z(174));return e}function gl(e,t){switch(re(ta,t),re(ea,e),re(_t,fa),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Qo(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Qo(t,e)}oe(_t),re(_t,t)}function ln(){oe(_t),oe(ea),oe(ta)}function ip(e){jr(ta.current);var t=jr(_t.current),r=Qo(t,e.type);t!==r&&(re(ea,e),re(_t,r))}function vl(e){ea.current===e&&(oe(_t),oe(ea))}var ue=mr(0);function bs(e){for(var t=e;t!==null;){if(t.tag===13){var r=t.memoizedState;if(r!==null&&(r=r.dehydrated,r===null||r.data==="$?"||r.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var No=[];function yl(){for(var e=0;e<No.length;e++)No[e]._workInProgressVersionPrimary=null;No.length=0}var Qa=Bt.ReactCurrentDispatcher,So=Bt.ReactCurrentBatchConfig,zr=0,pe=null,je=null,Ne=null,ws=!1,Fn=!1,ra=0,Kh=0;function Re(){throw Error(z(321))}function bl(e,t){if(t===null)return!1;for(var r=0;r<t.length&&r<e.length;r++)if(!yt(e[r],t[r]))return!1;return!0}function wl(e,t,r,n,s,o){if(zr=o,pe=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Qa.current=e===null||e.memoizedState===null?tx:rx,e=r(n,s),Fn){o=0;do{if(Fn=!1,ra=0,25<=o)throw Error(z(301));o+=1,Ne=je=null,t.updateQueue=null,Qa.current=nx,e=r(n,s)}while(Fn)}if(Qa.current=js,t=je!==null&&je.next!==null,zr=0,Ne=je=pe=null,ws=!1,t)throw Error(z(300));return e}function jl(){var e=ra!==0;return ra=0,e}function Nt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ne===null?pe.memoizedState=Ne=e:Ne=Ne.next=e,Ne}function it(){if(je===null){var e=pe.alternate;e=e!==null?e.memoizedState:null}else e=je.next;var t=Ne===null?pe.memoizedState:Ne.next;if(t!==null)Ne=t,je=e;else{if(e===null)throw Error(z(310));je=e,e={memoizedState:je.memoizedState,baseState:je.baseState,baseQueue:je.baseQueue,queue:je.queue,next:null},Ne===null?pe.memoizedState=Ne=e:Ne=Ne.next=e}return Ne}function na(e,t){return typeof t=="function"?t(e):t}function Co(e){var t=it(),r=t.queue;if(r===null)throw Error(z(311));r.lastRenderedReducer=e;var n=je,s=n.baseQueue,o=r.pending;if(o!==null){if(s!==null){var i=s.next;s.next=o.next,o.next=i}n.baseQueue=s=o,r.pending=null}if(s!==null){o=s.next,n=n.baseState;var l=i=null,c=null,d=o;do{var u=d.lane;if((zr&u)===u)c!==null&&(c=c.next={lane:0,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),n=d.hasEagerState?d.eagerState:e(n,d.action);else{var f={lane:u,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null};c===null?(l=c=f,i=n):c=c.next=f,pe.lanes|=u,Rr|=u}d=d.next}while(d!==null&&d!==o);c===null?i=n:c.next=l,yt(n,t.memoizedState)||($e=!0),t.memoizedState=n,t.baseState=i,t.baseQueue=c,r.lastRenderedState=n}if(e=r.interleaved,e!==null){s=e;do o=s.lane,pe.lanes|=o,Rr|=o,s=s.next;while(s!==e)}else s===null&&(r.lanes=0);return[t.memoizedState,r.dispatch]}function Eo(e){var t=it(),r=t.queue;if(r===null)throw Error(z(311));r.lastRenderedReducer=e;var n=r.dispatch,s=r.pending,o=t.memoizedState;if(s!==null){r.pending=null;var i=s=s.next;do o=e(o,i.action),i=i.next;while(i!==s);yt(o,t.memoizedState)||($e=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),r.lastRenderedState=o}return[o,n]}function lp(){}function cp(e,t){var r=pe,n=it(),s=t(),o=!yt(n.memoizedState,s);if(o&&(n.memoizedState=s,$e=!0),n=n.queue,kl(pp.bind(null,r,n,e),[e]),n.getSnapshot!==t||o||Ne!==null&&Ne.memoizedState.tag&1){if(r.flags|=2048,aa(9,up.bind(null,r,n,s,t),void 0,null),Se===null)throw Error(z(349));zr&30||dp(r,t,s)}return s}function dp(e,t,r){e.flags|=16384,e={getSnapshot:t,value:r},t=pe.updateQueue,t===null?(t={lastEffect:null,stores:null},pe.updateQueue=t,t.stores=[e]):(r=t.stores,r===null?t.stores=[e]:r.push(e))}function up(e,t,r,n){t.value=r,t.getSnapshot=n,fp(t)&&mp(e)}function pp(e,t,r){return r(function(){fp(t)&&mp(e)})}function fp(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!yt(e,r)}catch{return!0}}function mp(e){var t=It(e,1);t!==null&&vt(t,e,1,-1)}function Wc(e){var t=Nt();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:na,lastRenderedState:e},t.queue=e,e=e.dispatch=ex.bind(null,pe,e),[t.memoizedState,e]}function aa(e,t,r,n){return e={tag:e,create:t,destroy:r,deps:n,next:null},t=pe.updateQueue,t===null?(t={lastEffect:null,stores:null},pe.updateQueue=t,t.lastEffect=e.next=e):(r=t.lastEffect,r===null?t.lastEffect=e.next=e:(n=r.next,r.next=e,e.next=n,t.lastEffect=e)),e}function hp(){return it().memoizedState}function Ga(e,t,r,n){var s=Nt();pe.flags|=e,s.memoizedState=aa(1|t,r,void 0,n===void 0?null:n)}function Is(e,t,r,n){var s=it();n=n===void 0?null:n;var o=void 0;if(je!==null){var i=je.memoizedState;if(o=i.destroy,n!==null&&bl(n,i.deps)){s.memoizedState=aa(t,r,o,n);return}}pe.flags|=e,s.memoizedState=aa(1|t,r,o,n)}function Jc(e,t){return Ga(8390656,8,e,t)}function kl(e,t){return Is(2048,8,e,t)}function xp(e,t){return Is(4,2,e,t)}function gp(e,t){return Is(4,4,e,t)}function vp(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function yp(e,t,r){return r=r!=null?r.concat([e]):null,Is(4,4,vp.bind(null,t,e),r)}function Nl(){}function bp(e,t){var r=it();t=t===void 0?null:t;var n=r.memoizedState;return n!==null&&t!==null&&bl(t,n[1])?n[0]:(r.memoizedState=[e,t],e)}function wp(e,t){var r=it();t=t===void 0?null:t;var n=r.memoizedState;return n!==null&&t!==null&&bl(t,n[1])?n[0]:(e=e(),r.memoizedState=[e,t],e)}function jp(e,t,r){return zr&21?(yt(r,t)||(r=Eu(),pe.lanes|=r,Rr|=r,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,$e=!0),e.memoizedState=r)}function Xh(e,t){var r=K;K=r!==0&&4>r?r:4,e(!0);var n=So.transition;So.transition={};try{e(!1),t()}finally{K=r,So.transition=n}}function kp(){return it().memoizedState}function Zh(e,t,r){var n=lr(e);if(r={lane:n,action:r,hasEagerState:!1,eagerState:null,next:null},Np(e))Sp(t,r);else if(r=sp(e,t,r,n),r!==null){var s=Fe();vt(r,e,n,s),Cp(r,t,n)}}function ex(e,t,r){var n=lr(e),s={lane:n,action:r,hasEagerState:!1,eagerState:null,next:null};if(Np(e))Sp(t,s);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=t.lastRenderedReducer,o!==null))try{var i=t.lastRenderedState,l=o(i,r);if(s.hasEagerState=!0,s.eagerState=l,yt(l,i)){var c=t.interleaved;c===null?(s.next=s,hl(t)):(s.next=c.next,c.next=s),t.interleaved=s;return}}catch{}finally{}r=sp(e,t,s,n),r!==null&&(s=Fe(),vt(r,e,n,s),Cp(r,t,n))}}function Np(e){var t=e.alternate;return e===pe||t!==null&&t===pe}function Sp(e,t){Fn=ws=!0;var r=e.pending;r===null?t.next=t:(t.next=r.next,r.next=t),e.pending=t}function Cp(e,t,r){if(r&4194240){var n=t.lanes;n&=e.pendingLanes,r|=n,t.lanes=r,tl(e,r)}}var js={readContext:ot,useCallback:Re,useContext:Re,useEffect:Re,useImperativeHandle:Re,useInsertionEffect:Re,useLayoutEffect:Re,useMemo:Re,useReducer:Re,useRef:Re,useState:Re,useDebugValue:Re,useDeferredValue:Re,useTransition:Re,useMutableSource:Re,useSyncExternalStore:Re,useId:Re,unstable_isNewReconciler:!1},tx={readContext:ot,useCallback:function(e,t){return Nt().memoizedState=[e,t===void 0?null:t],e},useContext:ot,useEffect:Jc,useImperativeHandle:function(e,t,r){return r=r!=null?r.concat([e]):null,Ga(4194308,4,vp.bind(null,t,e),r)},useLayoutEffect:function(e,t){return Ga(4194308,4,e,t)},useInsertionEffect:function(e,t){return Ga(4,2,e,t)},useMemo:function(e,t){var r=Nt();return t=t===void 0?null:t,e=e(),r.memoizedState=[e,t],e},useReducer:function(e,t,r){var n=Nt();return t=r!==void 0?r(t):t,n.memoizedState=n.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},n.queue=e,e=e.dispatch=Zh.bind(null,pe,e),[n.memoizedState,e]},useRef:function(e){var t=Nt();return e={current:e},t.memoizedState=e},useState:Wc,useDebugValue:Nl,useDeferredValue:function(e){return Nt().memoizedState=e},useTransition:function(){var e=Wc(!1),t=e[0];return e=Xh.bind(null,e[1]),Nt().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,r){var n=pe,s=Nt();if(ce){if(r===void 0)throw Error(z(407));r=r()}else{if(r=t(),Se===null)throw Error(z(349));zr&30||dp(n,t,r)}s.memoizedState=r;var o={value:r,getSnapshot:t};return s.queue=o,Jc(pp.bind(null,n,o,e),[e]),n.flags|=2048,aa(9,up.bind(null,n,o,r,t),void 0,null),r},useId:function(){var e=Nt(),t=Se.identifierPrefix;if(ce){var r=At,n=Ot;r=(n&~(1<<32-gt(n)-1)).toString(32)+r,t=":"+t+"R"+r,r=ra++,0<r&&(t+="H"+r.toString(32)),t+=":"}else r=Kh++,t=":"+t+"r"+r.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},rx={readContext:ot,useCallback:bp,useContext:ot,useEffect:kl,useImperativeHandle:yp,useInsertionEffect:xp,useLayoutEffect:gp,useMemo:wp,useReducer:Co,useRef:hp,useState:function(){return Co(na)},useDebugValue:Nl,useDeferredValue:function(e){var t=it();return jp(t,je.memoizedState,e)},useTransition:function(){var e=Co(na)[0],t=it().memoizedState;return[e,t]},useMutableSource:lp,useSyncExternalStore:cp,useId:kp,unstable_isNewReconciler:!1},nx={readContext:ot,useCallback:bp,useContext:ot,useEffect:kl,useImperativeHandle:yp,useInsertionEffect:xp,useLayoutEffect:gp,useMemo:wp,useReducer:Eo,useRef:hp,useState:function(){return Eo(na)},useDebugValue:Nl,useDeferredValue:function(e){var t=it();return je===null?t.memoizedState=e:jp(t,je.memoizedState,e)},useTransition:function(){var e=Eo(na)[0],t=it().memoizedState;return[e,t]},useMutableSource:lp,useSyncExternalStore:cp,useId:kp,unstable_isNewReconciler:!1};function mt(e,t){if(e&&e.defaultProps){t=fe({},t),e=e.defaultProps;for(var r in e)t[r]===void 0&&(t[r]=e[r]);return t}return t}function xi(e,t,r,n){t=e.memoizedState,r=r(n,t),r=r==null?t:fe({},t,r),e.memoizedState=r,e.lanes===0&&(e.updateQueue.baseState=r)}var Us={isMounted:function(e){return(e=e._reactInternals)?Or(e)===e:!1},enqueueSetState:function(e,t,r){e=e._reactInternals;var n=Fe(),s=lr(e),o=Dt(n,s);o.payload=t,r!=null&&(o.callback=r),t=or(e,o,s),t!==null&&(vt(t,e,s,n),Ya(t,e,s))},enqueueReplaceState:function(e,t,r){e=e._reactInternals;var n=Fe(),s=lr(e),o=Dt(n,s);o.tag=1,o.payload=t,r!=null&&(o.callback=r),t=or(e,o,s),t!==null&&(vt(t,e,s,n),Ya(t,e,s))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var r=Fe(),n=lr(e),s=Dt(r,n);s.tag=2,t!=null&&(s.callback=t),t=or(e,s,n),t!==null&&(vt(t,e,n,r),Ya(t,e,n))}};function qc(e,t,r,n,s,o,i){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(n,o,i):t.prototype&&t.prototype.isPureReactComponent?!Gn(r,n)||!Gn(s,o):!0}function Ep(e,t,r){var n=!1,s=pr,o=t.contextType;return typeof o=="object"&&o!==null?o=ot(o):(s=Ve(t)?Er:Oe.current,n=t.contextTypes,o=(n=n!=null)?an(e,s):pr),t=new t(r,o),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Us,e.stateNode=t,t._reactInternals=e,n&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=s,e.__reactInternalMemoizedMaskedChildContext=o),t}function Yc(e,t,r,n){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(r,n),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(r,n),t.state!==e&&Us.enqueueReplaceState(t,t.state,null)}function gi(e,t,r,n){var s=e.stateNode;s.props=r,s.state=e.memoizedState,s.refs={},xl(e);var o=t.contextType;typeof o=="object"&&o!==null?s.context=ot(o):(o=Ve(t)?Er:Oe.current,s.context=an(e,o)),s.state=e.memoizedState,o=t.getDerivedStateFromProps,typeof o=="function"&&(xi(e,t,o,r),s.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(t=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),t!==s.state&&Us.enqueueReplaceState(s,s.state,null),ys(e,r,s,n),s.state=e.memoizedState),typeof s.componentDidMount=="function"&&(e.flags|=4194308)}function cn(e,t){try{var r="",n=t;do r+=Pm(n),n=n.return;while(n);var s=r}catch(o){s=`
Error generating stack: `+o.message+`
`+o.stack}return{value:e,source:t,stack:s,digest:null}}function _o(e,t,r){return{value:e,source:null,stack:r??null,digest:t??null}}function vi(e,t){try{console.error(t.value)}catch(r){setTimeout(function(){throw r})}}var ax=typeof WeakMap=="function"?WeakMap:Map;function _p(e,t,r){r=Dt(-1,r),r.tag=3,r.payload={element:null};var n=t.value;return r.callback=function(){Ns||(Ns=!0,_i=n),vi(e,t)},r}function zp(e,t,r){r=Dt(-1,r),r.tag=3;var n=e.type.getDerivedStateFromError;if(typeof n=="function"){var s=t.value;r.payload=function(){return n(s)},r.callback=function(){vi(e,t)}}var o=e.stateNode;return o!==null&&typeof o.componentDidCatch=="function"&&(r.callback=function(){vi(e,t),typeof n!="function"&&(ir===null?ir=new Set([this]):ir.add(this));var i=t.stack;this.componentDidCatch(t.value,{componentStack:i!==null?i:""})}),r}function Qc(e,t,r){var n=e.pingCache;if(n===null){n=e.pingCache=new ax;var s=new Set;n.set(t,s)}else s=n.get(t),s===void 0&&(s=new Set,n.set(t,s));s.has(r)||(s.add(r),e=vx.bind(null,e,t,r),t.then(e,e))}function Gc(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Kc(e,t,r,n,s){return e.mode&1?(e.flags|=65536,e.lanes=s,e):(e===t?e.flags|=65536:(e.flags|=128,r.flags|=131072,r.flags&=-52805,r.tag===1&&(r.alternate===null?r.tag=17:(t=Dt(-1,1),t.tag=2,or(r,t,1))),r.lanes|=1),e)}var sx=Bt.ReactCurrentOwner,$e=!1;function De(e,t,r,n){t.child=e===null?ap(t,null,r,n):on(t,e.child,r,n)}function Xc(e,t,r,n,s){r=r.render;var o=t.ref;return en(t,s),n=wl(e,t,r,n,o,s),r=jl(),e!==null&&!$e?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~s,Ut(e,t,s)):(ce&&r&&cl(t),t.flags|=1,De(e,t,n,s),t.child)}function Zc(e,t,r,n,s){if(e===null){var o=r.type;return typeof o=="function"&&!Tl(o)&&o.defaultProps===void 0&&r.compare===null&&r.defaultProps===void 0?(t.tag=15,t.type=o,Rp(e,t,o,n,s)):(e=es(r.type,null,n,t,t.mode,s),e.ref=t.ref,e.return=t,t.child=e)}if(o=e.child,!(e.lanes&s)){var i=o.memoizedProps;if(r=r.compare,r=r!==null?r:Gn,r(i,n)&&e.ref===t.ref)return Ut(e,t,s)}return t.flags|=1,e=cr(o,n),e.ref=t.ref,e.return=t,t.child=e}function Rp(e,t,r,n,s){if(e!==null){var o=e.memoizedProps;if(Gn(o,n)&&e.ref===t.ref)if($e=!1,t.pendingProps=n=o,(e.lanes&s)!==0)e.flags&131072&&($e=!0);else return t.lanes=e.lanes,Ut(e,t,s)}return yi(e,t,r,n,s)}function Pp(e,t,r){var n=t.pendingProps,s=n.children,o=e!==null?e.memoizedState:null;if(n.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},re(Yr,qe),qe|=r;else{if(!(r&1073741824))return e=o!==null?o.baseLanes|r:r,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,re(Yr,qe),qe|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},n=o!==null?o.baseLanes:r,re(Yr,qe),qe|=n}else o!==null?(n=o.baseLanes|r,t.memoizedState=null):n=r,re(Yr,qe),qe|=n;return De(e,t,s,r),t.child}function Tp(e,t){var r=t.ref;(e===null&&r!==null||e!==null&&e.ref!==r)&&(t.flags|=512,t.flags|=2097152)}function yi(e,t,r,n,s){var o=Ve(r)?Er:Oe.current;return o=an(t,o),en(t,s),r=wl(e,t,r,n,o,s),n=jl(),e!==null&&!$e?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~s,Ut(e,t,s)):(ce&&n&&cl(t),t.flags|=1,De(e,t,r,s),t.child)}function ed(e,t,r,n,s){if(Ve(r)){var o=!0;ms(t)}else o=!1;if(en(t,s),t.stateNode===null)Ka(e,t),Ep(t,r,n),gi(t,r,n,s),n=!0;else if(e===null){var i=t.stateNode,l=t.memoizedProps;i.props=l;var c=i.context,d=r.contextType;typeof d=="object"&&d!==null?d=ot(d):(d=Ve(r)?Er:Oe.current,d=an(t,d));var u=r.getDerivedStateFromProps,f=typeof u=="function"||typeof i.getSnapshotBeforeUpdate=="function";f||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(l!==n||c!==d)&&Yc(t,i,n,d),Gt=!1;var g=t.memoizedState;i.state=g,ys(t,n,i,s),c=t.memoizedState,l!==n||g!==c||He.current||Gt?(typeof u=="function"&&(xi(t,r,u,n),c=t.memoizedState),(l=Gt||qc(t,r,l,n,g,c,d))?(f||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(t.flags|=4194308)):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=n,t.memoizedState=c),i.props=n,i.state=c,i.context=d,n=l):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),n=!1)}else{i=t.stateNode,op(e,t),l=t.memoizedProps,d=t.type===t.elementType?l:mt(t.type,l),i.props=d,f=t.pendingProps,g=i.context,c=r.contextType,typeof c=="object"&&c!==null?c=ot(c):(c=Ve(r)?Er:Oe.current,c=an(t,c));var w=r.getDerivedStateFromProps;(u=typeof w=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(l!==f||g!==c)&&Yc(t,i,n,c),Gt=!1,g=t.memoizedState,i.state=g,ys(t,n,i,s);var h=t.memoizedState;l!==f||g!==h||He.current||Gt?(typeof w=="function"&&(xi(t,r,w,n),h=t.memoizedState),(d=Gt||qc(t,r,d,n,g,h,c)||!1)?(u||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(n,h,c),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(n,h,c)),typeof i.componentDidUpdate=="function"&&(t.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof i.componentDidUpdate!="function"||l===e.memoizedProps&&g===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&g===e.memoizedState||(t.flags|=1024),t.memoizedProps=n,t.memoizedState=h),i.props=n,i.state=h,i.context=c,n=d):(typeof i.componentDidUpdate!="function"||l===e.memoizedProps&&g===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&g===e.memoizedState||(t.flags|=1024),n=!1)}return bi(e,t,r,n,o,s)}function bi(e,t,r,n,s,o){Tp(e,t);var i=(t.flags&128)!==0;if(!n&&!i)return s&&Ic(t,r,!1),Ut(e,t,o);n=t.stateNode,sx.current=t;var l=i&&typeof r.getDerivedStateFromError!="function"?null:n.render();return t.flags|=1,e!==null&&i?(t.child=on(t,e.child,null,o),t.child=on(t,null,l,o)):De(e,t,l,o),t.memoizedState=n.state,s&&Ic(t,r,!0),t.child}function Lp(e){var t=e.stateNode;t.pendingContext?Mc(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Mc(e,t.context,!1),gl(e,t.containerInfo)}function td(e,t,r,n,s){return sn(),ul(s),t.flags|=256,De(e,t,r,n),t.child}var wi={dehydrated:null,treeContext:null,retryLane:0};function ji(e){return{baseLanes:e,cachePool:null,transitions:null}}function Op(e,t,r){var n=t.pendingProps,s=ue.current,o=!1,i=(t.flags&128)!==0,l;if((l=i)||(l=e!==null&&e.memoizedState===null?!1:(s&2)!==0),l?(o=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(s|=1),re(ue,s&1),e===null)return mi(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(i=n.children,e=n.fallback,o?(n=t.mode,o=t.child,i={mode:"hidden",children:i},!(n&1)&&o!==null?(o.childLanes=0,o.pendingProps=i):o=Hs(i,n,0,null),e=Sr(e,n,r,null),o.return=t,e.return=t,o.sibling=e,t.child=o,t.child.memoizedState=ji(r),t.memoizedState=wi,e):Sl(t,i));if(s=e.memoizedState,s!==null&&(l=s.dehydrated,l!==null))return ox(e,t,i,n,l,s,r);if(o){o=n.fallback,i=t.mode,s=e.child,l=s.sibling;var c={mode:"hidden",children:n.children};return!(i&1)&&t.child!==s?(n=t.child,n.childLanes=0,n.pendingProps=c,t.deletions=null):(n=cr(s,c),n.subtreeFlags=s.subtreeFlags&14680064),l!==null?o=cr(l,o):(o=Sr(o,i,r,null),o.flags|=2),o.return=t,n.return=t,n.sibling=o,t.child=n,n=o,o=t.child,i=e.child.memoizedState,i=i===null?ji(r):{baseLanes:i.baseLanes|r,cachePool:null,transitions:i.transitions},o.memoizedState=i,o.childLanes=e.childLanes&~r,t.memoizedState=wi,n}return o=e.child,e=o.sibling,n=cr(o,{mode:"visible",children:n.children}),!(t.mode&1)&&(n.lanes=r),n.return=t,n.sibling=null,e!==null&&(r=t.deletions,r===null?(t.deletions=[e],t.flags|=16):r.push(e)),t.child=n,t.memoizedState=null,n}function Sl(e,t){return t=Hs({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Fa(e,t,r,n){return n!==null&&ul(n),on(t,e.child,null,r),e=Sl(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function ox(e,t,r,n,s,o,i){if(r)return t.flags&256?(t.flags&=-257,n=_o(Error(z(422))),Fa(e,t,i,n)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(o=n.fallback,s=t.mode,n=Hs({mode:"visible",children:n.children},s,0,null),o=Sr(o,s,i,null),o.flags|=2,n.return=t,o.return=t,n.sibling=o,t.child=n,t.mode&1&&on(t,e.child,null,i),t.child.memoizedState=ji(i),t.memoizedState=wi,o);if(!(t.mode&1))return Fa(e,t,i,null);if(s.data==="$!"){if(n=s.nextSibling&&s.nextSibling.dataset,n)var l=n.dgst;return n=l,o=Error(z(419)),n=_o(o,n,void 0),Fa(e,t,i,n)}if(l=(i&e.childLanes)!==0,$e||l){if(n=Se,n!==null){switch(i&-i){case 4:s=2;break;case 16:s=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:s=32;break;case 536870912:s=268435456;break;default:s=0}s=s&(n.suspendedLanes|i)?0:s,s!==0&&s!==o.retryLane&&(o.retryLane=s,It(e,s),vt(n,e,s,-1))}return Pl(),n=_o(Error(z(421))),Fa(e,t,i,n)}return s.data==="$?"?(t.flags|=128,t.child=e.child,t=yx.bind(null,e),s._reactRetry=t,null):(e=o.treeContext,Ye=sr(s.nextSibling),Qe=t,ce=!0,xt=null,e!==null&&(rt[nt++]=Ot,rt[nt++]=At,rt[nt++]=_r,Ot=e.id,At=e.overflow,_r=t),t=Sl(t,n.children),t.flags|=4096,t)}function rd(e,t,r){e.lanes|=t;var n=e.alternate;n!==null&&(n.lanes|=t),hi(e.return,t,r)}function zo(e,t,r,n,s){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:n,tail:r,tailMode:s}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=n,o.tail=r,o.tailMode=s)}function Ap(e,t,r){var n=t.pendingProps,s=n.revealOrder,o=n.tail;if(De(e,t,n.children,r),n=ue.current,n&2)n=n&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&rd(e,r,t);else if(e.tag===19)rd(e,r,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}n&=1}if(re(ue,n),!(t.mode&1))t.memoizedState=null;else switch(s){case"forwards":for(r=t.child,s=null;r!==null;)e=r.alternate,e!==null&&bs(e)===null&&(s=r),r=r.sibling;r=s,r===null?(s=t.child,t.child=null):(s=r.sibling,r.sibling=null),zo(t,!1,s,r,o);break;case"backwards":for(r=null,s=t.child,t.child=null;s!==null;){if(e=s.alternate,e!==null&&bs(e)===null){t.child=s;break}e=s.sibling,s.sibling=r,r=s,s=e}zo(t,!0,r,null,o);break;case"together":zo(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Ka(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Ut(e,t,r){if(e!==null&&(t.dependencies=e.dependencies),Rr|=t.lanes,!(r&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(z(153));if(t.child!==null){for(e=t.child,r=cr(e,e.pendingProps),t.child=r,r.return=t;e.sibling!==null;)e=e.sibling,r=r.sibling=cr(e,e.pendingProps),r.return=t;r.sibling=null}return t.child}function ix(e,t,r){switch(t.tag){case 3:Lp(t),sn();break;case 5:ip(t);break;case 1:Ve(t.type)&&ms(t);break;case 4:gl(t,t.stateNode.containerInfo);break;case 10:var n=t.type._context,s=t.memoizedProps.value;re(gs,n._currentValue),n._currentValue=s;break;case 13:if(n=t.memoizedState,n!==null)return n.dehydrated!==null?(re(ue,ue.current&1),t.flags|=128,null):r&t.child.childLanes?Op(e,t,r):(re(ue,ue.current&1),e=Ut(e,t,r),e!==null?e.sibling:null);re(ue,ue.current&1);break;case 19:if(n=(r&t.childLanes)!==0,e.flags&128){if(n)return Ap(e,t,r);t.flags|=128}if(s=t.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),re(ue,ue.current),n)break;return null;case 22:case 23:return t.lanes=0,Pp(e,t,r)}return Ut(e,t,r)}var Dp,ki,Fp,Mp;Dp=function(e,t){for(var r=t.child;r!==null;){if(r.tag===5||r.tag===6)e.appendChild(r.stateNode);else if(r.tag!==4&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===t)break;for(;r.sibling===null;){if(r.return===null||r.return===t)return;r=r.return}r.sibling.return=r.return,r=r.sibling}};ki=function(){};Fp=function(e,t,r,n){var s=e.memoizedProps;if(s!==n){e=t.stateNode,jr(_t.current);var o=null;switch(r){case"input":s=Wo(e,s),n=Wo(e,n),o=[];break;case"select":s=fe({},s,{value:void 0}),n=fe({},n,{value:void 0}),o=[];break;case"textarea":s=Yo(e,s),n=Yo(e,n),o=[];break;default:typeof s.onClick!="function"&&typeof n.onClick=="function"&&(e.onclick=ps)}Go(r,n);var i;r=null;for(d in s)if(!n.hasOwnProperty(d)&&s.hasOwnProperty(d)&&s[d]!=null)if(d==="style"){var l=s[d];for(i in l)l.hasOwnProperty(i)&&(r||(r={}),r[i]="")}else d!=="dangerouslySetInnerHTML"&&d!=="children"&&d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&d!=="autoFocus"&&(Hn.hasOwnProperty(d)?o||(o=[]):(o=o||[]).push(d,null));for(d in n){var c=n[d];if(l=s!=null?s[d]:void 0,n.hasOwnProperty(d)&&c!==l&&(c!=null||l!=null))if(d==="style")if(l){for(i in l)!l.hasOwnProperty(i)||c&&c.hasOwnProperty(i)||(r||(r={}),r[i]="");for(i in c)c.hasOwnProperty(i)&&l[i]!==c[i]&&(r||(r={}),r[i]=c[i])}else r||(o||(o=[]),o.push(d,r)),r=c;else d==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,l=l?l.__html:void 0,c!=null&&l!==c&&(o=o||[]).push(d,c)):d==="children"?typeof c!="string"&&typeof c!="number"||(o=o||[]).push(d,""+c):d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&(Hn.hasOwnProperty(d)?(c!=null&&d==="onScroll"&&se("scroll",e),o||l===c||(o=[])):(o=o||[]).push(d,c))}r&&(o=o||[]).push("style",r);var d=o;(t.updateQueue=d)&&(t.flags|=4)}};Mp=function(e,t,r,n){r!==n&&(t.flags|=4)};function Sn(e,t){if(!ce)switch(e.tailMode){case"hidden":t=e.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?e.tail=null:r.sibling=null;break;case"collapsed":r=e.tail;for(var n=null;r!==null;)r.alternate!==null&&(n=r),r=r.sibling;n===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:n.sibling=null}}function Pe(e){var t=e.alternate!==null&&e.alternate.child===e.child,r=0,n=0;if(t)for(var s=e.child;s!==null;)r|=s.lanes|s.childLanes,n|=s.subtreeFlags&14680064,n|=s.flags&14680064,s.return=e,s=s.sibling;else for(s=e.child;s!==null;)r|=s.lanes|s.childLanes,n|=s.subtreeFlags,n|=s.flags,s.return=e,s=s.sibling;return e.subtreeFlags|=n,e.childLanes=r,t}function lx(e,t,r){var n=t.pendingProps;switch(dl(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Pe(t),null;case 1:return Ve(t.type)&&fs(),Pe(t),null;case 3:return n=t.stateNode,ln(),oe(He),oe(Oe),yl(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(Aa(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,xt!==null&&(Pi(xt),xt=null))),ki(e,t),Pe(t),null;case 5:vl(t);var s=jr(ta.current);if(r=t.type,e!==null&&t.stateNode!=null)Fp(e,t,r,n,s),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!n){if(t.stateNode===null)throw Error(z(166));return Pe(t),null}if(e=jr(_t.current),Aa(t)){n=t.stateNode,r=t.type;var o=t.memoizedProps;switch(n[St]=t,n[Zn]=o,e=(t.mode&1)!==0,r){case"dialog":se("cancel",n),se("close",n);break;case"iframe":case"object":case"embed":se("load",n);break;case"video":case"audio":for(s=0;s<Pn.length;s++)se(Pn[s],n);break;case"source":se("error",n);break;case"img":case"image":case"link":se("error",n),se("load",n);break;case"details":se("toggle",n);break;case"input":uc(n,o),se("invalid",n);break;case"select":n._wrapperState={wasMultiple:!!o.multiple},se("invalid",n);break;case"textarea":fc(n,o),se("invalid",n)}Go(r,o),s=null;for(var i in o)if(o.hasOwnProperty(i)){var l=o[i];i==="children"?typeof l=="string"?n.textContent!==l&&(o.suppressHydrationWarning!==!0&&Oa(n.textContent,l,e),s=["children",l]):typeof l=="number"&&n.textContent!==""+l&&(o.suppressHydrationWarning!==!0&&Oa(n.textContent,l,e),s=["children",""+l]):Hn.hasOwnProperty(i)&&l!=null&&i==="onScroll"&&se("scroll",n)}switch(r){case"input":Ca(n),pc(n,o,!0);break;case"textarea":Ca(n),mc(n);break;case"select":case"option":break;default:typeof o.onClick=="function"&&(n.onclick=ps)}n=s,t.updateQueue=n,n!==null&&(t.flags|=4)}else{i=s.nodeType===9?s:s.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=pu(r)),e==="http://www.w3.org/1999/xhtml"?r==="script"?(e=i.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof n.is=="string"?e=i.createElement(r,{is:n.is}):(e=i.createElement(r),r==="select"&&(i=e,n.multiple?i.multiple=!0:n.size&&(i.size=n.size))):e=i.createElementNS(e,r),e[St]=t,e[Zn]=n,Dp(e,t,!1,!1),t.stateNode=e;e:{switch(i=Ko(r,n),r){case"dialog":se("cancel",e),se("close",e),s=n;break;case"iframe":case"object":case"embed":se("load",e),s=n;break;case"video":case"audio":for(s=0;s<Pn.length;s++)se(Pn[s],e);s=n;break;case"source":se("error",e),s=n;break;case"img":case"image":case"link":se("error",e),se("load",e),s=n;break;case"details":se("toggle",e),s=n;break;case"input":uc(e,n),s=Wo(e,n),se("invalid",e);break;case"option":s=n;break;case"select":e._wrapperState={wasMultiple:!!n.multiple},s=fe({},n,{value:void 0}),se("invalid",e);break;case"textarea":fc(e,n),s=Yo(e,n),se("invalid",e);break;default:s=n}Go(r,s),l=s;for(o in l)if(l.hasOwnProperty(o)){var c=l[o];o==="style"?hu(e,c):o==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&fu(e,c)):o==="children"?typeof c=="string"?(r!=="textarea"||c!=="")&&Vn(e,c):typeof c=="number"&&Vn(e,""+c):o!=="suppressContentEditableWarning"&&o!=="suppressHydrationWarning"&&o!=="autoFocus"&&(Hn.hasOwnProperty(o)?c!=null&&o==="onScroll"&&se("scroll",e):c!=null&&Qi(e,o,c,i))}switch(r){case"input":Ca(e),pc(e,n,!1);break;case"textarea":Ca(e),mc(e);break;case"option":n.value!=null&&e.setAttribute("value",""+ur(n.value));break;case"select":e.multiple=!!n.multiple,o=n.value,o!=null?Gr(e,!!n.multiple,o,!1):n.defaultValue!=null&&Gr(e,!!n.multiple,n.defaultValue,!0);break;default:typeof s.onClick=="function"&&(e.onclick=ps)}switch(r){case"button":case"input":case"select":case"textarea":n=!!n.autoFocus;break e;case"img":n=!0;break e;default:n=!1}}n&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return Pe(t),null;case 6:if(e&&t.stateNode!=null)Mp(e,t,e.memoizedProps,n);else{if(typeof n!="string"&&t.stateNode===null)throw Error(z(166));if(r=jr(ta.current),jr(_t.current),Aa(t)){if(n=t.stateNode,r=t.memoizedProps,n[St]=t,(o=n.nodeValue!==r)&&(e=Qe,e!==null))switch(e.tag){case 3:Oa(n.nodeValue,r,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Oa(n.nodeValue,r,(e.mode&1)!==0)}o&&(t.flags|=4)}else n=(r.nodeType===9?r:r.ownerDocument).createTextNode(n),n[St]=t,t.stateNode=n}return Pe(t),null;case 13:if(oe(ue),n=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(ce&&Ye!==null&&t.mode&1&&!(t.flags&128))rp(),sn(),t.flags|=98560,o=!1;else if(o=Aa(t),n!==null&&n.dehydrated!==null){if(e===null){if(!o)throw Error(z(318));if(o=t.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(z(317));o[St]=t}else sn(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Pe(t),o=!1}else xt!==null&&(Pi(xt),xt=null),o=!0;if(!o)return t.flags&65536?t:null}return t.flags&128?(t.lanes=r,t):(n=n!==null,n!==(e!==null&&e.memoizedState!==null)&&n&&(t.child.flags|=8192,t.mode&1&&(e===null||ue.current&1?ke===0&&(ke=3):Pl())),t.updateQueue!==null&&(t.flags|=4),Pe(t),null);case 4:return ln(),ki(e,t),e===null&&Kn(t.stateNode.containerInfo),Pe(t),null;case 10:return ml(t.type._context),Pe(t),null;case 17:return Ve(t.type)&&fs(),Pe(t),null;case 19:if(oe(ue),o=t.memoizedState,o===null)return Pe(t),null;if(n=(t.flags&128)!==0,i=o.rendering,i===null)if(n)Sn(o,!1);else{if(ke!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(i=bs(e),i!==null){for(t.flags|=128,Sn(o,!1),n=i.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),t.subtreeFlags=0,n=r,r=t.child;r!==null;)o=r,e=n,o.flags&=14680066,i=o.alternate,i===null?(o.childLanes=0,o.lanes=e,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=i.childLanes,o.lanes=i.lanes,o.child=i.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=i.memoizedProps,o.memoizedState=i.memoizedState,o.updateQueue=i.updateQueue,o.type=i.type,e=i.dependencies,o.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),r=r.sibling;return re(ue,ue.current&1|2),t.child}e=e.sibling}o.tail!==null&&ve()>dn&&(t.flags|=128,n=!0,Sn(o,!1),t.lanes=4194304)}else{if(!n)if(e=bs(i),e!==null){if(t.flags|=128,n=!0,r=e.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),Sn(o,!0),o.tail===null&&o.tailMode==="hidden"&&!i.alternate&&!ce)return Pe(t),null}else 2*ve()-o.renderingStartTime>dn&&r!==1073741824&&(t.flags|=128,n=!0,Sn(o,!1),t.lanes=4194304);o.isBackwards?(i.sibling=t.child,t.child=i):(r=o.last,r!==null?r.sibling=i:t.child=i,o.last=i)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=ve(),t.sibling=null,r=ue.current,re(ue,n?r&1|2:r&1),t):(Pe(t),null);case 22:case 23:return Rl(),n=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==n&&(t.flags|=8192),n&&t.mode&1?qe&1073741824&&(Pe(t),t.subtreeFlags&6&&(t.flags|=8192)):Pe(t),null;case 24:return null;case 25:return null}throw Error(z(156,t.tag))}function cx(e,t){switch(dl(t),t.tag){case 1:return Ve(t.type)&&fs(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return ln(),oe(He),oe(Oe),yl(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return vl(t),null;case 13:if(oe(ue),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(z(340));sn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return oe(ue),null;case 4:return ln(),null;case 10:return ml(t.type._context),null;case 22:case 23:return Rl(),null;case 24:return null;default:return null}}var Ma=!1,Te=!1,dx=typeof WeakSet=="function"?WeakSet:Set,T=null;function qr(e,t){var r=e.ref;if(r!==null)if(typeof r=="function")try{r(null)}catch(n){he(e,t,n)}else r.current=null}function Ni(e,t,r){try{r()}catch(n){he(e,t,n)}}var nd=!1;function ux(e,t){if(ii=cs,e=Hu(),ll(e)){if("selectionStart"in e)var r={start:e.selectionStart,end:e.selectionEnd};else e:{r=(r=e.ownerDocument)&&r.defaultView||window;var n=r.getSelection&&r.getSelection();if(n&&n.rangeCount!==0){r=n.anchorNode;var s=n.anchorOffset,o=n.focusNode;n=n.focusOffset;try{r.nodeType,o.nodeType}catch{r=null;break e}var i=0,l=-1,c=-1,d=0,u=0,f=e,g=null;t:for(;;){for(var w;f!==r||s!==0&&f.nodeType!==3||(l=i+s),f!==o||n!==0&&f.nodeType!==3||(c=i+n),f.nodeType===3&&(i+=f.nodeValue.length),(w=f.firstChild)!==null;)g=f,f=w;for(;;){if(f===e)break t;if(g===r&&++d===s&&(l=i),g===o&&++u===n&&(c=i),(w=f.nextSibling)!==null)break;f=g,g=f.parentNode}f=w}r=l===-1||c===-1?null:{start:l,end:c}}else r=null}r=r||{start:0,end:0}}else r=null;for(li={focusedElem:e,selectionRange:r},cs=!1,T=t;T!==null;)if(t=T,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,T=e;else for(;T!==null;){t=T;try{var h=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(h!==null){var y=h.memoizedProps,j=h.memoizedState,p=t.stateNode,m=p.getSnapshotBeforeUpdate(t.elementType===t.type?y:mt(t.type,y),j);p.__reactInternalSnapshotBeforeUpdate=m}break;case 3:var x=t.stateNode.containerInfo;x.nodeType===1?x.textContent="":x.nodeType===9&&x.documentElement&&x.removeChild(x.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(z(163))}}catch(v){he(t,t.return,v)}if(e=t.sibling,e!==null){e.return=t.return,T=e;break}T=t.return}return h=nd,nd=!1,h}function Mn(e,t,r){var n=t.updateQueue;if(n=n!==null?n.lastEffect:null,n!==null){var s=n=n.next;do{if((s.tag&e)===e){var o=s.destroy;s.destroy=void 0,o!==void 0&&Ni(t,r,o)}s=s.next}while(s!==n)}}function Bs(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var r=t=t.next;do{if((r.tag&e)===e){var n=r.create;r.destroy=n()}r=r.next}while(r!==t)}}function Si(e){var t=e.ref;if(t!==null){var r=e.stateNode;switch(e.tag){case 5:e=r;break;default:e=r}typeof t=="function"?t(e):t.current=e}}function Ip(e){var t=e.alternate;t!==null&&(e.alternate=null,Ip(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[St],delete t[Zn],delete t[ui],delete t[qh],delete t[Yh])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Up(e){return e.tag===5||e.tag===3||e.tag===4}function ad(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Up(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Ci(e,t,r){var n=e.tag;if(n===5||n===6)e=e.stateNode,t?r.nodeType===8?r.parentNode.insertBefore(e,t):r.insertBefore(e,t):(r.nodeType===8?(t=r.parentNode,t.insertBefore(e,r)):(t=r,t.appendChild(e)),r=r._reactRootContainer,r!=null||t.onclick!==null||(t.onclick=ps));else if(n!==4&&(e=e.child,e!==null))for(Ci(e,t,r),e=e.sibling;e!==null;)Ci(e,t,r),e=e.sibling}function Ei(e,t,r){var n=e.tag;if(n===5||n===6)e=e.stateNode,t?r.insertBefore(e,t):r.appendChild(e);else if(n!==4&&(e=e.child,e!==null))for(Ei(e,t,r),e=e.sibling;e!==null;)Ei(e,t,r),e=e.sibling}var Ee=null,ht=!1;function Yt(e,t,r){for(r=r.child;r!==null;)Bp(e,t,r),r=r.sibling}function Bp(e,t,r){if(Et&&typeof Et.onCommitFiberUnmount=="function")try{Et.onCommitFiberUnmount(Ls,r)}catch{}switch(r.tag){case 5:Te||qr(r,t);case 6:var n=Ee,s=ht;Ee=null,Yt(e,t,r),Ee=n,ht=s,Ee!==null&&(ht?(e=Ee,r=r.stateNode,e.nodeType===8?e.parentNode.removeChild(r):e.removeChild(r)):Ee.removeChild(r.stateNode));break;case 18:Ee!==null&&(ht?(e=Ee,r=r.stateNode,e.nodeType===8?jo(e.parentNode,r):e.nodeType===1&&jo(e,r),Yn(e)):jo(Ee,r.stateNode));break;case 4:n=Ee,s=ht,Ee=r.stateNode.containerInfo,ht=!0,Yt(e,t,r),Ee=n,ht=s;break;case 0:case 11:case 14:case 15:if(!Te&&(n=r.updateQueue,n!==null&&(n=n.lastEffect,n!==null))){s=n=n.next;do{var o=s,i=o.destroy;o=o.tag,i!==void 0&&(o&2||o&4)&&Ni(r,t,i),s=s.next}while(s!==n)}Yt(e,t,r);break;case 1:if(!Te&&(qr(r,t),n=r.stateNode,typeof n.componentWillUnmount=="function"))try{n.props=r.memoizedProps,n.state=r.memoizedState,n.componentWillUnmount()}catch(l){he(r,t,l)}Yt(e,t,r);break;case 21:Yt(e,t,r);break;case 22:r.mode&1?(Te=(n=Te)||r.memoizedState!==null,Yt(e,t,r),Te=n):Yt(e,t,r);break;default:Yt(e,t,r)}}function sd(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var r=e.stateNode;r===null&&(r=e.stateNode=new dx),t.forEach(function(n){var s=bx.bind(null,e,n);r.has(n)||(r.add(n),n.then(s,s))})}}function ft(e,t){var r=t.deletions;if(r!==null)for(var n=0;n<r.length;n++){var s=r[n];try{var o=e,i=t,l=i;e:for(;l!==null;){switch(l.tag){case 5:Ee=l.stateNode,ht=!1;break e;case 3:Ee=l.stateNode.containerInfo,ht=!0;break e;case 4:Ee=l.stateNode.containerInfo,ht=!0;break e}l=l.return}if(Ee===null)throw Error(z(160));Bp(o,i,s),Ee=null,ht=!1;var c=s.alternate;c!==null&&(c.return=null),s.return=null}catch(d){he(s,t,d)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)$p(t,e),t=t.sibling}function $p(e,t){var r=e.alternate,n=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(ft(t,e),kt(e),n&4){try{Mn(3,e,e.return),Bs(3,e)}catch(y){he(e,e.return,y)}try{Mn(5,e,e.return)}catch(y){he(e,e.return,y)}}break;case 1:ft(t,e),kt(e),n&512&&r!==null&&qr(r,r.return);break;case 5:if(ft(t,e),kt(e),n&512&&r!==null&&qr(r,r.return),e.flags&32){var s=e.stateNode;try{Vn(s,"")}catch(y){he(e,e.return,y)}}if(n&4&&(s=e.stateNode,s!=null)){var o=e.memoizedProps,i=r!==null?r.memoizedProps:o,l=e.type,c=e.updateQueue;if(e.updateQueue=null,c!==null)try{l==="input"&&o.type==="radio"&&o.name!=null&&du(s,o),Ko(l,i);var d=Ko(l,o);for(i=0;i<c.length;i+=2){var u=c[i],f=c[i+1];u==="style"?hu(s,f):u==="dangerouslySetInnerHTML"?fu(s,f):u==="children"?Vn(s,f):Qi(s,u,f,d)}switch(l){case"input":Jo(s,o);break;case"textarea":uu(s,o);break;case"select":var g=s._wrapperState.wasMultiple;s._wrapperState.wasMultiple=!!o.multiple;var w=o.value;w!=null?Gr(s,!!o.multiple,w,!1):g!==!!o.multiple&&(o.defaultValue!=null?Gr(s,!!o.multiple,o.defaultValue,!0):Gr(s,!!o.multiple,o.multiple?[]:"",!1))}s[Zn]=o}catch(y){he(e,e.return,y)}}break;case 6:if(ft(t,e),kt(e),n&4){if(e.stateNode===null)throw Error(z(162));s=e.stateNode,o=e.memoizedProps;try{s.nodeValue=o}catch(y){he(e,e.return,y)}}break;case 3:if(ft(t,e),kt(e),n&4&&r!==null&&r.memoizedState.isDehydrated)try{Yn(t.containerInfo)}catch(y){he(e,e.return,y)}break;case 4:ft(t,e),kt(e);break;case 13:ft(t,e),kt(e),s=e.child,s.flags&8192&&(o=s.memoizedState!==null,s.stateNode.isHidden=o,!o||s.alternate!==null&&s.alternate.memoizedState!==null||(_l=ve())),n&4&&sd(e);break;case 22:if(u=r!==null&&r.memoizedState!==null,e.mode&1?(Te=(d=Te)||u,ft(t,e),Te=d):ft(t,e),kt(e),n&8192){if(d=e.memoizedState!==null,(e.stateNode.isHidden=d)&&!u&&e.mode&1)for(T=e,u=e.child;u!==null;){for(f=T=u;T!==null;){switch(g=T,w=g.child,g.tag){case 0:case 11:case 14:case 15:Mn(4,g,g.return);break;case 1:qr(g,g.return);var h=g.stateNode;if(typeof h.componentWillUnmount=="function"){n=g,r=g.return;try{t=n,h.props=t.memoizedProps,h.state=t.memoizedState,h.componentWillUnmount()}catch(y){he(n,r,y)}}break;case 5:qr(g,g.return);break;case 22:if(g.memoizedState!==null){id(f);continue}}w!==null?(w.return=g,T=w):id(f)}u=u.sibling}e:for(u=null,f=e;;){if(f.tag===5){if(u===null){u=f;try{s=f.stateNode,d?(o=s.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"):(l=f.stateNode,c=f.memoizedProps.style,i=c!=null&&c.hasOwnProperty("display")?c.display:null,l.style.display=mu("display",i))}catch(y){he(e,e.return,y)}}}else if(f.tag===6){if(u===null)try{f.stateNode.nodeValue=d?"":f.memoizedProps}catch(y){he(e,e.return,y)}}else if((f.tag!==22&&f.tag!==23||f.memoizedState===null||f===e)&&f.child!==null){f.child.return=f,f=f.child;continue}if(f===e)break e;for(;f.sibling===null;){if(f.return===null||f.return===e)break e;u===f&&(u=null),f=f.return}u===f&&(u=null),f.sibling.return=f.return,f=f.sibling}}break;case 19:ft(t,e),kt(e),n&4&&sd(e);break;case 21:break;default:ft(t,e),kt(e)}}function kt(e){var t=e.flags;if(t&2){try{e:{for(var r=e.return;r!==null;){if(Up(r)){var n=r;break e}r=r.return}throw Error(z(160))}switch(n.tag){case 5:var s=n.stateNode;n.flags&32&&(Vn(s,""),n.flags&=-33);var o=ad(e);Ei(e,o,s);break;case 3:case 4:var i=n.stateNode.containerInfo,l=ad(e);Ci(e,l,i);break;default:throw Error(z(161))}}catch(c){he(e,e.return,c)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function px(e,t,r){T=e,Hp(e)}function Hp(e,t,r){for(var n=(e.mode&1)!==0;T!==null;){var s=T,o=s.child;if(s.tag===22&&n){var i=s.memoizedState!==null||Ma;if(!i){var l=s.alternate,c=l!==null&&l.memoizedState!==null||Te;l=Ma;var d=Te;if(Ma=i,(Te=c)&&!d)for(T=s;T!==null;)i=T,c=i.child,i.tag===22&&i.memoizedState!==null?ld(s):c!==null?(c.return=i,T=c):ld(s);for(;o!==null;)T=o,Hp(o),o=o.sibling;T=s,Ma=l,Te=d}od(e)}else s.subtreeFlags&8772&&o!==null?(o.return=s,T=o):od(e)}}function od(e){for(;T!==null;){var t=T;if(t.flags&8772){var r=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:Te||Bs(5,t);break;case 1:var n=t.stateNode;if(t.flags&4&&!Te)if(r===null)n.componentDidMount();else{var s=t.elementType===t.type?r.memoizedProps:mt(t.type,r.memoizedProps);n.componentDidUpdate(s,r.memoizedState,n.__reactInternalSnapshotBeforeUpdate)}var o=t.updateQueue;o!==null&&Vc(t,o,n);break;case 3:var i=t.updateQueue;if(i!==null){if(r=null,t.child!==null)switch(t.child.tag){case 5:r=t.child.stateNode;break;case 1:r=t.child.stateNode}Vc(t,i,r)}break;case 5:var l=t.stateNode;if(r===null&&t.flags&4){r=l;var c=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&r.focus();break;case"img":c.src&&(r.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var d=t.alternate;if(d!==null){var u=d.memoizedState;if(u!==null){var f=u.dehydrated;f!==null&&Yn(f)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(z(163))}Te||t.flags&512&&Si(t)}catch(g){he(t,t.return,g)}}if(t===e){T=null;break}if(r=t.sibling,r!==null){r.return=t.return,T=r;break}T=t.return}}function id(e){for(;T!==null;){var t=T;if(t===e){T=null;break}var r=t.sibling;if(r!==null){r.return=t.return,T=r;break}T=t.return}}function ld(e){for(;T!==null;){var t=T;try{switch(t.tag){case 0:case 11:case 15:var r=t.return;try{Bs(4,t)}catch(c){he(t,r,c)}break;case 1:var n=t.stateNode;if(typeof n.componentDidMount=="function"){var s=t.return;try{n.componentDidMount()}catch(c){he(t,s,c)}}var o=t.return;try{Si(t)}catch(c){he(t,o,c)}break;case 5:var i=t.return;try{Si(t)}catch(c){he(t,i,c)}}}catch(c){he(t,t.return,c)}if(t===e){T=null;break}var l=t.sibling;if(l!==null){l.return=t.return,T=l;break}T=t.return}}var fx=Math.ceil,ks=Bt.ReactCurrentDispatcher,Cl=Bt.ReactCurrentOwner,st=Bt.ReactCurrentBatchConfig,Y=0,Se=null,be=null,_e=0,qe=0,Yr=mr(0),ke=0,sa=null,Rr=0,$s=0,El=0,In=null,Be=null,_l=0,dn=1/0,Tt=null,Ns=!1,_i=null,ir=null,Ia=!1,er=null,Ss=0,Un=0,zi=null,Xa=-1,Za=0;function Fe(){return Y&6?ve():Xa!==-1?Xa:Xa=ve()}function lr(e){return e.mode&1?Y&2&&_e!==0?_e&-_e:Gh.transition!==null?(Za===0&&(Za=Eu()),Za):(e=K,e!==0||(e=window.event,e=e===void 0?16:Ou(e.type)),e):1}function vt(e,t,r,n){if(50<Un)throw Un=0,zi=null,Error(z(185));da(e,r,n),(!(Y&2)||e!==Se)&&(e===Se&&(!(Y&2)&&($s|=r),ke===4&&Xt(e,_e)),We(e,n),r===1&&Y===0&&!(t.mode&1)&&(dn=ve()+500,Ms&&hr()))}function We(e,t){var r=e.callbackNode;Gm(e,t);var n=ls(e,e===Se?_e:0);if(n===0)r!==null&&gc(r),e.callbackNode=null,e.callbackPriority=0;else if(t=n&-n,e.callbackPriority!==t){if(r!=null&&gc(r),t===1)e.tag===0?Qh(cd.bind(null,e)):Zu(cd.bind(null,e)),Wh(function(){!(Y&6)&&hr()}),r=null;else{switch(_u(n)){case 1:r=el;break;case 4:r=Su;break;case 16:r=is;break;case 536870912:r=Cu;break;default:r=is}r=Kp(r,Vp.bind(null,e))}e.callbackPriority=t,e.callbackNode=r}}function Vp(e,t){if(Xa=-1,Za=0,Y&6)throw Error(z(327));var r=e.callbackNode;if(tn()&&e.callbackNode!==r)return null;var n=ls(e,e===Se?_e:0);if(n===0)return null;if(n&30||n&e.expiredLanes||t)t=Cs(e,n);else{t=n;var s=Y;Y|=2;var o=Jp();(Se!==e||_e!==t)&&(Tt=null,dn=ve()+500,Nr(e,t));do try{xx();break}catch(l){Wp(e,l)}while(!0);fl(),ks.current=o,Y=s,be!==null?t=0:(Se=null,_e=0,t=ke)}if(t!==0){if(t===2&&(s=ri(e),s!==0&&(n=s,t=Ri(e,s))),t===1)throw r=sa,Nr(e,0),Xt(e,n),We(e,ve()),r;if(t===6)Xt(e,n);else{if(s=e.current.alternate,!(n&30)&&!mx(s)&&(t=Cs(e,n),t===2&&(o=ri(e),o!==0&&(n=o,t=Ri(e,o))),t===1))throw r=sa,Nr(e,0),Xt(e,n),We(e,ve()),r;switch(e.finishedWork=s,e.finishedLanes=n,t){case 0:case 1:throw Error(z(345));case 2:yr(e,Be,Tt);break;case 3:if(Xt(e,n),(n&130023424)===n&&(t=_l+500-ve(),10<t)){if(ls(e,0)!==0)break;if(s=e.suspendedLanes,(s&n)!==n){Fe(),e.pingedLanes|=e.suspendedLanes&s;break}e.timeoutHandle=di(yr.bind(null,e,Be,Tt),t);break}yr(e,Be,Tt);break;case 4:if(Xt(e,n),(n&4194240)===n)break;for(t=e.eventTimes,s=-1;0<n;){var i=31-gt(n);o=1<<i,i=t[i],i>s&&(s=i),n&=~o}if(n=s,n=ve()-n,n=(120>n?120:480>n?480:1080>n?1080:1920>n?1920:3e3>n?3e3:4320>n?4320:1960*fx(n/1960))-n,10<n){e.timeoutHandle=di(yr.bind(null,e,Be,Tt),n);break}yr(e,Be,Tt);break;case 5:yr(e,Be,Tt);break;default:throw Error(z(329))}}}return We(e,ve()),e.callbackNode===r?Vp.bind(null,e):null}function Ri(e,t){var r=In;return e.current.memoizedState.isDehydrated&&(Nr(e,t).flags|=256),e=Cs(e,t),e!==2&&(t=Be,Be=r,t!==null&&Pi(t)),e}function Pi(e){Be===null?Be=e:Be.push.apply(Be,e)}function mx(e){for(var t=e;;){if(t.flags&16384){var r=t.updateQueue;if(r!==null&&(r=r.stores,r!==null))for(var n=0;n<r.length;n++){var s=r[n],o=s.getSnapshot;s=s.value;try{if(!yt(o(),s))return!1}catch{return!1}}}if(r=t.child,t.subtreeFlags&16384&&r!==null)r.return=t,t=r;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Xt(e,t){for(t&=~El,t&=~$s,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var r=31-gt(t),n=1<<r;e[r]=-1,t&=~n}}function cd(e){if(Y&6)throw Error(z(327));tn();var t=ls(e,0);if(!(t&1))return We(e,ve()),null;var r=Cs(e,t);if(e.tag!==0&&r===2){var n=ri(e);n!==0&&(t=n,r=Ri(e,n))}if(r===1)throw r=sa,Nr(e,0),Xt(e,t),We(e,ve()),r;if(r===6)throw Error(z(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,yr(e,Be,Tt),We(e,ve()),null}function zl(e,t){var r=Y;Y|=1;try{return e(t)}finally{Y=r,Y===0&&(dn=ve()+500,Ms&&hr())}}function Pr(e){er!==null&&er.tag===0&&!(Y&6)&&tn();var t=Y;Y|=1;var r=st.transition,n=K;try{if(st.transition=null,K=1,e)return e()}finally{K=n,st.transition=r,Y=t,!(Y&6)&&hr()}}function Rl(){qe=Yr.current,oe(Yr)}function Nr(e,t){e.finishedWork=null,e.finishedLanes=0;var r=e.timeoutHandle;if(r!==-1&&(e.timeoutHandle=-1,Vh(r)),be!==null)for(r=be.return;r!==null;){var n=r;switch(dl(n),n.tag){case 1:n=n.type.childContextTypes,n!=null&&fs();break;case 3:ln(),oe(He),oe(Oe),yl();break;case 5:vl(n);break;case 4:ln();break;case 13:oe(ue);break;case 19:oe(ue);break;case 10:ml(n.type._context);break;case 22:case 23:Rl()}r=r.return}if(Se=e,be=e=cr(e.current,null),_e=qe=t,ke=0,sa=null,El=$s=Rr=0,Be=In=null,wr!==null){for(t=0;t<wr.length;t++)if(r=wr[t],n=r.interleaved,n!==null){r.interleaved=null;var s=n.next,o=r.pending;if(o!==null){var i=o.next;o.next=s,n.next=i}r.pending=n}wr=null}return e}function Wp(e,t){do{var r=be;try{if(fl(),Qa.current=js,ws){for(var n=pe.memoizedState;n!==null;){var s=n.queue;s!==null&&(s.pending=null),n=n.next}ws=!1}if(zr=0,Ne=je=pe=null,Fn=!1,ra=0,Cl.current=null,r===null||r.return===null){ke=1,sa=t,be=null;break}e:{var o=e,i=r.return,l=r,c=t;if(t=_e,l.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var d=c,u=l,f=u.tag;if(!(u.mode&1)&&(f===0||f===11||f===15)){var g=u.alternate;g?(u.updateQueue=g.updateQueue,u.memoizedState=g.memoizedState,u.lanes=g.lanes):(u.updateQueue=null,u.memoizedState=null)}var w=Gc(i);if(w!==null){w.flags&=-257,Kc(w,i,l,o,t),w.mode&1&&Qc(o,d,t),t=w,c=d;var h=t.updateQueue;if(h===null){var y=new Set;y.add(c),t.updateQueue=y}else h.add(c);break e}else{if(!(t&1)){Qc(o,d,t),Pl();break e}c=Error(z(426))}}else if(ce&&l.mode&1){var j=Gc(i);if(j!==null){!(j.flags&65536)&&(j.flags|=256),Kc(j,i,l,o,t),ul(cn(c,l));break e}}o=c=cn(c,l),ke!==4&&(ke=2),In===null?In=[o]:In.push(o),o=i;do{switch(o.tag){case 3:o.flags|=65536,t&=-t,o.lanes|=t;var p=_p(o,c,t);Hc(o,p);break e;case 1:l=c;var m=o.type,x=o.stateNode;if(!(o.flags&128)&&(typeof m.getDerivedStateFromError=="function"||x!==null&&typeof x.componentDidCatch=="function"&&(ir===null||!ir.has(x)))){o.flags|=65536,t&=-t,o.lanes|=t;var v=zp(o,l,t);Hc(o,v);break e}}o=o.return}while(o!==null)}Yp(r)}catch(N){t=N,be===r&&r!==null&&(be=r=r.return);continue}break}while(!0)}function Jp(){var e=ks.current;return ks.current=js,e===null?js:e}function Pl(){(ke===0||ke===3||ke===2)&&(ke=4),Se===null||!(Rr&268435455)&&!($s&268435455)||Xt(Se,_e)}function Cs(e,t){var r=Y;Y|=2;var n=Jp();(Se!==e||_e!==t)&&(Tt=null,Nr(e,t));do try{hx();break}catch(s){Wp(e,s)}while(!0);if(fl(),Y=r,ks.current=n,be!==null)throw Error(z(261));return Se=null,_e=0,ke}function hx(){for(;be!==null;)qp(be)}function xx(){for(;be!==null&&!Bm();)qp(be)}function qp(e){var t=Gp(e.alternate,e,qe);e.memoizedProps=e.pendingProps,t===null?Yp(e):be=t,Cl.current=null}function Yp(e){var t=e;do{var r=t.alternate;if(e=t.return,t.flags&32768){if(r=cx(r,t),r!==null){r.flags&=32767,be=r;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{ke=6,be=null;return}}else if(r=lx(r,t,qe),r!==null){be=r;return}if(t=t.sibling,t!==null){be=t;return}be=t=e}while(t!==null);ke===0&&(ke=5)}function yr(e,t,r){var n=K,s=st.transition;try{st.transition=null,K=1,gx(e,t,r,n)}finally{st.transition=s,K=n}return null}function gx(e,t,r,n){do tn();while(er!==null);if(Y&6)throw Error(z(327));r=e.finishedWork;var s=e.finishedLanes;if(r===null)return null;if(e.finishedWork=null,e.finishedLanes=0,r===e.current)throw Error(z(177));e.callbackNode=null,e.callbackPriority=0;var o=r.lanes|r.childLanes;if(Km(e,o),e===Se&&(be=Se=null,_e=0),!(r.subtreeFlags&2064)&&!(r.flags&2064)||Ia||(Ia=!0,Kp(is,function(){return tn(),null})),o=(r.flags&15990)!==0,r.subtreeFlags&15990||o){o=st.transition,st.transition=null;var i=K;K=1;var l=Y;Y|=4,Cl.current=null,ux(e,r),$p(r,e),Fh(li),cs=!!ii,li=ii=null,e.current=r,px(r),$m(),Y=l,K=i,st.transition=o}else e.current=r;if(Ia&&(Ia=!1,er=e,Ss=s),o=e.pendingLanes,o===0&&(ir=null),Wm(r.stateNode),We(e,ve()),t!==null)for(n=e.onRecoverableError,r=0;r<t.length;r++)s=t[r],n(s.value,{componentStack:s.stack,digest:s.digest});if(Ns)throw Ns=!1,e=_i,_i=null,e;return Ss&1&&e.tag!==0&&tn(),o=e.pendingLanes,o&1?e===zi?Un++:(Un=0,zi=e):Un=0,hr(),null}function tn(){if(er!==null){var e=_u(Ss),t=st.transition,r=K;try{if(st.transition=null,K=16>e?16:e,er===null)var n=!1;else{if(e=er,er=null,Ss=0,Y&6)throw Error(z(331));var s=Y;for(Y|=4,T=e.current;T!==null;){var o=T,i=o.child;if(T.flags&16){var l=o.deletions;if(l!==null){for(var c=0;c<l.length;c++){var d=l[c];for(T=d;T!==null;){var u=T;switch(u.tag){case 0:case 11:case 15:Mn(8,u,o)}var f=u.child;if(f!==null)f.return=u,T=f;else for(;T!==null;){u=T;var g=u.sibling,w=u.return;if(Ip(u),u===d){T=null;break}if(g!==null){g.return=w,T=g;break}T=w}}}var h=o.alternate;if(h!==null){var y=h.child;if(y!==null){h.child=null;do{var j=y.sibling;y.sibling=null,y=j}while(y!==null)}}T=o}}if(o.subtreeFlags&2064&&i!==null)i.return=o,T=i;else e:for(;T!==null;){if(o=T,o.flags&2048)switch(o.tag){case 0:case 11:case 15:Mn(9,o,o.return)}var p=o.sibling;if(p!==null){p.return=o.return,T=p;break e}T=o.return}}var m=e.current;for(T=m;T!==null;){i=T;var x=i.child;if(i.subtreeFlags&2064&&x!==null)x.return=i,T=x;else e:for(i=m;T!==null;){if(l=T,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:Bs(9,l)}}catch(N){he(l,l.return,N)}if(l===i){T=null;break e}var v=l.sibling;if(v!==null){v.return=l.return,T=v;break e}T=l.return}}if(Y=s,hr(),Et&&typeof Et.onPostCommitFiberRoot=="function")try{Et.onPostCommitFiberRoot(Ls,e)}catch{}n=!0}return n}finally{K=r,st.transition=t}}return!1}function dd(e,t,r){t=cn(r,t),t=_p(e,t,1),e=or(e,t,1),t=Fe(),e!==null&&(da(e,1,t),We(e,t))}function he(e,t,r){if(e.tag===3)dd(e,e,r);else for(;t!==null;){if(t.tag===3){dd(t,e,r);break}else if(t.tag===1){var n=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof n.componentDidCatch=="function"&&(ir===null||!ir.has(n))){e=cn(r,e),e=zp(t,e,1),t=or(t,e,1),e=Fe(),t!==null&&(da(t,1,e),We(t,e));break}}t=t.return}}function vx(e,t,r){var n=e.pingCache;n!==null&&n.delete(t),t=Fe(),e.pingedLanes|=e.suspendedLanes&r,Se===e&&(_e&r)===r&&(ke===4||ke===3&&(_e&130023424)===_e&&500>ve()-_l?Nr(e,0):El|=r),We(e,t)}function Qp(e,t){t===0&&(e.mode&1?(t=za,za<<=1,!(za&130023424)&&(za=4194304)):t=1);var r=Fe();e=It(e,t),e!==null&&(da(e,t,r),We(e,r))}function yx(e){var t=e.memoizedState,r=0;t!==null&&(r=t.retryLane),Qp(e,r)}function bx(e,t){var r=0;switch(e.tag){case 13:var n=e.stateNode,s=e.memoizedState;s!==null&&(r=s.retryLane);break;case 19:n=e.stateNode;break;default:throw Error(z(314))}n!==null&&n.delete(t),Qp(e,r)}var Gp;Gp=function(e,t,r){if(e!==null)if(e.memoizedProps!==t.pendingProps||He.current)$e=!0;else{if(!(e.lanes&r)&&!(t.flags&128))return $e=!1,ix(e,t,r);$e=!!(e.flags&131072)}else $e=!1,ce&&t.flags&1048576&&ep(t,xs,t.index);switch(t.lanes=0,t.tag){case 2:var n=t.type;Ka(e,t),e=t.pendingProps;var s=an(t,Oe.current);en(t,r),s=wl(null,t,n,e,s,r);var o=jl();return t.flags|=1,typeof s=="object"&&s!==null&&typeof s.render=="function"&&s.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Ve(n)?(o=!0,ms(t)):o=!1,t.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,xl(t),s.updater=Us,t.stateNode=s,s._reactInternals=t,gi(t,n,e,r),t=bi(null,t,n,!0,o,r)):(t.tag=0,ce&&o&&cl(t),De(null,t,s,r),t=t.child),t;case 16:n=t.elementType;e:{switch(Ka(e,t),e=t.pendingProps,s=n._init,n=s(n._payload),t.type=n,s=t.tag=jx(n),e=mt(n,e),s){case 0:t=yi(null,t,n,e,r);break e;case 1:t=ed(null,t,n,e,r);break e;case 11:t=Xc(null,t,n,e,r);break e;case 14:t=Zc(null,t,n,mt(n.type,e),r);break e}throw Error(z(306,n,""))}return t;case 0:return n=t.type,s=t.pendingProps,s=t.elementType===n?s:mt(n,s),yi(e,t,n,s,r);case 1:return n=t.type,s=t.pendingProps,s=t.elementType===n?s:mt(n,s),ed(e,t,n,s,r);case 3:e:{if(Lp(t),e===null)throw Error(z(387));n=t.pendingProps,o=t.memoizedState,s=o.element,op(e,t),ys(t,n,null,r);var i=t.memoizedState;if(n=i.element,o.isDehydrated)if(o={element:n,isDehydrated:!1,cache:i.cache,pendingSuspenseBoundaries:i.pendingSuspenseBoundaries,transitions:i.transitions},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){s=cn(Error(z(423)),t),t=td(e,t,n,r,s);break e}else if(n!==s){s=cn(Error(z(424)),t),t=td(e,t,n,r,s);break e}else for(Ye=sr(t.stateNode.containerInfo.firstChild),Qe=t,ce=!0,xt=null,r=ap(t,null,n,r),t.child=r;r;)r.flags=r.flags&-3|4096,r=r.sibling;else{if(sn(),n===s){t=Ut(e,t,r);break e}De(e,t,n,r)}t=t.child}return t;case 5:return ip(t),e===null&&mi(t),n=t.type,s=t.pendingProps,o=e!==null?e.memoizedProps:null,i=s.children,ci(n,s)?i=null:o!==null&&ci(n,o)&&(t.flags|=32),Tp(e,t),De(e,t,i,r),t.child;case 6:return e===null&&mi(t),null;case 13:return Op(e,t,r);case 4:return gl(t,t.stateNode.containerInfo),n=t.pendingProps,e===null?t.child=on(t,null,n,r):De(e,t,n,r),t.child;case 11:return n=t.type,s=t.pendingProps,s=t.elementType===n?s:mt(n,s),Xc(e,t,n,s,r);case 7:return De(e,t,t.pendingProps,r),t.child;case 8:return De(e,t,t.pendingProps.children,r),t.child;case 12:return De(e,t,t.pendingProps.children,r),t.child;case 10:e:{if(n=t.type._context,s=t.pendingProps,o=t.memoizedProps,i=s.value,re(gs,n._currentValue),n._currentValue=i,o!==null)if(yt(o.value,i)){if(o.children===s.children&&!He.current){t=Ut(e,t,r);break e}}else for(o=t.child,o!==null&&(o.return=t);o!==null;){var l=o.dependencies;if(l!==null){i=o.child;for(var c=l.firstContext;c!==null;){if(c.context===n){if(o.tag===1){c=Dt(-1,r&-r),c.tag=2;var d=o.updateQueue;if(d!==null){d=d.shared;var u=d.pending;u===null?c.next=c:(c.next=u.next,u.next=c),d.pending=c}}o.lanes|=r,c=o.alternate,c!==null&&(c.lanes|=r),hi(o.return,r,t),l.lanes|=r;break}c=c.next}}else if(o.tag===10)i=o.type===t.type?null:o.child;else if(o.tag===18){if(i=o.return,i===null)throw Error(z(341));i.lanes|=r,l=i.alternate,l!==null&&(l.lanes|=r),hi(i,r,t),i=o.sibling}else i=o.child;if(i!==null)i.return=o;else for(i=o;i!==null;){if(i===t){i=null;break}if(o=i.sibling,o!==null){o.return=i.return,i=o;break}i=i.return}o=i}De(e,t,s.children,r),t=t.child}return t;case 9:return s=t.type,n=t.pendingProps.children,en(t,r),s=ot(s),n=n(s),t.flags|=1,De(e,t,n,r),t.child;case 14:return n=t.type,s=mt(n,t.pendingProps),s=mt(n.type,s),Zc(e,t,n,s,r);case 15:return Rp(e,t,t.type,t.pendingProps,r);case 17:return n=t.type,s=t.pendingProps,s=t.elementType===n?s:mt(n,s),Ka(e,t),t.tag=1,Ve(n)?(e=!0,ms(t)):e=!1,en(t,r),Ep(t,n,s),gi(t,n,s,r),bi(null,t,n,!0,e,r);case 19:return Ap(e,t,r);case 22:return Pp(e,t,r)}throw Error(z(156,t.tag))};function Kp(e,t){return Nu(e,t)}function wx(e,t,r,n){this.tag=e,this.key=r,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=n,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function at(e,t,r,n){return new wx(e,t,r,n)}function Tl(e){return e=e.prototype,!(!e||!e.isReactComponent)}function jx(e){if(typeof e=="function")return Tl(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Ki)return 11;if(e===Xi)return 14}return 2}function cr(e,t){var r=e.alternate;return r===null?(r=at(e.tag,t,e.key,e.mode),r.elementType=e.elementType,r.type=e.type,r.stateNode=e.stateNode,r.alternate=e,e.alternate=r):(r.pendingProps=t,r.type=e.type,r.flags=0,r.subtreeFlags=0,r.deletions=null),r.flags=e.flags&14680064,r.childLanes=e.childLanes,r.lanes=e.lanes,r.child=e.child,r.memoizedProps=e.memoizedProps,r.memoizedState=e.memoizedState,r.updateQueue=e.updateQueue,t=e.dependencies,r.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},r.sibling=e.sibling,r.index=e.index,r.ref=e.ref,r}function es(e,t,r,n,s,o){var i=2;if(n=e,typeof e=="function")Tl(e)&&(i=1);else if(typeof e=="string")i=5;else e:switch(e){case Mr:return Sr(r.children,s,o,t);case Gi:i=8,s|=8;break;case Bo:return e=at(12,r,t,s|2),e.elementType=Bo,e.lanes=o,e;case $o:return e=at(13,r,t,s),e.elementType=$o,e.lanes=o,e;case Ho:return e=at(19,r,t,s),e.elementType=Ho,e.lanes=o,e;case iu:return Hs(r,s,o,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case su:i=10;break e;case ou:i=9;break e;case Ki:i=11;break e;case Xi:i=14;break e;case Qt:i=16,n=null;break e}throw Error(z(130,e==null?e:typeof e,""))}return t=at(i,r,t,s),t.elementType=e,t.type=n,t.lanes=o,t}function Sr(e,t,r,n){return e=at(7,e,n,t),e.lanes=r,e}function Hs(e,t,r,n){return e=at(22,e,n,t),e.elementType=iu,e.lanes=r,e.stateNode={isHidden:!1},e}function Ro(e,t,r){return e=at(6,e,null,t),e.lanes=r,e}function Po(e,t,r){return t=at(4,e.children!==null?e.children:[],e.key,t),t.lanes=r,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function kx(e,t,r,n,s){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=uo(0),this.expirationTimes=uo(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=uo(0),this.identifierPrefix=n,this.onRecoverableError=s,this.mutableSourceEagerHydrationData=null}function Ll(e,t,r,n,s,o,i,l,c){return e=new kx(e,t,r,l,c),t===1?(t=1,o===!0&&(t|=8)):t=0,o=at(3,null,null,t),e.current=o,o.stateNode=e,o.memoizedState={element:n,isDehydrated:r,cache:null,transitions:null,pendingSuspenseBoundaries:null},xl(o),e}function Nx(e,t,r){var n=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Fr,key:n==null?null:""+n,children:e,containerInfo:t,implementation:r}}function Xp(e){if(!e)return pr;e=e._reactInternals;e:{if(Or(e)!==e||e.tag!==1)throw Error(z(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Ve(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(z(171))}if(e.tag===1){var r=e.type;if(Ve(r))return Xu(e,r,t)}return t}function Zp(e,t,r,n,s,o,i,l,c){return e=Ll(r,n,!0,e,s,o,i,l,c),e.context=Xp(null),r=e.current,n=Fe(),s=lr(r),o=Dt(n,s),o.callback=t??null,or(r,o,s),e.current.lanes=s,da(e,s,n),We(e,n),e}function Vs(e,t,r,n){var s=t.current,o=Fe(),i=lr(s);return r=Xp(r),t.context===null?t.context=r:t.pendingContext=r,t=Dt(o,i),t.payload={element:e},n=n===void 0?null:n,n!==null&&(t.callback=n),e=or(s,t,i),e!==null&&(vt(e,s,i,o),Ya(e,s,i)),i}function Es(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function ud(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var r=e.retryLane;e.retryLane=r!==0&&r<t?r:t}}function Ol(e,t){ud(e,t),(e=e.alternate)&&ud(e,t)}function Sx(){return null}var ef=typeof reportError=="function"?reportError:function(e){console.error(e)};function Al(e){this._internalRoot=e}Ws.prototype.render=Al.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(z(409));Vs(e,t,null,null)};Ws.prototype.unmount=Al.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Pr(function(){Vs(null,e,null,null)}),t[Mt]=null}};function Ws(e){this._internalRoot=e}Ws.prototype.unstable_scheduleHydration=function(e){if(e){var t=Pu();e={blockedOn:null,target:e,priority:t};for(var r=0;r<Kt.length&&t!==0&&t<Kt[r].priority;r++);Kt.splice(r,0,e),r===0&&Lu(e)}};function Dl(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Js(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function pd(){}function Cx(e,t,r,n,s){if(s){if(typeof n=="function"){var o=n;n=function(){var d=Es(i);o.call(d)}}var i=Zp(t,n,e,0,null,!1,!1,"",pd);return e._reactRootContainer=i,e[Mt]=i.current,Kn(e.nodeType===8?e.parentNode:e),Pr(),i}for(;s=e.lastChild;)e.removeChild(s);if(typeof n=="function"){var l=n;n=function(){var d=Es(c);l.call(d)}}var c=Ll(e,0,!1,null,null,!1,!1,"",pd);return e._reactRootContainer=c,e[Mt]=c.current,Kn(e.nodeType===8?e.parentNode:e),Pr(function(){Vs(t,c,r,n)}),c}function qs(e,t,r,n,s){var o=r._reactRootContainer;if(o){var i=o;if(typeof s=="function"){var l=s;s=function(){var c=Es(i);l.call(c)}}Vs(t,i,e,s)}else i=Cx(r,t,e,s,n);return Es(i)}zu=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var r=Rn(t.pendingLanes);r!==0&&(tl(t,r|1),We(t,ve()),!(Y&6)&&(dn=ve()+500,hr()))}break;case 13:Pr(function(){var n=It(e,1);if(n!==null){var s=Fe();vt(n,e,1,s)}}),Ol(e,1)}};rl=function(e){if(e.tag===13){var t=It(e,134217728);if(t!==null){var r=Fe();vt(t,e,134217728,r)}Ol(e,134217728)}};Ru=function(e){if(e.tag===13){var t=lr(e),r=It(e,t);if(r!==null){var n=Fe();vt(r,e,t,n)}Ol(e,t)}};Pu=function(){return K};Tu=function(e,t){var r=K;try{return K=e,t()}finally{K=r}};Zo=function(e,t,r){switch(t){case"input":if(Jo(e,r),t=r.name,r.type==="radio"&&t!=null){for(r=e;r.parentNode;)r=r.parentNode;for(r=r.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<r.length;t++){var n=r[t];if(n!==e&&n.form===e.form){var s=Fs(n);if(!s)throw Error(z(90));cu(n),Jo(n,s)}}}break;case"textarea":uu(e,r);break;case"select":t=r.value,t!=null&&Gr(e,!!r.multiple,t,!1)}};vu=zl;yu=Pr;var Ex={usingClientEntryPoint:!1,Events:[pa,$r,Fs,xu,gu,zl]},Cn={findFiberByHostInstance:br,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},_x={bundleType:Cn.bundleType,version:Cn.version,rendererPackageName:Cn.rendererPackageName,rendererConfig:Cn.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Bt.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=ju(e),e===null?null:e.stateNode},findFiberByHostInstance:Cn.findFiberByHostInstance||Sx,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ua=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ua.isDisabled&&Ua.supportsFiber)try{Ls=Ua.inject(_x),Et=Ua}catch{}}Ke.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Ex;Ke.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Dl(t))throw Error(z(200));return Nx(e,t,null,r)};Ke.createRoot=function(e,t){if(!Dl(e))throw Error(z(299));var r=!1,n="",s=ef;return t!=null&&(t.unstable_strictMode===!0&&(r=!0),t.identifierPrefix!==void 0&&(n=t.identifierPrefix),t.onRecoverableError!==void 0&&(s=t.onRecoverableError)),t=Ll(e,1,!1,null,null,r,!1,n,s),e[Mt]=t.current,Kn(e.nodeType===8?e.parentNode:e),new Al(t)};Ke.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(z(188)):(e=Object.keys(e).join(","),Error(z(268,e)));return e=ju(t),e=e===null?null:e.stateNode,e};Ke.flushSync=function(e){return Pr(e)};Ke.hydrate=function(e,t,r){if(!Js(t))throw Error(z(200));return qs(null,e,t,!0,r)};Ke.hydrateRoot=function(e,t,r){if(!Dl(e))throw Error(z(405));var n=r!=null&&r.hydratedSources||null,s=!1,o="",i=ef;if(r!=null&&(r.unstable_strictMode===!0&&(s=!0),r.identifierPrefix!==void 0&&(o=r.identifierPrefix),r.onRecoverableError!==void 0&&(i=r.onRecoverableError)),t=Zp(t,null,e,1,r??null,s,!1,o,i),e[Mt]=t.current,Kn(e),n)for(e=0;e<n.length;e++)r=n[e],s=r._getVersion,s=s(r._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[r,s]:t.mutableSourceEagerHydrationData.push(r,s);return new Ws(t)};Ke.render=function(e,t,r){if(!Js(t))throw Error(z(200));return qs(null,e,t,!1,r)};Ke.unmountComponentAtNode=function(e){if(!Js(e))throw Error(z(40));return e._reactRootContainer?(Pr(function(){qs(null,null,e,!1,function(){e._reactRootContainer=null,e[Mt]=null})}),!0):!1};Ke.unstable_batchedUpdates=zl;Ke.unstable_renderSubtreeIntoContainer=function(e,t,r,n){if(!Js(r))throw Error(z(200));if(e==null||e._reactInternals===void 0)throw Error(z(38));return qs(e,t,r,!1,n)};Ke.version="18.3.1-next-f1338f8080-20240426";function tf(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(tf)}catch(e){console.error(e)}}tf(),tu.exports=Ke;var zx=tu.exports,fd=zx;Io.createRoot=fd.createRoot,Io.hydrateRoot=fd.hydrateRoot;/**
 * @remix-run/router v1.23.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function oa(){return oa=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},oa.apply(null,arguments)}var tr;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(tr||(tr={}));const md="popstate";function Rx(e){e===void 0&&(e={});function t(n,s){let{pathname:o,search:i,hash:l}=n.location;return Ti("",{pathname:o,search:i,hash:l},s.state&&s.state.usr||null,s.state&&s.state.key||"default")}function r(n,s){return typeof s=="string"?s:_s(s)}return Tx(t,r,null,e)}function ye(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function Fl(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function Px(){return Math.random().toString(36).substr(2,8)}function hd(e,t){return{usr:e.state,key:e.key,idx:t}}function Ti(e,t,r,n){return r===void 0&&(r=null),oa({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?xn(t):t,{state:r,key:t&&t.key||n||Px()})}function _s(e){let{pathname:t="/",search:r="",hash:n=""}=e;return r&&r!=="?"&&(t+=r.charAt(0)==="?"?r:"?"+r),n&&n!=="#"&&(t+=n.charAt(0)==="#"?n:"#"+n),t}function xn(e){let t={};if(e){let r=e.indexOf("#");r>=0&&(t.hash=e.substr(r),e=e.substr(0,r));let n=e.indexOf("?");n>=0&&(t.search=e.substr(n),e=e.substr(0,n)),e&&(t.pathname=e)}return t}function Tx(e,t,r,n){n===void 0&&(n={});let{window:s=document.defaultView,v5Compat:o=!1}=n,i=s.history,l=tr.Pop,c=null,d=u();d==null&&(d=0,i.replaceState(oa({},i.state,{idx:d}),""));function u(){return(i.state||{idx:null}).idx}function f(){l=tr.Pop;let j=u(),p=j==null?null:j-d;d=j,c&&c({action:l,location:y.location,delta:p})}function g(j,p){l=tr.Push;let m=Ti(y.location,j,p);d=u()+1;let x=hd(m,d),v=y.createHref(m);try{i.pushState(x,"",v)}catch(N){if(N instanceof DOMException&&N.name==="DataCloneError")throw N;s.location.assign(v)}o&&c&&c({action:l,location:y.location,delta:1})}function w(j,p){l=tr.Replace;let m=Ti(y.location,j,p);d=u();let x=hd(m,d),v=y.createHref(m);i.replaceState(x,"",v),o&&c&&c({action:l,location:y.location,delta:0})}function h(j){let p=s.location.origin!=="null"?s.location.origin:s.location.href,m=typeof j=="string"?j:_s(j);return m=m.replace(/ $/,"%20"),ye(p,"No window.location.(origin|href) available to create URL for href: "+m),new URL(m,p)}let y={get action(){return l},get location(){return e(s,i)},listen(j){if(c)throw new Error("A history only accepts one active listener");return s.addEventListener(md,f),c=j,()=>{s.removeEventListener(md,f),c=null}},createHref(j){return t(s,j)},createURL:h,encodeLocation(j){let p=h(j);return{pathname:p.pathname,search:p.search,hash:p.hash}},push:g,replace:w,go(j){return i.go(j)}};return y}var xd;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(xd||(xd={}));function Lx(e,t,r){return r===void 0&&(r="/"),Ox(e,t,r)}function Ox(e,t,r,n){let s=typeof t=="string"?xn(t):t,o=Ml(s.pathname||"/",r);if(o==null)return null;let i=rf(e);Ax(i);let l=null,c=qx(o);for(let d=0;l==null&&d<i.length;++d)l=Vx(i[d],c);return l}function rf(e,t,r,n){t===void 0&&(t=[]),r===void 0&&(r=[]),n===void 0&&(n="");let s=(o,i,l)=>{let c={relativePath:l===void 0?o.path||"":l,caseSensitive:o.caseSensitive===!0,childrenIndex:i,route:o};c.relativePath.startsWith("/")&&(ye(c.relativePath.startsWith(n),'Absolute route path "'+c.relativePath+'" nested under path '+('"'+n+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),c.relativePath=c.relativePath.slice(n.length));let d=dr([n,c.relativePath]),u=r.concat(c);o.children&&o.children.length>0&&(ye(o.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+d+'".')),rf(o.children,t,u,d)),!(o.path==null&&!o.index)&&t.push({path:d,score:$x(d,o.index),routesMeta:u})};return e.forEach((o,i)=>{var l;if(o.path===""||!((l=o.path)!=null&&l.includes("?")))s(o,i);else for(let c of nf(o.path))s(o,i,c)}),t}function nf(e){let t=e.split("/");if(t.length===0)return[];let[r,...n]=t,s=r.endsWith("?"),o=r.replace(/\?$/,"");if(n.length===0)return s?[o,""]:[o];let i=nf(n.join("/")),l=[];return l.push(...i.map(c=>c===""?o:[o,c].join("/"))),s&&l.push(...i),l.map(c=>e.startsWith("/")&&c===""?"/":c)}function Ax(e){e.sort((t,r)=>t.score!==r.score?r.score-t.score:Hx(t.routesMeta.map(n=>n.childrenIndex),r.routesMeta.map(n=>n.childrenIndex)))}const Dx=/^:[\w-]+$/,Fx=3,Mx=2,Ix=1,Ux=10,Bx=-2,gd=e=>e==="*";function $x(e,t){let r=e.split("/"),n=r.length;return r.some(gd)&&(n+=Bx),t&&(n+=Mx),r.filter(s=>!gd(s)).reduce((s,o)=>s+(Dx.test(o)?Fx:o===""?Ix:Ux),n)}function Hx(e,t){return e.length===t.length&&e.slice(0,-1).every((n,s)=>n===t[s])?e[e.length-1]-t[t.length-1]:0}function Vx(e,t,r){let{routesMeta:n}=e,s={},o="/",i=[];for(let l=0;l<n.length;++l){let c=n[l],d=l===n.length-1,u=o==="/"?t:t.slice(o.length)||"/",f=Wx({path:c.relativePath,caseSensitive:c.caseSensitive,end:d},u),g=c.route;if(!f)return null;Object.assign(s,f.params),i.push({params:s,pathname:dr([o,f.pathname]),pathnameBase:Xx(dr([o,f.pathnameBase])),route:g}),f.pathnameBase!=="/"&&(o=dr([o,f.pathnameBase]))}return i}function Wx(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[r,n]=Jx(e.path,e.caseSensitive,e.end),s=t.match(r);if(!s)return null;let o=s[0],i=o.replace(/(.)\/+$/,"$1"),l=s.slice(1);return{params:n.reduce((d,u,f)=>{let{paramName:g,isOptional:w}=u;if(g==="*"){let y=l[f]||"";i=o.slice(0,o.length-y.length).replace(/(.)\/+$/,"$1")}const h=l[f];return w&&!h?d[g]=void 0:d[g]=(h||"").replace(/%2F/g,"/"),d},{}),pathname:o,pathnameBase:i,pattern:e}}function Jx(e,t,r){t===void 0&&(t=!1),r===void 0&&(r=!0),Fl(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let n=[],s="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(i,l,c)=>(n.push({paramName:l,isOptional:c!=null}),c?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(n.push({paramName:"*"}),s+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):r?s+="\\/*$":e!==""&&e!=="/"&&(s+="(?:(?=\\/|$))"),[new RegExp(s,t?void 0:"i"),n]}function qx(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return Fl(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function Ml(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let r=t.endsWith("/")?t.length-1:t.length,n=e.charAt(r);return n&&n!=="/"?null:e.slice(r)||"/"}const Yx=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Qx=e=>Yx.test(e);function Gx(e,t){t===void 0&&(t="/");let{pathname:r,search:n="",hash:s=""}=typeof e=="string"?xn(e):e,o;if(r)if(Qx(r))o=r;else{if(r.includes("//")){let i=r;r=af(r),Fl(!1,"Pathnames cannot have embedded double slashes - normalizing "+(i+" -> "+r))}r.startsWith("/")?o=vd(r.substring(1),"/"):o=vd(r,t)}else o=t;return{pathname:o,search:Zx(n),hash:eg(s)}}function vd(e,t){let r=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(s=>{s===".."?r.length>1&&r.pop():s!=="."&&r.push(s)}),r.length>1?r.join("/"):"/"}function To(e,t,r,n){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(n)+"].  Please separate it out to the ")+("`to."+r+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function Kx(e){return e.filter((t,r)=>r===0||t.route.path&&t.route.path.length>0)}function Il(e,t){let r=Kx(e);return t?r.map((n,s)=>s===r.length-1?n.pathname:n.pathnameBase):r.map(n=>n.pathnameBase)}function Ul(e,t,r,n){n===void 0&&(n=!1);let s;typeof e=="string"?s=xn(e):(s=oa({},e),ye(!s.pathname||!s.pathname.includes("?"),To("?","pathname","search",s)),ye(!s.pathname||!s.pathname.includes("#"),To("#","pathname","hash",s)),ye(!s.search||!s.search.includes("#"),To("#","search","hash",s)));let o=e===""||s.pathname==="",i=o?"/":s.pathname,l;if(i==null)l=r;else{let f=t.length-1;if(!n&&i.startsWith("..")){let g=i.split("/");for(;g[0]==="..";)g.shift(),f-=1;s.pathname=g.join("/")}l=f>=0?t[f]:"/"}let c=Gx(s,l),d=i&&i!=="/"&&i.endsWith("/"),u=(o||i===".")&&r.endsWith("/");return!c.pathname.endsWith("/")&&(d||u)&&(c.pathname+="/"),c}const af=e=>e.replace(/\/\/+/g,"/"),dr=e=>af(e.join("/")),Xx=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),Zx=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,eg=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function tg(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}const sf=["post","put","patch","delete"];new Set(sf);const rg=["get",...sf];new Set(rg);/**
 * React Router v6.30.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function ia(){return ia=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},ia.apply(null,arguments)}const Bl=b.createContext(null),ng=b.createContext(null),xr=b.createContext(null),Ys=b.createContext(null),$t=b.createContext({outlet:null,matches:[],isDataRoute:!1}),of=b.createContext(null);function ag(e,t){let{relative:r}=t===void 0?{}:t;gn()||ye(!1);let{basename:n,navigator:s}=b.useContext(xr),{hash:o,pathname:i,search:l}=df(e,{relative:r}),c=i;return n!=="/"&&(c=i==="/"?n:dr([n,i])),s.createHref({pathname:c,search:l,hash:o})}function gn(){return b.useContext(Ys)!=null}function Ze(){return gn()||ye(!1),b.useContext(Ys).location}function lf(e){b.useContext(xr).static||b.useLayoutEffect(e)}function lt(){let{isDataRoute:e}=b.useContext($t);return e?gg():sg()}function sg(){gn()||ye(!1);let e=b.useContext(Bl),{basename:t,future:r,navigator:n}=b.useContext(xr),{matches:s}=b.useContext($t),{pathname:o}=Ze(),i=JSON.stringify(Il(s,r.v7_relativeSplatPath)),l=b.useRef(!1);return lf(()=>{l.current=!0}),b.useCallback(function(d,u){if(u===void 0&&(u={}),!l.current)return;if(typeof d=="number"){n.go(d);return}let f=Ul(d,JSON.parse(i),o,u.relative==="path");e==null&&t!=="/"&&(f.pathname=f.pathname==="/"?t:dr([t,f.pathname])),(u.replace?n.replace:n.push)(f,u.state,u)},[t,n,i,o,e])}function cf(){let{matches:e}=b.useContext($t),t=e[e.length-1];return t?t.params:{}}function df(e,t){let{relative:r}=t===void 0?{}:t,{future:n}=b.useContext(xr),{matches:s}=b.useContext($t),{pathname:o}=Ze(),i=JSON.stringify(Il(s,n.v7_relativeSplatPath));return b.useMemo(()=>Ul(e,JSON.parse(i),o,r==="path"),[e,i,o,r])}function og(e,t){return ig(e,t)}function ig(e,t,r,n){gn()||ye(!1);let{navigator:s}=b.useContext(xr),{matches:o}=b.useContext($t),i=o[o.length-1],l=i?i.params:{};i&&i.pathname;let c=i?i.pathnameBase:"/";i&&i.route;let d=Ze(),u;if(t){var f;let j=typeof t=="string"?xn(t):t;c==="/"||(f=j.pathname)!=null&&f.startsWith(c)||ye(!1),u=j}else u=d;let g=u.pathname||"/",w=g;if(c!=="/"){let j=c.replace(/^\//,"").split("/");w="/"+g.replace(/^\//,"").split("/").slice(j.length).join("/")}let h=Lx(e,{pathname:w}),y=pg(h&&h.map(j=>Object.assign({},j,{params:Object.assign({},l,j.params),pathname:dr([c,s.encodeLocation?s.encodeLocation(j.pathname).pathname:j.pathname]),pathnameBase:j.pathnameBase==="/"?c:dr([c,s.encodeLocation?s.encodeLocation(j.pathnameBase).pathname:j.pathnameBase])})),o,r,n);return t&&y?b.createElement(Ys.Provider,{value:{location:ia({pathname:"/",search:"",hash:"",state:null,key:"default"},u),navigationType:tr.Pop}},y):y}function lg(){let e=xg(),t=tg(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),r=e instanceof Error?e.stack:null,s={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return b.createElement(b.Fragment,null,b.createElement("h2",null,"Unexpected Application Error!"),b.createElement("h3",{style:{fontStyle:"italic"}},t),r?b.createElement("pre",{style:s},r):null,null)}const cg=b.createElement(lg,null);class dg extends b.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,r){return r.location!==t.location||r.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:r.error,location:r.location,revalidation:t.revalidation||r.revalidation}}componentDidCatch(t,r){console.error("React Router caught the following error during render",t,r)}render(){return this.state.error!==void 0?b.createElement($t.Provider,{value:this.props.routeContext},b.createElement(of.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function ug(e){let{routeContext:t,match:r,children:n}=e,s=b.useContext(Bl);return s&&s.static&&s.staticContext&&(r.route.errorElement||r.route.ErrorBoundary)&&(s.staticContext._deepestRenderedBoundaryId=r.route.id),b.createElement($t.Provider,{value:t},n)}function pg(e,t,r,n){var s;if(t===void 0&&(t=[]),r===void 0&&(r=null),n===void 0&&(n=null),e==null){var o;if(!r)return null;if(r.errors)e=r.matches;else if((o=n)!=null&&o.v7_partialHydration&&t.length===0&&!r.initialized&&r.matches.length>0)e=r.matches;else return null}let i=e,l=(s=r)==null?void 0:s.errors;if(l!=null){let u=i.findIndex(f=>f.route.id&&(l==null?void 0:l[f.route.id])!==void 0);u>=0||ye(!1),i=i.slice(0,Math.min(i.length,u+1))}let c=!1,d=-1;if(r&&n&&n.v7_partialHydration)for(let u=0;u<i.length;u++){let f=i[u];if((f.route.HydrateFallback||f.route.hydrateFallbackElement)&&(d=u),f.route.id){let{loaderData:g,errors:w}=r,h=f.route.loader&&g[f.route.id]===void 0&&(!w||w[f.route.id]===void 0);if(f.route.lazy||h){c=!0,d>=0?i=i.slice(0,d+1):i=[i[0]];break}}}return i.reduceRight((u,f,g)=>{let w,h=!1,y=null,j=null;r&&(w=l&&f.route.id?l[f.route.id]:void 0,y=f.route.errorElement||cg,c&&(d<0&&g===0?(vg("route-fallback"),h=!0,j=null):d===g&&(h=!0,j=f.route.hydrateFallbackElement||null)));let p=t.concat(i.slice(0,g+1)),m=()=>{let x;return w?x=y:h?x=j:f.route.Component?x=b.createElement(f.route.Component,null):f.route.element?x=f.route.element:x=u,b.createElement(ug,{match:f,routeContext:{outlet:u,matches:p,isDataRoute:r!=null},children:x})};return r&&(f.route.ErrorBoundary||f.route.errorElement||g===0)?b.createElement(dg,{location:r.location,revalidation:r.revalidation,component:y,error:w,children:m(),routeContext:{outlet:null,matches:p,isDataRoute:!0}}):m()},null)}var uf=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(uf||{}),pf=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(pf||{});function fg(e){let t=b.useContext(Bl);return t||ye(!1),t}function mg(e){let t=b.useContext(ng);return t||ye(!1),t}function hg(e){let t=b.useContext($t);return t||ye(!1),t}function ff(e){let t=hg(),r=t.matches[t.matches.length-1];return r.route.id||ye(!1),r.route.id}function xg(){var e;let t=b.useContext(of),r=mg(),n=ff();return t!==void 0?t:(e=r.errors)==null?void 0:e[n]}function gg(){let{router:e}=fg(uf.UseNavigateStable),t=ff(pf.UseNavigateStable),r=b.useRef(!1);return lf(()=>{r.current=!0}),b.useCallback(function(s,o){o===void 0&&(o={}),r.current&&(typeof s=="number"?e.navigate(s):e.navigate(s,ia({fromRouteId:t},o)))},[e,t])}const yd={};function vg(e,t,r){yd[e]||(yd[e]=!0)}function yg(e,t){e==null||e.v7_startTransition,e==null||e.v7_relativeSplatPath}function bd(e){let{to:t,replace:r,state:n,relative:s}=e;gn()||ye(!1);let{future:o,static:i}=b.useContext(xr),{matches:l}=b.useContext($t),{pathname:c}=Ze(),d=lt(),u=Ul(t,Il(l,o.v7_relativeSplatPath),c,s==="path"),f=JSON.stringify(u);return b.useEffect(()=>d(JSON.parse(f),{replace:r,state:n,relative:s}),[d,f,s,r,n]),null}function Ae(e){ye(!1)}function bg(e){let{basename:t="/",children:r=null,location:n,navigationType:s=tr.Pop,navigator:o,static:i=!1,future:l}=e;gn()&&ye(!1);let c=t.replace(/^\/*/,"/"),d=b.useMemo(()=>({basename:c,navigator:o,static:i,future:ia({v7_relativeSplatPath:!1},l)}),[c,l,o,i]);typeof n=="string"&&(n=xn(n));let{pathname:u="/",search:f="",hash:g="",state:w=null,key:h="default"}=n,y=b.useMemo(()=>{let j=Ml(u,c);return j==null?null:{location:{pathname:j,search:f,hash:g,state:w,key:h},navigationType:s}},[c,u,f,g,w,h,s]);return y==null?null:b.createElement(xr.Provider,{value:d},b.createElement(Ys.Provider,{children:r,value:y}))}function wg(e){let{children:t,location:r}=e;return og(Li(t),r)}new Promise(()=>{});function Li(e,t){t===void 0&&(t=[]);let r=[];return b.Children.forEach(e,(n,s)=>{if(!b.isValidElement(n))return;let o=[...t,s];if(n.type===b.Fragment){r.push.apply(r,Li(n.props.children,o));return}n.type!==Ae&&ye(!1),!n.props.index||!n.props.children||ye(!1);let i={id:n.props.id||o.join("-"),caseSensitive:n.props.caseSensitive,element:n.props.element,Component:n.props.Component,index:n.props.index,path:n.props.path,loader:n.props.loader,action:n.props.action,errorElement:n.props.errorElement,ErrorBoundary:n.props.ErrorBoundary,hasErrorBoundary:n.props.ErrorBoundary!=null||n.props.errorElement!=null,shouldRevalidate:n.props.shouldRevalidate,handle:n.props.handle,lazy:n.props.lazy};n.props.children&&(i.children=Li(n.props.children,o)),r.push(i)}),r}/**
 * React Router DOM v6.30.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Oi(){return Oi=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},Oi.apply(null,arguments)}function jg(e,t){if(e==null)return{};var r={};for(var n in e)if({}.hasOwnProperty.call(e,n)){if(t.indexOf(n)!==-1)continue;r[n]=e[n]}return r}function kg(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function Ng(e,t){return e.button===0&&(!t||t==="_self")&&!kg(e)}function Ai(e){return e===void 0&&(e=""),new URLSearchParams(typeof e=="string"||Array.isArray(e)||e instanceof URLSearchParams?e:Object.keys(e).reduce((t,r)=>{let n=e[r];return t.concat(Array.isArray(n)?n.map(s=>[r,s]):[[r,n]])},[]))}function Sg(e,t){let r=Ai(e);return t&&t.forEach((n,s)=>{r.has(s)||t.getAll(s).forEach(o=>{r.append(s,o)})}),r}const Cg=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],Eg="6";try{window.__reactRouterVersion=Eg}catch{}const _g="startTransition",wd=vm[_g];function zg(e){let{basename:t,children:r,future:n,window:s}=e,o=b.useRef();o.current==null&&(o.current=Rx({window:s,v5Compat:!0}));let i=o.current,[l,c]=b.useState({action:i.action,location:i.location}),{v7_startTransition:d}=n||{},u=b.useCallback(f=>{d&&wd?wd(()=>c(f)):c(f)},[c,d]);return b.useLayoutEffect(()=>i.listen(u),[i,u]),b.useEffect(()=>yg(n),[n]),b.createElement(bg,{basename:t,children:r,location:l.location,navigationType:l.action,navigator:i,future:n})}const Rg=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",Pg=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,B=b.forwardRef(function(t,r){let{onClick:n,relative:s,reloadDocument:o,replace:i,state:l,target:c,to:d,preventScrollReset:u,viewTransition:f}=t,g=jg(t,Cg),{basename:w}=b.useContext(xr),h,y=!1;if(typeof d=="string"&&Pg.test(d)&&(h=d,Rg))try{let x=new URL(window.location.href),v=d.startsWith("//")?new URL(x.protocol+d):new URL(d),N=Ml(v.pathname,w);v.origin===x.origin&&N!=null?d=N+v.search+v.hash:y=!0}catch{}let j=ag(d,{relative:s}),p=Tg(d,{replace:i,state:l,target:c,preventScrollReset:u,relative:s,viewTransition:f});function m(x){n&&n(x),x.defaultPrevented||p(x)}return b.createElement("a",Oi({},g,{href:h||j,onClick:y||o?n:m,ref:r,target:c}))});var jd;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(jd||(jd={}));var kd;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(kd||(kd={}));function Tg(e,t){let{target:r,replace:n,state:s,preventScrollReset:o,relative:i,viewTransition:l}=t===void 0?{}:t,c=lt(),d=Ze(),u=df(e,{relative:i});return b.useCallback(f=>{if(Ng(f,r)){f.preventDefault();let g=n!==void 0?n:_s(d)===_s(u);c(e,{replace:g,state:s,preventScrollReset:o,relative:i,viewTransition:l})}},[d,c,u,n,s,r,e,o,i,l])}function $l(e){let t=b.useRef(Ai(e)),r=b.useRef(!1),n=Ze(),s=b.useMemo(()=>Sg(n.search,r.current?null:t.current),[n.search]),o=lt(),i=b.useCallback((l,c)=>{const d=Ai(typeof l=="function"?l(s):l);r.current=!0,o("?"+d,c)},[o,s]);return[s,i]}/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lg=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),mf=(...e)=>e.filter((t,r,n)=>!!t&&n.indexOf(t)===r).join(" ");/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Og={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ag=b.forwardRef(({color:e="currentColor",size:t=24,strokeWidth:r=2,absoluteStrokeWidth:n,className:s="",children:o,iconNode:i,...l},c)=>b.createElement("svg",{ref:c,...Og,width:t,height:t,stroke:e,strokeWidth:n?Number(r)*24/Number(t):r,className:mf("lucide",s),...l},[...i.map(([d,u])=>b.createElement(d,u)),...Array.isArray(o)?o:[o]]));/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=(e,t)=>{const r=b.forwardRef(({className:n,...s},o)=>b.createElement(Ag,{ref:o,iconNode:t,className:mf(`lucide-${Lg(e)}`,n),...s}));return r.displayName=`${e}`,r};/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qs=M("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hl=M("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lo=M("Bell",[["path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9",key:"1qo2s2"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0",key:"qgo35s"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zt=M("Briefcase",[["path",{d:"M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",key:"jecpp"}],["rect",{width:"20",height:"14",x:"2",y:"6",rx:"2",key:"i6l2r4"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dg=M("Building",[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2",ry:"2",key:"76otgf"}],["path",{d:"M9 22v-4h6v4",key:"r93iot"}],["path",{d:"M8 6h.01",key:"1dz90k"}],["path",{d:"M16 6h.01",key:"1x0f13"}],["path",{d:"M12 6h.01",key:"1vi96p"}],["path",{d:"M12 10h.01",key:"1nrarc"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M16 10h.01",key:"1m94wz"}],["path",{d:"M16 14h.01",key:"1gbofw"}],["path",{d:"M8 10h.01",key:"19clt8"}],["path",{d:"M8 14h.01",key:"6423bh"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vl=M("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oo=M("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hf=M("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fg=M("CircleAlert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ct=M("CircleCheckBig",[["path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14",key:"g774vq"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xf=M("CircleCheck",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Di=M("Download",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mg=M("ExternalLink",[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gf=M("EyeOff",[["path",{d:"M9.88 9.88a3 3 0 1 0 4.24 4.24",key:"1jxqfv"}],["path",{d:"M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68",key:"9wicm4"}],["path",{d:"M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61",key:"1jreej"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vf=M("Eye",[["path",{d:"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z",key:"rwhkz3"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yf=M("Facebook",[["path",{d:"M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",key:"1jg4f8"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ig=M("FileCode",[["path",{d:"M10 12.5 8 15l2 2.5",key:"1tg20x"}],["path",{d:"m14 12.5 2 2.5-2 2.5",key:"yinavb"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z",key:"1mlx9k"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qr=M("FileText",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ug=M("Home",[["path",{d:"m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"y5dka4"}],["polyline",{points:"9 22 9 12 15 12 15 22",key:"e2us08"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bg=M("IndianRupee",[["path",{d:"M6 3h12",key:"ggurg9"}],["path",{d:"M6 8h12",key:"6g4wlu"}],["path",{d:"m6 13 8.5 8",key:"u1kupk"}],["path",{d:"M6 13h3",key:"wdp6ag"}],["path",{d:"M9 13c6.667 0 6.667-10 0-10",key:"1nkvk2"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $g=M("Info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bf=M("Instagram",[["rect",{width:"20",height:"20",x:"2",y:"2",rx:"5",ry:"5",key:"2e1cvw"}],["path",{d:"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z",key:"9exkf1"}],["line",{x1:"17.5",x2:"17.51",y1:"6.5",y2:"6.5",key:"r4j83e"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hg=M("KeyRound",[["path",{d:"M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z",key:"167ctg"}],["circle",{cx:"16.5",cy:"7.5",r:".5",fill:"currentColor",key:"w0ekpg"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nd=M("LayoutDashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wf=M("Linkedin",[["path",{d:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z",key:"c2jq9f"}],["rect",{width:"4",height:"12",x:"2",y:"9",key:"mk3on5"}],["circle",{cx:"4",cy:"4",r:"2",key:"bt5ra8"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vg=M("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sd=M("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cd=M("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const un=M("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zs=M("MapPin",[["path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z",key:"2oe9fu"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wg=M("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jg=M("MessageCircle",[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z",key:"vv11sd"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qg=M("Moon",[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wl=M("Phone",[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yg=M("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qg=M("RotateCcw",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rs=M("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jl=M("Send",[["path",{d:"m22 2-7 20-4-9-9-4Z",key:"1q3vgg"}],["path",{d:"M22 2 11 13",key:"nzbqef"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gg=M("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jf=M("ShieldAlert",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"M12 8v4",key:"1got3b"}],["path",{d:"M12 16h.01",key:"1drbdi"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kg=M("ShieldCheck",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xg=M("SlidersHorizontal",[["line",{x1:"21",x2:"14",y1:"4",y2:"4",key:"obuewd"}],["line",{x1:"10",x2:"3",y1:"4",y2:"4",key:"1q6298"}],["line",{x1:"21",x2:"12",y1:"12",y2:"12",key:"1iu8h1"}],["line",{x1:"8",x2:"3",y1:"12",y2:"12",key:"ntss68"}],["line",{x1:"21",x2:"16",y1:"20",y2:"20",key:"14d8ph"}],["line",{x1:"12",x2:"3",y1:"20",y2:"20",key:"m0wm8r"}],["line",{x1:"14",x2:"14",y1:"2",y2:"6",key:"14e1ph"}],["line",{x1:"8",x2:"8",y1:"10",y2:"14",key:"1i6ji0"}],["line",{x1:"16",x2:"16",y1:"18",y2:"22",key:"1lctlv"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zg=M("SquarePen",[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1m0v6g"}],["path",{d:"M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z",key:"1lpok0"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bn=M("Star",[["polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",key:"8f66p6"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const e0=M("Sun",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const t0=M("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kf=M("TriangleAlert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nf=M("Twitter",[["path",{d:"M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",key:"pff0z6"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fi=M("Upload",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rn=M("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const la=M("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sf=M("Youtube",[["path",{d:"M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17",key:"1q2vi4"}],["path",{d:"m10 15 5-3-5-3z",key:"1jp15x"}]]),Cf=b.createContext(),r0=({children:e})=>{const[t,r]=b.useState([]),n=b.useCallback((i,l="success",c=4e3)=>{const d=Math.random().toString(36).substr(2,9);r(u=>[...u,{id:d,message:i,type:l}]),setTimeout(()=>{s(d)},c)},[]),s=b.useCallback(i=>{r(l=>l.filter(c=>c.id!==i))},[]),o=i=>{switch(i){case"success":return a.jsx(Ct,{size:18});case"warning":return a.jsx(kf,{size:18});case"error":return a.jsx(Fg,{size:18});case"info":default:return a.jsx($g,{size:18})}};return a.jsxs(Cf.Provider,{value:{showToast:n},children:[e,a.jsx("div",{className:"toast-container",children:t.map(i=>a.jsxs("div",{className:`toast-card toast-${i.type} animate-slide-in`,children:[a.jsx("div",{className:"toast-icon-wrapper",children:o(i.type)}),a.jsx("div",{className:"toast-content",children:i.message}),a.jsx("button",{className:"toast-close-btn",onClick:()=>s(i.id),children:a.jsx(la,{size:14})})]},i.id))}),a.jsx("style",{children:`
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
      `})]})},et=()=>{const e=b.useContext(Cf);if(!e)throw new Error("useToast must be used within a ToastProvider");return e};function Ef(e,t){return function(){return e.apply(t,arguments)}}const{toString:n0}=Object.prototype,{getPrototypeOf:Gs}=Object,{iterator:Ks,toStringTag:_f}=Symbol,Xs=(e=>t=>{const r=n0.call(t);return e[r]||(e[r]=r.slice(8,-1).toLowerCase())})(Object.create(null)),bt=e=>(e=e.toLowerCase(),t=>Xs(t)===e),Zs=e=>t=>typeof t===e,{isArray:vn}=Array,pn=Zs("undefined");function ma(e){return e!==null&&!pn(e)&&e.constructor!==null&&!pn(e.constructor)&&Je(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const zf=bt("ArrayBuffer");function a0(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&zf(e.buffer),t}const s0=Zs("string"),Je=Zs("function"),Rf=Zs("number"),ha=e=>e!==null&&typeof e=="object",o0=e=>e===!0||e===!1,ts=e=>{if(Xs(e)!=="object")return!1;const t=Gs(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(_f in e)&&!(Ks in e)},i0=e=>{if(!ha(e)||ma(e))return!1;try{return Object.keys(e).length===0&&Object.getPrototypeOf(e)===Object.prototype}catch{return!1}},l0=bt("Date"),c0=bt("File"),d0=e=>!!(e&&typeof e.uri<"u"),u0=e=>e&&typeof e.getParts<"u",p0=bt("Blob"),f0=bt("FileList"),m0=e=>ha(e)&&Je(e.pipe);function h0(){return typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}}const Ed=h0(),_d=typeof Ed.FormData<"u"?Ed.FormData:void 0,x0=e=>{if(!e)return!1;if(_d&&e instanceof _d)return!0;const t=Gs(e);if(!t||t===Object.prototype||!Je(e.append))return!1;const r=Xs(e);return r==="formdata"||r==="object"&&Je(e.toString)&&e.toString()==="[object FormData]"},g0=bt("URLSearchParams"),[v0,y0,b0,w0]=["ReadableStream","Request","Response","Headers"].map(bt),j0=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function xa(e,t,{allOwnKeys:r=!1}={}){if(e===null||typeof e>"u")return;let n,s;if(typeof e!="object"&&(e=[e]),vn(e))for(n=0,s=e.length;n<s;n++)t.call(null,e[n],n,e);else{if(ma(e))return;const o=r?Object.getOwnPropertyNames(e):Object.keys(e),i=o.length;let l;for(n=0;n<i;n++)l=o[n],t.call(null,e[l],l,e)}}function Pf(e,t){if(ma(e))return null;t=t.toLowerCase();const r=Object.keys(e);let n=r.length,s;for(;n-- >0;)if(s=r[n],t===s.toLowerCase())return s;return null}const kr=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,Tf=e=>!pn(e)&&e!==kr;function Mi(...e){const{caseless:t,skipUndefined:r}=Tf(this)&&this||{},n={},s=(o,i)=>{if(i==="__proto__"||i==="constructor"||i==="prototype")return;const l=t&&Pf(n,i)||i,c=Ii(n,l)?n[l]:void 0;ts(c)&&ts(o)?n[l]=Mi(c,o):ts(o)?n[l]=Mi({},o):vn(o)?n[l]=o.slice():(!r||!pn(o))&&(n[l]=o)};for(let o=0,i=e.length;o<i;o++)e[o]&&xa(e[o],s);return n}const k0=(e,t,r,{allOwnKeys:n}={})=>(xa(t,(s,o)=>{r&&Je(s)?Object.defineProperty(e,o,{__proto__:null,value:Ef(s,r),writable:!0,enumerable:!0,configurable:!0}):Object.defineProperty(e,o,{__proto__:null,value:s,writable:!0,enumerable:!0,configurable:!0})},{allOwnKeys:n}),e),N0=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),S0=(e,t,r,n)=>{e.prototype=Object.create(t.prototype,n),Object.defineProperty(e.prototype,"constructor",{__proto__:null,value:e,writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(e,"super",{__proto__:null,value:t.prototype}),r&&Object.assign(e.prototype,r)},C0=(e,t,r,n)=>{let s,o,i;const l={};if(t=t||{},e==null)return t;do{for(s=Object.getOwnPropertyNames(e),o=s.length;o-- >0;)i=s[o],(!n||n(i,e,t))&&!l[i]&&(t[i]=e[i],l[i]=!0);e=r!==!1&&Gs(e)}while(e&&(!r||r(e,t))&&e!==Object.prototype);return t},E0=(e,t,r)=>{e=String(e),(r===void 0||r>e.length)&&(r=e.length),r-=t.length;const n=e.indexOf(t,r);return n!==-1&&n===r},_0=e=>{if(!e)return null;if(vn(e))return e;let t=e.length;if(!Rf(t))return null;const r=new Array(t);for(;t-- >0;)r[t]=e[t];return r},z0=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&Gs(Uint8Array)),R0=(e,t)=>{const n=(e&&e[Ks]).call(e);let s;for(;(s=n.next())&&!s.done;){const o=s.value;t.call(e,o[0],o[1])}},P0=(e,t)=>{let r;const n=[];for(;(r=e.exec(t))!==null;)n.push(r);return n},T0=bt("HTMLFormElement"),L0=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(r,n,s){return n.toUpperCase()+s}),Ii=(({hasOwnProperty:e})=>(t,r)=>e.call(t,r))(Object.prototype),O0=bt("RegExp"),Lf=(e,t)=>{const r=Object.getOwnPropertyDescriptors(e),n={};xa(r,(s,o)=>{let i;(i=t(s,o,e))!==!1&&(n[o]=i||s)}),Object.defineProperties(e,n)},A0=e=>{Lf(e,(t,r)=>{if(Je(e)&&["arguments","caller","callee"].includes(r))return!1;const n=e[r];if(Je(n)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+r+"'")})}})},D0=(e,t)=>{const r={},n=s=>{s.forEach(o=>{r[o]=!0})};return vn(e)?n(e):n(String(e).split(t)),r},F0=()=>{},M0=(e,t)=>e!=null&&Number.isFinite(e=+e)?e:t;function I0(e){return!!(e&&Je(e.append)&&e[_f]==="FormData"&&e[Ks])}const U0=e=>{const t=new WeakSet,r=n=>{if(ha(n)){if(t.has(n))return;if(ma(n))return n;if(!("toJSON"in n)){t.add(n);const s=vn(n)?[]:{};return xa(n,(o,i)=>{const l=r(o);!pn(l)&&(s[i]=l)}),t.delete(n),s}}return n};return r(e)},B0=bt("AsyncFunction"),$0=e=>e&&(ha(e)||Je(e))&&Je(e.then)&&Je(e.catch),Of=((e,t)=>e?setImmediate:t?((r,n)=>(kr.addEventListener("message",({source:s,data:o})=>{s===kr&&o===r&&n.length&&n.shift()()},!1),s=>{n.push(s),kr.postMessage(r,"*")}))(`axios@${Math.random()}`,[]):r=>setTimeout(r))(typeof setImmediate=="function",Je(kr.postMessage)),H0=typeof queueMicrotask<"u"?queueMicrotask.bind(kr):typeof process<"u"&&process.nextTick||Of,V0=e=>e!=null&&Je(e[Ks]),k={isArray:vn,isArrayBuffer:zf,isBuffer:ma,isFormData:x0,isArrayBufferView:a0,isString:s0,isNumber:Rf,isBoolean:o0,isObject:ha,isPlainObject:ts,isEmptyObject:i0,isReadableStream:v0,isRequest:y0,isResponse:b0,isHeaders:w0,isUndefined:pn,isDate:l0,isFile:c0,isReactNativeBlob:d0,isReactNative:u0,isBlob:p0,isRegExp:O0,isFunction:Je,isStream:m0,isURLSearchParams:g0,isTypedArray:z0,isFileList:f0,forEach:xa,merge:Mi,extend:k0,trim:j0,stripBOM:N0,inherits:S0,toFlatObject:C0,kindOf:Xs,kindOfTest:bt,endsWith:E0,toArray:_0,forEachEntry:R0,matchAll:P0,isHTMLForm:T0,hasOwnProperty:Ii,hasOwnProp:Ii,reduceDescriptors:Lf,freezeMethods:A0,toObjectSet:D0,toCamelCase:L0,noop:F0,toFiniteNumber:M0,findKey:Pf,global:kr,isContextDefined:Tf,isSpecCompliantForm:I0,toJSONObject:U0,isAsyncFn:B0,isThenable:$0,setImmediate:Of,asap:H0,isIterable:V0},W0=k.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),J0=e=>{const t={};let r,n,s;return e&&e.split(`
`).forEach(function(i){s=i.indexOf(":"),r=i.substring(0,s).trim().toLowerCase(),n=i.substring(s+1).trim(),!(!r||t[r]&&W0[r])&&(r==="set-cookie"?t[r]?t[r].push(n):t[r]=[n]:t[r]=t[r]?t[r]+", "+n:n)}),t};function q0(e){let t=0,r=e.length;for(;t<r;){const n=e.charCodeAt(t);if(n!==9&&n!==32)break;t+=1}for(;r>t;){const n=e.charCodeAt(r-1);if(n!==9&&n!==32)break;r-=1}return t===0&&r===e.length?e:e.slice(t,r)}const Y0=new RegExp("[\\u0000-\\u0008\\u000a-\\u001f\\u007f]+","g"),Q0=new RegExp("[^\\u0009\\u0020-\\u007e\\u0080-\\u00ff]+","g");function ql(e,t){return k.isArray(e)?e.map(r=>ql(r,t)):q0(String(e).replace(t,""))}const G0=e=>ql(e,Y0),K0=e=>ql(e,Q0);function Af(e){const t=Object.create(null);return k.forEach(e.toJSON(),(r,n)=>{t[n]=K0(r)}),t}const zd=Symbol("internals");function En(e){return e&&String(e).trim().toLowerCase()}function rs(e){return e===!1||e==null?e:k.isArray(e)?e.map(rs):G0(String(e))}function X0(e){const t=Object.create(null),r=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let n;for(;n=r.exec(e);)t[n[1]]=n[2];return t}const Z0=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function Ao(e,t,r,n,s){if(k.isFunction(n))return n.call(this,t,r);if(s&&(t=r),!!k.isString(t)){if(k.isString(n))return t.indexOf(n)!==-1;if(k.isRegExp(n))return n.test(t)}}function ev(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,r,n)=>r.toUpperCase()+n)}function tv(e,t){const r=k.toCamelCase(" "+t);["get","set","has"].forEach(n=>{Object.defineProperty(e,n+r,{__proto__:null,value:function(s,o,i){return this[n].call(this,t,s,o,i)},configurable:!0})})}let Me=class{constructor(t){t&&this.set(t)}set(t,r,n){const s=this;function o(l,c,d){const u=En(c);if(!u)throw new Error("header name must be a non-empty string");const f=k.findKey(s,u);(!f||s[f]===void 0||d===!0||d===void 0&&s[f]!==!1)&&(s[f||c]=rs(l))}const i=(l,c)=>k.forEach(l,(d,u)=>o(d,u,c));if(k.isPlainObject(t)||t instanceof this.constructor)i(t,r);else if(k.isString(t)&&(t=t.trim())&&!Z0(t))i(J0(t),r);else if(k.isObject(t)&&k.isIterable(t)){let l={},c,d;for(const u of t){if(!k.isArray(u))throw TypeError("Object iterator must return a key-value pair");l[d=u[0]]=(c=l[d])?k.isArray(c)?[...c,u[1]]:[c,u[1]]:u[1]}i(l,r)}else t!=null&&o(r,t,n);return this}get(t,r){if(t=En(t),t){const n=k.findKey(this,t);if(n){const s=this[n];if(!r)return s;if(r===!0)return X0(s);if(k.isFunction(r))return r.call(this,s,n);if(k.isRegExp(r))return r.exec(s);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,r){if(t=En(t),t){const n=k.findKey(this,t);return!!(n&&this[n]!==void 0&&(!r||Ao(this,this[n],n,r)))}return!1}delete(t,r){const n=this;let s=!1;function o(i){if(i=En(i),i){const l=k.findKey(n,i);l&&(!r||Ao(n,n[l],l,r))&&(delete n[l],s=!0)}}return k.isArray(t)?t.forEach(o):o(t),s}clear(t){const r=Object.keys(this);let n=r.length,s=!1;for(;n--;){const o=r[n];(!t||Ao(this,this[o],o,t,!0))&&(delete this[o],s=!0)}return s}normalize(t){const r=this,n={};return k.forEach(this,(s,o)=>{const i=k.findKey(n,o);if(i){r[i]=rs(s),delete r[o];return}const l=t?ev(o):String(o).trim();l!==o&&delete r[o],r[l]=rs(s),n[l]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const r=Object.create(null);return k.forEach(this,(n,s)=>{n!=null&&n!==!1&&(r[s]=t&&k.isArray(n)?n.join(", "):n)}),r}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,r])=>t+": "+r).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...r){const n=new this(t);return r.forEach(s=>n.set(s)),n}static accessor(t){const n=(this[zd]=this[zd]={accessors:{}}).accessors,s=this.prototype;function o(i){const l=En(i);n[l]||(tv(s,i),n[l]=!0)}return k.isArray(t)?t.forEach(o):o(t),this}};Me.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);k.reduceDescriptors(Me.prototype,({value:e},t)=>{let r=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(n){this[r]=n}}});k.freezeMethods(Me);const rv="[REDACTED ****]";function nv(e){if(k.hasOwnProp(e,"toJSON"))return!0;let t=Object.getPrototypeOf(e);for(;t&&t!==Object.prototype;){if(k.hasOwnProp(t,"toJSON"))return!0;t=Object.getPrototypeOf(t)}return!1}function av(e,t){const r=new Set(t.map(o=>String(o).toLowerCase())),n=[],s=o=>{if(o===null||typeof o!="object"||k.isBuffer(o))return o;if(n.indexOf(o)!==-1)return;o instanceof Me&&(o=o.toJSON()),n.push(o);let i;if(k.isArray(o))i=[],o.forEach((l,c)=>{const d=s(l);k.isUndefined(d)||(i[c]=d)});else{if(!k.isPlainObject(o)&&nv(o))return n.pop(),o;i=Object.create(null);for(const[l,c]of Object.entries(o)){const d=r.has(l.toLowerCase())?rv:s(c);k.isUndefined(d)||(i[l]=d)}}return n.pop(),i};return s(e)}let L=class Df extends Error{static from(t,r,n,s,o,i){const l=new Df(t.message,r||t.code,n,s,o);return l.cause=t,l.name=t.name,t.status!=null&&l.status==null&&(l.status=t.status),i&&Object.assign(l,i),l}constructor(t,r,n,s,o){super(t),Object.defineProperty(this,"message",{__proto__:null,value:t,enumerable:!0,writable:!0,configurable:!0}),this.name="AxiosError",this.isAxiosError=!0,r&&(this.code=r),n&&(this.config=n),s&&(this.request=s),o&&(this.response=o,this.status=o.status)}toJSON(){const t=this.config,r=t&&k.hasOwnProp(t,"redact")?t.redact:void 0,n=k.isArray(r)&&r.length>0?av(t,r):k.toJSONObject(t);return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:n,code:this.code,status:this.status}}};L.ERR_BAD_OPTION_VALUE="ERR_BAD_OPTION_VALUE";L.ERR_BAD_OPTION="ERR_BAD_OPTION";L.ECONNABORTED="ECONNABORTED";L.ETIMEDOUT="ETIMEDOUT";L.ECONNREFUSED="ECONNREFUSED";L.ERR_NETWORK="ERR_NETWORK";L.ERR_FR_TOO_MANY_REDIRECTS="ERR_FR_TOO_MANY_REDIRECTS";L.ERR_DEPRECATED="ERR_DEPRECATED";L.ERR_BAD_RESPONSE="ERR_BAD_RESPONSE";L.ERR_BAD_REQUEST="ERR_BAD_REQUEST";L.ERR_CANCELED="ERR_CANCELED";L.ERR_NOT_SUPPORT="ERR_NOT_SUPPORT";L.ERR_INVALID_URL="ERR_INVALID_URL";L.ERR_FORM_DATA_DEPTH_EXCEEDED="ERR_FORM_DATA_DEPTH_EXCEEDED";const sv=null;function Ui(e){return k.isPlainObject(e)||k.isArray(e)}function Ff(e){return k.endsWith(e,"[]")?e.slice(0,-2):e}function Do(e,t,r){return e?e.concat(t).map(function(s,o){return s=Ff(s),!r&&o?"["+s+"]":s}).join(r?".":""):t}function ov(e){return k.isArray(e)&&!e.some(Ui)}const iv=k.toFlatObject(k,{},null,function(t){return/^is[A-Z]/.test(t)});function eo(e,t,r){if(!k.isObject(e))throw new TypeError("target must be an object");t=t||new FormData,r=k.toFlatObject(r,{metaTokens:!0,dots:!1,indexes:!1},!1,function(j,p){return!k.isUndefined(p[j])});const n=r.metaTokens,s=r.visitor||f,o=r.dots,i=r.indexes,l=r.Blob||typeof Blob<"u"&&Blob,c=r.maxDepth===void 0?100:r.maxDepth,d=l&&k.isSpecCompliantForm(t);if(!k.isFunction(s))throw new TypeError("visitor must be a function");function u(y){if(y===null)return"";if(k.isDate(y))return y.toISOString();if(k.isBoolean(y))return y.toString();if(!d&&k.isBlob(y))throw new L("Blob is not supported. Use a Buffer instead.");return k.isArrayBuffer(y)||k.isTypedArray(y)?d&&typeof Blob=="function"?new Blob([y]):Buffer.from(y):y}function f(y,j,p){let m=y;if(k.isReactNative(t)&&k.isReactNativeBlob(y))return t.append(Do(p,j,o),u(y)),!1;if(y&&!p&&typeof y=="object"){if(k.endsWith(j,"{}"))j=n?j:j.slice(0,-2),y=JSON.stringify(y);else if(k.isArray(y)&&ov(y)||(k.isFileList(y)||k.endsWith(j,"[]"))&&(m=k.toArray(y)))return j=Ff(j),m.forEach(function(v,N){!(k.isUndefined(v)||v===null)&&t.append(i===!0?Do([j],N,o):i===null?j:j+"[]",u(v))}),!1}return Ui(y)?!0:(t.append(Do(p,j,o),u(y)),!1)}const g=[],w=Object.assign(iv,{defaultVisitor:f,convertValue:u,isVisitable:Ui});function h(y,j,p=0){if(!k.isUndefined(y)){if(p>c)throw new L("Object is too deeply nested ("+p+" levels). Max depth: "+c,L.ERR_FORM_DATA_DEPTH_EXCEEDED);if(g.indexOf(y)!==-1)throw Error("Circular reference detected in "+j.join("."));g.push(y),k.forEach(y,function(x,v){(!(k.isUndefined(x)||x===null)&&s.call(t,x,k.isString(v)?v.trim():v,j,w))===!0&&h(x,j?j.concat(v):[v],p+1)}),g.pop()}}if(!k.isObject(e))throw new TypeError("data must be an object");return h(e),t}function Rd(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+"};return encodeURIComponent(e).replace(/[!'()~]|%20/g,function(n){return t[n]})}function Yl(e,t){this._pairs=[],e&&eo(e,this,t)}const Mf=Yl.prototype;Mf.append=function(t,r){this._pairs.push([t,r])};Mf.toString=function(t){const r=t?function(n){return t.call(this,n,Rd)}:Rd;return this._pairs.map(function(s){return r(s[0])+"="+r(s[1])},"").join("&")};function lv(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function If(e,t,r){if(!t)return e;const n=r&&r.encode||lv,s=k.isFunction(r)?{serialize:r}:r,o=s&&s.serialize;let i;if(o?i=o(t,s):i=k.isURLSearchParams(t)?t.toString():new Yl(t,s).toString(n),i){const l=e.indexOf("#");l!==-1&&(e=e.slice(0,l)),e+=(e.indexOf("?")===-1?"?":"&")+i}return e}class Pd{constructor(){this.handlers=[]}use(t,r,n){return this.handlers.push({fulfilled:t,rejected:r,synchronous:n?n.synchronous:!1,runWhen:n?n.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){k.forEach(this.handlers,function(n){n!==null&&t(n)})}}const Ql={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1,legacyInterceptorReqResOrdering:!0},cv=typeof URLSearchParams<"u"?URLSearchParams:Yl,dv=typeof FormData<"u"?FormData:null,uv=typeof Blob<"u"?Blob:null,pv={isBrowser:!0,classes:{URLSearchParams:cv,FormData:dv,Blob:uv},protocols:["http","https","file","blob","url","data"]},Gl=typeof window<"u"&&typeof document<"u",Bi=typeof navigator=="object"&&navigator||void 0,fv=Gl&&(!Bi||["ReactNative","NativeScript","NS"].indexOf(Bi.product)<0),mv=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",hv=Gl&&window.location.href||"http://localhost",xv=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:Gl,hasStandardBrowserEnv:fv,hasStandardBrowserWebWorkerEnv:mv,navigator:Bi,origin:hv},Symbol.toStringTag,{value:"Module"})),Le={...xv,...pv};function gv(e,t){return eo(e,new Le.classes.URLSearchParams,{visitor:function(r,n,s,o){return Le.isNode&&k.isBuffer(r)?(this.append(n,r.toString("base64")),!1):o.defaultVisitor.apply(this,arguments)},...t})}function vv(e){return k.matchAll(/\w+|\[(\w*)]/g,e).map(t=>t[0]==="[]"?"":t[1]||t[0])}function yv(e){const t={},r=Object.keys(e);let n;const s=r.length;let o;for(n=0;n<s;n++)o=r[n],t[o]=e[o];return t}function Uf(e){function t(r,n,s,o){let i=r[o++];if(i==="__proto__")return!0;const l=Number.isFinite(+i),c=o>=r.length;return i=!i&&k.isArray(s)?s.length:i,c?(k.hasOwnProp(s,i)?s[i]=k.isArray(s[i])?s[i].concat(n):[s[i],n]:s[i]=n,!l):((!k.hasOwnProp(s,i)||!k.isObject(s[i]))&&(s[i]=[]),t(r,n,s[i],o)&&k.isArray(s[i])&&(s[i]=yv(s[i])),!l)}if(k.isFormData(e)&&k.isFunction(e.entries)){const r={};return k.forEachEntry(e,(n,s)=>{t(vv(n),s,r,0)}),r}return null}const Dr=(e,t)=>e!=null&&k.hasOwnProp(e,t)?e[t]:void 0;function bv(e,t,r){if(k.isString(e))try{return(t||JSON.parse)(e),k.trim(e)}catch(n){if(n.name!=="SyntaxError")throw n}return(r||JSON.stringify)(e)}const ga={transitional:Ql,adapter:["xhr","http","fetch"],transformRequest:[function(t,r){const n=r.getContentType()||"",s=n.indexOf("application/json")>-1,o=k.isObject(t);if(o&&k.isHTMLForm(t)&&(t=new FormData(t)),k.isFormData(t))return s?JSON.stringify(Uf(t)):t;if(k.isArrayBuffer(t)||k.isBuffer(t)||k.isStream(t)||k.isFile(t)||k.isBlob(t)||k.isReadableStream(t))return t;if(k.isArrayBufferView(t))return t.buffer;if(k.isURLSearchParams(t))return r.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let l;if(o){const c=Dr(this,"formSerializer");if(n.indexOf("application/x-www-form-urlencoded")>-1)return gv(t,c).toString();if((l=k.isFileList(t))||n.indexOf("multipart/form-data")>-1){const d=Dr(this,"env"),u=d&&d.FormData;return eo(l?{"files[]":t}:t,u&&new u,c)}}return o||s?(r.setContentType("application/json",!1),bv(t)):t}],transformResponse:[function(t){const r=Dr(this,"transitional")||ga.transitional,n=r&&r.forcedJSONParsing,s=Dr(this,"responseType"),o=s==="json";if(k.isResponse(t)||k.isReadableStream(t))return t;if(t&&k.isString(t)&&(n&&!s||o)){const l=!(r&&r.silentJSONParsing)&&o;try{return JSON.parse(t,Dr(this,"parseReviver"))}catch(c){if(l)throw c.name==="SyntaxError"?L.from(c,L.ERR_BAD_RESPONSE,this,null,Dr(this,"response")):c}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:Le.classes.FormData,Blob:Le.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};k.forEach(["delete","get","head","post","put","patch","query"],e=>{ga.headers[e]={}});function Fo(e,t){const r=this||ga,n=t||r,s=Me.from(n.headers);let o=n.data;return k.forEach(e,function(l){o=l.call(r,o,s.normalize(),t?t.status:void 0)}),s.normalize(),o}function Bf(e){return!!(e&&e.__CANCEL__)}let va=class extends L{constructor(t,r,n){super(t??"canceled",L.ERR_CANCELED,r,n),this.name="CanceledError",this.__CANCEL__=!0}};function $f(e,t,r){const n=r.config.validateStatus;!r.status||!n||n(r.status)?e(r):t(new L("Request failed with status code "+r.status,r.status>=400&&r.status<500?L.ERR_BAD_REQUEST:L.ERR_BAD_RESPONSE,r.config,r.request,r))}function wv(e){const t=/^([-+\w]{1,25}):(?:\/\/)?/.exec(e);return t&&t[1]||""}function jv(e,t){e=e||10;const r=new Array(e),n=new Array(e);let s=0,o=0,i;return t=t!==void 0?t:1e3,function(c){const d=Date.now(),u=n[o];i||(i=d),r[s]=c,n[s]=d;let f=o,g=0;for(;f!==s;)g+=r[f++],f=f%e;if(s=(s+1)%e,s===o&&(o=(o+1)%e),d-i<t)return;const w=u&&d-u;return w?Math.round(g*1e3/w):void 0}}function kv(e,t){let r=0,n=1e3/t,s,o;const i=(d,u=Date.now())=>{r=u,s=null,o&&(clearTimeout(o),o=null),e(...d)};return[(...d)=>{const u=Date.now(),f=u-r;f>=n?i(d,u):(s=d,o||(o=setTimeout(()=>{o=null,i(s)},n-f)))},()=>s&&i(s)]}const Ps=(e,t,r=3)=>{let n=0;const s=jv(50,250);return kv(o=>{if(!o||typeof o.loaded!="number")return;const i=o.loaded,l=o.lengthComputable?o.total:void 0,c=l!=null?Math.min(i,l):i,d=Math.max(0,c-n),u=s(d);n=Math.max(n,c);const f={loaded:c,total:l,progress:l?c/l:void 0,bytes:d,rate:u||void 0,estimated:u&&l?(l-c)/u:void 0,event:o,lengthComputable:l!=null,[t?"download":"upload"]:!0};e(f)},r)},Td=(e,t)=>{const r=e!=null;return[n=>t[0]({lengthComputable:r,total:e,loaded:n}),t[1]]},Ld=e=>(...t)=>k.asap(()=>e(...t)),Nv=Le.hasStandardBrowserEnv?((e,t)=>r=>(r=new URL(r,Le.origin),e.protocol===r.protocol&&e.host===r.host&&(t||e.port===r.port)))(new URL(Le.origin),Le.navigator&&/(msie|trident)/i.test(Le.navigator.userAgent)):()=>!0,Sv=Le.hasStandardBrowserEnv?{write(e,t,r,n,s,o,i){if(typeof document>"u")return;const l=[`${e}=${encodeURIComponent(t)}`];k.isNumber(r)&&l.push(`expires=${new Date(r).toUTCString()}`),k.isString(n)&&l.push(`path=${n}`),k.isString(s)&&l.push(`domain=${s}`),o===!0&&l.push("secure"),k.isString(i)&&l.push(`SameSite=${i}`),document.cookie=l.join("; ")},read(e){if(typeof document>"u")return null;const t=document.cookie.split(";");for(let r=0;r<t.length;r++){const n=t[r].replace(/^\s+/,""),s=n.indexOf("=");if(s!==-1&&n.slice(0,s)===e)return decodeURIComponent(n.slice(s+1))}return null},remove(e){this.write(e,"",Date.now()-864e5,"/")}}:{write(){},read(){return null},remove(){}};function Cv(e){return typeof e!="string"?!1:/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function Ev(e,t){return t?e.replace(/\/?\/$/,"")+"/"+t.replace(/^\/+/,""):e}function Hf(e,t,r){let n=!Cv(t);return e&&(n||r===!1)?Ev(e,t):t}const Od=e=>e instanceof Me?{...e}:e;function Tr(e,t){t=t||{};const r=Object.create(null);Object.defineProperty(r,"hasOwnProperty",{__proto__:null,value:Object.prototype.hasOwnProperty,enumerable:!1,writable:!0,configurable:!0});function n(d,u,f,g){return k.isPlainObject(d)&&k.isPlainObject(u)?k.merge.call({caseless:g},d,u):k.isPlainObject(u)?k.merge({},u):k.isArray(u)?u.slice():u}function s(d,u,f,g){if(k.isUndefined(u)){if(!k.isUndefined(d))return n(void 0,d,f,g)}else return n(d,u,f,g)}function o(d,u){if(!k.isUndefined(u))return n(void 0,u)}function i(d,u){if(k.isUndefined(u)){if(!k.isUndefined(d))return n(void 0,d)}else return n(void 0,u)}function l(d,u,f){if(k.hasOwnProp(t,f))return n(d,u);if(k.hasOwnProp(e,f))return n(void 0,d)}const c={url:o,method:o,data:o,baseURL:i,transformRequest:i,transformResponse:i,paramsSerializer:i,timeout:i,timeoutMessage:i,withCredentials:i,withXSRFToken:i,adapter:i,responseType:i,xsrfCookieName:i,xsrfHeaderName:i,onUploadProgress:i,onDownloadProgress:i,decompress:i,maxContentLength:i,maxBodyLength:i,beforeRedirect:i,transport:i,httpAgent:i,httpsAgent:i,cancelToken:i,socketPath:i,allowedSocketPaths:i,responseEncoding:i,validateStatus:l,headers:(d,u,f)=>s(Od(d),Od(u),f,!0)};return k.forEach(Object.keys({...e,...t}),function(u){if(u==="__proto__"||u==="constructor"||u==="prototype")return;const f=k.hasOwnProp(c,u)?c[u]:s,g=k.hasOwnProp(e,u)?e[u]:void 0,w=k.hasOwnProp(t,u)?t[u]:void 0,h=f(g,w,u);k.isUndefined(h)&&f!==l||(r[u]=h)}),r}const _v=["content-type","content-length"];function zv(e,t,r){if(r!=="content-only"){e.set(t);return}Object.entries(t).forEach(([n,s])=>{_v.includes(n.toLowerCase())&&e.set(n,s)})}const Rv=e=>encodeURIComponent(e).replace(/%([0-9A-F]{2})/gi,(t,r)=>String.fromCharCode(parseInt(r,16))),Vf=e=>{const t=Tr({},e),r=g=>k.hasOwnProp(t,g)?t[g]:void 0,n=r("data");let s=r("withXSRFToken");const o=r("xsrfHeaderName"),i=r("xsrfCookieName");let l=r("headers");const c=r("auth"),d=r("baseURL"),u=r("allowAbsoluteUrls"),f=r("url");if(t.headers=l=Me.from(l),t.url=If(Hf(d,f,u),e.params,e.paramsSerializer),c&&l.set("Authorization","Basic "+btoa((c.username||"")+":"+(c.password?Rv(c.password):""))),k.isFormData(n)&&(Le.hasStandardBrowserEnv||Le.hasStandardBrowserWebWorkerEnv?l.setContentType(void 0):k.isFunction(n.getHeaders)&&zv(l,n.getHeaders(),r("formDataHeaderPolicy"))),Le.hasStandardBrowserEnv&&(k.isFunction(s)&&(s=s(t)),s===!0||s==null&&Nv(t.url))){const w=o&&i&&Sv.read(i);w&&l.set(o,w)}return t},Pv=typeof XMLHttpRequest<"u",Tv=Pv&&function(e){return new Promise(function(r,n){const s=Vf(e);let o=s.data;const i=Me.from(s.headers).normalize();let{responseType:l,onUploadProgress:c,onDownloadProgress:d}=s,u,f,g,w,h;function y(){w&&w(),h&&h(),s.cancelToken&&s.cancelToken.unsubscribe(u),s.signal&&s.signal.removeEventListener("abort",u)}let j=new XMLHttpRequest;j.open(s.method.toUpperCase(),s.url,!0),j.timeout=s.timeout;function p(){if(!j)return;const x=Me.from("getAllResponseHeaders"in j&&j.getAllResponseHeaders()),N={data:!l||l==="text"||l==="json"?j.responseText:j.response,status:j.status,statusText:j.statusText,headers:x,config:e,request:j};$f(function(_){r(_),y()},function(_){n(_),y()},N),j=null}"onloadend"in j?j.onloadend=p:j.onreadystatechange=function(){!j||j.readyState!==4||j.status===0&&!(j.responseURL&&j.responseURL.startsWith("file:"))||setTimeout(p)},j.onabort=function(){j&&(n(new L("Request aborted",L.ECONNABORTED,e,j)),y(),j=null)},j.onerror=function(v){const N=v&&v.message?v.message:"Network Error",C=new L(N,L.ERR_NETWORK,e,j);C.event=v||null,n(C),y(),j=null},j.ontimeout=function(){let v=s.timeout?"timeout of "+s.timeout+"ms exceeded":"timeout exceeded";const N=s.transitional||Ql;s.timeoutErrorMessage&&(v=s.timeoutErrorMessage),n(new L(v,N.clarifyTimeoutError?L.ETIMEDOUT:L.ECONNABORTED,e,j)),y(),j=null},o===void 0&&i.setContentType(null),"setRequestHeader"in j&&k.forEach(Af(i),function(v,N){j.setRequestHeader(N,v)}),k.isUndefined(s.withCredentials)||(j.withCredentials=!!s.withCredentials),l&&l!=="json"&&(j.responseType=s.responseType),d&&([g,h]=Ps(d,!0),j.addEventListener("progress",g)),c&&j.upload&&([f,w]=Ps(c),j.upload.addEventListener("progress",f),j.upload.addEventListener("loadend",w)),(s.cancelToken||s.signal)&&(u=x=>{j&&(n(!x||x.type?new va(null,e,j):x),j.abort(),y(),j=null)},s.cancelToken&&s.cancelToken.subscribe(u),s.signal&&(s.signal.aborted?u():s.signal.addEventListener("abort",u)));const m=wv(s.url);if(m&&!Le.protocols.includes(m)){n(new L("Unsupported protocol "+m+":",L.ERR_BAD_REQUEST,e));return}j.send(o||null)})},Lv=(e,t)=>{if(e=e?e.filter(Boolean):[],!t&&!e.length)return;const r=new AbortController;let n=!1;const s=function(c){if(!n){n=!0,i();const d=c instanceof Error?c:this.reason;r.abort(d instanceof L?d:new va(d instanceof Error?d.message:d))}};let o=t&&setTimeout(()=>{o=null,s(new L(`timeout of ${t}ms exceeded`,L.ETIMEDOUT))},t);const i=()=>{e&&(o&&clearTimeout(o),o=null,e.forEach(c=>{c.unsubscribe?c.unsubscribe(s):c.removeEventListener("abort",s)}),e=null)};e.forEach(c=>c.addEventListener("abort",s));const{signal:l}=r;return l.unsubscribe=()=>k.asap(i),l},Ov=function*(e,t){let r=e.byteLength;if(r<t){yield e;return}let n=0,s;for(;n<r;)s=n+t,yield e.slice(n,s),n=s},Av=async function*(e,t){for await(const r of Dv(e))yield*Ov(r,t)},Dv=async function*(e){if(e[Symbol.asyncIterator]){yield*e;return}const t=e.getReader();try{for(;;){const{done:r,value:n}=await t.read();if(r)break;yield n}}finally{await t.cancel()}},Ad=(e,t,r,n)=>{const s=Av(e,t);let o=0,i,l=c=>{i||(i=!0,n&&n(c))};return new ReadableStream({async pull(c){try{const{done:d,value:u}=await s.next();if(d){l(),c.close();return}let f=u.byteLength;if(r){let g=o+=f;r(g)}c.enqueue(new Uint8Array(u))}catch(d){throw l(d),d}},cancel(c){return l(c),s.return()}},{highWaterMark:2})};function Fv(e){if(!e||typeof e!="string"||!e.startsWith("data:"))return 0;const t=e.indexOf(",");if(t<0)return 0;const r=e.slice(5,t),n=e.slice(t+1);if(/;base64/i.test(r)){let i=n.length;const l=n.length;for(let w=0;w<l;w++)if(n.charCodeAt(w)===37&&w+2<l){const h=n.charCodeAt(w+1),y=n.charCodeAt(w+2);(h>=48&&h<=57||h>=65&&h<=70||h>=97&&h<=102)&&(y>=48&&y<=57||y>=65&&y<=70||y>=97&&y<=102)&&(i-=2,w+=2)}let c=0,d=l-1;const u=w=>w>=2&&n.charCodeAt(w-2)===37&&n.charCodeAt(w-1)===51&&(n.charCodeAt(w)===68||n.charCodeAt(w)===100);d>=0&&(n.charCodeAt(d)===61?(c++,d--):u(d)&&(c++,d-=3)),c===1&&d>=0&&(n.charCodeAt(d)===61||u(d))&&c++;const g=Math.floor(i/4)*3-(c||0);return g>0?g:0}if(typeof Buffer<"u"&&typeof Buffer.byteLength=="function")return Buffer.byteLength(n,"utf8");let o=0;for(let i=0,l=n.length;i<l;i++){const c=n.charCodeAt(i);if(c<128)o+=1;else if(c<2048)o+=2;else if(c>=55296&&c<=56319&&i+1<l){const d=n.charCodeAt(i+1);d>=56320&&d<=57343?(o+=4,i++):o+=3}else o+=3}return o}const Kl="1.16.1",Dd=64*1024,{isFunction:Ba}=k,Fd=(e,...t)=>{try{return!!e(...t)}catch{return!1}},Mv=e=>{const t=k.global!==void 0&&k.global!==null?k.global:globalThis,{ReadableStream:r,TextEncoder:n}=t;e=k.merge.call({skipUndefined:!0},{Request:t.Request,Response:t.Response},e);const{fetch:s,Request:o,Response:i}=e,l=s?Ba(s):typeof fetch=="function",c=Ba(o),d=Ba(i);if(!l)return!1;const u=l&&Ba(r),f=l&&(typeof n=="function"?(p=>m=>p.encode(m))(new n):async p=>new Uint8Array(await new o(p).arrayBuffer())),g=c&&u&&Fd(()=>{let p=!1;const m=new o(Le.origin,{body:new r,method:"POST",get duplex(){return p=!0,"half"}}),x=m.headers.has("Content-Type");return m.body!=null&&m.body.cancel(),p&&!x}),w=d&&u&&Fd(()=>k.isReadableStream(new i("").body)),h={stream:w&&(p=>p.body)};l&&["text","arrayBuffer","blob","formData","stream"].forEach(p=>{!h[p]&&(h[p]=(m,x)=>{let v=m&&m[p];if(v)return v.call(m);throw new L(`Response type '${p}' is not supported`,L.ERR_NOT_SUPPORT,x)})});const y=async p=>{if(p==null)return 0;if(k.isBlob(p))return p.size;if(k.isSpecCompliantForm(p))return(await new o(Le.origin,{method:"POST",body:p}).arrayBuffer()).byteLength;if(k.isArrayBufferView(p)||k.isArrayBuffer(p))return p.byteLength;if(k.isURLSearchParams(p)&&(p=p+""),k.isString(p))return(await f(p)).byteLength},j=async(p,m)=>{const x=k.toFiniteNumber(p.getContentLength());return x??y(m)};return async p=>{let{url:m,method:x,data:v,signal:N,cancelToken:C,timeout:_,onDownloadProgress:R,onUploadProgress:D,responseType:A,headers:Q,withCredentials:de="same-origin",fetchOptions:ne,maxContentLength:X,maxBodyLength:ct}=Vf(p);const Ce=k.isNumber(X)&&X>-1,we=k.isNumber(ct)&&ct>-1;let P=s||fetch;A=A?(A+"").toLowerCase():"text";let F=Lv([N,C&&C.toAbortSignal()],_),O=null;const I=F&&F.unsubscribe&&(()=>{F.unsubscribe()});let V;try{if(Ce&&typeof m=="string"&&m.startsWith("data:")&&Fv(m)>X)throw new L("maxContentLength size of "+X+" exceeded",L.ERR_BAD_RESPONSE,p,O);if(we&&x!=="get"&&x!=="head"){const J=await j(Q,v);if(typeof J=="number"&&isFinite(J)&&J>ct)throw new L("Request body larger than maxBodyLength limit",L.ERR_BAD_REQUEST,p,O)}if(D&&g&&x!=="get"&&x!=="head"&&(V=await j(Q,v))!==0){let J=new o(m,{method:"POST",body:v,duplex:"half"}),dt;if(k.isFormData(v)&&(dt=J.headers.get("content-type"))&&Q.setContentType(dt),J.body){const[ut,Rt]=Td(V,Ps(Ld(D)));v=Ad(J.body,Dd,ut,Rt)}}k.isString(de)||(de=de?"include":"omit");const Z=c&&"credentials"in o.prototype;if(k.isFormData(v)){const J=Q.getContentType();J&&/^multipart\/form-data/i.test(J)&&!/boundary=/i.test(J)&&Q.delete("content-type")}Q.set("User-Agent","axios/"+Kl,!1);const xe={...ne,signal:F,method:x.toUpperCase(),headers:Af(Q.normalize()),body:v,duplex:"half",credentials:Z?de:void 0};O=c&&new o(m,xe);let H=await(c?P(O,ne):P(m,xe));if(Ce){const J=k.toFiniteNumber(H.headers.get("content-length"));if(J!=null&&J>X)throw new L("maxContentLength size of "+X+" exceeded",L.ERR_BAD_RESPONSE,p,O)}const le=w&&(A==="stream"||A==="response");if(w&&H.body&&(R||Ce||le&&I)){const J={};["status","statusText","headers"].forEach(Pt=>{J[Pt]=H[Pt]});const dt=k.toFiniteNumber(H.headers.get("content-length")),[ut,Rt]=R&&Td(dt,Ps(Ld(R),!0))||[];let wt=0;const gr=Pt=>{if(Ce&&(wt=Pt,wt>X))throw new L("maxContentLength size of "+X+" exceeded",L.ERR_BAD_RESPONSE,p,O);ut&&ut(Pt)};H=new i(Ad(H.body,Dd,gr,()=>{Rt&&Rt(),I&&I()}),J)}A=A||"text";let me=await h[k.findKey(h,A)||"text"](H,p);if(Ce&&!w&&!le){let J;if(me!=null&&(typeof me.byteLength=="number"?J=me.byteLength:typeof me.size=="number"?J=me.size:typeof me=="string"&&(J=typeof n=="function"?new n().encode(me).byteLength:me.length)),typeof J=="number"&&J>X)throw new L("maxContentLength size of "+X+" exceeded",L.ERR_BAD_RESPONSE,p,O)}return!le&&I&&I(),await new Promise((J,dt)=>{$f(J,dt,{data:me,headers:Me.from(H.headers),status:H.status,statusText:H.statusText,config:p,request:O})})}catch(Z){if(I&&I(),F&&F.aborted&&F.reason instanceof L){const xe=F.reason;throw xe.config=p,O&&(xe.request=O),Z!==xe&&(xe.cause=Z),xe}throw Z&&Z.name==="TypeError"&&/Load failed|fetch/i.test(Z.message)?Object.assign(new L("Network Error",L.ERR_NETWORK,p,O,Z&&Z.response),{cause:Z.cause||Z}):L.from(Z,Z&&Z.code,p,O,Z&&Z.response)}}},Iv=new Map,Wf=e=>{let t=e&&e.env||{};const{fetch:r,Request:n,Response:s}=t,o=[n,s,r];let i=o.length,l=i,c,d,u=Iv;for(;l--;)c=o[l],d=u.get(c),d===void 0&&u.set(c,d=l?new Map:Mv(t)),u=d;return d};Wf();const Xl={http:sv,xhr:Tv,fetch:{get:Wf}};k.forEach(Xl,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{__proto__:null,value:t})}catch{}Object.defineProperty(e,"adapterName",{__proto__:null,value:t})}});const Md=e=>`- ${e}`,Uv=e=>k.isFunction(e)||e===null||e===!1;function Bv(e,t){e=k.isArray(e)?e:[e];const{length:r}=e;let n,s;const o={};for(let i=0;i<r;i++){n=e[i];let l;if(s=n,!Uv(n)&&(s=Xl[(l=String(n)).toLowerCase()],s===void 0))throw new L(`Unknown adapter '${l}'`);if(s&&(k.isFunction(s)||(s=s.get(t))))break;o[l||"#"+i]=s}if(!s){const i=Object.entries(o).map(([c,d])=>`adapter ${c} `+(d===!1?"is not supported by the environment":"is not available in the build"));let l=r?i.length>1?`since :
`+i.map(Md).join(`
`):" "+Md(i[0]):"as no adapter specified";throw new L("There is no suitable adapter to dispatch the request "+l,"ERR_NOT_SUPPORT")}return s}const Jf={getAdapter:Bv,adapters:Xl};function Mo(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new va(null,e)}function Id(e){return Mo(e),e.headers=Me.from(e.headers),e.data=Fo.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),Jf.getAdapter(e.adapter||ga.adapter,e)(e).then(function(n){Mo(e),e.response=n;try{n.data=Fo.call(e,e.transformResponse,n)}finally{delete e.response}return n.headers=Me.from(n.headers),n},function(n){if(!Bf(n)&&(Mo(e),n&&n.response)){e.response=n.response;try{n.response.data=Fo.call(e,e.transformResponse,n.response)}finally{delete e.response}n.response.headers=Me.from(n.response.headers)}return Promise.reject(n)})}const to={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{to[e]=function(n){return typeof n===e||"a"+(t<1?"n ":" ")+e}});const Ud={};to.transitional=function(t,r,n){function s(o,i){return"[Axios v"+Kl+"] Transitional option '"+o+"'"+i+(n?". "+n:"")}return(o,i,l)=>{if(t===!1)throw new L(s(i," has been removed"+(r?" in "+r:"")),L.ERR_DEPRECATED);return r&&!Ud[i]&&(Ud[i]=!0,console.warn(s(i," has been deprecated since v"+r+" and will be removed in the near future"))),t?t(o,i,l):!0}};to.spelling=function(t){return(r,n)=>(console.warn(`${n} is likely a misspelling of ${t}`),!0)};function $v(e,t,r){if(typeof e!="object")throw new L("options must be an object",L.ERR_BAD_OPTION_VALUE);const n=Object.keys(e);let s=n.length;for(;s-- >0;){const o=n[s],i=Object.prototype.hasOwnProperty.call(t,o)?t[o]:void 0;if(i){const l=e[o],c=l===void 0||i(l,o,e);if(c!==!0)throw new L("option "+o+" must be "+c,L.ERR_BAD_OPTION_VALUE);continue}if(r!==!0)throw new L("Unknown option "+o,L.ERR_BAD_OPTION)}}const ns={assertOptions:$v,validators:to},tt=ns.validators;let Cr=class{constructor(t){this.defaults=t||{},this.interceptors={request:new Pd,response:new Pd}}async request(t,r){try{return await this._request(t,r)}catch(n){if(n instanceof Error){let s={};Error.captureStackTrace?Error.captureStackTrace(s):s=new Error;const o=(()=>{if(!s.stack)return"";const i=s.stack.indexOf(`
`);return i===-1?"":s.stack.slice(i+1)})();try{if(!n.stack)n.stack=o;else if(o){const i=o.indexOf(`
`),l=i===-1?-1:o.indexOf(`
`,i+1),c=l===-1?"":o.slice(l+1);String(n.stack).endsWith(c)||(n.stack+=`
`+o)}}catch{}}throw n}}_request(t,r){typeof t=="string"?(r=r||{},r.url=t):r=t||{},r=Tr(this.defaults,r);const{transitional:n,paramsSerializer:s,headers:o}=r;n!==void 0&&ns.assertOptions(n,{silentJSONParsing:tt.transitional(tt.boolean),forcedJSONParsing:tt.transitional(tt.boolean),clarifyTimeoutError:tt.transitional(tt.boolean),legacyInterceptorReqResOrdering:tt.transitional(tt.boolean)},!1),s!=null&&(k.isFunction(s)?r.paramsSerializer={serialize:s}:ns.assertOptions(s,{encode:tt.function,serialize:tt.function},!0)),r.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?r.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:r.allowAbsoluteUrls=!0),ns.assertOptions(r,{baseUrl:tt.spelling("baseURL"),withXsrfToken:tt.spelling("withXSRFToken")},!0),r.method=(r.method||this.defaults.method||"get").toLowerCase();let i=o&&k.merge(o.common,o[r.method]);o&&k.forEach(["delete","get","head","post","put","patch","query","common"],h=>{delete o[h]}),r.headers=Me.concat(i,o);const l=[];let c=!0;this.interceptors.request.forEach(function(y){if(typeof y.runWhen=="function"&&y.runWhen(r)===!1)return;c=c&&y.synchronous;const j=r.transitional||Ql;j&&j.legacyInterceptorReqResOrdering?l.unshift(y.fulfilled,y.rejected):l.push(y.fulfilled,y.rejected)});const d=[];this.interceptors.response.forEach(function(y){d.push(y.fulfilled,y.rejected)});let u,f=0,g;if(!c){const h=[Id.bind(this),void 0];for(h.unshift(...l),h.push(...d),g=h.length,u=Promise.resolve(r);f<g;)u=u.then(h[f++],h[f++]);return u}g=l.length;let w=r;for(;f<g;){const h=l[f++],y=l[f++];try{w=h(w)}catch(j){y.call(this,j);break}}try{u=Id.call(this,w)}catch(h){return Promise.reject(h)}for(f=0,g=d.length;f<g;)u=u.then(d[f++],d[f++]);return u}getUri(t){t=Tr(this.defaults,t);const r=Hf(t.baseURL,t.url,t.allowAbsoluteUrls);return If(r,t.params,t.paramsSerializer)}};k.forEach(["delete","get","head","options"],function(t){Cr.prototype[t]=function(r,n){return this.request(Tr(n||{},{method:t,url:r,data:(n||{}).data}))}});k.forEach(["post","put","patch","query"],function(t){function r(n){return function(o,i,l){return this.request(Tr(l||{},{method:t,headers:n?{"Content-Type":"multipart/form-data"}:{},url:o,data:i}))}}Cr.prototype[t]=r(),t!=="query"&&(Cr.prototype[t+"Form"]=r(!0))});let Hv=class qf{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let r;this.promise=new Promise(function(o){r=o});const n=this;this.promise.then(s=>{if(!n._listeners)return;let o=n._listeners.length;for(;o-- >0;)n._listeners[o](s);n._listeners=null}),this.promise.then=s=>{let o;const i=new Promise(l=>{n.subscribe(l),o=l}).then(s);return i.cancel=function(){n.unsubscribe(o)},i},t(function(o,i,l){n.reason||(n.reason=new va(o,i,l),r(n.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const r=this._listeners.indexOf(t);r!==-1&&this._listeners.splice(r,1)}toAbortSignal(){const t=new AbortController,r=n=>{t.abort(n)};return this.subscribe(r),t.signal.unsubscribe=()=>this.unsubscribe(r),t.signal}static source(){let t;return{token:new qf(function(s){t=s}),cancel:t}}};function Vv(e){return function(r){return e.apply(null,r)}}function Wv(e){return k.isObject(e)&&e.isAxiosError===!0}const $i={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries($i).forEach(([e,t])=>{$i[t]=e});function Yf(e){const t=new Cr(e),r=Ef(Cr.prototype.request,t);return k.extend(r,Cr.prototype,t,{allOwnKeys:!0}),k.extend(r,t,null,{allOwnKeys:!0}),r.create=function(s){return Yf(Tr(e,s))},r}const ie=Yf(ga);ie.Axios=Cr;ie.CanceledError=va;ie.CancelToken=Hv;ie.isCancel=Bf;ie.VERSION=Kl;ie.toFormData=eo;ie.AxiosError=L;ie.Cancel=ie.CanceledError;ie.all=function(t){return Promise.all(t)};ie.spread=Vv;ie.isAxiosError=Wv;ie.mergeConfig=Tr;ie.AxiosHeaders=Me;ie.formToJSON=e=>Uf(k.isHTMLForm(e)?new FormData(e):e);ie.getAdapter=Jf.getAdapter;ie.HttpStatusCode=$i;ie.default=ie;const{Axios:xy,AxiosError:gy,CanceledError:vy,isCancel:yy,CancelToken:by,VERSION:wy,all:jy,Cancel:ky,isAxiosError:Ny,spread:Sy,toFormData:Cy,AxiosHeaders:Ey,HttpStatusCode:_y,formToJSON:zy,getAdapter:Ry,mergeConfig:Py,create:Ty}=ie,Qf=b.createContext(),$=ie.create({baseURL:"http://localhost:5000/api",headers:{"Content-Type":"application/json"}}),Bd=e=>{try{const r=e.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),n=decodeURIComponent(atob(r).split("").map(s=>"%"+("00"+s.charCodeAt(0).toString(16)).slice(-2)).join(""));return JSON.parse(n)}catch{return null}},Jv=({children:e})=>{const[t,r]=b.useState(null),[n,s]=b.useState(!0),{showToast:o}=et();b.useEffect(()=>{(async()=>{const f=localStorage.getItem("accessToken"),g=localStorage.getItem("refreshToken");if(f){const w=Bd(f);if(w?w.exp*1e3<Date.now():!0)if(g)try{const y=await ie.post("http://localhost:5000/api/auth/refresh-token",{refreshToken:g});if(y.data.success){const{accessToken:j,refreshToken:p,user:m}=y.data;if(localStorage.setItem("accessToken",j),localStorage.setItem("refreshToken",p),$.defaults.headers.common.Authorization=`Bearer ${j}`,m)localStorage.setItem("user",JSON.stringify(m)),r(m);else{const x=Bd(j);r({id:x.id,email:x.email,role:x.role})}}else throw new Error("Refresh failed")}catch{localStorage.removeItem("accessToken"),localStorage.removeItem("refreshToken"),localStorage.removeItem("user"),delete $.defaults.headers.common.Authorization,r(null)}else localStorage.removeItem("accessToken"),delete $.defaults.headers.common.Authorization,r(null);else{$.defaults.headers.common.Authorization=`Bearer ${f}`;const y=localStorage.getItem("user");r(y?JSON.parse(y):{id:w.id,email:w.email,role:w.role})}}s(!1)})()},[]),b.useEffect(()=>{const u=$.interceptors.response.use(f=>f,async f=>{const g=f.config;if(f.response&&f.response.status===403&&f.response.data.code==="TOKEN_EXPIRED"&&!g._retry){g._retry=!0;try{const w=localStorage.getItem("refreshToken");if(!w)throw new Error("No refresh token available");const h=await ie.post("http://localhost:5000/api/auth/refresh-token",{refreshToken:w});if(h.data.success){const{accessToken:y,refreshToken:j}=h.data;return localStorage.setItem("accessToken",y),localStorage.setItem("refreshToken",j),$.defaults.headers.common.Authorization=`Bearer ${y}`,g.headers.Authorization=`Bearer ${y}`,$(g)}}catch(w){console.error("Silent Refresh Failed:",w.message),c(!1),o("Your session has expired. Please log in again.","warning")}}return Promise.reject(f)});return()=>{$.interceptors.response.eject(u)}},[o]);const i=async(u,f)=>{var g,w;try{const h=await $.post("/auth/login",{email:u,password:f});if(h.data.success){const{user:y,accessToken:j,refreshToken:p}=h.data;return localStorage.setItem("accessToken",j),localStorage.setItem("refreshToken",p),localStorage.setItem("user",JSON.stringify(y)),$.defaults.headers.common.Authorization=`Bearer ${j}`,r(y),o(h.data.message||"Logged in successfully!","success"),{success:!0,user:y}}}catch(h){const y=((w=(g=h.response)==null?void 0:g.data)==null?void 0:w.message)||"Login failed. Please verify credentials.";return o(y,"error"),{success:!1,error:y}}},l=async u=>{var f,g;try{if((await $.post("/auth/register",u)).data.success)return o("🎉 Account registered successfully! Please log in.","success"),{success:!0}}catch(w){const h=((g=(f=w.response)==null?void 0:f.data)==null?void 0:g.message)||"Registration failed.";return o(h,"error"),{success:!1,error:h}}},c=(u=!0)=>{localStorage.removeItem("accessToken"),localStorage.removeItem("refreshToken"),localStorage.removeItem("user"),delete $.defaults.headers.common.Authorization,r(null),u&&o("Logged out successfully.","info")},d=u=>{localStorage.setItem("user",JSON.stringify(u)),r(u)};return a.jsx(Qf.Provider,{value:{user:t,loading:n,isAuthenticated:!!t,isAdmin:(t==null?void 0:t.role)==="admin",login:i,register:l,logout:c,updateProfileState:d},children:e})},Ht=()=>{const e=b.useContext(Qf);if(!e)throw new Error("useAuth must be used within an AuthProvider");return e},Gf=b.createContext(),qv=({children:e})=>{const[t,r]=b.useState(()=>{const s=localStorage.getItem("theme");return s||(window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark")});b.useEffect(()=>{const s=document.documentElement;t==="light"?(s.classList.remove("theme-dark"),s.classList.add("theme-light")):(s.classList.remove("theme-light"),s.classList.add("theme-dark")),localStorage.setItem("theme",t)},[t]);const n=()=>{r(s=>s==="light"?"dark":"light")};return a.jsx(Gf.Provider,{value:{theme:t,toggleTheme:n,isDark:t==="dark"},children:e})},Yv=()=>{const e=b.useContext(Gf);if(!e)throw new Error("useTheme must be used within a ThemeProvider");return e},Kf=b.createContext(),Qv=({children:e})=>{const[t,r]=b.useState([]),[n,s]=b.useState(!1),[o,i]=b.useState([]),[l,c]=b.useState({total:0,page:1,limit:12,totalPages:1}),[d,u]=b.useState({search:"",job_type:[],salary_min:"",salary_max:"",location:[],experience:[],skills:[],sort:"latest"}),{showToast:f}=et(),{user:g}=Ht(),[w,h]=b.useState([]),y=b.useCallback(async()=>{try{const N=await $.get("/saved-jobs?limit=100");N.data.success&&h(N.data.data.map(C=>Number(C.id)))}catch(N){console.error("Failed to load saved jobs IDs:",N.message)}},[]),j=async(N,C,_)=>{var Q,de;if(!localStorage.getItem("accessToken")){f("Please log in to save jobs.","warning"),C("/login",{state:{from:_}});return}const D=Number(N),A=w.includes(D);h(ne=>A?ne.filter(X=>X!==D):[...ne,D]);try{A?(await $.delete(`/saved-jobs/${D}`)).data.success&&f("Job removed from saved list successfully.","success"):(await $.post("/saved-jobs",{job_id:D})).data.success&&f("Job saved successfully.","success")}catch(ne){h(X=>A?[...X,D]:X.filter(ct=>ct!==D)),f(((de=(Q=ne.response)==null?void 0:Q.data)==null?void 0:de.message)||"Error updating bookmark status.","error")}};b.useEffect(()=>{g&&g.role==="candidate"?y():h([])},[g==null?void 0:g.id,y]);const p=b.useCallback(async()=>{try{const N=await $.get("/jobs/skills");N.data.success&&i(N.data.data)}catch(N){console.error("Failed to load skills list:",N.message)}},[]);b.useEffect(()=>{p()},[p]);const m=b.useCallback(async(N=1)=>{var C,_;s(!0);try{const R={page:N,limit:l.limit,sort:d.sort};d.search&&(R.search=d.search),d.job_type.length>0&&(R.job_type=d.job_type.join(",")),d.location.length>0&&(R.location=d.location.join(",")),d.experience.length>0&&(R.experience=d.experience.join(",")),d.skills.length>0&&(R.skills=d.skills.join(",")),d.salary_min&&(R.salary_min=d.salary_min),d.salary_max&&(R.salary_max=d.salary_max);const D=await $.get("/jobs",{params:R});D.data.success&&(r(D.data.data),c({total:D.data.pagination.total,page:D.data.pagination.page,limit:D.data.pagination.limit,totalPages:D.data.pagination.totalPages}))}catch(R){const D=((_=(C=R.response)==null?void 0:C.data)==null?void 0:_.message)||"Error loading job catalog.";f(D,"error")}finally{s(!1)}},[d,l.limit,f]),x=()=>{u({search:"",job_type:[],salary_min:"",salary_max:"",location:[],experience:[],skills:[],sort:"latest"})},v=N=>{u(C=>({...C,...N}))};return a.jsx(Kf.Provider,{value:{jobs:t,skills:o,loading:n,pagination:l,filters:d,fetchJobs:m,updateFilters:v,resetFilters:x,savedJobIds:w,fetchSavedJobIds:y,toggleSaveJob:j},children:e})},ya=()=>{const e=b.useContext(Kf);if(!e)throw new Error("useJobs must be used within a JobsProvider");return e},Gv=()=>{const{user:e,isAuthenticated:t,logout:r}=Ht(),{isDark:n,toggleTheme:s}=Yv(),{showToast:o}=et(),[i,l]=b.useState(!1),c=lt(),d=Ze(),u=()=>{r(),c("/"),l(!1)},f=w=>d.pathname===w,g=()=>e&&e.profile_image?`http://localhost:5000/uploads/images/${e.profile_image}`:`https://ui-avatars.com/api/?name=${(e==null?void 0:e.first_name)||"U"}+${(e==null?void 0:e.last_name)||"P"}&background=ff5100&color=fff&bold=true`;return a.jsxs("header",{className:"site-header",children:[a.jsx("div",{className:"header-top-bar",children:a.jsxs("div",{className:"header-social-container",children:[a.jsx("span",{className:"join-us-text",children:"Join Us Via"}),a.jsxs("div",{className:"social-links-row",children:[a.jsx("a",{href:"https://wa.me",target:"_blank",rel:"noreferrer",className:"top-social-icon whatsapp",children:a.jsx(Jg,{size:14})}),a.jsx("a",{href:"https://twitter.com",target:"_blank",rel:"noreferrer",className:"top-social-icon twitter",children:a.jsx(Nf,{size:14})}),a.jsx("a",{href:"https://youtube.com",target:"_blank",rel:"noreferrer",className:"top-social-icon youtube",children:a.jsx(Sf,{size:14})}),a.jsx("a",{href:"mailto:info@jobforge.com",className:"top-social-icon mail",children:a.jsx(un,{size:14})}),a.jsx("a",{href:"https://facebook.com",target:"_blank",rel:"noreferrer",className:"top-social-icon facebook",children:a.jsx(yf,{size:14})}),a.jsx("a",{href:"https://linkedin.com",target:"_blank",rel:"noreferrer",className:"top-social-icon linkedin",children:a.jsx(wf,{size:14})}),a.jsx("a",{href:"https://instagram.com",target:"_blank",rel:"noreferrer",className:"top-social-icon instagram",children:a.jsx(bf,{size:14})})]})]})}),a.jsxs("div",{className:"header-container",children:[a.jsx("div",{className:"logo-wrapper",children:a.jsx(B,{to:"/",className:"site-logo",children:a.jsxs("div",{className:"vr-pi-logo-container",children:[a.jsxs("div",{className:"logo-main-row",children:[a.jsx("span",{className:"logo-vr",children:"VR"}),a.jsxs("div",{className:"logo-pi-badge",children:[a.jsx("span",{className:"logo-p-white",children:"P"}),a.jsx("span",{className:"logo-i-dot",children:"i"})]})]}),a.jsx("div",{className:"logo-sub-companies",children:"GROUP OF COMPANIES"})]})})}),a.jsxs("div",{className:"nav-wrapper-slanted",children:[a.jsxs("nav",{className:"desktop-nav",children:[a.jsx(B,{to:"/",className:`nav-link ${f("/")?"nav-link-active":""}`,children:"Home"}),a.jsx(B,{to:"/jobs",className:`nav-link ${f("/jobs")?"nav-link-active":""}`,children:"Find Jobs"}),t&&a.jsx(B,{to:(e==null?void 0:e.role)==="recruiter"?"/recruiter-dashboard":"/dashboard",className:`nav-link ${f((e==null?void 0:e.role)==="recruiter"?"/recruiter-dashboard":"/dashboard")?"nav-link-active":""}`,children:"My Dashboard"}),a.jsx(B,{to:"/contact",className:`nav-link ${f("/contact")?"nav-link-active":""}`,children:"Contact Us"}),(e==null?void 0:e.role)==="admin"&&a.jsx("a",{href:"http://localhost:3001",className:"nav-link nav-link-admin",target:"_blank",rel:"noreferrer",children:"Admin Panel ↗"})]}),a.jsxs("div",{className:"header-actions",children:[a.jsx("button",{className:"theme-toggle-btn",onClick:s,"aria-label":"Toggle Theme",children:n?a.jsx(e0,{size:16}):a.jsx(qg,{size:16})}),a.jsx("div",{className:"auth-actions-desktop",children:t?a.jsxs("div",{className:"user-profile-menu",children:[a.jsxs(B,{to:(e==null?void 0:e.role)==="recruiter"?"/recruiter-dashboard":"/dashboard",className:"avatar-wrapper",title:"Go to Dashboard",children:[a.jsx("img",{src:g(),alt:"User Avatar",className:"user-avatar"}),a.jsxs("span",{className:"user-welcome-name",children:["Hi, ",e.first_name]})]}),a.jsx("button",{onClick:u,className:"btn-logout-icon",title:"Log Out",children:a.jsx(Cd,{size:14})})]}):a.jsxs("div",{className:"guest-links",children:[a.jsx(B,{to:"/login",className:"btn-login-link",children:"Log In"}),a.jsx(B,{to:"/register",className:"btn btn-primary nav-signup-btn",children:"Sign Up"})]})})]})]}),a.jsx("button",{className:"mobile-menu-toggle",onClick:()=>l(!i),"aria-label":"Toggle Mobile Menu",children:i?a.jsx(la,{size:24}):a.jsx(Wg,{size:24})})]}),i&&a.jsx("div",{className:"mobile-drawer animate-fade",children:a.jsxs("div",{className:"mobile-drawer-content",children:[a.jsxs("div",{className:"mobile-drawer-header",children:[a.jsx(B,{to:"/",className:"site-logo",onClick:()=>l(!1),children:a.jsxs("div",{className:"vr-pi-logo-container",children:[a.jsxs("div",{className:"logo-main-row",children:[a.jsx("span",{className:"logo-vr",children:"VR"}),a.jsxs("div",{className:"logo-pi-badge",children:[a.jsx("span",{className:"logo-p-white",children:"P"}),a.jsx("span",{className:"logo-i-dot",children:"i"})]})]}),a.jsx("div",{className:"logo-sub-companies",children:"GROUP OF COMPANIES"})]})}),a.jsx("button",{className:"mobile-drawer-close",onClick:()=>l(!1),children:a.jsx(la,{size:24})})]}),a.jsxs("nav",{className:"mobile-drawer-links",children:[a.jsxs(B,{to:"/",className:`mobile-nav-link ${f("/")?"mobile-nav-active":""}`,onClick:()=>l(!1),children:[a.jsx(zt,{size:18})," Home"]}),a.jsxs(B,{to:"/jobs",className:`mobile-nav-link ${f("/jobs")?"mobile-nav-active":""}`,onClick:()=>l(!1),children:[a.jsx(zt,{size:18})," Find Jobs"]}),t&&a.jsxs(B,{to:(e==null?void 0:e.role)==="recruiter"?"/recruiter-dashboard":"/dashboard",className:`mobile-nav-link ${f((e==null?void 0:e.role)==="recruiter"?"/recruiter-dashboard":"/dashboard")?"mobile-nav-active":""}`,onClick:()=>l(!1),children:[a.jsx(Nd,{size:18})," My Dashboard"]}),a.jsxs(B,{to:"/contact",className:`mobile-nav-link ${f("/contact")?"mobile-nav-active":""}`,onClick:()=>l(!1),children:[a.jsx(un,{size:18})," Contact Us"]}),(e==null?void 0:e.role)==="admin"&&a.jsxs("a",{href:"http://localhost:3001",className:"mobile-nav-link mobile-nav-link-admin",target:"_blank",rel:"noreferrer",children:[a.jsx(Nd,{size:18})," Admin Dashboard ↗"]})]}),a.jsx("div",{className:"mobile-drawer-footer",children:t?a.jsxs("div",{className:"mobile-auth-profile",children:[a.jsxs("div",{className:"mobile-user-details",children:[a.jsx("img",{src:g(),alt:"User Avatar",className:"user-avatar"}),a.jsxs("div",{children:[a.jsxs("div",{className:"mobile-username",children:[e.first_name," ",e.last_name]}),a.jsx("div",{className:"mobile-useremail",children:e.email})]})]}),a.jsxs("button",{onClick:u,className:"btn btn-secondary w-full",style:{width:"100%"},children:[a.jsx(Cd,{size:16})," Log Out"]})]}):a.jsxs("div",{className:"mobile-auth-guest",children:[a.jsxs(B,{to:"/login",className:"btn btn-secondary",style:{width:"100%",marginBottom:"10px"},onClick:()=>l(!1),children:[a.jsx(rn,{size:16})," Log In"]}),a.jsx(B,{to:"/register",className:"btn btn-primary",style:{width:"100%"},onClick:()=>l(!1),children:"Sign Up"})]})})]})}),a.jsx("style",{children:`
        .site-header {
          position: sticky;
          top: 0;
          z-index: 1000;
          background-color: var(--bg-secondary);
          border-bottom: 2px solid #eaeaea;
          transition: background-color var(--transition-normal);
        }

        /* 1. Header Top Bar (Social Row) */
        .header-top-bar {
          background-color: #ffffff;
          border-bottom: 1px solid #f0f0f0;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding: 0 40px;
        }

        .header-social-container {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .join-us-text {
          font-size: 11px;
          font-weight: 800;
          color: #000000;
          font-family: 'Inter', sans-serif;
          letter-spacing: 0.5px;
        }

        .social-links-row {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .top-social-icon {
          color: #ff5100;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color var(--transition-fast), transform var(--transition-fast);
        }

        .top-social-icon:hover {
          color: #cc4100;
          transform: scale(1.15);
        }

        /* 2. Main Header Container */
        .header-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 80px;
          padding: 0;
          width: 100%;
          max-width: 100%;
          margin: 0 auto;
        }

        /* VR PI Logo Design to match Screenshot exactly */
        .logo-wrapper {
          padding-left: 40px;
          display: flex;
          align-items: center;
        }

        .vr-pi-logo-container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          line-height: 1;
        }

        .logo-main-row {
          display: flex;
          align-items: center;
        }

        .logo-vr {
          font-size: 38px;
          font-weight: 900;
          color: #c10037; /* Crimson Magenta matching screenshot */
          font-family: 'Outfit', sans-serif;
          letter-spacing: -2px;
        }

        .logo-pi-badge {
          background-color: #ff5100; /* Vibrant Orange background */
          color: #ffffff;
          padding: 3px 10px;
          margin-left: 6px;
          border-radius: 6px;
          font-family: 'Outfit', sans-serif;
          font-weight: 900;
          font-size: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
        }

        .logo-p-white {
          color: #ffffff;
        }

        .logo-i-dot {
          font-size: 14px;
          color: #ff5100; /* Orange inside circle */
          background-color: #ffffff; /* White circle background */
          border-radius: 50%;
          width: 13px;
          height: 13px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-left: 2px;
          font-weight: 900;
          font-family: 'Outfit', sans-serif;
          box-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }

        .logo-sub-companies {
          font-size: 9px;
          font-weight: 800;
          color: #c10037; /* Crimson Magenta matching screenshot */
          text-transform: uppercase;
          margin-top: 4px;
          letter-spacing: 0.5px;
          font-family: 'Inter', sans-serif;
        }

        /* Slanted Black Banner Box on Desktop */
        .nav-wrapper-slanted {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          background-color: #000000;
          height: 100%;
          padding: 0 40px 0 80px;
          clip-path: polygon(40px 0, 100% 0, 100% 100%, 0 100%);
          margin-left: 20px;
          flex-grow: 1;
          gap: 40px;
        }

        .desktop-nav {
          display: flex;
          gap: 8px;
          height: 100%;
          align-items: center;
        }

        .nav-link {
          font-weight: 700;
          color: #ffffff;
          position: relative;
          height: 100%;
          display: flex;
          align-items: center;
          padding: 0 24px;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          text-transform: capitalize;
          transition: color var(--transition-fast);
        }

        .nav-link:hover {
          color: #ff5100;
        }

        .nav-link-active {
          color: #ffffff;
          font-weight: 800;
        }

        .nav-link-active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 24px;
          right: 24px;
          height: 4px;
          background-color: #ff5100; /* Solid Orange bottom indicator */
        }

        .nav-link-admin {
          color: #ff854d;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .theme-toggle-btn {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-sm);
          color: #ffffff;
          border: 1px solid #333333;
          background-color: #111111;
          transition: all var(--transition-normal);
        }

        .theme-toggle-btn:hover {
          color: #ff5100;
          border-color: #ff5100;
          background-color: #222222;
        }

        .auth-actions-desktop {
          display: flex;
          align-items: center;
        }

        .guest-links {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .btn-login-link {
          font-weight: 600;
          color: #ffffff;
          padding: 8px 12px;
          font-size: 14px;
          transition: color var(--transition-fast);
        }

        .btn-login-link:hover {
          color: #ff5100;
        }

        .nav-signup-btn {
          background-color: #ff5100;
          color: #ffffff;
          border: none;
          font-weight: 700;
          padding: 8px 18px;
          border-radius: 4px;
          font-size: 13px;
          transition: background-color var(--transition-fast);
        }

        .nav-signup-btn:hover {
          background-color: #cc4100;
        }

        .user-profile-menu {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .avatar-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #ff5100;
          padding: 1px;
        }

        .user-welcome-name {
          font-weight: 600;
          font-size: 13px;
          color: #ffffff;
        }

        .user-welcome-name:hover {
          color: #ff5100;
        }

        .btn-logout-icon {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-sm);
          color: #aaaaaa;
          background-color: #111111;
          border: 1px solid #333333;
          transition: all var(--transition-normal);
        }

        .btn-logout-icon:hover {
          color: #ff5100;
          border-color: #ff5100;
          background-color: #222222;
        }

        .mobile-menu-toggle {
          display: none;
          color: var(--text-primary);
          margin-right: 20px;
          background: none;
          border: none;
          cursor: pointer;
        }

        /* Mobile Drawer Styling */
        .mobile-drawer {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(8px);
          z-index: 10000;
        }

        .mobile-drawer-content {
          position: absolute;
          top: 0;
          right: 0;
          width: 290px;
          height: 100%;
          background-color: #ffffff;
          color: #000000;
          box-shadow: var(--shadow-xl);
          padding: 24px;
          display: flex;
          flex-direction: column;
        }

        .mobile-drawer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }

        .mobile-drawer-close {
          color: #000000;
          background: none;
          border: none;
          cursor: pointer;
        }

        .mobile-drawer-links {
          display: flex;
          flex-direction: column;
          gap: 20px;
          flex-grow: 1;
        }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-display);
          font-weight: 700;
          color: #333333;
          font-size: 16px;
          padding: 8px 0;
        }

        .mobile-nav-active {
          color: #ff5100;
        }

        .mobile-nav-link-admin {
          color: #e04800;
        }

        .mobile-drawer-footer {
          margin-top: auto;
          border-top: 1px solid #eeeeee;
          padding-top: 24px;
        }

        .mobile-auth-profile {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .mobile-user-details {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        }

        .mobile-username {
          font-weight: 700;
          font-size: 15px;
          color: #000000;
        }

        .mobile-useremail {
          font-size: 12px;
          color: #666666;
        }

        .mobile-auth-guest {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        @media (max-width: 992px) {
          .nav-wrapper-slanted, .header-top-bar {
            display: none;
          }
          
          .mobile-menu-toggle {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .logo-wrapper {
            padding-left: 20px;
          }
          .header-container {
            height: 70px;
          }
        }
      `})]})},Kv=()=>{const[e,t]=b.useState(""),{showToast:r}=et(),n=s=>{s.preventDefault(),e&&(r("🎉 Thank you for subscribing to our career newsletter!","success"),t(""))};return a.jsxs("footer",{className:"site-footer",children:[a.jsxs("div",{className:"container footer-grid",children:[a.jsxs("div",{className:"footer-col footer-brand-col",children:[a.jsx(B,{to:"/",className:"footer-logo",children:a.jsxs("div",{className:"vr-pi-logo-container",children:[a.jsxs("div",{className:"logo-main-row",children:[a.jsx("span",{className:"logo-vr",children:"VR"}),a.jsx("span",{className:"logo-pi-box",children:"PI"})]}),a.jsx("div",{className:"logo-sub",children:"value for investment"})]})}),a.jsxs("div",{className:"footer-slogan",children:[a.jsx("p",{className:"slogan-primary",children:"Value for investment..."}),a.jsx("p",{className:"slogan-secondary",children:"value for you..."})]})]}),a.jsxs("div",{className:"footer-col",children:[a.jsx("h3",{className:"footer-title",children:"Quick Links"}),a.jsxs("ul",{className:"footer-links",children:[a.jsx("li",{children:a.jsx(B,{to:"/",children:"Home"})}),a.jsx("li",{children:a.jsx(B,{to:"/",children:"About Us"})}),a.jsx("li",{children:a.jsx(B,{to:"/jobs",children:"Jobs"})}),a.jsx("li",{children:a.jsx(B,{to:"/contact",children:"Contact Us"})})]})]}),a.jsxs("div",{className:"footer-col",children:[a.jsx("h3",{className:"footer-title",children:"Company"}),a.jsxs("div",{className:"footer-contact-details",children:[a.jsxs("div",{className:"contact-item",children:[a.jsx(zs,{size:16}),a.jsx("span",{children:"Marathahalli Innovation Hub, Bangalore, India"})]}),a.jsxs("div",{className:"contact-item",children:[a.jsx(Wl,{size:16}),a.jsx("span",{children:"+91 80 4912 4000"})]}),a.jsxs("div",{className:"contact-item",children:[a.jsx(un,{size:16}),a.jsx("span",{children:"careers@jobforge.com"})]})]})]}),a.jsxs("div",{className:"footer-col footer-newsletter-col",children:[a.jsx("h3",{className:"footer-title",children:"Join Us"}),a.jsxs("div",{className:"footer-socials",children:[a.jsx("a",{href:"https://facebook.com",target:"_blank",rel:"noreferrer",className:"social-icon-btn",children:a.jsx(yf,{size:18})}),a.jsx("a",{href:"https://twitter.com",target:"_blank",rel:"noreferrer",className:"social-icon-btn",children:a.jsx(Nf,{size:18})}),a.jsx("a",{href:"https://instagram.com",target:"_blank",rel:"noreferrer",className:"social-icon-btn",children:a.jsx(bf,{size:18})}),a.jsx("a",{href:"https://linkedin.com",target:"_blank",rel:"noreferrer",className:"social-icon-btn",children:a.jsx(wf,{size:18})}),a.jsx("a",{href:"https://youtube.com",target:"_blank",rel:"noreferrer",className:"social-icon-btn",children:a.jsx(Sf,{size:18})})]}),a.jsxs("form",{className:"newsletter-form",onSubmit:n,children:[a.jsx("input",{type:"email",placeholder:"Newsletter subscription",className:"newsletter-input",value:e,onChange:s=>t(s.target.value),required:!0}),a.jsx("button",{type:"submit",className:"newsletter-submit-btn","aria-label":"Subscribe",children:a.jsx(Jl,{size:14})})]})]})]}),a.jsx("div",{className:"footer-bottom",children:a.jsxs("div",{className:"container footer-bottom-container",children:[a.jsxs("p",{className:"copyright-text",children:["© ",new Date().getFullYear()," JobForge. All rights reserved."]}),a.jsx("p",{className:"made-with-love",children:"value for investment | value for you"})]})}),a.jsx("style",{children:`
        .site-footer {
          background-color: #0c0c0c;
          border-top: 3px solid #ff5100;
          padding: 80px 0 0 0;
          color: #cccccc;
          margin-top: auto;
          text-align: left;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1.5fr 1.5fr;
          gap: 48px;
          padding-bottom: 60px;
        }

        .footer-brand-col {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        /* VR PI Logo inside footer */
        .footer-logo {
          display: inline-block;
        }

        .footer-logo .vr-pi-logo-container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          line-height: 1;
        }

        .footer-logo .logo-main-row {
          display: flex;
          align-items: center;
        }

        .footer-logo .logo-vr {
          font-size: 34px;
          font-weight: 900;
          color: #ff5100;
          font-family: 'Outfit', sans-serif;
          letter-spacing: -1.5px;
        }

        .footer-logo .logo-pi-box {
          font-size: 20px;
          font-weight: 900;
          color: #000000;
          background-color: #ffffff;
          padding: 3px 6px;
          margin-left: 5px;
          border-radius: 4px;
          font-family: 'Outfit', sans-serif;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          letter-spacing: 0.5px;
        }

        .footer-logo .logo-sub {
          font-size: 9px;
          font-weight: 700;
          color: #ff5100;
          text-transform: uppercase;
          margin-top: 1px;
          letter-spacing: 0.5px;
          font-family: 'Inter', sans-serif;
        }

        .footer-slogan {
          text-align: left;
          color: #ffffff;
          font-family: 'Outfit', sans-serif;
          font-size: 16px;
          font-weight: 600;
          line-height: 1.3;
        }

        .slogan-primary {
          color: #ffffff;
          margin: 0;
        }

        .slogan-secondary {
          color: #ff5100;
          margin: 0;
          padding-left: 20px;
        }

        .footer-title {
          font-size: 18px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 24px;
          position: relative;
          padding-bottom: 8px;
          font-family: 'Outfit', sans-serif;
        }

        .footer-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 32px;
          height: 2px;
          background-color: #ff5100;
          border-radius: var(--radius-full);
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 14px;
          font-size: 14px;
          padding: 0;
          margin: 0;
        }

        .footer-links a {
          color: #cccccc;
          transition: color var(--transition-fast), padding-left var(--transition-fast);
        }

        .footer-links a:hover {
          color: #ff5100;
          padding-left: 4px;
        }

        .footer-contact-details {
          display: flex;
          flex-direction: column;
          gap: 16px;
          font-size: 13px;
        }

        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          color: #cccccc;
          line-height: 1.4;
        }

        .contact-item svg {
          color: #ff5100;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .footer-newsletter-col {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* Orange Circle Social Buttons */
        .footer-socials {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .social-icon-btn {
          width: 38px;
          height: 38px;
          background-color: #1a1a1a;
          color: #ff5100;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color var(--transition-fast), color var(--transition-fast);
          border: 1px solid #333333;
        }

        .social-icon-btn:hover {
          background-color: #ff5100;
          color: #ffffff;
        }

        /* Newsletter subscribe styling */
        .newsletter-form {
          display: flex;
          position: relative;
          width: 100%;
          margin-top: 10px;
        }

        .newsletter-input {
          width: 100%;
          padding: 12px 48px 12px 16px;
          border-radius: 4px;
          background-color: #1a1a1a;
          border: 1px solid #333333;
          color: #ffffff;
          font-size: 13px;
          transition: border-color var(--transition-normal);
        }

        .newsletter-input:focus {
          border-color: #ff5100;
          outline: none;
        }

        .newsletter-input::placeholder {
          color: #777777;
        }

        .newsletter-submit-btn {
          position: absolute;
          right: 4px;
          top: 4px;
          bottom: 4px;
          width: 36px;
          background-color: #ff5100;
          color: #ffffff;
          border-radius: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          transition: background-color var(--transition-normal);
          cursor: pointer;
        }

        .newsletter-submit-btn:hover {
          background-color: #cc4100;
        }

        .footer-bottom {
          border-top: 1px solid #1a1a1a;
          padding: 24px 0;
          font-size: 12px;
          color: #777777;
          margin-top: 40px;
        }

        .footer-bottom-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }

        .made-with-love {
          color: #ff5100;
          font-weight: 600;
          font-family: 'Outfit', sans-serif;
          letter-spacing: 0.5px;
        }

        @media (max-width: 992px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }
        }

        @media (max-width: 576px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          
          .footer-bottom-container {
            flex-direction: column;
            text-align: center;
          }
        }
      `})]})},Xv=()=>{const t=Ze().pathname.split("/").filter(n=>n);if(t.length===0)return null;const r=n=>typeof n!="string"?"":isNaN(n)?n.charAt(0).toUpperCase()+n.slice(1).replace(/-/g," "):"Details";return a.jsxs("nav",{"aria-label":"breadcrumb",className:"breadcrumbs-nav",children:[a.jsx("div",{className:"container breadcrumbs-container",children:a.jsxs("ol",{className:"breadcrumbs-list",children:[a.jsx("li",{className:"breadcrumbs-item",children:a.jsxs(B,{to:"/",className:"breadcrumbs-link breadcrumbs-home",children:[a.jsx(Ug,{size:14}),a.jsx("span",{children:"Home"})]})}),t.map((n,s)=>{const o=s===t.length-1,i=`/${t.slice(0,s+1).join("/")}`;return a.jsxs("li",{className:"breadcrumbs-item",children:[a.jsx(hf,{size:14,className:"breadcrumbs-separator"}),o?a.jsx("span",{className:"breadcrumbs-current","aria-current":"page",children:r(n)}):a.jsx(B,{to:i,className:"breadcrumbs-link",children:r(n)})]},i)})]})}),a.jsx("style",{children:`
        .breadcrumbs-nav {
          background-color: var(--bg-secondary);
          border-bottom: 1px solid var(--border-color);
          padding: 12px 0;
          font-size: 13px;
          font-weight: 500;
          color: var(--text-secondary);
        }

        .breadcrumbs-container {
          display: flex;
          align-items: center;
        }

        .breadcrumbs-list {
          display: flex;
          align-items: center;
          list-style: none;
          flex-wrap: wrap;
          gap: 6px;
        }

        .breadcrumbs-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .breadcrumbs-link {
          display: flex;
          align-items: center;
          gap: 4px;
          color: var(--text-tertiary);
          transition: color var(--transition-fast);
        }

        .breadcrumbs-link:hover {
          color: var(--primary);
        }

        .breadcrumbs-home {
          color: var(--text-secondary);
        }

        .breadcrumbs-separator {
          color: var(--text-tertiary);
        }

        .breadcrumbs-current {
          color: var(--text-primary);
          font-weight: 600;
        }
      `})]})},$a=({children:e,allowedRoles:t})=>{const{user:r,loading:n,isAuthenticated:s}=Ht(),o=Ze();return n?a.jsxs("div",{className:"protected-route-loading",children:[a.jsx("div",{className:"spinner"}),a.jsx("p",{children:"Loading session..."}),a.jsx("style",{children:`
          .protected-route-loading {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 60vh;
            gap: 16px;
            color: var(--text-secondary);
            font-weight: 500;
          }
        `})]}):s?t&&!t.includes(r.role)?a.jsx(bd,{to:"/",replace:!0}):e:a.jsx(bd,{to:"/login",state:{from:o},replace:!0})},te=({width:e="100%",height:t="16px",borderRadius:r="var(--radius-xs)",style:n})=>a.jsx("div",{className:"shimmer-wrapper",style:{width:e,height:t,borderRadius:r,...n}}),Xf=()=>a.jsxs("div",{className:"skeleton-card",children:[a.jsxs("div",{className:"skeleton-header",children:[a.jsx(te,{width:"48px",height:"48px",borderRadius:"var(--radius-sm)"}),a.jsxs("div",{className:"skeleton-titles",children:[a.jsx(te,{width:"120px",height:"18px"}),a.jsx(te,{width:"80px",height:"14px",style:{marginTop:"8px"}})]})]}),a.jsxs("div",{className:"skeleton-body",children:[a.jsx(te,{width:"90%",height:"16px",style:{marginTop:"16px"}}),a.jsxs("div",{className:"skeleton-meta",children:[a.jsx(te,{width:"70px",height:"24px",borderRadius:"var(--radius-full)"}),a.jsx(te,{width:"70px",height:"24px",borderRadius:"var(--radius-full)"}),a.jsx(te,{width:"70px",height:"24px",borderRadius:"var(--radius-full)"})]})]}),a.jsxs("div",{className:"skeleton-footer",children:[a.jsx(te,{width:"90px",height:"38px",borderRadius:"var(--radius-sm)"}),a.jsx(te,{width:"90px",height:"38px",borderRadius:"var(--radius-sm)"})]}),a.jsx("style",{children:`
        .skeleton-card {
          padding: 20px;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .skeleton-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .skeleton-titles {
          flex-grow: 1;
        }

        .skeleton-meta {
          display: flex;
          gap: 8px;
          margin-top: 12px;
          flex-wrap: wrap;
        }

        .skeleton-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
          padding-top: 16px;
          border-top: 1px dashed var(--border-color);
        }
      `})]}),Zv=()=>a.jsxs("div",{className:"skeleton-details",children:[a.jsxs("div",{className:"skeleton-details-header",children:[a.jsx(te,{width:"80px",height:"80px",borderRadius:"var(--radius-md)"}),a.jsxs("div",{className:"skeleton-details-titles",children:[a.jsx(te,{width:"280px",height:"28px"}),a.jsx(te,{width:"180px",height:"18px",style:{marginTop:"12px"}})]})]}),a.jsxs("div",{className:"skeleton-details-grid",children:[a.jsxs("div",{className:"skeleton-details-main",children:[a.jsx(te,{width:"100%",height:"150px",style:{marginBottom:"24px"}}),a.jsx(te,{width:"100%",height:"100px",style:{marginBottom:"24px"}}),a.jsx(te,{width:"100%",height:"120px"})]}),a.jsx("div",{className:"skeleton-details-sidebar",children:a.jsxs("div",{className:"skeleton-sidebar-card",children:[a.jsx(te,{width:"120px",height:"20px",style:{marginBottom:"16px"}}),a.jsx(te,{width:"100%",height:"16px",style:{marginBottom:"12px"}}),a.jsx(te,{width:"100%",height:"16px",style:{marginBottom:"12px"}}),a.jsx(te,{width:"100%",height:"16px",style:{marginBottom:"12px"}}),a.jsx(te,{width:"100%",height:"40px",borderRadius:"var(--radius-sm)",style:{marginTop:"24px"}})]})})]}),a.jsx("style",{children:`
        .skeleton-details {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .skeleton-details-header {
          display: flex;
          align-items: center;
          gap: 20px;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--border-color);
        }

        .skeleton-details-titles {
          flex-grow: 1;
        }

        .skeleton-details-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 32px;
        }

        .skeleton-sidebar-card {
          padding: 24px;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
        }

        @media (max-width: 768px) {
          .skeleton-details-grid {
            grid-template-columns: 1fr;
          }
        }
      `})]}),$n=()=>a.jsxs("div",{className:"skeleton-table",children:[a.jsxs("div",{className:"skeleton-table-header",children:[a.jsx(te,{width:"150px",height:"24px"}),a.jsx(te,{width:"80px",height:"36px",borderRadius:"var(--radius-sm)"})]}),a.jsx("div",{className:"skeleton-table-rows",children:[1,2,3,4].map(e=>a.jsxs("div",{className:"skeleton-table-row",children:[a.jsx(te,{width:"200px",height:"18px"}),a.jsx(te,{width:"120px",height:"16px"}),a.jsx(te,{width:"90px",height:"24px",borderRadius:"var(--radius-full)"}),a.jsx(te,{width:"60px",height:"16px"})]},e))}),a.jsx("style",{children:`
        .skeleton-table {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 24px;
        }

        .skeleton-table-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .skeleton-table-rows {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .skeleton-table-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 0;
          border-top: 1px solid var(--border-color);
        }
      `})]}),$d=()=>{const e=lt(),{updateFilters:t}=ya(),[r,n]=b.useState([]),[s,o]=b.useState(!1),[i,l]=b.useState(""),[c,d]=b.useState("");b.useEffect(()=>{(async()=>{o(!0);try{const y=await $.get("/jobs",{params:{page:1,limit:6,sort:"latest"}});y.data.success&&n(y.data.data)}catch(y){console.error("Failed to load featured jobs:",y.message)}finally{o(!1)}})()},[]);const u=h=>{h.preventDefault(),t({search:i,location:c?[c]:[]}),e("/jobs")},f=(h,y)=>{const j=p=>new Intl.NumberFormat("en-IN",{maximumFractionDigits:0}).format(p);return`₹${j(h)} - ₹${j(y)}`},g=h=>{const y=new Date(h),p=Math.abs(new Date-y),m=Math.ceil(p/(1e3*60*60*24));return m<=1?"Today":m===2?"Yesterday":`${m-1} days ago`},w=h=>h?`http://localhost:5000/uploads/images/${h}`:"https://ui-avatars.com/api/?name=Company&background=fff0e6&color=ff5100&bold=true";return a.jsxs("main",{className:"home-page-redesign animate-fade",children:[a.jsxs("section",{className:"hero-section",children:[a.jsx("div",{className:"hero-bg-wrapper",children:a.jsx("div",{className:"hero-bg",style:{backgroundImage:"url('/hero_stairs.png')"}})}),a.jsx("div",{className:"hero-overlay"}),a.jsx("div",{className:"container hero-inner",children:a.jsxs("div",{className:"hero-grid",children:[a.jsx("div",{className:"hero-spacer"})," ",a.jsxs("div",{className:"hero-text-block animate-slide",children:[a.jsx("h1",{className:"hero-title",children:"Join our Team"}),a.jsx("p",{className:"hero-desc",children:"Lorem ipsum dolor sit amet, consectetur. Sodales eget convallis sem iaculis. Lorem ipsum dolor sit amet, consectetur. Sodales eget convallis sem iaculis."}),a.jsxs("div",{className:"hero-buttons-row",children:[a.jsx(B,{to:"/jobs",className:"btn-explore-jobs",children:"Explore"}),a.jsx(B,{to:"/jobs",className:"btn-outlined-jobs",children:"Jobs"})]})]})]})}),a.jsx("div",{className:"hero-stats-capsule-container",children:a.jsxs("div",{className:"hero-stats-capsule",children:[a.jsxs("div",{className:"capsule-left",children:[a.jsx("span",{className:"capsule-number",children:"700+"}),a.jsx("span",{className:"capsule-label",children:"Students"})]}),a.jsx("div",{className:"capsule-divider"}),a.jsx("div",{className:"capsule-right",children:a.jsx("p",{className:"capsule-text",children:"Lorem ipsum dolor sit amet, consectetur. Sodales eget convallis sem iaculis. Lorem ipsum dolor sit amet, consectetur. Sodales eget convallis sem iaculis."})})]})})]}),a.jsx("section",{className:"about-us-section",children:a.jsxs("div",{className:"container",children:[a.jsxs("div",{className:"section-title-tag",children:[a.jsx("span",{className:"tag-orange-line"}),a.jsx("span",{className:"tag-text",children:"About Us"})]}),a.jsxs("div",{className:"about-grid",children:[a.jsx("div",{className:"about-image-wrapper",children:a.jsx("img",{src:"/about_us_team.png",alt:"Collaborative Developers Team",className:"about-team-img"})}),a.jsxs("div",{className:"about-content",children:[a.jsxs("h3",{className:"about-tagline",children:[a.jsx("span",{className:"orange-highlight",children:'"JobForge"'})," is a tech-driven and forward-thinking job search platform, specializing in connecting talented professionals with cutting-edge industry opportunities. Our core focus emphasizes high-quality, user-friendly recruitment technology to simplify the job hunt and hiring process, fostering a culture of career growth, inclusivity, and professional excellence. By combining advanced search capabilities, verified employer listings, and seamless recruitment workflows, we aspire to propel career growth, generate value, and affect positive change within our professional community."]}),a.jsx(B,{to:"/jobs",className:"btn-explore-jobs",children:"Explore All"})]})]})]})}),a.jsx("section",{className:"hiring-process-section",children:a.jsxs("div",{className:"container",children:[a.jsxs("div",{className:"section-title-tag",children:[a.jsx("span",{className:"tag-orange-line"}),a.jsx("span",{className:"tag-text",children:"Hiring Process"})]}),a.jsxs("div",{className:"process-header",children:[a.jsx("h2",{className:"process-main-title",children:"Process to join our Team"}),a.jsx("p",{className:"process-subtitle",children:"Lorem ipsum dolor sit amet, consectetur. Sodales eget convallis sem iaculis. Lorem ipsum dolor sit amet, consectetur. Sodales eget convallis sem iaculis."})]}),a.jsxs("div",{className:"steps-stack",children:[a.jsxs("div",{className:"step-row odd-step",children:[a.jsxs("div",{className:"step-number-outline",children:[a.jsx("span",{children:"STEP"}),a.jsx("span",{className:"step-num",children:"01"})]}),a.jsx("div",{className:"step-content-box",children:a.jsxs("div",{className:"step-content-inner",children:[a.jsx("h3",{className:"step-title",children:"Process to join our Team"}),a.jsx("p",{className:"step-desc",children:"Lorem ipsum dolor sit amet, consectetur. Sodales eget convallis sem iaculis. Lorem ipsum dolor sit amet, consectetur. Sodales eget convallis sem iaculis. Lorem ipsum dolor sit amet, consectetur. Sodales eget convallis sem iaculis. Sodales eget convallis sem iaculis."})]})})]}),a.jsxs("div",{className:"step-row even-step",children:[a.jsxs("div",{className:"step-number-outline",children:[a.jsx("span",{children:"STEP"}),a.jsx("span",{className:"step-num",children:"02"})]}),a.jsx("div",{className:"step-content-box",children:a.jsxs("div",{className:"step-content-inner",children:[a.jsx("h3",{className:"step-title",children:"Process to join our Team"}),a.jsx("p",{className:"step-desc",children:"Lorem ipsum dolor sit amet, consectetur. Sodales eget convallis sem iaculis. Lorem ipsum dolor sit amet, consectetur. Sodales eget convallis sem iaculis. Lorem ipsum dolor sit amet, consectetur. Sodales eget convallis sem iaculis. Sodales eget convallis sem iaculis."})]})})]}),a.jsxs("div",{className:"step-row odd-step",children:[a.jsxs("div",{className:"step-number-outline",children:[a.jsx("span",{children:"STEP"}),a.jsx("span",{className:"step-num",children:"03"})]}),a.jsx("div",{className:"step-content-box",children:a.jsxs("div",{className:"step-content-inner",children:[a.jsx("h3",{className:"step-title",children:"Process to join our Team"}),a.jsx("p",{className:"step-desc",children:"Lorem ipsum dolor sit amet, consectetur. Sodales eget convallis sem iaculis. Lorem ipsum dolor sit amet, consectetur. Sodales eget convallis sem iaculis. Lorem ipsum dolor sit amet, consectetur. Sodales eget convallis sem iaculis. Sodales eget convallis sem iaculis."})]})})]}),a.jsxs("div",{className:"step-row even-step",children:[a.jsxs("div",{className:"step-number-outline",children:[a.jsx("span",{children:"STEP"}),a.jsx("span",{className:"step-num",children:"04"})]}),a.jsx("div",{className:"step-content-box",children:a.jsxs("div",{className:"step-content-inner",children:[a.jsx("h3",{className:"step-title",children:"Process to join our Team"}),a.jsx("p",{className:"step-desc",children:"Lorem ipsum dolor sit amet, consectetur. Sodales eget convallis sem iaculis. Lorem ipsum dolor sit amet, consectetur. Sodales eget convallis sem iaculis. Lorem ipsum dolor sit amet, consectetur. Sodales eget convallis sem iaculis. Sodales eget convallis sem iaculis."})]})})]}),a.jsxs("div",{className:"step-row odd-step",children:[a.jsxs("div",{className:"step-number-outline",children:[a.jsx("span",{children:"STEP"}),a.jsx("span",{className:"step-num",children:"05"})]}),a.jsx("div",{className:"step-content-box",children:a.jsxs("div",{className:"step-content-inner",children:[a.jsx("h3",{className:"step-title",children:"Process to join our Team"}),a.jsx("p",{className:"step-desc",children:"Lorem ipsum dolor sit amet, consectetur. Sodales eget convallis sem iaculis. Lorem ipsum dolor sit amet, consectetur. Sodales eget convallis sem iaculis. Lorem ipsum dolor sit amet, consectetur. Sodales eget convallis sem iaculis. Sodales eget convallis sem iaculis."})]})})]})]})]})}),a.jsx("section",{className:"offers-section",children:a.jsxs("div",{className:"container",children:[a.jsxs("div",{className:"section-title-tag",children:[a.jsx("span",{className:"tag-orange-line"}),a.jsx("span",{className:"tag-text",children:"What do we Offer"})]}),a.jsx("div",{className:"offers-header-desc",children:a.jsx("p",{className:"offers-subtitle-text",children:"Lorem ipsum dolor sit amet, consectetur. Sodales eget convallis sem iaculis. Lorem ipsum dolor sit amet, consectetur. Sodales eget convallis sem iaculis."})}),a.jsxs("div",{className:"offers-grid",children:[a.jsxs(B,{to:"/jobs?job_type=Internship",className:"offer-card",children:[a.jsxs("div",{children:[a.jsx("h3",{className:"offer-card-title",children:"Internship"}),a.jsx("p",{className:"offer-card-desc",children:"Lorem ipsum dolor sit amet, consectetur. Sodales eget convallis sem iaculis. Lorem ipsum dolor sit amet, consectetur."})]}),a.jsx("span",{className:"btn-offer-apply",children:"Apply"})]}),a.jsxs(B,{to:"/jobs?experience=0-2+Years",className:"offer-card",children:[a.jsxs("div",{children:[a.jsx("h3",{className:"offer-card-title",children:"Entry Level"}),a.jsx("p",{className:"offer-card-desc",children:"Lorem ipsum dolor sit amet, consectetur. Sodales eget convallis sem iaculis. Lorem ipsum dolor sit amet, consectetur."})]}),a.jsx("span",{className:"btn-offer-apply",children:"Apply"})]}),a.jsxs(B,{to:"/jobs?experience=3-5+Years,5-8+Years,8%2B+Years",className:"offer-card",children:[a.jsxs("div",{children:[a.jsx("h3",{className:"offer-card-title",children:"Experienced Level"}),a.jsx("p",{className:"offer-card-desc",children:"Lorem ipsum dolor sit amet, consectetur. Sodales eget convallis sem iaculis. Lorem ipsum dolor sit amet, consectetur."})]}),a.jsx("span",{className:"btn-offer-apply",children:"Apply"})]})]})]})}),a.jsx("section",{className:"featured-jobs-section-redesign",children:a.jsxs("div",{className:"container",children:[a.jsxs("div",{className:"section-title-tag",children:[a.jsx("span",{className:"tag-orange-line"}),a.jsx("span",{className:"tag-text",children:"Featured Positions"})]}),a.jsxs("div",{className:"catalog-header-layout",children:[a.jsxs("div",{children:[a.jsx("h2",{className:"catalog-main-title",children:"Featured Career Paths"}),a.jsx("p",{className:"catalog-subtitle",children:"Connect directly with active hiring managers and apply instantly"})]}),a.jsxs(B,{to:"/jobs",className:"btn-view-all-jobs",children:["Browse All Jobs ",a.jsx(Hl,{size:16})]})]}),a.jsxs("form",{onSubmit:u,className:"interactive-search-deck",children:[a.jsxs("div",{className:"search-deck-input",children:[a.jsx(Rs,{size:18,className:"deck-icon"}),a.jsx("input",{type:"text",placeholder:"Job title, technical skills, or keyword",value:i,onChange:h=>l(h.target.value)})]}),a.jsx("div",{className:"deck-line"}),a.jsxs("div",{className:"search-deck-input",children:[a.jsx(zs,{size:18,className:"deck-icon"}),a.jsx("input",{type:"text",placeholder:"City, State, or 'Remote'",value:c,onChange:h=>d(h.target.value)})]}),a.jsx("button",{type:"submit",className:"btn-search-deck-submit",children:"Search Openings"})]}),a.jsx("div",{className:"jobs-catalog-grid",children:s?Array(6).fill(0).map((h,y)=>a.jsx(Xf,{},y)):r.length>0?r.map(h=>a.jsxs("article",{className:"catalog-job-card",children:[a.jsxs("div",{className:"catalog-card-header",children:[a.jsx("img",{src:w(h.company_logo),alt:`${h.company_name} logo`,className:"catalog-company-logo",onError:y=>{y.target.src=`https://ui-avatars.com/api/?name=${encodeURIComponent(h.company_name)}&background=fff0e6&color=ff5100&bold=true`}}),a.jsxs("div",{className:"catalog-company-info",children:[a.jsx("h4",{className:"catalog-company-name",children:h.company_name}),a.jsx("h3",{className:"catalog-job-title",children:h.title})]})]}),a.jsxs("div",{className:"catalog-job-meta",children:[a.jsx("span",{className:"badge-type",children:h.job_type}),a.jsxs("span",{className:"badge-meta",children:[a.jsx(zs,{size:12})," ",h.location]}),a.jsxs("span",{className:"badge-meta",children:[a.jsx(zt,{size:12})," ",h.experience]})]}),a.jsx("p",{className:"catalog-job-desc",children:h.description?h.description.substring(0,120)+"...":""}),a.jsxs("div",{className:"catalog-card-footer",children:[a.jsxs("div",{className:"catalog-salary",children:[a.jsx("span",{className:"salary-lbl",children:"Compensation"}),a.jsx("span",{className:"salary-val",children:f(h.salary_min,h.salary_max)})]}),a.jsxs("div",{className:"catalog-actions",children:[a.jsxs("span",{className:"posted-time text-xs",children:[a.jsx(Vl,{size:12})," ",g(h.created_at)]}),a.jsx(B,{to:`/jobs/${h.id}`,className:"btn-catalog-apply",children:"Apply Now"})]})]})]},h.id)):a.jsx("div",{className:"empty-catalog-state",children:a.jsx("p",{children:"No featured jobs match your criteria. Explore our full catalog!"})})})]})}),a.jsx("section",{className:"fraud-alerts-section",children:a.jsxs("div",{className:"container",children:[a.jsxs("div",{className:"section-title-tag",children:[a.jsx("span",{className:"tag-orange-line"}),a.jsx("span",{className:"tag-text",children:"Fraud Alerts"})]}),a.jsxs("div",{className:"fraud-grid",children:[a.jsx("div",{className:"fraud-image-wrapper",children:a.jsx("img",{src:"/farud.png",alt:"Fraud magnifying security glass",className:"fraud-img"})}),a.jsxs("div",{className:"fraud-content",children:[a.jsx("h3",{className:"fraud-main-headline",children:"Lorem ipsum dolor sit amet consectetur. Sodales eget convallis sem iaculis."}),a.jsxs("ul",{className:"fraud-check-list",children:[a.jsxs("li",{children:[a.jsx(Ct,{size:16,className:"bullet-check-icon"}),a.jsx("span",{children:"Sodales eget convallis sem iaculis dolor sit amet."})]}),a.jsxs("li",{children:[a.jsx(Ct,{size:16,className:"bullet-check-icon"}),a.jsx("span",{children:"Sodales eget convallis sem iaculis dolor sit amet."})]}),a.jsxs("li",{children:[a.jsx(Ct,{size:16,className:"bullet-check-icon"}),a.jsx("span",{children:"Sodales eget convallis sem iaculis dolor sit amet."})]})]})]})]})]})}),a.jsx("style",{children:`
        .home-page-redesign {
          background-color: #ffffff;
          color: #333333;
          font-family: 'Inter', sans-serif;
          overflow-x: hidden;
        }

        /* 1. Hero concrete stairs styling */
        .hero-section {
          position: relative;
          padding: 120px 0 160px 0;
          min-height: 560px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-bottom: 2px solid #000000;
        }

        .hero-bg-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
          z-index: 0;
        }

        .hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          filter: blur(3px);
          transform: scale(1.03);
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(255, 255, 255, 0.22);
          z-index: 1;
        }

        .hero-inner {
          position: relative;
          z-index: 2;
          width: 100%;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 40px;
        }

        .hero-text-block {
          background-color: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 50px 40px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.6);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
          text-align: left;
          animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .hero-title {
          font-size: 56px;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 20px;
          font-family: 'Outfit', sans-serif;
          line-height: 1.1;
          letter-spacing: -1px;
        }

        .hero-desc {
          font-size: 16px;
          line-height: 1.6;
          color: #475569;
          margin-bottom: 32px;
        }

        .hero-buttons-row {
          display: flex;
          gap: 16px;
          align-items: center;
        }

        .btn-explore-jobs {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background-color: #ff5100;
          color: #ffffff;
          font-weight: 700;
          font-size: 15px;
          padding: 14px 36px;
          border-radius: 8px;
          transition: background-color var(--transition-fast), transform var(--transition-fast), box-shadow var(--transition-fast);
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 14px rgba(255, 81, 0, 0.3);
          text-decoration: none;
        }

        .btn-explore-jobs:hover {
          background-color: #cc4100;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 81, 0, 0.4);
        }

        .btn-outlined-jobs {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background-color: transparent;
          color: #333333;
          font-weight: 700;
          font-size: 15px;
          padding: 14px 36px;
          border-radius: 8px;
          transition: all var(--transition-fast);
          cursor: pointer;
          border: 2px solid #ff5100;
          text-decoration: none;
        }

        .btn-outlined-jobs:hover {
          background-color: rgba(255, 81, 0, 0.08);
          color: #ff5100;
          transform: translateY(-2px);
        }

        /* Floating Overlapping Stats Capsule */
        .hero-stats-capsule-container {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translate(-50%, 50%);
          width: 100%;
          max-width: var(--container-max);
          padding: 0 20px;
          z-index: 10;
        }

        .hero-stats-capsule {
          display: flex;
          align-items: center;
          background-color: #0a0a0a;
          color: #ffffff;
          padding: 24px 50px;
          border-radius: 80px;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.3);
          border: 3px solid #ff5100;
          text-align: left;
          animation: slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s backwards;
        }

        .capsule-left {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          min-width: 150px;
          line-height: 1;
        }

        .capsule-number {
          font-size: 56px;
          font-weight: 800;
          color: #ffffff;
          font-family: 'Outfit', sans-serif;
          letter-spacing: -1px;
        }

        .capsule-label {
          font-size: 12px;
          font-weight: 800;
          color: #ff5100;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-top: 6px;
          font-family: 'Inter', sans-serif;
        }

        .capsule-divider {
          width: 3px;
          height: 60px;
          background-color: #ff5100;
          margin: 0 40px;
          border-radius: 4px;
        }

        .capsule-right {
          flex-grow: 1;
        }

        .capsule-text {
          font-size: 14px;
          line-height: 1.65;
          color: #dddddd;
          margin: 0;
        }

        /* Section indicator tags styling */
        .section-title-tag {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 40px;
        }

        .tag-orange-line {
          width: 6px;
          height: 24px;
          background-color: #ff5100;
          border-radius: 4px;
          display: inline-block;
        }

        .tag-text {
          font-size: 24px;
          font-weight: 700;
          color: #000000;
          font-family: 'Outfit', sans-serif;
        }

        /* 2. About Us Section */
        .about-us-section {
          padding: 160px 0 100px 0;
          background-color: #ffffff;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 60px;
          align-items: stretch;
        }

        .about-image-wrapper {
          position: relative;
          height: 100%;
        }

        .about-team-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 12px;
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.08);
          border: 1px solid #eaeaea;
        }

        .about-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: left;
        }

        .about-tagline {
          font-size: 16px;
          line-height: 1.7;
          color: #333333;
          font-weight: 500;
          margin-bottom: 32px;
        }

        .orange-highlight {
          color: #ff5100;
          font-weight: 700;
        }

        /* 3. Hiring Process Section */
        .hiring-process-section {
          padding: 80px 0 100px 0;
          background-color: #ffffff;
        }

        .process-header {
          text-align: center;
          max-width: 760px;
          margin: 0 auto 60px auto;
        }

        .process-main-title {
          font-size: 40px;
          font-weight: 800;
          color: #000000;
          font-family: 'Outfit', sans-serif;
          margin-bottom: 16px;
        }

        .process-subtitle {
          font-size: 15px;
          color: #666666;
          line-height: 1.6;
        }

        /* Slanted step rows */
        .steps-stack {
          display: flex;
          flex-direction: column;
          gap: 40px;
          max-width: 900px;
          margin: 0 auto;
        }

        .step-row {
          display: flex;
          align-items: center;
          gap: 40px;
          width: 100%;
        }

        .odd-step {
          flex-direction: row;
        }

        .even-step {
          flex-direction: row-reverse;
        }

        /* Hollow Outline text step labels */
        .step-number-outline {
          display: flex;
          flex-direction: column;
          align-items: center;
          line-height: 0.9;
          font-family: 'Outfit', sans-serif;
          font-weight: 900;
          font-size: 48px;
          color: transparent;
          -webkit-text-stroke: 2px #ff5100;
          min-width: 150px;
        }

        .step-number-outline .step-num {
          font-size: 72px;
          letter-spacing: -2px;
        }

        /* Slanted content peach background card */
        .step-content-box {
          flex-grow: 1;
          background-color: #ffebe0;
          padding: 32px 48px;
          border-radius: 8px;
          transform: skewX(-12deg);
          box-shadow: 0 4px 15px rgba(255, 81, 0, 0.05);
          border: 1px solid #ffd5be;
          text-align: left;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease, background-color 0.3s ease;
        }

        .step-row:hover .step-content-box {
          transform: skewX(-12deg) translateY(-5px);
          background-color: #ffd5be;
          box-shadow: 0 10px 25px rgba(255, 81, 0, 0.12);
        }

        .step-content-inner {
          transform: skewX(12deg);
        }

        .step-title {
          font-size: 20px;
          font-weight: 700;
          color: #000000;
          margin-bottom: 12px;
          font-family: 'Outfit', sans-serif;
        }

        .step-desc {
          font-size: 14px;
          line-height: 1.6;
          color: #444444;
          margin: 0;
        }

        /* 4. What do we Offer Section */
        .offers-section {
          padding: 80px 0 100px 0;
          background-color: #ffffff;
        }

        .offers-header-desc {
          text-align: center;
          margin-bottom: 48px;
        }

        .offers-subtitle-text {
          font-size: 15px;
          color: #666666;
          max-width: 760px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .offers-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }

        .offer-card {
          background-color: #0e0e0e;
          color: #ffffff;
          padding: 40px 32px;
          border-radius: 12px;
          text-align: left;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 250px;
          border: 1px solid #222222;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), border-color var(--transition-fast), box-shadow 0.3s ease;
          text-decoration: none;
        }

        .offer-card:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: #ff5100;
          box-shadow: 0 12px 24px rgba(255, 81, 0, 0.15);
        }

        .offer-card-title {
          font-size: 22px;
          font-weight: 700;
          font-family: 'Outfit', sans-serif;
          color: #ffffff;
          margin-bottom: 12px;
        }

        .offer-card-desc {
          font-size: 14px;
          color: #b3b3b3;
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .btn-offer-apply {
          background-color: #ff5100;
          color: #ffffff;
          font-weight: 700;
          font-size: 14px;
          padding: 10px 24px;
          border-radius: 4px;
          text-align: center;
          display: inline-block;
          transition: background-color var(--transition-fast);
          cursor: pointer;
        }

        .btn-offer-apply:hover {
          background-color: #cc4100;
        }

        /* 5. Featured Positions Redesign Section */
        .featured-jobs-section-redesign {
          padding: 100px 0;
          background-color: #fcfcfc;
          border-top: 1px solid #eaeaea;
          border-bottom: 1px solid #eaeaea;
        }

        .catalog-header-layout {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 40px;
          text-align: left;
        }

        .catalog-main-title {
          font-size: 36px;
          font-weight: 800;
          color: #000000;
          font-family: 'Outfit', sans-serif;
        }

        .catalog-subtitle {
          font-size: 15px;
          color: #666666;
          margin-top: 4px;
        }

        .btn-view-all-jobs {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #ff5100;
          font-weight: 700;
          font-size: 15px;
        }

        .btn-view-all-jobs:hover {
          color: #cc4100;
        }

        /* Interactive search bar card */
        .interactive-search-deck {
          display: flex;
          align-items: center;
          background-color: #ffffff;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #dddddd;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
          margin-bottom: 48px;
          width: 100%;
        }

        .interactive-search-deck:hover {
          border-color: #ffd5be;
          box-shadow: 0 4px 20px rgba(255, 81, 0, 0.08);
        }

        .search-deck-input {
          display: flex;
          align-items: center;
          flex-grow: 1;
          padding: 0 16px;
          gap: 12px;
        }

        .deck-icon {
          color: #888888;
        }

        .search-deck-input input {
          width: 100%;
          border: none;
          outline: none;
          color: #000000;
          font-size: 15px;
          background: transparent;
        }

        .deck-line {
          width: 1px;
          height: 36px;
          background-color: #dddddd;
        }

        .btn-search-deck-submit {
          background-color: #ff5100;
          color: #ffffff;
          border: none;
          font-weight: 700;
          padding: 12px 28px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
        }

        .btn-search-deck-submit:hover {
          background-color: #cc4100;
        }

        /* Jobs list grid */
        .jobs-catalog-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 28px;
        }

        .catalog-job-card {
          background-color: #ffffff;
          padding: 28px;
          border-radius: 8px;
          border: 1px solid #eaeaea;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
          display: flex;
          flex-direction: column;
          gap: 16px;
          text-align: left;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), border-color var(--transition-fast), box-shadow 0.3s ease;
        }

        .catalog-job-card:hover {
          transform: translateY(-6px) scale(1.01);
          border-color: #ffd5be;
          box-shadow: 0 12px 28px rgba(255, 81, 0, 0.08);
        }

        .catalog-card-header {
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }

        .catalog-company-logo {
          width: 48px;
          height: 48px;
          object-fit: contain;
          border-radius: 6px;
          border: 1px solid #e0e0e0;
          background-color: #ffffff;
        }

        .catalog-company-info {
          flex-grow: 1;
        }

        .catalog-company-name {
          font-size: 12px;
          font-weight: 700;
          color: #ff5100;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .catalog-job-title {
          font-size: 18px;
          font-weight: 700;
          color: #000000;
          margin-top: 2px;
        }

        .catalog-job-meta {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .badge-type {
          background-color: #ffebe0;
          color: #ff5100;
          padding: 4px 12px;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 700;
        }

        .badge-meta {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          color: #666666;
          font-weight: 500;
        }

        .catalog-job-desc {
          font-size: 13px;
          color: #666666;
          line-height: 1.5;
        }

        .catalog-card-footer {
          margin-top: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 16px;
          border-top: 1px dashed #eaeaea;
        }

        .catalog-salary {
          display: flex;
          flex-direction: column;
        }

        .salary-lbl {
          font-size: 10px;
          font-weight: 700;
          color: #888888;
          text-transform: uppercase;
        }

        .salary-val {
          font-size: 14px;
          font-weight: 700;
          color: #2e7d32;
        }

        .catalog-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .posted-time {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          color: #888888;
        }

        .btn-catalog-apply {
          background-color: #ff5100;
          color: #ffffff;
          padding: 8px 16px;
          font-size: 12px;
          font-weight: 700;
          border-radius: 4px;
          transition: background-color var(--transition-fast);
        }

        .btn-catalog-apply:hover {
          background-color: #cc4100;
        }

        .empty-catalog-state {
          grid-column: span 2;
          padding: 48px;
          text-align: center;
          border: 1px dashed #cccccc;
          border-radius: 8px;
          color: #666666;
        }

        /* 6. Fraud Alerts Section */
        .fraud-alerts-section {
          padding: 100px 0;
          background-color: #ffffff;
        }

        .fraud-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 60px;
          align-items: center;
        }

        .fraud-image-wrapper {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .fraud-img {
          width: 100%;
          max-width: 320px;
          height: auto;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          border: 1px solid #eaeaea;
        }

        .fraud-content {
          text-align: left;
        }

        .fraud-main-headline {
          font-size: 26px;
          font-weight: 800;
          color: #000000;
          margin-bottom: 24px;
          line-height: 1.3;
          font-family: 'Outfit', sans-serif;
        }

        .fraud-check-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .fraud-check-list li {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 15px;
          color: #444444;
          font-weight: 500;
        }

        .bullet-check-icon {
          color: #ff5100;
          flex-shrink: 0;
        }

        /* Responsive Breakpoints */
        @media (max-width: 992px) {
          .hero-grid {
            grid-template-columns: 1fr;
          }
          .hero-spacer {
            display: none;
          }
          .hero-stats-capsule {
            flex-direction: column;
            border-radius: 20px;
            padding: 24px;
            gap: 16px;
          }
          .capsule-divider {
            width: 100%;
            height: 1px;
            margin: 8px 0;
          }
          .hero-stats-capsule-container {
            position: relative;
            transform: none;
            left: 0;
            padding: 20px;
            margin-top: 40px;
          }
          .hero-section {
            padding-bottom: 40px;
          }
          .about-grid, .fraud-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .offers-grid {
            grid-template-columns: 1fr;
          }
          .jobs-catalog-grid {
            grid-template-columns: 1fr;
          }
          .empty-catalog-state {
            grid-column: span 1;
          }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 38px;
          }
          .process-main-title {
            font-size: 30px;
          }
          .step-row {
            flex-direction: column !important;
            gap: 20px;
          }
          .step-content-box {
            transform: none;
            width: 100%;
          }
          .step-content-inner {
            transform: none;
          }
          .step-number-outline {
            min-width: unset;
          }
          .interactive-search-deck {
            flex-direction: column;
            gap: 12px;
            padding: 16px;
          }
          .deck-line {
            display: none;
          }
          .search-deck-input {
            width: 100%;
            padding: 0;
          }
          .btn-search-deck-submit {
            width: 100%;
          }
          .catalog-header-layout {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
          .btn-view-all-jobs {
            width: 100%;
          }
        }
      `})]})},ey=()=>{const{jobs:e,skills:t,loading:r,pagination:n,filters:s,fetchJobs:o,updateFilters:i,resetFilters:l,savedJobIds:c,toggleSaveJob:d}=ya(),u=lt(),f=Ze(),[g]=$l(),w=(v,N)=>{N.preventDefault(),N.stopPropagation(),d(v,u,f)};b.useEffect(()=>{const v=g.get("job_type"),N=g.get("experience"),C=g.get("location"),_=g.get("search"),R={};let D=!1;v!==null&&(R.job_type=v?v.split(","):[],D=!0),N!==null&&(R.experience=N?N.split(","):[],D=!0),C!==null&&(R.location=C?C.split(","):[],D=!0),_!==null&&(R.search=_||"",D=!0),D?i(R):l()},[]),b.useEffect(()=>{o(1)},[s.search,s.job_type,s.location,s.experience,s.skills,s.salary_min,s.salary_max,s.sort,o]);const h=v=>{v<1||v>n.totalPages||o(v)},y=(v,N)=>{const C=[...s[v]],_=C.indexOf(N);_===-1?C.push(N):C.splice(_,1),i({[v]:C})},j=(v,N)=>{s.salary_min===v&&s.salary_max===N?i({salary_min:"",salary_max:""}):i({salary_min:v,salary_max:N})},p=["Bangalore","Mumbai","Delhi NCR","Pune","Remote"],m=["0-2 Years","3-5 Years","5-8 Years","8+ Years"],x=["Full Time","Part Time","Internship","Contract","Remote"];return a.jsxs("main",{className:"job-listing-page animate-fade",children:[a.jsxs("div",{className:"container listing-container",children:[a.jsxs("section",{className:"listing-search-hero glass-card",children:[a.jsx(Rs,{className:"hero-search-icon",size:20}),a.jsx("input",{type:"text",placeholder:"Search by job title, description, or company name...",className:"hero-search-input",value:s.search,onChange:v=>i({search:v.target.value})}),(s.search||s.job_type.length||s.location.length||s.experience.length||s.skills.length||s.salary_min)&&a.jsxs("button",{onClick:l,className:"btn-reset-filters-link",title:"Reset All Filters",children:[a.jsx(Qg,{size:16}),a.jsx("span",{children:"Reset"})]})]}),a.jsxs("div",{className:"listing-layout-grid",children:[a.jsxs("aside",{className:"filters-sidebar glass-card",children:[a.jsxs("div",{className:"sidebar-header",children:[a.jsxs("div",{className:"sidebar-title-row",children:[a.jsx(Xg,{size:18}),a.jsx("h3",{children:"Filters"})]}),a.jsx("button",{onClick:l,className:"btn-reset-text",children:"Clear All"})]}),a.jsxs("div",{className:"filter-section",children:[a.jsx("h4",{className:"filter-title",children:"Job Type"}),a.jsx("div",{className:"filter-options",children:x.map(v=>a.jsxs("label",{className:"checkbox-label",children:[a.jsx("input",{type:"checkbox",checked:s.job_type.includes(v),onChange:()=>y("job_type",v)}),a.jsx("span",{children:v})]},v))})]}),a.jsxs("div",{className:"filter-section",children:[a.jsx("h4",{className:"filter-title",children:"Salary Range"}),a.jsx("div",{className:"filter-options",children:[{label:"₹10,000 - ₹30,000",min:"10000",max:"30000"},{label:"₹30,000 - ₹60,000",min:"30000",max:"60000"},{label:"₹60,000 - ₹90,000",min:"60000",max:"90000"},{label:"₹90,000 - ₹120,000",min:"90000",max:"120000"}].map(v=>a.jsxs("label",{className:"radio-label",children:[a.jsx("input",{type:"checkbox",checked:s.salary_min===v.min&&s.salary_max===v.max,onChange:()=>j(v.min,v.max)}),a.jsx("span",{children:v.label})]},v.label))})]}),a.jsxs("div",{className:"filter-section",children:[a.jsx("h4",{className:"filter-title",children:"Location"}),a.jsx("div",{className:"filter-options",children:p.map(v=>a.jsxs("label",{className:"checkbox-label",children:[a.jsx("input",{type:"checkbox",checked:s.location.includes(v),onChange:()=>y("location",v)}),a.jsx("span",{children:v})]},v))})]}),a.jsxs("div",{className:"filter-section",children:[a.jsx("h4",{className:"filter-title",children:"Experience"}),a.jsx("div",{className:"filter-options",children:m.map(v=>a.jsxs("label",{className:"checkbox-label",children:[a.jsx("input",{type:"checkbox",checked:s.experience.includes(v),onChange:()=>y("experience",v)}),a.jsx("span",{children:v})]},v))})]}),a.jsxs("div",{className:"filter-section",style:{borderBottom:"none"},children:[a.jsx("h4",{className:"filter-title",children:"Skills"}),a.jsx("div",{className:"skills-badge-selector",children:t.map(v=>{const N=s.skills.includes(v.id);return a.jsx("button",{onClick:()=>y("skills",v.id),className:`skill-select-badge ${N?"skill-badge-active":""}`,children:v.name},v.id)})})]})]}),a.jsxs("section",{className:"catalog-main",children:[a.jsxs("header",{className:"catalog-header glass-card",children:[a.jsxs("div",{className:"catalog-count",children:[a.jsx("span",{children:"We found "}),a.jsx("strong",{children:n.total}),a.jsx("span",{children:" jobs match your skills"})]}),a.jsxs("div",{className:"sorting-group",children:[a.jsx("span",{className:"sort-label",children:"Sort by:"}),a.jsxs("select",{value:s.sort,onChange:v=>i({sort:v.target.value}),className:"sort-select",children:[a.jsx("option",{value:"latest",children:"Latest Posted"}),a.jsx("option",{value:"oldest",children:"Oldest Posted"}),a.jsx("option",{value:"salary_desc",children:"Salary: High to Low"}),a.jsx("option",{value:"salary_asc",children:"Salary: Low to High"})]})]})]}),a.jsx("div",{className:"jobs-list-grid",children:r?Array(n.limit).fill(0).map((v,N)=>a.jsx(Xf,{},N)):e.length>0?e.map(v=>a.jsxs("article",{className:"job-card",children:[a.jsxs("div",{className:"job-card-header",children:[a.jsxs("div",{className:"job-card-header-left",children:[a.jsx("h3",{className:"job-card-title",children:v.title}),a.jsx("span",{className:"job-company-name",children:v.company_name})]}),a.jsxs("button",{onClick:N=>w(v.id,N),className:"btn-save-job",children:[a.jsx(Bn,{size:18,fill:c.includes(Number(v.id))?"#ffaa00":"none",stroke:"#ffaa00"}),a.jsx("span",{children:c.includes(Number(v.id))?"Saved":"Save"})]})]}),a.jsxs("div",{className:"job-card-body",children:[a.jsxs("div",{className:"job-info-item",children:[a.jsx("strong",{children:"Location:"})," ",a.jsx("span",{children:v.location})]}),a.jsxs("div",{className:"job-info-item",children:[a.jsx("strong",{children:"Job Type:"})," ",a.jsx("span",{children:v.job_type})]}),a.jsxs("div",{className:"job-info-item",children:[a.jsx("strong",{children:"Experience:"})," ",a.jsx("span",{children:v.experience})]}),a.jsx("div",{className:"job-card-actions",children:a.jsx(B,{to:`/jobs/${v.id}`,className:"btn-apply-card",children:"Apply"})})]})]},v.id)):a.jsxs("div",{className:"empty-catalog-state glass-card",children:[a.jsx(jf,{size:48,className:"empty-icon animate-pulse"}),a.jsx("h3",{children:"No Jobs Found"}),a.jsx("p",{children:"We couldn't find any jobs matching your active search filters. Try adjusting your skills or salary ranges."}),a.jsx("button",{onClick:l,className:"btn btn-primary",children:"Reset Search Filters"})]})}),n.totalPages>1&&a.jsxs("div",{className:"pagination-bar glass-card",children:[a.jsxs("button",{className:"pagination-btn",onClick:()=>h(n.page-1),disabled:n.page===1,"aria-label":"Previous Page",children:[a.jsx(Qs,{size:16}),a.jsx("span",{children:"Prev"})]}),a.jsx("div",{className:"pagination-pages",children:Array.from({length:n.totalPages},(v,N)=>N+1).map(v=>a.jsx("button",{className:`page-number-btn ${n.page===v?"active-page-btn":""}`,onClick:()=>h(v),children:v},v))}),a.jsxs("button",{className:"pagination-btn",onClick:()=>h(n.page+1),disabled:n.page===n.totalPages,"aria-label":"Next Page",children:[a.jsx("span",{children:"Next"}),a.jsx(Hl,{size:16})]})]})]})]})]}),a.jsx("style",{children:`
        .job-listing-page {
          background-color: var(--bg-primary);
          padding: 40px 0 80px 0;
        }

        .listing-container {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        /* Hero Search */
        .listing-search-hero {
          display: flex;
          align-items: center;
          padding: 16px 24px;
          background-color: var(--bg-secondary);
          gap: 16px;
        }

        .listing-search-hero:hover {
          transform: none;
          box-shadow: var(--shadow-md);
        }

        .hero-search-icon {
          color: var(--text-tertiary);
          flex-shrink: 0;
        }

        .hero-search-input {
          width: 100%;
          font-size: 16px;
          color: var(--text-primary);
        }

        .btn-reset-filters-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          font-weight: 600;
          color: var(--text-secondary);
          transition: color var(--transition-fast);
        }

        .btn-reset-filters-link:hover {
          color: var(--primary);
        }

        /* Layout Grid */
        .listing-layout-grid {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 28px;
          align-items: start;
        }

        /* Sidebar Filters */
        .filters-sidebar {
          padding: 24px;
          background-color: var(--bg-secondary);
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .filters-sidebar:hover {
          transform: none;
          box-shadow: var(--shadow-md);
        }

        .sidebar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-color);
        }

        .sidebar-title-row {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-display);
          font-weight: 700;
          color: var(--text-primary);
        }

        .sidebar-title-row h3 {
          font-size: 17px;
        }

        .btn-reset-text {
          font-size: 13px;
          font-weight: 600;
          color: var(--primary);
        }

        .filter-section {
          padding-bottom: 20px;
          border-bottom: 1px solid var(--border-color);
        }

        .filter-title {
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .filter-options {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .checkbox-label, .radio-label {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          color: var(--text-secondary);
          cursor: pointer;
        }

        .checkbox-label input, .radio-label input {
          width: 16px;
          height: 16px;
          border: 1px solid var(--border-color);
          border-radius: 4px;
          cursor: pointer;
        }

        .skills-badge-selector {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .skill-select-badge {
          padding: 6px 12px;
          background-color: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          font-size: 12px;
          font-weight: 600;
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
        }

        .skill-select-badge:hover {
          background-color: var(--bg-primary);
          border-color: var(--border-hover);
          color: var(--text-primary);
        }

        .skill-badge-active {
          background-color: var(--primary-glow) !important;
          border-color: var(--primary) !important;
          color: var(--primary) !important;
        }

        /* Catalog Main */
        .catalog-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 24px;
          background-color: var(--bg-secondary);
          margin-bottom: 20px;
        }

        .catalog-header:hover {
          transform: none;
          box-shadow: var(--shadow-md);
        }

        .catalog-count {
          font-size: 15px;
          color: var(--text-secondary);
        }

        .sorting-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .sort-label {
          font-size: 14px;
          color: var(--text-tertiary);
        }

        .sort-select {
          padding: 8px 12px;
          border-radius: var(--radius-sm);
          background-color: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          font-size: 14px;
          color: var(--text-primary);
          cursor: pointer;
        }

        .jobs-list-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
        }

        @media (max-width: 1280px) {
          .jobs-list-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 768px) {
          .jobs-list-grid {
            grid-template-columns: 1fr;
          }
        }

        /* 2.1 Job Card Styles */
        .job-card {
          border-radius: 8px;
          overflow: hidden;
          background-color: var(--bg-secondary);
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-sm);
          transition: transform var(--transition-normal), box-shadow var(--transition-normal);
        }

        .job-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
        }

        /* 2.2 Header Layout */
        .job-card-header {
          background-color: #000000;
          color: #ffffff;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .job-card-header-left {
          display: flex;
          flex-direction: column;
          gap: 4px;
          text-align: left;
        }

        .job-card-title {
          font-size: 18px;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
          font-family: var(--font-display);
        }

        .job-company-name {
          font-size: 13px;
          color: #cbd5e1;
          font-weight: 500;
        }

        .btn-save-job {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: opacity var(--transition-fast);
        }

        .btn-save-job:hover {
          opacity: 0.8;
        }

        /* 2.3 Body Layout */
        .job-card-body {
          background-color: #ffffff;
          border-left: 2px solid #ff5100;
          border-right: 2px solid #ff5100;
          border-bottom: 2px solid #ff5100;
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
          padding: 24px 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          text-align: left;
          flex-grow: 1;
        }

        .job-info-item {
          font-size: 15px;
          color: #333333;
          display: flex;
          gap: 6px;
        }

        .job-info-item strong {
          color: #000000;
          font-weight: 700;
        }

        .job-card-actions {
          margin-top: auto;
          padding-top: 8px;
        }

        .btn-apply-card {
          display: inline-block;
          background-color: #ff5100;
          color: #ffffff;
          font-weight: 700;
          font-size: 15px;
          padding: 10px 32px;
          border-radius: 8px;
          text-align: center;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(255, 81, 0, 0.2);
          transition: background-color var(--transition-fast), transform var(--transition-fast);
        }

        .btn-apply-card:hover {
          background-color: #e04800;
          transform: translateY(-1px);
        }

        @media (max-width: 576px) {
          .job-card-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
          
          .btn-save-job {
            align-self: flex-start;
          }
        }

        .empty-catalog-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 80px 40px;
          background-color: var(--bg-secondary);
          color: var(--text-secondary);
          gap: 16px;
        }

        .empty-catalog-state:hover {
          transform: none;
        }

        .empty-icon {
          color: var(--text-tertiary);
        }

        .empty-catalog-state h3 {
          font-size: 22px;
          color: var(--text-primary);
        }

        .empty-catalog-state p {
          max-width: 440px;
          font-size: 14px;
          color: var(--text-tertiary);
          line-height: 1.5;
          margin-bottom: 8px;
        }

        /* Server-Side Pagination Bar */
        .pagination-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 24px;
          background-color: var(--bg-secondary);
          margin-top: 32px;
        }

        .pagination-bar:hover {
          transform: none;
          box-shadow: var(--shadow-md);
        }

        .pagination-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
          background-color: var(--bg-tertiary);
          color: var(--text-secondary);
          font-weight: 600;
          font-size: 14px;
          transition: all var(--transition-fast);
        }

        .pagination-btn:hover:not(:disabled) {
          border-color: var(--primary);
          color: var(--primary);
          background-color: var(--primary-glow);
        }

        .pagination-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .pagination-pages {
          display: flex;
          gap: 6px;
        }

        .page-number-btn {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          font-weight: 600;
          font-size: 14px;
          transition: all var(--transition-fast);
        }

        .page-number-btn:hover {
          border-color: var(--primary);
          color: var(--primary);
        }

        .active-page-btn {
          background-color: var(--primary) !important;
          color: #ffffff !important;
          border-color: var(--primary) !important;
          box-shadow: var(--shadow-glow);
        }

        @media (max-width: 992px) {
          .listing-layout-grid {
            grid-template-columns: 1fr;
          }
          
          .filters-sidebar {
            display: none; /* In production, we could add a toggle button, but a hidden sidebar on tablet simplifies vanilla grids */
          }
        }

        @media (max-width: 576px) {
          .catalog-header {
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
          }
          
          .sorting-group {
            width: 100%;
            justify-content: space-between;
          }
          
          .pagination-pages {
            display: none; /* simplify paging links on mobile */
          }
        }
      `})]})},ty=()=>{const{id:e}=cf(),{isAuthenticated:t}=Ht(),{showToast:r}=et(),n=lt(),s=Ze(),{savedJobIds:o,toggleSaveJob:i}=ya(),[l,c]=b.useState(null),[d,u]=b.useState(!0);b.useEffect(()=>{(async()=>{var y,j;try{const p=await $.get(`/jobs/${e}`);p.data.success&&c(p.data.data)}catch(p){r(((j=(y=p.response)==null?void 0:y.data)==null?void 0:j.message)||"Error loading job details.","error"),n("/jobs")}finally{u(!1)}})()},[e,n,r]);const f=()=>{t?n(`/jobs/${e}/apply`):(r("Please log in to submit your job application.","warning"),n("/login",{state:{from:{pathname:`/jobs/${e}/apply`}}}))},g=(h,y)=>{const j=p=>new Intl.NumberFormat("en-IN",{maximumFractionDigits:0}).format(p);return`₹${j(h)} - ₹${j(y)}`},w=h=>h?`http://localhost:5000/uploads/images/${h}`:"https://ui-avatars.com/api/?name=Company&background=f1f5f9&color=64748b&bold=true";return d?a.jsx("div",{className:"container job-details-container",style:{padding:"60px 20px"},children:a.jsx(Zv,{})}):l?a.jsxs("main",{className:"job-details-page animate-fade",children:[a.jsxs("div",{className:"container job-details-container",children:[a.jsxs("section",{className:"details-header-card glass-card",children:[a.jsxs("div",{className:"header-brand-row",children:[a.jsx("img",{src:w(l.company_logo),alt:`${l.company_name} Logo`,className:"details-company-logo",onError:h=>{h.target.src=`https://ui-avatars.com/api/?name=${encodeURIComponent(l.company_name)}&background=f1f5f9&color=64748b&bold=true`}}),a.jsxs("div",{className:"header-meta-titles",children:[a.jsx("span",{className:"details-company-name",children:l.company_name}),a.jsx("h1",{className:"details-job-title",children:l.title}),a.jsxs("div",{className:"header-quick-info",children:[a.jsxs("span",{className:"quick-badge",children:[a.jsx(zs,{size:14}),a.jsx("span",{children:l.location})]}),a.jsxs("span",{className:"quick-badge",children:[a.jsx(zt,{size:14}),a.jsx("span",{children:l.job_type})]}),a.jsxs("span",{className:"quick-badge",children:[a.jsx(Bg,{size:14}),a.jsx("span",{className:"salary-highlight",children:g(l.salary_min,l.salary_max)})]}),a.jsxs("span",{className:"quick-badge text-muted",children:[a.jsx(Vl,{size:14}),a.jsxs("span",{children:["Posted ",new Date(l.created_at).toLocaleDateString()]})]})]})]})]}),a.jsxs("div",{className:"header-cta-actions",style:{display:"flex",gap:"12px",alignItems:"center"},children:[a.jsxs("button",{onClick:()=>i(l.id,n,s),className:`btn ${o.includes(Number(l.id))?"btn-secondary":"btn-outlined"}`,style:{display:"inline-flex",alignItems:"center",gap:"8px",padding:"12px 24px",fontSize:"15px",fontWeight:"700",cursor:"pointer",border:"2px solid #ff5100",borderRadius:"8px",backgroundColor:o.includes(Number(l.id))?"rgba(255, 81, 0, 0.08)":"transparent",color:"#ff5100"},children:[a.jsx(Bn,{size:18,fill:o.includes(Number(l.id))?"#ff5100":"none",stroke:"#ff5100"}),a.jsx("span",{children:o.includes(Number(l.id))?"Saved":"Save Job"})]}),a.jsx("button",{onClick:f,className:"btn btn-primary btn-hero-apply",children:"Apply Now"})]})]}),a.jsxs("div",{className:"details-split-grid",children:[a.jsxs("section",{className:"details-main-sheet",children:[a.jsxs("article",{className:"details-section-card glass-card",children:[a.jsx("h2",{className:"section-title-label",children:"Job Overview"}),a.jsx("div",{className:"details-text-content",children:l.description?l.description.split(`
`).map((h,y)=>a.jsx("p",{className:"details-paragraph",children:h},y)):""})]}),l.skills&&l.skills.length>0&&a.jsxs("article",{className:"details-section-card glass-card",children:[a.jsx("h2",{className:"section-title-label",children:"Required Technologies"}),a.jsx("p",{className:"skills-subtitle",children:"Candidates holding matching experience in the following tags will be prioritized:"}),a.jsx("div",{className:"details-skills-badge-row",children:l.skills.map(h=>a.jsxs("span",{className:"skill-details-badge",children:[a.jsx(Kg,{size:14}),a.jsx("span",{children:h.name})]},h.id))})]}),a.jsxs("article",{className:"details-section-card glass-card",children:[a.jsx("h2",{className:"section-title-label",children:"Responsibilities"}),a.jsxs("ul",{className:"details-bullets-list",children:[a.jsx("li",{children:"Write clean, modular, and high-performance code adhering to industry standards."}),a.jsx("li",{children:"Collaborate with product designers, managers, and system architects to construct features."}),a.jsx("li",{children:"Perform automated unit tests and participate in smart code reviews."}),a.jsx("li",{children:"Deploy, secure, and maintain REST endpoints inside modern container pipelines."})]})]}),a.jsxs("article",{className:"details-section-card glass-card",children:[a.jsx("h2",{className:"section-title-label",children:"Company Perks & Benefits"}),a.jsxs("div",{className:"benefits-grid",children:[a.jsxs("div",{className:"benefit-pill",children:[a.jsx(Ct,{size:14}),a.jsx("span",{children:"Comprehensive Health Insurance"})]}),a.jsxs("div",{className:"benefit-pill",children:[a.jsx(Ct,{size:14}),a.jsx("span",{children:"Flexible WFH & Remote Hours"})]}),a.jsxs("div",{className:"benefit-pill",children:[a.jsx(Ct,{size:14}),a.jsx("span",{children:"Annual Skill & Gym Allowances"})]}),a.jsxs("div",{className:"benefit-pill",children:[a.jsx(Ct,{size:14}),a.jsx("span",{children:"Quarterly Team Retreats"})]})]})]})]}),a.jsx("aside",{className:"details-sidebar",children:a.jsxs("div",{className:"sidebar-sticky-card glass-card",children:[a.jsx("h3",{className:"sidebar-card-title",children:"Hiring Organization"}),a.jsxs("div",{className:"sidebar-company-logo-wrapper",children:[a.jsx("img",{src:w(l.company_logo),alt:`${l.company_name} Logo`,className:"sidebar-logo-img",onError:h=>{h.target.src=`https://ui-avatars.com/api/?name=${encodeURIComponent(l.company_name)}&background=f1f5f9&color=64748b&bold=true`}}),a.jsx("h4",{className:"sidebar-company-name",children:l.company_name})]}),a.jsx("p",{className:"sidebar-company-desc",children:l.company_description||"No corporate description provided."}),a.jsxs("div",{className:"sidebar-metadata-rows",children:[a.jsxs("div",{className:"meta-row",children:[a.jsx("span",{className:"meta-row-label",children:"Workplace:"}),a.jsx("span",{className:"meta-row-value",children:l.location})]}),a.jsxs("div",{className:"meta-row",children:[a.jsx("span",{className:"meta-row-label",children:"Job Category:"}),a.jsx("span",{className:"meta-row-value",children:l.job_type})]}),a.jsxs("div",{className:"meta-row",children:[a.jsx("span",{className:"meta-row-label",children:"Experience:"}),a.jsx("span",{className:"meta-row-value",children:l.experience})]})]}),l.company_website&&a.jsxs("a",{href:l.company_website,target:"_blank",rel:"noreferrer",className:"btn btn-secondary w-full sidebar-website-btn",style:{width:"100%"},children:[a.jsx("span",{children:"Visit Website"}),a.jsx(Mg,{size:14})]}),a.jsx("button",{onClick:f,className:"btn btn-primary w-full sidebar-apply-btn",style:{width:"100%",marginTop:"16px"},children:"Apply for this Position"})]})})]})]}),a.jsx("style",{children:`
        .job-details-page {
          background-color: var(--bg-primary);
          padding: 40px 0 80px 0;
        }

        .job-details-container {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        /* Header Card */
        .details-header-card {
          padding: 32px;
          background-color: var(--bg-secondary);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 24px;
        }

        .details-header-card:hover {
          transform: none;
          box-shadow: var(--shadow-lg);
        }

        .header-brand-row {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .details-company-logo {
          width: 80px;
          height: 80px;
          object-fit: contain;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          background-color: #ffffff;
          padding: 4px;
        }

        .header-meta-titles {
          display: flex;
          flex-direction: column;
        }

        .details-company-name {
          font-size: 14px;
          font-weight: 700;
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .details-job-title {
          font-size: 28px;
          font-weight: 800;
          color: var(--text-primary);
          margin-top: 4px;
        }

        .header-quick-info {
          display: flex;
          gap: 16px;
          margin-top: 12px;
          flex-wrap: wrap;
        }

        .quick-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .quick-badge svg {
          color: var(--text-tertiary);
        }

        .salary-highlight {
          color: var(--success) !important;
          font-weight: 700;
        }

        .btn-hero-apply {
          padding: 12px 32px;
          font-size: 16px;
          font-family: var(--font-display);
        }

        /* Split Grid Layout */
        .details-split-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 32px;
          align-items: start;
        }

        .details-main-sheet {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .details-section-card {
          padding: 32px;
          background-color: var(--bg-secondary);
        }

        .details-section-card:hover {
          transform: none;
          box-shadow: var(--shadow-md);
        }

        .section-title-label {
          font-size: 20px;
          font-weight: 800;
          margin-bottom: 20px;
          position: relative;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--border-color);
        }

        .details-text-content {
          font-size: 15px;
          line-height: 1.7;
          color: var(--text-secondary);
        }

        .details-paragraph {
          margin-bottom: 16px;
        }

        .details-paragraph:last-child {
          margin-bottom: 0;
        }

        .skills-subtitle {
          font-size: 14px;
          color: var(--text-tertiary);
          margin-bottom: 16px;
        }

        .details-skills-badge-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .skill-details-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: var(--radius-sm);
          font-size: 13px;
          font-weight: 600;
          background-color: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
        }

        .skill-details-badge svg {
          color: var(--primary);
        }

        .details-bullets-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
          font-size: 15px;
          color: var(--text-secondary);
        }

        .details-bullets-list li {
          position: relative;
          padding-left: 24px;
          line-height: 1.6;
        }

        .details-bullets-list li::before {
          content: '✔';
          position: absolute;
          left: 0;
          color: var(--success);
          font-weight: bold;
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .benefit-pill {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          color: var(--text-secondary);
        }

        .benefit-pill svg {
          color: var(--success);
        }

        /* Sidebar Styles */
        .sidebar-sticky-card {
          padding: 32px;
          background-color: var(--bg-secondary);
          display: flex;
          flex-direction: column;
        }

        .sidebar-sticky-card:hover {
          transform: none;
          box-shadow: var(--shadow-lg);
        }

        .sidebar-card-title {
          font-size: 18px;
          font-weight: 800;
          margin-bottom: 20px;
          color: var(--text-primary);
        }

        .sidebar-company-logo-wrapper {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 16px;
        }

        .sidebar-logo-img {
          width: 54px;
          height: 54px;
          object-fit: contain;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
          background-color: #ffffff;
        }

        .sidebar-company-name {
          font-size: 16px;
          font-weight: 700;
        }

        .sidebar-company-desc {
          font-size: 13px;
          line-height: 1.5;
          color: var(--text-tertiary);
          margin-bottom: 24px;
        }

        .sidebar-metadata-rows {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 16px 0;
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
          margin-bottom: 24px;
          font-size: 14px;
        }

        .meta-row {
          display: flex;
          justify-content: space-between;
        }

        .meta-row-label {
          color: var(--text-tertiary);
        }

        .meta-row-value {
          font-weight: 600;
          color: var(--text-primary);
        }

        .sidebar-website-btn {
          height: 42px;
        }

        @media (max-width: 992px) {
          .details-header-card {
            flex-direction: column;
            align-items: flex-start;
            padding: 24px;
          }
          
          .header-cta-actions {
            width: 100%;
          }
          
          .btn-hero-apply {
            width: 100%;
          }
          
          .details-split-grid {
            grid-template-columns: 1fr;
          }
          
          .benefits-grid {
            grid-template-columns: 1fr;
          }
        }
      `})]}):null},ry=()=>{const{id:e}=cf(),{user:t}=Ht(),{showToast:r}=et(),n=lt(),[s,o]=b.useState(null),[i,l]=b.useState(!0),[c,d]=b.useState(!1),[u,f]=b.useState(null),[g,w]=b.useState(""),[h,y]=b.useState({full_name:"",email:"",phone:"",highest_qualification:"",school_university:"",passing_year:"",current_company:"",current_salary:"",expected_salary:"",experience:"",skills:"",cover_letter:""});b.useEffect(()=>{t&&y(x=>({...x,full_name:`${t.first_name} ${t.last_name}`.trim(),email:t.email,phone:t.phone||""}))},[t]),b.useEffect(()=>{(async()=>{try{const v=await $.get(`/jobs/${e}`);v.data.success&&(o(v.data.data),v.data.data.status!=="active"&&(r("This job posting is closed.","error"),n("/jobs")))}catch{r("Error loading job info.","error"),n("/jobs")}finally{l(!1)}})()},[e,n,r]);const j=x=>{const{name:v,value:N}=x.target;y(C=>({...C,[v]:N}))},p=x=>{const v=x.target.files[0];if(!v)return;if(v.name.split(".").pop().toLowerCase()!=="pdf"||v.type!=="application/pdf"){r("Invalid file format. Resume must be a PDF file.","error"),x.target.value="";return}if(v.size>5242880){r("File size is too large. Max limit is 5MB.","error"),x.target.value="";return}f(v),w(v.name),r("PDF Resume uploaded and verified.","info")},m=async x=>{var v,N;if(x.preventDefault(),!u){r("Please upload your resume in PDF format.","warning");return}d(!0);try{const C=new FormData;C.append("job_id",e),C.append("resume",u),C.append("full_name",h.full_name),C.append("email",h.email),C.append("phone",h.phone),C.append("highest_qualification",h.highest_qualification),C.append("school_university",h.school_university),C.append("passing_year",h.passing_year),C.append("current_company",h.current_company),C.append("current_salary",h.current_salary),C.append("expected_salary",h.expected_salary),C.append("experience",h.experience),C.append("skills",h.skills),C.append("cover_letter",h.cover_letter);const _=await $.post("/applications",C,{headers:{"Content-Type":"multipart/form-data"}});_.data.success&&(r("Application Submitted Successfully!","success"),n("/success",{state:{applicationId:_.data.data.application_id,appliedJob:_.data.data.applied_job,companyName:s.company_name,submissionDate:_.data.data.submission_date}}))}catch(C){const _=((N=(v=C.response)==null?void 0:v.data)==null?void 0:N.message)||"Error submitting application.";r(_,"error")}finally{d(!1)}};return i?a.jsxs("div",{className:"application-flow-loading",children:[a.jsx("div",{className:"spinner"}),a.jsx("p",{children:"Loading application data..."}),a.jsx("style",{children:`
          .application-flow-loading {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 60vh;
            gap: 16px;
            color: var(--text-secondary);
          }
        `})]}):a.jsxs("main",{className:"application-flow-page animate-fade",children:[a.jsxs("div",{className:"container flow-container",children:[a.jsxs(B,{to:`/jobs/${e}`,className:"back-link-btn",children:[a.jsx(Qs,{size:16}),a.jsx("span",{children:"Back to Job Details"})]}),s&&a.jsxs("section",{className:"job-summary-banner glass-card",children:[a.jsx(zt,{size:24,className:"banner-icon"}),a.jsxs("div",{children:[a.jsx("span",{className:"banner-company",children:s.company_name}),a.jsxs("h2",{className:"banner-title",children:["Applying for: ",s.title]}),a.jsxs("span",{className:"banner-location",children:[s.location," • ",s.job_type]})]})]}),a.jsx("div",{className:"glass-card form-container-card",children:a.jsxs("form",{onSubmit:m,className:"application-form",children:[a.jsxs("div",{className:"form-section-block",children:[a.jsx("h3",{className:"section-block-title",children:"1. Personal Information"}),a.jsxs("div",{className:"form-grid-2",children:[a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",htmlFor:"full_name",children:"Full Name *"}),a.jsx("input",{type:"text",id:"full_name",name:"full_name",className:"form-control",value:h.full_name,onChange:j,required:!0})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",htmlFor:"email",children:"Email Address *"}),a.jsx("input",{type:"email",id:"email",name:"email",className:"form-control",value:h.email,onChange:j,required:!0})]})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",htmlFor:"phone",children:"Contact Number *"}),a.jsx("input",{type:"tel",id:"phone",name:"phone",placeholder:"+91 xxxxx xxxxx",className:"form-control",value:h.phone,onChange:j,required:!0})]})]}),a.jsxs("div",{className:"form-section-block",children:[a.jsx("h3",{className:"section-block-title",children:"2. Education Information"}),a.jsxs("div",{className:"form-grid-2",children:[a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",htmlFor:"highest_qualification",children:"Highest Qualification *"}),a.jsx("input",{type:"text",id:"highest_qualification",name:"highest_qualification",placeholder:"e.g. B.Tech / MBA / MCA",className:"form-control",value:h.highest_qualification,onChange:j,required:!0})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",htmlFor:"school_university",children:"School / University *"}),a.jsx("input",{type:"text",id:"school_university",name:"school_university",placeholder:"e.g. Stanford University",className:"form-control",value:h.school_university,onChange:j,required:!0})]})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",htmlFor:"passing_year",children:"Passing Year *"}),a.jsx("input",{type:"text",id:"passing_year",name:"passing_year",placeholder:"e.g. 2024",className:"form-control",value:h.passing_year,onChange:j,required:!0})]})]}),a.jsxs("div",{className:"form-section-block",children:[a.jsx("h3",{className:"section-block-title",children:"3. Professional Information"}),a.jsxs("div",{className:"form-grid-2",children:[a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",htmlFor:"current_company",children:"Current Company"}),a.jsx("input",{type:"text",id:"current_company",name:"current_company",placeholder:"TechSynergy Pvt Ltd",className:"form-control",value:h.current_company,onChange:j})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",htmlFor:"experience",children:"Years of Experience *"}),a.jsxs("select",{id:"experience",name:"experience",className:"form-control",value:h.experience,onChange:j,required:!0,children:[a.jsx("option",{value:"",children:"Choose experience range"}),a.jsx("option",{value:"0-2 Years",children:"0-2 Years"}),a.jsx("option",{value:"3-5 Years",children:"3-5 Years"}),a.jsx("option",{value:"5-8 Years",children:"5-8 Years"}),a.jsx("option",{value:"8+ Years",children:"8+ Years"})]})]})]}),a.jsxs("div",{className:"form-grid-2",children:[a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",htmlFor:"current_salary",children:"Current Monthly Salary (INR)"}),a.jsx("input",{type:"text",id:"current_salary",name:"current_salary",placeholder:"e.g. ₹40,000",className:"form-control",value:h.current_salary,onChange:j})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",htmlFor:"expected_salary",children:"Expected Monthly Salary (INR) *"}),a.jsx("input",{type:"text",id:"expected_salary",name:"expected_salary",placeholder:"e.g. ₹60,000",className:"form-control",value:h.expected_salary,onChange:j,required:!0})]})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",htmlFor:"skills",children:"Professional Skills (Comma Separated) *"}),a.jsx("input",{type:"text",id:"skills",name:"skills",placeholder:"React.js, Node.js, JavaScript, REST API, Git",className:"form-control",value:h.skills,onChange:j,required:!0})]})]}),a.jsxs("div",{className:"form-section-block",children:[a.jsx("h3",{className:"section-block-title",children:"4. Upload Resume (PDF Only) *"}),a.jsxs("div",{className:"file-uploader-box",children:[a.jsx("input",{type:"file",id:"resume",accept:".pdf",onChange:p,className:"file-hidden-input",required:!0}),a.jsx("label",{htmlFor:"resume",className:"uploader-label",children:g?a.jsxs("div",{className:"uploaded-file-details",children:[a.jsx(Qr,{size:40,className:"file-icon"}),a.jsx("span",{className:"file-title",children:g}),a.jsx("span",{className:"file-change-text",children:"Click to choose a different PDF file"})]}):a.jsxs("div",{className:"uploader-prompt",children:[a.jsx(Fi,{size:38,className:"upload-arrow"}),a.jsx("span",{className:"upload-main-text",children:"Upload Resume PDF"}),a.jsx("span",{className:"upload-sub-text",children:"Drag and drop or click to browse. Max size 5MB."})]})})]})]}),a.jsxs("div",{className:"form-section-block",style:{borderBottom:"none"},children:[a.jsx("h3",{className:"section-block-title",children:"5. Cover Letter"}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",htmlFor:"cover_letter",children:"Explain why you are a great fit for this role"}),a.jsx("textarea",{id:"cover_letter",name:"cover_letter",rows:6,placeholder:"Dear Hiring Manager, I am writing to express my strong interest...",className:"form-control",style:{resize:"vertical"},value:h.cover_letter,onChange:j})]})]}),a.jsxs("div",{className:"form-cta-actions",children:[a.jsx(B,{to:`/jobs/${e}`,className:"btn btn-secondary cancel-btn",children:"Cancel"}),a.jsx("button",{type:"submit",className:"btn btn-primary submit-btn",disabled:c,children:c?a.jsx("span",{className:"spinner",style:{width:"16px",height:"16px",borderWidth:"2px"}}):a.jsxs(a.Fragment,{children:[a.jsx("span",{children:"Submit Application"}),a.jsx(Jl,{size:16})]})})]})]})})]}),a.jsx("style",{children:`
        .application-flow-page {
          background-color: var(--bg-primary);
          padding: 40px 0 80px 0;
        }

        .flow-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
          max-width: 800px;
        }

        .back-link-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          font-size: 14px;
          font-weight: 600;
          transition: color var(--transition-fast);
          align-self: flex-start;
        }

        .back-link-btn:hover {
          color: var(--primary);
        }

        /* Banner summary */
        .job-summary-banner {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 24px 32px;
          background-color: var(--bg-secondary);
          text-align: left;
        }

        .job-summary-banner:hover {
          transform: none;
          box-shadow: var(--shadow-md);
        }

        .banner-icon {
          color: var(--primary);
          flex-shrink: 0;
        }

        .banner-company {
          font-size: 12px;
          font-weight: 700;
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .banner-title {
          font-size: 20px;
          font-weight: 800;
          margin-top: 2px;
        }

        .banner-location {
          font-size: 13px;
          color: var(--text-tertiary);
          display: block;
          margin-top: 4px;
        }

        /* Form Card */
        .form-container-card {
          padding: 48px;
          background-color: var(--bg-secondary);
        }

        .form-container-card:hover {
          transform: none;
          box-shadow: var(--shadow-xl);
        }

        .application-form {
          display: flex;
          flex-direction: column;
          gap: 40px;
          text-align: left;
        }

        .form-section-block {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding-bottom: 32px;
          border-bottom: 1px solid var(--border-color);
        }

        .section-block-title {
          font-size: 18px;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .form-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        /* File Upload styling */
        .file-uploader-box {
          width: 100%;
        }

        .file-hidden-input {
          display: none;
        }

        .uploader-label {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          min-height: 180px;
          border: 2px dashed var(--border-color);
          border-radius: var(--radius-md);
          background-color: var(--bg-tertiary);
          cursor: pointer;
          transition: all var(--transition-normal);
          padding: 24px;
        }

        .uploader-label:hover {
          border-color: var(--primary);
          background-color: var(--primary-glow);
        }

        .uploader-prompt {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 12px;
        }

        .upload-arrow {
          color: var(--text-tertiary);
          transition: color var(--transition-fast), transform var(--transition-normal);
        }

        .uploader-label:hover .upload-arrow {
          color: var(--primary);
          transform: translateY(-4px);
        }

        .upload-main-text {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 15px;
          color: var(--text-primary);
        }

        .upload-sub-text {
          font-size: 12px;
          color: var(--text-tertiary);
        }

        .uploaded-file-details {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          text-align: center;
        }

        .file-icon {
          color: var(--success);
          animation: bounce 1.5s infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }

        .file-title {
          font-weight: 700;
          font-size: 14px;
          color: var(--success);
        }

        .file-change-text {
          font-size: 12px;
          color: var(--text-tertiary);
          text-decoration: underline;
        }

        /* CTA buttons */
        .form-cta-actions {
          display: flex;
          justify-content: flex-end;
          gap: 16px;
          padding-top: 16px;
          border-top: 1px solid var(--border-color);
        }

        .cancel-btn {
          height: 48px;
          padding: 0 28px;
        }

        .submit-btn {
          height: 48px;
          padding: 0 32px;
          font-size: 15px;
        }

        @media (max-width: 768px) {
          .form-container-card {
            padding: 24px;
          }
          
          .form-grid-2 {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          
          .form-cta-actions {
            flex-direction: column;
            width: 100%;
          }
          
          .cancel-btn, .submit-btn {
            width: 100%;
          }
        }
      `})]})},ny=()=>{const e=Ze(),t=lt(),{applicationId:r,appliedJob:n,companyName:s,submissionDate:o}=e.state||{};return b.useEffect(()=>{r||t("/")},[r,t]),r?a.jsxs("main",{className:"success-page animate-fade",children:[a.jsxs("div",{className:"glass-card success-card",children:[a.jsxs("div",{className:"celebration-wrapper",children:[a.jsx("div",{className:"icon-pulse-glow"}),a.jsx(Ct,{size:64,className:"success-check-icon animate-bounce"})]}),a.jsx("h1",{className:"success-heading",children:"🎉 Application Submitted Successfully"}),a.jsx("p",{className:"success-subheading",children:"Congratulations! Your application has been logged and forwarded directly to the hiring manager."}),a.jsxs("div",{className:"receipt-box",children:[a.jsx("h3",{className:"receipt-title",children:"Application Receipt"}),a.jsxs("div",{className:"receipt-rows",children:[a.jsxs("div",{className:"receipt-row",children:[a.jsxs("div",{className:"receipt-label",children:[a.jsx(zt,{size:14}),a.jsx("span",{children:"Applied Job"})]}),a.jsx("div",{className:"receipt-value",children:n})]}),a.jsxs("div",{className:"receipt-row",children:[a.jsxs("div",{className:"receipt-label",children:[a.jsx(Dg,{size:14}),a.jsx("span",{children:"Company"})]}),a.jsx("div",{className:"receipt-value",children:s})]}),a.jsxs("div",{className:"receipt-row",children:[a.jsxs("div",{className:"receipt-label",children:[a.jsx(Vl,{size:14}),a.jsx("span",{children:"Submission Date"})]}),a.jsx("div",{className:"receipt-value",children:new Date(o).toLocaleDateString(void 0,{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})})]}),a.jsxs("div",{className:"receipt-row receipt-id-row",children:[a.jsx("div",{className:"receipt-label",children:a.jsx("span",{children:"Application ID"})}),a.jsxs("div",{className:"receipt-value receipt-id-highlight",children:["# ",r]})]})]})]}),a.jsxs("div",{className:"success-cta-actions",children:[a.jsxs(B,{to:"/dashboard",className:"btn btn-primary cta-btn",children:[a.jsx("span",{children:"View Applied Jobs"}),a.jsx(Hl,{size:16})]}),a.jsx(B,{to:"/",className:"btn btn-secondary cta-btn",children:"Back To Home"})]})]}),a.jsx("style",{children:`
        .success-page {
          min-height: calc(100vh - 140px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          background: radial-gradient(circle at 50% 50%, var(--bg-tertiary) 0%, var(--bg-primary) 80%);
        }

        .success-card {
          width: 100%;
          max-width: 580px;
          padding: 48px;
          background-color: var(--bg-secondary);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .success-card:hover {
          transform: none;
          box-shadow: var(--shadow-xl);
        }

        .celebration-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 90px;
          height: 90px;
          margin-bottom: 28px;
        }

        .icon-pulse-glow {
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: var(--success-glow);
          border-radius: 50%;
          animation: pulseGlow 2s infinite ease-in-out;
        }

        .success-check-icon {
          color: var(--success);
          position: relative;
          z-index: 10;
        }

        @keyframes pulseGlow {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.6); opacity: 0; }
        }

        .success-heading {
          font-size: 28px;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.25;
        }

        .success-subheading {
          font-size: 15px;
          color: var(--text-secondary);
          margin-top: 12px;
          line-height: 1.6;
          max-width: 440px;
        }

        /* Receipt Box styling */
        .receipt-box {
          width: 100%;
          background-color: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 24px;
          margin: 36px 0;
          text-align: left;
        }

        .receipt-title {
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 16px;
          padding-bottom: 8px;
          border-bottom: 1px dashed var(--border-color);
        }

        .receipt-rows {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .receipt-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
        }

        .receipt-label {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--text-tertiary);
        }

        .receipt-label svg {
          color: var(--text-tertiary);
        }

        .receipt-value {
          font-weight: 600;
          color: var(--text-primary);
          text-align: right;
          word-break: break-all;
          max-width: 60%;
        }

        .receipt-id-row {
          padding-top: 14px;
          border-top: 1px solid var(--border-color);
        }

        .receipt-id-highlight {
          color: var(--primary);
          font-family: var(--font-display);
          font-weight: 700;
        }

        /* CTA buttons */
        .success-cta-actions {
          display: flex;
          gap: 16px;
          width: 100%;
        }

        .cta-btn {
          flex: 1;
          height: 48px;
        }

        @media (max-width: 576px) {
          .success-card {
            padding: 32px 20px;
          }
          
          .success-heading {
            font-size: 22px;
          }
          
          .success-cta-actions {
            flex-direction: column;
            gap: 12px;
          }
          
          .cta-btn {
            width: 100%;
          }
        }
      `})]}):null},ay=()=>{const{user:e,updateProfileState:t}=Ht(),{showToast:r}=et(),{fetchSavedJobIds:n}=ya(),[s,o]=b.useState("applications"),[i,l]=b.useState([]),[c,d]=b.useState(!0),[u,f]=b.useState({first_name:"",last_name:"",phone:""}),[g,w]=b.useState(!1),[h,y]=b.useState(!1),[j,p]=b.useState(null),[m,x]=b.useState(!0),[v,N]=b.useState(!1),[C,_]=b.useState([]),[R,D]=b.useState(!1),[A,Q]=b.useState([]),[de,ne]=b.useState(!1),[X,ct]=b.useState(""),[Ce,we]=b.useState(""),[P,F]=b.useState(""),[O,I]=b.useState("latest"),[V,Z]=b.useState({total:0,page:1,limit:5,totalPages:1});b.useEffect(()=>{e&&f({first_name:e.first_name||"",last_name:e.last_name||"",phone:e.phone||""})},[e]);const xe=async()=>{try{const E=await $.get("/applications");E.data.success&&l(E.data.data)}catch{r("Error loading application records.","error")}finally{d(!1)}},H=async()=>{try{const E=await $.get("/profile/resume");E.data.success&&p(E.data.data)}catch(E){console.error("Failed to load profile resume:",E)}finally{x(!1)}},le=async()=>{D(!0);try{const E=await $.get("/profile/notifications");E.data.success&&_(E.data.data)}catch{r("Failed to load notifications history.","error")}finally{D(!1)}};b.useEffect(()=>{xe(),H(),le()},[]),b.useEffect(()=>{s==="notifications"&&le()},[s]);const me=async(E=1)=>{ne(!0);try{const q={page:E,limit:V.limit,sort:O};X&&(q.search=X),Ce&&(q.job_type=Ce),P&&(q.location=P);const G=await $.get("/saved-jobs",{params:q});G.data.success&&(Q(G.data.data),Z({total:G.data.pagination.total,page:G.data.pagination.page,limit:G.data.pagination.limit,totalPages:G.data.pagination.totalPages}))}catch{r("Error loading saved jobs.","error")}finally{ne(!1)}};b.useEffect(()=>{s==="saved_jobs"&&me(1)},[s,X,Ce,P,O]);const J=E=>{E<1||E>V.totalPages||me(E)},dt=async E=>{try{(await $.delete(`/saved-jobs/${E}`)).data.success&&(r("Job removed from saved list.","success"),Q(G=>G.filter(ge=>ge.id!==E)),Z(G=>{const ge=Math.max(0,G.total-1);return{...G,total:ge,totalPages:Math.ceil(ge/G.limit)}}),n())}catch{r("Failed to remove saved job.","error")}},ut=E=>{const{name:q,value:G}=E.target;f(ge=>({...ge,[q]:G}))},Rt=async E=>{var q,G;E.preventDefault(),w(!0);try{const ge=await $.put("/admin/profile",{first_name:u.first_name,last_name:u.last_name,phone:u.phone});ge.data.success&&(t(ge.data.user),r("Profile details updated successfully!","success"))}catch(ge){r(((G=(q=ge.response)==null?void 0:q.data)==null?void 0:G.message)||"Error saving profile.","error")}finally{w(!1)}},wt=async E=>{const q=E.target.files[0];if(!q)return;const G=q.name.split(".").pop().toLowerCase();if(!["jpg","jpeg","png","webp"].includes(G)){r("Invalid format. Avatar must be a JPG, PNG, or WEBP image.","error");return}if(q.size>2097152){r("File size is too large. Max limit is 2MB.","error");return}y(!0);const Vt=new FormData;Vt.append("profile_image",q);try{const Wt=await $.put("/admin/profile",Vt,{headers:{"Content-Type":"multipart/form-data"}});Wt.data.success&&(t(Wt.data.user),r("Profile photo updated successfully!","success"))}catch{r("Error uploading avatar.","error")}finally{y(!1)}},gr=async E=>{var Wt,Jt;const q=E.target.files[0];if(!q)return;const G=q.name.split(".").pop().toLowerCase();if(!["pdf","doc","docx"].includes(G)){r("Invalid format. Resume must be a PDF, DOC, or DOCX document.","error");return}if(q.size>5242880){r("File size too large. Max limit is 5MB.","error");return}N(!0);const Vt=new FormData;Vt.append("resume",q);try{const qt=await $.post("/profile/resume",Vt,{headers:{"Content-Type":"multipart/form-data"}});qt.data.success&&(p(qt.data.data),r("Resume uploaded and saved to profile successfully!","success"))}catch(qt){r(((Jt=(Wt=qt.response)==null?void 0:Wt.data)==null?void 0:Jt.message)||"Failed to upload resume document.","error")}finally{N(!1)}},Pt=async()=>{if(window.confirm("Are you sure you want to delete your profile resume?"))try{(await $.delete("/profile/resume")).data.success&&(p(null),r("Resume deleted successfully from profile.","success"))}catch{r("Failed to delete resume.","error")}},jt=async E=>{try{(await $.patch(`/profile/notifications/${E}/read`)).data.success&&_(G=>G.map(ge=>ge.id===E?{...ge,is_read:!0}:ge))}catch(q){console.error("Failed to mark notification as read:",q)}},ro=()=>e&&e.profile_image?`http://localhost:5000/uploads/images/${e.profile_image}`:`https://ui-avatars.com/api/?name=${(e==null?void 0:e.first_name)||"U"}+${(e==null?void 0:e.last_name)||"P"}&background=3b82f6&color=fff&size=150&bold=true`,ba=E=>{switch(E){case"Applied":return"status-applied";case"Under Review":return"status-review";case"Shortlisted":return"status-shortlisted";case"Interview Scheduled":return"status-interview";case"Selected":return"status-selected";case"Rejected":return"status-rejected";default:return""}},no=(E,q)=>{const G=ge=>new Intl.NumberFormat("en-IN",{maximumFractionDigits:0}).format(ge);return`₹${G(E)} - ₹${G(q)}`},wa=C.filter(E=>!E.is_read).length;return a.jsxs("main",{className:"dashboard-page animate-fade",children:[a.jsxs("div",{className:"container dashboard-container",children:[a.jsxs("section",{className:"dashboard-intro-card glass-card",children:[a.jsxs("div",{className:"avatar-uploader-section",children:[a.jsx("img",{src:ro(),alt:"User Avatar",className:"dashboard-large-avatar"}),a.jsx("input",{type:"file",id:"avatar",accept:".jpg,.jpeg,.png,.webp",onChange:wt,style:{display:"none"}}),a.jsxs("label",{htmlFor:"avatar",className:"avatar-upload-btn-label",children:[h?a.jsx("span",{className:"spinner",style:{width:"12px",height:"12px",borderWidth:"2px"}}):a.jsx(Fi,{size:12}),a.jsx("span",{children:"Change Photo"})]})]}),a.jsxs("div",{className:"dashboard-intro-titles",children:[a.jsx("span",{className:"user-dashboard-role",children:"Job Seeker Account"}),a.jsxs("h1",{className:"user-dashboard-name",children:[e==null?void 0:e.first_name," ",e==null?void 0:e.last_name]}),a.jsx("p",{className:"user-dashboard-email",children:e==null?void 0:e.email})]})]}),a.jsxs("div",{className:"dashboard-double-grid",children:[a.jsx("aside",{className:"dashboard-sidebar-column",children:a.jsxs("div",{className:"glass-card dashboard-menu-card",children:[a.jsxs("h2",{className:"sidebar-column-title",children:[a.jsx(Gg,{size:18}),a.jsx("span",{children:"Dashboard Menu"})]}),a.jsxs("div",{className:"dashboard-menu-links",children:[a.jsxs("button",{className:`menu-tab-btn ${s==="applications"?"tab-btn-active":""}`,onClick:()=>o("applications"),children:[a.jsx(zt,{size:16}),a.jsxs("span",{children:["Applications (",i.length,")"]})]}),a.jsxs("button",{className:`menu-tab-btn ${s==="saved_jobs"?"tab-btn-active":""}`,onClick:()=>o("saved_jobs"),children:[a.jsx(Bn,{size:16}),a.jsxs("span",{children:["Saved Jobs (",V.total,")"]})]}),a.jsxs("button",{className:`menu-tab-btn ${s==="notifications"?"tab-btn-active":""}`,onClick:()=>o("notifications"),children:[a.jsx(Lo,{size:16}),a.jsxs("span",{children:["Notifications (",wa,")"]})]}),a.jsxs("button",{className:`menu-tab-btn ${s==="profile"?"tab-btn-active":""}`,onClick:()=>o("profile"),children:[a.jsx(rn,{size:16}),a.jsx("span",{children:"Profile & Resume"})]})]})]})}),a.jsxs("section",{className:"dashboard-main-content",children:[s==="applications"&&(c?a.jsx($n,{}):a.jsxs("div",{className:"glass-card applications-card animate-fade",children:[a.jsxs("div",{className:"card-header",children:[a.jsxs("h2",{className:"main-column-title",children:[a.jsx(zt,{size:20}),a.jsx("span",{children:"Your Submitted Applications"})]}),a.jsxs("span",{className:"applications-count-badge",children:[i.length," Applied"]})]}),i.length>0?a.jsx("div",{className:"applications-table-list",children:i.map(E=>a.jsxs("article",{className:"app-row-card",children:[a.jsxs("div",{className:"app-row-header",children:[a.jsx("img",{src:E.company_logo?`http://localhost:5000/uploads/images/${E.company_logo}`:"https://ui-avatars.com/api/?name=Company&background=f1f5f9&color=64748b&bold=true",alt:`${E.company_name} Logo`,className:"app-company-logo"}),a.jsxs("div",{className:"app-row-titles",children:[a.jsx("h3",{className:"app-job-title",children:E.job_title}),a.jsxs("span",{className:"app-company-details",children:[E.company_name," • ",E.job_location]})]}),a.jsx("div",{className:"app-row-badge-wrap",children:a.jsx("span",{className:`status-badge ${ba(E.status)}`,children:E.status})})]}),a.jsx("div",{className:"app-row-body",style:{display:"flex",flexDirection:"column",gap:"10px",padding:"14px 0",borderBottom:"1px dashed var(--border-color)"},children:a.jsxs("div",{className:"status-grid",style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:"12px"},children:[a.jsxs("div",{className:"status-indicator-card",style:{display:"flex",flexDirection:"column",gap:"4px",background:"var(--bg-secondary)",padding:"10px 14px",borderRadius:"var(--radius-xs)",border:"1px solid var(--border-color)"},children:[a.jsx("span",{style:{fontSize:"11px",textTransform:"uppercase",fontWeight:700,color:"var(--text-tertiary)",letterSpacing:"0.5px"},children:"Skills Match Check"}),a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",fontSize:"13px",fontWeight:700,color:E.has_required_skills?"var(--success)":"var(--warning)"},children:[a.jsx("span",{className:"status-bullet-icon",style:{display:"inline-flex"},children:E.has_required_skills?"✓":"⚠"}),a.jsx("span",{children:E.has_required_skills?"Required Skills Matched":"Required Skills Missing"})]})]}),a.jsxs("div",{className:"status-indicator-card",style:{display:"flex",flexDirection:"column",gap:"4px",background:"var(--bg-secondary)",padding:"10px 14px",borderRadius:"var(--radius-xs)",border:"1px solid var(--border-color)"},children:[a.jsx("span",{style:{fontSize:"11px",textTransform:"uppercase",fontWeight:700,color:"var(--text-tertiary)",letterSpacing:"0.5px"},children:"Interview Shortlist"}),a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",fontSize:"13px",fontWeight:700,color:["Shortlisted","Interview Scheduled","Selected","Interview"].includes(E.status)?"var(--success)":E.status==="Rejected"?"var(--danger)":"var(--text-secondary)"},children:[a.jsx("span",{className:"status-bullet-icon",style:{display:"inline-flex"},children:["Shortlisted","Interview Scheduled","Selected","Interview"].includes(E.status)?"✓":E.status==="Rejected"?"✗":"○"}),a.jsx("span",{children:["Shortlisted","Interview Scheduled","Selected","Interview"].includes(E.status)?"Shortlisted for Interview":E.status==="Rejected"?"Not Shortlisted (Rejected)":"Not Shortlisted Yet"})]})]}),a.jsxs("div",{className:"status-indicator-card",style:{display:"flex",flexDirection:"column",gap:"4px",background:"var(--bg-secondary)",padding:"10px 14px",borderRadius:"var(--radius-xs)",border:"1px solid var(--border-color)"},children:[a.jsx("span",{style:{fontSize:"11px",textTransform:"uppercase",fontWeight:700,color:"var(--text-tertiary)",letterSpacing:"0.5px"},children:"Job Selection Status"}),a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",fontSize:"13px",fontWeight:700,color:E.status==="Selected"?"var(--success)":E.status==="Rejected"?"var(--danger)":"var(--warning)"},children:[a.jsx("span",{className:"status-bullet-icon",style:{display:"inline-flex"},children:E.status==="Selected"?"🎉":E.status==="Rejected"?"❌":"⏳"}),a.jsx("span",{children:E.status==="Selected"?"Selected for the Job":E.status==="Rejected"?"Not Selected / Rejected":"Decision Pending"})]})]})]})}),a.jsxs("div",{className:"app-row-footer",children:[a.jsxs("span",{className:"app-date-label",children:["Applied: ",a.jsx("strong",{children:new Date(E.created_at).toLocaleDateString()})]}),a.jsxs("div",{className:"app-action-links",children:[a.jsxs("a",{href:`http://localhost:5000/uploads/resumes/${E.resume}`,target:"_blank",rel:"noreferrer",className:"btn-text-action link-download",title:"Download PDF Resume",children:[a.jsx(Di,{size:14}),a.jsx("span",{children:"Resume"})]}),a.jsxs(B,{to:`/jobs/${E.job_id}`,className:"btn-text-action link-view-job",children:[a.jsx("span",{children:"View Job"}),a.jsx(hf,{size:14})]})]})]})]},E.id))}):a.jsxs("div",{className:"empty-dashboard-applications",children:[a.jsx(Qr,{size:48,className:"empty-icon animate-pulse"}),a.jsx("h3",{children:"No Active Applications"}),a.jsx("p",{children:"You haven't applied to any job postings yet. Head to the listings catalog to explore active career paths."}),a.jsx(B,{to:"/jobs",className:"btn btn-primary",children:"Find Jobs Now"})]})]})),s==="profile"&&a.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"28px"},children:[a.jsxs("div",{className:"glass-card profile-editor-card animate-fade",children:[a.jsxs("h2",{className:"sidebar-column-title",children:[a.jsx(rn,{size:18}),a.jsx("span",{children:"Profile Settings"})]}),a.jsxs("form",{onSubmit:Rt,className:"profile-form",children:[a.jsxs("div",{className:"profile-names-row",children:[a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",htmlFor:"first_name",children:"First Name"}),a.jsx("input",{type:"text",id:"first_name",name:"first_name",className:"form-control",value:u.first_name,onChange:ut,required:!0})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",htmlFor:"last_name",children:"Last Name"}),a.jsx("input",{type:"text",id:"last_name",name:"last_name",className:"form-control",value:u.last_name,onChange:ut,required:!0})]})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",htmlFor:"phone",children:"Contact Phone"}),a.jsxs("div",{className:"input-row-with-icon",children:[a.jsx(Wl,{size:14,className:"input-inner-icon"}),a.jsx("input",{type:"tel",id:"phone",name:"phone",className:"form-control input-icon-padded",value:u.phone,onChange:ut})]})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Linked Email Address"}),a.jsxs("div",{className:"input-row-with-icon",style:{opacity:.7},children:[a.jsx(un,{size:14,className:"input-inner-icon"}),a.jsx("input",{type:"email",className:"form-control input-icon-padded",value:(e==null?void 0:e.email)||"",disabled:!0})]})]}),a.jsx("button",{type:"submit",className:"btn btn-primary save-profile-btn",disabled:g,style:{width:"100%"},children:g?a.jsx("span",{className:"spinner",style:{width:"16px",height:"16px",borderWidth:"2px"}}):"Save Profile Details"})]})]}),a.jsxs("div",{className:"glass-card profile-editor-card animate-fade",style:{padding:"32px"},children:[a.jsxs("h2",{className:"sidebar-column-title",children:[a.jsx(Qr,{size:18}),a.jsx("span",{children:"Manage Resume Document"})]}),a.jsx("p",{style:{fontSize:"14px",color:"var(--text-secondary)",marginBottom:"20px",lineHeight:1.6},children:"Upload your profile resume document (PDF, DOC, or DOCX formats up to 5MB max size) so that recruiters can review your credentials dynamically."}),m?a.jsx("div",{style:{padding:"20px 0"},children:a.jsx("span",{className:"spinner",style:{width:"24px",height:"24px",borderWidth:"2px"}})}):j?a.jsxs("div",{className:"uploaded-resume-card",style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 20px",backgroundColor:"var(--bg-tertiary)",border:"1px solid var(--border-color)",borderRadius:"var(--radius-sm)"},children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[a.jsx(Qr,{size:28,style:{color:"var(--primary)"}}),a.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"2px",textAlign:"left"},children:[a.jsx("span",{style:{fontSize:"14px",fontWeight:700,color:"var(--text-primary)",wordBreak:"break-all"},children:j.filename}),a.jsxs("span",{style:{fontSize:"11px",color:"var(--text-tertiary)"},children:["Size: ",(j.size/1024/1024).toFixed(2)," MB • Uploaded: ",new Date(j.created_at).toLocaleDateString()]})]})]}),a.jsxs("div",{style:{display:"flex",gap:"10px"},children:[a.jsxs("a",{href:"http://localhost:5000/api/profile/resume/download",className:"btn btn-secondary btn-sm-saved",style:{display:"inline-flex",alignItems:"center",gap:"6px",textDecoration:"none"},children:[a.jsx(Di,{size:14})," Download"]}),a.jsx("button",{onClick:Pt,className:"btn btn-remove-saved-job",style:{padding:"8px 16px",fontSize:"13px"},children:"Delete"})]})]}):a.jsxs("div",{className:"resume-uploader-box",style:{display:"flex",flexDirection:"column",alignItems:"center",padding:"30px 20px",border:"2px dashed var(--border-color)",borderRadius:"var(--radius-sm)",backgroundColor:"var(--bg-tertiary)",gap:"12px"},children:[a.jsx(Qr,{size:32,style:{color:"var(--text-tertiary)"}}),a.jsx("span",{style:{fontSize:"13px",color:"var(--text-tertiary)"},children:"No resume document has been uploaded yet."}),a.jsx("input",{type:"file",id:"resume-profile-upload",accept:".pdf,.doc,.docx",onChange:gr,style:{display:"none"}}),a.jsxs("label",{htmlFor:"resume-profile-upload",className:"btn btn-primary",style:{display:"inline-flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[v?a.jsx("span",{className:"spinner",style:{width:"14px",height:"14px",borderWidth:"2px",borderColor:"#fff"}}):a.jsx(Fi,{size:14}),a.jsx("span",{children:"Upload Resume (PDF/DOC/DOCX)"})]})]})]})]}),s==="saved_jobs"&&a.jsxs("div",{className:"glass-card applications-card animate-fade",children:[a.jsxs("div",{className:"card-header",style:{marginBottom:"16px"},children:[a.jsxs("h2",{className:"main-column-title",children:[a.jsx(Bn,{size:20,fill:"#ffaa00",stroke:"#ffaa00"}),a.jsx("span",{children:"Your Bookmarked Positions"})]}),a.jsxs("span",{className:"applications-count-badge",children:[V.total," Saved"]})]}),a.jsxs("div",{className:"saved-jobs-filters",children:[a.jsx("input",{type:"text",placeholder:"Search by job title...",className:"filter-search-input",value:X,onChange:E=>ct(E.target.value)}),a.jsxs("select",{className:"filter-select",value:Ce,onChange:E=>we(E.target.value),children:[a.jsx("option",{value:"",children:"All Types"}),a.jsx("option",{value:"Full Time",children:"Full Time"}),a.jsx("option",{value:"Part Time",children:"Part Time"}),a.jsx("option",{value:"Internship",children:"Internship"}),a.jsx("option",{value:"Contract",children:"Contract"}),a.jsx("option",{value:"Remote",children:"Remote"})]}),a.jsxs("select",{className:"filter-select",value:P,onChange:E=>F(E.target.value),children:[a.jsx("option",{value:"",children:"All Locations"}),a.jsx("option",{value:"Bangalore",children:"Bangalore"}),a.jsx("option",{value:"Mumbai",children:"Mumbai"}),a.jsx("option",{value:"Delhi NCR",children:"Delhi NCR"}),a.jsx("option",{value:"Pune",children:"Pune"}),a.jsx("option",{value:"Hyderabad",children:"Hyderabad"}),a.jsx("option",{value:"Chennai",children:"Chennai"}),a.jsx("option",{value:"Kolkata",children:"Kolkata"}),a.jsx("option",{value:"Remote",children:"Remote"})]}),a.jsxs("select",{className:"filter-select",value:O,onChange:E=>I(E.target.value),children:[a.jsx("option",{value:"latest",children:"Newest First"}),a.jsx("option",{value:"oldest",children:"Oldest First"})]})]}),de?a.jsx($n,{}):A.length>0?a.jsx("div",{className:"saved-jobs-list-layout",children:A.map(E=>a.jsxs("article",{className:"saved-job-item-card",children:[a.jsxs("div",{className:"saved-job-top-row",children:[a.jsx("img",{src:E.company_logo?`http://localhost:5000/uploads/images/${E.company_logo}`:"https://ui-avatars.com/api/?name=Company&background=f1f5f9&color=64748b&bold=true",alt:`${E.company_name} Logo`,className:"saved-company-logo-img",onError:q=>{q.target.src=`https://ui-avatars.com/api/?name=${encodeURIComponent(E.company_name)}&background=f1f5f9&color=64748b&bold=true`}}),a.jsxs("div",{className:"saved-job-info-block",children:[a.jsx("h3",{className:"saved-job-title-h3",children:E.title}),a.jsxs("span",{className:"saved-company-span",children:[E.company_name," • ",E.location," • ",E.job_type]})]})]}),a.jsxs("div",{className:"saved-job-details-row",children:[a.jsxs("div",{className:"saved-details-col",children:[a.jsx("span",{className:"saved-detail-lbl",children:"Experience:"}),a.jsx("span",{className:"saved-detail-val",children:E.experience})]}),a.jsxs("div",{className:"saved-details-col",children:[a.jsx("span",{className:"saved-detail-lbl",children:"Compensation:"}),a.jsx("span",{className:"saved-detail-val",children:no(E.salary_min,E.salary_max)})]}),a.jsxs("div",{className:"saved-details-col",children:[a.jsx("span",{className:"saved-detail-lbl",children:"Bookmarked on:"}),a.jsx("span",{className:"saved-detail-val",children:new Date(E.saved_at).toLocaleDateString()})]})]}),a.jsxs("div",{className:"saved-job-actions-row",children:[a.jsx("button",{onClick:()=>dt(E.id),className:"btn btn-secondary btn-remove-saved-job",children:"Remove"}),a.jsxs("div",{className:"saved-right-buttons",children:[a.jsx(B,{to:`/jobs/${E.id}`,className:"btn btn-outlined btn-sm-saved",children:"View Job"}),a.jsx(B,{to:`/jobs/${E.id}/apply`,className:"btn btn-primary btn-sm-saved",children:"Apply Now"})]})]})]},E.id))}):a.jsxs("div",{className:"empty-saved-jobs-state",children:[a.jsx(Bn,{size:48,className:"empty-star-icon animate-pulse"}),a.jsx("h3",{children:"You haven't saved any jobs yet."}),a.jsx("p",{children:"Search our listings to find positions that match your technical skills and bookmark them for later review."}),a.jsx(B,{to:"/jobs",className:"btn btn-primary",children:"Browse Jobs"})]}),V.totalPages>1&&a.jsxs("div",{className:"saved-pagination-bar-wrapper",children:[a.jsx("button",{className:"pagination-btn",onClick:()=>J(V.page-1),disabled:V.page===1,children:"Prev"}),a.jsx("div",{className:"pagination-pages",children:Array.from({length:V.totalPages},(E,q)=>q+1).map(E=>a.jsx("button",{className:`page-number-btn ${V.page===E?"active-page-btn":""}`,onClick:()=>J(E),children:E},E))}),a.jsx("button",{className:"pagination-btn",onClick:()=>J(V.page+1),disabled:V.page===V.totalPages,children:"Next"})]})]}),s==="notifications"&&a.jsxs("div",{className:"glass-card applications-card animate-fade",children:[a.jsxs("div",{className:"card-header",style:{marginBottom:"20px"},children:[a.jsxs("h2",{className:"main-column-title",children:[a.jsx(Lo,{size:20}),a.jsx("span",{children:"Real-Time Notification Alerts"})]}),a.jsxs("span",{className:"applications-count-badge",children:[wa," Unread"]})]}),R?a.jsx("div",{style:{padding:"40px 0"},children:a.jsx("span",{className:"spinner",style:{width:"28px",height:"28px",borderWidth:"2.5px"}})}):C.length>0?a.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"14px"},children:C.map(E=>a.jsxs("div",{onClick:()=>{E.is_read||jt(E.id)},style:{padding:"16px 20px",border:"1px solid var(--border-color)",borderRadius:"var(--radius-sm)",backgroundColor:E.is_read?"var(--bg-tertiary)":"var(--primary-glow)",borderLeft:E.is_read?"1px solid var(--border-color)":"4px solid var(--primary)",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",transition:"all var(--transition-fast)",textAlign:"left"},children:[a.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"4px"},children:[a.jsx("h4",{style:{fontSize:"14.5px",fontWeight:800,color:"var(--text-primary)"},children:E.title}),a.jsx("p",{style:{fontSize:"13.5px",color:"var(--text-secondary)",lineHeight:1.4},children:E.message}),a.jsx("span",{style:{fontSize:"11px",color:"var(--text-tertiary)"},children:new Date(E.created_at).toLocaleString()})]}),!E.is_read&&a.jsx("span",{style:{width:"8px",height:"8px",borderRadius:"50%",backgroundColor:"var(--primary)",flexShrink:0,marginLeft:"12px"}})]},E.id))}):a.jsxs("div",{className:"empty-dashboard-applications",children:[a.jsx(Lo,{size:48,className:"empty-icon animate-pulse"}),a.jsx("h3",{children:"No Notification Messages"}),a.jsx("p",{children:"You have no recent alerts. We will keep you updated when recruiters progress your active job applications."})]})]})]})]})]}),a.jsx("style",{children:`
        .dashboard-page {
          background-color: var(--bg-primary);
          padding: 40px 0 80px 0;
        }

        .dashboard-container {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        /* Intro Banner Card */
        .dashboard-intro-card {
          padding: 32px;
          background-color: var(--bg-secondary);
          display: flex;
          align-items: center;
          gap: 28px;
        }

        .dashboard-intro-card:hover {
          transform: none;
          box-shadow: var(--shadow-lg);
        }

        .avatar-uploader-section {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .dashboard-large-avatar {
          width: 96px;
          height: 96px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid var(--primary);
          padding: 2px;
        }

        .avatar-upload-btn-label {
          position: absolute;
          bottom: -8px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 10px;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-full);
          font-size: 10px;
          font-weight: 700;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition-fast);
          box-shadow: var(--shadow-sm);
        }

        .avatar-upload-btn-label:hover {
          color: var(--primary);
          border-color: var(--primary);
          background-color: var(--primary-glow);
        }

        .dashboard-intro-titles {
          text-align: left;
        }

        .user-dashboard-role {
          font-family: var(--font-display);
          font-size: 12px;
          font-weight: 700;
          color: var(--accent);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .user-dashboard-name {
          font-size: 26px;
          font-weight: 800;
          color: var(--text-primary);
          margin-top: 2px;
        }

        .user-dashboard-email {
          font-size: 14px;
          color: var(--text-tertiary);
          margin-top: 4px;
        }

        /* Double Column Grid */
        .dashboard-double-grid {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 28px;
          align-items: start;
        }

        /* Sidebar Tabs Menu Styles */
        .dashboard-menu-card {
          padding: 24px;
          background-color: var(--bg-secondary);
          text-align: left;
        }

        .dashboard-menu-card:hover {
          transform: none;
          box-shadow: var(--shadow-md);
        }

        .sidebar-column-title {
          font-size: 17px;
          font-weight: 800;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-color);
          color: var(--text-primary);
        }

        .dashboard-menu-links {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .menu-tab-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          width: 100%;
          text-align: left;
          background: none;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .menu-tab-btn:hover {
          background-color: var(--bg-tertiary);
          border-color: var(--border-hover);
          color: var(--text-primary);
        }

        .tab-btn-active {
          background-color: var(--primary-glow) !important;
          border-color: var(--primary) !important;
          color: var(--primary) !important;
        }

        /* Profile Editor specific changes */
        .profile-editor-card {
          padding: 32px;
          background-color: var(--bg-secondary);
          text-align: left;
        }

        .profile-editor-card:hover {
          transform: none;
          box-shadow: var(--shadow-lg);
        }

        .profile-names-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .profile-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
          text-align: left;
          margin-top: 10px;
        }

        .input-row-with-icon {
          position: relative;
        }

        .input-inner-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-tertiary);
        }

        .input-icon-padded {
          padding-left: 40px;
        }

        .save-profile-btn {
          height: 44px;
        }

        /* Applications column */
        .applications-card {
          padding: 32px;
          background-color: var(--bg-secondary);
          text-align: left;
        }

        .applications-card:hover {
          transform: none;
          box-shadow: var(--shadow-lg);
        }

        .applications-card .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--border-color);
          margin-bottom: 24px;
        }

        .main-column-title {
          font-size: 20px;
          font-weight: 800;
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--text-primary);
        }

        .applications-count-badge {
          background-color: var(--primary-glow);
          color: var(--primary);
          padding: 4px 12px;
          border-radius: var(--radius-full);
          font-size: 12px;
          font-weight: 700;
        }

        .applications-table-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .app-row-card {
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 20px;
          background-color: var(--bg-tertiary);
          transition: border-color var(--transition-normal), background-color var(--transition-normal);
          text-align: left;
        }

        .app-row-card:hover {
          border-color: var(--primary-glow);
          background-color: var(--bg-secondary);
        }

        .app-row-header {
          display: flex;
          align-items: center;
          gap: 14px;
          padding-bottom: 14px;
          border-bottom: 1px dashed var(--border-color);
        }

        .app-company-logo {
          width: 42px;
          height: 42px;
          object-fit: contain;
          border-radius: var(--radius-xs);
          border: 1px solid var(--border-color);
          background-color: #ffffff;
        }

        .app-row-titles {
          flex-grow: 1;
        }

        .app-job-title {
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .app-company-details {
          font-size: 12px;
          color: var(--text-tertiary);
          display: block;
          margin-top: 2px;
        }

        /* Status Badge Colors */
        .status-badge {
          display: inline-flex;
          padding: 4px 12px;
          border-radius: var(--radius-full);
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .status-applied { background-color: var(--primary-glow); color: var(--primary); }
        .status-review { background-color: rgba(245, 158, 11, 0.15); color: var(--warning); }
        .status-shortlisted { background-color: rgba(99, 102, 241, 0.15); color: var(--accent); }
        .status-interview { background-color: rgba(99, 102, 241, 0.25); color: var(--accent); }
        .status-selected { background-color: var(--success-glow); color: var(--success); }
        .status-rejected { background-color: var(--danger-glow); color: var(--danger); }

        .app-row-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 14px;
          font-size: 13px;
        }

        .app-date-label {
          color: var(--text-tertiary);
        }

        .app-date-label strong {
          color: var(--text-secondary);
        }

        .app-action-links {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .btn-text-action {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-weight: 600;
          font-size: 13px;
        }

        .link-download {
          color: var(--primary);
        }

        .link-download:hover {
          text-decoration: underline;
        }

        .link-view-job {
          color: var(--text-secondary);
        }

        .link-view-job:hover {
          color: var(--primary);
        }

        .empty-dashboard-applications {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 60px 20px;
          color: var(--text-secondary);
          gap: 16px;
        }

        .empty-dashboard-applications h3 {
          font-size: 20px;
          color: var(--text-primary);
        }

        .empty-dashboard-applications p {
          max-width: 420px;
          font-size: 14px;
          color: var(--text-tertiary);
          line-height: 1.5;
          margin-bottom: 8px;
        }

        /* SAVED JOBS STYLING */
        .saved-jobs-filters {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 12px;
          margin-bottom: 24px;
        }

        .filter-search-input {
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
          background-color: var(--bg-tertiary);
          color: var(--text-primary);
          font-size: 14px;
        }

        .filter-select {
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
          background-color: var(--bg-tertiary);
          color: var(--text-primary);
          font-size: 14px;
          cursor: pointer;
        }

        .saved-jobs-list-layout {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .saved-job-item-card {
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 20px;
          background-color: var(--bg-tertiary);
          transition: border-color var(--transition-normal), background-color var(--transition-normal);
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .saved-job-item-card:hover {
          border-color: var(--primary-glow);
          background-color: var(--bg-secondary);
        }

        .saved-job-top-row {
          display: flex;
          align-items: center;
          gap: 14px;
          padding-bottom: 12px;
          border-bottom: 1px dashed var(--border-color);
        }

        .saved-company-logo-img {
          width: 44px;
          height: 44px;
          object-fit: contain;
          border-radius: var(--radius-xs);
          border: 1px solid var(--border-color);
          background-color: #ffffff;
          padding: 2px;
        }

        .saved-job-info-block {
          flex-grow: 1;
        }

        .saved-job-title-h3 {
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .saved-company-span {
          font-size: 12px;
          color: var(--text-tertiary);
          display: block;
          margin-top: 2px;
        }

        .saved-job-details-row {
          display: grid;
          grid-template-columns: 1.2fr 1.5fr 1.3fr;
          gap: 16px;
          font-size: 13px;
        }

        .saved-details-col {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .saved-detail-lbl {
          color: var(--text-tertiary);
          font-weight: 500;
        }

        .saved-detail-val {
          color: var(--text-secondary);
          font-weight: 700;
        }

        .saved-job-actions-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid var(--border-color);
          padding-top: 14px;
        }

        .btn-remove-saved-job {
          border-color: var(--danger) !important;
          color: var(--danger) !important;
          padding: 8px 16px;
          font-size: 13px;
          font-weight: 700;
        }

        .btn-remove-saved-job:hover {
          background-color: var(--danger-glow) !important;
        }

        .saved-right-buttons {
          display: flex;
          gap: 12px;
        }

        .btn-sm-saved {
          padding: 8px 18px;
          font-size: 13px;
          font-weight: 700;
        }

        .empty-saved-jobs-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 60px 20px;
          color: var(--text-secondary);
          gap: 16px;
        }

        .empty-star-icon {
          color: var(--text-tertiary);
        }

        .empty-saved-jobs-state h3 {
          font-size: 20px;
          color: var(--text-primary);
        }

        .empty-saved-jobs-state p {
          max-width: 420px;
          font-size: 14px;
          color: var(--text-tertiary);
          line-height: 1.5;
          margin-bottom: 8px;
        }

        /* Saved Jobs Pagination */
        .saved-pagination-bar-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 0 0 0;
          margin-top: 24px;
          border-top: 1px solid var(--border-color);
        }

        .pagination-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
          background-color: var(--bg-tertiary);
          color: var(--text-secondary);
          font-weight: 600;
          font-size: 14px;
          transition: all var(--transition-fast);
          cursor: pointer;
        }

        .pagination-btn:hover:not(:disabled) {
          border-color: var(--primary);
          color: var(--primary);
          background-color: var(--primary-glow);
        }

        .pagination-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .pagination-pages {
          display: flex;
          gap: 6px;
        }

        .page-number-btn {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          font-weight: 600;
          font-size: 14px;
          transition: all var(--transition-fast);
          cursor: pointer;
          background: none;
        }

        .page-number-btn:hover {
          border-color: var(--primary);
          color: var(--primary);
        }

        .active-page-btn {
          background-color: var(--primary) !important;
          color: #ffffff !important;
          border-color: var(--primary) !important;
          box-shadow: var(--shadow-glow);
        }

        @media (max-width: 992px) {
          .dashboard-double-grid {
            grid-template-columns: 1fr;
          }
          
          .saved-jobs-filters {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 576px) {
          .dashboard-intro-card {
            flex-direction: column;
            text-align: center;
            padding: 24px 16px;
          }
          
          .dashboard-intro-titles {
            text-align: center;
          }
          
          .profile-names-row {
            grid-template-columns: 1fr;
            gap: 0;
          }
          
          .app-row-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
          
          .app-row-badge-wrap {
            margin-top: 4px;
          }
          
          .app-row-footer {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
          
          .app-action-links {
            width: 100%;
            justify-content: space-between;
          }

          .saved-job-top-row {
            flex-direction: column;
            align-items: flex-start;
          }

          .saved-job-details-row {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .saved-job-actions-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .saved-right-buttons {
            width: 100%;
            justify-content: space-between;
          }

          .btn-remove-saved-job {
            width: 100%;
            text-align: center;
          }
        }
      `})]})},sy=()=>{var Zl,ec;const{user:e}=Ht(),{showToast:t}=et(),{skills:r}=ya(),[n,s]=b.useState("overview"),[o,i]=b.useState(null),[l,c]=b.useState(!0),[d,u]=b.useState([]),[f,g]=b.useState(!0),[w,h]=b.useState([]),[y,j]=b.useState(!0),[p,m]=b.useState([]),[x,v]=b.useState([]),[N,C]=b.useState(""),[_,R]=b.useState("all"),[D,A]=b.useState("all"),[Q,de]=b.useState(!1),[ne,X]=b.useState("create"),[ct,Ce]=b.useState(null),[we,P]=b.useState({title:"",description:"",job_type:"Full Time",salary_min:"",salary_max:"",location:"",experience:"0-1 years",skills:[],status:"active"}),[F,O]=b.useState(!1),[I,V]=b.useState(null),[Z,xe]=b.useState(!1),[H,le]=b.useState({name:"",email:"",phone:"",website:"",industry:"",address:"",description:"",banner:""}),[me,J]=b.useState(null),[dt,ut]=b.useState(!1),Rt=b.useCallback(async()=>{c(!0);try{const S=await $.get("/companies/my-company");if(S.data.success){const U=S.data.data;i(U),le({name:U.name||"",email:U.email||"",phone:U.phone||"",website:U.website||"",industry:U.industry||"",address:U.address||"",description:U.description||"",banner:U.banner||""})}}catch(S){console.error("Failed to load company details:",S)}finally{c(!1)}},[]),wt=b.useCallback(async()=>{if(o){g(!0);try{const S=await $.get(`/jobs?status=all&limit=100&company_id=${o.id}`);S.data.success&&u(S.data.data)}catch{t("Error loading company jobs.","error")}finally{g(!1)}}},[o]),gr=b.useCallback(async()=>{j(!0);try{const S=await $.get("/applications");S.data.success&&h(S.data.data)}catch{t("Error loading candidate pipeline.","error")}finally{j(!1)}},[]),Pt=async()=>{try{const S=await $.get("/admin/public/categories");S.data.success&&m(S.data.data);const U=await $.get("/admin/public/locations");U.data.success&&v(U.data.data)}catch(S){console.error("Failed to fetch auxiliary lists:",S)}};b.useEffect(()=>{Rt(),Pt()},[Rt]),b.useEffect(()=>{o&&(wt(),gr())},[o,wt,gr]);const jt=S=>{const{name:U,value:ee}=S.target;P(ae=>({...ae,[U]:ee}))},ro=S=>{const U=parseInt(S);P(ee=>{const pt=ee.skills.includes(U)?ee.skills.filter(ja=>ja!==U):[...ee.skills,U];return{...ee,skills:pt}})},ba=()=>{X("create"),Ce(null),P({title:"",description:"",job_type:"Full Time",salary_min:"",salary_max:"",location:x.length>0?`${x[0].city}, ${x[0].state}`:"",experience:"0-1 years",skills:[],status:"active"}),de(!0)},no=S=>{X("edit"),Ce(S.id);const U=Array.isArray(S.skills)?S.skills.map(ee=>ee.id).filter(Boolean):[];P({title:S.title||"",description:S.description||"",job_type:S.job_type||"Full Time",salary_min:S.salary_min||"",salary_max:S.salary_max||"",location:S.location||"",experience:S.experience||"0-1 years",skills:U,status:S.status||"active"}),de(!0)},wa=async S=>{var nc,ac;if(S.preventDefault(),!o)return;const{title:U,description:ee,job_type:ae,salary_min:pt,salary_max:ja,location:tc,experience:rc,skills:em}=we;if(!U||!ee||!pt||!ja||!tc||!rc){t("Please complete all standard fields.","warning");return}O(!0);try{const ka={title:U,description:ee,company_id:o.id,salary_min:parseInt(pt),salary_max:parseInt(ja),job_type:ae,location:tc,experience:rc,skills:em,status:we.status};let ao;ne==="create"?ao=await $.post("/jobs",ka):ao=await $.put(`/jobs/${ct}`,ka),ao.data.success&&(t(ne==="create"?"🎉 Job opportunity published successfully.":"✏️ Job details updated successfully.","success"),de(!1),wt())}catch(ka){t(((ac=(nc=ka.response)==null?void 0:nc.data)==null?void 0:ac.message)||"Error processing job posting.","error")}finally{O(!1)}},E=async S=>{if(window.confirm("Are you sure you want to delete this job posting? This will remove associated applications."))try{(await $.delete(`/jobs/${S}`)).data.success&&(t("🗑️ Job posting deleted successfully.","success"),wt(),gr())}catch{t("Failed to delete job posting.","error")}},q=async S=>{const U=S.status==="active"?"inactive":"active";try{(await $.put(`/jobs/${S.id}`,{status:U})).data.success&&(t(`Job status changed to ${U}.`,"success"),wt())}catch{t("Failed to update job status.","error")}},G=async(S,U)=>{xe(!0);try{(await $.patch(`/applications/${S}/status`,{status:U})).data.success&&(t(`Candidate status updated to "${U}" successfully!`,"success"),h(ae=>ae.map(pt=>pt.id===S?{...pt,status:U}:pt)),I&&I.id===S&&V(ae=>({...ae,status:U})))}catch{t("Failed to update application status.","error")}finally{xe(!1)}},ge=async S=>{var U,ee;if(S.preventDefault(),!!o){ut(!0);try{const ae=new FormData;ae.append("name",H.name),ae.append("email",H.email),ae.append("phone",H.phone),ae.append("website",H.website),ae.append("industry",H.industry),ae.append("address",H.address),ae.append("description",H.description),ae.append("banner",H.banner),me&&ae.append("logo",me);const pt=await $.put(`/companies/${o.id}`,ae,{headers:{"Content-Type":"multipart/form-data"}});pt.data.success&&(t("Company profile details saved successfully!","success"),i(pt.data.data),J(null))}catch(ae){t(((ee=(U=ae.response)==null?void 0:U.data)==null?void 0:ee.message)||"Failed to save company profile.","error")}finally{ut(!1)}}},Vt=w.filter(S=>{const U=`${S.first_name} ${S.last_name}`.toLowerCase().includes(N.toLowerCase())||S.email&&S.email.toLowerCase().includes(N.toLowerCase())||S.skills&&S.skills.toLowerCase().includes(N.toLowerCase()),ee=_==="all"||S.job_id===parseInt(_),ae=D==="all"||S.status===D;return U&&ee&&ae}),Wt=d.filter(S=>S.status==="active").length,Jt=w.length,qt=w.filter(S=>["Shortlisted","Interview Scheduled","Interview","Selected"].includes(S.status)).length,Zf=w.filter(S=>["Interview Scheduled","Interview"].includes(S.status)).length;return a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"recruiter-dashboard-layout animate-fade",children:[a.jsxs("section",{className:"dashboard-hero-panel",children:[a.jsx("div",{className:"hero-glass-overlay"}),a.jsxs("div",{className:"hero-content-row",children:[a.jsx("div",{className:"company-logo-badge",children:o!=null&&o.logo?a.jsx("img",{src:`http://localhost:5000/uploads/images/${o.logo}`,alt:"Logo",className:"company-logo-img"}):a.jsx("div",{className:"logo-placeholder-avatar",children:o!=null&&o.name?o.name.substring(0,2).toUpperCase():"CO"})}),a.jsxs("div",{className:"company-meta-details",children:[a.jsx("h1",{className:"company-title",children:(o==null?void 0:o.name)||"Loading Company..."}),a.jsxs("p",{className:"recruiter-badge",children:["Registered Recruiter Workspace: ",a.jsxs("b",{children:[e==null?void 0:e.first_name," ",e==null?void 0:e.last_name]})]}),(o==null?void 0:o.website)&&a.jsx("a",{href:o.website,target:"_blank",rel:"noreferrer",className:"company-link-btn",children:"Visit Corporate Website ↗"})]})]})]}),a.jsxs("div",{className:"dashboard-grid-stats",children:[a.jsxs("div",{className:"stat-glass-card hover-glow",children:[a.jsxs("div",{className:"stat-header",children:[a.jsx("span",{className:"stat-title",children:"Active Openings"}),a.jsx(zt,{size:22,className:"stat-icon orange-icon"})]}),a.jsxs("div",{className:"stat-value",children:[Wt," / ",d.length]}),a.jsx("span",{className:"stat-meta",children:"Published career posts"})]}),a.jsxs("div",{className:"stat-glass-card hover-glow",children:[a.jsxs("div",{className:"stat-header",children:[a.jsx("span",{className:"stat-title",children:"Total Applicants"}),a.jsx(rn,{size:22,className:"stat-icon"})]}),a.jsx("div",{className:"stat-value",children:Jt}),a.jsx("span",{className:"stat-meta",children:"Candidates pipeline size"})]}),a.jsxs("div",{className:"stat-glass-card hover-glow",children:[a.jsxs("div",{className:"stat-header",children:[a.jsx("span",{className:"stat-title",children:"Shortlisted Candidates"}),a.jsx(Oo,{size:22,className:"stat-icon green-icon"})]}),a.jsx("div",{className:"stat-value",children:qt}),a.jsx("span",{className:"stat-meta",children:"Passed 60% skills filter"})]}),a.jsxs("div",{className:"stat-glass-card hover-glow",children:[a.jsxs("div",{className:"stat-header",children:[a.jsx("span",{className:"stat-title",children:"Interviews Scheduled"}),a.jsx(Oo,{size:22,className:"stat-icon green-icon"})]}),a.jsx("div",{className:"stat-value",children:Zf}),a.jsx("span",{className:"stat-meta font-sans",children:"Active feedback process"})]})]}),a.jsxs("nav",{className:"dashboard-nav-tabs",children:[a.jsx("button",{onClick:()=>s("overview"),className:`tab-link ${n==="overview"?"tab-link-active":""}`,children:"Overview & Insights"}),a.jsxs("button",{onClick:()=>s("jobs"),className:`tab-link ${n==="jobs"?"tab-link-active":""}`,children:["Manage Jobs (",d.length,")"]}),a.jsxs("button",{onClick:()=>s("applicants"),className:`tab-link ${n==="applicants"?"tab-link-active":""}`,children:["Candidate Pipeline (",w.length,")"]}),a.jsx("button",{onClick:()=>s("company"),className:`tab-link ${n==="company"?"tab-link-active":""}`,children:"Company Profile"})]}),a.jsxs("div",{className:"tab-render-container",children:[n==="overview"&&a.jsxs("div",{className:"overview-tab-view animate-fade",children:[a.jsxs("div",{className:"overview-graphics-grid",children:[a.jsxs("div",{className:"chart-glass-panel",children:[a.jsx("h3",{className:"panel-heading",children:"Pipeline Submissions Trend"}),a.jsx("p",{className:"panel-subtext",children:"Recent months application flow volume analysis"}),a.jsx("div",{className:"svg-chart-container",children:a.jsxs("svg",{viewBox:"0 0 500 200",className:"svg-area-chart",children:[a.jsx("defs",{children:a.jsxs("linearGradient",{id:"recruiterAreaGrad",x1:"0",y1:"0",x2:"0",y2:"1",children:[a.jsx("stop",{offset:"0%",stopColor:"var(--primary)",stopOpacity:"0.4"}),a.jsx("stop",{offset:"100%",stopColor:"var(--primary)",stopOpacity:"0.0"})]})}),a.jsx("line",{x1:"40",y1:"30",x2:"480",y2:"30",stroke:"var(--border-color)",strokeDasharray:"4"}),a.jsx("line",{x1:"40",y1:"80",x2:"480",y2:"80",stroke:"var(--border-color)",strokeDasharray:"4"}),a.jsx("line",{x1:"40",y1:"130",x2:"480",y2:"130",stroke:"var(--border-color)",strokeDasharray:"4"}),a.jsx("line",{x1:"40",y1:"170",x2:"480",y2:"170",stroke:"var(--border-color)",strokeWidth:"1.5"}),a.jsx("path",{d:"M 40 170 C 100 130, 150 145, 200 90 C 250 80, 300 120, 350 45 C 400 40, 450 70, 480 25 L 480 170 Z",fill:"url(#recruiterAreaGrad)"}),a.jsx("path",{d:"M 40 170 C 100 130, 150 145, 200 90 C 250 80, 300 120, 350 45 C 400 40, 450 70, 480 25",fill:"none",stroke:"var(--primary)",strokeWidth:"3.5"}),a.jsx("circle",{cx:"200",cy:"90",r:"5",fill:"var(--primary)",stroke:"#ffffff",strokeWidth:"1.5"}),a.jsx("circle",{cx:"350",cy:"45",r:"5",fill:"var(--primary)",stroke:"#ffffff",strokeWidth:"1.5"}),a.jsx("circle",{cx:"480",cy:"25",r:"5",fill:"var(--primary)",stroke:"#ffffff",strokeWidth:"1.5"}),a.jsx("text",{x:"40",y:"190",fill:"var(--text-secondary)",fontSize:"10",textAnchor:"middle",children:"Feb"}),a.jsx("text",{x:"150",y:"190",fill:"var(--text-secondary)",fontSize:"10",textAnchor:"middle",children:"Mar"}),a.jsx("text",{x:"260",y:"190",fill:"var(--text-secondary)",fontSize:"10",textAnchor:"middle",children:"Apr"}),a.jsx("text",{x:"370",y:"190",fill:"var(--text-secondary)",fontSize:"10",textAnchor:"middle",children:"May"}),a.jsx("text",{x:"475",y:"190",fill:"var(--text-secondary)",fontSize:"10",textAnchor:"middle",children:"Jun"}),a.jsx("text",{x:"30",y:"173",fill:"var(--text-secondary)",fontSize:"9",textAnchor:"end",children:"0"}),a.jsx("text",{x:"30",y:"133",fill:"var(--text-secondary)",fontSize:"9",textAnchor:"end",children:"10"}),a.jsx("text",{x:"30",y:"83",fill:"var(--text-secondary)",fontSize:"9",textAnchor:"end",children:"30"}),a.jsx("text",{x:"30",y:"33",fill:"var(--text-secondary)",fontSize:"9",textAnchor:"end",children:"50+"})]})})]}),a.jsxs("div",{className:"chart-glass-panel flex-center-col",children:[a.jsx("h3",{className:"panel-heading",children:"Match Shortlist Rate"}),a.jsx("p",{className:"panel-subtext",children:"Candidates meeting 60% skills requirement"}),a.jsxs("div",{className:"progress-ring-container",children:[a.jsxs("svg",{width:"120",height:"120",className:"progress-ring",children:[a.jsx("circle",{cx:"60",cy:"60",r:"50",className:"progress-ring-bg",stroke:"var(--border-color)",strokeWidth:"10",fill:"transparent"}),a.jsx("circle",{cx:"60",cy:"60",r:"50",className:"progress-ring-fill",stroke:"var(--primary)",strokeWidth:"10",fill:"transparent",strokeDasharray:"314.15",strokeDashoffset:Jt>0?314.15-314.15*qt/Jt:314.15})]}),a.jsxs("div",{className:"progress-ring-text",children:[a.jsxs("span",{className:"percent-val",children:[Jt>0?Math.round(qt/Jt*100):0,"%"]}),a.jsx("span",{className:"percent-label",children:"Shortlisted"})]})]})]})]}),a.jsxs("div",{className:"panel-listing-card",children:[a.jsxs("div",{className:"panel-listing-header",children:[a.jsx("h3",{className:"panel-heading",children:"Recent Pipeline Submissions"}),a.jsx("button",{onClick:()=>s("applicants"),className:"link-text-btn",children:"View full list →"})]}),y?a.jsx($n,{}):w.length===0?a.jsxs("div",{className:"empty-state-panel",children:[a.jsx(rn,{size:36}),a.jsx("p",{children:"No recent candidate applications received for your jobs."})]}):a.jsx("div",{className:"responsive-table-wrapper",children:a.jsxs("table",{className:"glass-table-layout",children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{children:"Applicant"}),a.jsx("th",{children:"Job Posting"}),a.jsx("th",{children:"Experience"}),a.jsx("th",{children:"Skills"}),a.jsx("th",{children:"Match"}),a.jsx("th",{children:"Status"}),a.jsx("th",{children:"Action"})]})}),a.jsx("tbody",{children:w.slice(0,5).map(S=>{var U;return a.jsxs("tr",{children:[a.jsx("td",{children:a.jsxs("div",{className:"applicant-cell-info",children:[a.jsxs("span",{className:"c-name",children:[S.first_name," ",S.last_name]}),a.jsx("span",{className:"c-email",children:S.email})]})}),a.jsx("td",{children:a.jsx("b",{children:S.job_title})}),a.jsx("td",{children:S.experience||"N/A"}),a.jsx("td",{children:a.jsxs("div",{className:"skills-tags-row",children:[(S.skills||"").split(",").slice(0,3).map((ee,ae)=>a.jsx("span",{className:"skill-badge-tag",children:ee.trim()},ae)),(S.skills||"").split(",").length>3&&a.jsxs("span",{className:"skill-badge-tag-more",children:["+",S.skills.split(",").length-3]})]})}),a.jsx("td",{children:S.has_required_skills?a.jsx("span",{className:"match-pill green-pill",children:"✔ High Match"}):a.jsx("span",{className:"match-pill gray-pill",children:"✘ Low Match"})}),a.jsx("td",{children:a.jsx("span",{className:`status-pill ${(U=S.status)==null?void 0:U.toLowerCase().replace(" ","-")}`,children:S.status})}),a.jsx("td",{children:a.jsx("button",{onClick:()=>V(S),className:"btn-table-action view-btn",children:"Inspect Details"})})]},S.id)})})]})})]})]}),n==="jobs"&&a.jsxs("div",{className:"jobs-tab-view animate-fade",children:[a.jsxs("div",{className:"tab-action-header-row",children:[a.jsxs("div",{children:[a.jsx("h3",{className:"panel-heading",children:"Manage Published Openings"}),a.jsx("p",{className:"panel-subtext",children:"Publish and update career postings for your company"})]}),a.jsxs("button",{onClick:ba,className:"btn btn-primary add-job-btn",children:[a.jsx(Yg,{size:18})," Publish New Job"]})]}),f?a.jsx($n,{}):d.length===0?a.jsxs("div",{className:"empty-state-panel large-empty",children:[a.jsx(zt,{size:54,className:"empty-icon"}),a.jsx("h3",{children:"No jobs published yet"}),a.jsx("p",{children:"Start publishing open opportunities to attract candidate applications."}),a.jsx("button",{onClick:ba,className:"btn btn-primary",children:"Publish First Job"})]}):a.jsx("div",{className:"responsive-table-wrapper",children:a.jsxs("table",{className:"glass-table-layout",children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{children:"Job Title"}),a.jsx("th",{children:"Location"}),a.jsx("th",{children:"Job Type"}),a.jsx("th",{children:"Salary Range"}),a.jsx("th",{children:"Experience Req."}),a.jsx("th",{children:"Status"}),a.jsx("th",{children:"Actions"})]})}),a.jsx("tbody",{children:d.map(S=>{var U,ee;return a.jsxs("tr",{children:[a.jsx("td",{children:a.jsxs("div",{className:"job-title-cell",children:[a.jsx("b",{children:S.title}),a.jsxs("span",{className:"job-date",children:["Posted on ",new Date(S.created_at).toLocaleDateString()]})]})}),a.jsx("td",{children:S.location}),a.jsx("td",{children:a.jsx("span",{className:"job-type-badge",children:S.job_type})}),a.jsxs("td",{children:["₹",(U=S.salary_min)==null?void 0:U.toLocaleString()," - ₹",(ee=S.salary_max)==null?void 0:ee.toLocaleString()]}),a.jsx("td",{children:S.experience}),a.jsx("td",{children:a.jsxs("button",{onClick:()=>q(S),className:`status-indicator-btn ${S.status==="active"?"active-stat":"inactive-stat"}`,title:"Click to toggle status",children:[a.jsx("span",{className:"dot"})," ",S.status==="active"?"Active":"Inactive"]})}),a.jsx("td",{children:a.jsxs("div",{className:"table-actions-row",children:[a.jsx("button",{onClick:()=>no(S),className:"action-icon-btn edit-icon-btn",title:"Edit Job Posting",children:a.jsx(Zg,{size:16})}),a.jsx("button",{onClick:()=>E(S.id),className:"action-icon-btn delete-icon-btn",title:"Delete Job Posting",children:a.jsx(t0,{size:16})})]})})]},S.id)})})]})})]}),n==="applicants"&&a.jsxs("div",{className:"applicants-tab-view animate-fade",children:[a.jsx("div",{className:"tab-action-header-row",children:a.jsxs("div",{children:[a.jsx("h3",{className:"panel-heading",children:"Candidate Application Pipeline"}),a.jsx("p",{className:"panel-subtext",children:"Review qualifications and track candidate statuses"})]})}),a.jsxs("div",{className:"filters-ribbon-card",children:[a.jsxs("div",{className:"search-bar-wrapper",children:[a.jsx(Rs,{size:18,className:"search-bar-icon"}),a.jsx("input",{type:"text",placeholder:"Search candidate name, email, or skills...",value:N,onChange:S=>C(S.target.value),className:"search-bar-input"})]}),a.jsxs("div",{className:"select-filters-row",children:[a.jsxs("div",{className:"filter-select-wrapper",children:[a.jsx("label",{children:"Filter by Job:"}),a.jsxs("select",{value:_,onChange:S=>R(S.target.value),children:[a.jsx("option",{value:"all",children:"All Jobs"}),d.map(S=>a.jsx("option",{value:S.id,children:S.title},S.id))]})]}),a.jsxs("div",{className:"filter-select-wrapper",children:[a.jsx("label",{children:"Filter by Status:"}),a.jsxs("select",{value:D,onChange:S=>A(S.target.value),children:[a.jsx("option",{value:"all",children:"All Statuses"}),a.jsx("option",{value:"Applied",children:"Applied"}),a.jsx("option",{value:"Under Review",children:"Under Review"}),a.jsx("option",{value:"Shortlisted",children:"Shortlisted"}),a.jsx("option",{value:"Interview Scheduled",children:"Interview Scheduled"}),a.jsx("option",{value:"Selected",children:"Selected"}),a.jsx("option",{value:"Rejected",children:"Rejected"})]})]})]})]}),y?a.jsx($n,{}):Vt.length===0?a.jsxs("div",{className:"empty-state-panel",children:[a.jsx(Rs,{size:36}),a.jsx("p",{children:"No candidates found matching the selected search criteria."})]}):a.jsx("div",{className:"responsive-table-wrapper",children:a.jsxs("table",{className:"glass-table-layout",children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{children:"Applicant Details"}),a.jsx("th",{children:"Job Post"}),a.jsx("th",{children:"Skill Match"}),a.jsx("th",{children:"Status"}),a.jsx("th",{children:"Submission Date"}),a.jsx("th",{children:"Actions"})]})}),a.jsx("tbody",{children:Vt.map(S=>{var U;return a.jsxs("tr",{children:[a.jsx("td",{children:a.jsxs("div",{className:"applicant-cell-info",children:[a.jsxs("span",{className:"c-name",children:[S.first_name," ",S.last_name]}),a.jsx("span",{className:"c-email",children:S.email}),S.phone&&a.jsx("span",{className:"c-phone",children:S.phone})]})}),a.jsx("td",{children:a.jsx("b",{children:S.job_title})}),a.jsx("td",{children:S.has_required_skills?a.jsx("span",{className:"match-pill green-pill",children:"✔ High Match"}):a.jsx("span",{className:"match-pill gray-pill",children:"✘ Low Match"})}),a.jsx("td",{children:a.jsxs("select",{value:S.status,onChange:ee=>G(S.id,ee.target.value),disabled:Z,className:`status-dropdown-select ${(U=S.status)==null?void 0:U.toLowerCase().replace(" ","-")}`,children:[a.jsx("option",{value:"Applied",children:"Applied"}),a.jsx("option",{value:"Under Review",children:"Under Review"}),a.jsx("option",{value:"Shortlisted",children:"Shortlisted"}),a.jsx("option",{value:"Interview Scheduled",children:"Interview Scheduled"}),a.jsx("option",{value:"Selected",children:"Selected"}),a.jsx("option",{value:"Rejected",children:"Rejected"})]})}),a.jsx("td",{children:new Date(S.created_at).toLocaleDateString()}),a.jsx("td",{children:a.jsx("button",{onClick:()=>V(S),className:"btn btn-secondary inspect-details-btn",children:"Inspect Candidate"})})]},S.id)})})]})})]}),n==="company"&&a.jsxs("div",{className:"company-tab-view animate-fade",children:[a.jsx("h3",{className:"panel-heading",children:"Modify Corporate Profile"}),a.jsx("p",{className:"panel-subtext",children:"Manage details visible to applicants on job postings"}),a.jsxs("form",{onSubmit:ge,className:"company-edit-form-theme glass-card",children:[a.jsxs("div",{className:"form-grid-layout",children:[a.jsxs("div",{className:"logo-upload-section",children:[a.jsx("label",{className:"form-label-title",children:"Company Logo"}),a.jsxs("div",{className:"logo-preview-row",children:[a.jsx("div",{className:"company-logo-badge large-badge",children:me?a.jsx("img",{src:URL.createObjectURL(me),alt:"Logo Preview",className:"company-logo-img"}):o!=null&&o.logo?a.jsx("img",{src:`http://localhost:5000/uploads/images/${o.logo}`,alt:"Logo",className:"company-logo-img"}):a.jsx("div",{className:"logo-placeholder-avatar large-avatar",children:"CO"})}),a.jsxs("div",{className:"logo-input-instructions",children:[a.jsx("input",{type:"file",id:"logo-upload-input",accept:"image/*",onChange:S=>J(S.target.files[0]),style:{display:"none"}}),a.jsx("label",{htmlFor:"logo-upload-input",className:"btn btn-secondary upload-logo-btn",children:"Upload Logo Icon"}),a.jsx("span",{className:"file-hint-text",children:"PNG, JPG, or WEBP up to 2MB"})]})]})]}),a.jsxs("div",{className:"form-input-wrapper",children:[a.jsx("label",{className:"form-label-title",children:"Banner Image URL"}),a.jsx("input",{type:"text",placeholder:"https://example.com/banner.jpg",value:H.banner,onChange:S=>le({...H,banner:S.target.value}),className:"form-text-input"})]}),a.jsxs("div",{className:"form-input-wrapper",children:[a.jsx("label",{className:"form-label-title",children:"Company Name *"}),a.jsx("input",{type:"text",value:H.name,onChange:S=>le({...H,name:S.target.value}),className:"form-text-input",required:!0})]}),a.jsxs("div",{className:"form-input-wrapper",children:[a.jsx("label",{className:"form-label-title",children:"Website URL"}),a.jsx("input",{type:"url",value:H.website,onChange:S=>le({...H,website:S.target.value}),className:"form-text-input"})]}),a.jsxs("div",{className:"form-input-wrapper",children:[a.jsx("label",{className:"form-label-title",children:"Contact Email Address"}),a.jsx("input",{type:"email",value:H.email,onChange:S=>le({...H,email:S.target.value}),className:"form-text-input"})]}),a.jsxs("div",{className:"form-input-wrapper",children:[a.jsx("label",{className:"form-label-title",children:"Contact Phone Number"}),a.jsx("input",{type:"tel",value:H.phone,onChange:S=>le({...H,phone:S.target.value}),className:"form-text-input"})]}),a.jsxs("div",{className:"form-input-wrapper",children:[a.jsx("label",{className:"form-label-title",children:"Industry Category"}),a.jsx("input",{type:"text",placeholder:"e.g. Software, Finance, Healthcare",value:H.industry,onChange:S=>le({...H,industry:S.target.value}),className:"form-text-input"})]}),a.jsxs("div",{className:"form-input-wrapper full-width",children:[a.jsx("label",{className:"form-label-title",children:"Office Headquarter Address"}),a.jsx("input",{type:"text",placeholder:"e.g. 101, Tech Park, Bangalore",value:H.address,onChange:S=>le({...H,address:S.target.value}),className:"form-text-input"})]}),a.jsxs("div",{className:"form-input-wrapper full-width",children:[a.jsx("label",{className:"form-label-title",children:"Company Description / Summary"}),a.jsx("textarea",{rows:4,value:H.description,onChange:S=>le({...H,description:S.target.value}),className:"form-textarea-input",placeholder:"Write a brief pitch about your company culture, products, and services..."})]})]}),a.jsx("div",{className:"form-actions-bar",children:a.jsx("button",{type:"submit",className:"btn btn-primary",disabled:dt,children:dt?"Saving Profile...":"Save Profile Changes"})})]})]})]})]}),Q&&a.jsx("div",{className:"modal-backdrop-overlay animate-fade",children:a.jsxs("div",{className:"modal-glass-card-container animate-slide-up",children:[a.jsxs("div",{className:"modal-header",children:[a.jsx("h2",{className:"modal-heading",children:ne==="create"?"Publish Job Opportunity":"Update Job Opportunity Details"}),a.jsx("button",{onClick:()=>de(!1),className:"modal-close-btn",children:a.jsx(la,{size:24})})]}),a.jsxs("form",{onSubmit:wa,className:"modal-form-theme",children:[a.jsxs("div",{className:"modal-form-grid",children:[a.jsxs("div",{className:"form-input-wrapper full-width",children:[a.jsx("label",{className:"form-label-title",children:"Job Position Title *"}),a.jsx("input",{type:"text",name:"title",value:we.title,onChange:jt,className:"form-text-input",placeholder:"e.g. Senior Frontend Engineer",required:!0})]}),a.jsxs("div",{className:"form-input-wrapper",children:[a.jsx("label",{className:"form-label-title",children:"Job Type *"}),a.jsxs("select",{name:"job_type",value:we.job_type,onChange:jt,className:"form-text-input",children:[a.jsx("option",{value:"Full Time",children:"Full Time"}),a.jsx("option",{value:"Part Time",children:"Part Time"}),a.jsx("option",{value:"Remote",children:"Remote"}),a.jsx("option",{value:"Internship",children:"Internship"}),a.jsx("option",{value:"Contract",children:"Contract"})]})]}),a.jsxs("div",{className:"form-input-wrapper",children:[a.jsx("label",{className:"form-label-title",children:"Location Requirement *"}),a.jsx("input",{type:"text",name:"location",value:we.location,onChange:jt,className:"form-text-input",placeholder:"e.g. Mumbai, MH or Remote",required:!0})]}),a.jsxs("div",{className:"form-input-wrapper",children:[a.jsx("label",{className:"form-label-title",children:"Minimum Salary (Annual) *"}),a.jsx("input",{type:"number",name:"salary_min",value:we.salary_min,onChange:jt,className:"form-text-input",placeholder:"e.g. 600000",required:!0})]}),a.jsxs("div",{className:"form-input-wrapper",children:[a.jsx("label",{className:"form-label-title",children:"Maximum Salary (Annual) *"}),a.jsx("input",{type:"number",name:"salary_max",value:we.salary_max,onChange:jt,className:"form-text-input",placeholder:"e.g. 1200000",required:!0})]}),a.jsxs("div",{className:"form-input-wrapper",children:[a.jsx("label",{className:"form-label-title",children:"Experience Level Requirement *"}),a.jsxs("select",{name:"experience",value:we.experience,onChange:jt,className:"form-text-input",children:[a.jsx("option",{value:"0-1 years",children:"0-1 years (Entry)"}),a.jsx("option",{value:"1-3 years",children:"1-3 years (Junior)"}),a.jsx("option",{value:"3-5 years",children:"3-5 years (Mid)"}),a.jsx("option",{value:"5-8 years",children:"5-8 years (Senior)"}),a.jsx("option",{value:"8+ years",children:"8+ years (Lead/Director)"})]})]}),a.jsxs("div",{className:"form-input-wrapper",children:[a.jsx("label",{className:"form-label-title",children:"Job Status"}),a.jsxs("select",{name:"status",value:we.status,onChange:jt,className:"form-text-input",children:[a.jsx("option",{value:"active",children:"Active (Open to Apply)"}),a.jsx("option",{value:"inactive",children:"Inactive (Closed / Draft)"})]})]}),a.jsxs("div",{className:"form-input-wrapper full-width",children:[a.jsx("label",{className:"form-label-title",children:"Tag Required Skills"}),a.jsx("div",{className:"skills-checklist-grid",children:r.map(S=>{const U=we.skills.includes(S.id);return a.jsxs("label",{className:"skill-check-item",children:[a.jsx("input",{type:"checkbox",checked:U,onChange:()=>ro(S.id)}),a.jsx("span",{className:"skill-check-text",children:S.name})]},S.id)})})]}),a.jsxs("div",{className:"form-input-wrapper full-width",children:[a.jsx("label",{className:"form-label-title",children:"Job Role Description *"}),a.jsx("textarea",{name:"description",rows:5,value:we.description,onChange:jt,className:"form-textarea-input",placeholder:"Outline job responsibilities, candidate specifications, perks, and requirements...",required:!0})]})]}),a.jsxs("div",{className:"modal-actions-bar",children:[a.jsx("button",{type:"button",onClick:()=>de(!1),className:"btn btn-secondary",children:"Cancel"}),a.jsx("button",{type:"submit",className:"btn btn-primary",disabled:F,children:F?"Processing...":ne==="create"?"Publish Job Opportunity":"Save Details"})]})]})]})}),I&&a.jsx("div",{className:"modal-backdrop-overlay animate-fade",children:a.jsxs("div",{className:"drawer-panel-container animate-slide-left",children:[a.jsxs("div",{className:"drawer-header",children:[a.jsx("h3",{className:"drawer-heading",children:"Candidate Dossier Inspect"}),a.jsx("button",{onClick:()=>V(null),className:"drawer-close-btn",children:a.jsx(la,{size:24})})]}),a.jsxs("div",{className:"drawer-scroll-body",children:[a.jsxs("div",{className:"drawer-profile-card text-center",children:[a.jsx("div",{className:"drawer-avatar",children:a.jsx(rn,{size:32})}),a.jsxs("h2",{className:"profile-fullname",children:[I.first_name," ",I.last_name]}),a.jsxs("span",{className:"profile-role-sub text-tertiary",children:["Applicant to ",a.jsx("b",{children:I.job_title})]})]}),a.jsxs("div",{className:"drawer-status-card glass-panel",children:[a.jsx("h4",{className:"detail-section-title",children:"Workflow Pipeline Status"}),a.jsx("div",{className:"status-updater-row",children:a.jsxs("select",{value:I.status,onChange:S=>G(I.id,S.target.value),disabled:Z,className:`status-dropdown-select large-dropdown ${(Zl=I.status)==null?void 0:Zl.toLowerCase().replace(" ","-")}`,children:[a.jsx("option",{value:"Applied",children:"Applied"}),a.jsx("option",{value:"Under Review",children:"Under Review"}),a.jsx("option",{value:"Shortlisted",children:"Shortlisted"}),a.jsx("option",{value:"Interview Scheduled",children:"Interview Scheduled"}),a.jsx("option",{value:"Selected",children:"Selected"}),a.jsx("option",{value:"Rejected",children:"Rejected"})]})})]}),a.jsxs("div",{className:"drawer-detail-card glass-panel",children:[a.jsx("h4",{className:"detail-section-title",children:"Skills Assessment"}),a.jsx("div",{className:"skills-match-status-row",children:I.has_required_skills?a.jsxs("div",{className:"match-flag high-match",children:[a.jsx(Oo,{size:16})," Matches at least 60% of job requirements"]}):a.jsxs("div",{className:"match-flag low-match",children:[a.jsx(jf,{size:16})," Under required skills threshold"]})}),a.jsx("h5",{className:"sub-title",children:"Candidate Asserted Skills:"}),a.jsx("div",{className:"skills-tags-row font-sans",children:(I.skills||"None declared").split(",").map((S,U)=>a.jsx("span",{className:"skill-badge-tag",children:S.trim()},U))})]}),a.jsxs("div",{className:"drawer-detail-card glass-panel",children:[a.jsx("h4",{className:"detail-section-title",children:"Candidate Contact Information"}),a.jsxs("div",{className:"info-list-rows font-sans",children:[a.jsxs("div",{className:"info-item",children:[a.jsx(un,{size:16,className:"info-icon"}),a.jsx("span",{children:I.email})]}),I.phone&&a.jsxs("div",{className:"info-item",children:[a.jsx(Wl,{size:16,className:"info-icon"}),a.jsx("span",{children:I.phone})]})]})]}),a.jsxs("div",{className:"drawer-detail-card glass-panel text-center",children:[a.jsx("h4",{className:"detail-section-title",children:"Submitted Resume Document"}),a.jsxs("div",{className:"resume-icon-badge flex-center-col",children:[(ec=I.resume)!=null&&ec.endsWith(".pdf")?a.jsx(Qr,{size:42,className:"resume-icon red"}):a.jsx(Ig,{size:42,className:"resume-icon blue"}),a.jsx("span",{className:"resume-file-label",children:I.resume||"resume.pdf"})]}),I.resume?a.jsxs("a",{href:`http://localhost:5000/uploads/resumes/${I.resume}`,target:"_blank",rel:"noreferrer",className:"btn btn-primary download-resume-action-btn",children:[a.jsx(Di,{size:16})," Open & Download Document"]}):a.jsx("p",{className:"no-resume-text text-danger",children:"No resume document attached."})]}),a.jsxs("div",{className:"drawer-detail-card glass-panel",children:[a.jsx("h4",{className:"detail-section-title",children:"Structured Cover Letter & Details"}),a.jsx("pre",{className:"cover-letter-preview",children:I.cover_letter||"No additional details provided."})]})]})]})}),a.jsx("style",{children:`
        .recruiter-dashboard-layout {
          max-width: var(--container-max);
          margin: 40px auto;
          padding: 0 20px;
          color: var(--text-primary);
        }

        /* 1. Hero Panel styling */
        .dashboard-hero-panel {
          position: relative;
          background: linear-gradient(135deg, #2b170c 0%, #0d1324 100%);
          border-radius: var(--radius-lg);
          padding: 40px;
          margin-bottom: 30px;
          border: 1px solid var(--border-color);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
        }

        .hero-glass-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at top right, rgba(255, 81, 0, 0.12), transparent 60%);
          pointer-events: none;
        }

        .hero-content-row {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .company-logo-badge {
          width: 90px;
          height: 90px;
          background-color: #ffffff;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border: 2px solid var(--primary);
          box-shadow: var(--shadow-md);
        }

        .company-logo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .logo-placeholder-avatar {
          font-family: var(--font-display);
          font-size: 32px;
          font-weight: 800;
          color: var(--primary);
        }

        .company-meta-details {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .company-title {
          font-family: var(--font-display);
          font-size: 32px;
          font-weight: 800;
          letter-spacing: -0.5px;
          color: #ffffff;
          margin: 0;
        }

        .recruiter-badge {
          color: var(--text-secondary);
          font-size: 14px;
          margin: 0;
        }

        .company-link-btn {
          align-self: flex-start;
          margin-top: 6px;
          color: var(--primary);
          font-weight: 600;
          font-size: 13.5px;
          text-decoration: none;
          transition: color var(--transition-fast);
        }

        .company-link-btn:hover {
          color: var(--primary-hover);
          text-decoration: underline;
        }

        /* 2. Grid stats quick cards */
        .dashboard-grid-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 35px;
        }

        .stat-glass-card {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          box-shadow: var(--shadow-sm);
          transition: all var(--transition-normal);
        }

        .stat-glass-card.hover-glow:hover {
          transform: translateY(-2px);
          border-color: var(--primary-glow);
          box-shadow: var(--shadow-lg), 0 0 15px var(--primary-glow);
        }

        .stat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .stat-title {
          font-size: 13px;
          font-weight: 700;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .stat-icon {
          color: var(--text-tertiary);
        }

        .stat-icon.orange-icon {
          color: var(--primary);
        }

        .stat-icon.green-icon {
          color: var(--success);
        }

        .stat-value {
          font-family: var(--font-display);
          font-size: 28px;
          font-weight: 800;
          color: var(--text-primary);
        }

        .stat-meta {
          font-size: 12px;
          color: var(--text-tertiary);
        }

        /* 3. Navigation Controls tabs */
        .dashboard-nav-tabs {
          display: flex;
          gap: 10px;
          border-bottom: 2px solid var(--border-color);
          margin-bottom: 30px;
          overflow-x: auto;
          padding-bottom: 2px;
        }

        .tab-link {
          background: none;
          border: none;
          padding: 14px 24px;
          font-family: var(--font-sans);
          font-weight: 700;
          font-size: 14px;
          color: var(--text-secondary);
          cursor: pointer;
          position: relative;
          transition: color var(--transition-fast);
          white-space: nowrap;
        }

        .tab-link:hover {
          color: var(--primary);
        }

        .tab-link-active {
          color: var(--text-primary);
        }

        .tab-link-active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 3px;
          background-color: var(--primary);
          border-radius: var(--radius-full);
        }

        /* 4. Tab contents common styling */
        .tab-render-container {
          min-height: 300px;
        }

        .tab-action-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
          gap: 20px;
        }

        .panel-heading {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 800;
          margin: 0 0 4px 0;
          color: var(--text-primary);
        }

        .panel-subtext {
          font-size: 13.5px;
          color: var(--text-secondary);
          margin: 0;
        }

        /* Overview Tab Layout */
        .overview-graphics-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 25px;
          margin-bottom: 30px;
        }

        .chart-glass-panel {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 24px;
          box-shadow: var(--shadow-sm);
        }

        .flex-center-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .svg-chart-container {
          width: 100%;
          margin-top: 15px;
        }

        .svg-area-chart {
          width: 100%;
          height: auto;
          display: block;
        }

        .progress-ring-container {
          position: relative;
          width: 120px;
          height: 120px;
          margin-top: 25px;
        }

        .progress-ring-fill {
          transform: rotate(-90deg);
          transform-origin: 60px 60px;
          transition: stroke-dashoffset 0.8s ease-in-out;
        }

        .progress-ring-text {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          line-height: 1;
        }

        .percent-val {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 800;
          color: var(--text-primary);
        }

        .percent-label {
          font-size: 9px;
          font-weight: 700;
          color: var(--text-tertiary);
          text-transform: uppercase;
          margin-top: 2px;
        }

        .panel-listing-card {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 24px;
          box-shadow: var(--shadow-sm);
        }

        .panel-listing-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .link-text-btn {
          background: none;
          border: none;
          color: var(--primary);
          font-weight: 700;
          font-size: 13.5px;
          cursor: pointer;
          transition: color var(--transition-fast);
        }

        .link-text-btn:hover {
          color: var(--primary-hover);
          text-decoration: underline;
        }

        /* Glass table layout defaults */
        .responsive-table-wrapper {
          width: 100%;
          overflow-x: auto;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
        }

        .glass-table-layout {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 14px;
        }

        .glass-table-layout th {
          background-color: var(--bg-tertiary);
          color: var(--text-secondary);
          font-weight: 700;
          padding: 16px 20px;
          border-bottom: 1px solid var(--border-color);
          font-family: var(--font-display);
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .glass-table-layout td {
          padding: 16px 20px;
          border-bottom: 1px solid var(--border-color);
          color: var(--text-primary);
          vertical-align: middle;
        }

        .glass-table-layout tbody tr:last-child td {
          border-bottom: none;
        }

        .glass-table-layout tbody tr:hover td {
          background-color: rgba(255, 81, 0, 0.015);
        }

        /* Cell detail blocks */
        .applicant-cell-info {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .c-name {
          font-weight: 700;
          font-size: 14.5px;
        }

        .c-email {
          color: var(--text-secondary);
          font-size: 12px;
        }

        .c-phone {
          color: var(--text-tertiary);
          font-size: 11.5px;
        }

        .skills-tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .skill-badge-tag {
          font-size: 11px;
          background-color: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xs);
          padding: 3px 8px;
          color: var(--text-secondary);
        }

        .skill-badge-tag-more {
          font-size: 10px;
          font-weight: 700;
          color: var(--primary);
          background-color: var(--primary-glow);
          border-radius: var(--radius-xs);
          padding: 3px 6px;
        }

        .match-pill {
          display: inline-flex;
          align-items: center;
          padding: 4px 10px;
          font-size: 11.5px;
          font-weight: 700;
          border-radius: var(--radius-full);
          line-height: 1;
        }

        .match-pill.green-pill {
          background-color: var(--success-glow);
          color: var(--success);
        }

        .match-pill.gray-pill {
          background-color: var(--bg-tertiary);
          color: var(--text-tertiary);
        }

        .status-pill {
          display: inline-block;
          font-size: 11.5px;
          font-weight: 700;
          padding: 5px 12px;
          border-radius: var(--radius-full);
          text-align: center;
          line-height: 1;
        }

        .status-pill.applied {
          background-color: var(--primary-glow);
          color: var(--primary);
        }

        .status-pill.under-review {
          background-color: rgba(245, 158, 11, 0.12);
          color: var(--warning);
        }

        .status-pill.shortlisted {
          background-color: var(--success-glow);
          color: var(--success);
        }

        .status-pill.interview-scheduled {
          background-color: rgba(59, 130, 246, 0.12);
          color: #3b82f6;
        }

        .status-pill.selected {
          background-color: rgba(16, 185, 129, 0.2);
          color: var(--success);
          border: 1px solid var(--success);
        }

        .status-pill.rejected {
          background-color: var(--danger-glow);
          color: var(--danger);
        }

        /* Status toggles & dropdown inputs */
        .status-dropdown-select {
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          background-color: var(--bg-secondary);
          color: var(--text-primary);
          padding: 6px 12px;
          font-size: 12.5px;
          font-weight: 700;
          outline: none;
          cursor: pointer;
          transition: border var(--transition-fast);
        }

        .status-dropdown-select:hover {
          border-color: var(--primary);
        }

        .status-dropdown-select.applied { border-left: 4px solid var(--primary); }
        .status-dropdown-select.under-review { border-left: 4px solid var(--warning); }
        .status-dropdown-select.shortlisted { border-left: 4px solid var(--success); }
        .status-dropdown-select.interview-scheduled { border-left: 4px solid #3b82f6; }
        .status-dropdown-select.selected { border-left: 4px solid var(--success); }
        .status-dropdown-select.rejected { border-left: 4px solid var(--danger); }

        .btn-table-action {
          border: none;
          background: none;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          transition: color var(--transition-fast);
        }

        .btn-table-action.view-btn {
          color: var(--primary);
        }

        .btn-table-action.view-btn:hover {
          color: var(--primary-hover);
          text-decoration: underline;
        }

        /* Job listing tab specific status button */
        .job-title-cell {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .job-date {
          font-size: 11px;
          color: var(--text-tertiary);
        }

        .job-type-badge {
          background-color: var(--peach-light);
          border: 1px solid var(--peach-border);
          color: var(--primary);
          font-size: 12px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: var(--radius-xs);
        }

        .status-indicator-btn {
          border: 1px solid var(--border-color);
          background-color: var(--bg-tertiary);
          border-radius: var(--radius-full);
          padding: 4px 12px;
          font-size: 12px;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .status-indicator-btn .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .status-indicator-btn.active-stat {
          color: var(--success);
          border-color: rgba(16, 185, 129, 0.3);
          background-color: var(--success-glow);
        }

        .status-indicator-btn.active-stat .dot {
          background-color: var(--success);
        }

        .status-indicator-btn.inactive-stat {
          color: var(--text-tertiary);
          border-color: var(--border-color);
          background-color: var(--bg-tertiary);
        }

        .status-indicator-btn.inactive-stat .dot {
          background-color: var(--text-tertiary);
        }

        .table-actions-row {
          display: flex;
          gap: 8px;
        }

        .action-icon-btn {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-xs);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border-color);
          background-color: var(--bg-secondary);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .action-icon-btn.edit-icon-btn:hover {
          color: var(--primary);
          border-color: var(--primary);
          background-color: var(--primary-glow);
        }

        .action-icon-btn.delete-icon-btn:hover {
          color: var(--danger);
          border-color: var(--danger);
          background-color: var(--danger-glow);
        }

        /* Filter ribbon card styling */
        .filters-ribbon-card {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 16px 20px;
          margin-bottom: 25px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          box-shadow: var(--shadow-sm);
        }

        .search-bar-wrapper {
          position: relative;
          flex-grow: 1;
          max-width: 450px;
          display: flex;
          align-items: center;
        }

        .search-bar-icon {
          position: absolute;
          left: 14px;
          color: var(--text-tertiary);
        }

        .search-bar-input {
          width: 100%;
          height: 44px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
          background-color: var(--bg-tertiary);
          outline: none;
          color: var(--text-primary);
          padding: 0 16px 0 44px;
          font-family: var(--font-sans);
          font-size: 14px;
          transition: all var(--transition-fast);
        }

        .search-bar-input:focus {
          border-color: var(--primary);
          background-color: var(--bg-secondary);
          box-shadow: 0 0 0 3px var(--primary-glow);
        }

        .select-filters-row {
          display: flex;
          gap: 16px;
        }

        .filter-select-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13.5px;
        }

        .filter-select-wrapper label {
          font-weight: 700;
          color: var(--text-secondary);
          white-space: nowrap;
        }

        .filter-select-wrapper select {
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          background-color: var(--bg-tertiary);
          color: var(--text-primary);
          height: 44px;
          padding: 0 14px;
          font-weight: 600;
          outline: none;
          cursor: pointer;
        }

        .filter-select-wrapper select:focus {
          border-color: var(--primary);
        }

        /* Company Form inputs */
        .company-edit-form-theme {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 30px;
          box-shadow: var(--shadow-sm);
        }

        .form-grid-layout {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .logo-upload-section {
          grid-column: span 2;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 24px;
          margin-bottom: 8px;
        }

        .logo-preview-row {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-top: 10px;
        }

        .company-logo-badge.large-badge {
          width: 80px;
          height: 80px;
          border-radius: var(--radius-md);
        }

        .logo-placeholder-avatar.large-avatar {
          font-size: 28px;
        }

        .logo-input-instructions {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .file-hint-text {
          font-size: 12px;
          color: var(--text-tertiary);
        }

        .form-input-wrapper {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-input-wrapper.full-width {
          grid-column: span 2;
        }

        .form-label-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 13.5px;
          color: var(--text-secondary);
        }

        .form-text-input {
          height: 48px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
          background-color: var(--bg-tertiary);
          outline: none;
          color: var(--text-primary);
          padding: 0 16px;
          font-family: var(--font-sans);
          font-size: 14.5px;
          transition: all var(--transition-fast);
        }

        .form-text-input:focus {
          border-color: var(--primary);
          background-color: var(--bg-secondary);
          box-shadow: 0 0 0 3px var(--primary-glow);
        }

        .form-textarea-input {
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
          background-color: var(--bg-tertiary);
          outline: none;
          color: var(--text-primary);
          padding: 14px 16px;
          font-family: var(--font-sans);
          font-size: 14.5px;
          resize: vertical;
          transition: all var(--transition-fast);
        }

        .form-textarea-input:focus {
          border-color: var(--primary);
          background-color: var(--bg-secondary);
          box-shadow: 0 0 0 3px var(--primary-glow);
        }

        .form-actions-bar {
          margin-top: 30px;
          border-top: 1px solid var(--border-color);
          padding-top: 24px;
          display: flex;
          justify-content: flex-end;
        }

        /* 5. Modal Dialog Box styling */
        .modal-backdrop-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .modal-glass-card-container {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          width: 100%;
          max-width: 750px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: var(--shadow-xl);
          display: flex;
          flex-direction: column;
        }

        .modal-header {
          padding: 24px 30px;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-heading {
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 800;
          margin: 0;
        }

        .modal-close-btn {
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          transition: color var(--transition-fast);
        }

        .modal-close-btn:hover {
          color: var(--primary);
        }

        .modal-form-theme {
          padding: 30px;
        }

        .modal-form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-bottom: 30px;
        }

        .skills-checklist-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          background-color: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 16px;
          max-height: 180px;
          overflow-y: auto;
        }

        .skill-check-item {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }

        .skill-check-item input {
          accent-color: var(--primary);
          width: 16px;
          height: 16px;
        }

        .skill-check-text {
          font-size: 13px;
          color: var(--text-secondary);
        }

        .modal-actions-bar {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          border-top: 1px solid var(--border-color);
          padding-top: 20px;
        }

        /* 6. Candidate Detail Inspect Drawer Panel styling */
        .drawer-panel-container {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          max-width: 500px;
          background-color: var(--bg-secondary);
          border-left: 1px solid var(--border-color);
          box-shadow: var(--shadow-xl);
          z-index: 2100;
          display: flex;
          flex-direction: column;
        }

        .drawer-header {
          padding: 24px;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .drawer-heading {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 800;
          margin: 0;
        }

        .drawer-close-btn {
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
        }

        .drawer-scroll-body {
          flex-grow: 1;
          overflow-y: auto;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .drawer-profile-card {
          padding: 20px 0;
          border-bottom: 1px solid var(--border-color);
        }

        .drawer-avatar {
          width: 64px;
          height: 64px;
          background-color: var(--primary-glow);
          color: var(--primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 12px auto;
        }

        .profile-fullname {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 800;
          margin: 0 0 4px 0;
        }

        .profile-role-sub {
          font-size: 13.5px;
        }

        .glass-panel {
          background-color: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 16px;
        }

        .detail-section-title {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-secondary);
          margin: 0 0 12px 0;
        }

        .status-updater-row {
          display: flex;
          width: 100%;
        }

        .status-dropdown-select.large-dropdown {
          width: 100%;
          height: 48px;
          font-size: 14.5px;
        }

        .skills-match-status-row {
          margin-bottom: 14px;
        }

        .match-flag {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 700;
          padding: 8px 12px;
          border-radius: var(--radius-xs);
        }

        .match-flag.high-match {
          background-color: var(--success-glow);
          color: var(--success);
        }

        .match-flag.low-match {
          background-color: var(--danger-glow);
          color: var(--danger);
        }

        .sub-title {
          font-size: 12.5px;
          font-weight: 700;
          color: var(--text-secondary);
          margin: 0 0 8px 0;
        }

        .info-list-rows {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 13.5px;
        }

        .info-icon {
          color: var(--text-tertiary);
        }

        .resume-icon-badge {
          gap: 10px;
          margin-bottom: 14px;
        }

        .resume-icon {
          padding: 4px;
        }

        .resume-icon.red { color: var(--danger); }
        .resume-icon.blue { color: #3b82f6; }

        .resume-file-label {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .download-resume-action-btn {
          width: 100%;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-weight: 700;
          text-decoration: none;
        }

        .cover-letter-preview {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xs);
          padding: 14px;
          white-space: pre-wrap;
          font-family: var(--font-sans);
          font-size: 13px;
          line-height: 1.5;
          max-height: 250px;
          overflow-y: auto;
          color: var(--text-primary);
          margin: 0;
        }

        /* 7. General utility styles */
        .empty-state-panel {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px;
          text-align: center;
          color: var(--text-tertiary);
          gap: 12px;
        }

        .empty-state-panel.large-empty {
          padding: 80px 40px;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
        }

        .empty-icon {
          color: var(--border-color);
        }

        /* Animation timings */
        .animate-fade {
          animation: dashboardFade 0.3s ease-out forwards;
        }

        .animate-slide-up {
          animation: dashboardSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-slide-left {
          animation: dashboardSlideLeft 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes dashboardFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes dashboardSlideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes dashboardSlideLeft {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        /* 8. Responsiveness breakdown */
        @media (max-width: 992px) {
          .dashboard-grid-stats {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .overview-graphics-grid {
            grid-template-columns: 1fr;
          }

          .form-grid-layout {
            grid-template-columns: 1fr;
          }
          
          .logo-upload-section, .form-input-wrapper.full-width {
            grid-column: span 1;
          }

          .modal-form-grid {
            grid-template-columns: 1fr;
          }
          
          .form-input-wrapper.full-width {
            grid-column: span 1;
          }

          .skills-checklist-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 576px) {
          .dashboard-grid-stats {
            grid-template-columns: 1fr;
          }

          .hero-content-row {
            flex-direction: column;
            text-align: center;
            gap: 16px;
          }

          .company-logo-badge {
            margin: 0 auto;
          }

          .company-meta-details {
            align-items: center;
          }

          .company-link-btn {
            align-self: center;
          }

          .tab-action-header-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .filters-ribbon-card {
            flex-direction: column;
            align-items: stretch;
          }

          .select-filters-row {
            flex-direction: column;
            gap: 12px;
          }

          .skills-checklist-grid {
            grid-template-columns: 1fr;
          }
        }
      `})]})},oy=()=>{const[e,t]=b.useState({email:"",password:""}),[r,n]=b.useState(!1),[s,o]=b.useState(!1),[i,l]=b.useState(!0),[c,d]=b.useState(!0),{login:u,isAuthenticated:f}=Ht(),{showToast:g}=et(),w=lt(),h=Ze();b.useEffect(()=>{f&&w("/dashboard")},[f,w]);const y=p=>{const{name:m,value:x}=p.target;t(v=>({...v,[m]:x}))},j=async p=>{var N,C;p.preventDefault();const{email:m,password:x}=e;if(!m||!x){g("Please fill in all inputs.","warning");return}if(!c){g("You must agree to the Terms and Conditions according to the company norms.","warning");return}n(!0);const v=await u(m,x);if(n(!1),v.success){const _=((C=(N=h.state)==null?void 0:N.from)==null?void 0:C.pathname)||"/dashboard";w(_)}};return a.jsxs("main",{className:"login-page animate-fade",children:[a.jsxs("div",{className:"login-landscape-card",children:[a.jsx("div",{className:"login-left-panel",children:a.jsxs("div",{className:"left-panel-content",children:[a.jsxs("h2",{className:"left-title",children:["Are you new user to ",a.jsx("br",{}),"JobForge ?"]}),a.jsx(B,{to:"/register",className:"left-toggle-btn",children:"Sign-Up"})]})}),a.jsx("div",{className:"login-right-panel",children:a.jsx("div",{className:"login-glass-card",children:a.jsxs("form",{onSubmit:j,className:"auth-form-theme",children:[a.jsxs("div",{className:"auth-input-wrapper",children:[a.jsx("div",{className:"auth-input-bar"}),a.jsx("input",{type:"email",id:"email",name:"email",placeholder:"abc@gmail.com",className:"auth-input-field",value:e.email,onChange:y,required:!0})]}),a.jsxs("div",{className:"auth-input-wrapper",children:[a.jsx("div",{className:"auth-input-bar"}),a.jsx("input",{type:s?"text":"password",id:"password",name:"password",placeholder:"************",className:"auth-input-field",value:e.password,onChange:y,required:!0}),a.jsx("button",{type:"button",className:"password-toggle-btn",onClick:()=>o(!s),"aria-label":s?"Hide password":"Show password",children:s?a.jsx(gf,{size:22}):a.jsx(vf,{size:22})})]}),a.jsxs("div",{className:"auth-options-row",children:[a.jsxs("label",{className:"checkbox-container",children:[a.jsx("input",{type:"checkbox",checked:i,onChange:p=>l(p.target.checked)}),a.jsx("span",{className:"checkbox-text",children:"Remember me"})]}),a.jsx(B,{to:"/forgot-password",className:"forgot-password-link",children:"Forgot Password ?"})]}),a.jsxs("label",{className:"checkbox-container terms-checkbox",children:[a.jsx("input",{type:"checkbox",checked:c,onChange:p=>d(p.target.checked)}),a.jsxs("span",{className:"checkbox-text",children:["I, agree to all the ",a.jsx("span",{className:"bold-white-text",children:"Terms and Conditions"})," according to the company norms"]})]}),a.jsx("button",{type:"submit",className:"auth-submit-btn",disabled:r,children:r?a.jsx("span",{className:"spinner",style:{width:"20px",height:"20px",borderWidth:"2px",borderColor:"#ffffff",borderTopColor:"transparent"}}):"Sign-in"}),a.jsxs("div",{className:"social-buttons-row",children:[a.jsxs("button",{type:"button",className:"social-login-btn google",children:[a.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"social-icon",children:[a.jsx("path",{d:"M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z",fill:"#4285F4"}),a.jsx("path",{d:"M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",fill:"#34A853"}),a.jsx("path",{d:"M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.87-2.6-2.86-4.53-5.84-4.53z",fill:"#FBBC05"}),a.jsx("path",{d:"M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z",fill:"#EA4335"})]}),a.jsx("span",{children:"Login via Google"})]}),a.jsxs("button",{type:"button",className:"social-login-btn linkedin",children:[a.jsx("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"social-icon",children:a.jsx("path",{d:"M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",fill:"#0077B5"})}),a.jsx("span",{children:"Login via LinkedIn"})]})]})]})})})]}),a.jsx("style",{children:`
        .login-page {
          min-height: calc(100vh - 72px);
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--bg-primary);
          padding: 40px 20px;
          font-family: 'Georgia', 'Times New Roman', serif;
        }

        .login-landscape-card {
          display: flex;
          width: 100%;
          max-width: 1040px;
          min-height: 620px;
          background: url('/sunset_lake.png') no-repeat center center / cover;
          border-radius: 40px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
          overflow: hidden;
          position: relative;
        }

        /* Add a very subtle overlay on the card background to ensure text contrast */
        .login-landscape-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.05);
          pointer-events: none;
          z-index: 1;
        }

        .login-left-panel {
          position: relative;
          z-index: 2;
          width: 38%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 40px;
        }

        .left-panel-content {
          text-align: center;
          max-width: 320px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .left-title {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 26px;
          font-weight: 500;
          color: #ffffff;
          line-height: 1.35;
          margin-bottom: 30px;
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }

        .left-toggle-btn {
          display: inline-block;
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 22px;
          font-weight: 400;
          color: #ffffff;
          background-color: rgba(255, 255, 255, 0.18);
          border: 1px solid #ffffff;
          border-radius: 16px;
          padding: 12px 45px;
          transition: all 0.3s ease;
          text-shadow: 0 1px 2px rgba(0,0,0,0.3);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
        }

        .left-toggle-btn:hover {
          background-color: rgba(255, 255, 255, 0.3);
          border-color: #ffffff;
          transform: scale(1.03);
          box-shadow: 0 6px 20px rgba(255, 255, 255, 0.2);
        }

        .login-right-panel {
          position: relative;
          z-index: 2;
          width: 62%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 60px;
        }

        .login-glass-card {
          width: 100%;
          max-width: 460px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(12px) saturate(110%);
          -webkit-backdrop-filter: blur(12px) saturate(110%);
          border-radius: 30px;
          border: 1px solid rgba(255, 255, 255, 0.25);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25);
          padding: 40px;
        }

        .auth-form-theme {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        /* Custom inputs styling */
        .auth-input-wrapper {
          display: flex;
          align-items: stretch;
          background-color: #ffffff;
          border-radius: 14px;
          height: 56px;
          overflow: hidden;
          margin-bottom: 24px;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
          position: relative;
        }

        .auth-input-bar {
          width: 14px;
          background-color: #ff5100;
          flex-shrink: 0;
        }

        .auth-input-field {
          font-family: 'Georgia', 'Times New Roman', serif;
          border: none;
          outline: none;
          background: transparent;
          padding: 0 16px 0 20px;
          flex-grow: 1;
          font-size: 18px;
          font-weight: 500;
          color: #333333;
          height: 100%;
        }

        .auth-input-field::placeholder {
          color: #888888;
          font-weight: 400;
          font-family: 'Georgia', 'Times New Roman', serif;
        }

        .password-toggle-btn {
          border: none;
          background: transparent;
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ff5100;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .password-toggle-btn:hover {
          color: #cc4100;
        }

        /* Options Row (Remember me + Forgot password) */
        .auth-options-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .checkbox-container {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          user-select: none;
        }

        .checkbox-container input {
          width: 18px;
          height: 18px;
          cursor: pointer;
          accent-color: #ff5100;
        }

        .checkbox-text {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 13.5px;
          color: #ffffff;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
          line-height: 1.4;
        }

        .bold-white-text {
          font-weight: 700;
          color: #ffffff;
        }

        .forgot-password-link {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 13.5px;
          color: #ff5100;
          font-weight: 500;
          transition: color 0.2s ease;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }

        .forgot-password-link:hover {
          color: #ff854d;
          text-decoration: underline;
        }

        .terms-checkbox {
          margin-bottom: 24px;
        }

        /* Solid Orange Submit Button */
        .auth-submit-btn {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 22px;
          font-weight: 500;
          color: #ffffff;
          background-color: #ff5100;
          border: none;
          border-radius: 16px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 6px 20px rgba(255, 81, 0, 0.35);
          margin-bottom: 24px;
        }

        .auth-submit-btn:hover {
          background-color: #e04800;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(255, 81, 0, 0.45);
        }

        .auth-submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        /* Social buttons */
        .social-buttons-row {
          display: flex;
          gap: 16px;
          width: 100%;
        }

        .social-login-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          height: 52px;
          background-color: rgba(255, 255, 255, 0.15);
          border: 1px solid #ff5100;
          border-radius: 16px;
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 15px;
          font-weight: 500;
          color: #ff5100;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .social-login-btn:hover {
          background-color: rgba(255, 81, 0, 0.15);
          border-color: #ff854d;
          color: #ff5100;
          transform: translateY(-1px);
        }

        .social-icon {
          flex-shrink: 0;
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.15));
        }

        /* Responsive designs */
        @media (max-width: 992px) {
          .login-landscape-card {
            flex-direction: column;
            min-height: auto;
            border-radius: 30px;
          }

          .login-left-panel {
            width: 100%;
            padding: 40px 20px 20px 20px;
          }

          .left-title {
            margin-bottom: 16px;
            font-size: 22px;
          }

          .left-toggle-btn {
            font-size: 18px;
            padding: 8px 30px;
            border-radius: 12px;
          }

          .login-right-panel {
            width: 100%;
            padding: 20px 24px 40px 24px;
          }

          .login-glass-card {
            max-width: 100%;
            padding: 24px;
            border-radius: 24px;
          }

          .auth-input-wrapper {
            height: 50px;
            margin-bottom: 18px;
          }

          .auth-input-field {
            font-size: 16px;
          }

          .auth-submit-btn {
            height: 50px;
            font-size: 18px;
            border-radius: 12px;
          }

          .social-login-btn {
            height: 48px;
            font-size: 13.5px;
            border-radius: 12px;
            gap: 6px;
          }
        }

        @media (max-width: 480px) {
          .login-landscape-card {
            border-radius: 20px;
          }
          .login-left-panel {
            padding: 30px 15px 15px 15px;
          }
          .login-right-panel {
            padding: 15px 15px 30px 15px;
          }
          .social-buttons-row {
            flex-direction: column;
            gap: 12px;
          }
          .social-login-btn {
            width: 100%;
          }
        }
      `})]})},iy=()=>{const[e,t]=b.useState({name:"",phone:"",email:"",password:"",role:"candidate",company_id:"",position:""}),[r,n]=b.useState([]),[s,o]=b.useState(!1),[i,l]=b.useState(!1),[c,d]=b.useState(!0),{register:u,isAuthenticated:f}=Ht(),{showToast:g}=et(),w=lt();b.useEffect(()=>{f&&w("/dashboard")},[f,w]),b.useEffect(()=>{(async()=>{try{const m=await ie.get("http://localhost:5000/api/companies");m.data.success&&n(m.data.data)}catch(m){console.error("Failed to load companies helper list:",m)}})()},[]);const h=p=>{const{name:m,value:x}=p.target;t(v=>({...v,[m]:x}))},y=p=>{t(m=>({...m,role:p}))},j=async p=>{p.preventDefault();const{name:m,phone:x,email:v,password:N,role:C,company_id:_,position:R}=e;if(!m||!v||!N){g("Please complete all required fields.","warning");return}if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(N)){g("Password must be at least 8 characters, and contain uppercase, lowercase, number, and special character.","warning");return}if(C==="recruiter"&&!_){g("Recruiters must select an associated company.","warning");return}if(!c){g("You must agree to the Terms and Conditions to proceed.","warning");return}const A=m.trim().split(/\s+/),Q=A[0]||"",de=A.slice(1).join(" ")||".",ne=x?`+91 ${x.trim()}`:"";o(!0);const X=await u({first_name:Q,last_name:de,email:v,phone:ne,password:N,confirm_password:N,role:C,company_id:C==="recruiter"?parseInt(_):void 0,position:C==="recruiter"?R:void 0});o(!1),X.success&&w("/login")};return a.jsxs("main",{className:"register-page animate-fade",children:[a.jsxs("div",{className:"register-landscape-card",children:[a.jsx("div",{className:"register-left-panel",children:a.jsxs("div",{className:"left-panel-content",children:[a.jsx("h2",{className:"left-title",children:"Already have an account ?"}),a.jsx(B,{to:"/login",className:"left-toggle-btn",children:"Sign-in"})]})}),a.jsx("div",{className:"register-right-panel",children:a.jsx("div",{className:"register-glass-card",children:a.jsxs("form",{onSubmit:j,className:"auth-form-theme",children:[a.jsxs("div",{className:"role-picker-container",children:[a.jsx("button",{type:"button",className:`role-btn ${e.role==="candidate"?"active":""}`,onClick:()=>y("candidate"),children:"Candidate"}),a.jsx("button",{type:"button",className:`role-btn ${e.role==="recruiter"?"active":""}`,onClick:()=>y("recruiter"),children:"Recruiter / Employer"})]}),a.jsxs("div",{className:"auth-row-double",children:[a.jsxs("div",{className:"auth-input-wrapper",children:[a.jsx("div",{className:"auth-input-bar"}),a.jsx("input",{type:"text",id:"name",name:"name",placeholder:"Fullname",className:"auth-input-field",value:e.name,onChange:h,required:!0})]}),a.jsxs("div",{className:"auth-input-wrapper",children:[a.jsx("div",{className:"auth-input-bar"}),a.jsx("span",{className:"phone-country-code",children:"+91 |"}),a.jsx("input",{type:"tel",id:"phone",name:"phone",placeholder:"9182177208",className:"phone-input-field text-phone",value:e.phone,onChange:h})]})]}),a.jsxs("div",{className:"auth-input-wrapper",children:[a.jsx("div",{className:"auth-input-bar"}),a.jsx("input",{type:"email",id:"email",name:"email",placeholder:"abc@gmail.com",className:"auth-input-field",value:e.email,onChange:h,required:!0})]}),a.jsxs("div",{className:"auth-input-wrapper",children:[a.jsx("div",{className:"auth-input-bar"}),a.jsx("input",{type:i?"text":"password",id:"password",name:"password",placeholder:"Password@1234",className:"auth-input-field",value:e.password,onChange:h,required:!0}),a.jsx("button",{type:"button",className:"password-toggle-btn",onClick:()=>l(!i),"aria-label":i?"Hide password":"Show password",children:i?a.jsx(gf,{size:22}):a.jsx(vf,{size:22})})]}),e.role==="recruiter"&&a.jsxs("div",{className:"recruiter-fields animate-fade",children:[a.jsxs("div",{className:"auth-input-wrapper select-wrapper",children:[a.jsx("div",{className:"auth-input-bar"}),a.jsxs("select",{name:"company_id",className:"auth-select-field",value:e.company_id,onChange:h,required:!0,children:[a.jsx("option",{value:"",children:"Select Associated Company *"}),r.map(p=>a.jsx("option",{value:p.id,children:p.name},p.id))]})]}),a.jsxs("div",{className:"auth-input-wrapper",children:[a.jsx("div",{className:"auth-input-bar"}),a.jsx("input",{type:"text",id:"position",name:"position",placeholder:"Your HR Position (e.g. Hiring Manager)",className:"auth-input-field",value:e.position,onChange:h})]})]}),a.jsxs("label",{className:"checkbox-container terms-checkbox",children:[a.jsx("input",{type:"checkbox",checked:c,onChange:p=>d(p.target.checked)}),a.jsxs("span",{className:"checkbox-text",children:["I agree to all the ",a.jsx("span",{className:"bold-white-text",children:"Terms and Conditions"})," according to the platform norms"]})]}),a.jsx("button",{type:"submit",className:"auth-submit-btn",disabled:s,children:s?a.jsx("span",{className:"spinner",style:{width:"20px",height:"20px",borderWidth:"2px",borderColor:"#ffffff",borderTopColor:"transparent"}}):"Sign-Up"}),a.jsxs("div",{className:"social-buttons-row",children:[a.jsxs("button",{type:"button",className:"social-login-btn google",children:[a.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"social-icon",children:[a.jsx("path",{d:"M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z",fill:"#4285F4"}),a.jsx("path",{d:"M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",fill:"#34A853"}),a.jsx("path",{d:"M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.87-2.6-2.86-4.53-5.84-4.53z",fill:"#FBBC05"}),a.jsx("path",{d:"M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z",fill:"#EA4335"})]}),a.jsx("span",{children:"Login via Google"})]}),a.jsxs("button",{type:"button",className:"social-login-btn linkedin",children:[a.jsx("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"social-icon",children:a.jsx("path",{d:"M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",fill:"#0077B5"})}),a.jsx("span",{children:"Login via LinkedIn"})]})]})]})})})]}),a.jsx("style",{children:`
        .register-page {
          min-height: calc(100vh - 72px);
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--bg-primary);
          padding: 40px 20px;
          font-family: 'Georgia', 'Times New Roman', serif;
        }

        .register-landscape-card {
          display: flex;
          width: 100%;
          max-width: 1040px;
          min-height: 660px;
          background: url('/sunset_lake.png') no-repeat center center / cover;
          border-radius: 40px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
          overflow: hidden;
          position: relative;
        }

        .register-landscape-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.05);
          pointer-events: none;
          z-index: 1;
        }

        .register-left-panel {
          position: relative;
          z-index: 2;
          width: 38%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 40px;
        }

        .left-panel-content {
          text-align: center;
          max-width: 320px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .left-title {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 26px;
          font-weight: 500;
          color: #ffffff;
          line-height: 1.35;
          margin-bottom: 30px;
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }

        .left-toggle-btn {
          display: inline-block;
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 22px;
          font-weight: 400;
          color: #ffffff;
          background-color: rgba(255, 255, 255, 0.18);
          border: 1px solid #ffffff;
          border-radius: 16px;
          padding: 12px 45px;
          transition: all 0.3s ease;
          text-shadow: 0 1px 2px rgba(0,0,0,0.3);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
        }

        .left-toggle-btn:hover {
          background-color: rgba(255, 255, 255, 0.3);
          border-color: #ffffff;
          transform: scale(1.03);
          box-shadow: 0 6px 20px rgba(255, 255, 255, 0.2);
        }

        .register-right-panel {
          position: relative;
          z-index: 2;
          width: 62%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 60px;
        }

        .register-glass-card {
          width: 100%;
          max-width: 540px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(12px) saturate(110%);
          -webkit-backdrop-filter: blur(12px) saturate(110%);
          border-radius: 30px;
          border: 1px solid rgba(255, 255, 255, 0.25);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25);
          padding: 36px;
        }

        .auth-form-theme {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        /* Role Picker Buttons */
        .role-picker-container {
          display: flex;
          background-color: rgba(0, 0, 0, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.25);
          border-radius: 14px;
          overflow: hidden;
          margin-bottom: 24px;
          padding: 4px;
        }

        .role-btn {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: rgba(255, 255, 255, 0.85);
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 15px;
          font-weight: 600;
          padding: 10px 0;
          cursor: pointer;
          border-radius: 10px;
          transition: all 0.2s ease;
        }

        .role-btn.active {
          background-color: #ff5100;
          color: #ffffff;
          box-shadow: 0 4px 10px rgba(255, 81, 0, 0.25);
        }

        .auth-row-double {
          display: flex;
          gap: 16px;
          width: 100%;
        }

        .auth-input-wrapper {
          display: flex;
          align-items: stretch;
          background-color: #ffffff;
          border-radius: 14px;
          height: 52px;
          overflow: hidden;
          margin-bottom: 20px;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
          position: relative;
          flex: 1;
        }

        .auth-input-bar {
          width: 12px;
          background-color: #ff5100;
          flex-shrink: 0;
        }

        .auth-input-field {
          font-family: 'Georgia', 'Times New Roman', serif;
          border: none;
          outline: none;
          background: transparent;
          padding: 0 16px 0 20px;
          flex-grow: 1;
          font-size: 16.5px;
          font-weight: 500;
          color: #333333;
          height: 100%;
          width: 100%;
        }

        .auth-input-field::placeholder {
          color: #888888;
          font-weight: 400;
          font-family: 'Georgia', 'Times New Roman', serif;
        }

        /* Select box specific classes */
        .select-wrapper {
          background-color: #ffffff;
        }

        .auth-select-field {
          font-family: 'Georgia', 'Times New Roman', serif;
          border: none;
          outline: none;
          background: transparent;
          padding: 0 20px;
          flex-grow: 1;
          font-size: 16px;
          font-weight: 500;
          color: #333333;
          height: 100%;
          width: 100%;
          cursor: pointer;
        }

        .phone-country-code {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 16.5px;
          font-weight: 500;
          color: #333333;
          display: flex;
          align-items: center;
          padding-left: 16px;
          user-select: none;
          white-space: nowrap;
        }

        .text-phone {
          padding-left: 8px !important;
        }

        .password-toggle-btn {
          border: none;
          background: transparent;
          padding: 0 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ff5100;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .password-toggle-btn:hover {
          color: #cc4100;
        }

        .checkbox-container {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          user-select: none;
        }

        .checkbox-container input {
          width: 18px;
          height: 18px;
          cursor: pointer;
          accent-color: #ff5100;
        }

        .checkbox-text {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 13.5px;
          color: #ffffff;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
          line-height: 1.4;
        }

        .bold-white-text {
          font-weight: 700;
          color: #ffffff;
        }

        .terms-checkbox {
          margin-bottom: 20px;
        }

        .auth-submit-btn {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 20px;
          font-weight: 500;
          color: #ffffff;
          background-color: #ff5100;
          border: none;
          border-radius: 14px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 6px 20px rgba(255, 81, 0, 0.35);
          margin-bottom: 20px;
        }

        .auth-submit-btn:hover {
          background-color: #e04800;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(255, 81, 0, 0.45);
        }

        .auth-submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .social-buttons-row {
          display: flex;
          gap: 14px;
          width: 100%;
        }

        .social-login-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          height: 48px;
          background-color: rgba(255, 255, 255, 0.15);
          border: 1px solid #ff5100;
          border-radius: 14px;
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 14px;
          font-weight: 500;
          color: #ff5100;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .social-login-btn:hover {
          background-color: rgba(255, 81, 0, 0.15);
          border-color: #ff854d;
          color: #ff5100;
          transform: translateY(-1px);
        }

        .social-icon {
          flex-shrink: 0;
        }

        /* Animation */
        .recruiter-fields {
          margin-top: 4px;
        }

        @media (max-width: 992px) {
          .register-landscape-card {
            flex-direction: column;
            min-height: auto;
            border-radius: 30px;
          }

          .register-left-panel {
            width: 100%;
            padding: 40px 20px 20px 20px;
          }

          .left-title {
            margin-bottom: 16px;
            font-size: 22px;
          }

          .left-toggle-btn {
            font-size: 18px;
            padding: 8px 30px;
            border-radius: 12px;
          }

          .register-right-panel {
            width: 100%;
            padding: 20px 24px 40px 24px;
          }

          .register-glass-card {
            max-width: 100%;
            padding: 24px;
            border-radius: 24px;
          }

          .auth-row-double {
            flex-direction: column;
            gap: 0;
          }

          .auth-input-wrapper {
            height: 50px;
            margin-bottom: 18px;
            width: 100%;
          }

          .auth-submit-btn {
            height: 50px;
            font-size: 18px;
            border-radius: 12px;
          }

          .social-login-btn {
            height: 48px;
            font-size: 13.5px;
            border-radius: 12px;
          }
        }
      `})]})},ly=()=>{const[e,t]=b.useState({name:"",companyName:"",email:"",businessNumber:"",companyAddress:"",message:""}),[r,n]=b.useState(!1),{showToast:s}=et(),o=l=>{const{name:c,value:d}=l.target;t(u=>({...u,[c]:d}))},i=async l=>{var h,y;l.preventDefault();const{name:c,companyName:d,email:u,businessNumber:f,companyAddress:g,message:w}=e;if(!c||!d||!u||!f||!g||!w){s("Please fill out all the fields.","warning");return}n(!0);try{(await $.post("/contact",e)).data.success&&(s("🎉 Thank you! Your collaboration request has been submitted successfully.","success"),t({name:"",companyName:"",email:"",businessNumber:"",companyAddress:"",message:""}))}catch(j){s(((y=(h=j.response)==null?void 0:h.data)==null?void 0:y.message)||"Failed to submit collaboration request. Please try again.","error")}finally{n(!1)}};return a.jsxs("div",{className:"contact-page-wrapper animate-fade",children:[a.jsxs("div",{className:"contact-hero-banner",children:[a.jsx("h2",{className:"banner-title-outline",children:"We welcomes you to our"}),a.jsx("h1",{className:"banner-title-solid",children:"Company"})]}),a.jsx("div",{className:"collaboration-form-section",children:a.jsxs("div",{className:"collaboration-card",children:[a.jsxs("div",{className:"collaboration-form-col",children:[a.jsxs("div",{className:"form-header-row",children:[a.jsx("h3",{className:"form-main-title",children:"Looking for Collaboration"}),a.jsx("a",{href:"#updates",className:"form-register-link",onClick:l=>{l.preventDefault(),s("🔔 Subscribed to new updates!","info")},children:"Register Here for New Updates"})]}),a.jsxs("form",{onSubmit:i,className:"collaboration-form",children:[a.jsx("div",{className:"collab-input-group",children:a.jsx("input",{type:"text",name:"name",placeholder:"Name",value:e.name,onChange:o,required:!0})}),a.jsx("div",{className:"collab-input-group",children:a.jsx("input",{type:"text",name:"companyName",placeholder:"Company Name",value:e.companyName,onChange:o,required:!0})}),a.jsx("div",{className:"collab-input-group",children:a.jsx("input",{type:"email",name:"email",placeholder:"Company Mail-ID",value:e.email,onChange:o,required:!0})}),a.jsx("div",{className:"collab-input-group",children:a.jsx("input",{type:"tel",name:"businessNumber",placeholder:"Business Number",value:e.businessNumber,onChange:o,required:!0})}),a.jsx("div",{className:"collab-input-group",children:a.jsx("input",{type:"text",name:"companyAddress",placeholder:"Company Address",value:e.companyAddress,onChange:o,required:!0})}),a.jsx("div",{className:"collab-input-group",children:a.jsx("textarea",{name:"message",placeholder:"Applying For",value:e.message,onChange:o,required:!0,rows:4})}),a.jsx("button",{type:"submit",className:"collab-submit-btn",disabled:r,children:r?"Submitting...":"Submit"})]})]}),a.jsx("div",{className:"collaboration-image-col",children:a.jsx("img",{src:"/collaboration_handshake.png",alt:"Business Collaboration Handshake",className:"collaboration-handshake-img"})})]})}),a.jsx("style",{children:`
        .contact-page-wrapper {
          width: 100%;
          min-height: calc(100vh - 80px);
          background-color: var(--bg-primary);
        }

        /* 1. Welcoming Hero Banner */
        .contact-hero-banner {
          background-color: #385d82; /* Muted blue-grey matching screenshot */
          padding: 60px 20px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .banner-title-outline {
          font-family: 'Outfit', sans-serif;
          font-size: 38px;
          font-weight: 300;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.85);
          letter-spacing: 0.5px;
          margin-bottom: 5px;
          text-transform: none;
        }

        .banner-title-solid {
          font-family: 'Outfit', sans-serif;
          font-size: 70px;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
          line-height: 1.1;
          letter-spacing: -1px;
        }

        /* 2. Collaboration Form Section */
        .collaboration-form-section {
          padding: 60px 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--bg-tertiary);
        }

        .collaboration-card {
          width: 100%;
          max-width: 1000px;
          background-color: #1e242c; /* Dark gray charcoal background */
          border-radius: 16px;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25);
          overflow: hidden;
          display: flex;
        }

        /* Form Column */
        .collaboration-form-col {
          width: 58%;
          padding: 40px;
          display: flex;
          flex-direction: column;
        }

        .form-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .form-main-title {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 20px;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
        }

        .form-register-link {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 13px;
          font-weight: 600;
          color: #ff5100;
          text-decoration: underline;
          transition: color 0.2s ease;
        }

        .form-register-link:hover {
          color: #ff854d;
        }

        .collaboration-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        /* Input styling */
        .collab-input-group {
          position: relative;
          width: 100%;
        }

        .collab-input-group input,
        .collab-input-group select,
        .collab-input-group textarea {
          width: 100%;
          padding: 12px 18px;
          background-color: #ffffff;
          border: none;
          outline: none;
          border-radius: 8px;
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 14.5px;
          color: #333333;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .collab-input-group input,
        .collab-input-group select {
          height: 48px;
        }

        .collab-input-group textarea {
          min-height: 120px;
          resize: vertical;
          padding-top: 14px;
        }

        .collab-input-group input::placeholder,
        .collab-input-group textarea::placeholder {
          color: #888888;
          font-family: 'Georgia', 'Times New Roman', serif;
        }

        .collab-input-group input:focus,
        .collab-input-group select:focus,
        .collab-input-group textarea:focus {
          box-shadow: 0 4px 12px rgba(255, 81, 0, 0.15);
        }

        /* Submit Button */
        .collab-submit-btn {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 16.5px;
          font-weight: 600;
          color: #ffffff;
          background-color: #ff5100;
          border: none;
          border-radius: 10px;
          height: 48px;
          width: 130px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.2s ease, transform 0.1s ease;
          box-shadow: 0 4px 12px rgba(255, 81, 0, 0.3);
          margin-top: 10px;
        }

        .collab-submit-btn:hover {
          background-color: #e04800;
        }

        .collab-submit-btn:active {
          transform: scale(0.98);
        }

        .collab-submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        /* Image Column */
        .collaboration-image-col {
          width: 42%;
          position: relative;
          display: flex;
          align-items: stretch;
        }

        .collaboration-handshake-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Responsive Layouts */
        @media (max-width: 992px) {
          .collaboration-hero-banner {
            padding: 40px 20px;
          }

          .banner-title-outline {
            font-size: 28px;
          }

          .banner-title-solid {
            font-size: 52px;
          }

          .collaboration-form-section {
            padding: 30px 20px;
          }

          .collaboration-card {
            flex-direction: column-reverse;
          }

          .collaboration-form-col {
            width: 100%;
            padding: 30px 20px;
          }

          .collaboration-image-col {
            width: 100%;
            height: 300px;
          }
        }

        @media (max-width: 576px) {
          .form-header-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
          }

          .collab-submit-btn {
            width: 100%;
          }
        }
      `})]})},cy=()=>{const[e,t]=b.useState(""),[r,n]=b.useState(!1),[s,o]=b.useState(!1),[i,l]=b.useState(""),{showToast:c}=et(),d=async u=>{var f,g;if(u.preventDefault(),!!e){n(!0);try{const w=await $.post("/auth/forgot-password",{email:e});if(w.data.success&&(o(!0),c("Password reset token dispatched successfully!","success"),w.data.token)){const h=`/reset-password?token=${w.data.token}`;l(h)}}catch(w){c(((g=(f=w.response)==null?void 0:f.data)==null?void 0:g.message)||"Error processing request.","error")}finally{n(!1)}}};return a.jsxs("main",{className:"forgot-password-page animate-fade",children:[a.jsxs("div",{className:"glass-card forgot-password-card",children:[s?a.jsxs("div",{className:"success-state animate-fade",children:[a.jsx(xf,{size:48,className:"success-icon animate-pulse"}),a.jsx("h2",{className:"success-title",children:"Recovery Dispatched"}),a.jsxs("p",{className:"success-desc",children:["If an account is associated with ",a.jsx("strong",{children:e}),", a password reset link has been created."]}),i&&a.jsxs("div",{className:"mock-developer-notice",children:[a.jsx("p",{className:"mock-title",children:"⚙️ Sandbox Developer Tool"}),a.jsx("p",{className:"mock-description",children:"Since we are running in development sandbox, you can complete the password reset flow directly by clicking the link below:"}),a.jsx(B,{to:i,className:"mock-btn-link",children:"Complete Password Reset ↗"})]})]}):a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"card-header",children:[a.jsx("h1",{className:"card-title",children:"Forgot Password"}),a.jsx("p",{className:"card-subtitle",children:"Enter your email and we'll send a password recovery token."})]}),a.jsxs("form",{onSubmit:d,className:"forgot-form",children:[a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",htmlFor:"email",children:"Email Address"}),a.jsxs("div",{className:"input-icon-wrapper",children:[a.jsx(un,{size:18,className:"input-icon"}),a.jsx("input",{type:"email",id:"email",placeholder:"name@domain.com",className:"form-control input-with-icon",value:e,onChange:u=>t(u.target.value),required:!0})]})]}),a.jsx("button",{type:"submit",className:"btn btn-primary w-full submit-btn",disabled:r,style:{width:"100%"},children:r?a.jsx("span",{className:"spinner",style:{width:"16px",height:"16px",borderWidth:"2px"}}):a.jsxs(a.Fragment,{children:[a.jsx("span",{children:"Request Reset Token"}),a.jsx(Jl,{size:16})]})})]})]}),a.jsx("div",{className:"card-footer",children:a.jsxs(B,{to:"/login",className:"back-to-login",children:[a.jsx(Qs,{size:16}),a.jsx("span",{children:"Back to Log In"})]})})]}),a.jsx("style",{children:`
        .forgot-password-page {
          min-height: calc(100vh - 140px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          background: radial-gradient(circle at 50% 50%, var(--bg-tertiary) 0%, var(--bg-primary) 80%);
        }

        .forgot-password-card {
          width: 100%;
          max-width: 460px;
          padding: 40px;
          background-color: var(--bg-secondary);
        }

        .forgot-password-card:hover {
          transform: none;
          box-shadow: var(--shadow-xl);
        }

        .card-header {
          margin-bottom: 28px;
        }

        .card-title {
          font-size: 26px;
          font-weight: 800;
        }

        .card-subtitle {
          font-size: 14px;
          color: var(--text-tertiary);
          margin-top: 8px;
          line-height: 1.5;
        }

        .forgot-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .input-icon-wrapper {
          position: relative;
          width: 100%;
        }

        .input-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-tertiary);
          pointer-events: none;
        }

        .input-with-icon {
          padding-left: 44px;
        }

        .submit-btn {
          height: 48px;
          font-size: 15px;
        }

        .success-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 10px 0;
        }

        .success-icon {
          color: var(--success);
          margin-bottom: 16px;
        }

        .success-title {
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .success-desc {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .mock-developer-notice {
          margin-top: 24px;
          padding: 16px;
          background-color: var(--bg-tertiary);
          border: 1px dashed var(--primary);
          border-radius: var(--radius-sm);
          text-align: left;
        }

        .mock-title {
          font-weight: 700;
          font-size: 13px;
          color: var(--primary);
          margin-bottom: 6px;
        }

        .mock-description {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.4;
          margin-bottom: 12px;
        }

        .mock-btn-link {
          display: inline-block;
          font-size: 13px;
          font-weight: 600;
          color: #ffffff;
          background-color: var(--primary);
          padding: 6px 14px;
          border-radius: var(--radius-xs);
          transition: background-color var(--transition-fast);
        }

        .mock-btn-link:hover {
          background-color: var(--primary-hover);
        }

        .card-footer {
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid var(--border-color);
          display: flex;
          justify-content: center;
        }

        .back-to-login {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          font-size: 14px;
          font-weight: 600;
          transition: color var(--transition-fast);
        }

        .back-to-login:hover {
          color: var(--primary);
        }
      `})]})},dy=()=>{const[e]=$l(),[t,r]=b.useState({password:"",confirm_password:""}),[n,s]=b.useState(!1),[o,i]=b.useState(!1),[l,c]=b.useState(""),{showToast:d}=et(),u=lt();b.useEffect(()=>{const w=e.get("token");w?c(w):d("No validation token supplied. Request a new password link.","error")},[e,d]);const f=w=>{const{name:h,value:y}=w.target;r(j=>({...j,[h]:y}))},g=async w=>{var j,p;w.preventDefault();const{password:h,confirm_password:y}=t;if(!l){d("Missing token. Please request a new password recovery link.","error");return}if(!h||!y){d("Please complete all form fields.","warning");return}if(h!==y){d("Passwords do not match.","error");return}if(h.length<6){d("Password must be at least 6 characters.","warning");return}s(!0);try{const m=await $.post("/auth/reset-password",{token:l,password:h,confirm_password:y});m.data.success&&(i(!0),d(m.data.message||"Password reset successfully!","success"),setTimeout(()=>{u("/login")},3e3))}catch(m){d(((p=(j=m.response)==null?void 0:j.data)==null?void 0:p.message)||"Token is invalid or has expired.","error")}finally{s(!1)}};return a.jsxs("main",{className:"reset-password-page animate-fade",children:[a.jsxs("div",{className:"glass-card reset-password-card",children:[o?a.jsxs("div",{className:"success-state animate-fade",children:[a.jsx(xf,{size:48,className:"success-icon"}),a.jsx("h2",{className:"success-title",children:"Password Reset"}),a.jsx("p",{className:"success-desc",children:"Your password has been changed successfully. You will be automatically redirected to the Login page in a few seconds..."}),a.jsx(B,{to:"/login",className:"btn btn-primary",style:{marginTop:"24px",width:"100%"},children:"Log In Now"})]}):a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"card-header",children:[a.jsx("h1",{className:"card-title",children:"Reset Password"}),a.jsx("p",{className:"card-subtitle",children:"Establish your new account password below."})]}),a.jsxs("form",{onSubmit:g,className:"reset-form",children:[a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",htmlFor:"password",children:"New Password"}),a.jsxs("div",{className:"input-icon-wrapper",children:[a.jsx(Sd,{size:18,className:"input-icon"}),a.jsx("input",{type:"password",id:"password",name:"password",placeholder:"••••••••",className:"form-control input-with-icon",value:t.password,onChange:f,required:!0})]})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",htmlFor:"confirm_password",children:"Confirm New Password"}),a.jsxs("div",{className:"input-icon-wrapper",children:[a.jsx(Sd,{size:18,className:"input-icon"}),a.jsx("input",{type:"password",id:"confirm_password",name:"confirm_password",placeholder:"••••••••",className:"form-control input-with-icon",value:t.confirm_password,onChange:f,required:!0})]})]}),a.jsx("button",{type:"submit",className:"btn btn-primary w-full submit-btn",disabled:n||!l,style:{width:"100%"},children:n?a.jsx("span",{className:"spinner",style:{width:"16px",height:"16px",borderWidth:"2px"}}):a.jsxs(a.Fragment,{children:[a.jsx("span",{children:"Confirm Reset"}),a.jsx(Hg,{size:16})]})})]})]}),a.jsx("div",{className:"card-footer",children:a.jsxs(B,{to:"/login",className:"back-to-login",children:[a.jsx(Qs,{size:16}),a.jsx("span",{children:"Back to Log In"})]})})]}),a.jsx("style",{children:`
        .reset-password-page {
          min-height: calc(100vh - 140px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          background: radial-gradient(circle at 50% 50%, var(--bg-tertiary) 0%, var(--bg-primary) 80%);
        }

        .reset-password-card {
          width: 100%;
          max-width: 460px;
          padding: 40px;
          background-color: var(--bg-secondary);
        }

        .reset-password-card:hover {
          transform: none;
          box-shadow: var(--shadow-xl);
        }

        .card-header {
          margin-bottom: 28px;
        }

        .card-title {
          font-size: 26px;
          font-weight: 800;
        }

        .card-subtitle {
          font-size: 14px;
          color: var(--text-tertiary);
          margin-top: 8px;
          line-height: 1.5;
        }

        .reset-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .input-icon-wrapper {
          position: relative;
          width: 100%;
        }

        .input-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-tertiary);
          pointer-events: none;
        }

        .input-with-icon {
          padding-left: 44px;
        }

        .submit-btn {
          height: 48px;
          font-size: 15px;
        }

        .success-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 10px 0;
        }

        .success-icon {
          color: var(--success);
          margin-bottom: 16px;
        }

        .success-title {
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .success-desc {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .card-footer {
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid var(--border-color);
          display: flex;
          justify-content: center;
        }

        .back-to-login {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          font-size: 14px;
          font-weight: 600;
          transition: color var(--transition-fast);
        }

        .back-to-login:hover {
          color: var(--primary);
        }
      `})]})},uy=()=>{const[e]=$l(),t=e.get("token"),[r,n]=b.useState("verifying"),[s,o]=b.useState(""),i=b.useRef(!1);return b.useEffect(()=>{(async()=>{var c,d;if(!t){n("error"),o("Invalid request. A verification token must be provided.");return}if(!i.current){i.current=!0;try{const u=await ie.get(`http://localhost:5000/api/auth/verify-email?token=${t}`);u.data.success?(n("success"),o("Email Verified Successfully")):(n("error"),o(u.data.message||"Verification failed."))}catch(u){n("error"),o(((d=(c=u.response)==null?void 0:c.data)==null?void 0:d.message)||"Verification link is invalid or has expired.")}}})()},[t]),a.jsxs("div",{className:"verify-wrapper animate-fade",children:[a.jsxs("div",{className:"verify-card glass-card",children:[r==="verifying"&&a.jsxs("div",{className:"status-container",children:[a.jsx(Vg,{size:64,className:"spinner icon-primary"}),a.jsx("h2",{children:"Verifying Email Address"}),a.jsx("p",{children:"Please wait while we validate your credentials and activate your account..."})]}),r==="success"&&a.jsxs("div",{className:"status-container",children:[a.jsx(Ct,{size:64,className:"icon-success scale-up"}),a.jsx("h2",{className:"text-success",children:s}),a.jsx("p",{children:"🎉 Congratulations! Your account has been verified successfully. You can now log in and apply for your dream jobs."}),a.jsx(B,{to:"/login",className:"btn btn-primary",children:"Proceed to Login"})]}),r==="error"&&a.jsxs("div",{className:"status-container",children:[a.jsx(kf,{size:64,className:"icon-error scale-up"}),a.jsx("h2",{className:"text-error",children:"Verification Failed"}),a.jsx("p",{children:s}),a.jsxs("div",{className:"action-buttons",children:[a.jsx(B,{to:"/login",className:"btn btn-secondary",children:"Back to Login"}),a.jsx(B,{to:"/register",className:"btn btn-primary",children:"Register Again"})]})]})]}),a.jsx("style",{children:`
        .verify-wrapper {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background-color: var(--bg-primary);
        }

        .verify-card {
          max-width: 500px;
          width: 100%;
          padding: 40px;
          text-align: center;
          background-color: var(--bg-secondary);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-lg);
        }

        .status-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .status-container h2 {
          font-size: 24px;
          font-weight: 800;
          color: var(--text-primary);
        }

        .status-container p {
          font-size: 15px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 10px;
        }

        .icon-primary {
          color: var(--primary);
        }

        .icon-success {
          color: var(--success);
          filter: drop-shadow(0 0 10px rgba(16, 185, 129, 0.2));
        }

        .icon-error {
          color: var(--error);
          filter: drop-shadow(0 0 10px rgba(239, 68, 68, 0.2));
        }

        .text-success {
          color: var(--success) !important;
        }

        .text-error {
          color: var(--error) !important;
        }

        .spinner {
          animation: spin 1.5s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .scale-up {
          animation: scaleUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes scaleUp {
          0% { transform: scale(0.6); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        .action-buttons {
          display: flex;
          gap: 12px;
          margin-top: 10px;
        }

        .btn {
          padding: 10px 24px;
          font-weight: 600;
          border-radius: var(--radius-sm);
          text-decoration: none;
          transition: all var(--transition-fast);
        }

        .btn-primary {
          background-color: var(--primary);
          color: white;
          border: none;
        }

        .btn-primary:hover {
          background-color: var(--primary-dark);
          transform: translateY(-2px);
        }

        .btn-secondary {
          background-color: var(--bg-tertiary);
          color: var(--text-primary);
          border: 1px solid var(--border-color);
        }

        .btn-secondary:hover {
          background-color: var(--border-color);
          transform: translateY(-2px);
        }
      `})]})};function py(){return a.jsx(r0,{children:a.jsx(Jv,{children:a.jsx(qv,{children:a.jsx(Qv,{children:a.jsxs(zg,{future:{v7_startTransition:!0,v7_relativeSplatPath:!0},children:[a.jsxs("div",{className:"site-wrapper",children:[a.jsx(Gv,{}),a.jsx(Xv,{}),a.jsx("div",{className:"main-content-layout",children:a.jsxs(wg,{children:[a.jsx(Ae,{path:"/",element:a.jsx($d,{})}),a.jsx(Ae,{path:"/jobs",element:a.jsx(ey,{})}),a.jsx(Ae,{path:"/jobs/:id",element:a.jsx(ty,{})}),a.jsx(Ae,{path:"/login",element:a.jsx(oy,{})}),a.jsx(Ae,{path:"/register",element:a.jsx(iy,{})}),a.jsx(Ae,{path:"/contact",element:a.jsx(ly,{})}),a.jsx(Ae,{path:"/forgot-password",element:a.jsx(cy,{})}),a.jsx(Ae,{path:"/reset-password",element:a.jsx(dy,{})}),a.jsx(Ae,{path:"/verify-email",element:a.jsx(uy,{})}),a.jsx(Ae,{path:"/jobs/:id/apply",element:a.jsx($a,{allowedRoles:["candidate"],children:a.jsx(ry,{})})}),a.jsx(Ae,{path:"/success",element:a.jsx($a,{allowedRoles:["candidate"],children:a.jsx(ny,{})})}),a.jsx(Ae,{path:"/dashboard",element:a.jsx($a,{allowedRoles:["candidate","admin"],children:a.jsx(ay,{})})}),a.jsx(Ae,{path:"/recruiter-dashboard",element:a.jsx($a,{allowedRoles:["recruiter"],children:a.jsx(sy,{})})}),a.jsx(Ae,{path:"*",element:a.jsx($d,{})})]})}),a.jsx(Kv,{})]}),a.jsx("style",{children:`
                .site-wrapper {
                  display: flex;
                  flex-direction: column;
                  min-height: 100vh;
                }

                .main-content-layout {
                  flex-grow: 1;
                }
              `})]})})})})})}Io.createRoot(document.getElementById("root")).render(a.jsx(Zd.StrictMode,{children:a.jsx(py,{})}));
