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
            success: function (data) {//возвращаемый результат от сервера
                if (data.status === 1){
                    window.location.href = "/game/rating/#last";
                }
            }
        });
    })
})