import SockJS from 'sockjs-client';

const stompClient = null;
export const handleClickNavLeftCart = () => {
    /////
    const pageCart = document.getElementById('page-navleft-cart');
    ////
    pageCart.classList.add('page-navleft-visible');
    document.body.style.pointerEvents = 'none';
    ////
    const overCart = document.getElementById('over-navleft-cart');
    ////
    pageCart.style.pointerEvents = 'auto';
    overCart.style.visibility = 'visible';
    overCart.style.pointerEvents = 'auto';
    overCart.addEventListener('click', () => {
        pageCart.classList.remove('page-navleft-visible');
        overCart.style.visibility = 'hidden';
        document.body.style.pointerEvents = 'auto';
    });
    pageCart.addEventListener('click', (e) => {
        e.stopPropagation();
    });
};
export const handleClickNavLeftFavorite = () => {
    /////
    const pageCart = document.getElementById('page-navleft-favorite');
    ////
    pageCart.classList.add('page-navleft-visible');
    document.body.style.pointerEvents = 'none';
    ////
    const overCart = document.getElementById('over-navleft-favorite');
    ////
    pageCart.style.pointerEvents = 'auto';
    overCart.style.visibility = 'visible';
    overCart.style.pointerEvents = 'auto';
    overCart.addEventListener('click', () => {
        pageCart.classList.remove('page-navleft-visible');
        overCart.style.visibility = 'hidden';
        document.body.style.pointerEvents = 'auto';
    });
    pageCart.addEventListener('click', (e) => {
        e.stopPropagation();
    });
};
export const handleClickNavLeftNotify = () => {
    /////
    const pageCart = document.getElementById('page-navleft-notify');
    ////
    pageCart.classList.add('page-navleft-visible');
    document.body.style.pointerEvents = 'none';
    ////
    const overCart = document.getElementById('over-navleft-notify');
    ////
    pageCart.style.pointerEvents = 'auto';
    overCart.style.visibility = 'visible';
    overCart.style.pointerEvents = 'auto';
    overCart.addEventListener('click', () => {
        pageCart.classList.remove('page-navleft-visible');
        overCart.style.visibility = 'hidden';
        document.body.style.pointerEvents = 'auto';
    });
    pageCart.addEventListener('click', (e) => {
        e.stopPropagation();
    });
};
//function to set number product in cart
export const getNumber = () => {
    var number = 0;
    for (let i = 0; i < localStorage.length; i++) {
        number += parseInt(JSON.parse(localStorage.getItem(localStorage.key(i))).count);
    }
    return number;
};

//fuction change product check is false in cart
export const changeCheckToFalse = () => {
    for (var i = 0; i < localStorage.length; i++) {
        localStorage.setItem(
            localStorage.key(i),
            JSON.stringify({
                count: JSON.parse(localStorage.getItem(localStorage.key(i))).count,
                check: false,
            }),
        );
    }
};

//function format price
export const formatter = new Intl.NumberFormat('vi', {
    style: 'currency',
    currency: 'VND',
});

export const getToCheckOut = () => {
    //var to get products in cart are checked
    var productInCartCheck = [];
    for (var i = 0; i < localStorage.length; i++) {
        if (JSON.parse(localStorage.getItem(localStorage.key(i))).check == true) {
            //if product is checked,we add them to 'checkout'
            productInCartCheck = [
                {
                    productId: JSON.parse(localStorage.key(i)),
                    count: JSON.parse(localStorage.getItem(localStorage.key(i))).count,
                },
                ...productInCartCheck,
            ];
        }
    }
    return productInCartCheck;
};

export const removeAllSession = () => {
    sessionStorage.removeItem('USER');
};

export const handleClickBack = () => {
    window.location = '/';
};

export const addLoad = () => {
    document.getElementById('loader-page').classList.add('display-flex');
    document.getElementById('loader').classList.add('display-flex');
    document.body.style.pointerEvents = 'none';
};

export const removeLoad = () => {
    setTimeout(() => {
        document.getElementById('loader-page').classList.remove('display-flex');
        document.getElementById('loader').classList.remove('display-flex');
        document.body.style.pointerEvents = 'auto';
    }, 500);
};

export const connect = () => {
    var socket = new SockJS('/chat');
    stompClient = SockJS.stompClient.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/reviews', (res) => console.log(res.body));
    });
};
