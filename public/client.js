$(document).ready(() => {
    let socket = io()
    let nick = ''
    $('#name').show()
    $('#form').submit(() => {
        if(nick == '') {
            $('#name').hide()
            if ($('#input').val() === '') {
                window.alert('Campo vazio')
                return false
            }
            socket.emit('connection', $('#input').val())
            nick = $('#input').val()
            $('#input').val('')
            return false
        } else {
            $('#name').hide()
            if ($('#input').val() === '') {
                return false
            }
            socket.emit('message', `${nick} - ${$('#input').val()}`)
            $('#input').val('')
            window.scrollTo(2, document.body.scrollHeight)
            return false
        }
    })

    socket.on('message', (msg) => {
        $('#messages').append($('<li>').text(msg))
        msg = ''
    })

    socket.on('connection', (user) => {
        let usr = `ᗧᗧᗧᗧᗧᗧᗧᗧᗧᗧ ${user} - Conectou ᗤᗤᗤᗤᗤᗤᗤᗤᗤᗤ`
        $('#users').text(usr).addClass('green').fadeToggle(2000)
        user = ''
    })
})