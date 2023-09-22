class State {
    constructor() {
        this.objType = 'planets'; 
        this.showAll = false
        this.cardsInPage = null
        this.switchCardsInPage()
        
        this.objAll = [];
        this.currentObjName = null;
        this.allObjects = null;
        this.target = null;
        this.tableType = null;
        this.cardCounterStart = 1
        this.cardCounterEnd = this.cardsInPage
        this.currentPage = 1
        this.maxCards = this.maxCardsInPage()
    };
    
    maxCardsInPage() {
        switch(this.objType) {
            case 'planets':
                this.maxCards = 60
                break;
            case 'residents':
                this.maxCards = 83
                break;
            case 'films':
                this.maxCards = 6
                break;
            case 'starships':
                this.maxCards = 75
                break;
            case 'vehicles':
                this.maxCards = 75
                 break;
            case 'species':
                this.maxCards = 37
                 break;
        };
        return this.maxCards
    };

    switchCardsInPage() {
        switch(this.showAll) {

            case false:
                switch(this.objType) {
                    case 'films': 
                        this.cardsInPage = 6
                        break;
                    default:
                        this.cardsInPage = 10
                        break;
                };
                break;

            case true:
                switch(this.objType) {
                    case 'planets':
                        this.cardsInPage = 60
                        break;
                    case 'residents':
                        this.cardsInPage = 83
                        break;
                    case 'films':
                        this.cardsInPage = 6
                        break;
                    case 'starships':
                        this.cardsInPage = 75
                        break;
                    case 'vehicles':
                        this.cardsInPage = 75
                         break;
                    case 'species':
                        this.cardsInPage = 37
                         break;
                };
            break;
        };
        this.cardsInPage
    };
};

class HeaderComponent {
    constructor(state) {
        this.state = state
    }
    add() {
        const template = `<div class="header mb-4" style="background-color: #1d1e22;">
                            <div class="container">
                               <nav class="navbar navbar-expand-lg">
                                  <div class="container-fluid">
                                     <a class="navbar-brand" href="#">SWAPI >></a>
                                        <button class="navbar-toggler yellow" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                          <span class="navbar-toggler-icon yellow"></span>
                                        </button>
                                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                            <li class="nav-item">
                                              <a class="nav-link active yellow-font text-light" aria-current="page" href="#" obj-type="planets">Planets</a>
                                            </li>
                                            <li class="nav-item">
                                              <a class="nav-link active text-light" aria-current="page" href="#" obj-type="residents">Residents</a>
                                            </li>
                                            <li class="nav-item">
                                              <a class="nav-link active text-light" aria-current="page" href="#" obj-type="films">Films</a>
                                            </li>
                                            <li class="nav-item">
                                              <a class="nav-link active text-light" aria-current="page" href="#" obj-type="starships">Starships</a>
                                            </li>
                                            <li class="nav-item">
                                              <a class="nav-link active text-light" aria-current="page" href="#" obj-type="vehicles">Vehicles</a>
                                            </li>
                                            <li class="nav-item">
                                              <a class="nav-link active text-light" aria-current="page" href="#" obj-type="species">Species</a>
                                            </li>
                                          </ul>
                                      </div>
                                   </div>
                               </nav> 
                            </div>
                        </div>`
        document.querySelector('#header').innerHTML = template
    };
};

class PaginationComponent {
    constructor(state) {
        this.state = state
    }
    add() {
        const template = `<div class="container d-flex flex-column align-items-center">
                            <nav aria-label="Page navigation example">
                              <ul class="pagination">
                                <li class="page-item"><a class="page-link  pagination-previous" href="#">Previous</a></li>
                                <li class="page-item"><a class="page-link current-page" href="#">${this.state.currentPage}</a></li>
                                <li class="page-item"><a class="page-link  pagination-next" href="#">Next</a></li>
                                <li class="page-item show-all"><a class="page-link btn" href="#">Show all</a></li>
                              </ul>
                            </nav>`
        document.querySelector('#pagination').innerHTML = template
    };
};

