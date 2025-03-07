const button = document.getElementById('checkout')
//STRIPE PAY FRONTEND JS FOR CHECKOUT URL
button.addEventListener('click', () => {

    const referer = window.location.href

    fetch('/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            items: [
               { id: 1, quantity: 1 },
               { id: 2, quantity: 1 },
               
            ],
            referer: referer,
        })
    })  .then(res => {
        if (res.ok) {
            return res.json();
        } else {
            return res.json().then(json => Promise.reject(json));
        }
    })
    .then(({ url }) => {
    window.location = url
    console.log(url)
}).catch(error => {
    console.log(error)
})
})