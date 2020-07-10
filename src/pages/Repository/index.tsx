import React, { useEffect, useState } from "react";
import { useRouteMatch, Link } from "react-router-dom";
import { FiChevronsLeft, FiChevronRight } from "react-icons/fi";

import { Header, RepositoryInfo, Issues } from "./styles";
import api from "../../services/api";
import logoImg from "../../assets/Logo.svg";
interface RepositoryParams {
  repository: string;
}
interface Repository {
  full_name: string;
  descripition: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface Issues {
  id: number;
  title: string;
  html_ulr: string;
  user: {
    login: string;
  };
}
const Repository: React.FC = () => {
  //pegar parametros da rota /:repository => configuração feita no arquivo de routes
  const { params } = useRouteMatch<RepositoryParams>();
  const [repository, setRepository] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issues[]>([]);

  useEffect(() => {
    api.get(`repos/${params.repository}`).then((response) => {
      setRepository(response.data);
    });

    api.get(`repos/${params.repository}/issues`).then((response) => {
      setIssues(response.data);
    });
  }, [params.repository]);
  return (
    <>
      <Header>
        <img src={logoImg} alt="Guihub Explorer" />
        <Link to="/">
          <FiChevronsLeft size={16} />
          Voltar
        </Link>
      </Header>

      {repository && (
        <RepositoryInfo>
          <header>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.descripition}</p>
            </div>
          </header>

          <ul>
            <li>
              <strong>1808</strong>
              <span>{repository.stargazers_count}</span>
            </li>
            <li>
              <strong>48</strong>
              <span>{repository.forks_count}</span>
            </li>
            <li>
              <strong>67</strong>
              <span>{repository.open_issues_count}</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}
      <Issues>
        {issues.map((issue) => (
          <a key={issue.id} href={issue.html_ulr}>
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Issues>
    </>
  );
};

export default Repository;
