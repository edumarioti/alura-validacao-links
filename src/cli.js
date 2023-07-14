import pegaArquivo from "./index.js"
import trataErro from "./erros.js"
import listaValdiada from "./http-validacao.js"
import chalk from "chalk"
import fs from 'fs'

const caminho = process.argv

async function imprimeLista(valida, resultado, arquivo) {
    
    if (valida) {
        console.log(
            chalk.yellow(`Lendo o arquivo:`), 
            chalk.blueBright(arquivo),
            chalk.white("\nLista de links validos no arquivo:"),
            await listaValdiada(resultado),
            "\n\n")
            
    } else {
        console.log(
            chalk.yellow(`Lendo o arquivo:`), 
            chalk.blueBright(arquivo),
            chalk.white("\nLista de links no arquivo:"),
            resultado,
            "\n\n")

    }
}

async function processaTexto(argumentos) {
    const caminho = argumentos[2]
    const valida = argumentos[3] === '--valida'

    try {
        fs.lstatSync(caminho)
    } catch (erro) {
        trataErro(erro)
    }

    const isDiretorio = fs.lstatSync(caminho).isDirectory()
    const isArquivo = fs.lstatSync(caminho).isFile()

    if (isArquivo) {
        const resultado = await pegaArquivo(caminho)
        imprimeLista(valida, resultado, caminho)

    } else if (isDiretorio) {

        const arquivos = await fs.promises.readdir(caminho)
        
        arquivos.forEach(async (arquivo) => {
            const caminhoDoArquivo = `${caminho}/${arquivo}`
            const resultado = await pegaArquivo(caminhoDoArquivo) 

            imprimeLista(valida, resultado, arquivo)

        })
    }
    
}

processaTexto(caminho)