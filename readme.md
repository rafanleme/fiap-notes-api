# REST API

Rest API para CRUD de notas.

## Install

    npm install

## Run the app

    npm start

# REST API

Os exemplos dos endpoints estão descritos abaixo

## GET lista de notas

### Request

`GET /notes`

    http://localhost:3333/notes

### Response

    []

## Criar uma nova nota

### Request

`POST /notes`

    status 200

    http://localhost:3333/notes

    {"text": "O texto da nota"}

### Response

    status 201 CREATED

    {"id": 3,"date": "2022-01-05T22:56:42.089Z","text": "Lembrar de alguma coisa"}

## GET nota específica

### Request

`GET /notes/id`

    http://localhost:3333/notes/1

### Response

    status 200

    {"id": 3,"date": "2022-01-05T22:56:42.089Z","text": "Lembrar de alguma coisa"}

## GET nota específica não encontrada

### Request

`GET /notes/id`

    http://localhost:3333/notes/999

### Response

    status 404

    {"erro": "Nota não encontrada"}

## DELETE nota específica

### Request

`DELETE /notes/id`

    http://localhost:3333/notes/1

### Response

    status 204

## PUT alterar uma nota específica

### Request

`PUT /notes/id`

    http://localhost:3333/notes/1

### Response

    status 200

    {"id": 3,"date": "2022-01-05T22:56:42.089Z","text": "Lembrar de alguma coisa"}
