# Como Rodar a Aplicação React com Vite e TypeScript

Este tutorial explica como configurar e rodar uma aplicação React com Vite e TypeScript que está hospedada em um repositório no GitHub.

## Pré-requisitos

Certifique-se de que você tenha os seguintes itens instalados no seu sistema:

1. **Node.js** (versão 14 ou superior)
   - [Baixar Node.js](https://nodejs.org/)
2. **Git**
   - [Baixar Git](https://git-scm.com/)
3. **Editor de Código** (opcional, mas recomendado)
   - [Visual Studio Code](https://code.visualstudio.com/)

## Passo a Passo

### 1. Clonar o Repositório

Abra o terminal e execute o comando abaixo para clonar o repositório:

```bash
git clone https://github.com/usuario/nome-do-repositorio.git
```

Substitua `https://github.com/usuario/nome-do-repositorio.git` pela URL do repositório que você deseja clonar.

### 2. Acessar o Diretório do Projeto

Após clonar o repositório, entre no diretório do projeto:

```bash
cd nome-do-repositorio
```

### 3. Instalar as Dependências

Instale as dependências do projeto utilizando o npm (ou yarn, se preferir):

```bash
npm install
```

> **Nota:** Se você estiver usando Yarn, substitua `npm install` por `yarn`.

### 4. Rodar o Servidor de Desenvolvimento

Para iniciar o servidor de desenvolvimento, execute o comando:

```bash
npm run dev
```

Se tudo estiver configurado corretamente, você verá algo semelhante no terminal:

```plaintext
VITE v3.x.x  ready in x ms
  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
```

### 5. Abrir no Navegador

Abra o navegador e acesse a URL:

```
http://localhost:5173/
```

Agora você verá sua aplicação React rodando!

## Scripts Adicionais

Além de `npm run dev`, o projeto pode incluir outros scripts úteis no arquivo `package.json`. Aqui estão alguns comuns:

- **Build da aplicação**:
  ```bash
  npm run build
  ```
  Gera uma versão otimizada da aplicação para produção na pasta `dist`.

- **Pré-visualizar o build**:
  ```bash
  npm run preview
  ```
  Inicia um servidor para pré-visualizar o build.

- **Testes** (se configurados):
  ```bash
  npm test
  ```

## Dicas de Solução de Problemas

- **Erro de Porta Ocupada:**
  Se a porta `5173` já estiver em uso, você pode especificar outra porta:
  ```bash
  npm run dev -- --port=3000
  ```

- **Dependências Faltando:**
  Certifique-se de rodar `npm install` antes de executar o servidor.

- **Erro no Navegador:**
  Verifique o console do navegador para mensagens de erro e corrija possíveis problemas no código.

---

Se tiver dúvidas ou problemas, consulte a [documentação oficial do Vite](https://vitejs.dev/) ou entre em contato com o mantenedor do repositório.
