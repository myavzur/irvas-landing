import {closeModal, openModal} from './modals';

const images = () => {
    const imgPopup = document.createElement('div'),
          bigImage = document.createElement('img'),
          gallerySection = document.querySelector('.works');
    imgPopup.classList.add('popup');

    gallerySection.append(imgPopup);

    imgPopup.style.cssText = `display: none; justify-content: center; align-items: center`;
    bigImage.style.cssText = `max-width: 50%; max-height: 80vh`;

    imgPopup.append(bigImage);

    gallerySection.addEventListener('click', (e) => {
        e.preventDefault();

        const target = e.target;

        if (target && target.classList.contains('preview')) {
            const path = target.parentNode.getAttribute('href');
            bigImage.setAttribute('src', path);

            console.log(imgPopup);
            openModal(imgPopup, 'flex');
        }

        if (target && target.matches('div.popup')) {
            closeModal(imgPopup);
        }
    });
};

export default images;