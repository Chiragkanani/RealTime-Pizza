import axios  from "axios";
import Noty from "noty";
const addcart = document.querySelectorAll(".addcart")
const totalQty = document.querySelector("#totalQty")
function addToCart (e){
        let pizza =JSON.parse( e.target.dataset.pizza);
        axios.post("/update-cart",pizza).then((res)=>{
        totalQty.innerText = res.data.totalQty;
            new Noty({
                type:'success',
                text: "Item Added To cart",
                timeout:1000
            }).show();
        }).catch(err=>{
            new Noty({
                type: 'error',
                text: "Something went wrong",
                timeout: 1000
            }).show();
        })
}

addcart.forEach(Element=>{
    Element.addEventListener("click",addToCart)
})