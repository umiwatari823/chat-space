$(function(){
    $(document).on('turbolinks:load', function(){
    function buildHTML(message) {  
    var content = message.content ? `${ message.content }` : "";
    var image = message.image ? `<img src= ${ message.image }>` : "";
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
            $('#message_content').val(''); 
            $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
        })
        .fail(function(data){
            alert('エラー');
      })
        .always(function(data){
          $('.form__submit').prop('disabled', false);
      })
    })
    })
    });
