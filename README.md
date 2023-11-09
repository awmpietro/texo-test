# Texo-It Test Dev

## Descrição

Desenvolva uma API RESTful para possibilitar a leitura da lista de indicados e vencedores
da categoria Pior Filme do Golden Raspberry Awards.

## Requisitos

-  Node.js versão 18.16.1
-  yarn
-  Docker (opcional)

## Instalação usando Docker em máquinas Mac ou Linux:

1. Clonar o repositório: [Texo-Test](https://github.com/awmpietro/texo-test)
2. Na raíz, rodar o código: `make init`
   -  Este comando rodará todos os testes de integração e inicializará a API no docker na porta 8080 do seu localhost.
3. Caso o cmd `make` não esteja disponível, rodar utilizando diretamente `docker-compose up`

## Instalação sem Docker (necessários node v18.16.1 e yarn instalados)

1. Clonar o repositório: [Texo-Test](https://github.com/awmpietro/texo-test)
2. Na raíz do repositório rodar o comando: `yarn install`
3. Para rodar a API, use o comando: `yarn dev` ou `yarn start`. A API ficará exposta na porta 8080.
   -  O comando `yarn dev` roda todos os testes de integração e inicia a API em modo de live reloading.

## Testes

1. Na instalação sem Docker, para rodar os testes de integração a qualquer momento: `yarn test`
2. Na instalação com Docker, os testes de integração serão rodados antes do início

## Como Usar

### API

A API possui 1 endpoint:

-  [GET /producers/award-intervals](http://localhost:8080/producers/award-intervals)

**/producers/award-intervals:** Irá retornar o produtor com maior intervalo entre dois prêmios consecutivos, e o que obteve dois prêmios mais rápido de acordo com o arquivo CSV dentro da pasta /src/data

Exemplo de resposta:

```json
{
   "min": [
      {
         "producer": "Bo Derek",
         "interval": 6,
         "previousWin": 1984,
         "followingWin": 1990
      }
   ],
   "max": [
      {
         "producer": "Matthew Vaughn",
         "interval": 13,
         "previousWin": 2002,
         "followingWin": 2015
      }
   ]
}
```
