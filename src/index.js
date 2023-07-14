import chalk from "chalk"
import fs from 'fs'

function extraiLinks(texto) {
    const regex = /\[([^\[\]]*?)\]\((https?:\/\/[^\s?#.]*.[^\s]*)\)/gm

    const capturas = [...texto.matchAll(regex)]

    const resultado = capturas.map((captura) => (
        {
            [captura[1]]: [captura[2]]
        }))
    
    return resultado.length !== 0 ? resultado : "Nenhum link encontrado!"
}


function trataErro(erro) {
    let mensagemErro = ''

    if (erro.code == 'ENOENT') {
        mensagemErro = erro.code + '-> Não foi encontrado o arquivo'
    } else if (erro.code == 'EISDIR') {
        mensagemErro = erro.code + '-> Foi informado um caminho não aponta para um arquivo'
    } else if (erro.code == 'EINVAL') {
        mensagemErro = erro.code + '-> O caminho informado não é válido'
    } else {
        mensagemErro = erro
    }

    throw new Error(chalk.red(mensagemErro))
}

//Função Assiscrona com promises e async/await
async function pegaArquivo(caminhoDoArquivo) {
    try {
        const encoding = 'utf-8'
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding)
        return extraiLinks(texto)

    } catch (erro) {
        trataErro(erro)
    }
}

export default pegaArquivo 

