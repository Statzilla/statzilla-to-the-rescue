$(document).ready(function(){
    $('#push').on('click', function(e){
        e.preventDefault();
        $.ajax({
            type: 'post',
            dataType: 'json',
            url: '/rating/score',
            data:{
                score: counter,
                nickname: $('#name').val()
            },
            response:'text',//тип возвращаемого ответа text либо xml
            success:function (data) {//возвращаемый результат от сервера
                if (data == 'ok') {
                    window.location.href = "/rating";
                } 
                else {
                    alert ('error')
                }
            }
        });
    })
})