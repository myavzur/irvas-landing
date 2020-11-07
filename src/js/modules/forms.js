import checkNumInputs from './checkNumInputs';

const forms = (state) => {
    const form = document.querySelectorAll('form'),
          input = document.querySelectorAll('input');

    checkNumInputs('input[name="user_phone"]');

    const message = {
        loading: 'Отправка данных...',
        success: 'Отправлено! Мы свяжемся с вами!',
        failure: 'Блять...'
    };

    const postData = async (url, body) => {
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: 'POST',
            body: body
        });

        return await res.text();
    };

    form.forEach( item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMsg = document.createElement('div');
            statusMsg.classList.add('status');
            item.appendChild(statusMsg);

            const formData = new FormData(item);

            if (item.getAttribute('data-calc') === 'end') {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }

            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMsg.textContent = message.success;
                })
                .catch(() => {
                    statusMsg.textContent = message.failure;
                })
                .finally(() => {
                    input.forEach(item => item.value = '');
                    setTimeout(() => {
                        statusMsg.remove();
                    }, 5000);
                });
        });
    });
};

export default forms;