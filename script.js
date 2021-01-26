// Call Header & Main Containers
const header = document.getElementById('header_container');
const aside = document.getElementById('aside_container');
const main = document.getElementById('main_container');

// Create h1 Header Title
const h1 = document.createElement('h1');
h1.setAttribute('class','header_container__title');
h1.textContent = 'Rick and Morty';
header.appendChild(h1);

// Create episode list
const ul = document.createElement('ul');
console.log(ul);

var config = {
    method: 'get',
    url: 'https://rickandmortyapi.com/api/episode',
};

axios(config).then(function (response) {
    const results = response.data.results;
    console.log(results);
    results.forEach((e,i) => {
        if(i <= 9){
            list = document.createElement('li');
            a = document.createElement('a');
            list.setAttribute('class','aside_container__episodes');
            list.setAttribute('data-url',e.url);
            a.classList.add('enlace');
            a.setAttribute('id','episodes')
            a.textContent += `Episode ${e.id}`;
            a.setAttribute('data-url',e.url);
            list.appendChild(a);
            ul.appendChild(list);
        }
        // console.log(i);
    });
}).catch(function (error){
    console.log(error);
});

aside.appendChild(ul);

// Create Button Load Episodes
load = document.createElement('button');
load.textContent = 'Load Episodes';
aside.appendChild(load);
load.setAttribute('class','aside_container__btn');
load.addEventListener('click' , moreEpisode);
console.log(load);

function moreEpisode(){
    axios(config).then(function(res){
        const result = res.data.results;
        result.forEach((e,i) => {
            if(i>9){
                list = document.createElement('li');
                a = document.createElement('a');
                list.setAttribute('class','aside_container__episodes');
                list.setAttribute('data-url',e.url);
                a.classList.add('enlace');
                a.setAttribute('id','episodes')
                a.textContent += `Episode ${e.id}`;
                a.setAttribute('data-url',e.url);
                list.appendChild(a);
                ul.appendChild(list);
            }
        });
    }).catch(function (error){
        console.log(error);
    });
    load.textContent = 'Less Episodes';
    load.removeEventListener('click', moreEpisode);
    load.remove();
}
// Info buttons
// console.log(li);

