$(function(){
	var $songlist = $('#songlist');
	var $name = $('#SongName');
	var $UserID = $('#UserID');
 function addtolist(song){
 	$songlist.append('<li>name: '+song.name+', likeornot: '+song.likeornot+'</li>');
 	

 }
	$.ajax({
	type:'GET',
	url:'/Users/sarahcheng/Documents/Master/2017fall/music/2018final/likeornot.json',
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
			url:'http://127.0.0.1:3000',
			data:str_UserID,
			success: function(SerialNo){
			console.log(SerialNo);
			// $SerialNo;
			document.getElementById("SerialNo").innerHTML = SerialNo;
			},
			error:function(){
				console.log("error");
				alert("error in UserID");
			}
		});
	});
	$('#addsong').on('click',function(){
		var likeornot_rate = $("input[name=likeornot]:checked").val();
		var SerialNo = document.getElementById('SerialNo').innerHTML;
		var newdata ={
			SongName : $name.val(),
			likeornot :likeornot_rate,
			SerialNo : SerialNo,
		}
		var str = JSON.stringify(newdata);
		console.log(str);
		$.ajax({
			type:'POST',
			url:'http://127.0.0.1:3000',
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
});
