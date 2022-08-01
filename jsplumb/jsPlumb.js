import { jsPlumb } from 'jsplumb';
class plumbInstance {
  // 构造函数
  constructor (list) {
    this.list = list;
    this.instance = null;
    this.connectorPaintStyle = {
      strokeWidth: 4,
      // stroke: '#0073aa',
      stroke: '#5a5e79',
      joinstyle: 'round',
      outlineStroke: 'white',
      outlineWidth: 2
    };
    // .. and this is the hover style.
    this.connectorHoverStyle = {
      strokeWidth: 4,
      stroke: '#000',
      joinstyle: 'round',
      outlineWidth: 5,
      outlineStroke: 'white'
    };
    this.endpointHoverStyle = {
      fill: '#216477',
      stroke: '#216477'
    };
    this.sourceEndpoint = {
      endpoint: 'Rectangle',
      enabled: true,
      detachable: false,
      paintStyle: {
        width: 20,
        height: 10,
        stroke: '#000',
        fill: 'transparent',
        strokeWidth: 2
      },
      isSource: true,
      maxConnections: -1,
      connector: [
        'Flowchart',
        {
          cornerRadius: 5
        }
      ],
      connectorStyle: this.connectorPaintStyle,
      hoverPaintStyle: this.endpointHoverStyle,
      connectorHoverStyle: this.connectorHoverStyle,
      dragOptions: {}
    };
    this.sourceBlankEndpoint = {
      endpoint: 'Blank',
      detachable: false,
      paintStyle: {
        width: 10,
        height: 10,
        stroke: '#000',
        strokeWidth: 2
      },
      isSource: true,
      maxConnections: -1,
      connector: [
        'Flowchart',
        {
          cornerRadius: 5
        }
      ],
      connectorStyle: this.connectorPaintStyle,
      hoverPaintStyle: this.endpointHoverStyle,
      connectorHoverStyle: this.connectorHoverStyle,
      dragOptions: {}
    };
    this.targetEndpoint = {
      // endpoint: "Dot",
      endpoint: 'Rectangle',
      detachable: false,
      enabled: true,
      paintStyle: {
        width: 20,
        height: 10,
        fill: '#089201',
        radius: 7
      },
      hoverPaintStyle: this.endpointHoverStyle,
      maxConnections: -1,
      dropOptions: {
        hoverClass: 'hover',
        activeClass: 'active'
      },
      isTarget: true
    };
    this.targetBlankEndpoint = {
      endpoint: 'Blank',
      detachable: false,
      paintStyle: {
        fill: '#7AB02C',
        radius: 7
      },
      hoverPaintStyle: this.endpointHoverStyle,
      maxConnections: -1,
      dropOptions: {
        hoverClass: 'hover',
        activeClass: 'active'
      },
      isTarget: true
    };
  }

  // 初始化函数
  init () {
    let _this = this;
    jsPlumb.ready(() => {
      let instance = jsPlumb.getInstance({
        // default drag options
        DragOptions: {
          cursor: 'pointer',
          zIndex: 2000
        },
        // the overlays to decorate each connection with.  note that the label overlay uses a function to generate the label text; in this
        // case it returns the 'labelText' member that we set on each connection in the 'init' method below.
        ConnectionOverlays: [
          [
            'Arrow',
            {
              location: 1,
              visible: true,
              width: 11,
              length: 11,
              id: 'ARROW',
              events: {
                click: function () {

                }
              }
            }
          ]
        ],
        Container: 'canvas'
      });
      _this.instance = instance;
      // 不允许拆卸连接，不设置的话默认是可以的
      _this.instance.importDefaults({
        ConnectionsDetachable: false
      });
      // 立即生效
      jsPlumb.fire('jsPlumbDemoLoaded', _this.instance);
    });
  }

  // 添加端点
  addEndpoint (
    nodeId,
    sourceAnchors,
    targetAnchors,
    sourceMaxConnections = 1,
    targetMaxConnections = 1,
    anchor
  ) {
    try {
      let _anchor = null;
      for (let i = 0; i < sourceAnchors.length; i++) {
        let sourceUUID = nodeId + sourceAnchors[i];
        _anchor =
					sourceAnchors[i] === 'Bottom'
					  ? [ 0.5, 1, 0, 1, 0, 5 ]
					  : sourceAnchors[i];
        this.instance.addEndpoint(
          nodeId,
          {
            anchor: anchor ? _anchor : sourceAnchors[i],
            uuid: sourceUUID
          },
          Object.assign(
            anchor ? this.sourceEndpoint : this.sourceBlankEndpoint,
            {
              maxConnections: sourceMaxConnections
            }
          )
        );
      }
      for (let j = 0; j < targetAnchors.length; j++) {
        let targetUUID = nodeId + targetAnchors[j];
        _anchor =
					targetAnchors[j] === 'Top'
					  ? [ 0.5, 0, 0, -1, 0, -5 ]
					  : targetAnchors[j];
        this.instance.addEndpoint(
          nodeId,
          {
            anchor: anchor ? _anchor : targetAnchors[j],
            uuid: targetUUID
          },
          Object.assign(
            anchor ? this.targetEndpoint : this.targetBlankEndpoint,
            {
              maxConnections: targetMaxConnections
            }
          )
        );
      }
    } catch (error) {
      // console.log(error);
    }
  }

  //获取所有连线
  getAllConnections () {
    return this.instance.getAllConnections();
  }

  // 获取连线通过ID
  getConnectionsById (id) {
    return this.instance.getConnections(id);
  }

  // 连线
  connect (parms) {
    return this.instance.connect(parms);
  }

  //获取所有连线锚点的uuid
  getUuids () {
    return this.getAllConnections().map(connection => connection.getUuids());
  }

  // 设置拖动
  setDraggable (id, vm) {
    this.instance.draggable(id, {
      grid: [ 20, 20 ], //网格大小
      drag: evt => {
        this.instance.repaintEverything();
      },
      stop: evt => {
        this.instance.repaintEverything();
      }
    });
  }

  // 删除所有节点
  deleteEveryEndpoint () {
    this.instance.deleteEveryEndpoint();
  }

  // 删除节点
  deleteEndpointByUuid (uuid) {
    this.instance.deleteEndpoint(uuid);
  }

  // 设置缩放
  setZoom (zoom) {
    let el = this.instance.getContainer();
    let p = [ 'webkit', 'moz', 'ms', 'o' ];
    let s = 'scale(' + zoom + ')';
    for (let i = 0; i < p.length; i++) {
      el.style[p[i] + 'Transform'] = s;
    }
    el.style.transform = s;
    this.instance.setZoom(zoom);
  }
}
export default plumbInstance;
