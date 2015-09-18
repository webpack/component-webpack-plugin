var l = require('local-comp');
console.log(l);
// some styles
require('./styles.css');

// more fixture
var Calendar = require('calendar');
require('calendar/0.2.0/lib/calendar.css');
// require('datepicker/1.0.1/datepicker.css');

var one = new Calendar().showMonthSelect().showYearSelect();

one.on('view change', function(date, action){
  console.log('change %s', action);
  var twoDate = new Date(date);
  twoDate.setMonth(date.getMonth() + 1)
  small.show(twoDate);
});

one.on('change', function(date){
  console.log('selected: %s of %s %s',
    date.getDate(),
    date.getMonth(),
    date.getFullYear());
  var newDate = new Date(date);
  newDate.setMonth(date.getMonth() + 1);
  large.select(newDate);
});

var container = document.querySelector('#standard');
container.appendChild(one.el);

var small = new Calendar;
small.addClass('small');
container.appendChild(small.el);
small.next();

var frLocale = {
  months : 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
  weekdaysMin : 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
};
var large = new Calendar;
large
  .addClass('large')
  .locale(frLocale);
container.appendChild(large.el);


container = document.querySelector('#restricted');
var restricted = new Calendar(new Date(2004, 6, 11))
  .min(new Date(2004, 5, 12))
  .max([2004, 7, 19])
  .select(new Date(2004, 7, 19));
container.appendChild(restricted.el);
restricted = new Calendar(new Date(2004, 6, 11))
  .max(new Date(2004, 5, 12))
  .min([2004, 5, 18])
  .show(new Date(2004, 5, 19));
container.appendChild(restricted.el);

