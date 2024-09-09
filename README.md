# Gerenciador de Tarefas Frontend

Este é um projeto de Gerenciamento de Tarefas desenvolvido em **Next.js** no front-end e **NestJS** no back-end. O sistema permite que usuários autenticados possam criar, editar, concluir e excluir tarefas. Além disso, uma notificação é exibida sempre que uma tarefa é concluída.

## Funcionalidades

- **Autenticação de Usuário**: A aplicação utiliza o `next-auth` para gerenciamento de sessão e autenticação.
- **CRUD de Tarefas**: Os usuários podem criar, listar, atualizar e deletar tarefas.
- **Marcar como Concluída**: As tarefas podem ser marcadas como concluídas, e uma notificação é exibida.
- **Edição de Tarefas**: As tarefas podem ser editadas (título e descrição).
- **Persistência de Dados**: O back-end foi desenvolvido em **NestJS** com suporte a banco de dados **MySQL** e uso de **TypeORM** para gerenciamento de dados.

## Deploy 
https://gerenciador-de-tarefas-peach.vercel.app

## Email e Senha para teste:
Email: admin@example.com

Password: Admin@1234

## Tecnologias Utilizadas

### Front-end

- **Next.js**: Framework React para a construção da interface.
- **TypeScript**: Tipagem estática para melhor manutenção e escalabilidade.
- **Tailwind CSS**: Estilização das interfaces com utilitários CSS.
- **Next Auth**: Gerenciamento de autenticação e sessões de usuário.
- **State Management**: Utilização da biblioteca Zustand para gerenciamento de estado no front-end.

### Back-end

- **NestJS**: Framework Node.js para construção de APIs robustas e escaláveis.
- **TypeORM**: ORM para integração com banco de dados **MySQL**.
- **JWT**: Tokens JWT são utilizados para autenticação e autorização de usuários.

### Banco de Dados

- **MySQL**: Banco de dados relacional utilizado para armazenar as tarefas dos usuários.

## Instalação

### Clone o Repositório e instale as dependências:

```
git clone https://github.com/CiceroLucas/frontend-desafio-jack-experts.git
cd frontend-desafio-jack-experts
```

### Configure as variáveis de ambiente no arquivo .env
```
NEXTAUTH_URL=http://localhost:8000
NEXTAUTH_SECRET=you_secret_key
```

### Inicie o projeto:
```
npm run dev
```
Acesse a aplicação via http://localhost:3000

## Decisões Técnicas

* **Next.js**: O Next.js foi escolhido pela sua capacidade de renderização híbrida (SSR e SSG), o que melhora a performance da aplicação, principalmente em SEO. Além disso, sua integração nativa com a autenticação via NextAuth simplificou o gerenciamento de sessão e a proteção de rotas.
* **NextAuth**: Decidi utilizar o NextAuth para o gerenciamento de autenticação e sessões devido à sua flexibilidade com diferentes provedores de autenticação (e.g., OAuth, JWT). Ele oferece suporte robusto a JWT, o que permite a autenticação baseada em tokens entre o front-end e o back-end.
* **Zustand**: Para um gerenciamento de estado leve e eficiente, escolhi o Zustand ao invés de Redux ou Context API. O Zustand oferece uma API simplificada e direta para gerenciamento de estados globais, sem o overhead de configurações mais complexas, sendo uma boa escolha para aplicações de pequeno a médio porte como esta.
* **Tailwind CSS**: Para agilizar o desenvolvimento da interface e garantir responsividade, utilizei o Tailwind CSS como ferramenta de estilização. A escolha por Tailwind se deve à sua abordagem baseada em utilitários, o que facilita a criação de interfaces consistentes e modernas, sem a necessidade de escrever folhas de estilo CSS longas.
