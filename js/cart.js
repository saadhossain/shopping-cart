//Add to cart
const addToCart = (cartBtn) =>{
    const productName = cartBtn.parentNode.parentNode.children[0].innerText;
    const price = cartBtn.parentNode.parentNode.children[2].children[0].innerText;
    console.log(productName, price);
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
    // console.log(cart);
    displayItems();
}

const displayItems = () =>{
    const tableContainer = document.getElementById('table-container');
    tableContainer.innerHTML = '';
    const cartItems = JSON.parse(localStorage.getItem('Cart'));
    let serial = 0;
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
    //When We have array like object we should use reduct to find the sum of all price
    const totalPrice = cartItems.reduce((prev, next) => prev + parseInt(next.price), 0);
    document.getElementById('total-price').innerHTML = `$${totalPrice}`;
}
displayItems();
