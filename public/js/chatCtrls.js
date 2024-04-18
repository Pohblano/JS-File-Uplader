
// SOCKET CLIENT
const socket = io.connect('http://localhost:3030');

///////////////////////////////////////////////////
// Socket Events
///////////////////////////////////////////////////
// Save socket ID
socket.on('joined', function(data){
  sessionStorage.setItem('socket-id', data)
  renderEvent(data)
});

// Display msg
socket.on('msg', function(msg){
  renderMsg(msg)
})

socket.on('lobby', data => console.log(data))
///////////////////////////////////////////////////
// Join/Leave Chat
///////////////////////////////////////////////////
const room = 'TLM';
$('#join-chat').on('click', function(e){
  e.preventDefault();
  socket.emit('join', room);
})

$('#leave-chat').on('click', function(e){
  e.preventDefault();
  socket.emit('leave', room);
})

///////////////////////////////////////////////////
// Send Chat
///////////////////////////////////////////////////

const section = $('#convo-section')
// Submit message
section.on('keydown', '.input-msg', function (e) {
  if (e.keyCode === 13) msgHandler(e)
});

function msgHandler(e) {
  e.preventDefault();
  const input = $('.input-msg')[0],
    // id = socket.id,
    date = new Date(),
    msg = {
      author_id: socket.id,
      content: input.value,
      created: {
        date: date.toLocaleDateString(),
        time: date.toLocaleTimeString()
      }
    }

  if (input.value) {
    socket.emit('msg-sent', msg)
    input.value = '';
  } else return false;
}