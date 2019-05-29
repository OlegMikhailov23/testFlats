$(function() {
	$('#mailField').blur(function() {
    var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
    if (testEmail.test(this.value)) $('#mailField').css({'background-color':'#b4fbd0','transition':'1s'});
    else alert('Введен некорректный e-mail');
})
});