class CardComponent {
    constructor(state, request) { 
        this.state = state
        this.request = request
    };

    async render() {
        let currentType = this.state.objType + ''
        let currentPage = this.state.cardCounterStart + ''
       
        for(let i = 0; i < this.state.cardsInPage; i++) {
            let card = document.createElement('div')
            card.innerHTML = `<div class="card" style="width: 18rem; height: 24rem;" obj-type="" obj-name="" aria-hidden="false"> 
                                <div class="card-body">
                                   <h5 class="card-title mb-3 text-center">Loading...</h5>
                                   <div class="card-content  d-flex flex-column justify-content-between">
                                      <div class="d-flex justify-content-center">
                                        <div class="spinner-border mt-2" role="status"></div>
                                      </div>
                                   </div>
                                </div>
                              </div>`
            document.querySelector('.cards').append(card)
        };

        let obj = await this.request.getAll()
        for(let i = 0; i < obj.length; i++) {

            if(!currentType == this.state.objType || !currentPage == this.state.cardCounterStart) {
                return
            } else {
 
            let o = obj[i]
            if(o.detail == 'Not found') {
                document.querySelectorAll('.card-title')[i].innerHTML = ''
                if(this.state.objType == 'residents') {
                    document.querySelectorAll('.card-content')[i].innerHTML = `
                    <div class="text-center" style="margin-top: 2rem;">https://swapi.dev/api/people/${[i + 1]}/</div>
                    <div class="text-center fs-4" style="margin-top: 2rem;">404</div>`
                } else {
                    document.querySelectorAll('.card-content')[i].innerHTML = `
                    <div class="text-center" style="margin-top: 2rem;">https://swapi.dev/api/${this.state.objType}/${[i + 1]}/</div>
                    <div class="text-center fs-4" style="margin-top: 2rem;">404</div>`
                };
            } else {
                document.querySelectorAll('.card')[i].setAttribute("obj-type", this.state.objType)
                document.querySelectorAll('.card')[i].setAttribute("obj-name", o.name || o.title)
                document.querySelectorAll('.card-title')[i].innerHTML = o.name || o.title

                let html = ''
                switch(this.state.objType) {

                    case 'planets':
                        html +=`<ul class="list-group mb-3">
                                  <li class="list-group-item"><strong>Diameter: </strong>${o.diameter}</li>
                                  <li class="list-group-item"><strong>Population: </strong>${o.population}</li>
                                  <li class="list-group-item"><strong>Gravity: </strong>${o.gravity}</li>
                                  <li class="list-group-item"><strong>Terrain: </strong>${o.terrain}</li>
                                  <li class="list-group-item"><strong>Climate: </strong>${o.climate}</li>
                               </ul>`
                         break;
                    case 'residents':
                        html +=`<ul class="list-group mb-3">
                                  <li class="list-group-item"><strong>Gender: </strong>${o.gender}</li>
                                  <li class="list-group-item"><strong>Birth year: </strong>${o.birth_year}</li>
                                  <li class="list-group-item"><strong>Homeworld: </strong>${o.homeworld}</li>
                                  <li class="list-group-item"><strong>Height: </strong>${o.height}</li>
                                  <li class="list-group-item"><strong>Mass: </strong>${o.mass}</li>
                               </ul>`
                        break;
                    case 'films':
                        html +=`<ul class="list-group mb-3">
                                  <li class="list-group-item"><strong>Episode Id: </strong>${o.episode_id}</li>
                                  <li class="list-group-item"><strong>Director: </strong>${o.director}</li>
                                  <li class="list-group-item"><strong>Producer: </strong>${o.producer}</li>
                                  <li class="list-group-item"><strong>Release date: </strong>${o.release_date}</li>
                               </ul>`
                        break;
                    case 'starships':
                        html +=`<ul class="list-group mb-3">
                                  <li class="list-group-item"><strong>Model: </strong>${o.model}</li>
                                  <li class="list-group-item"><strong>Manufacturer: </strong>${o.manufacturer}</li>
                                  <li class="list-group-item"><strong>Cost in credits: </strong>${o.cost_in_credits}</li>
                                  <li class="list-group-item"><strong>Starship class: </strong>${o.starship_class}</li>
                                  <li class="list-group-item"><strong>Crew: </strong>${o.crew}</li>
                              </ul>`
                        break;
                    case 'vehicles':
                        html +=`<ul class="list-group mb-3">
                                  <li class="list-group-item"><strong>Model: </strong>${o.model}</li>
                                  <li class="list-group-item"><strong>Manufacturer: </strong>${o.manufacturer}</li>
                                  <li class="list-group-item"><strong>Cost in credits: </strong>${o.cost_in_credits}</li>
                                  <li class="list-group-item"><strong>Starship class: </strong>${o.vehicle_class}</li>
                                  <li class="list-group-item"><strong>Crew: </strong>${o.crew}</li>
                               </ul>`
                        break;
                    case 'species':
                        html +=`<ul class="list-group mb-3">
                                  <li class="list-group-item"><strong>Classification: </strong>${o.classification}</li>
                                  <li class="list-group-item"><strong>Designation: </strong>${o.designation}</li>
                                  <li class="list-group-item"><strong>Average height: </strong>${o.average_height}</li>
                                  <li class="list-group-item"><strong>Language: </strong>${o.language}</li>
                                  <li class="list-group-item"><strong>Average lifespan: </strong>${o.average_lifespan}</li>
                               </ul>`
                        break;
                };
                html += `<button type="button" class="card-btn btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">More</button>`
                document.querySelectorAll('.card-content')[i].innerHTML = html
            };

            }
            
        };
    };
    // Мне нужно останавливать рендер при новом клике на ссылки в навбаре и пагинаторе. 
};

