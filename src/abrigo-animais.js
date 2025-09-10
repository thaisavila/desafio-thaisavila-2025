class AbrigoAnimais {
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    // Tratamento de dados e variáveis globais:
    // Lista de animais e brinquedos válidos
    const animaisValidos = ["Rex", "Mimi", "Fofo", "Zero", "Bola", "Bebe", "Loco"]
    const brinquedosValidos = ["RATO", "BOLA", "LASER", "CAIXA", "NOVELO", "SKATE"]

    // Transformando entradas em listas
    const listaBrinquedosPessoa1 = brinquedosPessoa1.trim().split(",")
    const listaBrinquedosPessoa2 = brinquedosPessoa2.trim().split(",")
    const listaAnimais = ordemAnimais.trim().split(",")
    // Transformando listas em sets
    let setBrinquedosPessoa1 = new Set(listaBrinquedosPessoa1)
    let setBrinquedosPessoa2 = new Set(listaBrinquedosPessoa2)

    // Objeto com animais e seus brinquedos preferidos
    const animais = {
      Rex: { animal: "cão", brinquedos: ["RATO", "BOLA"] },
      Mimi: { animal: "gato", brinquedos: ["BOLA", "LASER"] },
      Fofo: { animal: "gato", brinquedos: ["BOLA", "RATO", "LASER"] },
      Zero: { animal: "gato", brinquedos: ["RATO", "BOLA"] },
      Bola: { animal: "cão", brinquedos: ["CAIXA", "NOVELO"] },
      Bebe: { animal: "cão", brinquedos: ["LASER", "RATO", "BOLA"] },
      Loco: { animal: "jabuti", brinquedos: ["SKATE", "RATO"] },
    };

    let pessoa1PodeAdotar = []
    let pessoa2PodeAdotar = []


    // Validar entradas:
    // Função para verificar se brinquedos ou animais são válidos
    function validarBrinquedosOuAnimais(escolhaDaPessoa, listaValidos,) {
      if (escolhaDaPessoa.some(e => !listaValidos.includes(e))) {
        return true
      }
    }

    // Chamar as funções e parar o código se der erro
    let resultado = validarBrinquedosOuAnimais(listaBrinquedosPessoa1, brinquedosValidos)

    if (resultado) {
      return { erro: 'Brinquedo inválido' }
    }
    resultado = validarBrinquedosOuAnimais(listaBrinquedosPessoa2, brinquedosValidos)
    if (resultado) {
      return { erro: 'Brinquedo inválido' }
    }
    resultado = validarBrinquedosOuAnimais(listaAnimais, animaisValidos)
    console.log(resultado)
    if (resultado) {
      return { erro: 'Animal inválido' }
    }

    // Verificar se os brinquedos estão repetidos
    if (setBrinquedosPessoa1.size != listaBrinquedosPessoa1.length) {
      return { erro: 'Brinquedo inválido' }
    }
    if (setBrinquedosPessoa2.size != listaBrinquedosPessoa2.length) {
      return { erro: 'Brinquedo inválido' }
    }

    /// Minha function de verificacao e gatos
    function verificarBrinquedosPreferidos() {
      let brinquedosGatoPessoa1 = new Set()
      let brinquedosGatoPessoa2 = new Set()
      
      for (let i of listaAnimais) {
        let preferidos = animais[i].brinquedos // Lista com os brinquedos preferidos de cada animal escolhido

        let preferidosIntersecçãoPessoa1 = listaBrinquedosPessoa1.filter(a => preferidos.includes(a))

        if (preferidos.join() === preferidosIntersecçãoPessoa1.join()) {
          pessoa1PodeAdotar.push(true) // O join é porque no js não da pra comparar 2 arrays, tem que transformar em string
        } else {
          pessoa1PodeAdotar.push(false)
        }

        let prefirosIntersecçãoPessoa2 = listaBrinquedosPessoa2.filter(a => preferidos.includes(a))
        if (preferidos.join() == prefirosIntersecçãoPessoa2.join()) {
          pessoa2PodeAdotar.push(true)
        } else {
          pessoa2PodeAdotar.push(false)
        }
      }

    }

    function loco() {
      if (listaAnimais.includes('Loco')) { //Verifica se a pessoa escolheu o Loco
        let indice
        for (let i in listaAnimais) {
          if (listaAnimais[i] === 'Loco') {
            indice = i
          }
          if (pessoa1PodeAdotar[indice] === false) {
            if (pessoa1PodeAdotar.includes(true)) {
              if (listaBrinquedosPessoa1.includes('SKATE') && listaBrinquedosPessoa1.includes('RATO'))
                pessoa1PodeAdotar[indice] = true
            }
          } else {
            let cont = 0
            for (let a of pessoa1PodeAdotar) {
              if (a === true) {
                cont += 1
              }
            }
            if (cont <=1) {
              pessoa1PodeAdotar[indice] = false
            }
          }
          if (pessoa2PodeAdotar[indice] === false) {
            if (pessoa2PodeAdotar.includes(true)) {
              if (listaBrinquedosPessoa2.includes('SKATE') && listaBrinquedosPessoa2.includes('RATO'))
                pessoa2PodeAdotar[indice] = true
            }
          } else {
            let cont = 0
            for (let a of pessoa2PodeAdotar) {
              if (a === true) {
                cont += 1
              }
            }
            if (cont <= 1) {
              pessoa2PodeAdotar[indice] = false
            }
          }
          // Aqui é bom criar uma function pra não ter que repetir o código e no lugar do for in pode usar indexof, fica melhor
        }
      }
    }

    function AmbasComMesmoAnimal() {
      for (let i = 0; i < pessoa1PodeAdotar.length; i++) {
        if (pessoa1PodeAdotar[i] === pessoa2PodeAdotar[i]) {
          pessoa1PodeAdotar[i] = false
          pessoa2PodeAdotar[i] = false
        }
      }
    }

    function maisDe3Animais() {
      let cont = 0
      for (let i in pessoa1PodeAdotar) {
        if (pessoa1PodeAdotar[i] === true) {
          cont += 1
        }
        if (cont > 3 && pessoa1PodeAdotar[i] === true) {
          pessoa1PodeAdotar[i] = false
        }
      }

      cont = 0
      for (let i in pessoa2PodeAdotar) {
        if (pessoa2PodeAdotar[i] === true) {
          cont += 1
        }
        if (cont > 3 && pessoa2PodeAdotar[i] === true) {
          pessoa2PodeAdotar[i] = false
        }
      }
    }

    verificarBrinquedosPreferidos();
    AmbasComMesmoAnimal()
    loco()
    maisDe3Animais()
    

    // Saídas
    let saida = []
    for (let i = 0; i < listaAnimais.length; i++) {
      if (!pessoa1PodeAdotar[i] && !pessoa2PodeAdotar[i]) {
        saida.push(`${listaAnimais[i]} - abrigo`)
      } else if (pessoa1PodeAdotar[i]) {
        saida.push(`${listaAnimais[i]} - pessoa 1`)
      } else if (pessoa2PodeAdotar[i]) {
        saida.push(`${listaAnimais[i]} - pessoa 2`)
      }
    }
    saida.sort()

    let obj = { lista: saida }
    return obj

  }
}

export { AbrigoAnimais as AbrigoAnimais };

// Tentei de todas as formas, mas não consegui fazer a verificação dos gatos :(