let label=document.getElementById("label")
let shoppingCart=document.getElementById("shopping-cart")

console.log

let basket=JSON.parse(localStorage.getItem("data")) || [];

let calculation =()=>{
    let cartAmount=document.getElementById("cart_Amount")
    cartAmount.innerHTML=(basket.map((x)=>x.item).reduce((x,y)=>x+y,0))  
     //console.log((basket.map((x)=>x.item).reduce((x,y)=>x+y,0)))
}

calculation();

let generateCardItems = () => {
    if(basket.length!=0){ 
        return (shoppingCart.innerHTML=basket.map((x)=>{
           
            let {id,item}=x;

            let search= shopItemsData.find((y)=> y.id === id) || [];
            let {img,name,price} = search;
            return `

            <div class="cart-item">
            <img width="100" src=${img}  alt=""/>
           
            <div class="details">
            <div class="title-price-x">
                <h4 class="title-price">
                 <p>${name}</p>
                 <p class="cart-item-price">$${price}</p>
                </h4>
                <i  onclick="removeItems(${id})" class="bi bi-x"></i>
            </div>
            <div class="buttons">

                <i onclick="decrement(${id})" class="bi bi-dash"></i>
                <div id=${id} class="quantity">${item}</div>
                <i  onclick="increment(${id})" class="bi bi-plus"></i>
                
           </div>
            <h3> $ ${item * search.price }</h3>
           

            

            </div>
    
            </div>
            `;
        }).join(""));

    }
    else {
        shoppingCart.innerHTML=``;
        label.innerHTML=`
        <h2> Cart is empty</h2>
        <a href="index.html">
        <button class="homeBtn">Clothing Store</button></a>
        `;
  
    }
}

generateCardItems();

let increment = (id) => {
    let selectedItem=id;

    let search=basket.find((x)=> x.id === selectedItem.id);

    if(search === undefined){
        basket.push({
            id:selectedItem.id,
            item:1,
        });

    }else
    {
        search.item +=1;
    }


    localStorage.setItem("data",JSON.stringify(basket));
    generateCardItems();
update(selectedItem.id);
}

let decrement = (id) => {
    let selectedItem=id;

    let search=basket.find((x)=> x.id === selectedItem.id);

    if(search=== undefined)
    return;

    else  if(search.item === 0)
      return ;
    else
    {
        search.item -=1;
    }
    
   // console.log(basket);
   update(selectedItem.id);
   
   basket= basket.filter((x)=> x.item !== 0)
   generateCardItems();
    
    localStorage.setItem("data",JSON.stringify(basket));
}

let update = (id) => {
    let search= basket.find((x)=> x.id === id)
    //console.log(search.item);
    document.getElementById(id).innerHTML=search.item;
    calculation();
    totalAmount();
}

let removeItems =(id)=>{

    let selectedItem=id;
    basket=basket.filter((x)=> x.id !==selectedItem.id)
    generateCardItems();
    totalAmount();
    calculation();
    localStorage.setItem("data",JSON.stringify(basket));

}

let totalAmount =()=>{
    if(basket.length !=0){
        let amount = basket.map((x)=>{
            let  {item,id}=x;
            let search= shopItemsData.find((y)=> y.id === id) || [];
            return item * search.price;

        }).reduce((x,y)=> x+y,0);
        console.log(amount);
        label.innerHTML=`
        <h2>Total Bill : $${amount}</h2>
        <button class="checkout">Checkout</button>
        <button  onclick="clearCart()" class="removeAll">Clear Cart</button>
        `


    }
    else
    return;
}

totalAmount();

let clearCart= ()=>{
    basket = [];
    generateCardItems();
    calculation();
    localStorage.setItem("data",JSON.stringify(basket));
}

