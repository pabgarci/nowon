$(document).ready(function(){

	$("#content-add").hide();
	$("#content-list").hide();
	$("#content-list-past").hide();

    $("#button-add").click(function(){
    	$("#content-index").hide();
    	$("#content-add").show();
		$("#content-list").hide();
		$("#content-list-past").hide();
		$("#button-list-past").removeClass("active");
		$("#button-add").addClass("active");
		$("#button-list").removeClass("active");
    });
	

	$("#button-list").click(function(){
	    $("#content-index").hide();
    	$("#content-add").hide();
		$("#content-list").show();
		$("#content-list-past").hide();
		$("#button-list-past").removeClass("active");
		$("#button-add").removeClass("active");
		$("#button-list").addClass("active");
	});
	

	$("#button-list-past").click(function(){
	    $("#content-index").hide();
    	$("#content-add").hide();
		$("#content-list").hide();
		$("#content-list-past").show();
		$("#button-list-past").addClass("active");
		$("#button-add").removeClass("active");
		$("#button-list").removeClass("active");
	});
});
