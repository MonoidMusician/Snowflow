(() => {
  // output/Data.Functor/foreign.js
  var arrayMap = function(f) {
    return function(arr) {
      var l = arr.length;
      var result = new Array(l);
      for (var i2 = 0; i2 < l; i2++) {
        result[i2] = f(arr[i2]);
      }
      return result;
    };
  };

  // output/Control.Semigroupoid/index.js
  var semigroupoidFn = {
    compose: function(f) {
      return function(g2) {
        return function(x) {
          return f(g2(x));
        };
      };
    }
  };
  var compose = function(dict) {
    return dict.compose;
  };

  // output/Control.Category/index.js
  var identity = function(dict) {
    return dict.identity;
  };
  var categoryFn = {
    identity: function(x) {
      return x;
    },
    Semigroupoid0: function() {
      return semigroupoidFn;
    }
  };

  // output/Data.Boolean/index.js
  var otherwise = true;

  // output/Data.Function/index.js
  var on = function(f) {
    return function(g2) {
      return function(x) {
        return function(y) {
          return f(g2(x))(g2(y));
        };
      };
    };
  };
  var flip = function(f) {
    return function(b2) {
      return function(a2) {
        return f(a2)(b2);
      };
    };
  };
  var $$const = function(a2) {
    return function(v) {
      return a2;
    };
  };
  var applyFlipped = function(x) {
    return function(f) {
      return f(x);
    };
  };

  // output/Data.Unit/foreign.js
  var unit = void 0;

  // output/Type.Proxy/index.js
  var $$Proxy = /* @__PURE__ */ function() {
    function $$Proxy2() {
    }
    ;
    $$Proxy2.value = new $$Proxy2();
    return $$Proxy2;
  }();

  // output/Data.Functor/index.js
  var map = function(dict) {
    return dict.map;
  };
  var mapFlipped = function(dictFunctor) {
    var map17 = map(dictFunctor);
    return function(fa) {
      return function(f) {
        return map17(f)(fa);
      };
    };
  };
  var $$void = function(dictFunctor) {
    return map(dictFunctor)($$const(unit));
  };
  var voidLeft = function(dictFunctor) {
    var map17 = map(dictFunctor);
    return function(f) {
      return function(x) {
        return map17($$const(x))(f);
      };
    };
  };
  var voidRight = function(dictFunctor) {
    var map17 = map(dictFunctor);
    return function(x) {
      return map17($$const(x));
    };
  };
  var functorFn = {
    map: /* @__PURE__ */ compose(semigroupoidFn)
  };
  var functorArray = {
    map: arrayMap
  };

  // output/Data.Semigroup/foreign.js
  var concatString = function(s1) {
    return function(s2) {
      return s1 + s2;
    };
  };
  var concatArray = function(xs) {
    return function(ys) {
      if (xs.length === 0)
        return ys;
      if (ys.length === 0)
        return xs;
      return xs.concat(ys);
    };
  };

  // output/Data.Symbol/index.js
  var reflectSymbol = function(dict) {
    return dict.reflectSymbol;
  };

  // output/Data.Void/index.js
  var absurd = function(a2) {
    var spin = function($copy_v) {
      var $tco_result;
      function $tco_loop(v) {
        $copy_v = v;
        return;
      }
      ;
      while (true) {
        $tco_result = $tco_loop($copy_v);
      }
      ;
      return $tco_result;
    };
    return spin(a2);
  };

  // output/Record.Unsafe/foreign.js
  var unsafeHas = function(label5) {
    return function(rec) {
      return {}.hasOwnProperty.call(rec, label5);
    };
  };
  var unsafeGet = function(label5) {
    return function(rec) {
      return rec[label5];
    };
  };

  // output/Data.Semigroup/index.js
  var semigroupUnit = {
    append: function(v) {
      return function(v1) {
        return unit;
      };
    }
  };
  var semigroupString = {
    append: concatString
  };
  var semigroupArray = {
    append: concatArray
  };
  var append = function(dict) {
    return dict.append;
  };

  // output/Control.Alt/index.js
  var alt = function(dict) {
    return dict.alt;
  };

  // output/Control.Apply/foreign.js
  var arrayApply = function(fs) {
    return function(xs) {
      var l = fs.length;
      var k = xs.length;
      var result = new Array(l * k);
      var n = 0;
      for (var i2 = 0; i2 < l; i2++) {
        var f = fs[i2];
        for (var j = 0; j < k; j++) {
          result[n++] = f(xs[j]);
        }
      }
      return result;
    };
  };

  // output/Control.Apply/index.js
  var identity2 = /* @__PURE__ */ identity(categoryFn);
  var applyFn = {
    apply: function(f) {
      return function(g2) {
        return function(x) {
          return f(x)(g2(x));
        };
      };
    },
    Functor0: function() {
      return functorFn;
    }
  };
  var applyArray = {
    apply: arrayApply,
    Functor0: function() {
      return functorArray;
    }
  };
  var apply = function(dict) {
    return dict.apply;
  };
  var applySecond = function(dictApply) {
    var apply1 = apply(dictApply);
    var map17 = map(dictApply.Functor0());
    return function(a2) {
      return function(b2) {
        return apply1(map17($$const(identity2))(a2))(b2);
      };
    };
  };
  var lift2 = function(dictApply) {
    var apply1 = apply(dictApply);
    var map17 = map(dictApply.Functor0());
    return function(f) {
      return function(a2) {
        return function(b2) {
          return apply1(map17(f)(a2))(b2);
        };
      };
    };
  };

  // output/Control.Applicative/index.js
  var pure = function(dict) {
    return dict.pure;
  };
  var unless = function(dictApplicative) {
    var pure16 = pure(dictApplicative);
    return function(v) {
      return function(v1) {
        if (!v) {
          return v1;
        }
        ;
        if (v) {
          return pure16(unit);
        }
        ;
        throw new Error("Failed pattern match at Control.Applicative (line 68, column 1 - line 68, column 65): " + [v.constructor.name, v1.constructor.name]);
      };
    };
  };
  var when = function(dictApplicative) {
    var pure16 = pure(dictApplicative);
    return function(v) {
      return function(v1) {
        if (v) {
          return v1;
        }
        ;
        if (!v) {
          return pure16(unit);
        }
        ;
        throw new Error("Failed pattern match at Control.Applicative (line 63, column 1 - line 63, column 63): " + [v.constructor.name, v1.constructor.name]);
      };
    };
  };
  var liftA1 = function(dictApplicative) {
    var apply5 = apply(dictApplicative.Apply0());
    var pure16 = pure(dictApplicative);
    return function(f) {
      return function(a2) {
        return apply5(pure16(f))(a2);
      };
    };
  };
  var applicativeArray = {
    pure: function(x) {
      return [x];
    },
    Apply0: function() {
      return applyArray;
    }
  };

  // output/Control.Bind/foreign.js
  var arrayBind = function(arr) {
    return function(f) {
      var result = [];
      for (var i2 = 0, l = arr.length; i2 < l; i2++) {
        Array.prototype.push.apply(result, f(arr[i2]));
      }
      return result;
    };
  };

  // output/Control.Bind/index.js
  var identity3 = /* @__PURE__ */ identity(categoryFn);
  var discard = function(dict) {
    return dict.discard;
  };
  var bindFn = {
    bind: function(m) {
      return function(f) {
        return function(x) {
          return f(m(x))(x);
        };
      };
    },
    Apply0: function() {
      return applyFn;
    }
  };
  var bindArray = {
    bind: arrayBind,
    Apply0: function() {
      return applyArray;
    }
  };
  var bind = function(dict) {
    return dict.bind;
  };
  var bindFlipped = function(dictBind) {
    return flip(bind(dictBind));
  };
  var composeKleisli = function(dictBind) {
    var bind13 = bind(dictBind);
    return function(f) {
      return function(g2) {
        return function(a2) {
          return bind13(f(a2))(g2);
        };
      };
    };
  };
  var discardUnit = {
    discard: function(dictBind) {
      return bind(dictBind);
    }
  };
  var join = function(dictBind) {
    var bind13 = bind(dictBind);
    return function(m) {
      return bind13(m)(identity3);
    };
  };

  // output/Data.Eq/foreign.js
  var refEq = function(r1) {
    return function(r2) {
      return r1 === r2;
    };
  };
  var eqBooleanImpl = refEq;
  var eqIntImpl = refEq;
  var eqNumberImpl = refEq;
  var eqStringImpl = refEq;
  var eqArrayImpl = function(f) {
    return function(xs) {
      return function(ys) {
        if (xs.length !== ys.length)
          return false;
        for (var i2 = 0; i2 < xs.length; i2++) {
          if (!f(xs[i2])(ys[i2]))
            return false;
        }
        return true;
      };
    };
  };

  // output/Data.Eq/index.js
  var eqString = {
    eq: eqStringImpl
  };
  var eqNumber = {
    eq: eqNumberImpl
  };
  var eqInt = {
    eq: eqIntImpl
  };
  var eqBoolean = {
    eq: eqBooleanImpl
  };
  var eq = function(dict) {
    return dict.eq;
  };
  var eq2 = /* @__PURE__ */ eq(eqBoolean);
  var eqArray = function(dictEq) {
    return {
      eq: eqArrayImpl(eq(dictEq))
    };
  };
  var notEq = function(dictEq) {
    var eq32 = eq(dictEq);
    return function(x) {
      return function(y) {
        return eq2(eq32(x)(y))(false);
      };
    };
  };

  // output/Record.Unsafe.Union/foreign.js
  function unsafeUnionFn(r1, r2) {
    var copy = {};
    for (var k1 in r2) {
      if ({}.hasOwnProperty.call(r2, k1)) {
        copy[k1] = r2[k1];
      }
    }
    for (var k2 in r1) {
      if ({}.hasOwnProperty.call(r1, k2)) {
        copy[k2] = r1[k2];
      }
    }
    return copy;
  }

  // output/Unsafe.Coerce/foreign.js
  var unsafeCoerce2 = function(x) {
    return x;
  };

  // output/Record/index.js
  var merge = function() {
    return function() {
      return function(l) {
        return function(r) {
          return unsafeUnionFn(l, r);
        };
      };
    };
  };
  var get = function(dictIsSymbol) {
    var reflectSymbol2 = reflectSymbol(dictIsSymbol);
    return function() {
      return function(l) {
        return function(r) {
          return unsafeGet(reflectSymbol2(l))(r);
        };
      };
    };
  };

  // output/Record.Builder/foreign.js
  function copyRecord(rec) {
    var copy = {};
    for (var key2 in rec) {
      if ({}.hasOwnProperty.call(rec, key2)) {
        copy[key2] = rec[key2];
      }
    }
    return copy;
  }
  function unsafeInsert(l) {
    return function(a2) {
      return function(rec) {
        rec[l] = a2;
        return rec;
      };
    };
  }

  // output/Record.Builder/index.js
  var semigroupoidBuilder = semigroupoidFn;
  var insert = function() {
    return function() {
      return function(dictIsSymbol) {
        var reflectSymbol2 = reflectSymbol(dictIsSymbol);
        return function(l) {
          return function(a2) {
            return function(r1) {
              return unsafeInsert(reflectSymbol2(l))(a2)(r1);
            };
          };
        };
      };
    };
  };
  var categoryBuilder = categoryFn;
  var build = function(v) {
    return function(r1) {
      return v(copyRecord(r1));
    };
  };
  var buildFromScratch = /* @__PURE__ */ flip(build)({});

  // output/ConvertableOptions/index.js
  var merge2 = /* @__PURE__ */ merge()();
  var identity4 = /* @__PURE__ */ identity(categoryBuilder);
  var compose1 = /* @__PURE__ */ compose(semigroupoidBuilder);
  var insert2 = /* @__PURE__ */ insert()();
  var defaultsRecord = function() {
    return function() {
      return {
        defaults: flip(merge2)
      };
    };
  };
  var defaults = function(dict) {
    return dict.defaults;
  };
  var convertRecordOptionsNil = {
    convertRecordOptions: function(v) {
      return function(v1) {
        return function(v2) {
          return identity4;
        };
      };
    }
  };
  var convertRecordOptions = function(dict) {
    return dict.convertRecordOptions;
  };
  var convertOptionsWithDefaults = function(dict) {
    return dict.convertOptionsWithDefaults;
  };
  var convertOptionsRecord = function() {
    return function(dictConvertRecordOptions) {
      var convertRecordOptions1 = convertRecordOptions(dictConvertRecordOptions);
      return {
        convertOptions: function(t) {
          return function(i2) {
            return buildFromScratch(convertRecordOptions1(t)($$Proxy.value)(i2));
          };
        }
      };
    };
  };
  var convertOptions = function(dict) {
    return dict.convertOptions;
  };
  var convertOptionsWithDefaultsRecord = function(dictConvertOptions) {
    var convertOptions1 = convertOptions(dictConvertOptions);
    return function(dictDefaults) {
      var defaults1 = defaults(dictDefaults);
      return {
        convertOptionsWithDefaults: function(t) {
          return function(def) {
            var $30 = defaults1(def);
            var $31 = convertOptions1(t);
            return function($32) {
              return $30($31($32));
            };
          };
        }
      };
    };
  };
  var convertOption = function(dict) {
    return dict.convertOption;
  };
  var convertRecordOptionsCons = function(dictConvertRecordOptions) {
    var convertRecordOptions1 = convertRecordOptions(dictConvertRecordOptions);
    return function(dictConvertOption) {
      var convertOption1 = convertOption(dictConvertOption);
      return function() {
        return function() {
          return function() {
            return function(dictIsSymbol) {
              var insert1 = insert2(dictIsSymbol);
              var get3 = get(dictIsSymbol)();
              return {
                convertRecordOptions: function(t) {
                  return function(v) {
                    return function(r) {
                      return compose1(insert1($$Proxy.value)(convertOption1(t)($$Proxy.value)(get3($$Proxy.value)(r))))(convertRecordOptions1(t)($$Proxy.value)(r));
                    };
                  };
                }
              };
            };
          };
        };
      };
    };
  };

  // output/Data.Array/foreign.js
  var range = function(start2) {
    return function(end) {
      var step3 = start2 > end ? -1 : 1;
      var result = new Array(step3 * (end - start2) + 1);
      var i2 = start2, n = 0;
      while (i2 !== end) {
        result[n++] = i2;
        i2 += step3;
      }
      result[n] = i2;
      return result;
    };
  };
  var replicateFill = function(count2) {
    return function(value12) {
      if (count2 < 1) {
        return [];
      }
      var result = new Array(count2);
      return result.fill(value12);
    };
  };
  var replicatePolyfill = function(count2) {
    return function(value12) {
      var result = [];
      var n = 0;
      for (var i2 = 0; i2 < count2; i2++) {
        result[n++] = value12;
      }
      return result;
    };
  };
  var replicate = typeof Array.prototype.fill === "function" ? replicateFill : replicatePolyfill;
  var fromFoldableImpl = function() {
    function Cons3(head6, tail3) {
      this.head = head6;
      this.tail = tail3;
    }
    var emptyList = {};
    function curryCons(head6) {
      return function(tail3) {
        return new Cons3(head6, tail3);
      };
    }
    function listToArray(list) {
      var result = [];
      var count2 = 0;
      var xs = list;
      while (xs !== emptyList) {
        result[count2++] = xs.head;
        xs = xs.tail;
      }
      return result;
    }
    return function(foldr5) {
      return function(xs) {
        return listToArray(foldr5(curryCons)(emptyList)(xs));
      };
    };
  }();
  var length = function(xs) {
    return xs.length;
  };
  var indexImpl = function(just) {
    return function(nothing) {
      return function(xs) {
        return function(i2) {
          return i2 < 0 || i2 >= xs.length ? nothing : just(xs[i2]);
        };
      };
    };
  };
  var findIndexImpl = function(just) {
    return function(nothing) {
      return function(f) {
        return function(xs) {
          for (var i2 = 0, l = xs.length; i2 < l; i2++) {
            if (f(xs[i2]))
              return just(i2);
          }
          return nothing;
        };
      };
    };
  };
  var _deleteAt = function(just) {
    return function(nothing) {
      return function(i2) {
        return function(l) {
          if (i2 < 0 || i2 >= l.length)
            return nothing;
          var l1 = l.slice();
          l1.splice(i2, 1);
          return just(l1);
        };
      };
    };
  };
  var reverse = function(l) {
    return l.slice().reverse();
  };
  var filter = function(f) {
    return function(xs) {
      return xs.filter(f);
    };
  };
  var sortByImpl = function() {
    function mergeFromTo(compare4, fromOrdering, xs1, xs2, from4, to2) {
      var mid;
      var i2;
      var j;
      var k;
      var x;
      var y;
      var c;
      mid = from4 + (to2 - from4 >> 1);
      if (mid - from4 > 1)
        mergeFromTo(compare4, fromOrdering, xs2, xs1, from4, mid);
      if (to2 - mid > 1)
        mergeFromTo(compare4, fromOrdering, xs2, xs1, mid, to2);
      i2 = from4;
      j = mid;
      k = from4;
      while (i2 < mid && j < to2) {
        x = xs2[i2];
        y = xs2[j];
        c = fromOrdering(compare4(x)(y));
        if (c > 0) {
          xs1[k++] = y;
          ++j;
        } else {
          xs1[k++] = x;
          ++i2;
        }
      }
      while (i2 < mid) {
        xs1[k++] = xs2[i2++];
      }
      while (j < to2) {
        xs1[k++] = xs2[j++];
      }
    }
    return function(compare4) {
      return function(fromOrdering) {
        return function(xs) {
          var out;
          if (xs.length < 2)
            return xs;
          out = xs.slice(0);
          mergeFromTo(compare4, fromOrdering, out, xs.slice(0), 0, xs.length);
          return out;
        };
      };
    };
  }();
  var slice = function(s2) {
    return function(e) {
      return function(l) {
        return l.slice(s2, e);
      };
    };
  };
  var zipWith = function(f) {
    return function(xs) {
      return function(ys) {
        var l = xs.length < ys.length ? xs.length : ys.length;
        var result = new Array(l);
        for (var i2 = 0; i2 < l; i2++) {
          result[i2] = f(xs[i2])(ys[i2]);
        }
        return result;
      };
    };
  };

  // output/Control.Monad/index.js
  var unlessM = function(dictMonad) {
    var bind6 = bind(dictMonad.Bind1());
    var unless2 = unless(dictMonad.Applicative0());
    return function(mb) {
      return function(m) {
        return bind6(mb)(function(b2) {
          return unless2(b2)(m);
        });
      };
    };
  };
  var ap = function(dictMonad) {
    var bind6 = bind(dictMonad.Bind1());
    var pure8 = pure(dictMonad.Applicative0());
    return function(f) {
      return function(a2) {
        return bind6(f)(function(f$prime) {
          return bind6(a2)(function(a$prime) {
            return pure8(f$prime(a$prime));
          });
        });
      };
    };
  };

  // output/Data.Bounded/foreign.js
  var topInt = 2147483647;
  var bottomInt = -2147483648;
  var topChar = String.fromCharCode(65535);
  var bottomChar = String.fromCharCode(0);
  var topNumber = Number.POSITIVE_INFINITY;
  var bottomNumber = Number.NEGATIVE_INFINITY;

  // output/Data.Ord/foreign.js
  var unsafeCompareImpl = function(lt) {
    return function(eq4) {
      return function(gt) {
        return function(x) {
          return function(y) {
            return x < y ? lt : x === y ? eq4 : gt;
          };
        };
      };
    };
  };
  var ordIntImpl = unsafeCompareImpl;
  var ordNumberImpl = unsafeCompareImpl;

  // output/Data.Ordering/index.js
  var LT = /* @__PURE__ */ function() {
    function LT2() {
    }
    ;
    LT2.value = new LT2();
    return LT2;
  }();
  var GT = /* @__PURE__ */ function() {
    function GT2() {
    }
    ;
    GT2.value = new GT2();
    return GT2;
  }();
  var EQ = /* @__PURE__ */ function() {
    function EQ2() {
    }
    ;
    EQ2.value = new EQ2();
    return EQ2;
  }();
  var eqOrdering = {
    eq: function(v) {
      return function(v1) {
        if (v instanceof LT && v1 instanceof LT) {
          return true;
        }
        ;
        if (v instanceof GT && v1 instanceof GT) {
          return true;
        }
        ;
        if (v instanceof EQ && v1 instanceof EQ) {
          return true;
        }
        ;
        return false;
      };
    }
  };

  // output/Data.Ring/foreign.js
  var intSub = function(x) {
    return function(y) {
      return x - y | 0;
    };
  };
  var numSub = function(n1) {
    return function(n2) {
      return n1 - n2;
    };
  };

  // output/Data.Semiring/foreign.js
  var intAdd = function(x) {
    return function(y) {
      return x + y | 0;
    };
  };
  var intMul = function(x) {
    return function(y) {
      return x * y | 0;
    };
  };
  var numAdd = function(n1) {
    return function(n2) {
      return n1 + n2;
    };
  };
  var numMul = function(n1) {
    return function(n2) {
      return n1 * n2;
    };
  };

  // output/Data.Semiring/index.js
  var zero = function(dict) {
    return dict.zero;
  };
  var semiringNumber = {
    add: numAdd,
    zero: 0,
    mul: numMul,
    one: 1
  };
  var semiringInt = {
    add: intAdd,
    zero: 0,
    mul: intMul,
    one: 1
  };
  var one = function(dict) {
    return dict.one;
  };
  var mul = function(dict) {
    return dict.mul;
  };
  var add = function(dict) {
    return dict.add;
  };
  var semiringFn = function(dictSemiring) {
    var add12 = add(dictSemiring);
    var zero1 = zero(dictSemiring);
    var mul1 = mul(dictSemiring);
    var one1 = one(dictSemiring);
    return {
      add: function(f) {
        return function(g2) {
          return function(x) {
            return add12(f(x))(g2(x));
          };
        };
      },
      zero: function(v) {
        return zero1;
      },
      mul: function(f) {
        return function(g2) {
          return function(x) {
            return mul1(f(x))(g2(x));
          };
        };
      },
      one: function(v) {
        return one1;
      }
    };
  };

  // output/Data.Ring/index.js
  var sub = function(dict) {
    return dict.sub;
  };
  var ringNumber = {
    sub: numSub,
    Semiring0: function() {
      return semiringNumber;
    }
  };
  var ringInt = {
    sub: intSub,
    Semiring0: function() {
      return semiringInt;
    }
  };
  var ringFn = function(dictRing) {
    var sub1 = sub(dictRing);
    var semiringFn2 = semiringFn(dictRing.Semiring0());
    return {
      sub: function(f) {
        return function(g2) {
          return function(x) {
            return sub1(f(x))(g2(x));
          };
        };
      },
      Semiring0: function() {
        return semiringFn2;
      }
    };
  };
  var negate = function(dictRing) {
    var sub1 = sub(dictRing);
    var zero2 = zero(dictRing.Semiring0());
    return function(a2) {
      return sub1(zero2)(a2);
    };
  };

  // output/Data.Ord/index.js
  var ordNumber = /* @__PURE__ */ function() {
    return {
      compare: ordNumberImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqNumber;
      }
    };
  }();
  var ordInt = /* @__PURE__ */ function() {
    return {
      compare: ordIntImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqInt;
      }
    };
  }();
  var compare = function(dict) {
    return dict.compare;
  };
  var max = function(dictOrd) {
    var compare32 = compare(dictOrd);
    return function(x) {
      return function(y) {
        var v = compare32(x)(y);
        if (v instanceof LT) {
          return y;
        }
        ;
        if (v instanceof EQ) {
          return x;
        }
        ;
        if (v instanceof GT) {
          return x;
        }
        ;
        throw new Error("Failed pattern match at Data.Ord (line 181, column 3 - line 184, column 12): " + [v.constructor.name]);
      };
    };
  };

  // output/Data.Bounded/index.js
  var top = function(dict) {
    return dict.top;
  };
  var boundedInt = {
    top: topInt,
    bottom: bottomInt,
    Ord0: function() {
      return ordInt;
    }
  };
  var bottom = function(dict) {
    return dict.bottom;
  };

  // output/Data.Show/foreign.js
  var showIntImpl = function(n) {
    return n.toString();
  };
  var showNumberImpl = function(n) {
    var str = n.toString();
    return isNaN(str + ".0") ? str : str + ".0";
  };

  // output/Data.Show/index.js
  var showNumber = {
    show: showNumberImpl
  };
  var showInt = {
    show: showIntImpl
  };
  var show = function(dict) {
    return dict.show;
  };

  // output/Data.Maybe/index.js
  var identity5 = /* @__PURE__ */ identity(categoryFn);
  var Nothing = /* @__PURE__ */ function() {
    function Nothing2() {
    }
    ;
    Nothing2.value = new Nothing2();
    return Nothing2;
  }();
  var Just = /* @__PURE__ */ function() {
    function Just2(value0) {
      this.value0 = value0;
    }
    ;
    Just2.create = function(value0) {
      return new Just2(value0);
    };
    return Just2;
  }();
  var maybe = function(v) {
    return function(v1) {
      return function(v2) {
        if (v2 instanceof Nothing) {
          return v;
        }
        ;
        if (v2 instanceof Just) {
          return v1(v2.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 237, column 1 - line 237, column 51): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  };
  var functorMaybe = {
    map: function(v) {
      return function(v1) {
        if (v1 instanceof Just) {
          return new Just(v(v1.value0));
        }
        ;
        return Nothing.value;
      };
    }
  };
  var map2 = /* @__PURE__ */ map(functorMaybe);
  var fromMaybe = function(a2) {
    return maybe(a2)(identity5);
  };
  var fromJust = function() {
    return function(v) {
      if (v instanceof Just) {
        return v.value0;
      }
      ;
      throw new Error("Failed pattern match at Data.Maybe (line 288, column 1 - line 288, column 46): " + [v.constructor.name]);
    };
  };
  var applyMaybe = {
    apply: function(v) {
      return function(v1) {
        if (v instanceof Just) {
          return map2(v.value0)(v1);
        }
        ;
        if (v instanceof Nothing) {
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 67, column 1 - line 69, column 30): " + [v.constructor.name, v1.constructor.name]);
      };
    },
    Functor0: function() {
      return functorMaybe;
    }
  };
  var bindMaybe = {
    bind: function(v) {
      return function(v1) {
        if (v instanceof Just) {
          return v1(v.value0);
        }
        ;
        if (v instanceof Nothing) {
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 125, column 1 - line 127, column 28): " + [v.constructor.name, v1.constructor.name]);
      };
    },
    Apply0: function() {
      return applyMaybe;
    }
  };

  // output/Data.Either/index.js
  var Left = /* @__PURE__ */ function() {
    function Left2(value0) {
      this.value0 = value0;
    }
    ;
    Left2.create = function(value0) {
      return new Left2(value0);
    };
    return Left2;
  }();
  var Right = /* @__PURE__ */ function() {
    function Right2(value0) {
      this.value0 = value0;
    }
    ;
    Right2.create = function(value0) {
      return new Right2(value0);
    };
    return Right2;
  }();
  var functorEither = {
    map: function(f) {
      return function(m) {
        if (m instanceof Left) {
          return new Left(m.value0);
        }
        ;
        if (m instanceof Right) {
          return new Right(f(m.value0));
        }
        ;
        throw new Error("Failed pattern match at Data.Either (line 0, column 0 - line 0, column 0): " + [m.constructor.name]);
      };
    }
  };
  var either = function(v) {
    return function(v1) {
      return function(v2) {
        if (v2 instanceof Left) {
          return v(v2.value0);
        }
        ;
        if (v2 instanceof Right) {
          return v1(v2.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Either (line 208, column 1 - line 208, column 64): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  };
  var hush = /* @__PURE__ */ function() {
    return either($$const(Nothing.value))(Just.create);
  }();

  // output/Data.Identity/index.js
  var Identity = function(x) {
    return x;
  };
  var functorIdentity = {
    map: function(f) {
      return function(m) {
        return f(m);
      };
    }
  };
  var applyIdentity = {
    apply: function(v) {
      return function(v1) {
        return v(v1);
      };
    },
    Functor0: function() {
      return functorIdentity;
    }
  };
  var bindIdentity = {
    bind: function(v) {
      return function(f) {
        return f(v);
      };
    },
    Apply0: function() {
      return applyIdentity;
    }
  };
  var applicativeIdentity = {
    pure: Identity,
    Apply0: function() {
      return applyIdentity;
    }
  };
  var monadIdentity = {
    Applicative0: function() {
      return applicativeIdentity;
    },
    Bind1: function() {
      return bindIdentity;
    }
  };

  // output/Data.EuclideanRing/foreign.js
  var intDegree = function(x) {
    return Math.min(Math.abs(x), 2147483647);
  };
  var intDiv = function(x) {
    return function(y) {
      if (y === 0)
        return 0;
      return y > 0 ? Math.floor(x / y) : -Math.floor(x / -y);
    };
  };
  var intMod = function(x) {
    return function(y) {
      if (y === 0)
        return 0;
      var yy = Math.abs(y);
      return (x % yy + yy) % yy;
    };
  };

  // output/Data.CommutativeRing/index.js
  var commutativeRingInt = {
    Ring0: function() {
      return ringInt;
    }
  };

  // output/Data.EuclideanRing/index.js
  var mod = function(dict) {
    return dict.mod;
  };
  var euclideanRingInt = {
    degree: intDegree,
    div: intDiv,
    mod: intMod,
    CommutativeRing0: function() {
      return commutativeRingInt;
    }
  };

  // output/Data.Monoid/index.js
  var monoidUnit = {
    mempty: unit,
    Semigroup0: function() {
      return semigroupUnit;
    }
  };
  var monoidString = {
    mempty: "",
    Semigroup0: function() {
      return semigroupString;
    }
  };
  var monoidArray = {
    mempty: [],
    Semigroup0: function() {
      return semigroupArray;
    }
  };
  var mempty = function(dict) {
    return dict.mempty;
  };

  // output/Effect/foreign.js
  var pureE = function(a2) {
    return function() {
      return a2;
    };
  };
  var bindE = function(a2) {
    return function(f) {
      return function() {
        return f(a2())();
      };
    };
  };

  // output/Effect/index.js
  var $runtime_lazy = function(name15, moduleName, init4) {
    var state4 = 0;
    var val;
    return function(lineNumber) {
      if (state4 === 2)
        return val;
      if (state4 === 1)
        throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state4 = 1;
      val = init4();
      state4 = 2;
      return val;
    };
  };
  var monadEffect = {
    Applicative0: function() {
      return applicativeEffect;
    },
    Bind1: function() {
      return bindEffect;
    }
  };
  var bindEffect = {
    bind: bindE,
    Apply0: function() {
      return $lazy_applyEffect(0);
    }
  };
  var applicativeEffect = {
    pure: pureE,
    Apply0: function() {
      return $lazy_applyEffect(0);
    }
  };
  var $lazy_functorEffect = /* @__PURE__ */ $runtime_lazy("functorEffect", "Effect", function() {
    return {
      map: liftA1(applicativeEffect)
    };
  });
  var $lazy_applyEffect = /* @__PURE__ */ $runtime_lazy("applyEffect", "Effect", function() {
    return {
      apply: ap(monadEffect),
      Functor0: function() {
        return $lazy_functorEffect(0);
      }
    };
  });
  var functorEffect = /* @__PURE__ */ $lazy_functorEffect(20);
  var applyEffect = /* @__PURE__ */ $lazy_applyEffect(23);
  var lift22 = /* @__PURE__ */ lift2(applyEffect);
  var semigroupEffect = function(dictSemigroup) {
    return {
      append: lift22(append(dictSemigroup))
    };
  };
  var monoidEffect = function(dictMonoid) {
    var semigroupEffect1 = semigroupEffect(dictMonoid.Semigroup0());
    return {
      mempty: pureE(mempty(dictMonoid)),
      Semigroup0: function() {
        return semigroupEffect1;
      }
    };
  };

  // output/Effect.Ref/foreign.js
  var _new = function(val) {
    return function() {
      return { value: val };
    };
  };
  var read = function(ref) {
    return function() {
      return ref.value;
    };
  };
  var modifyImpl = function(f) {
    return function(ref) {
      return function() {
        var t = f(ref.value);
        ref.value = t.state;
        return t.value;
      };
    };
  };
  var write = function(val) {
    return function(ref) {
      return function() {
        ref.value = val;
      };
    };
  };

  // output/Effect.Ref/index.js
  var $$void2 = /* @__PURE__ */ $$void(functorEffect);
  var $$new = _new;
  var modify$prime = modifyImpl;
  var modify = function(f) {
    return modify$prime(function(s2) {
      var s$prime = f(s2);
      return {
        state: s$prime,
        value: s$prime
      };
    });
  };
  var modify_ = function(f) {
    return function(s2) {
      return $$void2(modify(f)(s2));
    };
  };

  // output/Control.Monad.ST.Internal/foreign.js
  var map_ = function(f) {
    return function(a2) {
      return function() {
        return f(a2());
      };
    };
  };
  var pure_ = function(a2) {
    return function() {
      return a2;
    };
  };
  var bind_ = function(a2) {
    return function(f) {
      return function() {
        return f(a2())();
      };
    };
  };
  function newSTRef(val) {
    return function() {
      return { value: val };
    };
  }
  var read2 = function(ref) {
    return function() {
      return ref.value;
    };
  };
  var modifyImpl2 = function(f) {
    return function(ref) {
      return function() {
        var t = f(ref.value);
        ref.value = t.state;
        return t.value;
      };
    };
  };
  var write2 = function(a2) {
    return function(ref) {
      return function() {
        return ref.value = a2;
      };
    };
  };

  // output/Control.Monad.ST.Internal/index.js
  var $runtime_lazy2 = function(name15, moduleName, init4) {
    var state4 = 0;
    var val;
    return function(lineNumber) {
      if (state4 === 2)
        return val;
      if (state4 === 1)
        throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state4 = 1;
      val = init4();
      state4 = 2;
      return val;
    };
  };
  var modify$prime2 = modifyImpl2;
  var modify2 = function(f) {
    return modify$prime2(function(s2) {
      var s$prime = f(s2);
      return {
        state: s$prime,
        value: s$prime
      };
    });
  };
  var functorST = {
    map: map_
  };
  var monadST = {
    Applicative0: function() {
      return applicativeST;
    },
    Bind1: function() {
      return bindST;
    }
  };
  var bindST = {
    bind: bind_,
    Apply0: function() {
      return $lazy_applyST(0);
    }
  };
  var applicativeST = {
    pure: pure_,
    Apply0: function() {
      return $lazy_applyST(0);
    }
  };
  var $lazy_applyST = /* @__PURE__ */ $runtime_lazy2("applyST", "Control.Monad.ST.Internal", function() {
    return {
      apply: ap(monadST),
      Functor0: function() {
        return functorST;
      }
    };
  });
  var applyST = /* @__PURE__ */ $lazy_applyST(47);

  // output/Data.Array.ST/foreign.js
  function newSTArray() {
    return [];
  }
  var pushAll = function(as) {
    return function(xs) {
      return function() {
        return xs.push.apply(xs, as);
      };
    };
  };
  var splice = function(i2) {
    return function(howMany) {
      return function(bs) {
        return function(xs) {
          return function() {
            return xs.splice.apply(xs, [i2, howMany].concat(bs));
          };
        };
      };
    };
  };
  function copyImpl(xs) {
    return function() {
      return xs.slice();
    };
  }
  var freeze = copyImpl;
  var sortByImpl2 = function() {
    function mergeFromTo(compare4, fromOrdering, xs1, xs2, from4, to2) {
      var mid;
      var i2;
      var j;
      var k;
      var x;
      var y;
      var c;
      mid = from4 + (to2 - from4 >> 1);
      if (mid - from4 > 1)
        mergeFromTo(compare4, fromOrdering, xs2, xs1, from4, mid);
      if (to2 - mid > 1)
        mergeFromTo(compare4, fromOrdering, xs2, xs1, mid, to2);
      i2 = from4;
      j = mid;
      k = from4;
      while (i2 < mid && j < to2) {
        x = xs2[i2];
        y = xs2[j];
        c = fromOrdering(compare4(x)(y));
        if (c > 0) {
          xs1[k++] = y;
          ++j;
        } else {
          xs1[k++] = x;
          ++i2;
        }
      }
      while (i2 < mid) {
        xs1[k++] = xs2[i2++];
      }
      while (j < to2) {
        xs1[k++] = xs2[j++];
      }
    }
    return function(compare4) {
      return function(fromOrdering) {
        return function(xs) {
          return function() {
            if (xs.length < 2)
              return xs;
            mergeFromTo(compare4, fromOrdering, xs, xs.slice(0), 0, xs.length);
            return xs;
          };
        };
      };
    };
  }();

  // output/Data.Array.ST/index.js
  var push = function(a2) {
    return pushAll([a2]);
  };

  // output/Data.Foldable/foreign.js
  var foldrArray = function(f) {
    return function(init4) {
      return function(xs) {
        var acc = init4;
        var len = xs.length;
        for (var i2 = len - 1; i2 >= 0; i2--) {
          acc = f(xs[i2])(acc);
        }
        return acc;
      };
    };
  };
  var foldlArray = function(f) {
    return function(init4) {
      return function(xs) {
        var acc = init4;
        var len = xs.length;
        for (var i2 = 0; i2 < len; i2++) {
          acc = f(acc)(xs[i2]);
        }
        return acc;
      };
    };
  };

  // output/Control.Plus/index.js
  var empty = function(dict) {
    return dict.empty;
  };

  // output/Data.Tuple/index.js
  var Tuple = /* @__PURE__ */ function() {
    function Tuple2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Tuple2.create = function(value0) {
      return function(value1) {
        return new Tuple2(value0, value1);
      };
    };
    return Tuple2;
  }();
  var uncurry = function(f) {
    return function(v) {
      return f(v.value0)(v.value1);
    };
  };
  var snd = function(v) {
    return v.value1;
  };
  var semiringTuple = function(dictSemiring) {
    var add5 = add(dictSemiring);
    var one2 = one(dictSemiring);
    var mul3 = mul(dictSemiring);
    var zero2 = zero(dictSemiring);
    return function(dictSemiring1) {
      var add12 = add(dictSemiring1);
      var mul1 = mul(dictSemiring1);
      return {
        add: function(v) {
          return function(v1) {
            return new Tuple(add5(v.value0)(v1.value0), add12(v.value1)(v1.value1));
          };
        },
        one: new Tuple(one2, one(dictSemiring1)),
        mul: function(v) {
          return function(v1) {
            return new Tuple(mul3(v.value0)(v1.value0), mul1(v.value1)(v1.value1));
          };
        },
        zero: new Tuple(zero2, zero(dictSemiring1))
      };
    };
  };
  var functorTuple = {
    map: function(f) {
      return function(m) {
        return new Tuple(m.value0, f(m.value1));
      };
    }
  };
  var fst = function(v) {
    return v.value0;
  };
  var eqTuple = function(dictEq) {
    var eq4 = eq(dictEq);
    return function(dictEq1) {
      var eq14 = eq(dictEq1);
      return {
        eq: function(x) {
          return function(y) {
            return eq4(x.value0)(y.value0) && eq14(x.value1)(y.value1);
          };
        }
      };
    };
  };

  // output/Data.Bifunctor/index.js
  var identity6 = /* @__PURE__ */ identity(categoryFn);
  var bimap = function(dict) {
    return dict.bimap;
  };
  var lmap = function(dictBifunctor) {
    var bimap1 = bimap(dictBifunctor);
    return function(f) {
      return bimap1(f)(identity6);
    };
  };
  var rmap = function(dictBifunctor) {
    return bimap(dictBifunctor)(identity6);
  };
  var bifunctorTuple = {
    bimap: function(f) {
      return function(g2) {
        return function(v) {
          return new Tuple(f(v.value0), g2(v.value1));
        };
      };
    }
  };

  // output/Safe.Coerce/index.js
  var coerce = function() {
    return unsafeCoerce2;
  };

  // output/Data.Newtype/index.js
  var coerce2 = /* @__PURE__ */ coerce();
  var wrap = function() {
    return coerce2;
  };
  var unwrap = function() {
    return coerce2;
  };

  // output/Data.Foldable/index.js
  var eq12 = /* @__PURE__ */ eq(eqOrdering);
  var foldr = function(dict) {
    return dict.foldr;
  };
  var oneOf = function(dictFoldable) {
    var foldr22 = foldr(dictFoldable);
    return function(dictPlus) {
      return foldr22(alt(dictPlus.Alt0()))(empty(dictPlus));
    };
  };
  var oneOfMap = function(dictFoldable) {
    var foldr22 = foldr(dictFoldable);
    return function(dictPlus) {
      var alt10 = alt(dictPlus.Alt0());
      var empty8 = empty(dictPlus);
      return function(f) {
        return foldr22(function($453) {
          return alt10(f($453));
        })(empty8);
      };
    };
  };
  var traverse_ = function(dictApplicative) {
    var applySecond5 = applySecond(dictApplicative.Apply0());
    var pure8 = pure(dictApplicative);
    return function(dictFoldable) {
      var foldr22 = foldr(dictFoldable);
      return function(f) {
        return foldr22(function($454) {
          return applySecond5(f($454));
        })(pure8(unit));
      };
    };
  };
  var for_ = function(dictApplicative) {
    var traverse_1 = traverse_(dictApplicative);
    return function(dictFoldable) {
      return flip(traverse_1(dictFoldable));
    };
  };
  var foldl = function(dict) {
    return dict.foldl;
  };
  var maximumBy = function(dictFoldable) {
    var foldl22 = foldl(dictFoldable);
    return function(cmp) {
      var max$prime = function(v) {
        return function(v1) {
          if (v instanceof Nothing) {
            return new Just(v1);
          }
          ;
          if (v instanceof Just) {
            return new Just(function() {
              var $303 = eq12(cmp(v.value0)(v1))(GT.value);
              if ($303) {
                return v.value0;
              }
              ;
              return v1;
            }());
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 441, column 3 - line 441, column 27): " + [v.constructor.name, v1.constructor.name]);
        };
      };
      return foldl22(max$prime)(Nothing.value);
    };
  };
  var sum = function(dictFoldable) {
    var foldl22 = foldl(dictFoldable);
    return function(dictSemiring) {
      return foldl22(add(dictSemiring))(zero(dictSemiring));
    };
  };
  var foldableMaybe = {
    foldr: function(v) {
      return function(v1) {
        return function(v2) {
          if (v2 instanceof Nothing) {
            return v1;
          }
          ;
          if (v2 instanceof Just) {
            return v(v2.value0)(v1);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
        };
      };
    },
    foldl: function(v) {
      return function(v1) {
        return function(v2) {
          if (v2 instanceof Nothing) {
            return v1;
          }
          ;
          if (v2 instanceof Just) {
            return v(v1)(v2.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
        };
      };
    },
    foldMap: function(dictMonoid) {
      var mempty6 = mempty(dictMonoid);
      return function(v) {
        return function(v1) {
          if (v1 instanceof Nothing) {
            return mempty6;
          }
          ;
          if (v1 instanceof Just) {
            return v(v1.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, v1.constructor.name]);
        };
      };
    }
  };
  var foldMapDefaultR = function(dictFoldable) {
    var foldr22 = foldr(dictFoldable);
    return function(dictMonoid) {
      var append6 = append(dictMonoid.Semigroup0());
      var mempty6 = mempty(dictMonoid);
      return function(f) {
        return foldr22(function(x) {
          return function(acc) {
            return append6(f(x))(acc);
          };
        })(mempty6);
      };
    };
  };
  var foldableArray = {
    foldr: foldrArray,
    foldl: foldlArray,
    foldMap: function(dictMonoid) {
      return foldMapDefaultR(foldableArray)(dictMonoid);
    }
  };
  var foldMap = function(dict) {
    return dict.foldMap;
  };

  // output/Data.Traversable/foreign.js
  var traverseArrayImpl = function() {
    function array1(a2) {
      return [a2];
    }
    function array2(a2) {
      return function(b2) {
        return [a2, b2];
      };
    }
    function array3(a2) {
      return function(b2) {
        return function(c) {
          return [a2, b2, c];
        };
      };
    }
    function concat2(xs) {
      return function(ys) {
        return xs.concat(ys);
      };
    }
    return function(apply5) {
      return function(map17) {
        return function(pure8) {
          return function(f) {
            return function(array) {
              function go2(bot, top3) {
                switch (top3 - bot) {
                  case 0:
                    return pure8([]);
                  case 1:
                    return map17(array1)(f(array[bot]));
                  case 2:
                    return apply5(map17(array2)(f(array[bot])))(f(array[bot + 1]));
                  case 3:
                    return apply5(apply5(map17(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));
                  default:
                    var pivot = bot + Math.floor((top3 - bot) / 4) * 2;
                    return apply5(map17(concat2)(go2(bot, pivot)))(go2(pivot, top3));
                }
              }
              return go2(0, array.length);
            };
          };
        };
      };
    };
  }();

  // output/Data.Semigroup.Foldable/index.js
  var JoinWith = function(x) {
    return x;
  };
  var semigroupJoinWith = function(dictSemigroup) {
    var append6 = append(dictSemigroup);
    return {
      append: function(v) {
        return function(v1) {
          return function(j) {
            return append6(v(j))(append6(j)(v1(j)));
          };
        };
      }
    };
  };
  var joinee = function(v) {
    return v;
  };
  var foldl1 = function(dict) {
    return dict.foldl1;
  };
  var foldMap1DefaultL = function(dictFoldable1) {
    var foldl11 = foldl1(dictFoldable1);
    return function(dictFunctor) {
      var map17 = map(dictFunctor);
      return function(dictSemigroup) {
        var append6 = append(dictSemigroup);
        return function(f) {
          var $162 = foldl11(append6);
          var $163 = map17(f);
          return function($164) {
            return $162($163($164));
          };
        };
      };
    };
  };
  var foldMap1 = function(dict) {
    return dict.foldMap1;
  };
  var intercalateMap = function(dictFoldable1) {
    var foldMap11 = foldMap1(dictFoldable1);
    return function(dictSemigroup) {
      var foldMap12 = foldMap11(semigroupJoinWith(dictSemigroup));
      return function(j) {
        return function(f) {
          return function(foldable) {
            return joinee(foldMap12(function($171) {
              return JoinWith($$const(f($171)));
            })(foldable))(j);
          };
        };
      };
    };
  };

  // output/Data.Array/index.js
  var fromJust2 = /* @__PURE__ */ fromJust();
  var append2 = /* @__PURE__ */ append(semigroupArray);
  var take = function(n) {
    return function(xs) {
      var $148 = n < 1;
      if ($148) {
        return [];
      }
      ;
      return slice(0)(n)(xs);
    };
  };
  var mapWithIndex = function(f) {
    return function(xs) {
      return zipWith(f)(range(0)(length(xs) - 1 | 0))(xs);
    };
  };
  var index = /* @__PURE__ */ function() {
    return indexImpl(Just.create)(Nothing.value);
  }();
  var last = function(xs) {
    return index(xs)(length(xs) - 1 | 0);
  };
  var findIndex = /* @__PURE__ */ function() {
    return findIndexImpl(Just.create)(Nothing.value);
  }();
  var deleteAt = /* @__PURE__ */ function() {
    return _deleteAt(Just.create)(Nothing.value);
  }();
  var deleteBy = function(v) {
    return function(v1) {
      return function(v2) {
        if (v2.length === 0) {
          return [];
        }
        ;
        return maybe(v2)(function(i2) {
          return fromJust2(deleteAt(i2)(v2));
        })(findIndex(v(v1))(v2));
      };
    };
  };
  var cons = function(x) {
    return function(xs) {
      return append2([x])(xs);
    };
  };

  // output/Data.Array.NonEmpty.Internal/foreign.js
  var foldr1Impl = function(f) {
    return function(xs) {
      var acc = xs[xs.length - 1];
      for (var i2 = xs.length - 2; i2 >= 0; i2--) {
        acc = f(xs[i2])(acc);
      }
      return acc;
    };
  };
  var foldl1Impl = function(f) {
    return function(xs) {
      var acc = xs[0];
      var len = xs.length;
      for (var i2 = 1; i2 < len; i2++) {
        acc = f(acc)(xs[i2]);
      }
      return acc;
    };
  };
  var traverse1Impl = function() {
    function Cont(fn) {
      this.fn = fn;
    }
    var emptyList = {};
    var ConsCell = function(head6, tail3) {
      this.head = head6;
      this.tail = tail3;
    };
    function finalCell(head6) {
      return new ConsCell(head6, emptyList);
    }
    function consList(x) {
      return function(xs) {
        return new ConsCell(x, xs);
      };
    }
    function listToArray(list) {
      var arr = [];
      var xs = list;
      while (xs !== emptyList) {
        arr.push(xs.head);
        xs = xs.tail;
      }
      return arr;
    }
    return function(apply5) {
      return function(map17) {
        return function(f) {
          var buildFrom = function(x, ys) {
            return apply5(map17(consList)(f(x)))(ys);
          };
          var go2 = function(acc, currentLen, xs) {
            if (currentLen === 0) {
              return acc;
            } else {
              var last4 = xs[currentLen - 1];
              return new Cont(function() {
                var built = go2(buildFrom(last4, acc), currentLen - 1, xs);
                return built;
              });
            }
          };
          return function(array) {
            var acc = map17(finalCell)(f(array[array.length - 1]));
            var result = go2(acc, array.length - 1, array);
            while (result instanceof Cont) {
              result = result.fn();
            }
            return map17(listToArray)(result);
          };
        };
      };
    };
  }();

  // output/Data.FunctorWithIndex/foreign.js
  var mapWithIndexArray = function(f) {
    return function(xs) {
      var l = xs.length;
      var result = Array(l);
      for (var i2 = 0; i2 < l; i2++) {
        result[i2] = f(i2)(xs[i2]);
      }
      return result;
    };
  };

  // output/Data.FunctorWithIndex/index.js
  var mapWithIndex2 = function(dict) {
    return dict.mapWithIndex;
  };
  var functorWithIndexArray = {
    mapWithIndex: mapWithIndexArray,
    Functor0: function() {
      return functorArray;
    }
  };

  // output/Data.FoldableWithIndex/index.js
  var foldr8 = /* @__PURE__ */ foldr(foldableArray);
  var mapWithIndex3 = /* @__PURE__ */ mapWithIndex2(functorWithIndexArray);
  var foldl8 = /* @__PURE__ */ foldl(foldableArray);
  var foldrWithIndex = function(dict) {
    return dict.foldrWithIndex;
  };
  var foldlWithIndex = function(dict) {
    return dict.foldlWithIndex;
  };
  var foldMapWithIndexDefaultR = function(dictFoldableWithIndex) {
    var foldrWithIndex1 = foldrWithIndex(dictFoldableWithIndex);
    return function(dictMonoid) {
      var append6 = append(dictMonoid.Semigroup0());
      var mempty6 = mempty(dictMonoid);
      return function(f) {
        return foldrWithIndex1(function(i2) {
          return function(x) {
            return function(acc) {
              return append6(f(i2)(x))(acc);
            };
          };
        })(mempty6);
      };
    };
  };
  var foldableWithIndexArray = {
    foldrWithIndex: function(f) {
      return function(z) {
        var $291 = foldr8(function(v) {
          return function(y) {
            return f(v.value0)(v.value1)(y);
          };
        })(z);
        var $292 = mapWithIndex3(Tuple.create);
        return function($293) {
          return $291($292($293));
        };
      };
    },
    foldlWithIndex: function(f) {
      return function(z) {
        var $294 = foldl8(function(y) {
          return function(v) {
            return f(v.value0)(y)(v.value1);
          };
        })(z);
        var $295 = mapWithIndex3(Tuple.create);
        return function($296) {
          return $294($295($296));
        };
      };
    },
    foldMapWithIndex: function(dictMonoid) {
      return foldMapWithIndexDefaultR(foldableWithIndexArray)(dictMonoid);
    },
    Foldable0: function() {
      return foldableArray;
    }
  };
  var foldMapWithIndex = function(dict) {
    return dict.foldMapWithIndex;
  };

  // output/Data.Array.NonEmpty.Internal/index.js
  var NonEmptyArray = function(x) {
    return x;
  };
  var functorNonEmptyArray = functorArray;
  var foldableNonEmptyArray = foldableArray;
  var foldable1NonEmptyArray = {
    foldMap1: function(dictSemigroup) {
      return foldMap1DefaultL(foldable1NonEmptyArray)(functorNonEmptyArray)(dictSemigroup);
    },
    foldr1: foldr1Impl,
    foldl1: foldl1Impl,
    Foldable0: function() {
      return foldableNonEmptyArray;
    }
  };

  // output/Data.NonEmpty/index.js
  var NonEmpty = /* @__PURE__ */ function() {
    function NonEmpty2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    NonEmpty2.create = function(value0) {
      return function(value1) {
        return new NonEmpty2(value0, value1);
      };
    };
    return NonEmpty2;
  }();
  var singleton2 = function(dictPlus) {
    var empty8 = empty(dictPlus);
    return function(a2) {
      return new NonEmpty(a2, empty8);
    };
  };

  // output/Data.Array.NonEmpty/index.js
  var unsafeFromArray = NonEmptyArray;
  var fromArray = function(xs) {
    if (length(xs) > 0) {
      return new Just(unsafeFromArray(xs));
    }
    ;
    if (otherwise) {
      return Nothing.value;
    }
    ;
    throw new Error("Failed pattern match at Data.Array.NonEmpty (line 160, column 1 - line 160, column 58): " + [xs.constructor.name]);
  };

  // output/Data.ArrayBuffer.Typed/foreign.js
  function newArray(f) {
    return function newArray_(a2, mb, mc) {
      if (mb === null)
        return new f(a2);
      var l = a2.byteLength;
      var eb = f.BYTES_PER_ELEMENT;
      var off = Math.min(l, mb >>> 0);
      if (mc === null)
        return new f(a2, off);
      var len = Math.min((l - off) / eb, mc);
      return new f(a2, off, len);
    };
  }
  var newUint8ClampedArray = newArray(Uint8ClampedArray);
  var newUint32Array = newArray(Uint32Array);
  var newUint16Array = newArray(Uint16Array);
  var newUint8Array = newArray(Uint8Array);
  var newInt32Array = newArray(Int32Array);
  var newInt16Array = newArray(Int16Array);
  var newInt8Array = newArray(Int8Array);
  var newFloat32Array = newArray(Float32Array);
  var newFloat64Array = newArray(Float64Array);
  function toArrayImpl(a2) {
    var l = a2.length;
    var ret = new Array(l);
    for (var i2 = 0; i2 < l; i2++)
      ret[i2] = a2[i2];
    return ret;
  }

  // output/Data.Nullable/foreign.js
  function nullable(a2, r, f) {
    return a2 == null ? r : f(a2);
  }

  // output/Data.Nullable/index.js
  var toMaybe = function(n) {
    return nullable(n, Nothing.value, Just.create);
  };

  // output/Effect.Uncurried/foreign.js
  var mkEffectFn1 = function mkEffectFn12(fn) {
    return function(x) {
      return fn(x)();
    };
  };
  var runEffectFn1 = function runEffectFn12(fn) {
    return function(a2) {
      return function() {
        return fn(a2);
      };
    };
  };

  // output/Effect.Uncurried/index.js
  var semigroupEffectFn1 = function(dictSemigroup) {
    var append6 = append(semigroupEffect(dictSemigroup));
    return {
      append: function(f1) {
        return function(f2) {
          return mkEffectFn1(function(a2) {
            return append6(runEffectFn1(f1)(a2))(runEffectFn1(f2)(a2));
          });
        };
      }
    };
  };
  var monoidEffectFn1 = function(dictMonoid) {
    var mempty6 = mempty(monoidEffect(dictMonoid));
    var semigroupEffectFn11 = semigroupEffectFn1(dictMonoid.Semigroup0());
    return {
      mempty: mkEffectFn1(function(v) {
        return mempty6;
      }),
      Semigroup0: function() {
        return semigroupEffectFn11;
      }
    };
  };

  // output/Effect.Unsafe/foreign.js
  var unsafePerformEffect = function(f) {
    return f();
  };

  // output/Data.ArrayBuffer.Typed/index.js
  var typedArrayUint8 = {
    create: newUint8Array,
    BinaryValue0: function() {
      return void 0;
    }
  };
  var toArray = function(dictTypedArray) {
    return function(a2) {
      return function() {
        return toArrayImpl(a2);
      };
    };
  };

  // output/Data.Int/foreign.js
  var fromNumberImpl = function(just) {
    return function(nothing) {
      return function(n) {
        return (n | 0) === n ? just(n) : nothing;
      };
    };
  };
  var toNumber = function(n) {
    return n;
  };
  var pow = function(x) {
    return function(y) {
      return Math.pow(x, y) | 0;
    };
  };

  // output/Data.Number/foreign.js
  var isFiniteImpl = isFinite;
  var cos = Math.cos;
  var floor = Math.floor;
  var log = Math.log;
  var pow2 = function(n) {
    return function(p2) {
      return Math.pow(n, p2);
    };
  };
  var remainder = function(n) {
    return function(m) {
      return n % m;
    };
  };
  var round = Math.round;
  var sin = Math.sin;
  var sqrt = Math.sqrt;

  // output/Data.Number/index.js
  var pi = 3.141592653589793;

  // output/Data.Int/index.js
  var top2 = /* @__PURE__ */ top(boundedInt);
  var bottom2 = /* @__PURE__ */ bottom(boundedInt);
  var fromNumber = /* @__PURE__ */ function() {
    return fromNumberImpl(Just.create)(Nothing.value);
  }();
  var unsafeClamp = function(x) {
    if (!isFiniteImpl(x)) {
      return 0;
    }
    ;
    if (x >= toNumber(top2)) {
      return top2;
    }
    ;
    if (x <= toNumber(bottom2)) {
      return bottom2;
    }
    ;
    if (otherwise) {
      return fromMaybe(0)(fromNumber(x));
    }
    ;
    throw new Error("Failed pattern match at Data.Int (line 72, column 1 - line 72, column 29): " + [x.constructor.name]);
  };
  var round2 = function($37) {
    return unsafeClamp(round($37));
  };
  var floor2 = function($39) {
    return unsafeClamp(floor($39));
  };

  // output/Data.DateTime.Instant/index.js
  var unInstant = function(v) {
    return v;
  };

  // output/Data.List.Types/index.js
  var Nil = /* @__PURE__ */ function() {
    function Nil3() {
    }
    ;
    Nil3.value = new Nil3();
    return Nil3;
  }();
  var Cons = /* @__PURE__ */ function() {
    function Cons3(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Cons3.create = function(value0) {
      return function(value1) {
        return new Cons3(value0, value1);
      };
    };
    return Cons3;
  }();
  var NonEmptyList = function(x) {
    return x;
  };
  var toList = function(v) {
    return new Cons(v.value0, v.value1);
  };
  var listMap = function(f) {
    var chunkedRevMap = function($copy_v) {
      return function($copy_v1) {
        var $tco_var_v = $copy_v;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(v, v1) {
          if (v1 instanceof Cons && (v1.value1 instanceof Cons && v1.value1.value1 instanceof Cons)) {
            $tco_var_v = new Cons(v1, v);
            $copy_v1 = v1.value1.value1.value1;
            return;
          }
          ;
          var unrolledMap = function(v2) {
            if (v2 instanceof Cons && (v2.value1 instanceof Cons && v2.value1.value1 instanceof Nil)) {
              return new Cons(f(v2.value0), new Cons(f(v2.value1.value0), Nil.value));
            }
            ;
            if (v2 instanceof Cons && v2.value1 instanceof Nil) {
              return new Cons(f(v2.value0), Nil.value);
            }
            ;
            return Nil.value;
          };
          var reverseUnrolledMap = function($copy_v2) {
            return function($copy_v3) {
              var $tco_var_v2 = $copy_v2;
              var $tco_done1 = false;
              var $tco_result2;
              function $tco_loop2(v2, v3) {
                if (v2 instanceof Cons && (v2.value0 instanceof Cons && (v2.value0.value1 instanceof Cons && v2.value0.value1.value1 instanceof Cons))) {
                  $tco_var_v2 = v2.value1;
                  $copy_v3 = new Cons(f(v2.value0.value0), new Cons(f(v2.value0.value1.value0), new Cons(f(v2.value0.value1.value1.value0), v3)));
                  return;
                }
                ;
                $tco_done1 = true;
                return v3;
              }
              ;
              while (!$tco_done1) {
                $tco_result2 = $tco_loop2($tco_var_v2, $copy_v3);
              }
              ;
              return $tco_result2;
            };
          };
          $tco_done = true;
          return reverseUnrolledMap(v)(unrolledMap(v1));
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_v, $copy_v1);
        }
        ;
        return $tco_result;
      };
    };
    return chunkedRevMap(Nil.value);
  };
  var functorList = {
    map: listMap
  };
  var foldableList = {
    foldr: function(f) {
      return function(b2) {
        var rev3 = function() {
          var go2 = function($copy_v) {
            return function($copy_v1) {
              var $tco_var_v = $copy_v;
              var $tco_done = false;
              var $tco_result;
              function $tco_loop(v, v1) {
                if (v1 instanceof Nil) {
                  $tco_done = true;
                  return v;
                }
                ;
                if (v1 instanceof Cons) {
                  $tco_var_v = new Cons(v1.value0, v);
                  $copy_v1 = v1.value1;
                  return;
                }
                ;
                throw new Error("Failed pattern match at Data.List.Types (line 107, column 7 - line 107, column 23): " + [v.constructor.name, v1.constructor.name]);
              }
              ;
              while (!$tco_done) {
                $tco_result = $tco_loop($tco_var_v, $copy_v1);
              }
              ;
              return $tco_result;
            };
          };
          return go2(Nil.value);
        }();
        var $284 = foldl(foldableList)(flip(f))(b2);
        return function($285) {
          return $284(rev3($285));
        };
      };
    },
    foldl: function(f) {
      var go2 = function($copy_b) {
        return function($copy_v) {
          var $tco_var_b = $copy_b;
          var $tco_done1 = false;
          var $tco_result;
          function $tco_loop(b2, v) {
            if (v instanceof Nil) {
              $tco_done1 = true;
              return b2;
            }
            ;
            if (v instanceof Cons) {
              $tco_var_b = f(b2)(v.value0);
              $copy_v = v.value1;
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.List.Types (line 111, column 12 - line 113, column 30): " + [v.constructor.name]);
          }
          ;
          while (!$tco_done1) {
            $tco_result = $tco_loop($tco_var_b, $copy_v);
          }
          ;
          return $tco_result;
        };
      };
      return go2;
    },
    foldMap: function(dictMonoid) {
      var append22 = append(dictMonoid.Semigroup0());
      var mempty6 = mempty(dictMonoid);
      return function(f) {
        return foldl(foldableList)(function(acc) {
          var $286 = append22(acc);
          return function($287) {
            return $286(f($287));
          };
        })(mempty6);
      };
    }
  };
  var foldr2 = /* @__PURE__ */ foldr(foldableList);
  var semigroupList = {
    append: function(xs) {
      return function(ys) {
        return foldr2(Cons.create)(ys)(xs);
      };
    }
  };
  var append1 = /* @__PURE__ */ append(semigroupList);
  var semigroupNonEmptyList = {
    append: function(v) {
      return function(as$prime) {
        return new NonEmpty(v.value0, append1(v.value1)(toList(as$prime)));
      };
    }
  };
  var altList = {
    alt: append1,
    Functor0: function() {
      return functorList;
    }
  };
  var plusList = /* @__PURE__ */ function() {
    return {
      empty: Nil.value,
      Alt0: function() {
        return altList;
      }
    };
  }();

  // output/Partial.Unsafe/foreign.js
  var _unsafePartial = function(f) {
    return f();
  };

  // output/Partial/foreign.js
  var _crashWith = function(msg) {
    throw new Error(msg);
  };

  // output/Partial/index.js
  var crashWith = function() {
    return _crashWith;
  };

  // output/Partial.Unsafe/index.js
  var crashWith2 = /* @__PURE__ */ crashWith();
  var unsafePartial = _unsafePartial;
  var unsafeCrashWith = function(msg) {
    return unsafePartial(function() {
      return crashWith2(msg);
    });
  };

  // output/Data.Map.Internal/index.js
  var Leaf = /* @__PURE__ */ function() {
    function Leaf2() {
    }
    ;
    Leaf2.value = new Leaf2();
    return Leaf2;
  }();
  var Two = /* @__PURE__ */ function() {
    function Two2(value0, value1, value22, value32) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
    }
    ;
    Two2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return new Two2(value0, value1, value22, value32);
          };
        };
      };
    };
    return Two2;
  }();
  var Three = /* @__PURE__ */ function() {
    function Three2(value0, value1, value22, value32, value42, value52, value62) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
      this.value4 = value42;
      this.value5 = value52;
      this.value6 = value62;
    }
    ;
    Three2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return function(value42) {
              return function(value52) {
                return function(value62) {
                  return new Three2(value0, value1, value22, value32, value42, value52, value62);
                };
              };
            };
          };
        };
      };
    };
    return Three2;
  }();
  var TwoLeft = /* @__PURE__ */ function() {
    function TwoLeft2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    TwoLeft2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new TwoLeft2(value0, value1, value22);
        };
      };
    };
    return TwoLeft2;
  }();
  var TwoRight = /* @__PURE__ */ function() {
    function TwoRight2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    TwoRight2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new TwoRight2(value0, value1, value22);
        };
      };
    };
    return TwoRight2;
  }();
  var ThreeLeft = /* @__PURE__ */ function() {
    function ThreeLeft2(value0, value1, value22, value32, value42, value52) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
      this.value4 = value42;
      this.value5 = value52;
    }
    ;
    ThreeLeft2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return function(value42) {
              return function(value52) {
                return new ThreeLeft2(value0, value1, value22, value32, value42, value52);
              };
            };
          };
        };
      };
    };
    return ThreeLeft2;
  }();
  var ThreeMiddle = /* @__PURE__ */ function() {
    function ThreeMiddle2(value0, value1, value22, value32, value42, value52) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
      this.value4 = value42;
      this.value5 = value52;
    }
    ;
    ThreeMiddle2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return function(value42) {
              return function(value52) {
                return new ThreeMiddle2(value0, value1, value22, value32, value42, value52);
              };
            };
          };
        };
      };
    };
    return ThreeMiddle2;
  }();
  var ThreeRight = /* @__PURE__ */ function() {
    function ThreeRight2(value0, value1, value22, value32, value42, value52) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
      this.value4 = value42;
      this.value5 = value52;
    }
    ;
    ThreeRight2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return function(value42) {
              return function(value52) {
                return new ThreeRight2(value0, value1, value22, value32, value42, value52);
              };
            };
          };
        };
      };
    };
    return ThreeRight2;
  }();
  var KickUp = /* @__PURE__ */ function() {
    function KickUp2(value0, value1, value22, value32) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
    }
    ;
    KickUp2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return new KickUp2(value0, value1, value22, value32);
          };
        };
      };
    };
    return KickUp2;
  }();
  var singleton4 = function(k) {
    return function(v) {
      return new Two(Leaf.value, k, v, Leaf.value);
    };
  };
  var lookup = function(dictOrd) {
    var compare4 = compare(dictOrd);
    return function(k) {
      var go2 = function($copy_v) {
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(v) {
          if (v instanceof Leaf) {
            $tco_done = true;
            return Nothing.value;
          }
          ;
          if (v instanceof Two) {
            var v2 = compare4(k)(v.value1);
            if (v2 instanceof EQ) {
              $tco_done = true;
              return new Just(v.value2);
            }
            ;
            if (v2 instanceof LT) {
              $copy_v = v.value0;
              return;
            }
            ;
            $copy_v = v.value3;
            return;
          }
          ;
          if (v instanceof Three) {
            var v3 = compare4(k)(v.value1);
            if (v3 instanceof EQ) {
              $tco_done = true;
              return new Just(v.value2);
            }
            ;
            var v4 = compare4(k)(v.value4);
            if (v4 instanceof EQ) {
              $tco_done = true;
              return new Just(v.value5);
            }
            ;
            if (v3 instanceof LT) {
              $copy_v = v.value0;
              return;
            }
            ;
            if (v4 instanceof GT) {
              $copy_v = v.value6;
              return;
            }
            ;
            $copy_v = v.value3;
            return;
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 241, column 5 - line 241, column 22): " + [v.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($copy_v);
        }
        ;
        return $tco_result;
      };
      return go2;
    };
  };
  var fromZipper = function($copy_dictOrd) {
    return function($copy_v) {
      return function($copy_v1) {
        var $tco_var_dictOrd = $copy_dictOrd;
        var $tco_var_v = $copy_v;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(dictOrd, v, v1) {
          if (v instanceof Nil) {
            $tco_done = true;
            return v1;
          }
          ;
          if (v instanceof Cons) {
            if (v.value0 instanceof TwoLeft) {
              $tco_var_dictOrd = dictOrd;
              $tco_var_v = v.value1;
              $copy_v1 = new Two(v1, v.value0.value0, v.value0.value1, v.value0.value2);
              return;
            }
            ;
            if (v.value0 instanceof TwoRight) {
              $tco_var_dictOrd = dictOrd;
              $tco_var_v = v.value1;
              $copy_v1 = new Two(v.value0.value0, v.value0.value1, v.value0.value2, v1);
              return;
            }
            ;
            if (v.value0 instanceof ThreeLeft) {
              $tco_var_dictOrd = dictOrd;
              $tco_var_v = v.value1;
              $copy_v1 = new Three(v1, v.value0.value0, v.value0.value1, v.value0.value2, v.value0.value3, v.value0.value4, v.value0.value5);
              return;
            }
            ;
            if (v.value0 instanceof ThreeMiddle) {
              $tco_var_dictOrd = dictOrd;
              $tco_var_v = v.value1;
              $copy_v1 = new Three(v.value0.value0, v.value0.value1, v.value0.value2, v1, v.value0.value3, v.value0.value4, v.value0.value5);
              return;
            }
            ;
            if (v.value0 instanceof ThreeRight) {
              $tco_var_dictOrd = dictOrd;
              $tco_var_v = v.value1;
              $copy_v1 = new Three(v.value0.value0, v.value0.value1, v.value0.value2, v.value0.value3, v.value0.value4, v.value0.value5, v1);
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 462, column 3 - line 467, column 88): " + [v.value0.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 459, column 1 - line 459, column 80): " + [v.constructor.name, v1.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_dictOrd, $tco_var_v, $copy_v1);
        }
        ;
        return $tco_result;
      };
    };
  };
  var insert4 = function(dictOrd) {
    var fromZipper1 = fromZipper(dictOrd);
    var compare4 = compare(dictOrd);
    return function(k) {
      return function(v) {
        var up = function($copy_v1) {
          return function($copy_v2) {
            var $tco_var_v1 = $copy_v1;
            var $tco_done = false;
            var $tco_result;
            function $tco_loop(v1, v2) {
              if (v1 instanceof Nil) {
                $tco_done = true;
                return new Two(v2.value0, v2.value1, v2.value2, v2.value3);
              }
              ;
              if (v1 instanceof Cons) {
                if (v1.value0 instanceof TwoLeft) {
                  $tco_done = true;
                  return fromZipper1(v1.value1)(new Three(v2.value0, v2.value1, v2.value2, v2.value3, v1.value0.value0, v1.value0.value1, v1.value0.value2));
                }
                ;
                if (v1.value0 instanceof TwoRight) {
                  $tco_done = true;
                  return fromZipper1(v1.value1)(new Three(v1.value0.value0, v1.value0.value1, v1.value0.value2, v2.value0, v2.value1, v2.value2, v2.value3));
                }
                ;
                if (v1.value0 instanceof ThreeLeft) {
                  $tco_var_v1 = v1.value1;
                  $copy_v2 = new KickUp(new Two(v2.value0, v2.value1, v2.value2, v2.value3), v1.value0.value0, v1.value0.value1, new Two(v1.value0.value2, v1.value0.value3, v1.value0.value4, v1.value0.value5));
                  return;
                }
                ;
                if (v1.value0 instanceof ThreeMiddle) {
                  $tco_var_v1 = v1.value1;
                  $copy_v2 = new KickUp(new Two(v1.value0.value0, v1.value0.value1, v1.value0.value2, v2.value0), v2.value1, v2.value2, new Two(v2.value3, v1.value0.value3, v1.value0.value4, v1.value0.value5));
                  return;
                }
                ;
                if (v1.value0 instanceof ThreeRight) {
                  $tco_var_v1 = v1.value1;
                  $copy_v2 = new KickUp(new Two(v1.value0.value0, v1.value0.value1, v1.value0.value2, v1.value0.value3), v1.value0.value4, v1.value0.value5, new Two(v2.value0, v2.value1, v2.value2, v2.value3));
                  return;
                }
                ;
                throw new Error("Failed pattern match at Data.Map.Internal (line 498, column 5 - line 503, column 108): " + [v1.value0.constructor.name, v2.constructor.name]);
              }
              ;
              throw new Error("Failed pattern match at Data.Map.Internal (line 495, column 3 - line 495, column 56): " + [v1.constructor.name, v2.constructor.name]);
            }
            ;
            while (!$tco_done) {
              $tco_result = $tco_loop($tco_var_v1, $copy_v2);
            }
            ;
            return $tco_result;
          };
        };
        var down = function($copy_v1) {
          return function($copy_v2) {
            var $tco_var_v1 = $copy_v1;
            var $tco_done1 = false;
            var $tco_result;
            function $tco_loop(v1, v2) {
              if (v2 instanceof Leaf) {
                $tco_done1 = true;
                return up(v1)(new KickUp(Leaf.value, k, v, Leaf.value));
              }
              ;
              if (v2 instanceof Two) {
                var v3 = compare4(k)(v2.value1);
                if (v3 instanceof EQ) {
                  $tco_done1 = true;
                  return fromZipper1(v1)(new Two(v2.value0, k, v, v2.value3));
                }
                ;
                if (v3 instanceof LT) {
                  $tco_var_v1 = new Cons(new TwoLeft(v2.value1, v2.value2, v2.value3), v1);
                  $copy_v2 = v2.value0;
                  return;
                }
                ;
                $tco_var_v1 = new Cons(new TwoRight(v2.value0, v2.value1, v2.value2), v1);
                $copy_v2 = v2.value3;
                return;
              }
              ;
              if (v2 instanceof Three) {
                var v3 = compare4(k)(v2.value1);
                if (v3 instanceof EQ) {
                  $tco_done1 = true;
                  return fromZipper1(v1)(new Three(v2.value0, k, v, v2.value3, v2.value4, v2.value5, v2.value6));
                }
                ;
                var v4 = compare4(k)(v2.value4);
                if (v4 instanceof EQ) {
                  $tco_done1 = true;
                  return fromZipper1(v1)(new Three(v2.value0, v2.value1, v2.value2, v2.value3, k, v, v2.value6));
                }
                ;
                if (v3 instanceof LT) {
                  $tco_var_v1 = new Cons(new ThreeLeft(v2.value1, v2.value2, v2.value3, v2.value4, v2.value5, v2.value6), v1);
                  $copy_v2 = v2.value0;
                  return;
                }
                ;
                if (v3 instanceof GT && v4 instanceof LT) {
                  $tco_var_v1 = new Cons(new ThreeMiddle(v2.value0, v2.value1, v2.value2, v2.value4, v2.value5, v2.value6), v1);
                  $copy_v2 = v2.value3;
                  return;
                }
                ;
                $tco_var_v1 = new Cons(new ThreeRight(v2.value0, v2.value1, v2.value2, v2.value3, v2.value4, v2.value5), v1);
                $copy_v2 = v2.value6;
                return;
              }
              ;
              throw new Error("Failed pattern match at Data.Map.Internal (line 478, column 3 - line 478, column 55): " + [v1.constructor.name, v2.constructor.name]);
            }
            ;
            while (!$tco_done1) {
              $tco_result = $tco_loop($tco_var_v1, $copy_v2);
            }
            ;
            return $tco_result;
          };
        };
        return down(Nil.value);
      };
    };
  };
  var pop = function(dictOrd) {
    var fromZipper1 = fromZipper(dictOrd);
    var compare4 = compare(dictOrd);
    return function(k) {
      var up = function($copy_ctxs) {
        return function($copy_tree) {
          var $tco_var_ctxs = $copy_ctxs;
          var $tco_done = false;
          var $tco_result;
          function $tco_loop(ctxs, tree) {
            if (ctxs instanceof Nil) {
              $tco_done = true;
              return tree;
            }
            ;
            if (ctxs instanceof Cons) {
              if (ctxs.value0 instanceof TwoLeft && (ctxs.value0.value2 instanceof Leaf && tree instanceof Leaf)) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(Leaf.value, ctxs.value0.value0, ctxs.value0.value1, Leaf.value));
              }
              ;
              if (ctxs.value0 instanceof TwoRight && (ctxs.value0.value0 instanceof Leaf && tree instanceof Leaf)) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(Leaf.value, ctxs.value0.value1, ctxs.value0.value2, Leaf.value));
              }
              ;
              if (ctxs.value0 instanceof TwoLeft && ctxs.value0.value2 instanceof Two) {
                $tco_var_ctxs = ctxs.value1;
                $copy_tree = new Three(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0, ctxs.value0.value2.value1, ctxs.value0.value2.value2, ctxs.value0.value2.value3);
                return;
              }
              ;
              if (ctxs.value0 instanceof TwoRight && ctxs.value0.value0 instanceof Two) {
                $tco_var_ctxs = ctxs.value1;
                $copy_tree = new Three(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3, ctxs.value0.value1, ctxs.value0.value2, tree);
                return;
              }
              ;
              if (ctxs.value0 instanceof TwoLeft && ctxs.value0.value2 instanceof Three) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(new Two(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0), ctxs.value0.value2.value1, ctxs.value0.value2.value2, new Two(ctxs.value0.value2.value3, ctxs.value0.value2.value4, ctxs.value0.value2.value5, ctxs.value0.value2.value6)));
              }
              ;
              if (ctxs.value0 instanceof TwoRight && ctxs.value0.value0 instanceof Three) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(new Two(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3), ctxs.value0.value0.value4, ctxs.value0.value0.value5, new Two(ctxs.value0.value0.value6, ctxs.value0.value1, ctxs.value0.value2, tree)));
              }
              ;
              if (ctxs.value0 instanceof ThreeLeft && (ctxs.value0.value2 instanceof Leaf && (ctxs.value0.value5 instanceof Leaf && tree instanceof Leaf))) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Three(Leaf.value, ctxs.value0.value0, ctxs.value0.value1, Leaf.value, ctxs.value0.value3, ctxs.value0.value4, Leaf.value));
              }
              ;
              if (ctxs.value0 instanceof ThreeMiddle && (ctxs.value0.value0 instanceof Leaf && (ctxs.value0.value5 instanceof Leaf && tree instanceof Leaf))) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Three(Leaf.value, ctxs.value0.value1, ctxs.value0.value2, Leaf.value, ctxs.value0.value3, ctxs.value0.value4, Leaf.value));
              }
              ;
              if (ctxs.value0 instanceof ThreeRight && (ctxs.value0.value0 instanceof Leaf && (ctxs.value0.value3 instanceof Leaf && tree instanceof Leaf))) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Three(Leaf.value, ctxs.value0.value1, ctxs.value0.value2, Leaf.value, ctxs.value0.value4, ctxs.value0.value5, Leaf.value));
              }
              ;
              if (ctxs.value0 instanceof ThreeLeft && ctxs.value0.value2 instanceof Two) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(new Three(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0, ctxs.value0.value2.value1, ctxs.value0.value2.value2, ctxs.value0.value2.value3), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
              }
              ;
              if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value0 instanceof Two) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(new Three(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3, ctxs.value0.value1, ctxs.value0.value2, tree), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
              }
              ;
              if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value5 instanceof Two) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Three(tree, ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5.value0, ctxs.value0.value5.value1, ctxs.value0.value5.value2, ctxs.value0.value5.value3)));
              }
              ;
              if (ctxs.value0 instanceof ThreeRight && ctxs.value0.value3 instanceof Two) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Three(ctxs.value0.value3.value0, ctxs.value0.value3.value1, ctxs.value0.value3.value2, ctxs.value0.value3.value3, ctxs.value0.value4, ctxs.value0.value5, tree)));
              }
              ;
              if (ctxs.value0 instanceof ThreeLeft && ctxs.value0.value2 instanceof Three) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Three(new Two(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0), ctxs.value0.value2.value1, ctxs.value0.value2.value2, new Two(ctxs.value0.value2.value3, ctxs.value0.value2.value4, ctxs.value0.value2.value5, ctxs.value0.value2.value6), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
              }
              ;
              if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value0 instanceof Three) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Three(new Two(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3), ctxs.value0.value0.value4, ctxs.value0.value0.value5, new Two(ctxs.value0.value0.value6, ctxs.value0.value1, ctxs.value0.value2, tree), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
              }
              ;
              if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value5 instanceof Three) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Three(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Two(tree, ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5.value0), ctxs.value0.value5.value1, ctxs.value0.value5.value2, new Two(ctxs.value0.value5.value3, ctxs.value0.value5.value4, ctxs.value0.value5.value5, ctxs.value0.value5.value6)));
              }
              ;
              if (ctxs.value0 instanceof ThreeRight && ctxs.value0.value3 instanceof Three) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Three(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Two(ctxs.value0.value3.value0, ctxs.value0.value3.value1, ctxs.value0.value3.value2, ctxs.value0.value3.value3), ctxs.value0.value3.value4, ctxs.value0.value3.value5, new Two(ctxs.value0.value3.value6, ctxs.value0.value4, ctxs.value0.value5, tree)));
              }
              ;
              $tco_done = true;
              return unsafeCrashWith("The impossible happened in partial function `up`.");
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 552, column 5 - line 573, column 86): " + [ctxs.constructor.name]);
          }
          ;
          while (!$tco_done) {
            $tco_result = $tco_loop($tco_var_ctxs, $copy_tree);
          }
          ;
          return $tco_result;
        };
      };
      var removeMaxNode = function($copy_ctx) {
        return function($copy_m) {
          var $tco_var_ctx = $copy_ctx;
          var $tco_done1 = false;
          var $tco_result;
          function $tco_loop(ctx, m) {
            if (m instanceof Two && (m.value0 instanceof Leaf && m.value3 instanceof Leaf)) {
              $tco_done1 = true;
              return up(ctx)(Leaf.value);
            }
            ;
            if (m instanceof Two) {
              $tco_var_ctx = new Cons(new TwoRight(m.value0, m.value1, m.value2), ctx);
              $copy_m = m.value3;
              return;
            }
            ;
            if (m instanceof Three && (m.value0 instanceof Leaf && (m.value3 instanceof Leaf && m.value6 instanceof Leaf))) {
              $tco_done1 = true;
              return up(new Cons(new TwoRight(Leaf.value, m.value1, m.value2), ctx))(Leaf.value);
            }
            ;
            if (m instanceof Three) {
              $tco_var_ctx = new Cons(new ThreeRight(m.value0, m.value1, m.value2, m.value3, m.value4, m.value5), ctx);
              $copy_m = m.value6;
              return;
            }
            ;
            $tco_done1 = true;
            return unsafeCrashWith("The impossible happened in partial function `removeMaxNode`.");
          }
          ;
          while (!$tco_done1) {
            $tco_result = $tco_loop($tco_var_ctx, $copy_m);
          }
          ;
          return $tco_result;
        };
      };
      var maxNode = function($copy_m) {
        var $tco_done2 = false;
        var $tco_result;
        function $tco_loop(m) {
          if (m instanceof Two && m.value3 instanceof Leaf) {
            $tco_done2 = true;
            return {
              key: m.value1,
              value: m.value2
            };
          }
          ;
          if (m instanceof Two) {
            $copy_m = m.value3;
            return;
          }
          ;
          if (m instanceof Three && m.value6 instanceof Leaf) {
            $tco_done2 = true;
            return {
              key: m.value4,
              value: m.value5
            };
          }
          ;
          if (m instanceof Three) {
            $copy_m = m.value6;
            return;
          }
          ;
          $tco_done2 = true;
          return unsafeCrashWith("The impossible happened in partial function `maxNode`.");
        }
        ;
        while (!$tco_done2) {
          $tco_result = $tco_loop($copy_m);
        }
        ;
        return $tco_result;
      };
      var down = function($copy_ctx) {
        return function($copy_m) {
          var $tco_var_ctx = $copy_ctx;
          var $tco_done3 = false;
          var $tco_result;
          function $tco_loop(ctx, m) {
            if (m instanceof Leaf) {
              $tco_done3 = true;
              return Nothing.value;
            }
            ;
            if (m instanceof Two) {
              var v = compare4(k)(m.value1);
              if (m.value3 instanceof Leaf && v instanceof EQ) {
                $tco_done3 = true;
                return new Just(new Tuple(m.value2, up(ctx)(Leaf.value)));
              }
              ;
              if (v instanceof EQ) {
                var max7 = maxNode(m.value0);
                $tco_done3 = true;
                return new Just(new Tuple(m.value2, removeMaxNode(new Cons(new TwoLeft(max7.key, max7.value, m.value3), ctx))(m.value0)));
              }
              ;
              if (v instanceof LT) {
                $tco_var_ctx = new Cons(new TwoLeft(m.value1, m.value2, m.value3), ctx);
                $copy_m = m.value0;
                return;
              }
              ;
              $tco_var_ctx = new Cons(new TwoRight(m.value0, m.value1, m.value2), ctx);
              $copy_m = m.value3;
              return;
            }
            ;
            if (m instanceof Three) {
              var leaves = function() {
                if (m.value0 instanceof Leaf && (m.value3 instanceof Leaf && m.value6 instanceof Leaf)) {
                  return true;
                }
                ;
                return false;
              }();
              var v = compare4(k)(m.value4);
              var v3 = compare4(k)(m.value1);
              if (leaves && v3 instanceof EQ) {
                $tco_done3 = true;
                return new Just(new Tuple(m.value2, fromZipper1(ctx)(new Two(Leaf.value, m.value4, m.value5, Leaf.value))));
              }
              ;
              if (leaves && v instanceof EQ) {
                $tco_done3 = true;
                return new Just(new Tuple(m.value5, fromZipper1(ctx)(new Two(Leaf.value, m.value1, m.value2, Leaf.value))));
              }
              ;
              if (v3 instanceof EQ) {
                var max7 = maxNode(m.value0);
                $tco_done3 = true;
                return new Just(new Tuple(m.value2, removeMaxNode(new Cons(new ThreeLeft(max7.key, max7.value, m.value3, m.value4, m.value5, m.value6), ctx))(m.value0)));
              }
              ;
              if (v instanceof EQ) {
                var max7 = maxNode(m.value3);
                $tco_done3 = true;
                return new Just(new Tuple(m.value5, removeMaxNode(new Cons(new ThreeMiddle(m.value0, m.value1, m.value2, max7.key, max7.value, m.value6), ctx))(m.value3)));
              }
              ;
              if (v3 instanceof LT) {
                $tco_var_ctx = new Cons(new ThreeLeft(m.value1, m.value2, m.value3, m.value4, m.value5, m.value6), ctx);
                $copy_m = m.value0;
                return;
              }
              ;
              if (v3 instanceof GT && v instanceof LT) {
                $tco_var_ctx = new Cons(new ThreeMiddle(m.value0, m.value1, m.value2, m.value4, m.value5, m.value6), ctx);
                $copy_m = m.value3;
                return;
              }
              ;
              $tco_var_ctx = new Cons(new ThreeRight(m.value0, m.value1, m.value2, m.value3, m.value4, m.value5), ctx);
              $copy_m = m.value6;
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 525, column 16 - line 548, column 80): " + [m.constructor.name]);
          }
          ;
          while (!$tco_done3) {
            $tco_result = $tco_loop($tco_var_ctx, $copy_m);
          }
          ;
          return $tco_result;
        };
      };
      return down(Nil.value);
    };
  };
  var foldableMap = {
    foldr: function(f) {
      return function(z) {
        return function(m) {
          if (m instanceof Leaf) {
            return z;
          }
          ;
          if (m instanceof Two) {
            return foldr(foldableMap)(f)(f(m.value2)(foldr(foldableMap)(f)(z)(m.value3)))(m.value0);
          }
          ;
          if (m instanceof Three) {
            return foldr(foldableMap)(f)(f(m.value2)(foldr(foldableMap)(f)(f(m.value5)(foldr(foldableMap)(f)(z)(m.value6)))(m.value3)))(m.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 133, column 17 - line 136, column 85): " + [m.constructor.name]);
        };
      };
    },
    foldl: function(f) {
      return function(z) {
        return function(m) {
          if (m instanceof Leaf) {
            return z;
          }
          ;
          if (m instanceof Two) {
            return foldl(foldableMap)(f)(f(foldl(foldableMap)(f)(z)(m.value0))(m.value2))(m.value3);
          }
          ;
          if (m instanceof Three) {
            return foldl(foldableMap)(f)(f(foldl(foldableMap)(f)(f(foldl(foldableMap)(f)(z)(m.value0))(m.value2))(m.value3))(m.value5))(m.value6);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 137, column 17 - line 140, column 85): " + [m.constructor.name]);
        };
      };
    },
    foldMap: function(dictMonoid) {
      var mempty6 = mempty(dictMonoid);
      var append22 = append(dictMonoid.Semigroup0());
      return function(f) {
        return function(m) {
          if (m instanceof Leaf) {
            return mempty6;
          }
          ;
          if (m instanceof Two) {
            return append22(foldMap(foldableMap)(dictMonoid)(f)(m.value0))(append22(f(m.value2))(foldMap(foldableMap)(dictMonoid)(f)(m.value3)));
          }
          ;
          if (m instanceof Three) {
            return append22(foldMap(foldableMap)(dictMonoid)(f)(m.value0))(append22(f(m.value2))(append22(foldMap(foldableMap)(dictMonoid)(f)(m.value3))(append22(f(m.value5))(foldMap(foldableMap)(dictMonoid)(f)(m.value6)))));
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 141, column 17 - line 144, column 93): " + [m.constructor.name]);
        };
      };
    }
  };
  var foldableWithIndexMap = {
    foldrWithIndex: function(f) {
      return function(z) {
        return function(m) {
          if (m instanceof Leaf) {
            return z;
          }
          ;
          if (m instanceof Two) {
            return foldrWithIndex(foldableWithIndexMap)(f)(f(m.value1)(m.value2)(foldrWithIndex(foldableWithIndexMap)(f)(z)(m.value3)))(m.value0);
          }
          ;
          if (m instanceof Three) {
            return foldrWithIndex(foldableWithIndexMap)(f)(f(m.value1)(m.value2)(foldrWithIndex(foldableWithIndexMap)(f)(f(m.value4)(m.value5)(foldrWithIndex(foldableWithIndexMap)(f)(z)(m.value6)))(m.value3)))(m.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 147, column 26 - line 150, column 120): " + [m.constructor.name]);
        };
      };
    },
    foldlWithIndex: function(f) {
      return function(z) {
        return function(m) {
          if (m instanceof Leaf) {
            return z;
          }
          ;
          if (m instanceof Two) {
            return foldlWithIndex(foldableWithIndexMap)(f)(f(m.value1)(foldlWithIndex(foldableWithIndexMap)(f)(z)(m.value0))(m.value2))(m.value3);
          }
          ;
          if (m instanceof Three) {
            return foldlWithIndex(foldableWithIndexMap)(f)(f(m.value4)(foldlWithIndex(foldableWithIndexMap)(f)(f(m.value1)(foldlWithIndex(foldableWithIndexMap)(f)(z)(m.value0))(m.value2))(m.value3))(m.value5))(m.value6);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 151, column 26 - line 154, column 120): " + [m.constructor.name]);
        };
      };
    },
    foldMapWithIndex: function(dictMonoid) {
      var mempty6 = mempty(dictMonoid);
      var append22 = append(dictMonoid.Semigroup0());
      return function(f) {
        return function(m) {
          if (m instanceof Leaf) {
            return mempty6;
          }
          ;
          if (m instanceof Two) {
            return append22(foldMapWithIndex(foldableWithIndexMap)(dictMonoid)(f)(m.value0))(append22(f(m.value1)(m.value2))(foldMapWithIndex(foldableWithIndexMap)(dictMonoid)(f)(m.value3)));
          }
          ;
          if (m instanceof Three) {
            return append22(foldMapWithIndex(foldableWithIndexMap)(dictMonoid)(f)(m.value0))(append22(f(m.value1)(m.value2))(append22(foldMapWithIndex(foldableWithIndexMap)(dictMonoid)(f)(m.value3))(append22(f(m.value4)(m.value5))(foldMapWithIndex(foldableWithIndexMap)(dictMonoid)(f)(m.value6)))));
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 155, column 26 - line 158, column 128): " + [m.constructor.name]);
        };
      };
    },
    Foldable0: function() {
      return foldableMap;
    }
  };
  var foldrWithIndex2 = /* @__PURE__ */ foldrWithIndex(foldableWithIndexMap);
  var foldlWithIndex2 = /* @__PURE__ */ foldlWithIndex(foldableWithIndexMap);
  var keys = /* @__PURE__ */ function() {
    return foldrWithIndex2(function(k) {
      return function(v) {
        return function(acc) {
          return new Cons(k, acc);
        };
      };
    })(Nil.value);
  }();
  var empty2 = /* @__PURE__ */ function() {
    return Leaf.value;
  }();
  var $$delete2 = function(dictOrd) {
    var pop1 = pop(dictOrd);
    return function(k) {
      return function(m) {
        return maybe(m)(snd)(pop1(k)(m));
      };
    };
  };
  var alter = function(dictOrd) {
    var lookup1 = lookup(dictOrd);
    var delete1 = $$delete2(dictOrd);
    var insert1 = insert4(dictOrd);
    return function(f) {
      return function(k) {
        return function(m) {
          var v = f(lookup1(k)(m));
          if (v instanceof Nothing) {
            return delete1(k)(m);
          }
          ;
          if (v instanceof Just) {
            return insert1(k)(v.value0)(m);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 596, column 15 - line 598, column 25): " + [v.constructor.name]);
        };
      };
    };
  };
  var unionWith = function(dictOrd) {
    var alter1 = alter(dictOrd);
    return function(f) {
      return function(m1) {
        return function(m2) {
          var go2 = function(k) {
            return function(m) {
              return function(v) {
                return alter1(function() {
                  var $936 = maybe(v)(f(v));
                  return function($937) {
                    return Just.create($936($937));
                  };
                }())(k)(m);
              };
            };
          };
          return foldlWithIndex2(go2)(m2)(m1);
        };
      };
    };
  };
  var union = function(dictOrd) {
    return unionWith(dictOrd)($$const);
  };

  // output/Data.Filterable/index.js
  var filterMap = function(dict) {
    return dict.filterMap;
  };

  // output/Data.UInt/foreign.js
  function toNumber2(uval) {
    return uval;
  }
  function uintEq(x) {
    return function(y) {
      return x == y;
    };
  }

  // output/Data.UInt/index.js
  var uintEqInstance = {
    eq: uintEq
  };

  // output/FRP.Event/foreign.js
  var fastForeachE = (as, f) => {
    for (var i2 = 0, l = as.length; i2 < l; i2++) {
      f(as[i2]);
    }
  };
  var fastForeachOhE = (o, f) => {
    for (const a2 in o) {
      f(o[a2]);
    }
  };
  var objHack = () => ({});
  var insertObjHack = (k, v, o) => {
    o[k] = v;
  };
  var deleteObjHack = (k, o) => {
    delete o[k];
  };

  // output/Control.Monad.ST.Global/index.js
  var toEffect = unsafeCoerce2;

  // output/Control.Monad.ST.Class/index.js
  var monadSTEffect = {
    liftST: toEffect,
    Monad0: function() {
      return monadEffect;
    }
  };
  var liftST = function(dict) {
    return dict.liftST;
  };

  // output/Data.Set/index.js
  var foldMap2 = /* @__PURE__ */ foldMap(foldableList);
  var foldl2 = /* @__PURE__ */ foldl(foldableList);
  var foldr3 = /* @__PURE__ */ foldr(foldableList);
  var union2 = function(dictOrd) {
    var union1 = union(dictOrd);
    return function(v) {
      return function(v1) {
        return union1(v)(v1);
      };
    };
  };
  var toList2 = function(v) {
    return keys(v);
  };
  var singleton6 = function(a2) {
    return singleton4(a2)(unit);
  };
  var semigroupSet = function(dictOrd) {
    return {
      append: union2(dictOrd)
    };
  };
  var foldableSet = {
    foldMap: function(dictMonoid) {
      var foldMap12 = foldMap2(dictMonoid);
      return function(f) {
        var $129 = foldMap12(f);
        return function($130) {
          return $129(toList2($130));
        };
      };
    },
    foldl: function(f) {
      return function(x) {
        var $131 = foldl2(f)(x);
        return function($132) {
          return $131(toList2($132));
        };
      };
    },
    foldr: function(f) {
      return function(x) {
        var $133 = foldr3(f)(x);
        return function($134) {
          return $133(toList2($134));
        };
      };
    }
  };
  var empty3 = empty2;
  var monoidSet = function(dictOrd) {
    var semigroupSet1 = semigroupSet(dictOrd);
    return {
      mempty: empty3,
      Semigroup0: function() {
        return semigroupSet1;
      }
    };
  };
  var $$delete3 = function(dictOrd) {
    var delete1 = $$delete2(dictOrd);
    return function(a2) {
      return function(v) {
        return delete1(a2)(v);
      };
    };
  };

  // output/Effect.Timer/foreign.js
  function setTimeoutImpl(ms) {
    return function(fn) {
      return function() {
        return setTimeout(fn, ms);
      };
    };
  }
  function clearTimeoutImpl(id2) {
    return function() {
      clearTimeout(id2);
    };
  }

  // output/Effect.Timer/index.js
  var compare2 = /* @__PURE__ */ compare(ordInt);
  var setTimeout2 = setTimeoutImpl;
  var eqTimeoutId = {
    eq: function(x) {
      return function(y) {
        return x === y;
      };
    }
  };
  var ordTimeoutId = {
    compare: function(x) {
      return function(y) {
        return compare2(x)(y);
      };
    },
    Eq0: function() {
      return eqTimeoutId;
    }
  };
  var clearTimeout2 = clearTimeoutImpl;

  // output/FRP.Event.Class/index.js
  var identity7 = /* @__PURE__ */ identity(categoryFn);
  var sampleOnRight = function(dict) {
    return dict.sampleOnRight;
  };
  var keepLatest = function(dict) {
    return dict.keepLatest;
  };
  var fix2 = function(dict) {
    return dict.fix;
  };
  var fold2 = function(dictIsEvent) {
    var fix1 = fix2(dictIsEvent);
    var sampleOnRight1 = sampleOnRight(dictIsEvent);
    var Alternative0 = dictIsEvent.Alternative0();
    var alt10 = alt(Alternative0.Plus1().Alt0());
    var pure16 = pure(Alternative0.Applicative0());
    var map17 = map(dictIsEvent.Filterable1().Functor1());
    return function(f) {
      return function(b2) {
        return function(e) {
          return fix1(function(i2) {
            return sampleOnRight1(alt10(i2)(pure16(b2)))(map17(flip(f))(e));
          });
        };
      };
    };
  };
  var withLast = function(dictIsEvent) {
    var filterMap3 = filterMap(dictIsEvent.Filterable1());
    var fold12 = fold2(dictIsEvent);
    return function(e) {
      var step3 = function(v) {
        return function(v1) {
          if (v instanceof Nothing) {
            return new Just({
              now: v1,
              last: Nothing.value
            });
          }
          ;
          if (v instanceof Just) {
            return new Just({
              now: v1,
              last: new Just(v.value0.now)
            });
          }
          ;
          throw new Error("Failed pattern match at FRP.Event.Class (line 83, column 3 - line 83, column 50): " + [v.constructor.name, v1.constructor.name]);
        };
      };
      return filterMap3(identity7)(fold12(step3)(Nothing.value)(e));
    };
  };

  // output/Unsafe.Reference/foreign.js
  function reallyUnsafeRefEq(a2) {
    return function(b2) {
      return a2 === b2;
    };
  }

  // output/Unsafe.Reference/index.js
  var unsafeRefEq = reallyUnsafeRefEq;

  // output/FRP.Event/index.js
  var $runtime_lazy3 = function(name15, moduleName, init4) {
    var state4 = 0;
    var val;
    return function(lineNumber) {
      if (state4 === 2)
        return val;
      if (state4 === 1)
        throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state4 = 1;
      val = init4();
      state4 = 2;
      return val;
    };
  };
  var for_2 = /* @__PURE__ */ for_(applicativeEffect);
  var for_1 = /* @__PURE__ */ for_2(foldableMaybe);
  var pure2 = /* @__PURE__ */ pure(applicativeEffect);
  var mempty2 = /* @__PURE__ */ mempty(/* @__PURE__ */ monoidEffectFn1(monoidUnit));
  var liftST2 = /* @__PURE__ */ liftST(monadSTEffect);
  var $$void3 = /* @__PURE__ */ $$void(functorEffect);
  var append3 = /* @__PURE__ */ append(semigroupArray);
  var mempty1 = /* @__PURE__ */ mempty(/* @__PURE__ */ monoidSet(ordTimeoutId));
  var $$delete4 = /* @__PURE__ */ $$delete3(ordTimeoutId);
  var append12 = /* @__PURE__ */ append(/* @__PURE__ */ semigroupSet(ordTimeoutId));
  var for_22 = /* @__PURE__ */ for_2(foldableSet);
  var apply2 = /* @__PURE__ */ apply(applyEffect);
  var map3 = /* @__PURE__ */ map(functorEffect);
  var sampleOnRight2 = function(v) {
    return function(v1) {
      return function(b2, k) {
        var latest = $$new(Nothing.value)();
        var c1 = v(b2, function(a2) {
          return write(new Just(a2))(latest)();
        });
        var c2 = v1(b2, function(f) {
          var o = read(latest)();
          return for_1(o)(function(a2) {
            return function() {
              return k(f(a2));
            };
          })();
        });
        return function __do2() {
          c1();
          return c2();
        };
      };
    };
  };
  var sampleOnLeft = function(v) {
    return function(v1) {
      return function(b2, k) {
        var latest = $$new(Nothing.value)();
        var c1 = v(b2, function(a2) {
          var o = read(latest)();
          return for_1(o)(function(f) {
            return function() {
              return k(f(a2));
            };
          })();
        });
        var c2 = v1(b2, function(f) {
          return write(new Just(f))(latest)();
        });
        return function __do2() {
          c1();
          return c2();
        };
      };
    };
  };
  var keepLatest2 = function(v) {
    return function(tf, k) {
      var cancelInner = $$new(pure2(unit))();
      var cancelOuter = v(tf, function(v1) {
        var ci = read(cancelInner)();
        ci();
        var c = v1(tf, k);
        return write(c)(cancelInner)();
      });
      return function __do2() {
        var ci = read(cancelInner)();
        ci();
        return cancelOuter();
      };
    };
  };
  var functorEvent = {
    map: function(f) {
      return function(v) {
        return function(b2, k) {
          return v(b2, function(a2) {
            return k(f(a2));
          });
        };
      };
    }
  };
  var map1 = /* @__PURE__ */ map(functorEvent);
  var filter4 = function(p2) {
    return function(v) {
      return function(tf, k) {
        return v(tf, function(a2) {
          var v1 = p2(a2);
          if (v1 instanceof Just) {
            return k(v1.value0);
          }
          ;
          if (v1 instanceof Nothing) {
            return unit;
          }
          ;
          throw new Error("Failed pattern match at FRP.Event (line 208, column 31 - line 210, column 35): " + [v1.constructor.name]);
        });
      };
    };
  };
  var filter$prime = function(f) {
    return filter4(function(a2) {
      var v = f(a2);
      if (v) {
        return new Just(a2);
      }
      ;
      if (!v) {
        return Nothing.value;
      }
      ;
      throw new Error("Failed pattern match at FRP.Event (line 136, column 13 - line 138, column 25): " + [v.constructor.name]);
    });
  };
  var create$prime = function __do() {
    var subscribers = objHack();
    var idx = $$new(0)();
    return {
      event: function(v, k) {
        var rk = $$new(k)();
        var ix = read(idx)();
        insertObjHack(ix, rk, subscribers);
        modify_(function(v1) {
          return v1 + 1 | 0;
        })(idx)();
        return function __do2() {
          write(mempty2)(rk)();
          deleteObjHack(ix, subscribers);
          return unit;
        };
      },
      push: function(a2) {
        return fastForeachOhE(subscribers, function(rk) {
          var k = read(rk)();
          return k(a2);
        });
      }
    };
  };
  var fix3 = function(f) {
    return function(tf, k) {
      var v = create$prime();
      var v1 = f(v.event);
      var c2 = v.event(tf, k);
      var c1 = v1(tf, v.push);
      return function __do2() {
        c1();
        return c2();
      };
    };
  };
  var compactableEvent = {
    compact: /* @__PURE__ */ filter4(/* @__PURE__ */ identity(categoryFn)),
    separate: function(xs) {
      return {
        left: filter4(function(v) {
          if (v instanceof Left) {
            return new Just(v.value0);
          }
          ;
          if (v instanceof Right) {
            return Nothing.value;
          }
          ;
          throw new Error("Failed pattern match at FRP.Event (line 119, column 13 - line 121, column 33): " + [v.constructor.name]);
        })(xs),
        right: filter4(function(v) {
          if (v instanceof Right) {
            return new Just(v.value0);
          }
          ;
          if (v instanceof Left) {
            return Nothing.value;
          }
          ;
          throw new Error("Failed pattern match at FRP.Event (line 126, column 13 - line 128, column 32): " + [v.constructor.name]);
        })(xs)
      };
    }
  };
  var filterableEvent = {
    filter: filter$prime,
    filterMap: filter4,
    partition: function(p2) {
      return function(xs) {
        return {
          yes: filter$prime(p2)(xs),
          no: filter$prime(function($210) {
            return !p2($210);
          })(xs)
        };
      };
    },
    partitionMap: function(f) {
      return function(xs) {
        return {
          left: filterMap(filterableEvent)(function() {
            var $211 = either(Just.create)($$const(Nothing.value));
            return function($212) {
              return $211(f($212));
            };
          }())(xs),
          right: filterMap(filterableEvent)(function($213) {
            return hush(f($213));
          })(xs)
        };
      };
    },
    Compactable0: function() {
      return compactableEvent;
    },
    Functor1: function() {
      return functorEvent;
    }
  };
  var biSampleOn = function(v) {
    return function(v1) {
      return function(tf, k) {
        var latest1 = $$new(Nothing.value)();
        var replay1 = liftST2(newSTArray)();
        var latest2 = $$new(Nothing.value)();
        var replay2 = liftST2(newSTArray)();
        var capturing = $$new(true)();
        var c1 = v(tf, function(a2) {
          var o = read(capturing)();
          if (o) {
            return $$void3(liftST2(push(a2)(replay1)))();
          }
          ;
          write(new Just(a2))(latest1)();
          var res = read(latest2)();
          return for_1(res)(function(f) {
            return function() {
              return k(f(a2));
            };
          })();
        });
        var c2 = v1(tf, function(f) {
          var o = read(capturing)();
          if (o) {
            return $$void3(liftST2(push(f)(replay2)))();
          }
          ;
          write(new Just(f))(latest2)();
          var res = read(latest1)();
          return for_1(res)(function(a2) {
            return function() {
              return k(f(a2));
            };
          })();
        });
        write(false)(capturing)();
        var samples1 = liftST2(freeze(replay1))();
        var samples2 = liftST2(freeze(replay2))();
        (function() {
          if (samples1.length === 0) {
            return write(last(samples2))(latest2)();
          }
          ;
          return fastForeachE(samples1, function(a2) {
            write(new Just(a2))(latest1)();
            return fastForeachE(samples2, function(f) {
              write(new Just(f))(latest2)();
              return k(f(a2));
            });
          });
        })();
        liftST2(splice(0)(length(samples1))([])(replay1))();
        liftST2(splice(0)(length(samples2))([])(replay2))();
        return function __do2() {
          c1();
          return c2();
        };
      };
    };
  };
  var subscribe = function(i2) {
    return function(v) {
      return v;
    }($lazy_backdoor(328).subscribe)(i2);
  };
  var $lazy_backdoor = /* @__PURE__ */ $runtime_lazy3("backdoor", "FRP.Event", function() {
    var create_ = function __do2() {
      var subscribers = objHack();
      var idx = $$new(0)();
      return {
        event: function(v, k) {
          var rk = $$new(k)();
          var ix = read(idx)();
          insertObjHack(ix, rk, subscribers);
          modify_(function(v1) {
            return v1 + 1 | 0;
          })(idx)();
          return function __do3() {
            write(mempty2)(rk)();
            deleteObjHack(ix, subscribers);
            return unit;
          };
        },
        push: function(a2) {
          return function() {
            return fastForeachOhE(subscribers, function(rk) {
              var k = read(rk)();
              return k(a2);
            });
          };
        }
      };
    };
    return {
      createO: create$prime,
      makeEvent: function() {
        var makeEvent_ = function(e) {
          return function(tf, k) {
            if (tf) {
              return pure2(unit);
            }
            ;
            return e(function(a2) {
              return function() {
                return k(a2);
              };
            })();
          };
        };
        return makeEvent_;
      }(),
      makeEventO: function() {
        var makeEventO_ = function(e) {
          return function(tf, k) {
            if (tf) {
              return pure2(unit);
            }
            ;
            return e(k);
          };
        };
        return makeEventO_;
      }(),
      makePureEvent: function() {
        var makePureEvent_ = function(e) {
          return function(v, k) {
            return e(function(a2) {
              return function() {
                return k(a2);
              };
            })();
          };
        };
        return makePureEvent_;
      }(),
      makeLemmingEvent: function() {
        var makeLemmingEvent_ = function(e) {
          return function(tf, k) {
            var o = function(v) {
              return function(kx) {
                return function() {
                  return v(tf, mkEffectFn1(kx));
                };
              };
            };
            return e(o)(function(a2) {
              return function() {
                return k(a2);
              };
            })();
          };
        };
        return makeLemmingEvent_;
      }(),
      makeLemmingEventO: function() {
        var makeLemmingEventO_ = function(e) {
          return function(tf, k) {
            var o = function(v, kx) {
              return v(tf, kx);
            };
            return e(o, k);
          };
        };
        return makeLemmingEventO_;
      }(),
      create: create_,
      createPure: create_,
      createPureO: create$prime,
      subscribe: function() {
        var subscribe_ = function(v) {
          return function(k) {
            return function() {
              return v(false, mkEffectFn1(k));
            };
          };
        };
        return subscribe_;
      }(),
      subscribeO: function() {
        var subscribeO_ = function(v, k) {
          return v(false, k);
        };
        return subscribeO_;
      }(),
      subscribePureO: function() {
        var subscribePureO_ = function(v, k) {
          return v(true, k);
        };
        return subscribePureO_;
      }(),
      subscribePure: function() {
        var subscribePure_ = function() {
          var o = function(v) {
            return function(k) {
              return function() {
                return v(true, mkEffectFn1(k));
              };
            };
          };
          return o;
        }();
        return subscribePure_;
      }(),
      bus: function() {
        var bus_ = function(f) {
          return function(v, k) {
            var v1 = $lazy_create(760)();
            k(f(v1.push)(v1.event));
            return pure2(unit);
          };
        };
        return bus_;
      }(),
      memoize: function() {
        var memoize_ = function(v) {
          return function(f) {
            return function(b2, k) {
              var v1 = create$prime();
              k(f(v1.event));
              return v(b2, v1.push);
            };
          };
        };
        return memoize_;
      }(),
      hot: function() {
        var hot_ = function(e) {
          return function __do2() {
            var v = $lazy_create(778)();
            var unsubscribe = subscribe(e)(v.push)();
            return {
              event: v.event,
              unsubscribe
            };
          };
        };
        return hot_;
      }(),
      mailboxed: function() {
        var mailboxed_ = function(dictOrd) {
          var alter2 = alter(dictOrd);
          var lookup4 = lookup(dictOrd);
          return function(v) {
            return function(f) {
              return function(tf, k1) {
                var r = $$new(empty2)();
                k1(f(function(a2) {
                  return function(v1, k2) {
                    $$void3(modify(alter2(function(v2) {
                      if (v2 instanceof Nothing) {
                        return new Just([k2]);
                      }
                      ;
                      if (v2 instanceof Just) {
                        return new Just(append3(v2.value0)([k2]));
                      }
                      ;
                      throw new Error("Failed pattern match at FRP.Event (line 791, column 21 - line 793, column 55): " + [v2.constructor.name]);
                    })(a2))(r))();
                    return $$void3(modify(alter2(function(v2) {
                      if (v2 instanceof Nothing) {
                        return Nothing.value;
                      }
                      ;
                      if (v2 instanceof Just) {
                        return new Just(deleteBy(unsafeRefEq)(k2)(v2.value0));
                      }
                      ;
                      throw new Error("Failed pattern match at FRP.Event (line 800, column 21 - line 802, column 69): " + [v2.constructor.name]);
                    })(a2))(r));
                  };
                }));
                var unsub = v(tf, function(v1) {
                  var o = read(r)();
                  var v2 = lookup4(v1.address)(o);
                  if (v2 instanceof Nothing) {
                    return unit;
                  }
                  ;
                  if (v2 instanceof Just) {
                    return fastForeachE(v2.value0, function(i2) {
                      return i2(v1.payload);
                    });
                  }
                  ;
                  throw new Error("Failed pattern match at FRP.Event (line 809, column 13 - line 811, column 99): " + [v2.constructor.name]);
                });
                return function __do2() {
                  $$void3(write(empty2)(r))();
                  return unsub();
                };
              };
            };
          };
        };
        return mailboxed_;
      }(),
      delay: function() {
        var delay_ = function(n) {
          return function(v) {
            return function(tf, k) {
              var tid = $$new(mempty1)();
              var canceler = v(tf, function(a2) {
                var localId = $$new(Nothing.value)();
                var id2 = setTimeout2(n)(function __do2() {
                  k(a2);
                  var lid = read(localId)();
                  return maybe(pure2(unit))(function(id3) {
                    return modify_($$delete4(id3))(tid);
                  })(lid)();
                })();
                write(new Just(id2))(localId)();
                return modify_(append12(singleton6(id2)))(tid)();
              });
              return function __do2() {
                var ids = read(tid)();
                for_22(ids)(clearTimeout2)();
                return canceler();
              };
            };
          };
        };
        return delay_;
      }()
    };
  });
  var $lazy_create = /* @__PURE__ */ $runtime_lazy3("create", "FRP.Event", function() {
    return function __do2() {
      unit;
      return function(v) {
        return v;
      }($lazy_backdoor(444).create)();
    };
  });
  var backdoor = /* @__PURE__ */ $lazy_backdoor(619);
  var create = /* @__PURE__ */ $lazy_create(441);
  var makeEvent = function(i2) {
    return function(v) {
      return v;
    }(backdoor.makeEvent)(i2);
  };
  var makeLemmingEventO = function(i2) {
    return function(v) {
      return v;
    }(backdoor.makeLemmingEventO)(i2);
  };
  var applyEvent = {
    apply: function(a2) {
      return function(b2) {
        return biSampleOn(a2)(map1(applyFlipped)(b2));
      };
    },
    Functor0: function() {
      return functorEvent;
    }
  };
  var applicativeEvent = {
    pure: function(a2) {
      return function(v, k) {
        k(a2);
        return pure2(unit);
      };
    },
    Apply0: function() {
      return applyEvent;
    }
  };
  var altEvent = {
    alt: function(v) {
      return function(v1) {
        return function(tf, k) {
          return apply2(map3(function(v2) {
            return function(v3) {
              return function __do2() {
                v2();
                return v3();
              };
            };
          })(function() {
            return v(tf, k);
          }))(function() {
            return v1(tf, k);
          })();
        };
      };
    },
    Functor0: function() {
      return functorEvent;
    }
  };
  var plusEvent = {
    empty: function(v, v1) {
      return pure2(unit);
    },
    Alt0: function() {
      return altEvent;
    }
  };
  var alternativeEvent = {
    Applicative0: function() {
      return applicativeEvent;
    },
    Plus1: function() {
      return plusEvent;
    }
  };
  var eventIsEvent = {
    keepLatest: keepLatest2,
    sampleOnRight: sampleOnRight2,
    sampleOnLeft,
    fix: fix3,
    Alternative0: function() {
      return alternativeEvent;
    },
    Filterable1: function() {
      return filterableEvent;
    }
  };

  // output/Deku.Attribute/index.js
  var pure3 = /* @__PURE__ */ pure(applicativeEvent);
  var Cb = function(x) {
    return x;
  };
  var Prop$prime = /* @__PURE__ */ function() {
    function Prop$prime2(value0) {
      this.value0 = value0;
    }
    ;
    Prop$prime2.create = function(value0) {
      return new Prop$prime2(value0);
    };
    return Prop$prime2;
  }();
  var Cb$prime = /* @__PURE__ */ function() {
    function Cb$prime2(value0) {
      this.value0 = value0;
    }
    ;
    Cb$prime2.create = function(value0) {
      return new Cb$prime2(value0);
    };
    return Cb$prime2;
  }();
  var Attribute = function(x) {
    return x;
  };
  var unsafeUnAttribute = /* @__PURE__ */ coerce();
  var unsafeAttribute = Attribute;
  var prop$prime = /* @__PURE__ */ function() {
    return Prop$prime.create;
  }();
  var cb$prime = /* @__PURE__ */ function() {
    return Cb$prime.create;
  }();
  var cb = /* @__PURE__ */ function() {
    var $27 = map(functorFn)(map(functorEffect)($$const(true)));
    return function($28) {
      return Cb($27($28));
    };
  }();
  var attr = function(dict) {
    return dict.attr;
  };
  var mapAttr = function(dictFunctor) {
    var map17 = map(dictFunctor);
    return function(dictAttr) {
      var attr13 = attr(dictAttr);
      return function(a2) {
        return function(b2) {
          return map17(function(v) {
            return attr13(a2)(v);
          })(b2);
        };
      };
    };
  };
  var pureAttr = function(dictAttr) {
    var attr13 = attr(dictAttr);
    return function(a2) {
      return function(b2) {
        return pure3(attr13(a2)(b2));
      };
    };
  };

  // output/Bolson.Core/index.js
  var Local = /* @__PURE__ */ function() {
    function Local2(value0) {
      this.value0 = value0;
    }
    ;
    Local2.create = function(value0) {
      return new Local2(value0);
    };
    return Local2;
  }();
  var Global = /* @__PURE__ */ function() {
    function Global2() {
    }
    ;
    Global2.value = new Global2();
    return Global2;
  }();
  var Insert = /* @__PURE__ */ function() {
    function Insert2(value0) {
      this.value0 = value0;
    }
    ;
    Insert2.create = function(value0) {
      return new Insert2(value0);
    };
    return Insert2;
  }();
  var Remove = /* @__PURE__ */ function() {
    function Remove2() {
    }
    ;
    Remove2.value = new Remove2();
    return Remove2;
  }();
  var Logic = /* @__PURE__ */ function() {
    function Logic2(value0) {
      this.value0 = value0;
    }
    ;
    Logic2.create = function(value0) {
      return new Logic2(value0);
    };
    return Logic2;
  }();
  var DynamicChildren$prime = /* @__PURE__ */ function() {
    function DynamicChildren$prime2(value0) {
      this.value0 = value0;
    }
    ;
    DynamicChildren$prime2.create = function(value0) {
      return new DynamicChildren$prime2(value0);
    };
    return DynamicChildren$prime2;
  }();
  var FixedChildren$prime = /* @__PURE__ */ function() {
    function FixedChildren$prime2(value0) {
      this.value0 = value0;
    }
    ;
    FixedChildren$prime2.create = function(value0) {
      return new FixedChildren$prime2(value0);
    };
    return FixedChildren$prime2;
  }();
  var EventfulElement$prime = /* @__PURE__ */ function() {
    function EventfulElement$prime2(value0) {
      this.value0 = value0;
    }
    ;
    EventfulElement$prime2.create = function(value0) {
      return new EventfulElement$prime2(value0);
    };
    return EventfulElement$prime2;
  }();
  var Element$prime = /* @__PURE__ */ function() {
    function Element$prime2(value0) {
      this.value0 = value0;
    }
    ;
    Element$prime2.create = function(value0) {
      return new Element$prime2(value0);
    };
    return Element$prime2;
  }();
  var eqScope = {
    eq: function(x) {
      return function(y) {
        if (x instanceof Local && y instanceof Local) {
          return x.value0 === y.value0;
        }
        ;
        if (x instanceof Global && y instanceof Global) {
          return true;
        }
        ;
        return false;
      };
    }
  };
  var fixed = function(a2) {
    return new FixedChildren$prime(a2);
  };

  // output/Foreign.Object/foreign.js
  function _copyST(m) {
    return function() {
      var r = {};
      for (var k in m) {
        if (hasOwnProperty.call(m, k)) {
          r[k] = m[k];
        }
      }
      return r;
    };
  }
  var empty4 = {};
  function runST(f) {
    return f();
  }
  function _foldM(bind6) {
    return function(f) {
      return function(mz) {
        return function(m) {
          var acc = mz;
          function g2(k2) {
            return function(z) {
              return f(z)(k2)(m[k2]);
            };
          }
          for (var k in m) {
            if (hasOwnProperty.call(m, k)) {
              acc = bind6(acc)(g2(k));
            }
          }
          return acc;
        };
      };
    };
  }
  function toArrayWithKey(f) {
    return function(m) {
      var r = [];
      for (var k in m) {
        if (hasOwnProperty.call(m, k)) {
          r.push(f(k)(m[k]));
        }
      }
      return r;
    };
  }
  var keys2 = Object.keys || toArrayWithKey(function(k) {
    return function() {
      return k;
    };
  });

  // output/Foreign.Object.ST/foreign.js
  function poke2(k) {
    return function(v) {
      return function(m) {
        return function() {
          m[k] = v;
          return m;
        };
      };
    };
  }
  var deleteImpl = function(k) {
    return function(m) {
      return function() {
        delete m[k];
        return m;
      };
    };
  };

  // output/Foreign.Object/index.js
  var foldr4 = /* @__PURE__ */ foldr(foldableArray);
  var values = /* @__PURE__ */ toArrayWithKey(function(v) {
    return function(v1) {
      return v1;
    };
  });
  var thawST = _copyST;
  var mutate = function(f) {
    return function(m) {
      return runST(function __do2() {
        var s2 = thawST(m)();
        f(s2)();
        return s2;
      });
    };
  };
  var insert6 = function(k) {
    return function(v) {
      return mutate(poke2(k)(v));
    };
  };
  var fold3 = /* @__PURE__ */ _foldM(applyFlipped);
  var foldMap3 = function(dictMonoid) {
    var append14 = append(dictMonoid.Semigroup0());
    var mempty6 = mempty(dictMonoid);
    return function(f) {
      return fold3(function(acc) {
        return function(k) {
          return function(v) {
            return append14(acc)(f(k)(v));
          };
        };
      })(mempty6);
    };
  };
  var foldableObject = {
    foldl: function(f) {
      return fold3(function(z) {
        return function(v) {
          return f(z);
        };
      });
    },
    foldr: function(f) {
      return function(z) {
        return function(m) {
          return foldr4(f)(z)(values(m));
        };
      };
    },
    foldMap: function(dictMonoid) {
      var foldMap12 = foldMap3(dictMonoid);
      return function(f) {
        return foldMap12($$const(f));
      };
    }
  };
  var $$delete5 = function(k) {
    return mutate(deleteImpl(k));
  };

  // output/Bolson.Control/index.js
  var keepLatest3 = /* @__PURE__ */ keepLatest(eventIsEvent);
  var map4 = /* @__PURE__ */ map(functorEvent);
  var bind2 = /* @__PURE__ */ bind(bindST);
  var pure1 = /* @__PURE__ */ pure(applicativeST);
  var map22 = /* @__PURE__ */ map(functorST);
  var for_3 = /* @__PURE__ */ for_(applicativeST);
  var for_12 = /* @__PURE__ */ for_3(foldableMaybe);
  var $$void4 = /* @__PURE__ */ $$void(functorST);
  var for_23 = /* @__PURE__ */ for_3(foldableArray);
  var oneOfMap2 = /* @__PURE__ */ oneOfMap(foldableArray)(plusEvent);
  var traverse_2 = /* @__PURE__ */ traverse_(applicativeST)(foldableArray);
  var append4 = /* @__PURE__ */ append(semigroupArray);
  var foldl3 = /* @__PURE__ */ foldl(foldableObject);
  var applySecond2 = /* @__PURE__ */ applySecond(applyST);
  var Begin = /* @__PURE__ */ function() {
    function Begin3() {
    }
    ;
    Begin3.value = new Begin3();
    return Begin3;
  }();
  var Middle = /* @__PURE__ */ function() {
    function Middle2() {
    }
    ;
    Middle2.value = new Middle2();
    return Middle2;
  }();
  var End = /* @__PURE__ */ function() {
    function End3() {
    }
    ;
    End3.value = new End3();
    return End3;
  }();
  var flatten = function(v) {
    return function(psr) {
      return function(interpreter) {
        var element = function(v1) {
          return v1(psr)(interpreter);
        };
        return function(v1) {
          if (v1 instanceof FixedChildren$prime) {
            return oneOfMap2(flatten(v)(psr)(interpreter))(v1.value0);
          }
          ;
          if (v1 instanceof EventfulElement$prime) {
            return keepLatest3(map4(flatten(v)(psr)(interpreter))(v1.value0));
          }
          ;
          if (v1 instanceof Element$prime) {
            return element(v.toElt(v1.value0));
          }
          ;
          if (v1 instanceof DynamicChildren$prime) {
            return makeLemmingEventO(function(v2, v3) {
              var cancelInner = newSTRef(empty4)();
              var cancelOuter = v2(v1.value0, function(inner) {
                var myUnsubId = v.ids(interpreter)();
                var myUnsub = newSTRef(pure1(unit))();
                var eltsUnsubId = v.ids(interpreter)();
                var eltsUnsub = newSTRef(pure1(unit))();
                var myIds = newSTRef([])();
                var myImmediateCancellation = newSTRef(pure1(unit))();
                var myScope = map22(Local.create)(v.ids(interpreter))();
                var stageRef = newSTRef(Begin.value)();
                var c0 = v2(inner, function(kid$prime) {
                  var stage = read2(stageRef)();
                  if (kid$prime instanceof Logic && stage instanceof Middle) {
                    var curId = read2(myIds)();
                    return traverse_2(function(i2) {
                      return function() {
                        return v3(v.doLogic(kid$prime.value0)(interpreter)(i2));
                      };
                    })(curId)();
                  }
                  ;
                  if (kid$prime instanceof Remove && stage instanceof Middle) {
                    $$void4(write2(End.value)(stageRef))();
                    var mic = function __do2() {
                      var idRef = read2(myIds)();
                      for_23(idRef)(function(old) {
                        return for_12(psr.parent)(function(pnt) {
                          return function() {
                            return v3(v.disconnectElement(interpreter)({
                              id: old,
                              parent: pnt,
                              scope: myScope
                            }));
                          };
                        });
                      })();
                      var myu = read2(myUnsub)();
                      myu();
                      var eltu = read2(eltsUnsub)();
                      eltu();
                      $$void4(modify2($$delete5(myUnsubId))(cancelInner))();
                      return $$void4(modify2($$delete5(eltsUnsubId))(cancelInner))();
                    };
                    $$void4(write2(mic)(myImmediateCancellation))();
                    return mic();
                  }
                  ;
                  if (kid$prime instanceof Insert && stage instanceof Begin) {
                    $$void4(write2(Middle.value)(stageRef))();
                    var c1 = v2(flatten(v)(function() {
                      var $125 = {};
                      for (var $126 in psr) {
                        if ({}.hasOwnProperty.call(psr, $126)) {
                          $125[$126] = psr[$126];
                        }
                        ;
                      }
                      ;
                      $125.scope = myScope;
                      $125.raiseId = function(id2) {
                        return $$void4(modify2(append4([id2]))(myIds));
                      };
                      return $125;
                    }())(interpreter)(kid$prime.value0), v3);
                    $$void4(modify2(insert6(eltsUnsubId)(c1))(cancelInner))();
                    return $$void4(write2(c1)(eltsUnsub))();
                  }
                  ;
                  return unit;
                });
                $$void4(write2(c0)(myUnsub))();
                $$void4(modify2(insert6(myUnsubId)(c0))(cancelInner))();
                var mican = read2(myImmediateCancellation)();
                return mican();
              });
              return function __do2() {
                bind2(read2(cancelInner))(foldl3(applySecond2)(pure1(unit)))();
                return cancelOuter();
              };
            });
          }
          ;
          throw new Error("Failed pattern match at Bolson.Control (line 544, column 17 - line 630, column 20): " + [v1.constructor.name]);
        };
      };
    };
  };

  // output/Data.Profunctor/index.js
  var identity8 = /* @__PURE__ */ identity(categoryFn);
  var profunctorFn = {
    dimap: function(a2b) {
      return function(c2d) {
        return function(b2c) {
          return function($18) {
            return c2d(b2c(a2b($18)));
          };
        };
      };
    }
  };
  var dimap = function(dict) {
    return dict.dimap;
  };
  var lcmap = function(dictProfunctor) {
    var dimap1 = dimap(dictProfunctor);
    return function(a2b) {
      return dimap1(a2b)(identity8);
    };
  };

  // output/Control.Monad.State.Class/index.js
  var state = function(dict) {
    return dict.state;
  };

  // output/Deku.Core/index.js
  var lcmap2 = /* @__PURE__ */ lcmap(profunctorFn);
  var map5 = /* @__PURE__ */ map(functorEvent);
  var unsafeSetPos$prime = function(i2) {
    return function(v) {
      var f = function(v1) {
        if (v1 instanceof Element$prime) {
          return new Element$prime(lcmap2(function(v2) {
            return {
              pos: i2,
              dynFamily: v2.dynFamily,
              ez: v2.ez,
              parent: v2.parent,
              raiseId: v2.raiseId,
              scope: v2.scope
            };
          })(v1.value0));
        }
        ;
        if (v1 instanceof EventfulElement$prime) {
          return new EventfulElement$prime(map5(f)(v1.value0));
        }
        ;
        return v;
      };
      return f(v);
    };
  };
  var unsafeSetPos = function($77) {
    return unsafeSetPos$prime(Just.create($77));
  };

  // output/Deku.Control/index.js
  var map6 = /* @__PURE__ */ map(functorEvent);
  var oneOf2 = /* @__PURE__ */ oneOf(foldableArray)(plusEvent);
  var pure4 = /* @__PURE__ */ pure(applicativeEvent);
  var empty5 = /* @__PURE__ */ empty(plusEvent);
  var pure12 = /* @__PURE__ */ pure(applicativeST);
  var unwrap2 = /* @__PURE__ */ unwrap();
  var eq13 = /* @__PURE__ */ eq(eqScope);
  var alt2 = /* @__PURE__ */ alt(altEvent);
  var append5 = /* @__PURE__ */ append(semigroupArray);
  var unsafeSetText = function(v) {
    return function(id2) {
      return function(txt) {
        return map6(function($132) {
          return v.setText(function(v1) {
            return {
              id: id2,
              text: v1
            };
          }($132));
        })(txt);
      };
    };
  };
  var unsafeSetAttribute = function(v) {
    return function(id2) {
      return function(atts) {
        return map6(function($133) {
          return function(v1) {
            if (v1.value instanceof Prop$prime) {
              return v.setProp({
                id: id2,
                key: v1.key,
                value: v1.value.value0
              });
            }
            ;
            if (v1.value instanceof Cb$prime) {
              return v.setCb({
                id: id2,
                key: v1.key,
                value: v1.value.value0
              });
            }
            ;
            throw new Error("Failed pattern match at Deku.Control (line 68, column 26 - line 70, column 45): " + [v1.value.constructor.name]);
          }(unsafeUnAttribute($133));
        })(atts);
      };
    };
  };
  var text = function(txt) {
    var go2 = function(v) {
      return function(v1) {
        return makeLemmingEventO(function(v2, k) {
          var me = v1.ids();
          v.raiseId(me)();
          var unsub = v2(oneOf2([pure4(v1.makeText({
            id: me,
            parent: v.parent,
            pos: v.pos,
            scope: v.scope,
            dynFamily: v.dynFamily
          })), unsafeSetText(v1)(me)(txt), maybe(empty5)(function(p2) {
            return pure4(v1.attributeParent({
              id: me,
              parent: p2,
              pos: v.pos,
              dynFamily: v.dynFamily,
              ez: v.ez
            }));
          })(v.parent)]), k);
          return function __do2() {
            k(v1.deleteFromCache({
              id: me
            }));
            return unsub();
          };
        });
      };
    };
    return new Element$prime(go2);
  };
  var text_ = function(txt) {
    return text(pure4(txt));
  };
  var portalFlatten = function() {
    return {
      doLogic: function(pos) {
        return function(v) {
          return function(id2) {
            return v.sendToPos({
              id: id2,
              pos
            });
          };
        };
      },
      ids: function($136) {
        return function(v) {
          return v.ids;
        }(unwrap2($136));
      },
      disconnectElement: function(v) {
        return function(v1) {
          return v.disconnectElement({
            id: v1.id,
            scope: v1.scope,
            parent: v1.parent,
            scopeEq: eq13
          });
        };
      },
      toElt: function(v) {
        return v;
      }
    };
  };
  var portalFlatten1 = /* @__PURE__ */ portalFlatten();
  var __internalDekuFlatten = function(a2) {
    return function(b2) {
      return function(v) {
        return flatten(portalFlatten1)(a2)(b2)(v);
      };
    };
  };
  var deku = function(root) {
    return function(children) {
      return function(v) {
        return makeLemmingEventO(function(v1, k) {
          return v1(alt2(pure4(v.makeRoot({
            id: "deku-root",
            root
          })))(__internalDekuFlatten({
            parent: new Just("deku-root"),
            scope: new Local("rootScope"),
            raiseId: function(v2) {
              return pure12(unit);
            },
            ez: true,
            pos: Nothing.value,
            dynFamily: Nothing.value
          })(v)(children)), k);
        });
      };
    };
  };
  var elementify = function(tag) {
    return function(atts) {
      return function(children) {
        var go2 = function(v) {
          return function(v1) {
            return makeLemmingEventO(function(v2, k) {
              var me = v1.ids();
              v.raiseId(me)();
              var unsub = v2(alt2(oneOf2(append5([pure4(v1.makeElement({
                id: me,
                parent: v.parent,
                scope: v.scope,
                tag,
                pos: v.pos,
                dynFamily: v.dynFamily
              })), unsafeSetAttribute(v1)(me)(atts)])(maybe([])(function(p2) {
                return [pure4(v1.attributeParent({
                  id: me,
                  parent: p2,
                  pos: v.pos,
                  dynFamily: v.dynFamily,
                  ez: v.ez
                }))];
              })(v.parent))))(__internalDekuFlatten({
                parent: new Just(me),
                scope: v.scope,
                ez: true,
                raiseId: function(v3) {
                  return pure12(unit);
                },
                pos: Nothing.value,
                dynFamily: Nothing.value
              })(v1)(children)), k);
              return function __do2() {
                k(v1.deleteFromCache({
                  id: me
                }));
                return unsub();
              };
            });
          };
        };
        return go2;
      };
    };
  };

  // output/Deku.DOM.Attr.D/index.js
  var D = /* @__PURE__ */ function() {
    function D2() {
    }
    ;
    D2.value = new D2();
    return D2;
  }();
  var attrPath_DString = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "d",
          value: prop$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Attr.Fill/index.js
  var Fill = /* @__PURE__ */ function() {
    function Fill2() {
    }
    ;
    Fill2.value = new Fill2();
    return Fill2;
  }();
  var attrSvg_FillString = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "fill",
          value: prop$prime(value12)
        });
      };
    }
  };
  var attrRect_FillString = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "fill",
          value: prop$prime(value12)
        });
      };
    }
  };
  var attrG_FillString = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "fill",
          value: prop$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Attr.FillOpacity/index.js
  var FillOpacity = /* @__PURE__ */ function() {
    function FillOpacity2() {
    }
    ;
    FillOpacity2.value = new FillOpacity2();
    return FillOpacity2;
  }();
  var attrPath_FillOpacityStrin = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "fill-opacity",
          value: prop$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Attr.Filter/index.js
  var Filter = /* @__PURE__ */ function() {
    function Filter2() {
    }
    ;
    Filter2.value = new Filter2();
    return Filter2;
  }();
  var attrPath_FilterString = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "filter",
          value: prop$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Attr.GradientUnits/index.js
  var GradientUnits = /* @__PURE__ */ function() {
    function GradientUnits2() {
    }
    ;
    GradientUnits2.value = new GradientUnits2();
    return GradientUnits2;
  }();
  var attrLinearGradient_Gradie = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "gradientUnits",
          value: prop$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Attr.Height/index.js
  var Height = /* @__PURE__ */ function() {
    function Height2() {
    }
    ;
    Height2.value = new Height2();
    return Height2;
  }();
  var attrSvg_HeightString = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "height",
          value: prop$prime(value12)
        });
      };
    }
  };
  var attrRect_HeightString = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "height",
          value: prop$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Attr.Id/index.js
  var Id = /* @__PURE__ */ function() {
    function Id2() {
    }
    ;
    Id2.value = new Id2();
    return Id2;
  }();
  var attrLinearGradient_IdStri = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "id",
          value: prop$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Attr.Max/index.js
  var Max2 = /* @__PURE__ */ function() {
    function Max4() {
    }
    ;
    Max4.value = new Max4();
    return Max4;
  }();
  var attrInput_MaxString = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "max",
          value: prop$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Attr.Min/index.js
  var Min2 = /* @__PURE__ */ function() {
    function Min3() {
    }
    ;
    Min3.value = new Min3();
    return Min3;
  }();
  var attrInput_MinString = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "min",
          value: prop$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Attr.Offset/index.js
  var Offset = /* @__PURE__ */ function() {
    function Offset2() {
    }
    ;
    Offset2.value = new Offset2();
    return Offset2;
  }();
  var attrStop_OffsetString = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "offset",
          value: prop$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Attr.OnClick/index.js
  var voidLeft2 = /* @__PURE__ */ voidLeft(functorEffect);
  var OnClick = /* @__PURE__ */ function() {
    function OnClick2() {
    }
    ;
    OnClick2.value = new OnClick2();
    return OnClick2;
  }();
  var attrOnClickEffectUnit = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "click",
          value: cb$prime($$const(voidLeft2(value12)(true)))
        });
      };
    }
  };

  // output/Deku.DOM.Attr.Step/index.js
  var Step = /* @__PURE__ */ function() {
    function Step2() {
    }
    ;
    Step2.value = new Step2();
    return Step2;
  }();
  var attrInput_StepString = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "step",
          value: prop$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Attr.StopColor/index.js
  var StopColor = /* @__PURE__ */ function() {
    function StopColor2() {
    }
    ;
    StopColor2.value = new StopColor2();
    return StopColor2;
  }();
  var attrStop_StopColorString = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "stop-color",
          value: prop$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Attr.StopOpacity/index.js
  var StopOpacity = /* @__PURE__ */ function() {
    function StopOpacity2() {
    }
    ;
    StopOpacity2.value = new StopOpacity2();
    return StopOpacity2;
  }();
  var attrStop_StopOpacityStrin = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "stop-opacity",
          value: prop$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Attr.Stroke/index.js
  var Stroke = /* @__PURE__ */ function() {
    function Stroke2() {
    }
    ;
    Stroke2.value = new Stroke2();
    return Stroke2;
  }();
  var attrPath_StrokeString = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "stroke",
          value: prop$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Attr.StrokeLinecap/index.js
  var StrokeLinecap = /* @__PURE__ */ function() {
    function StrokeLinecap2() {
    }
    ;
    StrokeLinecap2.value = new StrokeLinecap2();
    return StrokeLinecap2;
  }();
  var attrG_StrokeLinecapString = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "stroke-linecap",
          value: prop$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Attr.StrokeLinejoin/index.js
  var StrokeLinejoin = /* @__PURE__ */ function() {
    function StrokeLinejoin2() {
    }
    ;
    StrokeLinejoin2.value = new StrokeLinejoin2();
    return StrokeLinejoin2;
  }();
  var attrG_StrokeLinejoinStrin = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "stroke-linejoin",
          value: prop$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Attr.StrokeOpacity/index.js
  var StrokeOpacity = /* @__PURE__ */ function() {
    function StrokeOpacity2() {
    }
    ;
    StrokeOpacity2.value = new StrokeOpacity2();
    return StrokeOpacity2;
  }();
  var attrG_StrokeOpacityString = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "stroke-opacity",
          value: prop$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Attr.StrokeWidth/index.js
  var StrokeWidth = /* @__PURE__ */ function() {
    function StrokeWidth2() {
    }
    ;
    StrokeWidth2.value = new StrokeWidth2();
    return StrokeWidth2;
  }();
  var attrPath_StrokeWidthStrin = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "stroke-width",
          value: prop$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Attr.Style/index.js
  var Style = /* @__PURE__ */ function() {
    function Style2() {
    }
    ;
    Style2.value = new Style2();
    return Style2;
  }();
  var attrSvg_StyleString = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "style",
          value: prop$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Attr.Transform/index.js
  var Transform = /* @__PURE__ */ function() {
    function Transform2() {
    }
    ;
    Transform2.value = new Transform2();
    return Transform2;
  }();
  var attrG_TransformString = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "transform",
          value: prop$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Attr.Value/index.js
  var Value = /* @__PURE__ */ function() {
    function Value2() {
    }
    ;
    Value2.value = new Value2();
    return Value2;
  }();
  var attrInput_ValueString = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "value",
          value: prop$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Attr.ViewBox/index.js
  var ViewBox = /* @__PURE__ */ function() {
    function ViewBox2() {
    }
    ;
    ViewBox2.value = new ViewBox2();
    return ViewBox2;
  }();
  var attrSvg_ViewBoxString = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "viewBox",
          value: prop$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Attr.Width/index.js
  var Width = /* @__PURE__ */ function() {
    function Width2() {
    }
    ;
    Width2.value = new Width2();
    return Width2;
  }();
  var attrSvg_WidthString = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "width",
          value: prop$prime(value12)
        });
      };
    }
  };
  var attrRect_WidthString = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "width",
          value: prop$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Attr.X/index.js
  var X = /* @__PURE__ */ function() {
    function X3() {
    }
    ;
    X3.value = new X3();
    return X3;
  }();
  var attrRect_XString = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "x",
          value: prop$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Attr.X1/index.js
  var X1 = /* @__PURE__ */ function() {
    function X12() {
    }
    ;
    X12.value = new X12();
    return X12;
  }();
  var attrLinearGradient_X1Stri = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "x1",
          value: prop$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Attr.X2/index.js
  var X2 = /* @__PURE__ */ function() {
    function X22() {
    }
    ;
    X22.value = new X22();
    return X22;
  }();
  var attrLinearGradient_X2Stri = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "x2",
          value: prop$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Attr.Xtype/index.js
  var Xtype = /* @__PURE__ */ function() {
    function Xtype2() {
    }
    ;
    Xtype2.value = new Xtype2();
    return Xtype2;
  }();
  var attrInput_XtypeString = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "type",
          value: prop$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Attr.Y/index.js
  var Y = /* @__PURE__ */ function() {
    function Y3() {
    }
    ;
    Y3.value = new Y3();
    return Y3;
  }();
  var attrRect_YString = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "y",
          value: prop$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Attr.Y1/index.js
  var Y1 = /* @__PURE__ */ function() {
    function Y12() {
    }
    ;
    Y12.value = new Y12();
    return Y12;
  }();
  var attrLinearGradient_Y1Stri = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "y1",
          value: prop$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Attr.Y2/index.js
  var Y2 = /* @__PURE__ */ function() {
    function Y22() {
    }
    ;
    Y22.value = new Y22();
    return Y22;
  }();
  var attrLinearGradient_Y2Stri = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "y2",
          value: prop$prime(value12)
        });
      };
    }
  };

  // output/Deku.DOM.Elt.Br/index.js
  var coerce3 = /* @__PURE__ */ coerce();
  var br = function(attributes) {
    return function(kids) {
      return new Element$prime(elementify("br")(attributes)(coerce3(fixed(coerce3(mapWithIndex(unsafeSetPos)(kids))))));
    };
  };
  var br_ = /* @__PURE__ */ br(/* @__PURE__ */ empty(plusEvent));

  // output/Deku.DOM.Elt.Defs/index.js
  var coerce4 = /* @__PURE__ */ coerce();
  var defs = function(attributes) {
    return function(kids) {
      return new Element$prime(elementify("defs")(attributes)(coerce4(fixed(coerce4(mapWithIndex(unsafeSetPos)(kids))))));
    };
  };
  var defs_ = /* @__PURE__ */ defs(/* @__PURE__ */ empty(plusEvent));

  // output/Deku.DOM.Elt.Div/index.js
  var coerce5 = /* @__PURE__ */ coerce();
  var div2 = function(attributes) {
    return function(kids) {
      return new Element$prime(elementify("div")(attributes)(coerce5(fixed(coerce5(mapWithIndex(unsafeSetPos)(kids))))));
    };
  };
  var div_ = /* @__PURE__ */ div2(/* @__PURE__ */ empty(plusEvent));

  // output/Deku.DOM.Elt.G/index.js
  var coerce6 = /* @__PURE__ */ coerce();
  var g = function(attributes) {
    return function(kids) {
      return new Element$prime(elementify("g")(attributes)(coerce6(fixed(coerce6(mapWithIndex(unsafeSetPos)(kids))))));
    };
  };

  // output/Deku.DOM.Elt.H1/index.js
  var coerce7 = /* @__PURE__ */ coerce();
  var h1 = function(attributes) {
    return function(kids) {
      return new Element$prime(elementify("h1")(attributes)(coerce7(fixed(coerce7(mapWithIndex(unsafeSetPos)(kids))))));
    };
  };
  var h1_ = /* @__PURE__ */ h1(/* @__PURE__ */ empty(plusEvent));

  // output/Deku.DOM.Elt.Input/index.js
  var coerce8 = /* @__PURE__ */ coerce();
  var input = function(attributes) {
    return function(kids) {
      return new Element$prime(elementify("input")(attributes)(coerce8(fixed(coerce8(mapWithIndex(unsafeSetPos)(kids))))));
    };
  };

  // output/Deku.DOM.Elt.LinearGradient/index.js
  var coerce9 = /* @__PURE__ */ coerce();
  var linearGradient = function(attributes) {
    return function(kids) {
      return new Element$prime(elementify("linearGradient")(attributes)(coerce9(fixed(coerce9(mapWithIndex(unsafeSetPos)(kids))))));
    };
  };

  // output/Deku.DOM.Elt.P/index.js
  var coerce10 = /* @__PURE__ */ coerce();
  var p = function(attributes) {
    return function(kids) {
      return new Element$prime(elementify("p")(attributes)(coerce10(fixed(coerce10(mapWithIndex(unsafeSetPos)(kids))))));
    };
  };
  var p_ = /* @__PURE__ */ p(/* @__PURE__ */ empty(plusEvent));

  // output/Deku.DOM.Elt.Path/index.js
  var coerce11 = /* @__PURE__ */ coerce();
  var path = function(attributes) {
    return function(kids) {
      return new Element$prime(elementify("path")(attributes)(coerce11(fixed(coerce11(mapWithIndex(unsafeSetPos)(kids))))));
    };
  };

  // output/Deku.DOM.Elt.Rect/index.js
  var coerce12 = /* @__PURE__ */ coerce();
  var rect = function(attributes) {
    return function(kids) {
      return new Element$prime(elementify("rect")(attributes)(coerce12(fixed(coerce12(mapWithIndex(unsafeSetPos)(kids))))));
    };
  };

  // output/Deku.DOM.Elt.Stop/index.js
  var coerce13 = /* @__PURE__ */ coerce();
  var stop = function(attributes) {
    return function(kids) {
      return new Element$prime(elementify("stop")(attributes)(coerce13(fixed(coerce13(mapWithIndex(unsafeSetPos)(kids))))));
    };
  };

  // output/Deku.DOM.Elt.Svg/index.js
  var coerce14 = /* @__PURE__ */ coerce();
  var svg = function(attributes) {
    return function(kids) {
      return new Element$prime(elementify("svg")(attributes)(coerce14(fixed(coerce14(mapWithIndex(unsafeSetPos)(kids))))));
    };
  };

  // output/Deku.DOM.Attr.OnInput/index.js
  var OnInput = /* @__PURE__ */ function() {
    function OnInput2() {
    }
    ;
    OnInput2.value = new OnInput2();
    return OnInput2;
  }();
  var attrOnInputCb = {
    attr: function(v) {
      return function(value12) {
        return unsafeAttribute({
          key: "input",
          value: cb$prime(value12)
        });
      };
    }
  };

  // output/Effect.Aff/foreign.js
  var Aff = function() {
    var EMPTY = {};
    var PURE = "Pure";
    var THROW = "Throw";
    var CATCH = "Catch";
    var SYNC = "Sync";
    var ASYNC = "Async";
    var BIND = "Bind";
    var BRACKET = "Bracket";
    var FORK = "Fork";
    var SEQ = "Sequential";
    var MAP = "Map";
    var APPLY = "Apply";
    var ALT = "Alt";
    var CONS = "Cons";
    var RESUME = "Resume";
    var RELEASE = "Release";
    var FINALIZER = "Finalizer";
    var FINALIZED = "Finalized";
    var FORKED = "Forked";
    var FIBER = "Fiber";
    var THUNK = "Thunk";
    function Aff2(tag, _12, _2, _3) {
      this.tag = tag;
      this._1 = _12;
      this._2 = _2;
      this._3 = _3;
    }
    function AffCtr(tag) {
      var fn = function(_12, _2, _3) {
        return new Aff2(tag, _12, _2, _3);
      };
      fn.tag = tag;
      return fn;
    }
    function nonCanceler2(error3) {
      return new Aff2(PURE, void 0);
    }
    function runEff(eff) {
      try {
        eff();
      } catch (error3) {
        setTimeout(function() {
          throw error3;
        }, 0);
      }
    }
    function runSync(left2, right2, eff) {
      try {
        return right2(eff());
      } catch (error3) {
        return left2(error3);
      }
    }
    function runAsync(left2, eff, k) {
      try {
        return eff(k)();
      } catch (error3) {
        k(left2(error3))();
        return nonCanceler2;
      }
    }
    var Scheduler = function() {
      var limit = 1024;
      var size5 = 0;
      var ix = 0;
      var queue = new Array(limit);
      var draining = false;
      function drain() {
        var thunk;
        draining = true;
        while (size5 !== 0) {
          size5--;
          thunk = queue[ix];
          queue[ix] = void 0;
          ix = (ix + 1) % limit;
          thunk();
        }
        draining = false;
      }
      return {
        isDraining: function() {
          return draining;
        },
        enqueue: function(cb2) {
          var i2, tmp;
          if (size5 === limit) {
            tmp = draining;
            drain();
            draining = tmp;
          }
          queue[(ix + size5) % limit] = cb2;
          size5++;
          if (!draining) {
            drain();
          }
        }
      };
    }();
    function Supervisor(util) {
      var fibers = {};
      var fiberId = 0;
      var count2 = 0;
      return {
        register: function(fiber) {
          var fid = fiberId++;
          fiber.onComplete({
            rethrow: true,
            handler: function(result) {
              return function() {
                count2--;
                delete fibers[fid];
              };
            }
          })();
          fibers[fid] = fiber;
          count2++;
        },
        isEmpty: function() {
          return count2 === 0;
        },
        killAll: function(killError, cb2) {
          return function() {
            if (count2 === 0) {
              return cb2();
            }
            var killCount = 0;
            var kills = {};
            function kill(fid) {
              kills[fid] = fibers[fid].kill(killError, function(result) {
                return function() {
                  delete kills[fid];
                  killCount--;
                  if (util.isLeft(result) && util.fromLeft(result)) {
                    setTimeout(function() {
                      throw util.fromLeft(result);
                    }, 0);
                  }
                  if (killCount === 0) {
                    cb2();
                  }
                };
              })();
            }
            for (var k in fibers) {
              if (fibers.hasOwnProperty(k)) {
                killCount++;
                kill(k);
              }
            }
            fibers = {};
            fiberId = 0;
            count2 = 0;
            return function(error3) {
              return new Aff2(SYNC, function() {
                for (var k2 in kills) {
                  if (kills.hasOwnProperty(k2)) {
                    kills[k2]();
                  }
                }
              });
            };
          };
        }
      };
    }
    var SUSPENDED = 0;
    var CONTINUE = 1;
    var STEP_BIND = 2;
    var STEP_RESULT = 3;
    var PENDING = 4;
    var RETURN = 5;
    var COMPLETED = 6;
    function Fiber(util, supervisor, aff) {
      var runTick = 0;
      var status = SUSPENDED;
      var step3 = aff;
      var fail2 = null;
      var interrupt = null;
      var bhead = null;
      var btail = null;
      var attempts = null;
      var bracketCount = 0;
      var joinId = 0;
      var joins = null;
      var rethrow = true;
      function run3(localRunTick) {
        var tmp, result, attempt;
        while (true) {
          tmp = null;
          result = null;
          attempt = null;
          switch (status) {
            case STEP_BIND:
              status = CONTINUE;
              try {
                step3 = bhead(step3);
                if (btail === null) {
                  bhead = null;
                } else {
                  bhead = btail._1;
                  btail = btail._2;
                }
              } catch (e) {
                status = RETURN;
                fail2 = util.left(e);
                step3 = null;
              }
              break;
            case STEP_RESULT:
              if (util.isLeft(step3)) {
                status = RETURN;
                fail2 = step3;
                step3 = null;
              } else if (bhead === null) {
                status = RETURN;
              } else {
                status = STEP_BIND;
                step3 = util.fromRight(step3);
              }
              break;
            case CONTINUE:
              switch (step3.tag) {
                case BIND:
                  if (bhead) {
                    btail = new Aff2(CONS, bhead, btail);
                  }
                  bhead = step3._2;
                  status = CONTINUE;
                  step3 = step3._1;
                  break;
                case PURE:
                  if (bhead === null) {
                    status = RETURN;
                    step3 = util.right(step3._1);
                  } else {
                    status = STEP_BIND;
                    step3 = step3._1;
                  }
                  break;
                case SYNC:
                  status = STEP_RESULT;
                  step3 = runSync(util.left, util.right, step3._1);
                  break;
                case ASYNC:
                  status = PENDING;
                  step3 = runAsync(util.left, step3._1, function(result2) {
                    return function() {
                      if (runTick !== localRunTick) {
                        return;
                      }
                      runTick++;
                      Scheduler.enqueue(function() {
                        if (runTick !== localRunTick + 1) {
                          return;
                        }
                        status = STEP_RESULT;
                        step3 = result2;
                        run3(runTick);
                      });
                    };
                  });
                  return;
                case THROW:
                  status = RETURN;
                  fail2 = util.left(step3._1);
                  step3 = null;
                  break;
                case CATCH:
                  if (bhead === null) {
                    attempts = new Aff2(CONS, step3, attempts, interrupt);
                  } else {
                    attempts = new Aff2(CONS, step3, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                  }
                  bhead = null;
                  btail = null;
                  status = CONTINUE;
                  step3 = step3._1;
                  break;
                case BRACKET:
                  bracketCount++;
                  if (bhead === null) {
                    attempts = new Aff2(CONS, step3, attempts, interrupt);
                  } else {
                    attempts = new Aff2(CONS, step3, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                  }
                  bhead = null;
                  btail = null;
                  status = CONTINUE;
                  step3 = step3._1;
                  break;
                case FORK:
                  status = STEP_RESULT;
                  tmp = Fiber(util, supervisor, step3._2);
                  if (supervisor) {
                    supervisor.register(tmp);
                  }
                  if (step3._1) {
                    tmp.run();
                  }
                  step3 = util.right(tmp);
                  break;
                case SEQ:
                  status = CONTINUE;
                  step3 = sequential2(util, supervisor, step3._1);
                  break;
              }
              break;
            case RETURN:
              bhead = null;
              btail = null;
              if (attempts === null) {
                status = COMPLETED;
                step3 = interrupt || fail2 || step3;
              } else {
                tmp = attempts._3;
                attempt = attempts._1;
                attempts = attempts._2;
                switch (attempt.tag) {
                  case CATCH:
                    if (interrupt && interrupt !== tmp && bracketCount === 0) {
                      status = RETURN;
                    } else if (fail2) {
                      status = CONTINUE;
                      step3 = attempt._2(util.fromLeft(fail2));
                      fail2 = null;
                    }
                    break;
                  case RESUME:
                    if (interrupt && interrupt !== tmp && bracketCount === 0 || fail2) {
                      status = RETURN;
                    } else {
                      bhead = attempt._1;
                      btail = attempt._2;
                      status = STEP_BIND;
                      step3 = util.fromRight(step3);
                    }
                    break;
                  case BRACKET:
                    bracketCount--;
                    if (fail2 === null) {
                      result = util.fromRight(step3);
                      attempts = new Aff2(CONS, new Aff2(RELEASE, attempt._2, result), attempts, tmp);
                      if (interrupt === tmp || bracketCount > 0) {
                        status = CONTINUE;
                        step3 = attempt._3(result);
                      }
                    }
                    break;
                  case RELEASE:
                    attempts = new Aff2(CONS, new Aff2(FINALIZED, step3, fail2), attempts, interrupt);
                    status = CONTINUE;
                    if (interrupt && interrupt !== tmp && bracketCount === 0) {
                      step3 = attempt._1.killed(util.fromLeft(interrupt))(attempt._2);
                    } else if (fail2) {
                      step3 = attempt._1.failed(util.fromLeft(fail2))(attempt._2);
                    } else {
                      step3 = attempt._1.completed(util.fromRight(step3))(attempt._2);
                    }
                    fail2 = null;
                    bracketCount++;
                    break;
                  case FINALIZER:
                    bracketCount++;
                    attempts = new Aff2(CONS, new Aff2(FINALIZED, step3, fail2), attempts, interrupt);
                    status = CONTINUE;
                    step3 = attempt._1;
                    break;
                  case FINALIZED:
                    bracketCount--;
                    status = RETURN;
                    step3 = attempt._1;
                    fail2 = attempt._2;
                    break;
                }
              }
              break;
            case COMPLETED:
              for (var k in joins) {
                if (joins.hasOwnProperty(k)) {
                  rethrow = rethrow && joins[k].rethrow;
                  runEff(joins[k].handler(step3));
                }
              }
              joins = null;
              if (interrupt && fail2) {
                setTimeout(function() {
                  throw util.fromLeft(fail2);
                }, 0);
              } else if (util.isLeft(step3) && rethrow) {
                setTimeout(function() {
                  if (rethrow) {
                    throw util.fromLeft(step3);
                  }
                }, 0);
              }
              return;
            case SUSPENDED:
              status = CONTINUE;
              break;
            case PENDING:
              return;
          }
        }
      }
      function onComplete(join4) {
        return function() {
          if (status === COMPLETED) {
            rethrow = rethrow && join4.rethrow;
            join4.handler(step3)();
            return function() {
            };
          }
          var jid = joinId++;
          joins = joins || {};
          joins[jid] = join4;
          return function() {
            if (joins !== null) {
              delete joins[jid];
            }
          };
        };
      }
      function kill(error3, cb2) {
        return function() {
          if (status === COMPLETED) {
            cb2(util.right(void 0))();
            return function() {
            };
          }
          var canceler = onComplete({
            rethrow: false,
            handler: function() {
              return cb2(util.right(void 0));
            }
          })();
          switch (status) {
            case SUSPENDED:
              interrupt = util.left(error3);
              status = COMPLETED;
              step3 = interrupt;
              run3(runTick);
              break;
            case PENDING:
              if (interrupt === null) {
                interrupt = util.left(error3);
              }
              if (bracketCount === 0) {
                if (status === PENDING) {
                  attempts = new Aff2(CONS, new Aff2(FINALIZER, step3(error3)), attempts, interrupt);
                }
                status = RETURN;
                step3 = null;
                fail2 = null;
                run3(++runTick);
              }
              break;
            default:
              if (interrupt === null) {
                interrupt = util.left(error3);
              }
              if (bracketCount === 0) {
                status = RETURN;
                step3 = null;
                fail2 = null;
              }
          }
          return canceler;
        };
      }
      function join3(cb2) {
        return function() {
          var canceler = onComplete({
            rethrow: false,
            handler: cb2
          })();
          if (status === SUSPENDED) {
            run3(runTick);
          }
          return canceler;
        };
      }
      return {
        kill,
        join: join3,
        onComplete,
        isSuspended: function() {
          return status === SUSPENDED;
        },
        run: function() {
          if (status === SUSPENDED) {
            if (!Scheduler.isDraining()) {
              Scheduler.enqueue(function() {
                run3(runTick);
              });
            } else {
              run3(runTick);
            }
          }
        }
      };
    }
    function runPar(util, supervisor, par, cb2) {
      var fiberId = 0;
      var fibers = {};
      var killId = 0;
      var kills = {};
      var early = new Error("[ParAff] Early exit");
      var interrupt = null;
      var root = EMPTY;
      function kill(error3, par2, cb3) {
        var step3 = par2;
        var head6 = null;
        var tail3 = null;
        var count2 = 0;
        var kills2 = {};
        var tmp, kid;
        loop:
          while (true) {
            tmp = null;
            switch (step3.tag) {
              case FORKED:
                if (step3._3 === EMPTY) {
                  tmp = fibers[step3._1];
                  kills2[count2++] = tmp.kill(error3, function(result) {
                    return function() {
                      count2--;
                      if (count2 === 0) {
                        cb3(result)();
                      }
                    };
                  });
                }
                if (head6 === null) {
                  break loop;
                }
                step3 = head6._2;
                if (tail3 === null) {
                  head6 = null;
                } else {
                  head6 = tail3._1;
                  tail3 = tail3._2;
                }
                break;
              case MAP:
                step3 = step3._2;
                break;
              case APPLY:
              case ALT:
                if (head6) {
                  tail3 = new Aff2(CONS, head6, tail3);
                }
                head6 = step3;
                step3 = step3._1;
                break;
            }
          }
        if (count2 === 0) {
          cb3(util.right(void 0))();
        } else {
          kid = 0;
          tmp = count2;
          for (; kid < tmp; kid++) {
            kills2[kid] = kills2[kid]();
          }
        }
        return kills2;
      }
      function join3(result, head6, tail3) {
        var fail2, step3, lhs, rhs, tmp, kid;
        if (util.isLeft(result)) {
          fail2 = result;
          step3 = null;
        } else {
          step3 = result;
          fail2 = null;
        }
        loop:
          while (true) {
            lhs = null;
            rhs = null;
            tmp = null;
            kid = null;
            if (interrupt !== null) {
              return;
            }
            if (head6 === null) {
              cb2(fail2 || step3)();
              return;
            }
            if (head6._3 !== EMPTY) {
              return;
            }
            switch (head6.tag) {
              case MAP:
                if (fail2 === null) {
                  head6._3 = util.right(head6._1(util.fromRight(step3)));
                  step3 = head6._3;
                } else {
                  head6._3 = fail2;
                }
                break;
              case APPLY:
                lhs = head6._1._3;
                rhs = head6._2._3;
                if (fail2) {
                  head6._3 = fail2;
                  tmp = true;
                  kid = killId++;
                  kills[kid] = kill(early, fail2 === lhs ? head6._2 : head6._1, function() {
                    return function() {
                      delete kills[kid];
                      if (tmp) {
                        tmp = false;
                      } else if (tail3 === null) {
                        join3(fail2, null, null);
                      } else {
                        join3(fail2, tail3._1, tail3._2);
                      }
                    };
                  });
                  if (tmp) {
                    tmp = false;
                    return;
                  }
                } else if (lhs === EMPTY || rhs === EMPTY) {
                  return;
                } else {
                  step3 = util.right(util.fromRight(lhs)(util.fromRight(rhs)));
                  head6._3 = step3;
                }
                break;
              case ALT:
                lhs = head6._1._3;
                rhs = head6._2._3;
                if (lhs === EMPTY && util.isLeft(rhs) || rhs === EMPTY && util.isLeft(lhs)) {
                  return;
                }
                if (lhs !== EMPTY && util.isLeft(lhs) && rhs !== EMPTY && util.isLeft(rhs)) {
                  fail2 = step3 === lhs ? rhs : lhs;
                  step3 = null;
                  head6._3 = fail2;
                } else {
                  head6._3 = step3;
                  tmp = true;
                  kid = killId++;
                  kills[kid] = kill(early, step3 === lhs ? head6._2 : head6._1, function() {
                    return function() {
                      delete kills[kid];
                      if (tmp) {
                        tmp = false;
                      } else if (tail3 === null) {
                        join3(step3, null, null);
                      } else {
                        join3(step3, tail3._1, tail3._2);
                      }
                    };
                  });
                  if (tmp) {
                    tmp = false;
                    return;
                  }
                }
                break;
            }
            if (tail3 === null) {
              head6 = null;
            } else {
              head6 = tail3._1;
              tail3 = tail3._2;
            }
          }
      }
      function resolve(fiber) {
        return function(result) {
          return function() {
            delete fibers[fiber._1];
            fiber._3 = result;
            join3(result, fiber._2._1, fiber._2._2);
          };
        };
      }
      function run3() {
        var status = CONTINUE;
        var step3 = par;
        var head6 = null;
        var tail3 = null;
        var tmp, fid;
        loop:
          while (true) {
            tmp = null;
            fid = null;
            switch (status) {
              case CONTINUE:
                switch (step3.tag) {
                  case MAP:
                    if (head6) {
                      tail3 = new Aff2(CONS, head6, tail3);
                    }
                    head6 = new Aff2(MAP, step3._1, EMPTY, EMPTY);
                    step3 = step3._2;
                    break;
                  case APPLY:
                    if (head6) {
                      tail3 = new Aff2(CONS, head6, tail3);
                    }
                    head6 = new Aff2(APPLY, EMPTY, step3._2, EMPTY);
                    step3 = step3._1;
                    break;
                  case ALT:
                    if (head6) {
                      tail3 = new Aff2(CONS, head6, tail3);
                    }
                    head6 = new Aff2(ALT, EMPTY, step3._2, EMPTY);
                    step3 = step3._1;
                    break;
                  default:
                    fid = fiberId++;
                    status = RETURN;
                    tmp = step3;
                    step3 = new Aff2(FORKED, fid, new Aff2(CONS, head6, tail3), EMPTY);
                    tmp = Fiber(util, supervisor, tmp);
                    tmp.onComplete({
                      rethrow: false,
                      handler: resolve(step3)
                    })();
                    fibers[fid] = tmp;
                    if (supervisor) {
                      supervisor.register(tmp);
                    }
                }
                break;
              case RETURN:
                if (head6 === null) {
                  break loop;
                }
                if (head6._1 === EMPTY) {
                  head6._1 = step3;
                  status = CONTINUE;
                  step3 = head6._2;
                  head6._2 = EMPTY;
                } else {
                  head6._2 = step3;
                  step3 = head6;
                  if (tail3 === null) {
                    head6 = null;
                  } else {
                    head6 = tail3._1;
                    tail3 = tail3._2;
                  }
                }
            }
          }
        root = step3;
        for (fid = 0; fid < fiberId; fid++) {
          fibers[fid].run();
        }
      }
      function cancel(error3, cb3) {
        interrupt = util.left(error3);
        var innerKills;
        for (var kid in kills) {
          if (kills.hasOwnProperty(kid)) {
            innerKills = kills[kid];
            for (kid in innerKills) {
              if (innerKills.hasOwnProperty(kid)) {
                innerKills[kid]();
              }
            }
          }
        }
        kills = null;
        var newKills = kill(error3, root, cb3);
        return function(killError) {
          return new Aff2(ASYNC, function(killCb) {
            return function() {
              for (var kid2 in newKills) {
                if (newKills.hasOwnProperty(kid2)) {
                  newKills[kid2]();
                }
              }
              return nonCanceler2;
            };
          });
        };
      }
      run3();
      return function(killError) {
        return new Aff2(ASYNC, function(killCb) {
          return function() {
            return cancel(killError, killCb);
          };
        });
      };
    }
    function sequential2(util, supervisor, par) {
      return new Aff2(ASYNC, function(cb2) {
        return function() {
          return runPar(util, supervisor, par, cb2);
        };
      });
    }
    Aff2.EMPTY = EMPTY;
    Aff2.Pure = AffCtr(PURE);
    Aff2.Throw = AffCtr(THROW);
    Aff2.Catch = AffCtr(CATCH);
    Aff2.Sync = AffCtr(SYNC);
    Aff2.Async = AffCtr(ASYNC);
    Aff2.Bind = AffCtr(BIND);
    Aff2.Bracket = AffCtr(BRACKET);
    Aff2.Fork = AffCtr(FORK);
    Aff2.Seq = AffCtr(SEQ);
    Aff2.ParMap = AffCtr(MAP);
    Aff2.ParApply = AffCtr(APPLY);
    Aff2.ParAlt = AffCtr(ALT);
    Aff2.Fiber = Fiber;
    Aff2.Supervisor = Supervisor;
    Aff2.Scheduler = Scheduler;
    Aff2.nonCanceler = nonCanceler2;
    return Aff2;
  }();
  var _pure = Aff.Pure;
  var _throwError = Aff.Throw;
  function _map(f) {
    return function(aff) {
      if (aff.tag === Aff.Pure.tag) {
        return Aff.Pure(f(aff._1));
      } else {
        return Aff.Bind(aff, function(value12) {
          return Aff.Pure(f(value12));
        });
      }
    };
  }
  function _bind(aff) {
    return function(k) {
      return Aff.Bind(aff, k);
    };
  }
  var _liftEffect = Aff.Sync;
  function _parAffMap(f) {
    return function(aff) {
      return Aff.ParMap(f, aff);
    };
  }
  function _parAffApply(aff1) {
    return function(aff2) {
      return Aff.ParApply(aff1, aff2);
    };
  }
  var makeAff = Aff.Async;
  function _makeFiber(util, aff) {
    return function() {
      return Aff.Fiber(util, null, aff);
    };
  }
  var _delay = function() {
    function setDelay(n, k) {
      if (n === 0 && typeof setImmediate !== "undefined") {
        return setImmediate(k);
      } else {
        return setTimeout(k, n);
      }
    }
    function clearDelay(n, t) {
      if (n === 0 && typeof clearImmediate !== "undefined") {
        return clearImmediate(t);
      } else {
        return clearTimeout(t);
      }
    }
    return function(right2, ms) {
      return Aff.Async(function(cb2) {
        return function() {
          var timer = setDelay(ms, cb2(right2()));
          return function() {
            return Aff.Sync(function() {
              return right2(clearDelay(ms, timer));
            });
          };
        };
      });
    };
  }();
  var _sequential = Aff.Seq;

  // output/Effect.Exception/foreign.js
  function error(msg) {
    return new Error(msg);
  }

  // output/Control.Monad.Error.Class/index.js
  var throwError = function(dict) {
    return dict.throwError;
  };

  // output/Effect.Class/index.js
  var monadEffectEffect = {
    liftEffect: /* @__PURE__ */ identity(categoryFn),
    Monad0: function() {
      return monadEffect;
    }
  };
  var liftEffect = function(dict) {
    return dict.liftEffect;
  };

  // output/Control.Monad.Except.Trans/index.js
  var map8 = /* @__PURE__ */ map(functorEither);
  var ExceptT = function(x) {
    return x;
  };
  var runExceptT = function(v) {
    return v;
  };
  var mapExceptT = function(f) {
    return function(v) {
      return f(v);
    };
  };
  var functorExceptT = function(dictFunctor) {
    var map17 = map(dictFunctor);
    return {
      map: function(f) {
        return mapExceptT(map17(map8(f)));
      }
    };
  };
  var monadExceptT = function(dictMonad) {
    return {
      Applicative0: function() {
        return applicativeExceptT(dictMonad);
      },
      Bind1: function() {
        return bindExceptT(dictMonad);
      }
    };
  };
  var bindExceptT = function(dictMonad) {
    var bind6 = bind(dictMonad.Bind1());
    var pure8 = pure(dictMonad.Applicative0());
    return {
      bind: function(v) {
        return function(k) {
          return bind6(v)(either(function($187) {
            return pure8(Left.create($187));
          })(function(a2) {
            var v1 = k(a2);
            return v1;
          }));
        };
      },
      Apply0: function() {
        return applyExceptT(dictMonad);
      }
    };
  };
  var applyExceptT = function(dictMonad) {
    var functorExceptT1 = functorExceptT(dictMonad.Bind1().Apply0().Functor0());
    return {
      apply: ap(monadExceptT(dictMonad)),
      Functor0: function() {
        return functorExceptT1;
      }
    };
  };
  var applicativeExceptT = function(dictMonad) {
    return {
      pure: function() {
        var $188 = pure(dictMonad.Applicative0());
        return function($189) {
          return ExceptT($188(Right.create($189)));
        };
      }(),
      Apply0: function() {
        return applyExceptT(dictMonad);
      }
    };
  };
  var monadThrowExceptT = function(dictMonad) {
    var monadExceptT1 = monadExceptT(dictMonad);
    return {
      throwError: function() {
        var $198 = pure(dictMonad.Applicative0());
        return function($199) {
          return ExceptT($198(Left.create($199)));
        };
      }(),
      Monad0: function() {
        return monadExceptT1;
      }
    };
  };
  var altExceptT = function(dictSemigroup) {
    var append6 = append(dictSemigroup);
    return function(dictMonad) {
      var Bind1 = dictMonad.Bind1();
      var bind6 = bind(Bind1);
      var pure8 = pure(dictMonad.Applicative0());
      var functorExceptT1 = functorExceptT(Bind1.Apply0().Functor0());
      return {
        alt: function(v) {
          return function(v1) {
            return bind6(v)(function(rm) {
              if (rm instanceof Right) {
                return pure8(new Right(rm.value0));
              }
              ;
              if (rm instanceof Left) {
                return bind6(v1)(function(rn) {
                  if (rn instanceof Right) {
                    return pure8(new Right(rn.value0));
                  }
                  ;
                  if (rn instanceof Left) {
                    return pure8(new Left(append6(rm.value0)(rn.value0)));
                  }
                  ;
                  throw new Error("Failed pattern match at Control.Monad.Except.Trans (line 86, column 9 - line 88, column 49): " + [rn.constructor.name]);
                });
              }
              ;
              throw new Error("Failed pattern match at Control.Monad.Except.Trans (line 82, column 5 - line 88, column 49): " + [rm.constructor.name]);
            });
          };
        },
        Functor0: function() {
          return functorExceptT1;
        }
      };
    };
  };

  // output/Control.Parallel.Class/index.js
  var sequential = function(dict) {
    return dict.sequential;
  };
  var parallel = function(dict) {
    return dict.parallel;
  };

  // output/Control.Parallel/index.js
  var identity9 = /* @__PURE__ */ identity(categoryFn);
  var parTraverse_ = function(dictParallel) {
    var sequential2 = sequential(dictParallel);
    var traverse_3 = traverse_(dictParallel.Applicative1());
    var parallel2 = parallel(dictParallel);
    return function(dictFoldable) {
      var traverse_1 = traverse_3(dictFoldable);
      return function(f) {
        var $48 = traverse_1(function($50) {
          return parallel2(f($50));
        });
        return function($49) {
          return sequential2($48($49));
        };
      };
    };
  };
  var parSequence_ = function(dictParallel) {
    var parTraverse_1 = parTraverse_(dictParallel);
    return function(dictFoldable) {
      return parTraverse_1(dictFoldable)(identity9);
    };
  };

  // output/Effect.Aff/index.js
  var $runtime_lazy4 = function(name15, moduleName, init4) {
    var state4 = 0;
    var val;
    return function(lineNumber) {
      if (state4 === 2)
        return val;
      if (state4 === 1)
        throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state4 = 1;
      val = init4();
      state4 = 2;
      return val;
    };
  };
  var $$void5 = /* @__PURE__ */ $$void(functorEffect);
  var functorParAff = {
    map: _parAffMap
  };
  var functorAff = {
    map: _map
  };
  var ffiUtil = /* @__PURE__ */ function() {
    var unsafeFromRight = function(v) {
      if (v instanceof Right) {
        return v.value0;
      }
      ;
      if (v instanceof Left) {
        return unsafeCrashWith("unsafeFromRight: Left");
      }
      ;
      throw new Error("Failed pattern match at Effect.Aff (line 412, column 21 - line 414, column 54): " + [v.constructor.name]);
    };
    var unsafeFromLeft = function(v) {
      if (v instanceof Left) {
        return v.value0;
      }
      ;
      if (v instanceof Right) {
        return unsafeCrashWith("unsafeFromLeft: Right");
      }
      ;
      throw new Error("Failed pattern match at Effect.Aff (line 407, column 20 - line 409, column 55): " + [v.constructor.name]);
    };
    var isLeft = function(v) {
      if (v instanceof Left) {
        return true;
      }
      ;
      if (v instanceof Right) {
        return false;
      }
      ;
      throw new Error("Failed pattern match at Effect.Aff (line 402, column 12 - line 404, column 21): " + [v.constructor.name]);
    };
    return {
      isLeft,
      fromLeft: unsafeFromLeft,
      fromRight: unsafeFromRight,
      left: Left.create,
      right: Right.create
    };
  }();
  var makeFiber = function(aff) {
    return _makeFiber(ffiUtil, aff);
  };
  var launchAff = function(aff) {
    return function __do2() {
      var fiber = makeFiber(aff)();
      fiber.run();
      return fiber;
    };
  };
  var launchAff_ = function($74) {
    return $$void5(launchAff($74));
  };
  var applyParAff = {
    apply: _parAffApply,
    Functor0: function() {
      return functorParAff;
    }
  };
  var monadAff = {
    Applicative0: function() {
      return applicativeAff;
    },
    Bind1: function() {
      return bindAff;
    }
  };
  var bindAff = {
    bind: _bind,
    Apply0: function() {
      return $lazy_applyAff(0);
    }
  };
  var applicativeAff = {
    pure: _pure,
    Apply0: function() {
      return $lazy_applyAff(0);
    }
  };
  var $lazy_applyAff = /* @__PURE__ */ $runtime_lazy4("applyAff", "Effect.Aff", function() {
    return {
      apply: ap(monadAff),
      Functor0: function() {
        return functorAff;
      }
    };
  });
  var pure22 = /* @__PURE__ */ pure(applicativeAff);
  var monadEffectAff = {
    liftEffect: _liftEffect,
    Monad0: function() {
      return monadAff;
    }
  };
  var parallelAff = {
    parallel: unsafeCoerce2,
    sequential: _sequential,
    Monad0: function() {
      return monadAff;
    },
    Applicative1: function() {
      return $lazy_applicativeParAff(0);
    }
  };
  var $lazy_applicativeParAff = /* @__PURE__ */ $runtime_lazy4("applicativeParAff", "Effect.Aff", function() {
    return {
      pure: function() {
        var $82 = parallel(parallelAff);
        return function($83) {
          return $82(pure22($83));
        };
      }(),
      Apply0: function() {
        return applyParAff;
      }
    };
  });
  var parSequence_2 = /* @__PURE__ */ parSequence_(parallelAff)(foldableArray);
  var semigroupCanceler = {
    append: function(v) {
      return function(v1) {
        return function(err) {
          return parSequence_2([v(err), v1(err)]);
        };
      };
    }
  };
  var nonCanceler = /* @__PURE__ */ $$const(/* @__PURE__ */ pure22(unit));
  var monoidCanceler = {
    mempty: nonCanceler,
    Semigroup0: function() {
      return semigroupCanceler;
    }
  };

  // output/Web.Event.Event/foreign.js
  function _target(e) {
    return e.target;
  }

  // output/Web.Event.Event/index.js
  var target = function($3) {
    return toMaybe(_target($3));
  };

  // output/Web.HTML.HTMLInputElement/foreign.js
  function valueAsNumber(input2) {
    return function() {
      return input2.valueAsNumber;
    };
  }

  // output/Web.Internal.FFI/foreign.js
  function _unsafeReadProtoTagged(nothing, just, name15, value12) {
    if (typeof window !== "undefined") {
      var ty = window[name15];
      if (ty != null && value12 instanceof ty) {
        return just(value12);
      }
    }
    var obj = value12;
    while (obj != null) {
      var proto = Object.getPrototypeOf(obj);
      var constructorName = proto.constructor.name;
      if (constructorName === name15) {
        return just(value12);
      } else if (constructorName === "Object") {
        return nothing;
      }
      obj = proto;
    }
    return nothing;
  }

  // output/Web.Internal.FFI/index.js
  var unsafeReadProtoTagged = function(name15) {
    return function(value12) {
      return _unsafeReadProtoTagged(Nothing.value, Just.create, name15, value12);
    };
  };

  // output/Web.HTML.HTMLInputElement/index.js
  var fromEventTarget = /* @__PURE__ */ unsafeReadProtoTagged("HTMLInputElement");

  // output/Deku.Listeners/index.js
  var map9 = /* @__PURE__ */ map(functorEvent);
  var attr2 = /* @__PURE__ */ attr(attrOnInputCb);
  var for_4 = /* @__PURE__ */ for_(applicativeEffect)(foldableMaybe);
  var bind3 = /* @__PURE__ */ bind(bindMaybe);
  var composeKleisli2 = /* @__PURE__ */ composeKleisli(bindEffect);
  var pure5 = /* @__PURE__ */ pure(applicativeEvent);
  var alt4 = /* @__PURE__ */ alt(altEvent);
  var attr1 = /* @__PURE__ */ attr(attrInput_XtypeString);
  var slider = /* @__PURE__ */ function() {
    var $34 = alt4(pure5(attr1(Xtype.value)("range")));
    var $35 = map9(function(push2) {
      return attr2(OnInput.value)(cb(function(e) {
        return for_4(bind3(target(e))(fromEventTarget))(composeKleisli2(valueAsNumber)(push2));
      }));
    });
    return function($36) {
      return $34($35($36));
    };
  }();
  var slider_ = function($37) {
    return slider(pure5($37));
  };

  // output/Deku.Interpret/foreign.js
  var attributeParent_ = (runOnJust2) => (a2) => (state4) => () => {
    if (state4.units[a2.id]) {
      const dom2 = state4.units[a2.parent].main;
      if (!(state4.units[a2.id].main && state4.units[a2.id].main.parentNode || state4.units[a2.id].startBeacon && state4.units[a2.id].startBeacon.parentNode)) {
        const iRan = a2.ez ? (() => {
          if (state4.units[a2.id].main) {
            dom2.appendChild(state4.units[a2.id].main);
          } else {
            dom2.appendChild(state4.units[a2.id].startBeacon);
            dom2.appendChild(state4.units[a2.id].endBeacon);
          }
          return true;
        })() : runOnJust2(a2.pos)((pos) => () => {
          return runOnJust2(a2.dynFamily)((dynFamily) => () => {
            var i2 = 0;
            var j = 0;
            var terminalDyn;
            while (j < dom2.childNodes.length) {
              if (dom2.childNodes[j].nodeType === 8 && dom2.childNodes[j].nodeValue === "%-%" + dynFamily) {
                j += 1;
                break;
              }
              j++;
            }
            const inserter = (k) => {
              if (state4.units[a2.id].startBeacon) {
                dom2.insertBefore(state4.units[a2.id].startBeacon, dom2.childNodes[k]);
                dom2.insertBefore(state4.units[a2.id].endBeacon, dom2.childNodes[k]);
              } else {
                dom2.insertBefore(state4.units[a2.id].main, dom2.childNodes[k]);
              }
            };
            while (j < dom2.childNodes.length) {
              var tmpDekuId;
              if (tmpDekuId = dom2.childNodes[j].$dekuId) {
                const insertHappened = runOnJust2(state4.units[tmpDekuId].dynFamily)((tmpDynFamily) => () => {
                  const insertHappened2 = runOnJust2(state4.units[tmpDekuId].pos)((tmpPos) => () => {
                    if (dynFamily === tmpDynFamily && pos <= tmpPos) {
                      inserter(j);
                      return true;
                    }
                    return false;
                  })();
                  return insertHappened2;
                })();
                if (insertHappened) {
                  return true;
                }
              }
              if (i2 === pos) {
                inserter(j);
                return true;
              }
              if (dom2.childNodes[j].nodeType === 8 && dom2.childNodes[j].nodeValue === "%-%" + dynFamily + "%-%") {
                inserter(j);
                return true;
              }
              if (dom2.childNodes[j].nodeType === 8 && dom2.childNodes[j].nodeValue.substring(0, 3) === "%-%" && !terminalDyn) {
                terminalDyn = dom2.childNodes[j].nodeValue + "%-%";
              }
              if (!terminalDyn) {
                i2++;
              }
              if (dom2.childNodes[j].nodeType === 8 && dom2.childNodes[j].nodeValue === terminalDyn) {
                terminalDyn = void 0;
                i2++;
              }
              j++;
            }
            return false;
          })();
        })();
        if (!iRan) {
          if (a2.parent.indexOf("@!%") !== -1) {
            const usedDynBeacon = runOnJust2(a2.dynFamily)((df) => () => {
              if (state4.units[a2.id].main) {
                state4.units[df].endBeacon.parentNode.insertBefore(state4.units[a2.id].main, state4.units[df].endBeacon);
              } else {
                state4.units[df].endBeacon.parentNode.insertBefore(state4.units[a2.id].endBeacon, state4.units[df].endBeacon);
                state4.units[df].endBeacon.parentNode.insertBefore(state4.units[a2.id].startBeacon, state4.units[a2.id].endBeacon);
              }
              return true;
            })();
            if (usedDynBeacon) {
            } else if (state4.units[a2.id].main) {
              dom2.parentNode.replaceChild(state4.units[a2.id].main, dom2);
            } else {
              dom2.parentNode.replaceChild(state4.units[a2.id].endBeacon, dom2);
              state4.units[a2.id].endBeacon.parentNode.insertBefore(state4.units[a2.id].startBeacon, state4.units[a2.id].endBeacon);
            }
          } else {
            const hasADynFamily = runOnJust2(a2.dynFamily)((dynFamily) => () => {
              if (state4.units[a2.id].startBeacon) {
                dom2.insertBefore(state4.units[a2.id].startBeacon, state4.units[dynFamily].endBeacon);
                dom2.insertBefore(state4.units[a2.id].endBeacon, state4.units[dynFamily].endBeacon);
              } else {
                dom2.insertBefore(state4.units[a2.id].main, state4.units[dynFamily].endBeacon);
              }
              return true;
            })();
            if (!hasADynFamily) {
              if (state4.units[a2.id].startBeacon) {
                dom2.appendChild(state4.units[a2.id].startBeacon);
                dom2.appendChild(state4.units[a2.id].endBeacon);
              } else {
                dom2.appendChild(state4.units[a2.id].main);
              }
            }
          }
        }
      }
    }
  };
  var makeDynBeacon_ = (runOnJust2) => (tryHydration) => (a2) => (state4) => () => {
    var startBeacon;
    var endBeacon;
    var ptr = a2.id;
    if (!state4.scopes[a2.scope]) {
      state4.scopes[a2.scope] = [];
    }
    state4.scopes[a2.scope].push(ptr);
    const iRan = runOnJust2(a2.parent)(() => () => {
      if (state4.hydrating && tryHydration && (startBeacon = state4.allBeacons[a2.id]) && (endBeacon = state4.allBeacons[`${a2.id}%-%`])) {
        state4.units[ptr] = {
          listeners: {},
          parent: a2.parent,
          scope: a2.scope,
          pos: a2.pos,
          dynFamily: a2.dynFamily,
          startBeacon,
          endBeacon
        };
        startBeacon.$dekuId = ptr;
        endBeacon.$dekuId = ptr;
        return true;
      }
      return false;
    })();
    if (!iRan) {
      const startBeacon2 = document.createComment(`%-%${a2.id}`);
      const endBeacon2 = document.createComment(`%-%${a2.id}%-%`);
      state4.units[ptr] = {
        listeners: {},
        parent: a2.parent,
        dynFamily: a2.dynFamily,
        scope: a2.scope,
        pos: a2.pos,
        startBeacon: startBeacon2,
        endBeacon: endBeacon2
      };
      startBeacon2.$dekuId = ptr;
      endBeacon2.$dekuId = ptr;
    }
  };
  var svgTags = /* @__PURE__ */ new Set([
    "animate",
    "animateMotion",
    "animateTransform",
    "circle",
    "clipPath",
    "defs",
    "desc",
    "discard",
    "ellipse",
    "feBlend",
    "feColorMatrix",
    "feComponentTransfer",
    "feComposite",
    "feConvolveMatrix",
    "feDiffuseLighting",
    "feDisplacementMap",
    "feDistantLight",
    "feDropShadow",
    "feFlood",
    "feFuncA",
    "feFuncB",
    "feFuncG",
    "feFuncR",
    "feGaussianBlur",
    "feImage",
    "feMerge",
    "feMergeNode",
    "feMorphology",
    "feOffset",
    "fePointLight",
    "feSpecularLighting",
    "feSpotLight",
    "feTile",
    "feTurbulence",
    "filter",
    "foreignObject",
    "g",
    "image",
    "line",
    "linearGradient",
    "marker",
    "mask",
    "metadata",
    "mpath",
    "path",
    "pattern",
    "polygon",
    "polyline",
    "radialGradient",
    "rect",
    "set",
    "stop",
    "svg",
    "switch",
    "symbol",
    "text",
    "textPath",
    "title",
    "tspan",
    "use",
    "view"
  ]);
  var getDynFamily = (id2) => (state4) => () => state4.units[id2] && state4.units[id2].dynFamily ? state4.units[id2].dynFamily : (() => {
    throw new Error(`No positional information for ${id2}`);
  })();
  var getParent = (id2) => (state4) => () => state4.units[id2] && state4.units[id2].main && state4.units[id2].main.parentNode && state4.units[id2].main.parentNode.$dekuId ? state4.units[id2].main.parentNode.$dekuId : state4.units[id2] && state4.units[id2].startBeacon && state4.units[id2].startBeacon.parentNode && state4.units[id2].startBeacon.parentNode.$dekuId ? state4.units[id2].startBeacon.parentNode.$dekuId : (() => {
    throw new Error(`No parent information for ${id2}`);
  })();
  var getScope = (id2) => (state4) => () => state4.units[id2] && state4.units[id2].scope ? state4.units[id2].scope : (() => {
    throw new Error(`No scope information for ${id2}`);
  })();
  var makeElement_ = (runOnJust2) => (tryHydration) => (a2) => (state4) => () => {
    var dom2;
    var ptr = a2.id;
    if (!state4.scopes[a2.scope]) {
      state4.scopes[a2.scope] = [];
    }
    state4.scopes[a2.scope].push(ptr);
    const iRan = runOnJust2(a2.parent)(() => () => {
      if (state4.hydrating && tryHydration && (dom2 = document.documentElement.querySelector(`[data-deku-ssr="${ptr}"]`))) {
        state4.units[ptr] = {
          listeners: {},
          pos: a2.pos,
          parent: a2.parent,
          scope: a2.scope,
          dynFamily: a2.dynFamily,
          main: dom2
        };
        dom2.$dekuId = ptr;
        return true;
      }
      return false;
    })();
    if (!iRan) {
      const main3 = svgTags.has(a2.tag) ? document.createElementNS("http://www.w3.org/2000/svg", a2.tag) : document.createElement(a2.tag);
      state4.units[ptr] = {
        listeners: {},
        parent: a2.parent,
        pos: a2.pos,
        scope: a2.scope,
        dynFamily: a2.dynFamily,
        main: main3
      };
      main3.$dekuId = ptr;
    }
  };
  var makeText_ = (runOnJust2) => (tryHydration) => (maybe2) => (a2) => (state4) => () => {
    var ptr = a2.id;
    var dom2;
    if (!state4.scopes[a2.scope]) {
      state4.scopes[a2.scope] = [];
    }
    state4.scopes[a2.scope].push(ptr);
    const iRan = runOnJust2(a2.parent)((parent2) => () => {
      if (state4.hydrating && tryHydration && (dom2 = document.documentElement.querySelector(`[data-deku-ssr="${parent2}"]`))) {
        var i2 = 0;
        for (; i2 < dom2.childNodes.length; i2++) {
          const ptrSplit = ptr.split("@-@");
          if (dom2.childNodes[i2].nodeType === 8 && dom2.childNodes[i2].nodeValue === ptrSplit[0]) {
            i2 = i2 - 1;
            var textWasBlank = i2 === -1;
            var textWasBlankAfterDynBeacon = i2 >= 0 && dom2.childNodes[i2].nodeType === 8;
            if (textWasBlank) {
              dom2.prepend(document.createTextNode(""));
            }
            if (textWasBlankAfterDynBeacon) {
              dom2.insertBefore(document.createTextNode(""), dom2.childNodes[i2 + 1]);
            }
            break;
          }
        }
        const main3 = dom2.childNodes[i2];
        state4.units[ptr] = {
          main: main3,
          pos: a2.pos,
          parent: a2.parent,
          scope: a2.scope
        };
        main3.$dekuId = ptr;
        return true;
      }
      return false;
    })();
    if (!iRan) {
      const main3 = document.createTextNode("");
      state4.units[ptr] = {
        main: main3,
        parent: a2.parent,
        scope: a2.scope,
        pos: a2.pos,
        dynFamily: a2.dynFamily
      };
      main3.$dekuId = ptr;
    }
  };
  function makeFFIDOMSnapshot() {
    return {
      units: {},
      scopes: {},
      allBeacons: {}
    };
  }
  var setProp_ = (tryHydration) => (a2) => (state4) => () => {
    if (state4.units[a2.id]) {
      var ptr = a2.id;
      var avv = a2.value;
      if (state4.hydrating && tryHydration && !state4.units[ptr] && (dom = document.documentElement.querySelector(`[data-deku-ssr="${ptr}"]`))) {
        state4.units[ptr] = {
          listeners: {},
          parent: a2.parent,
          scope: a2.scope,
          main: dom
        };
        if (!state4.scopes[a2.scope]) {
          state4.scopes[a2.scope] = [];
        }
        state4.scopes[a2.scope].push(ptr);
      }
      if (state4.units[ptr].main.tagName === "INPUT" && a2.key === "value") {
        state4.units[ptr].main.value = avv;
      } else if (state4.units[ptr].main.tagName === "TEXTAREA" && a2.key === "value") {
        state4.units[ptr].main.value = avv;
      } else if (state4.units[ptr].main.tagName === "INPUT" && a2.key === "checked") {
        state4.units[ptr].main.checked = avv === "true";
      } else if (a2.key === "disabled") {
        state4.units[ptr].main.disabled = avv === "true";
      } else {
        state4.units[ptr].main.setAttribute(a2.key, avv);
      }
    }
  };
  var setCb_ = (tryHydration) => (a2) => (state4) => () => {
    if (state4.units[a2.id]) {
      var ptr = a2.id;
      var avv = a2.value;
      if (state4.hydrating && tryHydration && !state4.units[ptr] && (dom = document.documentElement.querySelector(`[data-deku-ssr="${ptr}"]`))) {
        state4.units[ptr] = {
          listeners: {},
          parent: a2.parent,
          scope: a2.scope,
          main: dom
        };
        if (!state4.scopes[a2.scope]) {
          state4.scopes[a2.scope] = [];
        }
        state4.scopes[a2.scope].push(ptr);
      }
      if (a2.key === "@self@") {
        avv(state4.units[ptr].main)();
      } else {
        if (state4.units[ptr].listeners[a2.key]) {
          state4.units[ptr].main.removeEventListener(a2.key, state4.units[ptr].listeners[a2.key]);
        }
        var el = (e) => avv(e)();
        state4.units[ptr].main.addEventListener(a2.key, el);
        state4.units[ptr].listeners[a2.key] = el;
      }
    }
  };
  var setText_ = (a2) => (state4) => () => {
    if (state4.units[a2.id]) {
      var ptr = a2.id;
      state4.units[ptr].main.nodeValue = a2.text;
    }
  };
  var makePursx_ = (runOnJust2) => (tryHydration) => (maybe2) => (a2) => (state4) => () => {
    var dom2;
    var tmp;
    var ptr = a2.id;
    var html2 = a2.html;
    var verb = a2.verb;
    var cache = a2.cache;
    var parent2 = a2.parent;
    var scope2 = a2.scope;
    var pxScope = a2.pxScope;
    const iRan = runOnJust2(a2.parent)(() => () => {
      if (state4.hydrating && tryHydration && (dom2 = document.documentElement.querySelector(`[data-deku-ssr="${ptr}"]`))) {
        state4.units[ptr] = {
          listeners: {},
          pos: a2.pos,
          scope: scope2,
          parent: parent2,
          main: dom2
        };
        dom2.$dekuId = ptr;
        return true;
      }
      return false;
    })();
    if (!iRan) {
      const entries = Object.entries(cache);
      for (var i2 = 0; i2 < entries.length; i2++) {
        const key2 = entries[i2][0];
        if (entries[i2][1] === true) {
          html2 = html2.replace(verb + key2 + verb, 'data-deku-attr-internal="' + key2 + '"');
        } else {
          html2 = html2.replace(verb + key2 + verb, '<span style="display:contents;" data-deku-elt-internal="' + key2 + '"></span>');
        }
      }
      tmp = document.createElement("div");
      tmp.innerHTML = html2.trim();
      state4.units[ptr] = {
        listeners: {},
        pos: a2.pos,
        scope: scope2,
        parent: parent2,
        main: tmp.firstChild
      };
      tmp.firstChild.$dekuId = ptr;
    }
    if (!state4.scopes[scope2]) {
      state4.scopes[scope2] = [];
    }
    state4.scopes[scope2].push(ptr);
    if (!tmp) {
      tmp = dom2;
    }
    tmp.querySelectorAll("[data-deku-attr-internal]").forEach(function(e) {
      var key2 = e.getAttribute("data-deku-attr-internal");
      const namespacedKey = key2 + "@!%" + pxScope;
      state4.units[namespacedKey] = {
        listeners: {},
        main: e,
        scope: scope2
      };
      state4.scopes[scope2].push(namespacedKey);
    });
    tmp.querySelectorAll("[data-deku-elt-internal]").forEach(function(e) {
      var key2 = e.getAttribute("data-deku-elt-internal");
      const namespacedKey = key2 + "@!%" + pxScope;
      state4.units[key2 + "@!%" + pxScope] = {
        listeners: {},
        main: e,
        scope: scope2
      };
      state4.scopes[scope2].push(namespacedKey);
    });
    if (!iRan) {
      state4.units[ptr].main.remove();
    }
  };
  var makeRoot_ = (a2) => (state4) => () => {
    var ptr = a2.id;
    state4.units[ptr] = {
      main: a2.root
    };
    a2.root.$dekuId = ptr;
  };
  var giveNewParent_ = (just) => (runOnJust2) => (b2) => (state4) => () => {
    const insertAt3 = (ptr, parent2, node) => {
      if (state4.units[ptr].startBeacon) {
        var x2 = state4.units[ptr].startBeacon;
        var y2 = x2.nextSibling;
        state4.units[parent2].main.insertBefore(x2, node);
        x2 = y2;
        while (x2 && x2 !== state4.units[ptr].endBeacon) {
          y2 = x2.nextSibling;
          state4.units[parent2].main.insertBefore(x2, node);
          x2 = y2;
        }
      } else {
        state4.units[parent2].main.insertBefore(state4.units[ptr].main, node);
      }
    };
    const runMe = [];
    runMe.push(b2);
    for (var z = 0; z < runMe.length; z++) {
      const a2 = runMe[z];
      const ptr = a2.id;
      const parent2 = a2.parent;
      state4.units[ptr].containingScope = a2.scope;
      var aPos = void 0;
      runOnJust2(a2.pos)((myPos) => () => {
        aPos = myPos;
        return true;
      })();
      if (aPos === void 0) {
        aPos = Number.MAX_VALUE;
      }
      const nodes = state4.units[parent2].main.childNodes;
      var i2 = 0;
      var didInsert = false;
      var pos = 0;
      while (i2 < nodes.length) {
        var dkid;
        if (dkid = nodes[i2].$dekuId) {
          const insertedBeforeEndBeacon = runOnJust2(a2.dynFamily)((df) => () => {
            if (didInsert) {
              return false;
            }
            if (state4.units[dkid].endBeacon === nodes[i2] && df === dkid) {
              state4.units[ptr].pos = just(pos);
              insertAt3(ptr, parent2, nodes[i2]);
              return true;
            }
            return false;
          })();
          if (insertedBeforeEndBeacon) {
            didInsert = true;
            break;
          }
          if (state4.units[dkid].dynFamily !== state4.units[ptr].dynFamily) {
            i2++;
            continue;
          }
          if (didInsert) {
            i2++;
            continue;
          }
          if (pos === aPos) {
            insertAt3(ptr, parent2, nodes[i2]);
            pos++;
            didInsert = true;
          } else if (state4.units[dkid].endBeacon !== nodes[i2]) {
            state4.units[dkid].pos = just(pos);
            pos++;
          }
        }
        i2++;
      }
      if (didInsert) {
        return;
      }
      if (state4.units[ptr].main) {
        state4.units[parent2].main.appendChild(state4.units[ptr].main);
      } else {
        var x = state4.units[ptr].startBeacon;
        var y = x.nextSibling;
        state4.units[parent2].main.appendChild(x);
        x = y;
        while (x && x !== state4.units[ptr].endBeacon) {
          y = x.nextSibling;
          state4.units[parent2].main.appendChild(x);
          x = y;
        }
      }
    }
  };
  var disconnectElement_ = (a2) => (state4) => () => {
    if (state4.units[a2.id]) {
      var ptr = a2.id;
      if (state4.units[ptr].containingScope && !a2.scopeEq(state4.units[ptr].containingScope)(a2.scope)) {
        return;
      }
      if (state4.units[ptr].main) {
        state4.units[ptr].main.remove();
      } else {
        const dummy = document.createElement("div");
        var x = state4.units[ptr].startBeacon;
        var y = x.nextSibling;
        dummy.appendChild(x);
        x = y;
        while (x && x !== state4.units[ptr].endBeacon) {
          y = x.nextSibling;
          dummy.appendChild(x);
          x = y;
        }
        if (x === state4.units[ptr].endBeacon) {
          dummy.appendChild(x);
        }
      }
    }
  };
  var deleteFromCache_ = (a2) => (state4) => () => {
    if (state4.units[a2.id]) {
      delete state4.units[a2.id];
    }
  };
  var removeDynBeacon_ = deleteFromCache_;

  // output/Random.LCG/index.js
  var mod2 = /* @__PURE__ */ mod(euclideanRingInt);
  var fromJust3 = /* @__PURE__ */ fromJust();
  var unSeed = function(v) {
    return v;
  };
  var seedMin = 1;
  var lcgM = 2147483647;
  var seedMax = /* @__PURE__ */ function() {
    return lcgM - 1 | 0;
  }();
  var mkSeed = function(x) {
    var ensureBetween = function(min5) {
      return function(max7) {
        return function(n) {
          var rangeSize = max7 - min5 | 0;
          var n$prime = mod2(n)(rangeSize);
          var $25 = n$prime < min5;
          if ($25) {
            return n$prime + max7 | 0;
          }
          ;
          return n$prime;
        };
      };
    };
    return ensureBetween(seedMin)(seedMax)(x);
  };
  var lcgC = 0;
  var lcgA = 48271;
  var lcgPerturb = function(d) {
    return function(v) {
      return fromJust3(fromNumber(remainder(toNumber(lcgA) * toNumber(v) + toNumber(d))(toNumber(lcgM))));
    };
  };
  var lcgNext = /* @__PURE__ */ lcgPerturb(lcgC);

  // output/Control.Monad.State.Trans/index.js
  var functorStateT = function(dictFunctor) {
    var map17 = map(dictFunctor);
    return {
      map: function(f) {
        return function(v) {
          return function(s2) {
            return map17(function(v1) {
              return new Tuple(f(v1.value0), v1.value1);
            })(v(s2));
          };
        };
      }
    };
  };
  var monadStateT = function(dictMonad) {
    return {
      Applicative0: function() {
        return applicativeStateT(dictMonad);
      },
      Bind1: function() {
        return bindStateT(dictMonad);
      }
    };
  };
  var bindStateT = function(dictMonad) {
    var bind6 = bind(dictMonad.Bind1());
    return {
      bind: function(v) {
        return function(f) {
          return function(s2) {
            return bind6(v(s2))(function(v1) {
              var v3 = f(v1.value0);
              return v3(v1.value1);
            });
          };
        };
      },
      Apply0: function() {
        return applyStateT(dictMonad);
      }
    };
  };
  var applyStateT = function(dictMonad) {
    var functorStateT1 = functorStateT(dictMonad.Bind1().Apply0().Functor0());
    return {
      apply: ap(monadStateT(dictMonad)),
      Functor0: function() {
        return functorStateT1;
      }
    };
  };
  var applicativeStateT = function(dictMonad) {
    var pure8 = pure(dictMonad.Applicative0());
    return {
      pure: function(a2) {
        return function(s2) {
          return pure8(new Tuple(a2, s2));
        };
      },
      Apply0: function() {
        return applyStateT(dictMonad);
      }
    };
  };
  var monadStateStateT = function(dictMonad) {
    var pure8 = pure(dictMonad.Applicative0());
    var monadStateT1 = monadStateT(dictMonad);
    return {
      state: function(f) {
        return function($200) {
          return pure8(f($200));
        };
      },
      Monad0: function() {
        return monadStateT1;
      }
    };
  };

  // output/Control.Monad.State/index.js
  var evalState = function(v) {
    return function(s2) {
      var v1 = v(s2);
      return v1.value0;
    };
  };

  // output/Test.QuickCheck.Gen/index.js
  var monadStateStateT2 = /* @__PURE__ */ monadStateStateT(monadIdentity);
  var state2 = /* @__PURE__ */ state(monadStateStateT2);
  var functorStateT2 = /* @__PURE__ */ functorStateT(functorIdentity);
  var mul2 = /* @__PURE__ */ mul(semiringNumber);
  var add2 = /* @__PURE__ */ add(semiringNumber);
  var unGen = function(v) {
    return v;
  };
  var lcgStep = /* @__PURE__ */ function() {
    var f = function(s2) {
      return new Tuple(unSeed(s2.newSeed), function() {
        var $94 = {};
        for (var $95 in s2) {
          if ({}.hasOwnProperty.call(s2, $95)) {
            $94[$95] = s2[$95];
          }
          ;
        }
        ;
        $94.newSeed = lcgNext(s2.newSeed);
        return $94;
      }());
    };
    return state2(f);
  }();
  var functorGen = functorStateT2;
  var map23 = /* @__PURE__ */ map(functorGen);
  var evalGen = function($104) {
    return evalState(unGen($104));
  };
  var applyGen = /* @__PURE__ */ applyStateT(monadIdentity);
  var apply4 = /* @__PURE__ */ apply(applyGen);
  var chooseInt$prime = function(a2) {
    return function(b2) {
      var numB = toNumber(b2);
      var numA = toNumber(a2);
      var clamp2 = function(x) {
        return numA + remainder(x)(numB - numA + 1);
      };
      var choose31BitPosNumber = map23(toNumber)(lcgStep);
      var choose32BitPosNumber = apply4(map23(add2)(choose31BitPosNumber))(map23(mul2(2))(choose31BitPosNumber));
      return map23(function($109) {
        return floor2(clamp2($109));
      })(choose32BitPosNumber);
    };
  };
  var chooseInt2 = function(a2) {
    return function(b2) {
      var $101 = a2 <= b2;
      if ($101) {
        return chooseInt$prime(a2)(b2);
      }
      ;
      return chooseInt$prime(b2)(a2);
    };
  };

  // output/Test.QuickCheck.Arbitrary/index.js
  var arbitrary = function(dict) {
    return dict.arbitrary;
  };
  var arbInt = /* @__PURE__ */ function() {
    return {
      arbitrary: chooseInt2(-1e6 | 0)(1e6)
    };
  }();

  // output/Deku.Interpret/index.js
  var $$void6 = /* @__PURE__ */ $$void(functorST);
  var show2 = /* @__PURE__ */ show(showInt);
  var arbitrary2 = /* @__PURE__ */ arbitrary(arbInt);
  var add3 = /* @__PURE__ */ add(semiringInt);
  var pure13 = /* @__PURE__ */ pure(applicativeEffect);
  var runOnJust = function(v) {
    return function(v1) {
      if (v instanceof Just) {
        return v1(v.value0);
      }
      ;
      return pure13(false);
    };
  };
  var sendToPos2 = function(a2) {
    return function(state4) {
      return function __do2() {
        var scope2 = getScope(a2.id)(state4)();
        var parent2 = getParent(a2.id)(state4)();
        var dynFamily = getDynFamily(a2.id)(state4)();
        var newA = {
          scope: scope2,
          parent: parent2,
          dynFamily,
          id: a2.id,
          pos: new Just(a2.pos),
          ez: false
        };
        return giveNewParent_(Just.create)(runOnJust)(newA)(state4)();
      };
    };
  };
  var fullDOMInterpret = function(seed) {
    return {
      ids: function __do2() {
        var s2 = read2(seed)();
        var o = show2(evalGen(arbitrary2)({
          newSeed: mkSeed(s2),
          size: 5
        }));
        $$void6(modify2(add3(1))(seed))();
        return o;
      },
      makeElement: makeElement_(runOnJust)(false),
      makeDynBeacon: makeDynBeacon_(runOnJust)(false),
      attributeParent: attributeParent_(runOnJust),
      makeRoot: makeRoot_,
      makeText: makeText_(runOnJust)(false)(maybe(unit)),
      makePursx: makePursx_(runOnJust)(false)(maybe(unit)),
      setProp: setProp_(false),
      setCb: setCb_(false),
      setText: setText_,
      sendToPos: sendToPos2,
      removeDynBeacon: removeDynBeacon_,
      deleteFromCache: deleteFromCache_,
      giveNewParent: giveNewParent_(Just.create)(runOnJust),
      disconnectElement: disconnectElement_
    };
  };

  // output/Web.HTML/foreign.js
  var windowImpl = function() {
    return window;
  };

  // output/Web.HTML.HTMLDocument/foreign.js
  function _body(doc) {
    return doc.body;
  }

  // output/Web.HTML.HTMLDocument/index.js
  var map10 = /* @__PURE__ */ map(functorEffect);
  var body2 = function(doc) {
    return map10(toMaybe)(function() {
      return _body(doc);
    });
  };

  // output/Web.HTML.HTMLElement/index.js
  var toElement = unsafeCoerce2;

  // output/Web.HTML.Window/foreign.js
  function document2(window2) {
    return function() {
      return window2.document;
    };
  }
  function requestAnimationFrame(fn) {
    return function(window2) {
      return function() {
        return window2.requestAnimationFrame(fn);
      };
    };
  }

  // output/Deku.Toplevel/index.js
  var bind4 = /* @__PURE__ */ bind(bindEffect);
  var mapFlipped2 = /* @__PURE__ */ mapFlipped(functorEffect);
  var liftST3 = /* @__PURE__ */ liftST(monadSTEffect);
  var mempty3 = /* @__PURE__ */ mempty(/* @__PURE__ */ monoidEffect(/* @__PURE__ */ monoidEffect(monoidUnit)));
  var map11 = /* @__PURE__ */ map(functorMaybe);
  var $$void7 = /* @__PURE__ */ $$void(functorEffect);
  var runInElement$prime = function(elt) {
    return function(eee) {
      return function __do2() {
        var ffi = makeFFIDOMSnapshot();
        var evt = mapFlipped2(liftST3(newSTRef(0)))(function() {
          var $39 = deku(elt)(eee);
          return function($40) {
            return $39(fullDOMInterpret($40));
          };
        }())();
        return subscribe(evt)(function(i2) {
          return i2(ffi);
        })();
      };
    };
  };
  var runInBody$prime = function(eee) {
    return function __do2() {
      var b$prime = bind4(bind4(windowImpl)(document2))(body2)();
      return maybe(mempty3)(function(elt) {
        return runInElement$prime(elt)(eee);
      })(map11(toElement)(b$prime))();
    };
  };
  var runInBody = function(a2) {
    return $$void7(runInBody$prime(a2));
  };

  // output/Effect.Console/foreign.js
  var log2 = function(s2) {
    return function() {
      console.log(s2);
    };
  };

  // output/Effect.Class.Console/index.js
  var log3 = function(dictMonadEffect) {
    var $51 = liftEffect(dictMonadEffect);
    return function($52) {
      return $51(log2($52));
    };
  };

  // output/FRP.Event.AnimationFrame/index.js
  var $runtime_lazy5 = function(name15, moduleName, init4) {
    var state4 = 0;
    var val;
    return function(lineNumber) {
      if (state4 === 2)
        return val;
      if (state4 === 1)
        throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state4 = 1;
      val = init4();
      state4 = 2;
      return val;
    };
  };
  var $$void8 = /* @__PURE__ */ $$void(functorEffect);
  var unlessM2 = /* @__PURE__ */ unlessM(monadEffect);
  var animationFrame = /* @__PURE__ */ makeEvent(function(k) {
    return function __do2() {
      var w = windowImpl();
      var cancelled = $$new(false)();
      var $lazy_loop = $runtime_lazy5("loop", "FRP.Event.AnimationFrame", function() {
        return $$void8(requestAnimationFrame(function __do3() {
          k(unit)();
          return unlessM2(read(cancelled))($lazy_loop(19))();
        })(w));
      });
      var loop2 = $lazy_loop(16);
      loop2();
      return write(true)(cancelled);
    };
  });

  // output/FRP.Behavior/index.js
  var ABehavior = function(x) {
    return x;
  };
  var sample = function(v) {
    return function(e) {
      return v(e);
    };
  };
  var functorABehavior = function(dictFunctor) {
    var map17 = map(dictFunctor);
    return {
      map: function(f) {
        return function(v) {
          return function(e) {
            return v(map17(function(v1) {
              return function($211) {
                return v1(f($211));
              };
            })(e));
          };
        };
      }
    };
  };
  var sampleBy = function(dictFunctor) {
    var map17 = map(functorABehavior(dictFunctor));
    var map18 = map(dictFunctor);
    return function(f) {
      return function(b2) {
        return function(e) {
          return sample(map17(f)(b2))(map18(applyFlipped)(e));
        };
      };
    };
  };
  var sample_ = function(dictFunctor) {
    return sampleBy(dictFunctor)($$const);
  };
  var behavior = ABehavior;

  // output/Effect.Now/foreign.js
  function now() {
    return Date.now();
  }

  // output/FRP.Event.Time/index.js
  var withTime = function(e) {
    return makeEvent(function(k) {
      return subscribe(e)(function(value12) {
        return function __do2() {
          var time4 = now();
          return k({
            time: time4,
            value: value12
          })();
        };
      });
    });
  };

  // output/Data.Variant/index.js
  var onMatch = function() {
    return function() {
      return function() {
        return function(r) {
          return function(k) {
            return function(v) {
              if (unsafeHas(v.type)(r)) {
                return unsafeGet(v.type)(r)(v.value);
              }
              ;
              return k(v);
            };
          };
        };
      };
    };
  };
  var onMatch1 = /* @__PURE__ */ onMatch()()();
  var inj = function() {
    return function(dictIsSymbol) {
      var reflectSymbol2 = reflectSymbol(dictIsSymbol);
      return function(p2) {
        return function(value12) {
          return {
            type: reflectSymbol2(p2),
            value: value12
          };
        };
      };
    };
  };
  var case_ = function(r) {
    return unsafeCrashWith("Data.Variant: pattern match failure [" + (r.type + "]"));
  };
  var match = function() {
    return function() {
      return function() {
        return function(r) {
          return onMatch1(r)(case_);
        };
      };
    };
  };

  // output/Data.List.NonEmpty/index.js
  var singleton9 = /* @__PURE__ */ function() {
    var $200 = singleton2(plusList);
    return function($201) {
      return NonEmptyList($200($201));
    };
  }();

  // output/Data.String.CodePoints/foreign.js
  var hasArrayFrom = typeof Array.from === "function";
  var hasStringIterator = typeof Symbol !== "undefined" && Symbol != null && typeof Symbol.iterator !== "undefined" && typeof String.prototype[Symbol.iterator] === "function";
  var hasFromCodePoint = typeof String.prototype.fromCodePoint === "function";
  var hasCodePointAt = typeof String.prototype.codePointAt === "function";

  // output/Simple.JSON/foreign.js
  var _parseJSON = JSON.parse;
  var _unsafeStringify = JSON.stringify;

  // output/Control.Monad.Except/index.js
  var unwrap3 = /* @__PURE__ */ unwrap();
  var runExcept = function($3) {
    return unwrap3(runExceptT($3));
  };

  // output/Foreign/foreign.js
  function tagOf(value12) {
    return Object.prototype.toString.call(value12).slice(8, -1);
  }
  var isArray = Array.isArray || function(value12) {
    return Object.prototype.toString.call(value12) === "[object Array]";
  };

  // output/Foreign/index.js
  var TypeMismatch2 = /* @__PURE__ */ function() {
    function TypeMismatch3(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    TypeMismatch3.create = function(value0) {
      return function(value1) {
        return new TypeMismatch3(value0, value1);
      };
    };
    return TypeMismatch3;
  }();
  var unsafeFromForeign = unsafeCoerce2;
  var fail = function(dictMonad) {
    var $153 = throwError(monadThrowExceptT(dictMonad));
    return function($154) {
      return $153(singleton9($154));
    };
  };
  var unsafeReadTagged = function(dictMonad) {
    var pure16 = pure(applicativeExceptT(dictMonad));
    var fail1 = fail(dictMonad);
    return function(tag) {
      return function(value12) {
        if (tagOf(value12) === tag) {
          return pure16(unsafeFromForeign(value12));
        }
        ;
        if (otherwise) {
          return fail1(new TypeMismatch2(tag, tagOf(value12)));
        }
        ;
        throw new Error("Failed pattern match at Foreign (line 123, column 1 - line 123, column 104): " + [tag.constructor.name, value12.constructor.name]);
      };
    };
  };
  var readString = function(dictMonad) {
    return unsafeReadTagged(dictMonad)("String");
  };

  // output/Ocarina.Core/index.js
  var onIsSymbol = {
    reflectSymbol: function() {
      return "on";
    }
  };
  var inj2 = /* @__PURE__ */ inj();
  var pure6 = /* @__PURE__ */ pure(applicativeEvent);
  var wrap3 = /* @__PURE__ */ wrap();
  var inj1 = /* @__PURE__ */ inj2({
    reflectSymbol: function() {
      return "onOff";
    }
  });
  var TTT7 = /* @__PURE__ */ function() {
    function TTT72() {
    }
    ;
    TTT72.value = new TTT72();
    return TTT72;
  }();
  var TTT8 = /* @__PURE__ */ function() {
    function TTT82() {
    }
    ;
    TTT82.value = new TTT82();
    return TTT82;
  }();
  var TTT9 = /* @__PURE__ */ function() {
    function TTT92() {
    }
    ;
    TTT92.value = new TTT92();
    return TTT92;
  }();
  var TTT10 = /* @__PURE__ */ function() {
    function TTT102() {
    }
    ;
    TTT102.value = new TTT102();
    return TTT102;
  }();
  var TTT11 = /* @__PURE__ */ function() {
    function TTT112() {
    }
    ;
    TTT112.value = new TTT112();
    return TTT112;
  }();
  var TTT12 = /* @__PURE__ */ function() {
    function TTT122() {
    }
    ;
    TTT122.value = new TTT122();
    return TTT122;
  }();
  var TTT13 = /* @__PURE__ */ function() {
    function TTT132() {
    }
    ;
    TTT132.value = new TTT132();
    return TTT132;
  }();
  var InitializeGain = function(x) {
    return x;
  };
  var InitializeSinOsc = function(x) {
    return x;
  };
  var Speakers = /* @__PURE__ */ function() {
    function Speakers2() {
    }
    ;
    Speakers2.value = new Speakers2();
    return Speakers2;
  }();
  var Discrete = /* @__PURE__ */ function() {
    function Discrete2() {
    }
    ;
    Discrete2.value = new Discrete2();
    return Discrete2;
  }();
  var ClampedMax = /* @__PURE__ */ function() {
    function ClampedMax2() {
    }
    ;
    ClampedMax2.value = new ClampedMax2();
    return ClampedMax2;
  }();
  var Max3 = /* @__PURE__ */ function() {
    function Max4() {
    }
    ;
    Max4.value = new Max4();
    return Max4;
  }();
  var Explicit = /* @__PURE__ */ function() {
    function Explicit2() {
    }
    ;
    Explicit2.value = new Explicit2();
    return Explicit2;
  }();
  var FFIAudioParameter = function(x) {
    return x;
  };
  var _on = /* @__PURE__ */ function() {
    return inj2(onIsSymbol)($$Proxy.value)(unit);
  }();
  var apOn = {
    x: _on,
    o: 0
  };
  var bangOn = function() {
    return pure6(wrap3(inj1($$Proxy.value)(apOn)));
  };

  // output/Ocarina.Common/index.js
  var identity10 = /* @__PURE__ */ identity(categoryFn);
  var convertOptionsRecord2 = /* @__PURE__ */ convertOptionsRecord();
  var convertRecordOptionsCons2 = /* @__PURE__ */ convertRecordOptionsCons(convertRecordOptionsNil);
  var defaultsRecord2 = /* @__PURE__ */ defaultsRecord()();
  var bufferIsSymbol = {
    reflectSymbol: function() {
      return "buffer";
    }
  };
  var PlayBufOptions = /* @__PURE__ */ function() {
    function PlayBufOptions2() {
    }
    ;
    PlayBufOptions2.value = new PlayBufOptions2();
    return PlayBufOptions2;
  }();
  var initialSinOscNumber = {
    toInitializeSinOsc: function($425) {
      return InitializeSinOsc(function(v) {
        return {
          frequency: v
        };
      }($425));
    }
  };
  var initialGainNumber = {
    toInitializeGain: function($429) {
      return InitializeGain(function(v) {
        return {
          gain: v
        };
      }($429));
    }
  };
  var convertOptionPlayBufOptio = {
    convertOption: function(v) {
      return function(v1) {
        return identity10;
      };
    }
  };
  var toInitializeSinOsc = function(dict) {
    return dict.toInitializeSinOsc;
  };
  var toInitializePlayBuf = function(dict) {
    return dict.toInitializePlayBuf;
  };
  var toInitializeGain = function(dict) {
    return dict.toInitializeGain;
  };
  var defaultPlayBuf = /* @__PURE__ */ function() {
    return {
      bufferOffset: 0,
      playbackRate: 1,
      duration: Nothing.value
    };
  }();
  var initialPlayBufRecord = function(dictConvertOptionsWithDefaults) {
    var convertOptionsWithDefaults2 = convertOptionsWithDefaults(dictConvertOptionsWithDefaults);
    return {
      toInitializePlayBuf: function(provided) {
        return convertOptionsWithDefaults2(PlayBufOptions.value)(defaultPlayBuf)(provided);
      }
    };
  };
  var initialPlayBufBrowserAudi = {
    toInitializePlayBuf: /* @__PURE__ */ function() {
      var $434 = toInitializePlayBuf(initialPlayBufRecord(convertOptionsWithDefaultsRecord(convertOptionsRecord2(convertRecordOptionsCons2(convertOptionPlayBufOptio)()()()(bufferIsSymbol)))(defaultsRecord2)));
      return function($435) {
        return $434(function(v) {
          return {
            buffer: v
          };
        }($435));
      };
    }()
  };

  // output/Ocarina.Control/index.js
  var $runtime_lazy6 = function(name15, moduleName, init4) {
    var state4 = 0;
    var val;
    return function(lineNumber) {
      if (state4 === 2)
        return val;
      if (state4 === 1)
        throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state4 = 1;
      val = init4();
      state4 = 2;
      return val;
    };
  };
  var identity11 = /* @__PURE__ */ identity(categoryFn);
  var unwrap4 = /* @__PURE__ */ unwrap();
  var pure7 = /* @__PURE__ */ pure(applicativeEffect);
  var pure14 = /* @__PURE__ */ pure(applicativeEvent);
  var pure23 = /* @__PURE__ */ pure(applicativeST);
  var oneOf4 = /* @__PURE__ */ oneOf(foldableArray)(plusEvent);
  var map12 = /* @__PURE__ */ map(functorEvent);
  var match2 = /* @__PURE__ */ match()()();
  var empty7 = /* @__PURE__ */ empty(plusEvent);
  var inj3 = /* @__PURE__ */ inj();
  var alt7 = /* @__PURE__ */ alt(altEvent);
  var $$void9 = /* @__PURE__ */ $$void(functorST);
  var keepLatest4 = /* @__PURE__ */ keepLatest(eventIsEvent);
  var AnalyserOptions = /* @__PURE__ */ function() {
    function AnalyserOptions2() {
    }
    ;
    AnalyserOptions2.value = new AnalyserOptions2();
    return AnalyserOptions2;
  }();
  var convertOptionAnalyserOpti = {
    convertOption: function(v) {
      return function(v1) {
        return identity11;
      };
    }
  };
  var convertOptionAnalyserOpti1 = {
    convertOption: function(v) {
      return function(v1) {
        return identity11;
      };
    }
  };
  var toInitializeAnalyser = function(dict) {
    return dict.toInitializeAnalyser;
  };
  var scopeToMaybe = function(v) {
    if (v instanceof Global) {
      return Nothing.value;
    }
    ;
    if (v instanceof Local) {
      return new Just(v.value0);
    }
    ;
    throw new Error("Failed pattern match at Ocarina.Control (line 38, column 1 - line 38, column 38): " + [v.constructor.name]);
  };
  var defaultAnalyser = /* @__PURE__ */ function() {
    return {
      cb: function(v) {
        return pure7(pure7(unit));
      },
      fftSize: TTT11.value,
      maxDecibels: -30,
      minDecibels: -100,
      smoothingTimeConstant: 0.8,
      channelCount: 2,
      channelCountMode: Max3.value,
      channelInterpretation: Speakers.value
    };
  }();
  var initialAnalyserRecord = function(dictConvertOptionsWithDefaults) {
    var convertOptionsWithDefaults2 = convertOptionsWithDefaults(dictConvertOptionsWithDefaults);
    return {
      toInitializeAnalyser: function(provided) {
        return convertOptionsWithDefaults2(AnalyserOptions.value)(defaultAnalyser)(provided);
      }
    };
  };
  var __internalOcarinaFlatten = /* @__PURE__ */ flatten({
    doLogic: absurd,
    ids: function($818) {
      return function(v) {
        return v.ids;
      }(unwrap4($818));
    },
    disconnectElement: function(v) {
      return function(v1) {
        return v.disconnectXFromY({
          from: v1.id,
          to: v1.parent
        });
      };
    },
    toElt: function(v) {
      return v;
    }
  });
  var analyser = function(dictInitialAnalyser) {
    var toInitializeAnalyser2 = toInitializeAnalyser(dictInitialAnalyser);
    return function(i$prime) {
      return function(atts) {
        return function(elts) {
          var v = toInitializeAnalyser2(i$prime);
          var go2 = function(parent2) {
            return function(v1) {
              return makeLemmingEventO(function(v2, k) {
                var me = v1.ids();
                parent2.raiseId(me)();
                var unsub = v2(oneOf4([pure14(v1.makeAnalyser({
                  id: me,
                  parent: parent2.parent,
                  scope: scopeToMaybe(parent2.scope),
                  cb: v.cb,
                  fftSize: pow(2)(function() {
                    if (v.fftSize instanceof TTT7) {
                      return 7;
                    }
                    ;
                    if (v.fftSize instanceof TTT8) {
                      return 8;
                    }
                    ;
                    if (v.fftSize instanceof TTT9) {
                      return 9;
                    }
                    ;
                    if (v.fftSize instanceof TTT10) {
                      return 10;
                    }
                    ;
                    if (v.fftSize instanceof TTT11) {
                      return 11;
                    }
                    ;
                    if (v.fftSize instanceof TTT12) {
                      return 12;
                    }
                    ;
                    if (v.fftSize instanceof TTT13) {
                      return 13;
                    }
                    ;
                    throw new Error("Failed pattern match at Ocarina.Control (line 198, column 27 - line 205, column 40): " + [v.fftSize.constructor.name]);
                  }()),
                  maxDecibels: v.maxDecibels,
                  minDecibels: v.minDecibels,
                  smoothingTimeConstant: v.smoothingTimeConstant,
                  channelCount: v.channelCount,
                  channelCountMode: function() {
                    if (v.channelCountMode instanceof Explicit) {
                      return "explicit";
                    }
                    ;
                    if (v.channelCountMode instanceof Max3) {
                      return "max";
                    }
                    ;
                    if (v.channelCountMode instanceof ClampedMax) {
                      return "clamped-max";
                    }
                    ;
                    throw new Error("Failed pattern match at Ocarina.Control (line 211, column 41 - line 214, column 52): " + [v.channelCountMode.constructor.name]);
                  }(),
                  channelInterpretation: function() {
                    if (v.channelInterpretation instanceof Speakers) {
                      return "speakers";
                    }
                    ;
                    if (v.channelInterpretation instanceof Discrete) {
                      return "discrete";
                    }
                    ;
                    throw new Error("Failed pattern match at Ocarina.Control (line 215, column 46 - line 217, column 47): " + [v.channelInterpretation.constructor.name]);
                  }()
                })), map12(function(v3) {
                  return match2({
                    cb: function(cb2) {
                      return v1.setAnalyserNodeCb({
                        id: me,
                        cb: cb2
                      });
                    }
                  })(v3);
                })(atts), __internalOcarinaFlatten({
                  parent: new Just(me),
                  scope: parent2.scope,
                  raiseId: function(v3) {
                    return pure23(unit);
                  }
                })(v1)(fixed(elts))]), k);
                return function __do2() {
                  k(v1.deleteFromCache({
                    id: me
                  }));
                  return unsub();
                };
              });
            };
          };
          return new Element$prime(go2);
        };
      };
    };
  };
  var analyser_ = function(dictInitialAnalyser) {
    var analyser1 = analyser(dictInitialAnalyser);
    return function(i2) {
      return analyser1(i2)(empty7);
    };
  };
  var speaker = function(elts) {
    return function(v) {
      return makeLemmingEventO(function(v1, k) {
        var id2 = v.ids();
        k(v.makeSpeaker({
          id: id2
        }));
        return v1(__internalOcarinaFlatten({
          parent: new Just(id2),
          scope: new Local("toplevel"),
          raiseId: function(v2) {
            return pure23(unit);
          }
        })(v)(fixed(elts)), k);
      });
    };
  };
  var speaker2 = speaker;
  var gain_ = function(dictInitialGain) {
    return function(i2) {
      return function(a2) {
        return gain(dictInitialGain)(i2)(empty7)(a2);
      };
    };
  };
  var gain = function(dictInitialGain) {
    var toInitializeGain2 = toInitializeGain(dictInitialGain);
    return function(i$prime) {
      return function(atts) {
        return function(elts) {
          var v = toInitializeGain2(i$prime);
          var go2 = function(parent2) {
            return function(v1) {
              return makeLemmingEventO(function(v2, k) {
                var me = v1.ids();
                parent2.raiseId(me)();
                var unsub = v2(oneOf4([pure14(v1.makeGain({
                  id: me,
                  parent: parent2.parent,
                  scope: scopeToMaybe(parent2.scope),
                  gain: v.gain
                })), keepLatest4(map12(function(v3) {
                  return match2({
                    gain: $lazy_tmpResolveAU(639)(parent2.scope)(v1)(function($819) {
                      return v1.setGain(function(v4) {
                        return {
                          id: me,
                          gain: v4
                        };
                      }($819));
                    })
                  })(v3);
                })(atts)), __internalOcarinaFlatten({
                  parent: new Just(me),
                  scope: parent2.scope,
                  raiseId: function(v3) {
                    return pure23(unit);
                  }
                })(v1)(fixed(elts))]), k);
                return function __do2() {
                  k(v1.deleteFromCache({
                    id: me
                  }));
                  return unsub();
                };
              });
            };
          };
          return new Element$prime(go2);
        };
      };
    };
  };
  var $lazy_tmpResolveAU = /* @__PURE__ */ $runtime_lazy6("tmpResolveAU", "Ocarina.Control", function() {
    var ut = function() {
      var $820 = inj3({
        reflectSymbol: function() {
          return "unit";
        }
      })($$Proxy.value);
      return function($821) {
        return FFIAudioParameter($820($821));
      };
    }();
    var sdn = function() {
      var $822 = inj3({
        reflectSymbol: function() {
          return "sudden";
        }
      })($$Proxy.value);
      return function($823) {
        return FFIAudioParameter($822($823));
      };
    }();
    var nmc = function() {
      var $824 = inj3({
        reflectSymbol: function() {
          return "numeric";
        }
      })($$Proxy.value);
      return function($825) {
        return FFIAudioParameter($824($825));
      };
    }();
    var ev = function() {
      var $826 = inj3({
        reflectSymbol: function() {
          return "envelope";
        }
      })($$Proxy.value);
      return function($827) {
        return FFIAudioParameter($826($827));
      };
    }();
    var cncl = function() {
      var $828 = inj3({
        reflectSymbol: function() {
          return "cancel";
        }
      })($$Proxy.value);
      return function($829) {
        return FFIAudioParameter($828($829));
      };
    }();
    var go2 = function(scope2) {
      return function(di) {
        return function(f) {
          return function(v) {
            return match2({
              numeric: function($830) {
                return pure14(f(nmc($830)));
              },
              envelope: function($831) {
                return pure14(f(ev($831)));
              },
              cancel: function($832) {
                return pure14(f(cncl($832)));
              },
              sudden: function($833) {
                return pure14(f(sdn($833)));
              },
              unit: function(v1) {
                var n = gain_(initialGainNumber)(1)([v1.u]);
                return makeLemmingEventO(function(v2, k) {
                  var av = newSTRef(Nothing.value)();
                  return v2(alt7(__internalOcarinaFlatten({
                    parent: Nothing.value,
                    scope: scope2,
                    raiseId: function(x) {
                      return $$void9(write2(new Just(x))(av));
                    }
                  })(di)(n))(makeLemmingEventO(function(v3, k2) {
                    (function __do2() {
                      var v4 = read2(av)();
                      if (v4 instanceof Nothing) {
                        return unit;
                      }
                      ;
                      if (v4 instanceof Just) {
                        return k2(f(ut({
                          i: v4.value0
                        })));
                      }
                      ;
                      throw new Error("Failed pattern match at Ocarina.Control (line 1831, column 42 - line 1833, column 80): " + [v4.constructor.name]);
                    })();
                    return pure23(unit);
                  })), k);
                });
              }
            })(v);
          };
        };
      };
    };
    return go2;
  });
  var tmpResolveAU = /* @__PURE__ */ $lazy_tmpResolveAU(1808);
  var __playBuf = function(dictInitialPlayBuf) {
    var toInitializePlayBuf1 = toInitializePlayBuf(dictInitialPlayBuf);
    return function(i$prime) {
      return function(atts) {
        var v = toInitializePlayBuf1(i$prime);
        var go2 = function(parent2) {
          return function(v1) {
            return makeLemmingEventO(function(v2, k) {
              var me = v1.ids();
              parent2.raiseId(me)();
              var unsub = v2(oneOf4([pure14(v1.makePlayBuf({
                id: me,
                parent: parent2.parent,
                scope: scopeToMaybe(parent2.scope),
                buffer: v.buffer,
                playbackRate: v.playbackRate,
                bufferOffset: v.bufferOffset,
                duration: v.duration
              })), keepLatest4(map12(function(v3) {
                return match2({
                  buffer: function(buffer2) {
                    return pure14(v1.setBuffer({
                      id: me,
                      buffer: buffer2
                    }));
                  },
                  playbackRate: tmpResolveAU(parent2.scope)(v1)(function($836) {
                    return v1.setPlaybackRate(function(v4) {
                      return {
                        id: me,
                        playbackRate: v4
                      };
                    }($836));
                  }),
                  bufferOffset: function(bufferOffset) {
                    return pure14(v1.setBufferOffset({
                      id: me,
                      bufferOffset
                    }));
                  },
                  onOff: function(onOff) {
                    return pure14(v1.setOnOff({
                      id: me,
                      onOff
                    }));
                  },
                  duration: function(duration2) {
                    return pure14(v1.setDuration({
                      id: me,
                      duration: duration2
                    }));
                  }
                })(v3);
              })(atts))]), k);
              return function __do2() {
                k(v1.deleteFromCache({
                  id: me
                }));
                return unsub();
              };
            });
          };
        };
        return new Element$prime(go2);
      };
    };
  };
  var playBuf = function(dictInitialPlayBuf) {
    return __playBuf(dictInitialPlayBuf);
  };
  var __sinOsc = function(dictInitialSinOsc) {
    var toInitializeSinOsc2 = toInitializeSinOsc(dictInitialSinOsc);
    return function(i$prime) {
      return function(atts) {
        var v = toInitializeSinOsc2(i$prime);
        var go2 = function(parent2) {
          return function(v1) {
            return makeLemmingEventO(function(v2, k) {
              var me = v1.ids();
              parent2.raiseId(me)();
              var unsub = v2(oneOf4([pure14(v1.makeSinOsc({
                id: me,
                parent: parent2.parent,
                scope: scopeToMaybe(parent2.scope),
                frequency: v.frequency
              })), keepLatest4(map12(function(v3) {
                return match2({
                  frequency: tmpResolveAU(parent2.scope)(v1)(function($838) {
                    return v1.setFrequency(function(v4) {
                      return {
                        id: me,
                        frequency: v4
                      };
                    }($838));
                  }),
                  onOff: function(onOff) {
                    return pure14(v1.setOnOff({
                      id: me,
                      onOff
                    }));
                  }
                })(v3);
              })(atts))]), k);
              return function __do2() {
                k(v1.deleteFromCache({
                  id: me
                }));
                return unsub();
              };
            });
          };
        };
        return new Element$prime(go2);
      };
    };
  };
  var sinOsc = function(dictInitialSinOsc) {
    return __sinOsc(dictInitialSinOsc);
  };

  // output/Ocarina.Interpret/foreign.js
  var NUMERIC = "numeric";
  var SUDDEN = "sudden";
  var UNIT = "unit";
  var CANCEL = "cancel";
  var NO_RAMP = "step";
  var LINEAR_RAMP = "linear";
  var EXPONENTIAL_RAMP = "exponential";
  var ENVELOPE = "envelope";
  var protoSetter = function(thingee, ctrl, param2, state4) {
    if (param2.type === SUDDEN) {
      thingee.value = param2.value.n;
    } else if (param2.type === UNIT) {
      if (ctrl.id) {
        disconnectCtrl(ctrl.id, state4);
      }
      state4.units[param2.value.i].main.connect(thingee);
      ctrl.id = param2.value.i;
    } else {
      if (param2.type === NUMERIC) {
        thingee[param2.value.t.type === NO_RAMP ? "setValueAtTime" : param2.value.t.type === LINEAR_RAMP ? "linearRampToValueAtTime" : param2.value.t.type === EXPONENTIAL_RAMP ? "exponentialRampToValueAtTime" : "linearRampToValueAtTime"](param2.value.n, param2.value.o);
      } else if (param2.type === CANCEL) {
        param2.value.hold ? thingee.cancelAndHoldAtTime(param2.value.o) : thingee.cancelScheduledValues(param2.value.o);
      } else if (param2.type === ENVELOPE) {
        const tm = param2.value.o;
        thingee.cancelScheduledValues(Math.max(0, tm));
        thingee.setValueCurveAtTime(param2.value.p, tm, param2.value.d);
      } else {
        throw new Error("No idea what to do with " + JSON.stringify(param2));
      }
    }
  };
  var workletSetter = function(state4, unit2, paramName, controllers, param2) {
    if (!controllers[paramName]) {
      controllers[paramName] = {};
    }
    return protoSetter(unit2.parameters.get(paramName), controllers[paramName], param2, state4);
  };
  var genericSetter = function(state4, unit2, name15, controllers, param2) {
    if (!controllers[name15]) {
      controllers[name15] = {};
    }
    return protoSetter(unit2[name15], controllers[name15], param2, state4);
  };
  var addToScope = function(mbe, ptr, scope$, state4) {
    const scope2 = mbe("@fan@")((x) => x)(scope$);
    if (!state4.scopes[scope2]) {
      state4.scopes[scope2] = [];
    }
    state4.scopes[scope2].push(ptr);
    state4.units[ptr].scope = scope2;
  };
  var doDeferredConnections = function(ptr, state4) {
    if (state4.toConnect[ptr]) {
      state4.toConnect[ptr].forEach(function(conn) {
        if (conn.w) {
          if (state4.units[conn.w]) {
            conn.f();
          } else {
            if (!state4.toConnect[conn.w]) {
              state4.toConnect[conn.w] = [];
            }
            state4.toConnect[conn.w].push({ f: conn.f });
          }
        } else {
          conn.f();
        }
      });
      delete state4.toConnect[ptr];
    }
  };
  var mConnectXToY_ = function(mbe, x, y$, state4) {
    mbe()((y) => connectXToYInternal_(x, y, state4))(y$);
  };
  var connectXToYInternal_ = function(x, y, state4) {
    var connectF = function() {
      state4.units[x].audioOutgoing.push(y);
      if (!state4.units[x].pendingOn) {
        state4.units[x].main.connect(state4.units[y].main);
        if (state4.units[y].se) {
          state4.units[x].main.connect(state4.units[y].se);
        }
      }
    };
    if (!state4.units[x]) {
      if (!state4.toConnect[x]) {
        state4.toConnect[x] = [];
      }
      var conn = { f: connectF };
      if (y !== x && !state4.units[y]) {
        conn.w = y;
      }
      state4.toConnect[x].push(conn);
      return;
    }
    if (!state4.units[y]) {
      if (!state4.toConnect[y]) {
        state4.toConnect[y] = [];
      }
      var conn = { f: connectF };
      if (y !== x && !state4.units[x]) {
        conn.w = x;
      }
      state4.toConnect[y].push(conn);
      return;
    }
    connectF();
  };
  function deleteFromCache_2(a2) {
    return function(state4) {
      return function() {
        delete state4.units[a2.id];
      };
    };
  }
  function connectXToY_(parameters) {
    return function(state4) {
      return function() {
        connectXToYInternal_(parameters["from"], parameters["to"], state4);
      };
    };
  }
  var disconnectCtrl = function(ptr, state4) {
    if (state4.units[ptr].scope === "@fan@") {
      return;
    }
    const scope2 = state4.units[ptr].scope;
    state4.scopes[scope2].forEach((scp) => {
      delete state4.units[scp];
    });
    delete state4.scopes[scope2];
  };
  function disconnectXFromY_(a2) {
    return function(state4) {
      return function() {
        var x = a2.from;
        var y = a2.to;
        if (!state4.units[x]) {
          return;
        }
        state4.units[x].audioOutgoing = state4.units[x].audioOutgoing.filter(function(i2) {
          return !(i2 === y);
        });
        state4.units[x].main.disconnect(state4.units[y].main);
        if (state4.units[y].se) {
          state4.units[x].main.disconnect(state4.units[y].se);
        }
        if (state4.units[x].scope === "@fan@") {
          return;
        }
        const scope2 = state4.units[x].scope;
        state4.scopes[scope2].forEach((scp) => {
          delete state4.units[scp];
        });
        delete state4.scopes[scope2];
      };
    };
  }
  var makeAllpass_ = (mbe) => (a2) => (state4) => () => {
    var ptr = a2.id;
    state4.units[ptr] = {
      controllers: {},
      audioOutgoing: [],
      controlOutgoing: [],
      main: new BiquadFilterNode(state4.context, {
        type: "allpass",
        Q: a2.q,
        frequency: a2.frequency
      })
    };
    addToScope(mbe, ptr, a2.scope, state4);
    doDeferredConnections(ptr, state4);
    mConnectXToY_(mbe, ptr, a2.parent, state4);
  };
  var makeAnalyser_ = (mbe) => (a2) => (state4) => () => {
    var ptr = a2.id;
    var analyserSideEffectFunction = a2.cb;
    var dest = new AnalyserNode(state4.context, a2);
    var unsubscribe = analyserSideEffectFunction(dest)();
    state4.units[ptr] = {
      controllers: {},
      audioOutgoing: [],
      controlOutgoing: [],
      analyserOrig: analyserSideEffectFunction,
      analyser: unsubscribe,
      main: state4.context.createGain(),
      se: dest
    };
    addToScope(mbe, ptr, a2.scope, state4);
    doDeferredConnections(ptr, state4);
    mConnectXToY_(mbe, ptr, a2.parent, state4);
  };
  var makeAudioWorkletNode_ = (mbe) => (a2) => (state4) => () => {
    var ptr = a2.id;
    var opts = a2.options;
    state4.units[ptr] = {
      controllers: {},
      audioOutgoing: [],
      controlOutgoing: [],
      main: new AudioWorkletNode(state4.context, opts.name, {
        numberOfInputs: opts.numberOfInputs,
        numberOfOutputs: opts.numberOfOutputs,
        outputChannelCount: opts.outputChannelCount,
        parameterData: opts.parameterData,
        processorOptions: opts.processorOptions
      })
    };
    addToScope(mbe, ptr, a2.scope, state4);
    doDeferredConnections(ptr, state4);
    mConnectXToY_(mbe, ptr, a2.parent, state4);
  };
  var makeBandpass_ = (mbe) => (a2) => (state4) => () => {
    var ptr = a2.id;
    state4.units[ptr] = {
      controllers: {},
      audioOutgoing: [],
      controlOutgoing: [],
      main: new BiquadFilterNode(state4.context, {
        type: "bandpass",
        Q: a2.q,
        frequency: a2.frequency
      })
    };
    addToScope(mbe, ptr, a2.scope, state4);
    doDeferredConnections(ptr, state4);
    mConnectXToY_(mbe, ptr, a2.parent, state4);
  };
  var makeConstant_ = (mbe) => (a2) => (state4) => () => {
    var ptr = a2.id;
    var createClosure = function(context4, i2) {
      return new ConstantSourceNode(context4, i2);
    };
    var resume = { offset: a2.offset };
    state4.units[ptr] = {
      controllers: {},
      audioOutgoing: [],
      controlOutgoing: [],
      resume,
      createClosure,
      onOff: false,
      pendingOn: true,
      main: createClosure(state4.context, resume)
    };
    addToScope(mbe, ptr, a2.scope, state4);
    doDeferredConnections(ptr, state4);
    mConnectXToY_(mbe, ptr, a2.parent, state4);
  };
  var makeConvolver_ = (mbe) => (a2) => (state4) => () => {
    var ptr = a2.id;
    state4.units[ptr] = {
      controllers: {},
      audioOutgoing: [],
      controlOutgoing: [],
      main: new ConvolverNode(state4.context, { buffer: a2.buffer })
    };
    addToScope(mbe, ptr, a2.scope, state4);
    doDeferredConnections(ptr, state4);
    mConnectXToY_(mbe, ptr, a2.parent, state4);
  };
  var makeDelay_ = (mbe) => (a2) => (state4) => () => {
    var ptr = a2.id;
    state4.units[ptr] = {
      controllers: {},
      audioOutgoing: [],
      controlOutgoing: [],
      main: new DelayNode(state4.context, {
        delayTime: a2.delayTime,
        maxDelayTime: a2.maxDelayTime
      })
    };
    addToScope(mbe, ptr, a2.scope, state4);
    doDeferredConnections(ptr, state4);
    mConnectXToY_(mbe, ptr, a2.parent, state4);
  };
  var makeDynamicsCompressor_ = (mbe) => (a2) => (state4) => () => {
    var ptr = a2.id;
    state4.units[ptr] = {
      controllers: {},
      audioOutgoing: [],
      controlOutgoing: [],
      main: new DynamicsCompressorNode(state4.context, {
        knee: a2.knee,
        ratio: a2.ratio,
        threshold: a2.threshold,
        attack: a2.attack,
        release: a2.release
      })
    };
    addToScope(mbe, ptr, a2.scope, state4);
    doDeferredConnections(ptr, state4);
    mConnectXToY_(mbe, ptr, a2.parent, state4);
  };
  var makeGain_ = (mbe) => (a2) => (state4) => () => {
    var ptr = a2.id;
    state4.units[ptr] = {
      controllers: {},
      audioOutgoing: [],
      controlOutgoing: [],
      main: new GainNode(state4.context, {
        gain: a2.gain
      })
    };
    addToScope(mbe, ptr, a2.scope, state4);
    doDeferredConnections(ptr, state4);
    mConnectXToY_(mbe, ptr, a2.parent, state4);
  };
  var makeHighpass_ = (mbe) => (a2) => (state4) => () => {
    var ptr = a2.id;
    state4.units[ptr] = {
      controllers: {},
      audioOutgoing: [],
      controlOutgoing: [],
      main: new BiquadFilterNode(state4.context, {
        type: "highpass",
        Q: a2.q,
        frequency: a2.frequency
      })
    };
    addToScope(mbe, ptr, a2.scope, state4);
    doDeferredConnections(ptr, state4);
    mConnectXToY_(mbe, ptr, a2.parent, state4);
  };
  var makeHighshelf_ = (mbe) => (a2) => (state4) => () => {
    var ptr = a2.id;
    state4.units[ptr] = {
      controllers: {},
      audioOutgoing: [],
      controlOutgoing: [],
      main: new BiquadFilterNode(state4.context, {
        type: "highshelf",
        frequency: a2.frequency,
        gain: a2.gain
      })
    };
    addToScope(mbe, ptr, a2.scope, state4);
    doDeferredConnections(ptr, state4);
    mConnectXToY_(mbe, ptr, a2.parent, state4);
  };
  var makeIIRFilter_ = (mbe) => (a2) => (state4) => () => {
    var ptr = a2.id;
    state4.units[ptr] = {
      controllers: {},
      audioOutgoing: [],
      controlOutgoing: [],
      main: new IIRFilterNode(state4.context, {
        feedforward: a2.feedforward,
        feedback: a2.feedback
      })
    };
    addToScope(mbe, ptr, a2.scope, state4);
    doDeferredConnections(ptr, state4);
    mConnectXToY_(mbe, ptr, a2.parent, state4);
  };
  var makeLoopBuf_ = (mbe) => (a2) => (state4) => () => {
    var ptr = a2.id;
    var createClosure = function(context4, i2) {
      return new AudioBufferSourceNode(context4, i2);
    };
    var resume = {
      loop: true,
      buffer: a2.buffer,
      loopStart: a2.loopStart,
      loopEnd: a2.loopEnd,
      playbackRate: a2.playbackRate
    };
    state4.units[ptr] = {
      controllers: {},
      audioOutgoing: [],
      controlOutgoing: [],
      resume,
      createClosure,
      onOff: false,
      pendingOn: true,
      main: createClosure(state4.context, resume)
    };
    addToScope(mbe, ptr, a2.scope, state4);
    doDeferredConnections(ptr, state4);
    mConnectXToY_(mbe, ptr, a2.parent, state4);
  };
  var makeLowpass_ = (mbe) => (a2) => (state4) => () => {
    var ptr = a2.id;
    state4.units[ptr] = {
      controllers: {},
      audioOutgoing: [],
      controlOutgoing: [],
      main: new BiquadFilterNode(state4.context, {
        type: "lowpass",
        Q: a2.q,
        frequency: a2.frequency
      })
    };
    addToScope(mbe, ptr, a2.scope, state4);
    doDeferredConnections(ptr, state4);
    mConnectXToY_(mbe, ptr, a2.parent, state4);
  };
  var makeLowshelf_ = (mbe) => (a2) => (state4) => () => {
    var ptr = a2.id;
    state4.units[ptr] = {
      controllers: {},
      audioOutgoing: [],
      controlOutgoing: [],
      main: new BiquadFilterNode(state4.context, {
        type: "lowshelf",
        frequency: a2.frequency,
        gain: a2.gain
      })
    };
    addToScope(mbe, ptr, a2.scope, state4);
    doDeferredConnections(ptr, state4);
    mConnectXToY_(mbe, ptr, a2.parent, state4);
  };
  var makeMediaElement_ = (mbe) => (a2) => (state4) => () => {
    var ptr = a2.id;
    var elt = a2.element;
    var createClosure = function() {
      var unit2 = state4.context.createMediaElementSource(elt);
      return unit2;
    };
    state4.units[ptr] = {
      controllers: {},
      audioOutgoing: [],
      controlOutgoing: [],
      createClosure,
      resumeClosure: {},
      main: createClosure()
    };
    addToScope(mbe, ptr, a2.scope, state4);
    doDeferredConnections(ptr, state4);
    mConnectXToY_(mbe, ptr, a2.parent, state4);
  };
  var makeMicrophone_ = (mbe) => (a2) => (state4) => () => {
    var ptr = a2.id;
    state4.units[a2.id] = {
      main: state4.context.createMediaStreamSource(a2.microphone),
      controllers: {},
      audioOutgoing: [],
      controlOutgoing: []
    };
    addToScope(mbe, ptr, a2.scope, state4);
    doDeferredConnections(ptr, state4);
    mConnectXToY_(mbe, ptr, a2.parent, state4);
  };
  var makeNotch_ = (mbe) => (a2) => (state4) => () => {
    var ptr = a2.id;
    state4.units[ptr] = {
      controllers: {},
      audioOutgoing: [],
      controlOutgoing: [],
      main: new BiquadFilterNode(state4.context, {
        type: "notch",
        frequency: a2.frequency,
        Q: a2.q
      })
    };
    addToScope(mbe, ptr, a2.scope, state4);
    doDeferredConnections(ptr, state4);
    mConnectXToY_(mbe, ptr, a2.parent, state4);
  };
  var makePeaking_ = (mbe) => (a2) => (state4) => () => {
    var ptr = a2.id;
    state4.units[ptr] = {
      controllers: {},
      audioOutgoing: [],
      controlOutgoing: [],
      main: new BiquadFilterNode(state4.context, {
        type: "peaking",
        frequency: a2.frequency,
        Q: a2.q,
        gain: a2.gain
      })
    };
    addToScope(mbe, ptr, a2.scope, state4);
    doDeferredConnections(ptr, state4);
    mConnectXToY_(mbe, ptr, a2.parent, state4);
  };
  var makePeriodicOsc_ = (mbe) => (a2) => (state4) => () => {
    var ptr = a2.id;
    var createClosure = function(context4, i2) {
      var opts = {
        frequency: i2.frequency,
        periodicWave: i2.spec.type === "wave" ? i2.spec.value : makePeriodicWaveImpl(state4.context)(i2.spec.value.real)(i2.spec.value.img)()
      };
      var o = new OscillatorNode(context4, opts);
      return o;
    };
    var resume = { frequency: a2.frequency, type: "custom", spec: a2.spec };
    state4.units[ptr] = {
      controllers: {},
      audioOutgoing: [],
      controlOutgoing: [],
      resume,
      createClosure,
      onOff: false,
      pendingOn: true,
      main: createClosure(state4.context, resume)
    };
    addToScope(mbe, ptr, a2.scope, state4);
    doDeferredConnections(ptr, state4);
    mConnectXToY_(mbe, ptr, a2.parent, state4);
  };
  var makePlayBuf_ = (mbe) => (a2) => (state4) => () => {
    var ptr = a2.id;
    var createClosure = function(context4, i2) {
      var opts = {
        loop: i2.loop,
        buffer: i2.buffer,
        playbackRate: i2.playbackRate
      };
      return new AudioBufferSourceNode(context4, opts);
    };
    var resume = {
      loop: false,
      buffer: a2.buffer,
      playbackRate: a2.playbackRate,
      bufferOffset: a2.bufferOffset,
      duration: mbe(void 0)((x) => x)(a2.duration)
    };
    state4.units[ptr] = {
      controllers: {},
      audioOutgoing: [],
      controlOutgoing: [],
      resume,
      createClosure,
      onOff: false,
      pendingOn: true,
      main: createClosure(state4.context, resume)
    };
    addToScope(mbe, ptr, a2.scope, state4);
    doDeferredConnections(ptr, state4);
    mConnectXToY_(mbe, ptr, a2.parent, state4);
  };
  var makeRecorder_ = (mbe) => (a2) => (state4) => () => {
    var ptr = a2.id;
    var mediaRecorderSideEffectFn = a2.cb;
    var dest = state4.context.createMediaStreamDestination();
    var mediaRecorder = new MediaRecorder(dest.stream);
    mediaRecorderSideEffectFn(mediaRecorder)();
    mediaRecorder.start();
    state4.units[ptr] = {
      controllers: {},
      audioOutgoing: [],
      controlOutgoing: [],
      recorderOrig: mediaRecorderSideEffectFn,
      recorder: mediaRecorder,
      main: state4.context.createGain(),
      se: dest
    };
    addToScope(mbe, ptr, a2.scope, state4);
    doDeferredConnections(ptr, state4);
    mConnectXToY_(mbe, ptr, a2.parent, state4);
  };
  var makeSawtoothOsc_ = (mbe) => (a2) => (state4) => () => {
    var ptr = a2.id;
    var createClosure = function(context4, i2) {
      return new OscillatorNode(context4, i2);
    };
    var resume = { frequency: a2.frequency, type: "sawtooth" };
    state4.units[ptr] = {
      controllers: {},
      audioOutgoing: [],
      controlOutgoing: [],
      resume,
      createClosure,
      onOff: false,
      pendingOn: true,
      main: createClosure(state4.context, resume)
    };
    addToScope(mbe, ptr, a2.scope, state4);
    doDeferredConnections(ptr, state4);
    mConnectXToY_(mbe, ptr, a2.parent, state4);
  };
  var makeSinOsc_ = (mbe) => (a2) => (state4) => () => {
    var ptr = a2.id;
    var createClosure = function(context4, i2) {
      return new OscillatorNode(context4, i2);
    };
    var resume = { frequency: a2.frequency, type: "sine" };
    state4.units[ptr] = {
      controllers: {},
      audioOutgoing: [],
      controlOutgoing: [],
      resume,
      createClosure,
      onOff: false,
      pendingOn: true,
      main: createClosure(state4.context, resume)
    };
    addToScope(mbe, ptr, a2.scope, state4);
    doDeferredConnections(ptr, state4);
    mConnectXToY_(mbe, ptr, a2.parent, state4);
  };
  var makeSpeaker_ = (a2) => (state4) => () => {
    state4.units[a2.id] = {
      controllers: {},
      audioOutgoing: [],
      controlOutgoing: [],
      main: state4.context.createGain(),
      se: state4.context.destination
    };
  };
  var makeStereoPanner_ = (mbe) => (a2) => (state4) => () => {
    var ptr = a2.id;
    state4.units[ptr] = {
      controllers: {},
      audioOutgoing: [],
      controlOutgoing: [],
      main: new StereoPannerNode(state4.context, {
        pan: a2.pan
      })
    };
    addToScope(mbe, ptr, a2.scope, state4);
    doDeferredConnections(ptr, state4);
    mConnectXToY_(mbe, ptr, a2.parent, state4);
  };
  var makeSquareOsc_ = (mbe) => (a2) => (state4) => () => {
    var ptr = a2.id;
    var createClosure = function(context4, i2) {
      return new OscillatorNode(context4, i2);
    };
    var resume = { frequency: a2.frequency, type: "square" };
    state4.units[ptr] = {
      controllers: {},
      audioOutgoing: [],
      controlOutgoing: [],
      resume,
      createClosure,
      onOff: false,
      pendingOn: true,
      main: createClosure(state4.context, resume)
    };
    addToScope(mbe, ptr, a2.scope, state4);
    doDeferredConnections(ptr, state4);
    mConnectXToY_(mbe, ptr, a2.parent, state4);
  };
  var makeTriangleOsc_ = (mbe) => (a2) => (state4) => () => {
    var ptr = a2.id;
    var createClosure = function(context4, i2) {
      return new OscillatorNode(context4, i2);
    };
    var resume = { frequency: a2.frequency, type: "triangle" };
    state4.units[ptr] = {
      controllers: {},
      audioOutgoing: [],
      controlOutgoing: [],
      resume,
      createClosure,
      onOff: false,
      pendingOn: true,
      main: createClosure(state4.context, resume)
    };
    addToScope(mbe, ptr, a2.scope, state4);
    doDeferredConnections(ptr, state4);
    mConnectXToY_(mbe, ptr, a2.parent, state4);
  };
  var makeWaveShaper_ = (mbe) => (a2) => (state4) => () => {
    var ptr = a2.id;
    var curve = a2.curve;
    var b2 = a2.oversample;
    state4.units[ptr] = {
      controllers: {},
      audioOutgoing: [],
      controlOutgoing: [],
      main: new WaveShaperNode(state4.context, {
        curve,
        oversample: b2.type
      })
    };
    addToScope(mbe, ptr, a2.scope, state4);
    doDeferredConnections(ptr, state4);
    mConnectXToY_(mbe, ptr, a2.parent, state4);
  };
  function setAnalyserNodeCb_(aa) {
    return function(state4) {
      return function() {
        var ptr = aa.id;
        var a2 = aa.cb;
        if (state4.units[ptr].analyserOrig === a2) {
          return;
        }
        state4.units[ptr].analyser && state4.units[ptr].analyser();
        state4.units[ptr].analyser = a2(state4.units[ptr].se)();
        state4.units[ptr].analyserOrig = a2;
      };
    };
  }
  function setMediaRecorderCb_(aa) {
    return function(state4) {
      return function() {
        var a2 = aa.cb;
        var ptr = aa.id;
        if (state4.units[ptr].recorderOrig === a2) {
          return;
        }
        state4.units[ptr].recorder && state4.units[ptr].recorder.stop();
        var mediaRecorderSideEffectFn = a2;
        state4.units[ptr].recorderOrig = a2;
        var mediaRecorder = new MediaRecorder(state4.units[ptr].se);
        mediaRecorderSideEffectFn(mediaRecorder)();
        mediaRecorder.start();
      };
    };
  }
  function setWaveShaperCurve_(aa) {
    return function(state4) {
      return function() {
        var ptr = aa.id;
        var a2 = aa.curve;
        state4.units[ptr].main.curve = a2;
      };
    };
  }
  function setAudioWorkletParameter_(aa) {
    return function(state4) {
      return function() {
        var ptr = aa.id;
        var a2 = aa.paramName;
        var b2 = aa.paramValue;
        workletSetter(state4, state4.units[ptr].main, a2, state4.units[ptr].controllers, b2);
      };
    };
  }
  var recalcResume = function(a2, u2, v) {
    if (u2.resume) {
      if (a2.value.n !== void 0) {
        u2.resume[v] = a2.value.n;
      }
    }
  };
  function setGain_(aa) {
    return function(state4) {
      return function() {
        var ptr = aa.id;
        var a2 = aa.gain;
        genericSetter(state4, state4.units[ptr].main, "gain", state4.units[ptr].controllers, a2);
        recalcResume(a2, state4.units[ptr], "gain");
      };
    };
  }
  function setQ_(aa) {
    return function(state4) {
      return function() {
        var ptr = aa.id;
        var a2 = aa.q;
        genericSetter(state4, state4.units[ptr].main, "Q", state4.units[ptr].controllers, a2);
        recalcResume(a2, state4.units[ptr], "Q");
      };
    };
  }
  function setBuffer_(aa) {
    return function(state4) {
      return function() {
        var ptr = aa.id;
        var a2 = aa.buffer;
        if (state4.units[ptr].resume) {
          state4.units[ptr].resume.buffer = a2;
        }
      };
    };
  }
  function setConvolverBuffer_(aa) {
    return function(state4) {
      return function() {
        var ptr = aa.id;
        var buffer2 = aa.buffer;
        state4.units[ptr].main.buffer = buffer2;
      };
    };
  }
  function setPeriodicOsc_(aa) {
    return function(state4) {
      return function() {
        var ptr = aa.id;
        var a2 = aa.spec;
        if (state4.units[ptr].resume) {
          state4.units[ptr].resume.spec = a2;
        }
      };
    };
  }
  function setPan_(aa) {
    return function(state4) {
      return function() {
        var ptr = aa.id;
        var a2 = aa.pan;
        genericSetter(state4, state4.units[ptr].main, "pan", state4.units[ptr].controllers, a2);
        recalcResume(a2, state4.units[ptr], "pan");
      };
    };
  }
  function setThreshold_(aa) {
    return function(state4) {
      return function() {
        var ptr = aa.id;
        var a2 = aa.threshold;
        genericSetter(state4, state4.units[ptr].main, "threshold", state4.units[ptr].controllers, a2);
        recalcResume(a2, state4.units[ptr], "threshold");
      };
    };
  }
  function setLoopStart_(aa) {
    return function(state4) {
      return function() {
        var ptr = aa.id;
        var a2 = aa.loopStart;
        state4.units[ptr].main.loopStart = a2;
        state4.units[ptr].resume.loopStart = a2;
      };
    };
  }
  function setLoopEnd_(aa) {
    return function(state4) {
      return function() {
        var ptr = aa.id;
        var a2 = aa.loopEnd;
        state4.units[ptr].main.loopEnd = a2;
        state4.units[ptr].resume.loopEnd = a2;
      };
    };
  }
  function setBufferOffset_(aa) {
    return function(state4) {
      return function() {
        var ptr = aa.id;
        var a2 = aa.bufferOffset;
        state4.units[ptr].resume.bufferOffset = a2;
      };
    };
  }
  function setDuration_(mbe) {
    return function(aa) {
      return function(state4) {
        return function() {
          var ptr = aa.id;
          var a2 = aa.duration;
          state4.units[ptr].duration = mbe(void 0)((x) => x)(a2);
        };
      };
    };
  }
  function setRelease_(aa) {
    return function(state4) {
      return function() {
        var ptr = aa.id;
        var a2 = aa.release;
        genericSetter(state4, state4.units[ptr].main, "release", state4.units[ptr].controllers, a2);
        recalcResume(a2, state4.units[ptr], "release");
      };
    };
  }
  function setOffset_(aa) {
    return function(state4) {
      return function() {
        var ptr = aa.id;
        var a2 = aa.offset;
        genericSetter(state4, state4.units[ptr].main, "offset", state4.units[ptr].controllers, a2);
        recalcResume(a2, state4.units[ptr], "offset");
      };
    };
  }
  function setRatio_(aa) {
    return function(state4) {
      return function() {
        var ptr = aa.id;
        var a2 = aa.ratio;
        genericSetter(state4, state4.units[ptr].main, "ratio", state4.units[ptr].controllers, a2);
        recalcResume(a2, state4.units[ptr], "ratio");
      };
    };
  }
  function setAttack_(aa) {
    return function(state4) {
      return function() {
        var ptr = aa.id;
        var a2 = aa.attack;
        genericSetter(state4, state4.units[ptr].main, "attack", state4.units[ptr].controllers, a2);
        recalcResume(a2, state4.units[ptr], "attack");
      };
    };
  }
  function setKnee_(aa) {
    return function(state4) {
      return function() {
        var ptr = aa.id;
        var a2 = aa.knee;
        genericSetter(state4, state4.units[ptr].main, "knee", state4.units[ptr].controllers, a2);
        recalcResume(a2, state4.units[ptr], "knee");
      };
    };
  }
  function setDelay_(aa) {
    return function(state4) {
      return function() {
        var ptr = aa.id;
        var a2 = aa.delayTime;
        genericSetter(state4, state4.units[ptr].main, "delayTime", state4.units[ptr].controllers, a2);
        recalcResume(a2, state4.units[ptr], "delayTime");
      };
    };
  }
  function setPlaybackRate_(aa) {
    return function(state4) {
      return function() {
        var ptr = aa.id;
        var a2 = aa.playbackRate;
        genericSetter(state4, state4.units[ptr].main, "playbackRate", state4.units[ptr].controllers, a2);
        recalcResume(a2, state4.units[ptr], "playbackRate");
      };
    };
  }
  function setFrequency_(aa) {
    return function(state4) {
      return function() {
        var ptr = aa.id;
        var a2 = aa.frequency;
        genericSetter(state4, state4.units[ptr].main, "frequency", state4.units[ptr].controllers, a2);
        recalcResume(a2, state4.units[ptr], "frequency");
      };
    };
  }
  function setOnOff_(aa) {
    return function(state4) {
      return function() {
        var ptr = aa.id;
        var onOff = aa.onOff;
        if (onOff.x.type === "on") {
          setOn_(ptr)(onOff)(state4)();
        } else if (onOff.x.type === "off") {
          setOff_(ptr)(onOff)(state4)();
        }
      };
    };
  }
  var setOn_ = function(ptr) {
    return function(onOffInstr) {
      return function(state4) {
        return function() {
          if (state4.units[ptr].onOff) {
            return;
          }
          state4.units[ptr].pendingOn = false;
          state4.units[ptr].onOff = true;
          state4.units[ptr].main = state4.units[ptr].createClosure(state4.context, state4.units[ptr].resume);
          for (var i2 = 0; i2 < state4.units[ptr].audioOutgoing.length; i2++) {
            var ogi = state4.units[ptr].audioOutgoing[i2];
            state4.units[ptr].main.connect(state4.units[ogi].main);
            if (state4.units[ogi].se) {
              state4.units[ptr].main.connect(state4.units[ogi].se);
            }
          }
          if (state4.units[ptr].resume && state4.units[ptr].resume.bufferOffset) {
            if (typeof state4.units[ptr].resume.duration === "number") {
              state4.units[ptr].main.start(state4.deprecatedWriteHead + onOffInstr.o, state4.units[ptr].resume.bufferOffset, state4.units[ptr].resume.duration);
            } else {
              state4.units[ptr].main.start(state4.deprecatedWriteHead + onOffInstr.o, state4.units[ptr].resume.bufferOffset);
            }
          } else if (state4.units[ptr].resume && state4.units[ptr].resume.loopStart) {
            state4.units[ptr].main.start(state4.deprecatedWriteHead + onOffInstr.o, state4.units[ptr].resume.loopStart);
          } else {
            state4.units[ptr].main.start(state4.deprecatedWriteHead + onOffInstr.o);
          }
        };
      };
    };
  };
  var setOff_ = function(ptr) {
    return function(onOffInstr) {
      return function(state4) {
        return function() {
          if (!state4.units[ptr].onOff) {
            return;
          }
          state4.units[ptr].onOff = false;
          var oldMain = state4.units[ptr].main;
          oldMain.addEventListener("ended", () => {
            oldMain.disconnect();
          });
          oldMain.stop(state4.deprecatedWriteHead + onOffInstr.o);
        };
      };
    };
  };
  function getByteFrequencyData(analyserNode) {
    return function() {
      var dataArray = new Uint8Array(analyserNode.frequencyBinCount);
      analyserNode.getByteFrequencyData(dataArray);
      return dataArray;
    };
  }
  function bufferSampleRate(buffer2) {
    return buffer2.sampleRate;
  }
  var makePeriodicWaveImpl = function(ctx) {
    return function(real_) {
      return function(imag_) {
        return function() {
          var real = new Float32Array(real_.length);
          var imag = new Float32Array(imag_.length);
          for (var i2 = 0; i2 < real_.length; i2++) {
            real[i2] = real_[i2];
          }
          for (var i2 = 0; i2 < imag_.length; i2++) {
            imag[i2] = imag_[i2];
          }
          return ctx.createPeriodicWave(real, imag, {
            disableNormalization: true
          });
        };
      };
    };
  };
  function makeFFIAudioSnapshot(audioCtx) {
    return function() {
      return {
        context: audioCtx,
        deprecatedWriteHead: 0,
        units: {},
        scopes: {},
        unsu: {},
        toConnect: {}
      };
    };
  }
  function close_(audioCtx) {
    return function() {
      audioCtx.close();
    };
  }
  function fetchArrayBuffer(s2) {
    return function() {
      {
        return fetch(s2).then(function(b2) {
          return b2.arrayBuffer();
        }, function(e) {
          console.error("Error fetching buffer", e);
          return Promise.reject(e);
        });
      }
    };
  }
  function decodeAudioDataFromArrayBuffer(ctx) {
    return function(b2) {
      return function() {
        return ctx.decodeAudioData(b2);
      };
    };
  }
  function context_() {
    return new (window.AudioContext || window.webkitAudioContext)();
  }
  function contextState_(audioCtx) {
    return function() {
      return audioCtx.state;
    };
  }

  // output/Control.Promise/foreign.js
  function thenImpl(promise2) {
    return function(errCB) {
      return function(succCB) {
        return function() {
          promise2.then(succCB, errCB);
        };
      };
    };
  }

  // output/Control.Promise/index.js
  var voidRight2 = /* @__PURE__ */ voidRight(functorEffect);
  var mempty4 = /* @__PURE__ */ mempty(monoidCanceler);
  var identity12 = /* @__PURE__ */ identity(categoryFn);
  var alt8 = /* @__PURE__ */ alt(/* @__PURE__ */ altExceptT(semigroupNonEmptyList)(monadIdentity));
  var unsafeReadTagged2 = /* @__PURE__ */ unsafeReadTagged(monadIdentity);
  var map13 = /* @__PURE__ */ map(/* @__PURE__ */ functorExceptT(functorIdentity));
  var readString2 = /* @__PURE__ */ readString(monadIdentity);
  var bind5 = /* @__PURE__ */ bind(bindAff);
  var liftEffect2 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var toAff$prime = function(customCoerce) {
    return function(p2) {
      return makeAff(function(cb2) {
        return voidRight2(mempty4)(thenImpl(p2)(function($14) {
          return cb2(Left.create(customCoerce($14)))();
        })(function($15) {
          return cb2(Right.create($15))();
        }));
      });
    };
  };
  var coerce15 = function(fn) {
    return either(function(v) {
      return error("Promise failed, couldn't extract JS Error or String");
    })(identity12)(runExcept(alt8(unsafeReadTagged2("Error")(fn))(map13(error)(readString2(fn)))));
  };
  var toAff = /* @__PURE__ */ toAff$prime(coerce15);
  var toAffE = function(f) {
    return bind5(liftEffect2(f))(toAff);
  };

  // output/Ocarina.Interpret/index.js
  var show3 = /* @__PURE__ */ show(showInt);
  var arbitrary3 = /* @__PURE__ */ arbitrary(arbInt);
  var $$void10 = /* @__PURE__ */ $$void(functorST);
  var add4 = /* @__PURE__ */ add(semiringInt);
  var bind1 = /* @__PURE__ */ bind(bindAff);
  var when2 = /* @__PURE__ */ when(applicativeEffect);
  var effectfulAudioInterpret = function(seed) {
    return {
      ids: function __do2() {
        var s2 = read2(seed)();
        var o = show3(evalGen(arbitrary3)({
          newSeed: mkSeed(s2),
          size: 5
        }));
        $$void10(modify2(add4(1))(seed))();
        return o;
      },
      deleteFromCache: deleteFromCache_2,
      disconnectXFromY: disconnectXFromY_,
      connectXToY: connectXToY_,
      makeAllpass: makeAllpass_(maybe),
      makeAnalyser: makeAnalyser_(maybe),
      makeAudioWorkletNode: makeAudioWorkletNode_(maybe),
      makeBandpass: makeBandpass_(maybe),
      makeConstant: makeConstant_(maybe),
      makeConvolver: makeConvolver_(maybe),
      makeDelay: makeDelay_(maybe),
      makeDynamicsCompressor: makeDynamicsCompressor_(maybe),
      makeGain: makeGain_(maybe),
      makeHighpass: makeHighpass_(maybe),
      makeHighshelf: makeHighshelf_(maybe),
      makeIIRFilter: makeIIRFilter_(maybe),
      makeLoopBuf: makeLoopBuf_(maybe),
      makeLowpass: makeLowpass_(maybe),
      makeLowshelf: makeLowshelf_(maybe),
      makeMediaElement: makeMediaElement_(maybe),
      makeMicrophone: makeMicrophone_(maybe),
      makeNotch: makeNotch_(maybe),
      makePeaking: makePeaking_(maybe),
      makePeriodicOsc: makePeriodicOsc_(maybe),
      makePlayBuf: makePlayBuf_(maybe),
      makeRecorder: makeRecorder_(maybe),
      makeSawtoothOsc: makeSawtoothOsc_(maybe),
      makeSinOsc: makeSinOsc_(maybe),
      makeSpeaker: makeSpeaker_,
      makeSquareOsc: makeSquareOsc_(maybe),
      makeStereoPanner: makeStereoPanner_(maybe),
      makeTriangleOsc: makeTriangleOsc_(maybe),
      makeWaveShaper: makeWaveShaper_(maybe),
      setAnalyserNodeCb: setAnalyserNodeCb_,
      setMediaRecorderCb: setMediaRecorderCb_,
      setWaveShaperCurve: setWaveShaperCurve_,
      setAudioWorkletParameter: setAudioWorkletParameter_,
      setBuffer: setBuffer_,
      setConvolverBuffer: setConvolverBuffer_,
      setDuration: setDuration_(maybe),
      setPeriodicOsc: setPeriodicOsc_,
      setOnOff: setOnOff_,
      setBufferOffset: setBufferOffset_,
      setLoopStart: setLoopStart_,
      setLoopEnd: setLoopEnd_,
      setRatio: setRatio_,
      setOffset: setOffset_,
      setAttack: setAttack_,
      setGain: setGain_,
      setQ: setQ_,
      setPan: setPan_,
      setThreshold: setThreshold_,
      setRelease: setRelease_,
      setKnee: setKnee_,
      setDelay: setDelay_,
      setPlaybackRate: setPlaybackRate_,
      setFrequency: setFrequency_
    };
  };
  var decodeAudioDataFromUri = function(ctx) {
    return function(s2) {
      return bind1(toAffE(fetchArrayBuffer(s2)))(function() {
        var $82 = decodeAudioDataFromArrayBuffer(ctx);
        return function($83) {
          return toAffE($82($83));
        };
      }());
    };
  };
  var contextState = function(dictMonadEffect) {
    var $84 = liftEffect(dictMonadEffect);
    return function($85) {
      return $84(contextState_($85));
    };
  };
  var contextState1 = /* @__PURE__ */ contextState(monadEffectEffect);
  var context = function(dictMonadEffect) {
    return liftEffect(dictMonadEffect)(context_);
  };
  var close2 = function(dictMonadEffect) {
    var liftEffect1 = liftEffect(dictMonadEffect);
    return function(ctx) {
      return liftEffect1(function __do2() {
        var st = contextState1(ctx)();
        return when2(st !== "closed")(close_(ctx))();
      });
    };
  };

  // output/Ocarina.Run/index.js
  var liftST4 = /* @__PURE__ */ liftST(monadSTEffect);
  var context2 = /* @__PURE__ */ context(monadEffectEffect);
  var map14 = /* @__PURE__ */ map(functorEffect);
  var applySecond3 = /* @__PURE__ */ applySecond(applyEffect);
  var close3 = /* @__PURE__ */ close2(monadEffectEffect);
  var run22 = function(ctx) {
    return function(s2) {
      return function __do2() {
        var ffi = makeFFIAudioSnapshot(ctx)();
        var rf = liftST4(newSTRef(0))();
        var u2 = subscribe(speaker2(s2)(effectfulAudioInterpret(rf)))(function(f) {
          return f(ffi);
        })();
        return u2;
      };
    };
  };
  var run2_ = function(s2) {
    return function __do2() {
      var ctx = context2();
      return map14(function(v) {
        return applySecond3(v)(close3(ctx));
      })(run22(ctx)(s2))();
    };
  };

  // output/Main/index.js
  var discard3 = /* @__PURE__ */ discard(discardUnit);
  var $$void11 = /* @__PURE__ */ $$void(functorEffect);
  var foldMapWithIndex2 = /* @__PURE__ */ foldMapWithIndex(foldableWithIndexArray);
  var eq3 = /* @__PURE__ */ eq(eqInt);
  var show4 = /* @__PURE__ */ show(showNumber);
  var maximumBy2 = /* @__PURE__ */ maximumBy(foldableArray);
  var compare3 = /* @__PURE__ */ compare(ordNumber);
  var sum2 = /* @__PURE__ */ sum(foldableArray)(semiringNumber);
  var max6 = /* @__PURE__ */ max(ordInt);
  var join2 = /* @__PURE__ */ join(bindFn);
  var mapWithIndex4 = /* @__PURE__ */ mapWithIndex2(functorWithIndexArray);
  var map15 = /* @__PURE__ */ map(functorArray);
  var max1 = /* @__PURE__ */ max(ordNumber);
  var mapFlipped3 = /* @__PURE__ */ mapFlipped(functorArray);
  var bimap2 = /* @__PURE__ */ bimap(bifunctorTuple);
  var mod3 = /* @__PURE__ */ mod(euclideanRingInt);
  var map16 = /* @__PURE__ */ map(functorTuple);
  var bind12 = /* @__PURE__ */ bind(bindAff);
  var liftEffect3 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var context3 = /* @__PURE__ */ context(monadEffectAff);
  var discard22 = /* @__PURE__ */ discard3(bindAff);
  var log4 = /* @__PURE__ */ log3(monadEffectAff);
  var mapFlipped1 = /* @__PURE__ */ mapFlipped(functorEvent);
  var map24 = /* @__PURE__ */ map(functorEvent);
  var unwrap5 = /* @__PURE__ */ unwrap();
  var oneOf5 = /* @__PURE__ */ oneOf(foldableArray)(plusEvent);
  var pureAttr2 = /* @__PURE__ */ pureAttr(attrLinearGradient_X1Stri);
  var pureAttr1 = /* @__PURE__ */ pureAttr(attrLinearGradient_X2Stri);
  var pureAttr22 = /* @__PURE__ */ pureAttr(attrLinearGradient_Y1Stri);
  var pureAttr3 = /* @__PURE__ */ pureAttr(attrLinearGradient_Y2Stri);
  var semiringTuple2 = /* @__PURE__ */ semiringTuple(semiringNumber)(semiringNumber);
  var add1 = /* @__PURE__ */ add(semiringTuple2);
  var negate2 = /* @__PURE__ */ negate(/* @__PURE__ */ ringFn(ringNumber));
  var append13 = /* @__PURE__ */ append(semigroupArray);
  var foldMapWithIndex1 = /* @__PURE__ */ foldMapWithIndex2(monoidArray);
  var rmap3 = /* @__PURE__ */ rmap(bifunctorTuple);
  var lmap2 = /* @__PURE__ */ lmap(bifunctorTuple);
  var negate1 = /* @__PURE__ */ negate(ringNumber);
  var filterMap2 = /* @__PURE__ */ filterMap(filterableEvent);
  var identity13 = /* @__PURE__ */ identity(categoryFn);
  var sampleOnRight3 = /* @__PURE__ */ sampleOnRight(eventIsEvent);
  var map32 = /* @__PURE__ */ map(functorMaybe);
  var bindFlipped2 = /* @__PURE__ */ bindFlipped(bindEffect);
  var toArray6 = /* @__PURE__ */ toArray(typedArrayUint8);
  var sample_2 = /* @__PURE__ */ sample_(functorEvent);
  var eqTuple2 = /* @__PURE__ */ eqTuple(eqNumber)(eqNumber);
  var lift23 = /* @__PURE__ */ lift2(applyEvent);
  var alt9 = /* @__PURE__ */ alt(altEvent);
  var pure15 = /* @__PURE__ */ pure(applicativeEvent);
  var join1 = /* @__PURE__ */ join(bindArray);
  var pureAttr4 = /* @__PURE__ */ pureAttr(attrInput_XtypeString);
  var pureAttr5 = /* @__PURE__ */ pureAttr(attrInput_MinString);
  var pureAttr6 = /* @__PURE__ */ pureAttr(attrInput_MaxString);
  var pureAttr7 = /* @__PURE__ */ pureAttr(attrInput_StepString);
  var pureAttr8 = /* @__PURE__ */ pureAttr(attrInput_ValueString);
  var pureAttr9 = /* @__PURE__ */ pureAttr(attrSvg_WidthString);
  var pureAttr10 = /* @__PURE__ */ pureAttr(attrSvg_HeightString);
  var pureAttr11 = /* @__PURE__ */ pureAttr(attrSvg_FillString);
  var pureAttr12 = /* @__PURE__ */ pureAttr(attrSvg_StyleString);
  var mapFlipped22 = /* @__PURE__ */ mapFlipped(functorMaybe);
  var pureAttr13 = /* @__PURE__ */ pureAttr(attrRect_WidthString);
  var pureAttr14 = /* @__PURE__ */ pureAttr(attrRect_XString);
  var mapAttr2 = /* @__PURE__ */ mapAttr(functorEvent);
  var mapAttr1 = /* @__PURE__ */ mapAttr2(attrRect_HeightString);
  var mapAttr22 = /* @__PURE__ */ mapAttr2(attrRect_YString);
  var pureAttr15 = /* @__PURE__ */ pureAttr(attrRect_HeightString);
  var mapAttr3 = /* @__PURE__ */ mapAttr2(attrRect_XString);
  var mapAttr4 = /* @__PURE__ */ mapAttr2(attrRect_WidthString);
  var pureAttr16 = /* @__PURE__ */ pureAttr(attrRect_FillString);
  var pureAttr17 = /* @__PURE__ */ pureAttr(attrSvg_ViewBoxString);
  var mempty5 = /* @__PURE__ */ mempty(monoidString);
  var intercalateMap2 = /* @__PURE__ */ intercalateMap(foldable1NonEmptyArray)(semigroupString);
  var attr3 = /* @__PURE__ */ attr(attrOnClickEffectUnit);
  var applySecond4 = /* @__PURE__ */ applySecond(applyEffect);
  var analyser_2 = /* @__PURE__ */ analyser_(/* @__PURE__ */ initialAnalyserRecord(/* @__PURE__ */ convertOptionsWithDefaultsRecord(/* @__PURE__ */ convertOptionsRecord()(/* @__PURE__ */ convertRecordOptionsCons(/* @__PURE__ */ convertRecordOptionsCons(convertRecordOptionsNil)(convertOptionAnalyserOpti1)()()()({
    reflectSymbol: function() {
      return "fftSize";
    }
  }))(convertOptionAnalyserOpti)()()()({
    reflectSymbol: function() {
      return "cb";
    }
  })))(/* @__PURE__ */ defaultsRecord()())));
  var voidRight3 = /* @__PURE__ */ voidRight(functorEffect);
  var gain_2 = /* @__PURE__ */ gain_(initialGainNumber);
  var sinOsc2 = /* @__PURE__ */ sinOsc(initialSinOscNumber);
  var bangOn2 = /* @__PURE__ */ bangOn();
  var playBuf2 = /* @__PURE__ */ playBuf(initialPlayBufBrowserAudi);
  var pureAttr18 = /* @__PURE__ */ pureAttr(attrG_FillString);
  var pureAttr19 = /* @__PURE__ */ pureAttr(attrG_StrokeLinecapString);
  var pureAttr20 = /* @__PURE__ */ pureAttr(attrG_StrokeLinejoinStrin);
  var pureAttr21 = /* @__PURE__ */ pureAttr(attrG_StrokeOpacityString);
  var pure24 = /* @__PURE__ */ pure(applicativeArray);
  var mapAttr5 = /* @__PURE__ */ mapAttr2(attrPath_DString);
  var pureAttr222 = /* @__PURE__ */ pureAttr(attrPath_FillOpacityStrin);
  var pureAttr23 = /* @__PURE__ */ pureAttr(attrPath_StrokeString);
  var pureAttr24 = /* @__PURE__ */ pureAttr(attrPath_StrokeWidthStrin);
  var pureAttr25 = /* @__PURE__ */ pureAttr(attrPath_FilterString);
  var pureAttr26 = /* @__PURE__ */ pureAttr(attrLinearGradient_IdStri);
  var pureAttr27 = /* @__PURE__ */ pureAttr(attrLinearGradient_Gradie);
  var keepLatest5 = /* @__PURE__ */ keepLatest(eventIsEvent);
  var pureAttr28 = /* @__PURE__ */ pureAttr(attrStop_OffsetString);
  var pureAttr29 = /* @__PURE__ */ pureAttr(attrStop_StopColorString);
  var pureAttr30 = /* @__PURE__ */ pureAttr(attrStop_StopOpacityStrin);
  var attr12 = /* @__PURE__ */ attr(attrG_TransformString);
  var show1 = /* @__PURE__ */ show(showInt);
  var pureAttr31 = /* @__PURE__ */ pureAttr(attrPath_DString);
  var unskew = function(v) {
    return v * sqrt(3);
  };
  var unsafeMemoize = function(e) {
    return unsafePerformEffect(function __do2() {
      var v = create();
      $$void11(subscribe(e)(v.push))();
      return v.event;
    });
  };
  var toPath = /* @__PURE__ */ foldMapWithIndex2(monoidString)(function(i2) {
    return function(v) {
      return function() {
        var $198 = i2 === 0;
        if ($198) {
          return "M";
        }
        ;
        return "L";
      }() + (show4(v.value0) + (" " + show4(v.value1)));
    };
  });
  var timbre = /* @__PURE__ */ function() {
    var $278 = fromMaybe([]);
    var $279 = maximumBy2(on(compare3)(sum2));
    return function($280) {
      return $278($279($280));
    };
  }();
  var takeNormOr = function(atLeast) {
    return function(norm1) {
      return function(as) {
        return take(max6(atLeast)(floor2(toNumber(length(as)) * norm1)))(as);
      };
    };
  };
  var skew = function(v) {
    return v / sqrt(3);
  };
  var skewY = function(v) {
    return new Tuple(v, skew(v));
  };
  var segment = function(v) {
    return function(v1) {
      return function(v2) {
        if (v2.length === 0) {
          return [];
        }
        ;
        var mk = function(len) {
          return function(mapper) {
            return mapWithIndex4(function($282) {
              return $$const(mapper($282));
            })(replicate(len)(unit));
          };
        };
        var ix = function(i2) {
          return function(j) {
            return floor2(toNumber(length(v2)) * (toNumber(i2) / toNumber(v) + toNumber(j) / toNumber(v) / toNumber(v1)));
          };
        };
        var getix = function(i2) {
          return function(j) {
            var v3 = index(v2)(ix(i2)(j));
            if (v3 instanceof Nothing) {
              return unsafeCrashWith("Not enough data");
            }
            ;
            if (v3 instanceof Just) {
              return v3.value0;
            }
            ;
            throw new Error("Failed pattern match at Main (line 102, column 17 - line 104, column 18): " + [v3.constructor.name]);
          };
        };
        return mk(v)(function(i2) {
          return mk(v1)(function(j) {
            return getix(i2)(j);
          });
        });
      };
    };
  };
  var rotate = function(degrees) {
    return function(v) {
      var rad = pi * degrees / 180;
      var s2 = sin(rad);
      var c = cos(rad);
      return new Tuple(c * v.value0 + s2 * v.value1, c * v.value1 - s2 * v.value0);
    };
  };
  var prefix = function(dictSemiring) {
    var add22 = add(dictSemiring);
    return function(p2) {
      return function(ps) {
        return cons(p2)(map15(add22(p2))(ps));
      };
    };
  };
  var prefix1 = /* @__PURE__ */ prefix(semiringTuple2);
  var overlap = function(target6) {
    return function(sample2) {
      if (target6.high < sample2.low) {
        return 0;
      }
      ;
      if (target6.low > sample2.high) {
        return 0;
      }
      ;
      if (otherwise) {
        var missingTop = max1(0)(sample2.high - target6.high);
        var missingBottom = max1(0)(target6.low - sample2.low);
        var frac = 1 - (missingTop + missingBottom) / (sample2.high - sample2.low);
        return frac;
      }
      ;
      throw new Error("Failed pattern match at Main (line 169, column 1 - line 169, column 32): " + [target6.constructor.name, sample2.constructor.name]);
    };
  };
  var octave = /* @__PURE__ */ mapWithIndex4(function(i2) {
    return function(v) {
      return i2;
    };
  })(/* @__PURE__ */ replicate(12)(unit));
  var noteName = function(v) {
    if (v === 0) {
      return "A";
    }
    ;
    if (v === 1) {
      return "Bb";
    }
    ;
    if (v === 2) {
      return "B";
    }
    ;
    if (v === 3) {
      return "C";
    }
    ;
    if (v === 4) {
      return "C#";
    }
    ;
    if (v === 5) {
      return "D";
    }
    ;
    if (v === 6) {
      return "D#";
    }
    ;
    if (v === 7) {
      return "E";
    }
    ;
    if (v === 8) {
      return "F";
    }
    ;
    if (v === 9) {
      return "F#";
    }
    ;
    if (v === 10) {
      return "G";
    }
    ;
    if (v === 11) {
      return "G#";
    }
    ;
    return "??";
  };
  var norm = function(values2) {
    var total = sum2(values2);
    return mapWithIndex4(function(i2) {
      return function(v) {
        return new Tuple(sum2(take(i2)(values2)) / total, v / total);
      };
    })(values2);
  };
  var mknote = function(i2) {
    return 55 * pow2(2)(i2 / 12);
  };
  var mkfreq = function(ab) {
    return function(idxNorm) {
      return bufferSampleRate(ab) / 2 * idxNorm;
    };
  };
  var maxOctave = /* @__PURE__ */ function() {
    return floor2(log(44100 / 110) / log(2));
  }();
  var matchingFreq = function(freq) {
    return function(binned) {
      return sum2(mapFlipped3(binned)(function(v) {
        return v.value1 * overlap(freq)(v.value0);
      }));
    };
  };
  var mapWithNorm = function(f) {
    return function(as) {
      return mapWithIndex4(function(i2) {
        return f(toNumber(i2) / toNumber(length(as)));
      })(as);
    };
  };
  var incr = function(i2) {
    return function(v) {
      return toNumber(i2) * v;
    };
  };
  var guessNote = /* @__PURE__ */ function() {
    var $283 = maximumBy2(on(compare3)(snd));
    var $284 = mapWithIndex4(Tuple.create);
    return function($285) {
      return function(v) {
        if (v instanceof Nothing) {
          return "?";
        }
        ;
        if (v instanceof Just) {
          return noteName(v.value0.value0);
        }
        ;
        throw new Error("Failed pattern match at Main (line 205, column 69 - line 207, column 33): " + [v.constructor.name]);
      }($283($284($285)));
    };
  }();
  var gatherOctaves = function(allOctaves) {
    return mapFlipped3(octave)(function(i2) {
      return map15(snd)(filter(function() {
        var $286 = eq3(i2);
        return function($287) {
          return $286(fst($287));
        };
      }())(allOctaves));
    });
  };
  var freqBins = function(ab) {
    return function(binData) {
      var len = toNumber(length(binData));
      return mapWithIndex4(function(i2) {
        return Tuple.create({
          center: mkfreq(ab)((toNumber(i2) + 0.5) / len),
          low: mkfreq(ab)((toNumber(i2) + 0) / len),
          high: mkfreq(ab)((toNumber(i2) + 1) / len)
        });
      })(binData);
    };
  };
  var distr = function(v) {
    if (v.value0.length === 6 && v.value1.length === 6) {
      var rTuple = function(u2) {
        return function(v1) {
          return join2(bimap2)(reverse)(new Tuple(u2, v1));
        };
      };
      return [rTuple(v["value0"][0])(v["value1"][0]), rTuple(v["value1"][1])(v["value1"][2]), new Tuple(v["value1"][3], v["value1"][4]), new Tuple(v["value1"][5], v["value0"][5]), new Tuple(v["value0"][4], v["value0"][3]), rTuple(v["value0"][2])(v["value0"][1])];
    }
    ;
    return unsafeCrashWith("Bad data");
  };
  var dedup = function(dictIsEvent) {
    var withLast2 = withLast(dictIsEvent);
    var filterMap1 = filterMap(dictIsEvent.Filterable1());
    return function(dictEq) {
      var notEq2 = notEq(dictEq);
      var $288 = filterMap1(function(v) {
        if (v.last instanceof Nothing) {
          return new Just(v.now);
        }
        ;
        if (v.last instanceof Just) {
          if (notEq2(v.last.value0)(v.now)) {
            return new Just(v.now);
          }
          ;
          if (otherwise) {
            return Nothing.value;
          }
          ;
        }
        ;
        throw new Error("Failed pattern match at Main (line 124, column 44 - line 128, column 27): " + [v.constructor.name]);
      });
      return function($289) {
        return $288(withLast2($289));
      };
    };
  };
  var dedup1 = /* @__PURE__ */ dedup(eventIsEvent);
  var dedup2 = /* @__PURE__ */ dedup1(/* @__PURE__ */ eqArray(uintEqInstance));
  var dedup3 = /* @__PURE__ */ dedup1(/* @__PURE__ */ eqArray(eqTuple2));
  var dedup4 = /* @__PURE__ */ dedup1(eqNumber);
  var dedup5 = /* @__PURE__ */ dedup1(eqTuple2);
  var dedup6 = /* @__PURE__ */ dedup1(eqString);
  var binnote = function(i2) {
    return {
      center: mknote(toNumber(i2)),
      low: mknote(toNumber(i2) - 0.5),
      high: mknote(toNumber(i2) + 0.5)
    };
  };
  var noteOctaves = /* @__PURE__ */ function() {
    return mapWithIndex4(function(i2) {
      return function(v) {
        return new Tuple(mod3(i2)(12), binnote(i2));
      };
    })(replicate(12 * maxOctave | 0)(unit));
  }();
  var noteScores$prime = function(ab) {
    return function(fft) {
      return gatherOctaves(function() {
        var binned = freqBins(ab)(fft);
        return mapFlipped3(noteOctaves)(map16(function(octaveBin) {
          return matchingFreq(octaveBin)(binned);
        }));
      }());
    };
  };
  var noteScores = function(ab) {
    return function(fft) {
      return map15(sum2)(noteScores$prime(ab)(fft));
    };
  };
  var main2 = /* @__PURE__ */ launchAff_(/* @__PURE__ */ bind12(/* @__PURE__ */ liftEffect3(create))(function(v) {
    return bind12(context3)(function(ctx) {
      return bind12(decodeAudioDataFromUri(ctx)("samples/pizzs1.wav"))(function(pizzs1) {
        return bind12(decodeAudioDataFromUri(ctx)("samples/main0.wav"))(function(main0) {
          return discard22(log4(main0))(function() {
            var rotating = mapFlipped1(map24(function(v1) {
              return v1.time;
            })(withTime(animationFrame)))(function($290) {
              return function(t) {
                return t / 1e3 * 120;
              }(unwrap5(unInstant($290)));
            });
            var radius = 100 / 2;
            var line2 = function(v1) {
              return function(v2) {
                return oneOf5([pureAttr2(X1.value)(show4(v1.value0)), pureAttr1(X2.value)(show4(v2.value0)), pureAttr22(Y1.value)(show4(v1.value1)), pureAttr3(Y2.value)(show4(v2.value1))]);
              };
            };
            var drawTine = function(tineSize) {
              var r = 1 / 2;
              var p2 = skewY(tineSize);
              return [p2, add1(p2)(new Tuple(0, r * 4.1)), add1(add1(p2)(new Tuple(0, r * 4.1)))(new Tuple(negate2(unskew)(r * 4.1 / 2), r * 4.1 / 2)), new Tuple(0, 4.1), new Tuple(0, 4.1 + 1)];
            };
            var drawTines = function(widths) {
              var capLength = skew(2);
              return flip(append13)([new Tuple(capLength, radius - 2 / 2), new Tuple(0, radius)])(prefix1(new Tuple(capLength, 0))(foldMapWithIndex1(function(i2) {
                return function(tineSize) {
                  return map15(rmap3(function(v1) {
                    return v1 + incr(i2)(4.1 + 1);
                  }))(drawTine(tineSize));
                };
              })(widths)));
            };
            var drawArm = function(angle) {
              return function(v1) {
                return map15(rotate(angle))(append13(map15(lmap2(negate1))(drawTines(v1.value0)))(reverse(drawTines(v1.value1))));
              };
            };
            var drawArms = function() {
              var $291 = foldMapWithIndex1(function(i2) {
                return drawArm(incr(i2)(60));
              });
              return function($292) {
                return toPath($291($292));
              };
            }();
            return bind12(liftEffect3(create))(function(analyserE) {
              return bind12(liftEffect3(create))(function(sampleNorm) {
                var analyserB = behavior(function(e) {
                  return filterMap2(identity13)(sampleOnRight3(analyserE.event)(mapFlipped1(e)(function(sample2) {
                    return map32(function(analyser2) {
                      return sample2(unsafePerformEffect(bindFlipped2(toArray6)(getByteFrequencyData(analyser2))));
                    });
                  })));
                });
                var sampled = unsafeMemoize(map24(map15(toNumber2))(dedup2(sample_2(analyserB)(animationFrame))));
                var currentNoteScores = unsafeMemoize(mapFlipped1(sampled)(noteScores(main0)));
                var currentNoteScores$prime = unsafeMemoize(mapFlipped1(sampled)(noteScores$prime(main0)));
                var currentTimbre = unsafeMemoize(mapFlipped1(currentNoteScores$prime)(function($293) {
                  return norm(timbre($293));
                }));
                var sampleNormed = dedup3(lift23(takeNormOr(6 * 9 | 0))(alt9(sampleNorm.event)(pure15(1)))(alt9(map24(mapWithNorm(Tuple.create))(sampled))(pure15([new Tuple(0, 0)]))));
                return liftEffect3(runInBody(div_(join1(replicate(1)([p_([text_("Click on the large snowflake to start the music!")]), p_([text_("(iPhone/iPad users: turn on your ringer to hear sound.)")]), p_([text_("This slider clips the higher frequencies from the snowflake FFT display (right = all frequencies, left = just the bottom 6 arms*9 tines worth of bins):")]), flip(input)([])(oneOf5([pureAttr4(Xtype.value)("range"), pureAttr5(Min2.value)("0.0"), pureAttr6(Max2.value)("1.0"), pureAttr7(Step.value)("any"), pureAttr8(Value.value)("1.0"), slider_(sampleNorm.push)])), svg(oneOf5([pureAttr9(Width.value)(show4(240)), pureAttr10(Height.value)(show4(240)), pureAttr11(Fill.value)("green"), pureAttr12(Style.value)("display:block")]))(mapFlipped3(octave)(function(i2) {
                  var height8 = dedup4(filterMap2(function(scores) {
                    return mapFlipped22(index(scores)(i2))(function(score) {
                      return round(score / 100);
                    });
                  })(currentNoteScores));
                  return flip(rect)([])(oneOf5([pureAttr13(Width.value)(show4(20)), pureAttr14(X.value)(show4(toNumber(i2) * 20)), mapAttr1(Height.value)(map24(show4)(height8)), mapAttr22(Y.value)(map24(function($294) {
                    return show4(function(v1) {
                      return 240 - v1;
                    }($294));
                  })(height8))]));
                })), svg(oneOf5([pureAttr9(Width.value)(show4(240)), pureAttr10(Height.value)(show4(20)), pureAttr12(Style.value)("display:block")]))(mapFlipped3(octave)(function(i2) {
                  var info2 = dedup5(mapFlipped1(currentTimbre)(function() {
                    var $295 = join2(bimap2)(function(v1) {
                      return v1 * 240;
                    });
                    var $296 = fromMaybe(new Tuple(0, 0));
                    var $297 = flip(index)(i2);
                    return function($298) {
                      return $295($296($297($298)));
                    };
                  }()));
                  return flip(rect)([])(oneOf5([pureAttr15(Height.value)(show4(20)), mapAttr3(X.value)(map24(function($299) {
                    return show4(fst($299));
                  })(info2)), mapAttr4(Width.value)(map24(function($300) {
                    return show4(snd($300));
                  })(info2)), pureAttr16(Fill.value)(function() {
                    var $264 = i2 === 0;
                    if ($264) {
                      return "red";
                    }
                    ;
                    var $265 = mod3(i2)(2) === 0;
                    if ($265) {
                      return "blue";
                    }
                    ;
                    return "gray";
                  }())]));
                })), h1_([text(alt9(pure15("..."))(dedup6(map24(guessNote)(currentNoteScores))))]), br_([]), br_([]), br_([]), svg(oneOf5([pureAttr9(Width.value)(show4(5 + 2 * 100 + 5)), pureAttr10(Height.value)(show4(5 + 2 * 100 + 5)), pureAttr17(ViewBox.value)(maybe(mempty5)(intercalateMap2(" ")(show4))(fromArray([-radius - 5, -radius - 5, 100 + 5 + 5, 100 + 5 + 5]))), mapFlipped1(alt9(pure15(Nothing.value))(v.event))(function(e) {
                  return attr3(OnClick.value)(function() {
                    if (e instanceof Just) {
                      return applySecond4(e.value0)(v.push(Nothing.value));
                    }
                    ;
                    return function __do2() {
                      var $301 = run2_([analyser_2({
                        cb: function(v1) {
                          return voidRight3(analyserE.push(Nothing.value))(analyserE.push(new Just(v1)));
                        },
                        fftSize: TTT12.value
                      })(flip($$const)([gain_2(0.15)([sinOsc2(440)(bangOn2)])])([playBuf2(main0)(bangOn2)]))])();
                      return v.push(Just.create($301))();
                    };
                  }());
                })]))([g(oneOf5([pureAttr18(Fill.value)("#bfe6ff"), pureAttr19(StrokeLinecap.value)("butt"), pureAttr20(StrokeLinejoin.value)("miter"), pureAttr21(StrokeOpacity.value)("1")]))(join1([pure24(flip(path)([])(oneOf5([mapAttr5(D.value)(dedup6(mapFlipped1(alt9(pure15([new Tuple(0, 0)]))(sampleNormed))(function(freqs) {
                  var segmented = segment(6)(9)(mapFlipped3(freqs)(uncurry(function(i2) {
                    return function(v1) {
                      return v1 / (32 - i2 * 24);
                    };
                  })));
                  return drawArms(distr(join2(Tuple.create)(segmented)));
                }))), pureAttr222(FillOpacity.value)(".91"), pureAttr23(Stroke.value)(function() {
                  if (false) {
                    return "url(#linearGradientArm)";
                  }
                  ;
                  return "none";
                }()), pureAttr24(StrokeWidth.value)("0.6"), pureAttr25(Filter.value)(function() {
                  if (false) {
                    return "url(#filter17837)";
                  }
                  ;
                  return "none";
                }())])))]))]), svg(oneOf5([pureAttr9(Width.value)(show4(5 + 100 + 5)), pureAttr10(Height.value)(show4(5 + 100 + 5)), pureAttr17(ViewBox.value)(maybe(mempty5)(intercalateMap2(" ")(show4))(fromArray([-radius - 5, -radius - 5, 100 + 5 + 5, 100 + 5 + 5]))), mapFlipped1(alt9(pure15(Nothing.value))(v.event))(function(e) {
                  return attr3(OnClick.value)(function() {
                    if (e instanceof Just) {
                      return applySecond4(e.value0)(v.push(Nothing.value));
                    }
                    ;
                    return function __do2() {
                      var $302 = run2_([analyser_2({
                        cb: function(v1) {
                          return voidRight3(analyserE.push(Nothing.value))(analyserE.push(new Just(v1)));
                        },
                        fftSize: TTT8.value
                      })([playBuf2(pizzs1)(bangOn2)])])();
                      return v.push(Just.create($302))();
                    };
                  }());
                })]))([defs_([linearGradient(oneOf5([pureAttr26(Id.value)("linearGradientArm"), pureAttr27(GradientUnits.value)("userSpaceOnUse"), keepLatest5(mapFlipped1(function() {
                  if (false) {
                    return rotating;
                  }
                  ;
                  return pure15(0);
                }())(function(angle) {
                  return line2(rotate(angle)(new Tuple(0, radius)))(rotate(angle)(new Tuple(0, -radius)));
                }))]))([flip(stop)([])(oneOf5([pureAttr28(Offset.value)("0"), pureAttr29(StopColor.value)("#6b91ab"), pureAttr30(StopOpacity.value)("0.9")])), flip(stop)([])(oneOf5([pureAttr28(Offset.value)("1"), pureAttr29(StopColor.value)("#f3feff"), pureAttr30(StopOpacity.value)("0.95")]))])]), g(oneOf5([pureAttr18(Fill.value)("#bfe6ff"), pureAttr19(StrokeLinecap.value)("butt"), pureAttr20(StrokeLinejoin.value)("miter"), pureAttr21(StrokeOpacity.value)("1"), mapFlipped1(rotating)(function(angle) {
                  return attr12(Transform.value)("rotate(" + (show1(round2(remainder(angle + 30)(function() {
                    if (false) {
                      return 360;
                    }
                    ;
                    return 60;
                  }()) - 30)) + ")"));
                })]))(join1(function() {
                  var vs = [1, 3, 3, 6, 4, 4, 5, 3, 1];
                  var vss = join2(Tuple.create)(vs);
                  return [pure24(flip(path)([])(oneOf5([pureAttr31(D.value)(drawArms([vss, vss, vss, vss, vss, vss])), pureAttr222(FillOpacity.value)(".91"), pureAttr23(Stroke.value)(function() {
                    if (false) {
                      return "url(#linearGradientArm)";
                    }
                    ;
                    return "none";
                  }()), pureAttr24(StrokeWidth.value)("0.6"), pureAttr25(Filter.value)(function() {
                    if (false) {
                      return "url(#filter17837)";
                    }
                    ;
                    return "none";
                  }())])))];
                }()))])])))));
              });
            });
          });
        });
      });
    });
  }));

  // <stdin>
  main2();
})();
