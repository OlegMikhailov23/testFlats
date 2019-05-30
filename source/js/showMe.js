$(function() {
    $('#showMe').on('click', function(e) {
        e.preventDefault();
        $("#moreCards").load("moreCards.html .cards__container-wrapper") && $('#showMe').slideUp('1000');
    })
});