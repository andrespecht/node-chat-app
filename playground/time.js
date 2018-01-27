var moment = require('moment');

var createdAt = 12313;
var date = moment(createdAt);
console.log(date.valueOf());
console.log(moment().valueOf());
console.log(date.format('h:mm a'));
