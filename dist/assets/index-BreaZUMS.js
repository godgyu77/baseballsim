(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();var Do=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function pc(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var qm={exports:{}},hl={},Xm={exports:{}},Q={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ps=Symbol.for("react.element"),ev=Symbol.for("react.portal"),tv=Symbol.for("react.fragment"),nv=Symbol.for("react.strict_mode"),rv=Symbol.for("react.profiler"),iv=Symbol.for("react.provider"),sv=Symbol.for("react.context"),ov=Symbol.for("react.forward_ref"),lv=Symbol.for("react.suspense"),av=Symbol.for("react.memo"),uv=Symbol.for("react.lazy"),fd=Symbol.iterator;function cv(e){return e===null||typeof e!="object"?null:(e=fd&&e[fd]||e["@@iterator"],typeof e=="function"?e:null)}var Qm={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Zm=Object.assign,Jm={};function ci(e,t,n){this.props=e,this.context=t,this.refs=Jm,this.updater=n||Qm}ci.prototype.isReactComponent={};ci.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};ci.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function eg(){}eg.prototype=ci.prototype;function mc(e,t,n){this.props=e,this.context=t,this.refs=Jm,this.updater=n||Qm}var gc=mc.prototype=new eg;gc.constructor=mc;Zm(gc,ci.prototype);gc.isPureReactComponent=!0;var dd=Array.isArray,tg=Object.prototype.hasOwnProperty,yc={current:null},ng={key:!0,ref:!0,__self:!0,__source:!0};function rg(e,t,n){var r,i={},s=null,o=null;if(t!=null)for(r in t.ref!==void 0&&(o=t.ref),t.key!==void 0&&(s=""+t.key),t)tg.call(t,r)&&!ng.hasOwnProperty(r)&&(i[r]=t[r]);var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){for(var a=Array(l),u=0;u<l;u++)a[u]=arguments[u+2];i.children=a}if(e&&e.defaultProps)for(r in l=e.defaultProps,l)i[r]===void 0&&(i[r]=l[r]);return{$$typeof:Ps,type:e,key:s,ref:o,props:i,_owner:yc.current}}function fv(e,t){return{$$typeof:Ps,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function xc(e){return typeof e=="object"&&e!==null&&e.$$typeof===Ps}function dv(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var hd=/\/+/g;function Vl(e,t){return typeof e=="object"&&e!==null&&e.key!=null?dv(""+e.key):t.toString(36)}function po(e,t,n,r,i){var s=typeof e;(s==="undefined"||s==="boolean")&&(e=null);var o=!1;if(e===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(e.$$typeof){case Ps:case ev:o=!0}}if(o)return o=e,i=i(o),e=r===""?"."+Vl(o,0):r,dd(i)?(n="",e!=null&&(n=e.replace(hd,"$&/")+"/"),po(i,t,n,"",function(u){return u})):i!=null&&(xc(i)&&(i=fv(i,n+(!i.key||o&&o.key===i.key?"":(""+i.key).replace(hd,"$&/")+"/")+e)),t.push(i)),1;if(o=0,r=r===""?".":r+":",dd(e))for(var l=0;l<e.length;l++){s=e[l];var a=r+Vl(s,l);o+=po(s,t,n,a,i)}else if(a=cv(e),typeof a=="function")for(e=a.call(e),l=0;!(s=e.next()).done;)s=s.value,a=r+Vl(s,l++),o+=po(s,t,n,a,i);else if(s==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return o}function Bs(e,t,n){if(e==null)return e;var r=[],i=0;return po(e,r,"","",function(s){return t.call(n,s,i++)}),r}function hv(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var Je={current:null},mo={transition:null},pv={ReactCurrentDispatcher:Je,ReactCurrentBatchConfig:mo,ReactCurrentOwner:yc};function ig(){throw Error("act(...) is not supported in production builds of React.")}Q.Children={map:Bs,forEach:function(e,t,n){Bs(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Bs(e,function(){t++}),t},toArray:function(e){return Bs(e,function(t){return t})||[]},only:function(e){if(!xc(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};Q.Component=ci;Q.Fragment=tv;Q.Profiler=rv;Q.PureComponent=mc;Q.StrictMode=nv;Q.Suspense=lv;Q.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=pv;Q.act=ig;Q.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Zm({},e.props),i=e.key,s=e.ref,o=e._owner;if(t!=null){if(t.ref!==void 0&&(s=t.ref,o=yc.current),t.key!==void 0&&(i=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(a in t)tg.call(t,a)&&!ng.hasOwnProperty(a)&&(r[a]=t[a]===void 0&&l!==void 0?l[a]:t[a])}var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){l=Array(a);for(var u=0;u<a;u++)l[u]=arguments[u+2];r.children=l}return{$$typeof:Ps,type:e.type,key:i,ref:s,props:r,_owner:o}};Q.createContext=function(e){return e={$$typeof:sv,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:iv,_context:e},e.Consumer=e};Q.createElement=rg;Q.createFactory=function(e){var t=rg.bind(null,e);return t.type=e,t};Q.createRef=function(){return{current:null}};Q.forwardRef=function(e){return{$$typeof:ov,render:e}};Q.isValidElement=xc;Q.lazy=function(e){return{$$typeof:uv,_payload:{_status:-1,_result:e},_init:hv}};Q.memo=function(e,t){return{$$typeof:av,type:e,compare:t===void 0?null:t}};Q.startTransition=function(e){var t=mo.transition;mo.transition={};try{e()}finally{mo.transition=t}};Q.unstable_act=ig;Q.useCallback=function(e,t){return Je.current.useCallback(e,t)};Q.useContext=function(e){return Je.current.useContext(e)};Q.useDebugValue=function(){};Q.useDeferredValue=function(e){return Je.current.useDeferredValue(e)};Q.useEffect=function(e,t){return Je.current.useEffect(e,t)};Q.useId=function(){return Je.current.useId()};Q.useImperativeHandle=function(e,t,n){return Je.current.useImperativeHandle(e,t,n)};Q.useInsertionEffect=function(e,t){return Je.current.useInsertionEffect(e,t)};Q.useLayoutEffect=function(e,t){return Je.current.useLayoutEffect(e,t)};Q.useMemo=function(e,t){return Je.current.useMemo(e,t)};Q.useReducer=function(e,t,n){return Je.current.useReducer(e,t,n)};Q.useRef=function(e){return Je.current.useRef(e)};Q.useState=function(e){return Je.current.useState(e)};Q.useSyncExternalStore=function(e,t,n){return Je.current.useSyncExternalStore(e,t,n)};Q.useTransition=function(){return Je.current.useTransition()};Q.version="18.3.1";Xm.exports=Q;var I=Xm.exports;const Mi=pc(I);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var mv=I,gv=Symbol.for("react.element"),yv=Symbol.for("react.fragment"),xv=Object.prototype.hasOwnProperty,vv=mv.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,wv={key:!0,ref:!0,__self:!0,__source:!0};function sg(e,t,n){var r,i={},s=null,o=null;n!==void 0&&(s=""+n),t.key!==void 0&&(s=""+t.key),t.ref!==void 0&&(o=t.ref);for(r in t)xv.call(t,r)&&!wv.hasOwnProperty(r)&&(i[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)i[r]===void 0&&(i[r]=t[r]);return{$$typeof:gv,type:e,key:s,ref:o,props:i,_owner:vv.current}}hl.Fragment=yv;hl.jsx=sg;hl.jsxs=sg;qm.exports=hl;var v=qm.exports,Ua={},og={exports:{}},xt={},lg={exports:{}},ag={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(M,z){var w=M.length;M.push(z);e:for(;0<w;){var q=w-1>>>1,ie=M[q];if(0<i(ie,z))M[q]=z,M[w]=ie,w=q;else break e}}function n(M){return M.length===0?null:M[0]}function r(M){if(M.length===0)return null;var z=M[0],w=M.pop();if(w!==z){M[0]=w;e:for(var q=0,ie=M.length,S=ie>>>1;q<S;){var Ee=2*(q+1)-1,ct=M[Ee],le=Ee+1,wt=M[le];if(0>i(ct,w))le<ie&&0>i(wt,ct)?(M[q]=wt,M[le]=w,q=le):(M[q]=ct,M[Ee]=w,q=Ee);else if(le<ie&&0>i(wt,w))M[q]=wt,M[le]=w,q=le;else break e}}return z}function i(M,z){var w=M.sortIndex-z.sortIndex;return w!==0?w:M.id-z.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;e.unstable_now=function(){return s.now()}}else{var o=Date,l=o.now();e.unstable_now=function(){return o.now()-l}}var a=[],u=[],c=1,f=null,d=3,h=!1,m=!1,x=!1,C=typeof setTimeout=="function"?setTimeout:null,p=typeof clearTimeout=="function"?clearTimeout:null,g=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function y(M){for(var z=n(u);z!==null;){if(z.callback===null)r(u);else if(z.startTime<=M)r(u),z.sortIndex=z.expirationTime,t(a,z);else break;z=n(u)}}function b(M){if(x=!1,y(M),!m)if(n(a)!==null)m=!0,oe(T);else{var z=n(u);z!==null&&H(b,z.startTime-M)}}function T(M,z){m=!1,x&&(x=!1,p(P),P=-1),h=!0;var w=d;try{for(y(z),f=n(a);f!==null&&(!(f.expirationTime>z)||M&&!L());){var q=f.callback;if(typeof q=="function"){f.callback=null,d=f.priorityLevel;var ie=q(f.expirationTime<=z);z=e.unstable_now(),typeof ie=="function"?f.callback=ie:f===n(a)&&r(a),y(z)}else r(a);f=n(a)}if(f!==null)var S=!0;else{var Ee=n(u);Ee!==null&&H(b,Ee.startTime-z),S=!1}return S}finally{f=null,d=w,h=!1}}var k=!1,A=null,P=-1,O=5,E=-1;function L(){return!(e.unstable_now()-E<O)}function j(){if(A!==null){var M=e.unstable_now();E=M;var z=!0;try{z=A(!0,M)}finally{z?K():(k=!1,A=null)}}else k=!1}var K;if(typeof g=="function")K=function(){g(j)};else if(typeof MessageChannel<"u"){var J=new MessageChannel,B=J.port2;J.port1.onmessage=j,K=function(){B.postMessage(null)}}else K=function(){C(j,0)};function oe(M){A=M,k||(k=!0,K())}function H(M,z){P=C(function(){M(e.unstable_now())},z)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(M){M.callback=null},e.unstable_continueExecution=function(){m||h||(m=!0,oe(T))},e.unstable_forceFrameRate=function(M){0>M||125<M?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):O=0<M?Math.floor(1e3/M):5},e.unstable_getCurrentPriorityLevel=function(){return d},e.unstable_getFirstCallbackNode=function(){return n(a)},e.unstable_next=function(M){switch(d){case 1:case 2:case 3:var z=3;break;default:z=d}var w=d;d=z;try{return M()}finally{d=w}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(M,z){switch(M){case 1:case 2:case 3:case 4:case 5:break;default:M=3}var w=d;d=M;try{return z()}finally{d=w}},e.unstable_scheduleCallback=function(M,z,w){var q=e.unstable_now();switch(typeof w=="object"&&w!==null?(w=w.delay,w=typeof w=="number"&&0<w?q+w:q):w=q,M){case 1:var ie=-1;break;case 2:ie=250;break;case 5:ie=1073741823;break;case 4:ie=1e4;break;default:ie=5e3}return ie=w+ie,M={id:c++,callback:z,priorityLevel:M,startTime:w,expirationTime:ie,sortIndex:-1},w>q?(M.sortIndex=w,t(u,M),n(a)===null&&M===n(u)&&(x?(p(P),P=-1):x=!0,H(b,w-q))):(M.sortIndex=ie,t(a,M),m||h||(m=!0,oe(T))),M},e.unstable_shouldYield=L,e.unstable_wrapCallback=function(M){var z=d;return function(){var w=d;d=z;try{return M.apply(this,arguments)}finally{d=w}}}})(ag);lg.exports=ag;var kv=lg.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Sv=I,yt=kv;function R(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var ug=new Set,ts={};function wr(e,t){ei(e,t),ei(e+"Capture",t)}function ei(e,t){for(ts[e]=t,e=0;e<t.length;e++)ug.add(t[e])}var fn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),$a=Object.prototype.hasOwnProperty,Cv=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,pd={},md={};function Ev(e){return $a.call(md,e)?!0:$a.call(pd,e)?!1:Cv.test(e)?md[e]=!0:(pd[e]=!0,!1)}function bv(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Tv(e,t,n,r){if(t===null||typeof t>"u"||bv(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function et(e,t,n,r,i,s,o){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=s,this.removeEmptyString=o}var Be={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){Be[e]=new et(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];Be[t]=new et(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){Be[e]=new et(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){Be[e]=new et(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){Be[e]=new et(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){Be[e]=new et(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){Be[e]=new et(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){Be[e]=new et(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){Be[e]=new et(e,5,!1,e.toLowerCase(),null,!1,!1)});var vc=/[\-:]([a-z])/g;function wc(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(vc,wc);Be[t]=new et(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(vc,wc);Be[t]=new et(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(vc,wc);Be[t]=new et(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){Be[e]=new et(e,1,!1,e.toLowerCase(),null,!1,!1)});Be.xlinkHref=new et("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){Be[e]=new et(e,1,!1,e.toLowerCase(),null,!0,!0)});function kc(e,t,n,r){var i=Be.hasOwnProperty(t)?Be[t]:null;(i!==null?i.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Tv(t,n,i,r)&&(n=null),r||i===null?Ev(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):i.mustUseProperty?e[i.propertyName]=n===null?i.type===3?!1:"":n:(t=i.attributeName,r=i.attributeNamespace,n===null?e.removeAttribute(t):(i=i.type,n=i===3||i===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var yn=Sv.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Us=Symbol.for("react.element"),Pr=Symbol.for("react.portal"),Nr=Symbol.for("react.fragment"),Sc=Symbol.for("react.strict_mode"),Ha=Symbol.for("react.profiler"),cg=Symbol.for("react.provider"),fg=Symbol.for("react.context"),Cc=Symbol.for("react.forward_ref"),Ga=Symbol.for("react.suspense"),Wa=Symbol.for("react.suspense_list"),Ec=Symbol.for("react.memo"),Sn=Symbol.for("react.lazy"),dg=Symbol.for("react.offscreen"),gd=Symbol.iterator;function wi(e){return e===null||typeof e!="object"?null:(e=gd&&e[gd]||e["@@iterator"],typeof e=="function"?e:null)}var ke=Object.assign,Bl;function Ri(e){if(Bl===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Bl=t&&t[1]||""}return`
`+Bl+e}var Ul=!1;function $l(e,t){if(!e||Ul)return"";Ul=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(u){var r=u}Reflect.construct(e,[],t)}else{try{t.call()}catch(u){r=u}e.call(t.prototype)}else{try{throw Error()}catch(u){r=u}e()}}catch(u){if(u&&r&&typeof u.stack=="string"){for(var i=u.stack.split(`
`),s=r.stack.split(`
`),o=i.length-1,l=s.length-1;1<=o&&0<=l&&i[o]!==s[l];)l--;for(;1<=o&&0<=l;o--,l--)if(i[o]!==s[l]){if(o!==1||l!==1)do if(o--,l--,0>l||i[o]!==s[l]){var a=`
`+i[o].replace(" at new "," at ");return e.displayName&&a.includes("<anonymous>")&&(a=a.replace("<anonymous>",e.displayName)),a}while(1<=o&&0<=l);break}}}finally{Ul=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Ri(e):""}function Av(e){switch(e.tag){case 5:return Ri(e.type);case 16:return Ri("Lazy");case 13:return Ri("Suspense");case 19:return Ri("SuspenseList");case 0:case 2:case 15:return e=$l(e.type,!1),e;case 11:return e=$l(e.type.render,!1),e;case 1:return e=$l(e.type,!0),e;default:return""}}function Ka(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Nr:return"Fragment";case Pr:return"Portal";case Ha:return"Profiler";case Sc:return"StrictMode";case Ga:return"Suspense";case Wa:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case fg:return(e.displayName||"Context")+".Consumer";case cg:return(e._context.displayName||"Context")+".Provider";case Cc:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Ec:return t=e.displayName||null,t!==null?t:Ka(e.type)||"Memo";case Sn:t=e._payload,e=e._init;try{return Ka(e(t))}catch{}}return null}function Pv(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Ka(t);case 8:return t===Sc?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Fn(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function hg(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Nv(e){var t=hg(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,s=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(o){r=""+o,s.call(this,o)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function $s(e){e._valueTracker||(e._valueTracker=Nv(e))}function pg(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=hg(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function Lo(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Ya(e,t){var n=t.checked;return ke({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function yd(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=Fn(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function mg(e,t){t=t.checked,t!=null&&kc(e,"checked",t,!1)}function qa(e,t){mg(e,t);var n=Fn(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Xa(e,t.type,n):t.hasOwnProperty("defaultValue")&&Xa(e,t.type,Fn(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function xd(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Xa(e,t,n){(t!=="number"||Lo(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Di=Array.isArray;function Wr(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t["$"+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty("$"+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=""+Fn(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function Qa(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(R(91));return ke({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function vd(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(R(92));if(Di(n)){if(1<n.length)throw Error(R(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:Fn(n)}}function gg(e,t){var n=Fn(t.value),r=Fn(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function wd(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function yg(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Za(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?yg(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Hs,xg=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,i){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,i)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Hs=Hs||document.createElement("div"),Hs.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Hs.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function ns(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var ji={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Iv=["Webkit","ms","Moz","O"];Object.keys(ji).forEach(function(e){Iv.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),ji[t]=ji[e]})});function vg(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||ji.hasOwnProperty(e)&&ji[e]?(""+t).trim():t+"px"}function wg(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,i=vg(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,i):e[n]=i}}var Mv=ke({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Ja(e,t){if(t){if(Mv[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(R(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(R(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(R(61))}if(t.style!=null&&typeof t.style!="object")throw Error(R(62))}}function eu(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var tu=null;function bc(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var nu=null,Kr=null,Yr=null;function kd(e){if(e=Ms(e)){if(typeof nu!="function")throw Error(R(280));var t=e.stateNode;t&&(t=xl(t),nu(e.stateNode,e.type,t))}}function kg(e){Kr?Yr?Yr.push(e):Yr=[e]:Kr=e}function Sg(){if(Kr){var e=Kr,t=Yr;if(Yr=Kr=null,kd(e),t)for(e=0;e<t.length;e++)kd(t[e])}}function Cg(e,t){return e(t)}function Eg(){}var Hl=!1;function bg(e,t,n){if(Hl)return e(t,n);Hl=!0;try{return Cg(e,t,n)}finally{Hl=!1,(Kr!==null||Yr!==null)&&(Eg(),Sg())}}function rs(e,t){var n=e.stateNode;if(n===null)return null;var r=xl(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(R(231,t,typeof n));return n}var ru=!1;if(fn)try{var ki={};Object.defineProperty(ki,"passive",{get:function(){ru=!0}}),window.addEventListener("test",ki,ki),window.removeEventListener("test",ki,ki)}catch{ru=!1}function Rv(e,t,n,r,i,s,o,l,a){var u=Array.prototype.slice.call(arguments,3);try{t.apply(n,u)}catch(c){this.onError(c)}}var Fi=!1,_o=null,Oo=!1,iu=null,Dv={onError:function(e){Fi=!0,_o=e}};function Lv(e,t,n,r,i,s,o,l,a){Fi=!1,_o=null,Rv.apply(Dv,arguments)}function _v(e,t,n,r,i,s,o,l,a){if(Lv.apply(this,arguments),Fi){if(Fi){var u=_o;Fi=!1,_o=null}else throw Error(R(198));Oo||(Oo=!0,iu=u)}}function kr(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function Tg(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Sd(e){if(kr(e)!==e)throw Error(R(188))}function Ov(e){var t=e.alternate;if(!t){if(t=kr(e),t===null)throw Error(R(188));return t!==e?null:e}for(var n=e,r=t;;){var i=n.return;if(i===null)break;var s=i.alternate;if(s===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===s.child){for(s=i.child;s;){if(s===n)return Sd(i),e;if(s===r)return Sd(i),t;s=s.sibling}throw Error(R(188))}if(n.return!==r.return)n=i,r=s;else{for(var o=!1,l=i.child;l;){if(l===n){o=!0,n=i,r=s;break}if(l===r){o=!0,r=i,n=s;break}l=l.sibling}if(!o){for(l=s.child;l;){if(l===n){o=!0,n=s,r=i;break}if(l===r){o=!0,r=s,n=i;break}l=l.sibling}if(!o)throw Error(R(189))}}if(n.alternate!==r)throw Error(R(190))}if(n.tag!==3)throw Error(R(188));return n.stateNode.current===n?e:t}function Ag(e){return e=Ov(e),e!==null?Pg(e):null}function Pg(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Pg(e);if(t!==null)return t;e=e.sibling}return null}var Ng=yt.unstable_scheduleCallback,Cd=yt.unstable_cancelCallback,jv=yt.unstable_shouldYield,Fv=yt.unstable_requestPaint,Te=yt.unstable_now,zv=yt.unstable_getCurrentPriorityLevel,Tc=yt.unstable_ImmediatePriority,Ig=yt.unstable_UserBlockingPriority,jo=yt.unstable_NormalPriority,Vv=yt.unstable_LowPriority,Mg=yt.unstable_IdlePriority,pl=null,qt=null;function Bv(e){if(qt&&typeof qt.onCommitFiberRoot=="function")try{qt.onCommitFiberRoot(pl,e,void 0,(e.current.flags&128)===128)}catch{}}var Ft=Math.clz32?Math.clz32:Hv,Uv=Math.log,$v=Math.LN2;function Hv(e){return e>>>=0,e===0?32:31-(Uv(e)/$v|0)|0}var Gs=64,Ws=4194304;function Li(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Fo(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,i=e.suspendedLanes,s=e.pingedLanes,o=n&268435455;if(o!==0){var l=o&~i;l!==0?r=Li(l):(s&=o,s!==0&&(r=Li(s)))}else o=n&~i,o!==0?r=Li(o):s!==0&&(r=Li(s));if(r===0)return 0;if(t!==0&&t!==r&&!(t&i)&&(i=r&-r,s=t&-t,i>=s||i===16&&(s&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-Ft(t),i=1<<n,r|=e[n],t&=~i;return r}function Gv(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Wv(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,s=e.pendingLanes;0<s;){var o=31-Ft(s),l=1<<o,a=i[o];a===-1?(!(l&n)||l&r)&&(i[o]=Gv(l,t)):a<=t&&(e.expiredLanes|=l),s&=~l}}function su(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Rg(){var e=Gs;return Gs<<=1,!(Gs&4194240)&&(Gs=64),e}function Gl(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Ns(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Ft(t),e[t]=n}function Kv(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var i=31-Ft(n),s=1<<i;t[i]=0,r[i]=-1,e[i]=-1,n&=~s}}function Ac(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Ft(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}var se=0;function Dg(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Lg,Pc,_g,Og,jg,ou=!1,Ks=[],Nn=null,In=null,Mn=null,is=new Map,ss=new Map,bn=[],Yv="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Ed(e,t){switch(e){case"focusin":case"focusout":Nn=null;break;case"dragenter":case"dragleave":In=null;break;case"mouseover":case"mouseout":Mn=null;break;case"pointerover":case"pointerout":is.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":ss.delete(t.pointerId)}}function Si(e,t,n,r,i,s){return e===null||e.nativeEvent!==s?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:s,targetContainers:[i]},t!==null&&(t=Ms(t),t!==null&&Pc(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function qv(e,t,n,r,i){switch(t){case"focusin":return Nn=Si(Nn,e,t,n,r,i),!0;case"dragenter":return In=Si(In,e,t,n,r,i),!0;case"mouseover":return Mn=Si(Mn,e,t,n,r,i),!0;case"pointerover":var s=i.pointerId;return is.set(s,Si(is.get(s)||null,e,t,n,r,i)),!0;case"gotpointercapture":return s=i.pointerId,ss.set(s,Si(ss.get(s)||null,e,t,n,r,i)),!0}return!1}function Fg(e){var t=rr(e.target);if(t!==null){var n=kr(t);if(n!==null){if(t=n.tag,t===13){if(t=Tg(n),t!==null){e.blockedOn=t,jg(e.priority,function(){_g(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function go(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=lu(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);tu=r,n.target.dispatchEvent(r),tu=null}else return t=Ms(n),t!==null&&Pc(t),e.blockedOn=n,!1;t.shift()}return!0}function bd(e,t,n){go(e)&&n.delete(t)}function Xv(){ou=!1,Nn!==null&&go(Nn)&&(Nn=null),In!==null&&go(In)&&(In=null),Mn!==null&&go(Mn)&&(Mn=null),is.forEach(bd),ss.forEach(bd)}function Ci(e,t){e.blockedOn===t&&(e.blockedOn=null,ou||(ou=!0,yt.unstable_scheduleCallback(yt.unstable_NormalPriority,Xv)))}function os(e){function t(i){return Ci(i,e)}if(0<Ks.length){Ci(Ks[0],e);for(var n=1;n<Ks.length;n++){var r=Ks[n];r.blockedOn===e&&(r.blockedOn=null)}}for(Nn!==null&&Ci(Nn,e),In!==null&&Ci(In,e),Mn!==null&&Ci(Mn,e),is.forEach(t),ss.forEach(t),n=0;n<bn.length;n++)r=bn[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<bn.length&&(n=bn[0],n.blockedOn===null);)Fg(n),n.blockedOn===null&&bn.shift()}var qr=yn.ReactCurrentBatchConfig,zo=!0;function Qv(e,t,n,r){var i=se,s=qr.transition;qr.transition=null;try{se=1,Nc(e,t,n,r)}finally{se=i,qr.transition=s}}function Zv(e,t,n,r){var i=se,s=qr.transition;qr.transition=null;try{se=4,Nc(e,t,n,r)}finally{se=i,qr.transition=s}}function Nc(e,t,n,r){if(zo){var i=lu(e,t,n,r);if(i===null)ta(e,t,r,Vo,n),Ed(e,r);else if(qv(i,e,t,n,r))r.stopPropagation();else if(Ed(e,r),t&4&&-1<Yv.indexOf(e)){for(;i!==null;){var s=Ms(i);if(s!==null&&Lg(s),s=lu(e,t,n,r),s===null&&ta(e,t,r,Vo,n),s===i)break;i=s}i!==null&&r.stopPropagation()}else ta(e,t,r,null,n)}}var Vo=null;function lu(e,t,n,r){if(Vo=null,e=bc(r),e=rr(e),e!==null)if(t=kr(e),t===null)e=null;else if(n=t.tag,n===13){if(e=Tg(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Vo=e,null}function zg(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(zv()){case Tc:return 1;case Ig:return 4;case jo:case Vv:return 16;case Mg:return 536870912;default:return 16}default:return 16}}var An=null,Ic=null,yo=null;function Vg(){if(yo)return yo;var e,t=Ic,n=t.length,r,i="value"in An?An.value:An.textContent,s=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[s-r];r++);return yo=i.slice(e,1<r?1-r:void 0)}function xo(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Ys(){return!0}function Td(){return!1}function vt(e){function t(n,r,i,s,o){this._reactName=n,this._targetInst=i,this.type=r,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var l in e)e.hasOwnProperty(l)&&(n=e[l],this[l]=n?n(s):s[l]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?Ys:Td,this.isPropagationStopped=Td,this}return ke(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Ys)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Ys)},persist:function(){},isPersistent:Ys}),t}var fi={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Mc=vt(fi),Is=ke({},fi,{view:0,detail:0}),Jv=vt(Is),Wl,Kl,Ei,ml=ke({},Is,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Rc,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Ei&&(Ei&&e.type==="mousemove"?(Wl=e.screenX-Ei.screenX,Kl=e.screenY-Ei.screenY):Kl=Wl=0,Ei=e),Wl)},movementY:function(e){return"movementY"in e?e.movementY:Kl}}),Ad=vt(ml),ew=ke({},ml,{dataTransfer:0}),tw=vt(ew),nw=ke({},Is,{relatedTarget:0}),Yl=vt(nw),rw=ke({},fi,{animationName:0,elapsedTime:0,pseudoElement:0}),iw=vt(rw),sw=ke({},fi,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),ow=vt(sw),lw=ke({},fi,{data:0}),Pd=vt(lw),aw={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},uw={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},cw={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function fw(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=cw[e])?!!t[e]:!1}function Rc(){return fw}var dw=ke({},Is,{key:function(e){if(e.key){var t=aw[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=xo(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?uw[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Rc,charCode:function(e){return e.type==="keypress"?xo(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?xo(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),hw=vt(dw),pw=ke({},ml,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Nd=vt(pw),mw=ke({},Is,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Rc}),gw=vt(mw),yw=ke({},fi,{propertyName:0,elapsedTime:0,pseudoElement:0}),xw=vt(yw),vw=ke({},ml,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),ww=vt(vw),kw=[9,13,27,32],Dc=fn&&"CompositionEvent"in window,zi=null;fn&&"documentMode"in document&&(zi=document.documentMode);var Sw=fn&&"TextEvent"in window&&!zi,Bg=fn&&(!Dc||zi&&8<zi&&11>=zi),Id=" ",Md=!1;function Ug(e,t){switch(e){case"keyup":return kw.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function $g(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Ir=!1;function Cw(e,t){switch(e){case"compositionend":return $g(t);case"keypress":return t.which!==32?null:(Md=!0,Id);case"textInput":return e=t.data,e===Id&&Md?null:e;default:return null}}function Ew(e,t){if(Ir)return e==="compositionend"||!Dc&&Ug(e,t)?(e=Vg(),yo=Ic=An=null,Ir=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Bg&&t.locale!=="ko"?null:t.data;default:return null}}var bw={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Rd(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!bw[e.type]:t==="textarea"}function Hg(e,t,n,r){kg(r),t=Bo(t,"onChange"),0<t.length&&(n=new Mc("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Vi=null,ls=null;function Tw(e){ty(e,0)}function gl(e){var t=Dr(e);if(pg(t))return e}function Aw(e,t){if(e==="change")return t}var Gg=!1;if(fn){var ql;if(fn){var Xl="oninput"in document;if(!Xl){var Dd=document.createElement("div");Dd.setAttribute("oninput","return;"),Xl=typeof Dd.oninput=="function"}ql=Xl}else ql=!1;Gg=ql&&(!document.documentMode||9<document.documentMode)}function Ld(){Vi&&(Vi.detachEvent("onpropertychange",Wg),ls=Vi=null)}function Wg(e){if(e.propertyName==="value"&&gl(ls)){var t=[];Hg(t,ls,e,bc(e)),bg(Tw,t)}}function Pw(e,t,n){e==="focusin"?(Ld(),Vi=t,ls=n,Vi.attachEvent("onpropertychange",Wg)):e==="focusout"&&Ld()}function Nw(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return gl(ls)}function Iw(e,t){if(e==="click")return gl(t)}function Mw(e,t){if(e==="input"||e==="change")return gl(t)}function Rw(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Bt=typeof Object.is=="function"?Object.is:Rw;function as(e,t){if(Bt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!$a.call(t,i)||!Bt(e[i],t[i]))return!1}return!0}function _d(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Od(e,t){var n=_d(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=_d(n)}}function Kg(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Kg(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Yg(){for(var e=window,t=Lo();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Lo(e.document)}return t}function Lc(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Dw(e){var t=Yg(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Kg(n.ownerDocument.documentElement,n)){if(r!==null&&Lc(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var i=n.textContent.length,s=Math.min(r.start,i);r=r.end===void 0?s:Math.min(r.end,i),!e.extend&&s>r&&(i=r,r=s,s=i),i=Od(n,s);var o=Od(n,r);i&&o&&(e.rangeCount!==1||e.anchorNode!==i.node||e.anchorOffset!==i.offset||e.focusNode!==o.node||e.focusOffset!==o.offset)&&(t=t.createRange(),t.setStart(i.node,i.offset),e.removeAllRanges(),s>r?(e.addRange(t),e.extend(o.node,o.offset)):(t.setEnd(o.node,o.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Lw=fn&&"documentMode"in document&&11>=document.documentMode,Mr=null,au=null,Bi=null,uu=!1;function jd(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;uu||Mr==null||Mr!==Lo(r)||(r=Mr,"selectionStart"in r&&Lc(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Bi&&as(Bi,r)||(Bi=r,r=Bo(au,"onSelect"),0<r.length&&(t=new Mc("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=Mr)))}function qs(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Rr={animationend:qs("Animation","AnimationEnd"),animationiteration:qs("Animation","AnimationIteration"),animationstart:qs("Animation","AnimationStart"),transitionend:qs("Transition","TransitionEnd")},Ql={},qg={};fn&&(qg=document.createElement("div").style,"AnimationEvent"in window||(delete Rr.animationend.animation,delete Rr.animationiteration.animation,delete Rr.animationstart.animation),"TransitionEvent"in window||delete Rr.transitionend.transition);function yl(e){if(Ql[e])return Ql[e];if(!Rr[e])return e;var t=Rr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in qg)return Ql[e]=t[n];return e}var Xg=yl("animationend"),Qg=yl("animationiteration"),Zg=yl("animationstart"),Jg=yl("transitionend"),ey=new Map,Fd="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Un(e,t){ey.set(e,t),wr(t,[e])}for(var Zl=0;Zl<Fd.length;Zl++){var Jl=Fd[Zl],_w=Jl.toLowerCase(),Ow=Jl[0].toUpperCase()+Jl.slice(1);Un(_w,"on"+Ow)}Un(Xg,"onAnimationEnd");Un(Qg,"onAnimationIteration");Un(Zg,"onAnimationStart");Un("dblclick","onDoubleClick");Un("focusin","onFocus");Un("focusout","onBlur");Un(Jg,"onTransitionEnd");ei("onMouseEnter",["mouseout","mouseover"]);ei("onMouseLeave",["mouseout","mouseover"]);ei("onPointerEnter",["pointerout","pointerover"]);ei("onPointerLeave",["pointerout","pointerover"]);wr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));wr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));wr("onBeforeInput",["compositionend","keypress","textInput","paste"]);wr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));wr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));wr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var _i="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),jw=new Set("cancel close invalid load scroll toggle".split(" ").concat(_i));function zd(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,_v(r,t,void 0,e),e.currentTarget=null}function ty(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;e:{var s=void 0;if(t)for(var o=r.length-1;0<=o;o--){var l=r[o],a=l.instance,u=l.currentTarget;if(l=l.listener,a!==s&&i.isPropagationStopped())break e;zd(i,l,u),s=a}else for(o=0;o<r.length;o++){if(l=r[o],a=l.instance,u=l.currentTarget,l=l.listener,a!==s&&i.isPropagationStopped())break e;zd(i,l,u),s=a}}}if(Oo)throw e=iu,Oo=!1,iu=null,e}function de(e,t){var n=t[pu];n===void 0&&(n=t[pu]=new Set);var r=e+"__bubble";n.has(r)||(ny(t,e,2,!1),n.add(r))}function ea(e,t,n){var r=0;t&&(r|=4),ny(n,e,r,t)}var Xs="_reactListening"+Math.random().toString(36).slice(2);function us(e){if(!e[Xs]){e[Xs]=!0,ug.forEach(function(n){n!=="selectionchange"&&(jw.has(n)||ea(n,!1,e),ea(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Xs]||(t[Xs]=!0,ea("selectionchange",!1,t))}}function ny(e,t,n,r){switch(zg(t)){case 1:var i=Qv;break;case 4:i=Zv;break;default:i=Nc}n=i.bind(null,t,n,e),i=void 0,!ru||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(i=!0),r?i!==void 0?e.addEventListener(t,n,{capture:!0,passive:i}):e.addEventListener(t,n,!0):i!==void 0?e.addEventListener(t,n,{passive:i}):e.addEventListener(t,n,!1)}function ta(e,t,n,r,i){var s=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var l=r.stateNode.containerInfo;if(l===i||l.nodeType===8&&l.parentNode===i)break;if(o===4)for(o=r.return;o!==null;){var a=o.tag;if((a===3||a===4)&&(a=o.stateNode.containerInfo,a===i||a.nodeType===8&&a.parentNode===i))return;o=o.return}for(;l!==null;){if(o=rr(l),o===null)return;if(a=o.tag,a===5||a===6){r=s=o;continue e}l=l.parentNode}}r=r.return}bg(function(){var u=s,c=bc(n),f=[];e:{var d=ey.get(e);if(d!==void 0){var h=Mc,m=e;switch(e){case"keypress":if(xo(n)===0)break e;case"keydown":case"keyup":h=hw;break;case"focusin":m="focus",h=Yl;break;case"focusout":m="blur",h=Yl;break;case"beforeblur":case"afterblur":h=Yl;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":h=Ad;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":h=tw;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":h=gw;break;case Xg:case Qg:case Zg:h=iw;break;case Jg:h=xw;break;case"scroll":h=Jv;break;case"wheel":h=ww;break;case"copy":case"cut":case"paste":h=ow;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":h=Nd}var x=(t&4)!==0,C=!x&&e==="scroll",p=x?d!==null?d+"Capture":null:d;x=[];for(var g=u,y;g!==null;){y=g;var b=y.stateNode;if(y.tag===5&&b!==null&&(y=b,p!==null&&(b=rs(g,p),b!=null&&x.push(cs(g,b,y)))),C)break;g=g.return}0<x.length&&(d=new h(d,m,null,n,c),f.push({event:d,listeners:x}))}}if(!(t&7)){e:{if(d=e==="mouseover"||e==="pointerover",h=e==="mouseout"||e==="pointerout",d&&n!==tu&&(m=n.relatedTarget||n.fromElement)&&(rr(m)||m[dn]))break e;if((h||d)&&(d=c.window===c?c:(d=c.ownerDocument)?d.defaultView||d.parentWindow:window,h?(m=n.relatedTarget||n.toElement,h=u,m=m?rr(m):null,m!==null&&(C=kr(m),m!==C||m.tag!==5&&m.tag!==6)&&(m=null)):(h=null,m=u),h!==m)){if(x=Ad,b="onMouseLeave",p="onMouseEnter",g="mouse",(e==="pointerout"||e==="pointerover")&&(x=Nd,b="onPointerLeave",p="onPointerEnter",g="pointer"),C=h==null?d:Dr(h),y=m==null?d:Dr(m),d=new x(b,g+"leave",h,n,c),d.target=C,d.relatedTarget=y,b=null,rr(c)===u&&(x=new x(p,g+"enter",m,n,c),x.target=y,x.relatedTarget=C,b=x),C=b,h&&m)t:{for(x=h,p=m,g=0,y=x;y;y=Er(y))g++;for(y=0,b=p;b;b=Er(b))y++;for(;0<g-y;)x=Er(x),g--;for(;0<y-g;)p=Er(p),y--;for(;g--;){if(x===p||p!==null&&x===p.alternate)break t;x=Er(x),p=Er(p)}x=null}else x=null;h!==null&&Vd(f,d,h,x,!1),m!==null&&C!==null&&Vd(f,C,m,x,!0)}}e:{if(d=u?Dr(u):window,h=d.nodeName&&d.nodeName.toLowerCase(),h==="select"||h==="input"&&d.type==="file")var T=Aw;else if(Rd(d))if(Gg)T=Mw;else{T=Nw;var k=Pw}else(h=d.nodeName)&&h.toLowerCase()==="input"&&(d.type==="checkbox"||d.type==="radio")&&(T=Iw);if(T&&(T=T(e,u))){Hg(f,T,n,c);break e}k&&k(e,d,u),e==="focusout"&&(k=d._wrapperState)&&k.controlled&&d.type==="number"&&Xa(d,"number",d.value)}switch(k=u?Dr(u):window,e){case"focusin":(Rd(k)||k.contentEditable==="true")&&(Mr=k,au=u,Bi=null);break;case"focusout":Bi=au=Mr=null;break;case"mousedown":uu=!0;break;case"contextmenu":case"mouseup":case"dragend":uu=!1,jd(f,n,c);break;case"selectionchange":if(Lw)break;case"keydown":case"keyup":jd(f,n,c)}var A;if(Dc)e:{switch(e){case"compositionstart":var P="onCompositionStart";break e;case"compositionend":P="onCompositionEnd";break e;case"compositionupdate":P="onCompositionUpdate";break e}P=void 0}else Ir?Ug(e,n)&&(P="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(P="onCompositionStart");P&&(Bg&&n.locale!=="ko"&&(Ir||P!=="onCompositionStart"?P==="onCompositionEnd"&&Ir&&(A=Vg()):(An=c,Ic="value"in An?An.value:An.textContent,Ir=!0)),k=Bo(u,P),0<k.length&&(P=new Pd(P,e,null,n,c),f.push({event:P,listeners:k}),A?P.data=A:(A=$g(n),A!==null&&(P.data=A)))),(A=Sw?Cw(e,n):Ew(e,n))&&(u=Bo(u,"onBeforeInput"),0<u.length&&(c=new Pd("onBeforeInput","beforeinput",null,n,c),f.push({event:c,listeners:u}),c.data=A))}ty(f,t)})}function cs(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Bo(e,t){for(var n=t+"Capture",r=[];e!==null;){var i=e,s=i.stateNode;i.tag===5&&s!==null&&(i=s,s=rs(e,n),s!=null&&r.unshift(cs(e,s,i)),s=rs(e,t),s!=null&&r.push(cs(e,s,i))),e=e.return}return r}function Er(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Vd(e,t,n,r,i){for(var s=t._reactName,o=[];n!==null&&n!==r;){var l=n,a=l.alternate,u=l.stateNode;if(a!==null&&a===r)break;l.tag===5&&u!==null&&(l=u,i?(a=rs(n,s),a!=null&&o.unshift(cs(n,a,l))):i||(a=rs(n,s),a!=null&&o.push(cs(n,a,l)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var Fw=/\r\n?/g,zw=/\u0000|\uFFFD/g;function Bd(e){return(typeof e=="string"?e:""+e).replace(Fw,`
`).replace(zw,"")}function Qs(e,t,n){if(t=Bd(t),Bd(e)!==t&&n)throw Error(R(425))}function Uo(){}var cu=null,fu=null;function du(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var hu=typeof setTimeout=="function"?setTimeout:void 0,Vw=typeof clearTimeout=="function"?clearTimeout:void 0,Ud=typeof Promise=="function"?Promise:void 0,Bw=typeof queueMicrotask=="function"?queueMicrotask:typeof Ud<"u"?function(e){return Ud.resolve(null).then(e).catch(Uw)}:hu;function Uw(e){setTimeout(function(){throw e})}function na(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(r===0){e.removeChild(i),os(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=i}while(n);os(t)}function Rn(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function $d(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var di=Math.random().toString(36).slice(2),Yt="__reactFiber$"+di,fs="__reactProps$"+di,dn="__reactContainer$"+di,pu="__reactEvents$"+di,$w="__reactListeners$"+di,Hw="__reactHandles$"+di;function rr(e){var t=e[Yt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[dn]||n[Yt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=$d(e);e!==null;){if(n=e[Yt])return n;e=$d(e)}return t}e=n,n=e.parentNode}return null}function Ms(e){return e=e[Yt]||e[dn],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Dr(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(R(33))}function xl(e){return e[fs]||null}var mu=[],Lr=-1;function $n(e){return{current:e}}function he(e){0>Lr||(e.current=mu[Lr],mu[Lr]=null,Lr--)}function fe(e,t){Lr++,mu[Lr]=e.current,e.current=t}var zn={},Ke=$n(zn),ot=$n(!1),dr=zn;function ti(e,t){var n=e.type.contextTypes;if(!n)return zn;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var i={},s;for(s in n)i[s]=t[s];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=i),i}function lt(e){return e=e.childContextTypes,e!=null}function $o(){he(ot),he(Ke)}function Hd(e,t,n){if(Ke.current!==zn)throw Error(R(168));fe(Ke,t),fe(ot,n)}function ry(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var i in r)if(!(i in t))throw Error(R(108,Pv(e)||"Unknown",i));return ke({},n,r)}function Ho(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||zn,dr=Ke.current,fe(Ke,e),fe(ot,ot.current),!0}function Gd(e,t,n){var r=e.stateNode;if(!r)throw Error(R(169));n?(e=ry(e,t,dr),r.__reactInternalMemoizedMergedChildContext=e,he(ot),he(Ke),fe(Ke,e)):he(ot),fe(ot,n)}var ln=null,vl=!1,ra=!1;function iy(e){ln===null?ln=[e]:ln.push(e)}function Gw(e){vl=!0,iy(e)}function Hn(){if(!ra&&ln!==null){ra=!0;var e=0,t=se;try{var n=ln;for(se=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}ln=null,vl=!1}catch(i){throw ln!==null&&(ln=ln.slice(e+1)),Ng(Tc,Hn),i}finally{se=t,ra=!1}}return null}var _r=[],Or=0,Go=null,Wo=0,Ct=[],Et=0,hr=null,an=1,un="";function Zn(e,t){_r[Or++]=Wo,_r[Or++]=Go,Go=e,Wo=t}function sy(e,t,n){Ct[Et++]=an,Ct[Et++]=un,Ct[Et++]=hr,hr=e;var r=an;e=un;var i=32-Ft(r)-1;r&=~(1<<i),n+=1;var s=32-Ft(t)+i;if(30<s){var o=i-i%5;s=(r&(1<<o)-1).toString(32),r>>=o,i-=o,an=1<<32-Ft(t)+i|n<<i|r,un=s+e}else an=1<<s|n<<i|r,un=e}function _c(e){e.return!==null&&(Zn(e,1),sy(e,1,0))}function Oc(e){for(;e===Go;)Go=_r[--Or],_r[Or]=null,Wo=_r[--Or],_r[Or]=null;for(;e===hr;)hr=Ct[--Et],Ct[Et]=null,un=Ct[--Et],Ct[Et]=null,an=Ct[--Et],Ct[Et]=null}var mt=null,pt=null,me=!1,jt=null;function oy(e,t){var n=Tt(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Wd(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,mt=e,pt=Rn(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,mt=e,pt=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=hr!==null?{id:an,overflow:un}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Tt(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,mt=e,pt=null,!0):!1;default:return!1}}function gu(e){return(e.mode&1)!==0&&(e.flags&128)===0}function yu(e){if(me){var t=pt;if(t){var n=t;if(!Wd(e,t)){if(gu(e))throw Error(R(418));t=Rn(n.nextSibling);var r=mt;t&&Wd(e,t)?oy(r,n):(e.flags=e.flags&-4097|2,me=!1,mt=e)}}else{if(gu(e))throw Error(R(418));e.flags=e.flags&-4097|2,me=!1,mt=e}}}function Kd(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;mt=e}function Zs(e){if(e!==mt)return!1;if(!me)return Kd(e),me=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!du(e.type,e.memoizedProps)),t&&(t=pt)){if(gu(e))throw ly(),Error(R(418));for(;t;)oy(e,t),t=Rn(t.nextSibling)}if(Kd(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(R(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){pt=Rn(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}pt=null}}else pt=mt?Rn(e.stateNode.nextSibling):null;return!0}function ly(){for(var e=pt;e;)e=Rn(e.nextSibling)}function ni(){pt=mt=null,me=!1}function jc(e){jt===null?jt=[e]:jt.push(e)}var Ww=yn.ReactCurrentBatchConfig;function bi(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(R(309));var r=n.stateNode}if(!r)throw Error(R(147,e));var i=r,s=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===s?t.ref:(t=function(o){var l=i.refs;o===null?delete l[s]:l[s]=o},t._stringRef=s,t)}if(typeof e!="string")throw Error(R(284));if(!n._owner)throw Error(R(290,e))}return e}function Js(e,t){throw e=Object.prototype.toString.call(t),Error(R(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Yd(e){var t=e._init;return t(e._payload)}function ay(e){function t(p,g){if(e){var y=p.deletions;y===null?(p.deletions=[g],p.flags|=16):y.push(g)}}function n(p,g){if(!e)return null;for(;g!==null;)t(p,g),g=g.sibling;return null}function r(p,g){for(p=new Map;g!==null;)g.key!==null?p.set(g.key,g):p.set(g.index,g),g=g.sibling;return p}function i(p,g){return p=On(p,g),p.index=0,p.sibling=null,p}function s(p,g,y){return p.index=y,e?(y=p.alternate,y!==null?(y=y.index,y<g?(p.flags|=2,g):y):(p.flags|=2,g)):(p.flags|=1048576,g)}function o(p){return e&&p.alternate===null&&(p.flags|=2),p}function l(p,g,y,b){return g===null||g.tag!==6?(g=ca(y,p.mode,b),g.return=p,g):(g=i(g,y),g.return=p,g)}function a(p,g,y,b){var T=y.type;return T===Nr?c(p,g,y.props.children,b,y.key):g!==null&&(g.elementType===T||typeof T=="object"&&T!==null&&T.$$typeof===Sn&&Yd(T)===g.type)?(b=i(g,y.props),b.ref=bi(p,g,y),b.return=p,b):(b=bo(y.type,y.key,y.props,null,p.mode,b),b.ref=bi(p,g,y),b.return=p,b)}function u(p,g,y,b){return g===null||g.tag!==4||g.stateNode.containerInfo!==y.containerInfo||g.stateNode.implementation!==y.implementation?(g=fa(y,p.mode,b),g.return=p,g):(g=i(g,y.children||[]),g.return=p,g)}function c(p,g,y,b,T){return g===null||g.tag!==7?(g=ur(y,p.mode,b,T),g.return=p,g):(g=i(g,y),g.return=p,g)}function f(p,g,y){if(typeof g=="string"&&g!==""||typeof g=="number")return g=ca(""+g,p.mode,y),g.return=p,g;if(typeof g=="object"&&g!==null){switch(g.$$typeof){case Us:return y=bo(g.type,g.key,g.props,null,p.mode,y),y.ref=bi(p,null,g),y.return=p,y;case Pr:return g=fa(g,p.mode,y),g.return=p,g;case Sn:var b=g._init;return f(p,b(g._payload),y)}if(Di(g)||wi(g))return g=ur(g,p.mode,y,null),g.return=p,g;Js(p,g)}return null}function d(p,g,y,b){var T=g!==null?g.key:null;if(typeof y=="string"&&y!==""||typeof y=="number")return T!==null?null:l(p,g,""+y,b);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case Us:return y.key===T?a(p,g,y,b):null;case Pr:return y.key===T?u(p,g,y,b):null;case Sn:return T=y._init,d(p,g,T(y._payload),b)}if(Di(y)||wi(y))return T!==null?null:c(p,g,y,b,null);Js(p,y)}return null}function h(p,g,y,b,T){if(typeof b=="string"&&b!==""||typeof b=="number")return p=p.get(y)||null,l(g,p,""+b,T);if(typeof b=="object"&&b!==null){switch(b.$$typeof){case Us:return p=p.get(b.key===null?y:b.key)||null,a(g,p,b,T);case Pr:return p=p.get(b.key===null?y:b.key)||null,u(g,p,b,T);case Sn:var k=b._init;return h(p,g,y,k(b._payload),T)}if(Di(b)||wi(b))return p=p.get(y)||null,c(g,p,b,T,null);Js(g,b)}return null}function m(p,g,y,b){for(var T=null,k=null,A=g,P=g=0,O=null;A!==null&&P<y.length;P++){A.index>P?(O=A,A=null):O=A.sibling;var E=d(p,A,y[P],b);if(E===null){A===null&&(A=O);break}e&&A&&E.alternate===null&&t(p,A),g=s(E,g,P),k===null?T=E:k.sibling=E,k=E,A=O}if(P===y.length)return n(p,A),me&&Zn(p,P),T;if(A===null){for(;P<y.length;P++)A=f(p,y[P],b),A!==null&&(g=s(A,g,P),k===null?T=A:k.sibling=A,k=A);return me&&Zn(p,P),T}for(A=r(p,A);P<y.length;P++)O=h(A,p,P,y[P],b),O!==null&&(e&&O.alternate!==null&&A.delete(O.key===null?P:O.key),g=s(O,g,P),k===null?T=O:k.sibling=O,k=O);return e&&A.forEach(function(L){return t(p,L)}),me&&Zn(p,P),T}function x(p,g,y,b){var T=wi(y);if(typeof T!="function")throw Error(R(150));if(y=T.call(y),y==null)throw Error(R(151));for(var k=T=null,A=g,P=g=0,O=null,E=y.next();A!==null&&!E.done;P++,E=y.next()){A.index>P?(O=A,A=null):O=A.sibling;var L=d(p,A,E.value,b);if(L===null){A===null&&(A=O);break}e&&A&&L.alternate===null&&t(p,A),g=s(L,g,P),k===null?T=L:k.sibling=L,k=L,A=O}if(E.done)return n(p,A),me&&Zn(p,P),T;if(A===null){for(;!E.done;P++,E=y.next())E=f(p,E.value,b),E!==null&&(g=s(E,g,P),k===null?T=E:k.sibling=E,k=E);return me&&Zn(p,P),T}for(A=r(p,A);!E.done;P++,E=y.next())E=h(A,p,P,E.value,b),E!==null&&(e&&E.alternate!==null&&A.delete(E.key===null?P:E.key),g=s(E,g,P),k===null?T=E:k.sibling=E,k=E);return e&&A.forEach(function(j){return t(p,j)}),me&&Zn(p,P),T}function C(p,g,y,b){if(typeof y=="object"&&y!==null&&y.type===Nr&&y.key===null&&(y=y.props.children),typeof y=="object"&&y!==null){switch(y.$$typeof){case Us:e:{for(var T=y.key,k=g;k!==null;){if(k.key===T){if(T=y.type,T===Nr){if(k.tag===7){n(p,k.sibling),g=i(k,y.props.children),g.return=p,p=g;break e}}else if(k.elementType===T||typeof T=="object"&&T!==null&&T.$$typeof===Sn&&Yd(T)===k.type){n(p,k.sibling),g=i(k,y.props),g.ref=bi(p,k,y),g.return=p,p=g;break e}n(p,k);break}else t(p,k);k=k.sibling}y.type===Nr?(g=ur(y.props.children,p.mode,b,y.key),g.return=p,p=g):(b=bo(y.type,y.key,y.props,null,p.mode,b),b.ref=bi(p,g,y),b.return=p,p=b)}return o(p);case Pr:e:{for(k=y.key;g!==null;){if(g.key===k)if(g.tag===4&&g.stateNode.containerInfo===y.containerInfo&&g.stateNode.implementation===y.implementation){n(p,g.sibling),g=i(g,y.children||[]),g.return=p,p=g;break e}else{n(p,g);break}else t(p,g);g=g.sibling}g=fa(y,p.mode,b),g.return=p,p=g}return o(p);case Sn:return k=y._init,C(p,g,k(y._payload),b)}if(Di(y))return m(p,g,y,b);if(wi(y))return x(p,g,y,b);Js(p,y)}return typeof y=="string"&&y!==""||typeof y=="number"?(y=""+y,g!==null&&g.tag===6?(n(p,g.sibling),g=i(g,y),g.return=p,p=g):(n(p,g),g=ca(y,p.mode,b),g.return=p,p=g),o(p)):n(p,g)}return C}var ri=ay(!0),uy=ay(!1),Ko=$n(null),Yo=null,jr=null,Fc=null;function zc(){Fc=jr=Yo=null}function Vc(e){var t=Ko.current;he(Ko),e._currentValue=t}function xu(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function Xr(e,t){Yo=e,Fc=jr=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(it=!0),e.firstContext=null)}function It(e){var t=e._currentValue;if(Fc!==e)if(e={context:e,memoizedValue:t,next:null},jr===null){if(Yo===null)throw Error(R(308));jr=e,Yo.dependencies={lanes:0,firstContext:e}}else jr=jr.next=e;return t}var ir=null;function Bc(e){ir===null?ir=[e]:ir.push(e)}function cy(e,t,n,r){var i=t.interleaved;return i===null?(n.next=n,Bc(t)):(n.next=i.next,i.next=n),t.interleaved=n,hn(e,r)}function hn(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var Cn=!1;function Uc(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function fy(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function cn(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Dn(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,re&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,hn(e,n)}return i=r.interleaved,i===null?(t.next=t,Bc(r)):(t.next=i.next,i.next=t),r.interleaved=t,hn(e,n)}function vo(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Ac(e,n)}}function qd(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?i=s=o:s=s.next=o,n=n.next}while(n!==null);s===null?i=s=t:s=s.next=t}else i=s=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:s,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function qo(e,t,n,r){var i=e.updateQueue;Cn=!1;var s=i.firstBaseUpdate,o=i.lastBaseUpdate,l=i.shared.pending;if(l!==null){i.shared.pending=null;var a=l,u=a.next;a.next=null,o===null?s=u:o.next=u,o=a;var c=e.alternate;c!==null&&(c=c.updateQueue,l=c.lastBaseUpdate,l!==o&&(l===null?c.firstBaseUpdate=u:l.next=u,c.lastBaseUpdate=a))}if(s!==null){var f=i.baseState;o=0,c=u=a=null,l=s;do{var d=l.lane,h=l.eventTime;if((r&d)===d){c!==null&&(c=c.next={eventTime:h,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var m=e,x=l;switch(d=t,h=n,x.tag){case 1:if(m=x.payload,typeof m=="function"){f=m.call(h,f,d);break e}f=m;break e;case 3:m.flags=m.flags&-65537|128;case 0:if(m=x.payload,d=typeof m=="function"?m.call(h,f,d):m,d==null)break e;f=ke({},f,d);break e;case 2:Cn=!0}}l.callback!==null&&l.lane!==0&&(e.flags|=64,d=i.effects,d===null?i.effects=[l]:d.push(l))}else h={eventTime:h,lane:d,tag:l.tag,payload:l.payload,callback:l.callback,next:null},c===null?(u=c=h,a=f):c=c.next=h,o|=d;if(l=l.next,l===null){if(l=i.shared.pending,l===null)break;d=l,l=d.next,d.next=null,i.lastBaseUpdate=d,i.shared.pending=null}}while(!0);if(c===null&&(a=f),i.baseState=a,i.firstBaseUpdate=u,i.lastBaseUpdate=c,t=i.shared.interleaved,t!==null){i=t;do o|=i.lane,i=i.next;while(i!==t)}else s===null&&(i.shared.lanes=0);mr|=o,e.lanes=o,e.memoizedState=f}}function Xd(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],i=r.callback;if(i!==null){if(r.callback=null,r=n,typeof i!="function")throw Error(R(191,i));i.call(r)}}}var Rs={},Xt=$n(Rs),ds=$n(Rs),hs=$n(Rs);function sr(e){if(e===Rs)throw Error(R(174));return e}function $c(e,t){switch(fe(hs,t),fe(ds,e),fe(Xt,Rs),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Za(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Za(t,e)}he(Xt),fe(Xt,t)}function ii(){he(Xt),he(ds),he(hs)}function dy(e){sr(hs.current);var t=sr(Xt.current),n=Za(t,e.type);t!==n&&(fe(ds,e),fe(Xt,n))}function Hc(e){ds.current===e&&(he(Xt),he(ds))}var xe=$n(0);function Xo(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var ia=[];function Gc(){for(var e=0;e<ia.length;e++)ia[e]._workInProgressVersionPrimary=null;ia.length=0}var wo=yn.ReactCurrentDispatcher,sa=yn.ReactCurrentBatchConfig,pr=0,we=null,Re=null,Le=null,Qo=!1,Ui=!1,ps=0,Kw=0;function Ue(){throw Error(R(321))}function Wc(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Bt(e[n],t[n]))return!1;return!0}function Kc(e,t,n,r,i,s){if(pr=s,we=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,wo.current=e===null||e.memoizedState===null?Qw:Zw,e=n(r,i),Ui){s=0;do{if(Ui=!1,ps=0,25<=s)throw Error(R(301));s+=1,Le=Re=null,t.updateQueue=null,wo.current=Jw,e=n(r,i)}while(Ui)}if(wo.current=Zo,t=Re!==null&&Re.next!==null,pr=0,Le=Re=we=null,Qo=!1,t)throw Error(R(300));return e}function Yc(){var e=ps!==0;return ps=0,e}function Wt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Le===null?we.memoizedState=Le=e:Le=Le.next=e,Le}function Mt(){if(Re===null){var e=we.alternate;e=e!==null?e.memoizedState:null}else e=Re.next;var t=Le===null?we.memoizedState:Le.next;if(t!==null)Le=t,Re=e;else{if(e===null)throw Error(R(310));Re=e,e={memoizedState:Re.memoizedState,baseState:Re.baseState,baseQueue:Re.baseQueue,queue:Re.queue,next:null},Le===null?we.memoizedState=Le=e:Le=Le.next=e}return Le}function ms(e,t){return typeof t=="function"?t(e):t}function oa(e){var t=Mt(),n=t.queue;if(n===null)throw Error(R(311));n.lastRenderedReducer=e;var r=Re,i=r.baseQueue,s=n.pending;if(s!==null){if(i!==null){var o=i.next;i.next=s.next,s.next=o}r.baseQueue=i=s,n.pending=null}if(i!==null){s=i.next,r=r.baseState;var l=o=null,a=null,u=s;do{var c=u.lane;if((pr&c)===c)a!==null&&(a=a.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),r=u.hasEagerState?u.eagerState:e(r,u.action);else{var f={lane:c,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};a===null?(l=a=f,o=r):a=a.next=f,we.lanes|=c,mr|=c}u=u.next}while(u!==null&&u!==s);a===null?o=r:a.next=l,Bt(r,t.memoizedState)||(it=!0),t.memoizedState=r,t.baseState=o,t.baseQueue=a,n.lastRenderedState=r}if(e=n.interleaved,e!==null){i=e;do s=i.lane,we.lanes|=s,mr|=s,i=i.next;while(i!==e)}else i===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function la(e){var t=Mt(),n=t.queue;if(n===null)throw Error(R(311));n.lastRenderedReducer=e;var r=n.dispatch,i=n.pending,s=t.memoizedState;if(i!==null){n.pending=null;var o=i=i.next;do s=e(s,o.action),o=o.next;while(o!==i);Bt(s,t.memoizedState)||(it=!0),t.memoizedState=s,t.baseQueue===null&&(t.baseState=s),n.lastRenderedState=s}return[s,r]}function hy(){}function py(e,t){var n=we,r=Mt(),i=t(),s=!Bt(r.memoizedState,i);if(s&&(r.memoizedState=i,it=!0),r=r.queue,qc(yy.bind(null,n,r,e),[e]),r.getSnapshot!==t||s||Le!==null&&Le.memoizedState.tag&1){if(n.flags|=2048,gs(9,gy.bind(null,n,r,i,t),void 0,null),_e===null)throw Error(R(349));pr&30||my(n,t,i)}return i}function my(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=we.updateQueue,t===null?(t={lastEffect:null,stores:null},we.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function gy(e,t,n,r){t.value=n,t.getSnapshot=r,xy(t)&&vy(e)}function yy(e,t,n){return n(function(){xy(t)&&vy(e)})}function xy(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Bt(e,n)}catch{return!0}}function vy(e){var t=hn(e,1);t!==null&&zt(t,e,1,-1)}function Qd(e){var t=Wt();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ms,lastRenderedState:e},t.queue=e,e=e.dispatch=Xw.bind(null,we,e),[t.memoizedState,e]}function gs(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=we.updateQueue,t===null?(t={lastEffect:null,stores:null},we.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function wy(){return Mt().memoizedState}function ko(e,t,n,r){var i=Wt();we.flags|=e,i.memoizedState=gs(1|t,n,void 0,r===void 0?null:r)}function wl(e,t,n,r){var i=Mt();r=r===void 0?null:r;var s=void 0;if(Re!==null){var o=Re.memoizedState;if(s=o.destroy,r!==null&&Wc(r,o.deps)){i.memoizedState=gs(t,n,s,r);return}}we.flags|=e,i.memoizedState=gs(1|t,n,s,r)}function Zd(e,t){return ko(8390656,8,e,t)}function qc(e,t){return wl(2048,8,e,t)}function ky(e,t){return wl(4,2,e,t)}function Sy(e,t){return wl(4,4,e,t)}function Cy(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Ey(e,t,n){return n=n!=null?n.concat([e]):null,wl(4,4,Cy.bind(null,t,e),n)}function Xc(){}function by(e,t){var n=Mt();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Wc(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Ty(e,t){var n=Mt();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Wc(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Ay(e,t,n){return pr&21?(Bt(n,t)||(n=Rg(),we.lanes|=n,mr|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,it=!0),e.memoizedState=n)}function Yw(e,t){var n=se;se=n!==0&&4>n?n:4,e(!0);var r=sa.transition;sa.transition={};try{e(!1),t()}finally{se=n,sa.transition=r}}function Py(){return Mt().memoizedState}function qw(e,t,n){var r=_n(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Ny(e))Iy(t,n);else if(n=cy(e,t,n,r),n!==null){var i=Ze();zt(n,e,r,i),My(n,t,r)}}function Xw(e,t,n){var r=_n(e),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Ny(e))Iy(t,i);else{var s=e.alternate;if(e.lanes===0&&(s===null||s.lanes===0)&&(s=t.lastRenderedReducer,s!==null))try{var o=t.lastRenderedState,l=s(o,n);if(i.hasEagerState=!0,i.eagerState=l,Bt(l,o)){var a=t.interleaved;a===null?(i.next=i,Bc(t)):(i.next=a.next,a.next=i),t.interleaved=i;return}}catch{}finally{}n=cy(e,t,i,r),n!==null&&(i=Ze(),zt(n,e,r,i),My(n,t,r))}}function Ny(e){var t=e.alternate;return e===we||t!==null&&t===we}function Iy(e,t){Ui=Qo=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function My(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Ac(e,n)}}var Zo={readContext:It,useCallback:Ue,useContext:Ue,useEffect:Ue,useImperativeHandle:Ue,useInsertionEffect:Ue,useLayoutEffect:Ue,useMemo:Ue,useReducer:Ue,useRef:Ue,useState:Ue,useDebugValue:Ue,useDeferredValue:Ue,useTransition:Ue,useMutableSource:Ue,useSyncExternalStore:Ue,useId:Ue,unstable_isNewReconciler:!1},Qw={readContext:It,useCallback:function(e,t){return Wt().memoizedState=[e,t===void 0?null:t],e},useContext:It,useEffect:Zd,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,ko(4194308,4,Cy.bind(null,t,e),n)},useLayoutEffect:function(e,t){return ko(4194308,4,e,t)},useInsertionEffect:function(e,t){return ko(4,2,e,t)},useMemo:function(e,t){var n=Wt();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=Wt();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=qw.bind(null,we,e),[r.memoizedState,e]},useRef:function(e){var t=Wt();return e={current:e},t.memoizedState=e},useState:Qd,useDebugValue:Xc,useDeferredValue:function(e){return Wt().memoizedState=e},useTransition:function(){var e=Qd(!1),t=e[0];return e=Yw.bind(null,e[1]),Wt().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=we,i=Wt();if(me){if(n===void 0)throw Error(R(407));n=n()}else{if(n=t(),_e===null)throw Error(R(349));pr&30||my(r,t,n)}i.memoizedState=n;var s={value:n,getSnapshot:t};return i.queue=s,Zd(yy.bind(null,r,s,e),[e]),r.flags|=2048,gs(9,gy.bind(null,r,s,n,t),void 0,null),n},useId:function(){var e=Wt(),t=_e.identifierPrefix;if(me){var n=un,r=an;n=(r&~(1<<32-Ft(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=ps++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=Kw++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Zw={readContext:It,useCallback:by,useContext:It,useEffect:qc,useImperativeHandle:Ey,useInsertionEffect:ky,useLayoutEffect:Sy,useMemo:Ty,useReducer:oa,useRef:wy,useState:function(){return oa(ms)},useDebugValue:Xc,useDeferredValue:function(e){var t=Mt();return Ay(t,Re.memoizedState,e)},useTransition:function(){var e=oa(ms)[0],t=Mt().memoizedState;return[e,t]},useMutableSource:hy,useSyncExternalStore:py,useId:Py,unstable_isNewReconciler:!1},Jw={readContext:It,useCallback:by,useContext:It,useEffect:qc,useImperativeHandle:Ey,useInsertionEffect:ky,useLayoutEffect:Sy,useMemo:Ty,useReducer:la,useRef:wy,useState:function(){return la(ms)},useDebugValue:Xc,useDeferredValue:function(e){var t=Mt();return Re===null?t.memoizedState=e:Ay(t,Re.memoizedState,e)},useTransition:function(){var e=la(ms)[0],t=Mt().memoizedState;return[e,t]},useMutableSource:hy,useSyncExternalStore:py,useId:Py,unstable_isNewReconciler:!1};function _t(e,t){if(e&&e.defaultProps){t=ke({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function vu(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:ke({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var kl={isMounted:function(e){return(e=e._reactInternals)?kr(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=Ze(),i=_n(e),s=cn(r,i);s.payload=t,n!=null&&(s.callback=n),t=Dn(e,s,i),t!==null&&(zt(t,e,i,r),vo(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=Ze(),i=_n(e),s=cn(r,i);s.tag=1,s.payload=t,n!=null&&(s.callback=n),t=Dn(e,s,i),t!==null&&(zt(t,e,i,r),vo(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Ze(),r=_n(e),i=cn(n,r);i.tag=2,t!=null&&(i.callback=t),t=Dn(e,i,r),t!==null&&(zt(t,e,r,n),vo(t,e,r))}};function Jd(e,t,n,r,i,s,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,s,o):t.prototype&&t.prototype.isPureReactComponent?!as(n,r)||!as(i,s):!0}function Ry(e,t,n){var r=!1,i=zn,s=t.contextType;return typeof s=="object"&&s!==null?s=It(s):(i=lt(t)?dr:Ke.current,r=t.contextTypes,s=(r=r!=null)?ti(e,i):zn),t=new t(n,s),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=kl,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=s),t}function eh(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&kl.enqueueReplaceState(t,t.state,null)}function wu(e,t,n,r){var i=e.stateNode;i.props=n,i.state=e.memoizedState,i.refs={},Uc(e);var s=t.contextType;typeof s=="object"&&s!==null?i.context=It(s):(s=lt(t)?dr:Ke.current,i.context=ti(e,s)),i.state=e.memoizedState,s=t.getDerivedStateFromProps,typeof s=="function"&&(vu(e,t,s,n),i.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(t=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),t!==i.state&&kl.enqueueReplaceState(i,i.state,null),qo(e,n,i,r),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308)}function si(e,t){try{var n="",r=t;do n+=Av(r),r=r.return;while(r);var i=n}catch(s){i=`
Error generating stack: `+s.message+`
`+s.stack}return{value:e,source:t,stack:i,digest:null}}function aa(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function ku(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var ek=typeof WeakMap=="function"?WeakMap:Map;function Dy(e,t,n){n=cn(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){el||(el=!0,Mu=r),ku(e,t)},n}function Ly(e,t,n){n=cn(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var i=t.value;n.payload=function(){return r(i)},n.callback=function(){ku(e,t)}}var s=e.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){ku(e,t),typeof r!="function"&&(Ln===null?Ln=new Set([this]):Ln.add(this));var o=t.stack;this.componentDidCatch(t.value,{componentStack:o!==null?o:""})}),n}function th(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new ek;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(i.add(n),e=pk.bind(null,e,t,n),t.then(e,e))}function nh(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function rh(e,t,n,r,i){return e.mode&1?(e.flags|=65536,e.lanes=i,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=cn(-1,1),t.tag=2,Dn(n,t,1))),n.lanes|=1),e)}var tk=yn.ReactCurrentOwner,it=!1;function qe(e,t,n,r){t.child=e===null?uy(t,null,n,r):ri(t,e.child,n,r)}function ih(e,t,n,r,i){n=n.render;var s=t.ref;return Xr(t,i),r=Kc(e,t,n,r,s,i),n=Yc(),e!==null&&!it?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,pn(e,t,i)):(me&&n&&_c(t),t.flags|=1,qe(e,t,r,i),t.child)}function sh(e,t,n,r,i){if(e===null){var s=n.type;return typeof s=="function"&&!sf(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=s,_y(e,t,s,r,i)):(e=bo(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(s=e.child,!(e.lanes&i)){var o=s.memoizedProps;if(n=n.compare,n=n!==null?n:as,n(o,r)&&e.ref===t.ref)return pn(e,t,i)}return t.flags|=1,e=On(s,r),e.ref=t.ref,e.return=t,t.child=e}function _y(e,t,n,r,i){if(e!==null){var s=e.memoizedProps;if(as(s,r)&&e.ref===t.ref)if(it=!1,t.pendingProps=r=s,(e.lanes&i)!==0)e.flags&131072&&(it=!0);else return t.lanes=e.lanes,pn(e,t,i)}return Su(e,t,n,r,i)}function Oy(e,t,n){var r=t.pendingProps,i=r.children,s=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},fe(zr,ht),ht|=n;else{if(!(n&1073741824))return e=s!==null?s.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,fe(zr,ht),ht|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=s!==null?s.baseLanes:n,fe(zr,ht),ht|=r}else s!==null?(r=s.baseLanes|n,t.memoizedState=null):r=n,fe(zr,ht),ht|=r;return qe(e,t,i,n),t.child}function jy(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Su(e,t,n,r,i){var s=lt(n)?dr:Ke.current;return s=ti(t,s),Xr(t,i),n=Kc(e,t,n,r,s,i),r=Yc(),e!==null&&!it?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,pn(e,t,i)):(me&&r&&_c(t),t.flags|=1,qe(e,t,n,i),t.child)}function oh(e,t,n,r,i){if(lt(n)){var s=!0;Ho(t)}else s=!1;if(Xr(t,i),t.stateNode===null)So(e,t),Ry(t,n,r),wu(t,n,r,i),r=!0;else if(e===null){var o=t.stateNode,l=t.memoizedProps;o.props=l;var a=o.context,u=n.contextType;typeof u=="object"&&u!==null?u=It(u):(u=lt(n)?dr:Ke.current,u=ti(t,u));var c=n.getDerivedStateFromProps,f=typeof c=="function"||typeof o.getSnapshotBeforeUpdate=="function";f||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==r||a!==u)&&eh(t,o,r,u),Cn=!1;var d=t.memoizedState;o.state=d,qo(t,r,o,i),a=t.memoizedState,l!==r||d!==a||ot.current||Cn?(typeof c=="function"&&(vu(t,n,c,r),a=t.memoizedState),(l=Cn||Jd(t,n,l,r,d,a,u))?(f||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(t.flags|=4194308)):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=a),o.props=r,o.state=a,o.context=u,r=l):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{o=t.stateNode,fy(e,t),l=t.memoizedProps,u=t.type===t.elementType?l:_t(t.type,l),o.props=u,f=t.pendingProps,d=o.context,a=n.contextType,typeof a=="object"&&a!==null?a=It(a):(a=lt(n)?dr:Ke.current,a=ti(t,a));var h=n.getDerivedStateFromProps;(c=typeof h=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==f||d!==a)&&eh(t,o,r,a),Cn=!1,d=t.memoizedState,o.state=d,qo(t,r,o,i);var m=t.memoizedState;l!==f||d!==m||ot.current||Cn?(typeof h=="function"&&(vu(t,n,h,r),m=t.memoizedState),(u=Cn||Jd(t,n,u,r,d,m,a)||!1)?(c||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,m,a),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,m,a)),typeof o.componentDidUpdate=="function"&&(t.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof o.componentDidUpdate!="function"||l===e.memoizedProps&&d===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&d===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=m),o.props=r,o.state=m,o.context=a,r=u):(typeof o.componentDidUpdate!="function"||l===e.memoizedProps&&d===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&d===e.memoizedState||(t.flags|=1024),r=!1)}return Cu(e,t,n,r,s,i)}function Cu(e,t,n,r,i,s){jy(e,t);var o=(t.flags&128)!==0;if(!r&&!o)return i&&Gd(t,n,!1),pn(e,t,s);r=t.stateNode,tk.current=t;var l=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&o?(t.child=ri(t,e.child,null,s),t.child=ri(t,null,l,s)):qe(e,t,l,s),t.memoizedState=r.state,i&&Gd(t,n,!0),t.child}function Fy(e){var t=e.stateNode;t.pendingContext?Hd(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Hd(e,t.context,!1),$c(e,t.containerInfo)}function lh(e,t,n,r,i){return ni(),jc(i),t.flags|=256,qe(e,t,n,r),t.child}var Eu={dehydrated:null,treeContext:null,retryLane:0};function bu(e){return{baseLanes:e,cachePool:null,transitions:null}}function zy(e,t,n){var r=t.pendingProps,i=xe.current,s=!1,o=(t.flags&128)!==0,l;if((l=o)||(l=e!==null&&e.memoizedState===null?!1:(i&2)!==0),l?(s=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(i|=1),fe(xe,i&1),e===null)return yu(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(o=r.children,e=r.fallback,s?(r=t.mode,s=t.child,o={mode:"hidden",children:o},!(r&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=El(o,r,0,null),e=ur(e,r,n,null),s.return=t,e.return=t,s.sibling=e,t.child=s,t.child.memoizedState=bu(n),t.memoizedState=Eu,e):Qc(t,o));if(i=e.memoizedState,i!==null&&(l=i.dehydrated,l!==null))return nk(e,t,o,r,l,i,n);if(s){s=r.fallback,o=t.mode,i=e.child,l=i.sibling;var a={mode:"hidden",children:r.children};return!(o&1)&&t.child!==i?(r=t.child,r.childLanes=0,r.pendingProps=a,t.deletions=null):(r=On(i,a),r.subtreeFlags=i.subtreeFlags&14680064),l!==null?s=On(l,s):(s=ur(s,o,n,null),s.flags|=2),s.return=t,r.return=t,r.sibling=s,t.child=r,r=s,s=t.child,o=e.child.memoizedState,o=o===null?bu(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=e.childLanes&~n,t.memoizedState=Eu,r}return s=e.child,e=s.sibling,r=On(s,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function Qc(e,t){return t=El({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function eo(e,t,n,r){return r!==null&&jc(r),ri(t,e.child,null,n),e=Qc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function nk(e,t,n,r,i,s,o){if(n)return t.flags&256?(t.flags&=-257,r=aa(Error(R(422))),eo(e,t,o,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(s=r.fallback,i=t.mode,r=El({mode:"visible",children:r.children},i,0,null),s=ur(s,i,o,null),s.flags|=2,r.return=t,s.return=t,r.sibling=s,t.child=r,t.mode&1&&ri(t,e.child,null,o),t.child.memoizedState=bu(o),t.memoizedState=Eu,s);if(!(t.mode&1))return eo(e,t,o,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var l=r.dgst;return r=l,s=Error(R(419)),r=aa(s,r,void 0),eo(e,t,o,r)}if(l=(o&e.childLanes)!==0,it||l){if(r=_e,r!==null){switch(o&-o){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|o)?0:i,i!==0&&i!==s.retryLane&&(s.retryLane=i,hn(e,i),zt(r,e,i,-1))}return rf(),r=aa(Error(R(421))),eo(e,t,o,r)}return i.data==="$?"?(t.flags|=128,t.child=e.child,t=mk.bind(null,e),i._reactRetry=t,null):(e=s.treeContext,pt=Rn(i.nextSibling),mt=t,me=!0,jt=null,e!==null&&(Ct[Et++]=an,Ct[Et++]=un,Ct[Et++]=hr,an=e.id,un=e.overflow,hr=t),t=Qc(t,r.children),t.flags|=4096,t)}function ah(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),xu(e.return,t,n)}function ua(e,t,n,r,i){var s=e.memoizedState;s===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(s.isBackwards=t,s.rendering=null,s.renderingStartTime=0,s.last=r,s.tail=n,s.tailMode=i)}function Vy(e,t,n){var r=t.pendingProps,i=r.revealOrder,s=r.tail;if(qe(e,t,r.children,n),r=xe.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&ah(e,n,t);else if(e.tag===19)ah(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(fe(xe,r),!(t.mode&1))t.memoizedState=null;else switch(i){case"forwards":for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&Xo(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),ua(t,!1,i,n,s);break;case"backwards":for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&Xo(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}ua(t,!0,n,null,s);break;case"together":ua(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function So(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function pn(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),mr|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(R(153));if(t.child!==null){for(e=t.child,n=On(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=On(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function rk(e,t,n){switch(t.tag){case 3:Fy(t),ni();break;case 5:dy(t);break;case 1:lt(t.type)&&Ho(t);break;case 4:$c(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,i=t.memoizedProps.value;fe(Ko,r._currentValue),r._currentValue=i;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(fe(xe,xe.current&1),t.flags|=128,null):n&t.child.childLanes?zy(e,t,n):(fe(xe,xe.current&1),e=pn(e,t,n),e!==null?e.sibling:null);fe(xe,xe.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return Vy(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),fe(xe,xe.current),r)break;return null;case 22:case 23:return t.lanes=0,Oy(e,t,n)}return pn(e,t,n)}var By,Tu,Uy,$y;By=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Tu=function(){};Uy=function(e,t,n,r){var i=e.memoizedProps;if(i!==r){e=t.stateNode,sr(Xt.current);var s=null;switch(n){case"input":i=Ya(e,i),r=Ya(e,r),s=[];break;case"select":i=ke({},i,{value:void 0}),r=ke({},r,{value:void 0}),s=[];break;case"textarea":i=Qa(e,i),r=Qa(e,r),s=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Uo)}Ja(n,r);var o;n=null;for(u in i)if(!r.hasOwnProperty(u)&&i.hasOwnProperty(u)&&i[u]!=null)if(u==="style"){var l=i[u];for(o in l)l.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(ts.hasOwnProperty(u)?s||(s=[]):(s=s||[]).push(u,null));for(u in r){var a=r[u];if(l=i!=null?i[u]:void 0,r.hasOwnProperty(u)&&a!==l&&(a!=null||l!=null))if(u==="style")if(l){for(o in l)!l.hasOwnProperty(o)||a&&a.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in a)a.hasOwnProperty(o)&&l[o]!==a[o]&&(n||(n={}),n[o]=a[o])}else n||(s||(s=[]),s.push(u,n)),n=a;else u==="dangerouslySetInnerHTML"?(a=a?a.__html:void 0,l=l?l.__html:void 0,a!=null&&l!==a&&(s=s||[]).push(u,a)):u==="children"?typeof a!="string"&&typeof a!="number"||(s=s||[]).push(u,""+a):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(ts.hasOwnProperty(u)?(a!=null&&u==="onScroll"&&de("scroll",e),s||l===a||(s=[])):(s=s||[]).push(u,a))}n&&(s=s||[]).push("style",n);var u=s;(t.updateQueue=u)&&(t.flags|=4)}};$y=function(e,t,n,r){n!==r&&(t.flags|=4)};function Ti(e,t){if(!me)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function $e(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function ik(e,t,n){var r=t.pendingProps;switch(Oc(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return $e(t),null;case 1:return lt(t.type)&&$o(),$e(t),null;case 3:return r=t.stateNode,ii(),he(ot),he(Ke),Gc(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Zs(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,jt!==null&&(Lu(jt),jt=null))),Tu(e,t),$e(t),null;case 5:Hc(t);var i=sr(hs.current);if(n=t.type,e!==null&&t.stateNode!=null)Uy(e,t,n,r,i),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(R(166));return $e(t),null}if(e=sr(Xt.current),Zs(t)){r=t.stateNode,n=t.type;var s=t.memoizedProps;switch(r[Yt]=t,r[fs]=s,e=(t.mode&1)!==0,n){case"dialog":de("cancel",r),de("close",r);break;case"iframe":case"object":case"embed":de("load",r);break;case"video":case"audio":for(i=0;i<_i.length;i++)de(_i[i],r);break;case"source":de("error",r);break;case"img":case"image":case"link":de("error",r),de("load",r);break;case"details":de("toggle",r);break;case"input":yd(r,s),de("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!s.multiple},de("invalid",r);break;case"textarea":vd(r,s),de("invalid",r)}Ja(n,s),i=null;for(var o in s)if(s.hasOwnProperty(o)){var l=s[o];o==="children"?typeof l=="string"?r.textContent!==l&&(s.suppressHydrationWarning!==!0&&Qs(r.textContent,l,e),i=["children",l]):typeof l=="number"&&r.textContent!==""+l&&(s.suppressHydrationWarning!==!0&&Qs(r.textContent,l,e),i=["children",""+l]):ts.hasOwnProperty(o)&&l!=null&&o==="onScroll"&&de("scroll",r)}switch(n){case"input":$s(r),xd(r,s,!0);break;case"textarea":$s(r),wd(r);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(r.onclick=Uo)}r=i,t.updateQueue=r,r!==null&&(t.flags|=4)}else{o=i.nodeType===9?i:i.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=yg(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=o.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=o.createElement(n,{is:r.is}):(e=o.createElement(n),n==="select"&&(o=e,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):e=o.createElementNS(e,n),e[Yt]=t,e[fs]=r,By(e,t,!1,!1),t.stateNode=e;e:{switch(o=eu(n,r),n){case"dialog":de("cancel",e),de("close",e),i=r;break;case"iframe":case"object":case"embed":de("load",e),i=r;break;case"video":case"audio":for(i=0;i<_i.length;i++)de(_i[i],e);i=r;break;case"source":de("error",e),i=r;break;case"img":case"image":case"link":de("error",e),de("load",e),i=r;break;case"details":de("toggle",e),i=r;break;case"input":yd(e,r),i=Ya(e,r),de("invalid",e);break;case"option":i=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},i=ke({},r,{value:void 0}),de("invalid",e);break;case"textarea":vd(e,r),i=Qa(e,r),de("invalid",e);break;default:i=r}Ja(n,i),l=i;for(s in l)if(l.hasOwnProperty(s)){var a=l[s];s==="style"?wg(e,a):s==="dangerouslySetInnerHTML"?(a=a?a.__html:void 0,a!=null&&xg(e,a)):s==="children"?typeof a=="string"?(n!=="textarea"||a!=="")&&ns(e,a):typeof a=="number"&&ns(e,""+a):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(ts.hasOwnProperty(s)?a!=null&&s==="onScroll"&&de("scroll",e):a!=null&&kc(e,s,a,o))}switch(n){case"input":$s(e),xd(e,r,!1);break;case"textarea":$s(e),wd(e);break;case"option":r.value!=null&&e.setAttribute("value",""+Fn(r.value));break;case"select":e.multiple=!!r.multiple,s=r.value,s!=null?Wr(e,!!r.multiple,s,!1):r.defaultValue!=null&&Wr(e,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(e.onclick=Uo)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return $e(t),null;case 6:if(e&&t.stateNode!=null)$y(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(R(166));if(n=sr(hs.current),sr(Xt.current),Zs(t)){if(r=t.stateNode,n=t.memoizedProps,r[Yt]=t,(s=r.nodeValue!==n)&&(e=mt,e!==null))switch(e.tag){case 3:Qs(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Qs(r.nodeValue,n,(e.mode&1)!==0)}s&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[Yt]=t,t.stateNode=r}return $e(t),null;case 13:if(he(xe),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(me&&pt!==null&&t.mode&1&&!(t.flags&128))ly(),ni(),t.flags|=98560,s=!1;else if(s=Zs(t),r!==null&&r.dehydrated!==null){if(e===null){if(!s)throw Error(R(318));if(s=t.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(R(317));s[Yt]=t}else ni(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;$e(t),s=!1}else jt!==null&&(Lu(jt),jt=null),s=!0;if(!s)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||xe.current&1?De===0&&(De=3):rf())),t.updateQueue!==null&&(t.flags|=4),$e(t),null);case 4:return ii(),Tu(e,t),e===null&&us(t.stateNode.containerInfo),$e(t),null;case 10:return Vc(t.type._context),$e(t),null;case 17:return lt(t.type)&&$o(),$e(t),null;case 19:if(he(xe),s=t.memoizedState,s===null)return $e(t),null;if(r=(t.flags&128)!==0,o=s.rendering,o===null)if(r)Ti(s,!1);else{if(De!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=Xo(e),o!==null){for(t.flags|=128,Ti(s,!1),r=o.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)s=n,e=r,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=e,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,e=o.dependencies,s.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return fe(xe,xe.current&1|2),t.child}e=e.sibling}s.tail!==null&&Te()>oi&&(t.flags|=128,r=!0,Ti(s,!1),t.lanes=4194304)}else{if(!r)if(e=Xo(o),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Ti(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!me)return $e(t),null}else 2*Te()-s.renderingStartTime>oi&&n!==1073741824&&(t.flags|=128,r=!0,Ti(s,!1),t.lanes=4194304);s.isBackwards?(o.sibling=t.child,t.child=o):(n=s.last,n!==null?n.sibling=o:t.child=o,s.last=o)}return s.tail!==null?(t=s.tail,s.rendering=t,s.tail=t.sibling,s.renderingStartTime=Te(),t.sibling=null,n=xe.current,fe(xe,r?n&1|2:n&1),t):($e(t),null);case 22:case 23:return nf(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?ht&1073741824&&($e(t),t.subtreeFlags&6&&(t.flags|=8192)):$e(t),null;case 24:return null;case 25:return null}throw Error(R(156,t.tag))}function sk(e,t){switch(Oc(t),t.tag){case 1:return lt(t.type)&&$o(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return ii(),he(ot),he(Ke),Gc(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Hc(t),null;case 13:if(he(xe),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(R(340));ni()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return he(xe),null;case 4:return ii(),null;case 10:return Vc(t.type._context),null;case 22:case 23:return nf(),null;case 24:return null;default:return null}}var to=!1,He=!1,ok=typeof WeakSet=="function"?WeakSet:Set,F=null;function Fr(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){Ce(e,t,r)}else n.current=null}function Au(e,t,n){try{n()}catch(r){Ce(e,t,r)}}var uh=!1;function lk(e,t){if(cu=zo,e=Yg(),Lc(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,s=r.focusNode;r=r.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var o=0,l=-1,a=-1,u=0,c=0,f=e,d=null;t:for(;;){for(var h;f!==n||i!==0&&f.nodeType!==3||(l=o+i),f!==s||r!==0&&f.nodeType!==3||(a=o+r),f.nodeType===3&&(o+=f.nodeValue.length),(h=f.firstChild)!==null;)d=f,f=h;for(;;){if(f===e)break t;if(d===n&&++u===i&&(l=o),d===s&&++c===r&&(a=o),(h=f.nextSibling)!==null)break;f=d,d=f.parentNode}f=h}n=l===-1||a===-1?null:{start:l,end:a}}else n=null}n=n||{start:0,end:0}}else n=null;for(fu={focusedElem:e,selectionRange:n},zo=!1,F=t;F!==null;)if(t=F,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,F=e;else for(;F!==null;){t=F;try{var m=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(m!==null){var x=m.memoizedProps,C=m.memoizedState,p=t.stateNode,g=p.getSnapshotBeforeUpdate(t.elementType===t.type?x:_t(t.type,x),C);p.__reactInternalSnapshotBeforeUpdate=g}break;case 3:var y=t.stateNode.containerInfo;y.nodeType===1?y.textContent="":y.nodeType===9&&y.documentElement&&y.removeChild(y.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(R(163))}}catch(b){Ce(t,t.return,b)}if(e=t.sibling,e!==null){e.return=t.return,F=e;break}F=t.return}return m=uh,uh=!1,m}function $i(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&e)===e){var s=i.destroy;i.destroy=void 0,s!==void 0&&Au(t,n,s)}i=i.next}while(i!==r)}}function Sl(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function Pu(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function Hy(e){var t=e.alternate;t!==null&&(e.alternate=null,Hy(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Yt],delete t[fs],delete t[pu],delete t[$w],delete t[Hw])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Gy(e){return e.tag===5||e.tag===3||e.tag===4}function ch(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Gy(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Nu(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Uo));else if(r!==4&&(e=e.child,e!==null))for(Nu(e,t,n),e=e.sibling;e!==null;)Nu(e,t,n),e=e.sibling}function Iu(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Iu(e,t,n),e=e.sibling;e!==null;)Iu(e,t,n),e=e.sibling}var Fe=null,Ot=!1;function vn(e,t,n){for(n=n.child;n!==null;)Wy(e,t,n),n=n.sibling}function Wy(e,t,n){if(qt&&typeof qt.onCommitFiberUnmount=="function")try{qt.onCommitFiberUnmount(pl,n)}catch{}switch(n.tag){case 5:He||Fr(n,t);case 6:var r=Fe,i=Ot;Fe=null,vn(e,t,n),Fe=r,Ot=i,Fe!==null&&(Ot?(e=Fe,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):Fe.removeChild(n.stateNode));break;case 18:Fe!==null&&(Ot?(e=Fe,n=n.stateNode,e.nodeType===8?na(e.parentNode,n):e.nodeType===1&&na(e,n),os(e)):na(Fe,n.stateNode));break;case 4:r=Fe,i=Ot,Fe=n.stateNode.containerInfo,Ot=!0,vn(e,t,n),Fe=r,Ot=i;break;case 0:case 11:case 14:case 15:if(!He&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var s=i,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&Au(n,t,o),i=i.next}while(i!==r)}vn(e,t,n);break;case 1:if(!He&&(Fr(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(l){Ce(n,t,l)}vn(e,t,n);break;case 21:vn(e,t,n);break;case 22:n.mode&1?(He=(r=He)||n.memoizedState!==null,vn(e,t,n),He=r):vn(e,t,n);break;default:vn(e,t,n)}}function fh(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new ok),t.forEach(function(r){var i=gk.bind(null,e,r);n.has(r)||(n.add(r),r.then(i,i))})}}function Dt(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];try{var s=e,o=t,l=o;e:for(;l!==null;){switch(l.tag){case 5:Fe=l.stateNode,Ot=!1;break e;case 3:Fe=l.stateNode.containerInfo,Ot=!0;break e;case 4:Fe=l.stateNode.containerInfo,Ot=!0;break e}l=l.return}if(Fe===null)throw Error(R(160));Wy(s,o,i),Fe=null,Ot=!1;var a=i.alternate;a!==null&&(a.return=null),i.return=null}catch(u){Ce(i,t,u)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Ky(t,e),t=t.sibling}function Ky(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Dt(t,e),Gt(e),r&4){try{$i(3,e,e.return),Sl(3,e)}catch(x){Ce(e,e.return,x)}try{$i(5,e,e.return)}catch(x){Ce(e,e.return,x)}}break;case 1:Dt(t,e),Gt(e),r&512&&n!==null&&Fr(n,n.return);break;case 5:if(Dt(t,e),Gt(e),r&512&&n!==null&&Fr(n,n.return),e.flags&32){var i=e.stateNode;try{ns(i,"")}catch(x){Ce(e,e.return,x)}}if(r&4&&(i=e.stateNode,i!=null)){var s=e.memoizedProps,o=n!==null?n.memoizedProps:s,l=e.type,a=e.updateQueue;if(e.updateQueue=null,a!==null)try{l==="input"&&s.type==="radio"&&s.name!=null&&mg(i,s),eu(l,o);var u=eu(l,s);for(o=0;o<a.length;o+=2){var c=a[o],f=a[o+1];c==="style"?wg(i,f):c==="dangerouslySetInnerHTML"?xg(i,f):c==="children"?ns(i,f):kc(i,c,f,u)}switch(l){case"input":qa(i,s);break;case"textarea":gg(i,s);break;case"select":var d=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!s.multiple;var h=s.value;h!=null?Wr(i,!!s.multiple,h,!1):d!==!!s.multiple&&(s.defaultValue!=null?Wr(i,!!s.multiple,s.defaultValue,!0):Wr(i,!!s.multiple,s.multiple?[]:"",!1))}i[fs]=s}catch(x){Ce(e,e.return,x)}}break;case 6:if(Dt(t,e),Gt(e),r&4){if(e.stateNode===null)throw Error(R(162));i=e.stateNode,s=e.memoizedProps;try{i.nodeValue=s}catch(x){Ce(e,e.return,x)}}break;case 3:if(Dt(t,e),Gt(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{os(t.containerInfo)}catch(x){Ce(e,e.return,x)}break;case 4:Dt(t,e),Gt(e);break;case 13:Dt(t,e),Gt(e),i=e.child,i.flags&8192&&(s=i.memoizedState!==null,i.stateNode.isHidden=s,!s||i.alternate!==null&&i.alternate.memoizedState!==null||(ef=Te())),r&4&&fh(e);break;case 22:if(c=n!==null&&n.memoizedState!==null,e.mode&1?(He=(u=He)||c,Dt(t,e),He=u):Dt(t,e),Gt(e),r&8192){if(u=e.memoizedState!==null,(e.stateNode.isHidden=u)&&!c&&e.mode&1)for(F=e,c=e.child;c!==null;){for(f=F=c;F!==null;){switch(d=F,h=d.child,d.tag){case 0:case 11:case 14:case 15:$i(4,d,d.return);break;case 1:Fr(d,d.return);var m=d.stateNode;if(typeof m.componentWillUnmount=="function"){r=d,n=d.return;try{t=r,m.props=t.memoizedProps,m.state=t.memoizedState,m.componentWillUnmount()}catch(x){Ce(r,n,x)}}break;case 5:Fr(d,d.return);break;case 22:if(d.memoizedState!==null){hh(f);continue}}h!==null?(h.return=d,F=h):hh(f)}c=c.sibling}e:for(c=null,f=e;;){if(f.tag===5){if(c===null){c=f;try{i=f.stateNode,u?(s=i.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(l=f.stateNode,a=f.memoizedProps.style,o=a!=null&&a.hasOwnProperty("display")?a.display:null,l.style.display=vg("display",o))}catch(x){Ce(e,e.return,x)}}}else if(f.tag===6){if(c===null)try{f.stateNode.nodeValue=u?"":f.memoizedProps}catch(x){Ce(e,e.return,x)}}else if((f.tag!==22&&f.tag!==23||f.memoizedState===null||f===e)&&f.child!==null){f.child.return=f,f=f.child;continue}if(f===e)break e;for(;f.sibling===null;){if(f.return===null||f.return===e)break e;c===f&&(c=null),f=f.return}c===f&&(c=null),f.sibling.return=f.return,f=f.sibling}}break;case 19:Dt(t,e),Gt(e),r&4&&fh(e);break;case 21:break;default:Dt(t,e),Gt(e)}}function Gt(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Gy(n)){var r=n;break e}n=n.return}throw Error(R(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(ns(i,""),r.flags&=-33);var s=ch(e);Iu(e,s,i);break;case 3:case 4:var o=r.stateNode.containerInfo,l=ch(e);Nu(e,l,o);break;default:throw Error(R(161))}}catch(a){Ce(e,e.return,a)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function ak(e,t,n){F=e,Yy(e)}function Yy(e,t,n){for(var r=(e.mode&1)!==0;F!==null;){var i=F,s=i.child;if(i.tag===22&&r){var o=i.memoizedState!==null||to;if(!o){var l=i.alternate,a=l!==null&&l.memoizedState!==null||He;l=to;var u=He;if(to=o,(He=a)&&!u)for(F=i;F!==null;)o=F,a=o.child,o.tag===22&&o.memoizedState!==null?ph(i):a!==null?(a.return=o,F=a):ph(i);for(;s!==null;)F=s,Yy(s),s=s.sibling;F=i,to=l,He=u}dh(e)}else i.subtreeFlags&8772&&s!==null?(s.return=i,F=s):dh(e)}}function dh(e){for(;F!==null;){var t=F;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:He||Sl(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!He)if(n===null)r.componentDidMount();else{var i=t.elementType===t.type?n.memoizedProps:_t(t.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var s=t.updateQueue;s!==null&&Xd(t,s,r);break;case 3:var o=t.updateQueue;if(o!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Xd(t,o,n)}break;case 5:var l=t.stateNode;if(n===null&&t.flags&4){n=l;var a=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":a.autoFocus&&n.focus();break;case"img":a.src&&(n.src=a.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var u=t.alternate;if(u!==null){var c=u.memoizedState;if(c!==null){var f=c.dehydrated;f!==null&&os(f)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(R(163))}He||t.flags&512&&Pu(t)}catch(d){Ce(t,t.return,d)}}if(t===e){F=null;break}if(n=t.sibling,n!==null){n.return=t.return,F=n;break}F=t.return}}function hh(e){for(;F!==null;){var t=F;if(t===e){F=null;break}var n=t.sibling;if(n!==null){n.return=t.return,F=n;break}F=t.return}}function ph(e){for(;F!==null;){var t=F;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{Sl(4,t)}catch(a){Ce(t,n,a)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var i=t.return;try{r.componentDidMount()}catch(a){Ce(t,i,a)}}var s=t.return;try{Pu(t)}catch(a){Ce(t,s,a)}break;case 5:var o=t.return;try{Pu(t)}catch(a){Ce(t,o,a)}}}catch(a){Ce(t,t.return,a)}if(t===e){F=null;break}var l=t.sibling;if(l!==null){l.return=t.return,F=l;break}F=t.return}}var uk=Math.ceil,Jo=yn.ReactCurrentDispatcher,Zc=yn.ReactCurrentOwner,Pt=yn.ReactCurrentBatchConfig,re=0,_e=null,Ie=null,Ve=0,ht=0,zr=$n(0),De=0,ys=null,mr=0,Cl=0,Jc=0,Hi=null,nt=null,ef=0,oi=1/0,on=null,el=!1,Mu=null,Ln=null,no=!1,Pn=null,tl=0,Gi=0,Ru=null,Co=-1,Eo=0;function Ze(){return re&6?Te():Co!==-1?Co:Co=Te()}function _n(e){return e.mode&1?re&2&&Ve!==0?Ve&-Ve:Ww.transition!==null?(Eo===0&&(Eo=Rg()),Eo):(e=se,e!==0||(e=window.event,e=e===void 0?16:zg(e.type)),e):1}function zt(e,t,n,r){if(50<Gi)throw Gi=0,Ru=null,Error(R(185));Ns(e,n,r),(!(re&2)||e!==_e)&&(e===_e&&(!(re&2)&&(Cl|=n),De===4&&Tn(e,Ve)),at(e,r),n===1&&re===0&&!(t.mode&1)&&(oi=Te()+500,vl&&Hn()))}function at(e,t){var n=e.callbackNode;Wv(e,t);var r=Fo(e,e===_e?Ve:0);if(r===0)n!==null&&Cd(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&Cd(n),t===1)e.tag===0?Gw(mh.bind(null,e)):iy(mh.bind(null,e)),Bw(function(){!(re&6)&&Hn()}),n=null;else{switch(Dg(r)){case 1:n=Tc;break;case 4:n=Ig;break;case 16:n=jo;break;case 536870912:n=Mg;break;default:n=jo}n=n0(n,qy.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function qy(e,t){if(Co=-1,Eo=0,re&6)throw Error(R(327));var n=e.callbackNode;if(Qr()&&e.callbackNode!==n)return null;var r=Fo(e,e===_e?Ve:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=nl(e,r);else{t=r;var i=re;re|=2;var s=Qy();(_e!==e||Ve!==t)&&(on=null,oi=Te()+500,ar(e,t));do try{dk();break}catch(l){Xy(e,l)}while(!0);zc(),Jo.current=s,re=i,Ie!==null?t=0:(_e=null,Ve=0,t=De)}if(t!==0){if(t===2&&(i=su(e),i!==0&&(r=i,t=Du(e,i))),t===1)throw n=ys,ar(e,0),Tn(e,r),at(e,Te()),n;if(t===6)Tn(e,r);else{if(i=e.current.alternate,!(r&30)&&!ck(i)&&(t=nl(e,r),t===2&&(s=su(e),s!==0&&(r=s,t=Du(e,s))),t===1))throw n=ys,ar(e,0),Tn(e,r),at(e,Te()),n;switch(e.finishedWork=i,e.finishedLanes=r,t){case 0:case 1:throw Error(R(345));case 2:Jn(e,nt,on);break;case 3:if(Tn(e,r),(r&130023424)===r&&(t=ef+500-Te(),10<t)){if(Fo(e,0)!==0)break;if(i=e.suspendedLanes,(i&r)!==r){Ze(),e.pingedLanes|=e.suspendedLanes&i;break}e.timeoutHandle=hu(Jn.bind(null,e,nt,on),t);break}Jn(e,nt,on);break;case 4:if(Tn(e,r),(r&4194240)===r)break;for(t=e.eventTimes,i=-1;0<r;){var o=31-Ft(r);s=1<<o,o=t[o],o>i&&(i=o),r&=~s}if(r=i,r=Te()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*uk(r/1960))-r,10<r){e.timeoutHandle=hu(Jn.bind(null,e,nt,on),r);break}Jn(e,nt,on);break;case 5:Jn(e,nt,on);break;default:throw Error(R(329))}}}return at(e,Te()),e.callbackNode===n?qy.bind(null,e):null}function Du(e,t){var n=Hi;return e.current.memoizedState.isDehydrated&&(ar(e,t).flags|=256),e=nl(e,t),e!==2&&(t=nt,nt=n,t!==null&&Lu(t)),e}function Lu(e){nt===null?nt=e:nt.push.apply(nt,e)}function ck(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var i=n[r],s=i.getSnapshot;i=i.value;try{if(!Bt(s(),i))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Tn(e,t){for(t&=~Jc,t&=~Cl,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Ft(t),r=1<<n;e[n]=-1,t&=~r}}function mh(e){if(re&6)throw Error(R(327));Qr();var t=Fo(e,0);if(!(t&1))return at(e,Te()),null;var n=nl(e,t);if(e.tag!==0&&n===2){var r=su(e);r!==0&&(t=r,n=Du(e,r))}if(n===1)throw n=ys,ar(e,0),Tn(e,t),at(e,Te()),n;if(n===6)throw Error(R(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Jn(e,nt,on),at(e,Te()),null}function tf(e,t){var n=re;re|=1;try{return e(t)}finally{re=n,re===0&&(oi=Te()+500,vl&&Hn())}}function gr(e){Pn!==null&&Pn.tag===0&&!(re&6)&&Qr();var t=re;re|=1;var n=Pt.transition,r=se;try{if(Pt.transition=null,se=1,e)return e()}finally{se=r,Pt.transition=n,re=t,!(re&6)&&Hn()}}function nf(){ht=zr.current,he(zr)}function ar(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,Vw(n)),Ie!==null)for(n=Ie.return;n!==null;){var r=n;switch(Oc(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&$o();break;case 3:ii(),he(ot),he(Ke),Gc();break;case 5:Hc(r);break;case 4:ii();break;case 13:he(xe);break;case 19:he(xe);break;case 10:Vc(r.type._context);break;case 22:case 23:nf()}n=n.return}if(_e=e,Ie=e=On(e.current,null),Ve=ht=t,De=0,ys=null,Jc=Cl=mr=0,nt=Hi=null,ir!==null){for(t=0;t<ir.length;t++)if(n=ir[t],r=n.interleaved,r!==null){n.interleaved=null;var i=r.next,s=n.pending;if(s!==null){var o=s.next;s.next=i,r.next=o}n.pending=r}ir=null}return e}function Xy(e,t){do{var n=Ie;try{if(zc(),wo.current=Zo,Qo){for(var r=we.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}Qo=!1}if(pr=0,Le=Re=we=null,Ui=!1,ps=0,Zc.current=null,n===null||n.return===null){De=1,ys=t,Ie=null;break}e:{var s=e,o=n.return,l=n,a=t;if(t=Ve,l.flags|=32768,a!==null&&typeof a=="object"&&typeof a.then=="function"){var u=a,c=l,f=c.tag;if(!(c.mode&1)&&(f===0||f===11||f===15)){var d=c.alternate;d?(c.updateQueue=d.updateQueue,c.memoizedState=d.memoizedState,c.lanes=d.lanes):(c.updateQueue=null,c.memoizedState=null)}var h=nh(o);if(h!==null){h.flags&=-257,rh(h,o,l,s,t),h.mode&1&&th(s,u,t),t=h,a=u;var m=t.updateQueue;if(m===null){var x=new Set;x.add(a),t.updateQueue=x}else m.add(a);break e}else{if(!(t&1)){th(s,u,t),rf();break e}a=Error(R(426))}}else if(me&&l.mode&1){var C=nh(o);if(C!==null){!(C.flags&65536)&&(C.flags|=256),rh(C,o,l,s,t),jc(si(a,l));break e}}s=a=si(a,l),De!==4&&(De=2),Hi===null?Hi=[s]:Hi.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,t&=-t,s.lanes|=t;var p=Dy(s,a,t);qd(s,p);break e;case 1:l=a;var g=s.type,y=s.stateNode;if(!(s.flags&128)&&(typeof g.getDerivedStateFromError=="function"||y!==null&&typeof y.componentDidCatch=="function"&&(Ln===null||!Ln.has(y)))){s.flags|=65536,t&=-t,s.lanes|=t;var b=Ly(s,l,t);qd(s,b);break e}}s=s.return}while(s!==null)}Jy(n)}catch(T){t=T,Ie===n&&n!==null&&(Ie=n=n.return);continue}break}while(!0)}function Qy(){var e=Jo.current;return Jo.current=Zo,e===null?Zo:e}function rf(){(De===0||De===3||De===2)&&(De=4),_e===null||!(mr&268435455)&&!(Cl&268435455)||Tn(_e,Ve)}function nl(e,t){var n=re;re|=2;var r=Qy();(_e!==e||Ve!==t)&&(on=null,ar(e,t));do try{fk();break}catch(i){Xy(e,i)}while(!0);if(zc(),re=n,Jo.current=r,Ie!==null)throw Error(R(261));return _e=null,Ve=0,De}function fk(){for(;Ie!==null;)Zy(Ie)}function dk(){for(;Ie!==null&&!jv();)Zy(Ie)}function Zy(e){var t=t0(e.alternate,e,ht);e.memoizedProps=e.pendingProps,t===null?Jy(e):Ie=t,Zc.current=null}function Jy(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=sk(n,t),n!==null){n.flags&=32767,Ie=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{De=6,Ie=null;return}}else if(n=ik(n,t,ht),n!==null){Ie=n;return}if(t=t.sibling,t!==null){Ie=t;return}Ie=t=e}while(t!==null);De===0&&(De=5)}function Jn(e,t,n){var r=se,i=Pt.transition;try{Pt.transition=null,se=1,hk(e,t,n,r)}finally{Pt.transition=i,se=r}return null}function hk(e,t,n,r){do Qr();while(Pn!==null);if(re&6)throw Error(R(327));n=e.finishedWork;var i=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(R(177));e.callbackNode=null,e.callbackPriority=0;var s=n.lanes|n.childLanes;if(Kv(e,s),e===_e&&(Ie=_e=null,Ve=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||no||(no=!0,n0(jo,function(){return Qr(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=Pt.transition,Pt.transition=null;var o=se;se=1;var l=re;re|=4,Zc.current=null,lk(e,n),Ky(n,e),Dw(fu),zo=!!cu,fu=cu=null,e.current=n,ak(n),Fv(),re=l,se=o,Pt.transition=s}else e.current=n;if(no&&(no=!1,Pn=e,tl=i),s=e.pendingLanes,s===0&&(Ln=null),Bv(n.stateNode),at(e,Te()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)i=t[n],r(i.value,{componentStack:i.stack,digest:i.digest});if(el)throw el=!1,e=Mu,Mu=null,e;return tl&1&&e.tag!==0&&Qr(),s=e.pendingLanes,s&1?e===Ru?Gi++:(Gi=0,Ru=e):Gi=0,Hn(),null}function Qr(){if(Pn!==null){var e=Dg(tl),t=Pt.transition,n=se;try{if(Pt.transition=null,se=16>e?16:e,Pn===null)var r=!1;else{if(e=Pn,Pn=null,tl=0,re&6)throw Error(R(331));var i=re;for(re|=4,F=e.current;F!==null;){var s=F,o=s.child;if(F.flags&16){var l=s.deletions;if(l!==null){for(var a=0;a<l.length;a++){var u=l[a];for(F=u;F!==null;){var c=F;switch(c.tag){case 0:case 11:case 15:$i(8,c,s)}var f=c.child;if(f!==null)f.return=c,F=f;else for(;F!==null;){c=F;var d=c.sibling,h=c.return;if(Hy(c),c===u){F=null;break}if(d!==null){d.return=h,F=d;break}F=h}}}var m=s.alternate;if(m!==null){var x=m.child;if(x!==null){m.child=null;do{var C=x.sibling;x.sibling=null,x=C}while(x!==null)}}F=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,F=o;else e:for(;F!==null;){if(s=F,s.flags&2048)switch(s.tag){case 0:case 11:case 15:$i(9,s,s.return)}var p=s.sibling;if(p!==null){p.return=s.return,F=p;break e}F=s.return}}var g=e.current;for(F=g;F!==null;){o=F;var y=o.child;if(o.subtreeFlags&2064&&y!==null)y.return=o,F=y;else e:for(o=g;F!==null;){if(l=F,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:Sl(9,l)}}catch(T){Ce(l,l.return,T)}if(l===o){F=null;break e}var b=l.sibling;if(b!==null){b.return=l.return,F=b;break e}F=l.return}}if(re=i,Hn(),qt&&typeof qt.onPostCommitFiberRoot=="function")try{qt.onPostCommitFiberRoot(pl,e)}catch{}r=!0}return r}finally{se=n,Pt.transition=t}}return!1}function gh(e,t,n){t=si(n,t),t=Dy(e,t,1),e=Dn(e,t,1),t=Ze(),e!==null&&(Ns(e,1,t),at(e,t))}function Ce(e,t,n){if(e.tag===3)gh(e,e,n);else for(;t!==null;){if(t.tag===3){gh(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Ln===null||!Ln.has(r))){e=si(n,e),e=Ly(t,e,1),t=Dn(t,e,1),e=Ze(),t!==null&&(Ns(t,1,e),at(t,e));break}}t=t.return}}function pk(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=Ze(),e.pingedLanes|=e.suspendedLanes&n,_e===e&&(Ve&n)===n&&(De===4||De===3&&(Ve&130023424)===Ve&&500>Te()-ef?ar(e,0):Jc|=n),at(e,t)}function e0(e,t){t===0&&(e.mode&1?(t=Ws,Ws<<=1,!(Ws&130023424)&&(Ws=4194304)):t=1);var n=Ze();e=hn(e,t),e!==null&&(Ns(e,t,n),at(e,n))}function mk(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),e0(e,n)}function gk(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,i=e.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(R(314))}r!==null&&r.delete(t),e0(e,n)}var t0;t0=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||ot.current)it=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return it=!1,rk(e,t,n);it=!!(e.flags&131072)}else it=!1,me&&t.flags&1048576&&sy(t,Wo,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;So(e,t),e=t.pendingProps;var i=ti(t,Ke.current);Xr(t,n),i=Kc(null,t,r,e,i,n);var s=Yc();return t.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,lt(r)?(s=!0,Ho(t)):s=!1,t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,Uc(t),i.updater=kl,t.stateNode=i,i._reactInternals=t,wu(t,r,e,n),t=Cu(null,t,r,!0,s,n)):(t.tag=0,me&&s&&_c(t),qe(null,t,i,n),t=t.child),t;case 16:r=t.elementType;e:{switch(So(e,t),e=t.pendingProps,i=r._init,r=i(r._payload),t.type=r,i=t.tag=xk(r),e=_t(r,e),i){case 0:t=Su(null,t,r,e,n);break e;case 1:t=oh(null,t,r,e,n);break e;case 11:t=ih(null,t,r,e,n);break e;case 14:t=sh(null,t,r,_t(r.type,e),n);break e}throw Error(R(306,r,""))}return t;case 0:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:_t(r,i),Su(e,t,r,i,n);case 1:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:_t(r,i),oh(e,t,r,i,n);case 3:e:{if(Fy(t),e===null)throw Error(R(387));r=t.pendingProps,s=t.memoizedState,i=s.element,fy(e,t),qo(t,r,null,n);var o=t.memoizedState;if(r=o.element,s.isDehydrated)if(s={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},t.updateQueue.baseState=s,t.memoizedState=s,t.flags&256){i=si(Error(R(423)),t),t=lh(e,t,r,n,i);break e}else if(r!==i){i=si(Error(R(424)),t),t=lh(e,t,r,n,i);break e}else for(pt=Rn(t.stateNode.containerInfo.firstChild),mt=t,me=!0,jt=null,n=uy(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(ni(),r===i){t=pn(e,t,n);break e}qe(e,t,r,n)}t=t.child}return t;case 5:return dy(t),e===null&&yu(t),r=t.type,i=t.pendingProps,s=e!==null?e.memoizedProps:null,o=i.children,du(r,i)?o=null:s!==null&&du(r,s)&&(t.flags|=32),jy(e,t),qe(e,t,o,n),t.child;case 6:return e===null&&yu(t),null;case 13:return zy(e,t,n);case 4:return $c(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=ri(t,null,r,n):qe(e,t,r,n),t.child;case 11:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:_t(r,i),ih(e,t,r,i,n);case 7:return qe(e,t,t.pendingProps,n),t.child;case 8:return qe(e,t,t.pendingProps.children,n),t.child;case 12:return qe(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,i=t.pendingProps,s=t.memoizedProps,o=i.value,fe(Ko,r._currentValue),r._currentValue=o,s!==null)if(Bt(s.value,o)){if(s.children===i.children&&!ot.current){t=pn(e,t,n);break e}}else for(s=t.child,s!==null&&(s.return=t);s!==null;){var l=s.dependencies;if(l!==null){o=s.child;for(var a=l.firstContext;a!==null;){if(a.context===r){if(s.tag===1){a=cn(-1,n&-n),a.tag=2;var u=s.updateQueue;if(u!==null){u=u.shared;var c=u.pending;c===null?a.next=a:(a.next=c.next,c.next=a),u.pending=a}}s.lanes|=n,a=s.alternate,a!==null&&(a.lanes|=n),xu(s.return,n,t),l.lanes|=n;break}a=a.next}}else if(s.tag===10)o=s.type===t.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(R(341));o.lanes|=n,l=o.alternate,l!==null&&(l.lanes|=n),xu(o,n,t),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===t){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}qe(e,t,i.children,n),t=t.child}return t;case 9:return i=t.type,r=t.pendingProps.children,Xr(t,n),i=It(i),r=r(i),t.flags|=1,qe(e,t,r,n),t.child;case 14:return r=t.type,i=_t(r,t.pendingProps),i=_t(r.type,i),sh(e,t,r,i,n);case 15:return _y(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:_t(r,i),So(e,t),t.tag=1,lt(r)?(e=!0,Ho(t)):e=!1,Xr(t,n),Ry(t,r,i),wu(t,r,i,n),Cu(null,t,r,!0,e,n);case 19:return Vy(e,t,n);case 22:return Oy(e,t,n)}throw Error(R(156,t.tag))};function n0(e,t){return Ng(e,t)}function yk(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Tt(e,t,n,r){return new yk(e,t,n,r)}function sf(e){return e=e.prototype,!(!e||!e.isReactComponent)}function xk(e){if(typeof e=="function")return sf(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Cc)return 11;if(e===Ec)return 14}return 2}function On(e,t){var n=e.alternate;return n===null?(n=Tt(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function bo(e,t,n,r,i,s){var o=2;if(r=e,typeof e=="function")sf(e)&&(o=1);else if(typeof e=="string")o=5;else e:switch(e){case Nr:return ur(n.children,i,s,t);case Sc:o=8,i|=8;break;case Ha:return e=Tt(12,n,t,i|2),e.elementType=Ha,e.lanes=s,e;case Ga:return e=Tt(13,n,t,i),e.elementType=Ga,e.lanes=s,e;case Wa:return e=Tt(19,n,t,i),e.elementType=Wa,e.lanes=s,e;case dg:return El(n,i,s,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case cg:o=10;break e;case fg:o=9;break e;case Cc:o=11;break e;case Ec:o=14;break e;case Sn:o=16,r=null;break e}throw Error(R(130,e==null?e:typeof e,""))}return t=Tt(o,n,t,i),t.elementType=e,t.type=r,t.lanes=s,t}function ur(e,t,n,r){return e=Tt(7,e,r,t),e.lanes=n,e}function El(e,t,n,r){return e=Tt(22,e,r,t),e.elementType=dg,e.lanes=n,e.stateNode={isHidden:!1},e}function ca(e,t,n){return e=Tt(6,e,null,t),e.lanes=n,e}function fa(e,t,n){return t=Tt(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function vk(e,t,n,r,i){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Gl(0),this.expirationTimes=Gl(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Gl(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function of(e,t,n,r,i,s,o,l,a){return e=new vk(e,t,n,l,a),t===1?(t=1,s===!0&&(t|=8)):t=0,s=Tt(3,null,null,t),e.current=s,s.stateNode=e,s.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Uc(s),e}function wk(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Pr,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function r0(e){if(!e)return zn;e=e._reactInternals;e:{if(kr(e)!==e||e.tag!==1)throw Error(R(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(lt(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(R(171))}if(e.tag===1){var n=e.type;if(lt(n))return ry(e,n,t)}return t}function i0(e,t,n,r,i,s,o,l,a){return e=of(n,r,!0,e,i,s,o,l,a),e.context=r0(null),n=e.current,r=Ze(),i=_n(n),s=cn(r,i),s.callback=t??null,Dn(n,s,i),e.current.lanes=i,Ns(e,i,r),at(e,r),e}function bl(e,t,n,r){var i=t.current,s=Ze(),o=_n(i);return n=r0(n),t.context===null?t.context=n:t.pendingContext=n,t=cn(s,o),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=Dn(i,t,o),e!==null&&(zt(e,i,o,s),vo(e,i,o)),o}function rl(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function yh(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function lf(e,t){yh(e,t),(e=e.alternate)&&yh(e,t)}function kk(){return null}var s0=typeof reportError=="function"?reportError:function(e){console.error(e)};function af(e){this._internalRoot=e}Tl.prototype.render=af.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(R(409));bl(e,t,null,null)};Tl.prototype.unmount=af.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;gr(function(){bl(null,e,null,null)}),t[dn]=null}};function Tl(e){this._internalRoot=e}Tl.prototype.unstable_scheduleHydration=function(e){if(e){var t=Og();e={blockedOn:null,target:e,priority:t};for(var n=0;n<bn.length&&t!==0&&t<bn[n].priority;n++);bn.splice(n,0,e),n===0&&Fg(e)}};function uf(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Al(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function xh(){}function Sk(e,t,n,r,i){if(i){if(typeof r=="function"){var s=r;r=function(){var u=rl(o);s.call(u)}}var o=i0(t,r,e,0,null,!1,!1,"",xh);return e._reactRootContainer=o,e[dn]=o.current,us(e.nodeType===8?e.parentNode:e),gr(),o}for(;i=e.lastChild;)e.removeChild(i);if(typeof r=="function"){var l=r;r=function(){var u=rl(a);l.call(u)}}var a=of(e,0,!1,null,null,!1,!1,"",xh);return e._reactRootContainer=a,e[dn]=a.current,us(e.nodeType===8?e.parentNode:e),gr(function(){bl(t,a,n,r)}),a}function Pl(e,t,n,r,i){var s=n._reactRootContainer;if(s){var o=s;if(typeof i=="function"){var l=i;i=function(){var a=rl(o);l.call(a)}}bl(t,o,e,i)}else o=Sk(n,t,e,i,r);return rl(o)}Lg=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Li(t.pendingLanes);n!==0&&(Ac(t,n|1),at(t,Te()),!(re&6)&&(oi=Te()+500,Hn()))}break;case 13:gr(function(){var r=hn(e,1);if(r!==null){var i=Ze();zt(r,e,1,i)}}),lf(e,1)}};Pc=function(e){if(e.tag===13){var t=hn(e,134217728);if(t!==null){var n=Ze();zt(t,e,134217728,n)}lf(e,134217728)}};_g=function(e){if(e.tag===13){var t=_n(e),n=hn(e,t);if(n!==null){var r=Ze();zt(n,e,t,r)}lf(e,t)}};Og=function(){return se};jg=function(e,t){var n=se;try{return se=e,t()}finally{se=n}};nu=function(e,t,n){switch(t){case"input":if(qa(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var i=xl(r);if(!i)throw Error(R(90));pg(r),qa(r,i)}}}break;case"textarea":gg(e,n);break;case"select":t=n.value,t!=null&&Wr(e,!!n.multiple,t,!1)}};Cg=tf;Eg=gr;var Ck={usingClientEntryPoint:!1,Events:[Ms,Dr,xl,kg,Sg,tf]},Ai={findFiberByHostInstance:rr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Ek={bundleType:Ai.bundleType,version:Ai.version,rendererPackageName:Ai.rendererPackageName,rendererConfig:Ai.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:yn.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Ag(e),e===null?null:e.stateNode},findFiberByHostInstance:Ai.findFiberByHostInstance||kk,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var ro=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!ro.isDisabled&&ro.supportsFiber)try{pl=ro.inject(Ek),qt=ro}catch{}}xt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Ck;xt.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!uf(t))throw Error(R(200));return wk(e,t,null,n)};xt.createRoot=function(e,t){if(!uf(e))throw Error(R(299));var n=!1,r="",i=s0;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(i=t.onRecoverableError)),t=of(e,1,!1,null,null,n,!1,r,i),e[dn]=t.current,us(e.nodeType===8?e.parentNode:e),new af(t)};xt.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(R(188)):(e=Object.keys(e).join(","),Error(R(268,e)));return e=Ag(t),e=e===null?null:e.stateNode,e};xt.flushSync=function(e){return gr(e)};xt.hydrate=function(e,t,n){if(!Al(t))throw Error(R(200));return Pl(null,e,t,!0,n)};xt.hydrateRoot=function(e,t,n){if(!uf(e))throw Error(R(405));var r=n!=null&&n.hydratedSources||null,i=!1,s="",o=s0;if(n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),t=i0(t,null,e,1,n??null,i,!1,s,o),e[dn]=t.current,us(e),r)for(e=0;e<r.length;e++)n=r[e],i=n._getVersion,i=i(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,i]:t.mutableSourceEagerHydrationData.push(n,i);return new Tl(t)};xt.render=function(e,t,n){if(!Al(t))throw Error(R(200));return Pl(null,e,t,!1,n)};xt.unmountComponentAtNode=function(e){if(!Al(e))throw Error(R(40));return e._reactRootContainer?(gr(function(){Pl(null,null,e,!1,function(){e._reactRootContainer=null,e[dn]=null})}),!0):!1};xt.unstable_batchedUpdates=tf;xt.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!Al(n))throw Error(R(200));if(e==null||e._reactInternals===void 0)throw Error(R(38));return Pl(e,t,n,!1,r)};xt.version="18.3.1-next-f1338f8080-20240426";function o0(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o0)}catch(e){console.error(e)}}o0(),og.exports=xt;var bk=og.exports,vh=bk;Ua.createRoot=vh.createRoot,Ua.hydrateRoot=vh.hydrateRoot;const cf=I.createContext({});function ff(e){const t=I.useRef(null);return t.current===null&&(t.current=e()),t.current}const df=typeof window<"u",l0=df?I.useLayoutEffect:I.useEffect,Nl=I.createContext(null);function hf(e,t){e.indexOf(t)===-1&&e.push(t)}function pf(e,t){const n=e.indexOf(t);n>-1&&e.splice(n,1)}const mn=(e,t,n)=>n>t?t:n<e?e:n;let mf=()=>{};const gn={},a0=e=>/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e);function u0(e){return typeof e=="object"&&e!==null}const c0=e=>/^0[^.\s]+$/u.test(e);function gf(e){let t;return()=>(t===void 0&&(t=e()),t)}const Nt=e=>e,Tk=(e,t)=>n=>t(e(n)),Ds=(...e)=>e.reduce(Tk),xs=(e,t,n)=>{const r=t-e;return r===0?1:(n-e)/r};class yf{constructor(){this.subscriptions=[]}add(t){return hf(this.subscriptions,t),()=>pf(this.subscriptions,t)}notify(t,n,r){const i=this.subscriptions.length;if(i)if(i===1)this.subscriptions[0](t,n,r);else for(let s=0;s<i;s++){const o=this.subscriptions[s];o&&o(t,n,r)}}getSize(){return this.subscriptions.length}clear(){this.subscriptions.length=0}}const Qt=e=>e*1e3,At=e=>e/1e3;function f0(e,t){return t?e*(1e3/t):0}const d0=(e,t,n)=>(((1-3*n+3*t)*e+(3*n-6*t))*e+3*t)*e,Ak=1e-7,Pk=12;function Nk(e,t,n,r,i){let s,o,l=0;do o=t+(n-t)/2,s=d0(o,r,i)-e,s>0?n=o:t=o;while(Math.abs(s)>Ak&&++l<Pk);return o}function Ls(e,t,n,r){if(e===t&&n===r)return Nt;const i=s=>Nk(s,0,1,e,n);return s=>s===0||s===1?s:d0(i(s),t,r)}const h0=e=>t=>t<=.5?e(2*t)/2:(2-e(2*(1-t)))/2,p0=e=>t=>1-e(1-t),m0=Ls(.33,1.53,.69,.99),xf=p0(m0),g0=h0(xf),y0=e=>(e*=2)<1?.5*xf(e):.5*(2-Math.pow(2,-10*(e-1))),vf=e=>1-Math.sin(Math.acos(e)),x0=p0(vf),v0=h0(vf),Ik=Ls(.42,0,1,1),Mk=Ls(0,0,.58,1),w0=Ls(.42,0,.58,1),Rk=e=>Array.isArray(e)&&typeof e[0]!="number",k0=e=>Array.isArray(e)&&typeof e[0]=="number",Dk={linear:Nt,easeIn:Ik,easeInOut:w0,easeOut:Mk,circIn:vf,circInOut:v0,circOut:x0,backIn:xf,backInOut:g0,backOut:m0,anticipate:y0},Lk=e=>typeof e=="string",wh=e=>{if(k0(e)){mf(e.length===4);const[t,n,r,i]=e;return Ls(t,n,r,i)}else if(Lk(e))return Dk[e];return e},io=["setup","read","resolveKeyframes","preUpdate","update","preRender","render","postRender"];function _k(e,t){let n=new Set,r=new Set,i=!1,s=!1;const o=new WeakSet;let l={delta:0,timestamp:0,isProcessing:!1};function a(c){o.has(c)&&(u.schedule(c),e()),c(l)}const u={schedule:(c,f=!1,d=!1)=>{const m=d&&i?n:r;return f&&o.add(c),m.has(c)||m.add(c),c},cancel:c=>{r.delete(c),o.delete(c)},process:c=>{if(l=c,i){s=!0;return}i=!0,[n,r]=[r,n],n.forEach(a),n.clear(),i=!1,s&&(s=!1,u.process(c))}};return u}const Ok=40;function S0(e,t){let n=!1,r=!0;const i={delta:0,timestamp:0,isProcessing:!1},s=()=>n=!0,o=io.reduce((y,b)=>(y[b]=_k(s),y),{}),{setup:l,read:a,resolveKeyframes:u,preUpdate:c,update:f,preRender:d,render:h,postRender:m}=o,x=()=>{const y=gn.useManualTiming?i.timestamp:performance.now();n=!1,gn.useManualTiming||(i.delta=r?1e3/60:Math.max(Math.min(y-i.timestamp,Ok),1)),i.timestamp=y,i.isProcessing=!0,l.process(i),a.process(i),u.process(i),c.process(i),f.process(i),d.process(i),h.process(i),m.process(i),i.isProcessing=!1,n&&t&&(r=!1,e(x))},C=()=>{n=!0,r=!0,i.isProcessing||e(x)};return{schedule:io.reduce((y,b)=>{const T=o[b];return y[b]=(k,A=!1,P=!1)=>(n||C(),T.schedule(k,A,P)),y},{}),cancel:y=>{for(let b=0;b<io.length;b++)o[io[b]].cancel(y)},state:i,steps:o}}const{schedule:ge,cancel:Vn,state:ze,steps:da}=S0(typeof requestAnimationFrame<"u"?requestAnimationFrame:Nt,!0);let To;function jk(){To=void 0}const st={now:()=>(To===void 0&&st.set(ze.isProcessing||gn.useManualTiming?ze.timestamp:performance.now()),To),set:e=>{To=e,queueMicrotask(jk)}},C0=e=>t=>typeof t=="string"&&t.startsWith(e),wf=C0("--"),Fk=C0("var(--"),kf=e=>Fk(e)?zk.test(e.split("/*")[0].trim()):!1,zk=/var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu,hi={test:e=>typeof e=="number",parse:parseFloat,transform:e=>e},vs={...hi,transform:e=>mn(0,1,e)},so={...hi,default:1},Wi=e=>Math.round(e*1e5)/1e5,Sf=/-?(?:\d+(?:\.\d+)?|\.\d+)/gu;function Vk(e){return e==null}const Bk=/^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,Cf=(e,t)=>n=>!!(typeof n=="string"&&Bk.test(n)&&n.startsWith(e)||t&&!Vk(n)&&Object.prototype.hasOwnProperty.call(n,t)),E0=(e,t,n)=>r=>{if(typeof r!="string")return r;const[i,s,o,l]=r.match(Sf);return{[e]:parseFloat(i),[t]:parseFloat(s),[n]:parseFloat(o),alpha:l!==void 0?parseFloat(l):1}},Uk=e=>mn(0,255,e),ha={...hi,transform:e=>Math.round(Uk(e))},or={test:Cf("rgb","red"),parse:E0("red","green","blue"),transform:({red:e,green:t,blue:n,alpha:r=1})=>"rgba("+ha.transform(e)+", "+ha.transform(t)+", "+ha.transform(n)+", "+Wi(vs.transform(r))+")"};function $k(e){let t="",n="",r="",i="";return e.length>5?(t=e.substring(1,3),n=e.substring(3,5),r=e.substring(5,7),i=e.substring(7,9)):(t=e.substring(1,2),n=e.substring(2,3),r=e.substring(3,4),i=e.substring(4,5),t+=t,n+=n,r+=r,i+=i),{red:parseInt(t,16),green:parseInt(n,16),blue:parseInt(r,16),alpha:i?parseInt(i,16)/255:1}}const _u={test:Cf("#"),parse:$k,transform:or.transform},_s=e=>({test:t=>typeof t=="string"&&t.endsWith(e)&&t.split(" ").length===1,parse:parseFloat,transform:t=>`${t}${e}`}),kn=_s("deg"),Zt=_s("%"),$=_s("px"),Hk=_s("vh"),Gk=_s("vw"),kh={...Zt,parse:e=>Zt.parse(e)/100,transform:e=>Zt.transform(e*100)},Vr={test:Cf("hsl","hue"),parse:E0("hue","saturation","lightness"),transform:({hue:e,saturation:t,lightness:n,alpha:r=1})=>"hsla("+Math.round(e)+", "+Zt.transform(Wi(t))+", "+Zt.transform(Wi(n))+", "+Wi(vs.transform(r))+")"},Ne={test:e=>or.test(e)||_u.test(e)||Vr.test(e),parse:e=>or.test(e)?or.parse(e):Vr.test(e)?Vr.parse(e):_u.parse(e),transform:e=>typeof e=="string"?e:e.hasOwnProperty("red")?or.transform(e):Vr.transform(e),getAnimatableNone:e=>{const t=Ne.parse(e);return t.alpha=0,Ne.transform(t)}},Wk=/(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;function Kk(e){var t,n;return isNaN(e)&&typeof e=="string"&&(((t=e.match(Sf))==null?void 0:t.length)||0)+(((n=e.match(Wk))==null?void 0:n.length)||0)>0}const b0="number",T0="color",Yk="var",qk="var(",Sh="${}",Xk=/var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;function ws(e){const t=e.toString(),n=[],r={color:[],number:[],var:[]},i=[];let s=0;const l=t.replace(Xk,a=>(Ne.test(a)?(r.color.push(s),i.push(T0),n.push(Ne.parse(a))):a.startsWith(qk)?(r.var.push(s),i.push(Yk),n.push(a)):(r.number.push(s),i.push(b0),n.push(parseFloat(a))),++s,Sh)).split(Sh);return{values:n,split:l,indexes:r,types:i}}function A0(e){return ws(e).values}function P0(e){const{split:t,types:n}=ws(e),r=t.length;return i=>{let s="";for(let o=0;o<r;o++)if(s+=t[o],i[o]!==void 0){const l=n[o];l===b0?s+=Wi(i[o]):l===T0?s+=Ne.transform(i[o]):s+=i[o]}return s}}const Qk=e=>typeof e=="number"?0:Ne.test(e)?Ne.getAnimatableNone(e):e;function Zk(e){const t=A0(e);return P0(e)(t.map(Qk))}const Bn={test:Kk,parse:A0,createTransformer:P0,getAnimatableNone:Zk};function pa(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*(2/3-n)*6:e}function Jk({hue:e,saturation:t,lightness:n,alpha:r}){e/=360,t/=100,n/=100;let i=0,s=0,o=0;if(!t)i=s=o=n;else{const l=n<.5?n*(1+t):n+t-n*t,a=2*n-l;i=pa(a,l,e+1/3),s=pa(a,l,e),o=pa(a,l,e-1/3)}return{red:Math.round(i*255),green:Math.round(s*255),blue:Math.round(o*255),alpha:r}}function il(e,t){return n=>n>0?t:e}const ve=(e,t,n)=>e+(t-e)*n,ma=(e,t,n)=>{const r=e*e,i=n*(t*t-r)+r;return i<0?0:Math.sqrt(i)},eS=[_u,or,Vr],tS=e=>eS.find(t=>t.test(e));function Ch(e){const t=tS(e);if(!t)return!1;let n=t.parse(e);return t===Vr&&(n=Jk(n)),n}const Eh=(e,t)=>{const n=Ch(e),r=Ch(t);if(!n||!r)return il(e,t);const i={...n};return s=>(i.red=ma(n.red,r.red,s),i.green=ma(n.green,r.green,s),i.blue=ma(n.blue,r.blue,s),i.alpha=ve(n.alpha,r.alpha,s),or.transform(i))},Ou=new Set(["none","hidden"]);function nS(e,t){return Ou.has(e)?n=>n<=0?e:t:n=>n>=1?t:e}function rS(e,t){return n=>ve(e,t,n)}function Ef(e){return typeof e=="number"?rS:typeof e=="string"?kf(e)?il:Ne.test(e)?Eh:oS:Array.isArray(e)?N0:typeof e=="object"?Ne.test(e)?Eh:iS:il}function N0(e,t){const n=[...e],r=n.length,i=e.map((s,o)=>Ef(s)(s,t[o]));return s=>{for(let o=0;o<r;o++)n[o]=i[o](s);return n}}function iS(e,t){const n={...e,...t},r={};for(const i in n)e[i]!==void 0&&t[i]!==void 0&&(r[i]=Ef(e[i])(e[i],t[i]));return i=>{for(const s in r)n[s]=r[s](i);return n}}function sS(e,t){const n=[],r={color:0,var:0,number:0};for(let i=0;i<t.values.length;i++){const s=t.types[i],o=e.indexes[s][r[s]],l=e.values[o]??0;n[i]=l,r[s]++}return n}const oS=(e,t)=>{const n=Bn.createTransformer(t),r=ws(e),i=ws(t);return r.indexes.var.length===i.indexes.var.length&&r.indexes.color.length===i.indexes.color.length&&r.indexes.number.length>=i.indexes.number.length?Ou.has(e)&&!i.values.length||Ou.has(t)&&!r.values.length?nS(e,t):Ds(N0(sS(r,i),i.values),n):il(e,t)};function I0(e,t,n){return typeof e=="number"&&typeof t=="number"&&typeof n=="number"?ve(e,t,n):Ef(e)(e,t)}const lS=e=>{const t=({timestamp:n})=>e(n);return{start:(n=!0)=>ge.update(t,n),stop:()=>Vn(t),now:()=>ze.isProcessing?ze.timestamp:st.now()}},M0=(e,t,n=10)=>{let r="";const i=Math.max(Math.round(t/n),2);for(let s=0;s<i;s++)r+=Math.round(e(s/(i-1))*1e4)/1e4+", ";return`linear(${r.substring(0,r.length-2)})`},sl=2e4;function bf(e){let t=0;const n=50;let r=e.next(t);for(;!r.done&&t<sl;)t+=n,r=e.next(t);return t>=sl?1/0:t}function aS(e,t=100,n){const r=n({...e,keyframes:[0,t]}),i=Math.min(bf(r),sl);return{type:"keyframes",ease:s=>r.next(i*s).value/t,duration:At(i)}}const uS=5;function R0(e,t,n){const r=Math.max(t-uS,0);return f0(n-e(r),t-r)}const Se={stiffness:100,damping:10,mass:1,velocity:0,duration:800,bounce:.3,visualDuration:.3,restSpeed:{granular:.01,default:2},restDelta:{granular:.005,default:.5},minDuration:.01,maxDuration:10,minDamping:.05,maxDamping:1},ga=.001;function cS({duration:e=Se.duration,bounce:t=Se.bounce,velocity:n=Se.velocity,mass:r=Se.mass}){let i,s,o=1-t;o=mn(Se.minDamping,Se.maxDamping,o),e=mn(Se.minDuration,Se.maxDuration,At(e)),o<1?(i=u=>{const c=u*o,f=c*e,d=c-n,h=ju(u,o),m=Math.exp(-f);return ga-d/h*m},s=u=>{const f=u*o*e,d=f*n+n,h=Math.pow(o,2)*Math.pow(u,2)*e,m=Math.exp(-f),x=ju(Math.pow(u,2),o);return(-i(u)+ga>0?-1:1)*((d-h)*m)/x}):(i=u=>{const c=Math.exp(-u*e),f=(u-n)*e+1;return-ga+c*f},s=u=>{const c=Math.exp(-u*e),f=(n-u)*(e*e);return c*f});const l=5/e,a=dS(i,s,l);if(e=Qt(e),isNaN(a))return{stiffness:Se.stiffness,damping:Se.damping,duration:e};{const u=Math.pow(a,2)*r;return{stiffness:u,damping:o*2*Math.sqrt(r*u),duration:e}}}const fS=12;function dS(e,t,n){let r=n;for(let i=1;i<fS;i++)r=r-e(r)/t(r);return r}function ju(e,t){return e*Math.sqrt(1-t*t)}const hS=["duration","bounce"],pS=["stiffness","damping","mass"];function bh(e,t){return t.some(n=>e[n]!==void 0)}function mS(e){let t={velocity:Se.velocity,stiffness:Se.stiffness,damping:Se.damping,mass:Se.mass,isResolvedFromDuration:!1,...e};if(!bh(e,pS)&&bh(e,hS))if(e.visualDuration){const n=e.visualDuration,r=2*Math.PI/(n*1.2),i=r*r,s=2*mn(.05,1,1-(e.bounce||0))*Math.sqrt(i);t={...t,mass:Se.mass,stiffness:i,damping:s}}else{const n=cS(e);t={...t,...n,mass:Se.mass},t.isResolvedFromDuration=!0}return t}function ol(e=Se.visualDuration,t=Se.bounce){const n=typeof e!="object"?{visualDuration:e,keyframes:[0,1],bounce:t}:e;let{restSpeed:r,restDelta:i}=n;const s=n.keyframes[0],o=n.keyframes[n.keyframes.length-1],l={done:!1,value:s},{stiffness:a,damping:u,mass:c,duration:f,velocity:d,isResolvedFromDuration:h}=mS({...n,velocity:-At(n.velocity||0)}),m=d||0,x=u/(2*Math.sqrt(a*c)),C=o-s,p=At(Math.sqrt(a/c)),g=Math.abs(C)<5;r||(r=g?Se.restSpeed.granular:Se.restSpeed.default),i||(i=g?Se.restDelta.granular:Se.restDelta.default);let y;if(x<1){const T=ju(p,x);y=k=>{const A=Math.exp(-x*p*k);return o-A*((m+x*p*C)/T*Math.sin(T*k)+C*Math.cos(T*k))}}else if(x===1)y=T=>o-Math.exp(-p*T)*(C+(m+p*C)*T);else{const T=p*Math.sqrt(x*x-1);y=k=>{const A=Math.exp(-x*p*k),P=Math.min(T*k,300);return o-A*((m+x*p*C)*Math.sinh(P)+T*C*Math.cosh(P))/T}}const b={calculatedDuration:h&&f||null,next:T=>{const k=y(T);if(h)l.done=T>=f;else{let A=T===0?m:0;x<1&&(A=T===0?Qt(m):R0(y,T,k));const P=Math.abs(A)<=r,O=Math.abs(o-k)<=i;l.done=P&&O}return l.value=l.done?o:k,l},toString:()=>{const T=Math.min(bf(b),sl),k=M0(A=>b.next(T*A).value,T,30);return T+"ms "+k},toTransition:()=>{}};return b}ol.applyToOptions=e=>{const t=aS(e,100,ol);return e.ease=t.ease,e.duration=Qt(t.duration),e.type="keyframes",e};function Fu({keyframes:e,velocity:t=0,power:n=.8,timeConstant:r=325,bounceDamping:i=10,bounceStiffness:s=500,modifyTarget:o,min:l,max:a,restDelta:u=.5,restSpeed:c}){const f=e[0],d={done:!1,value:f},h=P=>l!==void 0&&P<l||a!==void 0&&P>a,m=P=>l===void 0?a:a===void 0||Math.abs(l-P)<Math.abs(a-P)?l:a;let x=n*t;const C=f+x,p=o===void 0?C:o(C);p!==C&&(x=p-f);const g=P=>-x*Math.exp(-P/r),y=P=>p+g(P),b=P=>{const O=g(P),E=y(P);d.done=Math.abs(O)<=u,d.value=d.done?p:E};let T,k;const A=P=>{h(d.value)&&(T=P,k=ol({keyframes:[d.value,m(d.value)],velocity:R0(y,P,d.value),damping:i,stiffness:s,restDelta:u,restSpeed:c}))};return A(0),{calculatedDuration:null,next:P=>{let O=!1;return!k&&T===void 0&&(O=!0,b(P),A(P)),T!==void 0&&P>=T?k.next(P-T):(!O&&b(P),d)}}}function gS(e,t,n){const r=[],i=n||gn.mix||I0,s=e.length-1;for(let o=0;o<s;o++){let l=i(e[o],e[o+1]);if(t){const a=Array.isArray(t)?t[o]||Nt:t;l=Ds(a,l)}r.push(l)}return r}function yS(e,t,{clamp:n=!0,ease:r,mixer:i}={}){const s=e.length;if(mf(s===t.length),s===1)return()=>t[0];if(s===2&&t[0]===t[1])return()=>t[1];const o=e[0]===e[1];e[0]>e[s-1]&&(e=[...e].reverse(),t=[...t].reverse());const l=gS(t,r,i),a=l.length,u=c=>{if(o&&c<e[0])return t[0];let f=0;if(a>1)for(;f<e.length-2&&!(c<e[f+1]);f++);const d=xs(e[f],e[f+1],c);return l[f](d)};return n?c=>u(mn(e[0],e[s-1],c)):u}function xS(e,t){const n=e[e.length-1];for(let r=1;r<=t;r++){const i=xs(0,t,r);e.push(ve(n,1,i))}}function vS(e){const t=[0];return xS(t,e.length-1),t}function wS(e,t){return e.map(n=>n*t)}function kS(e,t){return e.map(()=>t||w0).splice(0,e.length-1)}function Ki({duration:e=300,keyframes:t,times:n,ease:r="easeInOut"}){const i=Rk(r)?r.map(wh):wh(r),s={done:!1,value:t[0]},o=wS(n&&n.length===t.length?n:vS(t),e),l=yS(o,t,{ease:Array.isArray(i)?i:kS(t,i)});return{calculatedDuration:e,next:a=>(s.value=l(a),s.done=a>=e,s)}}const SS=e=>e!==null;function Tf(e,{repeat:t,repeatType:n="loop"},r,i=1){const s=e.filter(SS),l=i<0||t&&n!=="loop"&&t%2===1?0:s.length-1;return!l||r===void 0?s[l]:r}const CS={decay:Fu,inertia:Fu,tween:Ki,keyframes:Ki,spring:ol};function D0(e){typeof e.type=="string"&&(e.type=CS[e.type])}class Af{constructor(){this.updateFinished()}get finished(){return this._finished}updateFinished(){this._finished=new Promise(t=>{this.resolve=t})}notifyFinished(){this.resolve()}then(t,n){return this.finished.then(t,n)}}const ES=e=>e/100;class Pf extends Af{constructor(t){super(),this.state="idle",this.startTime=null,this.isStopped=!1,this.currentTime=0,this.holdTime=null,this.playbackSpeed=1,this.stop=()=>{var r,i;const{motionValue:n}=this.options;n&&n.updatedAt!==st.now()&&this.tick(st.now()),this.isStopped=!0,this.state!=="idle"&&(this.teardown(),(i=(r=this.options).onStop)==null||i.call(r))},this.options=t,this.initAnimation(),this.play(),t.autoplay===!1&&this.pause()}initAnimation(){const{options:t}=this;D0(t);const{type:n=Ki,repeat:r=0,repeatDelay:i=0,repeatType:s,velocity:o=0}=t;let{keyframes:l}=t;const a=n||Ki;a!==Ki&&typeof l[0]!="number"&&(this.mixKeyframes=Ds(ES,I0(l[0],l[1])),l=[0,100]);const u=a({...t,keyframes:l});s==="mirror"&&(this.mirroredGenerator=a({...t,keyframes:[...l].reverse(),velocity:-o})),u.calculatedDuration===null&&(u.calculatedDuration=bf(u));const{calculatedDuration:c}=u;this.calculatedDuration=c,this.resolvedDuration=c+i,this.totalDuration=this.resolvedDuration*(r+1)-i,this.generator=u}updateTime(t){const n=Math.round(t-this.startTime)*this.playbackSpeed;this.holdTime!==null?this.currentTime=this.holdTime:this.currentTime=n}tick(t,n=!1){const{generator:r,totalDuration:i,mixKeyframes:s,mirroredGenerator:o,resolvedDuration:l,calculatedDuration:a}=this;if(this.startTime===null)return r.next(0);const{delay:u=0,keyframes:c,repeat:f,repeatType:d,repeatDelay:h,type:m,onUpdate:x,finalKeyframe:C}=this.options;this.speed>0?this.startTime=Math.min(this.startTime,t):this.speed<0&&(this.startTime=Math.min(t-i/this.speed,this.startTime)),n?this.currentTime=t:this.updateTime(t);const p=this.currentTime-u*(this.playbackSpeed>=0?1:-1),g=this.playbackSpeed>=0?p<0:p>i;this.currentTime=Math.max(p,0),this.state==="finished"&&this.holdTime===null&&(this.currentTime=i);let y=this.currentTime,b=r;if(f){const P=Math.min(this.currentTime,i)/l;let O=Math.floor(P),E=P%1;!E&&P>=1&&(E=1),E===1&&O--,O=Math.min(O,f+1),!!(O%2)&&(d==="reverse"?(E=1-E,h&&(E-=h/l)):d==="mirror"&&(b=o)),y=mn(0,1,E)*l}const T=g?{done:!1,value:c[0]}:b.next(y);s&&(T.value=s(T.value));let{done:k}=T;!g&&a!==null&&(k=this.playbackSpeed>=0?this.currentTime>=i:this.currentTime<=0);const A=this.holdTime===null&&(this.state==="finished"||this.state==="running"&&k);return A&&m!==Fu&&(T.value=Tf(c,this.options,C,this.speed)),x&&x(T.value),A&&this.finish(),T}then(t,n){return this.finished.then(t,n)}get duration(){return At(this.calculatedDuration)}get iterationDuration(){const{delay:t=0}=this.options||{};return this.duration+At(t)}get time(){return At(this.currentTime)}set time(t){var n;t=Qt(t),this.currentTime=t,this.startTime===null||this.holdTime!==null||this.playbackSpeed===0?this.holdTime=t:this.driver&&(this.startTime=this.driver.now()-t/this.playbackSpeed),(n=this.driver)==null||n.start(!1)}get speed(){return this.playbackSpeed}set speed(t){this.updateTime(st.now());const n=this.playbackSpeed!==t;this.playbackSpeed=t,n&&(this.time=At(this.currentTime))}play(){var i,s;if(this.isStopped)return;const{driver:t=lS,startTime:n}=this.options;this.driver||(this.driver=t(o=>this.tick(o))),(s=(i=this.options).onPlay)==null||s.call(i);const r=this.driver.now();this.state==="finished"?(this.updateFinished(),this.startTime=r):this.holdTime!==null?this.startTime=r-this.holdTime:this.startTime||(this.startTime=n??r),this.state==="finished"&&this.speed<0&&(this.startTime+=this.calculatedDuration),this.holdTime=null,this.state="running",this.driver.start()}pause(){this.state="paused",this.updateTime(st.now()),this.holdTime=this.currentTime}complete(){this.state!=="running"&&this.play(),this.state="finished",this.holdTime=null}finish(){var t,n;this.notifyFinished(),this.teardown(),this.state="finished",(n=(t=this.options).onComplete)==null||n.call(t)}cancel(){var t,n;this.holdTime=null,this.startTime=0,this.tick(0),this.teardown(),(n=(t=this.options).onCancel)==null||n.call(t)}teardown(){this.state="idle",this.stopDriver(),this.startTime=this.holdTime=null}stopDriver(){this.driver&&(this.driver.stop(),this.driver=void 0)}sample(t){return this.startTime=0,this.tick(t,!0)}attachTimeline(t){var n;return this.options.allowFlatten&&(this.options.type="keyframes",this.options.ease="linear",this.initAnimation()),(n=this.driver)==null||n.stop(),t.observe(this)}}function bS(e){for(let t=1;t<e.length;t++)e[t]??(e[t]=e[t-1])}const lr=e=>e*180/Math.PI,zu=e=>{const t=lr(Math.atan2(e[1],e[0]));return Vu(t)},TS={x:4,y:5,translateX:4,translateY:5,scaleX:0,scaleY:3,scale:e=>(Math.abs(e[0])+Math.abs(e[3]))/2,rotate:zu,rotateZ:zu,skewX:e=>lr(Math.atan(e[1])),skewY:e=>lr(Math.atan(e[2])),skew:e=>(Math.abs(e[1])+Math.abs(e[2]))/2},Vu=e=>(e=e%360,e<0&&(e+=360),e),Th=zu,Ah=e=>Math.sqrt(e[0]*e[0]+e[1]*e[1]),Ph=e=>Math.sqrt(e[4]*e[4]+e[5]*e[5]),AS={x:12,y:13,z:14,translateX:12,translateY:13,translateZ:14,scaleX:Ah,scaleY:Ph,scale:e=>(Ah(e)+Ph(e))/2,rotateX:e=>Vu(lr(Math.atan2(e[6],e[5]))),rotateY:e=>Vu(lr(Math.atan2(-e[2],e[0]))),rotateZ:Th,rotate:Th,skewX:e=>lr(Math.atan(e[4])),skewY:e=>lr(Math.atan(e[1])),skew:e=>(Math.abs(e[1])+Math.abs(e[4]))/2};function Bu(e){return e.includes("scale")?1:0}function Uu(e,t){if(!e||e==="none")return Bu(t);const n=e.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);let r,i;if(n)r=AS,i=n;else{const l=e.match(/^matrix\(([-\d.e\s,]+)\)$/u);r=TS,i=l}if(!i)return Bu(t);const s=r[t],o=i[1].split(",").map(NS);return typeof s=="function"?s(o):o[s]}const PS=(e,t)=>{const{transform:n="none"}=getComputedStyle(e);return Uu(n,t)};function NS(e){return parseFloat(e.trim())}const pi=["transformPerspective","x","y","z","translateX","translateY","translateZ","scale","scaleX","scaleY","rotate","rotateX","rotateY","rotateZ","skew","skewX","skewY"],mi=new Set(pi),Nh=e=>e===hi||e===$,IS=new Set(["x","y","z"]),MS=pi.filter(e=>!IS.has(e));function RS(e){const t=[];return MS.forEach(n=>{const r=e.getValue(n);r!==void 0&&(t.push([n,r.get()]),r.set(n.startsWith("scale")?1:0))}),t}const cr={width:({x:e},{paddingLeft:t="0",paddingRight:n="0"})=>e.max-e.min-parseFloat(t)-parseFloat(n),height:({y:e},{paddingTop:t="0",paddingBottom:n="0"})=>e.max-e.min-parseFloat(t)-parseFloat(n),top:(e,{top:t})=>parseFloat(t),left:(e,{left:t})=>parseFloat(t),bottom:({y:e},{top:t})=>parseFloat(t)+(e.max-e.min),right:({x:e},{left:t})=>parseFloat(t)+(e.max-e.min),x:(e,{transform:t})=>Uu(t,"x"),y:(e,{transform:t})=>Uu(t,"y")};cr.translateX=cr.x;cr.translateY=cr.y;const fr=new Set;let $u=!1,Hu=!1,Gu=!1;function L0(){if(Hu){const e=Array.from(fr).filter(r=>r.needsMeasurement),t=new Set(e.map(r=>r.element)),n=new Map;t.forEach(r=>{const i=RS(r);i.length&&(n.set(r,i),r.render())}),e.forEach(r=>r.measureInitialState()),t.forEach(r=>{r.render();const i=n.get(r);i&&i.forEach(([s,o])=>{var l;(l=r.getValue(s))==null||l.set(o)})}),e.forEach(r=>r.measureEndState()),e.forEach(r=>{r.suspendedScrollY!==void 0&&window.scrollTo(0,r.suspendedScrollY)})}Hu=!1,$u=!1,fr.forEach(e=>e.complete(Gu)),fr.clear()}function _0(){fr.forEach(e=>{e.readKeyframes(),e.needsMeasurement&&(Hu=!0)})}function DS(){Gu=!0,_0(),L0(),Gu=!1}class Nf{constructor(t,n,r,i,s,o=!1){this.state="pending",this.isAsync=!1,this.needsMeasurement=!1,this.unresolvedKeyframes=[...t],this.onComplete=n,this.name=r,this.motionValue=i,this.element=s,this.isAsync=o}scheduleResolve(){this.state="scheduled",this.isAsync?(fr.add(this),$u||($u=!0,ge.read(_0),ge.resolveKeyframes(L0))):(this.readKeyframes(),this.complete())}readKeyframes(){const{unresolvedKeyframes:t,name:n,element:r,motionValue:i}=this;if(t[0]===null){const s=i==null?void 0:i.get(),o=t[t.length-1];if(s!==void 0)t[0]=s;else if(r&&n){const l=r.readValue(n,o);l!=null&&(t[0]=l)}t[0]===void 0&&(t[0]=o),i&&s===void 0&&i.set(t[0])}bS(t)}setFinalKeyframe(){}measureInitialState(){}renderEndStyles(){}measureEndState(){}complete(t=!1){this.state="complete",this.onComplete(this.unresolvedKeyframes,this.finalKeyframe,t),fr.delete(this)}cancel(){this.state==="scheduled"&&(fr.delete(this),this.state="pending")}resume(){this.state==="pending"&&this.scheduleResolve()}}const LS=e=>e.startsWith("--");function _S(e,t,n){LS(t)?e.style.setProperty(t,n):e.style[t]=n}const OS=gf(()=>window.ScrollTimeline!==void 0),jS={};function FS(e,t){const n=gf(e);return()=>jS[t]??n()}const O0=FS(()=>{try{document.createElement("div").animate({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0},"linearEasing"),Oi=([e,t,n,r])=>`cubic-bezier(${e}, ${t}, ${n}, ${r})`,Ih={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",circIn:Oi([0,.65,.55,1]),circOut:Oi([.55,0,1,.45]),backIn:Oi([.31,.01,.66,-.59]),backOut:Oi([.33,1.53,.69,.99])};function j0(e,t){if(e)return typeof e=="function"?O0()?M0(e,t):"ease-out":k0(e)?Oi(e):Array.isArray(e)?e.map(n=>j0(n,t)||Ih.easeOut):Ih[e]}function zS(e,t,n,{delay:r=0,duration:i=300,repeat:s=0,repeatType:o="loop",ease:l="easeOut",times:a}={},u=void 0){const c={[t]:n};a&&(c.offset=a);const f=j0(l,i);Array.isArray(f)&&(c.easing=f);const d={delay:r,duration:i,easing:Array.isArray(f)?"linear":f,fill:"both",iterations:s+1,direction:o==="reverse"?"alternate":"normal"};return u&&(d.pseudoElement=u),e.animate(c,d)}function F0(e){return typeof e=="function"&&"applyToOptions"in e}function VS({type:e,...t}){return F0(e)&&O0()?e.applyToOptions(t):(t.duration??(t.duration=300),t.ease??(t.ease="easeOut"),t)}class BS extends Af{constructor(t){if(super(),this.finishedTime=null,this.isStopped=!1,!t)return;const{element:n,name:r,keyframes:i,pseudoElement:s,allowFlatten:o=!1,finalKeyframe:l,onComplete:a}=t;this.isPseudoElement=!!s,this.allowFlatten=o,this.options=t,mf(typeof t.type!="string");const u=VS(t);this.animation=zS(n,r,i,u,s),u.autoplay===!1&&this.animation.pause(),this.animation.onfinish=()=>{if(this.finishedTime=this.time,!s){const c=Tf(i,this.options,l,this.speed);this.updateMotionValue?this.updateMotionValue(c):_S(n,r,c),this.animation.cancel()}a==null||a(),this.notifyFinished()}}play(){this.isStopped||(this.animation.play(),this.state==="finished"&&this.updateFinished())}pause(){this.animation.pause()}complete(){var t,n;(n=(t=this.animation).finish)==null||n.call(t)}cancel(){try{this.animation.cancel()}catch{}}stop(){if(this.isStopped)return;this.isStopped=!0;const{state:t}=this;t==="idle"||t==="finished"||(this.updateMotionValue?this.updateMotionValue():this.commitStyles(),this.isPseudoElement||this.cancel())}commitStyles(){var t,n;this.isPseudoElement||(n=(t=this.animation).commitStyles)==null||n.call(t)}get duration(){var n,r;const t=((r=(n=this.animation.effect)==null?void 0:n.getComputedTiming)==null?void 0:r.call(n).duration)||0;return At(Number(t))}get iterationDuration(){const{delay:t=0}=this.options||{};return this.duration+At(t)}get time(){return At(Number(this.animation.currentTime)||0)}set time(t){this.finishedTime=null,this.animation.currentTime=Qt(t)}get speed(){return this.animation.playbackRate}set speed(t){t<0&&(this.finishedTime=null),this.animation.playbackRate=t}get state(){return this.finishedTime!==null?"finished":this.animation.playState}get startTime(){return Number(this.animation.startTime)}set startTime(t){this.animation.startTime=t}attachTimeline({timeline:t,observe:n}){var r;return this.allowFlatten&&((r=this.animation.effect)==null||r.updateTiming({easing:"linear"})),this.animation.onfinish=null,t&&OS()?(this.animation.timeline=t,Nt):n(this)}}const z0={anticipate:y0,backInOut:g0,circInOut:v0};function US(e){return e in z0}function $S(e){typeof e.ease=="string"&&US(e.ease)&&(e.ease=z0[e.ease])}const Mh=10;class HS extends BS{constructor(t){$S(t),D0(t),super(t),t.startTime&&(this.startTime=t.startTime),this.options=t}updateMotionValue(t){const{motionValue:n,onUpdate:r,onComplete:i,element:s,...o}=this.options;if(!n)return;if(t!==void 0){n.set(t);return}const l=new Pf({...o,autoplay:!1}),a=Qt(this.finishedTime??this.time);n.setWithVelocity(l.sample(a-Mh).value,l.sample(a).value,Mh),l.stop()}}const Rh=(e,t)=>t==="zIndex"?!1:!!(typeof e=="number"||Array.isArray(e)||typeof e=="string"&&(Bn.test(e)||e==="0")&&!e.startsWith("url("));function GS(e){const t=e[0];if(e.length===1)return!0;for(let n=0;n<e.length;n++)if(e[n]!==t)return!0}function WS(e,t,n,r){const i=e[0];if(i===null)return!1;if(t==="display"||t==="visibility")return!0;const s=e[e.length-1],o=Rh(i,t),l=Rh(s,t);return!o||!l?!1:GS(e)||(n==="spring"||F0(n))&&r}function Wu(e){e.duration=0,e.type="keyframes"}const KS=new Set(["opacity","clipPath","filter","transform"]),YS=gf(()=>Object.hasOwnProperty.call(Element.prototype,"animate"));function qS(e){var c;const{motionValue:t,name:n,repeatDelay:r,repeatType:i,damping:s,type:o}=e;if(!(((c=t==null?void 0:t.owner)==null?void 0:c.current)instanceof HTMLElement))return!1;const{onUpdate:a,transformTemplate:u}=t.owner.getProps();return YS()&&n&&KS.has(n)&&(n!=="transform"||!u)&&!a&&!r&&i!=="mirror"&&s!==0&&o!=="inertia"}const XS=40;class QS extends Af{constructor({autoplay:t=!0,delay:n=0,type:r="keyframes",repeat:i=0,repeatDelay:s=0,repeatType:o="loop",keyframes:l,name:a,motionValue:u,element:c,...f}){var m;super(),this.stop=()=>{var x,C;this._animation&&(this._animation.stop(),(x=this.stopTimeline)==null||x.call(this)),(C=this.keyframeResolver)==null||C.cancel()},this.createdAt=st.now();const d={autoplay:t,delay:n,type:r,repeat:i,repeatDelay:s,repeatType:o,name:a,motionValue:u,element:c,...f},h=(c==null?void 0:c.KeyframeResolver)||Nf;this.keyframeResolver=new h(l,(x,C,p)=>this.onKeyframesResolved(x,C,d,!p),a,u,c),(m=this.keyframeResolver)==null||m.scheduleResolve()}onKeyframesResolved(t,n,r,i){this.keyframeResolver=void 0;const{name:s,type:o,velocity:l,delay:a,isHandoff:u,onUpdate:c}=r;this.resolvedAt=st.now(),WS(t,s,o,l)||((gn.instantAnimations||!a)&&(c==null||c(Tf(t,r,n))),t[0]=t[t.length-1],Wu(r),r.repeat=0);const d={startTime:i?this.resolvedAt?this.resolvedAt-this.createdAt>XS?this.resolvedAt:this.createdAt:this.createdAt:void 0,finalKeyframe:n,...r,keyframes:t},h=!u&&qS(d)?new HS({...d,element:d.motionValue.owner.current}):new Pf(d);h.finished.then(()=>this.notifyFinished()).catch(Nt),this.pendingTimeline&&(this.stopTimeline=h.attachTimeline(this.pendingTimeline),this.pendingTimeline=void 0),this._animation=h}get finished(){return this._animation?this.animation.finished:this._finished}then(t,n){return this.finished.finally(t).then(()=>{})}get animation(){var t;return this._animation||((t=this.keyframeResolver)==null||t.resume(),DS()),this._animation}get duration(){return this.animation.duration}get iterationDuration(){return this.animation.iterationDuration}get time(){return this.animation.time}set time(t){this.animation.time=t}get speed(){return this.animation.speed}get state(){return this.animation.state}set speed(t){this.animation.speed=t}get startTime(){return this.animation.startTime}attachTimeline(t){return this._animation?this.stopTimeline=this.animation.attachTimeline(t):this.pendingTimeline=t,()=>this.stop()}play(){this.animation.play()}pause(){this.animation.pause()}complete(){this.animation.complete()}cancel(){var t;this._animation&&this.animation.cancel(),(t=this.keyframeResolver)==null||t.cancel()}}const ZS=/^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;function JS(e){const t=ZS.exec(e);if(!t)return[,];const[,n,r,i]=t;return[`--${n??r}`,i]}function V0(e,t,n=1){const[r,i]=JS(e);if(!r)return;const s=window.getComputedStyle(t).getPropertyValue(r);if(s){const o=s.trim();return a0(o)?parseFloat(o):o}return kf(i)?V0(i,t,n+1):i}function If(e,t){return(e==null?void 0:e[t])??(e==null?void 0:e.default)??e}const B0=new Set(["width","height","top","left","right","bottom",...pi]),e2={test:e=>e==="auto",parse:e=>e},U0=e=>t=>t.test(e),$0=[hi,$,Zt,kn,Gk,Hk,e2],Dh=e=>$0.find(U0(e));function t2(e){return typeof e=="number"?e===0:e!==null?e==="none"||e==="0"||c0(e):!0}const n2=new Set(["brightness","contrast","saturate","opacity"]);function r2(e){const[t,n]=e.slice(0,-1).split("(");if(t==="drop-shadow")return e;const[r]=n.match(Sf)||[];if(!r)return e;const i=n.replace(r,"");let s=n2.has(t)?1:0;return r!==n&&(s*=100),t+"("+s+i+")"}const i2=/\b([a-z-]*)\(.*?\)/gu,Ku={...Bn,getAnimatableNone:e=>{const t=e.match(i2);return t?t.map(r2).join(" "):e}},Lh={...hi,transform:Math.round},s2={rotate:kn,rotateX:kn,rotateY:kn,rotateZ:kn,scale:so,scaleX:so,scaleY:so,scaleZ:so,skew:kn,skewX:kn,skewY:kn,distance:$,translateX:$,translateY:$,translateZ:$,x:$,y:$,z:$,perspective:$,transformPerspective:$,opacity:vs,originX:kh,originY:kh,originZ:$},Mf={borderWidth:$,borderTopWidth:$,borderRightWidth:$,borderBottomWidth:$,borderLeftWidth:$,borderRadius:$,radius:$,borderTopLeftRadius:$,borderTopRightRadius:$,borderBottomRightRadius:$,borderBottomLeftRadius:$,width:$,maxWidth:$,height:$,maxHeight:$,top:$,right:$,bottom:$,left:$,padding:$,paddingTop:$,paddingRight:$,paddingBottom:$,paddingLeft:$,margin:$,marginTop:$,marginRight:$,marginBottom:$,marginLeft:$,backgroundPositionX:$,backgroundPositionY:$,...s2,zIndex:Lh,fillOpacity:vs,strokeOpacity:vs,numOctaves:Lh},o2={...Mf,color:Ne,backgroundColor:Ne,outlineColor:Ne,fill:Ne,stroke:Ne,borderColor:Ne,borderTopColor:Ne,borderRightColor:Ne,borderBottomColor:Ne,borderLeftColor:Ne,filter:Ku,WebkitFilter:Ku},H0=e=>o2[e];function G0(e,t){let n=H0(e);return n!==Ku&&(n=Bn),n.getAnimatableNone?n.getAnimatableNone(t):void 0}const l2=new Set(["auto","none","0"]);function a2(e,t,n){let r=0,i;for(;r<e.length&&!i;){const s=e[r];typeof s=="string"&&!l2.has(s)&&ws(s).values.length&&(i=e[r]),r++}if(i&&n)for(const s of t)e[s]=G0(n,i)}class u2 extends Nf{constructor(t,n,r,i,s){super(t,n,r,i,s,!0)}readKeyframes(){const{unresolvedKeyframes:t,element:n,name:r}=this;if(!n||!n.current)return;super.readKeyframes();for(let a=0;a<t.length;a++){let u=t[a];if(typeof u=="string"&&(u=u.trim(),kf(u))){const c=V0(u,n.current);c!==void 0&&(t[a]=c),a===t.length-1&&(this.finalKeyframe=u)}}if(this.resolveNoneKeyframes(),!B0.has(r)||t.length!==2)return;const[i,s]=t,o=Dh(i),l=Dh(s);if(o!==l)if(Nh(o)&&Nh(l))for(let a=0;a<t.length;a++){const u=t[a];typeof u=="string"&&(t[a]=parseFloat(u))}else cr[r]&&(this.needsMeasurement=!0)}resolveNoneKeyframes(){const{unresolvedKeyframes:t,name:n}=this,r=[];for(let i=0;i<t.length;i++)(t[i]===null||t2(t[i]))&&r.push(i);r.length&&a2(t,r,n)}measureInitialState(){const{element:t,unresolvedKeyframes:n,name:r}=this;if(!t||!t.current)return;r==="height"&&(this.suspendedScrollY=window.pageYOffset),this.measuredOrigin=cr[r](t.measureViewportBox(),window.getComputedStyle(t.current)),n[0]=this.measuredOrigin;const i=n[n.length-1];i!==void 0&&t.getValue(r,i).jump(i,!1)}measureEndState(){var l;const{element:t,name:n,unresolvedKeyframes:r}=this;if(!t||!t.current)return;const i=t.getValue(n);i&&i.jump(this.measuredOrigin,!1);const s=r.length-1,o=r[s];r[s]=cr[n](t.measureViewportBox(),window.getComputedStyle(t.current)),o!==null&&this.finalKeyframe===void 0&&(this.finalKeyframe=o),(l=this.removedTransforms)!=null&&l.length&&this.removedTransforms.forEach(([a,u])=>{t.getValue(a).set(u)}),this.resolveNoneKeyframes()}}function c2(e,t,n){if(e instanceof EventTarget)return[e];if(typeof e=="string"){let r=document;const i=(n==null?void 0:n[e])??r.querySelectorAll(e);return i?Array.from(i):[]}return Array.from(e)}const W0=(e,t)=>t&&typeof e=="number"?t.transform(e):e;function K0(e){return u0(e)&&"offsetHeight"in e}const _h=30,f2=e=>!isNaN(parseFloat(e));class d2{constructor(t,n={}){this.canTrackVelocity=null,this.events={},this.updateAndNotify=r=>{var s;const i=st.now();if(this.updatedAt!==i&&this.setPrevFrameValue(),this.prev=this.current,this.setCurrent(r),this.current!==this.prev&&((s=this.events.change)==null||s.notify(this.current),this.dependents))for(const o of this.dependents)o.dirty()},this.hasAnimated=!1,this.setCurrent(t),this.owner=n.owner}setCurrent(t){this.current=t,this.updatedAt=st.now(),this.canTrackVelocity===null&&t!==void 0&&(this.canTrackVelocity=f2(this.current))}setPrevFrameValue(t=this.current){this.prevFrameValue=t,this.prevUpdatedAt=this.updatedAt}onChange(t){return this.on("change",t)}on(t,n){this.events[t]||(this.events[t]=new yf);const r=this.events[t].add(n);return t==="change"?()=>{r(),ge.read(()=>{this.events.change.getSize()||this.stop()})}:r}clearListeners(){for(const t in this.events)this.events[t].clear()}attach(t,n){this.passiveEffect=t,this.stopPassiveEffect=n}set(t){this.passiveEffect?this.passiveEffect(t,this.updateAndNotify):this.updateAndNotify(t)}setWithVelocity(t,n,r){this.set(n),this.prev=void 0,this.prevFrameValue=t,this.prevUpdatedAt=this.updatedAt-r}jump(t,n=!0){this.updateAndNotify(t),this.prev=t,this.prevUpdatedAt=this.prevFrameValue=void 0,n&&this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}dirty(){var t;(t=this.events.change)==null||t.notify(this.current)}addDependent(t){this.dependents||(this.dependents=new Set),this.dependents.add(t)}removeDependent(t){this.dependents&&this.dependents.delete(t)}get(){return this.current}getPrevious(){return this.prev}getVelocity(){const t=st.now();if(!this.canTrackVelocity||this.prevFrameValue===void 0||t-this.updatedAt>_h)return 0;const n=Math.min(this.updatedAt-this.prevUpdatedAt,_h);return f0(parseFloat(this.current)-parseFloat(this.prevFrameValue),n)}start(t){return this.stop(),new Promise(n=>{this.hasAnimated=!0,this.animation=t(n),this.events.animationStart&&this.events.animationStart.notify()}).then(()=>{this.events.animationComplete&&this.events.animationComplete.notify(),this.clearAnimation()})}stop(){this.animation&&(this.animation.stop(),this.events.animationCancel&&this.events.animationCancel.notify()),this.clearAnimation()}isAnimating(){return!!this.animation}clearAnimation(){delete this.animation}destroy(){var t,n;(t=this.dependents)==null||t.clear(),(n=this.events.destroy)==null||n.notify(),this.clearListeners(),this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}}function li(e,t){return new d2(e,t)}const{schedule:Rf}=S0(queueMicrotask,!1),Lt={x:!1,y:!1};function Y0(){return Lt.x||Lt.y}function h2(e){return e==="x"||e==="y"?Lt[e]?null:(Lt[e]=!0,()=>{Lt[e]=!1}):Lt.x||Lt.y?null:(Lt.x=Lt.y=!0,()=>{Lt.x=Lt.y=!1})}function q0(e,t){const n=c2(e),r=new AbortController,i={passive:!0,...t,signal:r.signal};return[n,i,()=>r.abort()]}function Oh(e){return!(e.pointerType==="touch"||Y0())}function p2(e,t,n={}){const[r,i,s]=q0(e,n),o=l=>{if(!Oh(l))return;const{target:a}=l,u=t(a,l);if(typeof u!="function"||!a)return;const c=f=>{Oh(f)&&(u(f),a.removeEventListener("pointerleave",c))};a.addEventListener("pointerleave",c,i)};return r.forEach(l=>{l.addEventListener("pointerenter",o,i)}),s}const X0=(e,t)=>t?e===t?!0:X0(e,t.parentElement):!1,Df=e=>e.pointerType==="mouse"?typeof e.button!="number"||e.button<=0:e.isPrimary!==!1,m2=new Set(["BUTTON","INPUT","SELECT","TEXTAREA","A"]);function g2(e){return m2.has(e.tagName)||e.tabIndex!==-1}const Ao=new WeakSet;function jh(e){return t=>{t.key==="Enter"&&e(t)}}function ya(e,t){e.dispatchEvent(new PointerEvent("pointer"+t,{isPrimary:!0,bubbles:!0}))}const y2=(e,t)=>{const n=e.currentTarget;if(!n)return;const r=jh(()=>{if(Ao.has(n))return;ya(n,"down");const i=jh(()=>{ya(n,"up")}),s=()=>ya(n,"cancel");n.addEventListener("keyup",i,t),n.addEventListener("blur",s,t)});n.addEventListener("keydown",r,t),n.addEventListener("blur",()=>n.removeEventListener("keydown",r),t)};function Fh(e){return Df(e)&&!Y0()}function x2(e,t,n={}){const[r,i,s]=q0(e,n),o=l=>{const a=l.currentTarget;if(!Fh(l))return;Ao.add(a);const u=t(a,l),c=(h,m)=>{window.removeEventListener("pointerup",f),window.removeEventListener("pointercancel",d),Ao.has(a)&&Ao.delete(a),Fh(h)&&typeof u=="function"&&u(h,{success:m})},f=h=>{c(h,a===window||a===document||n.useGlobalTarget||X0(a,h.target))},d=h=>{c(h,!1)};window.addEventListener("pointerup",f,i),window.addEventListener("pointercancel",d,i)};return r.forEach(l=>{(n.useGlobalTarget?window:l).addEventListener("pointerdown",o,i),K0(l)&&(l.addEventListener("focus",u=>y2(u,i)),!g2(l)&&!l.hasAttribute("tabindex")&&(l.tabIndex=0))}),s}function Q0(e){return u0(e)&&"ownerSVGElement"in e}function v2(e){return Q0(e)&&e.tagName==="svg"}const Ge=e=>!!(e&&e.getVelocity),w2=[...$0,Ne,Bn],k2=e=>w2.find(U0(e)),Lf=I.createContext({transformPagePoint:e=>e,isStatic:!1,reducedMotion:"never"});function zh(e,t){if(typeof e=="function")return e(t);e!=null&&(e.current=t)}function S2(...e){return t=>{let n=!1;const r=e.map(i=>{const s=zh(i,t);return!n&&typeof s=="function"&&(n=!0),s});if(n)return()=>{for(let i=0;i<r.length;i++){const s=r[i];typeof s=="function"?s():zh(e[i],null)}}}}function C2(...e){return I.useCallback(S2(...e),e)}class E2 extends I.Component{getSnapshotBeforeUpdate(t){const n=this.props.childRef.current;if(n&&t.isPresent&&!this.props.isPresent){const r=n.offsetParent,i=K0(r)&&r.offsetWidth||0,s=this.props.sizeRef.current;s.height=n.offsetHeight||0,s.width=n.offsetWidth||0,s.top=n.offsetTop,s.left=n.offsetLeft,s.right=i-s.width-s.left}return null}componentDidUpdate(){}render(){return this.props.children}}function b2({children:e,isPresent:t,anchorX:n,root:r}){const i=I.useId(),s=I.useRef(null),o=I.useRef({width:0,height:0,top:0,left:0,right:0}),{nonce:l}=I.useContext(Lf),a=C2(s,e==null?void 0:e.ref);return I.useInsertionEffect(()=>{const{width:u,height:c,top:f,left:d,right:h}=o.current;if(t||!s.current||!u||!c)return;const m=n==="left"?`left: ${d}`:`right: ${h}`;s.current.dataset.motionPopId=i;const x=document.createElement("style");l&&(x.nonce=l);const C=r??document.head;return C.appendChild(x),x.sheet&&x.sheet.insertRule(`
          [data-motion-pop-id="${i}"] {
            position: absolute !important;
            width: ${u}px !important;
            height: ${c}px !important;
            ${m}px !important;
            top: ${f}px !important;
          }
        `),()=>{C.contains(x)&&C.removeChild(x)}},[t]),v.jsx(E2,{isPresent:t,childRef:s,sizeRef:o,children:I.cloneElement(e,{ref:a})})}const T2=({children:e,initial:t,isPresent:n,onExitComplete:r,custom:i,presenceAffectsLayout:s,mode:o,anchorX:l,root:a})=>{const u=ff(A2),c=I.useId();let f=!0,d=I.useMemo(()=>(f=!1,{id:c,initial:t,isPresent:n,custom:i,onExitComplete:h=>{u.set(h,!0);for(const m of u.values())if(!m)return;r&&r()},register:h=>(u.set(h,!1),()=>u.delete(h))}),[n,u,r]);return s&&f&&(d={...d}),I.useMemo(()=>{u.forEach((h,m)=>u.set(m,!1))},[n]),I.useEffect(()=>{!n&&!u.size&&r&&r()},[n]),o==="popLayout"&&(e=v.jsx(b2,{isPresent:n,anchorX:l,root:a,children:e})),v.jsx(Nl.Provider,{value:d,children:e})};function A2(){return new Map}function Z0(e=!0){const t=I.useContext(Nl);if(t===null)return[!0,null];const{isPresent:n,onExitComplete:r,register:i}=t,s=I.useId();I.useEffect(()=>{if(e)return i(s)},[e]);const o=I.useCallback(()=>e&&r&&r(s),[s,r,e]);return!n&&r?[!1,o]:[!0]}const oo=e=>e.key||"";function Vh(e){const t=[];return I.Children.forEach(e,n=>{I.isValidElement(n)&&t.push(n)}),t}const yr=({children:e,custom:t,initial:n=!0,onExitComplete:r,presenceAffectsLayout:i=!0,mode:s="sync",propagate:o=!1,anchorX:l="left",root:a})=>{const[u,c]=Z0(o),f=I.useMemo(()=>Vh(e),[e]),d=o&&!u?[]:f.map(oo),h=I.useRef(!0),m=I.useRef(f),x=ff(()=>new Map),[C,p]=I.useState(f),[g,y]=I.useState(f);l0(()=>{h.current=!1,m.current=f;for(let k=0;k<g.length;k++){const A=oo(g[k]);d.includes(A)?x.delete(A):x.get(A)!==!0&&x.set(A,!1)}},[g,d.length,d.join("-")]);const b=[];if(f!==C){let k=[...f];for(let A=0;A<g.length;A++){const P=g[A],O=oo(P);d.includes(O)||(k.splice(A,0,P),b.push(P))}return s==="wait"&&b.length&&(k=b),y(Vh(k)),p(f),null}const{forceRender:T}=I.useContext(cf);return v.jsx(v.Fragment,{children:g.map(k=>{const A=oo(k),P=o&&!u?!1:f===g||d.includes(A),O=()=>{if(x.has(A))x.set(A,!0);else return;let E=!0;x.forEach(L=>{L||(E=!1)}),E&&(T==null||T(),y(m.current),o&&(c==null||c()),r&&r())};return v.jsx(T2,{isPresent:P,initial:!h.current||n?void 0:!1,custom:t,presenceAffectsLayout:i,mode:s,root:a,onExitComplete:P?void 0:O,anchorX:l,children:k},A)})})},J0=I.createContext({strict:!1}),Bh={animation:["animate","variants","whileHover","whileTap","exit","whileInView","whileFocus","whileDrag"],exit:["exit"],drag:["drag","dragControls"],focus:["whileFocus"],hover:["whileHover","onHoverStart","onHoverEnd"],tap:["whileTap","onTap","onTapStart","onTapCancel"],pan:["onPan","onPanStart","onPanSessionStart","onPanEnd"],inView:["whileInView","onViewportEnter","onViewportLeave"],layout:["layout","layoutId"]},ai={};for(const e in Bh)ai[e]={isEnabled:t=>Bh[e].some(n=>!!t[n])};function P2(e){for(const t in e)ai[t]={...ai[t],...e[t]}}const N2=new Set(["animate","exit","variants","initial","style","values","variants","transition","transformTemplate","custom","inherit","onBeforeLayoutMeasure","onAnimationStart","onAnimationComplete","onUpdate","onDragStart","onDrag","onDragEnd","onMeasureDragConstraints","onDirectionLock","onDragTransitionEnd","_dragX","_dragY","onHoverStart","onHoverEnd","onViewportEnter","onViewportLeave","globalTapTarget","ignoreStrict","viewport"]);function ll(e){return e.startsWith("while")||e.startsWith("drag")&&e!=="draggable"||e.startsWith("layout")||e.startsWith("onTap")||e.startsWith("onPan")||e.startsWith("onLayout")||N2.has(e)}let ex=e=>!ll(e);function I2(e){typeof e=="function"&&(ex=t=>t.startsWith("on")?!ll(t):e(t))}try{I2(require("@emotion/is-prop-valid").default)}catch{}function M2(e,t,n){const r={};for(const i in e)i==="values"&&typeof e.values=="object"||(ex(i)||n===!0&&ll(i)||!t&&!ll(i)||e.draggable&&i.startsWith("onDrag"))&&(r[i]=e[i]);return r}const Il=I.createContext({});function Ml(e){return e!==null&&typeof e=="object"&&typeof e.start=="function"}function ks(e){return typeof e=="string"||Array.isArray(e)}const _f=["animate","whileInView","whileFocus","whileHover","whileTap","whileDrag","exit"],Of=["initial",..._f];function Rl(e){return Ml(e.animate)||Of.some(t=>ks(e[t]))}function tx(e){return!!(Rl(e)||e.variants)}function R2(e,t){if(Rl(e)){const{initial:n,animate:r}=e;return{initial:n===!1||ks(n)?n:void 0,animate:ks(r)?r:void 0}}return e.inherit!==!1?t:{}}function D2(e){const{initial:t,animate:n}=R2(e,I.useContext(Il));return I.useMemo(()=>({initial:t,animate:n}),[Uh(t),Uh(n)])}function Uh(e){return Array.isArray(e)?e.join(" "):e}const Ss={};function L2(e){for(const t in e)Ss[t]=e[t],wf(t)&&(Ss[t].isCSSVariable=!0)}function nx(e,{layout:t,layoutId:n}){return mi.has(e)||e.startsWith("origin")||(t||n!==void 0)&&(!!Ss[e]||e==="opacity")}const _2={x:"translateX",y:"translateY",z:"translateZ",transformPerspective:"perspective"},O2=pi.length;function j2(e,t,n){let r="",i=!0;for(let s=0;s<O2;s++){const o=pi[s],l=e[o];if(l===void 0)continue;let a=!0;if(typeof l=="number"?a=l===(o.startsWith("scale")?1:0):a=parseFloat(l)===0,!a||n){const u=W0(l,Mf[o]);if(!a){i=!1;const c=_2[o]||o;r+=`${c}(${u}) `}n&&(t[o]=u)}}return r=r.trim(),n?r=n(t,i?"":r):i&&(r="none"),r}function jf(e,t,n){const{style:r,vars:i,transformOrigin:s}=e;let o=!1,l=!1;for(const a in t){const u=t[a];if(mi.has(a)){o=!0;continue}else if(wf(a)){i[a]=u;continue}else{const c=W0(u,Mf[a]);a.startsWith("origin")?(l=!0,s[a]=c):r[a]=c}}if(t.transform||(o||n?r.transform=j2(t,e.transform,n):r.transform&&(r.transform="none")),l){const{originX:a="50%",originY:u="50%",originZ:c=0}=s;r.transformOrigin=`${a} ${u} ${c}`}}const Ff=()=>({style:{},transform:{},transformOrigin:{},vars:{}});function rx(e,t,n){for(const r in t)!Ge(t[r])&&!nx(r,n)&&(e[r]=t[r])}function F2({transformTemplate:e},t){return I.useMemo(()=>{const n=Ff();return jf(n,t,e),Object.assign({},n.vars,n.style)},[t])}function z2(e,t){const n=e.style||{},r={};return rx(r,n,e),Object.assign(r,F2(e,t)),r}function V2(e,t){const n={},r=z2(e,t);return e.drag&&e.dragListener!==!1&&(n.draggable=!1,r.userSelect=r.WebkitUserSelect=r.WebkitTouchCallout="none",r.touchAction=e.drag===!0?"none":`pan-${e.drag==="x"?"y":"x"}`),e.tabIndex===void 0&&(e.onTap||e.onTapStart||e.whileTap)&&(n.tabIndex=0),n.style=r,n}const B2={offset:"stroke-dashoffset",array:"stroke-dasharray"},U2={offset:"strokeDashoffset",array:"strokeDasharray"};function $2(e,t,n=1,r=0,i=!0){e.pathLength=1;const s=i?B2:U2;e[s.offset]=$.transform(-r);const o=$.transform(t),l=$.transform(n);e[s.array]=`${o} ${l}`}function ix(e,{attrX:t,attrY:n,attrScale:r,pathLength:i,pathSpacing:s=1,pathOffset:o=0,...l},a,u,c){if(jf(e,l,u),a){e.style.viewBox&&(e.attrs.viewBox=e.style.viewBox);return}e.attrs=e.style,e.style={};const{attrs:f,style:d}=e;f.transform&&(d.transform=f.transform,delete f.transform),(d.transform||f.transformOrigin)&&(d.transformOrigin=f.transformOrigin??"50% 50%",delete f.transformOrigin),d.transform&&(d.transformBox=(c==null?void 0:c.transformBox)??"fill-box",delete f.transformBox),t!==void 0&&(f.x=t),n!==void 0&&(f.y=n),r!==void 0&&(f.scale=r),i!==void 0&&$2(f,i,s,o,!1)}const sx=()=>({...Ff(),attrs:{}}),ox=e=>typeof e=="string"&&e.toLowerCase()==="svg";function H2(e,t,n,r){const i=I.useMemo(()=>{const s=sx();return ix(s,t,ox(r),e.transformTemplate,e.style),{...s.attrs,style:{...s.style}}},[t]);if(e.style){const s={};rx(s,e.style,e),i.style={...s,...i.style}}return i}const G2=["animate","circle","defs","desc","ellipse","g","image","line","filter","marker","mask","metadata","path","pattern","polygon","polyline","rect","stop","switch","symbol","svg","text","tspan","use","view"];function zf(e){return typeof e!="string"||e.includes("-")?!1:!!(G2.indexOf(e)>-1||/[A-Z]/u.test(e))}function W2(e,t,n,{latestValues:r},i,s=!1){const l=(zf(e)?H2:V2)(t,r,i,e),a=M2(t,typeof e=="string",s),u=e!==I.Fragment?{...a,...l,ref:n}:{},{children:c}=t,f=I.useMemo(()=>Ge(c)?c.get():c,[c]);return I.createElement(e,{...u,children:f})}function $h(e){const t=[{},{}];return e==null||e.values.forEach((n,r)=>{t[0][r]=n.get(),t[1][r]=n.getVelocity()}),t}function Vf(e,t,n,r){if(typeof t=="function"){const[i,s]=$h(r);t=t(n!==void 0?n:e.custom,i,s)}if(typeof t=="string"&&(t=e.variants&&e.variants[t]),typeof t=="function"){const[i,s]=$h(r);t=t(n!==void 0?n:e.custom,i,s)}return t}function Po(e){return Ge(e)?e.get():e}function K2({scrapeMotionValuesFromProps:e,createRenderState:t},n,r,i){return{latestValues:Y2(n,r,i,e),renderState:t()}}function Y2(e,t,n,r){const i={},s=r(e,{});for(const d in s)i[d]=Po(s[d]);let{initial:o,animate:l}=e;const a=Rl(e),u=tx(e);t&&u&&!a&&e.inherit!==!1&&(o===void 0&&(o=t.initial),l===void 0&&(l=t.animate));let c=n?n.initial===!1:!1;c=c||o===!1;const f=c?l:o;if(f&&typeof f!="boolean"&&!Ml(f)){const d=Array.isArray(f)?f:[f];for(let h=0;h<d.length;h++){const m=Vf(e,d[h]);if(m){const{transitionEnd:x,transition:C,...p}=m;for(const g in p){let y=p[g];if(Array.isArray(y)){const b=c?y.length-1:0;y=y[b]}y!==null&&(i[g]=y)}for(const g in x)i[g]=x[g]}}}return i}const lx=e=>(t,n)=>{const r=I.useContext(Il),i=I.useContext(Nl),s=()=>K2(e,t,r,i);return n?s():ff(s)};function Bf(e,t,n){var s;const{style:r}=e,i={};for(const o in r)(Ge(r[o])||t.style&&Ge(t.style[o])||nx(o,e)||((s=n==null?void 0:n.getValue(o))==null?void 0:s.liveStyle)!==void 0)&&(i[o]=r[o]);return i}const q2=lx({scrapeMotionValuesFromProps:Bf,createRenderState:Ff});function ax(e,t,n){const r=Bf(e,t,n);for(const i in e)if(Ge(e[i])||Ge(t[i])){const s=pi.indexOf(i)!==-1?"attr"+i.charAt(0).toUpperCase()+i.substring(1):i;r[s]=e[i]}return r}const X2=lx({scrapeMotionValuesFromProps:ax,createRenderState:sx}),Q2=Symbol.for("motionComponentSymbol");function Br(e){return e&&typeof e=="object"&&Object.prototype.hasOwnProperty.call(e,"current")}function Z2(e,t,n){return I.useCallback(r=>{r&&e.onMount&&e.onMount(r),t&&(r?t.mount(r):t.unmount()),n&&(typeof n=="function"?n(r):Br(n)&&(n.current=r))},[t])}const Uf=e=>e.replace(/([a-z])([A-Z])/gu,"$1-$2").toLowerCase(),J2="framerAppearId",ux="data-"+Uf(J2),cx=I.createContext({});function eC(e,t,n,r,i){var x,C;const{visualElement:s}=I.useContext(Il),o=I.useContext(J0),l=I.useContext(Nl),a=I.useContext(Lf).reducedMotion,u=I.useRef(null);r=r||o.renderer,!u.current&&r&&(u.current=r(e,{visualState:t,parent:s,props:n,presenceContext:l,blockInitialAnimation:l?l.initial===!1:!1,reducedMotionConfig:a}));const c=u.current,f=I.useContext(cx);c&&!c.projection&&i&&(c.type==="html"||c.type==="svg")&&tC(u.current,n,i,f);const d=I.useRef(!1);I.useInsertionEffect(()=>{c&&d.current&&c.update(n,l)});const h=n[ux],m=I.useRef(!!h&&!((x=window.MotionHandoffIsComplete)!=null&&x.call(window,h))&&((C=window.MotionHasOptimisedAnimation)==null?void 0:C.call(window,h)));return l0(()=>{c&&(d.current=!0,window.MotionIsMounted=!0,c.updateFeatures(),c.scheduleRenderMicrotask(),m.current&&c.animationState&&c.animationState.animateChanges())}),I.useEffect(()=>{c&&(!m.current&&c.animationState&&c.animationState.animateChanges(),m.current&&(queueMicrotask(()=>{var p;(p=window.MotionHandoffMarkAsComplete)==null||p.call(window,h)}),m.current=!1),c.enteringChildren=void 0)}),c}function tC(e,t,n,r){const{layoutId:i,layout:s,drag:o,dragConstraints:l,layoutScroll:a,layoutRoot:u,layoutCrossfade:c}=t;e.projection=new n(e.latestValues,t["data-framer-portal-id"]?void 0:fx(e.parent)),e.projection.setOptions({layoutId:i,layout:s,alwaysMeasureLayout:!!o||l&&Br(l),visualElement:e,animationType:typeof s=="string"?s:"both",initialPromotionConfig:r,crossfade:c,layoutScroll:a,layoutRoot:u})}function fx(e){if(e)return e.options.allowProjection!==!1?e.projection:fx(e.parent)}function xa(e,{forwardMotionProps:t=!1}={},n,r){n&&P2(n);const i=zf(e)?X2:q2;function s(l,a){let u;const c={...I.useContext(Lf),...l,layoutId:nC(l)},{isStatic:f}=c,d=D2(l),h=i(l,f);if(!f&&df){rC();const m=iC(c);u=m.MeasureLayout,d.visualElement=eC(e,h,c,r,m.ProjectionNode)}return v.jsxs(Il.Provider,{value:d,children:[u&&d.visualElement?v.jsx(u,{visualElement:d.visualElement,...c}):null,W2(e,l,Z2(h,d.visualElement,a),h,f,t)]})}s.displayName=`motion.${typeof e=="string"?e:`create(${e.displayName??e.name??""})`}`;const o=I.forwardRef(s);return o[Q2]=e,o}function nC({layoutId:e}){const t=I.useContext(cf).id;return t&&e!==void 0?t+"-"+e:e}function rC(e,t){I.useContext(J0).strict}function iC(e){const{drag:t,layout:n}=ai;if(!t&&!n)return{};const r={...t,...n};return{MeasureLayout:t!=null&&t.isEnabled(e)||n!=null&&n.isEnabled(e)?r.MeasureLayout:void 0,ProjectionNode:r.ProjectionNode}}function sC(e,t){if(typeof Proxy>"u")return xa;const n=new Map,r=(s,o)=>xa(s,o,e,t),i=(s,o)=>r(s,o);return new Proxy(i,{get:(s,o)=>o==="create"?r:(n.has(o)||n.set(o,xa(o,void 0,e,t)),n.get(o))})}function dx({top:e,left:t,right:n,bottom:r}){return{x:{min:t,max:n},y:{min:e,max:r}}}function oC({x:e,y:t}){return{top:t.min,right:e.max,bottom:t.max,left:e.min}}function lC(e,t){if(!t)return e;const n=t({x:e.left,y:e.top}),r=t({x:e.right,y:e.bottom});return{top:n.y,left:n.x,bottom:r.y,right:r.x}}function va(e){return e===void 0||e===1}function Yu({scale:e,scaleX:t,scaleY:n}){return!va(e)||!va(t)||!va(n)}function er(e){return Yu(e)||hx(e)||e.z||e.rotate||e.rotateX||e.rotateY||e.skewX||e.skewY}function hx(e){return Hh(e.x)||Hh(e.y)}function Hh(e){return e&&e!=="0%"}function al(e,t,n){const r=e-n,i=t*r;return n+i}function Gh(e,t,n,r,i){return i!==void 0&&(e=al(e,i,r)),al(e,n,r)+t}function qu(e,t=0,n=1,r,i){e.min=Gh(e.min,t,n,r,i),e.max=Gh(e.max,t,n,r,i)}function px(e,{x:t,y:n}){qu(e.x,t.translate,t.scale,t.originPoint),qu(e.y,n.translate,n.scale,n.originPoint)}const Wh=.999999999999,Kh=1.0000000000001;function aC(e,t,n,r=!1){const i=n.length;if(!i)return;t.x=t.y=1;let s,o;for(let l=0;l<i;l++){s=n[l],o=s.projectionDelta;const{visualElement:a}=s.options;a&&a.props.style&&a.props.style.display==="contents"||(r&&s.options.layoutScroll&&s.scroll&&s!==s.root&&$r(e,{x:-s.scroll.offset.x,y:-s.scroll.offset.y}),o&&(t.x*=o.x.scale,t.y*=o.y.scale,px(e,o)),r&&er(s.latestValues)&&$r(e,s.latestValues))}t.x<Kh&&t.x>Wh&&(t.x=1),t.y<Kh&&t.y>Wh&&(t.y=1)}function Ur(e,t){e.min=e.min+t,e.max=e.max+t}function Yh(e,t,n,r,i=.5){const s=ve(e.min,e.max,i);qu(e,t,n,s,r)}function $r(e,t){Yh(e.x,t.x,t.scaleX,t.scale,t.originX),Yh(e.y,t.y,t.scaleY,t.scale,t.originY)}function mx(e,t){return dx(lC(e.getBoundingClientRect(),t))}function uC(e,t,n){const r=mx(e,n),{scroll:i}=t;return i&&(Ur(r.x,i.offset.x),Ur(r.y,i.offset.y)),r}const qh=()=>({translate:0,scale:1,origin:0,originPoint:0}),Hr=()=>({x:qh(),y:qh()}),Xh=()=>({min:0,max:0}),be=()=>({x:Xh(),y:Xh()}),Xu={current:null},gx={current:!1};function cC(){if(gx.current=!0,!!df)if(window.matchMedia){const e=window.matchMedia("(prefers-reduced-motion)"),t=()=>Xu.current=e.matches;e.addEventListener("change",t),t()}else Xu.current=!1}const fC=new WeakMap;function dC(e,t,n){for(const r in t){const i=t[r],s=n[r];if(Ge(i))e.addValue(r,i);else if(Ge(s))e.addValue(r,li(i,{owner:e}));else if(s!==i)if(e.hasValue(r)){const o=e.getValue(r);o.liveStyle===!0?o.jump(i):o.hasAnimated||o.set(i)}else{const o=e.getStaticValue(r);e.addValue(r,li(o!==void 0?o:i,{owner:e}))}}for(const r in n)t[r]===void 0&&e.removeValue(r);return t}const Qh=["AnimationStart","AnimationComplete","Update","BeforeLayoutMeasure","LayoutMeasure","LayoutAnimationStart","LayoutAnimationComplete"];class hC{scrapeMotionValuesFromProps(t,n,r){return{}}constructor({parent:t,props:n,presenceContext:r,reducedMotionConfig:i,blockInitialAnimation:s,visualState:o},l={}){this.current=null,this.children=new Set,this.isVariantNode=!1,this.isControllingVariants=!1,this.shouldReduceMotion=null,this.values=new Map,this.KeyframeResolver=Nf,this.features={},this.valueSubscriptions=new Map,this.prevMotionValues={},this.events={},this.propEventSubscriptions={},this.notifyUpdate=()=>this.notify("Update",this.latestValues),this.render=()=>{this.current&&(this.triggerBuild(),this.renderInstance(this.current,this.renderState,this.props.style,this.projection))},this.renderScheduledAt=0,this.scheduleRender=()=>{const d=st.now();this.renderScheduledAt<d&&(this.renderScheduledAt=d,ge.render(this.render,!1,!0))};const{latestValues:a,renderState:u}=o;this.latestValues=a,this.baseTarget={...a},this.initialValues=n.initial?{...a}:{},this.renderState=u,this.parent=t,this.props=n,this.presenceContext=r,this.depth=t?t.depth+1:0,this.reducedMotionConfig=i,this.options=l,this.blockInitialAnimation=!!s,this.isControllingVariants=Rl(n),this.isVariantNode=tx(n),this.isVariantNode&&(this.variantChildren=new Set),this.manuallyAnimateOnMount=!!(t&&t.current);const{willChange:c,...f}=this.scrapeMotionValuesFromProps(n,{},this);for(const d in f){const h=f[d];a[d]!==void 0&&Ge(h)&&h.set(a[d])}}mount(t){var n;this.current=t,fC.set(t,this),this.projection&&!this.projection.instance&&this.projection.mount(t),this.parent&&this.isVariantNode&&!this.isControllingVariants&&(this.removeFromVariantTree=this.parent.addVariantChild(this)),this.values.forEach((r,i)=>this.bindToMotionValue(i,r)),gx.current||cC(),this.shouldReduceMotion=this.reducedMotionConfig==="never"?!1:this.reducedMotionConfig==="always"?!0:Xu.current,(n=this.parent)==null||n.addChild(this),this.update(this.props,this.presenceContext)}unmount(){var t;this.projection&&this.projection.unmount(),Vn(this.notifyUpdate),Vn(this.render),this.valueSubscriptions.forEach(n=>n()),this.valueSubscriptions.clear(),this.removeFromVariantTree&&this.removeFromVariantTree(),(t=this.parent)==null||t.removeChild(this);for(const n in this.events)this.events[n].clear();for(const n in this.features){const r=this.features[n];r&&(r.unmount(),r.isMounted=!1)}this.current=null}addChild(t){this.children.add(t),this.enteringChildren??(this.enteringChildren=new Set),this.enteringChildren.add(t)}removeChild(t){this.children.delete(t),this.enteringChildren&&this.enteringChildren.delete(t)}bindToMotionValue(t,n){this.valueSubscriptions.has(t)&&this.valueSubscriptions.get(t)();const r=mi.has(t);r&&this.onBindTransform&&this.onBindTransform();const i=n.on("change",o=>{this.latestValues[t]=o,this.props.onUpdate&&ge.preRender(this.notifyUpdate),r&&this.projection&&(this.projection.isTransformDirty=!0),this.scheduleRender()});let s;window.MotionCheckAppearSync&&(s=window.MotionCheckAppearSync(this,t,n)),this.valueSubscriptions.set(t,()=>{i(),s&&s(),n.owner&&n.stop()})}sortNodePosition(t){return!this.current||!this.sortInstanceNodePosition||this.type!==t.type?0:this.sortInstanceNodePosition(this.current,t.current)}updateFeatures(){let t="animation";for(t in ai){const n=ai[t];if(!n)continue;const{isEnabled:r,Feature:i}=n;if(!this.features[t]&&i&&r(this.props)&&(this.features[t]=new i(this)),this.features[t]){const s=this.features[t];s.isMounted?s.update():(s.mount(),s.isMounted=!0)}}}triggerBuild(){this.build(this.renderState,this.latestValues,this.props)}measureViewportBox(){return this.current?this.measureInstanceViewportBox(this.current,this.props):be()}getStaticValue(t){return this.latestValues[t]}setStaticValue(t,n){this.latestValues[t]=n}update(t,n){(t.transformTemplate||this.props.transformTemplate)&&this.scheduleRender(),this.prevProps=this.props,this.props=t,this.prevPresenceContext=this.presenceContext,this.presenceContext=n;for(let r=0;r<Qh.length;r++){const i=Qh[r];this.propEventSubscriptions[i]&&(this.propEventSubscriptions[i](),delete this.propEventSubscriptions[i]);const s="on"+i,o=t[s];o&&(this.propEventSubscriptions[i]=this.on(i,o))}this.prevMotionValues=dC(this,this.scrapeMotionValuesFromProps(t,this.prevProps,this),this.prevMotionValues),this.handleChildMotionValue&&this.handleChildMotionValue()}getProps(){return this.props}getVariant(t){return this.props.variants?this.props.variants[t]:void 0}getDefaultTransition(){return this.props.transition}getTransformPagePoint(){return this.props.transformPagePoint}getClosestVariantNode(){return this.isVariantNode?this:this.parent?this.parent.getClosestVariantNode():void 0}addVariantChild(t){const n=this.getClosestVariantNode();if(n)return n.variantChildren&&n.variantChildren.add(t),()=>n.variantChildren.delete(t)}addValue(t,n){const r=this.values.get(t);n!==r&&(r&&this.removeValue(t),this.bindToMotionValue(t,n),this.values.set(t,n),this.latestValues[t]=n.get())}removeValue(t){this.values.delete(t);const n=this.valueSubscriptions.get(t);n&&(n(),this.valueSubscriptions.delete(t)),delete this.latestValues[t],this.removeValueFromRenderState(t,this.renderState)}hasValue(t){return this.values.has(t)}getValue(t,n){if(this.props.values&&this.props.values[t])return this.props.values[t];let r=this.values.get(t);return r===void 0&&n!==void 0&&(r=li(n===null?void 0:n,{owner:this}),this.addValue(t,r)),r}readValue(t,n){let r=this.latestValues[t]!==void 0||!this.current?this.latestValues[t]:this.getBaseTargetFromProps(this.props,t)??this.readValueFromInstance(this.current,t,this.options);return r!=null&&(typeof r=="string"&&(a0(r)||c0(r))?r=parseFloat(r):!k2(r)&&Bn.test(n)&&(r=G0(t,n)),this.setBaseTarget(t,Ge(r)?r.get():r)),Ge(r)?r.get():r}setBaseTarget(t,n){this.baseTarget[t]=n}getBaseTarget(t){var s;const{initial:n}=this.props;let r;if(typeof n=="string"||typeof n=="object"){const o=Vf(this.props,n,(s=this.presenceContext)==null?void 0:s.custom);o&&(r=o[t])}if(n&&r!==void 0)return r;const i=this.getBaseTargetFromProps(this.props,t);return i!==void 0&&!Ge(i)?i:this.initialValues[t]!==void 0&&r===void 0?void 0:this.baseTarget[t]}on(t,n){return this.events[t]||(this.events[t]=new yf),this.events[t].add(n)}notify(t,...n){this.events[t]&&this.events[t].notify(...n)}scheduleRenderMicrotask(){Rf.render(this.render)}}class yx extends hC{constructor(){super(...arguments),this.KeyframeResolver=u2}sortInstanceNodePosition(t,n){return t.compareDocumentPosition(n)&2?1:-1}getBaseTargetFromProps(t,n){return t.style?t.style[n]:void 0}removeValueFromRenderState(t,{vars:n,style:r}){delete n[t],delete r[t]}handleChildMotionValue(){this.childSubscription&&(this.childSubscription(),delete this.childSubscription);const{children:t}=this.props;Ge(t)&&(this.childSubscription=t.on("change",n=>{this.current&&(this.current.textContent=`${n}`)}))}}function xx(e,{style:t,vars:n},r,i){const s=e.style;let o;for(o in t)s[o]=t[o];i==null||i.applyProjectionStyles(s,r);for(o in n)s.setProperty(o,n[o])}function pC(e){return window.getComputedStyle(e)}class mC extends yx{constructor(){super(...arguments),this.type="html",this.renderInstance=xx}readValueFromInstance(t,n){var r;if(mi.has(n))return(r=this.projection)!=null&&r.isProjecting?Bu(n):PS(t,n);{const i=pC(t),s=(wf(n)?i.getPropertyValue(n):i[n])||0;return typeof s=="string"?s.trim():s}}measureInstanceViewportBox(t,{transformPagePoint:n}){return mx(t,n)}build(t,n,r){jf(t,n,r.transformTemplate)}scrapeMotionValuesFromProps(t,n,r){return Bf(t,n,r)}}const vx=new Set(["baseFrequency","diffuseConstant","kernelMatrix","kernelUnitLength","keySplines","keyTimes","limitingConeAngle","markerHeight","markerWidth","numOctaves","targetX","targetY","surfaceScale","specularConstant","specularExponent","stdDeviation","tableValues","viewBox","gradientTransform","pathLength","startOffset","textLength","lengthAdjust"]);function gC(e,t,n,r){xx(e,t,void 0,r);for(const i in t.attrs)e.setAttribute(vx.has(i)?i:Uf(i),t.attrs[i])}class yC extends yx{constructor(){super(...arguments),this.type="svg",this.isSVGTag=!1,this.measureInstanceViewportBox=be}getBaseTargetFromProps(t,n){return t[n]}readValueFromInstance(t,n){if(mi.has(n)){const r=H0(n);return r&&r.default||0}return n=vx.has(n)?n:Uf(n),t.getAttribute(n)}scrapeMotionValuesFromProps(t,n,r){return ax(t,n,r)}build(t,n,r){ix(t,n,this.isSVGTag,r.transformTemplate,r.style)}renderInstance(t,n,r,i){gC(t,n,r,i)}mount(t){this.isSVGTag=ox(t.tagName),super.mount(t)}}const xC=(e,t)=>zf(e)?new yC(t):new mC(t,{allowProjection:e!==I.Fragment});function Zr(e,t,n){const r=e.getProps();return Vf(r,t,n!==void 0?n:r.custom,e)}const Qu=e=>Array.isArray(e);function vC(e,t,n){e.hasValue(t)?e.getValue(t).set(n):e.addValue(t,li(n))}function wC(e){return Qu(e)?e[e.length-1]||0:e}function kC(e,t){const n=Zr(e,t);let{transitionEnd:r={},transition:i={},...s}=n||{};s={...s,...r};for(const o in s){const l=wC(s[o]);vC(e,o,l)}}function SC(e){return!!(Ge(e)&&e.add)}function Zu(e,t){const n=e.getValue("willChange");if(SC(n))return n.add(t);if(!n&&gn.WillChange){const r=new gn.WillChange("auto");e.addValue("willChange",r),r.add(t)}}function wx(e){return e.props[ux]}const CC=e=>e!==null;function EC(e,{repeat:t,repeatType:n="loop"},r){const i=e.filter(CC),s=t&&n!=="loop"&&t%2===1?0:i.length-1;return i[s]}const bC={type:"spring",stiffness:500,damping:25,restSpeed:10},TC=e=>({type:"spring",stiffness:550,damping:e===0?2*Math.sqrt(550):30,restSpeed:10}),AC={type:"keyframes",duration:.8},PC={type:"keyframes",ease:[.25,.1,.35,1],duration:.3},NC=(e,{keyframes:t})=>t.length>2?AC:mi.has(e)?e.startsWith("scale")?TC(t[1]):bC:PC;function IC({when:e,delay:t,delayChildren:n,staggerChildren:r,staggerDirection:i,repeat:s,repeatType:o,repeatDelay:l,from:a,elapsed:u,...c}){return!!Object.keys(c).length}const $f=(e,t,n,r={},i,s)=>o=>{const l=If(r,e)||{},a=l.delay||r.delay||0;let{elapsed:u=0}=r;u=u-Qt(a);const c={keyframes:Array.isArray(n)?n:[null,n],ease:"easeOut",velocity:t.getVelocity(),...l,delay:-u,onUpdate:d=>{t.set(d),l.onUpdate&&l.onUpdate(d)},onComplete:()=>{o(),l.onComplete&&l.onComplete()},name:e,motionValue:t,element:s?void 0:i};IC(l)||Object.assign(c,NC(e,c)),c.duration&&(c.duration=Qt(c.duration)),c.repeatDelay&&(c.repeatDelay=Qt(c.repeatDelay)),c.from!==void 0&&(c.keyframes[0]=c.from);let f=!1;if((c.type===!1||c.duration===0&&!c.repeatDelay)&&(Wu(c),c.delay===0&&(f=!0)),(gn.instantAnimations||gn.skipAnimations)&&(f=!0,Wu(c),c.delay=0),c.allowFlatten=!l.type&&!l.ease,f&&!s&&t.get()!==void 0){const d=EC(c.keyframes,l);if(d!==void 0){ge.update(()=>{c.onUpdate(d),c.onComplete()});return}}return l.isSync?new Pf(c):new QS(c)};function MC({protectedKeys:e,needsAnimating:t},n){const r=e.hasOwnProperty(n)&&t[n]!==!0;return t[n]=!1,r}function kx(e,t,{delay:n=0,transitionOverride:r,type:i}={}){let{transition:s=e.getDefaultTransition(),transitionEnd:o,...l}=t;r&&(s=r);const a=[],u=i&&e.animationState&&e.animationState.getState()[i];for(const c in l){const f=e.getValue(c,e.latestValues[c]??null),d=l[c];if(d===void 0||u&&MC(u,c))continue;const h={delay:n,...If(s||{},c)},m=f.get();if(m!==void 0&&!f.isAnimating&&!Array.isArray(d)&&d===m&&!h.velocity)continue;let x=!1;if(window.MotionHandoffAnimation){const p=wx(e);if(p){const g=window.MotionHandoffAnimation(p,c,ge);g!==null&&(h.startTime=g,x=!0)}}Zu(e,c),f.start($f(c,f,d,e.shouldReduceMotion&&B0.has(c)?{type:!1}:h,e,x));const C=f.animation;C&&a.push(C)}return o&&Promise.all(a).then(()=>{ge.update(()=>{o&&kC(e,o)})}),a}function Sx(e,t,n,r=0,i=1){const s=Array.from(e).sort((u,c)=>u.sortNodePosition(c)).indexOf(t),o=e.size,l=(o-1)*r;return typeof n=="function"?n(s,o):i===1?s*r:l-s*r}function Ju(e,t,n={}){var a;const r=Zr(e,t,n.type==="exit"?(a=e.presenceContext)==null?void 0:a.custom:void 0);let{transition:i=e.getDefaultTransition()||{}}=r||{};n.transitionOverride&&(i=n.transitionOverride);const s=r?()=>Promise.all(kx(e,r,n)):()=>Promise.resolve(),o=e.variantChildren&&e.variantChildren.size?(u=0)=>{const{delayChildren:c=0,staggerChildren:f,staggerDirection:d}=i;return RC(e,t,u,c,f,d,n)}:()=>Promise.resolve(),{when:l}=i;if(l){const[u,c]=l==="beforeChildren"?[s,o]:[o,s];return u().then(()=>c())}else return Promise.all([s(),o(n.delay)])}function RC(e,t,n=0,r=0,i=0,s=1,o){const l=[];for(const a of e.variantChildren)a.notify("AnimationStart",t),l.push(Ju(a,t,{...o,delay:n+(typeof r=="function"?0:r)+Sx(e.variantChildren,a,r,i,s)}).then(()=>a.notify("AnimationComplete",t)));return Promise.all(l)}function DC(e,t,n={}){e.notify("AnimationStart",t);let r;if(Array.isArray(t)){const i=t.map(s=>Ju(e,s,n));r=Promise.all(i)}else if(typeof t=="string")r=Ju(e,t,n);else{const i=typeof t=="function"?Zr(e,t,n.custom):t;r=Promise.all(kx(e,i,n))}return r.then(()=>{e.notify("AnimationComplete",t)})}function Cx(e,t){if(!Array.isArray(t))return!1;const n=t.length;if(n!==e.length)return!1;for(let r=0;r<n;r++)if(t[r]!==e[r])return!1;return!0}const LC=Of.length;function Ex(e){if(!e)return;if(!e.isControllingVariants){const n=e.parent?Ex(e.parent)||{}:{};return e.props.initial!==void 0&&(n.initial=e.props.initial),n}const t={};for(let n=0;n<LC;n++){const r=Of[n],i=e.props[r];(ks(i)||i===!1)&&(t[r]=i)}return t}const _C=[..._f].reverse(),OC=_f.length;function jC(e){return t=>Promise.all(t.map(({animation:n,options:r})=>DC(e,n,r)))}function FC(e){let t=jC(e),n=Zh(),r=!0;const i=a=>(u,c)=>{var d;const f=Zr(e,c,a==="exit"?(d=e.presenceContext)==null?void 0:d.custom:void 0);if(f){const{transition:h,transitionEnd:m,...x}=f;u={...u,...x,...m}}return u};function s(a){t=a(e)}function o(a){const{props:u}=e,c=Ex(e.parent)||{},f=[],d=new Set;let h={},m=1/0;for(let C=0;C<OC;C++){const p=_C[C],g=n[p],y=u[p]!==void 0?u[p]:c[p],b=ks(y),T=p===a?g.isActive:null;T===!1&&(m=C);let k=y===c[p]&&y!==u[p]&&b;if(k&&r&&e.manuallyAnimateOnMount&&(k=!1),g.protectedKeys={...h},!g.isActive&&T===null||!y&&!g.prevProp||Ml(y)||typeof y=="boolean")continue;const A=zC(g.prevProp,y);let P=A||p===a&&g.isActive&&!k&&b||C>m&&b,O=!1;const E=Array.isArray(y)?y:[y];let L=E.reduce(i(p),{});T===!1&&(L={});const{prevResolvedValues:j={}}=g,K={...j,...L},J=H=>{P=!0,d.has(H)&&(O=!0,d.delete(H)),g.needsAnimating[H]=!0;const M=e.getValue(H);M&&(M.liveStyle=!1)};for(const H in K){const M=L[H],z=j[H];if(h.hasOwnProperty(H))continue;let w=!1;Qu(M)&&Qu(z)?w=!Cx(M,z):w=M!==z,w?M!=null?J(H):d.add(H):M!==void 0&&d.has(H)?J(H):g.protectedKeys[H]=!0}g.prevProp=y,g.prevResolvedValues=L,g.isActive&&(h={...h,...L}),r&&e.blockInitialAnimation&&(P=!1);const B=k&&A;P&&(!B||O)&&f.push(...E.map(H=>{const M={type:p};if(typeof H=="string"&&r&&!B&&e.manuallyAnimateOnMount&&e.parent){const{parent:z}=e,w=Zr(z,H);if(z.enteringChildren&&w){const{delayChildren:q}=w.transition||{};M.delay=Sx(z.enteringChildren,e,q)}}return{animation:H,options:M}}))}if(d.size){const C={};if(typeof u.initial!="boolean"){const p=Zr(e,Array.isArray(u.initial)?u.initial[0]:u.initial);p&&p.transition&&(C.transition=p.transition)}d.forEach(p=>{const g=e.getBaseTarget(p),y=e.getValue(p);y&&(y.liveStyle=!0),C[p]=g??null}),f.push({animation:C})}let x=!!f.length;return r&&(u.initial===!1||u.initial===u.animate)&&!e.manuallyAnimateOnMount&&(x=!1),r=!1,x?t(f):Promise.resolve()}function l(a,u){var f;if(n[a].isActive===u)return Promise.resolve();(f=e.variantChildren)==null||f.forEach(d=>{var h;return(h=d.animationState)==null?void 0:h.setActive(a,u)}),n[a].isActive=u;const c=o(a);for(const d in n)n[d].protectedKeys={};return c}return{animateChanges:o,setActive:l,setAnimateFunction:s,getState:()=>n,reset:()=>{n=Zh()}}}function zC(e,t){return typeof t=="string"?t!==e:Array.isArray(t)?!Cx(t,e):!1}function Xn(e=!1){return{isActive:e,protectedKeys:{},needsAnimating:{},prevResolvedValues:{}}}function Zh(){return{animate:Xn(!0),whileInView:Xn(),whileHover:Xn(),whileTap:Xn(),whileDrag:Xn(),whileFocus:Xn(),exit:Xn()}}class Gn{constructor(t){this.isMounted=!1,this.node=t}update(){}}class VC extends Gn{constructor(t){super(t),t.animationState||(t.animationState=FC(t))}updateAnimationControlsSubscription(){const{animate:t}=this.node.getProps();Ml(t)&&(this.unmountControls=t.subscribe(this.node))}mount(){this.updateAnimationControlsSubscription()}update(){const{animate:t}=this.node.getProps(),{animate:n}=this.node.prevProps||{};t!==n&&this.updateAnimationControlsSubscription()}unmount(){var t;this.node.animationState.reset(),(t=this.unmountControls)==null||t.call(this)}}let BC=0;class UC extends Gn{constructor(){super(...arguments),this.id=BC++}update(){if(!this.node.presenceContext)return;const{isPresent:t,onExitComplete:n}=this.node.presenceContext,{isPresent:r}=this.node.prevPresenceContext||{};if(!this.node.animationState||t===r)return;const i=this.node.animationState.setActive("exit",!t);n&&!t&&i.then(()=>{n(this.id)})}mount(){const{register:t,onExitComplete:n}=this.node.presenceContext||{};n&&n(this.id),t&&(this.unmount=t(this.id))}unmount(){}}const $C={animation:{Feature:VC},exit:{Feature:UC}};function Cs(e,t,n,r={passive:!0}){return e.addEventListener(t,n,r),()=>e.removeEventListener(t,n)}function Os(e){return{point:{x:e.pageX,y:e.pageY}}}const HC=e=>t=>Df(t)&&e(t,Os(t));function Yi(e,t,n,r){return Cs(e,t,HC(n),r)}const bx=1e-4,GC=1-bx,WC=1+bx,Tx=.01,KC=0-Tx,YC=0+Tx;function Qe(e){return e.max-e.min}function qC(e,t,n){return Math.abs(e-t)<=n}function Jh(e,t,n,r=.5){e.origin=r,e.originPoint=ve(t.min,t.max,e.origin),e.scale=Qe(n)/Qe(t),e.translate=ve(n.min,n.max,e.origin)-e.originPoint,(e.scale>=GC&&e.scale<=WC||isNaN(e.scale))&&(e.scale=1),(e.translate>=KC&&e.translate<=YC||isNaN(e.translate))&&(e.translate=0)}function qi(e,t,n,r){Jh(e.x,t.x,n.x,r?r.originX:void 0),Jh(e.y,t.y,n.y,r?r.originY:void 0)}function ep(e,t,n){e.min=n.min+t.min,e.max=e.min+Qe(t)}function XC(e,t,n){ep(e.x,t.x,n.x),ep(e.y,t.y,n.y)}function tp(e,t,n){e.min=t.min-n.min,e.max=e.min+Qe(t)}function Xi(e,t,n){tp(e.x,t.x,n.x),tp(e.y,t.y,n.y)}function St(e){return[e("x"),e("y")]}const Ax=({current:e})=>e?e.ownerDocument.defaultView:null,np=(e,t)=>Math.abs(e-t);function QC(e,t){const n=np(e.x,t.x),r=np(e.y,t.y);return Math.sqrt(n**2+r**2)}class Px{constructor(t,n,{transformPagePoint:r,contextWindow:i=window,dragSnapToOrigin:s=!1,distanceThreshold:o=3}={}){if(this.startEvent=null,this.lastMoveEvent=null,this.lastMoveEventInfo=null,this.handlers={},this.contextWindow=window,this.updatePoint=()=>{if(!(this.lastMoveEvent&&this.lastMoveEventInfo))return;const d=ka(this.lastMoveEventInfo,this.history),h=this.startEvent!==null,m=QC(d.offset,{x:0,y:0})>=this.distanceThreshold;if(!h&&!m)return;const{point:x}=d,{timestamp:C}=ze;this.history.push({...x,timestamp:C});const{onStart:p,onMove:g}=this.handlers;h||(p&&p(this.lastMoveEvent,d),this.startEvent=this.lastMoveEvent),g&&g(this.lastMoveEvent,d)},this.handlePointerMove=(d,h)=>{this.lastMoveEvent=d,this.lastMoveEventInfo=wa(h,this.transformPagePoint),ge.update(this.updatePoint,!0)},this.handlePointerUp=(d,h)=>{this.end();const{onEnd:m,onSessionEnd:x,resumeAnimation:C}=this.handlers;if(this.dragSnapToOrigin&&C&&C(),!(this.lastMoveEvent&&this.lastMoveEventInfo))return;const p=ka(d.type==="pointercancel"?this.lastMoveEventInfo:wa(h,this.transformPagePoint),this.history);this.startEvent&&m&&m(d,p),x&&x(d,p)},!Df(t))return;this.dragSnapToOrigin=s,this.handlers=n,this.transformPagePoint=r,this.distanceThreshold=o,this.contextWindow=i||window;const l=Os(t),a=wa(l,this.transformPagePoint),{point:u}=a,{timestamp:c}=ze;this.history=[{...u,timestamp:c}];const{onSessionStart:f}=n;f&&f(t,ka(a,this.history)),this.removeListeners=Ds(Yi(this.contextWindow,"pointermove",this.handlePointerMove),Yi(this.contextWindow,"pointerup",this.handlePointerUp),Yi(this.contextWindow,"pointercancel",this.handlePointerUp))}updateHandlers(t){this.handlers=t}end(){this.removeListeners&&this.removeListeners(),Vn(this.updatePoint)}}function wa(e,t){return t?{point:t(e.point)}:e}function rp(e,t){return{x:e.x-t.x,y:e.y-t.y}}function ka({point:e},t){return{point:e,delta:rp(e,Nx(t)),offset:rp(e,ZC(t)),velocity:JC(t,.1)}}function ZC(e){return e[0]}function Nx(e){return e[e.length-1]}function JC(e,t){if(e.length<2)return{x:0,y:0};let n=e.length-1,r=null;const i=Nx(e);for(;n>=0&&(r=e[n],!(i.timestamp-r.timestamp>Qt(t)));)n--;if(!r)return{x:0,y:0};const s=At(i.timestamp-r.timestamp);if(s===0)return{x:0,y:0};const o={x:(i.x-r.x)/s,y:(i.y-r.y)/s};return o.x===1/0&&(o.x=0),o.y===1/0&&(o.y=0),o}function eE(e,{min:t,max:n},r){return t!==void 0&&e<t?e=r?ve(t,e,r.min):Math.max(e,t):n!==void 0&&e>n&&(e=r?ve(n,e,r.max):Math.min(e,n)),e}function ip(e,t,n){return{min:t!==void 0?e.min+t:void 0,max:n!==void 0?e.max+n-(e.max-e.min):void 0}}function tE(e,{top:t,left:n,bottom:r,right:i}){return{x:ip(e.x,n,i),y:ip(e.y,t,r)}}function sp(e,t){let n=t.min-e.min,r=t.max-e.max;return t.max-t.min<e.max-e.min&&([n,r]=[r,n]),{min:n,max:r}}function nE(e,t){return{x:sp(e.x,t.x),y:sp(e.y,t.y)}}function rE(e,t){let n=.5;const r=Qe(e),i=Qe(t);return i>r?n=xs(t.min,t.max-r,e.min):r>i&&(n=xs(e.min,e.max-i,t.min)),mn(0,1,n)}function iE(e,t){const n={};return t.min!==void 0&&(n.min=t.min-e.min),t.max!==void 0&&(n.max=t.max-e.min),n}const ec=.35;function sE(e=ec){return e===!1?e=0:e===!0&&(e=ec),{x:op(e,"left","right"),y:op(e,"top","bottom")}}function op(e,t,n){return{min:lp(e,t),max:lp(e,n)}}function lp(e,t){return typeof e=="number"?e:e[t]||0}const oE=new WeakMap;class lE{constructor(t){this.openDragLock=null,this.isDragging=!1,this.currentDirection=null,this.originPoint={x:0,y:0},this.constraints=!1,this.hasMutatedConstraints=!1,this.elastic=be(),this.latestPointerEvent=null,this.latestPanInfo=null,this.visualElement=t}start(t,{snapToCursor:n=!1,distanceThreshold:r}={}){const{presenceContext:i}=this.visualElement;if(i&&i.isPresent===!1)return;const s=f=>{const{dragSnapToOrigin:d}=this.getProps();d?this.pauseAnimation():this.stopAnimation(),n&&this.snapToCursor(Os(f).point)},o=(f,d)=>{const{drag:h,dragPropagation:m,onDragStart:x}=this.getProps();if(h&&!m&&(this.openDragLock&&this.openDragLock(),this.openDragLock=h2(h),!this.openDragLock))return;this.latestPointerEvent=f,this.latestPanInfo=d,this.isDragging=!0,this.currentDirection=null,this.resolveConstraints(),this.visualElement.projection&&(this.visualElement.projection.isAnimationBlocked=!0,this.visualElement.projection.target=void 0),St(p=>{let g=this.getAxisMotionValue(p).get()||0;if(Zt.test(g)){const{projection:y}=this.visualElement;if(y&&y.layout){const b=y.layout.layoutBox[p];b&&(g=Qe(b)*(parseFloat(g)/100))}}this.originPoint[p]=g}),x&&ge.postRender(()=>x(f,d)),Zu(this.visualElement,"transform");const{animationState:C}=this.visualElement;C&&C.setActive("whileDrag",!0)},l=(f,d)=>{this.latestPointerEvent=f,this.latestPanInfo=d;const{dragPropagation:h,dragDirectionLock:m,onDirectionLock:x,onDrag:C}=this.getProps();if(!h&&!this.openDragLock)return;const{offset:p}=d;if(m&&this.currentDirection===null){this.currentDirection=aE(p),this.currentDirection!==null&&x&&x(this.currentDirection);return}this.updateAxis("x",d.point,p),this.updateAxis("y",d.point,p),this.visualElement.render(),C&&C(f,d)},a=(f,d)=>{this.latestPointerEvent=f,this.latestPanInfo=d,this.stop(f,d),this.latestPointerEvent=null,this.latestPanInfo=null},u=()=>St(f=>{var d;return this.getAnimationState(f)==="paused"&&((d=this.getAxisMotionValue(f).animation)==null?void 0:d.play())}),{dragSnapToOrigin:c}=this.getProps();this.panSession=new Px(t,{onSessionStart:s,onStart:o,onMove:l,onSessionEnd:a,resumeAnimation:u},{transformPagePoint:this.visualElement.getTransformPagePoint(),dragSnapToOrigin:c,distanceThreshold:r,contextWindow:Ax(this.visualElement)})}stop(t,n){const r=t||this.latestPointerEvent,i=n||this.latestPanInfo,s=this.isDragging;if(this.cancel(),!s||!i||!r)return;const{velocity:o}=i;this.startAnimation(o);const{onDragEnd:l}=this.getProps();l&&ge.postRender(()=>l(r,i))}cancel(){this.isDragging=!1;const{projection:t,animationState:n}=this.visualElement;t&&(t.isAnimationBlocked=!1),this.panSession&&this.panSession.end(),this.panSession=void 0;const{dragPropagation:r}=this.getProps();!r&&this.openDragLock&&(this.openDragLock(),this.openDragLock=null),n&&n.setActive("whileDrag",!1)}updateAxis(t,n,r){const{drag:i}=this.getProps();if(!r||!lo(t,i,this.currentDirection))return;const s=this.getAxisMotionValue(t);let o=this.originPoint[t]+r[t];this.constraints&&this.constraints[t]&&(o=eE(o,this.constraints[t],this.elastic[t])),s.set(o)}resolveConstraints(){var s;const{dragConstraints:t,dragElastic:n}=this.getProps(),r=this.visualElement.projection&&!this.visualElement.projection.layout?this.visualElement.projection.measure(!1):(s=this.visualElement.projection)==null?void 0:s.layout,i=this.constraints;t&&Br(t)?this.constraints||(this.constraints=this.resolveRefConstraints()):t&&r?this.constraints=tE(r.layoutBox,t):this.constraints=!1,this.elastic=sE(n),i!==this.constraints&&r&&this.constraints&&!this.hasMutatedConstraints&&St(o=>{this.constraints!==!1&&this.getAxisMotionValue(o)&&(this.constraints[o]=iE(r.layoutBox[o],this.constraints[o]))})}resolveRefConstraints(){const{dragConstraints:t,onMeasureDragConstraints:n}=this.getProps();if(!t||!Br(t))return!1;const r=t.current,{projection:i}=this.visualElement;if(!i||!i.layout)return!1;const s=uC(r,i.root,this.visualElement.getTransformPagePoint());let o=nE(i.layout.layoutBox,s);if(n){const l=n(oC(o));this.hasMutatedConstraints=!!l,l&&(o=dx(l))}return o}startAnimation(t){const{drag:n,dragMomentum:r,dragElastic:i,dragTransition:s,dragSnapToOrigin:o,onDragTransitionEnd:l}=this.getProps(),a=this.constraints||{},u=St(c=>{if(!lo(c,n,this.currentDirection))return;let f=a&&a[c]||{};o&&(f={min:0,max:0});const d=i?200:1e6,h=i?40:1e7,m={type:"inertia",velocity:r?t[c]:0,bounceStiffness:d,bounceDamping:h,timeConstant:750,restDelta:1,restSpeed:10,...s,...f};return this.startAxisValueAnimation(c,m)});return Promise.all(u).then(l)}startAxisValueAnimation(t,n){const r=this.getAxisMotionValue(t);return Zu(this.visualElement,t),r.start($f(t,r,0,n,this.visualElement,!1))}stopAnimation(){St(t=>this.getAxisMotionValue(t).stop())}pauseAnimation(){St(t=>{var n;return(n=this.getAxisMotionValue(t).animation)==null?void 0:n.pause()})}getAnimationState(t){var n;return(n=this.getAxisMotionValue(t).animation)==null?void 0:n.state}getAxisMotionValue(t){const n=`_drag${t.toUpperCase()}`,r=this.visualElement.getProps(),i=r[n];return i||this.visualElement.getValue(t,(r.initial?r.initial[t]:void 0)||0)}snapToCursor(t){St(n=>{const{drag:r}=this.getProps();if(!lo(n,r,this.currentDirection))return;const{projection:i}=this.visualElement,s=this.getAxisMotionValue(n);if(i&&i.layout){const{min:o,max:l}=i.layout.layoutBox[n];s.set(t[n]-ve(o,l,.5))}})}scalePositionWithinConstraints(){if(!this.visualElement.current)return;const{drag:t,dragConstraints:n}=this.getProps(),{projection:r}=this.visualElement;if(!Br(n)||!r||!this.constraints)return;this.stopAnimation();const i={x:0,y:0};St(o=>{const l=this.getAxisMotionValue(o);if(l&&this.constraints!==!1){const a=l.get();i[o]=rE({min:a,max:a},this.constraints[o])}});const{transformTemplate:s}=this.visualElement.getProps();this.visualElement.current.style.transform=s?s({},""):"none",r.root&&r.root.updateScroll(),r.updateLayout(),this.resolveConstraints(),St(o=>{if(!lo(o,t,null))return;const l=this.getAxisMotionValue(o),{min:a,max:u}=this.constraints[o];l.set(ve(a,u,i[o]))})}addListeners(){if(!this.visualElement.current)return;oE.set(this.visualElement,this);const t=this.visualElement.current,n=Yi(t,"pointerdown",a=>{const{drag:u,dragListener:c=!0}=this.getProps();u&&c&&this.start(a)}),r=()=>{const{dragConstraints:a}=this.getProps();Br(a)&&a.current&&(this.constraints=this.resolveRefConstraints())},{projection:i}=this.visualElement,s=i.addEventListener("measure",r);i&&!i.layout&&(i.root&&i.root.updateScroll(),i.updateLayout()),ge.read(r);const o=Cs(window,"resize",()=>this.scalePositionWithinConstraints()),l=i.addEventListener("didUpdate",({delta:a,hasLayoutChanged:u})=>{this.isDragging&&u&&(St(c=>{const f=this.getAxisMotionValue(c);f&&(this.originPoint[c]+=a[c].translate,f.set(f.get()+a[c].translate))}),this.visualElement.render())});return()=>{o(),n(),s(),l&&l()}}getProps(){const t=this.visualElement.getProps(),{drag:n=!1,dragDirectionLock:r=!1,dragPropagation:i=!1,dragConstraints:s=!1,dragElastic:o=ec,dragMomentum:l=!0}=t;return{...t,drag:n,dragDirectionLock:r,dragPropagation:i,dragConstraints:s,dragElastic:o,dragMomentum:l}}}function lo(e,t,n){return(t===!0||t===e)&&(n===null||n===e)}function aE(e,t=10){let n=null;return Math.abs(e.y)>t?n="y":Math.abs(e.x)>t&&(n="x"),n}class uE extends Gn{constructor(t){super(t),this.removeGroupControls=Nt,this.removeListeners=Nt,this.controls=new lE(t)}mount(){const{dragControls:t}=this.node.getProps();t&&(this.removeGroupControls=t.subscribe(this.controls)),this.removeListeners=this.controls.addListeners()||Nt}unmount(){this.removeGroupControls(),this.removeListeners()}}const ap=e=>(t,n)=>{e&&ge.postRender(()=>e(t,n))};class cE extends Gn{constructor(){super(...arguments),this.removePointerDownListener=Nt}onPointerDown(t){this.session=new Px(t,this.createPanHandlers(),{transformPagePoint:this.node.getTransformPagePoint(),contextWindow:Ax(this.node)})}createPanHandlers(){const{onPanSessionStart:t,onPanStart:n,onPan:r,onPanEnd:i}=this.node.getProps();return{onSessionStart:ap(t),onStart:ap(n),onMove:r,onEnd:(s,o)=>{delete this.session,i&&ge.postRender(()=>i(s,o))}}}mount(){this.removePointerDownListener=Yi(this.node.current,"pointerdown",t=>this.onPointerDown(t))}update(){this.session&&this.session.updateHandlers(this.createPanHandlers())}unmount(){this.removePointerDownListener(),this.session&&this.session.end()}}const No={hasAnimatedSinceResize:!0,hasEverUpdated:!1};function up(e,t){return t.max===t.min?0:e/(t.max-t.min)*100}const Pi={correct:(e,t)=>{if(!t.target)return e;if(typeof e=="string")if($.test(e))e=parseFloat(e);else return e;const n=up(e,t.target.x),r=up(e,t.target.y);return`${n}% ${r}%`}},fE={correct:(e,{treeScale:t,projectionDelta:n})=>{const r=e,i=Bn.parse(e);if(i.length>5)return r;const s=Bn.createTransformer(e),o=typeof i[0]!="number"?1:0,l=n.x.scale*t.x,a=n.y.scale*t.y;i[0+o]/=l,i[1+o]/=a;const u=ve(l,a,.5);return typeof i[2+o]=="number"&&(i[2+o]/=u),typeof i[3+o]=="number"&&(i[3+o]/=u),s(i)}};let Sa=!1;class dE extends I.Component{componentDidMount(){const{visualElement:t,layoutGroup:n,switchLayoutGroup:r,layoutId:i}=this.props,{projection:s}=t;L2(hE),s&&(n.group&&n.group.add(s),r&&r.register&&i&&r.register(s),Sa&&s.root.didUpdate(),s.addEventListener("animationComplete",()=>{this.safeToRemove()}),s.setOptions({...s.options,onExitComplete:()=>this.safeToRemove()})),No.hasEverUpdated=!0}getSnapshotBeforeUpdate(t){const{layoutDependency:n,visualElement:r,drag:i,isPresent:s}=this.props,{projection:o}=r;return o&&(o.isPresent=s,Sa=!0,i||t.layoutDependency!==n||n===void 0||t.isPresent!==s?o.willUpdate():this.safeToRemove(),t.isPresent!==s&&(s?o.promote():o.relegate()||ge.postRender(()=>{const l=o.getStack();(!l||!l.members.length)&&this.safeToRemove()}))),null}componentDidUpdate(){const{projection:t}=this.props.visualElement;t&&(t.root.didUpdate(),Rf.postRender(()=>{!t.currentAnimation&&t.isLead()&&this.safeToRemove()}))}componentWillUnmount(){const{visualElement:t,layoutGroup:n,switchLayoutGroup:r}=this.props,{projection:i}=t;Sa=!0,i&&(i.scheduleCheckAfterUnmount(),n&&n.group&&n.group.remove(i),r&&r.deregister&&r.deregister(i))}safeToRemove(){const{safeToRemove:t}=this.props;t&&t()}render(){return null}}function Ix(e){const[t,n]=Z0(),r=I.useContext(cf);return v.jsx(dE,{...e,layoutGroup:r,switchLayoutGroup:I.useContext(cx),isPresent:t,safeToRemove:n})}const hE={borderRadius:{...Pi,applyTo:["borderTopLeftRadius","borderTopRightRadius","borderBottomLeftRadius","borderBottomRightRadius"]},borderTopLeftRadius:Pi,borderTopRightRadius:Pi,borderBottomLeftRadius:Pi,borderBottomRightRadius:Pi,boxShadow:fE};function pE(e,t,n){const r=Ge(e)?e:li(e);return r.start($f("",r,t,n)),r.animation}const mE=(e,t)=>e.depth-t.depth;class gE{constructor(){this.children=[],this.isDirty=!1}add(t){hf(this.children,t),this.isDirty=!0}remove(t){pf(this.children,t),this.isDirty=!0}forEach(t){this.isDirty&&this.children.sort(mE),this.isDirty=!1,this.children.forEach(t)}}function yE(e,t){const n=st.now(),r=({timestamp:i})=>{const s=i-n;s>=t&&(Vn(r),e(s-t))};return ge.setup(r,!0),()=>Vn(r)}const Mx=["TopLeft","TopRight","BottomLeft","BottomRight"],xE=Mx.length,cp=e=>typeof e=="string"?parseFloat(e):e,fp=e=>typeof e=="number"||$.test(e);function vE(e,t,n,r,i,s){i?(e.opacity=ve(0,n.opacity??1,wE(r)),e.opacityExit=ve(t.opacity??1,0,kE(r))):s&&(e.opacity=ve(t.opacity??1,n.opacity??1,r));for(let o=0;o<xE;o++){const l=`border${Mx[o]}Radius`;let a=dp(t,l),u=dp(n,l);if(a===void 0&&u===void 0)continue;a||(a=0),u||(u=0),a===0||u===0||fp(a)===fp(u)?(e[l]=Math.max(ve(cp(a),cp(u),r),0),(Zt.test(u)||Zt.test(a))&&(e[l]+="%")):e[l]=u}(t.rotate||n.rotate)&&(e.rotate=ve(t.rotate||0,n.rotate||0,r))}function dp(e,t){return e[t]!==void 0?e[t]:e.borderRadius}const wE=Rx(0,.5,x0),kE=Rx(.5,.95,Nt);function Rx(e,t,n){return r=>r<e?0:r>t?1:n(xs(e,t,r))}function hp(e,t){e.min=t.min,e.max=t.max}function kt(e,t){hp(e.x,t.x),hp(e.y,t.y)}function pp(e,t){e.translate=t.translate,e.scale=t.scale,e.originPoint=t.originPoint,e.origin=t.origin}function mp(e,t,n,r,i){return e-=t,e=al(e,1/n,r),i!==void 0&&(e=al(e,1/i,r)),e}function SE(e,t=0,n=1,r=.5,i,s=e,o=e){if(Zt.test(t)&&(t=parseFloat(t),t=ve(o.min,o.max,t/100)-o.min),typeof t!="number")return;let l=ve(s.min,s.max,r);e===s&&(l-=t),e.min=mp(e.min,t,n,l,i),e.max=mp(e.max,t,n,l,i)}function gp(e,t,[n,r,i],s,o){SE(e,t[n],t[r],t[i],t.scale,s,o)}const CE=["x","scaleX","originX"],EE=["y","scaleY","originY"];function yp(e,t,n,r){gp(e.x,t,CE,n?n.x:void 0,r?r.x:void 0),gp(e.y,t,EE,n?n.y:void 0,r?r.y:void 0)}function xp(e){return e.translate===0&&e.scale===1}function Dx(e){return xp(e.x)&&xp(e.y)}function vp(e,t){return e.min===t.min&&e.max===t.max}function bE(e,t){return vp(e.x,t.x)&&vp(e.y,t.y)}function wp(e,t){return Math.round(e.min)===Math.round(t.min)&&Math.round(e.max)===Math.round(t.max)}function Lx(e,t){return wp(e.x,t.x)&&wp(e.y,t.y)}function kp(e){return Qe(e.x)/Qe(e.y)}function Sp(e,t){return e.translate===t.translate&&e.scale===t.scale&&e.originPoint===t.originPoint}class TE{constructor(){this.members=[]}add(t){hf(this.members,t),t.scheduleRender()}remove(t){if(pf(this.members,t),t===this.prevLead&&(this.prevLead=void 0),t===this.lead){const n=this.members[this.members.length-1];n&&this.promote(n)}}relegate(t){const n=this.members.findIndex(i=>t===i);if(n===0)return!1;let r;for(let i=n;i>=0;i--){const s=this.members[i];if(s.isPresent!==!1){r=s;break}}return r?(this.promote(r),!0):!1}promote(t,n){const r=this.lead;if(t!==r&&(this.prevLead=r,this.lead=t,t.show(),r)){r.instance&&r.scheduleRender(),t.scheduleRender(),t.resumeFrom=r,n&&(t.resumeFrom.preserveOpacity=!0),r.snapshot&&(t.snapshot=r.snapshot,t.snapshot.latestValues=r.animationValues||r.latestValues),t.root&&t.root.isUpdating&&(t.isLayoutDirty=!0);const{crossfade:i}=t.options;i===!1&&r.hide()}}exitAnimationComplete(){this.members.forEach(t=>{const{options:n,resumingFrom:r}=t;n.onExitComplete&&n.onExitComplete(),r&&r.options.onExitComplete&&r.options.onExitComplete()})}scheduleRender(){this.members.forEach(t=>{t.instance&&t.scheduleRender(!1)})}removeLeadSnapshot(){this.lead&&this.lead.snapshot&&(this.lead.snapshot=void 0)}}function AE(e,t,n){let r="";const i=e.x.translate/t.x,s=e.y.translate/t.y,o=(n==null?void 0:n.z)||0;if((i||s||o)&&(r=`translate3d(${i}px, ${s}px, ${o}px) `),(t.x!==1||t.y!==1)&&(r+=`scale(${1/t.x}, ${1/t.y}) `),n){const{transformPerspective:u,rotate:c,rotateX:f,rotateY:d,skewX:h,skewY:m}=n;u&&(r=`perspective(${u}px) ${r}`),c&&(r+=`rotate(${c}deg) `),f&&(r+=`rotateX(${f}deg) `),d&&(r+=`rotateY(${d}deg) `),h&&(r+=`skewX(${h}deg) `),m&&(r+=`skewY(${m}deg) `)}const l=e.x.scale*t.x,a=e.y.scale*t.y;return(l!==1||a!==1)&&(r+=`scale(${l}, ${a})`),r||"none"}const Ca=["","X","Y","Z"],PE=1e3;let NE=0;function Ea(e,t,n,r){const{latestValues:i}=t;i[e]&&(n[e]=i[e],t.setStaticValue(e,0),r&&(r[e]=0))}function _x(e){if(e.hasCheckedOptimisedAppear=!0,e.root===e)return;const{visualElement:t}=e.options;if(!t)return;const n=wx(t);if(window.MotionHasOptimisedAnimation(n,"transform")){const{layout:i,layoutId:s}=e.options;window.MotionCancelOptimisedAnimation(n,"transform",ge,!(i||s))}const{parent:r}=e;r&&!r.hasCheckedOptimisedAppear&&_x(r)}function Ox({attachResizeListener:e,defaultParent:t,measureScroll:n,checkIsScrollRoot:r,resetTransform:i}){return class{constructor(o={},l=t==null?void 0:t()){this.id=NE++,this.animationId=0,this.animationCommitId=0,this.children=new Set,this.options={},this.isTreeAnimating=!1,this.isAnimationBlocked=!1,this.isLayoutDirty=!1,this.isProjectionDirty=!1,this.isSharedProjectionDirty=!1,this.isTransformDirty=!1,this.updateManuallyBlocked=!1,this.updateBlockedByResize=!1,this.isUpdating=!1,this.isSVG=!1,this.needsReset=!1,this.shouldResetTransform=!1,this.hasCheckedOptimisedAppear=!1,this.treeScale={x:1,y:1},this.eventHandlers=new Map,this.hasTreeAnimated=!1,this.updateScheduled=!1,this.scheduleUpdate=()=>this.update(),this.projectionUpdateScheduled=!1,this.checkUpdateFailed=()=>{this.isUpdating&&(this.isUpdating=!1,this.clearAllSnapshots())},this.updateProjection=()=>{this.projectionUpdateScheduled=!1,this.nodes.forEach(RE),this.nodes.forEach(OE),this.nodes.forEach(jE),this.nodes.forEach(DE)},this.resolvedRelativeTargetAt=0,this.hasProjected=!1,this.isVisible=!0,this.animationProgress=0,this.sharedNodes=new Map,this.latestValues=o,this.root=l?l.root||l:this,this.path=l?[...l.path,l]:[],this.parent=l,this.depth=l?l.depth+1:0;for(let a=0;a<this.path.length;a++)this.path[a].shouldResetTransform=!0;this.root===this&&(this.nodes=new gE)}addEventListener(o,l){return this.eventHandlers.has(o)||this.eventHandlers.set(o,new yf),this.eventHandlers.get(o).add(l)}notifyListeners(o,...l){const a=this.eventHandlers.get(o);a&&a.notify(...l)}hasListeners(o){return this.eventHandlers.has(o)}mount(o){if(this.instance)return;this.isSVG=Q0(o)&&!v2(o),this.instance=o;const{layoutId:l,layout:a,visualElement:u}=this.options;if(u&&!u.current&&u.mount(o),this.root.nodes.add(this),this.parent&&this.parent.children.add(this),this.root.hasTreeAnimated&&(a||l)&&(this.isLayoutDirty=!0),e){let c,f=0;const d=()=>this.root.updateBlockedByResize=!1;ge.read(()=>{f=window.innerWidth}),e(o,()=>{const h=window.innerWidth;h!==f&&(f=h,this.root.updateBlockedByResize=!0,c&&c(),c=yE(d,250),No.hasAnimatedSinceResize&&(No.hasAnimatedSinceResize=!1,this.nodes.forEach(bp)))})}l&&this.root.registerSharedNode(l,this),this.options.animate!==!1&&u&&(l||a)&&this.addEventListener("didUpdate",({delta:c,hasLayoutChanged:f,hasRelativeLayoutChanged:d,layout:h})=>{if(this.isTreeAnimationBlocked()){this.target=void 0,this.relativeTarget=void 0;return}const m=this.options.transition||u.getDefaultTransition()||UE,{onLayoutAnimationStart:x,onLayoutAnimationComplete:C}=u.getProps(),p=!this.targetLayout||!Lx(this.targetLayout,h),g=!f&&d;if(this.options.layoutRoot||this.resumeFrom||g||f&&(p||!this.currentAnimation)){this.resumeFrom&&(this.resumingFrom=this.resumeFrom,this.resumingFrom.resumingFrom=void 0);const y={...If(m,"layout"),onPlay:x,onComplete:C};(u.shouldReduceMotion||this.options.layoutRoot)&&(y.delay=0,y.type=!1),this.startAnimation(y),this.setAnimationOrigin(c,g)}else f||bp(this),this.isLead()&&this.options.onExitComplete&&this.options.onExitComplete();this.targetLayout=h})}unmount(){this.options.layoutId&&this.willUpdate(),this.root.nodes.remove(this);const o=this.getStack();o&&o.remove(this),this.parent&&this.parent.children.delete(this),this.instance=void 0,this.eventHandlers.clear(),Vn(this.updateProjection)}blockUpdate(){this.updateManuallyBlocked=!0}unblockUpdate(){this.updateManuallyBlocked=!1}isUpdateBlocked(){return this.updateManuallyBlocked||this.updateBlockedByResize}isTreeAnimationBlocked(){return this.isAnimationBlocked||this.parent&&this.parent.isTreeAnimationBlocked()||!1}startUpdate(){this.isUpdateBlocked()||(this.isUpdating=!0,this.nodes&&this.nodes.forEach(FE),this.animationId++)}getTransformTemplate(){const{visualElement:o}=this.options;return o&&o.getProps().transformTemplate}willUpdate(o=!0){if(this.root.hasTreeAnimated=!0,this.root.isUpdateBlocked()){this.options.onExitComplete&&this.options.onExitComplete();return}if(window.MotionCancelOptimisedAnimation&&!this.hasCheckedOptimisedAppear&&_x(this),!this.root.isUpdating&&this.root.startUpdate(),this.isLayoutDirty)return;this.isLayoutDirty=!0;for(let c=0;c<this.path.length;c++){const f=this.path[c];f.shouldResetTransform=!0,f.updateScroll("snapshot"),f.options.layoutRoot&&f.willUpdate(!1)}const{layoutId:l,layout:a}=this.options;if(l===void 0&&!a)return;const u=this.getTransformTemplate();this.prevTransformTemplateValue=u?u(this.latestValues,""):void 0,this.updateSnapshot(),o&&this.notifyListeners("willUpdate")}update(){if(this.updateScheduled=!1,this.isUpdateBlocked()){this.unblockUpdate(),this.clearAllSnapshots(),this.nodes.forEach(Cp);return}if(this.animationId<=this.animationCommitId){this.nodes.forEach(Ep);return}this.animationCommitId=this.animationId,this.isUpdating?(this.isUpdating=!1,this.nodes.forEach(_E),this.nodes.forEach(IE),this.nodes.forEach(ME)):this.nodes.forEach(Ep),this.clearAllSnapshots();const l=st.now();ze.delta=mn(0,1e3/60,l-ze.timestamp),ze.timestamp=l,ze.isProcessing=!0,da.update.process(ze),da.preRender.process(ze),da.render.process(ze),ze.isProcessing=!1}didUpdate(){this.updateScheduled||(this.updateScheduled=!0,Rf.read(this.scheduleUpdate))}clearAllSnapshots(){this.nodes.forEach(LE),this.sharedNodes.forEach(zE)}scheduleUpdateProjection(){this.projectionUpdateScheduled||(this.projectionUpdateScheduled=!0,ge.preRender(this.updateProjection,!1,!0))}scheduleCheckAfterUnmount(){ge.postRender(()=>{this.isLayoutDirty?this.root.didUpdate():this.root.checkUpdateFailed()})}updateSnapshot(){this.snapshot||!this.instance||(this.snapshot=this.measure(),this.snapshot&&!Qe(this.snapshot.measuredBox.x)&&!Qe(this.snapshot.measuredBox.y)&&(this.snapshot=void 0))}updateLayout(){if(!this.instance||(this.updateScroll(),!(this.options.alwaysMeasureLayout&&this.isLead())&&!this.isLayoutDirty))return;if(this.resumeFrom&&!this.resumeFrom.instance)for(let a=0;a<this.path.length;a++)this.path[a].updateScroll();const o=this.layout;this.layout=this.measure(!1),this.layoutCorrected=be(),this.isLayoutDirty=!1,this.projectionDelta=void 0,this.notifyListeners("measure",this.layout.layoutBox);const{visualElement:l}=this.options;l&&l.notify("LayoutMeasure",this.layout.layoutBox,o?o.layoutBox:void 0)}updateScroll(o="measure"){let l=!!(this.options.layoutScroll&&this.instance);if(this.scroll&&this.scroll.animationId===this.root.animationId&&this.scroll.phase===o&&(l=!1),l&&this.instance){const a=r(this.instance);this.scroll={animationId:this.root.animationId,phase:o,isRoot:a,offset:n(this.instance),wasRoot:this.scroll?this.scroll.isRoot:a}}}resetTransform(){if(!i)return;const o=this.isLayoutDirty||this.shouldResetTransform||this.options.alwaysMeasureLayout,l=this.projectionDelta&&!Dx(this.projectionDelta),a=this.getTransformTemplate(),u=a?a(this.latestValues,""):void 0,c=u!==this.prevTransformTemplateValue;o&&this.instance&&(l||er(this.latestValues)||c)&&(i(this.instance,u),this.shouldResetTransform=!1,this.scheduleRender())}measure(o=!0){const l=this.measurePageBox();let a=this.removeElementScroll(l);return o&&(a=this.removeTransform(a)),$E(a),{animationId:this.root.animationId,measuredBox:l,layoutBox:a,latestValues:{},source:this.id}}measurePageBox(){var u;const{visualElement:o}=this.options;if(!o)return be();const l=o.measureViewportBox();if(!(((u=this.scroll)==null?void 0:u.wasRoot)||this.path.some(HE))){const{scroll:c}=this.root;c&&(Ur(l.x,c.offset.x),Ur(l.y,c.offset.y))}return l}removeElementScroll(o){var a;const l=be();if(kt(l,o),(a=this.scroll)!=null&&a.wasRoot)return l;for(let u=0;u<this.path.length;u++){const c=this.path[u],{scroll:f,options:d}=c;c!==this.root&&f&&d.layoutScroll&&(f.wasRoot&&kt(l,o),Ur(l.x,f.offset.x),Ur(l.y,f.offset.y))}return l}applyTransform(o,l=!1){const a=be();kt(a,o);for(let u=0;u<this.path.length;u++){const c=this.path[u];!l&&c.options.layoutScroll&&c.scroll&&c!==c.root&&$r(a,{x:-c.scroll.offset.x,y:-c.scroll.offset.y}),er(c.latestValues)&&$r(a,c.latestValues)}return er(this.latestValues)&&$r(a,this.latestValues),a}removeTransform(o){const l=be();kt(l,o);for(let a=0;a<this.path.length;a++){const u=this.path[a];if(!u.instance||!er(u.latestValues))continue;Yu(u.latestValues)&&u.updateSnapshot();const c=be(),f=u.measurePageBox();kt(c,f),yp(l,u.latestValues,u.snapshot?u.snapshot.layoutBox:void 0,c)}return er(this.latestValues)&&yp(l,this.latestValues),l}setTargetDelta(o){this.targetDelta=o,this.root.scheduleUpdateProjection(),this.isProjectionDirty=!0}setOptions(o){this.options={...this.options,...o,crossfade:o.crossfade!==void 0?o.crossfade:!0}}clearMeasurements(){this.scroll=void 0,this.layout=void 0,this.snapshot=void 0,this.prevTransformTemplateValue=void 0,this.targetDelta=void 0,this.target=void 0,this.isLayoutDirty=!1}forceRelativeParentToResolveTarget(){this.relativeParent&&this.relativeParent.resolvedRelativeTargetAt!==ze.timestamp&&this.relativeParent.resolveTargetDelta(!0)}resolveTargetDelta(o=!1){var d;const l=this.getLead();this.isProjectionDirty||(this.isProjectionDirty=l.isProjectionDirty),this.isTransformDirty||(this.isTransformDirty=l.isTransformDirty),this.isSharedProjectionDirty||(this.isSharedProjectionDirty=l.isSharedProjectionDirty);const a=!!this.resumingFrom||this!==l;if(!(o||a&&this.isSharedProjectionDirty||this.isProjectionDirty||(d=this.parent)!=null&&d.isProjectionDirty||this.attemptToResolveRelativeTarget||this.root.updateBlockedByResize))return;const{layout:c,layoutId:f}=this.options;if(!(!this.layout||!(c||f))){if(this.resolvedRelativeTargetAt=ze.timestamp,!this.targetDelta&&!this.relativeTarget){const h=this.getClosestProjectingParent();h&&h.layout&&this.animationProgress!==1?(this.relativeParent=h,this.forceRelativeParentToResolveTarget(),this.relativeTarget=be(),this.relativeTargetOrigin=be(),Xi(this.relativeTargetOrigin,this.layout.layoutBox,h.layout.layoutBox),kt(this.relativeTarget,this.relativeTargetOrigin)):this.relativeParent=this.relativeTarget=void 0}if(!(!this.relativeTarget&&!this.targetDelta)&&(this.target||(this.target=be(),this.targetWithTransforms=be()),this.relativeTarget&&this.relativeTargetOrigin&&this.relativeParent&&this.relativeParent.target?(this.forceRelativeParentToResolveTarget(),XC(this.target,this.relativeTarget,this.relativeParent.target)):this.targetDelta?(this.resumingFrom?this.target=this.applyTransform(this.layout.layoutBox):kt(this.target,this.layout.layoutBox),px(this.target,this.targetDelta)):kt(this.target,this.layout.layoutBox),this.attemptToResolveRelativeTarget)){this.attemptToResolveRelativeTarget=!1;const h=this.getClosestProjectingParent();h&&!!h.resumingFrom==!!this.resumingFrom&&!h.options.layoutScroll&&h.target&&this.animationProgress!==1?(this.relativeParent=h,this.forceRelativeParentToResolveTarget(),this.relativeTarget=be(),this.relativeTargetOrigin=be(),Xi(this.relativeTargetOrigin,this.target,h.target),kt(this.relativeTarget,this.relativeTargetOrigin)):this.relativeParent=this.relativeTarget=void 0}}}getClosestProjectingParent(){if(!(!this.parent||Yu(this.parent.latestValues)||hx(this.parent.latestValues)))return this.parent.isProjecting()?this.parent:this.parent.getClosestProjectingParent()}isProjecting(){return!!((this.relativeTarget||this.targetDelta||this.options.layoutRoot)&&this.layout)}calcProjection(){var m;const o=this.getLead(),l=!!this.resumingFrom||this!==o;let a=!0;if((this.isProjectionDirty||(m=this.parent)!=null&&m.isProjectionDirty)&&(a=!1),l&&(this.isSharedProjectionDirty||this.isTransformDirty)&&(a=!1),this.resolvedRelativeTargetAt===ze.timestamp&&(a=!1),a)return;const{layout:u,layoutId:c}=this.options;if(this.isTreeAnimating=!!(this.parent&&this.parent.isTreeAnimating||this.currentAnimation||this.pendingAnimation),this.isTreeAnimating||(this.targetDelta=this.relativeTarget=void 0),!this.layout||!(u||c))return;kt(this.layoutCorrected,this.layout.layoutBox);const f=this.treeScale.x,d=this.treeScale.y;aC(this.layoutCorrected,this.treeScale,this.path,l),o.layout&&!o.target&&(this.treeScale.x!==1||this.treeScale.y!==1)&&(o.target=o.layout.layoutBox,o.targetWithTransforms=be());const{target:h}=o;if(!h){this.prevProjectionDelta&&(this.createProjectionDeltas(),this.scheduleRender());return}!this.projectionDelta||!this.prevProjectionDelta?this.createProjectionDeltas():(pp(this.prevProjectionDelta.x,this.projectionDelta.x),pp(this.prevProjectionDelta.y,this.projectionDelta.y)),qi(this.projectionDelta,this.layoutCorrected,h,this.latestValues),(this.treeScale.x!==f||this.treeScale.y!==d||!Sp(this.projectionDelta.x,this.prevProjectionDelta.x)||!Sp(this.projectionDelta.y,this.prevProjectionDelta.y))&&(this.hasProjected=!0,this.scheduleRender(),this.notifyListeners("projectionUpdate",h))}hide(){this.isVisible=!1}show(){this.isVisible=!0}scheduleRender(o=!0){var l;if((l=this.options.visualElement)==null||l.scheduleRender(),o){const a=this.getStack();a&&a.scheduleRender()}this.resumingFrom&&!this.resumingFrom.instance&&(this.resumingFrom=void 0)}createProjectionDeltas(){this.prevProjectionDelta=Hr(),this.projectionDelta=Hr(),this.projectionDeltaWithTransform=Hr()}setAnimationOrigin(o,l=!1){const a=this.snapshot,u=a?a.latestValues:{},c={...this.latestValues},f=Hr();(!this.relativeParent||!this.relativeParent.options.layoutRoot)&&(this.relativeTarget=this.relativeTargetOrigin=void 0),this.attemptToResolveRelativeTarget=!l;const d=be(),h=a?a.source:void 0,m=this.layout?this.layout.source:void 0,x=h!==m,C=this.getStack(),p=!C||C.members.length<=1,g=!!(x&&!p&&this.options.crossfade===!0&&!this.path.some(BE));this.animationProgress=0;let y;this.mixTargetDelta=b=>{const T=b/1e3;Tp(f.x,o.x,T),Tp(f.y,o.y,T),this.setTargetDelta(f),this.relativeTarget&&this.relativeTargetOrigin&&this.layout&&this.relativeParent&&this.relativeParent.layout&&(Xi(d,this.layout.layoutBox,this.relativeParent.layout.layoutBox),VE(this.relativeTarget,this.relativeTargetOrigin,d,T),y&&bE(this.relativeTarget,y)&&(this.isProjectionDirty=!1),y||(y=be()),kt(y,this.relativeTarget)),x&&(this.animationValues=c,vE(c,u,this.latestValues,T,g,p)),this.root.scheduleUpdateProjection(),this.scheduleRender(),this.animationProgress=T},this.mixTargetDelta(this.options.layoutRoot?1e3:0)}startAnimation(o){var l,a,u;this.notifyListeners("animationStart"),(l=this.currentAnimation)==null||l.stop(),(u=(a=this.resumingFrom)==null?void 0:a.currentAnimation)==null||u.stop(),this.pendingAnimation&&(Vn(this.pendingAnimation),this.pendingAnimation=void 0),this.pendingAnimation=ge.update(()=>{No.hasAnimatedSinceResize=!0,this.motionValue||(this.motionValue=li(0)),this.currentAnimation=pE(this.motionValue,[0,1e3],{...o,velocity:0,isSync:!0,onUpdate:c=>{this.mixTargetDelta(c),o.onUpdate&&o.onUpdate(c)},onStop:()=>{},onComplete:()=>{o.onComplete&&o.onComplete(),this.completeAnimation()}}),this.resumingFrom&&(this.resumingFrom.currentAnimation=this.currentAnimation),this.pendingAnimation=void 0})}completeAnimation(){this.resumingFrom&&(this.resumingFrom.currentAnimation=void 0,this.resumingFrom.preserveOpacity=void 0);const o=this.getStack();o&&o.exitAnimationComplete(),this.resumingFrom=this.currentAnimation=this.animationValues=void 0,this.notifyListeners("animationComplete")}finishAnimation(){this.currentAnimation&&(this.mixTargetDelta&&this.mixTargetDelta(PE),this.currentAnimation.stop()),this.completeAnimation()}applyTransformsToTarget(){const o=this.getLead();let{targetWithTransforms:l,target:a,layout:u,latestValues:c}=o;if(!(!l||!a||!u)){if(this!==o&&this.layout&&u&&jx(this.options.animationType,this.layout.layoutBox,u.layoutBox)){a=this.target||be();const f=Qe(this.layout.layoutBox.x);a.x.min=o.target.x.min,a.x.max=a.x.min+f;const d=Qe(this.layout.layoutBox.y);a.y.min=o.target.y.min,a.y.max=a.y.min+d}kt(l,a),$r(l,c),qi(this.projectionDeltaWithTransform,this.layoutCorrected,l,c)}}registerSharedNode(o,l){this.sharedNodes.has(o)||this.sharedNodes.set(o,new TE),this.sharedNodes.get(o).add(l);const u=l.options.initialPromotionConfig;l.promote({transition:u?u.transition:void 0,preserveFollowOpacity:u&&u.shouldPreserveFollowOpacity?u.shouldPreserveFollowOpacity(l):void 0})}isLead(){const o=this.getStack();return o?o.lead===this:!0}getLead(){var l;const{layoutId:o}=this.options;return o?((l=this.getStack())==null?void 0:l.lead)||this:this}getPrevLead(){var l;const{layoutId:o}=this.options;return o?(l=this.getStack())==null?void 0:l.prevLead:void 0}getStack(){const{layoutId:o}=this.options;if(o)return this.root.sharedNodes.get(o)}promote({needsReset:o,transition:l,preserveFollowOpacity:a}={}){const u=this.getStack();u&&u.promote(this,a),o&&(this.projectionDelta=void 0,this.needsReset=!0),l&&this.setOptions({transition:l})}relegate(){const o=this.getStack();return o?o.relegate(this):!1}resetSkewAndRotation(){const{visualElement:o}=this.options;if(!o)return;let l=!1;const{latestValues:a}=o;if((a.z||a.rotate||a.rotateX||a.rotateY||a.rotateZ||a.skewX||a.skewY)&&(l=!0),!l)return;const u={};a.z&&Ea("z",o,u,this.animationValues);for(let c=0;c<Ca.length;c++)Ea(`rotate${Ca[c]}`,o,u,this.animationValues),Ea(`skew${Ca[c]}`,o,u,this.animationValues);o.render();for(const c in u)o.setStaticValue(c,u[c]),this.animationValues&&(this.animationValues[c]=u[c]);o.scheduleRender()}applyProjectionStyles(o,l){if(!this.instance||this.isSVG)return;if(!this.isVisible){o.visibility="hidden";return}const a=this.getTransformTemplate();if(this.needsReset){this.needsReset=!1,o.visibility="",o.opacity="",o.pointerEvents=Po(l==null?void 0:l.pointerEvents)||"",o.transform=a?a(this.latestValues,""):"none";return}const u=this.getLead();if(!this.projectionDelta||!this.layout||!u.target){this.options.layoutId&&(o.opacity=this.latestValues.opacity!==void 0?this.latestValues.opacity:1,o.pointerEvents=Po(l==null?void 0:l.pointerEvents)||""),this.hasProjected&&!er(this.latestValues)&&(o.transform=a?a({},""):"none",this.hasProjected=!1);return}o.visibility="";const c=u.animationValues||u.latestValues;this.applyTransformsToTarget();let f=AE(this.projectionDeltaWithTransform,this.treeScale,c);a&&(f=a(c,f)),o.transform=f;const{x:d,y:h}=this.projectionDelta;o.transformOrigin=`${d.origin*100}% ${h.origin*100}% 0`,u.animationValues?o.opacity=u===this?c.opacity??this.latestValues.opacity??1:this.preserveOpacity?this.latestValues.opacity:c.opacityExit:o.opacity=u===this?c.opacity!==void 0?c.opacity:"":c.opacityExit!==void 0?c.opacityExit:0;for(const m in Ss){if(c[m]===void 0)continue;const{correct:x,applyTo:C,isCSSVariable:p}=Ss[m],g=f==="none"?c[m]:x(c[m],u);if(C){const y=C.length;for(let b=0;b<y;b++)o[C[b]]=g}else p?this.options.visualElement.renderState.vars[m]=g:o[m]=g}this.options.layoutId&&(o.pointerEvents=u===this?Po(l==null?void 0:l.pointerEvents)||"":"none")}clearSnapshot(){this.resumeFrom=this.snapshot=void 0}resetTree(){this.root.nodes.forEach(o=>{var l;return(l=o.currentAnimation)==null?void 0:l.stop()}),this.root.nodes.forEach(Cp),this.root.sharedNodes.clear()}}}function IE(e){e.updateLayout()}function ME(e){var n;const t=((n=e.resumeFrom)==null?void 0:n.snapshot)||e.snapshot;if(e.isLead()&&e.layout&&t&&e.hasListeners("didUpdate")){const{layoutBox:r,measuredBox:i}=e.layout,{animationType:s}=e.options,o=t.source!==e.layout.source;s==="size"?St(f=>{const d=o?t.measuredBox[f]:t.layoutBox[f],h=Qe(d);d.min=r[f].min,d.max=d.min+h}):jx(s,t.layoutBox,r)&&St(f=>{const d=o?t.measuredBox[f]:t.layoutBox[f],h=Qe(r[f]);d.max=d.min+h,e.relativeTarget&&!e.currentAnimation&&(e.isProjectionDirty=!0,e.relativeTarget[f].max=e.relativeTarget[f].min+h)});const l=Hr();qi(l,r,t.layoutBox);const a=Hr();o?qi(a,e.applyTransform(i,!0),t.measuredBox):qi(a,r,t.layoutBox);const u=!Dx(l);let c=!1;if(!e.resumeFrom){const f=e.getClosestProjectingParent();if(f&&!f.resumeFrom){const{snapshot:d,layout:h}=f;if(d&&h){const m=be();Xi(m,t.layoutBox,d.layoutBox);const x=be();Xi(x,r,h.layoutBox),Lx(m,x)||(c=!0),f.options.layoutRoot&&(e.relativeTarget=x,e.relativeTargetOrigin=m,e.relativeParent=f)}}}e.notifyListeners("didUpdate",{layout:r,snapshot:t,delta:a,layoutDelta:l,hasLayoutChanged:u,hasRelativeLayoutChanged:c})}else if(e.isLead()){const{onExitComplete:r}=e.options;r&&r()}e.options.transition=void 0}function RE(e){e.parent&&(e.isProjecting()||(e.isProjectionDirty=e.parent.isProjectionDirty),e.isSharedProjectionDirty||(e.isSharedProjectionDirty=!!(e.isProjectionDirty||e.parent.isProjectionDirty||e.parent.isSharedProjectionDirty)),e.isTransformDirty||(e.isTransformDirty=e.parent.isTransformDirty))}function DE(e){e.isProjectionDirty=e.isSharedProjectionDirty=e.isTransformDirty=!1}function LE(e){e.clearSnapshot()}function Cp(e){e.clearMeasurements()}function Ep(e){e.isLayoutDirty=!1}function _E(e){const{visualElement:t}=e.options;t&&t.getProps().onBeforeLayoutMeasure&&t.notify("BeforeLayoutMeasure"),e.resetTransform()}function bp(e){e.finishAnimation(),e.targetDelta=e.relativeTarget=e.target=void 0,e.isProjectionDirty=!0}function OE(e){e.resolveTargetDelta()}function jE(e){e.calcProjection()}function FE(e){e.resetSkewAndRotation()}function zE(e){e.removeLeadSnapshot()}function Tp(e,t,n){e.translate=ve(t.translate,0,n),e.scale=ve(t.scale,1,n),e.origin=t.origin,e.originPoint=t.originPoint}function Ap(e,t,n,r){e.min=ve(t.min,n.min,r),e.max=ve(t.max,n.max,r)}function VE(e,t,n,r){Ap(e.x,t.x,n.x,r),Ap(e.y,t.y,n.y,r)}function BE(e){return e.animationValues&&e.animationValues.opacityExit!==void 0}const UE={duration:.45,ease:[.4,0,.1,1]},Pp=e=>typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().includes(e),Np=Pp("applewebkit/")&&!Pp("chrome/")?Math.round:Nt;function Ip(e){e.min=Np(e.min),e.max=Np(e.max)}function $E(e){Ip(e.x),Ip(e.y)}function jx(e,t,n){return e==="position"||e==="preserve-aspect"&&!qC(kp(t),kp(n),.2)}function HE(e){var t;return e!==e.root&&((t=e.scroll)==null?void 0:t.wasRoot)}const GE=Ox({attachResizeListener:(e,t)=>Cs(e,"resize",t),measureScroll:()=>({x:document.documentElement.scrollLeft||document.body.scrollLeft,y:document.documentElement.scrollTop||document.body.scrollTop}),checkIsScrollRoot:()=>!0}),ba={current:void 0},Fx=Ox({measureScroll:e=>({x:e.scrollLeft,y:e.scrollTop}),defaultParent:()=>{if(!ba.current){const e=new GE({});e.mount(window),e.setOptions({layoutScroll:!0}),ba.current=e}return ba.current},resetTransform:(e,t)=>{e.style.transform=t!==void 0?t:"none"},checkIsScrollRoot:e=>window.getComputedStyle(e).position==="fixed"}),WE={pan:{Feature:cE},drag:{Feature:uE,ProjectionNode:Fx,MeasureLayout:Ix}};function Mp(e,t,n){const{props:r}=e;e.animationState&&r.whileHover&&e.animationState.setActive("whileHover",n==="Start");const i="onHover"+n,s=r[i];s&&ge.postRender(()=>s(t,Os(t)))}class KE extends Gn{mount(){const{current:t}=this.node;t&&(this.unmount=p2(t,(n,r)=>(Mp(this.node,r,"Start"),i=>Mp(this.node,i,"End"))))}unmount(){}}class YE extends Gn{constructor(){super(...arguments),this.isActive=!1}onFocus(){let t=!1;try{t=this.node.current.matches(":focus-visible")}catch{t=!0}!t||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!0),this.isActive=!0)}onBlur(){!this.isActive||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!1),this.isActive=!1)}mount(){this.unmount=Ds(Cs(this.node.current,"focus",()=>this.onFocus()),Cs(this.node.current,"blur",()=>this.onBlur()))}unmount(){}}function Rp(e,t,n){const{props:r}=e;if(e.current instanceof HTMLButtonElement&&e.current.disabled)return;e.animationState&&r.whileTap&&e.animationState.setActive("whileTap",n==="Start");const i="onTap"+(n==="End"?"":n),s=r[i];s&&ge.postRender(()=>s(t,Os(t)))}class qE extends Gn{mount(){const{current:t}=this.node;t&&(this.unmount=x2(t,(n,r)=>(Rp(this.node,r,"Start"),(i,{success:s})=>Rp(this.node,i,s?"End":"Cancel")),{useGlobalTarget:this.node.props.globalTapTarget}))}unmount(){}}const tc=new WeakMap,Ta=new WeakMap,XE=e=>{const t=tc.get(e.target);t&&t(e)},QE=e=>{e.forEach(XE)};function ZE({root:e,...t}){const n=e||document;Ta.has(n)||Ta.set(n,{});const r=Ta.get(n),i=JSON.stringify(t);return r[i]||(r[i]=new IntersectionObserver(QE,{root:e,...t})),r[i]}function JE(e,t,n){const r=ZE(t);return tc.set(e,n),r.observe(e),()=>{tc.delete(e),r.unobserve(e)}}const eb={some:0,all:1};class tb extends Gn{constructor(){super(...arguments),this.hasEnteredView=!1,this.isInView=!1}startObserver(){this.unmount();const{viewport:t={}}=this.node.getProps(),{root:n,margin:r,amount:i="some",once:s}=t,o={root:n?n.current:void 0,rootMargin:r,threshold:typeof i=="number"?i:eb[i]},l=a=>{const{isIntersecting:u}=a;if(this.isInView===u||(this.isInView=u,s&&!u&&this.hasEnteredView))return;u&&(this.hasEnteredView=!0),this.node.animationState&&this.node.animationState.setActive("whileInView",u);const{onViewportEnter:c,onViewportLeave:f}=this.node.getProps(),d=u?c:f;d&&d(a)};return JE(this.node.current,o,l)}mount(){this.startObserver()}update(){if(typeof IntersectionObserver>"u")return;const{props:t,prevProps:n}=this.node;["amount","margin","root"].some(nb(t,n))&&this.startObserver()}unmount(){}}function nb({viewport:e={}},{viewport:t={}}={}){return n=>e[n]!==t[n]}const rb={inView:{Feature:tb},tap:{Feature:qE},focus:{Feature:YE},hover:{Feature:KE}},ib={layout:{ProjectionNode:Fx,MeasureLayout:Ix}},sb={...$C,...rb,...WE,...ib},pe=sC(sb,xC);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var ob={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lb=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),Ae=(e,t)=>{const n=I.forwardRef(({color:r="currentColor",size:i=24,strokeWidth:s=2,absoluteStrokeWidth:o,className:l="",children:a,...u},c)=>I.createElement("svg",{ref:c,...ob,width:i,height:i,stroke:r,strokeWidth:o?Number(s)*24/Number(i):s,className:["lucide",`lucide-${lb(e)}`,l].join(" "),...u},[...t.map(([f,d])=>I.createElement(f,d)),...Array.isArray(a)?a:[a]]));return n.displayName=`${e}`,n};/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ab=Ae("Activity",[["path",{d:"M22 12h-4l-3 9L9 3l-3 9H2",key:"d5dnw9"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dp=Ae("AlertCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hf=Ae("Building2",[["path",{d:"M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z",key:"1b4qmf"}],["path",{d:"M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2",key:"i71pzd"}],["path",{d:"M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2",key:"10jefs"}],["path",{d:"M10 6h4",key:"1itunk"}],["path",{d:"M10 10h4",key:"tcdvrf"}],["path",{d:"M10 14h4",key:"kelpxr"}],["path",{d:"M10 18h4",key:"1ulq68"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ub=Ae("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cb=Ae("CheckCircle",[["path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14",key:"g774vq"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fb=Ae("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zx=Ae("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const db=Ae("DollarSign",[["line",{x1:"12",x2:"12",y1:"2",y2:"22",key:"7eqyqh"}],["path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",key:"1b0p4s"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hb=Ae("FileText",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pb=Ae("KeyRound",[["path",{d:"M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z",key:"167ctg"}],["circle",{cx:"16.5",cy:"7.5",r:".5",fill:"currentColor",key:"w0ekpg"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mb=Ae("Key",[["circle",{cx:"7.5",cy:"15.5",r:"5.5",key:"yqb3hr"}],["path",{d:"m21 2-9.6 9.6",key:"1j0ho8"}],["path",{d:"m15.5 7.5 3 3L22 7l-3-3",key:"1rn1fs"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gb=Ae("Loader2",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yb=Ae("Megaphone",[["path",{d:"m3 11 18-5v12L3 14v-3z",key:"n962bs"}],["path",{d:"M11.6 16.8a3 3 0 1 1-5.8-1.6",key:"1yl0tm"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xb=Ae("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vx=Ae("Send",[["path",{d:"m22 2-7 20-4-9-9-4Z",key:"1q3vgg"}],["path",{d:"M22 2 11 13",key:"nzbqef"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vb=Ae("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wb=Ae("Sparkles",[["path",{d:"m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z",key:"17u4zn"}],["path",{d:"M5 3v4",key:"bklmnn"}],["path",{d:"M19 17v4",key:"iiml17"}],["path",{d:"M3 5h4",key:"nem4j1"}],["path",{d:"M17 19h4",key:"lbex7p"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bx=Ae("TrendingUp",[["polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17",key:"126l90"}],["polyline",{points:"16 7 22 7 22 13",key:"kwv8wd"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kb=Ae("Trophy",[["path",{d:"M6 9H4.5a2.5 2.5 0 0 1 0-5H6",key:"17hqa7"}],["path",{d:"M18 9h1.5a2.5 2.5 0 0 0 0-5H18",key:"lmptdp"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22",key:"1nw9bq"}],["path",{d:"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22",key:"1np0yb"}],["path",{d:"M18 2H6v7a6 6 0 0 0 12 0V2Z",key:"u46fv3"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sb=Ae("XCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dl=Ae("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);function Cb({onApiKeySet:e}){const[t,n]=I.useState(""),[r,i]=I.useState(""),s=o=>{if(o.preventDefault(),!t.trim()){i("API 키를 입력해주세요.");return}e(t.trim())};return v.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",children:v.jsxs("div",{className:"bg-white rounded-lg shadow-xl max-w-md w-full p-6",children:[v.jsxs("div",{className:"flex items-center gap-3 mb-4",children:[v.jsx("div",{className:"bg-baseball-green p-2 rounded-lg",children:v.jsx(mb,{className:"w-6 h-6 text-white"})}),v.jsx("h2",{className:"text-xl font-bold text-gray-800",children:"Gemini API 키 입력"})]}),v.jsx("p",{className:"text-gray-600 mb-4 text-sm",children:"게임을 시작하려면 Google Gemini API 키가 필요합니다."}),v.jsxs("form",{onSubmit:s,children:[v.jsx("input",{type:"password",value:t,onChange:o=>{n(o.target.value),i("")},placeholder:"API 키를 입력하세요",className:"w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-baseball-green focus:border-transparent mb-2"}),r&&v.jsx("p",{className:"text-red-500 text-sm mb-2",children:r}),v.jsx("button",{type:"submit",className:"w-full bg-baseball-green hover:bg-baseball-green-dark text-white font-semibold py-2 px-4 rounded-lg transition-colors",children:"시작하기"})]}),v.jsx("p",{className:"text-xs text-gray-500 mt-4",children:"API 키는 브라우저에 저장되며, 서버로 전송되지 않습니다."})]})})}const sn=[{id:"kia",name:"KIA",fullName:"KIA 타이거즈",color:"#EA0029",secondaryColor:"#000000",icon:"🐅"},{id:"samsung",name:"삼성",fullName:"삼성 라이온즈",color:"#1D4D8B",secondaryColor:"#FFD700",icon:"🦁"},{id:"lg",name:"LG",fullName:"LG 트윈스",color:"#C30452",secondaryColor:"#000000",icon:"👯"},{id:"doosan",name:"두산",fullName:"두산 베어스",color:"#131230",secondaryColor:"#0D4A9B",icon:"🐻"},{id:"kt",name:"KT",fullName:"KT 위즈",color:"#000000",secondaryColor:"#FFD700",icon:"⚡"},{id:"ssg",name:"SSG",fullName:"SSG 랜더스",color:"#CE0E2D",secondaryColor:"#000000",icon:"🚂"},{id:"lotte",name:"롯데",fullName:"롯데 자이언츠",color:"#041E42",secondaryColor:"#ED1C24",icon:"⚾"},{id:"hanwha",name:"한화",fullName:"한화 이글스",color:"#FF6600",secondaryColor:"#000000",icon:"🦅"},{id:"nc",name:"NC",fullName:"NC 다이노스",color:"#315288",secondaryColor:"#FFD700",icon:"🦕"},{id:"kiwoom",name:"키움",fullName:"키움 히어로즈",color:"#570514",secondaryColor:"#FFD700",icon:"🦸"}];function Eb({onSelect:e}){const[t,n]=I.useState(0),r=()=>{n(o=>o===0?sn.length-1:o-1)},i=()=>{n(o=>o===sn.length-1?0:o+1)},s=()=>{e(sn[t])};return v.jsx("div",{className:"min-h-screen bg-[#Fdfbf7] flex items-center justify-center p-4",children:v.jsxs("div",{className:"max-w-4xl w-full",children:[v.jsxs("div",{className:"text-center mb-8",children:[v.jsx("h1",{className:"text-4xl font-bold text-baseball-green mb-2",children:"⚾ 야구 매니지먼트 게임"}),v.jsx("p",{className:"text-gray-600 text-lg",children:"팀을 선택하세요"})]}),v.jsxs("div",{className:"relative",children:[v.jsx("button",{onClick:r,className:"absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 shadow-lg rounded-full p-2 transition-colors",children:v.jsx(fb,{className:"w-6 h-6 text-baseball-green"})}),v.jsx("button",{onClick:i,className:"absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 shadow-lg rounded-full p-2 transition-colors",children:v.jsx(zx,{className:"w-6 h-6 text-baseball-green"})}),v.jsx("div",{className:"relative h-96 overflow-hidden",children:v.jsx(yr,{mode:"wait",children:v.jsx(pe.div,{initial:{opacity:0,x:300,scale:.8},animate:{opacity:1,x:0,scale:1},exit:{opacity:0,x:-300,scale:.8},transition:{duration:.3},className:"absolute inset-0 flex items-center justify-center",children:v.jsxs("div",{className:"w-full max-w-md h-80 rounded-2xl shadow-2xl flex flex-col items-center justify-center p-8 cursor-pointer transform transition-transform hover:scale-105",style:{background:`linear-gradient(135deg, ${sn[t].color} 0%, ${sn[t].secondaryColor} 100%)`},onClick:s,children:[v.jsx("div",{className:"text-8xl mb-4",children:sn[t].icon}),v.jsx("h2",{className:"text-3xl font-bold text-white mb-2",children:sn[t].name}),v.jsx("p",{className:"text-white/90 text-lg",children:sn[t].fullName})]})},t)})}),v.jsx("div",{className:"flex justify-center gap-2 mt-6",children:sn.map((o,l)=>v.jsx("button",{onClick:()=>n(l),className:`h-2 rounded-full transition-all ${l===t?"bg-baseball-green w-8":"bg-gray-300 w-2"}`},l))}),v.jsx("div",{className:"mt-8 flex justify-center",children:v.jsx("button",{onClick:s,className:"px-8 py-3 bg-baseball-gold hover:bg-baseball-gold-dark text-baseball-green font-bold text-lg rounded-lg shadow-lg transition-colors",children:"선택하기"})})]})]})})}var Lp;(function(e){e.STRING="string",e.NUMBER="number",e.INTEGER="integer",e.BOOLEAN="boolean",e.ARRAY="array",e.OBJECT="object"})(Lp||(Lp={}));/**
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
 */var _p;(function(e){e.LANGUAGE_UNSPECIFIED="language_unspecified",e.PYTHON="python"})(_p||(_p={}));var Op;(function(e){e.OUTCOME_UNSPECIFIED="outcome_unspecified",e.OUTCOME_OK="outcome_ok",e.OUTCOME_FAILED="outcome_failed",e.OUTCOME_DEADLINE_EXCEEDED="outcome_deadline_exceeded"})(Op||(Op={}));/**
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
 */const jp=["user","model","function","system"];var Fp;(function(e){e.HARM_CATEGORY_UNSPECIFIED="HARM_CATEGORY_UNSPECIFIED",e.HARM_CATEGORY_HATE_SPEECH="HARM_CATEGORY_HATE_SPEECH",e.HARM_CATEGORY_SEXUALLY_EXPLICIT="HARM_CATEGORY_SEXUALLY_EXPLICIT",e.HARM_CATEGORY_HARASSMENT="HARM_CATEGORY_HARASSMENT",e.HARM_CATEGORY_DANGEROUS_CONTENT="HARM_CATEGORY_DANGEROUS_CONTENT"})(Fp||(Fp={}));var zp;(function(e){e.HARM_BLOCK_THRESHOLD_UNSPECIFIED="HARM_BLOCK_THRESHOLD_UNSPECIFIED",e.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",e.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",e.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",e.BLOCK_NONE="BLOCK_NONE"})(zp||(zp={}));var Vp;(function(e){e.HARM_PROBABILITY_UNSPECIFIED="HARM_PROBABILITY_UNSPECIFIED",e.NEGLIGIBLE="NEGLIGIBLE",e.LOW="LOW",e.MEDIUM="MEDIUM",e.HIGH="HIGH"})(Vp||(Vp={}));var Bp;(function(e){e.BLOCKED_REASON_UNSPECIFIED="BLOCKED_REASON_UNSPECIFIED",e.SAFETY="SAFETY",e.OTHER="OTHER"})(Bp||(Bp={}));var Qi;(function(e){e.FINISH_REASON_UNSPECIFIED="FINISH_REASON_UNSPECIFIED",e.STOP="STOP",e.MAX_TOKENS="MAX_TOKENS",e.SAFETY="SAFETY",e.RECITATION="RECITATION",e.LANGUAGE="LANGUAGE",e.OTHER="OTHER"})(Qi||(Qi={}));var Up;(function(e){e.TASK_TYPE_UNSPECIFIED="TASK_TYPE_UNSPECIFIED",e.RETRIEVAL_QUERY="RETRIEVAL_QUERY",e.RETRIEVAL_DOCUMENT="RETRIEVAL_DOCUMENT",e.SEMANTIC_SIMILARITY="SEMANTIC_SIMILARITY",e.CLASSIFICATION="CLASSIFICATION",e.CLUSTERING="CLUSTERING"})(Up||(Up={}));var $p;(function(e){e.MODE_UNSPECIFIED="MODE_UNSPECIFIED",e.AUTO="AUTO",e.ANY="ANY",e.NONE="NONE"})($p||($p={}));var Hp;(function(e){e.MODE_UNSPECIFIED="MODE_UNSPECIFIED",e.MODE_DYNAMIC="MODE_DYNAMIC"})(Hp||(Hp={}));/**
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
 */class rt extends Error{constructor(t){super(`[GoogleGenerativeAI Error]: ${t}`)}}class br extends rt{constructor(t,n){super(t),this.response=n}}class Ux extends rt{constructor(t,n,r,i){super(t),this.status=n,this.statusText=r,this.errorDetails=i}}class jn extends rt{}/**
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
 */const bb="https://generativelanguage.googleapis.com",Tb="v1beta",Ab="0.21.0",Pb="genai-js";var xr;(function(e){e.GENERATE_CONTENT="generateContent",e.STREAM_GENERATE_CONTENT="streamGenerateContent",e.COUNT_TOKENS="countTokens",e.EMBED_CONTENT="embedContent",e.BATCH_EMBED_CONTENTS="batchEmbedContents"})(xr||(xr={}));class Nb{constructor(t,n,r,i,s){this.model=t,this.task=n,this.apiKey=r,this.stream=i,this.requestOptions=s}toString(){var t,n;const r=((t=this.requestOptions)===null||t===void 0?void 0:t.apiVersion)||Tb;let s=`${((n=this.requestOptions)===null||n===void 0?void 0:n.baseUrl)||bb}/${r}/${this.model}:${this.task}`;return this.stream&&(s+="?alt=sse"),s}}function Ib(e){const t=[];return e!=null&&e.apiClient&&t.push(e.apiClient),t.push(`${Pb}/${Ab}`),t.join(" ")}async function Mb(e){var t;const n=new Headers;n.append("Content-Type","application/json"),n.append("x-goog-api-client",Ib(e.requestOptions)),n.append("x-goog-api-key",e.apiKey);let r=(t=e.requestOptions)===null||t===void 0?void 0:t.customHeaders;if(r){if(!(r instanceof Headers))try{r=new Headers(r)}catch(i){throw new jn(`unable to convert customHeaders value ${JSON.stringify(r)} to Headers: ${i.message}`)}for(const[i,s]of r.entries()){if(i==="x-goog-api-key")throw new jn(`Cannot set reserved header name ${i}`);if(i==="x-goog-api-client")throw new jn(`Header name ${i} can only be set using the apiClient field`);n.append(i,s)}}return n}async function Rb(e,t,n,r,i,s){const o=new Nb(e,t,n,r,s);return{url:o.toString(),fetchOptions:Object.assign(Object.assign({},Ob(s)),{method:"POST",headers:await Mb(o),body:i})}}async function js(e,t,n,r,i,s={},o=fetch){const{url:l,fetchOptions:a}=await Rb(e,t,n,r,i,s);return Db(l,a,o)}async function Db(e,t,n=fetch){let r;try{r=await n(e,t)}catch(i){Lb(i,e)}return r.ok||await _b(r,e),r}function Lb(e,t){let n=e;throw e instanceof Ux||e instanceof jn||(n=new rt(`Error fetching from ${t.toString()}: ${e.message}`),n.stack=e.stack),n}async function _b(e,t){let n="",r;try{const i=await e.json();n=i.error.message,i.error.details&&(n+=` ${JSON.stringify(i.error.details)}`,r=i.error.details)}catch{}throw new Ux(`Error fetching from ${t.toString()}: [${e.status} ${e.statusText}] ${n}`,e.status,e.statusText,r)}function Ob(e){const t={};if((e==null?void 0:e.signal)!==void 0||(e==null?void 0:e.timeout)>=0){const n=new AbortController;(e==null?void 0:e.timeout)>=0&&setTimeout(()=>n.abort(),e.timeout),e!=null&&e.signal&&e.signal.addEventListener("abort",()=>{n.abort()}),t.signal=n.signal}return t}/**
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
 */function Gf(e){return e.text=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),Io(e.candidates[0]))throw new br(`${En(e)}`,e);return jb(e)}else if(e.promptFeedback)throw new br(`Text not available. ${En(e)}`,e);return""},e.functionCall=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),Io(e.candidates[0]))throw new br(`${En(e)}`,e);return console.warn("response.functionCall() is deprecated. Use response.functionCalls() instead."),Gp(e)[0]}else if(e.promptFeedback)throw new br(`Function call not available. ${En(e)}`,e)},e.functionCalls=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),Io(e.candidates[0]))throw new br(`${En(e)}`,e);return Gp(e)}else if(e.promptFeedback)throw new br(`Function call not available. ${En(e)}`,e)},e}function jb(e){var t,n,r,i;const s=[];if(!((n=(t=e.candidates)===null||t===void 0?void 0:t[0].content)===null||n===void 0)&&n.parts)for(const o of(i=(r=e.candidates)===null||r===void 0?void 0:r[0].content)===null||i===void 0?void 0:i.parts)o.text&&s.push(o.text),o.executableCode&&s.push("\n```"+o.executableCode.language+`
`+o.executableCode.code+"\n```\n"),o.codeExecutionResult&&s.push("\n```\n"+o.codeExecutionResult.output+"\n```\n");return s.length>0?s.join(""):""}function Gp(e){var t,n,r,i;const s=[];if(!((n=(t=e.candidates)===null||t===void 0?void 0:t[0].content)===null||n===void 0)&&n.parts)for(const o of(i=(r=e.candidates)===null||r===void 0?void 0:r[0].content)===null||i===void 0?void 0:i.parts)o.functionCall&&s.push(o.functionCall);if(s.length>0)return s}const Fb=[Qi.RECITATION,Qi.SAFETY,Qi.LANGUAGE];function Io(e){return!!e.finishReason&&Fb.includes(e.finishReason)}function En(e){var t,n,r;let i="";if((!e.candidates||e.candidates.length===0)&&e.promptFeedback)i+="Response was blocked",!((t=e.promptFeedback)===null||t===void 0)&&t.blockReason&&(i+=` due to ${e.promptFeedback.blockReason}`),!((n=e.promptFeedback)===null||n===void 0)&&n.blockReasonMessage&&(i+=`: ${e.promptFeedback.blockReasonMessage}`);else if(!((r=e.candidates)===null||r===void 0)&&r[0]){const s=e.candidates[0];Io(s)&&(i+=`Candidate was blocked due to ${s.finishReason}`,s.finishMessage&&(i+=`: ${s.finishMessage}`))}return i}function Es(e){return this instanceof Es?(this.v=e,this):new Es(e)}function zb(e,t,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var r=n.apply(e,t||[]),i,s=[];return i={},o("next"),o("throw"),o("return"),i[Symbol.asyncIterator]=function(){return this},i;function o(d){r[d]&&(i[d]=function(h){return new Promise(function(m,x){s.push([d,h,m,x])>1||l(d,h)})})}function l(d,h){try{a(r[d](h))}catch(m){f(s[0][3],m)}}function a(d){d.value instanceof Es?Promise.resolve(d.value.v).then(u,c):f(s[0][2],d)}function u(d){l("next",d)}function c(d){l("throw",d)}function f(d,h){d(h),s.shift(),s.length&&l(s[0][0],s[0][1])}}/**
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
 */const Wp=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;function Vb(e){const t=e.body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0})),n=$b(t),[r,i]=n.tee();return{stream:Ub(r),response:Bb(i)}}async function Bb(e){const t=[],n=e.getReader();for(;;){const{done:r,value:i}=await n.read();if(r)return Gf(Hb(t));t.push(i)}}function Ub(e){return zb(this,arguments,function*(){const n=e.getReader();for(;;){const{value:r,done:i}=yield Es(n.read());if(i)break;yield yield Es(Gf(r))}})}function $b(e){const t=e.getReader();return new ReadableStream({start(r){let i="";return s();function s(){return t.read().then(({value:o,done:l})=>{if(l){if(i.trim()){r.error(new rt("Failed to parse stream"));return}r.close();return}i+=o;let a=i.match(Wp),u;for(;a;){try{u=JSON.parse(a[1])}catch{r.error(new rt(`Error parsing JSON response: "${a[1]}"`));return}r.enqueue(u),i=i.substring(a[0].length),a=i.match(Wp)}return s()})}}})}function Hb(e){const t=e[e.length-1],n={promptFeedback:t==null?void 0:t.promptFeedback};for(const r of e){if(r.candidates)for(const i of r.candidates){const s=i.index;if(n.candidates||(n.candidates=[]),n.candidates[s]||(n.candidates[s]={index:i.index}),n.candidates[s].citationMetadata=i.citationMetadata,n.candidates[s].groundingMetadata=i.groundingMetadata,n.candidates[s].finishReason=i.finishReason,n.candidates[s].finishMessage=i.finishMessage,n.candidates[s].safetyRatings=i.safetyRatings,i.content&&i.content.parts){n.candidates[s].content||(n.candidates[s].content={role:i.content.role||"user",parts:[]});const o={};for(const l of i.content.parts)l.text&&(o.text=l.text),l.functionCall&&(o.functionCall=l.functionCall),l.executableCode&&(o.executableCode=l.executableCode),l.codeExecutionResult&&(o.codeExecutionResult=l.codeExecutionResult),Object.keys(o).length===0&&(o.text=""),n.candidates[s].content.parts.push(o)}}r.usageMetadata&&(n.usageMetadata=r.usageMetadata)}return n}/**
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
 */async function $x(e,t,n,r){const i=await js(t,xr.STREAM_GENERATE_CONTENT,e,!0,JSON.stringify(n),r);return Vb(i)}async function Hx(e,t,n,r){const s=await(await js(t,xr.GENERATE_CONTENT,e,!1,JSON.stringify(n),r)).json();return{response:Gf(s)}}/**
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
 */function Gx(e){if(e!=null){if(typeof e=="string")return{role:"system",parts:[{text:e}]};if(e.text)return{role:"system",parts:[e]};if(e.parts)return e.role?e:{role:"system",parts:e.parts}}}function bs(e){let t=[];if(typeof e=="string")t=[{text:e}];else for(const n of e)typeof n=="string"?t.push({text:n}):t.push(n);return Gb(t)}function Gb(e){const t={role:"user",parts:[]},n={role:"function",parts:[]};let r=!1,i=!1;for(const s of e)"functionResponse"in s?(n.parts.push(s),i=!0):(t.parts.push(s),r=!0);if(r&&i)throw new rt("Within a single message, FunctionResponse cannot be mixed with other type of part in the request for sending chat message.");if(!r&&!i)throw new rt("No content is provided for sending chat message.");return r?t:n}function Wb(e,t){var n;let r={model:t==null?void 0:t.model,generationConfig:t==null?void 0:t.generationConfig,safetySettings:t==null?void 0:t.safetySettings,tools:t==null?void 0:t.tools,toolConfig:t==null?void 0:t.toolConfig,systemInstruction:t==null?void 0:t.systemInstruction,cachedContent:(n=t==null?void 0:t.cachedContent)===null||n===void 0?void 0:n.name,contents:[]};const i=e.generateContentRequest!=null;if(e.contents){if(i)throw new jn("CountTokensRequest must have one of contents or generateContentRequest, not both.");r.contents=e.contents}else if(i)r=Object.assign(Object.assign({},r),e.generateContentRequest);else{const s=bs(e);r.contents=[s]}return{generateContentRequest:r}}function Kp(e){let t;return e.contents?t=e:t={contents:[bs(e)]},e.systemInstruction&&(t.systemInstruction=Gx(e.systemInstruction)),t}function Kb(e){return typeof e=="string"||Array.isArray(e)?{content:bs(e)}:e}/**
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
 */const Yp=["text","inlineData","functionCall","functionResponse","executableCode","codeExecutionResult"],Yb={user:["text","inlineData"],function:["functionResponse"],model:["text","functionCall","executableCode","codeExecutionResult"],system:["text"]};function qb(e){let t=!1;for(const n of e){const{role:r,parts:i}=n;if(!t&&r!=="user")throw new rt(`First content should be with role 'user', got ${r}`);if(!jp.includes(r))throw new rt(`Each item should include role field. Got ${r} but valid roles are: ${JSON.stringify(jp)}`);if(!Array.isArray(i))throw new rt("Content should have 'parts' property with an array of Parts");if(i.length===0)throw new rt("Each Content should have at least one part");const s={text:0,inlineData:0,functionCall:0,functionResponse:0,fileData:0,executableCode:0,codeExecutionResult:0};for(const l of i)for(const a of Yp)a in l&&(s[a]+=1);const o=Yb[r];for(const l of Yp)if(!o.includes(l)&&s[l]>0)throw new rt(`Content with role '${r}' can't contain '${l}' part`);t=!0}}/**
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
 */const qp="SILENT_ERROR";class Xb{constructor(t,n,r,i={}){this.model=n,this.params=r,this._requestOptions=i,this._history=[],this._sendPromise=Promise.resolve(),this._apiKey=t,r!=null&&r.history&&(qb(r.history),this._history=r.history)}async getHistory(){return await this._sendPromise,this._history}async sendMessage(t,n={}){var r,i,s,o,l,a;await this._sendPromise;const u=bs(t),c={safetySettings:(r=this.params)===null||r===void 0?void 0:r.safetySettings,generationConfig:(i=this.params)===null||i===void 0?void 0:i.generationConfig,tools:(s=this.params)===null||s===void 0?void 0:s.tools,toolConfig:(o=this.params)===null||o===void 0?void 0:o.toolConfig,systemInstruction:(l=this.params)===null||l===void 0?void 0:l.systemInstruction,cachedContent:(a=this.params)===null||a===void 0?void 0:a.cachedContent,contents:[...this._history,u]},f=Object.assign(Object.assign({},this._requestOptions),n);let d;return this._sendPromise=this._sendPromise.then(()=>Hx(this._apiKey,this.model,c,f)).then(h=>{var m;if(h.response.candidates&&h.response.candidates.length>0){this._history.push(u);const x=Object.assign({parts:[],role:"model"},(m=h.response.candidates)===null||m===void 0?void 0:m[0].content);this._history.push(x)}else{const x=En(h.response);x&&console.warn(`sendMessage() was unsuccessful. ${x}. Inspect response object for details.`)}d=h}),await this._sendPromise,d}async sendMessageStream(t,n={}){var r,i,s,o,l,a;await this._sendPromise;const u=bs(t),c={safetySettings:(r=this.params)===null||r===void 0?void 0:r.safetySettings,generationConfig:(i=this.params)===null||i===void 0?void 0:i.generationConfig,tools:(s=this.params)===null||s===void 0?void 0:s.tools,toolConfig:(o=this.params)===null||o===void 0?void 0:o.toolConfig,systemInstruction:(l=this.params)===null||l===void 0?void 0:l.systemInstruction,cachedContent:(a=this.params)===null||a===void 0?void 0:a.cachedContent,contents:[...this._history,u]},f=Object.assign(Object.assign({},this._requestOptions),n),d=$x(this._apiKey,this.model,c,f);return this._sendPromise=this._sendPromise.then(()=>d).catch(h=>{throw new Error(qp)}).then(h=>h.response).then(h=>{if(h.candidates&&h.candidates.length>0){this._history.push(u);const m=Object.assign({},h.candidates[0].content);m.role||(m.role="model"),this._history.push(m)}else{const m=En(h);m&&console.warn(`sendMessageStream() was unsuccessful. ${m}. Inspect response object for details.`)}}).catch(h=>{h.message!==qp&&console.error(h)}),d}}/**
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
 */async function Qb(e,t,n,r){return(await js(t,xr.COUNT_TOKENS,e,!1,JSON.stringify(n),r)).json()}/**
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
 */async function Zb(e,t,n,r){return(await js(t,xr.EMBED_CONTENT,e,!1,JSON.stringify(n),r)).json()}async function Jb(e,t,n,r){const i=n.requests.map(o=>Object.assign(Object.assign({},o),{model:t}));return(await js(t,xr.BATCH_EMBED_CONTENTS,e,!1,JSON.stringify({requests:i}),r)).json()}/**
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
 */class Xp{constructor(t,n,r={}){this.apiKey=t,this._requestOptions=r,n.model.includes("/")?this.model=n.model:this.model=`models/${n.model}`,this.generationConfig=n.generationConfig||{},this.safetySettings=n.safetySettings||[],this.tools=n.tools,this.toolConfig=n.toolConfig,this.systemInstruction=Gx(n.systemInstruction),this.cachedContent=n.cachedContent}async generateContent(t,n={}){var r;const i=Kp(t),s=Object.assign(Object.assign({},this._requestOptions),n);return Hx(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(r=this.cachedContent)===null||r===void 0?void 0:r.name},i),s)}async generateContentStream(t,n={}){var r;const i=Kp(t),s=Object.assign(Object.assign({},this._requestOptions),n);return $x(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(r=this.cachedContent)===null||r===void 0?void 0:r.name},i),s)}startChat(t){var n;return new Xb(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(n=this.cachedContent)===null||n===void 0?void 0:n.name},t),this._requestOptions)}async countTokens(t,n={}){const r=Wb(t,{model:this.model,generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:this.cachedContent}),i=Object.assign(Object.assign({},this._requestOptions),n);return Qb(this.apiKey,this.model,r,i)}async embedContent(t,n={}){const r=Kb(t),i=Object.assign(Object.assign({},this._requestOptions),n);return Zb(this.apiKey,this.model,r,i)}async batchEmbedContents(t,n={}){const r=Object.assign(Object.assign({},this._requestOptions),n);return Jb(this.apiKey,this.model,t,r)}}/**
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
 */class eT{constructor(t){this.apiKey=t}getGenerativeModel(t,n){if(!t.model)throw new rt("Must provide a model name. Example: genai.getGenerativeModel({ model: 'my-model-name' })");return new Xp(this.apiKey,t,n)}getGenerativeModelFromCachedContent(t,n,r){if(!t.name)throw new jn("Cached content must contain a `name` field.");if(!t.model)throw new jn("Cached content must contain a `model` field.");const i=["model","systemInstruction"];for(const o of i)if(n!=null&&n[o]&&t[o]&&(n==null?void 0:n[o])!==t[o]){if(o==="model"){const l=n.model.startsWith("models/")?n.model.replace("models/",""):n.model,a=t.model.startsWith("models/")?t.model.replace("models/",""):t.model;if(l===a)continue}throw new jn(`Different value for "${o}" specified in modelParams (${n[o]}) and cachedContent (${t[o]})`)}const s=Object.assign(Object.assign({},n),{model:t.model,tools:t.tools,toolConfig:t.toolConfig,systemInstruction:t.systemInstruction,cachedContent:t});return new Xp(this.apiKey,s,r)}}const tT=`이 게임은 프로야구 팀을 만들자를 참고해서 플레이합니다.

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
   
   - **선수 명단 표의 필수 컬럼 순서 (중요):**
     - 선수 명단을 출력할 때는 반드시 **맨 왼쪽 첫 번째 컬럼에 '구분(1군/2군)' 컬럼을 포함**해야 합니다.
     - 올바른 헤더 순서: | 구분 | 포지션 | 이름 | 나이 | ...
     - 예시:
       | 구분 | 포지션 | 이름 | 나이 | 구속 | 구위 | 제구 | 체력 | 변화구 | 연봉 |
       |------|--------|------|------|------|------|------|------|--------|------|
       | 1군 | 선발 | 류현진 | 39 | 145km | A+ | S- | B+ | 커브(A) | 25.0억 |
       | 2군 | 유격수 | 이도윤 | 20 | - | - | - | - | - | 0.3억 |
     - **절대 금지:** 포지션 컬럼에 "1군/2군" 구분을 넣거나, 다른 컬럼에 구분을 넣어서 데이터가 밀리게 하지 마십시오.
     - 구분 컬럼에는 반드시 "1군" 또는 "2군"만 표시하십시오.

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

6. **[포지션별 필수 데이터 형식 (버그 방지)]**
   - \`[GUI_EVENT]\` JSON 데이터를 생성할 때, 선수의 포지션에 따라 \`stats\` 배열의 내용을 엄격하게 구분하십시오.
   - **투수 (선발, 불펜, 마무리 등):**
     반드시 \`[{"label": "ERA", "value": "3.50"}, {"label": "승", "value": 10}, {"label": "패", "value": 5}, {"label": "탈삼진", "value": 120}]\` 형식으로 작성하십시오.
   - **타자 (내야수, 외야수, 포수 등):**
     반드시 \`[{"label": "타율", "value": ".310"}, {"label": "홈런", "value": 20}, {"label": "타점", "value": 80}, {"label": "OPS", "value": ".900"}]\` 형식으로 작성하십시오.
   - 절대 투수에게 타자 스탯을, 타자에게 투수 스탯을 부여하지 마십시오.

7. **[현실적인 데이터 생성 규칙 (0 금지)]**
   - 시뮬레이션 몰입도를 위해 모든 수치 데이터에 **절대 '0'이나 빈 값을 넣지 마십시오.**
   - 데이터가 없는 신인이나 가상의 선수라도, 해당 선수의 **등급(S~D)**에 맞춰 현실적인 난수(Random) 데이터를 생성해 채워 넣으십시오.
     - (예: S급 투수는 ERA 1.00~2.50, C급 투수는 ERA 4.50~5.50 사이로 생성)
   - 연봉은 \`30.5억\` 처럼 소수점과 단위를 명확히 하여 문자열로 출력하십시오.

8. **[표 출력 포맷 엄수]**
   - 선수 명단을 출력할 때는 **반드시** 맨 앞에 '구분' 컬럼을 포함하여 **데이터 밀림을 방지**하십시오.
   - 올바른 헤더 순서: \`| 구분 | 포지션 | 이름 | 나이 | ...\`
   - 올바른 데이터 예시: \`| 1군 | 투수 | 류현진 | 37 | ...\` (절대 '투수'가 '구분' 칸에 오지 않게 하십시오.)

   ## [구단별 구단주 성향 고정 배분 (현실 고증 수정판)]

**1. A유형: 성적 지상주의 (Win-Now)**
* **특징:** 성적이 곧 생명입니다. 우승 청부사 역할을 원합니다.
* **해당 구단:**
    * **LG 트윈스:** (사유: 디펜딩 챔피언 전력, 성적 하락 시 팬덤 여론 급격 악화)
    * **KIA 타이거즈:** (사유: 인기 구단, 전통의 명가로서 성적 부진 용납 불가)
    * **롯데 자이언츠:** (사유: 오랜 우승 갈증, 그룹 차원의 쇄신 요구 강함)

**2. B유형: 비즈니스맨 (Profit-First)**
* **특징:** 가성비와 흑자 경영을 중시합니다.
* **해당 구단:**
    * **키움 히어로즈:** (사유: 자생 구단, 선수 판매를 통한 수익 창출 필수)
    * **두산 베어스:** (사유: 화수분 야구, 고효율 저비용 구조 선호)
    * **NC 다이노스:** (사유: 데이터 경영, 합리적인 연봉 체계 중시)

**3. C유형: 인내의 아이콘 (Rebuilder)**
* **특징:** 육성과 리빌딩을 믿고 기다려줍니다.
* **해당 구단:**
    * **삼성 라이온즈:** (사유: 왕조 재건을 위한 젊은 피 수혈 및 육성 기조)
    * **KT 위즈:** (사유: 장기적인 강팀 시스템 구축 중시)

**4. D유형: 의리의 대부 (The Godfather) - [NEW!]**
* **특징:** "의리!" 구단주가 전폭적인 신뢰와 금전적 지원을 보냅니다. 성적이 조금 안 나와도 믿고 기다려줍니다. 단, **'팀의 상징(프랜차이즈 스타)'을 함부로 대하면 용서하지 않습니다.**
* **해당 구단:**
    * **한화 이글스 (김승연 회장):**
        * **[특수 규칙]:** 류현진, 노시환, 문동주 같은 **핵심 스타 선수를 플레이어가 임의로 트레이드하거나 방출하면, 성적과 무관하게 즉시 해고(Game Over) 당합니다.** (명분: "내 식구를 버리는 리더는 필요 없다.")
        * **[해고 조건]:** 성적 부진에 대한 인내심은 높으나(3년 연속 꼴찌 시 해고), 팀의 로망을 해치는 운영 시 경질.
    * **SSG 랜더스 (정용진 구단주):**
        * **[특수 규칙]:** "세상에 없던 야구." 팬들을 위한 마케팅이나 스타성 있는 선수 영입을 좋아합니다. 재미없는 야구(성적이 좋아도 관중 수가 급감하면)를 하면 경고를 받습니다.

   ## [팀 케미스트리 및 사기 시스템]
선수단에는 보이지 않는 수치인 '팀 사기(0~100)'가 존재합니다.
- **연승 시:** 사기가 올라가며 선수들의 오버롤보다 120%의 성능을 냅니다.
- **연패 시:** 사기가 떨어지며 선수들이 제 실력을 발휘하지 못합니다(실책 증가).
- **트레이드/방출:** 팀의 프랜차이즈 스타나 주축 선수를 무리하게 방출하거나 트레이드하면 기존 선수들의 사기가 급격히 하락합니다.
- **뉴스:** "라커룸 내 불화설", "감독과 베테랑의 갈등" 같은 뉴스가 뜨면 팀 성적에 악영향을 주십시오.

## [연말 시상식 이벤트]
한국시리즈 종료 후 스토브리그 시작 전에 반드시 **[KBO 시상식]** 결과를 출력하십시오.
- **출력 항목:** 정규시즌 MVP, 신인왕, 홈런왕, 다승왕, 각 포지션별 골든글러브 수상자.
- **로직:** 시뮬레이션된 기록을 바탕으로 가장 뛰어난 성적을 낸 선수를 AI가 선정하십시오. 플레이어 팀 선수가 수상할 경우 팬들의 충성도가 대폭 상승합니다.

## [날씨 및 우천 취소 변수]
7~8월 장마철에는 일정 확률로 **[우천 취소]**가 발생합니다.
- 우천 취소된 경기는 추후 **더블헤더(하루 2경기)**로 편성되거나 시즌 막판 잔여 경기로 밀립니다.
- 더블헤더 강행군 시 투수진의 체력이 평소보다 2배 빠르게 소모되어, 2군 투수 콜업이 강제되는 상황을 만드십시오.

## [시스템 데이터 무결성 원칙 (최우선 순위)]
1. **JSON 포맷 엄수:** \`[GUI_EVENT]\`나 \`[OPTIONS]\` 태그 내의 JSON은 반드시 문법 오류가 없는 완벽한 형태여야 합니다. (쉼표 누락, 괄호 닫기 실수 절대 금지)
2. **계산 검증:** 샐러리캡이나 자금 계산 시, 단순 텍스트 생성이 아니라 내부적으로 두 번 검산한 후 출력하십시오. 수식이 틀린 텍스트를 출력하면 게임 진행이 불가능합니다.
3. **플레이어 보호:** AI가 플레이어의 자금을 임의로 사용하거나, 플레이어의 동의 없이 선수를 트레이드/방출 시키는 행위는 절대 금지됩니다. 모든 결정권은 플레이어에게 있습니다.
`,nT="gemini-2.5-flash";function rT(e){return new eT(e).getGenerativeModel({model:nT,systemInstruction:tT})}function iT({teamName:e="우리 팀",budget:t=null,date:n=null,season:r="2026 시즌",onApiKeyClick:i,onFacilityClick:s}){const o=t!==null&&t>0?t.toLocaleString("ko-KR")+"원":"시즌 준비 중",l=n||"시즌 준비 중";return v.jsx("div",{className:"bg-gradient-to-r from-[#0F4C3A] to-[#0a3528] text-white shadow-lg border-b-2 border-baseball-gold",children:v.jsx("div",{className:"container mx-auto px-3 sm:px-6 py-2 sm:py-3",children:v.jsxs("div",{className:"flex items-center justify-between flex-wrap gap-2 sm:gap-3",children:[v.jsxs("div",{className:"flex items-center gap-4",children:[v.jsx(Hf,{className:"w-5 h-5 text-baseball-gold"}),v.jsx("span",{className:"font-black text-lg sm:text-xl tracking-tight truncate max-w-[150px] sm:max-w-none",children:e}),v.jsx("span",{className:"text-baseball-gold/60",children:"|"}),v.jsxs("div",{className:"flex items-center gap-1.5 text-baseball-gold",children:[v.jsx(kb,{className:"w-4 h-4"}),v.jsx("span",{className:"text-sm font-semibold",children:r})]})]}),v.jsxs("div",{className:"flex items-center gap-1 sm:gap-2 lg:gap-4 flex-shrink-0 flex-wrap",children:[(s||i)&&v.jsxs("div",{className:"flex items-center gap-1 sm:gap-2 border-r border-baseball-gold/40 pr-1 sm:pr-2 lg:pr-4",children:[s&&v.jsx("button",{onClick:s,className:"p-1 sm:p-1.5 hover:bg-white/10 rounded transition-colors",title:"시설 관리",children:v.jsx(vb,{className:"w-3.5 h-3.5 sm:w-4 sm:h-4 text-baseball-gold"})}),i&&v.jsx("button",{onClick:i,className:"p-1 sm:p-1.5 hover:bg-white/10 rounded transition-colors",title:"API 키 설정",children:v.jsx(pb,{className:"w-3.5 h-3.5 sm:w-4 sm:h-4 text-baseball-gold"})})]}),v.jsx("span",{className:"hidden sm:inline text-baseball-gold/60",children:"|"}),v.jsxs("div",{className:"flex items-center gap-1 sm:gap-1.5 min-w-0",children:[v.jsx(db,{className:"w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5A059] flex-shrink-0"}),v.jsx("span",{className:"hidden sm:inline text-xs text-gray-300 font-sans",children:"보유 자금"}),v.jsx("span",{className:"hidden sm:inline text-baseball-gold/60",children:"|"}),v.jsx("span",{className:"font-mono font-bold text-[#C5A059] text-xs sm:text-sm truncate",children:o})]}),v.jsx("span",{className:"hidden sm:inline text-baseball-gold/60",children:"|"}),v.jsxs("div",{className:"flex items-center gap-1 sm:gap-1.5 min-w-0",children:[v.jsx(ub,{className:"w-3.5 h-3.5 sm:w-4 sm:h-4 text-baseball-gold flex-shrink-0"}),v.jsx("span",{className:"hidden sm:inline text-xs text-gray-300 font-sans",children:"날짜"}),v.jsx("span",{className:"hidden sm:inline text-baseball-gold/60",children:"|"}),v.jsx("span",{className:"font-mono font-semibold text-xs sm:text-sm truncate",children:l})]})]})]})})})}function sT(e,t){const n={};return(e[e.length-1]===""?[...e,""]:e).join((n.padRight?" ":"")+","+(n.padLeft===!1?"":" ")).trim()}const oT=/^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,lT=/^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,aT={};function Qp(e,t){return(aT.jsx?lT:oT).test(e)}const uT=/[ \t\n\f\r]/g;function cT(e){return typeof e=="object"?e.type==="text"?Zp(e.value):!1:Zp(e)}function Zp(e){return e.replace(uT,"")===""}class Fs{constructor(t,n,r){this.normal=n,this.property=t,r&&(this.space=r)}}Fs.prototype.normal={};Fs.prototype.property={};Fs.prototype.space=void 0;function Wx(e,t){const n={},r={};for(const i of e)Object.assign(n,i.property),Object.assign(r,i.normal);return new Fs(n,r,t)}function nc(e){return e.toLowerCase()}class ut{constructor(t,n){this.attribute=n,this.property=t}}ut.prototype.attribute="";ut.prototype.booleanish=!1;ut.prototype.boolean=!1;ut.prototype.commaOrSpaceSeparated=!1;ut.prototype.commaSeparated=!1;ut.prototype.defined=!1;ut.prototype.mustUseProperty=!1;ut.prototype.number=!1;ut.prototype.overloadedBoolean=!1;ut.prototype.property="";ut.prototype.spaceSeparated=!1;ut.prototype.space=void 0;let fT=0;const Y=Sr(),Pe=Sr(),rc=Sr(),D=Sr(),ce=Sr(),Jr=Sr(),dt=Sr();function Sr(){return 2**++fT}const ic=Object.freeze(Object.defineProperty({__proto__:null,boolean:Y,booleanish:Pe,commaOrSpaceSeparated:dt,commaSeparated:Jr,number:D,overloadedBoolean:rc,spaceSeparated:ce},Symbol.toStringTag,{value:"Module"})),Aa=Object.keys(ic);class Wf extends ut{constructor(t,n,r,i){let s=-1;if(super(t,n),Jp(this,"space",i),typeof r=="number")for(;++s<Aa.length;){const o=Aa[s];Jp(this,Aa[s],(r&ic[o])===ic[o])}}}Wf.prototype.defined=!0;function Jp(e,t,n){n&&(e[t]=n)}function gi(e){const t={},n={};for(const[r,i]of Object.entries(e.properties)){const s=new Wf(r,e.transform(e.attributes||{},r),i,e.space);e.mustUseProperty&&e.mustUseProperty.includes(r)&&(s.mustUseProperty=!0),t[r]=s,n[nc(r)]=r,n[nc(s.attribute)]=r}return new Fs(t,n,e.space)}const Kx=gi({properties:{ariaActiveDescendant:null,ariaAtomic:Pe,ariaAutoComplete:null,ariaBusy:Pe,ariaChecked:Pe,ariaColCount:D,ariaColIndex:D,ariaColSpan:D,ariaControls:ce,ariaCurrent:null,ariaDescribedBy:ce,ariaDetails:null,ariaDisabled:Pe,ariaDropEffect:ce,ariaErrorMessage:null,ariaExpanded:Pe,ariaFlowTo:ce,ariaGrabbed:Pe,ariaHasPopup:null,ariaHidden:Pe,ariaInvalid:null,ariaKeyShortcuts:null,ariaLabel:null,ariaLabelledBy:ce,ariaLevel:D,ariaLive:null,ariaModal:Pe,ariaMultiLine:Pe,ariaMultiSelectable:Pe,ariaOrientation:null,ariaOwns:ce,ariaPlaceholder:null,ariaPosInSet:D,ariaPressed:Pe,ariaReadOnly:Pe,ariaRelevant:null,ariaRequired:Pe,ariaRoleDescription:ce,ariaRowCount:D,ariaRowIndex:D,ariaRowSpan:D,ariaSelected:Pe,ariaSetSize:D,ariaSort:null,ariaValueMax:D,ariaValueMin:D,ariaValueNow:D,ariaValueText:null,role:null},transform(e,t){return t==="role"?t:"aria-"+t.slice(4).toLowerCase()}});function Yx(e,t){return t in e?e[t]:t}function qx(e,t){return Yx(e,t.toLowerCase())}const dT=gi({attributes:{acceptcharset:"accept-charset",classname:"class",htmlfor:"for",httpequiv:"http-equiv"},mustUseProperty:["checked","multiple","muted","selected"],properties:{abbr:null,accept:Jr,acceptCharset:ce,accessKey:ce,action:null,allow:null,allowFullScreen:Y,allowPaymentRequest:Y,allowUserMedia:Y,alt:null,as:null,async:Y,autoCapitalize:null,autoComplete:ce,autoFocus:Y,autoPlay:Y,blocking:ce,capture:null,charSet:null,checked:Y,cite:null,className:ce,cols:D,colSpan:null,content:null,contentEditable:Pe,controls:Y,controlsList:ce,coords:D|Jr,crossOrigin:null,data:null,dateTime:null,decoding:null,default:Y,defer:Y,dir:null,dirName:null,disabled:Y,download:rc,draggable:Pe,encType:null,enterKeyHint:null,fetchPriority:null,form:null,formAction:null,formEncType:null,formMethod:null,formNoValidate:Y,formTarget:null,headers:ce,height:D,hidden:rc,high:D,href:null,hrefLang:null,htmlFor:ce,httpEquiv:ce,id:null,imageSizes:null,imageSrcSet:null,inert:Y,inputMode:null,integrity:null,is:null,isMap:Y,itemId:null,itemProp:ce,itemRef:ce,itemScope:Y,itemType:ce,kind:null,label:null,lang:null,language:null,list:null,loading:null,loop:Y,low:D,manifest:null,max:null,maxLength:D,media:null,method:null,min:null,minLength:D,multiple:Y,muted:Y,name:null,nonce:null,noModule:Y,noValidate:Y,onAbort:null,onAfterPrint:null,onAuxClick:null,onBeforeMatch:null,onBeforePrint:null,onBeforeToggle:null,onBeforeUnload:null,onBlur:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onContextLost:null,onContextMenu:null,onContextRestored:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnded:null,onError:null,onFocus:null,onFormData:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLanguageChange:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadEnd:null,onLoadStart:null,onMessage:null,onMessageError:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRejectionHandled:null,onReset:null,onResize:null,onScroll:null,onScrollEnd:null,onSecurityPolicyViolation:null,onSeeked:null,onSeeking:null,onSelect:null,onSlotChange:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnhandledRejection:null,onUnload:null,onVolumeChange:null,onWaiting:null,onWheel:null,open:Y,optimum:D,pattern:null,ping:ce,placeholder:null,playsInline:Y,popover:null,popoverTarget:null,popoverTargetAction:null,poster:null,preload:null,readOnly:Y,referrerPolicy:null,rel:ce,required:Y,reversed:Y,rows:D,rowSpan:D,sandbox:ce,scope:null,scoped:Y,seamless:Y,selected:Y,shadowRootClonable:Y,shadowRootDelegatesFocus:Y,shadowRootMode:null,shape:null,size:D,sizes:null,slot:null,span:D,spellCheck:Pe,src:null,srcDoc:null,srcLang:null,srcSet:null,start:D,step:null,style:null,tabIndex:D,target:null,title:null,translate:null,type:null,typeMustMatch:Y,useMap:null,value:Pe,width:D,wrap:null,writingSuggestions:null,align:null,aLink:null,archive:ce,axis:null,background:null,bgColor:null,border:D,borderColor:null,bottomMargin:D,cellPadding:null,cellSpacing:null,char:null,charOff:null,classId:null,clear:null,code:null,codeBase:null,codeType:null,color:null,compact:Y,declare:Y,event:null,face:null,frame:null,frameBorder:null,hSpace:D,leftMargin:D,link:null,longDesc:null,lowSrc:null,marginHeight:D,marginWidth:D,noResize:Y,noHref:Y,noShade:Y,noWrap:Y,object:null,profile:null,prompt:null,rev:null,rightMargin:D,rules:null,scheme:null,scrolling:Pe,standby:null,summary:null,text:null,topMargin:D,valueType:null,version:null,vAlign:null,vLink:null,vSpace:D,allowTransparency:null,autoCorrect:null,autoSave:null,disablePictureInPicture:Y,disableRemotePlayback:Y,prefix:null,property:null,results:D,security:null,unselectable:null},space:"html",transform:qx}),hT=gi({attributes:{accentHeight:"accent-height",alignmentBaseline:"alignment-baseline",arabicForm:"arabic-form",baselineShift:"baseline-shift",capHeight:"cap-height",className:"class",clipPath:"clip-path",clipRule:"clip-rule",colorInterpolation:"color-interpolation",colorInterpolationFilters:"color-interpolation-filters",colorProfile:"color-profile",colorRendering:"color-rendering",crossOrigin:"crossorigin",dataType:"datatype",dominantBaseline:"dominant-baseline",enableBackground:"enable-background",fillOpacity:"fill-opacity",fillRule:"fill-rule",floodColor:"flood-color",floodOpacity:"flood-opacity",fontFamily:"font-family",fontSize:"font-size",fontSizeAdjust:"font-size-adjust",fontStretch:"font-stretch",fontStyle:"font-style",fontVariant:"font-variant",fontWeight:"font-weight",glyphName:"glyph-name",glyphOrientationHorizontal:"glyph-orientation-horizontal",glyphOrientationVertical:"glyph-orientation-vertical",hrefLang:"hreflang",horizAdvX:"horiz-adv-x",horizOriginX:"horiz-origin-x",horizOriginY:"horiz-origin-y",imageRendering:"image-rendering",letterSpacing:"letter-spacing",lightingColor:"lighting-color",markerEnd:"marker-end",markerMid:"marker-mid",markerStart:"marker-start",navDown:"nav-down",navDownLeft:"nav-down-left",navDownRight:"nav-down-right",navLeft:"nav-left",navNext:"nav-next",navPrev:"nav-prev",navRight:"nav-right",navUp:"nav-up",navUpLeft:"nav-up-left",navUpRight:"nav-up-right",onAbort:"onabort",onActivate:"onactivate",onAfterPrint:"onafterprint",onBeforePrint:"onbeforeprint",onBegin:"onbegin",onCancel:"oncancel",onCanPlay:"oncanplay",onCanPlayThrough:"oncanplaythrough",onChange:"onchange",onClick:"onclick",onClose:"onclose",onCopy:"oncopy",onCueChange:"oncuechange",onCut:"oncut",onDblClick:"ondblclick",onDrag:"ondrag",onDragEnd:"ondragend",onDragEnter:"ondragenter",onDragExit:"ondragexit",onDragLeave:"ondragleave",onDragOver:"ondragover",onDragStart:"ondragstart",onDrop:"ondrop",onDurationChange:"ondurationchange",onEmptied:"onemptied",onEnd:"onend",onEnded:"onended",onError:"onerror",onFocus:"onfocus",onFocusIn:"onfocusin",onFocusOut:"onfocusout",onHashChange:"onhashchange",onInput:"oninput",onInvalid:"oninvalid",onKeyDown:"onkeydown",onKeyPress:"onkeypress",onKeyUp:"onkeyup",onLoad:"onload",onLoadedData:"onloadeddata",onLoadedMetadata:"onloadedmetadata",onLoadStart:"onloadstart",onMessage:"onmessage",onMouseDown:"onmousedown",onMouseEnter:"onmouseenter",onMouseLeave:"onmouseleave",onMouseMove:"onmousemove",onMouseOut:"onmouseout",onMouseOver:"onmouseover",onMouseUp:"onmouseup",onMouseWheel:"onmousewheel",onOffline:"onoffline",onOnline:"ononline",onPageHide:"onpagehide",onPageShow:"onpageshow",onPaste:"onpaste",onPause:"onpause",onPlay:"onplay",onPlaying:"onplaying",onPopState:"onpopstate",onProgress:"onprogress",onRateChange:"onratechange",onRepeat:"onrepeat",onReset:"onreset",onResize:"onresize",onScroll:"onscroll",onSeeked:"onseeked",onSeeking:"onseeking",onSelect:"onselect",onShow:"onshow",onStalled:"onstalled",onStorage:"onstorage",onSubmit:"onsubmit",onSuspend:"onsuspend",onTimeUpdate:"ontimeupdate",onToggle:"ontoggle",onUnload:"onunload",onVolumeChange:"onvolumechange",onWaiting:"onwaiting",onZoom:"onzoom",overlinePosition:"overline-position",overlineThickness:"overline-thickness",paintOrder:"paint-order",panose1:"panose-1",pointerEvents:"pointer-events",referrerPolicy:"referrerpolicy",renderingIntent:"rendering-intent",shapeRendering:"shape-rendering",stopColor:"stop-color",stopOpacity:"stop-opacity",strikethroughPosition:"strikethrough-position",strikethroughThickness:"strikethrough-thickness",strokeDashArray:"stroke-dasharray",strokeDashOffset:"stroke-dashoffset",strokeLineCap:"stroke-linecap",strokeLineJoin:"stroke-linejoin",strokeMiterLimit:"stroke-miterlimit",strokeOpacity:"stroke-opacity",strokeWidth:"stroke-width",tabIndex:"tabindex",textAnchor:"text-anchor",textDecoration:"text-decoration",textRendering:"text-rendering",transformOrigin:"transform-origin",typeOf:"typeof",underlinePosition:"underline-position",underlineThickness:"underline-thickness",unicodeBidi:"unicode-bidi",unicodeRange:"unicode-range",unitsPerEm:"units-per-em",vAlphabetic:"v-alphabetic",vHanging:"v-hanging",vIdeographic:"v-ideographic",vMathematical:"v-mathematical",vectorEffect:"vector-effect",vertAdvY:"vert-adv-y",vertOriginX:"vert-origin-x",vertOriginY:"vert-origin-y",wordSpacing:"word-spacing",writingMode:"writing-mode",xHeight:"x-height",playbackOrder:"playbackorder",timelineBegin:"timelinebegin"},properties:{about:dt,accentHeight:D,accumulate:null,additive:null,alignmentBaseline:null,alphabetic:D,amplitude:D,arabicForm:null,ascent:D,attributeName:null,attributeType:null,azimuth:D,bandwidth:null,baselineShift:null,baseFrequency:null,baseProfile:null,bbox:null,begin:null,bias:D,by:null,calcMode:null,capHeight:D,className:ce,clip:null,clipPath:null,clipPathUnits:null,clipRule:null,color:null,colorInterpolation:null,colorInterpolationFilters:null,colorProfile:null,colorRendering:null,content:null,contentScriptType:null,contentStyleType:null,crossOrigin:null,cursor:null,cx:null,cy:null,d:null,dataType:null,defaultAction:null,descent:D,diffuseConstant:D,direction:null,display:null,dur:null,divisor:D,dominantBaseline:null,download:Y,dx:null,dy:null,edgeMode:null,editable:null,elevation:D,enableBackground:null,end:null,event:null,exponent:D,externalResourcesRequired:null,fill:null,fillOpacity:D,fillRule:null,filter:null,filterRes:null,filterUnits:null,floodColor:null,floodOpacity:null,focusable:null,focusHighlight:null,fontFamily:null,fontSize:null,fontSizeAdjust:null,fontStretch:null,fontStyle:null,fontVariant:null,fontWeight:null,format:null,fr:null,from:null,fx:null,fy:null,g1:Jr,g2:Jr,glyphName:Jr,glyphOrientationHorizontal:null,glyphOrientationVertical:null,glyphRef:null,gradientTransform:null,gradientUnits:null,handler:null,hanging:D,hatchContentUnits:null,hatchUnits:null,height:null,href:null,hrefLang:null,horizAdvX:D,horizOriginX:D,horizOriginY:D,id:null,ideographic:D,imageRendering:null,initialVisibility:null,in:null,in2:null,intercept:D,k:D,k1:D,k2:D,k3:D,k4:D,kernelMatrix:dt,kernelUnitLength:null,keyPoints:null,keySplines:null,keyTimes:null,kerning:null,lang:null,lengthAdjust:null,letterSpacing:null,lightingColor:null,limitingConeAngle:D,local:null,markerEnd:null,markerMid:null,markerStart:null,markerHeight:null,markerUnits:null,markerWidth:null,mask:null,maskContentUnits:null,maskUnits:null,mathematical:null,max:null,media:null,mediaCharacterEncoding:null,mediaContentEncodings:null,mediaSize:D,mediaTime:null,method:null,min:null,mode:null,name:null,navDown:null,navDownLeft:null,navDownRight:null,navLeft:null,navNext:null,navPrev:null,navRight:null,navUp:null,navUpLeft:null,navUpRight:null,numOctaves:null,observer:null,offset:null,onAbort:null,onActivate:null,onAfterPrint:null,onBeforePrint:null,onBegin:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnd:null,onEnded:null,onError:null,onFocus:null,onFocusIn:null,onFocusOut:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadStart:null,onMessage:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onMouseWheel:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRepeat:null,onReset:null,onResize:null,onScroll:null,onSeeked:null,onSeeking:null,onSelect:null,onShow:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnload:null,onVolumeChange:null,onWaiting:null,onZoom:null,opacity:null,operator:null,order:null,orient:null,orientation:null,origin:null,overflow:null,overlay:null,overlinePosition:D,overlineThickness:D,paintOrder:null,panose1:null,path:null,pathLength:D,patternContentUnits:null,patternTransform:null,patternUnits:null,phase:null,ping:ce,pitch:null,playbackOrder:null,pointerEvents:null,points:null,pointsAtX:D,pointsAtY:D,pointsAtZ:D,preserveAlpha:null,preserveAspectRatio:null,primitiveUnits:null,propagate:null,property:dt,r:null,radius:null,referrerPolicy:null,refX:null,refY:null,rel:dt,rev:dt,renderingIntent:null,repeatCount:null,repeatDur:null,requiredExtensions:dt,requiredFeatures:dt,requiredFonts:dt,requiredFormats:dt,resource:null,restart:null,result:null,rotate:null,rx:null,ry:null,scale:null,seed:null,shapeRendering:null,side:null,slope:null,snapshotTime:null,specularConstant:D,specularExponent:D,spreadMethod:null,spacing:null,startOffset:null,stdDeviation:null,stemh:null,stemv:null,stitchTiles:null,stopColor:null,stopOpacity:null,strikethroughPosition:D,strikethroughThickness:D,string:null,stroke:null,strokeDashArray:dt,strokeDashOffset:null,strokeLineCap:null,strokeLineJoin:null,strokeMiterLimit:D,strokeOpacity:D,strokeWidth:null,style:null,surfaceScale:D,syncBehavior:null,syncBehaviorDefault:null,syncMaster:null,syncTolerance:null,syncToleranceDefault:null,systemLanguage:dt,tabIndex:D,tableValues:null,target:null,targetX:D,targetY:D,textAnchor:null,textDecoration:null,textRendering:null,textLength:null,timelineBegin:null,title:null,transformBehavior:null,type:null,typeOf:dt,to:null,transform:null,transformOrigin:null,u1:null,u2:null,underlinePosition:D,underlineThickness:D,unicode:null,unicodeBidi:null,unicodeRange:null,unitsPerEm:D,values:null,vAlphabetic:D,vMathematical:D,vectorEffect:null,vHanging:D,vIdeographic:D,version:null,vertAdvY:D,vertOriginX:D,vertOriginY:D,viewBox:null,viewTarget:null,visibility:null,width:null,widths:null,wordSpacing:null,writingMode:null,x:null,x1:null,x2:null,xChannelSelector:null,xHeight:D,y:null,y1:null,y2:null,yChannelSelector:null,z:null,zoomAndPan:null},space:"svg",transform:Yx}),Xx=gi({properties:{xLinkActuate:null,xLinkArcRole:null,xLinkHref:null,xLinkRole:null,xLinkShow:null,xLinkTitle:null,xLinkType:null},space:"xlink",transform(e,t){return"xlink:"+t.slice(5).toLowerCase()}}),Qx=gi({attributes:{xmlnsxlink:"xmlns:xlink"},properties:{xmlnsXLink:null,xmlns:null},space:"xmlns",transform:qx}),Zx=gi({properties:{xmlBase:null,xmlLang:null,xmlSpace:null},space:"xml",transform(e,t){return"xml:"+t.slice(3).toLowerCase()}}),pT={classId:"classID",dataType:"datatype",itemId:"itemID",strokeDashArray:"strokeDasharray",strokeDashOffset:"strokeDashoffset",strokeLineCap:"strokeLinecap",strokeLineJoin:"strokeLinejoin",strokeMiterLimit:"strokeMiterlimit",typeOf:"typeof",xLinkActuate:"xlinkActuate",xLinkArcRole:"xlinkArcrole",xLinkHref:"xlinkHref",xLinkRole:"xlinkRole",xLinkShow:"xlinkShow",xLinkTitle:"xlinkTitle",xLinkType:"xlinkType",xmlnsXLink:"xmlnsXlink"},mT=/[A-Z]/g,em=/-[a-z]/g,gT=/^data[-\w.:]+$/i;function yT(e,t){const n=nc(t);let r=t,i=ut;if(n in e.normal)return e.property[e.normal[n]];if(n.length>4&&n.slice(0,4)==="data"&&gT.test(t)){if(t.charAt(4)==="-"){const s=t.slice(5).replace(em,vT);r="data"+s.charAt(0).toUpperCase()+s.slice(1)}else{const s=t.slice(4);if(!em.test(s)){let o=s.replace(mT,xT);o.charAt(0)!=="-"&&(o="-"+o),t="data"+o}}i=Wf}return new i(r,t)}function xT(e){return"-"+e.toLowerCase()}function vT(e){return e.charAt(1).toUpperCase()}const wT=Wx([Kx,dT,Xx,Qx,Zx],"html"),Kf=Wx([Kx,hT,Xx,Qx,Zx],"svg");function kT(e){return e.join(" ").trim()}var Yf={},tm=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,ST=/\n/g,CT=/^\s*/,ET=/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,bT=/^:\s*/,TT=/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,AT=/^[;\s]*/,PT=/^\s+|\s+$/g,NT=`
`,nm="/",rm="*",nr="",IT="comment",MT="declaration";function RT(e,t){if(typeof e!="string")throw new TypeError("First argument must be a string");if(!e)return[];t=t||{};var n=1,r=1;function i(m){var x=m.match(ST);x&&(n+=x.length);var C=m.lastIndexOf(NT);r=~C?m.length-C:r+m.length}function s(){var m={line:n,column:r};return function(x){return x.position=new o(m),u(),x}}function o(m){this.start=m,this.end={line:n,column:r},this.source=t.source}o.prototype.content=e;function l(m){var x=new Error(t.source+":"+n+":"+r+": "+m);if(x.reason=m,x.filename=t.source,x.line=n,x.column=r,x.source=e,!t.silent)throw x}function a(m){var x=m.exec(e);if(x){var C=x[0];return i(C),e=e.slice(C.length),x}}function u(){a(CT)}function c(m){var x;for(m=m||[];x=f();)x!==!1&&m.push(x);return m}function f(){var m=s();if(!(nm!=e.charAt(0)||rm!=e.charAt(1))){for(var x=2;nr!=e.charAt(x)&&(rm!=e.charAt(x)||nm!=e.charAt(x+1));)++x;if(x+=2,nr===e.charAt(x-1))return l("End of comment missing");var C=e.slice(2,x-2);return r+=2,i(C),e=e.slice(x),r+=2,m({type:IT,comment:C})}}function d(){var m=s(),x=a(ET);if(x){if(f(),!a(bT))return l("property missing ':'");var C=a(TT),p=m({type:MT,property:im(x[0].replace(tm,nr)),value:C?im(C[0].replace(tm,nr)):nr});return a(AT),p}}function h(){var m=[];c(m);for(var x;x=d();)x!==!1&&(m.push(x),c(m));return m}return u(),h()}function im(e){return e?e.replace(PT,nr):nr}var DT=RT,LT=Do&&Do.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(Yf,"__esModule",{value:!0});Yf.default=OT;const _T=LT(DT);function OT(e,t){let n=null;if(!e||typeof e!="string")return n;const r=(0,_T.default)(e),i=typeof t=="function";return r.forEach(s=>{if(s.type!=="declaration")return;const{property:o,value:l}=s;i?t(o,l,s):l&&(n=n||{},n[o]=l)}),n}var Ll={};Object.defineProperty(Ll,"__esModule",{value:!0});Ll.camelCase=void 0;var jT=/^--[a-zA-Z0-9_-]+$/,FT=/-([a-z])/g,zT=/^[^-]+$/,VT=/^-(webkit|moz|ms|o|khtml)-/,BT=/^-(ms)-/,UT=function(e){return!e||zT.test(e)||jT.test(e)},$T=function(e,t){return t.toUpperCase()},sm=function(e,t){return"".concat(t,"-")},HT=function(e,t){return t===void 0&&(t={}),UT(e)?e:(e=e.toLowerCase(),t.reactCompat?e=e.replace(BT,sm):e=e.replace(VT,sm),e.replace(FT,$T))};Ll.camelCase=HT;var GT=Do&&Do.__importDefault||function(e){return e&&e.__esModule?e:{default:e}},WT=GT(Yf),KT=Ll;function sc(e,t){var n={};return!e||typeof e!="string"||(0,WT.default)(e,function(r,i){r&&i&&(n[(0,KT.camelCase)(r,t)]=i)}),n}sc.default=sc;var YT=sc;const qT=pc(YT),Jx=e1("end"),qf=e1("start");function e1(e){return t;function t(n){const r=n&&n.position&&n.position[e]||{};if(typeof r.line=="number"&&r.line>0&&typeof r.column=="number"&&r.column>0)return{line:r.line,column:r.column,offset:typeof r.offset=="number"&&r.offset>-1?r.offset:void 0}}}function XT(e){const t=qf(e),n=Jx(e);if(t&&n)return{start:t,end:n}}function Zi(e){return!e||typeof e!="object"?"":"position"in e||"type"in e?om(e.position):"start"in e||"end"in e?om(e):"line"in e||"column"in e?oc(e):""}function oc(e){return lm(e&&e.line)+":"+lm(e&&e.column)}function om(e){return oc(e&&e.start)+"-"+oc(e&&e.end)}function lm(e){return e&&typeof e=="number"?e:1}class Ye extends Error{constructor(t,n,r){super(),typeof n=="string"&&(r=n,n=void 0);let i="",s={},o=!1;if(n&&("line"in n&&"column"in n?s={place:n}:"start"in n&&"end"in n?s={place:n}:"type"in n?s={ancestors:[n],place:n.position}:s={...n}),typeof t=="string"?i=t:!s.cause&&t&&(o=!0,i=t.message,s.cause=t),!s.ruleId&&!s.source&&typeof r=="string"){const a=r.indexOf(":");a===-1?s.ruleId=r:(s.source=r.slice(0,a),s.ruleId=r.slice(a+1))}if(!s.place&&s.ancestors&&s.ancestors){const a=s.ancestors[s.ancestors.length-1];a&&(s.place=a.position)}const l=s.place&&"start"in s.place?s.place.start:s.place;this.ancestors=s.ancestors||void 0,this.cause=s.cause||void 0,this.column=l?l.column:void 0,this.fatal=void 0,this.file="",this.message=i,this.line=l?l.line:void 0,this.name=Zi(s.place)||"1:1",this.place=s.place||void 0,this.reason=this.message,this.ruleId=s.ruleId||void 0,this.source=s.source||void 0,this.stack=o&&s.cause&&typeof s.cause.stack=="string"?s.cause.stack:"",this.actual=void 0,this.expected=void 0,this.note=void 0,this.url=void 0}}Ye.prototype.file="";Ye.prototype.name="";Ye.prototype.reason="";Ye.prototype.message="";Ye.prototype.stack="";Ye.prototype.column=void 0;Ye.prototype.line=void 0;Ye.prototype.ancestors=void 0;Ye.prototype.cause=void 0;Ye.prototype.fatal=void 0;Ye.prototype.place=void 0;Ye.prototype.ruleId=void 0;Ye.prototype.source=void 0;const Xf={}.hasOwnProperty,QT=new Map,ZT=/[A-Z]/g,JT=new Set(["table","tbody","thead","tfoot","tr"]),eA=new Set(["td","th"]),t1="https://github.com/syntax-tree/hast-util-to-jsx-runtime";function tA(e,t){if(!t||t.Fragment===void 0)throw new TypeError("Expected `Fragment` in options");const n=t.filePath||void 0;let r;if(t.development){if(typeof t.jsxDEV!="function")throw new TypeError("Expected `jsxDEV` in options when `development: true`");r=uA(n,t.jsxDEV)}else{if(typeof t.jsx!="function")throw new TypeError("Expected `jsx` in production options");if(typeof t.jsxs!="function")throw new TypeError("Expected `jsxs` in production options");r=aA(n,t.jsx,t.jsxs)}const i={Fragment:t.Fragment,ancestors:[],components:t.components||{},create:r,elementAttributeNameCase:t.elementAttributeNameCase||"react",evaluater:t.createEvaluater?t.createEvaluater():void 0,filePath:n,ignoreInvalidStyle:t.ignoreInvalidStyle||!1,passKeys:t.passKeys!==!1,passNode:t.passNode||!1,schema:t.space==="svg"?Kf:wT,stylePropertyNameCase:t.stylePropertyNameCase||"dom",tableCellAlignToStyle:t.tableCellAlignToStyle!==!1},s=n1(i,e,void 0);return s&&typeof s!="string"?s:i.create(e,i.Fragment,{children:s||void 0},void 0)}function n1(e,t,n){if(t.type==="element")return nA(e,t,n);if(t.type==="mdxFlowExpression"||t.type==="mdxTextExpression")return rA(e,t);if(t.type==="mdxJsxFlowElement"||t.type==="mdxJsxTextElement")return sA(e,t,n);if(t.type==="mdxjsEsm")return iA(e,t);if(t.type==="root")return oA(e,t,n);if(t.type==="text")return lA(e,t)}function nA(e,t,n){const r=e.schema;let i=r;t.tagName.toLowerCase()==="svg"&&r.space==="html"&&(i=Kf,e.schema=i),e.ancestors.push(t);const s=i1(e,t.tagName,!1),o=cA(e,t);let l=Zf(e,t);return JT.has(t.tagName)&&(l=l.filter(function(a){return typeof a=="string"?!cT(a):!0})),r1(e,o,s,t),Qf(o,l),e.ancestors.pop(),e.schema=r,e.create(t,s,o,n)}function rA(e,t){if(t.data&&t.data.estree&&e.evaluater){const r=t.data.estree.body[0];return r.type,e.evaluater.evaluateExpression(r.expression)}Ts(e,t.position)}function iA(e,t){if(t.data&&t.data.estree&&e.evaluater)return e.evaluater.evaluateProgram(t.data.estree);Ts(e,t.position)}function sA(e,t,n){const r=e.schema;let i=r;t.name==="svg"&&r.space==="html"&&(i=Kf,e.schema=i),e.ancestors.push(t);const s=t.name===null?e.Fragment:i1(e,t.name,!0),o=fA(e,t),l=Zf(e,t);return r1(e,o,s,t),Qf(o,l),e.ancestors.pop(),e.schema=r,e.create(t,s,o,n)}function oA(e,t,n){const r={};return Qf(r,Zf(e,t)),e.create(t,e.Fragment,r,n)}function lA(e,t){return t.value}function r1(e,t,n,r){typeof n!="string"&&n!==e.Fragment&&e.passNode&&(t.node=r)}function Qf(e,t){if(t.length>0){const n=t.length>1?t:t[0];n&&(e.children=n)}}function aA(e,t,n){return r;function r(i,s,o,l){const u=Array.isArray(o.children)?n:t;return l?u(s,o,l):u(s,o)}}function uA(e,t){return n;function n(r,i,s,o){const l=Array.isArray(s.children),a=qf(r);return t(i,s,o,l,{columnNumber:a?a.column-1:void 0,fileName:e,lineNumber:a?a.line:void 0},void 0)}}function cA(e,t){const n={};let r,i;for(i in t.properties)if(i!=="children"&&Xf.call(t.properties,i)){const s=dA(e,i,t.properties[i]);if(s){const[o,l]=s;e.tableCellAlignToStyle&&o==="align"&&typeof l=="string"&&eA.has(t.tagName)?r=l:n[o]=l}}if(r){const s=n.style||(n.style={});s[e.stylePropertyNameCase==="css"?"text-align":"textAlign"]=r}return n}function fA(e,t){const n={};for(const r of t.attributes)if(r.type==="mdxJsxExpressionAttribute")if(r.data&&r.data.estree&&e.evaluater){const s=r.data.estree.body[0];s.type;const o=s.expression;o.type;const l=o.properties[0];l.type,Object.assign(n,e.evaluater.evaluateExpression(l.argument))}else Ts(e,t.position);else{const i=r.name;let s;if(r.value&&typeof r.value=="object")if(r.value.data&&r.value.data.estree&&e.evaluater){const l=r.value.data.estree.body[0];l.type,s=e.evaluater.evaluateExpression(l.expression)}else Ts(e,t.position);else s=r.value===null?!0:r.value;n[i]=s}return n}function Zf(e,t){const n=[];let r=-1;const i=e.passKeys?new Map:QT;for(;++r<t.children.length;){const s=t.children[r];let o;if(e.passKeys){const a=s.type==="element"?s.tagName:s.type==="mdxJsxFlowElement"||s.type==="mdxJsxTextElement"?s.name:void 0;if(a){const u=i.get(a)||0;o=a+"-"+u,i.set(a,u+1)}}const l=n1(e,s,o);l!==void 0&&n.push(l)}return n}function dA(e,t,n){const r=yT(e.schema,t);if(!(n==null||typeof n=="number"&&Number.isNaN(n))){if(Array.isArray(n)&&(n=r.commaSeparated?sT(n):kT(n)),r.property==="style"){let i=typeof n=="object"?n:hA(e,String(n));return e.stylePropertyNameCase==="css"&&(i=pA(i)),["style",i]}return[e.elementAttributeNameCase==="react"&&r.space?pT[r.property]||r.property:r.attribute,n]}}function hA(e,t){try{return qT(t,{reactCompat:!0})}catch(n){if(e.ignoreInvalidStyle)return{};const r=n,i=new Ye("Cannot parse `style` attribute",{ancestors:e.ancestors,cause:r,ruleId:"style",source:"hast-util-to-jsx-runtime"});throw i.file=e.filePath||void 0,i.url=t1+"#cannot-parse-style-attribute",i}}function i1(e,t,n){let r;if(!n)r={type:"Literal",value:t};else if(t.includes(".")){const i=t.split(".");let s=-1,o;for(;++s<i.length;){const l=Qp(i[s])?{type:"Identifier",name:i[s]}:{type:"Literal",value:i[s]};o=o?{type:"MemberExpression",object:o,property:l,computed:!!(s&&l.type==="Literal"),optional:!1}:l}r=o}else r=Qp(t)&&!/^[a-z]/.test(t)?{type:"Identifier",name:t}:{type:"Literal",value:t};if(r.type==="Literal"){const i=r.value;return Xf.call(e.components,i)?e.components[i]:i}if(e.evaluater)return e.evaluater.evaluateExpression(r);Ts(e)}function Ts(e,t){const n=new Ye("Cannot handle MDX estrees without `createEvaluater`",{ancestors:e.ancestors,place:t,ruleId:"mdx-estree",source:"hast-util-to-jsx-runtime"});throw n.file=e.filePath||void 0,n.url=t1+"#cannot-handle-mdx-estrees-without-createevaluater",n}function pA(e){const t={};let n;for(n in e)Xf.call(e,n)&&(t[mA(n)]=e[n]);return t}function mA(e){let t=e.replace(ZT,gA);return t.slice(0,3)==="ms-"&&(t="-"+t),t}function gA(e){return"-"+e.toLowerCase()}const Pa={action:["form"],cite:["blockquote","del","ins","q"],data:["object"],formAction:["button","input"],href:["a","area","base","link"],icon:["menuitem"],itemId:null,manifest:["html"],ping:["a","area"],poster:["video"],src:["audio","embed","iframe","img","input","script","source","track","video"]},yA={};function Jf(e,t){const n=yA,r=typeof n.includeImageAlt=="boolean"?n.includeImageAlt:!0,i=typeof n.includeHtml=="boolean"?n.includeHtml:!0;return s1(e,r,i)}function s1(e,t,n){if(xA(e)){if("value"in e)return e.type==="html"&&!n?"":e.value;if(t&&"alt"in e&&e.alt)return e.alt;if("children"in e)return am(e.children,t,n)}return Array.isArray(e)?am(e,t,n):""}function am(e,t,n){const r=[];let i=-1;for(;++i<e.length;)r[i]=s1(e[i],t,n);return r.join("")}function xA(e){return!!(e&&typeof e=="object")}const um=document.createElement("i");function ed(e){const t="&"+e+";";um.innerHTML=t;const n=um.textContent;return n.charCodeAt(n.length-1)===59&&e!=="semi"||n===t?!1:n}function gt(e,t,n,r){const i=e.length;let s=0,o;if(t<0?t=-t>i?0:i+t:t=t>i?i:t,n=n>0?n:0,r.length<1e4)o=Array.from(r),o.unshift(t,n),e.splice(...o);else for(n&&e.splice(t,n);s<r.length;)o=r.slice(s,s+1e4),o.unshift(t,0),e.splice(...o),s+=1e4,t+=1e4}function bt(e,t){return e.length>0?(gt(e,e.length,0,t),e):t}const cm={}.hasOwnProperty;function o1(e){const t={};let n=-1;for(;++n<e.length;)vA(t,e[n]);return t}function vA(e,t){let n;for(n in t){const i=(cm.call(e,n)?e[n]:void 0)||(e[n]={}),s=t[n];let o;if(s)for(o in s){cm.call(i,o)||(i[o]=[]);const l=s[o];wA(i[o],Array.isArray(l)?l:l?[l]:[])}}}function wA(e,t){let n=-1;const r=[];for(;++n<t.length;)(t[n].add==="after"?e:r).push(t[n]);gt(e,0,0,r)}function l1(e,t){const n=Number.parseInt(e,t);return n<9||n===11||n>13&&n<32||n>126&&n<160||n>55295&&n<57344||n>64975&&n<65008||(n&65535)===65535||(n&65535)===65534||n>1114111?"�":String.fromCodePoint(n)}function Vt(e){return e.replace(/[\t\n\r ]+/g," ").replace(/^ | $/g,"").toLowerCase().toUpperCase()}const Xe=Wn(/[A-Za-z]/),We=Wn(/[\dA-Za-z]/),kA=Wn(/[#-'*+\--9=?A-Z^-~]/);function ul(e){return e!==null&&(e<32||e===127)}const lc=Wn(/\d/),SA=Wn(/[\dA-Fa-f]/),CA=Wn(/[!-/:-@[-`{-~]/);function U(e){return e!==null&&e<-2}function ue(e){return e!==null&&(e<0||e===32)}function X(e){return e===-2||e===-1||e===32}const _l=Wn(new RegExp("\\p{P}|\\p{S}","u")),vr=Wn(/\s/);function Wn(e){return t;function t(n){return n!==null&&n>-1&&e.test(String.fromCharCode(n))}}function yi(e){const t=[];let n=-1,r=0,i=0;for(;++n<e.length;){const s=e.charCodeAt(n);let o="";if(s===37&&We(e.charCodeAt(n+1))&&We(e.charCodeAt(n+2)))i=2;else if(s<128)/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(s))||(o=String.fromCharCode(s));else if(s>55295&&s<57344){const l=e.charCodeAt(n+1);s<56320&&l>56319&&l<57344?(o=String.fromCharCode(s,l),i=1):o="�"}else o=String.fromCharCode(s);o&&(t.push(e.slice(r,n),encodeURIComponent(o)),r=n+i+1,o=""),i&&(n+=i,i=0)}return t.join("")+e.slice(r)}function te(e,t,n,r){const i=r?r-1:Number.POSITIVE_INFINITY;let s=0;return o;function o(a){return X(a)?(e.enter(n),l(a)):t(a)}function l(a){return X(a)&&s++<i?(e.consume(a),l):(e.exit(n),t(a))}}const EA={tokenize:bA};function bA(e){const t=e.attempt(this.parser.constructs.contentInitial,r,i);let n;return t;function r(l){if(l===null){e.consume(l);return}return e.enter("lineEnding"),e.consume(l),e.exit("lineEnding"),te(e,t,"linePrefix")}function i(l){return e.enter("paragraph"),s(l)}function s(l){const a=e.enter("chunkText",{contentType:"text",previous:n});return n&&(n.next=a),n=a,o(l)}function o(l){if(l===null){e.exit("chunkText"),e.exit("paragraph"),e.consume(l);return}return U(l)?(e.consume(l),e.exit("chunkText"),s):(e.consume(l),o)}}const TA={tokenize:AA},fm={tokenize:PA};function AA(e){const t=this,n=[];let r=0,i,s,o;return l;function l(y){if(r<n.length){const b=n[r];return t.containerState=b[1],e.attempt(b[0].continuation,a,u)(y)}return u(y)}function a(y){if(r++,t.containerState._closeFlow){t.containerState._closeFlow=void 0,i&&g();const b=t.events.length;let T=b,k;for(;T--;)if(t.events[T][0]==="exit"&&t.events[T][1].type==="chunkFlow"){k=t.events[T][1].end;break}p(r);let A=b;for(;A<t.events.length;)t.events[A][1].end={...k},A++;return gt(t.events,T+1,0,t.events.slice(b)),t.events.length=A,u(y)}return l(y)}function u(y){if(r===n.length){if(!i)return d(y);if(i.currentConstruct&&i.currentConstruct.concrete)return m(y);t.interrupt=!!(i.currentConstruct&&!i._gfmTableDynamicInterruptHack)}return t.containerState={},e.check(fm,c,f)(y)}function c(y){return i&&g(),p(r),d(y)}function f(y){return t.parser.lazy[t.now().line]=r!==n.length,o=t.now().offset,m(y)}function d(y){return t.containerState={},e.attempt(fm,h,m)(y)}function h(y){return r++,n.push([t.currentConstruct,t.containerState]),d(y)}function m(y){if(y===null){i&&g(),p(0),e.consume(y);return}return i=i||t.parser.flow(t.now()),e.enter("chunkFlow",{_tokenizer:i,contentType:"flow",previous:s}),x(y)}function x(y){if(y===null){C(e.exit("chunkFlow"),!0),p(0),e.consume(y);return}return U(y)?(e.consume(y),C(e.exit("chunkFlow")),r=0,t.interrupt=void 0,l):(e.consume(y),x)}function C(y,b){const T=t.sliceStream(y);if(b&&T.push(null),y.previous=s,s&&(s.next=y),s=y,i.defineSkip(y.start),i.write(T),t.parser.lazy[y.start.line]){let k=i.events.length;for(;k--;)if(i.events[k][1].start.offset<o&&(!i.events[k][1].end||i.events[k][1].end.offset>o))return;const A=t.events.length;let P=A,O,E;for(;P--;)if(t.events[P][0]==="exit"&&t.events[P][1].type==="chunkFlow"){if(O){E=t.events[P][1].end;break}O=!0}for(p(r),k=A;k<t.events.length;)t.events[k][1].end={...E},k++;gt(t.events,P+1,0,t.events.slice(A)),t.events.length=k}}function p(y){let b=n.length;for(;b-- >y;){const T=n[b];t.containerState=T[1],T[0].exit.call(t,e)}n.length=y}function g(){i.write([null]),s=void 0,i=void 0,t.containerState._closeFlow=void 0}}function PA(e,t,n){return te(e,e.attempt(this.parser.constructs.document,t,n),"linePrefix",this.parser.constructs.disable.null.includes("codeIndented")?void 0:4)}function ui(e){if(e===null||ue(e)||vr(e))return 1;if(_l(e))return 2}function Ol(e,t,n){const r=[];let i=-1;for(;++i<e.length;){const s=e[i].resolveAll;s&&!r.includes(s)&&(t=s(t,n),r.push(s))}return t}const ac={name:"attention",resolveAll:NA,tokenize:IA};function NA(e,t){let n=-1,r,i,s,o,l,a,u,c;for(;++n<e.length;)if(e[n][0]==="enter"&&e[n][1].type==="attentionSequence"&&e[n][1]._close){for(r=n;r--;)if(e[r][0]==="exit"&&e[r][1].type==="attentionSequence"&&e[r][1]._open&&t.sliceSerialize(e[r][1]).charCodeAt(0)===t.sliceSerialize(e[n][1]).charCodeAt(0)){if((e[r][1]._close||e[n][1]._open)&&(e[n][1].end.offset-e[n][1].start.offset)%3&&!((e[r][1].end.offset-e[r][1].start.offset+e[n][1].end.offset-e[n][1].start.offset)%3))continue;a=e[r][1].end.offset-e[r][1].start.offset>1&&e[n][1].end.offset-e[n][1].start.offset>1?2:1;const f={...e[r][1].end},d={...e[n][1].start};dm(f,-a),dm(d,a),o={type:a>1?"strongSequence":"emphasisSequence",start:f,end:{...e[r][1].end}},l={type:a>1?"strongSequence":"emphasisSequence",start:{...e[n][1].start},end:d},s={type:a>1?"strongText":"emphasisText",start:{...e[r][1].end},end:{...e[n][1].start}},i={type:a>1?"strong":"emphasis",start:{...o.start},end:{...l.end}},e[r][1].end={...o.start},e[n][1].start={...l.end},u=[],e[r][1].end.offset-e[r][1].start.offset&&(u=bt(u,[["enter",e[r][1],t],["exit",e[r][1],t]])),u=bt(u,[["enter",i,t],["enter",o,t],["exit",o,t],["enter",s,t]]),u=bt(u,Ol(t.parser.constructs.insideSpan.null,e.slice(r+1,n),t)),u=bt(u,[["exit",s,t],["enter",l,t],["exit",l,t],["exit",i,t]]),e[n][1].end.offset-e[n][1].start.offset?(c=2,u=bt(u,[["enter",e[n][1],t],["exit",e[n][1],t]])):c=0,gt(e,r-1,n-r+3,u),n=r+u.length-c-2;break}}for(n=-1;++n<e.length;)e[n][1].type==="attentionSequence"&&(e[n][1].type="data");return e}function IA(e,t){const n=this.parser.constructs.attentionMarkers.null,r=this.previous,i=ui(r);let s;return o;function o(a){return s=a,e.enter("attentionSequence"),l(a)}function l(a){if(a===s)return e.consume(a),l;const u=e.exit("attentionSequence"),c=ui(a),f=!c||c===2&&i||n.includes(a),d=!i||i===2&&c||n.includes(r);return u._open=!!(s===42?f:f&&(i||!d)),u._close=!!(s===42?d:d&&(c||!f)),t(a)}}function dm(e,t){e.column+=t,e.offset+=t,e._bufferIndex+=t}const MA={name:"autolink",tokenize:RA};function RA(e,t,n){let r=0;return i;function i(h){return e.enter("autolink"),e.enter("autolinkMarker"),e.consume(h),e.exit("autolinkMarker"),e.enter("autolinkProtocol"),s}function s(h){return Xe(h)?(e.consume(h),o):h===64?n(h):u(h)}function o(h){return h===43||h===45||h===46||We(h)?(r=1,l(h)):u(h)}function l(h){return h===58?(e.consume(h),r=0,a):(h===43||h===45||h===46||We(h))&&r++<32?(e.consume(h),l):(r=0,u(h))}function a(h){return h===62?(e.exit("autolinkProtocol"),e.enter("autolinkMarker"),e.consume(h),e.exit("autolinkMarker"),e.exit("autolink"),t):h===null||h===32||h===60||ul(h)?n(h):(e.consume(h),a)}function u(h){return h===64?(e.consume(h),c):kA(h)?(e.consume(h),u):n(h)}function c(h){return We(h)?f(h):n(h)}function f(h){return h===46?(e.consume(h),r=0,c):h===62?(e.exit("autolinkProtocol").type="autolinkEmail",e.enter("autolinkMarker"),e.consume(h),e.exit("autolinkMarker"),e.exit("autolink"),t):d(h)}function d(h){if((h===45||We(h))&&r++<63){const m=h===45?d:f;return e.consume(h),m}return n(h)}}const zs={partial:!0,tokenize:DA};function DA(e,t,n){return r;function r(s){return X(s)?te(e,i,"linePrefix")(s):i(s)}function i(s){return s===null||U(s)?t(s):n(s)}}const a1={continuation:{tokenize:_A},exit:OA,name:"blockQuote",tokenize:LA};function LA(e,t,n){const r=this;return i;function i(o){if(o===62){const l=r.containerState;return l.open||(e.enter("blockQuote",{_container:!0}),l.open=!0),e.enter("blockQuotePrefix"),e.enter("blockQuoteMarker"),e.consume(o),e.exit("blockQuoteMarker"),s}return n(o)}function s(o){return X(o)?(e.enter("blockQuotePrefixWhitespace"),e.consume(o),e.exit("blockQuotePrefixWhitespace"),e.exit("blockQuotePrefix"),t):(e.exit("blockQuotePrefix"),t(o))}}function _A(e,t,n){const r=this;return i;function i(o){return X(o)?te(e,s,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(o):s(o)}function s(o){return e.attempt(a1,t,n)(o)}}function OA(e){e.exit("blockQuote")}const u1={name:"characterEscape",tokenize:jA};function jA(e,t,n){return r;function r(s){return e.enter("characterEscape"),e.enter("escapeMarker"),e.consume(s),e.exit("escapeMarker"),i}function i(s){return CA(s)?(e.enter("characterEscapeValue"),e.consume(s),e.exit("characterEscapeValue"),e.exit("characterEscape"),t):n(s)}}const c1={name:"characterReference",tokenize:FA};function FA(e,t,n){const r=this;let i=0,s,o;return l;function l(f){return e.enter("characterReference"),e.enter("characterReferenceMarker"),e.consume(f),e.exit("characterReferenceMarker"),a}function a(f){return f===35?(e.enter("characterReferenceMarkerNumeric"),e.consume(f),e.exit("characterReferenceMarkerNumeric"),u):(e.enter("characterReferenceValue"),s=31,o=We,c(f))}function u(f){return f===88||f===120?(e.enter("characterReferenceMarkerHexadecimal"),e.consume(f),e.exit("characterReferenceMarkerHexadecimal"),e.enter("characterReferenceValue"),s=6,o=SA,c):(e.enter("characterReferenceValue"),s=7,o=lc,c(f))}function c(f){if(f===59&&i){const d=e.exit("characterReferenceValue");return o===We&&!ed(r.sliceSerialize(d))?n(f):(e.enter("characterReferenceMarker"),e.consume(f),e.exit("characterReferenceMarker"),e.exit("characterReference"),t)}return o(f)&&i++<s?(e.consume(f),c):n(f)}}const hm={partial:!0,tokenize:VA},pm={concrete:!0,name:"codeFenced",tokenize:zA};function zA(e,t,n){const r=this,i={partial:!0,tokenize:T};let s=0,o=0,l;return a;function a(k){return u(k)}function u(k){const A=r.events[r.events.length-1];return s=A&&A[1].type==="linePrefix"?A[2].sliceSerialize(A[1],!0).length:0,l=k,e.enter("codeFenced"),e.enter("codeFencedFence"),e.enter("codeFencedFenceSequence"),c(k)}function c(k){return k===l?(o++,e.consume(k),c):o<3?n(k):(e.exit("codeFencedFenceSequence"),X(k)?te(e,f,"whitespace")(k):f(k))}function f(k){return k===null||U(k)?(e.exit("codeFencedFence"),r.interrupt?t(k):e.check(hm,x,b)(k)):(e.enter("codeFencedFenceInfo"),e.enter("chunkString",{contentType:"string"}),d(k))}function d(k){return k===null||U(k)?(e.exit("chunkString"),e.exit("codeFencedFenceInfo"),f(k)):X(k)?(e.exit("chunkString"),e.exit("codeFencedFenceInfo"),te(e,h,"whitespace")(k)):k===96&&k===l?n(k):(e.consume(k),d)}function h(k){return k===null||U(k)?f(k):(e.enter("codeFencedFenceMeta"),e.enter("chunkString",{contentType:"string"}),m(k))}function m(k){return k===null||U(k)?(e.exit("chunkString"),e.exit("codeFencedFenceMeta"),f(k)):k===96&&k===l?n(k):(e.consume(k),m)}function x(k){return e.attempt(i,b,C)(k)}function C(k){return e.enter("lineEnding"),e.consume(k),e.exit("lineEnding"),p}function p(k){return s>0&&X(k)?te(e,g,"linePrefix",s+1)(k):g(k)}function g(k){return k===null||U(k)?e.check(hm,x,b)(k):(e.enter("codeFlowValue"),y(k))}function y(k){return k===null||U(k)?(e.exit("codeFlowValue"),g(k)):(e.consume(k),y)}function b(k){return e.exit("codeFenced"),t(k)}function T(k,A,P){let O=0;return E;function E(B){return k.enter("lineEnding"),k.consume(B),k.exit("lineEnding"),L}function L(B){return k.enter("codeFencedFence"),X(B)?te(k,j,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(B):j(B)}function j(B){return B===l?(k.enter("codeFencedFenceSequence"),K(B)):P(B)}function K(B){return B===l?(O++,k.consume(B),K):O>=o?(k.exit("codeFencedFenceSequence"),X(B)?te(k,J,"whitespace")(B):J(B)):P(B)}function J(B){return B===null||U(B)?(k.exit("codeFencedFence"),A(B)):P(B)}}}function VA(e,t,n){const r=this;return i;function i(o){return o===null?n(o):(e.enter("lineEnding"),e.consume(o),e.exit("lineEnding"),s)}function s(o){return r.parser.lazy[r.now().line]?n(o):t(o)}}const Na={name:"codeIndented",tokenize:UA},BA={partial:!0,tokenize:$A};function UA(e,t,n){const r=this;return i;function i(u){return e.enter("codeIndented"),te(e,s,"linePrefix",5)(u)}function s(u){const c=r.events[r.events.length-1];return c&&c[1].type==="linePrefix"&&c[2].sliceSerialize(c[1],!0).length>=4?o(u):n(u)}function o(u){return u===null?a(u):U(u)?e.attempt(BA,o,a)(u):(e.enter("codeFlowValue"),l(u))}function l(u){return u===null||U(u)?(e.exit("codeFlowValue"),o(u)):(e.consume(u),l)}function a(u){return e.exit("codeIndented"),t(u)}}function $A(e,t,n){const r=this;return i;function i(o){return r.parser.lazy[r.now().line]?n(o):U(o)?(e.enter("lineEnding"),e.consume(o),e.exit("lineEnding"),i):te(e,s,"linePrefix",5)(o)}function s(o){const l=r.events[r.events.length-1];return l&&l[1].type==="linePrefix"&&l[2].sliceSerialize(l[1],!0).length>=4?t(o):U(o)?i(o):n(o)}}const HA={name:"codeText",previous:WA,resolve:GA,tokenize:KA};function GA(e){let t=e.length-4,n=3,r,i;if((e[n][1].type==="lineEnding"||e[n][1].type==="space")&&(e[t][1].type==="lineEnding"||e[t][1].type==="space")){for(r=n;++r<t;)if(e[r][1].type==="codeTextData"){e[n][1].type="codeTextPadding",e[t][1].type="codeTextPadding",n+=2,t-=2;break}}for(r=n-1,t++;++r<=t;)i===void 0?r!==t&&e[r][1].type!=="lineEnding"&&(i=r):(r===t||e[r][1].type==="lineEnding")&&(e[i][1].type="codeTextData",r!==i+2&&(e[i][1].end=e[r-1][1].end,e.splice(i+2,r-i-2),t-=r-i-2,r=i+2),i=void 0);return e}function WA(e){return e!==96||this.events[this.events.length-1][1].type==="characterEscape"}function KA(e,t,n){let r=0,i,s;return o;function o(f){return e.enter("codeText"),e.enter("codeTextSequence"),l(f)}function l(f){return f===96?(e.consume(f),r++,l):(e.exit("codeTextSequence"),a(f))}function a(f){return f===null?n(f):f===32?(e.enter("space"),e.consume(f),e.exit("space"),a):f===96?(s=e.enter("codeTextSequence"),i=0,c(f)):U(f)?(e.enter("lineEnding"),e.consume(f),e.exit("lineEnding"),a):(e.enter("codeTextData"),u(f))}function u(f){return f===null||f===32||f===96||U(f)?(e.exit("codeTextData"),a(f)):(e.consume(f),u)}function c(f){return f===96?(e.consume(f),i++,c):i===r?(e.exit("codeTextSequence"),e.exit("codeText"),t(f)):(s.type="codeTextData",u(f))}}class YA{constructor(t){this.left=t?[...t]:[],this.right=[]}get(t){if(t<0||t>=this.left.length+this.right.length)throw new RangeError("Cannot access index `"+t+"` in a splice buffer of size `"+(this.left.length+this.right.length)+"`");return t<this.left.length?this.left[t]:this.right[this.right.length-t+this.left.length-1]}get length(){return this.left.length+this.right.length}shift(){return this.setCursor(0),this.right.pop()}slice(t,n){const r=n??Number.POSITIVE_INFINITY;return r<this.left.length?this.left.slice(t,r):t>this.left.length?this.right.slice(this.right.length-r+this.left.length,this.right.length-t+this.left.length).reverse():this.left.slice(t).concat(this.right.slice(this.right.length-r+this.left.length).reverse())}splice(t,n,r){const i=n||0;this.setCursor(Math.trunc(t));const s=this.right.splice(this.right.length-i,Number.POSITIVE_INFINITY);return r&&Ni(this.left,r),s.reverse()}pop(){return this.setCursor(Number.POSITIVE_INFINITY),this.left.pop()}push(t){this.setCursor(Number.POSITIVE_INFINITY),this.left.push(t)}pushMany(t){this.setCursor(Number.POSITIVE_INFINITY),Ni(this.left,t)}unshift(t){this.setCursor(0),this.right.push(t)}unshiftMany(t){this.setCursor(0),Ni(this.right,t.reverse())}setCursor(t){if(!(t===this.left.length||t>this.left.length&&this.right.length===0||t<0&&this.left.length===0))if(t<this.left.length){const n=this.left.splice(t,Number.POSITIVE_INFINITY);Ni(this.right,n.reverse())}else{const n=this.right.splice(this.left.length+this.right.length-t,Number.POSITIVE_INFINITY);Ni(this.left,n.reverse())}}}function Ni(e,t){let n=0;if(t.length<1e4)e.push(...t);else for(;n<t.length;)e.push(...t.slice(n,n+1e4)),n+=1e4}function f1(e){const t={};let n=-1,r,i,s,o,l,a,u;const c=new YA(e);for(;++n<c.length;){for(;n in t;)n=t[n];if(r=c.get(n),n&&r[1].type==="chunkFlow"&&c.get(n-1)[1].type==="listItemPrefix"&&(a=r[1]._tokenizer.events,s=0,s<a.length&&a[s][1].type==="lineEndingBlank"&&(s+=2),s<a.length&&a[s][1].type==="content"))for(;++s<a.length&&a[s][1].type!=="content";)a[s][1].type==="chunkText"&&(a[s][1]._isInFirstContentOfListItem=!0,s++);if(r[0]==="enter")r[1].contentType&&(Object.assign(t,qA(c,n)),n=t[n],u=!0);else if(r[1]._container){for(s=n,i=void 0;s--;)if(o=c.get(s),o[1].type==="lineEnding"||o[1].type==="lineEndingBlank")o[0]==="enter"&&(i&&(c.get(i)[1].type="lineEndingBlank"),o[1].type="lineEnding",i=s);else if(!(o[1].type==="linePrefix"||o[1].type==="listItemIndent"))break;i&&(r[1].end={...c.get(i)[1].start},l=c.slice(i,n),l.unshift(r),c.splice(i,n-i+1,l))}}return gt(e,0,Number.POSITIVE_INFINITY,c.slice(0)),!u}function qA(e,t){const n=e.get(t)[1],r=e.get(t)[2];let i=t-1;const s=[];let o=n._tokenizer;o||(o=r.parser[n.contentType](n.start),n._contentTypeTextTrailing&&(o._contentTypeTextTrailing=!0));const l=o.events,a=[],u={};let c,f,d=-1,h=n,m=0,x=0;const C=[x];for(;h;){for(;e.get(++i)[1]!==h;);s.push(i),h._tokenizer||(c=r.sliceStream(h),h.next||c.push(null),f&&o.defineSkip(h.start),h._isInFirstContentOfListItem&&(o._gfmTasklistFirstContentOfListItem=!0),o.write(c),h._isInFirstContentOfListItem&&(o._gfmTasklistFirstContentOfListItem=void 0)),f=h,h=h.next}for(h=n;++d<l.length;)l[d][0]==="exit"&&l[d-1][0]==="enter"&&l[d][1].type===l[d-1][1].type&&l[d][1].start.line!==l[d][1].end.line&&(x=d+1,C.push(x),h._tokenizer=void 0,h.previous=void 0,h=h.next);for(o.events=[],h?(h._tokenizer=void 0,h.previous=void 0):C.pop(),d=C.length;d--;){const p=l.slice(C[d],C[d+1]),g=s.pop();a.push([g,g+p.length-1]),e.splice(g,2,p)}for(a.reverse(),d=-1;++d<a.length;)u[m+a[d][0]]=m+a[d][1],m+=a[d][1]-a[d][0]-1;return u}const XA={resolve:ZA,tokenize:JA},QA={partial:!0,tokenize:eP};function ZA(e){return f1(e),e}function JA(e,t){let n;return r;function r(l){return e.enter("content"),n=e.enter("chunkContent",{contentType:"content"}),i(l)}function i(l){return l===null?s(l):U(l)?e.check(QA,o,s)(l):(e.consume(l),i)}function s(l){return e.exit("chunkContent"),e.exit("content"),t(l)}function o(l){return e.consume(l),e.exit("chunkContent"),n.next=e.enter("chunkContent",{contentType:"content",previous:n}),n=n.next,i}}function eP(e,t,n){const r=this;return i;function i(o){return e.exit("chunkContent"),e.enter("lineEnding"),e.consume(o),e.exit("lineEnding"),te(e,s,"linePrefix")}function s(o){if(o===null||U(o))return n(o);const l=r.events[r.events.length-1];return!r.parser.constructs.disable.null.includes("codeIndented")&&l&&l[1].type==="linePrefix"&&l[2].sliceSerialize(l[1],!0).length>=4?t(o):e.interrupt(r.parser.constructs.flow,n,t)(o)}}function d1(e,t,n,r,i,s,o,l,a){const u=a||Number.POSITIVE_INFINITY;let c=0;return f;function f(p){return p===60?(e.enter(r),e.enter(i),e.enter(s),e.consume(p),e.exit(s),d):p===null||p===32||p===41||ul(p)?n(p):(e.enter(r),e.enter(o),e.enter(l),e.enter("chunkString",{contentType:"string"}),x(p))}function d(p){return p===62?(e.enter(s),e.consume(p),e.exit(s),e.exit(i),e.exit(r),t):(e.enter(l),e.enter("chunkString",{contentType:"string"}),h(p))}function h(p){return p===62?(e.exit("chunkString"),e.exit(l),d(p)):p===null||p===60||U(p)?n(p):(e.consume(p),p===92?m:h)}function m(p){return p===60||p===62||p===92?(e.consume(p),h):h(p)}function x(p){return!c&&(p===null||p===41||ue(p))?(e.exit("chunkString"),e.exit(l),e.exit(o),e.exit(r),t(p)):c<u&&p===40?(e.consume(p),c++,x):p===41?(e.consume(p),c--,x):p===null||p===32||p===40||ul(p)?n(p):(e.consume(p),p===92?C:x)}function C(p){return p===40||p===41||p===92?(e.consume(p),x):x(p)}}function h1(e,t,n,r,i,s){const o=this;let l=0,a;return u;function u(h){return e.enter(r),e.enter(i),e.consume(h),e.exit(i),e.enter(s),c}function c(h){return l>999||h===null||h===91||h===93&&!a||h===94&&!l&&"_hiddenFootnoteSupport"in o.parser.constructs?n(h):h===93?(e.exit(s),e.enter(i),e.consume(h),e.exit(i),e.exit(r),t):U(h)?(e.enter("lineEnding"),e.consume(h),e.exit("lineEnding"),c):(e.enter("chunkString",{contentType:"string"}),f(h))}function f(h){return h===null||h===91||h===93||U(h)||l++>999?(e.exit("chunkString"),c(h)):(e.consume(h),a||(a=!X(h)),h===92?d:f)}function d(h){return h===91||h===92||h===93?(e.consume(h),l++,f):f(h)}}function p1(e,t,n,r,i,s){let o;return l;function l(d){return d===34||d===39||d===40?(e.enter(r),e.enter(i),e.consume(d),e.exit(i),o=d===40?41:d,a):n(d)}function a(d){return d===o?(e.enter(i),e.consume(d),e.exit(i),e.exit(r),t):(e.enter(s),u(d))}function u(d){return d===o?(e.exit(s),a(o)):d===null?n(d):U(d)?(e.enter("lineEnding"),e.consume(d),e.exit("lineEnding"),te(e,u,"linePrefix")):(e.enter("chunkString",{contentType:"string"}),c(d))}function c(d){return d===o||d===null||U(d)?(e.exit("chunkString"),u(d)):(e.consume(d),d===92?f:c)}function f(d){return d===o||d===92?(e.consume(d),c):c(d)}}function Ji(e,t){let n;return r;function r(i){return U(i)?(e.enter("lineEnding"),e.consume(i),e.exit("lineEnding"),n=!0,r):X(i)?te(e,r,n?"linePrefix":"lineSuffix")(i):t(i)}}const tP={name:"definition",tokenize:rP},nP={partial:!0,tokenize:iP};function rP(e,t,n){const r=this;let i;return s;function s(h){return e.enter("definition"),o(h)}function o(h){return h1.call(r,e,l,n,"definitionLabel","definitionLabelMarker","definitionLabelString")(h)}function l(h){return i=Vt(r.sliceSerialize(r.events[r.events.length-1][1]).slice(1,-1)),h===58?(e.enter("definitionMarker"),e.consume(h),e.exit("definitionMarker"),a):n(h)}function a(h){return ue(h)?Ji(e,u)(h):u(h)}function u(h){return d1(e,c,n,"definitionDestination","definitionDestinationLiteral","definitionDestinationLiteralMarker","definitionDestinationRaw","definitionDestinationString")(h)}function c(h){return e.attempt(nP,f,f)(h)}function f(h){return X(h)?te(e,d,"whitespace")(h):d(h)}function d(h){return h===null||U(h)?(e.exit("definition"),r.parser.defined.push(i),t(h)):n(h)}}function iP(e,t,n){return r;function r(l){return ue(l)?Ji(e,i)(l):n(l)}function i(l){return p1(e,s,n,"definitionTitle","definitionTitleMarker","definitionTitleString")(l)}function s(l){return X(l)?te(e,o,"whitespace")(l):o(l)}function o(l){return l===null||U(l)?t(l):n(l)}}const sP={name:"hardBreakEscape",tokenize:oP};function oP(e,t,n){return r;function r(s){return e.enter("hardBreakEscape"),e.consume(s),i}function i(s){return U(s)?(e.exit("hardBreakEscape"),t(s)):n(s)}}const lP={name:"headingAtx",resolve:aP,tokenize:uP};function aP(e,t){let n=e.length-2,r=3,i,s;return e[r][1].type==="whitespace"&&(r+=2),n-2>r&&e[n][1].type==="whitespace"&&(n-=2),e[n][1].type==="atxHeadingSequence"&&(r===n-1||n-4>r&&e[n-2][1].type==="whitespace")&&(n-=r+1===n?2:4),n>r&&(i={type:"atxHeadingText",start:e[r][1].start,end:e[n][1].end},s={type:"chunkText",start:e[r][1].start,end:e[n][1].end,contentType:"text"},gt(e,r,n-r+1,[["enter",i,t],["enter",s,t],["exit",s,t],["exit",i,t]])),e}function uP(e,t,n){let r=0;return i;function i(c){return e.enter("atxHeading"),s(c)}function s(c){return e.enter("atxHeadingSequence"),o(c)}function o(c){return c===35&&r++<6?(e.consume(c),o):c===null||ue(c)?(e.exit("atxHeadingSequence"),l(c)):n(c)}function l(c){return c===35?(e.enter("atxHeadingSequence"),a(c)):c===null||U(c)?(e.exit("atxHeading"),t(c)):X(c)?te(e,l,"whitespace")(c):(e.enter("atxHeadingText"),u(c))}function a(c){return c===35?(e.consume(c),a):(e.exit("atxHeadingSequence"),l(c))}function u(c){return c===null||c===35||ue(c)?(e.exit("atxHeadingText"),l(c)):(e.consume(c),u)}}const cP=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],mm=["pre","script","style","textarea"],fP={concrete:!0,name:"htmlFlow",resolveTo:pP,tokenize:mP},dP={partial:!0,tokenize:yP},hP={partial:!0,tokenize:gP};function pP(e){let t=e.length;for(;t--&&!(e[t][0]==="enter"&&e[t][1].type==="htmlFlow"););return t>1&&e[t-2][1].type==="linePrefix"&&(e[t][1].start=e[t-2][1].start,e[t+1][1].start=e[t-2][1].start,e.splice(t-2,2)),e}function mP(e,t,n){const r=this;let i,s,o,l,a;return u;function u(S){return c(S)}function c(S){return e.enter("htmlFlow"),e.enter("htmlFlowData"),e.consume(S),f}function f(S){return S===33?(e.consume(S),d):S===47?(e.consume(S),s=!0,x):S===63?(e.consume(S),i=3,r.interrupt?t:w):Xe(S)?(e.consume(S),o=String.fromCharCode(S),C):n(S)}function d(S){return S===45?(e.consume(S),i=2,h):S===91?(e.consume(S),i=5,l=0,m):Xe(S)?(e.consume(S),i=4,r.interrupt?t:w):n(S)}function h(S){return S===45?(e.consume(S),r.interrupt?t:w):n(S)}function m(S){const Ee="CDATA[";return S===Ee.charCodeAt(l++)?(e.consume(S),l===Ee.length?r.interrupt?t:j:m):n(S)}function x(S){return Xe(S)?(e.consume(S),o=String.fromCharCode(S),C):n(S)}function C(S){if(S===null||S===47||S===62||ue(S)){const Ee=S===47,ct=o.toLowerCase();return!Ee&&!s&&mm.includes(ct)?(i=1,r.interrupt?t(S):j(S)):cP.includes(o.toLowerCase())?(i=6,Ee?(e.consume(S),p):r.interrupt?t(S):j(S)):(i=7,r.interrupt&&!r.parser.lazy[r.now().line]?n(S):s?g(S):y(S))}return S===45||We(S)?(e.consume(S),o+=String.fromCharCode(S),C):n(S)}function p(S){return S===62?(e.consume(S),r.interrupt?t:j):n(S)}function g(S){return X(S)?(e.consume(S),g):E(S)}function y(S){return S===47?(e.consume(S),E):S===58||S===95||Xe(S)?(e.consume(S),b):X(S)?(e.consume(S),y):E(S)}function b(S){return S===45||S===46||S===58||S===95||We(S)?(e.consume(S),b):T(S)}function T(S){return S===61?(e.consume(S),k):X(S)?(e.consume(S),T):y(S)}function k(S){return S===null||S===60||S===61||S===62||S===96?n(S):S===34||S===39?(e.consume(S),a=S,A):X(S)?(e.consume(S),k):P(S)}function A(S){return S===a?(e.consume(S),a=null,O):S===null||U(S)?n(S):(e.consume(S),A)}function P(S){return S===null||S===34||S===39||S===47||S===60||S===61||S===62||S===96||ue(S)?T(S):(e.consume(S),P)}function O(S){return S===47||S===62||X(S)?y(S):n(S)}function E(S){return S===62?(e.consume(S),L):n(S)}function L(S){return S===null||U(S)?j(S):X(S)?(e.consume(S),L):n(S)}function j(S){return S===45&&i===2?(e.consume(S),oe):S===60&&i===1?(e.consume(S),H):S===62&&i===4?(e.consume(S),q):S===63&&i===3?(e.consume(S),w):S===93&&i===5?(e.consume(S),z):U(S)&&(i===6||i===7)?(e.exit("htmlFlowData"),e.check(dP,ie,K)(S)):S===null||U(S)?(e.exit("htmlFlowData"),K(S)):(e.consume(S),j)}function K(S){return e.check(hP,J,ie)(S)}function J(S){return e.enter("lineEnding"),e.consume(S),e.exit("lineEnding"),B}function B(S){return S===null||U(S)?K(S):(e.enter("htmlFlowData"),j(S))}function oe(S){return S===45?(e.consume(S),w):j(S)}function H(S){return S===47?(e.consume(S),o="",M):j(S)}function M(S){if(S===62){const Ee=o.toLowerCase();return mm.includes(Ee)?(e.consume(S),q):j(S)}return Xe(S)&&o.length<8?(e.consume(S),o+=String.fromCharCode(S),M):j(S)}function z(S){return S===93?(e.consume(S),w):j(S)}function w(S){return S===62?(e.consume(S),q):S===45&&i===2?(e.consume(S),w):j(S)}function q(S){return S===null||U(S)?(e.exit("htmlFlowData"),ie(S)):(e.consume(S),q)}function ie(S){return e.exit("htmlFlow"),t(S)}}function gP(e,t,n){const r=this;return i;function i(o){return U(o)?(e.enter("lineEnding"),e.consume(o),e.exit("lineEnding"),s):n(o)}function s(o){return r.parser.lazy[r.now().line]?n(o):t(o)}}function yP(e,t,n){return r;function r(i){return e.enter("lineEnding"),e.consume(i),e.exit("lineEnding"),e.attempt(zs,t,n)}}const xP={name:"htmlText",tokenize:vP};function vP(e,t,n){const r=this;let i,s,o;return l;function l(w){return e.enter("htmlText"),e.enter("htmlTextData"),e.consume(w),a}function a(w){return w===33?(e.consume(w),u):w===47?(e.consume(w),T):w===63?(e.consume(w),y):Xe(w)?(e.consume(w),P):n(w)}function u(w){return w===45?(e.consume(w),c):w===91?(e.consume(w),s=0,m):Xe(w)?(e.consume(w),g):n(w)}function c(w){return w===45?(e.consume(w),h):n(w)}function f(w){return w===null?n(w):w===45?(e.consume(w),d):U(w)?(o=f,H(w)):(e.consume(w),f)}function d(w){return w===45?(e.consume(w),h):f(w)}function h(w){return w===62?oe(w):w===45?d(w):f(w)}function m(w){const q="CDATA[";return w===q.charCodeAt(s++)?(e.consume(w),s===q.length?x:m):n(w)}function x(w){return w===null?n(w):w===93?(e.consume(w),C):U(w)?(o=x,H(w)):(e.consume(w),x)}function C(w){return w===93?(e.consume(w),p):x(w)}function p(w){return w===62?oe(w):w===93?(e.consume(w),p):x(w)}function g(w){return w===null||w===62?oe(w):U(w)?(o=g,H(w)):(e.consume(w),g)}function y(w){return w===null?n(w):w===63?(e.consume(w),b):U(w)?(o=y,H(w)):(e.consume(w),y)}function b(w){return w===62?oe(w):y(w)}function T(w){return Xe(w)?(e.consume(w),k):n(w)}function k(w){return w===45||We(w)?(e.consume(w),k):A(w)}function A(w){return U(w)?(o=A,H(w)):X(w)?(e.consume(w),A):oe(w)}function P(w){return w===45||We(w)?(e.consume(w),P):w===47||w===62||ue(w)?O(w):n(w)}function O(w){return w===47?(e.consume(w),oe):w===58||w===95||Xe(w)?(e.consume(w),E):U(w)?(o=O,H(w)):X(w)?(e.consume(w),O):oe(w)}function E(w){return w===45||w===46||w===58||w===95||We(w)?(e.consume(w),E):L(w)}function L(w){return w===61?(e.consume(w),j):U(w)?(o=L,H(w)):X(w)?(e.consume(w),L):O(w)}function j(w){return w===null||w===60||w===61||w===62||w===96?n(w):w===34||w===39?(e.consume(w),i=w,K):U(w)?(o=j,H(w)):X(w)?(e.consume(w),j):(e.consume(w),J)}function K(w){return w===i?(e.consume(w),i=void 0,B):w===null?n(w):U(w)?(o=K,H(w)):(e.consume(w),K)}function J(w){return w===null||w===34||w===39||w===60||w===61||w===96?n(w):w===47||w===62||ue(w)?O(w):(e.consume(w),J)}function B(w){return w===47||w===62||ue(w)?O(w):n(w)}function oe(w){return w===62?(e.consume(w),e.exit("htmlTextData"),e.exit("htmlText"),t):n(w)}function H(w){return e.exit("htmlTextData"),e.enter("lineEnding"),e.consume(w),e.exit("lineEnding"),M}function M(w){return X(w)?te(e,z,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(w):z(w)}function z(w){return e.enter("htmlTextData"),o(w)}}const td={name:"labelEnd",resolveAll:CP,resolveTo:EP,tokenize:bP},wP={tokenize:TP},kP={tokenize:AP},SP={tokenize:PP};function CP(e){let t=-1;const n=[];for(;++t<e.length;){const r=e[t][1];if(n.push(e[t]),r.type==="labelImage"||r.type==="labelLink"||r.type==="labelEnd"){const i=r.type==="labelImage"?4:2;r.type="data",t+=i}}return e.length!==n.length&&gt(e,0,e.length,n),e}function EP(e,t){let n=e.length,r=0,i,s,o,l;for(;n--;)if(i=e[n][1],s){if(i.type==="link"||i.type==="labelLink"&&i._inactive)break;e[n][0]==="enter"&&i.type==="labelLink"&&(i._inactive=!0)}else if(o){if(e[n][0]==="enter"&&(i.type==="labelImage"||i.type==="labelLink")&&!i._balanced&&(s=n,i.type!=="labelLink")){r=2;break}}else i.type==="labelEnd"&&(o=n);const a={type:e[s][1].type==="labelLink"?"link":"image",start:{...e[s][1].start},end:{...e[e.length-1][1].end}},u={type:"label",start:{...e[s][1].start},end:{...e[o][1].end}},c={type:"labelText",start:{...e[s+r+2][1].end},end:{...e[o-2][1].start}};return l=[["enter",a,t],["enter",u,t]],l=bt(l,e.slice(s+1,s+r+3)),l=bt(l,[["enter",c,t]]),l=bt(l,Ol(t.parser.constructs.insideSpan.null,e.slice(s+r+4,o-3),t)),l=bt(l,[["exit",c,t],e[o-2],e[o-1],["exit",u,t]]),l=bt(l,e.slice(o+1)),l=bt(l,[["exit",a,t]]),gt(e,s,e.length,l),e}function bP(e,t,n){const r=this;let i=r.events.length,s,o;for(;i--;)if((r.events[i][1].type==="labelImage"||r.events[i][1].type==="labelLink")&&!r.events[i][1]._balanced){s=r.events[i][1];break}return l;function l(d){return s?s._inactive?f(d):(o=r.parser.defined.includes(Vt(r.sliceSerialize({start:s.end,end:r.now()}))),e.enter("labelEnd"),e.enter("labelMarker"),e.consume(d),e.exit("labelMarker"),e.exit("labelEnd"),a):n(d)}function a(d){return d===40?e.attempt(wP,c,o?c:f)(d):d===91?e.attempt(kP,c,o?u:f)(d):o?c(d):f(d)}function u(d){return e.attempt(SP,c,f)(d)}function c(d){return t(d)}function f(d){return s._balanced=!0,n(d)}}function TP(e,t,n){return r;function r(f){return e.enter("resource"),e.enter("resourceMarker"),e.consume(f),e.exit("resourceMarker"),i}function i(f){return ue(f)?Ji(e,s)(f):s(f)}function s(f){return f===41?c(f):d1(e,o,l,"resourceDestination","resourceDestinationLiteral","resourceDestinationLiteralMarker","resourceDestinationRaw","resourceDestinationString",32)(f)}function o(f){return ue(f)?Ji(e,a)(f):c(f)}function l(f){return n(f)}function a(f){return f===34||f===39||f===40?p1(e,u,n,"resourceTitle","resourceTitleMarker","resourceTitleString")(f):c(f)}function u(f){return ue(f)?Ji(e,c)(f):c(f)}function c(f){return f===41?(e.enter("resourceMarker"),e.consume(f),e.exit("resourceMarker"),e.exit("resource"),t):n(f)}}function AP(e,t,n){const r=this;return i;function i(l){return h1.call(r,e,s,o,"reference","referenceMarker","referenceString")(l)}function s(l){return r.parser.defined.includes(Vt(r.sliceSerialize(r.events[r.events.length-1][1]).slice(1,-1)))?t(l):n(l)}function o(l){return n(l)}}function PP(e,t,n){return r;function r(s){return e.enter("reference"),e.enter("referenceMarker"),e.consume(s),e.exit("referenceMarker"),i}function i(s){return s===93?(e.enter("referenceMarker"),e.consume(s),e.exit("referenceMarker"),e.exit("reference"),t):n(s)}}const NP={name:"labelStartImage",resolveAll:td.resolveAll,tokenize:IP};function IP(e,t,n){const r=this;return i;function i(l){return e.enter("labelImage"),e.enter("labelImageMarker"),e.consume(l),e.exit("labelImageMarker"),s}function s(l){return l===91?(e.enter("labelMarker"),e.consume(l),e.exit("labelMarker"),e.exit("labelImage"),o):n(l)}function o(l){return l===94&&"_hiddenFootnoteSupport"in r.parser.constructs?n(l):t(l)}}const MP={name:"labelStartLink",resolveAll:td.resolveAll,tokenize:RP};function RP(e,t,n){const r=this;return i;function i(o){return e.enter("labelLink"),e.enter("labelMarker"),e.consume(o),e.exit("labelMarker"),e.exit("labelLink"),s}function s(o){return o===94&&"_hiddenFootnoteSupport"in r.parser.constructs?n(o):t(o)}}const Ia={name:"lineEnding",tokenize:DP};function DP(e,t){return n;function n(r){return e.enter("lineEnding"),e.consume(r),e.exit("lineEnding"),te(e,t,"linePrefix")}}const Mo={name:"thematicBreak",tokenize:LP};function LP(e,t,n){let r=0,i;return s;function s(u){return e.enter("thematicBreak"),o(u)}function o(u){return i=u,l(u)}function l(u){return u===i?(e.enter("thematicBreakSequence"),a(u)):r>=3&&(u===null||U(u))?(e.exit("thematicBreak"),t(u)):n(u)}function a(u){return u===i?(e.consume(u),r++,a):(e.exit("thematicBreakSequence"),X(u)?te(e,l,"whitespace")(u):l(u))}}const tt={continuation:{tokenize:FP},exit:VP,name:"list",tokenize:jP},_P={partial:!0,tokenize:BP},OP={partial:!0,tokenize:zP};function jP(e,t,n){const r=this,i=r.events[r.events.length-1];let s=i&&i[1].type==="linePrefix"?i[2].sliceSerialize(i[1],!0).length:0,o=0;return l;function l(h){const m=r.containerState.type||(h===42||h===43||h===45?"listUnordered":"listOrdered");if(m==="listUnordered"?!r.containerState.marker||h===r.containerState.marker:lc(h)){if(r.containerState.type||(r.containerState.type=m,e.enter(m,{_container:!0})),m==="listUnordered")return e.enter("listItemPrefix"),h===42||h===45?e.check(Mo,n,u)(h):u(h);if(!r.interrupt||h===49)return e.enter("listItemPrefix"),e.enter("listItemValue"),a(h)}return n(h)}function a(h){return lc(h)&&++o<10?(e.consume(h),a):(!r.interrupt||o<2)&&(r.containerState.marker?h===r.containerState.marker:h===41||h===46)?(e.exit("listItemValue"),u(h)):n(h)}function u(h){return e.enter("listItemMarker"),e.consume(h),e.exit("listItemMarker"),r.containerState.marker=r.containerState.marker||h,e.check(zs,r.interrupt?n:c,e.attempt(_P,d,f))}function c(h){return r.containerState.initialBlankLine=!0,s++,d(h)}function f(h){return X(h)?(e.enter("listItemPrefixWhitespace"),e.consume(h),e.exit("listItemPrefixWhitespace"),d):n(h)}function d(h){return r.containerState.size=s+r.sliceSerialize(e.exit("listItemPrefix"),!0).length,t(h)}}function FP(e,t,n){const r=this;return r.containerState._closeFlow=void 0,e.check(zs,i,s);function i(l){return r.containerState.furtherBlankLines=r.containerState.furtherBlankLines||r.containerState.initialBlankLine,te(e,t,"listItemIndent",r.containerState.size+1)(l)}function s(l){return r.containerState.furtherBlankLines||!X(l)?(r.containerState.furtherBlankLines=void 0,r.containerState.initialBlankLine=void 0,o(l)):(r.containerState.furtherBlankLines=void 0,r.containerState.initialBlankLine=void 0,e.attempt(OP,t,o)(l))}function o(l){return r.containerState._closeFlow=!0,r.interrupt=void 0,te(e,e.attempt(tt,t,n),"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(l)}}function zP(e,t,n){const r=this;return te(e,i,"listItemIndent",r.containerState.size+1);function i(s){const o=r.events[r.events.length-1];return o&&o[1].type==="listItemIndent"&&o[2].sliceSerialize(o[1],!0).length===r.containerState.size?t(s):n(s)}}function VP(e){e.exit(this.containerState.type)}function BP(e,t,n){const r=this;return te(e,i,"listItemPrefixWhitespace",r.parser.constructs.disable.null.includes("codeIndented")?void 0:5);function i(s){const o=r.events[r.events.length-1];return!X(s)&&o&&o[1].type==="listItemPrefixWhitespace"?t(s):n(s)}}const gm={name:"setextUnderline",resolveTo:UP,tokenize:$P};function UP(e,t){let n=e.length,r,i,s;for(;n--;)if(e[n][0]==="enter"){if(e[n][1].type==="content"){r=n;break}e[n][1].type==="paragraph"&&(i=n)}else e[n][1].type==="content"&&e.splice(n,1),!s&&e[n][1].type==="definition"&&(s=n);const o={type:"setextHeading",start:{...e[r][1].start},end:{...e[e.length-1][1].end}};return e[i][1].type="setextHeadingText",s?(e.splice(i,0,["enter",o,t]),e.splice(s+1,0,["exit",e[r][1],t]),e[r][1].end={...e[s][1].end}):e[r][1]=o,e.push(["exit",o,t]),e}function $P(e,t,n){const r=this;let i;return s;function s(u){let c=r.events.length,f;for(;c--;)if(r.events[c][1].type!=="lineEnding"&&r.events[c][1].type!=="linePrefix"&&r.events[c][1].type!=="content"){f=r.events[c][1].type==="paragraph";break}return!r.parser.lazy[r.now().line]&&(r.interrupt||f)?(e.enter("setextHeadingLine"),i=u,o(u)):n(u)}function o(u){return e.enter("setextHeadingLineSequence"),l(u)}function l(u){return u===i?(e.consume(u),l):(e.exit("setextHeadingLineSequence"),X(u)?te(e,a,"lineSuffix")(u):a(u))}function a(u){return u===null||U(u)?(e.exit("setextHeadingLine"),t(u)):n(u)}}const HP={tokenize:GP};function GP(e){const t=this,n=e.attempt(zs,r,e.attempt(this.parser.constructs.flowInitial,i,te(e,e.attempt(this.parser.constructs.flow,i,e.attempt(XA,i)),"linePrefix")));return n;function r(s){if(s===null){e.consume(s);return}return e.enter("lineEndingBlank"),e.consume(s),e.exit("lineEndingBlank"),t.currentConstruct=void 0,n}function i(s){if(s===null){e.consume(s);return}return e.enter("lineEnding"),e.consume(s),e.exit("lineEnding"),t.currentConstruct=void 0,n}}const WP={resolveAll:g1()},KP=m1("string"),YP=m1("text");function m1(e){return{resolveAll:g1(e==="text"?qP:void 0),tokenize:t};function t(n){const r=this,i=this.parser.constructs[e],s=n.attempt(i,o,l);return o;function o(c){return u(c)?s(c):l(c)}function l(c){if(c===null){n.consume(c);return}return n.enter("data"),n.consume(c),a}function a(c){return u(c)?(n.exit("data"),s(c)):(n.consume(c),a)}function u(c){if(c===null)return!0;const f=i[c];let d=-1;if(f)for(;++d<f.length;){const h=f[d];if(!h.previous||h.previous.call(r,r.previous))return!0}return!1}}}function g1(e){return t;function t(n,r){let i=-1,s;for(;++i<=n.length;)s===void 0?n[i]&&n[i][1].type==="data"&&(s=i,i++):(!n[i]||n[i][1].type!=="data")&&(i!==s+2&&(n[s][1].end=n[i-1][1].end,n.splice(s+2,i-s-2),i=s+2),s=void 0);return e?e(n,r):n}}function qP(e,t){let n=0;for(;++n<=e.length;)if((n===e.length||e[n][1].type==="lineEnding")&&e[n-1][1].type==="data"){const r=e[n-1][1],i=t.sliceStream(r);let s=i.length,o=-1,l=0,a;for(;s--;){const u=i[s];if(typeof u=="string"){for(o=u.length;u.charCodeAt(o-1)===32;)l++,o--;if(o)break;o=-1}else if(u===-2)a=!0,l++;else if(u!==-1){s++;break}}if(t._contentTypeTextTrailing&&n===e.length&&(l=0),l){const u={type:n===e.length||a||l<2?"lineSuffix":"hardBreakTrailing",start:{_bufferIndex:s?o:r.start._bufferIndex+o,_index:r.start._index+s,line:r.end.line,column:r.end.column-l,offset:r.end.offset-l},end:{...r.end}};r.end={...u.start},r.start.offset===r.end.offset?Object.assign(r,u):(e.splice(n,0,["enter",u,t],["exit",u,t]),n+=2)}n++}return e}const XP={42:tt,43:tt,45:tt,48:tt,49:tt,50:tt,51:tt,52:tt,53:tt,54:tt,55:tt,56:tt,57:tt,62:a1},QP={91:tP},ZP={[-2]:Na,[-1]:Na,32:Na},JP={35:lP,42:Mo,45:[gm,Mo],60:fP,61:gm,95:Mo,96:pm,126:pm},eN={38:c1,92:u1},tN={[-5]:Ia,[-4]:Ia,[-3]:Ia,33:NP,38:c1,42:ac,60:[MA,xP],91:MP,92:[sP,u1],93:td,95:ac,96:HA},nN={null:[ac,WP]},rN={null:[42,95]},iN={null:[]},sN=Object.freeze(Object.defineProperty({__proto__:null,attentionMarkers:rN,contentInitial:QP,disable:iN,document:XP,flow:JP,flowInitial:ZP,insideSpan:nN,string:eN,text:tN},Symbol.toStringTag,{value:"Module"}));function oN(e,t,n){let r={_bufferIndex:-1,_index:0,line:n&&n.line||1,column:n&&n.column||1,offset:n&&n.offset||0};const i={},s=[];let o=[],l=[];const a={attempt:A(T),check:A(k),consume:g,enter:y,exit:b,interrupt:A(k,{interrupt:!0})},u={code:null,containerState:{},defineSkip:x,events:[],now:m,parser:e,previous:null,sliceSerialize:d,sliceStream:h,write:f};let c=t.tokenize.call(u,a);return t.resolveAll&&s.push(t),u;function f(L){return o=bt(o,L),C(),o[o.length-1]!==null?[]:(P(t,0),u.events=Ol(s,u.events,u),u.events)}function d(L,j){return aN(h(L),j)}function h(L){return lN(o,L)}function m(){const{_bufferIndex:L,_index:j,line:K,column:J,offset:B}=r;return{_bufferIndex:L,_index:j,line:K,column:J,offset:B}}function x(L){i[L.line]=L.column,E()}function C(){let L;for(;r._index<o.length;){const j=o[r._index];if(typeof j=="string")for(L=r._index,r._bufferIndex<0&&(r._bufferIndex=0);r._index===L&&r._bufferIndex<j.length;)p(j.charCodeAt(r._bufferIndex));else p(j)}}function p(L){c=c(L)}function g(L){U(L)?(r.line++,r.column=1,r.offset+=L===-3?2:1,E()):L!==-1&&(r.column++,r.offset++),r._bufferIndex<0?r._index++:(r._bufferIndex++,r._bufferIndex===o[r._index].length&&(r._bufferIndex=-1,r._index++)),u.previous=L}function y(L,j){const K=j||{};return K.type=L,K.start=m(),u.events.push(["enter",K,u]),l.push(K),K}function b(L){const j=l.pop();return j.end=m(),u.events.push(["exit",j,u]),j}function T(L,j){P(L,j.from)}function k(L,j){j.restore()}function A(L,j){return K;function K(J,B,oe){let H,M,z,w;return Array.isArray(J)?ie(J):"tokenize"in J?ie([J]):q(J);function q(le){return wt;function wt(Ut){const en=Ut!==null&&le[Ut],tn=Ut!==null&&le.null,Kn=[...Array.isArray(en)?en:en?[en]:[],...Array.isArray(tn)?tn:tn?[tn]:[]];return ie(Kn)(Ut)}}function ie(le){return H=le,M=0,le.length===0?oe:S(le[M])}function S(le){return wt;function wt(Ut){return w=O(),z=le,le.partial||(u.currentConstruct=le),le.name&&u.parser.constructs.disable.null.includes(le.name)?ct():le.tokenize.call(j?Object.assign(Object.create(u),j):u,a,Ee,ct)(Ut)}}function Ee(le){return L(z,w),B}function ct(le){return w.restore(),++M<H.length?S(H[M]):oe}}}function P(L,j){L.resolveAll&&!s.includes(L)&&s.push(L),L.resolve&&gt(u.events,j,u.events.length-j,L.resolve(u.events.slice(j),u)),L.resolveTo&&(u.events=L.resolveTo(u.events,u))}function O(){const L=m(),j=u.previous,K=u.currentConstruct,J=u.events.length,B=Array.from(l);return{from:J,restore:oe};function oe(){r=L,u.previous=j,u.currentConstruct=K,u.events.length=J,l=B,E()}}function E(){r.line in i&&r.column<2&&(r.column=i[r.line],r.offset+=i[r.line]-1)}}function lN(e,t){const n=t.start._index,r=t.start._bufferIndex,i=t.end._index,s=t.end._bufferIndex;let o;if(n===i)o=[e[n].slice(r,s)];else{if(o=e.slice(n,i),r>-1){const l=o[0];typeof l=="string"?o[0]=l.slice(r):o.shift()}s>0&&o.push(e[i].slice(0,s))}return o}function aN(e,t){let n=-1;const r=[];let i;for(;++n<e.length;){const s=e[n];let o;if(typeof s=="string")o=s;else switch(s){case-5:{o="\r";break}case-4:{o=`
`;break}case-3:{o=`\r
`;break}case-2:{o=t?" ":"	";break}case-1:{if(!t&&i)continue;o=" ";break}default:o=String.fromCharCode(s)}i=s===-2,r.push(o)}return r.join("")}function uN(e){const r={constructs:o1([sN,...(e||{}).extensions||[]]),content:i(EA),defined:[],document:i(TA),flow:i(HP),lazy:{},string:i(KP),text:i(YP)};return r;function i(s){return o;function o(l){return oN(r,s,l)}}}function cN(e){for(;!f1(e););return e}const ym=/[\0\t\n\r]/g;function fN(){let e=1,t="",n=!0,r;return i;function i(s,o,l){const a=[];let u,c,f,d,h;for(s=t+(typeof s=="string"?s.toString():new TextDecoder(o||void 0).decode(s)),f=0,t="",n&&(s.charCodeAt(0)===65279&&f++,n=void 0);f<s.length;){if(ym.lastIndex=f,u=ym.exec(s),d=u&&u.index!==void 0?u.index:s.length,h=s.charCodeAt(d),!u){t=s.slice(f);break}if(h===10&&f===d&&r)a.push(-3),r=void 0;else switch(r&&(a.push(-5),r=void 0),f<d&&(a.push(s.slice(f,d)),e+=d-f),h){case 0:{a.push(65533),e++;break}case 9:{for(c=Math.ceil(e/4)*4,a.push(-2);e++<c;)a.push(-1);break}case 10:{a.push(-4),e=1;break}default:r=!0,e=1}f=d+1}return l&&(r&&a.push(-5),t&&a.push(t),a.push(null)),a}}const dN=/\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;function hN(e){return e.replace(dN,pN)}function pN(e,t,n){if(t)return t;if(n.charCodeAt(0)===35){const i=n.charCodeAt(1),s=i===120||i===88;return l1(n.slice(s?2:1),s?16:10)}return ed(n)||e}const y1={}.hasOwnProperty;function mN(e,t,n){return typeof t!="string"&&(n=t,t=void 0),gN(n)(cN(uN(n).document().write(fN()(e,t,!0))))}function gN(e){const t={transforms:[],canContainEols:["emphasis","fragment","heading","paragraph","strong"],enter:{autolink:s(Ht),autolinkProtocol:O,autolinkEmail:O,atxHeading:s(ye),blockQuote:s(tn),characterEscape:O,characterReference:O,codeFenced:s(Kn),codeFencedFenceInfo:o,codeFencedFenceMeta:o,codeIndented:s(Kn,o),codeText:s(V,o),codeTextData:O,data:O,codeFlowValue:O,definition:s(ne),definitionDestinationString:o,definitionLabelString:o,definitionTitleString:o,emphasis:s(ee),hardBreakEscape:s(G),hardBreakTrailing:s(G),htmlFlow:s(Oe,o),htmlFlowData:O,htmlText:s(Oe,o),htmlTextData:O,image:s($t),label:o,link:s(Ht),listItem:s(Me),listItemValue:d,listOrdered:s(je,f),listUnordered:s(je),paragraph:s(Yn),reference:S,referenceString:o,resourceDestinationString:o,resourceTitleString:o,setextHeading:s(ye),strong:s(Q1),thematicBreak:s(J1)},exit:{atxHeading:a(),atxHeadingSequence:T,autolink:a(),autolinkEmail:en,autolinkProtocol:Ut,blockQuote:a(),characterEscapeValue:E,characterReferenceMarkerHexadecimal:ct,characterReferenceMarkerNumeric:ct,characterReferenceValue:le,characterReference:wt,codeFenced:a(C),codeFencedFence:x,codeFencedFenceInfo:h,codeFencedFenceMeta:m,codeFlowValue:E,codeIndented:a(p),codeText:a(B),codeTextData:E,data:E,definition:a(),definitionDestinationString:b,definitionLabelString:g,definitionTitleString:y,emphasis:a(),hardBreakEscape:a(j),hardBreakTrailing:a(j),htmlFlow:a(K),htmlFlowData:E,htmlText:a(J),htmlTextData:E,image:a(H),label:z,labelText:M,lineEnding:L,link:a(oe),listItem:a(),listOrdered:a(),listUnordered:a(),paragraph:a(),referenceString:Ee,resourceDestinationString:w,resourceTitleString:q,resource:ie,setextHeading:a(P),setextHeadingLineSequence:A,setextHeadingText:k,strong:a(),thematicBreak:a()}};x1(t,(e||{}).mdastExtensions||[]);const n={};return r;function r(N){let _={type:"root",children:[]};const W={stack:[_],tokenStack:[],config:t,enter:l,exit:u,buffer:o,resume:c,data:n},Z=[];let ae=-1;for(;++ae<N.length;)if(N[ae][1].type==="listOrdered"||N[ae][1].type==="listUnordered")if(N[ae][0]==="enter")Z.push(ae);else{const Rt=Z.pop();ae=i(N,Rt,ae)}for(ae=-1;++ae<N.length;){const Rt=t[N[ae][0]];y1.call(Rt,N[ae][1].type)&&Rt[N[ae][1].type].call(Object.assign({sliceSerialize:N[ae][2].sliceSerialize},W),N[ae][1])}if(W.tokenStack.length>0){const Rt=W.tokenStack[W.tokenStack.length-1];(Rt[1]||xm).call(W,void 0,Rt[0])}for(_.position={start:wn(N.length>0?N[0][1].start:{line:1,column:1,offset:0}),end:wn(N.length>0?N[N.length-2][1].end:{line:1,column:1,offset:0})},ae=-1;++ae<t.transforms.length;)_=t.transforms[ae](_)||_;return _}function i(N,_,W){let Z=_-1,ae=-1,Rt=!1,qn,nn,xi,vi;for(;++Z<=W;){const ft=N[Z];switch(ft[1].type){case"listUnordered":case"listOrdered":case"blockQuote":{ft[0]==="enter"?ae++:ae--,vi=void 0;break}case"lineEndingBlank":{ft[0]==="enter"&&(qn&&!vi&&!ae&&!xi&&(xi=Z),vi=void 0);break}case"linePrefix":case"listItemValue":case"listItemMarker":case"listItemPrefix":case"listItemPrefixWhitespace":break;default:vi=void 0}if(!ae&&ft[0]==="enter"&&ft[1].type==="listItemPrefix"||ae===-1&&ft[0]==="exit"&&(ft[1].type==="listUnordered"||ft[1].type==="listOrdered")){if(qn){let Cr=Z;for(nn=void 0;Cr--;){const rn=N[Cr];if(rn[1].type==="lineEnding"||rn[1].type==="lineEndingBlank"){if(rn[0]==="exit")continue;nn&&(N[nn][1].type="lineEndingBlank",Rt=!0),rn[1].type="lineEnding",nn=Cr}else if(!(rn[1].type==="linePrefix"||rn[1].type==="blockQuotePrefix"||rn[1].type==="blockQuotePrefixWhitespace"||rn[1].type==="blockQuoteMarker"||rn[1].type==="listItemIndent"))break}xi&&(!nn||xi<nn)&&(qn._spread=!0),qn.end=Object.assign({},nn?N[nn][1].start:ft[1].end),N.splice(nn||Z,0,["exit",qn,ft[2]]),Z++,W++}if(ft[1].type==="listItemPrefix"){const Cr={type:"listItem",_spread:!1,start:Object.assign({},ft[1].start),end:void 0};qn=Cr,N.splice(Z,0,["enter",Cr,ft[2]]),Z++,W++,xi=void 0,vi=!0}}}return N[_][1]._spread=Rt,W}function s(N,_){return W;function W(Z){l.call(this,N(Z),Z),_&&_.call(this,Z)}}function o(){this.stack.push({type:"fragment",children:[]})}function l(N,_,W){this.stack[this.stack.length-1].children.push(N),this.stack.push(N),this.tokenStack.push([_,W||void 0]),N.position={start:wn(_.start),end:void 0}}function a(N){return _;function _(W){N&&N.call(this,W),u.call(this,W)}}function u(N,_){const W=this.stack.pop(),Z=this.tokenStack.pop();if(Z)Z[0].type!==N.type&&(_?_.call(this,N,Z[0]):(Z[1]||xm).call(this,N,Z[0]));else throw new Error("Cannot close `"+N.type+"` ("+Zi({start:N.start,end:N.end})+"): it’s not open");W.position.end=wn(N.end)}function c(){return Jf(this.stack.pop())}function f(){this.data.expectingFirstListItemValue=!0}function d(N){if(this.data.expectingFirstListItemValue){const _=this.stack[this.stack.length-2];_.start=Number.parseInt(this.sliceSerialize(N),10),this.data.expectingFirstListItemValue=void 0}}function h(){const N=this.resume(),_=this.stack[this.stack.length-1];_.lang=N}function m(){const N=this.resume(),_=this.stack[this.stack.length-1];_.meta=N}function x(){this.data.flowCodeInside||(this.buffer(),this.data.flowCodeInside=!0)}function C(){const N=this.resume(),_=this.stack[this.stack.length-1];_.value=N.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g,""),this.data.flowCodeInside=void 0}function p(){const N=this.resume(),_=this.stack[this.stack.length-1];_.value=N.replace(/(\r?\n|\r)$/g,"")}function g(N){const _=this.resume(),W=this.stack[this.stack.length-1];W.label=_,W.identifier=Vt(this.sliceSerialize(N)).toLowerCase()}function y(){const N=this.resume(),_=this.stack[this.stack.length-1];_.title=N}function b(){const N=this.resume(),_=this.stack[this.stack.length-1];_.url=N}function T(N){const _=this.stack[this.stack.length-1];if(!_.depth){const W=this.sliceSerialize(N).length;_.depth=W}}function k(){this.data.setextHeadingSlurpLineEnding=!0}function A(N){const _=this.stack[this.stack.length-1];_.depth=this.sliceSerialize(N).codePointAt(0)===61?1:2}function P(){this.data.setextHeadingSlurpLineEnding=void 0}function O(N){const W=this.stack[this.stack.length-1].children;let Z=W[W.length-1];(!Z||Z.type!=="text")&&(Z=Z1(),Z.position={start:wn(N.start),end:void 0},W.push(Z)),this.stack.push(Z)}function E(N){const _=this.stack.pop();_.value+=this.sliceSerialize(N),_.position.end=wn(N.end)}function L(N){const _=this.stack[this.stack.length-1];if(this.data.atHardBreak){const W=_.children[_.children.length-1];W.position.end=wn(N.end),this.data.atHardBreak=void 0;return}!this.data.setextHeadingSlurpLineEnding&&t.canContainEols.includes(_.type)&&(O.call(this,N),E.call(this,N))}function j(){this.data.atHardBreak=!0}function K(){const N=this.resume(),_=this.stack[this.stack.length-1];_.value=N}function J(){const N=this.resume(),_=this.stack[this.stack.length-1];_.value=N}function B(){const N=this.resume(),_=this.stack[this.stack.length-1];_.value=N}function oe(){const N=this.stack[this.stack.length-1];if(this.data.inReference){const _=this.data.referenceType||"shortcut";N.type+="Reference",N.referenceType=_,delete N.url,delete N.title}else delete N.identifier,delete N.label;this.data.referenceType=void 0}function H(){const N=this.stack[this.stack.length-1];if(this.data.inReference){const _=this.data.referenceType||"shortcut";N.type+="Reference",N.referenceType=_,delete N.url,delete N.title}else delete N.identifier,delete N.label;this.data.referenceType=void 0}function M(N){const _=this.sliceSerialize(N),W=this.stack[this.stack.length-2];W.label=hN(_),W.identifier=Vt(_).toLowerCase()}function z(){const N=this.stack[this.stack.length-1],_=this.resume(),W=this.stack[this.stack.length-1];if(this.data.inReference=!0,W.type==="link"){const Z=N.children;W.children=Z}else W.alt=_}function w(){const N=this.resume(),_=this.stack[this.stack.length-1];_.url=N}function q(){const N=this.resume(),_=this.stack[this.stack.length-1];_.title=N}function ie(){this.data.inReference=void 0}function S(){this.data.referenceType="collapsed"}function Ee(N){const _=this.resume(),W=this.stack[this.stack.length-1];W.label=_,W.identifier=Vt(this.sliceSerialize(N)).toLowerCase(),this.data.referenceType="full"}function ct(N){this.data.characterReferenceType=N.type}function le(N){const _=this.sliceSerialize(N),W=this.data.characterReferenceType;let Z;W?(Z=l1(_,W==="characterReferenceMarkerNumeric"?10:16),this.data.characterReferenceType=void 0):Z=ed(_);const ae=this.stack[this.stack.length-1];ae.value+=Z}function wt(N){const _=this.stack.pop();_.position.end=wn(N.end)}function Ut(N){E.call(this,N);const _=this.stack[this.stack.length-1];_.url=this.sliceSerialize(N)}function en(N){E.call(this,N);const _=this.stack[this.stack.length-1];_.url="mailto:"+this.sliceSerialize(N)}function tn(){return{type:"blockquote",children:[]}}function Kn(){return{type:"code",lang:null,meta:null,value:""}}function V(){return{type:"inlineCode",value:""}}function ne(){return{type:"definition",identifier:"",label:null,title:null,url:""}}function ee(){return{type:"emphasis",children:[]}}function ye(){return{type:"heading",depth:0,children:[]}}function G(){return{type:"break"}}function Oe(){return{type:"html",value:""}}function $t(){return{type:"image",title:null,url:"",alt:null}}function Ht(){return{type:"link",title:null,url:"",children:[]}}function je(N){return{type:"list",ordered:N.type==="listOrdered",start:null,spread:N._spread,children:[]}}function Me(N){return{type:"listItem",spread:N._spread,checked:null,children:[]}}function Yn(){return{type:"paragraph",children:[]}}function Q1(){return{type:"strong",children:[]}}function Z1(){return{type:"text",value:""}}function J1(){return{type:"thematicBreak"}}}function wn(e){return{line:e.line,column:e.column,offset:e.offset}}function x1(e,t){let n=-1;for(;++n<t.length;){const r=t[n];Array.isArray(r)?x1(e,r):yN(e,r)}}function yN(e,t){let n;for(n in t)if(y1.call(t,n))switch(n){case"canContainEols":{const r=t[n];r&&e[n].push(...r);break}case"transforms":{const r=t[n];r&&e[n].push(...r);break}case"enter":case"exit":{const r=t[n];r&&Object.assign(e[n],r);break}}}function xm(e,t){throw e?new Error("Cannot close `"+e.type+"` ("+Zi({start:e.start,end:e.end})+"): a different token (`"+t.type+"`, "+Zi({start:t.start,end:t.end})+") is open"):new Error("Cannot close document, a token (`"+t.type+"`, "+Zi({start:t.start,end:t.end})+") is still open")}function xN(e){const t=this;t.parser=n;function n(r){return mN(r,{...t.data("settings"),...e,extensions:t.data("micromarkExtensions")||[],mdastExtensions:t.data("fromMarkdownExtensions")||[]})}}function vN(e,t){const n={type:"element",tagName:"blockquote",properties:{},children:e.wrap(e.all(t),!0)};return e.patch(t,n),e.applyData(t,n)}function wN(e,t){const n={type:"element",tagName:"br",properties:{},children:[]};return e.patch(t,n),[e.applyData(t,n),{type:"text",value:`
`}]}function kN(e,t){const n=t.value?t.value+`
`:"",r={},i=t.lang?t.lang.split(/\s+/):[];i.length>0&&(r.className=["language-"+i[0]]);let s={type:"element",tagName:"code",properties:r,children:[{type:"text",value:n}]};return t.meta&&(s.data={meta:t.meta}),e.patch(t,s),s=e.applyData(t,s),s={type:"element",tagName:"pre",properties:{},children:[s]},e.patch(t,s),s}function SN(e,t){const n={type:"element",tagName:"del",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function CN(e,t){const n={type:"element",tagName:"em",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function EN(e,t){const n=typeof e.options.clobberPrefix=="string"?e.options.clobberPrefix:"user-content-",r=String(t.identifier).toUpperCase(),i=yi(r.toLowerCase()),s=e.footnoteOrder.indexOf(r);let o,l=e.footnoteCounts.get(r);l===void 0?(l=0,e.footnoteOrder.push(r),o=e.footnoteOrder.length):o=s+1,l+=1,e.footnoteCounts.set(r,l);const a={type:"element",tagName:"a",properties:{href:"#"+n+"fn-"+i,id:n+"fnref-"+i+(l>1?"-"+l:""),dataFootnoteRef:!0,ariaDescribedBy:["footnote-label"]},children:[{type:"text",value:String(o)}]};e.patch(t,a);const u={type:"element",tagName:"sup",properties:{},children:[a]};return e.patch(t,u),e.applyData(t,u)}function bN(e,t){const n={type:"element",tagName:"h"+t.depth,properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function TN(e,t){if(e.options.allowDangerousHtml){const n={type:"raw",value:t.value};return e.patch(t,n),e.applyData(t,n)}}function v1(e,t){const n=t.referenceType;let r="]";if(n==="collapsed"?r+="[]":n==="full"&&(r+="["+(t.label||t.identifier)+"]"),t.type==="imageReference")return[{type:"text",value:"!["+t.alt+r}];const i=e.all(t),s=i[0];s&&s.type==="text"?s.value="["+s.value:i.unshift({type:"text",value:"["});const o=i[i.length-1];return o&&o.type==="text"?o.value+=r:i.push({type:"text",value:r}),i}function AN(e,t){const n=String(t.identifier).toUpperCase(),r=e.definitionById.get(n);if(!r)return v1(e,t);const i={src:yi(r.url||""),alt:t.alt};r.title!==null&&r.title!==void 0&&(i.title=r.title);const s={type:"element",tagName:"img",properties:i,children:[]};return e.patch(t,s),e.applyData(t,s)}function PN(e,t){const n={src:yi(t.url)};t.alt!==null&&t.alt!==void 0&&(n.alt=t.alt),t.title!==null&&t.title!==void 0&&(n.title=t.title);const r={type:"element",tagName:"img",properties:n,children:[]};return e.patch(t,r),e.applyData(t,r)}function NN(e,t){const n={type:"text",value:t.value.replace(/\r?\n|\r/g," ")};e.patch(t,n);const r={type:"element",tagName:"code",properties:{},children:[n]};return e.patch(t,r),e.applyData(t,r)}function IN(e,t){const n=String(t.identifier).toUpperCase(),r=e.definitionById.get(n);if(!r)return v1(e,t);const i={href:yi(r.url||"")};r.title!==null&&r.title!==void 0&&(i.title=r.title);const s={type:"element",tagName:"a",properties:i,children:e.all(t)};return e.patch(t,s),e.applyData(t,s)}function MN(e,t){const n={href:yi(t.url)};t.title!==null&&t.title!==void 0&&(n.title=t.title);const r={type:"element",tagName:"a",properties:n,children:e.all(t)};return e.patch(t,r),e.applyData(t,r)}function RN(e,t,n){const r=e.all(t),i=n?DN(n):w1(t),s={},o=[];if(typeof t.checked=="boolean"){const c=r[0];let f;c&&c.type==="element"&&c.tagName==="p"?f=c:(f={type:"element",tagName:"p",properties:{},children:[]},r.unshift(f)),f.children.length>0&&f.children.unshift({type:"text",value:" "}),f.children.unshift({type:"element",tagName:"input",properties:{type:"checkbox",checked:t.checked,disabled:!0},children:[]}),s.className=["task-list-item"]}let l=-1;for(;++l<r.length;){const c=r[l];(i||l!==0||c.type!=="element"||c.tagName!=="p")&&o.push({type:"text",value:`
`}),c.type==="element"&&c.tagName==="p"&&!i?o.push(...c.children):o.push(c)}const a=r[r.length-1];a&&(i||a.type!=="element"||a.tagName!=="p")&&o.push({type:"text",value:`
`});const u={type:"element",tagName:"li",properties:s,children:o};return e.patch(t,u),e.applyData(t,u)}function DN(e){let t=!1;if(e.type==="list"){t=e.spread||!1;const n=e.children;let r=-1;for(;!t&&++r<n.length;)t=w1(n[r])}return t}function w1(e){const t=e.spread;return t??e.children.length>1}function LN(e,t){const n={},r=e.all(t);let i=-1;for(typeof t.start=="number"&&t.start!==1&&(n.start=t.start);++i<r.length;){const o=r[i];if(o.type==="element"&&o.tagName==="li"&&o.properties&&Array.isArray(o.properties.className)&&o.properties.className.includes("task-list-item")){n.className=["contains-task-list"];break}}const s={type:"element",tagName:t.ordered?"ol":"ul",properties:n,children:e.wrap(r,!0)};return e.patch(t,s),e.applyData(t,s)}function _N(e,t){const n={type:"element",tagName:"p",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function ON(e,t){const n={type:"root",children:e.wrap(e.all(t))};return e.patch(t,n),e.applyData(t,n)}function jN(e,t){const n={type:"element",tagName:"strong",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function FN(e,t){const n=e.all(t),r=n.shift(),i=[];if(r){const o={type:"element",tagName:"thead",properties:{},children:e.wrap([r],!0)};e.patch(t.children[0],o),i.push(o)}if(n.length>0){const o={type:"element",tagName:"tbody",properties:{},children:e.wrap(n,!0)},l=qf(t.children[1]),a=Jx(t.children[t.children.length-1]);l&&a&&(o.position={start:l,end:a}),i.push(o)}const s={type:"element",tagName:"table",properties:{},children:e.wrap(i,!0)};return e.patch(t,s),e.applyData(t,s)}function zN(e,t,n){const r=n?n.children:void 0,s=(r?r.indexOf(t):1)===0?"th":"td",o=n&&n.type==="table"?n.align:void 0,l=o?o.length:t.children.length;let a=-1;const u=[];for(;++a<l;){const f=t.children[a],d={},h=o?o[a]:void 0;h&&(d.align=h);let m={type:"element",tagName:s,properties:d,children:[]};f&&(m.children=e.all(f),e.patch(f,m),m=e.applyData(f,m)),u.push(m)}const c={type:"element",tagName:"tr",properties:{},children:e.wrap(u,!0)};return e.patch(t,c),e.applyData(t,c)}function VN(e,t){const n={type:"element",tagName:"td",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}const vm=9,wm=32;function BN(e){const t=String(e),n=/\r?\n|\r/g;let r=n.exec(t),i=0;const s=[];for(;r;)s.push(km(t.slice(i,r.index),i>0,!0),r[0]),i=r.index+r[0].length,r=n.exec(t);return s.push(km(t.slice(i),i>0,!1)),s.join("")}function km(e,t,n){let r=0,i=e.length;if(t){let s=e.codePointAt(r);for(;s===vm||s===wm;)r++,s=e.codePointAt(r)}if(n){let s=e.codePointAt(i-1);for(;s===vm||s===wm;)i--,s=e.codePointAt(i-1)}return i>r?e.slice(r,i):""}function UN(e,t){const n={type:"text",value:BN(String(t.value))};return e.patch(t,n),e.applyData(t,n)}function $N(e,t){const n={type:"element",tagName:"hr",properties:{},children:[]};return e.patch(t,n),e.applyData(t,n)}const HN={blockquote:vN,break:wN,code:kN,delete:SN,emphasis:CN,footnoteReference:EN,heading:bN,html:TN,imageReference:AN,image:PN,inlineCode:NN,linkReference:IN,link:MN,listItem:RN,list:LN,paragraph:_N,root:ON,strong:jN,table:FN,tableCell:VN,tableRow:zN,text:UN,thematicBreak:$N,toml:ao,yaml:ao,definition:ao,footnoteDefinition:ao};function ao(){}const k1=-1,jl=0,es=1,cl=2,nd=3,rd=4,id=5,sd=6,S1=7,C1=8,Sm=typeof self=="object"?self:globalThis,GN=(e,t)=>{const n=(i,s)=>(e.set(s,i),i),r=i=>{if(e.has(i))return e.get(i);const[s,o]=t[i];switch(s){case jl:case k1:return n(o,i);case es:{const l=n([],i);for(const a of o)l.push(r(a));return l}case cl:{const l=n({},i);for(const[a,u]of o)l[r(a)]=r(u);return l}case nd:return n(new Date(o),i);case rd:{const{source:l,flags:a}=o;return n(new RegExp(l,a),i)}case id:{const l=n(new Map,i);for(const[a,u]of o)l.set(r(a),r(u));return l}case sd:{const l=n(new Set,i);for(const a of o)l.add(r(a));return l}case S1:{const{name:l,message:a}=o;return n(new Sm[l](a),i)}case C1:return n(BigInt(o),i);case"BigInt":return n(Object(BigInt(o)),i);case"ArrayBuffer":return n(new Uint8Array(o).buffer,o);case"DataView":{const{buffer:l}=new Uint8Array(o);return n(new DataView(l),o)}}return n(new Sm[s](o),i)};return r},Cm=e=>GN(new Map,e)(0),Tr="",{toString:WN}={},{keys:KN}=Object,Ii=e=>{const t=typeof e;if(t!=="object"||!e)return[jl,t];const n=WN.call(e).slice(8,-1);switch(n){case"Array":return[es,Tr];case"Object":return[cl,Tr];case"Date":return[nd,Tr];case"RegExp":return[rd,Tr];case"Map":return[id,Tr];case"Set":return[sd,Tr];case"DataView":return[es,n]}return n.includes("Array")?[es,n]:n.includes("Error")?[S1,n]:[cl,n]},uo=([e,t])=>e===jl&&(t==="function"||t==="symbol"),YN=(e,t,n,r)=>{const i=(o,l)=>{const a=r.push(o)-1;return n.set(l,a),a},s=o=>{if(n.has(o))return n.get(o);let[l,a]=Ii(o);switch(l){case jl:{let c=o;switch(a){case"bigint":l=C1,c=o.toString();break;case"function":case"symbol":if(e)throw new TypeError("unable to serialize "+a);c=null;break;case"undefined":return i([k1],o)}return i([l,c],o)}case es:{if(a){let d=o;return a==="DataView"?d=new Uint8Array(o.buffer):a==="ArrayBuffer"&&(d=new Uint8Array(o)),i([a,[...d]],o)}const c=[],f=i([l,c],o);for(const d of o)c.push(s(d));return f}case cl:{if(a)switch(a){case"BigInt":return i([a,o.toString()],o);case"Boolean":case"Number":case"String":return i([a,o.valueOf()],o)}if(t&&"toJSON"in o)return s(o.toJSON());const c=[],f=i([l,c],o);for(const d of KN(o))(e||!uo(Ii(o[d])))&&c.push([s(d),s(o[d])]);return f}case nd:return i([l,o.toISOString()],o);case rd:{const{source:c,flags:f}=o;return i([l,{source:c,flags:f}],o)}case id:{const c=[],f=i([l,c],o);for(const[d,h]of o)(e||!(uo(Ii(d))||uo(Ii(h))))&&c.push([s(d),s(h)]);return f}case sd:{const c=[],f=i([l,c],o);for(const d of o)(e||!uo(Ii(d)))&&c.push(s(d));return f}}const{message:u}=o;return i([l,{name:a,message:u}],o)};return s},Em=(e,{json:t,lossy:n}={})=>{const r=[];return YN(!(t||n),!!t,new Map,r)(e),r},fl=typeof structuredClone=="function"?(e,t)=>t&&("json"in t||"lossy"in t)?Cm(Em(e,t)):structuredClone(e):(e,t)=>Cm(Em(e,t));function qN(e,t){const n=[{type:"text",value:"↩"}];return t>1&&n.push({type:"element",tagName:"sup",properties:{},children:[{type:"text",value:String(t)}]}),n}function XN(e,t){return"Back to reference "+(e+1)+(t>1?"-"+t:"")}function QN(e){const t=typeof e.options.clobberPrefix=="string"?e.options.clobberPrefix:"user-content-",n=e.options.footnoteBackContent||qN,r=e.options.footnoteBackLabel||XN,i=e.options.footnoteLabel||"Footnotes",s=e.options.footnoteLabelTagName||"h2",o=e.options.footnoteLabelProperties||{className:["sr-only"]},l=[];let a=-1;for(;++a<e.footnoteOrder.length;){const u=e.footnoteById.get(e.footnoteOrder[a]);if(!u)continue;const c=e.all(u),f=String(u.identifier).toUpperCase(),d=yi(f.toLowerCase());let h=0;const m=[],x=e.footnoteCounts.get(f);for(;x!==void 0&&++h<=x;){m.length>0&&m.push({type:"text",value:" "});let g=typeof n=="string"?n:n(a,h);typeof g=="string"&&(g={type:"text",value:g}),m.push({type:"element",tagName:"a",properties:{href:"#"+t+"fnref-"+d+(h>1?"-"+h:""),dataFootnoteBackref:"",ariaLabel:typeof r=="string"?r:r(a,h),className:["data-footnote-backref"]},children:Array.isArray(g)?g:[g]})}const C=c[c.length-1];if(C&&C.type==="element"&&C.tagName==="p"){const g=C.children[C.children.length-1];g&&g.type==="text"?g.value+=" ":C.children.push({type:"text",value:" "}),C.children.push(...m)}else c.push(...m);const p={type:"element",tagName:"li",properties:{id:t+"fn-"+d},children:e.wrap(c,!0)};e.patch(u,p),l.push(p)}if(l.length!==0)return{type:"element",tagName:"section",properties:{dataFootnotes:!0,className:["footnotes"]},children:[{type:"element",tagName:s,properties:{...fl(o),id:"footnote-label"},children:[{type:"text",value:i}]},{type:"text",value:`
`},{type:"element",tagName:"ol",properties:{},children:e.wrap(l,!0)},{type:"text",value:`
`}]}}const Fl=function(e){if(e==null)return tI;if(typeof e=="function")return zl(e);if(typeof e=="object")return Array.isArray(e)?ZN(e):JN(e);if(typeof e=="string")return eI(e);throw new Error("Expected function, string, or object as test")};function ZN(e){const t=[];let n=-1;for(;++n<e.length;)t[n]=Fl(e[n]);return zl(r);function r(...i){let s=-1;for(;++s<t.length;)if(t[s].apply(this,i))return!0;return!1}}function JN(e){const t=e;return zl(n);function n(r){const i=r;let s;for(s in e)if(i[s]!==t[s])return!1;return!0}}function eI(e){return zl(t);function t(n){return n&&n.type===e}}function zl(e){return t;function t(n,r,i){return!!(nI(n)&&e.call(this,n,typeof r=="number"?r:void 0,i||void 0))}}function tI(){return!0}function nI(e){return e!==null&&typeof e=="object"&&"type"in e}const E1=[],rI=!0,uc=!1,iI="skip";function b1(e,t,n,r){let i;typeof t=="function"&&typeof n!="function"?(r=n,n=t):i=t;const s=Fl(i),o=r?-1:1;l(e,void 0,[])();function l(a,u,c){const f=a&&typeof a=="object"?a:{};if(typeof f.type=="string"){const h=typeof f.tagName=="string"?f.tagName:typeof f.name=="string"?f.name:void 0;Object.defineProperty(d,"name",{value:"node ("+(a.type+(h?"<"+h+">":""))+")"})}return d;function d(){let h=E1,m,x,C;if((!t||s(a,u,c[c.length-1]||void 0))&&(h=sI(n(a,c)),h[0]===uc))return h;if("children"in a&&a.children){const p=a;if(p.children&&h[0]!==iI)for(x=(r?p.children.length:-1)+o,C=c.concat(p);x>-1&&x<p.children.length;){const g=p.children[x];if(m=l(g,x,C)(),m[0]===uc)return m;x=typeof m[1]=="number"?m[1]:x+o}}return h}}}function sI(e){return Array.isArray(e)?e:typeof e=="number"?[rI,e]:e==null?E1:[e]}function od(e,t,n,r){let i,s,o;typeof t=="function"&&typeof n!="function"?(s=void 0,o=t,i=n):(s=t,o=n,i=r),b1(e,s,l,i);function l(a,u){const c=u[u.length-1],f=c?c.children.indexOf(a):void 0;return o(a,f,c)}}const cc={}.hasOwnProperty,oI={};function lI(e,t){const n=t||oI,r=new Map,i=new Map,s=new Map,o={...HN,...n.handlers},l={all:u,applyData:uI,definitionById:r,footnoteById:i,footnoteCounts:s,footnoteOrder:[],handlers:o,one:a,options:n,patch:aI,wrap:fI};return od(e,function(c){if(c.type==="definition"||c.type==="footnoteDefinition"){const f=c.type==="definition"?r:i,d=String(c.identifier).toUpperCase();f.has(d)||f.set(d,c)}}),l;function a(c,f){const d=c.type,h=l.handlers[d];if(cc.call(l.handlers,d)&&h)return h(l,c,f);if(l.options.passThrough&&l.options.passThrough.includes(d)){if("children"in c){const{children:x,...C}=c,p=fl(C);return p.children=l.all(c),p}return fl(c)}return(l.options.unknownHandler||cI)(l,c,f)}function u(c){const f=[];if("children"in c){const d=c.children;let h=-1;for(;++h<d.length;){const m=l.one(d[h],c);if(m){if(h&&d[h-1].type==="break"&&(!Array.isArray(m)&&m.type==="text"&&(m.value=bm(m.value)),!Array.isArray(m)&&m.type==="element")){const x=m.children[0];x&&x.type==="text"&&(x.value=bm(x.value))}Array.isArray(m)?f.push(...m):f.push(m)}}}return f}}function aI(e,t){e.position&&(t.position=XT(e))}function uI(e,t){let n=t;if(e&&e.data){const r=e.data.hName,i=e.data.hChildren,s=e.data.hProperties;if(typeof r=="string")if(n.type==="element")n.tagName=r;else{const o="children"in n?n.children:[n];n={type:"element",tagName:r,properties:{},children:o}}n.type==="element"&&s&&Object.assign(n.properties,fl(s)),"children"in n&&n.children&&i!==null&&i!==void 0&&(n.children=i)}return n}function cI(e,t){const n=t.data||{},r="value"in t&&!(cc.call(n,"hProperties")||cc.call(n,"hChildren"))?{type:"text",value:t.value}:{type:"element",tagName:"div",properties:{},children:e.all(t)};return e.patch(t,r),e.applyData(t,r)}function fI(e,t){const n=[];let r=-1;for(t&&n.push({type:"text",value:`
`});++r<e.length;)r&&n.push({type:"text",value:`
`}),n.push(e[r]);return t&&e.length>0&&n.push({type:"text",value:`
`}),n}function bm(e){let t=0,n=e.charCodeAt(t);for(;n===9||n===32;)t++,n=e.charCodeAt(t);return e.slice(t)}function Tm(e,t){const n=lI(e,t),r=n.one(e,void 0),i=QN(n),s=Array.isArray(r)?{type:"root",children:r}:r||{type:"root",children:[]};return i&&s.children.push({type:"text",value:`
`},i),s}function dI(e,t){return e&&"run"in e?async function(n,r){const i=Tm(n,{file:r,...t});await e.run(i,r)}:function(n,r){return Tm(n,{file:r,...e||t})}}function Am(e){if(e)throw e}var Ro=Object.prototype.hasOwnProperty,T1=Object.prototype.toString,Pm=Object.defineProperty,Nm=Object.getOwnPropertyDescriptor,Im=function(t){return typeof Array.isArray=="function"?Array.isArray(t):T1.call(t)==="[object Array]"},Mm=function(t){if(!t||T1.call(t)!=="[object Object]")return!1;var n=Ro.call(t,"constructor"),r=t.constructor&&t.constructor.prototype&&Ro.call(t.constructor.prototype,"isPrototypeOf");if(t.constructor&&!n&&!r)return!1;var i;for(i in t);return typeof i>"u"||Ro.call(t,i)},Rm=function(t,n){Pm&&n.name==="__proto__"?Pm(t,n.name,{enumerable:!0,configurable:!0,value:n.newValue,writable:!0}):t[n.name]=n.newValue},Dm=function(t,n){if(n==="__proto__")if(Ro.call(t,n)){if(Nm)return Nm(t,n).value}else return;return t[n]},hI=function e(){var t,n,r,i,s,o,l=arguments[0],a=1,u=arguments.length,c=!1;for(typeof l=="boolean"&&(c=l,l=arguments[1]||{},a=2),(l==null||typeof l!="object"&&typeof l!="function")&&(l={});a<u;++a)if(t=arguments[a],t!=null)for(n in t)r=Dm(l,n),i=Dm(t,n),l!==i&&(c&&i&&(Mm(i)||(s=Im(i)))?(s?(s=!1,o=r&&Im(r)?r:[]):o=r&&Mm(r)?r:{},Rm(l,{name:n,newValue:e(c,o,i)})):typeof i<"u"&&Rm(l,{name:n,newValue:i}));return l};const Ma=pc(hI);function fc(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function pI(){const e=[],t={run:n,use:r};return t;function n(...i){let s=-1;const o=i.pop();if(typeof o!="function")throw new TypeError("Expected function as last argument, not "+o);l(null,...i);function l(a,...u){const c=e[++s];let f=-1;if(a){o(a);return}for(;++f<i.length;)(u[f]===null||u[f]===void 0)&&(u[f]=i[f]);i=u,c?mI(c,l)(...u):o(null,...u)}}function r(i){if(typeof i!="function")throw new TypeError("Expected `middelware` to be a function, not "+i);return e.push(i),t}}function mI(e,t){let n;return r;function r(...o){const l=e.length>o.length;let a;l&&o.push(i);try{a=e.apply(this,o)}catch(u){const c=u;if(l&&n)throw c;return i(c)}l||(a&&a.then&&typeof a.then=="function"?a.then(s,i):a instanceof Error?i(a):s(a))}function i(o,...l){n||(n=!0,t(o,...l))}function s(o){i(null,o)}}const Kt={basename:gI,dirname:yI,extname:xI,join:vI,sep:"/"};function gI(e,t){if(t!==void 0&&typeof t!="string")throw new TypeError('"ext" argument must be a string');Vs(e);let n=0,r=-1,i=e.length,s;if(t===void 0||t.length===0||t.length>e.length){for(;i--;)if(e.codePointAt(i)===47){if(s){n=i+1;break}}else r<0&&(s=!0,r=i+1);return r<0?"":e.slice(n,r)}if(t===e)return"";let o=-1,l=t.length-1;for(;i--;)if(e.codePointAt(i)===47){if(s){n=i+1;break}}else o<0&&(s=!0,o=i+1),l>-1&&(e.codePointAt(i)===t.codePointAt(l--)?l<0&&(r=i):(l=-1,r=o));return n===r?r=o:r<0&&(r=e.length),e.slice(n,r)}function yI(e){if(Vs(e),e.length===0)return".";let t=-1,n=e.length,r;for(;--n;)if(e.codePointAt(n)===47){if(r){t=n;break}}else r||(r=!0);return t<0?e.codePointAt(0)===47?"/":".":t===1&&e.codePointAt(0)===47?"//":e.slice(0,t)}function xI(e){Vs(e);let t=e.length,n=-1,r=0,i=-1,s=0,o;for(;t--;){const l=e.codePointAt(t);if(l===47){if(o){r=t+1;break}continue}n<0&&(o=!0,n=t+1),l===46?i<0?i=t:s!==1&&(s=1):i>-1&&(s=-1)}return i<0||n<0||s===0||s===1&&i===n-1&&i===r+1?"":e.slice(i,n)}function vI(...e){let t=-1,n;for(;++t<e.length;)Vs(e[t]),e[t]&&(n=n===void 0?e[t]:n+"/"+e[t]);return n===void 0?".":wI(n)}function wI(e){Vs(e);const t=e.codePointAt(0)===47;let n=kI(e,!t);return n.length===0&&!t&&(n="."),n.length>0&&e.codePointAt(e.length-1)===47&&(n+="/"),t?"/"+n:n}function kI(e,t){let n="",r=0,i=-1,s=0,o=-1,l,a;for(;++o<=e.length;){if(o<e.length)l=e.codePointAt(o);else{if(l===47)break;l=47}if(l===47){if(!(i===o-1||s===1))if(i!==o-1&&s===2){if(n.length<2||r!==2||n.codePointAt(n.length-1)!==46||n.codePointAt(n.length-2)!==46){if(n.length>2){if(a=n.lastIndexOf("/"),a!==n.length-1){a<0?(n="",r=0):(n=n.slice(0,a),r=n.length-1-n.lastIndexOf("/")),i=o,s=0;continue}}else if(n.length>0){n="",r=0,i=o,s=0;continue}}t&&(n=n.length>0?n+"/..":"..",r=2)}else n.length>0?n+="/"+e.slice(i+1,o):n=e.slice(i+1,o),r=o-i-1;i=o,s=0}else l===46&&s>-1?s++:s=-1}return n}function Vs(e){if(typeof e!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(e))}const SI={cwd:CI};function CI(){return"/"}function dc(e){return!!(e!==null&&typeof e=="object"&&"href"in e&&e.href&&"protocol"in e&&e.protocol&&e.auth===void 0)}function EI(e){if(typeof e=="string")e=new URL(e);else if(!dc(e)){const t=new TypeError('The "path" argument must be of type string or an instance of URL. Received `'+e+"`");throw t.code="ERR_INVALID_ARG_TYPE",t}if(e.protocol!=="file:"){const t=new TypeError("The URL must be of scheme file");throw t.code="ERR_INVALID_URL_SCHEME",t}return bI(e)}function bI(e){if(e.hostname!==""){const r=new TypeError('File URL host must be "localhost" or empty on darwin');throw r.code="ERR_INVALID_FILE_URL_HOST",r}const t=e.pathname;let n=-1;for(;++n<t.length;)if(t.codePointAt(n)===37&&t.codePointAt(n+1)===50){const r=t.codePointAt(n+2);if(r===70||r===102){const i=new TypeError("File URL path must not include encoded / characters");throw i.code="ERR_INVALID_FILE_URL_PATH",i}}return decodeURIComponent(t)}const Ra=["history","path","basename","stem","extname","dirname"];class A1{constructor(t){let n;t?dc(t)?n={path:t}:typeof t=="string"||TI(t)?n={value:t}:n=t:n={},this.cwd="cwd"in n?"":SI.cwd(),this.data={},this.history=[],this.messages=[],this.value,this.map,this.result,this.stored;let r=-1;for(;++r<Ra.length;){const s=Ra[r];s in n&&n[s]!==void 0&&n[s]!==null&&(this[s]=s==="history"?[...n[s]]:n[s])}let i;for(i in n)Ra.includes(i)||(this[i]=n[i])}get basename(){return typeof this.path=="string"?Kt.basename(this.path):void 0}set basename(t){La(t,"basename"),Da(t,"basename"),this.path=Kt.join(this.dirname||"",t)}get dirname(){return typeof this.path=="string"?Kt.dirname(this.path):void 0}set dirname(t){Lm(this.basename,"dirname"),this.path=Kt.join(t||"",this.basename)}get extname(){return typeof this.path=="string"?Kt.extname(this.path):void 0}set extname(t){if(Da(t,"extname"),Lm(this.dirname,"extname"),t){if(t.codePointAt(0)!==46)throw new Error("`extname` must start with `.`");if(t.includes(".",1))throw new Error("`extname` cannot contain multiple dots")}this.path=Kt.join(this.dirname,this.stem+(t||""))}get path(){return this.history[this.history.length-1]}set path(t){dc(t)&&(t=EI(t)),La(t,"path"),this.path!==t&&this.history.push(t)}get stem(){return typeof this.path=="string"?Kt.basename(this.path,this.extname):void 0}set stem(t){La(t,"stem"),Da(t,"stem"),this.path=Kt.join(this.dirname||"",t+(this.extname||""))}fail(t,n,r){const i=this.message(t,n,r);throw i.fatal=!0,i}info(t,n,r){const i=this.message(t,n,r);return i.fatal=void 0,i}message(t,n,r){const i=new Ye(t,n,r);return this.path&&(i.name=this.path+":"+i.name,i.file=this.path),i.fatal=!1,this.messages.push(i),i}toString(t){return this.value===void 0?"":typeof this.value=="string"?this.value:new TextDecoder(t||void 0).decode(this.value)}}function Da(e,t){if(e&&e.includes(Kt.sep))throw new Error("`"+t+"` cannot be a path: did not expect `"+Kt.sep+"`")}function La(e,t){if(!e)throw new Error("`"+t+"` cannot be empty")}function Lm(e,t){if(!e)throw new Error("Setting `"+t+"` requires `path` to be set too")}function TI(e){return!!(e&&typeof e=="object"&&"byteLength"in e&&"byteOffset"in e)}const AI=function(e){const r=this.constructor.prototype,i=r[e],s=function(){return i.apply(s,arguments)};return Object.setPrototypeOf(s,r),s},PI={}.hasOwnProperty;class ld extends AI{constructor(){super("copy"),this.Compiler=void 0,this.Parser=void 0,this.attachers=[],this.compiler=void 0,this.freezeIndex=-1,this.frozen=void 0,this.namespace={},this.parser=void 0,this.transformers=pI()}copy(){const t=new ld;let n=-1;for(;++n<this.attachers.length;){const r=this.attachers[n];t.use(...r)}return t.data(Ma(!0,{},this.namespace)),t}data(t,n){return typeof t=="string"?arguments.length===2?(ja("data",this.frozen),this.namespace[t]=n,this):PI.call(this.namespace,t)&&this.namespace[t]||void 0:t?(ja("data",this.frozen),this.namespace=t,this):this.namespace}freeze(){if(this.frozen)return this;const t=this;for(;++this.freezeIndex<this.attachers.length;){const[n,...r]=this.attachers[this.freezeIndex];if(r[0]===!1)continue;r[0]===!0&&(r[0]=void 0);const i=n.call(t,...r);typeof i=="function"&&this.transformers.use(i)}return this.frozen=!0,this.freezeIndex=Number.POSITIVE_INFINITY,this}parse(t){this.freeze();const n=co(t),r=this.parser||this.Parser;return _a("parse",r),r(String(n),n)}process(t,n){const r=this;return this.freeze(),_a("process",this.parser||this.Parser),Oa("process",this.compiler||this.Compiler),n?i(void 0,n):new Promise(i);function i(s,o){const l=co(t),a=r.parse(l);r.run(a,l,function(c,f,d){if(c||!f||!d)return u(c);const h=f,m=r.stringify(h,d);MI(m)?d.value=m:d.result=m,u(c,d)});function u(c,f){c||!f?o(c):s?s(f):n(void 0,f)}}}processSync(t){let n=!1,r;return this.freeze(),_a("processSync",this.parser||this.Parser),Oa("processSync",this.compiler||this.Compiler),this.process(t,i),Om("processSync","process",n),r;function i(s,o){n=!0,Am(s),r=o}}run(t,n,r){_m(t),this.freeze();const i=this.transformers;return!r&&typeof n=="function"&&(r=n,n=void 0),r?s(void 0,r):new Promise(s);function s(o,l){const a=co(n);i.run(t,a,u);function u(c,f,d){const h=f||t;c?l(c):o?o(h):r(void 0,h,d)}}}runSync(t,n){let r=!1,i;return this.run(t,n,s),Om("runSync","run",r),i;function s(o,l){Am(o),i=l,r=!0}}stringify(t,n){this.freeze();const r=co(n),i=this.compiler||this.Compiler;return Oa("stringify",i),_m(t),i(t,r)}use(t,...n){const r=this.attachers,i=this.namespace;if(ja("use",this.frozen),t!=null)if(typeof t=="function")a(t,n);else if(typeof t=="object")Array.isArray(t)?l(t):o(t);else throw new TypeError("Expected usable value, not `"+t+"`");return this;function s(u){if(typeof u=="function")a(u,[]);else if(typeof u=="object")if(Array.isArray(u)){const[c,...f]=u;a(c,f)}else o(u);else throw new TypeError("Expected usable value, not `"+u+"`")}function o(u){if(!("plugins"in u)&&!("settings"in u))throw new Error("Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither");l(u.plugins),u.settings&&(i.settings=Ma(!0,i.settings,u.settings))}function l(u){let c=-1;if(u!=null)if(Array.isArray(u))for(;++c<u.length;){const f=u[c];s(f)}else throw new TypeError("Expected a list of plugins, not `"+u+"`")}function a(u,c){let f=-1,d=-1;for(;++f<r.length;)if(r[f][0]===u){d=f;break}if(d===-1)r.push([u,...c]);else if(c.length>0){let[h,...m]=c;const x=r[d][1];fc(x)&&fc(h)&&(h=Ma(!0,x,h)),r[d]=[u,h,...m]}}}}const NI=new ld().freeze();function _a(e,t){if(typeof t!="function")throw new TypeError("Cannot `"+e+"` without `parser`")}function Oa(e,t){if(typeof t!="function")throw new TypeError("Cannot `"+e+"` without `compiler`")}function ja(e,t){if(t)throw new Error("Cannot call `"+e+"` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.")}function _m(e){if(!fc(e)||typeof e.type!="string")throw new TypeError("Expected node, got `"+e+"`")}function Om(e,t,n){if(!n)throw new Error("`"+e+"` finished async. Use `"+t+"` instead")}function co(e){return II(e)?e:new A1(e)}function II(e){return!!(e&&typeof e=="object"&&"message"in e&&"messages"in e)}function MI(e){return typeof e=="string"||RI(e)}function RI(e){return!!(e&&typeof e=="object"&&"byteLength"in e&&"byteOffset"in e)}const DI="https://github.com/remarkjs/react-markdown/blob/main/changelog.md",jm=[],Fm={allowDangerousHtml:!0},LI=/^(https?|ircs?|mailto|xmpp)$/i,_I=[{from:"astPlugins",id:"remove-buggy-html-in-markdown-parser"},{from:"allowDangerousHtml",id:"remove-buggy-html-in-markdown-parser"},{from:"allowNode",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"allowElement"},{from:"allowedTypes",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"allowedElements"},{from:"className",id:"remove-classname"},{from:"disallowedTypes",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"disallowedElements"},{from:"escapeHtml",id:"remove-buggy-html-in-markdown-parser"},{from:"includeElementIndex",id:"#remove-includeelementindex"},{from:"includeNodeIndex",id:"change-includenodeindex-to-includeelementindex"},{from:"linkTarget",id:"remove-linktarget"},{from:"plugins",id:"change-plugins-to-remarkplugins",to:"remarkPlugins"},{from:"rawSourcePos",id:"#remove-rawsourcepos"},{from:"renderers",id:"change-renderers-to-components",to:"components"},{from:"source",id:"change-source-to-children",to:"children"},{from:"sourcePos",id:"#remove-sourcepos"},{from:"transformImageUri",id:"#add-urltransform",to:"urlTransform"},{from:"transformLinkUri",id:"#add-urltransform",to:"urlTransform"}];function OI(e){const t=jI(e),n=FI(e);return zI(t.runSync(t.parse(n),n),e)}function jI(e){const t=e.rehypePlugins||jm,n=e.remarkPlugins||jm,r=e.remarkRehypeOptions?{...e.remarkRehypeOptions,...Fm}:Fm;return NI().use(xN).use(n).use(dI,r).use(t)}function FI(e){const t=e.children||"",n=new A1;return typeof t=="string"&&(n.value=t),n}function zI(e,t){const n=t.allowedElements,r=t.allowElement,i=t.components,s=t.disallowedElements,o=t.skipHtml,l=t.unwrapDisallowed,a=t.urlTransform||VI;for(const c of _I)Object.hasOwn(t,c.from)&&(""+c.from+(c.to?"use `"+c.to+"` instead":"remove it")+DI+c.id,void 0);return od(e,u),tA(e,{Fragment:v.Fragment,components:i,ignoreInvalidStyle:!0,jsx:v.jsx,jsxs:v.jsxs,passKeys:!0,passNode:!0});function u(c,f,d){if(c.type==="raw"&&d&&typeof f=="number")return o?d.children.splice(f,1):d.children[f]={type:"text",value:c.value},f;if(c.type==="element"){let h;for(h in Pa)if(Object.hasOwn(Pa,h)&&Object.hasOwn(c.properties,h)){const m=c.properties[h],x=Pa[h];(x===null||x.includes(c.tagName))&&(c.properties[h]=a(String(m||""),h,c))}}if(c.type==="element"){let h=n?!n.includes(c.tagName):s?s.includes(c.tagName):!1;if(!h&&r&&typeof f=="number"&&(h=!r(c,f,d)),h&&d&&typeof f=="number")return l&&c.children?d.children.splice(f,1,...c.children):d.children.splice(f,1),f}}}function VI(e){const t=e.indexOf(":"),n=e.indexOf("?"),r=e.indexOf("#"),i=e.indexOf("/");return t===-1||i!==-1&&t>i||n!==-1&&t>n||r!==-1&&t>r||LI.test(e.slice(0,t))?e:""}function zm(e,t){const n=String(e);if(typeof t!="string")throw new TypeError("Expected character");let r=0,i=n.indexOf(t);for(;i!==-1;)r++,i=n.indexOf(t,i+t.length);return r}function BI(e){if(typeof e!="string")throw new TypeError("Expected a string");return e.replace(/[|\\{}()[\]^$+*?.]/g,"\\$&").replace(/-/g,"\\x2d")}function UI(e,t,n){const i=Fl((n||{}).ignore||[]),s=$I(t);let o=-1;for(;++o<s.length;)b1(e,"text",l);function l(u,c){let f=-1,d;for(;++f<c.length;){const h=c[f],m=d?d.children:void 0;if(i(h,m?m.indexOf(h):void 0,d))return;d=h}if(d)return a(u,c)}function a(u,c){const f=c[c.length-1],d=s[o][0],h=s[o][1];let m=0;const C=f.children.indexOf(u);let p=!1,g=[];d.lastIndex=0;let y=d.exec(u.value);for(;y;){const b=y.index,T={index:y.index,input:y.input,stack:[...c,u]};let k=h(...y,T);if(typeof k=="string"&&(k=k.length>0?{type:"text",value:k}:void 0),k===!1?d.lastIndex=b+1:(m!==b&&g.push({type:"text",value:u.value.slice(m,b)}),Array.isArray(k)?g.push(...k):k&&g.push(k),m=b+y[0].length,p=!0),!d.global)break;y=d.exec(u.value)}return p?(m<u.value.length&&g.push({type:"text",value:u.value.slice(m)}),f.children.splice(C,1,...g)):g=[u],C+g.length}}function $I(e){const t=[];if(!Array.isArray(e))throw new TypeError("Expected find and replace tuple or list of tuples");const n=!e[0]||Array.isArray(e[0])?e:[e];let r=-1;for(;++r<n.length;){const i=n[r];t.push([HI(i[0]),GI(i[1])])}return t}function HI(e){return typeof e=="string"?new RegExp(BI(e),"g"):e}function GI(e){return typeof e=="function"?e:function(){return e}}const Fa="phrasing",za=["autolink","link","image","label"];function WI(){return{transforms:[JI],enter:{literalAutolink:YI,literalAutolinkEmail:Va,literalAutolinkHttp:Va,literalAutolinkWww:Va},exit:{literalAutolink:ZI,literalAutolinkEmail:QI,literalAutolinkHttp:qI,literalAutolinkWww:XI}}}function KI(){return{unsafe:[{character:"@",before:"[+\\-.\\w]",after:"[\\-.\\w]",inConstruct:Fa,notInConstruct:za},{character:".",before:"[Ww]",after:"[\\-.\\w]",inConstruct:Fa,notInConstruct:za},{character:":",before:"[ps]",after:"\\/",inConstruct:Fa,notInConstruct:za}]}}function YI(e){this.enter({type:"link",title:null,url:"",children:[]},e)}function Va(e){this.config.enter.autolinkProtocol.call(this,e)}function qI(e){this.config.exit.autolinkProtocol.call(this,e)}function XI(e){this.config.exit.data.call(this,e);const t=this.stack[this.stack.length-1];t.type,t.url="http://"+this.sliceSerialize(e)}function QI(e){this.config.exit.autolinkEmail.call(this,e)}function ZI(e){this.exit(e)}function JI(e){UI(e,[[/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi,eM],[new RegExp("(?<=^|\\s|\\p{P}|\\p{S})([-.\\w+]+)@([-\\w]+(?:\\.[-\\w]+)+)","gu"),tM]],{ignore:["link","linkReference"]})}function eM(e,t,n,r,i){let s="";if(!P1(i)||(/^w/i.test(t)&&(n=t+n,t="",s="http://"),!nM(n)))return!1;const o=rM(n+r);if(!o[0])return!1;const l={type:"link",title:null,url:s+t+o[0],children:[{type:"text",value:t+o[0]}]};return o[1]?[l,{type:"text",value:o[1]}]:l}function tM(e,t,n,r){return!P1(r,!0)||/[-\d_]$/.test(n)?!1:{type:"link",title:null,url:"mailto:"+t+"@"+n,children:[{type:"text",value:t+"@"+n}]}}function nM(e){const t=e.split(".");return!(t.length<2||t[t.length-1]&&(/_/.test(t[t.length-1])||!/[a-zA-Z\d]/.test(t[t.length-1]))||t[t.length-2]&&(/_/.test(t[t.length-2])||!/[a-zA-Z\d]/.test(t[t.length-2])))}function rM(e){const t=/[!"&'),.:;<>?\]}]+$/.exec(e);if(!t)return[e,void 0];e=e.slice(0,t.index);let n=t[0],r=n.indexOf(")");const i=zm(e,"(");let s=zm(e,")");for(;r!==-1&&i>s;)e+=n.slice(0,r+1),n=n.slice(r+1),r=n.indexOf(")"),s++;return[e,n]}function P1(e,t){const n=e.input.charCodeAt(e.index-1);return(e.index===0||vr(n)||_l(n))&&(!t||n!==47)}N1.peek=dM;function iM(){this.buffer()}function sM(e){this.enter({type:"footnoteReference",identifier:"",label:""},e)}function oM(){this.buffer()}function lM(e){this.enter({type:"footnoteDefinition",identifier:"",label:"",children:[]},e)}function aM(e){const t=this.resume(),n=this.stack[this.stack.length-1];n.type,n.identifier=Vt(this.sliceSerialize(e)).toLowerCase(),n.label=t}function uM(e){this.exit(e)}function cM(e){const t=this.resume(),n=this.stack[this.stack.length-1];n.type,n.identifier=Vt(this.sliceSerialize(e)).toLowerCase(),n.label=t}function fM(e){this.exit(e)}function dM(){return"["}function N1(e,t,n,r){const i=n.createTracker(r);let s=i.move("[^");const o=n.enter("footnoteReference"),l=n.enter("reference");return s+=i.move(n.safe(n.associationId(e),{after:"]",before:s})),l(),o(),s+=i.move("]"),s}function hM(){return{enter:{gfmFootnoteCallString:iM,gfmFootnoteCall:sM,gfmFootnoteDefinitionLabelString:oM,gfmFootnoteDefinition:lM},exit:{gfmFootnoteCallString:aM,gfmFootnoteCall:uM,gfmFootnoteDefinitionLabelString:cM,gfmFootnoteDefinition:fM}}}function pM(e){let t=!1;return e&&e.firstLineBlank&&(t=!0),{handlers:{footnoteDefinition:n,footnoteReference:N1},unsafe:[{character:"[",inConstruct:["label","phrasing","reference"]}]};function n(r,i,s,o){const l=s.createTracker(o);let a=l.move("[^");const u=s.enter("footnoteDefinition"),c=s.enter("label");return a+=l.move(s.safe(s.associationId(r),{before:a,after:"]"})),c(),a+=l.move("]:"),r.children&&r.children.length>0&&(l.shift(4),a+=l.move((t?`
`:" ")+s.indentLines(s.containerFlow(r,l.current()),t?I1:mM))),u(),a}}function mM(e,t,n){return t===0?e:I1(e,t,n)}function I1(e,t,n){return(n?"":"    ")+e}const gM=["autolink","destinationLiteral","destinationRaw","reference","titleQuote","titleApostrophe"];M1.peek=kM;function yM(){return{canContainEols:["delete"],enter:{strikethrough:vM},exit:{strikethrough:wM}}}function xM(){return{unsafe:[{character:"~",inConstruct:"phrasing",notInConstruct:gM}],handlers:{delete:M1}}}function vM(e){this.enter({type:"delete",children:[]},e)}function wM(e){this.exit(e)}function M1(e,t,n,r){const i=n.createTracker(r),s=n.enter("strikethrough");let o=i.move("~~");return o+=n.containerPhrasing(e,{...i.current(),before:o,after:"~"}),o+=i.move("~~"),s(),o}function kM(){return"~"}function SM(e){return e.length}function CM(e,t){const n=t||{},r=(n.align||[]).concat(),i=n.stringLength||SM,s=[],o=[],l=[],a=[];let u=0,c=-1;for(;++c<e.length;){const x=[],C=[];let p=-1;for(e[c].length>u&&(u=e[c].length);++p<e[c].length;){const g=EM(e[c][p]);if(n.alignDelimiters!==!1){const y=i(g);C[p]=y,(a[p]===void 0||y>a[p])&&(a[p]=y)}x.push(g)}o[c]=x,l[c]=C}let f=-1;if(typeof r=="object"&&"length"in r)for(;++f<u;)s[f]=Vm(r[f]);else{const x=Vm(r);for(;++f<u;)s[f]=x}f=-1;const d=[],h=[];for(;++f<u;){const x=s[f];let C="",p="";x===99?(C=":",p=":"):x===108?C=":":x===114&&(p=":");let g=n.alignDelimiters===!1?1:Math.max(1,a[f]-C.length-p.length);const y=C+"-".repeat(g)+p;n.alignDelimiters!==!1&&(g=C.length+g+p.length,g>a[f]&&(a[f]=g),h[f]=g),d[f]=y}o.splice(1,0,d),l.splice(1,0,h),c=-1;const m=[];for(;++c<o.length;){const x=o[c],C=l[c];f=-1;const p=[];for(;++f<u;){const g=x[f]||"";let y="",b="";if(n.alignDelimiters!==!1){const T=a[f]-(C[f]||0),k=s[f];k===114?y=" ".repeat(T):k===99?T%2?(y=" ".repeat(T/2+.5),b=" ".repeat(T/2-.5)):(y=" ".repeat(T/2),b=y):b=" ".repeat(T)}n.delimiterStart!==!1&&!f&&p.push("|"),n.padding!==!1&&!(n.alignDelimiters===!1&&g==="")&&(n.delimiterStart!==!1||f)&&p.push(" "),n.alignDelimiters!==!1&&p.push(y),p.push(g),n.alignDelimiters!==!1&&p.push(b),n.padding!==!1&&p.push(" "),(n.delimiterEnd!==!1||f!==u-1)&&p.push("|")}m.push(n.delimiterEnd===!1?p.join("").replace(/ +$/,""):p.join(""))}return m.join(`
`)}function EM(e){return e==null?"":String(e)}function Vm(e){const t=typeof e=="string"?e.codePointAt(0):0;return t===67||t===99?99:t===76||t===108?108:t===82||t===114?114:0}function bM(e,t,n,r){const i=n.enter("blockquote"),s=n.createTracker(r);s.move("> "),s.shift(2);const o=n.indentLines(n.containerFlow(e,s.current()),TM);return i(),o}function TM(e,t,n){return">"+(n?"":" ")+e}function AM(e,t){return Bm(e,t.inConstruct,!0)&&!Bm(e,t.notInConstruct,!1)}function Bm(e,t,n){if(typeof t=="string"&&(t=[t]),!t||t.length===0)return n;let r=-1;for(;++r<t.length;)if(e.includes(t[r]))return!0;return!1}function Um(e,t,n,r){let i=-1;for(;++i<n.unsafe.length;)if(n.unsafe[i].character===`
`&&AM(n.stack,n.unsafe[i]))return/[ \t]/.test(r.before)?"":" ";return`\\
`}function PM(e,t){const n=String(e);let r=n.indexOf(t),i=r,s=0,o=0;if(typeof t!="string")throw new TypeError("Expected substring");for(;r!==-1;)r===i?++s>o&&(o=s):s=1,i=r+t.length,r=n.indexOf(t,i);return o}function NM(e,t){return!!(t.options.fences===!1&&e.value&&!e.lang&&/[^ \r\n]/.test(e.value)&&!/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(e.value))}function IM(e){const t=e.options.fence||"`";if(t!=="`"&&t!=="~")throw new Error("Cannot serialize code with `"+t+"` for `options.fence`, expected `` ` `` or `~`");return t}function MM(e,t,n,r){const i=IM(n),s=e.value||"",o=i==="`"?"GraveAccent":"Tilde";if(NM(e,n)){const f=n.enter("codeIndented"),d=n.indentLines(s,RM);return f(),d}const l=n.createTracker(r),a=i.repeat(Math.max(PM(s,i)+1,3)),u=n.enter("codeFenced");let c=l.move(a);if(e.lang){const f=n.enter(`codeFencedLang${o}`);c+=l.move(n.safe(e.lang,{before:c,after:" ",encode:["`"],...l.current()})),f()}if(e.lang&&e.meta){const f=n.enter(`codeFencedMeta${o}`);c+=l.move(" "),c+=l.move(n.safe(e.meta,{before:c,after:`
`,encode:["`"],...l.current()})),f()}return c+=l.move(`
`),s&&(c+=l.move(s+`
`)),c+=l.move(a),u(),c}function RM(e,t,n){return(n?"":"    ")+e}function ad(e){const t=e.options.quote||'"';if(t!=='"'&&t!=="'")throw new Error("Cannot serialize title with `"+t+"` for `options.quote`, expected `\"`, or `'`");return t}function DM(e,t,n,r){const i=ad(n),s=i==='"'?"Quote":"Apostrophe",o=n.enter("definition");let l=n.enter("label");const a=n.createTracker(r);let u=a.move("[");return u+=a.move(n.safe(n.associationId(e),{before:u,after:"]",...a.current()})),u+=a.move("]: "),l(),!e.url||/[\0- \u007F]/.test(e.url)?(l=n.enter("destinationLiteral"),u+=a.move("<"),u+=a.move(n.safe(e.url,{before:u,after:">",...a.current()})),u+=a.move(">")):(l=n.enter("destinationRaw"),u+=a.move(n.safe(e.url,{before:u,after:e.title?" ":`
`,...a.current()}))),l(),e.title&&(l=n.enter(`title${s}`),u+=a.move(" "+i),u+=a.move(n.safe(e.title,{before:u,after:i,...a.current()})),u+=a.move(i),l()),o(),u}function LM(e){const t=e.options.emphasis||"*";if(t!=="*"&&t!=="_")throw new Error("Cannot serialize emphasis with `"+t+"` for `options.emphasis`, expected `*`, or `_`");return t}function As(e){return"&#x"+e.toString(16).toUpperCase()+";"}function dl(e,t,n){const r=ui(e),i=ui(t);return r===void 0?i===void 0?n==="_"?{inside:!0,outside:!0}:{inside:!1,outside:!1}:i===1?{inside:!0,outside:!0}:{inside:!1,outside:!0}:r===1?i===void 0?{inside:!1,outside:!1}:i===1?{inside:!0,outside:!0}:{inside:!1,outside:!1}:i===void 0?{inside:!1,outside:!1}:i===1?{inside:!0,outside:!1}:{inside:!1,outside:!1}}R1.peek=_M;function R1(e,t,n,r){const i=LM(n),s=n.enter("emphasis"),o=n.createTracker(r),l=o.move(i);let a=o.move(n.containerPhrasing(e,{after:i,before:l,...o.current()}));const u=a.charCodeAt(0),c=dl(r.before.charCodeAt(r.before.length-1),u,i);c.inside&&(a=As(u)+a.slice(1));const f=a.charCodeAt(a.length-1),d=dl(r.after.charCodeAt(0),f,i);d.inside&&(a=a.slice(0,-1)+As(f));const h=o.move(i);return s(),n.attentionEncodeSurroundingInfo={after:d.outside,before:c.outside},l+a+h}function _M(e,t,n){return n.options.emphasis||"*"}function OM(e,t){let n=!1;return od(e,function(r){if("value"in r&&/\r?\n|\r/.test(r.value)||r.type==="break")return n=!0,uc}),!!((!e.depth||e.depth<3)&&Jf(e)&&(t.options.setext||n))}function jM(e,t,n,r){const i=Math.max(Math.min(6,e.depth||1),1),s=n.createTracker(r);if(OM(e,n)){const c=n.enter("headingSetext"),f=n.enter("phrasing"),d=n.containerPhrasing(e,{...s.current(),before:`
`,after:`
`});return f(),c(),d+`
`+(i===1?"=":"-").repeat(d.length-(Math.max(d.lastIndexOf("\r"),d.lastIndexOf(`
`))+1))}const o="#".repeat(i),l=n.enter("headingAtx"),a=n.enter("phrasing");s.move(o+" ");let u=n.containerPhrasing(e,{before:"# ",after:`
`,...s.current()});return/^[\t ]/.test(u)&&(u=As(u.charCodeAt(0))+u.slice(1)),u=u?o+" "+u:o,n.options.closeAtx&&(u+=" "+o),a(),l(),u}D1.peek=FM;function D1(e){return e.value||""}function FM(){return"<"}L1.peek=zM;function L1(e,t,n,r){const i=ad(n),s=i==='"'?"Quote":"Apostrophe",o=n.enter("image");let l=n.enter("label");const a=n.createTracker(r);let u=a.move("![");return u+=a.move(n.safe(e.alt,{before:u,after:"]",...a.current()})),u+=a.move("]("),l(),!e.url&&e.title||/[\0- \u007F]/.test(e.url)?(l=n.enter("destinationLiteral"),u+=a.move("<"),u+=a.move(n.safe(e.url,{before:u,after:">",...a.current()})),u+=a.move(">")):(l=n.enter("destinationRaw"),u+=a.move(n.safe(e.url,{before:u,after:e.title?" ":")",...a.current()}))),l(),e.title&&(l=n.enter(`title${s}`),u+=a.move(" "+i),u+=a.move(n.safe(e.title,{before:u,after:i,...a.current()})),u+=a.move(i),l()),u+=a.move(")"),o(),u}function zM(){return"!"}_1.peek=VM;function _1(e,t,n,r){const i=e.referenceType,s=n.enter("imageReference");let o=n.enter("label");const l=n.createTracker(r);let a=l.move("![");const u=n.safe(e.alt,{before:a,after:"]",...l.current()});a+=l.move(u+"]["),o();const c=n.stack;n.stack=[],o=n.enter("reference");const f=n.safe(n.associationId(e),{before:a,after:"]",...l.current()});return o(),n.stack=c,s(),i==="full"||!u||u!==f?a+=l.move(f+"]"):i==="shortcut"?a=a.slice(0,-1):a+=l.move("]"),a}function VM(){return"!"}O1.peek=BM;function O1(e,t,n){let r=e.value||"",i="`",s=-1;for(;new RegExp("(^|[^`])"+i+"([^`]|$)").test(r);)i+="`";for(/[^ \r\n]/.test(r)&&(/^[ \r\n]/.test(r)&&/[ \r\n]$/.test(r)||/^`|`$/.test(r))&&(r=" "+r+" ");++s<n.unsafe.length;){const o=n.unsafe[s],l=n.compilePattern(o);let a;if(o.atBreak)for(;a=l.exec(r);){let u=a.index;r.charCodeAt(u)===10&&r.charCodeAt(u-1)===13&&u--,r=r.slice(0,u)+" "+r.slice(a.index+1)}}return i+r+i}function BM(){return"`"}function j1(e,t){const n=Jf(e);return!!(!t.options.resourceLink&&e.url&&!e.title&&e.children&&e.children.length===1&&e.children[0].type==="text"&&(n===e.url||"mailto:"+n===e.url)&&/^[a-z][a-z+.-]+:/i.test(e.url)&&!/[\0- <>\u007F]/.test(e.url))}F1.peek=UM;function F1(e,t,n,r){const i=ad(n),s=i==='"'?"Quote":"Apostrophe",o=n.createTracker(r);let l,a;if(j1(e,n)){const c=n.stack;n.stack=[],l=n.enter("autolink");let f=o.move("<");return f+=o.move(n.containerPhrasing(e,{before:f,after:">",...o.current()})),f+=o.move(">"),l(),n.stack=c,f}l=n.enter("link"),a=n.enter("label");let u=o.move("[");return u+=o.move(n.containerPhrasing(e,{before:u,after:"](",...o.current()})),u+=o.move("]("),a(),!e.url&&e.title||/[\0- \u007F]/.test(e.url)?(a=n.enter("destinationLiteral"),u+=o.move("<"),u+=o.move(n.safe(e.url,{before:u,after:">",...o.current()})),u+=o.move(">")):(a=n.enter("destinationRaw"),u+=o.move(n.safe(e.url,{before:u,after:e.title?" ":")",...o.current()}))),a(),e.title&&(a=n.enter(`title${s}`),u+=o.move(" "+i),u+=o.move(n.safe(e.title,{before:u,after:i,...o.current()})),u+=o.move(i),a()),u+=o.move(")"),l(),u}function UM(e,t,n){return j1(e,n)?"<":"["}z1.peek=$M;function z1(e,t,n,r){const i=e.referenceType,s=n.enter("linkReference");let o=n.enter("label");const l=n.createTracker(r);let a=l.move("[");const u=n.containerPhrasing(e,{before:a,after:"]",...l.current()});a+=l.move(u+"]["),o();const c=n.stack;n.stack=[],o=n.enter("reference");const f=n.safe(n.associationId(e),{before:a,after:"]",...l.current()});return o(),n.stack=c,s(),i==="full"||!u||u!==f?a+=l.move(f+"]"):i==="shortcut"?a=a.slice(0,-1):a+=l.move("]"),a}function $M(){return"["}function ud(e){const t=e.options.bullet||"*";if(t!=="*"&&t!=="+"&&t!=="-")throw new Error("Cannot serialize items with `"+t+"` for `options.bullet`, expected `*`, `+`, or `-`");return t}function HM(e){const t=ud(e),n=e.options.bulletOther;if(!n)return t==="*"?"-":"*";if(n!=="*"&&n!=="+"&&n!=="-")throw new Error("Cannot serialize items with `"+n+"` for `options.bulletOther`, expected `*`, `+`, or `-`");if(n===t)throw new Error("Expected `bullet` (`"+t+"`) and `bulletOther` (`"+n+"`) to be different");return n}function GM(e){const t=e.options.bulletOrdered||".";if(t!=="."&&t!==")")throw new Error("Cannot serialize items with `"+t+"` for `options.bulletOrdered`, expected `.` or `)`");return t}function V1(e){const t=e.options.rule||"*";if(t!=="*"&&t!=="-"&&t!=="_")throw new Error("Cannot serialize rules with `"+t+"` for `options.rule`, expected `*`, `-`, or `_`");return t}function WM(e,t,n,r){const i=n.enter("list"),s=n.bulletCurrent;let o=e.ordered?GM(n):ud(n);const l=e.ordered?o==="."?")":".":HM(n);let a=t&&n.bulletLastUsed?o===n.bulletLastUsed:!1;if(!e.ordered){const c=e.children?e.children[0]:void 0;if((o==="*"||o==="-")&&c&&(!c.children||!c.children[0])&&n.stack[n.stack.length-1]==="list"&&n.stack[n.stack.length-2]==="listItem"&&n.stack[n.stack.length-3]==="list"&&n.stack[n.stack.length-4]==="listItem"&&n.indexStack[n.indexStack.length-1]===0&&n.indexStack[n.indexStack.length-2]===0&&n.indexStack[n.indexStack.length-3]===0&&(a=!0),V1(n)===o&&c){let f=-1;for(;++f<e.children.length;){const d=e.children[f];if(d&&d.type==="listItem"&&d.children&&d.children[0]&&d.children[0].type==="thematicBreak"){a=!0;break}}}}a&&(o=l),n.bulletCurrent=o;const u=n.containerFlow(e,r);return n.bulletLastUsed=o,n.bulletCurrent=s,i(),u}function KM(e){const t=e.options.listItemIndent||"one";if(t!=="tab"&&t!=="one"&&t!=="mixed")throw new Error("Cannot serialize items with `"+t+"` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`");return t}function YM(e,t,n,r){const i=KM(n);let s=n.bulletCurrent||ud(n);t&&t.type==="list"&&t.ordered&&(s=(typeof t.start=="number"&&t.start>-1?t.start:1)+(n.options.incrementListMarker===!1?0:t.children.indexOf(e))+s);let o=s.length+1;(i==="tab"||i==="mixed"&&(t&&t.type==="list"&&t.spread||e.spread))&&(o=Math.ceil(o/4)*4);const l=n.createTracker(r);l.move(s+" ".repeat(o-s.length)),l.shift(o);const a=n.enter("listItem"),u=n.indentLines(n.containerFlow(e,l.current()),c);return a(),u;function c(f,d,h){return d?(h?"":" ".repeat(o))+f:(h?s:s+" ".repeat(o-s.length))+f}}function qM(e,t,n,r){const i=n.enter("paragraph"),s=n.enter("phrasing"),o=n.containerPhrasing(e,r);return s(),i(),o}const XM=Fl(["break","delete","emphasis","footnote","footnoteReference","image","imageReference","inlineCode","inlineMath","link","linkReference","mdxJsxTextElement","mdxTextExpression","strong","text","textDirective"]);function QM(e,t,n,r){return(e.children.some(function(o){return XM(o)})?n.containerPhrasing:n.containerFlow).call(n,e,r)}function ZM(e){const t=e.options.strong||"*";if(t!=="*"&&t!=="_")throw new Error("Cannot serialize strong with `"+t+"` for `options.strong`, expected `*`, or `_`");return t}B1.peek=JM;function B1(e,t,n,r){const i=ZM(n),s=n.enter("strong"),o=n.createTracker(r),l=o.move(i+i);let a=o.move(n.containerPhrasing(e,{after:i,before:l,...o.current()}));const u=a.charCodeAt(0),c=dl(r.before.charCodeAt(r.before.length-1),u,i);c.inside&&(a=As(u)+a.slice(1));const f=a.charCodeAt(a.length-1),d=dl(r.after.charCodeAt(0),f,i);d.inside&&(a=a.slice(0,-1)+As(f));const h=o.move(i+i);return s(),n.attentionEncodeSurroundingInfo={after:d.outside,before:c.outside},l+a+h}function JM(e,t,n){return n.options.strong||"*"}function eR(e,t,n,r){return n.safe(e.value,r)}function tR(e){const t=e.options.ruleRepetition||3;if(t<3)throw new Error("Cannot serialize rules with repetition `"+t+"` for `options.ruleRepetition`, expected `3` or more");return t}function nR(e,t,n){const r=(V1(n)+(n.options.ruleSpaces?" ":"")).repeat(tR(n));return n.options.ruleSpaces?r.slice(0,-1):r}const U1={blockquote:bM,break:Um,code:MM,definition:DM,emphasis:R1,hardBreak:Um,heading:jM,html:D1,image:L1,imageReference:_1,inlineCode:O1,link:F1,linkReference:z1,list:WM,listItem:YM,paragraph:qM,root:QM,strong:B1,text:eR,thematicBreak:nR};function rR(){return{enter:{table:iR,tableData:$m,tableHeader:$m,tableRow:oR},exit:{codeText:lR,table:sR,tableData:Ba,tableHeader:Ba,tableRow:Ba}}}function iR(e){const t=e._align;this.enter({type:"table",align:t.map(function(n){return n==="none"?null:n}),children:[]},e),this.data.inTable=!0}function sR(e){this.exit(e),this.data.inTable=void 0}function oR(e){this.enter({type:"tableRow",children:[]},e)}function Ba(e){this.exit(e)}function $m(e){this.enter({type:"tableCell",children:[]},e)}function lR(e){let t=this.resume();this.data.inTable&&(t=t.replace(/\\([\\|])/g,aR));const n=this.stack[this.stack.length-1];n.type,n.value=t,this.exit(e)}function aR(e,t){return t==="|"?t:e}function uR(e){const t=e||{},n=t.tableCellPadding,r=t.tablePipeAlign,i=t.stringLength,s=n?" ":"|";return{unsafe:[{character:"\r",inConstruct:"tableCell"},{character:`
`,inConstruct:"tableCell"},{atBreak:!0,character:"|",after:"[	 :-]"},{character:"|",inConstruct:"tableCell"},{atBreak:!0,character:":",after:"-"},{atBreak:!0,character:"-",after:"[:|-]"}],handlers:{inlineCode:d,table:o,tableCell:a,tableRow:l}};function o(h,m,x,C){return u(c(h,x,C),h.align)}function l(h,m,x,C){const p=f(h,x,C),g=u([p]);return g.slice(0,g.indexOf(`
`))}function a(h,m,x,C){const p=x.enter("tableCell"),g=x.enter("phrasing"),y=x.containerPhrasing(h,{...C,before:s,after:s});return g(),p(),y}function u(h,m){return CM(h,{align:m,alignDelimiters:r,padding:n,stringLength:i})}function c(h,m,x){const C=h.children;let p=-1;const g=[],y=m.enter("table");for(;++p<C.length;)g[p]=f(C[p],m,x);return y(),g}function f(h,m,x){const C=h.children;let p=-1;const g=[],y=m.enter("tableRow");for(;++p<C.length;)g[p]=a(C[p],h,m,x);return y(),g}function d(h,m,x){let C=U1.inlineCode(h,m,x);return x.stack.includes("tableCell")&&(C=C.replace(/\|/g,"\\$&")),C}}function cR(){return{exit:{taskListCheckValueChecked:Hm,taskListCheckValueUnchecked:Hm,paragraph:dR}}}function fR(){return{unsafe:[{atBreak:!0,character:"-",after:"[:|-]"}],handlers:{listItem:hR}}}function Hm(e){const t=this.stack[this.stack.length-2];t.type,t.checked=e.type==="taskListCheckValueChecked"}function dR(e){const t=this.stack[this.stack.length-2];if(t&&t.type==="listItem"&&typeof t.checked=="boolean"){const n=this.stack[this.stack.length-1];n.type;const r=n.children[0];if(r&&r.type==="text"){const i=t.children;let s=-1,o;for(;++s<i.length;){const l=i[s];if(l.type==="paragraph"){o=l;break}}o===n&&(r.value=r.value.slice(1),r.value.length===0?n.children.shift():n.position&&r.position&&typeof r.position.start.offset=="number"&&(r.position.start.column++,r.position.start.offset++,n.position.start=Object.assign({},r.position.start)))}}this.exit(e)}function hR(e,t,n,r){const i=e.children[0],s=typeof e.checked=="boolean"&&i&&i.type==="paragraph",o="["+(e.checked?"x":" ")+"] ",l=n.createTracker(r);s&&l.move(o);let a=U1.listItem(e,t,n,{...r,...l.current()});return s&&(a=a.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/,u)),a;function u(c){return c+o}}function pR(){return[WI(),hM(),yM(),rR(),cR()]}function mR(e){return{extensions:[KI(),pM(e),xM(),uR(e),fR()]}}const gR={tokenize:SR,partial:!0},$1={tokenize:CR,partial:!0},H1={tokenize:ER,partial:!0},G1={tokenize:bR,partial:!0},yR={tokenize:TR,partial:!0},W1={name:"wwwAutolink",tokenize:wR,previous:Y1},K1={name:"protocolAutolink",tokenize:kR,previous:q1},xn={name:"emailAutolink",tokenize:vR,previous:X1},Jt={};function xR(){return{text:Jt}}let Qn=48;for(;Qn<123;)Jt[Qn]=xn,Qn++,Qn===58?Qn=65:Qn===91&&(Qn=97);Jt[43]=xn;Jt[45]=xn;Jt[46]=xn;Jt[95]=xn;Jt[72]=[xn,K1];Jt[104]=[xn,K1];Jt[87]=[xn,W1];Jt[119]=[xn,W1];function vR(e,t,n){const r=this;let i,s;return o;function o(f){return!hc(f)||!X1.call(r,r.previous)||cd(r.events)?n(f):(e.enter("literalAutolink"),e.enter("literalAutolinkEmail"),l(f))}function l(f){return hc(f)?(e.consume(f),l):f===64?(e.consume(f),a):n(f)}function a(f){return f===46?e.check(yR,c,u)(f):f===45||f===95||We(f)?(s=!0,e.consume(f),a):c(f)}function u(f){return e.consume(f),i=!0,a}function c(f){return s&&i&&Xe(r.previous)?(e.exit("literalAutolinkEmail"),e.exit("literalAutolink"),t(f)):n(f)}}function wR(e,t,n){const r=this;return i;function i(o){return o!==87&&o!==119||!Y1.call(r,r.previous)||cd(r.events)?n(o):(e.enter("literalAutolink"),e.enter("literalAutolinkWww"),e.check(gR,e.attempt($1,e.attempt(H1,s),n),n)(o))}function s(o){return e.exit("literalAutolinkWww"),e.exit("literalAutolink"),t(o)}}function kR(e,t,n){const r=this;let i="",s=!1;return o;function o(f){return(f===72||f===104)&&q1.call(r,r.previous)&&!cd(r.events)?(e.enter("literalAutolink"),e.enter("literalAutolinkHttp"),i+=String.fromCodePoint(f),e.consume(f),l):n(f)}function l(f){if(Xe(f)&&i.length<5)return i+=String.fromCodePoint(f),e.consume(f),l;if(f===58){const d=i.toLowerCase();if(d==="http"||d==="https")return e.consume(f),a}return n(f)}function a(f){return f===47?(e.consume(f),s?u:(s=!0,a)):n(f)}function u(f){return f===null||ul(f)||ue(f)||vr(f)||_l(f)?n(f):e.attempt($1,e.attempt(H1,c),n)(f)}function c(f){return e.exit("literalAutolinkHttp"),e.exit("literalAutolink"),t(f)}}function SR(e,t,n){let r=0;return i;function i(o){return(o===87||o===119)&&r<3?(r++,e.consume(o),i):o===46&&r===3?(e.consume(o),s):n(o)}function s(o){return o===null?n(o):t(o)}}function CR(e,t,n){let r,i,s;return o;function o(u){return u===46||u===95?e.check(G1,a,l)(u):u===null||ue(u)||vr(u)||u!==45&&_l(u)?a(u):(s=!0,e.consume(u),o)}function l(u){return u===95?r=!0:(i=r,r=void 0),e.consume(u),o}function a(u){return i||r||!s?n(u):t(u)}}function ER(e,t){let n=0,r=0;return i;function i(o){return o===40?(n++,e.consume(o),i):o===41&&r<n?s(o):o===33||o===34||o===38||o===39||o===41||o===42||o===44||o===46||o===58||o===59||o===60||o===63||o===93||o===95||o===126?e.check(G1,t,s)(o):o===null||ue(o)||vr(o)?t(o):(e.consume(o),i)}function s(o){return o===41&&r++,e.consume(o),i}}function bR(e,t,n){return r;function r(l){return l===33||l===34||l===39||l===41||l===42||l===44||l===46||l===58||l===59||l===63||l===95||l===126?(e.consume(l),r):l===38?(e.consume(l),s):l===93?(e.consume(l),i):l===60||l===null||ue(l)||vr(l)?t(l):n(l)}function i(l){return l===null||l===40||l===91||ue(l)||vr(l)?t(l):r(l)}function s(l){return Xe(l)?o(l):n(l)}function o(l){return l===59?(e.consume(l),r):Xe(l)?(e.consume(l),o):n(l)}}function TR(e,t,n){return r;function r(s){return e.consume(s),i}function i(s){return We(s)?n(s):t(s)}}function Y1(e){return e===null||e===40||e===42||e===95||e===91||e===93||e===126||ue(e)}function q1(e){return!Xe(e)}function X1(e){return!(e===47||hc(e))}function hc(e){return e===43||e===45||e===46||e===95||We(e)}function cd(e){let t=e.length,n=!1;for(;t--;){const r=e[t][1];if((r.type==="labelLink"||r.type==="labelImage")&&!r._balanced){n=!0;break}if(r._gfmAutolinkLiteralWalkedInto){n=!1;break}}return e.length>0&&!n&&(e[e.length-1][1]._gfmAutolinkLiteralWalkedInto=!0),n}const AR={tokenize:_R,partial:!0};function PR(){return{document:{91:{name:"gfmFootnoteDefinition",tokenize:RR,continuation:{tokenize:DR},exit:LR}},text:{91:{name:"gfmFootnoteCall",tokenize:MR},93:{name:"gfmPotentialFootnoteCall",add:"after",tokenize:NR,resolveTo:IR}}}}function NR(e,t,n){const r=this;let i=r.events.length;const s=r.parser.gfmFootnotes||(r.parser.gfmFootnotes=[]);let o;for(;i--;){const a=r.events[i][1];if(a.type==="labelImage"){o=a;break}if(a.type==="gfmFootnoteCall"||a.type==="labelLink"||a.type==="label"||a.type==="image"||a.type==="link")break}return l;function l(a){if(!o||!o._balanced)return n(a);const u=Vt(r.sliceSerialize({start:o.end,end:r.now()}));return u.codePointAt(0)!==94||!s.includes(u.slice(1))?n(a):(e.enter("gfmFootnoteCallLabelMarker"),e.consume(a),e.exit("gfmFootnoteCallLabelMarker"),t(a))}}function IR(e,t){let n=e.length;for(;n--;)if(e[n][1].type==="labelImage"&&e[n][0]==="enter"){e[n][1];break}e[n+1][1].type="data",e[n+3][1].type="gfmFootnoteCallLabelMarker";const r={type:"gfmFootnoteCall",start:Object.assign({},e[n+3][1].start),end:Object.assign({},e[e.length-1][1].end)},i={type:"gfmFootnoteCallMarker",start:Object.assign({},e[n+3][1].end),end:Object.assign({},e[n+3][1].end)};i.end.column++,i.end.offset++,i.end._bufferIndex++;const s={type:"gfmFootnoteCallString",start:Object.assign({},i.end),end:Object.assign({},e[e.length-1][1].start)},o={type:"chunkString",contentType:"string",start:Object.assign({},s.start),end:Object.assign({},s.end)},l=[e[n+1],e[n+2],["enter",r,t],e[n+3],e[n+4],["enter",i,t],["exit",i,t],["enter",s,t],["enter",o,t],["exit",o,t],["exit",s,t],e[e.length-2],e[e.length-1],["exit",r,t]];return e.splice(n,e.length-n+1,...l),e}function MR(e,t,n){const r=this,i=r.parser.gfmFootnotes||(r.parser.gfmFootnotes=[]);let s=0,o;return l;function l(f){return e.enter("gfmFootnoteCall"),e.enter("gfmFootnoteCallLabelMarker"),e.consume(f),e.exit("gfmFootnoteCallLabelMarker"),a}function a(f){return f!==94?n(f):(e.enter("gfmFootnoteCallMarker"),e.consume(f),e.exit("gfmFootnoteCallMarker"),e.enter("gfmFootnoteCallString"),e.enter("chunkString").contentType="string",u)}function u(f){if(s>999||f===93&&!o||f===null||f===91||ue(f))return n(f);if(f===93){e.exit("chunkString");const d=e.exit("gfmFootnoteCallString");return i.includes(Vt(r.sliceSerialize(d)))?(e.enter("gfmFootnoteCallLabelMarker"),e.consume(f),e.exit("gfmFootnoteCallLabelMarker"),e.exit("gfmFootnoteCall"),t):n(f)}return ue(f)||(o=!0),s++,e.consume(f),f===92?c:u}function c(f){return f===91||f===92||f===93?(e.consume(f),s++,u):u(f)}}function RR(e,t,n){const r=this,i=r.parser.gfmFootnotes||(r.parser.gfmFootnotes=[]);let s,o=0,l;return a;function a(m){return e.enter("gfmFootnoteDefinition")._container=!0,e.enter("gfmFootnoteDefinitionLabel"),e.enter("gfmFootnoteDefinitionLabelMarker"),e.consume(m),e.exit("gfmFootnoteDefinitionLabelMarker"),u}function u(m){return m===94?(e.enter("gfmFootnoteDefinitionMarker"),e.consume(m),e.exit("gfmFootnoteDefinitionMarker"),e.enter("gfmFootnoteDefinitionLabelString"),e.enter("chunkString").contentType="string",c):n(m)}function c(m){if(o>999||m===93&&!l||m===null||m===91||ue(m))return n(m);if(m===93){e.exit("chunkString");const x=e.exit("gfmFootnoteDefinitionLabelString");return s=Vt(r.sliceSerialize(x)),e.enter("gfmFootnoteDefinitionLabelMarker"),e.consume(m),e.exit("gfmFootnoteDefinitionLabelMarker"),e.exit("gfmFootnoteDefinitionLabel"),d}return ue(m)||(l=!0),o++,e.consume(m),m===92?f:c}function f(m){return m===91||m===92||m===93?(e.consume(m),o++,c):c(m)}function d(m){return m===58?(e.enter("definitionMarker"),e.consume(m),e.exit("definitionMarker"),i.includes(s)||i.push(s),te(e,h,"gfmFootnoteDefinitionWhitespace")):n(m)}function h(m){return t(m)}}function DR(e,t,n){return e.check(zs,t,e.attempt(AR,t,n))}function LR(e){e.exit("gfmFootnoteDefinition")}function _R(e,t,n){const r=this;return te(e,i,"gfmFootnoteDefinitionIndent",5);function i(s){const o=r.events[r.events.length-1];return o&&o[1].type==="gfmFootnoteDefinitionIndent"&&o[2].sliceSerialize(o[1],!0).length===4?t(s):n(s)}}function OR(e){let n=(e||{}).singleTilde;const r={name:"strikethrough",tokenize:s,resolveAll:i};return n==null&&(n=!0),{text:{126:r},insideSpan:{null:[r]},attentionMarkers:{null:[126]}};function i(o,l){let a=-1;for(;++a<o.length;)if(o[a][0]==="enter"&&o[a][1].type==="strikethroughSequenceTemporary"&&o[a][1]._close){let u=a;for(;u--;)if(o[u][0]==="exit"&&o[u][1].type==="strikethroughSequenceTemporary"&&o[u][1]._open&&o[a][1].end.offset-o[a][1].start.offset===o[u][1].end.offset-o[u][1].start.offset){o[a][1].type="strikethroughSequence",o[u][1].type="strikethroughSequence";const c={type:"strikethrough",start:Object.assign({},o[u][1].start),end:Object.assign({},o[a][1].end)},f={type:"strikethroughText",start:Object.assign({},o[u][1].end),end:Object.assign({},o[a][1].start)},d=[["enter",c,l],["enter",o[u][1],l],["exit",o[u][1],l],["enter",f,l]],h=l.parser.constructs.insideSpan.null;h&&gt(d,d.length,0,Ol(h,o.slice(u+1,a),l)),gt(d,d.length,0,[["exit",f,l],["enter",o[a][1],l],["exit",o[a][1],l],["exit",c,l]]),gt(o,u-1,a-u+3,d),a=u+d.length-2;break}}for(a=-1;++a<o.length;)o[a][1].type==="strikethroughSequenceTemporary"&&(o[a][1].type="data");return o}function s(o,l,a){const u=this.previous,c=this.events;let f=0;return d;function d(m){return u===126&&c[c.length-1][1].type!=="characterEscape"?a(m):(o.enter("strikethroughSequenceTemporary"),h(m))}function h(m){const x=ui(u);if(m===126)return f>1?a(m):(o.consume(m),f++,h);if(f<2&&!n)return a(m);const C=o.exit("strikethroughSequenceTemporary"),p=ui(m);return C._open=!p||p===2&&!!x,C._close=!x||x===2&&!!p,l(m)}}}class jR{constructor(){this.map=[]}add(t,n,r){FR(this,t,n,r)}consume(t){if(this.map.sort(function(s,o){return s[0]-o[0]}),this.map.length===0)return;let n=this.map.length;const r=[];for(;n>0;)n-=1,r.push(t.slice(this.map[n][0]+this.map[n][1]),this.map[n][2]),t.length=this.map[n][0];r.push(t.slice()),t.length=0;let i=r.pop();for(;i;){for(const s of i)t.push(s);i=r.pop()}this.map.length=0}}function FR(e,t,n,r){let i=0;if(!(n===0&&r.length===0)){for(;i<e.map.length;){if(e.map[i][0]===t){e.map[i][1]+=n,e.map[i][2].push(...r);return}i+=1}e.map.push([t,n,r])}}function zR(e,t){let n=!1;const r=[];for(;t<e.length;){const i=e[t];if(n){if(i[0]==="enter")i[1].type==="tableContent"&&r.push(e[t+1][1].type==="tableDelimiterMarker"?"left":"none");else if(i[1].type==="tableContent"){if(e[t-1][1].type==="tableDelimiterMarker"){const s=r.length-1;r[s]=r[s]==="left"?"center":"right"}}else if(i[1].type==="tableDelimiterRow")break}else i[0]==="enter"&&i[1].type==="tableDelimiterRow"&&(n=!0);t+=1}return r}function VR(){return{flow:{null:{name:"table",tokenize:BR,resolveAll:UR}}}}function BR(e,t,n){const r=this;let i=0,s=0,o;return l;function l(E){let L=r.events.length-1;for(;L>-1;){const J=r.events[L][1].type;if(J==="lineEnding"||J==="linePrefix")L--;else break}const j=L>-1?r.events[L][1].type:null,K=j==="tableHead"||j==="tableRow"?k:a;return K===k&&r.parser.lazy[r.now().line]?n(E):K(E)}function a(E){return e.enter("tableHead"),e.enter("tableRow"),u(E)}function u(E){return E===124||(o=!0,s+=1),c(E)}function c(E){return E===null?n(E):U(E)?s>1?(s=0,r.interrupt=!0,e.exit("tableRow"),e.enter("lineEnding"),e.consume(E),e.exit("lineEnding"),h):n(E):X(E)?te(e,c,"whitespace")(E):(s+=1,o&&(o=!1,i+=1),E===124?(e.enter("tableCellDivider"),e.consume(E),e.exit("tableCellDivider"),o=!0,c):(e.enter("data"),f(E)))}function f(E){return E===null||E===124||ue(E)?(e.exit("data"),c(E)):(e.consume(E),E===92?d:f)}function d(E){return E===92||E===124?(e.consume(E),f):f(E)}function h(E){return r.interrupt=!1,r.parser.lazy[r.now().line]?n(E):(e.enter("tableDelimiterRow"),o=!1,X(E)?te(e,m,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(E):m(E))}function m(E){return E===45||E===58?C(E):E===124?(o=!0,e.enter("tableCellDivider"),e.consume(E),e.exit("tableCellDivider"),x):T(E)}function x(E){return X(E)?te(e,C,"whitespace")(E):C(E)}function C(E){return E===58?(s+=1,o=!0,e.enter("tableDelimiterMarker"),e.consume(E),e.exit("tableDelimiterMarker"),p):E===45?(s+=1,p(E)):E===null||U(E)?b(E):T(E)}function p(E){return E===45?(e.enter("tableDelimiterFiller"),g(E)):T(E)}function g(E){return E===45?(e.consume(E),g):E===58?(o=!0,e.exit("tableDelimiterFiller"),e.enter("tableDelimiterMarker"),e.consume(E),e.exit("tableDelimiterMarker"),y):(e.exit("tableDelimiterFiller"),y(E))}function y(E){return X(E)?te(e,b,"whitespace")(E):b(E)}function b(E){return E===124?m(E):E===null||U(E)?!o||i!==s?T(E):(e.exit("tableDelimiterRow"),e.exit("tableHead"),t(E)):T(E)}function T(E){return n(E)}function k(E){return e.enter("tableRow"),A(E)}function A(E){return E===124?(e.enter("tableCellDivider"),e.consume(E),e.exit("tableCellDivider"),A):E===null||U(E)?(e.exit("tableRow"),t(E)):X(E)?te(e,A,"whitespace")(E):(e.enter("data"),P(E))}function P(E){return E===null||E===124||ue(E)?(e.exit("data"),A(E)):(e.consume(E),E===92?O:P)}function O(E){return E===92||E===124?(e.consume(E),P):P(E)}}function UR(e,t){let n=-1,r=!0,i=0,s=[0,0,0,0],o=[0,0,0,0],l=!1,a=0,u,c,f;const d=new jR;for(;++n<e.length;){const h=e[n],m=h[1];h[0]==="enter"?m.type==="tableHead"?(l=!1,a!==0&&(Gm(d,t,a,u,c),c=void 0,a=0),u={type:"table",start:Object.assign({},m.start),end:Object.assign({},m.end)},d.add(n,0,[["enter",u,t]])):m.type==="tableRow"||m.type==="tableDelimiterRow"?(r=!0,f=void 0,s=[0,0,0,0],o=[0,n+1,0,0],l&&(l=!1,c={type:"tableBody",start:Object.assign({},m.start),end:Object.assign({},m.end)},d.add(n,0,[["enter",c,t]])),i=m.type==="tableDelimiterRow"?2:c?3:1):i&&(m.type==="data"||m.type==="tableDelimiterMarker"||m.type==="tableDelimiterFiller")?(r=!1,o[2]===0&&(s[1]!==0&&(o[0]=o[1],f=fo(d,t,s,i,void 0,f),s=[0,0,0,0]),o[2]=n)):m.type==="tableCellDivider"&&(r?r=!1:(s[1]!==0&&(o[0]=o[1],f=fo(d,t,s,i,void 0,f)),s=o,o=[s[1],n,0,0])):m.type==="tableHead"?(l=!0,a=n):m.type==="tableRow"||m.type==="tableDelimiterRow"?(a=n,s[1]!==0?(o[0]=o[1],f=fo(d,t,s,i,n,f)):o[1]!==0&&(f=fo(d,t,o,i,n,f)),i=0):i&&(m.type==="data"||m.type==="tableDelimiterMarker"||m.type==="tableDelimiterFiller")&&(o[3]=n)}for(a!==0&&Gm(d,t,a,u,c),d.consume(t.events),n=-1;++n<t.events.length;){const h=t.events[n];h[0]==="enter"&&h[1].type==="table"&&(h[1]._align=zR(t.events,n))}return e}function fo(e,t,n,r,i,s){const o=r===1?"tableHeader":r===2?"tableDelimiter":"tableData",l="tableContent";n[0]!==0&&(s.end=Object.assign({},Ar(t.events,n[0])),e.add(n[0],0,[["exit",s,t]]));const a=Ar(t.events,n[1]);if(s={type:o,start:Object.assign({},a),end:Object.assign({},a)},e.add(n[1],0,[["enter",s,t]]),n[2]!==0){const u=Ar(t.events,n[2]),c=Ar(t.events,n[3]),f={type:l,start:Object.assign({},u),end:Object.assign({},c)};if(e.add(n[2],0,[["enter",f,t]]),r!==2){const d=t.events[n[2]],h=t.events[n[3]];if(d[1].end=Object.assign({},h[1].end),d[1].type="chunkText",d[1].contentType="text",n[3]>n[2]+1){const m=n[2]+1,x=n[3]-n[2]-1;e.add(m,x,[])}}e.add(n[3]+1,0,[["exit",f,t]])}return i!==void 0&&(s.end=Object.assign({},Ar(t.events,i)),e.add(i,0,[["exit",s,t]]),s=void 0),s}function Gm(e,t,n,r,i){const s=[],o=Ar(t.events,n);i&&(i.end=Object.assign({},o),s.push(["exit",i,t])),r.end=Object.assign({},o),s.push(["exit",r,t]),e.add(n+1,0,s)}function Ar(e,t){const n=e[t],r=n[0]==="enter"?"start":"end";return n[1][r]}const $R={name:"tasklistCheck",tokenize:GR};function HR(){return{text:{91:$R}}}function GR(e,t,n){const r=this;return i;function i(a){return r.previous!==null||!r._gfmTasklistFirstContentOfListItem?n(a):(e.enter("taskListCheck"),e.enter("taskListCheckMarker"),e.consume(a),e.exit("taskListCheckMarker"),s)}function s(a){return ue(a)?(e.enter("taskListCheckValueUnchecked"),e.consume(a),e.exit("taskListCheckValueUnchecked"),o):a===88||a===120?(e.enter("taskListCheckValueChecked"),e.consume(a),e.exit("taskListCheckValueChecked"),o):n(a)}function o(a){return a===93?(e.enter("taskListCheckMarker"),e.consume(a),e.exit("taskListCheckMarker"),e.exit("taskListCheck"),l):n(a)}function l(a){return U(a)?t(a):X(a)?e.check({tokenize:WR},t,n)(a):n(a)}}function WR(e,t,n){return te(e,r,"whitespace");function r(i){return i===null?n(i):t(i)}}function KR(e){return o1([xR(),PR(),OR(e),VR(),HR()])}const YR={};function qR(e){const t=this,n=e||YR,r=t.data(),i=r.micromarkExtensions||(r.micromarkExtensions=[]),s=r.fromMarkdownExtensions||(r.fromMarkdownExtensions=[]),o=r.toMarkdownExtensions||(r.toMarkdownExtensions=[]);i.push(KR(n)),s.push(pR()),o.push(mR(n))}function tr(e){let t=e,n=[],r;const i=/\[OPTIONS:\s*(\[.*?\])\]/gs,s=t.match(i);if(s)try{const h=s[0].match(/\[OPTIONS:\s*(\[.*?\])\]/s);h&&h[1]&&(n=JSON.parse(h[1]))}catch(d){console.error("옵션 파싱 오류:",d)}const o=(d,h)=>{let m=0,x=!1,C=!1;for(let p=h;p<d.length;p++){const g=d[p];if(C){C=!1;continue}if(g==="\\"){C=!0;continue}if(g==='"'){x=!x;continue}if(!x&&(g==="{"&&m++,g==="}"&&(m--,m===0)))return p}return-1},l=/\[GUI_EVENT:\s*\{/g;let a;for(;(a=l.exec(t))!==null;){const d=a.index+a[0].length-1,h=o(t,d);if(h!==-1)try{const m=t.substring(d,h+1);m.trim().length>0&&(r=JSON.parse(m))}catch(m){console.warn("GUI 이벤트 파싱 오류 (태그는 자동 제거됨):",m)}}let u="",c=0;const f=10;for(;t!==u&&c<f;){u=t,c++,t=t.replace(/\[OPTIONS:\s*\[[\s\S]*?\]\]/gs,"").trim();const d=/\[GUI_EVENT:\s*\{[\s\S]*?\}\]/gs;t=t.replace(d,"").trim(),t=t.replace(/\[STATUS:.*?\]/gs,"").trim(),t=t.replace(/\[NEWS:.*?\]/gs,"").trim(),t=t.replace(/\[STATUS\]/gs,"").trim(),t=t.replace(/\[NEWS\]/gs,"").trim(),t=t.replace(/\[GUI_EVENT:[^\]]*/g,"").trim(),t=t.replace(/\[OPTIONS:[^\]]*/g,"").trim(),t=t.replace(/\[STATUS:[^\]]*/g,"").trim(),t=t.replace(/\[NEWS:[^\]]*/g,"").trim(),t=t.replace(/\[[A-Z_]+:[^\]]*/g,"").trim()}return t=t.replace(/\[OPTIONS:[\s\S]*?\]/gs,"").trim(),t=t.replace(/\[GUI_EVENT:[\s\S]*?\]/gs,"").trim(),t=t.replace(/\[STATUS:[\s\S]*?\]/gs,"").trim(),t=t.replace(/\[NEWS:[\s\S]*?\]/gs,"").trim(),t=t.replace(/\[[A-Z_]+:[\s\S]*?\]/gs,"").trim(),t=t.replace(/\{"id":\s*\d+[^}]*\}/g,"").trim(),t=t.replace(/\{"name":\s*"[^"]*"[^}]*\}/g,"").trim(),t=t.replace(/\n\s*\n\s*\n/g,`

`).trim(),{text:t,options:n,guiEvent:r}}function Wm(e){const t=[/날짜[:\s]*(\d{4}\/\d{1,2}\/\d{1,2})/i,/날짜[:\s]*(\d{4}년\s*\d{1,2}월\s*\d{1,2}일)/i,/(\d{4}\/\d{1,2}\/\d{1,2})/,/(\d{4}년\s*\d{1,2}월\s*\d{1,2}일)/];for(const n of t){const r=e.match(n);if(r&&r[1]){const i=r[1];if(i.includes("/")){const[s,o,l]=i.split("/");return`${s}년 ${parseInt(o)}월 ${parseInt(l)}일`}return i}}return null}function Km(e){const t=[/(?:자금|보유\s*자금|현재\s*자금|예산)[:\s]*([0-9,.]+)\s*([가-힣a-zA-Z]*)/i,/([0-9,.]+)\s*억\s*(?:원)?/i,/([0-9,]+)\s*원/i,/([0-9,.]+)\s*억/i];for(const n of t){const r=e.match(n);if(r&&r[1]){const i=r[1].replace(/,/g,""),s=parseFloat(i);if(!isNaN(s)&&s>0){const o=r[0];return o.includes("억")?Math.floor(s*1e8):o.includes("만")?Math.floor(s*1e4):Math.floor(s)}}}return null}function Ym({message:e,isUser:t,isStreaming:n}){const r=tr(e);return t?v.jsx(pe.div,{initial:{opacity:0,x:20},animate:{opacity:1,x:0},transition:{duration:.3},className:"mb-3 flex justify-end",children:v.jsxs("div",{className:"bg-gradient-to-r from-baseball-green/10 to-baseball-green/5 border-2 border-baseball-green/30 rounded-lg px-4 py-2 text-xs text-gray-700 font-mono shadow-sm hover:shadow-md transition-all hover:border-baseball-green/50",children:[v.jsx("span",{className:"text-baseball-green font-semibold",children:"[지시]"})," ",r.text]})}):v.jsx(pe.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.4,ease:"easeOut"},className:"mb-4",children:v.jsxs("div",{className:"bg-gradient-to-br from-white to-gray-50/50 border-2 border-baseball-green/20 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:border-baseball-green/40 hover:-translate-y-1 overflow-hidden",children:[v.jsxs("div",{className:"bg-gradient-to-r from-baseball-green to-[#0a3528] border-b-2 border-baseball-gold/30 px-4 py-3 flex items-center gap-2 shadow-md",children:[v.jsxs("div",{className:"relative",children:[v.jsx(hb,{className:"w-5 h-5 text-baseball-gold"}),n&&v.jsx(pe.div,{animate:{scale:[1,1.2,1],opacity:[.5,1,.5]},transition:{repeat:1/0,duration:1.5},className:"absolute -top-1 -right-1",children:v.jsx(wb,{className:"w-3 h-3 text-yellow-400"})})]}),v.jsx("span",{className:"text-xs font-bold text-white uppercase tracking-wider drop-shadow-sm",children:"GM OFFICE REPORT"}),v.jsx("span",{className:"text-xs text-baseball-gold/80 ml-auto font-mono font-semibold",children:new Date().toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})})]}),v.jsxs("div",{className:"px-4 py-4 text-sm text-gray-800 bg-white/50",children:[v.jsx(OI,{remarkPlugins:[qR],components:{table:({children:i})=>v.jsx("div",{className:"w-full overflow-x-auto my-3 -mx-4 px-4",children:v.jsx("div",{className:"inline-block min-w-full align-middle",children:v.jsx("table",{className:"w-full border-collapse bg-white text-xs",children:i})})}),thead:({children:i})=>v.jsx("thead",{className:"bg-baseball-green text-white sticky top-0 z-10",children:i}),tbody:({children:i})=>v.jsx("tbody",{className:"divide-y divide-gray-200 bg-white",children:i}),tr:({children:i})=>{const s=Mi.Children.toArray(i);return v.jsx("tr",{className:"hover:bg-green-50 transition-colors cursor-default",children:Mi.Children.map(s,(o,l)=>Mi.isValidElement(o)?Mi.cloneElement(o,{"data-column-index":l}):o)})},th:({children:i})=>v.jsx("th",{className:"border border-gray-300 px-2 py-1.5 text-left font-semibold text-xs text-white bg-baseball-green whitespace-nowrap cursor-default",children:i}),td:({children:i,...s})=>{const o=s["data-column-index"]??-1,l=typeof i=="string"?i:String(i),a=o===0&&(l.trim()==="1군"||l.trim()==="2군");return v.jsx("td",{className:`border border-gray-300 px-2 py-1.5 text-xs font-mono cursor-default whitespace-nowrap ${a?l.trim()==="1군"?"font-bold text-baseball-green bg-green-50":"font-bold text-gray-600 bg-gray-50":""}`,children:i})},p:({children:i})=>v.jsx("p",{className:"mb-2 last:mb-0 whitespace-pre-wrap leading-relaxed text-gray-800",children:i}),pre:({children:i})=>v.jsx("pre",{className:"bg-gray-50 p-2 rounded text-xs font-mono overflow-x-auto my-2 border border-gray-200",children:i}),code:({children:i,className:s})=>!s?v.jsx("code",{className:"bg-gray-100 px-1 py-0.5 rounded text-xs font-mono text-baseball-green",children:i}):v.jsx("code",{className:s,children:i}),ul:({children:i})=>v.jsx("ul",{className:"list-disc list-inside my-2 space-y-1 text-gray-700",children:i}),ol:({children:i})=>v.jsx("ol",{className:"list-decimal list-inside my-2 space-y-1 text-gray-700",children:i}),strong:({children:i})=>v.jsx("strong",{className:"font-bold text-baseball-green",children:i})},children:r.text}),n&&v.jsxs(pe.div,{initial:{opacity:0},animate:{opacity:1},className:"inline-flex items-center gap-1 ml-2",children:[v.jsx(pe.span,{animate:{opacity:[.3,1,.3]},transition:{repeat:1/0,duration:1,ease:"easeInOut"},className:"inline-block w-2 h-4 bg-baseball-green rounded-full"}),v.jsx(pe.span,{animate:{opacity:[.3,1,.3]},transition:{repeat:1/0,duration:1,delay:.2,ease:"easeInOut"},className:"inline-block w-2 h-4 bg-baseball-green rounded-full"}),v.jsx(pe.span,{animate:{opacity:[.3,1,.3]},transition:{repeat:1/0,duration:1,delay:.4,ease:"easeInOut"},className:"inline-block w-2 h-4 bg-baseball-green rounded-full"})]})]})]})})}function XR(){return v.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",children:v.jsx("div",{className:"bg-white rounded-lg p-8 shadow-2xl max-w-sm w-full mx-4",children:v.jsxs("div",{className:"flex flex-col items-center gap-4",children:[v.jsxs("div",{className:"relative",children:[v.jsx(gb,{className:"w-12 h-12 text-baseball-green animate-spin"}),v.jsx("div",{className:"absolute inset-0 flex items-center justify-center",children:v.jsx("span",{className:"text-2xl",children:"⚾"})})]}),v.jsxs("div",{className:"text-center",children:[v.jsx("p",{className:"text-lg font-semibold text-gray-800 mb-1",children:"GM이 데이터를 분석 중입니다..."}),v.jsx("p",{className:"text-sm text-gray-600",children:"잠시만 기다려주세요"})]})]})})})}const QR={S:"from-yellow-400 to-yellow-600",A:"from-red-500 to-red-700",B:"from-blue-500 to-blue-700",C:"from-green-500 to-green-700",D:"from-gray-400 to-gray-600"},ZR={S:"S급",A:"A급",B:"B급",C:"C급",D:"D급"},JR=({player:e,onClick:t})=>{var f,d,h,m,x,C,p,g,y,b,T,k;const n=e.grade||"C",r=((f=e.stats)==null?void 0:f.overall)||0,s=["투수","선발","불펜","마무리","좌투","우투","P","SP","RP","CP"].some(A=>e.position.includes(A)||e.position===A),o=(A,P=50)=>A==null?P:Math.min(100,Math.max(0,A)),l={velocity:o((d=e.stats)==null?void 0:d.velocity,70),movement:o((h=e.stats)==null?void 0:h.movement,65),control:o((m=e.stats)==null?void 0:m.control,60),breaking:o((x=e.stats)==null?void 0:x.breaking,65),stamina:o((C=e.stats)==null?void 0:C.stamina,70)},a={contactL:o((p=e.stats)==null?void 0:p.contactL,65),contactR:o((g=e.stats)==null?void 0:g.contactR,70),power:o((y=e.stats)==null?void 0:y.power,60),eye:o((b=e.stats)==null?void 0:b.eye,65),defense:o((T=e.stats)==null?void 0:T.defense,65),speed:o((k=e.stats)==null?void 0:k.speed,60)},u=s?{velocity:"구속",movement:"구위",control:"제구",breaking:"변화구",stamina:"체력"}:{contactL:"교타(좌)",contactR:"교타(우)",power:"장타",eye:"선구안",defense:"수비",speed:"주루"},c=s?l:a;return v.jsxs(pe.div,{whileHover:{scale:1.02,y:-2},whileTap:{scale:.98},onClick:t,className:`relative bg-white rounded-lg shadow-lg overflow-hidden border border-gray-300 cursor-pointer transition-all ${t?"hover:shadow-xl":""}`,children:[v.jsx("div",{className:`absolute top-2 right-2 px-2 py-1 rounded text-white text-xs font-black shadow-md bg-gradient-to-r ${QR[n]} z-10`,children:ZR[n]}),v.jsx("div",{className:"bg-gradient-to-r from-baseball-green to-baseball-green-dark p-4 text-white",children:v.jsxs("div",{className:"flex items-center justify-between",children:[v.jsxs("div",{children:[v.jsx("h3",{className:"font-black text-xl mb-1",children:e.name}),v.jsxs("div",{className:"flex items-center gap-3 text-sm",children:[v.jsx("span",{className:"font-semibold",children:e.position}),e.age&&v.jsxs(v.Fragment,{children:[v.jsx("span",{className:"text-white/60",children:"|"}),v.jsxs("span",{className:"text-white/80",children:[e.age,"세"]})]})]})]}),v.jsx("div",{className:"text-5xl opacity-20",children:"⚾"})]})}),v.jsxs("div",{className:"p-4 border-b border-gray-200",children:[v.jsxs("div",{className:"flex items-center justify-between mb-2",children:[v.jsx("span",{className:"text-xs font-semibold text-gray-600 uppercase tracking-wide",children:"종합 능력치"}),v.jsx("span",{className:"text-lg font-black font-mono text-baseball-green",children:r})]}),v.jsx("div",{className:"w-full bg-gray-200 rounded-full h-3",children:v.jsx("div",{className:"bg-gradient-to-r from-baseball-green to-baseball-gold h-3 rounded-full transition-all",style:{width:`${r}%`}})})]}),v.jsxs("div",{className:"p-4 space-y-2.5",children:[v.jsx("div",{className:"text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2",children:s?"투수 스탯":"타자 스탯"}),Object.entries(c).map(([A,P])=>{const O=u[A];return v.jsxs("div",{className:"space-y-1",children:[v.jsxs("div",{className:"flex items-center justify-between",children:[v.jsx("span",{className:"text-xs text-gray-700 font-medium w-20",children:O}),v.jsx("span",{className:"text-xs font-mono font-bold text-gray-800 w-10 text-right",children:P})]}),v.jsx("div",{className:"w-full bg-gray-200 rounded-full h-2",children:v.jsx("div",{className:`h-2 rounded-full transition-all ${P>=80?"bg-green-500":P>=60?"bg-blue-500":P>=40?"bg-yellow-500":"bg-red-500"}`,style:{width:`${P}%`}})})]},A)})]}),e.salary&&v.jsx("div",{className:"px-4 py-3 bg-gray-50 border-t border-gray-200",children:v.jsxs("div",{className:"flex items-center justify-between",children:[v.jsx("span",{className:"text-xs font-semibold text-gray-600 uppercase tracking-wide",children:"연봉"}),v.jsxs("span",{className:"text-sm font-mono font-bold text-baseball-green",children:[e.salary.toLocaleString("ko-KR"),"원"]})]})})]})};function eD({isOpen:e,type:t,title:n,players:r,onSelect:i,onClose:s}){if(!e)return null;const o=l=>{i(l),s()};return v.jsx(yr,{children:e&&v.jsxs(v.Fragment,{children:[v.jsx(pe.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:s,className:"fixed inset-0 bg-black/60 backdrop-blur-sm z-50"}),v.jsx(pe.div,{initial:{opacity:0,scale:.9,y:20},animate:{opacity:1,scale:1,y:0},exit:{opacity:0,scale:.9,y:20},className:"fixed inset-0 z-50 flex items-center justify-center p-4",onClick:l=>l.stopPropagation(),children:v.jsxs("div",{className:"bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-white/50",children:[v.jsxs("div",{className:"bg-baseball-green text-white p-4 flex items-center justify-between",children:[v.jsx("h2",{className:"text-2xl font-bold",children:n}),v.jsx("button",{onClick:s,className:"p-1 hover:bg-white/20 rounded transition-colors",children:v.jsx(Dl,{className:"w-6 h-6"})})]}),v.jsx("div",{className:"flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-50 to-white",children:r.length===0?v.jsxs("div",{className:"flex flex-col items-center justify-center py-12 text-gray-500",children:[v.jsx("div",{className:"text-4xl mb-4",children:"📋"}),v.jsx("p",{className:"text-lg font-semibold mb-2",children:"데이터가 없습니다"}),v.jsx("p",{className:"text-sm text-gray-400",children:"트레이드 가능한 선수가 없습니다."}),v.jsx("button",{onClick:s,className:"mt-6 px-6 py-2 bg-baseball-green hover:bg-baseball-green-dark text-white rounded-lg transition-colors",children:"닫기"})]}):v.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4",children:r.map(l=>{var C,p,g,y,b,T,k,A,P,O,E,L,j,K,J;const u=["투수","선발","불펜","마무리","좌투","우투","P","SP","RP","CP"].some(B=>l.position.includes(B)||l.position===B),c=(B,oe)=>Math.floor(Math.random()*(oe-B+1))+B,f=B=>B!=null&&B!==0&&!isNaN(B),d={velocity:c(70,95),movement:c(60,85),control:c(55,80),breaking:c(60,85),stamina:c(65,85)},h={contactL:c(60,85),contactR:c(65,90),power:c(50,80),eye:c(55,80),defense:c(60,85),speed:c(55,85)},m=u?{velocity:f((C=l.stats)==null?void 0:C.velocity)?l.stats.velocity:d.velocity,movement:f((p=l.stats)==null?void 0:p.movement)?l.stats.movement:d.movement,control:f((g=l.stats)==null?void 0:g.control)?l.stats.control:d.control,breaking:f((y=l.stats)==null?void 0:y.breaking)?l.stats.breaking:d.breaking,stamina:f((b=l.stats)==null?void 0:b.stamina)?l.stats.stamina:d.stamina}:{contactL:f((T=l.stats)==null?void 0:T.contactL)?l.stats.contactL:h.contactL,contactR:f((k=l.stats)==null?void 0:k.contactR)?l.stats.contactR:h.contactR,power:f((A=l.stats)==null?void 0:A.power)?l.stats.power:h.power,eye:f((P=l.stats)==null?void 0:P.eye)?l.stats.eye:h.eye,defense:f((O=l.stats)==null?void 0:O.defense)?l.stats.defense:h.defense,speed:f((E=l.stats)==null?void 0:E.speed)?l.stats.speed:h.speed},x={id:l.id,name:l.name,position:l.position,grade:(L=l.stats)!=null&&L.overall?l.stats.overall>=90?"S":l.stats.overall>=80?"A":l.stats.overall>=70?"B":l.stats.overall>=60?"C":"D":"C",stats:{...m,overall:((j=l.stats)==null?void 0:j.overall)||65,...Object.fromEntries(Object.entries(l.stats||{}).filter(([B])=>!["velocity","movement","control","breaking","stamina","contactL","contactR","power","eye","defense","speed","overall"].includes(B)))},age:((K=l.stats)==null?void 0:K.age)||l.age,salary:((J=l.stats)==null?void 0:J.salary)||l.salary};return v.jsx(JR,{player:x,onClick:()=>o(l)},l.id)})})})]})})]})})}function tD({playerName:e,onSubmit:t,onClose:n}){const[r,i]=I.useState(""),s=l=>{l.preventDefault();const a=parseInt(r.replace(/,/g,""));!isNaN(a)&&a>0&&(t(a),i(""))},o=l=>l.replace(/[^0-9]/g,"").replace(/\B(?=(\d{3})+(?!\d))/g,",");return v.jsx(pe.div,{initial:{y:100,opacity:0},animate:{y:0,opacity:1},exit:{y:100,opacity:0},className:"fixed bottom-0 left-0 right-0 bg-white border-t-2 border-baseball-gold shadow-2xl z-40",children:v.jsxs("div",{className:"max-w-4xl mx-auto p-4",children:[v.jsxs("div",{className:"flex items-center justify-between mb-3",children:[v.jsxs("div",{children:[v.jsxs("h3",{className:"font-bold text-lg text-gray-800",children:[e," 선수 연봉 협상"]}),v.jsx("p",{className:"text-sm text-gray-600",children:"제시할 연봉을 입력하세요"})]}),v.jsx("button",{onClick:n,className:"p-1 hover:bg-gray-100 rounded transition-colors",children:v.jsx(Dl,{className:"w-5 h-5 text-gray-600"})})]}),v.jsxs("form",{onSubmit:s,className:"flex gap-2",children:[v.jsxs("div",{className:"flex-1 relative",children:[v.jsx("input",{type:"text",value:r,onChange:l=>i(o(l.target.value)),placeholder:"예: 50,000,000",className:"w-full px-4 py-3 border-2 border-baseball-green rounded-lg focus:outline-none focus:ring-2 focus:ring-baseball-green text-lg font-semibold",autoFocus:!0}),v.jsx("span",{className:"absolute right-4 top-1/2 -translate-y-1/2 text-gray-500",children:"원"})]}),v.jsx("button",{type:"submit",disabled:!r||parseInt(r.replace(/,/g,""))<=0,className:"px-6 py-3 bg-baseball-green hover:bg-baseball-green-dark disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors shadow-md",children:v.jsx(Vx,{className:"w-5 h-5"})})]})]})})}function nD({event:e,isOpen:t,onClose:n,onChoiceSelect:r}){if(!e||!t)return null;const i=()=>{switch(e.type){case"positive":return v.jsx(cb,{className:"w-8 h-8 text-green-500"});case"negative":return v.jsx(Sb,{className:"w-8 h-8 text-red-500"});case"choice":return v.jsx(Dp,{className:"w-8 h-8 text-yellow-500"});default:return v.jsx(Dp,{className:"w-8 h-8 text-gray-500"})}},s=()=>{switch(e.type){case"positive":return"from-green-500/20 to-green-600/10 border-green-500/30";case"negative":return"from-red-500/20 to-red-600/10 border-red-500/30";case"choice":return"from-yellow-500/20 to-yellow-600/10 border-yellow-500/30";default:return"from-gray-500/20 to-gray-600/10 border-gray-500/30"}},o=l=>{const a=[];if(l.budget){const u=Math.abs(l.budget),c=l.budget>0?"+":"-";a.push(`${c}${(u/1e8).toFixed(1)}억 원`)}return l.morale&&a.push(`팀 사기 ${l.morale>0?"+":""}${l.morale}`),l.playerCondition&&a.push(`선수 컨디션 ${l.playerCondition>0?"+":""}${l.playerCondition}`),l.fanLoyalty&&a.push(`팬 충성도 ${l.fanLoyalty>0?"+":""}${l.fanLoyalty}`),a.length>0?a.join(", "):"효과 없음"};return v.jsx(yr,{children:t&&v.jsxs(v.Fragment,{children:[v.jsx(pe.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:n,className:"fixed inset-0 bg-black/60 backdrop-blur-sm z-50"}),v.jsx(pe.div,{initial:{opacity:0,scale:.9,y:20},animate:{opacity:1,scale:1,y:0},exit:{opacity:0,scale:.9,y:20},transition:{type:"spring",damping:25,stiffness:300},className:"fixed inset-0 z-50 flex items-center justify-center p-4",onClick:l=>l.stopPropagation(),children:v.jsxs("div",{className:`bg-white rounded-2xl shadow-2xl max-w-md w-full border-2 ${s()}`,children:[v.jsxs("div",{className:`bg-gradient-to-r ${s()} px-6 py-4 rounded-t-2xl flex items-center justify-between`,children:[v.jsxs("div",{className:"flex items-center gap-3",children:[i(),v.jsxs("div",{children:[v.jsx("h2",{className:"text-xl font-bold text-gray-800",children:e.title}),v.jsx("p",{className:"text-xs text-gray-600 mt-0.5",children:"돌발 이벤트"})]})]}),v.jsx("button",{onClick:n,className:"p-1.5 hover:bg-white/20 rounded-lg transition-colors",children:v.jsx(Dl,{className:"w-5 h-5 text-gray-700"})})]}),v.jsxs("div",{className:"px-6 py-5",children:[v.jsx("p",{className:"text-gray-700 leading-relaxed mb-4",children:e.message}),!e.choices&&v.jsx("div",{className:"bg-gray-50 rounded-lg p-3 mb-4",children:v.jsxs("div",{className:"flex items-center gap-2 text-sm",children:[v.jsx(Bx,{className:"w-4 h-4 text-baseball-green"}),v.jsx("span",{className:"font-semibold text-gray-700",children:"효과:"}),v.jsx("span",{className:"text-gray-600",children:o(e.effect)})]})}),e.choices&&e.choices.length>0&&v.jsxs("div",{className:"space-y-2 mb-4",children:[v.jsx("p",{className:"text-sm font-semibold text-gray-700 mb-2",children:"선택하세요:"}),e.choices.map((l,a)=>v.jsx(pe.button,{whileHover:{scale:1.02,x:5},whileTap:{scale:.98},onClick:()=>{r==null||r(a),n()},className:"w-full text-left px-4 py-3 bg-gradient-to-r from-baseball-green/10 to-baseball-green/5 border-2 border-baseball-green/30 rounded-lg hover:border-baseball-green hover:bg-gradient-to-r hover:from-baseball-green/20 hover:to-baseball-green/10 transition-all",children:v.jsxs("div",{className:"flex items-center justify-between",children:[v.jsx("span",{className:"font-semibold text-gray-800",children:l.label}),v.jsx("div",{className:"text-xs text-gray-600 bg-white/50 px-2 py-1 rounded",children:o(l.effect)})]})},a))]}),!e.choices&&v.jsx(pe.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:n,className:"w-full px-4 py-3 bg-gradient-to-r from-baseball-green to-[#0a3528] text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all",children:"확인"})]})]})})]})})}const ho=(e,t)=>Math.floor(e*Math.pow(1.5,t-1)),Gr=[{type:"training",name:"훈련장",level:1,maxLevel:5,upgradeCost:e=>ho(1e9,e),effect:e=>({description:`선수 경험치 획득량 +${e*10}%`,value:e*10})},{type:"medical",name:"메디컬 센터",level:1,maxLevel:5,upgradeCost:e=>ho(1e9,e),effect:e=>({description:`부상 확률 -${e*5}%, 회복 속도 +${e*10}%`,value:e*5})},{type:"marketing",name:"마케팅 팀",level:1,maxLevel:5,upgradeCost:e=>ho(1e9,e),effect:e=>({description:`경기당 수익 +${e*5}%, 후원금 +${e*3}%`,value:e*5})},{type:"scouting",name:"스카우트 팀",level:1,maxLevel:5,upgradeCost:e=>ho(1e9,e),effect:e=>({description:`높은 등급 선수 발견 확률 +${e*8}%`,value:e*8})}];function rD(){return{training:{...Gr[0]},medical:{...Gr[1]},marketing:{...Gr[2]},scouting:{...Gr[3]}}}const iD={training:Hf,medical:ab,marketing:yb,scouting:xb},sD={training:"선수들의 훈련 효율을 높여 경험치 획득량을 증가시킵니다.",medical:"선수들의 부상 확률을 낮추고 회복 속도를 높입니다.",marketing:"경기 수익과 후원금을 증가시킵니다.",scouting:"더 높은 등급의 유망주를 발견할 확률을 높입니다."};function oD({isOpen:e,onClose:t,facilities:n,budget:r,onUpgrade:i}){if(!e)return null;const s=o=>r!==null&&r>=o;return v.jsx(yr,{children:e&&v.jsxs(v.Fragment,{children:[v.jsx(pe.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:t,className:"fixed inset-0 bg-black/60 backdrop-blur-sm z-50"}),v.jsx(pe.div,{initial:{opacity:0,scale:.95,y:20},animate:{opacity:1,scale:1,y:0},exit:{opacity:0,scale:.95,y:20},transition:{type:"spring",damping:25,stiffness:300},className:"fixed inset-0 z-50 flex items-center justify-center p-4",onClick:o=>o.stopPropagation(),children:v.jsxs("div",{className:"bg-white rounded-2xl shadow-2xl max-w-2xl w-full border-2 border-baseball-green/20 max-h-[90vh] overflow-hidden flex flex-col",children:[v.jsxs("div",{className:"bg-gradient-to-r from-baseball-green to-[#0a3528] px-6 py-4 flex items-center justify-between",children:[v.jsxs("div",{className:"flex items-center gap-3",children:[v.jsx(Hf,{className:"w-6 h-6 text-baseball-gold"}),v.jsxs("div",{children:[v.jsx("h2",{className:"text-xl font-bold text-white",children:"구단 시설 관리"}),v.jsx("p",{className:"text-xs text-baseball-gold/80 mt-0.5",children:"시설을 업그레이드하여 팀을 강화하세요"})]})]}),v.jsx("button",{onClick:t,className:"p-1.5 hover:bg-white/20 rounded-lg transition-colors",children:v.jsx(Dl,{className:"w-5 h-5 text-white"})})]}),v.jsx("div",{className:"flex-1 overflow-y-auto px-6 py-5",children:v.jsx("div",{className:"space-y-4",children:Object.keys(n).map(o=>{const l=n[o],a=Gr.find(m=>m.type===o),u=a.effect(l.level),c=l.level<a.maxLevel?a.effect(l.level+1):null,f=a.upgradeCost(l.level),d=l.level<a.maxLevel&&s(f),h=iD[o];return v.jsxs(pe.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:Object.keys(n).indexOf(o)*.1},className:"bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl p-5 hover:border-baseball-green/30 transition-all",children:[v.jsxs("div",{className:"flex items-start justify-between mb-3",children:[v.jsxs("div",{className:"flex items-center gap-3",children:[v.jsx("div",{className:"p-2 bg-baseball-green/10 rounded-lg",children:v.jsx(h,{className:"w-6 h-6 text-baseball-green"})}),v.jsxs("div",{children:[v.jsx("h3",{className:"font-bold text-lg text-gray-800",children:a.name}),v.jsx("p",{className:"text-xs text-gray-600 mt-0.5",children:sD[o]})]})]}),v.jsxs("div",{className:"text-right",children:[v.jsxs("div",{className:"text-sm font-semibold text-baseball-green",children:["Lv.",l.level," / ",a.maxLevel]}),l.level<a.maxLevel&&v.jsxs("div",{className:"text-xs text-gray-500 mt-1",children:["다음 레벨: Lv.",l.level+1]})]})]}),v.jsx("div",{className:"bg-white rounded-lg p-3 mb-3 border border-gray-200",children:v.jsxs("div",{className:"flex items-center gap-2 text-sm",children:[v.jsx(Bx,{className:"w-4 h-4 text-baseball-green"}),v.jsx("span",{className:"font-semibold text-gray-700",children:"현재 효과:"}),v.jsx("span",{className:"text-gray-600",children:u.description})]})}),c&&v.jsx("div",{className:"bg-baseball-green/5 rounded-lg p-3 mb-3 border border-baseball-green/20",children:v.jsxs("div",{className:"flex items-center gap-2 text-sm",children:[v.jsx(zx,{className:"w-4 h-4 text-baseball-green"}),v.jsx("span",{className:"font-semibold text-baseball-green",children:"다음 레벨 효과:"}),v.jsx("span",{className:"text-gray-700",children:c.description})]})}),l.level<a.maxLevel?v.jsx(pe.button,{whileHover:{scale:1.02},whileTap:{scale:.98},onClick:()=>d&&i(o),disabled:!d,className:`w-full px-4 py-3 rounded-lg font-bold transition-all ${d?"bg-gradient-to-r from-baseball-green to-[#0a3528] text-white shadow-lg hover:shadow-xl":"bg-gray-200 text-gray-400 cursor-not-allowed"}`,children:d?v.jsxs("div",{className:"flex items-center justify-between",children:[v.jsx("span",{children:"업그레이드"}),v.jsxs("span",{className:"text-sm",children:[(f/1e8).toFixed(1),"억 원"]})]}):v.jsxs("div",{className:"flex items-center justify-between",children:[v.jsx("span",{children:"자금 부족"}),v.jsxs("span",{className:"text-sm",children:[(f/1e8).toFixed(1),"억 원 필요"]})]})}):v.jsx("div",{className:"w-full px-4 py-3 bg-gray-100 rounded-lg text-center text-sm font-semibold text-gray-500",children:"최대 레벨 달성"})]},o)})})})]})})]})})}const lD=.3;function aD(){const[e,t]=I.useState(lD),[n,r]=I.useState(!1),i=(a,u)=>{const c=new(window.AudioContext||window.webkitAudioContext),f=c.createOscillator(),d=c.createGain();f.connect(d),d.connect(c.destination),f.frequency.value=a,f.type="sine",d.gain.setValueAtTime(n?0:e,c.currentTime),d.gain.exponentialRampToValueAtTime(.01,c.currentTime+u),f.start(c.currentTime),f.stop(c.currentTime+u)};return{playSound:a=>{if(!n)try{const u={click:()=>i(800,.1),swoosh:()=>i(400,.2),success:()=>i(1e3,.15),error:()=>i(200,.2),coin:()=>i(1200,.1)};u[a]&&u[a]()}catch(u){console.warn("사운드 재생 실패:",u)}},volume:e,setVolume:a=>{const u=Math.max(0,Math.min(1,a));t(u)},isMuted:n,toggleMute:()=>{r(!n)}}}const uD=[{id:"sponsor-1",type:"positive",title:"지역 기업 후원",message:"지역 유지와의 저녁 식사가 성공적으로 끝났습니다. 기업이 팀에 후원금을 제공하기로 결정했습니다.",effect:{budget:3e8}},{id:"fan-service-1",type:"positive",title:"유튜브 콘텐츠 대박",message:"팀의 유튜브 콘텐츠가 대박이 났습니다! 팬들의 관심이 급증했습니다.",effect:{fanLoyalty:15,morale:10}},{id:"player-breakthrough-1",type:"positive",title:"선수 돌파구",message:"젊은 유망주가 훈련에서 놀라운 성장을 보였습니다. 팀 전체의 사기가 올라갔습니다.",effect:{morale:20,playerCondition:10}},{id:"media-praise-1",type:"positive",title:"언론 찬사",message:"언론에서 팀의 전술과 선수 육성을 극찬했습니다. 팬들의 지지가 높아졌습니다.",effect:{fanLoyalty:10,morale:15}},{id:"injury-1",type:"negative",title:"주전 선수 부상",message:"훈련 도중 주전 투수가 발목을 삐끗했습니다. 컨디션이 크게 하락했습니다.",effect:{playerCondition:-20,morale:-10}},{id:"conflict-1",type:"negative",title:"선수단 내부 불화",message:"선수단 내부에 불화설이 돌고 있습니다. 팀 사기가 크게 떨어졌습니다.",effect:{morale:-20}},{id:"media-criticism-1",type:"negative",title:"언론 비판",message:"언론에서 팀의 전술과 운영을 강하게 비판했습니다. 팬들의 실망이 커졌습니다.",effect:{fanLoyalty:-15,morale:-10}},{id:"financial-loss-1",type:"negative",title:"예상치 못한 지출",message:"구장 시설에 예상치 못한 문제가 발생했습니다. 긴급 수리가 필요합니다.",effect:{budget:-2e8}},{id:"player-request-1",type:"choice",title:"선수 요청",message:"주전 선수가 개인 트레이너 고용을 요청했습니다. 어떻게 하시겠습니까?",choices:[{label:"승인 (자금 -1억, 사기 +15)",effect:{budget:-1e8,morale:15}},{label:"거절 (사기 -10)",effect:{morale:-10}}]},{id:"fan-event-1",type:"choice",title:"팬 이벤트 제안",message:"팬클럽에서 대규모 팬 이벤트를 제안했습니다. 개최하시겠습니까?",choices:[{label:"개최 (자금 -0.5억, 팬 충성도 +20)",effect:{budget:-5e7,fanLoyalty:20}},{label:"거절 (팬 충성도 -5)",effect:{fanLoyalty:-5}}]},{id:"scout-offer-1",type:"choice",title:"스카우트 제안",message:"해외 리그에서 뛰어난 스카우트가 합류를 제안했습니다. 영입하시겠습니까?",choices:[{label:"영입 (자금 -2억, 스카우트 능력 향상)",effect:{budget:-2e8}},{label:"거절",effect:{}}]}],cD=.15;function fD({apiKey:e,selectedTeam:t,onResetApiKey:n}){var Kn;const[r,i]=I.useState([]),[s,o]=I.useState(""),[l,a]=I.useState(!1),[u,c]=I.useState(""),[f,d]=I.useState([]),[h,m]=I.useState({date:null,budget:null,morale:50,fanLoyalty:50}),[x,C]=I.useState("MAIN_GAME"),[p,g]=I.useState(null),[y,b]=I.useState(null),[T,k]=I.useState(!1),[A,P]=I.useState(null),[O,E]=I.useState(!1),[L,j]=I.useState(!1),[K,J]=I.useState(rD()),B=I.useRef(null),oe=I.useRef(null),H=I.useRef(null),{playSound:M}=aD();I.useEffect(()=>{e?(H.current=rT(e),oe.current=null,k(!0)):k(!1)},[e]),I.useEffect(()=>{if(t&&r.length===0&&T&&H.current){const V=`${t.fullName}을 선택했습니다. 게임을 시작해주세요.`,ne=setTimeout(()=>{z(V)},300);return()=>clearTimeout(ne)}},[t,T,r.length]),I.useEffect(()=>{var V;(V=B.current)==null||V.scrollIntoView({behavior:"smooth"})},[r,u]),I.useEffect(()=>{const V=r.filter(ne=>!ne.isUser);if(V.length>0){const ne=V[V.length-1],ee=tr(ne.text),ye=Wm(ee.text);ye&&m(Oe=>({...Oe,date:ye}));const G=Km(ee.text);console.log("[자금 파싱] 원본 텍스트:",ne.text.substring(0,200)),console.log("[자금 파싱] 파싱된 텍스트:",ee.text.substring(0,200)),console.log("[자금 파싱] 추출된 자금:",G),G!==null&&G>0?(console.log("[자금 파싱] ✅ 자금 업데이트:",G.toLocaleString("ko-KR")+"원"),m(Oe=>({...Oe,budget:G}))):console.log("[자금 파싱] ❌ 자금 추출 실패 또는 0원")}},[r]),I.useEffect(()=>{if(u){const V=tr(u),ne=Wm(V.text);ne&&m(ye=>({...ye,date:ne}));const ee=Km(V.text);console.log("[자금 파싱 - 스트리밍] 원본 텍스트:",u.substring(0,200)),console.log("[자금 파싱 - 스트리밍] 파싱된 텍스트:",V.text.substring(0,200)),console.log("[자금 파싱 - 스트리밍] 추출된 자금:",ee),ee!==null&&ee>0?(console.log("[자금 파싱 - 스트리밍] ✅ 자금 업데이트:",ee.toLocaleString("ko-KR")+"원"),m(ye=>({...ye,budget:ee}))):console.log("[자금 파싱 - 스트리밍] ❌ 자금 추출 실패 또는 0원")}},[u]);const z=async V=>{var ee,ye;if(!V.trim()||l)return;M("click");const ne=V.trim();o(""),i(G=>[...G,{text:ne,isUser:!0}]),a(!0),c(""),d([]);try{if(!H.current)throw new Error("모델이 초기화되지 않았습니다.");if(!oe.current){const $t=r.length>1?r.slice(1,-1).map(Ht=>({role:Ht.isUser?"user":"model",parts:[{text:Ht.text}]})):[];oe.current=H.current.startChat({history:$t})}const G=await oe.current.sendMessageStream(ne);let Oe="";try{for await(const je of G.stream)try{const Me=je.text();if(Me){Oe+=Me,c(Oe);const Yn=tr(Oe);Yn.options.length>0&&d(Yn.options)}}catch(Me){console.warn("Chunk 처리 오류:",Me)}const Ht=(await G.response).text();if(Ht&&Ht!==Oe&&(Oe=Ht,c(Oe)),Oe){const je=tr(Oe);i(Me=>[...Me,{text:je.text,isUser:!1}]),d(je.options),je.guiEvent?(console.log("[GUI_EVENT] 수신:",je.guiEvent),((ee=je.guiEvent.data)==null?void 0:ee.players)&&Array.isArray(je.guiEvent.data.players)&&je.guiEvent.data.players.length>0?(g(je.guiEvent),C("EVENT_MODAL"),M("swoosh")):(console.warn("[GUI_EVENT] players 데이터가 없거나 비어있음:",je.guiEvent),M("success"))):M("success")}else throw new Error("응답을 받을 수 없었습니다.")}catch($t){console.error("스트리밍 오류:",$t);try{const je=(await G.response).text();if(je){const Me=tr(je);i(Yn=>[...Yn,{text:Me.text,isUser:!1}]),d(Me.options),Me.guiEvent&&(console.log("[GUI_EVENT] 수신:",Me.guiEvent),((ye=Me.guiEvent.data)==null?void 0:ye.players)&&Array.isArray(Me.guiEvent.data.players)&&Me.guiEvent.data.players.length>0?(g(Me.guiEvent),C("EVENT_MODAL")):console.warn("[GUI_EVENT] players 데이터가 없거나 비어있음:",Me.guiEvent))}else throw $t}catch{throw $t}}finally{c("")}}catch(G){console.error("Error:",G);const Oe=(G==null?void 0:G.message)||(G==null?void 0:G.toString())||"알 수 없는 오류";i($t=>[...$t,{text:`오류가 발생했습니다: ${Oe}

API 키와 인터넷 연결을 확인해주세요.`,isUser:!1}]),c(""),d([])}finally{a(!1)}},w=V=>{V.preventDefault(),z(s)},q=V=>{if(M("click"),(V.includes("다음")||V.includes("진행")||V.includes("하루")||V.includes("일정"))&&Math.random()<cD){const ne=uD,ee=Math.floor(Math.random()*ne.length),ye={...ne[ee]};P(ye),E(!0),M("swoosh")}z(V)},ie=V=>{m(ne=>{const ee={...ne};if(V.budget!==void 0&&ee.budget!==null){const ye=ee.budget;ee.budget=Math.max(0,ee.budget+V.budget);const G=ee.budget-ye;G!==0&&console.log(`[랜덤 이벤트] 자금 변동: ${G>0?"+":""}${(G/1e8).toFixed(1)}억 원`)}if(V.morale!==void 0){const ye=ee.morale;ee.morale=Math.max(0,Math.min(100,ee.morale+V.morale));const G=ee.morale-ye;G!==0&&console.log(`[랜덤 이벤트] 팀 사기 변동: ${G>0?"+":""}${G}`)}if(V.fanLoyalty!==void 0){const ye=ee.fanLoyalty;ee.fanLoyalty=Math.max(0,Math.min(100,ee.fanLoyalty+V.fanLoyalty));const G=ee.fanLoyalty-ye;G!==0&&console.log(`[랜덤 이벤트] 팬 충성도 변동: ${G>0?"+":""}${G}`)}return ee})},S=V=>{if(A&&A.choices&&A.choices[V]){const ne=A.choices[V];ie(ne.effect)}},Ee=()=>{A&&!A.choices&&ie(A.effect),E(!1),P(null)},ct=V=>{const ne=K[V],ee=Gr.find(G=>G.type===V);if(ne.level>=ee.maxLevel)return;const ye=ee.upgradeCost(ne.level);h.budget!==null&&h.budget>=ye&&(m(G=>({...G,budget:G.budget-ye})),J(G=>({...G,[V]:{...G[V],level:G[V].level+1}})),M("coin"))},le=V=>{M("coin");const ne=`${V.name} 선수 선택`;C("NEGOTIATION"),b(V.name),z(ne)},wt=V=>{const ne=`${y} 선수에게 ${V.toLocaleString()}원 제시`;C("MAIN_GAME"),b(null),z(ne)},Ut=()=>{C("MAIN_GAME"),g(null)},en=r.filter(V=>!V.isUser).slice(-1)[0],tn=u?f:en?tr(en.text).options:[];return v.jsxs("div",{className:"flex flex-col h-screen bg-[#Fdfbf7]",children:[v.jsx(iT,{teamName:t.fullName,budget:h.budget,date:h.date,season:"2026 시즌",onApiKeyClick:n,onFacilityClick:()=>j(!0)}),v.jsx("div",{className:"flex-1 overflow-y-auto px-2 sm:px-4 py-4 sm:py-6",children:v.jsxs("div",{className:"max-w-5xl mx-auto w-full",children:[r.map((V,ne)=>v.jsx(Ym,{message:V.text,isUser:V.isUser},ne)),u&&v.jsx(Ym,{message:u,isUser:!1,isStreaming:!0}),v.jsx("div",{ref:B})]})}),v.jsxs("div",{className:"border-t-2 border-baseball-green/20 bg-gradient-to-b from-gray-50 to-white shadow-2xl",children:[tn.length>0&&!l&&v.jsxs(pe.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3},className:"px-4 pt-4 pb-3 border-b-2 border-baseball-green/10 bg-gradient-to-r from-baseball-green/5 to-transparent",children:[v.jsxs("div",{className:"flex items-center gap-2 mb-3",children:[v.jsx("div",{className:"w-1 h-4 bg-baseball-green rounded-full"}),v.jsx("span",{className:"text-xs font-bold text-baseball-green uppercase tracking-wider",children:"작전 지시"})]}),v.jsx("div",{className:"flex flex-wrap gap-2.5",children:tn.map((V,ne)=>v.jsx(pe.button,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{delay:ne*.05,duration:.2},whileHover:{scale:1.05,y:-2},whileTap:{scale:.98},onClick:()=>q(V.value),disabled:l,className:"px-5 py-2.5 bg-gradient-to-r from-white to-gray-50 border-2 border-baseball-green/30 hover:border-baseball-green hover:bg-gradient-to-r hover:from-baseball-green/10 hover:to-baseball-green/5 disabled:bg-gray-200 disabled:border-gray-200 disabled:cursor-not-allowed text-baseball-green text-sm font-bold rounded-lg transition-all shadow-md hover:shadow-lg active:shadow-sm",children:V.label},ne))})]}),v.jsx("form",{onSubmit:w,className:"p-4",children:v.jsxs("div",{className:"flex gap-3 max-w-5xl mx-auto",children:[v.jsx(pe.input,{whileFocus:{scale:1.01},type:"text",value:s,onChange:V=>o(V.target.value),placeholder:"명령을 입력하세요...",className:"flex-1 px-5 py-3 border-2 border-baseball-green/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-baseball-green/50 focus:border-baseball-green disabled:bg-gray-100 font-sans shadow-sm focus:shadow-md transition-all",disabled:l}),v.jsx(pe.button,{type:"submit",disabled:l||!s.trim(),whileHover:{scale:1.05,y:-2},whileTap:{scale:.95},className:"px-7 py-3 bg-gradient-to-r from-baseball-green to-[#0a3528] hover:from-baseball-green-dark hover:to-[#08251f] disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl active:shadow-md border-b-2 border-baseball-green-dark/50",children:v.jsx(Vx,{className:"w-5 h-5"})})]})})]}),l&&v.jsx(XR,{}),v.jsx(yr,{children:x==="EVENT_MODAL"&&p&&v.jsx(eD,{isOpen:!0,type:p.type,title:p.type==="DRAFT"?"신인 드래프트":p.type==="FA"?"FA 시장":"트레이드 제안",players:((Kn=p.data)==null?void 0:Kn.players)||[],onSelect:le,onClose:Ut})}),v.jsx(yr,{children:x==="NEGOTIATION"&&y&&v.jsx(tD,{playerName:y,onSubmit:wt,onClose:()=>{C("MAIN_GAME"),b(null)}})}),v.jsx(nD,{event:A,isOpen:O,onClose:Ee,onChoiceSelect:S}),v.jsx(oD,{isOpen:L,onClose:()=>j(!1),facilities:K,budget:h.budget,onUpgrade:ct})]})}function dD(){const[e,t]=I.useState(""),[n,r]=I.useState(!0),[i,s]=I.useState("TEAM_SELECTION"),[o,l]=I.useState(null);I.useEffect(()=>{const f=localStorage.getItem("gemini_api_key");f&&(t(f),r(!1))},[]);const a=f=>{localStorage.setItem("gemini_api_key",f),t(f),r(!1)},u=()=>{localStorage.removeItem("gemini_api_key"),t(""),r(!0),s("TEAM_SELECTION"),l(null)},c=f=>{l(f),s("MAIN_GAME")};return v.jsx("div",{className:"min-h-screen bg-[#F5F7FA]",children:v.jsx(yr,{mode:"wait",children:n?v.jsx(Cb,{onApiKeySet:a},"api-key-modal"):i==="TEAM_SELECTION"?v.jsx(Eb,{onSelect:c},"team-selector"):o?v.jsx(fD,{apiKey:e,selectedTeam:o,onResetApiKey:u},"chat-interface"):null})})}Ua.createRoot(document.getElementById("root")).render(v.jsx(Mi.StrictMode,{children:v.jsx(dD,{})}));
