import pegaArquivo from "./index.js"
import trataErro from "./erros.js"
import chalk from "chalk"
import fs from 'fs'

const caminho = process.argv

function imprimeLista(resulto, arquivo) {
    console.log(
        chalk.yellow(`Lendo o arquivo:`), 
        chalk.blueBright(arquivo),
        chalk.white("\nLista de links no arquivo:"),
        resulto,
        "\n\n")
}

async function processaTexto(argumentos) {
    const caminho = argumentos[2]

    try {
        fs.lstatSync(caminho)
    } catch (erro) {
        trataErro(erro)
    }

    const isDiretorio = fs.lstatSync(caminho).isDirectory()
    const isArquivo = fs.lstatSync(caminho).isFile()

    if (isArquivo) {
        const resultado = await pegaArquivo(caminho)
        imprimeLista(resultado, caminho)

    } else if (isDiretorio) {

        const arquivos = await fs.promises.readdir(caminho)
        
        arquivos.forEach(async (arquivo) => {
            const caminhoDoArquivo = `${caminho}/${arquivo}`
            const resultado = await pegaArquivo(caminhoDoArquivo) 

            imprimeLista(resultado, arquivo)

        })
    }
    
}

processaTexto(caminho)