// import moment from 'moment';
// import axios from "axios";

function initAdmin (){

    const ordertablebody = document.querySelector("#ordertablebody");
    let orders = [];
    let markup;

    axios.get("/admin/orders",{
        headers:{
            "X-Requested-With":"XMLHttpRequest"
        }
    }).then(res=>{
        orders = res.data;
        markup = generateMarkup(orders);
        ordertablebody.innerHTML = markup
    }).catch(err=>{
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
                        <form action="admin/orders/status" method="post">
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


module.exports= initAdmin