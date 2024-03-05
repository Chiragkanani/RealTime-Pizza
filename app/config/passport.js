const Passport_local = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcrypt')


 function init (passport){
    passport.use(new Passport_local({usernameField:'email'},async (email,password,done)=>{
        let user = await   User.findOne({ email: email })
            if (!user) { return done(null, false,{message:'No User With This Email'}); }

            bcrypt.compare(password,user.password).then(match=>{
                if (match) {
                    return done(null, user, { message: 'Log in successfully' });
                }else{
                    return done(null, false, { message: 'Wrong Passwordtry again' })
                }
            }).catch((err)=>{
                return done(null, false, { message: 'Something went wrong' })
            })

        

    }))

    passport.serializeUser((user,done)=>{
        done(null,user._id)
    })

    passport.deserializeUser(async (id,done)=>{
       User.findById({_id:id}).then((user)=>{
           done(null, user)
       }).catch((err)=>{
           done(err)
       })
        
    })


}

module.exports = init