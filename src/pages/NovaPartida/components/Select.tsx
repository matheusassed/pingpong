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
    />
  )

}

export default Select