(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function n(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(i){if(i.ep)return;i.ep=!0;const o=n(i);fetch(i.href,o)}})();var ks=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function tc(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Bm={exports:{}},tl={},Um={exports:{}},Z={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var xo=Symbol.for("react.element"),Xv=Symbol.for("react.portal"),Qv=Symbol.for("react.fragment"),Zv=Symbol.for("react.strict_mode"),Jv=Symbol.for("react.profiler"),e1=Symbol.for("react.provider"),t1=Symbol.for("react.context"),n1=Symbol.for("react.forward_ref"),r1=Symbol.for("react.suspense"),i1=Symbol.for("react.memo"),o1=Symbol.for("react.lazy"),rd=Symbol.iterator;function s1(e){return e===null||typeof e!="object"?null:(e=rd&&e[rd]||e["@@iterator"],typeof e=="function"?e:null)}var Hm={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},$m=Object.assign,Wm={};function Jr(e,t,n){this.props=e,this.context=t,this.refs=Wm,this.updater=n||Hm}Jr.prototype.isReactComponent={};Jr.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Jr.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Km(){}Km.prototype=Jr.prototype;function nc(e,t,n){this.props=e,this.context=t,this.refs=Wm,this.updater=n||Hm}var rc=nc.prototype=new Km;rc.constructor=nc;$m(rc,Jr.prototype);rc.isPureReactComponent=!0;var id=Array.isArray,Gm=Object.prototype.hasOwnProperty,ic={current:null},Ym={key:!0,ref:!0,__self:!0,__source:!0};function qm(e,t,n){var r,i={},o=null,s=null;if(t!=null)for(r in t.ref!==void 0&&(s=t.ref),t.key!==void 0&&(o=""+t.key),t)Gm.call(t,r)&&!Ym.hasOwnProperty(r)&&(i[r]=t[r]);var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){for(var a=Array(l),u=0;u<l;u++)a[u]=arguments[u+2];i.children=a}if(e&&e.defaultProps)for(r in l=e.defaultProps,l)i[r]===void 0&&(i[r]=l[r]);return{$$typeof:xo,type:e,key:o,ref:s,props:i,_owner:ic.current}}function l1(e,t){return{$$typeof:xo,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function oc(e){return typeof e=="object"&&e!==null&&e.$$typeof===xo}function a1(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var od=/\/+/g;function Al(e,t){return typeof e=="object"&&e!==null&&e.key!=null?a1(""+e.key):t.toString(36)}function ns(e,t,n,r,i){var o=typeof e;(o==="undefined"||o==="boolean")&&(e=null);var s=!1;if(e===null)s=!0;else switch(o){case"string":case"number":s=!0;break;case"object":switch(e.$$typeof){case xo:case Xv:s=!0}}if(s)return s=e,i=i(s),e=r===""?"."+Al(s,0):r,id(i)?(n="",e!=null&&(n=e.replace(od,"$&/")+"/"),ns(i,t,n,"",function(u){return u})):i!=null&&(oc(i)&&(i=l1(i,n+(!i.key||s&&s.key===i.key?"":(""+i.key).replace(od,"$&/")+"/")+e)),t.push(i)),1;if(s=0,r=r===""?".":r+":",id(e))for(var l=0;l<e.length;l++){o=e[l];var a=r+Al(o,l);s+=ns(o,t,n,a,i)}else if(a=s1(e),typeof a=="function")for(e=a.call(e),l=0;!(o=e.next()).done;)o=o.value,a=r+Al(o,l++),s+=ns(o,t,n,a,i);else if(o==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return s}function Ro(e,t,n){if(e==null)return e;var r=[],i=0;return ns(e,r,"","",function(o){return t.call(n,o,i++)}),r}function u1(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var qe={current:null},rs={transition:null},c1={ReactCurrentDispatcher:qe,ReactCurrentBatchConfig:rs,ReactCurrentOwner:ic};function Xm(){throw Error("act(...) is not supported in production builds of React.")}Z.Children={map:Ro,forEach:function(e,t,n){Ro(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Ro(e,function(){t++}),t},toArray:function(e){return Ro(e,function(t){return t})||[]},only:function(e){if(!oc(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};Z.Component=Jr;Z.Fragment=Qv;Z.Profiler=Jv;Z.PureComponent=nc;Z.StrictMode=Zv;Z.Suspense=r1;Z.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=c1;Z.act=Xm;Z.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=$m({},e.props),i=e.key,o=e.ref,s=e._owner;if(t!=null){if(t.ref!==void 0&&(o=t.ref,s=ic.current),t.key!==void 0&&(i=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(a in t)Gm.call(t,a)&&!Ym.hasOwnProperty(a)&&(r[a]=t[a]===void 0&&l!==void 0?l[a]:t[a])}var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){l=Array(a);for(var u=0;u<a;u++)l[u]=arguments[u+2];r.children=l}return{$$typeof:xo,type:e.type,key:i,ref:o,props:r,_owner:s}};Z.createContext=function(e){return e={$$typeof:t1,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:e1,_context:e},e.Consumer=e};Z.createElement=qm;Z.createFactory=function(e){var t=qm.bind(null,e);return t.type=e,t};Z.createRef=function(){return{current:null}};Z.forwardRef=function(e){return{$$typeof:n1,render:e}};Z.isValidElement=oc;Z.lazy=function(e){return{$$typeof:o1,_payload:{_status:-1,_result:e},_init:u1}};Z.memo=function(e,t){return{$$typeof:i1,type:e,compare:t===void 0?null:t}};Z.startTransition=function(e){var t=rs.transition;rs.transition={};try{e()}finally{rs.transition=t}};Z.unstable_act=Xm;Z.useCallback=function(e,t){return qe.current.useCallback(e,t)};Z.useContext=function(e){return qe.current.useContext(e)};Z.useDebugValue=function(){};Z.useDeferredValue=function(e){return qe.current.useDeferredValue(e)};Z.useEffect=function(e,t){return qe.current.useEffect(e,t)};Z.useId=function(){return qe.current.useId()};Z.useImperativeHandle=function(e,t,n){return qe.current.useImperativeHandle(e,t,n)};Z.useInsertionEffect=function(e,t){return qe.current.useInsertionEffect(e,t)};Z.useLayoutEffect=function(e,t){return qe.current.useLayoutEffect(e,t)};Z.useMemo=function(e,t){return qe.current.useMemo(e,t)};Z.useReducer=function(e,t,n){return qe.current.useReducer(e,t,n)};Z.useRef=function(e){return qe.current.useRef(e)};Z.useState=function(e){return qe.current.useState(e)};Z.useSyncExternalStore=function(e,t,n){return qe.current.useSyncExternalStore(e,t,n)};Z.useTransition=function(){return qe.current.useTransition()};Z.version="18.3.1";Um.exports=Z;var N=Um.exports;const wi=tc(N);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var f1=N,d1=Symbol.for("react.element"),h1=Symbol.for("react.fragment"),p1=Object.prototype.hasOwnProperty,m1=f1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,g1={key:!0,ref:!0,__self:!0,__source:!0};function Qm(e,t,n){var r,i={},o=null,s=null;n!==void 0&&(o=""+n),t.key!==void 0&&(o=""+t.key),t.ref!==void 0&&(s=t.ref);for(r in t)p1.call(t,r)&&!g1.hasOwnProperty(r)&&(i[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)i[r]===void 0&&(i[r]=t[r]);return{$$typeof:d1,type:e,key:o,ref:s,props:i,_owner:m1.current}}tl.Fragment=h1;tl.jsx=Qm;tl.jsxs=Qm;Bm.exports=tl;var w=Bm.exports,Ia={},Zm={exports:{}},pt={},Jm={exports:{}},eg={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(M,V){var v=M.length;M.push(V);e:for(;0<v;){var q=v-1>>>1,re=M[q];if(0<i(re,V))M[q]=V,M[v]=re,v=q;else break e}}function n(M){return M.length===0?null:M[0]}function r(M){if(M.length===0)return null;var V=M[0],v=M.pop();if(v!==V){M[0]=v;e:for(var q=0,re=M.length,S=re>>>1;q<S;){var z=2*(q+1)-1,X=M[z],H=z+1,ie=M[H];if(0>i(X,v))H<re&&0>i(ie,X)?(M[q]=ie,M[H]=v,q=H):(M[q]=X,M[z]=v,q=z);else if(H<re&&0>i(ie,v))M[q]=ie,M[H]=v,q=H;else break e}}return V}function i(M,V){var v=M.sortIndex-V.sortIndex;return v!==0?v:M.id-V.id}if(typeof performance=="object"&&typeof performance.now=="function"){var o=performance;e.unstable_now=function(){return o.now()}}else{var s=Date,l=s.now();e.unstable_now=function(){return s.now()-l}}var a=[],u=[],c=1,f=null,d=3,h=!1,m=!1,x=!1,E=typeof setTimeout=="function"?setTimeout:null,p=typeof clearTimeout=="function"?clearTimeout:null,g=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function y(M){for(var V=n(u);V!==null;){if(V.callback===null)r(u);else if(V.startTime<=M)r(u),V.sortIndex=V.expirationTime,t(a,V);else break;V=n(u)}}function T(M){if(x=!1,y(M),!m)if(n(a)!==null)m=!0,ce(b);else{var V=n(u);V!==null&&G(T,V.startTime-M)}}function b(M,V){m=!1,x&&(x=!1,p(P),P=-1),h=!0;var v=d;try{for(y(V),f=n(a);f!==null&&(!(f.expirationTime>V)||M&&!L());){var q=f.callback;if(typeof q=="function"){f.callback=null,d=f.priorityLevel;var re=q(f.expirationTime<=V);V=e.unstable_now(),typeof re=="function"?f.callback=re:f===n(a)&&r(a),y(V)}else r(a);f=n(a)}if(f!==null)var S=!0;else{var z=n(u);z!==null&&G(T,z.startTime-V),S=!1}return S}finally{f=null,d=v,h=!1}}var k=!1,A=null,P=-1,O=5,C=-1;function L(){return!(e.unstable_now()-C<O)}function F(){if(A!==null){var M=e.unstable_now();C=M;var V=!0;try{V=A(!0,M)}finally{V?W():(k=!1,A=null)}}else k=!1}var W;if(typeof g=="function")W=function(){g(F)};else if(typeof MessageChannel<"u"){var ee=new MessageChannel,B=ee.port2;ee.port1.onmessage=F,W=function(){B.postMessage(null)}}else W=function(){E(F,0)};function ce(M){A=M,k||(k=!0,W())}function G(M,V){P=E(function(){M(e.unstable_now())},V)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(M){M.callback=null},e.unstable_continueExecution=function(){m||h||(m=!0,ce(b))},e.unstable_forceFrameRate=function(M){0>M||125<M?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):O=0<M?Math.floor(1e3/M):5},e.unstable_getCurrentPriorityLevel=function(){return d},e.unstable_getFirstCallbackNode=function(){return n(a)},e.unstable_next=function(M){switch(d){case 1:case 2:case 3:var V=3;break;default:V=d}var v=d;d=V;try{return M()}finally{d=v}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(M,V){switch(M){case 1:case 2:case 3:case 4:case 5:break;default:M=3}var v=d;d=M;try{return V()}finally{d=v}},e.unstable_scheduleCallback=function(M,V,v){var q=e.unstable_now();switch(typeof v=="object"&&v!==null?(v=v.delay,v=typeof v=="number"&&0<v?q+v:q):v=q,M){case 1:var re=-1;break;case 2:re=250;break;case 5:re=1073741823;break;case 4:re=1e4;break;default:re=5e3}return re=v+re,M={id:c++,callback:V,priorityLevel:M,startTime:v,expirationTime:re,sortIndex:-1},v>q?(M.sortIndex=v,t(u,M),n(a)===null&&M===n(u)&&(x?(p(P),P=-1):x=!0,G(T,v-q))):(M.sortIndex=re,t(a,M),m||h||(m=!0,ce(b))),M},e.unstable_shouldYield=L,e.unstable_wrapCallback=function(M){var V=d;return function(){var v=d;d=V;try{return M.apply(this,arguments)}finally{d=v}}}})(eg);Jm.exports=eg;var y1=Jm.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var x1=N,ht=y1;function R(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var tg=new Set,$i={};function ar(e,t){Ur(e,t),Ur(e+"Capture",t)}function Ur(e,t){for($i[e]=t,e=0;e<t.length;e++)tg.add(t[e])}var en=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Na=Object.prototype.hasOwnProperty,v1=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,sd={},ld={};function w1(e){return Na.call(ld,e)?!0:Na.call(sd,e)?!1:v1.test(e)?ld[e]=!0:(sd[e]=!0,!1)}function k1(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function S1(e,t,n,r){if(t===null||typeof t>"u"||k1(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function Xe(e,t,n,r,i,o,s){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=o,this.removeEmptyString=s}var _e={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){_e[e]=new Xe(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];_e[t]=new Xe(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){_e[e]=new Xe(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){_e[e]=new Xe(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){_e[e]=new Xe(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){_e[e]=new Xe(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){_e[e]=new Xe(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){_e[e]=new Xe(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){_e[e]=new Xe(e,5,!1,e.toLowerCase(),null,!1,!1)});var sc=/[\-:]([a-z])/g;function lc(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(sc,lc);_e[t]=new Xe(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(sc,lc);_e[t]=new Xe(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(sc,lc);_e[t]=new Xe(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){_e[e]=new Xe(e,1,!1,e.toLowerCase(),null,!1,!1)});_e.xlinkHref=new Xe("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){_e[e]=new Xe(e,1,!1,e.toLowerCase(),null,!0,!0)});function ac(e,t,n,r){var i=_e.hasOwnProperty(t)?_e[t]:null;(i!==null?i.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(S1(t,n,i,r)&&(n=null),r||i===null?w1(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):i.mustUseProperty?e[i.propertyName]=n===null?i.type===3?!1:"":n:(t=i.attributeName,r=i.attributeNamespace,n===null?e.removeAttribute(t):(i=i.type,n=i===3||i===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var ln=x1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Mo=Symbol.for("react.element"),yr=Symbol.for("react.portal"),xr=Symbol.for("react.fragment"),uc=Symbol.for("react.strict_mode"),Ra=Symbol.for("react.profiler"),ng=Symbol.for("react.provider"),rg=Symbol.for("react.context"),cc=Symbol.for("react.forward_ref"),Ma=Symbol.for("react.suspense"),Da=Symbol.for("react.suspense_list"),fc=Symbol.for("react.memo"),dn=Symbol.for("react.lazy"),ig=Symbol.for("react.offscreen"),ad=Symbol.iterator;function ui(e){return e===null||typeof e!="object"?null:(e=ad&&e[ad]||e["@@iterator"],typeof e=="function"?e:null)}var ve=Object.assign,Pl;function ki(e){if(Pl===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Pl=t&&t[1]||""}return`
`+Pl+e}var Il=!1;function Nl(e,t){if(!e||Il)return"";Il=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(u){var r=u}Reflect.construct(e,[],t)}else{try{t.call()}catch(u){r=u}e.call(t.prototype)}else{try{throw Error()}catch(u){r=u}e()}}catch(u){if(u&&r&&typeof u.stack=="string"){for(var i=u.stack.split(`
`),o=r.stack.split(`
`),s=i.length-1,l=o.length-1;1<=s&&0<=l&&i[s]!==o[l];)l--;for(;1<=s&&0<=l;s--,l--)if(i[s]!==o[l]){if(s!==1||l!==1)do if(s--,l--,0>l||i[s]!==o[l]){var a=`
`+i[s].replace(" at new "," at ");return e.displayName&&a.includes("<anonymous>")&&(a=a.replace("<anonymous>",e.displayName)),a}while(1<=s&&0<=l);break}}}finally{Il=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?ki(e):""}function C1(e){switch(e.tag){case 5:return ki(e.type);case 16:return ki("Lazy");case 13:return ki("Suspense");case 19:return ki("SuspenseList");case 0:case 2:case 15:return e=Nl(e.type,!1),e;case 11:return e=Nl(e.type.render,!1),e;case 1:return e=Nl(e.type,!0),e;default:return""}}function La(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case xr:return"Fragment";case yr:return"Portal";case Ra:return"Profiler";case uc:return"StrictMode";case Ma:return"Suspense";case Da:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case rg:return(e.displayName||"Context")+".Consumer";case ng:return(e._context.displayName||"Context")+".Provider";case cc:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case fc:return t=e.displayName||null,t!==null?t:La(e.type)||"Memo";case dn:t=e._payload,e=e._init;try{return La(e(t))}catch{}}return null}function E1(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return La(t);case 8:return t===uc?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Pn(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function og(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function T1(e){var t=og(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,o=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(s){r=""+s,o.call(this,s)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(s){r=""+s},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Do(e){e._valueTracker||(e._valueTracker=T1(e))}function sg(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=og(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function Ss(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function _a(e,t){var n=t.checked;return ve({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function ud(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=Pn(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function lg(e,t){t=t.checked,t!=null&&ac(e,"checked",t,!1)}function Oa(e,t){lg(e,t);var n=Pn(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Fa(e,t.type,n):t.hasOwnProperty("defaultValue")&&Fa(e,t.type,Pn(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function cd(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Fa(e,t,n){(t!=="number"||Ss(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Si=Array.isArray;function Lr(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t["$"+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty("$"+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=""+Pn(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function ja(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(R(91));return ve({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function fd(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(R(92));if(Si(n)){if(1<n.length)throw Error(R(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:Pn(n)}}function ag(e,t){var n=Pn(t.value),r=Pn(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function dd(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function ug(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function za(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?ug(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Lo,cg=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,i){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,i)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Lo=Lo||document.createElement("div"),Lo.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Lo.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Wi(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var bi={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},b1=["Webkit","ms","Moz","O"];Object.keys(bi).forEach(function(e){b1.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),bi[t]=bi[e]})});function fg(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||bi.hasOwnProperty(e)&&bi[e]?(""+t).trim():t+"px"}function dg(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,i=fg(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,i):e[n]=i}}var A1=ve({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Va(e,t){if(t){if(A1[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(R(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(R(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(R(61))}if(t.style!=null&&typeof t.style!="object")throw Error(R(62))}}function Ba(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ua=null;function dc(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Ha=null,_r=null,Or=null;function hd(e){if(e=ko(e)){if(typeof Ha!="function")throw Error(R(280));var t=e.stateNode;t&&(t=sl(t),Ha(e.stateNode,e.type,t))}}function hg(e){_r?Or?Or.push(e):Or=[e]:_r=e}function pg(){if(_r){var e=_r,t=Or;if(Or=_r=null,hd(e),t)for(e=0;e<t.length;e++)hd(t[e])}}function mg(e,t){return e(t)}function gg(){}var Rl=!1;function yg(e,t,n){if(Rl)return e(t,n);Rl=!0;try{return mg(e,t,n)}finally{Rl=!1,(_r!==null||Or!==null)&&(gg(),pg())}}function Ki(e,t){var n=e.stateNode;if(n===null)return null;var r=sl(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(R(231,t,typeof n));return n}var $a=!1;if(en)try{var ci={};Object.defineProperty(ci,"passive",{get:function(){$a=!0}}),window.addEventListener("test",ci,ci),window.removeEventListener("test",ci,ci)}catch{$a=!1}function P1(e,t,n,r,i,o,s,l,a){var u=Array.prototype.slice.call(arguments,3);try{t.apply(n,u)}catch(c){this.onError(c)}}var Ai=!1,Cs=null,Es=!1,Wa=null,I1={onError:function(e){Ai=!0,Cs=e}};function N1(e,t,n,r,i,o,s,l,a){Ai=!1,Cs=null,P1.apply(I1,arguments)}function R1(e,t,n,r,i,o,s,l,a){if(N1.apply(this,arguments),Ai){if(Ai){var u=Cs;Ai=!1,Cs=null}else throw Error(R(198));Es||(Es=!0,Wa=u)}}function ur(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function xg(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function pd(e){if(ur(e)!==e)throw Error(R(188))}function M1(e){var t=e.alternate;if(!t){if(t=ur(e),t===null)throw Error(R(188));return t!==e?null:e}for(var n=e,r=t;;){var i=n.return;if(i===null)break;var o=i.alternate;if(o===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===o.child){for(o=i.child;o;){if(o===n)return pd(i),e;if(o===r)return pd(i),t;o=o.sibling}throw Error(R(188))}if(n.return!==r.return)n=i,r=o;else{for(var s=!1,l=i.child;l;){if(l===n){s=!0,n=i,r=o;break}if(l===r){s=!0,r=i,n=o;break}l=l.sibling}if(!s){for(l=o.child;l;){if(l===n){s=!0,n=o,r=i;break}if(l===r){s=!0,r=o,n=i;break}l=l.sibling}if(!s)throw Error(R(189))}}if(n.alternate!==r)throw Error(R(190))}if(n.tag!==3)throw Error(R(188));return n.stateNode.current===n?e:t}function vg(e){return e=M1(e),e!==null?wg(e):null}function wg(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=wg(e);if(t!==null)return t;e=e.sibling}return null}var kg=ht.unstable_scheduleCallback,md=ht.unstable_cancelCallback,D1=ht.unstable_shouldYield,L1=ht.unstable_requestPaint,Ce=ht.unstable_now,_1=ht.unstable_getCurrentPriorityLevel,hc=ht.unstable_ImmediatePriority,Sg=ht.unstable_UserBlockingPriority,Ts=ht.unstable_NormalPriority,O1=ht.unstable_LowPriority,Cg=ht.unstable_IdlePriority,nl=null,Bt=null;function F1(e){if(Bt&&typeof Bt.onCommitFiberRoot=="function")try{Bt.onCommitFiberRoot(nl,e,void 0,(e.current.flags&128)===128)}catch{}}var Dt=Math.clz32?Math.clz32:V1,j1=Math.log,z1=Math.LN2;function V1(e){return e>>>=0,e===0?32:31-(j1(e)/z1|0)|0}var _o=64,Oo=4194304;function Ci(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function bs(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,i=e.suspendedLanes,o=e.pingedLanes,s=n&268435455;if(s!==0){var l=s&~i;l!==0?r=Ci(l):(o&=s,o!==0&&(r=Ci(o)))}else s=n&~i,s!==0?r=Ci(s):o!==0&&(r=Ci(o));if(r===0)return 0;if(t!==0&&t!==r&&!(t&i)&&(i=r&-r,o=t&-t,i>=o||i===16&&(o&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-Dt(t),i=1<<n,r|=e[n],t&=~i;return r}function B1(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function U1(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,o=e.pendingLanes;0<o;){var s=31-Dt(o),l=1<<s,a=i[s];a===-1?(!(l&n)||l&r)&&(i[s]=B1(l,t)):a<=t&&(e.expiredLanes|=l),o&=~l}}function Ka(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Eg(){var e=_o;return _o<<=1,!(_o&4194240)&&(_o=64),e}function Ml(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function vo(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Dt(t),e[t]=n}function H1(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var i=31-Dt(n),o=1<<i;t[i]=0,r[i]=-1,e[i]=-1,n&=~o}}function pc(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Dt(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}var oe=0;function Tg(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var bg,mc,Ag,Pg,Ig,Ga=!1,Fo=[],vn=null,wn=null,kn=null,Gi=new Map,Yi=new Map,mn=[],$1="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function gd(e,t){switch(e){case"focusin":case"focusout":vn=null;break;case"dragenter":case"dragleave":wn=null;break;case"mouseover":case"mouseout":kn=null;break;case"pointerover":case"pointerout":Gi.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Yi.delete(t.pointerId)}}function fi(e,t,n,r,i,o){return e===null||e.nativeEvent!==o?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:o,targetContainers:[i]},t!==null&&(t=ko(t),t!==null&&mc(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function W1(e,t,n,r,i){switch(t){case"focusin":return vn=fi(vn,e,t,n,r,i),!0;case"dragenter":return wn=fi(wn,e,t,n,r,i),!0;case"mouseover":return kn=fi(kn,e,t,n,r,i),!0;case"pointerover":var o=i.pointerId;return Gi.set(o,fi(Gi.get(o)||null,e,t,n,r,i)),!0;case"gotpointercapture":return o=i.pointerId,Yi.set(o,fi(Yi.get(o)||null,e,t,n,r,i)),!0}return!1}function Ng(e){var t=Wn(e.target);if(t!==null){var n=ur(t);if(n!==null){if(t=n.tag,t===13){if(t=xg(n),t!==null){e.blockedOn=t,Ig(e.priority,function(){Ag(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function is(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Ya(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Ua=r,n.target.dispatchEvent(r),Ua=null}else return t=ko(n),t!==null&&mc(t),e.blockedOn=n,!1;t.shift()}return!0}function yd(e,t,n){is(e)&&n.delete(t)}function K1(){Ga=!1,vn!==null&&is(vn)&&(vn=null),wn!==null&&is(wn)&&(wn=null),kn!==null&&is(kn)&&(kn=null),Gi.forEach(yd),Yi.forEach(yd)}function di(e,t){e.blockedOn===t&&(e.blockedOn=null,Ga||(Ga=!0,ht.unstable_scheduleCallback(ht.unstable_NormalPriority,K1)))}function qi(e){function t(i){return di(i,e)}if(0<Fo.length){di(Fo[0],e);for(var n=1;n<Fo.length;n++){var r=Fo[n];r.blockedOn===e&&(r.blockedOn=null)}}for(vn!==null&&di(vn,e),wn!==null&&di(wn,e),kn!==null&&di(kn,e),Gi.forEach(t),Yi.forEach(t),n=0;n<mn.length;n++)r=mn[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<mn.length&&(n=mn[0],n.blockedOn===null);)Ng(n),n.blockedOn===null&&mn.shift()}var Fr=ln.ReactCurrentBatchConfig,As=!0;function G1(e,t,n,r){var i=oe,o=Fr.transition;Fr.transition=null;try{oe=1,gc(e,t,n,r)}finally{oe=i,Fr.transition=o}}function Y1(e,t,n,r){var i=oe,o=Fr.transition;Fr.transition=null;try{oe=4,gc(e,t,n,r)}finally{oe=i,Fr.transition=o}}function gc(e,t,n,r){if(As){var i=Ya(e,t,n,r);if(i===null)Ul(e,t,r,Ps,n),gd(e,r);else if(W1(i,e,t,n,r))r.stopPropagation();else if(gd(e,r),t&4&&-1<$1.indexOf(e)){for(;i!==null;){var o=ko(i);if(o!==null&&bg(o),o=Ya(e,t,n,r),o===null&&Ul(e,t,r,Ps,n),o===i)break;i=o}i!==null&&r.stopPropagation()}else Ul(e,t,r,null,n)}}var Ps=null;function Ya(e,t,n,r){if(Ps=null,e=dc(r),e=Wn(e),e!==null)if(t=ur(e),t===null)e=null;else if(n=t.tag,n===13){if(e=xg(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Ps=e,null}function Rg(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(_1()){case hc:return 1;case Sg:return 4;case Ts:case O1:return 16;case Cg:return 536870912;default:return 16}default:return 16}}var yn=null,yc=null,os=null;function Mg(){if(os)return os;var e,t=yc,n=t.length,r,i="value"in yn?yn.value:yn.textContent,o=i.length;for(e=0;e<n&&t[e]===i[e];e++);var s=n-e;for(r=1;r<=s&&t[n-r]===i[o-r];r++);return os=i.slice(e,1<r?1-r:void 0)}function ss(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function jo(){return!0}function xd(){return!1}function mt(e){function t(n,r,i,o,s){this._reactName=n,this._targetInst=i,this.type=r,this.nativeEvent=o,this.target=s,this.currentTarget=null;for(var l in e)e.hasOwnProperty(l)&&(n=e[l],this[l]=n?n(o):o[l]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?jo:xd,this.isPropagationStopped=xd,this}return ve(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=jo)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=jo)},persist:function(){},isPersistent:jo}),t}var ei={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},xc=mt(ei),wo=ve({},ei,{view:0,detail:0}),q1=mt(wo),Dl,Ll,hi,rl=ve({},wo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:vc,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==hi&&(hi&&e.type==="mousemove"?(Dl=e.screenX-hi.screenX,Ll=e.screenY-hi.screenY):Ll=Dl=0,hi=e),Dl)},movementY:function(e){return"movementY"in e?e.movementY:Ll}}),vd=mt(rl),X1=ve({},rl,{dataTransfer:0}),Q1=mt(X1),Z1=ve({},wo,{relatedTarget:0}),_l=mt(Z1),J1=ve({},ei,{animationName:0,elapsedTime:0,pseudoElement:0}),ew=mt(J1),tw=ve({},ei,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),nw=mt(tw),rw=ve({},ei,{data:0}),wd=mt(rw),iw={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},ow={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},sw={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function lw(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=sw[e])?!!t[e]:!1}function vc(){return lw}var aw=ve({},wo,{key:function(e){if(e.key){var t=iw[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=ss(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?ow[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:vc,charCode:function(e){return e.type==="keypress"?ss(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?ss(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),uw=mt(aw),cw=ve({},rl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),kd=mt(cw),fw=ve({},wo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:vc}),dw=mt(fw),hw=ve({},ei,{propertyName:0,elapsedTime:0,pseudoElement:0}),pw=mt(hw),mw=ve({},rl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),gw=mt(mw),yw=[9,13,27,32],wc=en&&"CompositionEvent"in window,Pi=null;en&&"documentMode"in document&&(Pi=document.documentMode);var xw=en&&"TextEvent"in window&&!Pi,Dg=en&&(!wc||Pi&&8<Pi&&11>=Pi),Sd=" ",Cd=!1;function Lg(e,t){switch(e){case"keyup":return yw.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function _g(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var vr=!1;function vw(e,t){switch(e){case"compositionend":return _g(t);case"keypress":return t.which!==32?null:(Cd=!0,Sd);case"textInput":return e=t.data,e===Sd&&Cd?null:e;default:return null}}function ww(e,t){if(vr)return e==="compositionend"||!wc&&Lg(e,t)?(e=Mg(),os=yc=yn=null,vr=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Dg&&t.locale!=="ko"?null:t.data;default:return null}}var kw={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Ed(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!kw[e.type]:t==="textarea"}function Og(e,t,n,r){hg(r),t=Is(t,"onChange"),0<t.length&&(n=new xc("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Ii=null,Xi=null;function Sw(e){Gg(e,0)}function il(e){var t=Sr(e);if(sg(t))return e}function Cw(e,t){if(e==="change")return t}var Fg=!1;if(en){var Ol;if(en){var Fl="oninput"in document;if(!Fl){var Td=document.createElement("div");Td.setAttribute("oninput","return;"),Fl=typeof Td.oninput=="function"}Ol=Fl}else Ol=!1;Fg=Ol&&(!document.documentMode||9<document.documentMode)}function bd(){Ii&&(Ii.detachEvent("onpropertychange",jg),Xi=Ii=null)}function jg(e){if(e.propertyName==="value"&&il(Xi)){var t=[];Og(t,Xi,e,dc(e)),yg(Sw,t)}}function Ew(e,t,n){e==="focusin"?(bd(),Ii=t,Xi=n,Ii.attachEvent("onpropertychange",jg)):e==="focusout"&&bd()}function Tw(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return il(Xi)}function bw(e,t){if(e==="click")return il(t)}function Aw(e,t){if(e==="input"||e==="change")return il(t)}function Pw(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Ot=typeof Object.is=="function"?Object.is:Pw;function Qi(e,t){if(Ot(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Na.call(t,i)||!Ot(e[i],t[i]))return!1}return!0}function Ad(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Pd(e,t){var n=Ad(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Ad(n)}}function zg(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?zg(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Vg(){for(var e=window,t=Ss();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Ss(e.document)}return t}function kc(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Iw(e){var t=Vg(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&zg(n.ownerDocument.documentElement,n)){if(r!==null&&kc(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var i=n.textContent.length,o=Math.min(r.start,i);r=r.end===void 0?o:Math.min(r.end,i),!e.extend&&o>r&&(i=r,r=o,o=i),i=Pd(n,o);var s=Pd(n,r);i&&s&&(e.rangeCount!==1||e.anchorNode!==i.node||e.anchorOffset!==i.offset||e.focusNode!==s.node||e.focusOffset!==s.offset)&&(t=t.createRange(),t.setStart(i.node,i.offset),e.removeAllRanges(),o>r?(e.addRange(t),e.extend(s.node,s.offset)):(t.setEnd(s.node,s.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Nw=en&&"documentMode"in document&&11>=document.documentMode,wr=null,qa=null,Ni=null,Xa=!1;function Id(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Xa||wr==null||wr!==Ss(r)||(r=wr,"selectionStart"in r&&kc(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Ni&&Qi(Ni,r)||(Ni=r,r=Is(qa,"onSelect"),0<r.length&&(t=new xc("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=wr)))}function zo(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var kr={animationend:zo("Animation","AnimationEnd"),animationiteration:zo("Animation","AnimationIteration"),animationstart:zo("Animation","AnimationStart"),transitionend:zo("Transition","TransitionEnd")},jl={},Bg={};en&&(Bg=document.createElement("div").style,"AnimationEvent"in window||(delete kr.animationend.animation,delete kr.animationiteration.animation,delete kr.animationstart.animation),"TransitionEvent"in window||delete kr.transitionend.transition);function ol(e){if(jl[e])return jl[e];if(!kr[e])return e;var t=kr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Bg)return jl[e]=t[n];return e}var Ug=ol("animationend"),Hg=ol("animationiteration"),$g=ol("animationstart"),Wg=ol("transitionend"),Kg=new Map,Nd="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Mn(e,t){Kg.set(e,t),ar(t,[e])}for(var zl=0;zl<Nd.length;zl++){var Vl=Nd[zl],Rw=Vl.toLowerCase(),Mw=Vl[0].toUpperCase()+Vl.slice(1);Mn(Rw,"on"+Mw)}Mn(Ug,"onAnimationEnd");Mn(Hg,"onAnimationIteration");Mn($g,"onAnimationStart");Mn("dblclick","onDoubleClick");Mn("focusin","onFocus");Mn("focusout","onBlur");Mn(Wg,"onTransitionEnd");Ur("onMouseEnter",["mouseout","mouseover"]);Ur("onMouseLeave",["mouseout","mouseover"]);Ur("onPointerEnter",["pointerout","pointerover"]);Ur("onPointerLeave",["pointerout","pointerover"]);ar("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));ar("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));ar("onBeforeInput",["compositionend","keypress","textInput","paste"]);ar("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));ar("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));ar("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ei="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Dw=new Set("cancel close invalid load scroll toggle".split(" ").concat(Ei));function Rd(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,R1(r,t,void 0,e),e.currentTarget=null}function Gg(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;e:{var o=void 0;if(t)for(var s=r.length-1;0<=s;s--){var l=r[s],a=l.instance,u=l.currentTarget;if(l=l.listener,a!==o&&i.isPropagationStopped())break e;Rd(i,l,u),o=a}else for(s=0;s<r.length;s++){if(l=r[s],a=l.instance,u=l.currentTarget,l=l.listener,a!==o&&i.isPropagationStopped())break e;Rd(i,l,u),o=a}}}if(Es)throw e=Wa,Es=!1,Wa=null,e}function fe(e,t){var n=t[tu];n===void 0&&(n=t[tu]=new Set);var r=e+"__bubble";n.has(r)||(Yg(t,e,2,!1),n.add(r))}function Bl(e,t,n){var r=0;t&&(r|=4),Yg(n,e,r,t)}var Vo="_reactListening"+Math.random().toString(36).slice(2);function Zi(e){if(!e[Vo]){e[Vo]=!0,tg.forEach(function(n){n!=="selectionchange"&&(Dw.has(n)||Bl(n,!1,e),Bl(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Vo]||(t[Vo]=!0,Bl("selectionchange",!1,t))}}function Yg(e,t,n,r){switch(Rg(t)){case 1:var i=G1;break;case 4:i=Y1;break;default:i=gc}n=i.bind(null,t,n,e),i=void 0,!$a||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(i=!0),r?i!==void 0?e.addEventListener(t,n,{capture:!0,passive:i}):e.addEventListener(t,n,!0):i!==void 0?e.addEventListener(t,n,{passive:i}):e.addEventListener(t,n,!1)}function Ul(e,t,n,r,i){var o=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var l=r.stateNode.containerInfo;if(l===i||l.nodeType===8&&l.parentNode===i)break;if(s===4)for(s=r.return;s!==null;){var a=s.tag;if((a===3||a===4)&&(a=s.stateNode.containerInfo,a===i||a.nodeType===8&&a.parentNode===i))return;s=s.return}for(;l!==null;){if(s=Wn(l),s===null)return;if(a=s.tag,a===5||a===6){r=o=s;continue e}l=l.parentNode}}r=r.return}yg(function(){var u=o,c=dc(n),f=[];e:{var d=Kg.get(e);if(d!==void 0){var h=xc,m=e;switch(e){case"keypress":if(ss(n)===0)break e;case"keydown":case"keyup":h=uw;break;case"focusin":m="focus",h=_l;break;case"focusout":m="blur",h=_l;break;case"beforeblur":case"afterblur":h=_l;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":h=vd;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":h=Q1;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":h=dw;break;case Ug:case Hg:case $g:h=ew;break;case Wg:h=pw;break;case"scroll":h=q1;break;case"wheel":h=gw;break;case"copy":case"cut":case"paste":h=nw;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":h=kd}var x=(t&4)!==0,E=!x&&e==="scroll",p=x?d!==null?d+"Capture":null:d;x=[];for(var g=u,y;g!==null;){y=g;var T=y.stateNode;if(y.tag===5&&T!==null&&(y=T,p!==null&&(T=Ki(g,p),T!=null&&x.push(Ji(g,T,y)))),E)break;g=g.return}0<x.length&&(d=new h(d,m,null,n,c),f.push({event:d,listeners:x}))}}if(!(t&7)){e:{if(d=e==="mouseover"||e==="pointerover",h=e==="mouseout"||e==="pointerout",d&&n!==Ua&&(m=n.relatedTarget||n.fromElement)&&(Wn(m)||m[tn]))break e;if((h||d)&&(d=c.window===c?c:(d=c.ownerDocument)?d.defaultView||d.parentWindow:window,h?(m=n.relatedTarget||n.toElement,h=u,m=m?Wn(m):null,m!==null&&(E=ur(m),m!==E||m.tag!==5&&m.tag!==6)&&(m=null)):(h=null,m=u),h!==m)){if(x=vd,T="onMouseLeave",p="onMouseEnter",g="mouse",(e==="pointerout"||e==="pointerover")&&(x=kd,T="onPointerLeave",p="onPointerEnter",g="pointer"),E=h==null?d:Sr(h),y=m==null?d:Sr(m),d=new x(T,g+"leave",h,n,c),d.target=E,d.relatedTarget=y,T=null,Wn(c)===u&&(x=new x(p,g+"enter",m,n,c),x.target=y,x.relatedTarget=E,T=x),E=T,h&&m)t:{for(x=h,p=m,g=0,y=x;y;y=hr(y))g++;for(y=0,T=p;T;T=hr(T))y++;for(;0<g-y;)x=hr(x),g--;for(;0<y-g;)p=hr(p),y--;for(;g--;){if(x===p||p!==null&&x===p.alternate)break t;x=hr(x),p=hr(p)}x=null}else x=null;h!==null&&Md(f,d,h,x,!1),m!==null&&E!==null&&Md(f,E,m,x,!0)}}e:{if(d=u?Sr(u):window,h=d.nodeName&&d.nodeName.toLowerCase(),h==="select"||h==="input"&&d.type==="file")var b=Cw;else if(Ed(d))if(Fg)b=Aw;else{b=Tw;var k=Ew}else(h=d.nodeName)&&h.toLowerCase()==="input"&&(d.type==="checkbox"||d.type==="radio")&&(b=bw);if(b&&(b=b(e,u))){Og(f,b,n,c);break e}k&&k(e,d,u),e==="focusout"&&(k=d._wrapperState)&&k.controlled&&d.type==="number"&&Fa(d,"number",d.value)}switch(k=u?Sr(u):window,e){case"focusin":(Ed(k)||k.contentEditable==="true")&&(wr=k,qa=u,Ni=null);break;case"focusout":Ni=qa=wr=null;break;case"mousedown":Xa=!0;break;case"contextmenu":case"mouseup":case"dragend":Xa=!1,Id(f,n,c);break;case"selectionchange":if(Nw)break;case"keydown":case"keyup":Id(f,n,c)}var A;if(wc)e:{switch(e){case"compositionstart":var P="onCompositionStart";break e;case"compositionend":P="onCompositionEnd";break e;case"compositionupdate":P="onCompositionUpdate";break e}P=void 0}else vr?Lg(e,n)&&(P="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(P="onCompositionStart");P&&(Dg&&n.locale!=="ko"&&(vr||P!=="onCompositionStart"?P==="onCompositionEnd"&&vr&&(A=Mg()):(yn=c,yc="value"in yn?yn.value:yn.textContent,vr=!0)),k=Is(u,P),0<k.length&&(P=new wd(P,e,null,n,c),f.push({event:P,listeners:k}),A?P.data=A:(A=_g(n),A!==null&&(P.data=A)))),(A=xw?vw(e,n):ww(e,n))&&(u=Is(u,"onBeforeInput"),0<u.length&&(c=new wd("onBeforeInput","beforeinput",null,n,c),f.push({event:c,listeners:u}),c.data=A))}Gg(f,t)})}function Ji(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Is(e,t){for(var n=t+"Capture",r=[];e!==null;){var i=e,o=i.stateNode;i.tag===5&&o!==null&&(i=o,o=Ki(e,n),o!=null&&r.unshift(Ji(e,o,i)),o=Ki(e,t),o!=null&&r.push(Ji(e,o,i))),e=e.return}return r}function hr(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Md(e,t,n,r,i){for(var o=t._reactName,s=[];n!==null&&n!==r;){var l=n,a=l.alternate,u=l.stateNode;if(a!==null&&a===r)break;l.tag===5&&u!==null&&(l=u,i?(a=Ki(n,o),a!=null&&s.unshift(Ji(n,a,l))):i||(a=Ki(n,o),a!=null&&s.push(Ji(n,a,l)))),n=n.return}s.length!==0&&e.push({event:t,listeners:s})}var Lw=/\r\n?/g,_w=/\u0000|\uFFFD/g;function Dd(e){return(typeof e=="string"?e:""+e).replace(Lw,`
`).replace(_w,"")}function Bo(e,t,n){if(t=Dd(t),Dd(e)!==t&&n)throw Error(R(425))}function Ns(){}var Qa=null,Za=null;function Ja(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var eu=typeof setTimeout=="function"?setTimeout:void 0,Ow=typeof clearTimeout=="function"?clearTimeout:void 0,Ld=typeof Promise=="function"?Promise:void 0,Fw=typeof queueMicrotask=="function"?queueMicrotask:typeof Ld<"u"?function(e){return Ld.resolve(null).then(e).catch(jw)}:eu;function jw(e){setTimeout(function(){throw e})}function Hl(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(r===0){e.removeChild(i),qi(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=i}while(n);qi(t)}function Sn(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function _d(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var ti=Math.random().toString(36).slice(2),Vt="__reactFiber$"+ti,eo="__reactProps$"+ti,tn="__reactContainer$"+ti,tu="__reactEvents$"+ti,zw="__reactListeners$"+ti,Vw="__reactHandles$"+ti;function Wn(e){var t=e[Vt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[tn]||n[Vt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=_d(e);e!==null;){if(n=e[Vt])return n;e=_d(e)}return t}e=n,n=e.parentNode}return null}function ko(e){return e=e[Vt]||e[tn],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Sr(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(R(33))}function sl(e){return e[eo]||null}var nu=[],Cr=-1;function Dn(e){return{current:e}}function de(e){0>Cr||(e.current=nu[Cr],nu[Cr]=null,Cr--)}function ue(e,t){Cr++,nu[Cr]=e.current,e.current=t}var In={},Ue=Dn(In),rt=Dn(!1),er=In;function Hr(e,t){var n=e.type.contextTypes;if(!n)return In;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var i={},o;for(o in n)i[o]=t[o];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=i),i}function it(e){return e=e.childContextTypes,e!=null}function Rs(){de(rt),de(Ue)}function Od(e,t,n){if(Ue.current!==In)throw Error(R(168));ue(Ue,t),ue(rt,n)}function qg(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var i in r)if(!(i in t))throw Error(R(108,E1(e)||"Unknown",i));return ve({},n,r)}function Ms(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||In,er=Ue.current,ue(Ue,e),ue(rt,rt.current),!0}function Fd(e,t,n){var r=e.stateNode;if(!r)throw Error(R(169));n?(e=qg(e,t,er),r.__reactInternalMemoizedMergedChildContext=e,de(rt),de(Ue),ue(Ue,e)):de(rt),ue(rt,n)}var Xt=null,ll=!1,$l=!1;function Xg(e){Xt===null?Xt=[e]:Xt.push(e)}function Bw(e){ll=!0,Xg(e)}function Ln(){if(!$l&&Xt!==null){$l=!0;var e=0,t=oe;try{var n=Xt;for(oe=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}Xt=null,ll=!1}catch(i){throw Xt!==null&&(Xt=Xt.slice(e+1)),kg(hc,Ln),i}finally{oe=t,$l=!1}}return null}var Er=[],Tr=0,Ds=null,Ls=0,xt=[],vt=0,tr=null,Qt=1,Zt="";function Vn(e,t){Er[Tr++]=Ls,Er[Tr++]=Ds,Ds=e,Ls=t}function Qg(e,t,n){xt[vt++]=Qt,xt[vt++]=Zt,xt[vt++]=tr,tr=e;var r=Qt;e=Zt;var i=32-Dt(r)-1;r&=~(1<<i),n+=1;var o=32-Dt(t)+i;if(30<o){var s=i-i%5;o=(r&(1<<s)-1).toString(32),r>>=s,i-=s,Qt=1<<32-Dt(t)+i|n<<i|r,Zt=o+e}else Qt=1<<o|n<<i|r,Zt=e}function Sc(e){e.return!==null&&(Vn(e,1),Qg(e,1,0))}function Cc(e){for(;e===Ds;)Ds=Er[--Tr],Er[Tr]=null,Ls=Er[--Tr],Er[Tr]=null;for(;e===tr;)tr=xt[--vt],xt[vt]=null,Zt=xt[--vt],xt[vt]=null,Qt=xt[--vt],xt[vt]=null}var ft=null,ct=null,he=!1,Mt=null;function Zg(e,t){var n=kt(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function jd(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,ft=e,ct=Sn(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,ft=e,ct=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=tr!==null?{id:Qt,overflow:Zt}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=kt(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,ft=e,ct=null,!0):!1;default:return!1}}function ru(e){return(e.mode&1)!==0&&(e.flags&128)===0}function iu(e){if(he){var t=ct;if(t){var n=t;if(!jd(e,t)){if(ru(e))throw Error(R(418));t=Sn(n.nextSibling);var r=ft;t&&jd(e,t)?Zg(r,n):(e.flags=e.flags&-4097|2,he=!1,ft=e)}}else{if(ru(e))throw Error(R(418));e.flags=e.flags&-4097|2,he=!1,ft=e}}}function zd(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;ft=e}function Uo(e){if(e!==ft)return!1;if(!he)return zd(e),he=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Ja(e.type,e.memoizedProps)),t&&(t=ct)){if(ru(e))throw Jg(),Error(R(418));for(;t;)Zg(e,t),t=Sn(t.nextSibling)}if(zd(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(R(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){ct=Sn(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}ct=null}}else ct=ft?Sn(e.stateNode.nextSibling):null;return!0}function Jg(){for(var e=ct;e;)e=Sn(e.nextSibling)}function $r(){ct=ft=null,he=!1}function Ec(e){Mt===null?Mt=[e]:Mt.push(e)}var Uw=ln.ReactCurrentBatchConfig;function pi(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(R(309));var r=n.stateNode}if(!r)throw Error(R(147,e));var i=r,o=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===o?t.ref:(t=function(s){var l=i.refs;s===null?delete l[o]:l[o]=s},t._stringRef=o,t)}if(typeof e!="string")throw Error(R(284));if(!n._owner)throw Error(R(290,e))}return e}function Ho(e,t){throw e=Object.prototype.toString.call(t),Error(R(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Vd(e){var t=e._init;return t(e._payload)}function ey(e){function t(p,g){if(e){var y=p.deletions;y===null?(p.deletions=[g],p.flags|=16):y.push(g)}}function n(p,g){if(!e)return null;for(;g!==null;)t(p,g),g=g.sibling;return null}function r(p,g){for(p=new Map;g!==null;)g.key!==null?p.set(g.key,g):p.set(g.index,g),g=g.sibling;return p}function i(p,g){return p=bn(p,g),p.index=0,p.sibling=null,p}function o(p,g,y){return p.index=y,e?(y=p.alternate,y!==null?(y=y.index,y<g?(p.flags|=2,g):y):(p.flags|=2,g)):(p.flags|=1048576,g)}function s(p){return e&&p.alternate===null&&(p.flags|=2),p}function l(p,g,y,T){return g===null||g.tag!==6?(g=Ql(y,p.mode,T),g.return=p,g):(g=i(g,y),g.return=p,g)}function a(p,g,y,T){var b=y.type;return b===xr?c(p,g,y.props.children,T,y.key):g!==null&&(g.elementType===b||typeof b=="object"&&b!==null&&b.$$typeof===dn&&Vd(b)===g.type)?(T=i(g,y.props),T.ref=pi(p,g,y),T.return=p,T):(T=hs(y.type,y.key,y.props,null,p.mode,T),T.ref=pi(p,g,y),T.return=p,T)}function u(p,g,y,T){return g===null||g.tag!==4||g.stateNode.containerInfo!==y.containerInfo||g.stateNode.implementation!==y.implementation?(g=Zl(y,p.mode,T),g.return=p,g):(g=i(g,y.children||[]),g.return=p,g)}function c(p,g,y,T,b){return g===null||g.tag!==7?(g=Qn(y,p.mode,T,b),g.return=p,g):(g=i(g,y),g.return=p,g)}function f(p,g,y){if(typeof g=="string"&&g!==""||typeof g=="number")return g=Ql(""+g,p.mode,y),g.return=p,g;if(typeof g=="object"&&g!==null){switch(g.$$typeof){case Mo:return y=hs(g.type,g.key,g.props,null,p.mode,y),y.ref=pi(p,null,g),y.return=p,y;case yr:return g=Zl(g,p.mode,y),g.return=p,g;case dn:var T=g._init;return f(p,T(g._payload),y)}if(Si(g)||ui(g))return g=Qn(g,p.mode,y,null),g.return=p,g;Ho(p,g)}return null}function d(p,g,y,T){var b=g!==null?g.key:null;if(typeof y=="string"&&y!==""||typeof y=="number")return b!==null?null:l(p,g,""+y,T);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case Mo:return y.key===b?a(p,g,y,T):null;case yr:return y.key===b?u(p,g,y,T):null;case dn:return b=y._init,d(p,g,b(y._payload),T)}if(Si(y)||ui(y))return b!==null?null:c(p,g,y,T,null);Ho(p,y)}return null}function h(p,g,y,T,b){if(typeof T=="string"&&T!==""||typeof T=="number")return p=p.get(y)||null,l(g,p,""+T,b);if(typeof T=="object"&&T!==null){switch(T.$$typeof){case Mo:return p=p.get(T.key===null?y:T.key)||null,a(g,p,T,b);case yr:return p=p.get(T.key===null?y:T.key)||null,u(g,p,T,b);case dn:var k=T._init;return h(p,g,y,k(T._payload),b)}if(Si(T)||ui(T))return p=p.get(y)||null,c(g,p,T,b,null);Ho(g,T)}return null}function m(p,g,y,T){for(var b=null,k=null,A=g,P=g=0,O=null;A!==null&&P<y.length;P++){A.index>P?(O=A,A=null):O=A.sibling;var C=d(p,A,y[P],T);if(C===null){A===null&&(A=O);break}e&&A&&C.alternate===null&&t(p,A),g=o(C,g,P),k===null?b=C:k.sibling=C,k=C,A=O}if(P===y.length)return n(p,A),he&&Vn(p,P),b;if(A===null){for(;P<y.length;P++)A=f(p,y[P],T),A!==null&&(g=o(A,g,P),k===null?b=A:k.sibling=A,k=A);return he&&Vn(p,P),b}for(A=r(p,A);P<y.length;P++)O=h(A,p,P,y[P],T),O!==null&&(e&&O.alternate!==null&&A.delete(O.key===null?P:O.key),g=o(O,g,P),k===null?b=O:k.sibling=O,k=O);return e&&A.forEach(function(L){return t(p,L)}),he&&Vn(p,P),b}function x(p,g,y,T){var b=ui(y);if(typeof b!="function")throw Error(R(150));if(y=b.call(y),y==null)throw Error(R(151));for(var k=b=null,A=g,P=g=0,O=null,C=y.next();A!==null&&!C.done;P++,C=y.next()){A.index>P?(O=A,A=null):O=A.sibling;var L=d(p,A,C.value,T);if(L===null){A===null&&(A=O);break}e&&A&&L.alternate===null&&t(p,A),g=o(L,g,P),k===null?b=L:k.sibling=L,k=L,A=O}if(C.done)return n(p,A),he&&Vn(p,P),b;if(A===null){for(;!C.done;P++,C=y.next())C=f(p,C.value,T),C!==null&&(g=o(C,g,P),k===null?b=C:k.sibling=C,k=C);return he&&Vn(p,P),b}for(A=r(p,A);!C.done;P++,C=y.next())C=h(A,p,P,C.value,T),C!==null&&(e&&C.alternate!==null&&A.delete(C.key===null?P:C.key),g=o(C,g,P),k===null?b=C:k.sibling=C,k=C);return e&&A.forEach(function(F){return t(p,F)}),he&&Vn(p,P),b}function E(p,g,y,T){if(typeof y=="object"&&y!==null&&y.type===xr&&y.key===null&&(y=y.props.children),typeof y=="object"&&y!==null){switch(y.$$typeof){case Mo:e:{for(var b=y.key,k=g;k!==null;){if(k.key===b){if(b=y.type,b===xr){if(k.tag===7){n(p,k.sibling),g=i(k,y.props.children),g.return=p,p=g;break e}}else if(k.elementType===b||typeof b=="object"&&b!==null&&b.$$typeof===dn&&Vd(b)===k.type){n(p,k.sibling),g=i(k,y.props),g.ref=pi(p,k,y),g.return=p,p=g;break e}n(p,k);break}else t(p,k);k=k.sibling}y.type===xr?(g=Qn(y.props.children,p.mode,T,y.key),g.return=p,p=g):(T=hs(y.type,y.key,y.props,null,p.mode,T),T.ref=pi(p,g,y),T.return=p,p=T)}return s(p);case yr:e:{for(k=y.key;g!==null;){if(g.key===k)if(g.tag===4&&g.stateNode.containerInfo===y.containerInfo&&g.stateNode.implementation===y.implementation){n(p,g.sibling),g=i(g,y.children||[]),g.return=p,p=g;break e}else{n(p,g);break}else t(p,g);g=g.sibling}g=Zl(y,p.mode,T),g.return=p,p=g}return s(p);case dn:return k=y._init,E(p,g,k(y._payload),T)}if(Si(y))return m(p,g,y,T);if(ui(y))return x(p,g,y,T);Ho(p,y)}return typeof y=="string"&&y!==""||typeof y=="number"?(y=""+y,g!==null&&g.tag===6?(n(p,g.sibling),g=i(g,y),g.return=p,p=g):(n(p,g),g=Ql(y,p.mode,T),g.return=p,p=g),s(p)):n(p,g)}return E}var Wr=ey(!0),ty=ey(!1),_s=Dn(null),Os=null,br=null,Tc=null;function bc(){Tc=br=Os=null}function Ac(e){var t=_s.current;de(_s),e._currentValue=t}function ou(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function jr(e,t){Os=e,Tc=br=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(tt=!0),e.firstContext=null)}function Tt(e){var t=e._currentValue;if(Tc!==e)if(e={context:e,memoizedValue:t,next:null},br===null){if(Os===null)throw Error(R(308));br=e,Os.dependencies={lanes:0,firstContext:e}}else br=br.next=e;return t}var Kn=null;function Pc(e){Kn===null?Kn=[e]:Kn.push(e)}function ny(e,t,n,r){var i=t.interleaved;return i===null?(n.next=n,Pc(t)):(n.next=i.next,i.next=n),t.interleaved=n,nn(e,r)}function nn(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var hn=!1;function Ic(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function ry(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Jt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Cn(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,ne&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,nn(e,n)}return i=r.interleaved,i===null?(t.next=t,Pc(r)):(t.next=i.next,i.next=t),r.interleaved=t,nn(e,n)}function ls(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,pc(e,n)}}function Bd(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,o=null;if(n=n.firstBaseUpdate,n!==null){do{var s={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};o===null?i=o=s:o=o.next=s,n=n.next}while(n!==null);o===null?i=o=t:o=o.next=t}else i=o=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:o,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function Fs(e,t,n,r){var i=e.updateQueue;hn=!1;var o=i.firstBaseUpdate,s=i.lastBaseUpdate,l=i.shared.pending;if(l!==null){i.shared.pending=null;var a=l,u=a.next;a.next=null,s===null?o=u:s.next=u,s=a;var c=e.alternate;c!==null&&(c=c.updateQueue,l=c.lastBaseUpdate,l!==s&&(l===null?c.firstBaseUpdate=u:l.next=u,c.lastBaseUpdate=a))}if(o!==null){var f=i.baseState;s=0,c=u=a=null,l=o;do{var d=l.lane,h=l.eventTime;if((r&d)===d){c!==null&&(c=c.next={eventTime:h,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var m=e,x=l;switch(d=t,h=n,x.tag){case 1:if(m=x.payload,typeof m=="function"){f=m.call(h,f,d);break e}f=m;break e;case 3:m.flags=m.flags&-65537|128;case 0:if(m=x.payload,d=typeof m=="function"?m.call(h,f,d):m,d==null)break e;f=ve({},f,d);break e;case 2:hn=!0}}l.callback!==null&&l.lane!==0&&(e.flags|=64,d=i.effects,d===null?i.effects=[l]:d.push(l))}else h={eventTime:h,lane:d,tag:l.tag,payload:l.payload,callback:l.callback,next:null},c===null?(u=c=h,a=f):c=c.next=h,s|=d;if(l=l.next,l===null){if(l=i.shared.pending,l===null)break;d=l,l=d.next,d.next=null,i.lastBaseUpdate=d,i.shared.pending=null}}while(!0);if(c===null&&(a=f),i.baseState=a,i.firstBaseUpdate=u,i.lastBaseUpdate=c,t=i.shared.interleaved,t!==null){i=t;do s|=i.lane,i=i.next;while(i!==t)}else o===null&&(i.shared.lanes=0);rr|=s,e.lanes=s,e.memoizedState=f}}function Ud(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],i=r.callback;if(i!==null){if(r.callback=null,r=n,typeof i!="function")throw Error(R(191,i));i.call(r)}}}var So={},Ut=Dn(So),to=Dn(So),no=Dn(So);function Gn(e){if(e===So)throw Error(R(174));return e}function Nc(e,t){switch(ue(no,t),ue(to,e),ue(Ut,So),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:za(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=za(t,e)}de(Ut),ue(Ut,t)}function Kr(){de(Ut),de(to),de(no)}function iy(e){Gn(no.current);var t=Gn(Ut.current),n=za(t,e.type);t!==n&&(ue(to,e),ue(Ut,n))}function Rc(e){to.current===e&&(de(Ut),de(to))}var ge=Dn(0);function js(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Wl=[];function Mc(){for(var e=0;e<Wl.length;e++)Wl[e]._workInProgressVersionPrimary=null;Wl.length=0}var as=ln.ReactCurrentDispatcher,Kl=ln.ReactCurrentBatchConfig,nr=0,xe=null,Ae=null,Ne=null,zs=!1,Ri=!1,ro=0,Hw=0;function Fe(){throw Error(R(321))}function Dc(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Ot(e[n],t[n]))return!1;return!0}function Lc(e,t,n,r,i,o){if(nr=o,xe=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,as.current=e===null||e.memoizedState===null?Gw:Yw,e=n(r,i),Ri){o=0;do{if(Ri=!1,ro=0,25<=o)throw Error(R(301));o+=1,Ne=Ae=null,t.updateQueue=null,as.current=qw,e=n(r,i)}while(Ri)}if(as.current=Vs,t=Ae!==null&&Ae.next!==null,nr=0,Ne=Ae=xe=null,zs=!1,t)throw Error(R(300));return e}function _c(){var e=ro!==0;return ro=0,e}function jt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ne===null?xe.memoizedState=Ne=e:Ne=Ne.next=e,Ne}function bt(){if(Ae===null){var e=xe.alternate;e=e!==null?e.memoizedState:null}else e=Ae.next;var t=Ne===null?xe.memoizedState:Ne.next;if(t!==null)Ne=t,Ae=e;else{if(e===null)throw Error(R(310));Ae=e,e={memoizedState:Ae.memoizedState,baseState:Ae.baseState,baseQueue:Ae.baseQueue,queue:Ae.queue,next:null},Ne===null?xe.memoizedState=Ne=e:Ne=Ne.next=e}return Ne}function io(e,t){return typeof t=="function"?t(e):t}function Gl(e){var t=bt(),n=t.queue;if(n===null)throw Error(R(311));n.lastRenderedReducer=e;var r=Ae,i=r.baseQueue,o=n.pending;if(o!==null){if(i!==null){var s=i.next;i.next=o.next,o.next=s}r.baseQueue=i=o,n.pending=null}if(i!==null){o=i.next,r=r.baseState;var l=s=null,a=null,u=o;do{var c=u.lane;if((nr&c)===c)a!==null&&(a=a.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),r=u.hasEagerState?u.eagerState:e(r,u.action);else{var f={lane:c,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};a===null?(l=a=f,s=r):a=a.next=f,xe.lanes|=c,rr|=c}u=u.next}while(u!==null&&u!==o);a===null?s=r:a.next=l,Ot(r,t.memoizedState)||(tt=!0),t.memoizedState=r,t.baseState=s,t.baseQueue=a,n.lastRenderedState=r}if(e=n.interleaved,e!==null){i=e;do o=i.lane,xe.lanes|=o,rr|=o,i=i.next;while(i!==e)}else i===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Yl(e){var t=bt(),n=t.queue;if(n===null)throw Error(R(311));n.lastRenderedReducer=e;var r=n.dispatch,i=n.pending,o=t.memoizedState;if(i!==null){n.pending=null;var s=i=i.next;do o=e(o,s.action),s=s.next;while(s!==i);Ot(o,t.memoizedState)||(tt=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function oy(){}function sy(e,t){var n=xe,r=bt(),i=t(),o=!Ot(r.memoizedState,i);if(o&&(r.memoizedState=i,tt=!0),r=r.queue,Oc(uy.bind(null,n,r,e),[e]),r.getSnapshot!==t||o||Ne!==null&&Ne.memoizedState.tag&1){if(n.flags|=2048,oo(9,ay.bind(null,n,r,i,t),void 0,null),Re===null)throw Error(R(349));nr&30||ly(n,t,i)}return i}function ly(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=xe.updateQueue,t===null?(t={lastEffect:null,stores:null},xe.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function ay(e,t,n,r){t.value=n,t.getSnapshot=r,cy(t)&&fy(e)}function uy(e,t,n){return n(function(){cy(t)&&fy(e)})}function cy(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Ot(e,n)}catch{return!0}}function fy(e){var t=nn(e,1);t!==null&&Lt(t,e,1,-1)}function Hd(e){var t=jt();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:io,lastRenderedState:e},t.queue=e,e=e.dispatch=Kw.bind(null,xe,e),[t.memoizedState,e]}function oo(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=xe.updateQueue,t===null?(t={lastEffect:null,stores:null},xe.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function dy(){return bt().memoizedState}function us(e,t,n,r){var i=jt();xe.flags|=e,i.memoizedState=oo(1|t,n,void 0,r===void 0?null:r)}function al(e,t,n,r){var i=bt();r=r===void 0?null:r;var o=void 0;if(Ae!==null){var s=Ae.memoizedState;if(o=s.destroy,r!==null&&Dc(r,s.deps)){i.memoizedState=oo(t,n,o,r);return}}xe.flags|=e,i.memoizedState=oo(1|t,n,o,r)}function $d(e,t){return us(8390656,8,e,t)}function Oc(e,t){return al(2048,8,e,t)}function hy(e,t){return al(4,2,e,t)}function py(e,t){return al(4,4,e,t)}function my(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function gy(e,t,n){return n=n!=null?n.concat([e]):null,al(4,4,my.bind(null,t,e),n)}function Fc(){}function yy(e,t){var n=bt();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Dc(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function xy(e,t){var n=bt();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Dc(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function vy(e,t,n){return nr&21?(Ot(n,t)||(n=Eg(),xe.lanes|=n,rr|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,tt=!0),e.memoizedState=n)}function $w(e,t){var n=oe;oe=n!==0&&4>n?n:4,e(!0);var r=Kl.transition;Kl.transition={};try{e(!1),t()}finally{oe=n,Kl.transition=r}}function wy(){return bt().memoizedState}function Ww(e,t,n){var r=Tn(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},ky(e))Sy(t,n);else if(n=ny(e,t,n,r),n!==null){var i=Ye();Lt(n,e,r,i),Cy(n,t,r)}}function Kw(e,t,n){var r=Tn(e),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(ky(e))Sy(t,i);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=t.lastRenderedReducer,o!==null))try{var s=t.lastRenderedState,l=o(s,n);if(i.hasEagerState=!0,i.eagerState=l,Ot(l,s)){var a=t.interleaved;a===null?(i.next=i,Pc(t)):(i.next=a.next,a.next=i),t.interleaved=i;return}}catch{}finally{}n=ny(e,t,i,r),n!==null&&(i=Ye(),Lt(n,e,r,i),Cy(n,t,r))}}function ky(e){var t=e.alternate;return e===xe||t!==null&&t===xe}function Sy(e,t){Ri=zs=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Cy(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,pc(e,n)}}var Vs={readContext:Tt,useCallback:Fe,useContext:Fe,useEffect:Fe,useImperativeHandle:Fe,useInsertionEffect:Fe,useLayoutEffect:Fe,useMemo:Fe,useReducer:Fe,useRef:Fe,useState:Fe,useDebugValue:Fe,useDeferredValue:Fe,useTransition:Fe,useMutableSource:Fe,useSyncExternalStore:Fe,useId:Fe,unstable_isNewReconciler:!1},Gw={readContext:Tt,useCallback:function(e,t){return jt().memoizedState=[e,t===void 0?null:t],e},useContext:Tt,useEffect:$d,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,us(4194308,4,my.bind(null,t,e),n)},useLayoutEffect:function(e,t){return us(4194308,4,e,t)},useInsertionEffect:function(e,t){return us(4,2,e,t)},useMemo:function(e,t){var n=jt();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=jt();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=Ww.bind(null,xe,e),[r.memoizedState,e]},useRef:function(e){var t=jt();return e={current:e},t.memoizedState=e},useState:Hd,useDebugValue:Fc,useDeferredValue:function(e){return jt().memoizedState=e},useTransition:function(){var e=Hd(!1),t=e[0];return e=$w.bind(null,e[1]),jt().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=xe,i=jt();if(he){if(n===void 0)throw Error(R(407));n=n()}else{if(n=t(),Re===null)throw Error(R(349));nr&30||ly(r,t,n)}i.memoizedState=n;var o={value:n,getSnapshot:t};return i.queue=o,$d(uy.bind(null,r,o,e),[e]),r.flags|=2048,oo(9,ay.bind(null,r,o,n,t),void 0,null),n},useId:function(){var e=jt(),t=Re.identifierPrefix;if(he){var n=Zt,r=Qt;n=(r&~(1<<32-Dt(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=ro++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=Hw++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Yw={readContext:Tt,useCallback:yy,useContext:Tt,useEffect:Oc,useImperativeHandle:gy,useInsertionEffect:hy,useLayoutEffect:py,useMemo:xy,useReducer:Gl,useRef:dy,useState:function(){return Gl(io)},useDebugValue:Fc,useDeferredValue:function(e){var t=bt();return vy(t,Ae.memoizedState,e)},useTransition:function(){var e=Gl(io)[0],t=bt().memoizedState;return[e,t]},useMutableSource:oy,useSyncExternalStore:sy,useId:wy,unstable_isNewReconciler:!1},qw={readContext:Tt,useCallback:yy,useContext:Tt,useEffect:Oc,useImperativeHandle:gy,useInsertionEffect:hy,useLayoutEffect:py,useMemo:xy,useReducer:Yl,useRef:dy,useState:function(){return Yl(io)},useDebugValue:Fc,useDeferredValue:function(e){var t=bt();return Ae===null?t.memoizedState=e:vy(t,Ae.memoizedState,e)},useTransition:function(){var e=Yl(io)[0],t=bt().memoizedState;return[e,t]},useMutableSource:oy,useSyncExternalStore:sy,useId:wy,unstable_isNewReconciler:!1};function Nt(e,t){if(e&&e.defaultProps){t=ve({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function su(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:ve({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var ul={isMounted:function(e){return(e=e._reactInternals)?ur(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=Ye(),i=Tn(e),o=Jt(r,i);o.payload=t,n!=null&&(o.callback=n),t=Cn(e,o,i),t!==null&&(Lt(t,e,i,r),ls(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=Ye(),i=Tn(e),o=Jt(r,i);o.tag=1,o.payload=t,n!=null&&(o.callback=n),t=Cn(e,o,i),t!==null&&(Lt(t,e,i,r),ls(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Ye(),r=Tn(e),i=Jt(n,r);i.tag=2,t!=null&&(i.callback=t),t=Cn(e,i,r),t!==null&&(Lt(t,e,r,n),ls(t,e,r))}};function Wd(e,t,n,r,i,o,s){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,o,s):t.prototype&&t.prototype.isPureReactComponent?!Qi(n,r)||!Qi(i,o):!0}function Ey(e,t,n){var r=!1,i=In,o=t.contextType;return typeof o=="object"&&o!==null?o=Tt(o):(i=it(t)?er:Ue.current,r=t.contextTypes,o=(r=r!=null)?Hr(e,i):In),t=new t(n,o),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=ul,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=o),t}function Kd(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&ul.enqueueReplaceState(t,t.state,null)}function lu(e,t,n,r){var i=e.stateNode;i.props=n,i.state=e.memoizedState,i.refs={},Ic(e);var o=t.contextType;typeof o=="object"&&o!==null?i.context=Tt(o):(o=it(t)?er:Ue.current,i.context=Hr(e,o)),i.state=e.memoizedState,o=t.getDerivedStateFromProps,typeof o=="function"&&(su(e,t,o,n),i.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(t=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),t!==i.state&&ul.enqueueReplaceState(i,i.state,null),Fs(e,n,i,r),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308)}function Gr(e,t){try{var n="",r=t;do n+=C1(r),r=r.return;while(r);var i=n}catch(o){i=`
Error generating stack: `+o.message+`
`+o.stack}return{value:e,source:t,stack:i,digest:null}}function ql(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function au(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Xw=typeof WeakMap=="function"?WeakMap:Map;function Ty(e,t,n){n=Jt(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Us||(Us=!0,xu=r),au(e,t)},n}function by(e,t,n){n=Jt(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var i=t.value;n.payload=function(){return r(i)},n.callback=function(){au(e,t)}}var o=e.stateNode;return o!==null&&typeof o.componentDidCatch=="function"&&(n.callback=function(){au(e,t),typeof r!="function"&&(En===null?En=new Set([this]):En.add(this));var s=t.stack;this.componentDidCatch(t.value,{componentStack:s!==null?s:""})}),n}function Gd(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Xw;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(i.add(n),e=ck.bind(null,e,t,n),t.then(e,e))}function Yd(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function qd(e,t,n,r,i){return e.mode&1?(e.flags|=65536,e.lanes=i,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=Jt(-1,1),t.tag=2,Cn(n,t,1))),n.lanes|=1),e)}var Qw=ln.ReactCurrentOwner,tt=!1;function We(e,t,n,r){t.child=e===null?ty(t,null,n,r):Wr(t,e.child,n,r)}function Xd(e,t,n,r,i){n=n.render;var o=t.ref;return jr(t,i),r=Lc(e,t,n,r,o,i),n=_c(),e!==null&&!tt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,rn(e,t,i)):(he&&n&&Sc(t),t.flags|=1,We(e,t,r,i),t.child)}function Qd(e,t,n,r,i){if(e===null){var o=n.type;return typeof o=="function"&&!Wc(o)&&o.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=o,Ay(e,t,o,r,i)):(e=hs(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(o=e.child,!(e.lanes&i)){var s=o.memoizedProps;if(n=n.compare,n=n!==null?n:Qi,n(s,r)&&e.ref===t.ref)return rn(e,t,i)}return t.flags|=1,e=bn(o,r),e.ref=t.ref,e.return=t,t.child=e}function Ay(e,t,n,r,i){if(e!==null){var o=e.memoizedProps;if(Qi(o,r)&&e.ref===t.ref)if(tt=!1,t.pendingProps=r=o,(e.lanes&i)!==0)e.flags&131072&&(tt=!0);else return t.lanes=e.lanes,rn(e,t,i)}return uu(e,t,n,r,i)}function Py(e,t,n){var r=t.pendingProps,i=r.children,o=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},ue(Pr,ut),ut|=n;else{if(!(n&1073741824))return e=o!==null?o.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,ue(Pr,ut),ut|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=o!==null?o.baseLanes:n,ue(Pr,ut),ut|=r}else o!==null?(r=o.baseLanes|n,t.memoizedState=null):r=n,ue(Pr,ut),ut|=r;return We(e,t,i,n),t.child}function Iy(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function uu(e,t,n,r,i){var o=it(n)?er:Ue.current;return o=Hr(t,o),jr(t,i),n=Lc(e,t,n,r,o,i),r=_c(),e!==null&&!tt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,rn(e,t,i)):(he&&r&&Sc(t),t.flags|=1,We(e,t,n,i),t.child)}function Zd(e,t,n,r,i){if(it(n)){var o=!0;Ms(t)}else o=!1;if(jr(t,i),t.stateNode===null)cs(e,t),Ey(t,n,r),lu(t,n,r,i),r=!0;else if(e===null){var s=t.stateNode,l=t.memoizedProps;s.props=l;var a=s.context,u=n.contextType;typeof u=="object"&&u!==null?u=Tt(u):(u=it(n)?er:Ue.current,u=Hr(t,u));var c=n.getDerivedStateFromProps,f=typeof c=="function"||typeof s.getSnapshotBeforeUpdate=="function";f||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(l!==r||a!==u)&&Kd(t,s,r,u),hn=!1;var d=t.memoizedState;s.state=d,Fs(t,r,s,i),a=t.memoizedState,l!==r||d!==a||rt.current||hn?(typeof c=="function"&&(su(t,n,c,r),a=t.memoizedState),(l=hn||Wd(t,n,l,r,d,a,u))?(f||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount()),typeof s.componentDidMount=="function"&&(t.flags|=4194308)):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=a),s.props=r,s.state=a,s.context=u,r=l):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{s=t.stateNode,ry(e,t),l=t.memoizedProps,u=t.type===t.elementType?l:Nt(t.type,l),s.props=u,f=t.pendingProps,d=s.context,a=n.contextType,typeof a=="object"&&a!==null?a=Tt(a):(a=it(n)?er:Ue.current,a=Hr(t,a));var h=n.getDerivedStateFromProps;(c=typeof h=="function"||typeof s.getSnapshotBeforeUpdate=="function")||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(l!==f||d!==a)&&Kd(t,s,r,a),hn=!1,d=t.memoizedState,s.state=d,Fs(t,r,s,i);var m=t.memoizedState;l!==f||d!==m||rt.current||hn?(typeof h=="function"&&(su(t,n,h,r),m=t.memoizedState),(u=hn||Wd(t,n,u,r,d,m,a)||!1)?(c||typeof s.UNSAFE_componentWillUpdate!="function"&&typeof s.componentWillUpdate!="function"||(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(r,m,a),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(r,m,a)),typeof s.componentDidUpdate=="function"&&(t.flags|=4),typeof s.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof s.componentDidUpdate!="function"||l===e.memoizedProps&&d===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&d===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=m),s.props=r,s.state=m,s.context=a,r=u):(typeof s.componentDidUpdate!="function"||l===e.memoizedProps&&d===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&d===e.memoizedState||(t.flags|=1024),r=!1)}return cu(e,t,n,r,o,i)}function cu(e,t,n,r,i,o){Iy(e,t);var s=(t.flags&128)!==0;if(!r&&!s)return i&&Fd(t,n,!1),rn(e,t,o);r=t.stateNode,Qw.current=t;var l=s&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&s?(t.child=Wr(t,e.child,null,o),t.child=Wr(t,null,l,o)):We(e,t,l,o),t.memoizedState=r.state,i&&Fd(t,n,!0),t.child}function Ny(e){var t=e.stateNode;t.pendingContext?Od(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Od(e,t.context,!1),Nc(e,t.containerInfo)}function Jd(e,t,n,r,i){return $r(),Ec(i),t.flags|=256,We(e,t,n,r),t.child}var fu={dehydrated:null,treeContext:null,retryLane:0};function du(e){return{baseLanes:e,cachePool:null,transitions:null}}function Ry(e,t,n){var r=t.pendingProps,i=ge.current,o=!1,s=(t.flags&128)!==0,l;if((l=s)||(l=e!==null&&e.memoizedState===null?!1:(i&2)!==0),l?(o=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(i|=1),ue(ge,i&1),e===null)return iu(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(s=r.children,e=r.fallback,o?(r=t.mode,o=t.child,s={mode:"hidden",children:s},!(r&1)&&o!==null?(o.childLanes=0,o.pendingProps=s):o=dl(s,r,0,null),e=Qn(e,r,n,null),o.return=t,e.return=t,o.sibling=e,t.child=o,t.child.memoizedState=du(n),t.memoizedState=fu,e):jc(t,s));if(i=e.memoizedState,i!==null&&(l=i.dehydrated,l!==null))return Zw(e,t,s,r,l,i,n);if(o){o=r.fallback,s=t.mode,i=e.child,l=i.sibling;var a={mode:"hidden",children:r.children};return!(s&1)&&t.child!==i?(r=t.child,r.childLanes=0,r.pendingProps=a,t.deletions=null):(r=bn(i,a),r.subtreeFlags=i.subtreeFlags&14680064),l!==null?o=bn(l,o):(o=Qn(o,s,n,null),o.flags|=2),o.return=t,r.return=t,r.sibling=o,t.child=r,r=o,o=t.child,s=e.child.memoizedState,s=s===null?du(n):{baseLanes:s.baseLanes|n,cachePool:null,transitions:s.transitions},o.memoizedState=s,o.childLanes=e.childLanes&~n,t.memoizedState=fu,r}return o=e.child,e=o.sibling,r=bn(o,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function jc(e,t){return t=dl({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function $o(e,t,n,r){return r!==null&&Ec(r),Wr(t,e.child,null,n),e=jc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Zw(e,t,n,r,i,o,s){if(n)return t.flags&256?(t.flags&=-257,r=ql(Error(R(422))),$o(e,t,s,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(o=r.fallback,i=t.mode,r=dl({mode:"visible",children:r.children},i,0,null),o=Qn(o,i,s,null),o.flags|=2,r.return=t,o.return=t,r.sibling=o,t.child=r,t.mode&1&&Wr(t,e.child,null,s),t.child.memoizedState=du(s),t.memoizedState=fu,o);if(!(t.mode&1))return $o(e,t,s,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var l=r.dgst;return r=l,o=Error(R(419)),r=ql(o,r,void 0),$o(e,t,s,r)}if(l=(s&e.childLanes)!==0,tt||l){if(r=Re,r!==null){switch(s&-s){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|s)?0:i,i!==0&&i!==o.retryLane&&(o.retryLane=i,nn(e,i),Lt(r,e,i,-1))}return $c(),r=ql(Error(R(421))),$o(e,t,s,r)}return i.data==="$?"?(t.flags|=128,t.child=e.child,t=fk.bind(null,e),i._reactRetry=t,null):(e=o.treeContext,ct=Sn(i.nextSibling),ft=t,he=!0,Mt=null,e!==null&&(xt[vt++]=Qt,xt[vt++]=Zt,xt[vt++]=tr,Qt=e.id,Zt=e.overflow,tr=t),t=jc(t,r.children),t.flags|=4096,t)}function eh(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),ou(e.return,t,n)}function Xl(e,t,n,r,i){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i)}function My(e,t,n){var r=t.pendingProps,i=r.revealOrder,o=r.tail;if(We(e,t,r.children,n),r=ge.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&eh(e,n,t);else if(e.tag===19)eh(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(ue(ge,r),!(t.mode&1))t.memoizedState=null;else switch(i){case"forwards":for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&js(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),Xl(t,!1,i,n,o);break;case"backwards":for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&js(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}Xl(t,!0,n,null,o);break;case"together":Xl(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function cs(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function rn(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),rr|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(R(153));if(t.child!==null){for(e=t.child,n=bn(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=bn(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Jw(e,t,n){switch(t.tag){case 3:Ny(t),$r();break;case 5:iy(t);break;case 1:it(t.type)&&Ms(t);break;case 4:Nc(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,i=t.memoizedProps.value;ue(_s,r._currentValue),r._currentValue=i;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(ue(ge,ge.current&1),t.flags|=128,null):n&t.child.childLanes?Ry(e,t,n):(ue(ge,ge.current&1),e=rn(e,t,n),e!==null?e.sibling:null);ue(ge,ge.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return My(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),ue(ge,ge.current),r)break;return null;case 22:case 23:return t.lanes=0,Py(e,t,n)}return rn(e,t,n)}var Dy,hu,Ly,_y;Dy=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};hu=function(){};Ly=function(e,t,n,r){var i=e.memoizedProps;if(i!==r){e=t.stateNode,Gn(Ut.current);var o=null;switch(n){case"input":i=_a(e,i),r=_a(e,r),o=[];break;case"select":i=ve({},i,{value:void 0}),r=ve({},r,{value:void 0}),o=[];break;case"textarea":i=ja(e,i),r=ja(e,r),o=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Ns)}Va(n,r);var s;n=null;for(u in i)if(!r.hasOwnProperty(u)&&i.hasOwnProperty(u)&&i[u]!=null)if(u==="style"){var l=i[u];for(s in l)l.hasOwnProperty(s)&&(n||(n={}),n[s]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&($i.hasOwnProperty(u)?o||(o=[]):(o=o||[]).push(u,null));for(u in r){var a=r[u];if(l=i!=null?i[u]:void 0,r.hasOwnProperty(u)&&a!==l&&(a!=null||l!=null))if(u==="style")if(l){for(s in l)!l.hasOwnProperty(s)||a&&a.hasOwnProperty(s)||(n||(n={}),n[s]="");for(s in a)a.hasOwnProperty(s)&&l[s]!==a[s]&&(n||(n={}),n[s]=a[s])}else n||(o||(o=[]),o.push(u,n)),n=a;else u==="dangerouslySetInnerHTML"?(a=a?a.__html:void 0,l=l?l.__html:void 0,a!=null&&l!==a&&(o=o||[]).push(u,a)):u==="children"?typeof a!="string"&&typeof a!="number"||(o=o||[]).push(u,""+a):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&($i.hasOwnProperty(u)?(a!=null&&u==="onScroll"&&fe("scroll",e),o||l===a||(o=[])):(o=o||[]).push(u,a))}n&&(o=o||[]).push("style",n);var u=o;(t.updateQueue=u)&&(t.flags|=4)}};_y=function(e,t,n,r){n!==r&&(t.flags|=4)};function mi(e,t){if(!he)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function je(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function ek(e,t,n){var r=t.pendingProps;switch(Cc(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return je(t),null;case 1:return it(t.type)&&Rs(),je(t),null;case 3:return r=t.stateNode,Kr(),de(rt),de(Ue),Mc(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Uo(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Mt!==null&&(ku(Mt),Mt=null))),hu(e,t),je(t),null;case 5:Rc(t);var i=Gn(no.current);if(n=t.type,e!==null&&t.stateNode!=null)Ly(e,t,n,r,i),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(R(166));return je(t),null}if(e=Gn(Ut.current),Uo(t)){r=t.stateNode,n=t.type;var o=t.memoizedProps;switch(r[Vt]=t,r[eo]=o,e=(t.mode&1)!==0,n){case"dialog":fe("cancel",r),fe("close",r);break;case"iframe":case"object":case"embed":fe("load",r);break;case"video":case"audio":for(i=0;i<Ei.length;i++)fe(Ei[i],r);break;case"source":fe("error",r);break;case"img":case"image":case"link":fe("error",r),fe("load",r);break;case"details":fe("toggle",r);break;case"input":ud(r,o),fe("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!o.multiple},fe("invalid",r);break;case"textarea":fd(r,o),fe("invalid",r)}Va(n,o),i=null;for(var s in o)if(o.hasOwnProperty(s)){var l=o[s];s==="children"?typeof l=="string"?r.textContent!==l&&(o.suppressHydrationWarning!==!0&&Bo(r.textContent,l,e),i=["children",l]):typeof l=="number"&&r.textContent!==""+l&&(o.suppressHydrationWarning!==!0&&Bo(r.textContent,l,e),i=["children",""+l]):$i.hasOwnProperty(s)&&l!=null&&s==="onScroll"&&fe("scroll",r)}switch(n){case"input":Do(r),cd(r,o,!0);break;case"textarea":Do(r),dd(r);break;case"select":case"option":break;default:typeof o.onClick=="function"&&(r.onclick=Ns)}r=i,t.updateQueue=r,r!==null&&(t.flags|=4)}else{s=i.nodeType===9?i:i.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=ug(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=s.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=s.createElement(n,{is:r.is}):(e=s.createElement(n),n==="select"&&(s=e,r.multiple?s.multiple=!0:r.size&&(s.size=r.size))):e=s.createElementNS(e,n),e[Vt]=t,e[eo]=r,Dy(e,t,!1,!1),t.stateNode=e;e:{switch(s=Ba(n,r),n){case"dialog":fe("cancel",e),fe("close",e),i=r;break;case"iframe":case"object":case"embed":fe("load",e),i=r;break;case"video":case"audio":for(i=0;i<Ei.length;i++)fe(Ei[i],e);i=r;break;case"source":fe("error",e),i=r;break;case"img":case"image":case"link":fe("error",e),fe("load",e),i=r;break;case"details":fe("toggle",e),i=r;break;case"input":ud(e,r),i=_a(e,r),fe("invalid",e);break;case"option":i=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},i=ve({},r,{value:void 0}),fe("invalid",e);break;case"textarea":fd(e,r),i=ja(e,r),fe("invalid",e);break;default:i=r}Va(n,i),l=i;for(o in l)if(l.hasOwnProperty(o)){var a=l[o];o==="style"?dg(e,a):o==="dangerouslySetInnerHTML"?(a=a?a.__html:void 0,a!=null&&cg(e,a)):o==="children"?typeof a=="string"?(n!=="textarea"||a!=="")&&Wi(e,a):typeof a=="number"&&Wi(e,""+a):o!=="suppressContentEditableWarning"&&o!=="suppressHydrationWarning"&&o!=="autoFocus"&&($i.hasOwnProperty(o)?a!=null&&o==="onScroll"&&fe("scroll",e):a!=null&&ac(e,o,a,s))}switch(n){case"input":Do(e),cd(e,r,!1);break;case"textarea":Do(e),dd(e);break;case"option":r.value!=null&&e.setAttribute("value",""+Pn(r.value));break;case"select":e.multiple=!!r.multiple,o=r.value,o!=null?Lr(e,!!r.multiple,o,!1):r.defaultValue!=null&&Lr(e,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(e.onclick=Ns)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return je(t),null;case 6:if(e&&t.stateNode!=null)_y(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(R(166));if(n=Gn(no.current),Gn(Ut.current),Uo(t)){if(r=t.stateNode,n=t.memoizedProps,r[Vt]=t,(o=r.nodeValue!==n)&&(e=ft,e!==null))switch(e.tag){case 3:Bo(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Bo(r.nodeValue,n,(e.mode&1)!==0)}o&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[Vt]=t,t.stateNode=r}return je(t),null;case 13:if(de(ge),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(he&&ct!==null&&t.mode&1&&!(t.flags&128))Jg(),$r(),t.flags|=98560,o=!1;else if(o=Uo(t),r!==null&&r.dehydrated!==null){if(e===null){if(!o)throw Error(R(318));if(o=t.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(R(317));o[Vt]=t}else $r(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;je(t),o=!1}else Mt!==null&&(ku(Mt),Mt=null),o=!0;if(!o)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||ge.current&1?Pe===0&&(Pe=3):$c())),t.updateQueue!==null&&(t.flags|=4),je(t),null);case 4:return Kr(),hu(e,t),e===null&&Zi(t.stateNode.containerInfo),je(t),null;case 10:return Ac(t.type._context),je(t),null;case 17:return it(t.type)&&Rs(),je(t),null;case 19:if(de(ge),o=t.memoizedState,o===null)return je(t),null;if(r=(t.flags&128)!==0,s=o.rendering,s===null)if(r)mi(o,!1);else{if(Pe!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(s=js(e),s!==null){for(t.flags|=128,mi(o,!1),r=s.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)o=n,e=r,o.flags&=14680066,s=o.alternate,s===null?(o.childLanes=0,o.lanes=e,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=s.childLanes,o.lanes=s.lanes,o.child=s.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=s.memoizedProps,o.memoizedState=s.memoizedState,o.updateQueue=s.updateQueue,o.type=s.type,e=s.dependencies,o.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return ue(ge,ge.current&1|2),t.child}e=e.sibling}o.tail!==null&&Ce()>Yr&&(t.flags|=128,r=!0,mi(o,!1),t.lanes=4194304)}else{if(!r)if(e=js(s),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),mi(o,!0),o.tail===null&&o.tailMode==="hidden"&&!s.alternate&&!he)return je(t),null}else 2*Ce()-o.renderingStartTime>Yr&&n!==1073741824&&(t.flags|=128,r=!0,mi(o,!1),t.lanes=4194304);o.isBackwards?(s.sibling=t.child,t.child=s):(n=o.last,n!==null?n.sibling=s:t.child=s,o.last=s)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=Ce(),t.sibling=null,n=ge.current,ue(ge,r?n&1|2:n&1),t):(je(t),null);case 22:case 23:return Hc(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?ut&1073741824&&(je(t),t.subtreeFlags&6&&(t.flags|=8192)):je(t),null;case 24:return null;case 25:return null}throw Error(R(156,t.tag))}function tk(e,t){switch(Cc(t),t.tag){case 1:return it(t.type)&&Rs(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Kr(),de(rt),de(Ue),Mc(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Rc(t),null;case 13:if(de(ge),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(R(340));$r()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return de(ge),null;case 4:return Kr(),null;case 10:return Ac(t.type._context),null;case 22:case 23:return Hc(),null;case 24:return null;default:return null}}var Wo=!1,ze=!1,nk=typeof WeakSet=="function"?WeakSet:Set,j=null;function Ar(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){ke(e,t,r)}else n.current=null}function pu(e,t,n){try{n()}catch(r){ke(e,t,r)}}var th=!1;function rk(e,t){if(Qa=As,e=Vg(),kc(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break e}var s=0,l=-1,a=-1,u=0,c=0,f=e,d=null;t:for(;;){for(var h;f!==n||i!==0&&f.nodeType!==3||(l=s+i),f!==o||r!==0&&f.nodeType!==3||(a=s+r),f.nodeType===3&&(s+=f.nodeValue.length),(h=f.firstChild)!==null;)d=f,f=h;for(;;){if(f===e)break t;if(d===n&&++u===i&&(l=s),d===o&&++c===r&&(a=s),(h=f.nextSibling)!==null)break;f=d,d=f.parentNode}f=h}n=l===-1||a===-1?null:{start:l,end:a}}else n=null}n=n||{start:0,end:0}}else n=null;for(Za={focusedElem:e,selectionRange:n},As=!1,j=t;j!==null;)if(t=j,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,j=e;else for(;j!==null;){t=j;try{var m=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(m!==null){var x=m.memoizedProps,E=m.memoizedState,p=t.stateNode,g=p.getSnapshotBeforeUpdate(t.elementType===t.type?x:Nt(t.type,x),E);p.__reactInternalSnapshotBeforeUpdate=g}break;case 3:var y=t.stateNode.containerInfo;y.nodeType===1?y.textContent="":y.nodeType===9&&y.documentElement&&y.removeChild(y.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(R(163))}}catch(T){ke(t,t.return,T)}if(e=t.sibling,e!==null){e.return=t.return,j=e;break}j=t.return}return m=th,th=!1,m}function Mi(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&e)===e){var o=i.destroy;i.destroy=void 0,o!==void 0&&pu(t,n,o)}i=i.next}while(i!==r)}}function cl(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function mu(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function Oy(e){var t=e.alternate;t!==null&&(e.alternate=null,Oy(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Vt],delete t[eo],delete t[tu],delete t[zw],delete t[Vw])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Fy(e){return e.tag===5||e.tag===3||e.tag===4}function nh(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Fy(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function gu(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Ns));else if(r!==4&&(e=e.child,e!==null))for(gu(e,t,n),e=e.sibling;e!==null;)gu(e,t,n),e=e.sibling}function yu(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(yu(e,t,n),e=e.sibling;e!==null;)yu(e,t,n),e=e.sibling}var Me=null,Rt=!1;function un(e,t,n){for(n=n.child;n!==null;)jy(e,t,n),n=n.sibling}function jy(e,t,n){if(Bt&&typeof Bt.onCommitFiberUnmount=="function")try{Bt.onCommitFiberUnmount(nl,n)}catch{}switch(n.tag){case 5:ze||Ar(n,t);case 6:var r=Me,i=Rt;Me=null,un(e,t,n),Me=r,Rt=i,Me!==null&&(Rt?(e=Me,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):Me.removeChild(n.stateNode));break;case 18:Me!==null&&(Rt?(e=Me,n=n.stateNode,e.nodeType===8?Hl(e.parentNode,n):e.nodeType===1&&Hl(e,n),qi(e)):Hl(Me,n.stateNode));break;case 4:r=Me,i=Rt,Me=n.stateNode.containerInfo,Rt=!0,un(e,t,n),Me=r,Rt=i;break;case 0:case 11:case 14:case 15:if(!ze&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var o=i,s=o.destroy;o=o.tag,s!==void 0&&(o&2||o&4)&&pu(n,t,s),i=i.next}while(i!==r)}un(e,t,n);break;case 1:if(!ze&&(Ar(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(l){ke(n,t,l)}un(e,t,n);break;case 21:un(e,t,n);break;case 22:n.mode&1?(ze=(r=ze)||n.memoizedState!==null,un(e,t,n),ze=r):un(e,t,n);break;default:un(e,t,n)}}function rh(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new nk),t.forEach(function(r){var i=dk.bind(null,e,r);n.has(r)||(n.add(r),r.then(i,i))})}}function Pt(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];try{var o=e,s=t,l=s;e:for(;l!==null;){switch(l.tag){case 5:Me=l.stateNode,Rt=!1;break e;case 3:Me=l.stateNode.containerInfo,Rt=!0;break e;case 4:Me=l.stateNode.containerInfo,Rt=!0;break e}l=l.return}if(Me===null)throw Error(R(160));jy(o,s,i),Me=null,Rt=!1;var a=i.alternate;a!==null&&(a.return=null),i.return=null}catch(u){ke(i,t,u)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)zy(t,e),t=t.sibling}function zy(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Pt(t,e),Ft(e),r&4){try{Mi(3,e,e.return),cl(3,e)}catch(x){ke(e,e.return,x)}try{Mi(5,e,e.return)}catch(x){ke(e,e.return,x)}}break;case 1:Pt(t,e),Ft(e),r&512&&n!==null&&Ar(n,n.return);break;case 5:if(Pt(t,e),Ft(e),r&512&&n!==null&&Ar(n,n.return),e.flags&32){var i=e.stateNode;try{Wi(i,"")}catch(x){ke(e,e.return,x)}}if(r&4&&(i=e.stateNode,i!=null)){var o=e.memoizedProps,s=n!==null?n.memoizedProps:o,l=e.type,a=e.updateQueue;if(e.updateQueue=null,a!==null)try{l==="input"&&o.type==="radio"&&o.name!=null&&lg(i,o),Ba(l,s);var u=Ba(l,o);for(s=0;s<a.length;s+=2){var c=a[s],f=a[s+1];c==="style"?dg(i,f):c==="dangerouslySetInnerHTML"?cg(i,f):c==="children"?Wi(i,f):ac(i,c,f,u)}switch(l){case"input":Oa(i,o);break;case"textarea":ag(i,o);break;case"select":var d=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!o.multiple;var h=o.value;h!=null?Lr(i,!!o.multiple,h,!1):d!==!!o.multiple&&(o.defaultValue!=null?Lr(i,!!o.multiple,o.defaultValue,!0):Lr(i,!!o.multiple,o.multiple?[]:"",!1))}i[eo]=o}catch(x){ke(e,e.return,x)}}break;case 6:if(Pt(t,e),Ft(e),r&4){if(e.stateNode===null)throw Error(R(162));i=e.stateNode,o=e.memoizedProps;try{i.nodeValue=o}catch(x){ke(e,e.return,x)}}break;case 3:if(Pt(t,e),Ft(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{qi(t.containerInfo)}catch(x){ke(e,e.return,x)}break;case 4:Pt(t,e),Ft(e);break;case 13:Pt(t,e),Ft(e),i=e.child,i.flags&8192&&(o=i.memoizedState!==null,i.stateNode.isHidden=o,!o||i.alternate!==null&&i.alternate.memoizedState!==null||(Bc=Ce())),r&4&&rh(e);break;case 22:if(c=n!==null&&n.memoizedState!==null,e.mode&1?(ze=(u=ze)||c,Pt(t,e),ze=u):Pt(t,e),Ft(e),r&8192){if(u=e.memoizedState!==null,(e.stateNode.isHidden=u)&&!c&&e.mode&1)for(j=e,c=e.child;c!==null;){for(f=j=c;j!==null;){switch(d=j,h=d.child,d.tag){case 0:case 11:case 14:case 15:Mi(4,d,d.return);break;case 1:Ar(d,d.return);var m=d.stateNode;if(typeof m.componentWillUnmount=="function"){r=d,n=d.return;try{t=r,m.props=t.memoizedProps,m.state=t.memoizedState,m.componentWillUnmount()}catch(x){ke(r,n,x)}}break;case 5:Ar(d,d.return);break;case 22:if(d.memoizedState!==null){oh(f);continue}}h!==null?(h.return=d,j=h):oh(f)}c=c.sibling}e:for(c=null,f=e;;){if(f.tag===5){if(c===null){c=f;try{i=f.stateNode,u?(o=i.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"):(l=f.stateNode,a=f.memoizedProps.style,s=a!=null&&a.hasOwnProperty("display")?a.display:null,l.style.display=fg("display",s))}catch(x){ke(e,e.return,x)}}}else if(f.tag===6){if(c===null)try{f.stateNode.nodeValue=u?"":f.memoizedProps}catch(x){ke(e,e.return,x)}}else if((f.tag!==22&&f.tag!==23||f.memoizedState===null||f===e)&&f.child!==null){f.child.return=f,f=f.child;continue}if(f===e)break e;for(;f.sibling===null;){if(f.return===null||f.return===e)break e;c===f&&(c=null),f=f.return}c===f&&(c=null),f.sibling.return=f.return,f=f.sibling}}break;case 19:Pt(t,e),Ft(e),r&4&&rh(e);break;case 21:break;default:Pt(t,e),Ft(e)}}function Ft(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Fy(n)){var r=n;break e}n=n.return}throw Error(R(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(Wi(i,""),r.flags&=-33);var o=nh(e);yu(e,o,i);break;case 3:case 4:var s=r.stateNode.containerInfo,l=nh(e);gu(e,l,s);break;default:throw Error(R(161))}}catch(a){ke(e,e.return,a)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function ik(e,t,n){j=e,Vy(e)}function Vy(e,t,n){for(var r=(e.mode&1)!==0;j!==null;){var i=j,o=i.child;if(i.tag===22&&r){var s=i.memoizedState!==null||Wo;if(!s){var l=i.alternate,a=l!==null&&l.memoizedState!==null||ze;l=Wo;var u=ze;if(Wo=s,(ze=a)&&!u)for(j=i;j!==null;)s=j,a=s.child,s.tag===22&&s.memoizedState!==null?sh(i):a!==null?(a.return=s,j=a):sh(i);for(;o!==null;)j=o,Vy(o),o=o.sibling;j=i,Wo=l,ze=u}ih(e)}else i.subtreeFlags&8772&&o!==null?(o.return=i,j=o):ih(e)}}function ih(e){for(;j!==null;){var t=j;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:ze||cl(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!ze)if(n===null)r.componentDidMount();else{var i=t.elementType===t.type?n.memoizedProps:Nt(t.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var o=t.updateQueue;o!==null&&Ud(t,o,r);break;case 3:var s=t.updateQueue;if(s!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Ud(t,s,n)}break;case 5:var l=t.stateNode;if(n===null&&t.flags&4){n=l;var a=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":a.autoFocus&&n.focus();break;case"img":a.src&&(n.src=a.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var u=t.alternate;if(u!==null){var c=u.memoizedState;if(c!==null){var f=c.dehydrated;f!==null&&qi(f)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(R(163))}ze||t.flags&512&&mu(t)}catch(d){ke(t,t.return,d)}}if(t===e){j=null;break}if(n=t.sibling,n!==null){n.return=t.return,j=n;break}j=t.return}}function oh(e){for(;j!==null;){var t=j;if(t===e){j=null;break}var n=t.sibling;if(n!==null){n.return=t.return,j=n;break}j=t.return}}function sh(e){for(;j!==null;){var t=j;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{cl(4,t)}catch(a){ke(t,n,a)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var i=t.return;try{r.componentDidMount()}catch(a){ke(t,i,a)}}var o=t.return;try{mu(t)}catch(a){ke(t,o,a)}break;case 5:var s=t.return;try{mu(t)}catch(a){ke(t,s,a)}}}catch(a){ke(t,t.return,a)}if(t===e){j=null;break}var l=t.sibling;if(l!==null){l.return=t.return,j=l;break}j=t.return}}var ok=Math.ceil,Bs=ln.ReactCurrentDispatcher,zc=ln.ReactCurrentOwner,Ct=ln.ReactCurrentBatchConfig,ne=0,Re=null,be=null,Le=0,ut=0,Pr=Dn(0),Pe=0,so=null,rr=0,fl=0,Vc=0,Di=null,Je=null,Bc=0,Yr=1/0,qt=null,Us=!1,xu=null,En=null,Ko=!1,xn=null,Hs=0,Li=0,vu=null,fs=-1,ds=0;function Ye(){return ne&6?Ce():fs!==-1?fs:fs=Ce()}function Tn(e){return e.mode&1?ne&2&&Le!==0?Le&-Le:Uw.transition!==null?(ds===0&&(ds=Eg()),ds):(e=oe,e!==0||(e=window.event,e=e===void 0?16:Rg(e.type)),e):1}function Lt(e,t,n,r){if(50<Li)throw Li=0,vu=null,Error(R(185));vo(e,n,r),(!(ne&2)||e!==Re)&&(e===Re&&(!(ne&2)&&(fl|=n),Pe===4&&gn(e,Le)),ot(e,r),n===1&&ne===0&&!(t.mode&1)&&(Yr=Ce()+500,ll&&Ln()))}function ot(e,t){var n=e.callbackNode;U1(e,t);var r=bs(e,e===Re?Le:0);if(r===0)n!==null&&md(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&md(n),t===1)e.tag===0?Bw(lh.bind(null,e)):Xg(lh.bind(null,e)),Fw(function(){!(ne&6)&&Ln()}),n=null;else{switch(Tg(r)){case 1:n=hc;break;case 4:n=Sg;break;case 16:n=Ts;break;case 536870912:n=Cg;break;default:n=Ts}n=Yy(n,By.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function By(e,t){if(fs=-1,ds=0,ne&6)throw Error(R(327));var n=e.callbackNode;if(zr()&&e.callbackNode!==n)return null;var r=bs(e,e===Re?Le:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=$s(e,r);else{t=r;var i=ne;ne|=2;var o=Hy();(Re!==e||Le!==t)&&(qt=null,Yr=Ce()+500,Xn(e,t));do try{ak();break}catch(l){Uy(e,l)}while(!0);bc(),Bs.current=o,ne=i,be!==null?t=0:(Re=null,Le=0,t=Pe)}if(t!==0){if(t===2&&(i=Ka(e),i!==0&&(r=i,t=wu(e,i))),t===1)throw n=so,Xn(e,0),gn(e,r),ot(e,Ce()),n;if(t===6)gn(e,r);else{if(i=e.current.alternate,!(r&30)&&!sk(i)&&(t=$s(e,r),t===2&&(o=Ka(e),o!==0&&(r=o,t=wu(e,o))),t===1))throw n=so,Xn(e,0),gn(e,r),ot(e,Ce()),n;switch(e.finishedWork=i,e.finishedLanes=r,t){case 0:case 1:throw Error(R(345));case 2:Bn(e,Je,qt);break;case 3:if(gn(e,r),(r&130023424)===r&&(t=Bc+500-Ce(),10<t)){if(bs(e,0)!==0)break;if(i=e.suspendedLanes,(i&r)!==r){Ye(),e.pingedLanes|=e.suspendedLanes&i;break}e.timeoutHandle=eu(Bn.bind(null,e,Je,qt),t);break}Bn(e,Je,qt);break;case 4:if(gn(e,r),(r&4194240)===r)break;for(t=e.eventTimes,i=-1;0<r;){var s=31-Dt(r);o=1<<s,s=t[s],s>i&&(i=s),r&=~o}if(r=i,r=Ce()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*ok(r/1960))-r,10<r){e.timeoutHandle=eu(Bn.bind(null,e,Je,qt),r);break}Bn(e,Je,qt);break;case 5:Bn(e,Je,qt);break;default:throw Error(R(329))}}}return ot(e,Ce()),e.callbackNode===n?By.bind(null,e):null}function wu(e,t){var n=Di;return e.current.memoizedState.isDehydrated&&(Xn(e,t).flags|=256),e=$s(e,t),e!==2&&(t=Je,Je=n,t!==null&&ku(t)),e}function ku(e){Je===null?Je=e:Je.push.apply(Je,e)}function sk(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var i=n[r],o=i.getSnapshot;i=i.value;try{if(!Ot(o(),i))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function gn(e,t){for(t&=~Vc,t&=~fl,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Dt(t),r=1<<n;e[n]=-1,t&=~r}}function lh(e){if(ne&6)throw Error(R(327));zr();var t=bs(e,0);if(!(t&1))return ot(e,Ce()),null;var n=$s(e,t);if(e.tag!==0&&n===2){var r=Ka(e);r!==0&&(t=r,n=wu(e,r))}if(n===1)throw n=so,Xn(e,0),gn(e,t),ot(e,Ce()),n;if(n===6)throw Error(R(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Bn(e,Je,qt),ot(e,Ce()),null}function Uc(e,t){var n=ne;ne|=1;try{return e(t)}finally{ne=n,ne===0&&(Yr=Ce()+500,ll&&Ln())}}function ir(e){xn!==null&&xn.tag===0&&!(ne&6)&&zr();var t=ne;ne|=1;var n=Ct.transition,r=oe;try{if(Ct.transition=null,oe=1,e)return e()}finally{oe=r,Ct.transition=n,ne=t,!(ne&6)&&Ln()}}function Hc(){ut=Pr.current,de(Pr)}function Xn(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,Ow(n)),be!==null)for(n=be.return;n!==null;){var r=n;switch(Cc(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Rs();break;case 3:Kr(),de(rt),de(Ue),Mc();break;case 5:Rc(r);break;case 4:Kr();break;case 13:de(ge);break;case 19:de(ge);break;case 10:Ac(r.type._context);break;case 22:case 23:Hc()}n=n.return}if(Re=e,be=e=bn(e.current,null),Le=ut=t,Pe=0,so=null,Vc=fl=rr=0,Je=Di=null,Kn!==null){for(t=0;t<Kn.length;t++)if(n=Kn[t],r=n.interleaved,r!==null){n.interleaved=null;var i=r.next,o=n.pending;if(o!==null){var s=o.next;o.next=i,r.next=s}n.pending=r}Kn=null}return e}function Uy(e,t){do{var n=be;try{if(bc(),as.current=Vs,zs){for(var r=xe.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}zs=!1}if(nr=0,Ne=Ae=xe=null,Ri=!1,ro=0,zc.current=null,n===null||n.return===null){Pe=1,so=t,be=null;break}e:{var o=e,s=n.return,l=n,a=t;if(t=Le,l.flags|=32768,a!==null&&typeof a=="object"&&typeof a.then=="function"){var u=a,c=l,f=c.tag;if(!(c.mode&1)&&(f===0||f===11||f===15)){var d=c.alternate;d?(c.updateQueue=d.updateQueue,c.memoizedState=d.memoizedState,c.lanes=d.lanes):(c.updateQueue=null,c.memoizedState=null)}var h=Yd(s);if(h!==null){h.flags&=-257,qd(h,s,l,o,t),h.mode&1&&Gd(o,u,t),t=h,a=u;var m=t.updateQueue;if(m===null){var x=new Set;x.add(a),t.updateQueue=x}else m.add(a);break e}else{if(!(t&1)){Gd(o,u,t),$c();break e}a=Error(R(426))}}else if(he&&l.mode&1){var E=Yd(s);if(E!==null){!(E.flags&65536)&&(E.flags|=256),qd(E,s,l,o,t),Ec(Gr(a,l));break e}}o=a=Gr(a,l),Pe!==4&&(Pe=2),Di===null?Di=[o]:Di.push(o),o=s;do{switch(o.tag){case 3:o.flags|=65536,t&=-t,o.lanes|=t;var p=Ty(o,a,t);Bd(o,p);break e;case 1:l=a;var g=o.type,y=o.stateNode;if(!(o.flags&128)&&(typeof g.getDerivedStateFromError=="function"||y!==null&&typeof y.componentDidCatch=="function"&&(En===null||!En.has(y)))){o.flags|=65536,t&=-t,o.lanes|=t;var T=by(o,l,t);Bd(o,T);break e}}o=o.return}while(o!==null)}Wy(n)}catch(b){t=b,be===n&&n!==null&&(be=n=n.return);continue}break}while(!0)}function Hy(){var e=Bs.current;return Bs.current=Vs,e===null?Vs:e}function $c(){(Pe===0||Pe===3||Pe===2)&&(Pe=4),Re===null||!(rr&268435455)&&!(fl&268435455)||gn(Re,Le)}function $s(e,t){var n=ne;ne|=2;var r=Hy();(Re!==e||Le!==t)&&(qt=null,Xn(e,t));do try{lk();break}catch(i){Uy(e,i)}while(!0);if(bc(),ne=n,Bs.current=r,be!==null)throw Error(R(261));return Re=null,Le=0,Pe}function lk(){for(;be!==null;)$y(be)}function ak(){for(;be!==null&&!D1();)$y(be)}function $y(e){var t=Gy(e.alternate,e,ut);e.memoizedProps=e.pendingProps,t===null?Wy(e):be=t,zc.current=null}function Wy(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=tk(n,t),n!==null){n.flags&=32767,be=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{Pe=6,be=null;return}}else if(n=ek(n,t,ut),n!==null){be=n;return}if(t=t.sibling,t!==null){be=t;return}be=t=e}while(t!==null);Pe===0&&(Pe=5)}function Bn(e,t,n){var r=oe,i=Ct.transition;try{Ct.transition=null,oe=1,uk(e,t,n,r)}finally{Ct.transition=i,oe=r}return null}function uk(e,t,n,r){do zr();while(xn!==null);if(ne&6)throw Error(R(327));n=e.finishedWork;var i=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(R(177));e.callbackNode=null,e.callbackPriority=0;var o=n.lanes|n.childLanes;if(H1(e,o),e===Re&&(be=Re=null,Le=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Ko||(Ko=!0,Yy(Ts,function(){return zr(),null})),o=(n.flags&15990)!==0,n.subtreeFlags&15990||o){o=Ct.transition,Ct.transition=null;var s=oe;oe=1;var l=ne;ne|=4,zc.current=null,rk(e,n),zy(n,e),Iw(Za),As=!!Qa,Za=Qa=null,e.current=n,ik(n),L1(),ne=l,oe=s,Ct.transition=o}else e.current=n;if(Ko&&(Ko=!1,xn=e,Hs=i),o=e.pendingLanes,o===0&&(En=null),F1(n.stateNode),ot(e,Ce()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)i=t[n],r(i.value,{componentStack:i.stack,digest:i.digest});if(Us)throw Us=!1,e=xu,xu=null,e;return Hs&1&&e.tag!==0&&zr(),o=e.pendingLanes,o&1?e===vu?Li++:(Li=0,vu=e):Li=0,Ln(),null}function zr(){if(xn!==null){var e=Tg(Hs),t=Ct.transition,n=oe;try{if(Ct.transition=null,oe=16>e?16:e,xn===null)var r=!1;else{if(e=xn,xn=null,Hs=0,ne&6)throw Error(R(331));var i=ne;for(ne|=4,j=e.current;j!==null;){var o=j,s=o.child;if(j.flags&16){var l=o.deletions;if(l!==null){for(var a=0;a<l.length;a++){var u=l[a];for(j=u;j!==null;){var c=j;switch(c.tag){case 0:case 11:case 15:Mi(8,c,o)}var f=c.child;if(f!==null)f.return=c,j=f;else for(;j!==null;){c=j;var d=c.sibling,h=c.return;if(Oy(c),c===u){j=null;break}if(d!==null){d.return=h,j=d;break}j=h}}}var m=o.alternate;if(m!==null){var x=m.child;if(x!==null){m.child=null;do{var E=x.sibling;x.sibling=null,x=E}while(x!==null)}}j=o}}if(o.subtreeFlags&2064&&s!==null)s.return=o,j=s;else e:for(;j!==null;){if(o=j,o.flags&2048)switch(o.tag){case 0:case 11:case 15:Mi(9,o,o.return)}var p=o.sibling;if(p!==null){p.return=o.return,j=p;break e}j=o.return}}var g=e.current;for(j=g;j!==null;){s=j;var y=s.child;if(s.subtreeFlags&2064&&y!==null)y.return=s,j=y;else e:for(s=g;j!==null;){if(l=j,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:cl(9,l)}}catch(b){ke(l,l.return,b)}if(l===s){j=null;break e}var T=l.sibling;if(T!==null){T.return=l.return,j=T;break e}j=l.return}}if(ne=i,Ln(),Bt&&typeof Bt.onPostCommitFiberRoot=="function")try{Bt.onPostCommitFiberRoot(nl,e)}catch{}r=!0}return r}finally{oe=n,Ct.transition=t}}return!1}function ah(e,t,n){t=Gr(n,t),t=Ty(e,t,1),e=Cn(e,t,1),t=Ye(),e!==null&&(vo(e,1,t),ot(e,t))}function ke(e,t,n){if(e.tag===3)ah(e,e,n);else for(;t!==null;){if(t.tag===3){ah(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(En===null||!En.has(r))){e=Gr(n,e),e=by(t,e,1),t=Cn(t,e,1),e=Ye(),t!==null&&(vo(t,1,e),ot(t,e));break}}t=t.return}}function ck(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=Ye(),e.pingedLanes|=e.suspendedLanes&n,Re===e&&(Le&n)===n&&(Pe===4||Pe===3&&(Le&130023424)===Le&&500>Ce()-Bc?Xn(e,0):Vc|=n),ot(e,t)}function Ky(e,t){t===0&&(e.mode&1?(t=Oo,Oo<<=1,!(Oo&130023424)&&(Oo=4194304)):t=1);var n=Ye();e=nn(e,t),e!==null&&(vo(e,t,n),ot(e,n))}function fk(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Ky(e,n)}function dk(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,i=e.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(R(314))}r!==null&&r.delete(t),Ky(e,n)}var Gy;Gy=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||rt.current)tt=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return tt=!1,Jw(e,t,n);tt=!!(e.flags&131072)}else tt=!1,he&&t.flags&1048576&&Qg(t,Ls,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;cs(e,t),e=t.pendingProps;var i=Hr(t,Ue.current);jr(t,n),i=Lc(null,t,r,e,i,n);var o=_c();return t.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,it(r)?(o=!0,Ms(t)):o=!1,t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,Ic(t),i.updater=ul,t.stateNode=i,i._reactInternals=t,lu(t,r,e,n),t=cu(null,t,r,!0,o,n)):(t.tag=0,he&&o&&Sc(t),We(null,t,i,n),t=t.child),t;case 16:r=t.elementType;e:{switch(cs(e,t),e=t.pendingProps,i=r._init,r=i(r._payload),t.type=r,i=t.tag=pk(r),e=Nt(r,e),i){case 0:t=uu(null,t,r,e,n);break e;case 1:t=Zd(null,t,r,e,n);break e;case 11:t=Xd(null,t,r,e,n);break e;case 14:t=Qd(null,t,r,Nt(r.type,e),n);break e}throw Error(R(306,r,""))}return t;case 0:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:Nt(r,i),uu(e,t,r,i,n);case 1:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:Nt(r,i),Zd(e,t,r,i,n);case 3:e:{if(Ny(t),e===null)throw Error(R(387));r=t.pendingProps,o=t.memoizedState,i=o.element,ry(e,t),Fs(t,r,null,n);var s=t.memoizedState;if(r=s.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:s.cache,pendingSuspenseBoundaries:s.pendingSuspenseBoundaries,transitions:s.transitions},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){i=Gr(Error(R(423)),t),t=Jd(e,t,r,n,i);break e}else if(r!==i){i=Gr(Error(R(424)),t),t=Jd(e,t,r,n,i);break e}else for(ct=Sn(t.stateNode.containerInfo.firstChild),ft=t,he=!0,Mt=null,n=ty(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if($r(),r===i){t=rn(e,t,n);break e}We(e,t,r,n)}t=t.child}return t;case 5:return iy(t),e===null&&iu(t),r=t.type,i=t.pendingProps,o=e!==null?e.memoizedProps:null,s=i.children,Ja(r,i)?s=null:o!==null&&Ja(r,o)&&(t.flags|=32),Iy(e,t),We(e,t,s,n),t.child;case 6:return e===null&&iu(t),null;case 13:return Ry(e,t,n);case 4:return Nc(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Wr(t,null,r,n):We(e,t,r,n),t.child;case 11:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:Nt(r,i),Xd(e,t,r,i,n);case 7:return We(e,t,t.pendingProps,n),t.child;case 8:return We(e,t,t.pendingProps.children,n),t.child;case 12:return We(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,i=t.pendingProps,o=t.memoizedProps,s=i.value,ue(_s,r._currentValue),r._currentValue=s,o!==null)if(Ot(o.value,s)){if(o.children===i.children&&!rt.current){t=rn(e,t,n);break e}}else for(o=t.child,o!==null&&(o.return=t);o!==null;){var l=o.dependencies;if(l!==null){s=o.child;for(var a=l.firstContext;a!==null;){if(a.context===r){if(o.tag===1){a=Jt(-1,n&-n),a.tag=2;var u=o.updateQueue;if(u!==null){u=u.shared;var c=u.pending;c===null?a.next=a:(a.next=c.next,c.next=a),u.pending=a}}o.lanes|=n,a=o.alternate,a!==null&&(a.lanes|=n),ou(o.return,n,t),l.lanes|=n;break}a=a.next}}else if(o.tag===10)s=o.type===t.type?null:o.child;else if(o.tag===18){if(s=o.return,s===null)throw Error(R(341));s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),ou(s,n,t),s=o.sibling}else s=o.child;if(s!==null)s.return=o;else for(s=o;s!==null;){if(s===t){s=null;break}if(o=s.sibling,o!==null){o.return=s.return,s=o;break}s=s.return}o=s}We(e,t,i.children,n),t=t.child}return t;case 9:return i=t.type,r=t.pendingProps.children,jr(t,n),i=Tt(i),r=r(i),t.flags|=1,We(e,t,r,n),t.child;case 14:return r=t.type,i=Nt(r,t.pendingProps),i=Nt(r.type,i),Qd(e,t,r,i,n);case 15:return Ay(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:Nt(r,i),cs(e,t),t.tag=1,it(r)?(e=!0,Ms(t)):e=!1,jr(t,n),Ey(t,r,i),lu(t,r,i,n),cu(null,t,r,!0,e,n);case 19:return My(e,t,n);case 22:return Py(e,t,n)}throw Error(R(156,t.tag))};function Yy(e,t){return kg(e,t)}function hk(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function kt(e,t,n,r){return new hk(e,t,n,r)}function Wc(e){return e=e.prototype,!(!e||!e.isReactComponent)}function pk(e){if(typeof e=="function")return Wc(e)?1:0;if(e!=null){if(e=e.$$typeof,e===cc)return 11;if(e===fc)return 14}return 2}function bn(e,t){var n=e.alternate;return n===null?(n=kt(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function hs(e,t,n,r,i,o){var s=2;if(r=e,typeof e=="function")Wc(e)&&(s=1);else if(typeof e=="string")s=5;else e:switch(e){case xr:return Qn(n.children,i,o,t);case uc:s=8,i|=8;break;case Ra:return e=kt(12,n,t,i|2),e.elementType=Ra,e.lanes=o,e;case Ma:return e=kt(13,n,t,i),e.elementType=Ma,e.lanes=o,e;case Da:return e=kt(19,n,t,i),e.elementType=Da,e.lanes=o,e;case ig:return dl(n,i,o,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case ng:s=10;break e;case rg:s=9;break e;case cc:s=11;break e;case fc:s=14;break e;case dn:s=16,r=null;break e}throw Error(R(130,e==null?e:typeof e,""))}return t=kt(s,n,t,i),t.elementType=e,t.type=r,t.lanes=o,t}function Qn(e,t,n,r){return e=kt(7,e,r,t),e.lanes=n,e}function dl(e,t,n,r){return e=kt(22,e,r,t),e.elementType=ig,e.lanes=n,e.stateNode={isHidden:!1},e}function Ql(e,t,n){return e=kt(6,e,null,t),e.lanes=n,e}function Zl(e,t,n){return t=kt(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function mk(e,t,n,r,i){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Ml(0),this.expirationTimes=Ml(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ml(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function Kc(e,t,n,r,i,o,s,l,a){return e=new mk(e,t,n,l,a),t===1?(t=1,o===!0&&(t|=8)):t=0,o=kt(3,null,null,t),e.current=o,o.stateNode=e,o.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Ic(o),e}function gk(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:yr,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function qy(e){if(!e)return In;e=e._reactInternals;e:{if(ur(e)!==e||e.tag!==1)throw Error(R(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(it(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(R(171))}if(e.tag===1){var n=e.type;if(it(n))return qg(e,n,t)}return t}function Xy(e,t,n,r,i,o,s,l,a){return e=Kc(n,r,!0,e,i,o,s,l,a),e.context=qy(null),n=e.current,r=Ye(),i=Tn(n),o=Jt(r,i),o.callback=t??null,Cn(n,o,i),e.current.lanes=i,vo(e,i,r),ot(e,r),e}function hl(e,t,n,r){var i=t.current,o=Ye(),s=Tn(i);return n=qy(n),t.context===null?t.context=n:t.pendingContext=n,t=Jt(o,s),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=Cn(i,t,s),e!==null&&(Lt(e,i,s,o),ls(e,i,s)),s}function Ws(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function uh(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Gc(e,t){uh(e,t),(e=e.alternate)&&uh(e,t)}function yk(){return null}var Qy=typeof reportError=="function"?reportError:function(e){console.error(e)};function Yc(e){this._internalRoot=e}pl.prototype.render=Yc.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(R(409));hl(e,t,null,null)};pl.prototype.unmount=Yc.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;ir(function(){hl(null,e,null,null)}),t[tn]=null}};function pl(e){this._internalRoot=e}pl.prototype.unstable_scheduleHydration=function(e){if(e){var t=Pg();e={blockedOn:null,target:e,priority:t};for(var n=0;n<mn.length&&t!==0&&t<mn[n].priority;n++);mn.splice(n,0,e),n===0&&Ng(e)}};function qc(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function ml(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function ch(){}function xk(e,t,n,r,i){if(i){if(typeof r=="function"){var o=r;r=function(){var u=Ws(s);o.call(u)}}var s=Xy(t,r,e,0,null,!1,!1,"",ch);return e._reactRootContainer=s,e[tn]=s.current,Zi(e.nodeType===8?e.parentNode:e),ir(),s}for(;i=e.lastChild;)e.removeChild(i);if(typeof r=="function"){var l=r;r=function(){var u=Ws(a);l.call(u)}}var a=Kc(e,0,!1,null,null,!1,!1,"",ch);return e._reactRootContainer=a,e[tn]=a.current,Zi(e.nodeType===8?e.parentNode:e),ir(function(){hl(t,a,n,r)}),a}function gl(e,t,n,r,i){var o=n._reactRootContainer;if(o){var s=o;if(typeof i=="function"){var l=i;i=function(){var a=Ws(s);l.call(a)}}hl(t,s,e,i)}else s=xk(n,t,e,i,r);return Ws(s)}bg=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Ci(t.pendingLanes);n!==0&&(pc(t,n|1),ot(t,Ce()),!(ne&6)&&(Yr=Ce()+500,Ln()))}break;case 13:ir(function(){var r=nn(e,1);if(r!==null){var i=Ye();Lt(r,e,1,i)}}),Gc(e,1)}};mc=function(e){if(e.tag===13){var t=nn(e,134217728);if(t!==null){var n=Ye();Lt(t,e,134217728,n)}Gc(e,134217728)}};Ag=function(e){if(e.tag===13){var t=Tn(e),n=nn(e,t);if(n!==null){var r=Ye();Lt(n,e,t,r)}Gc(e,t)}};Pg=function(){return oe};Ig=function(e,t){var n=oe;try{return oe=e,t()}finally{oe=n}};Ha=function(e,t,n){switch(t){case"input":if(Oa(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var i=sl(r);if(!i)throw Error(R(90));sg(r),Oa(r,i)}}}break;case"textarea":ag(e,n);break;case"select":t=n.value,t!=null&&Lr(e,!!n.multiple,t,!1)}};mg=Uc;gg=ir;var vk={usingClientEntryPoint:!1,Events:[ko,Sr,sl,hg,pg,Uc]},gi={findFiberByHostInstance:Wn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},wk={bundleType:gi.bundleType,version:gi.version,rendererPackageName:gi.rendererPackageName,rendererConfig:gi.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ln.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=vg(e),e===null?null:e.stateNode},findFiberByHostInstance:gi.findFiberByHostInstance||yk,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Go=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Go.isDisabled&&Go.supportsFiber)try{nl=Go.inject(wk),Bt=Go}catch{}}pt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=vk;pt.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!qc(t))throw Error(R(200));return gk(e,t,null,n)};pt.createRoot=function(e,t){if(!qc(e))throw Error(R(299));var n=!1,r="",i=Qy;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(i=t.onRecoverableError)),t=Kc(e,1,!1,null,null,n,!1,r,i),e[tn]=t.current,Zi(e.nodeType===8?e.parentNode:e),new Yc(t)};pt.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(R(188)):(e=Object.keys(e).join(","),Error(R(268,e)));return e=vg(t),e=e===null?null:e.stateNode,e};pt.flushSync=function(e){return ir(e)};pt.hydrate=function(e,t,n){if(!ml(t))throw Error(R(200));return gl(null,e,t,!0,n)};pt.hydrateRoot=function(e,t,n){if(!qc(e))throw Error(R(405));var r=n!=null&&n.hydratedSources||null,i=!1,o="",s=Qy;if(n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onRecoverableError!==void 0&&(s=n.onRecoverableError)),t=Xy(t,null,e,1,n??null,i,!1,o,s),e[tn]=t.current,Zi(e),r)for(e=0;e<r.length;e++)n=r[e],i=n._getVersion,i=i(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,i]:t.mutableSourceEagerHydrationData.push(n,i);return new pl(t)};pt.render=function(e,t,n){if(!ml(t))throw Error(R(200));return gl(null,e,t,!1,n)};pt.unmountComponentAtNode=function(e){if(!ml(e))throw Error(R(40));return e._reactRootContainer?(ir(function(){gl(null,null,e,!1,function(){e._reactRootContainer=null,e[tn]=null})}),!0):!1};pt.unstable_batchedUpdates=Uc;pt.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!ml(n))throw Error(R(200));if(e==null||e._reactInternals===void 0)throw Error(R(38));return gl(e,t,n,!1,r)};pt.version="18.3.1-next-f1338f8080-20240426";function Zy(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Zy)}catch(e){console.error(e)}}Zy(),Zm.exports=pt;var kk=Zm.exports,fh=kk;Ia.createRoot=fh.createRoot,Ia.hydrateRoot=fh.hydrateRoot;const Xc=N.createContext({});function Qc(e){const t=N.useRef(null);return t.current===null&&(t.current=e()),t.current}const Zc=typeof window<"u",Jy=Zc?N.useLayoutEffect:N.useEffect,yl=N.createContext(null);function Jc(e,t){e.indexOf(t)===-1&&e.push(t)}function ef(e,t){const n=e.indexOf(t);n>-1&&e.splice(n,1)}const on=(e,t,n)=>n>t?t:n<e?e:n;let tf=()=>{};const sn={},e0=e=>/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e);function t0(e){return typeof e=="object"&&e!==null}const n0=e=>/^0[^.\s]+$/u.test(e);function nf(e){let t;return()=>(t===void 0&&(t=e()),t)}const Et=e=>e,Sk=(e,t)=>n=>t(e(n)),Co=(...e)=>e.reduce(Sk),lo=(e,t,n)=>{const r=t-e;return r===0?1:(n-e)/r};class rf{constructor(){this.subscriptions=[]}add(t){return Jc(this.subscriptions,t),()=>ef(this.subscriptions,t)}notify(t,n,r){const i=this.subscriptions.length;if(i)if(i===1)this.subscriptions[0](t,n,r);else for(let o=0;o<i;o++){const s=this.subscriptions[o];s&&s(t,n,r)}}getSize(){return this.subscriptions.length}clear(){this.subscriptions.length=0}}const Ht=e=>e*1e3,St=e=>e/1e3;function r0(e,t){return t?e*(1e3/t):0}const i0=(e,t,n)=>(((1-3*n+3*t)*e+(3*n-6*t))*e+3*t)*e,Ck=1e-7,Ek=12;function Tk(e,t,n,r,i){let o,s,l=0;do s=t+(n-t)/2,o=i0(s,r,i)-e,o>0?n=s:t=s;while(Math.abs(o)>Ck&&++l<Ek);return s}function Eo(e,t,n,r){if(e===t&&n===r)return Et;const i=o=>Tk(o,0,1,e,n);return o=>o===0||o===1?o:i0(i(o),t,r)}const o0=e=>t=>t<=.5?e(2*t)/2:(2-e(2*(1-t)))/2,s0=e=>t=>1-e(1-t),l0=Eo(.33,1.53,.69,.99),of=s0(l0),a0=o0(of),u0=e=>(e*=2)<1?.5*of(e):.5*(2-Math.pow(2,-10*(e-1))),sf=e=>1-Math.sin(Math.acos(e)),c0=s0(sf),f0=o0(sf),bk=Eo(.42,0,1,1),Ak=Eo(0,0,.58,1),d0=Eo(.42,0,.58,1),Pk=e=>Array.isArray(e)&&typeof e[0]!="number",h0=e=>Array.isArray(e)&&typeof e[0]=="number",Ik={linear:Et,easeIn:bk,easeInOut:d0,easeOut:Ak,circIn:sf,circInOut:f0,circOut:c0,backIn:of,backInOut:a0,backOut:l0,anticipate:u0},Nk=e=>typeof e=="string",dh=e=>{if(h0(e)){tf(e.length===4);const[t,n,r,i]=e;return Eo(t,n,r,i)}else if(Nk(e))return Ik[e];return e},Yo=["setup","read","resolveKeyframes","preUpdate","update","preRender","render","postRender"];function Rk(e,t){let n=new Set,r=new Set,i=!1,o=!1;const s=new WeakSet;let l={delta:0,timestamp:0,isProcessing:!1};function a(c){s.has(c)&&(u.schedule(c),e()),c(l)}const u={schedule:(c,f=!1,d=!1)=>{const m=d&&i?n:r;return f&&s.add(c),m.has(c)||m.add(c),c},cancel:c=>{r.delete(c),s.delete(c)},process:c=>{if(l=c,i){o=!0;return}i=!0,[n,r]=[r,n],n.forEach(a),n.clear(),i=!1,o&&(o=!1,u.process(c))}};return u}const Mk=40;function p0(e,t){let n=!1,r=!0;const i={delta:0,timestamp:0,isProcessing:!1},o=()=>n=!0,s=Yo.reduce((y,T)=>(y[T]=Rk(o),y),{}),{setup:l,read:a,resolveKeyframes:u,preUpdate:c,update:f,preRender:d,render:h,postRender:m}=s,x=()=>{const y=sn.useManualTiming?i.timestamp:performance.now();n=!1,sn.useManualTiming||(i.delta=r?1e3/60:Math.max(Math.min(y-i.timestamp,Mk),1)),i.timestamp=y,i.isProcessing=!0,l.process(i),a.process(i),u.process(i),c.process(i),f.process(i),d.process(i),h.process(i),m.process(i),i.isProcessing=!1,n&&t&&(r=!1,e(x))},E=()=>{n=!0,r=!0,i.isProcessing||e(x)};return{schedule:Yo.reduce((y,T)=>{const b=s[T];return y[T]=(k,A=!1,P=!1)=>(n||E(),b.schedule(k,A,P)),y},{}),cancel:y=>{for(let T=0;T<Yo.length;T++)s[Yo[T]].cancel(y)},state:i,steps:s}}const{schedule:pe,cancel:Nn,state:De,steps:Jl}=p0(typeof requestAnimationFrame<"u"?requestAnimationFrame:Et,!0);let ps;function Dk(){ps=void 0}const nt={now:()=>(ps===void 0&&nt.set(De.isProcessing||sn.useManualTiming?De.timestamp:performance.now()),ps),set:e=>{ps=e,queueMicrotask(Dk)}},m0=e=>t=>typeof t=="string"&&t.startsWith(e),lf=m0("--"),Lk=m0("var(--"),af=e=>Lk(e)?_k.test(e.split("/*")[0].trim()):!1,_k=/var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu,ni={test:e=>typeof e=="number",parse:parseFloat,transform:e=>e},ao={...ni,transform:e=>on(0,1,e)},qo={...ni,default:1},_i=e=>Math.round(e*1e5)/1e5,uf=/-?(?:\d+(?:\.\d+)?|\.\d+)/gu;function Ok(e){return e==null}const Fk=/^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,cf=(e,t)=>n=>!!(typeof n=="string"&&Fk.test(n)&&n.startsWith(e)||t&&!Ok(n)&&Object.prototype.hasOwnProperty.call(n,t)),g0=(e,t,n)=>r=>{if(typeof r!="string")return r;const[i,o,s,l]=r.match(uf);return{[e]:parseFloat(i),[t]:parseFloat(o),[n]:parseFloat(s),alpha:l!==void 0?parseFloat(l):1}},jk=e=>on(0,255,e),ea={...ni,transform:e=>Math.round(jk(e))},Yn={test:cf("rgb","red"),parse:g0("red","green","blue"),transform:({red:e,green:t,blue:n,alpha:r=1})=>"rgba("+ea.transform(e)+", "+ea.transform(t)+", "+ea.transform(n)+", "+_i(ao.transform(r))+")"};function zk(e){let t="",n="",r="",i="";return e.length>5?(t=e.substring(1,3),n=e.substring(3,5),r=e.substring(5,7),i=e.substring(7,9)):(t=e.substring(1,2),n=e.substring(2,3),r=e.substring(3,4),i=e.substring(4,5),t+=t,n+=n,r+=r,i+=i),{red:parseInt(t,16),green:parseInt(n,16),blue:parseInt(r,16),alpha:i?parseInt(i,16)/255:1}}const Su={test:cf("#"),parse:zk,transform:Yn.transform},To=e=>({test:t=>typeof t=="string"&&t.endsWith(e)&&t.split(" ").length===1,parse:parseFloat,transform:t=>`${t}${e}`}),fn=To("deg"),$t=To("%"),$=To("px"),Vk=To("vh"),Bk=To("vw"),hh={...$t,parse:e=>$t.parse(e)/100,transform:e=>$t.transform(e*100)},Ir={test:cf("hsl","hue"),parse:g0("hue","saturation","lightness"),transform:({hue:e,saturation:t,lightness:n,alpha:r=1})=>"hsla("+Math.round(e)+", "+$t.transform(_i(t))+", "+$t.transform(_i(n))+", "+_i(ao.transform(r))+")"},Te={test:e=>Yn.test(e)||Su.test(e)||Ir.test(e),parse:e=>Yn.test(e)?Yn.parse(e):Ir.test(e)?Ir.parse(e):Su.parse(e),transform:e=>typeof e=="string"?e:e.hasOwnProperty("red")?Yn.transform(e):Ir.transform(e),getAnimatableNone:e=>{const t=Te.parse(e);return t.alpha=0,Te.transform(t)}},Uk=/(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;function Hk(e){var t,n;return isNaN(e)&&typeof e=="string"&&(((t=e.match(uf))==null?void 0:t.length)||0)+(((n=e.match(Uk))==null?void 0:n.length)||0)>0}const y0="number",x0="color",$k="var",Wk="var(",ph="${}",Kk=/var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;function uo(e){const t=e.toString(),n=[],r={color:[],number:[],var:[]},i=[];let o=0;const l=t.replace(Kk,a=>(Te.test(a)?(r.color.push(o),i.push(x0),n.push(Te.parse(a))):a.startsWith(Wk)?(r.var.push(o),i.push($k),n.push(a)):(r.number.push(o),i.push(y0),n.push(parseFloat(a))),++o,ph)).split(ph);return{values:n,split:l,indexes:r,types:i}}function v0(e){return uo(e).values}function w0(e){const{split:t,types:n}=uo(e),r=t.length;return i=>{let o="";for(let s=0;s<r;s++)if(o+=t[s],i[s]!==void 0){const l=n[s];l===y0?o+=_i(i[s]):l===x0?o+=Te.transform(i[s]):o+=i[s]}return o}}const Gk=e=>typeof e=="number"?0:Te.test(e)?Te.getAnimatableNone(e):e;function Yk(e){const t=v0(e);return w0(e)(t.map(Gk))}const Rn={test:Hk,parse:v0,createTransformer:w0,getAnimatableNone:Yk};function ta(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*(2/3-n)*6:e}function qk({hue:e,saturation:t,lightness:n,alpha:r}){e/=360,t/=100,n/=100;let i=0,o=0,s=0;if(!t)i=o=s=n;else{const l=n<.5?n*(1+t):n+t-n*t,a=2*n-l;i=ta(a,l,e+1/3),o=ta(a,l,e),s=ta(a,l,e-1/3)}return{red:Math.round(i*255),green:Math.round(o*255),blue:Math.round(s*255),alpha:r}}function Ks(e,t){return n=>n>0?t:e}const ye=(e,t,n)=>e+(t-e)*n,na=(e,t,n)=>{const r=e*e,i=n*(t*t-r)+r;return i<0?0:Math.sqrt(i)},Xk=[Su,Yn,Ir],Qk=e=>Xk.find(t=>t.test(e));function mh(e){const t=Qk(e);if(!t)return!1;let n=t.parse(e);return t===Ir&&(n=qk(n)),n}const gh=(e,t)=>{const n=mh(e),r=mh(t);if(!n||!r)return Ks(e,t);const i={...n};return o=>(i.red=na(n.red,r.red,o),i.green=na(n.green,r.green,o),i.blue=na(n.blue,r.blue,o),i.alpha=ye(n.alpha,r.alpha,o),Yn.transform(i))},Cu=new Set(["none","hidden"]);function Zk(e,t){return Cu.has(e)?n=>n<=0?e:t:n=>n>=1?t:e}function Jk(e,t){return n=>ye(e,t,n)}function ff(e){return typeof e=="number"?Jk:typeof e=="string"?af(e)?Ks:Te.test(e)?gh:nS:Array.isArray(e)?k0:typeof e=="object"?Te.test(e)?gh:eS:Ks}function k0(e,t){const n=[...e],r=n.length,i=e.map((o,s)=>ff(o)(o,t[s]));return o=>{for(let s=0;s<r;s++)n[s]=i[s](o);return n}}function eS(e,t){const n={...e,...t},r={};for(const i in n)e[i]!==void 0&&t[i]!==void 0&&(r[i]=ff(e[i])(e[i],t[i]));return i=>{for(const o in r)n[o]=r[o](i);return n}}function tS(e,t){const n=[],r={color:0,var:0,number:0};for(let i=0;i<t.values.length;i++){const o=t.types[i],s=e.indexes[o][r[o]],l=e.values[s]??0;n[i]=l,r[o]++}return n}const nS=(e,t)=>{const n=Rn.createTransformer(t),r=uo(e),i=uo(t);return r.indexes.var.length===i.indexes.var.length&&r.indexes.color.length===i.indexes.color.length&&r.indexes.number.length>=i.indexes.number.length?Cu.has(e)&&!i.values.length||Cu.has(t)&&!r.values.length?Zk(e,t):Co(k0(tS(r,i),i.values),n):Ks(e,t)};function S0(e,t,n){return typeof e=="number"&&typeof t=="number"&&typeof n=="number"?ye(e,t,n):ff(e)(e,t)}const rS=e=>{const t=({timestamp:n})=>e(n);return{start:(n=!0)=>pe.update(t,n),stop:()=>Nn(t),now:()=>De.isProcessing?De.timestamp:nt.now()}},C0=(e,t,n=10)=>{let r="";const i=Math.max(Math.round(t/n),2);for(let o=0;o<i;o++)r+=Math.round(e(o/(i-1))*1e4)/1e4+", ";return`linear(${r.substring(0,r.length-2)})`},Gs=2e4;function df(e){let t=0;const n=50;let r=e.next(t);for(;!r.done&&t<Gs;)t+=n,r=e.next(t);return t>=Gs?1/0:t}function iS(e,t=100,n){const r=n({...e,keyframes:[0,t]}),i=Math.min(df(r),Gs);return{type:"keyframes",ease:o=>r.next(i*o).value/t,duration:St(i)}}const oS=5;function E0(e,t,n){const r=Math.max(t-oS,0);return r0(n-e(r),t-r)}const we={stiffness:100,damping:10,mass:1,velocity:0,duration:800,bounce:.3,visualDuration:.3,restSpeed:{granular:.01,default:2},restDelta:{granular:.005,default:.5},minDuration:.01,maxDuration:10,minDamping:.05,maxDamping:1},ra=.001;function sS({duration:e=we.duration,bounce:t=we.bounce,velocity:n=we.velocity,mass:r=we.mass}){let i,o,s=1-t;s=on(we.minDamping,we.maxDamping,s),e=on(we.minDuration,we.maxDuration,St(e)),s<1?(i=u=>{const c=u*s,f=c*e,d=c-n,h=Eu(u,s),m=Math.exp(-f);return ra-d/h*m},o=u=>{const f=u*s*e,d=f*n+n,h=Math.pow(s,2)*Math.pow(u,2)*e,m=Math.exp(-f),x=Eu(Math.pow(u,2),s);return(-i(u)+ra>0?-1:1)*((d-h)*m)/x}):(i=u=>{const c=Math.exp(-u*e),f=(u-n)*e+1;return-ra+c*f},o=u=>{const c=Math.exp(-u*e),f=(n-u)*(e*e);return c*f});const l=5/e,a=aS(i,o,l);if(e=Ht(e),isNaN(a))return{stiffness:we.stiffness,damping:we.damping,duration:e};{const u=Math.pow(a,2)*r;return{stiffness:u,damping:s*2*Math.sqrt(r*u),duration:e}}}const lS=12;function aS(e,t,n){let r=n;for(let i=1;i<lS;i++)r=r-e(r)/t(r);return r}function Eu(e,t){return e*Math.sqrt(1-t*t)}const uS=["duration","bounce"],cS=["stiffness","damping","mass"];function yh(e,t){return t.some(n=>e[n]!==void 0)}function fS(e){let t={velocity:we.velocity,stiffness:we.stiffness,damping:we.damping,mass:we.mass,isResolvedFromDuration:!1,...e};if(!yh(e,cS)&&yh(e,uS))if(e.visualDuration){const n=e.visualDuration,r=2*Math.PI/(n*1.2),i=r*r,o=2*on(.05,1,1-(e.bounce||0))*Math.sqrt(i);t={...t,mass:we.mass,stiffness:i,damping:o}}else{const n=sS(e);t={...t,...n,mass:we.mass},t.isResolvedFromDuration=!0}return t}function Ys(e=we.visualDuration,t=we.bounce){const n=typeof e!="object"?{visualDuration:e,keyframes:[0,1],bounce:t}:e;let{restSpeed:r,restDelta:i}=n;const o=n.keyframes[0],s=n.keyframes[n.keyframes.length-1],l={done:!1,value:o},{stiffness:a,damping:u,mass:c,duration:f,velocity:d,isResolvedFromDuration:h}=fS({...n,velocity:-St(n.velocity||0)}),m=d||0,x=u/(2*Math.sqrt(a*c)),E=s-o,p=St(Math.sqrt(a/c)),g=Math.abs(E)<5;r||(r=g?we.restSpeed.granular:we.restSpeed.default),i||(i=g?we.restDelta.granular:we.restDelta.default);let y;if(x<1){const b=Eu(p,x);y=k=>{const A=Math.exp(-x*p*k);return s-A*((m+x*p*E)/b*Math.sin(b*k)+E*Math.cos(b*k))}}else if(x===1)y=b=>s-Math.exp(-p*b)*(E+(m+p*E)*b);else{const b=p*Math.sqrt(x*x-1);y=k=>{const A=Math.exp(-x*p*k),P=Math.min(b*k,300);return s-A*((m+x*p*E)*Math.sinh(P)+b*E*Math.cosh(P))/b}}const T={calculatedDuration:h&&f||null,next:b=>{const k=y(b);if(h)l.done=b>=f;else{let A=b===0?m:0;x<1&&(A=b===0?Ht(m):E0(y,b,k));const P=Math.abs(A)<=r,O=Math.abs(s-k)<=i;l.done=P&&O}return l.value=l.done?s:k,l},toString:()=>{const b=Math.min(df(T),Gs),k=C0(A=>T.next(b*A).value,b,30);return b+"ms "+k},toTransition:()=>{}};return T}Ys.applyToOptions=e=>{const t=iS(e,100,Ys);return e.ease=t.ease,e.duration=Ht(t.duration),e.type="keyframes",e};function Tu({keyframes:e,velocity:t=0,power:n=.8,timeConstant:r=325,bounceDamping:i=10,bounceStiffness:o=500,modifyTarget:s,min:l,max:a,restDelta:u=.5,restSpeed:c}){const f=e[0],d={done:!1,value:f},h=P=>l!==void 0&&P<l||a!==void 0&&P>a,m=P=>l===void 0?a:a===void 0||Math.abs(l-P)<Math.abs(a-P)?l:a;let x=n*t;const E=f+x,p=s===void 0?E:s(E);p!==E&&(x=p-f);const g=P=>-x*Math.exp(-P/r),y=P=>p+g(P),T=P=>{const O=g(P),C=y(P);d.done=Math.abs(O)<=u,d.value=d.done?p:C};let b,k;const A=P=>{h(d.value)&&(b=P,k=Ys({keyframes:[d.value,m(d.value)],velocity:E0(y,P,d.value),damping:i,stiffness:o,restDelta:u,restSpeed:c}))};return A(0),{calculatedDuration:null,next:P=>{let O=!1;return!k&&b===void 0&&(O=!0,T(P),A(P)),b!==void 0&&P>=b?k.next(P-b):(!O&&T(P),d)}}}function dS(e,t,n){const r=[],i=n||sn.mix||S0,o=e.length-1;for(let s=0;s<o;s++){let l=i(e[s],e[s+1]);if(t){const a=Array.isArray(t)?t[s]||Et:t;l=Co(a,l)}r.push(l)}return r}function hS(e,t,{clamp:n=!0,ease:r,mixer:i}={}){const o=e.length;if(tf(o===t.length),o===1)return()=>t[0];if(o===2&&t[0]===t[1])return()=>t[1];const s=e[0]===e[1];e[0]>e[o-1]&&(e=[...e].reverse(),t=[...t].reverse());const l=dS(t,r,i),a=l.length,u=c=>{if(s&&c<e[0])return t[0];let f=0;if(a>1)for(;f<e.length-2&&!(c<e[f+1]);f++);const d=lo(e[f],e[f+1],c);return l[f](d)};return n?c=>u(on(e[0],e[o-1],c)):u}function pS(e,t){const n=e[e.length-1];for(let r=1;r<=t;r++){const i=lo(0,t,r);e.push(ye(n,1,i))}}function mS(e){const t=[0];return pS(t,e.length-1),t}function gS(e,t){return e.map(n=>n*t)}function yS(e,t){return e.map(()=>t||d0).splice(0,e.length-1)}function Oi({duration:e=300,keyframes:t,times:n,ease:r="easeInOut"}){const i=Pk(r)?r.map(dh):dh(r),o={done:!1,value:t[0]},s=gS(n&&n.length===t.length?n:mS(t),e),l=hS(s,t,{ease:Array.isArray(i)?i:yS(t,i)});return{calculatedDuration:e,next:a=>(o.value=l(a),o.done=a>=e,o)}}const xS=e=>e!==null;function hf(e,{repeat:t,repeatType:n="loop"},r,i=1){const o=e.filter(xS),l=i<0||t&&n!=="loop"&&t%2===1?0:o.length-1;return!l||r===void 0?o[l]:r}const vS={decay:Tu,inertia:Tu,tween:Oi,keyframes:Oi,spring:Ys};function T0(e){typeof e.type=="string"&&(e.type=vS[e.type])}class pf{constructor(){this.updateFinished()}get finished(){return this._finished}updateFinished(){this._finished=new Promise(t=>{this.resolve=t})}notifyFinished(){this.resolve()}then(t,n){return this.finished.then(t,n)}}const wS=e=>e/100;class mf extends pf{constructor(t){super(),this.state="idle",this.startTime=null,this.isStopped=!1,this.currentTime=0,this.holdTime=null,this.playbackSpeed=1,this.stop=()=>{var r,i;const{motionValue:n}=this.options;n&&n.updatedAt!==nt.now()&&this.tick(nt.now()),this.isStopped=!0,this.state!=="idle"&&(this.teardown(),(i=(r=this.options).onStop)==null||i.call(r))},this.options=t,this.initAnimation(),this.play(),t.autoplay===!1&&this.pause()}initAnimation(){const{options:t}=this;T0(t);const{type:n=Oi,repeat:r=0,repeatDelay:i=0,repeatType:o,velocity:s=0}=t;let{keyframes:l}=t;const a=n||Oi;a!==Oi&&typeof l[0]!="number"&&(this.mixKeyframes=Co(wS,S0(l[0],l[1])),l=[0,100]);const u=a({...t,keyframes:l});o==="mirror"&&(this.mirroredGenerator=a({...t,keyframes:[...l].reverse(),velocity:-s})),u.calculatedDuration===null&&(u.calculatedDuration=df(u));const{calculatedDuration:c}=u;this.calculatedDuration=c,this.resolvedDuration=c+i,this.totalDuration=this.resolvedDuration*(r+1)-i,this.generator=u}updateTime(t){const n=Math.round(t-this.startTime)*this.playbackSpeed;this.holdTime!==null?this.currentTime=this.holdTime:this.currentTime=n}tick(t,n=!1){const{generator:r,totalDuration:i,mixKeyframes:o,mirroredGenerator:s,resolvedDuration:l,calculatedDuration:a}=this;if(this.startTime===null)return r.next(0);const{delay:u=0,keyframes:c,repeat:f,repeatType:d,repeatDelay:h,type:m,onUpdate:x,finalKeyframe:E}=this.options;this.speed>0?this.startTime=Math.min(this.startTime,t):this.speed<0&&(this.startTime=Math.min(t-i/this.speed,this.startTime)),n?this.currentTime=t:this.updateTime(t);const p=this.currentTime-u*(this.playbackSpeed>=0?1:-1),g=this.playbackSpeed>=0?p<0:p>i;this.currentTime=Math.max(p,0),this.state==="finished"&&this.holdTime===null&&(this.currentTime=i);let y=this.currentTime,T=r;if(f){const P=Math.min(this.currentTime,i)/l;let O=Math.floor(P),C=P%1;!C&&P>=1&&(C=1),C===1&&O--,O=Math.min(O,f+1),!!(O%2)&&(d==="reverse"?(C=1-C,h&&(C-=h/l)):d==="mirror"&&(T=s)),y=on(0,1,C)*l}const b=g?{done:!1,value:c[0]}:T.next(y);o&&(b.value=o(b.value));let{done:k}=b;!g&&a!==null&&(k=this.playbackSpeed>=0?this.currentTime>=i:this.currentTime<=0);const A=this.holdTime===null&&(this.state==="finished"||this.state==="running"&&k);return A&&m!==Tu&&(b.value=hf(c,this.options,E,this.speed)),x&&x(b.value),A&&this.finish(),b}then(t,n){return this.finished.then(t,n)}get duration(){return St(this.calculatedDuration)}get iterationDuration(){const{delay:t=0}=this.options||{};return this.duration+St(t)}get time(){return St(this.currentTime)}set time(t){var n;t=Ht(t),this.currentTime=t,this.startTime===null||this.holdTime!==null||this.playbackSpeed===0?this.holdTime=t:this.driver&&(this.startTime=this.driver.now()-t/this.playbackSpeed),(n=this.driver)==null||n.start(!1)}get speed(){return this.playbackSpeed}set speed(t){this.updateTime(nt.now());const n=this.playbackSpeed!==t;this.playbackSpeed=t,n&&(this.time=St(this.currentTime))}play(){var i,o;if(this.isStopped)return;const{driver:t=rS,startTime:n}=this.options;this.driver||(this.driver=t(s=>this.tick(s))),(o=(i=this.options).onPlay)==null||o.call(i);const r=this.driver.now();this.state==="finished"?(this.updateFinished(),this.startTime=r):this.holdTime!==null?this.startTime=r-this.holdTime:this.startTime||(this.startTime=n??r),this.state==="finished"&&this.speed<0&&(this.startTime+=this.calculatedDuration),this.holdTime=null,this.state="running",this.driver.start()}pause(){this.state="paused",this.updateTime(nt.now()),this.holdTime=this.currentTime}complete(){this.state!=="running"&&this.play(),this.state="finished",this.holdTime=null}finish(){var t,n;this.notifyFinished(),this.teardown(),this.state="finished",(n=(t=this.options).onComplete)==null||n.call(t)}cancel(){var t,n;this.holdTime=null,this.startTime=0,this.tick(0),this.teardown(),(n=(t=this.options).onCancel)==null||n.call(t)}teardown(){this.state="idle",this.stopDriver(),this.startTime=this.holdTime=null}stopDriver(){this.driver&&(this.driver.stop(),this.driver=void 0)}sample(t){return this.startTime=0,this.tick(t,!0)}attachTimeline(t){var n;return this.options.allowFlatten&&(this.options.type="keyframes",this.options.ease="linear",this.initAnimation()),(n=this.driver)==null||n.stop(),t.observe(this)}}function kS(e){for(let t=1;t<e.length;t++)e[t]??(e[t]=e[t-1])}const qn=e=>e*180/Math.PI,bu=e=>{const t=qn(Math.atan2(e[1],e[0]));return Au(t)},SS={x:4,y:5,translateX:4,translateY:5,scaleX:0,scaleY:3,scale:e=>(Math.abs(e[0])+Math.abs(e[3]))/2,rotate:bu,rotateZ:bu,skewX:e=>qn(Math.atan(e[1])),skewY:e=>qn(Math.atan(e[2])),skew:e=>(Math.abs(e[1])+Math.abs(e[2]))/2},Au=e=>(e=e%360,e<0&&(e+=360),e),xh=bu,vh=e=>Math.sqrt(e[0]*e[0]+e[1]*e[1]),wh=e=>Math.sqrt(e[4]*e[4]+e[5]*e[5]),CS={x:12,y:13,z:14,translateX:12,translateY:13,translateZ:14,scaleX:vh,scaleY:wh,scale:e=>(vh(e)+wh(e))/2,rotateX:e=>Au(qn(Math.atan2(e[6],e[5]))),rotateY:e=>Au(qn(Math.atan2(-e[2],e[0]))),rotateZ:xh,rotate:xh,skewX:e=>qn(Math.atan(e[4])),skewY:e=>qn(Math.atan(e[1])),skew:e=>(Math.abs(e[1])+Math.abs(e[4]))/2};function Pu(e){return e.includes("scale")?1:0}function Iu(e,t){if(!e||e==="none")return Pu(t);const n=e.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);let r,i;if(n)r=CS,i=n;else{const l=e.match(/^matrix\(([-\d.e\s,]+)\)$/u);r=SS,i=l}if(!i)return Pu(t);const o=r[t],s=i[1].split(",").map(TS);return typeof o=="function"?o(s):s[o]}const ES=(e,t)=>{const{transform:n="none"}=getComputedStyle(e);return Iu(n,t)};function TS(e){return parseFloat(e.trim())}const ri=["transformPerspective","x","y","z","translateX","translateY","translateZ","scale","scaleX","scaleY","rotate","rotateX","rotateY","rotateZ","skew","skewX","skewY"],ii=new Set(ri),kh=e=>e===ni||e===$,bS=new Set(["x","y","z"]),AS=ri.filter(e=>!bS.has(e));function PS(e){const t=[];return AS.forEach(n=>{const r=e.getValue(n);r!==void 0&&(t.push([n,r.get()]),r.set(n.startsWith("scale")?1:0))}),t}const Zn={width:({x:e},{paddingLeft:t="0",paddingRight:n="0"})=>e.max-e.min-parseFloat(t)-parseFloat(n),height:({y:e},{paddingTop:t="0",paddingBottom:n="0"})=>e.max-e.min-parseFloat(t)-parseFloat(n),top:(e,{top:t})=>parseFloat(t),left:(e,{left:t})=>parseFloat(t),bottom:({y:e},{top:t})=>parseFloat(t)+(e.max-e.min),right:({x:e},{left:t})=>parseFloat(t)+(e.max-e.min),x:(e,{transform:t})=>Iu(t,"x"),y:(e,{transform:t})=>Iu(t,"y")};Zn.translateX=Zn.x;Zn.translateY=Zn.y;const Jn=new Set;let Nu=!1,Ru=!1,Mu=!1;function b0(){if(Ru){const e=Array.from(Jn).filter(r=>r.needsMeasurement),t=new Set(e.map(r=>r.element)),n=new Map;t.forEach(r=>{const i=PS(r);i.length&&(n.set(r,i),r.render())}),e.forEach(r=>r.measureInitialState()),t.forEach(r=>{r.render();const i=n.get(r);i&&i.forEach(([o,s])=>{var l;(l=r.getValue(o))==null||l.set(s)})}),e.forEach(r=>r.measureEndState()),e.forEach(r=>{r.suspendedScrollY!==void 0&&window.scrollTo(0,r.suspendedScrollY)})}Ru=!1,Nu=!1,Jn.forEach(e=>e.complete(Mu)),Jn.clear()}function A0(){Jn.forEach(e=>{e.readKeyframes(),e.needsMeasurement&&(Ru=!0)})}function IS(){Mu=!0,A0(),b0(),Mu=!1}class gf{constructor(t,n,r,i,o,s=!1){this.state="pending",this.isAsync=!1,this.needsMeasurement=!1,this.unresolvedKeyframes=[...t],this.onComplete=n,this.name=r,this.motionValue=i,this.element=o,this.isAsync=s}scheduleResolve(){this.state="scheduled",this.isAsync?(Jn.add(this),Nu||(Nu=!0,pe.read(A0),pe.resolveKeyframes(b0))):(this.readKeyframes(),this.complete())}readKeyframes(){const{unresolvedKeyframes:t,name:n,element:r,motionValue:i}=this;if(t[0]===null){const o=i==null?void 0:i.get(),s=t[t.length-1];if(o!==void 0)t[0]=o;else if(r&&n){const l=r.readValue(n,s);l!=null&&(t[0]=l)}t[0]===void 0&&(t[0]=s),i&&o===void 0&&i.set(t[0])}kS(t)}setFinalKeyframe(){}measureInitialState(){}renderEndStyles(){}measureEndState(){}complete(t=!1){this.state="complete",this.onComplete(this.unresolvedKeyframes,this.finalKeyframe,t),Jn.delete(this)}cancel(){this.state==="scheduled"&&(Jn.delete(this),this.state="pending")}resume(){this.state==="pending"&&this.scheduleResolve()}}const NS=e=>e.startsWith("--");function RS(e,t,n){NS(t)?e.style.setProperty(t,n):e.style[t]=n}const MS=nf(()=>window.ScrollTimeline!==void 0),DS={};function LS(e,t){const n=nf(e);return()=>DS[t]??n()}const P0=LS(()=>{try{document.createElement("div").animate({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0},"linearEasing"),Ti=([e,t,n,r])=>`cubic-bezier(${e}, ${t}, ${n}, ${r})`,Sh={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",circIn:Ti([0,.65,.55,1]),circOut:Ti([.55,0,1,.45]),backIn:Ti([.31,.01,.66,-.59]),backOut:Ti([.33,1.53,.69,.99])};function I0(e,t){if(e)return typeof e=="function"?P0()?C0(e,t):"ease-out":h0(e)?Ti(e):Array.isArray(e)?e.map(n=>I0(n,t)||Sh.easeOut):Sh[e]}function _S(e,t,n,{delay:r=0,duration:i=300,repeat:o=0,repeatType:s="loop",ease:l="easeOut",times:a}={},u=void 0){const c={[t]:n};a&&(c.offset=a);const f=I0(l,i);Array.isArray(f)&&(c.easing=f);const d={delay:r,duration:i,easing:Array.isArray(f)?"linear":f,fill:"both",iterations:o+1,direction:s==="reverse"?"alternate":"normal"};return u&&(d.pseudoElement=u),e.animate(c,d)}function N0(e){return typeof e=="function"&&"applyToOptions"in e}function OS({type:e,...t}){return N0(e)&&P0()?e.applyToOptions(t):(t.duration??(t.duration=300),t.ease??(t.ease="easeOut"),t)}class FS extends pf{constructor(t){if(super(),this.finishedTime=null,this.isStopped=!1,!t)return;const{element:n,name:r,keyframes:i,pseudoElement:o,allowFlatten:s=!1,finalKeyframe:l,onComplete:a}=t;this.isPseudoElement=!!o,this.allowFlatten=s,this.options=t,tf(typeof t.type!="string");const u=OS(t);this.animation=_S(n,r,i,u,o),u.autoplay===!1&&this.animation.pause(),this.animation.onfinish=()=>{if(this.finishedTime=this.time,!o){const c=hf(i,this.options,l,this.speed);this.updateMotionValue?this.updateMotionValue(c):RS(n,r,c),this.animation.cancel()}a==null||a(),this.notifyFinished()}}play(){this.isStopped||(this.animation.play(),this.state==="finished"&&this.updateFinished())}pause(){this.animation.pause()}complete(){var t,n;(n=(t=this.animation).finish)==null||n.call(t)}cancel(){try{this.animation.cancel()}catch{}}stop(){if(this.isStopped)return;this.isStopped=!0;const{state:t}=this;t==="idle"||t==="finished"||(this.updateMotionValue?this.updateMotionValue():this.commitStyles(),this.isPseudoElement||this.cancel())}commitStyles(){var t,n;this.isPseudoElement||(n=(t=this.animation).commitStyles)==null||n.call(t)}get duration(){var n,r;const t=((r=(n=this.animation.effect)==null?void 0:n.getComputedTiming)==null?void 0:r.call(n).duration)||0;return St(Number(t))}get iterationDuration(){const{delay:t=0}=this.options||{};return this.duration+St(t)}get time(){return St(Number(this.animation.currentTime)||0)}set time(t){this.finishedTime=null,this.animation.currentTime=Ht(t)}get speed(){return this.animation.playbackRate}set speed(t){t<0&&(this.finishedTime=null),this.animation.playbackRate=t}get state(){return this.finishedTime!==null?"finished":this.animation.playState}get startTime(){return Number(this.animation.startTime)}set startTime(t){this.animation.startTime=t}attachTimeline({timeline:t,observe:n}){var r;return this.allowFlatten&&((r=this.animation.effect)==null||r.updateTiming({easing:"linear"})),this.animation.onfinish=null,t&&MS()?(this.animation.timeline=t,Et):n(this)}}const R0={anticipate:u0,backInOut:a0,circInOut:f0};function jS(e){return e in R0}function zS(e){typeof e.ease=="string"&&jS(e.ease)&&(e.ease=R0[e.ease])}const Ch=10;class VS extends FS{constructor(t){zS(t),T0(t),super(t),t.startTime&&(this.startTime=t.startTime),this.options=t}updateMotionValue(t){const{motionValue:n,onUpdate:r,onComplete:i,element:o,...s}=this.options;if(!n)return;if(t!==void 0){n.set(t);return}const l=new mf({...s,autoplay:!1}),a=Ht(this.finishedTime??this.time);n.setWithVelocity(l.sample(a-Ch).value,l.sample(a).value,Ch),l.stop()}}const Eh=(e,t)=>t==="zIndex"?!1:!!(typeof e=="number"||Array.isArray(e)||typeof e=="string"&&(Rn.test(e)||e==="0")&&!e.startsWith("url("));function BS(e){const t=e[0];if(e.length===1)return!0;for(let n=0;n<e.length;n++)if(e[n]!==t)return!0}function US(e,t,n,r){const i=e[0];if(i===null)return!1;if(t==="display"||t==="visibility")return!0;const o=e[e.length-1],s=Eh(i,t),l=Eh(o,t);return!s||!l?!1:BS(e)||(n==="spring"||N0(n))&&r}function Du(e){e.duration=0,e.type="keyframes"}const HS=new Set(["opacity","clipPath","filter","transform"]),$S=nf(()=>Object.hasOwnProperty.call(Element.prototype,"animate"));function WS(e){var c;const{motionValue:t,name:n,repeatDelay:r,repeatType:i,damping:o,type:s}=e;if(!(((c=t==null?void 0:t.owner)==null?void 0:c.current)instanceof HTMLElement))return!1;const{onUpdate:a,transformTemplate:u}=t.owner.getProps();return $S()&&n&&HS.has(n)&&(n!=="transform"||!u)&&!a&&!r&&i!=="mirror"&&o!==0&&s!=="inertia"}const KS=40;class GS extends pf{constructor({autoplay:t=!0,delay:n=0,type:r="keyframes",repeat:i=0,repeatDelay:o=0,repeatType:s="loop",keyframes:l,name:a,motionValue:u,element:c,...f}){var m;super(),this.stop=()=>{var x,E;this._animation&&(this._animation.stop(),(x=this.stopTimeline)==null||x.call(this)),(E=this.keyframeResolver)==null||E.cancel()},this.createdAt=nt.now();const d={autoplay:t,delay:n,type:r,repeat:i,repeatDelay:o,repeatType:s,name:a,motionValue:u,element:c,...f},h=(c==null?void 0:c.KeyframeResolver)||gf;this.keyframeResolver=new h(l,(x,E,p)=>this.onKeyframesResolved(x,E,d,!p),a,u,c),(m=this.keyframeResolver)==null||m.scheduleResolve()}onKeyframesResolved(t,n,r,i){this.keyframeResolver=void 0;const{name:o,type:s,velocity:l,delay:a,isHandoff:u,onUpdate:c}=r;this.resolvedAt=nt.now(),US(t,o,s,l)||((sn.instantAnimations||!a)&&(c==null||c(hf(t,r,n))),t[0]=t[t.length-1],Du(r),r.repeat=0);const d={startTime:i?this.resolvedAt?this.resolvedAt-this.createdAt>KS?this.resolvedAt:this.createdAt:this.createdAt:void 0,finalKeyframe:n,...r,keyframes:t},h=!u&&WS(d)?new VS({...d,element:d.motionValue.owner.current}):new mf(d);h.finished.then(()=>this.notifyFinished()).catch(Et),this.pendingTimeline&&(this.stopTimeline=h.attachTimeline(this.pendingTimeline),this.pendingTimeline=void 0),this._animation=h}get finished(){return this._animation?this.animation.finished:this._finished}then(t,n){return this.finished.finally(t).then(()=>{})}get animation(){var t;return this._animation||((t=this.keyframeResolver)==null||t.resume(),IS()),this._animation}get duration(){return this.animation.duration}get iterationDuration(){return this.animation.iterationDuration}get time(){return this.animation.time}set time(t){this.animation.time=t}get speed(){return this.animation.speed}get state(){return this.animation.state}set speed(t){this.animation.speed=t}get startTime(){return this.animation.startTime}attachTimeline(t){return this._animation?this.stopTimeline=this.animation.attachTimeline(t):this.pendingTimeline=t,()=>this.stop()}play(){this.animation.play()}pause(){this.animation.pause()}complete(){this.animation.complete()}cancel(){var t;this._animation&&this.animation.cancel(),(t=this.keyframeResolver)==null||t.cancel()}}const YS=/^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;function qS(e){const t=YS.exec(e);if(!t)return[,];const[,n,r,i]=t;return[`--${n??r}`,i]}function M0(e,t,n=1){const[r,i]=qS(e);if(!r)return;const o=window.getComputedStyle(t).getPropertyValue(r);if(o){const s=o.trim();return e0(s)?parseFloat(s):s}return af(i)?M0(i,t,n+1):i}function yf(e,t){return(e==null?void 0:e[t])??(e==null?void 0:e.default)??e}const D0=new Set(["width","height","top","left","right","bottom",...ri]),XS={test:e=>e==="auto",parse:e=>e},L0=e=>t=>t.test(e),_0=[ni,$,$t,fn,Bk,Vk,XS],Th=e=>_0.find(L0(e));function QS(e){return typeof e=="number"?e===0:e!==null?e==="none"||e==="0"||n0(e):!0}const ZS=new Set(["brightness","contrast","saturate","opacity"]);function JS(e){const[t,n]=e.slice(0,-1).split("(");if(t==="drop-shadow")return e;const[r]=n.match(uf)||[];if(!r)return e;const i=n.replace(r,"");let o=ZS.has(t)?1:0;return r!==n&&(o*=100),t+"("+o+i+")"}const eC=/\b([a-z-]*)\(.*?\)/gu,Lu={...Rn,getAnimatableNone:e=>{const t=e.match(eC);return t?t.map(JS).join(" "):e}},bh={...ni,transform:Math.round},tC={rotate:fn,rotateX:fn,rotateY:fn,rotateZ:fn,scale:qo,scaleX:qo,scaleY:qo,scaleZ:qo,skew:fn,skewX:fn,skewY:fn,distance:$,translateX:$,translateY:$,translateZ:$,x:$,y:$,z:$,perspective:$,transformPerspective:$,opacity:ao,originX:hh,originY:hh,originZ:$},xf={borderWidth:$,borderTopWidth:$,borderRightWidth:$,borderBottomWidth:$,borderLeftWidth:$,borderRadius:$,radius:$,borderTopLeftRadius:$,borderTopRightRadius:$,borderBottomRightRadius:$,borderBottomLeftRadius:$,width:$,maxWidth:$,height:$,maxHeight:$,top:$,right:$,bottom:$,left:$,padding:$,paddingTop:$,paddingRight:$,paddingBottom:$,paddingLeft:$,margin:$,marginTop:$,marginRight:$,marginBottom:$,marginLeft:$,backgroundPositionX:$,backgroundPositionY:$,...tC,zIndex:bh,fillOpacity:ao,strokeOpacity:ao,numOctaves:bh},nC={...xf,color:Te,backgroundColor:Te,outlineColor:Te,fill:Te,stroke:Te,borderColor:Te,borderTopColor:Te,borderRightColor:Te,borderBottomColor:Te,borderLeftColor:Te,filter:Lu,WebkitFilter:Lu},O0=e=>nC[e];function F0(e,t){let n=O0(e);return n!==Lu&&(n=Rn),n.getAnimatableNone?n.getAnimatableNone(t):void 0}const rC=new Set(["auto","none","0"]);function iC(e,t,n){let r=0,i;for(;r<e.length&&!i;){const o=e[r];typeof o=="string"&&!rC.has(o)&&uo(o).values.length&&(i=e[r]),r++}if(i&&n)for(const o of t)e[o]=F0(n,i)}class oC extends gf{constructor(t,n,r,i,o){super(t,n,r,i,o,!0)}readKeyframes(){const{unresolvedKeyframes:t,element:n,name:r}=this;if(!n||!n.current)return;super.readKeyframes();for(let a=0;a<t.length;a++){let u=t[a];if(typeof u=="string"&&(u=u.trim(),af(u))){const c=M0(u,n.current);c!==void 0&&(t[a]=c),a===t.length-1&&(this.finalKeyframe=u)}}if(this.resolveNoneKeyframes(),!D0.has(r)||t.length!==2)return;const[i,o]=t,s=Th(i),l=Th(o);if(s!==l)if(kh(s)&&kh(l))for(let a=0;a<t.length;a++){const u=t[a];typeof u=="string"&&(t[a]=parseFloat(u))}else Zn[r]&&(this.needsMeasurement=!0)}resolveNoneKeyframes(){const{unresolvedKeyframes:t,name:n}=this,r=[];for(let i=0;i<t.length;i++)(t[i]===null||QS(t[i]))&&r.push(i);r.length&&iC(t,r,n)}measureInitialState(){const{element:t,unresolvedKeyframes:n,name:r}=this;if(!t||!t.current)return;r==="height"&&(this.suspendedScrollY=window.pageYOffset),this.measuredOrigin=Zn[r](t.measureViewportBox(),window.getComputedStyle(t.current)),n[0]=this.measuredOrigin;const i=n[n.length-1];i!==void 0&&t.getValue(r,i).jump(i,!1)}measureEndState(){var l;const{element:t,name:n,unresolvedKeyframes:r}=this;if(!t||!t.current)return;const i=t.getValue(n);i&&i.jump(this.measuredOrigin,!1);const o=r.length-1,s=r[o];r[o]=Zn[n](t.measureViewportBox(),window.getComputedStyle(t.current)),s!==null&&this.finalKeyframe===void 0&&(this.finalKeyframe=s),(l=this.removedTransforms)!=null&&l.length&&this.removedTransforms.forEach(([a,u])=>{t.getValue(a).set(u)}),this.resolveNoneKeyframes()}}function sC(e,t,n){if(e instanceof EventTarget)return[e];if(typeof e=="string"){let r=document;const i=(n==null?void 0:n[e])??r.querySelectorAll(e);return i?Array.from(i):[]}return Array.from(e)}const j0=(e,t)=>t&&typeof e=="number"?t.transform(e):e;function z0(e){return t0(e)&&"offsetHeight"in e}const Ah=30,lC=e=>!isNaN(parseFloat(e));class aC{constructor(t,n={}){this.canTrackVelocity=null,this.events={},this.updateAndNotify=r=>{var o;const i=nt.now();if(this.updatedAt!==i&&this.setPrevFrameValue(),this.prev=this.current,this.setCurrent(r),this.current!==this.prev&&((o=this.events.change)==null||o.notify(this.current),this.dependents))for(const s of this.dependents)s.dirty()},this.hasAnimated=!1,this.setCurrent(t),this.owner=n.owner}setCurrent(t){this.current=t,this.updatedAt=nt.now(),this.canTrackVelocity===null&&t!==void 0&&(this.canTrackVelocity=lC(this.current))}setPrevFrameValue(t=this.current){this.prevFrameValue=t,this.prevUpdatedAt=this.updatedAt}onChange(t){return this.on("change",t)}on(t,n){this.events[t]||(this.events[t]=new rf);const r=this.events[t].add(n);return t==="change"?()=>{r(),pe.read(()=>{this.events.change.getSize()||this.stop()})}:r}clearListeners(){for(const t in this.events)this.events[t].clear()}attach(t,n){this.passiveEffect=t,this.stopPassiveEffect=n}set(t){this.passiveEffect?this.passiveEffect(t,this.updateAndNotify):this.updateAndNotify(t)}setWithVelocity(t,n,r){this.set(n),this.prev=void 0,this.prevFrameValue=t,this.prevUpdatedAt=this.updatedAt-r}jump(t,n=!0){this.updateAndNotify(t),this.prev=t,this.prevUpdatedAt=this.prevFrameValue=void 0,n&&this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}dirty(){var t;(t=this.events.change)==null||t.notify(this.current)}addDependent(t){this.dependents||(this.dependents=new Set),this.dependents.add(t)}removeDependent(t){this.dependents&&this.dependents.delete(t)}get(){return this.current}getPrevious(){return this.prev}getVelocity(){const t=nt.now();if(!this.canTrackVelocity||this.prevFrameValue===void 0||t-this.updatedAt>Ah)return 0;const n=Math.min(this.updatedAt-this.prevUpdatedAt,Ah);return r0(parseFloat(this.current)-parseFloat(this.prevFrameValue),n)}start(t){return this.stop(),new Promise(n=>{this.hasAnimated=!0,this.animation=t(n),this.events.animationStart&&this.events.animationStart.notify()}).then(()=>{this.events.animationComplete&&this.events.animationComplete.notify(),this.clearAnimation()})}stop(){this.animation&&(this.animation.stop(),this.events.animationCancel&&this.events.animationCancel.notify()),this.clearAnimation()}isAnimating(){return!!this.animation}clearAnimation(){delete this.animation}destroy(){var t,n;(t=this.dependents)==null||t.clear(),(n=this.events.destroy)==null||n.notify(),this.clearListeners(),this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}}function qr(e,t){return new aC(e,t)}const{schedule:vf}=p0(queueMicrotask,!1),It={x:!1,y:!1};function V0(){return It.x||It.y}function uC(e){return e==="x"||e==="y"?It[e]?null:(It[e]=!0,()=>{It[e]=!1}):It.x||It.y?null:(It.x=It.y=!0,()=>{It.x=It.y=!1})}function B0(e,t){const n=sC(e),r=new AbortController,i={passive:!0,...t,signal:r.signal};return[n,i,()=>r.abort()]}function Ph(e){return!(e.pointerType==="touch"||V0())}function cC(e,t,n={}){const[r,i,o]=B0(e,n),s=l=>{if(!Ph(l))return;const{target:a}=l,u=t(a,l);if(typeof u!="function"||!a)return;const c=f=>{Ph(f)&&(u(f),a.removeEventListener("pointerleave",c))};a.addEventListener("pointerleave",c,i)};return r.forEach(l=>{l.addEventListener("pointerenter",s,i)}),o}const U0=(e,t)=>t?e===t?!0:U0(e,t.parentElement):!1,wf=e=>e.pointerType==="mouse"?typeof e.button!="number"||e.button<=0:e.isPrimary!==!1,fC=new Set(["BUTTON","INPUT","SELECT","TEXTAREA","A"]);function dC(e){return fC.has(e.tagName)||e.tabIndex!==-1}const ms=new WeakSet;function Ih(e){return t=>{t.key==="Enter"&&e(t)}}function ia(e,t){e.dispatchEvent(new PointerEvent("pointer"+t,{isPrimary:!0,bubbles:!0}))}const hC=(e,t)=>{const n=e.currentTarget;if(!n)return;const r=Ih(()=>{if(ms.has(n))return;ia(n,"down");const i=Ih(()=>{ia(n,"up")}),o=()=>ia(n,"cancel");n.addEventListener("keyup",i,t),n.addEventListener("blur",o,t)});n.addEventListener("keydown",r,t),n.addEventListener("blur",()=>n.removeEventListener("keydown",r),t)};function Nh(e){return wf(e)&&!V0()}function pC(e,t,n={}){const[r,i,o]=B0(e,n),s=l=>{const a=l.currentTarget;if(!Nh(l))return;ms.add(a);const u=t(a,l),c=(h,m)=>{window.removeEventListener("pointerup",f),window.removeEventListener("pointercancel",d),ms.has(a)&&ms.delete(a),Nh(h)&&typeof u=="function"&&u(h,{success:m})},f=h=>{c(h,a===window||a===document||n.useGlobalTarget||U0(a,h.target))},d=h=>{c(h,!1)};window.addEventListener("pointerup",f,i),window.addEventListener("pointercancel",d,i)};return r.forEach(l=>{(n.useGlobalTarget?window:l).addEventListener("pointerdown",s,i),z0(l)&&(l.addEventListener("focus",u=>hC(u,i)),!dC(l)&&!l.hasAttribute("tabindex")&&(l.tabIndex=0))}),o}function H0(e){return t0(e)&&"ownerSVGElement"in e}function mC(e){return H0(e)&&e.tagName==="svg"}const Ve=e=>!!(e&&e.getVelocity),gC=[..._0,Te,Rn],yC=e=>gC.find(L0(e)),kf=N.createContext({transformPagePoint:e=>e,isStatic:!1,reducedMotion:"never"});function Rh(e,t){if(typeof e=="function")return e(t);e!=null&&(e.current=t)}function xC(...e){return t=>{let n=!1;const r=e.map(i=>{const o=Rh(i,t);return!n&&typeof o=="function"&&(n=!0),o});if(n)return()=>{for(let i=0;i<r.length;i++){const o=r[i];typeof o=="function"?o():Rh(e[i],null)}}}}function vC(...e){return N.useCallback(xC(...e),e)}class wC extends N.Component{getSnapshotBeforeUpdate(t){const n=this.props.childRef.current;if(n&&t.isPresent&&!this.props.isPresent){const r=n.offsetParent,i=z0(r)&&r.offsetWidth||0,o=this.props.sizeRef.current;o.height=n.offsetHeight||0,o.width=n.offsetWidth||0,o.top=n.offsetTop,o.left=n.offsetLeft,o.right=i-o.width-o.left}return null}componentDidUpdate(){}render(){return this.props.children}}function kC({children:e,isPresent:t,anchorX:n,root:r}){const i=N.useId(),o=N.useRef(null),s=N.useRef({width:0,height:0,top:0,left:0,right:0}),{nonce:l}=N.useContext(kf),a=vC(o,e==null?void 0:e.ref);return N.useInsertionEffect(()=>{const{width:u,height:c,top:f,left:d,right:h}=s.current;if(t||!o.current||!u||!c)return;const m=n==="left"?`left: ${d}`:`right: ${h}`;o.current.dataset.motionPopId=i;const x=document.createElement("style");l&&(x.nonce=l);const E=r??document.head;return E.appendChild(x),x.sheet&&x.sheet.insertRule(`
          [data-motion-pop-id="${i}"] {
            position: absolute !important;
            width: ${u}px !important;
            height: ${c}px !important;
            ${m}px !important;
            top: ${f}px !important;
          }
        `),()=>{E.contains(x)&&E.removeChild(x)}},[t]),w.jsx(wC,{isPresent:t,childRef:o,sizeRef:s,children:N.cloneElement(e,{ref:a})})}const SC=({children:e,initial:t,isPresent:n,onExitComplete:r,custom:i,presenceAffectsLayout:o,mode:s,anchorX:l,root:a})=>{const u=Qc(CC),c=N.useId();let f=!0,d=N.useMemo(()=>(f=!1,{id:c,initial:t,isPresent:n,custom:i,onExitComplete:h=>{u.set(h,!0);for(const m of u.values())if(!m)return;r&&r()},register:h=>(u.set(h,!1),()=>u.delete(h))}),[n,u,r]);return o&&f&&(d={...d}),N.useMemo(()=>{u.forEach((h,m)=>u.set(m,!1))},[n]),N.useEffect(()=>{!n&&!u.size&&r&&r()},[n]),s==="popLayout"&&(e=w.jsx(kC,{isPresent:n,anchorX:l,root:a,children:e})),w.jsx(yl.Provider,{value:d,children:e})};function CC(){return new Map}function $0(e=!0){const t=N.useContext(yl);if(t===null)return[!0,null];const{isPresent:n,onExitComplete:r,register:i}=t,o=N.useId();N.useEffect(()=>{if(e)return i(o)},[e]);const s=N.useCallback(()=>e&&r&&r(o),[o,r,e]);return!n&&r?[!1,s]:[!0]}const Xo=e=>e.key||"";function Mh(e){const t=[];return N.Children.forEach(e,n=>{N.isValidElement(n)&&t.push(n)}),t}const Xr=({children:e,custom:t,initial:n=!0,onExitComplete:r,presenceAffectsLayout:i=!0,mode:o="sync",propagate:s=!1,anchorX:l="left",root:a})=>{const[u,c]=$0(s),f=N.useMemo(()=>Mh(e),[e]),d=s&&!u?[]:f.map(Xo),h=N.useRef(!0),m=N.useRef(f),x=Qc(()=>new Map),[E,p]=N.useState(f),[g,y]=N.useState(f);Jy(()=>{h.current=!1,m.current=f;for(let k=0;k<g.length;k++){const A=Xo(g[k]);d.includes(A)?x.delete(A):x.get(A)!==!0&&x.set(A,!1)}},[g,d.length,d.join("-")]);const T=[];if(f!==E){let k=[...f];for(let A=0;A<g.length;A++){const P=g[A],O=Xo(P);d.includes(O)||(k.splice(A,0,P),T.push(P))}return o==="wait"&&T.length&&(k=T),y(Mh(k)),p(f),null}const{forceRender:b}=N.useContext(Xc);return w.jsx(w.Fragment,{children:g.map(k=>{const A=Xo(k),P=s&&!u?!1:f===g||d.includes(A),O=()=>{if(x.has(A))x.set(A,!0);else return;let C=!0;x.forEach(L=>{L||(C=!1)}),C&&(b==null||b(),y(m.current),s&&(c==null||c()),r&&r())};return w.jsx(SC,{isPresent:P,initial:!h.current||n?void 0:!1,custom:t,presenceAffectsLayout:i,mode:o,root:a,onExitComplete:P?void 0:O,anchorX:l,children:k},A)})})},W0=N.createContext({strict:!1}),Dh={animation:["animate","variants","whileHover","whileTap","exit","whileInView","whileFocus","whileDrag"],exit:["exit"],drag:["drag","dragControls"],focus:["whileFocus"],hover:["whileHover","onHoverStart","onHoverEnd"],tap:["whileTap","onTap","onTapStart","onTapCancel"],pan:["onPan","onPanStart","onPanSessionStart","onPanEnd"],inView:["whileInView","onViewportEnter","onViewportLeave"],layout:["layout","layoutId"]},Qr={};for(const e in Dh)Qr[e]={isEnabled:t=>Dh[e].some(n=>!!t[n])};function EC(e){for(const t in e)Qr[t]={...Qr[t],...e[t]}}const TC=new Set(["animate","exit","variants","initial","style","values","variants","transition","transformTemplate","custom","inherit","onBeforeLayoutMeasure","onAnimationStart","onAnimationComplete","onUpdate","onDragStart","onDrag","onDragEnd","onMeasureDragConstraints","onDirectionLock","onDragTransitionEnd","_dragX","_dragY","onHoverStart","onHoverEnd","onViewportEnter","onViewportLeave","globalTapTarget","ignoreStrict","viewport"]);function qs(e){return e.startsWith("while")||e.startsWith("drag")&&e!=="draggable"||e.startsWith("layout")||e.startsWith("onTap")||e.startsWith("onPan")||e.startsWith("onLayout")||TC.has(e)}let K0=e=>!qs(e);function bC(e){typeof e=="function"&&(K0=t=>t.startsWith("on")?!qs(t):e(t))}try{bC(require("@emotion/is-prop-valid").default)}catch{}function AC(e,t,n){const r={};for(const i in e)i==="values"&&typeof e.values=="object"||(K0(i)||n===!0&&qs(i)||!t&&!qs(i)||e.draggable&&i.startsWith("onDrag"))&&(r[i]=e[i]);return r}const xl=N.createContext({});function vl(e){return e!==null&&typeof e=="object"&&typeof e.start=="function"}function co(e){return typeof e=="string"||Array.isArray(e)}const Sf=["animate","whileInView","whileFocus","whileHover","whileTap","whileDrag","exit"],Cf=["initial",...Sf];function wl(e){return vl(e.animate)||Cf.some(t=>co(e[t]))}function G0(e){return!!(wl(e)||e.variants)}function PC(e,t){if(wl(e)){const{initial:n,animate:r}=e;return{initial:n===!1||co(n)?n:void 0,animate:co(r)?r:void 0}}return e.inherit!==!1?t:{}}function IC(e){const{initial:t,animate:n}=PC(e,N.useContext(xl));return N.useMemo(()=>({initial:t,animate:n}),[Lh(t),Lh(n)])}function Lh(e){return Array.isArray(e)?e.join(" "):e}const fo={};function NC(e){for(const t in e)fo[t]=e[t],lf(t)&&(fo[t].isCSSVariable=!0)}function Y0(e,{layout:t,layoutId:n}){return ii.has(e)||e.startsWith("origin")||(t||n!==void 0)&&(!!fo[e]||e==="opacity")}const RC={x:"translateX",y:"translateY",z:"translateZ",transformPerspective:"perspective"},MC=ri.length;function DC(e,t,n){let r="",i=!0;for(let o=0;o<MC;o++){const s=ri[o],l=e[s];if(l===void 0)continue;let a=!0;if(typeof l=="number"?a=l===(s.startsWith("scale")?1:0):a=parseFloat(l)===0,!a||n){const u=j0(l,xf[s]);if(!a){i=!1;const c=RC[s]||s;r+=`${c}(${u}) `}n&&(t[s]=u)}}return r=r.trim(),n?r=n(t,i?"":r):i&&(r="none"),r}function Ef(e,t,n){const{style:r,vars:i,transformOrigin:o}=e;let s=!1,l=!1;for(const a in t){const u=t[a];if(ii.has(a)){s=!0;continue}else if(lf(a)){i[a]=u;continue}else{const c=j0(u,xf[a]);a.startsWith("origin")?(l=!0,o[a]=c):r[a]=c}}if(t.transform||(s||n?r.transform=DC(t,e.transform,n):r.transform&&(r.transform="none")),l){const{originX:a="50%",originY:u="50%",originZ:c=0}=o;r.transformOrigin=`${a} ${u} ${c}`}}const Tf=()=>({style:{},transform:{},transformOrigin:{},vars:{}});function q0(e,t,n){for(const r in t)!Ve(t[r])&&!Y0(r,n)&&(e[r]=t[r])}function LC({transformTemplate:e},t){return N.useMemo(()=>{const n=Tf();return Ef(n,t,e),Object.assign({},n.vars,n.style)},[t])}function _C(e,t){const n=e.style||{},r={};return q0(r,n,e),Object.assign(r,LC(e,t)),r}function OC(e,t){const n={},r=_C(e,t);return e.drag&&e.dragListener!==!1&&(n.draggable=!1,r.userSelect=r.WebkitUserSelect=r.WebkitTouchCallout="none",r.touchAction=e.drag===!0?"none":`pan-${e.drag==="x"?"y":"x"}`),e.tabIndex===void 0&&(e.onTap||e.onTapStart||e.whileTap)&&(n.tabIndex=0),n.style=r,n}const FC={offset:"stroke-dashoffset",array:"stroke-dasharray"},jC={offset:"strokeDashoffset",array:"strokeDasharray"};function zC(e,t,n=1,r=0,i=!0){e.pathLength=1;const o=i?FC:jC;e[o.offset]=$.transform(-r);const s=$.transform(t),l=$.transform(n);e[o.array]=`${s} ${l}`}function X0(e,{attrX:t,attrY:n,attrScale:r,pathLength:i,pathSpacing:o=1,pathOffset:s=0,...l},a,u,c){if(Ef(e,l,u),a){e.style.viewBox&&(e.attrs.viewBox=e.style.viewBox);return}e.attrs=e.style,e.style={};const{attrs:f,style:d}=e;f.transform&&(d.transform=f.transform,delete f.transform),(d.transform||f.transformOrigin)&&(d.transformOrigin=f.transformOrigin??"50% 50%",delete f.transformOrigin),d.transform&&(d.transformBox=(c==null?void 0:c.transformBox)??"fill-box",delete f.transformBox),t!==void 0&&(f.x=t),n!==void 0&&(f.y=n),r!==void 0&&(f.scale=r),i!==void 0&&zC(f,i,o,s,!1)}const Q0=()=>({...Tf(),attrs:{}}),Z0=e=>typeof e=="string"&&e.toLowerCase()==="svg";function VC(e,t,n,r){const i=N.useMemo(()=>{const o=Q0();return X0(o,t,Z0(r),e.transformTemplate,e.style),{...o.attrs,style:{...o.style}}},[t]);if(e.style){const o={};q0(o,e.style,e),i.style={...o,...i.style}}return i}const BC=["animate","circle","defs","desc","ellipse","g","image","line","filter","marker","mask","metadata","path","pattern","polygon","polyline","rect","stop","switch","symbol","svg","text","tspan","use","view"];function bf(e){return typeof e!="string"||e.includes("-")?!1:!!(BC.indexOf(e)>-1||/[A-Z]/u.test(e))}function UC(e,t,n,{latestValues:r},i,o=!1){const l=(bf(e)?VC:OC)(t,r,i,e),a=AC(t,typeof e=="string",o),u=e!==N.Fragment?{...a,...l,ref:n}:{},{children:c}=t,f=N.useMemo(()=>Ve(c)?c.get():c,[c]);return N.createElement(e,{...u,children:f})}function _h(e){const t=[{},{}];return e==null||e.values.forEach((n,r)=>{t[0][r]=n.get(),t[1][r]=n.getVelocity()}),t}function Af(e,t,n,r){if(typeof t=="function"){const[i,o]=_h(r);t=t(n!==void 0?n:e.custom,i,o)}if(typeof t=="string"&&(t=e.variants&&e.variants[t]),typeof t=="function"){const[i,o]=_h(r);t=t(n!==void 0?n:e.custom,i,o)}return t}function gs(e){return Ve(e)?e.get():e}function HC({scrapeMotionValuesFromProps:e,createRenderState:t},n,r,i){return{latestValues:$C(n,r,i,e),renderState:t()}}function $C(e,t,n,r){const i={},o=r(e,{});for(const d in o)i[d]=gs(o[d]);let{initial:s,animate:l}=e;const a=wl(e),u=G0(e);t&&u&&!a&&e.inherit!==!1&&(s===void 0&&(s=t.initial),l===void 0&&(l=t.animate));let c=n?n.initial===!1:!1;c=c||s===!1;const f=c?l:s;if(f&&typeof f!="boolean"&&!vl(f)){const d=Array.isArray(f)?f:[f];for(let h=0;h<d.length;h++){const m=Af(e,d[h]);if(m){const{transitionEnd:x,transition:E,...p}=m;for(const g in p){let y=p[g];if(Array.isArray(y)){const T=c?y.length-1:0;y=y[T]}y!==null&&(i[g]=y)}for(const g in x)i[g]=x[g]}}}return i}const J0=e=>(t,n)=>{const r=N.useContext(xl),i=N.useContext(yl),o=()=>HC(e,t,r,i);return n?o():Qc(o)};function Pf(e,t,n){var o;const{style:r}=e,i={};for(const s in r)(Ve(r[s])||t.style&&Ve(t.style[s])||Y0(s,e)||((o=n==null?void 0:n.getValue(s))==null?void 0:o.liveStyle)!==void 0)&&(i[s]=r[s]);return i}const WC=J0({scrapeMotionValuesFromProps:Pf,createRenderState:Tf});function ex(e,t,n){const r=Pf(e,t,n);for(const i in e)if(Ve(e[i])||Ve(t[i])){const o=ri.indexOf(i)!==-1?"attr"+i.charAt(0).toUpperCase()+i.substring(1):i;r[o]=e[i]}return r}const KC=J0({scrapeMotionValuesFromProps:ex,createRenderState:Q0}),GC=Symbol.for("motionComponentSymbol");function Nr(e){return e&&typeof e=="object"&&Object.prototype.hasOwnProperty.call(e,"current")}function YC(e,t,n){return N.useCallback(r=>{r&&e.onMount&&e.onMount(r),t&&(r?t.mount(r):t.unmount()),n&&(typeof n=="function"?n(r):Nr(n)&&(n.current=r))},[t])}const If=e=>e.replace(/([a-z])([A-Z])/gu,"$1-$2").toLowerCase(),qC="framerAppearId",tx="data-"+If(qC),nx=N.createContext({});function XC(e,t,n,r,i){var x,E;const{visualElement:o}=N.useContext(xl),s=N.useContext(W0),l=N.useContext(yl),a=N.useContext(kf).reducedMotion,u=N.useRef(null);r=r||s.renderer,!u.current&&r&&(u.current=r(e,{visualState:t,parent:o,props:n,presenceContext:l,blockInitialAnimation:l?l.initial===!1:!1,reducedMotionConfig:a}));const c=u.current,f=N.useContext(nx);c&&!c.projection&&i&&(c.type==="html"||c.type==="svg")&&QC(u.current,n,i,f);const d=N.useRef(!1);N.useInsertionEffect(()=>{c&&d.current&&c.update(n,l)});const h=n[tx],m=N.useRef(!!h&&!((x=window.MotionHandoffIsComplete)!=null&&x.call(window,h))&&((E=window.MotionHasOptimisedAnimation)==null?void 0:E.call(window,h)));return Jy(()=>{c&&(d.current=!0,window.MotionIsMounted=!0,c.updateFeatures(),c.scheduleRenderMicrotask(),m.current&&c.animationState&&c.animationState.animateChanges())}),N.useEffect(()=>{c&&(!m.current&&c.animationState&&c.animationState.animateChanges(),m.current&&(queueMicrotask(()=>{var p;(p=window.MotionHandoffMarkAsComplete)==null||p.call(window,h)}),m.current=!1),c.enteringChildren=void 0)}),c}function QC(e,t,n,r){const{layoutId:i,layout:o,drag:s,dragConstraints:l,layoutScroll:a,layoutRoot:u,layoutCrossfade:c}=t;e.projection=new n(e.latestValues,t["data-framer-portal-id"]?void 0:rx(e.parent)),e.projection.setOptions({layoutId:i,layout:o,alwaysMeasureLayout:!!s||l&&Nr(l),visualElement:e,animationType:typeof o=="string"?o:"both",initialPromotionConfig:r,crossfade:c,layoutScroll:a,layoutRoot:u})}function rx(e){if(e)return e.options.allowProjection!==!1?e.projection:rx(e.parent)}function oa(e,{forwardMotionProps:t=!1}={},n,r){n&&EC(n);const i=bf(e)?KC:WC;function o(l,a){let u;const c={...N.useContext(kf),...l,layoutId:ZC(l)},{isStatic:f}=c,d=IC(l),h=i(l,f);if(!f&&Zc){JC();const m=e2(c);u=m.MeasureLayout,d.visualElement=XC(e,h,c,r,m.ProjectionNode)}return w.jsxs(xl.Provider,{value:d,children:[u&&d.visualElement?w.jsx(u,{visualElement:d.visualElement,...c}):null,UC(e,l,YC(h,d.visualElement,a),h,f,t)]})}o.displayName=`motion.${typeof e=="string"?e:`create(${e.displayName??e.name??""})`}`;const s=N.forwardRef(o);return s[GC]=e,s}function ZC({layoutId:e}){const t=N.useContext(Xc).id;return t&&e!==void 0?t+"-"+e:e}function JC(e,t){N.useContext(W0).strict}function e2(e){const{drag:t,layout:n}=Qr;if(!t&&!n)return{};const r={...t,...n};return{MeasureLayout:t!=null&&t.isEnabled(e)||n!=null&&n.isEnabled(e)?r.MeasureLayout:void 0,ProjectionNode:r.ProjectionNode}}function t2(e,t){if(typeof Proxy>"u")return oa;const n=new Map,r=(o,s)=>oa(o,s,e,t),i=(o,s)=>r(o,s);return new Proxy(i,{get:(o,s)=>s==="create"?r:(n.has(s)||n.set(s,oa(s,void 0,e,t)),n.get(s))})}function ix({top:e,left:t,right:n,bottom:r}){return{x:{min:t,max:n},y:{min:e,max:r}}}function n2({x:e,y:t}){return{top:t.min,right:e.max,bottom:t.max,left:e.min}}function r2(e,t){if(!t)return e;const n=t({x:e.left,y:e.top}),r=t({x:e.right,y:e.bottom});return{top:n.y,left:n.x,bottom:r.y,right:r.x}}function sa(e){return e===void 0||e===1}function _u({scale:e,scaleX:t,scaleY:n}){return!sa(e)||!sa(t)||!sa(n)}function Un(e){return _u(e)||ox(e)||e.z||e.rotate||e.rotateX||e.rotateY||e.skewX||e.skewY}function ox(e){return Oh(e.x)||Oh(e.y)}function Oh(e){return e&&e!=="0%"}function Xs(e,t,n){const r=e-n,i=t*r;return n+i}function Fh(e,t,n,r,i){return i!==void 0&&(e=Xs(e,i,r)),Xs(e,n,r)+t}function Ou(e,t=0,n=1,r,i){e.min=Fh(e.min,t,n,r,i),e.max=Fh(e.max,t,n,r,i)}function sx(e,{x:t,y:n}){Ou(e.x,t.translate,t.scale,t.originPoint),Ou(e.y,n.translate,n.scale,n.originPoint)}const jh=.999999999999,zh=1.0000000000001;function i2(e,t,n,r=!1){const i=n.length;if(!i)return;t.x=t.y=1;let o,s;for(let l=0;l<i;l++){o=n[l],s=o.projectionDelta;const{visualElement:a}=o.options;a&&a.props.style&&a.props.style.display==="contents"||(r&&o.options.layoutScroll&&o.scroll&&o!==o.root&&Mr(e,{x:-o.scroll.offset.x,y:-o.scroll.offset.y}),s&&(t.x*=s.x.scale,t.y*=s.y.scale,sx(e,s)),r&&Un(o.latestValues)&&Mr(e,o.latestValues))}t.x<zh&&t.x>jh&&(t.x=1),t.y<zh&&t.y>jh&&(t.y=1)}function Rr(e,t){e.min=e.min+t,e.max=e.max+t}function Vh(e,t,n,r,i=.5){const o=ye(e.min,e.max,i);Ou(e,t,n,o,r)}function Mr(e,t){Vh(e.x,t.x,t.scaleX,t.scale,t.originX),Vh(e.y,t.y,t.scaleY,t.scale,t.originY)}function lx(e,t){return ix(r2(e.getBoundingClientRect(),t))}function o2(e,t,n){const r=lx(e,n),{scroll:i}=t;return i&&(Rr(r.x,i.offset.x),Rr(r.y,i.offset.y)),r}const Bh=()=>({translate:0,scale:1,origin:0,originPoint:0}),Dr=()=>({x:Bh(),y:Bh()}),Uh=()=>({min:0,max:0}),Se=()=>({x:Uh(),y:Uh()}),Fu={current:null},ax={current:!1};function s2(){if(ax.current=!0,!!Zc)if(window.matchMedia){const e=window.matchMedia("(prefers-reduced-motion)"),t=()=>Fu.current=e.matches;e.addEventListener("change",t),t()}else Fu.current=!1}const l2=new WeakMap;function a2(e,t,n){for(const r in t){const i=t[r],o=n[r];if(Ve(i))e.addValue(r,i);else if(Ve(o))e.addValue(r,qr(i,{owner:e}));else if(o!==i)if(e.hasValue(r)){const s=e.getValue(r);s.liveStyle===!0?s.jump(i):s.hasAnimated||s.set(i)}else{const s=e.getStaticValue(r);e.addValue(r,qr(s!==void 0?s:i,{owner:e}))}}for(const r in n)t[r]===void 0&&e.removeValue(r);return t}const Hh=["AnimationStart","AnimationComplete","Update","BeforeLayoutMeasure","LayoutMeasure","LayoutAnimationStart","LayoutAnimationComplete"];class u2{scrapeMotionValuesFromProps(t,n,r){return{}}constructor({parent:t,props:n,presenceContext:r,reducedMotionConfig:i,blockInitialAnimation:o,visualState:s},l={}){this.current=null,this.children=new Set,this.isVariantNode=!1,this.isControllingVariants=!1,this.shouldReduceMotion=null,this.values=new Map,this.KeyframeResolver=gf,this.features={},this.valueSubscriptions=new Map,this.prevMotionValues={},this.events={},this.propEventSubscriptions={},this.notifyUpdate=()=>this.notify("Update",this.latestValues),this.render=()=>{this.current&&(this.triggerBuild(),this.renderInstance(this.current,this.renderState,this.props.style,this.projection))},this.renderScheduledAt=0,this.scheduleRender=()=>{const d=nt.now();this.renderScheduledAt<d&&(this.renderScheduledAt=d,pe.render(this.render,!1,!0))};const{latestValues:a,renderState:u}=s;this.latestValues=a,this.baseTarget={...a},this.initialValues=n.initial?{...a}:{},this.renderState=u,this.parent=t,this.props=n,this.presenceContext=r,this.depth=t?t.depth+1:0,this.reducedMotionConfig=i,this.options=l,this.blockInitialAnimation=!!o,this.isControllingVariants=wl(n),this.isVariantNode=G0(n),this.isVariantNode&&(this.variantChildren=new Set),this.manuallyAnimateOnMount=!!(t&&t.current);const{willChange:c,...f}=this.scrapeMotionValuesFromProps(n,{},this);for(const d in f){const h=f[d];a[d]!==void 0&&Ve(h)&&h.set(a[d])}}mount(t){var n;this.current=t,l2.set(t,this),this.projection&&!this.projection.instance&&this.projection.mount(t),this.parent&&this.isVariantNode&&!this.isControllingVariants&&(this.removeFromVariantTree=this.parent.addVariantChild(this)),this.values.forEach((r,i)=>this.bindToMotionValue(i,r)),ax.current||s2(),this.shouldReduceMotion=this.reducedMotionConfig==="never"?!1:this.reducedMotionConfig==="always"?!0:Fu.current,(n=this.parent)==null||n.addChild(this),this.update(this.props,this.presenceContext)}unmount(){var t;this.projection&&this.projection.unmount(),Nn(this.notifyUpdate),Nn(this.render),this.valueSubscriptions.forEach(n=>n()),this.valueSubscriptions.clear(),this.removeFromVariantTree&&this.removeFromVariantTree(),(t=this.parent)==null||t.removeChild(this);for(const n in this.events)this.events[n].clear();for(const n in this.features){const r=this.features[n];r&&(r.unmount(),r.isMounted=!1)}this.current=null}addChild(t){this.children.add(t),this.enteringChildren??(this.enteringChildren=new Set),this.enteringChildren.add(t)}removeChild(t){this.children.delete(t),this.enteringChildren&&this.enteringChildren.delete(t)}bindToMotionValue(t,n){this.valueSubscriptions.has(t)&&this.valueSubscriptions.get(t)();const r=ii.has(t);r&&this.onBindTransform&&this.onBindTransform();const i=n.on("change",s=>{this.latestValues[t]=s,this.props.onUpdate&&pe.preRender(this.notifyUpdate),r&&this.projection&&(this.projection.isTransformDirty=!0),this.scheduleRender()});let o;window.MotionCheckAppearSync&&(o=window.MotionCheckAppearSync(this,t,n)),this.valueSubscriptions.set(t,()=>{i(),o&&o(),n.owner&&n.stop()})}sortNodePosition(t){return!this.current||!this.sortInstanceNodePosition||this.type!==t.type?0:this.sortInstanceNodePosition(this.current,t.current)}updateFeatures(){let t="animation";for(t in Qr){const n=Qr[t];if(!n)continue;const{isEnabled:r,Feature:i}=n;if(!this.features[t]&&i&&r(this.props)&&(this.features[t]=new i(this)),this.features[t]){const o=this.features[t];o.isMounted?o.update():(o.mount(),o.isMounted=!0)}}}triggerBuild(){this.build(this.renderState,this.latestValues,this.props)}measureViewportBox(){return this.current?this.measureInstanceViewportBox(this.current,this.props):Se()}getStaticValue(t){return this.latestValues[t]}setStaticValue(t,n){this.latestValues[t]=n}update(t,n){(t.transformTemplate||this.props.transformTemplate)&&this.scheduleRender(),this.prevProps=this.props,this.props=t,this.prevPresenceContext=this.presenceContext,this.presenceContext=n;for(let r=0;r<Hh.length;r++){const i=Hh[r];this.propEventSubscriptions[i]&&(this.propEventSubscriptions[i](),delete this.propEventSubscriptions[i]);const o="on"+i,s=t[o];s&&(this.propEventSubscriptions[i]=this.on(i,s))}this.prevMotionValues=a2(this,this.scrapeMotionValuesFromProps(t,this.prevProps,this),this.prevMotionValues),this.handleChildMotionValue&&this.handleChildMotionValue()}getProps(){return this.props}getVariant(t){return this.props.variants?this.props.variants[t]:void 0}getDefaultTransition(){return this.props.transition}getTransformPagePoint(){return this.props.transformPagePoint}getClosestVariantNode(){return this.isVariantNode?this:this.parent?this.parent.getClosestVariantNode():void 0}addVariantChild(t){const n=this.getClosestVariantNode();if(n)return n.variantChildren&&n.variantChildren.add(t),()=>n.variantChildren.delete(t)}addValue(t,n){const r=this.values.get(t);n!==r&&(r&&this.removeValue(t),this.bindToMotionValue(t,n),this.values.set(t,n),this.latestValues[t]=n.get())}removeValue(t){this.values.delete(t);const n=this.valueSubscriptions.get(t);n&&(n(),this.valueSubscriptions.delete(t)),delete this.latestValues[t],this.removeValueFromRenderState(t,this.renderState)}hasValue(t){return this.values.has(t)}getValue(t,n){if(this.props.values&&this.props.values[t])return this.props.values[t];let r=this.values.get(t);return r===void 0&&n!==void 0&&(r=qr(n===null?void 0:n,{owner:this}),this.addValue(t,r)),r}readValue(t,n){let r=this.latestValues[t]!==void 0||!this.current?this.latestValues[t]:this.getBaseTargetFromProps(this.props,t)??this.readValueFromInstance(this.current,t,this.options);return r!=null&&(typeof r=="string"&&(e0(r)||n0(r))?r=parseFloat(r):!yC(r)&&Rn.test(n)&&(r=F0(t,n)),this.setBaseTarget(t,Ve(r)?r.get():r)),Ve(r)?r.get():r}setBaseTarget(t,n){this.baseTarget[t]=n}getBaseTarget(t){var o;const{initial:n}=this.props;let r;if(typeof n=="string"||typeof n=="object"){const s=Af(this.props,n,(o=this.presenceContext)==null?void 0:o.custom);s&&(r=s[t])}if(n&&r!==void 0)return r;const i=this.getBaseTargetFromProps(this.props,t);return i!==void 0&&!Ve(i)?i:this.initialValues[t]!==void 0&&r===void 0?void 0:this.baseTarget[t]}on(t,n){return this.events[t]||(this.events[t]=new rf),this.events[t].add(n)}notify(t,...n){this.events[t]&&this.events[t].notify(...n)}scheduleRenderMicrotask(){vf.render(this.render)}}class ux extends u2{constructor(){super(...arguments),this.KeyframeResolver=oC}sortInstanceNodePosition(t,n){return t.compareDocumentPosition(n)&2?1:-1}getBaseTargetFromProps(t,n){return t.style?t.style[n]:void 0}removeValueFromRenderState(t,{vars:n,style:r}){delete n[t],delete r[t]}handleChildMotionValue(){this.childSubscription&&(this.childSubscription(),delete this.childSubscription);const{children:t}=this.props;Ve(t)&&(this.childSubscription=t.on("change",n=>{this.current&&(this.current.textContent=`${n}`)}))}}function cx(e,{style:t,vars:n},r,i){const o=e.style;let s;for(s in t)o[s]=t[s];i==null||i.applyProjectionStyles(o,r);for(s in n)o.setProperty(s,n[s])}function c2(e){return window.getComputedStyle(e)}class f2 extends ux{constructor(){super(...arguments),this.type="html",this.renderInstance=cx}readValueFromInstance(t,n){var r;if(ii.has(n))return(r=this.projection)!=null&&r.isProjecting?Pu(n):ES(t,n);{const i=c2(t),o=(lf(n)?i.getPropertyValue(n):i[n])||0;return typeof o=="string"?o.trim():o}}measureInstanceViewportBox(t,{transformPagePoint:n}){return lx(t,n)}build(t,n,r){Ef(t,n,r.transformTemplate)}scrapeMotionValuesFromProps(t,n,r){return Pf(t,n,r)}}const fx=new Set(["baseFrequency","diffuseConstant","kernelMatrix","kernelUnitLength","keySplines","keyTimes","limitingConeAngle","markerHeight","markerWidth","numOctaves","targetX","targetY","surfaceScale","specularConstant","specularExponent","stdDeviation","tableValues","viewBox","gradientTransform","pathLength","startOffset","textLength","lengthAdjust"]);function d2(e,t,n,r){cx(e,t,void 0,r);for(const i in t.attrs)e.setAttribute(fx.has(i)?i:If(i),t.attrs[i])}class h2 extends ux{constructor(){super(...arguments),this.type="svg",this.isSVGTag=!1,this.measureInstanceViewportBox=Se}getBaseTargetFromProps(t,n){return t[n]}readValueFromInstance(t,n){if(ii.has(n)){const r=O0(n);return r&&r.default||0}return n=fx.has(n)?n:If(n),t.getAttribute(n)}scrapeMotionValuesFromProps(t,n,r){return ex(t,n,r)}build(t,n,r){X0(t,n,this.isSVGTag,r.transformTemplate,r.style)}renderInstance(t,n,r,i){d2(t,n,r,i)}mount(t){this.isSVGTag=Z0(t.tagName),super.mount(t)}}const p2=(e,t)=>bf(e)?new h2(t):new f2(t,{allowProjection:e!==N.Fragment});function Vr(e,t,n){const r=e.getProps();return Af(r,t,n!==void 0?n:r.custom,e)}const ju=e=>Array.isArray(e);function m2(e,t,n){e.hasValue(t)?e.getValue(t).set(n):e.addValue(t,qr(n))}function g2(e){return ju(e)?e[e.length-1]||0:e}function y2(e,t){const n=Vr(e,t);let{transitionEnd:r={},transition:i={},...o}=n||{};o={...o,...r};for(const s in o){const l=g2(o[s]);m2(e,s,l)}}function x2(e){return!!(Ve(e)&&e.add)}function zu(e,t){const n=e.getValue("willChange");if(x2(n))return n.add(t);if(!n&&sn.WillChange){const r=new sn.WillChange("auto");e.addValue("willChange",r),r.add(t)}}function dx(e){return e.props[tx]}const v2=e=>e!==null;function w2(e,{repeat:t,repeatType:n="loop"},r){const i=e.filter(v2),o=t&&n!=="loop"&&t%2===1?0:i.length-1;return i[o]}const k2={type:"spring",stiffness:500,damping:25,restSpeed:10},S2=e=>({type:"spring",stiffness:550,damping:e===0?2*Math.sqrt(550):30,restSpeed:10}),C2={type:"keyframes",duration:.8},E2={type:"keyframes",ease:[.25,.1,.35,1],duration:.3},T2=(e,{keyframes:t})=>t.length>2?C2:ii.has(e)?e.startsWith("scale")?S2(t[1]):k2:E2;function b2({when:e,delay:t,delayChildren:n,staggerChildren:r,staggerDirection:i,repeat:o,repeatType:s,repeatDelay:l,from:a,elapsed:u,...c}){return!!Object.keys(c).length}const Nf=(e,t,n,r={},i,o)=>s=>{const l=yf(r,e)||{},a=l.delay||r.delay||0;let{elapsed:u=0}=r;u=u-Ht(a);const c={keyframes:Array.isArray(n)?n:[null,n],ease:"easeOut",velocity:t.getVelocity(),...l,delay:-u,onUpdate:d=>{t.set(d),l.onUpdate&&l.onUpdate(d)},onComplete:()=>{s(),l.onComplete&&l.onComplete()},name:e,motionValue:t,element:o?void 0:i};b2(l)||Object.assign(c,T2(e,c)),c.duration&&(c.duration=Ht(c.duration)),c.repeatDelay&&(c.repeatDelay=Ht(c.repeatDelay)),c.from!==void 0&&(c.keyframes[0]=c.from);let f=!1;if((c.type===!1||c.duration===0&&!c.repeatDelay)&&(Du(c),c.delay===0&&(f=!0)),(sn.instantAnimations||sn.skipAnimations)&&(f=!0,Du(c),c.delay=0),c.allowFlatten=!l.type&&!l.ease,f&&!o&&t.get()!==void 0){const d=w2(c.keyframes,l);if(d!==void 0){pe.update(()=>{c.onUpdate(d),c.onComplete()});return}}return l.isSync?new mf(c):new GS(c)};function A2({protectedKeys:e,needsAnimating:t},n){const r=e.hasOwnProperty(n)&&t[n]!==!0;return t[n]=!1,r}function hx(e,t,{delay:n=0,transitionOverride:r,type:i}={}){let{transition:o=e.getDefaultTransition(),transitionEnd:s,...l}=t;r&&(o=r);const a=[],u=i&&e.animationState&&e.animationState.getState()[i];for(const c in l){const f=e.getValue(c,e.latestValues[c]??null),d=l[c];if(d===void 0||u&&A2(u,c))continue;const h={delay:n,...yf(o||{},c)},m=f.get();if(m!==void 0&&!f.isAnimating&&!Array.isArray(d)&&d===m&&!h.velocity)continue;let x=!1;if(window.MotionHandoffAnimation){const p=dx(e);if(p){const g=window.MotionHandoffAnimation(p,c,pe);g!==null&&(h.startTime=g,x=!0)}}zu(e,c),f.start(Nf(c,f,d,e.shouldReduceMotion&&D0.has(c)?{type:!1}:h,e,x));const E=f.animation;E&&a.push(E)}return s&&Promise.all(a).then(()=>{pe.update(()=>{s&&y2(e,s)})}),a}function px(e,t,n,r=0,i=1){const o=Array.from(e).sort((u,c)=>u.sortNodePosition(c)).indexOf(t),s=e.size,l=(s-1)*r;return typeof n=="function"?n(o,s):i===1?o*r:l-o*r}function Vu(e,t,n={}){var a;const r=Vr(e,t,n.type==="exit"?(a=e.presenceContext)==null?void 0:a.custom:void 0);let{transition:i=e.getDefaultTransition()||{}}=r||{};n.transitionOverride&&(i=n.transitionOverride);const o=r?()=>Promise.all(hx(e,r,n)):()=>Promise.resolve(),s=e.variantChildren&&e.variantChildren.size?(u=0)=>{const{delayChildren:c=0,staggerChildren:f,staggerDirection:d}=i;return P2(e,t,u,c,f,d,n)}:()=>Promise.resolve(),{when:l}=i;if(l){const[u,c]=l==="beforeChildren"?[o,s]:[s,o];return u().then(()=>c())}else return Promise.all([o(),s(n.delay)])}function P2(e,t,n=0,r=0,i=0,o=1,s){const l=[];for(const a of e.variantChildren)a.notify("AnimationStart",t),l.push(Vu(a,t,{...s,delay:n+(typeof r=="function"?0:r)+px(e.variantChildren,a,r,i,o)}).then(()=>a.notify("AnimationComplete",t)));return Promise.all(l)}function I2(e,t,n={}){e.notify("AnimationStart",t);let r;if(Array.isArray(t)){const i=t.map(o=>Vu(e,o,n));r=Promise.all(i)}else if(typeof t=="string")r=Vu(e,t,n);else{const i=typeof t=="function"?Vr(e,t,n.custom):t;r=Promise.all(hx(e,i,n))}return r.then(()=>{e.notify("AnimationComplete",t)})}function mx(e,t){if(!Array.isArray(t))return!1;const n=t.length;if(n!==e.length)return!1;for(let r=0;r<n;r++)if(t[r]!==e[r])return!1;return!0}const N2=Cf.length;function gx(e){if(!e)return;if(!e.isControllingVariants){const n=e.parent?gx(e.parent)||{}:{};return e.props.initial!==void 0&&(n.initial=e.props.initial),n}const t={};for(let n=0;n<N2;n++){const r=Cf[n],i=e.props[r];(co(i)||i===!1)&&(t[r]=i)}return t}const R2=[...Sf].reverse(),M2=Sf.length;function D2(e){return t=>Promise.all(t.map(({animation:n,options:r})=>I2(e,n,r)))}function L2(e){let t=D2(e),n=$h(),r=!0;const i=a=>(u,c)=>{var d;const f=Vr(e,c,a==="exit"?(d=e.presenceContext)==null?void 0:d.custom:void 0);if(f){const{transition:h,transitionEnd:m,...x}=f;u={...u,...x,...m}}return u};function o(a){t=a(e)}function s(a){const{props:u}=e,c=gx(e.parent)||{},f=[],d=new Set;let h={},m=1/0;for(let E=0;E<M2;E++){const p=R2[E],g=n[p],y=u[p]!==void 0?u[p]:c[p],T=co(y),b=p===a?g.isActive:null;b===!1&&(m=E);let k=y===c[p]&&y!==u[p]&&T;if(k&&r&&e.manuallyAnimateOnMount&&(k=!1),g.protectedKeys={...h},!g.isActive&&b===null||!y&&!g.prevProp||vl(y)||typeof y=="boolean")continue;const A=_2(g.prevProp,y);let P=A||p===a&&g.isActive&&!k&&T||E>m&&T,O=!1;const C=Array.isArray(y)?y:[y];let L=C.reduce(i(p),{});b===!1&&(L={});const{prevResolvedValues:F={}}=g,W={...F,...L},ee=G=>{P=!0,d.has(G)&&(O=!0,d.delete(G)),g.needsAnimating[G]=!0;const M=e.getValue(G);M&&(M.liveStyle=!1)};for(const G in W){const M=L[G],V=F[G];if(h.hasOwnProperty(G))continue;let v=!1;ju(M)&&ju(V)?v=!mx(M,V):v=M!==V,v?M!=null?ee(G):d.add(G):M!==void 0&&d.has(G)?ee(G):g.protectedKeys[G]=!0}g.prevProp=y,g.prevResolvedValues=L,g.isActive&&(h={...h,...L}),r&&e.blockInitialAnimation&&(P=!1);const B=k&&A;P&&(!B||O)&&f.push(...C.map(G=>{const M={type:p};if(typeof G=="string"&&r&&!B&&e.manuallyAnimateOnMount&&e.parent){const{parent:V}=e,v=Vr(V,G);if(V.enteringChildren&&v){const{delayChildren:q}=v.transition||{};M.delay=px(V.enteringChildren,e,q)}}return{animation:G,options:M}}))}if(d.size){const E={};if(typeof u.initial!="boolean"){const p=Vr(e,Array.isArray(u.initial)?u.initial[0]:u.initial);p&&p.transition&&(E.transition=p.transition)}d.forEach(p=>{const g=e.getBaseTarget(p),y=e.getValue(p);y&&(y.liveStyle=!0),E[p]=g??null}),f.push({animation:E})}let x=!!f.length;return r&&(u.initial===!1||u.initial===u.animate)&&!e.manuallyAnimateOnMount&&(x=!1),r=!1,x?t(f):Promise.resolve()}function l(a,u){var f;if(n[a].isActive===u)return Promise.resolve();(f=e.variantChildren)==null||f.forEach(d=>{var h;return(h=d.animationState)==null?void 0:h.setActive(a,u)}),n[a].isActive=u;const c=s(a);for(const d in n)n[d].protectedKeys={};return c}return{animateChanges:s,setActive:l,setAnimateFunction:o,getState:()=>n,reset:()=>{n=$h()}}}function _2(e,t){return typeof t=="string"?t!==e:Array.isArray(t)?!mx(t,e):!1}function jn(e=!1){return{isActive:e,protectedKeys:{},needsAnimating:{},prevResolvedValues:{}}}function $h(){return{animate:jn(!0),whileInView:jn(),whileHover:jn(),whileTap:jn(),whileDrag:jn(),whileFocus:jn(),exit:jn()}}class _n{constructor(t){this.isMounted=!1,this.node=t}update(){}}class O2 extends _n{constructor(t){super(t),t.animationState||(t.animationState=L2(t))}updateAnimationControlsSubscription(){const{animate:t}=this.node.getProps();vl(t)&&(this.unmountControls=t.subscribe(this.node))}mount(){this.updateAnimationControlsSubscription()}update(){const{animate:t}=this.node.getProps(),{animate:n}=this.node.prevProps||{};t!==n&&this.updateAnimationControlsSubscription()}unmount(){var t;this.node.animationState.reset(),(t=this.unmountControls)==null||t.call(this)}}let F2=0;class j2 extends _n{constructor(){super(...arguments),this.id=F2++}update(){if(!this.node.presenceContext)return;const{isPresent:t,onExitComplete:n}=this.node.presenceContext,{isPresent:r}=this.node.prevPresenceContext||{};if(!this.node.animationState||t===r)return;const i=this.node.animationState.setActive("exit",!t);n&&!t&&i.then(()=>{n(this.id)})}mount(){const{register:t,onExitComplete:n}=this.node.presenceContext||{};n&&n(this.id),t&&(this.unmount=t(this.id))}unmount(){}}const z2={animation:{Feature:O2},exit:{Feature:j2}};function ho(e,t,n,r={passive:!0}){return e.addEventListener(t,n,r),()=>e.removeEventListener(t,n)}function bo(e){return{point:{x:e.pageX,y:e.pageY}}}const V2=e=>t=>wf(t)&&e(t,bo(t));function Fi(e,t,n,r){return ho(e,t,V2(n),r)}const yx=1e-4,B2=1-yx,U2=1+yx,xx=.01,H2=0-xx,$2=0+xx;function Ge(e){return e.max-e.min}function W2(e,t,n){return Math.abs(e-t)<=n}function Wh(e,t,n,r=.5){e.origin=r,e.originPoint=ye(t.min,t.max,e.origin),e.scale=Ge(n)/Ge(t),e.translate=ye(n.min,n.max,e.origin)-e.originPoint,(e.scale>=B2&&e.scale<=U2||isNaN(e.scale))&&(e.scale=1),(e.translate>=H2&&e.translate<=$2||isNaN(e.translate))&&(e.translate=0)}function ji(e,t,n,r){Wh(e.x,t.x,n.x,r?r.originX:void 0),Wh(e.y,t.y,n.y,r?r.originY:void 0)}function Kh(e,t,n){e.min=n.min+t.min,e.max=e.min+Ge(t)}function K2(e,t,n){Kh(e.x,t.x,n.x),Kh(e.y,t.y,n.y)}function Gh(e,t,n){e.min=t.min-n.min,e.max=e.min+Ge(t)}function zi(e,t,n){Gh(e.x,t.x,n.x),Gh(e.y,t.y,n.y)}function yt(e){return[e("x"),e("y")]}const vx=({current:e})=>e?e.ownerDocument.defaultView:null,Yh=(e,t)=>Math.abs(e-t);function G2(e,t){const n=Yh(e.x,t.x),r=Yh(e.y,t.y);return Math.sqrt(n**2+r**2)}class wx{constructor(t,n,{transformPagePoint:r,contextWindow:i=window,dragSnapToOrigin:o=!1,distanceThreshold:s=3}={}){if(this.startEvent=null,this.lastMoveEvent=null,this.lastMoveEventInfo=null,this.handlers={},this.contextWindow=window,this.updatePoint=()=>{if(!(this.lastMoveEvent&&this.lastMoveEventInfo))return;const d=aa(this.lastMoveEventInfo,this.history),h=this.startEvent!==null,m=G2(d.offset,{x:0,y:0})>=this.distanceThreshold;if(!h&&!m)return;const{point:x}=d,{timestamp:E}=De;this.history.push({...x,timestamp:E});const{onStart:p,onMove:g}=this.handlers;h||(p&&p(this.lastMoveEvent,d),this.startEvent=this.lastMoveEvent),g&&g(this.lastMoveEvent,d)},this.handlePointerMove=(d,h)=>{this.lastMoveEvent=d,this.lastMoveEventInfo=la(h,this.transformPagePoint),pe.update(this.updatePoint,!0)},this.handlePointerUp=(d,h)=>{this.end();const{onEnd:m,onSessionEnd:x,resumeAnimation:E}=this.handlers;if(this.dragSnapToOrigin&&E&&E(),!(this.lastMoveEvent&&this.lastMoveEventInfo))return;const p=aa(d.type==="pointercancel"?this.lastMoveEventInfo:la(h,this.transformPagePoint),this.history);this.startEvent&&m&&m(d,p),x&&x(d,p)},!wf(t))return;this.dragSnapToOrigin=o,this.handlers=n,this.transformPagePoint=r,this.distanceThreshold=s,this.contextWindow=i||window;const l=bo(t),a=la(l,this.transformPagePoint),{point:u}=a,{timestamp:c}=De;this.history=[{...u,timestamp:c}];const{onSessionStart:f}=n;f&&f(t,aa(a,this.history)),this.removeListeners=Co(Fi(this.contextWindow,"pointermove",this.handlePointerMove),Fi(this.contextWindow,"pointerup",this.handlePointerUp),Fi(this.contextWindow,"pointercancel",this.handlePointerUp))}updateHandlers(t){this.handlers=t}end(){this.removeListeners&&this.removeListeners(),Nn(this.updatePoint)}}function la(e,t){return t?{point:t(e.point)}:e}function qh(e,t){return{x:e.x-t.x,y:e.y-t.y}}function aa({point:e},t){return{point:e,delta:qh(e,kx(t)),offset:qh(e,Y2(t)),velocity:q2(t,.1)}}function Y2(e){return e[0]}function kx(e){return e[e.length-1]}function q2(e,t){if(e.length<2)return{x:0,y:0};let n=e.length-1,r=null;const i=kx(e);for(;n>=0&&(r=e[n],!(i.timestamp-r.timestamp>Ht(t)));)n--;if(!r)return{x:0,y:0};const o=St(i.timestamp-r.timestamp);if(o===0)return{x:0,y:0};const s={x:(i.x-r.x)/o,y:(i.y-r.y)/o};return s.x===1/0&&(s.x=0),s.y===1/0&&(s.y=0),s}function X2(e,{min:t,max:n},r){return t!==void 0&&e<t?e=r?ye(t,e,r.min):Math.max(e,t):n!==void 0&&e>n&&(e=r?ye(n,e,r.max):Math.min(e,n)),e}function Xh(e,t,n){return{min:t!==void 0?e.min+t:void 0,max:n!==void 0?e.max+n-(e.max-e.min):void 0}}function Q2(e,{top:t,left:n,bottom:r,right:i}){return{x:Xh(e.x,n,i),y:Xh(e.y,t,r)}}function Qh(e,t){let n=t.min-e.min,r=t.max-e.max;return t.max-t.min<e.max-e.min&&([n,r]=[r,n]),{min:n,max:r}}function Z2(e,t){return{x:Qh(e.x,t.x),y:Qh(e.y,t.y)}}function J2(e,t){let n=.5;const r=Ge(e),i=Ge(t);return i>r?n=lo(t.min,t.max-r,e.min):r>i&&(n=lo(e.min,e.max-i,t.min)),on(0,1,n)}function eE(e,t){const n={};return t.min!==void 0&&(n.min=t.min-e.min),t.max!==void 0&&(n.max=t.max-e.min),n}const Bu=.35;function tE(e=Bu){return e===!1?e=0:e===!0&&(e=Bu),{x:Zh(e,"left","right"),y:Zh(e,"top","bottom")}}function Zh(e,t,n){return{min:Jh(e,t),max:Jh(e,n)}}function Jh(e,t){return typeof e=="number"?e:e[t]||0}const nE=new WeakMap;class rE{constructor(t){this.openDragLock=null,this.isDragging=!1,this.currentDirection=null,this.originPoint={x:0,y:0},this.constraints=!1,this.hasMutatedConstraints=!1,this.elastic=Se(),this.latestPointerEvent=null,this.latestPanInfo=null,this.visualElement=t}start(t,{snapToCursor:n=!1,distanceThreshold:r}={}){const{presenceContext:i}=this.visualElement;if(i&&i.isPresent===!1)return;const o=f=>{const{dragSnapToOrigin:d}=this.getProps();d?this.pauseAnimation():this.stopAnimation(),n&&this.snapToCursor(bo(f).point)},s=(f,d)=>{const{drag:h,dragPropagation:m,onDragStart:x}=this.getProps();if(h&&!m&&(this.openDragLock&&this.openDragLock(),this.openDragLock=uC(h),!this.openDragLock))return;this.latestPointerEvent=f,this.latestPanInfo=d,this.isDragging=!0,this.currentDirection=null,this.resolveConstraints(),this.visualElement.projection&&(this.visualElement.projection.isAnimationBlocked=!0,this.visualElement.projection.target=void 0),yt(p=>{let g=this.getAxisMotionValue(p).get()||0;if($t.test(g)){const{projection:y}=this.visualElement;if(y&&y.layout){const T=y.layout.layoutBox[p];T&&(g=Ge(T)*(parseFloat(g)/100))}}this.originPoint[p]=g}),x&&pe.postRender(()=>x(f,d)),zu(this.visualElement,"transform");const{animationState:E}=this.visualElement;E&&E.setActive("whileDrag",!0)},l=(f,d)=>{this.latestPointerEvent=f,this.latestPanInfo=d;const{dragPropagation:h,dragDirectionLock:m,onDirectionLock:x,onDrag:E}=this.getProps();if(!h&&!this.openDragLock)return;const{offset:p}=d;if(m&&this.currentDirection===null){this.currentDirection=iE(p),this.currentDirection!==null&&x&&x(this.currentDirection);return}this.updateAxis("x",d.point,p),this.updateAxis("y",d.point,p),this.visualElement.render(),E&&E(f,d)},a=(f,d)=>{this.latestPointerEvent=f,this.latestPanInfo=d,this.stop(f,d),this.latestPointerEvent=null,this.latestPanInfo=null},u=()=>yt(f=>{var d;return this.getAnimationState(f)==="paused"&&((d=this.getAxisMotionValue(f).animation)==null?void 0:d.play())}),{dragSnapToOrigin:c}=this.getProps();this.panSession=new wx(t,{onSessionStart:o,onStart:s,onMove:l,onSessionEnd:a,resumeAnimation:u},{transformPagePoint:this.visualElement.getTransformPagePoint(),dragSnapToOrigin:c,distanceThreshold:r,contextWindow:vx(this.visualElement)})}stop(t,n){const r=t||this.latestPointerEvent,i=n||this.latestPanInfo,o=this.isDragging;if(this.cancel(),!o||!i||!r)return;const{velocity:s}=i;this.startAnimation(s);const{onDragEnd:l}=this.getProps();l&&pe.postRender(()=>l(r,i))}cancel(){this.isDragging=!1;const{projection:t,animationState:n}=this.visualElement;t&&(t.isAnimationBlocked=!1),this.panSession&&this.panSession.end(),this.panSession=void 0;const{dragPropagation:r}=this.getProps();!r&&this.openDragLock&&(this.openDragLock(),this.openDragLock=null),n&&n.setActive("whileDrag",!1)}updateAxis(t,n,r){const{drag:i}=this.getProps();if(!r||!Qo(t,i,this.currentDirection))return;const o=this.getAxisMotionValue(t);let s=this.originPoint[t]+r[t];this.constraints&&this.constraints[t]&&(s=X2(s,this.constraints[t],this.elastic[t])),o.set(s)}resolveConstraints(){var o;const{dragConstraints:t,dragElastic:n}=this.getProps(),r=this.visualElement.projection&&!this.visualElement.projection.layout?this.visualElement.projection.measure(!1):(o=this.visualElement.projection)==null?void 0:o.layout,i=this.constraints;t&&Nr(t)?this.constraints||(this.constraints=this.resolveRefConstraints()):t&&r?this.constraints=Q2(r.layoutBox,t):this.constraints=!1,this.elastic=tE(n),i!==this.constraints&&r&&this.constraints&&!this.hasMutatedConstraints&&yt(s=>{this.constraints!==!1&&this.getAxisMotionValue(s)&&(this.constraints[s]=eE(r.layoutBox[s],this.constraints[s]))})}resolveRefConstraints(){const{dragConstraints:t,onMeasureDragConstraints:n}=this.getProps();if(!t||!Nr(t))return!1;const r=t.current,{projection:i}=this.visualElement;if(!i||!i.layout)return!1;const o=o2(r,i.root,this.visualElement.getTransformPagePoint());let s=Z2(i.layout.layoutBox,o);if(n){const l=n(n2(s));this.hasMutatedConstraints=!!l,l&&(s=ix(l))}return s}startAnimation(t){const{drag:n,dragMomentum:r,dragElastic:i,dragTransition:o,dragSnapToOrigin:s,onDragTransitionEnd:l}=this.getProps(),a=this.constraints||{},u=yt(c=>{if(!Qo(c,n,this.currentDirection))return;let f=a&&a[c]||{};s&&(f={min:0,max:0});const d=i?200:1e6,h=i?40:1e7,m={type:"inertia",velocity:r?t[c]:0,bounceStiffness:d,bounceDamping:h,timeConstant:750,restDelta:1,restSpeed:10,...o,...f};return this.startAxisValueAnimation(c,m)});return Promise.all(u).then(l)}startAxisValueAnimation(t,n){const r=this.getAxisMotionValue(t);return zu(this.visualElement,t),r.start(Nf(t,r,0,n,this.visualElement,!1))}stopAnimation(){yt(t=>this.getAxisMotionValue(t).stop())}pauseAnimation(){yt(t=>{var n;return(n=this.getAxisMotionValue(t).animation)==null?void 0:n.pause()})}getAnimationState(t){var n;return(n=this.getAxisMotionValue(t).animation)==null?void 0:n.state}getAxisMotionValue(t){const n=`_drag${t.toUpperCase()}`,r=this.visualElement.getProps(),i=r[n];return i||this.visualElement.getValue(t,(r.initial?r.initial[t]:void 0)||0)}snapToCursor(t){yt(n=>{const{drag:r}=this.getProps();if(!Qo(n,r,this.currentDirection))return;const{projection:i}=this.visualElement,o=this.getAxisMotionValue(n);if(i&&i.layout){const{min:s,max:l}=i.layout.layoutBox[n];o.set(t[n]-ye(s,l,.5))}})}scalePositionWithinConstraints(){if(!this.visualElement.current)return;const{drag:t,dragConstraints:n}=this.getProps(),{projection:r}=this.visualElement;if(!Nr(n)||!r||!this.constraints)return;this.stopAnimation();const i={x:0,y:0};yt(s=>{const l=this.getAxisMotionValue(s);if(l&&this.constraints!==!1){const a=l.get();i[s]=J2({min:a,max:a},this.constraints[s])}});const{transformTemplate:o}=this.visualElement.getProps();this.visualElement.current.style.transform=o?o({},""):"none",r.root&&r.root.updateScroll(),r.updateLayout(),this.resolveConstraints(),yt(s=>{if(!Qo(s,t,null))return;const l=this.getAxisMotionValue(s),{min:a,max:u}=this.constraints[s];l.set(ye(a,u,i[s]))})}addListeners(){if(!this.visualElement.current)return;nE.set(this.visualElement,this);const t=this.visualElement.current,n=Fi(t,"pointerdown",a=>{const{drag:u,dragListener:c=!0}=this.getProps();u&&c&&this.start(a)}),r=()=>{const{dragConstraints:a}=this.getProps();Nr(a)&&a.current&&(this.constraints=this.resolveRefConstraints())},{projection:i}=this.visualElement,o=i.addEventListener("measure",r);i&&!i.layout&&(i.root&&i.root.updateScroll(),i.updateLayout()),pe.read(r);const s=ho(window,"resize",()=>this.scalePositionWithinConstraints()),l=i.addEventListener("didUpdate",({delta:a,hasLayoutChanged:u})=>{this.isDragging&&u&&(yt(c=>{const f=this.getAxisMotionValue(c);f&&(this.originPoint[c]+=a[c].translate,f.set(f.get()+a[c].translate))}),this.visualElement.render())});return()=>{s(),n(),o(),l&&l()}}getProps(){const t=this.visualElement.getProps(),{drag:n=!1,dragDirectionLock:r=!1,dragPropagation:i=!1,dragConstraints:o=!1,dragElastic:s=Bu,dragMomentum:l=!0}=t;return{...t,drag:n,dragDirectionLock:r,dragPropagation:i,dragConstraints:o,dragElastic:s,dragMomentum:l}}}function Qo(e,t,n){return(t===!0||t===e)&&(n===null||n===e)}function iE(e,t=10){let n=null;return Math.abs(e.y)>t?n="y":Math.abs(e.x)>t&&(n="x"),n}class oE extends _n{constructor(t){super(t),this.removeGroupControls=Et,this.removeListeners=Et,this.controls=new rE(t)}mount(){const{dragControls:t}=this.node.getProps();t&&(this.removeGroupControls=t.subscribe(this.controls)),this.removeListeners=this.controls.addListeners()||Et}unmount(){this.removeGroupControls(),this.removeListeners()}}const ep=e=>(t,n)=>{e&&pe.postRender(()=>e(t,n))};class sE extends _n{constructor(){super(...arguments),this.removePointerDownListener=Et}onPointerDown(t){this.session=new wx(t,this.createPanHandlers(),{transformPagePoint:this.node.getTransformPagePoint(),contextWindow:vx(this.node)})}createPanHandlers(){const{onPanSessionStart:t,onPanStart:n,onPan:r,onPanEnd:i}=this.node.getProps();return{onSessionStart:ep(t),onStart:ep(n),onMove:r,onEnd:(o,s)=>{delete this.session,i&&pe.postRender(()=>i(o,s))}}}mount(){this.removePointerDownListener=Fi(this.node.current,"pointerdown",t=>this.onPointerDown(t))}update(){this.session&&this.session.updateHandlers(this.createPanHandlers())}unmount(){this.removePointerDownListener(),this.session&&this.session.end()}}const ys={hasAnimatedSinceResize:!0,hasEverUpdated:!1};function tp(e,t){return t.max===t.min?0:e/(t.max-t.min)*100}const yi={correct:(e,t)=>{if(!t.target)return e;if(typeof e=="string")if($.test(e))e=parseFloat(e);else return e;const n=tp(e,t.target.x),r=tp(e,t.target.y);return`${n}% ${r}%`}},lE={correct:(e,{treeScale:t,projectionDelta:n})=>{const r=e,i=Rn.parse(e);if(i.length>5)return r;const o=Rn.createTransformer(e),s=typeof i[0]!="number"?1:0,l=n.x.scale*t.x,a=n.y.scale*t.y;i[0+s]/=l,i[1+s]/=a;const u=ye(l,a,.5);return typeof i[2+s]=="number"&&(i[2+s]/=u),typeof i[3+s]=="number"&&(i[3+s]/=u),o(i)}};let ua=!1;class aE extends N.Component{componentDidMount(){const{visualElement:t,layoutGroup:n,switchLayoutGroup:r,layoutId:i}=this.props,{projection:o}=t;NC(uE),o&&(n.group&&n.group.add(o),r&&r.register&&i&&r.register(o),ua&&o.root.didUpdate(),o.addEventListener("animationComplete",()=>{this.safeToRemove()}),o.setOptions({...o.options,onExitComplete:()=>this.safeToRemove()})),ys.hasEverUpdated=!0}getSnapshotBeforeUpdate(t){const{layoutDependency:n,visualElement:r,drag:i,isPresent:o}=this.props,{projection:s}=r;return s&&(s.isPresent=o,ua=!0,i||t.layoutDependency!==n||n===void 0||t.isPresent!==o?s.willUpdate():this.safeToRemove(),t.isPresent!==o&&(o?s.promote():s.relegate()||pe.postRender(()=>{const l=s.getStack();(!l||!l.members.length)&&this.safeToRemove()}))),null}componentDidUpdate(){const{projection:t}=this.props.visualElement;t&&(t.root.didUpdate(),vf.postRender(()=>{!t.currentAnimation&&t.isLead()&&this.safeToRemove()}))}componentWillUnmount(){const{visualElement:t,layoutGroup:n,switchLayoutGroup:r}=this.props,{projection:i}=t;ua=!0,i&&(i.scheduleCheckAfterUnmount(),n&&n.group&&n.group.remove(i),r&&r.deregister&&r.deregister(i))}safeToRemove(){const{safeToRemove:t}=this.props;t&&t()}render(){return null}}function Sx(e){const[t,n]=$0(),r=N.useContext(Xc);return w.jsx(aE,{...e,layoutGroup:r,switchLayoutGroup:N.useContext(nx),isPresent:t,safeToRemove:n})}const uE={borderRadius:{...yi,applyTo:["borderTopLeftRadius","borderTopRightRadius","borderBottomLeftRadius","borderBottomRightRadius"]},borderTopLeftRadius:yi,borderTopRightRadius:yi,borderBottomLeftRadius:yi,borderBottomRightRadius:yi,boxShadow:lE};function cE(e,t,n){const r=Ve(e)?e:qr(e);return r.start(Nf("",r,t,n)),r.animation}const fE=(e,t)=>e.depth-t.depth;class dE{constructor(){this.children=[],this.isDirty=!1}add(t){Jc(this.children,t),this.isDirty=!0}remove(t){ef(this.children,t),this.isDirty=!0}forEach(t){this.isDirty&&this.children.sort(fE),this.isDirty=!1,this.children.forEach(t)}}function hE(e,t){const n=nt.now(),r=({timestamp:i})=>{const o=i-n;o>=t&&(Nn(r),e(o-t))};return pe.setup(r,!0),()=>Nn(r)}const Cx=["TopLeft","TopRight","BottomLeft","BottomRight"],pE=Cx.length,np=e=>typeof e=="string"?parseFloat(e):e,rp=e=>typeof e=="number"||$.test(e);function mE(e,t,n,r,i,o){i?(e.opacity=ye(0,n.opacity??1,gE(r)),e.opacityExit=ye(t.opacity??1,0,yE(r))):o&&(e.opacity=ye(t.opacity??1,n.opacity??1,r));for(let s=0;s<pE;s++){const l=`border${Cx[s]}Radius`;let a=ip(t,l),u=ip(n,l);if(a===void 0&&u===void 0)continue;a||(a=0),u||(u=0),a===0||u===0||rp(a)===rp(u)?(e[l]=Math.max(ye(np(a),np(u),r),0),($t.test(u)||$t.test(a))&&(e[l]+="%")):e[l]=u}(t.rotate||n.rotate)&&(e.rotate=ye(t.rotate||0,n.rotate||0,r))}function ip(e,t){return e[t]!==void 0?e[t]:e.borderRadius}const gE=Ex(0,.5,c0),yE=Ex(.5,.95,Et);function Ex(e,t,n){return r=>r<e?0:r>t?1:n(lo(e,t,r))}function op(e,t){e.min=t.min,e.max=t.max}function gt(e,t){op(e.x,t.x),op(e.y,t.y)}function sp(e,t){e.translate=t.translate,e.scale=t.scale,e.originPoint=t.originPoint,e.origin=t.origin}function lp(e,t,n,r,i){return e-=t,e=Xs(e,1/n,r),i!==void 0&&(e=Xs(e,1/i,r)),e}function xE(e,t=0,n=1,r=.5,i,o=e,s=e){if($t.test(t)&&(t=parseFloat(t),t=ye(s.min,s.max,t/100)-s.min),typeof t!="number")return;let l=ye(o.min,o.max,r);e===o&&(l-=t),e.min=lp(e.min,t,n,l,i),e.max=lp(e.max,t,n,l,i)}function ap(e,t,[n,r,i],o,s){xE(e,t[n],t[r],t[i],t.scale,o,s)}const vE=["x","scaleX","originX"],wE=["y","scaleY","originY"];function up(e,t,n,r){ap(e.x,t,vE,n?n.x:void 0,r?r.x:void 0),ap(e.y,t,wE,n?n.y:void 0,r?r.y:void 0)}function cp(e){return e.translate===0&&e.scale===1}function Tx(e){return cp(e.x)&&cp(e.y)}function fp(e,t){return e.min===t.min&&e.max===t.max}function kE(e,t){return fp(e.x,t.x)&&fp(e.y,t.y)}function dp(e,t){return Math.round(e.min)===Math.round(t.min)&&Math.round(e.max)===Math.round(t.max)}function bx(e,t){return dp(e.x,t.x)&&dp(e.y,t.y)}function hp(e){return Ge(e.x)/Ge(e.y)}function pp(e,t){return e.translate===t.translate&&e.scale===t.scale&&e.originPoint===t.originPoint}class SE{constructor(){this.members=[]}add(t){Jc(this.members,t),t.scheduleRender()}remove(t){if(ef(this.members,t),t===this.prevLead&&(this.prevLead=void 0),t===this.lead){const n=this.members[this.members.length-1];n&&this.promote(n)}}relegate(t){const n=this.members.findIndex(i=>t===i);if(n===0)return!1;let r;for(let i=n;i>=0;i--){const o=this.members[i];if(o.isPresent!==!1){r=o;break}}return r?(this.promote(r),!0):!1}promote(t,n){const r=this.lead;if(t!==r&&(this.prevLead=r,this.lead=t,t.show(),r)){r.instance&&r.scheduleRender(),t.scheduleRender(),t.resumeFrom=r,n&&(t.resumeFrom.preserveOpacity=!0),r.snapshot&&(t.snapshot=r.snapshot,t.snapshot.latestValues=r.animationValues||r.latestValues),t.root&&t.root.isUpdating&&(t.isLayoutDirty=!0);const{crossfade:i}=t.options;i===!1&&r.hide()}}exitAnimationComplete(){this.members.forEach(t=>{const{options:n,resumingFrom:r}=t;n.onExitComplete&&n.onExitComplete(),r&&r.options.onExitComplete&&r.options.onExitComplete()})}scheduleRender(){this.members.forEach(t=>{t.instance&&t.scheduleRender(!1)})}removeLeadSnapshot(){this.lead&&this.lead.snapshot&&(this.lead.snapshot=void 0)}}function CE(e,t,n){let r="";const i=e.x.translate/t.x,o=e.y.translate/t.y,s=(n==null?void 0:n.z)||0;if((i||o||s)&&(r=`translate3d(${i}px, ${o}px, ${s}px) `),(t.x!==1||t.y!==1)&&(r+=`scale(${1/t.x}, ${1/t.y}) `),n){const{transformPerspective:u,rotate:c,rotateX:f,rotateY:d,skewX:h,skewY:m}=n;u&&(r=`perspective(${u}px) ${r}`),c&&(r+=`rotate(${c}deg) `),f&&(r+=`rotateX(${f}deg) `),d&&(r+=`rotateY(${d}deg) `),h&&(r+=`skewX(${h}deg) `),m&&(r+=`skewY(${m}deg) `)}const l=e.x.scale*t.x,a=e.y.scale*t.y;return(l!==1||a!==1)&&(r+=`scale(${l}, ${a})`),r||"none"}const ca=["","X","Y","Z"],EE=1e3;let TE=0;function fa(e,t,n,r){const{latestValues:i}=t;i[e]&&(n[e]=i[e],t.setStaticValue(e,0),r&&(r[e]=0))}function Ax(e){if(e.hasCheckedOptimisedAppear=!0,e.root===e)return;const{visualElement:t}=e.options;if(!t)return;const n=dx(t);if(window.MotionHasOptimisedAnimation(n,"transform")){const{layout:i,layoutId:o}=e.options;window.MotionCancelOptimisedAnimation(n,"transform",pe,!(i||o))}const{parent:r}=e;r&&!r.hasCheckedOptimisedAppear&&Ax(r)}function Px({attachResizeListener:e,defaultParent:t,measureScroll:n,checkIsScrollRoot:r,resetTransform:i}){return class{constructor(s={},l=t==null?void 0:t()){this.id=TE++,this.animationId=0,this.animationCommitId=0,this.children=new Set,this.options={},this.isTreeAnimating=!1,this.isAnimationBlocked=!1,this.isLayoutDirty=!1,this.isProjectionDirty=!1,this.isSharedProjectionDirty=!1,this.isTransformDirty=!1,this.updateManuallyBlocked=!1,this.updateBlockedByResize=!1,this.isUpdating=!1,this.isSVG=!1,this.needsReset=!1,this.shouldResetTransform=!1,this.hasCheckedOptimisedAppear=!1,this.treeScale={x:1,y:1},this.eventHandlers=new Map,this.hasTreeAnimated=!1,this.updateScheduled=!1,this.scheduleUpdate=()=>this.update(),this.projectionUpdateScheduled=!1,this.checkUpdateFailed=()=>{this.isUpdating&&(this.isUpdating=!1,this.clearAllSnapshots())},this.updateProjection=()=>{this.projectionUpdateScheduled=!1,this.nodes.forEach(PE),this.nodes.forEach(ME),this.nodes.forEach(DE),this.nodes.forEach(IE)},this.resolvedRelativeTargetAt=0,this.hasProjected=!1,this.isVisible=!0,this.animationProgress=0,this.sharedNodes=new Map,this.latestValues=s,this.root=l?l.root||l:this,this.path=l?[...l.path,l]:[],this.parent=l,this.depth=l?l.depth+1:0;for(let a=0;a<this.path.length;a++)this.path[a].shouldResetTransform=!0;this.root===this&&(this.nodes=new dE)}addEventListener(s,l){return this.eventHandlers.has(s)||this.eventHandlers.set(s,new rf),this.eventHandlers.get(s).add(l)}notifyListeners(s,...l){const a=this.eventHandlers.get(s);a&&a.notify(...l)}hasListeners(s){return this.eventHandlers.has(s)}mount(s){if(this.instance)return;this.isSVG=H0(s)&&!mC(s),this.instance=s;const{layoutId:l,layout:a,visualElement:u}=this.options;if(u&&!u.current&&u.mount(s),this.root.nodes.add(this),this.parent&&this.parent.children.add(this),this.root.hasTreeAnimated&&(a||l)&&(this.isLayoutDirty=!0),e){let c,f=0;const d=()=>this.root.updateBlockedByResize=!1;pe.read(()=>{f=window.innerWidth}),e(s,()=>{const h=window.innerWidth;h!==f&&(f=h,this.root.updateBlockedByResize=!0,c&&c(),c=hE(d,250),ys.hasAnimatedSinceResize&&(ys.hasAnimatedSinceResize=!1,this.nodes.forEach(yp)))})}l&&this.root.registerSharedNode(l,this),this.options.animate!==!1&&u&&(l||a)&&this.addEventListener("didUpdate",({delta:c,hasLayoutChanged:f,hasRelativeLayoutChanged:d,layout:h})=>{if(this.isTreeAnimationBlocked()){this.target=void 0,this.relativeTarget=void 0;return}const m=this.options.transition||u.getDefaultTransition()||jE,{onLayoutAnimationStart:x,onLayoutAnimationComplete:E}=u.getProps(),p=!this.targetLayout||!bx(this.targetLayout,h),g=!f&&d;if(this.options.layoutRoot||this.resumeFrom||g||f&&(p||!this.currentAnimation)){this.resumeFrom&&(this.resumingFrom=this.resumeFrom,this.resumingFrom.resumingFrom=void 0);const y={...yf(m,"layout"),onPlay:x,onComplete:E};(u.shouldReduceMotion||this.options.layoutRoot)&&(y.delay=0,y.type=!1),this.startAnimation(y),this.setAnimationOrigin(c,g)}else f||yp(this),this.isLead()&&this.options.onExitComplete&&this.options.onExitComplete();this.targetLayout=h})}unmount(){this.options.layoutId&&this.willUpdate(),this.root.nodes.remove(this);const s=this.getStack();s&&s.remove(this),this.parent&&this.parent.children.delete(this),this.instance=void 0,this.eventHandlers.clear(),Nn(this.updateProjection)}blockUpdate(){this.updateManuallyBlocked=!0}unblockUpdate(){this.updateManuallyBlocked=!1}isUpdateBlocked(){return this.updateManuallyBlocked||this.updateBlockedByResize}isTreeAnimationBlocked(){return this.isAnimationBlocked||this.parent&&this.parent.isTreeAnimationBlocked()||!1}startUpdate(){this.isUpdateBlocked()||(this.isUpdating=!0,this.nodes&&this.nodes.forEach(LE),this.animationId++)}getTransformTemplate(){const{visualElement:s}=this.options;return s&&s.getProps().transformTemplate}willUpdate(s=!0){if(this.root.hasTreeAnimated=!0,this.root.isUpdateBlocked()){this.options.onExitComplete&&this.options.onExitComplete();return}if(window.MotionCancelOptimisedAnimation&&!this.hasCheckedOptimisedAppear&&Ax(this),!this.root.isUpdating&&this.root.startUpdate(),this.isLayoutDirty)return;this.isLayoutDirty=!0;for(let c=0;c<this.path.length;c++){const f=this.path[c];f.shouldResetTransform=!0,f.updateScroll("snapshot"),f.options.layoutRoot&&f.willUpdate(!1)}const{layoutId:l,layout:a}=this.options;if(l===void 0&&!a)return;const u=this.getTransformTemplate();this.prevTransformTemplateValue=u?u(this.latestValues,""):void 0,this.updateSnapshot(),s&&this.notifyListeners("willUpdate")}update(){if(this.updateScheduled=!1,this.isUpdateBlocked()){this.unblockUpdate(),this.clearAllSnapshots(),this.nodes.forEach(mp);return}if(this.animationId<=this.animationCommitId){this.nodes.forEach(gp);return}this.animationCommitId=this.animationId,this.isUpdating?(this.isUpdating=!1,this.nodes.forEach(RE),this.nodes.forEach(bE),this.nodes.forEach(AE)):this.nodes.forEach(gp),this.clearAllSnapshots();const l=nt.now();De.delta=on(0,1e3/60,l-De.timestamp),De.timestamp=l,De.isProcessing=!0,Jl.update.process(De),Jl.preRender.process(De),Jl.render.process(De),De.isProcessing=!1}didUpdate(){this.updateScheduled||(this.updateScheduled=!0,vf.read(this.scheduleUpdate))}clearAllSnapshots(){this.nodes.forEach(NE),this.sharedNodes.forEach(_E)}scheduleUpdateProjection(){this.projectionUpdateScheduled||(this.projectionUpdateScheduled=!0,pe.preRender(this.updateProjection,!1,!0))}scheduleCheckAfterUnmount(){pe.postRender(()=>{this.isLayoutDirty?this.root.didUpdate():this.root.checkUpdateFailed()})}updateSnapshot(){this.snapshot||!this.instance||(this.snapshot=this.measure(),this.snapshot&&!Ge(this.snapshot.measuredBox.x)&&!Ge(this.snapshot.measuredBox.y)&&(this.snapshot=void 0))}updateLayout(){if(!this.instance||(this.updateScroll(),!(this.options.alwaysMeasureLayout&&this.isLead())&&!this.isLayoutDirty))return;if(this.resumeFrom&&!this.resumeFrom.instance)for(let a=0;a<this.path.length;a++)this.path[a].updateScroll();const s=this.layout;this.layout=this.measure(!1),this.layoutCorrected=Se(),this.isLayoutDirty=!1,this.projectionDelta=void 0,this.notifyListeners("measure",this.layout.layoutBox);const{visualElement:l}=this.options;l&&l.notify("LayoutMeasure",this.layout.layoutBox,s?s.layoutBox:void 0)}updateScroll(s="measure"){let l=!!(this.options.layoutScroll&&this.instance);if(this.scroll&&this.scroll.animationId===this.root.animationId&&this.scroll.phase===s&&(l=!1),l&&this.instance){const a=r(this.instance);this.scroll={animationId:this.root.animationId,phase:s,isRoot:a,offset:n(this.instance),wasRoot:this.scroll?this.scroll.isRoot:a}}}resetTransform(){if(!i)return;const s=this.isLayoutDirty||this.shouldResetTransform||this.options.alwaysMeasureLayout,l=this.projectionDelta&&!Tx(this.projectionDelta),a=this.getTransformTemplate(),u=a?a(this.latestValues,""):void 0,c=u!==this.prevTransformTemplateValue;s&&this.instance&&(l||Un(this.latestValues)||c)&&(i(this.instance,u),this.shouldResetTransform=!1,this.scheduleRender())}measure(s=!0){const l=this.measurePageBox();let a=this.removeElementScroll(l);return s&&(a=this.removeTransform(a)),zE(a),{animationId:this.root.animationId,measuredBox:l,layoutBox:a,latestValues:{},source:this.id}}measurePageBox(){var u;const{visualElement:s}=this.options;if(!s)return Se();const l=s.measureViewportBox();if(!(((u=this.scroll)==null?void 0:u.wasRoot)||this.path.some(VE))){const{scroll:c}=this.root;c&&(Rr(l.x,c.offset.x),Rr(l.y,c.offset.y))}return l}removeElementScroll(s){var a;const l=Se();if(gt(l,s),(a=this.scroll)!=null&&a.wasRoot)return l;for(let u=0;u<this.path.length;u++){const c=this.path[u],{scroll:f,options:d}=c;c!==this.root&&f&&d.layoutScroll&&(f.wasRoot&&gt(l,s),Rr(l.x,f.offset.x),Rr(l.y,f.offset.y))}return l}applyTransform(s,l=!1){const a=Se();gt(a,s);for(let u=0;u<this.path.length;u++){const c=this.path[u];!l&&c.options.layoutScroll&&c.scroll&&c!==c.root&&Mr(a,{x:-c.scroll.offset.x,y:-c.scroll.offset.y}),Un(c.latestValues)&&Mr(a,c.latestValues)}return Un(this.latestValues)&&Mr(a,this.latestValues),a}removeTransform(s){const l=Se();gt(l,s);for(let a=0;a<this.path.length;a++){const u=this.path[a];if(!u.instance||!Un(u.latestValues))continue;_u(u.latestValues)&&u.updateSnapshot();const c=Se(),f=u.measurePageBox();gt(c,f),up(l,u.latestValues,u.snapshot?u.snapshot.layoutBox:void 0,c)}return Un(this.latestValues)&&up(l,this.latestValues),l}setTargetDelta(s){this.targetDelta=s,this.root.scheduleUpdateProjection(),this.isProjectionDirty=!0}setOptions(s){this.options={...this.options,...s,crossfade:s.crossfade!==void 0?s.crossfade:!0}}clearMeasurements(){this.scroll=void 0,this.layout=void 0,this.snapshot=void 0,this.prevTransformTemplateValue=void 0,this.targetDelta=void 0,this.target=void 0,this.isLayoutDirty=!1}forceRelativeParentToResolveTarget(){this.relativeParent&&this.relativeParent.resolvedRelativeTargetAt!==De.timestamp&&this.relativeParent.resolveTargetDelta(!0)}resolveTargetDelta(s=!1){var d;const l=this.getLead();this.isProjectionDirty||(this.isProjectionDirty=l.isProjectionDirty),this.isTransformDirty||(this.isTransformDirty=l.isTransformDirty),this.isSharedProjectionDirty||(this.isSharedProjectionDirty=l.isSharedProjectionDirty);const a=!!this.resumingFrom||this!==l;if(!(s||a&&this.isSharedProjectionDirty||this.isProjectionDirty||(d=this.parent)!=null&&d.isProjectionDirty||this.attemptToResolveRelativeTarget||this.root.updateBlockedByResize))return;const{layout:c,layoutId:f}=this.options;if(!(!this.layout||!(c||f))){if(this.resolvedRelativeTargetAt=De.timestamp,!this.targetDelta&&!this.relativeTarget){const h=this.getClosestProjectingParent();h&&h.layout&&this.animationProgress!==1?(this.relativeParent=h,this.forceRelativeParentToResolveTarget(),this.relativeTarget=Se(),this.relativeTargetOrigin=Se(),zi(this.relativeTargetOrigin,this.layout.layoutBox,h.layout.layoutBox),gt(this.relativeTarget,this.relativeTargetOrigin)):this.relativeParent=this.relativeTarget=void 0}if(!(!this.relativeTarget&&!this.targetDelta)&&(this.target||(this.target=Se(),this.targetWithTransforms=Se()),this.relativeTarget&&this.relativeTargetOrigin&&this.relativeParent&&this.relativeParent.target?(this.forceRelativeParentToResolveTarget(),K2(this.target,this.relativeTarget,this.relativeParent.target)):this.targetDelta?(this.resumingFrom?this.target=this.applyTransform(this.layout.layoutBox):gt(this.target,this.layout.layoutBox),sx(this.target,this.targetDelta)):gt(this.target,this.layout.layoutBox),this.attemptToResolveRelativeTarget)){this.attemptToResolveRelativeTarget=!1;const h=this.getClosestProjectingParent();h&&!!h.resumingFrom==!!this.resumingFrom&&!h.options.layoutScroll&&h.target&&this.animationProgress!==1?(this.relativeParent=h,this.forceRelativeParentToResolveTarget(),this.relativeTarget=Se(),this.relativeTargetOrigin=Se(),zi(this.relativeTargetOrigin,this.target,h.target),gt(this.relativeTarget,this.relativeTargetOrigin)):this.relativeParent=this.relativeTarget=void 0}}}getClosestProjectingParent(){if(!(!this.parent||_u(this.parent.latestValues)||ox(this.parent.latestValues)))return this.parent.isProjecting()?this.parent:this.parent.getClosestProjectingParent()}isProjecting(){return!!((this.relativeTarget||this.targetDelta||this.options.layoutRoot)&&this.layout)}calcProjection(){var m;const s=this.getLead(),l=!!this.resumingFrom||this!==s;let a=!0;if((this.isProjectionDirty||(m=this.parent)!=null&&m.isProjectionDirty)&&(a=!1),l&&(this.isSharedProjectionDirty||this.isTransformDirty)&&(a=!1),this.resolvedRelativeTargetAt===De.timestamp&&(a=!1),a)return;const{layout:u,layoutId:c}=this.options;if(this.isTreeAnimating=!!(this.parent&&this.parent.isTreeAnimating||this.currentAnimation||this.pendingAnimation),this.isTreeAnimating||(this.targetDelta=this.relativeTarget=void 0),!this.layout||!(u||c))return;gt(this.layoutCorrected,this.layout.layoutBox);const f=this.treeScale.x,d=this.treeScale.y;i2(this.layoutCorrected,this.treeScale,this.path,l),s.layout&&!s.target&&(this.treeScale.x!==1||this.treeScale.y!==1)&&(s.target=s.layout.layoutBox,s.targetWithTransforms=Se());const{target:h}=s;if(!h){this.prevProjectionDelta&&(this.createProjectionDeltas(),this.scheduleRender());return}!this.projectionDelta||!this.prevProjectionDelta?this.createProjectionDeltas():(sp(this.prevProjectionDelta.x,this.projectionDelta.x),sp(this.prevProjectionDelta.y,this.projectionDelta.y)),ji(this.projectionDelta,this.layoutCorrected,h,this.latestValues),(this.treeScale.x!==f||this.treeScale.y!==d||!pp(this.projectionDelta.x,this.prevProjectionDelta.x)||!pp(this.projectionDelta.y,this.prevProjectionDelta.y))&&(this.hasProjected=!0,this.scheduleRender(),this.notifyListeners("projectionUpdate",h))}hide(){this.isVisible=!1}show(){this.isVisible=!0}scheduleRender(s=!0){var l;if((l=this.options.visualElement)==null||l.scheduleRender(),s){const a=this.getStack();a&&a.scheduleRender()}this.resumingFrom&&!this.resumingFrom.instance&&(this.resumingFrom=void 0)}createProjectionDeltas(){this.prevProjectionDelta=Dr(),this.projectionDelta=Dr(),this.projectionDeltaWithTransform=Dr()}setAnimationOrigin(s,l=!1){const a=this.snapshot,u=a?a.latestValues:{},c={...this.latestValues},f=Dr();(!this.relativeParent||!this.relativeParent.options.layoutRoot)&&(this.relativeTarget=this.relativeTargetOrigin=void 0),this.attemptToResolveRelativeTarget=!l;const d=Se(),h=a?a.source:void 0,m=this.layout?this.layout.source:void 0,x=h!==m,E=this.getStack(),p=!E||E.members.length<=1,g=!!(x&&!p&&this.options.crossfade===!0&&!this.path.some(FE));this.animationProgress=0;let y;this.mixTargetDelta=T=>{const b=T/1e3;xp(f.x,s.x,b),xp(f.y,s.y,b),this.setTargetDelta(f),this.relativeTarget&&this.relativeTargetOrigin&&this.layout&&this.relativeParent&&this.relativeParent.layout&&(zi(d,this.layout.layoutBox,this.relativeParent.layout.layoutBox),OE(this.relativeTarget,this.relativeTargetOrigin,d,b),y&&kE(this.relativeTarget,y)&&(this.isProjectionDirty=!1),y||(y=Se()),gt(y,this.relativeTarget)),x&&(this.animationValues=c,mE(c,u,this.latestValues,b,g,p)),this.root.scheduleUpdateProjection(),this.scheduleRender(),this.animationProgress=b},this.mixTargetDelta(this.options.layoutRoot?1e3:0)}startAnimation(s){var l,a,u;this.notifyListeners("animationStart"),(l=this.currentAnimation)==null||l.stop(),(u=(a=this.resumingFrom)==null?void 0:a.currentAnimation)==null||u.stop(),this.pendingAnimation&&(Nn(this.pendingAnimation),this.pendingAnimation=void 0),this.pendingAnimation=pe.update(()=>{ys.hasAnimatedSinceResize=!0,this.motionValue||(this.motionValue=qr(0)),this.currentAnimation=cE(this.motionValue,[0,1e3],{...s,velocity:0,isSync:!0,onUpdate:c=>{this.mixTargetDelta(c),s.onUpdate&&s.onUpdate(c)},onStop:()=>{},onComplete:()=>{s.onComplete&&s.onComplete(),this.completeAnimation()}}),this.resumingFrom&&(this.resumingFrom.currentAnimation=this.currentAnimation),this.pendingAnimation=void 0})}completeAnimation(){this.resumingFrom&&(this.resumingFrom.currentAnimation=void 0,this.resumingFrom.preserveOpacity=void 0);const s=this.getStack();s&&s.exitAnimationComplete(),this.resumingFrom=this.currentAnimation=this.animationValues=void 0,this.notifyListeners("animationComplete")}finishAnimation(){this.currentAnimation&&(this.mixTargetDelta&&this.mixTargetDelta(EE),this.currentAnimation.stop()),this.completeAnimation()}applyTransformsToTarget(){const s=this.getLead();let{targetWithTransforms:l,target:a,layout:u,latestValues:c}=s;if(!(!l||!a||!u)){if(this!==s&&this.layout&&u&&Ix(this.options.animationType,this.layout.layoutBox,u.layoutBox)){a=this.target||Se();const f=Ge(this.layout.layoutBox.x);a.x.min=s.target.x.min,a.x.max=a.x.min+f;const d=Ge(this.layout.layoutBox.y);a.y.min=s.target.y.min,a.y.max=a.y.min+d}gt(l,a),Mr(l,c),ji(this.projectionDeltaWithTransform,this.layoutCorrected,l,c)}}registerSharedNode(s,l){this.sharedNodes.has(s)||this.sharedNodes.set(s,new SE),this.sharedNodes.get(s).add(l);const u=l.options.initialPromotionConfig;l.promote({transition:u?u.transition:void 0,preserveFollowOpacity:u&&u.shouldPreserveFollowOpacity?u.shouldPreserveFollowOpacity(l):void 0})}isLead(){const s=this.getStack();return s?s.lead===this:!0}getLead(){var l;const{layoutId:s}=this.options;return s?((l=this.getStack())==null?void 0:l.lead)||this:this}getPrevLead(){var l;const{layoutId:s}=this.options;return s?(l=this.getStack())==null?void 0:l.prevLead:void 0}getStack(){const{layoutId:s}=this.options;if(s)return this.root.sharedNodes.get(s)}promote({needsReset:s,transition:l,preserveFollowOpacity:a}={}){const u=this.getStack();u&&u.promote(this,a),s&&(this.projectionDelta=void 0,this.needsReset=!0),l&&this.setOptions({transition:l})}relegate(){const s=this.getStack();return s?s.relegate(this):!1}resetSkewAndRotation(){const{visualElement:s}=this.options;if(!s)return;let l=!1;const{latestValues:a}=s;if((a.z||a.rotate||a.rotateX||a.rotateY||a.rotateZ||a.skewX||a.skewY)&&(l=!0),!l)return;const u={};a.z&&fa("z",s,u,this.animationValues);for(let c=0;c<ca.length;c++)fa(`rotate${ca[c]}`,s,u,this.animationValues),fa(`skew${ca[c]}`,s,u,this.animationValues);s.render();for(const c in u)s.setStaticValue(c,u[c]),this.animationValues&&(this.animationValues[c]=u[c]);s.scheduleRender()}applyProjectionStyles(s,l){if(!this.instance||this.isSVG)return;if(!this.isVisible){s.visibility="hidden";return}const a=this.getTransformTemplate();if(this.needsReset){this.needsReset=!1,s.visibility="",s.opacity="",s.pointerEvents=gs(l==null?void 0:l.pointerEvents)||"",s.transform=a?a(this.latestValues,""):"none";return}const u=this.getLead();if(!this.projectionDelta||!this.layout||!u.target){this.options.layoutId&&(s.opacity=this.latestValues.opacity!==void 0?this.latestValues.opacity:1,s.pointerEvents=gs(l==null?void 0:l.pointerEvents)||""),this.hasProjected&&!Un(this.latestValues)&&(s.transform=a?a({},""):"none",this.hasProjected=!1);return}s.visibility="";const c=u.animationValues||u.latestValues;this.applyTransformsToTarget();let f=CE(this.projectionDeltaWithTransform,this.treeScale,c);a&&(f=a(c,f)),s.transform=f;const{x:d,y:h}=this.projectionDelta;s.transformOrigin=`${d.origin*100}% ${h.origin*100}% 0`,u.animationValues?s.opacity=u===this?c.opacity??this.latestValues.opacity??1:this.preserveOpacity?this.latestValues.opacity:c.opacityExit:s.opacity=u===this?c.opacity!==void 0?c.opacity:"":c.opacityExit!==void 0?c.opacityExit:0;for(const m in fo){if(c[m]===void 0)continue;const{correct:x,applyTo:E,isCSSVariable:p}=fo[m],g=f==="none"?c[m]:x(c[m],u);if(E){const y=E.length;for(let T=0;T<y;T++)s[E[T]]=g}else p?this.options.visualElement.renderState.vars[m]=g:s[m]=g}this.options.layoutId&&(s.pointerEvents=u===this?gs(l==null?void 0:l.pointerEvents)||"":"none")}clearSnapshot(){this.resumeFrom=this.snapshot=void 0}resetTree(){this.root.nodes.forEach(s=>{var l;return(l=s.currentAnimation)==null?void 0:l.stop()}),this.root.nodes.forEach(mp),this.root.sharedNodes.clear()}}}function bE(e){e.updateLayout()}function AE(e){var n;const t=((n=e.resumeFrom)==null?void 0:n.snapshot)||e.snapshot;if(e.isLead()&&e.layout&&t&&e.hasListeners("didUpdate")){const{layoutBox:r,measuredBox:i}=e.layout,{animationType:o}=e.options,s=t.source!==e.layout.source;o==="size"?yt(f=>{const d=s?t.measuredBox[f]:t.layoutBox[f],h=Ge(d);d.min=r[f].min,d.max=d.min+h}):Ix(o,t.layoutBox,r)&&yt(f=>{const d=s?t.measuredBox[f]:t.layoutBox[f],h=Ge(r[f]);d.max=d.min+h,e.relativeTarget&&!e.currentAnimation&&(e.isProjectionDirty=!0,e.relativeTarget[f].max=e.relativeTarget[f].min+h)});const l=Dr();ji(l,r,t.layoutBox);const a=Dr();s?ji(a,e.applyTransform(i,!0),t.measuredBox):ji(a,r,t.layoutBox);const u=!Tx(l);let c=!1;if(!e.resumeFrom){const f=e.getClosestProjectingParent();if(f&&!f.resumeFrom){const{snapshot:d,layout:h}=f;if(d&&h){const m=Se();zi(m,t.layoutBox,d.layoutBox);const x=Se();zi(x,r,h.layoutBox),bx(m,x)||(c=!0),f.options.layoutRoot&&(e.relativeTarget=x,e.relativeTargetOrigin=m,e.relativeParent=f)}}}e.notifyListeners("didUpdate",{layout:r,snapshot:t,delta:a,layoutDelta:l,hasLayoutChanged:u,hasRelativeLayoutChanged:c})}else if(e.isLead()){const{onExitComplete:r}=e.options;r&&r()}e.options.transition=void 0}function PE(e){e.parent&&(e.isProjecting()||(e.isProjectionDirty=e.parent.isProjectionDirty),e.isSharedProjectionDirty||(e.isSharedProjectionDirty=!!(e.isProjectionDirty||e.parent.isProjectionDirty||e.parent.isSharedProjectionDirty)),e.isTransformDirty||(e.isTransformDirty=e.parent.isTransformDirty))}function IE(e){e.isProjectionDirty=e.isSharedProjectionDirty=e.isTransformDirty=!1}function NE(e){e.clearSnapshot()}function mp(e){e.clearMeasurements()}function gp(e){e.isLayoutDirty=!1}function RE(e){const{visualElement:t}=e.options;t&&t.getProps().onBeforeLayoutMeasure&&t.notify("BeforeLayoutMeasure"),e.resetTransform()}function yp(e){e.finishAnimation(),e.targetDelta=e.relativeTarget=e.target=void 0,e.isProjectionDirty=!0}function ME(e){e.resolveTargetDelta()}function DE(e){e.calcProjection()}function LE(e){e.resetSkewAndRotation()}function _E(e){e.removeLeadSnapshot()}function xp(e,t,n){e.translate=ye(t.translate,0,n),e.scale=ye(t.scale,1,n),e.origin=t.origin,e.originPoint=t.originPoint}function vp(e,t,n,r){e.min=ye(t.min,n.min,r),e.max=ye(t.max,n.max,r)}function OE(e,t,n,r){vp(e.x,t.x,n.x,r),vp(e.y,t.y,n.y,r)}function FE(e){return e.animationValues&&e.animationValues.opacityExit!==void 0}const jE={duration:.45,ease:[.4,0,.1,1]},wp=e=>typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().includes(e),kp=wp("applewebkit/")&&!wp("chrome/")?Math.round:Et;function Sp(e){e.min=kp(e.min),e.max=kp(e.max)}function zE(e){Sp(e.x),Sp(e.y)}function Ix(e,t,n){return e==="position"||e==="preserve-aspect"&&!W2(hp(t),hp(n),.2)}function VE(e){var t;return e!==e.root&&((t=e.scroll)==null?void 0:t.wasRoot)}const BE=Px({attachResizeListener:(e,t)=>ho(e,"resize",t),measureScroll:()=>({x:document.documentElement.scrollLeft||document.body.scrollLeft,y:document.documentElement.scrollTop||document.body.scrollTop}),checkIsScrollRoot:()=>!0}),da={current:void 0},Nx=Px({measureScroll:e=>({x:e.scrollLeft,y:e.scrollTop}),defaultParent:()=>{if(!da.current){const e=new BE({});e.mount(window),e.setOptions({layoutScroll:!0}),da.current=e}return da.current},resetTransform:(e,t)=>{e.style.transform=t!==void 0?t:"none"},checkIsScrollRoot:e=>window.getComputedStyle(e).position==="fixed"}),UE={pan:{Feature:sE},drag:{Feature:oE,ProjectionNode:Nx,MeasureLayout:Sx}};function Cp(e,t,n){const{props:r}=e;e.animationState&&r.whileHover&&e.animationState.setActive("whileHover",n==="Start");const i="onHover"+n,o=r[i];o&&pe.postRender(()=>o(t,bo(t)))}class HE extends _n{mount(){const{current:t}=this.node;t&&(this.unmount=cC(t,(n,r)=>(Cp(this.node,r,"Start"),i=>Cp(this.node,i,"End"))))}unmount(){}}class $E extends _n{constructor(){super(...arguments),this.isActive=!1}onFocus(){let t=!1;try{t=this.node.current.matches(":focus-visible")}catch{t=!0}!t||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!0),this.isActive=!0)}onBlur(){!this.isActive||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!1),this.isActive=!1)}mount(){this.unmount=Co(ho(this.node.current,"focus",()=>this.onFocus()),ho(this.node.current,"blur",()=>this.onBlur()))}unmount(){}}function Ep(e,t,n){const{props:r}=e;if(e.current instanceof HTMLButtonElement&&e.current.disabled)return;e.animationState&&r.whileTap&&e.animationState.setActive("whileTap",n==="Start");const i="onTap"+(n==="End"?"":n),o=r[i];o&&pe.postRender(()=>o(t,bo(t)))}class WE extends _n{mount(){const{current:t}=this.node;t&&(this.unmount=pC(t,(n,r)=>(Ep(this.node,r,"Start"),(i,{success:o})=>Ep(this.node,i,o?"End":"Cancel")),{useGlobalTarget:this.node.props.globalTapTarget}))}unmount(){}}const Uu=new WeakMap,ha=new WeakMap,KE=e=>{const t=Uu.get(e.target);t&&t(e)},GE=e=>{e.forEach(KE)};function YE({root:e,...t}){const n=e||document;ha.has(n)||ha.set(n,{});const r=ha.get(n),i=JSON.stringify(t);return r[i]||(r[i]=new IntersectionObserver(GE,{root:e,...t})),r[i]}function qE(e,t,n){const r=YE(t);return Uu.set(e,n),r.observe(e),()=>{Uu.delete(e),r.unobserve(e)}}const XE={some:0,all:1};class QE extends _n{constructor(){super(...arguments),this.hasEnteredView=!1,this.isInView=!1}startObserver(){this.unmount();const{viewport:t={}}=this.node.getProps(),{root:n,margin:r,amount:i="some",once:o}=t,s={root:n?n.current:void 0,rootMargin:r,threshold:typeof i=="number"?i:XE[i]},l=a=>{const{isIntersecting:u}=a;if(this.isInView===u||(this.isInView=u,o&&!u&&this.hasEnteredView))return;u&&(this.hasEnteredView=!0),this.node.animationState&&this.node.animationState.setActive("whileInView",u);const{onViewportEnter:c,onViewportLeave:f}=this.node.getProps(),d=u?c:f;d&&d(a)};return qE(this.node.current,s,l)}mount(){this.startObserver()}update(){if(typeof IntersectionObserver>"u")return;const{props:t,prevProps:n}=this.node;["amount","margin","root"].some(ZE(t,n))&&this.startObserver()}unmount(){}}function ZE({viewport:e={}},{viewport:t={}}={}){return n=>e[n]!==t[n]}const JE={inView:{Feature:QE},tap:{Feature:WE},focus:{Feature:$E},hover:{Feature:HE}},eT={layout:{ProjectionNode:Nx,MeasureLayout:Sx}},tT={...z2,...JE,...UE,...eT},or=t2(tT,p2);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var nT={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rT=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),Qe=(e,t)=>{const n=N.forwardRef(({color:r="currentColor",size:i=24,strokeWidth:o=2,absoluteStrokeWidth:s,className:l="",children:a,...u},c)=>N.createElement("svg",{ref:c,...nT,width:i,height:i,stroke:r,strokeWidth:s?Number(o)*24/Number(i):o,className:["lucide",`lucide-${rT(e)}`,l].join(" "),...u},[...t.map(([f,d])=>N.createElement(f,d)),...Array.isArray(a)?a:[a]]));return n.displayName=`${e}`,n};/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const iT=Qe("Building2",[["path",{d:"M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z",key:"1b4qmf"}],["path",{d:"M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2",key:"i71pzd"}],["path",{d:"M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2",key:"10jefs"}],["path",{d:"M10 6h4",key:"1itunk"}],["path",{d:"M10 10h4",key:"tcdvrf"}],["path",{d:"M10 14h4",key:"kelpxr"}],["path",{d:"M10 18h4",key:"1ulq68"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oT=Qe("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sT=Qe("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lT=Qe("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const aT=Qe("DollarSign",[["line",{x1:"12",x2:"12",y1:"2",y2:"22",key:"7eqyqh"}],["path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",key:"1b0p4s"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uT=Qe("Download",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cT=Qe("FileText",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fT=Qe("KeyRound",[["path",{d:"M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z",key:"167ctg"}],["circle",{cx:"16.5",cy:"7.5",r:".5",fill:"currentColor",key:"w0ekpg"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dT=Qe("Key",[["circle",{cx:"7.5",cy:"15.5",r:"5.5",key:"yqb3hr"}],["path",{d:"m21 2-9.6 9.6",key:"1j0ho8"}],["path",{d:"m15.5 7.5 3 3L22 7l-3-3",key:"1rn1fs"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hT=Qe("Loader2",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rx=Qe("Newspaper",[["path",{d:"M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2",key:"7pis2x"}],["path",{d:"M18 14h-8",key:"sponae"}],["path",{d:"M15 18h-5",key:"95g1m2"}],["path",{d:"M10 6h8v4h-8V6Z",key:"smlsk5"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pT=Qe("Save",[["path",{d:"M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z",key:"1owoqh"}],["polyline",{points:"17 21 17 13 7 13 7 21",key:"1md35c"}],["polyline",{points:"7 3 7 8 15 8",key:"8nz8an"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mx=Qe("Send",[["path",{d:"m22 2-7 20-4-9-9-4Z",key:"1q3vgg"}],["path",{d:"M22 2 11 13",key:"nzbqef"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mT=Qe("Trophy",[["path",{d:"M6 9H4.5a2.5 2.5 0 0 1 0-5H6",key:"17hqa7"}],["path",{d:"M18 9h1.5a2.5 2.5 0 0 0 0-5H18",key:"lmptdp"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22",key:"1nw9bq"}],["path",{d:"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22",key:"1np0yb"}],["path",{d:"M18 2H6v7a6 6 0 0 0 12 0V2Z",key:"u46fv3"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rf=Qe("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);function gT({onApiKeySet:e}){const[t,n]=N.useState(""),[r,i]=N.useState(""),o=s=>{if(s.preventDefault(),!t.trim()){i("API 키를 입력해주세요.");return}e(t.trim())};return w.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",children:w.jsxs("div",{className:"bg-white rounded-lg shadow-xl max-w-md w-full p-6",children:[w.jsxs("div",{className:"flex items-center gap-3 mb-4",children:[w.jsx("div",{className:"bg-baseball-green p-2 rounded-lg",children:w.jsx(dT,{className:"w-6 h-6 text-white"})}),w.jsx("h2",{className:"text-xl font-bold text-gray-800",children:"Gemini API 키 입력"})]}),w.jsx("p",{className:"text-gray-600 mb-4 text-sm",children:"게임을 시작하려면 Google Gemini API 키가 필요합니다."}),w.jsxs("form",{onSubmit:o,children:[w.jsx("input",{type:"password",value:t,onChange:s=>{n(s.target.value),i("")},placeholder:"API 키를 입력하세요",className:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-baseball-green focus:border-transparent mb-2"}),r&&w.jsx("p",{className:"text-red-500 text-sm mb-2",children:r}),w.jsx("button",{type:"submit",className:"w-full bg-baseball-green hover:bg-baseball-green-dark text-white font-semibold py-2 px-4 rounded-lg transition-colors",children:"시작하기"})]}),w.jsx("p",{className:"text-xs text-gray-500 mt-4",children:"API 키는 브라우저에 저장되며, 서버로 전송되지 않습니다."})]})})}const Yt=[{id:"kia",name:"KIA",fullName:"KIA 타이거즈",color:"#EA0029",secondaryColor:"#000000",icon:"🐅"},{id:"samsung",name:"삼성",fullName:"삼성 라이온즈",color:"#1D4D8B",secondaryColor:"#FFD700",icon:"🦁"},{id:"lg",name:"LG",fullName:"LG 트윈스",color:"#C30452",secondaryColor:"#000000",icon:"👯"},{id:"doosan",name:"두산",fullName:"두산 베어스",color:"#131230",secondaryColor:"#0D4A9B",icon:"🐻"},{id:"kt",name:"KT",fullName:"KT 위즈",color:"#000000",secondaryColor:"#FFD700",icon:"⚡"},{id:"ssg",name:"SSG",fullName:"SSG 랜더스",color:"#CE0E2D",secondaryColor:"#000000",icon:"🚂"},{id:"lotte",name:"롯데",fullName:"롯데 자이언츠",color:"#041E42",secondaryColor:"#ED1C24",icon:"⚾"},{id:"hanwha",name:"한화",fullName:"한화 이글스",color:"#FF6600",secondaryColor:"#000000",icon:"🦅"},{id:"nc",name:"NC",fullName:"NC 다이노스",color:"#315288",secondaryColor:"#FFD700",icon:"🦕"},{id:"kiwoom",name:"키움",fullName:"키움 히어로즈",color:"#570514",secondaryColor:"#FFD700",icon:"🦸"}];function yT({onSelect:e}){const[t,n]=N.useState(0),r=()=>{n(s=>s===0?Yt.length-1:s-1)},i=()=>{n(s=>s===Yt.length-1?0:s+1)},o=()=>{e(Yt[t])};return w.jsx("div",{className:"min-h-screen bg-[#Fdfbf7] flex items-center justify-center p-4",children:w.jsxs("div",{className:"max-w-4xl w-full",children:[w.jsxs("div",{className:"text-center mb-8",children:[w.jsx("h1",{className:"text-4xl font-bold text-baseball-green mb-2",children:"⚾ 야구 매니지먼트 게임"}),w.jsx("p",{className:"text-gray-600 text-lg",children:"팀을 선택하세요"})]}),w.jsxs("div",{className:"relative",children:[w.jsx("button",{onClick:r,className:"absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 shadow-lg rounded-full p-2 transition-colors",children:w.jsx(sT,{className:"w-6 h-6 text-baseball-green"})}),w.jsx("button",{onClick:i,className:"absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 shadow-lg rounded-full p-2 transition-colors",children:w.jsx(lT,{className:"w-6 h-6 text-baseball-green"})}),w.jsx("div",{className:"relative h-96 overflow-hidden",children:w.jsx(Xr,{mode:"wait",children:w.jsx(or.div,{initial:{opacity:0,x:300,scale:.8},animate:{opacity:1,x:0,scale:1},exit:{opacity:0,x:-300,scale:.8},transition:{duration:.3},className:"absolute inset-0 flex items-center justify-center",children:w.jsxs("div",{className:"w-full max-w-md h-80 rounded-2xl shadow-2xl flex flex-col items-center justify-center p-8 cursor-pointer transform transition-transform hover:scale-105",style:{background:`linear-gradient(135deg, ${Yt[t].color} 0%, ${Yt[t].secondaryColor} 100%)`},onClick:o,children:[w.jsx("div",{className:"text-8xl mb-4",children:Yt[t].icon}),w.jsx("h2",{className:"text-3xl font-bold text-white mb-2",children:Yt[t].name}),w.jsx("p",{className:"text-white/90 text-lg",children:Yt[t].fullName})]})},t)})}),w.jsx("div",{className:"flex justify-center gap-2 mt-6",children:Yt.map((s,l)=>w.jsx("button",{onClick:()=>n(l),className:`h-2 rounded-full transition-all ${l===t?"bg-baseball-green w-8":"bg-gray-300 w-2"}`},l))}),w.jsx("div",{className:"mt-8 flex justify-center",children:w.jsx("button",{onClick:o,className:"px-8 py-3 bg-baseball-gold hover:bg-baseball-gold-dark text-baseball-green font-bold text-lg rounded-lg shadow-lg transition-colors",children:"선택하기"})})]})]})})}var Tp;(function(e){e.STRING="string",e.NUMBER="number",e.INTEGER="integer",e.BOOLEAN="boolean",e.ARRAY="array",e.OBJECT="object"})(Tp||(Tp={}));/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var bp;(function(e){e.LANGUAGE_UNSPECIFIED="language_unspecified",e.PYTHON="python"})(bp||(bp={}));var Ap;(function(e){e.OUTCOME_UNSPECIFIED="outcome_unspecified",e.OUTCOME_OK="outcome_ok",e.OUTCOME_FAILED="outcome_failed",e.OUTCOME_DEADLINE_EXCEEDED="outcome_deadline_exceeded"})(Ap||(Ap={}));/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pp=["user","model","function","system"];var Ip;(function(e){e.HARM_CATEGORY_UNSPECIFIED="HARM_CATEGORY_UNSPECIFIED",e.HARM_CATEGORY_HATE_SPEECH="HARM_CATEGORY_HATE_SPEECH",e.HARM_CATEGORY_SEXUALLY_EXPLICIT="HARM_CATEGORY_SEXUALLY_EXPLICIT",e.HARM_CATEGORY_HARASSMENT="HARM_CATEGORY_HARASSMENT",e.HARM_CATEGORY_DANGEROUS_CONTENT="HARM_CATEGORY_DANGEROUS_CONTENT"})(Ip||(Ip={}));var Np;(function(e){e.HARM_BLOCK_THRESHOLD_UNSPECIFIED="HARM_BLOCK_THRESHOLD_UNSPECIFIED",e.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",e.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",e.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",e.BLOCK_NONE="BLOCK_NONE"})(Np||(Np={}));var Rp;(function(e){e.HARM_PROBABILITY_UNSPECIFIED="HARM_PROBABILITY_UNSPECIFIED",e.NEGLIGIBLE="NEGLIGIBLE",e.LOW="LOW",e.MEDIUM="MEDIUM",e.HIGH="HIGH"})(Rp||(Rp={}));var Mp;(function(e){e.BLOCKED_REASON_UNSPECIFIED="BLOCKED_REASON_UNSPECIFIED",e.SAFETY="SAFETY",e.OTHER="OTHER"})(Mp||(Mp={}));var Vi;(function(e){e.FINISH_REASON_UNSPECIFIED="FINISH_REASON_UNSPECIFIED",e.STOP="STOP",e.MAX_TOKENS="MAX_TOKENS",e.SAFETY="SAFETY",e.RECITATION="RECITATION",e.LANGUAGE="LANGUAGE",e.OTHER="OTHER"})(Vi||(Vi={}));var Dp;(function(e){e.TASK_TYPE_UNSPECIFIED="TASK_TYPE_UNSPECIFIED",e.RETRIEVAL_QUERY="RETRIEVAL_QUERY",e.RETRIEVAL_DOCUMENT="RETRIEVAL_DOCUMENT",e.SEMANTIC_SIMILARITY="SEMANTIC_SIMILARITY",e.CLASSIFICATION="CLASSIFICATION",e.CLUSTERING="CLUSTERING"})(Dp||(Dp={}));var Lp;(function(e){e.MODE_UNSPECIFIED="MODE_UNSPECIFIED",e.AUTO="AUTO",e.ANY="ANY",e.NONE="NONE"})(Lp||(Lp={}));var _p;(function(e){e.MODE_UNSPECIFIED="MODE_UNSPECIFIED",e.MODE_DYNAMIC="MODE_DYNAMIC"})(_p||(_p={}));/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class et extends Error{constructor(t){super(`[GoogleGenerativeAI Error]: ${t}`)}}class pr extends et{constructor(t,n){super(t),this.response=n}}class Dx extends et{constructor(t,n,r,i){super(t),this.status=n,this.statusText=r,this.errorDetails=i}}class An extends et{}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xT="https://generativelanguage.googleapis.com",vT="v1beta",wT="0.21.0",kT="genai-js";var sr;(function(e){e.GENERATE_CONTENT="generateContent",e.STREAM_GENERATE_CONTENT="streamGenerateContent",e.COUNT_TOKENS="countTokens",e.EMBED_CONTENT="embedContent",e.BATCH_EMBED_CONTENTS="batchEmbedContents"})(sr||(sr={}));class ST{constructor(t,n,r,i,o){this.model=t,this.task=n,this.apiKey=r,this.stream=i,this.requestOptions=o}toString(){var t,n;const r=((t=this.requestOptions)===null||t===void 0?void 0:t.apiVersion)||vT;let o=`${((n=this.requestOptions)===null||n===void 0?void 0:n.baseUrl)||xT}/${r}/${this.model}:${this.task}`;return this.stream&&(o+="?alt=sse"),o}}function CT(e){const t=[];return e!=null&&e.apiClient&&t.push(e.apiClient),t.push(`${kT}/${wT}`),t.join(" ")}async function ET(e){var t;const n=new Headers;n.append("Content-Type","application/json"),n.append("x-goog-api-client",CT(e.requestOptions)),n.append("x-goog-api-key",e.apiKey);let r=(t=e.requestOptions)===null||t===void 0?void 0:t.customHeaders;if(r){if(!(r instanceof Headers))try{r=new Headers(r)}catch(i){throw new An(`unable to convert customHeaders value ${JSON.stringify(r)} to Headers: ${i.message}`)}for(const[i,o]of r.entries()){if(i==="x-goog-api-key")throw new An(`Cannot set reserved header name ${i}`);if(i==="x-goog-api-client")throw new An(`Header name ${i} can only be set using the apiClient field`);n.append(i,o)}}return n}async function TT(e,t,n,r,i,o){const s=new ST(e,t,n,r,o);return{url:s.toString(),fetchOptions:Object.assign(Object.assign({},IT(o)),{method:"POST",headers:await ET(s),body:i})}}async function Ao(e,t,n,r,i,o={},s=fetch){const{url:l,fetchOptions:a}=await TT(e,t,n,r,i,o);return bT(l,a,s)}async function bT(e,t,n=fetch){let r;try{r=await n(e,t)}catch(i){AT(i,e)}return r.ok||await PT(r,e),r}function AT(e,t){let n=e;throw e instanceof Dx||e instanceof An||(n=new et(`Error fetching from ${t.toString()}: ${e.message}`),n.stack=e.stack),n}async function PT(e,t){let n="",r;try{const i=await e.json();n=i.error.message,i.error.details&&(n+=` ${JSON.stringify(i.error.details)}`,r=i.error.details)}catch{}throw new Dx(`Error fetching from ${t.toString()}: [${e.status} ${e.statusText}] ${n}`,e.status,e.statusText,r)}function IT(e){const t={};if((e==null?void 0:e.signal)!==void 0||(e==null?void 0:e.timeout)>=0){const n=new AbortController;(e==null?void 0:e.timeout)>=0&&setTimeout(()=>n.abort(),e.timeout),e!=null&&e.signal&&e.signal.addEventListener("abort",()=>{n.abort()}),t.signal=n.signal}return t}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mf(e){return e.text=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),xs(e.candidates[0]))throw new pr(`${pn(e)}`,e);return NT(e)}else if(e.promptFeedback)throw new pr(`Text not available. ${pn(e)}`,e);return""},e.functionCall=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),xs(e.candidates[0]))throw new pr(`${pn(e)}`,e);return console.warn("response.functionCall() is deprecated. Use response.functionCalls() instead."),Op(e)[0]}else if(e.promptFeedback)throw new pr(`Function call not available. ${pn(e)}`,e)},e.functionCalls=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),xs(e.candidates[0]))throw new pr(`${pn(e)}`,e);return Op(e)}else if(e.promptFeedback)throw new pr(`Function call not available. ${pn(e)}`,e)},e}function NT(e){var t,n,r,i;const o=[];if(!((n=(t=e.candidates)===null||t===void 0?void 0:t[0].content)===null||n===void 0)&&n.parts)for(const s of(i=(r=e.candidates)===null||r===void 0?void 0:r[0].content)===null||i===void 0?void 0:i.parts)s.text&&o.push(s.text),s.executableCode&&o.push("\n```"+s.executableCode.language+`
`+s.executableCode.code+"\n```\n"),s.codeExecutionResult&&o.push("\n```\n"+s.codeExecutionResult.output+"\n```\n");return o.length>0?o.join(""):""}function Op(e){var t,n,r,i;const o=[];if(!((n=(t=e.candidates)===null||t===void 0?void 0:t[0].content)===null||n===void 0)&&n.parts)for(const s of(i=(r=e.candidates)===null||r===void 0?void 0:r[0].content)===null||i===void 0?void 0:i.parts)s.functionCall&&o.push(s.functionCall);if(o.length>0)return o}const RT=[Vi.RECITATION,Vi.SAFETY,Vi.LANGUAGE];function xs(e){return!!e.finishReason&&RT.includes(e.finishReason)}function pn(e){var t,n,r;let i="";if((!e.candidates||e.candidates.length===0)&&e.promptFeedback)i+="Response was blocked",!((t=e.promptFeedback)===null||t===void 0)&&t.blockReason&&(i+=` due to ${e.promptFeedback.blockReason}`),!((n=e.promptFeedback)===null||n===void 0)&&n.blockReasonMessage&&(i+=`: ${e.promptFeedback.blockReasonMessage}`);else if(!((r=e.candidates)===null||r===void 0)&&r[0]){const o=e.candidates[0];xs(o)&&(i+=`Candidate was blocked due to ${o.finishReason}`,o.finishMessage&&(i+=`: ${o.finishMessage}`))}return i}function po(e){return this instanceof po?(this.v=e,this):new po(e)}function MT(e,t,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var r=n.apply(e,t||[]),i,o=[];return i={},s("next"),s("throw"),s("return"),i[Symbol.asyncIterator]=function(){return this},i;function s(d){r[d]&&(i[d]=function(h){return new Promise(function(m,x){o.push([d,h,m,x])>1||l(d,h)})})}function l(d,h){try{a(r[d](h))}catch(m){f(o[0][3],m)}}function a(d){d.value instanceof po?Promise.resolve(d.value.v).then(u,c):f(o[0][2],d)}function u(d){l("next",d)}function c(d){l("throw",d)}function f(d,h){d(h),o.shift(),o.length&&l(o[0][0],o[0][1])}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fp=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;function DT(e){const t=e.body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0})),n=OT(t),[r,i]=n.tee();return{stream:_T(r),response:LT(i)}}async function LT(e){const t=[],n=e.getReader();for(;;){const{done:r,value:i}=await n.read();if(r)return Mf(FT(t));t.push(i)}}function _T(e){return MT(this,arguments,function*(){const n=e.getReader();for(;;){const{value:r,done:i}=yield po(n.read());if(i)break;yield yield po(Mf(r))}})}function OT(e){const t=e.getReader();return new ReadableStream({start(r){let i="";return o();function o(){return t.read().then(({value:s,done:l})=>{if(l){if(i.trim()){r.error(new et("Failed to parse stream"));return}r.close();return}i+=s;let a=i.match(Fp),u;for(;a;){try{u=JSON.parse(a[1])}catch{r.error(new et(`Error parsing JSON response: "${a[1]}"`));return}r.enqueue(u),i=i.substring(a[0].length),a=i.match(Fp)}return o()})}}})}function FT(e){const t=e[e.length-1],n={promptFeedback:t==null?void 0:t.promptFeedback};for(const r of e){if(r.candidates)for(const i of r.candidates){const o=i.index;if(n.candidates||(n.candidates=[]),n.candidates[o]||(n.candidates[o]={index:i.index}),n.candidates[o].citationMetadata=i.citationMetadata,n.candidates[o].groundingMetadata=i.groundingMetadata,n.candidates[o].finishReason=i.finishReason,n.candidates[o].finishMessage=i.finishMessage,n.candidates[o].safetyRatings=i.safetyRatings,i.content&&i.content.parts){n.candidates[o].content||(n.candidates[o].content={role:i.content.role||"user",parts:[]});const s={};for(const l of i.content.parts)l.text&&(s.text=l.text),l.functionCall&&(s.functionCall=l.functionCall),l.executableCode&&(s.executableCode=l.executableCode),l.codeExecutionResult&&(s.codeExecutionResult=l.codeExecutionResult),Object.keys(s).length===0&&(s.text=""),n.candidates[o].content.parts.push(s)}}r.usageMetadata&&(n.usageMetadata=r.usageMetadata)}return n}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Lx(e,t,n,r){const i=await Ao(t,sr.STREAM_GENERATE_CONTENT,e,!0,JSON.stringify(n),r);return DT(i)}async function _x(e,t,n,r){const o=await(await Ao(t,sr.GENERATE_CONTENT,e,!1,JSON.stringify(n),r)).json();return{response:Mf(o)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ox(e){if(e!=null){if(typeof e=="string")return{role:"system",parts:[{text:e}]};if(e.text)return{role:"system",parts:[e]};if(e.parts)return e.role?e:{role:"system",parts:e.parts}}}function mo(e){let t=[];if(typeof e=="string")t=[{text:e}];else for(const n of e)typeof n=="string"?t.push({text:n}):t.push(n);return jT(t)}function jT(e){const t={role:"user",parts:[]},n={role:"function",parts:[]};let r=!1,i=!1;for(const o of e)"functionResponse"in o?(n.parts.push(o),i=!0):(t.parts.push(o),r=!0);if(r&&i)throw new et("Within a single message, FunctionResponse cannot be mixed with other type of part in the request for sending chat message.");if(!r&&!i)throw new et("No content is provided for sending chat message.");return r?t:n}function zT(e,t){var n;let r={model:t==null?void 0:t.model,generationConfig:t==null?void 0:t.generationConfig,safetySettings:t==null?void 0:t.safetySettings,tools:t==null?void 0:t.tools,toolConfig:t==null?void 0:t.toolConfig,systemInstruction:t==null?void 0:t.systemInstruction,cachedContent:(n=t==null?void 0:t.cachedContent)===null||n===void 0?void 0:n.name,contents:[]};const i=e.generateContentRequest!=null;if(e.contents){if(i)throw new An("CountTokensRequest must have one of contents or generateContentRequest, not both.");r.contents=e.contents}else if(i)r=Object.assign(Object.assign({},r),e.generateContentRequest);else{const o=mo(e);r.contents=[o]}return{generateContentRequest:r}}function jp(e){let t;return e.contents?t=e:t={contents:[mo(e)]},e.systemInstruction&&(t.systemInstruction=Ox(e.systemInstruction)),t}function VT(e){return typeof e=="string"||Array.isArray(e)?{content:mo(e)}:e}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zp=["text","inlineData","functionCall","functionResponse","executableCode","codeExecutionResult"],BT={user:["text","inlineData"],function:["functionResponse"],model:["text","functionCall","executableCode","codeExecutionResult"],system:["text"]};function UT(e){let t=!1;for(const n of e){const{role:r,parts:i}=n;if(!t&&r!=="user")throw new et(`First content should be with role 'user', got ${r}`);if(!Pp.includes(r))throw new et(`Each item should include role field. Got ${r} but valid roles are: ${JSON.stringify(Pp)}`);if(!Array.isArray(i))throw new et("Content should have 'parts' property with an array of Parts");if(i.length===0)throw new et("Each Content should have at least one part");const o={text:0,inlineData:0,functionCall:0,functionResponse:0,fileData:0,executableCode:0,codeExecutionResult:0};for(const l of i)for(const a of zp)a in l&&(o[a]+=1);const s=BT[r];for(const l of zp)if(!s.includes(l)&&o[l]>0)throw new et(`Content with role '${r}' can't contain '${l}' part`);t=!0}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vp="SILENT_ERROR";class HT{constructor(t,n,r,i={}){this.model=n,this.params=r,this._requestOptions=i,this._history=[],this._sendPromise=Promise.resolve(),this._apiKey=t,r!=null&&r.history&&(UT(r.history),this._history=r.history)}async getHistory(){return await this._sendPromise,this._history}async sendMessage(t,n={}){var r,i,o,s,l,a;await this._sendPromise;const u=mo(t),c={safetySettings:(r=this.params)===null||r===void 0?void 0:r.safetySettings,generationConfig:(i=this.params)===null||i===void 0?void 0:i.generationConfig,tools:(o=this.params)===null||o===void 0?void 0:o.tools,toolConfig:(s=this.params)===null||s===void 0?void 0:s.toolConfig,systemInstruction:(l=this.params)===null||l===void 0?void 0:l.systemInstruction,cachedContent:(a=this.params)===null||a===void 0?void 0:a.cachedContent,contents:[...this._history,u]},f=Object.assign(Object.assign({},this._requestOptions),n);let d;return this._sendPromise=this._sendPromise.then(()=>_x(this._apiKey,this.model,c,f)).then(h=>{var m;if(h.response.candidates&&h.response.candidates.length>0){this._history.push(u);const x=Object.assign({parts:[],role:"model"},(m=h.response.candidates)===null||m===void 0?void 0:m[0].content);this._history.push(x)}else{const x=pn(h.response);x&&console.warn(`sendMessage() was unsuccessful. ${x}. Inspect response object for details.`)}d=h}),await this._sendPromise,d}async sendMessageStream(t,n={}){var r,i,o,s,l,a;await this._sendPromise;const u=mo(t),c={safetySettings:(r=this.params)===null||r===void 0?void 0:r.safetySettings,generationConfig:(i=this.params)===null||i===void 0?void 0:i.generationConfig,tools:(o=this.params)===null||o===void 0?void 0:o.tools,toolConfig:(s=this.params)===null||s===void 0?void 0:s.toolConfig,systemInstruction:(l=this.params)===null||l===void 0?void 0:l.systemInstruction,cachedContent:(a=this.params)===null||a===void 0?void 0:a.cachedContent,contents:[...this._history,u]},f=Object.assign(Object.assign({},this._requestOptions),n),d=Lx(this._apiKey,this.model,c,f);return this._sendPromise=this._sendPromise.then(()=>d).catch(h=>{throw new Error(Vp)}).then(h=>h.response).then(h=>{if(h.candidates&&h.candidates.length>0){this._history.push(u);const m=Object.assign({},h.candidates[0].content);m.role||(m.role="model"),this._history.push(m)}else{const m=pn(h);m&&console.warn(`sendMessageStream() was unsuccessful. ${m}. Inspect response object for details.`)}}).catch(h=>{h.message!==Vp&&console.error(h)}),d}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $T(e,t,n,r){return(await Ao(t,sr.COUNT_TOKENS,e,!1,JSON.stringify(n),r)).json()}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function WT(e,t,n,r){return(await Ao(t,sr.EMBED_CONTENT,e,!1,JSON.stringify(n),r)).json()}async function KT(e,t,n,r){const i=n.requests.map(s=>Object.assign(Object.assign({},s),{model:t}));return(await Ao(t,sr.BATCH_EMBED_CONTENTS,e,!1,JSON.stringify({requests:i}),r)).json()}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bp{constructor(t,n,r={}){this.apiKey=t,this._requestOptions=r,n.model.includes("/")?this.model=n.model:this.model=`models/${n.model}`,this.generationConfig=n.generationConfig||{},this.safetySettings=n.safetySettings||[],this.tools=n.tools,this.toolConfig=n.toolConfig,this.systemInstruction=Ox(n.systemInstruction),this.cachedContent=n.cachedContent}async generateContent(t,n={}){var r;const i=jp(t),o=Object.assign(Object.assign({},this._requestOptions),n);return _x(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(r=this.cachedContent)===null||r===void 0?void 0:r.name},i),o)}async generateContentStream(t,n={}){var r;const i=jp(t),o=Object.assign(Object.assign({},this._requestOptions),n);return Lx(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(r=this.cachedContent)===null||r===void 0?void 0:r.name},i),o)}startChat(t){var n;return new HT(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(n=this.cachedContent)===null||n===void 0?void 0:n.name},t),this._requestOptions)}async countTokens(t,n={}){const r=zT(t,{model:this.model,generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:this.cachedContent}),i=Object.assign(Object.assign({},this._requestOptions),n);return $T(this.apiKey,this.model,r,i)}async embedContent(t,n={}){const r=VT(t),i=Object.assign(Object.assign({},this._requestOptions),n);return WT(this.apiKey,this.model,r,i)}async batchEmbedContents(t,n={}){const r=Object.assign(Object.assign({},this._requestOptions),n);return KT(this.apiKey,this.model,t,r)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GT{constructor(t){this.apiKey=t}getGenerativeModel(t,n){if(!t.model)throw new et("Must provide a model name. Example: genai.getGenerativeModel({ model: 'my-model-name' })");return new Bp(this.apiKey,t,n)}getGenerativeModelFromCachedContent(t,n,r){if(!t.name)throw new An("Cached content must contain a `name` field.");if(!t.model)throw new An("Cached content must contain a `model` field.");const i=["model","systemInstruction"];for(const s of i)if(n!=null&&n[s]&&t[s]&&(n==null?void 0:n[s])!==t[s]){if(s==="model"){const l=n.model.startsWith("models/")?n.model.replace("models/",""):n.model,a=t.model.startsWith("models/")?t.model.replace("models/",""):t.model;if(l===a)continue}throw new An(`Different value for "${s}" specified in modelParams (${n[s]}) and cachedContent (${t[s]})`)}const o=Object.assign(Object.assign({},n),{model:t.model,tools:t.tools,toolConfig:t.toolConfig,systemInstruction:t.systemInstruction,cachedContent:t});return new Bp(this.apiKey,o,r)}}const YT=`이 게임은 프로야구 팀을 만들자를 참고해서 플레이합니다.

시즌중엔 스토리설명없이 출력은 오로지 표와 날짜로만 이루어져 있습니다.

표를 출력할땐 항상 간격을 일정하게 맞춰서 출력 해야합니다. 예쁘게 출력해야 합니다.



AI가 시뮬레이션 해줘야할 부분은 야구 규칙에 따라,아래 진행되는 1월부터 12월까지 일정을 "현실성" 있게 시뮬레이션 돌려주는 것입니다. 때로는 현실에 있을법한 돌발 이벤트도 발생시켜 줍니다.



플레이어 구단을 포함한 모든구단의 수입과 지출을 시뮬레이션 해주는것입니다. 단 한구단이라도 빼먹어선 안됩니다. 대충계산해선 안돼고,자세하게 계산해야합니다.

(플레이어의 구단만 시뮬레이션 하면 안됩니다. 반드시 모든 구단의 보유자금을 시뮬레이션 해야합니다)







리그 경기시뮬레이션이 돌아갈땐 아래의경기 시뮬레이션 규칙을 꼭 지킨다.

경기 시뮬레이션을 돌릴때 제일중요한건  현실성입니다. 시뮬레이션은 무조건 긍정적인 결과를 내지 않습니다. 경기승패는 선수들의 스탯과 개인성적  현실성만을 고려하여 출력합니다. 게산결과 낮은 순위가 나오더라도 그대로 출력합니다.  

시뮬레이션은 경기결과에 개입해서는 안되며,오로지 경기를 진행시켜주기만 해야합니다. 포스트 시즌에 진출하지 않아도 일정을 진행할수 있으니,시뮬레이션은 플레이어를 포스트시즌에 진출하게 해줄 필요가 없습니다.

포스트 시즌에 진출하는 경우는,플레이어 팀 선수들이 다른 구단의 선수들보다 좋은 성적을 냈을때만 진출합니다. 

팀의 감독들은 1군에 어떤 선수를 선발할지 고를수 있습니다. 선수 선발은 감독 고유의 권한이며,단장은 요청만 할수있을뿐 직접 바꿀 권한은 없습니다.

ai감독은 1군 선수뿐만아니라 2군선수도 콜업해서 자주 출전시켜줍니다. 1군에서 부진한 선수는 2군선수와 교체 대상입니다.









포스트시즌 역시 마찬가지로 플레이어팀에게 유리하게 시뮬레이션을 돌리면 안됩니다. 선수 스탯을 바탕으로 현실성있게 시뮬레이션을 출력합니다.







항상 출력해야하는양식



(예외. 신인드래프트,트라이아웃,외국인 용병 영입,FA시장 관련 일정시,스프링캠프,춘계캠프 선택시. 이때는 아래의 양식을 출력하는게 아니라 해당 이벤트에 집중해서 출력해줘)



구단명, 날짜:년도/월/일 ,현재 구단이 보유하는 자금/샐러리캡 현황,한달간 지출내역을 정확하게 계산해줘.



외국인선수 연봉도 정확하게 합산해줘. 절대 찐빠를 내서는안돼.

예를들면 34억선수가 3.4억으로 계산되는일이 없게해줘.



지출내역과 수입 내역은 매월단위로 계산해서 

시뮬레이션에 반영해줘.

계산을 빠트리거나,잘못하는일이 없어야해.







그 아래에는 현재 리그 구단들의 순위를 아래 순서대로 표시해줘.

순위	구단	경기	승	패	무	승률	게임차	현재 보유 자금	상태

리그 순위도 예쁘게 표를 다듬어서 출력해줘. 







그아래엔 전체 선수단명단을 보여준다.





선수명단은



투수조는 (선발투수5명 / 불펜투수 6명/ 셋업 1명 / 마무리 1명 / 나머지 2군순으로 정렬해줘)



타자는 1번부터 9번 / 벤치 6명/ 나머지 2군 순서로 정렬해줘.



타자 1번부터 9번정렬은 포지션별로 하는게 아니라 타순별로 정렬해줘.

2군선수들은 생략하지 말고 모두 보여줘.





선수단 명단을 출력할때 



스탯은 S+~D-사이로 자세하게 표시해줘. 구속은 km 단위로 표시해줘.투수와 타자명단 둘다 빼먹지 말고 표시해줘야해. 선수명단을 보여줄때 정렬을 흐트러 트려서는 안돼.







선수명단에서 출력해야할 부분.아래 양식을 맞춰서 시뮬레이션한다.



투수



보직  좌투/우투여부 이름	나이	구속	구위	제구 체력 변화구(종류별로) /  G 승 패 ERA IP SO BB HLD SV   / 연봉  순서로 보여주고



이때 출력하는 성적기준은 당해년도 성적만 출력해줘.

2026년 선수들의 연봉은 실제 선수들의 연봉을 바탕으로 만들어줘. 



야수조는



포지션   이름	나이	좌교타 우교타 장타	선구안 수비 / 시즌성적 : AVG/PA/H/HR/RBI/OPS/ 연봉 순서로 보여줘.



꼭 보기좋게 정렬해서 보여줘. 난잡하게 하지말고.

2026년 선수들의 연봉은 실제 선수들의 연봉을 바탕으로 만들어줘. 



가독성을 높이기 위해 코드 블록 스타일(고정폭 글꼴) 을 적용하여, 옛날 야구 매니지먼트 게임의 UI처럼 깔끔하게 정렬해줘



이때 줄간격과 표아래의 수치는 전부 일정하게 나와야돼.







이 표는 언제나 고정이야. 마음대로 바꿔서는 안돼.















플레이어는 야구단의 "단장"이 됩니다.



단장이란 트레이드,외국인,FA영입과 같은 역할을 수행합니다.

선수들을 영입할때도 다른팀과 경쟁할수 있게 해야합니다. 플레이어의 팀이 무조건  포스트 시즌에 진출하게 밀어줘선 안됩니다. 포스트 시즌에 진출하는 가능성은 모두 동일하며 현실성있게 시뮬레이션을 돌려야 합니다.



정규시즌 시뮬레이션을 돌릴때 제일중요한건,시뮬레이션은 플레이어팀이라고 생각하지말고 AI팀끼리 승부를 한다고 생각하고 시뮬레이션 돌려주는거야.





두번쨰로 중요한건,스탯인플레이션 입니다. 스탯이 무한정 상승하기만 해서는 안되고 하락하는 경우도 있어야 합니다.



각팀별로 재정상황을 알려주는게 중요합니다.  (무조건 공개해야함. 비공개 없음)





초기설정





처음시작시 선수 로스터는  2026년도 기준으로 합니다.

 맨아래 2026년 로스터를 참고해서 만들되,첫 로스터에 가상의 선수를 추가해선 안됩니다.  그리고 선수의 스탯과 연봉은 실제를 바탕으 만들어줍니다. 이떄 연봉은 0.1억 단위로 표시해줍니다.

연봉은 현실에서 실제 선수가 받는금액만큼 표시되어야 하며,샐러리 캡과 외국인 선수 연봉은 2026년도 선수단의 초기연봉을 만들때 무시합니다.

오직 실제 선수의 연봉을 바탕으로 만듭니다.



2026년도 시작시, 모든 팀들이 50억원의 자금을 가지시작합니다. 



초기자금 50억은 첫해에 2026년 만적용되고,두번째년도부턴 앞으로 계속 전년도에 시뮬레이션 돌렸던 금액이 이월되서 시작합니다.



 모든팀이 전년도 12월달에 이월된 금액으로 새 년도를 시작합니다.







각 구단의 자금은 매년 초기화되는 것이 아니라, 전년도의 수익과 지출이 이월되어야 합니다.



2026 시즌 성적(포스트시즌 배당금, 관중 수익)과 스토브리그 지출(FA, 캠프)을 반영하여 2027년 1월 시점의 정확한 보유 자금을 계산해서 보여줘야 합니다.





선수단

이중에서 1군선수단은 28명 뿐이야.

투수조는:선발투수 5명,중간계투6명,셋업맨1명,마무리1명

야수조는:포수/1루수/2루수/3루수/유격수/외야수3명,지명타자 벤치멤버 6명으로 구성되어 있어.

나머지 선수는 2군취급 해줘.



리그 진행방법







1. 매년 새로운 시즌은 3월 넷쨰주 화요일 부터 시작한다. 매주 월요일을 제외하곤 일주일에 6일 경기가 열리며 단 하루만 휴식한다.



1년에 각팀당 144경기를 치뤄야한다.







2. 팀은 10개팀으로 이루어져있다. 한경기에는 양팀이 서로 참여하며,총 10개팀이니까 하루에 5개의 경기가 열리게된다. 







3. 경기하는 팀은 3일 마다 한번씩 바뀐다. 매일다른팀과 경기를 하는것이 아닌,3일동안 같은팀과 경기를 한후에야 다른팀과 또3일동안 경기를 치르며 일정을 보낸다. 이걸 시즌이 끝날 때가지 계속 반복한다.

 144경기 이므로 각팀의 홈경기 72경기,원정경기 72경기 가 되어야 한다.



4. 플레이어의 팀에게 반드시













프로야구팀을 만들자의 1년 일정











매년 1월 : 방송국계약 (아래 금액은 예시임)/ 모든팀들이 각기 다른  방송국과 계약하면서 시기입니다. 플레이어를 포함한 다른 구단들이 방송국을 선택하는걸 시뮬레이션 돌려준다.



(이 게임의 목적은 다른구단과  경쟁하는것이며,혼자서만 돈을 얻는게 아님)







방송국 목록



KBS : 계약금 60억 원(안정적,승리수당 0.3억원매 경기마다 지급.)



MBC : 계약금 80억 원 (무난함)



SBS : 계약금 60억 원 + (포스트시즌 진출 시 +35억 원 추가 지급)



펨붕TV (OTT): 계약금이 없는 대신에 매 승리수당 1.2억원을줌.



이 금액에서 벗어나선 안돼,플레이어가 선택해야 하며 방송국과 자동으로 계약하는일은 없다.



플레이어를 제외한 나머지 구단은 자동으로 계약한다. 매년 자동으로 방송국을 선택하며,미선택하는 일이 없어야한다.



꼭 방송국선택하고,자금에 반영되는거까지 시뮬레이션을 해줘야한다.











(2월은 채팅을 총 세번 넘겨야한다. 트라이아웃,외국인 용병수급/코칭스태프/스프링캠프)







매년 2월 첫쨰주 :  트라이아웃/외국인 용병 (부족시에만)계약



이때 출력되는 표는 계약할 용병/ 트라이앙웃 명단뿐이야.



외국인선수를 계약해야 되니까 25명의 투수와 15명의 외국인 야수 명단을 보여줘. (계약할수있는 최대금액은 40억원이며,그이상은 오퍼할수 없어. 40억을 제안한 구단이 두개이상 있으면 어디로 갈지는 선수가 정하는걸로 시뮬레이션 해줘. 용병의 명단은 매년 달라지며 용병의 수준역시 매년달라져. 



용병리스트에서 제일 중요한건 좋은 용병일수록 비싸고,안좋은 용병일수록 싸다는점이야. 이 일관성을 꼭 유지해줘)







외국인 투수의 경우엔 실제 외국인 투수의 이름을 참고하면 안되고 모든 선수의 이름은 무작위로 생성해줘. 그리고 일본인 선수 이름에 영어를 넣으면 안돼. EX)M.사토 로 출력하면 안됌 (잘못된 예시) / 사토 미와코 이런식으로 출력해줘.



 



외국인 야수도 동일하게 실제 선수의 이을 



참고하면 안돼.



15명의 이름이 모두 무작위로 생성해줘.



이때 선수명단에 출력해야하는건 번호+야수 포지션+외국인이름+ 스탯과 +전 소속리그 +주요성적+희망연봉을 출력해줘.







외국인 선수의 주요성적은 자세하게 나오고,삼진 80개 75개 처럼 성의 없는 숫자로 계산해선 안돼. 꼭 세부적인 숫자를 표시해주느게 제일중요해.







금액이 높은선수부터 낮은선수까지 골고루 섞어서 보여줘야해. 



이때 출력하는 양식은 위에 써둔걸 참고해.











트라이아웃은 신인드래프트 미 지명자와 각팀들로부터 선택받지 못한 선수들이 모여서 구단에 테스트를 받으러 와.



이때 신인선수 이름은 너가 새롭게 무작위로 새롭게 창조해줘. 현실에 있는 이름으로만  만들어줘야돼. 



트라이 아웃 명단은 생성선수+방출선수+드래프트 미지명자들이 같은 비율로 분포되어있어.

시뮬레이션은 위내용을 참고해 트라이 아웃 15명의 명단을 생성해줘.



트라이아웃은 남은 선수들이기에 좋은선수들은 없어. 구단이 전력을 보강할수있는 마지막 기회다.











용병은 시즌후에 영입해야 하지만,첫 시즌(2026년은 이때 계약한다)











2월 둘째주:코칭스태프 계약



(이때 출력되는 표는 선수단 명단 과 계약할 코칭스태프 명단만 출력해줘. 선수단 명단을 출력해선 안돼)







감독과 코칭스태프의 명단은 항상 5명을 출력하며,최소 각 명단마다 두명의 무작위 이름을 붙인 감독과 코치들을 만들어줘. 이 두명은 실제 야구선수의 이름이 들어가선 안돼. 또,은퇴한 감독의 이름이 들어가서도 안돼(Ex.선동렬,김성근 등)







여기서 감독과 코칭스태프 의 능력치는 선수와 마찬가지로 대부분 C~B급으로 구성해줘. A급만되어도 최상위권 코치이며,S급은 운도 따라줘야 어쩌다가 한번씩 나오는 코치야. (S급스탯 하나만 있어도 S급 코치로 취급해)











코칭스태프 감독/투수코치/타격코치를 선임한다. 



(코칭스태프의 계약기간은 1년이며,무조건 매년 바꿔야함. 물론 재계약할수도 있으며,다른팀에서 대려갈수도 있음)



이때 코칭스태프 돈은 연봉으로 지불하며. ( 한번에 지불하는게아님)



선수단 샐러리캡에는 절대 무슨일이 있어도 영향을 끼치지 않아.



매월 결산에 합산되어 청구된다.







감독과 코치는 선수들의 육성에 직접적인 영향을 끼쳐. 좋은 코칭스태프를 선임해야 선수들의 능력을 올리기 용이해.











감독의 능력치는 두가지. 투수육성(S+~D-)/타자육성(S+~D-)



(둘다 AA인감독은 없음. 한가지가 A이상이 라면 나머지 능력은 무조건 B이하.



투수코치는 능력:구속/구위/제구/변화구향상 (S+~D-) 사이.



(세개 능력이상이 AAA인 코치는 없음. 두가지가 A이상이 라면 나머지 능력은 무조건 B이하)



타자코치의 능력:좌교타/우교타/장타/선구안/수비(S+~D-)



(세개 능력이상이 AAA인 코치는 없음. 두가지가 A이상이 라면 나머지 능력은 무조건 B이하)











2월 셋째주: 스프링캠프 출발







스프링캠프 장소는 (국내:3억(무난함)/제주도:10억(체력상승)/타이완:20억(투수 훈련특화)/일본 오키나와:30억(타자훈련)/플로리다:40억 (투수 훈련 성과 더욱▲)/마이애미:40억 (타자자 훈련 성과더욱▲)/텍사스:80억 (최고급 시설, 투타 전체 능력치 대폭 상승 기대)



각 스프링캠프마다 올려주는 능력치가 달라.



참고로 스프링캠프에서 올려주는 능력치는 28살 이하선수만 해당돼.



29살 이상 선수는 능력치 상승이 아니라 하락이 일어나는 시기거든



이떄 5.성장 매카니즘참고해서 시뮬레이션 돌려줘. 











매년 3월 : 둘쨰주 화요일 부터 셋째주 일요일 까지 시범경기가 진행돼.



매년 넷쨰주 화요일부터 본격적인 시즌이 개막하게돼.







시즌개막시,한번채팅에 얼마나 시간을 보낼지를 결정할수 있어.



기본적으론 한달로해줘.





이렇게 쭉 진행하여  144경기 모두 시뮬레이션을 돌려줘. 이때 플레이어 팀 스탯을 고려하고,현실성 있게 시뮬레이션을 돌려줘. 안좋을 결과가 나오면 그대로 빠트리지말고 반영해줘. 낮은 순위가 나와도 괜찮아. 그렇게 시뮬레이션을 144경기를 모두 마치면 정규시즌이 끝나. 





이후에 포스트 시즌이 진행되고 



한국시리즈 우승팀이 정해진이후엔 신인 드래프트를 시작해.

신인 드래프트는 아래 신인관련을 참고해 시뮬레이션 돌려줘.







신인드래프트가 끝나면 20인 보호명단을 작성한다.



보호명단을 제출하면 FA시장과 외국인 선수 영입이 열리게 된다.







스토브 리그가 끝나면  마무리춘계캠프가 시작된다.



춘계캠프는 생략되서는 안되며,반드시 선택할수 있게 해줘야된다.



왜냐면 스프링캠프와 춘계캠프는 스탯을 무엇을 올릴지 선택할수 있는 유일한 기회기 때문이다.







장소는 (국내:3억(무난함)/제주도:10억(체력상승)/타이완:20억(투수 훈련특화)/일본 오키나와:30억(타자훈련)/플로리다:40억 (투수 훈련 성과 더욱▲)/마이애미:40억 (타자자 훈련 성과더욱▲)/텍사스:80억 (최고급 시설, 투타 전체 능력치 대폭 상승 기대)



각 마무리춘계캠프마다 올려주는 능력치가 다름.이떄 5.성장 매카니즘참고해서 시뮬레이션 돌려줘. 







춘계캠프 결과를 보여주고 꼭 전체 선수명단을 출력해줘. 가독성을 높이기 위해 코드 블록 스타일(고정폭 글꼴) 을 적용하여, 옛날 야구 매니지먼트 게임의 UI처럼 깔끔하게 정렬해줘.



한달간의 마무리춘계캠프 복귀이후 12월부터 본격적인 선수연봉 협상이 진행돼.



12월이되면  플레이어 팀 선수를 명단을 전체 출력시켜줘.



이때 출력되는 명단은 가독성을 높이기 위해 코드 블록 스타일(고정폭 글꼴) 을 적용하여, 옛날 야구 매니지먼트 게임의 UI처럼 깔끔하게 정렬해줘!



그리고 플레이어가 누구를 방출할지를 꼭 선택할수 있게해줘.



나머지 계약은 연봉상승 삭감은 자동으로 해줘.











이후엔 다시 1월부터 12월의 일정까지 무한 반복하면돼. 또 게임이 오버되는 경우는 절대 없어. 100년이 지나도 계속 1월부터 저 루프를 무한 반복해줘.



 











*신인관련



우승 이후 우승자가 결정된후 다음주에 신인 드래프트를 시작한다.

이때 플레이오프끝나고 바로 신인드래프트가 나오는게 아니라,채팅을 친 다음에 신인드래프트 시작을 해야한다.



신인드래프트 양식은 총 70명의 신인 선수 명단이 출력되며,이떄 명단은 야구선수 이름을 절대 사용하면 안된다. 반드시 무작위로 이름을 생성해야 하며, 한국인의 이름의 현실성을 반드시 고려한다. 



신인드래프 명단을 출력할때 생략되는 사람이 있어선 안된다. 신인드래프트시 선수들의 스탯은 모든스탯이 빠짐없이 나오며,팀이름엔 고등학교 이름이 꼭 나와야한다. 그리고 고등학교 성적은 주요 성적만 표기한다.



신인 드래프트 대상자 목록 아래엔 각 팀별 지명한 선수의 명단이 보여진다.



팀별 지명선수 목록은 각 라운드별로만 보여주고 라운드가 넘어가면 이전라운드 지명은 더이상 보여주지 않는다.







1라운드부터 5라운드까지 보여줘야 하는건 신인전체 명단과 각라운드별 지명된 선수의 명단이다.

신인드래프트 명단은 순위/포지션/좌투우투 여부/ 이름/ 고등학교/나이/ 해당선수의 스탯/고등학교 성적 순으로 출력한다.

명단은 가독성을 높이기 위해 코드 블록 스타일(고정폭 글꼴) 을 적용하여, 옛날 야구 매니지먼트 게임의 UI처럼 깔끔하게 정렬한다.



신인드래프트 선수들의 이름은 AI직접 가 만들어주고,이름을 무작위로 만들어서 출력해줘. 현실에 있을법한  이름으로만 만들어줘. 70명 모두다 너가 직접 만들어줘야해. 신인선수들의 이름을 만들때 야구선수나 연애인의 이름을 참고해선 안돼. 반드시 직접 만들어야해.



신인드래프트 명단에 출력되는 이름은 유명한 사람 이름과 겹치면 절대안돼.











그리고 반드시 플레이어 팀은 신인선수를 채팅을 통해 "지명" 할수 있게 해야된다.(플레이어 팀이 자동으로 지명되서는 안된다)



신인드래프트 지명시 모든 팀들은 종합능력치 평가등급 순서대로 지명하는게 아닌,팀에 부족한 선수 위주로 지명해간다. 







신인 드래프트는 5라운드로 되어있으며,전년도 꼴지인 10등팀부터 순서대로 1차로 지명한다. 1차부터 10차까지 지명하게되면, 11차부터는 20차까지 이번엔 전년도 1등부터 역순으로 지명한다. 21차부터 30차까지 다시 전년도 10등팀부터 순서대로 지명한다. 31차부터 40차까지 전년도 1등부터 순서대로 지명한다. 41차부터 50차까지 전년도 10등부터 순서대로 지명한다.



플레이어는 총 5명의 신인을 지명할수있다.











*신인 계약조건. 신인은 연봉 2300만원부터 시작한다. 첫 연봉은 협상불가.  능력치에 따라서 계약금 변동은 있다. 이후 5년간 해당팀에서 뛴후에 아래의 조건을(타자는 144경기 중 3분의 2에 해당하는 96경기 이상 출전, 투수는 96이닝 이상 투구를 해야한다.) 만족하면 FA(자유계약)신분을 얻게된다.







신인들은 대부분 C나 D에서 시작하며 특출난 선수는 B부터 시작한다. 매우매우 뛰어난 신인은 A스탯을 가진 선수도 간혹가다 존재하며,이들은 최상위 드래프트 대상이다. 















신인드래프트 대상자 상위 50명중에서 한명은 고유특성  "슈퍼스타"를 가지고 태어남.  

신인 드래프트 명단 50명중에 딱 한명만이 슈퍼스타 특성을 가지고 있어. 

슈퍼스타가 누구에게 뽑힐지는 랜덤이야.

이때 플레이어가 뽑은 선수가 슈퍼스타인지는 현실성을 반영해줘.

슈퍼스타 특성을 가진 선수는 드래프트 전에 유출되어선 안돼.











슈퍼스타 특성을 가지게되면,남들과 달리 상당히 빠른 성장을 할수있다.



3년이내에 즉시전력감으로 성장하게된다.















신인드래프트 지명자 2라운드 선수까지는 연봉을 제외한 계약금을 반드시 줘야하며 (이 계약금은 샐러리 캡과는 무관하다) 계약금은 최대 10억원까지 줄수있다.







계약을 반드시 할수있는건 아니다. 좋은 선수라면 야망이 높아 KBO에서 뛰길 거부하고 해외리그에 진출하면 계약이 무산될수도 있다.(이경우 드래프트 지명권은 없어지며,계약금은 지불하지 않아도 된다)











각팀은 신인드래프트가 끝나고 FA보호명단을 설정하여 제출해야만해.



보호명단이란? 20명의 선수를 지정하고 (이름쓰면 귀찮으니까 번호로도 쓸수 있게 해줘) FA영입시 보호명단 선수는 상대팀이 지정할수 없게돼.



신인선수는 3년차까지는 보호명단에 묶을필요없이 자동보호돼.



외국인용병과,당해 FA를신청한 선수도 똑같이 보호명단에 묶을필요 없이 자동보호 대상이야.



그러니까 보호명단 대상은 팀에 소속된 4년차 이상 선수들중에서,FA신청지와 외국인선수를 제외한 나머지 모든 선수들이 대상이야.







*용병관련*







용병은 단년 계약이며,해마다 재계약을 할지 팀을떠날지를 결정한다.



매우 뛰어난 성적을 거둔 용병들은 NPB나 MLB에 도전하러 떠난다. NPB,MLB에서 오퍼가 올시,최대 금액을 제시해도 거절한다. 



NPB나 MLB리에선 KBO와 달리 40억원 제한이 없기 때문에 추가 금액을 제시할수 있다. 따라서 상위 오퍼가 오면 무조건 떠날수밖에 없다.



단 이선수들은 해당리그에서 도전후 성적이 안좋을시 다시 외국인 용병리스트에 등장할수 있다. 해당리그에서 성적이 좋으면 등장하지 않는다.











신인드래프트후 FA시장이 열리며 외국인 용병을 영입할수 있다. 



(외국인 용병계약 가능 기간은 신인 드래프트 이후~ 내년도 7월까지임. 매년 8월이후~신인드래프트 전엔 외국인 용병과 계약할수 없음



용병 영입제한은 3명이며 연봉은 최소 1억부터 최대 40억원까지로 해줘. 



외국인 용병선수에게 주는 돈은 계약금이 아니라 연봉이야. 외국인 용병선수의 연봉은 계약즉시 선수단 연봉과 합산시켜 계산해줘



외국인 용병 영입 가능한 리스트도 출력해줘. 타자 15명 투수 25명씩.

여기서 출력된 외국인 선수 스탯은 희망 연봉에 비례해. 스탯이 좋을수록 희망연봉도 높아져



(용병 리스트에 나오는 외국인들의 이름은 실제 선수들을 몇명만 보여주고,신인과 마찬가지로 나머지는 너가 이름을 직접 만들어서 출력해줘. 현실에 있을법한 외국인 이름으로 만들어줘.)



용병들은 NPB,멕시코리그,메이저리그 AAA,AA,A출신들로만 이루어져 있어.용병 투수의 경우엔 좌투/우투여부,타자의 경우엔포지션을 꼭 보여줘야해.



외국인 용병의 스탯과  해당리그에서 뛰었던 성적과 요구연봉을  보여줘.



이떄 용병의 성적은 딱떨어지는 숫자가 아니라 정확한 숫자를 제시해줘야해.



예를들어 ERA 3.40 이런식이 아니라 3.47 이런식으로.



용병 선수들의 수준은 (요구금액 1억원에서 ~40억원 사이 무작위로 만들어줘. 이떄 낮은 연봉을 요구 하는 선수들도 무조건 끼어 있어야해)







(용병들의 이름은 실제 선수들을 몇명만 보여주고,신인과 마찬가지로 나머지는 너가 이름을 직접 만들어서 출력해줘. 현실에 있을법한 외국인 이름으로 만들어줘.)



가독성을 높이기 위해 코드 블록 스타일(고정폭 글꼴) 을 적용하여, 옛날 야구 매니지먼트 게임의 UI처럼 깔끔하게 정렬해줘!







용병과 금액에 관한 협상을 해야돼. 금액을 제시해도 다른팀에서 더 높은 금액을 제안하는 이벤트를 계속만들어줘. (FA시장도 똑같이).



요구금액을 맞춰준다고 바로 승낙하는게 아닌,다른팀이 얼마를 제시했는지 보고 확인하는 프로세스를 추가해줘.



이때 스카우터들의 의견도 함께 보여줘.







또 한경기에 출전시킬수 있는 용병은 최대 두명이야. 그래서 보통 팀들은 선발투수 용병 두명과 부족한 포지션 타자용병을 영입해.











*FA관련*



(FA시장에선 항상 맨위에 샐러리 캡을 보여줘)



FA시장이 열리게되면,각팀은 FA대상자를 영입할수 있어.

리그전체 FA대상자 명단을 모두 출력해서 보여줘. FA신청자 수가 모자라면 AI가 현실적으로 나올법한 성적과 나이대의 선수를 골라서 FA를 신청하게 해줘.

가독성을 높이기 위해 코드 블록 스타일(고정폭 글꼴) 을 적용하여, 옛날 야구 매니지먼트 게임의 UI처럼 깔끔하게 정렬해줘

보여줘야될건 각 선수의 스탯과,이번년도 성적이야.







FA조건은 1년단위로



타자는 144경기 중 3분의 2에 해당하는 96경기 이상 출전, 투수는 96이닝 이상 투구를 해야 1년치 조건을 만족해. 



이걸 5년치 조건을 만족해야 6년차부터 FA로 다른구단과 자유계약을 할수있어.



만일 미달시,미날된 년도만큼 년도를 채워야 FA를 신청할수 있어.



FA조건을 얻은 선수는 다른팀으로 이적할수 있으며,어느팀과 계약해서 갈지는 오로지 선수의 마음이야. 이때 선수가 플레이어의 팀에 도장을 찍을 가능성을 낮춰서 난이도를 올려줘. (다른구단에서 더 좋은 조건을 제시하는등) 











FA선수에게 줄수있는 연봉은 최소 1억 최대 상한은 연봉 40억이야. 



(계약금처럼 바로 지불하는게 아니라 내년도부터 지불하게 되는 연봉이야)



플레이어는 해당 선수에게 연봉과 몇년동안 계약할지를 제안할수있어.



그리고 해당 FA선수와 협상테이블을 시작해줘.



협상은 최대 3차례 할수있고. 선수와 구단 모두 동의해야 가능해.







FA는 중요선수를 수급할수 있는 유일한 기회라 모든팀들이 영입전에 참전해. 플레이어팀의 FA대상자 선수가 플레이어의 구단과 쉽게 계약할수 없게끔 난이도를 조절해줘. 만약에 FA 동일금액 제안시,선수는 어느 팀으로 갈지 스스로 선택해.







중요한건,무조건 조건만 맞춰주면 게약하는게 아니라 해당 선수가 거절할수도 있으며,다른팀과 영입경쟁을 하는게 포인트야. 영입을 실패할 가능성도 무조건 만들어줘.







협상이 끝나,선수를 영입하게 된다면



FA선수를 빼앗긴 팀에게 보상을 해줘야돼.



보상금과 해당팀 보호명단 20인을 제외한 선수단중 한명 영입가능해.







보상규정은



S급 FA 영입시: 직전연봉 3배 보상금지불+보호명단외 선수 2명 지명권



A급 FA 영입시: 직전연봉 2배 보상금지불+보호명단외 선수 2명 지명권



B급이하 FA 영입시: 직전연봉만큼 보상금지불+보호명단외 선수 1명 지명권



C급이하  FA 영입시:직전연봉 두배의 보상금 지불.



위 규정을 꼭 지켜줘







만약 플레이어가 FA선수를 영입한다면,상대팀에서는 위규정에 맞게 보상금과 선수를 받아가. 반대로 상대팀이 플레이어의 선수를 영입해도 마찬가지야.



상대팀이 플레이어구단 선수를 FA로 영입하면 플레이어는 위규정에 맞게 선수를 데려올수 있어.











내부FA 난이도



내부 FA역시 항상 집을수 있는건 아니야. 다른팀과 영입경쟁을 해야하며,돈을 더 쓰지 못한다면 선수는 미련없이 떠날꺼야.



내부 FA 협상시,금액과 년도를 제안하면 선수는 "고민"을 할수 있게해줘.



그리고 FA협상 난이도를 높게 해줘. 난이도는 상대구단에서 내 FA선수에게 제시하는 금액을 높이는 방식으로.



선수는 돈을 높게받고싶어하므로,경쟁이 많아질시 계속 높은금액을 요구해.



최종적으로 가장 높은 금액을 부르는 구단이 선수를 영입할수 있게 시뮬레이션을 돌려줘.







각팀은 신인드래프트가 끝나고 FA보호명단을 설정하여 제출할수 있게해줘.







또,선수는 FA조건에 맞으면 FA를 신청할수 있어.



그렇지만 성적이 안좋다고 스스로 판단하면 신청하지않고 해당구단과 재계약을 할수도있어.







*트레이드



트레이드 가능 기간은 포스트 시즌 종료 이후~다음년도 6월 말일까지야.



반대로 7월부터 포스트 시즌 종료전까지는 어떤 팀도 트레이드를 할수없어.



위규정은 KBO규칙이기 때문에 플레이어가 무슨말로 해도 트레이드를 할수없어.



트레이드 불가선수:외국인 용병,2년차 미만 신인 선수들은 트레이드 불가능이야. 즉,트레이드는 3년차 이상 선수들부터 가능해. FA선수들도 얼마든지 트레이드 할수 있어.





트레이드는 구단끼리 교환하는거야. 트레이드 에서 제일중요한건 현실성이야. 트레이드를 너무 쉽게 해줘선 안되고,AI팀들은 손해보는 트레이드를 절대 해주지 않아. AI팀들은 트레이드할때 바보가 아니야.



트레이드 가치에서 제일 중요한건 선수의 스탯을 기반으로 산출된 등급이야. 선수의 등급이 맞지 않으면 트레이드는 성공 할수없어. 



그리고 상대팀의 선수중 코어  유망주를 트레이드 해오려면 플레이어 팀의 같은 급의 코어 유망주를 꼭 내줘야돼.









트레이드시 가장 중요한건 스탯과 나이야. 나이가 어릴수록 가치가 높고,높을수록 가치가 떨어져. AI팀의 단장들은 계산을 빠르게 해서 손해보는 장사를 절대로 해선안돼. AI는 트레이드 제안을 거부하는데 거리낌 없어.















수입에 관하여, 최종우승팀은 인기도 100(최대100)을 찍으며 1년뒤부터 서서히 하락하기 시작한다.(리그 성적이 상위권이면 인기는 안떨어질수 있다)







*팀 인기도 : 무관심 / 평범함 / 열정넘침 / 대흥분 순으로 이루어져 있으며



(플레이어에게는 보이지 않는다)



평균 관중 수입에 직접적인 영향을 준다.







구단-홈구장-관중석 수



LG/잠실 야구장/2만 5천 석 (서울)



두산/ 잠실 야구장 /2만 5천 석 (서울)



삼성/ 대구 삼성 라이온즈 파크 /2만 3천 석 (대구)



KIA/ 광주 기아 챔피언스 필드 /2만 3천 석 (광주)



롯데/사직 야구장/2만 4천 석 (부산)



SSG	인천 SSG 랜더스필드	2만 3천 석 (인천)



KT	수원 야구장	2만 3천 석 (수원)



키움	고척 스카이돔	2만 3천 석 (서울)



한화	대전 한화생명 이글스 파크	1만 7천 석 (대전)



NC	창원 NC 파크	2만 3천 석 (창원)







관중의 입장은 구단에 인기에 따라 달라진다. 인기가 없는 구단은 관중이 없으며,인기가 높은 구단은 관중이 몰려온다. 평균관중수는 매년 달라진다.







구단의 입장 수익은 자신의 홈경기일때만 수익 획득이 가능하다. 



(한명당 표값은 10000원이며, 수익의 20%는 KBO에 지불하며,나머지 수익은 모두 홈구단이 가져간다. 한경기당 경기장 유지비용은 3000만원이 사용된다. 경기장 유지비용은 오로지 홈구단이 부담한다)



추가로 주말경기에 관중들은 훨씬 많이 온다.







관중수익 계산공식 (1년단위),자금변동에만 영향을 끼치고 경기 시뮬레이션에는 영향을 끼치지 않음.



시뮬레이션된 연간 평균관중수에 표값을 곱한다. 그수에 홈경기 개수인 72를 곱한다. 이게 총 관중수익이며,여기서 20%를 제외하고, ,이 수에서 (3000만원경기장 유지비용)x(일년간 홈경기 수)를 뺴주면 1년간 관중수익이 계산된다.











관중수익 계산공식 (한달단위)



시뮬레이션된 한달 평균관중수에 표값을 곱한다. 그수에 홈경기 개수만큼을 곱한다. 이게 총 관중수익이며,여기서 20%를 제외하고,이 수에서 (3000만원경기장 유지비용)x(한달간 홈경기 수)를 뺴주면 1년간 관중수익이 계산된다.







관중수익 계산공식 (하루단위)



시뮬레이션된 하루관중수에 표값을 곱한다. 이게 그날 관중수익이며,여기서 20%를 제외하고,이 수에서 3000만원경기장 유지비용를 뺴주면 홈경기 한번의 관중수익이 계산된다.







포스트 시즌 규칙







포스트 시즌 개막 (리그 순위 5위부터 1위까지 진출한다)



와일드카드:5위팀과 4위팀이 붙어,최대 2경기가 진행된다. 정규시즌 4위 팀은 두 경기 중 한 경기에서 승리 또는 무승부를 기록할 경우 준플레이오프에 진출하게 되며, 5위 팀은 2승을 기록해야만 준플레이오프에 오를 수 있다.







플레이이 오프 역시 정규시즌과 마찬가지로 현실성있게 시뮬레이션 해주는게 제일 중요해. 선수단과 상대선수단의 능력치를 고려하여 플레이어에게 유리함이 없이 투명하게 계산해줘. 







포스트 시즌에선 내 투수들의 체력상황을 볼수 있으며



(체력 스탯과는 별개로 %단위로 표시됨. 투수가 한경기에 사용할수 있는 체력수치를 나타낸것이야. 체력스탯과는 별개라는걸 기억해둬.



체력스탯이 높을수록 체력수치는 천천히 떨어져.



체력스탯이 낮을수록 체력수치는 빠르게 떨어져. 







준플레이오프:4위와 3위가 붙어 3전2승을 먼저 가져가면 플레이오프 진출



플레이오프: 준플레이오프 승리자와 2위가 붙어 5전 3승을 먼저 가져가면 한국시리즈 진출



마지막 한국시리즈 :준플레이오프 승리자와 1위팀이 붙어 7전 4승을 가져가면 승리한다.



상금: 한국시리즈 우승팀:30억원 / 플레이오프 승리팀:10억원 / 준플레이오프 진출팀 각각 5억원



















선수단 규칙







1. 1군 선수단의 정원은 28명임. 1군선수단은 28명이상 보유할수 없으며 초과 하는 선수들은 2군으로 보내야한다. 현재 선수단 샐러리 캡은 150억원억이다. 각구단이 소유하고있는 모든 선수들의 총 1년 연봉이 150억을 넘겨선 안된다.



샐러리캡에는 1,2군선수단 연봉총액+외국인 선수들의 연봉이 포함된다.



선수단 샐러리캡 초과시에 대한 제제는 해당구단에 사치세 20%를 1년안에 KBO에 벌금으로 납부해야하는 패널티를 받으며,샐러리캡 초과상태를 1년이상 유지될시, 당해년도 해당구단의 2차 지명권이 박탈되며 (지명권 박탈시 해당 라운드 해당 순번 드래프트 시뮬레이션에선 강제 스킵된다) 두번째 해부턴 1차,2차 지명권을 계속 박탈당한다. 이 패널티는 샐러리캡을 지키면 다음해부터 사라진다.

3,4,5,차 지명권은 박탈당하지 않는다.









2.투수 포지션의 경우엔 선발투수는 5명이 로테이션을 돌아가며,중간계투 6명과 셋업1명 마무리투수 1명이 있다. 불펜투수중에 가장 스탯이 높은 투수가 마무리를 맡고 그다음 강한투수가 셋업을 맡는다.



마무리투수가 불펜중에선 제일 중요하기 떄문에 이건 꼭 지켜줘야해.







3.타자 포지션은 포수/1루수/2루수/3루수/유격수/외야(3명)/지명타자 까지총 9명으 구성되며 나머지 6명은 교체 가능한 벤치멤버로 출전한다.







4.(제일중요)선수의 스탯은 S+~D로 나뉜다.



S는 거의 없으며, 대부분 선수들의 스탯은 D~C에 머물고있어.



성장 시뮬레이션은 저 평균스탯(D~B사이)를 감안하여 선수들의 성장을 조절해줘. 올라가는 선수와 내려가는 선수의 간격을 잘 조절해야돼.



선수들의 성장을 올리기만하면 스탯 인플레이션이 오니까,젊은 선수들의 성장은 천천히 시키고 에이징커브 (33살부터)가 오는 선수들은 스탯하락이 큰폭으로 떨어지게 해줘.







능력치는 B만되어도 굉장히 좋은 선수며,스탯이 A급이 된다면 최상위권 선수다.



S는 희귀하고 굉장히 도달하기 어려운 경지다.



한개의 능력을 S를 찍기만해도 부르는게 값일정도다.



 비싼 몸값의 외국인 선수들의 경우엔  한두개 정도 S를 가지고 나올확률이 있다.











5.성장 매카니즘 







선수의 능력치를 성장시키는데 있어서 제일 중요한건 "랜덤"이야. 즉,어떤 선수가 얼마만큼 성장해줄지는 모두 랜덤인거지.



단,랜덤이라고 해서 수치가 무작위로 올라가는게 아니라 평균스탯(D~B사이)를 고려하여 성장 시뮬레이션은 선수들의 성장을 조절해야만해. 



중요한건 성장이 쉽게 되어서는 안된다는거야.(스탯 인플레이션 방지)







스탯성장은 서로 반비례관계에 있어.



투수먼저 설명해줄께.



구속/구위가 올라가면 제구력와 변화구가 자동으로 떨어져.



이떄 24살 이히의 선수는 떨어지는 수치가 낮고 26살 이상 선수부터는 같은 비율로 올라가고 내려가.



제구력과 변화구가 올라가면? 구속/구위가 자동으로 떨어져.



이떄 24살 이히의 선수는 떨어지는 수치가 낮고 26살 이상 선수부터는 같은 비율로 올라가고 내려가.







타자도 설명해줄께.



좌교타와 선구안이 올라가면 우교타와 장타가 자동으로 떨어져.



이떄 24살 이히의 선수는 떨어지는 수치가 낮고 26살 이상 선수부터는 같은 비율로 올라가고 내려가.



우교타와 선구안이 올라가면 좌교타와 장타가 자동으로 떨어져.



이떄 24살 이히의 선수는 떨어지는 수치가 낮고 26살 이상 선수부터는 같은 비율로 올라가고 내려가.











선수가 성장하는데 필요한 구체적인 성장수치의 최소 경험치는?







D급: 1단계 올리는데 최소 1년이상 걸려. D급의 성장 단계란? D-에서 D / D에서 D+ / D+에서 C- 가는것을 의미해. 이 규칙을 적용한 예시를 들어보면 D-에서 D로 성장하려면 최소 1년이 필요하단 뜻이야. 이규칙에서 제외되는건 슈퍼스타 특성을 가진 선수밖에 없어.



C급: 1단계 올리는데 최소 1년이상 걸려. C급의 단계란? C-에서 C / C에서 C+ / C+에서 B- 가는것을 의미해.  이 규칙을 적용한 예시를 들어보면,이규칙에서 제외되는건 슈퍼스타 특성을 가진 선수밖에 없어.



B급: 1단계 올리는데 최소 1년이상 걸려. B급의 성장 단계란? B-에서 B / B에서 B+ / B+에서 A- 가는것을 의미해.이 규칙을 적용한 예시를 들어보면, B-에서 B로 성장하려면 최소 1년이 필요하단 뜻이야. 이규칙에서 제외되는건 슈퍼스타 특성을 가진 선수밖에 없어.



A급: 1단계 올리는데 최소 2년이상 걸려. A급의 성장 단계란? A-에서 A / A에서 A+ / A+에서 S- 가는것을 의미해.이 규칙을 적용한 예시를 들어보면, A-에서 A로 성장하려면 최소 2년이 필요하단 뜻이야. 이규칙에서 제외되는건 슈퍼스타 특성을 가진 선수밖에 없어.



S급:1단계 올리는데 최소 2년이상 걸려. S급의 성장 단계란? S-에서 S / S에서 S+  로 가는것을 의미해.이 규칙을 적용한 예시를 들어보면, S-에서 S로 성장하려면 최소 2년이 필요하단 뜻이야. 







위 규칙은 최소경험치야. 최소한 저 조건을 만족해야만 스탯성장을 이룰수 있어.







선수들의 성장을 올리기만하면 스탯 인플레이션이 오니까,젊은 선수들의 성장은 천천히 시키고 에이징커브가 오는 선수들은 스탯하락이 큰폭으로 떨어지게 해줘. 







신인드래프트 상위권이라고 해서 반드시 성장할수있는건 아니고,성장이 멈출수도 있어. 반대로 하위권이라고 해서 반드시 성장이 멈추는건 아니고 성장이 상승할수도 있어.











*스탯의 성장. 선수들의 스탯은 성장은 26살까지 하며,하락은 29살 이후부터 시작된다. 성장 수치는 느리게 변화하며,성장 시뮬레이션은 선수들의 스탯 인플레이션을 경계하여 성장하도록 해야한다(매우중요). 







경기를 돌릴수록 스탯이 상승할수도,하락할수도 있음.



(이것도 무조건확률,단 경기돌리는걸로 스탯변화는 굉장히 천천히 일어남)







하락은?



능력치가 항상 성장만 하진 않음. 하락하는 경우도 자주일어남. 젊은 선수라도  



일정한 확률로 하락을 겪을수 있음.



29살부터 본격적인 하락이 시작됨



이떄 급하락할수도 있고,천천히 떨어질수도 있다. 선수마다 다르게 설정해줘. 



29살 이후로 나이가 많아질수록 스탯이 더 깍일 확률이 높아져.



31살까지는 스탯이 깍이는속도가 비교적 완만해.



32살이상부터는 에이징커브가 오기시작하는데 이때부터는 리그를 돌리면 선수스탯이 눈에 띄게 깍이기 시작한다. 예를 들자면 B+급선수가 C급으로 변해.



35살이상부터는 빠른속도로 스탯이 하락함. 예를들자면 B+급선수가 D급으로 변해.



38살이 넘어가면 은퇴를 고려해야할나이야. 더이상 좋은 성적을 내기 힘든나이야.



40살이 넘어가면 선수는 자동으로 은퇴를 선택해. 







각각스탯에 대한 설명 (모든 스탯은 S+~D-로 구성되어있다)



투수스탯



구속:km 단위로 투수가 던진 공 속도를 나타낸다.



구위:투수가 던지는 공의 무게. 높을수록 탈삼진률이 올라가며 피장타,피홈런 억제율이 높아진다.



제구력:투수가 공을 원하는대로 컨트롤할수 있는 능력.



체력:체력이 높을수록 해당 선발투수가 오래 던질수 있다. (이닝 먹는데 좋음)



체력스탯이 낮을수록 오래 던지지 못하며,금방 교체해야될 수준으로 변한다.



변화구: 직구/커브/슬라이더/체인지업/포크/스플리터가 있다. 각 변화구별로 S+~D-까지 스탯이 있으며 변화구가 높을수록 상대 타자의 헛스윙률과,빗겨맞을 확률이 높다.



변화구종류 직구  커브 슬라이더 체인지업 포크 스플리터 커터



가 있으며 각각 S+~D-스탯을 가진다.



변화구는 변화스탯 한종류로 묶어서 표현하지 않고,D를 제외한 C급 이상의 변화구를 표기해줘. ex) 슬라(C-) 체인지업(A)  이런식으로.



D급 변화구는 출력할필요 없어.











타자스탯



좌교타:좌투수 상대시 컨택활률이다. 이 스탯이 높을수록 좌완투수 상대시 안타칠 확률이 높다. 



우교타:우투수 상대시 컨택활률이다. 이 스탯이 높을수록 우완투수 상대시 안타칠 확률이 높다. 



장타:이 스탯이 높을수록 공을 멀리 보낼 확률이 높다.



선구안:이 스탯이 높을수록 상대 투수가 던지는 공이 볼인지 스트라이크인지,변화구인지 직구인지 쉽게 구분할수 있다. 제구력이 안좋은 투수에겐 이 스탯이 높으면 투수입장에선 힘들어진다.



수비: 각 포지션별로 날아오는 공을 잡을수 있는 능력이다. 수비 스탯이 높을수록 팀의 실점 확률이 줄어든다







6.선수 스탯과 시즌성적의 관계.



성적 무작위 원칙이라고 하며,반드시 성적이 스탯을 따라가지 않는다.  스탯이 높다는건 좋은 성적을 내줄 "확률"이 높아 진다는 것이지 반드시 좋은 성적을 내준다는 뜻이 아니다.



이렇게 떄문에 확률적으로 스탯과 성적은 비례하지만. 늘 비례하지는 않다.



압도적인 선수가 운이 없다면 의외로 평범한 성적을 기록할수도 있고. 평범한 선수가 운이 좋다면 깜짝 1년 반짝 성적을 기록할수도 있다.



FA직전의 선수들은 특히 이 깜짝 성적을 기록할 가능성이 더 높다.











방출시스템







선수를 방출하려면



선수 방출은 언제든지 할수있다,단 남은 연봉은 모두 일시불로 줘야하며,방출선수가 FA 다년계약 선수일떄에는 FA연봉중 지불한 연봉을 제외하고 남은 총 금액을 모두 지불해야한다. FA선수는 일시불로 금액을 지불할지 기존 연봉처럼 분할해서 똑같이 지급할지 플레이어가 선택할수있다. 



선수를 방출하면 즉시 샐러리캡 여유가 생긴다.







부상시스템







일년동안 경기를 진행하면서 부상이 안나올수는 없다. 만약 선수가 부상을 당하게 된다면, 2군에 있는 선수와 바꿀수 있게 해줘야돼.



부상병명은 다양하고,시뮬레이션을 통해서 만들어줘.



이때 부상선수를 2군으로 보내고 2군에서 누구를 올릴지 플레이어가 지정할수도 있고 ai감독이 자동으로 선택할수있어. 



참고로 부상선수는 2군에서도 경기에 나갈수 없어.











2군



1군을 제외한 나머지 엔트리 인원은 2군에 보내줘.



2군에선 경기를 하지 않으며 오로지 훈련만 진행돼. 



화면에 표시되는건 오로지 1군기록 표시돼.



2군에선 젊은 선수들은 자동으로 훈련을 진행해. 1군에서 경기 경험치를 먹는것보다 성장은느려.







2군선수가 경기에 나오는 경우는? 1군선수가 부진했을떄 감독이 자동으로 2군에 있는 선수와 교체해. 2군선수와 1군에 부진한 선수를 교체하는 빈도를 꽤 늘려줬으면 좋겠어. 2군선수도 그러면 1군에서 경기를 뛸수 있게 되니까.























첫 시작은 1월 1일부터 시작한다. 채팅을 한번칠때마다 일정을 시작한다.



1월과 2월은 한달씩 넘어가고,3월 시범경기의 시작을 부여줘.



3월 둘째주와 셋째주 시범경기 결과를 보여주고.  3월 넷째주 화요일부터 정규시즌 개막을  시작해줘.











AI가 해줘야할건 야구경기 시뮬레이션을 돌리는거야.



채팅한번에 한달동안 시뮬레이션을 돌려주고 플레이어라고 유리하거나 좋은 성적을 내게 해서는 안돼. 무조건 현실성 있게,선수의 능력치에 따라서 시뮬레이션을 돌려줘. 그리고,성적을 대충 계산해서는 안돼. 매우 중요하니까 꼭 정교한 수치로 만들어줘야해. 



예를들면 삼진 볼넷을 5단위로 계산하면안되고 상세한 수치를 시뮬레이션 해주는게 너의 역할이야.







아래는 너가 게산해줘야할 선수의 성적을 나타내는 경기기록이야.







타자는 : AVG(타율)	G(경기수) PA(타석수) AB (타수) H(안타) 2B(2루타)	3B(3루타) HR(홈런) RBI (타점) BB	(볼넷) HBP (사구) SO(삼진) GDP (병살타)	E(실책) 







투수 : ERA(9이닝당 평균 자책점) G(게임수) CG (완투)	SHO (완봉) W( 승리)	L(패배) SV(세이브)	HLD(홀드) TBF (타자수)	IP(이닝) H(피안타)	HR (홈런)	BB(볼넷)	HBP(사구) SO(삼진)  R(실점)	ER (자책점)











참고로 시범경기 스탯은 해당 시범경기가 끝나면 초기화돼. 시범경기스탯은 잊어버리고,본격적인 시즌 개막부터는 3경기 기록과 연간 누적기록은 계속 기록해줘.















처음엔 팀을 선택하는것부터 시작해.







현재날짜는 2026년 1월이야.







항상 출력해야하는건 



맨위는 구단명, 날짜:년도/월/일 ,현재 구단이 보유하는 자금(초기자금50억)/샐러리캡 현황



한달간 지출내역을 보여줘.







그아래엔 현재 리그 구단들의 순위를 아래 순서대로 표시해줘.



순위	구단	경기	승	패	무	승률	게임차	현재 보유 자금	상태







그 아래엔 전체 선수단명단을 보여줘.



(생략되는 선수가 있어서는 안돼)



처음엔 모든 구단이 1군2군 선수를 포함해 총 35명의 선수로 시작해.



이중에서 1군선수단은 28명 뿐이야.



투수조는:선발투수 5명,중간계투6명,셋업맨1명,마무리1명



야수조는:포수/1루수/2루수/3루수/유격수/외야수3명,지명타자(수비안함)



벤치멤버 6명으로 구성되어 있어.



나머지 선수는 2군취급 해줘. 2군이라고 해서 경기를 못뛰는게 아니라 감독이 필요하다고 판단시 1군선수와 교체해서 경기에 출전해.







스탯은 (S+~D-사이로 자세하게 표시해줘,구속은 km 단위로 표시해줘)



투수조는



보직  좌투/우투여부 이름	나이	구속	구위	제구 체력 변화구(종류별로) / 시즌성적 : G 승 패 ERA IP SO BB HLD SV   / 연봉  순서로 보여주고



타자는



포지션   이름	나이	좌교타 우교타 장타	선구안 수비 / 시즌성적 : AVG/RA/H/HR/RBI/OPS/ 연봉 순서로 보여줘.



꼭 보기좋게 정렬해서 보여줘. 난잡하게 하지말고.



가독성을 높이기 위해 코드 블록 스타일(고정폭 글꼴) 을 적용하여, 옛날 야구 매니지먼트 게임의 UI처럼 깔끔하게 정렬해줘















선수단 스탯과 성적표 출력을  깔끔하게 보기 좋게 정렬해서 만들어줘.



선수명단이든 경기기록이든. 뭐든지 깔끔하게 보여주는걸 최우선으로 생각해.





연봉지출



연봉 지출을 계산할떈 먼저 현재 로스터에 있는 모든 선수과 감독 코칭스태프 들의 연봉을 합산한뒤 12/1로 나누어. 이 나눈 금액이 매월 선수들에게 줘야하는 금액이야. 모든팀에게 적용되는 규칙이야.  

지출계산은 정확하게 해줘야돼. 한달에 연봉 총액이 한꺼번에 나가면 그건 잘못된거야.



  용병,감독코칭스태프,전체 선수단의 연봉은 12/1로 분할하여 계산하고. 매월마다 지급해. 우승상금과 방송계약,관중 수익금을 제외하곤 마음대로 수익금을 추가시켜서는 절대 안돼. 



중간에 엔트리 확장도 없어.











시뮬레이션을 해야할 각 팀별 2026년도 시작 로스터야.



아래 로스터는 첫해 2026년에만 영향을 주고,2027년 이후부터는 플레이어가 진행한 로스터로 게임을 진행시켜야돼, 2027년 이후로는 아래 로스터는 FA를 제외하고 더이상 게임에 영향을 주지않아.







2026년 KT위즈 시작 선수단



투수조



선발투수 : 고영표 / 소형준 / 오원석 / 배제성/ 문용익



불펜투수 : 우규민 / 김민수 / 주권 / 전용주 / 이상동 / 원상현



셋업 : 손동현



마무리 : 박영현



2군멤버 : 박건우 / 김재원 / 강건 / 이채호 / 임준형 / 조이현



야수조



포수 : 장성우 / 1루수 : 황재균 / 2루수 : 김상수 / 3루수 : 허경민 / 유격수 : 장준원



좌익수 : 김민혁 / 중견수 : 배정대 / 우익수 : 안현민



벤치멤버 : 강현우 / 문상철 / 류현인 / 권동진 / 장진혁 / 이정훈



2군 : 조대현 / 이강민 / 오서진 / 오윤석 / 윤준혁 / 안치영 / 유준규











2026 삼성라이온즈 시작 선수단



투수조



선발투수: 원태인 / 최원태 / 양창섭 / 배찬승 / 좌승현



불펜투수: 김무신 / 최지광 / 이승민 / 백정현 / 임기영 / 이재익



셋업: 이호성



마무리: 김재윤



2군멤버: 정민성 / 김대호 / 육선엽 / 최하늘



야수조



포수: 이병헌 / 1루수: 전병우 / 2루수: 류지혁 /3루수: 김영웅 / 유격수: 이재현 / 좌익수: 구자욱 / 중견수: 김성윤 / 우익수: 박승규



밴치멤버: 김지찬/ 김태훈 / 김헌곤 / 김재성 / 심재훈 / 이성규



2군멤버: 이창용 / 양우현 / 김재혁 / 함수호











2026 SSG 랜더스 시작 선수단



2026년 SSG랜더스 투수조

선발: 김광현/김건우/문승원/송영진/최민준

불펜: 이로운/김민/박시후/전영준/김택형/한두솔

셋업: 노경은 마무리: 조병현



2군: 박종훈/윤태현/서진용/박기호/조요한/장지훈/백승건



2026년 SSG랜더스 야수조



포수: 조형우 / 1루: 고명준 / 2루: 정준재 / 3루: 최정 / 유격: 박성한 / 중견: 최지훈 / 우익: 한유섬 / 좌익: 오태곤 / 지타: 류효승

벤치: 이지영/박지환/안상현/전의산/최준우/김성욱



2군: 김민식/하재훈/이율예/현원회/석정우/이승민/김창평/이정범







2026 한화 이글스 선수단



2026년 한화이글스 투수조



선발투수 : 류현진 / 문동주 / 엄상백

불펜투수 : 조동욱 / 황준서 / 김종수 / 정우주 / 박상원 / 주현상

셋업투수 : 한승혁

마무리 : 김서현

2군멤버 : 박준영 / 강재민 / 윤산흠 / 이상규 / 권민규



2026년 한화이글스 야수조



포수: 최재훈 / 1루수 : 채은성 / 2루수: 하주석 / 3루수 : 노시환 / 유격수: 심우준 / 좌익수 : 문현빈 / 중견수 : 이원석 / 우익수 : 강백호

지타: 손아섭

벤치: 김태연, 이진영, 허인서, 오재원, 최인호, 황영묵, 이도윤



2군: 장규현, 임종찬, 박정현







2026년 키움히어로즈 선수단



2026년 키움 히어로즈 투수조



선발투수:안우진 / 하영민 /정현우 /김윤하/ 박정훈

불펜투수:원종현/박윤성 /오석주/김선기/ 윤석원/이준우

셋업 : 조영건

마무리: 주승우



2군선수:이태양/최현우/윤현/손힘찬/박주성







야수조



포수: 김건희 / 1루수 : 최주환 / 2루수:김태진 / 3루수 : 송성문 / 유격수: 어준서 / 좌익수 : 임지열 / 중견수 : 이주형 / 우익수 : 박주홍

지타: 주성원

벤치: 김동헌 /박수종 /오선진/ 이형종/임병욱/전태현

2군: 박준형 / 김리안 /염승원 / 이명기 /이용규 / 장재영







2026년도 nc다이노스 시작선수단



2026년 nc다이노스 투수조



선발투수: 신민혁(27세)/구창모(29세)/김녹원(23세)/이재학(36세)/목지훈(22세)

불펜투수:김영규(26세)/배재환(31세)/손주환(24세)/전사민(27세)/하준영(27세)/김재열(30세)

셋업:김진호(28세)

마무리:류진욱(29세)



2군멤버:신영우(22세)/임지민(23세)/김태경(25세)/최성영(29세)/이준혁(23세)/최우석(21세)/김태훈(20세)/임정호(36세)







2026년 nc다이노스 야수조

포수: 김형준(27세)  /  1루수: 오영수(26세) / 2루수: 박민우(33세) /3루수:김휘집(24세)  / 유격수: 김주원 (24세)  /  좌익수: 권희동(35세)/ 중견수:최원준(29세/잔류시) / 우익수: 박건우(36세)

밴치멤버: 박세혁(포수,36세)/ 김한별(유격수,25세)/ 서호철(3루수,30세)/최정원(2루수,26세)/천재환(우익수,32세)/이우성(좌익수/32세)/



2군멤버:안중열(포수,31세),홍종표(유격수,26세),신재인(3루수,19세),고준휘(중견수,19세)















2026 LG트윈스 선수단



2026년 LG트윈스 투수조

선발투수: 임찬규(34세/FA연봉 2억,2027년 시즌종료후 FA계약종료예정) / 손주영(27세) / 송승기(24세)/ 이민호(25세) / 김윤식(26세)

불펜투수:김영우(21세) / 함덕주(31세/2027년 시즌종료 후 FA계약종료예정)/ 이정용(29세/,2028년 시즌종료 후 FA계약종료예정) / 장현식(31세/,2028년 시즌종료 후 FA계약종료예정)

/ 박명근(22세) / 이지강(27세)

셋업: 김진성(41세/2026년 시즌종료 후 FA계약종료예정)

마무리: 유영찬(29세)



2군멤버: 정우영(27세)/백승현(31세)/최채흥(31세)/ 박시원(21세)







2026년 LG트윈스 야수조

포수: 박동원(36세/2026년 시즌종료후 FA계약종료예정) / 1루수: 송찬의(27세) / 2루수: 신민재(30세/2028년 시즌종료 후 FA계약종료예정)/ 3루수: 문보경(26세) / 유격수: 오지환(36세/2029년 시즌종료 후 FA계약종료예정) / 좌익수: 문성주(29세) / 중견수: 박해민(36세/,2029년 시즌종료 후 FA계약종료예정) / 우익수: 홍창기(33세/,2026년 시즌종료 후 FA계약종료예정)

밴치멤버 구본혁(29세/,2028년 시즌종료 후 FA계약종료예정) 이재원(27세/,2032년 시즌종료 후 FA계약종료예정)/이영빈(24세) 천성호(29세)/이주헌(23세) /김현수(38세/2029년 시즌종료 후 FA계약종료예정)



2군멤버 김준태(32세) /최원영(23세)/박관우(20세) /손용준(26세)









2026년 롯데 자이언츠 시작 선수단

2026년 롯데자이언츠 투수조

선발투수 : 박세웅 / 나균안 / 이민석 / 김진욱 / 홍민기

불펜투수 : 김강현 / 정현수 / 최준용 / 윤성빈 / 박진 / 박준우

셋업 : 정철원

마무리 : 김원중



2군 : 김상수 / 구승민 / 송재영 / 김태현 / 한현희 / 심재민







2026년 롯데 자이언츠 야수조

포수 : 유강남 / 1루수 : 나승엽 / 2루수 : 고승민

3루수 : 한동희 / 유격수 : 전민재

좌익수 : 황성빈 / 중견수 : 장두성 / 우익수 : 윤동희 / 지명타자 : 전준우

벤치멤버 : 한태양 / 이호준 / 손성빈 / 박찬형 / 손호영



2군 : 정보근 / 김민성 / 김동혁 / 조세진 / 박재엽 / 박승욱 / 노진혁 / 정훈







2026년도 두산베어스 시작선수단



2026년 두산 베어스 투수조



선발투수: 곽빈 / 최승용 / 최민석 / 윤태호 / 최준호

불펜투수: 이영하 / 박신지 / 이병헌 / 최지강 / 양재훈 / 최원준

셋업: 박치국

마무리: 김택연



2군멤버: 서준오 / 홍민규 / 김유성 / 김정우 / 이교훈





2026년 두산 베어스 야수조

포수: 양의지 / 1루수: 양석환 / 2루수: 박준순 /3루수: 안재석 / 유격수: 박찬호 / 좌익수: 김인태 / 중견수: 정수빈/ 우익수: 김대한 / 지명: 김재환

밴치멤버 포수: 김기연 내야: 박지훈 / 오명진 / 임종성 / 강승호 외야: 조수행



2군멤버 : 포수: 윤준호 류현준/ 내야: 이유찬 박계범/ 외야: 김동준 홍성호 전다민





2026년 기아타이거즈 선수단



2026년기아타이거즈 투수조

선발투수: 양현종(37세) / 이의리(24세) / 김도현(26세) / 김태형(20세) / 황동하(24세)

불펜투수: 김기훈(26세) / 성영탁(22세) / 한재승(25세) / 최지민(23세) / 조상우(32세) / 이준영(34세)

셋업: 전상현(30세)

마무리: 정해영(25세)



2군멤버: 김현수(26세) / 김건국(38세) / 이도현(21세) / 김시훈(27세) / 윤중현(31세) / 김대유(35세)



2026년 기아타이거즈 야수조



포수: 한준수(27세) / 1루수: 오선우(30세) / 2루수: 김선빈(37세) / 3루수: 윤도현(23세) / 유격수: 김도영(23세) / 좌익수: 김석환(27세) / 중견수: 김호령(34세) / 우익수: 나성범(37세) / 지명타자: 최형우(43세)

밴치멤버: 김태군(37세) / 김규성(29세) / 박민(25세) / 박정우(28세) / 이창진(35세) / 변우혁(26세)



2군멤버: 고종욱(37세) / 정현창(20세) / 정해원(22세) / 주효상(29세) / 박재현(20세) / 황대인(30세)


**[UI 렌더링 및 출력 형식 가이드 (필수 준수)]**

1. **표(Table) 출력 방식**:
   - 모든 순위표, 선수 명단, 로스터 등은 반드시 **Markdown Table 문법**을 사용하여 출력하십시오.
   - 코드 블록(\`\`\`)을 사용하지 말고, 일반 Markdown 표로 렌더링해야 앱에서 예쁘게 디자인됩니다.

2. **선택지 버튼 생성 (중요)**:
   - 사용자가 선택해야 할 시점(예: 메뉴 선택, 진행 여부, 캠프지 선정 등)에는, 응답 메시지의 **맨 마지막 줄**에 아래 형식의 특수 태그를 반드시 포함하십시오.
   - 이 태그는 앱 화면에 **클릭 가능한 버튼**을 생성합니다.
   
   형식: \`[OPTIONS: [{"label": "버튼이름", "value": "AI에게보낼명령어"}, ...]]\`

   예시 상황 1 (시작 시):
   \`[OPTIONS: [{"label": "게임 시작", "value": "게임 시작"}, {"label": "팀 선택", "value": "팀 선택할래"}]]\`

   예시 상황 2 (스프링캠프 선택):
   \`[OPTIONS: [{"label": "국내(3억)", "value": "스프링캠프 국내로 갈게"}, {"label": "오키나와(30억)", "value": "스프링캠프 오키나와로 결정"}]]\`

3. **로딩 및 진행**:
   - 시뮬레이션 계산 중에는 사용자가 기다릴 수 있도록 상세한 계산 과정을 텍스트로 먼저 보여주고, 마지막에 결과를 표로 정리하십시오.

4. **[GUI 이벤트 트리거 (필수)]**
   - 신인 드래프트, 용병 영입, FA 명단 등 사용자가 명단을 보고 골라야 하는 상황에서는
   - 텍스트 표와 별개로, 메시지 맨 마지막에 반드시 아래 형식의 JSON 태그를 숨겨서 보내십시오.
   
   형식: \`[GUI_EVENT: {"type": "RECRUIT", "title": "외국인 용병 목록", "candidates": [{"name": "선수명", "position": "투수", "stat": "155km/A급", "cost": "30억"}, ...]}]\`

   - 이 태그가 있으면 앱은 자동으로 그래픽 선택 화면을 띄울 것입니다.

5. **[상태 동기화 및 뉴스 피드 (필수)]**
   - **[헤더 업데이트]:** 매 턴 응답의 **맨 첫 줄**에는 반드시 현재 날짜와 보유 자금을 아래 형식으로 출력하여 앱 상단 바를 업데이트하십시오.
     형식: \`[STATUS] 날짜: YYYY/MM/DD | 자금: 0,000억 원\`
   
   - **[뉴스 사이드바]:** 리그 소식, 부상, 트레이드 루머 등 뉴스거리가 발생하면, 텍스트 중간에 아래 태그를 삽입하여 우측 사이드바에 기록되게 하십시오.
     형식: \`[NEWS: {"title": "뉴스 제목", "content": "상세 내용 요약"}]\`
`,qT="gemini-2.5-flash";function XT(e){return new GT(e).getGenerativeModel({model:qT,systemInstruction:YT})}function QT({teamName:e="우리 팀",budget:t=null,date:n=null,season:r="2026 시즌",onSave:i,onLoad:o,onNewsClick:s,onApiKeyClick:l}){const a=t!==null&&t>0?t.toLocaleString("ko-KR")+"원":"시즌 준비 중",u=n||"시즌 준비 중";return w.jsx("div",{className:"bg-gradient-to-r from-[#0F4C3A] to-[#0a3528] text-white shadow-lg border-b-2 border-baseball-gold",children:w.jsx("div",{className:"container mx-auto px-3 sm:px-6 py-2 sm:py-3",children:w.jsxs("div",{className:"flex items-center justify-between flex-wrap gap-2 sm:gap-3",children:[w.jsxs("div",{className:"flex items-center gap-4",children:[w.jsx(iT,{className:"w-5 h-5 text-baseball-gold"}),w.jsx("span",{className:"font-black text-lg sm:text-xl tracking-tight truncate max-w-[150px] sm:max-w-none",children:e}),w.jsx("span",{className:"text-baseball-gold/60",children:"|"}),w.jsxs("div",{className:"flex items-center gap-1.5 text-baseball-gold",children:[w.jsx(mT,{className:"w-4 h-4"}),w.jsx("span",{className:"text-sm font-semibold",children:r})]})]}),w.jsxs("div",{className:"flex items-center gap-2 sm:gap-4 flex-shrink-0",children:[w.jsxs("div",{className:"flex items-center gap-1 sm:gap-2 border-r border-baseball-gold/40 pr-2 sm:pr-4",children:[s&&w.jsx("button",{onClick:s,className:"p-1.5 hover:bg-white/10 rounded transition-colors",title:"뉴스",children:w.jsx(Rx,{className:"w-4 h-4 text-baseball-gold"})}),i&&w.jsx("button",{onClick:i,className:"p-1.5 hover:bg-white/10 rounded transition-colors",title:"게임 저장",children:w.jsx(pT,{className:"w-4 h-4 text-baseball-gold"})}),o&&w.jsx("button",{onClick:o,className:"p-1.5 hover:bg-white/10 rounded transition-colors",title:"게임 불러오기",children:w.jsx(uT,{className:"w-4 h-4 text-baseball-gold"})}),l&&w.jsx("button",{onClick:l,className:"p-1.5 hover:bg-white/10 rounded transition-colors",title:"API 키 설정",children:w.jsx(fT,{className:"w-4 h-4 text-baseball-gold"})})]}),w.jsx("span",{className:"text-baseball-gold/60",children:"|"}),w.jsxs("div",{className:"flex items-center gap-1.5 whitespace-nowrap",children:[w.jsx(aT,{className:"w-4 h-4 text-[#C5A059] flex-shrink-0"}),w.jsx("span",{className:"text-xs text-gray-300 font-sans",children:"보유 자금"}),w.jsx("span",{className:"text-baseball-gold/60",children:"|"}),w.jsx("span",{className:"font-mono font-bold text-[#C5A059] text-sm",children:a})]}),w.jsx("span",{className:"text-baseball-gold/60",children:"|"}),w.jsxs("div",{className:"flex items-center gap-1.5 whitespace-nowrap",children:[w.jsx(oT,{className:"w-4 h-4 text-baseball-gold flex-shrink-0"}),w.jsx("span",{className:"text-xs text-gray-300 font-sans",children:"날짜"}),w.jsx("span",{className:"text-baseball-gold/60",children:"|"}),w.jsx("span",{className:"font-mono font-semibold text-sm",children:u})]})]})]})})})}function ZT(e,t){const n={};return(e[e.length-1]===""?[...e,""]:e).join((n.padRight?" ":"")+","+(n.padLeft===!1?"":" ")).trim()}const JT=/^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,eb=/^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,tb={};function Up(e,t){return(tb.jsx?eb:JT).test(e)}const nb=/[ \t\n\f\r]/g;function rb(e){return typeof e=="object"?e.type==="text"?Hp(e.value):!1:Hp(e)}function Hp(e){return e.replace(nb,"")===""}class Po{constructor(t,n,r){this.normal=n,this.property=t,r&&(this.space=r)}}Po.prototype.normal={};Po.prototype.property={};Po.prototype.space=void 0;function Fx(e,t){const n={},r={};for(const i of e)Object.assign(n,i.property),Object.assign(r,i.normal);return new Po(n,r,t)}function Hu(e){return e.toLowerCase()}class st{constructor(t,n){this.attribute=n,this.property=t}}st.prototype.attribute="";st.prototype.booleanish=!1;st.prototype.boolean=!1;st.prototype.commaOrSpaceSeparated=!1;st.prototype.commaSeparated=!1;st.prototype.defined=!1;st.prototype.mustUseProperty=!1;st.prototype.number=!1;st.prototype.overloadedBoolean=!1;st.prototype.property="";st.prototype.spaceSeparated=!1;st.prototype.space=void 0;let ib=0;const Y=cr(),Ee=cr(),$u=cr(),D=cr(),ae=cr(),Br=cr(),at=cr();function cr(){return 2**++ib}const Wu=Object.freeze(Object.defineProperty({__proto__:null,boolean:Y,booleanish:Ee,commaOrSpaceSeparated:at,commaSeparated:Br,number:D,overloadedBoolean:$u,spaceSeparated:ae},Symbol.toStringTag,{value:"Module"})),pa=Object.keys(Wu);class Df extends st{constructor(t,n,r,i){let o=-1;if(super(t,n),$p(this,"space",i),typeof r=="number")for(;++o<pa.length;){const s=pa[o];$p(this,pa[o],(r&Wu[s])===Wu[s])}}}Df.prototype.defined=!0;function $p(e,t,n){n&&(e[t]=n)}function oi(e){const t={},n={};for(const[r,i]of Object.entries(e.properties)){const o=new Df(r,e.transform(e.attributes||{},r),i,e.space);e.mustUseProperty&&e.mustUseProperty.includes(r)&&(o.mustUseProperty=!0),t[r]=o,n[Hu(r)]=r,n[Hu(o.attribute)]=r}return new Po(t,n,e.space)}const jx=oi({properties:{ariaActiveDescendant:null,ariaAtomic:Ee,ariaAutoComplete:null,ariaBusy:Ee,ariaChecked:Ee,ariaColCount:D,ariaColIndex:D,ariaColSpan:D,ariaControls:ae,ariaCurrent:null,ariaDescribedBy:ae,ariaDetails:null,ariaDisabled:Ee,ariaDropEffect:ae,ariaErrorMessage:null,ariaExpanded:Ee,ariaFlowTo:ae,ariaGrabbed:Ee,ariaHasPopup:null,ariaHidden:Ee,ariaInvalid:null,ariaKeyShortcuts:null,ariaLabel:null,ariaLabelledBy:ae,ariaLevel:D,ariaLive:null,ariaModal:Ee,ariaMultiLine:Ee,ariaMultiSelectable:Ee,ariaOrientation:null,ariaOwns:ae,ariaPlaceholder:null,ariaPosInSet:D,ariaPressed:Ee,ariaReadOnly:Ee,ariaRelevant:null,ariaRequired:Ee,ariaRoleDescription:ae,ariaRowCount:D,ariaRowIndex:D,ariaRowSpan:D,ariaSelected:Ee,ariaSetSize:D,ariaSort:null,ariaValueMax:D,ariaValueMin:D,ariaValueNow:D,ariaValueText:null,role:null},transform(e,t){return t==="role"?t:"aria-"+t.slice(4).toLowerCase()}});function zx(e,t){return t in e?e[t]:t}function Vx(e,t){return zx(e,t.toLowerCase())}const ob=oi({attributes:{acceptcharset:"accept-charset",classname:"class",htmlfor:"for",httpequiv:"http-equiv"},mustUseProperty:["checked","multiple","muted","selected"],properties:{abbr:null,accept:Br,acceptCharset:ae,accessKey:ae,action:null,allow:null,allowFullScreen:Y,allowPaymentRequest:Y,allowUserMedia:Y,alt:null,as:null,async:Y,autoCapitalize:null,autoComplete:ae,autoFocus:Y,autoPlay:Y,blocking:ae,capture:null,charSet:null,checked:Y,cite:null,className:ae,cols:D,colSpan:null,content:null,contentEditable:Ee,controls:Y,controlsList:ae,coords:D|Br,crossOrigin:null,data:null,dateTime:null,decoding:null,default:Y,defer:Y,dir:null,dirName:null,disabled:Y,download:$u,draggable:Ee,encType:null,enterKeyHint:null,fetchPriority:null,form:null,formAction:null,formEncType:null,formMethod:null,formNoValidate:Y,formTarget:null,headers:ae,height:D,hidden:$u,high:D,href:null,hrefLang:null,htmlFor:ae,httpEquiv:ae,id:null,imageSizes:null,imageSrcSet:null,inert:Y,inputMode:null,integrity:null,is:null,isMap:Y,itemId:null,itemProp:ae,itemRef:ae,itemScope:Y,itemType:ae,kind:null,label:null,lang:null,language:null,list:null,loading:null,loop:Y,low:D,manifest:null,max:null,maxLength:D,media:null,method:null,min:null,minLength:D,multiple:Y,muted:Y,name:null,nonce:null,noModule:Y,noValidate:Y,onAbort:null,onAfterPrint:null,onAuxClick:null,onBeforeMatch:null,onBeforePrint:null,onBeforeToggle:null,onBeforeUnload:null,onBlur:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onContextLost:null,onContextMenu:null,onContextRestored:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnded:null,onError:null,onFocus:null,onFormData:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLanguageChange:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadEnd:null,onLoadStart:null,onMessage:null,onMessageError:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRejectionHandled:null,onReset:null,onResize:null,onScroll:null,onScrollEnd:null,onSecurityPolicyViolation:null,onSeeked:null,onSeeking:null,onSelect:null,onSlotChange:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnhandledRejection:null,onUnload:null,onVolumeChange:null,onWaiting:null,onWheel:null,open:Y,optimum:D,pattern:null,ping:ae,placeholder:null,playsInline:Y,popover:null,popoverTarget:null,popoverTargetAction:null,poster:null,preload:null,readOnly:Y,referrerPolicy:null,rel:ae,required:Y,reversed:Y,rows:D,rowSpan:D,sandbox:ae,scope:null,scoped:Y,seamless:Y,selected:Y,shadowRootClonable:Y,shadowRootDelegatesFocus:Y,shadowRootMode:null,shape:null,size:D,sizes:null,slot:null,span:D,spellCheck:Ee,src:null,srcDoc:null,srcLang:null,srcSet:null,start:D,step:null,style:null,tabIndex:D,target:null,title:null,translate:null,type:null,typeMustMatch:Y,useMap:null,value:Ee,width:D,wrap:null,writingSuggestions:null,align:null,aLink:null,archive:ae,axis:null,background:null,bgColor:null,border:D,borderColor:null,bottomMargin:D,cellPadding:null,cellSpacing:null,char:null,charOff:null,classId:null,clear:null,code:null,codeBase:null,codeType:null,color:null,compact:Y,declare:Y,event:null,face:null,frame:null,frameBorder:null,hSpace:D,leftMargin:D,link:null,longDesc:null,lowSrc:null,marginHeight:D,marginWidth:D,noResize:Y,noHref:Y,noShade:Y,noWrap:Y,object:null,profile:null,prompt:null,rev:null,rightMargin:D,rules:null,scheme:null,scrolling:Ee,standby:null,summary:null,text:null,topMargin:D,valueType:null,version:null,vAlign:null,vLink:null,vSpace:D,allowTransparency:null,autoCorrect:null,autoSave:null,disablePictureInPicture:Y,disableRemotePlayback:Y,prefix:null,property:null,results:D,security:null,unselectable:null},space:"html",transform:Vx}),sb=oi({attributes:{accentHeight:"accent-height",alignmentBaseline:"alignment-baseline",arabicForm:"arabic-form",baselineShift:"baseline-shift",capHeight:"cap-height",className:"class",clipPath:"clip-path",clipRule:"clip-rule",colorInterpolation:"color-interpolation",colorInterpolationFilters:"color-interpolation-filters",colorProfile:"color-profile",colorRendering:"color-rendering",crossOrigin:"crossorigin",dataType:"datatype",dominantBaseline:"dominant-baseline",enableBackground:"enable-background",fillOpacity:"fill-opacity",fillRule:"fill-rule",floodColor:"flood-color",floodOpacity:"flood-opacity",fontFamily:"font-family",fontSize:"font-size",fontSizeAdjust:"font-size-adjust",fontStretch:"font-stretch",fontStyle:"font-style",fontVariant:"font-variant",fontWeight:"font-weight",glyphName:"glyph-name",glyphOrientationHorizontal:"glyph-orientation-horizontal",glyphOrientationVertical:"glyph-orientation-vertical",hrefLang:"hreflang",horizAdvX:"horiz-adv-x",horizOriginX:"horiz-origin-x",horizOriginY:"horiz-origin-y",imageRendering:"image-rendering",letterSpacing:"letter-spacing",lightingColor:"lighting-color",markerEnd:"marker-end",markerMid:"marker-mid",markerStart:"marker-start",navDown:"nav-down",navDownLeft:"nav-down-left",navDownRight:"nav-down-right",navLeft:"nav-left",navNext:"nav-next",navPrev:"nav-prev",navRight:"nav-right",navUp:"nav-up",navUpLeft:"nav-up-left",navUpRight:"nav-up-right",onAbort:"onabort",onActivate:"onactivate",onAfterPrint:"onafterprint",onBeforePrint:"onbeforeprint",onBegin:"onbegin",onCancel:"oncancel",onCanPlay:"oncanplay",onCanPlayThrough:"oncanplaythrough",onChange:"onchange",onClick:"onclick",onClose:"onclose",onCopy:"oncopy",onCueChange:"oncuechange",onCut:"oncut",onDblClick:"ondblclick",onDrag:"ondrag",onDragEnd:"ondragend",onDragEnter:"ondragenter",onDragExit:"ondragexit",onDragLeave:"ondragleave",onDragOver:"ondragover",onDragStart:"ondragstart",onDrop:"ondrop",onDurationChange:"ondurationchange",onEmptied:"onemptied",onEnd:"onend",onEnded:"onended",onError:"onerror",onFocus:"onfocus",onFocusIn:"onfocusin",onFocusOut:"onfocusout",onHashChange:"onhashchange",onInput:"oninput",onInvalid:"oninvalid",onKeyDown:"onkeydown",onKeyPress:"onkeypress",onKeyUp:"onkeyup",onLoad:"onload",onLoadedData:"onloadeddata",onLoadedMetadata:"onloadedmetadata",onLoadStart:"onloadstart",onMessage:"onmessage",onMouseDown:"onmousedown",onMouseEnter:"onmouseenter",onMouseLeave:"onmouseleave",onMouseMove:"onmousemove",onMouseOut:"onmouseout",onMouseOver:"onmouseover",onMouseUp:"onmouseup",onMouseWheel:"onmousewheel",onOffline:"onoffline",onOnline:"ononline",onPageHide:"onpagehide",onPageShow:"onpageshow",onPaste:"onpaste",onPause:"onpause",onPlay:"onplay",onPlaying:"onplaying",onPopState:"onpopstate",onProgress:"onprogress",onRateChange:"onratechange",onRepeat:"onrepeat",onReset:"onreset",onResize:"onresize",onScroll:"onscroll",onSeeked:"onseeked",onSeeking:"onseeking",onSelect:"onselect",onShow:"onshow",onStalled:"onstalled",onStorage:"onstorage",onSubmit:"onsubmit",onSuspend:"onsuspend",onTimeUpdate:"ontimeupdate",onToggle:"ontoggle",onUnload:"onunload",onVolumeChange:"onvolumechange",onWaiting:"onwaiting",onZoom:"onzoom",overlinePosition:"overline-position",overlineThickness:"overline-thickness",paintOrder:"paint-order",panose1:"panose-1",pointerEvents:"pointer-events",referrerPolicy:"referrerpolicy",renderingIntent:"rendering-intent",shapeRendering:"shape-rendering",stopColor:"stop-color",stopOpacity:"stop-opacity",strikethroughPosition:"strikethrough-position",strikethroughThickness:"strikethrough-thickness",strokeDashArray:"stroke-dasharray",strokeDashOffset:"stroke-dashoffset",strokeLineCap:"stroke-linecap",strokeLineJoin:"stroke-linejoin",strokeMiterLimit:"stroke-miterlimit",strokeOpacity:"stroke-opacity",strokeWidth:"stroke-width",tabIndex:"tabindex",textAnchor:"text-anchor",textDecoration:"text-decoration",textRendering:"text-rendering",transformOrigin:"transform-origin",typeOf:"typeof",underlinePosition:"underline-position",underlineThickness:"underline-thickness",unicodeBidi:"unicode-bidi",unicodeRange:"unicode-range",unitsPerEm:"units-per-em",vAlphabetic:"v-alphabetic",vHanging:"v-hanging",vIdeographic:"v-ideographic",vMathematical:"v-mathematical",vectorEffect:"vector-effect",vertAdvY:"vert-adv-y",vertOriginX:"vert-origin-x",vertOriginY:"vert-origin-y",wordSpacing:"word-spacing",writingMode:"writing-mode",xHeight:"x-height",playbackOrder:"playbackorder",timelineBegin:"timelinebegin"},properties:{about:at,accentHeight:D,accumulate:null,additive:null,alignmentBaseline:null,alphabetic:D,amplitude:D,arabicForm:null,ascent:D,attributeName:null,attributeType:null,azimuth:D,bandwidth:null,baselineShift:null,baseFrequency:null,baseProfile:null,bbox:null,begin:null,bias:D,by:null,calcMode:null,capHeight:D,className:ae,clip:null,clipPath:null,clipPathUnits:null,clipRule:null,color:null,colorInterpolation:null,colorInterpolationFilters:null,colorProfile:null,colorRendering:null,content:null,contentScriptType:null,contentStyleType:null,crossOrigin:null,cursor:null,cx:null,cy:null,d:null,dataType:null,defaultAction:null,descent:D,diffuseConstant:D,direction:null,display:null,dur:null,divisor:D,dominantBaseline:null,download:Y,dx:null,dy:null,edgeMode:null,editable:null,elevation:D,enableBackground:null,end:null,event:null,exponent:D,externalResourcesRequired:null,fill:null,fillOpacity:D,fillRule:null,filter:null,filterRes:null,filterUnits:null,floodColor:null,floodOpacity:null,focusable:null,focusHighlight:null,fontFamily:null,fontSize:null,fontSizeAdjust:null,fontStretch:null,fontStyle:null,fontVariant:null,fontWeight:null,format:null,fr:null,from:null,fx:null,fy:null,g1:Br,g2:Br,glyphName:Br,glyphOrientationHorizontal:null,glyphOrientationVertical:null,glyphRef:null,gradientTransform:null,gradientUnits:null,handler:null,hanging:D,hatchContentUnits:null,hatchUnits:null,height:null,href:null,hrefLang:null,horizAdvX:D,horizOriginX:D,horizOriginY:D,id:null,ideographic:D,imageRendering:null,initialVisibility:null,in:null,in2:null,intercept:D,k:D,k1:D,k2:D,k3:D,k4:D,kernelMatrix:at,kernelUnitLength:null,keyPoints:null,keySplines:null,keyTimes:null,kerning:null,lang:null,lengthAdjust:null,letterSpacing:null,lightingColor:null,limitingConeAngle:D,local:null,markerEnd:null,markerMid:null,markerStart:null,markerHeight:null,markerUnits:null,markerWidth:null,mask:null,maskContentUnits:null,maskUnits:null,mathematical:null,max:null,media:null,mediaCharacterEncoding:null,mediaContentEncodings:null,mediaSize:D,mediaTime:null,method:null,min:null,mode:null,name:null,navDown:null,navDownLeft:null,navDownRight:null,navLeft:null,navNext:null,navPrev:null,navRight:null,navUp:null,navUpLeft:null,navUpRight:null,numOctaves:null,observer:null,offset:null,onAbort:null,onActivate:null,onAfterPrint:null,onBeforePrint:null,onBegin:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnd:null,onEnded:null,onError:null,onFocus:null,onFocusIn:null,onFocusOut:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadStart:null,onMessage:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onMouseWheel:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRepeat:null,onReset:null,onResize:null,onScroll:null,onSeeked:null,onSeeking:null,onSelect:null,onShow:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnload:null,onVolumeChange:null,onWaiting:null,onZoom:null,opacity:null,operator:null,order:null,orient:null,orientation:null,origin:null,overflow:null,overlay:null,overlinePosition:D,overlineThickness:D,paintOrder:null,panose1:null,path:null,pathLength:D,patternContentUnits:null,patternTransform:null,patternUnits:null,phase:null,ping:ae,pitch:null,playbackOrder:null,pointerEvents:null,points:null,pointsAtX:D,pointsAtY:D,pointsAtZ:D,preserveAlpha:null,preserveAspectRatio:null,primitiveUnits:null,propagate:null,property:at,r:null,radius:null,referrerPolicy:null,refX:null,refY:null,rel:at,rev:at,renderingIntent:null,repeatCount:null,repeatDur:null,requiredExtensions:at,requiredFeatures:at,requiredFonts:at,requiredFormats:at,resource:null,restart:null,result:null,rotate:null,rx:null,ry:null,scale:null,seed:null,shapeRendering:null,side:null,slope:null,snapshotTime:null,specularConstant:D,specularExponent:D,spreadMethod:null,spacing:null,startOffset:null,stdDeviation:null,stemh:null,stemv:null,stitchTiles:null,stopColor:null,stopOpacity:null,strikethroughPosition:D,strikethroughThickness:D,string:null,stroke:null,strokeDashArray:at,strokeDashOffset:null,strokeLineCap:null,strokeLineJoin:null,strokeMiterLimit:D,strokeOpacity:D,strokeWidth:null,style:null,surfaceScale:D,syncBehavior:null,syncBehaviorDefault:null,syncMaster:null,syncTolerance:null,syncToleranceDefault:null,systemLanguage:at,tabIndex:D,tableValues:null,target:null,targetX:D,targetY:D,textAnchor:null,textDecoration:null,textRendering:null,textLength:null,timelineBegin:null,title:null,transformBehavior:null,type:null,typeOf:at,to:null,transform:null,transformOrigin:null,u1:null,u2:null,underlinePosition:D,underlineThickness:D,unicode:null,unicodeBidi:null,unicodeRange:null,unitsPerEm:D,values:null,vAlphabetic:D,vMathematical:D,vectorEffect:null,vHanging:D,vIdeographic:D,version:null,vertAdvY:D,vertOriginX:D,vertOriginY:D,viewBox:null,viewTarget:null,visibility:null,width:null,widths:null,wordSpacing:null,writingMode:null,x:null,x1:null,x2:null,xChannelSelector:null,xHeight:D,y:null,y1:null,y2:null,yChannelSelector:null,z:null,zoomAndPan:null},space:"svg",transform:zx}),Bx=oi({properties:{xLinkActuate:null,xLinkArcRole:null,xLinkHref:null,xLinkRole:null,xLinkShow:null,xLinkTitle:null,xLinkType:null},space:"xlink",transform(e,t){return"xlink:"+t.slice(5).toLowerCase()}}),Ux=oi({attributes:{xmlnsxlink:"xmlns:xlink"},properties:{xmlnsXLink:null,xmlns:null},space:"xmlns",transform:Vx}),Hx=oi({properties:{xmlBase:null,xmlLang:null,xmlSpace:null},space:"xml",transform(e,t){return"xml:"+t.slice(3).toLowerCase()}}),lb={classId:"classID",dataType:"datatype",itemId:"itemID",strokeDashArray:"strokeDasharray",strokeDashOffset:"strokeDashoffset",strokeLineCap:"strokeLinecap",strokeLineJoin:"strokeLinejoin",strokeMiterLimit:"strokeMiterlimit",typeOf:"typeof",xLinkActuate:"xlinkActuate",xLinkArcRole:"xlinkArcrole",xLinkHref:"xlinkHref",xLinkRole:"xlinkRole",xLinkShow:"xlinkShow",xLinkTitle:"xlinkTitle",xLinkType:"xlinkType",xmlnsXLink:"xmlnsXlink"},ab=/[A-Z]/g,Wp=/-[a-z]/g,ub=/^data[-\w.:]+$/i;function cb(e,t){const n=Hu(t);let r=t,i=st;if(n in e.normal)return e.property[e.normal[n]];if(n.length>4&&n.slice(0,4)==="data"&&ub.test(t)){if(t.charAt(4)==="-"){const o=t.slice(5).replace(Wp,db);r="data"+o.charAt(0).toUpperCase()+o.slice(1)}else{const o=t.slice(4);if(!Wp.test(o)){let s=o.replace(ab,fb);s.charAt(0)!=="-"&&(s="-"+s),t="data"+s}}i=Df}return new i(r,t)}function fb(e){return"-"+e.toLowerCase()}function db(e){return e.charAt(1).toUpperCase()}const hb=Fx([jx,ob,Bx,Ux,Hx],"html"),Lf=Fx([jx,sb,Bx,Ux,Hx],"svg");function pb(e){return e.join(" ").trim()}var _f={},Kp=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,mb=/\n/g,gb=/^\s*/,yb=/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,xb=/^:\s*/,vb=/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,wb=/^[;\s]*/,kb=/^\s+|\s+$/g,Sb=`
`,Gp="/",Yp="*",$n="",Cb="comment",Eb="declaration";function Tb(e,t){if(typeof e!="string")throw new TypeError("First argument must be a string");if(!e)return[];t=t||{};var n=1,r=1;function i(m){var x=m.match(mb);x&&(n+=x.length);var E=m.lastIndexOf(Sb);r=~E?m.length-E:r+m.length}function o(){var m={line:n,column:r};return function(x){return x.position=new s(m),u(),x}}function s(m){this.start=m,this.end={line:n,column:r},this.source=t.source}s.prototype.content=e;function l(m){var x=new Error(t.source+":"+n+":"+r+": "+m);if(x.reason=m,x.filename=t.source,x.line=n,x.column=r,x.source=e,!t.silent)throw x}function a(m){var x=m.exec(e);if(x){var E=x[0];return i(E),e=e.slice(E.length),x}}function u(){a(gb)}function c(m){var x;for(m=m||[];x=f();)x!==!1&&m.push(x);return m}function f(){var m=o();if(!(Gp!=e.charAt(0)||Yp!=e.charAt(1))){for(var x=2;$n!=e.charAt(x)&&(Yp!=e.charAt(x)||Gp!=e.charAt(x+1));)++x;if(x+=2,$n===e.charAt(x-1))return l("End of comment missing");var E=e.slice(2,x-2);return r+=2,i(E),e=e.slice(x),r+=2,m({type:Cb,comment:E})}}function d(){var m=o(),x=a(yb);if(x){if(f(),!a(xb))return l("property missing ':'");var E=a(vb),p=m({type:Eb,property:qp(x[0].replace(Kp,$n)),value:E?qp(E[0].replace(Kp,$n)):$n});return a(wb),p}}function h(){var m=[];c(m);for(var x;x=d();)x!==!1&&(m.push(x),c(m));return m}return u(),h()}function qp(e){return e?e.replace(kb,$n):$n}var bb=Tb,Ab=ks&&ks.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(_f,"__esModule",{value:!0});_f.default=Ib;const Pb=Ab(bb);function Ib(e,t){let n=null;if(!e||typeof e!="string")return n;const r=(0,Pb.default)(e),i=typeof t=="function";return r.forEach(o=>{if(o.type!=="declaration")return;const{property:s,value:l}=o;i?t(s,l,o):l&&(n=n||{},n[s]=l)}),n}var kl={};Object.defineProperty(kl,"__esModule",{value:!0});kl.camelCase=void 0;var Nb=/^--[a-zA-Z0-9_-]+$/,Rb=/-([a-z])/g,Mb=/^[^-]+$/,Db=/^-(webkit|moz|ms|o|khtml)-/,Lb=/^-(ms)-/,_b=function(e){return!e||Mb.test(e)||Nb.test(e)},Ob=function(e,t){return t.toUpperCase()},Xp=function(e,t){return"".concat(t,"-")},Fb=function(e,t){return t===void 0&&(t={}),_b(e)?e:(e=e.toLowerCase(),t.reactCompat?e=e.replace(Lb,Xp):e=e.replace(Db,Xp),e.replace(Rb,Ob))};kl.camelCase=Fb;var jb=ks&&ks.__importDefault||function(e){return e&&e.__esModule?e:{default:e}},zb=jb(_f),Vb=kl;function Ku(e,t){var n={};return!e||typeof e!="string"||(0,zb.default)(e,function(r,i){r&&i&&(n[(0,Vb.camelCase)(r,t)]=i)}),n}Ku.default=Ku;var Bb=Ku;const Ub=tc(Bb),$x=Wx("end"),Of=Wx("start");function Wx(e){return t;function t(n){const r=n&&n.position&&n.position[e]||{};if(typeof r.line=="number"&&r.line>0&&typeof r.column=="number"&&r.column>0)return{line:r.line,column:r.column,offset:typeof r.offset=="number"&&r.offset>-1?r.offset:void 0}}}function Hb(e){const t=Of(e),n=$x(e);if(t&&n)return{start:t,end:n}}function Bi(e){return!e||typeof e!="object"?"":"position"in e||"type"in e?Qp(e.position):"start"in e||"end"in e?Qp(e):"line"in e||"column"in e?Gu(e):""}function Gu(e){return Zp(e&&e.line)+":"+Zp(e&&e.column)}function Qp(e){return Gu(e&&e.start)+"-"+Gu(e&&e.end)}function Zp(e){return e&&typeof e=="number"?e:1}class He extends Error{constructor(t,n,r){super(),typeof n=="string"&&(r=n,n=void 0);let i="",o={},s=!1;if(n&&("line"in n&&"column"in n?o={place:n}:"start"in n&&"end"in n?o={place:n}:"type"in n?o={ancestors:[n],place:n.position}:o={...n}),typeof t=="string"?i=t:!o.cause&&t&&(s=!0,i=t.message,o.cause=t),!o.ruleId&&!o.source&&typeof r=="string"){const a=r.indexOf(":");a===-1?o.ruleId=r:(o.source=r.slice(0,a),o.ruleId=r.slice(a+1))}if(!o.place&&o.ancestors&&o.ancestors){const a=o.ancestors[o.ancestors.length-1];a&&(o.place=a.position)}const l=o.place&&"start"in o.place?o.place.start:o.place;this.ancestors=o.ancestors||void 0,this.cause=o.cause||void 0,this.column=l?l.column:void 0,this.fatal=void 0,this.file="",this.message=i,this.line=l?l.line:void 0,this.name=Bi(o.place)||"1:1",this.place=o.place||void 0,this.reason=this.message,this.ruleId=o.ruleId||void 0,this.source=o.source||void 0,this.stack=s&&o.cause&&typeof o.cause.stack=="string"?o.cause.stack:"",this.actual=void 0,this.expected=void 0,this.note=void 0,this.url=void 0}}He.prototype.file="";He.prototype.name="";He.prototype.reason="";He.prototype.message="";He.prototype.stack="";He.prototype.column=void 0;He.prototype.line=void 0;He.prototype.ancestors=void 0;He.prototype.cause=void 0;He.prototype.fatal=void 0;He.prototype.place=void 0;He.prototype.ruleId=void 0;He.prototype.source=void 0;const Ff={}.hasOwnProperty,$b=new Map,Wb=/[A-Z]/g,Kb=new Set(["table","tbody","thead","tfoot","tr"]),Gb=new Set(["td","th"]),Kx="https://github.com/syntax-tree/hast-util-to-jsx-runtime";function Yb(e,t){if(!t||t.Fragment===void 0)throw new TypeError("Expected `Fragment` in options");const n=t.filePath||void 0;let r;if(t.development){if(typeof t.jsxDEV!="function")throw new TypeError("Expected `jsxDEV` in options when `development: true`");r=nA(n,t.jsxDEV)}else{if(typeof t.jsx!="function")throw new TypeError("Expected `jsx` in production options");if(typeof t.jsxs!="function")throw new TypeError("Expected `jsxs` in production options");r=tA(n,t.jsx,t.jsxs)}const i={Fragment:t.Fragment,ancestors:[],components:t.components||{},create:r,elementAttributeNameCase:t.elementAttributeNameCase||"react",evaluater:t.createEvaluater?t.createEvaluater():void 0,filePath:n,ignoreInvalidStyle:t.ignoreInvalidStyle||!1,passKeys:t.passKeys!==!1,passNode:t.passNode||!1,schema:t.space==="svg"?Lf:hb,stylePropertyNameCase:t.stylePropertyNameCase||"dom",tableCellAlignToStyle:t.tableCellAlignToStyle!==!1},o=Gx(i,e,void 0);return o&&typeof o!="string"?o:i.create(e,i.Fragment,{children:o||void 0},void 0)}function Gx(e,t,n){if(t.type==="element")return qb(e,t,n);if(t.type==="mdxFlowExpression"||t.type==="mdxTextExpression")return Xb(e,t);if(t.type==="mdxJsxFlowElement"||t.type==="mdxJsxTextElement")return Zb(e,t,n);if(t.type==="mdxjsEsm")return Qb(e,t);if(t.type==="root")return Jb(e,t,n);if(t.type==="text")return eA(e,t)}function qb(e,t,n){const r=e.schema;let i=r;t.tagName.toLowerCase()==="svg"&&r.space==="html"&&(i=Lf,e.schema=i),e.ancestors.push(t);const o=qx(e,t.tagName,!1),s=rA(e,t);let l=zf(e,t);return Kb.has(t.tagName)&&(l=l.filter(function(a){return typeof a=="string"?!rb(a):!0})),Yx(e,s,o,t),jf(s,l),e.ancestors.pop(),e.schema=r,e.create(t,o,s,n)}function Xb(e,t){if(t.data&&t.data.estree&&e.evaluater){const r=t.data.estree.body[0];return r.type,e.evaluater.evaluateExpression(r.expression)}go(e,t.position)}function Qb(e,t){if(t.data&&t.data.estree&&e.evaluater)return e.evaluater.evaluateProgram(t.data.estree);go(e,t.position)}function Zb(e,t,n){const r=e.schema;let i=r;t.name==="svg"&&r.space==="html"&&(i=Lf,e.schema=i),e.ancestors.push(t);const o=t.name===null?e.Fragment:qx(e,t.name,!0),s=iA(e,t),l=zf(e,t);return Yx(e,s,o,t),jf(s,l),e.ancestors.pop(),e.schema=r,e.create(t,o,s,n)}function Jb(e,t,n){const r={};return jf(r,zf(e,t)),e.create(t,e.Fragment,r,n)}function eA(e,t){return t.value}function Yx(e,t,n,r){typeof n!="string"&&n!==e.Fragment&&e.passNode&&(t.node=r)}function jf(e,t){if(t.length>0){const n=t.length>1?t:t[0];n&&(e.children=n)}}function tA(e,t,n){return r;function r(i,o,s,l){const u=Array.isArray(s.children)?n:t;return l?u(o,s,l):u(o,s)}}function nA(e,t){return n;function n(r,i,o,s){const l=Array.isArray(o.children),a=Of(r);return t(i,o,s,l,{columnNumber:a?a.column-1:void 0,fileName:e,lineNumber:a?a.line:void 0},void 0)}}function rA(e,t){const n={};let r,i;for(i in t.properties)if(i!=="children"&&Ff.call(t.properties,i)){const o=oA(e,i,t.properties[i]);if(o){const[s,l]=o;e.tableCellAlignToStyle&&s==="align"&&typeof l=="string"&&Gb.has(t.tagName)?r=l:n[s]=l}}if(r){const o=n.style||(n.style={});o[e.stylePropertyNameCase==="css"?"text-align":"textAlign"]=r}return n}function iA(e,t){const n={};for(const r of t.attributes)if(r.type==="mdxJsxExpressionAttribute")if(r.data&&r.data.estree&&e.evaluater){const o=r.data.estree.body[0];o.type;const s=o.expression;s.type;const l=s.properties[0];l.type,Object.assign(n,e.evaluater.evaluateExpression(l.argument))}else go(e,t.position);else{const i=r.name;let o;if(r.value&&typeof r.value=="object")if(r.value.data&&r.value.data.estree&&e.evaluater){const l=r.value.data.estree.body[0];l.type,o=e.evaluater.evaluateExpression(l.expression)}else go(e,t.position);else o=r.value===null?!0:r.value;n[i]=o}return n}function zf(e,t){const n=[];let r=-1;const i=e.passKeys?new Map:$b;for(;++r<t.children.length;){const o=t.children[r];let s;if(e.passKeys){const a=o.type==="element"?o.tagName:o.type==="mdxJsxFlowElement"||o.type==="mdxJsxTextElement"?o.name:void 0;if(a){const u=i.get(a)||0;s=a+"-"+u,i.set(a,u+1)}}const l=Gx(e,o,s);l!==void 0&&n.push(l)}return n}function oA(e,t,n){const r=cb(e.schema,t);if(!(n==null||typeof n=="number"&&Number.isNaN(n))){if(Array.isArray(n)&&(n=r.commaSeparated?ZT(n):pb(n)),r.property==="style"){let i=typeof n=="object"?n:sA(e,String(n));return e.stylePropertyNameCase==="css"&&(i=lA(i)),["style",i]}return[e.elementAttributeNameCase==="react"&&r.space?lb[r.property]||r.property:r.attribute,n]}}function sA(e,t){try{return Ub(t,{reactCompat:!0})}catch(n){if(e.ignoreInvalidStyle)return{};const r=n,i=new He("Cannot parse `style` attribute",{ancestors:e.ancestors,cause:r,ruleId:"style",source:"hast-util-to-jsx-runtime"});throw i.file=e.filePath||void 0,i.url=Kx+"#cannot-parse-style-attribute",i}}function qx(e,t,n){let r;if(!n)r={type:"Literal",value:t};else if(t.includes(".")){const i=t.split(".");let o=-1,s;for(;++o<i.length;){const l=Up(i[o])?{type:"Identifier",name:i[o]}:{type:"Literal",value:i[o]};s=s?{type:"MemberExpression",object:s,property:l,computed:!!(o&&l.type==="Literal"),optional:!1}:l}r=s}else r=Up(t)&&!/^[a-z]/.test(t)?{type:"Identifier",name:t}:{type:"Literal",value:t};if(r.type==="Literal"){const i=r.value;return Ff.call(e.components,i)?e.components[i]:i}if(e.evaluater)return e.evaluater.evaluateExpression(r);go(e)}function go(e,t){const n=new He("Cannot handle MDX estrees without `createEvaluater`",{ancestors:e.ancestors,place:t,ruleId:"mdx-estree",source:"hast-util-to-jsx-runtime"});throw n.file=e.filePath||void 0,n.url=Kx+"#cannot-handle-mdx-estrees-without-createevaluater",n}function lA(e){const t={};let n;for(n in e)Ff.call(e,n)&&(t[aA(n)]=e[n]);return t}function aA(e){let t=e.replace(Wb,uA);return t.slice(0,3)==="ms-"&&(t="-"+t),t}function uA(e){return"-"+e.toLowerCase()}const ma={action:["form"],cite:["blockquote","del","ins","q"],data:["object"],formAction:["button","input"],href:["a","area","base","link"],icon:["menuitem"],itemId:null,manifest:["html"],ping:["a","area"],poster:["video"],src:["audio","embed","iframe","img","input","script","source","track","video"]},cA={};function Vf(e,t){const n=cA,r=typeof n.includeImageAlt=="boolean"?n.includeImageAlt:!0,i=typeof n.includeHtml=="boolean"?n.includeHtml:!0;return Xx(e,r,i)}function Xx(e,t,n){if(fA(e)){if("value"in e)return e.type==="html"&&!n?"":e.value;if(t&&"alt"in e&&e.alt)return e.alt;if("children"in e)return Jp(e.children,t,n)}return Array.isArray(e)?Jp(e,t,n):""}function Jp(e,t,n){const r=[];let i=-1;for(;++i<e.length;)r[i]=Xx(e[i],t,n);return r.join("")}function fA(e){return!!(e&&typeof e=="object")}const em=document.createElement("i");function Bf(e){const t="&"+e+";";em.innerHTML=t;const n=em.textContent;return n.charCodeAt(n.length-1)===59&&e!=="semi"||n===t?!1:n}function dt(e,t,n,r){const i=e.length;let o=0,s;if(t<0?t=-t>i?0:i+t:t=t>i?i:t,n=n>0?n:0,r.length<1e4)s=Array.from(r),s.unshift(t,n),e.splice(...s);else for(n&&e.splice(t,n);o<r.length;)s=r.slice(o,o+1e4),s.unshift(t,0),e.splice(...s),o+=1e4,t+=1e4}function wt(e,t){return e.length>0?(dt(e,e.length,0,t),e):t}const tm={}.hasOwnProperty;function Qx(e){const t={};let n=-1;for(;++n<e.length;)dA(t,e[n]);return t}function dA(e,t){let n;for(n in t){const i=(tm.call(e,n)?e[n]:void 0)||(e[n]={}),o=t[n];let s;if(o)for(s in o){tm.call(i,s)||(i[s]=[]);const l=o[s];hA(i[s],Array.isArray(l)?l:l?[l]:[])}}}function hA(e,t){let n=-1;const r=[];for(;++n<t.length;)(t[n].add==="after"?e:r).push(t[n]);dt(e,0,0,r)}function Zx(e,t){const n=Number.parseInt(e,t);return n<9||n===11||n>13&&n<32||n>126&&n<160||n>55295&&n<57344||n>64975&&n<65008||(n&65535)===65535||(n&65535)===65534||n>1114111?"�":String.fromCodePoint(n)}function _t(e){return e.replace(/[\t\n\r ]+/g," ").replace(/^ | $/g,"").toLowerCase().toUpperCase()}const Ke=On(/[A-Za-z]/),Be=On(/[\dA-Za-z]/),pA=On(/[#-'*+\--9=?A-Z^-~]/);function Qs(e){return e!==null&&(e<32||e===127)}const Yu=On(/\d/),mA=On(/[\dA-Fa-f]/),gA=On(/[!-/:-@[-`{-~]/);function U(e){return e!==null&&e<-2}function le(e){return e!==null&&(e<0||e===32)}function Q(e){return e===-2||e===-1||e===32}const Sl=On(new RegExp("\\p{P}|\\p{S}","u")),lr=On(/\s/);function On(e){return t;function t(n){return n!==null&&n>-1&&e.test(String.fromCharCode(n))}}function si(e){const t=[];let n=-1,r=0,i=0;for(;++n<e.length;){const o=e.charCodeAt(n);let s="";if(o===37&&Be(e.charCodeAt(n+1))&&Be(e.charCodeAt(n+2)))i=2;else if(o<128)/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(o))||(s=String.fromCharCode(o));else if(o>55295&&o<57344){const l=e.charCodeAt(n+1);o<56320&&l>56319&&l<57344?(s=String.fromCharCode(o,l),i=1):s="�"}else s=String.fromCharCode(o);s&&(t.push(e.slice(r,n),encodeURIComponent(s)),r=n+i+1,s=""),i&&(n+=i,i=0)}return t.join("")+e.slice(r)}function te(e,t,n,r){const i=r?r-1:Number.POSITIVE_INFINITY;let o=0;return s;function s(a){return Q(a)?(e.enter(n),l(a)):t(a)}function l(a){return Q(a)&&o++<i?(e.consume(a),l):(e.exit(n),t(a))}}const yA={tokenize:xA};function xA(e){const t=e.attempt(this.parser.constructs.contentInitial,r,i);let n;return t;function r(l){if(l===null){e.consume(l);return}return e.enter("lineEnding"),e.consume(l),e.exit("lineEnding"),te(e,t,"linePrefix")}function i(l){return e.enter("paragraph"),o(l)}function o(l){const a=e.enter("chunkText",{contentType:"text",previous:n});return n&&(n.next=a),n=a,s(l)}function s(l){if(l===null){e.exit("chunkText"),e.exit("paragraph"),e.consume(l);return}return U(l)?(e.consume(l),e.exit("chunkText"),o):(e.consume(l),s)}}const vA={tokenize:wA},nm={tokenize:kA};function wA(e){const t=this,n=[];let r=0,i,o,s;return l;function l(y){if(r<n.length){const T=n[r];return t.containerState=T[1],e.attempt(T[0].continuation,a,u)(y)}return u(y)}function a(y){if(r++,t.containerState._closeFlow){t.containerState._closeFlow=void 0,i&&g();const T=t.events.length;let b=T,k;for(;b--;)if(t.events[b][0]==="exit"&&t.events[b][1].type==="chunkFlow"){k=t.events[b][1].end;break}p(r);let A=T;for(;A<t.events.length;)t.events[A][1].end={...k},A++;return dt(t.events,b+1,0,t.events.slice(T)),t.events.length=A,u(y)}return l(y)}function u(y){if(r===n.length){if(!i)return d(y);if(i.currentConstruct&&i.currentConstruct.concrete)return m(y);t.interrupt=!!(i.currentConstruct&&!i._gfmTableDynamicInterruptHack)}return t.containerState={},e.check(nm,c,f)(y)}function c(y){return i&&g(),p(r),d(y)}function f(y){return t.parser.lazy[t.now().line]=r!==n.length,s=t.now().offset,m(y)}function d(y){return t.containerState={},e.attempt(nm,h,m)(y)}function h(y){return r++,n.push([t.currentConstruct,t.containerState]),d(y)}function m(y){if(y===null){i&&g(),p(0),e.consume(y);return}return i=i||t.parser.flow(t.now()),e.enter("chunkFlow",{_tokenizer:i,contentType:"flow",previous:o}),x(y)}function x(y){if(y===null){E(e.exit("chunkFlow"),!0),p(0),e.consume(y);return}return U(y)?(e.consume(y),E(e.exit("chunkFlow")),r=0,t.interrupt=void 0,l):(e.consume(y),x)}function E(y,T){const b=t.sliceStream(y);if(T&&b.push(null),y.previous=o,o&&(o.next=y),o=y,i.defineSkip(y.start),i.write(b),t.parser.lazy[y.start.line]){let k=i.events.length;for(;k--;)if(i.events[k][1].start.offset<s&&(!i.events[k][1].end||i.events[k][1].end.offset>s))return;const A=t.events.length;let P=A,O,C;for(;P--;)if(t.events[P][0]==="exit"&&t.events[P][1].type==="chunkFlow"){if(O){C=t.events[P][1].end;break}O=!0}for(p(r),k=A;k<t.events.length;)t.events[k][1].end={...C},k++;dt(t.events,P+1,0,t.events.slice(A)),t.events.length=k}}function p(y){let T=n.length;for(;T-- >y;){const b=n[T];t.containerState=b[1],b[0].exit.call(t,e)}n.length=y}function g(){i.write([null]),o=void 0,i=void 0,t.containerState._closeFlow=void 0}}function kA(e,t,n){return te(e,e.attempt(this.parser.constructs.document,t,n),"linePrefix",this.parser.constructs.disable.null.includes("codeIndented")?void 0:4)}function Zr(e){if(e===null||le(e)||lr(e))return 1;if(Sl(e))return 2}function Cl(e,t,n){const r=[];let i=-1;for(;++i<e.length;){const o=e[i].resolveAll;o&&!r.includes(o)&&(t=o(t,n),r.push(o))}return t}const qu={name:"attention",resolveAll:SA,tokenize:CA};function SA(e,t){let n=-1,r,i,o,s,l,a,u,c;for(;++n<e.length;)if(e[n][0]==="enter"&&e[n][1].type==="attentionSequence"&&e[n][1]._close){for(r=n;r--;)if(e[r][0]==="exit"&&e[r][1].type==="attentionSequence"&&e[r][1]._open&&t.sliceSerialize(e[r][1]).charCodeAt(0)===t.sliceSerialize(e[n][1]).charCodeAt(0)){if((e[r][1]._close||e[n][1]._open)&&(e[n][1].end.offset-e[n][1].start.offset)%3&&!((e[r][1].end.offset-e[r][1].start.offset+e[n][1].end.offset-e[n][1].start.offset)%3))continue;a=e[r][1].end.offset-e[r][1].start.offset>1&&e[n][1].end.offset-e[n][1].start.offset>1?2:1;const f={...e[r][1].end},d={...e[n][1].start};rm(f,-a),rm(d,a),s={type:a>1?"strongSequence":"emphasisSequence",start:f,end:{...e[r][1].end}},l={type:a>1?"strongSequence":"emphasisSequence",start:{...e[n][1].start},end:d},o={type:a>1?"strongText":"emphasisText",start:{...e[r][1].end},end:{...e[n][1].start}},i={type:a>1?"strong":"emphasis",start:{...s.start},end:{...l.end}},e[r][1].end={...s.start},e[n][1].start={...l.end},u=[],e[r][1].end.offset-e[r][1].start.offset&&(u=wt(u,[["enter",e[r][1],t],["exit",e[r][1],t]])),u=wt(u,[["enter",i,t],["enter",s,t],["exit",s,t],["enter",o,t]]),u=wt(u,Cl(t.parser.constructs.insideSpan.null,e.slice(r+1,n),t)),u=wt(u,[["exit",o,t],["enter",l,t],["exit",l,t],["exit",i,t]]),e[n][1].end.offset-e[n][1].start.offset?(c=2,u=wt(u,[["enter",e[n][1],t],["exit",e[n][1],t]])):c=0,dt(e,r-1,n-r+3,u),n=r+u.length-c-2;break}}for(n=-1;++n<e.length;)e[n][1].type==="attentionSequence"&&(e[n][1].type="data");return e}function CA(e,t){const n=this.parser.constructs.attentionMarkers.null,r=this.previous,i=Zr(r);let o;return s;function s(a){return o=a,e.enter("attentionSequence"),l(a)}function l(a){if(a===o)return e.consume(a),l;const u=e.exit("attentionSequence"),c=Zr(a),f=!c||c===2&&i||n.includes(a),d=!i||i===2&&c||n.includes(r);return u._open=!!(o===42?f:f&&(i||!d)),u._close=!!(o===42?d:d&&(c||!f)),t(a)}}function rm(e,t){e.column+=t,e.offset+=t,e._bufferIndex+=t}const EA={name:"autolink",tokenize:TA};function TA(e,t,n){let r=0;return i;function i(h){return e.enter("autolink"),e.enter("autolinkMarker"),e.consume(h),e.exit("autolinkMarker"),e.enter("autolinkProtocol"),o}function o(h){return Ke(h)?(e.consume(h),s):h===64?n(h):u(h)}function s(h){return h===43||h===45||h===46||Be(h)?(r=1,l(h)):u(h)}function l(h){return h===58?(e.consume(h),r=0,a):(h===43||h===45||h===46||Be(h))&&r++<32?(e.consume(h),l):(r=0,u(h))}function a(h){return h===62?(e.exit("autolinkProtocol"),e.enter("autolinkMarker"),e.consume(h),e.exit("autolinkMarker"),e.exit("autolink"),t):h===null||h===32||h===60||Qs(h)?n(h):(e.consume(h),a)}function u(h){return h===64?(e.consume(h),c):pA(h)?(e.consume(h),u):n(h)}function c(h){return Be(h)?f(h):n(h)}function f(h){return h===46?(e.consume(h),r=0,c):h===62?(e.exit("autolinkProtocol").type="autolinkEmail",e.enter("autolinkMarker"),e.consume(h),e.exit("autolinkMarker"),e.exit("autolink"),t):d(h)}function d(h){if((h===45||Be(h))&&r++<63){const m=h===45?d:f;return e.consume(h),m}return n(h)}}const Io={partial:!0,tokenize:bA};function bA(e,t,n){return r;function r(o){return Q(o)?te(e,i,"linePrefix")(o):i(o)}function i(o){return o===null||U(o)?t(o):n(o)}}const Jx={continuation:{tokenize:PA},exit:IA,name:"blockQuote",tokenize:AA};function AA(e,t,n){const r=this;return i;function i(s){if(s===62){const l=r.containerState;return l.open||(e.enter("blockQuote",{_container:!0}),l.open=!0),e.enter("blockQuotePrefix"),e.enter("blockQuoteMarker"),e.consume(s),e.exit("blockQuoteMarker"),o}return n(s)}function o(s){return Q(s)?(e.enter("blockQuotePrefixWhitespace"),e.consume(s),e.exit("blockQuotePrefixWhitespace"),e.exit("blockQuotePrefix"),t):(e.exit("blockQuotePrefix"),t(s))}}function PA(e,t,n){const r=this;return i;function i(s){return Q(s)?te(e,o,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(s):o(s)}function o(s){return e.attempt(Jx,t,n)(s)}}function IA(e){e.exit("blockQuote")}const ev={name:"characterEscape",tokenize:NA};function NA(e,t,n){return r;function r(o){return e.enter("characterEscape"),e.enter("escapeMarker"),e.consume(o),e.exit("escapeMarker"),i}function i(o){return gA(o)?(e.enter("characterEscapeValue"),e.consume(o),e.exit("characterEscapeValue"),e.exit("characterEscape"),t):n(o)}}const tv={name:"characterReference",tokenize:RA};function RA(e,t,n){const r=this;let i=0,o,s;return l;function l(f){return e.enter("characterReference"),e.enter("characterReferenceMarker"),e.consume(f),e.exit("characterReferenceMarker"),a}function a(f){return f===35?(e.enter("characterReferenceMarkerNumeric"),e.consume(f),e.exit("characterReferenceMarkerNumeric"),u):(e.enter("characterReferenceValue"),o=31,s=Be,c(f))}function u(f){return f===88||f===120?(e.enter("characterReferenceMarkerHexadecimal"),e.consume(f),e.exit("characterReferenceMarkerHexadecimal"),e.enter("characterReferenceValue"),o=6,s=mA,c):(e.enter("characterReferenceValue"),o=7,s=Yu,c(f))}function c(f){if(f===59&&i){const d=e.exit("characterReferenceValue");return s===Be&&!Bf(r.sliceSerialize(d))?n(f):(e.enter("characterReferenceMarker"),e.consume(f),e.exit("characterReferenceMarker"),e.exit("characterReference"),t)}return s(f)&&i++<o?(e.consume(f),c):n(f)}}const im={partial:!0,tokenize:DA},om={concrete:!0,name:"codeFenced",tokenize:MA};function MA(e,t,n){const r=this,i={partial:!0,tokenize:b};let o=0,s=0,l;return a;function a(k){return u(k)}function u(k){const A=r.events[r.events.length-1];return o=A&&A[1].type==="linePrefix"?A[2].sliceSerialize(A[1],!0).length:0,l=k,e.enter("codeFenced"),e.enter("codeFencedFence"),e.enter("codeFencedFenceSequence"),c(k)}function c(k){return k===l?(s++,e.consume(k),c):s<3?n(k):(e.exit("codeFencedFenceSequence"),Q(k)?te(e,f,"whitespace")(k):f(k))}function f(k){return k===null||U(k)?(e.exit("codeFencedFence"),r.interrupt?t(k):e.check(im,x,T)(k)):(e.enter("codeFencedFenceInfo"),e.enter("chunkString",{contentType:"string"}),d(k))}function d(k){return k===null||U(k)?(e.exit("chunkString"),e.exit("codeFencedFenceInfo"),f(k)):Q(k)?(e.exit("chunkString"),e.exit("codeFencedFenceInfo"),te(e,h,"whitespace")(k)):k===96&&k===l?n(k):(e.consume(k),d)}function h(k){return k===null||U(k)?f(k):(e.enter("codeFencedFenceMeta"),e.enter("chunkString",{contentType:"string"}),m(k))}function m(k){return k===null||U(k)?(e.exit("chunkString"),e.exit("codeFencedFenceMeta"),f(k)):k===96&&k===l?n(k):(e.consume(k),m)}function x(k){return e.attempt(i,T,E)(k)}function E(k){return e.enter("lineEnding"),e.consume(k),e.exit("lineEnding"),p}function p(k){return o>0&&Q(k)?te(e,g,"linePrefix",o+1)(k):g(k)}function g(k){return k===null||U(k)?e.check(im,x,T)(k):(e.enter("codeFlowValue"),y(k))}function y(k){return k===null||U(k)?(e.exit("codeFlowValue"),g(k)):(e.consume(k),y)}function T(k){return e.exit("codeFenced"),t(k)}function b(k,A,P){let O=0;return C;function C(B){return k.enter("lineEnding"),k.consume(B),k.exit("lineEnding"),L}function L(B){return k.enter("codeFencedFence"),Q(B)?te(k,F,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(B):F(B)}function F(B){return B===l?(k.enter("codeFencedFenceSequence"),W(B)):P(B)}function W(B){return B===l?(O++,k.consume(B),W):O>=s?(k.exit("codeFencedFenceSequence"),Q(B)?te(k,ee,"whitespace")(B):ee(B)):P(B)}function ee(B){return B===null||U(B)?(k.exit("codeFencedFence"),A(B)):P(B)}}}function DA(e,t,n){const r=this;return i;function i(s){return s===null?n(s):(e.enter("lineEnding"),e.consume(s),e.exit("lineEnding"),o)}function o(s){return r.parser.lazy[r.now().line]?n(s):t(s)}}const ga={name:"codeIndented",tokenize:_A},LA={partial:!0,tokenize:OA};function _A(e,t,n){const r=this;return i;function i(u){return e.enter("codeIndented"),te(e,o,"linePrefix",5)(u)}function o(u){const c=r.events[r.events.length-1];return c&&c[1].type==="linePrefix"&&c[2].sliceSerialize(c[1],!0).length>=4?s(u):n(u)}function s(u){return u===null?a(u):U(u)?e.attempt(LA,s,a)(u):(e.enter("codeFlowValue"),l(u))}function l(u){return u===null||U(u)?(e.exit("codeFlowValue"),s(u)):(e.consume(u),l)}function a(u){return e.exit("codeIndented"),t(u)}}function OA(e,t,n){const r=this;return i;function i(s){return r.parser.lazy[r.now().line]?n(s):U(s)?(e.enter("lineEnding"),e.consume(s),e.exit("lineEnding"),i):te(e,o,"linePrefix",5)(s)}function o(s){const l=r.events[r.events.length-1];return l&&l[1].type==="linePrefix"&&l[2].sliceSerialize(l[1],!0).length>=4?t(s):U(s)?i(s):n(s)}}const FA={name:"codeText",previous:zA,resolve:jA,tokenize:VA};function jA(e){let t=e.length-4,n=3,r,i;if((e[n][1].type==="lineEnding"||e[n][1].type==="space")&&(e[t][1].type==="lineEnding"||e[t][1].type==="space")){for(r=n;++r<t;)if(e[r][1].type==="codeTextData"){e[n][1].type="codeTextPadding",e[t][1].type="codeTextPadding",n+=2,t-=2;break}}for(r=n-1,t++;++r<=t;)i===void 0?r!==t&&e[r][1].type!=="lineEnding"&&(i=r):(r===t||e[r][1].type==="lineEnding")&&(e[i][1].type="codeTextData",r!==i+2&&(e[i][1].end=e[r-1][1].end,e.splice(i+2,r-i-2),t-=r-i-2,r=i+2),i=void 0);return e}function zA(e){return e!==96||this.events[this.events.length-1][1].type==="characterEscape"}function VA(e,t,n){let r=0,i,o;return s;function s(f){return e.enter("codeText"),e.enter("codeTextSequence"),l(f)}function l(f){return f===96?(e.consume(f),r++,l):(e.exit("codeTextSequence"),a(f))}function a(f){return f===null?n(f):f===32?(e.enter("space"),e.consume(f),e.exit("space"),a):f===96?(o=e.enter("codeTextSequence"),i=0,c(f)):U(f)?(e.enter("lineEnding"),e.consume(f),e.exit("lineEnding"),a):(e.enter("codeTextData"),u(f))}function u(f){return f===null||f===32||f===96||U(f)?(e.exit("codeTextData"),a(f)):(e.consume(f),u)}function c(f){return f===96?(e.consume(f),i++,c):i===r?(e.exit("codeTextSequence"),e.exit("codeText"),t(f)):(o.type="codeTextData",u(f))}}class BA{constructor(t){this.left=t?[...t]:[],this.right=[]}get(t){if(t<0||t>=this.left.length+this.right.length)throw new RangeError("Cannot access index `"+t+"` in a splice buffer of size `"+(this.left.length+this.right.length)+"`");return t<this.left.length?this.left[t]:this.right[this.right.length-t+this.left.length-1]}get length(){return this.left.length+this.right.length}shift(){return this.setCursor(0),this.right.pop()}slice(t,n){const r=n??Number.POSITIVE_INFINITY;return r<this.left.length?this.left.slice(t,r):t>this.left.length?this.right.slice(this.right.length-r+this.left.length,this.right.length-t+this.left.length).reverse():this.left.slice(t).concat(this.right.slice(this.right.length-r+this.left.length).reverse())}splice(t,n,r){const i=n||0;this.setCursor(Math.trunc(t));const o=this.right.splice(this.right.length-i,Number.POSITIVE_INFINITY);return r&&xi(this.left,r),o.reverse()}pop(){return this.setCursor(Number.POSITIVE_INFINITY),this.left.pop()}push(t){this.setCursor(Number.POSITIVE_INFINITY),this.left.push(t)}pushMany(t){this.setCursor(Number.POSITIVE_INFINITY),xi(this.left,t)}unshift(t){this.setCursor(0),this.right.push(t)}unshiftMany(t){this.setCursor(0),xi(this.right,t.reverse())}setCursor(t){if(!(t===this.left.length||t>this.left.length&&this.right.length===0||t<0&&this.left.length===0))if(t<this.left.length){const n=this.left.splice(t,Number.POSITIVE_INFINITY);xi(this.right,n.reverse())}else{const n=this.right.splice(this.left.length+this.right.length-t,Number.POSITIVE_INFINITY);xi(this.left,n.reverse())}}}function xi(e,t){let n=0;if(t.length<1e4)e.push(...t);else for(;n<t.length;)e.push(...t.slice(n,n+1e4)),n+=1e4}function nv(e){const t={};let n=-1,r,i,o,s,l,a,u;const c=new BA(e);for(;++n<c.length;){for(;n in t;)n=t[n];if(r=c.get(n),n&&r[1].type==="chunkFlow"&&c.get(n-1)[1].type==="listItemPrefix"&&(a=r[1]._tokenizer.events,o=0,o<a.length&&a[o][1].type==="lineEndingBlank"&&(o+=2),o<a.length&&a[o][1].type==="content"))for(;++o<a.length&&a[o][1].type!=="content";)a[o][1].type==="chunkText"&&(a[o][1]._isInFirstContentOfListItem=!0,o++);if(r[0]==="enter")r[1].contentType&&(Object.assign(t,UA(c,n)),n=t[n],u=!0);else if(r[1]._container){for(o=n,i=void 0;o--;)if(s=c.get(o),s[1].type==="lineEnding"||s[1].type==="lineEndingBlank")s[0]==="enter"&&(i&&(c.get(i)[1].type="lineEndingBlank"),s[1].type="lineEnding",i=o);else if(!(s[1].type==="linePrefix"||s[1].type==="listItemIndent"))break;i&&(r[1].end={...c.get(i)[1].start},l=c.slice(i,n),l.unshift(r),c.splice(i,n-i+1,l))}}return dt(e,0,Number.POSITIVE_INFINITY,c.slice(0)),!u}function UA(e,t){const n=e.get(t)[1],r=e.get(t)[2];let i=t-1;const o=[];let s=n._tokenizer;s||(s=r.parser[n.contentType](n.start),n._contentTypeTextTrailing&&(s._contentTypeTextTrailing=!0));const l=s.events,a=[],u={};let c,f,d=-1,h=n,m=0,x=0;const E=[x];for(;h;){for(;e.get(++i)[1]!==h;);o.push(i),h._tokenizer||(c=r.sliceStream(h),h.next||c.push(null),f&&s.defineSkip(h.start),h._isInFirstContentOfListItem&&(s._gfmTasklistFirstContentOfListItem=!0),s.write(c),h._isInFirstContentOfListItem&&(s._gfmTasklistFirstContentOfListItem=void 0)),f=h,h=h.next}for(h=n;++d<l.length;)l[d][0]==="exit"&&l[d-1][0]==="enter"&&l[d][1].type===l[d-1][1].type&&l[d][1].start.line!==l[d][1].end.line&&(x=d+1,E.push(x),h._tokenizer=void 0,h.previous=void 0,h=h.next);for(s.events=[],h?(h._tokenizer=void 0,h.previous=void 0):E.pop(),d=E.length;d--;){const p=l.slice(E[d],E[d+1]),g=o.pop();a.push([g,g+p.length-1]),e.splice(g,2,p)}for(a.reverse(),d=-1;++d<a.length;)u[m+a[d][0]]=m+a[d][1],m+=a[d][1]-a[d][0]-1;return u}const HA={resolve:WA,tokenize:KA},$A={partial:!0,tokenize:GA};function WA(e){return nv(e),e}function KA(e,t){let n;return r;function r(l){return e.enter("content"),n=e.enter("chunkContent",{contentType:"content"}),i(l)}function i(l){return l===null?o(l):U(l)?e.check($A,s,o)(l):(e.consume(l),i)}function o(l){return e.exit("chunkContent"),e.exit("content"),t(l)}function s(l){return e.consume(l),e.exit("chunkContent"),n.next=e.enter("chunkContent",{contentType:"content",previous:n}),n=n.next,i}}function GA(e,t,n){const r=this;return i;function i(s){return e.exit("chunkContent"),e.enter("lineEnding"),e.consume(s),e.exit("lineEnding"),te(e,o,"linePrefix")}function o(s){if(s===null||U(s))return n(s);const l=r.events[r.events.length-1];return!r.parser.constructs.disable.null.includes("codeIndented")&&l&&l[1].type==="linePrefix"&&l[2].sliceSerialize(l[1],!0).length>=4?t(s):e.interrupt(r.parser.constructs.flow,n,t)(s)}}function rv(e,t,n,r,i,o,s,l,a){const u=a||Number.POSITIVE_INFINITY;let c=0;return f;function f(p){return p===60?(e.enter(r),e.enter(i),e.enter(o),e.consume(p),e.exit(o),d):p===null||p===32||p===41||Qs(p)?n(p):(e.enter(r),e.enter(s),e.enter(l),e.enter("chunkString",{contentType:"string"}),x(p))}function d(p){return p===62?(e.enter(o),e.consume(p),e.exit(o),e.exit(i),e.exit(r),t):(e.enter(l),e.enter("chunkString",{contentType:"string"}),h(p))}function h(p){return p===62?(e.exit("chunkString"),e.exit(l),d(p)):p===null||p===60||U(p)?n(p):(e.consume(p),p===92?m:h)}function m(p){return p===60||p===62||p===92?(e.consume(p),h):h(p)}function x(p){return!c&&(p===null||p===41||le(p))?(e.exit("chunkString"),e.exit(l),e.exit(s),e.exit(r),t(p)):c<u&&p===40?(e.consume(p),c++,x):p===41?(e.consume(p),c--,x):p===null||p===32||p===40||Qs(p)?n(p):(e.consume(p),p===92?E:x)}function E(p){return p===40||p===41||p===92?(e.consume(p),x):x(p)}}function iv(e,t,n,r,i,o){const s=this;let l=0,a;return u;function u(h){return e.enter(r),e.enter(i),e.consume(h),e.exit(i),e.enter(o),c}function c(h){return l>999||h===null||h===91||h===93&&!a||h===94&&!l&&"_hiddenFootnoteSupport"in s.parser.constructs?n(h):h===93?(e.exit(o),e.enter(i),e.consume(h),e.exit(i),e.exit(r),t):U(h)?(e.enter("lineEnding"),e.consume(h),e.exit("lineEnding"),c):(e.enter("chunkString",{contentType:"string"}),f(h))}function f(h){return h===null||h===91||h===93||U(h)||l++>999?(e.exit("chunkString"),c(h)):(e.consume(h),a||(a=!Q(h)),h===92?d:f)}function d(h){return h===91||h===92||h===93?(e.consume(h),l++,f):f(h)}}function ov(e,t,n,r,i,o){let s;return l;function l(d){return d===34||d===39||d===40?(e.enter(r),e.enter(i),e.consume(d),e.exit(i),s=d===40?41:d,a):n(d)}function a(d){return d===s?(e.enter(i),e.consume(d),e.exit(i),e.exit(r),t):(e.enter(o),u(d))}function u(d){return d===s?(e.exit(o),a(s)):d===null?n(d):U(d)?(e.enter("lineEnding"),e.consume(d),e.exit("lineEnding"),te(e,u,"linePrefix")):(e.enter("chunkString",{contentType:"string"}),c(d))}function c(d){return d===s||d===null||U(d)?(e.exit("chunkString"),u(d)):(e.consume(d),d===92?f:c)}function f(d){return d===s||d===92?(e.consume(d),c):c(d)}}function Ui(e,t){let n;return r;function r(i){return U(i)?(e.enter("lineEnding"),e.consume(i),e.exit("lineEnding"),n=!0,r):Q(i)?te(e,r,n?"linePrefix":"lineSuffix")(i):t(i)}}const YA={name:"definition",tokenize:XA},qA={partial:!0,tokenize:QA};function XA(e,t,n){const r=this;let i;return o;function o(h){return e.enter("definition"),s(h)}function s(h){return iv.call(r,e,l,n,"definitionLabel","definitionLabelMarker","definitionLabelString")(h)}function l(h){return i=_t(r.sliceSerialize(r.events[r.events.length-1][1]).slice(1,-1)),h===58?(e.enter("definitionMarker"),e.consume(h),e.exit("definitionMarker"),a):n(h)}function a(h){return le(h)?Ui(e,u)(h):u(h)}function u(h){return rv(e,c,n,"definitionDestination","definitionDestinationLiteral","definitionDestinationLiteralMarker","definitionDestinationRaw","definitionDestinationString")(h)}function c(h){return e.attempt(qA,f,f)(h)}function f(h){return Q(h)?te(e,d,"whitespace")(h):d(h)}function d(h){return h===null||U(h)?(e.exit("definition"),r.parser.defined.push(i),t(h)):n(h)}}function QA(e,t,n){return r;function r(l){return le(l)?Ui(e,i)(l):n(l)}function i(l){return ov(e,o,n,"definitionTitle","definitionTitleMarker","definitionTitleString")(l)}function o(l){return Q(l)?te(e,s,"whitespace")(l):s(l)}function s(l){return l===null||U(l)?t(l):n(l)}}const ZA={name:"hardBreakEscape",tokenize:JA};function JA(e,t,n){return r;function r(o){return e.enter("hardBreakEscape"),e.consume(o),i}function i(o){return U(o)?(e.exit("hardBreakEscape"),t(o)):n(o)}}const eP={name:"headingAtx",resolve:tP,tokenize:nP};function tP(e,t){let n=e.length-2,r=3,i,o;return e[r][1].type==="whitespace"&&(r+=2),n-2>r&&e[n][1].type==="whitespace"&&(n-=2),e[n][1].type==="atxHeadingSequence"&&(r===n-1||n-4>r&&e[n-2][1].type==="whitespace")&&(n-=r+1===n?2:4),n>r&&(i={type:"atxHeadingText",start:e[r][1].start,end:e[n][1].end},o={type:"chunkText",start:e[r][1].start,end:e[n][1].end,contentType:"text"},dt(e,r,n-r+1,[["enter",i,t],["enter",o,t],["exit",o,t],["exit",i,t]])),e}function nP(e,t,n){let r=0;return i;function i(c){return e.enter("atxHeading"),o(c)}function o(c){return e.enter("atxHeadingSequence"),s(c)}function s(c){return c===35&&r++<6?(e.consume(c),s):c===null||le(c)?(e.exit("atxHeadingSequence"),l(c)):n(c)}function l(c){return c===35?(e.enter("atxHeadingSequence"),a(c)):c===null||U(c)?(e.exit("atxHeading"),t(c)):Q(c)?te(e,l,"whitespace")(c):(e.enter("atxHeadingText"),u(c))}function a(c){return c===35?(e.consume(c),a):(e.exit("atxHeadingSequence"),l(c))}function u(c){return c===null||c===35||le(c)?(e.exit("atxHeadingText"),l(c)):(e.consume(c),u)}}const rP=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],sm=["pre","script","style","textarea"],iP={concrete:!0,name:"htmlFlow",resolveTo:lP,tokenize:aP},oP={partial:!0,tokenize:cP},sP={partial:!0,tokenize:uP};function lP(e){let t=e.length;for(;t--&&!(e[t][0]==="enter"&&e[t][1].type==="htmlFlow"););return t>1&&e[t-2][1].type==="linePrefix"&&(e[t][1].start=e[t-2][1].start,e[t+1][1].start=e[t-2][1].start,e.splice(t-2,2)),e}function aP(e,t,n){const r=this;let i,o,s,l,a;return u;function u(S){return c(S)}function c(S){return e.enter("htmlFlow"),e.enter("htmlFlowData"),e.consume(S),f}function f(S){return S===33?(e.consume(S),d):S===47?(e.consume(S),o=!0,x):S===63?(e.consume(S),i=3,r.interrupt?t:v):Ke(S)?(e.consume(S),s=String.fromCharCode(S),E):n(S)}function d(S){return S===45?(e.consume(S),i=2,h):S===91?(e.consume(S),i=5,l=0,m):Ke(S)?(e.consume(S),i=4,r.interrupt?t:v):n(S)}function h(S){return S===45?(e.consume(S),r.interrupt?t:v):n(S)}function m(S){const z="CDATA[";return S===z.charCodeAt(l++)?(e.consume(S),l===z.length?r.interrupt?t:F:m):n(S)}function x(S){return Ke(S)?(e.consume(S),s=String.fromCharCode(S),E):n(S)}function E(S){if(S===null||S===47||S===62||le(S)){const z=S===47,X=s.toLowerCase();return!z&&!o&&sm.includes(X)?(i=1,r.interrupt?t(S):F(S)):rP.includes(s.toLowerCase())?(i=6,z?(e.consume(S),p):r.interrupt?t(S):F(S)):(i=7,r.interrupt&&!r.parser.lazy[r.now().line]?n(S):o?g(S):y(S))}return S===45||Be(S)?(e.consume(S),s+=String.fromCharCode(S),E):n(S)}function p(S){return S===62?(e.consume(S),r.interrupt?t:F):n(S)}function g(S){return Q(S)?(e.consume(S),g):C(S)}function y(S){return S===47?(e.consume(S),C):S===58||S===95||Ke(S)?(e.consume(S),T):Q(S)?(e.consume(S),y):C(S)}function T(S){return S===45||S===46||S===58||S===95||Be(S)?(e.consume(S),T):b(S)}function b(S){return S===61?(e.consume(S),k):Q(S)?(e.consume(S),b):y(S)}function k(S){return S===null||S===60||S===61||S===62||S===96?n(S):S===34||S===39?(e.consume(S),a=S,A):Q(S)?(e.consume(S),k):P(S)}function A(S){return S===a?(e.consume(S),a=null,O):S===null||U(S)?n(S):(e.consume(S),A)}function P(S){return S===null||S===34||S===39||S===47||S===60||S===61||S===62||S===96||le(S)?b(S):(e.consume(S),P)}function O(S){return S===47||S===62||Q(S)?y(S):n(S)}function C(S){return S===62?(e.consume(S),L):n(S)}function L(S){return S===null||U(S)?F(S):Q(S)?(e.consume(S),L):n(S)}function F(S){return S===45&&i===2?(e.consume(S),ce):S===60&&i===1?(e.consume(S),G):S===62&&i===4?(e.consume(S),q):S===63&&i===3?(e.consume(S),v):S===93&&i===5?(e.consume(S),V):U(S)&&(i===6||i===7)?(e.exit("htmlFlowData"),e.check(oP,re,W)(S)):S===null||U(S)?(e.exit("htmlFlowData"),W(S)):(e.consume(S),F)}function W(S){return e.check(sP,ee,re)(S)}function ee(S){return e.enter("lineEnding"),e.consume(S),e.exit("lineEnding"),B}function B(S){return S===null||U(S)?W(S):(e.enter("htmlFlowData"),F(S))}function ce(S){return S===45?(e.consume(S),v):F(S)}function G(S){return S===47?(e.consume(S),s="",M):F(S)}function M(S){if(S===62){const z=s.toLowerCase();return sm.includes(z)?(e.consume(S),q):F(S)}return Ke(S)&&s.length<8?(e.consume(S),s+=String.fromCharCode(S),M):F(S)}function V(S){return S===93?(e.consume(S),v):F(S)}function v(S){return S===62?(e.consume(S),q):S===45&&i===2?(e.consume(S),v):F(S)}function q(S){return S===null||U(S)?(e.exit("htmlFlowData"),re(S)):(e.consume(S),q)}function re(S){return e.exit("htmlFlow"),t(S)}}function uP(e,t,n){const r=this;return i;function i(s){return U(s)?(e.enter("lineEnding"),e.consume(s),e.exit("lineEnding"),o):n(s)}function o(s){return r.parser.lazy[r.now().line]?n(s):t(s)}}function cP(e,t,n){return r;function r(i){return e.enter("lineEnding"),e.consume(i),e.exit("lineEnding"),e.attempt(Io,t,n)}}const fP={name:"htmlText",tokenize:dP};function dP(e,t,n){const r=this;let i,o,s;return l;function l(v){return e.enter("htmlText"),e.enter("htmlTextData"),e.consume(v),a}function a(v){return v===33?(e.consume(v),u):v===47?(e.consume(v),b):v===63?(e.consume(v),y):Ke(v)?(e.consume(v),P):n(v)}function u(v){return v===45?(e.consume(v),c):v===91?(e.consume(v),o=0,m):Ke(v)?(e.consume(v),g):n(v)}function c(v){return v===45?(e.consume(v),h):n(v)}function f(v){return v===null?n(v):v===45?(e.consume(v),d):U(v)?(s=f,G(v)):(e.consume(v),f)}function d(v){return v===45?(e.consume(v),h):f(v)}function h(v){return v===62?ce(v):v===45?d(v):f(v)}function m(v){const q="CDATA[";return v===q.charCodeAt(o++)?(e.consume(v),o===q.length?x:m):n(v)}function x(v){return v===null?n(v):v===93?(e.consume(v),E):U(v)?(s=x,G(v)):(e.consume(v),x)}function E(v){return v===93?(e.consume(v),p):x(v)}function p(v){return v===62?ce(v):v===93?(e.consume(v),p):x(v)}function g(v){return v===null||v===62?ce(v):U(v)?(s=g,G(v)):(e.consume(v),g)}function y(v){return v===null?n(v):v===63?(e.consume(v),T):U(v)?(s=y,G(v)):(e.consume(v),y)}function T(v){return v===62?ce(v):y(v)}function b(v){return Ke(v)?(e.consume(v),k):n(v)}function k(v){return v===45||Be(v)?(e.consume(v),k):A(v)}function A(v){return U(v)?(s=A,G(v)):Q(v)?(e.consume(v),A):ce(v)}function P(v){return v===45||Be(v)?(e.consume(v),P):v===47||v===62||le(v)?O(v):n(v)}function O(v){return v===47?(e.consume(v),ce):v===58||v===95||Ke(v)?(e.consume(v),C):U(v)?(s=O,G(v)):Q(v)?(e.consume(v),O):ce(v)}function C(v){return v===45||v===46||v===58||v===95||Be(v)?(e.consume(v),C):L(v)}function L(v){return v===61?(e.consume(v),F):U(v)?(s=L,G(v)):Q(v)?(e.consume(v),L):O(v)}function F(v){return v===null||v===60||v===61||v===62||v===96?n(v):v===34||v===39?(e.consume(v),i=v,W):U(v)?(s=F,G(v)):Q(v)?(e.consume(v),F):(e.consume(v),ee)}function W(v){return v===i?(e.consume(v),i=void 0,B):v===null?n(v):U(v)?(s=W,G(v)):(e.consume(v),W)}function ee(v){return v===null||v===34||v===39||v===60||v===61||v===96?n(v):v===47||v===62||le(v)?O(v):(e.consume(v),ee)}function B(v){return v===47||v===62||le(v)?O(v):n(v)}function ce(v){return v===62?(e.consume(v),e.exit("htmlTextData"),e.exit("htmlText"),t):n(v)}function G(v){return e.exit("htmlTextData"),e.enter("lineEnding"),e.consume(v),e.exit("lineEnding"),M}function M(v){return Q(v)?te(e,V,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(v):V(v)}function V(v){return e.enter("htmlTextData"),s(v)}}const Uf={name:"labelEnd",resolveAll:gP,resolveTo:yP,tokenize:xP},hP={tokenize:vP},pP={tokenize:wP},mP={tokenize:kP};function gP(e){let t=-1;const n=[];for(;++t<e.length;){const r=e[t][1];if(n.push(e[t]),r.type==="labelImage"||r.type==="labelLink"||r.type==="labelEnd"){const i=r.type==="labelImage"?4:2;r.type="data",t+=i}}return e.length!==n.length&&dt(e,0,e.length,n),e}function yP(e,t){let n=e.length,r=0,i,o,s,l;for(;n--;)if(i=e[n][1],o){if(i.type==="link"||i.type==="labelLink"&&i._inactive)break;e[n][0]==="enter"&&i.type==="labelLink"&&(i._inactive=!0)}else if(s){if(e[n][0]==="enter"&&(i.type==="labelImage"||i.type==="labelLink")&&!i._balanced&&(o=n,i.type!=="labelLink")){r=2;break}}else i.type==="labelEnd"&&(s=n);const a={type:e[o][1].type==="labelLink"?"link":"image",start:{...e[o][1].start},end:{...e[e.length-1][1].end}},u={type:"label",start:{...e[o][1].start},end:{...e[s][1].end}},c={type:"labelText",start:{...e[o+r+2][1].end},end:{...e[s-2][1].start}};return l=[["enter",a,t],["enter",u,t]],l=wt(l,e.slice(o+1,o+r+3)),l=wt(l,[["enter",c,t]]),l=wt(l,Cl(t.parser.constructs.insideSpan.null,e.slice(o+r+4,s-3),t)),l=wt(l,[["exit",c,t],e[s-2],e[s-1],["exit",u,t]]),l=wt(l,e.slice(s+1)),l=wt(l,[["exit",a,t]]),dt(e,o,e.length,l),e}function xP(e,t,n){const r=this;let i=r.events.length,o,s;for(;i--;)if((r.events[i][1].type==="labelImage"||r.events[i][1].type==="labelLink")&&!r.events[i][1]._balanced){o=r.events[i][1];break}return l;function l(d){return o?o._inactive?f(d):(s=r.parser.defined.includes(_t(r.sliceSerialize({start:o.end,end:r.now()}))),e.enter("labelEnd"),e.enter("labelMarker"),e.consume(d),e.exit("labelMarker"),e.exit("labelEnd"),a):n(d)}function a(d){return d===40?e.attempt(hP,c,s?c:f)(d):d===91?e.attempt(pP,c,s?u:f)(d):s?c(d):f(d)}function u(d){return e.attempt(mP,c,f)(d)}function c(d){return t(d)}function f(d){return o._balanced=!0,n(d)}}function vP(e,t,n){return r;function r(f){return e.enter("resource"),e.enter("resourceMarker"),e.consume(f),e.exit("resourceMarker"),i}function i(f){return le(f)?Ui(e,o)(f):o(f)}function o(f){return f===41?c(f):rv(e,s,l,"resourceDestination","resourceDestinationLiteral","resourceDestinationLiteralMarker","resourceDestinationRaw","resourceDestinationString",32)(f)}function s(f){return le(f)?Ui(e,a)(f):c(f)}function l(f){return n(f)}function a(f){return f===34||f===39||f===40?ov(e,u,n,"resourceTitle","resourceTitleMarker","resourceTitleString")(f):c(f)}function u(f){return le(f)?Ui(e,c)(f):c(f)}function c(f){return f===41?(e.enter("resourceMarker"),e.consume(f),e.exit("resourceMarker"),e.exit("resource"),t):n(f)}}function wP(e,t,n){const r=this;return i;function i(l){return iv.call(r,e,o,s,"reference","referenceMarker","referenceString")(l)}function o(l){return r.parser.defined.includes(_t(r.sliceSerialize(r.events[r.events.length-1][1]).slice(1,-1)))?t(l):n(l)}function s(l){return n(l)}}function kP(e,t,n){return r;function r(o){return e.enter("reference"),e.enter("referenceMarker"),e.consume(o),e.exit("referenceMarker"),i}function i(o){return o===93?(e.enter("referenceMarker"),e.consume(o),e.exit("referenceMarker"),e.exit("reference"),t):n(o)}}const SP={name:"labelStartImage",resolveAll:Uf.resolveAll,tokenize:CP};function CP(e,t,n){const r=this;return i;function i(l){return e.enter("labelImage"),e.enter("labelImageMarker"),e.consume(l),e.exit("labelImageMarker"),o}function o(l){return l===91?(e.enter("labelMarker"),e.consume(l),e.exit("labelMarker"),e.exit("labelImage"),s):n(l)}function s(l){return l===94&&"_hiddenFootnoteSupport"in r.parser.constructs?n(l):t(l)}}const EP={name:"labelStartLink",resolveAll:Uf.resolveAll,tokenize:TP};function TP(e,t,n){const r=this;return i;function i(s){return e.enter("labelLink"),e.enter("labelMarker"),e.consume(s),e.exit("labelMarker"),e.exit("labelLink"),o}function o(s){return s===94&&"_hiddenFootnoteSupport"in r.parser.constructs?n(s):t(s)}}const ya={name:"lineEnding",tokenize:bP};function bP(e,t){return n;function n(r){return e.enter("lineEnding"),e.consume(r),e.exit("lineEnding"),te(e,t,"linePrefix")}}const vs={name:"thematicBreak",tokenize:AP};function AP(e,t,n){let r=0,i;return o;function o(u){return e.enter("thematicBreak"),s(u)}function s(u){return i=u,l(u)}function l(u){return u===i?(e.enter("thematicBreakSequence"),a(u)):r>=3&&(u===null||U(u))?(e.exit("thematicBreak"),t(u)):n(u)}function a(u){return u===i?(e.consume(u),r++,a):(e.exit("thematicBreakSequence"),Q(u)?te(e,l,"whitespace")(u):l(u))}}const Ze={continuation:{tokenize:RP},exit:DP,name:"list",tokenize:NP},PP={partial:!0,tokenize:LP},IP={partial:!0,tokenize:MP};function NP(e,t,n){const r=this,i=r.events[r.events.length-1];let o=i&&i[1].type==="linePrefix"?i[2].sliceSerialize(i[1],!0).length:0,s=0;return l;function l(h){const m=r.containerState.type||(h===42||h===43||h===45?"listUnordered":"listOrdered");if(m==="listUnordered"?!r.containerState.marker||h===r.containerState.marker:Yu(h)){if(r.containerState.type||(r.containerState.type=m,e.enter(m,{_container:!0})),m==="listUnordered")return e.enter("listItemPrefix"),h===42||h===45?e.check(vs,n,u)(h):u(h);if(!r.interrupt||h===49)return e.enter("listItemPrefix"),e.enter("listItemValue"),a(h)}return n(h)}function a(h){return Yu(h)&&++s<10?(e.consume(h),a):(!r.interrupt||s<2)&&(r.containerState.marker?h===r.containerState.marker:h===41||h===46)?(e.exit("listItemValue"),u(h)):n(h)}function u(h){return e.enter("listItemMarker"),e.consume(h),e.exit("listItemMarker"),r.containerState.marker=r.containerState.marker||h,e.check(Io,r.interrupt?n:c,e.attempt(PP,d,f))}function c(h){return r.containerState.initialBlankLine=!0,o++,d(h)}function f(h){return Q(h)?(e.enter("listItemPrefixWhitespace"),e.consume(h),e.exit("listItemPrefixWhitespace"),d):n(h)}function d(h){return r.containerState.size=o+r.sliceSerialize(e.exit("listItemPrefix"),!0).length,t(h)}}function RP(e,t,n){const r=this;return r.containerState._closeFlow=void 0,e.check(Io,i,o);function i(l){return r.containerState.furtherBlankLines=r.containerState.furtherBlankLines||r.containerState.initialBlankLine,te(e,t,"listItemIndent",r.containerState.size+1)(l)}function o(l){return r.containerState.furtherBlankLines||!Q(l)?(r.containerState.furtherBlankLines=void 0,r.containerState.initialBlankLine=void 0,s(l)):(r.containerState.furtherBlankLines=void 0,r.containerState.initialBlankLine=void 0,e.attempt(IP,t,s)(l))}function s(l){return r.containerState._closeFlow=!0,r.interrupt=void 0,te(e,e.attempt(Ze,t,n),"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(l)}}function MP(e,t,n){const r=this;return te(e,i,"listItemIndent",r.containerState.size+1);function i(o){const s=r.events[r.events.length-1];return s&&s[1].type==="listItemIndent"&&s[2].sliceSerialize(s[1],!0).length===r.containerState.size?t(o):n(o)}}function DP(e){e.exit(this.containerState.type)}function LP(e,t,n){const r=this;return te(e,i,"listItemPrefixWhitespace",r.parser.constructs.disable.null.includes("codeIndented")?void 0:5);function i(o){const s=r.events[r.events.length-1];return!Q(o)&&s&&s[1].type==="listItemPrefixWhitespace"?t(o):n(o)}}const lm={name:"setextUnderline",resolveTo:_P,tokenize:OP};function _P(e,t){let n=e.length,r,i,o;for(;n--;)if(e[n][0]==="enter"){if(e[n][1].type==="content"){r=n;break}e[n][1].type==="paragraph"&&(i=n)}else e[n][1].type==="content"&&e.splice(n,1),!o&&e[n][1].type==="definition"&&(o=n);const s={type:"setextHeading",start:{...e[r][1].start},end:{...e[e.length-1][1].end}};return e[i][1].type="setextHeadingText",o?(e.splice(i,0,["enter",s,t]),e.splice(o+1,0,["exit",e[r][1],t]),e[r][1].end={...e[o][1].end}):e[r][1]=s,e.push(["exit",s,t]),e}function OP(e,t,n){const r=this;let i;return o;function o(u){let c=r.events.length,f;for(;c--;)if(r.events[c][1].type!=="lineEnding"&&r.events[c][1].type!=="linePrefix"&&r.events[c][1].type!=="content"){f=r.events[c][1].type==="paragraph";break}return!r.parser.lazy[r.now().line]&&(r.interrupt||f)?(e.enter("setextHeadingLine"),i=u,s(u)):n(u)}function s(u){return e.enter("setextHeadingLineSequence"),l(u)}function l(u){return u===i?(e.consume(u),l):(e.exit("setextHeadingLineSequence"),Q(u)?te(e,a,"lineSuffix")(u):a(u))}function a(u){return u===null||U(u)?(e.exit("setextHeadingLine"),t(u)):n(u)}}const FP={tokenize:jP};function jP(e){const t=this,n=e.attempt(Io,r,e.attempt(this.parser.constructs.flowInitial,i,te(e,e.attempt(this.parser.constructs.flow,i,e.attempt(HA,i)),"linePrefix")));return n;function r(o){if(o===null){e.consume(o);return}return e.enter("lineEndingBlank"),e.consume(o),e.exit("lineEndingBlank"),t.currentConstruct=void 0,n}function i(o){if(o===null){e.consume(o);return}return e.enter("lineEnding"),e.consume(o),e.exit("lineEnding"),t.currentConstruct=void 0,n}}const zP={resolveAll:lv()},VP=sv("string"),BP=sv("text");function sv(e){return{resolveAll:lv(e==="text"?UP:void 0),tokenize:t};function t(n){const r=this,i=this.parser.constructs[e],o=n.attempt(i,s,l);return s;function s(c){return u(c)?o(c):l(c)}function l(c){if(c===null){n.consume(c);return}return n.enter("data"),n.consume(c),a}function a(c){return u(c)?(n.exit("data"),o(c)):(n.consume(c),a)}function u(c){if(c===null)return!0;const f=i[c];let d=-1;if(f)for(;++d<f.length;){const h=f[d];if(!h.previous||h.previous.call(r,r.previous))return!0}return!1}}}function lv(e){return t;function t(n,r){let i=-1,o;for(;++i<=n.length;)o===void 0?n[i]&&n[i][1].type==="data"&&(o=i,i++):(!n[i]||n[i][1].type!=="data")&&(i!==o+2&&(n[o][1].end=n[i-1][1].end,n.splice(o+2,i-o-2),i=o+2),o=void 0);return e?e(n,r):n}}function UP(e,t){let n=0;for(;++n<=e.length;)if((n===e.length||e[n][1].type==="lineEnding")&&e[n-1][1].type==="data"){const r=e[n-1][1],i=t.sliceStream(r);let o=i.length,s=-1,l=0,a;for(;o--;){const u=i[o];if(typeof u=="string"){for(s=u.length;u.charCodeAt(s-1)===32;)l++,s--;if(s)break;s=-1}else if(u===-2)a=!0,l++;else if(u!==-1){o++;break}}if(t._contentTypeTextTrailing&&n===e.length&&(l=0),l){const u={type:n===e.length||a||l<2?"lineSuffix":"hardBreakTrailing",start:{_bufferIndex:o?s:r.start._bufferIndex+s,_index:r.start._index+o,line:r.end.line,column:r.end.column-l,offset:r.end.offset-l},end:{...r.end}};r.end={...u.start},r.start.offset===r.end.offset?Object.assign(r,u):(e.splice(n,0,["enter",u,t],["exit",u,t]),n+=2)}n++}return e}const HP={42:Ze,43:Ze,45:Ze,48:Ze,49:Ze,50:Ze,51:Ze,52:Ze,53:Ze,54:Ze,55:Ze,56:Ze,57:Ze,62:Jx},$P={91:YA},WP={[-2]:ga,[-1]:ga,32:ga},KP={35:eP,42:vs,45:[lm,vs],60:iP,61:lm,95:vs,96:om,126:om},GP={38:tv,92:ev},YP={[-5]:ya,[-4]:ya,[-3]:ya,33:SP,38:tv,42:qu,60:[EA,fP],91:EP,92:[ZA,ev],93:Uf,95:qu,96:FA},qP={null:[qu,zP]},XP={null:[42,95]},QP={null:[]},ZP=Object.freeze(Object.defineProperty({__proto__:null,attentionMarkers:XP,contentInitial:$P,disable:QP,document:HP,flow:KP,flowInitial:WP,insideSpan:qP,string:GP,text:YP},Symbol.toStringTag,{value:"Module"}));function JP(e,t,n){let r={_bufferIndex:-1,_index:0,line:n&&n.line||1,column:n&&n.column||1,offset:n&&n.offset||0};const i={},o=[];let s=[],l=[];const a={attempt:A(b),check:A(k),consume:g,enter:y,exit:T,interrupt:A(k,{interrupt:!0})},u={code:null,containerState:{},defineSkip:x,events:[],now:m,parser:e,previous:null,sliceSerialize:d,sliceStream:h,write:f};let c=t.tokenize.call(u,a);return t.resolveAll&&o.push(t),u;function f(L){return s=wt(s,L),E(),s[s.length-1]!==null?[]:(P(t,0),u.events=Cl(o,u.events,u),u.events)}function d(L,F){return tI(h(L),F)}function h(L){return eI(s,L)}function m(){const{_bufferIndex:L,_index:F,line:W,column:ee,offset:B}=r;return{_bufferIndex:L,_index:F,line:W,column:ee,offset:B}}function x(L){i[L.line]=L.column,C()}function E(){let L;for(;r._index<s.length;){const F=s[r._index];if(typeof F=="string")for(L=r._index,r._bufferIndex<0&&(r._bufferIndex=0);r._index===L&&r._bufferIndex<F.length;)p(F.charCodeAt(r._bufferIndex));else p(F)}}function p(L){c=c(L)}function g(L){U(L)?(r.line++,r.column=1,r.offset+=L===-3?2:1,C()):L!==-1&&(r.column++,r.offset++),r._bufferIndex<0?r._index++:(r._bufferIndex++,r._bufferIndex===s[r._index].length&&(r._bufferIndex=-1,r._index++)),u.previous=L}function y(L,F){const W=F||{};return W.type=L,W.start=m(),u.events.push(["enter",W,u]),l.push(W),W}function T(L){const F=l.pop();return F.end=m(),u.events.push(["exit",F,u]),F}function b(L,F){P(L,F.from)}function k(L,F){F.restore()}function A(L,F){return W;function W(ee,B,ce){let G,M,V,v;return Array.isArray(ee)?re(ee):"tokenize"in ee?re([ee]):q(ee);function q(H){return ie;function ie(me){const Ie=me!==null&&H[me],Oe=me!==null&&H.null,$e=[...Array.isArray(Ie)?Ie:Ie?[Ie]:[],...Array.isArray(Oe)?Oe:Oe?[Oe]:[]];return re($e)(me)}}function re(H){return G=H,M=0,H.length===0?ce:S(H[M])}function S(H){return ie;function ie(me){return v=O(),V=H,H.partial||(u.currentConstruct=H),H.name&&u.parser.constructs.disable.null.includes(H.name)?X():H.tokenize.call(F?Object.assign(Object.create(u),F):u,a,z,X)(me)}}function z(H){return L(V,v),B}function X(H){return v.restore(),++M<G.length?S(G[M]):ce}}}function P(L,F){L.resolveAll&&!o.includes(L)&&o.push(L),L.resolve&&dt(u.events,F,u.events.length-F,L.resolve(u.events.slice(F),u)),L.resolveTo&&(u.events=L.resolveTo(u.events,u))}function O(){const L=m(),F=u.previous,W=u.currentConstruct,ee=u.events.length,B=Array.from(l);return{from:ee,restore:ce};function ce(){r=L,u.previous=F,u.currentConstruct=W,u.events.length=ee,l=B,C()}}function C(){r.line in i&&r.column<2&&(r.column=i[r.line],r.offset+=i[r.line]-1)}}function eI(e,t){const n=t.start._index,r=t.start._bufferIndex,i=t.end._index,o=t.end._bufferIndex;let s;if(n===i)s=[e[n].slice(r,o)];else{if(s=e.slice(n,i),r>-1){const l=s[0];typeof l=="string"?s[0]=l.slice(r):s.shift()}o>0&&s.push(e[i].slice(0,o))}return s}function tI(e,t){let n=-1;const r=[];let i;for(;++n<e.length;){const o=e[n];let s;if(typeof o=="string")s=o;else switch(o){case-5:{s="\r";break}case-4:{s=`
`;break}case-3:{s=`\r
`;break}case-2:{s=t?" ":"	";break}case-1:{if(!t&&i)continue;s=" ";break}default:s=String.fromCharCode(o)}i=o===-2,r.push(s)}return r.join("")}function nI(e){const r={constructs:Qx([ZP,...(e||{}).extensions||[]]),content:i(yA),defined:[],document:i(vA),flow:i(FP),lazy:{},string:i(VP),text:i(BP)};return r;function i(o){return s;function s(l){return JP(r,o,l)}}}function rI(e){for(;!nv(e););return e}const am=/[\0\t\n\r]/g;function iI(){let e=1,t="",n=!0,r;return i;function i(o,s,l){const a=[];let u,c,f,d,h;for(o=t+(typeof o=="string"?o.toString():new TextDecoder(s||void 0).decode(o)),f=0,t="",n&&(o.charCodeAt(0)===65279&&f++,n=void 0);f<o.length;){if(am.lastIndex=f,u=am.exec(o),d=u&&u.index!==void 0?u.index:o.length,h=o.charCodeAt(d),!u){t=o.slice(f);break}if(h===10&&f===d&&r)a.push(-3),r=void 0;else switch(r&&(a.push(-5),r=void 0),f<d&&(a.push(o.slice(f,d)),e+=d-f),h){case 0:{a.push(65533),e++;break}case 9:{for(c=Math.ceil(e/4)*4,a.push(-2);e++<c;)a.push(-1);break}case 10:{a.push(-4),e=1;break}default:r=!0,e=1}f=d+1}return l&&(r&&a.push(-5),t&&a.push(t),a.push(null)),a}}const oI=/\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;function sI(e){return e.replace(oI,lI)}function lI(e,t,n){if(t)return t;if(n.charCodeAt(0)===35){const i=n.charCodeAt(1),o=i===120||i===88;return Zx(n.slice(o?2:1),o?16:10)}return Bf(n)||e}const av={}.hasOwnProperty;function aI(e,t,n){return typeof t!="string"&&(n=t,t=void 0),uI(n)(rI(nI(n).document().write(iI()(e,t,!0))))}function uI(e){const t={transforms:[],canContainEols:["emphasis","fragment","heading","paragraph","strong"],enter:{autolink:o(td),autolinkProtocol:O,autolinkEmail:O,atxHeading:o(Zf),blockQuote:o(Oe),characterEscape:O,characterReference:O,codeFenced:o($e),codeFencedFenceInfo:s,codeFencedFenceMeta:s,codeIndented:o($e,s),codeText:o(fr,s),codeTextData:O,data:O,codeFlowValue:O,definition:o(Uv),definitionDestinationString:s,definitionLabelString:s,definitionTitleString:s,emphasis:o(Hv),hardBreakEscape:o(Jf),hardBreakTrailing:o(Jf),htmlFlow:o(ed,s),htmlFlowData:O,htmlText:o(ed,s),htmlTextData:O,image:o($v),label:s,link:o(td),listItem:o(Wv),listItemValue:d,listOrdered:o(nd,f),listUnordered:o(nd),paragraph:o(Kv),reference:S,referenceString:s,resourceDestinationString:s,resourceTitleString:s,setextHeading:o(Zf),strong:o(Gv),thematicBreak:o(qv)},exit:{atxHeading:a(),atxHeadingSequence:b,autolink:a(),autolinkEmail:Ie,autolinkProtocol:me,blockQuote:a(),characterEscapeValue:C,characterReferenceMarkerHexadecimal:X,characterReferenceMarkerNumeric:X,characterReferenceValue:H,characterReference:ie,codeFenced:a(E),codeFencedFence:x,codeFencedFenceInfo:h,codeFencedFenceMeta:m,codeFlowValue:C,codeIndented:a(p),codeText:a(B),codeTextData:C,data:C,definition:a(),definitionDestinationString:T,definitionLabelString:g,definitionTitleString:y,emphasis:a(),hardBreakEscape:a(F),hardBreakTrailing:a(F),htmlFlow:a(W),htmlFlowData:C,htmlText:a(ee),htmlTextData:C,image:a(G),label:V,labelText:M,lineEnding:L,link:a(ce),listItem:a(),listOrdered:a(),listUnordered:a(),paragraph:a(),referenceString:z,resourceDestinationString:v,resourceTitleString:q,resource:re,setextHeading:a(P),setextHeadingLineSequence:A,setextHeadingText:k,strong:a(),thematicBreak:a()}};uv(t,(e||{}).mdastExtensions||[]);const n={};return r;function r(I){let _={type:"root",children:[]};const K={stack:[_],tokenStack:[],config:t,enter:l,exit:u,buffer:s,resume:c,data:n},J=[];let se=-1;for(;++se<I.length;)if(I[se][1].type==="listOrdered"||I[se][1].type==="listUnordered")if(I[se][0]==="enter")J.push(se);else{const At=J.pop();se=i(I,At,se)}for(se=-1;++se<I.length;){const At=t[I[se][0]];av.call(At,I[se][1].type)&&At[I[se][1].type].call(Object.assign({sliceSerialize:I[se][2].sliceSerialize},K),I[se][1])}if(K.tokenStack.length>0){const At=K.tokenStack[K.tokenStack.length-1];(At[1]||um).call(K,void 0,At[0])}for(_.position={start:cn(I.length>0?I[0][1].start:{line:1,column:1,offset:0}),end:cn(I.length>0?I[I.length-2][1].end:{line:1,column:1,offset:0})},se=-1;++se<t.transforms.length;)_=t.transforms[se](_)||_;return _}function i(I,_,K){let J=_-1,se=-1,At=!1,Fn,Kt,li,ai;for(;++J<=K;){const lt=I[J];switch(lt[1].type){case"listUnordered":case"listOrdered":case"blockQuote":{lt[0]==="enter"?se++:se--,ai=void 0;break}case"lineEndingBlank":{lt[0]==="enter"&&(Fn&&!ai&&!se&&!li&&(li=J),ai=void 0);break}case"linePrefix":case"listItemValue":case"listItemMarker":case"listItemPrefix":case"listItemPrefixWhitespace":break;default:ai=void 0}if(!se&&lt[0]==="enter"&&lt[1].type==="listItemPrefix"||se===-1&&lt[0]==="exit"&&(lt[1].type==="listUnordered"||lt[1].type==="listOrdered")){if(Fn){let dr=J;for(Kt=void 0;dr--;){const Gt=I[dr];if(Gt[1].type==="lineEnding"||Gt[1].type==="lineEndingBlank"){if(Gt[0]==="exit")continue;Kt&&(I[Kt][1].type="lineEndingBlank",At=!0),Gt[1].type="lineEnding",Kt=dr}else if(!(Gt[1].type==="linePrefix"||Gt[1].type==="blockQuotePrefix"||Gt[1].type==="blockQuotePrefixWhitespace"||Gt[1].type==="blockQuoteMarker"||Gt[1].type==="listItemIndent"))break}li&&(!Kt||li<Kt)&&(Fn._spread=!0),Fn.end=Object.assign({},Kt?I[Kt][1].start:lt[1].end),I.splice(Kt||J,0,["exit",Fn,lt[2]]),J++,K++}if(lt[1].type==="listItemPrefix"){const dr={type:"listItem",_spread:!1,start:Object.assign({},lt[1].start),end:void 0};Fn=dr,I.splice(J,0,["enter",dr,lt[2]]),J++,K++,li=void 0,ai=!0}}}return I[_][1]._spread=At,K}function o(I,_){return K;function K(J){l.call(this,I(J),J),_&&_.call(this,J)}}function s(){this.stack.push({type:"fragment",children:[]})}function l(I,_,K){this.stack[this.stack.length-1].children.push(I),this.stack.push(I),this.tokenStack.push([_,K||void 0]),I.position={start:cn(_.start),end:void 0}}function a(I){return _;function _(K){I&&I.call(this,K),u.call(this,K)}}function u(I,_){const K=this.stack.pop(),J=this.tokenStack.pop();if(J)J[0].type!==I.type&&(_?_.call(this,I,J[0]):(J[1]||um).call(this,I,J[0]));else throw new Error("Cannot close `"+I.type+"` ("+Bi({start:I.start,end:I.end})+"): it’s not open");K.position.end=cn(I.end)}function c(){return Vf(this.stack.pop())}function f(){this.data.expectingFirstListItemValue=!0}function d(I){if(this.data.expectingFirstListItemValue){const _=this.stack[this.stack.length-2];_.start=Number.parseInt(this.sliceSerialize(I),10),this.data.expectingFirstListItemValue=void 0}}function h(){const I=this.resume(),_=this.stack[this.stack.length-1];_.lang=I}function m(){const I=this.resume(),_=this.stack[this.stack.length-1];_.meta=I}function x(){this.data.flowCodeInside||(this.buffer(),this.data.flowCodeInside=!0)}function E(){const I=this.resume(),_=this.stack[this.stack.length-1];_.value=I.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g,""),this.data.flowCodeInside=void 0}function p(){const I=this.resume(),_=this.stack[this.stack.length-1];_.value=I.replace(/(\r?\n|\r)$/g,"")}function g(I){const _=this.resume(),K=this.stack[this.stack.length-1];K.label=_,K.identifier=_t(this.sliceSerialize(I)).toLowerCase()}function y(){const I=this.resume(),_=this.stack[this.stack.length-1];_.title=I}function T(){const I=this.resume(),_=this.stack[this.stack.length-1];_.url=I}function b(I){const _=this.stack[this.stack.length-1];if(!_.depth){const K=this.sliceSerialize(I).length;_.depth=K}}function k(){this.data.setextHeadingSlurpLineEnding=!0}function A(I){const _=this.stack[this.stack.length-1];_.depth=this.sliceSerialize(I).codePointAt(0)===61?1:2}function P(){this.data.setextHeadingSlurpLineEnding=void 0}function O(I){const K=this.stack[this.stack.length-1].children;let J=K[K.length-1];(!J||J.type!=="text")&&(J=Yv(),J.position={start:cn(I.start),end:void 0},K.push(J)),this.stack.push(J)}function C(I){const _=this.stack.pop();_.value+=this.sliceSerialize(I),_.position.end=cn(I.end)}function L(I){const _=this.stack[this.stack.length-1];if(this.data.atHardBreak){const K=_.children[_.children.length-1];K.position.end=cn(I.end),this.data.atHardBreak=void 0;return}!this.data.setextHeadingSlurpLineEnding&&t.canContainEols.includes(_.type)&&(O.call(this,I),C.call(this,I))}function F(){this.data.atHardBreak=!0}function W(){const I=this.resume(),_=this.stack[this.stack.length-1];_.value=I}function ee(){const I=this.resume(),_=this.stack[this.stack.length-1];_.value=I}function B(){const I=this.resume(),_=this.stack[this.stack.length-1];_.value=I}function ce(){const I=this.stack[this.stack.length-1];if(this.data.inReference){const _=this.data.referenceType||"shortcut";I.type+="Reference",I.referenceType=_,delete I.url,delete I.title}else delete I.identifier,delete I.label;this.data.referenceType=void 0}function G(){const I=this.stack[this.stack.length-1];if(this.data.inReference){const _=this.data.referenceType||"shortcut";I.type+="Reference",I.referenceType=_,delete I.url,delete I.title}else delete I.identifier,delete I.label;this.data.referenceType=void 0}function M(I){const _=this.sliceSerialize(I),K=this.stack[this.stack.length-2];K.label=sI(_),K.identifier=_t(_).toLowerCase()}function V(){const I=this.stack[this.stack.length-1],_=this.resume(),K=this.stack[this.stack.length-1];if(this.data.inReference=!0,K.type==="link"){const J=I.children;K.children=J}else K.alt=_}function v(){const I=this.resume(),_=this.stack[this.stack.length-1];_.url=I}function q(){const I=this.resume(),_=this.stack[this.stack.length-1];_.title=I}function re(){this.data.inReference=void 0}function S(){this.data.referenceType="collapsed"}function z(I){const _=this.resume(),K=this.stack[this.stack.length-1];K.label=_,K.identifier=_t(this.sliceSerialize(I)).toLowerCase(),this.data.referenceType="full"}function X(I){this.data.characterReferenceType=I.type}function H(I){const _=this.sliceSerialize(I),K=this.data.characterReferenceType;let J;K?(J=Zx(_,K==="characterReferenceMarkerNumeric"?10:16),this.data.characterReferenceType=void 0):J=Bf(_);const se=this.stack[this.stack.length-1];se.value+=J}function ie(I){const _=this.stack.pop();_.position.end=cn(I.end)}function me(I){C.call(this,I);const _=this.stack[this.stack.length-1];_.url=this.sliceSerialize(I)}function Ie(I){C.call(this,I);const _=this.stack[this.stack.length-1];_.url="mailto:"+this.sliceSerialize(I)}function Oe(){return{type:"blockquote",children:[]}}function $e(){return{type:"code",lang:null,meta:null,value:""}}function fr(){return{type:"inlineCode",value:""}}function Uv(){return{type:"definition",identifier:"",label:null,title:null,url:""}}function Hv(){return{type:"emphasis",children:[]}}function Zf(){return{type:"heading",depth:0,children:[]}}function Jf(){return{type:"break"}}function ed(){return{type:"html",value:""}}function $v(){return{type:"image",title:null,url:"",alt:null}}function td(){return{type:"link",title:null,url:"",children:[]}}function nd(I){return{type:"list",ordered:I.type==="listOrdered",start:null,spread:I._spread,children:[]}}function Wv(I){return{type:"listItem",spread:I._spread,checked:null,children:[]}}function Kv(){return{type:"paragraph",children:[]}}function Gv(){return{type:"strong",children:[]}}function Yv(){return{type:"text",value:""}}function qv(){return{type:"thematicBreak"}}}function cn(e){return{line:e.line,column:e.column,offset:e.offset}}function uv(e,t){let n=-1;for(;++n<t.length;){const r=t[n];Array.isArray(r)?uv(e,r):cI(e,r)}}function cI(e,t){let n;for(n in t)if(av.call(t,n))switch(n){case"canContainEols":{const r=t[n];r&&e[n].push(...r);break}case"transforms":{const r=t[n];r&&e[n].push(...r);break}case"enter":case"exit":{const r=t[n];r&&Object.assign(e[n],r);break}}}function um(e,t){throw e?new Error("Cannot close `"+e.type+"` ("+Bi({start:e.start,end:e.end})+"): a different token (`"+t.type+"`, "+Bi({start:t.start,end:t.end})+") is open"):new Error("Cannot close document, a token (`"+t.type+"`, "+Bi({start:t.start,end:t.end})+") is still open")}function fI(e){const t=this;t.parser=n;function n(r){return aI(r,{...t.data("settings"),...e,extensions:t.data("micromarkExtensions")||[],mdastExtensions:t.data("fromMarkdownExtensions")||[]})}}function dI(e,t){const n={type:"element",tagName:"blockquote",properties:{},children:e.wrap(e.all(t),!0)};return e.patch(t,n),e.applyData(t,n)}function hI(e,t){const n={type:"element",tagName:"br",properties:{},children:[]};return e.patch(t,n),[e.applyData(t,n),{type:"text",value:`
`}]}function pI(e,t){const n=t.value?t.value+`
`:"",r={},i=t.lang?t.lang.split(/\s+/):[];i.length>0&&(r.className=["language-"+i[0]]);let o={type:"element",tagName:"code",properties:r,children:[{type:"text",value:n}]};return t.meta&&(o.data={meta:t.meta}),e.patch(t,o),o=e.applyData(t,o),o={type:"element",tagName:"pre",properties:{},children:[o]},e.patch(t,o),o}function mI(e,t){const n={type:"element",tagName:"del",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function gI(e,t){const n={type:"element",tagName:"em",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function yI(e,t){const n=typeof e.options.clobberPrefix=="string"?e.options.clobberPrefix:"user-content-",r=String(t.identifier).toUpperCase(),i=si(r.toLowerCase()),o=e.footnoteOrder.indexOf(r);let s,l=e.footnoteCounts.get(r);l===void 0?(l=0,e.footnoteOrder.push(r),s=e.footnoteOrder.length):s=o+1,l+=1,e.footnoteCounts.set(r,l);const a={type:"element",tagName:"a",properties:{href:"#"+n+"fn-"+i,id:n+"fnref-"+i+(l>1?"-"+l:""),dataFootnoteRef:!0,ariaDescribedBy:["footnote-label"]},children:[{type:"text",value:String(s)}]};e.patch(t,a);const u={type:"element",tagName:"sup",properties:{},children:[a]};return e.patch(t,u),e.applyData(t,u)}function xI(e,t){const n={type:"element",tagName:"h"+t.depth,properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function vI(e,t){if(e.options.allowDangerousHtml){const n={type:"raw",value:t.value};return e.patch(t,n),e.applyData(t,n)}}function cv(e,t){const n=t.referenceType;let r="]";if(n==="collapsed"?r+="[]":n==="full"&&(r+="["+(t.label||t.identifier)+"]"),t.type==="imageReference")return[{type:"text",value:"!["+t.alt+r}];const i=e.all(t),o=i[0];o&&o.type==="text"?o.value="["+o.value:i.unshift({type:"text",value:"["});const s=i[i.length-1];return s&&s.type==="text"?s.value+=r:i.push({type:"text",value:r}),i}function wI(e,t){const n=String(t.identifier).toUpperCase(),r=e.definitionById.get(n);if(!r)return cv(e,t);const i={src:si(r.url||""),alt:t.alt};r.title!==null&&r.title!==void 0&&(i.title=r.title);const o={type:"element",tagName:"img",properties:i,children:[]};return e.patch(t,o),e.applyData(t,o)}function kI(e,t){const n={src:si(t.url)};t.alt!==null&&t.alt!==void 0&&(n.alt=t.alt),t.title!==null&&t.title!==void 0&&(n.title=t.title);const r={type:"element",tagName:"img",properties:n,children:[]};return e.patch(t,r),e.applyData(t,r)}function SI(e,t){const n={type:"text",value:t.value.replace(/\r?\n|\r/g," ")};e.patch(t,n);const r={type:"element",tagName:"code",properties:{},children:[n]};return e.patch(t,r),e.applyData(t,r)}function CI(e,t){const n=String(t.identifier).toUpperCase(),r=e.definitionById.get(n);if(!r)return cv(e,t);const i={href:si(r.url||"")};r.title!==null&&r.title!==void 0&&(i.title=r.title);const o={type:"element",tagName:"a",properties:i,children:e.all(t)};return e.patch(t,o),e.applyData(t,o)}function EI(e,t){const n={href:si(t.url)};t.title!==null&&t.title!==void 0&&(n.title=t.title);const r={type:"element",tagName:"a",properties:n,children:e.all(t)};return e.patch(t,r),e.applyData(t,r)}function TI(e,t,n){const r=e.all(t),i=n?bI(n):fv(t),o={},s=[];if(typeof t.checked=="boolean"){const c=r[0];let f;c&&c.type==="element"&&c.tagName==="p"?f=c:(f={type:"element",tagName:"p",properties:{},children:[]},r.unshift(f)),f.children.length>0&&f.children.unshift({type:"text",value:" "}),f.children.unshift({type:"element",tagName:"input",properties:{type:"checkbox",checked:t.checked,disabled:!0},children:[]}),o.className=["task-list-item"]}let l=-1;for(;++l<r.length;){const c=r[l];(i||l!==0||c.type!=="element"||c.tagName!=="p")&&s.push({type:"text",value:`
`}),c.type==="element"&&c.tagName==="p"&&!i?s.push(...c.children):s.push(c)}const a=r[r.length-1];a&&(i||a.type!=="element"||a.tagName!=="p")&&s.push({type:"text",value:`
`});const u={type:"element",tagName:"li",properties:o,children:s};return e.patch(t,u),e.applyData(t,u)}function bI(e){let t=!1;if(e.type==="list"){t=e.spread||!1;const n=e.children;let r=-1;for(;!t&&++r<n.length;)t=fv(n[r])}return t}function fv(e){const t=e.spread;return t??e.children.length>1}function AI(e,t){const n={},r=e.all(t);let i=-1;for(typeof t.start=="number"&&t.start!==1&&(n.start=t.start);++i<r.length;){const s=r[i];if(s.type==="element"&&s.tagName==="li"&&s.properties&&Array.isArray(s.properties.className)&&s.properties.className.includes("task-list-item")){n.className=["contains-task-list"];break}}const o={type:"element",tagName:t.ordered?"ol":"ul",properties:n,children:e.wrap(r,!0)};return e.patch(t,o),e.applyData(t,o)}function PI(e,t){const n={type:"element",tagName:"p",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function II(e,t){const n={type:"root",children:e.wrap(e.all(t))};return e.patch(t,n),e.applyData(t,n)}function NI(e,t){const n={type:"element",tagName:"strong",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function RI(e,t){const n=e.all(t),r=n.shift(),i=[];if(r){const s={type:"element",tagName:"thead",properties:{},children:e.wrap([r],!0)};e.patch(t.children[0],s),i.push(s)}if(n.length>0){const s={type:"element",tagName:"tbody",properties:{},children:e.wrap(n,!0)},l=Of(t.children[1]),a=$x(t.children[t.children.length-1]);l&&a&&(s.position={start:l,end:a}),i.push(s)}const o={type:"element",tagName:"table",properties:{},children:e.wrap(i,!0)};return e.patch(t,o),e.applyData(t,o)}function MI(e,t,n){const r=n?n.children:void 0,o=(r?r.indexOf(t):1)===0?"th":"td",s=n&&n.type==="table"?n.align:void 0,l=s?s.length:t.children.length;let a=-1;const u=[];for(;++a<l;){const f=t.children[a],d={},h=s?s[a]:void 0;h&&(d.align=h);let m={type:"element",tagName:o,properties:d,children:[]};f&&(m.children=e.all(f),e.patch(f,m),m=e.applyData(f,m)),u.push(m)}const c={type:"element",tagName:"tr",properties:{},children:e.wrap(u,!0)};return e.patch(t,c),e.applyData(t,c)}function DI(e,t){const n={type:"element",tagName:"td",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}const cm=9,fm=32;function LI(e){const t=String(e),n=/\r?\n|\r/g;let r=n.exec(t),i=0;const o=[];for(;r;)o.push(dm(t.slice(i,r.index),i>0,!0),r[0]),i=r.index+r[0].length,r=n.exec(t);return o.push(dm(t.slice(i),i>0,!1)),o.join("")}function dm(e,t,n){let r=0,i=e.length;if(t){let o=e.codePointAt(r);for(;o===cm||o===fm;)r++,o=e.codePointAt(r)}if(n){let o=e.codePointAt(i-1);for(;o===cm||o===fm;)i--,o=e.codePointAt(i-1)}return i>r?e.slice(r,i):""}function _I(e,t){const n={type:"text",value:LI(String(t.value))};return e.patch(t,n),e.applyData(t,n)}function OI(e,t){const n={type:"element",tagName:"hr",properties:{},children:[]};return e.patch(t,n),e.applyData(t,n)}const FI={blockquote:dI,break:hI,code:pI,delete:mI,emphasis:gI,footnoteReference:yI,heading:xI,html:vI,imageReference:wI,image:kI,inlineCode:SI,linkReference:CI,link:EI,listItem:TI,list:AI,paragraph:PI,root:II,strong:NI,table:RI,tableCell:DI,tableRow:MI,text:_I,thematicBreak:OI,toml:Zo,yaml:Zo,definition:Zo,footnoteDefinition:Zo};function Zo(){}const dv=-1,El=0,Hi=1,Zs=2,Hf=3,$f=4,Wf=5,Kf=6,hv=7,pv=8,hm=typeof self=="object"?self:globalThis,jI=(e,t)=>{const n=(i,o)=>(e.set(o,i),i),r=i=>{if(e.has(i))return e.get(i);const[o,s]=t[i];switch(o){case El:case dv:return n(s,i);case Hi:{const l=n([],i);for(const a of s)l.push(r(a));return l}case Zs:{const l=n({},i);for(const[a,u]of s)l[r(a)]=r(u);return l}case Hf:return n(new Date(s),i);case $f:{const{source:l,flags:a}=s;return n(new RegExp(l,a),i)}case Wf:{const l=n(new Map,i);for(const[a,u]of s)l.set(r(a),r(u));return l}case Kf:{const l=n(new Set,i);for(const a of s)l.add(r(a));return l}case hv:{const{name:l,message:a}=s;return n(new hm[l](a),i)}case pv:return n(BigInt(s),i);case"BigInt":return n(Object(BigInt(s)),i);case"ArrayBuffer":return n(new Uint8Array(s).buffer,s);case"DataView":{const{buffer:l}=new Uint8Array(s);return n(new DataView(l),s)}}return n(new hm[o](s),i)};return r},pm=e=>jI(new Map,e)(0),mr="",{toString:zI}={},{keys:VI}=Object,vi=e=>{const t=typeof e;if(t!=="object"||!e)return[El,t];const n=zI.call(e).slice(8,-1);switch(n){case"Array":return[Hi,mr];case"Object":return[Zs,mr];case"Date":return[Hf,mr];case"RegExp":return[$f,mr];case"Map":return[Wf,mr];case"Set":return[Kf,mr];case"DataView":return[Hi,n]}return n.includes("Array")?[Hi,n]:n.includes("Error")?[hv,n]:[Zs,n]},Jo=([e,t])=>e===El&&(t==="function"||t==="symbol"),BI=(e,t,n,r)=>{const i=(s,l)=>{const a=r.push(s)-1;return n.set(l,a),a},o=s=>{if(n.has(s))return n.get(s);let[l,a]=vi(s);switch(l){case El:{let c=s;switch(a){case"bigint":l=pv,c=s.toString();break;case"function":case"symbol":if(e)throw new TypeError("unable to serialize "+a);c=null;break;case"undefined":return i([dv],s)}return i([l,c],s)}case Hi:{if(a){let d=s;return a==="DataView"?d=new Uint8Array(s.buffer):a==="ArrayBuffer"&&(d=new Uint8Array(s)),i([a,[...d]],s)}const c=[],f=i([l,c],s);for(const d of s)c.push(o(d));return f}case Zs:{if(a)switch(a){case"BigInt":return i([a,s.toString()],s);case"Boolean":case"Number":case"String":return i([a,s.valueOf()],s)}if(t&&"toJSON"in s)return o(s.toJSON());const c=[],f=i([l,c],s);for(const d of VI(s))(e||!Jo(vi(s[d])))&&c.push([o(d),o(s[d])]);return f}case Hf:return i([l,s.toISOString()],s);case $f:{const{source:c,flags:f}=s;return i([l,{source:c,flags:f}],s)}case Wf:{const c=[],f=i([l,c],s);for(const[d,h]of s)(e||!(Jo(vi(d))||Jo(vi(h))))&&c.push([o(d),o(h)]);return f}case Kf:{const c=[],f=i([l,c],s);for(const d of s)(e||!Jo(vi(d)))&&c.push(o(d));return f}}const{message:u}=s;return i([l,{name:a,message:u}],s)};return o},mm=(e,{json:t,lossy:n}={})=>{const r=[];return BI(!(t||n),!!t,new Map,r)(e),r},Js=typeof structuredClone=="function"?(e,t)=>t&&("json"in t||"lossy"in t)?pm(mm(e,t)):structuredClone(e):(e,t)=>pm(mm(e,t));function UI(e,t){const n=[{type:"text",value:"↩"}];return t>1&&n.push({type:"element",tagName:"sup",properties:{},children:[{type:"text",value:String(t)}]}),n}function HI(e,t){return"Back to reference "+(e+1)+(t>1?"-"+t:"")}function $I(e){const t=typeof e.options.clobberPrefix=="string"?e.options.clobberPrefix:"user-content-",n=e.options.footnoteBackContent||UI,r=e.options.footnoteBackLabel||HI,i=e.options.footnoteLabel||"Footnotes",o=e.options.footnoteLabelTagName||"h2",s=e.options.footnoteLabelProperties||{className:["sr-only"]},l=[];let a=-1;for(;++a<e.footnoteOrder.length;){const u=e.footnoteById.get(e.footnoteOrder[a]);if(!u)continue;const c=e.all(u),f=String(u.identifier).toUpperCase(),d=si(f.toLowerCase());let h=0;const m=[],x=e.footnoteCounts.get(f);for(;x!==void 0&&++h<=x;){m.length>0&&m.push({type:"text",value:" "});let g=typeof n=="string"?n:n(a,h);typeof g=="string"&&(g={type:"text",value:g}),m.push({type:"element",tagName:"a",properties:{href:"#"+t+"fnref-"+d+(h>1?"-"+h:""),dataFootnoteBackref:"",ariaLabel:typeof r=="string"?r:r(a,h),className:["data-footnote-backref"]},children:Array.isArray(g)?g:[g]})}const E=c[c.length-1];if(E&&E.type==="element"&&E.tagName==="p"){const g=E.children[E.children.length-1];g&&g.type==="text"?g.value+=" ":E.children.push({type:"text",value:" "}),E.children.push(...m)}else c.push(...m);const p={type:"element",tagName:"li",properties:{id:t+"fn-"+d},children:e.wrap(c,!0)};e.patch(u,p),l.push(p)}if(l.length!==0)return{type:"element",tagName:"section",properties:{dataFootnotes:!0,className:["footnotes"]},children:[{type:"element",tagName:o,properties:{...Js(s),id:"footnote-label"},children:[{type:"text",value:i}]},{type:"text",value:`
`},{type:"element",tagName:"ol",properties:{},children:e.wrap(l,!0)},{type:"text",value:`
`}]}}const Tl=function(e){if(e==null)return YI;if(typeof e=="function")return bl(e);if(typeof e=="object")return Array.isArray(e)?WI(e):KI(e);if(typeof e=="string")return GI(e);throw new Error("Expected function, string, or object as test")};function WI(e){const t=[];let n=-1;for(;++n<e.length;)t[n]=Tl(e[n]);return bl(r);function r(...i){let o=-1;for(;++o<t.length;)if(t[o].apply(this,i))return!0;return!1}}function KI(e){const t=e;return bl(n);function n(r){const i=r;let o;for(o in e)if(i[o]!==t[o])return!1;return!0}}function GI(e){return bl(t);function t(n){return n&&n.type===e}}function bl(e){return t;function t(n,r,i){return!!(qI(n)&&e.call(this,n,typeof r=="number"?r:void 0,i||void 0))}}function YI(){return!0}function qI(e){return e!==null&&typeof e=="object"&&"type"in e}const mv=[],XI=!0,Xu=!1,QI="skip";function gv(e,t,n,r){let i;typeof t=="function"&&typeof n!="function"?(r=n,n=t):i=t;const o=Tl(i),s=r?-1:1;l(e,void 0,[])();function l(a,u,c){const f=a&&typeof a=="object"?a:{};if(typeof f.type=="string"){const h=typeof f.tagName=="string"?f.tagName:typeof f.name=="string"?f.name:void 0;Object.defineProperty(d,"name",{value:"node ("+(a.type+(h?"<"+h+">":""))+")"})}return d;function d(){let h=mv,m,x,E;if((!t||o(a,u,c[c.length-1]||void 0))&&(h=ZI(n(a,c)),h[0]===Xu))return h;if("children"in a&&a.children){const p=a;if(p.children&&h[0]!==QI)for(x=(r?p.children.length:-1)+s,E=c.concat(p);x>-1&&x<p.children.length;){const g=p.children[x];if(m=l(g,x,E)(),m[0]===Xu)return m;x=typeof m[1]=="number"?m[1]:x+s}}return h}}}function ZI(e){return Array.isArray(e)?e:typeof e=="number"?[XI,e]:e==null?mv:[e]}function Gf(e,t,n,r){let i,o,s;typeof t=="function"&&typeof n!="function"?(o=void 0,s=t,i=n):(o=t,s=n,i=r),gv(e,o,l,i);function l(a,u){const c=u[u.length-1],f=c?c.children.indexOf(a):void 0;return s(a,f,c)}}const Qu={}.hasOwnProperty,JI={};function eN(e,t){const n=t||JI,r=new Map,i=new Map,o=new Map,s={...FI,...n.handlers},l={all:u,applyData:nN,definitionById:r,footnoteById:i,footnoteCounts:o,footnoteOrder:[],handlers:s,one:a,options:n,patch:tN,wrap:iN};return Gf(e,function(c){if(c.type==="definition"||c.type==="footnoteDefinition"){const f=c.type==="definition"?r:i,d=String(c.identifier).toUpperCase();f.has(d)||f.set(d,c)}}),l;function a(c,f){const d=c.type,h=l.handlers[d];if(Qu.call(l.handlers,d)&&h)return h(l,c,f);if(l.options.passThrough&&l.options.passThrough.includes(d)){if("children"in c){const{children:x,...E}=c,p=Js(E);return p.children=l.all(c),p}return Js(c)}return(l.options.unknownHandler||rN)(l,c,f)}function u(c){const f=[];if("children"in c){const d=c.children;let h=-1;for(;++h<d.length;){const m=l.one(d[h],c);if(m){if(h&&d[h-1].type==="break"&&(!Array.isArray(m)&&m.type==="text"&&(m.value=gm(m.value)),!Array.isArray(m)&&m.type==="element")){const x=m.children[0];x&&x.type==="text"&&(x.value=gm(x.value))}Array.isArray(m)?f.push(...m):f.push(m)}}}return f}}function tN(e,t){e.position&&(t.position=Hb(e))}function nN(e,t){let n=t;if(e&&e.data){const r=e.data.hName,i=e.data.hChildren,o=e.data.hProperties;if(typeof r=="string")if(n.type==="element")n.tagName=r;else{const s="children"in n?n.children:[n];n={type:"element",tagName:r,properties:{},children:s}}n.type==="element"&&o&&Object.assign(n.properties,Js(o)),"children"in n&&n.children&&i!==null&&i!==void 0&&(n.children=i)}return n}function rN(e,t){const n=t.data||{},r="value"in t&&!(Qu.call(n,"hProperties")||Qu.call(n,"hChildren"))?{type:"text",value:t.value}:{type:"element",tagName:"div",properties:{},children:e.all(t)};return e.patch(t,r),e.applyData(t,r)}function iN(e,t){const n=[];let r=-1;for(t&&n.push({type:"text",value:`
`});++r<e.length;)r&&n.push({type:"text",value:`
`}),n.push(e[r]);return t&&e.length>0&&n.push({type:"text",value:`
`}),n}function gm(e){let t=0,n=e.charCodeAt(t);for(;n===9||n===32;)t++,n=e.charCodeAt(t);return e.slice(t)}function ym(e,t){const n=eN(e,t),r=n.one(e,void 0),i=$I(n),o=Array.isArray(r)?{type:"root",children:r}:r||{type:"root",children:[]};return i&&o.children.push({type:"text",value:`
`},i),o}function oN(e,t){return e&&"run"in e?async function(n,r){const i=ym(n,{file:r,...t});await e.run(i,r)}:function(n,r){return ym(n,{file:r,...e||t})}}function xm(e){if(e)throw e}var ws=Object.prototype.hasOwnProperty,yv=Object.prototype.toString,vm=Object.defineProperty,wm=Object.getOwnPropertyDescriptor,km=function(t){return typeof Array.isArray=="function"?Array.isArray(t):yv.call(t)==="[object Array]"},Sm=function(t){if(!t||yv.call(t)!=="[object Object]")return!1;var n=ws.call(t,"constructor"),r=t.constructor&&t.constructor.prototype&&ws.call(t.constructor.prototype,"isPrototypeOf");if(t.constructor&&!n&&!r)return!1;var i;for(i in t);return typeof i>"u"||ws.call(t,i)},Cm=function(t,n){vm&&n.name==="__proto__"?vm(t,n.name,{enumerable:!0,configurable:!0,value:n.newValue,writable:!0}):t[n.name]=n.newValue},Em=function(t,n){if(n==="__proto__")if(ws.call(t,n)){if(wm)return wm(t,n).value}else return;return t[n]},sN=function e(){var t,n,r,i,o,s,l=arguments[0],a=1,u=arguments.length,c=!1;for(typeof l=="boolean"&&(c=l,l=arguments[1]||{},a=2),(l==null||typeof l!="object"&&typeof l!="function")&&(l={});a<u;++a)if(t=arguments[a],t!=null)for(n in t)r=Em(l,n),i=Em(t,n),l!==i&&(c&&i&&(Sm(i)||(o=km(i)))?(o?(o=!1,s=r&&km(r)?r:[]):s=r&&Sm(r)?r:{},Cm(l,{name:n,newValue:e(c,s,i)})):typeof i<"u"&&Cm(l,{name:n,newValue:i}));return l};const xa=tc(sN);function Zu(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function lN(){const e=[],t={run:n,use:r};return t;function n(...i){let o=-1;const s=i.pop();if(typeof s!="function")throw new TypeError("Expected function as last argument, not "+s);l(null,...i);function l(a,...u){const c=e[++o];let f=-1;if(a){s(a);return}for(;++f<i.length;)(u[f]===null||u[f]===void 0)&&(u[f]=i[f]);i=u,c?aN(c,l)(...u):s(null,...u)}}function r(i){if(typeof i!="function")throw new TypeError("Expected `middelware` to be a function, not "+i);return e.push(i),t}}function aN(e,t){let n;return r;function r(...s){const l=e.length>s.length;let a;l&&s.push(i);try{a=e.apply(this,s)}catch(u){const c=u;if(l&&n)throw c;return i(c)}l||(a&&a.then&&typeof a.then=="function"?a.then(o,i):a instanceof Error?i(a):o(a))}function i(s,...l){n||(n=!0,t(s,...l))}function o(s){i(null,s)}}const zt={basename:uN,dirname:cN,extname:fN,join:dN,sep:"/"};function uN(e,t){if(t!==void 0&&typeof t!="string")throw new TypeError('"ext" argument must be a string');No(e);let n=0,r=-1,i=e.length,o;if(t===void 0||t.length===0||t.length>e.length){for(;i--;)if(e.codePointAt(i)===47){if(o){n=i+1;break}}else r<0&&(o=!0,r=i+1);return r<0?"":e.slice(n,r)}if(t===e)return"";let s=-1,l=t.length-1;for(;i--;)if(e.codePointAt(i)===47){if(o){n=i+1;break}}else s<0&&(o=!0,s=i+1),l>-1&&(e.codePointAt(i)===t.codePointAt(l--)?l<0&&(r=i):(l=-1,r=s));return n===r?r=s:r<0&&(r=e.length),e.slice(n,r)}function cN(e){if(No(e),e.length===0)return".";let t=-1,n=e.length,r;for(;--n;)if(e.codePointAt(n)===47){if(r){t=n;break}}else r||(r=!0);return t<0?e.codePointAt(0)===47?"/":".":t===1&&e.codePointAt(0)===47?"//":e.slice(0,t)}function fN(e){No(e);let t=e.length,n=-1,r=0,i=-1,o=0,s;for(;t--;){const l=e.codePointAt(t);if(l===47){if(s){r=t+1;break}continue}n<0&&(s=!0,n=t+1),l===46?i<0?i=t:o!==1&&(o=1):i>-1&&(o=-1)}return i<0||n<0||o===0||o===1&&i===n-1&&i===r+1?"":e.slice(i,n)}function dN(...e){let t=-1,n;for(;++t<e.length;)No(e[t]),e[t]&&(n=n===void 0?e[t]:n+"/"+e[t]);return n===void 0?".":hN(n)}function hN(e){No(e);const t=e.codePointAt(0)===47;let n=pN(e,!t);return n.length===0&&!t&&(n="."),n.length>0&&e.codePointAt(e.length-1)===47&&(n+="/"),t?"/"+n:n}function pN(e,t){let n="",r=0,i=-1,o=0,s=-1,l,a;for(;++s<=e.length;){if(s<e.length)l=e.codePointAt(s);else{if(l===47)break;l=47}if(l===47){if(!(i===s-1||o===1))if(i!==s-1&&o===2){if(n.length<2||r!==2||n.codePointAt(n.length-1)!==46||n.codePointAt(n.length-2)!==46){if(n.length>2){if(a=n.lastIndexOf("/"),a!==n.length-1){a<0?(n="",r=0):(n=n.slice(0,a),r=n.length-1-n.lastIndexOf("/")),i=s,o=0;continue}}else if(n.length>0){n="",r=0,i=s,o=0;continue}}t&&(n=n.length>0?n+"/..":"..",r=2)}else n.length>0?n+="/"+e.slice(i+1,s):n=e.slice(i+1,s),r=s-i-1;i=s,o=0}else l===46&&o>-1?o++:o=-1}return n}function No(e){if(typeof e!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(e))}const mN={cwd:gN};function gN(){return"/"}function Ju(e){return!!(e!==null&&typeof e=="object"&&"href"in e&&e.href&&"protocol"in e&&e.protocol&&e.auth===void 0)}function yN(e){if(typeof e=="string")e=new URL(e);else if(!Ju(e)){const t=new TypeError('The "path" argument must be of type string or an instance of URL. Received `'+e+"`");throw t.code="ERR_INVALID_ARG_TYPE",t}if(e.protocol!=="file:"){const t=new TypeError("The URL must be of scheme file");throw t.code="ERR_INVALID_URL_SCHEME",t}return xN(e)}function xN(e){if(e.hostname!==""){const r=new TypeError('File URL host must be "localhost" or empty on darwin');throw r.code="ERR_INVALID_FILE_URL_HOST",r}const t=e.pathname;let n=-1;for(;++n<t.length;)if(t.codePointAt(n)===37&&t.codePointAt(n+1)===50){const r=t.codePointAt(n+2);if(r===70||r===102){const i=new TypeError("File URL path must not include encoded / characters");throw i.code="ERR_INVALID_FILE_URL_PATH",i}}return decodeURIComponent(t)}const va=["history","path","basename","stem","extname","dirname"];class xv{constructor(t){let n;t?Ju(t)?n={path:t}:typeof t=="string"||vN(t)?n={value:t}:n=t:n={},this.cwd="cwd"in n?"":mN.cwd(),this.data={},this.history=[],this.messages=[],this.value,this.map,this.result,this.stored;let r=-1;for(;++r<va.length;){const o=va[r];o in n&&n[o]!==void 0&&n[o]!==null&&(this[o]=o==="history"?[...n[o]]:n[o])}let i;for(i in n)va.includes(i)||(this[i]=n[i])}get basename(){return typeof this.path=="string"?zt.basename(this.path):void 0}set basename(t){ka(t,"basename"),wa(t,"basename"),this.path=zt.join(this.dirname||"",t)}get dirname(){return typeof this.path=="string"?zt.dirname(this.path):void 0}set dirname(t){Tm(this.basename,"dirname"),this.path=zt.join(t||"",this.basename)}get extname(){return typeof this.path=="string"?zt.extname(this.path):void 0}set extname(t){if(wa(t,"extname"),Tm(this.dirname,"extname"),t){if(t.codePointAt(0)!==46)throw new Error("`extname` must start with `.`");if(t.includes(".",1))throw new Error("`extname` cannot contain multiple dots")}this.path=zt.join(this.dirname,this.stem+(t||""))}get path(){return this.history[this.history.length-1]}set path(t){Ju(t)&&(t=yN(t)),ka(t,"path"),this.path!==t&&this.history.push(t)}get stem(){return typeof this.path=="string"?zt.basename(this.path,this.extname):void 0}set stem(t){ka(t,"stem"),wa(t,"stem"),this.path=zt.join(this.dirname||"",t+(this.extname||""))}fail(t,n,r){const i=this.message(t,n,r);throw i.fatal=!0,i}info(t,n,r){const i=this.message(t,n,r);return i.fatal=void 0,i}message(t,n,r){const i=new He(t,n,r);return this.path&&(i.name=this.path+":"+i.name,i.file=this.path),i.fatal=!1,this.messages.push(i),i}toString(t){return this.value===void 0?"":typeof this.value=="string"?this.value:new TextDecoder(t||void 0).decode(this.value)}}function wa(e,t){if(e&&e.includes(zt.sep))throw new Error("`"+t+"` cannot be a path: did not expect `"+zt.sep+"`")}function ka(e,t){if(!e)throw new Error("`"+t+"` cannot be empty")}function Tm(e,t){if(!e)throw new Error("Setting `"+t+"` requires `path` to be set too")}function vN(e){return!!(e&&typeof e=="object"&&"byteLength"in e&&"byteOffset"in e)}const wN=function(e){const r=this.constructor.prototype,i=r[e],o=function(){return i.apply(o,arguments)};return Object.setPrototypeOf(o,r),o},kN={}.hasOwnProperty;class Yf extends wN{constructor(){super("copy"),this.Compiler=void 0,this.Parser=void 0,this.attachers=[],this.compiler=void 0,this.freezeIndex=-1,this.frozen=void 0,this.namespace={},this.parser=void 0,this.transformers=lN()}copy(){const t=new Yf;let n=-1;for(;++n<this.attachers.length;){const r=this.attachers[n];t.use(...r)}return t.data(xa(!0,{},this.namespace)),t}data(t,n){return typeof t=="string"?arguments.length===2?(Ea("data",this.frozen),this.namespace[t]=n,this):kN.call(this.namespace,t)&&this.namespace[t]||void 0:t?(Ea("data",this.frozen),this.namespace=t,this):this.namespace}freeze(){if(this.frozen)return this;const t=this;for(;++this.freezeIndex<this.attachers.length;){const[n,...r]=this.attachers[this.freezeIndex];if(r[0]===!1)continue;r[0]===!0&&(r[0]=void 0);const i=n.call(t,...r);typeof i=="function"&&this.transformers.use(i)}return this.frozen=!0,this.freezeIndex=Number.POSITIVE_INFINITY,this}parse(t){this.freeze();const n=es(t),r=this.parser||this.Parser;return Sa("parse",r),r(String(n),n)}process(t,n){const r=this;return this.freeze(),Sa("process",this.parser||this.Parser),Ca("process",this.compiler||this.Compiler),n?i(void 0,n):new Promise(i);function i(o,s){const l=es(t),a=r.parse(l);r.run(a,l,function(c,f,d){if(c||!f||!d)return u(c);const h=f,m=r.stringify(h,d);EN(m)?d.value=m:d.result=m,u(c,d)});function u(c,f){c||!f?s(c):o?o(f):n(void 0,f)}}}processSync(t){let n=!1,r;return this.freeze(),Sa("processSync",this.parser||this.Parser),Ca("processSync",this.compiler||this.Compiler),this.process(t,i),Am("processSync","process",n),r;function i(o,s){n=!0,xm(o),r=s}}run(t,n,r){bm(t),this.freeze();const i=this.transformers;return!r&&typeof n=="function"&&(r=n,n=void 0),r?o(void 0,r):new Promise(o);function o(s,l){const a=es(n);i.run(t,a,u);function u(c,f,d){const h=f||t;c?l(c):s?s(h):r(void 0,h,d)}}}runSync(t,n){let r=!1,i;return this.run(t,n,o),Am("runSync","run",r),i;function o(s,l){xm(s),i=l,r=!0}}stringify(t,n){this.freeze();const r=es(n),i=this.compiler||this.Compiler;return Ca("stringify",i),bm(t),i(t,r)}use(t,...n){const r=this.attachers,i=this.namespace;if(Ea("use",this.frozen),t!=null)if(typeof t=="function")a(t,n);else if(typeof t=="object")Array.isArray(t)?l(t):s(t);else throw new TypeError("Expected usable value, not `"+t+"`");return this;function o(u){if(typeof u=="function")a(u,[]);else if(typeof u=="object")if(Array.isArray(u)){const[c,...f]=u;a(c,f)}else s(u);else throw new TypeError("Expected usable value, not `"+u+"`")}function s(u){if(!("plugins"in u)&&!("settings"in u))throw new Error("Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither");l(u.plugins),u.settings&&(i.settings=xa(!0,i.settings,u.settings))}function l(u){let c=-1;if(u!=null)if(Array.isArray(u))for(;++c<u.length;){const f=u[c];o(f)}else throw new TypeError("Expected a list of plugins, not `"+u+"`")}function a(u,c){let f=-1,d=-1;for(;++f<r.length;)if(r[f][0]===u){d=f;break}if(d===-1)r.push([u,...c]);else if(c.length>0){let[h,...m]=c;const x=r[d][1];Zu(x)&&Zu(h)&&(h=xa(!0,x,h)),r[d]=[u,h,...m]}}}}const SN=new Yf().freeze();function Sa(e,t){if(typeof t!="function")throw new TypeError("Cannot `"+e+"` without `parser`")}function Ca(e,t){if(typeof t!="function")throw new TypeError("Cannot `"+e+"` without `compiler`")}function Ea(e,t){if(t)throw new Error("Cannot call `"+e+"` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.")}function bm(e){if(!Zu(e)||typeof e.type!="string")throw new TypeError("Expected node, got `"+e+"`")}function Am(e,t,n){if(!n)throw new Error("`"+e+"` finished async. Use `"+t+"` instead")}function es(e){return CN(e)?e:new xv(e)}function CN(e){return!!(e&&typeof e=="object"&&"message"in e&&"messages"in e)}function EN(e){return typeof e=="string"||TN(e)}function TN(e){return!!(e&&typeof e=="object"&&"byteLength"in e&&"byteOffset"in e)}const bN="https://github.com/remarkjs/react-markdown/blob/main/changelog.md",Pm=[],Im={allowDangerousHtml:!0},AN=/^(https?|ircs?|mailto|xmpp)$/i,PN=[{from:"astPlugins",id:"remove-buggy-html-in-markdown-parser"},{from:"allowDangerousHtml",id:"remove-buggy-html-in-markdown-parser"},{from:"allowNode",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"allowElement"},{from:"allowedTypes",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"allowedElements"},{from:"className",id:"remove-classname"},{from:"disallowedTypes",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"disallowedElements"},{from:"escapeHtml",id:"remove-buggy-html-in-markdown-parser"},{from:"includeElementIndex",id:"#remove-includeelementindex"},{from:"includeNodeIndex",id:"change-includenodeindex-to-includeelementindex"},{from:"linkTarget",id:"remove-linktarget"},{from:"plugins",id:"change-plugins-to-remarkplugins",to:"remarkPlugins"},{from:"rawSourcePos",id:"#remove-rawsourcepos"},{from:"renderers",id:"change-renderers-to-components",to:"components"},{from:"source",id:"change-source-to-children",to:"children"},{from:"sourcePos",id:"#remove-sourcepos"},{from:"transformImageUri",id:"#add-urltransform",to:"urlTransform"},{from:"transformLinkUri",id:"#add-urltransform",to:"urlTransform"}];function IN(e){const t=NN(e),n=RN(e);return MN(t.runSync(t.parse(n),n),e)}function NN(e){const t=e.rehypePlugins||Pm,n=e.remarkPlugins||Pm,r=e.remarkRehypeOptions?{...e.remarkRehypeOptions,...Im}:Im;return SN().use(fI).use(n).use(oN,r).use(t)}function RN(e){const t=e.children||"",n=new xv;return typeof t=="string"&&(n.value=t),n}function MN(e,t){const n=t.allowedElements,r=t.allowElement,i=t.components,o=t.disallowedElements,s=t.skipHtml,l=t.unwrapDisallowed,a=t.urlTransform||DN;for(const c of PN)Object.hasOwn(t,c.from)&&(""+c.from+(c.to?"use `"+c.to+"` instead":"remove it")+bN+c.id,void 0);return Gf(e,u),Yb(e,{Fragment:w.Fragment,components:i,ignoreInvalidStyle:!0,jsx:w.jsx,jsxs:w.jsxs,passKeys:!0,passNode:!0});function u(c,f,d){if(c.type==="raw"&&d&&typeof f=="number")return s?d.children.splice(f,1):d.children[f]={type:"text",value:c.value},f;if(c.type==="element"){let h;for(h in ma)if(Object.hasOwn(ma,h)&&Object.hasOwn(c.properties,h)){const m=c.properties[h],x=ma[h];(x===null||x.includes(c.tagName))&&(c.properties[h]=a(String(m||""),h,c))}}if(c.type==="element"){let h=n?!n.includes(c.tagName):o?o.includes(c.tagName):!1;if(!h&&r&&typeof f=="number"&&(h=!r(c,f,d)),h&&d&&typeof f=="number")return l&&c.children?d.children.splice(f,1,...c.children):d.children.splice(f,1),f}}}function DN(e){const t=e.indexOf(":"),n=e.indexOf("?"),r=e.indexOf("#"),i=e.indexOf("/");return t===-1||i!==-1&&t>i||n!==-1&&t>n||r!==-1&&t>r||AN.test(e.slice(0,t))?e:""}function Nm(e,t){const n=String(e);if(typeof t!="string")throw new TypeError("Expected character");let r=0,i=n.indexOf(t);for(;i!==-1;)r++,i=n.indexOf(t,i+t.length);return r}function LN(e){if(typeof e!="string")throw new TypeError("Expected a string");return e.replace(/[|\\{}()[\]^$+*?.]/g,"\\$&").replace(/-/g,"\\x2d")}function _N(e,t,n){const i=Tl((n||{}).ignore||[]),o=ON(t);let s=-1;for(;++s<o.length;)gv(e,"text",l);function l(u,c){let f=-1,d;for(;++f<c.length;){const h=c[f],m=d?d.children:void 0;if(i(h,m?m.indexOf(h):void 0,d))return;d=h}if(d)return a(u,c)}function a(u,c){const f=c[c.length-1],d=o[s][0],h=o[s][1];let m=0;const E=f.children.indexOf(u);let p=!1,g=[];d.lastIndex=0;let y=d.exec(u.value);for(;y;){const T=y.index,b={index:y.index,input:y.input,stack:[...c,u]};let k=h(...y,b);if(typeof k=="string"&&(k=k.length>0?{type:"text",value:k}:void 0),k===!1?d.lastIndex=T+1:(m!==T&&g.push({type:"text",value:u.value.slice(m,T)}),Array.isArray(k)?g.push(...k):k&&g.push(k),m=T+y[0].length,p=!0),!d.global)break;y=d.exec(u.value)}return p?(m<u.value.length&&g.push({type:"text",value:u.value.slice(m)}),f.children.splice(E,1,...g)):g=[u],E+g.length}}function ON(e){const t=[];if(!Array.isArray(e))throw new TypeError("Expected find and replace tuple or list of tuples");const n=!e[0]||Array.isArray(e[0])?e:[e];let r=-1;for(;++r<n.length;){const i=n[r];t.push([FN(i[0]),jN(i[1])])}return t}function FN(e){return typeof e=="string"?new RegExp(LN(e),"g"):e}function jN(e){return typeof e=="function"?e:function(){return e}}const Ta="phrasing",ba=["autolink","link","image","label"];function zN(){return{transforms:[KN],enter:{literalAutolink:BN,literalAutolinkEmail:Aa,literalAutolinkHttp:Aa,literalAutolinkWww:Aa},exit:{literalAutolink:WN,literalAutolinkEmail:$N,literalAutolinkHttp:UN,literalAutolinkWww:HN}}}function VN(){return{unsafe:[{character:"@",before:"[+\\-.\\w]",after:"[\\-.\\w]",inConstruct:Ta,notInConstruct:ba},{character:".",before:"[Ww]",after:"[\\-.\\w]",inConstruct:Ta,notInConstruct:ba},{character:":",before:"[ps]",after:"\\/",inConstruct:Ta,notInConstruct:ba}]}}function BN(e){this.enter({type:"link",title:null,url:"",children:[]},e)}function Aa(e){this.config.enter.autolinkProtocol.call(this,e)}function UN(e){this.config.exit.autolinkProtocol.call(this,e)}function HN(e){this.config.exit.data.call(this,e);const t=this.stack[this.stack.length-1];t.type,t.url="http://"+this.sliceSerialize(e)}function $N(e){this.config.exit.autolinkEmail.call(this,e)}function WN(e){this.exit(e)}function KN(e){_N(e,[[/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi,GN],[new RegExp("(?<=^|\\s|\\p{P}|\\p{S})([-.\\w+]+)@([-\\w]+(?:\\.[-\\w]+)+)","gu"),YN]],{ignore:["link","linkReference"]})}function GN(e,t,n,r,i){let o="";if(!vv(i)||(/^w/i.test(t)&&(n=t+n,t="",o="http://"),!qN(n)))return!1;const s=XN(n+r);if(!s[0])return!1;const l={type:"link",title:null,url:o+t+s[0],children:[{type:"text",value:t+s[0]}]};return s[1]?[l,{type:"text",value:s[1]}]:l}function YN(e,t,n,r){return!vv(r,!0)||/[-\d_]$/.test(n)?!1:{type:"link",title:null,url:"mailto:"+t+"@"+n,children:[{type:"text",value:t+"@"+n}]}}function qN(e){const t=e.split(".");return!(t.length<2||t[t.length-1]&&(/_/.test(t[t.length-1])||!/[a-zA-Z\d]/.test(t[t.length-1]))||t[t.length-2]&&(/_/.test(t[t.length-2])||!/[a-zA-Z\d]/.test(t[t.length-2])))}function XN(e){const t=/[!"&'),.:;<>?\]}]+$/.exec(e);if(!t)return[e,void 0];e=e.slice(0,t.index);let n=t[0],r=n.indexOf(")");const i=Nm(e,"(");let o=Nm(e,")");for(;r!==-1&&i>o;)e+=n.slice(0,r+1),n=n.slice(r+1),r=n.indexOf(")"),o++;return[e,n]}function vv(e,t){const n=e.input.charCodeAt(e.index-1);return(e.index===0||lr(n)||Sl(n))&&(!t||n!==47)}wv.peek=oR;function QN(){this.buffer()}function ZN(e){this.enter({type:"footnoteReference",identifier:"",label:""},e)}function JN(){this.buffer()}function eR(e){this.enter({type:"footnoteDefinition",identifier:"",label:"",children:[]},e)}function tR(e){const t=this.resume(),n=this.stack[this.stack.length-1];n.type,n.identifier=_t(this.sliceSerialize(e)).toLowerCase(),n.label=t}function nR(e){this.exit(e)}function rR(e){const t=this.resume(),n=this.stack[this.stack.length-1];n.type,n.identifier=_t(this.sliceSerialize(e)).toLowerCase(),n.label=t}function iR(e){this.exit(e)}function oR(){return"["}function wv(e,t,n,r){const i=n.createTracker(r);let o=i.move("[^");const s=n.enter("footnoteReference"),l=n.enter("reference");return o+=i.move(n.safe(n.associationId(e),{after:"]",before:o})),l(),s(),o+=i.move("]"),o}function sR(){return{enter:{gfmFootnoteCallString:QN,gfmFootnoteCall:ZN,gfmFootnoteDefinitionLabelString:JN,gfmFootnoteDefinition:eR},exit:{gfmFootnoteCallString:tR,gfmFootnoteCall:nR,gfmFootnoteDefinitionLabelString:rR,gfmFootnoteDefinition:iR}}}function lR(e){let t=!1;return e&&e.firstLineBlank&&(t=!0),{handlers:{footnoteDefinition:n,footnoteReference:wv},unsafe:[{character:"[",inConstruct:["label","phrasing","reference"]}]};function n(r,i,o,s){const l=o.createTracker(s);let a=l.move("[^");const u=o.enter("footnoteDefinition"),c=o.enter("label");return a+=l.move(o.safe(o.associationId(r),{before:a,after:"]"})),c(),a+=l.move("]:"),r.children&&r.children.length>0&&(l.shift(4),a+=l.move((t?`
`:" ")+o.indentLines(o.containerFlow(r,l.current()),t?kv:aR))),u(),a}}function aR(e,t,n){return t===0?e:kv(e,t,n)}function kv(e,t,n){return(n?"":"    ")+e}const uR=["autolink","destinationLiteral","destinationRaw","reference","titleQuote","titleApostrophe"];Sv.peek=pR;function cR(){return{canContainEols:["delete"],enter:{strikethrough:dR},exit:{strikethrough:hR}}}function fR(){return{unsafe:[{character:"~",inConstruct:"phrasing",notInConstruct:uR}],handlers:{delete:Sv}}}function dR(e){this.enter({type:"delete",children:[]},e)}function hR(e){this.exit(e)}function Sv(e,t,n,r){const i=n.createTracker(r),o=n.enter("strikethrough");let s=i.move("~~");return s+=n.containerPhrasing(e,{...i.current(),before:s,after:"~"}),s+=i.move("~~"),o(),s}function pR(){return"~"}function mR(e){return e.length}function gR(e,t){const n=t||{},r=(n.align||[]).concat(),i=n.stringLength||mR,o=[],s=[],l=[],a=[];let u=0,c=-1;for(;++c<e.length;){const x=[],E=[];let p=-1;for(e[c].length>u&&(u=e[c].length);++p<e[c].length;){const g=yR(e[c][p]);if(n.alignDelimiters!==!1){const y=i(g);E[p]=y,(a[p]===void 0||y>a[p])&&(a[p]=y)}x.push(g)}s[c]=x,l[c]=E}let f=-1;if(typeof r=="object"&&"length"in r)for(;++f<u;)o[f]=Rm(r[f]);else{const x=Rm(r);for(;++f<u;)o[f]=x}f=-1;const d=[],h=[];for(;++f<u;){const x=o[f];let E="",p="";x===99?(E=":",p=":"):x===108?E=":":x===114&&(p=":");let g=n.alignDelimiters===!1?1:Math.max(1,a[f]-E.length-p.length);const y=E+"-".repeat(g)+p;n.alignDelimiters!==!1&&(g=E.length+g+p.length,g>a[f]&&(a[f]=g),h[f]=g),d[f]=y}s.splice(1,0,d),l.splice(1,0,h),c=-1;const m=[];for(;++c<s.length;){const x=s[c],E=l[c];f=-1;const p=[];for(;++f<u;){const g=x[f]||"";let y="",T="";if(n.alignDelimiters!==!1){const b=a[f]-(E[f]||0),k=o[f];k===114?y=" ".repeat(b):k===99?b%2?(y=" ".repeat(b/2+.5),T=" ".repeat(b/2-.5)):(y=" ".repeat(b/2),T=y):T=" ".repeat(b)}n.delimiterStart!==!1&&!f&&p.push("|"),n.padding!==!1&&!(n.alignDelimiters===!1&&g==="")&&(n.delimiterStart!==!1||f)&&p.push(" "),n.alignDelimiters!==!1&&p.push(y),p.push(g),n.alignDelimiters!==!1&&p.push(T),n.padding!==!1&&p.push(" "),(n.delimiterEnd!==!1||f!==u-1)&&p.push("|")}m.push(n.delimiterEnd===!1?p.join("").replace(/ +$/,""):p.join(""))}return m.join(`
`)}function yR(e){return e==null?"":String(e)}function Rm(e){const t=typeof e=="string"?e.codePointAt(0):0;return t===67||t===99?99:t===76||t===108?108:t===82||t===114?114:0}function xR(e,t,n,r){const i=n.enter("blockquote"),o=n.createTracker(r);o.move("> "),o.shift(2);const s=n.indentLines(n.containerFlow(e,o.current()),vR);return i(),s}function vR(e,t,n){return">"+(n?"":" ")+e}function wR(e,t){return Mm(e,t.inConstruct,!0)&&!Mm(e,t.notInConstruct,!1)}function Mm(e,t,n){if(typeof t=="string"&&(t=[t]),!t||t.length===0)return n;let r=-1;for(;++r<t.length;)if(e.includes(t[r]))return!0;return!1}function Dm(e,t,n,r){let i=-1;for(;++i<n.unsafe.length;)if(n.unsafe[i].character===`
`&&wR(n.stack,n.unsafe[i]))return/[ \t]/.test(r.before)?"":" ";return`\\
`}function kR(e,t){const n=String(e);let r=n.indexOf(t),i=r,o=0,s=0;if(typeof t!="string")throw new TypeError("Expected substring");for(;r!==-1;)r===i?++o>s&&(s=o):o=1,i=r+t.length,r=n.indexOf(t,i);return s}function SR(e,t){return!!(t.options.fences===!1&&e.value&&!e.lang&&/[^ \r\n]/.test(e.value)&&!/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(e.value))}function CR(e){const t=e.options.fence||"`";if(t!=="`"&&t!=="~")throw new Error("Cannot serialize code with `"+t+"` for `options.fence`, expected `` ` `` or `~`");return t}function ER(e,t,n,r){const i=CR(n),o=e.value||"",s=i==="`"?"GraveAccent":"Tilde";if(SR(e,n)){const f=n.enter("codeIndented"),d=n.indentLines(o,TR);return f(),d}const l=n.createTracker(r),a=i.repeat(Math.max(kR(o,i)+1,3)),u=n.enter("codeFenced");let c=l.move(a);if(e.lang){const f=n.enter(`codeFencedLang${s}`);c+=l.move(n.safe(e.lang,{before:c,after:" ",encode:["`"],...l.current()})),f()}if(e.lang&&e.meta){const f=n.enter(`codeFencedMeta${s}`);c+=l.move(" "),c+=l.move(n.safe(e.meta,{before:c,after:`
`,encode:["`"],...l.current()})),f()}return c+=l.move(`
`),o&&(c+=l.move(o+`
`)),c+=l.move(a),u(),c}function TR(e,t,n){return(n?"":"    ")+e}function qf(e){const t=e.options.quote||'"';if(t!=='"'&&t!=="'")throw new Error("Cannot serialize title with `"+t+"` for `options.quote`, expected `\"`, or `'`");return t}function bR(e,t,n,r){const i=qf(n),o=i==='"'?"Quote":"Apostrophe",s=n.enter("definition");let l=n.enter("label");const a=n.createTracker(r);let u=a.move("[");return u+=a.move(n.safe(n.associationId(e),{before:u,after:"]",...a.current()})),u+=a.move("]: "),l(),!e.url||/[\0- \u007F]/.test(e.url)?(l=n.enter("destinationLiteral"),u+=a.move("<"),u+=a.move(n.safe(e.url,{before:u,after:">",...a.current()})),u+=a.move(">")):(l=n.enter("destinationRaw"),u+=a.move(n.safe(e.url,{before:u,after:e.title?" ":`
`,...a.current()}))),l(),e.title&&(l=n.enter(`title${o}`),u+=a.move(" "+i),u+=a.move(n.safe(e.title,{before:u,after:i,...a.current()})),u+=a.move(i),l()),s(),u}function AR(e){const t=e.options.emphasis||"*";if(t!=="*"&&t!=="_")throw new Error("Cannot serialize emphasis with `"+t+"` for `options.emphasis`, expected `*`, or `_`");return t}function yo(e){return"&#x"+e.toString(16).toUpperCase()+";"}function el(e,t,n){const r=Zr(e),i=Zr(t);return r===void 0?i===void 0?n==="_"?{inside:!0,outside:!0}:{inside:!1,outside:!1}:i===1?{inside:!0,outside:!0}:{inside:!1,outside:!0}:r===1?i===void 0?{inside:!1,outside:!1}:i===1?{inside:!0,outside:!0}:{inside:!1,outside:!1}:i===void 0?{inside:!1,outside:!1}:i===1?{inside:!0,outside:!1}:{inside:!1,outside:!1}}Cv.peek=PR;function Cv(e,t,n,r){const i=AR(n),o=n.enter("emphasis"),s=n.createTracker(r),l=s.move(i);let a=s.move(n.containerPhrasing(e,{after:i,before:l,...s.current()}));const u=a.charCodeAt(0),c=el(r.before.charCodeAt(r.before.length-1),u,i);c.inside&&(a=yo(u)+a.slice(1));const f=a.charCodeAt(a.length-1),d=el(r.after.charCodeAt(0),f,i);d.inside&&(a=a.slice(0,-1)+yo(f));const h=s.move(i);return o(),n.attentionEncodeSurroundingInfo={after:d.outside,before:c.outside},l+a+h}function PR(e,t,n){return n.options.emphasis||"*"}function IR(e,t){let n=!1;return Gf(e,function(r){if("value"in r&&/\r?\n|\r/.test(r.value)||r.type==="break")return n=!0,Xu}),!!((!e.depth||e.depth<3)&&Vf(e)&&(t.options.setext||n))}function NR(e,t,n,r){const i=Math.max(Math.min(6,e.depth||1),1),o=n.createTracker(r);if(IR(e,n)){const c=n.enter("headingSetext"),f=n.enter("phrasing"),d=n.containerPhrasing(e,{...o.current(),before:`
`,after:`
`});return f(),c(),d+`
`+(i===1?"=":"-").repeat(d.length-(Math.max(d.lastIndexOf("\r"),d.lastIndexOf(`
`))+1))}const s="#".repeat(i),l=n.enter("headingAtx"),a=n.enter("phrasing");o.move(s+" ");let u=n.containerPhrasing(e,{before:"# ",after:`
`,...o.current()});return/^[\t ]/.test(u)&&(u=yo(u.charCodeAt(0))+u.slice(1)),u=u?s+" "+u:s,n.options.closeAtx&&(u+=" "+s),a(),l(),u}Ev.peek=RR;function Ev(e){return e.value||""}function RR(){return"<"}Tv.peek=MR;function Tv(e,t,n,r){const i=qf(n),o=i==='"'?"Quote":"Apostrophe",s=n.enter("image");let l=n.enter("label");const a=n.createTracker(r);let u=a.move("![");return u+=a.move(n.safe(e.alt,{before:u,after:"]",...a.current()})),u+=a.move("]("),l(),!e.url&&e.title||/[\0- \u007F]/.test(e.url)?(l=n.enter("destinationLiteral"),u+=a.move("<"),u+=a.move(n.safe(e.url,{before:u,after:">",...a.current()})),u+=a.move(">")):(l=n.enter("destinationRaw"),u+=a.move(n.safe(e.url,{before:u,after:e.title?" ":")",...a.current()}))),l(),e.title&&(l=n.enter(`title${o}`),u+=a.move(" "+i),u+=a.move(n.safe(e.title,{before:u,after:i,...a.current()})),u+=a.move(i),l()),u+=a.move(")"),s(),u}function MR(){return"!"}bv.peek=DR;function bv(e,t,n,r){const i=e.referenceType,o=n.enter("imageReference");let s=n.enter("label");const l=n.createTracker(r);let a=l.move("![");const u=n.safe(e.alt,{before:a,after:"]",...l.current()});a+=l.move(u+"]["),s();const c=n.stack;n.stack=[],s=n.enter("reference");const f=n.safe(n.associationId(e),{before:a,after:"]",...l.current()});return s(),n.stack=c,o(),i==="full"||!u||u!==f?a+=l.move(f+"]"):i==="shortcut"?a=a.slice(0,-1):a+=l.move("]"),a}function DR(){return"!"}Av.peek=LR;function Av(e,t,n){let r=e.value||"",i="`",o=-1;for(;new RegExp("(^|[^`])"+i+"([^`]|$)").test(r);)i+="`";for(/[^ \r\n]/.test(r)&&(/^[ \r\n]/.test(r)&&/[ \r\n]$/.test(r)||/^`|`$/.test(r))&&(r=" "+r+" ");++o<n.unsafe.length;){const s=n.unsafe[o],l=n.compilePattern(s);let a;if(s.atBreak)for(;a=l.exec(r);){let u=a.index;r.charCodeAt(u)===10&&r.charCodeAt(u-1)===13&&u--,r=r.slice(0,u)+" "+r.slice(a.index+1)}}return i+r+i}function LR(){return"`"}function Pv(e,t){const n=Vf(e);return!!(!t.options.resourceLink&&e.url&&!e.title&&e.children&&e.children.length===1&&e.children[0].type==="text"&&(n===e.url||"mailto:"+n===e.url)&&/^[a-z][a-z+.-]+:/i.test(e.url)&&!/[\0- <>\u007F]/.test(e.url))}Iv.peek=_R;function Iv(e,t,n,r){const i=qf(n),o=i==='"'?"Quote":"Apostrophe",s=n.createTracker(r);let l,a;if(Pv(e,n)){const c=n.stack;n.stack=[],l=n.enter("autolink");let f=s.move("<");return f+=s.move(n.containerPhrasing(e,{before:f,after:">",...s.current()})),f+=s.move(">"),l(),n.stack=c,f}l=n.enter("link"),a=n.enter("label");let u=s.move("[");return u+=s.move(n.containerPhrasing(e,{before:u,after:"](",...s.current()})),u+=s.move("]("),a(),!e.url&&e.title||/[\0- \u007F]/.test(e.url)?(a=n.enter("destinationLiteral"),u+=s.move("<"),u+=s.move(n.safe(e.url,{before:u,after:">",...s.current()})),u+=s.move(">")):(a=n.enter("destinationRaw"),u+=s.move(n.safe(e.url,{before:u,after:e.title?" ":")",...s.current()}))),a(),e.title&&(a=n.enter(`title${o}`),u+=s.move(" "+i),u+=s.move(n.safe(e.title,{before:u,after:i,...s.current()})),u+=s.move(i),a()),u+=s.move(")"),l(),u}function _R(e,t,n){return Pv(e,n)?"<":"["}Nv.peek=OR;function Nv(e,t,n,r){const i=e.referenceType,o=n.enter("linkReference");let s=n.enter("label");const l=n.createTracker(r);let a=l.move("[");const u=n.containerPhrasing(e,{before:a,after:"]",...l.current()});a+=l.move(u+"]["),s();const c=n.stack;n.stack=[],s=n.enter("reference");const f=n.safe(n.associationId(e),{before:a,after:"]",...l.current()});return s(),n.stack=c,o(),i==="full"||!u||u!==f?a+=l.move(f+"]"):i==="shortcut"?a=a.slice(0,-1):a+=l.move("]"),a}function OR(){return"["}function Xf(e){const t=e.options.bullet||"*";if(t!=="*"&&t!=="+"&&t!=="-")throw new Error("Cannot serialize items with `"+t+"` for `options.bullet`, expected `*`, `+`, or `-`");return t}function FR(e){const t=Xf(e),n=e.options.bulletOther;if(!n)return t==="*"?"-":"*";if(n!=="*"&&n!=="+"&&n!=="-")throw new Error("Cannot serialize items with `"+n+"` for `options.bulletOther`, expected `*`, `+`, or `-`");if(n===t)throw new Error("Expected `bullet` (`"+t+"`) and `bulletOther` (`"+n+"`) to be different");return n}function jR(e){const t=e.options.bulletOrdered||".";if(t!=="."&&t!==")")throw new Error("Cannot serialize items with `"+t+"` for `options.bulletOrdered`, expected `.` or `)`");return t}function Rv(e){const t=e.options.rule||"*";if(t!=="*"&&t!=="-"&&t!=="_")throw new Error("Cannot serialize rules with `"+t+"` for `options.rule`, expected `*`, `-`, or `_`");return t}function zR(e,t,n,r){const i=n.enter("list"),o=n.bulletCurrent;let s=e.ordered?jR(n):Xf(n);const l=e.ordered?s==="."?")":".":FR(n);let a=t&&n.bulletLastUsed?s===n.bulletLastUsed:!1;if(!e.ordered){const c=e.children?e.children[0]:void 0;if((s==="*"||s==="-")&&c&&(!c.children||!c.children[0])&&n.stack[n.stack.length-1]==="list"&&n.stack[n.stack.length-2]==="listItem"&&n.stack[n.stack.length-3]==="list"&&n.stack[n.stack.length-4]==="listItem"&&n.indexStack[n.indexStack.length-1]===0&&n.indexStack[n.indexStack.length-2]===0&&n.indexStack[n.indexStack.length-3]===0&&(a=!0),Rv(n)===s&&c){let f=-1;for(;++f<e.children.length;){const d=e.children[f];if(d&&d.type==="listItem"&&d.children&&d.children[0]&&d.children[0].type==="thematicBreak"){a=!0;break}}}}a&&(s=l),n.bulletCurrent=s;const u=n.containerFlow(e,r);return n.bulletLastUsed=s,n.bulletCurrent=o,i(),u}function VR(e){const t=e.options.listItemIndent||"one";if(t!=="tab"&&t!=="one"&&t!=="mixed")throw new Error("Cannot serialize items with `"+t+"` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`");return t}function BR(e,t,n,r){const i=VR(n);let o=n.bulletCurrent||Xf(n);t&&t.type==="list"&&t.ordered&&(o=(typeof t.start=="number"&&t.start>-1?t.start:1)+(n.options.incrementListMarker===!1?0:t.children.indexOf(e))+o);let s=o.length+1;(i==="tab"||i==="mixed"&&(t&&t.type==="list"&&t.spread||e.spread))&&(s=Math.ceil(s/4)*4);const l=n.createTracker(r);l.move(o+" ".repeat(s-o.length)),l.shift(s);const a=n.enter("listItem"),u=n.indentLines(n.containerFlow(e,l.current()),c);return a(),u;function c(f,d,h){return d?(h?"":" ".repeat(s))+f:(h?o:o+" ".repeat(s-o.length))+f}}function UR(e,t,n,r){const i=n.enter("paragraph"),o=n.enter("phrasing"),s=n.containerPhrasing(e,r);return o(),i(),s}const HR=Tl(["break","delete","emphasis","footnote","footnoteReference","image","imageReference","inlineCode","inlineMath","link","linkReference","mdxJsxTextElement","mdxTextExpression","strong","text","textDirective"]);function $R(e,t,n,r){return(e.children.some(function(s){return HR(s)})?n.containerPhrasing:n.containerFlow).call(n,e,r)}function WR(e){const t=e.options.strong||"*";if(t!=="*"&&t!=="_")throw new Error("Cannot serialize strong with `"+t+"` for `options.strong`, expected `*`, or `_`");return t}Mv.peek=KR;function Mv(e,t,n,r){const i=WR(n),o=n.enter("strong"),s=n.createTracker(r),l=s.move(i+i);let a=s.move(n.containerPhrasing(e,{after:i,before:l,...s.current()}));const u=a.charCodeAt(0),c=el(r.before.charCodeAt(r.before.length-1),u,i);c.inside&&(a=yo(u)+a.slice(1));const f=a.charCodeAt(a.length-1),d=el(r.after.charCodeAt(0),f,i);d.inside&&(a=a.slice(0,-1)+yo(f));const h=s.move(i+i);return o(),n.attentionEncodeSurroundingInfo={after:d.outside,before:c.outside},l+a+h}function KR(e,t,n){return n.options.strong||"*"}function GR(e,t,n,r){return n.safe(e.value,r)}function YR(e){const t=e.options.ruleRepetition||3;if(t<3)throw new Error("Cannot serialize rules with repetition `"+t+"` for `options.ruleRepetition`, expected `3` or more");return t}function qR(e,t,n){const r=(Rv(n)+(n.options.ruleSpaces?" ":"")).repeat(YR(n));return n.options.ruleSpaces?r.slice(0,-1):r}const Dv={blockquote:xR,break:Dm,code:ER,definition:bR,emphasis:Cv,hardBreak:Dm,heading:NR,html:Ev,image:Tv,imageReference:bv,inlineCode:Av,link:Iv,linkReference:Nv,list:zR,listItem:BR,paragraph:UR,root:$R,strong:Mv,text:GR,thematicBreak:qR};function XR(){return{enter:{table:QR,tableData:Lm,tableHeader:Lm,tableRow:JR},exit:{codeText:eM,table:ZR,tableData:Pa,tableHeader:Pa,tableRow:Pa}}}function QR(e){const t=e._align;this.enter({type:"table",align:t.map(function(n){return n==="none"?null:n}),children:[]},e),this.data.inTable=!0}function ZR(e){this.exit(e),this.data.inTable=void 0}function JR(e){this.enter({type:"tableRow",children:[]},e)}function Pa(e){this.exit(e)}function Lm(e){this.enter({type:"tableCell",children:[]},e)}function eM(e){let t=this.resume();this.data.inTable&&(t=t.replace(/\\([\\|])/g,tM));const n=this.stack[this.stack.length-1];n.type,n.value=t,this.exit(e)}function tM(e,t){return t==="|"?t:e}function nM(e){const t=e||{},n=t.tableCellPadding,r=t.tablePipeAlign,i=t.stringLength,o=n?" ":"|";return{unsafe:[{character:"\r",inConstruct:"tableCell"},{character:`
`,inConstruct:"tableCell"},{atBreak:!0,character:"|",after:"[	 :-]"},{character:"|",inConstruct:"tableCell"},{atBreak:!0,character:":",after:"-"},{atBreak:!0,character:"-",after:"[:|-]"}],handlers:{inlineCode:d,table:s,tableCell:a,tableRow:l}};function s(h,m,x,E){return u(c(h,x,E),h.align)}function l(h,m,x,E){const p=f(h,x,E),g=u([p]);return g.slice(0,g.indexOf(`
`))}function a(h,m,x,E){const p=x.enter("tableCell"),g=x.enter("phrasing"),y=x.containerPhrasing(h,{...E,before:o,after:o});return g(),p(),y}function u(h,m){return gR(h,{align:m,alignDelimiters:r,padding:n,stringLength:i})}function c(h,m,x){const E=h.children;let p=-1;const g=[],y=m.enter("table");for(;++p<E.length;)g[p]=f(E[p],m,x);return y(),g}function f(h,m,x){const E=h.children;let p=-1;const g=[],y=m.enter("tableRow");for(;++p<E.length;)g[p]=a(E[p],h,m,x);return y(),g}function d(h,m,x){let E=Dv.inlineCode(h,m,x);return x.stack.includes("tableCell")&&(E=E.replace(/\|/g,"\\$&")),E}}function rM(){return{exit:{taskListCheckValueChecked:_m,taskListCheckValueUnchecked:_m,paragraph:oM}}}function iM(){return{unsafe:[{atBreak:!0,character:"-",after:"[:|-]"}],handlers:{listItem:sM}}}function _m(e){const t=this.stack[this.stack.length-2];t.type,t.checked=e.type==="taskListCheckValueChecked"}function oM(e){const t=this.stack[this.stack.length-2];if(t&&t.type==="listItem"&&typeof t.checked=="boolean"){const n=this.stack[this.stack.length-1];n.type;const r=n.children[0];if(r&&r.type==="text"){const i=t.children;let o=-1,s;for(;++o<i.length;){const l=i[o];if(l.type==="paragraph"){s=l;break}}s===n&&(r.value=r.value.slice(1),r.value.length===0?n.children.shift():n.position&&r.position&&typeof r.position.start.offset=="number"&&(r.position.start.column++,r.position.start.offset++,n.position.start=Object.assign({},r.position.start)))}}this.exit(e)}function sM(e,t,n,r){const i=e.children[0],o=typeof e.checked=="boolean"&&i&&i.type==="paragraph",s="["+(e.checked?"x":" ")+"] ",l=n.createTracker(r);o&&l.move(s);let a=Dv.listItem(e,t,n,{...r,...l.current()});return o&&(a=a.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/,u)),a;function u(c){return c+s}}function lM(){return[zN(),sR(),cR(),XR(),rM()]}function aM(e){return{extensions:[VN(),lR(e),fR(),nM(e),iM()]}}const uM={tokenize:mM,partial:!0},Lv={tokenize:gM,partial:!0},_v={tokenize:yM,partial:!0},Ov={tokenize:xM,partial:!0},cM={tokenize:vM,partial:!0},Fv={name:"wwwAutolink",tokenize:hM,previous:zv},jv={name:"protocolAutolink",tokenize:pM,previous:Vv},an={name:"emailAutolink",tokenize:dM,previous:Bv},Wt={};function fM(){return{text:Wt}}let zn=48;for(;zn<123;)Wt[zn]=an,zn++,zn===58?zn=65:zn===91&&(zn=97);Wt[43]=an;Wt[45]=an;Wt[46]=an;Wt[95]=an;Wt[72]=[an,jv];Wt[104]=[an,jv];Wt[87]=[an,Fv];Wt[119]=[an,Fv];function dM(e,t,n){const r=this;let i,o;return s;function s(f){return!ec(f)||!Bv.call(r,r.previous)||Qf(r.events)?n(f):(e.enter("literalAutolink"),e.enter("literalAutolinkEmail"),l(f))}function l(f){return ec(f)?(e.consume(f),l):f===64?(e.consume(f),a):n(f)}function a(f){return f===46?e.check(cM,c,u)(f):f===45||f===95||Be(f)?(o=!0,e.consume(f),a):c(f)}function u(f){return e.consume(f),i=!0,a}function c(f){return o&&i&&Ke(r.previous)?(e.exit("literalAutolinkEmail"),e.exit("literalAutolink"),t(f)):n(f)}}function hM(e,t,n){const r=this;return i;function i(s){return s!==87&&s!==119||!zv.call(r,r.previous)||Qf(r.events)?n(s):(e.enter("literalAutolink"),e.enter("literalAutolinkWww"),e.check(uM,e.attempt(Lv,e.attempt(_v,o),n),n)(s))}function o(s){return e.exit("literalAutolinkWww"),e.exit("literalAutolink"),t(s)}}function pM(e,t,n){const r=this;let i="",o=!1;return s;function s(f){return(f===72||f===104)&&Vv.call(r,r.previous)&&!Qf(r.events)?(e.enter("literalAutolink"),e.enter("literalAutolinkHttp"),i+=String.fromCodePoint(f),e.consume(f),l):n(f)}function l(f){if(Ke(f)&&i.length<5)return i+=String.fromCodePoint(f),e.consume(f),l;if(f===58){const d=i.toLowerCase();if(d==="http"||d==="https")return e.consume(f),a}return n(f)}function a(f){return f===47?(e.consume(f),o?u:(o=!0,a)):n(f)}function u(f){return f===null||Qs(f)||le(f)||lr(f)||Sl(f)?n(f):e.attempt(Lv,e.attempt(_v,c),n)(f)}function c(f){return e.exit("literalAutolinkHttp"),e.exit("literalAutolink"),t(f)}}function mM(e,t,n){let r=0;return i;function i(s){return(s===87||s===119)&&r<3?(r++,e.consume(s),i):s===46&&r===3?(e.consume(s),o):n(s)}function o(s){return s===null?n(s):t(s)}}function gM(e,t,n){let r,i,o;return s;function s(u){return u===46||u===95?e.check(Ov,a,l)(u):u===null||le(u)||lr(u)||u!==45&&Sl(u)?a(u):(o=!0,e.consume(u),s)}function l(u){return u===95?r=!0:(i=r,r=void 0),e.consume(u),s}function a(u){return i||r||!o?n(u):t(u)}}function yM(e,t){let n=0,r=0;return i;function i(s){return s===40?(n++,e.consume(s),i):s===41&&r<n?o(s):s===33||s===34||s===38||s===39||s===41||s===42||s===44||s===46||s===58||s===59||s===60||s===63||s===93||s===95||s===126?e.check(Ov,t,o)(s):s===null||le(s)||lr(s)?t(s):(e.consume(s),i)}function o(s){return s===41&&r++,e.consume(s),i}}function xM(e,t,n){return r;function r(l){return l===33||l===34||l===39||l===41||l===42||l===44||l===46||l===58||l===59||l===63||l===95||l===126?(e.consume(l),r):l===38?(e.consume(l),o):l===93?(e.consume(l),i):l===60||l===null||le(l)||lr(l)?t(l):n(l)}function i(l){return l===null||l===40||l===91||le(l)||lr(l)?t(l):r(l)}function o(l){return Ke(l)?s(l):n(l)}function s(l){return l===59?(e.consume(l),r):Ke(l)?(e.consume(l),s):n(l)}}function vM(e,t,n){return r;function r(o){return e.consume(o),i}function i(o){return Be(o)?n(o):t(o)}}function zv(e){return e===null||e===40||e===42||e===95||e===91||e===93||e===126||le(e)}function Vv(e){return!Ke(e)}function Bv(e){return!(e===47||ec(e))}function ec(e){return e===43||e===45||e===46||e===95||Be(e)}function Qf(e){let t=e.length,n=!1;for(;t--;){const r=e[t][1];if((r.type==="labelLink"||r.type==="labelImage")&&!r._balanced){n=!0;break}if(r._gfmAutolinkLiteralWalkedInto){n=!1;break}}return e.length>0&&!n&&(e[e.length-1][1]._gfmAutolinkLiteralWalkedInto=!0),n}const wM={tokenize:PM,partial:!0};function kM(){return{document:{91:{name:"gfmFootnoteDefinition",tokenize:TM,continuation:{tokenize:bM},exit:AM}},text:{91:{name:"gfmFootnoteCall",tokenize:EM},93:{name:"gfmPotentialFootnoteCall",add:"after",tokenize:SM,resolveTo:CM}}}}function SM(e,t,n){const r=this;let i=r.events.length;const o=r.parser.gfmFootnotes||(r.parser.gfmFootnotes=[]);let s;for(;i--;){const a=r.events[i][1];if(a.type==="labelImage"){s=a;break}if(a.type==="gfmFootnoteCall"||a.type==="labelLink"||a.type==="label"||a.type==="image"||a.type==="link")break}return l;function l(a){if(!s||!s._balanced)return n(a);const u=_t(r.sliceSerialize({start:s.end,end:r.now()}));return u.codePointAt(0)!==94||!o.includes(u.slice(1))?n(a):(e.enter("gfmFootnoteCallLabelMarker"),e.consume(a),e.exit("gfmFootnoteCallLabelMarker"),t(a))}}function CM(e,t){let n=e.length;for(;n--;)if(e[n][1].type==="labelImage"&&e[n][0]==="enter"){e[n][1];break}e[n+1][1].type="data",e[n+3][1].type="gfmFootnoteCallLabelMarker";const r={type:"gfmFootnoteCall",start:Object.assign({},e[n+3][1].start),end:Object.assign({},e[e.length-1][1].end)},i={type:"gfmFootnoteCallMarker",start:Object.assign({},e[n+3][1].end),end:Object.assign({},e[n+3][1].end)};i.end.column++,i.end.offset++,i.end._bufferIndex++;const o={type:"gfmFootnoteCallString",start:Object.assign({},i.end),end:Object.assign({},e[e.length-1][1].start)},s={type:"chunkString",contentType:"string",start:Object.assign({},o.start),end:Object.assign({},o.end)},l=[e[n+1],e[n+2],["enter",r,t],e[n+3],e[n+4],["enter",i,t],["exit",i,t],["enter",o,t],["enter",s,t],["exit",s,t],["exit",o,t],e[e.length-2],e[e.length-1],["exit",r,t]];return e.splice(n,e.length-n+1,...l),e}function EM(e,t,n){const r=this,i=r.parser.gfmFootnotes||(r.parser.gfmFootnotes=[]);let o=0,s;return l;function l(f){return e.enter("gfmFootnoteCall"),e.enter("gfmFootnoteCallLabelMarker"),e.consume(f),e.exit("gfmFootnoteCallLabelMarker"),a}function a(f){return f!==94?n(f):(e.enter("gfmFootnoteCallMarker"),e.consume(f),e.exit("gfmFootnoteCallMarker"),e.enter("gfmFootnoteCallString"),e.enter("chunkString").contentType="string",u)}function u(f){if(o>999||f===93&&!s||f===null||f===91||le(f))return n(f);if(f===93){e.exit("chunkString");const d=e.exit("gfmFootnoteCallString");return i.includes(_t(r.sliceSerialize(d)))?(e.enter("gfmFootnoteCallLabelMarker"),e.consume(f),e.exit("gfmFootnoteCallLabelMarker"),e.exit("gfmFootnoteCall"),t):n(f)}return le(f)||(s=!0),o++,e.consume(f),f===92?c:u}function c(f){return f===91||f===92||f===93?(e.consume(f),o++,u):u(f)}}function TM(e,t,n){const r=this,i=r.parser.gfmFootnotes||(r.parser.gfmFootnotes=[]);let o,s=0,l;return a;function a(m){return e.enter("gfmFootnoteDefinition")._container=!0,e.enter("gfmFootnoteDefinitionLabel"),e.enter("gfmFootnoteDefinitionLabelMarker"),e.consume(m),e.exit("gfmFootnoteDefinitionLabelMarker"),u}function u(m){return m===94?(e.enter("gfmFootnoteDefinitionMarker"),e.consume(m),e.exit("gfmFootnoteDefinitionMarker"),e.enter("gfmFootnoteDefinitionLabelString"),e.enter("chunkString").contentType="string",c):n(m)}function c(m){if(s>999||m===93&&!l||m===null||m===91||le(m))return n(m);if(m===93){e.exit("chunkString");const x=e.exit("gfmFootnoteDefinitionLabelString");return o=_t(r.sliceSerialize(x)),e.enter("gfmFootnoteDefinitionLabelMarker"),e.consume(m),e.exit("gfmFootnoteDefinitionLabelMarker"),e.exit("gfmFootnoteDefinitionLabel"),d}return le(m)||(l=!0),s++,e.consume(m),m===92?f:c}function f(m){return m===91||m===92||m===93?(e.consume(m),s++,c):c(m)}function d(m){return m===58?(e.enter("definitionMarker"),e.consume(m),e.exit("definitionMarker"),i.includes(o)||i.push(o),te(e,h,"gfmFootnoteDefinitionWhitespace")):n(m)}function h(m){return t(m)}}function bM(e,t,n){return e.check(Io,t,e.attempt(wM,t,n))}function AM(e){e.exit("gfmFootnoteDefinition")}function PM(e,t,n){const r=this;return te(e,i,"gfmFootnoteDefinitionIndent",5);function i(o){const s=r.events[r.events.length-1];return s&&s[1].type==="gfmFootnoteDefinitionIndent"&&s[2].sliceSerialize(s[1],!0).length===4?t(o):n(o)}}function IM(e){let n=(e||{}).singleTilde;const r={name:"strikethrough",tokenize:o,resolveAll:i};return n==null&&(n=!0),{text:{126:r},insideSpan:{null:[r]},attentionMarkers:{null:[126]}};function i(s,l){let a=-1;for(;++a<s.length;)if(s[a][0]==="enter"&&s[a][1].type==="strikethroughSequenceTemporary"&&s[a][1]._close){let u=a;for(;u--;)if(s[u][0]==="exit"&&s[u][1].type==="strikethroughSequenceTemporary"&&s[u][1]._open&&s[a][1].end.offset-s[a][1].start.offset===s[u][1].end.offset-s[u][1].start.offset){s[a][1].type="strikethroughSequence",s[u][1].type="strikethroughSequence";const c={type:"strikethrough",start:Object.assign({},s[u][1].start),end:Object.assign({},s[a][1].end)},f={type:"strikethroughText",start:Object.assign({},s[u][1].end),end:Object.assign({},s[a][1].start)},d=[["enter",c,l],["enter",s[u][1],l],["exit",s[u][1],l],["enter",f,l]],h=l.parser.constructs.insideSpan.null;h&&dt(d,d.length,0,Cl(h,s.slice(u+1,a),l)),dt(d,d.length,0,[["exit",f,l],["enter",s[a][1],l],["exit",s[a][1],l],["exit",c,l]]),dt(s,u-1,a-u+3,d),a=u+d.length-2;break}}for(a=-1;++a<s.length;)s[a][1].type==="strikethroughSequenceTemporary"&&(s[a][1].type="data");return s}function o(s,l,a){const u=this.previous,c=this.events;let f=0;return d;function d(m){return u===126&&c[c.length-1][1].type!=="characterEscape"?a(m):(s.enter("strikethroughSequenceTemporary"),h(m))}function h(m){const x=Zr(u);if(m===126)return f>1?a(m):(s.consume(m),f++,h);if(f<2&&!n)return a(m);const E=s.exit("strikethroughSequenceTemporary"),p=Zr(m);return E._open=!p||p===2&&!!x,E._close=!x||x===2&&!!p,l(m)}}}class NM{constructor(){this.map=[]}add(t,n,r){RM(this,t,n,r)}consume(t){if(this.map.sort(function(o,s){return o[0]-s[0]}),this.map.length===0)return;let n=this.map.length;const r=[];for(;n>0;)n-=1,r.push(t.slice(this.map[n][0]+this.map[n][1]),this.map[n][2]),t.length=this.map[n][0];r.push(t.slice()),t.length=0;let i=r.pop();for(;i;){for(const o of i)t.push(o);i=r.pop()}this.map.length=0}}function RM(e,t,n,r){let i=0;if(!(n===0&&r.length===0)){for(;i<e.map.length;){if(e.map[i][0]===t){e.map[i][1]+=n,e.map[i][2].push(...r);return}i+=1}e.map.push([t,n,r])}}function MM(e,t){let n=!1;const r=[];for(;t<e.length;){const i=e[t];if(n){if(i[0]==="enter")i[1].type==="tableContent"&&r.push(e[t+1][1].type==="tableDelimiterMarker"?"left":"none");else if(i[1].type==="tableContent"){if(e[t-1][1].type==="tableDelimiterMarker"){const o=r.length-1;r[o]=r[o]==="left"?"center":"right"}}else if(i[1].type==="tableDelimiterRow")break}else i[0]==="enter"&&i[1].type==="tableDelimiterRow"&&(n=!0);t+=1}return r}function DM(){return{flow:{null:{name:"table",tokenize:LM,resolveAll:_M}}}}function LM(e,t,n){const r=this;let i=0,o=0,s;return l;function l(C){let L=r.events.length-1;for(;L>-1;){const ee=r.events[L][1].type;if(ee==="lineEnding"||ee==="linePrefix")L--;else break}const F=L>-1?r.events[L][1].type:null,W=F==="tableHead"||F==="tableRow"?k:a;return W===k&&r.parser.lazy[r.now().line]?n(C):W(C)}function a(C){return e.enter("tableHead"),e.enter("tableRow"),u(C)}function u(C){return C===124||(s=!0,o+=1),c(C)}function c(C){return C===null?n(C):U(C)?o>1?(o=0,r.interrupt=!0,e.exit("tableRow"),e.enter("lineEnding"),e.consume(C),e.exit("lineEnding"),h):n(C):Q(C)?te(e,c,"whitespace")(C):(o+=1,s&&(s=!1,i+=1),C===124?(e.enter("tableCellDivider"),e.consume(C),e.exit("tableCellDivider"),s=!0,c):(e.enter("data"),f(C)))}function f(C){return C===null||C===124||le(C)?(e.exit("data"),c(C)):(e.consume(C),C===92?d:f)}function d(C){return C===92||C===124?(e.consume(C),f):f(C)}function h(C){return r.interrupt=!1,r.parser.lazy[r.now().line]?n(C):(e.enter("tableDelimiterRow"),s=!1,Q(C)?te(e,m,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(C):m(C))}function m(C){return C===45||C===58?E(C):C===124?(s=!0,e.enter("tableCellDivider"),e.consume(C),e.exit("tableCellDivider"),x):b(C)}function x(C){return Q(C)?te(e,E,"whitespace")(C):E(C)}function E(C){return C===58?(o+=1,s=!0,e.enter("tableDelimiterMarker"),e.consume(C),e.exit("tableDelimiterMarker"),p):C===45?(o+=1,p(C)):C===null||U(C)?T(C):b(C)}function p(C){return C===45?(e.enter("tableDelimiterFiller"),g(C)):b(C)}function g(C){return C===45?(e.consume(C),g):C===58?(s=!0,e.exit("tableDelimiterFiller"),e.enter("tableDelimiterMarker"),e.consume(C),e.exit("tableDelimiterMarker"),y):(e.exit("tableDelimiterFiller"),y(C))}function y(C){return Q(C)?te(e,T,"whitespace")(C):T(C)}function T(C){return C===124?m(C):C===null||U(C)?!s||i!==o?b(C):(e.exit("tableDelimiterRow"),e.exit("tableHead"),t(C)):b(C)}function b(C){return n(C)}function k(C){return e.enter("tableRow"),A(C)}function A(C){return C===124?(e.enter("tableCellDivider"),e.consume(C),e.exit("tableCellDivider"),A):C===null||U(C)?(e.exit("tableRow"),t(C)):Q(C)?te(e,A,"whitespace")(C):(e.enter("data"),P(C))}function P(C){return C===null||C===124||le(C)?(e.exit("data"),A(C)):(e.consume(C),C===92?O:P)}function O(C){return C===92||C===124?(e.consume(C),P):P(C)}}function _M(e,t){let n=-1,r=!0,i=0,o=[0,0,0,0],s=[0,0,0,0],l=!1,a=0,u,c,f;const d=new NM;for(;++n<e.length;){const h=e[n],m=h[1];h[0]==="enter"?m.type==="tableHead"?(l=!1,a!==0&&(Om(d,t,a,u,c),c=void 0,a=0),u={type:"table",start:Object.assign({},m.start),end:Object.assign({},m.end)},d.add(n,0,[["enter",u,t]])):m.type==="tableRow"||m.type==="tableDelimiterRow"?(r=!0,f=void 0,o=[0,0,0,0],s=[0,n+1,0,0],l&&(l=!1,c={type:"tableBody",start:Object.assign({},m.start),end:Object.assign({},m.end)},d.add(n,0,[["enter",c,t]])),i=m.type==="tableDelimiterRow"?2:c?3:1):i&&(m.type==="data"||m.type==="tableDelimiterMarker"||m.type==="tableDelimiterFiller")?(r=!1,s[2]===0&&(o[1]!==0&&(s[0]=s[1],f=ts(d,t,o,i,void 0,f),o=[0,0,0,0]),s[2]=n)):m.type==="tableCellDivider"&&(r?r=!1:(o[1]!==0&&(s[0]=s[1],f=ts(d,t,o,i,void 0,f)),o=s,s=[o[1],n,0,0])):m.type==="tableHead"?(l=!0,a=n):m.type==="tableRow"||m.type==="tableDelimiterRow"?(a=n,o[1]!==0?(s[0]=s[1],f=ts(d,t,o,i,n,f)):s[1]!==0&&(f=ts(d,t,s,i,n,f)),i=0):i&&(m.type==="data"||m.type==="tableDelimiterMarker"||m.type==="tableDelimiterFiller")&&(s[3]=n)}for(a!==0&&Om(d,t,a,u,c),d.consume(t.events),n=-1;++n<t.events.length;){const h=t.events[n];h[0]==="enter"&&h[1].type==="table"&&(h[1]._align=MM(t.events,n))}return e}function ts(e,t,n,r,i,o){const s=r===1?"tableHeader":r===2?"tableDelimiter":"tableData",l="tableContent";n[0]!==0&&(o.end=Object.assign({},gr(t.events,n[0])),e.add(n[0],0,[["exit",o,t]]));const a=gr(t.events,n[1]);if(o={type:s,start:Object.assign({},a),end:Object.assign({},a)},e.add(n[1],0,[["enter",o,t]]),n[2]!==0){const u=gr(t.events,n[2]),c=gr(t.events,n[3]),f={type:l,start:Object.assign({},u),end:Object.assign({},c)};if(e.add(n[2],0,[["enter",f,t]]),r!==2){const d=t.events[n[2]],h=t.events[n[3]];if(d[1].end=Object.assign({},h[1].end),d[1].type="chunkText",d[1].contentType="text",n[3]>n[2]+1){const m=n[2]+1,x=n[3]-n[2]-1;e.add(m,x,[])}}e.add(n[3]+1,0,[["exit",f,t]])}return i!==void 0&&(o.end=Object.assign({},gr(t.events,i)),e.add(i,0,[["exit",o,t]]),o=void 0),o}function Om(e,t,n,r,i){const o=[],s=gr(t.events,n);i&&(i.end=Object.assign({},s),o.push(["exit",i,t])),r.end=Object.assign({},s),o.push(["exit",r,t]),e.add(n+1,0,o)}function gr(e,t){const n=e[t],r=n[0]==="enter"?"start":"end";return n[1][r]}const OM={name:"tasklistCheck",tokenize:jM};function FM(){return{text:{91:OM}}}function jM(e,t,n){const r=this;return i;function i(a){return r.previous!==null||!r._gfmTasklistFirstContentOfListItem?n(a):(e.enter("taskListCheck"),e.enter("taskListCheckMarker"),e.consume(a),e.exit("taskListCheckMarker"),o)}function o(a){return le(a)?(e.enter("taskListCheckValueUnchecked"),e.consume(a),e.exit("taskListCheckValueUnchecked"),s):a===88||a===120?(e.enter("taskListCheckValueChecked"),e.consume(a),e.exit("taskListCheckValueChecked"),s):n(a)}function s(a){return a===93?(e.enter("taskListCheckMarker"),e.consume(a),e.exit("taskListCheckMarker"),e.exit("taskListCheck"),l):n(a)}function l(a){return U(a)?t(a):Q(a)?e.check({tokenize:zM},t,n)(a):n(a)}}function zM(e,t,n){return te(e,r,"whitespace");function r(i){return i===null?n(i):t(i)}}function VM(e){return Qx([fM(),kM(),IM(e),DM(),FM()])}const BM={};function UM(e){const t=this,n=e||BM,r=t.data(),i=r.micromarkExtensions||(r.micromarkExtensions=[]),o=r.fromMarkdownExtensions||(r.fromMarkdownExtensions=[]),s=r.toMarkdownExtensions||(r.toMarkdownExtensions=[]);i.push(VM(n)),o.push(lM()),s.push(aM(n))}function Hn(e){let t=e,n=[],r;const i=/\[OPTIONS:\s*(\[.*?\])\]/gs,o=t.match(i);if(o){try{const u=o[0].match(/\[OPTIONS:\s*(\[.*?\])\]/s);u&&u[1]&&(n=JSON.parse(u[1]))}catch(a){console.error("옵션 파싱 오류:",a)}t=t.replace(/\[OPTIONS:\s*\[.*?\]\]/gs,"").trim()}const s=/\[GUI_EVENT:\s*(\{.*?\})\]/gs,l=t.match(s);if(l){try{const u=l[0].match(/\[GUI_EVENT:\s*(\{.*?\})\]/s);u&&u[1]&&(r=JSON.parse(u[1]))}catch(a){console.error("GUI 이벤트 파싱 오류:",a)}t=t.replace(/\[GUI_EVENT:\s*\{.*?\}\]/gs,"").trim()}return t=t.replace(/\[OPTIONS:.*?\]/gs,"").trim(),t=t.replace(/\[GUI_EVENT:.*?\]/gs,"").trim(),t=t.replace(/\[STATUS:.*?\]/gs,"").trim(),t=t.replace(/\[NEWS:.*?\]/gs,"").trim(),t=t.replace(/\[STATUS\]/gs,"").trim(),t=t.replace(/\[NEWS\]/gs,"").trim(),t=t.replace(/\[[A-Z_]+:.*?\]/gs,"").trim(),{text:t,options:n,guiEvent:r}}function Fm(e){const t=[/날짜[:\s]*(\d{4}\/\d{1,2}\/\d{1,2})/i,/날짜[:\s]*(\d{4}년\s*\d{1,2}월\s*\d{1,2}일)/i,/(\d{4}\/\d{1,2}\/\d{1,2})/,/(\d{4}년\s*\d{1,2}월\s*\d{1,2}일)/];for(const n of t){const r=e.match(n);if(r&&r[1]){const i=r[1];if(i.includes("/")){const[o,s,l]=i.split("/");return`${o}년 ${parseInt(s)}월 ${parseInt(l)}일`}return i}}return null}function jm(e){const t=[/(?:자금|보유\s*자금|현재\s*자금|예산)[:\s]*([0-9,.]+)\s*([가-힣a-zA-Z]*)/i,/([0-9,.]+)\s*억\s*(?:원)?/i,/([0-9,]+)\s*원/i,/([0-9,.]+)\s*억/i];for(const n of t){const r=e.match(n);if(r&&r[1]){const i=r[1].replace(/,/g,""),o=parseFloat(i);if(!isNaN(o)&&o>0){const s=r[0];return s.includes("억")?Math.floor(o*1e8):s.includes("만")?Math.floor(o*1e4):Math.floor(o)}}}return null}function zm({message:e,isUser:t,isStreaming:n}){const r=Hn(e);return t?w.jsx("div",{className:"mb-3 flex justify-end",children:w.jsxs("div",{className:"bg-gray-100 border border-gray-200 rounded px-3 py-1.5 text-xs text-gray-600 font-mono",children:[w.jsx("span",{className:"text-gray-400",children:"[지시]"})," ",r.text]})}):w.jsx("div",{className:"mb-4",children:w.jsxs("div",{className:"bg-white border border-gray-200 rounded shadow-sm hover:shadow-md transition-shadow",children:[w.jsxs("div",{className:"bg-gray-50 border-b border-gray-200 px-4 py-2 flex items-center gap-2",children:[w.jsx(cT,{className:"w-4 h-4 text-baseball-green"}),w.jsx("span",{className:"text-xs font-semibold text-gray-600 uppercase tracking-wide",children:"GM OFFICE REPORT"}),w.jsx("span",{className:"text-xs text-gray-400 ml-auto font-mono",children:new Date().toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})})]}),w.jsxs("div",{className:"px-4 py-3 text-sm text-gray-800",children:[w.jsx(IN,{remarkPlugins:[UM],components:{table:({children:i})=>w.jsx("div",{className:"w-full overflow-x-auto my-3 -mx-4 px-4",children:w.jsx("div",{className:"inline-block min-w-full align-middle",children:w.jsx("table",{className:"w-full border-collapse bg-white text-xs",children:i})})}),thead:({children:i})=>w.jsx("thead",{className:"bg-baseball-green text-white sticky top-0 z-10",children:i}),tbody:({children:i})=>w.jsx("tbody",{className:"divide-y divide-gray-200 bg-white",children:i}),tr:({children:i})=>{const o=wi.Children.toArray(i);return w.jsx("tr",{className:"hover:bg-green-50 transition-colors cursor-default",children:wi.Children.map(o,(s,l)=>wi.isValidElement(s)?wi.cloneElement(s,{"data-column-index":l}):s)})},th:({children:i})=>w.jsx("th",{className:"border border-gray-300 px-2 py-1.5 text-left font-semibold text-xs text-white bg-baseball-green whitespace-nowrap cursor-default",children:i}),td:({children:i})=>w.jsx("td",{className:"border border-gray-300 px-2 py-1.5 text-xs font-mono cursor-default whitespace-nowrap",children:i}),p:({children:i})=>w.jsx("p",{className:"mb-2 last:mb-0 whitespace-pre-wrap leading-relaxed text-gray-800",children:i}),pre:({children:i})=>w.jsx("pre",{className:"bg-gray-50 p-2 rounded text-xs font-mono overflow-x-auto my-2 border border-gray-200",children:i}),code:({children:i,className:o})=>!o?w.jsx("code",{className:"bg-gray-100 px-1 py-0.5 rounded text-xs font-mono text-baseball-green",children:i}):w.jsx("code",{className:o,children:i}),ul:({children:i})=>w.jsx("ul",{className:"list-disc list-inside my-2 space-y-1 text-gray-700",children:i}),ol:({children:i})=>w.jsx("ol",{className:"list-decimal list-inside my-2 space-y-1 text-gray-700",children:i}),strong:({children:i})=>w.jsx("strong",{className:"font-bold text-baseball-green",children:i})},children:r.text}),n&&w.jsx("span",{className:"inline-block w-2 h-4 bg-baseball-green animate-pulse ml-1"})]})]})})}function HM(){return w.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",children:w.jsx("div",{className:"bg-white rounded-lg p-8 shadow-2xl max-w-sm w-full mx-4",children:w.jsxs("div",{className:"flex flex-col items-center gap-4",children:[w.jsxs("div",{className:"relative",children:[w.jsx(hT,{className:"w-12 h-12 text-baseball-green animate-spin"}),w.jsx("div",{className:"absolute inset-0 flex items-center justify-center",children:w.jsx("span",{className:"text-2xl",children:"⚾"})})]}),w.jsxs("div",{className:"text-center",children:[w.jsx("p",{className:"text-lg font-semibold text-gray-800 mb-1",children:"GM이 데이터를 분석 중입니다..."}),w.jsx("p",{className:"text-sm text-gray-600",children:"잠시만 기다려주세요"})]})]})})})}const $M={S:"from-yellow-400 to-yellow-600",A:"from-red-500 to-red-700",B:"from-blue-500 to-blue-700",C:"from-green-500 to-green-700",D:"from-gray-400 to-gray-600"},WM={S:"S급",A:"A급",B:"B급",C:"C급",D:"D급"},KM=({player:e,onClick:t})=>{var f,d,h,m,x,E,p,g,y,T,b,k;const n=e.grade||"C",r=((f=e.stats)==null?void 0:f.overall)||0,o=["투수","선발","불펜","마무리","좌투","우투","P","SP","RP","CP"].some(A=>e.position.includes(A)||e.position===A),s=(A,P=50)=>A==null?P:Math.min(100,Math.max(0,A)),l={velocity:s((d=e.stats)==null?void 0:d.velocity,70),movement:s((h=e.stats)==null?void 0:h.movement,65),control:s((m=e.stats)==null?void 0:m.control,60),breaking:s((x=e.stats)==null?void 0:x.breaking,65),stamina:s((E=e.stats)==null?void 0:E.stamina,70)},a={contactL:s((p=e.stats)==null?void 0:p.contactL,65),contactR:s((g=e.stats)==null?void 0:g.contactR,70),power:s((y=e.stats)==null?void 0:y.power,60),eye:s((T=e.stats)==null?void 0:T.eye,65),defense:s((b=e.stats)==null?void 0:b.defense,65),speed:s((k=e.stats)==null?void 0:k.speed,60)},u=o?{velocity:"구속",movement:"구위",control:"제구",breaking:"변화구",stamina:"체력"}:{contactL:"교타(좌)",contactR:"교타(우)",power:"장타",eye:"선구안",defense:"수비",speed:"주루"},c=o?l:a;return w.jsxs(or.div,{whileHover:{scale:1.02,y:-2},whileTap:{scale:.98},onClick:t,className:`relative bg-white rounded-lg shadow-lg overflow-hidden border border-gray-300 cursor-pointer transition-all ${t?"hover:shadow-xl":""}`,children:[w.jsx("div",{className:`absolute top-2 right-2 px-2 py-1 rounded text-white text-xs font-black shadow-md bg-gradient-to-r ${$M[n]} z-10`,children:WM[n]}),w.jsx("div",{className:"bg-gradient-to-r from-baseball-green to-baseball-green-dark p-4 text-white",children:w.jsxs("div",{className:"flex items-center justify-between",children:[w.jsxs("div",{children:[w.jsx("h3",{className:"font-black text-xl mb-1",children:e.name}),w.jsxs("div",{className:"flex items-center gap-3 text-sm",children:[w.jsx("span",{className:"font-semibold",children:e.position}),e.age&&w.jsxs(w.Fragment,{children:[w.jsx("span",{className:"text-white/60",children:"|"}),w.jsxs("span",{className:"text-white/80",children:[e.age,"세"]})]})]})]}),w.jsx("div",{className:"text-5xl opacity-20",children:"⚾"})]})}),w.jsxs("div",{className:"p-4 border-b border-gray-200",children:[w.jsxs("div",{className:"flex items-center justify-between mb-2",children:[w.jsx("span",{className:"text-xs font-semibold text-gray-600 uppercase tracking-wide",children:"종합 능력치"}),w.jsx("span",{className:"text-lg font-black font-mono text-baseball-green",children:r})]}),w.jsx("div",{className:"w-full bg-gray-200 rounded-full h-3",children:w.jsx("div",{className:"bg-gradient-to-r from-baseball-green to-baseball-gold h-3 rounded-full transition-all",style:{width:`${r}%`}})})]}),w.jsxs("div",{className:"p-4 space-y-2.5",children:[w.jsx("div",{className:"text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2",children:o?"투수 스탯":"타자 스탯"}),Object.entries(c).map(([A,P])=>{const O=u[A];return w.jsxs("div",{className:"space-y-1",children:[w.jsxs("div",{className:"flex items-center justify-between",children:[w.jsx("span",{className:"text-xs text-gray-700 font-medium w-20",children:O}),w.jsx("span",{className:"text-xs font-mono font-bold text-gray-800 w-10 text-right",children:P})]}),w.jsx("div",{className:"w-full bg-gray-200 rounded-full h-2",children:w.jsx("div",{className:`h-2 rounded-full transition-all ${P>=80?"bg-green-500":P>=60?"bg-blue-500":P>=40?"bg-yellow-500":"bg-red-500"}`,style:{width:`${P}%`}})})]},A)})]}),e.salary&&w.jsx("div",{className:"px-4 py-3 bg-gray-50 border-t border-gray-200",children:w.jsxs("div",{className:"flex items-center justify-between",children:[w.jsx("span",{className:"text-xs font-semibold text-gray-600 uppercase tracking-wide",children:"연봉"}),w.jsxs("span",{className:"text-sm font-mono font-bold text-baseball-green",children:[e.salary.toLocaleString("ko-KR"),"원"]})]})})]})};function GM({isOpen:e,type:t,title:n,players:r,onSelect:i,onClose:o}){if(!e)return null;const s=l=>{i(l),o()};return w.jsx(Xr,{children:e&&w.jsxs(w.Fragment,{children:[w.jsx(or.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:o,className:"fixed inset-0 bg-black/60 backdrop-blur-sm z-50"}),w.jsx(or.div,{initial:{opacity:0,scale:.9,y:20},animate:{opacity:1,scale:1,y:0},exit:{opacity:0,scale:.9,y:20},className:"fixed inset-0 z-50 flex items-center justify-center p-4",onClick:l=>l.stopPropagation(),children:w.jsxs("div",{className:"bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-white/50",children:[w.jsxs("div",{className:"bg-baseball-green text-white p-4 flex items-center justify-between",children:[w.jsx("h2",{className:"text-2xl font-bold",children:n}),w.jsx("button",{onClick:o,className:"p-1 hover:bg-white/20 rounded transition-colors",children:w.jsx(Rf,{className:"w-6 h-6"})})]}),w.jsx("div",{className:"flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-50 to-white",children:w.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4",children:r.map(l=>{var E,p,g,y,T,b,k,A,P,O,C,L,F,W,ee;const u=["투수","선발","불펜","마무리","좌투","우투","P","SP","RP","CP"].some(B=>l.position.includes(B)||l.position===B),c=(B,ce)=>Math.floor(Math.random()*(ce-B+1))+B,f=B=>B!=null&&B!==0&&!isNaN(B),d={velocity:c(70,95),movement:c(60,85),control:c(55,80),breaking:c(60,85),stamina:c(65,85)},h={contactL:c(60,85),contactR:c(65,90),power:c(50,80),eye:c(55,80),defense:c(60,85),speed:c(55,85)},m=u?{velocity:f((E=l.stats)==null?void 0:E.velocity)?l.stats.velocity:d.velocity,movement:f((p=l.stats)==null?void 0:p.movement)?l.stats.movement:d.movement,control:f((g=l.stats)==null?void 0:g.control)?l.stats.control:d.control,breaking:f((y=l.stats)==null?void 0:y.breaking)?l.stats.breaking:d.breaking,stamina:f((T=l.stats)==null?void 0:T.stamina)?l.stats.stamina:d.stamina}:{contactL:f((b=l.stats)==null?void 0:b.contactL)?l.stats.contactL:h.contactL,contactR:f((k=l.stats)==null?void 0:k.contactR)?l.stats.contactR:h.contactR,power:f((A=l.stats)==null?void 0:A.power)?l.stats.power:h.power,eye:f((P=l.stats)==null?void 0:P.eye)?l.stats.eye:h.eye,defense:f((O=l.stats)==null?void 0:O.defense)?l.stats.defense:h.defense,speed:f((C=l.stats)==null?void 0:C.speed)?l.stats.speed:h.speed},x={id:l.id,name:l.name,position:l.position,grade:(L=l.stats)!=null&&L.overall?l.stats.overall>=90?"S":l.stats.overall>=80?"A":l.stats.overall>=70?"B":l.stats.overall>=60?"C":"D":"C",stats:{...m,overall:((F=l.stats)==null?void 0:F.overall)||65,...Object.fromEntries(Object.entries(l.stats||{}).filter(([B])=>!["velocity","movement","control","breaking","stamina","contactL","contactR","power","eye","defense","speed","overall"].includes(B)))},age:((W=l.stats)==null?void 0:W.age)||l.age,salary:((ee=l.stats)==null?void 0:ee.salary)||l.salary};return w.jsx(KM,{player:x,onClick:()=>s(l)},l.id)})})})]})})]})})}function YM({playerName:e,onSubmit:t,onClose:n}){const[r,i]=N.useState(""),o=l=>{l.preventDefault();const a=parseInt(r.replace(/,/g,""));!isNaN(a)&&a>0&&(t(a),i(""))},s=l=>l.replace(/[^0-9]/g,"").replace(/\B(?=(\d{3})+(?!\d))/g,",");return w.jsx(or.div,{initial:{y:100,opacity:0},animate:{y:0,opacity:1},exit:{y:100,opacity:0},className:"fixed bottom-0 left-0 right-0 bg-white border-t-2 border-baseball-gold shadow-2xl z-40",children:w.jsxs("div",{className:"max-w-4xl mx-auto p-4",children:[w.jsxs("div",{className:"flex items-center justify-between mb-3",children:[w.jsxs("div",{children:[w.jsxs("h3",{className:"font-bold text-lg text-gray-800",children:[e," 선수 연봉 협상"]}),w.jsx("p",{className:"text-sm text-gray-600",children:"제시할 연봉을 입력하세요"})]}),w.jsx("button",{onClick:n,className:"p-1 hover:bg-gray-100 rounded transition-colors",children:w.jsx(Rf,{className:"w-5 h-5 text-gray-600"})})]}),w.jsxs("form",{onSubmit:o,className:"flex gap-2",children:[w.jsxs("div",{className:"flex-1 relative",children:[w.jsx("input",{type:"text",value:r,onChange:l=>i(s(l.target.value)),placeholder:"예: 50,000,000",className:"w-full px-4 py-3 border-2 border-baseball-green rounded-lg focus:outline-none focus:ring-2 focus:ring-baseball-green text-lg font-semibold",autoFocus:!0}),w.jsx("span",{className:"absolute right-4 top-1/2 -translate-y-1/2 text-gray-500",children:"원"})]}),w.jsx("button",{type:"submit",disabled:!r||parseInt(r.replace(/,/g,""))<=0,className:"px-6 py-3 bg-baseball-green hover:bg-baseball-green-dark disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors shadow-md",children:w.jsx(Mx,{className:"w-5 h-5"})})]})]})})}function qM({isOpen:e,onClose:t,newsItems:n=[]}){const r=["2026 시즌 개막 임박...","FA 시장 과열 중...","신인 드래프트 주목...","트레이드 데드라인 다가옴..."],i=n.length>0?n:r;return w.jsx(Xr,{children:e&&w.jsxs(w.Fragment,{children:[w.jsx(or.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:t,className:"fixed inset-0 bg-black/20 z-40"}),w.jsxs(or.div,{initial:{x:"100%"},animate:{x:0},exit:{x:"100%"},transition:{type:"spring",damping:25,stiffness:200},className:"fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-50 flex flex-col",children:[w.jsxs("div",{className:"bg-baseball-green text-white p-4 flex items-center justify-between border-b border-baseball-gold",children:[w.jsxs("div",{className:"flex items-center gap-2",children:[w.jsx(Rx,{className:"w-5 h-5"}),w.jsx("h2",{className:"text-lg font-bold",children:"뉴스"})]}),w.jsx("button",{onClick:t,className:"p-1 hover:bg-white/20 rounded transition-colors",children:w.jsx(Rf,{className:"w-5 h-5"})})]}),w.jsx("div",{className:"flex-1 overflow-y-auto p-4",children:w.jsx("div",{className:"space-y-3",children:i.map((o,s)=>w.jsx("div",{className:"p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-baseball-green transition-colors",children:w.jsx("p",{className:"text-sm text-gray-800",children:o})},s))})})]})]})})}const XM=.3;function QM(){const[e,t]=N.useState(XM),[n,r]=N.useState(!1),i=(a,u)=>{const c=new(window.AudioContext||window.webkitAudioContext),f=c.createOscillator(),d=c.createGain();f.connect(d),d.connect(c.destination),f.frequency.value=a,f.type="sine",d.gain.setValueAtTime(n?0:e,c.currentTime),d.gain.exponentialRampToValueAtTime(.01,c.currentTime+u),f.start(c.currentTime),f.stop(c.currentTime+u)};return{playSound:a=>{if(!n)try{const u={click:()=>i(800,.1),swoosh:()=>i(400,.2),success:()=>i(1e3,.15),error:()=>i(200,.2),coin:()=>i(1200,.1)};u[a]&&u[a]()}catch(u){console.warn("사운드 재생 실패:",u)}},volume:e,setVolume:a=>{const u=Math.max(0,Math.min(1,a));t(u)},isMuted:n,toggleMute:()=>{r(!n)}}}const Vm="baseball_game_save";function ZM({apiKey:e,selectedTeam:t,onResetApiKey:n}){var S;const[r,i]=N.useState([]),[o,s]=N.useState(""),[l,a]=N.useState(!1),[u,c]=N.useState(""),[f,d]=N.useState([]),[h,m]=N.useState({date:null,budget:null}),[x,E]=N.useState("MAIN_GAME"),[p,g]=N.useState(null),[y,T]=N.useState(null),[b,k]=N.useState(!1),[A,P]=N.useState(!1),O=N.useRef(null),C=N.useRef(null),L=N.useRef(null),{playSound:F}=QM();N.useEffect(()=>{e?(L.current=XT(e),C.current=null,k(!0)):k(!1)},[e]),N.useEffect(()=>{if(t&&r.length===0&&b&&L.current){const z=`${t.fullName}을 선택했습니다. 게임을 시작해주세요.`,X=setTimeout(()=>{W(z)},300);return()=>clearTimeout(X)}},[t,b,r.length]),N.useEffect(()=>{var z;(z=O.current)==null||z.scrollIntoView({behavior:"smooth"})},[r,u]),N.useEffect(()=>{const z=r.filter(X=>!X.isUser);if(z.length>0){const X=z[z.length-1],H=Hn(X.text),ie=Fm(H.text);ie&&m(Ie=>({...Ie,date:ie}));const me=jm(H.text);console.log("[자금 파싱] 원본 텍스트:",X.text.substring(0,200)),console.log("[자금 파싱] 파싱된 텍스트:",H.text.substring(0,200)),console.log("[자금 파싱] 추출된 자금:",me),me!==null&&me>0?(console.log("[자금 파싱] ✅ 자금 업데이트:",me.toLocaleString("ko-KR")+"원"),m(Ie=>({...Ie,budget:me}))):console.log("[자금 파싱] ❌ 자금 추출 실패 또는 0원")}},[r]),N.useEffect(()=>{if(u){const z=Hn(u),X=Fm(z.text);X&&m(ie=>({...ie,date:X}));const H=jm(z.text);console.log("[자금 파싱 - 스트리밍] 원본 텍스트:",u.substring(0,200)),console.log("[자금 파싱 - 스트리밍] 파싱된 텍스트:",z.text.substring(0,200)),console.log("[자금 파싱 - 스트리밍] 추출된 자금:",H),H!==null&&H>0?(console.log("[자금 파싱 - 스트리밍] ✅ 자금 업데이트:",H.toLocaleString("ko-KR")+"원"),m(ie=>({...ie,budget:H}))):console.log("[자금 파싱 - 스트리밍] ❌ 자금 추출 실패 또는 0원")}},[u]);const W=async z=>{if(!z.trim()||l)return;F("click");const X=z.trim();s(""),i(H=>[...H,{text:X,isUser:!0}]),a(!0),c(""),d([]);try{if(!L.current)throw new Error("모델이 초기화되지 않았습니다.");if(!C.current){const me=r.length>1?r.slice(1,-1).map(Ie=>({role:Ie.isUser?"user":"model",parts:[{text:Ie.text}]})):[];C.current=L.current.startChat({history:me})}const H=await C.current.sendMessageStream(X);let ie="";try{for await(const Oe of H.stream)try{const $e=Oe.text();if($e){ie+=$e,c(ie);const fr=Hn(ie);fr.options.length>0&&d(fr.options)}}catch($e){console.warn("Chunk 처리 오류:",$e)}const Ie=(await H.response).text();if(Ie&&Ie!==ie&&(ie=Ie,c(ie)),ie){const Oe=Hn(ie);i($e=>[...$e,{text:ie,isUser:!1}]),d(Oe.options),Oe.guiEvent?(g(Oe.guiEvent),E("EVENT_MODAL"),F("swoosh")):F("success")}else throw new Error("응답을 받을 수 없었습니다.")}catch(me){console.error("스트리밍 오류:",me);try{const Oe=(await H.response).text();if(Oe){const $e=Hn(Oe);i(fr=>[...fr,{text:Oe,isUser:!1}]),d($e.options),$e.guiEvent&&(g($e.guiEvent),E("EVENT_MODAL"))}else throw me}catch{throw me}}finally{c("")}}catch(H){console.error("Error:",H);const ie=(H==null?void 0:H.message)||(H==null?void 0:H.toString())||"알 수 없는 오류";i(me=>[...me,{text:`오류가 발생했습니다: ${ie}

API 키와 인터넷 연결을 확인해주세요.`,isUser:!1}]),c(""),d([])}finally{a(!1)}},ee=z=>{z.preventDefault(),W(o)},B=z=>{F("click"),W(z)},ce=()=>{try{const z={messages:r,gameState:h,timestamp:new Date().toISOString()};localStorage.setItem(Vm,JSON.stringify(z)),alert("게임이 저장되었습니다.")}catch(z){console.error("저장 오류:",z),alert("저장 중 오류가 발생했습니다.")}},G=()=>{try{const z=localStorage.getItem(Vm);if(!z){alert("저장된 파일이 없습니다.");return}const X=JSON.parse(z);X.messages&&Array.isArray(X.messages)?(i(X.messages),X.gameState&&m(X.gameState),C.current=null,alert("게임을 불러왔습니다.")):alert("저장 파일 형식이 올바르지 않습니다.")}catch(z){console.error("불러오기 오류:",z),alert("불러오기 중 오류가 발생했습니다.")}},M=z=>{F("coin");const X=`${z.name} 선수 선택`;E("NEGOTIATION"),T(z.name),W(X)},V=z=>{const X=`${y} 선수에게 ${z.toLocaleString()}원 제시`;E("MAIN_GAME"),T(null),W(X)},v=()=>{E("MAIN_GAME"),g(null)},q=r.filter(z=>!z.isUser).slice(-1)[0],re=u?f:q?Hn(q.text).options:[];return w.jsxs("div",{className:"flex flex-col h-screen bg-[#Fdfbf7]",children:[w.jsx(QT,{teamName:t.fullName,budget:h.budget,date:h.date,season:"2026 시즌",onSave:ce,onLoad:G,onNewsClick:()=>P(!0),onApiKeyClick:n}),w.jsx("div",{className:"flex-1 overflow-y-auto px-2 sm:px-4 py-4 sm:py-6",children:w.jsxs("div",{className:"max-w-5xl mx-auto w-full",children:[r.map((z,X)=>w.jsx(zm,{message:z.text,isUser:z.isUser},X)),u&&w.jsx(zm,{message:u,isUser:!1,isStreaming:!0}),w.jsx("div",{ref:O})]})}),w.jsxs("div",{className:"border-t border-gray-300 bg-gray-50 shadow-lg",children:[re.length>0&&!l&&w.jsxs("div",{className:"px-4 pt-3 pb-2 border-b border-gray-300 bg-white",children:[w.jsx("div",{className:"text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2",children:"작전 지시"}),w.jsx("div",{className:"flex flex-wrap gap-2",children:re.map((z,X)=>w.jsx("button",{onClick:()=>B(z.value),disabled:l,className:"px-4 py-2 bg-white border-2 border-gray-300 hover:border-baseball-green hover:bg-baseball-green/5 disabled:bg-gray-200 disabled:border-gray-200 disabled:cursor-not-allowed text-baseball-green text-sm font-semibold rounded transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0",children:z.label},X))})]}),w.jsx("form",{onSubmit:ee,className:"p-4",children:w.jsxs("div",{className:"flex gap-2 max-w-5xl mx-auto",children:[w.jsx("input",{type:"text",value:o,onChange:z=>s(z.target.value),placeholder:"명령을 입력하세요...",className:"flex-1 px-4 py-2.5 border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-baseball-green focus:border-transparent disabled:bg-gray-100 font-sans",disabled:l}),w.jsx("button",{type:"submit",disabled:l||!o.trim(),className:"px-6 py-2.5 bg-baseball-green hover:bg-baseball-green-dark disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 border-b-2 border-baseball-green-dark",children:w.jsx(Mx,{className:"w-5 h-5"})})]})})]}),l&&w.jsx(HM,{}),w.jsx(Xr,{children:x==="EVENT_MODAL"&&p&&w.jsx(GM,{isOpen:!0,type:p.type,title:p.type==="DRAFT"?"신인 드래프트":p.type==="FA"?"FA 시장":"트레이드 제안",players:((S=p.data)==null?void 0:S.players)||[],onSelect:M,onClose:v})}),w.jsx(Xr,{children:x==="NEGOTIATION"&&y&&w.jsx(YM,{playerName:y,onSubmit:V,onClose:()=>{E("MAIN_GAME"),T(null)}})}),w.jsx(qM,{isOpen:A,onClose:()=>P(!1)})]})}function JM(){const[e,t]=N.useState(""),[n,r]=N.useState(!0),[i,o]=N.useState("TEAM_SELECTION"),[s,l]=N.useState(null);N.useEffect(()=>{const f=localStorage.getItem("gemini_api_key");f&&(t(f),r(!1))},[]);const a=f=>{localStorage.setItem("gemini_api_key",f),t(f),r(!1)},u=()=>{localStorage.removeItem("gemini_api_key"),t(""),r(!0),o("TEAM_SELECTION"),l(null)},c=f=>{l(f),o("MAIN_GAME")};return w.jsx("div",{className:"min-h-screen bg-[#F5F7FA]",children:w.jsx(Xr,{mode:"wait",children:n?w.jsx(gT,{onApiKeySet:a},"api-key-modal"):i==="TEAM_SELECTION"?w.jsx(yT,{onSelect:c},"team-selector"):s?w.jsx(ZM,{apiKey:e,selectedTeam:s,onResetApiKey:u},"chat-interface"):null})})}Ia.createRoot(document.getElementById("root")).render(w.jsx(wi.StrictMode,{children:w.jsx(JM,{})}));
