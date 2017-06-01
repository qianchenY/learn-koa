const Koa=require("koa");

const router=require("koa-router")();

const bodyParse=require("koa-bodyparser");

const app=new Koa();

app.use(async (ctx,next) => {
    await next();
    console.log(`Process:${ctx.method},${ctx.url},${ctx.status}`);
})

router.get('/hello/:name',async (ctx,next) => {
    var name=ctx.params.name;
    ctx.response.body=`<h1>Hello ${name}!</h1>`;
})

router.get('/',async (ctx,next) => {
    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
})

router.get('/404',async (ctx,next) => {
    ctx.response.redirect('/');
})

router.post('/signin',async (ctx,next) => {
    var name=ctx.request.body.name || "",
        password=ctx.request.body.password || "";
    console.log(`signin with name: ${name}, password: ${password}`);    
    if(name=="koa"&&password=="12345"){
        ctx.body=`<h1>Welcome, ${name}!</h1>`;
    }else{
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;        
    }
})


app.use(bodyParse());

app.use(router.routes());

app.listen(3000);
console.log('app started at port 3000...')