/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import CreatableSelect from "react-select/creatable"
import { Jogador, Opcao } from "../../../types"
import { salvarJogador } from "../../../service/service"

const criarOpcao = (label: string) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ''),
})

interface SelectProps{
  lista: any;
  setLista: any;
  valor: Jogador | undefined;
  atualizaValor: any;
}

const Select = (props:SelectProps) => {
  const [carregando, setCarregando] = useState<boolean>(false)

  const tratarCriacao = (valorInput: string) => {
    setCarregando(true)
    const novaOpcao = criarOpcao(valorInput)
    props.setLista((prev:Opcao[]) => prev ? [...prev, novaOpcao] : [novaOpcao])
    setCarregando(false)
    props.atualizaValor(novaOpcao)
    salvarJogador(novaOpcao.label)
  };

  return (
    <CreatableSelect
      isClearable
      isDisabled={carregando}
      isLoading={carregando}
      onChange={(novoValor) => props.atualizaValor(novoValor)}
      onCreateOption={tratarCriacao}
      options={props.lista}
      value={props.valor}
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