ready(() => {
    let form = document.getElementById('form-equipamentos')

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

    let equipamento = {
        numeroSerie: document.getElementById('txt-serie').value,
        nome: document.getElementById('txt-nome').value,
        tipo: parseInt(document.getElementById('sel-tipos').value)
    }

    fetch(`https://localhost:5001/api/equipamentos`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(equipamento)
    })
        .then(response => response.json())
        .then(data => {
            if (data) {
                limpaForm('form-equipamentos')

                alert('Equipamento gravado com sucesso.')
            } else {
                alert('Foi encontrado um problema ao gravar o equipamento. Revise os dados e tente novamente em instantes.')
            }
        })
        .catch(error => {
            alert('Foi encontrado um problema ao gravar o equipamento. Revise os dados e tente novamente em instantes.')
        })
}

function converteData(target) {
    let obj = document.getElementById(target)

    let s = obj.value.split('-')

    return new Date(s[0], s[1], s[2])
}

function carrega() {
    let serie = document.getElementById('txt-serie').value

    fetch(`https://localhost:5001/api/equipamentos/${serie}`, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            if (!data) {
                alert(`Problema ao carregar ${resource} do servidor.`)
            } else {
                if (data) {
                    let serie = document.getElementById('txt-serie')
                    serie.value = data.numeroSerie
                    validaCampos(serie)
                    serie.disabled = true

                    let nome = document.getElementById('txt-nome')
                    nome.value = data.nome
                    validaCampos(nome)
                    nome.disabled = true
                    
                    let tipo = document.getElementById('sel-tipos')
                    let opcoes = tipo.getElementsByTagName('option')

                    for (item of opcoes) {
                        if (String(item.innerHTML).toLowerCase() === data.tipo.toLowerCase()) {
                            tipo.value = item.value
                            validaCampos(tipo)
                            tipo.disabled = true
                        }
                    }

                    let btnGravar = document.getElementById('btn-gravar')
                    btnGravar.disabled = true
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
    limpaForm('form-equipamentos')

    let btnGravar = document.getElementById('btn-gravar')
    btnGravar.disabled = false
}