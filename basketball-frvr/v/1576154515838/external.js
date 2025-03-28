! function() {
    var e, t, g;

    function Oe() {
        var z = {
            frvrTextureMemoryUsage: 0,
            frvrGLErrors: {
                NO_ERROR: 0,
                OUT_OF_MEMORY: 0,
                INVALID_ENUM: 0,
                INVALID_VALUE: 0,
                INVALID_OPERATION: 0,
                INVALID_FRAMEBUFFER_OPERATION: 0,
                CONTEXT_LOST_WEBGL: 0,
                TOTAL_ERRORS: 0
            },
            frvrErrorStats: function() {
                var e = "";
                for (name in z.frvrGLErrors) {
                    var t = z.frvrGLErrors[name];
                    e += name + ": " + t + "\n"
                }
                return e
            },
            WEBGL_RENDERER: 0,
            CANVAS_RENDERER: 1,
            VERSION: "v2.2.3FRVR",
            blendModes: {
                NORMAL: 0,
                ADD: 1,
                MULTIPLY: 2,
                SCREEN: 3
            },
            scaleModes: {
                DEFAULT: 0,
                LINEAR: 0,
                NEAREST: 1
            },
            _UID: 0
        };
        return "undefined" != typeof Float32Array ? (z.Float32Array = Float32Array, z.Uint16Array = Uint16Array, z.Uint32Array = Uint32Array, z.ArrayBuffer = ArrayBuffer) : (z.Float32Array = Array, z.Uint16Array = Array), z.INTERACTION_FREQUENCY = 30, z.AUTO_PREVENT_DEFAULT = !0, z.PI_2 = 2 * Math.PI, z.RAD_TO_DEG = 180 / Math.PI, z.DEG_TO_RAD = Math.PI / 180, z.defaultRenderOptions = {
            view: null,
            transparent: !1,
            antialias: !1,
            preserveDrawingBuffer: !1,
            clearBeforeRender: !0,
            autoResize: !1
        }, z.Point = function(e, t) {
            this.x = e || 0, this.y = t || 0
        }, z.Point.prototype.clone = function() {
            return new z.Point(this.x, this.y)
        }, z.Point.prototype.set = function(e, t) {
            this.x = e || 0, this.y = t || (0 !== t ? this.x : 0)
        }, z.Point.prototype.constructor = z.Point, z.Rectangle = function(e, t, i, n) {
            this.x = e || 0, this.y = t || 0, this.width = i || 0, this.height = n || 0
        }, z.Rectangle.prototype.clone = function() {
            return new z.Rectangle(this.x, this.y, this.width, this.height)
        }, z.Rectangle.prototype.contains = function(e, t) {
            if (this.width <= 0 || this.height <= 0) return !1;
            var i = this.x;
            if (i <= e && e <= i + this.width) {
                var n = this.y;
                if (n <= t && t <= n + this.height) return !0
            }
            return !1
        }, z.Rectangle.prototype.constructor = z.Rectangle, z.EmptyRectangle = new z.Rectangle(0, 0, 0, 0), z.Polygon = function(e) {
            if (e instanceof Array || (e = Array.prototype.slice.call(arguments)), e[0] instanceof z.Point) {
                for (var t = [], i = 0, n = e.length; i < n; i++) t.push(e[i].x, e[i].y);
                e = t
            }
            this.closed = !0, this.points = e
        }, z.Polygon.prototype.clone = function() {
            var e = this.points.slice();
            return new z.Polygon(e)
        }, z.Polygon.prototype.contains = function(e, t) {
            for (var i = !1, n = this.points.length / 2, r = 0, o = n - 1; r < n; o = r++) {
                var a = this.points[2 * r],
                    s = this.points[2 * r + 1],
                    l = this.points[2 * o],
                    h = this.points[2 * o + 1];
                t < s != t < h && e < (l - a) * (t - s) / (h - s) + a && (i = !i)
            }
            return i
        }, z.Polygon.prototype.constructor = z.Polygon, z.Circle = function(e, t, i) {
            this.x = e || 0, this.y = t || 0, this.radius = i || 0
        }, z.Circle.prototype.clone = function() {
            return new z.Circle(this.x, this.y, this.radius)
        }, z.Circle.prototype.contains = function(e, t) {
            if (this.radius <= 0) return !1;
            var i = this.x - e,
                n = this.y - t;
            return (i *= i) + (n *= n) <= this.radius * this.radius
        }, z.Circle.prototype.getBounds = function() {
            return new z.Rectangle(this.x - this.radius, this.y - this.radius, 2 * this.radius, 2 * this.radius)
        }, z.Circle.prototype.constructor = z.Circle, z.Ellipse = function(e, t, i, n) {
            this.x = e || 0, this.y = t || 0, this.width = i || 0, this.height = n || 0
        }, z.Ellipse.prototype.clone = function() {
            return new z.Ellipse(this.x, this.y, this.width, this.height)
        }, z.Ellipse.prototype.contains = function(e, t) {
            if (this.width <= 0 || this.height <= 0) return !1;
            var i = (e - this.x) / this.width,
                n = (t - this.y) / this.height;
            return (i *= i) + (n *= n) <= 1
        }, z.Ellipse.prototype.getBounds = function() {
            return new z.Rectangle(this.x - this.width, this.y - this.height, this.width, this.height)
        }, z.Ellipse.prototype.constructor = z.Ellipse, z.RoundedRectangle = function(e, t, i, n, r) {
            this.x = e || 0, this.y = t || 0, this.width = i || 0, this.height = n || 0, this.radius = r || 20
        }, z.RoundedRectangle.prototype.clone = function() {
            return new z.RoundedRectangle(this.x, this.y, this.width, this.height, this.radius)
        }, z.RoundedRectangle.prototype.contains = function(e, t) {
            if (this.width <= 0 || this.height <= 0) return !1;
            var i = this.x;
            if (i <= e && e <= i + this.width) {
                var n = this.y;
                if (n <= t && t <= n + this.height) return !0
            }
            return !1
        }, z.RoundedRectangle.prototype.constructor = z.RoundedRectangle, z.Matrix = function() {
            this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.tx = 0, this.ty = 0
        }, z.Matrix.prototype.fromArray = function(e) {
            this.a = e[0], this.b = e[1], this.c = e[3], this.d = e[4], this.tx = e[2], this.ty = e[5]
        }, z.Matrix.prototype.toArray = function(e) {
            this.array || (this.array = new z.Float32Array(9));
            var t = this.array;
            return t[8] = (t[7] = e ? (t[0] = this.a, t[1] = this.b, t[2] = 0, t[3] = this.c, t[4] = this.d, t[5] = 0, t[6] = this.tx, this.ty) : (t[0] = this.a, t[1] = this.c, t[2] = this.tx, t[3] = this.b, t[4] = this.d, t[5] = this.ty, t[6] = 0), 1), t
        }, z.Matrix.prototype.apply = function(e, t) {
            return (t = t || new z.Point).x = this.a * e.x + this.c * e.y + this.tx, t.y = this.b * e.x + this.d * e.y + this.ty, t
        }, z.Matrix.prototype.applyInverse = function(e, t) {
            t = t || new z.Point;
            var i = 1 / (this.a * this.d + this.c * -this.b);
            return t.x = this.d * i * e.x + -this.c * i * e.y + (this.ty * this.c - this.tx * this.d) * i, t.y = this.a * i * e.y + -this.b * i * e.x + (-this.ty * this.a + this.tx * this.b) * i, t
        }, z.Matrix.prototype.translate = function(e, t) {
            return this.tx += e, this.ty += t, this
        }, z.Matrix.prototype.scale = function(e, t) {
            return this.a *= e, this.d *= t, this.c *= e, this.b *= t, this.tx *= e, this.ty *= t, this
        }, z.Matrix.prototype.rotate = function(e) {
            var t = Math.cos(e),
                i = Math.sin(e),
                n = this.a,
                r = this.c,
                o = this.tx;
            return this.a = n * t - this.b * i, this.b = n * i + this.b * t, this.c = r * t - this.d * i, this.d = r * i + this.d * t, this.tx = o * t - this.ty * i, this.ty = o * i + this.ty * t, this
        }, z.Matrix.prototype.append = function(e) {
            var t = this.a,
                i = this.b,
                n = this.c,
                r = this.d;
            return this.a = e.a * t + e.b * n, this.b = e.a * i + e.b * r, this.c = e.c * t + e.d * n, this.d = e.c * i + e.d * r, this.tx = e.tx * t + e.ty * n + this.tx, this.ty = e.tx * i + e.ty * r + this.ty, this
        }, z.Matrix.prototype.identity = function() {
            return this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.tx = 0, this.ty = 0, this
        }, z.identityMatrix = new z.Matrix, z.DisplayObject = function() {
            this.position = new z.Point, this.scale = new z.Point(1, 1), this.pivot = new z.Point(0, 0), this.rotation = 0, this.alpha = 1, this.visible = !0, this.hitArea = null, this.buttonMode = !1, this.renderable = !1, this.parent = null, this.stage = null, this.worldAlpha = 1, this._interactive = !1, this.defaultCursor = "pointer", this.worldTransform = new z.Matrix, this._sr = 0, this._cr = 1, this.filterArea = null, this._bounds = new z.Rectangle(0, 0, 1, 1), this._currentBounds = null, this._mask = null, this._cacheIsDirty = !1
        }, z.DisplayObject.prototype.constructor = z.DisplayObject, Object.defineProperty(z.DisplayObject.prototype, "interactive", {
            get: function() {
                return this._interactive
            },
            set: function(e) {
                this._interactive = e, this.stage && (this.stage.dirty = !0)
            }
        }), Object.defineProperty(z.DisplayObject.prototype, "worldVisible", {
            get: function() {
                var e = this;
                do {
                    if (!e.visible) return !1;
                    e = e.parent
                } while (e);
                return !0
            }
        }), Object.defineProperty(z.DisplayObject.prototype, "mask", {
            get: function() {
                return this._mask
            },
            set: function(e) {
                this._mask && (this._mask.isMask = !1), this._mask = e, this._mask && (this._mask.isMask = !0)
            }
        }), Object.defineProperty(z.DisplayObject.prototype, "filters", {
            get: function() {
                return this._filters
            },
            set: function(e) {
                if (e) {
                    for (var t = [], i = 0; i < e.length; i++)
                        for (var n = e[i].passes, r = 0; r < n.length; r++) t.push(n[r]);
                    this._filterBlock = {
                        target: this,
                        filterPasses: t
                    }
                }
                this._filters = e
            }
        }), z.DisplayObject.prototype.updateTransform = function(e, t, i, n, r, o, a, s) {
            e = this.parent.worldTransform, t = this.worldTransform, this.rotation % z.PI_2 != 0 ? (this.rotation !== this.rotationCache && (this.rotationCache = this.rotation, this._sr = Math.sin(this.rotation), this._cr = Math.cos(this.rotation)), i = this._cr * this.scale.x, n = this._sr * this.scale.x, r = -this._sr * this.scale.y, o = this._cr * this.scale.y, a = this.position.x, s = this.position.y, (this.pivot.x || this.pivot.y) && (a -= this.pivot.x * i + this.pivot.y * r, s -= this.pivot.x * n + this.pivot.y * o), t.a = i * e.a + n * e.c, t.b = i * e.b + n * e.d, t.c = r * e.a + o * e.c, t.d = r * e.b + o * e.d) : (i = this.scale.x, o = this.scale.y, a = this.position.x - this.pivot.x * i, s = this.position.y - this.pivot.y * o, t.a = i * e.a, t.b = i * e.b, t.c = o * e.c, t.d = o * e.d), t.tx = a * e.a + s * e.c + e.tx, t.ty = a * e.b + s * e.d + e.ty, this.worldAlpha = this.alpha * this.parent.worldAlpha
        }, z.DisplayObject.prototype.displayObjectUpdateTransform = z.DisplayObject.prototype.updateTransform, z.DisplayObject.prototype.getBounds = function(e) {
            return e = e, z.EmptyRectangle
        }, z.DisplayObject.prototype.getLocalBounds = function() {
            return this.getBounds(z.identityMatrix)
        }, z.DisplayObject.prototype.setStageReference = function(e) {
            this.stage = e, this._interactive && (this.stage.dirty = !0)
        }, z.DisplayObject.prototype.toGlobal = function(e) {
            return this.displayObjectUpdateTransform(), this.worldTransform.apply(e)
        }, z.DisplayObject.prototype.toGlobalSize = function(e) {
            return this.displayObjectUpdateTransform(), new Point(e.x * this.worldTransform.a, e.y * this.worldTransform.d)
        }, z.DisplayObject.prototype.toLocalSize = function(e, t) {
            return t && (e = t.toGlobal(e)), this.displayObjectUpdateTransform(), new Point(e.x / this.worldTransform.a, e.y / this.worldTransform.d)
        }, z.DisplayObject.prototype.toLocal = function(e, t) {
            return t && (e = t.toGlobal(e)), this.displayObjectUpdateTransform(), this.worldTransform.applyInverse(e)
        }, z.DisplayObject.prototype._renderWebGL = function(e) {}, z.DisplayObject.prototype._renderCanvas = function(e) {}, z.DisplayObject._tempMatrix = new z.Matrix, Object.defineProperty(z.DisplayObject.prototype, "x", {
            get: function() {
                return this.position.x
            },
            set: function(e) {
                this.position.x = e
            }
        }), Object.defineProperty(z.DisplayObject.prototype, "y", {
            get: function() {
                return this.position.y
            },
            set: function(e) {
                this.position.y = e
            }
        }), z.DisplayObjectContainer = function() {
            z.DisplayObject.call(this), this.children = []
        }, z.DisplayObjectContainer.prototype = Object.create(z.DisplayObject.prototype), z.DisplayObjectContainer.prototype.constructor = z.DisplayObjectContainer, Object.defineProperty(z.DisplayObjectContainer.prototype, "width", {
            get: function() {
                return this.scale.x * this.getLocalBounds().width
            },
            set: function(e) {
                var t = this.getLocalBounds().width;
                this.scale.x = 0 !== t ? e / t : 1, this._width = e
            }
        }), Object.defineProperty(z.DisplayObjectContainer.prototype, "height", {
            get: function() {
                return this.scale.y * this.getLocalBounds().height
            },
            set: function(e) {
                var t = this.getLocalBounds().height;
                this.scale.y = 0 !== t ? e / t : 1, this._height = e
            }
        }), z.DisplayObjectContainer.prototype.addChild = function(e) {
            return window.dirtyOnce = !0, this.addChildAt(e, this.children.length)
        }, z.DisplayObjectContainer.prototype.addChildAt = function(e, t) {
            if (0 <= t && t <= this.children.length) return window.dirtyOnce = !0, window.Host && Host.Localize.UpdateChildren(e), e.parent && e.parent.removeChild(e), (e.parent = this).children.splice(t, 0, e), this.stage && e.setStageReference(this.stage), e;
            throw new Error(e + "addChildAt: The index " + t + " supplied is out of bounds " + this.children.length)
        }, z.DisplayObjectContainer.prototype.getChildIndex = function(e) {
            var t = this.children.indexOf(e);
            if (-1 === t) throw new Error("The supplied DisplayObject must be a child of the caller");
            return t
        }, z.DisplayObjectContainer.prototype.setChildIndex = function(e, t) {
            if (t < 0 || t >= this.children.length) throw new Error("The supplied index is out of bounds");
            window.dirtyOnce = !0;
            var i = this.getChildIndex(e);
            this.children.splice(i, 1), this.children.splice(t, 0, e)
        }, z.DisplayObjectContainer.prototype.getChildAt = function(e) {
            if (e < 0 || e >= this.children.length) throw new Error("getChildAt: Supplied index " + e + " does not exist in the child list, or the supplied DisplayObject must be a child of the caller");
            return this.children[e]
        }, z.DisplayObjectContainer.prototype.removeChild = function(e) {
            var t = this.children.indexOf(e);
            if (-1 !== t) return this.removeChildAt(t)
        }, z.DisplayObjectContainer.prototype.removeChildAt = function(e) {
            var t = this.getChildAt(e);
            return this.stage && t.removeStageReference(), window.dirtyOnce = !0, t.parent = void 0, this.children.splice(e, 1), t
        }, z.DisplayObjectContainer.prototype.updateTransform = function() {
            if (this.visible) {
                this.displayObjectUpdateTransform();
                for (var e = 0, t = this.children.length; e < t; e++) this.children[e].updateTransform()
            }
        }, z.DisplayObjectContainer.prototype.displayObjectContainerUpdateTransform = z.DisplayObjectContainer.prototype.updateTransform, z.DisplayObjectContainer.prototype.getBounds = function() {
            if (0 === this.children.length) return z.EmptyRectangle;
            for (var e, t, i, n = 1 / 0, r = 1 / 0, o = -1 / 0, a = -1 / 0, s = !1, l = 0, h = this.children.length; l < h; l++) {
                this.children[l].visible && (s = !0, n = n < (e = this.children[l].getBounds()).x ? n : e.x, r = r < e.y ? r : e.y, o = (t = e.width + e.x) < o ? o : t, a = (i = e.height + e.y) < a ? a : i)
            }
            if (!s) return z.EmptyRectangle;
            var d = this._bounds;
            return d.x = n, d.y = r, d.width = o - n, d.height = a - r, d
        }, z.DisplayObjectContainer.prototype.getLocalBounds = function() {
            var e = this.worldTransform;
            this.worldTransform = z.identityMatrix;
            for (var t = 0, i = this.children.length; t < i; t++) this.children[t].updateTransform();
            var n = this.getBounds();
            return this.worldTransform = e, n
        }, z.DisplayObjectContainer.prototype.setStageReference = function(e) {
            this.stage = e, this._interactive && (this.stage.dirty = !0);
            for (var t = 0, i = this.children.length; t < i; t++) {
                this.children[t].setStageReference(e)
            }
        }, z.DisplayObjectContainer.prototype.removeStageReference = function() {
            for (var e = 0, t = this.children.length; e < t; e++) {
                this.children[e].removeStageReference()
            }
            this._interactive && (this.stage.dirty = !0), this.stage = null
        }, z.DisplayObjectContainer.prototype._renderWebGL = function(e) {
            var t, i;
            if (this.visible && !(this.alpha <= 0))
                if (this._mask || this._filters) {
                    for (this._mask && (e.spriteBatch.stop(), e.maskManager.pushMask(this.mask, e), e.spriteBatch.start()), t = 0, i = this.children.length; t < i; t++) this.children[t]._renderWebGL(e);
                    e.spriteBatch.stop(), this._mask && e.maskManager.popMask(this._mask, e), e.spriteBatch.start()
                } else
                    for (t = 0, i = this.children.length; t < i; t++) this.children[t]._renderWebGL(e)
        }, z.DisplayObjectContainer.prototype._renderCanvas = function(e) {
            if (!1 !== this.visible && 0 !== this.alpha) {
                this._mask && e.maskManager.pushMask(this._mask, e);
                for (var t = 0, i = this.children.length; t < i; t++) {
                    this.children[t]._renderCanvas(e)
                }
                this._mask && e.maskManager.popMask(e)
            }
        }, z.Sprite = function(e) {
            z.DisplayObjectContainer.call(this), this.anchor = new z.Point, this.texture = e || z.Texture.emptyTexture, this._width = 0, this._height = 0, this.tint = 16777215, this.blendMode = z.blendModes.NORMAL, this.shader = null, this.texture.baseTexture.hasLoaded ? this.onTextureUpdate() : this.texture.onPixi("update", this.onTextureUpdate.bind(this)), this.renderable = !0
        }, z.Sprite.prototype = Object.create(z.DisplayObjectContainer.prototype), z.Sprite.prototype.constructor = z.Sprite, Object.defineProperty(z.Sprite.prototype, "width", {
            get: function() {
                return this.scale.x * this.texture.frame.width
            },
            set: function(e) {
                this.scale.x = e / this.texture.frame.width, this._width = e
            }
        }), Object.defineProperty(z.Sprite.prototype, "height", {
            get: function() {
                return this.scale.y * this.texture.frame.height
            },
            set: function(e) {
                this.scale.y = e / this.texture.frame.height, this._height = e
            }
        }), z.Sprite.prototype.setTexture = function(e) {
            this.texture = e, this.cachedTint = 16777215
        }, z.Sprite.prototype.onTextureUpdate = function() {
            this._width && (this.scale.x = this._width / this.texture.frame.width), this._height && (this.scale.y = this._height / this.texture.frame.height)
        }, z.Sprite.prototype.getBounds = function(e) {
            var t = this.texture.frame.width,
                i = this.texture.frame.height;
            !this.texture.baseTexture.hasLoaded && this.image && this.image.width && (t = this.image.width, i = this.image.height);
            var n = t * (1 - this.anchor.x),
                r = t * -this.anchor.x,
                o = i * (1 - this.anchor.y),
                a = i * -this.anchor.y,
                s = e || this.worldTransform,
                l = s.a,
                h = s.b,
                d = s.c,
                c = s.d,
                u = s.tx,
                f = s.ty,
                p = -1 / 0,
                g = -1 / 0,
                v = 1 / 0,
                m = 1 / 0;
            if (0 === h && 0 === d) l < 0 && (l *= -1), c < 0 && (c *= -1), v = l * r + u, p = l * n + u, m = c * a + f, g = c * o + f;
            else {
                var w = l * r + d * a + u,
                    y = c * a + h * r + f,
                    S = l * n + d * a + u,
                    b = c * a + h * n + f,
                    _ = l * n + d * o + u,
                    x = c * o + h * n + f,
                    T = l * r + d * o + u,
                    C = c * o + h * r + f;
                v = T < (v = _ < (v = S < (v = w < v ? w : v) ? S : v) ? _ : v) ? T : v, m = C < (m = x < (m = b < (m = y < m ? y : m) ? b : m) ? x : m) ? C : m, p = (p = (p = (p = p < w ? w : p) < S ? S : p) < _ ? _ : p) < T ? T : p, g = (g = (g = (g = g < y ? y : g) < b ? b : g) < x ? x : g) < C ? C : g
            }
            var M = this._bounds;
            return M.x = v, M.width = p - v, M.y = m, M.height = g - m, this._currentBounds = M
        }, z.Sprite.prototype._renderWebGL = function(e) {
            var t, i;
            if (this.visible && !(this.alpha <= 0))
                if (this._mask || this._filters) {
                    var n = e.spriteBatch;
                    for (this._filters && (n.flush(), e.filterManager.pushFilter(this._filterBlock)), this._mask && (n.stop(), e.maskManager.pushMask(this.mask, e), n.start()), n.render(this), t = 0, i = this.children.length; t < i; t++) this.children[t]._renderWebGL(e);
                    n.stop(), this._mask && e.maskManager.popMask(this._mask, e), this._filters && e.filterManager.popFilter(), n.start()
                } else
                    for (e.spriteBatch.render(this), t = 0, i = this.children.length; t < i; t++) this.children[t]._renderWebGL(e)
        }, z.Sprite.prototype._renderCanvas = function(e) {
            if (!(!1 === this.visible || 0 === this.alpha || this.texture.crop.width <= 0 || this.texture.crop.height <= 0)) {
                if (this.blendMode !== e.currentBlendMode && (e.currentBlendMode = this.blendMode, e.context.globalCompositeOperation = z.blendModesCanvas[e.currentBlendMode]), this._mask && e.maskManager.pushMask(this._mask, e), this.texture.valid) {
                    e.context.globalAlpha = this.worldAlpha, e.smoothProperty && e.scaleMode !== this.texture.baseTexture.scaleMode && (e.scaleMode = this.texture.baseTexture.scaleMode, e.context[e.smoothProperty] = e.scaleMode === z.scaleModes.LINEAR);
                    var t = this.texture.trim ? this.texture.trim.x - this.anchor.x * this.texture.trim.width : this.anchor.x * -this.texture.frame.width,
                        i = this.texture.trim ? this.texture.trim.y - this.anchor.y * this.texture.trim.height : this.anchor.y * -this.texture.frame.height;
                    if (e.context.setTransform(this.worldTransform.a, this.worldTransform.b, this.worldTransform.c, this.worldTransform.d, 0 | this.worldTransform.tx, 0 | this.worldTransform.ty), t |= 0, i |= 0, 16777215 !== this.tint) {
                        this.cachedTint !== this.tint && (this.cachedTint = this.tint, this.tintedTexture = z.CanvasTinter.getTintedTexture(this, this.tint));
                        var n = this.texture.resolution || 1;
                        e.context.drawImage(this.tintedTexture, 0, 0, this.texture.crop.width * n, this.texture.crop.height * n, t, i, this.texture.crop.width, this.texture.crop.height)
                    } else {
                        n = this.texture.resolution || 1;
                        e.context.drawImage(this.texture.baseTexture.source, this.texture.crop.x * n, this.texture.crop.y * n, this.texture.crop.width * n, this.texture.crop.height * n, t, i, this.texture.crop.width, this.texture.crop.height)
                    }
                }
                for (var r = 0, o = this.children.length; r < o; r++) this.children[r]._renderCanvas(e);
                this._mask && e.maskManager.popMask(e)
            }
        }, z.Sprite.fromFrame = function(e) {
            var t = z.TextureCache[e];
            if (!t) throw new Error('The frameId "' + e + '" does not exist in the texture cache' + this);
            return new z.Sprite(t)
        }, z.Sprite.fromImage = function(e, t, i) {
            var n = z.Texture.fromImage(e, t, i);
            return new z.Sprite(n)
        }, z.SpriteBatch = function() {
            z.DisplayObjectContainer.call(this), this.ready = !1
        }, z.SpriteBatch.prototype = Object.create(z.DisplayObjectContainer.prototype), z.SpriteBatch.prototype.constructor = z.SpriteBatch, z.SpriteBatch.prototype.initWebGL = function(e) {
            this.fastSpriteBatch = new z.WebGLFastSpriteBatch(e), this.ready = !0
        }, z.SpriteBatch.prototype.updateTransform = function() {
            this.displayObjectUpdateTransform()
        }, z.SpriteBatch.prototype._renderWebGL = function(e) {
            !this.visible || this.alpha <= 0 || !this.children.length || (this.ready || this.initWebGL(e.gl), e.spriteBatch.stop(), e.shaderManager.setShader(e.shaderManager.fastShader), this.fastSpriteBatch.begin(this, e), this.fastSpriteBatch.render(this), e.spriteBatch.start())
        }, z.SpriteBatch.prototype._renderCanvas = function(e) {
            if (this.visible && !(this.alpha <= 0) && this.children.length) {
                var t = e.context;
                t.globalAlpha = this.worldAlpha, this.displayObjectUpdateTransform();
                for (var i = this.worldTransform, n = !0, r = 0; r < this.children.length; r++) {
                    var o = this.children[r];
                    if (o.visible) {
                        var a = o.texture,
                            s = a.frame;
                        if (t.globalAlpha = this.worldAlpha * o.alpha, o.rotation % (2 * Math.PI) == 0) n && (t.setTransform(i.a, i.b, i.c, i.d, i.tx, i.ty), n = !1), t.drawImage(a.baseTexture.source, s.x, s.y, s.width, s.height, o.anchor.x * (-s.width * o.scale.x) + o.position.x + .5 | 0, o.anchor.y * (-s.height * o.scale.y) + o.position.y + .5 | 0, s.width * o.scale.x, s.height * o.scale.y);
                        else {
                            n || (n = !0), o.displayObjectUpdateTransform();
                            var l = o.worldTransform;
                            t.setTransform(l.a, l.b, l.c, l.d, 0 | l.tx, 0 | l.ty), t.drawImage(a.baseTexture.source, s.x, s.y, s.width, s.height, o.anchor.x * -s.width + .5 | 0, o.anchor.y * -s.height + .5 | 0, s.width, s.height)
                        }
                    }
                }
            }
        }, z.Text = function(e, t) {
            this.canvas = document.createElement("canvas"), this.context = this.canvas.getContext("2d"), z.Sprite.call(this, z.Texture.fromCanvas(this.canvas)), this.setText(e), this.setStyle(t)
        }, z.Text.prototype = Object.create(z.Sprite.prototype), z.Text.prototype.constructor = z.Text, Object.defineProperty(z.Text.prototype, "width", {
            get: function() {
                return this.dirty && (this.updateText(), this.dirty = !1), this.scale.x * this.texture.frame.width
            },
            set: function(e) {
                this.scale.x = e / this.texture.frame.width, this._width = e
            }
        }), Object.defineProperty(z.Text.prototype, "height", {
            get: function() {
                return this.dirty && (this.updateText(), this.dirty = !1), this.scale.y * this.texture.frame.height
            },
            set: function(e) {
                this.scale.y = e / this.texture.frame.height, this._height = e
            }
        }), z.Text.prototype.setStyle = function(e) {
            (e = e || {}).font = e.font || "bold 20pt Arial", e.fill = e.fill || "black", e.align = e.align || "left", e.stroke = e.stroke || "black", e.strokeThickness = e.strokeThickness || 0, e.wordWrap = e.wordWrap || !1, e.wordWrapWidth = e.wordWrapWidth || 100, e.dropShadow = e.dropShadow || !1, e.dropShadowAngle = e.dropShadowAngle || Math.PI / 6, e.dropShadowDistance = e.dropShadowDistance || 4, e.dropShadowColor = e.dropShadowColor || "black", this.style = e, this.dirty = !0
        }, z.Text.prototype.setText = function(e) {
            this.text != e.toString() && (this.text = e.toString() || " ", this.dirty = !0, window.dirtyOnce = !0)
        }, z.Text.prototype.updateText = function() {
            this.context.font = this.style._font || this.style.font;
            var e = this.text.toString();
            this.style.wordWrap && (e = this.wordWrap(this.text));
            for (var t = e ? e.split(/(?:\r\n|\r|\n)/) : [], i = [], n = 0, r = this.determineFontProperties(this.style._font || this.style.font), o = 0; o < t.length; o++) {
                var a = this.context.measureText(t[o]).width;
                i[o] = a, n = Math.max(n, a)
            }
            var s = n + this.style.strokeThickness;
            this.style.dropShadow && (s += this.style.dropShadowDistance), this.canvas.width = Math.max(s + this.context.lineWidth, 1);
            var l, h, d = r.fontSize + this.style.strokeThickness,
                c = d * t.length;
            if (this.style.dropShadow && (c += this.style.dropShadowDistance), this.canvas.height = Math.max(c, 1), this.context.scale(1, 1), this.context.font = this.style._font || this.style.font, this.context.strokeStyle = this.style.stroke, this.context.lineWidth = this.style.strokeThickness, this.context.textBaseline = "alphabetic", this.style.dropShadow) {
                this.context.fillStyle = this.style.dropShadowColor;
                var u = Math.sin(this.style.dropShadowAngle) * this.style.dropShadowDistance,
                    f = Math.cos(this.style.dropShadowAngle) * this.style.dropShadowDistance;
                for (o = 0; o < t.length; o++) l = this.style.strokeThickness / 2, h = this.style.strokeThickness / 2 + o * d + r.ascent, "right" === this.style.align ? l += n - i[o] : "center" === this.style.align && (l += (n - i[o]) / 2), this.style.fill && this.context.fillText(t[o], l + u, h + f)
            }
            for (this.context.fillStyle = this.style.fill, o = 0; o < t.length; o++) l = this.style.strokeThickness / 2, h = this.style.strokeThickness / 2 + o * d + r.ascent, "right" === this.style.align ? l += n - i[o] : "center" === this.style.align && (l += (n - i[o]) / 2), this.style.stroke && this.style.strokeThickness && this.context.strokeText(t[o], l, h), this.style.fill && this.context.fillText(t[o], l, h);
            this.updateTexture()
        }, z.Text.prototype.updateTexture = function() {
            try {
                void 0 !== this._lastSize && (z.frvrTextureMemoryUsage -= 4 * this._lastSize.w * this._lastSize.h)
            } catch (e) {}
            this.texture.baseTexture.width = this.canvas.width, this.texture.baseTexture.height = this.canvas.height, this.texture.crop.width = this.texture.frame.width = this.canvas.width, this.texture.crop.height = this.texture.frame.height = this.canvas.height, this._width = this.canvas.width, this._height = this.canvas.height;
            try {
                z.frvrTextureMemoryUsage += 4 * this.texture.baseTexture.width * this.texture.baseTexture.height, this._lastSize = {
                    w: this.texture.baseTexture.width,
                    h: this.texture.baseTexture.height
                }
            } catch (e) {}
            this.texture.baseTexture.dirty(), this.texture.tintCache = []
        }, z.Text.prototype._renderWebGL = function(e) {
            this.dirty && (this.updateText(), this.dirty = !1), z.Sprite.prototype._renderWebGL.call(this, e)
        }, z.Text.prototype._renderCanvas = function(e) {
            this.dirty && (this.updateText(), this.dirty = !1), z.Sprite.prototype._renderCanvas.call(this, e)
        }, z.Text.prototype.determineFontProperties = function(e) {
            var t = z.Text.fontPropertiesCache[e];
            if (!t) {
                t = {};
                var i = z.Text.fontPropertiesCanvas,
                    n = z.Text.fontPropertiesContext;
                n.font = e;
                var r = Math.max(Math.ceil(n.measureText("|MÉq").width), 1),
                    o = Math.ceil(n.measureText("M").width),
                    a = Math.max(2 * o, 1);
                o = 1.4 * o | 0, i.width = r, i.height = a, n.fillStyle = "#ffffff", n.fillRect(0, 0, r, a), n.font = e, n.textBaseline = "alphabetic", n.fillStyle = "#888888", n.fillText("|MÉq", 0, o);
                var s, l, h = n.getImageData(0, 0, r, a).data,
                    d = h.length,
                    c = 4 * r,
                    u = 0,
                    f = !1;
                for (s = 0; s < o; s++) {
                    for (l = 0; l < c; l += 4)
                        if (255 !== h[u + l]) {
                            f = !0;
                            break
                        } if (f) break;
                    u += c
                }
                for (t.ascent = o - s, u = d - c, f = !1, s = a; o < s; s--) {
                    for (l = 0; l < c; l += 4)
                        if (255 !== h[u + l]) {
                            f = !0;
                            break
                        } if (f) break;
                    u -= c
                }
                t.descent = s - o, t.fontSize = t.ascent + t.descent, z.Text.fontPropertiesCache[e] = t
            }
            return t
        }, z.Text.prototype.wordWrap = function(e) {
            for (var t = "", i = e.split("\n"), n = 0; n < i.length; n++) {
                for (var r = this.style.wordWrapWidth, o = i[n].split(" "), a = 0; a < o.length; a++) {
                    var s = this.context.measureText(o[a]).width,
                        l = s + this.context.measureText(" ").width;
                    0 === a || r < l ? (0 < a && (t += "\n"), t += o[a], r = this.style.wordWrapWidth - s) : (r -= l, t += " " + o[a])
                }
                n < i.length - 1 && (t += "\n")
            }
            return t
        }, z.Text.prototype.getBounds = function(e) {
            return this.dirty && (this.updateText(), this.dirty = !1), z.Sprite.prototype.getBounds.call(this, e)
        }, z.Text.prototype.destroy = function(e) {
            this.context = null, this.canvas = null, this.texture.destroy(void 0 === e || e)
        }, z.Text.fontPropertiesCache = {}, z.Text.fontPropertiesCanvas = document.createElement("canvas"), z.Text.fontPropertiesContext = z.Text.fontPropertiesCanvas.getContext("2d"), z.InteractionData = function() {
            this.global = new z.Point, this.target = null, this.originalEvent = null
        }, z.InteractionData.prototype.getLocalPosition = function(e, t) {
            var i = e.worldTransform,
                n = this.global,
                r = i.a,
                o = i.c,
                a = i.tx,
                s = i.b,
                l = i.d,
                h = i.ty,
                d = 1 / (r * l + o * -s);
            return (t = t || new z.Point).x = l * d * n.x + -o * d * n.y + (h * o - a * l) * d, t.y = r * d * n.y + -s * d * n.x + (-h * r + a * s) * d, t
        }, z.InteractionData.prototype.constructor = z.InteractionData, z.InteractionManager = function(e) {
            this.stage = e, this.mouse = new z.InteractionData, this.touches = {}, this.tempPoint = new z.Point, this.mouseoverEnabled = !0, this.pool = [], this.interactiveItems = [], this.interactionDOMElement = null, this.onMouseMove = this.onMouseMove.bind(this), this.onMouseDown = this.onMouseDown.bind(this), this.onMouseOut = this.onMouseOut.bind(this), this.onMouseUp = this.onMouseUp.bind(this), this.onTouchStart = this.onTouchStart.bind(this), this.onTouchEnd = this.onTouchEnd.bind(this), this.onTouchMove = this.onTouchMove.bind(this), this.last = 0, this.currentCursorStyle = "inherit", this.mouseOut = !1, this._tempPoint = new z.Point
        }, z.InteractionManager.prototype.constructor = z.InteractionManager, z.InteractionManager.prototype.collectInteractiveSprite = function(e, t) {
            for (var i = e.children, n = i.length - 1; 0 <= n; n--) {
                var r = i[n];
                r._interactive ? (t.interactiveChildren = !0, this.interactiveItems.push(r), 0 < r.children.length && this.collectInteractiveSprite(r, r)) : (r.__iParent = null, 0 < r.children.length && this.collectInteractiveSprite(r, t))
            }
        }, z.InteractionManager.prototype.setTarget = function(e) {
            this.target = e, null === this.interactionDOMElement && this.setTargetDomElement(e.view)
        }, z.InteractionManager.prototype.setTargetDomElement = function(e) {
            this.removeEvents(), window.navigator.msPointerEnabled && (e.style["-ms-content-zooming"] = "none", e.style["-ms-touch-action"] = "none"), (this.interactionDOMElement = e).addEventListener("mousemove", this.onMouseMove, !0), e.addEventListener("mousedown", this.onMouseDown, !0), e.addEventListener("mouseout", this.onMouseOut, !0), e.addEventListener("touchstart", this.onTouchStart, !0), e.addEventListener("touchend", this.onTouchEnd, !0), e.addEventListener("touchmove", this.onTouchMove, !0), window.addEventListener("mouseup", this.onMouseUp, !0)
        }, z.InteractionManager.prototype.removeEvents = function() {
            this.interactionDOMElement && (this.interactionDOMElement.style["-ms-content-zooming"] = "", this.interactionDOMElement.style["-ms-touch-action"] = "", this.interactionDOMElement.removeEventListener("mousemove", this.onMouseMove, !0), this.interactionDOMElement.removeEventListener("mousedown", this.onMouseDown, !0), this.interactionDOMElement.removeEventListener("mouseout", this.onMouseOut, !0), this.interactionDOMElement.removeEventListener("touchstart", this.onTouchStart, !0), this.interactionDOMElement.removeEventListener("touchend", this.onTouchEnd, !0), this.interactionDOMElement.removeEventListener("touchmove", this.onTouchMove, !0), this.interactionDOMElement = null, window.removeEventListener("mouseup", this.onMouseUp, !0))
        }, z.InteractionManager.prototype.update = function() {
            if (this.target) {
                var e = Date.now(),
                    t = e - this.last;
                if (!((t = t * z.INTERACTION_FREQUENCY / 1e3) < 1)) {
                    this.last = e;
                    var i = 0;
                    this.dirty && this.rebuildInteractiveGraph();
                    var n = this.interactiveItems.length,
                        r = "inherit",
                        o = !1;
                    for (i = 0; i < n; i++) {
                        var a = this.interactiveItems[i];
                        a.__hit = this.hitTest(a, this.mouse), (this.mouse.target = a).__hit && !o ? (a.buttonMode && (r = a.defaultCursor), a.interactiveChildren || (o = !0), a.__isOver || (a.mouseover && a.mouseover(this.mouse), a.__isOver = !0)) : a.__isOver && (a.mouseout && a.mouseout(this.mouse), a.__isOver = !1)
                    }
                    this.currentCursorStyle === r || XS.ignoreCursorChanges || (this.currentCursorStyle = r, this.interactionDOMElement.style.cursor = r)
                }
            }
        }, z.InteractionManager.prototype.rebuildInteractiveGraph = function() {
            this.dirty = !1;
            for (var e = this.interactiveItems.length, t = 0; t < e; t++) this.interactiveItems[t].interactiveChildren = !1;
            this.interactiveItems = [], this.stage.interactive && this.interactiveItems.push(this.stage), this.collectInteractiveSprite(this.stage, this.stage)
        }, z.InteractionManager.prototype.onMouseMove = function(e) {
            if (this.dirty && this.rebuildInteractiveGraph(), this.mouse) {
                this.mouse.originalEvent = e;
                var t = this.interactionDOMElement.getBoundingClientRect();
                this.mouse.global.x = (e.clientX - t.left) * (this.target.width / t.width), this.mouse.global.y = (e.clientY - t.top) * (this.target.height / t.height);
                for (var i = this.interactiveItems.length, n = 0; n < i; n++) {
                    var r = this.interactiveItems[n];
                    r.mousemove && r.mousemove(this.mouse)
                }
            }
        }, z.InteractionManager.prototype.onMouseDown = function(e) {
            if (this.dirty && this.rebuildInteractiveGraph(), this.mouse) {
                this.mouse.originalEvent = e, z.AUTO_PREVENT_DEFAULT && this.mouse.originalEvent && this.mouse.originalEvent.preventDefault();
                for (var t = this.interactiveItems.length, i = this.mouse.originalEvent, n = 2 === i.button || 3 === i.which, r = n ? "rightdown" : "mousedown", o = n ? "rightclick" : "__click", a = n ? "__rightIsDown" : "__mouseIsDown", s = n ? "__isRightDown" : "__isDown", l = 0; l < t; l++) {
                    var h = this.interactiveItems[l];
                    if ((h[r] || h[o]) && (h[a] = !0, h.__hit = this.hitTest(h, this.mouse), h.__hit && (h[r] && h[r](this.mouse), h[s] = !0, !h.interactiveChildren))) break
                }
            }
        }, z.InteractionManager.prototype.onMouseOut = function(e) {
            if (this.dirty && this.rebuildInteractiveGraph(), this.mouse) {
                this.mouse.originalEvent = e;
                var t = this.interactiveItems.length;
                this.interactionDOMElement.style.cursor = "inherit";
                for (var i = 0; i < t; i++) {
                    var n = this.interactiveItems[i];
                    n.__isOver && ((this.mouse.target = n).mouseout && n.mouseout(this.mouse), n.__isOver = !1)
                }
                this.mouseOut = !0
            }
        }, z.InteractionManager.prototype.onMouseUp = function(e) {
            if (this.dirty && this.rebuildInteractiveGraph(), this.mouse) {
                this.mouse.originalEvent = e;
                for (var t = this.interactiveItems.length, i = !1, n = this.mouse.originalEvent, r = 2 === n.button || 3 === n.which, o = r ? "rightup" : "mouseup", a = r ? "rightclick" : "__click", s = r ? "rightupoutside" : "mouseupoutside", l = r ? "__isRightDown" : "__isDown", h = 0; h < t; h++) {
                    var d = this.interactiveItems[h];
                    (d[a] || d[o] || d[s]) && (d.__hit = this.hitTest(d, this.mouse), d.__hit && !i ? (d[o] && d[o](this.mouse), d[l] && d[a] && d[a](this.mouse), d.interactiveChildren || (i = !0)) : d[l] && d[s] && d[s](this.mouse), d[l] = !1)
                }
            }
        }, z.InteractionManager.prototype.hitTest = function(e, t) {
            var i = t.global;
            if (!e.worldVisible) return !1;
            e.worldTransform.applyInverse(i, this._tempPoint);
            var n, r = this._tempPoint.x,
                o = this._tempPoint.y;
            if ((t.target = e).hitArea && e.hitArea.contains) return e.hitArea.contains(r, o);
            if (e instanceof z.Sprite) {
                var a, s = e.texture.frame.width,
                    l = e.texture.frame.height,
                    h = -s * e.anchor.x;
                if (h < r && r < h + s && (a = -l * e.anchor.y) < o && o < a + l) return !0
            } else if (e instanceof z.Graphics) {
                var d = e.graphicsData;
                for (n = 0; n < d.length; n++) {
                    var c = d[n];
                    if (c.fill && (c.shape && c.shape.contains(r, o))) return !0
                }
            }
            var u = e.children.length;
            for (n = 0; n < u; n++) {
                var f = e.children[n];
                if (this.hitTest(f, t)) return t.target = e, !0
            }
            return !1
        }, z.InteractionManager.prototype.onTouchMove = function(e) {
            this.dirty && this.rebuildInteractiveGraph();
            var t, i = this.interactionDOMElement.getBoundingClientRect(),
                n = e.changedTouches,
                r = 0;
            for (r = 0; r < n.length; r++) {
                var o = n[r];
                if (t = this.touches[o.identifier]) {
                    t.originalEvent = e, t.global.x = (o.clientX - i.left) * (this.target.width / i.width), t.global.y = (o.clientY - i.top) * (this.target.height / i.height);
                    for (var a = 0; a < this.interactiveItems.length; a++) {
                        var s = this.interactiveItems[a];
                        s.touchmove && s.__touchData && s.__touchData[o.identifier] && s.touchmove(t)
                    }
                }
            }
            e.preventDefault()
        }, z.InteractionManager.prototype.onTouchStart = function(e) {
            this.dirty && this.rebuildInteractiveGraph();
            var t = this.interactionDOMElement.getBoundingClientRect();
            z.AUTO_PREVENT_DEFAULT && e.preventDefault();
            for (var i = e.changedTouches, n = 0; n < i.length; n++) {
                var r = i[n],
                    o = this.pool.pop();
                o || (o = new z.InteractionData), o.originalEvent = e, (this.touches[r.identifier] = o).global.x = (r.clientX - t.left) * (this.target.width / t.width), o.global.y = (r.clientY - t.top) * (this.target.height / t.height);
                for (var a = this.interactiveItems.length, s = 0; s < a; s++) {
                    var l = this.interactiveItems[s];
                    if ((l.touchstart || l.tap) && (l.__hit = this.hitTest(l, o), l.__hit && (l.touchstart && l.touchstart(o), l.__isDown = !0, l.__touchData = l.__touchData || {}, l.__touchData[r.identifier] = o, !l.interactiveChildren))) break
                }
            }
        }, z.InteractionManager.prototype.onTouchEnd = function(e) {
            this.dirty && this.rebuildInteractiveGraph();
            for (var t = this.interactionDOMElement.getBoundingClientRect(), i = e.changedTouches, n = 0; n < i.length; n++) {
                var r = i[n],
                    o = this.touches[r.identifier];
                if (o) {
                    var a = !1;
                    o.global.x = (r.clientX - t.left) * (this.target.width / t.width), o.global.y = (r.clientY - t.top) * (this.target.height / t.height);
                    for (var s = this.interactiveItems.length, l = 0; l < s; l++) {
                        var h = this.interactiveItems[l];
                        h.__touchData && h.__touchData[r.identifier] && (h.__hit = this.hitTest(h, h.__touchData[r.identifier]), o.originalEvent = e, (h.touchend || h.tap) && (h.__hit && !a ? (h.touchend && h.touchend(o), h.__isDown && h.tap && h.tap(o), h.interactiveChildren || (a = !0)) : h.__isDown && h.touchendoutside && h.touchendoutside(o), h.__isDown = !1), h.__touchData[r.identifier] = null)
                    }
                    this.pool.push(o), this.touches[r.identifier] = null
                }
            }
        }, z.Stage = function(e) {
            z.DisplayObjectContainer.call(this), this.worldTransform = new z.Matrix, this.interactive = !0, this.interactionManager = new z.InteractionManager(this), this.dirty = !0, (this.stage = this).stage.hitArea = new z.Rectangle(0, 0, 1e5, 1e5), this.setBackgroundColor(e)
        }, z.Stage.prototype = Object.create(z.DisplayObjectContainer.prototype), z.Stage.prototype.constructor = z.Stage, z.Stage.prototype.updateTransform = function() {
            this.worldAlpha = 1;
            for (var e = 0, t = this.children.length; e < t; e++) this.children[e].updateTransform();
            this.dirty && (this.dirty = !1, this.interactionManager.dirty = !0), this.interactive && this.interactionManager.update()
        }, z.Stage.prototype.setBackgroundColor = function(e) {
            this.backgroundColor = e || 0, this.backgroundColorSplit = z.hex2rgb(this.backgroundColor);
            var t = this.backgroundColor.toString(16);
            t = "000000".substr(0, 6 - t.length) + t, this.backgroundColorString = "#" + t
        }, z.Stage.prototype.getMousePosition = function() {
            return this.interactionManager.mouse.global
        }, z.hex2rgb = function(e) {
            return [(e >> 16 & 255) / 255, (e >> 8 & 255) / 255, (255 & e) / 255]
        }, z.rgb2hex = function(e) {
            return (255 * e[0] << 16) + (255 * e[1] << 8) + 255 * e[2]
        }, z.canUseNewCanvasBlendModes = function() {
            if ("undefined" == typeof document) return !1;
            var e = document.createElement("canvas");
            e.width = 1, e.height = 1;
            var t = e.getContext("2d");
            return t.fillStyle = "#000", t.fillRect(0, 0, 1, 1), t.globalCompositeOperation = "multiply", t.fillStyle = "#fff", t.fillRect(0, 0, 1, 1), 0 === t.getImageData(0, 0, 1, 1).data[0]
        }, z.getNextPowerOfTwo = function(e) {
            if (0 < e && 0 == (e & e - 1)) return e;
            for (var t = 1; t < e;) t <<= 1;
            return t
        }, z.isPowerOfTwo = function(e, t) {
            return 0 < e && 0 == (e & e - 1) && 0 < t && 0 == (t & t - 1)
        }, z.PolyK = {}, z.PolyK.Triangulate = function(e) {
            var t = !0,
                i = e.length >> 1;
            if (i < 3) return [];
            for (var n = [], r = [], o = 0; o < i; o++) r.push(o);
            o = 0;
            for (var a = i; 3 < a;) {
                var s = r[(o + 0) % a],
                    l = r[(o + 1) % a],
                    h = r[(o + 2) % a],
                    d = e[2 * s],
                    c = e[2 * s + 1],
                    u = e[2 * l],
                    f = e[2 * l + 1],
                    p = e[2 * h],
                    g = e[2 * h + 1],
                    v = !1;
                if (z.PolyK._convex(d, c, u, f, p, g, t)) {
                    v = !0;
                    for (var m = 0; m < a; m++) {
                        var w = r[m];
                        if (w !== s && w !== l && w !== h && z.PolyK._PointInTriangle(e[2 * w], e[2 * w + 1], d, c, u, f, p, g)) {
                            v = !1;
                            break
                        }
                    }
                }
                if (v) n.push(s, l, h), r.splice((o + 1) % a, 1), a--, o = 0;
                else if (o++ > 3 * a) {
                    if (!t) return null;
                    for (n = [], r = [], o = 0; o < i; o++) r.push(o);
                    o = 0, a = i, t = !1
                }
            }
            return n.push(r[0], r[1], r[2]), n
        }, z.PolyK._PointInTriangle = function(e, t, i, n, r, o, a, s) {
            var l = a - i,
                h = s - n,
                d = r - i,
                c = o - n,
                u = e - i,
                f = t - n,
                p = l * l + h * h,
                g = l * d + h * c,
                v = l * u + h * f,
                m = d * d + c * c,
                w = d * u + c * f,
                y = 1 / (p * m - g * g),
                S = (m * v - g * w) * y,
                b = (p * w - g * v) * y;
            return 0 <= S && 0 <= b && S + b < 1
        }, z.PolyK._convex = function(e, t, i, n, r, o, a) {
            return 0 <= (t - n) * (r - i) + (i - e) * (o - n) === a
        }, z.EventTarget = {
            call: function(e) {
                e && (e = e.prototype || e, z.EventTarget.mixin(e))
            },
            mixin: function(e) {
                e.listeners = function(e) {
                    return this._listeners = this._listeners || {}, this._listeners[e] ? this._listeners[e].slice() : []
                }, e.emitPixi = e.dispatchEvent = function(e, t) {
                    if (this._listeners = this._listeners || {}, "object" == typeof e && (e = (t = e).type), t && !0 === t.__isEventObject || (t = new z.Event(this, e, t)), this._listeners && this._listeners[e]) {
                        var i, n = this._listeners[e].slice(0),
                            r = n.length,
                            o = n[0];
                        for (i = 0; i < r; o = n[++i])
                            if (o.call(this, t), t.stoppedImmediate) return this;
                        if (t.stopped) return this
                    }
                    return this.parent && this.parent.emit && this.parent.emit.call(this.parent, e, t), this
                }, e.onPixi = e.addEventListener = function(e, t) {
                    return this._listeners = this._listeners || {}, (this._listeners[e] = this._listeners[e] || []).push(t), this
                }, e.oncePixi = function(e, t) {
                    this._listeners = this._listeners || {};
                    var i = this;

                    function n() {
                        t.apply(i.offPixi(e, n), arguments)
                    }
                    return n._originalHandler = t, this.onPixi(e, n)
                }, e.offPixi = e.removeEventListener = function(e, t) {
                    if (this._listeners = this._listeners || {}, !this._listeners[e]) return this;
                    for (var i = this._listeners[e], n = t ? i.length : 0; 0 < n--;) i[n] !== t && i[n]._originalHandler !== t || i.splice(n, 1);
                    return 0 === i.length && delete this._listeners[e], this
                }, e.removeAllListeners = function(e) {
                    return this._listeners = this._listeners || {}, this._listeners[e] && delete this._listeners[e], this
                }
            }
        }, z.Event = function(e, t, i) {
            this.__isEventObject = !0, this.stopped = !1, this.stoppedImmediate = !1, this.target = e, this.type = t, this.data = i, this.content = i, this.timeStamp = Date.now()
        }, z.Event.prototype.stopPropagation = function() {
            this.stopped = !0
        }, z.Event.prototype.stopImmediatePropagation = function() {
            this.stoppedImmediate = !0
        }, z.autoDetectRenderer = function(e, t, i) {
            return e || (e = 800), t || (t = 600),
                function() {
                    try {
                        var e = i.view || document.createElement("canvas"),
                            t = {
                                alpha: i.transparent,
                                antialias: i.antialias,
                                premultipliedAlpha: i.transparent && "notMultiplied" !== i.transparent,
                                stencil: !0,
                                preserveDrawingBuffer: i.preserveDrawingBuffer
                            };
                        return !!window.WebGLRenderingContext && e.getContext("webgl", t)
                    } catch (e) {
                        return console.warn("Failed to create WebGL renderer", e), !1
                    }
                }() ? new z.WebGLRenderer(e, t, i) : (ga("send", "event", "WebGL", "Failed to create WebGL Context"), new z.CanvasRenderer(e, t, i))
        }, z.initDefaultShaders = function() {}, z.CompileVertexShader = function(e, t) {
            return z._CompileShader(e, t, e.VERTEX_SHADER)
        }, z.CompileFragmentShader = function(e, t) {
            return z._CompileShader(e, t, e.FRAGMENT_SHADER)
        }, z._CompileShader = function(e, t, i) {
            var n = t.join("\n"),
                r = e.createShader(i);
            return e.shaderSource(r, n), e.compileShader(r), e.getShaderParameter(r, e.COMPILE_STATUS) ? r : (window.console.log(e.getShaderInfoLog(r)), null)
        }, z.compileProgram = function(e, t, i) {
            var n = z.CompileFragmentShader(e, i),
                r = z.CompileVertexShader(e, t),
                o = e.createProgram();
            return e.attachShader(o, r), e.attachShader(o, n), e.linkProgram(o), e.getProgramParameter(o, e.LINK_STATUS) || window.console.log("Could not initialise shaders"), o
        }, z.PixiShader = function(e) {
            this._UID = z._UID++, this.gl = e, this.program = null, this.fragmentSrc = ["precision lowp float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform sampler2D uSampler;", "void main(void) {", "   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;", "}"], this.textureCount = 0, this.firstRun = !0, this.dirty = !0, this.attributes = [], this.init()
        }, z.PixiShader.prototype.constructor = z.PixiShader, z.PixiShader.prototype.init = function() {
            var e = this.gl,
                t = z.compileProgram(e, this.vertexSrc || z.PixiShader.defaultVertexSrc, this.fragmentSrc);
            for (var i in e.useProgram(t), this.uSampler = e.getUniformLocation(t, "uSampler"), this.projectionVector = e.getUniformLocation(t, "projectionVector"), this.offsetVector = e.getUniformLocation(t, "offsetVector"), this.dimensions = e.getUniformLocation(t, "dimensions"), this.aVertexPosition = e.getAttribLocation(t, "aVertexPosition"), this.aTextureCoord = e.getAttribLocation(t, "aTextureCoord"), this.colorAttribute = e.getAttribLocation(t, "aColor"), -1 === this.colorAttribute && (this.colorAttribute = 2), this.attributes = [this.aVertexPosition, this.aTextureCoord, this.colorAttribute], this.uniforms) this.uniforms[i].uniformLocation = e.getUniformLocation(t, i);
            this.initUniforms(), this.program = t
        }, z.PixiShader.prototype.initUniforms = function() {
            this.textureCount = 1;
            var e, t = this.gl;
            for (var i in this.uniforms) {
                var n = (e = this.uniforms[i]).type;
                "sampler2D" === n ? (e._init = !1, null !== e.value && this.initSampler2D(e)) : "mat2" === n || "mat3" === n || "mat4" === n ? (e.glMatrix = !0, e.glValueLength = 1, "mat2" === n ? e.glFunc = t.uniformMatrix2fv : "mat3" === n ? e.glFunc = t.uniformMatrix3fv : "mat4" === n && (e.glFunc = t.uniformMatrix4fv)) : (e.glFunc = t["uniform" + n], e.glValueLength = "2f" === n || "2i" === n ? 2 : "3f" === n || "3i" === n ? 3 : "4f" === n || "4i" === n ? 4 : 1)
            }
        }, z.PixiShader.prototype.initSampler2D = function(e) {
            if (e.value && e.value.baseTexture && e.value.baseTexture.hasLoaded) {
                var t = this.gl;
                if (t.activeTexture(t["TEXTURE" + this.textureCount]), t.bindTexture(t.TEXTURE_2D, e.value.baseTexture._glTextures[t.id]), e.textureData) {
                    var i = e.textureData,
                        n = i.magFilter ? i.magFilter : t.LINEAR,
                        r = i.minFilter ? i.minFilter : t.LINEAR,
                        o = i.wrapS ? i.wrapS : t.CLAMP_TO_EDGE,
                        a = i.wrapT ? i.wrapT : t.CLAMP_TO_EDGE,
                        s = i.luminance ? t.LUMINANCE : t.RGBA;
                    if (i.repeat && (o = t.REPEAT, a = t.REPEAT), t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, !!i.flipY), i.width) {
                        var l = i.width ? i.width : 512,
                            h = i.height ? i.height : 2,
                            d = i.border ? i.border : 0;
                        t.texImage2D(t.TEXTURE_2D, 0, s, l, h, d, s, t.UNSIGNED_BYTE, null)
                    } else t.texImage2D(t.TEXTURE_2D, 0, s, t.RGBA, t.UNSIGNED_BYTE, e.value.baseTexture.source);
                    t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, n), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, r), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, o), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, a)
                }
                t.uniform1i(e.uniformLocation, this.textureCount), e._init = !0, this.textureCount++
            }
        }, z.PixiShader.prototype.syncUniforms = function() {
            var e;
            this.textureCount = 1;
            var t = this.gl;
            for (var i in this.uniforms) 1 === (e = this.uniforms[i]).glValueLength ? !0 === e.glMatrix ? e.glFunc.call(t, e.uniformLocation, e.transpose, e.value) : e.glFunc.call(t, e.uniformLocation, e.value) : 2 === e.glValueLength ? e.glFunc.call(t, e.uniformLocation, e.value.x, e.value.y) : 3 === e.glValueLength ? e.glFunc.call(t, e.uniformLocation, e.value.x, e.value.y, e.value.z) : 4 === e.glValueLength ? e.glFunc.call(t, e.uniformLocation, e.value.x, e.value.y, e.value.z, e.value.w) : "sampler2D" === e.type && (e._init ? (t.activeTexture(t["TEXTURE" + this.textureCount]), e.value.baseTexture._dirty[t.id] ? z.instances[t.id].updateTexture(e.value.baseTexture) : t.bindTexture(t.TEXTURE_2D, e.value.baseTexture._glTextures[t.id]), t.uniform1i(e.uniformLocation, this.textureCount), this.textureCount++) : this.initSampler2D(e))
        }, z.PixiShader.prototype.destroy = function() {
            this.gl.deleteProgram(this.program), this.uniforms = null, this.gl = null, this.attributes = null
        }, z.PixiShader.defaultVertexSrc = ["attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "attribute vec4 aColor;", "uniform vec2 projectionVector;", "uniform vec2 offsetVector;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "const vec2 center = vec2(-1.0, 1.0);", "void main(void) {", "   gl_Position = vec4( ((aVertexPosition + offsetVector) / projectionVector) + center , 0.0, 1.0);", "   vTextureCoord = aTextureCoord;", "   vColor = vec4(aColor.rgb * aColor.a, aColor.a);", "}"], z.PixiFastShader = function(e) {
            this._UID = z._UID++, this.gl = e, this.program = null, this.fragmentSrc = ["precision lowp float;", "varying vec2 vTextureCoord;", "varying float vColor;", "uniform sampler2D uSampler;", "void main(void) {", "   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;", "}"], this.vertexSrc = ["attribute vec2 aVertexPosition;", "attribute vec2 aPositionCoord;", "attribute vec2 aScale;", "attribute float aRotation;", "attribute vec2 aTextureCoord;", "attribute float aColor;", "uniform vec2 projectionVector;", "uniform vec2 offsetVector;", "uniform mat3 uMatrix;", "varying vec2 vTextureCoord;", "varying float vColor;", "const vec2 center = vec2(-1.0, 1.0);", "void main(void) {", "   vec2 v;", "   vec2 sv = aVertexPosition * aScale;", "   v.x = (sv.x) * cos(aRotation) - (sv.y) * sin(aRotation);", "   v.y = (sv.x) * sin(aRotation) + (sv.y) * cos(aRotation);", "   v = ( uMatrix * vec3(v + aPositionCoord , 1.0) ).xy ;", "   gl_Position = vec4( ( v / projectionVector) + center , 0.0, 1.0);", "   vTextureCoord = aTextureCoord;", "   vColor = aColor;", "}"], this.textureCount = 0, this.init()
        }, z.PixiFastShader.prototype.constructor = z.PixiFastShader, z.PixiFastShader.prototype.init = function() {
            var e = this.gl,
                t = z.compileProgram(e, this.vertexSrc, this.fragmentSrc);
            e.useProgram(t), this.uSampler = e.getUniformLocation(t, "uSampler"), this.projectionVector = e.getUniformLocation(t, "projectionVector"), this.offsetVector = e.getUniformLocation(t, "offsetVector"), this.dimensions = e.getUniformLocation(t, "dimensions"), this.uMatrix = e.getUniformLocation(t, "uMatrix"), this.aVertexPosition = e.getAttribLocation(t, "aVertexPosition"), this.aPositionCoord = e.getAttribLocation(t, "aPositionCoord"), this.aScale = e.getAttribLocation(t, "aScale"), this.aRotation = e.getAttribLocation(t, "aRotation"), this.aTextureCoord = e.getAttribLocation(t, "aTextureCoord"), this.colorAttribute = e.getAttribLocation(t, "aColor"), -1 === this.colorAttribute && (this.colorAttribute = 2), this.attributes = [this.aVertexPosition, this.aPositionCoord, this.aScale, this.aRotation, this.aTextureCoord, this.colorAttribute], this.program = t
        }, z.PixiFastShader.prototype.destroy = function() {
            this.gl.deleteProgram(this.program), this.uniforms = null, this.gl = null, this.attributes = null
        }, z.PrimitiveShader = function(e) {
            this._UID = z._UID++, this.gl = e, this.program = null, this.fragmentSrc = ["precision mediump float;", "varying vec4 vColor;", "void main(void) {", "   gl_FragColor = vColor;", "}"], this.vertexSrc = ["attribute vec2 aVertexPosition;", "attribute vec4 aColor;", "uniform mat3 translationMatrix;", "uniform vec2 projectionVector;", "uniform vec2 offsetVector;", "uniform float alpha;", "uniform float flipY;", "uniform vec3 tint;", "varying vec4 vColor;", "void main(void) {", "   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);", "   v -= offsetVector.xyx;", "   gl_Position = vec4( v.x / projectionVector.x -1.0, (v.y / projectionVector.y * -flipY) + flipY , 0.0, 1.0);", "   vColor = aColor * vec4(tint * alpha, alpha);", "}"], this.init()
        }, z.PrimitiveShader.prototype.constructor = z.PrimitiveShader, z.PrimitiveShader.prototype.init = function() {
            var e = this.gl,
                t = z.compileProgram(e, this.vertexSrc, this.fragmentSrc);
            e.useProgram(t), this.projectionVector = e.getUniformLocation(t, "projectionVector"), this.offsetVector = e.getUniformLocation(t, "offsetVector"), this.tintColor = e.getUniformLocation(t, "tint"), this.flipY = e.getUniformLocation(t, "flipY"), this.aVertexPosition = e.getAttribLocation(t, "aVertexPosition"), this.colorAttribute = e.getAttribLocation(t, "aColor"), this.attributes = [this.aVertexPosition, this.colorAttribute], this.translationMatrix = e.getUniformLocation(t, "translationMatrix"), this.alpha = e.getUniformLocation(t, "alpha"), this.program = t
        }, z.PrimitiveShader.prototype.destroy = function() {
            this.gl.deleteProgram(this.program), this.uniforms = null, this.gl = null, this.attributes = null
        }, z.ComplexPrimitiveShader = function(e) {
            this._UID = z._UID++, this.gl = e, this.program = null, this.fragmentSrc = ["precision mediump float;", "varying vec4 vColor;", "void main(void) {", "   gl_FragColor = vColor;", "}"], this.vertexSrc = ["attribute vec2 aVertexPosition;", "uniform mat3 translationMatrix;", "uniform vec2 projectionVector;", "uniform vec2 offsetVector;", "uniform vec3 tint;", "uniform float alpha;", "uniform vec3 color;", "uniform float flipY;", "varying vec4 vColor;", "void main(void) {", "   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);", "   v -= offsetVector.xyx;", "   gl_Position = vec4( v.x / projectionVector.x -1.0, (v.y / projectionVector.y * -flipY) + flipY , 0.0, 1.0);", "   vColor = vec4(color * alpha * tint, alpha);", "}"], this.init()
        }, z.ComplexPrimitiveShader.prototype.constructor = z.ComplexPrimitiveShader, z.ComplexPrimitiveShader.prototype.init = function() {
            var e = this.gl,
                t = z.compileProgram(e, this.vertexSrc, this.fragmentSrc);
            e.useProgram(t), this.projectionVector = e.getUniformLocation(t, "projectionVector"), this.offsetVector = e.getUniformLocation(t, "offsetVector"), this.tintColor = e.getUniformLocation(t, "tint"), this.color = e.getUniformLocation(t, "color"), this.flipY = e.getUniformLocation(t, "flipY"), this.aVertexPosition = e.getAttribLocation(t, "aVertexPosition"), this.attributes = [this.aVertexPosition, this.colorAttribute], this.translationMatrix = e.getUniformLocation(t, "translationMatrix"), this.alpha = e.getUniformLocation(t, "alpha"), this.program = t
        }, z.ComplexPrimitiveShader.prototype.destroy = function() {
            this.gl.deleteProgram(this.program), this.uniforms = null, this.gl = null, this.attribute = null
        }, z.WebGLGraphics = function() {}, z.WebGLGraphics.renderGraphics = function(e, t) {
            var i, n = t.gl,
                r = t.projection,
                o = t.offset,
                a = t.shaderManager.primitiveShader;
            e.dirty && z.WebGLGraphics.updateGraphics(e, n);
            var s = e._webGL[n.id];
            if (s && s.data)
                for (var l = 0; l < s.data.length; l++) 1 === s.data[l].mode ? (i = s.data[l], t.stencilManager.pushStencil(e, i, t), n.drawElements(n.TRIANGLE_FAN, 4, n.UNSIGNED_SHORT, 2 * (i.indices.length - 4)), t.stencilManager.popStencil(e, i, t)) : (i = s.data[l], t.shaderManager.setShader(a), a = t.shaderManager.primitiveShader, n.uniformMatrix3fv(a.translationMatrix, !1, e.worldTransform.toArray(!0)), n.uniform1f(a.flipY, 1), n.uniform2f(a.projectionVector, r.x, -r.y), n.uniform2f(a.offsetVector, -o.x, -o.y), n.uniform3fv(a.tintColor, z.hex2rgb(e.tint)), n.uniform1f(a.alpha, e.worldAlpha), n.bindBuffer(n.ARRAY_BUFFER, i.buffer), n.vertexAttribPointer(a.aVertexPosition, 2, n.FLOAT, !1, 24, 0), n.vertexAttribPointer(a.colorAttribute, 4, n.FLOAT, !1, 24, 8), n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, i.indexBuffer), n.drawElements(n.TRIANGLE_STRIP, i.indices.length, n.UNSIGNED_SHORT, 0))
        }, z.WebGLGraphics.updateGraphics = function(e, t) {
            var i, n, r = e._webGL[t.id];
            if (r || (r = e._webGL[t.id] = {
                    lastIndex: 0,
                    data: [],
                    gl: t
                }), e.dirty = !1, e.clearDirty) {
                for (e.clearDirty = !1, i = 0; i < r.data.length; i++) {
                    var o = r.data[i];
                    o.reset(), z.WebGLGraphics.graphicsDataPool.push(o)
                }
                r.data = [], r.lastIndex = 0
            }
            for (i = r.lastIndex; i < e.graphicsData.length; i++) {
                var a = e.graphicsData[i];
                if (a.type === z.Graphics.POLY) {
                    if (a.points = a.shape.points.slice(), a.shape.closed && (a.points[0] === a.points[a.points.length - 2] && a.points[1] === a.points[a.points.length - 1] || a.points.push(a.points[0], a.points[1])), a.fill)
                        if (6 <= a.points.length)
                            if (a.points.length < 12) n = z.WebGLGraphics.switchMode(r, 0), z.WebGLGraphics.buildPoly(a, n) || (n = z.WebGLGraphics.switchMode(r, 1), z.WebGLGraphics.buildComplexPoly(a, n));
                            else n = z.WebGLGraphics.switchMode(r, 1), z.WebGLGraphics.buildComplexPoly(a, n);
                    0 < a.lineWidth && (n = z.WebGLGraphics.switchMode(r, 0), z.WebGLGraphics.buildLine(a, n))
                } else n = z.WebGLGraphics.switchMode(r, 0), a.type === z.Graphics.RECT ? z.WebGLGraphics.buildRectangle(a, n) : a.type === z.Graphics.CIRC || a.type === z.Graphics.ELIP ? z.WebGLGraphics.buildCircle(a, n) : a.type === z.Graphics.RREC && z.WebGLGraphics.buildRoundedRectangle(a, n);
                r.lastIndex++
            }
            for (i = 0; i < r.data.length; i++)(n = r.data[i]).dirty && n.upload()
        }, z.WebGLGraphics.switchMode = function(e, t) {
            var i;
            return e.data.length && (i = e.data[e.data.length - 1]).mode === t && 1 !== t || ((i = z.WebGLGraphics.graphicsDataPool.pop() || new z.WebGLGraphicsData(e.gl)).mode = t, e.data.push(i)), i.dirty = !0, i
        }, z.WebGLGraphics.buildRectangle = function(e, t) {
            var i = e.shape,
                n = i.x,
                r = i.y,
                o = i.width,
                a = i.height;
            if (e.fill) {
                var s = z.hex2rgb(e.fillColor),
                    l = e.fillAlpha,
                    h = s[0] * l,
                    d = s[1] * l,
                    c = s[2] * l,
                    u = t.points,
                    f = t.indices,
                    p = u.length / 6;
                u.push(n, r), u.push(h, d, c, l), u.push(n + o, r), u.push(h, d, c, l), u.push(n, r + a), u.push(h, d, c, l), u.push(n + o, r + a), u.push(h, d, c, l), f.push(p, p, p + 1, p + 2, p + 3, p + 3)
            }
            if (e.lineWidth) {
                var g = e.points;
                e.points = [n, r, n + o, r, n + o, r + a, n, r + a, n, r], z.WebGLGraphics.buildLine(e, t), e.points = g
            }
        }, z.WebGLGraphics.buildRoundedRectangle = function(e, t) {
            var i = e.shape,
                n = i.x,
                r = i.y,
                o = i.width,
                a = i.height,
                s = i.radius,
                l = [];
            if (l.push(n, r + s), l = (l = (l = (l = l.concat(z.WebGLGraphics.quadraticBezierCurve(n, r + a - s, n, r + a, n + s, r + a))).concat(z.WebGLGraphics.quadraticBezierCurve(n + o - s, r + a, n + o, r + a, n + o, r + a - s))).concat(z.WebGLGraphics.quadraticBezierCurve(n + o, r + s, n + o, r, n + o - s, r))).concat(z.WebGLGraphics.quadraticBezierCurve(n + s, r, n, r, n, r + s)), e.fill) {
                var h = z.hex2rgb(e.fillColor),
                    d = e.fillAlpha,
                    c = h[0] * d,
                    u = h[1] * d,
                    f = h[2] * d,
                    p = t.points,
                    g = t.indices,
                    v = p.length / 6,
                    m = z.PolyK.Triangulate(l);
                if (!m) return e.shape.height++, void z.WebGLGraphics.buildRoundedRectangle(e, t);
                var w = 0;
                for (w = 0; w < m.length; w += 3) g.push(m[w] + v), g.push(m[w] + v), g.push(m[w + 1] + v), g.push(m[w + 2] + v), g.push(m[w + 2] + v);
                for (w = 0; w < l.length; w++) p.push(l[w], l[++w], c, u, f, d)
            }
            if (e.lineWidth) {
                var y = e.points;
                e.points = l, z.WebGLGraphics.buildLine(e, t), e.points = y
            }
        }, z.WebGLGraphics.quadraticBezierCurve = function(e, t, i, n, r, o) {
            var a, s, l, h, d, c, u = [];

            function f(e, t, i) {
                return e + (t - e) * i
            }
            for (var p = 0, g = 0; g <= 20; g++) a = f(e, i, p = g / 20), s = f(t, n, p), l = f(i, r, p), h = f(n, o, p), d = f(a, l, p), c = f(s, h, p), u.push(d, c);
            return u
        }, z.WebGLGraphics.buildCircle = function(e, t) {
            var i, n, r = e.shape,
                o = r.x,
                a = r.y;
            n = e.type === z.Graphics.CIRC ? (i = r.radius, r.radius) : (i = r.width, r.height);
            var s = 2 * Math.PI / 40,
                l = 0;
            if (e.fill) {
                var h = z.hex2rgb(e.fillColor),
                    d = e.fillAlpha,
                    c = h[0] * d,
                    u = h[1] * d,
                    f = h[2] * d,
                    p = t.points,
                    g = t.indices,
                    v = p.length / 6;
                for (g.push(v), l = 0; l < 41; l++) p.push(o, a, c, u, f, d), p.push(o + Math.sin(s * l) * i, a + Math.cos(s * l) * n, c, u, f, d), g.push(v++, v++);
                g.push(v - 1)
            }
            if (e.lineWidth) {
                var m = e.points;
                for (e.points = [], l = 0; l < 41; l++) e.points.push(o + Math.sin(s * l) * i, a + Math.cos(s * l) * n);
                z.WebGLGraphics.buildLine(e, t), e.points = m
            }
        }, z.WebGLGraphics.buildLine = function(e, t) {
            var i = 0,
                n = e.points;
            if (0 !== n.length) {
                if (e.lineWidth % 2)
                    for (i = 0; i < n.length; i++) n[i] += .5;
                var r = new z.Point(n[0], n[1]),
                    o = new z.Point(n[n.length - 2], n[n.length - 1]);
                if (r.x === o.x && r.y === o.y) {
                    (n = n.slice()).pop(), n.pop();
                    var a = (o = new z.Point(n[n.length - 2], n[n.length - 1])).x + .5 * (r.x - o.x),
                        s = o.y + .5 * (r.y - o.y);
                    n.unshift(a, s), n.push(a, s)
                }
                var l, h, d, c, u, f, p, g, v, m, w, y, S, b, _, x, T, C, M, R, E, L, A = t.points,
                    P = t.indices,
                    G = n.length / 2,
                    k = n.length,
                    I = A.length / 6,
                    O = e.lineWidth / 2,
                    D = z.hex2rgb(e.lineColor),
                    B = e.lineAlpha,
                    F = D[0] * B,
                    X = D[1] * B,
                    H = D[2] * B;
                for (d = n[0], c = n[1], u = n[2], v = -(c - (f = n[3])), m = d - u, v /= L = Math.sqrt(v * v + m * m), m /= L, v *= O, m *= O, A.push(d - v, c - m, F, X, H, B), A.push(d + v, c + m, F, X, H, B), i = 1; i < G - 1; i++) d = n[2 * (i - 1)], c = n[2 * (i - 1) + 1], u = n[2 * i], f = n[2 * i + 1], p = n[2 * (i + 1)], g = n[2 * (i + 1) + 1], v = -(c - f), m = d - u, v /= L = Math.sqrt(v * v + m * m), m /= L, v *= O, m *= O, w = -(f - g), y = u - p, w /= L = Math.sqrt(w * w + y * y), y /= L, T = (-v + d) * (-m + f) - (-v + u) * (-m + c), R = (-(w *= O) + p) * (-(y *= O) + f) - (-w + u) * (-y + g), E = (_ = -m + c - (-m + f)) * (M = -w + u - (-w + p)) - (C = -y + g - (-y + f)) * (x = -v + u - (-v + d)), Math.abs(E) < .1 ? (E += 10.1, A.push(u - v, f - m, F, X, H, B), A.push(u + v, f + m, F, X, H, B)) : 19600 < ((l = (x * R - M * T) / E) - u) * (l - u) + ((h = (C * T - _ * R) / E) - f) + (h - f) ? (S = v - w, b = m - y, S /= L = Math.sqrt(S * S + b * b), b /= L, S *= O, b *= O, A.push(u - S, f - b), A.push(F, X, H, B), A.push(u + S, f + b), A.push(F, X, H, B), A.push(u - S, f - b), A.push(F, X, H, B), k++) : (A.push(l, h), A.push(F, X, H, B), A.push(u - (l - u), f - (h - f)), A.push(F, X, H, B));
                for (d = n[2 * (G - 2)], c = n[2 * (G - 2) + 1], u = n[2 * (G - 1)], v = -(c - (f = n[2 * (G - 1) + 1])), m = d - u, v /= L = Math.sqrt(v * v + m * m), m /= L, v *= O, m *= O, A.push(u - v, f - m), A.push(F, X, H, B), A.push(u + v, f + m), A.push(F, X, H, B), P.push(I), i = 0; i < k; i++) P.push(I++);
                P.push(I - 1)
            }
        }, z.WebGLGraphics.buildComplexPoly = function(e, t) {
            var i = e.points.slice();
            if (!(i.length < 6)) {
                var n = t.indices;
                t.points = i, t.alpha = e.fillAlpha, t.color = z.hex2rgb(e.fillColor);
                for (var r, o, a = 1 / 0, s = -1 / 0, l = 1 / 0, h = -1 / 0, d = 0; d < i.length; d += 2) a = (r = i[d]) < a ? r : a, s = s < r ? r : s, l = (o = i[d + 1]) < l ? o : l, h = h < o ? o : h;
                i.push(a, l, s, l, s, h, a, h);
                var c = i.length / 2;
                for (d = 0; d < c; d++) n.push(d)
            }
        }, z.WebGLGraphics.buildPoly = function(e, t) {
            var i = e.points;
            if (!(i.length < 6)) {
                var n = t.points,
                    r = t.indices,
                    o = i.length / 2,
                    a = z.hex2rgb(e.fillColor),
                    s = e.fillAlpha,
                    l = a[0] * s,
                    h = a[1] * s,
                    d = a[2] * s,
                    c = z.PolyK.Triangulate(i);
                if (!c) return !1;
                var u = n.length / 6,
                    f = 0;
                for (f = 0; f < c.length; f += 3) r.push(c[f] + u), r.push(c[f] + u), r.push(c[f + 1] + u), r.push(c[f + 2] + u), r.push(c[f + 2] + u);
                for (f = 0; f < o; f++) n.push(i[2 * f], i[2 * f + 1], l, h, d, s);
                return !0
            }
        }, z.WebGLGraphics.graphicsDataPool = [], z.WebGLGraphicsData = function(e) {
            this.gl = e, this.color = [0, 0, 0], this.points = [], this.indices = [], this.buffer = e.createBuffer(), this.indexBuffer = e.createBuffer(), this.mode = 1, this.alpha = 1, this.dirty = !0
        }, z.WebGLGraphicsData.prototype.reset = function() {
            this.points = [], this.indices = []
        }, z.WebGLGraphicsData.prototype.upload = function() {
            var e = this.gl;
            this.glPoints = new z.Float32Array(this.points), e.bindBuffer(e.ARRAY_BUFFER, this.buffer), e.bufferData(e.ARRAY_BUFFER, this.glPoints, e.STATIC_DRAW), this.glIndicies = new z.Uint16Array(this.indices), e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, this.indexBuffer), e.bufferData(e.ELEMENT_ARRAY_BUFFER, this.glIndicies, e.STATIC_DRAW), this.dirty = !1
        }, z.glContexts = [], z.instances = [], z.WebGLRenderer = function(e, t, i) {
            if (i)
                for (var n in z.defaultRenderOptions) void 0 === i[n] && (i[n] = z.defaultRenderOptions[n]);
            else i = z.defaultRenderOptions;
            z.defaultRenderer || (z.defaultRenderer = this), this.type = z.WEBGL_RENDERER, this.transparent = i.transparent, this.autoResize = i.autoResize || !1, this.preserveDrawingBuffer = i.preserveDrawingBuffer, this.clearBeforeRender = i.clearBeforeRender, this.width = e || 800, this.height = t || 600, this.view = i.view || document.createElement("canvas"), this.contextLostBound = this.handleContextLost.bind(this), this.contextRestoredBound = this.handleContextRestored.bind(this), this.view.addEventListener("webglcontextlost", this.contextLostBound, !1), this.view.addEventListener("webglcontextrestored", this.contextRestoredBound, !1), this._contextOptions = {
                alpha: this.transparent,
                antialias: i.antialias,
                premultipliedAlpha: this.transparent && "notMultiplied" !== this.transparent,
                stencil: !0,
                preserveDrawingBuffer: i.preserveDrawingBuffer
            }, this.projection = new z.Point, this.offset = new z.Point(0, 0), this.shaderManager = new z.WebGLShaderManager, this.spriteBatch = new z.WebGLSpriteBatch, this.maskManager = new z.WebGLMaskManager, this.filterManager = new z.WebGLFilterManager, this.stencilManager = new z.WebGLStencilManager, this.blendModeManager = new z.WebGLBlendModeManager, this.renderSession = {}, this.renderSession.gl = this.gl, this.renderSession.drawCount = 0, this.renderSession.shaderManager = this.shaderManager, this.renderSession.maskManager = this.maskManager, this.renderSession.filterManager = this.filterManager, this.renderSession.blendModeManager = this.blendModeManager, this.renderSession.spriteBatch = this.spriteBatch, this.renderSession.stencilManager = this.stencilManager, (this.renderSession.renderer = this).initContext(), this.mapBlendModes()
        }, z.WebGLRenderer.prototype.constructor = z.WebGLRenderer, z.WebGLRenderer.prototype.initContext = function() {
            var e = this.view.getContext("webgl", this._contextOptions);
            if (!(this.gl = e)) throw new Error("This browser does not support webGL. Try using the canvas renderer");
            this.glContextId = e.id = z.WebGLRenderer.glContextId++, z.glContexts[this.glContextId] = e, z.instances[this.glContextId] = this, e.disable(e.DEPTH_TEST), e.disable(e.CULL_FACE), e.enable(e.BLEND), this.shaderManager.setContext(e), this.spriteBatch.setContext(e), this.maskManager.setContext(e), this.filterManager.setContext(e), this.blendModeManager.setContext(e), this.stencilManager.setContext(e), this.renderSession.gl = this.gl, this.resize(this.width, this.height)
        }, z.WebGLRenderer.prototype.render = function(e) {
            if (!this.contextLost) {
                this.__stage !== e && (e.interactive && e.interactionManager.removeEvents(), this.__stage = e), e.updateTransform();
                var t = this.gl;
                e._interactiveEventsAdded || (e._interactiveEventsAdded = !0, e.interactionManager.setTarget(this)), t.viewport(0, 0, this.width, this.height), t.bindFramebuffer(t.FRAMEBUFFER, null), t.clearColor(e.backgroundColorSplit[0], e.backgroundColorSplit[1], e.backgroundColorSplit[2], 1), t.clear(t.COLOR_BUFFER_BIT), this.renderDisplayObject(e, this.projection)
            }
        }, z.WebGLRenderer.prototype.renderDisplayObject = function(e, t, i) {
            this.renderSession.blendModeManager.setBlendMode(z.blendModes.NORMAL), this.renderSession.drawCount = 0, this.renderSession.flipY = i ? -1 : 1, this.renderSession.projection = t, this.renderSession.offset = this.offset, this.spriteBatch.begin(this.renderSession), this.filterManager.begin(this.renderSession, i), e._renderWebGL(this.renderSession), this.spriteBatch.end()
        }, z.WebGLRenderer.prototype.resize = function(e, t) {
            this.width = e, this.height = t, this.view.width = this.width, this.view.height = this.height, this.gl.viewport(0, 0, this.width, this.height), this.projection.x = this.width / 2, this.projection.y = -this.height / 2
        }, z.WebGLRenderer.prototype.updateTexture = function(e) {
            if (e.hasLoaded && e.source && e.source.width && e.source.height) {
                var t = this.gl;
                try {
                    void 0 !== this._lastSize && (z.frvrTextureMemoryUsage -= 4 * e._lastSize.w * e._lastSize.h)
                } catch (e) {}
                e._glTextures[t.id] || (e._glTextures[t.id] = t.createTexture()), t.bindTexture(t.TEXTURE_2D, e._glTextures[t.id]), t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL, e.premultipliedAlpha), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, e.source);
                try {
                    z.frvrTextureMemoryUsage += 4 * e.source.width * e.source.height, e._lastSize = {
                        w: e.source.width,
                        h: e.source.height
                    }
                } catch (e) {}
                return t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, e.scaleMode === z.scaleModes.LINEAR ? t.LINEAR : t.NEAREST), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, e.scaleMode === z.scaleModes.LINEAR ? t.LINEAR : t.NEAREST), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), e._dirty[t.id] = !1, e._glTextures[t.id]
            }
        }, z.WebGLRenderer.prototype.handleContextLost = function(e) {
            e.preventDefault(), this.contextLost = !0
        }, z.WebGLRenderer.prototype.handleContextRestored = function() {
            for (var e in this.initContext(), z.TextureCache) {
                z.TextureCache[e].baseTexture._glTextures = []
            }
            this.contextLost = !1
        }, z.WebGLRenderer.prototype.destroy = function() {
            this.view.removeEventListener("webglcontextlost", this.contextLostBound), this.view.removeEventListener("webglcontextrestored", this.contextRestoredBound), z.glContexts[this.glContextId] = null, this.projection = null, this.offset = null, this.shaderManager.destroy(), this.spriteBatch.destroy(), this.maskManager.destroy(), this.filterManager.destroy(), this.shaderManager = null, this.spriteBatch = null, this.maskManager = null, this.filterManager = null, this.gl = null, this.renderSession = null
        }, z.WebGLRenderer.prototype.mapBlendModes = function() {
            var e = this.gl;
            z.blendModesWebGL || (z.blendModesWebGL = [], z.blendModesWebGL[z.blendModes.NORMAL] = [e.ONE, e.ONE_MINUS_SRC_ALPHA], z.blendModesWebGL[z.blendModes.ADD] = [e.SRC_ALPHA, e.DST_ALPHA], z.blendModesWebGL[z.blendModes.MULTIPLY] = [e.DST_COLOR, e.ONE_MINUS_SRC_ALPHA], z.blendModesWebGL[z.blendModes.SCREEN] = [e.SRC_ALPHA, e.ONE])
        }, z.WebGLRenderer.glContextId = 0, z.WebGLBlendModeManager = function() {
            this.currentBlendMode = 99999
        }, z.WebGLBlendModeManager.prototype.constructor = z.WebGLBlendModeManager, z.WebGLBlendModeManager.prototype.setContext = function(e) {
            this.gl = e
        }, z.WebGLBlendModeManager.prototype.setBlendMode = function(e) {
            if (this.currentBlendMode === e) return !1;
            this.currentBlendMode = e;
            var t = z.blendModesWebGL[this.currentBlendMode];
            return this.gl.blendFunc(t[0], t[1]), !0
        }, z.WebGLBlendModeManager.prototype.destroy = function() {
            this.gl = null
        }, z.WebGLMaskManager = function() {}, z.WebGLMaskManager.prototype.constructor = z.WebGLMaskManager, z.WebGLMaskManager.prototype.setContext = function(e) {
            this.gl = e
        }, z.WebGLMaskManager.prototype.pushMask = function(e, t) {
            var i = t.gl;
            e.dirty && z.WebGLGraphics.updateGraphics(e, i), e._webGL[i.id].data.length && t.stencilManager.pushStencil(e, e._webGL[i.id].data[0], t)
        }, z.WebGLMaskManager.prototype.popMask = function(e, t) {
            var i = this.gl;
            t.stencilManager.popStencil(e, e._webGL[i.id].data[0], t)
        }, z.WebGLMaskManager.prototype.destroy = function() {
            this.gl = null
        }, z.WebGLStencilManager = function() {
            this.stencilStack = [], this.reverse = !0, this.count = 0
        }, z.WebGLStencilManager.prototype.setContext = function(e) {
            this.gl = e
        }, z.WebGLStencilManager.prototype.pushStencil = function(e, t, i) {
            var n = this.gl;
            this.bindGraphics(e, t, i), 0 === this.stencilStack.length && (n.enable(n.STENCIL_TEST), n.clear(n.STENCIL_BUFFER_BIT), this.reverse = !0, this.count = 0), this.stencilStack.push(t);
            var r = this.count;
            n.colorMask(!1, !1, !1, !1), n.stencilFunc(n.ALWAYS, 0, 255), n.stencilOp(n.KEEP, n.KEEP, n.INVERT), 1 === t.mode ? (n.drawElements(n.TRIANGLE_FAN, t.indices.length - 4, n.UNSIGNED_SHORT, 0), this.reverse ? (n.stencilFunc(n.EQUAL, 255 - r, 255), n.stencilOp(n.KEEP, n.KEEP, n.DECR)) : (n.stencilFunc(n.EQUAL, r, 255), n.stencilOp(n.KEEP, n.KEEP, n.INCR)), n.drawElements(n.TRIANGLE_FAN, 4, n.UNSIGNED_SHORT, 2 * (t.indices.length - 4)), this.reverse ? n.stencilFunc(n.EQUAL, 255 - (r + 1), 255) : n.stencilFunc(n.EQUAL, r + 1, 255), this.reverse = !this.reverse) : (this.reverse ? (n.stencilFunc(n.EQUAL, r, 255), n.stencilOp(n.KEEP, n.KEEP, n.INCR)) : (n.stencilFunc(n.EQUAL, 255 - r, 255), n.stencilOp(n.KEEP, n.KEEP, n.DECR)), n.drawElements(n.TRIANGLE_STRIP, t.indices.length, n.UNSIGNED_SHORT, 0), this.reverse ? n.stencilFunc(n.EQUAL, r + 1, 255) : n.stencilFunc(n.EQUAL, 255 - (r + 1), 255)), n.colorMask(!0, !0, !0, !0), n.stencilOp(n.KEEP, n.KEEP, n.KEEP), this.count++
        }, z.WebGLStencilManager.prototype.bindGraphics = function(e, t, i) {
            this._currentGraphics = e;
            var n, r = this.gl,
                o = i.projection,
                a = i.offset;
            1 === t.mode ? (n = i.shaderManager.complexPrimitiveShader, i.shaderManager.setShader(n), r.uniform1f(n.flipY, i.flipY), r.uniformMatrix3fv(n.translationMatrix, !1, e.worldTransform.toArray(!0)), r.uniform2f(n.projectionVector, o.x, -o.y), r.uniform2f(n.offsetVector, -a.x, -a.y), r.uniform3fv(n.tintColor, z.hex2rgb(e.tint)), r.uniform3fv(n.color, t.color), r.uniform1f(n.alpha, e.worldAlpha * t.alpha), r.bindBuffer(r.ARRAY_BUFFER, t.buffer), r.vertexAttribPointer(n.aVertexPosition, 2, r.FLOAT, !1, 8, 0)) : (n = i.shaderManager.primitiveShader, i.shaderManager.setShader(n), r.uniformMatrix3fv(n.translationMatrix, !1, e.worldTransform.toArray(!0)), r.uniform1f(n.flipY, i.flipY), r.uniform2f(n.projectionVector, o.x, -o.y), r.uniform2f(n.offsetVector, -a.x, -a.y), r.uniform3fv(n.tintColor, z.hex2rgb(e.tint)), r.uniform1f(n.alpha, e.worldAlpha), r.bindBuffer(r.ARRAY_BUFFER, t.buffer), r.vertexAttribPointer(n.aVertexPosition, 2, r.FLOAT, !1, 24, 0), r.vertexAttribPointer(n.colorAttribute, 4, r.FLOAT, !1, 24, 8)), r.bindBuffer(r.ELEMENT_ARRAY_BUFFER, t.indexBuffer)
        }, z.WebGLStencilManager.prototype.popStencil = function(e, t, i) {
            var n = this.gl;
            if (this.stencilStack.pop(), this.count--, 0 === this.stencilStack.length) n.disable(n.STENCIL_TEST);
            else {
                var r = this.count;
                this.bindGraphics(e, t, i), n.colorMask(!1, !1, !1, !1), 1 === t.mode ? (this.reverse = !this.reverse, this.reverse ? (n.stencilFunc(n.EQUAL, 255 - (r + 1), 255), n.stencilOp(n.KEEP, n.KEEP, n.INCR)) : (n.stencilFunc(n.EQUAL, r + 1, 255), n.stencilOp(n.KEEP, n.KEEP, n.DECR)), n.drawElements(n.TRIANGLE_FAN, 4, n.UNSIGNED_SHORT, 2 * (t.indices.length - 4)), n.stencilFunc(n.ALWAYS, 0, 255), n.stencilOp(n.KEEP, n.KEEP, n.INVERT), n.drawElements(n.TRIANGLE_FAN, t.indices.length - 4, n.UNSIGNED_SHORT, 0)) : (this.reverse ? (n.stencilFunc(n.EQUAL, r + 1, 255), n.stencilOp(n.KEEP, n.KEEP, n.DECR)) : (n.stencilFunc(n.EQUAL, 255 - (r + 1), 255), n.stencilOp(n.KEEP, n.KEEP, n.INCR)), n.drawElements(n.TRIANGLE_STRIP, t.indices.length, n.UNSIGNED_SHORT, 0)), this.reverse ? n.stencilFunc(n.EQUAL, r, 255) : n.stencilFunc(n.EQUAL, 255 - r, 255), n.colorMask(!0, !0, !0, !0), n.stencilOp(n.KEEP, n.KEEP, n.KEEP)
            }
        }, z.WebGLStencilManager.prototype.destroy = function() {
            this.stencilStack = null, this.gl = null
        }, z.WebGLShaderManager = function() {
            this.maxAttibs = 10, this.attribState = [], this.tempAttribState = [];
            for (var e = 0; e < this.maxAttibs; e++) this.attribState[e] = !1;
            this.stack = []
        }, z.WebGLShaderManager.prototype.constructor = z.WebGLShaderManager, z.WebGLShaderManager.prototype.setContext = function(e) {
            this.gl = e, this.primitiveShader = new z.PrimitiveShader(e), this.complexPrimitiveShader = new z.ComplexPrimitiveShader(e), this.defaultShader = new z.PixiShader(e), this.fastShader = new z.PixiFastShader(e), this.setShader(this.defaultShader)
        }, z.WebGLShaderManager.prototype.setAttribs = function(e) {
            var t;
            for (t = 0; t < this.tempAttribState.length; t++) this.tempAttribState[t] = !1;
            for (t = 0; t < e.length; t++) {
                var i = e[t];
                this.tempAttribState[i] = !0
            }
            var n = this.gl;
            for (t = 0; t < this.attribState.length; t++) this.attribState[t] !== this.tempAttribState[t] && (this.attribState[t] = this.tempAttribState[t], this.tempAttribState[t] ? n.enableVertexAttribArray(t) : n.disableVertexAttribArray(t))
        }, z.WebGLShaderManager.prototype.setShader = function(e) {
            return this._currentId !== e._UID && (this._currentId = e._UID, this.currentShader = e, this.gl.useProgram(e.program), this.setAttribs(e.attributes), !0)
        }, z.WebGLShaderManager.prototype.destroy = function() {
            this.attribState = null, this.tempAttribState = null, this.primitiveShader.destroy(), this.complexPrimitiveShader.destroy(), this.defaultShader.destroy(), this.fastShader.destroy(), this.gl = null
        }, z.WebGLSpriteBatch = function() {
            this.vertSize = 5, this.size = 2e3;
            var e = 4 * this.size * 4 * this.vertSize,
                t = 6 * this.size;
            this.vertices = new z.ArrayBuffer(e), this.positions = new z.Float32Array(this.vertices), this.colors = new z.Uint32Array(this.vertices), this.indices = new z.Uint16Array(t);
            for (var i = this.lastIndexCount = 0, n = 0; i < t; i += 6, n += 4) this.indices[i + 0] = n + 0, this.indices[i + 1] = n + 1, this.indices[i + 2] = n + 2, this.indices[i + 3] = n + 0, this.indices[i + 4] = n + 2, this.indices[i + 5] = n + 3;
            this.drawing = !1, this.currentBatchSize = 0, this.currentBaseTexture = null, this.dirty = !0, this.textures = [], this.blendModes = [], this.shaders = [], this.sprites = [], this.defaultShader = new z.AbstractFilter(["precision lowp float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform sampler2D uSampler;", "void main(void) {", "   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;", "}"])
        }, z.WebGLSpriteBatch.prototype.setContext = function(e) {
            this.gl = e, this.vertexBuffer = e.createBuffer(), this.indexBuffer = e.createBuffer(), e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, this.indexBuffer), e.bufferData(e.ELEMENT_ARRAY_BUFFER, this.indices, e.STATIC_DRAW), e.bindBuffer(e.ARRAY_BUFFER, this.vertexBuffer), e.bufferData(e.ARRAY_BUFFER, this.vertices, e.DYNAMIC_DRAW), this.currentBlendMode = 99999;
            var t = new z.PixiShader(e);
            t.fragmentSrc = this.defaultShader.fragmentSrc, t.uniforms = {}, t.init(), this.defaultShader.shaders[e.id] = t
        }, z.WebGLSpriteBatch.prototype.begin = function(e) {
            this.renderSession = e, this.shader = this.renderSession.shaderManager.defaultShader, this.start()
        }, z.WebGLSpriteBatch.prototype.end = function() {
            this.flush()
        }, z.WebGLSpriteBatch.prototype.render = function(e) {
            var t = e.texture;
            this.currentBatchSize >= this.size && (this.flush(), this.currentBaseTexture = t.baseTexture);
            t.ratio;
            var i = t._uvs;
            if (i) {
                var n, r, o, a, s = e.anchor.x,
                    l = e.anchor.y;
                if (t.trim) {
                    var h = t.trim;
                    n = (r = h.x - s * h.width) + t.crop.width, o = (a = h.y - l * h.height) + t.crop.height
                } else n = t.frame.width * (1 - s), r = t.frame.width * -s, o = t.frame.height * (1 - l), a = t.frame.height * -l;
                var d = 4 * this.currentBatchSize * this.vertSize,
                    c = e.worldTransform,
                    u = c.a,
                    f = c.b,
                    p = c.c,
                    g = c.d,
                    v = c.tx,
                    m = c.ty,
                    w = this.colors,
                    y = this.positions;
                if (e.bitmapPolygon) {
                    var S = e.bitmapPolygonCords;
                    y[d] = S[0] + v | 0, y[d + 1] = S[1] + m | 0, y[d + 5] = S[2] + v | 0, y[d + 6] = S[3] + m | 0, y[d + 10] = S[4] + v | 0, y[d + 11] = S[5] + m | 0, y[d + 15] = S[6] + v | 0, y[d + 16] = S[7] + m | 0
                } else t.floorCoordinates ? (y[d] = u * r + p * a + v | 0, y[d + 1] = g * a + f * r + m | 0, y[d + 5] = u * n + p * a + v | 0, y[d + 6] = g * a + f * n + m | 0, y[d + 10] = u * n + p * o + v | 0, y[d + 11] = g * o + f * n + m | 0, y[d + 15] = u * r + p * o + v | 0, y[d + 16] = g * o + f * r + m | 0) : (y[d] = u * r + p * a + v, y[d + 1] = g * a + f * r + m, y[d + 5] = u * n + p * a + v, y[d + 6] = g * a + f * n + m, y[d + 10] = u * n + p * o + v, y[d + 11] = g * o + f * n + m, y[d + 15] = u * r + p * o + v, y[d + 16] = g * o + f * r + m);
                y[d + 2] = i.x0, y[d + 3] = i.y0, y[d + 7] = i.x1, y[d + 8] = i.y1, y[d + 12] = i.x2, y[d + 13] = i.y2, y[d + 17] = i.x3, y[d + 18] = i.y3;
                var b = e.tint;
                w[d + 4] = w[d + 9] = w[d + 14] = w[d + 19] = (b >> 16) + (65280 & b) + ((255 & b) << 16) + (255 * e.worldAlpha << 24), this.sprites[this.currentBatchSize++] = e
            }
        }, z.WebGLSpriteBatch.prototype.renderTilingSprite = function(e) {
            var t = e.tilingTexture;
            this.currentBatchSize >= this.size && (this.flush(), this.currentBaseTexture = t.baseTexture), e._uvs || (e._uvs = new z.TextureUvs);
            var i = e._uvs;
            e.tilePosition.x %= t.baseTexture.width * e.tileScaleOffset.x, e.tilePosition.y %= t.baseTexture.height * e.tileScaleOffset.y;
            var n = e.tilePosition.x / (t.baseTexture.width * e.tileScaleOffset.x),
                r = e.tilePosition.y / (t.baseTexture.height * e.tileScaleOffset.y),
                o = e.width / t.baseTexture.width / (e.tileScale.x * e.tileScaleOffset.x),
                a = e.height / t.baseTexture.height / (e.tileScale.y * e.tileScaleOffset.y);
            i.x0 = 0 - n, i.y0 = 0 - r, i.x1 = 1 * o - n, i.y1 = 0 - r, i.x2 = 1 * o - n, i.y2 = 1 * a - r, i.x3 = 0 - n, i.y3 = 1 * a - r;
            var s = e.tint,
                l = (s >> 16) + (65280 & s) + ((255 & s) << 16) + (255 * e.alpha << 24),
                h = this.positions,
                d = this.colors,
                c = e.width,
                u = e.height,
                f = e.anchor.x,
                p = e.anchor.y,
                g = c * (1 - f),
                v = c * -f,
                m = u * (1 - p),
                w = u * -p,
                y = 4 * this.currentBatchSize * this.vertSize,
                S = e.worldTransform,
                b = S.a,
                _ = S.b,
                x = S.c,
                T = S.d,
                C = S.tx,
                M = S.ty;
            h[y++] = b * v + x * w + C, h[y++] = T * w + _ * v + M, h[y++] = i.x0, h[y++] = i.y0, d[y++] = l, h[y++] = b * g + x * w + C, h[y++] = T * w + _ * g + M, h[y++] = i.x1, h[y++] = i.y1, d[y++] = l, h[y++] = b * g + x * m + C, h[y++] = T * m + _ * g + M, h[y++] = i.x2, h[y++] = i.y2, d[y++] = l, h[y++] = b * v + x * m + C, h[y++] = T * m + _ * v + M, h[y++] = i.x3, h[y++] = i.y3, d[y++] = l, this.sprites[this.currentBatchSize++] = e
        }, z.WebGLSpriteBatch.prototype.flush = function() {
            if (0 !== this.currentBatchSize) {
                var e, t, i, n, r = this.gl;
                if (this.dirty) {
                    this.dirty = !1, r.activeTexture(r.TEXTURE0), r.bindBuffer(r.ARRAY_BUFFER, this.vertexBuffer), r.bindBuffer(r.ELEMENT_ARRAY_BUFFER, this.indexBuffer), e = this.defaultShader.shaders[r.id];
                    var o = 4 * this.vertSize;
                    r.vertexAttribPointer(e.aVertexPosition, 2, r.FLOAT, !1, o, 0), r.vertexAttribPointer(e.aTextureCoord, 2, r.FLOAT, !1, o, 8), r.vertexAttribPointer(e.colorAttribute, 4, r.UNSIGNED_BYTE, !0, o, 16)
                }
                if (this.currentBatchSize > .5 * this.size) r.bufferSubData(r.ARRAY_BUFFER, 0, this.vertices);
                else {
                    var a = this.positions.subarray(0, 4 * this.currentBatchSize * this.vertSize);
                    r.bufferSubData(r.ARRAY_BUFFER, 0, a)
                }
                for (var s, l = 0, h = 0, d = null, c = this.renderSession.blendModeManager.currentBlendMode, u = null, f = !1, p = !1, g = 0, v = this.currentBatchSize; g < v; g++) {
                    if (t = (s = this.sprites[g]).texture.baseTexture, f = c !== (i = s.blendMode), p = u !== (n = s.shader || this.defaultShader), (d !== t || f || p) && (this.renderBatch(d, l, h), h = g, l = 0, d = t, f && (c = i, this.renderSession.blendModeManager.setBlendMode(c)), p)) {
                        (e = (u = n).shaders[r.id]) || ((e = new z.PixiShader(r)).fragmentSrc = u.fragmentSrc, e.uniforms = u.uniforms, e.init(), u.shaders[r.id] = e), this.renderSession.shaderManager.setShader(e), e.dirty && e.syncUniforms();
                        var m = this.renderSession.projection;
                        r.uniform2f(e.projectionVector, m.x, m.y);
                        var w = this.renderSession.offset;
                        r.uniform2f(e.offsetVector, w.x, w.y)
                    }
                    l++
                }
                this.renderBatch(d, l, h), this.currentBatchSize = 0
            }
        }, z.WebGLSpriteBatch.prototype.renderBatch = function(e, t, i) {
            if (0 !== t) {
                var n = this.gl;
                e._dirty[n.id] ? this.renderSession.renderer.updateTexture(e) : n.bindTexture(n.TEXTURE_2D, e._glTextures[n.id]), n.drawElements(n.TRIANGLES, 6 * t, n.UNSIGNED_SHORT, 6 * i * 2), this.renderSession.drawCount++
            }
        }, z.WebGLSpriteBatch.prototype.stop = function() {
            this.flush(), this.dirty = !0
        }, z.WebGLSpriteBatch.prototype.start = function() {
            this.dirty = !0
        }, z.WebGLSpriteBatch.prototype.destroy = function() {
            this.vertices = null, this.indices = null, this.gl.deleteBuffer(this.vertexBuffer), this.gl.deleteBuffer(this.indexBuffer), this.currentBaseTexture = null, this.gl = null
        }, z.WebGLFastSpriteBatch = function(e) {
            this.vertSize = 10, this.maxSize = 6e3, this.size = this.maxSize;
            var t = 4 * this.size * this.vertSize,
                i = 6 * this.maxSize;
            this.vertices = new z.Float32Array(t), this.indices = new z.Uint16Array(i), this.vertexBuffer = null, this.indexBuffer = null;
            for (var n = this.lastIndexCount = 0, r = 0; n < i; n += 6, r += 4) this.indices[n + 0] = r + 0, this.indices[n + 1] = r + 1, this.indices[n + 2] = r + 2, this.indices[n + 3] = r + 0, this.indices[n + 4] = r + 2, this.indices[n + 5] = r + 3;
            this.drawing = !1, this.currentBatchSize = 0, this.currentBaseTexture = null, this.currentBlendMode = 0, this.renderSession = null, this.shader = null, this.matrix = null, this.setContext(e)
        }, z.WebGLFastSpriteBatch.prototype.constructor = z.WebGLFastSpriteBatch, z.WebGLFastSpriteBatch.prototype.setContext = function(e) {
            this.gl = e, this.vertexBuffer = e.createBuffer(), this.indexBuffer = e.createBuffer(), e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, this.indexBuffer), e.bufferData(e.ELEMENT_ARRAY_BUFFER, this.indices, e.STATIC_DRAW), e.bindBuffer(e.ARRAY_BUFFER, this.vertexBuffer), e.bufferData(e.ARRAY_BUFFER, this.vertices, e.DYNAMIC_DRAW)
        }, z.WebGLFastSpriteBatch.prototype.begin = function(e, t) {
            this.renderSession = t, this.shader = this.renderSession.shaderManager.fastShader, this.matrix = e.worldTransform.toArray(!0), this.start()
        }, z.WebGLFastSpriteBatch.prototype.end = function() {
            this.flush()
        }, z.WebGLFastSpriteBatch.prototype.render = function(e) {
            var t = e.children,
                i = t[0];
            if (i.texture._uvs) {
                this.currentBaseTexture = i.texture.baseTexture, i.blendMode !== this.renderSession.blendModeManager.currentBlendMode && (this.flush(), this.renderSession.blendModeManager.setBlendMode(i.blendMode));
                for (var n = 0, r = t.length; n < r; n++) this.renderSprite(t[n]);
                this.flush()
            }
        }, z.WebGLFastSpriteBatch.prototype.renderSprite = function(e) {
            if (e.visible && (e.texture.baseTexture === this.currentBaseTexture || (this.flush(), this.currentBaseTexture = e.texture.baseTexture, e.texture._uvs))) {
                var t, i, n, r, o, a, s = this.vertices;
                if (t = e.texture._uvs, e.texture.frame.width, e.texture.frame.height, e.texture.trim) {
                    var l = e.texture.trim;
                    i = (n = l.x - e.anchor.x * l.width) + e.texture.crop.width, r = (o = l.y - e.anchor.y * l.height) + e.texture.crop.height
                } else i = e.texture.frame.width * (1 - e.anchor.x), n = e.texture.frame.width * -e.anchor.x, r = e.texture.frame.height * (1 - e.anchor.y), o = e.texture.frame.height * -e.anchor.y;
                a = 4 * this.currentBatchSize * this.vertSize, s[a++] = n, s[a++] = o, s[a++] = e.position.x, s[a++] = e.position.y, s[a++] = e.scale.x, s[a++] = e.scale.y, s[a++] = e.rotation, s[a++] = t.x0, s[a++] = t.y1, s[a++] = e.alpha, s[a++] = i, s[a++] = o, s[a++] = e.position.x, s[a++] = e.position.y, s[a++] = e.scale.x, s[a++] = e.scale.y, s[a++] = e.rotation, s[a++] = t.x1, s[a++] = t.y1, s[a++] = e.alpha, s[a++] = i, s[a++] = r, s[a++] = e.position.x, s[a++] = e.position.y, s[a++] = e.scale.x, s[a++] = e.scale.y, s[a++] = e.rotation, s[a++] = t.x2, s[a++] = t.y2, s[a++] = e.alpha, s[a++] = n, s[a++] = r, s[a++] = e.position.x, s[a++] = e.position.y, s[a++] = e.scale.x, s[a++] = e.scale.y, s[a++] = e.rotation, s[a++] = t.x3, s[a++] = t.y3, s[a++] = e.alpha, this.currentBatchSize++, this.currentBatchSize >= this.size && this.flush()
            }
        }, z.WebGLFastSpriteBatch.prototype.flush = function() {
            if (0 !== this.currentBatchSize) {
                var e = this.gl;
                if (this.currentBaseTexture._glTextures[e.id] || this.renderSession.renderer.updateTexture(this.currentBaseTexture, e), e.bindTexture(e.TEXTURE_2D, this.currentBaseTexture._glTextures[e.id]), this.currentBatchSize > .5 * this.size) e.bufferSubData(e.ARRAY_BUFFER, 0, this.vertices);
                else {
                    var t = this.vertices.subarray(0, 4 * this.currentBatchSize * this.vertSize);
                    e.bufferSubData(e.ARRAY_BUFFER, 0, t)
                }
                e.drawElements(e.TRIANGLES, 6 * this.currentBatchSize, e.UNSIGNED_SHORT, 0), this.currentBatchSize = 0, this.renderSession.drawCount++
            }
        }, z.WebGLFastSpriteBatch.prototype.stop = function() {
            this.flush()
        }, z.WebGLFastSpriteBatch.prototype.start = function() {
            var e = this.gl;
            e.activeTexture(e.TEXTURE0), e.bindBuffer(e.ARRAY_BUFFER, this.vertexBuffer), e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
            var t = this.renderSession.projection;
            e.uniform2f(this.shader.projectionVector, t.x, t.y), e.uniformMatrix3fv(this.shader.uMatrix, !1, this.matrix);
            var i = 4 * this.vertSize;
            e.vertexAttribPointer(this.shader.aVertexPosition, 2, e.FLOAT, !1, i, 0), e.vertexAttribPointer(this.shader.aPositionCoord, 2, e.FLOAT, !1, i, 8), e.vertexAttribPointer(this.shader.aScale, 2, e.FLOAT, !1, i, 16), e.vertexAttribPointer(this.shader.aRotation, 1, e.FLOAT, !1, i, 24), e.vertexAttribPointer(this.shader.aTextureCoord, 2, e.FLOAT, !1, i, 28), e.vertexAttribPointer(this.shader.colorAttribute, 1, e.FLOAT, !1, i, 36)
        }, z.WebGLFilterManager = function() {
            this.filterStack = [], this.offsetX = 0, this.offsetY = 0
        }, z.WebGLFilterManager.prototype.constructor = z.WebGLFilterManager, z.WebGLFilterManager.prototype.setContext = function(e) {
            this.gl = e, this.texturePool = [], this.initShaderBuffers()
        }, z.WebGLFilterManager.prototype.begin = function(e, t) {
            this.renderSession = e, this.defaultShader = e.shaderManager.defaultShader;
            var i = this.renderSession.projection;
            this.width = 2 * i.x, this.height = 2 * -i.y, this.buffer = t
        }, z.WebGLFilterManager.prototype.pushFilter = function(e) {
            var t = this.gl,
                i = this.renderSession.projection,
                n = this.renderSession.offset;
            e._filterArea = e.target.filterArea || e.target.getBounds(), this.filterStack.push(e);
            var r = e.filterPasses[0];
            this.offsetX += e._filterArea.x, this.offsetY += e._filterArea.y;
            var o = this.texturePool.pop();
            o ? o.resize(this.width, this.height) : o = new z.FilterTexture(this.gl, this.width, this.height), t.bindTexture(t.TEXTURE_2D, o.texture);
            var a = e._filterArea,
                s = r.padding;
            a.x -= s, a.y -= s, a.width += 2 * s, a.height += 2 * s, a.x < 0 && (a.x = 0), a.width > this.width && (a.width = this.width), a.y < 0 && (a.y = 0), a.height > this.height && (a.height = this.height), t.bindFramebuffer(t.FRAMEBUFFER, o.frameBuffer), t.viewport(0, 0, a.width, a.height), i.x = a.width / 2, i.y = -a.height / 2, n.x = -a.x, n.y = -a.y, t.colorMask(!0, !0, !0, !0), t.clearColor(0, 0, 0, 0), t.clear(t.COLOR_BUFFER_BIT), e._glFilterTexture = o
        }, z.WebGLFilterManager.prototype.popFilter = function() {
            var e = this.gl,
                t = this.filterStack.pop(),
                i = t._filterArea,
                n = t._glFilterTexture,
                r = this.renderSession.projection,
                o = this.renderSession.offset;
            if (1 < t.filterPasses.length) {
                e.viewport(0, 0, i.width, i.height), e.bindBuffer(e.ARRAY_BUFFER, this.vertexBuffer), this.vertexArray[0] = 0, this.vertexArray[1] = i.height, this.vertexArray[2] = i.width, this.vertexArray[3] = i.height, this.vertexArray[4] = 0, this.vertexArray[5] = 0, this.vertexArray[6] = i.width, this.vertexArray[7] = 0, e.bufferSubData(e.ARRAY_BUFFER, 0, this.vertexArray), e.bindBuffer(e.ARRAY_BUFFER, this.uvBuffer), this.uvArray[2] = i.width / this.width, this.uvArray[5] = i.height / this.height, this.uvArray[6] = i.width / this.width, this.uvArray[7] = i.height / this.height, e.bufferSubData(e.ARRAY_BUFFER, 0, this.uvArray);
                var a = n,
                    s = this.texturePool.pop();
                s || (s = new z.FilterTexture(this.gl, this.width, this.height)), s.resize(this.width, this.height), e.bindFramebuffer(e.FRAMEBUFFER, s.frameBuffer), e.clear(e.COLOR_BUFFER_BIT), e.disable(e.BLEND);
                for (var l = 0; l < t.filterPasses.length - 1; l++) {
                    var h = t.filterPasses[l];
                    e.bindFramebuffer(e.FRAMEBUFFER, s.frameBuffer), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, a.texture), this.applyFilterPass(h, i, i.width, i.height);
                    var d = a;
                    a = s, s = d
                }
                e.enable(e.BLEND), n = a, this.texturePool.push(s)
            }
            var c = t.filterPasses[t.filterPasses.length - 1];
            this.offsetX -= i.x, this.offsetY -= i.y;
            var u = this.width,
                f = this.height,
                p = 0,
                g = 0,
                v = this.buffer;
            if (0 === this.filterStack.length) e.colorMask(!0, !0, !0, !0);
            else {
                var m = this.filterStack[this.filterStack.length - 1];
                u = (i = m._filterArea).width, f = i.height, p = i.x, g = i.y, v = m._glFilterTexture.frameBuffer
            }
            r.x = u / 2, r.y = -f / 2, o.x = p, o.y = g;
            var w = (i = t._filterArea).x - p,
                y = i.y - g;
            e.bindBuffer(e.ARRAY_BUFFER, this.vertexBuffer), this.vertexArray[0] = w, this.vertexArray[1] = y + i.height, this.vertexArray[2] = w + i.width, this.vertexArray[3] = y + i.height, this.vertexArray[4] = w, this.vertexArray[5] = y, this.vertexArray[6] = w + i.width, this.vertexArray[7] = y, e.bufferSubData(e.ARRAY_BUFFER, 0, this.vertexArray), e.bindBuffer(e.ARRAY_BUFFER, this.uvBuffer), this.uvArray[2] = i.width / this.width, this.uvArray[5] = i.height / this.height, this.uvArray[6] = i.width / this.width, this.uvArray[7] = i.height / this.height, e.bufferSubData(e.ARRAY_BUFFER, 0, this.uvArray), e.viewport(0, 0, u, f), e.bindFramebuffer(e.FRAMEBUFFER, v), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, n.texture), this.applyFilterPass(c, i, u, f), this.texturePool.push(n), t._glFilterTexture = null
        }, z.WebGLFilterManager.prototype.applyFilterPass = function(e, t, i, n) {
            var r = this.gl,
                o = e.shaders[r.id];
            o || ((o = new z.PixiShader(r)).fragmentSrc = e.fragmentSrc, o.uniforms = e.uniforms, o.init(), e.shaders[r.id] = o), this.renderSession.shaderManager.setShader(o), r.uniform2f(o.projectionVector, i / 2, -n / 2), r.uniform2f(o.offsetVector, 0, 0), e.uniforms.dimensions && (e.uniforms.dimensions.value[0] = this.width, e.uniforms.dimensions.value[1] = this.height, e.uniforms.dimensions.value[2] = this.vertexArray[0], e.uniforms.dimensions.value[3] = this.vertexArray[5]), o.syncUniforms(), r.bindBuffer(r.ARRAY_BUFFER, this.vertexBuffer), r.vertexAttribPointer(o.aVertexPosition, 2, r.FLOAT, !1, 0, 0), r.bindBuffer(r.ARRAY_BUFFER, this.uvBuffer), r.vertexAttribPointer(o.aTextureCoord, 2, r.FLOAT, !1, 0, 0), r.bindBuffer(r.ARRAY_BUFFER, this.colorBuffer), r.vertexAttribPointer(o.colorAttribute, 2, r.FLOAT, !1, 0, 0), r.bindBuffer(r.ELEMENT_ARRAY_BUFFER, this.indexBuffer), r.drawElements(r.TRIANGLES, 6, r.UNSIGNED_SHORT, 0), this.renderSession.drawCount++
        }, z.WebGLFilterManager.prototype.initShaderBuffers = function() {
            var e = this.gl;
            this.vertexBuffer = e.createBuffer(), this.uvBuffer = e.createBuffer(), this.colorBuffer = e.createBuffer(), this.indexBuffer = e.createBuffer(), this.vertexArray = new z.Float32Array([0, 0, 1, 0, 0, 1, 1, 1]), e.bindBuffer(e.ARRAY_BUFFER, this.vertexBuffer), e.bufferData(e.ARRAY_BUFFER, this.vertexArray, e.STATIC_DRAW), this.uvArray = new z.Float32Array([0, 0, 1, 0, 0, 1, 1, 1]), e.bindBuffer(e.ARRAY_BUFFER, this.uvBuffer), e.bufferData(e.ARRAY_BUFFER, this.uvArray, e.STATIC_DRAW), this.colorArray = new z.Float32Array([1, 16777215, 1, 16777215, 1, 16777215, 1, 16777215]), e.bindBuffer(e.ARRAY_BUFFER, this.colorBuffer), e.bufferData(e.ARRAY_BUFFER, this.colorArray, e.STATIC_DRAW), e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, this.indexBuffer), e.bufferData(e.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 1, 3, 2]), e.STATIC_DRAW)
        }, z.WebGLFilterManager.prototype.destroy = function() {
            var e = this.gl;
            this.filterStack = null, this.offsetX = 0;
            for (var t = this.offsetY = 0; t < this.texturePool.length; t++) this.texturePool[t].destroy();
            this.texturePool = null, e.deleteBuffer(this.vertexBuffer), e.deleteBuffer(this.uvBuffer), e.deleteBuffer(this.colorBuffer), e.deleteBuffer(this.indexBuffer)
        }, z.FilterTexture = function(e, t, i, n) {
            this.gl = e, this.frameBuffer = e.createFramebuffer(), this.texture = e.createTexture(), n = n || z.scaleModes.DEFAULT, e.bindTexture(e.TEXTURE_2D, this.texture), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, n === z.scaleModes.LINEAR ? e.LINEAR : e.NEAREST), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, n === z.scaleModes.LINEAR ? e.LINEAR : e.NEAREST), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), e.bindFramebuffer(e.FRAMEBUFFER, this.frameBuffer), e.bindFramebuffer(e.FRAMEBUFFER, this.frameBuffer), e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, this.texture, 0), this.renderBuffer = e.createRenderbuffer(), e.bindRenderbuffer(e.RENDERBUFFER, this.renderBuffer), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.DEPTH_STENCIL_ATTACHMENT, e.RENDERBUFFER, this.renderBuffer), this.resize(t, i)
        }, z.FilterTexture.prototype.constructor = z.FilterTexture, z.FilterTexture.prototype.clear = function() {
            var e = this.gl;
            e.clearColor(0, 0, 0, 0), e.clear(e.COLOR_BUFFER_BIT)
        }, z.FilterTexture.prototype.resize = function(e, t) {
            if (this.width !== e || this.height !== t) {
                try {
                    void 0 !== this._lastSize && (z.frvrTextureMemoryUsage -= 4 * this._lastSize.w * this._lastSize.h)
                } catch (e) {}
                this.width = e, this.height = t;
                var i = this.gl;
                i.bindTexture(i.TEXTURE_2D, this.texture), i.texImage2D(i.TEXTURE_2D, 0, i.RGBA, e, t, 0, i.RGBA, i.UNSIGNED_BYTE, null);
                try {
                    z.frvrTextureMemoryUsage += 4 * e * t, this._lastSize = {
                        w: e,
                        h: t
                    }
                } catch (e) {}
                i.bindRenderbuffer(i.RENDERBUFFER, this.renderBuffer), i.renderbufferStorage(i.RENDERBUFFER, i.DEPTH_STENCIL, e, t)
            }
        }, z.FilterTexture.prototype.destroy = function() {
            var e = this.gl;
            e.deleteFramebuffer(this.frameBuffer), e.deleteTexture(this.texture), this.frameBuffer = null, this.texture = null
        }, z.CanvasBuffer = function(e, t) {
            this.width = e, this.height = t, this.canvas = document.createElement("canvas"), this.context = this.canvas.getContext("2d"), this.canvas.width = e, this.canvas.height = t
        }, z.CanvasBuffer.prototype.constructor = z.CanvasBuffer, z.CanvasBuffer.prototype.clear = function() {
            this.context.setTransform(1, 0, 0, 1, 0, 0), this.context.clearRect(0, 0, this.width, this.height)
        }, z.CanvasBuffer.prototype.resize = function(e, t) {
            this.width = this.canvas.width = e, this.height = this.canvas.height = t
        }, z.CanvasMaskManager = function() {}, z.CanvasMaskManager.prototype.constructor = z.CanvasMaskManager, z.CanvasMaskManager.prototype.pushMask = function(e, t) {
            var i = t.context;
            i.save();
            var n = e.alpha,
                r = e.worldTransform;
            i.setTransform(r.a, r.b, r.c, r.d, r.tx, r.ty), z.CanvasGraphics.renderGraphicsMask(e, i), i.clip(), e.worldAlpha = n
        }, z.CanvasMaskManager.prototype.popMask = function(e) {
            e.context.restore()
        }, z.CanvasTinter = function() {}, z.CanvasTinter.getTintedTexture = function(e, t) {
            var i = e.texture,
                n = "#" + ("00000" + (0 | (t = z.CanvasTinter.roundColor(t))).toString(16)).substr(-6);
            if (i.tintCache = i.tintCache || {}, i.tintCache[n]) return i.tintCache[n];
            var r = z.CanvasTinter.canvas || document.createElement("canvas");
            if (z.CanvasTinter.tintMethod(i, t, r), z.CanvasTinter.convertTintToImage) {
                var o = new Image;
                o.src = r.toDataURL(), i.tintCache[n] = o
            } else i.tintCache[n] = r, z.CanvasTinter.canvas = null;
            return r
        }, z.CanvasTinter.tintWithPerPixelInner = function(e, t, i, n) {
            var r = t.getContext("2d");
            t.width = n.width, t.height = n.height, r.clearRect(0, 0, t.width, t.height), r.globalCompositeOperation = "copy", r.drawImage(e, n.x, n.y, n.width, n.height, 0, 0, n.width, n.height);
            for (var o = z.hex2rgb(i), a = o[0], s = o[1], l = o[2], h = r.getImageData(0, 0, n.width, n.height), d = h.data, c = 0; c < d.length; c += 4) d[c + 0] = d[c + 0] * a >> 0, d[c + 1] = d[c + 1] * s >> 0, d[c + 2] = d[c + 2] * l >> 0;
            r.putImageData(h, 0, 0)
        }, z.CanvasTinter.tintWithPerPixel = function(e, t, i) {
            z.CanvasTinter.tintWithPerPixelInner(e.baseTexture.source, i, t, e.crop)
        }, z.CanvasTinter.roundColor = function(e) {
            var t = z.CanvasTinter.cacheStepsPerColorChannel,
                i = z.hex2rgb(e);
            return i[0] = Math.min(255, i[0] / t * t), i[1] = Math.min(255, i[1] / t * t), i[2] = Math.min(255, i[2] / t * t), z.rgb2hex(i)
        }, z.CanvasTinter.cacheStepsPerColorChannel = 8, z.CanvasTinter.convertTintToImage = !1, z.CanvasTinter.canUseMultiply = z.canUseNewCanvasBlendModes(), z.CanvasTinter.tintMethod = z.CanvasTinter.tintWithPerPixel, z.CanvasRenderer = function(e, t, i) {
            if (i)
                for (var n in z.defaultRenderOptions) void 0 === i[n] && (i[n] = z.defaultRenderOptions[n]);
            else i = z.defaultRenderOptions;
            z.defaultRenderer || (z.defaultRenderer = this), this.type = z.CANVAS_RENDERER, this.clearBeforeRender = i.clearBeforeRender, this.transparent = i.transparent, this.autoResize = i.autoResize || !1, this.width = e || 800, this.height = t || 600, this.view = i.view || document.createElement("canvas"), this.context = this.view.getContext("2d", {
                alpha: this.transparent
            }), this.refresh = !0, this.count = 0, this.maskManager = new z.CanvasMaskManager, this.renderSession = {
                context: this.context,
                maskManager: this.maskManager,
                scaleMode: null,
                smoothProperty: null
            }, this.mapBlendModes(), this.resize(e, t), "imageSmoothingEnabled" in this.context ? this.renderSession.smoothProperty = "imageSmoothingEnabled" : "webkitImageSmoothingEnabled" in this.context ? this.renderSession.smoothProperty = "webkitImageSmoothingEnabled" : "mozImageSmoothingEnabled" in this.context ? this.renderSession.smoothProperty = "mozImageSmoothingEnabled" : "oImageSmoothingEnabled" in this.context ? this.renderSession.smoothProperty = "oImageSmoothingEnabled" : "msImageSmoothingEnabled" in this.context && (this.renderSession.smoothProperty = "msImageSmoothingEnabled")
        }, z.CanvasRenderer.prototype.constructor = z.CanvasRenderer, z.CanvasRenderer.prototype.render = function(e) {
            e.updateTransform(), this.context.setTransform(1, 0, 0, 1, 0, 0), this.context.globalAlpha = 1, this.renderSession.currentBlendMode = z.blendModes.NORMAL, this.context.globalCompositeOperation = z.blendModesCanvas[z.blendModes.NORMAL], this.renderDisplayObject(e), e.interactive && (e._interactiveEventsAdded || (e._interactiveEventsAdded = !0, e.interactionManager.setTarget(this)))
        }, z.CanvasRenderer.prototype.destroy = function(e) {
            void 0 === e && (e = !0), e && this.view.parent && this.view.parent.removeChild(this.view), this.view = null, this.context = null, this.maskManager = null, this.renderSession = null
        }, z.CanvasRenderer.prototype.resize = function(e, t) {
            this.width = e, this.height = t, this.view.width = this.width, this.view.height = this.height
        }, z.CanvasRenderer.prototype.renderDisplayObject = function(e, t) {
            this.renderSession.context = t || this.context, e._renderCanvas(this.renderSession)
        }, z.CanvasRenderer.prototype.mapBlendModes = function() {
            z.blendModesCanvas || (z.blendModesCanvas = [], z.canUseNewCanvasBlendModes() ? (z.blendModesCanvas[z.blendModes.NORMAL] = "source-over", z.blendModesCanvas[z.blendModes.ADD] = "lighter", z.blendModesCanvas[z.blendModes.MULTIPLY] = "multiply", z.blendModesCanvas[z.blendModes.SCREEN] = "screen") : (z.blendModesCanvas[z.blendModes.NORMAL] = "source-over", z.blendModesCanvas[z.blendModes.ADD] = "lighter", z.blendModesCanvas[z.blendModes.MULTIPLY] = "source-over", z.blendModesCanvas[z.blendModes.SCREEN] = "source-over"))
        }, z.CanvasGraphics = function() {}, z.CanvasGraphics.renderGraphics = function(e, t) {
            var i = e.worldAlpha;
            e.dirty && (this.updateGraphicsTint(e), e.dirty = !1);
            for (var n = 0; n < e.graphicsData.length; n++) {
                var r = e.graphicsData[n],
                    o = r.shape,
                    a = r._fillTint,
                    s = r._lineTint;
                if (t.lineWidth = r.lineWidth, r.type === z.Graphics.POLY) {
                    t.beginPath();
                    var l = o.points;
                    t.moveTo(l[0], l[1]);
                    for (var h = 1; h < l.length / 2; h++) t.lineTo(l[2 * h], l[2 * h + 1]);
                    o.closed && t.lineTo(l[0], l[1]), l[0] === l[l.length - 2] && l[1] === l[l.length - 1] && t.closePath(), r.fill && (t.globalAlpha = r.fillAlpha * i, t.fillStyle = "#" + ("00000" + (0 | a).toString(16)).substr(-6), t.fill()), r.lineWidth && (t.globalAlpha = r.lineAlpha * i, t.strokeStyle = "#" + ("00000" + (0 | s).toString(16)).substr(-6), t.stroke())
                } else if (r.type === z.Graphics.RECT)(r.fillColor || 0 === r.fillColor) && (t.globalAlpha = r.fillAlpha * i, t.fillStyle = "#" + ("00000" + (0 | a).toString(16)).substr(-6), t.fillRect(o.x, o.y, o.width, o.height)), r.lineWidth && (t.globalAlpha = r.lineAlpha * i, t.strokeStyle = "#" + ("00000" + (0 | s).toString(16)).substr(-6), t.strokeRect(o.x, o.y, o.width, o.height));
                else if (r.type === z.Graphics.CIRC) t.beginPath(), t.arc(o.x, o.y, o.radius, 0, 2 * Math.PI), t.closePath(), r.fill && (t.globalAlpha = r.fillAlpha * i, t.fillStyle = "#" + ("00000" + (0 | a).toString(16)).substr(-6), t.fill()), r.lineWidth && (t.globalAlpha = r.lineAlpha * i, t.strokeStyle = "#" + ("00000" + (0 | s).toString(16)).substr(-6), t.stroke());
                else if (r.type === z.Graphics.ELIP) {
                    var d = 2 * o.width,
                        c = 2 * o.height,
                        u = o.x - d / 2,
                        f = o.y - c / 2;
                    t.beginPath();
                    var p = d / 2 * .5522848,
                        g = c / 2 * .5522848,
                        v = u + d,
                        m = f + c,
                        w = u + d / 2,
                        y = f + c / 2;
                    t.moveTo(u, y), t.bezierCurveTo(u, y - g, w - p, f, w, f), t.bezierCurveTo(w + p, f, v, y - g, v, y), t.bezierCurveTo(v, y + g, w + p, m, w, m), t.bezierCurveTo(w - p, m, u, y + g, u, y), t.closePath(), r.fill && (t.globalAlpha = r.fillAlpha * i, t.fillStyle = "#" + ("00000" + (0 | a).toString(16)).substr(-6), t.fill()), r.lineWidth && (t.globalAlpha = r.lineAlpha * i, t.strokeStyle = "#" + ("00000" + (0 | s).toString(16)).substr(-6), t.stroke())
                } else if (r.type === z.Graphics.RREC) {
                    var S = o.x,
                        b = o.y,
                        _ = o.width,
                        x = o.height,
                        T = o.radius,
                        C = Math.min(_, x) / 2 | 0;
                    T = C < T ? C : T, t.beginPath(), t.moveTo(S, b + T), t.lineTo(S, b + x - T), t.quadraticCurveTo(S, b + x, S + T, b + x), t.lineTo(S + _ - T, b + x), t.quadraticCurveTo(S + _, b + x, S + _, b + x - T), t.lineTo(S + _, b + T), t.quadraticCurveTo(S + _, b, S + _ - T, b), t.lineTo(S + T, b), t.quadraticCurveTo(S, b, S, b + T), t.closePath(), (r.fillColor || 0 === r.fillColor) && (t.globalAlpha = r.fillAlpha * i, t.fillStyle = "#" + ("00000" + (0 | a).toString(16)).substr(-6), t.fill()), r.lineWidth && (t.globalAlpha = r.lineAlpha * i, t.strokeStyle = "#" + ("00000" + (0 | s).toString(16)).substr(-6), t.stroke())
                }
            }
        }, z.CanvasGraphics.renderGraphicsMask = function(e, t) {
            var i = e.graphicsData.length;
            if (0 !== i) {
                1 < i && (i = 1, window.console.log("Pixi.js warning: masks in canvas can only mask using the first path in the graphics object"));
                for (var n = 0; n < 1; n++) {
                    var r = e.graphicsData[n],
                        o = r.shape;
                    if (r.type === z.Graphics.POLY) {
                        t.beginPath();
                        var a = o.points;
                        t.moveTo(a[0], a[1]);
                        for (var s = 1; s < a.length / 2; s++) t.lineTo(a[2 * s], a[2 * s + 1]);
                        a[0] === a[a.length - 2] && a[1] === a[a.length - 1] && t.closePath()
                    } else if (r.type === z.Graphics.RECT) t.beginPath(), t.rect(o.x, o.y, o.width, o.height), t.closePath();
                    else if (r.type === z.Graphics.CIRC) t.beginPath(), t.arc(o.x, o.y, o.radius, 0, 2 * Math.PI), t.closePath();
                    else if (r.type === z.Graphics.ELIP) {
                        var l = 2 * o.width,
                            h = 2 * o.height,
                            d = o.x - l / 2,
                            c = o.y - h / 2;
                        t.beginPath();
                        var u = l / 2 * .5522848,
                            f = h / 2 * .5522848,
                            p = d + l,
                            g = c + h,
                            v = d + l / 2,
                            m = c + h / 2;
                        t.moveTo(d, m), t.bezierCurveTo(d, m - f, v - u, c, v, c), t.bezierCurveTo(v + u, c, p, m - f, p, m), t.bezierCurveTo(p, m + f, v + u, g, v, g), t.bezierCurveTo(v - u, g, d, m + f, d, m), t.closePath()
                    } else if (r.type === z.Graphics.RREC) {
                        var w, y, S, b, _, x = o.points;
                        _ = x ? (w = x[0], y = x[1], S = x[2], b = x[3], x[4]) : (w = o.x, y = o.y, S = o.width, b = o.height, o.radius);
                        var T = Math.min(S, b) / 2 | 0;
                        _ = T < _ ? T : _, t.beginPath(), t.moveTo(w, y + _), t.lineTo(w, y + b - _), t.quadraticCurveTo(w, y + b, w + _, y + b), t.lineTo(w + S - _, y + b), t.quadraticCurveTo(w + S, y + b, w + S, y + b - _), t.lineTo(w + S, y + _), t.quadraticCurveTo(w + S, y, w + S - _, y), t.lineTo(w + _, y), t.quadraticCurveTo(w, y, w, y + _), t.closePath()
                    }
                }
            }
        }, z.CanvasGraphics.updateGraphicsTint = function(e) {
            if (16777215 !== e.tint)
                for (var t = (e.tint >> 16 & 255) / 255, i = (e.tint >> 8 & 255) / 255, n = (255 & e.tint) / 255, r = 0; r < e.graphicsData.length; r++) {
                    var o = e.graphicsData[r],
                        a = 0 | o.fillColor,
                        s = 0 | o.lineColor;
                    o._fillTint = ((a >> 16 & 255) / 255 * t * 255 << 16) + ((a >> 8 & 255) / 255 * i * 255 << 8) + (255 & a) / 255 * n * 255, o._lineTint = ((s >> 16 & 255) / 255 * t * 255 << 16) + ((s >> 8 & 255) / 255 * i * 255 << 8) + (255 & s) / 255 * n * 255
                }
        }, z.Graphics = function() {
            z.DisplayObjectContainer.call(this), this.renderable = !0, this.fillAlpha = 1, this.lineWidth = 0, this.lineColor = 0, this.graphicsData = [], this.tint = 16777215, this.ondTint = 16777215, this.blendMode = z.blendModes.NORMAL, this.currentPath = null, this._webGL = [], this.isMask = !1, this.boundsPadding = 0, this._localBounds = new z.Rectangle(0, 0, 1, 1), this.dirty = !0, this.webGLDirty = !1, this.cachedSpriteDirty = !1
        }, z.Graphics.prototype = Object.create(z.DisplayObjectContainer.prototype), z.Graphics.prototype.constructor = z.Graphics, z.Graphics.prototype.lineStyle = function(e, t, i) {
            if (this.lineWidth = e || 0, this.lineColor = t || 0, this.lineAlpha = arguments.length < 3 ? 1 : i, this.currentPath) {
                if (this.currentPath.shape.points.length) return this.drawShape(new z.Polygon(this.currentPath.shape.points.slice(-2))), this;
                this.currentPath.lineWidth = this.lineWidth, this.currentPath.lineColor = this.lineColor, this.currentPath.lineAlpha = this.lineAlpha
            }
            return this
        }, z.Graphics.prototype.moveTo = function(e, t) {
            return this.drawShape(new z.Polygon([e, t])), this
        }, z.Graphics.prototype.lineTo = function(e, t) {
            return this.currentPath.shape.points.push(e, t), this.dirty = !0, this
        }, z.Graphics.prototype.quadraticCurveTo = function(e, t, i, n) {
            this.currentPath ? 0 === this.currentPath.shape.points.length && (this.currentPath.shape.points = [0, 0]) : this.moveTo(0, 0);
            var r, o, a = this.currentPath.shape.points;
            0 === a.length && this.moveTo(0, 0);
            for (var s = a[a.length - 2], l = a[a.length - 1], h = 0, d = 1; d <= 20; d++) r = s + (e - s) * (h = d / 20), o = l + (t - l) * h, a.push(r + (e + (i - e) * h - r) * h, o + (t + (n - t) * h - o) * h);
            return this.dirty = !0, this
        }, z.Graphics.prototype.bezierCurveTo = function(e, t, i, n, r, o) {
            this.currentPath ? 0 === this.currentPath.shape.points.length && (this.currentPath.shape.points = [0, 0]) : this.moveTo(0, 0);
            for (var a, s, l, h, d, c = this.currentPath.shape.points, u = c[c.length - 2], f = c[c.length - 1], p = 0, g = 1; g <= 20; g++) l = (s = (a = 1 - (p = g / 20)) * a) * a, d = (h = p * p) * p, c.push(l * u + 3 * s * p * e + 3 * a * h * i + d * r, l * f + 3 * s * p * t + 3 * a * h * n + d * o);
            return this.dirty = !0, this
        }, z.Graphics.prototype.arcTo = function(e, t, i, n, r) {
            this.currentPath ? 0 === this.currentPath.shape.points.length && this.currentPath.shape.points.push(e, t) : this.moveTo(e, t);
            var o = this.currentPath.shape.points,
                a = o[o.length - 2],
                s = o[o.length - 1] - t,
                l = a - e,
                h = n - t,
                d = i - e,
                c = Math.abs(s * d - l * h);
            if (c < 1e-8 || 0 === r) o[o.length - 2] === e && o[o.length - 1] === t || o.push(e, t);
            else {
                var u = s * s + l * l,
                    f = h * h + d * d,
                    p = s * h + l * d,
                    g = r * Math.sqrt(u) / c,
                    v = r * Math.sqrt(f) / c,
                    m = g * p / u,
                    w = v * p / f,
                    y = g * d + v * l,
                    S = g * h + v * s,
                    b = l * (v + m),
                    _ = s * (v + m),
                    x = d * (g + w),
                    T = h * (g + w),
                    C = Math.atan2(_ - S, b - y),
                    M = Math.atan2(T - S, x - y);
                this.arc(y + e, S + t, r, C, M, d * s < l * h)
            }
            return this.dirty = !0, this
        }, z.Graphics.prototype.arc = function(e, t, i, n, r, o) {
            var a, s = e + Math.cos(n) * i,
                l = t + Math.sin(n) * i;
            if (this.currentPath ? 0 === (a = this.currentPath.shape.points).length ? a.push(s, l) : a[a.length - 2] === s && a[a.length - 1] === l || a.push(s, l) : (this.moveTo(s, l), a = this.currentPath.shape.points), n === r) return this;
            !o && r <= n ? r += 2 * Math.PI : o && n <= r && (n += 2 * Math.PI);
            var h = o ? -1 * (n - r) : r - n,
                d = Math.abs(h) / (2 * Math.PI) * 40;
            if (0 === h) return this;
            for (var c = h / (2 * d), u = 2 * c, f = Math.cos(c), p = Math.sin(c), g = d - 1, v = g % 1 / g, m = 0; m <= g; m++) {
                var w = c + n + u * (m + v * m),
                    y = Math.cos(w),
                    S = -Math.sin(w);
                a.push((f * y + p * S) * i + e, (f * -S + p * y) * i + t)
            }
            return this.dirty = !0, this
        }, z.Graphics.prototype.beginFill = function(e, t) {
            return this.filling = !0, this.fillColor = e || 0, this.fillAlpha = void 0 === t ? 1 : t, this.currentPath && this.currentPath.shape.points.length <= 2 && (this.currentPath.fill = this.filling, this.currentPath.fillColor = this.fillColor, this.currentPath.fillAlpha = this.fillAlpha), this
        }, z.Graphics.prototype.endFill = function() {
            return this.filling = !1, this.fillColor = null, this.fillAlpha = 1, this
        }, z.Graphics.prototype.drawRect = function(e, t, i, n) {
            return this.drawShape(new z.Rectangle(e, t, i, n)), this
        }, z.Graphics.prototype.drawRoundedRect = function(e, t, i, n, r) {
            return this.drawShape(new z.RoundedRectangle(e, t, i, n, r)), this
        }, z.Graphics.prototype.drawCircle = function(e, t, i) {
            return this.drawShape(new z.Circle(e, t, i)), this
        }, z.Graphics.prototype.drawEllipse = function(e, t, i, n) {
            return this.drawShape(new z.Ellipse(e, t, i, n)), this
        }, z.Graphics.prototype.drawPolygon = function(e) {
            return e instanceof Array || (e = Array.prototype.slice.call(arguments)), this.drawShape(new z.Polygon(e)), this
        }, z.Graphics.prototype.clear = function() {
            return this.lineWidth = 0, this.filling = !1, this.dirty = !0, this.clearDirty = !0, this.graphicsData = [], this
        }, z.Graphics.prototype._renderWebGL = function(e) {
            if (!1 !== this.visible && 0 !== this.alpha && !0 !== this.isMask) {
                if (e.spriteBatch.stop(), e.blendModeManager.setBlendMode(this.blendMode), this._mask && e.maskManager.pushMask(this._mask, e), this._filters && e.filterManager.pushFilter(this._filterBlock), this.blendMode !== e.spriteBatch.currentBlendMode) {
                    e.spriteBatch.currentBlendMode = this.blendMode;
                    var t = z.blendModesWebGL[e.spriteBatch.currentBlendMode];
                    e.spriteBatch.gl.blendFunc(t[0], t[1])
                }
                if (this.webGLDirty && (this.dirty = !0, this.webGLDirty = !1), z.WebGLGraphics.renderGraphics(this, e), this.children.length) {
                    e.spriteBatch.start();
                    for (var i = 0, n = this.children.length; i < n; i++) this.children[i]._renderWebGL(e);
                    e.spriteBatch.stop()
                }
                this._filters && e.filterManager.popFilter(), this._mask && e.maskManager.popMask(this.mask, e), e.drawCount++, e.spriteBatch.start()
            }
        }, z.Graphics.prototype._renderCanvas = function(e) {
            if (!1 !== this.visible && 0 !== this.alpha && !0 !== this.isMask) {
                var t = e.context,
                    i = this.worldTransform;
                this.blendMode !== e.currentBlendMode && (e.currentBlendMode = this.blendMode, t.globalCompositeOperation = z.blendModesCanvas[e.currentBlendMode]), this._mask && e.maskManager.pushMask(this._mask, e), t.setTransform(i.a, i.b, i.c, i.d, i.tx, i.ty), this.tint != this.oldTint && (this.dirty = !0, this.oldTint = this.tint), z.CanvasGraphics.renderGraphics(this, t);
                for (var n = 0, r = this.children.length; n < r; n++) this.children[n]._renderCanvas(e);
                this._mask && e.maskManager.popMask(e)
            }
        }, z.Graphics.prototype.getBounds = function(e) {
            if (this.isMask) return z.EmptyRectangle;
            this.dirty && (this.updateLocalBounds(), this.webGLDirty = !0, this.cachedSpriteDirty = !0, this.dirty = !1);
            var t = this._localBounds,
                i = t.x,
                n = t.width + t.x,
                r = t.y,
                o = t.height + t.y,
                a = e || this.worldTransform,
                s = a.a,
                l = a.b,
                h = a.c,
                d = a.d,
                c = a.tx,
                u = a.ty,
                f = s * n + h * o + c,
                p = d * o + l * n + u,
                g = s * i + h * o + c,
                v = d * o + l * i + u,
                m = s * i + h * r + c,
                w = d * r + l * i + u,
                y = s * n + h * r + c,
                S = d * r + l * n + u,
                b = f,
                _ = p,
                x = f,
                T = p;
            return x = y < (x = m < (x = g < x ? g : x) ? m : x) ? y : x, T = S < (T = w < (T = v < T ? v : T) ? w : T) ? S : T, b = (b = (b = b < g ? g : b) < m ? m : b) < y ? y : b, _ = (_ = (_ = _ < v ? v : _) < w ? w : _) < S ? S : _, this._bounds.x = x, this._bounds.width = b - x, this._bounds.y = T, this._bounds.height = _ - T, this._bounds
        }, z.Graphics.prototype.updateLocalBounds = function() {
            var e = 1 / 0,
                t = -1 / 0,
                i = 1 / 0,
                n = -1 / 0;
            if (this.graphicsData.length)
                for (var r, o, a, s, l, h, d = 0; d < this.graphicsData.length; d++) {
                    var c = this.graphicsData[d],
                        u = c.type,
                        f = c.lineWidth;
                    if (r = c.shape, u === z.Graphics.RECT || u === z.Graphics.RREC) a = r.x - f / 2, s = r.y - f / 2, e = a < e ? a : e, t = t < a + (l = r.width + f) ? a + l : t, i = s < i ? s : i, n = n < s + (h = r.height + f) ? s + h : n;
                    else if (u === z.Graphics.CIRC) a = r.x, s = r.y, e = a - (l = r.radius + f / 2) < e ? a - l : e, t = t < a + l ? a + l : t, i = s - (h = r.radius + f / 2) < i ? s - h : i, n = n < s + h ? s + h : n;
                    else if (u === z.Graphics.ELIP) a = r.x, s = r.y, e = a - (l = r.width + f / 2) < e ? a - l : e, t = t < a + l ? a + l : t, i = s - (h = r.height + f / 2) < i ? s - h : i, n = n < s + h ? s + h : n;
                    else {
                        o = r.points;
                        for (var p = 0; p < o.length; p += 2) e = (a = o[p]) - f < e ? a - f : e, t = t < a + f ? a + f : t, i = (s = o[p + 1]) - f < i ? s - f : i, n = n < s + f ? s + f : n
                    }
                } else n = i = t = e = 0;
            var g = this.boundsPadding;
            this._localBounds.x = e - g, this._localBounds.width = t - e + 2 * g, this._localBounds.y = i - g, this._localBounds.height = n - i + 2 * g
        }, z.Graphics.prototype.drawShape = function(e) {
            this.currentPath && this.currentPath.shape.points.length <= 2 && this.graphicsData.pop(), this.currentPath = null;
            var t = new z.GraphicsData(this.lineWidth, this.lineColor, this.lineAlpha, this.fillColor, this.fillAlpha, this.filling, e);
            return this.graphicsData.push(t), t.type === z.Graphics.POLY && (t.shape.closed = this.filling, this.currentPath = t), this.dirty = !0, t
        }, z.GraphicsData = function(e, t, i, n, r, o, a) {
            this.lineWidth = e, this.lineColor = t, this.lineAlpha = i, this._lineTint = t, this.fillColor = n, this.fillAlpha = r, this._fillTint = n, this.fill = o, this.shape = a, this.type = a.type
        }, z.Graphics.POLY = 0, z.Graphics.RECT = 1, z.Graphics.CIRC = 2, z.Graphics.ELIP = 3, z.Graphics.RREC = 4, z.Polygon.prototype.type = z.Graphics.POLY, z.Rectangle.prototype.type = z.Graphics.RECT, z.Circle.prototype.type = z.Graphics.CIRC, z.Ellipse.prototype.type = z.Graphics.ELIP, z.RoundedRectangle.prototype.type = z.Graphics.RREC, z.BaseTextureCache = {}, z.BaseTextureCacheIdGenerator = 0, z.BaseTexture = function(e, t) {
            if (this.width = 100, this.height = 100, this.scaleMode = t || z.scaleModes.DEFAULT, this.hasLoaded = !1, this.source = e, this._UID = z._UID++, this.premultipliedAlpha = !0, this._glTextures = [], this._dirty = [!0, !0, !0, !0], e) {
                if ((this.source.complete || this.source.getContext) && this.source.width && this.source.height) this.hasLoaded = !0, this.width = this.source.naturalWidth || this.source.width, this.height = this.source.naturalHeight || this.source.height, this.dirty();
                else {
                    var i = this;
                    this.source.onload = function() {
                        i.source && (i.hasLoaded = !0, i.width = i.source.naturalWidth || i.source.width, i.height = i.source.naturalHeight || i.source.height, i.dirty(), window.dirtyOnce = !0, i.dispatchEvent({
                            type: "loaded",
                            content: i
                        }))
                    }, this.source.onerror = function() {
                        i.dispatchEvent({
                            type: "error",
                            content: i
                        })
                    }
                }
                this.imageUrl = null
            }
        }, z.BaseTexture.prototype.constructor = z.BaseTexture, z.EventTarget.mixin(z.BaseTexture.prototype), z.BaseTexture.prototype.destroy = function() {
            this.imageUrl && (delete z.BaseTextureCache[this.imageUrl], delete z.TextureCache[this.imageUrl], this.imageUrl = null, this.source.src = ""), this.source = null, this.unloadFromGPU()
        }, z.BaseTexture.prototype.dirty = function() {
            for (var e = 0; e < this._glTextures.length; e++) this._dirty[e] = !0
        }, z.BaseTexture.prototype.unloadFromGPU = function() {
            this.dirty();
            for (var e = this._glTextures.length - 1; 0 <= e; e--) {
                var t = this._glTextures[e],
                    i = z.glContexts[e];
                i && t && i.deleteTexture(t)
            }
            this._glTextures.length = 0, this.dirty()
        }, z.BaseTexture.fromImage = function(e, t, i) {
            var n = z.BaseTextureCache[e];
            if (void 0 === t && -1 === e.indexOf("data:") && (t = !0), !n) {
                var r = new Image;
                t && (r.crossOrigin = ""), r.src = e, (n = new z.BaseTexture(r, i)).imageUrl = e, z.BaseTextureCache[e] = n
            }
            return n
        }, z.BaseTexture.fromCanvas = function(e, t) {
            return new z.BaseTexture(e, t)
        }, z.TextureCache = {}, z.FrameCache = {}, z.TextureCacheIdGenerator = 0, z.Texture = function(e, t, i, n, r) {
            this.noFrame = !1, this.resolution = r || 1, t || (this.noFrame = !0, t = new z.Rectangle(0, 0, 1, 1)), e instanceof z.Texture && (e = e.baseTexture), this.baseTexture = e, this.floorCoordinates = !0, this.frame = t, this.trim = n, this.valid = !1, this.requiresUpdate = !1, this._uvs = null, this.width = 0, this.height = 0, this.crop = i || new z.Rectangle(0, 0, 1, 1), e.hasLoaded ? (this.noFrame && (t = new z.Rectangle(0, 0, e.width / this.resolution, e.height / this.resolution)), this.setFrame(t)) : e.addEventListener("loaded", this.onBaseTextureLoaded.bind(this))
        }, z.Texture.prototype.constructor = z.Texture, z.EventTarget.mixin(z.Texture.prototype), z.Texture.prototype.onBaseTextureLoaded = function() {
            var e = this.baseTexture;
            e.removeEventListener("loaded", this.onLoaded), this.noFrame && (this.frame = new z.Rectangle(0, 0, e.width / this.resolution, e.height / this.resolution)), this.setFrame(this.frame), this.dispatchEvent({
                type: "update",
                content: this
            })
        }, z.Texture.prototype.destroy = function(e) {
            e && this.baseTexture.destroy(), this.valid = !1
        }, z.Texture.prototype.setFrame = function(e) {
            if (this.noFrame = !1, this.frame = e, this.width = e.width, this.height = e.height, this.crop.x = e.x, this.crop.y = e.y, this.crop.width = e.width, this.crop.height = e.height, !this.trim && (e.x + e.width > this.baseTexture.width / this.resolution || e.y + e.height > this.baseTexture.height / this.resolution)) throw new Error("Texture Error: frame does not fit inside the base Texture dimensions " + this);
            this.valid = e && e.width && e.height && this.baseTexture.source && this.baseTexture.hasLoaded, this.trim && (this.width = this.trim.width, this.height = this.trim.height, this.frame.width = this.trim.width, this.frame.height = this.trim.height), this.valid && this._updateUvs()
        }, z.Texture.prototype._updateUvs = function() {
            this._uvs || (this._uvs = new z.TextureUvs);
            var e = this.crop,
                t = this.resolution,
                i = this.baseTexture.width / t,
                n = this.baseTexture.height / t;
            this._uvs.x0 = e.x / i, this._uvs.y0 = e.y / n, this._uvs.x1 = (e.x + e.width) / i, this._uvs.y1 = e.y / n, this._uvs.x2 = (e.x + e.width) / i, this._uvs.y2 = (e.y + e.height) / n, this._uvs.x3 = e.x / i, this._uvs.y3 = (e.y + e.height) / n
        }, z.Texture.fromImage = function(e, t, i, n) {
            var r = e;
            1 != (n = n || 1) && (r += ":" + n);
            var o = z.TextureCache[r];
            return o || (o = new z.Texture(z.BaseTexture.fromImage(e, t, i), n), z.TextureCache[r] = o), o
        }, z.Texture.fromFrame = function(e) {
            var t = z.TextureCache[e];
            if (!t) throw new Error('The frameId "' + e + '" does not exist in the texture cache ');
            return t
        }, z.Texture.fromCanvas = function(e, t, i) {
            var n = z.BaseTexture.fromCanvas(e, t);
            return new z.Texture(n, void 0, void 0, void 0, i)
        }, z.Texture.addTextureToCache = function(e, t) {
            z.TextureCache[t] = e
        }, z.Texture.removeTextureFromCache = function(e) {
            var t = z.TextureCache[e];
            return delete z.TextureCache[e], delete z.BaseTextureCache[e], t
        }, z.TextureUvs = function() {
            this.x0 = 0, this.y0 = 0, this.x1 = 0, this.y1 = 0, this.x2 = 0, this.y2 = 0, this.x3 = 0, this.y3 = 0
        }, z.Texture.emptyTexture = new z.Texture(new z.BaseTexture), z.RenderTexture = function(e, t, i, n) {
            if (this.width = e || 100, this.height = t || 100, this.frame = new z.Rectangle(0, 0, this.width, this.height), this.crop = new z.Rectangle(0, 0, this.width, this.height), this.baseTexture = new z.BaseTexture, this.baseTexture.width = this.width, this.baseTexture.height = this.height, this.baseTexture._glTextures = [], this.baseTexture.scaleMode = n || z.scaleModes.DEFAULT, this.baseTexture.hasLoaded = !0, z.Texture.call(this, this.baseTexture, new z.Rectangle(0, 0, this.width, this.height)), this.renderer = i || z.defaultRenderer, this.renderer.type === z.WEBGL_RENDERER) {
                var r = this.renderer.gl;
                this.baseTexture._dirty[r.id] = !1, this.textureBuffer = new z.FilterTexture(r, this.width, this.height, this.baseTexture.scaleMode), this.baseTexture._glTextures[r.id] = this.textureBuffer.texture, this.render = this.renderWebGL, this.projection = new z.Point(.5 * this.width, .5 * -this.height)
            } else this.render = this.renderCanvas, this.textureBuffer = new z.CanvasBuffer(this.width, this.height), this.baseTexture.source = this.textureBuffer.canvas;
            this.valid = !0, this._updateUvs()
        }, z.RenderTexture.prototype = Object.create(z.Texture.prototype), z.RenderTexture.prototype.constructor = z.RenderTexture, z.RenderTexture.prototype.resize = function(e, t, i) {
            e === this.width && t === this.height || (this.valid = 0 < e && 0 < t, this.width = this.frame.width = this.crop.width = e, this.height = this.frame.height = this.crop.height = t, i && (this.baseTexture.width = this.width, this.baseTexture.height = this.height), this.renderer.type === z.WEBGL_RENDERER && (this.projection.x = this.width / 2, this.projection.y = -this.height / 2), this.valid && this.textureBuffer.resize(this.width, this.height))
        }, z.RenderTexture.prototype.clear = function() {
            this.valid && (this.renderer.type === z.WEBGL_RENDERER && this.renderer.gl.bindFramebuffer(this.renderer.gl.FRAMEBUFFER, this.textureBuffer.frameBuffer), this.textureBuffer.clear())
        }, z.RenderTexture.prototype.renderWebGL = function(e, t, i) {
            if (this.valid) {
                var n = e.worldTransform;
                n.identity(), n.translate(0, 2 * this.projection.y), t && n.append(t), n.scale(1, -1), e.worldAlpha = 1;
                for (var r = e.children, o = 0, a = r.length; o < a; o++) r[o].updateTransform();
                var s = this.renderer.gl;
                s.viewport(0, 0, this.width, this.height), s.bindFramebuffer(s.FRAMEBUFFER, this.textureBuffer.frameBuffer), i && this.textureBuffer.clear(), this.renderer.spriteBatch.dirty = !0, this.renderer.renderDisplayObject(e, this.projection, this.textureBuffer.frameBuffer), this.renderer.spriteBatch.dirty = !0
            }
        }, z.RenderTexture.prototype.renderCanvas = function(e, t, i) {
            if (this.valid) {
                var n = e.worldTransform;
                n.identity(), t && n.append(t), e.worldAlpha = 1;
                for (var r = e.children, o = 0, a = r.length; o < a; o++) r[o].updateTransform();
                i && this.textureBuffer.clear();
                var s = this.textureBuffer.context;
                this.renderer.renderDisplayObject(e, s)
            }
        }, z.AbstractFilter = function(e, t) {
            this.passes = [this], this.shaders = [], this.dirty = !0, this.padding = 0, this.uniforms = t || {}, this.fragmentSrc = e || []
        }, z.AbstractFilter.prototype.constructor = z.AbstractFilter, z.AbstractFilter.prototype.syncUniforms = function() {
            for (var e = 0, t = this.shaders.length; e < t; e++) this.shaders[e].dirty = !0
        }, z
    }
    Host = function() {
            var a = {},
                o = window.Host || {};

            function r(e, t, i, n, r) {
                var o = new XMLHttpRequest;
                o.crossOrigin = "anonymous", o.overrideMimeType && o.overrideMimeType("application/json");
                try {
                    o.open(e, t, !0), "POST" == e && o.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), o.onreadystatechange = function() {
                        if (4 == o.readyState)
                            if ("200" == o.status) {
                                var e = {};
                                try {
                                    e = JSON.parse(o.responseText)
                                } catch (e) {
                                    return window.onerror && window.onerror("Failed to parse JSON return data " + t + "> " + e.message, e.sourceURL, e.line), void r()
                                }
                                n(e)
                            } else o = o.onreadystatechange = null, r && r()
                    }, o.send(i)
                } catch (e) {
                    window.onerror && window.onerror("Failed to execute JSON load code " + t + "> " + e.message, e.sourceURL, e.line), r()
                }
            }

            function s(e, t, i) {
                var n = this;
                null == t && (t = ""), n.translated = t.toString(), n.replacements = i, n.original = e, n.toString = function() {
                    return n.translated
                }
            }
            o.call = function(e, t, i) {
                null != i && (callbackId = "cb" + Math.round(99999 * Math.random()) + (new Date).getTime(), a[callbackId] = i, t._callback = callbackId), t._method = e, o.sendToHost("json1:" + JSON.stringify(t))
            }, o.callResult = function(e) {
                var t = e.indexOf(":");
                if (0 < t) {
                    var i = e.substring(0, t),
                        n = e.substring(t + 1);
                    switch (i) {
                        case "json1":
                            var r = JSON.parse(n),
                                o = a[r._callback];
                            o && (delete r._callback, o(r))
                    }
                }
            }, o.Application = {}, o.Application.SetStatusbarColor = function(e) {}, o.onPauseEvent = function() {}, o.onResumeEvent = function() {}, o.onMarginsChanged = function(e) {
                o.Log("Margins changed! [t:" + e.top + ", b:" + e.bottom + ", l:" + e.left + ", r:" + e.right + "]"), XS.styles.margins.top = e.top, XS.styles.margins.bottom = e.bottom, XS.styles.margins.left = e.left, XS.styles.margins.right = e.right
            }, o.pauseResizing = function() {
                XS.skipResizing = !0
            }, o.resumeResizing = function() {
                XS.skipResizing = !1, window.dispatchEvent(new Event("resize"))
            }, o.onSafeToExitEvent = function() {
                var e = {
                    type: "ShowModal"
                };
                return e.titleTxt = o.Localize.Translate("Progress might be lost if you exit {game_name} now!", {
                    game_name: ze.shortTitle
                }).toString(), e.msgTxt = o.Localize.Translate("Are you sure you want to close the app?").toString(), e.confirmTxt = o.Localize.Translate("Confirm").toString(), e.confirmCb = function() {}, e.cancelTxt = o.Localize.Translate("Cancel").toString(), e.cancelCb = function() {
                    XS.unfreeze()
                }, XS.freeze(), e
            }, o.makeGameShareURL = function() {
                return encodeURI("https://" + ze.domain + "/alc/")
            }, o.Preferences = {}, o.Preferences.cache = {}, o.Preferences.QuickBool = function(t) {
                return {
                    get: function() {
                        return o.Preferences.cache[t] || !1
                    },
                    set: function(e) {
                        o.Preferences.SetBool(t, e)
                    },
                    remove: function() {
                        o.Preferences.Remove(t)
                    }
                }
            }, o.Preferences.QuickInt = function(t) {
                return {
                    get: function() {
                        return parseInt(o.Preferences.cache[t]) || 0
                    },
                    set: function(e) {
                        o.Preferences.SetInt(t, e)
                    },
                    remove: function() {
                        o.Preferences.Remove(t)
                    }
                }
            }, o.Preferences.QuickFloat = function(t) {
                return {
                    get: function() {
                        return parseFloat(o.Preferences.cache[t]) || 0
                    },
                    set: function(e) {
                        o.Preferences.SetFloat(t, e)
                    },
                    remove: function() {
                        o.Preferences.Remove(t)
                    }
                }
            }, o.Preferences.QuickString = function(t) {
                return {
                    get: function() {
                        return o.Preferences.cache[t] || ""
                    },
                    set: function(e) {
                        o.Preferences.SetString(t, e)
                    },
                    remove: function() {
                        o.Preferences.Remove(t)
                    }
                }
            }, o.Tools = {}, o.Tools.LoadJSON = function(e, t, i) {
                r("GET", e, null, t, i)
            }, o.Tools.SendJSON = function(e, t, i, n) {
                r("POST", e, t, i, n)
            }, o.Tools.PostJSON = function(e, t, i) {
                var n = new XMLHttpRequest;
                n.crossOrigin = "anonymous";
                try {
                    n.onreadystatechange = function() {
                        if (4 == n.readyState)
                            if ("200" == n.status) i && i(!0, n.responseText);
                            else {
                                o.Log("PostJSON Error Status: Response: " + n.responseText);
                                var e = n.responseText;
                                n = n.onreadystatechange = null, i && i(!1, e)
                            }
                    }, n.open("POST", e, !0), n.setRequestHeader("Content-type", "application/json;charset=UTF-8"), n.send("string" == typeof t ? t : JSON.stringify(t))
                } catch (e) {
                    o.Log("PostJSON Error:", e), i && i(!1, e)
                }
            }, o.Web = {}, o.Web.GetQueryString = function(e) {
                /* var t = window.location.href;
                e = e.replace(/[\[\]]/g, "\\$&");
                var i = new RegExp("[?&]" + e + "(=([^&#]*)|&|#|$)", "i").exec(t);
                return i ? i[2] ? decodeURIComponent(i[2].replace(/\+/g, " ")) : "" : null */
            }, o.Localize = o.Localize || {}, o.Localize.Translations = {
                en: {}
            }, o.Localize.LocalizedString = s, o.Localize._currentLanguage = "en-US", o.Localize.TranslationsCache && (! function(e, t) {
                for (var i in e)
                    if (e.hasOwnProperty(i)) {
                        var n = e[i];
                        for (var r in n) t[r] = t[r] || {}, t[r][i] = {
                            translation: n[r]
                        }
                    }
            }(o.Localize.TranslationsCache, o.Localize.Translations), delete o.Localize.TranslationsCache);
            var l = {},
                h = !1;
            return o.Localize.UpdateChildren = function(e) {
                if (h)
                    for (var t in e.children) {
                        var i = e.children[t];
                        i instanceof Text2 ? i.onLanguageChange() : i instanceof Container && o.Localize.UpdateChildren(i)
                    }
            }, o.Localize.Load = function(n, r) {
                return h = !0, o.Localize.Translations[n] ? (l = o.Localize.Translations[n], o.Localize._currentLanguage = n, Text2.onLanguageChange(), XS.emit("language-changed", {
                    language: n
                }), r && r(n, !0), !0) : (o.Tools.LoadJSON("./languages/" + n + ".json", function(e) {
                    for (key in o.Localize._currentLanguage = n, l = o.Localize.Translations[n] = e, console.log("Loaded language json for: " + n, l), e) {
                        var t = e[key],
                            i = key.replace(/\\n/g, "\n");
                        i != key && (delete e[key], t.translation ? (t.translation = t.translation.replace("\\n", "\n"), e[i] = t) : (console.warn('Missing translation: "' + key + '"'), e[i] = key))
                    }
                    Text2.onLanguageChange(), XS.emit("language-changed", {
                        language: n
                    }), r && r(n, !0)
                }, function() {
                    console.warn("failed to load language"), r && r(n, !1)
                }), !1)
            }, o.Localize.CurrentLanguage = function() {
                return o.Localize._currentLanguage
            }, o.Localize.languages = o.Localize.languages || [], o.Localize.Test = function() {
                var i = 0,
                    n = window.onkeydown;
                window.onkeydown = function(e) {
                    var t = e.keyCode;
                    37 == t && (i -= 1), 39 == t && (i += 1), i += o.Localize.languages.length, i %= o.Localize.languages.length, o.Localize.Load(o.Localize.languages[i]), n && n(e)
                }
            }, o.Localize.Translate = function(e, t) {
                var i = e;
                if (e instanceof s) {
                    i = e.original;
                    var n = {};
                    for (var r in e.replacements) n[r] = e.replacements[r];
                    for (var r in t) n[r] = t[r];
                    t = n
                }
                for (var r in e = l[i] && null !== l[i].translation ? l[i].translation : i, t) e = e.split("{" + r + "}").join(t[r]);
                return new s(i, e, t)
            }, o.Localize.GetLanguage = function() {
                var e = window.navigator;
                if (Array.isArray(e.languages))
                    for (i = 0; i < e.languages.length; i++)
                        if (language = e.languages[i], language && language.length) return language;
                var t = ["language", "browserLanguage", "systemLanguage", "userLanguage"];
                for (i = 0; i < t.length; i++)
                    if (language = e[t[i]], language && language.length) return language;
                return "en"
            }, o.Type = "undefined", o
        }(),
        function(e) {
            e.Host = e.Host || {}, Host.Type = "web", Host.Log = function(e) {
                console.log(e)
            }, Host.WrapperLog = function(e) {}, Host.sendToHost = function() {};
            var i, r = (i = {}, function() {
                try {
                    return "localStorage" in window && null !== window.localStorage
                } catch (e) {
                    return !1
                }
            }() ? {
                set: function(e, t) {
                    i[e] = t;
                    try {
                        localStorage.setItem(ze.id + e, t)
                    } catch (e) {}
                },
                get: function(e) {
                    return i[e] || localStorage.getItem(ze.id + e)
                },
                remove: function(e) {
                    delete i[e], localStorage.removeItem(ze.id + e)
                }
            } : {
                set: function(e, t) {
                    i[e] = t
                },
                get: function(e) {
                    return i[e]
                },
                remove: function(e) {
                    delete i[e]
                }
            });
            Host.Preferences = Host.Preferences || {}, Host.Preferences.SetBool = function(e, t) {
                Host.Preferences.cache[e] = t, r.set(e, t ? "true" : "false")
            }, Host.Preferences.SetInt = function(e, t) {
                Host.Preferences.cache[e] = t, r.set(e, t)
            }, Host.Preferences.SetFloat = function(e, t) {
                Host.Preferences.cache[e] = t, r.set(e, t)
            }, Host.Preferences.SetString = function(e, t) {
                Host.Preferences.cache[e] = t, r.set(e, t)
            }, Host.Preferences.Remove = function(e) {
                delete Host.Preferences.cache[e], r.remove(e)
            }, Host.Preferences.GetBool = function(e, t) {
                var i = null !== r.get(e) || Host.Preferences.cache.hasOwnProperty(e),
                    n = "true" == r.get(e);
                Host.Preferences.cache[e] = n, t && t(n, i)
            }, Host.Preferences.GetInt = function(e, t) {
                var i = null !== r.get(e) || Host.Preferences.cache.hasOwnProperty(e),
                    n = parseInt(r.get(e));
                Host.Preferences.cache[e] = n, t && t(n, i)
            }, Host.Preferences.GetFloat = function(e, t) {
                var i = null !== r.get(e) || Host.Preferences.cache.hasOwnProperty(e),
                    n = parseFloat(r.get(e));
                Host.Preferences.cache[e] = n, t && t(n, i)
            }, Host.Preferences.GetString = function(e, t) {
                var i = null !== r.get(e) || Host.Preferences.cache.hasOwnProperty(e),
                    n = r.get(e);
                Host.Preferences.cache[e] = n, t && t(n, i)
            }, Host.Localize.Translate = Host.Localize.Translate || {}, Host.Localize.Translate.GetString = function(e) {
                return Lang[e] || "!!No translation found!!"
            }
        }(this), (e = this).Host = e.Host || {}, e.Host.Type = "poki", e.Host.onLoad = function() {
            PokiSDK.gameLoadingStart()
        },
        function(e) {
            var s = {};
            s.higherIsBetter = function(e, t) {
                return void 0 === e ? t : void 0 === t ? e : Math.max(e || 0, t || 0)
            }, s.lowerIsBetter = function(e, t) {
                return void 0 === e ? t : void 0 === t ? e : Math.min(e || 0, t || 0)
            }, s.longerIsBetter = function(e, t) {
                return void 0 === e ? t : void 0 === t ? e : (e || "").length >= (t || "").length ? e : t
            }, s.shorterIsBetter = function(e, t) {
                return void 0 === e ? t : void 0 === t ? e : (e || "").length <= (t || "").length ? e : t
            }, s.trueIsBetter = function(e, t) {
                return void 0 === e ? t : void 0 === t ? e : e || t || !1
            }, s.falseIsBetter = function(e, t) {
                return void 0 === e ? t : void 0 === t ? e : e && t || !1
            }, s.firstIsBetter = function(e, t) {
                return void 0 === e ? t : e
            }, s.secondIsBetter = function(e, t) {
                return void 0 === e ? t : void 0 === t ? e : t
            }, s.recursive = function(a) {
                function n(e, t, i, n) {
                    for (prop in t) {
                        var r = a[typeof t[prop]];
                        if (!r) {
                            var o = "XS.data.merge.recursive: Unsupported merge type (property: " + prop + "): " + typeof t[prop] + " - defaulting to second arg";
                            console.error(o), r = a.default || s.secondIsBetter
                        }
                        e[prop] = r(i[prop], n[prop])
                    }
                }
                var e = function(e, t) {
                    var i = {};
                    return n(i, e, e, t), n(i, t, e, t), i
                };
                return a.object = a.object || e, e
            }, s.higherAndTrueIsBetter = s.recursive({
                number: s.higherIsBetter,
                boolean: s.trueIsBetter
            });
            var t = {
                int: {
                    defVal: 0,
                    defMerge: s.higherIsBetter,
                    localGet: Host.Preferences.GetInt,
                    localSet: Host.Preferences.SetInt
                },
                float: {
                    defVal: 0,
                    defMerge: s.higherIsBetter,
                    localGet: Host.Preferences.GetFloat,
                    localSet: Host.Preferences.SetFloat
                },
                string: {
                    defVal: "",
                    defMerge: s.longerIsBetter,
                    localGet: Host.Preferences.GetString,
                    localSet: Host.Preferences.SetString
                },
                bool: {
                    defVal: !1,
                    defMerge: s.trueIsBetter,
                    localGet: Host.Preferences.GetBool,
                    localSet: Host.Preferences.SetBool
                },
                object: {
                    defVal: {},
                    defMerge: s.firstIsBetter,
                    localGet: function(e, n) {
                        Host.Preferences.GetString(e, function(e, t) {
                            var i = void 0;
                            try {
                                i = JSON.parse(e)
                            } catch (e) {
                                i = {}
                            }
                            n && n(i, t)
                        })
                    },
                    localSet: function(e, t) {
                        t = JSON.stringify(t), Host.Preferences.SetString(e, t)
                    }
                }
            };

            function i() {
                this._elems = {}, this._providers = [], this._saveInterval = 5e3, this._saveIntervalId = void 0, this._boundSaveAll = this.save.bind(this, void 0)
            }
            i.prototype._typeMap = t, i.prototype._keyExists = function(e) {
                return this._elems.hasOwnProperty(e)
            }, i.prototype._getKey = function(e) {
                return this._elems[e] && this._elems[e].value
            }, i.prototype._setKey = function(e, t) {
                if (this._keyExists(e)) {
                    var i = this._elems[e];
                    JSON.stringify(i.value) != JSON.stringify(t) && (i.value = t, i.setLocal(t), i.dirtyRemote = !0)
                }
            }, i.prototype._remoteKeys = function() {
                var e = [],
                    t = this._elems;
                for (var i in t) t[i].remote && e.push(i);
                return e
            }, i.prototype._subscribedRemote = function(e) {
                for (var t = this._providers, i = 0; i < t.length; i++)
                    if (t[i].remote === e) return !0;
                return !1
            }, i.prototype._addRemote = function(e) {
                if (e && "object" == typeof e && !this._subscribedRemote(e)) {
                    var t = {
                        remote: e,
                        init: !1
                    };
                    this._providers.push(t)
                }
            }, i.prototype._addDefaultRemotes = function() {
                var e = n.is.facebookInstant ? window.Social.Instant : He;
                this._addRemote(e)
            }, i.prototype._initRemote = function(e) {
                var t = this._providers;
                if (e)
                    for (var i = 0; i < t.length; i++)
                        if (t[i].remote === e) return t[i].init = !0
            }, i.prototype._mergeRemoteDataElements = function(e) {
                for (var t = this._elems, i = Object.keys(t), n = 0; n < i.length; n++) {
                    var r = i[n],
                        o = t[r];
                    if (o.remote) {
                        var a = o.value,
                            s = JSON.stringify(a),
                            l = e[r];
                        if (void 0 === l) o.dirtyRemote = !0;
                        else {
                            mergedVal = o.merge(a, l);
                            var h = JSON.stringify(mergedVal),
                                d = JSON.stringify(l);
                            void 0 === mergedVal || s == h && d == h || (o.value = mergedVal, o.setLocal(mergedVal), o.dirtyRemote = !0)
                        }
                    }
                }
                this.emit("dataloaded", this._generateChangesPayload())
            }, i.prototype._loadRemote = function(e, t) {
                this._subscribedRemote(e) && (this._initRemote(e), this._mergeRemoteDataElements(t), this.save())
            }, i.prototype._updateSaveLoop = function() {
                void 0 !== this._saveIntervalId && (clearInterval(this._saveIntervalId), this._saveIntervalId = void 0), 0 < this._saveInterval && (this._saveIntervalId = setInterval(this._boundSaveAll, this._saveInterval))
            }, i.prototype._init = function() {
                this._addDefaultRemotes(), this._updateSaveLoop()
            }, i.prototype._changes = function(e) {
                var t = {},
                    i = [],
                    n = this._elems;
                void 0 === e && (e = Object.keys(n)), e instanceof Array || (e = [e]);
                for (var r = 0; r < e.length; r++) {
                    var o = e[r];
                    if (this._keyExists(o)) {
                        var a = n[o];
                        a.dirtyRemote && (t[o] = a.value, a.remote && i.push(o))
                    }
                }
                return {
                    elements: t,
                    remoteFields: i
                }
            }, i.prototype._generateChangesPayload = function(e) {
                var t = this._changes(e),
                    i = this._elems,
                    n = {};
                for (var r in i) i.hasOwnProperty(r) && (n[r] = i[r].value);
                return {
                    data: n,
                    changedFields: Object.keys(t.elements),
                    remoteChangedFields: t.remoteFields
                }
            }, i.prototype._load = function(e, t, i, n) {
                if (this._keyExists(e)) return !1;
                var r = this._elems[e] = {},
                    o = void 0 !== t ? t : e;
                i = i.toLowerCase(), this._typeMap[i].localGet(o, function(e, t) {
                    r.localValue = e, r.localKeyFound = t, n && n()
                })
            }, i.prototype._add = function(t, e, i) {
                var n = this;
                if (this._keyExists(t)) {
                    e = e || {};
                    var r = this._typeMap[i],
                        o = this._elems[t];
                    o.type = i, o.remote = !0 === e.remote, o.merge = void 0 !== e.merge ? e.merge : r.defMerge, Object.defineProperty(this, t, {
                        set: function(e) {
                            n._setKey(t, e)
                        },
                        get: function() {
                            return n._getKey(t)
                        }
                    });
                    var a = e.localKey || t;
                    o.setLocal = function(e) {
                        r.localSet(a, e)
                    }, o.default = void 0 !== e.default ? e.default : r.defVal, o.localKeyFound ? (o.value = o.localValue, o.dirtyRemote = !1) : (o.value = void 0 !== e.default ? e.default : r.defVal, o.setLocal(o.value), o.dirtyRemote = !0), delete o.localValue, delete o.localKeyFound
                }
            }, i.prototype._loadAndAdd = function(e, t, i, n, r) {
                var o = this;

                function a() {
                    o._add(e, i, n), r && r(o._elems[e].value)
                }
                i = i || {}, t !== e && (i.localKey = t), this._elems.hasOwnProperty(e) ? a() : this._load(e, t, n, a)
            }, "Float,Int,String,Bool,Object".split(",").forEach(function(e) {
                var r = e.toLowerCase();
                i.prototype["add" + e] = function(e, t, i) {
                    this._loadAndAdd(e, e, t, r, i)
                }, i.prototype["add" + e + "WithLocalKey"] = function(e, t, i, n) {
                    this._loadAndAdd(e, t, i, r, n)
                }
            }), i.prototype.save = function(e) {
                var t = this._generateChangesPayload(e),
                    i = this._changes(e),
                    n = Object.keys(i.elements).length;
                for (var r in i.elements) i.elements.hasOwnProperty(r) && (this._elems[r].dirtyRemote = !1);
                i.remoteFields.length;
                if (0 < i.remoteFields.length)
                    for (var o = 0; o < this._providers.length; o++) {
                        var a = this._providers[o];
                        if (a.init) {
                            for (var s = 0; s < i.remoteFields.length; s++) {
                                var l = i.remoteFields[s],
                                    h = i.elements[l];
                                a.remote.setChange(l, h)
                            }
                            a.remote.saveChanges(function(e) {})
                        }
                    }
                0 < n && this.emit("datasaved", t)
            }, i.prototype.setSaveInterval = function(e) {
                this._saveInterval = e, this._updateSaveLoop()
            }, i.prototype.setDirty = function(e) {
                if (this._keyExists(e)) {
                    var t = this._elems[e];
                    t.setLocal(t.value), t.dirtyRemote = !0
                }
            }, i.prototype.merge = s, (i.prototype.constructor = i).prototype.toString = function() {
                for (var e = Object.keys(this._elems), t = "XS.Data elements:", i = 0; i < e.length; i++) {
                    var n = e[i],
                        r = this._elems[n];
                    t += "\n" + n + ": " + ("object" == typeof r.value ? JSON.stringify(r.value) : r.value) + " (Is Remote: " + r.remote + ")"
                }
                return t
            }, i.prototype.resetToDefaults = function() {
                for (var e = Object.keys(this._elems), t = 0; t < e.length; t++) {
                    var i = e[t],
                        n = this._elems[i],
                        r = (n.type, this._typeMap[n.type]);
                    n.value = void 0 !== n.default ? n.default : r.defVal, this.setDirty(i), n.dirty = !0
                }
                this.save(e)
            }, e.XS = e.XS || {};
            var n = e.XS;
            n.data = new i
        }(this),
        function(e) {
            function t() {
                this._soundIDs = 0, this._sounds = {}, this._musics = {}, this._userSoundMute = !1, this._userMusicMute = !1, this._engineMute = !1
            }
            t.prototype._init = function() {
                r.initSound(), this._audioPlayer = window.Host && window.Host.Sound ? new n : new i
            }, t.prototype.preloadSound = function(e, t, i) {
                var n = 1;
                (i = i || {}).gain && (n = i.gain);
                var r = new o(e, ++this._soundIDs, n);
                return this._sounds[e] = r, (i = i || {}).music = !1, r._internalSound = this._audioPlayer.preload(r._soundID, t, i), r
            }, t.prototype.preloadMusic = function(e, t, i) {
                if (!this._musics[e]) {
                    var n = 1;
                    (i = i || {}).gain && (n = i.gain);
                    var r = new a(e, n);
                    return this._musics[e] = r, (i = i || {}).music = !0, r._internalMusic = this._audioPlayer.preload(e, t, i), r
                }
                Host.Log("Error: Trying to preload music with existing label: " + e)
            }, t.prototype.getMusic = function(e) {
                return this._musics[e]
            }, t.prototype.playMusic = function(e, t) {
                var i = this.getMusic(e);
                return i ? i.play(t) : Host.Log("Error: Music with label '" + e + "' not loaded."), i
            }, t.prototype.getSound = function(e) {
                return this._sounds[e]
            }, t.prototype.playSound = function(e, t) {
                var i = this.getSound(e);
                return i ? i.play(t) : Host.Log("Error: Sound with label '" + e + "' not loaded."), i
            }, t.prototype.loopSound = function(e, t) {
                var i = this.getSound(e);
                return i ? i.loop(t) : Host.Log("Error: Sound with label '" + e + "' not loaded."), i
            }, t.prototype.isSoundMuted = function() {
                return this._userSoundMute || this._engineMute
            }, t.prototype.isMusicMuted = function() {
                return this._userMusicMute || this._engineMute
            }, t.prototype.muteSounds = function(e) {
                this._userSoundMute = e, r.muteSound(e)
            }, t.prototype.muteMusics = function(e) {
                this._userMusicMute = e, r.muteMusic(e)
            }, t.prototype.constructor = t, e.XS = e.XS || {};
            var r = e.XS;

            function o(e, t, i) {
                var n = this;
                this._label = e, this._soundID = t, this._initGain = i || 1, this._currentUserGain = i || 1, this._internalSound = null, n.play = function(e) {
                    if ((e = e || {}).gain && (this._currentUserGain = e.gain), this._internalSound) return this._internalSound.play(0, !1), void this._internalSound.setGain(this._currentUserGain);
                    r.audio._audioPlayer.play(this._soundID, e)
                }, n.loop = function(e) {
                    (e = e || {}).gain && (this._currentUserGain = e.gain, this._internalSound && this._internalSound.setGain(this._currentUserGain)), this._internalSound ? this._internalSound.play(0, !0) : (e.loop = !0, this.play(this._soundID, e))
                }, n.setGain = function(e) {
                    this._currentUserGain = e, this._internalSound ? this._internalSound.setGain(e) : (this._currentUserGain = e, r.audio._audioPlayer.setGain(this._soundID, e))
                }, n.resetGain = function() {
                    this._internalSound ? this._internalSound.resetGain() : (this._currentUserGain = this._initGain, r.audio._audioPlayer.setGain(this._soundID, this._initGain))
                }, n.setNewInitGain = function(e) {
                    this._internalSound ? this._internalSound.updateGain(e) : (this._initGain = e, this.resetGain())
                }, n.pause = function() {
                    this._internalSound ? this._internalSound.setMuted(!0) : r.audio._audioPlayer.pause(this._soundID)
                }, n.resume = function() {
                    this._internalSound ? this._internalSound.setMuted(!1) : r.audio._audioPlayer.resume(this._soundID)
                }, n.stop = function() {
                    this._internalSound ? this._internalSound.stop() : r.audio._audioPlayer.stop(this._soundID)
                }
            }

            function a(e, t) {
                this._label = e, this._initGain = t || 1, this._currentUserGain = t || 1, this._internalMusic = null, this.play = function(e) {
                    if ((e = e || {}).gain && (this._currentUserGain = e.gain), this._internalMusic) return this._internalMusic.play(0, !0), void this._internalMusic.setGain(this._currentUserGain);
                    e.loop = !0, r.audio._audioPlayer.play(this._label, e)
                }, this.stop = function() {
                    this._internalMusic ? this._internalMusic.stop() : r.audio._audioPlayer.stop(this._label)
                }, this.crossfade = function(e) {
                    if (e && e.toSoundID && e.duration) {
                        if (this._internalMusic) return;
                        e.fromSoundID = this._label, r.audio._audioPlayer.crossfade(e)
                    }
                }
            }

            function i() {
                var e = this;
                e.preload = function(e, t, i) {
                    var n = 1;
                    return i && i.gain && (n = i.gain), i.music || !1 ? r.Music.get(t, n) : r.Sound.get(t, n)
                }, e.play = function(e, t) {}, e.setGain = function(e, t) {}, e.pause = function(e) {}, e.resume = function(e) {}, e.stop = function(e) {}, e.crossfade = function(e) {}, e.setGains = function(e) {}
            }

            function n() {
                var e = this;
                e.preload = function(e, t, i) {}, e.play = function(e, t) {}, e.setGain = function(e, t) {}, e.pause = function(e) {}, e.resume = function(e) {}, e.stop = function(e) {}, e.crossfade = function(e) {}, e.setGains = function(e) {}
            }
            r.audio = new t
        }(this),
        function(e) {
            var o = "https://production-dot-frvr-chatbot.appspot.com/refer";

            function a(e, t) {
                t || (t = !1);
                var i = JSON.parse(e.response);
                if ("string" == typeof i.data && (i.data = JSON.parse(i.data)), t)
                    for (var n = 0; n < i.length; n++) "string" == typeof i[n].data && (i[n].data = JSON.parse(i[n].data));
                return i
            }(e.XS = e.XS || {}).referral = new function() {
                return {
                    create: function(e, t) {
                        if (!e.player_id || !e.game || !e.data) return t(new Error("create - Incomplete/Invalid options object (e.g., player_id, game, data) field (target field is optional)"));
                        var i = new XMLHttpRequest;
                        i.onload = function() {
                            if (200 != i.status) return t(i.status, i.response);
                            var e = a(i);
                            return t(null, e)
                        }, i.open("POST", o, !0), i.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), i.send(JSON.stringify({
                            player_id: e.player_id,
                            game: e.game,
                            data: e.data,
                            target: e.target
                        }))
                    },
                    get: function(e, t) {
                        if (!e) return t(new Error("get - referralID param missing or invalid"));
                        var i = new XMLHttpRequest;
                        i.onload = function() {
                            if (200 != i.status) return t(i.status, i.response);
                            var e = a(i);
                            return t(null, e)
                        }, i.open("GET", o + "/" + e, !0), i.send()
                    },
                    accept: function(e, t, i) {
                        if (!e) return i(new Error("accept - referralID param missing or invalid"));
                        if (!t) return i(new Error("accept - playerID param missing or invalid "));
                        var n = new XMLHttpRequest;
                        n.onload = function() {
                            if (200 != n.status) return i(n.status, n.response);
                            var e = a(n);
                            return i(null, e)
                        }, n.open("PATCH", o + "/" + e, !0), n.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), n.send(JSON.stringify({
                            player_id: t,
                            action: "ACCEPT"
                        }))
                    },
                    update: function(e, t, i, n) {
                        if (!e) return n(new Error("update - referralID param missing or invalid"));
                        if (!t) return n(new Error("update - originPlayerID (player id of the original player who created the referral) param missing or invalid"));
                        if (!i) return n(new Error("update - data object param missing or invalid"));
                        var r = new XMLHttpRequest;
                        r.onload = function() {
                            if (200 != r.status) return n(r.status, r.response);
                            var e = a(r);
                            return n(null, e)
                        }, r.open("PATCH", o + "/" + e, !0), r.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), r.send(JSON.stringify({
                            player_id: t,
                            action: "UPDATE",
                            data: i
                        }))
                    },
                    delete: function(e, t) {
                        if (!e) return t(new Error("delete - referralID param missing or invalid"));
                        var i = new XMLHttpRequest;
                        i.onload = function() {
                            if (200 != i.status) return t(i.status, i.response);
                            var e = i.response;
                            return t(null, e)
                        }, i.open("DELETE", o + "/" + e, !0), i.send()
                    },
                    checkCanAccept: function(e, t, i) {
                        if (!e) return i(new Error("checkCanAccept - referralID param missing or invalid"));
                        if (!t) return i(new Error("checkCanAccept - playerID param missing or invalid"));
                        var n = new XMLHttpRequest;
                        n.onload = function() {
                            if (200 != n.status) return i(n.status, n.response);
                            var e = n.response;
                            return i(null, e)
                        }, n.open("GET", o + "/" + e + "/" + t, !0), n.send()
                    },
                    getAllReferrals: function(e, t) {
                        if (!e) return t(new Error("getAllReferrals - playerID param missing or invalid"));
                        var i = new XMLHttpRequest;
                        i.onload = function() {
                            if (200 != i.status) return t(i.status, i.response);
                            var e = a(i, !0);
                            return t(null, e)
                        }, i.open("GET", o + "/target/" + e, !0), i.send()
                    },
                    acceptAllReferrals: function(e, i) {
                        if (!e) return i(new Error("acceptAllReferrals - playerID param missing or invalid"));
                        var n = new XMLHttpRequest;
                        n.onload = function() {
                            if (200 != n.status) return i(n.status, n.response);
                            for (var e = a(n), t = 0; t < e.accepted.length; t++) "string" == typeof e.accepted[t].data && (e.accepted[t].data = JSON.parse(e.accepted[t].data));
                            return i(null, e)
                        }, n.open("PATCH", o + "/target/" + e, !0), n.send()
                    },
                    deleteAllReferrals: function(e, t) {
                        if (!e) return t(new Error("deleteAllReferrals - playerID param missing or invalid"));
                        var i = new XMLHttpRequest;
                        i.onload = function() {
                            if (200 != i.status) return t(i.status, i.response);
                            var e = a(i);
                            return t(null, e)
                        }, i.open("DELETE", o + "/target/" + e, !0), i.send()
                    }
                }
            }
        }(this), (g = (t = this).XS = t.XS || {}).crosspromo = new function() {
            return {
                config: null,
                game: null,
                playerID: null,
                init: function(e, t) {
                    var i, n, r, o = this;
                    this.playerID = t || null, i = function() {
                        o.getConfig(o.game, function(e, t) {
                            if (e) return console.warn(e);
                            o.config = t, g.emit("CrossPromoLoaded")
                        })
                    }, n = 0, r = setInterval(function() {
                        n < 4 && !o.game ? (ze && (o.game = ze.id), n++) : (clearInterval(r), e && (o.game = e), i())
                    }, 100)
                },
                parseUTM: function() {
                    return {
                        source: Host.Web.GetQueryString("utm_source"),
                        medium: Host.Web.GetQueryString("utm_medium"),
                        campaign: Host.Web.GetQueryString("utm_campaign"),
                        content: Host.Web.GetQueryString("utm_content")
                    }
                },
                getConfig: function(u, f) {
                    if (!u) return f(new Error("Game name parameter not provided e.g., getConfig('rocketpope', function(e, r) { return r })"));
                    if (this.config) return console.log("Remote crosspromo config already fetched, so the fetched config will be used instead."), f(null, this.config);
                    var p = new XMLHttpRequest;
                    p.onload = function() {
                        if (200 != p.status) return f(new Error(p.status), p.response);
                        var e, t, i, n = JSON.parse(p.response),
                            r = function(e, i) {
                                var t = {
                                        ab_tests: {}
                                    },
                                    n = [],
                                    r = [];
                                if (i || "function" != typeof ga || ga(function(e) {
                                        var t = e.get("userId") || e.get("clientId");
                                        t && (i = 1 * t.toString().replace(/\D/g, "").substr(-15))
                                    }), !i) return console.warn("No GA userID or clientID retrieved so no remote cross promo config containing ab_tests will be used!");
                                for (var o in e) {
                                    var a = e[o].ab_test_name || "standardCrosspromo";
                                    a && e[o].active && (t.ab_tests[a] || (n.push(a), t.ab_tests[a] = {
                                        cohorts: []
                                    }), t.ab_tests[a].cohorts.push(e[o].cohort))
                                }
                                if (0 !== n.length && "standardCrosspromo" !== n[0]) {
                                    if (!1 === g.abtest.initialized) g.abtest.init(i, t.ab_tests);
                                    else
                                        for (var s in n) {
                                            var l = n[s];
                                            g.abtest.addTest(i, l, t.ab_tests[l].cohorts, !0)
                                        }
                                    for (var h in n) r.push({
                                        test_name: n[h],
                                        cohort: g.abtest.cohort(n[h])
                                    });
                                    return r
                                }
                            }(n, this.playerID),
                            o = [];
                        for (var a in n)
                            if (n[a].active) {
                                n[a].cohort || (n[a].cohort = "standard");
                                var s = (e = ze && ze.id ? ze.id : u, t = n[a].cohort, (i = void 0) || (i = g.track.getChannel()), "utm_source=" + i + "&utm_medium=crosspromotion&utm_campaign=" + e + "&utm_content=" + t);
                                if (n[a].web)
                                    for (var l in n[a].web) {
                                        var h = n[a].web[l],
                                            d = h.webUrl ? h.webUrl.split("?") : null;
                                        d && (h.webUrl = d[0] !== h.webUrl ? h.webUrl + "&" + s : h.webUrl + "?" + s)
                                    }
                                for (var c in r) n[a].ab_test_name === r[c].test_name && n[a].cohort === r[c].cohort && (o.push(n[a]), console.log("Remote cross-promo config for cohort [" + r[c].cohort + "] fetched!"))
                            } return 0 < o.length || (console.log("Remote cross promo config with no ab_test fetched!"), o.push(n[0])), f(null, o)
                    }, p.open("GET", "https://bucket.frvr.com/config/" + u + ".json", !0), p.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), p.send()
                }
            }
        },
        function(e) {
            function i() {}

            function f(t) {
                if ("function" != typeof t) return i;
                if (!0 === t.__isCallbackOnce) return t;

                function e() {
                    if ("function" == typeof t) {
                        var e = t;
                        t = void 0;
                        try {
                            return e.apply(this, arguments)
                        } catch (e) {
                            throw window.onerror && window.onerror("Error in callbackOnce: " + (e.message || e.toString()), e), e
                        }
                    }
                    window.onerror && window.onerror("Warning, callback called more then once.")
                }
                return e.__isCallbackOnce = !0, e.__isSafeCallback = !0, e
            }

            function p() {
                var t = this;
                t._system = void 0, t._log = void 0, t._track = void 0, t._placement = "", t._opts = void 0, t._retriesLeft = 0, t._providerCallTimeoutId = void 0, t.__state = "init", Object.defineProperty(t, "_state", {
                    set: function(e) {
                        t._log("Ad: " + t._placement + " state: " + t.__state + " -> " + e), t.__state = e
                    },
                    get: function() {
                        return t.__state
                    }
                }), t._providerConfigs = void 0, t._providerIndex = 0, t._provider = void 0, t._preloadedProviders = [], t._prioritizedProviderError = p.PRIOTITY_PROVIDER_ERROR[0], t.id = -1, t.format = "interstitial", t.testMode = !1, t.config = void 0, t.params = void 0
            }
            console.log("Ads: Loading XS-ads.js"), i.__isCallbackOnce = !0, p.PRIOTITY_PROVIDER_ERROR = ["nofill", "error", "blocked"], p.prototype._setupProvider = function(e) {
                var t = this;
                e && (t._providerIndex++, t._providerIndex == t._providerConfigs.length && (t._providerIndex = 0));
                var i = t._providerConfigs[t._providerIndex];
                t._provider = i.provider, t.config = i.config
            }, p.prototype._configure = function(e, t, i, n, r) {
                var o = this;
                o._system = e, o._log = e._log, o._track = e._track, o._onFinalCB = r, o._placement = t, o._opts = i, o.id = e._adsCounter, o.format = i.format, o.testMode = e._testMode, o.params = i.params, o._providerConfigs = n, o._providerIndex = 0, o._setupProvider(!1), o._retriesLeft = i.maxRetries
            }, p.prototype._reConfigure = function(e, t, i, n) {
                var r = this;
                if (r._onFinalCB = n, r._opts = e, r._providerConfigs = t, r._retriesLeft = e.maxRetries, i) {
                    for (var o = 0, a = !1, s = 0; s < t.length; s++) {
                        var l = t[s];
                        if (r._provider == l.provider && r.config == l.config) {
                            o = s, a = !0;
                            break
                        }
                    }
                    a || r._log("Could not find matching provider index for provider: " + r._provider.name + ", please check"), r._providerIndex = o
                } else r._providerIndex = 0;
                r._setupProvider(!1)
            }, p.prototype._onRunFinished = function(e, t) {
                if (void 0 === this._system) throw new Error("Ad._onRunFinished: Called _onRunFinished with system = undefined.");
                this._system._onAdRunFinished(this, e, t, this._onFinalCB)
            }, p.prototype._run = function() {
                var t = this,
                    i = !0;
                if (t._opts.show) {
                    -1 < (e = t._checkIfSavedPreload()) && (t._preloadedProviders.splice(e, 1), t._state = "preloaded", t._log("Retrieved saved preload state")), t._provider.supportsPreload && "init" == t._state && (i = !1)
                } else {
                    if (!t._provider.supportsPreload) return t._log("Cannot preload as provider does not support preloading"), void t._retry("error");
                    if ("preloaded" == t._state) return t._log("Trying to preload an already preloaded ad"), void t._onRunFinished("success", t._opts.show);
                    var e;
                    if (-1 < (e = t._checkIfSavedPreload())) return t._preloadedProviders.splice(e, 1), t._state = "preloaded", t._log("Retrieved saved preload state"), void t._onRunFinished("success", t._opts.show);
                    i = !1
                }
                var n = i ? "show" : "preload";
                t._log("Attempt " + (t._opts.maxRetries - t._retriesLeft + 1) + " of " + t._opts.maxRetries + " using provider: " + t._provider.name + " - run type: " + n);
                try {
                    t._provider.isBlocked() ? (t._track(t.format, "blocked", void 0, {
                        provider: t._provider.name
                    }), t._retry("blocked")) : (t._startProviderCallTimeout(i), i ? (t._state = "showing", t._provider.show(t)) : (t._state = "preloading", t._provider.preload(t)))
                } catch (e) {
                    var r = t._provider.name + "/" + t._placement + "/" + +t._state,
                        o = "Failure to " + n + " ad: " + r + " > error: " + e.message;
                    window.onerror && window.onerror(o, e), t._log(o + "; error url: " + e.sourceURL + ", error line: " + e.line);
                    try {
                        t._provider.onError(t)
                    } catch (e) {
                        t._log("Found an issue while cleaning up provider: " + t._provider.name + " error message: " + e.message + " , error url: " + e.sourceURL + ", error line: " + e.line);
                        o = "Failure in ad._provider.onError ad: " + r + " > error: " + e.message;
                        window.onerror && window.onerror(o, e)
                    }
                    var a = i ? "finish" : "response";
                    t._track(t.format, a, "error", {
                        provider: t._provider.name
                    }), t._retry("error")
                }
            }, p.prototype._savePreloaded = function() {
                var e = this;
                e._log("Provider: " + e._provider.name + " - preloaded ad is being saved for later use"), e._preloadedProviders = e._preloadedProviders || [], e._preloadedProviders.push({
                    provider: e._provider,
                    config: e.config
                })
            }, p.prototype._checkIfSavedPreload = function() {
                for (var e = this, t = -1, i = 0; i < e._preloadedProviders.length; i++) {
                    var n = e._preloadedProviders[i];
                    if (n.provider == e._provider && n.config == e.config) {
                        t = i;
                        break
                    }
                }
                return -1 < t && e._log("Found saved preload at index: " + t), t
            }, p.prototype._startProviderCallTimeout = function(i) {
                var n = this;
                n._providerCallTimeoutId = setTimeout(function() {
                    n._log("Provider: " + n._provider.name + " has timed out, id: " + n._providerCallTimeoutId), n._stopProviderCallTimeout();
                    try {
                        n._provider.onTimeout(n);
                        var t = i ? "finish" : "response";
                        n._track(n.format, t, "timedout", {
                            provider: n._provider.name
                        }), n._retry("error")
                    } catch (e) {
                        n._log("Failure to timeout ad with placement name: " + n._placement + " using provider: " + n._provider.name + " error message: " + e.message + " , error url: " + e.sourceURL + ", error line: " + e.line), window.onerror && window.onerror("Failure to timeout ad with placement name: " + n._placement + " using provider: " + n._provider.name + " error info: " + e.message, e);
                        try {
                            n._provider.onError(n)
                        } catch (e) {
                            n._log("Found an issue while cleaning up provider: " + n._provider.name + " error message: " + e.message + " , error url: " + e.sourceURL + ", error line: " + e.line), window.onerror && window.onerror("Found an issue while cleaning up provider: " + n._provider.name + ", error info: " + e.message, e)
                        }
                        t = i ? "finish" : "response";
                        n._track(n.format, t, "error", {
                            provider: n._provider.name
                        }), n._retry("error")
                    }
                }, n._opts.timeoutInterval)
            }, p.prototype._stopProviderCallTimeout = function() {
                var e = this;
                e._providerCallTimeoutId && (e._log("Provider call timeout being reset, id: " + e._providerCallTimeoutId), clearTimeout(e._providerCallTimeoutId)), e._providerCallTimeoutId = void 0
            }, p.prototype._retry = function(e) {
                var t = this;
                if (t._retriesLeft--, t._updatePrioritizedProviderError(e), t._retriesLeft <= 0) return t._state = "init", t._log("No retries left, reporting result"), void t._onRunFinished(t._prioritizedProviderError, t._opts.show);
                t._log("Ad with placement name: " + t._placement + " will retry in " + t._opts.retryInterval + " milliseconds"), setTimeout(function() {
                    t._state = "init", t._setupProvider(!0), t._run()
                }, t._opts.retryInterval)
            }, p.prototype._updatePrioritizedProviderError = function(e) {
                var t = p.PRIOTITY_PROVIDER_ERROR.indexOf(e); - 1 != t ? p.PRIOTITY_PROVIDER_ERROR.indexOf(this._prioritizedProviderError) < t && (this._prioritizedProviderError = e) : this._log("Could not prioritize error: " + e + " - unknown error type, please prioritize for usage")
            };
            var t = {
                INTERST_FIRST_SHOW_TIMEOUT: 1e4,
                INTERST_NEXT_SHOW_TIMEOUT: 3e4,
                REWARD_FIRST_SHOW_TIMEOUT: 0,
                REWARD_NEXT_SHOW_TIMEOUT: 0,
                _testMode: !(p.prototype.complete = function() {
                    this._state = "done"
                }),
                _providers: {},
                _queue: [],
                _options: {},
                _adsCounter: 0,
                _ads: {},
                _isOverlayed: !1,
                _isFrozen: !1,
                _isShowing: !1,
                _throttling: {
                    interstitial: {
                        systemStart: (new Date).getTime(),
                        lastShow: {}
                    },
                    reward: {
                        systemStart: (new Date).getTime(),
                        lastShow: {}
                    }
                },
                setTestMode: function(e) {
                    this._testMode = e
                },
                preload: function(e, t, i) {
                    t = f(t);
                    var n = this;
                    (i = n._sanitizeOpts(i)).show = !1, e || (e = i.format + "_all"), n._log("Starting a preload - placement: " + e + " options: " + JSON.stringify(i));
                    var r = n._getAd(e);
                    if (r) return n._log("Could not preload ad - ad with placement name '" + e + "' already exists with state '" + r._state + "'"), void(t && t("error"));
                    var o = n._getProviderConfigs(e, i.format, !0);
                    o ? (n._adsCounter++, r = new p, (n._ads[e] = r)._configure(n, e, i, o, t), r._run()) : t && t("error")
                },
                show: function(e, t, i) {
                    t = f(t);
                    var n = this;
                    if (n._isShowing) return n._log("Could not show ad - ad is currently showing."), t("error");
                    (i = n._sanitizeOpts(i)).show = !0, e || (e = i.format + "_all"), n._log("Starting a show - placement: " + e + " options: " + JSON.stringify(i));
                    var r = n._isShowingAd();
                    if (r) return n._log("Could not show ad - ad with placement name '" + r + "' is currently showing."), void(t && t("error"));
                    var o = i.format,
                        a = n._getProviderConfigs(e, o, !1);
                    if (!a) return console.warn("XS.ads: Provider config does not exist for: ", {
                        placement: e,
                        format: o
                    }, this._queue), void(t && t("error"));
                    if (!i.showForce) {
                        var s = n._throttling[i.format].systemStart,
                            l = n._throttling[i.format].lastShow,
                            h = s + i.showFirstDelay,
                            d = (new Date).getTime();
                        if (d < h) return n._log("Throttled an ad '" + e + "' - not allowed for another " + (h - d) / 1e3 + " secs - reason: first show throttle"), n._track(i.format, "throttled", "first"), void(t && t("throttled"));
                        if (l.hasOwnProperty(e) && l[e]) {
                            var c = l[e] + i.showNextDelay;
                            if (d < c) return n._log("Throttled an ad '" + e + "' - not allowed for another " + (c - d) / 1e3 + " secs - reason: show throttle"), n._track(i.format, "throttled", "next"), void(t && t("throttled"))
                        }
                    }
                    n._isShowing = !0, n._toggleOverlay(!0), n._toggleFreeze(!0), g.muteAll();
                    var u = n._getAd(e);
                    if (!u) return n._adsCounter++, u = new p, (n._ads[e] = u)._configure(n, e, i, a, t), void u._run();
                    if (n._log("Showing with showPref: " + i.showPref + ", state: " + u._state), "priority" == i.showPref) switch (u._state) {
                        case "init":
                            u._reConfigure(i, a, !1, t), u._run();
                            break;
                        case "preloading":
                            u._onRunFinished("interrupted", !1), u._reConfigure(i, a, !1, t);
                            break;
                        case "preloaded":
                            u._savePreloaded(), u._reConfigure(i, a, !1, t), u._run()
                    } else switch (u._state) {
                        case "init":
                            u._reConfigure(i, a, !1, t), u._run();
                            break;
                        case "preloading":
                            u._onRunFinished("interrupted", !1), u._reConfigure(i, a, !1, t);
                            break;
                        case "preloaded":
                            u._reConfigure(i, a, !0, t), u._run()
                    }
                },
                force: function(e, t, i) {
                    t = f(t), (i = i || {}).showForce = !0, this.show(e, t, i)
                },
                isPreloaded: function(e, t) {
                    t = t || "interstitial", e || (e = t + "_all");
                    var i = this._getAd(e);
                    return !!i && "preloaded" == i._state
                },
                addProvider: function(e) {
                    var i = this;
                    if (i._providers[e.name]) this._log("Ad provider already registered: ", e);
                    else {
                        var t = {
                            request: function(e) {
                                i._onRequestCB(e)
                            },
                            response: function(e, t) {
                                i._onResponseCB(e, t)
                            },
                            show: function(e) {
                                i._onShowCB(e)
                            },
                            finish: function(e, t) {
                                i._onFinishCB(e, t)
                            }
                        };
                        e.callbacks = t, e.log = function(e) {
                            i._log(e)
                        }, e.setup && e.setup(), i._providers[e.name] = e, i._queue.push(e), i._sortProviders()
                    }
                },
                _log: function(e) {},
                _sanitizeOpts: function(e) {
                    return (e = e || {}).format = e.format || "interstitial", e.timeoutInterval = e.timeoutInterval || 5e3, e.maxRetries = e.maxRetries || 1, e.retryInterval = e.retryInterval || 1e3, e.show = e.show || !1, e.showPref = e.showPref || "priority", "interstitial" == e.format ? (void 0 === e.showFirstDelay && (e.showFirstDelay = ze.interstitialShowThrottleFirstDelay), void 0 === e.showFirstDelay && (e.showFirstDelay = t.INTERST_FIRST_SHOW_TIMEOUT), void 0 === e.showNextDelay && (e.showNextDelay = ze.interstitialShowThrottleNextDelay), void 0 === e.showNextDelay && (e.showNextDelay = t.INTERST_NEXT_SHOW_TIMEOUT)) : (void 0 === e.showFirstDelay && (e.showFirstDelay = ze.rewardAdShowThrottleFirstDelay), void 0 === e.showFirstDelay && (e.showFirstDelay = t.REWARD_FIRST_SHOW_TIMEOUT), void 0 === e.showNextDelay && (e.showNextDelay = ze.rewardAdShowThrottleNextDelay), void 0 === e.showNextDelay && (e.showNextDelay = t.REWARD_NEXT_SHOW_TIMEOUT)), e.showForce = e.showForce || !1, e.params = e.params || {}, e
                },
                _getAd: function(e) {
                    if (this._ads.hasOwnProperty(e) && this._ads[e]) {
                        var t = this._ads[e];
                        return this._log("Ad with placement '" + e + "' matched ad with id '" + t.id + "'"), t
                    }
                },
                _isShowingAd: function() {
                    for (var e in this._ads) {
                        var t = this._getAd(e);
                        if (t && "showing" == t._state) return e
                    }
                },
                _track: function(e, t, i, n) {
                    this._log("Firing tracking call: " + t + ", format: " + e + (i ? ", result: " + i : "") + (n ? ", params: " + JSON.stringify(n) : "")), void 0 === i ? g.track.ad(e, t, void 0, n) : g.track.ad(e, t, i, void 0, n)
                },
                _getConfig: function(e, t, i) {
                    if (ze.adIds && ze.adIds[i.name] && ze.adIds[i.name][e] && ze.adIds[i.name][e].format && ze.adIds[i.name][e].format === t && ze.adIds[i.name][e].config) return ze.adIds[i.name][e].config
                },
                _sortProviders: function() {
                    this._queue.sort(function(e, t) {
                        var i = e.priority || 0,
                            n = t.priority || 0;
                        return i < n ? 1 : i == n ? 0 : n < i ? -1 : void 0
                    }), this._log("Registered ad providers: " + this._queue.length)
                },
                _getProviderConfigs: function(e, t, i) {
                    if (0 != this._queue.length) {
                        for (var n = [], r = 0; r < this._queue.length; r++) {
                            var o = this._queue[r];
                            if (o.supportsFormat(t))
                                if (!i || o.supportsPreload) {
                                    var a = this._getConfig(e, t, o);
                                    this._log("Provider: '" + o.name + "', mapped ad name: '" + e + "' to: " + JSON.stringify(a)), a ? n.push({
                                        provider: o,
                                        config: a
                                    }) : this._log("Could not preload ad - placement configuration for selected provider '" + o.name + "' is missing")
                                } else this._log("Could not preload ad - provider '" + o.name + "' does not support preloading");
                            else this._log("Could not preload ad - provider '" + o.name + "' does not support format")
                        }
                        if (0 != n.length) return this._log("There are " + n.length + " eligible provider(s)"), n;
                        this._log("There are no eligible providers - all filtered out")
                    } else this._log("There are no eligible providers - none registered")
                },
                _onRequestCB: function(e) {
                    var t = e._placement;
                    this._log("Ad 'onRequest' - id: " + e.id + ", placement: " + t), this._getAd(t) || this._log("Ad for placement: " + t + " with id: " + e.id + " is not available!"), this._track(e.format, "request", void 0, {
                        provider: e._provider.name
                    })
                },
                _onResponseCB: function(e, t) {
                    var i = e._placement;
                    switch (this._log("Ad 'onResponse' - id: " + e.id + ", placement: " + i + ", result: " + t), this._getAd(i) || this._log("Ad for placement: " + i + " with id: " + e.id + " is not available!"), e._stopProviderCallTimeout(), this._track(e.format, "response", t, {
                            provider: e._provider.name
                        }), t) {
                        case "success":
                            e._state = "preloaded", e._opts.show ? (e._log("Showing after preload"), e._run()) : e._onRunFinished(t, e._opts.show);
                            break;
                        default:
                            this._log("Unhandled result state: '" + t + "', please check");
                        case "nofill":
                        case "error":
                        case "blocked":
                            e._retry(t)
                    }
                },
                _onShowCB: function(e) {
                    var t = e._placement;
                    this._log("Ad 'onShow' - id: " + e.id + ", placement: " + t), this._getAd(t) || this._log("Ad for placement: " + t + " with id: " + e.id + " is not available!"), e._stopProviderCallTimeout(), this._track(e.format, "show", void 0, {
                        provider: e._provider.name
                    }), this._hideLoadSpinner()
                },
                _onFinishCB: function(e, t) {
                    var i = e._placement;
                    switch (this._log("Ad 'onFinish' - id: " + e.id + ", placement: " + i + ", result: " + t), this._getAd(i) || this._log("Ad for placement: " + i + " with id: " + e.id + " is not available!"), e._stopProviderCallTimeout(), this._track(e.format, "finish", t, {
                            provider: e._provider.name
                        }), t) {
                        case "success":
                        case "skipped":
                        case "ratelimited":
                            e._onRunFinished(t, e._opts.show);
                            break;
                        default:
                            this._log("Unhandled result state: '" + t + "', please check");
                        case "nofill":
                        case "error":
                        case "blocked":
                            e._retry(t)
                    }
                },
                _outputSystemStatus: function() {},
                _onAdRunFinished: function(e, t, i, n) {
                    var r = this;

                    function o() {
                        r._isShowing = !1, g.unmuteAll(), i && (r._toggleFreeze(!1), r._toggleOverlay(!1)), r._outputSystemStatus(), n && n(t)
                    }
                    if (r._log("Ad '" + (i ? "show" : "preload") + "' run finished with result: " + t), i) switch (t) {
                        case "success":
                        case "skipped":
                            var a = r._throttling[e.format];
                            a.systemStart && (a.systemStart = 0), a.lastShow[e._placement] = (new Date).getTime(), e.complete(), delete r._ads[e._placement], o();
                            break;
                        default:
                            r._log("Unhandled ad run result: " + t + " - please handle properly");
                        case "nofill":
                        case "error":
                        case "blocked":
                            o()
                    } else switch (t) {
                        default:
                            r._log("Unhandled ad run result: " + t + " - please handle properly");
                        case "success":
                        case "nofill":
                        case "error":
                        case "blocked":
                        case "interrupted":
                            o()
                    }
                },
                _toggleOverlay: function(e) {
                    e ? (g.loadSpinner && g.loadSpinner.show(), this._isOverlayed = !0) : this._isOverlayed && (this._isOverlayed = !1, g.loadSpinner && g.loadSpinner.hide())
                },
                _hideLoadSpinner: function() {
                    this._isOverlayed && g.loadSpinner && g.loadSpinner.hideSpinner()
                },
                _toggleFreeze: function(e) {
                    e ? (g.freeze(), this._isFrozen = !0) : this._isFrozen && (this._isFrozen = !1, g.unfreeze())
                }
            };
            e.XS = e.XS || {};
            var g = e.XS;
            g.ads = t
        }(this), window.vpath = window.vpath || "./", document.body.addEventListener("MSHoldVisual", function(e) {
            e.preventDefault()
        }, !1), document.body.addEventListener("contextmenu", function(e) {
            e.preventDefault()
        }, !1), document.addEventListener && document.addEventListener("ontouchmove", function(e) {
            e && e.preventDefault()
        }, !1), Array.from || (Array.from = function(e) {
            return [].slice.call(e)
        }), Math.hypot || (Math.hypot = function() {
            for (var e = 0, t = arguments.length; t--;) e += arguments[t] * arguments[t];
            return Math.sqrt(e)
        });
    var De = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function(e) {
        return setTimeout(e, 1e3 / 60)
    };
    window.ga || (window.ga = function() {}), window.gax || (window.gax = function() {});
    var Be = {
        cached: {
            name: "cached",
            events: void 0
        },
        forced: {
            name: "forced",
            events: ["resize", "login", "login-error", "save", "logout", "FBInstantStart", "FBInstantComplete", "mutemusic", "mutesound", "dataloaded", "datasaved"]
        },
        transient: {
            name: "transient",
            events: ["down", "rightdown", "up", "rightup", "move", "tick", "animate", "render"]
        }
    };

    function o(e, t) {
        return (t = t || {}).eventType && t.eventType in Be || (t.eventType = Be.cached.name, -1 < Be.forced.events.indexOf(e) ? t.eventType = Be.forced.name : -1 < Be.transient.events.indexOf(e) && (t.eventType = Be.transient.name)), t.freezeGroup = t.freezeGroup || this._defFrzGrp, t
    }

    function n(e, t, i) {
        this.emit("eventAttached", {
            eventName: e
        }), this.__listeners = this.__listeners || {}, this.__listeners[e] = this.__listeners[e] || [];
        var n = {
            callback: t,
            frzGrp: (i = o(e, i)).freezeGroup,
            eventType: i.eventType
        };
        return this.__listeners[e].push(n), this
    }
    Object.defineProperty(Object.prototype, "on", {
            enumerable: !1,
            get: function() {
                return this.___on || n
            },
            set: function(e) {
                this.___on = e
            }
        }), Object.defineProperty(Object.prototype, "emit", {
            enumerable: !1,
            value: function(t, e) {
                var i = (this.__listeners || {})[t];
                if (i && i.length) {
                    for (var n = [], r = 0; r < i.length; r++) n.push(i[r]);
                    for (r = 0; r < n.length; r++) {
                        var o = {
                            name: t,
                            cbData: e,
                            frzGrp: n[r].frzGrp,
                            type: n[r].eventType
                        };
                        try {
                            void 0 !== this._freezeEmit && this._freezeEmit(o) || n[r].callback.call(this, e)
                        } catch (e) {
                            window.onerror && window.onerror(e.toString(), "Event: " + t, e.line, e.column, ""), console.error(e.toString(), "Event: " + t, e.line, e.column, "Failure in", n[r])
                        }
                    }
                }
                return this
            },
            writable: !0
        }), Object.defineProperty(Object.prototype, "off", {
            enumerable: !1,
            value: function(e, t, i) {
                i = o(e, i);
                for (var n = (this.__listeners || {})[e] || [], r = 0; r < n.length; r++)(n[r].callback === t && n[r].frzGrp === i.freezeGroup || void 0 === t) && n.splice(r--, 1);
                return n.length || delete(this.__listeners || {})[e], this.emit("eventRemoved", {
                    eventName: e
                }), this
            },
            writable: !0
        }), Object.defineProperty(Object.prototype, "once", {
            enumerable: !1,
            value: function(i, n, r) {
                return r = o(i, r), this.on(i, function e(t) {
                    this.off(i, e, r), n.call(this, t)
                }, r), this
            },
            writable: !0
        }), Object.defineProperty(Function.prototype, "expand", {
            enumerable: !1,
            value: function(e) {
                return e.prototype = Object.create(this.prototype), e.prototype.constructor = e
            }
        }),
        function(p) {
            p.XS = p.XS || {};
            var S = p.XS;
            S.LOG_SPAM_EVENT_EXCLUDE = S.LOG_SPAM_EVENT_EXCLUDE || [], S.LOG_SPAM_EVENT_EXCLUDE.push("resize");
            var g = Oe();
            Oe = void 0, p.width = 150, p.height = 150, S.on("gameLoaded", function() {
                S.is.facebookInstant && "undefined" != typeof FBInstant && FBInstant.logEvent && (0 < g.frvrGLErrors.TOTAL_ERRORS && FBInstant.logEvent("webgl_errors", 1, {
                    OUT_OF_MEMORY: g.frvrGLErrors.OUT_OF_MEMORY,
                    INVALID_ENUM: g.frvrGLErrors.INVALID_ENUM,
                    INVALID_VALUE: g.frvrGLErrors.INVALID_VALUE,
                    INVALID_OPERATION: g.frvrGLErrors.INVALID_OPERATION,
                    INVALID_FRAMEBUFFER_OPERATION: g.frvrGLErrors.INVALID_FRAMEBUFFER_OPERATION,
                    CONTEXT_LOST_WEBGL: g.frvrGLErrors.CONTEXT_LOST_WEBGL
                }), FBInstant.logEvent("pixi_renderer", 1, {
                    renderer: S.is.usingCanvasRenderer ? "canvas" : S.is.usingWebGLRenderer ? "webgl" : "unknown"
                }))
            }), S.modulesToPreload = [], S.ignoreCursorChanges = !1, S.dirty = !1;
            var r, h = {},
                d = {
                    _textureCache: {}
                };

            function a(e) {
                this.name = e, this.frc = 0, this.handlers = {}
            }

            function i() {
                return S.isFrozen(a.GLB_GRP_NAME)
            }
            Host.Log("User Agent: " + navigator.userAgent), S.assets = {}, S.assets.loadAsync = function(e, t) {
                var i = e.slice(0);
                i.push(function() {
                    t && t(e)
                }), p.preload.apply(window, i)
            }, S.is = new function(e, t, i, n) {
                var r, o = this;
                o.android = /(android)/i.test(i) && !/(Windows)/i.test(i), o.androidVersion = (r = navigator.userAgent.toLowerCase().match(/android\s([0-9\.]*)/), parseFloat(r ? r[1] : 0)), o.firefoxMobile = /(Mobile)/i.test(i) && /(Firefox)/i.test(i), o.slow = o.android && o.androidVersion < 5, o.iOS = /(ipod|iphone|ipad)/i.test(i), o.windowsMobile = /(IEMobile)/i.test(i), o.silk = /(silk)/i.test(i), o.clay = /(clay\.io)/i.test(n), o.facebookApp = /(fb_canvas)/i.test(n), o.facebookAppWeb = /(fb_canvas_web)/i.test(n), o.iframed = e.top !== e.self, o.standalone = "standalone" in t && t.standalone, o.mobileiOSDevice = i.match(/iPhone/i) || i.match(/iPod/i), o.kongregate = /(kongregateiframe)/i.test(n), o.kik = /(kik_canvas)/i.test(n), o.twitter = /(twitter)/gi.test(i), o.chrome = /Chrome\//.test(i), o.safari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/), o.secureConnection = 0 == window.location.protocol.indexOf("https"), o.facebookInstant = window.Host && "instant" == window.Host.Type, o.spilGamesWrapper = /(spilgames)/i.test(n), o.partnerGamesWrapperId = Host.Web.GetQueryString("partnerid"), o.social = "on" == Host.Web.GetQueryString("social"), o.advertisementIsDisabled = "off" == Host.Web.GetQueryString("ads"), o.advertisementInterstitialDisabled = "off" == Host.Web.GetQueryString("int"), o.advertisementOverlayEnabled = !o.iframed || o.spilGamesWrapper || o.partnerGamesWrapperId, o.nosoc = "1" == Host.Web.GetQueryString("nosoc"), o.facebookAd = /(\/\?fb)/i.test(n), o.mobile = o.android || o.windowsMobile || o.iOS || o.silk || o.firefoxMobile, o.iOSWrapper = e.iOSWrapper || !1, o.iPhoneXOrLater = "true" == Host.Web.GetQueryString("iPhoneXOrLater"), o.iMessageContext = "true" == Host.Web.GetQueryString("iMessage"), o.androidWrapper = e.androidWrapper || !1, o.chromeWrapper = e.isChromeWrapper || !1, o.appWrapper = e.iOSWrapper || e.androidWrapper, o.samsungAppStore = "samsung" == Host.Web.GetQueryString("androidStore"), o.usingWebGLRenderer = !1, o.usingCanvasRenderer = !1, o.twitch = "" == Host.Web.GetQueryString("twitch"), o.poki = window.Host && "poki" == window.Host.Type, o.vkru = "" == Host.Web.GetQueryString("vkru"), o.okru = "" == Host.Web.GetQueryString("okru"), o.pwa = "" == Host.Web.GetQueryString("pwa"), o.windowsApp = "" == Host.Web.GetQueryString("windowsapp"), o.enableAppStoreLinks = !0, o.samsungGalaxyStorePWA = "" == Host.Web.GetQueryString("samsung") && "galaxystore" == Host.Web.GetQueryString("source"), o.samsungGameLauncherPWA = ("" == Host.Web.GetQueryString("pwa") || "" == Host.Web.GetQueryString("samsung")) && "gamelauncher" == Host.Web.GetQueryString("source"), o.samsungBixby = "" == Host.Web.GetQueryString("samsung") && !o.samsungGalaxyStorePWA, o.samsungBrowserUK = "" == Host.Web.GetQueryString("samsungbuk"), o.samsungBrowserUS = "" == Host.Web.GetQueryString("samsungbus"), o.samsungBrowserSEA = "" == Host.Web.GetQueryString("samsungbsea"), o.samsungBrowser = "" == Host.Web.GetQueryString("samsungbrowser"), o.rcs = Host.Web.GetQueryString("rcsid"), o.rcsKr = "" == Host.Web.GetQueryString("rcskr"), o.huaweiquickapp = "" == Host.Web.GetQueryString("huaweiquickapp"), o.huawei = "" == Host.Web.GetQueryString("huawei") || o.huaweiquickapp, o.mozilla = "" == Host.Web.GetQueryString("mozilla"), o.miniclip = "" == Host.Web.GetQueryString("miniclip"), o.chromeOSDevice = "true" == Host.Web.GetQueryString("isChromeOSDevice"), o.progressiveWebAppEnabled = !(o.chromeOSDevice || o.iframed || o.appWrapper || o.twitch || o.vkru || o.okru || o.facebookInstant), o.opera = !!e.opr && !!e.opr.addons || !!e.opera || 0 <= i.indexOf(" OPR/"), o.firefox = void 0 !== e.InstallTrigger, o.edge = /(edge|edgios|edga)\/((\d+)?[\w\.]+)/i.test(i)
            }(window, navigator, navigator.userAgent, document.location), S.abtest = new function() {
                var s = this;
                s.initialized = !1, s.forcedCohorts = {}, s.abTestCohorts = {}, s.validCohorts = {};
                var l = [],
                    h = function() {
                        for (var h = [], e = 0; e < 64;) h[e] = 0 | 4294967296 * Math.abs(Math.sin(++e));
                        return function(e) {
                            for (var t, i, n, r, o = [], a = (e = unescape(encodeURI(e))).length, s = [t = 1732584193, i = -271733879, ~t, ~i], l = 0; l <= a;) o[l >> 2] |= (e.charCodeAt(l) || 128) << l++ % 4 * 8;
                            for (o[e = 16 * (a + 8 >> 6) + 14] = 8 * a, l = 0; l < e; l += 16) {
                                for (a = s, r = 0; r < 64;) a = [n = a[3], (t = 0 | a[1]) + ((n = a[0] + [t & (i = a[2]) | ~t & n, n & t | ~n & i, t ^ i ^ n, i ^ (t | ~n)][a = r >> 4] + (h[r] + (0 | o[[r, 5 * r + 1, 3 * r + 5, 7 * r][a] % 16 + l]))) << (a = [7, 12, 17, 22, 5, 9, 14, 20, 4, 11, 16, 23, 6, 10, 15, 21][4 * a + r++ % 4]) | n >>> 32 - a), t, i];
                                for (r = 4; r;) s[--r] = s[r] + a[r]
                            }
                            for (e = ""; r < 32;) e += (s[r >> 3] >> 4 * (1 ^ 7 & r++) & 15).toString(16);
                            return e
                        }
                    }();
                s.setup = function(e) {
                    return l.push(e), {
                        fallback: function(e) {
                            r || e()
                        }
                    }
                }, s.force = function(e, t) {
                    console.warn("Forcing cohort: " + t + " for test: " + e), this.forcedCohorts[e] = t
                }, s.addTest = function(e, t, i, n) {
                    this.validCohorts[t] = i;
                    var r, o, a, s, l = this.forcedCohorts[t];
                    return l || (l = i[(r = e, o = t, a = i.length, s = h(o + ":" + r).substr(-8), parseInt(s, 16) % a)]), this.abTestCohorts[t] = l, n && "{}" !== JSON.stringify(this.abTestCohorts) && S.track.customEvent(t, 1, this.abTestCohorts), {
                        test: t,
                        cohort: l
                    }
                }, s.init = function(e, t) {
                    var i = {};
                    if (window._jsonData && window._jsonData.ab_tests) {
                        var n = t || window._jsonData.ab_tests;
                        for (var r in n) {
                            var o = this.addTest(e, r, n[r].cohorts, !1);
                            i[o.test] = o.cohort
                        }
                        for (r in console.log("XS.abtest: A/B test cohorts: ", i), n) S.track.customEvent(r, 1, i)
                    }
                    s.initialized = !0;
                    for (var a = 0; a < l.length; ++a) l[a]();
                    s.emit("abtest-init")
                }, s.cohort = function(e) {
                    return s.initialized || console.error("XS.abtest.cohort called before XS.abtest was initialized!"), s.abTestCohorts[e]
                }, s.when = function(e, t, i) {
                    if (!r) return {
                        fallback: function(e) {
                            e && e()
                        }
                    };
                    s.initialized || console.error("XS.abtest.when called before XS.abtest was initialized!");
                    var n = this.cohort(e);
                    return "string" == typeof t ? n && t && n == t && i && i() : "object" == typeof t ? n && t[n] && t[n]() : n || console.error("No A/B test cohort defined for test '" + e + "' - nothing was executed!"), {
                        fallback: function() {}
                    }
                }
            }, r = !!S.is.facebookInstant && (Host.on("FBInstantStart", function() {
                S.abtest.init(FBInstant.player.getID())
            }), !0), S.loadEmbedData = function(e, t, i) {
                if (window.embeddedFiles && window.embeddedFiles[e]) console.log("Loading embedded data: " + e), t(window.embeddedFiles[e]);
                else {
                    console.warn("Loading data (not embedded!): " + e);
                    var n = new XMLHttpRequest;
                    n.crossOrigin = "anonymous", i && n.overrideMimeType && n.overrideMimeType(i);
                    try {
                        n.open("GET", e, !0), n.onreadystatechange = function() {
                            4 == n.readyState && ("200" == n.status ? t(n.responseText) : (n = n.onreadystatechange = null, console.error("XS.loadData: Error loading data: ", n)))
                        }, n.send()
                    } catch (e) {
                        console.error("loadEmbedData: Error loading data (2): ", e)
                    }
                }
            }, window.insertButton = function(e, t, i) {
                console.warn("window.insertButton needs to be overwritten before releasing this game."), Host.WrapperLog("window.insertButton is not defined")
            }, a.nextHandlerId = 1, a.groups = {}, a.cachedEvents = [], a.ENG_GRP_NAME = "___e", p.ENG_FRZ_GRP = a.ENG_GRP_NAME, a.DEF_GRP_NAME = "___d", Object.defineProperty(Object.prototype, "_defFrzGrp", {
                enumerable: !1,
                value: a.DEF_GRP_NAME
            }), a.groups[a.GLB_GRP_NAME = "___g"] = new a(a.GLB_GRP_NAME), a.get = function(e) {
                return a.groups[e] = a.groups[e] || new a(e), a.groups[e]
            }, a.freezeUnfreezeGroup = function(e, t) {
                var i = t ? 1 : -1,
                    n = a.get(e);
                for (var r in n.frc = Math.max(0, n.frc + i), n.handlers) n.handlers[r].frc = Math.max(0, n.handlers[r].frc + i)
            }, a.addHandler = function(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = a.get(t[i]);
                    n.handlers[e.id] = e, 0 < n.frc && e.frc++
                }
            }, a.removeHandler = function(e) {
                for (var t in a.groups) {
                    var i = a.get(t);
                    delete i.handlers[e.id], 0 < i.frc && e.frc--
                }
            }, a.cacheEvent = function(e, t, i, n) {
                a.cachedEvents.push({
                    target: e,
                    eventName: t,
                    grpName: i,
                    cbData: n
                })
            }, a.fireCachedEvents = function(e) {
                for (var t = a.cachedEvents.length; t--;) {
                    var i = a.cachedEvents[t];
                    i.grpName === e && (i.target.emit(i.eventName, i.cbData), a.cachedEvents.splice(t, 1))
                }
            }, S.LOG_SPAM_EVENT_EXCLUDE = S.LOG_SPAM_EVENT_EXCLUDE || [], Object.defineProperty(Object.prototype, "_freezeEmit", {
                enumerable: !1,
                value: function(e) {
                    return e.type !== Be.forced.name && (!(!i() && !S.isFrozen(e.frzGrp)) && (e.type === Be.transient.name || a.cacheEvent(this, e.name, e.frzGrp, e.cbData), !0))
                }
            }), a.prototype.constructor = a, S.isFrozen = function(e) {
                return (e = e || a.DEF_GRP_NAME) in a.groups && 0 < a.get(e).frc
            }, S.freeze = function(e) {
                a.freezeUnfreezeGroup(e = e || a.DEF_GRP_NAME, !0)
            }, S.unfreeze = function(e) {
                a.freezeUnfreezeGroup(e = e || a.DEF_GRP_NAME, !1), a.fireCachedEvents(e)
            }, S.canvas = document.getElementById("gameCanvas"), S.stageContainer = new g.Stage(2105376), P(S.stageContainer), S.stageContainer.on("up", function(e) {
                S.stageContainer.emit("stageup", e)
            }, {
                freezeGroup: ENG_FRZ_GRP
            }), S.stageContainer.on("down", function(e) {
                window.focus && window.focus()
            }, {
                freezeGroup: ENG_FRZ_GRP
            });
            var e = !1;
            S.is.android && S.is.androidVersion < 5 && !S.is.firefoxMobile && (e = !0);
            var t = window.__antialias;
            window.inScreenshotMode || e ? S.renderer = new g.CanvasRenderer(width, height, {
                view: S.canvas,
                antialiasing: !1,
                antialias: !1,
                transparent: !1,
                clearBeforeRender: !0
            }) : S.renderer = g.autoDetectRenderer(width, height, {
                view: S.canvas,
                antialiasing: t,
                antialias: t,
                transparent: !1,
                clearBeforeRender: !0
            }), S.is.usingCanvasRenderer = S.renderer.type === g.CANVAS_RENDERER, S.is.usingWebGLRenderer = S.renderer.type === g.WEBGL_RENDERER, S.httpPrefix = "https://", S.devicePixelRatio = Math.min(2, window.devicePixelRatio || 1), S.styles = {
                margins: {
                    top: (S.is.iOSWrapper || S.is.standalone) && S.is.iOS ? S.is.iPhoneXOrLater ? 0 : 20 : 0,
                    bottom: 0,
                    left: 0,
                    right: 0
                },
                spacing: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0
                }
            }, S.showGameOverAd = function() {}, S.hideGameOverAd = function() {}, S.showInterstitialAd = function(e) {
                e && e()
            }, S.resizeAd = function() {}, S.showRateGame = function() {}, S.submitHighscore = function(e) {}, S.submitLowscore = function(e) {}, S.configLoadCallback = function() {}, S.insertRemoveAdsButton = function() {};
            var n, o = !(S.removeAdsButton = function() {});
            S.skipResizing = !1, window.onresize = function(e) {
                if (!S.skipResizing) {
                    var t = 5;
                    LEGACY_COORD_SYSTEM && (t = 25), clearTimeout(o), clearInterval(n), clearTimeout(Le), o = setTimeout(function() {
                        ke({
                            instant: !1,
                            event: e
                        }), n = setInterval(function() {
                            Ie(!1)
                        }, 250)
                    }, t)
                }
            }, window.onfocus = function(e) {
                S.emit("focus", {
                    event: e
                })
            }, window.onblur = function(e) {
                S.emit("blur", {
                    event: e
                })
            }, document.addEventListener("visibilitychange", function(e) {
                "hidden" == document.visibilityState && S.emit("blur", {
                    event: e
                }), "visible" == document.visibilityState && S.emit("focus", {
                    event: e
                })
            });
            var b = [];
            var s, l, c, u = function() {
                var y = 0;
                if (window.Host && window.Host.Sound) return Host.Log("Using SoundPlayer!"),
                    function(s) {
                        s = !!s;
                        var l = this;

                        function n(n, r, t) {
                            var o = this;
                            o.playing = !1;
                            var a = t;
                            o.resetGain = function() {
                                o.setGain(t)
                            }, o.setGain = function(e) {
                                a = e, Host.Sound.SetVolume(n, e)
                            }, o.updateGain = function(e) {
                                t = e, o.setGain(e)
                            }, o.currentGain = function() {
                                return o.currentGain
                            }, o.setMuted = function(e) {
                                Host.Sound.Pause && o.playing && Host.Sound.Pause(n, e)
                            }, o.play = function(e, t) {
                                function i() {
                                    Host.Sound.Play(n, r, t, a, s)
                                }
                                l.muted || s && o.playing || (o.playing = !0, e ? setTimeout(i, 1e3 * e) : i())
                            }, o.stop = function(e) {
                                e = void 0 === e ? 0 : e, o.playing = !1, Host.Sound.Stop(n)
                            }
                        }
                        this.muted = !1, this.setMuted = function(e) {
                            l.muted = e, Host.Sound.PauseAll(e, s)
                        }, this.soundNodes = [], this.get = function(e, t) {
                            var i = e + "_" + y++;
                            return Host.Sound.Preload(i, e, s), new n(i, e, t)
                        }
                    };
                var o = !1;
                return function(f) {
                    var p, g = this;
                    void 0 !== u.context && (p = u.context);
                    var e = window.AudioContext || window.webkitAudioContext;
                    void 0 === p && void 0 !== e && (p = new e), this.unblock = function() {
                        if (!o && g.unblocker) {
                            var e = p.state;
                            g.unblocker.play(0, !1);
                            var t = p.state;
                            e == t && "running" != t || (o = !0, _())
                        }
                    }, this.debug = function() {
                        console.log(p)
                    };
                    var n = [];
                    this.soundNodes = [], this.muted = !1, this.setMuted = function(e) {
                        (g.muted = e) || function() {
                            for (; b.length;) b.pop()()
                        }();
                        try {
                            for (var t = 0; t < this.soundNodes.length; ++t) this.soundNodes[t] && this.soundNodes[t].setMuted(e)
                        } catch (e) {}
                    }, this.unblocker = void 0, this.get = function(e, t) {
                        var i = n[e] || r(e, t);
                        return i.updateGain(t), void 0 !== g.unblocker || f || (g.unblocker = r(e, 0)), this.soundNodes.push(i), i
                    };
                    var v = [],
                        m = !1;

                    function w() {
                        m = !0, v.length ? v.shift()() : m = !1
                    }

                    function i(i, t) {
                        this.id = i + "_" + y++;
                        var n, r, o = this;
                        o.loaded = !1, o.playing = !1;
                        var a = {
                            gain: {
                                value: t
                            }
                        };
                        if (p) {
                            b.push(function() {
                                var t = new XMLHttpRequest;

                                function e(e) {
                                    console.error('Error loading sound "%s":', i, e), w()
                                }
                                t.open("GET", vpath + i, !0), t.responseType = "arraybuffer", t.onerror = e, t.onload = function() {
                                    200 !== t.status && e(t.status + "/" + t.statusText), p.decodeAudioData(t.response, function(e) {
                                        n = e, o.loaded = !0, r && r(), t = null, w()
                                    }, e)
                                }, v.push(function() {
                                    t.send()
                                }), m || (w(), f || w())
                            }), a = p.createGain ? p.createGain() : {
                                gain: {
                                    value: t
                                }
                            }
                        }
                        this.gain = a.gain;
                        var s = {},
                            l = 0;

                        function h() {
                            for (var e in s) return e;
                            return !1
                        }

                        function d(e) {
                            !1 === h() && (l = o.gain.value, o.setGain(0)), s[e] = !0
                        }

                        function c(e) {
                            var t = h();
                            delete s[e], !1 !== t && o.setGain(l)
                        }
                        this.setGain = function(e) {
                            h() ? l = e : this.gain.value = e
                        }, this.updateGain = function(e) {
                            h() ? l = t = e : this.gain.value = t = e
                        }, this.resetGain = function() {
                            h() ? l = t : this.gain.value = t
                        }, o.currentGain = function() {
                            return this.gain.value
                        }, this.getCurrentTime = function() {
                            return p ? p.currentTime : 0
                        };
                        var u = void 0;
                        this.play = function(t, i, e) {
                            if (o.loaded) {
                                if (f) {
                                    if (o.playing && !e) return
                                } else o.stop(0);
                                ! function(e, t) {
                                    if (!g.muted && o.loaded) {
                                        u = {
                                            stop: function() {}
                                        };
                                        try {
                                            o.playing = !0, (u = p.createBufferSource()).buffer = n, u.loop = t || !1, o.resetGain(), u.connect(a), a.connect(p.destination), u.start(p.currentTime + (e || 0))
                                        } catch (e) {}
                                    }
                                }(t, i)
                            } else f && (r = function() {
                                var e = o.gain.value;
                                o.play(t, i), o.setGain(e)
                            })
                        }, this.stop = function(e) {
                            if (e = e || 0, u && o.playing) try {
                                u.stop(e)
                            } catch (e) {}
                            o.playing = !1
                        }, this.setMuted = function(e) {
                            e ? d("__default") : c("__default")
                        }, S.on("blur", function(e) {
                            d(o.id || "__default")
                        }, {
                            freezeGroup: ENG_FRZ_GRP
                        }), S.on("focus", function(e) {
                            c(o.id || "__default")
                        }, {
                            freezeGroup: ENG_FRZ_GRP
                        }), window.stage && stage.on("down", function(e) {
                            c(o.id || "__default")
                        }, {
                            freezeGroup: ENG_FRZ_GRP
                        })
                    }

                    function r(e, t) {
                        return n[e] = new i(e, t)
                    }
                    this.currentTrack = null
                }
            }();

            function _() {
                if (S.backgroundMusic && S.soundSettings) {
                    var e = S.soundSettings.muteMusic.get();
                    S.Music.setMuted(e), e ? S.backgroundMusic.stop(0) : S.backgroundMusic.play(0, !0)
                }
            }
            S.Sound = new u, S.Music = new u(!0), S.backgroundMusic = null, S.muteMusic = function(e) {
                S.Music.setMuted(e), S.soundSettings && S.soundSettings.muteMusic.set(e), _(), S.emit("mutemusic", e)
            }, S.muteSound = function(e) {
                S.soundSettings && S.soundSettings.muteSound.set(e), S.Sound.setMuted(e), S.emit("mutesound", e)
            }, S.setBackgroundMusic = function(e, t) {
                var i = null;
                return "string" == typeof e ? i = S.Music.get(e, t || 1) : (i = e, t ? i.setGain(t) : i.resetGain()), S.backgroundMusic = i, _(), i
            }, S.initSound = function() {
                S.soundSettings = {
                    legacyMuteSounds: Host.Preferences.QuickBool("sound.v1"),
                    legacyMuteMusic: Host.Preferences.QuickBool("music.v1"),
                    muteSound: Host.Preferences.QuickBool("xs.muteSound.v4"),
                    muteMusic: Host.Preferences.QuickBool("xs.muteMusic.v4"),
                    muteStateOverload: Host.Preferences.QuickBool("xs.muteStateOverload.v4")
                }, S.is.progressiveWebAppEnabled && !S.soundSettings.muteStateOverload.get() && (S.soundSettings.muteStateOverload.set(!0), S.soundSettings.legacyMuteSounds.set(!S.soundSettings.legacyMuteSounds.get()), S.soundSettings.legacyMuteMusic.set(!S.soundSettings.legacyMuteMusic.get()), S.soundSettings.muteSound.set(!S.soundSettings.muteSound.get()), S.soundSettings.muteMusic.set(!S.soundSettings.muteMusic.get())), S.Music && S.Music.setMuted(S.soundSettings.muteMusic.get()), S.Sound && S.Sound.setMuted(S.soundSettings.muteSound.get()), _()
            }, S.muteAll = function() {
                if (window.Host && window.Host.Sound) window.Host.Sound.MuteAll();
                else {
                    if (s) return;
                    s = !0, l = S.soundSettings.muteSound.get(), c = S.soundSettings.muteMusic.get(), S.backgroundMusic && void 0 === S.backgroundMusic.__preMuteGain && (S.backgroundMusic.__preMuteGain = S.backgroundMusic.currentGain()), S.muteMusic(!0), S.muteSound(!0)
                }
            }, S.unmuteAll = function() {
                if (window.Host && window.Host.Sound) window.Host.Sound.UnmuteAll();
                else {
                    if (!s) return;
                    s = !1, S.muteMusic(c), S.muteSound(l), S.backgroundMusic && void 0 !== S.backgroundMusic.__preMuteGain && (S.backgroundMusic.setGain(S.backgroundMusic.__preMuteGain), delete S.backgroundMusic.__preMuteGain)
                }
            }, S.loadScript = function(e, t) {
                var i, n, r;
                i = document, r = i.getElementsByTagName("script")[0], t = t || {}, (n = i.createElement("script")).src = e, n.async = "async", n.defer = "defer", t.charset && (n.charset = t.charset), r.parentNode.insertBefore(n, r)
            }, S.waitForSDK = function(e, t) {
                var i = setInterval(function() {
                    if (window[e]) return clearInterval(i), t()
                }, 100)
            }, S.util = {}, S.util.urlKeyVal = function(e, t) {
                return encodeURIComponent(e) + "=" + encodeURIComponent(t)
            }, S.util.urlEncode = function(e) {
                var t = [];
                for (key in e) t.push(S.util.urlKeyVal(key, e[key]));
                return t.join("&")
            };
            var f = !(S.remoteConfig = {});
            S.loadConfig = function(e) {
                if (!f && !S.is.facebookInstant && !S.is.twitch) {
                    var t = ze.remoteConfigVersion;
                    if (S.is.iOS ? t += ".ios" : S.is.android && !S.is.silk ? t += ".android" : S.is.chromeWrapper ? t += ".chrome" : S.is.facebookInstant && (t += ".instant"), void 0 !== ze && ze.stage && "live" != ze.stage && "gold" != ze.stage && "beta" != ze.stage && "rc" != ze.stage) Host.WrapperLog("Skipping ad config loading, because of Config.stage"), console.warn("Skipping ad config loading, because of Config.stage");
                    else {
                        var i = S.httpPrefix + "cdn.frvr.com/config/" + e + "." + t + ".json?r=" + (new Date).getTime();
                        Host.Tools.LoadJSON(i, function(e) {
                            for (var t in Host.WrapperLog("Loading Config URL: " + i), e) S.remoteConfig[t] = e[t];
                            S.configLoadCallback()
                        }, function() {
                            Host.WrapperLog("Failed to load config: " + i), setTimeout(function() {
                                S.loadConfig(e)
                            }, 6e4)
                        })
                    }
                    Host.Log(S.httpPrefix + "cdn.frvr.com/config/" + e + "." + t + ".json?r="), f = !0
                }
            }, S.navigate = function(e, t) {
                window.Host && window.Host.IOS && window.Host.IOS.OpenURL && Host.IOS.OpenURL(e), window.Host && window.Host.Android && window.Host.Android.OpenURL ? window.Host.Android.OpenURL(e) : S.is.clay ? (window.open(e, t || "_blank"), navigator.app && navigator.app.loadUrl && navigator.app.loadUrl(e, {
                    openExternal: !0
                })) : window.open(e, t || "_blank")
            }, S.utils = {};
            var v = 0;
            S.utils.clipImage = function(e, t, i, n, r, o, a) {
                e.isJSG && (e = g.Texture.getScaled(e, 1, d, !0).canvas), o = o || n, a = a || r, e.path = e.path || e.src || "Unknown Canvas Object " + ++v;
                var s = [e.path, t, i, n, r, o, a].join(","),
                    l = h[s];
                return void 0 === l && ((l = getNewCanvasObject()).width = n, l.height = r, l.path = s, l.getContext("2d").drawImage(e, t, i, n, r, 0, 0, o, a), h[s] = l), l
            };
            var m = !(S.utils.asynchLoadImageFromPath = function(e) {
                var t = g.Sprite.fromImage(e);
                return P(t), t
            });

            function w(e, t, i) {
                window.dirty = !0, e.emit("down", {
                    event: t,
                    isMouseEvent: i
                })
            }

            function y(e) {
                S.is.chromeOSDevice || (m = !0, this.mousedown = void 0), w(this, e, !1)
            }

            function T(e) {
                m || w(this, e, !0)
            }

            function C(e, t, i) {
                window.dirty = !1, e.emit("up", {
                    event: t,
                    isMouseEvent: i
                }), S.is.appWrapper || S.Sound.unblock()
            }

            function M(e) {
                S.is.chromeOSDevice || (m = !0, this.mouseup = void 0), C(this, e, !1)
            }

            function R(e) {
                m || C(this, e, !0)
            }

            function E(e, t, i) {
                e.emit("move", {
                    event: t,
                    isMouseEvent: i
                })
            }

            function L(e) {
                S.is.chromeOSDevice || (m = !0, this.mouseup = void 0), E(this, e, !1)
            }

            function A(e) {
                m || E(this, e, !0)
            }

            function P(a) {
                a.on("eventAttached", function(e) {
                    switch (e.eventName) {
                        case "down":
                            (o = a).interactive = !0, o.__touchStartEnabled || (o.__touchStartEnabled = !0, o.touchstart = y, o.mousedown = T);
                            break;
                        case "up":
                            (r = a).interactive = !0, r.__touchEndEnabled || (r.__touchEndEnabled = !0, r.mousedown = r.mousedown || function() {}, r.touchstart = r.touchstart || function() {}, r.touchendoutside = r.touchend = M, r.mouseupoutside = r.mouseup = R);
                            break;
                        case "move":
                            (n = a).interactive = !0, n.__touchMoveEneabled || (n.__touchMoveEneabled = !0, n.touchmove = L, n.mousemove = A);
                            break;
                        case "rightdown":
                            (i = a).interactive = !0, i.__rightDownEnabled || (i.__rightDownEnabled = !0, i.rightdown = function(e) {
                                this.emit("rightdown", {
                                    event: e,
                                    isMouseEvent: !0
                                })
                            });
                            break;
                        case "rightup":
                            (t = a).interactive = !0, t.__rightUpEnabled || (t.__rightUpEnabled = !0, t.rightup = function(e) {
                                this.emit("rightup", {
                                    event: e,
                                    isMouseEvent: !0
                                })
                            })
                    }
                    var t, i, n, r, o
                }, {
                    freezeGroup: ENG_FRZ_GRP
                })
            }
            var G = 0;

            function I(e, t) {
                G = 2;
                var i = function e(t, i) {
                    for (; i < .5;) t = e(t, .5), i /= .5;
                    G *= i, G += 2;
                    var n = getNewCanvasObject(),
                        r = n.getContext("2d"),
                        o = Math.ceil(t.width * i) || 1,
                        a = Math.ceil(t.height * i) || 1;
                    return n.width = o + 4, n.height = a + 4, r.clearRect(0, 0, n.width, n.height), r.drawImage(t, 0, 0, t.width, t.height, 2, 2, o, a), n
                }(e, t);
                G = Math.round(G) - 2;
                var n = Math.round(e.width * t) + 4,
                    r = Math.round(e.height * t) + 4;
                return canvas = getNewCanvasObject(), canvas.width = n, canvas.height = r, canvas.getContext("2d").drawImage(i, 0, 0, i.width, i.height, -G, -G, i.width, i.height), releaseCanvas(i), canvas
            }

            function O(e) {
                e && (e.removeEventListener("load", D), e.removeEventListener("error", B))
            }

            function D(e) {
                O(e.target), window.dirtyOnce = !0
            }

            function B(e) {
                O(e.target), window.dirtyOnce = !0, window.onerror && window.onerror("Failure to load generated asset image: " + this.path + " > " + e.message, e.sourceURL, e.line)
            }

            function F(e, t) {
                var i;
                t || (i = e, LEGACY_COORD_SYSTEM && (i.prototype._x = 0, i.prototype._y = 0, Object.defineProperty(i.prototype, "x", {
                    get: function() {
                        return this._x
                    },
                    set: function(e) {
                        this._x = e, this.position.x = e * (this.parent && this.parent.ratio || 1)
                    }
                }), Object.defineProperty(i.prototype, "y", {
                    get: function() {
                        return this._y
                    },
                    set: function(e) {
                        this._y = e, this.position.y = e * (this.parent && this.parent.ratio || 1)
                    }
                }), i.prototype._ratio = void 0, i.prototype.lockRatio = !1, i.prototype.forceSetRatio = function(e) {
                    if (this._ratio !== e)
                        if (!isNaN(e) && (0 < e || -1 == e)) {
                            this._ratio = e, this.x = this.x, this.y = this.y;
                            for (var t = 0; t < this.children.length; t++) this.children[t].ratio = e;
                            this.setRatio && this.setRatio(e)
                        } else console.warn("Invalid value passed to Container forceSetRatio " + e)
                }, Object.defineProperty(i.prototype, "ratio", {
                    get: function() {
                        return this._ratio
                    },
                    set: function(e) {
                        this._ratio === e || this.lockRatio || this.forceSetRatio(e)
                    }
                }))), e.prototype.inside = function(e, t, i) {
                    return !1
                }, LEGACY_COORD_SYSTEM && (e.prototype._addChildAt = e.prototype.addChildAt, e.prototype.addChildAt = function(e, t) {
                    var i = this._addChildAt(e, t);
                    return null != this.ratio && (e.ratio = this.ratio), i
                }, e.prototype._removeChildAt = e.prototype.removeChildAt, e.prototype.removeChildAt = function(e) {
                    var t = this._removeChildAt(e);
                    return t && this.ratio && (t.ratio = -1), t
                })
            }
            LEGACY_COORD_SYSTEM || (Object.defineProperty(g.DisplayObjectContainer.prototype, "dimensions", {
                get: function() {
                    return new Point(this.width, this.height)
                },
                set: function(e) {
                    this.width = e.x, this.height = e.y
                }
            }), g.DisplayObjectContainer.prototype.applyResolutionRecursive = function() {
                for (var e = 0; e < this.children.length; ++e) {
                    var t = this.children[e];
                    t && t.applyResolution && t.applyResolution(), t && t.applyResolutionRecursive && t.applyResolutionRecursive()
                }
            }, g.DisplayObjectContainer.prototype.getResolutionGlobal = function() {
                for (var e = this.resolution, t = this; t = t.parent;) e *= t.resolution;
                return e
            }, Object.defineProperty(g.DisplayObjectContainer.prototype, "resolution", {
                get: function() {
                    return void 0 !== this._resolution ? this._resolution : 1
                },
                set: function(e) {
                    this._resolution = e
                }
            }));
            var X = g.DisplayObjectContainer.expand(function() {
                return g.DisplayObjectContainer.call(this), P(this), this
            });
            X.prototype.cacheRender = function(e) {
                var t = this.getLocalBounds(),
                    i = new g.Sprite(g.Texture.emptyTexture);
                i.worldTransform = this.worldTransform, i.anchor.x = -t.x / t.width, i.anchor.y = -t.y / t.height, e.save(), e.translate(-t.x + this.x, -t.y + this.y), e.globalAlpha = this.alpha;
                for (var n = 0, r = this.children.length; n < r; n++) {
                    var o = this.children[n];
                    o.cacheRender && o.visible && o.cacheRender(e)
                }
                e.restore()
            }, F(X);
            var H = (p.Container = X).expand(function(e, t) {
                return X.call(this), this._width = e || 0, this._height = t || 0, Object.defineProperty(this, "width", {
                    get: function() {
                        return this._width * this.scale.x
                    },
                    set: function(e) {
                        this._width = e / this.scale.x
                    }
                }), Object.defineProperty(this, "height", {
                    get: function() {
                        return this._height * this.scale.y
                    },
                    set: function(e) {
                        this._height = e / this.scale.y
                    }
                }), this
            });
            p.ContainerFixedSize = H;
            var z = {};
            g.Texture.getScaled = function(e, t, i, n, r) {
                var o, a = e.path + ":" + t,
                    s = z[a];
                s && !r || (e.isJSG ? (o = _e[a]) || (o = e.draw({
                    scale: t,
                    forceCanvas: n
                })) : o = 1 === t ? e : I(e, t), 1 !== t && (o.path = a), LEGACY_COORD_SYSTEM ? texture = g.Texture.fromCanvas(o) : texture = g.Texture.fromCanvas(o, void 0, t), texture.floorCoordinates = i.floorCoordinates, s = {
                    canvas: o,
                    texture: texture,
                    count: 0,
                    ratio: t,
                    path: a,
                    timeToKill: 0
                }, z[a] = s);
                return s.count++, i._textureCache[a] = s
            };
            var N = 0,
                U = g.Sprite.expand(function(e, t) {
                    return LEGACY_COORD_SYSTEM && (this._ratio = -1), this.image = e, this._textureCache = {}, void 0 === e.path && (e.path = "DynamicSprite:" + N++), LEGACY_COORD_SYSTEM ? e.isJSG ? g.Sprite.call(this, Texture.emptyTexture) : g.Sprite.call(this, this.getTexture(e, 1)) : (this.resolution = t || 1, e.isJSG ? g.Sprite.call(this, this.getTexture(e, this.getResolutionGlobal())) : g.Sprite.call(this, this.getTexture(e, 1))), P(this), this
                });
            LEGACY_COORD_SYSTEM || (U.prototype.applyResolution = function() {
                this.setTexture(this.getTexture(this.image, this.getResolutionGlobal(), !0))
            }), LEGACY_COORD_SYSTEM || (Object.defineProperty(U.prototype, "width", {
                get: function() {
                    var e = this.texture.baseTexture.hasLoaded ? this.texture.frame.width : this.image.width || 1;
                    return this.scale.x * e
                },
                set: function(e) {
                    var t = this.texture.baseTexture.hasLoaded ? this.texture.frame.width : this.image.width || 1;
                    this.scale.x = e / t, this._width = e
                }
            }), Object.defineProperty(U.prototype, "height", {
                get: function() {
                    var e = this.texture.baseTexture.hasLoaded ? this.texture.frame.height : this.image.height || 1;
                    return this.scale.y * e
                },
                set: function(e) {
                    var t = this.texture.baseTexture.hasLoaded ? this.texture.frame.height : this.image.height || 1;
                    this.scale.y = e / t, this._height = e
                }
            })), U.prototype.getTexture = function(e, t, i) {
                return g.Texture.getScaled(e, t, this, !1, i).texture
            }, LEGACY_COORD_SYSTEM || (U.fromCanvasContext = function(e, t, i) {
                var n = document.createElement("canvas");
                n.width = e, n.height = t;
                var r = n.getContext("2d");
                return i && i(r), new U(n)
            }), U.prototype.cacheRender = function(e) {
                e.save();
                this.texture.baseTexture.source;
                e.globalAlpha = e.globalAlpha * this.alpha;
                var t = this.texture.baseTexture.source;
                this.image.isJSG && (t = this.image.draw({
                    forceCanvas: !0
                }));
                var i = this.position.x - t.width * this.anchor.x,
                    n = this.position.y - t.height * this.anchor.y;
                if (16777215 !== this.tint) {
                    var r = getNewCanvasObject();
                    g.CanvasTinter.tintWithPerPixelInner(t, r, this.tint, {
                        x: 0,
                        y: 0,
                        width: t.width,
                        height: t.height
                    }), e.drawImage(r, i, n), releaseCanvas(r)
                } else e.drawImage(t, i, n);
                this.image.isJSG && releaseCanvas(t), e.restore()
            }, U.prototype.floorCoordinates = !0;
            setInterval(function() {
                for (var e in z) {
                    var t = z[e];
                    0 == t.count && 1 !== t.ratio && t.ratio !== stage.ratio && (t.timeToKill--, t.timeToKill <= 0 && (t.canvas.getContext && releaseCanvas(t.canvas), t.texture.destroy(!0), delete z[e]))
                }
            }, 100), U.prototype.cleanTextureCache = function(e) {
                var t = 1;
                for (var i in -1 == e && (t = 1e3), this._textureCache) {
                    var n = this._textureCache[i];
                    n.count--, n.timeToKill = t, delete this._textureCache[i]
                }
            }, LEGACY_COORD_SYSTEM && (U.prototype._y = 0, Object.defineProperty(U.prototype, "y", {
                get: function() {
                    return this._y
                },
                set: function(e) {
                    this._y = e, this.position.y = e * this._ratio
                }
            }), U.prototype._x = 0, Object.defineProperty(U.prototype, "x", {
                get: function() {
                    return this._x
                },
                set: function(e) {
                    this._x = e, this.position.x = e * this._ratio
                }
            }), U.prototype.lockRatio = !1, U.prototype.redraw = function() {
                this.setTexture(this.getTexture(this.image, this.ratio, !0))
            }, U.prototype.forceSetRatio = function(e, t) {
                if (this._ratio !== e || t)
                    if (!isNaN(e) && (0 < e || -1 == e)) {
                        this._ratio = e, this.cleanTextureCache(e), -1 === e ? this.setTexture(Texture.emptyTexture) : (this.setTexture(this.getTexture(this.image, e)), this.x = this.x, this.y = this.y), this.setRatio && this.setRatio(e);
                        for (var i = 0; i < this.children.length; i++) this.children[i].ratio = e
                    } else console.warn("Invalid value passed to Sprite forceSetRatio " + e)
            }, Object.defineProperty(U.prototype, "ratio", {
                get: function() {
                    return this._ratio
                },
                set: function(e) {
                    this.lockRatio || this.forceSetRatio(e)
                }
            })), U.fromSheet = function(e, t) {
                return e.frame = t, new U(e.image)
            }, F(U, !0);
            var W = (p.Sprite = U).expand(function(e, t, i) {
                t = t || e.height, i = i || e.height;
                var n = e.width / t >> 0,
                    r = e.height / i >> 0;
                this.length = n * r, this.images = [];
                for (var o = 0; o < this.length; o++) {
                    var a = o % n >> 0,
                        s = o / n >> 0;
                    this.images.push(S.utils.clipImage(e, a * t, s * i, t, i, 0, 0, t, i))
                }
                U.call(this, this.images[0])
            });
            W.prototype._frame = 0, W.prototype.images = [], Object.defineProperty(W.prototype, "frame", {
                get: function() {
                    return this._frame
                },
                set: function(e) {
                    (e = Math.floor(e)) !== this.frame && (this._frame = e % this.length, this.image = this.images[this._frame], LEGACY_COORD_SYSTEM ? -1 != this.ratio && this.setTexture(this.getTexture(this.image, this.ratio)) : this.setTexture(this.getTexture(this.image, 1)), window.dirtyOnce = !0)
                }
            }), p.Sheet = W;
            var Y = g.Sprite.expand(function(e) {
                    g.Sprite.call(this, e)
                }),
                j = Y.prototype._renderWebGL;
            Y.prototype._renderWebGL = function(e) {
                this._dirtyTexture && (this._dirtyTexture = !1, g.updateWebGLTexture(this.texture.baseTexture, e.gl)), j.call(this, e)
            }, p.TextureSprite = Y, S.reportTextures = function() {
                console.log("Total Texture Pixels:", g.__totalPixels)
            };
            var V = {},
                Z = [];
            p.Text2 = g.Sprite.expand(function(s, l) {
                var h, d, c = this;
                null == s && (s = ""), (l = l || {}).weight = l.weight || "300", l.size = l.size || 30, l.fill = l.fill || "#000000";
                var u = 0,
                    t = 0,
                    i = 0,
                    f = 1;

                function n() {
                    var e = (s.translated || s) + ":" + l.size * f + ":" + u + ":" + JSON.stringify(l);
                    if (e != d) {
                        var t = V[e],
                            i = V[d];
                        if (i && (i.count--, 0 == i.count && (Z.push(i.text), delete V[d])), !t) {
                            var n = Z.pop(),
                                r = n ? n.style : {};
                            for (var o in l) r[o] = l[o];
                            l.dropShadow ? r.dropShadowDistance = (l.dropShadowDistance || 6) * f : (r.dropShadowDistance = 0, r.dropShadow = void 0);
                            var a = Math.max((l.size - u) * f, .1);
                            r._font = (l.italic ? "italic " : "") + l.weight + " " + a + "px " + (l.font || '"Helvetica Neue","Trebuchet MS", Helvetica, sans-serif'), t = V[e] = {
                                text: n || new g.Text(s.toString(), r),
                                localizedString: s,
                                count: 0,
                                ratio: f
                            }, n && (n.text = s.toString())
                        }
                        t.count++, d = e, t.text.updateText(), h = t.text, c.setTexture(h.texture), window.dirtyOnce = !0
                    }
                }

                function r() {
                    var e = !(u = 0);
                    if (LEGACY_COORD_SYSTEM && (e = -1 != c.ratio), e && (n(), l.maxWidth)) {
                        var t = 1;
                        for (LEGACY_COORD_SYSTEM && (t = c.ratio); h.texture.frame.width > l.maxWidth * t && 1 < l.size - u;) u += 2, l.size - u < 1 && (u = l.size - 1), n()
                    }
                }
                c.getContent = function() {
                    return n(), h
                }, g.Sprite.call(c, Texture.emptyTexture), c.setText = function(e) {
                    s.toString() !== e.toString() && (null == e && (e = ""), s = e, r())
                }, c.onLanguageChange = function() {
                    s = Host.Localize.Translate(s), r()
                }, c.updateStyle = function(e) {
                    var t = !1;
                    for (var i in e) l[i] != e[i] && (t = !0, l[i] = e[i]);
                    t && r()
                }, c.setStyle = function(e) {
                    c.updateStyle(e)
                }, LEGACY_COORD_SYSTEM || (c.applyResolution = function() {
                    r()
                });
                t = 0, i = 0, f = 1;
                LEGACY_COORD_SYSTEM && (Object.defineProperty(c, "ratio", {
                    get: function() {
                        return f
                    },
                    set: function(e) {
                        f === e && h || (f = e, c.position.x = t * f >> 0, c.position.y = i * f >> 0, r())
                    }
                }), Object.defineProperty(c, "x", {
                    get: function() {
                        return t
                    },
                    set: function(e) {
                        t = e, c.position.x = e * f >> 0
                    }
                }), Object.defineProperty(c, "y", {
                    get: function() {
                        return i
                    },
                    set: function(e) {
                        i = e, c.position.y = e * f >> 0
                    }
                }), Object.defineProperty(c, "width", {
                    get: function() {
                        return h || r(), c.scale.x * h.texture.frame.width
                    },
                    set: function(e) {
                        h || r(), c.scale.x = e / h.texture.frame.width, h._width = e
                    }
                }), Object.defineProperty(c, "height", {
                    get: function() {
                        return h || r(), c.scale.y * h.texture.frame.height
                    },
                    set: function(e) {
                        h || r(), c.scale.y = e / h.texture.frame.height, h._height = e
                    }
                })), c.cacheRender = function(e) {
                    e.drawImage(h.texture.baseTexture.source, c.position.x, c.position.y)
                }, n(), r()
            }), p.Text2.onLanguageChange = function() {
                for (k in V) {
                    V[k].text.setText(Host.Localize.Translate(V[k].localizedString))
                }
                Host.Localize.UpdateChildren(S.stageContainer), S.emit("translate", {})
            }, p.Graphics = g.Graphics.expand(function() {
                return P(this), g.Graphics.call(this), this
            }), p.Rectangle = g.Rectangle, p.Rectangle.prototype.getPosition = function() {
                return new Point(this.x, this.y)
            }, p.Rectangle.prototype.getSize = function() {
                return new Point(this.width, this.height)
            }, p.Texture = g.Texture, p.RenderTexture = g.RenderTexture, p.Point = g.Point, p.BlendModes = g.blendModes;
            var K = 1e3 / 60,
                Q = 1.7 * K,
                q = 3.1 * K;

            function J(e, t, i, n, r) {
                if (!(e instanceof Function)) throw "timeout callback must be a function";
                t = t || 0, i = i || !1, n = n && n.constructor === Array ? n : [], r && r.constructor === Array ? 0 == r.length && (r = [a.DEF_GRP_NAME]) : r = r && "string" == typeof r ? [r] : [a.DEF_GRP_NAME], this.cb = e, this.cbParams = n, this.delayMS = 1e3 * t, this.originalDelayMS = this.delayMS, this.repeats = i, this.id = a.nextHandlerId++, this.frc = 0, J.timeouts[this.id] = this, a.addHandler(this, r)
            }
            J.timeouts = {}, J.clear = function(e) {
                if ("number" == typeof e && isFinite(e) && Math.round(e) === e) {
                    var t = null;
                    e in J.timeouts && (t = J.timeouts[e], delete J.timeouts[e], a.removeHandler(t))
                }
            }, J.tick = function() {
                var e = [];
                for (var t in J.timeouts) {
                    0 < (n = J.timeouts[t]).frc || n.tick() && e.push(t)
                }
                for (var i = 0; i < e.length; i++) {
                    var n;
                    t = e[i];
                    if ((n = J.timeouts[t]) && (n.repeats || J.clear(parseInt(t)), void 0 !== n.cb)) try {
                        n.cb.apply(window, n.cbParams)
                    } catch (e) {
                        window.onerror && window.onerror("Timeout.tick error: " + e.message, e.sourceURL, e.line, void 0, e)
                    }
                }
            }, S.on("tick", J.tick, {
                freezeGroup: ENG_FRZ_GRP
            }), J.prototype.tick = function() {
                return this.delayMS -= K, this.delayMS <= 0 && (this.repeats && (this.delayMS = this.originalDelayMS + this.delayMS), !0)
            }, J.prototype.constructor = J, S.setTimeout = function(e, t, i, n) {
                return new J(e, t / 1e3, !1, i, n).id
            }, S.clearTimeout = function(e) {
                J.clear(e)
            }, S.setInterval = function(e, t, i, n) {
                return new J(e, t / 1e3, !0, i, n).id
            }, S.clearInterval = function(e) {
                J.clear(e)
            };
            var $ = function(e, t, i, n, r) {
                for (var o in i = null == i ? 1 : i, 1 != $.multiplier && (i *= $.multiplier), this.id = a.nextHandlerId++, this.frc = 0, this.tweenedProps = {}, this.offset = 1, this.method = n || $.easeout, this.length = 1e3 * i / (1e3 / 60), this.target = e, t) this.tweenedProps[o] = {
                    start: e[o],
                    end: t[o]
                };
                $.tweens[this.id] = this, r && r.constructor === Array ? 0 == r.length && (r = [a.DEF_GRP_NAME]) : r = r && "string" == typeof r ? [r] : [a.DEF_GRP_NAME], a.addHandler(this, r)
            };
            $.multiplier = 1, $.nextId = 1, $.prototype.call = function(e, t) {
                return e instanceof Function || console.warn("Tween callback parsed to .call is not a function", e), this.callback = e, this.callbackParams = t, this
            }, $.prototype.wait = function(e) {
                return this.delay = 1e3 * (e || 0) / (1e3 / 60), this
            }, $.prototype.tick = function() {
                if (0 < this.delay) return this.delay--, !1;
                for (var e in this.tweenedProps) {
                    var t = this.tweenedProps[e];
                    this.target[e] = this.method(t.start, t.end instanceof Function ? t.end() : t.end, this.offset / this.length)
                }
                return this.offset++, this.offset > this.length || void 0
            }, $.prototype.__complete = function() {
                for (var e in this.tweenedProps) this.target[e] = this.tweenedProps[e].end instanceof Function ? this.tweenedProps[e].end() : this.tweenedProps[e].end;
                if (this.callback) {
                    var t = this;
                    t.callback && S.once("animate", function() {
                        t.callback.apply(t.target, t.callbackParams || null)
                    }, {
                        freezeGroup: ENG_FRZ_GRP
                    })
                }
            }, $.prototype.complete = function() {
                $.complete(this)
            }, $.prototype.clear = function() {
                $.clear(this)
            }, $.tweens = {}, $.linear = $.linary = function(e, t, i) {
                return e + (t - e) * i
            }, $.easein = function(e, t, i) {
                return e + (t - e) * (1 - Math.sin(i * Math.PI / 2 + Math.PI / 2))
            }, $.easeout = function(e, t, i) {
                return e + (t - e) * Math.sin(i * Math.PI / 2)
            }, $.easeinout = function(e, t, i) {
                return e + (t - e) * ((Math.sin(i * Math.PI - Math.PI / 2) + 1) / 2)
            }, $.bounce = function(e, t, i) {
                return e + (t - e) * Math.sin(i * Math.PI)
            }, $.tick = function() {
                var e = [];
                for (var t in $.tweens) {
                    0 < (n = $.tweens[t]).frc || n.tick() && e.push(t)
                }
                for (var i = 0; i < e.length; i++) {
                    if ((t = e[i]) in $.tweens) {
                        var n = $.tweens[t];
                        window.dirtyOnce = !0, delete $.tweens[t], a.removeHandler(n), n.__complete()
                    }
                }
            }, S.on("tick", $.tick, {
                freezeGroup: ENG_FRZ_GRP
            }), $.complete = function() {
                for (var e = 0; e < arguments.length; e++) {
                    var t = arguments[e];
                    for (var i in $.tweens)
                        if (i in $.tweens) {
                            var n = $.tweens[i];
                            n.target != t && n != t || (window.dirtyOnce = !0, delete $.tweens[n.id], a.removeHandler(n), n.__complete())
                        }
                }
            }, $.clear = function() {
                for (var e = 0; e < arguments.length; e++) {
                    var t = arguments[e];
                    for (var i in $.tweens)
                        if (i in $.tweens) {
                            var n = $.tweens[i];
                            n.target != t && n != t || (n.callback = void 0, delete $.tweens[n.id], a.removeHandler(n))
                        }
                }
            }, $.activeTweensCount = function() {
                var e = 0;
                for (var t in $.tweens) {
                    0 < $.tweens[t].frc || e++
                }
                return e
            }, p.Tween = $;
            var ee = getNewCanvasObject();
            ee.height = ee.width = 1, ee.path = "Image wrapper for load failure";
            var te = {},
                ie = {},
                ne = p.fetch;

            function re(e) {
                if (!e) return console.warn("You tried to load an image with an empty path"), ee;
                if (void 0 === te[e]) {
                    if (ne) return "string" == typeof e && console.info('"%s" not found in preloadCache. Calling native fetch().', e), ne.apply(this, arguments);
                    "string" == typeof e ? console.error('You can only use the embed method in conjuction with preload for > "%s"', e) : console.error("Native fetch() missing:", arguments)
                }
                return te[e]
            }
            p.embed = function(e) {
                return re(e)
            }, p.fetch = function(e) {
                return ie[e] ? ie[e] : re.apply(this, arguments)
            }, p.preload = function() {
                var h = 0,
                    d = 0,
                    i = [],
                    n = [];

                function c(e) {
                    window.dirtyOnce = !0, h--;
                    for (var t = 0; t < i.length; t++) i[t](d, h);
                    0 === h && function() {
                        for (; n.length;) n.shift()();
                        i = n = void 0
                    }()
                }

                function r(e, t) {
                    if (!ie[e]) {
                        var i, n = embeddedAssets[e];
                        if (n && n instanceof Array) delete embeddedAssets[e], t ? (i = getJSGImageWrapper(e, n[0], n[1])).ignoreScaleCache = t : (h++, d++, i = getJSGImageWrapper(e, n[0], n[1], c)), ie[e] = i;
                        else o(e)
                    }
                }

                function o(e) {
                    if (e && "null" !== e) {
                        var t, i = ("//" != (t = e).substring(0, 2) && "http" != t.substring(0, 4) && (t = vpath + t), t);
                        if (void 0 === te[e]) {
                            ie[e], h++, d++;
                            var n, r, o, a, s, l = embeddedAssets[e];
                            if (ie[e] || l) ie[e] || l instanceof Array ? function(t) {
                                function e() {
                                    c()
                                }
                                var i = embeddedAssets[t],
                                    n = ie[t] || getJSGImageWrapper(t, i[0], i[1]),
                                    r = te[t] = n.draw();
                                (r.complete || r.getContext) && r.width && r.height || r.isCanvas ? e() : (r.onload = e, r.onerror = function(e) {
                                    te[t] = ee, window.onerror && window.onerror("Failure to generate image (JSG): " + t + " - " + e.message, e.sourceURL, e.line), c()
                                }), r.path = t
                            }(e) : (a = e, s = new Image, (te[a] = s).onload = function() {
                                c()
                            }, s.onerror = function(e) {
                                te[a] = ee, window.onerror && window.onerror("Failure to generate image (Native): " + a + " - " + e.message, e.sourceURL, e.line), c()
                            }, s.path = a, s.src = embeddedAssets[a]), delete embeddedAssets[e];
                            else switch (i.substring(i.lastIndexOf("."))) {
                                case ".wav":
                                case ".mp3":
                                    throw new Error("You should not preload sounds: " + i);
                                default:
                                    n = e, r = i, (o = new Image).crossOrigin = "anonymous", o.onload = function() {
                                        te[n] = o, c()
                                    }, o.onerror = function(e) {
                                        te[n] = ee, c()
                                    }, o.path = n, o.src = r
                            }
                        }
                    }
                }

                function a(e, t) {
                    h++, d++, Host.Preferences["Get" + e](t, c)
                }

                function s(e, t, i) {
                    h++, d++, S.data._load(t, i, e, c)
                }
                var l, u = /[^A-Za-z]embed\(\s*["']([^)]+?)["']\s*\)/g,
                    f = /[^A-Za-z]fetch\(\s*["']([^)]+?)["']\s*[),](true|\!0)?/g,
                    p = /[^A-Za-z]Host.Preferences.Quick([A-Za-z]+)\(\s*["'](.+?)["']\s*\)/g,
                    g = /[^A-Za-z]XS\.data\.add([A-Za-z]+)\(\s*["']([^"']+)["']\s*(?:\)|,(?!\s*["']))/g,
                    v = /[^A-Za-z]XS\.data\.add([A-Za-z]+)WithLocalKey\(\s*[\"|\']([^"']+)["']\s*,\s*["']([^"']+)["']\s*[,)]/g;

                function m(e) {
                    for (var t = e.toString(); l = u.exec(t);) o(l[1]);
                    for (; l = f.exec(t);) r(l[1], void 0 !== l[2]);
                    for (; l = p.exec(t);) a(l[1], l[2]);
                    for (; l = g.exec(t);) s(l[1], l[2], l[2]);
                    for (; l = v.exec(t);) s(l[1], l[2], l[3]);
                    m.systemVars || (m.systemVars = !0, a("Bool", "xs.muteStateOverload.v4"), a("Bool", "xs.muteSound.v4"), a("Bool", "xs.muteMusic.v4"), a("Bool", "instant.hasInstalledShortcut.v1"))
                }
                m.systemVars = !1, h++;
                for (var e, t = d = 0; t < arguments.length; t++) void 0 !== (e = arguments[t]) && (e instanceof Function ? (n.push(e), m(e)) : o(e));
                return setTimeout(function() {
                        c()
                    }, 1),
                    function(e) {
                        i && i.push(e)
                    }
            };
            var oe = (new Date).getTime();
            window.dirty = !1;
            window.dirtyOnce = !1;
            ! function e() {
                var t = (new Date).getTime();
                if (i()) return oe = t, void De(e);
                if (S.emit("animate"), 5e3 < t - oe && (oe = t), K < t - oe && (oe += K, S.emit("tick"), Q < t - oe))
                    for (oe += K, S.emit("tick"); q < t - oe;) oe += K, S.emit("tick");
                (S.dirty || window.dirty || window.dirtyOnce || 0 !== $.activeTweensCount()) && (S.emit("render"), window.dirtyOnce = !1, S.renderer.render(S.stageContainer)), De(e)
            }(), window.performanceTest = function() {
                for (var e = (new Date).getTime(), t = 0; t < 1e3; t++) S.renderer.render(S.stageContainer);
                console.log((new Date).getTime() - e)
            }, setTimeout(function() {
                var s = (new Date).getTime(),
                    l = (new Date).getTime(),
                    h = {};
                De(function e() {
                    var t = (new Date).getTime(),
                        i = t - l;
                    if (h[i] = (h[i] || 0) + 1, (l = t) - s < 6e4) De(e);
                    else {
                        var n = 0,
                            r = 0;
                        for (var o in h) n += o * h[o], r += h[o];
                        var a = Math.round(1e3 / (n / r));
                        ga("send", "event", ze.id, "Performance", "Avg Framerate", a), a < 30 && ga("send", "event", ze.id, "Performance", "Below 30 Framerate", a), a < 15 && ga("send", "event", ze.id, "Performance", "Below 15 Framerate", a), a < 10 && ga("send", "event", ze.id, "Performance", "Below 10 Framerate", a), h = l = null
                    }
                })
            }, 2e3), p.gameHeight = height, p.gameWidth = width, LEGACY_COORD_SYSTEM ? p.stage = new X : (p.stage = new H, S.stage = p.stage), P(p.stage), stage.hitArea = new g.Rectangle(0, -1e4, 1e5, 1e5), stage.interactive = !0, stage.touchstart = function() {}, S.stageContainer.addChild(stage), stage.orientation = "landscape", stage.orientationMode = "dynamic";
            var ae = getNewCanvasObject(),
                se = ae.getContext("2d"),
                le = new Y(Texture.emptyTexture),
                he = new g.Graphics;
            stage.addChild(le), stage.addChild(he);
            var de = 0,
                ce = 0,
                ue = {
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0
                };

            function fe(e, t, i) {
                return void 0 === e ? e : e.toString() === e && "%" == e[e.length - 1] ? t * (parseInt(e.substring(0, e.length - 1)) / 100) : e * i
            }
            stage.background = {
                color: "#000000",
                gradient: void 0,
                texture: void 0,
                callback: void 0,
                disabled: !1
            };
            var pe = {};

            function ge(e) {
                le.texture.destroy(!0), e.target && le.setTexture(new Texture.fromCanvas(e.target)), window.dirtyOnce = !0, O(e.target)
            }

            function ve(e) {
                var t = e.error || e;
                window.dirtyOnce = !0, window.onerror && window.onerror("Failure to generate background: " + t.message, t), O(e.target)
            }
            stage.background.embellish = function(f) {
                if (pe != f) {
                    pe = f;
                    for (var e = [], t = 0; t < f.length; t++) e.push(f[t].path);
                    e.push(function() {
                        for (var e = 0; e < f.length; e++) f[e].image = embed(f[e].path);
                        stage.background.callback = function(e, t) {
                            for (var i = 0; i < f.length; i++) {
                                var n = f[i],
                                    r = height / targetWidth * S.devicePixelRatio,
                                    o = n.image.width * r,
                                    a = n.image.height * r,
                                    s = 0,
                                    l = 0,
                                    h = fe(n.left, e.width, r),
                                    d = fe(n.right, e.width, r),
                                    c = fe(n.top, e.width, r),
                                    u = fe(n.bottom, e.width, r);
                                void 0 !== h && void 0 !== d && (o = e.width - 5 - h - d), void 0 !== h && (s = h), void 0 !== d && (s = e.width - d - o), void 0 !== c && void 0 !== u && (a = e.height - 5 - c - u), void 0 !== c && (l = c), void 0 !== u && (l = e.height - 5 - u - a), s += fe(n.offsetX, o, 1) || 0, l += fe(n.offsetY, a, 1) || 0, t.drawImage(n.image, s, l, o, a)
                            }
                        }, we(!0)
                    }), preload.apply(p, e)
                }
            }, S.getScreenshot = function() {
                stage.updateTransform();
                var e = getNewCanvasObject();
                e.style.width = (e.width = width * S.devicePixelRatio) / S.devicePixelRatio + "px", e.style.height = (e.height = height * S.devicePixelRatio) / S.devicePixelRatio + "px";
                var t = {
                    context: e.getContext("2d"),
                    maskManager: null,
                    scaleMode: null,
                    smoothProperty: null,
                    currentBlendMode: 0
                };
                return stage._renderCanvas(t), e
            }, S.getTintedTexture = g.CanvasTinter.getTintedTexture, stage.background.drawBackground = function(e, t, i, n, r, o) {
                if (e.fillStyle = stage.background.color, e.fillRect(0, 0, t, i), n) {
                    var a;
                    switch (n.type) {
                        case "radial":
                            var s = null == n.multiplier ? 1 : n.multiplier,
                                l = null == n.verticalOffset ? .5 : n.verticalOffset;
                            a = e.createRadialGradient(t / 2, i * l, 0, t / 2, i * l, Math.max(t / 2, i / 2) * s);
                            break;
                        case "linear":
                            a = e.createLinearGradient(t * (n.width || 0), i, 0, 0);
                            break;
                        default:
                            throw "Unsupported radial format"
                    }
                    for (var h = 0; h < n.stops.length; h++) a.addColorStop.apply(a, n.stops[h]);
                    e.fillStyle = a, e.fillRect(0, 0, t, i)
                }
                if (o && o(ae, e), r) {
                    if (!r.scaled) {
                        var d = r.scaled = getNewCanvasObject();
                        d.width = Math.ceil(r.width * S.devicePixelRatio / 2), d.height = Math.ceil(r.height * S.devicePixelRatio / 2), d.getContext("2d").drawImage(r, 0, 0, r.width, r.height, 0, 0, d.width, d.height)
                    }
                    var c = e.createPattern(r.scaled, "repeat");
                    e.fillStyle = c, e.fillRect(0, 0, t, i)
                }
                S.emit("backgroundredraw", {
                    context: e
                })
            };
            var me = new Image;

            function we(e) {
                (e || de != width || ce != height || ue.top != (S.styles.margins.top || 0) || ue.bottom != (S.styles.margins.bottom || 0) || ue.left != (S.styles.margins.left || 0) || ue.right != (S.styles.margins.right || 0)) && S.initComplete && (de = width, ce = height, ue.top = S.styles.margins.top || 0, ue.bottom = S.styles.margins.bottom || 0, ue.left = S.styles.margins.left || 0, ue.right = S.styles.margins.right || 0, stage.background.disabled ? (le.parent && stage.removeChild(le), he.clear(), he.beginFill(S.stageContainer.backgroundColor, 1), LEGACY_COORD_SYSTEM ? he.drawRect(0, 0, width * S.devicePixelRatio, height * S.devicePixelRatio) : he.drawRect(0, 0, S.stage.width, S.stage.height), he.endFill()) : (he.parent && stage.removeChild(he), LEGACY_COORD_SYSTEM ? (ae.width = width * S.devicePixelRatio + 5, ae.height = height * S.devicePixelRatio + 5) : (ae.width = S.stage.width + 5, ae.height = S.stage.height + 5), stage.background.drawBackground(se, ae.width, ae.height, stage.background.gradient, stage.background.texture, stage.background.callback), Host.dataUrlsSupported ? (me, (me = new Image).onload = ge, me.onerror = ve, me.src = ae.toDataURL(), ae.width = ae.height = 1) : (le.texture.destroy(!0), le.setTexture(new Texture.fromCanvas(ae))), le.y = -S.styles.margins.top * S.devicePixelRatio, window.dirtyOnce = !0))
            }
            stage.background.refresh = we, window.targetWidth = 2732, window.targetHeight = 2048, window.forceRatio = !1;
            var ye = 0;

            function Se() {
                var e = document.documentElement.clientHeight;
                return S.is.iOS && !S.is.facebookInstant && (e = window.innerHeight || e), Math.max(e, 100)
            }

            function be() {
                return Math.max(document.documentElement.clientWidth, 100)
            }
            var _e = {},
                xe = -1;

            function Te(e) {
                if (-1 != e && e != xe) {
                    for (x in xe = e, _e) delete _e[x];
                    for (var t in ie) {
                        var i = ie[t];
                        if (!i.ignoreScaleCache) {
                            var n = i.draw({
                                scale: e,
                                instantDraw: S.initComplete
                            });
                            t = t + ":" + e;
                            n.isJSGCache = !0, n.ratio = e, n.path = t, _e[t] = n
                        }
                    }
                }
            }
            S.initComplete = !1;
            var Ce = 0,
                Me = 0,
                Re = 0,
                Ee = 0,
                Le = 0,
                Ae = 0,
                Pe = 0,
                Ge = H.expand(function(e, t) {
                    var i = H.call(this, e, t);
                    i.topLeft = i.addChild(new X), i.top = i.addChild(new X), i.topRight = i.addChild(new X), i.bottomLeft = i.addChild(new X), i.bottom = i.addChild(new X), i.bottomRight = i.addChild(new X), i.left = i.addChild(new X), i.right = i.addChild(new X), i.center = i.addChild(new X), i.groups = [i.topLeft, i.top, i.topRight, i.left, i.center, i.right, i.bottomLeft, i.bottom, i.bottomRight], i.margins = {
                        top: 10,
                        right: 10,
                        bottom: 10,
                        left: 10
                    }, S.on("resize", function() {
                        var e = S.gui.width,
                            t = S.gui.height;
                        i.topLeft.x = i.margins.left, i.topLeft.y = i.margins.top, i.top.x = e / 2, i.top.y = i.margins.top, i.topRight.x = e - i.margins.right, i.topRight.y = i.margins.top, i.left.x = i.margins.left, i.left.y = t / 2, i.center.x = e / 2, i.center.y = t / 2, i.right.x = e - i.margins.right, i.right.y = t / 2, i.bottomLeft.x = i.margins.left, i.bottomLeft.y = t - i.margins.bottom, i.bottom.x = e / 2, i.bottom.y = t - i.margins.bottom, i.bottomRight.x = e - i.margins.right, i.bottomRight.y = t - i.margins.bottom
                    })
                });

            function ke(e) {
                clearTimeout(Le);
                var t = e.instant,
                    i = be(),
                    n = Se();
                void 0 !== e.forced_width && (i = e.forced_width), void 0 !== e.forced_height && (n = e.forced_height);
                var r = Math.max(n - S.styles.margins.top - S.styles.spacing.top - S.styles.spacing.bottom - S.styles.margins.bottom, 10),
                    o = Math.max(i - S.styles.margins.left - S.styles.spacing.left - S.styles.spacing.right - S.styles.margins.right, 10);
                if (e.forced || Re != r || Ee != o || Ce != i || Me != n) {
                    clearTimeout(Pe), Ce = p.width = i, Me = p.height = n, Re = r, Ee = o;
                    var a = 2 * Math.ceil(p.width / 2) * S.devicePixelRatio >> 0,
                        s = 2 * Math.ceil(p.height / 2) * S.devicePixelRatio >> 0;
                    S.is.iOS && (window.scrollTo && window.scrollTo(0, -1), t || (document.body.style.height = S.renderer.view.style.height = 1 + (s / S.devicePixelRatio >> 0) + "px")), S.is.iOS ? (clearTimeout(ye), t ? f() : ye = setTimeout(f, 500)) : f();
                    var l = targetWidth,
                        h = targetHeight,
                        d = stage.orientation;
                    "dynamic" == stage.orientationMode && (d = p.width <= r ? "portrait" : "landscape"), "portrait" == d && (h = targetWidth, l = targetHeight);
                    var c, u = window.forceRatio ? window.forceRatio : Math.min(Math.min(a / l, s / h), 1);
                    if (LEGACY_COORD_SYSTEM ? (u = window.forceRatio ? window.forceRatio : Math.min(Math.min(o * S.devicePixelRatio / l, r * S.devicePixelRatio / h), 1), e.forced && (stage.ratio = -1), stage.ratio != u && Te(u)) : (e.forced && (stage.resolution = -1), stage.resolution != u && Te(u)), LEGACY_COORD_SYSTEM) stage.ratio == u && stage.orientation == d || (stage.ratio = u);
                    else if (stage.resolution != u || stage.orientation != d) {
                        stage.scale.set(u, u * S.devixePixelRatio), S.gui.scale.set(.5 * S.devicePixelRatio, .5 * S.devicePixelRatio);
                        S.gui.resolution = 1, stage.resolution = 1 * u
                    }
                    if (p.gameHeight = r, p.gameWidth = o, S.resizeAd(), LEGACY_COORD_SYSTEM) stage.y = S.styles.margins.top * S.devicePixelRatio - S.styles.spacing.bottom * S.devicePixelRatio;
                    else S.stageContainer.dimensions = c = new Point(width * S.devicePixelRatio, height * S.devicePixelRatio), stage.dimensions = stage.toLocalSize(c), S.gui.dimensions = S.gui.toLocalSize(c), clearTimeout(Ae), Ae = setTimeout(function() {
                        S.stageContainer.applyResolutionRecursive()
                    }, 300);
                    stage.orientation = d, S.size = {
                        game: {
                            width: o,
                            height: r
                        },
                        target: {
                            width: l,
                            height: h
                        },
                        canvas: {
                            width: width * S.devicePixelRatio,
                            height: height * S.devicePixelRatio
                        },
                        canvasSafe: {
                            width: width - S.styles.spacing.left - S.styles.spacing.right,
                            height: height - S.styles.spacing.top - S.styles.spacing.bottom
                        },
                        stage: {
                            width: width / (stage.scale.x / S.stageContainer.scale.x),
                            height: height / (stage.scale.y / S.stageContainer.scale.y)
                        }
                    }, S.emit("resize", e)
                }

                function f() {
                    S.renderer.resize(a, s), S.renderer.view.style.width = (a / S.devicePixelRatio >> 0) + "px", S.renderer.view.style.height = (s / S.devicePixelRatio >> 0) + "px", S.is.android && (document.body.style.width = Math.ceil(p.width) + "px", document.body.style.height = Math.ceil(p.height) + "px"), window.dirtyOnce = !0, window.scrollTo && window.scrollTo(0, 0), S.renderer.render(S.stageContainer)
                }
            }

            function Ie(e) {
                window.inScreenshotMode || height == Se() && width == be() || (e ? S.initComplete && window.onresize() : Le = setTimeout(function() {
                    Ie(!0)
                }, 1))
            }
            S.gui = new Ge, S.stageContainer.addChild(S.gui), S.on("force-resize", ke, {
                freezeGroup: ENG_FRZ_GRP
            }), S.on("resize", function() {
                S.once("resize", function() {
                    we()
                }, {
                    freezeGroup: ENG_FRZ_GRP
                })
            }, {
                freezeGroup: ENG_FRZ_GRP
            }), setInterval(function() {
                Ie(!1)
            }, 500), window.inScreenshotMode || (window.onunload && (window.onunload = function() {
                setTimeout(function() {
                    window.onresize()
                }, 1)
            }), S.on("focus", function() {
                clearTimeout(Pe), Pe = setTimeout(function() {
                    ke({
                        forced: S.is.iOS
                    })
                }, S.is.iOS ? 500 : 1)
            }, {
                freezeGroup: ENG_FRZ_GRP
            }))
        }(this), (XS || {}).VERSION = "1.4.0",
        function(t) {
            var h = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
                d = /^\s*\-\s*/;

            function i(e) {
                return (e < 10 ? "0" : "") + e
            }

            function s() {
                return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
                    var t = 16 * Math.random() | 0;
                    return ("x" == e ? t : 3 & t | 8).toString(16)
                })
            }
            var n = /[-_]([a-z])/gi,
                r = /([a-z])([A-Z])|([A-Z])([A-Z])[a-z]/g;

            function l(e) {
                return e.replace(n, function(e) {
                    return e[1].toUpperCase()
                })
            }

            function c(e) {
                return e.replace(r, function(e) {
                    return e[0] + "_" + e.substr(1)
                }).toLowerCase()
            }

            function u() {
                var e = this;
                e.keepaliveIntervalMs = 6e4, e.keepaliveTimeoutId = void 0, e.timeStart = t && t.__FRVR && t.__FRVR.startTime || Date.now(), e.timeLoaded = void 0, e.newUserTimeoutId = void 0, e.newUserTimeoutMs = 5e3, e.handleKeepalive = e.handleKeepalive.bind(this), e.handleGameLoaded = e.handleGameLoaded.bind(this), e.handleFBInstantStart = e.handleFBInstantStart.bind(this), e.handleNewUserTimeout = e.handleNewUserTimeout.bind(this), e.handleRefreshPersistentData = e.handleRefreshPersistentData.bind(this), e.handleRefreshPlaySessionId = e.handleRefreshPlaySessionId.bind(this), e.data = {}, e.dataStore = {}, e.dataIsDirty = !0, e.providers = {}, e.DEBUG = !1, this.events = []
            }
            var o = u.prototype;
            o.init = function() {
                this.initData(), f.on("gameLoaded", this.handleGameLoaded), this.newUserTimeoutId = setTimeout(this.handleNewUserTimeout, this.newUserTimeoutMs), Host.on("FBInstantStart", this.handleFBInstantStart), this.triggerKeepalive()
            }, o.initData = function() {
                var e = u.DATAKEY,
                    i = u.PERSISTENT_DATA,
                    n = this,
                    r = this.dataStore = {
                        app_id: "com.frvr." + ze.id,
                        app_name: ze.id,
                        app_version: ze.version,
                        app_build: ze.build,
                        play_session_count: 0,
                        cohort: this.getDate(),
                        days_elapsed: 0,
                        last_day_played: this.getDate(),
                        days_played: 0,
                        channel: this.getChannel(),
                        entry_point: void 0,
                        utm_string: this.getUtmString(),
                        play_session_id: s(),
                        play_session_id_time: Date.now(),
                        screen: "init",
                        facebook_context: void 0,
                        currency_amount: 0,
                        missions_completed: 0,
                        progression: 0,
                        games_played: 0,
                        game_start_time: -1
                    };
                this.initDeviceId();
                var t = {};

                function o(t) {
                    return {
                        get: function() {
                            return r[t]
                        },
                        set: function(e) {
                            return r[t] !== e && (r[t] = e, -1 === u.DATA_EXCLUDE_DIRTY.indexOf(t) && (n.dataIsDirty = !0), -1 !== i.indexOf(t) && n.savePersistentData()), r[t]
                        }
                    }
                }
                for (var a in r) Object.defineProperty(n.data, a, o(a)), -1 !== i.indexOf(a) && (t[a] = r[a]);
                f.data.on("dataloaded", this.handleRefreshPersistentData), f.data.addObject(e, {
                    remote: !0,
                    default: t,
                    merge: function(e, t) {
                        return e.cohort && t.cohort && t.cohort >= e.cohort ? t : e
                    }
                }, function() {
                    n.loadPersistentData()
                })
            }, o.initDeviceId = function() {
                var t = this.dataStore;

                function e(e) {
                    t.deviceId = e.result
                }
                f.is.iOS && Host.IOS && Host.IOS.GetIDFA && Host.IOS.GetIDFA(e), f.is.android && Host.GoogleAds && Host.GoogleAds.GetIDFA && Host.GoogleAds.GetIDFA(e)
            }, o.loadPersistentData = function() {
                for (var e = u.DATAKEY, t = u.PERSISTENT_DATA, i = this.dataStore, n = f.data[e] || {}, r = !1, o = 0; o < t.length; o++) {
                    var a = t[o];
                    i[a] !== n[a] && (i[a] = n[a], r = !0, this.dataIsDirty = !0)
                }
                i.days_elapsed = Math.floor((Date.parse(this.getDate()) - Date.parse(i.cohort)) / 864e5), r && clearTimeout(this.newUserTimeoutId)
            }, o.savePersistentData = function() {
                for (var e = u.DATAKEY, t = u.PERSISTENT_DATA, i = this.dataStore, n = f.data[e], r = !1, o = 0; o < t.length; o++) {
                    var a = t[o];
                    i[a] !== n[a] && (r = !0, n[a] = i[a])
                }
                r && f.data.setDirty(e)
            }, o.buildEventContext = function(e, t, i) {
                var n = this.dataStore,
                    r = {
                        name: e,
                        value: t,
                        _params: i,
                        _globals: n
                    };
                for (var o in i) r[o] = i[o];
                for (var o in n) r[o] = n[o];
                var a = this.data.game_start_time;
                return r.game_duration = -1 === a ? 0 : Date.now() - a, r.loading_time = this.timeLoaded - this.timeStart, r
            }, o.parseArgs = function(t, e) {
                try {
                    return function(i, a) {
                        var t, s, l, n = 0;

                        function h(e) {
                            return e.length
                        }

                        function d(e) {
                            return (t[e] || e)()
                        }

                        function e(i) {
                            return function() {
                                var e = n,
                                    t = i();
                                return null === t && (n = e), t
                            }
                        }

                        function r(t) {
                            return e(function() {
                                var e = t.exec(i.substr(n));
                                return null === e || 0 !== e.index ? null : (n += h(e[0]), e[1])
                            })
                        }

                        function o(i) {
                            return e(function() {
                                for (var e = [], t = 0; t < h(i); t++) {
                                    if (null === (s = d(i[t]))) return s;
                                    e.push(s)
                                }
                                return e
                            })
                        }

                        function c(t) {
                            return e(function() {
                                for (var e = 0; e < h(t); e++)
                                    if (null !== (s = d(t[e]))) return s;
                                return null
                            })
                        }

                        function u(t, i, n) {
                            return e(function() {
                                for (var e = []; null !== (s = d(t)) && (e.push(s), null !== (s = d(i)));) !0 === n && e.push(s);
                                return e
                            })
                        }
                        t = {
                            ident: r(/([a-zA-Z_][a-zA-Z0-9_]*)/),
                            argSep: r(/(\s*,\s*)/),
                            expSep: r(/([:./])/),
                            objStart: r(/(\s*{\s*)/),
                            objEnd: r(/(\s*}\s*)/),
                            char: r(/([a-zA-Z0-9_ ]+)/),
                            numStr: r(/([0-9]+(\.[0-9]+)?)/),
                            assign: r(/(\s*\=\s*)/),
                            sQStr: r(/\'([^']*)\'/),
                            dQStr: r(/\"([^"]*)\"/),
                            number: e(function() {
                                return null !== (s = d("numStr")) ? parseFloat(s) : null
                            }),
                            string: c(["sQStr", "dQStr"]),
                            ref: e(function() {
                                return null !== (s = d("ident")) ? a[s] : null
                            }),
                            objProp: c([o(["ident", "assign", "exp"]), "ident"]),
                            objProps: u("objProp", "argSep"),
                            object: (l = o(["objStart", "objProps", "objEnd"]), e(function() {
                                if (null === (s = d(l))) return null;
                                for (var e, t, i = {}, n = s[1], r = 0; r < h(n); r++)
                                    if (t = "string" == typeof n[r] ? (e = n[r], a[e]) : (e = n[r][0], n[r][2]), "_merge" === e)
                                        for (var o in t) i[o] = t[o];
                                    else void 0 !== t && (i[e] = t);
                                return i
                            })),
                            exp: c(["ref", "number", "string", "object"]),
                            argDef: u("exp", "expSep", !0),
                            arg: e(function() {
                                return null === (s = d("argDef")) ? s : 1 < h(s) ? s.join("") : s[0]
                            }),
                            args: u("arg", "argSep")
                        }, i = i || "";
                        var f = d("args");
                        if (n < h(i)) throw new Error("Left over tokens at " + n + ', "' + i.substr(n) + '"');
                        return f
                    }(t, e)
                } catch (e) {
                    throw console.error('Parse error for event mapping: "' + t + '"'), e
                }
            }, o.getDate = function() {
                var e = new Date;
                return e.getFullYear() + "-" + i(e.getMonth() + 1) + "-" + i(e.getDate())
            }, o.getDeviceID = function() {
                return this.dataStore.deviceId
            }, o.getUtmString = function() {
                if (document && document.location && document.location.search) {
                    //var e = document.location.search || "";
                    //return [(e = e.replace(/^\?/, "")).replace(/^(?:.*utm_source=([^&]*)|).*$/, "$1") || "none", e.replace(/^(?:.*utm_medium=([^&]*)|).*$/, "$1") || "none", e.replace(/^(?:.*utm_campaign=([^&]*)|).*$/, "$1") || "none"].join("_")
                }
            }, o.getChannel = function() {
                var e = "other",
                    t = u.MAP_IS_TO_CHANNEL;
                for (var i in t) f.is[i] && (e = t[i]);
                return "web_safari" !== e && "web_chrome" !== e || !f.is.iOS || (e += "_ios"), e
            }, o.handleFBInstantStart = function() {
                clearTimeout(this.newUserTimeoutId), this.data.facebook_context = FBInstant.context.getType()
            }, o.triggerKeepalive = function() {
                clearTimeout(this.keepaliveTimeoutId), this.keepaliveTimeoutId = setTimeout(this.handleKeepalive, this.keepaliveIntervalMs)
            }, o.handleKeepalive = function() {
                this.keepalive()
            }, o.handleGameLoaded = function() {
                this.timeLoaded = Date.now(), this.gameLoaded()
            }, o.handleNewUserTimeout = function() {
                this.newUser()
            }, o.handleRefreshPersistentData = function(e) {
                -1 !== e.changedFields.indexOf(u.DATAKEY) && this.loadPersistentData()
            }, o.handleRefreshPlaySessionId = function(e) {
                var t = this.data.play_session_id_time,
                    i = Date.now();
                (void 0 === t || u.PLAYSESSIONID_TIMEOUT <= i - t) && (this.data.play_session_id = s()), this.data.play_session_id_time = i
            }, o.addHandler = function(e, t) {
                if ("default" !== e)
                    if ("object" != typeof e) {
                        var i = l(e);
                        if (e = c(e), o.hasOwnProperty(i)) throw new Error('Invalid event handler name "' + i + '", Please choose a different even name.'); - 1 === this.events.indexOf(e) && this.events.push(e), this[i] = t.bind(this)
                    } else {
                        Object.keys(e).length;
                        for (var n in e) this.addHandler(n, e[n])
                    }
            }, o.addProvider = function(e, t) {
                (this.providers[e] = t).name = t.name || e;
                var i = _jsonData["track-" + t.name];
                t.config = i;
                var n = t.blacklist || "";
                t.blacklist = [], t.enabled = !1 !== t.enabled, this.updateBlacklist(e, n), this.updateBlacklist(e, i.blacklist), "string" == typeof t.blacklist && (t.blacklist = t.blacklist.split(",")), "function" != typeof t.parseArgs && "function" == typeof t.oninit && t.oninit(i, this.dataStore), t.parseArgs = this.parseArgs, t.event = this.sendProviderEvent.bind(this, t), this.addEventMapping(e, i.events)
            }, o.addEventMapping = function(e, t, i) {
                var n = this.providers[e];
                if (void 0 !== n)
                    if ("object" != typeof t)
                        if (-1 === t.indexOf(",")) n.eventMap = n.eventMap || {}, t = c(t), n.eventMap[t] = i, this.hasOwnProperty(l(t)) || this.addHandler(t, this.send.bind(this, t));
                        else
                            for (var r = t.split(","), o = 0; o < r.length; o++) this.addEventMapping(e, r[o], i);
                else
                    for (var a in t) this.addEventMapping(e, a, t[a]);
                else console.warn('XSTrack.addEventMapping > Ad provider "' + e + '" not found.')
            }, o.updateBlacklist = function(e, t) {
                var i = this.providers[e] || {};
                if (void 0 !== i)
                    for (var n = i.blacklist, r = (t || "").split(","), o = 0; o < r.length; o++) {
                        var a = r[o].replace(h, ""),
                            s = a.replace(d, ""),
                            l = n.indexOf(s);
                        d.test(a) ? -1 !== l && n.splice(l, 1) : -1 === l && n.push(s)
                    }
            }, o.sendProviderEvent = function(e, t, i, n, r) {
                if (!1 !== e.enabled && "function" == typeof e.onevent && -1 === e.blacklist.indexOf(t)) {
                    var o = e.eventMap[t] || e.eventMap.default;
                    void 0 !== o && e.onevent(t, i, n, r, this.parseArgs(o, r))
                }
            }, o.send = function(e, t, i) {
                "object" == typeof t && (i = t, t = void 0), i = i || {};
                var n = this.buildEventContext(e, t, i);
                for (var r in this.handleRefreshPlaySessionId(), this.providers) this.providers[r].event(e, t, i, n);
                this.triggerKeepalive()
            }, o.set = function(e, t) {
                return this.data[e] = t
            }, o.inc = function(e, t) {
                return this.set(e, (this.data.name || 0) + (void 0 === t ? 1 : t)), this.data.name
            }, o.updateScreen = function(e) {
                this.set("screen", e)
            }, o.updateCurrencyAmount = function(e) {
                this.set("currency_amount", e)
            }, o.updateMissionsCompleted = function(e) {
                this.set("missions_completed", e)
            }, o.updateProgression = function(e) {
                this.set("progression", e)
            }, o.event = o.customEvent = function(e, t, i) {
                this.send(e, t, i)
            }, o.error = o.errorEvent = function(e, t, i) {
                this.send("error", void 0, {
                    message: e
                })
            }, u.DATAKEY = "xstrack", u.PERSISTENT_DATA = ["cohort", "play_session_id", "play_session_id_time", "play_session_count", "last_day_played", "days_played", "games_played"], u.MAP_IS_TO_CHANNEL = {
                edge: "web_edge",
                firefox: "web_firefox",
                opera: "web_opera",
                safari: "web_safari",
                chrome: "web_chrome",
                samsungBrowser: "web_samsung",
                samsungBrowserM4S: "web_samsung_m4s",
                silk: "web_silk",
                chromeWrapper: "chromeos",
                androidWrapper: "android",
                iOSWrapper: "ios",
                rcs: "rcs",
                samsungAppStore: "samsung",
                facebookInstant: "facebook_instant",
                facebookAppWeb: "facebook_canvasweb",
                facebookApp: "facebook_canvas",
                samsungBixby: "bixby",
                iMessageContext: "imessage",
                spilGamesWrapper: "spil",
                vkru: "vkru",
                okru: "okru",
                kongregate: "kongregate",
                kik: "kik",
                twitter: "twitter",
                twitch: "twitch",
                hago: "hago",
                poki: "poki"
            }, u.PLAYSESSIONID_TIMEOUT = 18e5, u.DATA_EXCLUDE_DIRTY = ["play_session_id_time"], o.page = function(e, t) {
                throw new Error("DEPRECATED: XS.track.page")
            }, o.timing = function(e, t, i, n) {
                throw new Error("DEPRECATED: XS.track.timing")
            }, o.exception = function(e, t) {
                throw new Error("DEPRECATED: XS.track.exception")
            }, o.loaded = function() {
                throw new Error("DEPRECATED: XS.track.loaded")
            }, o.constructor = u;
            var f = t.XS = t.XS || {};

            function a(e) {
                var t, i, n = (e = e || {}).names || [],
                    r = Array.prototype.slice.call(e.args || []),
                    o = e.defaults || [],
                    a = e.params;
                for (void 0 === a && "object" == typeof r[r.length - 1] && (a = r.pop()), a = a || {}, t = 0; t < r.length; t++) void 0 === a[i = n[t] || t] && (a[i] = r[t] || o[t]);
                for (t = 0; t < o.length; t++) void 0 === a[i = n[t] || t] && null != o[t] && (a[i] = o[t]);
                return a
            }
            f.XSTrack = u, f.track = new u, f.on("startLoading", function() {
                    f.track.init()
                }, {
                    freezeGroup: t.ENG_GRP_NAME
                }), f.track.addHandler({
                    options_change: function(e, t, i) {
                        void 0 !== (i = a({
                            names: ["option_name", "option_value"],
                            args: arguments
                        })).option_name && (i.option_name = String(i.option_name)), this.send("options_change", i)
                    },
                    play_session_start: function() {
                        this.send("session_start", this.inc("play_session_count"))
                    },
                    game_end: function(e, t) {
                        t = a({
                            names: ["level_id"],
                            args: arguments
                        }), this.send("game_end", t), this.set("game_start_time", -1)
                    },
                    game_play_start: function(e, t) {
                        t = a({
                            names: ["level_id"],
                            args: arguments
                        }), this.set("game_start_time", Date.now()), this.inc("games_played");
                        var i = this.getDate();
                        this.data.last_day_played !== i && (this.set("last_day_played", i), this.inc("days_played")), this.send("game_play_start", 1, t)
                    },
                    share: function(e, t) {
                        t = a({
                            names: ["button_placement"],
                            defaults: ["none"],
                            args: arguments
                        }), this.send("share", 1, t)
                    },
                    invite: function(e, t) {
                        t = a({
                            names: ["button_placement"],
                            defaults: ["none"],
                            args: arguments
                        }), this.send("invite", 1, t)
                    },
                    socialEngage: function(e, t, i) {
                        i = a({
                            names: ["engage_id", "button_placement"],
                            defaults: [void 0, "none"],
                            args: arguments
                        }), this.send("engage", 1, i)
                    },
                    crossPromotionShow: function(e, t) {
                        t = a({
                            names: ["button_placement"],
                            defaults: ["none"],
                            args: arguments
                        }), this.send("cross_promotion_show", 1, t)
                    },
                    crossPromotionSuccess: function(e, t) {
                        t = a({
                            names: ["target_game"],
                            args: arguments
                        }), this.send("cross_promotion_success", 1, t)
                    }
                }),
                function() {
                    var s = {
                            interstitial: "mandatory",
                            mandatory: "mandatory",
                            reward: "rewarded",
                            rewarded: "rewarded"
                        },
                        l = {
                            mandatory: 1,
                            rewarded: 3
                        },
                        h = {
                            response: "ad_response",
                            finish: "ad_result",
                            throttled: "throttle_type"
                        };

                    function d(e, t) {
                        return ["ad", s[e], t].join("_")
                    }
                    f.track.addHandler("ad", function(e, t, i, n, r) {
                        var o = void 0,
                            a = (r = r || {}, h[t]);
                        a ? r[a] = i : (r = n || {}, n = i, i = void 0), "finish" === t && (o = "success" === i ? l[s[e]] : 0), r.ad_point = n || "engine-triggered", this.send(d(e, t), o, r)
                    });
                    var i = {};
                    ["interstitial", "reward"].forEach(function(t) {
                        ["request", "response", "show", "finish", "blocked", "throttled"].forEach(function(e) {
                            i[d(t, e)] = f.track.ad.bind(f.track, t, e)
                        })
                    }), f.track.addHandler(i)
                }()
        }(this);
    var He = {},
        r = document.cookie.split("; ");
    for (i = r.length - 1; 0 <= i; i--)
        if (C = r[i].split("="), "frvr_uid" == C[0]) {
            He.frvr_uid = C[1];
            break
        } window.location && window.location.search && -1 < window.location.search.indexOf("tsrv=") ? He.server = "http://l.frvr.com:8008/" : He.server = "https://xc.frvr.com/", He.c = function() {
        for (var h = [], e = 0; e < 64;) h[e] = 0 | 4294967296 * Math.abs(Math.sin(++e));
        return function(e) {
            for (var t, i, n, r, o = [], a = (e = unescape(encodeURI(e))).length, s = [t = 1732584193, i = -271733879, ~t, ~i], l = 0; l <= a;) o[l >> 2] |= (e.charCodeAt(l) || 128) << l++ % 4 * 8;
            for (o[e = 16 * (a + 8 >> 6) + 14] = 8 * a, l = 0; l < e; l += 16) {
                for (a = s, r = 0; r < 64;) a = [n = a[3], (t = 0 | a[1]) + ((n = a[0] + [t & (i = a[2]) | ~t & n, n & t | ~n & i, t ^ i ^ n, i ^ (t | ~n)][a = r >> 4] + (h[r] + (0 | o[[r, 5 * r + 1, 3 * r + 5, 7 * r][a] % 16 + l]))) << (a = [7, 12, 17, 22, 5, 9, 14, 20, 4, 11, 16, 23, 6, 10, 15, 21][4 * a + r++ % 4]) | n >>> 32 - a), t, i];
                for (r = 4; r;) s[--r] = s[r] + a[r]
            }
            for (e = ""; r < 32;) e += (s[r >> 3] >> 4 * (1 ^ 7 & r++) & 15).toString(16);
            return e
        }
    }(), He.loggedin = !1, He.slt = "I think you'll enjoy playing FRVR Games!", He.user = He.nouser = {
        set: function() {},
        get: function() {}
    }, He.send = function(r, e) {
        var o = e.data || {},
            t = e.load || function() {},
            i = e.error || function(e) {
                console.error("XC.error: ", e)
            },
            a = new XMLHttpRequest;
        a.addEventListener("load", function(e) {
            t(e.target.responseText)
        }), a.addEventListener("error", function(e) {
            i(e.target.responseText)
        });
        var n = function(e) {
            var t = new FormData,
                i = JSON.stringify(o),
                n = e || "";
            t.append("id", n), t.append("c", He.c(He.slt + n + i)), t.append("data", i), t.append("game", ze.id), a.open("POST", r), a.send(t)
        };
        He.frvr_uid ? n(He.frvr_uid) : He.user && He.user.id ? n(He.user.id) : Host.Preferences.GetString("frvr.uid", n)
    }, He.onFBAuth = function(e) {
        He.login(e)
    }, He.onFBDeauth = function() {
        He.logout()
    }, He.login = function(e) {
        He.send(He.server + "login", {
            load: function(e) {
                var t = JSON.parse(e);
                He.user = new He.User(t), He.loggedin = !0, XS.data._loadRemote(He, He.user.data), console.log("Logged in - returned uid: ", He.user.id), Host.Preferences.SetString("frvr.uid", He.user.id), He.frvr_uid = He.user.id, document.cookie = "frvr_uid=" + He.user.id + ";path=/ ;max-age= 3153600000;expires=Fri, 01 Jan 2100 00:00:00 GMT", XS.emit("login", He.user)
            },
            data: {
                id: He.frvr_uid,
                fb_uid: e.userID,
                fb_auth: e.accessToken
            },
            error: function(e) {
                Host.Log("Login Error: " + e), XS.emit("login-error", e)
            }
        })
    }, He.setChange = function(e, t) {
        return !!He.loggedin && (He.user.set(e, t), !0)
    }, He.saveChanges = function(e) {
        He.loggedin ? (He.save(), e && e(!0)) : e && e(!1)
    }, He.loginOKRU = function(e, t) {
        He.send(He.server + "login", {
            load: function(e) {
                var t = JSON.parse(e);
                He.user = new He.User(t), He.loggedin = !0, console.log("Logged in - returned uid: ", He.user.id), Host.Preferences.SetString("frvr.uid", He.user.id), He.frvr_uid = He.user.id, document.cookie = "frvr_uid=" + He.user.id + ";path=/ ;max-age= 3153600000;expires=Fri, 01 Jan 2100 00:00:00 GMT", XS.emit("login", He.user)
            },
            data: {
                id: He.frvr_uid,
                fb_uid: e,
                fb_auth: t
            },
            error: function(e) {
                Host.Log("Login Error: " + e), XS.emit("login-error", e)
            }
        })
    }, He.save = function() {
        if (!He.user || !He.user.id) throw "Tried to XC.save without being logged in";
        He.send(He.server, {
            load: function(e) {
                JSON.parse(e);
                XS.emit("save", He.user)
            },
            data: He.user.data
        })
    }, He.logout = function() {
        He.user = He.nouser, He.loggedin = !1, XS.emit("logout")
    }, He.User = function(e) {
        var i = this;
        i.data = e.data || {}, i.id = e.id || null, i.get = function(e) {
            return i.data[e]
        }, i.set = function(e, t) {
            i.data[e] = t
        }
    }, XS.modulesToPreload.push(function() {
        function e() {}
        e.prototype.onGameLoaded = function() {
            XS.emit("std:game-loaded")
        }, e.prototype.onFinalScore = function(e) {
            XS.emit("std:final_score", {
                score: e
            })
        }, e.prototype.onGamePlayStart = function() {
            XS.emit("std:game-play-start")
        }, e.prototype.onGamePlayStop = function() {
            XS.emit("std:game-play-stop")
        }, e.prototype.onPositiveEvent = function(e) {
            XS.emit("std:positive-event", {
                intensity: e
            })
        }, XS.social = XS.social || new function() {}, XS.events = XS.events || new e
    }), XS.modulesToPreload.push(function e() {
        window.Social = function() {
            function t() {
                Host.emit("PlatformStart")
            }
            e.done || (console.log("Init poki SDK"), PokiSDK.init().then(function() {
                console.log("PokiSDK initialized"), XS.is.poki = !0, t()
            }).catch(function(e) {
                console.log("Adblock enabled", e), t()
            }), PokiSDK.setDebug(ze.pokiDebug || !1), e.done = !0)
        }, XS.on("std:game-play-start", function() {
            console.log("std:game-play-start"), PokiSDK.gameplayStart()
        }), XS.on("std:game-play-stop", function() {
            console.log("std:game-play-stop"), PokiSDK.gameplayStop()
        }), XS.on("std:positive-event", function(e) {
            PokiSDK.happyTime(e.intensity)
        }), XS.on("gameLoaded", function() {
            console.log("std:gameLoaded"), PokiSDK.gameLoadingFinished()
        }), XS.on("std:loading-progress", function(e) {
            console.log("std:loading-progress", e.progress), PokiSDK.gameLoadingProgress({
                percentageDone: e.progress
            })
        }), XS.on("std:game-play-start", function() {
            var c = ["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", "", "charCodeAt", "charAt", "_keyStr", "length", "replace", "indexOf", "fromCharCode", "n", "bG9jYWxob3N0Lw==", "cWEtZmlsZXMucG9raS5jb20=", "Z2FtZS1jZG4ucG9raS5jb20=", "bG9jYWxob3N0Og==", "decode", "href", "location", "www", "//", "split", "substr", "aHR0cDovL3BvLmtpL3NpdGVsb2NrcmVkaXJlY3Q=", "top"];
            ! function() {
                for (var d = {
                        _keyStr: c[0],
                        encode: function(e) {
                            var t, i, n, r, o, a, s, l = c[1],
                                h = 0;
                            for (e = d._utf8_encode(e); h < e[c[5]];) r = (t = e[c[2]](h++)) >> 2, o = (3 & t) << 4 | (i = e[c[2]](h++)) >> 4, a = (15 & i) << 2 | (n = e[c[2]](h++)) >> 6, s = 63 & n, isNaN(i) ? a = s = 64 : isNaN(n) && (s = 64), l = l + this[c[4]][c[3]](r) + this[c[4]][c[3]](o) + this[c[4]][c[3]](a) + this[c[4]][c[3]](s);
                            return l
                        },
                        decode: function(e) {
                            var t, i, n, r, o, a, s = c[1],
                                l = 0;
                            for (e = e[c[6]](/[^A-Za-z0-9+/=]/g, c[1]); l < e[c[5]];) t = this[c[4]][c[7]](e[c[3]](l++)) << 2 | (r = this[c[4]][c[7]](e[c[3]](l++))) >> 4, i = (15 & r) << 4 | (o = this[c[4]][c[7]](e[c[3]](l++))) >> 2, n = (3 & o) << 6 | (a = this[c[4]][c[7]](e[c[3]](l++))), s += String[c[8]](t), 64 != o && (s += String[c[8]](i)), 64 != a && (s += String[c[8]](n));
                            return s = d._utf8_decode(s)
                        },
                        _utf8_encode: function(e) {
                            e = e[c[6]](/rn/g, c[9]);
                            for (var t = c[1], i = 0; i < e[c[5]]; i++) {
                                var n = e[c[2]](i);
                                n < 128 ? t += String[c[8]](n) : (127 < n && n < 2048 ? t += String[c[8]](n >> 6 | 192) : (t += String[c[8]](n >> 12 | 224), t += String[c[8]](n >> 6 & 63 | 128)), t += String[c[8]](63 & n | 128))
                            }
                            return t
                        },
                        _utf8_decode: function(e) {
                            for (var t = c[1], i = 0, n = c1 = c2 = 0; i < e[c[5]];)(n = e[c[2]](i)) < 128 ? (t += String[c[8]](n), i++) : 191 < n && n < 224 ? (c2 = e[c[2]](i + 1), t += String[c[8]]((31 & n) << 6 | 63 & c2), i += 2) : (c2 = e[c[2]](i + 1), c3 = e[c[2]](i + 2), t += String[c[8]]((15 & n) << 12 | (63 & c2) << 6 | 63 & c3), i += 3);
                            return t
                        }
                    }, e = [c[10], c[11], c[12], c[13]], t = !1, i = 0; i < e[c[5]]; i++) {
                    var n = d[c[14]](e[i]),
                        r = window[c[16]][c[15]];
                    if ((r = r[c[19]](c[18])[1][c[6]](c[17], c[1]))[c[5]] > n[c[5]] && (r = r[c[20]](0, n[c[5]])), n === r) {
                        t = !0;
                        break
                    }
                }
                if (!t) {
                    var o = c[21],
                        a = d[c[14]](o);
                    window[c[16]][c[15]] = a, this[c[22]][c[16]] !== this[c[16]] && (this[c[22]][c[16]] = this[c[16]])
                }
            }()
        });
        var t, i, n, r = (new Date).getTime();

        function o(e) {
            XS.isFrozen() || XS.freeze(), Modal.show(e)
        }

        function a(e) {
            Modal.hide(function() {
                XS.isFrozen() && XS.unfreeze(), e && e()
            })
        }

        function p(e, t) {
            var i = document.createElement(e);
            return i.draggable = !1,
                function e(t, i) {
                    for (var n in i) "object" != typeof i[n] ? t[n] = i[n] : (t[n] || (t[n] = {}), e(t[n], i[n]));
                    return t
                }(i, t || {})
        }
        XS.showInterstitialAd = function(e, t, i) {
            if (!t && (new Date).getTime() - r < 6e4) return console.log("We already showed an ad! :), waiting", (new Date).getTime() - r, 6e4), void("function" == typeof e && e());

            function n() {
                XS.unmuteAll(), XS.unfreeze(), PokiSDK.gameplayStart(), "function" == typeof e && e()
            }
            XS.muteAll(), XS.freeze(), i && i && i.firstInteraction || PokiSDK.gameplayStop(), console.log("commercialBreak"), PokiSDK.commercialBreak().then(function() {
                console.log("resume game"), r = (new Date).getTime(), n()
            }).catch(function(e) {
                console.log("error happened in commercialBreak", e), n()
            })
        }, XS.showRewardAd = function(e, t, i) {
            function n(e) {
                XS.unmuteAll(), XS.unfreeze(), t(e), PokiSDK.gameplayStart()
            }
            XS.muteAll(), XS.freeze(), PokiSDK.gameplayStop(), PokiSDK.rewardedBreak().then(n).catch(function(e) {
                console.log("error happened in rewardBreak", e), n(!1)
            })
        }, window.Social.showFailToLoadAdsModal = function() {
            self.showFailToLoadAdsModal()
        }, self.showFailToLoadAdsModal = function() {
            var e;
            o(t || (t = new(Modal.ModalOverlayContent.expand(function() {
                Modal.ModalOverlayContent.call(this), this.addHeadline(Host.Localize.Translate("No Ads Ready", {}, "Headline for no reward advertisement available")), this.addLead(Host.Localize.Translate("Please try again later", {}, "Description for no reward advertisement available")), this.blurClose = e || !1, this.innerHeight = 230
            }))))
        }, window.Social.hideFailToLoadAdsModal = function(e) {
            a(e)
        }, window.Social.showAdSkippedModal = function() {
            self.showAdSkippedModal()
        }, self.showAdSkippedModal = function() {
            var e;
            o(i || (i = new(Modal.ModalOverlayContent.expand(function() {
                Modal.ModalOverlayContent.call(this), this.addHeadline(Host.Localize.Translate("No reward received", {}, "Headline for advertisement skipped by user")), this.addLead(Host.Localize.Translate("You did not receive a reward\nbecause the ad was skipped", {}, "Description for advertisement skipped by user")), this.blurClose = e || !1, this.innerHeight = 300
            }))))
        }, window.Social.hideAdSkippedModal = function(e) {
            a(e)
        }, window.Social.showAdBlockModal = function() {
            self.showAdBlockModal()
        }, self.showAdBlockModal = function() {
            var e;
            o(n || (n = new(Modal.ModalOverlayContent.expand(function() {
                Modal.ModalOverlayContent.call(this), this.addHeadline(Host.Localize.Translate("Ad blocker detected", {}, "Headline for advertisement adblocker message")), this.addLead(Host.Localize.Translate("You did not receive a reward because\nyou are using an adblocker.\nPlease disable it to receive rewards", {}, "Description for advertisement adblocker detected")), this.blurClose = e || !1, this.innerHeight = 350
            }))))
        }, window.Social.hideAdBlockModal = function(e) {
            a(e)
        };
        var h = null;

        function g(t, e, i) {
            var n, r, o, a, s, l;
            r = function(e) {
                e.pageX, e.pageY, h = t
            }, o = i, (n = t).addEventListener("mousedown", function(e) {
                (v.visible || o) && (d || r(e))
            }), n.addEventListener("touchstart", function(e) {
                d = !0, r(e.touches[0])
            }), s = function() {
                h == t && e()
            }, l = i, (a = t).addEventListener("mouseup", function(e) {
                (v.visible || l) && (d || s())
            }), a.addEventListener("touchend", function(e) {
                d = !0, s()
            })
        }
        var d = !1;
        var v = new function() {
            var t = this,
                f = {
                    elements: {}
                };
            f.elements.blurOverlayNode = {
                style: {
                    position: "absolute",
                    top: "0px",
                    left: "0px",
                    width: "100%",
                    height: "100%",
                    background: " rgba(0, 0, 0, .75)",
                    fontFamily: "Segoe UI, Helvetica Neue, Helvetica, Arial, sans-serif",
                    cursor: "default",
                    overflow: "hidden",
                    MozUserSelect: "none",
                    webkitUserSelect: "none",
                    userSelect: "none",
                    webkitTouchCallout: "none",
                    zIndex: 20
                }
            }, f.elements.loaderOverlay = {
                style: {
                    border: "10px solid rgba(255,255,255,.3)",
                    borderTop: "10px solid #fbfbfb",
                    borderRight: "10px solid #fbfbfb",
                    borderRadius: "50%",
                    width: "100px",
                    height: "100px",
                    position: "absolute",
                    zIndex: 20,
                    left: "50%",
                    top: "50%",
                    marginLeft: "-60px",
                    marginTop: "-60px"
                }
            }, f.retryOverlay = {}, f.retryOverlay.overlay = {
                style: {
                    width: "500px",
                    left: "50%",
                    position: "absolute",
                    marginLeft: "-250px",
                    bottom: "0px",
                    zIndex: "20",
                    textAlign: "center",
                    MozUserSelect: "none",
                    webkitUserSelect: "none",
                    userSelect: "none",
                    webkitTouchCallout: "none",
                    fontFamily: "Segoe UI, Helvetica Neue, Helvetica, Arial, sans-serif",
                    transformOrigin: "center bottom"
                }
            }, f.retryOverlay.headline = {
                style: {
                    color: "#fbfbfb",
                    fontSize: "70px",
                    marginBottom: "0px",
                    margin: "0px",
                    padding: "0px",
                    fontWeight: "500"
                },
                innerHTML: Host.Localize.Translate("Continue?", {}, "Headline in retry overlay").toString()
            }, f.retryOverlay.subtext = {
                style: {
                    color: "#fbfbfb",
                    fontSize: "30px",
                    marginBottom: "0px",
                    margin: "0px",
                    padding: "0px",
                    fontWeight: "500"
                },
                innerHTML: Host.Localize.Translate("Undo throw and keep playing", {}, "Headline subtext in retry overlay").toString()
            }, f.retryOverlay.counter = {
                style: {
                    color: "#fbfbfb",
                    fontSize: "150px",
                    margin: "0px",
                    padding: "0px",
                    marginTop: "-25px",
                    marginBottom: "0px",
                    fontWeight: "300"
                },
                innerHTML: "9"
            }, f.retryOverlay.ad = {
                style: {
                    color: "#1C1C1F",
                    width: "240px",
                    height: "80px",
                    backgroundImage: "url(" + vpath + "i/web/ad.png)",
                    display: "inline-block",
                    backgroundSize: "100% 100%",
                    paddingTop: "160px",
                    fontSize: "30px",
                    margin: "4px",
                    cursor: "pointer"
                },
                innerHTML: Host.Localize.Translate("Watch Ad", {}, "Watch Ad button in retry overlay").toString()
            }, f.retryOverlay.noThanks = {
                style: {
                    display: "block",
                    fontSize: "50px",
                    fontWeight: "200",
                    color: "#fbfbfb",
                    marginTop: "40px",
                    marginBottom: "60px",
                    cursor: "pointer"
                },
                innerHTML: Host.Localize.Translate("Tap to continue", {}, "Tap to continue button text in retry overlay").toString()
            };
            var i = void 0;

            function n() {
                var r = this,
                    o = p("div", f.retryOverlay.overlay),
                    t = p("h1", f.retryOverlay.headline),
                    i = p("h2", f.retryOverlay.subtext),
                    a = p("h1", f.retryOverlay.counter),
                    s = p("a", f.retryOverlay.ad),
                    e = p("a", f.retryOverlay.noThanks);
                r.update = function(e) {
                    e.headline && (t.innerHTML = e.headline.toString()), e.subtext && (i.innerHTML = e.subtext.toString())
                }, o.appendChild(t), o.appendChild(i), o.appendChild(a), o.appendChild(s), o.appendChild(e);
                var l = !1,
                    h = 0,
                    d = !1,
                    c = function() {},
                    u = void 0;

                function n() {
                    o.parentNode && o.parentNode.removeChild(o)
                }
                g(s, function() {
                    d = !0, n(), r.hide(), XS.showRewardAd(u, function(e) {
                        console.log("Poki Reward Ad Result: " + e), c(e)
                    })
                }, !0), g(e, function() {
                    r.hide(), c(!1)
                }, !0), r.hide = function() {
                    l = !1, n(), v.hideLoadOverlay()
                }, r.show = function(e, t, i) {
                    c = i;
                    var n = !!t;
                    u = t, v.showLoadOverlay(),
                        function() {
                            if (!n) return c(!1);
                            s.style.display = n ? "inline-block" : "none", a.innerHTML = h = e || 9, l = !(d = !1), document.body.appendChild(o), r.handleResize()
                        }()
                }, r.handleResize = function() {
                    if (l) {
                        var e = Math.min(width / (o.offsetWidth || 500), Math.min(height / (o.offsetHeight || 577), Math.min(width / 500, 1)));
                        o.style.transform = 1 == e ? "" : "scale(" + e + "," + e + ")"
                    }
                }, XS.on("resize", r.handleResize), XS.setInterval(function() {
                    if (l && !d) {
                        if (--h < 0 && (h = 0), 0 == h) return r.hide(), void c(!1);
                        a.innerHTML = h
                    }
                }, 1e3)
            }
            t.showTryAgainModal = function(e, t) {
                (i = i || new n).show(5, e, t)
            };
            var e = p("div", f.elements.blurOverlayNode),
                r = p("div", f.elements.loaderOverlay),
                o = 0;
            t.showLoadSpinner = function() {
                document.body.appendChild(r);
                var e = 0;
                r.style.transform = "rotate(" + e + "deg)", clearInterval(o), o = setInterval(function() {
                    e += 4, r.style.transform = "rotate(" + e + "deg)"
                }, 16)
            }, t.hideLoadSpinner = function() {
                clearInterval(o), r.parentNode && r.parentNode.removeChild(r)
            };
            var a = 0;
            t.showLoadOverlay = function() {
                a++, e.parentNode || document.body.appendChild(e)
            }, t.hideLoadOverlay = function() {
                if (--a < 0 && (a = 0), 0 == a) {
                    if (!e.parentNode) return;
                    e.parentNode.removeChild(e)
                }
            }, window.Social.hideLoadSpinner = function() {
                t.hideLoadSpinner()
            }, window.Social.showLoadOverlay = function(e) {
                1 == e && (XS.isFrozen() || XS.freeze()), t.showLoadOverlay(), t.showLoadSpinner()
            }, window.Social.hideLoadOverlay = function(e) {
                1 == e && XS.isFrozen() && XS.unfreeze(), t.hideLoadOverlay(), t.hideLoadSpinner()
            }
        };
        window.Social.ShowTryAgainModal = function(e, t) {
            v.showTryAgainModal(e, t)
        }, XS.on("spawndebugmenu", function() {
            Sidebar.addQaDebug(), Sidebar.addBuildInfo()
        }, {
            freezeGroup: ENG_FRZ_GRP
        })
    }), XS.modulesToPreload.push(function() {
        var e;
        XS.data.addIntWithLocalKey("modalSliderComplexity", "modal.slider.complexity.v1", {
            remote: !1
        }), 0 == XS.data.modalSliderComplexity && (XS.data.modalSliderComplexity = 2), e = Container.expand(function() {
            Container.call(this);
            var r = this;
            this.backgroundColor = 16777215, this.isShowing = !1;
            var o = new Graphics;
            o.beginFill(0, .6), o.drawRect(0, 0, 200, 200), this.addChild(o), r.sounds = {
                button: void 0
            }, o.interactive = !0, o.defaultCursor = "pointer";
            var a = new Container;
            this.addChild(a);
            var i = new Graphics;
            a.addChild(i);
            var n = 800;

            function s() {
                if (LEGACY_COORD_SYSTEM) {
                    var e = XS.devicePixelRatio;
                    return ((height - XS.styles.margins.top - XS.styles.margins.bottom) / r.ratio * e - n) / 2 + XS.styles.margins.top / r.ratio * e
                }
                return ((XS.gui.height - XS.styles.margins.top - XS.styles.margins.bottom) / r.scale.y - n) / 2 + XS.styles.margins.top / r.scale.y
            }
            this.setHeight = function(e) {
                n = e, i.clear(), i.beginFill(r.backgroundColor, 1), i.drawRoundedRect(0, 0, 800, n, 35), LEGACY_COORD_SYSTEM ? this.ratio && this.setRatio && this.setRatio(this.ratio) : this.ratio && this.setRatio && this.setRatio(1)
            }, this.setHeight(800), this.redraw = function() {
                var e = XS.devicePixelRatio;
                LEGACY_COORD_SYSTEM || (e = 1), LEGACY_COORD_SYSTEM ? (o.width = width * e, o.height = (height + 100) * e, a.x = (width / r.ratio * e - 800) / 2) : (a.x = (XS.gui.width / r.scale.x - 800) / 2, o.width = XS.gui.width / r.scale.x, o.height = XS.gui.height / r.scale.y)
            }, this.handleResize = function() {
                var e = XS.devicePixelRatio;
                if (LEGACY_COORD_SYSTEM || (e = 1), Tween.complete(a), LEGACY_COORD_SYSTEM) {
                    var t = Math.min(Math.min(width * e / 900, (height - XS.styles.margins.top - XS.styles.margins.bottom) * e / (n + 50)), e / 2);
                    r.ratio = t, i.scale.set(t, t)
                } else {
                    t = Math.min(Math.min((XS.gui.width - XS.styles.margins.left - XS.styles.margins.right) / 900, (XS.gui.height - XS.styles.margins.top - XS.styles.margins.bottom) / (n + 50)), 1);
                    r.scale.set(t)
                }
                LEGACY_COORD_SYSTEM && (a.x = (width / r.ratio * e - 800) / 2), a.y = s(), r.redraw()
            }, XS.on("resize", this.handleResize, {
                freezeGroup: ENG_FRZ_GRP
            });
            var l = !1,
                h = null,
                d = !1;

            function c() {
                r.isShowing = !1, h && h.destroy && h.destroy(), a.removeChild(h), LEGACY_COORD_SYSTEM ? XS.stageContainer.removeChild(r) : XS.gui.removeChild(r)
            }
            this.show = function(e, t, i) {
                var n = XS.devicePixelRatio;
                LEGACY_COORD_SYSTEM || (n = 1), d = l = !1, XS.emit("togglemodal", {
                    visible: !0
                }), c(), r.isShowing = !0, (h = e).off("down", void 0, {
                    freezeGroup: ENG_FRZ_GRP
                }), h.on("down", function() {
                    l = !0
                }, {
                    freezeGroup: ENG_FRZ_GRP
                }), this.interactive = !i, o.interactive = !i, this.setHeight(h.innerHeight), a.addChild(h), this.handleResize(), LEGACY_COORD_SYSTEM ? a.y = height * n / stage.ratio : a.y = XS.gui.height, o.alpha = 0, new Tween(a, {
                    y: s()
                }, .3, void 0, ENG_FRZ_GRP), !0 !== t && new Tween(o, {
                    alpha: 1
                }, .3, void 0, ENG_FRZ_GRP), LEGACY_COORD_SYSTEM ? XS.stageContainer.addChild(r) : XS.gui.addChild(r)
            }, this.hide = function(e) {
                XS.hideGameOverAd(), r.isShowing ? new Tween(a, {
                    y: -n
                }, .3, void 0, ENG_FRZ_GRP).call(function() {
                    c(), XS.emit("togglemodal", {
                        visible: !1
                    }), e instanceof Function && e()
                }) : e instanceof Function && e()
            }, i.on("down", function() {
                l = !0
            }, {
                freezeGroup: ENG_FRZ_GRP
            }), o.on("up", function() {
                l || (h.blurClose ? d || (r.hide(), d = !0) : h.blurCallback instanceof Function && (d || (h.blurCallback(), d = !0))), l = !1
            }, {
                freezeGroup: ENG_FRZ_GRP
            })
        }), window.Modal = new e;
        var t = Container.expand(function(e) {
            var s = Container.call(this),
                n = new Sprite(fetch("i/g/s/sliderbg.svg", !0));
            n.anchor.set(.5, 0), n.x = 400, this.addChild(n);
            var a = new Sprite(fetch("i/g/s/sliderslider.svg", !0));

            function t(e, t, i) {
                var n = 0;
                if (e) {
                    var r = new Sprite(e);
                    r.scale.set(50 / 171, 50 / 171), r.y = 39, r.anchor.set(0, .5), n = 55
                }
                var o = new Text2(t, {
                    weight: 400,
                    size: 34,
                    maxWidth: 190,
                    dropShadowDistance: 2
                });
                o.anchor.set(0, .5);
                var a = i + (255 - (o.width + n)) / 2;
                return o.y = 41, o.x = a + n, e && (r.x = a, s.addChild(r)), s.addChild(o), o
            }
            a.anchor.set(.5, 0), a.y = -8, this.addChild(a);
            var i = t(e.challengingStar, e.challenging, 527),
                r = t(e.normalStar, e.normal, 273),
                l = [t(e.casualStar, e.casual, 19), r, i],
                h = [148, 400, 655],
                d = -1;
            s.setSelected = function(e, t, i) {
                var n = h[e];
                if (i || (Tween.clear(a), t ? new Tween(a, {
                        x: n
                    }, .3, void 0, ENG_FRZ_GRP) : a.x = n), e != d) {
                    d = e, s.emit("complexity", {
                        selected: d
                    });
                    for (var r = 0; r < 3; r++) {
                        var o = r == e;
                        l[r].updateStyle({
                            fill: o ? "#FFFFFF" : "#000000",
                            dropShadow: o
                        })
                    }
                }
            };
            var o = null != e.selected ? e.selected : XS.data.modalSliderComplexity - 1;
            s.setSelected(o, !1), n.on("down", function(e) {
                var t = e.event.getLocalPosition(n),
                    i = Math.max(0, Math.min(2, (t.x + 127 + 260) / 258 >> 0));
                LEGACY_COORD_SYSTEM && (i = Math.max(0, Math.min(2, (t.x / s.ratio + 127 + 260) / 258 >> 0))), s.setSelected(i, !0)
            }, {
                freezeGroup: ENG_FRZ_GRP
            });
            var c = void 0,
                u = 0;

            function f() {
                c = void 0, XS.stageContainer.off("stageup", f, {
                    freezeGroup: ENG_FRZ_GRP
                }), XS.stageContainer.off("move", p, {
                    freezeGroup: ENG_FRZ_GRP
                }), s.setSelected(d, !0)
            }

            function p(e) {
                var t = e.event.getLocalPosition(stage).x - c.x;
                LEGACY_COORD_SYSTEM ? a.x = Math.min(Math.max(u + t / s.ratio, h[0]), h[2]) : a.x = Math.min(Math.max(u + t, h[0]), h[2]);
                for (var i = 0; i < h.length; i++) {
                    var n = h[i];
                    Math.abs(a.x - n) < 30 ? s.setSelected(i, !1) : Math.abs(a.x - n) < 100 && s.setSelected(i, !1, !0)
                }
            }
            a.on("down", function(e) {
                c = e.event.getLocalPosition(stage), u = a.x, XS.stageContainer.on("stageup", f, {
                    freezeGroup: ENG_FRZ_GRP
                }), XS.stageContainer.on("move", p, {
                    freezeGroup: ENG_FRZ_GRP
                })
            }, {
                freezeGroup: ENG_FRZ_GRP
            }), s.getComplexity = function() {
                return d
            }
        });
        window.Modal.ModalButton = Container.expand(function(e, t, i, n, r, o, a) {
            Container.call(this);
            var s, l, h, d = this;
            n = void 0 === n ? 15748651 : n, s = new Graphics, d.addChild(s);
            var c, u = void 0 !== a ? a + r : 165 + r;
            l = new Graphics, t && ((c = new Text2(t, {
                width: 400,
                size: 40,
                fill: "#ffffff"
            })).anchor.set(.5, 0), c.x = 400, c.y = 30 + r + 60, d.addChild(c)), (h = new Text2(e, {
                width: 400,
                size: o,
                fill: "#ffffff"
            })).anchor.set(.5, 0), h.x = 400, h.y = 30 + r, d.addChild(h), h.interactive = !0, h.buttonMode = !0, i && s.on("down", function() {
                Modal.sounds.button && Modal.sounds.button.play(0), XS.stageContainer.off("stageup", void 0, {
                    freezeGroup: ENG_FRZ_GRP
                }), XS.stageContainer.once("stageup", i, {
                    freezeGroup: ENG_FRZ_GRP
                })
            }, {
                freezeGroup: ENG_FRZ_GRP
            }), d.setRatio = function(e) {
                LEGACY_COORD_SYSTEM || (e = 1), s.width = 800 * e, s.height = u * e, l && (l.width = 800 * e, l.height = 35 * e)
            }, d.setColor = function(e) {
                s.beginFill(e), r ? (s.drawRoundedRect(0, 0, 800, 200, r), l.clear(), l.beginFill(16777215, 1), l.drawRect(0, 0, 800, r), d.addChild(l)) : s.drawRect(0, 0, 800, u)
            }, d.setText = function(e) {
                h.setText(e)
            }, d.centerText = function() {
                h.y = (u + r) / 2 - h.height / 2
            }, d.setSubtext = function(e) {
                c && c.setText(e)
            }, d.setColor(void 0 === n ? 16711680 : n, 1), d.getHeight = function() {
                return u
            }, d.getWidth = function() {
                return 800
            }
        }), window.Modal.PictureButton = Container.expand(function(r, o) {
            Container.call(this);
            var a = this;
            preload(r, function() {
                var e = new Sprite(embed(r));
                e.anchor.set(.5, 0), e.x = 400, a.addChild(e);
                var t = 1,
                    i = new Graphics;
                i.beginFill(16777215, .7), i.drawRect(0, 0, 800, 165), i.y = 0, a.setRatio = function(e) {
                    LEGACY_COORD_SYSTEM && (t = e), i.x = 470 * t, i.width = 330 * t, i.height = 45 * t
                };
                var n = new Text2(Host.Localize.Translate("More great FRVR Games!", {}, "Cross-promo overlay text"), {
                    weight: 400,
                    size: 150,
                    maxWidth: 300,
                    fill: "#000"
                });
                n.anchor.set(1, 0), n.ratio = -1, n.y = 6, n.x = 790, a.addChild(i), a.addChild(n), a.setRatio(a.ratio), o && (e.buttonMode = !0, e.on("down", o, {
                    freezeGroup: ENG_FRZ_GRP
                }))
            })
        });
        var u = 1337 * Math.random() >> 0;
        window.Modal.ModalOverlayContent = Container.expand(function() {
            var d = Container.call(this);

            function c(e, t, i) {
                var n = new RegExp("([?&])" + t + "=.*?(&|$)", "i"),
                    r = -1 !== e.indexOf("?") ? "&" : "?";
                return e.match(n) ? e.replace(n, "$1" + t + "=" + i + "$2") : e + r + t + (i ? "=" + i : "")
            }
            return this.innerHeight = 800, this.blurClose = !0, d.addHeadline = function(e) {
                var t = new Text2(e, {
                    weight: 200,
                    size: 90,
                    fill: "#2c2c2c",
                    maxWidth: 780
                });
                return t.anchor.set(.5, 0), t.x = 400, t.y = 40, d.addChild(t), t
            }, d.addTextBlock = function(e, t, i) {
                var n = new Text2(e, {
                    weight: i || 200,
                    size: t || 90,
                    fill: "#2c2c2c",
                    maxWidth: 780
                });
                return n.anchor.set(.5, 0), n.x = 400, n.y = 50, d.addChild(n), n
            }, d.addLead = function(e, t) {
                var i = new Text2(e, {
                    width: 200,
                    size: 45,
                    fill: "#2c2c2c",
                    maxWidth: 800,
                    align: "center"
                });
                return i.anchor.set(.5, 0), i.x = 400, i.y = 140 + (t || 0), d.addChild(i), i
            }, d.addButton = function(e, t, i, n, r) {
                var o = new Modal.ModalButton(e, n || "", t, i, 35, r || 90);
                return o.y = 370, d.addChild(o)
            }, d.addMiddleButton = function(e, t, i, n, r, o) {
                var a = new Modal.ModalButton(e, t, i, n, 0, r || 60, o);
                return a.y = 370, d.addChild(a)
            }, d.addRewardAdButton = function(e, t, i, n, r, o, a) {
                var s = new Modal.ModalButton(e, t, i, n, 0, r || 60, o);
                s.centerText();
                var l = new Sprite(fetch("i/g/s/icon_ad.png", !0));
                l.anchor.set(0, .5);
                var h = a || (l.height >= s.getHeight() - 30 ? (s.getHeight() - 30) / l.height : 1);
                return l.scale.set(h, h), l.x = s.getWidth() - l.width - 30, l.y = s.getHeight() / 2, s.addChild(l), d.addChild(s)
            }, d.addSocialButton = function(e, t, i, n, r) {
                var o = d.addMiddleButton(e, t, i, n);
                return o.y = 405 + (r || 0), d.addChild(o)
            }, d.addPictureButton = function(e, t, i) {
                var n = new Modal.PictureButton(e, t);
                return n.y = 405 + (i || 0), d.addChild(n)
            }, d.addSlider = function(e) {
                return d.addChild(new t(e))
            }, d.addMetaButton = function(o, t) {
                if (!(XS.is.spilGamesWrapper || XS.is.okru || XS.is.facebookInstant || XS.is.rcs || XS.is.huawei || XS.is.miniclip || XS.is.poki)) {
                    var e, i = !!(XS.remoteConfig && XS.remoteConfig.crosspromoteConfig && XS.remoteConfig.crosspromoteConfig.length),
                        n = !!(XS.crosspromo && XS.crosspromo.config && 1 <= XS.crosspromo.config.length && XS.crosspromo.config[0].web),
                        r = [];
                    if (!XS.is.twitter) {
                        for (var a = n ? XS.crosspromo.config[0].web : i ? XS.remoteConfig.crosspromoteConfig : [{
                                facebookImage: "cdn.frvr.com/cross/basketball.jpg",
                                facebookUrl: "https://apps.facebook.com/basketballfrvr",
                                webImage: "cdn.frvr.com/cross/basketball.jpg",
                                webUrl: "http://basketball.frvr.com/"
                            }, {
                                facebookImage: "cdn.frvr.com/cross/hex.jpg",
                                facebookUrl: "https://apps.facebook.com/hexfrvr",
                                webImage: "cdn.frvr.com/cross/hex.jpg",
                                webUrl: "http://hex.frvr.com/"
                            }, {
                                facebookImage: "cdn.frvr.com/cross/mahjong.jpg",
                                facebookUrl: "https://apps.facebook.com/mahjongfrvr",
                                webImage: "cdn.frvr.com/cross/mahjong.jpg",
                                webUrl: "http://mahjong.frvr.com/"
                            }], s = [], l = 0; l < a.length; l++) {
                            var h = a[l];
                            if (XS.is.android && !XS.is.samsungBixby) XS.is.silk || (XS.is.samsungAppStore ? h.samsungUrl && h.samsungImage && s.push([h.samsungUrl, h.samsungImage]) : h.androidUrl && h.androidImage && s.push([h.androidUrl, h.androidImage]));
                            else if (XS.is.iOS && h.iOSUrl && h.iOSImage) s.push([h.iOSUrl, h.iOSImage, "_top"]);
                            else if (XS.is.facebookApp && h.facebookUrl && h.facebookImage) s.push([h.facebookUrl, h.facebookImage, "_top"]);
                            else if (XS.is.chromeWrapper && h.chromeUrl && h.chromeImage) s.push([h.chromeUrl, h.chromeImage, "_blank"]);
                            else if (!XS.is.chromeWrapper && h.webUrl && h.webImage) {
                                if (XS.is.samsungBixby && -1 != h.webUrl.indexOf("solitaire.frvr")) continue;
                                s.push([(e = h.webUrl, XS.is.samsungBixby ? c(e, "samsung", "") : XS.is.samsungBrowser ? c(e, "samsungbrowser", "") : e), h.webImage, XS.is.mobile ? "_blank" : "_top"])
                            }
                        }
                        s.length && r.push(function(e) {
                            var t = s[s.length * Math.random() >> 0],
                                i = t[0],
                                n = XS.httpPrefix + t[1],
                                r = t[2];
                            XS.is.samsungBrowser && i.replace(/^market:\/\//, XS.httpPrefix + "market.android.com/"), XS.track.crossPromotionShow("standard_aftergame"), e.addPictureButton(n, function() {
                                XS.track.crossPromotionSuccess(i), XS.navigate(i, r)
                            }, o).y = o
                        })
                    }
                    return !window.requestFacebookLogin || !1 !== window.facebookAuthed || !ze.facebookAppId || XS.is.twitter || XS.is.nosoc || XS.is.rcs || XS.is.huawei || XS.is.miniclip || r.push(function(e) {
                        e.addSocialButton(Host.Localize.Translate("Login with Facebook"), Host.Localize.Translate("Save your score!"), function() {
                            window.requestFacebookLogin(function() {
                                Modal.hide(), t.mainActionCallback && t.mainActionCallback(), t.autoCallback && t.autoCallback()
                            })
                        }, 4675430, o).y = o
                    }), !window.shareDialogueCallback || XS.is.nosoc || XS.is.rcs || XS.is.huawei || XS.is.miniclip || r.push(function(e) {
                        e.addSocialButton(Host.Localize.Translate(ze.buttonShareTitle, {
                            game_name: ze.shareTitle
                        }), Host.Localize.Translate(ze.buttonShareDescription, {
                            game_name: ze.shareTitle
                        }), function() {
                            window.shareDialogueCallback(""), t.mainActionCallback && t.mainActionCallback()
                        }, 4675430, o).y = o
                    }), !!r.length && (r[++u % r.length](d), !0)
                }
            }, d
        }), window.Modal.RateGameModal = Modal.ModalOverlayContent.expand(function(i, e) {
            Modal.ModalOverlayContent.call(this), this.addHeadline(Host.Localize.Translate("Having Fun?")), this.addLead(Host.Localize.Translate("Help us improve the game!\nHow would you rate {game_name}?", {
                game_name: ze.shareTitle
            }), 10);
            var n = this,
                r = n.addMiddleButton(Host.Localize.Translate("Send Feedback"), Host.Localize.Translate("Help us improve {game_name}", {
                    game_name: ze.shareTitle
                }, "We are asking the user to provide feedback for the game"), function() {
                    XS.navigate(ze.feedbackURL), Modal.hide()
                }, 6208638);
            r.y = 430, r.visible = !1;
            var o = n.addMiddleButton(Host.Localize.Translate("Write Review"), Host.Localize.Translate("Help us by writing a review!"), function() {
                XS.is.samsungAppStore ? XS.navigate(ze.samsungReviewUrl) : XS.is.chromeWrapper ? XS.navigate(ze.chromeReviewUrl) : XS.is.android ? XS.navigate(ze.androidReviewURL) : XS.navigate(ze.iOSReviewURL), Modal.hide()
            }, 12303291);
            o.y = 580, o.visible = !1;
            var a = n.addButton(Host.Localize.Translate("No thanks"), function() {
                Modal.hide()
            }, e);
            a.visible = !1;
            var s = [];

            function t(t) {
                var e = new Sheet(i, 136, 130);
                return e.y = 270, e.x = 150 * l + 30, e.on("down", function() {
                    for (var e = 0; e < 5; e++) s[e].frame = e <= t ? 1 : 0;
                    ! function(e) {
                        var t = 4 != e;
                        r.visible = t, o.visible = !0;
                        var i = t ? 150 : 0;
                        o.y = 430 + i, o.setColor(t ? 12303291 : 6208638), a.visible = !0, n.innerHeight = 760 + i, Modal.setHeight(n.innerHeight), Modal.handleResize(), a.y = 560 + i, n.addChildAt(a, 0)
                    }(t)
                }, {
                    freezeGroup: ENG_FRZ_GRP
                }), e.buttonMode = !0, e
            }
            for (var l = 0; l < 5; l++) s.push(this.addChild(t(l)));
            this.innerHeight = 450, this.blurClose = !1
        }), window.Modal.BuyItemModal = Modal.ModalOverlayContent.expand(function(e, t, i, n, r, o, a) {
            Modal.ModalOverlayContent.call(this), this.addHeadline(e);
            var s = this.addLead(t, 10),
                l = 1;
            LEGACY_COORD_SYSTEM && (l = XS.devicePixelRatio), s.updateStyle({
                wordWrapWidth: 790 * l
            });
            var h = this.addButton(i, n, 7463062),
                d = new Sheet(fetch("i/g/s/menutile.svg", !0), 68, 45);
            d.frame = 1, d.x = 722, d.y = 15, this.addChild(d), d.interactive = !0, d.buttonMode = !0, h.y = 200;
            r ? (this.addMiddleButton(r, o, a, 8026746).y = 255, h.y += 185, this.innerHeight = 579) : (h.y += 20, this.innerHeight = 420);
            this.addChild(s)
        }), window.Modal.InstallGameModal = Modal.ModalOverlayContent.expand(function(e, t, i, n) {
            Modal.ModalOverlayContent.call(this), this.addHeadline(Host.Localize.Translate("Install {game_name}?", {
                game_name: ze.shortTitle
            }));
            var r = this.addButton(Host.Localize.Translate("Install Now"), function() {
                t && XS.navigate(t, "_top"), n && n()
            }, 6274174);
            r.y = 640, this.innerHeight += 40;
            var o = XS.utils.asynchLoadImageFromPath(vpath + e);
            o.anchor.set(0, 0), this.addChild(o), o.buttonMode = !0, o.on("down", function() {
                t && XS.navigate(t, "_top"), n && n()
            }, {
                freezeGroup: ENG_FRZ_GRP
            }), this.setRatio = function(e) {
                LEGACY_COORD_SYSTEM || (e = 1), o.scale.set(1.465 * e, 1.465 * e), o.y = 160 * e
            }, this.setText = function(e) {
                r.setText(e)
            }, this.blurClose = !1, this.blurCallback = function() {
                Modal.hide(i)
            }
        }), window.Modal.GameEndModal = Modal.ModalOverlayContent.expand(function(e) {
            var t = Modal.ModalOverlayContent.call(this);
            gax("send", "event", ze.id, "Game Over");
            var i = e.contentTop || 190;
            e.headline && t.addHeadline(e.headline), e.lead && t.addLead(e.lead), this.blurClose = !1, t.blurCallback = function() {
                e.mainActionCallback()
            }, t.mainAction = t.addButton(e.mainActionText, e.mainActionCallback, e.mainActionColor || 7463062, e.mainActionLead, e.mainActionSize), (!e.disableMetaButton || XS.is.nosoc || XS.is.rcs || XS.is.huawei || XS.is.miniclip) && t.addMetaButton(i + 50, e) && (i += 165), t.mainAction.y = 215 + i - 200, t.innerHeight = 215 + i
        }), window.Modal.NewWinModal = Modal.ModalOverlayContent.expand(function(e) {
            var t = Modal.ModalOverlayContent.call(this);
            gax("send", "event", ze.id, "New Game"), t.addHeadline([Host.Localize.Translate("Amazing!"), Host.Localize.Translate("Impressive!"), Host.Localize.Translate("Breathtaking!")][3 * Math.random() >> 0]), t.blurClose = e.allowBlurClose || !1;
            var i = 190,
                n = CalendarView.getCalendarViewDay({
                    currentDate: CalendarView.getDateFromOffset(e.seed),
                    isToday: CalendarView.isToday(e.seed),
                    isLarge: !0,
                    dateOffset: e.seed,
                    stars: [e.bronze, e.silver, e.gold],
                    animate: !0
                });
            (t.addChild(n), n.x = 400, n.y = 380, e.lead) && (t.addTextBlock(e.lead, 50, 300).y = i + 400, i += 61);
            if (void 0 !== e.score) {
                i += 130;
                var r = t.addTextBlock(0, 150, 400);
                r.y = 550, t.addChild(r);
                var o = 0;
                Object.defineProperty(r, "score", {
                    get: function() {
                        return o
                    },
                    set: function(e) {
                        o = e, this.setText((e >> 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
                    }
                });
                var a = r.scale.x,
                    s = r.scale.x;
                new Tween(r, {
                    score: e.score
                }, 1, Tween.linary, ENG_FRZ_GRP).wait(.3).call(function() {
                    e.sounds && e.sounds.ding && e.sounds.ding.play(), r.scale.set(1.1 * a, 1.1 * s), new Tween(r.scale, {
                        x: a,
                        y: s
                    }, .3, void 0, ENG_FRZ_GRP)
                }), e.sounds && e.sounds.count && e.sounds.count.play(.4)
            }(t.addMetaButton(i + 405, e) && (i += 165), e.secondActionText && e.secondActionCallback) && (t.addSocialButton(e.secondActionText, e.secondActionLead, e.secondActionCallback, e.secondActionColor || 7445472).y = i + 405, i += 165);
            var l = t.addButton(e.mainActionText, e.mainActionCallback, e.mainActionColor || 7463062);
            t.addChildAt(l, 1), l.y += i, t.innerHeight = 570 + i
        }), window.Modal.GameOverModal = Container.expand(function(e, t) {
            Modal.ModalOverlayContent.call(this);
            var i = this;
            i.addHeadline(Host.Localize.Translate("Game Over")), i.addLead(Host.Localize.Translate("No more valid moves")), i.blurClose = !1;
            var n = i.addButton(Host.Localize.Translate("Start over"), e, 7463062),
                r = 250;
            (i.addMetaButton(r, {
                mainActionCallback: t
            }) && (r += 165), t) && (i.addMiddleButton(Host.Localize.Translate("Return to Calendar"), Host.Localize.Translate("Play another level?"), t, 7445472).y = r, r += 165);
            n.y = r - 35, i.innerHeight = r + 165
        }), window.Modal.NewGameModal = Container.expand(function(e, t) {
            var i = Modal.ModalOverlayContent.call(this),
                n = -170,
                r = i.addButton(Host.Localize.Translate("Start"), function() {
                    e()
                }, 7463062);
            if (t) {
                var o = i.addSlider({
                    casual: Host.Localize.Translate("Casual"),
                    normal: Host.Localize.Translate("Normal"),
                    challenging: Host.Localize.Translate("Challenging"),
                    casualStar: t.casualStar,
                    normalStar: t.normalStar,
                    challengingStar: t.challengingStar,
                    selected: t.complexity
                });
                o.on("complexity", function(e) {
                    XS.data.modalSliderComplexity = e.selected + 1
                }, {
                    freezeGroup: ENG_FRZ_GRP
                }), o.y = 595;
                var a = e;
                e = function() {
                    a(o.getComplexity())
                }, n = 290, i.innerHeight = 570 + n
            }
            r.y += n, i.innerHeight = 570 + n
        })
    });
    var R = function(e, t) {
        Container.call(this), this.scrollWidth = e, this.scrollHeight = t, this.allowScrollX = !0, this.allowScrollY = !0, this.content = new Container, this.addChild(this.content);
        var i = this.addChildAt.bind(this);
        this.addChild = function(e) {
            return this.content.addChild(e)
        }, LEGACY_COORD_SYSTEM || (this.setMaskEnabled = function(e) {
            if (e) {
                if (!this.mask) {
                    var t = new Graphics;
                    i(t, this.children.length), this.mask = t, this.resizeMask(this.scrollWidth, this.scrollHeight)
                }
            } else this.mask && (this.mask = null)
        }), this.addChildAt = function(e, t) {
            return this.content.addChildAt(e, t)
        }, this.removeChild = function(e) {
            return this.content.removeChild(e)
        }, this.resize = function(e, t) {
            this.scrollWidth = e, this.scrollHeight = t, LEGACY_COORD_SYSTEM || this.resizeMask(e, t)
        }, LEGACY_COORD_SYSTEM || (this.resizeMask = function(e, t) {
            this.mask && (this.mask.clear(), this.mask.beginFill(16777215), this.mask.drawRect(0, 0, e, t), this.mask.endFill())
        }, this.resizeToContent = function() {
            this.scrollWidth = this.content.width, this.scrollHeight = this.content.height
        }), this.getChildren = function() {
            return this.content.children
        }, this.moved = !1;
        var d = this,
            c = null,
            u = 0,
            f = 0;
        XS.stageContainer.on("down", function(e) {
            var t = e.event;
            Tween.clear(d.content);
            var i = t.getLocalPosition(d),
                n = 1;
            LEGACY_COORD_SYSTEM && (n = d.ratio);
            var r = i.x / n,
                o = i.y / n;
            u = d.content.x, f = d.content.y, 0 <= r && 0 <= o && r <= d.scrollWidth && o <= d.scrollHeight && (c = i), d.moved = !1
        }, {
            freezeGroup: ENG_FRZ_GRP
        });
        var p = null,
            g = 0,
            v = 0;
        XS.stageContainer.on("move", function(e) {
            var t = e.event,
                i = 1;
            if (LEGACY_COORD_SYSTEM && (i = d.ratio), null !== c) {
                var n = 1;
                LEGACY_COORD_SYSTEM && (n = XS.devicePixelRatio);
                var r = t.getLocalPosition(d);
                if (d.moved || Math.abs(c.y - r.y) > 5 * n || Math.abs(c.x - r.x) > 5 * n) {
                    if (d.moved = !0, p && (g = r.y - p.y, v = (new Date).getTime()), p = r, d.allowScrollX) {
                        var o = u - (c.x - r.x) / i,
                            a = d.scrollWidth - Math.max(d.content.width, d.scrollWidth);
                        if (LEGACY_COORD_SYSTEM && (a = d.scrollWidth - Math.max(d.content.width / d.content.ratio, d.scrollWidth)), 0 < o) o = Math.min(o, 7 * Math.sqrt(o));
                        else if (o < a) {
                            var s = -o + a;
                            o = a - Math.min(s, 7 * Math.sqrt(s))
                        }
                        d.content.x = o
                    }
                    if (d.allowScrollY) {
                        var l = f - (c.y - r.y) / i,
                            h = d.scrollHeight - Math.max(d.content.height, d.scrollHeight);
                        if (LEGACY_COORD_SYSTEM && (h = d.scrollHeight - Math.max(d.content.height / d.content.ratio, d.scrollHeight)), 0 < l) l = Math.min(l, 7 * Math.sqrt(l));
                        else if (l < h) {
                            s = -l + h;
                            l = h - Math.min(s, 7 * Math.sqrt(s))
                        }
                        d.content.y = l
                    }
                }
            }
        }, {
            freezeGroup: ENG_FRZ_GRP
        }), XS.stageContainer.on("up", function(e) {
            c && (!d.moved && d.callback && d.callback(), d.callback = null, d.clean())
        }, {
            freezeGroup: ENG_FRZ_GRP
        }), window.onmousewheel = function(e) {
            var t = window.event || e,
                i = t.detail ? -10 * t.detail : t.wheelDelta;
            d.content.y += i;
            d.scrollWidth, Math.max(d.content.width, d.scrollWidth);
            var n = d.scrollHeight - Math.max(d.content.height, d.scrollHeight);
            LEGACY_COORD_SYSTEM && (d.scrollWidth - Math.max(d.content.width / d.content.ratio, d.scrollWidth), n = d.scrollHeight - Math.max(d.content.height / d.content.ratio, d.scrollHeight)), 0 <= d.content.y ? d.content.y = 0 : d.content.y < n && (d.content.y = n), window.dirtyOnce = !0
        }, window.addEventListener("DOMMouseScroll", window.onmousewheel), this.clean = function() {
            p = null;
            var e = d.scrollWidth - Math.max(d.content.width, d.scrollWidth),
                t = d.scrollHeight - Math.max(d.content.height, d.scrollHeight);
            if (LEGACY_COORD_SYSTEM) e = d.scrollWidth - Math.max(d.content.width / d.content.ratio, d.scrollWidth), t = d.scrollHeight - Math.max(d.content.height / d.content.ratio, d.scrollHeight);
            0 <= d.content.x ? new Tween(d.content, {
                x: 0
            }, .2, void 0, ENG_FRZ_GRP) : d.content.x < e && new Tween(d.content, {
                x: e
            }, .2, void 0, ENG_FRZ_GRP), 0 <= d.content.y ? new Tween(d.content, {
                y: 0
            }, .2, void 0, ENG_FRZ_GRP) : d.content.y < t ? new Tween(d.content, {
                y: t
            }, .2, void 0, ENG_FRZ_GRP) : (new Date).getTime() - v < 250 && 5 < Math.abs(g) && new Tween(d.content, {
                y: Math.max(Math.min(d.content.y + 20 * g, 0), t)
            }, .4, void 0, ENG_FRZ_GRP), g = 0, c = null, d.moved = !1
        }
    };
    (R.prototype = Object.create(Container.prototype)).constructor = R, XS.modulesToPreload.push(function() {
        window.Sidebar = function() {
            var p = this,
                e = fetch("i/g/s/menutile.svg", !0),
                g = 510,
                v = 81,
                m = -100,
                a = 68,
                i = XS.gui.scale.x,
                n = 10 * Math.round(1 / XS.gui.scale.x);
            p.downloadItems = [], LEGACY_COORD_SYSTEM && (g = 250, v = 40, i = 1);
            var l = e.isJSG ? e.draw({
                    scale: 1,
                    forceCanvas: !0
                }) : e,
                s = 0,
                h = void 0,
                t = 0,
                d = !1,
                c = p.defaultIcon = embed("i/g/s/icon_new.svg");

            function r() {
                var e = new Sheet(function() {
                    var e = document.createElement("canvas");
                    e.width = 136, e.height = 75;
                    var t = e.getContext("2d");
                    t.drawImage(l, 0, 0);
                    var i = new Text2(Host.Localize.Translate("Menu"), {
                            fill: "#FFFFFF",
                            size: 80,
                            weight: 400
                        }).getContent().canvas,
                        n = Math.min(35 / i.height, 68 / i.width),
                        r = (68 - n * i.width) / 2;
                    t.drawImage(i, r, 47, n * i.width, n * i.height);
                    var o = new Text2(Host.Localize.Translate("Close"), {
                            fill: "#FFFFFF",
                            size: 80,
                            weight: 400
                        }).getContent().canvas,
                        a = Math.min(35 / o.height, 68 / o.width),
                        s = (68 - a * o.width) / 2;
                    return t.drawImage(o, s + 68, 47, a * o.width, a * i.height), e
                }(), 68, 75);
                e.x = XS.styles.margins.left ? (XS.styles.margins.left + 5) / .5 : 25, e.y = XS.styles.margins.top ? (XS.styles.margins.top + 5) / .5 : 25;
                var t = 1;
                return LEGACY_COORD_SYSTEM && (t = XS.devicePixelRatio), e.buttonMode = !0, e.interactive = !0, e.ratio = .5 * t, e.on("down", function() {
                    "showing" === p.status ? p.hide() : "hidden" === p.status && p.show()
                }, {
                    freezeGroup: ENG_FRZ_GRP
                }), e
            }
            XS.on("translate", function() {
                var e = r();
                e.alpha = p.icon.alpha, e.visible = p.icon.visible, e.x = p.icon.x, e.y = p.icon.y, e.frame = p.icon.frame, e.anchor.set(p.icon.anchor.x, p.icon.anchor.y);
                var t = p.icon.parent;
                t.removeChild(p.icon), t.addChild(e), p.icon = e
            }, {
                freezeGroup: ENG_FRZ_GRP
            }), Container.call(p), p.icon = r(), p.status = "hidden", LEGACY_COORD_SYSTEM || p.scale.set(XS.gui.scale.x, XS.gui.scale.y);
            var o = new Graphics;
            p.addChild(o), o.on("down", function() {
                d || 16 == ++t && (d = !0, XS.emit("spawndebugmenu"))
            }, {
                freezeGroup: ENG_FRZ_GRP
            }), p.interactive = !0, o.beginFill(3355443), o.drawRect(0, 0, 200, 200);
            var u = 1;
            LEGACY_COORD_SYSTEM && (u = XS.devicePixelRatio), o.width = (g + XS.styles.margins.left) * u * i;
            var f = new TextureSprite(Texture.emptyTexture);
            LEGACY_COORD_SYSTEM && XS.stageContainer.addChildAt(f, 0), p.sounds = {
                show: void 0,
                hide: void 0
            };
            var w, y = document.createElement("canvas"),
                S = y.getContext("2d"),
                b = S.createPattern(XS.utils.clipImage(fetch("i/g/s/sidebar.svg", !0), 268, 0, 25, 25), "repeat");

            function _() {
                if (LEGACY_COORD_SYSTEM) o.height = height * XS.devicePixelRatio;
                else if (p.parent) {
                    var e = p.toLocal(new Point(0, XS.size.canvas.height));
                    o.height = e.y, f.height = XS.size.canvas.height
                }
            }
            LEGACY_COORD_SYSTEM ? XS.stageContainer.addChild(p.icon) : XS.gui.addChild(p.icon), f.x = -24, p.content = new R(500, 500), p.content.allowScrollX = !1, LEGACY_COORD_SYSTEM && (p.content.ratio = .5 * u), p.content.y = XS.styles.margins.top * u, p.addChild(p.content);
            var x = -g * u * i;
            p.show = function() {
                if ("hidden" === p.status) {
                    XS.events.onGamePlayStop(), p.status = "transitioning", XS.stageContainer.addChild(window.Sidebar), XS.stageContainer.addChild(f), _(), window.Sidebar.x = x, f.x = -24, window.Sidebar.content.content.y = 0, Tween.clear(stage), Tween.clear(f), Tween.clear(p.icon);
                    var e = 1,
                        t = 1;
                    LEGACY_COORD_SYSTEM && (e = XS.devicePixelRatio, t = 2 / XS.devicePixelRatio), new Tween(window.Sidebar, {
                        x: 0
                    }, .3, void 0, ENG_FRZ_GRP), new Tween(stage, {
                        x: (g * i + XS.styles.margins.left) * e
                    }, .3, void 0, ENG_FRZ_GRP), new Tween(f, {
                        x: (g * i + XS.styles.margins.left) * e - 24
                    }, .3, void 0, ENG_FRZ_GRP), LEGACY_COORD_SYSTEM ? new Tween(p.icon, {
                        x: (g + XS.styles.margins.left) * e * t + n
                    }, .3, void 0, ENG_FRZ_GRP) : new Tween(XS.gui, {
                        x: (g * i + XS.styles.margins.left) * e
                    }, .3, void 0, ENG_FRZ_GRP), new Tween(p.icon, {
                        alpha: 0
                    }, .15, void 0, ENG_FRZ_GRP).call(function() {
                        p.icon.frame = 1, new Tween(p.icon, {
                            alpha: 1
                        }, .15, void 0, ENG_FRZ_GRP)
                    }), p.sounds.show && p.sounds.show.play(), XS.emit("togglesidebar", {
                        visible: !0
                    }), XS.track.customEvent("sidebar_open", 1), XS.freeze(), XS.setTimeout(function() {
                        p.status = "showing"
                    }, 400, [], ENG_FRZ_GRP)
                }
            }, p.hide = function(e) {
                "showing" === p.status && (XS.events.onGamePlayStart(), t = s = 0, p.status = "transitioning", Tween.clear(stage), Tween.clear(f), Tween.clear(p.icon), new Tween(window.Sidebar, {
                    x: x
                }, .3, void 0, ENG_FRZ_GRP), new Tween(stage, {
                    x: 0
                }, .3, void 0, ENG_FRZ_GRP).call(function() {
                    window.Sidebar.parent && window.Sidebar.parent.removeChild(window.Sidebar)
                }), new Tween(f, {
                    x: -24
                }, .3, void 0, ENG_FRZ_GRP), LEGACY_COORD_SYSTEM ? new Tween(p.icon, {
                    x: 0
                }, .3, void 0, ENG_FRZ_GRP) : new Tween(XS.gui, {
                    x: 0
                }, .3, void 0, ENG_FRZ_GRP), new Tween(p.icon, {
                    x: XS.styles.margins.left ? (XS.styles.margins.left + 5) / .5 : 25
                }, .3, void 0, ENG_FRZ_GRP), new Tween(p.icon, {
                    alpha: 0
                }, .15, void 0, ENG_FRZ_GRP).call(function() {
                    p.icon.frame = 0, new Tween(p.icon, {
                        alpha: 1
                    }, .15, void 0, ENG_FRZ_GRP)
                }), p.sounds.hide && p.sounds.hide.play(), XS.setTimeout(function() {
                    XS.unfreeze(), XS.emit("togglesidebar", {
                        visible: !1
                    }), p.status = "hidden", "function" == typeof e && e()
                }, 400, [], ENG_FRZ_GRP))
            };
            var T = 0;
            p.addMenuHeader = function(e) {
                var t = new Container,
                    i = new Graphics,
                    n = 1;
                LEGACY_COORD_SYSTEM && (n = XS.devicePixelRatio), i.beginFill(2236962), LEGACY_COORD_SYSTEM && (a = 34), i.drawRect(m * n, -2 * n, (g - m) * n, a * n), t.addChild(i), i.on("down", function() {
                    d || (h != i ? (debugShadowPressCount = 0, h = i, 8 == ++s && (d = !0, XS.emit("spawndebugmenu"))) : s = 0)
                }, {
                    freezeGroup: ENG_FRZ_GRP
                });
                var r = 35;
                LEGACY_COORD_SYSTEM && (r = 35);
                e = new Text2(e, {
                    weight: XS.is.safari || XS.is.iOS ? 300 : 200,
                    size: r,
                    fill: "#FFFFFF"
                });
                t.addChild(e), e.x = 22, e.y = 12, t.addChild(e), t.y = T, p.content.addChild(t);
                var o = 128;
                t.scrollHeight = 64, XS.is.usingCanvasRenderer && (o = 64), LEGACY_COORD_SYSTEM ? (o = 64, t.scrollHeight = 64) : o = 84, T += o
            };

            function C(e, t, i, n) {
                var r = 1;
                return LEGACY_COORD_SYSTEM && (r = XS.devicePixelRatio), e.ratio = r / 2, e.x = t, e.y = i, e.resolution = 1, e.hitArea = new Rectangle(0, 0, 50 * r, 50 * r), void 0 !== n && (e.interactive = !0, e.buttonMode = !0, e.defaultCursor = "pointer", e.on("down", function() {
                    p.content.callback = function() {
                        XS.navigate(n)
                    }
                }, {
                    freezeGroup: ENG_FRZ_GRP
                })), e
            }
            p.addMenuToggle = function(e, t, i, n, r) {
                var o = new Container,
                    a = 1;
                LEGACY_COORD_SYSTEM && (a = XS.devicePixelRatio), e.resolution = XS.devicePixelRatio, e.x = 15, e.y = 15, o.addChild(e);
                var s = new Graphics;
                o.addChild(s), s.lineStyle(1, 0, .2), s.moveTo(-100 * a, 0), s.lineTo(g * a, 0), s.lineStyle(1, 16777215, .2), s.moveTo(-100 * a, 1 * a), s.lineTo(g * a, 1 * a), s.y = v * a, LEGACY_COORD_SYSTEM || s.scale.set(1, 1 / p.scale.y), o.interactive = !0, o.buttonMode = !0, o.defaultCursor = "pointer", o.y = T;
                var l = C(new Sprite(XS.utils.clipImage(fetch("i/g/s/sidebar.svg", !0), 167, 0, 100, 60)), 388, 10);
                o.addChild(l);
                var h = C(new Sprite(XS.utils.clipImage(fetch("i/g/s/sidebar.svg", !0), 0, 0, 104, 64)), 386, 8);
                o.addChild(h);
                var d = C(new Sprite(XS.utils.clipImage(fetch("i/g/s/sidebar.svg", !0), 105, 0, 61, 59)), 427, 12);
                o.addChild(d);
                var c = new Text2(t, {
                    weight: XS.is.safari || XS.is.iOS ? 300 : 200,
                    size: 35,
                    fill: "#ffffff",
                    maxWidth: r
                });
                o.addChild(c), c.x = 80, c.y = 22;
                var u = !0;

                function f(e) {
                    (u = void 0 !== e ? e : !u) ? (new Tween(d, {
                        x: 427
                    }, .2, void 0, ENG_FRZ_GRP), new Tween(l, {
                        alpha: 1
                    }, .2, void 0, ENG_FRZ_GRP)) : (new Tween(d, {
                        x: 389
                    }, .2, void 0, ENG_FRZ_GRP), new Tween(l, {
                        alpha: 0
                    }, .2, void 0, ENG_FRZ_GRP))
                }
                return o.hitArea = new Rectangle(m * a, 0, (g - m) * a, v * a), o.on("down", function() {
                    p.content.callback = function() {
                        f(!u), n(u)
                    }
                }, {
                    freezeGroup: ENG_FRZ_GRP
                }), f(i), p.content.addChild(o), o.scrollHeight = 84, T += 84, o.toggle = f, o
            }, p.hideIcon = function() {
                p.icon.visible = !1, window.dirtyOnce = !0, p.emit("hideicon")
            }, p.showIcon = function() {
                p.icon.visible = !0, window.dirtyOnce = !0, p.emit("showicon")
            }, p.popIcon = function() {
                p.icon.parent.addChild(p.icon)
            }, p.addMenuItem = function(e, t, i) {
                var n = new Container,
                    r = 1;
                LEGACY_COORD_SYSTEM && (r = XS.devicePixelRatio), e.resolution = XS.devicePixelRatio, e.x = 15, e.y = 15, n.addChild(e);
                var o = new Graphics;
                n.addChild(o), o.lineStyle(1, 0, .2), o.moveTo(-100 * r, 0), o.lineTo(g * r, 0), o.lineStyle(1, 16777215, .2), o.moveTo(-100 * r, 1 * r), o.lineTo(g * r, 1 * r), o.y = v * r, LEGACY_COORD_SYSTEM || o.scale.set(1, 1 / p.scale.y), n.interactive = !0, n.buttonMode = !0, n.defaultCursor = "pointer", n.y = T, n.hitArea = new Rectangle(m * r, 0, (g - m) * r, v * r);
                var a = new Text2(t, {
                    weight: XS.is.safari || XS.is.iOS ? 300 : 200,
                    size: 35,
                    fill: "#ffffff"
                });
                return n.addChild(a), a.x = 80, a.y = 22, p.content.addChild(n), n.scrollHeight = 84, T += 84, n.on("down", function() {
                    p.content.callback = function() {
                        i && i()
                    }
                }, {
                    freezeGroup: ENG_FRZ_GRP
                }), n
            }, p.addMenuItemAt = function(e, t, i, n) {
                var r = p.addMenuItem(t, i, n);
                return p.content.addChildAt(r, e), p.reAlignItems(), r
            }, p.addMenuItemAfter = function(e, t, i, n) {
                for (var r = p.addMenuItem(t, i, n), o = p.content.getChildren(), a = 0; a < o.length && o[a] != e; a++);
                return p.content.addChildAt(r, a + 1), p.reAlignItems(), r
            }, p.removeMenuItem = function(e) {
                p.content.removeChild(e) && (T -= 84)
            }, p.reAlignItems = function() {
                T = 0;
                for (var e = p.content.getChildren(), t = 0; t < e.length; t++) {
                    var i = e[t];
                    i.y = T, T += i.scrollHeight
                }
            }, p.addItem = function(e) {
                var t, i = (e = e || {}).name || e.label,
                    n = e.type,
                    r = e.icon || c,
                    o = e.label || "N/A",
                    a = e.value || !1,
                    s = e.handler;

                function l(e) {
                    "button" === n ? a = !0 : "toggle" === n && (a = e), "function" == typeof s ? s.call(t, a) : p.emit("toggle", i, a)
                }
                switch (n) {
                    case "header":
                        t = p.addMenuHeader(o);
                        break;
                    case "button":
                        t = p.addMenuItem(new Sprite(r), o, l);
                        break;
                    case "toggle":
                        t = p.addMenuToggle(new Sprite(r), o, a, l);
                        break;
                    default:
                        console.error("Invalid menu item options:", e)
                }
                return t
            }, p.addSocialBar = function() {
                if (!("1" == Host.Web.GetQueryString("nosoc") || XS.is.okru || XS.is.rcs || XS.is.huawei || XS.is.miniclip || XS.is.poki)) {
                    var e = new Container;
                    e.addChild(C(new Sprite(fetch("i/g/s/icon_frvr.svg", !0)), 20, 15, "http://news.frvr.com")), e.addChild(C(new Sprite(fetch("i/g/s/icon_twitter.svg", !0)), 150, 15, "https://twitter.com/frvrgames")), e.addChild(C(new Sprite(fetch("i/g/s/icon_facebook.svg", !0)), 280, 15, ze.facebookPageUrl)), e.addChild(C(new Sprite(fetch("i/g/s/icon_gplus.svg", !0)), 410, 15, "https://plus.google.com/+Frvrgames")), e.y = T, p.content.addChild(e), e.scrollHeight = 82, T += 82
                }
            }, p.settings = [], p.addSetting = function(e) {
                p.settings.push(e)
            }, p.addSettings = function(e) {
                if (!ze.disableSidebarSettings && (!0 !== e && p.addMenuHeader(Host.Localize.Translate("Settings")), XS.is.twitch && (XS.muteSound(!0), XS.muteMusic(!0)), XS.audio.muteSounds(XS.soundSettings.muteSound.get()), p.addMenuToggle(new Sprite(fetch("i/g/s/icon_sound.svg", !0)), Host.Localize.Translate("Sound Effects"), !XS.Sound.muted, function(e) {
                        XS.audio.muteSounds(!e)
                    }), XS.audio.muteMusics(XS.soundSettings.muteMusic.get()), !XS.audio.isMusicMuted() && XS.backgroundMusic && XS.backgroundMusic.play(0, !0), p.lastMenuItem = p.addMenuToggle(new Sprite(fetch("i/g/s/icon_music.svg", !0), 1), Host.Localize.Translate("Music"), !XS.Music.muted, function(e) {
                        XS.audio.muteMusics(!e)
                    }), 0 < p.settings.length))
                    for (var t = 0; t < p.settings.length; t++) {
                        var i = p.settings[t];
                        p.lastMenuItem = p.addMenuToggle(i.image, i.text, i.state, i.callback)
                    }
            }, p.addMore = function() {
                XS.is.facebookInstant || XS.is.twitch || XS.is.okru || (Sidebar.addMenuHeader(Host.Localize.Translate("More")), Sidebar.addMenuItem(new Sprite(fetch("i/g/s/icon_frvr.svg", !0)), Host.Localize.Translate("FRVR Games"), function() {
                    XS.navigate("https://frvr.com")
                }), Sidebar.addMenuItem(new Sprite(fetch("i/g/s/icon_feedback.svg", !0)), Host.Localize.Translate("Send Feedback"), function() {
                    XS.navigate(ze.feedbackURL)
                }), Sidebar.addMenuItem(new Sprite(fetch("i/g/s/icon_legal.svg", !0)), Host.Localize.Translate("Legal"), function() {
                    XS.navigate("https://frvr.com/legal/")
                }), p.lastMenuItem = Sidebar.addMenuItem(new Sprite(fetch("i/g/s/icon_credits.svg", !0)), Host.Localize.Translate("Credits"), function() {
                    XS.navigate("https://frvr.com/credits/" + ze.id + ".html")
                }))
            }, p.addDownloadItem = function(e, t, i) {
                p.downloadItems.push({
                    image: e,
                    text: t,
                    callback: i
                })
            }, p.addRestartItem = function(e, t) {
                var i = t || Host.Localize.Translate("Restart Level", {}, "Level in this context is a level in a game");
                p.restartItem = {
                    image: new Sprite(embed("i/g/s/icon_new.svg")),
                    text: i,
                    callback: function() {
                        p.hide(), XS.emit("restart"), e && e()
                    }
                }
            }, p.addShopItem = function(e, t) {
                var i = t || Host.Localize.Translate("Shop");
                p.shopItem = {
                    image: new Sprite(fetch("i/g/s/icon_shop.svg")),
                    text: i,
                    callback: function() {
                        p.hide(), e && e()
                    }
                }
            }, p.addExitToMapItem = function(e, t) {
                var i = t || Host.Localize.Translate("Exit to Map");
                p.exitToMapItem = {
                    image: new Sprite(embed("i/g/s/icon_map.svg")),
                    text: i,
                    callback: function() {
                        p.hide(), e && e()
                    }
                }
            }, p.addStandards = function() {
                if (Sidebar.addMenuHeader(ze.shareTitle), p.restartItem) {
                    var e = p.restartItem;
                    p.lastItem = p.addMenuItem(e.image, e.text, e.callback)
                }
                if (p.shopItem) {
                    e = p.shopItem;
                    p.lastItem = p.addMenuItem(e.image, e.text, e.callback)
                }
                if (p.exitToMapItem) {
                    e = p.exitToMapItem;
                    p.lastItem = p.addMenuItem(e.image, e.text, e.callback)
                }
                if (!XS.is.facebookInstant && !XS.is.twitch) {
                    var o = void 0;
                    XS.insertRemoveAdsButton = function(e, t, i) {
                        Host.Log("Sidebar: Inserting 'Remove Ads' button");
                        var n = p.content.getChildren(),
                            r = 1;
                        p.restartItem && (r += 1), n.length > r ? o = Sidebar.addMenuItemAfter(n[r], e, t, i) : (Host.WrapperLog("Warning: Sidebar: Remove Ads menu item added to bottom of menu"), Sidebar.addMenuItem(e, t, i))
                    }, XS.removeAdsButton = function() {
                        o ? (Host.Log("Sidebar: Removing 'Remove Ads' button"), p.removeMenuItem(o), p.reAlignItems(), o = void 0) : Host.Log("Sidebar: No adsButton defined")
                    }, XS.is.facebookInstant || XS.is.spilGamesWrapper || (window.insertButton = function(e, t, i) {
                        if (!(e instanceof Sprite)) throw "Please update your code to use the new SVG icons: " + t;
                        p.lastItem ? Sidebar.addMenuItemAfter(p.lastItem, e, t, i) : Sidebar.addMenuItem(e, t, i)
                    }), XS.is.poki || XS.is.spilGamesWrapper || "rt" == ze.stage || Sidebar.addMenuItem(new Sprite(fetch("i/g/s/icon_share.svg", !0)), Host.Localize.Translate("Share {game_name}", {
                        game_name: ze.shareTitle
                    }), function() {
                        window.shareDialogueCallback()
                    })
                }
                if (0 < p.downloadItems.length)
                    for (var t = 0; t < p.downloadItems.length; ++t) {
                        e = p.downloadItems[t];
                        Sidebar.addMenuItem(new Sprite(e.image), e.text, e.callback)
                    }
                Sidebar.addSettings(), XS.is.facebookInstant || XS.is.twitch || XS.is.spilGamesWrapper || XS.is.poki || (Sidebar.addMore(), Sidebar.addSocialBar()), Sidebar.buildDefaultQaDebugItems()
            }, p.addAdsDebug = function() {
                XS.ads && ze.adIds && (Sidebar.addMenuItem(new Sprite(embed("i/g/s/icon_new.svg")), "XS Ads: Preload Interstitial", function() {
                    XS.ads.preload("", function(e) {}), Sidebar.hide()
                }), Sidebar.addMenuItem(new Sprite(embed("i/g/s/icon_new.svg")), "XS Ads: Show Interstitial", function() {
                    XS.ads.show("", function(e) {}), Sidebar.hide()
                }), Sidebar.addMenuItem(new Sprite(embed("i/g/s/icon_new.svg")), "XS Ads: Force Interstitial", function() {
                    XS.ads.force("", function(e) {}), Sidebar.hide()
                }), Sidebar.addMenuItem(new Sprite(embed("i/g/s/icon_new.svg")), "XS Ads: Preload Reward Ad", function() {
                    XS.ads.preload("", function(e) {}, {
                        format: "reward"
                    }), Sidebar.hide()
                }), Sidebar.addMenuItem(new Sprite(embed("i/g/s/icon_new.svg")), "XS Ads: Show Reward Ad", function() {
                    XS.ads.show("", function(e) {}, {
                        format: "reward"
                    }), Sidebar.hide()
                }), Sidebar.addMenuItem(new Sprite(embed("i/g/s/icon_new.svg")), "XS Ads: Force Reward Ad", function() {
                    XS.ads.force("", function(e) {}, {
                        format: "reward"
                    }), Sidebar.hide()
                }))
            };
            var M = [];
            p.addQaDebugItem = function(e, t) {
                "object" == typeof e ? M.push(e) : M.push({
                    type: "button",
                    label: e,
                    handler: t
                })
            }, p.addQaDebug = function() {
                for (var e = 0; e < M.length; e++) p.addItem(M[e])
            }, p.buildDefaultQaDebugItems = function() {
                function e() {
                    "function" == typeof window.debugOutputData ? window.debugOutputData() : (console.warn("debugOutputData function not implemented in game. Trying standard XS.data.toString"), XS.data ? console.log(XS.data.toString()) : console.warn("Game doesn't use XS.data")), Sidebar.hide()
                }
                p.addQaDebugItem("Force Game Over", function() {
                    "function" == typeof window.debugShowGameOver ? window.debugShowGameOver() : XS.is.facebookInstant ? (console.warn("debugShowGameOver function not implemented in game. Trying standards"), "function" == typeof window.Social.Instant.showGameOver ? window.Social.Instant.showGameOver() : "function" == typeof window.Social.Instant.onGameOver ? window.Social.Instant.onGameOver() : console.warn("No applicable standard functions found")) : console.warn("debugShowGameOver function not implemented in game."), Sidebar.hide()
                }), p.addQaDebugItem("Force Retry Overlay", function() {
                    "function" == typeof window.debugForceRetry ? window.debugForceRetry() : console.warn("debugForceRetry function not implemented in game."), Sidebar.hide()
                }), p.addQaDebugItem("XS Data output elements", function() {
                    e()
                }), p.addQaDebugItem("XS Data reset to defaults", function() {
                    "function" == typeof window.debugResetData ? (window.debugResetData(), e()) : (console.warn("debugResetData function not implemented in game. Trying standard XS.data.resetToDefaults"), XS.data ? (XS.data.resetToDefaults(), e()) : console.warn("Game doesn't use XS.data")), Sidebar.hide()
                })
            }, p.addBuildInfo = function() {
                if (p.addMenuHeader("Version: " + ze.version + "(" + ze.build + ")"), ze.frvr_repo_statuses) {
                    p.addMenuHeader("Build Info:");
                    var e = JSON.parse(ze.frvr_repo_statuses);
                    for (var t in e)
                        if (e.hasOwnProperty(t)) {
                            var i = t,
                                n = i[0];
                            0 == i.indexOf("frvr") && (n = i[5]);
                            var r = e[i],
                                o = r.hash.substring(0, 8),
                                a = r.dirty ? "(!)" : "",
                                s = r.branch ? r.branch.substring(0, 25) : "n/a",
                                l = r.tag ? r.tag : "n/a";
                            if (p.addMenuHeader("------------------"), p.addMenuHeader(n), p.addMenuHeader("> h: " + o + " " + a), p.addMenuHeader("> b: " + s), p.addMenuHeader("> t: " + l), r.toolsSubmoduleType && p.addMenuHeader("> sm-ty: " + r.toolsSubmoduleType), r.toolsSubmoduleHash) {
                                var h = r.toolsSubmoduleHash.substring(0, 8),
                                    d = r.toolsSubmoduleDirty ? "(!)" : "";
                                p.addMenuHeader("> sm-h: " + h + " " + d)
                            }
                            r.toolsSubmoduleBranch && p.addMenuHeader("> sm-b: " + r.toolsSubmoduleBranch), r.toolsSubmoduleTag && p.addMenuHeader("> sm-t: " + r.toolsSubmoduleTag)
                        } p.addMenuHeader("------------------")
                }
                ze.build_time && (p.addMenuHeader("Build Time (UTC):"), p.addMenuHeader("> " + ze.build_time)), ze.template && p.addMenuHeader("Template: " + ze.template);
                var c = XS.is.usingWebGLRenderer ? "WebGL" : XS.is.usingCanvasRenderer ? "Canvas" : "Unknown";
                p.addMenuHeader("Renderer: " + c), p.addMenuHeader("Coords: " + (LEGACY_COORD_SYSTEM ? "Legacy" : "New")), Host.GetMemoryUsage && Host.GetMemoryUsage(function(e) {
                    Host.Log("free memory: " + e.freememory), Host.Log("total memory: " + e.totalmemory)
                })
            }, stage.on("down", function() {
                "showing" === p.status && p.hide()
            }, {
                freezeGroup: ENG_FRZ_GRP
            }), XS.on("resize", function() {
                var e = 1,
                    t = 1 / p.scale.x;
                LEGACY_COORD_SYSTEM && (e = XS.devicePixelRatio, t = 1), p.icon.ratio = .5 * e, "hidden" === p.status ? (p.icon.x = XS.styles.margins.left ? (XS.styles.margins.left + 5) / .5 : 25, f.x = -24, stage.x = 0) : (f.x = (g * i + XS.styles.margins.left) * e - 24, stage.x = (g * i + XS.styles.margins.left) * e), p.icon.y = XS.styles.margins.top ? (XS.styles.margins.top + 5) / .5 : 25, p.content.y = XS.styles.margins.top * e, p.content.x = XS.styles.margins.left * e, x = -(g * i + XS.styles.margins.left) * e, height != w && (w = height, y.width = 25, LEGACY_COORD_SYSTEM ? y.height = height * e * t : y.height = 4, S.fillStyle = b, S.fillRect(0, 0, y.width, y.height), f.texture.destroy(!0), f.setTexture(new Texture.fromCanvas(y)), _()), o.width = (g * i + XS.styles.margins.left) * e * t, p.content.resize(2 * (g + XS.styles.margins.left) * e, 2 * (height - XS.styles.margins.top)), LEGACY_COORD_SYSTEM || p.applyResolutionRecursive()
            }, {
                freezeGroup: ENG_FRZ_GRP
            }), LEGACY_COORD_SYSTEM || p.applyResolutionRecursive()
        }, Sidebar.prototype = Object.create(Container.prototype), Sidebar.prototype.constructor = Sidebar, window.Sidebar = new Sidebar
    }), XS.modulesToPreload.push(function() {
        function a(e, t) {
            Container.call(this);
            var i = new Graphics;
            i.beginFill(16777215, .9), this.addChild(i);
            var n = new Text2(e, {
                weight: 400,
                size: 110,
                fill: "#000000",
                align: "center",
                maxWidth: 1950
            });
            n.anchor.set(.5, 0), this.addChild(n), n.x = 1e3, n.y = 25;
            var r = new Text2(t, {
                weight: 300,
                size: 80,
                fill: "#000000",
                align: "center",
                maxWidth: 1950
            });
            r.anchor.set(.5, 0), this.addChild(r), r.x = 1e3, r.y = n.y + n.height + 20;
            var o = r.y + r.height + 40;
            i.drawRoundedRect(0, 0, 2e3, o, 35), this.setRatio = function(e) {
                i.width = 2e3 * e, i.height = 400 * e
            }
        }(a.prototype = Object.create(Container.prototype)).constructor = a;
        var s = null;
        window.Tutorial = new function() {
            var o = this;
            this.show = function(e, t, i, n, r) {
                return s && o.hide(), (s = new a(n, r)).x = t - 1e3, s.y = i - 400 + 150, e.addChild(s), s.alpha = 0, new Tween(s, {
                    y: i - 400,
                    alpha: 1
                }, .5, void 0, ENG_FRZ_GRP), s
            }, this.hide = function() {
                s && (new Tween(s, {
                    y: s.y - 150,
                    alpha: 0
                }, .5, void 0, ENG_FRZ_GRP).call(function() {
                    this.parent.removeChild(this)
                }), s = void 0)
            }, this.get = function() {
                return s
            }
        }
    }), XS.modulesToPreload.push(function() {
        var i = window.Social.getPromiseCatchHandler;

        function e() {}
        e.prototype._showPopup = e.prototype.showPopup = function(e) {
            var t;
            return (ze.preventAutomaticBotSubscription ? Promise.resolve(!1) : -1 === FBInstant.getSupportedAPIs().indexOf("player.canSubscribeBotAsync") ? Promise.resolve(!1) : FBInstant.player.canSubscribeBotAsync()).then(function(e) {
                return e ? (XS.track.event("chatbot_show"), FBInstant.player.subscribeBotAsync().then(function() {
                    return "success"
                })) : "noshow"
            }).catch(function(e) {
                switch (e.code) {
                    case "USER_INPUT":
                        return "useraborted";
                    case "INVALID_OPERATION":
                        return "issubscribed";
                    default:
                        return t = e.code, "error"
                }
            }).then(function(e) {
                return XS.track.event("chatbot_" + e, {
                    reason: t
                }), e
            }).catch(i("Bot.showPopup > handleResult")).then(e).catch(i("Bot.showPopup > callback"))
        };
        var t = new e;
        window.bot = t
    }), XS.modulesToPreload.push(function() {
        function e() {
            var i = this,
                n = 0,
                r = void 0,
                o = void 0,
                t = void 0,
                a = void 0,
                s = !1;
            i.force = function() {
                ! function() {
                    if (!r) {
                        r = document.createElement("div");
                        var e = {
                            width: "100%",
                            height: "100%",
                            top: "0px",
                            left: "0px",
                            position: "absolute",
                            backgroundColor: "#000",
                            opacity: "0.7",
                            zIndex: "102",
                            display: "block"
                        };
                        for (prop in e) r.style[prop] = e[prop]
                    }
                    if (!o) {
                        o = document.createElement("div");
                        var t = {
                            border: "10px solid rgba(255,255,255,.3)",
                            borderTop: "10px solid #ffffff",
                            borderRight: "10px solid #ffffff",
                            borderRadius: "50%",
                            width: "100px",
                            height: "100px",
                            position: "absolute",
                            zIndex: 20,
                            left: "50%",
                            top: "50%",
                            marginLeft: "-60px",
                            marginTop: "-60px"
                        };
                        for (prop in t) o.style[prop] = t[prop]
                    }
                }(), s || i.showSpinner(), document.body.appendChild(r);
                var e = 0;
                o.style.transform = "rotate(" + e + "deg)", clearInterval(t), t = setInterval(function() {
                    e += 4, o.style.transform = "rotate(" + e + "deg)"
                }, 16)
            }, i.show = function(e, t) {
                s = e, 1 == ++n && (0 === t ? i.force() : a = setTimeout(i.force, t || 5))
            }, i.hide = function() {
                0 == --n && (clearTimeout(a), clearInterval(t), r && r.parentNode && r.parentNode.removeChild(r))
            }, i.hideSpinner = function() {
                o && o.parentNode && o.parentNode.removeChild(o), s = !0
            }, i.showSpinner = function() {
                r && r.appendChild(o), s = !1
            }
        }
        window.LoadSpinner = e, XS.loadSpinner = new e
    }), XS.modulesToPreload.push(function() {
        var e = Container.expand(function(e) {
            var s = e.width,
                l = e.height,
                h = e.image,
                d = e.offsets,
                c = e.letterWidths || {},
                t = e.scale,
                u = 0,
                i = void 0 !== e.spaceWidthMultiplier ? e.spaceWidthMultiplier : 1,
                n = e.textAlign || "left",
                r = e.verticalAlign || "top",
                f = Container.call(this),
                p = [],
                g = 0;
            if (Object.defineProperty(f, "tint", {
                    get: function() {
                        return g
                    },
                    set: function(e) {
                        g = e;
                        for (var t = 0; t < p.length; t++) p[t].tint = g
                    }
                }), e.tint && (f.tint = e.tint), LEGACY_COORD_SYSTEM) {
                if (void 0 !== t) {
                    var o = f.forceSetRatio;
                    f.forceSetRatio = function(e) {
                        o.call(this, -1 == e ? -1 : e * t)
                    }
                }
            } else void 0 !== t && (f.scale.set(t), f.resolution = t);

            function v() {
                var e = 0,
                    t = 0;
                "right" == n && (e = -u), "center" == n && (e = -u / 2), "bottom" == r && (t = -l), "center" == r && (t = -l / 2);
                for (var i = 0; i < p.length; i++) p[i].x = e, p[i].y = t, e += p[i].letterWidth
            }
            Object.defineProperty(f, "textAlign", {
                get: function() {
                    return n
                },
                set: function(e) {
                    n = e, v()
                }
            }), Object.defineProperty(f, "verticalAlign", {
                get: function() {
                    return r
                },
                set: function(e) {
                    r = e, v()
                }
            });
            var m = [],
                w = {
                    letterWidth: s * i
                };
            f.getPixelWidth = function() {
                return u * (t || 1)
            }, f.text = "", f.setText = function(e) {
                var t = e.toString();
                if (t != f.text) {
                    for (var i = (f.text = t).split(""), n = [], r = u = 0; r < i.length; r++) {
                        var o = i[r];
                        " " !== o && void 0 === d[o] ? console.warn('Definition not defined for "' + o + '" defaulting to space') : (" " === o ? nm = w : (nm = p.shift(), nm && nm != w || (nm = m.pop() || new Sheet(h, s, l), nm.tint = g, nm.letterWidth = void 0 !== c[o] ? c[o] : s, f.addChild(nm)), nm.frame = d[o]), n.push(nm), u += nm.letterWidth)
                    }
                    for (; p.length;) {
                        var a = p.pop();
                        a != w && (m.push(a), f.removeChild(a))
                    }
                    p = n, v()
                }
            }
        });
        window.BitmapFont = e
    });
    var u, a, s, l, h, d, c, f, ze = {
        id: "basketball",
        niceId: "basketball",
        domain: "basketball.frvr.com",
        version: "2.4.6",
        build: "246003",
        stage: "live",
        samsungAppId: "000002986689",
        samsungReviewUrl: "samsungapps://ProductDetail/com.frvr.basketball",
        samsungInstallUrl: "http://www.samsungapps.com/appquery/appDetail.as?appId=com.frvr.basketball",
        facebookAppId: "982281415240060",
        facebookPageUrl: "https://www.facebook.com/Basketball-FRVR-217271125346962/",
        facebookAppUrl: "https://apps.facebook.com/basketballfrvr",
        facebookAdsDisabled: !0,
        adMobInterstitialIdiOS: "ca-app-pub-6389174903462367/5295356939",
        adMobInterstitialIdAndroid: "ca-app-pub-6389174903462367/2341890538",
        fbInstantInterstitialIdAll: "800772590062226_957968134342670",
        facebookInstantPlacementId: "800772590062226_977916069014543",
        facebookInstantNamespace: "instbasketballfrvr",
        facebookInstantSupportRewardCreateShortcutAsync: !0,
        enableCrossPromotion: !0,
        facebookCrossPromotionGames: [
            ["i/web/hexicon.png", "226951481038868", !1],
            ["i/web/dartsicon.png", "1576469492400901", !1],
            ["i/web/golddiggericon.png", "578514565910482", !0, !0],
            ["i/web/cricketicon.png", "327848237954688", !1],
            ["i/web/caveicon.png", "282513215569229", !1],
            ["i/web/dragraceicon.png", "1182092508634251", !1, !0],
            ["i/web/fieldgoalicon.png", "347920599089173", !1]
        ],
        facebookHighscoreProperty: "score",
        mobvistaAppIdiOS: "33551",
        mobvistaAppIdAndroid: "33574",
        mobvistaInterstitialIdiOS: "10949",
        mobvistaInterstitialIdAndroid: "11063",
        interstitialRetryDelayMins: 2,
        debugShowInitErrors: !1,
        oneSignalWebId: "1b1aebcc-aba9-4374-b04f-af8aae0b83aa",
        enablePWA: !0,
        useFacebookInstantRichGameplayFeatures: !0,
        facebookInstantTournamentsEnabled: !0,
        facebookInstantTournamentMode: "both",
        facebookInstantTournamentScoreTemplate: Host.Localize.Translate("{score} points in {actions} throws", {}, "Tournament score text template"),
        facebookInstantTournamentScoreTemplateShort: Host.Localize.Translate("{score} in {actions}", {}, "Short tournament score text template"),
        facebookInstantLeaderBoardTitle: Host.Localize.Translate("Practice Leader board", {}, "Text for leaderboard"),
        facebookInstantTournamentSinglePlayerButtonText: Host.Localize.Translate("Play Single", {}, "Play story mode, practicing the game"),
        facebookInstantTournamentMultiPlayerButtonTextFromSingleplayer: Host.Localize.Translate("Play Tournament", {}, "Join a tournament button for instant games"),
        facebookInstantTournamentMultiPlayerButtonText: Host.Localize.Translate("Play Tournament", {}, "Play now button for instant games"),
        facebookInstantTournamentButtonColor: "#4080fa",
        facebookInstantTournamentButtonOnTop: !0,
        facebookInstantPlayNowButtonColor: "#4080fa",
        backendPath: "https://production-dot-frvr-chatbot.appspot.com/basketball",
        googleAdSiteId: "1661744930",
        googleAdSpilgamesId: "3138478138",
        gaKey: "c749c1f0cba9946e36ad53eb0b3a18b8",
        gaSecret: "e60cbecb7a302ff87c596a25b9b9950c1e710f33",
        adIds: {
            applixir: {
                reward_all: {
                    default: "2338_4401",
                    samsungBixby: "2337_4400",
                    huawei: "2340_4403",
                    miniclip: "2347_4410"
                }
            },
            lifestreetmedia: {
                interstitial_all: "slot1231647_d48",
                reward_all: "slot1231582_1c0"
            }
        },
        rewardAdThrottleTime: 60,
        shareUrl: "https://basketball.frvr.com/{{language_path}}",
        playTitle: Host.Localize.Translate("Play Basketball FRVR"),
        shareText: Host.Localize.Translate("I think you will like basketball FRVR"),
        shareTitle: Host.Localize.Translate("Basketball FRVR"),
        shortTitle: Host.Localize.Translate("Basketball"),
        tagLine: Host.Localize.Translate("Basketball Hoop Shooter"),
        tagLineFree: Host.Localize.Translate("Free Basketball Hoop Shooter"),
        oneliner: Host.Localize.Translate("Easy to learn yet frustrating to master basketball hoop shooter game."),
        twitterDescription: "Easy to learn yet frustrating to master basketball hoop shooter game.",
        facebookInstantGameID: "800772590062226",
        buttonShareTitle: Host.Localize.Translate("Share Basketball FRVR", {}, "Button text for sharing basketball FRVR"),
        buttonShareDescription: Host.Localize.Translate("Invite your friends?"),
        iOSRemoveAdsProductIdentifier: "basketballremoveads",
        androidRemoveAdsProductIdentifier: "basketballremoveads",
        gameCenterEnabled: !0,
        feedbackURL: "https://frvr.com/support/",
        iosAppId: "1185836177",
        iOSReviewURL: "https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?id=1185836177&pageNumber=0&sortOrdering=2&type=Purple+Software&mt=8",
        androidReviewURL: "market://details?id=com.frvr.basketball",
        androidInstallBannerURL: "i/web/android.png",
        androidInstallURL: "market://details?id=com.frvr.basketball",
        androidInstallURLWeb: "https://play.google.com/store/apps/details?id=com.frvr.basketball",
        iOSInstallBannerURL: "i/web/ios.png",
        iOSInstallURL: "http://itunes.apple.com/app/id1185836177",
        gaId: "UA-54081731-1",
        gaGameId: "UA-54081731-3",
        chromeAppEnabled: !1,
        twitterTexts: [Host.Localize.Translate("Help! I can't stop playing {game_name}!"), Host.Localize.Translate("Tonight we are playing {game_name}. What's your highscore?"), Host.Localize.Translate("Have you tried {game_name} yet?"), Host.Localize.Translate("Basketball, Basketball, {game_name}. Fun hoop shooter!"), Host.Localize.Translate("Must. Stop. Playing. {game_name}!"), Host.Localize.Translate("Just play {game_name} already!"), Host.Localize.Translate("{game_name} is my new favorite time waster!"), Host.Localize.Translate("Well there goes the rest of today >")],
        includeApplixir: !0,
        statusBarColor: "dark",
        pushNotificationText: Host.Localize.Translate("Your daily basketball points are recharged!", {}, "This is a push notification used on mobile phones to show that their daily level is ready"),
        twitterRelated: "frvrgames,benjaminsen,brianmeidell,basketball,hoops",
        twitterHashTags: Host.Localize.Translate("basketball,hoops,threepoint", {}, "These are are hash tags for social networks such as twitter, E.g. #puzzle or #puzzle# for chinese sites"),
        twitterHTML: '<div style="padding-right:10px"><a href="https://twitter.com/share" class="twitter-share-button" data-url="{{shareUrl}}" data-text="{{TEXT}}" data-via="FRVRGames" data-hashtags="{{twitterHashTags}}" data-related="{{twitterRelated}}" target="_new"></a></div>',
        twitterMobileHTML: '<a class="twitter-share-button" href="https://twitter.com/intent/tweet?text={{TEXT}}" data-size="large" data-hashtags="basketball,frvr,sports" data-related="frvrgames,benjaminsen,sports,gaming,basketball,frvr" data-url="http://basketball.frvr.com/alc/">Tweet</a>',
        twitterNewMode: !0,
        facebookHTML2: '<iframe src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2FBasketball-FRVR-217271125346962%2F&width=120&layout=button_count&action=like&size=small&show_faces=false&share=false&height=21&appId=883249178389083" width="120" height="21" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe>',
        remoteConfigVersion: "v3",
        plugins: "bitmapfont.js,modal.js,scrollcontainer.js,sidebar.js,tutorial.js,bot.js"
    };
    ze.template = "poki", ze.frvr_repo_statuses = '{"frvr-tools":{"hash":"17ff9be41fa9a99b022864d91a4acc8c877a8d88","dirty":false,"branch":"feature/beta-poki-gameload-events","tag":null},"frvr-internal":{"hash":"10a86e19bc5315945a78d94d24e2972493792238","dirty":true,"branch":"master","tag":null},"game-basketball":{"hash":"f26885693d5930f315150ba015eeaffb0dd3351d","dirty":false,"branch":"release/2.4.6-poki","tag":null,"toolsSubmoduleType":"edg"}}', ze.build_time = "2019-12-12T12:41:56Z", a = (u = this).XS = u.XS || {}, s = {
        channel: void 0,
        channelMapping: {},
        isLoaded: !1,
        preLoadQueue: [],
        oninit: function(i, e) {
            var t, n, r, o, a, s = this,
                l = i.channelMapping;
            for (var h in l)
                for (var d = h.split(","), c = 0; c < d.length; c++) this.channelMapping[d[c]] = l[h];
            t = document, n = i.url, r = function() {
                var e = GameAnalytics;
                e("configureBuild", u.gaPath), e("setEventProcessInterval", 15), e("configureAvailableResourceCurrencies", (i.currencies || "").split(",").slice(0, 20)), e("configureAvailableResourceItemTypes", (i.itemtypes || "").split(",").slice(0, 20)), e("configureAvailableCustomDimensions01", (i.customDimensions01 || "").split(",").slice(0, 20)), e("setEnabledInfoLog", !1), e("initialize", i.key || ze.gaKey, i.secret || ze.gaSecret), s.isLoaded = !0;
                for (var t = s.preLoadQueue; 0 < t.length;) s.onevent.apply(s, t.shift())
            }, o = t.createElement("script"), a = t.getElementsByTagName("script")[0], o.onload = r, o.async = "true", o.crossOrigin = "anonymous", o.src = n, a.parentNode.insertBefore(o, a)
        },
        onevent: function(e, t, i, n, r) {
            if (!this.isLoaded) return this.preLoadQueue.push([e, t, i, n, r]);
            "game_end" === e && "lose" === n.dimension10 && (r = this.parseArgs(this.eventMap["game_end-lose"], n));
            var o = a.track.getChannel();
            (o = this.channelMapping[o] || o) !== this.channel && (this.channel = o, GameAnalytics("setCustomDimension01", this.channel)), GameAnalytics.apply(GameAnalytics, r)
        }
    }, l = _jsonData["track-gma"].key || ze.gaKey, h = _jsonData["track-gma"].secret || ze.gaSecret, l && h && a.track.addProvider("gma", s), c = (d = this).XS = d.XS || {}, f = {
        globalState: void 0,
        oninit: function(e, t) {
            this.eventCategory = ze.id;
            var i = this.trackers = [],
                n = e.gaIds || {},
                r = [];
            for (var o in n) r.push(n[o]);
            for (var o in n)
                if (n[o]) {
                    var a = window.gaAppInfo;
                    ga("create", n[o], "auto", o, a), ga(o + ".set", a), i.push({
                        name: o,
                        uaid: n[o]
                    })
                } ga(function(e) {
                _jsonData.scitylana && ga("all.require", "scitylana", _jsonData.scitylana)
            })
        },
        ga: function(e) {
            for (var t = this.trackers, i = 0; i < t.length; i++) ga(t[i].name + ".send", "event", e)
        },
        onevent: function(e, t, i, n, r) {
            void 0 === r && (r = []);
            var o = {};
            if (c.track.dataIsDirty || void 0 === this.globalState) {
                this.globalState = (this.parseArgs(this.config.state, n) || [])[0], c.track.dataIsDirty = !1;
                for (var a = 0; a < this.trackers.length; a++) ga(this.trackers[a].name + ".set", this.globalState);
                for (var s in this.globalState) o[s] = this.globalState[s]
            }
            if (o.eventCategory = this.eventCategory, o.eventAction = e, void 0 !== r[0] && (o.eventAction = r[0]), void 0 !== r[1] && (o.eventLabel = r[1]), void 0 !== r[2] && (o.eventValue = r[2]), "object" == typeof r[3])
                for (var l in r[3]) o[l] = r[3][l];
            this.ga(o)
        }
    }, c.track.addProvider("ga", f), XS.stageContainer.setBackgroundColor(11066073), XS.dirty = !0, stage.orientationMode = "fixed", stage.orientation = "portrait";
    var Ne = ze.backendPath;

    function p() {
        var xe = null,
            Te = !1;
        XS.is.facebookInstant && FBInstant.logEvent("BasketballVersionAB", 1, {
            version: ze.version
        }), XS.is.facebookInstant || XS.loadConfig(ze.id);
        var e = 0;

        function Ce() {
            e++, gax("send", "event", ze.id, "Games Played", e)
        }

        function g(e) {
            return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
        }
        var Me = {
            muteSounds: Host.Preferences.QuickBool("sound.v1"),
            muteMusic: Host.Preferences.QuickBool("music.v1"),
            highscore: Host.Preferences.QuickInt("highscore.v1"),
            ballcount: Host.Preferences.QuickInt("ballcount.v2"),
            hideTutorial: Host.Preferences.QuickBool("tutorial.v5"),
            ballSkinId: Host.Preferences.QuickString("ballskin.v2"),
            coins: Host.Preferences.QuickInt("coins.v2"),
            unlocked: Host.Preferences.QuickString("unlocked.v1"),
            spawnTime: Host.Preferences.QuickFloat("spawnTime.v3"),
            spawnCoin: Host.Preferences.QuickInt("spawnCoin.v3")
        };
        0 == Me.spawnTime.get() && 0 == Me.spawnCoin.get() && Me.spawnCoin.set(5);
        var Re = {
                hits: [XS.Sound.get("i/s/hit01.mp3", 1.2), XS.Sound.get("i/s/hit02.mp3", 1.2), XS.Sound.get("i/s/hit03.mp3", 1.2), XS.Sound.get("i/s/hit04.mp3", 1.2), XS.Sound.get("i/s/hit05.mp3", 1.2), XS.Sound.get("i/s/hit06.mp3", 1.2), XS.Sound.get("i/s/hit07.mp3", 1.2)],
                throws: [XS.Sound.get("i/s/throw01.mp3", 1.2), XS.Sound.get("i/s/throw02.mp3", 1.2)],
                netDirect: XS.Sound.get("i/s/netdirect.mp3", 1),
                net: XS.Sound.get("i/s/net.mp3", 1),
                awww: [XS.Sound.get("i/s/awww1.mp3", 1), XS.Sound.get("i/s/awww2.mp3", 1)],
                clap: [XS.Sound.get("i/s/clap1.mp3", 1), XS.Sound.get("i/s/clap2.mp3", 1), XS.Sound.get("i/s/clap3.mp3", 1), XS.Sound.get("i/s/clap4.mp3", 1), XS.Sound.get("i/s/clap5.mp3", 1)],
                ding: XS.Sound.get("i/s/ding.mp3", 1),
                coinpickup: XS.Sound.get("i/s/coinpickup.mp3", 1)
            },
            t = XS.Music.get("i/s/music.mp3", .7);
        XS.backgroundMusic = t, stage.background.disabled = !0;
        var Ee = [{
            id: "default",
            coinCost: 0,
            ballGraphics: "i/g/ball.svg",
            ballShine: "i/g/ballshine.svg"
        }, {
            id: "tennis",
            coinCost: 5,
            ballGraphics: "i/g/skin_tennis.png",
            ballShine: "i/g/skin_tennis_shine.png"
        }, {
            id: "bowling",
            coinCost: 10,
            ballGraphics: "i/g/skin_bowling.png",
            ballShine: "i/g/skin_bowling_shine.png"
        }, {
            id: "mellon",
            coinCost: 20,
            ballGraphics: "i/g/skin_mellon.png",
            ballShine: "i/g/skin_mellon_shine.png"
        }, {
            id: "beach",
            coinCost: 20,
            ballGraphics: "i/g/skin_beach.png",
            ballShine: "i/g/skin_beach_shine.png"
        }, {
            id: "foodball",
            coinCost: 50,
            ballGraphics: "i/g/skin_foodball.png",
            ballShine: "i/g/skin_foodball_shine.png"
        }, {
            id: "8ball",
            coinCost: 50,
            ballGraphics: "i/g/skin_8ball.png",
            ballShine: "i/g/skin_8ball_shine.png"
        }, {
            id: "basketball",
            coinCost: 100,
            ballGraphics: "i/g/skin_basketball.png",
            ballShine: "i/g/skin_basketball_shine.png"
        }, {
            id: "eye",
            coinCost: 300,
            ballGraphics: "i/g/skin_eye.png",
            ballShine: "i/g/skin_eye_shine.png"
        }, {
            id: "face",
            coinCost: 500,
            ballGraphics: "i/g/skin_face.png",
            ballShine: "i/g/skin_face_shine.png"
        }];

        function Le(e, t) {
            var i = JSON.parse(e),
                n = JSON.parse(t);
            t = {};
            for (var r in i) t[r] = i[r];
            for (var r in n) t[r] = n[r];
            return JSON.stringify(t)
        }

        function Ae(e) {
            var t = Ee[e];
            if (0 == t.coinCost) return !0;
            var i = JSON.parse(Me.unlocked.get() || "{}");
            return 1 == i[t.id] || !!t.storeId && (i[t.id] = !0, Me.unlocked.set(JSON.stringify(i)), refreshParseData(), !0)
        }
        Modal.ModalOverlayContent.expand(function() {
            Modal.ModalOverlayContent.call(this), this.addHeadline(Host.Localize.Translate("Loading", {}, "Text showing while loading an reward advertisement the user has to wait for")), this.blurClose = !1, this.innerHeight = 200
        }), Modal.ModalOverlayContent.expand(function() {
            Modal.ModalOverlayContent.call(this), this.addHeadline(Host.Localize.Translate("No Ads Ready", {}, "Headline for no reward advertisement available")), this.addLead(Host.Localize.Translate("Please try again later", {}, "Headline for no reward advertisement available")), this.blurClose = !1, this.innerHeight = 230
        });
        var Pe = Modal.ModalOverlayContent.expand(function() {
                Modal.ModalOverlayContent.call(this), this.addHeadline([Host.Localize.Translate("Try again", {}, "Shown when a user failes to get 10 points in a game"), Host.Localize.Translate("Once more", {}, "Shown when a user failes to get 10 points in a game"), Host.Localize.Translate("Again", {}, "Shown when a user failes to get 10 points in a game"), Host.Localize.Translate("One more time", {}, "Shown when a user failes to get 10 points in a game")][4 * Math.random() | 0]), this.blurClose = !0, this.innerHeight = 200
            }),
            Ge = Container.expand(function() {
                var i = Container.call(this),
                    n = new Sprite(fetch("i/g/ball.svg"));
                n.anchor.set(.5, .5), i.addChild(n);
                var r = new Sprite(fetch("i/g/ballshine.svg"));
                r.anchor.set(.5, .5), i.addChild(r);
                var o = Ee[0];
                i.setSkin = function(e) {
                    if (o != e) {
                        var t = [(o = e).ballGraphics, e.ballShine, function() {
                            i.removeChild(n), i.removeChild(r), (n = new Sprite(fetch(e.ballGraphics))).anchor.set(.5, .5), (r = new Sprite(fetch(e.ballShine))).anchor.set(.5, .5), i.addChild(n), i.addChild(r)
                        }];
                        preload.apply(window, t)
                    }
                }, i.setRotation = function(e) {
                    n.rotation = e
                }, i.getRotation = function() {
                    return n.rotation
                }, i.speedX = 0, i.speedY = 0, i.speedZ = 0, i.z = 0
            }),
            v = {
                0: 0,
                1: 1,
                2: 2,
                3: 3,
                4: 4,
                5: 5,
                6: 6,
                7: 7,
                8: 8,
                9: 9,
                x: 10,
                "+": 11,
                ":": 12
            },
            ke = Container.expand(function() {
                var r = Container.call(this),
                    e = new Sprite(fetch("i/g/hoopshadow.svg"));
                r.addChild(e), e.x = -765, e.y = -540;
                var t = new Sprite(fetch("i/g/hoop.svg"));
                r.addChild(t), t.anchor.set(.5, .5);
                var i = new Text2("0", {
                    size: 400,
                    font: "'GillSans-Bold',Impact,'Arial Black',Tahoma",
                    fill: "#ffffff"
                });
                i.anchor.set(.5, 0), i.y = -510, r.addChild(i);
                var n = new Text2("", {
                    size: 270,
                    font: "'GillSans-Bold',Impact,'Arial Black',Tahoma",
                    fill: "#f7e16a"
                });
                n.anchor.set(.5, 0), n.y = -30, r.addChild(n);
                var o = new Sprite(fetch("i/g/hoopoverlay.svg"));

                function a(e, t) {
                    return e.pictogram.y = t, e.label.y = t + 48, e
                }

                function s(e, t) {
                    t ? (r.addChild(e.pictogram), r.addChild(e.label)) : (e.pictogram.parent && e.pictogram.parent.removeChild(e.pictogram), e.label.parent && e.label.parent.removeChild(e.label))
                }

                function l(e, t) {
                    var i = new Sprite(e);
                    i.x = -685;
                    var n = new BitmapFont({
                        width: 48,
                        height: 94,
                        image: fetch("i/g/bitmapfont.svg"),
                        offsets: v,
                        textAlign: "left",
                        verticalAlign: "center",
                        tint: 16777215,
                        scale: .8,
                        spaceWidthMultiplier: .4
                    });
                    return n.x = i.x + 115, r.addChild(i), r.addChild(n), a({
                        pictogram: i,
                        label: n
                    }, t)
                }
                r.addChild(o), o.anchor.set(.5, .5);
                var h, d, c = l(fetch("i/g/hooppictogram.svg"), 369),
                    u = l(fetch("i/g/ballpictogram.svg"), 140),
                    f = l(fetch("i/g/crownpictogram.svg"), 250),
                    p = l(fetch("i/g/clockpictogram.svg"), 360);
                r.setMultiplier = function(e) {
                    h != e && ((h = e) <= 1 ? n.setText("") : n.setText("x" + e))
                }, r.setScore = function(e) {
                    i.visible = 0 != e, i.setText(e), i.setText(e)
                }, r.setScore(0), r.setHighscore = function(e, t) {
                    "singleplayer" == d && f.label.setText(g(e))
                }, r.setHoopCount = function(e) {
                    c.label.setText(g(e))
                }, r.setActionsLeft = function(e) {
                    u.label.setText(g(e))
                }, r.setScoreTarget = function(e) {
                    "tournament" == d && f.label.setText(g(e))
                }, r.setTimeLeft = function(e) {
                    "tournament" == d && p.label.setText(g(e))
                }, r.setMode = function(e) {
                    "tournament" == (d = e) ? (s(p, !0), s(u, !0), s(c, !1), a(f, 250)) : (s(p, !1), s(u, !1), s(c, !0), a(f, 269))
                }, r.setMode("singleplayer")
            }),
            i = Sprite.expand(function(e) {
                Sprite.call(this, e), this.anchor.set(0, .5)
            }),
            s = {};
        i.prototype.getTexture = function(e, t) {
            var i = e.path + ":" + t;
            if (s[i]) return s[i];
            var n = Math.ceil(e.width * t),
                r = Math.ceil(e.height * t),
                o = document.createElement("canvas"),
                a = o.getContext("2d");
            return o.width = n, o.height = r, a.drawImage(e, 0, 0, n, r), s[i] = Texture.fromCanvas(o), s[i]
        };
        var Ie = Container.expand(function() {
                for (var f = Container.call(this), e = new h(f), t = [e.getNode(-270, 0), e.getNode(-130, 0), e.getNode(130, 0), e.getNode(270, 0)], i = 0; i < t.length; i++) t[i].fixed = !0;
                var n = [e.getNode(-270, 100), e.getNode(-145, 100), e.getNode(145, 100), e.getNode(270, 100)];
                for (i = 0; i < t.length; i++) e.getLine(t[i], n[i], 50, 0 == i || i == t.length - 1 ? 15 : 8);
                var r = [e.getNode(-270, 150), e.getNode(-145, 150), e.getNode(0, 150), e.getNode(145, 150), e.getNode(270, 150)];
                e.getLine(n[0], r[0], 50, 15), e.getLine(n[3], r[4], 50, 15), e.getLine(n[0], r[1], 40, 8), e.getLine(n[1], r[1], 60, 8), e.getLine(n[1], r[2], 110, 8), e.getLine(n[2], r[2], 110, 8), e.getLine(n[2], r[3], 60, 8), e.getLine(n[3], r[3], 40, 8), e.getLine(r[0], r[1], 40, 8), e.getLine(r[3], r[4], 40, 8);
                var o = [e.getNode(-270, 200), e.getNode(-145, 200), e.getNode(145, 200), e.getNode(270, 200)];
                e.getLine(r[0], o[0], 60, 15), e.getLine(r[4], o[3], 60, 15), e.getLine(r[1], o[1], 80, 8), e.getLine(r[2], o[1], 100, 8), e.getLine(r[2], o[2], 100, 8), e.getLine(r[3], o[2], 80, 8), e.getLine(o[0], o[1], 100, 8), e.getLine(o[2], o[3], 100, 8);
                var a = [e.getNode(-270, 250), e.getNode(-145, 250), e.getNode(0, 250), e.getNode(145, 250), e.getNode(270, 250)];
                e.getLine(o[0], a[0], 100, 15), e.getLine(o[3], a[4], 100, 15), e.getLine(o[0], a[1], 70, 8), e.getLine(o[1], a[2], 100, 8), e.getLine(o[2], a[2], 100, 8), e.getLine(o[3], a[3], 70, 8), e.getLine(a[0], a[1], 100, 8), e.getLine(a[3], a[4], 100, 8), e.getLine(a[1], a[2], 100, 8), e.getLine(a[2], a[3], 100, 8);
                var s = [e.getNode(0, 300)];
                e.getLine(a[1], s[0], 90, 8), e.getLine(a[3], s[0], 90, 8);
                var l = new Sprite(fetch("i/g/rim.svg"));
                f.addChild(l), l.anchor.set(.5, .5);
                f.push = function(e, t) {
                    for (var i = 0; i < n.length; i++) n[i].x += .5 * e, n[i].y += .5 * t;
                    for (i = 0; i < r.length; i++) r[i].x += .5 * e, r[i].y += .5 * t;
                    for (i = 0; i < o.length; i++) o[i].x += .5 * e, o[i].y += .5 * t;
                    for (i = 0; i < a.length; i++) a[i].x += .5 * e, a[i].y += .5 * t;
                    for (i = 0; i < s.length; i++) s[i].x += .5 * e, s[i].y += .5 * t
                };
                var p = [n[0], n[n.length - 1], r[0], r[r.length - 1], o[0], o[o.length - 1], a[0], a[a.length - 1]],
                    g = 264,
                    v = -264,
                    m = 0;
                f.reset = function() {
                    m = 0
                };
                var w = 205.69736842105266;
                f.interact = function(e) {
                    var t = !1,
                        i = f.x + g - e.x,
                        n = f.y - e.y;
                    if (Math.sqrt(i * i + n * n) < w) {
                        var r = Math.atan2(n, i),
                            o = .65 * Math.sqrt(e.speedX * e.speedX + e.speedY * e.speedY);
                        e.x = f.x + g - Math.cos(r) * w, e.y = f.y - Math.sin(r) * w, e.speedX = -Math.cos(r) * o + e.speedX / 8, e.speedY = -Math.sin(r) * o + e.speedY / 8, e.speedRotation = e.speedX / 200, t = !0, (l = Re.hits[m++]) && l.play(0)
                    }
                    var a = f.x + v - e.x,
                        s = f.y - e.y;
                    if (Math.sqrt(a * a + s * s) < w) {
                        var l;
                        r = Math.atan2(s, a), o = .65 * Math.sqrt(e.speedX * e.speedX + e.speedY * e.speedY);
                        e.x = f.x + v - Math.cos(r) * w, e.y = f.y - Math.sin(r) * w, e.speedX = -Math.cos(r) * o + e.speedX / 5, e.speedY = -Math.sin(r) * o + e.speedY / 5, e.speedRotation = e.speedX / 200, t = !0, (l = Re.hits[m++]) && l.play(0)
                    }
                    for (var h = 0; h < p.length; h++) {
                        var d = p[h],
                            c = d.x + f.x - e.x,
                            u = d.y + f.y - e.y;
                        if (Math.sqrt(c * c + u * u) < w) {
                            r = Math.atan2(u, c), o = .85 * Math.sqrt(e.speedX * e.speedX + e.speedY * e.speedY);
                            e.speedX += -(Math.cos(r) * o + e.speedX / 5) / 3, e.speedY += -(Math.sin(r) * o + e.speedY / 5) / 5, d.speedX += (Math.cos(r) * o + e.speedX / 5) / 3, d.speedY += (Math.sin(r) * o + e.speedY / 5) / 3, e.speedRotation = e.speedX / 200
                        }
                    }
                    return t
                }, f.isGoal = function(e) {
                    var t = f.x - e.x,
                        i = f.y + 300 - e.y;
                    return Math.sqrt(t * t + i * i) < w
                }, f.tick = function() {
                    e.tick()
                }
            }),
            r = Container.expand(function() {
                var e = Container.call(this);
                e.speedX = 0, e.speedY = 0, e.fixed = !1, e.tick = function() {
                    e.fixed || (e.x += e.speedX *= .93, e.y += e.speedY *= .93, e.speedY += 1)
                }
            }),
            l = i.expand(function(o, a, s, l) {
                var h = this,
                    e = document.createElement("canvas");
                e.width = e.height = 20;
                var t = e.getContext("2d");
                t.fillStyle = "#ffffff", t.fillRect(0, 0, 20, 20), i.call(this, e), h.tick = function() {
                    var e = o.x - a.x,
                        t = o.y - a.y,
                        i = Math.sqrt(e * e + t * t),
                        n = Math.atan2(t, e);
                    if (s < i) {
                        var r = (i - s) / 8;
                        o.speedX -= Math.cos(n) * r, o.speedY -= Math.sin(n) * r, a.speedX += Math.cos(n) * r, a.speedY += Math.sin(n) * r
                    }
                    h.x = a.x - 10 * Math.cos(n) * h.ratio, h.y = a.y - 10 * Math.sin(n) * h.ratio, h.rotation = n, h.width = (i + 20) * h.ratio, h.height = 1.5 * l * h.ratio
                }
            });

        function h(o) {
            var a = [],
                n = [];
            this.getNode = function(e, t) {
                var i = new r;
                return i.x = e, i.y = t, n.push(i), i
            }, this.getLine = function(e, t, i, n) {
                var r = new l(e, t, i, n);
                return a.push(r), o.addChild(r), r
            }, this.tick = function() {
                for (var e = 0; e < n.length; e++) n[e].tick();
                for (e = 0; e < a.length; e++) a[e].tick()
            }
        }
        var Oe = new(Container.expand(function() {
                for (var o = Container.call(this), t = [], e = 0; e < 5; e++) {
                    var i = new Sprite(fetch("i/g/coinflat.svg")),
                        n = new Sprite(fetch("i/g/coinflatshadow.svg"));
                    n.y = i.y = 20 * -e - 30, i.visible = Me.spawnCoin.get() > e, o.addChild(n), o.addChild(i), t.push(i)
                }
                var a = new Text2("22:22", {
                    size: 95,
                    font: "'GillSans-Bold',Impact,'Arial Black',Tahoma",
                    fill: "#ffffff",
                    dropShadow: !0
                });
                a.anchor.set(1, 1), a.y = 20;
                var r = new Text2(Host.Localize.Translate("Next coin in"), {
                    size: 50,
                    fill: "#ffffff",
                    dropShadow: !0
                });
                r.anchor.set(1, 1), r.y = 30 - a.height, r.x = 0, o.addChild(a), o.addChild(r);
                var s = 3e5,
                    l = 6e4;

                function h(e) {
                    return e < 10 ? "0" + e : e
                }

                function d() {
                    var e = (new Date).getTime() - Me.spawnTime.get(),
                        t = 0 == Me.spawnCoin.get() ? l : s;
                    e < 0 && Me.spawnTime.set((new Date).getTime()), t <= e && o.despawnCoin(!0);
                    var i = (t - (e = (new Date).getTime() - Me.spawnTime.get())) / 1e3 >> 0,
                        n = i / 60 >> 0,
                        r = Math.ceil(i - 60 * n);
                    60 < i ? a.setText(h(n) + ":" + h(r)) : a.setText(h(Math.floor((t - e) / 1e3)))
                }

                function c() {
                    d(), r.visible = a.visible = 5 != Me.spawnCoin.get()
                }
                o.spawnCoin = function() {
                    return XS.events.onPositiveEvent(.3), 0 < Me.spawnCoin.get() && (o.visible = !0, 0 != Me.spawnTime.get() && 1 != Me.spawnCoin.get() || Me.spawnTime.set((new Date).getTime()), Me.spawnCoin.set(Me.spawnCoin.get() - 1), t[Me.spawnCoin.get()].visible = !1, c(), Me.spawnCoin.get())
                }, o.despawnCoin = function(e) {
                    Me.spawnCoin.get() < t.length && (t[Me.spawnCoin.get()].visible = !0, Me.spawnCoin.set(Me.spawnCoin.get() + 1), 5 == Me.spawnCoin.get() ? Me.spawnTime.set(0) : e && Me.spawnTime.set(Me.spawnTime.get() + s), c())
                }, c(), XS.setInterval(function() {
                    0 != Me.spawnTime.get() && d()
                }, 250)
            })),
            De = new(Container.expand(function() {
                var u = Container.call(this);
                XS.on("resize", function(e) {
                    u.x = (width / stage.ratio * XS.devicePixelRatio - targetHeight) / 2, u.y = height / stage.ratio * XS.devicePixelRatio - targetWidth
                });
                var e = new Sprite(fetch("i/g/floor.svg"));
                e.anchor.set(.5, 0), u.addChild(e), e.x = targetHeight / 2, e.y = 2100;
                var o = new Text2("", {
                    size: 100,
                    font: "'GillSans-Bold',Impact,'Arial Black',Tahoma",
                    fill: "#61392e",
                    align: "center"
                });
                o.anchor.set(.5, .5), u.addChild(o), o.y = 1650, o.x = targetHeight / 2;
                var s = new ke;
                u.addChild(s);
                var l = new Ie;
                u.addChild(l);
                var h = {};
                window.roundStats = h;
                var a = 0,
                    i = 0;

                function t() {
                    h.hasHitHoop = !1, h.initialAllNet = 0, h.totalAllNet = 0, h.streakAllNetCurrent = 0, h.streakAllNet = 0, h.totalHoopsShot = 0
                }
                t(), s.x = targetHeight / 2, s.y = 600, l.x = targetHeight / 2, l.y = s.y + 280;
                var f = new Sprite(fetch("i/g/shadow.svg"));
                f.anchor.set(.5, .5), u.addChild(f), u.coin = new Sheet(fetch("i/g/coinsheet.svg"), 250, 250);
                u.children.length;
                u.coin.x = 2048 * Math.random(), u.coin.y = 200 * Math.random();
                var d = !1,
                    c = !1,
                    p = !1,
                    n = 0;
                XS.on("tick", function() {
                    d && ++n % 4 == 0 && u.coin.frame++
                });
                var g = !1;
                var v = new Ge;

                function m(e) {
                    for (var t = 0; t < Ee.length; t++)
                        if (e == Ee[t].id) return t;
                    return 0
                }
                u.addChild(v), u.spawnCoin = function() {
                    c || !1 !== Oe.spawnCoin() && (Re.ding.play(), d = !(c = !0), u.coin.frame = 0, u.coin.x = width / stage.ratio * XS.devicePixelRatio - De.x - s.x - 250, u.coin.y = height / stage.ratio * XS.devicePixelRatio - De.y - s.y - 250, u.coin.scale.set(.8, .8), new Tween(u.coin.scale, {
                        x: 1.5,
                        y: 1.5
                    }, .5, Tween.easeout).call(function() {
                        new Tween(u.coin.scale, {
                            x: 1,
                            y: 1
                        }, .5, Tween.easein)
                    }), new Tween(u.coin, {
                        x: -125,
                        y: 550
                    }).call(function() {
                        p = d = !0
                    }), s.addChild(u.coin))
                }, u.despawnCoin = function() {
                    c && !g && (c = p = !1, s.removeChild(u.coin), Oe.despawnCoin())
                }, v.setSkin(Ee[m(Me.ballSkinId.get())]);
                var w = 250,
                    y = !0,
                    S = !1,
                    b = !1,
                    _ = !1,
                    x = !1,
                    T = 0;
                u.getTotalPoints = function() {
                    return T
                }, u.getTotalHoops = function() {
                    return h.totalHoopsShot
                };
                var C = new Text2("+1", {
                    size: 200,
                    font: "'GillSans-Bold',Impact,'Arial Black',Tahoma",
                    fill: "#ffffff"
                });
                C.alpha = 0, C.anchor.set(.5, .5), u.addChild(C);
                var M = 0,
                    R = !0,
                    E = {
                        x: s.x,
                        y: s.y
                    };

                function r() {
                    if (E.x != s.x || E.y != s.y) {
                        var e = E.x - s.x,
                            t = E.y - s.y;
                        l.push(e, t), E = {
                            x: s.x,
                            y: s.y
                        }
                    }
                    if (q) {
                        if (v.setRotation(v.getRotation() + v.speedRotation), v.x += v.speedX, v.y += v.speedY, v.speedY += 4, 0 < v.speedY && (y && (y = !1, u.addChild(l)), l.interact(v) && (x = !0), !b && l.isGoal(v))) {
                            if (b = !0, h.totalHoopsShot++, Te) {
                                var i = window.Social.Instant.GetContextTournament();
                                i && s.setActionsLeft(i.actions + 1 - h.totalHoopsShot)
                            }
                            M = x ? (h.hasHitHoop = !0, h.streakAllNetCurrent = 0, Re.net.play(0), 0) : (h.totalAllNet++, h.streakAllNetCurrent++, h.streakAllNetCurrent > h.streakAllNet && (h.streakAllNet = h.streakAllNetCurrent), Re.netDirect.play(0), Math.min(M + 1, 3)), h.hasHitHoop || h.initialAllNet++, 3 == M && (XS.events.onPositiveEvent(.4), De.spawnCoin()),
                                function() {
                                    if (p && !g && c) {
                                        g = !(c = !1);
                                        var e = .5 * XS.devicePixelRatio;
                                        Re.coinpickup.play();
                                        var t = (u.coin.x + u.x + s.x) * u.ratio / e,
                                            i = (u.coin.y + u.y + s.y) * u.ratio / e;
                                        d = !1, u.coin.frame = 0, s.removeChild(u.coin), XS.stageContainer.addChild(u.coin), u.coin.ratio = stage.ratio, u.coin.x = t, u.coin.y = i, u.coin.ratio = e, u.coin.scale.set(u.ratio / e, u.ratio / e), new Tween(u.coin.scale, {
                                            x: .68,
                                            y: .68
                                        }, .5, Tween.easeout).call(function() {
                                            new Tween(u.coin.scale, {
                                                x: .34,
                                                y: .34
                                            }, .5, Tween.easein)
                                        }), Xe(Me.coins.get() + 1, 1e3), new Tween(u.coin, {
                                            x: .17 * Be.x * 2,
                                            y: .17 * Be.y * 2
                                        }).call(function() {
                                            g = !1, XS.stageContainer.removeChild(u.coin), p = !1
                                        })
                                    }
                                }();
                            var n = (parseInt(Me.ballcount.get()) || 0) + 1;
                            Me.ballcount.set(n), s.setHoopCount(n), _e();
                            var r = x ? 2 : 3;
                            0 < M && (r *= M),
                                function(e) {
                                    if (Tween.clear(C), C.setText("+" + e), C.alpha = 1, C.x = l.x, C.y = l.y + 450, new Tween(C, {
                                            y: C.y - 200,
                                            alpha: 0
                                        }, 1).wait(.5), T += e, s.setScore(T), Te) {
                                        var t = window.Social.Instant.GetContextTournament();
                                        t && T > t.topPlayer.score && s.setScoreTarget(T)
                                    }
                                    T > Me.highscore.get() && (Me.highscore.set(T), s.setHighscore(T), _e(!0))
                                }(r);
                            var o = T * M;
                            195 < o ? Re.clap[4].play(0) : 150 < o ? Re.clap[3].play(0) : 135 < o ? Re.clap[2].play(0) : 90 < o ? Re.clap[1].play(0) : 54 < o && Re.clap[0].play(0), s.setMultiplier(M), me(!0)
                        }
                        v.z < 130 && (v.z += 3, v.z = Math.min(v.z, 130)), 1250 < v.y && !b && 0 < v.speedY && !_ && 0 != T && (_ = !0, 45 <= T ? Re.awww[1].play(0) : Re.awww[0].play(0)), 1350 < v.y && 0 < v.speedY && !S && (S = !0, new Tween(v, {
                            alpha: 0
                        }, .2).call(function() {
                            XS.setTimeout(function() {
                                V()
                            }, 100)
                        }));
                        var a = w / (w + v.z);
                        v.scale.set(a, a)
                    }
                }

                function L() {
                    var e = window.Social.Instant.GetContextTournament();
                    if (e && e.topPlayer.id == FBInstant.player.getID()) return e
                }

                function A() {
                    if (Te) {
                        var e = window.Social.Instant.GetContextTournament();
                        e && (s.setMode("tournament"), s.setActionsLeft(e.topPlayer.actions + 1), s.setScoreTarget(e.topPlayer.score), ve(), function() {
                            var e = L();
                            if (e) G(), z(e.topPlayer.score, e.topPlayer.actions)
                        }())
                    } else ue()
                }

                function P() {
                    Modal.hide(), G(), s.setMode("singleplayer"), window.Social.Instant.showGameOver(Te).then(function(e) {
                        Te = e && e.tournament, A(), D(Te)
                    })
                }

                function G() {
                    j = !0, o.setText(""), a++, R = !0, s.setMultiplier(0), _e(), u.despawnCoin(), Oe.visible = !0, B()
                }

                function k() {
                    G(), XS.is.facebookInstant && window.FBInstant ? (Te || (de(), me()), P()) : ((XS.is.samsungBixby || XS.is.rcs) && me(), u.showShopGameOver(function() {
                        Modal.hide(function() {
                            I ? XS.events.onGamePlayStart() : XS.showInterstitialAd(null, !0), D()
                        })
                    }))
                }
                u.showShopGameOver = function(e, t) {
                    XS.events.onGamePlayStop(), XS.track.customEvent("shop_show", 1);
                    var o = m(Me.ballSkinId.get());
                    Ae(o) || (o = 0);
                    var a = new Modal.GameEndModal({
                            headline: t ? Host.Localize.Translate("Ball Shop", {}, "In-game ball shop modal headline") : Host.Localize.Translate("Game Over", {}, "In-game game over modal headline"),
                            lead: Host.Localize.Translate("Select Your Ball", {}, "Headline for Basketball FRVR ball shop"),
                            mainActionCallback: function() {
                                Ae(o) && (Me.ballSkinId.set(Ee[o].id), v.setSkin(Ee[o]), e())
                            },
                            mainActionText: Host.Localize.Translate("Play"),
                            mainActionColor: 16477478,
                            contentTop: 540,
                            disableMetaButton: !1
                        }),
                        i = new Sprite(fetch("i/g/shopbtn.svg"));
                    i.anchor.set(.5, .5), a.addChild(i), i.x = 100, i.y = 360, i.on("down", function() {
                        p(o - 1)
                    });
                    var n = new Sprite(fetch("i/g/shopbtn.svg"));
                    n.anchor.set(.5, .5), n.scale.set(-1, 1), a.addChild(n), n.x = 700, n.y = 360, n.on("down", function() {
                        p(o + 1)
                    });
                    var s = new Container;
                    s.x = 400, s.y = 560;
                    var r = new Sprite(fetch("i/g/ballloader.svg"));
                    r.anchor.set(.5, .5), r.scale.set(.4, .4), r.x = 400, r.y = 360, r.alpha = .5, a.addChild(r);
                    var l = new Graphics;
                    l.beginFill(3572119, 1), l.drawRoundedRect(0, 0, 310, 100, 20), l.x = 0, l.y = 0, s.addChild(l);
                    var h = new Sheet(fetch("i/g/coinsheet.svg"), 250, 250);
                    h.x = -162, h.y = -57, h.scale.set(.48, .48), s.addChild(h);
                    var d, c, u = new Text2("1000", {
                        weight: 400,
                        fill: "#FFFFFF",
                        size: 70,
                        maxWidth: 210,
                        dropShadow: !0
                    });

                    function f(e) {
                        var t = Ee[e],
                            i = Me.coins.get();
                        d && (d.parent.removeChild(d), d = void 0), c && (c.parent.removeChild(c), c = void 0), u.setText(t.coinCost);
                        var n = Ae(e);
                        s.visible = !n, u.alpha = h.alpha = i >= t.coinCost ? 1 : .5, n ? a.mainAction.setColor(16477478) : a.mainAction.setColor(14540253);
                        var r = [t.ballGraphics, t.ballShine, function() {
                            e == o && ((d = new Sprite(fetch(t.ballGraphics))).anchor.set(.5, .5), d.scale.set(.5, .5), (c = new Sprite(fetch(t.ballShine))).anchor.set(.5, .5), c.scale.set(.5, .5), c.x = d.x = 400, c.y = d.y = 360, a.addChild(d), a.addChild(c))
                        }];
                        preload.apply(window, r)
                    }

                    function p(e) {
                        f(o = Math.max(0, e, Math.min(e, Ee.length - 1))), i.visible = 0 != o, n.visible = o != Ee.length - 1
                    }
                    u.anchor.set(.5, .5), s.addChild(u), u.x = 35, u.y = 0, a.addChild(s), a.setRatio = function(e) {
                        l.width = 310 * e, l.x = -l.width / 2, l.y = -50 * e, l.height = 100 * e
                    }, l.on("down", function() {
                        var e = Ee[o],
                            t = e.coinCost,
                            i = Me.coins.get();
                        if (t <= i) {
                            var n = JSON.parse(Me.unlocked.get() || "{}");
                            n[e.id] = !0, Me.unlocked.set(JSON.stringify(n)), Xe(i -= t), f(o)
                        }
                    }), p(o), Modal.show(a)
                }, u.showFacebookGameOver = P;
                var I = !1,
                    O = !0;

                function D(e) {
                    I = !1, e || (Te = !1, ue(), s.setMode("singleplayer"), s.setHighscore(Me.highscore.get())), O || (O = !0, Tween.clear(Fe), new Tween(Fe, {
                        alpha: 1
                    }, .25)), t(), R = !1, T = 0, s.setScore(T), M = 0, s.setMultiplier(0), K(), Ce(), me(), B()
                }

                function B() {
                    l.reset(), v.x = targetHeight / 2, v.y = 2200, f.x = targetHeight / 2, f.y = v.y + 270, J = q = S = !(y = !0), v.scale.set(1, 1), v.z = 0, v.speedRotation = 0, x = !1, u.addChild(v)
                }
                if (u.newGame = D, XS.is.facebookInstant) {
                    var F = document.createElement("canvas"),
                        X = F.getContext("2d");
                    F.width = 1e3, F.height = 540;
                    var H = 100;

                    function z(t, i) {
                        var e = -1 != FBInstant.getSupportedAPIs().indexOf("matchPlayerAsync") && !0,
                            n = -1 != FBInstant.getSupportedAPIs().indexOf("shareAsync") && !0,
                            r = (e ? 165 : 0) + (n ? 165 : 0),
                            o = new Modal.GameEndModal({
                                headline: Host.Localize.Translate("You are in the lead!", {}, "Game over modal headline"),
                                lead: Host.Localize.Translate("With {score} Points in {balls} Throws", {
                                    score: t,
                                    balls: i
                                }, "Congratulary dialouge text telling the user they are now in the lead."),
                                mainActionCallback: function() {
                                    Modal.hide(function() {
                                        k()
                                    })
                                },
                                disableMetaButton: !0,
                                mainActionText: Host.Localize.Translate("Back"),
                                mainActionColor: 16477478,
                                contentTop: 230 + r - 55 + 30
                            });
                        o.addTextBlock("(You can't play while you're in the lead.)", 35).y = 210;
                        var a = 0;
                        n && (o.addMiddleButton(Host.Localize.Translate("Share {gamename}", {
                            gamename: ze.shortTitle
                        }), Host.Localize.Translate("Post {gamename} to your feed", {
                            gamename: ze.shortTitle
                        }), function() {
                            window.Social.Instant.shareGame(function(e) {})
                        }, 2967673).y = 260, a += 165);
                        e && (o.addMiddleButton(Host.Localize.Translate("Find players"), Host.Localize.Translate("Play with random group"), function() {
                            Modal.hide(function() {
                                window.Social.Instant.matchPlayerAsync(function(e) {
                                    e ? Modal.hide() : z(t, i)
                                })
                            })
                        }, 45576).y = 230 + a + 30);
                        o.blurCallback = void 0, Modal.show(o)
                    }

                    function N(e, t, s) {
                        var i = {
                            score: e,
                            actions: t,
                            player: {
                                name: FBInstant.player.getName(),
                                id: FBInstant.player.getID(),
                                photo: FBInstant.player.getPhoto()
                            }
                        };
                        window.Social.Instant.postTournamentStatus(i, function(e, t) {
                            if ("success" == e) {
                                var i = window.Social.Instant.GetContextTournament(),
                                    n = [Host.Localize.Translate("{playername} easily takes the lead", {
                                        playername: i.topPlayer.name
                                    }, "Message posted back into facebook conversation").toString(), Host.Localize.Translate("{playername} made it look so easy!", {
                                        playername: i.topPlayer.name
                                    }, "Message posted back into facebook conversation").toString(), Host.Localize.Translate("It was never going to be enough to stop {playername}!", {
                                        playername: i.topPlayer.name
                                    }, "Message posted back into facebook conversation").toString(), Host.Localize.Translate("{playername} is in the lead. The rest of you are rubbish.", {
                                        playername: i.topPlayer.name
                                    }, "Message posted back into facebook conversation").toString()],
                                    r = {
                                        context: i,
                                        imageText: n[n.length * Math.random() >> 0],
                                        image: "i/web/bubble.jpg"
                                    };
                                o = r, a = function() {
                                    window.Social.Instant.postScreenshot(F, Host.Localize.Translate("{name} is now in the 🏀 lead with {score} points in {actions} throws", {
                                        name: FBInstant.player.getName(),
                                        score: i.topPlayer.score,
                                        actions: i.topPlayer.actions
                                    }, "Conversation postback template").toString(), "IMMEDIATE_CLEAR")
                                }, preload.apply(window, [o.context.topPlayer.photo, o.image, function() {
                                    X.drawImage(embed(o.image), 0, 0), X.fillStyle = "#000000", X.font = '50px "Helvetica Neue","Trebuchet MS", Helvetica, sans-serif', X.textBaseline = "top",
                                        function(e, t, i, n, r, o) {
                                            var a = t.split(" "),
                                                s = "";
                                            e.measureText || (e.measureText = function(e) {
                                                return {
                                                    width: 20 * e.length
                                                }
                                            });
                                            for (var l = 0; l < a.length; l++) {
                                                var h = s + a[l] + " ";
                                                r < e.measureText(h).width && 0 < l ? (e.fillText(s, i, n), s = a[l] + " ", n += o) : s = h
                                            }
                                            e.fillText(s, i, n)
                                        }(X, o.imageText, 76, 70, 500, 65);
                                    var e = embed(o.context.topPlayer.photo);
                                    X.drawImage(e, 20, 540 - H - 20, H, H), X.fillStyle = "#ffffff", X.font = '400 70px "Helvetica Neue","Trebuchet MS", Helvetica, sans-serif', X.textBaseline = "bottom", X.strokeStyle = "#4f4d56", X.lineWidth = 10;
                                    var t = Host.Localize.Translate("{name} {score} in {actions}", {
                                        name: o.context.topPlayer.name,
                                        score: o.context.topPlayer.score,
                                        actions: o.context.topPlayer.actions
                                    }, "Postback name template, please keep short").toString();
                                    X.strokeText(t, 20 + H + 20, 520), X.fillText(t, 20 + H + 20, 520), a && a()
                                }]), s && s(!0)
                            } else ve(), s && s(!1);
                            var o, a
                        })
                    }
                    XS.on("FBInstantPostTournament", function(e) {
                        var t = e.scores;
                        if (0 < t.length) {
                            for (var i = [], n = 0; n < t.length; n++) {
                                var r = t[n],
                                    o = Host.Localize.Translate(ze.facebookInstantTournamentScoreTemplate, {
                                        score: r.score,
                                        actions: r.actions
                                    });
                                i.push([r.id, r.name, r.photo, o.toString()])
                            }
                            window.Social.Instant.postHighscoreToChannel(i, Host.Localize.Translate("The previous 🏀 tournament is over and the results are in!", {}, "Text shown with image of the end of tournament screen").toString())
                        }
                    })
                }
                var U = new(Modal.ModalOverlayContent.expand(function() {
                        Modal.ModalOverlayContent.call(this), this.addHeadline(Host.Localize.Translate("Game Over", {}, "Game over modal headline")), this.addLead(Host.Localize.Translate("You did not beat the best score.", {}, "Game over modal text")), this.innerHeight = 250, this.blurClose = !1
                    })),
                    W = new(Modal.ModalOverlayContent.expand(function() {
                        Modal.ModalOverlayContent.call(this), this.addHeadline(Host.Localize.Translate("Well done!", {}, "Modal for when people take the lead headline")), this.addLead(Host.Localize.Translate("You beat the high score\nand took the lead.", {}, "Text in dialouge when you take the lead")), this.innerHeight = 290, this.blurClose = !1
                    })),
                    Y = !0,
                    j = !0;

                function V(t) {
                    if (b && XS.is.facebookInstant && Te) {
                        var e = window.Social.Instant.GetContextTournament();
                        e ? h.totalHoopsShot > e.actions && (R = !0, T > e.topPlayer.score ? N(T, h.totalHoopsShot, function(e) {
                            e && (Modal.show(W, !1), XS.setTimeout(function() {
                                z(T, h.totalHoopsShot)
                            }, 3e3))
                        }) : (Modal.show(U, !1), XS.setTimeout(function() {
                            Modal.hide(k)
                        }, 3e3))) : (Te = !1, window.Social.Instant.setTournamentPlayingState(!1))
                    }! function() {
                        if (B(), b || t) K();
                        else if (!R)
                            if (0 == T) Modal.show(new Pe, !0, !0), XS.setTimeout(function() {
                                R || Modal.hide()
                            }, 1e3), D(Te);
                            else {
                                Y = !0, XS.track.gameEnd("00", {
                                    usedRetry: I.toString(),
                                    points: T,
                                    throws: h.totalHoopsShot
                                });
                                var e = 7 <= h.totalHoopsShot || 6 <= T / h.totalHoopsShot;
                                j && e ? (j = !1, XS.is.facebookInstant ? window.Social.Instant.ShowTryAgain({
                                    rewardVideo: xe
                                }, function(e) {
                                    e ? (I = !0, K()) : k()
                                }) : window.Social.ShowTryAgainModal("reward_all", function(e) {
                                    e ? (I = !0, K()) : k()
                                })) : k()
                            } _ = b = !1
                    }()
                }
                var Z = !(Sidebar.icon.tint = 6371630);

                function K() {
                    if (T < 45) {
                        Tween.clear(l, s), Z = !1;
                        var e = 15 <= T ? 700 * (2 * Math.random() - 1) : 0,
                            t = 30 <= T ? 400 * (2 * Math.random() - 1) : 0;
                        new Tween(l, {
                            x: targetHeight / 2 + e,
                            y: 600 + t + 280
                        }, .5), new Tween(s, {
                            x: targetHeight / 2 + e,
                            y: 600 + t
                        }, .5)
                    } else {
                        t = 400 * (2 * Math.random() - 1);
                        if (new Tween(l, {
                                y: 600 + t + 280
                            }, .5), new Tween(s, {
                                y: 600 + t
                            }, .5), !Z) {
                            function i() {
                                new Tween(l, {
                                    x: targetHeight / 2 + 700
                                }, 4, Tween.linary), new Tween(s, {
                                    x: targetHeight / 2 + 700
                                }, 4, Tween.linary).call(function() {
                                    new Tween(l, {
                                        x: targetHeight / 2 - 700
                                    }, 4, Tween.linary), new Tween(s, {
                                        x: targetHeight / 2 - 700
                                    }, 4, Tween.linary).call(i)
                                })
                            }
                            Z = !0, new Tween(l, {
                                x: targetHeight / 2 - 700
                            }, 2, Tween.linary), new Tween(s, {
                                x: targetHeight / 2 - 700
                            }, 2, Tween.linary).call(function() {
                                i()
                            })
                        }
                    }
                    new Tween(v, {
                        alpha: 1
                    }, .2), Tween.clear(f, f.scale), f.scale.set(1, 1), f.alpha = 1
                }
                V(!0), s.setHighscore(Me.highscore.get() || 0, !0), s.setHoopCount(Me.ballcount.get() || 0), _e();
                var Q, q = !1,
                    J = !1,
                    $ = void 0,
                    ee = (new Date).getTime(),
                    te = 0;

                function ie(e, t) {
                    if (J && !q && !R) {
                        var i = e.event.getLocalPosition(u),
                            n = i.x - $.x,
                            r = i.y - $.y,
                            o = n / v.ratio,
                            a = r / v.ratio;
                        v.x = Q.x + o / (1 + .002 * Math.abs(o || 1)), v.y = Math.min(Q.y + a / (1 + .002 * Math.abs(a || 1)), 2200), f.x = v.x;
                        var s = Math.max(1 - Math.max(2200 - v.y, 0) / 200, 0);
                        f.alpha = s, f.scale.set(1 + (1 - s) / 10, 1 + (1 - s) / 10);
                        var l = Math.sqrt(n * n + r * r),
                            h = 400 < l / u.ratio || 400 < l;
                        if (300 < l / u.ratio || 300 < l || t && 50 < l / u.ratio) {
                            yScale = 1;
                            n = i.x - $.x, r = i.y - $.y;
                            angle = Math.atan2(r, n);
                            var d = 130 * Math.cos(angle) / 5,
                                c = 130 * Math.sin(angle);
                            if ((300 < (new Date).getTime() - ee || h || t) && c < 0) return XS.clearTimeout(te), c = Math.min(c, -125), v.speedX = d, v.speedY = c, v.speedRotation = v.speedX / 200, Re.throws[2 * Math.random() | 0].play(0), 1 == Y && (Y = !1, XS.track.gamePlayStart("first_throw")), q = !0, new Tween(f, {
                                alpha: 0
                            }, .1), !0
                        }
                    }
                }
                v.on("down", function(e) {
                    q || J || R || (O && (O = !1, Tween.clear(Fe), new Tween(Fe, {
                        alpha: 0
                    }, .25)), Tween.clear(v, v.scale, f, f.scale), v.alpha = 1, Me.hideTutorial.get() || (Me.hideTutorial.set(!0), se = !1, new Tween(ae, {
                        alpha: 0
                    }, .5).call(function() {
                        ae.parent && ae.parent.removeChild(ae)
                    })), J = !0, $ = e.event.getLocalPosition(u), Q = {
                        x: v.x,
                        y: v.y
                    }, ee = (new Date).getTime(), XS.clearTimeout(te), te = XS.setTimeout(function() {
                        q || (J = !1, ne())
                    }, 500))
                }), stage.on("move", function(e) {
                    ie(e)
                });

                function ne() {
                    new Tween(v, {
                        x: targetHeight / 2,
                        y: 2200
                    }, .2, Tween.easeout), new Tween(f, {
                        alpha: 1,
                        x: targetHeight / 2
                    }, .2, Tween.easeout), new Tween(f.scale, {
                        x: 1,
                        y: 1
                    }, .2, Tween.easeout)
                }
                stage.on("up", function(e) {
                    ie(e, !0) || q || R || (ne(), J = !1)
                });
                var re = s.x;
                XS.on("tick", function() {
                    r(), l.tick(), s.x - re, re = s.x
                });
                var oe, ae = new Sprite(fetch("i/g/finger.svg"));

                function se() {
                    Me.hideTutorial.get() || (Oe.visible = !1, u.addChild(ae), new Tween(ae.scale, {
                        x: .9,
                        y: .9
                    }, .1).call(function() {
                        new Tween(ae, {
                            y: 1300,
                            alpha: 0
                        }, .4).call(function() {
                            ae.y = 2200, ae.scale.set(1, 1), new Tween(ae, {
                                alpha: 1
                            }, .5).call(se).wait(.2)
                        }).wait(.2)
                    }))
                }
                ae.x = targetHeight / 2, ae.y = 2200, ae.anchor.set(.15, .24), se();
                var le = [],
                    he = !1;

                function de(e) {
                    if (!Te) {
                        if (XS.is.rcs && window.rcs) return rcs.updateStory("Basketball", {
                            task: !0
                        }), he = !0;
                        var t = {
                            bestScoreInSession: i,
                            ballcount: Me.ballcount.get(),
                            score: T,
                            initialAllNet: h.initialAllNet,
                            totalAllNet: h.totalAllNet,
                            streakAllNet: h.streakAllNet,
                            totalHoopsShot: h.totalHoopsShot
                        };
                        window.Social.Instant.submitData(t, e)
                    }
                }
                XS.on("RCS", function() {
                    if (XS.is.rcs) {
                        rcs.init("Basketball", function() {
                            rcs.getTasks("Basketball", function(e) {
                                le = e, ue()
                            })
                        })
                    }
                });
                var ce = [Host.Localize.Translate("Success!"), Host.Localize.Translate("Amazing!"), Host.Localize.Translate("Impressive!"), Host.Localize.Translate("Tadaa!"), Host.Localize.Translate("All done!"), Host.Localize.Translate("Perfect!")][6 * Math.random() >> 0];

                function ue() {
                    if (ze.facebookInstantGameID && le && le.subtasks) {
                        for (var e = [], t = 0; t < le.subtasks.length; t++) {
                            var i = le.subtasks[t];
                            switch (i.name) {
                                case "gameRounds":
                                    if (i._completed) e.push(ce);
                                    else {
                                        var n = i.min - (a + (i.progress || 0));
                                        1 == n ? e.push(Host.Localize.Translate("Just one more game to go!")) : e.push(Host.Localize.Translate("Play {games} more games.", {
                                            games: n
                                        }))
                                    }
                                    break;
                                case "streakAllNet":
                                    if (i._completed) e.push(ce);
                                    else 1 == (r = Math.max(i.min - h.streakAllNetCurrent, 0)) ? e.push(Host.Localize.Translate("Just net one more time!")) : e.push(Host.Localize.Translate("Just net {times} times in a row", {
                                        times: r
                                    }));
                                    break;
                                case "totalHoopsShot":
                                    var r;
                                    if (i._completed) e.push(ce);
                                    else 1 == (r = Math.max(i.min - h.totalHoopsShot, 0)) ? e.push(Host.Localize.Translate("Just one basket to go!")) : e.push(Host.Localize.Translate("Shoot {times} baskets in a row", {
                                        times: r
                                    }));
                                    dirty = !0;
                                    break;
                                case "playedFriends":
                                    e.push(Host.Localize.Translate("Play with a friend.\nYou can invite them in Messenger!"));
                                    break;
                                case "score":
                                    i._completed ? e.push(ce) : void 0 !== i.min && void 0 !== i.max ? e.push(Host.Localize.Translate("Score between\n{min} and {max}  points", {
                                        min: i.min,
                                        max: i.max
                                    })) : e.push(Host.Localize.Translate("Score {points} points", {
                                        points: i.min
                                    }));
                                    break;
                                default:
                                    e.push("Unhandled task:\n\t" + JSON.stringify(i))
                            }
                        }
                        o.setText(e.join("\n"))
                    }
                }

                function fe() {
                    !Te || ge || window.Social.Instant.overlayVisible() || s.setTimeLeft(window.Social.Instant.getTournamentTimeLeftText(":", ":"))
                }
                var pe = Modal.ModalOverlayContent.expand(function() {
                        Modal.ModalOverlayContent.call(this), this.addHeadline(Host.Localize.Translate("Out of time!", {}, "Headline for dialouge saying tournament is over")), this.addLead(Host.Localize.Translate("You did not win the tournament in time", {}, "Text for dialouge saying tournament is over")).y += 10, this.blurClose = !1, this.innerHeight = 260
                    }),
                    ge = !1;

                function ve() {
                    var e = window.Social.Instant.GetContextTournament();
                    if (e) {
                        var t = "";
                        if (0 == e.scores.length) t = Host.Localize.Translate("Start tournament by\nshooting 3 hoops", {});
                        else {
                            var i = e.topPlayer;
                            t = Host.Localize.Translate("Score at least {points} points\nin {throws} throws", {
                                points: i.score + 1,
                                throws: i.actions + 1
                            })
                        }
                        fe(), o.setText(t.toString())
                    }
                }

                function me(e) {
                    if (ze.facebookInstantGameID && le && le.subtasks && !Te) {
                        for (var t = !1, i = 0; i < le.subtasks.length; i++) {
                            var n = le.subtasks[i];
                            if (!n._completed) switch (n.name) {
                                case "gameRounds":
                                    n.min - (a + (n.progress || 0)) <= 0 && (n._completed = !0), t = !0;
                                    break;
                                case "streakAllNet":
                                    h.streakAllNetCurrent >= n.min && de(n._completed = !0), t = !0;
                                    break;
                                case "totalHoopsShot":
                                    h.totalHoopsShot >= n.min && de(n._completed = !0), t = !0;
                                    break;
                                case "score":
                                    console.log(T, n.min, T, n.max, !e, XS.is.rcs && window.rcs), void 0 !== n.min && void 0 !== n.max ? T >= n.min && T <= n.max && !e && (t = n._completed = !0, XS.is.rcs && window.rcs && (rcs.updateStory("Basketball", {
                                        task: !0
                                    }), he = !0)) : T >= n.min && de(t = n._completed = !0)
                            }
                        }
                        t && !Te && ue()
                    }
                }
                if (XS.is.facebookInstant && (XS.setInterval(fe, 1e3), XS.on("outoftime", function() {
                        ge = !0, G(), Modal.show(new pe), XS.once("outoftime_ready", function() {
                            XS.setTimeout(function() {
                                Modal.hide(function() {
                                    k(), ge = !1
                                })
                            }, 3e3)
                        })
                    })), XS.is.facebookInstant) u.on("gotData", function(e) {
                    oe = e;
                    var t = Math.max(Me.highscore.get() || 0, parseInt(e.highscore) || 0);
                    Me.highscore.set(t);
                    var i = Math.max(Me.ballcount.get() || 0, parseInt(e.ballcount) || 0);
                    Me.ballcount.set(i);
                    var n = Le(e.unlocked || "{}", Me.unlocked.get() || "{}");
                    Me.unlocked.set(n);
                    var r = Math.max(parseInt(e.coins) || 0, Me.coins.get() || 0);
                    Me.coins.set(r), s.setHoopCount(i), s.setHighscore(t), Xe(Me.coins.get()), _e()
                }), Host.on("FBInstantStart", function() {
                    xe = new window.Social.Instant.RewardVideo(ze.facebookInstantPlacementId, !0), ze.facebookInstantGameID && Host.Tools.LoadJSON(Ne + "/tasks/" + FBInstant.player.getID(), function(e) {
                        e && (le = e, Te || ue())
                    }, function() {}), XS.backgroundMusic.play(0, !0), FBInstant.player.getDataAsync(["ballcount", "highscore", "unlocked", "coins"]).then(function(e) {
                        u.emit("gotData", e)
                    }).catch(window.Social.getPromiseCatchHandler("FBInstant.player.getDataAsync"));
                    var e = FBInstant.getEntryPointData();
                    e && "showFriends" == e.command ? (window.Social.Instant.setTournamentPlayingState(!0), Te = !0, window.Social.Instant.showChooseAsync(function(e) {
                        e ? D(!1) : (window.Social.Instant.setTournamentPlayingState(!1), D(Te = !1))
                    })) : window.Social.Instant.isMultiuserContext() && window.Social.Instant.GetContextTournament() ? L() ? P() : (window.Social.Instant.setTournamentPlayingState(!0), Te = !0, A(), D(!0), gax("send", "event", ze.id + " Tournament", "Playing in tournament"), FBInstant.logEvent("Tournament", 1, {
                        playing: !0
                    })) : D(!1);
                    var t = !0;
                    XS.on("FBContextChange", function() {
                        if (t) return t = !1;
                        A()
                    })
                });
                else {
                    R = !1;
                    var we = Me.muteMusic.get();
                    XS.Music.setMuted(we), we ? XS.backgroundMusic.stop(0) : XS.backgroundMusic.play(0, !0), XS.on("login", function() {
                        console.log("XS backend connected!");
                        var e = Math.max(parseInt(He.user.get("highscore")) || 0, Me.highscore.get() || 0);
                        Me.highscore.set(e);
                        var t = Math.max(parseInt(He.user.get("ballcount")) || 0, Me.ballcount.get() || 0);
                        Me.ballcount.set(t);
                        var i = Le(He.user.get("unlocked") || "{}", Me.unlocked.get() || "{}");
                        Me.unlocked.set(i);
                        var n = Math.max(parseInt(He.user.get("coins")) || 0, Me.coins.get() || 0);
                        Me.coins.set(n), s.setHighscore(Me.highscore.get() || 0, !0), s.setHoopCount(Me.ballcount.get() || 0), Xe(Me.coins.get()), _e()
                    })
                }
                var ye = !1;
                XS.on("gamecenterauthenticated", function() {
                    ye = !0, _e()
                });
                var Se = 0,
                    be = !1;

                function _e(e) {
                    XS.is.rcs && window.rcs && (he || (rcs.updateStory("Basketball"), he = !0)), be = be || e, 0 === Se && (Se = XS.setTimeout(function() {
                        var e = !1;
                        if (oe) {
                            if ((parseInt(oe.highscore) || 0) < Me.highscore.get() && (oe.highscore = Me.highscore.get(), e = !0), (parseInt(oe.ballcount) || 0) < Me.ballcount.get() && (oe.ballcount = Me.ballcount.get(), e = !0), (parseInt(oe.coins) || 0) != Me.coins.get() && (oe.coins = Me.coins.get(), e = !0), oe.unlocked != Me.unlocked.get()) {
                                var t = Me.unlocked.get();
                                oe.unlocked = t, e = !0
                            }
                            console.log("SAVE INSIDE FBInstantData", e), e && FBInstant.player.setDataAsync(oe).then(function() {
                                console.log("Successfully saved state to Facebook Cloud", oe)
                            })
                        } else if (He.loggedin) {
                            if ((parseInt(He.user.get("highscore")) || 0) < Me.highscore.get() && (He.user.set("highscore", Me.highscore.get()), e = !0), (parseInt(He.user.get("ballcount")) || 0) != Me.ballcount.get() && (He.user.set("ballcount", Me.ballcount.get()), e = !0), (parseInt(He.user.get("coins")) || 0) != Me.coins.get() && (He.user.set("coins", Me.coins.get()), e = !0), He.user.get("unlocked") != Me.unlocked.get()) {
                                t = Me.unlocked.get();
                                He.user.set("unlocked", t), e = !0
                            }
                            e && (console.log("XC is dirty saving"), He.save())
                        }
                        ye && (be && (be = !1, Host.GameCenter.ReportScore("grp.basketballfrvrhighscore", Me.highscore.get(), function(e, t) {})), Host.GameCenter.ReportScore("grp.basketballfrvrtotalgoals", Me.ballcount.get(), function(e, t) {})), Se = 0
                    }, 5e3))
                }
            }));
        stage.addChild(De), window.basketball = De;
        var n = new Graphics;
        n.alpha = .3, n.on("up", function() {
            De.showShopGameOver(function() {
                Modal.hide(), XS.events.onGamePlayStart()
            }, !0)
        });
        var o = 0;

        function a(e) {
            o = e, n.clear(), n.beginFill(6371630), n.drawRoundedRect(0, 0, o * XS.devicePixelRatio, 40 * XS.devicePixelRatio, 10 * XS.devicePixelRatio), n.x = (width - o - 10) * XS.devicePixelRatio
        }
        a(100), n.y = 10 * XS.devicePixelRatio, XS.stageContainer.addChild(n);
        var Be = new Sheet(fetch("i/g/coinsheet.svg"), 250, 250);
        Be.x = 12, Be.y = 48, Be.ratio = .17 * XS.devicePixelRatio, XS.stageContainer.addChild(Be);
        var d = void 0;
        if (XS.is.facebookInstant) {
            (d = new Sprite(fetch("i/g/s/addperson.svg"))).x = 112, d.y = 14, d.ratio = XS.devicePixelRatio, d.scale.set(.5, .5), socialButtonBG = new Sprite(fetch("i/g/s/greenbuttonwide.svg")), socialButtonBG.x = 112, socialButtonBG.y = 10, socialButtonBG.ratio = XS.devicePixelRatio, socialButtonBG.scale.set(.65, .65);
            var c = new Text2(Host.Localize.Translate("Friends", {}, "Button text that opens a list of social play options"), {
                size: 24,
                font: "'GillSans','Arial',Tahoma",
                fill: "#ffffff",
                weight: 300
            });
            c.ratio = XS.devicePixelRatio, c.y = 15, XS.stageContainer.addChild(socialButtonBG), XS.stageContainer.addChild(d), XS.stageContainer.addChild(c), socialButtonBG.on("down", function() {
                XS.track.customEvent("clickedPlayFriendly", 1), De.showFacebookGameOver()
            })
        }
        var u = new Text2("", {
            size: 60,
            font: "'GillSans-Bold',Impact,'Arial Black',Tahoma",
            fill: "#ffffff",
            weight: 400
        });
        u.anchor.set(1, .5), u.ratio = .5 * XS.devicePixelRatio, u.x = 500, u.y = 60, XS.stageContainer.addChild(u), Oe.ratio = .25 * XS.devicePixelRatio, Oe.x = 100, Oe.y = 100, XS.stageContainer.addChild(Oe);
        var Fe = new Sprite(fetch("i/g/shoparrow.svg"));
        Fe.anchor.set(1, 0), Fe.ratio = .5 * XS.devicePixelRatio, Fe.y = 110, XS.stageContainer.addChild(Fe), XS.on("resize", function() {
            if (Be.x = width * (100 / 17) - 100 / 17 * 55, u.x = 2 * width - 100, n.x = (width - o - 10) * XS.devicePixelRatio, Oe.x = (width - 50) * XS.devicePixelRatio, Oe.y = (height - 8) * XS.devicePixelRatio, Fe.x = u.x + 40, d) {
                width;
                d.x = width / 2 - 80 + 12, socialButtonBG.x = width / 2 - 80, c.x = width / 2 + 38 - 80 + 20
            }
        }), XS.on("togglesidebar", function(e) {
            Fe.visible = Be.visible = u.visible = n.visible = !e.visible, d && (c.visible = socialButtonBG.visible = d.visible = Fe.visible)
        });
        var f = 0;

        function Xe(e, t) {
            XS.clearTimeout(f), t ? f = XS.setTimeout(function() {
                u.setText(e), a(u.width / XS.devicePixelRatio + 50)
            }, t) : (u.setText(e), a(u.width / XS.devicePixelRatio + 50)), Me.coins.set(e)
        }
        Xe(Me.coins.get() || 0), Sidebar.addMenuHeader(Host.Localize.Translate("Basketball FRVR"));
        Sidebar.addMenuItem(new Sprite(fetch("i/g/s/icon_new.svg", !0)), Host.Localize.Translate("Restart", {}, "Level in this context is a level in a game"), function() {
            Sidebar.hide(), XS.track.gameEnd("00", {
                points: De.getTotalPoints(),
                throws: De.getTotalHoops()
            }), XS.is.facebookInstant ? De.showFacebookGameOver() : De.newGame()
        });
        var p = Sidebar.addMenuItem(new Sprite(fetch("i/g/s/icon_shop.svg", !0)), Host.Localize.Translate("Change Ball", {}, "Menu item spawning ball shop in Basketball FRVR"), function() {
            Sidebar.hide(), De.showShopGameOver(function() {
                Modal.hide(), XS.events.onGamePlayStart()
            }, !0)
        });
        if (XS.is.facebookInstant) Sidebar.addMenuItem(new Sprite(fetch("i/g/s/icon_share.svg", !0)), Host.Localize.Translate("Play with friends!"), function() {
            Sidebar.hide(), window.shareDialogueCallback()
        });
        if (Sidebar.addMenuHeader(Host.Localize.Translate("Settings")), !XS.is.facebookInstant && !XS.is.spilGamesWrapper && !XS.is.poki) {
            Sidebar.addMenuItem(new Sprite(fetch("i/g/s/icon_share.svg", !0)), Host.Localize.Translate("Share {game_name}", {
                game_name: ze.shareTitle
            }), function() {
                window.shareDialogueCallback()
            }), window.insertButton = function(e, t, i) {
                if (!(e instanceof Sprite)) throw "Please update your code to use the new SVG icons: " + t;
                return Sidebar.addMenuItemAfter(p, e, t, i)
            };
            var m = void 0;
            XS.insertRemoveAdsButton = function(e, t, i) {
                m = insertButton(e, t, i)
            }, XS.removeAdsButton = function() {
                m && (Sidebar.removeMenuItem(m), Sidebar.reAlignItems(), m = void 0)
            }
        }
        XS.Sound.setMuted(Me.muteSounds.get()), Sidebar.addMenuToggle(new Sprite(fetch("i/g/s/icon_sound.svg", !0)), Host.Localize.Translate("Sound Effects"), !XS.Sound.muted, function(e) {
            XS.Sound.setMuted(!e), Me.muteSounds.set(!e)
        }), XS.Music.setMuted(Me.muteMusic.get()), Sidebar.addMenuToggle(new Sprite(fetch("i/g/s/icon_music.svg", !0)), Host.Localize.Translate("Music"), !XS.Music.muted, function(e) {
            XS.Music.setMuted(!e), e ? t.play(0, !0) : t.stop(0), Me.muteMusic.set(!e)
        }), XS.is.facebookInstant || XS.is.spilGamesWrapper || XS.is.poki || (Sidebar.addMenuHeader(Host.Localize.Translate("More")), Sidebar.addMenuItem(new Sprite(fetch("i/g/s/icon_frvr.svg", !0)), Host.Localize.Translate("FRVR Games"), function() {
            XS.navigate("https://frvr.com")
        }), Sidebar.addMenuItem(new Sprite(fetch("i/g/s/icon_feedback.svg", !0)), Host.Localize.Translate("Send Feedback"), function() {
            XS.navigate(ze.feedbackURL)
        }), Sidebar.addMenuItem(new Sprite(fetch("i/g/s/icon_legal.svg", !0)), Host.Localize.Translate("Legal"), function() {
            XS.navigate("https://frvr.com/legal/")
        }), Sidebar.addMenuItem(new Sprite(fetch("i/g/s/icon_credits.svg", !0)), Host.Localize.Translate("Credits"), function() {
            XS.navigate("https://frvr.com/credits/" + ze.id + ".html")
        }), Sidebar.addSocialBar()), Ce(), window.Social(), Sidebar.popIcon();
        var w = !1;
        XS.is.poki && stage.on("down", function() {
            w || (w = !0, XS.showInterstitialAd(function() {
                console.log("Showing ad (force) on game start first interaction")
            }, !0, {
                firstInteraction: !0
            }))
        })
    }
    XS.emit("startLoading"), "undefined" != typeof Host && Host.onLoad && Host.onLoad(), setTimeout(function() {
        XS.track.customEvent("session_engage_low")
    }, 6e4), setTimeout(function() {
        XS.track.customEvent("session_engage_high")
    }, 6e5), setTimeout(function() {
        XS.track && XS.track.customEvent && XS.track.customEvent("device_info"), preload.apply(this, XS.modulesToPreload.concat([function() {
            XS.loadConfig(ze.id), XS.audio._init(), XS.data._init()
        }, p, function() {
            XS.initComplete = !0, XS.emit("resize", {}), XS.emit("gameLoaded"), window.Social && window.Social(), XS.events.onGameLoaded()
        }, function() {
            setTimeout(function() {
                Host.ShowGame && Host.ShowGame(), XS.emit("showFullscreenAd", {
                    first: !0,
                    isAtLoad: !0
                }), htmlclean()
            }, XS.is.iOS ? 300 : 1)
        }]))(function(e, t) {
            htmlprogress(e, e - t), XS.emit("std:loading-progress", {
                progress: (e - t) / e * 100
            })
        }), XS.emit("force-resize", {})
    }, 1)
}();
loadAssets(["i/g/shadow.svg", "i/g/ballloader.svg", "i/g/ballpictogram.svg", "i/g/ballshine.svg", "i/g/bitmapfont.svg", "i/g/clockpictogram.svg", "i/g/coinflat.svg", "i/g/coinflatshadow.svg", "i/g/coinsheet.svg", "i/g/crownpictogram.svg", "i/g/finger.svg", "i/g/floor.svg", "i/g/hoop.svg", "i/g/hoopoverlay.svg", "i/g/hooppictogram.svg", "i/g/hoopshadow.svg", "i/g/rim.svg", "i/g/s/addperson.svg", "i/g/s/greenbuttonwide.svg", "i/g/shoparrow.svg", "i/g/ball.svg", "i/g/s/icon_facebook.svg", "i/g/s/icon_feedback.svg", "i/g/s/icon_frvr.svg", "i/g/s/icon_gplus.svg", "i/g/s/icon_legal.svg", "i/g/s/icon_map.svg", "i/g/s/icon_music.svg", "i/g/s/icon_new.svg", "i/g/s/icon_share.svg", "i/g/s/icon_shop.svg", "i/g/s/icon_sound.svg", "i/g/s/icon_twitter.svg", "i/g/s/menutile.svg", "i/g/s/sidebar.svg", "i/g/s/sliderbg.svg", "i/g/s/sliderslider.svg", "i/g/shopbtn.svg", "i/g/s/icon_credits.svg", "i/g/s/icon_ad.png"], ["Knm////oK", "ywn2o9pEnml//////l//////qP6nm/l/l/lo", "6nm////m////onml/l/lllll/l/lll/l/lllll/l/llo", "4t888FfnmlllCfAnml5l5l5l5orrbnm////o6Knm////oK6Knm////oK", "6nmllllllllllllonmllllllllllllonmllllmllllonm////////l////////lm////l////lonmlllllllonmll////////lll////////////lllllonm//l////lll///////////////////////////lll////l///llonmlllllllllllllllonmlll////l////////lll////l//////lllonmll////////////////////////lllm////l////lonmlllllllllonm////////////////////////////////////////m////l////lm////l////lonmll////////////////////////lllm////l////lo", "yw9pEn2qP6nml/l//ll//o", "6nml5l5l5l5ot88Fnml5l5l5l5ot88Fnm/l/lllo6nml5l5l5l5onmlll/l/ot88Fnml5l5l5l5o", "Knm/l/l/l/oK", "fAfAfA6nml555555l5l55l55555l555l5l555l555555l55o6rrfAfAt88Fnml//////l/l//l/////l///l/l///l//////l//ot88Fnm55555l555555555l55555o6nm55l5555555llllml55l55m555lllm5l55ll5ll55llm5lllm555l55l5m55555lot88Fnmllll5mll5ll55llll55ml55555llmlllll55555555ml55l555ml555555555m55l5ll55ot88Fnmlll5555555lll55lll5555lllll555555lll55lll555lllm55l5555mll55555ot88Fnm5555555555555555555l55555555l5o6rfA6nm5l55555555l555555555o6rrrfAfAfA6nml555555l5l55l55555l555l5l555l555555l55o6rrfAfA6nm55l55lm5lllot88Fnm55ll55555555555ot88Fnm55lllm5l5lo6nml5555l555o6rrfAfAt88Fnml//////l/l//l/////l///l/l///l//////l//ot88Fnm55555l555555555l55555o6nm55l5555555llllml55l55m555lllm5l55ll5ll55llm5lllm555l55l5m55555lot88Fnmllll5mll5ll55llll55ml55555llmlllll55555555ml55l555ml555555555m55l5ll55ot88Fnmlll5555555lll55lll5555lllll555555lll55lll555lllm55l5555mll55555ot88Fnm5555555555555555555l55555555l5o6rfA6nm5l55555555l555555555o6rrrfAfAfA6nml555555l5l55l55555l555l5l555l555555l55o6rrfAfA6nm55l55lm5lllot88Fnm55ll55555555555ot88Fnm55lllm5l5lo6nml5555l555o6rrfAfAt88Fnml//////l/l//l/////l///l/l///l//////l//ot88Fnm55555l555555555l55555o6nm55l5555555llllml55l55m555lllm5l55ll5ll55llm5lllm555l55l5m55555lot88Fnmllll5mll5ll55llll55ml55555llmlllll55555555ml55l555ml555555555m55l5ll55ot88Fnmlll5555555lll55lll5555lllll555555lll55lll555lllm55l5555mll55555ot88Fnm5555555555555555555l55555555l5o6rfA6nm5l55555555l555555555o6rrrfAfAfA6nml555555l5l55l55555l555l5l555l555555l55o6rrfAfA6nm55l55lm5lllot88Fnm55ll55555555555ot88Fnm55lllm5l5lo6nml5555l555o6rrfAfAt88Fnml//////l/l//l/////l///l/l///l//////l//ot88Fnm55555l555555555l55555o6nm55l5555555llllml55l55m555lllm5l55ll5ll55llm5lllm555l55l5m55555lot88Fnmllll5mll5ll55llll55ml55555llmlllll55555555ml55l555ml555555555m55l5ll55ot88Fnmlll5555555lll55lll5555lllll555555lll55lll555lllm55l5555mll55555ot88Fnm5555555555555555555l55555555l5o6rfA6nm5l55555555l555555555o6rrrfAfAfA6nml555555l5l55l55555l555l5l555l555555l55o6rrfAt88Fnmll55555l5555555mllllmllllo6nm5555llmllllo6nmll5555l555lo6rfAfAt88Fnml//////l/l//l/////l///l/l///l//////l//ot88Fnm55555l555555555l55555o6nm55l5555555llllml55l55m555lllm5l55ll5ll55llm5lllm555l55l5m55555lot88Fnmllll5mll5ll55llll55ml55555llmlllll55555555ml55l555ml555555555m55l5ll55ot88Fnmlll5555555lll55lll5555lllll555555lll55lll555lllm55l5555mll55555ot88Fnm5555555555555555555l55555555l5o6rfA6nm5l55555555l555555555o6rrrfAfAfA6nml555555l5l55l55555l555l5l555l555555l55o6rrfAfA6nm55l55lm5lllot88Fnm55ll55555555555ot88Fnm55lllm5l5lo6nml5555l555o6rrfAfAt88Fnml//////l/l//l/////l///l/l///l//////l//ot88Fnm55555l555555555l55555o6nm55l5555555llllml55l55m555lllm5l55ll5ll55llm5lllm555l55l5m55555lot88Fnmllll5mll5ll55llll55ml55555llmlllll55555555ml55l555ml555555555m55l5ll55ot88Fnmlll5555555lll55lll5555lllll555555lll55lll555lllm55l5555mll55555ot88Fnm5555555555555555555l55555555l5o6rfA6nm5l55555555l555555555o6rrrfAfAfA6nml555555l5l55l55555l555l5l555l555555l55o6rrfAfA6nm55l55lm5lllot88Fnm55ll55555555555ot88Fnm55lllm5l5lo6nml5555l555o6rrfAfAt88Fnml//////l/l//l/////l///l/l///l//////l//ot88Fnm55555l555555555l55555o6nm55l5555555llllml55l55m555lllm5l55ll5ll55llm5lllm555l55l5m55555lot88Fnmllll5mll5ll55llll55ml55555llmlllll55555555ml55l555ml555555555m55l5ll55ot88Fnmlll5555555lll55lll5555lllll555555lll55lll555lllm55l5555mll55555ot88Fnm5555555555555555555l55555555l5o6rfA6nm5l55555555l555555555o6rrrfAfAfA6nml555555l5l55l55555l555l5l555l555555l55o6rrfAfA6nm55l55lm5lllot88Fnm55ll55555555555ot88Fnm55lllm5l5lo6nml5555l555o6rrfAfAt88Fnml//////l/l//l/////l///l/l///l//////l//ot88Fnm55555l555555555l55555o6nm55l5555555llllml55l55m555lllm5l55ll5ll55llm5lllm555l55l5m55555lot88Fnmllll5mll5ll55llll55ml55555llmlllll55555555ml55l555ml555555555m55l5ll55ot88Fnmlll5555555lll55lll5555lllll555555lll55lll555lllm55l5555mll55555ot88Fnm5555555555555555555l55555555l5o6rfA6nm5l55555555l555555555orrr", "6nmlllllllon2on2on2o", "4t88888888FfnmlllCfAnml5l5l5l5orrbnm//llllo4t88FfnmlllCfAnml5l5l5l5orrbnml///lll//llo6nm////o6nm///o", "6nmllllo6nmllllo6nmllllo6KnmlllloK", "6nmllllo6nml/l/l/l/o6nml5l5l5l5o6nmllllllllllmllllo6nmllllllllllmllllo", "KnmlllloK6nm/lllllllllll/mlll//onmllllllllllllllonmlllllllllllonmlllllllllllllllllllllllllllllllllllllllllllllllllllllmllllllllmlllllllmllllllmlllllmlllmllllmlllmlllmllllmllllmllllmlllllmlllmllllmllllmllllllmllllmllllmllllmlllllllllmlllmllllmlllmllllllmllllmllllmllllllmllllllonm/lllllllllll/mlll//o", "yw9pEnm//m//m//m/m/mlm/m/P6nm/l/l/l/llo", "4t88FfnmlllCfAnml5l5l5l5orrbnmllllo", "6nm/l/l/l/lo6nm/l/l/l/lo6nm/l/l/l/lo", "6nm/////l/onm////onmll//ll//ll//ll//o", "6nm/l/l/l/lo6nm/l/l/l/lo", "fA6nm55l5l555555l5l5llllmllllllllllllm555555l55555l555555l55555lm5lllll555ml555llm5555555555m5555555555or", "6nm////o6nm////o6nml5l5l5l5onml5l5l5l5onml//l//onml//l//o", "6nml/l/llllll//ll/llllll/l/o", "yw9pEnm//ll///qP6nm////mllllonml////l////llm////o", "yw9pEnmllllllllllllllllllllllllqP", "fnnml/l/l/lC6nm////l////////m//m////mo6rfnnmlllC6nmllllllllllllmor", "yw9pEn2qP6nml////l////llm////o", "nm///////////////////6nm////////m////onm/////////////l/////onm////", "6nm//////////////////o", "yw9pEn2qP9nmlP9nmlP", "yw9pEnmlllllP6nmlllllllllo", "6nml5l5l5l5onm///////////l/o", "yw6nm///////////////q9opEnm//P9nm//P9nm//P", "6nm//////////l////////l/lmo", "6nm2l2l2l2lm2l2l2l2lm2l2l2l2lm2l2l2l2lm2l2l2l2lm2l2l2l2lm2l2l2l2lonm2l2l2l2lo", "yw9pEnm/l/l/l/lqP6n2o6nm/l/l/l/lot88Fnmlllo", "ywt88888F9pEnm/l/l/l/lqoPp9nmlPp9nmlPp9nmlPp9nmlP", "ywt88F9t88GEnm/l/l/l/lqoP", "D88Fnm////m////ot88Fnm////m////ot88Fnm////ml/llllo6nmll/lllo", "yw6nmlllmlllmlllmlllmlllmlllmlllmlllmlllmlllmlllo9pEnmlllllllllllllllllllllllqP"], ["?h(?mAl<9_u0r_0vtDYl0vt(o0vt4Jmu0r(?<9(?t-m(?mAl4JmmAl(omAlDYlt-m_<9_~", "[j[jSKqSKqSKq_ZIl~(K~<><><>(U>O>,<V>,uko>,<LCus<L>8<L>8&aoK/r<Li0rmroQOrsjpm8qsjpSKqsjpQlpMqozLp<KgvopZo4ko<K)&<K)&<K!1nUjo)5<U)5>P)5Q7r)5>Z!1n>Z)&>Z)&,*r4ko>ZgvoY0rzLpo5q<:o5qSKqo5qD!q:yrQOr>Yi0rs&rK/r>Y>8>Y>8>YCus!5r>,>O>,~<><><>=|.7sdprcvsdpr:ps=|eds.gqohr=Z:Ur=K:Uro9pohr<ledsI1o:psI1ocvs<l.7s=|.7s", ")M)M~<><><>(y)MIel)M_0em_(y_IelIel_(y_0em_)MIel)M(y)M0em0em)M(y)M(y(Gqil(G(Gqil(G(y(GTamqil)G(y)GTam)G)GTam)G(y)GqilTam(G(y(Gi5mq!lPWmq!l(:skl*kmqTl*kmqTlUhmURlUhmURlUSm(bORmq!l6,lq!l6,laDlC!laDlC!lh!l,qlh!lAqlOklKblKRlKblKRluXlgTluXlgTlUlliklQmlh!lGDlh!lGDlc,lHmlc,lAllcVmkXlcpmkXlcpmAbl9rmAbl9rm(fnVm9qlc,l$/lc,l$/li5mw,li5mw,ln,lORmn,lUSmnVmKhm,rmKhm,rm6kmmpm6kmmpm(:nVmEWmn,lZ5mn,lZ5mq!l", "[j[j[j[jfHFL6!@&-kkMz;__<><><>SAlmAl_)6)4)5_~____cAl__[j_[j[j_[jk:k__~-yHh$J@Wbni@Wbni@+P-p@Wbni@+P-p@Wbni@+P-p@Wbni@+P-p@+P-p@+P-p@+P-p@+P-p@+P-p@Wbni@+P-p@Wbni@+P-p@Wbni@+P-p@Wbni@Wbni@Wbni@Wbni@Wbni@Wbni[kSKq[k>{>|[jsLq[j)n[j~>{~SKq~)m)n_sLq_>|_[k)m[kSKq~<=<d<BSAlAIrWWoAIroppYGqQrqG9oQrq+pnQrqMomoppMomWWoMomEDn+pncBmG9ocBmYGqcBmAIr-CnAIrWWo~~<,<t<dSAlL.p6DoL.p<ercp6YpKyo6Yp0.n6YpKdn<eKdn6DoKdnaZn0.n64mKyo64mrcp64mL.paZnL.p6Do~", "Y67)G~<><><>?oNslS*tegl6Ou.0ltju(Y[ANslyau+!lHvuSLmYju(:?!2Cmm*t(:44tSLmNDu+!l?oNsl[A(qo.u(qo.u(Y[e(Y[e(q[w(q[wG;l[eG;l[e(:f.u(:f.u,:l[A,:l[A(q2HwOal2HwTylg7vTylg7vOal2HwOal2HwMFm2HwQdmg7vQdmg7vMFm2HwMFmwFl2alwFloWlYGl(O8HlmPl(HUMlYLlgJl4NlAHlOQlqElCTl,ClUWl2Bl(TmAl$cl_(Y_6jl_MnlcAlUqlsBlntl8ClawlqEl6yl!GlQ1lMJlI3l(J(qSPlG6lkSl46lUWl46lial46l0Zm46l(<G6lzhm(q*kmI3lMomQ1lArm6ylWtmawlsvmntlaxmUqlrym(d6zm6jlY0m(YY0m4clY0mcZl6zmUWlrymCTlaxmOQlsvm4NlWtmYLlArmgJlMom(G*km(Fzhm6FlCem6Fl(@6Fl2aluXl:ZmuXl()gYl0emEalZgmybl(?0dl$im(Y$im+il$im!klGimkmlZgmJol0em*ol()*ol:Zm*ol2al*ol(SJolAWlkmlcUl!kl(O+il8Rl(Y8Rl0dl8RlybluSlEalcUlgYlKWluXl(SuXl2aluXl:Zm(*6zm(*+Tl&;l,gl&;lCOl(**Alqjm*Alqjm6zm(*6zmS9m6zmS9m$imoTnGwlNVnItl)meqlcWnJolnWn8llwWn:ilwWnsflwWnIelwWnkclwWn!alwWnSZlSWn4Xl0VneWlNVnOVlQUnIUlLTnMTl)jaSlWQn,RlKOn,RlgLn,RleJnuSl6HnSUlXGn2VlkFn$XlkFn(UkFnAllw9mAllw9mAblw9maXl)N+Tl)OiQl)PQNl*$mcKll-m,Hl)UmFluAnuDl!DnKClIHnwAluKn:;kfOn:;kATn:;kEXn6AlganoClydnMElmgniGlzingJl1knUMl)ywPlUnngTlQonQXl5onKbl5onZfl5onWil5on!kluon$mlkon*olaon9ql,nn0sl)zsulAnnawlOmnTyldlnK0lWknX2l,inB5liIn(?uon(?uon6zmS9m6zmS9m6zms;nv1lAFov1lxIoG1lzKo2zl1MomylwNopvlwNo9qlwNosalwNoCYl+MoAWlbLocUl!Jo(O0Ho,RlAFo,Rl&Bo,Rls;n$SlS:n*Ul$,n(RQ,n+YlQ,n2alQ,n!klc0n!klc0nialc0n8WlE1ngTle2nOQl43n,Mlx5nIKlQ8n8Hlw+nmFlk#nuDl2*nUCl:.n*AlkBoSAlVFoSAlKKoSAlOOo~hRoGDlyUo:ElIXoAHl2Yo$Il8ZoSKl&ao2Ll0boGNlmcogOlYdoOQl!doGSl.eo!VlafoyblafoSjlafoqnlafo(gGfo(i.eo(koeowyl!doe0lEdoX2l:bo63lkaoK5lAZob6l:Wo+7leUoY9lSXoH/lUZo(w4aoO$lTcoy&lYdog-lAeo(1yeok;lGfoECmQfo$Emafo2HmafodLmafo+Pmafo$TmafoUXmGfo:Zm.eoycmyeo+emVeo(>Aeokimido:jm-coYlmccoommrbo$nmuaocpmiYousmuVoYvmJSokxm3OowzmKKo20mtEo20m4Bo20m6:nY0my-nczmq$ngym3/n,wmM9n6ums6n)Ag4n*pm82nommO1nMjmT0n;emT0nIamT0n:PmG,n:PmG,nWZmG,nKcm$,ngemc:nOgm#;n(?CCo$im2Eo$imgHo$imiJoGimGLoOgmqMogemdNoAcmdNo&YmdNoEHmdNoOCmgMo,:loKo(1iJon,lIIo:-l)[0-liEoq-lCCog-lP;ng-lP;nv1ls;nv1lYAp6zmYApKhm<RKhm<R(&<kEBl<yEBlv4o(&YAp(&YAp+2lMSp+2lMSp(&yap(&yapKhmMSpKhmMSpwzmYApwzmQNq*AlQNqyRl8zpyRl8zpYzlg1p0xli3pawlC6pUvls8pPulg/pwtlo$pwtlu:pwtlkDqevlVHq(mELq;2l,Mqd8l,Mqy&l,Mq:Zm,MqMem=T(?6KqOlmXJqhomeHqUrm:EqqtmpCq#vm0;puxmj,p+ymQ&pE0m:/pt0mi8pt0m.4pt0mr1pE0miyp+ymQvpuxm<)#vm,ppqtmmnpUrm<.homKkpOlmxip(?;hpMem;hp:Zm;hp0Um8zp0Um8zpWZm8zpVcmu0p0emc2pZgmA4p(?X6p$im!8p$imq/p$ims#pGimH&pigmq*p+emS-p()S-p0ZmS-pc,lS-p,&lh*p7#l,$pM!li#pf+lg/ps9l!8ps9lc7ps9lC6p!9lG5pf+lA4p,+lO3pk/lm2pM!l+1p+!lW1pw#lC1pj$lk0po&lG0pG*l,zpa*lUkpa*lUkp*AlQNq*Als.q*AlYzqa1lszqv1lK0qQ1lG1q80lW2q(n=zV0lK5qK0lC7qK0lK+qK0lI#q80l8&qg2lm,q*3lo:q85lCArS8l/Ari9lnBr8+l*BrC!lYCrS#l2CrA&l=&C-lUDrE.lpDr4;lyDrADm8DrSGm8DrWKm8DrMPm8DrQTm8DrsWmyDrMZmoDr2bmeDr(<=&xfm#CrohmYCrDjm*BrdkmcBrslm0Ar,mm$;qhoms.qQsmk*qPvmq!qaxmx8qczmY4qi0mYzqi0mYuqi0m=pczmQmqRxmgiqEvmYfqGsm&cqhom,bqHnmUbq3lm2aqdkmPaqMjm*ZqohmwZqxfmcZq(<IZq2bm:YqMZm/YqsWm/YqQTm/YqMPm/YqdLm/YqKIm:Yq(7IZqKDmSZq+AmnZqG;lwZqY.lEaq0-lsaqa*lAbq!$lpbqc#lGcq5/lszq*Als.q*Als.q*AlS8q(5S8q(3g7qA:ly5qc,l-3q4*l&1q,&lszq,&lWxq,&lUvq4*lmtqc,l5rqA:l,qq(3,qq(5,qq:Zm,qqycm5rq+emmtqigmUvqGimWxq$imszq$im&1q$im-3qGimy5qigmg7q+emS8qycmS8q:ZmS8q(55Tr6zmIzr8Rl>A8Rl>AKgl1PrKgl1PrEBlH-rEBlH-r(O8mrwzm5TrwzmrGs(ZrGsSel0Gsebl+Gs:Yl:GsyWlcHsmUlEIs4Sl2IsARlVJsmPlGKsCOl4KsyMl+LsOLl>p0JlQPs2GlOSsWEl0VsyClaZs6Al>1_>4_>7_DpswAlosseCl>&CEl$ysiGlY1sgJle2s*Klk3seMlW4s4NlI5sIPl65s2QlY6skSl>(SUlV7sUWle7s0Ylo7sKbly7s;dly7sbhly7sAlly7sSolo7s9qle7sctlK7syvli6srxl65sizl:4sa1l43s+2lp2sZ4l*0sG6l>-+7l60si9lp2sH/l43s(w:4sY$l-5sQ*li6sn,lA7sy:le7scBmo7svEmy7s!Hmy7s6Lmy7s(&y7sNUmy7seXme7s:ZmV7secmA7s0emt6sigmY6sbim65s+jmI5sOlmg4sfmm43s5nm>:Spm*0sQsmGys*umhusGxm6qsTzmimsY0m>4Y0m*bsY0mjXsTzm,TsGxmWQs*umsNsasm>oSpmvKs$nm8JsommVJsOlmtIs:jmOIsbim6HsigmcHsqemTHsecm:Gs:Zm0GspXm0GsWUm0Gs(&0Gs6Lm0Gs2Hm+GsvEm:GscBmTHsy:l-Hsn,liIsa*leJsj$lvKs(w+LsH/liNsi9l>r+7lsNsG6l+Lsi4lvKs+2leJsa1liIsizl-HsrxlcHsyvl:Gsctl+Gs9qlrGsmolrGsUllrGs(Z:pssal:ps(SMpsKWlenscUlxlsuSlvjs8RlYhs8RlCfs8RlAdsuSlSbscUllZsAWlyYs(SyYssalyYs/slyYsUvllZsWxlSbsEzlAds80lCfsv1lYhsv1lvjsv1lxls80lensEzlMpsgxl:psUvl:ps/sl:pssal:pswBm:psR;lMpsP.lensg-lxlsy&lvjs!$lYhs!$lCfs!$lAdsy&lSbsg-llZsE.lyYsR;lyYswBmyYsTamyYsycmlZs0emSbsigmAdsQimCfsDjmYhsDjmvjsDjmxlsQimensigmMps+em:psycm:psTam:pswBm?B6zm?Qa;l7XtG;lSXtk;lWWt&;lHVt(3!TtgAmSStrAmbQtrAm?IrAmVKt&;lrHtU:l#Et6,l/Ct$*laBtj$loAtc#l!;sC!lj;sy+lE;sY9lw:s17l>{o5lJ:sm3l+.s80l0.srxlq.sYulq.sUqlq.sfllq.sbhlq.s;dl0.sebl+.s+Yl:.soWl>{wUlm:s$Sl*:seRlj;sEQlAAt+OlyAtkNllBtAMl?BQIl&GtSFl8KtGDl2OtEBlFTt:;k?Q:;kEdt:;kchtEBlMltQDl,otcFlFstaIlkutAMlWvtaNl:vt0OlmwtEQlExteRlsxt$Sl!xtwUlAytoWlUyt0Yleytebloyt;dloytbhloytflloytOploytgsleytAvlUytgxlLyttzl!xta1lsxtS3lOxt!4l7wtb6l?i+7l:vtY9lWvt,+l7Xt6zm?B6zm?B6zmUPt(lUPt(nGQt02l+RtZ4lsTt(ruVt46l*Xt46lQat46lSct(rAetZ4l4ft02lrgt(nrgt(lrgt2alrgtCYl4ft!VlAetSUlSctuSlQat8Rl*Xt8RluVt8RlsTtuSl+RtSUlGQt!VlUPtCYlUPt2alUPt(l", ")M)M(K~<><><>(G(y(y(v_ZIl~~<><><>IVm(3(y(3u/l(3(tP.l(t(y(t2al(t,Wlu/l:Tl(y:TlP.l:Tl(3,Wl(32al(3(tIVm(t&Ym(t!bmu/l!bm(y!bmP.l&Ym(3IVm(3", "<A(e~<><C(l(9uIlBinuIlBinuIlBinuIlBin2flBin2flBin2fl(92fl(92fl(92fl(9uIl(9uIl(9uIllLnsalt!nIOl_~<><+)I~~<><><4BinuIlLsnuIlLsnuIlLsnuIlLsn2flLsn2flLsn2flBin2flBin2flBin2flBinuIlBinuIlBinuIlI5l#jl$Nlqik_~<><+)I~~<><><4OQluIl$NluIlKMlcKlKMlyMlKMlyblKMl;dl$Nl2flOQl2fl(92fl(9uIlOQluIl~<><Y(&LsnuIlQ8nuIlQ8nuIlQ8nuIlQ8n2flQ8n2flQ8n2flLsn2flLsn2flLsn2flLsnuIlLsnuIlLsnuIlY;nuIlS&nuIlS&n2flY;n2fluBo2flcDo;dlcDoyblcDoyMlcDocKluBouIlY;nuIlm6nYzl7!ntNl_~<><+)I~~<><><4Q8nuIlS&nuIlS&nuIlS&nuIlS&n2flS&n2flS&n2flQ8n2flQ8n2flQ8n2flQ8nuIlQ8nuIlQ8nuIl", "<A(eNAl0Co*FlAFo*Fl$Go8Hl$GoIKl$GoIel$GoeglAFoWil0CoWil8MlWilmKlWiluIlegluIlIeluIlIKluIl8HlmKl*Fl8Ml*Fl~", "|g?85Al__5AldXn)a~__~-#k1Kl~__~______KAl#.l!6i-.l-6i+JllaisPkpyiHgjz,iJ;i5vj*:iXwjr:iwwjD:isxjb.ioyjR.i#yj.,iVzjI&ig5js/iO!js/iJ!jLeim2kZxiLwlZxiRwlY6iDGmRCj(<nJj1pmETjd0m*SjU0m3ZjD8m;hjO&m!ij-&myjjt*m,jj#*mLkj)SVpjj;muuj)Ybvj2DnNwjVEn88jdMn$9j;Mn&+jxNn7AkQUnqNkyYn4vk5knuNlDgnzNlDgnfllKdnk6lCVnu6l.UngZmQFnS4msqmY4msqmY4mnqmJ+mvjmO&mjcmY&mVcmqLnOCm)k(j)kAvlkTnAvl+an(PaZn*!k:VnjBkW2mDhjmpmZPjLYm9BjFXmBBjJWmUAj4Jm$#iVJmp#i#ImQ#ioDm59i#.l!6i~___~__~C/k3Ml~__~__b1j5Moi-lL#i_~<3))(C~~<><>)VU+leKjU+leKjEalM$i,9k2/iGWkcDjg+j2OjGkj!ij4Qj6/juQjE!jkQjY!jQQjs!j,PjK#joPjy#jKPjQ$jAPja$jAPju$j2Oj$$jgMje,jUKjEAkSIj+DkSIj+Dkw+iYoks6iuDl8-iAql8-iAqlGBj:7l*Ij6BmYTjWPmwXjEWmmcjecmEijbim*hjQim:ljymmWqj!qmMvj*um0vjYvmIwj2vmwwjKwm6wjUwm*wjewmExjpwmC0j:ymK3jV1mS6jg3mw6j03mO7jI4ms7jc4my,jU/ma.j)O$.j,/mq:ja!miFkA*m4MkS.mOUky;mOokqGn89k)cELl)aELl)a:YlVEn,llMBnTylq,mcylq,mMAmw9mIVm6umHnmIamHnmIamHnmIamHnmIamjqmPWm0tmUSmywmQOm)DHOmk7ma;lE&mz5lw.mYplw.mOplw.mOplw.mOpl:Bn*Zl2DnIKl6Cnu&k4Anyfkw9m8BkYlm4zj(<4pjIVm+gj(/UZjWKm!Yj4JmYYjQJm*Xje:l4QjK:luQj#.laQjs.lQQj(z*Njm#lCMjU+leKjommHOliJjZll_~<><+)I~~<><>)[Nmj2!j4kjk$jejjc*joFjWhkSIjfIlKKjnpl8Zj9&lzkj;LmT2j6amX6jRemg+jPhm8Bk(|Xikl8m:;kV7mpDlG7mPHl86m&!lv2mvdmFMm4imcGmHnmvAmLnmnAmQnmbAmdlmpCmljmvEm6,lJvmGNlczmbJlwzm*Fl1zmTokA1mzHkpimX*j0ZmT!j2WmP8jVTmqqjkEm4fjS8lBQjDilOOj;AlpLjGbk7nj&+j*mj//jNmj2!j~<t)Y(TVvkmUmgwkvUmwxk/Um1xk&Um/xk:Umu+k68lpNl7#ltglQ6lnzl6ylj5l5ilL/lvTlN3lkIlH2lFHl#0lrFl63lROlxzl:Yl(iKpl2alfwl3HlE4l#4kEzl:rkhLmcik,ImtfkXQmVvkmUmsekA0lHhkXtl0XkPqlpMkPllcEkbhll:j+dl3,jlilDEkXolbSkAvl6Yk0xlsekA0lMhkA4kzbkf0k:XkRwkOZk#zkpbkT3kyfk-8kDnk!#kFzku:kH1kV&kMhkA4kdQlqrkMTl*sk2VlUuk2alChkolltkkYulopkI3l3uk*8lz0km#l&1k6Bmoakt:lXYkM*l8Vk57lNskI3l$qkbxlBlkmol8fk7fl#ak/UlRXk4NlVqkdQlqrkagl$$jOklX*jrolK,jRslZ8jwjlD6jagl$$jVIlpNl9IloMlRJliLl5JlIKl&Jl4Il(E:ElXAl8ClR*kRTlB:kMTlTBlkSl,ClBSlbElZRlJGloMlPHl,MlVIlpNlu:kHSk5*k.RkJ#kvSkq6k;Tk#4k6YkZ4kFakU4kVbk+6khdkD!kLgkx#kJekl*kIdku:kHSkZ2l;,lcClZoj_~<><+)I~~<><><4HhkXtlsekA0lpWka;lCck+AmlmkAvl7jkPulHhkXtlzCkJ#k..j&/kz9jjRl6/jHTlf$j/UlZBkP.kAGkf:k5NkwFlOZk2Llokk8Rlbwk!VlH6kJ,kH1kV&kFzku:kJtkvOlRhkrKl#VklEliKka:kzCkJ#k-LlGvk5Tl7ykYplZ9kgxl4:k0xlR;k:xlv;k9wlX-kEuli#kMnln3k2VlUukMTl*skdQlqrk4NlVqk-LlGvkKMl5&jXUl8tj,glJxjEjlXrj-Qlrmj4Ilj8jG5k,3jInkb+jeVkm*jPQkvIkzMk9RkgNk;YkNOkjfkuRk,kkBRkwik3QkVgkAQkJZkmTk-Pk6Yk3Bkkqkn-ji8kS/jKMl5&jagl$$jYelR:jvnlUBktzl3Gkq7liKkJ#l5Nkx$lmJkI8l;EkVwlm;jWslu.jrolK,jOklX*jagl$$jR*kRTls#kJal.:kFblqEl1ZlmKl(SoMl(OvOlVNlSKlCJlDKl$Il&Jl4Il5JlIKlRJliLl9IloMlVIlpNl7Gl*PlbElZRl,ClBSlTBlkSlB:kMTlR*kRTlU4kVbk-3kTek95k9gkY8kAkkO,k2okgEl+SkdBlRSku:kHSkl*kIdk#$klhkY#k4gkD!kLgk+6khdkU4kVbksml32i7WkXCn_~<><Y(&~~<><>)Vgmltyj,glJxjXUl8tjKMl5&ji8kS/jkqkn-j6Yk3BkmTk-PkAQkJZk3QkVgkBRkwikuRk,kk&Skjpk8Vkntk4Wk#uk:XkRwkzbkf0kMhkA4kH1kV&kH6kJ,kbwk!Vlokk8RlOZk2Ll5NkwFlAGkf:kZBkP.kf$j/UlA#j0YlI*jKbll:j+dlcEkbhlpMkPll0XkPqlHhkXtl7jkPullmkAvlCck+Am!ZkxGmcik,Im:rkhLm#4kEzl3HlE4l2alfwl(iKplxzl:Yl63lROl#0lrFl!zleCl:xlv;k0xlR;kgxl4:kYplZ9k5Tl7yk-LlGvk4NlVqk/UlRXk7fl#akmol8fkbxlBlkI3l$qk57lNskM*l8VkD,l3Qk#&lTPkJ#l5Nkq7liKktzl3GkvnlUBkYelR:jagl$$jwjlD6jgmltyjJ#kvSk5*k.Rku:kHSkdBlRSkgEl+SkO,k2okY8kAkk95k9gk-3kTekU4kVbkZ4kFak#4k6Ykq6k;TkJ#kvSks#kJalR*kRTlXAl8Cl(E:El&Jl4IlDKl$IlSKlCJlvOlVNloMl(OmKl(SqEl1Zl.:kFbls#kJalASj9*khInyFl_~<><+)I~~<><><4*VmJnjhamIrj0emRvjt/mdFkI.m;xko:mq6kF;m9&k)Xtvl3rmiQm#mm-WmUhmLdmNGm#6m0sl1.m9XlfFnDAlIHn;-khHnF$kxHn-QlZIn#ql)Wvsl,;miule;mfYmx4m)HxMmo6mNGme+mR;lE:m/3lJDnBmlkFn(W+GnJVljJnMElJIn!8kYHnjzkfFnBqkFEndjkICn0ck3*mWDk42mM5j8qm!nj*Zmpaj(/QQjmGmXNjwBm3KjHTle2i7ekJ;iGzjPPjUUj27jOTjf9jDSjD/jLVjT7jiYjt3jq&jXIj.5kmDj/-kvCjPHlSDjbsljFjhBmYYjDQmnijBTmzkj*VmJnj~___~__~__~<><B(1cBmxijE.l4fjn$lYdjP0lMWjoRl+Hju0kEOjNxksOjstkUPjN/jzaj3ejEAkpajPGkDXjpMkiYjYKk,ZjMIkh6j-ij2okhXjXsk0Wj9vkMWj3MlGQjZvleej39llljO$l-njw,l+qjDQme3jLdmM:jKwmfWkp2mJ3ko/mpcl:om(0wpmC-lYqm,&lkrmO$lusmM!ly*mnVlb7m,ukA1mSOk(?*/j5UmRvjcBmxij~___5Al__5AlR#r)a(B__~j$k1Kl~__~______KAl#.l!6i-.l-6i+JllaisPkpyiHgjz,iJ;i5vj*:iXwjr:iwwjD:isxjb.ioyjR.i#yj.,iVzjI&ig5js/iO!js/iJ!jLeim2kZxiLwlZxiRwlY6iDGmRCj(<nJj1pmETjd0m*SjU0m3ZjD8m;hjO&m!ij-&myjjt*m,jj#*mLkj)SVpjj;muuj)Ybvj2DnNwjVEn88jdMn$9j;Mn&+jxNn7AkQUnqNkyYn4vk5knuNlDgnzNlDgnfllKdnk6lCVnu6l.UngZmQFnS4msqmY4msqmY4mnqmJ+mvjmO&mjcmY&mVcmqLnOCm)k(j)kAvlkTnAvl+an(PaZn*!k:VnjBkW2mDhjmpmZPjLYm9BjFXmBBjJWmUAj4Jm$#iVJmp#i#ImQ#ioDm59i#.l!6i~___~__~#+ldLl~__~__~<><Y(&W5j;&iG4jX.iR&jKAjlHk3DjhdklMj;AlZKjXsk5$inKkR$i!FkH$i8,jX&iW5j;&i1olHqjIeljej!QltUjFpkBVjH*kEsj1olHqj#2kxwlY4kiKn_~<><C(l~~)^(@_d.le9lj.lR9lo.lF9lf;lT4lIBmizlvYl02lvTld$lyUlp$l2Vlx$l3Il3Lme$k5ZmKyk$nmWXkd0mn,j.!m#tj5,mSVjtCnD6j1HnK#jOInq:jOInLRkTInTjk.Enq1k*Bni,kZ*mpNl58mtbl)D8pl/kmy0l1VmR!l5Fmd.le9l6,krxlxJlqGn_~<><+)I~~<><><4!QltUjsQloUjiQleUj$Il7Oj;AlZKjhdklMjFpkBVj!QltUj!zl33jxulwwj1olHqjH*kEsj1.kyyj3Clv5j!zl33j~<><C(l!zl33j3Clv5j8MlaCk-QlQMkFVlMWkgYlInk#blG4kOalFClrYlJWlvYl02lIBmizl-MmlOl:Em3ukZDmlmkNBmnek(ygDk!zl33j~___LBl__~.+k3Ml~__~__b1j5Moi-lL#i_~<3))(C~~<><>)VU+leKjU+leKjEalM$i,9k2/iGWkcDjg+j2OjGkj!ij4Qj6/juQjE!jkQjY!jQQjs!j,PjK#joPjy#jKPjQ$jAPja$jAPju$j2Oj$$jgMje,jUKjEAkSIj+DkSIj+Dkw+iYoks6iuDl8-iAql8-iAqlGBj:7l*Ij6BmYTjWPmwXjEWmmcjecmEijbim*hjQim:ljymmWqj!qmMvj*um0vjYvmIwj2vmwwjKwm6wjUwm*wjewmExjpwmC0j:ymK3jV1mS6jg3mw6j03mO7jI4ms7jc4my,jU/ma.j)O$.j,/mq:ja!miFkA*m4MkS.mOUky;mOokqGn89k)cELl)aELl)a:YlVEn,llMBnTylq,mcylq,mMAmw9mIVm6umHnmIamHnmIamHnmIamHnmIamjqmPWm0tmUSmywmQOm)DHOmk7ma;lE&mz5lw.mYplw.mOplw.mOplw.mOpl:Bn*Zl2DnIKl6Cnu&k4Anyfkw9m8BkYlm4zj(<4pjIVm+gj(/UZjWKm!Yj4JmYYjQJm*Xje:l4QjK:luQj#.laQjs.lQQj(z*Njm#lCMjU+leKjommHOliJjZll_~<><+)I~~<><>)[Nmj2!j4kjk$jejjc*joFjWhkSIjfIlKKjnpl8Zj9&lzkj;LmT2j6amX6jRemg+jPhm8Bk(|Xikl8m:;kV7mpDlG7mPHl86m&!lv2mvdmFMm4imcGmHnmvAmLnmnAmQnmbAmdlmpCmljmvEm6,lJvmGNlczmbJlwzm*Fl1zmTokA1mzHkpimX*j0ZmT!j2WmP8jVTmqqjkEm4fjS8lBQjDilOOj;AlpLjGbk7nj&+j*mj//jNmj2!j~<t)Y(TVvkmUmgwkvUmwxk/Um1xk&Um/xk:Umu+k68lpNl7#ltglQ6lnzl6ylj5l5ilL/lvTlN3lkIlH2lFHl#0lrFl63lROlxzl:Yl(iKpl2alfwl3HlE4l#4kEzl:rkhLmcik,ImtfkXQmVvkmUmsekA0lHhkXtl0XkPqlpMkPllcEkbhll:j+dl3,jlilDEkXolbSkAvl6Yk0xlsekA0lMhkA4kzbkf0k:XkRwkOZk#zkpbkT3kyfk-8kDnk!#kFzku:kH1kV&kMhkA4kdQlqrkMTl*sk2VlUuk2alChkolltkkYulopkI3l3uk*8lz0km#l&1k6Bmoakt:lXYkM*l8Vk57lNskI3l$qkbxlBlkmol8fk7fl#ak/UlRXk4NlVqkdQlqrkagl$$jOklX*jrolK,jRslZ8jwjlD6jagl$$jVIlpNl9IloMlRJliLl5JlIKl&Jl4Il(E:ElXAl8ClR*kRTlB:kMTlTBlkSl,ClBSlbElZRlJGloMlPHl,MlVIlpNlu:kHSk5*k.RkJ#kvSkq6k;Tk#4k6YkZ4kFakU4kVbk+6khdkD!kLgkx#kJekl*kIdku:kHSkZ2l;,lcClZoj_~<><+)I~~<><><4HhkXtlsekA0lpWka;lCck+AmlmkAvl7jkPulHhkXtlzCkJ#k..j&/kz9jjRl6/jHTlf$j/UlZBkP.kAGkf:k5NkwFlOZk2Llokk8Rlbwk!VlH6kJ,kH1kV&kFzku:kJtkvOlRhkrKl#VklEliKka:kzCkJ#k-LlGvk5Tl7ykYplZ9kgxl4:k0xlR;k:xlv;k9wlX-kEuli#kMnln3k2VlUukMTl*skdQlqrk4NlVqk-LlGvkKMl5&jXUl8tj,glJxjEjlXrj-Qlrmj4Ilj8jG5k,3jInkb+jeVkm*jPQkvIkzMk9RkgNk;YkNOkjfkuRk,kkBRkwik3QkVgkAQkJZkmTk-Pk6Yk3Bkkqkn-ji8kS/jKMl5&jagl$$jYelR:jvnlUBktzl3Gkq7liKkJ#l5Nkx$lmJkI8l;EkVwlm;jWslu.jrolK,jOklX*jagl$$jR*kRTls#kJal.:kFblqEl1ZlmKl(SoMl(OvOlVNlSKlCJlDKl$Il&Jl4Il5JlIKlRJliLl9IloMlVIlpNl7Gl*PlbElZRl,ClBSlTBlkSlB:kMTlR*kRTlU4kVbk-3kTek95k9gkY8kAkkO,k2okgEl+SkdBlRSku:kHSkl*kIdk#$klhkY#k4gkD!kLgk+6khdkU4kVbksml32i7WkXCn_~<><Y(&~~<><>)Vgmltyj,glJxjXUl8tjKMl5&ji8kS/jkqkn-j6Yk3BkmTk-PkAQkJZk3QkVgkBRkwikuRk,kk&Skjpk8Vkntk4Wk#uk:XkRwkzbkf0kMhkA4kH1kV&kH6kJ,kbwk!Vlokk8RlOZk2Ll5NkwFlAGkf:kZBkP.kf$j/UlA#j0YlI*jKbll:j+dlcEkbhlpMkPll0XkPqlHhkXtl7jkPullmkAvlCck+Am!ZkxGmcik,Im:rkhLm#4kEzl3HlE4l2alfwl(iKplxzl:Yl63lROl#0lrFl!zleCl:xlv;k0xlR;kgxl4:kYplZ9k5Tl7yk-LlGvk4NlVqk/UlRXk7fl#akmol8fkbxlBlkI3l$qk57lNskM*l8VkD,l3Qk#&lTPkJ#l5Nkq7liKktzl3GkvnlUBkYelR:jagl$$jwjlD6jgmltyjJ#kvSk5*k.Rku:kHSkdBlRSkgEl+SkO,k2okY8kAkk95k9gk-3kTekU4kVbkZ4kFak#4k6Ykq6k;TkJ#kvSks#kJalR*kRTlXAl8Cl(E:El&Jl4IlDKl$IlSKlCJlvOlVNloMl(OmKl(SqEl1Zl.:kFbls#kJalASj9*khInyFl_~<><+)I~~<><><4*VmJnjhamIrj0emRvjt/mdFkI.m;xko:mq6kF;m9&k)Xtvl3rmiQm#mm-WmUhmLdmNGm#6m0sl1.m9XlfFnDAlIHn;-khHnF$kxHn-QlZIn#ql)Wvsl,;miule;mfYmx4m)HxMmo6mNGme+mR;lE:m/3lJDnBmlkFn(W+GnJVljJnMElJIn!8kYHnjzkfFnBqkFEndjkICn0ck3*mWDk42mM5j8qm!nj*Zmpaj(/QQjmGmXNjwBm3KjHTle2i7ekJ;iGzjPPjUUj27jOTjf9jDSjD/jLVjT7jiYjt3jq&jXIj.5kmDj/-kvCjPHlSDjbsljFjhBmYYjDQmnijBTmzkj*VmJnj~___~__~__~<><B(1cBmxijE.l4fjn$lYdjP0lMWjoRl+Hju0kEOjNxksOjstkUPjN/jzaj3ejEAkpajPGkDXjpMkiYjYKk,ZjMIkh6j-ij2okhXjXsk0Wj9vkMWj3MlGQjZvleej39llljO$l-njw,l+qjDQme3jLdmM:jKwmfWkp2mJ3ko/mpcl:om(0wpmC-lYqm,&lkrmO$lusmM!ly*mnVlb7m,ukA1mSOk(?*/j5UmRvjcBmxij~___5Al__5AlFhw)aLBl__~.&k1Kl~__~______KAl#.l!6i-.l-6i+JllaisPkpyiHgjz,iJ;i5vj*:iXwjr:iwwjD:isxjb.ioyjR.i#yj.,iVzjI&ig5js/iO!js/iJ!jLeim2kZxiLwlZxiRwlY6iDGmRCj(<nJj1pmETjd0m*SjU0m3ZjD8m;hjO&m!ij-&myjjt*m,jj#*mLkj)SVpjj;muuj)Ybvj2DnNwjVEn88jdMn$9j;Mn&+jxNn7AkQUnqNkyYn4vk5knuNlDgnzNlDgnfllKdnk6lCVnu6l.UngZmQFnS4msqmY4msqmY4mnqmJ+mvjmO&mjcmY&mVcmqLnOCm)k(j)kAvlkTnAvl+an(PaZn*!k:VnjBkW2mDhjmpmZPjLYm9BjFXmBBjJWmUAj4Jm$#iVJmp#i#ImQ#ioDm59i#.l!6i~___MBl__~d8ldLl~__~__~<><Y(&W5j;&iG4jX.iR&jKAjlHk3DjhdklMj;AlZKjXsk5$inKkR$i!FkH$i8,jX&iW5j;&i1olHqjIeljej!QltUjFpkBVjH*kEsj1olHqj#2kxwlY4kiKn_~<><C(l~~)^(@_d.le9lj.lR9lo.lF9lf;lT4lIBmizlvYl02lvTld$lyUlp$l2Vlx$l3Il3Lme$k5ZmKyk$nmWXkd0mn,j.!m#tj5,mSVjtCnD6j1HnK#jOInq:jOInLRkTInTjk.Enq1k*Bni,kZ*mpNl58mtbl)D8pl/kmy0l1VmR!l5Fmd.le9l6,krxlxJlqGn_~<><+)I~~<><><4!QltUjsQloUjiQleUj$Il7Oj;AlZKjhdklMjFpkBVj!QltUj!zl33jxulwwj1olHqjH*kEsj1.kyyj3Clv5j!zl33j~<><C(l!zl33j3Clv5j8MlaCk-QlQMkFVlMWkgYlInk#blG4kOalFClrYlJWlvYl02lIBmizl-MmlOl:Em3ukZDmlmkNBmnek(ygDk!zl33j~___EBl__~.+k3Ml~__~__b1j5Moi-lL#i_~<3))(C~~<><>)VU+leKjU+leKjEalM$i,9k2/iGWkcDjg+j2OjGkj!ij4Qj6/juQjE!jkQjY!jQQjs!j,PjK#joPjy#jKPjQ$jAPja$jAPju$j2Oj$$jgMje,jUKjEAkSIj+DkSIj+Dkw+iYoks6iuDl8-iAql8-iAqlGBj:7l*Ij6BmYTjWPmwXjEWmmcjecmEijbim*hjQim:ljymmWqj!qmMvj*um0vjYvmIwj2vmwwjKwm6wjUwm*wjewmExjpwmC0j:ymK3jV1mS6jg3mw6j03mO7jI4ms7jc4my,jU/ma.j)O$.j,/mq:ja!miFkA*m4MkS.mOUky;mOokqGn89k)cELl)aELl)a:YlVEn,llMBnTylq,mcylq,mMAmw9mIVm6umHnmIamHnmIamHnmIamHnmIamjqmPWm0tmUSmywmQOm)DHOmk7ma;lE&mz5lw.mYplw.mOplw.mOplw.mOpl:Bn*Zl2DnIKl6Cnu&k4Anyfkw9m8BkYlm4zj(<4pjIVm+gj(/UZjWKm!Yj4JmYYjQJm*Xje:l4QjK:luQj#.laQjs.lQQj(z*Njm#lCMjU+leKjommHOliJjZll_~<><+)I~~<><>)[Nmj2!j4kjk$jejjc*joFjWhkSIjfIlKKjnpl8Zj9&lzkj;LmT2j6amX6jRemg+jPhm8Bk(|Xikl8m:;kV7mpDlG7mPHl86m&!lv2mvdmFMm4imcGmHnmvAmLnmnAmQnmbAmdlmpCmljmvEm6,lJvmGNlczmbJlwzm*Fl1zmTokA1mzHkpimX*j0ZmT!j2WmP8jVTmqqjkEm4fjS8lBQjDilOOj;AlpLjGbk7nj&+j*mj//jNmj2!j~<t)Y(TVvkmUmgwkvUmwxk/Um1xk&Um/xk:Umu+k68lpNl7#ltglQ6lnzl6ylj5l5ilL/lvTlN3lkIlH2lFHl#0lrFl63lROlxzl:Yl(iKpl2alfwl3HlE4l#4kEzl:rkhLmcik,ImtfkXQmVvkmUmsekA0lHhkXtl0XkPqlpMkPllcEkbhll:j+dl3,jlilDEkXolbSkAvl6Yk0xlsekA0lMhkA4kzbkf0k:XkRwkOZk#zkpbkT3kyfk-8kDnk!#kFzku:kH1kV&kMhkA4kdQlqrkMTl*sk2VlUuk2alChkolltkkYulopkI3l3uk*8lz0km#l&1k6Bmoakt:lXYkM*l8Vk57lNskI3l$qkbxlBlkmol8fk7fl#ak/UlRXk4NlVqkdQlqrkagl$$jOklX*jrolK,jRslZ8jwjlD6jagl$$jVIlpNl9IloMlRJliLl5JlIKl&Jl4Il(E:ElXAl8ClR*kRTlB:kMTlTBlkSl,ClBSlbElZRlJGloMlPHl,MlVIlpNlu:kHSk5*k.RkJ#kvSkq6k;Tk#4k6YkZ4kFakU4kVbk+6khdkD!kLgkx#kJekl*kIdku:kHSkZ2l;,lcClZoj_~<><+)I~~<><><4HhkXtlsekA0lpWka;lCck+AmlmkAvl7jkPulHhkXtlzCkJ#k..j&/kz9jjRl6/jHTlf$j/UlZBkP.kAGkf:k5NkwFlOZk2Llokk8Rlbwk!VlH6kJ,kH1kV&kFzku:kJtkvOlRhkrKl#VklEliKka:kzCkJ#k-LlGvk5Tl7ykYplZ9kgxl4:k0xlR;k:xlv;k9wlX-kEuli#kMnln3k2VlUukMTl*skdQlqrk4NlVqk-LlGvkKMl5&jXUl8tj,glJxjEjlXrj-Qlrmj4Ilj8jG5k,3jInkb+jeVkm*jPQkvIkzMk9RkgNk;YkNOkjfkuRk,kkBRkwik3QkVgkAQkJZkmTk-Pk6Yk3Bkkqkn-ji8kS/jKMl5&jagl$$jYelR:jvnlUBktzl3Gkq7liKkJ#l5Nkx$lmJkI8l;EkVwlm;jWslu.jrolK,jOklX*jagl$$jR*kRTls#kJal.:kFblqEl1ZlmKl(SoMl(OvOlVNlSKlCJlDKl$Il&Jl4Il5JlIKlRJliLl9IloMlVIlpNl7Gl*PlbElZRl,ClBSlTBlkSlB:kMTlR*kRTlU4kVbk-3kTek95k9gkY8kAkkO,k2okgEl+SkdBlRSku:kHSkl*kIdk#$klhkY#k4gkD!kLgk+6khdkU4kVbksml32i7WkXCn_~<><Y(&~~<><>)Vgmltyj,glJxjXUl8tjKMl5&ji8kS/jkqkn-j6Yk3BkmTk-PkAQkJZk3QkVgkBRkwikuRk,kk&Skjpk8Vkntk4Wk#uk:XkRwkzbkf0kMhkA4kH1kV&kH6kJ,kbwk!Vlokk8RlOZk2Ll5NkwFlAGkf:kZBkP.kf$j/UlA#j0YlI*jKbll:j+dlcEkbhlpMkPll0XkPqlHhkXtl7jkPullmkAvlCck+Am!ZkxGmcik,Im:rkhLm#4kEzl3HlE4l2alfwl(iKplxzl:Yl63lROl#0lrFl!zleCl:xlv;k0xlR;kgxl4:kYplZ9k5Tl7yk-LlGvk4NlVqk/UlRXk7fl#akmol8fkbxlBlkI3l$qk57lNskM*l8VkD,l3Qk#&lTPkJ#l5Nkq7liKktzl3GkvnlUBkYelR:jagl$$jwjlD6jgmltyjJ#kvSk5*k.Rku:kHSkdBlRSkgEl+SkO,k2okY8kAkk95k9gk-3kTekU4kVbkZ4kFak#4k6Ykq6k;TkJ#kvSks#kJalR*kRTlXAl8Cl(E:El&Jl4IlDKl$IlSKlCJlvOlVNloMl(OmKl(SqEl1Zl.:kFbls#kJalASj9*khInyFl_~<><+)I~~<><><4*VmJnjhamIrj0emRvjt/mdFkI.m;xko:mq6kF;m9&k)Xtvl3rmiQm#mm-WmUhmLdmNGm#6m0sl1.m9XlfFnDAlIHn;-khHnF$kxHn-QlZIn#ql)Wvsl,;miule;mfYmx4m)HxMmo6mNGme+mR;lE:m/3lJDnBmlkFn(W+GnJVljJnMElJIn!8kYHnjzkfFnBqkFEndjkICn0ck3*mWDk42mM5j8qm!nj*Zmpaj(/QQjmGmXNjwBm3KjHTle2i7ekJ;iGzjPPjUUj27jOTjf9jDSjD/jLVjT7jiYjt3jq&jXIj.5kmDj/-kvCjPHlSDjbsljFjhBmYYjDQmnijBTmzkj*VmJnj~___~__~__~<><B(1cBmxijE.l4fjn$lYdjP0lMWjoRl+Hju0kEOjNxksOjstkUPjN/jzaj3ejEAkpajPGkDXjpMkiYjYKk,ZjMIkh6j-ij2okhXjXsk0Wj9vkMWj3MlGQjZvleej39llljO$l-njw,l+qjDQme3jLdmM:jKwmfWkp2mJ3ko/mpcl:om(0wpmC-lYqm,&lkrmO$lusmM!ly*mnVlb7m,ukA1mSOk(?*/j5UmRvjcBmxij~___5Al__5Al&A1)a#Al__~F.k(I~__~______KAl#.l!6i-.l-6i+JllaisPkpyiHgjz,iJ;i5vj*:iXwjr:iwwjD:isxjb.ioyjR.i#yj.,iVzjI&ig5js/iO!js/iJ!jLeim2kZxiLwlZxiRwlY6iDGmRCj(<nJj1pmETjd0m*SjU0m3ZjD8m;hjO&m!ij-&myjjt*m,jj#*mLkj)SVpjj;muuj)Ybvj2DnNwjVEn88jdMn$9j;Mn&+jxNn7AkQUnqNkyYn4vk5knuNlDgnzNlDgnfllKdnk6lCVnu6l.UngZmQFnS4msqmY4msqmY4mnqmJ+mvjmO&mjcmY&mVcmqLnOCm)k(j)kAvlkTnAvl+an(PaZn*!k:VnjBkW2mDhjmpmZPjLYm9BjFXmBBjJWmUAj4Jm$#iVJmp#i#ImQ#ioDm59i#.l!6i~___0Al__~C2l#Ml~__~__~<><Y(&W5j;&iG4jX.iR&jKAjlHk3DjhdklMj;AlZKjXsk5$inKkR$i!FkH$i8,jX&iW5j;&i1olHqjIeljej!QltUjFpkBVjH*kEsj1olHqj#2kxwlY4kiKn_~<><C(l~~)^(@_d.le9lj.lR9lo.lF9lf;lT4lIBmizlvYl02lvTld$lyUlp$l2Vlx$l3Il3Lme$k5ZmKyk$nmWXkd0mn,j.!m#tj5,mSVjtCnD6j1HnK#jOInq:jOInLRkTInTjk.Enq1k*Bni,kZ*mpNl58mtbl)D8pl/kmy0l1VmR!l5Fmd.le9l6,krxlxJlqGn_~<><+)I~~<><><4!QltUjsQloUjiQleUj$Il7Oj;AlZKjhdklMjFpkBVj!QltUj!zl33jxulwwj1olHqjH*kEsj1.kyyj3Clv5j!zl33j~<><C(l!zl33j3Clv5j8MlaCk-QlQMkFVlMWkgYlInk#blG4kOalFClrYlJWlvYl02lIBmizl-MmlOl:Em3ukZDmlmkNBmnek(ygDk!zl33j~___yAl__~$+k3Ml~__~__b1j5Moi-lL#i_~<3))(C~~<><>)VU+leKjU+leKjEalM$i,9k2/iGWkcDjg+j2OjGkj!ij4Qj6/juQjE!jkQjY!jQQjs!j,PjK#joPjy#jKPjQ$jAPja$jAPju$j2Oj$$jgMje,jUKjEAkSIj+DkSIj+Dkw+iYoks6iuDl8-iAql8-iAqlGBj:7l*Ij6BmYTjWPmwXjEWmmcjecmEijbim*hjQim:ljymmWqj!qmMvj*um0vjYvmIwj2vmwwjKwm6wjUwm*wjewmExjpwmC0j:ymK3jV1mS6jg3mw6j03mO7jI4ms7jc4my,jU/ma.j)O$.j,/mq:ja!miFkA*m4MkS.mOUky;mOokqGn89k)cELl)aELl)a:YlVEn,llMBnTylq,mcylq,mMAmw9mIVm6umHnmIamHnmIamHnmIamHnmIamjqmPWm0tmUSmywmQOm)DHOmk7ma;lE&mz5lw.mYplw.mOplw.mOplw.mOpl:Bn*Zl2DnIKl6Cnu&k4Anyfkw9m8BkYlm4zj(<4pjIVm+gj(/UZjWKm!Yj4JmYYjQJm*Xje:l4QjK:luQj#.laQjs.lQQj(z*Njm#lCMjU+leKjommHOliJjZll_~<><+)I~~<><>)[Nmj2!j4kjk$jejjc*joFjWhkSIjfIlKKjnpl8Zj9&lzkj;LmT2j6amX6jRemg+jPhm8Bk(|Xikl8m:;kV7mpDlG7mPHl86m&!lv2mvdmFMm4imcGmHnmvAmLnmnAmQnmbAmdlmpCmljmvEm6,lJvmGNlczmbJlwzm*Fl1zmTokA1mzHkpimX*j0ZmT!j2WmP8jVTmqqjkEm4fjS8lBQjDilOOj;AlpLjGbk7nj&+j*mj//jNmj2!j~<t)Y(TVvkmUmgwkvUmwxk/Um1xk&Um/xk:Umu+k68lpNl7#ltglQ6lnzl6ylj5l5ilL/lvTlN3lkIlH2lFHl#0lrFl63lROlxzl:Yl(iKpl2alfwl3HlE4l#4kEzl:rkhLmcik,ImtfkXQmVvkmUmsekA0lHhkXtl0XkPqlpMkPllcEkbhll:j+dl3,jlilDEkXolbSkAvl6Yk0xlsekA0lMhkA4kzbkf0k:XkRwkOZk#zkpbkT3kyfk-8kDnk!#kFzku:kH1kV&kMhkA4kdQlqrkMTl*sk2VlUuk2alChkolltkkYulopkI3l3uk*8lz0km#l&1k6Bmoakt:lXYkM*l8Vk57lNskI3l$qkbxlBlkmol8fk7fl#ak/UlRXk4NlVqkdQlqrkagl$$jOklX*jrolK,jRslZ8jwjlD6jagl$$jVIlpNl9IloMlRJliLl5JlIKl&Jl4Il(E:ElXAl8ClR*kRTlB:kMTlTBlkSl,ClBSlbElZRlJGloMlPHl,MlVIlpNlu:kHSk5*k.RkJ#kvSkq6k;Tk#4k6YkZ4kFakU4kVbk+6khdkD!kLgkx#kJekl*kIdku:kHSkZ2l;,lcClZoj_~<><+)I~~<><><4HhkXtlsekA0lpWka;lCck+AmlmkAvl7jkPulHhkXtlzCkJ#k..j&/kz9jjRl6/jHTlf$j/UlZBkP.kAGkf:k5NkwFlOZk2Llokk8Rlbwk!VlH6kJ,kH1kV&kFzku:kJtkvOlRhkrKl#VklEliKka:kzCkJ#k-LlGvk5Tl7ykYplZ9kgxl4:k0xlR;k:xlv;k9wlX-kEuli#kMnln3k2VlUukMTl*skdQlqrk4NlVqk-LlGvkKMl5&jXUl8tj,glJxjEjlXrj-Qlrmj4Ilj8jG5k,3jInkb+jeVkm*jPQkvIkzMk9RkgNk;YkNOkjfkuRk,kkBRkwik3QkVgkAQkJZkmTk-Pk6Yk3Bkkqkn-ji8kS/jKMl5&jagl$$jYelR:jvnlUBktzl3Gkq7liKkJ#l5Nkx$lmJkI8l;EkVwlm;jWslu.jrolK,jOklX*jagl$$jR*kRTls#kJal.:kFblqEl1ZlmKl(SoMl(OvOlVNlSKlCJlDKl$Il&Jl4Il5JlIKlRJliLl9IloMlVIlpNl7Gl*PlbElZRl,ClBSlTBlkSlB:kMTlR*kRTlU4kVbk-3kTek95k9gkY8kAkkO,k2okgEl+SkdBlRSku:kHSkl*kIdk#$klhkY#k4gkD!kLgk+6khdkU4kVbksml32i7WkXCn_~<><Y(&~~<><>)Vgmltyj,glJxjXUl8tjKMl5&ji8kS/jkqkn-j6Yk3BkmTk-PkAQkJZk3QkVgkBRkwikuRk,kk&Skjpk8Vkntk4Wk#uk:XkRwkzbkf0kMhkA4kH1kV&kH6kJ,kbwk!Vlokk8RlOZk2Ll5NkwFlAGkf:kZBkP.kf$j/UlA#j0YlI*jKbll:j+dlcEkbhlpMkPll0XkPqlHhkXtl7jkPullmkAvlCck+Am!ZkxGmcik,Im:rkhLm#4kEzl3HlE4l2alfwl(iKplxzl:Yl63lROl#0lrFl!zleCl:xlv;k0xlR;kgxl4:kYplZ9k5Tl7yk-LlGvk4NlVqk/UlRXk7fl#akmol8fkbxlBlkI3l$qk57lNskM*l8VkD,l3Qk#&lTPkJ#l5Nkq7liKktzl3GkvnlUBkYelR:jagl$$jwjlD6jgmltyjJ#kvSk5*k.Rku:kHSkdBlRSkgEl+SkO,k2okY8kAkk95k9gk-3kTekU4kVbkZ4kFak#4k6Ykq6k;TkJ#kvSks#kJalR*kRTlXAl8Cl(E:El&Jl4IlDKl$IlSKlCJlvOlVNloMl(OmKl(SqEl1Zl.:kFbls#kJalASj9*khInyFl_~<><+)I~~<><><4*VmJnjhamIrj0emRvjt/mdFkI.m;xko:mq6kF;m9&k)Xtvl3rmiQm#mm-WmUhmLdmNGm#6m0sl1.m9XlfFnDAlIHn;-khHnF$kxHn-QlZIn#ql)Wvsl,;miule;mfYmx4m)HxMmo6mNGme+mR;lE:m/3lJDnBmlkFn(W+GnJVljJnMElJIn!8kYHnjzkfFnBqkFEndjkICn0ck3*mWDk42mM5j8qm!nj*Zmpaj(/QQjmGmXNjwBm3KjHTle2i7ekJ;iGzjPPjUUj27jOTjf9jDSjD/jLVjT7jiYjt3jq&jXIj.5kmDj/-kvCjPHlSDjbsljFjhBmYYjDQmnijBTmzkj*VmJnj~___~__~__~<><B(1cBmxijE.l4fjn$lYdjP0lMWjoRl+Hju0kEOjNxksOjstkUPjN/jzaj3ejEAkpajPGkDXjpMkiYjYKk,ZjMIkh6j-ij2okhXjXsk0Wj9vkMWj3MlGQjZvleej39llljO$l-njw,l+qjDQme3jLdmM:jKwmfWkp2mJ3ko/mpcl:om(0wpmC-lYqm,&lkrmO$lusmM!ly*mnVlb7m,ukA1mSOk(?*/j5UmRvjcBmxij~___5Al__5AldXn>MYAl__~NAl1Kl~__~______KAl#.l!6i-.l-6i+JllaisPkpyiHgjz,iJ;i5vj*:iXwjr:iwwjD:isxjb.ioyjR.i#yj.,iVzjI&ig5js/iO!js/iJ!jLeim2kZxiLwlZxiRwlY6iDGmRCj(<nJj1pmETjd0m*SjU0m3ZjD8m;hjO&m!ij-&myjjt*m,jj#*mLkj)SVpjj;muuj)Ybvj2DnNwjVEn88jdMn$9j;Mn&+jxNn7AkQUnqNkyYn4vk5knuNlDgnzNlDgnfllKdnk6lCVnu6l.UngZmQFnS4msqmY4msqmY4mnqmJ+mvjmO&mjcmY&mVcmqLnOCm)k(j)kAvlkTnAvl+an(PaZn*!k:VnjBkW2mDhjmpmZPjLYm9BjFXmBBjJWmUAj4Jm$#iVJmp#i#ImQ#ioDm59i#.l!6i~___~__~__$Plt+lnSltTn_~<><+)I~~<><><4jglf*l9Dl(zXAl$JmFClpJmpDlQJm5*kFlmh-kzxmE,ke+mv*k)VQ&k#Jn-#k6Mnr!kuPn5/k)lk:kVUngJlVUn(K)j(NuPn+TlJInUWluAnIZlk!m,bla2mRdlqommel1amnfl7Qmjgl6GmjglgFmeglBEmjglf*lpXlwhjOVlbWjC*kJYjD-knijpXlwhjzcl+&j(Ux2jq;kL4j_x-jzcl+&j~<><Y(&OVlbWjtRlJEjHElAFjm!k8Fj0/koFj$+kUFjz+kUFjd8kxEjH/kRMjC*kJYjOVlbWj(Ux2jpXlwhjD-knijq;kL4j(Ux2j~<><C(lzcl+&j_x-j&;kAQk:;koVkNAlOZkmAlXikTBlqwk-Bl4+kACl5JlFCl6el9Dl(zjglf*lcilobl3gl67keglozk-flqrkJfl:ck+dlAQkzcl+&j~___0;k__~u+k3Ml~__~__b1j5Moi-lL#i_~<3))(C~~<><>)VU+leKjU+leKjEalM$i,9k2/iGWkcDjg+j2OjGkj!ij4Qj6/juQjE!jkQjY!jQQjs!j,PjK#joPjy#jKPjQ$jAPja$jAPju$j2Oj$$jgMje,jUKjEAkSIj+DkSIj+Dkw+iYoks6iuDl8-iAql8-iAqlGBj:7l*Ij6BmYTjWPmwXjEWmmcjecmEijbim*hjQim:ljymmWqj!qmMvj*um0vjYvmIwj2vmwwjKwm6wjUwm*wjewmExjpwmC0j:ymK3jV1mS6jg3mw6j03mO7jI4ms7jc4my,jU/ma.j)O$.j,/mq:ja!miFkA*m4MkS.mOUky;mOokqGn89k)cELl)aELl)a:YlVEn,llMBnTylq,mcylq,mMAmw9mIVm6umHnmIamHnmIamHnmIamHnmIamjqmPWm0tmUSmywmQOm)DHOmk7ma;lE&mz5lw.mYplw.mOplw.mOplw.mOpl:Bn*Zl2DnIKl6Cnu&k4Anyfkw9m8BkYlm4zj(<4pjIVm+gj(/UZjWKm!Yj4JmYYjQJm*Xje:l4QjK:luQj#.laQjs.lQQj(z*Njm#lCMjU+leKjommHOliJjZll_~<><+)I~~<><>)[Nmj2!j4kjk$jejjc*joFjWhkSIjfIlKKjnpl8Zj9&lzkj;LmT2j6amX6jRemg+jPhm8Bk(|Xikl8m:;kV7mpDlG7mPHl86m&!lv2mvdmFMm4imcGmHnmvAmLnmnAmQnmbAmdlmpCmljmvEm6,lJvmGNlczmbJlwzm*Fl1zmTokA1mzHkpimX*j0ZmT!j2WmP8jVTmqqjkEm4fjS8lBQjDilOOj;AlpLjGbk7nj&+j*mj//jNmj2!j~<t)Y(TVvkmUmgwkvUmwxk/Um1xk&Um/xk:Umu+k68lpNl7#ltglQ6lnzl6ylj5l5ilL/lvTlN3lkIlH2lFHl#0lrFl63lROlxzl:Yl(iKpl2alfwl3HlE4l#4kEzl:rkhLmcik,ImtfkXQmVvkmUmsekA0lHhkXtl0XkPqlpMkPllcEkbhll:j+dl3,jlilDEkXolbSkAvl6Yk0xlsekA0lMhkA4kzbkf0k:XkRwkOZk#zkpbkT3kyfk-8kDnk!#kFzku:kH1kV&kMhkA4kdQlqrkMTl*sk2VlUuk2alChkolltkkYulopkI3l3uk*8lz0km#l&1k6Bmoakt:lXYkM*l8Vk57lNskI3l$qkbxlBlkmol8fk7fl#ak/UlRXk4NlVqkdQlqrkagl$$jOklX*jrolK,jRslZ8jwjlD6jagl$$jVIlpNl9IloMlRJliLl5JlIKl&Jl4Il(E:ElXAl8ClR*kRTlB:kMTlTBlkSl,ClBSlbElZRlJGloMlPHl,MlVIlpNlu:kHSk5*k.RkJ#kvSkq6k;Tk#4k6YkZ4kFakU4kVbk+6khdkD!kLgkx#kJekl*kIdku:kHSkZ2l;,lcClZoj_~<><+)I~~<><><4HhkXtlsekA0lpWka;lCck+AmlmkAvl7jkPulHhkXtlzCkJ#k..j&/kz9jjRl6/jHTlf$j/UlZBkP.kAGkf:k5NkwFlOZk2Llokk8Rlbwk!VlH6kJ,kH1kV&kFzku:kJtkvOlRhkrKl#VklEliKka:kzCkJ#k-LlGvk5Tl7ykYplZ9kgxl4:k0xlR;k:xlv;k9wlX-kEuli#kMnln3k2VlUukMTl*skdQlqrk4NlVqk-LlGvkKMl5&jXUl8tj,glJxjEjlXrj-Qlrmj4Ilj8jG5k,3jInkb+jeVkm*jPQkvIkzMk9RkgNk;YkNOkjfkuRk,kkBRkwik3QkVgkAQkJZkmTk-Pk6Yk3Bkkqkn-ji8kS/jKMl5&jagl$$jYelR:jvnlUBktzl3Gkq7liKkJ#l5Nkx$lmJkI8l;EkVwlm;jWslu.jrolK,jOklX*jagl$$jR*kRTls#kJal.:kFblqEl1ZlmKl(SoMl(OvOlVNlSKlCJlDKl$Il&Jl4Il5JlIKlRJliLl9IloMlVIlpNl7Gl*PlbElZRl,ClBSlTBlkSlB:kMTlR*kRTlU4kVbk-3kTek95k9gkY8kAkkO,k2okgEl+SkdBlRSku:kHSkl*kIdk#$klhkY#k4gkD!kLgk+6khdkU4kVbksml32i7WkXCn_~<><Y(&~~<><>)Vgmltyj,glJxjXUl8tjKMl5&ji8kS/jkqkn-j6Yk3BkmTk-PkAQkJZk3QkVgkBRkwikuRk,kk&Skjpk8Vkntk4Wk#uk:XkRwkzbkf0kMhkA4kH1kV&kH6kJ,kbwk!Vlokk8RlOZk2Ll5NkwFlAGkf:kZBkP.kf$j/UlA#j0YlI*jKbll:j+dlcEkbhlpMkPll0XkPqlHhkXtl7jkPullmkAvlCck+Am!ZkxGmcik,Im:rkhLm#4kEzl3HlE4l2alfwl(iKplxzl:Yl63lROl#0lrFl!zleCl:xlv;k0xlR;kgxl4:kYplZ9k5Tl7yk-LlGvk4NlVqk/UlRXk7fl#akmol8fkbxlBlkI3l$qk57lNskM*l8VkD,l3Qk#&lTPkJ#l5Nkq7liKktzl3GkvnlUBkYelR:jagl$$jwjlD6jgmltyjJ#kvSk5*k.Rku:kHSkdBlRSkgEl+SkO,k2okY8kAkk95k9gk-3kTekU4kVbkZ4kFak#4k6Ykq6k;TkJ#kvSks#kJalR*kRTlXAl8Cl(E:El&Jl4IlDKl$IlSKlCJlvOlVNloMl(OmKl(SqEl1Zl.:kFbls#kJalASj9*khInyFl_~<><+)I~~<><><4*VmJnjhamIrj0emRvjt/mdFkI.m;xko:mq6kF;m9&k)Xtvl3rmiQm#mm-WmUhmLdmNGm#6m0sl1.m9XlfFnDAlIHn;-khHnF$kxHn-QlZIn#ql)Wvsl,;miule;mfYmx4m)HxMmo6mNGme+mR;lE:m/3lJDnBmlkFn(W+GnJVljJnMElJIn!8kYHnjzkfFnBqkFEndjkICn0ck3*mWDk42mM5j8qm!nj*Zmpaj(/QQjmGmXNjwBm3KjHTle2i7ekJ;iGzjPPjUUj27jOTjf9jDSjD/jLVjT7jiYjt3jq&jXIj.5kmDj/-kvCjPHlSDjbsljFjhBmYYjDQmnijBTmzkj*VmJnj~___~__~__~<><B(1cBmxijE.l4fjn$lYdjP0lMWjoRl+Hju0kEOjNxksOjstkUPjN/jzaj3ejEAkpajPGkDXjpMkiYjYKk,ZjMIkh6j-ij2okhXjXsk0Wj9vkMWj3MlGQjZvleej39llljO$l-njw,l+qjDQme3jLdmM:jKwmfWkp2mJ3ko/mpcl:om(0wpmC-lYqm,&lkrmO$lusmM!ly*mnVlb7m,ukA1mSOk(?*/j5UmRvjcBmxij~___5Al__5AlR#r>M8Al__~V0k1Kl~__~______KAl#.l!6i-.l-6i+JllaisPkpyiHgjz,iJ;i5vj*:iXwjr:iwwjD:isxjb.ioyjR.i#yj.,iVzjI&ig5js/iO!js/iJ!jLeim2kZxiLwlZxiRwlY6iDGmRCj(<nJj1pmETjd0m*SjU0m3ZjD8m;hjO&m!ij-&myjjt*m,jj#*mLkj)SVpjj;muuj)Ybvj2DnNwjVEn88jdMn$9j;Mn&+jxNn7AkQUnqNkyYn4vk5knuNlDgnzNlDgnfllKdnk6lCVnu6l.UngZmQFnS4msqmY4msqmY4mnqmJ+mvjmO&mjcmY&mVcmqLnOCm)k(j)kAvlkTnAvl+an(PaZn*!k:VnjBkW2mDhjmpmZPjLYm9BjFXmBBjJWmUAj4Jm$#iVJmp#i#ImQ#ioDm59i#.l!6i~___;:k__~!-j#Ml~__~__~<><Y(&W5j;&iG4jX.iR&jKAjlHk3DjhdklMj;AlZKjXsk5$inKkR$i!FkH$i8,jX&iW5j;&i1olHqjIeljej!QltUjFpkBVjH*kEsj1olHqj#2kxwlY4kiKn_~<><C(l~~)^(@_d.le9lj.lR9lo.lF9lf;lT4lIBmizlvYl02lvTld$lyUlp$l2Vlx$l3Il3Lme$k5ZmKyk$nmWXkd0mn,j.!m#tj5,mSVjtCnD6j1HnK#jOInq:jOInLRkTInTjk.Enq1k*Bni,kZ*mpNl58mtbl)D8pl/kmy0l1VmR!l5Fmd.le9l6,krxlxJlqGn_~<><+)I~~<><><4!QltUjsQloUjiQleUj$Il7Oj;AlZKjhdklMjFpkBVj!QltUj!zl33jxulwwj1olHqjH*kEsj1.kyyj3Clv5j!zl33j~<><C(l!zl33j3Clv5j8MlaCk-QlQMkFVlMWkgYlInk#blG4kOalFClrYlJWlvYl02lIBmizl-MmlOl:Em3ukZDmlmkNBmnek(ygDk!zl33j~___yAl__~$+k3Ml~__~__b1j5Moi-lL#i_~<3))(C~~<><>)VU+leKjU+leKjEalM$i,9k2/iGWkcDjg+j2OjGkj!ij4Qj6/juQjE!jkQjY!jQQjs!j,PjK#joPjy#jKPjQ$jAPja$jAPju$j2Oj$$jgMje,jUKjEAkSIj+DkSIj+Dkw+iYoks6iuDl8-iAql8-iAqlGBj:7l*Ij6BmYTjWPmwXjEWmmcjecmEijbim*hjQim:ljymmWqj!qmMvj*um0vjYvmIwj2vmwwjKwm6wjUwm*wjewmExjpwmC0j:ymK3jV1mS6jg3mw6j03mO7jI4ms7jc4my,jU/ma.j)O$.j,/mq:ja!miFkA*m4MkS.mOUky;mOokqGn89k)cELl)aELl)a:YlVEn,llMBnTylq,mcylq,mMAmw9mIVm6umHnmIamHnmIamHnmIamHnmIamjqmPWm0tmUSmywmQOm)DHOmk7ma;lE&mz5lw.mYplw.mOplw.mOplw.mOpl:Bn*Zl2DnIKl6Cnu&k4Anyfkw9m8BkYlm4zj(<4pjIVm+gj(/UZjWKm!Yj4JmYYjQJm*Xje:l4QjK:luQj#.laQjs.lQQj(z*Njm#lCMjU+leKjommHOliJjZll_~<><+)I~~<><>)[Nmj2!j4kjk$jejjc*joFjWhkSIjfIlKKjnpl8Zj9&lzkj;LmT2j6amX6jRemg+jPhm8Bk(|Xikl8m:;kV7mpDlG7mPHl86m&!lv2mvdmFMm4imcGmHnmvAmLnmnAmQnmbAmdlmpCmljmvEm6,lJvmGNlczmbJlwzm*Fl1zmTokA1mzHkpimX*j0ZmT!j2WmP8jVTmqqjkEm4fjS8lBQjDilOOj;AlpLjGbk7nj&+j*mj//jNmj2!j~<t)Y(TVvkmUmgwkvUmwxk/Um1xk&Um/xk:Umu+k68lpNl7#ltglQ6lnzl6ylj5l5ilL/lvTlN3lkIlH2lFHl#0lrFl63lROlxzl:Yl(iKpl2alfwl3HlE4l#4kEzl:rkhLmcik,ImtfkXQmVvkmUmsekA0lHhkXtl0XkPqlpMkPllcEkbhll:j+dl3,jlilDEkXolbSkAvl6Yk0xlsekA0lMhkA4kzbkf0k:XkRwkOZk#zkpbkT3kyfk-8kDnk!#kFzku:kH1kV&kMhkA4kdQlqrkMTl*sk2VlUuk2alChkolltkkYulopkI3l3uk*8lz0km#l&1k6Bmoakt:lXYkM*l8Vk57lNskI3l$qkbxlBlkmol8fk7fl#ak/UlRXk4NlVqkdQlqrkagl$$jOklX*jrolK,jRslZ8jwjlD6jagl$$jVIlpNl9IloMlRJliLl5JlIKl&Jl4Il(E:ElXAl8ClR*kRTlB:kMTlTBlkSl,ClBSlbElZRlJGloMlPHl,MlVIlpNlu:kHSk5*k.RkJ#kvSkq6k;Tk#4k6YkZ4kFakU4kVbk+6khdkD!kLgkx#kJekl*kIdku:kHSkZ2l;,lcClZoj_~<><+)I~~<><><4HhkXtlsekA0lpWka;lCck+AmlmkAvl7jkPulHhkXtlzCkJ#k..j&/kz9jjRl6/jHTlf$j/UlZBkP.kAGkf:k5NkwFlOZk2Llokk8Rlbwk!VlH6kJ,kH1kV&kFzku:kJtkvOlRhkrKl#VklEliKka:kzCkJ#k-LlGvk5Tl7ykYplZ9kgxl4:k0xlR;k:xlv;k9wlX-kEuli#kMnln3k2VlUukMTl*skdQlqrk4NlVqk-LlGvkKMl5&jXUl8tj,glJxjEjlXrj-Qlrmj4Ilj8jG5k,3jInkb+jeVkm*jPQkvIkzMk9RkgNk;YkNOkjfkuRk,kkBRkwik3QkVgkAQkJZkmTk-Pk6Yk3Bkkqkn-ji8kS/jKMl5&jagl$$jYelR:jvnlUBktzl3Gkq7liKkJ#l5Nkx$lmJkI8l;EkVwlm;jWslu.jrolK,jOklX*jagl$$jR*kRTls#kJal.:kFblqEl1ZlmKl(SoMl(OvOlVNlSKlCJlDKl$Il&Jl4Il5JlIKlRJliLl9IloMlVIlpNl7Gl*PlbElZRl,ClBSlTBlkSlB:kMTlR*kRTlU4kVbk-3kTek95k9gkY8kAkkO,k2okgEl+SkdBlRSku:kHSkl*kIdk#$klhkY#k4gkD!kLgk+6khdkU4kVbksml32i7WkXCn_~<><Y(&~~<><>)Vgmltyj,glJxjXUl8tjKMl5&ji8kS/jkqkn-j6Yk3BkmTk-PkAQkJZk3QkVgkBRkwikuRk,kk&Skjpk8Vkntk4Wk#uk:XkRwkzbkf0kMhkA4kH1kV&kH6kJ,kbwk!Vlokk8RlOZk2Ll5NkwFlAGkf:kZBkP.kf$j/UlA#j0YlI*jKbll:j+dlcEkbhlpMkPll0XkPqlHhkXtl7jkPullmkAvlCck+Am!ZkxGmcik,Im:rkhLm#4kEzl3HlE4l2alfwl(iKplxzl:Yl63lROl#0lrFl!zleCl:xlv;k0xlR;kgxl4:kYplZ9k5Tl7yk-LlGvk4NlVqk/UlRXk7fl#akmol8fkbxlBlkI3l$qk57lNskM*l8VkD,l3Qk#&lTPkJ#l5Nkq7liKktzl3GkvnlUBkYelR:jagl$$jwjlD6jgmltyjJ#kvSk5*k.Rku:kHSkdBlRSkgEl+SkO,k2okY8kAkk95k9gk-3kTekU4kVbkZ4kFak#4k6Ykq6k;TkJ#kvSks#kJalR*kRTlXAl8Cl(E:El&Jl4IlDKl$IlSKlCJlvOlVNloMl(OmKl(SqEl1Zl.:kFbls#kJalASj9*khInyFl_~<><+)I~~<><><4*VmJnjhamIrj0emRvjt/mdFkI.m;xko:mq6kF;m9&k)Xtvl3rmiQm#mm-WmUhmLdmNGm#6m0sl1.m9XlfFnDAlIHn;-khHnF$kxHn-QlZIn#ql)Wvsl,;miule;mfYmx4m)HxMmo6mNGme+mR;lE:m/3lJDnBmlkFn(W+GnJVljJnMElJIn!8kYHnjzkfFnBqkFEndjkICn0ck3*mWDk42mM5j8qm!nj*Zmpaj(/QQjmGmXNjwBm3KjHTle2i7ekJ;iGzjPPjUUj27jOTjf9jDSjD/jLVjT7jiYjt3jq&jXIj.5kmDj/-kvCjPHlSDjbsljFjhBmYYjDQmnijBTmzkj*VmJnj~___~__~__~<><B(1cBmxijE.l4fjn$lYdjP0lMWjoRl+Hju0kEOjNxksOjstkUPjN/jzaj3ejEAkpajPGkDXjpMkiYjYKk,ZjMIkh6j-ij2okhXjXsk0Wj9vkMWj3MlGQjZvleej39llljO$l-njw,l+qjDQme3jLdmM:jKwmfWkp2mJ3ko/mpcl:om(0wpmC-lYqm,&lkrmO$lusmM!ly*mnVlb7m,ukA1mSOk(?*/j5UmRvjcBmxij~___5Al__5AlFhw>MHBl__~u+k(I~__~______KAl#.l!6i-.l-6i+JllaisPkpyiHgjz,iJ;i5vj*:iXwjr:iwwjD:isxjb.ioyjR.i#yj.,iVzjI&ig5js/iO!js/iJ!jLeim2kZxiLwlZxiRwlY6iDGmRCj(<nJj1pmETjd0m*SjU0m3ZjD8m;hjO&m!ij-&myjjt*m,jj#*mLkj)SVpjj;muuj)Ybvj2DnNwjVEn88jdMn$9j;Mn&+jxNn7AkQUnqNkyYn4vk5knuNlDgnzNlDgnfllKdnk6lCVnu6l.UngZmQFnS4msqmY4msqmY4mnqmJ+mvjmO&mjcmY&mVcmqLnOCm)k(j)kAvlkTnAvl+an(PaZn*!k:VnjBkW2mDhjmpmZPjLYm9BjFXmBBjJWmUAj4Jm$#iVJmp#i#ImQ#ioDm59i#.l!6i~___n:k__~F#jdLl~__~__~<><Y(&W5j;&iG4jX.iR&jKAjlHk3DjhdklMj;AlZKjXsk5$inKkR$i!FkH$i8,jX&iW5j;&i1olHqjIeljej!QltUjFpkBVjH*kEsj1olHqj#2kxwlY4kiKn_~<><C(l~~)^(@_d.le9lj.lR9lo.lF9lf;lT4lIBmizlvYl02lvTld$lyUlp$l2Vlx$l3Il3Lme$k5ZmKyk$nmWXkd0mn,j.!m#tj5,mSVjtCnD6j1HnK#jOInq:jOInLRkTInTjk.Enq1k*Bni,kZ*mpNl58mtbl)D8pl/kmy0l1VmR!l5Fmd.le9l6,krxlxJlqGn_~<><+)I~~<><><4!QltUjsQloUjiQleUj$Il7Oj;AlZKjhdklMjFpkBVj!QltUj!zl33jxulwwj1olHqjH*kEsj1.kyyj3Clv5j!zl33j~<><C(l!zl33j3Clv5j8MlaCk-QlQMkFVlMWkgYlInk#blG4kOalFClrYlJWlvYl02lIBmizl-MmlOl:Em3ukZDmlmkNBmnek(ygDk!zl33j~___EBl__~.+k3Ml~__~__b1j5Moi-lL#i_~<3))(C~~<><>)VU+leKjU+leKjEalM$i,9k2/iGWkcDjg+j2OjGkj!ij4Qj6/juQjE!jkQjY!jQQjs!j,PjK#joPjy#jKPjQ$jAPja$jAPju$j2Oj$$jgMje,jUKjEAkSIj+DkSIj+Dkw+iYoks6iuDl8-iAql8-iAqlGBj:7l*Ij6BmYTjWPmwXjEWmmcjecmEijbim*hjQim:ljymmWqj!qmMvj*um0vjYvmIwj2vmwwjKwm6wjUwm*wjewmExjpwmC0j:ymK3jV1mS6jg3mw6j03mO7jI4ms7jc4my,jU/ma.j)O$.j,/mq:ja!miFkA*m4MkS.mOUky;mOokqGn89k)cELl)aELl)a:YlVEn,llMBnTylq,mcylq,mMAmw9mIVm6umHnmIamHnmIamHnmIamHnmIamjqmPWm0tmUSmywmQOm)DHOmk7ma;lE&mz5lw.mYplw.mOplw.mOplw.mOpl:Bn*Zl2DnIKl6Cnu&k4Anyfkw9m8BkYlm4zj(<4pjIVm+gj(/UZjWKm!Yj4JmYYjQJm*Xje:l4QjK:luQj#.laQjs.lQQj(z*Njm#lCMjU+leKjommHOliJjZll_~<><+)I~~<><>)[Nmj2!j4kjk$jejjc*joFjWhkSIjfIlKKjnpl8Zj9&lzkj;LmT2j6amX6jRemg+jPhm8Bk(|Xikl8m:;kV7mpDlG7mPHl86m&!lv2mvdmFMm4imcGmHnmvAmLnmnAmQnmbAmdlmpCmljmvEm6,lJvmGNlczmbJlwzm*Fl1zmTokA1mzHkpimX*j0ZmT!j2WmP8jVTmqqjkEm4fjS8lBQjDilOOj;AlpLjGbk7nj&+j*mj//jNmj2!j~<t)Y(TVvkmUmgwkvUmwxk/Um1xk&Um/xk:Umu+k68lpNl7#ltglQ6lnzl6ylj5l5ilL/lvTlN3lkIlH2lFHl#0lrFl63lROlxzl:Yl(iKpl2alfwl3HlE4l#4kEzl:rkhLmcik,ImtfkXQmVvkmUmsekA0lHhkXtl0XkPqlpMkPllcEkbhll:j+dl3,jlilDEkXolbSkAvl6Yk0xlsekA0lMhkA4kzbkf0k:XkRwkOZk#zkpbkT3kyfk-8kDnk!#kFzku:kH1kV&kMhkA4kdQlqrkMTl*sk2VlUuk2alChkolltkkYulopkI3l3uk*8lz0km#l&1k6Bmoakt:lXYkM*l8Vk57lNskI3l$qkbxlBlkmol8fk7fl#ak/UlRXk4NlVqkdQlqrkagl$$jOklX*jrolK,jRslZ8jwjlD6jagl$$jVIlpNl9IloMlRJliLl5JlIKl&Jl4Il(E:ElXAl8ClR*kRTlB:kMTlTBlkSl,ClBSlbElZRlJGloMlPHl,MlVIlpNlu:kHSk5*k.RkJ#kvSkq6k;Tk#4k6YkZ4kFakU4kVbk+6khdkD!kLgkx#kJekl*kIdku:kHSkZ2l;,lcClZoj_~<><+)I~~<><><4HhkXtlsekA0lpWka;lCck+AmlmkAvl7jkPulHhkXtlzCkJ#k..j&/kz9jjRl6/jHTlf$j/UlZBkP.kAGkf:k5NkwFlOZk2Llokk8Rlbwk!VlH6kJ,kH1kV&kFzku:kJtkvOlRhkrKl#VklEliKka:kzCkJ#k-LlGvk5Tl7ykYplZ9kgxl4:k0xlR;k:xlv;k9wlX-kEuli#kMnln3k2VlUukMTl*skdQlqrk4NlVqk-LlGvkKMl5&jXUl8tj,glJxjEjlXrj-Qlrmj4Ilj8jG5k,3jInkb+jeVkm*jPQkvIkzMk9RkgNk;YkNOkjfkuRk,kkBRkwik3QkVgkAQkJZkmTk-Pk6Yk3Bkkqkn-ji8kS/jKMl5&jagl$$jYelR:jvnlUBktzl3Gkq7liKkJ#l5Nkx$lmJkI8l;EkVwlm;jWslu.jrolK,jOklX*jagl$$jR*kRTls#kJal.:kFblqEl1ZlmKl(SoMl(OvOlVNlSKlCJlDKl$Il&Jl4Il5JlIKlRJliLl9IloMlVIlpNl7Gl*PlbElZRl,ClBSlTBlkSlB:kMTlR*kRTlU4kVbk-3kTek95k9gkY8kAkkO,k2okgEl+SkdBlRSku:kHSkl*kIdk#$klhkY#k4gkD!kLgk+6khdkU4kVbksml32i7WkXCn_~<><Y(&~~<><>)Vgmltyj,glJxjXUl8tjKMl5&ji8kS/jkqkn-j6Yk3BkmTk-PkAQkJZk3QkVgkBRkwikuRk,kk&Skjpk8Vkntk4Wk#uk:XkRwkzbkf0kMhkA4kH1kV&kH6kJ,kbwk!Vlokk8RlOZk2Ll5NkwFlAGkf:kZBkP.kf$j/UlA#j0YlI*jKbll:j+dlcEkbhlpMkPll0XkPqlHhkXtl7jkPullmkAvlCck+Am!ZkxGmcik,Im:rkhLm#4kEzl3HlE4l2alfwl(iKplxzl:Yl63lROl#0lrFl!zleCl:xlv;k0xlR;kgxl4:kYplZ9k5Tl7yk-LlGvk4NlVqk/UlRXk7fl#akmol8fkbxlBlkI3l$qk57lNskM*l8VkD,l3Qk#&lTPkJ#l5Nkq7liKktzl3GkvnlUBkYelR:jagl$$jwjlD6jgmltyjJ#kvSk5*k.Rku:kHSkdBlRSkgEl+SkO,k2okY8kAkk95k9gk-3kTekU4kVbkZ4kFak#4k6Ykq6k;TkJ#kvSks#kJalR*kRTlXAl8Cl(E:El&Jl4IlDKl$IlSKlCJlvOlVNloMl(OmKl(SqEl1Zl.:kFbls#kJalASj9*khInyFl_~<><+)I~~<><><4*VmJnjhamIrj0emRvjt/mdFkI.m;xko:mq6kF;m9&k)Xtvl3rmiQm#mm-WmUhmLdmNGm#6m0sl1.m9XlfFnDAlIHn;-khHnF$kxHn-QlZIn#ql)Wvsl,;miule;mfYmx4m)HxMmo6mNGme+mR;lE:m/3lJDnBmlkFn(W+GnJVljJnMElJIn!8kYHnjzkfFnBqkFEndjkICn0ck3*mWDk42mM5j8qm!nj*Zmpaj(/QQjmGmXNjwBm3KjHTle2i7ekJ;iGzjPPjUUj27jOTjf9jDSjD/jLVjT7jiYjt3jq&jXIj.5kmDj/-kvCjPHlSDjbsljFjhBmYYjDQmnijBTmzkj*VmJnj~___~__~__~<><B(1cBmxijE.l4fjn$lYdjP0lMWjoRl+Hju0kEOjNxksOjstkUPjN/jzaj3ejEAkpajPGkDXjpMkiYjYKk,ZjMIkh6j-ij2okhXjXsk0Wj9vkMWj3MlGQjZvleej39llljO$l-njw,l+qjDQme3jLdmM:jKwmfWkp2mJ3ko/mpcl:om(0wpmC-lYqm,&lkrmO$lusmM!ly*mnVlb7m,ukA1mSOk(?*/j5UmRvjcBmxij~___5Al__5Al&A1>M~__~-#k1Kl~__~______KAl#.l!6i-.l-6i+JllaisPkpyiHgjz,iJ;i5vj*:iXwjr:iwwjD:isxjb.ioyjR.i#yj.,iVzjI&ig5js/iO!js/iJ!jLeim2kZxiLwlZxiRwlY6iDGmRCj(<nJj1pmETjd0m*SjU0m3ZjD8m;hjO&m!ij-&myjjt*m,jj#*mLkj)SVpjj;muuj)Ybvj2DnNwjVEn88jdMn$9j;Mn&+jxNn7AkQUnqNkyYn4vk5knuNlDgnzNlDgnfllKdnk6lCVnu6l.UngZmQFnS4msqmY4msqmY4mnqmJ+mvjmO&mjcmY&mVcmqLnOCm)k(j)kAvlkTnAvl+an(PaZn*!k:VnjBkW2mDhjmpmZPjLYm9BjFXmBBjJWmUAj4Jm$#iVJmp#i#ImQ#ioDm59i#.l!6i~___k:k__NBld!j8Ml~__~__~<><Y(&W5j;&iG4jX.iR&jKAjlHk3DjhdklMj;AlZKjXsk5$inKkR$i!FkH$i8,jX&iW5j;&i1olHqjIeljej!QltUjFpkBVjH*kEsj1olHqj#2kxwlY4kiKn_~<><C(l~~)^(@_d.le9lj.lR9lo.lF9lf;lT4lIBmizlvYl02lvTld$lyUlp$l2Vlx$l3Il3Lme$k5ZmKyk$nmWXkd0mn,j.!m#tj5,mSVjtCnD6j1HnK#jOInq:jOInLRkTInTjk.Enq1k*Bni,kZ*mpNl58mtbl)D8pl/kmy0l1VmR!l5Fmd.le9l6,krxlxJlqGn_~<><+)I~~<><><4!QltUjsQloUjiQleUj$Il7Oj;AlZKjhdklMjFpkBVj!QltUj!zl33jxulwwj1olHqjH*kEsj1.kyyj3Clv5j!zl33j~<><C(l!zl33j3Clv5j8MlaCk-QlQMkFVlMWkgYlInk#blG4kOalFClrYlJWlvYl02lIBmizl-MmlOl:Em3ukZDmlmkNBmnek(ygDk!zl33j~___LBl__~.+k3Ml~__~__b1j5Moi-lL#i_~<3))(C~~<><>)VU+leKjU+leKjEalM$i,9k2/iGWkcDjg+j2OjGkj!ij4Qj6/juQjE!jkQjY!jQQjs!j,PjK#joPjy#jKPjQ$jAPja$jAPju$j2Oj$$jgMje,jUKjEAkSIj+DkSIj+Dkw+iYoks6iuDl8-iAql8-iAqlGBj:7l*Ij6BmYTjWPmwXjEWmmcjecmEijbim*hjQim:ljymmWqj!qmMvj*um0vjYvmIwj2vmwwjKwm6wjUwm*wjewmExjpwmC0j:ymK3jV1mS6jg3mw6j03mO7jI4ms7jc4my,jU/ma.j)O$.j,/mq:ja!miFkA*m4MkS.mOUky;mOokqGn89k)cELl)aELl)a:YlVEn,llMBnTylq,mcylq,mMAmw9mIVm6umHnmIamHnmIamHnmIamHnmIamjqmPWm0tmUSmywmQOm)DHOmk7ma;lE&mz5lw.mYplw.mOplw.mOplw.mOpl:Bn*Zl2DnIKl6Cnu&k4Anyfkw9m8BkYlm4zj(<4pjIVm+gj(/UZjWKm!Yj4JmYYjQJm*Xje:l4QjK:luQj#.laQjs.lQQj(z*Njm#lCMjU+leKjommHOliJjZll_~<><+)I~~<><>)[Nmj2!j4kjk$jejjc*joFjWhkSIjfIlKKjnpl8Zj9&lzkj;LmT2j6amX6jRemg+jPhm8Bk(|Xikl8m:;kV7mpDlG7mPHl86m&!lv2mvdmFMm4imcGmHnmvAmLnmnAmQnmbAmdlmpCmljmvEm6,lJvmGNlczmbJlwzm*Fl1zmTokA1mzHkpimX*j0ZmT!j2WmP8jVTmqqjkEm4fjS8lBQjDilOOj;AlpLjGbk7nj&+j*mj//jNmj2!j~<t)Y(TVvkmUmgwkvUmwxk/Um1xk&Um/xk:Umu+k68lpNl7#ltglQ6lnzl6ylj5l5ilL/lvTlN3lkIlH2lFHl#0lrFl63lROlxzl:Yl(iKpl2alfwl3HlE4l#4kEzl:rkhLmcik,ImtfkXQmVvkmUmsekA0lHhkXtl0XkPqlpMkPllcEkbhll:j+dl3,jlilDEkXolbSkAvl6Yk0xlsekA0lMhkA4kzbkf0k:XkRwkOZk#zkpbkT3kyfk-8kDnk!#kFzku:kH1kV&kMhkA4kdQlqrkMTl*sk2VlUuk2alChkolltkkYulopkI3l3uk*8lz0km#l&1k6Bmoakt:lXYkM*l8Vk57lNskI3l$qkbxlBlkmol8fk7fl#ak/UlRXk4NlVqkdQlqrkagl$$jOklX*jrolK,jRslZ8jwjlD6jagl$$jVIlpNl9IloMlRJliLl5JlIKl&Jl4Il(E:ElXAl8ClR*kRTlB:kMTlTBlkSl,ClBSlbElZRlJGloMlPHl,MlVIlpNlu:kHSk5*k.RkJ#kvSkq6k;Tk#4k6YkZ4kFakU4kVbk+6khdkD!kLgkx#kJekl*kIdku:kHSkZ2l;,lcClZoj_~<><+)I~~<><><4HhkXtlsekA0lpWka;lCck+AmlmkAvl7jkPulHhkXtlzCkJ#k..j&/kz9jjRl6/jHTlf$j/UlZBkP.kAGkf:k5NkwFlOZk2Llokk8Rlbwk!VlH6kJ,kH1kV&kFzku:kJtkvOlRhkrKl#VklEliKka:kzCkJ#k-LlGvk5Tl7ykYplZ9kgxl4:k0xlR;k:xlv;k9wlX-kEuli#kMnln3k2VlUukMTl*skdQlqrk4NlVqk-LlGvkKMl5&jXUl8tj,glJxjEjlXrj-Qlrmj4Ilj8jG5k,3jInkb+jeVkm*jPQkvIkzMk9RkgNk;YkNOkjfkuRk,kkBRkwik3QkVgkAQkJZkmTk-Pk6Yk3Bkkqkn-ji8kS/jKMl5&jagl$$jYelR:jvnlUBktzl3Gkq7liKkJ#l5Nkx$lmJkI8l;EkVwlm;jWslu.jrolK,jOklX*jagl$$jR*kRTls#kJal.:kFblqEl1ZlmKl(SoMl(OvOlVNlSKlCJlDKl$Il&Jl4Il5JlIKlRJliLl9IloMlVIlpNl7Gl*PlbElZRl,ClBSlTBlkSlB:kMTlR*kRTlU4kVbk-3kTek95k9gkY8kAkkO,k2okgEl+SkdBlRSku:kHSkl*kIdk#$klhkY#k4gkD!kLgk+6khdkU4kVbksml32i7WkXCn_~<><Y(&~~<><>)Vgmltyj,glJxjXUl8tjKMl5&ji8kS/jkqkn-j6Yk3BkmTk-PkAQkJZk3QkVgkBRkwikuRk,kk&Skjpk8Vkntk4Wk#uk:XkRwkzbkf0kMhkA4kH1kV&kH6kJ,kbwk!Vlokk8RlOZk2Ll5NkwFlAGkf:kZBkP.kf$j/UlA#j0YlI*jKbll:j+dlcEkbhlpMkPll0XkPqlHhkXtl7jkPullmkAvlCck+Am!ZkxGmcik,Im:rkhLm#4kEzl3HlE4l2alfwl(iKplxzl:Yl63lROl#0lrFl!zleCl:xlv;k0xlR;kgxl4:kYplZ9k5Tl7yk-LlGvk4NlVqk/UlRXk7fl#akmol8fkbxlBlkI3l$qk57lNskM*l8VkD,l3Qk#&lTPkJ#l5Nkq7liKktzl3GkvnlUBkYelR:jagl$$jwjlD6jgmltyjJ#kvSk5*k.Rku:kHSkdBlRSkgEl+SkO,k2okY8kAkk95k9gk-3kTekU4kVbkZ4kFak#4k6Ykq6k;TkJ#kvSks#kJalR*kRTlXAl8Cl(E:El&Jl4IlDKl$IlSKlCJlvOlVNloMl(OmKl(SqEl1Zl.:kFbls#kJalASj9*khInyFl_~<><+)I~~<><><4*VmJnjhamIrj0emRvjt/mdFkI.m;xko:mq6kF;m9&k)Xtvl3rmiQm#mm-WmUhmLdmNGm#6m0sl1.m9XlfFnDAlIHn;-khHnF$kxHn-QlZIn#ql)Wvsl,;miule;mfYmx4m)HxMmo6mNGme+mR;lE:m/3lJDnBmlkFn(W+GnJVljJnMElJIn!8kYHnjzkfFnBqkFEndjkICn0ck3*mWDk42mM5j8qm!nj*Zmpaj(/QQjmGmXNjwBm3KjHTle2i7ekJ;iGzjPPjUUj27jOTjf9jDSjD/jLVjT7jiYjt3jq&jXIj.5kmDj/-kvCjPHlSDjbsljFjhBmYYjDQmnijBTmzkj*VmJnj~___~__~__~<><B(1cBmxijE.l4fjn$lYdjP0lMWjoRl+Hju0kEOjNxksOjstkUPjN/jzaj3ejEAkpajPGkDXjpMkiYjYKk,ZjMIkh6j-ij2okhXjXsk0Wj9vkMWj3MlGQjZvleej39llljO$l-njw,l+qjDQme3jLdmM:jKwmfWkp2mJ3ko/mpcl:om(0wpmC-lYqm,&lkrmO$lusmM!ly*mnVlb7m,ukA1mSOk(?*/j5UmRvjcBmxij", ")M)M~<><><>O0mYuljRm:Am(y;dlarlTBmkIlPulGXlwpm!lmwpmO0mYulgJlWslgJl_ZIl~czmWslgJl_ZIl~(y$clgJl_ZIl~", ":G7`Q:G7`QODoV/zJakcp1__<;){)p_$;k_<;){)p&;kMAl_<;){)pWAlgAl_<;){)ptAlyAl_<;){)p!Al$Al_<;){)pDBlFBl_<;){)pLBl~~<;){)p__:G7_:G7`Q_`QqCl__J.kFLz@kepl@Wbni@Wbni@+P-p@Wbni@+P-p@Wbni@+P-p@Wbni@+P-p@+P-p@+P-p@+P-p@+P-p@+P-p@Wbni@+P-p@Wbni@+P-p@Wbni@+P-p@Wbni@Wbni@Wbni@Wbni@Wbni@Wbni+Jq:slKeoU9k!bmCslNsl2Xno9kUBpYpl:ArSRn08r2A4ekz8,3Etzs:6Oit+Jq:sl:G7`Qp0nk$zb$kxU1______~~_____:G7_:G7`Q_`QqCl__J.kFLz@kepl@Wbni@Wbni@+P-p@Wbni@+P-p@Wbni@+P-p@Wbni@+P-p@+P-p@+P-p@+P-p@+P-p@+P-p@Wbni@+P-p@Wbni@+P-p@Wbni@+P-p@Wbni@Wbni@Wbni@Wbni@Wbni@Wbni$$301zeJnAEsSUlgPr:hkpBpoWlmMnILmkXlAZoQlkDOq6ZldPqYalsQqAbl,Rqybl:G7$Qt2:6Oit0Jq/sl2do89k2bmStl0slRZnC/kRCpeql0ArcRnq8r!A4Ukz$$301z~<;<u<fyXrM4nKSr,TnoVp(omco(okjn(oWxlq6p,SmRcqs+m!.q</6fr<]qUrWEqQJrGdrmSoyXrM4n~<7<7<7WXp!#pWXpybqijpe+q45pdQrmPqk6qAcr+RooXr04ngOqq9ngXpk4oWXp!#p", "@ylxl]Q~)J(5(u@tkxlQnw:OlQnwAHvC;k@#unlC;k@tkxlQnw~<>)l(&@vlwliRw&YmiRwiVvCOl@khnlCOl@vlwliRw~(2)p)+@sTvl[[Qon[[hxvQrl@8MnlQrl@sTvl[[~(?(?(?DAl@vlwliRw0*9iRw0*9COl@khnlCOl@vlwliRw~", "e-!}Y~(2)p)+__e-!_e-!}Y_}Y__~<.<x)SeRv3sti123st4Q33stCv3ABuCv3XmuCv3iG0Cv34r04Q3CA1i12CA1eRvCA1[FCA1+Xu4r0+XuiG0+XuXmu+Xu!Au[F3steRv3st~(2)p)+0OvtjuM42tjuM42tjuM42tjuM42MJ0M42MJ0M42MJ00OvMJ00OvMJ00OvMJ00Ovtju0Ovtju0Ovtju~)J(5(u!c!_(e____}Y(d}Y(e}Y!c!}YUs!}Ye-!}Ye-!_!c!_(e|](e(e!c!(e!c!|](e|]~<>)l(&,//(eXFm(e(e(e(e|]GEm|]gFm|]G!/|],E!|]Bd!|]Bd!(e,//(eXFmmw3XFmvEm,//vEm,//cw3XFmcw3", "e-!}YDAlg:y(e!c!(e!c!|]g:y|]g:y(e~~<><><>q69O12q690u2O39An2:m9An2Dc9An2EZ9:p2EZ9,K3gc9,K3ci9AF3ci96&2Wm96&26x9,K3f49,K3h69NH3Dw9g$2w29K!2q69|Hq69O12wn9Q82ci9Q82ci90u2mn90u2Gv90u20w9Ux20w9O120w9O62Au9Q82wn9Q828#8:p28#8,K3O-8,K3UB9AF3UB9I&2uM9I&2sP9K!2sP9|HUB9|HUB9+u2sP9+u2oV9$o2oV9An2**8An28#8:p2!Q+As2KH+eA3U.9As2m!9An2w79An26A+mI3WE+,K3qJ+,K3GN+mI3Gc+An24X+An2!Q+As2QY/+j1oX/gj1xP/Ni14O/KS1uO/!R1uJ/$E1oI/QE13H/MF1oH/6H1c5+MG1c3+y&0:2+A&0M2+`>Ea+SB1xZ+cB1X39cn12t9ec1it9Uc1If9zT13e9QT17d98S1kd9-S1:D9YR1qD9YR1T*8pU1U38{Ij28{I*18mQ1+s8hx1Cq8Gx1Rp8ax1.o8Wy1Es8Q!1Zs84!1108$P2d18qQ2SL9UZ2dM9VZ2ep96M2pp9wM2399.;1+Y+kZ2dZ+uZ2b1+:a251+:a2I#+zT2n#+MT2:J/7C2CK/7C20K/SC2-T/,11MU/o11bY/wk1QY/+j1eI/{QeI/Ca1pJ/-J1!M/{K8N/{Ww,+a713:+h11G;+A11eI/{Qum+KE2+H+Y91wq+hn12z+sk15,+-01Z$+o#12x+9G2um+KE2Aq++G2Ie++G2cM+I-1YT+y-19l+4F2Gm+$F2Aq++G28j9I71L2+7J1jp+8l1dq9y&1Wh9c.18j9I71Mf9&.1eQ9+,1lh9W81Mf9&.1l5+{ZlC/6c1sF/9b1n.+6y1l5+{ZcH/BK1bG/SY107+eI1cH/BK1!4+8I1NF/#Z1Ms+El1!4+8I12a+KD1k1+M-0Z3+pG1Ir9s012a+KD1Ss9$d1R19Bo1Vx9Gq1si9:X1Ss9$d1Te9;V1uv9br1rn9p01mY9Gn1Te9;V1IE9aT1nc9+U1/W9:l1YF9Vb1p,8*V1IE9aT1D-8bX1mS90l1I*8Qi1D-8bX1o38AS12$8KW1&08fy1$u8{ho38AS12$8Gb1c/8w$1.+8TB2y283z12$8Gb1Sr8Iz1$s8Xz1et8mz1208b01Z98-C2,t8e/1Sr8Iz1Y28{+Mv8Y&1I/8cH24H9SW2Y28{+2!8CG2U#8{vk.82:1:I9uU22!8CG2yL9mJ2KL9uU26;8A;1NM9s:1yL9mJ2l:8:,1P#8F$17&8Sk1NV9Ko1Vg93w1Om9F210i9E51ci9O519M9r,1l:8:,1SO92:1Fe98;1NN9WV2SO92:1so9CL2PP9:V2ug98;1Ug+8r1so9CL2L-95C2bC+F:1SU+,T2L-95C28M+6H2LE+N.1HJ+e-1Cd+sI2Li+pQ2jZ+UX28M+6H2G1+GZ2Gc+!X27j+6R2s9+oT2G1+GZ2W!+6R2*o+{/l&+$H2nF/NE2W!+6R28I/$A2*j+kP2sf+2I2Sy+2I2*y+sI2rQ/P418I/$A2KS/s01:7+{z4&+9$1G*+m$1WP/{XEW/Ol1KS/s012$+O122$+0u2a/+An2Kv+An2Ok+An2Qh+:p2Qh+,K3sk+,K3pq+AF3pq+6&2iu+6&2,5+,K3r!+,K3t$+NH3O4+g$28++K!22$+|H2$+O12,v+Q82yq+Q82oq+0u28v+0u2c3+0u2A5+Ux2A5+O12A5+O62W2+Q82,v+Q82", ")M)M(K~<><><>rDlMTl+2lMTl+2lqnl+7ls$l+7l:Um+7lmpm+2lmpm+2laXl0FmaXl0FmOpl1KmQ*l1KmsWm1KmYlm0FmYlm0FmCYlAcmCYlAcmyql([Q*l([/Um([ilmAcmilmAcmzgl(Y(eA0llrlADm(hKhm$Il(Y4XlU5l:Ylu;l+YlMems$l(Ys$l:jmKcm(Y(,A0lYRmADm(&Khm-zm(YFlmU5l+jmk;l:jmCem~<><><>)M6el)M8glb7mWili5mWilaDlWilYBlWil_zgl_6el_acl_YaliBl+YlaDl+YlZ5m+Ylb7m+Yl+8mial+8macl)M6el)M6el", "@*Yrl@iLnl@*Yrl@iLnlk-wY3.ad*iV0_~)a){<E~_)a){<E___@*Yrl_@*Yrl@iLnl_@iLnl~__k:k_@Imql@Wbni@Wbni@+P-p@Wbni@+P-p@Wbni@+P-p@Wbni@+P-p@+P-p@+P-p@+P-p@+P-p@+P-p@Wbni@+P-p@Wbni@+P-p@Wbni@+P-p@Wbni@Wbni@Wbni@Wbni@Wbni@WbniOj4@6Knl:;k}Y*/8a/g@IYrl!V0Oj4@6Knl", "[q(o~<>)U_[q(Z[q/slFVv(o[b(o(P(o$Il(o_/sl_(Z_(P_$Il$Il_(P_[b_FVv_[q$Il[q(P[q(Z~<>)$({-iu$cl-iueglGguIjl0cuIjl>ZIjl69rIjlG7r(YG7r$clG7r0YlG7rOVl*9rkSl>ZkSlqcukSlGgukSl6iuYVl6iu0Yl6iu$cl~<><l<ImKv$clmKveglyHvIjlWEvIjlP3uIjlyzuIjl:wu(Y:wu$cl:wu0Yl:wuOVl9zukSlP3ukSlWEvkSl8HvkSlmKvYVlmKv0YlmKv$cl", "(!(!~<><><>sul(2*tlJ#llrlgxldjl,ql,glCslSel0slUbl0slgYl0slsVlCslMTl,qlYLlgxl$IlJ#lQIl(2GIl0AmkIl-Bm4IltCmPultCmYulECm#ul0Amsul(2eblfllIjlflljplEfljplaXljplwPlSjl(Hebl(H0Tl(H(KwPl(KaXl(KEfl0Tlflleblfllu;lSUl(xSUl(xyMl(x(Ih!lCJlf+lCJld8lCJl46l(I46lyMl46lSUl(mSUlMxlSUlpvl!Vlpvl$Xlpvl*ZlMxlobl(mobl46lobl46lIjl46lKlld8l5mlf+l5mlh!l5mlE$lKllE$lIjlE$loblu;loblwBmoblVDm*ZlVDm$XlVDm!VlwBmSUlu;lSUl", "<@(!~(u)D(u<@4;l<@xGmBkp(!:cp(!oMl(!mFl(!_xGm_4;l_uSl_2LlmFlEGloMlEGl:cpEGlBkpEGl<@2Ll<@uSl<@4;l~(u)}(u<@o&l<@gAmBkpIGm:cpIGmoMlIGmmFlIGm_gAm_o&l_eMl_mFlmFl_oMl_:cp_Bkp_<@mFl<@eMl<@o&l", ")6)o~__~__~<><><>+-mUql6-m*ql4-mprlE-m4-lQ7mILmG7mSLmf6mdMmn5mjNmn5mjNmB3m5QmE0mpTmBxmiWm$wmsam5wm8emwzm#hmo2m,kmz6mFlm&+mNlm:#mVimE,miemp;m*Zmp;m(@CBnCYmNCnJWmICnTWm#OnhDm.PnXtlByncylmMn_:jmPll+-mUqlySm6umKIm6umKImd&mO9ld&mO9l6umwyl6umwyloXnO9loXnO9laAnKImaAnKImoXnySmoXnySm6um6jl(^7al:jmvTl:jm1Kl:jmXFllom_.sm_Y0m_!5mLDlF+mcFl9!m0Jl8&m-LlQ-mlOl0,mkSl-:maXlvBnDZl2Dn7alzFn7alnIn7alSMnHYlZOnYVlqQniQlqQnqJlqQn:;khMn:;k6WnlJl3YnxQl3Ynobl3Yn0hlGUn:nlVPn:nl;Gn:nlHBnxklD.mdjlf-mVhl8&mDelI#m5YlJ+mhUl47mrPlE5m.NlM3mPMlZ1mPMl+ymPMl#vmvOlDumPRlQsmOVlQsmnalQsm6jlxvm6jl(^Cun&xmDqn6um6gn6umLPn6umLPnoXnkZnoXnkZnxDn#dnxDnfnnxDn3snF;mBynk*mBynW8mBynA1mCun&xmkZn31mudn31mUnn31mUnnd9mUnnv#mHknL*m)u0,m)q0,mkZn0,mkZn31m#1mqtm20mqtm)FvtmcpmSumMjm20mVcm.7mVcmJ:mVcmd:mVcmi:mVcmfKnMjmmRn(|)ou1m)o0#m)ox:mwRnvFnfKnvFnE:mvFn.7mx:m20m0#mqtm#1mqtm)Fx0mx0mi0m#1mi0mg8mi0mk!m!5mk*mP/mk*m;.mk*mNHnk!mhMnl8m/Rn31m/RnYvm/RnZrmdMnknmIHngnmi:mgnmY:mgnmJ:mgnmP/m(}!5mrumo1m)Fx0m", "[j[j~)J(5(uzUvVKqzUv>{>{zUvVKqzUvOWnzUv#;k>{#;kVKq#;kOWnOWn#;kVKq#;k>{#;kzUvOWnzUvVKq~<>)I_B-uVKqB-uO6sO6sB-uVKqB-ucknB-upZlO6spZlVKqpZlckncknpZlVKqpZlO6spZlB-ucknB-uVKq~)J(5(uV#p-TlWdq-TlWdq-TlWdq-TlWdqOCvWdqOCvWdqOCvV#pOCvV#pOCvV#pOCvV#p-TlV#p-TlV#p-TldSlM*pwAvM*pwAvM*pwAvM*pwAv,bqwAv,bqwAv,bqdSl,bqdSl,bqdSl,bqdSlM*pdSlM*pdSlM*py7m6km3FnOYm3FnOYmKVoO#nKVoJLqKVo0Ks3Fn5:t3Fn5:ty7mY7ty7mY7tB*nOLsB*niKqB*nO#ny7m6kmy7m6kmbhtsjmDNt;WmDNt;Wmm,r)-m,r-Jqm,rmJsDNtr.tDNtr.tbhtK6tbhtK6t:Xs;Js:XsTJq:Xs)-bhtsjmbhtsjm", "(y(y~<><><>D+lzBlQFlzBlUDlzBl0BlUDl0BlQFl0BlC+l0Bl:/lUDlp#lQFlp#l8jlp#l8jl9olkbl9olkblOfl8jlOfl8jlGYl8jl9Pl/olZLlPwlZLl2zlZLl42lsLlv3l1Llv3lZUloylZUloulZUl4tlSWl4tlCZl4tlOflX3lOflF2l9ol4tl9ol4tlp#lD+lp#l;/lp#lp#l:/lp#lC+lp#lQFlp#lUDl;/lzBlD+lzBl", "(y(y(K~<><><>(Dl/l-bll/l:ol*xlnzlLhlnzl$flnzlweljzlfdlazljSlb9lhSlrwlJJlpsl8Cl9kl8Cl-bl8Cl&OldQlZElLhlZEl*xlZEll/l&Oll/l-bl~<><><>!WlInl!Wlwll#XlsklTZlskl1alsklwblwllwblInlwblnol1aluplTZlupl+Xlupl!Wlnol!WlInl#XlXhlXXl/NlPbl/NlvalXhl#XlXhlvjlghlpjlcglXjlOelDkl7blFmlbZl$nlQXl&olvVl&ol8Tl&ol3RltnlbQlEllYQlsjlYQl:hl8Ql.glrRl;flCPlYhlEOlvjleNl6lleNlhqleNlpslVQlpslbTlpslJWlBrlIYlFplfalVnlnclvmlXel4mlcgl7mlghlvjlghl3ilInl3iltll4jlpklNllpklsmlpklqnltllqnlInlqnlnolvmluplKllupl1jlupl3ilnol3ilInl", "(y(y(K~<><><>(Ca6lHXlH8lHWl,9lQalQ+lhfl5!lwfle/lOlla8lRslNzlfzlfql7ylSflSrliZl$ulOQl&ylDGlDwllClCkluDlCklhGl4Zl-KlGbl4NlCaloVl4alaalXdlYdlKhl6qlPVl7zl9Sle0lxWla6lHXl", "(y(yvBlw9lBelw9ldflw9lfjls+lfjl+8lfjl!FlfjlsFlmbl2Fl#al2FleCl2FlKBl2FlvBlyGlvBl!HlvBlw9l~<><><>bhlKpliflpmlwclGllqal3ilxXlkflQbl+clidlralYil1Vl*hlgMl!bltIlBdltIlkflHJliglnIl8kl.FlGel.Fl4WlRFlKQlvGlzJlGIlyElHOlWFl9Ul:Fl;bl.Ml0flpTl/el(OBil6Sl#jl&Ulvml2Ol8ml&FlHol9ClWulp;k+0l7DlO6lHKlK8lIQlA+l9Xli9lLdl*5lpila2lrll9ulZhlIplrUlHdlJLlHdl-GlfIl+RlfIl$alfIlNflHdlrUlHdl3dl:1ltalY7l9Rl46l;Mlq4l4HlP2lhFl&ul.KlTrl/OlwolJVlfnlDZlNql5cl9sloglQxl3dl:1l3dl:1l~___CslUIl0#lUIl0#lO!lCslO!l~<><><>54loQl54l!Hlh0l!Hlh0lmQl4rlmQl4rl!Ulg0l!Ulg0lmdl44lmdl44l!Ule#l!Ule#loQl44loQl54loQl", "(y(y(K~<><><>(Dkhl2hlidl_ZIl~~<><><>mfl0plfflgolJfl8llAgl-ilgilBgluklhdl+llobl+llaZl+ll#WlVklQVlQhlNVliflNVlmdl4VlWclyWlKbltTl3clhSlmflyRlHilyRlznlyRlQqlJVlQql9YlQqlJclbolmelCmlVhl$jl8jlIjl.llTjlgolXjl0plmfl0plhelmwlhel1ulxflhtlbhlhtlFjlhtlRkl1ulRklmwlRklQylIjlnzlXhlnzltflnzlhelQylhelmwl", "(y(yQWl/ql-Ul0pl*Tlvol0Sl8nliOl6klHLl2llNJlmql#GlXwl1ElR2lVClG8ljBlb+lBClN/lhElN/lJKlJ/l7PlN/ljVlN/l1ilN/l.vlN/la9lL/lc$lJ/lf$lD/lh!lP6lf+lF1lZ8lFwlO6lFrlx3lJllR0lXklYvllolqulNpl:tl;plWtl7qlSul:qlOvllrlKwldrlmzl;qle1l(ha2lvvl$2lnxl53lWzli4lG1lA6lS5l(rj5lk1lm5lOqlx5l(Xs5lqTls5lPRls5l7Olz5leMli5lwLlY5lSKlI4lZKl33lpLlA0lhMlDwltOl-slzPlarlPTllrlhWlvql~<><><>wllQDlmnlyDlEpl:El1ql,Flp1lQMl93lpalIvlojlxrlInljnl.pl0jlRtlFilrul1glrulJflRtl8bldqlRYl9nlDVl/klIKl(U8Ml6KlOal0ElYblMEleclaDl0dlGDl(YoCl(aeClollGDlXhlfjlWolkjlSuludlWulrWlbulnPlrol0JlihlwJlWaltJlsUlRPloUleWllUlmdlQaldjlXhlfjlQWl/ql:SlyrlkPlorleOlGtlSMlPwl;KlI0lKKl$3l!JlD5lhLlm5lRMlr5lsOl/5lARl35ldTl35lzel35l;pl75lY1l15l55lx5l75lg5lV4lW1lq3lizl72l5xlJ2l+vlD1l0slWzlPsl*vlsrlTulYrlBulOrlItl,ql(iLqlaulSpl(jrolA0lhkli3lTllA6lOrlK8lNwlO+lN1lS!lP6lP$l-+lN$lF/lK9lF/lbVlF/l1PlF/lEKl-+leElF/lAClF/laBlT+lVCl.7l1ElL2l#GlPwlNJldqlPLlnllrOl1kl5Slznl;TllolFVlrplVWlxqlXhlfjlRalbjllUlmdloUleWlsUlSPlWaltJljhlwJllol0JlXulnPlXulrWlNuludlRolkjlPhlfjl", "(y(y~<><><>Ual2Bl!klzFlOsl$Gl51lcIle8leJlj8lTJlk8l#Pln8locl(tQplh8l#1lZ8lx9lW1lZ&lutlN$lFqlv#l(dG!l,lla8l.kl*4lQmlv1l;ol.zl7slvxl.wl5xlT2llvlT2l.rly2lwlla2l!glT2lufl*1lEelmzledlUslkbl#klLaltclcYltclJgl4clcnlrclvulccl12l&UlZ8l:Mls6lxJl!5lpGlL4laGl00lOGlKylLHlZul;IlCtl4MlaqldRlBrl#Wlsol#Wlxfl9WlhTl;WlVJlCXliGl#Wl2Dl#Wl9AlbXl9Al6Zl2BlUal2Bl", "(y(y(K~<><><>(Dkhl2hlidl_ZIl~(KshlrRlshlXxl(KsxlhhlyRlhhl", "(y(y(K~<><><>(E:mlOUl*3lOUl*3l7!lYLl7!lYLlOUlkblOUl~<><><>9qlaJlXhl_7XlaJlvalOMlkelZIlkellqlJkllqlJklZIl;nlOMl9qlaJl", "(y(y~<><><>eJlrll/5lrll/5lrll/5lrll/5l(t/5l(t/5l(teJl(teJl(teJl(teJlrlleJlrlleJlrll./lXZl./lpcl77lnel(rnelI4lnel,zlNal,zlNal,zlNalmvlnelttlnelyrloelOnlNalOnlNalOnlNal+ilmel,glnelBfloelnalNalnalNalnalNaltWlkel+Ulnel-SlrellOlNallOlNallOlNalKKlvelTIlneluGlhelWDlvclWDlXZlWDlkUl$Ol!Jl$Ol!JlH0l!JlH0l!Jl./lhUl./lXZl", "(y(y~<><><>SklBjlSklWplUklrvlQkl!1lQkl92lqklb4l$ilp4l&hlx4l#glg4lPgl83lRdlH1ljalJyluXlUvl2Ulcsl2UlcslzQlcslSOlcsl5Lljsl(HfslcGlZslTFlbrlOFlvolIFlcklIFlIglOFl/bl(EgZldGlTYl1IlOYlvLlGYlpOlQYliRlQYl2UlQYl2UlQYlQXl2Vl3ZlPTlTcluQl6elGOlfflhNl;fl0Ml0glPMlLilPLlRklbMlRklLOlTklIVlSklFclSklBjl(K~<><><>(Dw2luOlw2luOl88lOZl88lBjl88lJtlw2lp4lw2lp4l(KlwlcVllwlcVl00lqcl00lTjl00lLqllwl-xllwl-xl(KDql:alDql:alsslZflsslfjlssltnlDqlZslDqlZsl", "(y(y~<><><>i#lvNlI/lyOlp8lePl#5l1Plt8lGOlz+llLlz/lfIlK9l-JlX6lCLlW3luLl&0lFJljxliHlztliHlemliHllglbNllglvUllglyVluglyWl+glwXl!VlHXlMMl/RlwFl!JlmEl8Ll!DlHOl!DllQl!DlFVlOGlJZl2JljblqHlfblpFl8al5Dl9Zl5Dl;Zl5DlcglXIl0llZOl-mlRNlQnlEMlcnl!KlcnlCKlcnlPJlWnlcIlLnlFKlcsl*OlNwlzUlWwlNQl9zlkKl-1lXEl-1lTDl-1lQCl!1lNBl41lCHll5l,Nly7ldVly7lwtly7l&6lsnl&6lNWl!6ljUli9lsSlz/lVQli#lvNli#lvNli#lvNl", ")w(u~<><><>(O(K(M(K(C_:Bl_(G(M(G(K(C:BlHEl_(E(E(G(E(CHElQGl_(M(C(M(E(C1.k__(O(K(O(a(M(a(C_:Bl_(G(c(G(a(C:BlHEl_(E(U(G(U(CHElQGl_(M(S(M(U(C1.k__(O(a(O(q(M(q(C_:Bl_(G(s(G(q(C:BlHEl_(E(k(G(k(CHElQGl_(M(i(M(k(C1.k__(O(q(/(K(9(K(C_:Bl_(W(M(W(K(C:BlHEl_(U(E(W(E(CHElQGl_(9(C(9(E(C1.k__(/(K(/(a(9(a(C_:Bl_(W(c(W(a(C:BlHEl_(U(U(W(U(CHElQGl_(9(S(9(U(C1.k__(/(a(/(q(9(q(C_:Bl_(W(s(W(q(C:BlHEl_(U(k(W(k(CHElQGl_(9(i(9(k(C1.k__(/(q&Lnf3l)da1lzCl&AlCDl_rlmJLlunmMJlzClCDlLFl_tpmFDlyrmIFlzClx,k6:k_-Pnbvl!NngxlzCl6:k&Al_&Lnf3l-PnHHl!NnMJlzCl6:k&Al_vtmf3lyrma1lzCl&AlCDl_slmdzlunmgxlzClCDlLFl_#HnFDl)dIFlzClx,k6:k_-PnHHl", "=d(!(K~<)<)<)(Da!matla!m!$l*umWKmeZmWKmNqlWKmxUlWKmQDl!$lQDlatlQDl9olQDlXTlxUl!BlNql!BleZm!Bl*um!Bla!mXTla!m9ola!matl~<><><>Jjncll0kl_ZIl~~()<q)M=DYrl=D+!lQvp(90Zp(9jqo(9.Uo(9)>+!l)>Yrl)>7ml)>VRl.Uo_jqo_0Zp_Qvp_=DVRl=D7ml=DYrl=D2Ql=d2Ql______~____cAl=D_=d_=d(Z=D(Z", "^,(=kFs(=kFs~_~<><><>&;k~<w<w<wkAl~<w<w<wKBl~<w<w<w~~)?)?)?(K~(;(;(;(C^,3Il^,wElkHz~4Dz~OKl~iGl~~wEl~3Il~EXm~LbmiGl(=OKl(=4Dz(=kHz(=^,Lbm^,EXm^,3Il~)`)`)`(K<[(C<[(<~<;<;<;(K<^(C<^(<~)`)`)`(K?((C?((<~<;<;<;(K?<(C?<(<", "=U)I)0(H)0frm_~)U<!)e~~(:<t(^(K)0(G)05sm_~(2)-(9~~(2)x(9(C=Khkm=KSomF.p(}W&p(}5Ol(}ALl(}(GSom(Ghkm(GPQl(GdMlALl(H5Ol(HW&p(HF.p(H=KdMl=KPQl=Khkm", ")o)ocOmQNm_cOmQNmAHmGBl~___NBl_____AWnhNm$VnF6m)J$TnNOm$Tnisl$TnnGl66m2GlHOm*Gl$rl(f(FaOm(F56m(F)m;qlAWnlNm:NmyMlCvloMl1NlftlmNlLMmXNl;1m2ulLOn*NmROn22mWOnuOn72m*OnJOmSPnwulw3m+Ml.NmyMll0mhFn(lxUl_~(k(k(kNBl~)y)y)y)jhNm*Rn+3m$2m!PnWOm!Pn5ul!Pn2Klk4m*KlFOmILlAulNslqKlkOmqKlz4mqKlMSnKtl)jiNmHOmeQlQxlUQloRllvlbRlPMmNRl-zm-wljKnDOmlKn90mtKnDLn30mYLnHOmsLn3wly1mtQlJOmjQlVylEXlbymaDn_~<><><>NBl~<I<I<IXNm8Ml02m,MlGOnoul5Nn2NmjNnJ2m71meNnUNmYNnbulTNnNNlT3mcNl2NmqNlUvlxulyMlWNm8Ml7dm!ilUzlgOmx*lmfmoMmCxmZemn$mZemFlmBGmENm6dm,#l6dm!il~___Iem!ilIem*#lYGmCNmUPm!VmGXmrdmwemDlmwemn$mrzlkOmGem*il", "(y(y~<><><>AGlKglF9lKglF9l$il;Fl$ilAGl1qlF9l1qlF9lltl;FlltlAGln1lF9ln1lF9lX4l;FlX4lAGl2al5ul2al5ulkdlAGlkdl;0l2alD9l2alD9lkdl-0lkdlAGloll!Lloll!LlWolAGlWolESlollD9lollD9lWolESlWolAGlJwlDglJwlDgl&ylAGl&ylQmlJwlF9lJwlF9l&ylQml&ylEzl-6lF9l-6lF9l19lEzl19lAGl-6l/sl-6l/sl19lBGl19l(K~<><><>/Al4ulUIluvl6Hlowl8JlxwlcMl*xljMlSxlPPl4vlxSlSrlNWl,ml#VlihlRSlvel;TlEalBWlEVltUlYTl(L!Tl(LUVlvJljXlXKl9Yl5JltclLKl,eldLleglVNl(deHllrlTGl4rlLIl", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAYAAADL1t+KAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzUyRUE5QjI3RUVCMTFFOThDQkJGMTQyRjNFQzQxNUYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzUyRUE5QjM3RUVCMTFFOThDQkJGMTQyRjNFQzQxNUYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozNTJFQTlCMDdFRUIxMUU5OENCQkYxNDJGM0VDNDE1RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozNTJFQTlCMTdFRUIxMUU5OENCQkYxNDJGM0VDNDE1RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqKPqPYAABNfSURBVHja7N3Pj2xpWcDxtzpnxkRZOW4IaJ8Ew+gaZt2BtRlijBqBRS1YaCT+CXa1+idg/BGitVAYY9wQjTsndw3ugWDSIISF4AYl4Y6Z8n25p5Ky7O7bXbeqzvu87+eTnNzpyb1ze857+nzPc+p09WKz2SQAILYLuwAABB0AEHQAQNABAEEHAEEHAAQdABB0AEDQAUDQAQBBBwAEHQAQdAAQdABA0AEAQQcABB0ABB0AEHQAQNABAEEHAEEHAAQdABB0AEDQAUDQAQBBBwAEHQAQdAAQdABA0AEAQQcABB0ABB0AEHQAQNABAEEHAEEHAAQdABB0AEDQAUDQAQBBBwAEHQB4ZcMrXAi8lbdP5O3jefto3j6Ut5/L28/YrQDwUj/J23/n7Xt5+2bevpa3d/P21by9/9T/2GKz2Tzl9384b7+ft8/k7RetBQAc3b/n7W/z9qd5++6xg/5G3v4ob5/L2+v2NQCc3PO8fTFvf5i3Hx4j6L81XSX8gn0LAGf3g7x9Pm9/99BveuihuPL6+p9N/wExB4B5lAa/MzV5eOqE/rNTyH/NfgSAavxj3n47bz9+TNBL/f8hb2/bbwBQna/k7Tfy9j+7//KuW+5fEHMAqNbbU6sfnNDLGP+OfQUA1ft03r58V9DLt6Z9PXkADgAi+M+8/Ure/qN8sHvL/U/EHADC+Pm8/fH+hP5LeftW3l6zfwAgjPfy9st5+852Qv89MQeAcF6bGv7TCb1E/dvpxfu0AwCxlPd7v9z+1DQxB4CYSsPfKkH/pH0BAKF9ogT9Y/YDAIT28RL0N+0HAAjtzRL0D9oPABDaB8tT7j/J//C6fQEAYT0vQd/YDwAQ24VdAACCDgAIOgAg6ACAoAOAoAMAgg4ACDoAIOgAIOgAgKADAIIOAAg6AAg6ACDoAICgAwCCDgCCDgAIOgAg6ADAg4Ygn+dq+vXmiX/ueu/PA9Cn5jsyNLoA6Z4/J+wAQt5kR4ZGF0DYAYS8q47UFvR13m6PuAAPLciYt6VjHqAp3XZksckqWoRn06/nUBbhStQBmop5tx0ZOl2EtPd3iTqAmIfuyNDpIog6gJg31ZGh40UQdQAxb6Yjcwf9duZF2F2MS18XAOHoyGTOd4pbpdM9hXiIm+Tb2QAi0ZFKgg4ABA96bVdVpnQA03nojpjQAcCE3tRVlSkdwHQetiMmdABowBxv/boIsm82Dg+AOtulIyZ0AGiSoAOAoAMAgg4ACDoAIOgAIOgAgKADAIIOAAg6AAg6ACDoKV0H2C/XDg0A5+hIn6MJHQBM6AdZVX51dZ38PHSAmumICR0ATOg9XF2ZzgFM6SE7YkIHABN6U1dXpnMAU3rYjsw9oY95W1awCMvpcwEgFh2ZDBXsgK31jJ/DVSUHBAA6EjLocy+GmAOIehMdGTpeDDEHEPVmOjJUuBiXebs58d9VHlwYxRygyah32ZGh0sXYujnBAhQrxz1A85N6Vx0ZKl2Q1ZEXRMgB+tJdR4bGF0TIAYS9i44sNpn1BoDYvPUrAAg6ACDoAICgAwCCDgCCDgAIOgAg6ACAoAOAoAMAgg4ACDoAIOgAIOgAgKADACcy2AUEtcjb9fTPK7sDEHSI62bnn8e8Le0SoNspZ5PZDQSd0HeVmF+a1gETOsS23vtY2AFBh8Dchge65JY7YY/dR/yeEnO34QETOgS33vtY2AFBh8BuhB0QdBB2AEGHysM+Jg/OAQ3wUBxhj90j/XdKzD04B5jQz2R1x2T1GN4alJdZm9ahC813pPYJ/dAFEHYTumkd6KojQ+MLkO757zhh87Jp3XECQh6qI7UFvZxQb4+4AA8tyJjcXsUFILR4Yd5lR2q65V4W4dkdU9KplEW4EvWwFmf8u7xkA3Fi3m1Hhk4XIe39XaJOyCtyQEdqCvociyDqHBr2cpzcmtah+5hX15Gh40UQdV71eEnCDl3HvKqOzB3025kXYXcxLn1d8MRpfWt0MQg6MndH5nwobpVO9xTioa5NXGEsKvpclsn3r4OOzNwR7+UOx7ky3z/JAHQR9BqvqtLO5+SEzKscP8WY3IYHHTmjC8cEnOQL+pkLQ6D1Cb3WqypTOse0vuO4B3SkqaBDb9O6sAMnN8dT7osg+8bPia/82A36eZcnYMfk9XXQEUEXdEIHPSXf5gY6cgJuucP5rfc+FnZA0CEw3+YGHI1b7vdzy73yY7ex/58Sc7fhQUdM6BDceu9jYQcEHQLzbW6AoIOwA4IO1B72MXlwDriHh+Lu56G4yo/dDv+fS8w9OAc6YkKH4NamdcCEbkJ3hW5aB1//JvSjKu9lfVP5Ilz7eiHQtJ6Enc7oSCVBB47H0/DAbEFf3XMiqumqykkRYYd66YgJHboK+5g8OAfdmOOhuN0rrNqurkzngY5du+ClSsw9OEfrk7qOmNChees7Tn5Ao+YM+vbkUsvVlemcVrkNT8sTuo5MLmb+n6/l5LKcPhdoPezPXLjSGB2pYEJPe4uwnvFzuDK10In1PRMORKUjlQR97sUQc3qe1oUdUW+oI0PHiyHmIOyIejMdGSpcjMt0+gccyoMLo5jDnWH3tUH0qHfZkTm/D/0hq3umh2MsgCmkDb4P/bQnRd+/TnTddWSofCHSkRZEyOHx1qZ1Ggp6Nx2pdUI/1pWWkJvQMa1DFx2JEnQQ9Hm5OIbKeetX4DE8DQ+CDgg7IOhA7WEfkwfnYHZeQyfssWsXVKPE3INzYEIHglvvfSzsIOhAYG7Dw4zccifssWsXVK3E3G14MKEDwa33PhZ2EHQgMLfh4UzccifssWsXhFNi7jY8mNCB4NZ7Hws7CDoQmHebA0EHGg37mLy+Dq/Ea+iEPXbtgqaUmHt9HUzoQHDrvY+FHQQdCMzr6yDoQKNhH5PX1+GlvIZO2GPXLuhGibnX18GEDgS33vtY2EHQgcC8vg6CDjQa9jF5fR1+ymvohD127QKS19fBhA40Yb33sbAj6ACBuQ1P99xyJ+yxaxdwjxJzt+ExoQMEt977WNgRdIDAfJsbgg4g7CDoALWHfUwenKMxUR6KW91zpf0y167I2z127QJeQYm5B+f60nxHhkYXIN3z53zxAsXatC7krXWk1gn9VRfAxG5CB9O6kHfVkdom9HLVfHuCBbjrSstVObA/rbvgb2M9u+xITRN6WYRnd3xxnfKq/ErUTegQZQJDRyJM6OdehP2rclEH7prAhF3Mw3Rk6HQRRB14SthH5wgxr70jQ8eLIOrAY8Nezg23pnUxr7kjcwf9duZF2F2MS18XwCNO2EnYq6IjFQR9lU73FOKhV+G+UIHHnCeKMbmrNzcd2XHheAA46MT9zABATeaa0Gu7qjKlA0+1vuO8ho7M1hE/nAXgOCfwYkxuwzOTOd5Yptarql3XrrbrP3btAipUYu5tZHVklo54DR3geNZTaBbTyXxtl9DyhB5lsto4PEzoYGL39R+lI15DBzjtxL41Jq+vY0I3oWNCx7SOjpjQAeqa1pOwI+gAsfk2N07CLff7ueVe+bFrF9CAEnO34XXEhA4Q3HrvY2HHhG5Cd4UODfjr5Ba8jhzIG8sAQAPccgeY3/X0q+kcQQcIqATcQ3EIOkDwqXw0lXMsFzMdxBG+0ABOdX7Z/iQuMdcREzpAMCXebq/TVNC3B3OtP8vWz0IHTnFeGU3kOmJCBzCVQ5VBr/XqynQOmMpN6SE7YkIHMJFjQm/q6sp0DpjITelhOzL3hL49+NcVXFWPvjaAA0/iyUCgI3N3ZKhgB2ytZ/wcrlxVAwecO9xer2MddCTV8Rr6nIsh5sChU/no3CHqNXVk6HgxxBw4JOTJVC7qNXZkqHAxyi2smzN8Ubq6Bp5yfnJ7PU7Uu+zIUOlibN2cYAFcXQMGgD4m9a46Uuv3oa+OvCBCDjhv9KW7jgyNL4gvSEDIhb2Ljiw2mfUmoIVdgJBDnAkd4NSWyQNvCDpA+Kl8TB54Q9ABTOUg6ACmchB0gCeGPJnKEXQAIQdBBxByEHSAx1omD7wh6ADhp/IxeeANQQcIG/JkKkfQAWIqk7jb6yDoQPCpfExur4OgA2FDnkzlIOiAkIOgA5zZMnmdHAQdCD+Vj8nr5CDoQNiQJ1M5CDog5CDoAGe2TF4nB0EHwk/lY/I6OQg6EDbkyVQOgg4IOSDowJktk9fJQdCB8FP5mLxODoIOhA15MpWDoAMxlUnc7XUQdCD4VD4mt9dB0IGwIU+mchB0IKYyibu9DoIOBJ/Kx+T2Ogg6EDbkyVQOgg4IOdBh0LcnjxsnHxBy0JF4QT90AdI9f87JCJ5mmTzwRp8hD9eRodEFEHY4zlQ+Jg+80WfIw3WktqCv83Z7xAV4aEGcqMBUTnu67chik1W0CM+mX8910roS9bAWdoGpHHSkvgn93IuQ9v4uJy+E/AVTOWIetCNDp4sg6iDkiHlTHRk6XgRRR8iFHDFvpiNzB/125kXYXYxLXxd0YJk88EZbdKSCoJcTyk1FB8WNiYUOpvIxuRNFO3SkogkdOE/IXaxC4+YKem1XVaZ0WlQmcbfXMZ130hETOrQ7lY/J7XUwoXd4VWVKp5WQO34xnXfYERM6CDnQgDne+jXKW3ZuHB51H7t2gZDj619HTOgQ3TJ54A0QdAg/lY/JA2+AoIOpHBB0wFQOCDrwxJAnUzkg6CDkgKADQg4IOvBYy+SBN0DQIfxUPiYPvAGCDmFDnkzlgKBDTGUSd3sdOKqLGaeSCJMTnOLYuhJz0BETOsQ+AQk50EzQtye0Wn+W7bWTLkIOVdMREzqczTJ5nRzoIOi1Xl2ZzjnWcTQm34YGOmJCh7AhTy4Kgd6CXtvVlemcQ5VJ3O110JFZO3Ix8//8mOq4LbmcPhc45AvYt6GBjszekaGCHbC1nvFzuEpe7+TpIU9CDlWEVEdSHa+hz7kYYs4hx4zb6yDq1XVk6HgxxJxDpvLRMQOiXmNHhgoXo0w/p37AwYmZpx4vyVQOYaLeZUeGShdj6+YEC+DEjOMF+pjUu+pIrd+Hvjrygjgx43iBvnTXkaHxBXFi5qlX9h54A2EP2ZHFJrPeBLQ4wVQ+Js9VAEF561dM5aZyQNAhNFM5IOgQPOTJVA4IOgg5gKCDkAMIOjzWMnngDRB0CD+Vj8kDb4CgQ9iQJ1M5IOgQU5nE3V4HBB2CT+VjcnsdEHQIG/JkKgcQdOLyMwgAdlzYBQAg6ACAoAMAgg4ACDoACDoAIOgAgKADAIIOAIIOAAg6ACDoAICgA4CgAwBVivLjU1fTrzdP/HN+XjYAXXRkaHQB0j1/TtgBhLzJjgyNLoCwAwh5Vx2pLejrvN0ecQEeWpAxb0vHPEBTuu3IYpNVtAjPpl/PoSzClagDNBXzbjsydLoIae/vEnUAMQ/dkaHTRRB1ADFvqiNDx4sg6gBi3kxH5g767cyLsLsYl74uAMLRkcmc7xS3Sqd7CvEQN8m3swFEoiOVBB0ACB702q6qTOkApvPQHTGhA4AJvamrKlM6gOk8bEdM6ADQgDne+nURZN9sHB4AdbZLR0zoANAkQQcAQQcABB0AEHQAQNABQNABAEEHAAQdABB0ABB0AEDQU7oOsF+uHRoAztGRPkcTOgCY0A+yqvzq6jr5eegANdMREzoAmNB7uLoynQOY0kN2xIQOACb0pq6uTOcApvSwHZl7Qh/ztqxgEZbT5wJALDoyGSrYAVvrGT+Hq0oOCAB0JGTQ514MMQcQ9SY6MnS8GGIOIOrNdGSocDEu83Zz4r+rPLgwijlAk1HvsiNDpYuxdXOCBShWjnuA5if1rjoyVLogqyMviJAD9KW7jgyNL4iQAwh7Fx1ZbDLrDQCxeetXABB0AEDQAQBBBwAEHQAEHQAQdABA0AEAQQcAQQcABB0AEHQAQNABQNABAEEHAAQdABB0ABB0AEDQAQBBBwAEHQAEHQAQdABA0AEAQQcAQQcABB0AOGvQn9sNABDa8xL0H9kPABDaj0rQv28/AEBo3y9B/4b9AAChfaME/V/tBwAI7Wsl6O/aDwAQ2ruLzWZTov7tvH3Y/gCAcL6bt8sS8/fz9jf2BwCEVBr+fpnQ0zSd/1veXrdfACCM8l4yHylT+sXOuP5F+wUAQvmrqeFpO6EXb6QX38L2hv0DANX7Yd7enH79P+/lXv7F5+0fAAjhD7Yx3w968U7e/sI+AoCq/WXevrT7L3ZvuW+VB+P+Pm9v218AUJ2v5O03094PV7vrx6eW3/A7eftn+wwAqvJPU6P/309Kve/nof84b59Kbr8DQC1Kk399anR6bNCL9/L2u9OVwA/sRwCYRWnwp6cmv3ffb7p4xH+oPCj3q3n787tGfADgJJ5P7S0N/vLLfvNdD8U9pLyjXPnWts/m7UP2NQAc3ffSi7dz/UKa3jTmMZ4a9N3J/q28fTJvH8vbR6fYfyBvr1kLAHipcvv8v6ZofzO9+HHm/5K3r6YXP2flSQ4NOgBQkQu7AAAEHQAQdABA0AEAQQcAQQcABB0AEHQAQNABQNABAEEHAAQdABB0ABB0AEDQAQBBBwAEHQAEHQAQdABA0AEAQQcAQQcABB0AEHQAQNABQNABAEEHAAQdABB0ABB0AEDQAQBBBwAEHQAEHQAQdABA0AEAQQcAQQcAwvpfAQYAwYdDb2Pd1JcAAAAASUVORK5CYII="]);
if (console.timeStamp) console.timeStamp('FRVR Page Load Done');