import React, { useEffect, useState } from "react";
import { Form } from "./style";

export default function FormLocal() {
  const [nome, setNome] = useState("");
  const [tarefa, setTarefa] = useState("");
  const [listaTarefa, setListaTarefa] = useState([]);
  const [novaLista, setNovaLista] = useState([]);
  const [contador, setContador] = useState(0);

  const armazenaNome = () => {
    localStorage.setItem("guardou", nome);
  };

  function recebeNome() {
    const nomeRecebido = localStorage.getItem("guardou");
    alert(nomeRecebido);
  }

  function atualizaLista() {
    const novaTarefa = [...listaTarefa, tarefa];
    //     setListaTarefa(novaLista);
    //   }
    //   const armazenaTarefas = () => {
    const listaStrig = JSON.stringify(novaTarefa);
    localStorage.setItem("lista", listaStrig);
    setNovaLista(novaTarefa);
  }

  const acessarLista = () => {
    const listaLocalStorage = localStorage.getItem("lista");
    const listaArray = JSON.parse(listaLocalStorage);
    if (listaArray) {
      setListaTarefa(listaArray);
    }
  };

  useEffect(() => {
    acessarLista();
  }, [novaLista]);

  const adicionarUm = () => {
    setContador(contador + 1);
  };

  const subtrairUm = () => {
    setContador(contador - 1);
  };

  useEffect(() => {
    const contadorTela = localStorage.getItem("contador");
    const contadorNumber = JSON.parse(contadorTela);
    setContador(contadorNumber);
  }, []);

  useEffect(() => {
    localStorage.setItem("contador", contador);
  }, [contador]);

  //   const salvaNumeros = () => {
  //     const listaNumeros = [...]
  //   }

  return (
    <Form>
      <h3>Prática 1</h3>
      <label htmlFor="nome">
        nome:
        <input
          name="nome"
          id="nome"
          value={nome}
          onChange={(e) => {
            setNome(e.target.value);
          }}
        />
      </label>
      <div>
        <button onClick={armazenaNome}>Guardar Dados</button>
        <button onClick={recebeNome}>Acessar Dados</button>
      </div>
      <br />
      <h3>Prática 2</h3>
      <label htmlFor="tarefa">
        tarefa:
        <input
          name="tarefa"
          id="tarefa"
          value={tarefa}
          onChange={(e) => {
            setTarefa(e.target.value);
          }}
        />
      </label>
      <button type="button" onClick={atualizaLista}>
        adicionar Tarefa
      </button>
      <ul>
        {listaTarefa.map((task) => {
          return <li key={task}>{task}</li>;
        })}
      </ul>
      <div>
        {/* <button onClick={armazenaTarefas}>Guardar tarefa</button> */}
        <button onClick={acessarLista}>Acessar tarefa</button>
      </div>
      <button onClick={subtrairUm}>-</button>
      {contador}
      <button onClick={adicionarUm}>+</button>
      {/* <button onClick={salvaNumeros}>Salvar</button> */}
    </Form>
  );
}
