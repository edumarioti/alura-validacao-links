import chalk from "chalk"
import fs from 'fs'

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
        console.log(texto)

    } catch (erro) {
        trataErro(erro)
    }
}

// //Função Sincrona
// function pegaArquivo(caminhoDoArquivo) {
//     const encode = 'utf-8'
//     fs.readFile(caminhoDoArquivo, encode, (erro, texto) => {
//         if (erro){

//             trataErro(erro)
//         }        
//         console.log(chalk.green(texto))
//     })
// }

// //Função Assiscrona com promises e then
// function pegaArquivo(caminhoDoArquivo) {
//     const encoding = 'utf-8'
//     fs.promises
//         .readFile(caminhoDoArquivo, encoding)
//         .then((texto) => console.log(chalk.green(texto)))
//         .catch(trataErro)
// }




pegaArquivo('./arquivos/texto.md')
