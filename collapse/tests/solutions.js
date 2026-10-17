// Reference setups for every level (spoilers), plus traps: tempting wrong ideas that must fall short.
// Each setup is {placed, launch}; a part is {type, tx, ty, rot} in tiles (see the engine's map legend).
var QSolutions=[
  {placed:[{type:'mirror',tx:24,ty:3,rot:1}]},
  {placed:[{type:'mirror',tx:20,ty:12,rot:0},{type:'mirror',tx:20,ty:3,rot:0}]},
  {launch:{width:'wide',speed:'fast'}},
  {placed:[{type:'wall',tx:2,ty:4,rot:0},{type:'wall',tx:2,ty:7,rot:0},{type:'wall',tx:2,ty:10,rot:0}]},
  {placed:[{type:'eye',tx:4,ty:5,rot:0},{type:'eye',tx:4,ty:10,rot:0}]},
  {placed:[{type:'mirror',tx:12,ty:12,rot:0},{type:'mirror',tx:12,ty:2,rot:0},{type:'eye',tx:10,ty:10,rot:3},{type:'eye',tx:14,ty:10,rot:3}]}
];
// below: the most stars the trap may earn.
var QTraps=[
  {level:0,name:'mirror turned the wrong way',below:1,placed:[{type:'mirror',tx:24,ty:3,rot:0}]},
  {level:1,name:'only one mirror',below:1,placed:[{type:'mirror',tx:20,ty:12,rot:0}]},
  {level:2,name:'narrow and fast',below:2,launch:{width:'narrow',speed:'fast'}},
  {level:2,name:'wide but slow',below:2,launch:{width:'wide',speed:'slow'}},
  {level:3,name:'two walls, drain half open',below:3,placed:[{type:'wall',tx:2,ty:4,rot:0},{type:'wall',tx:2,ty:7,rot:0}]},
  {level:4,name:'one watcher',below:2,placed:[{type:'eye',tx:4,ty:5,rot:0}]},
  {level:4,name:'channel one row too wide',below:2,placed:[{type:'eye',tx:4,ty:4,rot:0},{type:'eye',tx:4,ty:11,rot:0}]},
  {level:5,name:'mirrors but no watchers',below:2,placed:[{type:'mirror',tx:12,ty:12,rot:0},{type:'mirror',tx:12,ty:2,rot:0}]}
];
