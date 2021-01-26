// Call Header & Main Containers
const header = document.getElementById('header_container');
const aside = document.getElementById('aside_container');
const main = document.getElementById('main_container');

// Create h1 Header Title
const h1 = document.createElement('h1');
h1.setAttribute('class','header_container__title');
h1.textContent = 'Ricky and Morty';
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
