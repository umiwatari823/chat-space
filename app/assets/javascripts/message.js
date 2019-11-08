$(function(){
    function buildHTML(message) {  
    var content = message.content ? `${ message.content }` : "";
    var image = message.image.url ? `<img src= ${ message.image.url }>` : "";
    var html = `<div class="message" data-id="${message.id}">
                <div class="message__upper-info">
                <p class="message__upper-info__talker">
                    ${message.user_name}
                </p>
                <p class="message__upper-info__date">
                    ${message.date}
                </p>
                </div>
                <p class="lower-message">
                <div>
                ${content}
                </div>
                ${image}
                </p>
            </div>`
        return html;
        }  
    $('#new_message').on('submit', function(e){
        e.preventDefault();
        var message = new FormData(this); 
        var url = $(this).attr('action');
        $.ajax({
          url: url,
          type:'POST',
          data: message,
          dataType: 'json',
          processData: false,
          contentType: false
        })
        .done(function(data){
          var html = buildHTML(data);
          $('.messages').append(html);
          $('#new_message')[0].reset(); 
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
        })
        .fail(function(data){
          alert('エラー');
      })
        .always(function(data){
          $('.form__submit').prop('disabled', false);
      })
    })
    var reloadMessages = function() {
        last_message_id = $('.message').last().data("id");
        var url = 'api/messages'
        $.ajax({
          url: url,
          type: 'get',
          dataType: 'json',
          data: {id: last_message_id}
        })
        
    .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function (message) {
        insertHTML = buildHTML(message);
        $('.messages').append(insertHTML);
          })
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight},);
        })
        .fail(function(data){
            alert('自動更新失敗');
        });
    
      };
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
      setInterval(reloadMessages, 10000);
      }
  });
