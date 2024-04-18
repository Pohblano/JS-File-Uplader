const downloads = $('#download-links')
const request = $.ajax({
  url: "/readFiles",
  method: "GET"
});
 
request.done(function(data) {
  data.map( link => {
    const a = document.createElement('a');
    a.href = link;
    a.innerText = link;
    downloads.append(a)
  })
});
 
request.fail(function( jqXHR, textStatus ) {
  alert( "Request failed: " + textStatus );
});

// $('#submit-upload').on('click', function(e){
//   e.preventDefault();
//   const form = $('#form-upload');
 
//   // const req = $.ajax({
//   //   url: "/upload",
//   //   method: "POST"
//   // });
// });