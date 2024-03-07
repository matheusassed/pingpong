import { useEffect, useState } from 'react'
import styles from './NovaPartida.module.scss'
import { listaUsuarios, registrarPartida } from '../../service/service'
import { Jogador } from '../../types'
import Select from '../../components/Select'
import { FaMinus, FaPlus } from "react-icons/fa";
import CircularProgress from '@mui/material/CircularProgress';
import { Alert, Stack } from '@mui/material'

const NovaPartida = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [listaJogadoresCadastrados, setListaJogadoresCadastrados] = useState<Jogador[]>()
  const [jogador1, setJogador1] = useState<Jogador | null>(null)
  const [jogador2, setJogador2] = useState<Jogador | null>(null)
  const [pontuacaoJogador1, setPontuacaoJogador1] = useState<number>(0)
  const [pontuacaoJogador2, setPontuacaoJogador2] = useState<number>(0)
  const [alert, setAlert] = useState<'none' | 'success' | 'error'>('none')

  const resetAlert = (tempo:number) => {
    setTimeout(() => {
      setAlert('none')
    }, tempo*1000)
  }

  const buscaListaDeJogadoresCadastrados = async () => {
    const retorno:Jogador[] = await listaUsuarios()
    setListaJogadoresCadastrados(retorno)
    setLoading(false)
  }

  const reset = () => {
    setPontuacaoJogador1(0)
    setPontuacaoJogador2(0)
    setJogador1(null)
    setJogador2(null)
  }

  const validaESalvaPartida = async () => {
    setLoading(true)
    if(jogador1 && jogador2 && (pontuacaoJogador1 || pontuacaoJogador2)){
      await registrarPartida(jogador1, jogador2, pontuacaoJogador1, pontuacaoJogador2)
      setAlert('success')
      resetAlert(3)
    }
    reset()
    setLoading(false)
  }

  useEffect(() => {
    buscaListaDeJogadoresCadastrados()
  }, [])

  return(
    <>
    {
      !!alert && alert !== 'none' &&
      <div className={ styles.alert }>
        <Alert severity={alert}>
          { alert === 'error' && 'Erro ao salvar partida' }
          { alert === 'success' && 'Partida salva com sucesso' }
        </Alert>
      </div>
    }
    {
      loading ? 
      <div className={ styles.loading }>
        <Stack 
          sx={{color: '#F2EFEB'}}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress color='inherit' size='4em' />
        </Stack>
      </div>
      :
      <section className={ styles.novaPartida }>
        <div className={ styles.nomeJogador }>
          {
            !!listaJogadoresCadastrados && !!listaJogadoresCadastrados.length &&
            <Select 
              listaJogadoresCadastrados={listaJogadoresCadastrados}
              setListaJogadoresCadastrados={((a:Jogador[]) => setListaJogadoresCadastrados(a))}
              valor={jogador1}
              setJogador={(a:Jogador) => setJogador1(a)}
            />
          } 
        </div>
        
        <div className={ styles.mesa }>
          <div className={ styles.areaJogador }>
            <div className={ styles.areaPontuacao }>
              <span>{pontuacaoJogador1}</span>
            </div>
            <div className={ styles.controles }>
              <div 
                className={ styles.controle }
                onClick={() => setPontuacaoJogador1(pontuacaoJogador1+1)}
              >
                <FaPlus color='#F2EFEB' size='2em' />
              </div>
              <div 
                className={ styles.controle }
                onClick={() => pontuacaoJogador1 > 0 ? setPontuacaoJogador1(pontuacaoJogador1-1) : setPontuacaoJogador1(0)}
              >
                <FaMinus color='#F2A391' size='2em' />
              </div>
            </div>
          </div>

          <div 
            className={ styles.enviar }
            onClick={() => validaESalvaPartida()}
          >
            Salvar
          </div>
          
          <div className={ styles.areaJogador }>
            <div className={ styles.areaPontuacao }>
              <span>{pontuacaoJogador2}</span>
            </div>
            <div className={ styles.controles }>
              <div 
                className={ styles.controle }
                onClick={() => setPontuacaoJogador2(pontuacaoJogador2+1)}
              >
                <FaPlus color='#F2EFEB' size='2em' />
              </div>
              <div 
                className={ styles.controle }
                onClick={() => pontuacaoJogador2 > 0 ? setPontuacaoJogador2(pontuacaoJogador2-1) : setPontuacaoJogador2(0)}
              >
                <FaMinus color='#F2A391' size='2em' />
              </div>
            </div>
          </div>
        </div>

        <div className={ styles.nomeJogador }>
          {
            !!listaJogadoresCadastrados && !!listaJogadoresCadastrados.length &&
            <Select 
              listaJogadoresCadastrados={listaJogadoresCadastrados}
              setListaJogadoresCadastrados={((a:Jogador[])=>setListaJogadoresCadastrados(a))}
              valor={jogador2}
              setJogador={(a:Jogador) => setJogador2(a)}
            />
          }
        </div>
      </section>
    }
    </>
  );
};

export default NovaPartida;