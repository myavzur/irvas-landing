const forms = () => {
    const form = document.querySelectorAll('form'),
          input = document.querySelectorAll('input'),
          phoneInputs = document.querySelectorAll('input[name="user_phone"]');

    phoneInputs.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/g, '');
        });
    });

    const message = {
        loading: 'Отправка данных...',
        success: 'Отправлено! Мы свяжемся с вами!',
        failure: 'Блять...'
    };

    const postDataXML = (url, body) => {
        document.querySelector('.status').textContent = message.loading;

        let xhr = new XMLHttpRequest();

        xhr.open('POST', url, true);
        xhr.send(body);

        xhr.onload(() => {
            if (xhr.status == 200) {
                console.log(xhr.responseText);
            }
        });

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