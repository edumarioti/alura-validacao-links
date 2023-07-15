function extraiLinks(arrayLinks) {
    return arrayLinks.map((objetoLink) => objetoLink.url)
}

async function checkStatus(arrayURLs) {
    const arrayStatus = await Promise.all(
        arrayURLs.map(async (URL) => {
            const response = await fetch(URL)
            return response.status
        })
    )
    return arrayStatus
}

export default async function listaValdiada(listaDeLinks) {

    const links = extraiLinks(listaDeLinks)
    const status = await checkStatus(links)

    return listaDeLinks.map((objeto, indice) => ({
        ...objeto,
        status: status[indice]
    }))
}

