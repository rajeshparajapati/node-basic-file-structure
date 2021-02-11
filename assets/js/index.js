
$('#add_user').submit(function(event){
    alert("data is submit");
})


$('#update_user').submit(function(event){    
    event.preventDefault(); 
    var data = {};
    var user = $(this).serializeArray();
    $.map(user,function(n,i){
        data[n['name']] = n['value'];
    })
    console.log(data);
    var request = {
        "url":baseurl+`/api/users/${data.id}`,
        "type":"PUT",
        "data":data
    };
    $.ajax(request).done(function(responce){
        alert("successfully updated user");
    })    
    
    
})