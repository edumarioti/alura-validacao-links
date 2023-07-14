import chalk from "chalk"
import fs from 'fs'

function trataErro(erro) {
    let mensagemErro = ''

    if (erro.code == 'ENOENT') {
        mensagemErro = '-> Não foi encontrado o arquivo'
    } else if (erro.code == 'EISDIR') {
        mensagemErro = '-> Foi informado um caminho não aponta para um arquivo'
    } 

    throw new Error(chalk.red(erro.code, mensagemErro))
}

function pegaArquivo(caminhoDoArquivo) {
    const encode = 'utf-8'
    fs.readFile(caminhoDoArquivo, encode, (erro, texto) => {
        if (erro){
            console.log(erro)
            trataErro(erro)
        }
            
        console.log(chalk.green(texto))
    })
}

pegaArquivo('./arquivos/texto.md')