class Handler {
    constructor(state, modal, render, pagination) {
        this.state = state
        this.modal = modal
        this.render = render
        this.pagination = pagination
        this.modalOpen()
        this.modalClose()
        this.headerNavigation()
        this.paginatorPrevious()
        this.paginatorNext()
        this.paginationShowAll()
        this.headerChangeColor()
    };
    
    modalOpen() {
        document.querySelector('.cards').addEventListener('click', (e) => {
            if(e.target.classList.contains('btn')) {
                e.preventDefault();             
                this.state.currentObjName = e.target.closest('.card').getAttribute('obj-name')
                this.render.modal()
            };
        });
    };

    modalClose() {
        document.querySelector('.modal-footer').addEventListener('click', (e) => {
            if(e.target.classList.contains('btn') || !e.target.classList.contains('.modal-dialog')) {
                e.preventDefault();
                console.log('modal close =>')
                document.querySelector('.modal-accordion').innerHTML = ''
            };
        });
    };
    headerNavigation() {
        document.querySelector('.header').addEventListener('click', (e) => {
            if(e.target.classList.contains('nav-link')) {
                e.preventDefault();

                document.querySelector('.cards').innerHTML = ''
                this.state.objType = e.target.getAttribute('obj-type');
                this.state.showAll = false
                this.state.switchCardsInPage()
                
                this.state.cardCounterEnd = this.state.cardsInPage
                this.state.currentPage = 1
                this.state.cardCounterStart = 1
                document.querySelector('.current-page').innerHTML = this.state.currentPage
                console.log(`object type: ${this.state.objType} =>`)

                this.render.cards()
            };
        });  
    };
    headerChangeColor() {
        document.querySelector('.navbar-nav').addEventListener('click', (e) => {
            if(e.target.classList.contains('nav-link')) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('yellow-font')
                });
                e.target.classList.add('yellow-font')
            };
        });
    };

    paginatorPrevious() {
        document.querySelector('.pagination').addEventListener('click', (e) => {
            if(e.target.classList.contains('pagination-previous')) {
                e.preventDefault()
                if(this.state.cardCounterEnd != this.state.cardsInPage) {
                    if(this.state.objType != 'films') {
                        console.log('pagination previous =>')
                        document.querySelector('.cards').innerHTML = ''

                        this.state.cardCounterStart -= this.state.cardsInPage
                        this.state.cardCounterEnd -= this.state.cardsInPage
                        this.state.currentPage -= 1
                        document.querySelector('.current-page').innerHTML =`${this.state.currentPage}`
                        this.render.cards()
                    };  
                };
            };
        });
    };
    paginatorNext() {
        document.querySelector('.pagination').addEventListener('click', (e) => {
            if(e.target.classList.contains('pagination-next')) {
                if(this.state.objType != 'films') {
                    e.preventDefault();
                    console.log('pagination next =>')

                    if(this.state.cardCounterEnd < this.state.maxCards) {
                        document.querySelector('.cards').innerHTML = ''
    
                        this.state.cardCounterStart += this.state.cardsInPage
                        this.state.cardCounterEnd += this.state.cardsInPage
                        this.state.currentPage += 1
                        document.querySelector('.current-page').innerHTML =`${this.state.currentPage}`
                        this.render.cards()
                    };
                };
            };
        });
    };
    paginationShowAll() {
        document.querySelector('.show-all').addEventListener('click', (e) => {
            if(e.target.classList.contains('btn')) {
                document.querySelector('.cards').innerHTML = ''
                console.log('show all =>')

                switch(this.state.showAll) {
                    case false:
                        this.state.showAll = true
                        this.state.switchCardsInPage()
                        this.render.cards()
                        e.target.innerHTML = 'show all'
                        break;
        
                    case true:
                        this.state.showAll = false
                        this.state.switchCardsInPage()
                        
                        this.render.cards()
                        e.target.innerHTML = 'show part'
                        break;
                };
            };
        });
    };
};

