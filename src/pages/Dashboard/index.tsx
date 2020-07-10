import React, { useState, useEffect, FormEvent } from "react";
import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";

import { Title, Form, Repositories, Error } from "./styles";
import logoImg from "../../assets/Logo.svg";
import api from "../../services/api";

interface Repository {
  full_name: string;
  descripition: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}
const Dashboard: React.FC = () => {
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem("@GithubExplorer");

    if (storagedRepositories) {
      return JSON.parse(storagedRepositories);
    } else {
      return [];
    }
  });
  const [inputError, setInputError] = useState("");
  const [newRepo, setNewRepo] = useState("");

  useEffect(() => {}, []);
  useEffect(() => {
    localStorage.setItem("@GithubExplorer", JSON.stringify(repositories));
  }, [repositories]);
  async function handleAddRepository(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!newRepo) {
      setInputError("Digite o autor/nome do repositório");
      return;
    }

    try {
      const response = await api.get<Repository>(`repos/${newRepo}`);

      const repository = response.data;

      setRepositories([...repositories, repository]);

      setNewRepo("");
    } catch {
      setInputError("Erro na busca por esse repositório");
    }
  }
  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore reposotórios no Github</Title>;
      <Form hasError={Boolean(inputError)} onSubmit={handleAddRepository}>
        <input
          placeholder="Digite o nome do repositório"
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
        />
        <button type="submit">Pesquisar</button>
      </Form>
      {/* Se variável for definida => se tiver algum erro ele só exibe o componente Error */}
      {inputError && <Error>{inputError}</Error>}
      <Repositories>
        {repositories.map((repository) => (
          <Link
            key={repository.full_name}
            to={`/repositories/${repository.full_name}`}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.descripition}</p>
            </div>

            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
