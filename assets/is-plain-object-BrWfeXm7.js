import{g as n}from"./index-BBkUAzwr.js";import{_ as c,a as i,i as s}from"./_baseToString-BV3LLLfG.js";var f=c,u=i,p=s,l="[object Object]",b=Function.prototype,j=Object.prototype,a=b.toString,O=j.hasOwnProperty,P=a.call(Object);function g(t){if(!p(t)||f(t)!=l)return!1;var e=u(t);if(e===null)return!0;var r=O.call(e,"constructor")&&e.constructor;return typeof r=="function"&&r instanceof r&&a.call(r)==P}var y=g;const _=n(y);/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */function o(t){return Object.prototype.toString.call(t)==="[object Object]"}function S(t){var e,r;return o(t)===!1?!1:(e=t.constructor,e===void 0?!0:(r=e.prototype,!(o(r)===!1||r.hasOwnProperty("isPrototypeOf")===!1)))}export{_ as a,S as i};
