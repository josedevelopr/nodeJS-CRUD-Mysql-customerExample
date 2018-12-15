const controller={};

controller.list = (req,res)=>{
    //Accedemos a la conexion
    req.getConnection((err,conn)=>{
        //Ejecutamos el query de mysql para consultar la tabla customer
        conn.query('SELECT * FROM customer',(err,customers)=>{
            if(err)
            {
                res.json(err);
            }            
            res.render('customers',{
                data:customers
            });
        });
    });
};

controller.save=(req,res)=>
{
    req.getConnection((err,conn)=>
    {
        const data = req.body;
        //Luego del set colocamos '?' para evitar la mySql injecction
        conn.query('INSERT INTO customer set ?',[data],(err,customer)=>
        {            
            res.redirect('/');
        });
    })
};

controller.edit=(req,res)=>
{
    const {id} = req.params;
    req.getConnection((err,conn)=>{
        conn.query('SELECT * FROM customer WHERE id=?',[id],(err,customer)=>
        {            
            res.render('customer_edit',{
               //Lo que se obtiene luego es un arrar, es por eso que se debe especificar la posicion del objeto a ver
                data : customer[0]
            });
        });
    });
};

controller.update=(req,res)=>
{
    const {id} = req.params;
    const newCustomer =req.body;
    req.getConnection((err,conn)=>
    {
        conn.query('UPDATE customer set ?  WHERE id =?',[newCustomer,id],(err,customer)=>
            {
                res.redirect('/');
            });
    });
};

controller.delete=(req,res)=>
{
    req.getConnection((err,conn)=>
    {
        //Tambien se puede enviar el id  de esta forma
        //const id = req.params.id;

        //Esta es una forma mas actual que tiene javascript
        const {id} = req.params;
        req.getConnection((err,conn)=>{
            conn.query('DELETE FROM customer where id = ?',[id],(err,customer)=>
            {
                res.redirect('/');
            });
        });
    })
};

module.exports = controller;