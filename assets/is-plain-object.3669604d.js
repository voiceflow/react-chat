import{_ as a,r as c,a as i}from"./_baseToString.b9e23acf.js";var s=a,f=c,u=i,p="[object Object]",b=Function.prototype,l=Object.prototype,n=b.toString,j=l.hasOwnProperty,O=n.call(Object);function y(t){if(!u(t)||s(t)!=p)return!1;var e=f(t);if(e===null)return!0;var r=j.call(e,"constructor")&&e.constructor;return typeof r=="function"&&r instanceof r&&n.call(r)==O}var g=y;/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */function o(t){return Object.prototype.toString.call(t)==="[object Object]"}function v(t){var e,r;return o(t)===!1?!1:(e=t.constructor,e===void 0?!0:(r=e.prototype,!(o(r)===!1||r.hasOwnProperty("isPrototypeOf")===!1)))}export{g as a,v as i};
