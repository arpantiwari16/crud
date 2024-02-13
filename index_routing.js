let express=require("express")   //express
let app=express();                                          
let route=require("./routes/myroute")
let connectDB=require('./utils/db')

app.use(express.static("public"))
app.set("view en0gine","ejs")
app.use(express.urlencoded({extended:true}))
app.use(express.json())
connectDB();
app.use("/",route);

app.listen(2000,()=>{console.log("server started at 2000")});