class PageComponent {
    constructor(state) {
        this.state = state
    };

    add() {
        const template = `<div id="content">
                            <div class="container">
                              <div class="content mb-4">
                                <div id="side-left"></div>
                                  <div id="side-right">
                                    <div id="cards">
                                      <div class="cards d-flex flex-row flex-wrap gap-3"></div>
                                    </div>
                                  </div>
                                </div>
                                <div id="pagination"></div>
                                <div id="footer"></div>
                            </div>
                         </div>`
        document.querySelector('#content').innerHTML = template
    };      
};

class ModalComponent {
    constructor(state, request) {
        this.state = state
        this.request = request
        this.table = []
    };

    add() {
        const modal = document.createElement('div');
        document.querySelector('body').append(modal);
       
        modal.innerHTML = `<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" obj-name="${this.state.currentObjName}" obj-type=${this.state.objType}>
                              <div class="modal-dialog modal-lg">
                                <div class="modal-content" style="min-height: 500px;">
                                   <div class="modal-header">
                                      <h1 class="modal-title fs-5" id="exampleModalLabel"></h1>
                                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                   </div>
                                   <div class="modal-body">
                                <div class="modal-body_content"></div>
                                <div class="accordion modal-accordion mt-4" id="accordionPanelsStayOpenExample">
                              </div>
                           </div>
                           <div class="modal-footer">
                             <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                           </div>
                        </div>
                     </div>
                  </div>`;
    };
        
