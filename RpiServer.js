// rpi server
http = require('http');
fs = require('fs');
server = http.createServer( function(req, res) {

    console.dir(req.param);

    if (req.method == 'POST') {
        
        var body = '';
        const child = require('child_process').exec;
        req.on('data', function (data) {
            body+=data;
            console.log("data: "+data);
            var par_data = JSON.parse(body);

            var obj_body = body.slice(2,10);//__UserID 8, SongName 8, PlaySong 8
           
            if(obj_body=='PlayerEq'){
            	var PlayerEq_rec = par_data.PlayerEq;
            	console.log(PlayerEq_rec);
            	console.log(par_data.PlayerEq[0]);
            	
                // // var cmdString = 'firefox https://www.youtube.com/watch?v='+par_data.url+'?autoplay=1';
                // var cmdString = 'aplay -D equal '+par_data.url+' &';
                // // for (var i = Things.length - 1; i >= 0; i--) {
                // // 	cmdString+='amixer -D equal cset numid='+numid+' '+gain;
                // // }
                // 'amixer -D equal cset numid='+numid+' '+gain
                // console.log(cmdString);
                // child(cmdString, (err, stdout, stderr) => {
                //   // var the_res = stdout.split("\n",2);
                //   // res.end(the_res[1]);
                  
                // });
            }else if(obj_body=='playsong'){
            	console.log("in playson: "+par_data);
            	// var cmdString = 'firefox https://www.youtube.com/watch?v='+par_data.url+'?autoplay=1';
                var cmdString = 'aplay -D equal '+par_data.PlaySong+' &';
                // for (var i = Things.length - 1; i >= 0; i--) {
                // 	cmdString+='amixer -D equal cset numid='+numid+' '+gain;
                // }
                console.log("eq: "+par_data.eq_ga);
                'amixer -D equal cset numid='+numid+' '+gain
                
                child(cmdString, (err, stdout, stderr) => {
                  // var the_res = stdout.split("\n",2);
                  // res.end(the_res[1]);
                  
                });
            }else if(obj_body=='Play_vol'){
            	// var vol_rec = par_data.Play_vol;
                var cmdString = 'amixer --card=0 sset Digital '+par_data.Play_vol+'%';
                console.log(cmdString);
                child(cmdString, (err, stdout, stderr) => {
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

port = 8080;
server.listen(port);
console.log('Listening at : ' + port);