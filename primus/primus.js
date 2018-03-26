exports.gogo = function(server){
    console.log("gogo server");

    const Primus = require('primus');
    let primus = new Primus(server, {});

    //primus.save(__dirname +'/primuslib.js');

    primus.on('connection', function(spark){
        console.log("spark is the new connection");

        spark.on('data', function(data){
            primus.write(data);
        });

    });
}