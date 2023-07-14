import chalk from "chalk"
import fs from 'fs'

function extraiLinks(texto) {
    const regex = /\[([^\[\]]*?)\]\((https?:\/\/[^\s?#.]*.[^\s]*)\)/gm

    const capturas = [...texto.matchAll(regex)]

    const resultado = capturas.map((captura) => (
        {
            [captura[1]]: [captura[2]]
        }))
    
    return resultado
}


function trataErro(erro) {
    let mensagemErro = ''

    if (erro.code == 'ENOENT') {
        mensagemErro = '-> Não foi encontrado o arquivo'
    } else if (erro.code == 'EISDIR') {
        mensagemErro = '-> Foi informado um caminho não aponta para um arquivo'
    } if (erro.code == 'EINVAL') {
        mensagemErro = '-> O caminho informado não é válido'
    } else {
        mensagemErro = erro
    }

    throw new Error(chalk.red(erro.code, mensagemErro))
}

//Função Assiscrona com promises e async/await
async function pegaArquivo(caminhoDoArquivo) {
    try {
        const encoding = 'utf-8'
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding)
        console.log(extraiLinks(texto))

    } catch (erro) {
        trataErro(erro)
    }
}

pegaArquivo('./arquivos/texto.md')

