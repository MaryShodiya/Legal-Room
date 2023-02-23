module.exports = {
    getIndex: (req,res)=>{
        res.render('index.ejs')
    },
    getForgotPassword: (req,res)=>{
        res.render('forgot.ejs')
    }
}