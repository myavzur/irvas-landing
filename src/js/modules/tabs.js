const tabs = (headerSelector, tabSelector, contentSelector, activeClass) => {
    const header = document.querySelector(headerSelector),
          tab = document.querySelectorAll(tabSelector),
          content = document.querySelectorAll(contentSelector); 

    console.log(header);
    console.log(tab);
    console.log(content);
    console.log(activeClass);

    function hideTabContent() {
        content.forEach(item => {
            item.style.display = 'none';
            item.classList.remove('animated', 'fadeIn');
        });
        tab.forEach(item => item.classList.remove(activeClass));
        
    } 

    function showTabContent(i = 0) {
        content[i].style.display = 'block';
        content[i].classList.add('animated', 'fadeIn');
        tab[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    header.addEventListener('click', (e) => {
        const target = e.target;
        console.log(target);
        console.log(target.parentNode);

        if (target && target.classList.contains(tabSelector.replace(/\./g, '')) ||
            target && target.parentNode.classList.contains(tabSelector.replace(/\./g, ''))) {

            tab.forEach((item, i) => {
                if (item === target || item === target.parentNode) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
};

export default tabs;