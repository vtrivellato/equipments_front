ready(() => {
    let form = document.getElementById('form-historico')

    if (form !== null && form !== undefined) {
        form.addEventListener('submit', carregaAlarmes)
    }
})

function carregaAlarmes(e) {
    e.preventDefault()

    // modal

    let equipamento = document.getElementById('txt-equipamento').value

    let url = `https://localhost:5001/api/alarmesatuados`
    let filtros = []

    if (equipamento) {
        filtros.push(`chassi=${equipamento}`)
    }

    if (filtros.length > 0) {
        url += `?${filtros.join('&')}`
    }

    console.log(url)

    fetch(url, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            if (data) {
                let table = document.querySelector('#results > tbody')
                table.innerHTML = ''

                for (item of data) {
                    let row = '<tr>'

                    row += `<td>${item.chassi}</td>`
                    row += `<td style="text-align: right;">${item.km}</td>`
                    row += `<td style="text-align: center;">${formataData(new Date(item.dataRevisao))}</td>`
                    row += `<td style="text-align: right;">${item.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>`
                    row += '</tr>'

                    table.innerHTML += row
                }
            } else {
                alert('Não foi possível carregar as revisões. Tente novamente em instantes.')
            }
        })
        .catch(error => {
            alert('Não foi possível carregar as revisões. Tente novamente em instantes.' + error)
        })
}