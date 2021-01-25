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
            let arr = response.data;
            console.log(arr);
                const h2Info = document.createElement('h2');
                const pInfo = document.createElement('p');

                const episodeInfo = document.createElement('section');
                const episodeCharacters = document.createElement('section');

                h2Info.textContent = `${arr.name}`;
                pInfo.textContent = `${arr.air_date} | ${arr.episode}`;

                episodeInfo.appendChild(h2Info);
                episodeInfo.appendChild(pInfo);
                main.appendChild(episodeInfo);
                console.log(episodeInfo);
        }).catch(function (error){
            console.log(error);
        });

    }
})


// ContentMain

// Episode Info