    async render() {
        document.querySelector('.modal-accordion').innerHTML = ''
        document.querySelector('.modal-title').innerHTML = 'Loading...'
        let content = document.querySelector('.modal-body_content')
        content.innerHTML = `<div class="d-flex justify-content-center align-center" style="margin-top:9rem;">
                               <div class="spinner-border" role="status"></div>
                             </div>`

        await this.request.getTarget()
        await this.createAccordionItem() 

        document.querySelector('.modal-title').innerHTML = this.state.target.name || this.state.target.title
        
        let html = ''
        switch(this.state.objType) {
            case 'planets':
                html = `<ul class="modal-list list-group">
                          <li class="list-group-item"><strong>Climate: </strong>${this.state.target.climate}</li>
                          <li class="list-group-item"><strong>Diameter: </strong>${this.state.target.diameter}</li>
                          <li class="list-group-item"><strong>Gravity: </strong>${this.state.target.gravity}</li>
                          <li class="list-group-item"><strong>Orbital period: </strong>${this.state.target.orbital_period}</li>
                          <li class="list-group-item"><strong>Population: </strong>${this.state.target.population}</li>
                          <li class="list-group-item"><strong>Rotation period: </strong>${this.state.target.rotation_period}</li>
                          <li class="list-group-item"><strong>Surface water: </strong>${this.state.target.surface_water}</li>
                          <li class="list-group-item"><strong>Terrain: </strong>${this.state.target.terrain}</li>
                       </ul>`
                 break;

            case 'residents':
                html = `<ul class="modal-list list-group">
                          <li class="list-group-item"><strong>Birth year: </strong>${this.state.target.birth_year}</li>
                          <li class="list-group-item"><strong>Eye color: </strong>${this.state.target.eye_color}</li>
                          <li class="list-group-item"><strong>Gender: </strong>${this.state.target.gender}</li>
                          <li class="list-group-item"><strong>Hair color: </strong>${this.state.target.hair_color}</li>
                          <li class="list-group-item"><strong>Height: </strong>${this.state.target.height}</li>
                          <li class="list-group-item"><strong>Homeworld: </strong>${this.state.target.homeworld}</li>
                          <li class="list-group-item"><strong>Mass: </strong>${this.state.target.mass}</li>
                          <li class="list-group-item"><strong>Skin color: </strong>${this.state.target.skin_color}</li>
                          <li class="list-group-item"><strong>Species: </strong>${this.state.target.species}</li>
                        </ul>`
                break;

            case 'films':
                html = `<ul class="modal-list list-group">
                          <li class="list-group-item"><strong>Episode Id: </strong>${this.state.target.episode_id}</li>
                          <li class="list-group-item"><strong>Director: </strong>${this.state.target.director}</li>
                          <li class="list-group-item"><strong>Producer: </strong>${this.state.target.producer}</li>
                          <li class="list-group-item"><strong>Release date: </strong>${this.state.target.release_date}</li>
                        </ul>`
                break;

            case 'starships':
                html = `<ul class="modal-list list-group">
                          <li class="list-group-item"><strong>Model: </strong>${this.state.target.model}</li>
                          <li class="list-group-item"><strong>Manufacturer: </strong>${this.state.target.manufacturer}</li>
                          <li class="list-group-item"><strong>Cost in credits: </strong>${this.state.target.cost_in_credits}</li>
                          <li class="list-group-item"><strong>Length: </strong>${this.state.target.length}</li>
                          <li class="list-group-item"><strong>Max atmosphering speed: </strong>${this.state.target.max_atmosphering_speed}</li>
                          <li class="list-group-item"><strong>Crew: </strong>${this.state.target.crew}</li>
                          <li class="list-group-item"><strong>Passengers: </strong>${this.state.target.passengers}</li>
                          <li class="list-group-item"><strong>Cargo capacity: </strong>${this.state.target.cargo_capacity}</li>
                          <li class="list-group-item"><strong>Consumables: </strong>${this.state.target.consumables}</li>
                          <li class="list-group-item"><strong>Hyperdrive rating: </strong>${this.state.target.hyperdrive_rating}</li>
                          <li class="list-group-item"><strong>MGLT: </strong>${this.state.target.MGLT}</li>
                          <li class="list-group-item"><strong>Starship class: </strong>${this.state.target.starship_class}</li>
                       </ul>`
                break;

            case 'vehicles':
                html = `<ul class="modal-list list-group">
                          <li class="list-group-item"><strong>Model: </strong>${this.state.target.model}</li>
                          <li class="list-group-item"><strong>Manufacturer: </strong>${this.state.target.manufacturer}</li>
                          <li class="list-group-item"><strong>Cost in credits: </strong>${this.state.target.cost_in_credits}</li>
                          <li class="list-group-item"><strong>Starship class: </strong>${this.state.target.vehicle_class}</li>
                          <li class="list-group-item"><strong>Cargo capacity: </strong>${this.state.target.cargo_capacity}</li>
                          <li class="list-group-item"><strong>Consumables: </strong>${this.state.target.consumables}</li>
                          <li class="list-group-item"><strong>Crew: </strong>${this.state.target.crew}</li>
                          <li class="list-group-item"><strong>Length: </strong>${this.state.target.length}</li>
                          <li class="list-group-item"><strong>Passengers: </strong>${this.state.target.passengers}</li>
                          <li class="list-group-item"><strong>Vehicle class: </strong>${this.state.target.vehicle_class}</li>
                          <li class="list-group-item"><strong>Max atmosphering speed </strong>${this.state.target.max_atmosphering_speed}</li>
                        </ul>`
                break;

            case 'species':
                html = `<ul class="modal-list list-group">
                          <li class="list-group-item"><strong>Classification: </strong>${this.state.target.classification}</li>
                          <li class="list-group-item"><strong>Designation: </strong>${this.state.target.designation}</li>
                          <li class="list-group-item"><strong>Average height: </strong>${this.state.target.average_height}</li>
                          <li class="list-group-item"><strong>Language: </strong>${this.state.target.language}</li>
                          <li class="list-group-item"><strong>Skin colors: </strong>${this.state.target.skin_colors}</li>
                          <li class="list-group-item"><strong>Hair colors: </strong>${this.state.target.hair_colors}</li>
                          <li class="list-group-item"><strong>Eye colors: </strong>${this.state.target.eye_colors}</li>
                          <li class="list-group-item"><strong>Homeworld: </strong>${this.state.target.homeworld}</li>
                          <li class="list-group-item"><strong>Average lifespan: </strong>${this.state.target.average_lifespan}</li>
                       </ul>`
                break;
        };
        content.innerHTML = html
    };

