/**
 * 1.前置任务号不能与父任务号和当前任务号相等；
 * 2.前置任务号必须在任务号中存在；
 * 3.任务链不允许交叉；
 * 修改任意前置任务号，判断当前任务链是否正常？
 */
// 错误1
let arr1 = [
    {
        id: 1, // 任务号
        pid: 0, // 前置任务号
        preId: 0,
        arr: [
            {
                id: 2,
                pid: 38,
                preId: 1,
            }
        ]
    },
    {
        id: 3,
        pid: 0,
        preId: 0
    },
    {
       id: 38,
       pid: 1,
       preId: 0
    }
];
// 错误2
let arr2 = [
    {
        id: 1, // 任务号
        pid: 0, // 前置任务号
        preId: 0,
        arr: [
            {
                id: 2,
                pid: 4,
                preId: 1
            }
        ]
    },
    {
        id: 3,
        pid: 0,
        preId: 0,
        arr: [
            {
                id: 4,
                pid: 0,
                preId: 3,
                arr: [
                    {
                        id: 5,
                        pid: 1,
                        preId: 4
                    }
                ]
            }
        ]
    }
];

// 错误3
let arr3 = [
    {
        id: 1, // 任务号
        pid: 0, // 前置任务号
        preId: 0, // 父任务号
        arr: [
            {
                id: 2,
                pid: 1,
                preId: 1
            }
        ]
    },
    {
        id: 3,
        pid: 2,
        preId: 0,
        arr: [
            {
                id: 4,
                pid: 1,
                preId: 3,
            }
        ]
    }
];

// 错误4
let arr4 = [
    {
        id: 1, // 任务号
        pid: 0, // 前置任务号
        preId: 0,
        arr: [
            {
                id: 2,
                pid: 4,
                preId: 1
            }
        ]
    },
    {
        id: 3,
        pid: 0,
        preId: 0,
        arr: [
            {
                id: 4,
                pid: 38,
                preId: 3
            }
        ]
    },
    {
        id: 38,
        pid: 1,
        preId: 0,
    }
];

// 错误5
let arr5 = [
    {
        id: 1, // 任务号
        pid: 0, // 前置任务号
        preId: 0,
        arr: [
            {
                id: 2,
                pid: 4,
                preId: 1,
            }
        ]
    },
    {
        id: 3,
        pid: 0,
        preId: 0,
        arr: [
            {
                id: 4,
                pid: 38,
                preId: 3
            }
        ]
    },
    {
        id: 38,
        pid: 1,
        preId: 0
    }
];
// 正常
let arr6 = [
    {
        id: 1, // 任务号
        pid: 0, // 前置任务号
        preId: 0,
        arr: [
            {
                id: 2,
                pid: 38,
                preId: 1,
            }
        ]
    },
    {
        id: 3,
        pid: 0,
        preId: 0
    },
    {
       id: 38,
       pid: 0,
       preId: 0
    }
];
/**
 * 
 * @param {数组} arr 
 * @param {指定id} id 
 * @param {输入pid} pid
 */
function validate(arr, id, pid) {
    curStatus = false;
    let result = false;
    let cur = findCur(arr, id);
    if (!result && cur) {
        // 向下查找闭环
        curStatus = false;
        let child = findCur(arr, cur.preId);
        console.log(child);
        if (child && !child.preId) {
            if (child && child.id === pid) {
                // 存在闭环
                // console.log(child);
                result = true;
                return;
            } else if (child && child.id) {
                // 查找被依赖数据
                parStatus = false;
                let par = findPar(arr, child.id);
                if (par) {
                    validate(arr, par.id, pid);
                }
            }
        } else if (child && child.preId) {
            // 向上查找闭环
            if (child && child.preId === pid) {
                // 存在闭环
                // console.log(child);
                result = true;
                return;
            } else if (child && (child.pid || child.preId)) {
                // 查找被依赖数据
                parStatus = false;
                let par = findPar(arr, child.pid || child.preId);
                if (par) {
                    validate(arr, par.id, pid);
                }
            }
        }
    }
}

// 查找指定数组元素
let cur;
let curStatus = false;
function findCur(arr, id) {
    for (let i = 0; i < arr.length; i++) {
        if (!curStatus) {
            if (arr[i].id === id) {
                curStatus = true;
                cur = arr[i];
                break;
            } else if (arr[i].arr) {
                findCur(arr[i].arr, id);
            }
        } else {
            break;
        }
    }
    return cur;
}
// 查找被依赖数据
let par;
let parStatus = false;
function findPar (arr, id) {
    for (let i = 0; i < arr.length; i++) {
        if (!parStatus) {
            if (arr[i].pid === id) {
                parStatus = true;
                par = arr[i];
                break;
            } else if (arr[i].arr) {
                findPar(arr[i].arr, id);
            }
        } else {
            break;
        }
    }
    return par;
}

// validate(arr1, 38, 1);
// validate(arr2, 5, 1);
// validate(arr3, 4, 1);
// validate(arr4, 38, 1);
// validate(arr6, 2, 38);
