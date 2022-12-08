(function ($hx_exports, $global) { "use strict";
$hx_exports["algos"] = $hx_exports["algos"] || {};
$hx_exports["dungen"] = $hx_exports["dungen"] || {};
var $hxClasses = {},$estr = function() { return js_Boot.__string_rec(this,''); },$hxEnums = $hxEnums || {},$_;
class EReg {
	constructor(r,opt) {
		this.r = new RegExp(r,opt.split("u").join(""));
	}
	match(s) {
		if(this.r.global) {
			this.r.lastIndex = 0;
		}
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	matched(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) {
			return this.r.m[n];
		} else {
			throw haxe_Exception.thrown("EReg::matched");
		}
	}
	matchedLeft() {
		if(this.r.m == null) {
			throw haxe_Exception.thrown("No string matched");
		}
		return HxOverrides.substr(this.r.s,0,this.r.m.index);
	}
	matchedRight() {
		if(this.r.m == null) {
			throw haxe_Exception.thrown("No string matched");
		}
		let sz = this.r.m.index + this.r.m[0].length;
		return HxOverrides.substr(this.r.s,sz,this.r.s.length - sz);
	}
	matchedPos() {
		if(this.r.m == null) {
			throw haxe_Exception.thrown("No string matched");
		}
		return { pos : this.r.m.index, len : this.r.m[0].length};
	}
	matchSub(s,pos,len) {
		if(len == null) {
			len = -1;
		}
		if(this.r.global) {
			this.r.lastIndex = pos;
			this.r.m = this.r.exec(len < 0 ? s : HxOverrides.substr(s,0,pos + len));
			let b = this.r.m != null;
			if(b) {
				this.r.s = s;
			}
			return b;
		} else {
			let b = this.match(len < 0 ? HxOverrides.substr(s,pos,null) : HxOverrides.substr(s,pos,len));
			if(b) {
				this.r.s = s;
				this.r.m.index += pos;
			}
			return b;
		}
	}
	split(s) {
		let d = "#__delim__#";
		return s.replace(this.r,d).split(d);
	}
	replace(s,by) {
		return s.replace(this.r,by);
	}
	map(s,f) {
		let offset = 0;
		let buf_b = "";
		while(true) {
			if(offset >= s.length) {
				break;
			} else if(!this.matchSub(s,offset)) {
				buf_b += Std.string(HxOverrides.substr(s,offset,null));
				break;
			}
			let p = this.matchedPos();
			buf_b += Std.string(HxOverrides.substr(s,offset,p.pos - offset));
			buf_b += Std.string(f(this));
			if(p.len == 0) {
				buf_b += Std.string(HxOverrides.substr(s,p.pos,1));
				offset = p.pos + 1;
			} else {
				offset = p.pos + p.len;
			}
			if(!this.r.global) {
				break;
			}
		}
		if(!this.r.global && offset > 0 && offset < s.length) {
			buf_b += Std.string(HxOverrides.substr(s,offset,null));
		}
		return buf_b;
	}
	static escape(s) {
		return s.replace(EReg.escapeRe,"\\$&");
	}
}
$hxClasses["EReg"] = EReg;
EReg.__name__ = "EReg";
Object.assign(EReg.prototype, {
	__class__: EReg
	,r: null
});
class EnumValue {
	static match(this1,pattern) {
		return false;
	}
}
class HxOverrides {
	static dateStr(date) {
		let m = date.getMonth() + 1;
		let d = date.getDate();
		let h = date.getHours();
		let mi = date.getMinutes();
		let s = date.getSeconds();
		return date.getFullYear() + "-" + (m < 10 ? "0" + m : "" + m) + "-" + (d < 10 ? "0" + d : "" + d) + " " + (h < 10 ? "0" + h : "" + h) + ":" + (mi < 10 ? "0" + mi : "" + mi) + ":" + (s < 10 ? "0" + s : "" + s);
	}
	static strDate(s) {
		switch(s.length) {
		case 8:
			let k = s.split(":");
			let d = new Date();
			d["setTime"](0);
			d["setUTCHours"](k[0]);
			d["setUTCMinutes"](k[1]);
			d["setUTCSeconds"](k[2]);
			return d;
		case 10:
			let k1 = s.split("-");
			return new Date(k1[0],k1[1] - 1,k1[2],0,0,0);
		case 19:
			let k2 = s.split(" ");
			let y = k2[0].split("-");
			let t = k2[1].split(":");
			return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
		default:
			throw haxe_Exception.thrown("Invalid date format : " + s);
		}
	}
	static cca(s,index) {
		let x = s.charCodeAt(index);
		if(x != x) {
			return undefined;
		}
		return x;
	}
	static substr(s,pos,len) {
		if(len == null) {
			len = s.length;
		} else if(len < 0) {
			if(pos == 0) {
				len = s.length + len;
			} else {
				return "";
			}
		}
		return s.substr(pos,len);
	}
	static indexOf(a,obj,i) {
		let len = a.length;
		if(i < 0) {
			i += len;
			if(i < 0) {
				i = 0;
			}
		}
		while(i < len) {
			if(((a[i]) === obj)) {
				return i;
			}
			++i;
		}
		return -1;
	}
	static lastIndexOf(a,obj,i) {
		let len = a.length;
		if(i >= len) {
			i = len - 1;
		} else if(i < 0) {
			i += len;
		}
		while(i >= 0) {
			if(((a[i]) === obj)) {
				return i;
			}
			--i;
		}
		return -1;
	}
	static remove(a,obj) {
		let i = a.indexOf(obj);
		if(i == -1) {
			return false;
		}
		a.splice(i,1);
		return true;
	}
	static iter(a) {
		return { cur : 0, arr : a, hasNext : function() {
			return this.cur < this.arr.length;
		}, next : function() {
			return this.arr[this.cur++];
		}};
	}
	static keyValueIter(a) {
		return new haxe_iterators_ArrayKeyValueIterator(a);
	}
	static now() {
		return Date.now();
	}
}
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = "HxOverrides";
class IntIterator {
	constructor(min,max) {
		this.min = min;
		this.max = max;
	}
	hasNext() {
		return this.min < this.max;
	}
	next() {
		return this.min++;
	}
}
$hxClasses["IntIterator"] = IntIterator;
IntIterator.__name__ = "IntIterator";
Object.assign(IntIterator.prototype, {
	__class__: IntIterator
	,min: null
	,max: null
});
class Lambda {
	static array(it) {
		let a = [];
		let i = $getIterator(it);
		while(i.hasNext()) {
			let i1 = i.next();
			a.push(i1);
		}
		return a;
	}
	static list(it) {
		let l = new haxe_ds_List();
		let i = $getIterator(it);
		while(i.hasNext()) {
			let i1 = i.next();
			l.add(i1);
		}
		return l;
	}
	static map(it,f) {
		let _g = [];
		let x = $getIterator(it);
		while(x.hasNext()) {
			let x1 = x.next();
			_g.push(f(x1));
		}
		return _g;
	}
	static mapi(it,f) {
		let i = 0;
		let _g = [];
		let x = $getIterator(it);
		while(x.hasNext()) {
			let x1 = x.next();
			_g.push(f(i++,x1));
		}
		return _g;
	}
	static flatten(it) {
		let _g = [];
		let e = $getIterator(it);
		while(e.hasNext()) {
			let e1 = e.next();
			let x = $getIterator(e1);
			while(x.hasNext()) {
				let x1 = x.next();
				_g.push(x1);
			}
		}
		return _g;
	}
	static flatMap(it,f) {
		let _g = [];
		let x = $getIterator(it);
		while(x.hasNext()) {
			let x1 = x.next();
			_g.push(f(x1));
		}
		let _g1 = [];
		let e = $getIterator(_g);
		while(e.hasNext()) {
			let e1 = e.next();
			let x = $getIterator(e1);
			while(x.hasNext()) {
				let x1 = x.next();
				_g1.push(x1);
			}
		}
		return _g1;
	}
	static has(it,elt) {
		let x = $getIterator(it);
		while(x.hasNext()) {
			let x1 = x.next();
			if(x1 == elt) {
				return true;
			}
		}
		return false;
	}
	static exists(it,f) {
		let x = $getIterator(it);
		while(x.hasNext()) {
			let x1 = x.next();
			if(f(x1)) {
				return true;
			}
		}
		return false;
	}
	static foreach(it,f) {
		let x = $getIterator(it);
		while(x.hasNext()) {
			let x1 = x.next();
			if(!f(x1)) {
				return false;
			}
		}
		return true;
	}
	static iter(it,f) {
		let x = $getIterator(it);
		while(x.hasNext()) {
			let x1 = x.next();
			f(x1);
		}
	}
	static filter(it,f) {
		let _g = [];
		let x = $getIterator(it);
		while(x.hasNext()) {
			let x1 = x.next();
			if(f(x1)) {
				_g.push(x1);
			}
		}
		return _g;
	}
	static fold(it,f,first) {
		let x = $getIterator(it);
		while(x.hasNext()) {
			let x1 = x.next();
			first = f(x1,first);
		}
		return first;
	}
	static foldi(it,f,first) {
		let i = 0;
		let x = $getIterator(it);
		while(x.hasNext()) {
			let x1 = x.next();
			first = f(x1,first,i);
			++i;
		}
		return first;
	}
	static count(it,pred) {
		let n = 0;
		if(pred == null) {
			let _ = $getIterator(it);
			while(_.hasNext()) {
				let _1 = _.next();
				++n;
			}
		} else {
			let x = $getIterator(it);
			while(x.hasNext()) {
				let x1 = x.next();
				if(pred(x1)) {
					++n;
				}
			}
		}
		return n;
	}
	static empty(it) {
		return !$getIterator(it).hasNext();
	}
	static indexOf(it,v) {
		let i = 0;
		let v2 = $getIterator(it);
		while(v2.hasNext()) {
			let v21 = v2.next();
			if(v == v21) {
				return i;
			}
			++i;
		}
		return -1;
	}
	static find(it,f) {
		let v = $getIterator(it);
		while(v.hasNext()) {
			let v1 = v.next();
			if(f(v1)) {
				return v1;
			}
		}
		return null;
	}
	static findIndex(it,f) {
		let i = 0;
		let v = $getIterator(it);
		while(v.hasNext()) {
			let v1 = v.next();
			if(f(v1)) {
				return i;
			}
			++i;
		}
		return -1;
	}
	static concat(a,b) {
		let l = [];
		let x = $getIterator(a);
		while(x.hasNext()) {
			let x1 = x.next();
			l.push(x1);
		}
		let x1 = $getIterator(b);
		while(x1.hasNext()) {
			let x = x1.next();
			l.push(x);
		}
		return l;
	}
}
$hxClasses["Lambda"] = Lambda;
Lambda.__name__ = "Lambda";
Math.__name__ = "Math";
class Reflect {
	static hasField(o,field) {
		return Object.prototype.hasOwnProperty.call(o,field);
	}
	static field(o,field) {
		try {
			return o[field];
		} catch( _g ) {
			haxe_NativeStackTrace.lastError = _g;
			return null;
		}
	}
	static setField(o,field,value) {
		o[field] = value;
	}
	static getProperty(o,field) {
		let tmp;
		if(o == null) {
			return null;
		} else {
			let tmp1;
			if(o.__properties__) {
				tmp = o.__properties__["get_" + field];
				tmp1 = tmp;
			} else {
				tmp1 = false;
			}
			if(tmp1) {
				return o[tmp]();
			} else {
				return o[field];
			}
		}
	}
	static setProperty(o,field,value) {
		let tmp;
		let tmp1;
		if(o.__properties__) {
			tmp = o.__properties__["set_" + field];
			tmp1 = tmp;
		} else {
			tmp1 = false;
		}
		if(tmp1) {
			o[tmp](value);
		} else {
			o[field] = value;
		}
	}
	static callMethod(o,func,args) {
		return func.apply(o,args);
	}
	static fields(o) {
		let a = [];
		if(o != null) {
			let hasOwnProperty = Object.prototype.hasOwnProperty;
			for( var f in o ) {
			if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) {
				a.push(f);
			}
			}
		}
		return a;
	}
	static isFunction(f) {
		if(typeof(f) == "function") {
			return !(f.__name__ || f.__ename__);
		} else {
			return false;
		}
	}
	static compare(a,b) {
		if(a == b) {
			return 0;
		} else if(a > b) {
			return 1;
		} else {
			return -1;
		}
	}
	static compareMethods(f1,f2) {
		if(f1 == f2) {
			return true;
		}
		if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) {
			return false;
		}
		if(f1.scope == f2.scope && f1.method == f2.method) {
			return f1.method != null;
		} else {
			return false;
		}
	}
	static isObject(v) {
		if(v == null) {
			return false;
		}
		let t = typeof(v);
		if(!(t == "string" || t == "object" && v.__enum__ == null)) {
			if(t == "function") {
				return (v.__name__ || v.__ename__) != null;
			} else {
				return false;
			}
		} else {
			return true;
		}
	}
	static isEnumValue(v) {
		if(v != null) {
			return v.__enum__ != null;
		} else {
			return false;
		}
	}
	static deleteField(o,field) {
		if(!Object.prototype.hasOwnProperty.call(o,field)) {
			return false;
		}
		delete(o[field]);
		return true;
	}
	static copy(o) {
		if(o == null) {
			return null;
		}
		let o2 = { };
		let _g = 0;
		let _g1 = Reflect.fields(o);
		while(_g < _g1.length) {
			let f = _g1[_g];
			++_g;
			o2[f] = Reflect.field(o,f);
		}
		return o2;
	}
	static makeVarArgs(f) {
		return function() {
			let a = Array.prototype.slice;
			let a1 = arguments;
			let a2 = a.call(a1);
			return f(a2);
		};
	}
}
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = "Reflect";
class Std {
	static is(v,t) {
		return js_Boot.__instanceof(v,t);
	}
	static isOfType(v,t) {
		return js_Boot.__instanceof(v,t);
	}
	static downcast(value,c) {
		if(js_Boot.__downcastCheck(value,c)) {
			return value;
		} else {
			return null;
		}
	}
	static instance(value,c) {
		if(js_Boot.__downcastCheck(value,c)) {
			return value;
		} else {
			return null;
		}
	}
	static string(s) {
		return js_Boot.__string_rec(s,"");
	}
	static int(x) {
		return x | 0;
	}
	static parseInt(x) {
		if(x != null) {
			let _g = 0;
			let _g1 = x.length;
			while(_g < _g1) {
				let i = _g++;
				let c = x.charCodeAt(i);
				if(c <= 8 || c >= 14 && c != 32 && c != 45) {
					let nc = x.charCodeAt(i + 1);
					let v = parseInt(x,nc == 120 || nc == 88 ? 16 : 10);
					if(isNaN(v)) {
						return null;
					} else {
						return v;
					}
				}
			}
		}
		return null;
	}
	static parseFloat(x) {
		return parseFloat(x);
	}
	static random(x) {
		if(x <= 0) {
			return 0;
		} else {
			return Math.floor(Math.random() * x);
		}
	}
}
$hxClasses["Std"] = Std;
Std.__name__ = "Std";
class StringBuf {
	constructor() {
		this.b = "";
	}
	get_length() {
		return this.b.length;
	}
	add(x) {
		this.b += Std.string(x);
	}
	addChar(c) {
		this.b += String.fromCodePoint(c);
	}
	addSub(s,pos,len) {
		this.b += len == null ? HxOverrides.substr(s,pos,null) : HxOverrides.substr(s,pos,len);
	}
	toString() {
		return this.b;
	}
}
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = "StringBuf";
Object.assign(StringBuf.prototype, {
	__class__: StringBuf
	,b: null
	,__properties__: {get_length: "get_length"}
});
class haxe_SysTools {
	static quoteUnixArg(argument) {
		if(argument == "") {
			return "''";
		}
		if(!new EReg("[^a-zA-Z0-9_@%+=:,./-]","").match(argument)) {
			return argument;
		}
		return "'" + StringTools.replace(argument,"'","'\"'\"'") + "'";
	}
	static quoteWinArg(argument,escapeMetaCharacters) {
		if(!new EReg("^[^ \t\\\\\"]+$","").match(argument)) {
			let result_b = "";
			let needquote = argument.indexOf(" ") != -1 || argument.indexOf("\t") != -1 || argument == "";
			if(needquote) {
				result_b += "\"";
			}
			let bs_buf = new StringBuf();
			let _g = 0;
			let _g1 = argument.length;
			while(_g < _g1) {
				let i = _g++;
				let _g1 = HxOverrides.cca(argument,i);
				if(_g1 == null) {
					let c = _g1;
					if(bs_buf.b.length > 0) {
						result_b += Std.string(bs_buf.b);
						bs_buf = new StringBuf();
					}
					result_b += String.fromCodePoint(c);
				} else {
					switch(_g1) {
					case 34:
						let bs = bs_buf.b;
						result_b += bs == null ? "null" : "" + bs;
						result_b += bs == null ? "null" : "" + bs;
						bs_buf = new StringBuf();
						result_b += "\\\"";
						break;
					case 92:
						bs_buf.b += "\\";
						break;
					default:
						let c = _g1;
						if(bs_buf.b.length > 0) {
							result_b += Std.string(bs_buf.b);
							bs_buf = new StringBuf();
						}
						result_b += String.fromCodePoint(c);
					}
				}
			}
			result_b += Std.string(bs_buf.b);
			if(needquote) {
				result_b += Std.string(bs_buf.b);
				result_b += "\"";
			}
			argument = result_b;
		}
		if(escapeMetaCharacters) {
			let result_b = "";
			let _g = 0;
			let _g1 = argument.length;
			while(_g < _g1) {
				let i = _g++;
				let c = HxOverrides.cca(argument,i);
				if(haxe_SysTools.winMetaCharacters.indexOf(c) >= 0) {
					result_b += String.fromCodePoint(94);
				}
				result_b += String.fromCodePoint(c);
			}
			return result_b;
		} else {
			return argument;
		}
	}
}
$hxClasses["haxe.SysTools"] = haxe_SysTools;
haxe_SysTools.__name__ = "haxe.SysTools";
class StringTools {
	static urlEncode(s) {
		return encodeURIComponent(s);
	}
	static urlDecode(s) {
		return decodeURIComponent(s.split("+").join(" "));
	}
	static htmlEscape(s,quotes) {
		let buf_b = "";
		let _g_offset = 0;
		let _g_s = s;
		while(_g_offset < _g_s.length) {
			let s = _g_s;
			let index = _g_offset++;
			let c = s.charCodeAt(index);
			if(c >= 55296 && c <= 56319) {
				c = c - 55232 << 10 | s.charCodeAt(index + 1) & 1023;
			}
			let c1 = c;
			if(c1 >= 65536) {
				++_g_offset;
			}
			let code = c1;
			switch(code) {
			case 34:
				if(quotes) {
					buf_b += "&quot;";
				} else {
					buf_b += String.fromCodePoint(code);
				}
				break;
			case 38:
				buf_b += "&amp;";
				break;
			case 39:
				if(quotes) {
					buf_b += "&#039;";
				} else {
					buf_b += String.fromCodePoint(code);
				}
				break;
			case 60:
				buf_b += "&lt;";
				break;
			case 62:
				buf_b += "&gt;";
				break;
			default:
				buf_b += String.fromCodePoint(code);
			}
		}
		return buf_b;
	}
	static htmlUnescape(s) {
		return s.split("&gt;").join(">").split("&lt;").join("<").split("&quot;").join("\"").split("&#039;").join("'").split("&amp;").join("&");
	}
	static contains(s,value) {
		return s.includes(value);
	}
	static startsWith(s,start) {
		return s.startsWith(start);
	}
	static endsWith(s,end) {
		return s.endsWith(end);
	}
	static isSpace(s,pos) {
		let c = HxOverrides.cca(s,pos);
		if(!(c > 8 && c < 14)) {
			return c == 32;
		} else {
			return true;
		}
	}
	static ltrim(s) {
		let l = s.length;
		let r = 0;
		while(r < l && StringTools.isSpace(s,r)) ++r;
		if(r > 0) {
			return HxOverrides.substr(s,r,l - r);
		} else {
			return s;
		}
	}
	static rtrim(s) {
		let l = s.length;
		let r = 0;
		while(r < l && StringTools.isSpace(s,l - r - 1)) ++r;
		if(r > 0) {
			return HxOverrides.substr(s,0,l - r);
		} else {
			return s;
		}
	}
	static trim(s) {
		return StringTools.ltrim(StringTools.rtrim(s));
	}
	static lpad(s,c,l) {
		if(c.length <= 0) {
			return s;
		}
		let buf_b = "";
		l -= s.length;
		while(buf_b.length < l) buf_b += c == null ? "null" : "" + c;
		buf_b += s == null ? "null" : "" + s;
		return buf_b;
	}
	static rpad(s,c,l) {
		if(c.length <= 0) {
			return s;
		}
		let buf_b = "";
		buf_b += s == null ? "null" : "" + s;
		while(buf_b.length < l) buf_b += c == null ? "null" : "" + c;
		return buf_b;
	}
	static replace(s,sub,by) {
		return s.split(sub).join(by);
	}
	static hex(n,digits) {
		let s = "";
		let hexChars = "0123456789ABCDEF";
		while(true) {
			s = hexChars.charAt(n & 15) + s;
			n >>>= 4;
			if(!(n > 0)) {
				break;
			}
		}
		if(digits != null) {
			while(s.length < digits) s = "0" + s;
		}
		return s;
	}
	static fastCodeAt(s,index) {
		return s.charCodeAt(index);
	}
	static unsafeCodeAt(s,index) {
		return s.charCodeAt(index);
	}
	static iterator(s) {
		return new haxe_iterators_StringIterator(s);
	}
	static keyValueIterator(s) {
		return new haxe_iterators_StringKeyValueIterator(s);
	}
	static isEof(c) {
		return c != c;
	}
	static quoteUnixArg(argument) {
		if(argument == "") {
			return "''";
		} else if(!new EReg("[^a-zA-Z0-9_@%+=:,./-]","").match(argument)) {
			return argument;
		} else {
			return "'" + StringTools.replace(argument,"'","'\"'\"'") + "'";
		}
	}
	static quoteWinArg(argument,escapeMetaCharacters) {
		let argument1 = argument;
		if(!new EReg("^[^ \t\\\\\"]+$","").match(argument1)) {
			let result_b = "";
			let needquote = argument1.indexOf(" ") != -1 || argument1.indexOf("\t") != -1 || argument1 == "";
			if(needquote) {
				result_b += "\"";
			}
			let bs_buf = new StringBuf();
			let _g = 0;
			let _g1 = argument1.length;
			while(_g < _g1) {
				let i = _g++;
				let _g1 = HxOverrides.cca(argument1,i);
				if(_g1 == null) {
					let c = _g1;
					if(bs_buf.b.length > 0) {
						result_b += Std.string(bs_buf.b);
						bs_buf = new StringBuf();
					}
					result_b += String.fromCodePoint(c);
				} else {
					switch(_g1) {
					case 34:
						let bs = bs_buf.b;
						result_b += Std.string(bs);
						result_b += Std.string(bs);
						bs_buf = new StringBuf();
						result_b += "\\\"";
						break;
					case 92:
						bs_buf.b += "\\";
						break;
					default:
						let c = _g1;
						if(bs_buf.b.length > 0) {
							result_b += Std.string(bs_buf.b);
							bs_buf = new StringBuf();
						}
						result_b += String.fromCodePoint(c);
					}
				}
			}
			result_b += Std.string(bs_buf.b);
			if(needquote) {
				result_b += Std.string(bs_buf.b);
				result_b += "\"";
			}
			argument1 = result_b;
		}
		if(escapeMetaCharacters) {
			let result_b = "";
			let _g = 0;
			let _g1 = argument1.length;
			while(_g < _g1) {
				let i = _g++;
				let c = HxOverrides.cca(argument1,i);
				if(haxe_SysTools.winMetaCharacters.indexOf(c) >= 0) {
					result_b += String.fromCodePoint(94);
				}
				result_b += String.fromCodePoint(c);
			}
			return result_b;
		} else {
			return argument1;
		}
	}
	static utf16CodePointAt(s,index) {
		let c = s.charCodeAt(index);
		if(c >= 55296 && c <= 56319) {
			c = c - 55232 << 10 | s.charCodeAt(index + 1) & 1023;
		}
		return c;
	}
}
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = "StringTools";
var ValueType = $hxEnums["ValueType"] = { __ename__:"ValueType",__constructs__:null
	,TNull: {_hx_name:"TNull",_hx_index:0,__enum__:"ValueType",toString:$estr}
	,TInt: {_hx_name:"TInt",_hx_index:1,__enum__:"ValueType",toString:$estr}
	,TFloat: {_hx_name:"TFloat",_hx_index:2,__enum__:"ValueType",toString:$estr}
	,TBool: {_hx_name:"TBool",_hx_index:3,__enum__:"ValueType",toString:$estr}
	,TObject: {_hx_name:"TObject",_hx_index:4,__enum__:"ValueType",toString:$estr}
	,TFunction: {_hx_name:"TFunction",_hx_index:5,__enum__:"ValueType",toString:$estr}
	,TClass: ($_=function(c) { return {_hx_index:6,c:c,__enum__:"ValueType",toString:$estr}; },$_._hx_name="TClass",$_.__params__ = ["c"],$_)
	,TEnum: ($_=function(e) { return {_hx_index:7,e:e,__enum__:"ValueType",toString:$estr}; },$_._hx_name="TEnum",$_.__params__ = ["e"],$_)
	,TUnknown: {_hx_name:"TUnknown",_hx_index:8,__enum__:"ValueType",toString:$estr}
};
ValueType.__constructs__ = [ValueType.TNull,ValueType.TInt,ValueType.TFloat,ValueType.TBool,ValueType.TObject,ValueType.TFunction,ValueType.TClass,ValueType.TEnum,ValueType.TUnknown];
ValueType.__empty_constructs__ = [ValueType.TNull,ValueType.TInt,ValueType.TFloat,ValueType.TBool,ValueType.TObject,ValueType.TFunction,ValueType.TUnknown];
class Type {
	static getClass(o) {
		return js_Boot.getClass(o);
	}
	static getEnum(o) {
		if(o == null) {
			return null;
		}
		return $hxEnums[o.__enum__];
	}
	static getSuperClass(c) {
		return c.__super__;
	}
	static getClassName(c) {
		return c.__name__;
	}
	static getEnumName(e) {
		return e.__ename__;
	}
	static resolveClass(name) {
		return $hxClasses[name];
	}
	static resolveEnum(name) {
		return $hxEnums[name];
	}
	static createInstance(cl,args) {
		let ctor = Function.prototype.bind.apply(cl,[null].concat(args));
		return new (ctor);
	}
	static createEmptyInstance(cl) {
		return Object.create(cl.prototype);
	}
	static createEnum(e,constr,params) {
		let f = Reflect.field(e,constr);
		if(f == null) {
			throw haxe_Exception.thrown("No such constructor " + constr);
		}
		if(Reflect.isFunction(f)) {
			if(params == null) {
				throw haxe_Exception.thrown("Constructor " + constr + " need parameters");
			}
			return f.apply(e,params);
		}
		if(params != null && params.length != 0) {
			throw haxe_Exception.thrown("Constructor " + constr + " does not need parameters");
		}
		return f;
	}
	static createEnumIndex(e,index,params) {
		let c;
		let _g = e.__constructs__[index];
		if(_g == null) {
			c = null;
		} else {
			let ctor = _g;
			c = ctor._hx_name;
		}
		if(c == null) {
			throw haxe_Exception.thrown(index + " is not a valid enum constructor index");
		}
		return Type.createEnum(e,c,params);
	}
	static getInstanceFields(c) {
		let result = [];
		while(c != null) {
			let _g = 0;
			let _g1 = Object.getOwnPropertyNames(c.prototype);
			while(_g < _g1.length) {
				let name = _g1[_g];
				++_g;
				switch(name) {
				case "__class__":case "__properties__":case "constructor":
					break;
				default:
					if(result.indexOf(name) == -1) {
						result.push(name);
					}
				}
			}
			c = c.__super__;
		}
		return result;
	}
	static getClassFields(c) {
		let a = Object.getOwnPropertyNames(c);
		HxOverrides.remove(a,"__id__");
		HxOverrides.remove(a,"hx__closures__");
		HxOverrides.remove(a,"__name__");
		HxOverrides.remove(a,"__interfaces__");
		HxOverrides.remove(a,"__isInterface__");
		HxOverrides.remove(a,"__properties__");
		HxOverrides.remove(a,"__instanceFields__");
		HxOverrides.remove(a,"__super__");
		HxOverrides.remove(a,"__meta__");
		HxOverrides.remove(a,"prototype");
		HxOverrides.remove(a,"name");
		HxOverrides.remove(a,"length");
		return a;
	}
	static getEnumConstructs(e) {
		let _this = e.__constructs__;
		let result = new Array(_this.length);
		let _g = 0;
		let _g1 = _this.length;
		while(_g < _g1) {
			let i = _g++;
			result[i] = _this[i]._hx_name;
		}
		return result;
	}
	static typeof(v) {
		switch(typeof(v)) {
		case "boolean":
			return ValueType.TBool;
		case "function":
			if(v.__name__ || v.__ename__) {
				return ValueType.TObject;
			}
			return ValueType.TFunction;
		case "number":
			if(Math.ceil(v) == v % 2147483648.0) {
				return ValueType.TInt;
			}
			return ValueType.TFloat;
		case "object":
			if(v == null) {
				return ValueType.TNull;
			}
			let e = v.__enum__;
			if(e != null) {
				return ValueType.TEnum($hxEnums[e]);
			}
			let c = js_Boot.getClass(v);
			if(c != null) {
				return ValueType.TClass(c);
			}
			return ValueType.TObject;
		case "string":
			return ValueType.TClass(String);
		case "undefined":
			return ValueType.TNull;
		default:
			return ValueType.TUnknown;
		}
	}
	static enumEq(a,b) {
		if(a == b) {
			return true;
		}
		try {
			let e = a.__enum__;
			if(e == null || e != b.__enum__) {
				return false;
			}
			if(a._hx_index != b._hx_index) {
				return false;
			}
			let enm = $hxEnums[e];
			let params = enm.__constructs__[a._hx_index].__params__;
			let _g = 0;
			while(_g < params.length) {
				let f = params[_g];
				++_g;
				if(!Type.enumEq(a[f],b[f])) {
					return false;
				}
			}
		} catch( _g ) {
			haxe_NativeStackTrace.lastError = _g;
			return false;
		}
		return true;
	}
	static enumConstructor(e) {
		return $hxEnums[e.__enum__].__constructs__[e._hx_index]._hx_name;
	}
	static enumParameters(e) {
		let enm = $hxEnums[e.__enum__];
		let params = enm.__constructs__[e._hx_index].__params__;
		if(params != null) {
			let _g = [];
			let _g1 = 0;
			while(_g1 < params.length) {
				let p = params[_g1];
				++_g1;
				_g.push(e[p]);
			}
			return _g;
		} else {
			return [];
		}
	}
	static enumIndex(e) {
		return e._hx_index;
	}
	static allEnums(e) {
		return e.__empty_constructs__.slice();
	}
}
$hxClasses["Type"] = Type;
Type.__name__ = "Type";
class UInt {
	static add(a,b) {
		return a + b;
	}
	static div(a,b) {
		return UInt.toFloat(a) / UInt.toFloat(b);
	}
	static mul(a,b) {
		return a * b;
	}
	static sub(a,b) {
		return a - b;
	}
	static gt(a,b) {
		let aNeg = a < 0;
		let bNeg = b < 0;
		if(aNeg != bNeg) {
			return aNeg;
		} else {
			return a > b;
		}
	}
	static gte(a,b) {
		let aNeg = a < 0;
		let bNeg = b < 0;
		if(aNeg != bNeg) {
			return aNeg;
		} else {
			return a >= b;
		}
	}
	static lt(a,b) {
		return UInt.gt(b,a);
	}
	static lte(a,b) {
		return UInt.gte(b,a);
	}
	static and(a,b) {
		return a & b;
	}
	static or(a,b) {
		return a | b;
	}
	static xor(a,b) {
		return a ^ b;
	}
	static shl(a,b) {
		return a << b;
	}
	static shr(a,b) {
		return a >>> b;
	}
	static ushr(a,b) {
		return a >>> b;
	}
	static mod(a,b) {
		return UInt.toFloat(a) % UInt.toFloat(b) | 0;
	}
	static addWithFloat(a,b) {
		return UInt.toFloat(a) + b;
	}
	static mulWithFloat(a,b) {
		return UInt.toFloat(a) * b;
	}
	static divFloat(a,b) {
		return UInt.toFloat(a) / b;
	}
	static floatDiv(a,b) {
		return a / UInt.toFloat(b);
	}
	static subFloat(a,b) {
		return UInt.toFloat(a) - b;
	}
	static floatSub(a,b) {
		return a - UInt.toFloat(b);
	}
	static gtFloat(a,b) {
		return UInt.toFloat(a) > b;
	}
	static equalsInt(a,b) {
		return a == b;
	}
	static notEqualsInt(a,b) {
		return a != b;
	}
	static equalsFloat(a,b) {
		return UInt.toFloat(a) == b;
	}
	static notEqualsFloat(a,b) {
		return UInt.toFloat(a) != b;
	}
	static gteFloat(a,b) {
		return UInt.toFloat(a) >= b;
	}
	static floatGt(a,b) {
		return a > UInt.toFloat(b);
	}
	static floatGte(a,b) {
		return a >= UInt.toFloat(b);
	}
	static ltFloat(a,b) {
		return UInt.toFloat(a) < b;
	}
	static lteFloat(a,b) {
		return UInt.toFloat(a) <= b;
	}
	static floatLt(a,b) {
		return a < UInt.toFloat(b);
	}
	static floatLte(a,b) {
		return a <= UInt.toFloat(b);
	}
	static modFloat(a,b) {
		return UInt.toFloat(a) % b;
	}
	static floatMod(a,b) {
		return a % UInt.toFloat(b);
	}
	static negBits(this1) {
		return ~this1;
	}
	static prefixIncrement(this1) {
		return ++this1;
	}
	static postfixIncrement(this1) {
		return this1++;
	}
	static prefixDecrement(this1) {
		return --this1;
	}
	static postfixDecrement(this1) {
		return this1--;
	}
	static toString(this1,radix) {
		return Std.string(UInt.toFloat(this1));
	}
	static toInt(this1) {
		return this1;
	}
	static toFloat(this1) {
		let int = this1;
		if(int < 0) {
			return 4294967296.0 + int;
		} else {
			return int + 0.0;
		}
	}
}
class dropecho_ds_GraphNode {
	constructor(value,id) {
		this.id = id != null ? id : Std.string(Std.random(10000000));
		this.value = value;
	}
}
$hxClasses["dropecho.ds.GraphNode"] = $hx_exports["GraphNode"] = dropecho_ds_GraphNode;
dropecho_ds_GraphNode.__name__ = "dropecho.ds.GraphNode";
Object.assign(dropecho_ds_GraphNode.prototype, {
	__class__: dropecho_ds_GraphNode
	,id: null
	,value: null
	,graph: null
});
class dropecho_ds_BSPNode extends dropecho_ds_GraphNode {
	constructor(value) {
		super(value);
	}
	createLeft(value) {
		return this.setLeft(new dropecho_ds_BSPNode(value));
	}
	createRight(value) {
		return this.setRight(new dropecho_ds_BSPNode(value));
	}
	setLeft(node) {
		this.left = node;
		node.parent = this;
		this.graph.addNode(node);
		this.graph.addUniEdge(this.id,node.id,"left");
		this.graph.addUniEdge(node.id,this.id,"parent");
		return node;
	}
	setRight(node) {
		this.right = node;
		node.parent = this;
		this.graph.addNode(node);
		this.graph.addUniEdge(this.id,node.id,"right");
		this.graph.addUniEdge(node.id,this.id,"parent");
		return node;
	}
	isLeaf() {
		if(this.right == null) {
			return this.left == null;
		} else {
			return false;
		}
	}
	isRoot() {
		return this.parent == null;
	}
	hasLeft() {
		return this.left != null;
	}
	hasRight() {
		return this.right != null;
	}
}
$hxClasses["dropecho.ds.BSPNode"] = $hx_exports["BSPNode"] = dropecho_ds_BSPNode;
dropecho_ds_BSPNode.__name__ = "dropecho.ds.BSPNode";
dropecho_ds_BSPNode.__super__ = dropecho_ds_GraphNode;
Object.assign(dropecho_ds_BSPNode.prototype, {
	__class__: dropecho_ds_BSPNode
	,parent: null
	,left: null
	,right: null
});
class dropecho_ds_Graph {
	constructor() {
		this.nodes = dropecho_interop_AbstractMap._new();
		this.edges = dropecho_interop_AbstractMap._new();
	}
	createNode(value,id) {
		return this.addNode(new dropecho_ds_GraphNode(value,id));
	}
	addNode(node) {
		this.nodes[Std.string(node.id)] = node;
		node.graph = this;
		return node;
	}
	addUniEdge(fromId,toId,data) {
		if(!Object.prototype.hasOwnProperty.call(this.edges,fromId == null ? "null" : "" + fromId)) {
			let this1 = this.edges;
			let value = dropecho_interop_AbstractMap._new();
			this1[fromId == null ? "null" : "" + fromId] = value;
		}
		this.edges[fromId == null ? "null" : "" + fromId][toId == null ? "null" : "" + toId] = data;
	}
	addBiEdge(nodeId,otherId,data) {
		this.addUniEdge(nodeId,otherId,data);
		this.addUniEdge(otherId,nodeId,data);
	}
	remove(id) {
		let _g = 0;
		let _g1 = this.inNeighborIds(this.nodes[id == null ? "null" : "" + id]);
		while(_g < _g1.length) {
			let n = _g1[_g];
			++_g;
			Reflect.deleteField(this.edges[n == null ? "null" : "" + n],id);
		}
		Reflect.deleteField(this.edges,id);
		Reflect.deleteField(this.nodes,id);
	}
	inNeighbors(node,filter) {
		let _gthis = this;
		let _this = this.inNeighborIds(node,filter);
		let result = new Array(_this.length);
		let _g = 0;
		let _g1 = _this.length;
		while(_g < _g1) {
			let i = _g++;
			let id = _this[i];
			result[i] = _gthis.nodes[id == null ? "null" : "" + id];
		}
		return result;
	}
	inNeighborIds(node,filter) {
		let ids = [];
		let _g = new dropecho_interop_JSAbstractMapKeyValueIterator(this.edges);
		while(_g.hasNext()) {
			let _g1 = _g.next();
			let id = _g1.key;
			let nodeEdges = _g1.value;
			if(Object.prototype.hasOwnProperty.call(nodeEdges,Std.string(node.id))) {
				ids.push(id);
			}
		}
		return ids;
	}
	outNeighbors(node,filter) {
		let _gthis = this;
		let _this = this.outNeighborIds(node,filter);
		let result = new Array(_this.length);
		let _g = 0;
		let _g1 = _this.length;
		while(_g < _g1) {
			let i = _g++;
			let id = _this[i];
			result[i] = _gthis.nodes[id == null ? "null" : "" + id];
		}
		return result;
	}
	outNeighborIds(node,filter) {
		if(!Object.prototype.hasOwnProperty.call(this.edges,Std.string(node.id))) {
			return [];
		}
		let _g = [];
		let _g1 = new dropecho_interop_JSAbstractMapKeyValueIterator(this.edges[Std.string(node.id)]);
		while(_g1.hasNext()) {
			let _g2 = _g1.next();
			let id = _g2.key;
			let data = _g2.value;
			if(filter == null || filter(id,data)) {
				_g.push(id);
			}
		}
		let ids = _g;
		haxe_ds_ArraySort.sort(ids,Reflect.compare);
		return ids;
	}
	neighborIds(node,filter) {
		return this.outNeighborIds(node,filter).concat(this.inNeighborIds(node,filter));
	}
	neighbors(node,filter) {
		return this.outNeighbors(node,filter).concat(this.inNeighbors(node,filter));
	}
	edgeData(fromId,toId) {
		if(Object.prototype.hasOwnProperty.call(this.edges,fromId == null ? "null" : "" + fromId)) {
			let edgefrom = this.edges[fromId == null ? "null" : "" + fromId];
			if(Object.prototype.hasOwnProperty.call(edgefrom,toId == null ? "null" : "" + toId)) {
				return edgefrom[toId == null ? "null" : "" + toId];
			}
		}
		return null;
	}
	toString() {
		let adjList = "\nGraph:\n";
		adjList += "out-Neighbors:\n";
		let access = this.nodes;
		let _g_access = access;
		let _g_keys = Reflect.fields(access);
		let _g_index = 0;
		while(_g_index < _g_keys.length) {
			let node = _g_access[_g_keys[_g_index++]];
			adjList += node.id;
			adjList += "\t-> ";
			let neighbors = this.outNeighbors(node);
			let _g = 0;
			while(_g < neighbors.length) {
				let node = neighbors[_g];
				++_g;
				adjList += node.id;
				if(neighbors.indexOf(node) != neighbors.length - 1) {
					adjList += ",";
				}
			}
			adjList += "\n";
		}
		adjList += "in-Neighbors:\n";
		let access1 = this.nodes;
		let _g1_access = access1;
		let _g1_keys = Reflect.fields(access1);
		let _g1_index = 0;
		while(_g1_index < _g1_keys.length) {
			let node = _g1_access[_g1_keys[_g1_index++]];
			adjList += node.id;
			adjList += "\t-> ";
			let neighbors = this.inNeighbors(node);
			let _g = 0;
			while(_g < neighbors.length) {
				let node = neighbors[_g];
				++_g;
				adjList += node.id;
				if(neighbors.indexOf(node) != neighbors.length - 1) {
					adjList += ",";
				}
			}
			adjList += "\n";
		}
		return adjList;
	}
	toDot() {
		let dot = "digraph {\n";
		let access = this.nodes;
		let _g_access = access;
		let _g_keys = Reflect.fields(access);
		let _g_index = 0;
		while(_g_index < _g_keys.length) {
			let node = _g_access[_g_keys[_g_index++]];
			dot += "\t" + node.id + "\n";
		}
		let access1 = this.nodes;
		let _g1_access = access1;
		let _g1_keys = Reflect.fields(access1);
		let _g1_index = 0;
		while(_g1_index < _g1_keys.length) {
			let node = _g1_access[_g1_keys[_g1_index++]];
			let neighbors = this.outNeighbors(node);
			let _g = 0;
			while(_g < neighbors.length) {
				let n = neighbors[_g];
				++_g;
				dot += "\t" + node.id + " -> " + n.id + "\n";
			}
		}
		dot += "}";
		return dot;
	}
}
$hxClasses["dropecho.ds.Graph"] = $hx_exports["Graph"] = dropecho_ds_Graph;
dropecho_ds_Graph.__name__ = "dropecho.ds.Graph";
Object.assign(dropecho_ds_Graph.prototype, {
	__class__: dropecho_ds_Graph
	,nodes: null
	,edges: null
});
class dropecho_ds_BSPTree extends dropecho_ds_Graph {
	constructor(rootValue) {
		super();
		this.root = new dropecho_ds_BSPNode(rootValue);
		this.addNode(this.root);
	}
	getParent(node) {
		return this.outNeighbors(node,function(id,data) {
			return data == "parent";
		})[0];
	}
	getChildren(node) {
		return this.outNeighbors(node,function(id,data) {
			if(data != "left") {
				return data == "right";
			} else {
				return true;
			}
		});
	}
	getRoot() {
		return this.root;
	}
	getLeafs() {
		let _g = [];
		let access = this.nodes;
		let _g1_access = access;
		let _g1_keys = Reflect.fields(access);
		let _g1_index = 0;
		while(_g1_index < _g1_keys.length) {
			let node = _g1_access[_g1_keys[_g1_index++]];
			let tmp;
			if(this.getChildren(node).length == 0) {
				tmp = node;
			} else {
				continue;
			}
			_g.push(tmp);
		}
		return _g;
	}
}
$hxClasses["dropecho.ds.BSPTree"] = $hx_exports["BSPTree"] = dropecho_ds_BSPTree;
dropecho_ds_BSPTree.__name__ = "dropecho.ds.BSPTree";
dropecho_ds_BSPTree.__super__ = dropecho_ds_Graph;
Object.assign(dropecho_ds_BSPTree.prototype, {
	__class__: dropecho_ds_BSPTree
	,root: null
});
class dropecho_ds_algos_InOrderTraversal {
	constructor() {
		this.visited = [];
	}
	run(node,visitor) {
		if(node.left != null) {
			this.run(node.left,visitor);
		}
		if(visitor != null) {
			if(visitor(node)) {
				this.visited.push(node.id);
			} else {
				return this.visited;
			}
		} else {
			this.visited.push(node.id);
		}
		if(node.right != null) {
			this.run(node.right,visitor);
		}
		return this.visited;
	}
}
$hxClasses["dropecho.ds.algos.InOrderTraversal"] = $hx_exports["algos"]["InOrderTraversal"] = dropecho_ds_algos_InOrderTraversal;
dropecho_ds_algos_InOrderTraversal.__name__ = "dropecho.ds.algos.InOrderTraversal";
Object.assign(dropecho_ds_algos_InOrderTraversal.prototype, {
	__class__: dropecho_ds_algos_InOrderTraversal
	,visited: null
});
class dropecho_ds_algos_PostOrderTraversal {
	constructor() {
		this.visited = [];
	}
	run(node,visitor) {
		if(node.left != null) {
			this.run(node.left,visitor);
		}
		if(node.right != null) {
			this.run(node.right,visitor);
		}
		if(visitor != null) {
			if(visitor(node)) {
				this.visited.push(node.id);
			} else {
				return this.visited;
			}
		} else {
			this.visited.push(node.id);
		}
		return this.visited;
	}
}
$hxClasses["dropecho.ds.algos.PostOrderTraversal"] = $hx_exports["algos"]["PostOrderTraversal"] = dropecho_ds_algos_PostOrderTraversal;
dropecho_ds_algos_PostOrderTraversal.__name__ = "dropecho.ds.algos.PostOrderTraversal";
Object.assign(dropecho_ds_algos_PostOrderTraversal.prototype, {
	__class__: dropecho_ds_algos_PostOrderTraversal
	,visited: null
});
class dropecho_dungen_Tile2d {
	constructor(x,y,val) {
		this.x = x;
		this.y = y;
		this.val = val;
	}
}
$hxClasses["dropecho.dungen.Tile2d"] = $hx_exports["dungen"]["Tile2d"] = dropecho_dungen_Tile2d;
dropecho_dungen_Tile2d.__name__ = "dropecho.dungen.Tile2d";
Object.assign(dropecho_dungen_Tile2d.prototype, {
	__class__: dropecho_dungen_Tile2d
	,x: null
	,y: null
	,val: null
});
class dropecho_dungen_Map2d {
	constructor(width,height,initTileData) {
		if(dropecho_dungen_Map2d._hx_skip_constructor) {
			return;
		}
		this._hx_constructor(width,height,initTileData);
	}
	_hx_constructor(width,height,initTileData) {
		if(initTileData == null) {
			initTileData = 0;
		}
		this._height = 0;
		this._width = 0;
		this._width = width;
		this._height = height;
		this._mapData = [];
		this.initializeData(initTileData);
	}
	initializeData(initTileData) {
		if(initTileData == -1) {
			return;
		}
		let length = this._height * this._width;
		let _g = 0;
		let _g1 = length;
		while(_g < _g1) {
			let i = _g++;
			this._mapData[i] = initTileData;
		}
	}
	XYtoIndex(x,y) {
		return this._width * y + x;
	}
	IndexToXY(index) {
		let x = index % this._width | 0;
		let y = index / this._width | 0;
		return new dropecho_dungen_Tile2d(x,y);
	}
	set(x,y,data) {
		let index = this._width * y + x;
		this._mapData[index] = data;
	}
	get(x,y) {
		return this._mapData[this._width * y + x];
	}
	toPrettyString(char) {
		if(char == null) {
			char = [" ",".",",","`"];
		}
		let output = "\n MAP2d: \n\n";
		let _g = 0;
		let _g1 = this._height;
		while(_g < _g1) {
			let y = _g++;
			let _g1 = 0;
			let _g2 = this._width;
			while(_g1 < _g2) {
				let x = _g1++;
				output += char[this._mapData[this._width * y + x]];
			}
			output += "\n";
		}
		return output;
	}
	toString() {
		let output = "\n MAP2d: \n\n";
		let _g = 0;
		let _g1 = this._height;
		while(_g < _g1) {
			let y = _g++;
			let _g1 = 0;
			let _g2 = this._width;
			while(_g1 < _g2) {
				let x = _g1++;
				let val = this._mapData[this._width * y + x];
				output += val;
			}
			output += "\n";
		}
		return output;
	}
}
$hxClasses["dropecho.dungen.Map2d"] = $hx_exports["dungen"]["Map2d"] = dropecho_dungen_Map2d;
dropecho_dungen_Map2d.__name__ = "dropecho.dungen.Map2d";
Object.assign(dropecho_dungen_Map2d.prototype, {
	__class__: dropecho_dungen_Map2d
	,_width: null
	,_height: null
	,_mapData: null
});
class dropecho_dungen_Region {
	constructor(id) {
		this.tiles = [];
		this.id = id;
		this.tiles = [];
	}
}
$hxClasses["dropecho.dungen.Region"] = $hx_exports["dungen"]["Region"] = dropecho_dungen_Region;
dropecho_dungen_Region.__name__ = "dropecho.dungen.Region";
Object.assign(dropecho_dungen_Region.prototype, {
	__class__: dropecho_dungen_Region
	,id: null
	,tiles: null
});
class dropecho_dungen_RegionMap extends dropecho_dungen_Map2d {
	constructor(map,depth,expand) {
		dropecho_dungen_Map2d._hx_skip_constructor = true;
		super();
		dropecho_dungen_Map2d._hx_skip_constructor = false;
		this._hx_constructor(map,depth,expand);
	}
	_hx_constructor(map,depth,expand) {
		if(expand == null) {
			expand = true;
		}
		if(depth == null) {
			depth = 2;
		}
		this.graph = new dropecho_ds_Graph();
		this.borders = dropecho_interop_AbstractMap._new();
		this.regions = dropecho_interop_AbstractMap._new();
		super._hx_constructor(map._width,map._height,0);
		let regionmap = dropecho_dungen_map_Map2dExtensions.clone(map);
		regionmap = dropecho_dungen_map_extensions_DistanceFill.distanceFill(regionmap,0,false);
		regionmap = dropecho_dungen_map_extensions_RegionManager.findAndTagRegions(regionmap,depth);
		if(expand) {
			regionmap = dropecho_dungen_map_extensions_RegionManager.expandRegions(regionmap,depth + 1);
		} else if(depth > 1) {
			regionmap = dropecho_dungen_map_extensions_RegionManager.expandRegionsByOne(regionmap,depth);
		}
		this.buildRegions(regionmap,depth);
		this.buildBorders(dropecho_dungen_map_extensions_RegionManager.findAndTagBorders(regionmap,1,128));
		this.buildGraph();
	}
	buildGraph() {
		let access = this.regions;
		let _g_access = access;
		let _g_keys = Reflect.fields(access);
		let _g_index = 0;
		while(_g_index < _g_keys.length) {
			let region = _g_access[_g_keys[_g_index++]];
			this.graph.addNode(new dropecho_ds_GraphNode(region,region.id));
		}
		let access1 = this.borders;
		let _g1_access = access1;
		let _g1_keys = Reflect.fields(access1);
		let _g1_index = 0;
		while(_g1_index < _g1_keys.length) {
			let border = _g1_access[_g1_keys[_g1_index++]];
			let borderRegions = [];
			let _g = 0;
			let _g1 = border.tiles;
			while(_g < _g1.length) {
				let tile = _g1[_g];
				++_g;
				let neighbors = dropecho_dungen_map_extensions_Neighbors.getNeighbors(this,tile.x,tile.y);
				let _g2 = 0;
				while(_g2 < neighbors.length) {
					let n = neighbors[_g2];
					++_g2;
					if(Object.prototype.hasOwnProperty.call(this.regions,Std.string(n.val))) {
						let region = this.regions[Std.string(n.val)];
						if(!Lambda.has(borderRegions,region)) {
							borderRegions.push(region);
						}
					}
				}
			}
			let _g2 = 0;
			while(_g2 < borderRegions.length) {
				let region = borderRegions[_g2];
				++_g2;
				let _g = 0;
				while(_g < borderRegions.length) {
					let region2 = borderRegions[_g];
					++_g;
					if(region.id == region2.id) {
						continue;
					}
					this.graph.addUniEdge(region.id,region2.id,border);
				}
			}
		}
	}
	buildRegions(regionmap,depth) {
		if(depth == null) {
			depth = 2;
		}
		let _g = 0;
		let _g1 = regionmap._mapData.length;
		while(_g < _g1) {
			let tile = _g++;
			let regionTileId = regionmap._mapData[tile];
			let isRegion = regionTileId > depth;
			this._mapData[tile] = regionmap._mapData[tile];
			if(isRegion) {
				let region;
				if(Object.prototype.hasOwnProperty.call(this.regions,regionTileId == null ? "null" : "" + regionTileId) == false) {
					region = new dropecho_dungen_Region(regionTileId);
					this.regions[Std.string(region.id)] = region;
				} else {
					region = this.regions[regionTileId == null ? "null" : "" + regionTileId];
				}
				region.tiles.push(regionmap.IndexToXY(tile));
			}
		}
	}
	buildBorders(bordermap) {
		let _g = 0;
		let _g1 = bordermap._mapData.length;
		while(_g < _g1) {
			let tile = _g++;
			let borderTile = bordermap._mapData[tile];
			let isBorder = borderTile != 0;
			this._mapData[tile] = isBorder ? borderTile : this._mapData[tile];
			if(isBorder) {
				let border;
				if(Object.prototype.hasOwnProperty.call(this.borders,borderTile == null ? "null" : "" + borderTile) == false) {
					border = new dropecho_dungen_Region(borderTile);
					this.borders[Std.string(border.id)] = border;
				} else {
					border = this.borders[borderTile == null ? "null" : "" + borderTile];
				}
				let tileData = bordermap.IndexToXY(tile);
				border.tiles.push(tileData);
			}
		}
	}
	toStringSingleRegion(regionId) {
		let chars = [];
		let _g = 0;
		while(_g < 255) {
			let i = _g++;
			chars[i] = i - 1 == regionId ? "." : " ";
		}
		return this.toPrettyString(chars);
	}
	toRegionBorderIdString() {
		let output = "\n MAP2d: \n\n";
		let _g = 0;
		let _g1 = this._height;
		while(_g < _g1) {
			let y = _g++;
			let _g1 = 0;
			let _g2 = this._width;
			while(_g1 < _g2) {
				let x = _g1++;
				let val = this._mapData[this._width * y + x];
				if(Object.prototype.hasOwnProperty.call(this.regions,val == null ? "null" : "" + val)) {
					let tiles = this.regions[val == null ? "null" : "" + val].tiles;
					let _g = 0;
					let _g1 = tiles.length;
					while(_g < _g1) {
						let i = _g++;
						if(tiles[i].x == x && tiles[i].y == y) {
							output += val;
						}
					}
				} else if(Object.prototype.hasOwnProperty.call(this.borders,val == null ? "null" : "" + val)) {
					let _g = 0;
					let _g1 = this.borders[val == null ? "null" : "" + val].tiles;
					while(_g < _g1.length) {
						let tile = _g1[_g];
						++_g;
						if(tile.x == x && tile.y == y) {
							output += val - 127;
						}
					}
				} else {
					output += val == 0 ? " " : val;
				}
			}
			output += "\n";
		}
		return output;
	}
	toRegionBorderString() {
		let output = "\n MAP2d: \n\n";
		let _g = 0;
		let _g1 = this._height;
		while(_g < _g1) {
			let y = _g++;
			let _g1 = 0;
			let _g2 = this._width;
			while(_g1 < _g2) {
				let x = _g1++;
				let isBorder = false;
				let isRegion = false;
				let val = this._mapData[this._width * y + x];
				if(Object.prototype.hasOwnProperty.call(this.regions,val == null ? "null" : "" + val)) {
					let tiles = this.regions[val == null ? "null" : "" + val].tiles;
					let _g = 0;
					let _g1 = tiles.length;
					while(_g < _g1) {
						let i = _g++;
						if(tiles[i].x == x && tiles[i].y == y) {
							isRegion = true;
						}
					}
				}
				if(Object.prototype.hasOwnProperty.call(this.borders,val == null ? "null" : "" + val)) {
					let _g = 0;
					let _g1 = this.borders[val == null ? "null" : "" + val].tiles;
					while(_g < _g1.length) {
						let tile = _g1[_g];
						++_g;
						if(tile.x == x && tile.y == y) {
							isBorder = true;
						}
					}
				}
				output += isBorder ? "b" : isRegion ? "r" : " ";
			}
			output += "\n";
		}
		return output;
	}
}
$hxClasses["dropecho.dungen.RegionMap"] = $hx_exports["dungen"]["RegionMap"] = dropecho_dungen_RegionMap;
dropecho_dungen_RegionMap.__name__ = "dropecho.dungen.RegionMap";
dropecho_dungen_RegionMap.__super__ = dropecho_dungen_Map2d;
Object.assign(dropecho_dungen_RegionMap.prototype, {
	__class__: dropecho_dungen_RegionMap
	,regions: null
	,borders: null
	,graph: null
});
class dropecho_dungen_bsp_BSPData {
	constructor(ops) {
		this.y = 0;
		this.x = 0;
		this.height = 0;
		this.width = 0;
		dropecho_interop_Extender.extendThis(this,ops);
	}
}
$hxClasses["dropecho.dungen.bsp.BSPData"] = $hx_exports["dungen"]["BSPData"] = dropecho_dungen_bsp_BSPData;
dropecho_dungen_bsp_BSPData.__name__ = "dropecho.dungen.bsp.BSPData";
Object.assign(dropecho_dungen_bsp_BSPData.prototype, {
	__class__: dropecho_dungen_bsp_BSPData
	,width: null
	,height: null
	,x: null
	,y: null
});
class dropecho_dungen_bsp_BSPGeneratorConfig {
	constructor() {
		if(dropecho_dungen_bsp_BSPGeneratorConfig._hx_skip_constructor) {
			return;
		}
		this._hx_constructor();
	}
	_hx_constructor() {
		this.seed = "0";
		this.y = 0;
		this.x = 0;
		this.ratio = .45;
		this.depth = 10;
		this.minWidth = 10;
		this.minHeight = 10;
		this.height = 60;
		this.width = 120;
	}
}
$hxClasses["dropecho.dungen.bsp.BSPGeneratorConfig"] = $hx_exports["dungen"]["BSPGeneratorConfig"] = dropecho_dungen_bsp_BSPGeneratorConfig;
dropecho_dungen_bsp_BSPGeneratorConfig.__name__ = "dropecho.dungen.bsp.BSPGeneratorConfig";
Object.assign(dropecho_dungen_bsp_BSPGeneratorConfig.prototype, {
	__class__: dropecho_dungen_bsp_BSPGeneratorConfig
	,width: null
	,height: null
	,minHeight: null
	,minWidth: null
	,depth: null
	,ratio: null
	,x: null
	,y: null
	,seed: null
});
class dropecho_dungen_bsp_Generator extends dropecho_dungen_bsp_BSPGeneratorConfig {
	constructor(ops) {
		dropecho_dungen_bsp_BSPGeneratorConfig._hx_skip_constructor = true;
		super();
		dropecho_dungen_bsp_BSPGeneratorConfig._hx_skip_constructor = false;
		this._hx_constructor(ops);
	}
	_hx_constructor(ops) {
		this.random = new seedyrng_Random();
		super._hx_constructor();
		dropecho_interop_Extender.extendThis(this,ops);
		this.random.setStringSeed(this.seed);
	}
	generate() {
		this.random.setStringSeed(this.seed);
		let rootData = new dropecho_dungen_bsp_BSPData({ height : this.height, width : this.width, x : this.x, y : this.y});
		let tree = new dropecho_ds_BSPTree(rootData);
		this.buildTree(tree.getRoot());
		return tree;
	}
	buildTree(node,level) {
		if(level == null) {
			level = 0;
		}
		if(node == null || level >= this.depth) {
			return;
		}
		this.makeSplit(node);
		this.buildTree(node.left,level + 1);
		this.buildTree(node.right,level + 1);
	}
	makeSplit(node) {
		let val = node.value;
		let lData;
		let rData;
		if(val.width < this.minWidth * 2 && val.height < this.minHeight * 2) {
			return;
		}
		let splitAt = 0;
		let splitHeight = this.random.random() > 0.5;
		if(val.width >= val.height * this.ratio) {
			splitHeight = false;
		} else if(val.height >= val.width * this.ratio) {
			splitHeight = true;
		} else {
			return;
		}
		if(splitHeight) {
			splitAt = this.random.randomInt(0,val.height - this.minHeight * 2) + this.minHeight;
			let rHeight = val.height - splitAt;
			lData = new dropecho_dungen_bsp_BSPData({ height : splitAt, width : val.width, x : val.x, y : val.y});
			rData = new dropecho_dungen_bsp_BSPData({ height : rHeight, width : val.width, x : val.x, y : val.y + splitAt});
		} else {
			splitAt = this.random.randomInt(0,val.width - this.minWidth * 2) + this.minWidth;
			let rWidth = val.width - splitAt;
			lData = new dropecho_dungen_bsp_BSPData({ height : val.height, width : splitAt, x : val.x, y : val.y});
			rData = new dropecho_dungen_bsp_BSPData({ height : val.height, width : rWidth, x : val.x + splitAt, y : val.y});
		}
		node.setLeft(new dropecho_ds_BSPNode(lData));
		node.setRight(new dropecho_ds_BSPNode(rData));
	}
}
$hxClasses["dropecho.dungen.bsp.Generator"] = $hx_exports["dungen"]["BSPGenerator"] = dropecho_dungen_bsp_Generator;
dropecho_dungen_bsp_Generator.__name__ = "dropecho.dungen.bsp.Generator";
dropecho_dungen_bsp_Generator.__super__ = dropecho_dungen_bsp_BSPGeneratorConfig;
Object.assign(dropecho_dungen_bsp_Generator.prototype, {
	__class__: dropecho_dungen_bsp_Generator
	,random: null
});
class dropecho_dungen_export_TiledExporter {
	static export(map) {
		return "0";
	}
}
$hxClasses["dropecho.dungen.export.TiledExporter"] = $hx_exports["dungen"]["TiledExporter"] = dropecho_dungen_export_TiledExporter;
dropecho_dungen_export_TiledExporter.__name__ = "dropecho.dungen.export.TiledExporter";
class dropecho_dungen_generators_CA_$PARAMS {
	constructor() {
		this.useOtherType = false;
		this.seed = "0";
		this.start_fill_percent = 65;
		this.tile_wall = 0;
		this.tile_floor = 1;
		this.width = 64;
		this.height = 64;
		this.steps = [];
		this.steps = [{ reps : 4, r1_cutoff : 5, r2_cutoff : 2, invert : true},{ reps : 3, r1_cutoff : 5, r2_cutoff : 0, invert : true}];
	}
}
$hxClasses["dropecho.dungen.generators.CA_PARAMS"] = $hx_exports["dungen"]["CA_PARAMS"] = dropecho_dungen_generators_CA_$PARAMS;
dropecho_dungen_generators_CA_$PARAMS.__name__ = "dropecho.dungen.generators.CA_PARAMS";
Object.assign(dropecho_dungen_generators_CA_$PARAMS.prototype, {
	__class__: dropecho_dungen_generators_CA_$PARAMS
	,steps: null
	,height: null
	,width: null
	,tile_floor: null
	,tile_wall: null
	,start_fill_percent: null
	,seed: null
	,useOtherType: null
});
class dropecho_dungen_generators_CAGenerator {
	static generate(opts) {
		let params = dropecho_interop_Extender.defaults(new dropecho_dungen_generators_CA_$PARAMS(),opts);
		let map = dropecho_dungen_generators_RandomGenerator.generate(params);
		let _g = 0;
		let _g1 = params.steps;
		while(_g < _g1.length) {
			let step = _g1[_g];
			++_g;
			let _g2 = 0;
			let _g3 = step.reps;
			while(_g2 < _g3) {
				let _ = _g2++;
				dropecho_dungen_generators_CAGenerator.buildFromCA(map,params,step);
			}
		}
		return map;
	}
	static buildFromCA(map,params,step) {
		let temp = new haxe_ds_IntMap();
		let alive_tile_type = step.invert ? params.tile_floor : params.tile_wall;
		let dead_tile_type = step.invert ? params.tile_wall : params.tile_floor;
		let _g = 0;
		let _g1 = params.width;
		while(_g < _g1) {
			let x = _g++;
			let _g1 = 0;
			let _g2 = params.height;
			while(_g1 < _g2) {
				let y = _g1++;
				let nCount = dropecho_dungen_map_extensions_Neighbors.getNeighborCount(map,x,y,alive_tile_type);
				let nCount2 = dropecho_dungen_map_extensions_Neighbors.getNeighborCount(map,x,y,alive_tile_type,2);
				let pos = map._width * y + x;
				if(!params.useOtherType) {
					let is_alive = map._mapData[map._width * y + x] == alive_tile_type;
					if(!is_alive && nCount >= step.r1_cutoff) {
						is_alive = true;
					} else if(is_alive && nCount >= step.r2_cutoff) {
						is_alive = true;
					} else {
						is_alive = false;
					}
					temp.h[pos] = is_alive ? alive_tile_type : dead_tile_type;
				} else if(nCount >= step.r1_cutoff || nCount2 <= step.r2_cutoff) {
					temp.h[pos] = dead_tile_type;
				} else {
					temp.h[pos] = alive_tile_type;
				}
			}
		}
		let i = temp.keys();
		while(i.hasNext()) {
			let i1 = i.next();
			let pos = map.IndexToXY(i1);
			let index = map._width * pos.y + pos.x;
			map._mapData[index] = temp.h[i1];
		}
	}
}
$hxClasses["dropecho.dungen.generators.CAGenerator"] = $hx_exports["dungen"]["CAGenerator"] = dropecho_dungen_generators_CAGenerator;
dropecho_dungen_generators_CAGenerator.__name__ = "dropecho.dungen.generators.CAGenerator";
class dropecho_dungen_generators_ConvChain {
	constructor(sample) {
		this.seed = "0";
		this.sample = sample;
		this.cachedN = -1;
		this.cachedWeights = null;
		this.rng = new seedyrng_Random();
		this.rng.setStringSeed(this.seed);
	}
	processWeights(sample,n) {
		let size = Math.pow(2,n * n) | 0;
		let _g = [];
		let _g1 = 0;
		let _g2 = size;
		while(_g1 < _g2) {
			let _ = _g1++;
			_g.push(0.0);
		}
		let weights = _g;
		let _g3 = 0;
		let _g4 = sample._height;
		while(_g3 < _g4) {
			let x = _g3++;
			let _g = 0;
			let _g1 = sample._width;
			while(_g < _g1) {
				let y = _g++;
				let rect = dropecho_dungen_map_extensions_Utils.getRect(sample,{ x : x, y : y, width : n, height : n},true);
				let p = dropecho_dungen_map_Pattern.init(n,rect);
				let _g1 = 0;
				let _g2 = p.hashes.length;
				while(_g1 < _g2) {
					let h = _g1++;
					weights[p.hashes[h]] += 1;
				}
			}
		}
		let _g5 = 0;
		let _g6 = weights.length;
		while(_g5 < _g6) {
			let k = _g5++;
			weights[k] = weights[k] <= 0 ? 0.1 : weights[k];
		}
		return weights;
	}
	getWeights(n) {
		if(this.cachedN != n) {
			this.cachedN = n;
			this.cachedWeights = this.processWeights(this.sample,n);
		}
		return this.cachedWeights;
	}
	generateBaseField(width,height) {
		return dropecho_dungen_generators_RandomGenerator.generate({ height : height, width : width, seed : this.seed});
	}
	applyChanges(field,weights,n,temperature,changes) {
		let r;
		let q;
		let x;
		let y;
		let ind;
		let difference;
		let _g = 0;
		let _g1 = changes;
		while(_g < _g1) {
			let _ = _g++;
			q = 1.0;
			r = this.rng.randomInt(0,field._mapData.length);
			x = r % field._width | 0;
			y = r / field._width | 0;
			let _g1 = y - n + 1;
			let _g2 = y + n;
			while(_g1 < _g2) {
				let sy = _g1++;
				let _g = x - n + 1;
				let _g2 = x + n;
				while(_g < _g2) {
					let sx = _g++;
					ind = 0;
					difference = 0;
					let _g1 = 0;
					let _g2 = n;
					while(_g1 < _g2) {
						let dy = _g1++;
						let _g = 0;
						let _g2 = n;
						while(_g < _g2) {
							let dx = _g++;
							let power = 1 << dy * n + dx;
							let X = sx + dx;
							let Y = sy + dy;
							X = Math.abs(X % field._width) | 0;
							Y = Math.abs(Y % field._height) | 0;
							let value = field._mapData[field._width * Y + X];
							ind += value != 0 ? power : 0;
							if(X == x && Y == y) {
								difference = value != 0 ? power : -power;
							}
						}
					}
					let a = weights[ind - difference];
					let b = weights[ind];
					q *= a / b;
				}
			}
			if(q >= 1) {
				let index = field._width * y + x;
				field._mapData[index] = field._mapData[field._width * y + x] != 1 ? 1 : 0;
			} else {
				if(temperature != 1) {
					q = Math.pow(q,1.0 / temperature);
				}
				if(q > this.rng.random()) {
					let index = field._width * y + x;
					field._mapData[index] = field._mapData[field._width * y + x] != 1 ? 1 : 0;
				}
			}
		}
	}
	generate(width,height,n,temperature,iterations) {
		let changesPerIterations = width * height;
		let field = this.generateBaseField(width,height);
		let weights = this.getWeights(n);
		let _g = 0;
		let _g1 = iterations;
		while(_g < _g1) {
			let _ = _g++;
			this.applyChanges(field,weights,n,temperature,changesPerIterations);
		}
		return field;
	}
}
$hxClasses["dropecho.dungen.generators.ConvChain"] = $hx_exports["dungen"]["ConvChain"] = dropecho_dungen_generators_ConvChain;
dropecho_dungen_generators_ConvChain.__name__ = "dropecho.dungen.generators.ConvChain";
Object.assign(dropecho_dungen_generators_ConvChain.prototype, {
	__class__: dropecho_dungen_generators_ConvChain
	,sample: null
	,cachedN: null
	,cachedWeights: null
	,rng: null
	,seed: null
});
class dropecho_dungen_generators_FloorPlanGenerator {
	static generate(params) {
		let width = params.width;
		let height = params.height;
		let tile_floor = params.tile_floor;
		let tile_wall = params.tile_wall;
		let map = new dropecho_dungen_Map2d(width,height);
		let rooms = [];
		rooms.push({ width : 20, height : 20, x : -999999, y : -999999});
		rooms.push({ width : 20, height : 20, x : -999999, y : -999999});
		rooms.push({ width : 20, height : 30, x : -999999, y : -999999});
		rooms.push({ width : 30, height : 20, x : -999999, y : -999999});
		dropecho_dungen_generators_FloorPlanGenerator.arrangeRooms(map,rooms);
		return map;
	}
	static scaleFloorPlan(map,rooms) {
	}
	static arrangeRooms(map,rooms) {
		let random = new seedyrng_Random();
		let mapMidX = map._width / 2;
		let mapMidY = map._height / 2;
		let randomRooms = rooms.slice();
		random.shuffle(randomRooms);
		let _g = 0;
		while(_g < randomRooms.length) {
			let r = randomRooms[_g];
			++_g;
			r.x = 500;
			r.y = 500;
			let isRight = r.x > mapMidX;
			let isAbove = r.y > mapMidY;
		}
	}
}
$hxClasses["dropecho.dungen.generators.FloorPlanGenerator"] = $hx_exports["dungen"]["FloorPlanGenerator"] = dropecho_dungen_generators_FloorPlanGenerator;
dropecho_dungen_generators_FloorPlanGenerator.__name__ = "dropecho.dungen.generators.FloorPlanGenerator";
class dropecho_dungen_generators_MixedGenerator {
	static buildRooms(tree,opts) {
		let random = new seedyrng_Random();
		let params = dropecho_interop_Extender.defaults({ tile_wall : 0, tile_floor : 1, cave_percent : 20, seed : "0"},opts);
		random.setStringSeed(params.seed);
		let rootvalue = tree.root.value;
		let map = new dropecho_dungen_Map2d(rootvalue.width,rootvalue.height,params.tile_wall);
		let makeRooms = function(node) {
			if(node.hasLeft() || node.hasRight()) {
				return true;
			}
			let roomStartX = node.value.x + 1;
			let roomStartY = node.value.y + 1;
			let roomEndX = node.value.x + node.value.width - 1;
			let roomEndY = node.value.y + node.value.height - 1;
			let _g = roomStartX;
			let _g1 = roomEndX;
			while(_g < _g1) {
				let x = _g++;
				let _g1 = roomStartY;
				let _g2 = roomEndY;
				while(_g1 < _g2) {
					let y = _g1++;
					let index = map._width * y + x;
					map._mapData[index] = params.tile_floor;
				}
			}
			return true;
		};
		let makeCaveFromCA = function(node) {
			if((node.hasLeft() || node.hasRight()) && (node.right.hasRight() || node.right.hasLeft() || node.left.hasRight() || node.left.hasLeft())) {
				return true;
			}
			let roomStartX = node.value.x + 1;
			let roomStartY = node.value.y + 1;
			let cave = dropecho_dungen_generators_CAGenerator.generate({ height : node.value.height, width : node.value.width});
			let _g = 0;
			let _g1 = cave._width;
			while(_g < _g1) {
				let x = _g++;
				let _g1 = 0;
				let _g2 = cave._height;
				while(_g1 < _g2) {
					let y = _g1++;
					let index = map._width * (y + roomStartY) + (x + roomStartX);
					map._mapData[index] = cave._mapData[cave._width * y + x];
				}
			}
			return true;
		};
		let makeCorridors = function(node) {
			if(!node.hasLeft() && !node.hasRight()) {
				return true;
			}
			let leftXcenter = node.left.value.x + node.left.value.width / 2 | 0;
			let leftYcenter = node.left.value.y + node.left.value.height / 2 | 0;
			let rightXcenter = node.right.value.x + node.right.value.width / 2 | 0;
			let rightYcenter = node.right.value.y + node.right.value.height / 2 | 0;
			let startX = leftXcenter <= rightXcenter ? leftXcenter : rightXcenter;
			let endX = leftXcenter >= rightXcenter ? leftXcenter : rightXcenter;
			let startY = leftYcenter <= rightYcenter ? leftYcenter : rightYcenter;
			let endY = leftYcenter >= rightYcenter ? leftYcenter : rightYcenter;
			let _g = startX;
			let _g1 = endX;
			while(_g < _g1) {
				let x = _g++;
				let index = map._width * startY + x;
				map._mapData[index] = params.tile_floor;
			}
			let _g2 = startY;
			let _g3 = endY;
			while(_g2 < _g3) {
				let y = _g2++;
				let index = map._width * y + startX;
				map._mapData[index] = params.tile_floor;
			}
			return true;
		};
		let chooseRoomOrCave = function(node) {
			if(random.random() * 100 > params.cave_percent) {
				return makeRooms(node);
			} else {
				return makeCaveFromCA(node);
			}
		};
		let closeEdges = function(node) {
			if(!node.isRoot()) {
				return true;
			}
			let _g = 0;
			let _g1 = node.value.width;
			while(_g < _g1) {
				let x = _g++;
				let index = map._width * 0 + x;
				map._mapData[index] = params.tile_wall;
				let index1 = map._width * node.value.height + x;
				map._mapData[index1] = params.tile_wall;
			}
			let _g2 = 0;
			let _g3 = node.value.height;
			while(_g2 < _g3) {
				let y = _g2++;
				let index = map._width * y;
				map._mapData[index] = params.tile_wall;
				let index1 = map._width * y + node.value.width;
				map._mapData[index1] = params.tile_wall;
			}
			return false;
		};
		let povisitor = new dropecho_ds_algos_PostOrderTraversal();
		let invisitor = new dropecho_ds_algos_InOrderTraversal();
		povisitor.run(tree.root,chooseRoomOrCave);
		povisitor.visited.length = 0;
		invisitor.run(tree.root,closeEdges);
		povisitor.run(tree.root,makeCorridors);
		return map;
	}
}
$hxClasses["dropecho.dungen.generators.MixedGenerator"] = $hx_exports["dungen"]["MixedGenerator"] = dropecho_dungen_generators_MixedGenerator;
dropecho_dungen_generators_MixedGenerator.__name__ = "dropecho.dungen.generators.MixedGenerator";
class dropecho_dungen_generators_RandomParams {
	constructor() {
		this.seed = "0";
		this.start_fill_percent = 50;
		this.tile_wall = 0;
		this.tile_floor = 1;
		this.width = 64;
		this.height = 64;
	}
}
$hxClasses["dropecho.dungen.generators.RandomParams"] = dropecho_dungen_generators_RandomParams;
dropecho_dungen_generators_RandomParams.__name__ = "dropecho.dungen.generators.RandomParams";
Object.assign(dropecho_dungen_generators_RandomParams.prototype, {
	__class__: dropecho_dungen_generators_RandomParams
	,height: null
	,width: null
	,tile_floor: null
	,tile_wall: null
	,start_fill_percent: null
	,seed: null
});
class dropecho_dungen_generators_RandomGenerator {
	static generate(opts) {
		let params = dropecho_interop_Extender.defaults(new dropecho_dungen_generators_RandomParams(),opts);
		let random = new seedyrng_Random();
		random.setStringSeed(params.seed);
		let map = new dropecho_dungen_Map2d(params.width,params.height,params.tile_wall);
		let _g = 0;
		let _g1 = params.width * params.height;
		while(_g < _g1) {
			let i = _g++;
			map._mapData[i] = random.random() * 100 > params.start_fill_percent ? params.tile_floor : params.tile_wall;
		}
		return map;
	}
}
$hxClasses["dropecho.dungen.generators.RandomGenerator"] = $hx_exports["dungen"]["RandomGenerator"] = dropecho_dungen_generators_RandomGenerator;
dropecho_dungen_generators_RandomGenerator.__name__ = "dropecho.dungen.generators.RandomGenerator";
class dropecho_dungen_generators_RoomParams {
	constructor() {
		this.padding = 0;
		this.tileWall = 0;
		this.tileFloor = 1;
		this.tileCorridor = 1;
	}
}
$hxClasses["dropecho.dungen.generators.RoomParams"] = dropecho_dungen_generators_RoomParams;
dropecho_dungen_generators_RoomParams.__name__ = "dropecho.dungen.generators.RoomParams";
Object.assign(dropecho_dungen_generators_RoomParams.prototype, {
	__class__: dropecho_dungen_generators_RoomParams
	,tileCorridor: null
	,tileFloor: null
	,tileWall: null
	,padding: null
});
class dropecho_dungen_generators_RoomGenerator {
	static buildRooms(tree,opts) {
		let params = dropecho_interop_Extender.defaults(new dropecho_dungen_generators_RoomParams(),opts);
		let rootvalue = tree.getRoot().value;
		let map = new dropecho_dungen_Map2d(rootvalue.width,rootvalue.height,params.tileWall);
		let makeRoom = function(node) {
			if(node.hasLeft() || node.hasRight()) {
				return true;
			}
			let lPad = params.padding / 2 | 0;
			let rPad = (params.padding / 2 | 0) + params.padding % 2;
			let roomStartX = node.value.x + 1 + lPad;
			let roomStartY = node.value.y + 1 + lPad;
			let roomEndX = node.value.x + node.value.width - 1 - rPad;
			let roomEndY = node.value.y + node.value.height - 1 - rPad;
			if(roomStartX != 1) {
				--roomStartX;
			}
			if(roomStartY != 1) {
				--roomStartY;
			}
			let _g = roomStartX;
			let _g1 = roomEndX;
			while(_g < _g1) {
				let x = _g++;
				let _g1 = roomStartY;
				let _g2 = roomEndY;
				while(_g1 < _g2) {
					let y = _g1++;
					let index = map._width * y + x;
					map._mapData[index] = params.tileFloor;
				}
			}
			return true;
		};
		let makeCorridors = function(node) {
			if(!node.hasLeft() && !node.hasRight()) {
				return true;
			}
			let leftXcenter = node.left.value.x + node.left.value.width / 2 | 0;
			let leftYcenter = node.left.value.y + node.left.value.height / 2 | 0;
			let rightXcenter = node.right.value.x + node.right.value.width / 2 | 0;
			let rightYcenter = node.right.value.y + node.right.value.height / 2 | 0;
			let startX = leftXcenter <= rightXcenter ? leftXcenter : rightXcenter;
			let endX = leftXcenter >= rightXcenter ? leftXcenter : rightXcenter;
			let startY = leftYcenter <= rightYcenter ? leftYcenter : rightYcenter;
			let endY = leftYcenter >= rightYcenter ? leftYcenter : rightYcenter;
			let _g = startX;
			let _g1 = endX;
			while(_g < _g1) {
				let x = _g++;
				if(map._mapData[map._width * startY + x] != params.tileFloor) {
					let index = map._width * startY + x;
					map._mapData[index] = params.tileCorridor;
				}
			}
			let _g2 = startY;
			let _g3 = endY;
			while(_g2 < _g3) {
				let y = _g2++;
				if(map._mapData[map._width * y + startX] != params.tileFloor) {
					let index = map._width * y + startX;
					map._mapData[index] = params.tileCorridor;
				}
			}
			return true;
		};
		let visitor = new dropecho_ds_algos_PostOrderTraversal();
		visitor.run(tree.root,makeRoom);
		visitor.visited.length = 0;
		visitor.run(tree.root,makeCorridors);
		return map;
	}
}
$hxClasses["dropecho.dungen.generators.RoomGenerator"] = $hx_exports["dungen"]["RoomGenerator"] = dropecho_dungen_generators_RoomGenerator;
dropecho_dungen_generators_RoomGenerator.__name__ = "dropecho.dungen.generators.RoomGenerator";
class dropecho_dungen_generators_TunnelerGenerator {
	static generate(params) {
		let height = params.height;
		let width = params.width;
		let tile_floor = params.tile_floor;
		let tile_wall = params.tile_wall;
		let start_fill_percent = params.start_fill_percent;
		let countOfFilled = 0;
		let totalCount = height * width;
		let map = new dropecho_dungen_Map2d(width,height,tile_wall);
		let walkerPos_x = width / 2 | 0;
		let walkerPos_y = height / 2 | 0;
		let index = map._width * walkerPos_y + walkerPos_x;
		map._mapData[index] = 0;
		return map;
	}
	static getEntrancePosition(map) {
		let random = new seedyrng_Random();
		let top = random.randomInt(0,1) == 1;
		let right = random.randomInt(0,1) == 1;
		return null;
	}
}
$hxClasses["dropecho.dungen.generators.TunnelerGenerator"] = $hx_exports["dungen"]["TunnelerGenerator"] = dropecho_dungen_generators_TunnelerGenerator;
dropecho_dungen_generators_TunnelerGenerator.__name__ = "dropecho.dungen.generators.TunnelerGenerator";
class dropecho_dungen_generators__$TunnelerGenerator_Tunneler {
	constructor(map,position,width,direction,lifeSpan) {
		if(lifeSpan == null) {
			lifeSpan = 5;
		}
		if(direction == null) {
			direction = 2;
		}
		if(width == null) {
			width = 1;
		}
		this.map = map;
		this.position = position;
		this.width = width;
		this.direction = direction;
		this.lifeSpan = lifeSpan;
	}
	run() {
		let ticks = 0;
		while(ticks < this.lifeSpan) {
		}
	}
}
$hxClasses["dropecho.dungen.generators._TunnelerGenerator.Tunneler"] = dropecho_dungen_generators__$TunnelerGenerator_Tunneler;
dropecho_dungen_generators__$TunnelerGenerator_Tunneler.__name__ = "dropecho.dungen.generators._TunnelerGenerator.Tunneler";
Object.assign(dropecho_dungen_generators__$TunnelerGenerator_Tunneler.prototype, {
	__class__: dropecho_dungen_generators__$TunnelerGenerator_Tunneler
	,map: null
	,position: null
	,width: null
	,direction: null
	,lifeSpan: null
});
class dropecho_dungen_generators_WALK_$PARAMS_$DEF {
	constructor() {
		this.seed = "0";
		this.start_fill_percent = 50;
		this.tile_wall = 0;
		this.tile_floor = 1;
		this.width = 64;
		this.height = 64;
	}
}
$hxClasses["dropecho.dungen.generators.WALK_PARAMS_DEF"] = dropecho_dungen_generators_WALK_$PARAMS_$DEF;
dropecho_dungen_generators_WALK_$PARAMS_$DEF.__name__ = "dropecho.dungen.generators.WALK_PARAMS_DEF";
Object.assign(dropecho_dungen_generators_WALK_$PARAMS_$DEF.prototype, {
	__class__: dropecho_dungen_generators_WALK_$PARAMS_$DEF
	,height: null
	,width: null
	,tile_floor: null
	,tile_wall: null
	,start_fill_percent: null
	,seed: null
});
class dropecho_dungen_generators_WalkGenerator {
	static generate(opts) {
		let params = dropecho_interop_Extender.defaults(new dropecho_dungen_generators_WALK_$PARAMS_$DEF(),opts);
		let random = new seedyrng_Random();
		random.setStringSeed(params.seed);
		let countOfFilled = 0;
		let totalCount = params.height * params.width;
		let map = new dropecho_dungen_Map2d(params.width,params.height,params.tile_wall);
		let walkerPos_x = params.width / 2 | 0;
		let walkerPos_y = params.height / 2 | 0;
		let index = map._width * walkerPos_y + walkerPos_x;
		map._mapData[index] = 0;
		let counter = 0;
		let direction = random.randomInt(0,3);
		while(countOfFilled < totalCount * (params.start_fill_percent / 100)) {
			direction = random.randomInt(0,3);
			if(map._mapData[map._width * walkerPos_y + walkerPos_x] != params.tile_floor) {
				let index = map._width * walkerPos_y + walkerPos_x;
				map._mapData[index] = params.tile_floor;
				++countOfFilled;
			}
			walkerPos_y += direction == 0 ? -1 : 0;
			walkerPos_y += direction == 2 ? 1 : 0;
			walkerPos_x += direction == 1 ? -1 : 0;
			walkerPos_x += direction == 3 ? 1 : 0;
			if(walkerPos_x < 0 || walkerPos_x > params.width - 1) {
				walkerPos_x = params.width / 2 | 0;
				walkerPos_y = params.height / 2 | 0;
			}
			if(walkerPos_y < 0 || walkerPos_y > params.height - 1) {
				walkerPos_x = params.width / 2 | 0;
				walkerPos_y = params.height / 2 | 0;
			}
			if(counter >= 500000) {
				break;
			}
			++counter;
		}
		return map;
	}
}
$hxClasses["dropecho.dungen.generators.WalkGenerator"] = $hx_exports["dungen"]["WalkGenerator"] = dropecho_dungen_generators_WalkGenerator;
dropecho_dungen_generators_WalkGenerator.__name__ = "dropecho.dungen.generators.WalkGenerator";
class dropecho_dungen_map_Map2dExtensions {
	static setAllEdgesTo(map,tileType) {
		if(tileType == null) {
			tileType = 0;
		}
		let _g = 0;
		let _g1 = map._width;
		while(_g < _g1) {
			let x = _g++;
			let index = map._width * 0 + x;
			map._mapData[index] = tileType;
			let index1 = map._width * (map._height - 1) + x;
			map._mapData[index1] = tileType;
		}
		let _g2 = 0;
		let _g3 = map._height;
		while(_g2 < _g3) {
			let y = _g2++;
			let index = map._width * y;
			map._mapData[index] = tileType;
			let index1 = map._width * y + (map._width - 1);
			map._mapData[index1] = tileType;
		}
	}
	static clone(map,mapData) {
		let clone = new dropecho_dungen_Map2d(map._width,map._height);
		if(mapData != null) {
			clone._mapData = mapData;
		} else {
			let _g = 0;
			let _g1 = map._mapData.length;
			while(_g < _g1) {
				let i = _g++;
				clone._mapData[i] = map._mapData[i];
			}
		}
		return clone;
	}
}
$hxClasses["dropecho.dungen.map.Map2dExtensions"] = $hx_exports["dungen"]["Map2dExtensions"] = dropecho_dungen_map_Map2dExtensions;
dropecho_dungen_map_Map2dExtensions.__name__ = "dropecho.dungen.map.Map2dExtensions";
class dropecho_dungen_map_Pattern extends dropecho_dungen_Map2d {
	constructor(size,initTileData) {
		dropecho_dungen_Map2d._hx_skip_constructor = true;
		super();
		dropecho_dungen_Map2d._hx_skip_constructor = false;
		this._hx_constructor(size,initTileData);
	}
	_hx_constructor(size,initTileData) {
		if(initTileData == null) {
			initTileData = 0;
		}
		this.hashes = [];
		this.patterns = [];
		super._hx_constructor(size,size,initTileData);
	}
	indexToMap(index) {
		if(index == null) {
			index = 0;
		}
		return dropecho_dungen_map_Map2dExtensions.clone(this,this.patterns[index]);
	}
	matchesIndex(map,x,y,tileToIgnore) {
		if(tileToIgnore == null) {
			tileToIgnore = -1;
		}
		let toMatch = dropecho_dungen_map_extensions_Utils.getRect(map,{ x : x, y : y, width : this._width, height : this._height});
		let match = false;
		let _g = 0;
		let _g1 = this.patterns.length;
		while(_g < _g1) {
			let p = _g++;
			let pattern = this.patterns[p];
			let _g1 = 0;
			let _g2 = pattern.length;
			while(_g1 < _g2) {
				let tile = _g1++;
				match = toMatch[tile] == pattern[tile] || pattern[tile] == tileToIgnore;
				if(!match) {
					break;
				}
			}
			if(match) {
				return p;
			}
		}
		return -1;
	}
	matches(map,x,y) {
		return this.matchesIndex(map,x,y) != -1;
	}
	buildVariations(symmetry) {
		if(symmetry == null) {
			symmetry = 255;
		}
		let n = this._width;
		let variations = [];
		variations[0] = this._mapData;
		let p = variations[0];
		let _g = [];
		let _g1 = 0;
		let _g2 = n;
		while(_g1 < _g2) {
			let y = _g1++;
			let _g2 = 0;
			let _g3 = n;
			while(_g2 < _g3) {
				let x = _g2++;
				_g.push(p[n - 1 - y + x * n]);
			}
		}
		variations[1] = _g;
		let p1 = variations[1];
		let _g3 = [];
		let _g4 = 0;
		let _g5 = n;
		while(_g4 < _g5) {
			let y = _g4++;
			let _g = 0;
			let _g1 = n;
			while(_g < _g1) {
				let x = _g++;
				_g3.push(p1[n - 1 - y + x * n]);
			}
		}
		variations[2] = _g3;
		let p2 = variations[2];
		let _g6 = [];
		let _g7 = 0;
		let _g8 = n;
		while(_g7 < _g8) {
			let y = _g7++;
			let _g = 0;
			let _g1 = n;
			while(_g < _g1) {
				let x = _g++;
				_g6.push(p2[n - 1 - y + x * n]);
			}
		}
		variations[3] = _g6;
		let p3 = variations[0];
		let _g9 = [];
		let _g10 = 0;
		let _g11 = n;
		while(_g10 < _g11) {
			let y = _g10++;
			let _g = 0;
			let _g1 = n;
			while(_g < _g1) {
				let x = _g++;
				_g9.push(p3[n - 1 - x + y * n]);
			}
		}
		variations[4] = _g9;
		let p4 = variations[1];
		let _g12 = [];
		let _g13 = 0;
		let _g14 = n;
		while(_g13 < _g14) {
			let y = _g13++;
			let _g = 0;
			let _g1 = n;
			while(_g < _g1) {
				let x = _g++;
				_g12.push(p4[n - 1 - x + y * n]);
			}
		}
		variations[5] = _g12;
		let p5 = variations[2];
		let _g15 = [];
		let _g16 = 0;
		let _g17 = n;
		while(_g16 < _g17) {
			let y = _g16++;
			let _g = 0;
			let _g1 = n;
			while(_g < _g1) {
				let x = _g++;
				_g15.push(p5[n - 1 - x + y * n]);
			}
		}
		variations[6] = _g15;
		let p6 = variations[3];
		let _g18 = [];
		let _g19 = 0;
		let _g20 = n;
		while(_g19 < _g20) {
			let y = _g19++;
			let _g = 0;
			let _g1 = n;
			while(_g < _g1) {
				let x = _g++;
				_g18.push(p6[n - 1 - x + y * n]);
			}
		}
		variations[7] = _g18;
		let tmp = this.hashes;
		let p7 = variations[0];
		let result = 0;
		let power = 1;
		let _g21 = 0;
		let _g22 = p7.length;
		while(_g21 < _g22) {
			let i = _g21++;
			result += p7[p7.length - 1 - i] != 0 ? power : 0;
			power *= 2;
		}
		tmp[0] = result;
		this.patterns[0] = variations[0];
		if((symmetry & 1) != 0) {
			let tmp = this.hashes;
			let p = variations[1];
			let result = 0;
			let power = 1;
			let _g = 0;
			let _g1 = p.length;
			while(_g < _g1) {
				let i = _g++;
				result += p[p.length - 1 - i] != 0 ? power : 0;
				power *= 2;
			}
			tmp[1] = result;
			this.patterns[1] = variations[1];
		}
		if((symmetry & 2) != 0) {
			let tmp = this.hashes;
			let p = variations[2];
			let result = 0;
			let power = 1;
			let _g = 0;
			let _g1 = p.length;
			while(_g < _g1) {
				let i = _g++;
				result += p[p.length - 1 - i] != 0 ? power : 0;
				power *= 2;
			}
			tmp[2] = result;
			this.patterns[2] = variations[2];
		}
		if((symmetry & 3) != 0) {
			let tmp = this.hashes;
			let p = variations[3];
			let result = 0;
			let power = 1;
			let _g = 0;
			let _g1 = p.length;
			while(_g < _g1) {
				let i = _g++;
				result += p[p.length - 1 - i] != 0 ? power : 0;
				power *= 2;
			}
			tmp[3] = result;
			this.patterns[3] = variations[3];
		}
		if((symmetry & 4) != 0) {
			let tmp = this.hashes;
			let p = variations[4];
			let result = 0;
			let power = 1;
			let _g = 0;
			let _g1 = p.length;
			while(_g < _g1) {
				let i = _g++;
				result += p[p.length - 1 - i] != 0 ? power : 0;
				power *= 2;
			}
			tmp[4] = result;
			this.patterns[4] = variations[4];
		}
		if((symmetry & 5) != 0) {
			let tmp = this.hashes;
			let p = variations[5];
			let result = 0;
			let power = 1;
			let _g = 0;
			let _g1 = p.length;
			while(_g < _g1) {
				let i = _g++;
				result += p[p.length - 1 - i] != 0 ? power : 0;
				power *= 2;
			}
			tmp[5] = result;
			this.patterns[5] = variations[5];
		}
		if((symmetry & 6) != 0) {
			let tmp = this.hashes;
			let p = variations[6];
			let result = 0;
			let power = 1;
			let _g = 0;
			let _g1 = p.length;
			while(_g < _g1) {
				let i = _g++;
				result += p[p.length - 1 - i] != 0 ? power : 0;
				power *= 2;
			}
			tmp[6] = result;
			this.patterns[6] = variations[6];
		}
		if((symmetry & 7) != 0) {
			let tmp = this.hashes;
			let p = variations[7];
			let result = 0;
			let power = 1;
			let _g = 0;
			let _g1 = p.length;
			while(_g < _g1) {
				let i = _g++;
				result += p[p.length - 1 - i] != 0 ? power : 0;
				power *= 2;
			}
			tmp[7] = result;
			this.patterns[7] = variations[7];
		}
	}
	static init(size,pattern,symmetry) {
		if(symmetry == null) {
			symmetry = 255;
		}
		let p = new dropecho_dungen_map_Pattern(size,0);
		p._mapData = pattern;
		p.buildVariations(symmetry);
		return p;
	}
}
$hxClasses["dropecho.dungen.map.Pattern"] = $hx_exports["dungen"]["Pattern"] = dropecho_dungen_map_Pattern;
dropecho_dungen_map_Pattern.__name__ = "dropecho.dungen.map.Pattern";
dropecho_dungen_map_Pattern.__super__ = dropecho_dungen_Map2d;
Object.assign(dropecho_dungen_map_Pattern.prototype, {
	__class__: dropecho_dungen_map_Pattern
	,patterns: null
	,hashes: null
});
class dropecho_dungen_map_extensions_CheckConnectivity {
	static checkConnectivity(map,tile,diagonal) {
		if(diagonal == null) {
			diagonal = true;
		}
		if(tile == null) {
			tile = 0;
		}
		let firstTile = dropecho_dungen_map_extensions_GetFirstTileOfType.getFirstTileOfType(map,tile);
		if(firstTile == null) {
			return false;
		}
		let filledTiles = dropecho_dungen_map_extensions_FloodFill.floodFill(map,firstTile.x,firstTile.y,tile,diagonal);
		firstTile = dropecho_dungen_map_extensions_GetFirstTileOfType.getFirstTileOfType(map,tile,filledTiles);
		return firstTile == null;
	}
}
$hxClasses["dropecho.dungen.map.extensions.CheckConnectivity"] = $hx_exports["dungen"]["CheckConnectivity"] = dropecho_dungen_map_extensions_CheckConnectivity;
dropecho_dungen_map_extensions_CheckConnectivity.__name__ = "dropecho.dungen.map.extensions.CheckConnectivity";
class dropecho_dungen_map_extensions_DistanceFill {
	static distanceFill(map,tile,diagonal,maxDepth) {
		if(maxDepth == null) {
			maxDepth = 40;
		}
		if(diagonal == null) {
			diagonal = true;
		}
		if(tile == null) {
			tile = 0;
		}
		let distanceMap = new dropecho_dungen_Map2d(map._width,map._height);
		let _g = 0;
		let _g1 = map._mapData.length;
		while(_g < _g1) {
			let i = _g++;
			distanceMap._mapData[i] = map._mapData[i] == tile ? 0 : 999;
		}
		let pass = 0;
		let changes = 1;
		while(changes > 0 && pass++ < maxDepth) {
			changes = 0;
			let _g = 0;
			let _g1 = distanceMap._width;
			while(_g < _g1) {
				let x = _g++;
				let _g1 = 0;
				let _g2 = distanceMap._height;
				while(_g1 < _g2) {
					let y = _g1++;
					let neighbors = dropecho_dungen_map_extensions_Neighbors.getNeighbors(distanceMap,x,y,1);
					let _g = 0;
					while(_g < neighbors.length) {
						let n = neighbors[_g];
						++_g;
						let v = distanceMap._mapData[distanceMap._width * y + x];
						let nval = distanceMap._mapData[distanceMap._width * n.y + n.x];
						if(nval < v) {
							let index = distanceMap._width * y + x;
							distanceMap._mapData[index] = nval + 1;
							++changes;
						}
					}
				}
			}
		}
		return distanceMap;
	}
}
$hxClasses["dropecho.dungen.map.extensions.DistanceFill"] = $hx_exports["dungen"]["DistanceFill"] = dropecho_dungen_map_extensions_DistanceFill;
dropecho_dungen_map_extensions_DistanceFill.__name__ = "dropecho.dungen.map.extensions.DistanceFill";
class dropecho_dungen_map_extensions_FindAndReplace {
	static findAndReplace(map,pattern1,pattern2,ignoreTile) {
		if(ignoreTile == null) {
			ignoreTile = -1;
		}
		let _g = 0;
		let _g1 = map._width;
		while(_g < _g1) {
			let x = _g++;
			let _g1 = 0;
			let _g2 = map._height;
			while(_g1 < _g2) {
				let y = _g1++;
				let patternIndex = pattern1.matchesIndex(map,x,y);
				if(patternIndex != -1) {
					let splat = pattern2.indexToMap(patternIndex);
					dropecho_dungen_map_extensions_Splat.splat(map,splat,x,y,ignoreTile);
				}
			}
		}
		return map;
	}
}
$hxClasses["dropecho.dungen.map.extensions.FindAndReplace"] = $hx_exports["dungen"]["FindAndReplace"] = dropecho_dungen_map_extensions_FindAndReplace;
dropecho_dungen_map_extensions_FindAndReplace.__name__ = "dropecho.dungen.map.extensions.FindAndReplace";
class dropecho_dungen_map_extensions_FloodFill {
	static floodFill(map,startX,startY,tile,diagonal) {
		if(diagonal == null) {
			diagonal = true;
		}
		if(tile == null) {
			tile = 0;
		}
		let closed = new haxe_ds_IntMap();
		let open = [];
		let neighbors = [];
		let currentTile = map.IndexToXY(map._width * startY + startX);
		open.push(currentTile);
		let whereHasNotBeenVisited = function(tile) {
			return closed.h[map._width * tile.y + tile.x] == null;
		};
		let whereTileIsSameType = function(t) {
			return map._mapData[map._width * t.y + t.x] == tile;
		};
		while(open.length > 0) {
			currentTile = open.pop();
			closed.h[map._width * currentTile.y + currentTile.x] = currentTile;
			let _this = dropecho_dungen_map_extensions_Neighbors.getNeighbors(map,currentTile.x,currentTile.y,1,diagonal);
			let f = whereHasNotBeenVisited;
			let _g = [];
			let _g1 = 0;
			let _g2 = _this;
			while(_g1 < _g2.length) {
				let v = _g2[_g1];
				++_g1;
				if(f(v)) {
					_g.push(v);
				}
			}
			let f1 = whereTileIsSameType;
			let _g3 = [];
			let _g4 = 0;
			let _g5 = _g;
			while(_g4 < _g5.length) {
				let v = _g5[_g4];
				++_g4;
				if(f1(v)) {
					_g3.push(v);
				}
			}
			neighbors = _g3;
			open = open.concat(neighbors);
		}
		return Lambda.array(closed);
	}
}
$hxClasses["dropecho.dungen.map.extensions.FloodFill"] = $hx_exports["dungen"]["FloodFill"] = dropecho_dungen_map_extensions_FloodFill;
dropecho_dungen_map_extensions_FloodFill.__name__ = "dropecho.dungen.map.extensions.FloodFill";
class dropecho_dungen_map_extensions_GetFirstTileOfType {
	static getFirstTileOfType(map,tile,ignore) {
		if(tile == null) {
			tile = 0;
		}
		let _g = 0;
		let _g1 = map._height * map._width;
		while(_g < _g1) {
			let i = _g++;
			if(map._mapData[i] == tile) {
				let cur = map.IndexToXY(i);
				if(ignore != null) {
					let foo = Lambda.find(ignore,function(tile) {
						if(tile.x == cur.x) {
							return tile.y == cur.y;
						} else {
							return false;
						}
					});
					if(foo != null) {
						continue;
					}
				}
				return cur;
			}
		}
		return null;
	}
}
$hxClasses["dropecho.dungen.map.extensions.GetFirstTileOfType"] = $hx_exports["dungen"]["GetFirstTileOfType"] = dropecho_dungen_map_extensions_GetFirstTileOfType;
dropecho_dungen_map_extensions_GetFirstTileOfType.__name__ = "dropecho.dungen.map.extensions.GetFirstTileOfType";
class dropecho_dungen_map_extensions_Neighbors {
	static getNeighborCount(map,x,y,neighborType,dist,diagonal) {
		if(diagonal == null) {
			diagonal = true;
		}
		if(dist == null) {
			dist = 1;
		}
		let isNeighborType = function(tile) {
			return map._mapData[map._width * tile.y + tile.x] == neighborType;
		};
		return Lambda.count(dropecho_dungen_map_extensions_Neighbors.getNeighbors(map,x,y,dist,diagonal),isNeighborType);
	}
	static getNeighbors(map,x,y,dist,diagonal) {
		if(diagonal == null) {
			diagonal = true;
		}
		if(dist == null) {
			dist = 1;
		}
		let neighbors = [];
		let isSelf = false;
		let isNotOnMap = false;
		let _g = -dist;
		let _g1 = dist + 1;
		while(_g < _g1) {
			let i = _g++;
			let _g1 = -dist;
			let _g2 = dist + 1;
			while(_g1 < _g2) {
				let j = _g1++;
				isSelf = i == 0 && j == 0;
				isNotOnMap = x + i < 0 || x + i >= map._width || y + j < 0 || y + j >= map._height;
				if(isSelf || isNotOnMap) {
					continue;
				}
				if(!diagonal && (i == j || i == -dist && j == dist || j == -dist && i == dist)) {
					continue;
				}
				let val = map._mapData[map._width * (y + j) + (x + i)];
				neighbors.push(new dropecho_dungen_Tile2d(x + i,y + j,val));
			}
		}
		return neighbors;
	}
}
$hxClasses["dropecho.dungen.map.extensions.Neighbors"] = $hx_exports["dungen"]["Neighbors"] = dropecho_dungen_map_extensions_Neighbors;
dropecho_dungen_map_extensions_Neighbors.__name__ = "dropecho.dungen.map.extensions.Neighbors";
class dropecho_dungen_map_extensions_Queue {
	constructor() {
		this.data = [];
	}
	enqueue(value) {
		this.data.unshift(value);
	}
	dequeue() {
		return this.data.pop();
	}
	length() {
		return this.data.length;
	}
}
$hxClasses["dropecho.dungen.map.extensions.Queue"] = dropecho_dungen_map_extensions_Queue;
dropecho_dungen_map_extensions_Queue.__name__ = "dropecho.dungen.map.extensions.Queue";
Object.assign(dropecho_dungen_map_extensions_Queue.prototype, {
	__class__: dropecho_dungen_map_extensions_Queue
	,data: null
});
class dropecho_dungen_map_extensions_RegionFill {
	static BFS(map,x,y,value) {
		let q = new dropecho_dungen_map_extensions_Queue();
		let visited_h = { };
		q.enqueue(new dropecho_dungen_Tile2d(x,y));
		visited_h[map._width * y + x] = -1;
		let currentIndex = -1;
		while(q.length() > 0) {
			let current = q.dequeue();
			if(map._mapData[map._width * current.y + current.x] == value) {
				break;
			}
			currentIndex = map._width * current.y + current.x;
			let neighbors = dropecho_dungen_map_extensions_Neighbors.getNeighbors(map,current.x,current.y);
			let _g = 0;
			while(_g < neighbors.length) {
				let neighbor = neighbors[_g];
				++_g;
				let index = map._width * neighbor.y + neighbor.x;
				if(!visited_h.hasOwnProperty(index)) {
					visited_h[index] = currentIndex;
					q.enqueue(neighbor);
				}
			}
		}
		let path = [];
		while(currentIndex != -1) {
			currentIndex = visited_h[currentIndex];
			if(currentIndex != -1) {
				path.push(map.IndexToXY(currentIndex));
			}
		}
		return path;
	}
	static distToValue(map,x,y,value) {
		let count = 0;
		let dist = 0;
		while(count == 0 && dist < 10) {
			++dist;
			count = dropecho_dungen_map_extensions_Neighbors.getNeighborCount(map,x,y,value,dist);
		}
		return dist - 1;
	}
	static regionFill(map,wall,diagonal) {
		if(diagonal == null) {
			diagonal = true;
		}
		if(wall == null) {
			wall = 0;
		}
		let regionMapWallValue = 999999;
		let regionMap = new dropecho_dungen_Map2d(map._width,map._height);
		let _g = 0;
		let _g1 = map._mapData.length;
		while(_g < _g1) {
			let i = _g++;
			if(map._mapData[i] == wall) {
				regionMap._mapData[i] = regionMapWallValue;
			} else {
				regionMap._mapData[i] = map._mapData[i];
			}
		}
		let _g2 = 0;
		let _g3 = regionMap._mapData.length;
		while(_g2 < _g3) {
			let i = _g2++;
			if(regionMap._mapData[i] == regionMapWallValue) {
				continue;
			}
			let tile = regionMap.IndexToXY(i);
			regionMap._mapData[i] = dropecho_dungen_map_extensions_RegionFill.distToValue(regionMap,tile.x,tile.y,regionMapWallValue);
		}
		return regionMap;
	}
}
$hxClasses["dropecho.dungen.map.extensions.RegionFill"] = $hx_exports["dungen"]["RegionFill"] = dropecho_dungen_map_extensions_RegionFill;
dropecho_dungen_map_extensions_RegionFill.__name__ = "dropecho.dungen.map.extensions.RegionFill";
class dropecho_dungen_map_extensions_RegionManager {
	static removeIslandsBySize(map,size,tileType) {
		if(tileType == null) {
			tileType = 1;
		}
		if(size == null) {
			size = 4;
		}
		let cleanedMap = new dropecho_dungen_Map2d(map._width,map._height);
		let nextTile;
		let visited = [];
		let _g = 0;
		let _g1 = map._mapData.length;
		while(_g < _g1) {
			let i = _g++;
			cleanedMap._mapData[i] = map._mapData[i];
		}
		while(true) {
			nextTile = dropecho_dungen_map_extensions_GetFirstTileOfType.getFirstTileOfType(cleanedMap,tileType,visited);
			if(!(nextTile != null)) {
				break;
			}
			let tiles = dropecho_dungen_map_extensions_FloodFill.floodFill(cleanedMap,nextTile.x,nextTile.y,tileType);
			let isIsland = tiles.length <= size;
			if(isIsland) {
				visited.push(nextTile);
			}
			let _g = 0;
			while(_g < tiles.length) {
				let t = tiles[_g];
				++_g;
				if(isIsland) {
					let index = cleanedMap._width * t.y + t.x;
					cleanedMap._mapData[index] = 0;
				} else {
					visited.push(t);
				}
			}
		}
		return cleanedMap;
	}
	static removeIslands(map,tileType) {
		if(tileType == null) {
			tileType = 1;
		}
		let nextTile;
		let visited = [];
		let cleanedMap = new dropecho_dungen_Map2d(map._width,map._height);
		let _g = 0;
		let _g1 = map._mapData.length;
		while(_g < _g1) {
			let i = _g++;
			cleanedMap._mapData[i] = map._mapData[i];
		}
		while(true) {
			nextTile = dropecho_dungen_map_extensions_GetFirstTileOfType.getFirstTileOfType(cleanedMap,tileType,visited);
			if(!(nextTile != null)) {
				break;
			}
			visited.push(nextTile);
			let tiles = dropecho_dungen_map_extensions_FloodFill.floodFill(cleanedMap,nextTile.x,nextTile.y,tileType);
			let isIsland = true;
			let _g = 0;
			while(_g < tiles.length) {
				let t = tiles[_g];
				++_g;
				if(dropecho_dungen_map_extensions_Neighbors.getNeighborCount(map,t.x,t.y,tileType) + dropecho_dungen_map_extensions_Neighbors.getNeighborCount(map,t.x,t.y,0) != 8) {
					isIsland = false;
					break;
				}
			}
			if(isIsland) {
				let _g = 0;
				while(_g < tiles.length) {
					let t = tiles[_g];
					++_g;
					let index = cleanedMap._width * t.y + t.x;
					cleanedMap._mapData[index] = 0;
				}
			}
		}
		return cleanedMap;
	}
	static findAndTagBorders(map,borderType,startTag) {
		if(startTag == null) {
			startTag = 2;
		}
		if(borderType == null) {
			borderType = 1;
		}
		let borderMap = new dropecho_dungen_Map2d(map._width,map._height);
		let _g = 0;
		let _g1 = map._mapData.length;
		while(_g < _g1) {
			let i = _g++;
			borderMap._mapData[i] = map._mapData[i] != borderType ? 0 : 1;
		}
		let nextBorder;
		let nextTag = startTag;
		while(true) {
			nextBorder = dropecho_dungen_map_extensions_GetFirstTileOfType.getFirstTileOfType(borderMap,borderType);
			if(!(nextBorder != null)) {
				break;
			}
			let _g = 0;
			let _g1 = dropecho_dungen_map_extensions_FloodFill.floodFill(borderMap,nextBorder.x,nextBorder.y,borderType);
			while(_g < _g1.length) {
				let t = _g1[_g];
				++_g;
				let index = borderMap._width * t.y + t.x;
				borderMap._mapData[index] = nextTag;
			}
			++nextTag;
		}
		return borderMap;
	}
	static findAndTagRegions(map,depth) {
		if(depth == null) {
			depth = 2;
		}
		let regionmap = new dropecho_dungen_Map2d(map._width,map._height,0);
		let _g = 0;
		let _g1 = map._mapData.length;
		while(_g < _g1) {
			let i = _g++;
			let val = map._mapData[i] > depth ? depth : map._mapData[i];
			regionmap._mapData[i] = val;
		}
		let nextRegion;
		let nextTag = depth + 1;
		while(true) {
			nextRegion = dropecho_dungen_map_extensions_GetFirstTileOfType.getFirstTileOfType(regionmap,depth);
			if(!(nextRegion != null)) {
				break;
			}
			let _g = 0;
			let _g1 = dropecho_dungen_map_extensions_FloodFill.floodFill(regionmap,nextRegion.x,nextRegion.y,depth);
			while(_g < _g1.length) {
				let t = _g1[_g];
				++_g;
				let index = regionmap._width * t.y + t.x;
				regionmap._mapData[index] = nextTag;
			}
			++nextTag;
		}
		return regionmap;
	}
	static expandRegionsByOne(map,startTag) {
		if(startTag == null) {
			startTag = 3;
		}
		let tilesToPaint = new haxe_ds_IntMap();
		let _g = 0;
		let _g1 = map._width;
		while(_g < _g1) {
			let x = _g++;
			let _g1 = 0;
			let _g2 = map._height;
			while(_g1 < _g2) {
				let y = _g1++;
				let tileVal = map._mapData[map._width * y + x];
				if(tileVal < startTag) {
					let neighbors = dropecho_dungen_map_extensions_Neighbors.getNeighbors(map,x,y);
					let _g = 0;
					while(_g < neighbors.length) {
						let n = neighbors[_g];
						++_g;
						if(n.val >= startTag) {
							tilesToPaint.h[map._width * y + x] = n.val;
						}
					}
				}
			}
		}
		let map1 = tilesToPaint;
		let _g2_map = map1;
		let _g2_keys = map1.keys();
		while(_g2_keys.hasNext()) {
			let key = _g2_keys.next();
			let _g3_value = _g2_map.get(key);
			let _g3_key = key;
			let index = _g3_key;
			let value = _g3_value;
			map._mapData[index] = value;
		}
		return map;
	}
	static expandRegions(map,startTag,eatWalls) {
		if(eatWalls == null) {
			eatWalls = false;
		}
		if(startTag == null) {
			startTag = 3;
		}
		let _g = 0;
		while(_g < 100) {
			let _ = _g++;
			let _g1 = startTag;
			let _g2 = startTag + 500;
			while(_g1 < _g2) {
				let currentTag = _g1++;
				let tilesToPaint = [];
				let _g = 0;
				let _g2 = map._width;
				while(_g < _g2) {
					let x = _g++;
					let _g1 = 0;
					let _g2 = map._height;
					while(_g1 < _g2) {
						let y = _g1++;
						if(map._mapData[map._width * y + x] == currentTag) {
							let neighbors = dropecho_dungen_map_extensions_Neighbors.getNeighbors(map,x,y,1,true);
							let _g = 0;
							while(_g < neighbors.length) {
								let n = neighbors[_g];
								++_g;
								if(n.val < startTag) {
									if(!eatWalls && n.val == 0) {
										continue;
									}
									let nWalls = dropecho_dungen_map_extensions_Neighbors.getNeighborCount(map,n.x,n.y,0,1,true);
									let nOpen = 0;
									let _g = 1;
									let _g1 = startTag;
									while(_g < _g1) {
										let i = _g++;
										nOpen += dropecho_dungen_map_extensions_Neighbors.getNeighborCount(map,n.x,n.y,i,1,true);
									}
									let nTag = dropecho_dungen_map_extensions_Neighbors.getNeighborCount(map,n.x,n.y,currentTag,1,true);
									if(nWalls + nOpen + nTag == 8) {
										tilesToPaint.push(map._width * n.y + n.x);
									}
								}
							}
						}
					}
				}
				let _g3 = 0;
				while(_g3 < tilesToPaint.length) {
					let c = tilesToPaint[_g3];
					++_g3;
					map._mapData[c] = currentTag;
				}
			}
		}
		return map;
	}
}
$hxClasses["dropecho.dungen.map.extensions.RegionManager"] = $hx_exports["dungen"]["RegionManager"] = dropecho_dungen_map_extensions_RegionManager;
dropecho_dungen_map_extensions_RegionManager.__name__ = "dropecho.dungen.map.extensions.RegionManager";
class dropecho_dungen_map_extensions_Splat {
	static splat(map,other,x,y,ignoreTile) {
		if(ignoreTile == null) {
			ignoreTile = -1;
		}
		let _g = 0;
		let _g1 = other._width;
		while(_g < _g1) {
			let x2 = _g++;
			let _g1 = 0;
			let _g2 = other._height;
			while(_g1 < _g2) {
				let y2 = _g1++;
				let otherTile = other._mapData[other._width * y2 + x2];
				if(otherTile != ignoreTile) {
					let index = map._width * (y2 + y) + (x2 + x);
					map._mapData[index] = otherTile;
				}
			}
		}
	}
}
$hxClasses["dropecho.dungen.map.extensions.Splat"] = dropecho_dungen_map_extensions_Splat;
dropecho_dungen_map_extensions_Splat.__name__ = "dropecho.dungen.map.extensions.Splat";
class dropecho_dungen_map_extensions_Utils {
	static getRect(map,rect,wrap) {
		if(wrap == null) {
			wrap = false;
		}
		let _g = [];
		let _g1 = rect.y;
		let _g2 = rect.y + rect.height;
		while(_g1 < _g2) {
			let j = _g1++;
			let _g2 = rect.x;
			let _g3 = rect.x + rect.width;
			while(_g2 < _g3) {
				let i = _g2++;
				if(wrap) {
					_g.push(map._mapData[map._width * (j % map._height) + i % map._width]);
				} else {
					_g.push(map._mapData[map._width * j + i]);
				}
			}
		}
		return _g;
	}
	static setRect(map,rect,data) {
		let _g = rect.y;
		let _g1 = rect.y + rect.height + 1;
		while(_g < _g1) {
			let j = _g++;
			let _g1 = rect.x;
			let _g2 = rect.x + rect.width + 1;
			while(_g1 < _g2) {
				let i = _g1++;
				let index = map._width * j + i;
				map._mapData[index] = data;
			}
		}
	}
	static checkOverlap(r1,r2) {
		let r1p1_x = r1.x;
		let r1p1_y = r1.y;
		let r1p2_x = r1.x + r1.width;
		let r1p2_y = r1.y + r1.height;
		let r2p1_x = r2.x;
		let r2p1_y = r2.y;
		let r2p2_x = r2.x + r2.width;
		let r2p2_y = r2.y + r2.height;
		return !(r1p1_x > r2p2_x || r2p1_x > r1p2_x || r1p1_y > r2p2_y || r2p1_y > r1p2_y);
	}
	static contains(r1,r2) {
		let r1p1_x = r1.x;
		let r1p1_y = r1.y;
		let r1p2_x = r1.x + r1.width;
		let r1p2_y = r1.y + r1.height;
		let r2p1_x = r2.x;
		let r2p1_y = r2.y;
		let r2p2_x = r2.x + r2.width;
		let r2p2_y = r2.y + r2.height;
		if(r2p2_x < r1p2_x && r2p2_y < r1p2_y && r2p1_x > r1p1_x) {
			return r2p1_y > r1p1_y;
		} else {
			return false;
		}
	}
	static isOverlappingArray(r1,a) {
		let _g = 0;
		while(_g < a.length) {
			let r = a[_g];
			++_g;
			if(r == r1) {
				continue;
			}
			if(dropecho_dungen_map_extensions_Utils.checkOverlap(r1,r)) {
				return true;
			}
		}
		return false;
	}
}
$hxClasses["dropecho.dungen.map.extensions.Utils"] = dropecho_dungen_map_extensions_Utils;
dropecho_dungen_map_extensions_Utils.__name__ = "dropecho.dungen.map.extensions.Utils";
class dropecho_interop_AbstractArray {
	static _new(a) {
		let this1;
		if(a != null) {
			this1 = a;
		} else {
			this1 = [];
		}
		return this1;
	}
	static get(this1,i) {
		return this1[i];
	}
	static set(this1,i,v) {
		return this1[i] = v;
	}
	static fromAny(d) {
		let arr = js_Boot.__cast(d , Array);
		let _g = [];
		let _g1 = 0;
		while(_g1 < arr.length) {
			let v = arr[_g1];
			++_g1;
			_g.push(v);
		}
		return dropecho_interop_AbstractArray._new(_g);
	}
}
class dropecho_interop_JSAbstractMapKeyValueIterator {
	constructor(map) {
		this._iter = new haxe_iterators_DynamicAccessKeyValueIterator(map);
	}
	hasNext() {
		let _this = this._iter;
		return _this.index < _this.keys.length;
	}
	next() {
		let _this = this._iter;
		let key = _this.keys[_this.index++];
		return { value : _this.access[key], key : key};
	}
}
$hxClasses["dropecho.interop.JSAbstractMapKeyValueIterator"] = dropecho_interop_JSAbstractMapKeyValueIterator;
dropecho_interop_JSAbstractMapKeyValueIterator.__name__ = "dropecho.interop.JSAbstractMapKeyValueIterator";
Object.assign(dropecho_interop_JSAbstractMapKeyValueIterator.prototype, {
	__class__: dropecho_interop_JSAbstractMapKeyValueIterator
	,_iter: null
});
class dropecho_interop_AbstractMap {
	static _new(s) {
		let this1;
		if(s != null) {
			this1 = s;
		} else {
			let this2 = { };
			this1 = this2;
		}
		return this1;
	}
	static keyValueIterator(this1) {
		return new dropecho_interop_JSAbstractMapKeyValueIterator(this1);
	}
	static fromMap(map) {
		let abs = dropecho_interop_AbstractMap._new();
		let _g = map.keyValueIterator();
		while(_g.hasNext()) {
			let _g1 = _g.next();
			let k = _g1.key;
			let v = _g1.value;
			abs[Std.string(k)] = v;
		}
		return abs;
	}
	static fromIMap(map) {
		let abs = dropecho_interop_AbstractMap._new();
		let _g = map.keyValueIterator();
		while(_g.hasNext()) {
			let _g1 = _g.next();
			let k = _g1.key;
			let v = _g1.value;
			abs[Std.string(k)] = v;
		}
		return abs;
	}
	static exists(this1,key) {
		return Object.prototype.hasOwnProperty.call(this1,Std.string(key));
	}
	static get(this1,key) {
		return this1[Std.string(key)];
	}
	static set(this1,key,value) {
		this1[Std.string(key)] = value;
		return value;
	}
	static clear(this1) {
		let _g = 0;
		let _g1 = Reflect.fields(this1);
		while(_g < _g1.length) {
			let key = _g1[_g];
			++_g;
			Reflect.deleteField(this1,key);
		}
	}
}
class dropecho_interop_Extender {
	static extendThis(base,extension) {
		if(extension == null) {
			return;
		}
		let _g = 0;
		let _g1 = Reflect.fields(base);
		while(_g < _g1.length) {
			let f = _g1[_g];
			++_g;
			let def = Reflect.field(base,f);
			let opt = Reflect.field(extension,f);
			base[f] = opt != null ? opt : def;
		}
	}
	static defaults(base,extension) {
		if(base == null) {
			throw haxe_Exception.thrown("Base cannot be null.");
		}
		if(extension == null) {
			return base;
		}
		let extensions = [];
		if(((extension) instanceof Array)) {
			extensions = extension.filter(function(x) {
				return x != null;
			});
		} else {
			extensions.push(extension);
		}
		let _g = 0;
		while(_g < extensions.length) {
			let ex = extensions[_g];
			++_g;
			let fields = Reflect.fields(ex);
			let exType = js_Boot.getClass(ex);
			let typeFields;
			if(exType != null) {
				let _this = Type.getInstanceFields(exType);
				let result = new Array(_this.length);
				let _g = 0;
				let _g1 = _this.length;
				while(_g < _g1) {
					let i = _g++;
					let f = _this[i];
					let typeFields;
					if(f.startsWith("get_") || f.startsWith("set_")) {
						let parts = f.split("_");
						parts.shift();
						typeFields = parts.join("_");
					} else {
						typeFields = f;
					}
					result[i] = typeFields;
				}
				typeFields = result;
			} else {
				typeFields = [];
			}
			if(fields.length == 0) {
				fields = typeFields;
			}
			let baseFields = [];
			let baseClass = js_Boot.getClass(base);
			if(baseClass != null) {
				baseFields = Type.getInstanceFields(baseClass);
			}
			let _g1 = 0;
			while(_g1 < fields.length) {
				let ff = fields[_g1];
				++_g1;
				let exField = Reflect.field(ex,ff);
				let baseField = Reflect.field(base,ff);
				let bfIsArray = dropecho_interop_Extender.isArray(baseField);
				let bfIsMap = dropecho_interop_Extender.isMap(baseField);
				let bfIsObject = !bfIsArray && !bfIsMap && dropecho_interop_Extender.isObject(baseField);
				if(bfIsArray) {
					let copy = dropecho_interop_AbstractArray.fromAny(exField);
					let _g = 0;
					let _g1 = copy;
					while(_g < _g1.length) {
						let v = _g1[_g];
						++_g;
						baseField.push(v);
					}
				} else if(bfIsMap) {
					let abs = dropecho_interop_AbstractMap._new();
					let _g = exField.keyValueIterator();
					while(_g.hasNext()) {
						let _g1 = _g.next();
						let k = _g1.key;
						let v = _g1.value;
						abs[Std.string(k)] = v;
					}
					let copy = abs;
					let _g1 = new dropecho_interop_JSAbstractMapKeyValueIterator(copy);
					while(_g1.hasNext()) {
						let _g = _g1.next();
						let k = _g.key;
						let v = _g.value;
						baseField.set(k,v);
					}
				} else if(bfIsObject) {
					dropecho_interop_Extender.defaults(baseField,exField);
				} else {
					try {
						base[ff] = exField;
					} catch( _g ) {
						haxe_NativeStackTrace.lastError = _g;
						let ex = haxe_Exception.caught(_g).unwrap();
						haxe_Log.trace("FAILED SETTING PROP: " + ff + " error: " + Std.string(ex),{ fileName : "dropecho/interop/Extender.hx", lineNumber : 85, className : "dropecho.interop.Extender", methodName : "defaults"});
					}
				}
			}
		}
		return base;
	}
	static isObject(obj) {
		let stdis = Reflect.isObject(obj);
		let type = js_Boot.getClass(obj);
		let name = type != null ? type.__name__ : "";
		let refis = name != "String";
		if(stdis) {
			return refis;
		} else {
			return false;
		}
	}
	static isArray(obj) {
		return ((obj) instanceof Array);
	}
	static isMap(obj) {
		if(((obj) instanceof Map)) {
			return true;
		}
		let type = js_Boot.getClass(obj);
		let name = type != null ? type.__name__ : "";
		if(name == null) {
			name = "";
		}
		let isMap = name.startsWith("haxe.ds.") && name.endsWith("Map");
		return isMap;
	}
}
$hxClasses["dropecho.interop.Extender"] = dropecho_interop_Extender;
dropecho_interop_Extender.__name__ = "dropecho.interop.Extender";
var haxe_StackItem = $hxEnums["haxe.StackItem"] = { __ename__:"haxe.StackItem",__constructs__:null
	,CFunction: {_hx_name:"CFunction",_hx_index:0,__enum__:"haxe.StackItem",toString:$estr}
	,Module: ($_=function(m) { return {_hx_index:1,m:m,__enum__:"haxe.StackItem",toString:$estr}; },$_._hx_name="Module",$_.__params__ = ["m"],$_)
	,FilePos: ($_=function(s,file,line,column) { return {_hx_index:2,s:s,file:file,line:line,column:column,__enum__:"haxe.StackItem",toString:$estr}; },$_._hx_name="FilePos",$_.__params__ = ["s","file","line","column"],$_)
	,Method: ($_=function(classname,method) { return {_hx_index:3,classname:classname,method:method,__enum__:"haxe.StackItem",toString:$estr}; },$_._hx_name="Method",$_.__params__ = ["classname","method"],$_)
	,LocalFunction: ($_=function(v) { return {_hx_index:4,v:v,__enum__:"haxe.StackItem",toString:$estr}; },$_._hx_name="LocalFunction",$_.__params__ = ["v"],$_)
};
haxe_StackItem.__constructs__ = [haxe_StackItem.CFunction,haxe_StackItem.Module,haxe_StackItem.FilePos,haxe_StackItem.Method,haxe_StackItem.LocalFunction];
haxe_StackItem.__empty_constructs__ = [haxe_StackItem.CFunction];
class haxe_CallStack {
	static get_length(this1) {
		return this1.length;
	}
	static callStack() {
		return haxe_NativeStackTrace.toHaxe(haxe_NativeStackTrace.callStack());
	}
	static exceptionStack(fullStack) {
		if(fullStack == null) {
			fullStack = false;
		}
		let eStack = haxe_NativeStackTrace.toHaxe(haxe_NativeStackTrace.exceptionStack());
		return fullStack ? eStack : haxe_CallStack.subtract(eStack,haxe_CallStack.callStack());
	}
	static toString(stack) {
		let b = new StringBuf();
		let _g = 0;
		let _g1 = stack;
		while(_g < _g1.length) {
			let s = _g1[_g];
			++_g;
			b.b += "\nCalled from ";
			haxe_CallStack.itemToString(b,s);
		}
		return b.b;
	}
	static subtract(this1,stack) {
		let startIndex = -1;
		let i = -1;
		while(++i < this1.length) {
			let _g = 0;
			let _g1 = stack.length;
			while(_g < _g1) {
				let j = _g++;
				if(haxe_CallStack.equalItems(this1[i],stack[j])) {
					if(startIndex < 0) {
						startIndex = i;
					}
					++i;
					if(i >= this1.length) {
						break;
					}
				} else {
					startIndex = -1;
				}
			}
			if(startIndex >= 0) {
				break;
			}
		}
		if(startIndex >= 0) {
			return this1.slice(0,startIndex);
		} else {
			return this1;
		}
	}
	static copy(this1) {
		return this1.slice();
	}
	static get(this1,index) {
		return this1[index];
	}
	static asArray(this1) {
		return this1;
	}
	static equalItems(item1,item2) {
		if(item1 == null) {
			if(item2 == null) {
				return true;
			} else {
				return false;
			}
		} else {
			switch(item1._hx_index) {
			case 0:
				if(item2 == null) {
					return false;
				} else if(item2._hx_index == 0) {
					return true;
				} else {
					return false;
				}
				break;
			case 1:
				if(item2 == null) {
					return false;
				} else if(item2._hx_index == 1) {
					let m2 = item2.m;
					let m1 = item1.m;
					return m1 == m2;
				} else {
					return false;
				}
				break;
			case 2:
				if(item2 == null) {
					return false;
				} else if(item2._hx_index == 2) {
					let item21 = item2.s;
					let file2 = item2.file;
					let line2 = item2.line;
					let col2 = item2.column;
					let col1 = item1.column;
					let line1 = item1.line;
					let file1 = item1.file;
					let item11 = item1.s;
					if(file1 == file2 && line1 == line2 && col1 == col2) {
						return haxe_CallStack.equalItems(item11,item21);
					} else {
						return false;
					}
				} else {
					return false;
				}
				break;
			case 3:
				if(item2 == null) {
					return false;
				} else if(item2._hx_index == 3) {
					let class2 = item2.classname;
					let method2 = item2.method;
					let method1 = item1.method;
					let class1 = item1.classname;
					if(class1 == class2) {
						return method1 == method2;
					} else {
						return false;
					}
				} else {
					return false;
				}
				break;
			case 4:
				if(item2 == null) {
					return false;
				} else if(item2._hx_index == 4) {
					let v2 = item2.v;
					let v1 = item1.v;
					return v1 == v2;
				} else {
					return false;
				}
				break;
			}
		}
	}
	static exceptionToString(e) {
		if(e.get_previous() == null) {
			let tmp = "Exception: " + e.toString();
			let tmp1 = e.get_stack();
			return tmp + (tmp1 == null ? "null" : haxe_CallStack.toString(tmp1));
		}
		let result = "";
		let e1 = e;
		let prev = null;
		while(e1 != null) {
			if(prev == null) {
				let result1 = "Exception: " + e1.get_message();
				let tmp = e1.get_stack();
				result = result1 + (tmp == null ? "null" : haxe_CallStack.toString(tmp)) + result;
			} else {
				let prevStack = haxe_CallStack.subtract(e1.get_stack(),prev.get_stack());
				result = "Exception: " + e1.get_message() + (prevStack == null ? "null" : haxe_CallStack.toString(prevStack)) + "\n\nNext " + result;
			}
			prev = e1;
			e1 = e1.get_previous();
		}
		return result;
	}
	static itemToString(b,s) {
		switch(s._hx_index) {
		case 0:
			b.b += "a C function";
			break;
		case 1:
			let m = s.m;
			b.b += "module ";
			b.b += m == null ? "null" : "" + m;
			break;
		case 2:
			let s1 = s.s;
			let file = s.file;
			let line = s.line;
			let col = s.column;
			if(s1 != null) {
				haxe_CallStack.itemToString(b,s1);
				b.b += " (";
			}
			b.b += file == null ? "null" : "" + file;
			b.b += " line ";
			b.b += line == null ? "null" : "" + line;
			if(col != null) {
				b.b += " column ";
				b.b += col == null ? "null" : "" + col;
			}
			if(s1 != null) {
				b.b += ")";
			}
			break;
		case 3:
			let cname = s.classname;
			let meth = s.method;
			b.b += Std.string(cname == null ? "<unknown>" : cname);
			b.b += ".";
			b.b += meth == null ? "null" : "" + meth;
			break;
		case 4:
			let n = s.v;
			b.b += "local function #";
			b.b += n == null ? "null" : "" + n;
			break;
		}
	}
}
haxe_CallStack.__properties__ = {get_length: "get_length"};
class haxe_IMap {
}
$hxClasses["haxe.IMap"] = haxe_IMap;
haxe_IMap.__name__ = "haxe.IMap";
haxe_IMap.__isInterface__ = true;
Object.assign(haxe_IMap.prototype, {
	__class__: haxe_IMap
	,get: null
	,set: null
	,exists: null
	,remove: null
	,keys: null
	,iterator: null
	,keyValueIterator: null
	,copy: null
	,toString: null
	,clear: null
});
class haxe_DynamicAccess {
	static _new() {
		let this1 = { };
		return this1;
	}
	static get(this1,key) {
		return this1[key];
	}
	static set(this1,key,value) {
		return this1[key] = value;
	}
	static exists(this1,key) {
		return Object.prototype.hasOwnProperty.call(this1,key);
	}
	static remove(this1,key) {
		return Reflect.deleteField(this1,key);
	}
	static keys(this1) {
		return Reflect.fields(this1);
	}
	static copy(this1) {
		return Reflect.copy(this1);
	}
	static iterator(this1) {
		return new haxe_iterators_DynamicAccessIterator(this1);
	}
	static keyValueIterator(this1) {
		return new haxe_iterators_DynamicAccessKeyValueIterator(this1);
	}
}
class haxe_Exception extends Error {
	constructor(message,previous,native) {
		super(message);
		this.message = message;
		this.__previousException = previous;
		this.__nativeException = native != null ? native : this;
		this.__skipStack = 0;
		let old = Error.prepareStackTrace;
		Error.prepareStackTrace = function(e) { return e.stack; }
		if(((native) instanceof Error)) {
			this.stack = native.stack;
		} else {
			let e = null;
			if(Error.captureStackTrace) {
				Error.captureStackTrace(this,haxe_Exception);
				e = this;
			} else {
				e = new Error();
				if(typeof(e.stack) == "undefined") {
					try { throw e; } catch(_) {}
					this.__skipStack++;
				}
			}
			this.stack = e.stack;
		}
		Error.prepareStackTrace = old;
	}
	unwrap() {
		return this.__nativeException;
	}
	toString() {
		return this.get_message();
	}
	details() {
		if(this.get_previous() == null) {
			let tmp = "Exception: " + this.toString();
			let tmp1 = this.get_stack();
			return tmp + (tmp1 == null ? "null" : haxe_CallStack.toString(tmp1));
		} else {
			let result = "";
			let e = this;
			let prev = null;
			while(e != null) {
				if(prev == null) {
					let result1 = "Exception: " + e.get_message();
					let tmp = e.get_stack();
					result = result1 + (tmp == null ? "null" : haxe_CallStack.toString(tmp)) + result;
				} else {
					let prevStack = haxe_CallStack.subtract(e.get_stack(),prev.get_stack());
					result = "Exception: " + e.get_message() + (prevStack == null ? "null" : haxe_CallStack.toString(prevStack)) + "\n\nNext " + result;
				}
				prev = e;
				e = e.get_previous();
			}
			return result;
		}
	}
	__shiftStack() {
		this.__skipStack++;
	}
	get_message() {
		return this.message;
	}
	get_previous() {
		return this.__previousException;
	}
	get_native() {
		return this.__nativeException;
	}
	get_stack() {
		let _g = this.__exceptionStack;
		if(_g == null) {
			let value = haxe_NativeStackTrace.toHaxe(haxe_NativeStackTrace.normalize(this.stack),this.__skipStack);
			this.setProperty("__exceptionStack",value);
			return value;
		} else {
			let s = _g;
			return s;
		}
	}
	setProperty(name,value) {
		try {
			Object.defineProperty(this,name,{ value : value});
		} catch( _g ) {
			this[name] = value;
		}
	}
	get___exceptionStack() {
		return this.__exceptionStack;
	}
	set___exceptionStack(value) {
		this.setProperty("__exceptionStack",value);
		return value;
	}
	get___skipStack() {
		return this.__skipStack;
	}
	set___skipStack(value) {
		this.setProperty("__skipStack",value);
		return value;
	}
	get___nativeException() {
		return this.__nativeException;
	}
	set___nativeException(value) {
		this.setProperty("__nativeException",value);
		return value;
	}
	get___previousException() {
		return this.__previousException;
	}
	set___previousException(value) {
		this.setProperty("__previousException",value);
		return value;
	}
	static caught(value) {
		if(((value) instanceof haxe_Exception)) {
			return value;
		} else if(((value) instanceof Error)) {
			return new haxe_Exception(value.message,null,value);
		} else {
			return new haxe_ValueException(value,null,value);
		}
	}
	static thrown(value) {
		if(((value) instanceof haxe_Exception)) {
			return value.get_native();
		} else if(((value) instanceof Error)) {
			return value;
		} else {
			let e = new haxe_ValueException(value);
			e.__skipStack++;
			return e;
		}
	}
}
$hxClasses["haxe.Exception"] = haxe_Exception;
haxe_Exception.__name__ = "haxe.Exception";
haxe_Exception.__super__ = Error;
Object.assign(haxe_Exception.prototype, {
	__class__: haxe_Exception
	,__skipStack: null
	,__nativeException: null
	,__previousException: null
	,__properties__: {set___exceptionStack: "set___exceptionStack",get___exceptionStack: "get___exceptionStack",get_native: "get_native",get_previous: "get_previous",get_stack: "get_stack",get_message: "get_message"}
});
class haxe_Int32 {
	static negate(this1) {
		return ~this1 + 1 | 0;
	}
	static preIncrement(this1) {
		this1 = ++this1 | 0;
		return this1;
	}
	static postIncrement(this1) {
		let ret = this1++;
		this1 |= 0;
		return ret;
	}
	static preDecrement(this1) {
		this1 = --this1 | 0;
		return this1;
	}
	static postDecrement(this1) {
		let ret = this1--;
		this1 |= 0;
		return ret;
	}
	static add(a,b) {
		return a + b | 0;
	}
	static addInt(a,b) {
		return a + b | 0;
	}
	static sub(a,b) {
		return a - b | 0;
	}
	static subInt(a,b) {
		return a - b | 0;
	}
	static intSub(a,b) {
		return a - b | 0;
	}
	static mul(a,b) {
		return haxe_Int32._mul(a,b);
	}
	static mulInt(a,b) {
		return haxe_Int32._mul(a,b);
	}
	static toFloat(this1) {
		return this1;
	}
	static ucompare(a,b) {
		if(a < 0) {
			if(b < 0) {
				return ~b - ~a | 0;
			} else {
				return 1;
			}
		}
		if(b < 0) {
			return -1;
		} else {
			return a - b | 0;
		}
	}
	static clamp(x) {
		return x | 0;
	}
}
class haxe_Int64 {
	static _new(x) {
		let this1 = x;
		return this1;
	}
	static copy(this1) {
		let this2 = new haxe__$Int64__$_$_$Int64(this1.high,this1.low);
		return this2;
	}
	static make(high,low) {
		let this1 = new haxe__$Int64__$_$_$Int64(high,low);
		return this1;
	}
	static ofInt(x) {
		let this1 = new haxe__$Int64__$_$_$Int64(x >> 31,x);
		return this1;
	}
	static toInt(x) {
		if(x.high != x.low >> 31) {
			throw haxe_Exception.thrown("Overflow");
		}
		return x.low;
	}
	static is(val) {
		return ((val) instanceof haxe__$Int64__$_$_$Int64);
	}
	static isInt64(val) {
		return ((val) instanceof haxe__$Int64__$_$_$Int64);
	}
	static getHigh(x) {
		return x.high;
	}
	static getLow(x) {
		return x.low;
	}
	static isNeg(x) {
		return x.high < 0;
	}
	static isZero(x) {
		let b_high = 0;
		let b_low = 0;
		if(x.high == b_high) {
			return x.low == b_low;
		} else {
			return false;
		}
	}
	static compare(a,b) {
		let v = a.high - b.high | 0;
		if(v == 0) {
			v = haxe_Int32.ucompare(a.low,b.low);
		}
		if(a.high < 0) {
			if(b.high < 0) {
				return v;
			} else {
				return -1;
			}
		} else if(b.high >= 0) {
			return v;
		} else {
			return 1;
		}
	}
	static ucompare(a,b) {
		let v = haxe_Int32.ucompare(a.high,b.high);
		if(v != 0) {
			return v;
		} else {
			return haxe_Int32.ucompare(a.low,b.low);
		}
	}
	static toStr(x) {
		return haxe_Int64.toString(x);
	}
	static toString(this1) {
		let i = this1;
		let b_high = 0;
		let b_low = 0;
		if(i.high == b_high && i.low == b_low) {
			return "0";
		}
		let str = "";
		let neg = false;
		if(i.high < 0) {
			neg = true;
		}
		let this2 = new haxe__$Int64__$_$_$Int64(0,10);
		let ten = this2;
		while(true) {
			let b_high = 0;
			let b_low = 0;
			if(!(i.high != b_high || i.low != b_low)) {
				break;
			}
			let r = haxe_Int64.divMod(i,ten);
			if(r.modulus.high < 0) {
				let x = r.modulus;
				let high = ~x.high;
				let low = ~x.low + 1 | 0;
				if(low == 0) {
					let ret = high++;
					high = high | 0;
				}
				let this_high = high;
				let this_low = low;
				str = this_low + str;
				let x1 = r.quotient;
				let high1 = ~x1.high;
				let low1 = ~x1.low + 1 | 0;
				if(low1 == 0) {
					let ret = high1++;
					high1 = high1 | 0;
				}
				let this1 = new haxe__$Int64__$_$_$Int64(high1,low1);
				i = this1;
			} else {
				str = r.modulus.low + str;
				i = r.quotient;
			}
		}
		if(neg) {
			str = "-" + str;
		}
		return str;
	}
	static parseString(sParam) {
		return haxe_Int64Helper.parseString(sParam);
	}
	static fromFloat(f) {
		return haxe_Int64Helper.fromFloat(f);
	}
	static divMod(dividend,divisor) {
		if(divisor.high == 0) {
			switch(divisor.low) {
			case 0:
				throw haxe_Exception.thrown("divide by zero");
			case 1:
				let this1 = new haxe__$Int64__$_$_$Int64(dividend.high,dividend.low);
				let this2 = new haxe__$Int64__$_$_$Int64(0,0);
				return { quotient : this1, modulus : this2};
			}
		}
		let divSign = dividend.high < 0 != divisor.high < 0;
		let modulus;
		if(dividend.high < 0) {
			let high = ~dividend.high;
			let low = ~dividend.low + 1 | 0;
			if(low == 0) {
				let ret = high++;
				high = high | 0;
			}
			let this1 = new haxe__$Int64__$_$_$Int64(high,low);
			modulus = this1;
		} else {
			let this1 = new haxe__$Int64__$_$_$Int64(dividend.high,dividend.low);
			modulus = this1;
		}
		if(divisor.high < 0) {
			let high = ~divisor.high;
			let low = ~divisor.low + 1 | 0;
			if(low == 0) {
				let ret = high++;
				high = high | 0;
			}
			let this1 = new haxe__$Int64__$_$_$Int64(high,low);
			divisor = this1;
		}
		let this3 = new haxe__$Int64__$_$_$Int64(0,0);
		let quotient = this3;
		let this4 = new haxe__$Int64__$_$_$Int64(0,1);
		let mask = this4;
		while(!(divisor.high < 0)) {
			let v = haxe_Int32.ucompare(divisor.high,modulus.high);
			let cmp = v != 0 ? v : haxe_Int32.ucompare(divisor.low,modulus.low);
			let b = 1;
			b &= 63;
			if(b == 0) {
				let this1 = new haxe__$Int64__$_$_$Int64(divisor.high,divisor.low);
				divisor = this1;
			} else if(b < 32) {
				let this1 = new haxe__$Int64__$_$_$Int64(divisor.high << b | divisor.low >>> 32 - b,divisor.low << b);
				divisor = this1;
			} else {
				let this1 = new haxe__$Int64__$_$_$Int64(divisor.low << b - 32,0);
				divisor = this1;
			}
			let b1 = 1;
			b1 &= 63;
			if(b1 == 0) {
				let this1 = new haxe__$Int64__$_$_$Int64(mask.high,mask.low);
				mask = this1;
			} else if(b1 < 32) {
				let this1 = new haxe__$Int64__$_$_$Int64(mask.high << b1 | mask.low >>> 32 - b1,mask.low << b1);
				mask = this1;
			} else {
				let this1 = new haxe__$Int64__$_$_$Int64(mask.low << b1 - 32,0);
				mask = this1;
			}
			if(cmp >= 0) {
				break;
			}
		}
		while(true) {
			let b_high = 0;
			let b_low = 0;
			if(!(mask.high != b_high || mask.low != b_low)) {
				break;
			}
			let v = haxe_Int32.ucompare(modulus.high,divisor.high);
			if((v != 0 ? v : haxe_Int32.ucompare(modulus.low,divisor.low)) >= 0) {
				let this1 = new haxe__$Int64__$_$_$Int64(quotient.high | mask.high,quotient.low | mask.low);
				quotient = this1;
				let high = modulus.high - divisor.high | 0;
				let low = modulus.low - divisor.low | 0;
				if(haxe_Int32.ucompare(modulus.low,divisor.low) < 0) {
					let ret = high--;
					high = high | 0;
				}
				let this2 = new haxe__$Int64__$_$_$Int64(high,low);
				modulus = this2;
			}
			let b = 1;
			b &= 63;
			if(b == 0) {
				let this1 = new haxe__$Int64__$_$_$Int64(mask.high,mask.low);
				mask = this1;
			} else if(b < 32) {
				let this1 = new haxe__$Int64__$_$_$Int64(mask.high >>> b,mask.high << 32 - b | mask.low >>> b);
				mask = this1;
			} else {
				let this1 = new haxe__$Int64__$_$_$Int64(0,mask.high >>> b - 32);
				mask = this1;
			}
			let b1 = 1;
			b1 &= 63;
			if(b1 == 0) {
				let this1 = new haxe__$Int64__$_$_$Int64(divisor.high,divisor.low);
				divisor = this1;
			} else if(b1 < 32) {
				let this1 = new haxe__$Int64__$_$_$Int64(divisor.high >>> b1,divisor.high << 32 - b1 | divisor.low >>> b1);
				divisor = this1;
			} else {
				let this1 = new haxe__$Int64__$_$_$Int64(0,divisor.high >>> b1 - 32);
				divisor = this1;
			}
		}
		if(divSign) {
			let high = ~quotient.high;
			let low = ~quotient.low + 1 | 0;
			if(low == 0) {
				let ret = high++;
				high = high | 0;
			}
			let this1 = new haxe__$Int64__$_$_$Int64(high,low);
			quotient = this1;
		}
		if(dividend.high < 0) {
			let high = ~modulus.high;
			let low = ~modulus.low + 1 | 0;
			if(low == 0) {
				let ret = high++;
				high = high | 0;
			}
			let this1 = new haxe__$Int64__$_$_$Int64(high,low);
			modulus = this1;
		}
		return { quotient : quotient, modulus : modulus};
	}
	static neg(x) {
		let high = ~x.high;
		let low = ~x.low + 1 | 0;
		if(low == 0) {
			let ret = high++;
			high = high | 0;
		}
		let this1 = new haxe__$Int64__$_$_$Int64(high,low);
		return this1;
	}
	static preIncrement(this1) {
		let this2 = new haxe__$Int64__$_$_$Int64(this1.high,this1.low);
		this1 = this2;
		let ret = this1.low++;
		this1.low = this1.low | 0;
		if(this1.low == 0) {
			let ret = this1.high++;
			this1.high = this1.high | 0;
		}
		return this1;
	}
	static postIncrement(this1) {
		let ret = this1;
		let this2 = new haxe__$Int64__$_$_$Int64(this1.high,this1.low);
		this1 = this2;
		let ret1 = this1.low++;
		this1.low = this1.low | 0;
		if(this1.low == 0) {
			let ret = this1.high++;
			this1.high = this1.high | 0;
		}
		return ret;
	}
	static preDecrement(this1) {
		let this2 = new haxe__$Int64__$_$_$Int64(this1.high,this1.low);
		this1 = this2;
		if(this1.low == 0) {
			let ret = this1.high--;
			this1.high = this1.high | 0;
		}
		let ret = this1.low--;
		this1.low = this1.low | 0;
		return this1;
	}
	static postDecrement(this1) {
		let ret = this1;
		let this2 = new haxe__$Int64__$_$_$Int64(this1.high,this1.low);
		this1 = this2;
		if(this1.low == 0) {
			let ret = this1.high--;
			this1.high = this1.high | 0;
		}
		let ret1 = this1.low--;
		this1.low = this1.low | 0;
		return ret;
	}
	static add(a,b) {
		let high = a.high + b.high | 0;
		let low = a.low + b.low | 0;
		if(haxe_Int32.ucompare(low,a.low) < 0) {
			let ret = high++;
			high = high | 0;
		}
		let this1 = new haxe__$Int64__$_$_$Int64(high,low);
		return this1;
	}
	static addInt(a,b) {
		let b_high = b >> 31;
		let b_low = b;
		let high = a.high + b_high | 0;
		let low = a.low + b_low | 0;
		if(haxe_Int32.ucompare(low,a.low) < 0) {
			let ret = high++;
			high = high | 0;
		}
		let this1 = new haxe__$Int64__$_$_$Int64(high,low);
		return this1;
	}
	static sub(a,b) {
		let high = a.high - b.high | 0;
		let low = a.low - b.low | 0;
		if(haxe_Int32.ucompare(a.low,b.low) < 0) {
			let ret = high--;
			high = high | 0;
		}
		let this1 = new haxe__$Int64__$_$_$Int64(high,low);
		return this1;
	}
	static subInt(a,b) {
		let b_high = b >> 31;
		let b_low = b;
		let high = a.high - b_high | 0;
		let low = a.low - b_low | 0;
		if(haxe_Int32.ucompare(a.low,b_low) < 0) {
			let ret = high--;
			high = high | 0;
		}
		let this1 = new haxe__$Int64__$_$_$Int64(high,low);
		return this1;
	}
	static intSub(a,b) {
		let a_high = a >> 31;
		let a_low = a;
		let high = a_high - b.high | 0;
		let low = a_low - b.low | 0;
		if(haxe_Int32.ucompare(a_low,b.low) < 0) {
			let ret = high--;
			high = high | 0;
		}
		let this1 = new haxe__$Int64__$_$_$Int64(high,low);
		return this1;
	}
	static mul(a,b) {
		let mask = 65535;
		let al = a.low & mask;
		let ah = a.low >>> 16;
		let bl = b.low & mask;
		let bh = b.low >>> 16;
		let p00 = haxe_Int32._mul(al,bl);
		let p10 = haxe_Int32._mul(ah,bl);
		let p01 = haxe_Int32._mul(al,bh);
		let p11 = haxe_Int32._mul(ah,bh);
		let low = p00;
		let high = (p11 + (p01 >>> 16) | 0) + (p10 >>> 16) | 0;
		p01 <<= 16;
		low = low + p01 | 0;
		if(haxe_Int32.ucompare(low,p01) < 0) {
			let ret = high++;
			high = high | 0;
		}
		p10 <<= 16;
		low = low + p10 | 0;
		if(haxe_Int32.ucompare(low,p10) < 0) {
			let ret = high++;
			high = high | 0;
		}
		high = high + (haxe_Int32._mul(a.low,b.high) + haxe_Int32._mul(a.high,b.low) | 0) | 0;
		let this1 = new haxe__$Int64__$_$_$Int64(high,low);
		return this1;
	}
	static mulInt(a,b) {
		let b_high = b >> 31;
		let b_low = b;
		let mask = 65535;
		let al = a.low & mask;
		let ah = a.low >>> 16;
		let bl = b_low & mask;
		let bh = b_low >>> 16;
		let p00 = haxe_Int32._mul(al,bl);
		let p10 = haxe_Int32._mul(ah,bl);
		let p01 = haxe_Int32._mul(al,bh);
		let p11 = haxe_Int32._mul(ah,bh);
		let low = p00;
		let high = (p11 + (p01 >>> 16) | 0) + (p10 >>> 16) | 0;
		p01 <<= 16;
		low = low + p01 | 0;
		if(haxe_Int32.ucompare(low,p01) < 0) {
			let ret = high++;
			high = high | 0;
		}
		p10 <<= 16;
		low = low + p10 | 0;
		if(haxe_Int32.ucompare(low,p10) < 0) {
			let ret = high++;
			high = high | 0;
		}
		high = high + (haxe_Int32._mul(a.low,b_high) + haxe_Int32._mul(a.high,b_low) | 0) | 0;
		let this1 = new haxe__$Int64__$_$_$Int64(high,low);
		return this1;
	}
	static div(a,b) {
		return haxe_Int64.divMod(a,b).quotient;
	}
	static divInt(a,b) {
		let this1 = new haxe__$Int64__$_$_$Int64(b >> 31,b);
		return haxe_Int64.divMod(a,this1).quotient;
	}
	static intDiv(a,b) {
		let this1 = new haxe__$Int64__$_$_$Int64(a >> 31,a);
		let x = haxe_Int64.divMod(this1,b).quotient;
		if(x.high != x.low >> 31) {
			throw haxe_Exception.thrown("Overflow");
		}
		let x1 = x.low;
		let this2 = new haxe__$Int64__$_$_$Int64(x1 >> 31,x1);
		return this2;
	}
	static mod(a,b) {
		return haxe_Int64.divMod(a,b).modulus;
	}
	static modInt(a,b) {
		let this1 = new haxe__$Int64__$_$_$Int64(b >> 31,b);
		let x = haxe_Int64.divMod(a,this1).modulus;
		if(x.high != x.low >> 31) {
			throw haxe_Exception.thrown("Overflow");
		}
		let x1 = x.low;
		let this2 = new haxe__$Int64__$_$_$Int64(x1 >> 31,x1);
		return this2;
	}
	static intMod(a,b) {
		let this1 = new haxe__$Int64__$_$_$Int64(a >> 31,a);
		let x = haxe_Int64.divMod(this1,b).modulus;
		if(x.high != x.low >> 31) {
			throw haxe_Exception.thrown("Overflow");
		}
		let x1 = x.low;
		let this2 = new haxe__$Int64__$_$_$Int64(x1 >> 31,x1);
		return this2;
	}
	static eq(a,b) {
		if(a.high == b.high) {
			return a.low == b.low;
		} else {
			return false;
		}
	}
	static eqInt(a,b) {
		let b_high = b >> 31;
		let b_low = b;
		if(a.high == b_high) {
			return a.low == b_low;
		} else {
			return false;
		}
	}
	static neq(a,b) {
		if(a.high == b.high) {
			return a.low != b.low;
		} else {
			return true;
		}
	}
	static neqInt(a,b) {
		let b_high = b >> 31;
		let b_low = b;
		if(a.high == b_high) {
			return a.low != b_low;
		} else {
			return true;
		}
	}
	static lt(a,b) {
		let v = a.high - b.high | 0;
		if(v == 0) {
			v = haxe_Int32.ucompare(a.low,b.low);
		}
		return (a.high < 0 ? b.high < 0 ? v : -1 : b.high >= 0 ? v : 1) < 0;
	}
	static ltInt(a,b) {
		let b_high = b >> 31;
		let b_low = b;
		let v = a.high - b_high | 0;
		if(v == 0) {
			v = haxe_Int32.ucompare(a.low,b_low);
		}
		return (a.high < 0 ? b_high < 0 ? v : -1 : b_high >= 0 ? v : 1) < 0;
	}
	static intLt(a,b) {
		let a_high = a >> 31;
		let a_low = a;
		let v = a_high - b.high | 0;
		if(v == 0) {
			v = haxe_Int32.ucompare(a_low,b.low);
		}
		return (a_high < 0 ? b.high < 0 ? v : -1 : b.high >= 0 ? v : 1) < 0;
	}
	static lte(a,b) {
		let v = a.high - b.high | 0;
		if(v == 0) {
			v = haxe_Int32.ucompare(a.low,b.low);
		}
		return (a.high < 0 ? b.high < 0 ? v : -1 : b.high >= 0 ? v : 1) <= 0;
	}
	static lteInt(a,b) {
		let b_high = b >> 31;
		let b_low = b;
		let v = a.high - b_high | 0;
		if(v == 0) {
			v = haxe_Int32.ucompare(a.low,b_low);
		}
		return (a.high < 0 ? b_high < 0 ? v : -1 : b_high >= 0 ? v : 1) <= 0;
	}
	static intLte(a,b) {
		let a_high = a >> 31;
		let a_low = a;
		let v = a_high - b.high | 0;
		if(v == 0) {
			v = haxe_Int32.ucompare(a_low,b.low);
		}
		return (a_high < 0 ? b.high < 0 ? v : -1 : b.high >= 0 ? v : 1) <= 0;
	}
	static gt(a,b) {
		let v = a.high - b.high | 0;
		if(v == 0) {
			v = haxe_Int32.ucompare(a.low,b.low);
		}
		return (a.high < 0 ? b.high < 0 ? v : -1 : b.high >= 0 ? v : 1) > 0;
	}
	static gtInt(a,b) {
		let b_high = b >> 31;
		let b_low = b;
		let v = a.high - b_high | 0;
		if(v == 0) {
			v = haxe_Int32.ucompare(a.low,b_low);
		}
		return (a.high < 0 ? b_high < 0 ? v : -1 : b_high >= 0 ? v : 1) > 0;
	}
	static intGt(a,b) {
		let a_high = a >> 31;
		let a_low = a;
		let v = a_high - b.high | 0;
		if(v == 0) {
			v = haxe_Int32.ucompare(a_low,b.low);
		}
		return (a_high < 0 ? b.high < 0 ? v : -1 : b.high >= 0 ? v : 1) > 0;
	}
	static gte(a,b) {
		let v = a.high - b.high | 0;
		if(v == 0) {
			v = haxe_Int32.ucompare(a.low,b.low);
		}
		return (a.high < 0 ? b.high < 0 ? v : -1 : b.high >= 0 ? v : 1) >= 0;
	}
	static gteInt(a,b) {
		let b_high = b >> 31;
		let b_low = b;
		let v = a.high - b_high | 0;
		if(v == 0) {
			v = haxe_Int32.ucompare(a.low,b_low);
		}
		return (a.high < 0 ? b_high < 0 ? v : -1 : b_high >= 0 ? v : 1) >= 0;
	}
	static intGte(a,b) {
		let a_high = a >> 31;
		let a_low = a;
		let v = a_high - b.high | 0;
		if(v == 0) {
			v = haxe_Int32.ucompare(a_low,b.low);
		}
		return (a_high < 0 ? b.high < 0 ? v : -1 : b.high >= 0 ? v : 1) >= 0;
	}
	static complement(a) {
		let this1 = new haxe__$Int64__$_$_$Int64(~a.high,~a.low);
		return this1;
	}
	static and(a,b) {
		let this1 = new haxe__$Int64__$_$_$Int64(a.high & b.high,a.low & b.low);
		return this1;
	}
	static or(a,b) {
		let this1 = new haxe__$Int64__$_$_$Int64(a.high | b.high,a.low | b.low);
		return this1;
	}
	static xor(a,b) {
		let this1 = new haxe__$Int64__$_$_$Int64(a.high ^ b.high,a.low ^ b.low);
		return this1;
	}
	static shl(a,b) {
		b &= 63;
		if(b == 0) {
			let this1 = new haxe__$Int64__$_$_$Int64(a.high,a.low);
			return this1;
		} else if(b < 32) {
			let this1 = new haxe__$Int64__$_$_$Int64(a.high << b | a.low >>> 32 - b,a.low << b);
			return this1;
		} else {
			let this1 = new haxe__$Int64__$_$_$Int64(a.low << b - 32,0);
			return this1;
		}
	}
	static shr(a,b) {
		b &= 63;
		if(b == 0) {
			let this1 = new haxe__$Int64__$_$_$Int64(a.high,a.low);
			return this1;
		} else if(b < 32) {
			let this1 = new haxe__$Int64__$_$_$Int64(a.high >> b,a.high << 32 - b | a.low >>> b);
			return this1;
		} else {
			let this1 = new haxe__$Int64__$_$_$Int64(a.high >> 31,a.high >> b - 32);
			return this1;
		}
	}
	static ushr(a,b) {
		b &= 63;
		if(b == 0) {
			let this1 = new haxe__$Int64__$_$_$Int64(a.high,a.low);
			return this1;
		} else if(b < 32) {
			let this1 = new haxe__$Int64__$_$_$Int64(a.high >>> b,a.high << 32 - b | a.low >>> b);
			return this1;
		} else {
			let this1 = new haxe__$Int64__$_$_$Int64(0,a.high >>> b - 32);
			return this1;
		}
	}
	static get_high(this1) {
		return this1.high;
	}
	static set_high(this1,x) {
		return this1.high = x;
	}
	static get_low(this1) {
		return this1.low;
	}
	static set_low(this1,x) {
		return this1.low = x;
	}
}
haxe_Int64.__properties__ = {get_low: "get_low",get_high: "get_high"};
class haxe__$Int64__$_$_$Int64 {
	constructor(high,low) {
		this.high = high;
		this.low = low;
	}
	toString() {
		return haxe_Int64.toString(this);
	}
}
$hxClasses["haxe._Int64.___Int64"] = haxe__$Int64__$_$_$Int64;
haxe__$Int64__$_$_$Int64.__name__ = "haxe._Int64.___Int64";
Object.assign(haxe__$Int64__$_$_$Int64.prototype, {
	__class__: haxe__$Int64__$_$_$Int64
	,high: null
	,low: null
});
class haxe_Int64Helper {
	static parseString(sParam) {
		let base_high = 0;
		let base_low = 10;
		let this1 = new haxe__$Int64__$_$_$Int64(0,0);
		let current = this1;
		let this2 = new haxe__$Int64__$_$_$Int64(0,1);
		let multiplier = this2;
		let sIsNegative = false;
		let s = StringTools.trim(sParam);
		if(s.charAt(0) == "-") {
			sIsNegative = true;
			s = s.substring(1,s.length);
		}
		let len = s.length;
		let _g = 0;
		let _g1 = len;
		while(_g < _g1) {
			let i = _g++;
			let digitInt = HxOverrides.cca(s,len - 1 - i) - 48;
			if(digitInt < 0 || digitInt > 9) {
				throw haxe_Exception.thrown("NumberFormatError");
			}
			if(digitInt != 0) {
				let digit_high = digitInt >> 31;
				let digit_low = digitInt;
				if(sIsNegative) {
					let mask = 65535;
					let al = multiplier.low & mask;
					let ah = multiplier.low >>> 16;
					let bl = digit_low & mask;
					let bh = digit_low >>> 16;
					let p00 = haxe_Int32._mul(al,bl);
					let p10 = haxe_Int32._mul(ah,bl);
					let p01 = haxe_Int32._mul(al,bh);
					let p11 = haxe_Int32._mul(ah,bh);
					let low = p00;
					let high = (p11 + (p01 >>> 16) | 0) + (p10 >>> 16) | 0;
					p01 <<= 16;
					low = low + p01 | 0;
					if(haxe_Int32.ucompare(low,p01) < 0) {
						let ret = high++;
						high = high | 0;
					}
					p10 <<= 16;
					low = low + p10 | 0;
					if(haxe_Int32.ucompare(low,p10) < 0) {
						let ret = high++;
						high = high | 0;
					}
					high = high + (haxe_Int32._mul(multiplier.low,digit_high) + haxe_Int32._mul(multiplier.high,digit_low) | 0) | 0;
					let b_high = high;
					let b_low = low;
					let high1 = current.high - b_high | 0;
					let low1 = current.low - b_low | 0;
					if(haxe_Int32.ucompare(current.low,b_low) < 0) {
						let ret = high1--;
						high1 = high1 | 0;
					}
					let this1 = new haxe__$Int64__$_$_$Int64(high1,low1);
					current = this1;
					if(!(current.high < 0)) {
						throw haxe_Exception.thrown("NumberFormatError: Underflow");
					}
				} else {
					let mask = 65535;
					let al = multiplier.low & mask;
					let ah = multiplier.low >>> 16;
					let bl = digit_low & mask;
					let bh = digit_low >>> 16;
					let p00 = haxe_Int32._mul(al,bl);
					let p10 = haxe_Int32._mul(ah,bl);
					let p01 = haxe_Int32._mul(al,bh);
					let p11 = haxe_Int32._mul(ah,bh);
					let low = p00;
					let high = (p11 + (p01 >>> 16) | 0) + (p10 >>> 16) | 0;
					p01 <<= 16;
					low = low + p01 | 0;
					if(haxe_Int32.ucompare(low,p01) < 0) {
						let ret = high++;
						high = high | 0;
					}
					p10 <<= 16;
					low = low + p10 | 0;
					if(haxe_Int32.ucompare(low,p10) < 0) {
						let ret = high++;
						high = high | 0;
					}
					high = high + (haxe_Int32._mul(multiplier.low,digit_high) + haxe_Int32._mul(multiplier.high,digit_low) | 0) | 0;
					let b_high = high;
					let b_low = low;
					let high1 = current.high + b_high | 0;
					let low1 = current.low + b_low | 0;
					if(haxe_Int32.ucompare(low1,current.low) < 0) {
						let ret = high1++;
						high1 = high1 | 0;
					}
					let this1 = new haxe__$Int64__$_$_$Int64(high1,low1);
					current = this1;
					if(current.high < 0) {
						throw haxe_Exception.thrown("NumberFormatError: Overflow");
					}
				}
			}
			let mask = 65535;
			let al = multiplier.low & mask;
			let ah = multiplier.low >>> 16;
			let bl = base_low & mask;
			let bh = base_low >>> 16;
			let p00 = haxe_Int32._mul(al,bl);
			let p10 = haxe_Int32._mul(ah,bl);
			let p01 = haxe_Int32._mul(al,bh);
			let p11 = haxe_Int32._mul(ah,bh);
			let low = p00;
			let high = (p11 + (p01 >>> 16) | 0) + (p10 >>> 16) | 0;
			p01 <<= 16;
			low = low + p01 | 0;
			if(haxe_Int32.ucompare(low,p01) < 0) {
				let ret = high++;
				high = high | 0;
			}
			p10 <<= 16;
			low = low + p10 | 0;
			if(haxe_Int32.ucompare(low,p10) < 0) {
				let ret = high++;
				high = high | 0;
			}
			high = high + (haxe_Int32._mul(multiplier.low,base_high) + haxe_Int32._mul(multiplier.high,base_low) | 0) | 0;
			let this1 = new haxe__$Int64__$_$_$Int64(high,low);
			multiplier = this1;
		}
		return current;
	}
	static fromFloat(f) {
		if(isNaN(f) || !isFinite(f)) {
			throw haxe_Exception.thrown("Number is NaN or Infinite");
		}
		let noFractions = f - f % 1;
		if(noFractions > 9007199254740991) {
			throw haxe_Exception.thrown("Conversion overflow");
		}
		if(noFractions < -9007199254740991) {
			throw haxe_Exception.thrown("Conversion underflow");
		}
		let this1 = new haxe__$Int64__$_$_$Int64(0,0);
		let result = this1;
		let neg = noFractions < 0;
		let rest = neg ? -noFractions : noFractions;
		let i = 0;
		while(rest >= 1) {
			let curr = rest % 2;
			rest /= 2;
			if(curr >= 1) {
				let a_high = 0;
				let a_low = 1;
				let b = i;
				b &= 63;
				let b1;
				if(b == 0) {
					let this1 = new haxe__$Int64__$_$_$Int64(a_high,a_low);
					b1 = this1;
				} else if(b < 32) {
					let this1 = new haxe__$Int64__$_$_$Int64(a_high << b | a_low >>> 32 - b,a_low << b);
					b1 = this1;
				} else {
					let this1 = new haxe__$Int64__$_$_$Int64(a_low << b - 32,0);
					b1 = this1;
				}
				let high = result.high + b1.high | 0;
				let low = result.low + b1.low | 0;
				if(haxe_Int32.ucompare(low,result.low) < 0) {
					let ret = high++;
					high = high | 0;
				}
				let this1 = new haxe__$Int64__$_$_$Int64(high,low);
				result = this1;
			}
			++i;
		}
		if(neg) {
			let high = ~result.high;
			let low = ~result.low + 1 | 0;
			if(low == 0) {
				let ret = high++;
				high = high | 0;
			}
			let this1 = new haxe__$Int64__$_$_$Int64(high,low);
			result = this1;
		}
		return result;
	}
}
$hxClasses["haxe.Int64Helper"] = haxe_Int64Helper;
haxe_Int64Helper.__name__ = "haxe.Int64Helper";
class haxe_Log {
	static formatOutput(v,infos) {
		let str = Std.string(v);
		if(infos == null) {
			return str;
		}
		let pstr = infos.fileName + ":" + infos.lineNumber;
		if(infos.customParams != null) {
			let _g = 0;
			let _g1 = infos.customParams;
			while(_g < _g1.length) {
				let v = _g1[_g];
				++_g;
				str += ", " + Std.string(v);
			}
		}
		return pstr + ": " + str;
	}
	static trace(v,infos) {
		let str = haxe_Log.formatOutput(v,infos);
		if(typeof(console) != "undefined" && console.log != null) {
			console.log(str);
		}
	}
}
$hxClasses["haxe.Log"] = haxe_Log;
haxe_Log.__name__ = "haxe.Log";
class haxe_NativeStackTrace {
	static saveStack(e) {
		haxe_NativeStackTrace.lastError = e;
	}
	static callStack() {
		let e = new Error("");
		let stack = haxe_NativeStackTrace.tryHaxeStack(e);
		if(typeof(stack) == "undefined") {
			try {
				throw e;
			} catch( _g ) {
			}
			stack = e.stack;
		}
		return haxe_NativeStackTrace.normalize(stack,2);
	}
	static exceptionStack() {
		return haxe_NativeStackTrace.normalize(haxe_NativeStackTrace.tryHaxeStack(haxe_NativeStackTrace.lastError));
	}
	static toHaxe(s,skip) {
		if(skip == null) {
			skip = 0;
		}
		if(s == null) {
			return [];
		} else if(typeof(s) == "string") {
			let stack = s.split("\n");
			if(stack[0] == "Error") {
				stack.shift();
			}
			let m = [];
			let _g = 0;
			let _g1 = stack.length;
			while(_g < _g1) {
				let i = _g++;
				if(skip > i) {
					continue;
				}
				let line = stack[i];
				let matched = line.match(/^    at ([A-Za-z0-9_. ]+) \(([^)]+):([0-9]+):([0-9]+)\)$/);
				if(matched != null) {
					let path = matched[1].split(".");
					if(path[0] == "$hxClasses") {
						path.shift();
					}
					let meth = path.pop();
					let file = matched[2];
					let line = Std.parseInt(matched[3]);
					let column = Std.parseInt(matched[4]);
					m.push(haxe_StackItem.FilePos(meth == "Anonymous function" ? haxe_StackItem.LocalFunction() : meth == "Global code" ? null : haxe_StackItem.Method(path.join("."),meth),file,line,column));
				} else {
					m.push(haxe_StackItem.Module(StringTools.trim(line)));
				}
			}
			return m;
		} else if(skip > 0 && Array.isArray(s)) {
			return s.slice(skip);
		} else {
			return s;
		}
	}
	static tryHaxeStack(e) {
		if(e == null) {
			return [];
		}
		let oldValue = Error.prepareStackTrace;
		Error.prepareStackTrace = haxe_NativeStackTrace.prepareHxStackTrace;
		let stack = e.stack;
		Error.prepareStackTrace = oldValue;
		return stack;
	}
	static prepareHxStackTrace(e,callsites) {
		let stack = [];
		let _g = 0;
		while(_g < callsites.length) {
			let site = callsites[_g];
			++_g;
			if(haxe_NativeStackTrace.wrapCallSite != null) {
				site = haxe_NativeStackTrace.wrapCallSite(site);
			}
			let method = null;
			let fullName = site.getFunctionName();
			if(fullName != null) {
				let idx = fullName.lastIndexOf(".");
				if(idx >= 0) {
					let className = fullName.substring(0,idx);
					let methodName = fullName.substring(idx + 1);
					method = haxe_StackItem.Method(className,methodName);
				} else {
					method = haxe_StackItem.Method(null,fullName);
				}
			}
			let fileName = site.getFileName();
			let fileAddr = fileName == null ? -1 : fileName.indexOf("file:");
			if(haxe_NativeStackTrace.wrapCallSite != null && fileAddr > 0) {
				fileName = fileName.substring(fileAddr + 6);
			}
			stack.push(haxe_StackItem.FilePos(method,fileName,site.getLineNumber(),site.getColumnNumber()));
		}
		return stack;
	}
	static normalize(stack,skipItems) {
		if(skipItems == null) {
			skipItems = 0;
		}
		if(Array.isArray(stack) && skipItems > 0) {
			return stack.slice(skipItems);
		} else if(typeof(stack) == "string") {
			switch(stack.substring(0,6)) {
			case "Error\n":case "Error:":
				++skipItems;
				break;
			default:
			}
			return haxe_NativeStackTrace.skipLines(stack,skipItems);
		} else {
			return stack;
		}
	}
	static skipLines(stack,skip,pos) {
		if(pos == null) {
			pos = 0;
		}
		if(skip > 0) {
			pos = stack.indexOf("\n",pos);
			if(pos < 0) {
				return "";
			} else {
				return haxe_NativeStackTrace.skipLines(stack,--skip,pos + 1);
			}
		} else {
			return stack.substring(pos);
		}
	}
}
haxe_NativeStackTrace.lastError = null;
haxe_NativeStackTrace.wrapCallSite = null;
$hxClasses["haxe.NativeStackTrace"] = haxe_NativeStackTrace;
haxe_NativeStackTrace.__name__ = "haxe.NativeStackTrace";
class haxe_Rest {
	static get_length(this1) {
		return this1.length;
	}
	static of(array) {
		let this1 = array;
		return this1;
	}
	static _new(array) {
		let this1 = array;
		return this1;
	}
	static get(this1,index) {
		return this1[index];
	}
	static toArray(this1) {
		return this1.slice();
	}
	static iterator(this1) {
		return new haxe_iterators_RestIterator(this1);
	}
	static keyValueIterator(this1) {
		return new haxe_iterators_RestKeyValueIterator(this1);
	}
	static append(this1,item) {
		let result = this1.slice();
		result.push(item);
		let this2 = result;
		return this2;
	}
	static prepend(this1,item) {
		let result = this1.slice();
		result.unshift(item);
		let this2 = result;
		return this2;
	}
	static toString(this1) {
		return "[" + this1.toString() + "]";
	}
}
haxe_Rest.__properties__ = {get_length: "get_length"};
class haxe_ValueException extends haxe_Exception {
	constructor(value,previous,native) {
		super(String(value),previous,native);
		this.value = value;
		this.__skipStack++;
	}
	unwrap() {
		return this.value;
	}
}
$hxClasses["haxe.ValueException"] = haxe_ValueException;
haxe_ValueException.__name__ = "haxe.ValueException";
haxe_ValueException.__super__ = haxe_Exception;
Object.assign(haxe_ValueException.prototype, {
	__class__: haxe_ValueException
	,value: null
});
class haxe_crypto_Sha1 {
	constructor() {
	}
	doEncode(x) {
		let w = [];
		let a = 1732584193;
		let b = -271733879;
		let c = -1732584194;
		let d = 271733878;
		let e = -1009589776;
		let i = 0;
		while(i < x.length) {
			let olda = a;
			let oldb = b;
			let oldc = c;
			let oldd = d;
			let olde = e;
			let j = 0;
			while(j < 80) {
				if(j < 16) {
					w[j] = x[i + j];
				} else {
					let num = w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16];
					w[j] = num << 1 | num >>> 31;
				}
				let t = (a << 5 | a >>> 27) + this.ft(j,b,c,d) + e + w[j] + this.kt(j);
				e = d;
				d = c;
				c = b << 30 | b >>> 2;
				b = a;
				a = t;
				++j;
			}
			a += olda;
			b += oldb;
			c += oldc;
			d += oldd;
			e += olde;
			i += 16;
		}
		return [a,b,c,d,e];
	}
	rol(num,cnt) {
		return num << cnt | num >>> 32 - cnt;
	}
	ft(t,b,c,d) {
		if(t < 20) {
			return b & c | ~b & d;
		}
		if(t < 40) {
			return b ^ c ^ d;
		}
		if(t < 60) {
			return b & c | b & d | c & d;
		}
		return b ^ c ^ d;
	}
	kt(t) {
		if(t < 20) {
			return 1518500249;
		}
		if(t < 40) {
			return 1859775393;
		}
		if(t < 60) {
			return -1894007588;
		}
		return -899497514;
	}
	hex(a) {
		let str = "";
		let _g = 0;
		while(_g < a.length) {
			let num = a[_g];
			++_g;
			str += StringTools.hex(num,8);
		}
		return str.toLowerCase();
	}
	static encode(s) {
		let sh = new haxe_crypto_Sha1();
		let h = sh.doEncode(haxe_crypto_Sha1.str2blks(s));
		return sh.hex(h);
	}
	static make(b) {
		let h = new haxe_crypto_Sha1().doEncode(haxe_crypto_Sha1.bytes2blks(b));
		let out = new haxe_io_Bytes(new ArrayBuffer(20));
		let p = 0;
		out.b[p++] = h[0] >>> 24;
		out.b[p++] = h[0] >> 16 & 255;
		out.b[p++] = h[0] >> 8 & 255;
		out.b[p++] = h[0] & 255;
		out.b[p++] = h[1] >>> 24;
		out.b[p++] = h[1] >> 16 & 255;
		out.b[p++] = h[1] >> 8 & 255;
		out.b[p++] = h[1] & 255;
		out.b[p++] = h[2] >>> 24;
		out.b[p++] = h[2] >> 16 & 255;
		out.b[p++] = h[2] >> 8 & 255;
		out.b[p++] = h[2] & 255;
		out.b[p++] = h[3] >>> 24;
		out.b[p++] = h[3] >> 16 & 255;
		out.b[p++] = h[3] >> 8 & 255;
		out.b[p++] = h[3] & 255;
		out.b[p++] = h[4] >>> 24;
		out.b[p++] = h[4] >> 16 & 255;
		out.b[p++] = h[4] >> 8 & 255;
		out.b[p++] = h[4] & 255;
		return out;
	}
	static str2blks(s) {
		let s1 = haxe_io_Bytes.ofString(s);
		let nblk = (s1.length + 8 >> 6) + 1;
		let blks = [];
		let _g = 0;
		let _g1 = nblk * 16;
		while(_g < _g1) {
			let i = _g++;
			blks[i] = 0;
		}
		let _g2 = 0;
		let _g3 = s1.length;
		while(_g2 < _g3) {
			let i = _g2++;
			let p = i >> 2;
			blks[p] |= s1.b[i] << 24 - ((i & 3) << 3);
		}
		let i = s1.length;
		let p = i >> 2;
		blks[p] |= 128 << 24 - ((i & 3) << 3);
		blks[nblk * 16 - 1] = s1.length * 8;
		return blks;
	}
	static bytes2blks(b) {
		let nblk = (b.length + 8 >> 6) + 1;
		let blks = [];
		let _g = 0;
		let _g1 = nblk * 16;
		while(_g < _g1) {
			let i = _g++;
			blks[i] = 0;
		}
		let _g2 = 0;
		let _g3 = b.length;
		while(_g2 < _g3) {
			let i = _g2++;
			let p = i >> 2;
			blks[p] |= b.b[i] << 24 - ((i & 3) << 3);
		}
		let i = b.length;
		let p = i >> 2;
		blks[p] |= 128 << 24 - ((i & 3) << 3);
		blks[nblk * 16 - 1] = b.length * 8;
		return blks;
	}
}
$hxClasses["haxe.crypto.Sha1"] = haxe_crypto_Sha1;
haxe_crypto_Sha1.__name__ = "haxe.crypto.Sha1";
Object.assign(haxe_crypto_Sha1.prototype, {
	__class__: haxe_crypto_Sha1
});
class haxe_ds_ArraySort {
	static sort(a,cmp) {
		haxe_ds_ArraySort.rec(a,cmp,0,a.length);
	}
	static rec(a,cmp,from,to) {
		let middle = from + to >> 1;
		if(to - from < 12) {
			if(to <= from) {
				return;
			}
			let _g = from + 1;
			let _g1 = to;
			while(_g < _g1) {
				let i = _g++;
				let j = i;
				while(j > from) {
					if(cmp(a[j],a[j - 1]) < 0) {
						haxe_ds_ArraySort.swap(a,j - 1,j);
					} else {
						break;
					}
					--j;
				}
			}
			return;
		}
		haxe_ds_ArraySort.rec(a,cmp,from,middle);
		haxe_ds_ArraySort.rec(a,cmp,middle,to);
		haxe_ds_ArraySort.doMerge(a,cmp,from,middle,to,middle - from,to - middle);
	}
	static doMerge(a,cmp,from,pivot,to,len1,len2) {
		let first_cut;
		let second_cut;
		let len11;
		let len22;
		if(len1 == 0 || len2 == 0) {
			return;
		}
		if(len1 + len2 == 2) {
			if(cmp(a[pivot],a[from]) < 0) {
				haxe_ds_ArraySort.swap(a,pivot,from);
			}
			return;
		}
		if(len1 > len2) {
			len11 = len1 >> 1;
			first_cut = from + len11;
			second_cut = haxe_ds_ArraySort.lower(a,cmp,pivot,to,first_cut);
			len22 = second_cut - pivot;
		} else {
			len22 = len2 >> 1;
			second_cut = pivot + len22;
			first_cut = haxe_ds_ArraySort.upper(a,cmp,from,pivot,second_cut);
			len11 = first_cut - from;
		}
		haxe_ds_ArraySort.rotate(a,cmp,first_cut,pivot,second_cut);
		let new_mid = first_cut + len22;
		haxe_ds_ArraySort.doMerge(a,cmp,from,first_cut,new_mid,len11,len22);
		haxe_ds_ArraySort.doMerge(a,cmp,new_mid,second_cut,to,len1 - len11,len2 - len22);
	}
	static rotate(a,cmp,from,mid,to) {
		if(from == mid || mid == to) {
			return;
		}
		let n = haxe_ds_ArraySort.gcd(to - from,mid - from);
		while(n-- != 0) {
			let val = a[from + n];
			let shift = mid - from;
			let p1 = from + n;
			let p2 = from + n + shift;
			while(p2 != from + n) {
				a[p1] = a[p2];
				p1 = p2;
				if(to - p2 > shift) {
					p2 += shift;
				} else {
					p2 = from + (shift - (to - p2));
				}
			}
			a[p1] = val;
		}
	}
	static gcd(m,n) {
		while(n != 0) {
			let t = m % n;
			m = n;
			n = t;
		}
		return m;
	}
	static upper(a,cmp,from,to,val) {
		let len = to - from;
		let half;
		let mid;
		while(len > 0) {
			half = len >> 1;
			mid = from + half;
			if(cmp(a[val],a[mid]) < 0) {
				len = half;
			} else {
				from = mid + 1;
				len = len - half - 1;
			}
		}
		return from;
	}
	static lower(a,cmp,from,to,val) {
		let len = to - from;
		let half;
		let mid;
		while(len > 0) {
			half = len >> 1;
			mid = from + half;
			if(cmp(a[mid],a[val]) < 0) {
				from = mid + 1;
				len = len - half - 1;
			} else {
				len = half;
			}
		}
		return from;
	}
	static swap(a,i,j) {
		let tmp = a[i];
		a[i] = a[j];
		a[j] = tmp;
	}
	static compare(a,cmp,i,j) {
		return cmp(a[i],a[j]);
	}
}
$hxClasses["haxe.ds.ArraySort"] = haxe_ds_ArraySort;
haxe_ds_ArraySort.__name__ = "haxe.ds.ArraySort";
class haxe_ds_BalancedTree {
	constructor() {
	}
	set(key,value) {
		this.root = this.setLoop(key,value,this.root);
	}
	get(key) {
		let node = this.root;
		while(node != null) {
			let c = this.compare(key,node.key);
			if(c == 0) {
				return node.value;
			}
			if(c < 0) {
				node = node.left;
			} else {
				node = node.right;
			}
		}
		return null;
	}
	remove(key) {
		try {
			this.root = this.removeLoop(key,this.root);
			return true;
		} catch( _g ) {
			haxe_NativeStackTrace.lastError = _g;
			if(typeof(haxe_Exception.caught(_g).unwrap()) == "string") {
				return false;
			} else {
				throw _g;
			}
		}
	}
	exists(key) {
		let node = this.root;
		while(node != null) {
			let c = this.compare(key,node.key);
			if(c == 0) {
				return true;
			} else if(c < 0) {
				node = node.left;
			} else {
				node = node.right;
			}
		}
		return false;
	}
	iterator() {
		let ret = [];
		haxe_ds_BalancedTree.iteratorLoop(this.root,ret);
		return new haxe_iterators_ArrayIterator(ret);
	}
	keyValueIterator() {
		return new haxe_iterators_MapKeyValueIterator(this);
	}
	keys() {
		let ret = [];
		this.keysLoop(this.root,ret);
		return new haxe_iterators_ArrayIterator(ret);
	}
	copy() {
		let copied = new haxe_ds_BalancedTree();
		copied.root = this.root;
		return copied;
	}
	setLoop(k,v,node) {
		if(node == null) {
			return new haxe_ds_TreeNode(null,k,v,null);
		}
		let c = this.compare(k,node.key);
		if(c == 0) {
			return new haxe_ds_TreeNode(node.left,k,v,node.right,node == null ? 0 : node._height);
		} else if(c < 0) {
			let nl = this.setLoop(k,v,node.left);
			return this.balance(nl,node.key,node.value,node.right);
		} else {
			let nr = this.setLoop(k,v,node.right);
			return this.balance(node.left,node.key,node.value,nr);
		}
	}
	removeLoop(k,node) {
		if(node == null) {
			throw haxe_Exception.thrown("Not_found");
		}
		let c = this.compare(k,node.key);
		if(c == 0) {
			return this.merge(node.left,node.right);
		} else if(c < 0) {
			return this.balance(this.removeLoop(k,node.left),node.key,node.value,node.right);
		} else {
			return this.balance(node.left,node.key,node.value,this.removeLoop(k,node.right));
		}
	}
	keysLoop(node,acc) {
		if(node != null) {
			this.keysLoop(node.left,acc);
			acc.push(node.key);
			this.keysLoop(node.right,acc);
		}
	}
	merge(t1,t2) {
		if(t1 == null) {
			return t2;
		}
		if(t2 == null) {
			return t1;
		}
		let t = this.minBinding(t2);
		return this.balance(t1,t.key,t.value,this.removeMinBinding(t2));
	}
	minBinding(t) {
		if(t == null) {
			throw haxe_Exception.thrown("Not_found");
		} else if(t.left == null) {
			return t;
		} else {
			return this.minBinding(t.left);
		}
	}
	removeMinBinding(t) {
		if(t.left == null) {
			return t.right;
		} else {
			return this.balance(this.removeMinBinding(t.left),t.key,t.value,t.right);
		}
	}
	balance(l,k,v,r) {
		let hl = l == null ? 0 : l._height;
		let hr = r == null ? 0 : r._height;
		if(hl > hr + 2) {
			let _this = l.left;
			let _this1 = l.right;
			if((_this == null ? 0 : _this._height) >= (_this1 == null ? 0 : _this1._height)) {
				return new haxe_ds_TreeNode(l.left,l.key,l.value,new haxe_ds_TreeNode(l.right,k,v,r));
			} else {
				return new haxe_ds_TreeNode(new haxe_ds_TreeNode(l.left,l.key,l.value,l.right.left),l.right.key,l.right.value,new haxe_ds_TreeNode(l.right.right,k,v,r));
			}
		} else if(hr > hl + 2) {
			let _this = r.right;
			let _this1 = r.left;
			if((_this == null ? 0 : _this._height) > (_this1 == null ? 0 : _this1._height)) {
				return new haxe_ds_TreeNode(new haxe_ds_TreeNode(l,k,v,r.left),r.key,r.value,r.right);
			} else {
				return new haxe_ds_TreeNode(new haxe_ds_TreeNode(l,k,v,r.left.left),r.left.key,r.left.value,new haxe_ds_TreeNode(r.left.right,r.key,r.value,r.right));
			}
		} else {
			return new haxe_ds_TreeNode(l,k,v,r,(hl > hr ? hl : hr) + 1);
		}
	}
	compare(k1,k2) {
		return Reflect.compare(k1,k2);
	}
	toString() {
		if(this.root == null) {
			return "{}";
		} else {
			return "{" + this.root.toString() + "}";
		}
	}
	clear() {
		this.root = null;
	}
	static iteratorLoop(node,acc) {
		if(node != null) {
			haxe_ds_BalancedTree.iteratorLoop(node.left,acc);
			acc.push(node.value);
			haxe_ds_BalancedTree.iteratorLoop(node.right,acc);
		}
	}
}
$hxClasses["haxe.ds.BalancedTree"] = haxe_ds_BalancedTree;
haxe_ds_BalancedTree.__name__ = "haxe.ds.BalancedTree";
haxe_ds_BalancedTree.__interfaces__ = [haxe_IMap];
Object.assign(haxe_ds_BalancedTree.prototype, {
	__class__: haxe_ds_BalancedTree
	,root: null
});
class haxe_ds_TreeNode {
	constructor(l,k,v,r,h) {
		if(h == null) {
			h = -1;
		}
		this.left = l;
		this.key = k;
		this.value = v;
		this.right = r;
		if(h == -1) {
			let tmp;
			let _this = this.left;
			let _this1 = this.right;
			if((_this == null ? 0 : _this._height) > (_this1 == null ? 0 : _this1._height)) {
				let _this = this.left;
				tmp = _this == null ? 0 : _this._height;
			} else {
				let _this = this.right;
				tmp = _this == null ? 0 : _this._height;
			}
			this._height = tmp + 1;
		} else {
			this._height = h;
		}
	}
	toString() {
		return (this.left == null ? "" : this.left.toString() + ", ") + ("" + Std.string(this.key) + "=" + Std.string(this.value)) + (this.right == null ? "" : ", " + this.right.toString());
	}
}
$hxClasses["haxe.ds.TreeNode"] = haxe_ds_TreeNode;
haxe_ds_TreeNode.__name__ = "haxe.ds.TreeNode";
Object.assign(haxe_ds_TreeNode.prototype, {
	__class__: haxe_ds_TreeNode
	,left: null
	,right: null
	,key: null
	,value: null
	,_height: null
});
class haxe_ds_EnumValueMap extends haxe_ds_BalancedTree {
	constructor() {
		super();
	}
	compare(k1,k2) {
		let d = k1._hx_index - k2._hx_index;
		if(d != 0) {
			return d;
		}
		let p1 = Type.enumParameters(k1);
		let p2 = Type.enumParameters(k2);
		if(p1.length == 0 && p2.length == 0) {
			return 0;
		}
		return this.compareArgs(p1,p2);
	}
	compareArgs(a1,a2) {
		let ld = a1.length - a2.length;
		if(ld != 0) {
			return ld;
		}
		let _g = 0;
		let _g1 = a1.length;
		while(_g < _g1) {
			let i = _g++;
			let d = this.compareArg(a1[i],a2[i]);
			if(d != 0) {
				return d;
			}
		}
		return 0;
	}
	compareArg(v1,v2) {
		if(Reflect.isEnumValue(v1) && Reflect.isEnumValue(v2)) {
			return this.compare(v1,v2);
		} else if(((v1) instanceof Array) && ((v2) instanceof Array)) {
			return this.compareArgs(v1,v2);
		} else {
			return Reflect.compare(v1,v2);
		}
	}
	copy() {
		let copied = new haxe_ds_EnumValueMap();
		copied.root = this.root;
		return copied;
	}
}
$hxClasses["haxe.ds.EnumValueMap"] = haxe_ds_EnumValueMap;
haxe_ds_EnumValueMap.__name__ = "haxe.ds.EnumValueMap";
haxe_ds_EnumValueMap.__interfaces__ = [haxe_IMap];
haxe_ds_EnumValueMap.__super__ = haxe_ds_BalancedTree;
Object.assign(haxe_ds_EnumValueMap.prototype, {
	__class__: haxe_ds_EnumValueMap
});
class haxe_ds_HashMap {
	static _new() {
		let this1 = new haxe_ds__$HashMap_HashMapData();
		return this1;
	}
	static set(this1,k,v) {
		let _this = this1.keys;
		let key = k.hashCode();
		_this.h[key] = k;
		let _this1 = this1.values;
		let key1 = k.hashCode();
		_this1.h[key1] = v;
	}
	static get(this1,k) {
		let _this = this1.values;
		let key = k.hashCode();
		return _this.h[key];
	}
	static exists(this1,k) {
		let _this = this1.values;
		let key = k.hashCode();
		return _this.h.hasOwnProperty(key);
	}
	static remove(this1,k) {
		this1.values.remove(k.hashCode());
		return this1.keys.remove(k.hashCode());
	}
	static keys(this1) {
		return this1.keys.iterator();
	}
	static copy(this1) {
		let copied = new haxe_ds__$HashMap_HashMapData();
		copied.keys = this1.keys.copy();
		copied.values = this1.values.copy();
		return copied;
	}
	static iterator(this1) {
		return this1.values.iterator();
	}
	static keyValueIterator(this1) {
		return new haxe_iterators_HashMapKeyValueIterator(this1);
	}
	static clear(this1) {
		this1.keys.h = { };
		this1.values.h = { };
	}
}
class haxe_ds__$HashMap_HashMapData {
	constructor() {
		this.keys = new haxe_ds_IntMap();
		this.values = new haxe_ds_IntMap();
	}
}
$hxClasses["haxe.ds._HashMap.HashMapData"] = haxe_ds__$HashMap_HashMapData;
haxe_ds__$HashMap_HashMapData.__name__ = "haxe.ds._HashMap.HashMapData";
Object.assign(haxe_ds__$HashMap_HashMapData.prototype, {
	__class__: haxe_ds__$HashMap_HashMapData
	,keys: null
	,values: null
});
class haxe_ds_IntMap {
	constructor() {
		this.h = { };
	}
	set(key,value) {
		this.h[key] = value;
	}
	get(key) {
		return this.h[key];
	}
	exists(key) {
		return this.h.hasOwnProperty(key);
	}
	remove(key) {
		if(!this.h.hasOwnProperty(key)) {
			return false;
		}
		delete(this.h[key]);
		return true;
	}
	keys() {
		let a = [];
		for( var key in this.h ) if(this.h.hasOwnProperty(key)) a.push(+key);
		return new haxe_iterators_ArrayIterator(a);
	}
	iterator() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			let i = this.it.next();
			return this.ref[i];
		}};
	}
	keyValueIterator() {
		return new haxe_iterators_MapKeyValueIterator(this);
	}
	copy() {
		let copied = new haxe_ds_IntMap();
		let key = this.keys();
		while(key.hasNext()) {
			let key1 = key.next();
			copied.h[key1] = this.h[key1];
		}
		return copied;
	}
	toString() {
		let s_b = "";
		s_b += "{";
		let it = this.keys();
		let i = it;
		while(i.hasNext()) {
			let i1 = i.next();
			s_b += i1 == null ? "null" : "" + i1;
			s_b += " => ";
			s_b += Std.string(Std.string(this.h[i1]));
			if(it.hasNext()) {
				s_b += ", ";
			}
		}
		s_b += "}";
		return s_b;
	}
	clear() {
		this.h = { };
	}
}
$hxClasses["haxe.ds.IntMap"] = haxe_ds_IntMap;
haxe_ds_IntMap.__name__ = "haxe.ds.IntMap";
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
Object.assign(haxe_ds_IntMap.prototype, {
	__class__: haxe_ds_IntMap
	,h: null
});
class haxe_ds_List {
	constructor() {
		this.length = 0;
	}
	add(item) {
		let x = new haxe_ds__$List_ListNode(item,null);
		if(this.h == null) {
			this.h = x;
		} else {
			this.q.next = x;
		}
		this.q = x;
		this.length++;
	}
	push(item) {
		let x = new haxe_ds__$List_ListNode(item,this.h);
		this.h = x;
		if(this.q == null) {
			this.q = x;
		}
		this.length++;
	}
	first() {
		if(this.h == null) {
			return null;
		} else {
			return this.h.item;
		}
	}
	last() {
		if(this.q == null) {
			return null;
		} else {
			return this.q.item;
		}
	}
	pop() {
		if(this.h == null) {
			return null;
		}
		let x = this.h.item;
		this.h = this.h.next;
		if(this.h == null) {
			this.q = null;
		}
		this.length--;
		return x;
	}
	isEmpty() {
		return this.h == null;
	}
	clear() {
		this.h = null;
		this.q = null;
		this.length = 0;
	}
	remove(v) {
		let prev = null;
		let l = this.h;
		while(l != null) {
			if(l.item == v) {
				if(prev == null) {
					this.h = l.next;
				} else {
					prev.next = l.next;
				}
				if(this.q == l) {
					this.q = prev;
				}
				this.length--;
				return true;
			}
			prev = l;
			l = l.next;
		}
		return false;
	}
	iterator() {
		return new haxe_ds__$List_ListIterator(this.h);
	}
	keyValueIterator() {
		return new haxe_ds__$List_ListKeyValueIterator(this.h);
	}
	toString() {
		let s_b = "";
		let first = true;
		let l = this.h;
		s_b += "{";
		while(l != null) {
			if(first) {
				first = false;
			} else {
				s_b += ", ";
			}
			s_b += Std.string(Std.string(l.item));
			l = l.next;
		}
		s_b += "}";
		return s_b;
	}
	join(sep) {
		let s_b = "";
		let first = true;
		let l = this.h;
		while(l != null) {
			if(first) {
				first = false;
			} else {
				s_b += sep == null ? "null" : "" + sep;
			}
			s_b += Std.string(l.item);
			l = l.next;
		}
		return s_b;
	}
	filter(f) {
		let l2 = new haxe_ds_List();
		let l = this.h;
		while(l != null) {
			let v = l.item;
			l = l.next;
			if(f(v)) {
				l2.add(v);
			}
		}
		return l2;
	}
	map(f) {
		let b = new haxe_ds_List();
		let l = this.h;
		while(l != null) {
			let v = l.item;
			l = l.next;
			b.add(f(v));
		}
		return b;
	}
}
$hxClasses["haxe.ds.List"] = haxe_ds_List;
haxe_ds_List.__name__ = "haxe.ds.List";
Object.assign(haxe_ds_List.prototype, {
	__class__: haxe_ds_List
	,h: null
	,q: null
	,length: null
});
class haxe_ds__$List_ListNode {
	constructor(item,next) {
		this.item = item;
		this.next = next;
	}
}
$hxClasses["haxe.ds._List.ListNode"] = haxe_ds__$List_ListNode;
haxe_ds__$List_ListNode.__name__ = "haxe.ds._List.ListNode";
Object.assign(haxe_ds__$List_ListNode.prototype, {
	__class__: haxe_ds__$List_ListNode
	,item: null
	,next: null
});
class haxe_ds__$List_ListIterator {
	constructor(head) {
		this.head = head;
	}
	hasNext() {
		return this.head != null;
	}
	next() {
		let val = this.head.item;
		this.head = this.head.next;
		return val;
	}
}
$hxClasses["haxe.ds._List.ListIterator"] = haxe_ds__$List_ListIterator;
haxe_ds__$List_ListIterator.__name__ = "haxe.ds._List.ListIterator";
Object.assign(haxe_ds__$List_ListIterator.prototype, {
	__class__: haxe_ds__$List_ListIterator
	,head: null
});
class haxe_ds__$List_ListKeyValueIterator {
	constructor(head) {
		this.head = head;
		this.idx = 0;
	}
	hasNext() {
		return this.head != null;
	}
	next() {
		let val = this.head.item;
		this.head = this.head.next;
		return { value : val, key : this.idx++};
	}
}
$hxClasses["haxe.ds._List.ListKeyValueIterator"] = haxe_ds__$List_ListKeyValueIterator;
haxe_ds__$List_ListKeyValueIterator.__name__ = "haxe.ds._List.ListKeyValueIterator";
Object.assign(haxe_ds__$List_ListKeyValueIterator.prototype, {
	__class__: haxe_ds__$List_ListKeyValueIterator
	,idx: null
	,head: null
});
class haxe_ds_Map {
	static set(this1,key,value) {
		this1.set(key,value);
	}
	static get(this1,key) {
		return this1.get(key);
	}
	static exists(this1,key) {
		return this1.exists(key);
	}
	static remove(this1,key) {
		return this1.remove(key);
	}
	static keys(this1) {
		return this1.keys();
	}
	static iterator(this1) {
		return this1.iterator();
	}
	static keyValueIterator(this1) {
		return this1.keyValueIterator();
	}
	static copy(this1) {
		return this1.copy();
	}
	static toString(this1) {
		return this1.toString();
	}
	static clear(this1) {
		this1.clear();
	}
	static arrayWrite(this1,k,v) {
		this1.set(k,v);
		return v;
	}
	static toStringMap(t) {
		return new haxe_ds_StringMap();
	}
	static toIntMap(t) {
		return new haxe_ds_IntMap();
	}
	static toEnumValueMapMap(t) {
		return new haxe_ds_EnumValueMap();
	}
	static toObjectMap(t) {
		return new haxe_ds_ObjectMap();
	}
	static fromStringMap(map) {
		return map;
	}
	static fromIntMap(map) {
		return map;
	}
	static fromObjectMap(map) {
		return map;
	}
}
class haxe_ds_ObjectMap {
	constructor() {
		this.h = { __keys__ : { }};
	}
	set(key,value) {
		let id = key.__id__;
		if(id == null) {
			id = (key.__id__ = $global.$haxeUID++);
		}
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	get(key) {
		return this.h[key.__id__];
	}
	exists(key) {
		return this.h.__keys__[key.__id__] != null;
	}
	remove(key) {
		let id = key.__id__;
		if(this.h.__keys__[id] == null) {
			return false;
		}
		delete(this.h[id]);
		delete(this.h.__keys__[id]);
		return true;
	}
	keys() {
		let a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) {
			a.push(this.h.__keys__[key]);
		}
		}
		return new haxe_iterators_ArrayIterator(a);
	}
	iterator() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			let i = this.it.next();
			return this.ref[i.__id__];
		}};
	}
	keyValueIterator() {
		return new haxe_iterators_MapKeyValueIterator(this);
	}
	copy() {
		let copied = new haxe_ds_ObjectMap();
		let key = this.keys();
		while(key.hasNext()) {
			let key1 = key.next();
			copied.set(key1,this.h[key1.__id__]);
		}
		return copied;
	}
	toString() {
		let s_b = "";
		s_b += "{";
		let it = this.keys();
		let i = it;
		while(i.hasNext()) {
			let i1 = i.next();
			s_b += Std.string(Std.string(i1));
			s_b += " => ";
			s_b += Std.string(Std.string(this.h[i1.__id__]));
			if(it.hasNext()) {
				s_b += ", ";
			}
		}
		s_b += "}";
		return s_b;
	}
	clear() {
		this.h = { __keys__ : { }};
	}
	static assignId(obj) {
		return (obj.__id__ = $global.$haxeUID++);
	}
	static getId(obj) {
		return obj.__id__;
	}
}
haxe_ds_ObjectMap.count = null;
$hxClasses["haxe.ds.ObjectMap"] = haxe_ds_ObjectMap;
haxe_ds_ObjectMap.__name__ = "haxe.ds.ObjectMap";
haxe_ds_ObjectMap.__interfaces__ = [haxe_IMap];
Object.assign(haxe_ds_ObjectMap.prototype, {
	__class__: haxe_ds_ObjectMap
	,h: null
});
class haxe_ds_ReadOnlyArray {
	static get_length(this1) {
		return this1.length;
	}
	static get(this1,i) {
		return this1[i];
	}
	static concat(this1,a) {
		return this1.concat(a);
	}
}
haxe_ds_ReadOnlyArray.__properties__ = {get_length: "get_length"};
class haxe_ds_StringMap {
	constructor() {
		this.h = Object.create(null);
	}
	exists(key) {
		return Object.prototype.hasOwnProperty.call(this.h,key);
	}
	get(key) {
		return this.h[key];
	}
	set(key,value) {
		this.h[key] = value;
	}
	remove(key) {
		if(Object.prototype.hasOwnProperty.call(this.h,key)) {
			delete(this.h[key]);
			return true;
		} else {
			return false;
		}
	}
	keys() {
		return new haxe_ds__$StringMap_StringMapKeyIterator(this.h);
	}
	iterator() {
		return new haxe_ds__$StringMap_StringMapValueIterator(this.h);
	}
	keyValueIterator() {
		return new haxe_ds__$StringMap_StringMapKeyValueIterator(this.h);
	}
	copy() {
		return haxe_ds_StringMap.createCopy(this.h);
	}
	clear() {
		this.h = Object.create(null);
	}
	toString() {
		return haxe_ds_StringMap.stringify(this.h);
	}
	static createCopy(h) {
		let copy = new haxe_ds_StringMap();
		for (var key in h) copy.h[key] = h[key];
		return copy;
	}
	static stringify(h) {
		let s = "{";
		let first = true;
		for (var key in h) {
			if (first) first = false; else s += ',';
			s += key + ' => ' + Std.string(h[key]);
		}
		return s + "}";
	}
}
$hxClasses["haxe.ds.StringMap"] = haxe_ds_StringMap;
haxe_ds_StringMap.__name__ = "haxe.ds.StringMap";
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
Object.assign(haxe_ds_StringMap.prototype, {
	__class__: haxe_ds_StringMap
	,h: null
});
class haxe_ds__$StringMap_StringMapKeyIterator {
	constructor(h) {
		this.h = h;
		this.keys = Object.keys(h);
		this.length = this.keys.length;
		this.current = 0;
	}
	hasNext() {
		return this.current < this.length;
	}
	next() {
		return this.keys[this.current++];
	}
}
$hxClasses["haxe.ds._StringMap.StringMapKeyIterator"] = haxe_ds__$StringMap_StringMapKeyIterator;
haxe_ds__$StringMap_StringMapKeyIterator.__name__ = "haxe.ds._StringMap.StringMapKeyIterator";
Object.assign(haxe_ds__$StringMap_StringMapKeyIterator.prototype, {
	__class__: haxe_ds__$StringMap_StringMapKeyIterator
	,h: null
	,keys: null
	,length: null
	,current: null
});
class haxe_ds__$StringMap_StringMapValueIterator {
	constructor(h) {
		this.h = h;
		this.keys = Object.keys(h);
		this.length = this.keys.length;
		this.current = 0;
	}
	hasNext() {
		return this.current < this.length;
	}
	next() {
		return this.h[this.keys[this.current++]];
	}
}
$hxClasses["haxe.ds._StringMap.StringMapValueIterator"] = haxe_ds__$StringMap_StringMapValueIterator;
haxe_ds__$StringMap_StringMapValueIterator.__name__ = "haxe.ds._StringMap.StringMapValueIterator";
Object.assign(haxe_ds__$StringMap_StringMapValueIterator.prototype, {
	__class__: haxe_ds__$StringMap_StringMapValueIterator
	,h: null
	,keys: null
	,length: null
	,current: null
});
class haxe_ds__$StringMap_StringMapKeyValueIterator {
	constructor(h) {
		this.h = h;
		this.keys = Object.keys(h);
		this.length = this.keys.length;
		this.current = 0;
	}
	hasNext() {
		return this.current < this.length;
	}
	next() {
		let key = this.keys[this.current++];
		return { key : key, value : this.h[key]};
	}
}
$hxClasses["haxe.ds._StringMap.StringMapKeyValueIterator"] = haxe_ds__$StringMap_StringMapKeyValueIterator;
haxe_ds__$StringMap_StringMapKeyValueIterator.__name__ = "haxe.ds._StringMap.StringMapKeyValueIterator";
Object.assign(haxe_ds__$StringMap_StringMapKeyValueIterator.prototype, {
	__class__: haxe_ds__$StringMap_StringMapKeyValueIterator
	,h: null
	,keys: null
	,length: null
	,current: null
});
class haxe_ds_WeakMap {
	constructor() {
		throw new haxe_exceptions_NotImplementedException("Not implemented for this platform",null,{ fileName : "haxe/ds/WeakMap.hx", lineNumber : 39, className : "haxe.ds.WeakMap", methodName : "new"});
	}
	set(key,value) {
	}
	get(key) {
		return null;
	}
	exists(key) {
		return false;
	}
	remove(key) {
		return false;
	}
	keys() {
		return null;
	}
	iterator() {
		return null;
	}
	keyValueIterator() {
		return null;
	}
	copy() {
		return null;
	}
	toString() {
		return null;
	}
	clear() {
	}
}
$hxClasses["haxe.ds.WeakMap"] = haxe_ds_WeakMap;
haxe_ds_WeakMap.__name__ = "haxe.ds.WeakMap";
haxe_ds_WeakMap.__interfaces__ = [haxe_IMap];
Object.assign(haxe_ds_WeakMap.prototype, {
	__class__: haxe_ds_WeakMap
});
class haxe_exceptions_PosException extends haxe_Exception {
	constructor(message,previous,pos) {
		super(message,previous);
		if(pos == null) {
			this.posInfos = { fileName : "(unknown)", lineNumber : 0, className : "(unknown)", methodName : "(unknown)"};
		} else {
			this.posInfos = pos;
		}
		this.__skipStack++;
	}
	toString() {
		return "" + super.toString() + " in " + this.posInfos.className + "." + this.posInfos.methodName + " at " + this.posInfos.fileName + ":" + this.posInfos.lineNumber;
	}
}
$hxClasses["haxe.exceptions.PosException"] = haxe_exceptions_PosException;
haxe_exceptions_PosException.__name__ = "haxe.exceptions.PosException";
haxe_exceptions_PosException.__super__ = haxe_Exception;
Object.assign(haxe_exceptions_PosException.prototype, {
	__class__: haxe_exceptions_PosException
	,posInfos: null
});
class haxe_exceptions_NotImplementedException extends haxe_exceptions_PosException {
	constructor(message,previous,pos) {
		if(message == null) {
			message = "Not implemented";
		}
		super(message,previous,pos);
		this.__skipStack++;
	}
}
$hxClasses["haxe.exceptions.NotImplementedException"] = haxe_exceptions_NotImplementedException;
haxe_exceptions_NotImplementedException.__name__ = "haxe.exceptions.NotImplementedException";
haxe_exceptions_NotImplementedException.__super__ = haxe_exceptions_PosException;
Object.assign(haxe_exceptions_NotImplementedException.prototype, {
	__class__: haxe_exceptions_NotImplementedException
});
class haxe_io_Bytes {
	constructor(data) {
		this.length = data.byteLength;
		this.b = new Uint8Array(data);
		this.b.bufferValue = data;
		data.hxBytes = this;
		data.bytes = this.b;
	}
	get(pos) {
		return this.b[pos];
	}
	set(pos,v) {
		this.b[pos] = v;
	}
	blit(pos,src,srcpos,len) {
		if(pos < 0 || srcpos < 0 || len < 0 || pos + len > this.length || srcpos + len > src.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(srcpos == 0 && len == src.b.byteLength) {
			this.b.set(src.b,pos);
		} else {
			this.b.set(src.b.subarray(srcpos,srcpos + len),pos);
		}
	}
	fill(pos,len,value) {
		let _g = 0;
		let _g1 = len;
		while(_g < _g1) {
			let i = _g++;
			this.b[pos++] = value;
		}
	}
	sub(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		return new haxe_io_Bytes(this.b.buffer.slice(pos + this.b.byteOffset,pos + this.b.byteOffset + len));
	}
	compare(other) {
		let b1 = this.b;
		let b2 = other.b;
		let len = this.length < other.length ? this.length : other.length;
		let _g = 0;
		let _g1 = len;
		while(_g < _g1) {
			let i = _g++;
			if(b1[i] != b2[i]) {
				return b1[i] - b2[i];
			}
		}
		return this.length - other.length;
	}
	initData() {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
	}
	getDouble(pos) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		return this.data.getFloat64(pos,true);
	}
	getFloat(pos) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		return this.data.getFloat32(pos,true);
	}
	setDouble(pos,v) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		this.data.setFloat64(pos,v,true);
	}
	setFloat(pos,v) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		this.data.setFloat32(pos,v,true);
	}
	getUInt16(pos) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		return this.data.getUint16(pos,true);
	}
	setUInt16(pos,v) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		this.data.setUint16(pos,v,true);
	}
	getInt32(pos) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		return this.data.getInt32(pos,true);
	}
	setInt32(pos,v) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		this.data.setInt32(pos,v,true);
	}
	getInt64(pos) {
		let this1 = new haxe__$Int64__$_$_$Int64(this.getInt32(pos + 4),this.getInt32(pos));
		return this1;
	}
	setInt64(pos,v) {
		this.setInt32(pos,v.low);
		this.setInt32(pos + 4,v.high);
	}
	getString(pos,len,encoding) {
		if(pos < 0 || len < 0 || pos + len > this.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(encoding == null) {
			encoding = haxe_io_Encoding.UTF8;
		}
		let s = "";
		let b = this.b;
		let i = pos;
		let max = pos + len;
		switch(encoding._hx_index) {
		case 0:
			let debug = pos > 0;
			while(i < max) {
				let c = b[i++];
				if(c < 128) {
					if(c == 0) {
						break;
					}
					s += String.fromCodePoint(c);
				} else if(c < 224) {
					let code = (c & 63) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code);
				} else if(c < 240) {
					let c2 = b[i++];
					let code = (c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code);
				} else {
					let c2 = b[i++];
					let c3 = b[i++];
					let u = (c & 15) << 18 | (c2 & 127) << 12 | (c3 & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(u);
				}
			}
			break;
		case 1:
			while(i < max) {
				let c = b[i++] | b[i++] << 8;
				s += String.fromCodePoint(c);
			}
			break;
		}
		return s;
	}
	readString(pos,len) {
		return this.getString(pos,len);
	}
	toString() {
		return this.getString(0,this.length);
	}
	toHex() {
		let s_b = "";
		let chars = [];
		let str = "0123456789abcdef";
		let _g = 0;
		let _g1 = str.length;
		while(_g < _g1) {
			let i = _g++;
			chars.push(HxOverrides.cca(str,i));
		}
		let _g2 = 0;
		let _g3 = this.length;
		while(_g2 < _g3) {
			let i = _g2++;
			let c = this.b[i];
			s_b += String.fromCodePoint(chars[c >> 4]);
			s_b += String.fromCodePoint(chars[c & 15]);
		}
		return s_b;
	}
	getData() {
		return this.b.bufferValue;
	}
	static alloc(length) {
		return new haxe_io_Bytes(new ArrayBuffer(length));
	}
	static ofString(s,encoding) {
		if(encoding == haxe_io_Encoding.RawNative) {
			let buf = new Uint8Array(s.length << 1);
			let _g = 0;
			let _g1 = s.length;
			while(_g < _g1) {
				let i = _g++;
				let c = s.charCodeAt(i);
				buf[i << 1] = c & 255;
				buf[i << 1 | 1] = c >> 8;
			}
			return new haxe_io_Bytes(buf.buffer);
		}
		let a = [];
		let i = 0;
		while(i < s.length) {
			let c = s.charCodeAt(i++);
			if(55296 <= c && c <= 56319) {
				c = c - 55232 << 10 | s.charCodeAt(i++) & 1023;
			}
			if(c <= 127) {
				a.push(c);
			} else if(c <= 2047) {
				a.push(192 | c >> 6);
				a.push(128 | c & 63);
			} else if(c <= 65535) {
				a.push(224 | c >> 12);
				a.push(128 | c >> 6 & 63);
				a.push(128 | c & 63);
			} else {
				a.push(240 | c >> 18);
				a.push(128 | c >> 12 & 63);
				a.push(128 | c >> 6 & 63);
				a.push(128 | c & 63);
			}
		}
		return new haxe_io_Bytes(new Uint8Array(a).buffer);
	}
	static ofData(b) {
		let hb = b.hxBytes;
		if(hb != null) {
			return hb;
		}
		return new haxe_io_Bytes(b);
	}
	static ofHex(s) {
		if((s.length & 1) != 0) {
			throw haxe_Exception.thrown("Not a hex string (odd number of digits)");
		}
		let a = [];
		let i = 0;
		let len = s.length >> 1;
		while(i < len) {
			let high = s.charCodeAt(i * 2);
			let low = s.charCodeAt(i * 2 + 1);
			high = (high & 15) + ((high & 64) >> 6) * 9;
			low = (low & 15) + ((low & 64) >> 6) * 9;
			a.push((high << 4 | low) & 255);
			++i;
		}
		return new haxe_io_Bytes(new Uint8Array(a).buffer);
	}
	static fastGet(b,pos) {
		return b.bytes[pos];
	}
}
$hxClasses["haxe.io.Bytes"] = haxe_io_Bytes;
haxe_io_Bytes.__name__ = "haxe.io.Bytes";
Object.assign(haxe_io_Bytes.prototype, {
	__class__: haxe_io_Bytes
	,length: null
	,b: null
	,data: null
});
class haxe_io_BytesBuffer {
	constructor() {
		this.pos = 0;
		this.size = 0;
	}
	get_length() {
		return this.pos;
	}
	addByte(byte) {
		if(this.pos == this.size) {
			this.grow(1);
		}
		this.view.setUint8(this.pos++,byte);
	}
	add(src) {
		if(this.pos + src.length > this.size) {
			this.grow(src.length);
		}
		if(this.size == 0) {
			return;
		}
		let sub = new Uint8Array(src.b.buffer,src.b.byteOffset,src.length);
		this.u8.set(sub,this.pos);
		this.pos += src.length;
	}
	addString(v,encoding) {
		this.add(haxe_io_Bytes.ofString(v,encoding));
	}
	addInt32(v) {
		if(this.pos + 4 > this.size) {
			this.grow(4);
		}
		this.view.setInt32(this.pos,v,true);
		this.pos += 4;
	}
	addInt64(v) {
		if(this.pos + 8 > this.size) {
			this.grow(8);
		}
		this.view.setInt32(this.pos,v.low,true);
		this.view.setInt32(this.pos + 4,v.high,true);
		this.pos += 8;
	}
	addFloat(v) {
		if(this.pos + 4 > this.size) {
			this.grow(4);
		}
		this.view.setFloat32(this.pos,v,true);
		this.pos += 4;
	}
	addDouble(v) {
		if(this.pos + 8 > this.size) {
			this.grow(8);
		}
		this.view.setFloat64(this.pos,v,true);
		this.pos += 8;
	}
	addBytes(src,pos,len) {
		if(pos < 0 || len < 0 || pos + len > src.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(this.pos + len > this.size) {
			this.grow(len);
		}
		if(this.size == 0) {
			return;
		}
		let sub = new Uint8Array(src.b.buffer,src.b.byteOffset + pos,len);
		this.u8.set(sub,this.pos);
		this.pos += len;
	}
	grow(delta) {
		let req = this.pos + delta;
		let nsize = this.size == 0 ? 16 : this.size;
		while(nsize < req) nsize = nsize * 3 >> 1;
		let nbuf = new ArrayBuffer(nsize);
		let nu8 = new Uint8Array(nbuf);
		if(this.size > 0) {
			nu8.set(this.u8);
		}
		this.size = nsize;
		this.buffer = nbuf;
		this.u8 = nu8;
		this.view = new DataView(this.buffer);
	}
	getBytes() {
		if(this.size == 0) {
			return new haxe_io_Bytes(new ArrayBuffer(0));
		}
		let b = new haxe_io_Bytes(this.buffer);
		b.length = this.pos;
		return b;
	}
}
$hxClasses["haxe.io.BytesBuffer"] = haxe_io_BytesBuffer;
haxe_io_BytesBuffer.__name__ = "haxe.io.BytesBuffer";
Object.assign(haxe_io_BytesBuffer.prototype, {
	__class__: haxe_io_BytesBuffer
	,buffer: null
	,view: null
	,u8: null
	,pos: null
	,size: null
	,__properties__: {get_length: "get_length"}
});
var haxe_io_Encoding = $hxEnums["haxe.io.Encoding"] = { __ename__:"haxe.io.Encoding",__constructs__:null
	,UTF8: {_hx_name:"UTF8",_hx_index:0,__enum__:"haxe.io.Encoding",toString:$estr}
	,RawNative: {_hx_name:"RawNative",_hx_index:1,__enum__:"haxe.io.Encoding",toString:$estr}
};
haxe_io_Encoding.__constructs__ = [haxe_io_Encoding.UTF8,haxe_io_Encoding.RawNative];
haxe_io_Encoding.__empty_constructs__ = [haxe_io_Encoding.UTF8,haxe_io_Encoding.RawNative];
var haxe_io_Error = $hxEnums["haxe.io.Error"] = { __ename__:"haxe.io.Error",__constructs__:null
	,Blocked: {_hx_name:"Blocked",_hx_index:0,__enum__:"haxe.io.Error",toString:$estr}
	,Overflow: {_hx_name:"Overflow",_hx_index:1,__enum__:"haxe.io.Error",toString:$estr}
	,OutsideBounds: {_hx_name:"OutsideBounds",_hx_index:2,__enum__:"haxe.io.Error",toString:$estr}
	,Custom: ($_=function(e) { return {_hx_index:3,e:e,__enum__:"haxe.io.Error",toString:$estr}; },$_._hx_name="Custom",$_.__params__ = ["e"],$_)
};
haxe_io_Error.__constructs__ = [haxe_io_Error.Blocked,haxe_io_Error.Overflow,haxe_io_Error.OutsideBounds,haxe_io_Error.Custom];
haxe_io_Error.__empty_constructs__ = [haxe_io_Error.Blocked,haxe_io_Error.Overflow,haxe_io_Error.OutsideBounds];
class haxe_iterators_ArrayIterator {
	constructor(array) {
		this.current = 0;
		this.array = array;
	}
	hasNext() {
		return this.current < this.array.length;
	}
	next() {
		return this.array[this.current++];
	}
}
$hxClasses["haxe.iterators.ArrayIterator"] = haxe_iterators_ArrayIterator;
haxe_iterators_ArrayIterator.__name__ = "haxe.iterators.ArrayIterator";
Object.assign(haxe_iterators_ArrayIterator.prototype, {
	__class__: haxe_iterators_ArrayIterator
	,array: null
	,current: null
});
class haxe_iterators_ArrayKeyValueIterator {
	constructor(array) {
		this.current = 0;
		this.array = array;
	}
	hasNext() {
		return this.current < this.array.length;
	}
	next() {
		return { value : this.array[this.current], key : this.current++};
	}
}
$hxClasses["haxe.iterators.ArrayKeyValueIterator"] = haxe_iterators_ArrayKeyValueIterator;
haxe_iterators_ArrayKeyValueIterator.__name__ = "haxe.iterators.ArrayKeyValueIterator";
Object.assign(haxe_iterators_ArrayKeyValueIterator.prototype, {
	__class__: haxe_iterators_ArrayKeyValueIterator
	,current: null
	,array: null
});
class haxe_iterators_DynamicAccessIterator {
	constructor(access) {
		this.access = access;
		this.keys = Reflect.fields(access);
		this.index = 0;
	}
	hasNext() {
		return this.index < this.keys.length;
	}
	next() {
		return this.access[this.keys[this.index++]];
	}
}
$hxClasses["haxe.iterators.DynamicAccessIterator"] = haxe_iterators_DynamicAccessIterator;
haxe_iterators_DynamicAccessIterator.__name__ = "haxe.iterators.DynamicAccessIterator";
Object.assign(haxe_iterators_DynamicAccessIterator.prototype, {
	__class__: haxe_iterators_DynamicAccessIterator
	,access: null
	,keys: null
	,index: null
});
class haxe_iterators_DynamicAccessKeyValueIterator {
	constructor(access) {
		this.access = access;
		this.keys = Reflect.fields(access);
		this.index = 0;
	}
	hasNext() {
		return this.index < this.keys.length;
	}
	next() {
		let key = this.keys[this.index++];
		return { value : this.access[key], key : key};
	}
}
$hxClasses["haxe.iterators.DynamicAccessKeyValueIterator"] = haxe_iterators_DynamicAccessKeyValueIterator;
haxe_iterators_DynamicAccessKeyValueIterator.__name__ = "haxe.iterators.DynamicAccessKeyValueIterator";
Object.assign(haxe_iterators_DynamicAccessKeyValueIterator.prototype, {
	__class__: haxe_iterators_DynamicAccessKeyValueIterator
	,access: null
	,keys: null
	,index: null
});
class haxe_iterators_HashMapKeyValueIterator {
	constructor(map) {
		this.map = map;
		this.keys = map.keys.iterator();
	}
	hasNext() {
		return this.keys.hasNext();
	}
	next() {
		let key = this.keys.next();
		let _this = this.map.values;
		let key1 = key.hashCode();
		return { value : _this.h[key1], key : key};
	}
}
$hxClasses["haxe.iterators.HashMapKeyValueIterator"] = haxe_iterators_HashMapKeyValueIterator;
haxe_iterators_HashMapKeyValueIterator.__name__ = "haxe.iterators.HashMapKeyValueIterator";
Object.assign(haxe_iterators_HashMapKeyValueIterator.prototype, {
	__class__: haxe_iterators_HashMapKeyValueIterator
	,map: null
	,keys: null
});
class haxe_iterators_MapKeyValueIterator {
	constructor(map) {
		this.map = map;
		this.keys = map.keys();
	}
	hasNext() {
		return this.keys.hasNext();
	}
	next() {
		let key = this.keys.next();
		return { value : this.map.get(key), key : key};
	}
}
$hxClasses["haxe.iterators.MapKeyValueIterator"] = haxe_iterators_MapKeyValueIterator;
haxe_iterators_MapKeyValueIterator.__name__ = "haxe.iterators.MapKeyValueIterator";
Object.assign(haxe_iterators_MapKeyValueIterator.prototype, {
	__class__: haxe_iterators_MapKeyValueIterator
	,map: null
	,keys: null
});
class haxe_iterators_RestIterator {
	constructor(args) {
		this.current = 0;
		this.args = args;
	}
	hasNext() {
		return this.current < this.args.length;
	}
	next() {
		return this.args[this.current++];
	}
}
$hxClasses["haxe.iterators.RestIterator"] = haxe_iterators_RestIterator;
haxe_iterators_RestIterator.__name__ = "haxe.iterators.RestIterator";
Object.assign(haxe_iterators_RestIterator.prototype, {
	__class__: haxe_iterators_RestIterator
	,args: null
	,current: null
});
class haxe_iterators_RestKeyValueIterator {
	constructor(args) {
		this.current = 0;
		this.args = args;
	}
	hasNext() {
		return this.current < this.args.length;
	}
	next() {
		return { key : this.current, value : this.args[this.current++]};
	}
}
$hxClasses["haxe.iterators.RestKeyValueIterator"] = haxe_iterators_RestKeyValueIterator;
haxe_iterators_RestKeyValueIterator.__name__ = "haxe.iterators.RestKeyValueIterator";
Object.assign(haxe_iterators_RestKeyValueIterator.prototype, {
	__class__: haxe_iterators_RestKeyValueIterator
	,args: null
	,current: null
});
class haxe_iterators_StringIterator {
	constructor(s) {
		this.offset = 0;
		this.s = s;
	}
	hasNext() {
		return this.offset < this.s.length;
	}
	next() {
		return this.s.charCodeAt(this.offset++);
	}
}
$hxClasses["haxe.iterators.StringIterator"] = haxe_iterators_StringIterator;
haxe_iterators_StringIterator.__name__ = "haxe.iterators.StringIterator";
Object.assign(haxe_iterators_StringIterator.prototype, {
	__class__: haxe_iterators_StringIterator
	,offset: null
	,s: null
});
class haxe_iterators_StringIteratorUnicode {
	constructor(s) {
		this.offset = 0;
		this.s = s;
	}
	hasNext() {
		return this.offset < this.s.length;
	}
	next() {
		let s = this.s;
		let index = this.offset++;
		let c = s.charCodeAt(index);
		if(c >= 55296 && c <= 56319) {
			c = c - 55232 << 10 | s.charCodeAt(index + 1) & 1023;
		}
		let c1 = c;
		if(c1 >= 65536) {
			this.offset++;
		}
		return c1;
	}
	static unicodeIterator(s) {
		return new haxe_iterators_StringIteratorUnicode(s);
	}
}
$hxClasses["haxe.iterators.StringIteratorUnicode"] = haxe_iterators_StringIteratorUnicode;
haxe_iterators_StringIteratorUnicode.__name__ = "haxe.iterators.StringIteratorUnicode";
Object.assign(haxe_iterators_StringIteratorUnicode.prototype, {
	__class__: haxe_iterators_StringIteratorUnicode
	,offset: null
	,s: null
});
class haxe_iterators_StringKeyValueIterator {
	constructor(s) {
		this.offset = 0;
		this.s = s;
	}
	hasNext() {
		return this.offset < this.s.length;
	}
	next() {
		return { key : this.offset, value : this.s.charCodeAt(this.offset++)};
	}
}
$hxClasses["haxe.iterators.StringKeyValueIterator"] = haxe_iterators_StringKeyValueIterator;
haxe_iterators_StringKeyValueIterator.__name__ = "haxe.iterators.StringKeyValueIterator";
Object.assign(haxe_iterators_StringKeyValueIterator.prototype, {
	__class__: haxe_iterators_StringKeyValueIterator
	,offset: null
	,s: null
});
class js_Boot {
	static isClass(o) {
		return o.__name__;
	}
	static isInterface(o) {
		return o.__isInterface__;
	}
	static isEnum(e) {
		return e.__ename__;
	}
	static getClass(o) {
		if(o == null) {
			return null;
		} else if(((o) instanceof Array)) {
			return Array;
		} else {
			let cl = o.__class__;
			if(cl != null) {
				return cl;
			}
			let name = js_Boot.__nativeClassName(o);
			if(name != null) {
				return js_Boot.__resolveNativeClass(name);
			}
			return null;
		}
	}
	static __string_rec(o,s) {
		if(o == null) {
			return "null";
		}
		if(s.length >= 5) {
			return "<...>";
		}
		let t = typeof(o);
		if(t == "function" && (o.__name__ || o.__ename__)) {
			t = "object";
		}
		switch(t) {
		case "function":
			return "<function>";
		case "object":
			if(o.__enum__) {
				let e = $hxEnums[o.__enum__];
				let con = e.__constructs__[o._hx_index];
				let n = con._hx_name;
				if(con.__params__) {
					s = s + "\t";
					return n + "(" + ((function($this) {
						var $r;
						let _g = [];
						{
							let _g1 = 0;
							let _g2 = con.__params__;
							while(true) {
								if(!(_g1 < _g2.length)) {
									break;
								}
								let p = _g2[_g1];
								_g1 = _g1 + 1;
								_g.push(js_Boot.__string_rec(o[p],s));
							}
						}
						$r = _g;
						return $r;
					}(this))).join(",") + ")";
				} else {
					return n;
				}
			}
			if(((o) instanceof Array)) {
				let str = "[";
				s += "\t";
				let _g = 0;
				let _g1 = o.length;
				while(_g < _g1) {
					let i = _g++;
					str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
				}
				str += "]";
				return str;
			}
			let tostr;
			try {
				tostr = o.toString;
			} catch( _g ) {
				haxe_NativeStackTrace.lastError = _g;
				return "???";
			}
			if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
				let s2 = o.toString();
				if(s2 != "[object Object]") {
					return s2;
				}
			}
			let str = "{\n";
			s += "\t";
			let hasp = o.hasOwnProperty != null;
			let k = null;
			for( k in o ) {
			if(hasp && !o.hasOwnProperty(k)) {
				continue;
			}
			if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
				continue;
			}
			if(str.length != 2) {
				str += ", \n";
			}
			str += s + k + " : " + js_Boot.__string_rec(o[k],s);
			}
			s = s.substring(1);
			str += "\n" + s + "}";
			return str;
		case "string":
			return o;
		default:
			return String(o);
		}
	}
	static __interfLoop(cc,cl) {
		if(cc == null) {
			return false;
		}
		if(cc == cl) {
			return true;
		}
		let intf = cc.__interfaces__;
		if(intf != null && (cc.__super__ == null || cc.__super__.__interfaces__ != intf)) {
			let _g = 0;
			let _g1 = intf.length;
			while(_g < _g1) {
				let i = _g++;
				let i1 = intf[i];
				if(i1 == cl || js_Boot.__interfLoop(i1,cl)) {
					return true;
				}
			}
		}
		return js_Boot.__interfLoop(cc.__super__,cl);
	}
	static __instanceof(o,cl) {
		if(cl == null) {
			return false;
		}
		switch(cl) {
		case Array:
			return ((o) instanceof Array);
		case Bool:
			return typeof(o) == "boolean";
		case Dynamic:
			return o != null;
		case Float:
			return typeof(o) == "number";
		case Int:
			if(typeof(o) == "number") {
				return ((o | 0) === o);
			} else {
				return false;
			}
			break;
		case String:
			return typeof(o) == "string";
		default:
			if(o != null) {
				if(typeof(cl) == "function") {
					if(js_Boot.__downcastCheck(o,cl)) {
						return true;
					}
				} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
					if(((o) instanceof cl)) {
						return true;
					}
				}
			} else {
				return false;
			}
			if(cl == Class ? o.__name__ != null : false) {
				return true;
			}
			if(cl == Enum ? o.__ename__ != null : false) {
				return true;
			}
			return o.__enum__ != null ? $hxEnums[o.__enum__] == cl : false;
		}
	}
	static __downcastCheck(o,cl) {
		if(!((o) instanceof cl)) {
			if(cl.__isInterface__) {
				return js_Boot.__interfLoop(js_Boot.getClass(o),cl);
			} else {
				return false;
			}
		} else {
			return true;
		}
	}
	static __implements(o,iface) {
		return js_Boot.__interfLoop(js_Boot.getClass(o),iface);
	}
	static __cast(o,t) {
		if(o == null || js_Boot.__instanceof(o,t)) {
			return o;
		} else {
			throw haxe_Exception.thrown("Cannot cast " + Std.string(o) + " to " + Std.string(t));
		}
	}
	static __nativeClassName(o) {
		let name = js_Boot.__toStr.call(o).slice(8,-1);
		if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") {
			return null;
		}
		return name;
	}
	static __isNativeObj(o) {
		return js_Boot.__nativeClassName(o) != null;
	}
	static __resolveNativeClass(name) {
		return $global[name];
	}
}
js_Boot.__toStr = null;
$hxClasses["js.Boot"] = js_Boot;
js_Boot.__name__ = "js.Boot";
class js_Lib {
	static debug() {
		debugger;
	}
	static alert(v) {
		alert(js_Boot.__string_rec(v,""));
	}
	static eval(code) {
		return eval(code);
	}
	static get_undefined() {
		return undefined;
	}
	static rethrow() {
	}
	static getOriginalException() {
		return null;
	}
	static getNextHaxeUID() {
		return $global.$haxeUID++;
	}
}
$hxClasses["js.Lib"] = js_Lib;
js_Lib.__name__ = "js.Lib";
js_Lib.__properties__ = {get_undefined: "get_undefined"};
class js_lib_HaxeIterator {
	constructor(jsIterator) {
		this.jsIterator = jsIterator;
		this.lastStep = jsIterator.next();
	}
	hasNext() {
		return !this.lastStep.done;
	}
	next() {
		let v = this.lastStep.value;
		this.lastStep = this.jsIterator.next();
		return v;
	}
	static iterator(jsIterator) {
		return new js_lib_HaxeIterator(jsIterator);
	}
}
$hxClasses["js.lib.HaxeIterator"] = js_lib_HaxeIterator;
js_lib_HaxeIterator.__name__ = "js.lib.HaxeIterator";
Object.assign(js_lib_HaxeIterator.prototype, {
	__class__: js_lib_HaxeIterator
	,jsIterator: null
	,lastStep: null
});
class js_lib_KeyValue {
	static get_key(this1) {
		return this1[0];
	}
	static get_value(this1) {
		return this1[1];
	}
}
js_lib_KeyValue.__properties__ = {get_value: "get_value",get_key: "get_key"};
class js_lib_ObjectEntry {
	static get_key(this1) {
		return this1[0];
	}
	static get_value(this1) {
		return this1[1];
	}
}
js_lib_ObjectEntry.__properties__ = {get_value: "get_value",get_key: "get_key"};
class seedyrng_GeneratorInterface {
}
$hxClasses["seedyrng.GeneratorInterface"] = seedyrng_GeneratorInterface;
seedyrng_GeneratorInterface.__name__ = "seedyrng.GeneratorInterface";
seedyrng_GeneratorInterface.__isInterface__ = true;
Object.assign(seedyrng_GeneratorInterface.prototype, {
	__class__: seedyrng_GeneratorInterface
	,get_seed: null
	,set_seed: null
	,get_state: null
	,set_state: null
	,get_usesAllBits: null
	,nextInt: null
	,__properties__: {get_usesAllBits: "get_usesAllBits",set_state: "set_state",get_state: "get_state",set_seed: "set_seed",get_seed: "get_seed"}
});
class seedyrng_Random {
	constructor(seed,generator) {
		if(seed == null) {
			let this1 = new haxe__$Int64__$_$_$Int64(seedyrng_Random.randomSystemInt(),seedyrng_Random.randomSystemInt());
			seed = this1;
		}
		if(generator == null) {
			generator = new seedyrng_Xorshift128Plus();
		}
		this.generator = generator;
		this.set_seed(seed);
	}
	get_seed() {
		return this.generator.get_seed();
	}
	set_seed(value) {
		return this.generator.set_seed(value);
	}
	get_state() {
		return this.generator.get_state();
	}
	set_state(value) {
		return this.generator.set_state(value);
	}
	get_usesAllBits() {
		return this.generator.get_usesAllBits();
	}
	nextInt() {
		return this.generator.nextInt();
	}
	nextFullInt() {
		if(this.generator.get_usesAllBits()) {
			return this.generator.nextInt();
		} else {
			let num1 = this.generator.nextInt();
			let num2 = this.generator.nextInt();
			num2 = num2 >>> 16 | num2 << 16;
			return num1 ^ num2;
		}
	}
	setStringSeed(seed) {
		this.setBytesSeed(haxe_io_Bytes.ofString(seed));
	}
	setBytesSeed(seed) {
		let hash = haxe_crypto_Sha1.make(seed);
		this.set_seed(hash.getInt64(0));
	}
	random() {
		let upper = this.nextFullInt() & 2097151;
		let lower = this.nextFullInt();
		let lhs = upper * Math.pow(2,32);
		let floatNum = UInt.toFloat(lower) + lhs;
		let result = floatNum * Math.pow(2,-53);
		return result;
	}
	randomInt(lower,upper) {
		return Math.floor(this.random() * (upper - lower + 1)) + lower;
	}
	uniform(lower,upper) {
		return this.random() * (upper - lower) + lower;
	}
	choice(array) {
		return array[this.randomInt(0,array.length - 1)];
	}
	shuffle(array) {
		let _g = 0;
		let _g1 = array.length - 1;
		while(_g < _g1) {
			let index = _g++;
			let randIndex = this.randomInt(index,array.length - 1);
			let tempA = array[index];
			let tempB = array[randIndex];
			array[index] = tempB;
			array[randIndex] = tempA;
		}
	}
	static randomSystemInt() {
		let value = Std.random(255) << 24 | Std.random(255) << 16 | Std.random(255) << 8 | Std.random(255);
		return value;
	}
}
$hxClasses["seedyrng.Random"] = seedyrng_Random;
seedyrng_Random.__name__ = "seedyrng.Random";
seedyrng_Random.__interfaces__ = [seedyrng_GeneratorInterface];
Object.assign(seedyrng_Random.prototype, {
	__class__: seedyrng_Random
	,generator: null
	,__properties__: {get_usesAllBits: "get_usesAllBits",set_state: "set_state",get_state: "get_state",set_seed: "set_seed",get_seed: "get_seed"}
});
class seedyrng_Xorshift128Plus {
	constructor() {
		this._currentAvailable = false;
		let this1 = new haxe__$Int64__$_$_$Int64(0,1);
		this.set_seed(this1);
	}
	get_usesAllBits() {
		return false;
	}
	get_seed() {
		return this._seed;
	}
	set_seed(value) {
		let b_high = 0;
		let b_low = 0;
		if(!(value.high != b_high || value.low != b_low)) {
			let this1 = new haxe__$Int64__$_$_$Int64(0,1);
			value = this1;
		}
		this._seed = value;
		this._state0 = value;
		this._state1 = seedyrng_Xorshift128Plus.SEED_1;
		this._currentAvailable = false;
		return value;
	}
	get_state() {
		let bytes = new haxe_io_Bytes(new ArrayBuffer(33));
		bytes.setInt64(0,this._seed);
		bytes.setInt64(8,this._state0);
		bytes.setInt64(16,this._state1);
		bytes.b[24] = this._currentAvailable ? 1 : 0;
		if(this._currentAvailable) {
			bytes.setInt64(25,this._current);
		}
		return bytes;
	}
	set_state(value) {
		if(value.length != 33) {
			throw haxe_Exception.thrown("Wrong state size " + value.length);
		}
		this._seed = value.getInt64(0);
		this._state0 = value.getInt64(8);
		this._state1 = value.getInt64(16);
		this._currentAvailable = value.b[24] == 1;
		if(this._currentAvailable) {
			this._current = value.getInt64(25);
		}
		return value;
	}
	stepNext() {
		let x = this._state0;
		let y = this._state1;
		this._state0 = y;
		let b = 23;
		b &= 63;
		let b1;
		if(b == 0) {
			let this1 = new haxe__$Int64__$_$_$Int64(x.high,x.low);
			b1 = this1;
		} else if(b < 32) {
			let this1 = new haxe__$Int64__$_$_$Int64(x.high << b | x.low >>> 32 - b,x.low << b);
			b1 = this1;
		} else {
			let this1 = new haxe__$Int64__$_$_$Int64(x.low << b - 32,0);
			b1 = this1;
		}
		let this1 = new haxe__$Int64__$_$_$Int64(x.high ^ b1.high,x.low ^ b1.low);
		x = this1;
		let a_high = x.high ^ y.high;
		let a_low = x.low ^ y.low;
		let b2 = 17;
		b2 &= 63;
		let b3;
		if(b2 == 0) {
			let this1 = new haxe__$Int64__$_$_$Int64(x.high,x.low);
			b3 = this1;
		} else if(b2 < 32) {
			let this1 = new haxe__$Int64__$_$_$Int64(x.high >> b2,x.high << 32 - b2 | x.low >>> b2);
			b3 = this1;
		} else {
			let this1 = new haxe__$Int64__$_$_$Int64(x.high >> 31,x.high >> b2 - 32);
			b3 = this1;
		}
		let a_high1 = a_high ^ b3.high;
		let a_low1 = a_low ^ b3.low;
		let b4 = 26;
		b4 &= 63;
		let b5;
		if(b4 == 0) {
			let this1 = new haxe__$Int64__$_$_$Int64(y.high,y.low);
			b5 = this1;
		} else if(b4 < 32) {
			let this1 = new haxe__$Int64__$_$_$Int64(y.high >> b4,y.high << 32 - b4 | y.low >>> b4);
			b5 = this1;
		} else {
			let this1 = new haxe__$Int64__$_$_$Int64(y.high >> 31,y.high >> b4 - 32);
			b5 = this1;
		}
		let this2 = new haxe__$Int64__$_$_$Int64(a_high1 ^ b5.high,a_low1 ^ b5.low);
		this._state1 = this2;
		let a = this._state1;
		let high = a.high + y.high | 0;
		let low = a.low + y.low | 0;
		if(haxe_Int32.ucompare(low,a.low) < 0) {
			let ret = high++;
			high = high | 0;
		}
		let this3 = new haxe__$Int64__$_$_$Int64(high,low);
		this._current = this3;
	}
	nextInt() {
		if(this._currentAvailable) {
			this._currentAvailable = false;
			return this._current.low;
		} else {
			this.stepNext();
			this._currentAvailable = true;
			return this._current.high;
		}
	}
}
$hxClasses["seedyrng.Xorshift128Plus"] = seedyrng_Xorshift128Plus;
seedyrng_Xorshift128Plus.__name__ = "seedyrng.Xorshift128Plus";
seedyrng_Xorshift128Plus.__interfaces__ = [seedyrng_GeneratorInterface];
Object.assign(seedyrng_Xorshift128Plus.prototype, {
	__class__: seedyrng_Xorshift128Plus
	,_seed: null
	,_state0: null
	,_state1: null
	,_current: null
	,_currentAvailable: null
	,__properties__: {get_usesAllBits: "get_usesAllBits",set_state: "set_state",get_state: "get_state",set_seed: "set_seed",get_seed: "get_seed"}
});
function $getIterator(o) { if( o instanceof Array ) return new haxe_iterators_ArrayIterator(o); else return o.iterator(); }
if(typeof(performance) != "undefined" ? typeof(performance.now) == "function" : false) {
	HxOverrides.now = performance.now.bind(performance);
}
$hxClasses["Math"] = Math;
if( String.fromCodePoint == null ) String.fromCodePoint = function(c) { return c < 0x10000 ? String.fromCharCode(c) : String.fromCharCode((c>>10)+0xD7C0)+String.fromCharCode((c&0x3FF)+0xDC00); }
{
	String.prototype.__class__ = $hxClasses["String"] = String;
	String.__name__ = "String";
	$hxClasses["Array"] = Array;
	Array.__name__ = "Array";
	Date.prototype.__class__ = $hxClasses["Date"] = Date;
	Date.__name__ = "Date";
	var Int = { };
	var Dynamic = { };
	var Float = Number;
	var Bool = Boolean;
	var Class = { };
	var Enum = { };
}
haxe_ds_ObjectMap.count = 0;
js_Boot.__toStr = ({ }).toString;
EReg.escapeRe = new RegExp("[.*+?^${}()|[\\]\\\\]","g");
haxe_SysTools.winMetaCharacters = [32,40,41,37,33,94,34,60,62,38,124,10,13,44,59];
StringTools.winMetaCharacters = haxe_SysTools.winMetaCharacters;
StringTools.MIN_SURROGATE_CODE_POINT = 65536;
dropecho_dungen_Map2d._hx_skip_constructor = false;
dropecho_dungen_bsp_BSPGeneratorConfig._hx_skip_constructor = false;
haxe_Int32._mul = Math.imul != null ? Math.imul : function(a,b) {
	return a * (b & 65535) + (a * (b >>> 16) << 16 | 0) | 0;
};
seedyrng_Xorshift128Plus.PARAMETER_A = 23;
seedyrng_Xorshift128Plus.PARAMETER_B = 17;
seedyrng_Xorshift128Plus.PARAMETER_C = 26;
seedyrng_Xorshift128Plus.SEED_1 = (function($this) {
	var $r;
	let this1 = new haxe__$Int64__$_$_$Int64(842650776,685298713);
	$r = this1;
	return $r;
}(this));
})(typeof exports != "undefined" ? exports : typeof window != "undefined" ? window : typeof self != "undefined" ? self : this, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
