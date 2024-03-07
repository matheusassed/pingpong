/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import CreatableSelect from "react-select/creatable"
import { Jogador, Opcao } from "../types"
import { listaUsuarios, salvarJogador } from "../service/service"

interface SelectProps{
  listaJogadoresCadastrados: Jogador[];
  setListaJogadoresCadastrados: any;
  valor: Jogador | null;
  setJogador: any;
}

const Select = (props:SelectProps) => {
  const [carregando, setCarregando] = useState<boolean>(false)

  const converterJogadorParaOpcao = (jogador:Jogador) => {
    return {
      value: jogador.id.toString(), 
      label: jogador.name
    }
  }
  const converterOpcaoParaJogador = (opcao:Opcao) => {
    if(!opcao){
      return undefined
    }
    return {
      id: Number(opcao.value), 
      name: opcao.label
    }
  }

  const tratarCriacao = async (valorInput: string) => {
    setCarregando(true)
    const novoJogador:Jogador[] = await salvarJogador(valorInput)
    const retorno:Jogador[] = await listaUsuarios()
    props.setListaJogadoresCadastrados(retorno)
    props.setJogador(novoJogador[0])
    setCarregando(false)
  };

  return (
    <CreatableSelect
      isClearable
      isDisabled={carregando}
      isLoading={carregando}
      onChange={(n:any) => props.setJogador(converterOpcaoParaJogador(n))}
      onCreateOption={tratarCriacao}
      options={props.listaJogadoresCadastrados.map((jogador:Jogador) => converterJogadorParaOpcao(jogador))}
      value={props.valor ? converterJogadorParaOpcao(props.valor) : null}
      menuPlacement="auto"
      unstyled
      placeholder='Selecione o Jogador'
      minMenuHeight={690}
      maxMenuHeight={800}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          width: '100%',
          maxWidth: '100%',
          position: 'relative',
          backgroundColor: state.isFocused ? '#1C3640' : 'transparent',
          borderRadius: '8px'
        }),
        menu: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: '#1C3640',
          fontSize: '1.8em',
          borderRadius: '8px'
        }),
        input: (baseStyles) => ({
          ...baseStyles,
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '1.8em',
          input: {
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '1.8em',
          },
          '::after': {
            gridArea: '0',
            minWidth: 0,
            width: 0
          }
        }),
        indicatorsContainer: (baseStyles) => ({
          ...baseStyles,
          position: 'absolute',
          top: '50%',
          right: '0',
          transform: 'translateY(-50%)'
        }),
        dropdownIndicator: (baseStyles) => ({
          ...baseStyles,
          display: 'none'
        }),
        placeholder: (baseStyles) => ({
          ...baseStyles,
          fontSize: '1.8em'
        }),
        option: (baseStyles) => ({
          ...baseStyles,
          ':hover': {
            color: '#F2A391'
          }
        }),
        singleValue: (baseStyles) => ({
          ...baseStyles,
          fontSize: '1.8em'
        }),
      }}
    />
  )

}

export default Select