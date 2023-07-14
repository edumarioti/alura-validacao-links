import chalk from "chalk"

function trataErro(erro) {
    let mensagemErro = ''

    if (erro.code === 'ENOENT') {
        mensagemErro = erro.code + '-> Não foi encontrado o arquivo ou caminho especificado'
    } else if (erro.code === 'EISDIR') {
        mensagemErro = erro.code + '-> Foi informado um caminho não aponta para um arquivo'
    } else if (erro.code === 'EINVAL') {
        mensagemErro = erro.code + '-> O caminho informado não é válido'
    } else {
        mensagemErro = erro
    }

    throw new Error(chalk.red(mensagemErro))
}

export default trataErro