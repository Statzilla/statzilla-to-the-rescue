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
            response:'text',
            success:function (data) {
                window.location.href = "/game/rating/#last";
            }
        });
        window.location.href = "/game/rating/#last";
    })
})