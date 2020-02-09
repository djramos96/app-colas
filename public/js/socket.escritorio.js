var socket = io();

var searchParams = new URLSearchParams(window.location.search);

var label = $('small');

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');


socket.on('connect', function() {
    // console.log('Conectado');
});

socket.on('disconnect', function() {
    // console.log('Desconectado');

});

$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio }, function(siguienteTicket) {

        if (siguienteTicket == 'No hay tickets') {
            label.text = siguienteTicket;
            alert(siguienteTicket);
            return;
        }

        label.text(siguienteTicket.numero);
    })
});