	var pusher;
	var myChannel;
	function ajaxCall(ajax_url, ajax_data, successCallback) 
	{
		$.ajax({
			type : "POST",
			url : ajax_url,
			dataType : "json",
			data: ajax_data,
			time : 10,
			success : function(msg) {
				if( msg.success ) {
					successCallback(msg);
				} else {
					alert(msg.errormsg);
				}
				
			},
			error: function(msg) {
			}
		});
	}
//end of ajax function
	function newMessageCallback(data)
	{
		console.log(data);
		$('#messages').append(data.message + '<br />')
	}
//end of callback function
	function keyed()
	{
		$('#textBox').keyup(function(e) 
		{
	   var code = e.keyCode;;
	   if (code == '13') 
	   {
			   var text = $('#textBox').val();
		  console.log(text);
	     ajaxCall('event.php',{message : text}, function(msg)
	     {
	     	newMessageCallback(msg.data)
			$('#textBox').val('');
	     })
	   }
		});

	}
//end of keyup event
	$(function(){

		pusher = new Pusher('f0e50ed6adb326441513'); //APP KEY
		myChannel = pusher.subscribe('myChannel');
		pusher.connection.bind('connected', function() 
		{
			myChannel.bind('message', function(data) 
			{
							newMessageCallback(data);
			});
		})
		keyed();
	})