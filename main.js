$(function(){
	var $songlist = $('#songlist');
	var $name = $('#SongName');
	var $UserID = $('#UserID');
	var $URL = $('#url');
	var eq=' ';
 function addtolist(song){
 	$songlist.append('<li>name: '+song.name+', likeornot: '+song.likeornot+'</li>');


 }
	$.ajax({
	type:'GET',
	url:'likeornot.json',
	success: function(songlists){
		console.log(songlists);
		var obj = JSON.parse(songlists);

		$.each(obj,function(i,obj){
			console.log(obj);
			addtolist(obj);
		 });
	},
	error: function(){
		alert("error loading songs")
	}
	});
	$('#SendUserId').on('click',function(){
		
		var _UserID ={
			__UserID : $UserID.val(),
		}
		var str_UserID = JSON.stringify(_UserID);
		console.log(str_UserID);
		$.ajax({
			type:'POST',
			url:'http://192.168.1.179:3000',
			data:str_UserID,
			success: function(eq_SerialNo){
			console.log(eq_SerialNo.length);
			var the_res = eq_SerialNo.split(" ");
			console.log(the_res[1]);
			// $SerialNo;
			eq+=the_res;
			console.log(the_res);
			document.getElementById("eq_ga").innerHTML = the_res;
			// document.getElementById("SerialNo").innerHTML = the_res[1];

			},
			error:function(){
				console.log("error");
				alert("error in UserID");
			}
		});
		// var PlayerEq ={
		// 	PlayerEq : eq,
		// }
		// var str_PlaySong_eq = JSON.stringify(PlayerEq);
		// $.ajax({
		// 	type:'POST',
		// 	url:'http://192.168.1.199:8080',//rpi
		// 	data:str_PlaySong_eq,
		// 	success: function(eq_res){
		// 	},
		// 	error:function(){
		// 		console.log("error");
		// 		alert("error in eq to rpi");
		// 	}
		// });
	});
	$('#addlikeornot').on('click',function(){
		var likeornot_rate = $("input[name=likeornot]:checked").val();
		// var SerialNo = document.getElementById('SerialNo').innerHTML;
		document.getElementById('addlikeornot').disabled = true;
		var newdata ={
			SongName : $name.val(),
			likeornot :likeornot_rate,
			// SerialNo : SerialNo,
		}
		var str = JSON.stringify(newdata);
		console.log(str);
		$.ajax({
			type:'POST',
			url:'http://192.168.1.179:3000',
			data:str,
			success: function(_newdata){
			console.log(_newdata);
			$songlist.append('<li>name: '+newdata.name+', likeornot: '+newdata.likeornot+'</li>');
			},
			error:function(){
				console.log("error");
				alert("error in addsong");
			}
		});
	});
	$('#playsong').on('click',function(){
		var url_str = $URL.val();
		var urlstr = url_str.split("=");
		var playdata ={
			PlaySong : $name.val(),
			url:urlstr[1],
			eq_ga:eq,
		}
		var playstr = JSON.stringify(playdata);
		console.log(playstr);
		$.ajax({
			type:'POST',
			url:'http://192.168.1.179:3000',//server ip
			data:playstr,
			success: function(_newdata){
			console.log(_newdata);
			},
			error:function(){
				console.log("error");
				alert("error in playsong server");
			}
		});	
		$.ajax({
			type:'POST',
			url:'http://192.168.1.199:8080',//rpi ip
			data:playstr,
			success: function(_newdata){
			console.log(_newdata);
			},
			error:function(){
				console.log("error");
				alert("error in playsong rpi");
			}
		});	
	});	
	$('#Witheq').on('click',function(){
		var url_str = $URL.val();
		var urlstr = url_str.split("=");
		var playdata ={
			url:urlstr[1],
			eq_ga:eq,
		}
		var playstr = JSON.stringify(playdata);
		console.log(playstr);
		$.ajax({
			type:'POST',
			url:'http://192.168.1.199:8080',//rpi ip
			data:playstr,
			success: function(_newdata){
			console.log(_newdata);
			},
			error:function(){
				console.log("error");
				alert("error in playsong rpi");
			}
		});	
	});	
	function adjvol(vol){
		console.log("adjvol");
		var Play_vol ={
			Play_vol : vol,
		}
		var Play_volstr = JSON.stringify(Play_vol);
		$.ajax({
			type:'POST',
			url:'http://192.168.1.199:8080',//rip
			data:Play_volstr,
			success: function(_newdata){
			// console.log(_newdata);
			},
			error:function(){
				console.log("error");
				alert("error in adjvol rpi");
			}
		});	
	}
	$('#volup').on('click',function(){
		console.log("vol++");
		var volup_str = document.getElementById('volume').innerHTML;
		var vol =parseInt(volup_str)+10;
		document.getElementById('volume').innerHTML=vol;
		adjvol(vol);
	});	
	$('#voldown').on('click',function(){
		console.log("vol--");
		var voldown_str = document.getElementById('volume').innerHTML;
		var vol =parseInt(voldown_str)-10;
		document.getElementById('volume').innerHTML=vol;
		adjvol(vol);
	});	


});
