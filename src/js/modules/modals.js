const modalTimerId = setTimeout(() => openModal(document.querySelector('body > .popup')), 5000);

function calcScroll() {
    const div = document.createElement('div');

    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';

    document.body.append(div);

    const scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    return scrollWidth;        
} 
// Page not jumping anymore

function closeModal (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
    document.body.style.marginRight = '0px';
}

function openModal(modal, display = 'block') {    
    const scrollWidth = calcScroll();

    modal.style.display = display;
    document.body.style.overflow = 'hidden';
    document.body.style.marginRight = `${scrollWidth}px`;

    if (modalTimerId) {
        clearTimeout(modalTimerId);
    }
}

const modals = () => {
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = modal.querySelector(closeSelector),
              windows = document.querySelectorAll('[data-modal]');

        trigger.forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }

                windows.forEach(item => {
                    closeModal(item);
                });
    
                openModal(modal);
                // document.body.classList.add('modal-open');
            });
        });

        close.addEventListener('click', () => {
            windows.forEach(item => {
                closeModal(item);
            });

            closeModal(modal);
            // document.body.classList.remove('modal-open');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeClickOverlay) {
                closeModal(modal);
                // document.body.classList.remove('modal-open');
            }
        });
    }

    bindModal(
        '.popup_engineer_btn',
        '.popup_engineer',
        '.popup_close'
    );

    bindModal(
        '.phone_link',
        '.popup',
        '.popup_close'
    );

    bindModal(
        '.popup_calc_btn',
        '.popup_calc',
        '.popup_calc_close',
    );

    bindModal(
        '.popup_calc_button',
        '.popup_calc_profile',
        '.popup_calc_profile_close',
        false
    );
    
    bindModal(
        '.popup_calc_profile_button',
        '.popup_calc_end',
        '.popup_calc_end_close',
        false
    );
};

export default modals;
export {closeModal, openModal};