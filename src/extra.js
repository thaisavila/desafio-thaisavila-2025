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
