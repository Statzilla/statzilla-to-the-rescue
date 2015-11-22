$(document).ready(function(){
    $('#push').on('click', function(e){
        e.preventDefault();
        $.ajax({
            type: 'post',
            dataType: 'json',
            url: '/game/rating/score.php',
            data:{
                score: counter,
                nickname: $('#name').val()
            },
            response:'text',//тип возвращаемого ответа text либо xml
            success:function (data) {//возвращаемый результат от сервера
                window.location.href = "/game/rating";
            }
        });
        window.location.href = "/game/rating";
    })
})