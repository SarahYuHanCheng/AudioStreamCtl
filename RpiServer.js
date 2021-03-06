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
            }else if(obj_body=='PlaySong'){
            	console.log("in PlaySong: "+par_data.PlaySong);
            	var cmdString = 'pkill aplay; aplay -D equal '+par_data.PlaySong+'; ';
               
                child(cmdString, (err, stdout, stderr) => {
      
                  res.end("playing");
                  
                });
                
            }else if(obj_body=='WithEqga'){
            	var cmdString = "";

            	var each_ga = par_data.eq_ga.split("\n");
            	console.log("each_ga: "+each_ga);
                for (var i = 0; i < 10; i++) {
                	cmdString+='amixer -D equal cset numid='+(i+1)+' '+each_ga[i]+'; ';
                }

                // 'amixer -D equal cset numid='+numid+' '+gain
                console.log("cmdString: "+cmdString);
                child(cmdString, (err, stdout, stderr) => {
                  // var the_res = stdout.split("\n",2);

                  res.end("equaling");
                  
                });
            }else if(obj_body=='StopSong'){
            	// var vol_rec = par_data.Play_vol;
                var cmdString = 'pkill aplay';
                console.log(cmdString);
                child(cmdString, (err, stdout, stderr) => {
                  // var the_res = stdout.split("\n",2);
                  res.end("stop");
                  
                });
            }else if(obj_body=='Play_vol'){
            	// var vol_rec = par_data.Play_vol;
                var cmdString = 'amixer --card=0 sset Digital '+par_data.Play_vol+'%';
                console.log(cmdString);
                child(cmdString, (err, stdout, stderr) => {
                  // var the_res = stdout.split("\n",2);
                  res.end("adjvol");
                  
                });
            }
        });
        req.on('end', function () {
            // console.log("Body: " + body);
        });
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end("end");
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