$(function(){
	var $songlist = $('#songlist');
	var $name = $('#name');
 var $like = $('#likeornot');
 function addtolist(song){
 	$songlist.append('<li>name: '+song.name+', likeornot: '+song.likeornot+'</li>');

 }
	$.ajax({
	type:'GET',
	url:'/Users/sarahcheng/Documents/Master/2017fall/music/Volumio/Volumio2-UI/node_modules/websockets-streaming-audio/sarahtest/likeornot.json',
	success: function(songlists){
		console.log(songlists);
		var obj = JSON.parse(songlists);
		// console.log(obj.name);
		$.each(obj,function(i,obj){
			console.log(obj);
			addtolist(obj);
		 });
	},
	error: function(){
		alert("error loading songs")
	}
	});
	$('#addsong').on('click',function(){
		var newdata ={
			name : $name.val(),
			likeornot : $like.val(),
		}
		var str = JSON.stringify(newdata);
		console.log($name.val());
		console.log(str);
		$.ajax({
			type:'POST',
			url:'/Users/sarahcheng/Documents/Master/2017fall/music/Volumio/Volumio2-UI/node_modules/websockets-streaming-audio/sarahtest/likeornot.json',
			// url:'http://127.0.0.1:3000',
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
