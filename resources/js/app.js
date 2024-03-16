import axios  from "axios";
import Noty from "noty";
import moment from 'moment';

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
});


const success_alert = document.querySelector("#success-alert") 
setTimeout(()=>{
    success_alert.style.display = "none" 
},3000)

function initAdmin() {

    const ordertablebody = document.querySelector("#ordertablebody");
    let orders = [];
    let markup;

    axios.get("/admin/orders", {
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then(res => {
        orders = res.data;
        markup = generateMarkup(orders);
        ordertablebody.innerHTML = markup
    }).catch(err => {
        console.log(err)
    })


    function generateMarkup(orders) {
        return orders.map((element) => {
            return ` <tr>
                        <td class="px-4 py-2"> <a href="/" class="primary">
                           <p> ${element._id}</p>
                           <div>${renderItems(element.items)}</div>
                                
                           
                            </a> </td>
                        <td class="px-4 py-2">
                            ${element.customer_id.name}
                        </td>
                        <td class="px-4 py-2">
                            ${element.address}
                        </td>
                        <td class="px-4 py-2">
                        <form action="/admin/orders/status" method="post">
                        <input type="hidden" name="order_id" value="${element._id}">
                            <select name="status" id="" onchange="this.form.submit()">
                        <option value="confirmed" ${element.status == "confirmed" ? 'selected' : ''}  >Confirmed</option>
                         <option value="order_placed" ${element.status == "order_placed" ? 'selected' : ''}  >Order Placed</option>
                                <option value="prepared" ${element.status == "prepared" ? 'selected' : ''}  >Prepared</option>
                                <option value="deliverd" ${element.status == "deliverd" ? 'selected' : ''}  >Deliverd</option>
                                <option value="completed" ${element.status == "completed" ? 'selected' : ''}  >Completed</option>
                            </select>
                            </form>
                        </td>
                        
                        <td class="px-4 py-2">
                            ${element.phone}
                        </td>
                        <td class="px-4 py-2">
                            ${moment(element.createdAt).format('hh:mm A')}
                        </td>
                    </tr>`
        }).join('')

    }

    function renderItems(items) {
        let string = ''
        for (const key in items) {
            string += `<p>${items[key]['item'].name} - ${items[key].qty} pcs</p> `
        }
        return string;
    }

}

initAdmin()

let status_lines = document.querySelectorAll(".status_line")
let order = document.querySelector("#hiddeninput")?document.querySelector("#hiddeninput").value :null;

order = JSON.parse(order)


function updateStatus(order){
    let stepcompleted = true;

    status_lines.forEach((item)=>{
        if (item.classList.contains("step-completed")) {
            item.classList.remove("step-completed")
        }
        if (item.classList.contains("current")) {
            item.classList.remove("current")
        }
    })

    status_lines.forEach((item)=>{
        if (stepcompleted) {
            item.classList.add('step-completed')
        }
        if (order.status === item.dataset.status) {
            stepcompleted = false;
        item.classList.add("current")
       } 
    })
}

updateStatus(order)


const socket = io();
if (order) {
    socket.emit('join',`order_${order._id}`)
}

socket.on("orderUpdated",(data)=>{
    const updatedOrder = {...order}
    updatedOrder.updatedAt = moment().format()
    updatedOrder.status = data.status;
    // console.log(data)
    updateStatus(updatedOrder);

})

if (location.pathname === '/admin/orders') {
    socket.emit('join', 'admin')
}

socket.on("orderArrived",()=>{
    console.log("order updated");
    initAdmin()
})
