// TODO: Global Function
const el = element => document.querySelector(`${element}`)
const elAll = elements => document.querySelector(`${elements}`)

// // // // // // // // // // // // // // // // // // // //
const xhr = new XMLHttpRequest

const setFilm = data => {
    const film = JSON.parse(data).Search

    let result = []

    film.forEach(el => {
        result.push(
            /* html */
            `
                <div>
                    <div class="poster">
                        <img src="${el.Poster}" alt="${el.Title}">
                    </div>

                    <div class="deskripsi">
                        <h3>${el.Title}</h3>
                        <p>
                            <span>${el.Type} </span>
                            |
                            <span> ${el.Year}</span>
                        </p>
                    </div>
                </div>
            `
        )
    })

    el('.result>div').innerHTML = result
}

const setError = () => alert('400, Server Erorr')

const ajaxReady = () => {
    xhr.onreadystatechange = () => {
        (xhr.readyState === 4 && xhr.status === 200) ? setFilm(xhr.responseText): setError;
    }
}

const getFilm = (key = null) => {
    el('.result>div').innerHTML = ''

    ajaxReady()

    let s = '';
    (key) ? s = key: s = 'batman'

    xhr.open('GET', `https://www.omdbapi.com/?apikey=be43bc00&s=${s}`, true)
    xhr.send()
}

window.addEventListener('load', getFilm())

const searchEvt = ['click', 'keyup']

searchEvt.forEach(element => {
    el('.searching').addEventListener(element, () => {
        getFilm(el('.searching input').value)
    })
})