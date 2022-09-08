//Add to cart
const addToCart = (cartBtn) =>{
    const productName = cartBtn.parentNode.parentNode.children[0].innerText;
    const price = cartBtn.parentNode.parentNode.children[2].children[0].innerText;
    //Get the cart if exist
    const cart = JSON.parse(localStorage.getItem('Cart'));
    if(!cart){
        const cartItems = [
            {
                name: productName,
                price: price,
            }
        ];
        localStorage.setItem('Cart', JSON.stringify(cartItems));
    }
    else{
        const cartItems = [
            ... cart,
            {
                name: productName,
                price: price,
            }
        ];
        localStorage.setItem('Cart', JSON.stringify(cartItems));
    }
    displayItems();
}

const displayItems = () =>{
    //Get cart container
    const tableContainer = document.getElementById('table-container');
    tableContainer.innerHTML = '';
    //Get the cart items from local storage
    const cartItems = JSON.parse(localStorage.getItem('Cart'));
    let serial = 0;
    //Get the entire table
    const cartTable = document.getElementById('cart-table');
    //If there is no item in the cart, then completely hide the cart table
    if(cartItems === null){
        cartTable.classList.add('hidden');
    }
    else{
        cartTable.classList.remove('hidden');
        cartItems.forEach(product => {
            serial++;
            const tableRow = document.createElement('tr');
            tableRow.innerHTML = `
            <th>${serial}</th>
            <td>${product.name}</td>
            <td>$${product.price}</td>
            `
            tableContainer.appendChild(tableRow);
        });
    }
    //When We have array like object we should use reduct to find the sum of all price
    const totalPrice = cartItems.reduce((prev, next) => prev + parseInt(next.price), 0);
    document.getElementById('total-price').innerHTML = `$${totalPrice}`;
}
displayItems();