    async createAccordionItem() {
        switch(this.state.objType) {
            case 'planets':
                this.table = ['films', 'residents']
                break;
            case 'films':
                this.table = ['characters', 'planets', 'species', 'starships', 'vehicles']
                break;
            case 'residents':
                this.table = ['films', 'species', 'starships', 'vehicles']
                break;
            case 'starships':
                this.table = ['films', 'pilots']
                break;
            case 'vehicles':
                this.table = ['films', 'pilots']
                break;
            case 'species':
                this.table = ['films', 'people']
                break;
            };
    
        let arr = []
        for(let i = 0; i < this.table.length; i++) {
            this.state.tableType = this.table[i]
            let objArr = await this.request.getDataForTable()

            if(objArr.length == 0) { continue }
                     
                let item = document.createElement('div')
                arr.push(item)
                let template = ''
                template += `<div class="accordion-item">
                               <h2 class="accordion-header" id="panelsStayOpen-heading${[i]}">
                                 <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse${i}" aria-expanded="true" aria-controls="panelsStayOpen-collapse${i}">${this.table[i]}
                                 </button>
                               </h2>
                               <div id="panelsStayOpen-collapse${i}" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-heading${i}">
                                 <div class="accordion-body" item_table-type=${[i]}>`;
        
                template += this.createTable(objArr)
                template += `</div></div></div>`;
                item.innerHTML = template
        };
        arr.forEach(item => document.querySelector('.modal-accordion').append(item))   
    };

