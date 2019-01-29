const express=require('express');
const mongoose=require('mongoose');
const errorhandler=require('errorhandler');
const bodyParser=require('body-parser');
const logger=require('morgan');


const app=express();
app.use(logger('dev'));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/Bank');
const Accounts=mongoose.model('Accounts',{name:String,balance:Number});

app.get('/Accounts',(req,res)=>
	{
	Accounts.find({},(error,docs)=>{
	res.send(docs);});
	});

app.post('/Accounts',(req,res)=>
	{
		let account=new Accounts(req.body);
		account.save((error,results)=>
		{
		if(error)
			{
			console.error(error);
			process.exit(1);
			}
		else
			{
			res.send(results);
			}	
		});
	});
app.put('/Accounts/:name',(req,res)=>
	{
	Accounts.update({name:req.params.name},req.body,(error,results)=>
		{
		if(error)
			{
			console.error(error);
			process.exit(1);
			}		
		else
			{
			res.send(results);
			}
		});	
	});
app.delete('/Accounts/:name',(req,res)=>
	{
	Accounts.deleteOne({name:req.params.name},(error,results)=>	
		{
			if(error)
				res.status(404).send();
			res.send(results);
		});
	});


app.listen(3000);
