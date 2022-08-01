import plumb from './jsPlumb';
export default {
  name: 'jsPlumb',
  components: {},
  data () {
    return {
      mousedownX: 0, // 鼠标按下X坐标
      mousedownY: 0, // 鼠标按下Y坐标
      canvasX: 0, // 画布X偏移量
      canvasY: 0, // 画布Y偏移量
      mousedownTag: false, // 鼠标按下松开标识
      zoom: 1, // 缩放层级
      plumb: null, // 工作流变量
      index: 0, // 模块增加数值累加
      activeNode: {}, // 活动节点(当前节点)
      anchor: false, // 透明锚点,不可连线状态
      pi: {}, // 初始节点数据 开始 结束节点
      currClickIndex: '', // 当前点击节点标识
      passiveSupported: false, // 支持被动（passive）监听器
      touchSupported: false, // 是否支持touch事件
      alloyfinger: null,
      isDoubleTap: false, // 是否为移动端双指缩放
    };
  },
  created () {
    // mouse move
    this.mouseMoveThrottle = throttle(this.handlerMousemove, 1000 / 30);
    // mouse wheel
    this.mouseWheelThrottle = throttle(this.handlerMousewheel, 1000 / 30);
  },
  mounted () {
    this.testTouchSupported();
    this.testPassiveSupported();
    this.plumb = new plumb();
    this.plumb.init();
    this.listenDrag();
    if (this.touchSupported) {
      this.initAlloyFinger();
      this.listenTouchDrag();
    }
  },
  methods: {
    // 判断移动设备是否支持touch事件
    testTouchSupported () {
      if (('ontouchstart' in window) || window.TouchEvent || window.DocumentTouch && document instanceof window.DocumentTouch) {
        this.touchSupported = true;
      }
    },
    // 初始化alloyfinger
    initAlloyFinger () {
      this.alloyfinger = new alloyfinger(this.$refs.canvasWrapper, {
        touchStart: function () { },
        touchMove: function () { },
        touchEnd: function () { },
        touchCancel: function () { },
        multipointStart: function () { },
        multipointEnd: function () { },
        tap: () => {},
        longTap: () => {},
        pinch: function (evt) { },
        pressMove: function (evt) { }
      });
    },
    // 监听移动端多指操作事件
    listenTouchDrag () {
      this.alloyfinger.on('touchEnd', this.touchEnd);
      this.alloyfinger.on('touchCancel', this.touchCancel);
      this.alloyfinger.on('multipointStart', this.multipointStart);
      this.alloyfinger.on('multipointEnd', this.multipointEnd);
      // 缩放事件
      this.alloyfinger.on('pinch', this.pinch);
    },
    // touchend
    touchEnd (e) {
      this.isDoubleTap = false;
    },
    // touchCancel
    touchCancel (e) {
      this.isDoubleTap = false;
    },
    // multipointStart
    multipointStart (e) {
      this.isDoubleTap = true;
    },
    // multipointEnd
    multipointEnd (e) {
      this.isDoubleTap = false;
    },
    // pinch
    pinch (e) {
      this.isDoubleTap = true;
      this.plumb.setZoom(e.zoom);
    },
    // 测试判断定是否支持被动（passive）监听器
    testPassiveSupported () {
      try {
        let options = Object.defineProperty({}, 'passive', {
          get: () => {
            this.passiveSupported = true;
          }
        });
        window.addEventListener('test', null, options);
      } catch (err) {
        // 异常处理
      }
    },
    // 监听鼠标各种事件
    listenDrag () {
      // 监听移动端touch开始事件
      this.$refs.canvasWrapper.addEventListener(
        'touchstart',
        this.handlerMousedown
      );
      // 监听移动端touch移动事件
      this.$refs.canvasWrapper.addEventListener(
        'touchmove',
        this.mouseMoveThrottle
      );
      // 监听移动端touch移动结束事件
      document.addEventListener('touchend', this.handlerMouseup);

      // pc端事件
      this.$refs.canvasWrapper.addEventListener(
        'mousedown',
        this.handlerMousedown
      );
      document.addEventListener('mouseup', this.handlerMouseup);
      this.$refs.canvasWrapper.addEventListener(
        'mousemove',
        this.mouseMoveThrottle
      );
      if (this.passiveSupported) {
        this.$refs.canvasWrapper.addEventListener(
          'mousewheel',
          this.mouseWheelThrottle,
          {
            passive: true
          }
        );
      } else {
        this.$refs.canvasWrapper.addEventListener(
          'mousewheel',
          this.mouseWheelThrottle
        );
      }
    },
    // 移除鼠标各种事件
    removeDrag () {
      if (this.$refs.canvasWrapper) {
        this.$refs.canvasWrapper.removeEventListener(
          'mousedown',
          this.handlerMousedown
        );
        document.removeEventListener('mouseup', this.handlerMouseup);
        this.$refs.canvasWrapper.removeEventListener(
          'mousemove',
          this.mouseMoveThrottle
        );
        if (this.passiveSupported) {
          this.$refs.canvasWrapper.removeEventListener(
            'mousewheel',
            this.mouseWheelThrottle,
            {
              passive: true
            }
          );
        } else {
          this.$refs.canvasWrapper.removeEventListener(
            'mousewheel',
            this.mouseWheelThrottle
          );
        }
      }
    },
    // 鼠标滚轮事件
    handlerMousewheel (e) {
      if (!this.passiveSupported) {
        e.preventDefault();
      }
      this.zoom = this.pi[2].shape.position.scale;
      console.log(this.zoom);
      if (e.wheelDelta > 0) {
        this.setZoom(true);
      } else {
        this.setZoom(false);
      }
    },
    // 鼠标按下事件
    handlerMousedown (e) {
      if (
        typeof e.target.className === 'string' &&
				e.target.className.includes('canvas-wrapper')
      ) {
        this.mousedownTag = true;
        if (e.type === 'touchstart') {
          this.mousedownX = e.changedTouches[0].clientX;
          this.mousedownY = e.changedTouches[0].clientY;
        } else {
          this.mousedownX = e.offsetX;
          this.mousedownY = e.offsetY;
        }
        this.canvasX = this.$refs.canvas.offsetLeft;
        this.canvasY = this.$refs.canvas.offsetTop;
        e.stopPropagation();
      }
    },
    // 鼠标移动事件
    handlerMousemove (e) {
      if (this.mousedownTag && !this.isDoubleTap) {
        let x = 0;
        let y = 0;
        if (e.type === 'touchmove') {
          // 兼容移动端
          x = e.changedTouches[0].clientX - this.mousedownX + this.canvasX;
          y = e.changedTouches[0].clientY - this.mousedownY + this.canvasY;
        } else {
          // pc端
          x = e.offsetX - this.mousedownX + this.canvasX;
          y = e.offsetY - this.mousedownY + this.canvasY;
        }
        this.$refs.canvas.style.left = x + 'px';
        this.$refs.canvas.style.top = y + 'px';
      }
    },
    // 鼠标松开事件
    handlerMouseup (e) {
      this.mousedownTag = false;
    },
    // 绘制函数
    paint () {
      //清空点
      if (this.plumb) {
        this.plumb.deleteEveryEndpoint();
      }
      //画节点
      this.paintEndpoints();
      //画线
      this.paintConnections();
    },
    // 绘制节点
    paintEndpoints () {
      this.$nextTick(() => {
        for (let i in this.pi) {
          if (this.index < Number(i)) {
            this.index = Number(i);
          }
          let _pi = this.pi[i];
          this.addEndpoint(`node${_pi.basic.id}`, _pi.basic.type);
        }
      });
    },
    // 绘制连线
    paintConnections () {
      this.$nextTick(() => {
        try {
          let p = null;
          for (let i in this.pi) {
            let _pi = this.pi[i];
            _pi.shape.linkout.forEach((out, index) => {
              if (out && Object.keys(out).length > 0) {
                p = this.plumb.connect({
                  uuids: [ out.from, out.to ]
                });
              }
            });
          }
        } catch (error) {
          // console.log(error);
        }
      });
    },
    //判断模块左/右锚点连线后，清除另一边锚点
    deleteTransitionEndpointByUuid (uuid, id) {
      if (uuid.includes('Right')) {
        this.plumb.deleteEndpointByUuid(`node${id}Left`);
      }
      if (uuid.includes('Left')) {
        this.plumb.deleteEndpointByUuid(`node${id}Right`);
      }
    },
    // 点击节点事件
    clickHandler (node) {
      console.log(node);
    },
    // 添加工艺路线端点
    addEndpoint (id, type) {
      this.plumb.addEndpoint(
        id,
        _obj.source,
        _obj.target,
        _obj.sourceMaxConnections,
        _obj.targetMaxConnections,
        this.anchor
      );
      this.plumb.setDraggable(id, this);
    },
    // 设置放大缩小层级
    setZoom (tag) {
      if (tag) {
        this.zoom = this.zoom + 0.1;
      } else {
        if (this.zoom > 0.2) {
          this.zoom = this.zoom - 0.1;
        }
      }
      // 放置到结束步的position中存储整个div缩放比例
      this.plumb.setZoom(this.zoom);
    }
  },
  computed: {},
  beforeDestroy () {
    this.removeDrag();
  }
};