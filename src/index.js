import fs from 'fs'
import trataErro from "./erros.js"



function extraiLinks(texto) {
    const regex = /\[([^\[\]]*?)\]\((https?:\/\/[^\s?#.]*.[^\s]*)\)/gm

    const capturas = [...texto.matchAll(regex)]

    const resultado = capturas.map((captura) => (
        {
            nome: captura[1],
            url: captura[2]
        }))
    
    return resultado.length !== 0 ? resultado : "Nenhum link encontrado!"
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

