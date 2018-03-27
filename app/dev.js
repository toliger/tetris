var watch = require('node-watch');
var cmd=require('node-cmd');

var Promise = require('bluebird');

const get = (command) => {
  return new Promise((resolve, reject) => {
    cmd.get(command, (err, data, stderr) => {
      if (err) {
        reject(err);
      }

      resolve(data);
    });
  })
}

get('./node_modules/.bin/webpack').then((data) => {
  console.log('\x1b[32m', data);
}).catch((err) => {
  console.log(err);
})

watch('./js', { recursive: true }, function(evt, name) {
  get('./node_modules/.bin/webpack').then((data) => {
    console.log('\x1b[32m', data);
  }).catch((err) => {
    console.log('\x1b[31m', err);
  })
});
