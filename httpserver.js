http = require('http');
fs = require('fs');
server = http.createServer( function(req, res) {

    console.dir(req.param);

    if (req.method == 'POST') {
        console.log("POST");
        var body = '';
        const child = require('child_process').exec;
        req.on('data', function (data) {
            body+=data;
            var par_data = JSON.parse(body);

            var obj_body = body.slice(2,10);//__UserID 8, SongName 8, SerialNo 8
           
            if(obj_body=='__UserID'){

                var cmdString = 'python untitled3.py '+par_data.__UserID;
                console.log(cmdString);
                child(cmdString, (err, stdout, stderr) => {
                  var the_res = stdout.split("\n",2);
                  res.end(the_res[1]);
                });
            }else if(obj_body=='SongName'){

                var cmdString = 'python untitled3_.py '+par_data.likeornot+' '+par_data.SerialNo;
                console.log(cmdString);
                child(cmdString, (err, stdout, stderr) => {
                    console.log("recv: "+stdout);
                  // var the_res = stdout.split("\n",2);
                  // res.end(the_res[1]);
                });
            }
        });
        req.on('end', function () {
            console.log("Body: " + body);
        });
        res.writeHead(200, {'Content-Type': 'text/html'});
        // res.end(res[1]);
    }
    else
    {
        console.log("GET");
        //var html = '<html><body><form method="post" action="http://localhost:3000">Name: <input type="text" name="name" /><input type="submit" value="Submit" /></form></body>';
        var html = fs.readFileSync('index.html');
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(html);
    }

});

port = 3000;
host = '127.0.0.1';
server.listen(port, host);
console.log('Listening at http://' + host + ':' + port);