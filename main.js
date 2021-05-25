const list = $('#list');

function closePopUp() {
    $('#popup').attr('style', "display:none;");
    cart.renderCart()
}

function getItemCount(id) {
    const cartItem = cart.items.find((i) => i.id === id)
    return (typeof cartItem !== "undefined") ? cartItem.count : 0;
}

function getItem(id) {
    return cart.items.find((i) => i.id === id)
}
const foods = [{
        id: 1,
        name: 'Spicy Rote Pasta and Cheese',
        img: 'assets/plate-1.png',
        price: 139.01,
        rating: 3.9,
    },
    {
        id: 2,
        name: 'Cured Salmon',
        img: 'assets/plate-2.png',
        price: 29.99,
        rating: 4.5,
    },
    {
        id: 3,
        name: 'Poke with Chicken',
        img: 'assets/plate-3.png',
        price: 34.45,
        rating: 5.0,
    },
    {
        id: 4,
        name: 'Macaroni baby with red sauce',
        img: 'assets/plate-1.png',
        price: 15.99,
        rating: 2.8,
    },
    {
        id: 5,
        name: 'Stake Beef with special oil',
        img: 'assets/plate-2.png',
        price: 12.99,
        rating: 3.6,
    },
    {
        id: 6,
        name: 'Stake Beef with special oil',
        img: 'assets/plate-2.png',
        price: 12.99,
        rating: 3.6,
    },
    {
        id: 7,
        name: 'Stake Beef with special oil',
        img: 'assets/plate-2.png',
        price: 12.99,
        rating: 3.6,
    },
    {
        id: 8,
        name: 'Stake Beef with special oil',
        img: 'assets/plate-2.png',
        price: 12.99,
        rating: 3.6,
    },
    {
        id: 9,
        name: 'Stake Beef with special oil',
        img: 'assets/plate-2.png',
        price: 12.99,
        rating: 3.6,
    },
]

const cart = {
    items: [],
    discount: 0,
    updateItem(id, count, item) {
        const element = getItem(id)
        if (element) {
            this.items = this.items.map(item => {
                if (element.count === 0 && count < 0) {
                    return item
                } else {
                    return item.id === id ? {
                        ...item,
                        count: element.count + count
                    } : item
                }
            })
            this.items = this.items.filter(item => item.count)

        } else {
            if (count > 0) {
                this.items.push({
                    ...item,
                    count: 1
                })
            }
        }
        renderMain()
        this.renderCart()
        this.renderCheckout()
        this.renderCheckout()
    },
    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id)
        renderMain()
        this.renderCart()
        this.renderCheckout()
    },
    calculatePrice() {
        return this.items.reduce((total, food) => total + (food.count * food.price), 0).toFixed(2)
    },
    calculateTax() {
        return (this.calculatePrice() * 0.09).toFixed(2)
    },
    calculateDiscount() {
        return (this.calculatePrice() * this.discount).toFixed(2)
    },
    calculateTotal() {
        const foodPrice = this.calculatePrice()
        const foodTaxes = this.calculateTax()
        const foodDiscount = this.calculateDiscount()

        return (parseFloat(foodPrice) + parseFloat(foodTaxes) - foodDiscount).toFixed(2)
    },
    renderCart() {
        if (this.items.length === 0) {
            $('.cart').html(`<div class="empty-cart text-center pb-4">
            <i class="fa fa-shopping-cart shopping-cart"></i>
            <p class="m-0">Your shopping cart is empty!</p>
        </div>`)

        } else {
            $('.empty-cart').attr('style', 'display:none;')

            const result = this.items.map(item => {
                return `
                <div class="container border-bottom border-light pb-1 mb-3">
					<div class="row">
						<div class="col-12 d-flex justify-content-between mb-1">
							<p class="m-0 cart-title">${item.name}</p>
							<i class="fa fa-times my-auto remove-item" onclick="cart.removeItem(${item.id})"></i>
						</div>
						<div class="col-12 d-flex justify-content-between">
							<div class="cart-count d-flex">
								<i class="fa fa-minus my-auto px-2 mb-0" onclick="cart.updateItem(${item.id} , -1 )"></i>
								<p class="mx-2 my-0">${item.count}</p>
								<i class="fa fa-plus my-auto px-2 mb-0" onclick="cart.updateItem(${item.id} , 1 )"></i>
							</div>
							<div class="cart-price">${item.price}$</div>
						</div>
					</div>
				</div>
                `
            })
            $('.cart').html(result.join(''))
        }

    },
    renderCheckout() {
        $('.checkout-price').html(this.calculatePrice() + '$')
        $('.checkout-taxes').html(this.calculateTax() + '$')
        $('.checkout-discount').html(this.calculateDiscount() + '$')
        $('.checkout-total').html(this.calculateTotal() + '$')
    },
    checkDiscount() {
        const code = $('.check-code input').val();
        if (code === "hey") {
            this.discount = 0.2
            document.getElementById('hghg').style.background = "#00c341"
            // $(".check-code i").mousedown(function () {
                //     $(this).attr("style", "background: #009030;")
            // });
            // $(".check-code i").mouseup(function () {
                //     $(this).attr("style", "background: #00c341;")

            // });
            console.log(this.discount)
            this.renderCheckout()
        } else {
            this.discount = 0
            this.renderCheckout()
            document.getElementById('hghg').style.background = "#ffa600"
            // $(".check-code i").mouseup(function () {
                //     $(this).attr("style", "background: #ffa600;")

            // });
            // $(".check-code i").mousedown(function () {
            //     $(this).attr("style", "background: #ff7b00;")
            // });
            
        }
    }
}
//change the number of items of the selected food
function popupCount(id, count) {
    cart.updateItem(id, count, foods[id - 1])

    const cartItemCount = getItemCount(id)
    $('#popup .pop-count').html(cartItemCount);
    $('#popup .pop-total').html((cartItemCount * foods[id - 1].price).toFixed(2));
    renderMain()
    cart.renderCart()
}

//Render PopUp screen
function renderPopup(id) {
    //Render elements
    const index = id - 1
    $('#popup img').attr('src', foods[index].img);
    $('#popup .pop-title').html(foods[index].name);
    $('#popup .pop-price').html(foods[index].price);
    $('#popup .pop-rate').html(foods[index].rating);

    const cartItemCount = getItemCount(id)

    $('#popup .pop-count').html(cartItemCount);
    $('#popup .pop-total').html((cartItemCount * foods[index].price).toFixed(2));
    //Add items
    $('#popup .pop-plus').attr('onclick', `popupCount(${id},1)`)
    //Remove items
    $('#popup .pop-minus').attr('onclick', `popupCount(${id}, -1)`)
    $('#popup').attr('style', "display:grid;");
}

//Render Main List
function renderMain() {
    const result = foods.map((item, index) => {

        const cartItemCount = getItemCount(item.id)
        return `
        <div class="box" onclick="renderPopup(${index+1})">
                <img src="${item.img}" alt="" />
                <div class="rating">${item.rating} <i class="fa fa-star"></i></div>
                <p class="m-0">${item.name}</p>
                <h5><span>$</span>${item.price}</h5>
                <h6>${cartItemCount}</h6>
            </div>
        `

    })
    list.html(result.join(''))
}




cart.renderCheckout()
renderMain()