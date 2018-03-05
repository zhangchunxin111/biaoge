var express=require("express");
var app=express();
var fs=require("fs");
var path=require("path");
var mysql=require("mysql")
app.set("views","/views");
app.use(express.static("public"));
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  // port:"3306",
  password : '',
  database : '180302'
});
app.get("",function(req,res){
	res.sendFile(path.join(__dirname,"views/index.html"))
});
// 查询
app.get("/select",function(req,res){
	connection.query("select * from demo",function(err,result){
		res.end(JSON.stringify(result))
	})
});
app.get("/add",function(req,res){
	connection.query("insert into demo (name,sex,age) values('','','')",function(err,result){
		res.end(result.insertId.toString())
	})
});

app.get("/del",function(req,res){
  var id=req.query.id;
  connection.query(`delete from demo where id=${id}`,function(err,result){
    if(result.affectedRows>0){
      res.end("ok")
    }
  })
});
app.get("/edit",function(req,res){
  var id=req.query.id;
  var str=req.query.str;
  var newv=req.query.newv;
  console.log(id,str,newv)
  connection.query(`UPDATE info SET ${str}='${newv}' WHERE id=${id}`,function(err,result){
    res.end("ok")
  })
})

var server = app.listen(7895, function () {
    var host = server.address().address;
    var port = server.address().port;
	console.log('Example app listening at http://%s:%s ', host, port);
});