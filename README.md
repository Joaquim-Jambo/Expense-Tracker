# 💰 Expense Tracker CLI

Aplicação de linha de comando para gerenciar despesas pessoais.

## 🚀 Funcionalidades

* Adicionar uma despesa com descrição e valor.
* Atualizar uma despesa existente.
* Deletar uma despesa.
* Listar todas as despesas.
* Exibir um resumo das despesas (com opção de filtrar por mês).

## 🛠️ Tecnologias  

- [Node.js](https://nodejs.org/) – Runtime para executar JavaScript no servidor.  
- [Yargs](https://yargs.js.org/) – Parser de argumentos para linha de comando.  
- [UUID](https://www.npmjs.com/package/uuid) – Geração de identificadores únicos.  
- [FS](https://nodejs.org/api/fs.html) – Módulo nativo para manipulação de arquivos (JSON).  
- [Intl.NumberFormat](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) – Formatação de valores monetários.  

## 📦 Instalação

### Local

```bash
git clone https://github.com/Joaquim-Jambo/Expense-Tracker
cd expense-tracker-cli
npm install
```

Rodar localmente:

```bash
node index.js add -d "Almoço" -a 1500
```

### Global (com `npm link`)

Durante o desenvolvimento, você pode rodar o projeto globalmente com:

```bash
npm link --force
```

Agora pode usar o comando direto:

```bash
expense-tracker add -d "Almoço" -a 1500
```

## ▶️ Uso

Adicionar uma despesa:

```bash
expense-tracker add -d "Almoço" -a 1500
```

Atualizar uma despesa:

```bash
expense-tracker update -i 1 -d "Almoço no KFC" -a 2000
```

Deletar uma despesa:

```bash
expense-tracker delete -i 1
```

Listar todas as despesas:

```bash
expense-tracker list
```

Resumo das despesas (todas):

```bash
expense-tracker summary
```

Resumo das despesas de um mês específico:

```bash
expense-tracker summary --month 9
```

*(exibe apenas despesas de setembro)*

---

## 📚 Referência

Este projeto foi inspirado no desafio da [roadmap.sh](https://roadmap.sh/projects/expense-tracker).

---


