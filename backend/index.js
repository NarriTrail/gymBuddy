//require statements
const express = require('express');
const cors = require('cors');
const socketIo = require('socket.io');
const http = require('http');
const app = express();

// middleware declaration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//server creation with http
const server = http.createServer(app);

//creating socket creation
const socketConnection = socketIo(server, {
  cors: {
    origin: 'http://10.0.2.2:3000',
    methods: ['GET', 'POST'],
  },
});
let chatGroup = [];
socketConnection.on('connection', socket => {
  console.log('user connected with socket', socket.id);
  socket.on('getAllGroups', () => {
    socket.emit('groupsList', chatGroup);
  });
  socket.on('createGroup', data => {
    console.log('------------->', data);
    chatGroup.unshift({
      id: chatGroup?.length + 1,
      groupName: data.groupName,
      messages: [],
    });
    // socket.emit('getAllGroups')
    socket.emit('groupsList', chatGroup);
  });
  socket.on('deleteGroup', id => {
    chatGroup = chatGroup.filter(group => group.id !== id);
    socket.emit('groupsList', chatGroup);
  });
  // socket.on('findGroup',(id)=>{
  //     console.log("first==========>",id,chatGroup)
  //     const group=chatGroup.filter((group)=>group.id===id)
  //     if(group){
  //         socket.emit('groupMessages',group[0].messages)
  //     }
  // })
  socket.on('findGroup', id => {
    const group = chatGroup.find(group => group.id === id);
    if (group) {
      socket.join(id);
      socket.emit('groupMessages', {messages: group.messages});
    }
  });
  socket.on('sendMessage', data => {
    const group = chatGroup.filter(group => group.id === data.groupId);
    console.log('data============>', data, chatGroup, data.groupId, group);
    if (group) {
      socket.to(group[0].groupName).emit('groupMessage', data.message);
      group[0].messages.unshift({
        mesage: data.message,
        sender: data.sender,
        time: data.timeData,
      });
      socket.emit('groupsList', chatGroup);
      socket.emit('findGroup', group.id);
      socket.to(data.groupId).emit('groupMessages', {messages: group.messages});
    }
    // if(group){
    //     group.messages.push({
    //         id:group.messages.length+1,
    //         message:data.message,
    //         sender:data.sender,
    //         time:data.timeData
    //     })
    //     socket.emit('findGroup',group.id)
    // }
  });
});

app.get('/api', (req, res) => {
  console.log('');
  return res.json(chatGroup);
});

app.get('/', (req, res) => {
  console.log('');
  return res.json('welcome to home page');
});
server.listen(3000, () => {
  console.log('server connect ayyindhi raa pukaaaa');
});
