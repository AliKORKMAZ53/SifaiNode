$("#terkipSoruEkle").click(function() {
    $("#terkipSoruDiv").clone(true, true).insertBefore("#kelimeSoruDiv");
    return false;
});

$(".tersorkal").on('click' ,function() {
	$(this).parent().children().last().val('');
    $(this).parent().remove();
});
$("#kelimeSoruEkle").click(function() {
    $("#kelimeSoruDiv").clone(true, true).insertBefore("#kitapAdiDiv");
    return false;
});

$(".kelsorkal").on('click', function() {
	$(this).parent().children().last().val('');
    $(this).parent().remove();
});


$("#add_user").submit(function(event){
    window.location.replace('/'); //doesnt work will be fixed
})

$("#update_user").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })


    var request = {
        "url" : `http://sifaiyonetim-env.eba-i62dva2c.eu-central-1.elasticbeanstalk.com/api/users/${data.id}`,
        "method" : "PUT",
        "data" : data
    } 

    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!");
    })

})
//THIS PART WILL BE CHANGED
/*
$("#update_ibare").submit(function(event){
    event.preventDefault();
	
    var unindexed_array = $(this).serializeArray();
    var data = {}

	
    $.map(unindexed_array, function(n, i){
		
		data[n['name']] = n['value']   
    })

	console.log(data);

    var request = {
        "url" : `http://localhost:3000/api/ibare/${data.id}`,
        "method" : "PUT",
        "data" : data
    } 

    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!");
    })

})
*/


if(window.location.pathname == "/"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://sifaiyonetim-env.eba-i62dva2c.eu-central-1.elasticbeanstalk.com/api/users/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!");
                location.reload();
            })
        }

    })
}

if(window.location.pathname == "/ibare"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://sifaiyonetim-env.eba-i62dva2c.eu-central-1.elasticbeanstalk.com/api/ibare/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!");
                location.reload();
            })
        }

    })
}

if(window.location.pathname == "/malumat"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://sifaiyonetim-env.eba-i62dva2c.eu-central-1.elasticbeanstalk.com/api/malumat/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!");
                location.reload();
            })
        }

    })
}