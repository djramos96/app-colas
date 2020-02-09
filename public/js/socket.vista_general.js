var socket = io();

var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

socket.on('connect', function() {
    // console.log('Conectado');
});

socket.on('disconnect', function() {
    // console.log('Desconectado');

});

socket.on('estadoActual', function(resp) {
    actualizarHTML(resp.ultimos4);
})

socket.on('ultimos4', async function(resp) {
    console.log(resp)
    actualizarHTML(resp.ultimos4);

})

socket.on('atenderTicket', (data) => {

    if (!data.escritorio) {
        return callback({
            err: true,
            mensaje: 'El escritorio es necesario'
        })
    }

    let atenderTicket = ticketControl.atenderTicket(data.escritorio);
    callback(atenderTicket);

});


function actualizarHTML(ultimos4) {

    for (var i = 0; i <= ultimos4.length - 1; i++) {
        console.log(ultimos4[i]);

        lblTickets[i].text('Ticket ' + ultimos4[i].numero);
        lblEscritorios[i].text('Escritorio ' + ultimos4[i].escritorio);
    }

}