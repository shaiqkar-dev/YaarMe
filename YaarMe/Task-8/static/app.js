// StoriesData
const stories = [{
        user: {
            name: 'Shaiq',
            time: 'Today, 9:33 AM',
            imageURL: './static/img/profile.jpg',
        },
        images: [
            './static/img/stories/1.jpg',
            './static/img/stories/2.jpg',
            './static/img/stories/3.jpg',
        ],
    },
    {
        user: {
            name: 'Sheweta',
            time: 'Today, 8:47 AM',
            imageURL: './static/img/profile-1.jpg',
        },
        images: [
            './static/img/stories/5.jpg',
            './static/img/stories/6.jpg',
        ],
    },
    {
        user: {
            name: 'Parul',
            time: 'Today, 7:27 AM',
            imageURL: './static/img/profile-2.jpg',
        },
        images: [
            './static/img/stories/7.jpg',
            './static/img/stories/8.jpg',
            './static/img/stories/9.jpg',
            './static/img/stories/10.jpg',
            './static/img/stories/11.jpg',
        ],
    },
    {
        user: {
            name: 'Ankita',
            time: 'Today, 6:45 AM',
            imageURL: './static/img/profile-3.jpg',
        },
        images: [
            './static/img/stories/12.jpg',
        ],
    },
    {
        user: {
            name: 'Candice',
            time: 'Yesterday, 11:15 PM',
            imageURL: './static/img/profile-4.jpg',
        },
        images: [
            './static/img/stories/13.jpg',
            './static/img/stories/14.jpg',
            './static/img/stories/15.jpg',
            './static/img/stories/16.jpg',
        ],
    },
    {
        user: {
            name: 'Jack Sparrow',
            time: 'Yesterday, 09:52 PM',
            imageURL: './static/img/profile-5.jpg',
        },
        images: [
            './static/img/stories/17.jpg',
            './static/img/stories/18.jpg',
        ],
    },
];

// storiesData

const views = document.querySelectorAll('.story_view');
const cub = document.querySelector('.stories_page_container');
const btnNext = document.querySelector('.btn-next');
const btnPrev = document.querySelector('.btn-prev');

let viewIndex = 0,
    storieIndex = 0,
    imgIndex = 0,
    imgInterval = 0,
    imgProgress = 0,
    countRotation = 1,
    crrRotationDeg = 0;


const createElement = (tagName, props) => {

    const element = document.createElement(tagName);
    Object
        .entries(props)
        .forEach(([key, value]) => element.setAttribute(key, value));
    return element;
};

const rotateView = (rotation) => {
    cub.style.transform = `rotateY(-${rotation}deg)`;
};

const renderInFace = (index, element) => {
    views[index].innerHTML = '';
    views[index].append(element);
};


const nextView = () => {

    if (stories[storieIndex].images[imgIndex + 1]) {
        imgIndex++;
        imgProgress = 0;
        return;
    } else if (!stories[storieIndex + 1]) {
        return;
    }

    storieIndex++;
    countRotation++;
    crrRotationDeg += 90
    viewIndex = ((countRotation % 4) || 4) - 1;

    if (!stories[storieIndex]) {
        storieIndex = 0;
    }

    renderInFace(viewIndex, createStorie(stories[storieIndex]));
    rotateView(crrRotationDeg);
};

const prevView = () => {

    if (stories[storieIndex].images[imgIndex - 1]) {
        imgIndex--;
        imgProgress = 0;
        return;
    }

    if (crrRotationDeg <= 0) return;

    storieIndex--;
    countRotation--;
    crrRotationDeg -= 90;
    viewIndex = ((countRotation % 4) || 4) - 1;

    renderInFace(viewIndex, createStorie(stories[storieIndex]));
    rotateView(crrRotationDeg);
};

const createStorie = (storieData) => {

    imgIndex = 0;
    imgProgress = 0;

    const rootElement = createElement('div', {
        class: 'app-stories__storie',
    });

    const renderStorie = () => (
        rootElement.innerHTML = `<div class="app-storie__progress">
                ${storieData.images.map((_, index) =>(
                `
                <div class="app-storie__progress-item">
                    <div
                    class="app-storie__progress-item__bar"
                    style="width: ${index === imgIndex ? `${imgProgress}%` : (
                        index < imgIndex ? '100%' : '0%'
                    )}"
                    >
                    </div>
                </div>
                `
                )).join('')}
            </div>
            <header class="app-storie__header">
              <div class="app-storie__header__user">
                <img
                  alt="YaarMe User"
                  class="app-storie__header__user-image"
                  src="${storieData.user.imageURL}"
                />
                <h2 class="app-storie__header__user-name">
                  <span>${storieData.user.name}</span>
                  <span class="txt-sm">${storieData.user.time}</span>
                </h2>
              </div>
              <div class="app-storie__header__options">
                <span class="app-storie__header__options-circle"></span>
                <span class="app-storie__header__options-circle"></span>
                <span class="app-storie__header__options-circle"></span>
              </div>
            </header>
            
            <div class="app-storie__image">
                <div class="app-storie__image-img"
                style="background-image: url('${storieData.images[imgIndex]}')">
                </div>
            </div>`
    );

    const startImgProgress = () => {
        clearInterval(imgInterval);

        imgInterval = setInterval(() => {
            imgProgress += 10 / 3;

            if (imgIndex === storieData.images.length) {
                nextView()
                return;
            }

            if (imgProgress > 100) {
                imgIndex++;
                imgProgress = 0;
                return;
            }

            renderStorie();
        }, 100);
    };

    renderStorie();
    startImgProgress();

    return rootElement;
};

btnNext.addEventListener('click', nextView);
btnPrev.addEventListener('click', prevView);

cub.style.transformOrigin = `center center ${(-cub.clientWidth / 2)}px`;
views[2].style.transform = `translateZ(-${views[2].clientWidth}px) rotateY(180deg) translateX(-100%)`;

window.addEventListener('resize', (event) => {
  cub.style.transformOrigin = `center center ${(-cub.clientWidth / 2)}px`;
  views[2].style.transform = `translateZ(-${views[2].clientWidth}px) rotateY(180deg) translateX(-100%)`;
});

renderInFace(0, createStorie(stories[storieIndex]));