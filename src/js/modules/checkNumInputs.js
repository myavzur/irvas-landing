const checkNumInputs = (inputSelector) => {
    const inputs = document.querySelectorAll(inputSelector);

    inputs.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/g, '');
        });
    });
};

export default checkNumInputs;