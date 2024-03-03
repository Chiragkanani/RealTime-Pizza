const menu = require("../../models/menu")

const homeController = ()=>{

    return {
       async index(req,res){
            let data = await menu.find()
            res.render('home',{data:data})
        }
    }
}

module.exports = homeController