    createTable(objArr) {
        let template = ''
        switch(this.state.tableType) {
             case 'residents': case 'pilots': case 'characters':
                template += `<table class="table table-striped m-2">
                               <thead>
                                  <tr>
                                    <th>Name</th>
                                    <th>Eye color</th>
                                    <th>Homeworld</th>
                                  </tr> 
                                </thead>
                                <tbody>`
                objArr.forEach(obj => {
                    template += `<tr>
                                   <td>${obj.name}</td>
                                   <td>${obj.eye_color}</td>
                                   <td>${obj.homeworld}</td>
                                </tr>`
                    });
                break;
            case 'planets':
                template = `<table class="table table-striped m-2">
                              <thead>
                                 <tr>
                                   <th>Name</th>
                                   <th>Population</th>
                                   <th>Terrain</th>
                                 </tr>
                              </thead>
                              <tbody>`        
                objArr.forEach(obj => {
                    template += `<tr>
                                   <td>${obj.name}</td>
                                   <td>${obj.population}</td>
                                   <td>${obj.terrain}</td>
                                 </tr>`;
                });
                break;
            case 'films':
                template = `<table class="table table-striped m-2">
                              <thead>
                                 <tr>
                                   <th>Title</th>
                                   <th>Episode id</th>
                                   <th>Release date</th>
                                 </tr>
                               </thead>
                               <tbody>`        
                objArr.forEach(obj => {
                    template += `<tr>
                                   <td>${obj.title}</td>
                                   <td>${obj.episode_id}</td>
                                   <td>${obj.release_date}</td>
                                 </tr>`;
                });
                break;
                case 'species':
                    template = `<table class="table table-striped m-2">
                                  <thead>
                                     <tr>
                                       <th>Classification</th>
                                       <th>Name</th>
                                       <th>Language</th>  
                                      </tr>
                                  </thead>
                                  <tbody>`        
                    objArr.forEach(obj => {
                        template += `<tr>
                                       <td>${obj.classification}</td
                                       <td>${obj.name}</td>
                                       <td>${obj.language}</td>
                                    </tr>`;
                    });
                    break;
                case 'starships': case 'vehicles':
                    template = `<table class="table table-striped m-2">
                                  <thead>
                                    <tr>
                                      <th>Name</th>
                                      <th>Model</th>
                                      <th>Crew</th>
                                    </tr>
                                  </thead>
                                  <tbody>`        
                    objArr.forEach(obj => {
                        template += `<tr>
                                       <td>${obj.name}</td>
                                       <td>${obj.model}</td>
                                       <td>${obj.crew}</td>
                                    </tr>`;
                    });
                    break;
        };
        template += `</tbody></table>`
        return template
    };
};

class Request {
    constructor(state) {
        this.state = state
    };

    async getAll() {
        try {
            this.state.switchCardsInPage()
            this.type = this.state.objType

            this.state.objType === 'residents' ? this.type = 'people' : this.type = this.state.objType;
            const promises = [];
            let end = null;
            this.state.objType == 'films' || this.state.showAll == true ? end = this.state.cardsInPage : end = this.state.cardCounterEnd
           
            switch(this.state.objType) {
                case 'residents':
                    console.log(`render cards ${this.state.cardCounterStart} -> ${end}`)
                    for(let i = this.state.cardCounterStart; i <= end; i++) {

                        let obj = (await fetch(`https://swapi.dev/api/${this.type}/${[i]}/`)
                        .then(r => r.json()))

                        obj.homeworld = (await fetch(`https://swapi.dev/api/${this.type}/${[i]}/`)
                        .then(r => r.json()).then(r => fetch(r.homeworld).then(r => r.json()).then(r => r.name)))
                         promises.push(obj)
                    };
                    this.state.objAll = promises
                    break;
                
                default:
                    console.log(`render cards ${this.state.cardCounterStart} -> ${end}`)
                    for(let i = this.state.cardCounterStart; i <= end; i++) {

                        promises.push(await fetch(`https://swapi.dev/api/${this.type}/${[i]}/`)
                        .then(r => r.json()))
                    };
           
                    const resArr = []
                    let data = await Promise.all(promises)
                    this.state.objAll = resArr.concat(...data)
                    break;
            };
            return this.state.objAll

        } catch { console.log('error: Request.getAll') };
        //Мне нужно прерывать запросы при клике по ссылкам в навигации и пагинаторе
    };

