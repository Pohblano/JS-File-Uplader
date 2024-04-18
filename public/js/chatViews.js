///////////////////////////////////////////////////
// MESSAGES COMPONENT
///////////////////////////////////////////////////
// Formats messages data to prep for rendering
// function handleConvoMessages(arr) {
//   const allContainer = $('#all-messages-container');
//   // allContainer.children('.msg-wrapper, .msg-default').remove();

//   if (arr.length > 0) {
//     const limitedData = formatData(arr, 10)
//     renderConvoMessages(limitedData, allContainer[0]);
//   } else 
//     allContainer[0].lastElementChild.innerText = `No messages here...`;
// }

// // Renders conversation messages
// function renderConvoMessages(data, container, idx = 0) {
//   data[idx].map(msg => {
//     const msgContainer = document.createElement('div');
//     msgContainer.id = msg.id;
//     msgContainer.className = "msg-wrapper d-flex flex-column";
//     if(msg.author_id !== user.id){
//       msgContainer.classList.add('align-self-end', 'd-flex')
//     }
//     msgContainer.innerHTML = msgHTML(msg);

//     container.insertBefore(msgContainer, container.lastElementChild);
//   });
//   if (idx !== data.length - 1) {
//     container.lastElementChild.innerHTML = `<a href="#" class="more-msg user-link">Show more...</a>`
//     $('.more-msg').on('click', (e) => {
//       e.preventDefault()
//       renderConvoMessages(data, container, idx + 1);
//     })
//   } else
//     container.lastElementChild.innerText = ``;
// }

// HTML for rendered msg
function msgHTML(obj) {
  const id = sessionStorage.getItem('socket-id');
  return `
    ${(id !== obj.author_id) ? `<p class= "msg-author align-self-end"><strong>${obj.ip} </strong></p>` : ''}
    <p class="msg-content px-4 py-1  ${(id !== obj.author_id) ? `msg-receiver` : ''}">${obj.content}</p>
    <p class="msg-details"><small>${obj.created.time}</small></p>`
}



/////// Formats array of data into sections (pagination-like)
function formatData(arr, limit) {
  let count = 0;
  const data = []
  const sections = Math.ceil(arr.length / limit)

  // slice data into sections back into new array
  for (let i = 1; i <= sections; i++) {
    data.push(arr.slice(count, i * limit))
    count += limit
  }
  return data
}
///////////////////////////////////////////////////
// MESSAGES COMPONENT
///////////////////////////////////////////////////
function renderMsg(msg) {
  const id = sessionStorage.getItem('socket-id')
  const allContainer = $('#all-messages-container')[0];
  const msgContainer = document.createElement('div');

  msgContainer.id = msg.id;
  msgContainer.className = "msg-wrapper d-flex flex-column";
  if (msg.author_id !== id) 
    msgContainer.classList.add('align-self-end', 'd-flex')
  msgContainer.innerHTML = msgHTML(msg);

  allContainer.insertBefore(msgContainer, allContainer.lastElementChild);
}

function renderEvent(string){
  const allContainer = $('#all-messages-container')[0];
  const container = document.createElement('div');
  container.className = 'align-self-center'
  container.innerHTML = `<strong>${string}</strong> joined the chat`
  allContainer.insertBefore(container, allContainer.lastElementChild)
}