class AbrigoAnimais {
  encontraPessoas(brinquedosPessoaUm, brinquedosPessoaDois, animaisDesejados) {
      //Funções que retornam False se não passarem nas validações ou True se passarem
      //Confere se há repetições
      function confereRepeticao(obj) {  
          const array = [...new Set(obj)]
      
          if (obj.length !== array.length) return false

          return true
      }

      //Confere se os brinquedos informados são válidos
      function validaBrinquedo(brinquedos) {
          for (let brinquedo of brinquedos) {
              if (!(listaBrinquedos.includes(brinquedo))) return false
          }

          return true
      }

      //Transforma os parâmetros em array
      function transformaEmArray(obj) {
          return obj.split(",")
      }

      //Função geral que verifica se os brinquedos da pessoa são os que o animal gosta
      function casoGeral(brinquedos, animal) {
          const animalBrinquedos = listaAnimais[animal].brinquedos

          //Verifica se os brinquedos da pessoa bate com os brinquedos do animal
          //Remove os brinquedos que o animal não gosta para comparar depois
          for (let brinquedo of brinquedos) {
              if (!animalBrinquedos.includes(brinquedo)) {
                  brinquedos = brinquedos.filter(brinquedoFiltrado => brinquedoFiltrado !== brinquedo)
              }
          }

          //Compara se o array que foi retirado os brinquedos que não gosta é igual aos brinquedos que o animal gosta
          if (!animalBrinquedos.every((brinquedo, i) => brinquedo === brinquedos[i])) return false
          
          return true
      }

      //Função que aplica as regras específicas quando o animal é um gato
      function casoGato(brinquedosPessoa, animaisAdotados, animalNome) {
          if (!casoGeral(brinquedosPessoa, animalNome)) return

          //Remove todos os brinquedos da lista dos brinquedos da pessoa que o gato usa, pois ele não divide, logo é como se não existisse mais
          for (let brinquedo of listaAnimais[animalNome].brinquedos) {
              if (brinquedosPessoa.includes(brinquedo)) {
                  let index = brinquedosPessoa.indexOf(brinquedo)
                  brinquedosPessoa.splice(index, 1)
              }
          }

          //Adiciona ao array da pessoa o gato adotado
          return animaisAdotados.push(animalNome)
      }

      //Função que aplica as regras específicas do jabuti
      function casoJabuti(brinquedosPessoa, animaisAdotados, animalNome) {     
          if (casoGeral(brinquedosPessoa, animalNome)) return animaisAdotados.push(animalNome)

          //Aplica a lógica de qualquer brinquedo que o jabuti goste, mesmo fora de ordem, ser considerado para adotá-lo
          if (animaisAdotados.length > 1) {
              if (listaAnimais[animalNome].brinquedos.every(brinquedo => brinquedosPessoa.includes(brinquedo))) {
                  return animaisAdotados.push("Loco")  
              }
          }
      }

      //Adiciona ao array da lista de mensagens que serão exibidas
      function saida(dono, animaisAdotados) {
          for (let animal of animaisAdotados) {
              listaMensagens.lista.push(animal + " - " + dono)
          }

          return listaMensagens.lista.sort()
      } 

      //Constantes das listas de brinquedos e animais
      const listaBrinquedos = ["RATO", "BOLA", "LASER", "CAIXA", "NOVELO", "SKATE"]
      const listaAnimais = {
        Rex: { animal: "CÃO", brinquedos: ["RATO", "BOLA"] },
        Mimi: { animal: "GATO", brinquedos: ["BOLA", "LASER"] },
        Fofo: { animal: "GATO", brinquedos: ["BOLA", "RATO", "LASER"] },
        Zero: { animal: "GATO", brinquedos: ["RATO", "BOLA"] },
        Bola: { animal: "CÃO", brinquedos: ["CAIXA", "NOVELO"] },
        Bebe: { animal: "CÃO", brinquedos: ["LASER", "RATO", "BOLA"] },
        Loco: { animal: "JABUTI", brinquedos: ["SKATE", "RATO"] }
      }

      //Mensagens de erros
      const mensagemErroAnimal = { erro: 'Animal inválido' }
      const mensagemErroBrinquedo = { erro: 'Brinquedo inválido' }

      //Variáveis que armazenam os animais que foram adotados ou deixaram de ser
      let adotadosPessoaUm = [] 
      let adotadosPessoaDois = []
      let abrigo = []

      //Mensagem final que retorna a lista
      let listaMensagens = { lista: [] }
      
      //Transforma a string dos parâmetros em array
      brinquedosPessoaUm = transformaEmArray(brinquedosPessoaUm)
      brinquedosPessoaDois = transformaEmArray(brinquedosPessoaDois)
      animaisDesejados = transformaEmArray(animaisDesejados)

      //Confere se os animais informados são válidos
      for (let animal of animaisDesejados) {
          if (!(animal in listaAnimais)) return mensagemErroAnimal
      }
    
      //Chamam as funções de validações
      if (!confereRepeticao(animaisDesejados)) return mensagemErroAnimal
      if (!validaBrinquedo(brinquedosPessoaUm) || !confereRepeticao(brinquedosPessoaUm)) return mensagemErroBrinquedo
      if (!validaBrinquedo(brinquedosPessoaDois) || !confereRepeticao(brinquedosPessoaDois)) return mensagemErroBrinquedo

      let pessoaUmPodeAdotar = true
      let pessoaDoisPodeAdotar = true

      //For que percorre o array dos animais desejados para adoção
      for (let i = 0; i < animaisDesejados.length; i++) {
          let animalTipo = listaAnimais[animaisDesejados[i]].animal
          let animalNome = animaisDesejados[i]
          let casoGeralPessoaUm = casoGeral(brinquedosPessoaUm, animalNome)
          let casoGeralPessoaDois = casoGeral(brinquedosPessoaDois, animalNome)

          //Se o número de animais adotados for maior que 3, marca com false
          if (adotadosPessoaUm.length > 3) pessoaUmPodeAdotar = false
          if (adotadosPessoaDois.length > 3) pessoaDoisPodeAdotar = false

          //Se ambas as pessoas puderem adotar o mesmo animal, o for passa para o próximo animal e esse animal não é adotado por ninguém
          //Logo ele ficará no abrigo
          if (pessoaDoisPodeAdotar && pessoaUmPodeAdotar) {
              if (casoGeralPessoaUm && casoGeralPessoaDois) continue
          }
          
          //Se o tipo de animal for um cachorro, insere no array se a função geral retornou true
          if (animalTipo === "CÃO") {
              if (casoGeralPessoaUm && pessoaUmPodeAdotar) adotadosPessoaUm.push(animalNome)
              if (casoGeralPessoaDois && pessoaDoisPodeAdotar) adotadosPessoaDois.push(animalNome)
          } else if (animalTipo === "GATO") {
              if (pessoaUmPodeAdotar) casoGato(brinquedosPessoaUm, adotadosPessoaUm, animalNome)
              if (pessoaDoisPodeAdotar) casoGato(brinquedosPessoaDois, adotadosPessoaDois, animalNome)
          } else {
              if (pessoaUmPodeAdotar) casoJabuti(brinquedosPessoaUm, adotadosPessoaUm, animalNome)
              if (pessoaDoisPodeAdotar) casoJabuti(brinquedosPessoaDois, adotadosPessoaDois, animalNome)
          } 
      }
      
      //Insere no array do abrigo animais que não apareceram em nenhuma dos arrays das pessoas dos animais adotados
      //Ou se apareceram nos dois arrays
      for (let animal of animaisDesejados) {
          if ((!adotadosPessoaUm.includes(animal) && !adotadosPessoaDois.includes(animal)) ||
              (adotadosPessoaUm.includes(animal) && adotadosPessoaDois.includes(animal))) {
              abrigo.push(animal)

              adotadosPessoaDois = adotadosPessoaDois.filter(pessoaDoisAdotadoFiltrado => pessoaDoisAdotadoFiltrado !== animal)
              adotadosPessoaUm = adotadosPessoaUm.filter(pessoaUmAdotadoFiltrado => pessoaUmAdotadoFiltrado !== animal)
          }
      }

      saida("pessoa 1", adotadosPessoaUm)
      saida("pessoa 2", adotadosPessoaDois)
      saida("abrigo", abrigo)

      return listaMensagens
  }
}

export { AbrigoAnimais as AbrigoAnimais };