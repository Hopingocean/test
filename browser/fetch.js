async function foo () {
  console.log('foo');
}
async function bar () {
  console.log('bar start');
  await foo();
  console.log('bar end');
}
console.log('script start');
setTimeout(function () {
  console.log('setTimeout');
}, 0)
bar();
new Promise(function (resolve, reject) {
  console.log('promise executor');
  resolve();
}).then(function () {
  console.log('promise then');
});
console.log('script end');

// log
/**
 * script start - script start
 * bar start - bar start
 * script end - foo
 * foo - promise executor
 * bar end - script end
 * setTimeout - bar end
 * promise executor - promise then
 * promise then - setTimeout
 */
