let characters = document.getElementById('characters')
let prevBtn = document.getElementById('prev-btn')
let nextBtn = document.getElementById('next-btn')
let pageInfo = document.getElementById('page-info')

let currentPage = 1
let totalPage = 42

const showCharacter = (data) => {
    characters.innerHTML = ''

    data.forEach(character => {
        let div = document.createElement('div')

        let h2 = document.createElement('h2')
        h2.textContent = character.name

        let img = document.createElement('img')
        img.src = character.image
        img.alt = character.name

        div.appendChild(img)
        div.appendChild(h2)

        characters.appendChild(div)
    })
}

const renderCharacter = async (page) => {
    try {
        let response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
        let data = await response.json()

        showCharacter(data.results)

        totalPage = data.info.pages
        pageInfo.textContent = `Страница ${currentPage} из ${totalPage}`

        prevBtn.disabled = currentPage === 1
        nextBtn.disabled = currentPage === totalPage
    } catch (error) {
        console.log(error)
    }
}

nextBtn.onclick = () => {
    if (currentPage < totalPage) {
        currentPage++
        renderCharacter(currentPage)
    }
}

prevBtn.onclick = () => {
    if (currentPage > 1) {
        currentPage--
        renderCharacter(currentPage)
    }
}

renderCharacter(currentPage)