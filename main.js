//menu

const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');
const links = document.querySelectorAll('.nav__link');
const body = document.querySelector('.page__body');

let divShadow = document.createElement('div');
body.prepend(divShadow);

burger.addEventListener('click', () => {
    burger.classList.toggle('burger--open');
    nav.classList.toggle('nav--open');
    divShadow.classList.toggle('shadow');
    body.classList.toggle('no-scrolle');
})

window.addEventListener('click', e => {
    const target = e.target
    if (!target.closest('.nav') && !target.closest('.burger')) {
        nav.classList.remove('nav--open');
        burger.classList.remove('burger--open');
        divShadow.classList.remove('shadow');
        body.classList.remove('no-scrolle');
    }
})

links.forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('nav--open');
    burger.classList.remove('burger--open');
    divShadow.classList.remove('shadow');
    body.classList.remove('no-scrolle');
}));


//cards
const cardsTemplate = document.querySelector('#card-friend').content.firstElementChild;
const cardsList = document.querySelector('.friends');

let cards = [];

//creates one card
const createCard = (card) => {
    const cardElement = cardsTemplate.cloneNode(true);

    cardElement.querySelector('.friend__img').src = `./images/pets/${card.img}`;
    cardElement.querySelector('.friend__img').alt = card.type;
    cardElement.querySelector('.friends__name').textContent = card.name;

    cardElement.addEventListener("click", () => {
        popap(card);
        body.classList.add('no-scrolle-popap');
    });

    return cardElement;
}

//adds cards to the list
const createCards = (cards) => {
    cards.forEach((card) => {

        cardsList.append(createCard(card));
    });
    console.log(cards)
};

//error
const onError = () => {
    cardsList.textContent = 'Ошибка сервера, животные не загрузились';
    cardsList.style.fontSize = '200%';
    cardsList.style.justifyContent = 'center';
    controlNext.remove();
    controlPrev.remove();
}

//data acquisition
fetch('./data/pets.json')
    .then((response) => response.json())
    .then((card) => {
        onSuccess(card);
    }).catch(() => {
        onError();
    });

//slider
const controlNext = document.querySelector('.controls__button--next');
const controlPrev = document.querySelector('.controls__button--prev');

const removeCards = () => {
    const cards = document.querySelectorAll('.friends__item');
    if (cards) {
        cards.forEach(element => {
            element.remove();
        });
    }
};

const createSlider = (data) => {
    const tablet = window.matchMedia("(max-width: 1083px)");
    const mob = window.matchMedia("(max-width: 742px)");

    cards = data.slice();

    shuffleArray(cards);
    let i = 3;
    const media = () => {
        if (mob.matches) {
            removeCards();
            let i = 1;
            createCards(cards.slice(0, i));
        } else if (tablet.matches) {
            removeCards();
            let i = 2;
            createCards(cards.slice(0, i));
        } else {
            removeCards();
            let i = 3;
            createCards(cards.slice(0, i));
        }
    }

    mob.addEventListener('change', media);
    tablet.addEventListener('change', media);

    window.addEventListener('load', media);
    mob.addEventListener('load', media);
    tablet.addEventListener('load', media);


    const changeSlide = () => {
        if (mob.matches) {
            removeCards();
            createCards(cards.slice(i, i + 1));
            i = i + 1;

            if (i > 8) {
                shuffleArray(cards);
                let i = 1;
                createCards(cards.slice(0, i));
            }
        } else if (tablet.matches) {
            removeCards();
            createCards(cards.slice(i, i + 2));
            i = i + 2;

            if (i > 8) {
                shuffleArray(cards);
                let i = 2;
                createCards(cards.slice(0, i));
            }
        } else {
            removeCards();
            createCards(cards.slice(i, i + 3));
            i = i + 3;

            if (i == 9) {
                createCards(cards.slice(3, 4));
            }

            if (i > 9) {
                shuffleArray(cards);
                let i = 3;
                createCards(cards.slice(0, i));
            }
        }
    }

    controlNext.addEventListener('click', changeSlide);
    controlPrev.addEventListener('click', changeSlide);
}


const onSuccess = (data) => {
    createSlider(data);
};

const shuffleArray = (array) => {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

//popap

const popapTemplate = document.querySelector('#popap').content.firstElementChild;

const popap = (card) => {
    const tablet = window.matchMedia("(max-width: 1083px)");

    const popapElement = popapTemplate.cloneNode(true);
    if (tablet.matches) {
        popapElement.querySelector('.popap__img').src = `./images/pets/${card.img}`;
    } else {
        popapElement.querySelector('.popap__img').src = `./images/modal/${card.img}`;

    }
    popapElement.querySelector('.popap__img').alt = card.type;
    popapElement.querySelector('.popap__name').textContent = card.name;
    popapElement.querySelector('.popap__type').textContent = card.type;
    popapElement.querySelector('.popap__breed').textContent = card.breed;
    popapElement.querySelector('.popap__text').textContent = card.description;
    popapElement.querySelector('.popap__age').textContent = card.age;
    popapElement.querySelector('.popap__inoc').textContent = card.inoculations.join(', ');
    popapElement.querySelector('.popap__dis').textContent = card.diseases.join(', ');
    popapElement.querySelector('.popap__par').textContent = card.parasites.toString();


    popapElement.addEventListener('click', e => {
        const target = e.target
        if (!target.closest('.popap')) {
            popapElement.remove();
            body.classList.remove('no-scrolle-popap');
        }
    })

    tablet.addEventListener('change', () => {
        if (tablet.matches) {
            popapElement.querySelector('.popap__img').src = `./images/pets/${card.img}`;
        } else {
            popapElement.querySelector('.popap__img').src = `./images/modal/${card.img}`;

        }
    });

    body.append(popapElement);
};