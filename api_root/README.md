
# Django API - Job and Image Management

## Overview

Esta API oferece endpoints para a criação, leitura, atualização e exclusão de registros de `Job` e `Image`. 
A API também suporta a manipulação de imagens associadas aos trabalhos, permitindo operações como inclusão, 
atualização e remoção de imagens.

**Requisitos:**
- Python 3.8+
- Django 4.0+
- Django REST Framework
- pycon2
- Banco de dados PostgreSQL (ou outro)


**Passos de Instalação:**
1. Clone o repositório:
   ```bash
   https://github.com/rafaelpm0/jober
   cd front
   ```

2. Crie um ambiente virtual e instale as dependências:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # No Windows use `venv\Scripts\activate`
   pip install -r requirements.txt
   ```

### Endpoints

#### 1. `/job_manager` (GET, POST, PUT, DELETE)

Este endpoint lida com a gestão de trabalhos (`Job`) e imagens associadas.

##### GET `/job_manager`

- **Descrição:** Retorna detalhes de um ou mais trabalhos.
- **Parâmetros de Query:**
  - `id` (opcional): ID específico do trabalho para buscar.
  - `all` (opcional, padrão=`false`): Se `true`, retorna todos os trabalhos.
  - `include_image` (opcional, padrão=`false`): Se `true`, inclui detalhes da imagem associada.
  - `inst_img` (opcional, padrão=`false`): Se `true`, verifica e inclui a existência de uma imagem associada.
- **Respostas:**
  - `200 OK`: Retorna os detalhes do trabalho ou lista de trabalhos.
  - `400 Bad Request`: Erro de formato de ID ou outros erros inesperados.
  - `404 Not Found`: Trabalho não encontrado.

##### POST `/job_manager`

- **Descrição:** Cria um novo trabalho e, opcionalmente, uma imagem associada.
- **Parâmetros de Corpo:**
  - `job_name` (obrigatório): Nome do trabalho.
  - `job_description` (obrigatório): Descrição do trabalho.
  - `image` (opcional): Objeto contendo os detalhes da imagem associada.
- **Respostas:**
  - `201 Created`: Trabalho criado com sucesso.
  - `400 Bad Request`: Dados inválidos.

**Exemplo de JSON Enviado:**
```json
{
  "job_name": "Desenvolvimento de API",
  "job_description": "Desenvolvimento de uma API Django para gerenciar trabalhos e imagens.",
  "image": {
    "name": "imagem.png",
    "type": "image/png",
    "content": "base64string"
  }
}
```

**Resposta Esperada:**
```json
{
  "id": 1,
  "job_name": "Desenvolvimento de API",
  "job_create_at": "2024-08-31T12:00:00Z",
  "job_description": "Desenvolvimento de uma API Django para gerenciar trabalhos e imagens.",
  "image": {
    "name": "imagem.png",
    "type": "image/png",
    "content": "base64string"
  },
  "del_image": false,
  "has_image": true
}
```

##### PUT `/job_manager`

- **Descrição:** Atualiza um trabalho existente.
- **Parâmetros de Corpo:**
  - `id` (obrigatório): ID do trabalho a ser atualizado.
  - `job_name` (opcional): Novo nome do trabalho.
  - `job_description` (opcional): Nova descrição do trabalho.
  - `image` (opcional): Novo objeto contendo os detalhes da imagem associada.
  - `del_image` (opcional, padrão=`false`): Se `true`, exclui a imagem associada ao trabalho.
- **Respostas:**
  - `202 Accepted`: Trabalho atualizado com sucesso.
  - `400 Bad Request`: Dados inválidos.

**Exemplo de JSON Enviado:**
```json
{
  "id": 1,
  "job_name": "Atualização da API",
  "job_description": "Atualização da API para incluir novos endpoints.",
  "del_image": true
}
```

**Resposta Esperada:**
```json
{
  "id": 1,
  "job_name": "Atualização da API",
  "job_create_at": "2024-08-31T12:00:00Z",
  "job_description": "Atualização da API para incluir novos endpoints.",
  "image": null,
  "del_image": true
}
```

##### DELETE `/job_manager`

- **Descrição:** Exclui um trabalho existente.
- **Parâmetros de Query:**
  - `id` (obrigatório): ID do trabalho a ser excluído.
- **Respostas:**
  - `204 No Content`: Trabalho excluído com sucesso.
  - `404 Not Found`: Trabalho não encontrado.

### Modelos

#### Job

O modelo `Job` representa um trabalho que pode ter uma imagem associada.

- **Campos:**
  - `job_name` (CharField): Nome do trabalho. Obrigatório, máximo de 350 caracteres.
  - `job_create_at` (DateTimeField): Data e hora da criação do trabalho. Preenchido automaticamente no momento da criação.
  - `job_description` (CharField): Descrição do trabalho. Obrigatório, máximo de 3000 caracteres.

**Exemplo de JSON:**
```json
{
  "job_name": "Desenvolvimento de API",
  "job_description": "Desenvolvimento de uma API Django para gerenciar trabalhos e imagens."
}
```

#### Image

O modelo `Image` representa uma imagem associada a um trabalho (`Job`).

- **Campos:**
  - `job` (OneToOneField): Chave estrangeira que cria uma relação de um-para-um com o modelo `Job`. Se o Job for excluído, a imagem associada também será removida.
  - `name` (CharField): Nome do arquivo de imagem. Máximo de 350 caracteres.
  - `type` (CharField): Tipo MIME do arquivo. Máximo de 50 caracteres.
  - `content` (TextField): Conteúdo da imagem em formato Base64.

**Exemplo de JSON:**
```json
{
  "name": "imagem.png",
  "type": "image/png",
  "content": "base64string",
  "job_id": 1
}
```