    async changeProperty(obj) {
        try {
            obj.homeworld = await fetch(obj.homeworld).then(r => r.json()).then(r => r.name)
            return obj
        } catch { console.log('error: Request.changeProperty') };
    };

    async getTarget() {
        try {
            let obj = null
            this.type = this.state.objType
            this.state.objType === 'residents' ? this.type = 'people' : this.type = this.state.objType;
            const response = await fetch(`https://swapi.dev/api/${this.type}/?search=${this.state.currentObjName}`)
            .then(res => res.json());
            this.state.target = response.results[0]

            switch(this.state.objType) {
                case 'residents': case 'species':
                    obj = this.changeProperty(response.results[0])
                    break;
                default:
                    response.results[0]
                    break;
            };
            return obj

        } catch { console.log(' getTarget: error') };
    };

    async getDataForTable() {
        try {
            this.type = this.state.objType
            this.state.objType === 'residents' ? this.type = 'people' : this.type = this.state.objType;
            const target = this.state.target
            let result;
    
            switch(this.state.tableType) {
                case 'residents': case 'pilots':
                    let arr_1 = []
                    for(let i = 0; i < target.residents.length; i++) {
                        let obj = await fetch(target.residents[i]).then(r => r.json())
                        arr_1.push(await this.changeProperty(obj))
                    };
                    result = arr_1
                    break;

                case 'species':
                    let arr_2 = []
                    for(let i = 0; i < target.species.length; i++) {
                        let obj = await fetch(target.species[i]).then(r => r.json())
                        arr_2.push(await this.changeProperty(obj))
                    };
                    result = arr_2
                    break;

                default: 
                    const promises = []
                    const resArr = []
                    switch(this.state.tableType) {
                        case 'films':
                            await target.films.forEach(film => promises.push(fetch(film).then(r => r.json())));
                            break;
    
                        case 'planets':
                            await target.planets.forEach(planet => promises.push(fetch(planet).then(r => r.json())));
                            break;

                        case 'starships':
                            await target.starships.forEach(starship=> promises.push(fetch(starship).then(r => r.json())));
                            break;

                        case 'vehicles':
                            await target.vehicles.forEach(vehicle => promises.push(fetch(vehicle).then(r => r.json())));
                            break;

                        case 'species':
                            await target.species.forEach(specie => promises.push(fetch(specie).then(r => r.json())));
                            break;
                    };
                let data = await Promise.all(promises)
                result = resArr.concat(...data)
            };

            return result
        } catch { console.log('error: Request.getDataForTable') };
    };
};

class Render {
    constructor(state, request) {
        this.state = state
        this.request = request
        this.headerComponent = new HeaderComponent(this.state)
        this.pageComponent = new PageComponent(this.state)
        this.paginationComponent = new PaginationComponent(this.state)
        this.modalComponent = new ModalComponent(this.state, this.request)
        this.cardComponent = new CardComponent(this.state, this.request)
    };

    page() {
        this.headerComponent.add()
        this.pageComponent.add()
        this.paginationComponent.add()
        this.modalComponent.add()
    };

    async cards() {
        await this.cardComponent.render()
    };

    async modal() {
        await this.modalComponent.render()
    };
};

class App {
    constructor() {
        this.state = new State()
        this.request = new Request(this.state)
        this.render = new Render(this.state, this.request)
    };
    async start() {
        this.render.page()
        new Handler(this.state, this.modalComponent, this.render, this.paginationComponent) 
        await this.render.cards() 
    };
};

const app = new App()
app.start()



 




