ready(() => {
    let form = document.getElementById('form-alarmes')

    if (form !== null && form !== undefined) {
        form.addEventListener('submit', grava)
    }

    let btnBusca = document.getElementById('btn-busca')

    if (btnBusca !== null && btnBusca !== undefined) {
        btnBusca.addEventListener('click', carrega)
    }

    let btnLimpar = document.getElementById('btn-limpar')

    if (btnLimpar !== null && btnLimpar !== undefined) {
        btnLimpar.addEventListener('click', limparTudo)
    }
})

function grava(e) {
    e.preventDefault()

    // modal

    let alarme = {
        equipamentoPK: document.getElementById('txt-equipamento').value,
        descricao: document.getElementById('txt-descricao').value,
        classificacao: parseInt(document.getElementById('sel-classificacao').value)
    }

    fetch(`https://localhost:5001/api/alarmes`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(alarme)
    })
        .then(response => response.json())
        .then(data => {
            if (data) {
                limpaForm('form-alarmes')

                alert('Alarme gravado com sucesso.')
            } else {
                alert('Foi encontrado um problema ao gravar o alarme. Revise os dados e tente novamente em instantes.')
            }
        })
        .catch(error => {
            alert('Foi encontrado um problema ao gravar o alarme. Revise os dados e tente novamente em instantes.')
        })
}

function converteData(target) {
    let obj = document.getElementById(target)

    let s = obj.value.split('-')

    return new Date(s[0], s[1], s[2])
}

function carrega() {
    let serie = document.getElementById('txt-equipamento').value

    fetch(`https://localhost:5001/api/equipamentos/${serie}`, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            if (!data) {
                alert(`Problema ao carregar ${resource} do servidor.`)
            } else {
                if (data) {
                    let serie = document.getElementById('txt-equipamento')
                    serie.value = data.numeroSerie
                    validaCampos(serie)
                    serie.disabled = true

                    let a = serie.parentElement.getElementsByTagName('a')
                    let img = a[0].parentElement.getElementsByTagName('img')
                    console.log(img[0])
                    img[0].src = '../public/assets/check.png'
                } else {
                    alert('Equipamento não encontrado.')
                }
            }
        })
        .catch(error => {
            alert('Foi encontrado um problema ao carregar o equipamento. Tente novamente em instantes.')
        })
}

function limparTudo() {
    limpaForm('form-alarmes')

    let serie = document.getElementById('txt-equipamento')
    let a = serie.parentElement.getElementsByTagName('a')
    let img = a[0].parentElement.getElementsByTagName('img')
    console.log(img[0])
    img[0].src = '../public/assets/magnifier.png'

    let btnGravar = document.getElementById('btn-gravar')
    btnGravar.disabled = false
}