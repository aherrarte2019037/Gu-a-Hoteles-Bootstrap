//Modificar eventos de bootstrap
$('#modalContacto').on('show.bs.modal', function (){
    $('#btnContactarme').prop('disabled', true);
});


$('#modalContacto').on('hide.bs.modal', function (){
    $('#btnContactarme').prop('disabled', false);
    $('#btnContactarme').prop('focus', false);
});


$(function () {
    $('[data-toggle="popover"]').popover()
});


$('.popover-dismiss').popover({
    trigger: 'focus'
});


$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});


$('.carousel').carousel({
    interval: 2900
});


//Mensajes por consola
$('#modalContacto').on('show.bs.modal', function (){
    console.log('Modal creandonse');
});

$('#modalContacto').on('shown.bs.modal', function (){
    console.log('Modal creado');
});

$('#modalContacto').on('hide.bs.modal', function (){
    console.log('Cerrando modal');
});

$('#modalContacto').on('hidden.bs.modal', function (){
    console.log('Modal cerrado');
});
