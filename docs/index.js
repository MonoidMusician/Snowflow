(() => {
  // output/Control.Apply/foreign.js
  var arrayApply = function(fs) {
    return function(xs) {
      var l = fs.length;
      var k = xs.length;
      var result = new Array(l * k);
      var n = 0;
      for (var i = 0; i < l; i++) {
        var f = fs[i];
        for (var j = 0; j < k; j++) {
          result[n++] = f(xs[j]);
        }
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
  var flip = function(f) {
    return function(b) {
      return function(a) {
        return f(a)(b);
      };
    };
  };
  var $$const = function(a) {
    return function(v) {
      return a;
    };
  };
  var applyFlipped = function(x) {
    return function(f) {
      return f(x);
    };
  };

  // output/Data.Functor/foreign.js
  var arrayMap = function(f) {
    return function(arr) {
      var l = arr.length;
      var result = new Array(l);
      for (var i = 0; i < l; i++) {
        result[i] = f(arr[i]);
      }
      return result;
    };
  };

  // output/Data.Unit/foreign.js
  var unit = void 0;

  // output/Data.Functor/index.js
  var map = function(dict) {
    return dict.map;
  };
  var mapFlipped = function(dictFunctor) {
    var map12 = map(dictFunctor);
    return function(fa) {
      return function(f) {
        return map12(f)(fa);
      };
    };
  };
  var $$void = function(dictFunctor) {
    return map(dictFunctor)($$const(unit));
  };
  var functorFn = {
    map: /* @__PURE__ */ compose(semigroupoidFn)
  };
  var functorArray = {
    map: arrayMap
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
    var map9 = map(dictApply.Functor0());
    return function(a) {
      return function(b) {
        return apply1(map9($$const(identity2))(a))(b);
      };
    };
  };
  var lift2 = function(dictApply) {
    var apply1 = apply(dictApply);
    var map9 = map(dictApply.Functor0());
    return function(f) {
      return function(a) {
        return function(b) {
          return apply1(map9(f)(a))(b);
        };
      };
    };
  };

  // output/Control.Applicative/index.js
  var pure = function(dict) {
    return dict.pure;
  };
  var unless = function(dictApplicative) {
    var pure14 = pure(dictApplicative);
    return function(v) {
      return function(v1) {
        if (!v) {
          return v1;
        }
        ;
        if (v) {
          return pure14(unit);
        }
        ;
        throw new Error("Failed pattern match at Control.Applicative (line 68, column 1 - line 68, column 65): " + [v.constructor.name, v1.constructor.name]);
      };
    };
  };
  var liftA1 = function(dictApplicative) {
    var apply5 = apply(dictApplicative.Apply0());
    var pure14 = pure(dictApplicative);
    return function(f) {
      return function(a) {
        return apply5(pure14(f))(a);
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
      for (var i = 0, l = arr.length; i < l; i++) {
        Array.prototype.push.apply(result, f(arr[i]));
      }
      return result;
    };
  };

  // output/Control.Bind/index.js
  var identity3 = /* @__PURE__ */ identity(categoryFn);
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
  var join = function(dictBind) {
    var bind1 = bind(dictBind);
    return function(m) {
      return bind1(m)(identity3);
    };
  };

  // output/Data.Array/foreign.js
  var range = function(start2) {
    return function(end) {
      var step3 = start2 > end ? -1 : 1;
      var result = new Array(step3 * (end - start2) + 1);
      var i = start2, n = 0;
      while (i !== end) {
        result[n++] = i;
        i += step3;
      }
      result[n] = i;
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
      for (var i = 0; i < count2; i++) {
        result[n++] = value12;
      }
      return result;
    };
  };
  var replicate = typeof Array.prototype.fill === "function" ? replicateFill : replicatePolyfill;
  var fromFoldableImpl = function() {
    function Cons3(head4, tail2) {
      this.head = head4;
      this.tail = tail2;
    }
    var emptyList = {};
    function curryCons(head4) {
      return function(tail2) {
        return new Cons3(head4, tail2);
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
    return function(foldr4) {
      return function(xs) {
        return listToArray(foldr4(curryCons)(emptyList)(xs));
      };
    };
  }();
  var length = function(xs) {
    return xs.length;
  };
  var indexImpl = function(just) {
    return function(nothing) {
      return function(xs) {
        return function(i) {
          return i < 0 || i >= xs.length ? nothing : just(xs[i]);
        };
      };
    };
  };
  var findIndexImpl = function(just) {
    return function(nothing) {
      return function(f) {
        return function(xs) {
          for (var i = 0, l = xs.length; i < l; i++) {
            if (f(xs[i]))
              return just(i);
          }
          return nothing;
        };
      };
    };
  };
  var _deleteAt = function(just) {
    return function(nothing) {
      return function(i) {
        return function(l) {
          if (i < 0 || i >= l.length)
            return nothing;
          var l1 = l.slice();
          l1.splice(i, 1);
          return just(l1);
        };
      };
    };
  };
  var reverse = function(l) {
    return l.slice().reverse();
  };
  var sortByImpl = function() {
    function mergeFromTo(compare3, fromOrdering, xs1, xs2, from3, to2) {
      var mid;
      var i;
      var j;
      var k;
      var x;
      var y;
      var c;
      mid = from3 + (to2 - from3 >> 1);
      if (mid - from3 > 1)
        mergeFromTo(compare3, fromOrdering, xs2, xs1, from3, mid);
      if (to2 - mid > 1)
        mergeFromTo(compare3, fromOrdering, xs2, xs1, mid, to2);
      i = from3;
      j = mid;
      k = from3;
      while (i < mid && j < to2) {
        x = xs2[i];
        y = xs2[j];
        c = fromOrdering(compare3(x)(y));
        if (c > 0) {
          xs1[k++] = y;
          ++j;
        } else {
          xs1[k++] = x;
          ++i;
        }
      }
      while (i < mid) {
        xs1[k++] = xs2[i++];
      }
      while (j < to2) {
        xs1[k++] = xs2[j++];
      }
    }
    return function(compare3) {
      return function(fromOrdering) {
        return function(xs) {
          var out;
          if (xs.length < 2)
            return xs;
          out = xs.slice(0);
          mergeFromTo(compare3, fromOrdering, out, xs.slice(0), 0, xs.length);
          return out;
        };
      };
    };
  }();
  var zipWith = function(f) {
    return function(xs) {
      return function(ys) {
        var l = xs.length < ys.length ? xs.length : ys.length;
        var result = new Array(l);
        for (var i = 0; i < l; i++) {
          result[i] = f(xs[i])(ys[i]);
        }
        return result;
      };
    };
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

  // output/Control.Monad/index.js
  var unlessM = function(dictMonad) {
    var bind4 = bind(dictMonad.Bind1());
    var unless2 = unless(dictMonad.Applicative0());
    return function(mb) {
      return function(m) {
        return bind4(mb)(function(b) {
          return unless2(b)(m);
        });
      };
    };
  };
  var ap = function(dictMonad) {
    var bind4 = bind(dictMonad.Bind1());
    var pure5 = pure(dictMonad.Applicative0());
    return function(f) {
      return function(a) {
        return bind4(f)(function(f$prime) {
          return bind4(a)(function(a$prime) {
            return pure5(f$prime(a$prime));
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
    return function(eq2) {
      return function(gt) {
        return function(x) {
          return function(y) {
            return x < y ? lt : x === y ? eq2 : gt;
          };
        };
      };
    };
  };
  var ordIntImpl = unsafeCompareImpl;

  // output/Data.Eq/foreign.js
  var refEq = function(r1) {
    return function(r2) {
      return r1 === r2;
    };
  };
  var eqIntImpl = refEq;

  // output/Data.Eq/index.js
  var eqInt = {
    eq: eqIntImpl
  };
  var eq = function(dict) {
    return dict.eq;
  };

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
    return function(a) {
      return sub1(zero2)(a);
    };
  };

  // output/Data.Ord/index.js
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
  var identity4 = /* @__PURE__ */ identity(categoryFn);
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
  var fromMaybe = function(a) {
    return maybe(a)(identity4);
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
  var pureE = function(a) {
    return function() {
      return a;
    };
  };
  var bindE = function(a) {
    return function(f) {
      return function() {
        return f(a())();
      };
    };
  };

  // output/Effect/index.js
  var $runtime_lazy = function(name15, moduleName, init2) {
    var state4 = 0;
    var val;
    return function(lineNumber) {
      if (state4 === 2)
        return val;
      if (state4 === 1)
        throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state4 = 1;
      val = init2();
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
    return modify$prime(function(s) {
      var s$prime = f(s);
      return {
        state: s$prime,
        value: s$prime
      };
    });
  };
  var modify_ = function(f) {
    return function(s) {
      return $$void2(modify(f)(s));
    };
  };

  // output/Control.Monad.ST.Internal/foreign.js
  var map_ = function(f) {
    return function(a) {
      return function() {
        return f(a());
      };
    };
  };
  var pure_ = function(a) {
    return function() {
      return a;
    };
  };
  var bind_ = function(a) {
    return function(f) {
      return function() {
        return f(a())();
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
  var write2 = function(a) {
    return function(ref) {
      return function() {
        return ref.value = a;
      };
    };
  };

  // output/Control.Monad.ST.Internal/index.js
  var $runtime_lazy2 = function(name15, moduleName, init2) {
    var state4 = 0;
    var val;
    return function(lineNumber) {
      if (state4 === 2)
        return val;
      if (state4 === 1)
        throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state4 = 1;
      val = init2();
      state4 = 2;
      return val;
    };
  };
  var modify$prime2 = modifyImpl2;
  var modify2 = function(f) {
    return modify$prime2(function(s) {
      var s$prime = f(s);
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
  var splice = function(i) {
    return function(howMany) {
      return function(bs) {
        return function(xs) {
          return function() {
            return xs.splice.apply(xs, [i, howMany].concat(bs));
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
    function mergeFromTo(compare3, fromOrdering, xs1, xs2, from3, to2) {
      var mid;
      var i;
      var j;
      var k;
      var x;
      var y;
      var c;
      mid = from3 + (to2 - from3 >> 1);
      if (mid - from3 > 1)
        mergeFromTo(compare3, fromOrdering, xs2, xs1, from3, mid);
      if (to2 - mid > 1)
        mergeFromTo(compare3, fromOrdering, xs2, xs1, mid, to2);
      i = from3;
      j = mid;
      k = from3;
      while (i < mid && j < to2) {
        x = xs2[i];
        y = xs2[j];
        c = fromOrdering(compare3(x)(y));
        if (c > 0) {
          xs1[k++] = y;
          ++j;
        } else {
          xs1[k++] = x;
          ++i;
        }
      }
      while (i < mid) {
        xs1[k++] = xs2[i++];
      }
      while (j < to2) {
        xs1[k++] = xs2[j++];
      }
    }
    return function(compare3) {
      return function(fromOrdering) {
        return function(xs) {
          return function() {
            if (xs.length < 2)
              return xs;
            mergeFromTo(compare3, fromOrdering, xs, xs.slice(0), 0, xs.length);
            return xs;
          };
        };
      };
    };
  }();

  // output/Data.Array.ST/index.js
  var push = function(a) {
    return pushAll([a]);
  };

  // output/Data.Foldable/foreign.js
  var foldrArray = function(f) {
    return function(init2) {
      return function(xs) {
        var acc = init2;
        var len = xs.length;
        for (var i = len - 1; i >= 0; i--) {
          acc = f(xs[i])(acc);
        }
        return acc;
      };
    };
  };
  var foldlArray = function(f) {
    return function(init2) {
      return function(xs) {
        var acc = init2;
        var len = xs.length;
        for (var i = 0; i < len; i++) {
          acc = f(acc)(xs[i]);
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
  var snd = function(v) {
    return v.value1;
  };
  var semiringTuple = function(dictSemiring) {
    var add4 = add(dictSemiring);
    var one2 = one(dictSemiring);
    var mul3 = mul(dictSemiring);
    var zero2 = zero(dictSemiring);
    return function(dictSemiring1) {
      var add12 = add(dictSemiring1);
      var mul1 = mul(dictSemiring1);
      return {
        add: function(v) {
          return function(v1) {
            return new Tuple(add4(v.value0)(v1.value0), add12(v.value1)(v1.value1));
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

  // output/Data.Bifunctor/index.js
  var identity5 = /* @__PURE__ */ identity(categoryFn);
  var bimap = function(dict) {
    return dict.bimap;
  };
  var lmap = function(dictBifunctor) {
    var bimap1 = bimap(dictBifunctor);
    return function(f) {
      return bimap1(f)(identity5);
    };
  };
  var rmap = function(dictBifunctor) {
    return bimap(dictBifunctor)(identity5);
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

  // output/Unsafe.Coerce/foreign.js
  var unsafeCoerce2 = function(x) {
    return x;
  };

  // output/Safe.Coerce/index.js
  var coerce = function() {
    return unsafeCoerce2;
  };

  // output/Data.Newtype/index.js
  var coerce2 = /* @__PURE__ */ coerce();
  var unwrap = function() {
    return coerce2;
  };

  // output/Data.Foldable/index.js
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
      var alt6 = alt(dictPlus.Alt0());
      var empty6 = empty(dictPlus);
      return function(f) {
        return foldr22(function($453) {
          return alt6(f($453));
        })(empty6);
      };
    };
  };
  var traverse_ = function(dictApplicative) {
    var applySecond3 = applySecond(dictApplicative.Apply0());
    var pure5 = pure(dictApplicative);
    return function(dictFoldable) {
      var foldr22 = foldr(dictFoldable);
      return function(f) {
        return foldr22(function($454) {
          return applySecond3(f($454));
        })(pure5(unit));
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
      var mempty4 = mempty(dictMonoid);
      return function(v) {
        return function(v1) {
          if (v1 instanceof Nothing) {
            return mempty4;
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
      var mempty4 = mempty(dictMonoid);
      return function(f) {
        return foldr22(function(x) {
          return function(acc) {
            return append6(f(x))(acc);
          };
        })(mempty4);
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
    function array1(a) {
      return [a];
    }
    function array2(a) {
      return function(b) {
        return [a, b];
      };
    }
    function array3(a) {
      return function(b) {
        return function(c) {
          return [a, b, c];
        };
      };
    }
    function concat2(xs) {
      return function(ys) {
        return xs.concat(ys);
      };
    }
    return function(apply5) {
      return function(map9) {
        return function(pure5) {
          return function(f) {
            return function(array) {
              function go2(bot, top3) {
                switch (top3 - bot) {
                  case 0:
                    return pure5([]);
                  case 1:
                    return map9(array1)(f(array[bot]));
                  case 2:
                    return apply5(map9(array2)(f(array[bot])))(f(array[bot + 1]));
                  case 3:
                    return apply5(apply5(map9(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));
                  default:
                    var pivot = bot + Math.floor((top3 - bot) / 4) * 2;
                    return apply5(map9(concat2)(go2(bot, pivot)))(go2(pivot, top3));
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
      var map9 = map(dictFunctor);
      return function(dictSemigroup) {
        var append6 = append(dictSemigroup);
        return function(f) {
          var $162 = foldl11(append6);
          var $163 = map9(f);
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
        return maybe(v2)(function(i) {
          return fromJust2(deleteAt(i)(v2));
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
      for (var i = xs.length - 2; i >= 0; i--) {
        acc = f(xs[i])(acc);
      }
      return acc;
    };
  };
  var foldl1Impl = function(f) {
    return function(xs) {
      var acc = xs[0];
      var len = xs.length;
      for (var i = 1; i < len; i++) {
        acc = f(acc)(xs[i]);
      }
      return acc;
    };
  };
  var traverse1Impl = function() {
    function Cont(fn) {
      this.fn = fn;
    }
    var emptyList = {};
    var ConsCell = function(head4, tail2) {
      this.head = head4;
      this.tail = tail2;
    };
    function finalCell(head4) {
      return new ConsCell(head4, emptyList);
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
      return function(map9) {
        return function(f) {
          var buildFrom = function(x, ys) {
            return apply5(map9(consList)(f(x)))(ys);
          };
          var go2 = function(acc, currentLen, xs) {
            if (currentLen === 0) {
              return acc;
            } else {
              var last2 = xs[currentLen - 1];
              return new Cont(function() {
                var built = go2(buildFrom(last2, acc), currentLen - 1, xs);
                return built;
              });
            }
          };
          return function(array) {
            var acc = map9(finalCell)(f(array[array.length - 1]));
            var result = go2(acc, array.length - 1, array);
            while (result instanceof Cont) {
              result = result.fn();
            }
            return map9(listToArray)(result);
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
      for (var i = 0; i < l; i++) {
        result[i] = f(i)(xs[i]);
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
      var mempty4 = mempty(dictMonoid);
      return function(f) {
        return foldrWithIndex1(function(i) {
          return function(x) {
            return function(acc) {
              return append6(f(i)(x))(acc);
            };
          };
        })(mempty4);
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

  // output/Data.Number/foreign.js
  var isFiniteImpl = isFinite;
  var cos = Math.cos;
  var floor = Math.floor;
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

  // output/FRP.Event/foreign.js
  var fastForeachE = (as, f) => {
    for (var i = 0, l = as.length; i < l; i++) {
      f(as[i]);
    }
  };
  var fastForeachOhE = (o, f) => {
    for (const a in o) {
      f(o[a]);
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
  var foldableList = {
    foldr: function(f) {
      return function(b) {
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
        var $284 = foldl(foldableList)(flip(f))(b);
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
          function $tco_loop(b, v) {
            if (v instanceof Nil) {
              $tco_done1 = true;
              return b;
            }
            ;
            if (v instanceof Cons) {
              $tco_var_b = f(b)(v.value0);
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
      var mempty4 = mempty(dictMonoid);
      return function(f) {
        return foldl(foldableList)(function(acc) {
          var $286 = append22(acc);
          return function($287) {
            return $286(f($287));
          };
        })(mempty4);
      };
    }
  };

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
    var compare3 = compare(dictOrd);
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
            var v2 = compare3(k)(v.value1);
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
            var v3 = compare3(k)(v.value1);
            if (v3 instanceof EQ) {
              $tco_done = true;
              return new Just(v.value2);
            }
            ;
            var v4 = compare3(k)(v.value4);
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
  var insert2 = function(dictOrd) {
    var fromZipper1 = fromZipper(dictOrd);
    var compare3 = compare(dictOrd);
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
                var v3 = compare3(k)(v2.value1);
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
                var v3 = compare3(k)(v2.value1);
                if (v3 instanceof EQ) {
                  $tco_done1 = true;
                  return fromZipper1(v1)(new Three(v2.value0, k, v, v2.value3, v2.value4, v2.value5, v2.value6));
                }
                ;
                var v4 = compare3(k)(v2.value4);
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
    var compare3 = compare(dictOrd);
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
              var v = compare3(k)(m.value1);
              if (m.value3 instanceof Leaf && v instanceof EQ) {
                $tco_done3 = true;
                return new Just(new Tuple(m.value2, up(ctx)(Leaf.value)));
              }
              ;
              if (v instanceof EQ) {
                var max6 = maxNode(m.value0);
                $tco_done3 = true;
                return new Just(new Tuple(m.value2, removeMaxNode(new Cons(new TwoLeft(max6.key, max6.value, m.value3), ctx))(m.value0)));
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
              var v = compare3(k)(m.value4);
              var v3 = compare3(k)(m.value1);
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
                var max6 = maxNode(m.value0);
                $tco_done3 = true;
                return new Just(new Tuple(m.value2, removeMaxNode(new Cons(new ThreeLeft(max6.key, max6.value, m.value3, m.value4, m.value5, m.value6), ctx))(m.value0)));
              }
              ;
              if (v instanceof EQ) {
                var max6 = maxNode(m.value3);
                $tco_done3 = true;
                return new Just(new Tuple(m.value5, removeMaxNode(new Cons(new ThreeMiddle(m.value0, m.value1, m.value2, max6.key, max6.value, m.value6), ctx))(m.value3)));
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
      var mempty4 = mempty(dictMonoid);
      var append22 = append(dictMonoid.Semigroup0());
      return function(f) {
        return function(m) {
          if (m instanceof Leaf) {
            return mempty4;
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
      var mempty4 = mempty(dictMonoid);
      var append22 = append(dictMonoid.Semigroup0());
      return function(f) {
        return function(m) {
          if (m instanceof Leaf) {
            return mempty4;
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
    var insert1 = insert2(dictOrd);
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

  // output/Data.Set/index.js
  var foldMap2 = /* @__PURE__ */ foldMap(foldableList);
  var foldl2 = /* @__PURE__ */ foldl(foldableList);
  var foldr2 = /* @__PURE__ */ foldr(foldableList);
  var union2 = function(dictOrd) {
    var union1 = union(dictOrd);
    return function(v) {
      return function(v1) {
        return union1(v)(v1);
      };
    };
  };
  var toList = function(v) {
    return keys(v);
  };
  var singleton5 = function(a) {
    return singleton4(a)(unit);
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
          return $129(toList($130));
        };
      };
    },
    foldl: function(f) {
      return function(x) {
        var $131 = foldl2(f)(x);
        return function($132) {
          return $131(toList($132));
        };
      };
    },
    foldr: function(f) {
      return function(x) {
        var $133 = foldr2(f)(x);
        return function($134) {
          return $133(toList($134));
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
    return function(a) {
      return function(v) {
        return delete1(a)(v);
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
  function clearTimeoutImpl(id) {
    return function() {
      clearTimeout(id);
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

  // output/Effect.Uncurried/foreign.js
  var mkEffectFn1 = function mkEffectFn12(fn) {
    return function(x) {
      return fn(x)();
    };
  };
  var runEffectFn1 = function runEffectFn12(fn) {
    return function(a) {
      return function() {
        return fn(a);
      };
    };
  };

  // output/Effect.Uncurried/index.js
  var semigroupEffectFn1 = function(dictSemigroup) {
    var append6 = append(semigroupEffect(dictSemigroup));
    return {
      append: function(f1) {
        return function(f2) {
          return mkEffectFn1(function(a) {
            return append6(runEffectFn1(f1)(a))(runEffectFn1(f2)(a));
          });
        };
      }
    };
  };
  var monoidEffectFn1 = function(dictMonoid) {
    var mempty4 = mempty(monoidEffect(dictMonoid));
    var semigroupEffectFn11 = semigroupEffectFn1(dictMonoid.Semigroup0());
    return {
      mempty: mkEffectFn1(function(v) {
        return mempty4;
      }),
      Semigroup0: function() {
        return semigroupEffectFn11;
      }
    };
  };

  // output/FRP.Event.Class/index.js
  var keepLatest = function(dict) {
    return dict.keepLatest;
  };

  // output/Unsafe.Reference/foreign.js
  function reallyUnsafeRefEq(a) {
    return function(b) {
      return a === b;
    };
  }

  // output/Unsafe.Reference/index.js
  var unsafeRefEq = reallyUnsafeRefEq;

  // output/FRP.Event/index.js
  var $runtime_lazy3 = function(name15, moduleName, init2) {
    var state4 = 0;
    var val;
    return function(lineNumber) {
      if (state4 === 2)
        return val;
      if (state4 === 1)
        throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state4 = 1;
      val = init2();
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
  var append1 = /* @__PURE__ */ append(/* @__PURE__ */ semigroupSet(ordTimeoutId));
  var for_22 = /* @__PURE__ */ for_2(foldableSet);
  var apply2 = /* @__PURE__ */ apply(applyEffect);
  var map2 = /* @__PURE__ */ map(functorEffect);
  var sampleOnRight2 = function(v) {
    return function(v1) {
      return function(b, k) {
        var latest = $$new(Nothing.value)();
        var c1 = v(b, function(a) {
          return write(new Just(a))(latest)();
        });
        var c2 = v1(b, function(f) {
          var o = read(latest)();
          return for_1(o)(function(a) {
            return function() {
              return k(f(a));
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
      return function(b, k) {
        var latest = $$new(Nothing.value)();
        var c1 = v(b, function(a) {
          var o = read(latest)();
          return for_1(o)(function(f) {
            return function() {
              return k(f(a));
            };
          })();
        });
        var c2 = v1(b, function(f) {
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
        return function(b, k) {
          return v(b, function(a) {
            return k(f(a));
          });
        };
      };
    }
  };
  var map1 = /* @__PURE__ */ map(functorEvent);
  var filter4 = function(p) {
    return function(v) {
      return function(tf, k) {
        return v(tf, function(a) {
          var v1 = p(a);
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
    return filter4(function(a) {
      var v = f(a);
      if (v) {
        return new Just(a);
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
      push: function(a) {
        return fastForeachOhE(subscribers, function(rk) {
          var k = read(rk)();
          return k(a);
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
    partition: function(p) {
      return function(xs) {
        return {
          yes: filter$prime(p)(xs),
          no: filter$prime(function($210) {
            return !p($210);
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
        var c1 = v(tf, function(a) {
          var o = read(capturing)();
          if (o) {
            return $$void3(liftST2(push(a)(replay1)))();
          }
          ;
          write(new Just(a))(latest1)();
          var res = read(latest2)();
          return for_1(res)(function(f) {
            return function() {
              return k(f(a));
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
          return for_1(res)(function(a) {
            return function() {
              return k(f(a));
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
          return fastForeachE(samples1, function(a) {
            write(new Just(a))(latest1)();
            return fastForeachE(samples2, function(f) {
              write(new Just(f))(latest2)();
              return k(f(a));
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
  var subscribe = function(i) {
    return function(v) {
      return v;
    }($lazy_backdoor(328).subscribe)(i);
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
        push: function(a) {
          return function() {
            return fastForeachOhE(subscribers, function(rk) {
              var k = read(rk)();
              return k(a);
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
            return e(function(a) {
              return function() {
                return k(a);
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
            return e(function(a) {
              return function() {
                return k(a);
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
            return e(o)(function(a) {
              return function() {
                return k(a);
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
            return function(b, k) {
              var v1 = create$prime();
              k(f(v1.event));
              return v(b, v1.push);
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
          var lookup2 = lookup(dictOrd);
          return function(v) {
            return function(f) {
              return function(tf, k1) {
                var r = $$new(empty2)();
                k1(f(function(a) {
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
                    })(a))(r))();
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
                    })(a))(r));
                  };
                }));
                var unsub = v(tf, function(v1) {
                  var o = read(r)();
                  var v2 = lookup2(v1.address)(o);
                  if (v2 instanceof Nothing) {
                    return unit;
                  }
                  ;
                  if (v2 instanceof Just) {
                    return fastForeachE(v2.value0, function(i) {
                      return i(v1.payload);
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
              var canceler = v(tf, function(a) {
                var localId = $$new(Nothing.value)();
                var id = setTimeout2(n)(function __do2() {
                  k(a);
                  var lid = read(localId)();
                  return maybe(pure2(unit))(function(id2) {
                    return modify_($$delete4(id2))(tid);
                  })(lid)();
                })();
                write(new Just(id))(localId)();
                return modify_(append1(singleton5(id)))(tid)();
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
  var makeEvent = function(i) {
    return function(v) {
      return v;
    }(backdoor.makeEvent)(i);
  };
  var makeLemmingEventO = function(i) {
    return function(v) {
      return v;
    }(backdoor.makeLemmingEventO)(i);
  };
  var applyEvent = {
    apply: function(a) {
      return function(b) {
        return biSampleOn(a)(map1(applyFlipped)(b));
      };
    },
    Functor0: function() {
      return functorEvent;
    }
  };
  var applicativeEvent = {
    pure: function(a) {
      return function(v, k) {
        k(a);
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
          return apply2(map2(function(v2) {
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
  var attr = function(dict) {
    return dict.attr;
  };
  var pureAttr = function(dictAttr) {
    var attr1 = attr(dictAttr);
    return function(a) {
      return function(b) {
        return pure3(attr1(a)(b));
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
  var fixed = function(a) {
    return new FixedChildren$prime(a);
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
  function _foldM(bind4) {
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
              acc = bind4(acc)(g2(k));
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
  var foldr3 = /* @__PURE__ */ foldr(foldableArray);
  var values = /* @__PURE__ */ toArrayWithKey(function(v) {
    return function(v1) {
      return v1;
    };
  });
  var thawST = _copyST;
  var mutate = function(f) {
    return function(m) {
      return runST(function __do2() {
        var s = thawST(m)();
        f(s)();
        return s;
      });
    };
  };
  var insert4 = function(k) {
    return function(v) {
      return mutate(poke2(k)(v));
    };
  };
  var fold3 = /* @__PURE__ */ _foldM(applyFlipped);
  var foldMap3 = function(dictMonoid) {
    var append13 = append(dictMonoid.Semigroup0());
    var mempty4 = mempty(dictMonoid);
    return function(f) {
      return fold3(function(acc) {
        return function(k) {
          return function(v) {
            return append13(acc)(f(k)(v));
          };
        };
      })(mempty4);
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
          return foldr3(f)(z)(values(m));
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
  var map3 = /* @__PURE__ */ map(functorEvent);
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
    function Begin2() {
    }
    ;
    Begin2.value = new Begin2();
    return Begin2;
  }();
  var Middle = /* @__PURE__ */ function() {
    function Middle2() {
    }
    ;
    Middle2.value = new Middle2();
    return Middle2;
  }();
  var End = /* @__PURE__ */ function() {
    function End2() {
    }
    ;
    End2.value = new End2();
    return End2;
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
            return keepLatest3(map3(flatten(v)(psr)(interpreter))(v1.value0));
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
                    return traverse_2(function(i) {
                      return function() {
                        return v3(v.doLogic(kid$prime.value0)(interpreter)(i));
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
                      $125.raiseId = function(id) {
                        return $$void4(modify2(append4([id]))(myIds));
                      };
                      return $125;
                    }())(interpreter)(kid$prime.value0), v3);
                    $$void4(modify2(insert4(eltsUnsubId)(c1))(cancelInner))();
                    return $$void4(write2(c1)(eltsUnsub))();
                  }
                  ;
                  return unit;
                });
                $$void4(write2(c0)(myUnsub))();
                $$void4(modify2(insert4(myUnsubId)(c0))(cancelInner))();
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
  var identity6 = /* @__PURE__ */ identity(categoryFn);
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
      return dimap1(a2b)(identity6);
    };
  };

  // output/Control.Monad.State.Class/index.js
  var state = function(dict) {
    return dict.state;
  };

  // output/Deku.Core/index.js
  var lcmap2 = /* @__PURE__ */ lcmap(profunctorFn);
  var map4 = /* @__PURE__ */ map(functorEvent);
  var unsafeSetPos$prime = function(i) {
    return function(v) {
      var f = function(v1) {
        if (v1 instanceof Element$prime) {
          return new Element$prime(lcmap2(function(v2) {
            return {
              pos: i,
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
          return new EventfulElement$prime(map4(f)(v1.value0));
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
  var map5 = /* @__PURE__ */ map(functorEvent);
  var oneOf2 = /* @__PURE__ */ oneOf(foldableArray)(plusEvent);
  var pure4 = /* @__PURE__ */ pure(applicativeEvent);
  var pure12 = /* @__PURE__ */ pure(applicativeST);
  var unwrap2 = /* @__PURE__ */ unwrap();
  var eq12 = /* @__PURE__ */ eq(eqScope);
  var alt2 = /* @__PURE__ */ alt(altEvent);
  var append5 = /* @__PURE__ */ append(semigroupArray);
  var unsafeSetAttribute = function(v) {
    return function(id) {
      return function(atts) {
        return map5(function($133) {
          return function(v1) {
            if (v1.value instanceof Prop$prime) {
              return v.setProp({
                id,
                key: v1.key,
                value: v1.value.value0
              });
            }
            ;
            if (v1.value instanceof Cb$prime) {
              return v.setCb({
                id,
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
  var portalFlatten = function() {
    return {
      doLogic: function(pos) {
        return function(v) {
          return function(id) {
            return v.sendToPos({
              id,
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
            scopeEq: eq12
          });
        };
      },
      toElt: function(v) {
        return v;
      }
    };
  };
  var portalFlatten1 = /* @__PURE__ */ portalFlatten();
  var __internalDekuFlatten = function(a) {
    return function(b) {
      return function(v) {
        return flatten(portalFlatten1)(a)(b)(v);
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
              })), unsafeSetAttribute(v1)(me)(atts)])(maybe([])(function(p) {
                return [pure4(v1.attributeParent({
                  id: me,
                  parent: p,
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

  // output/Deku.DOM.Elt.Defs/index.js
  var coerce3 = /* @__PURE__ */ coerce();
  var defs = function(attributes) {
    return function(kids) {
      return new Element$prime(elementify("defs")(attributes)(coerce3(fixed(coerce3(mapWithIndex(unsafeSetPos)(kids))))));
    };
  };
  var defs_ = /* @__PURE__ */ defs(/* @__PURE__ */ empty(plusEvent));

  // output/Deku.DOM.Elt.Div/index.js
  var coerce4 = /* @__PURE__ */ coerce();
  var div2 = function(attributes) {
    return function(kids) {
      return new Element$prime(elementify("div")(attributes)(coerce4(fixed(coerce4(mapWithIndex(unsafeSetPos)(kids))))));
    };
  };
  var div_ = /* @__PURE__ */ div2(/* @__PURE__ */ empty(plusEvent));

  // output/Deku.DOM.Elt.G/index.js
  var coerce5 = /* @__PURE__ */ coerce();
  var g = function(attributes) {
    return function(kids) {
      return new Element$prime(elementify("g")(attributes)(coerce5(fixed(coerce5(mapWithIndex(unsafeSetPos)(kids))))));
    };
  };

  // output/Deku.DOM.Elt.LinearGradient/index.js
  var coerce6 = /* @__PURE__ */ coerce();
  var linearGradient = function(attributes) {
    return function(kids) {
      return new Element$prime(elementify("linearGradient")(attributes)(coerce6(fixed(coerce6(mapWithIndex(unsafeSetPos)(kids))))));
    };
  };

  // output/Deku.DOM.Elt.Path/index.js
  var coerce7 = /* @__PURE__ */ coerce();
  var path = function(attributes) {
    return function(kids) {
      return new Element$prime(elementify("path")(attributes)(coerce7(fixed(coerce7(mapWithIndex(unsafeSetPos)(kids))))));
    };
  };

  // output/Deku.DOM.Elt.Stop/index.js
  var coerce8 = /* @__PURE__ */ coerce();
  var stop = function(attributes) {
    return function(kids) {
      return new Element$prime(elementify("stop")(attributes)(coerce8(fixed(coerce8(mapWithIndex(unsafeSetPos)(kids))))));
    };
  };

  // output/Deku.DOM.Elt.Svg/index.js
  var coerce9 = /* @__PURE__ */ coerce();
  var svg = function(attributes) {
    return function(kids) {
      return new Element$prime(elementify("svg")(attributes)(coerce9(fixed(coerce9(mapWithIndex(unsafeSetPos)(kids))))));
    };
  };

  // output/Deku.Interpret/foreign.js
  var attributeParent_ = (runOnJust2) => (a) => (state4) => () => {
    if (state4.units[a.id]) {
      const dom2 = state4.units[a.parent].main;
      if (!(state4.units[a.id].main && state4.units[a.id].main.parentNode || state4.units[a.id].startBeacon && state4.units[a.id].startBeacon.parentNode)) {
        const iRan = a.ez ? (() => {
          if (state4.units[a.id].main) {
            dom2.appendChild(state4.units[a.id].main);
          } else {
            dom2.appendChild(state4.units[a.id].startBeacon);
            dom2.appendChild(state4.units[a.id].endBeacon);
          }
          return true;
        })() : runOnJust2(a.pos)((pos) => () => {
          return runOnJust2(a.dynFamily)((dynFamily) => () => {
            var i = 0;
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
              if (state4.units[a.id].startBeacon) {
                dom2.insertBefore(state4.units[a.id].startBeacon, dom2.childNodes[k]);
                dom2.insertBefore(state4.units[a.id].endBeacon, dom2.childNodes[k]);
              } else {
                dom2.insertBefore(state4.units[a.id].main, dom2.childNodes[k]);
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
              if (i === pos) {
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
                i++;
              }
              if (dom2.childNodes[j].nodeType === 8 && dom2.childNodes[j].nodeValue === terminalDyn) {
                terminalDyn = void 0;
                i++;
              }
              j++;
            }
            return false;
          })();
        })();
        if (!iRan) {
          if (a.parent.indexOf("@!%") !== -1) {
            const usedDynBeacon = runOnJust2(a.dynFamily)((df) => () => {
              if (state4.units[a.id].main) {
                state4.units[df].endBeacon.parentNode.insertBefore(state4.units[a.id].main, state4.units[df].endBeacon);
              } else {
                state4.units[df].endBeacon.parentNode.insertBefore(state4.units[a.id].endBeacon, state4.units[df].endBeacon);
                state4.units[df].endBeacon.parentNode.insertBefore(state4.units[a.id].startBeacon, state4.units[a.id].endBeacon);
              }
              return true;
            })();
            if (usedDynBeacon) {
            } else if (state4.units[a.id].main) {
              dom2.parentNode.replaceChild(state4.units[a.id].main, dom2);
            } else {
              dom2.parentNode.replaceChild(state4.units[a.id].endBeacon, dom2);
              state4.units[a.id].endBeacon.parentNode.insertBefore(state4.units[a.id].startBeacon, state4.units[a.id].endBeacon);
            }
          } else {
            const hasADynFamily = runOnJust2(a.dynFamily)((dynFamily) => () => {
              if (state4.units[a.id].startBeacon) {
                dom2.insertBefore(state4.units[a.id].startBeacon, state4.units[dynFamily].endBeacon);
                dom2.insertBefore(state4.units[a.id].endBeacon, state4.units[dynFamily].endBeacon);
              } else {
                dom2.insertBefore(state4.units[a.id].main, state4.units[dynFamily].endBeacon);
              }
              return true;
            })();
            if (!hasADynFamily) {
              if (state4.units[a.id].startBeacon) {
                dom2.appendChild(state4.units[a.id].startBeacon);
                dom2.appendChild(state4.units[a.id].endBeacon);
              } else {
                dom2.appendChild(state4.units[a.id].main);
              }
            }
          }
        }
      }
    }
  };
  var makeDynBeacon_ = (runOnJust2) => (tryHydration) => (a) => (state4) => () => {
    var startBeacon;
    var endBeacon;
    var ptr = a.id;
    if (!state4.scopes[a.scope]) {
      state4.scopes[a.scope] = [];
    }
    state4.scopes[a.scope].push(ptr);
    const iRan = runOnJust2(a.parent)(() => () => {
      if (state4.hydrating && tryHydration && (startBeacon = state4.allBeacons[a.id]) && (endBeacon = state4.allBeacons[`${a.id}%-%`])) {
        state4.units[ptr] = {
          listeners: {},
          parent: a.parent,
          scope: a.scope,
          pos: a.pos,
          dynFamily: a.dynFamily,
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
      const startBeacon2 = document.createComment(`%-%${a.id}`);
      const endBeacon2 = document.createComment(`%-%${a.id}%-%`);
      state4.units[ptr] = {
        listeners: {},
        parent: a.parent,
        dynFamily: a.dynFamily,
        scope: a.scope,
        pos: a.pos,
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
  var getDynFamily = (id) => (state4) => () => state4.units[id] && state4.units[id].dynFamily ? state4.units[id].dynFamily : (() => {
    throw new Error(`No positional information for ${id}`);
  })();
  var getParent = (id) => (state4) => () => state4.units[id] && state4.units[id].main && state4.units[id].main.parentNode && state4.units[id].main.parentNode.$dekuId ? state4.units[id].main.parentNode.$dekuId : state4.units[id] && state4.units[id].startBeacon && state4.units[id].startBeacon.parentNode && state4.units[id].startBeacon.parentNode.$dekuId ? state4.units[id].startBeacon.parentNode.$dekuId : (() => {
    throw new Error(`No parent information for ${id}`);
  })();
  var getScope = (id) => (state4) => () => state4.units[id] && state4.units[id].scope ? state4.units[id].scope : (() => {
    throw new Error(`No scope information for ${id}`);
  })();
  var makeElement_ = (runOnJust2) => (tryHydration) => (a) => (state4) => () => {
    var dom2;
    var ptr = a.id;
    if (!state4.scopes[a.scope]) {
      state4.scopes[a.scope] = [];
    }
    state4.scopes[a.scope].push(ptr);
    const iRan = runOnJust2(a.parent)(() => () => {
      if (state4.hydrating && tryHydration && (dom2 = document.documentElement.querySelector(`[data-deku-ssr="${ptr}"]`))) {
        state4.units[ptr] = {
          listeners: {},
          pos: a.pos,
          parent: a.parent,
          scope: a.scope,
          dynFamily: a.dynFamily,
          main: dom2
        };
        dom2.$dekuId = ptr;
        return true;
      }
      return false;
    })();
    if (!iRan) {
      const main2 = svgTags.has(a.tag) ? document.createElementNS("http://www.w3.org/2000/svg", a.tag) : document.createElement(a.tag);
      state4.units[ptr] = {
        listeners: {},
        parent: a.parent,
        pos: a.pos,
        scope: a.scope,
        dynFamily: a.dynFamily,
        main: main2
      };
      main2.$dekuId = ptr;
    }
  };
  var makeText_ = (runOnJust2) => (tryHydration) => (maybe2) => (a) => (state4) => () => {
    var ptr = a.id;
    var dom2;
    if (!state4.scopes[a.scope]) {
      state4.scopes[a.scope] = [];
    }
    state4.scopes[a.scope].push(ptr);
    const iRan = runOnJust2(a.parent)((parent2) => () => {
      if (state4.hydrating && tryHydration && (dom2 = document.documentElement.querySelector(`[data-deku-ssr="${parent2}"]`))) {
        var i = 0;
        for (; i < dom2.childNodes.length; i++) {
          const ptrSplit = ptr.split("@-@");
          if (dom2.childNodes[i].nodeType === 8 && dom2.childNodes[i].nodeValue === ptrSplit[0]) {
            i = i - 1;
            var textWasBlank = i === -1;
            var textWasBlankAfterDynBeacon = i >= 0 && dom2.childNodes[i].nodeType === 8;
            if (textWasBlank) {
              dom2.prepend(document.createTextNode(""));
            }
            if (textWasBlankAfterDynBeacon) {
              dom2.insertBefore(document.createTextNode(""), dom2.childNodes[i + 1]);
            }
            break;
          }
        }
        const main2 = dom2.childNodes[i];
        state4.units[ptr] = {
          main: main2,
          pos: a.pos,
          parent: a.parent,
          scope: a.scope
        };
        main2.$dekuId = ptr;
        return true;
      }
      return false;
    })();
    if (!iRan) {
      const main2 = document.createTextNode("");
      state4.units[ptr] = {
        main: main2,
        parent: a.parent,
        scope: a.scope,
        pos: a.pos,
        dynFamily: a.dynFamily
      };
      main2.$dekuId = ptr;
    }
  };
  function makeFFIDOMSnapshot() {
    return {
      units: {},
      scopes: {},
      allBeacons: {}
    };
  }
  var setProp_ = (tryHydration) => (a) => (state4) => () => {
    if (state4.units[a.id]) {
      var ptr = a.id;
      var avv = a.value;
      if (state4.hydrating && tryHydration && !state4.units[ptr] && (dom = document.documentElement.querySelector(`[data-deku-ssr="${ptr}"]`))) {
        state4.units[ptr] = {
          listeners: {},
          parent: a.parent,
          scope: a.scope,
          main: dom
        };
        if (!state4.scopes[a.scope]) {
          state4.scopes[a.scope] = [];
        }
        state4.scopes[a.scope].push(ptr);
      }
      if (state4.units[ptr].main.tagName === "INPUT" && a.key === "value") {
        state4.units[ptr].main.value = avv;
      } else if (state4.units[ptr].main.tagName === "TEXTAREA" && a.key === "value") {
        state4.units[ptr].main.value = avv;
      } else if (state4.units[ptr].main.tagName === "INPUT" && a.key === "checked") {
        state4.units[ptr].main.checked = avv === "true";
      } else if (a.key === "disabled") {
        state4.units[ptr].main.disabled = avv === "true";
      } else {
        state4.units[ptr].main.setAttribute(a.key, avv);
      }
    }
  };
  var setCb_ = (tryHydration) => (a) => (state4) => () => {
    if (state4.units[a.id]) {
      var ptr = a.id;
      var avv = a.value;
      if (state4.hydrating && tryHydration && !state4.units[ptr] && (dom = document.documentElement.querySelector(`[data-deku-ssr="${ptr}"]`))) {
        state4.units[ptr] = {
          listeners: {},
          parent: a.parent,
          scope: a.scope,
          main: dom
        };
        if (!state4.scopes[a.scope]) {
          state4.scopes[a.scope] = [];
        }
        state4.scopes[a.scope].push(ptr);
      }
      if (a.key === "@self@") {
        avv(state4.units[ptr].main)();
      } else {
        if (state4.units[ptr].listeners[a.key]) {
          state4.units[ptr].main.removeEventListener(a.key, state4.units[ptr].listeners[a.key]);
        }
        var el = (e) => avv(e)();
        state4.units[ptr].main.addEventListener(a.key, el);
        state4.units[ptr].listeners[a.key] = el;
      }
    }
  };
  var setText_ = (a) => (state4) => () => {
    if (state4.units[a.id]) {
      var ptr = a.id;
      state4.units[ptr].main.nodeValue = a.text;
    }
  };
  var makePursx_ = (runOnJust2) => (tryHydration) => (maybe2) => (a) => (state4) => () => {
    var dom2;
    var tmp;
    var ptr = a.id;
    var html = a.html;
    var verb = a.verb;
    var cache = a.cache;
    var parent2 = a.parent;
    var scope2 = a.scope;
    var pxScope = a.pxScope;
    const iRan = runOnJust2(a.parent)(() => () => {
      if (state4.hydrating && tryHydration && (dom2 = document.documentElement.querySelector(`[data-deku-ssr="${ptr}"]`))) {
        state4.units[ptr] = {
          listeners: {},
          pos: a.pos,
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
      for (var i = 0; i < entries.length; i++) {
        const key = entries[i][0];
        if (entries[i][1] === true) {
          html = html.replace(verb + key + verb, 'data-deku-attr-internal="' + key + '"');
        } else {
          html = html.replace(verb + key + verb, '<span style="display:contents;" data-deku-elt-internal="' + key + '"></span>');
        }
      }
      tmp = document.createElement("div");
      tmp.innerHTML = html.trim();
      state4.units[ptr] = {
        listeners: {},
        pos: a.pos,
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
      var key = e.getAttribute("data-deku-attr-internal");
      const namespacedKey = key + "@!%" + pxScope;
      state4.units[namespacedKey] = {
        listeners: {},
        main: e,
        scope: scope2
      };
      state4.scopes[scope2].push(namespacedKey);
    });
    tmp.querySelectorAll("[data-deku-elt-internal]").forEach(function(e) {
      var key = e.getAttribute("data-deku-elt-internal");
      const namespacedKey = key + "@!%" + pxScope;
      state4.units[key + "@!%" + pxScope] = {
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
  var makeRoot_ = (a) => (state4) => () => {
    var ptr = a.id;
    state4.units[ptr] = {
      main: a.root
    };
    a.root.$dekuId = ptr;
  };
  var giveNewParent_ = (just) => (runOnJust2) => (b) => (state4) => () => {
    const insertAt2 = (ptr, parent2, node) => {
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
    runMe.push(b);
    for (var z = 0; z < runMe.length; z++) {
      const a = runMe[z];
      const ptr = a.id;
      const parent2 = a.parent;
      state4.units[ptr].containingScope = a.scope;
      var aPos = void 0;
      runOnJust2(a.pos)((myPos) => () => {
        aPos = myPos;
        return true;
      })();
      if (aPos === void 0) {
        aPos = Number.MAX_VALUE;
      }
      const nodes = state4.units[parent2].main.childNodes;
      var i = 0;
      var didInsert = false;
      var pos = 0;
      while (i < nodes.length) {
        var dkid;
        if (dkid = nodes[i].$dekuId) {
          const insertedBeforeEndBeacon = runOnJust2(a.dynFamily)((df) => () => {
            if (didInsert) {
              return false;
            }
            if (state4.units[dkid].endBeacon === nodes[i] && df === dkid) {
              state4.units[ptr].pos = just(pos);
              insertAt2(ptr, parent2, nodes[i]);
              return true;
            }
            return false;
          })();
          if (insertedBeforeEndBeacon) {
            didInsert = true;
            break;
          }
          if (state4.units[dkid].dynFamily !== state4.units[ptr].dynFamily) {
            i++;
            continue;
          }
          if (didInsert) {
            i++;
            continue;
          }
          if (pos === aPos) {
            insertAt2(ptr, parent2, nodes[i]);
            pos++;
            didInsert = true;
          } else if (state4.units[dkid].endBeacon !== nodes[i]) {
            state4.units[dkid].pos = just(pos);
            pos++;
          }
        }
        i++;
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
  var disconnectElement_ = (a) => (state4) => () => {
    if (state4.units[a.id]) {
      var ptr = a.id;
      if (state4.units[ptr].containingScope && !a.scopeEq(state4.units[ptr].containingScope)(a.scope)) {
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
  var deleteFromCache_ = (a) => (state4) => () => {
    if (state4.units[a.id]) {
      delete state4.units[a.id];
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
      return function(max6) {
        return function(n) {
          var rangeSize = max6 - min5 | 0;
          var n$prime = mod2(n)(rangeSize);
          var $25 = n$prime < min5;
          if ($25) {
            return n$prime + max6 | 0;
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
    var map9 = map(dictFunctor);
    return {
      map: function(f) {
        return function(v) {
          return function(s) {
            return map9(function(v1) {
              return new Tuple(f(v1.value0), v1.value1);
            })(v(s));
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
    var bind4 = bind(dictMonad.Bind1());
    return {
      bind: function(v) {
        return function(f) {
          return function(s) {
            return bind4(v(s))(function(v1) {
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
    var pure5 = pure(dictMonad.Applicative0());
    return {
      pure: function(a) {
        return function(s) {
          return pure5(new Tuple(a, s));
        };
      },
      Apply0: function() {
        return applyStateT(dictMonad);
      }
    };
  };
  var monadStateStateT = function(dictMonad) {
    var pure5 = pure(dictMonad.Applicative0());
    var monadStateT1 = monadStateT(dictMonad);
    return {
      state: function(f) {
        return function($200) {
          return pure5(f($200));
        };
      },
      Monad0: function() {
        return monadStateT1;
      }
    };
  };

  // output/Control.Monad.State/index.js
  var evalState = function(v) {
    return function(s) {
      var v1 = v(s);
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
    var f = function(s) {
      return new Tuple(unSeed(s.newSeed), function() {
        var $94 = {};
        for (var $95 in s) {
          if ({}.hasOwnProperty.call(s, $95)) {
            $94[$95] = s[$95];
          }
          ;
        }
        ;
        $94.newSeed = lcgNext(s.newSeed);
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
  var chooseInt$prime = function(a) {
    return function(b) {
      var numB = toNumber(b);
      var numA = toNumber(a);
      var clamp = function(x) {
        return numA + remainder(x)(numB - numA + 1);
      };
      var choose31BitPosNumber = map23(toNumber)(lcgStep);
      var choose32BitPosNumber = apply4(map23(add2)(choose31BitPosNumber))(map23(mul2(2))(choose31BitPosNumber));
      return map23(function($109) {
        return floor2(clamp($109));
      })(choose32BitPosNumber);
    };
  };
  var chooseInt2 = function(a) {
    return function(b) {
      var $101 = a <= b;
      if ($101) {
        return chooseInt$prime(a)(b);
      }
      ;
      return chooseInt$prime(b)(a);
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
  var $$void5 = /* @__PURE__ */ $$void(functorST);
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
  var sendToPos2 = function(a) {
    return function(state4) {
      return function __do2() {
        var scope2 = getScope(a.id)(state4)();
        var parent2 = getParent(a.id)(state4)();
        var dynFamily = getDynFamily(a.id)(state4)();
        var newA = {
          scope: scope2,
          parent: parent2,
          dynFamily,
          id: a.id,
          pos: new Just(a.pos),
          ez: false
        };
        return giveNewParent_(Just.create)(runOnJust)(newA)(state4)();
      };
    };
  };
  var fullDOMInterpret = function(seed) {
    return {
      ids: function __do2() {
        var s = read2(seed)();
        var o = show2(evalGen(arbitrary2)({
          newSeed: mkSeed(s),
          size: 5
        }));
        $$void5(modify2(add3(1))(seed))();
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

  // output/Data.Nullable/foreign.js
  function nullable(a, r, f) {
    return a == null ? r : f(a);
  }

  // output/Data.Nullable/index.js
  var toMaybe = function(n) {
    return nullable(n, Nothing.value, Just.create);
  };

  // output/Web.HTML.HTMLDocument/foreign.js
  function _body(doc) {
    return doc.body;
  }

  // output/Web.HTML.HTMLDocument/index.js
  var map6 = /* @__PURE__ */ map(functorEffect);
  var body = function(doc) {
    return map6(toMaybe)(function() {
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
  var bind3 = /* @__PURE__ */ bind(bindEffect);
  var mapFlipped2 = /* @__PURE__ */ mapFlipped(functorEffect);
  var liftST3 = /* @__PURE__ */ liftST(monadSTEffect);
  var mempty3 = /* @__PURE__ */ mempty(/* @__PURE__ */ monoidEffect(/* @__PURE__ */ monoidEffect(monoidUnit)));
  var map7 = /* @__PURE__ */ map(functorMaybe);
  var $$void6 = /* @__PURE__ */ $$void(functorEffect);
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
        return subscribe(evt)(function(i) {
          return i(ffi);
        })();
      };
    };
  };
  var runInBody$prime = function(eee) {
    return function __do2() {
      var b$prime = bind3(bind3(windowImpl)(document2))(body)();
      return maybe(mempty3)(function(elt) {
        return runInElement$prime(elt)(eee);
      })(map7(toElement)(b$prime))();
    };
  };
  var runInBody = function(a) {
    return $$void6(runInBody$prime(a));
  };

  // output/FRP.Event.AnimationFrame/index.js
  var $runtime_lazy4 = function(name15, moduleName, init2) {
    var state4 = 0;
    var val;
    return function(lineNumber) {
      if (state4 === 2)
        return val;
      if (state4 === 1)
        throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state4 = 1;
      val = init2();
      state4 = 2;
      return val;
    };
  };
  var $$void7 = /* @__PURE__ */ $$void(functorEffect);
  var unlessM2 = /* @__PURE__ */ unlessM(monadEffect);
  var animationFrame = /* @__PURE__ */ makeEvent(function(k) {
    return function __do2() {
      var w = windowImpl();
      var cancelled = $$new(false)();
      var $lazy_loop = $runtime_lazy4("loop", "FRP.Event.AnimationFrame", function() {
        return $$void7(requestAnimationFrame(function __do3() {
          k(unit)();
          return unlessM2(read(cancelled))($lazy_loop(19))();
        })(w));
      });
      var loop2 = $lazy_loop(16);
      loop2();
      return write(true)(cancelled);
    };
  });

  // output/Effect.Now/foreign.js
  function now() {
    return Date.now();
  }

  // output/FRP.Event.Time/index.js
  var withTime = function(e) {
    return makeEvent(function(k) {
      return subscribe(e)(function(value12) {
        return function __do2() {
          var time2 = now();
          return k({
            time: time2,
            value: value12
          })();
        };
      });
    });
  };

  // output/Main/index.js
  var foldMapWithIndex2 = /* @__PURE__ */ foldMapWithIndex(foldableWithIndexArray);
  var show3 = /* @__PURE__ */ show(showNumber);
  var join2 = /* @__PURE__ */ join(bindFn);
  var map8 = /* @__PURE__ */ map(functorArray);
  var oneOf4 = /* @__PURE__ */ oneOf(foldableArray)(plusEvent);
  var mapFlipped3 = /* @__PURE__ */ mapFlipped(functorEvent);
  var semiringTuple2 = /* @__PURE__ */ semiringTuple(semiringNumber)(semiringNumber);
  var add1 = /* @__PURE__ */ add(semiringTuple2);
  var negate2 = /* @__PURE__ */ negate(/* @__PURE__ */ ringFn(ringNumber));
  var append12 = /* @__PURE__ */ append(semigroupArray);
  var foldMapWithIndex1 = /* @__PURE__ */ foldMapWithIndex2(monoidArray);
  var rmap2 = /* @__PURE__ */ rmap(bifunctorTuple);
  var lmap2 = /* @__PURE__ */ lmap(bifunctorTuple);
  var negate1 = /* @__PURE__ */ negate(ringNumber);
  var join1 = /* @__PURE__ */ join(bindArray);
  var pureAttr2 = /* @__PURE__ */ pureAttr(attrStop_OffsetString);
  var pureAttr1 = /* @__PURE__ */ pureAttr(attrStop_StopColorString);
  var pureAttr22 = /* @__PURE__ */ pureAttr(attrStop_StopOpacityStrin);
  var attr2 = /* @__PURE__ */ attr(attrG_TransformString);
  var show1 = /* @__PURE__ */ show(showInt);
  var unskew = function(v) {
    return v * sqrt(3);
  };
  var toPath = /* @__PURE__ */ foldMapWithIndex2(monoidString)(function(i) {
    return function(v) {
      return function() {
        var $100 = i === 0;
        if ($100) {
          return "M";
        }
        ;
        return "L";
      }() + (show3(v.value0) + (" " + show3(v.value1)));
    };
  });
  var skew = function(v) {
    return v / sqrt(3);
  };
  var skewY = function(v) {
    return new Tuple(v, skew(v));
  };
  var rotate = function(degrees) {
    return function(v) {
      var rad = pi * degrees / 180;
      var s = sin(rad);
      var c = cos(rad);
      return new Tuple(c * v.value0 + s * v.value1, c * v.value1 - s * v.value0);
    };
  };
  var prefix = function(dictSemiring) {
    var add22 = add(dictSemiring);
    return function(p) {
      return function(ps) {
        return cons(p)(map8(add22(p))(ps));
      };
    };
  };
  var prefix1 = /* @__PURE__ */ prefix(semiringTuple2);
  var line = function(dictAttr) {
    var pureAttr3 = pureAttr(dictAttr);
    return function(dictShow) {
      var show22 = show(dictShow);
      return function(dictAttr1) {
        var pureAttr4 = pureAttr(dictAttr1);
        return function(dictShow1) {
          var show32 = show(dictShow1);
          return function(dictAttr2) {
            var pureAttr5 = pureAttr(dictAttr2);
            return function(dictShow2) {
              var show4 = show(dictShow2);
              return function(dictAttr3) {
                var pureAttr6 = pureAttr(dictAttr3);
                return function(dictShow3) {
                  var show5 = show(dictShow3);
                  return function(v) {
                    return function(v1) {
                      return oneOf4([pureAttr3(X1.value)(show22(v.value0)), pureAttr4(X2.value)(show32(v1.value0)), pureAttr5(Y1.value)(show4(v.value1)), pureAttr6(Y2.value)(show5(v1.value1))]);
                    };
                  };
                };
              };
            };
          };
        };
      };
    };
  };
  var line1 = /* @__PURE__ */ line(attrLinearGradient_X1Stri)(showNumber)(attrLinearGradient_X2Stri)(showNumber)(attrLinearGradient_Y1Stri)(showNumber)(attrLinearGradient_Y2Stri)(showNumber);
  var incr = function(i) {
    return function(v) {
      return toNumber(i) * v;
    };
  };
  var main = /* @__PURE__ */ function() {
    var rotating = mapFlipped3(map(functorEvent)(function(v) {
      return v.time;
    })(withTime(animationFrame)))(function() {
      var $122 = unwrap();
      return function($123) {
        return function(t) {
          return t / 1e3 * 120;
        }($122(unInstant($123)));
      };
    }());
    var radius = 100 / 2;
    var drawTine = function(tineSize) {
      var r = 1 / 2;
      var p = skewY(tineSize);
      return [p, add1(p)(new Tuple(0, r * 4.1)), add1(add1(p)(new Tuple(0, r * 4.1)))(new Tuple(negate2(unskew)(r * 4.1 / 2), r * 4.1 / 2)), new Tuple(0, 4.1), new Tuple(0, 4.1 + 1)];
    };
    var drawTines = function(widths) {
      var capLength = skew(2);
      return flip(append12)([new Tuple(capLength, radius - 2 / 2), new Tuple(0, radius)])(prefix1(new Tuple(capLength, 0))(foldMapWithIndex1(function(i) {
        return function(tineSize) {
          return map8(rmap2(function(v) {
            return v + incr(i)(4.1 + 1);
          }))(drawTine(tineSize));
        };
      })(widths)));
    };
    var drawArm = function(angle) {
      return function(v) {
        return map8(rotate(angle))(append12(drawTines(v.value0))(reverse(map8(lmap2(negate1))(drawTines(v.value1)))));
      };
    };
    var drawArms = function() {
      var $124 = foldMapWithIndex1(function(i) {
        return drawArm(incr(i)(60));
      });
      return function($125) {
        return toPath($124($125));
      };
    }();
    return runInBody(div_(join1(replicate(15)([svg(oneOf4([pureAttr(attrSvg_WidthString)(Width.value)(show3(5 + 100 + 5)), pureAttr(attrSvg_HeightString)(Height.value)(show3(5 + 100 + 5)), pureAttr(attrSvg_ViewBoxString)(ViewBox.value)(maybe(mempty(monoidString))(intercalateMap(foldable1NonEmptyArray)(semigroupString)(" ")(show3))(fromArray([-radius - 5, -radius - 5, 100 + 5 + 5, 100 + 5 + 5])))]))([defs_([linearGradient(oneOf4([pureAttr(attrLinearGradient_IdStri)(Id.value)("linearGradientArm"), pureAttr(attrLinearGradient_Gradie)(GradientUnits.value)("userSpaceOnUse"), keepLatest(eventIsEvent)(mapFlipped3(function() {
      if (false) {
        return rotating;
      }
      ;
      return pure(applicativeEvent)(0);
    }())(function(angle) {
      return line1(rotate(angle)(new Tuple(0, radius)))(rotate(angle)(new Tuple(0, -radius)));
    }))]))([flip(stop)([])(oneOf4([pureAttr2(Offset.value)("0"), pureAttr1(StopColor.value)("#6b91ab"), pureAttr22(StopOpacity.value)("0.9")])), flip(stop)([])(oneOf4([pureAttr2(Offset.value)("1"), pureAttr1(StopColor.value)("#f3feff"), pureAttr22(StopOpacity.value)("0.95")]))])]), g(oneOf4([pureAttr(attrG_FillString)(Fill.value)("#bfe6ff"), pureAttr(attrG_StrokeLinecapString)(StrokeLinecap.value)("butt"), pureAttr(attrG_StrokeLinejoinStrin)(StrokeLinejoin.value)("miter"), pureAttr(attrG_StrokeOpacityString)(StrokeOpacity.value)("1"), mapFlipped3(rotating)(function(angle) {
      return attr2(Transform.value)("rotate(" + (show1(round2(remainder(angle + 30)(function() {
        if (false) {
          return 360;
        }
        ;
        return 60;
      }()) - 30)) + ")"));
    })]))(join1(function() {
      var vs = [1, 3, 3, 6, 4, 4, 5, 3, 1];
      var vss = join2(Tuple.create)(vs);
      return [pure(applicativeArray)(flip(path)([])(oneOf4([pureAttr(attrPath_DString)(D.value)(drawArms([vss, vss, vss, vss, vss, vss])), pureAttr(attrPath_FillOpacityStrin)(FillOpacity.value)(".91"), pureAttr(attrPath_StrokeString)(Stroke.value)(function() {
        if (false) {
          return "url(#linearGradientArm)";
        }
        ;
        return "none";
      }()), pureAttr(attrPath_StrokeWidthStrin)(StrokeWidth.value)("0.6"), pureAttr(attrPath_FilterString)(Filter.value)(function() {
        if (false) {
          return "url(#filter17837)";
        }
        ;
        return "none";
      }())])))];
    }()))])]))));
  }();

  // <stdin>
  main();
})();
