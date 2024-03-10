const User = require("../../models/user")
const bcrypt = require('bcrypt')
const passport = require('passport')

const authController = () => {

    return {
        login(req, res) {
            res.render('auth/login')
        },
        async postlogin(req, res, next) {


            passport.authenticate('local',(err,user,info)=>{
                if(err){
                    req.flash('error',info.message)
                    return next(err)
                }
                if(!user){
                    req.flash('error', info.message)
                    return res.redirect('/login')
                }

                req.logIn(user,(err)=>{
                    if (err) {
                        req.flash('error', err)
                        return next(err)   
                    }
                    if (req.user.role === 'customer') {
                        return res.redirect("/customer/orders")
                    }else if (req.user.role === 'admin') {
                        return res.redirect("/admin/orders")
                    }
                })
            })(req,res,next)


        },
        register(req, res) {
            res.render('auth/register')
        },
      async  addUser(req,res){
            const {name,email,password} = req.body;
            if (!name || !email || !password) {
                req.flash('error','All field Required')
                req.flash('name',name)
                req.flash('email',email)
                res.redirect('/register')
            }

                 let result = await  User.exists({email:email});
                if (result) {
                    req.flash('error', 'Email Already Exists Try Another one')
                    req.flash('name', name)
                    req.flash('email', email)
                    res.redirect("/register")
                }else{
                    const hashPassword = await bcrypt.hash(password, 11);
                    let data = new User({
                        name: name,
                        email: email,
                        password: hashPassword
                    })

                    data.save().then((user) => {
                        res.redirect("/")
                    }).catch((err) => {
                        console.log(err)
                        req.flash('error', 'Something Went Wrong')
                        res.redirect("/register")
                    })   
                }  
        },
         logout(req,res){
            req.logout((err)=>{
                console.log(err)
            })
            return res.redirect("/")
        }




    }
}

module.exports = authController