ul.addEventListener('click', (e)=>{
    main.innerHTML= '';
    console.log(e.target.getAttribute('class'));
    if(e.target.classList.contains('aside_container__episodes')||e.target.classList.contains('enlace')){
        let url = e.target.getAttribute('data-url');

        axios(url).then(function (response){
                let results = response.data;
            // console.log(results.characters);
                // Firts Content main
                const h2Info = document.createElement('h2');
                h2Info.classList.add('main_container_episode__title');
                const pInfo = document.createElement('p');
                pInfo.classList.add('main_container_episode__info');

                // First section main
                const episodeInfo = document.createElement('section');
                episodeInfo.classList.add('main_container_episode');

                h2Info.textContent = `${results.name}`;
                pInfo.textContent = `${results.air_date} | ${results.episode}`;

                // Second section main
                episodeCharacters = document.createElement('section');
                episodeCharacters.classList.add('main_container_character');


                console.log(results);

                const promises = [];

                results.characters.forEach(element => {
                    promises.push(axios.get(element));
                })
                axios.all(promises).then(function (response) {
                    console.log(response);
                    response.forEach(e => {
                    // console.log(results.characters);
                    // Create figure
                    const figureCharacters = document.createElement('figure');
                    figureCharacters.classList.add('main_container_character__info');
                    // Create info Characters
                    var imgCharacter = document.createElement('img');
                    imgCharacter.classList.add('main_container_character_info__img');
                    imgCharacter.setAttribute('src',`${e.data.image}`);
                    imgCharacter.setAttribute('alt','Character');
                    var pName = document.createElement('p');
                    pName.classList.add('main_container_character_info__name');
                    pName.textContent = `${e.data.name}`;
                    var pSpecie = document.createElement('p');
                    pSpecie.classList.add('main_container_character_info__spice');
                    pSpecie.textContent = `${e.data.species}`;
                    var pStatus = document.createElement('p');
                    pStatus.classList.add('main_container_character_info__status');
                    pStatus.textContent = `${e.data.status}`;

                    figureCharacters.appendChild(imgCharacter);
                    figureCharacters.appendChild(pName);
                    figureCharacters.appendChild(pSpecie);
                    figureCharacters.appendChild(pStatus);
                    episodeCharacters.appendChild(figureCharacters);

                    imgCharacter.addEventListener('click', ()=>{
                        const modalFigure = document.createElement('figure');
                        modalFigure.classList.add('main_container__modal');
                        
                        // img character
                        const modalImg = document.createElement('img');
                        modalImg.setAttribute('src',`${e.data.image}`);
                        modalImg.classList.add('main_container_modal__img');
                        // div
                        const modalDiv = document.createElement('div');
                        modalDiv.classList.add('main_container_modal__div');
                        // close button
                        const modalClose = document.createElement('button');
                        modalClose.classList.add('main_container_modal__close');
                        modalClose.innerHTML = `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 415.188 415.188" xml:space="preserve">
                   <path d="M412.861,78.976c3.404-6.636,2.831-14.159-0.15-20.404c0.84-7.106-1.02-14.321-7.746-19.855
                       c-6.262-5.151-12.523-10.305-18.781-15.457c-11.005-9.055-28.237-11.913-38.941,0c-48.619,54.103-99.461,105.856-152.167,155.725
                       c-39.185-36.605-78.846-72.713-118.223-108.868c-13.82-12.693-33.824-8.71-42.519,6.411c-12.665,6.286-22.931,14.481-31.42,28.468
                       c-4.042,6.664-3.727,15.076,0,21.764c25.421,45.578,74.557,85.651,114.957,122.529c-5.406,4.839-10.772,9.724-16.287,14.461
                       c-54.43,46.742-91.144,76.399-23.029,124.325c0.919,0.647,1.856,0.504,2.789,0.882c1.305,0.602,2.557,1.026,4.004,1.264
                       c0.45,0.017,0.87,0.093,1.313,0.058c1.402,0.114,2.774,0.471,4.195,0.192c36.621-7.18,70.677-35.878,101.576-67.48
                       c30.1,29.669,62.151,58.013,97.395,74.831c8.391,4.005,18.395,1.671,24.855-3.931c10.832,0.818,20.708-5.913,25.665-15.586
                       c0.734-0.454,1.207-0.713,2.002-1.21c15.748-9.838,17.187-29.431,5.534-42.936c-26.313-30.492-54.284-59.478-82.798-87.95
                       C316.426,196.043,380.533,141.939,412.861,78.976z"/>
                   <g>
                   </g>
                   <g>
                   </g>
                   <g>
                   </g>
                   <g>
                   </g>
                   <g>
                   </g>
                   <g>
                   </g>
                   <g>
                   </g>
                   <g>
                   </g>
                   <g>
                   </g>
                   <g>
                   </g>
                   <g>
                   </g>
                   <g>
                   </g>
                   <g>
                   </g>
                   <g>
                   </g>
                   <g>
                   </g>
                            </svg>`
                        // name character
                        const modalName = document.createElement('p');
                        modalName.classList.add('main_container_modal__name');
                        modalName.textContent = `${e.data.name}`;
                        // status character
                        const modalStatus = document.createElement('p');
                        modalStatus.classList.add('main_container_modal__status');
                        modalStatus.textContent = `${e.data.status}`;
                        // specie character
                        const modalSpecie = document.createElement('p');
                        modalSpecie.classList.add('main_container_modal__specie');
                        modalSpecie.textContent = `${e.data.species}`;
                        // gender character
                        const modalGender = document.createElement('p');
                        modalGender.classList.add('main_container_modal__gender');
                        modalGender.textContent = `${e.data.gender}`;
                        // Origin Name character
                        const modalOrigin = document.createElement('p');
                        modalOrigin.classList.add('main_container_modal__origin');
                        modalOrigin.textContent = `${e.data.origin.name}`;


                        modalDiv.appendChild(modalName);
                        modalDiv.appendChild(modalStatus);
                        modalDiv.appendChild(modalSpecie);
                        modalDiv.appendChild(modalGender);
                        modalDiv.appendChild(modalOrigin);

                        modalFigure.appendChild(modalClose);
                        modalFigure.appendChild(modalImg);
                        modalFigure.appendChild(modalDiv);

                        main.appendChild(modalFigure);

                        modalClose.addEventListener('click', ()=>{
                            modalFigure.remove();
                        })
                    })

                    });
                    })
                    // console.log(promises);


                episodeInfo.appendChild(h2Info);
                episodeInfo.appendChild(pInfo);
                main.appendChild(episodeInfo);
                main.appendChild(episodeCharacters);
                console.log(episodeInfo);
                console.log(episodeCharacters);
        }).catch(function (error){
            console.log(error);
        });

    }
})
