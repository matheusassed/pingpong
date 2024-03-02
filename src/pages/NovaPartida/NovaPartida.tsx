import { useEffect, useState } from 'react'
import styles from './NovaPartida.module.scss'
import { listaUsuarios, salvarJogador } from '../../service/service'
import { Jogador, Opcao } from '../../types'
import CreatableSelect from 'react-select/creatable'

const criarOpcao = (label: string) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ''),
})

const NovaPartida = () => {
  const [listaJogadoresCadastrados, setListaJogadoresCadastrados] = useState<Opcao[]>([])
  const [carregando, setCarregando] = useState<boolean>(false)

  const [jogador1, setJogador1] = useState<Opcao | null>()
  const [jogador2, setJogador2] = useState<Opcao | null>()

  const buscaListaDeJogadoresCadastrados = async () => {
    const retorno = await listaUsuarios()
    const retornoAjustadoParaSelect:Opcao[] = retorno.map((jogador:Jogador) => ({
      label: jogador.nome,
      value: jogador.nome.toLowerCase().replace(/\W/g, '')
    }))
    setListaJogadoresCadastrados(retornoAjustadoParaSelect)
  }

  const salvaNovoJogador = async (informacoesJogador:Opcao) => {
    await salvarJogador(informacoesJogador.label) 
  }

  const tratarCriacao = (valorInput: string) => {
    setCarregando(true)
    
    const novaOpcao = criarOpcao(valorInput)
    setListaJogadoresCadastrados((prev) => [...prev, novaOpcao])
    setCarregando(false)

    setJogador1(novaOpcao)
    salvaNovoJogador(novaOpcao)
  };

  useEffect(() => {
    buscaListaDeJogadoresCadastrados()
  }, [])

  return(
    <section className={ styles.novaPartida }>
      <div className={ styles.nomeJogador }>
        {
          !!listaJogadoresCadastrados && !!listaJogadoresCadastrados.length &&
          <CreatableSelect
            isClearable
            isDisabled={carregando}
            isLoading={carregando}
            onChange={(novoValor) => setJogador1(novoValor)}
            onCreateOption={tratarCriacao}
            options={listaJogadoresCadastrados}
            value={jogador1}
          />
        }
      </div>
      
      <div className={ styles.mesa }>
        <div className={ styles.areaJogador }>
          <div className={ styles.areaPontuacao }>
            <span>02</span>
          </div>
          <div className={ styles.controles }>
            <div className={ styles.controle }>+</div>
            <div className={ styles.controle }>-</div>
          </div>
        </div>
        <div className={ styles.areaJogador }>
          <div className={ styles.areaPontuacao }>
            <span>05</span>
          </div>
          <div className={ styles.controles }>
            <div className={ styles.controle }>+</div>
            <div className={ styles.controle }>-</div>
          </div>
        </div>
      </div>

      <div className={ styles.nomeJogador }>
        {
          !!listaJogadoresCadastrados && !!listaJogadoresCadastrados.length &&
          <CreatableSelect
            isClearable
            isDisabled={carregando}
            isLoading={carregando}
            onChange={(novoValor) => setJogador2(novoValor)}
            onCreateOption={tratarCriacao}
            options={listaJogadoresCadastrados}
            value={jogador2}
          />
        }
      </div>
    </section>
  );
};

export default NovaPartida;