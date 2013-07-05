$(document).ready(function(){

	// Load the states into the overview controller
	$("div#tasks_overview").load("/states",function(responseText, textStatus, XMLHttpRequest){
	
		
		// For each state, load the corresponding tasks
		$("div.state").each(function(i) {
		
			// Append a holder for tasks
			$tasks=$("<div class='tasks' />");
			$(this).append($tasks);
			
			// Make ourselves a drop container
			$(this).droppable({ drop: function (event, ui) {
			
				// When a drop occurs, update the screen...
				$(this).append($(ui.draggable));
				
				// .. and update the database
				$.ajax({
				
					type:		"PUT",
					url:		"/tasks/"+$(ui.draggable).attr("task_id"),
//					data:		JSON.stringify({ "state_id" :	parseInt($(this).attr("state_id"))}),
					data:		{ "state_id" :	parseInt($(this).attr("state_id"))},
					dataType:	"json",
					success: function(data) {
					
						console.log("Changes saved");
					}
				});
			}});
					
			// Load the tasks.  They will be placed in the proper state.
			$tasks.load("/tasks?state_id="+$(this).attr("state_id"), function(responseText, textStatus, XMLHttpRequest){
			
				// Make each task draggable
				$(this).find("div.task").each(function(){
				
					$(this).draggable({ "opacity": 0.7, "helper": "clone"});
				});
			});
		
		});
		

	});
	

	

});
