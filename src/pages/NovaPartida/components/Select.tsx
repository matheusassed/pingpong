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
      unstyled
      placeholder='Selecione o Jogador'
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          borderColor: state.isFocused ? 'grey' : 'red',
          width: '100%',
          maxWidth: '100%',
          position: 'relative'
        }),
        input: (baseStyles) => ({
          ...baseStyles,
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          input: {
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
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
      }}
    />
  )

}

export default Select