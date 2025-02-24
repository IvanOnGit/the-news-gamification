# 📌 Gamificação em The News

Este projeto foi desenvolvido para aumentar o engajamento dos leitores da newsletter "The News" através de um sistema de gamificação inspirado no Duolingo. A plataforma permite que os leitores acompanhem seu streak (sequência de leituras diárias) e estatísticas pessoais, enquanto um painel administrativo possibilita a análise das métricas de engajamento.

## 🚀 Tecnologias Utilizadas

- **Frontend**: React, TypeScript, TailwindCSS
- **Backend**: Node.js, Express, SQL (MySQL/PostgreSQL)
- **ORM**: Sequelize
- **Autenticação**: JWT (JSON Web Token)
- **Estilização**: TailwindCSS
- **Gráficos e Visualizações**: Chart.js

## 🔑 Funcionalidades

### 🎯 Área Logada para Leitores

- Login e registro funcional.
- Exibição do streak atual (quantos dias seguidos o leitor abriu a newsletter).
- - Possibilidade de visualizar artigos 
- Possibilidade de visualizar artigos completos ao clicar em "Ver Mais".

### 📊 Painel Administrativo

- Acesso restrito apenas para administradores (atualmente, apenas [**joao@example.com**](mailto\:joao@example.com)).
- Visualização da quantidade total de usuários e posts.
- Gráficos mostrando padrões de engajamento.

### 🏆 Sistema de Racha

- A cada dia que um usuário abre um artigo, sua racha aumenta.
- Se o usuário não acessar um artigo por um dia, sua racha é reiniciada.
- A data do último clique em um post é armazenada para controle do streak.

## 📂 Estrutura do Banco de Dados

A base de dados contém as seguintes tabelas principais:

### 🧑‍💻 **Usuários**

- `id` (chave primária)
- `nome`
- `email`
- `senha`
- `data_criacao`
- `data_atualizacao`
- `racha`
- `ultimo_click`
- `role` (define se é um usuário comum ou administrador)

### 📝 **Postagens**

- `id` (chave primária)
- `titulo`
- `conteudo`
- `autor_id`
- `data_criacao`
- `data_atualizacao`

## 📈 Melhorias Sugeridas

Além das possíveis melhorias estéticas, sugiro implementar as seguintes funcionalidades:

- Criar um login separado para administradores.
- Melhorar o painel administrativo com mais dados e insights sobre os usuários.
- Adicionar a possibilidade de curtir e comentar nos posts.
- Permitir que os usuários salvem postagens para leitura posterior.
- Implementar um sistema de recompensas para os leitores mais engajados.
- Notificações automáticas para lembrar os usuários de manter sua racha.

## 🎥 Demonstração

Um vídeo demonstrativo mostrando todas as funcionalidades implementadas está disponível.

## 📦 Como Rodar o Projeto

1. Clone o repositório:
   ```sh
   git clone https://github.com/IvanOnGit/the-news-gamification.git
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```
3. Configure as variáveis de ambiente no arquivo `.env`.
4. Execute o servidor:
   ```sh
   node index.js
   ```
5. Execute o front:
    ```sh
   npm start
   ```

## 📩 Contato

Se tiver dúvidas ou sugestões, entre em contato ivansantamans@gmail.com!

---

Este projeto foi desenvolvido como parte do desafio técnico para a empresa Waffle. 🎯

