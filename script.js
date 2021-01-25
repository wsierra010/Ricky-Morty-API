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
            list.setAttribute('class','aside_container__episodes');
            list.textContent += `Episode ${e.id}`;
            ul.appendChild(list);
        }
        console.log(i);
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
load.addEventListener('click', lessEpisode);
console.log(load);

function moreEpisode(){
    axios(config).then(function(res){
        const result = res.data.results;
        result.forEach((e,i) => {
            if(i>9){
                list = document.createElement('li');
                list.setAttribute('class','aside_container__episodes');
                list.textContent += `Episode ${e.id}`;
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



