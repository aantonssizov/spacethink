const leSystemeBaseURL = import.meta.env.VITE_LE_SYSTEME;
const leSystemeKey = import.meta.env.VITE_LE_SYSTEME_KEY;
const supernaturalBaseURL = import.meta.env.VITE_SUPERNATURALE;

const reverseProxyURL = import.meta.env.VITE_REVERSE_PROXY;

const getReverseProxiedURL = (url) => `${reverseProxyURL}/${url}`;

async function getBodiesIds() {
    const request = await fetch(getReverseProxiedURL(`${leSystemeBaseURL}bodies?data=id`), {
        headers: {
            authorization: `Bearer ${leSystemeKey}`,
        },
    })
    const body = await request.json()

    return body
}

async function getBody(id) {
    const request = await fetch(getReverseProxiedURL(`${leSystemeBaseURL}bodies/${id}`), {
        headers: {
            authorization: `Bearer ${leSystemeKey}`,
        },
    })
    const body = await request.json()

    return body
}

async function getRandomQuote() {
    const request = await fetch(getReverseProxiedURL(`${supernaturalBaseURL}/quotes/random`))
    const body = await request.json()

    return body
}

function renderBody(body) {
    const bodyDetails = document.querySelector('.body-details')
    const name = document.querySelector('span.body-name')
    const bodyName = document.createElement('p')
    const bodyType = document.createElement('p')
    const aroundPlanet = document.createElement('p')

    name.textContent = body.englishName
    bodyName.setHTMLUnsafe(`<b>Name: </b>${body.englishName}`)
    bodyType.setHTMLUnsafe(`<b>Type: </b>${body.bodyType}`)
    aroundPlanet.setHTMLUnsafe(
        `<b>Around Planet: </b>${body.aroundPlanet.planet ?? 'None'}`
    )

    bodyDetails.append(bodyName, bodyType, aroundPlanet)
}

function renderQuote(quote) {
    function renderLine(number) {
        const line = quote[`line_${number}`]
        if (!line) return

        const lineElm = document.createElement('p')
        lineElm.textContent = `${line.character.name} - ${line.quote}`
        quoteContainer.appendChild(lineElm)

        renderLine(number + 1)
    }

    const quoteContainer = document.querySelector('.quote')
    renderLine(0)
}

const paramsString = location.search
const searchParams = new URLSearchParams(paramsString)
const promptParam = searchParams.get('prompt')

const totalASCIInumber = promptParam
    .split('')
    .reduce((prev, curr) => prev + curr.charCodeAt(), 0)
const bodiesIds = (await getBodiesIds()).bodies

const index = totalASCIInumber % bodiesIds.length

const id = bodiesIds[index].id

const body = await getBody(id)
const quote = await getRandomQuote()

renderBody(body)
renderQuote(quote)
