// window.onload = function () {
  // const data = {
  //   // 节点
  //   nodes: [
  //     {
  //       id: 'node1', // String，可选，节点的唯一标识
  //       x: 40,       // Number，必选，节点位置的 x 值
  //       y: 40,       // Number，必选，节点位置的 y 值
  //       width: 80,   // Number，可选，节点大小的 width 值
  //       height: 40,  // Number，可选，节点大小的 height 值
  //       // label: 'hello', // String，节点标签
  //       attrs: {
  //         body: {
  //           fill: '#2ECC71',
  //           stroke: '#000',
  //           strokeDasharray: '10,2',
  //         },
  //         label: {
  //           text: 'Hello',
  //           fill: '#333',
  //           fontSize: 13,
  //         }
  //       }
  //     },
  //     {
  //       id: 'node2', // String，节点的唯一标识
  //       x: 160,      // Number，必选，节点位置的 x 值
  //       y: 180,      // Number，必选，节点位置的 y 值
  //       width: 80,   // Number，可选，节点大小的 width 值
  //       height: 40,  // Number，可选，节点大小的 height 值
  //       // label: 'world', // String，节点标签
  //       attrs: {
  //         body: {
  //           fill: '#F39C12',
  //           stroke: '#000',
  //           rx: 16,
  //           ry: 16,
  //         },
  //         label: {
  //           text: 'World',
  //           fill: '#333',
  //           fontSize: 18,
  //           fontWeight: 'bold',
  //           fontVariant: 'small-caps',
  //         },
  //       },
  //     },
  //   ],
  //   // 边
  //   edges: [
  //     {
  //       source: 'node1', // String，必须，起始节点 id
  //       target: 'node2', // String，必须，目标节点 id
  //       // shape: 'double-edge',
  //       attrs: {
  //         line: {
  //           stroke: 'orange',
  //         },
  //       },
  //     },
  //   ],
  // };

  const graph = new X6.Graph({
    container: document.getElementById('container'),
    width: 1024,
    height: 768,
    background: {
      color: '#fffbe6', // 设置画布背景颜色
    },
    grid: {
      size: 10,      // 网格大小 10px
      visible: true, // 渲染网格背景
    },
    connecting: {
      allowBlank: false,
      allowNode: false,
      allowEdge: false,
      // allowPort: false
    },
    scroller: {
      enabled: true,
      pannable: true,
    },
    selecting: {
      enabled: true,
      rubberband: true, // 启用框选
      className: 'my-selecting',
    },
    minimap: {
      enabled: true,
      container: document.getElementById('minimapContainer'),
    },
    translating: {
      restrict(view) {
        const cell = view.cell
        if (cell.isNode()) {
          const parent = cell.getParent()
          if (parent) {
            return parent.getBBox()
          }
        }
  
        return null
      },
    }
  });
  // graph.fromJSON(data)
  const nodeObj = {
    code: 'node-1',
    x: 220,
    y: 80,
    width: 120,
    height: 60,
    zIndex: 10,
    label: 'Child1',
    attrs: {
      body: {
        fill: 'green',
      },
      label: {
        fill: '#fff',
      },
    },
    ports: {
      groups: {
        in: {
          position: 'left',
          // label: {
          //   position: 'top',
          // },
          attrs: {
            circle: {
              r: 6,
              magnet: true,
              stroke: '#31d0c6',
              strokeWidth: 2,
              fill: '#fff',
            },
          },
        },
      },
      items: [
        {
          id: 'port1',
          group: 'in', // 指定分组名称
        },
        {
          id: 'port2',
          group: 'in', // 指定分组名称
        },
        {
          id: 'port3',
          group: 'in', // 指定分组名称
        },
      ],
    },
  };
  const child1 = graph.addNode(nodeObj)

  const child2 = graph.addNode({
    x: 20,
    y: 180,
    width: 120,
    height: 60,
    zIndex: 10,
    label: 'Child2\n(embedded)',
    attrs: {
      body: {
        fill: 'green',
      },
      label: {
        fill: '#fff',
      },
    },
    ports: {
      groups: {
        in: {
          position: 'left',
          // label: {
          //   position: 'top',
          // },
          attrs: {
            circle: {
              r: 6,
              magnet: true,
              stroke: '#31d0c6',
              strokeWidth: 2,
              fill: '#fff',
            },
          },
        },
        out: {
          position: 'right',
          label: {
            position: 'bottom',
          },
          attrs: {
            circle: {
              r: 6,
              magnet: true,
              stroke: '#31d0c6',
              strokeWidth: 2,
              fill: '#fff',
            },
          },
        },
      },
      items: [
        {
          id: 'port4',
          group: 'out', // 指定分组名称
        },
        {
          id: 'port5',
          group: 'out', // 指定分组名称
        },
        {
          id: 'port6',
          group: 'out', // 指定分组名称
        },
      ],
    },
  })
  
  const parent = graph.addNode({
    x: 80,
    y: 40,
    width: 320,
    height: 240,
    zIndex: 1,
    label: 'Parent',
  })
  
  parent.addChild(child1);
  parent.addChild(child2);

  graph.addEdge({
    source: {
      cell: child2, 
      port: 'port4', // 链接桩 ID
    },
    target: { 
      cell: child1, 
      port: 'port1', // 链接桩 ID
    },
  })
  
  graph.addEdge({
    source: {
      cell: child2, 
      port: 'port5', // 链接桩 ID
    },
    target: { 
      cell: child1, 
      port: 'port2', // 链接桩 ID
    },
  })
  
  graph.addEdge({
    source: {
      cell: child2, 
      port: 'port6', // 链接桩 ID
    },
    target: { 
      cell: child1, 
      port: 'port3', // 链接桩 ID
    },
  })

  graph.fromJSON(data);

  graph.on('cell:click', ({ e, x, y, cell, view }) => {
    console.log(cell);
  })

  function addNode () {
    for (let i = 0; i < 500; i++) {
      nodeObj.x += 10;
      nodeObj.y += 10;
      nodeObj.label = i++;
      graph.addNode(nodeObj);
    }
  }

  function toJSON () {
    console.log(graph.toJSON());
  }
// }