// handles.js

/**
 * Alterna o valor booleano gerenciado pelo estado.
 * 
 * @param {boolean} info - O valor atual do estado (não utilizado na função).
 * @param {Function} setInfo - Função de atualização de estado que recebe o novo valor booleano.
 */
export function handlBoelano(info, setInfo) {
    setInfo(!info);
}

/**
 * Atualiza o estado do objeto com base no evento de alteração do input.
 * 
 * @param {Event} event - O evento de alteração do input, que contém as propriedades `target.name` e `target.value`.
 * @param {Function} setData - Função de atualização de estado que recebe o novo estado.
 * 
 * @description
 * Esta função é chamada quando um campo do formulário é alterado. Ela atualiza o estado do formulário usando o nome do campo (`event.target.name`)
 * como chave e o valor do campo (`event.target.value`) como o novo valor no estado.
 * 
 */
export function handleChangeObjectEvent(event, setData) {
    const { name, value } = event.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
}


/**
 * Adiciona um novo objeto ao estado atual, mantendo os objetos existentes. Usado para atualizar a lista de objetos
 * 
 * @param {Object} result - O objeto a ser adicionado ao estado.
 * @param {Function} setData - Função de atualização de estado fornecida pelo hook `useState`.
 * 
 * @description
 * Esta função é utilizada para adicionar um novo objeto ao estado que é mantido como uma lista de objetos.
 * O estado atual é atualizado utilizando a função `setData`, que é uma função de atualização de estado.
 * O novo objeto `result` é adicionado ao final da lista de objetos existente.
 * 
 * 
 */
export function handleChangeObject(result, setData) {
    setData((prevState) => [...prevState, result]);
}


/**
 * Processa a mudança de um arquivo de imagem e atualiza o estado com as informações da imagem em formato Base64.
 * 
 * @param {Event} event - O evento de alteração do input, contendo o(s) arquivo(s) selecionado(s).
 * @param {Function} setData - Função de atualização de estado fornecida pelo hook `useState`.
 * 
 * @description
 * Esta função é chamada quando um arquivo de imagem é selecionado através de um input do tipo file. 
 * O arquivo é lido e convertido para uma string Base64. A função extrai o conteúdo Base64, o nome e o tipo MIME do arquivo.
 * Em seguida, atualiza o estado com um objeto que contém essas informações.
 * 
 * O estado é atualizado usando a função `setData`, onde o objeto de imagem é adicionado ao estado atual.
 * 
 */
export function handleChangeImage(event, setData) {
    const { files } = event.target;

    if (files.length > 0) {
        const file = files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64Content = reader.result.split(",")[1]; // Extrai o conteúdo Base64
            const fileName = file.name; // Obtém o nome do arquivo
            const fileType = file.type; // Obtém o tipo MIME do arquivo

            const image = {
                name: fileName,
                type: fileType,
                content: base64Content,
            };
            setData((prevState) => ({ ...prevState, image: image }));
        };

        reader.readAsDataURL(file);
    }
}