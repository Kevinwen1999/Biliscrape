function Search() {
    var query = $("#query_form").serialize()
    console.log(query);
    $.post("http://localhost:3000/search", query, function(data) {
        console.log(data);
        console.log(data[0]);
        console.log(data.length);
    
        $("#result_title").text('Displaying the result from ' + query);
        
        for (let i = 0; i < data.length; i++) {
            var cur = JSON.parse(data[i]);
            $("#table_title").after(
                "<tr>\
                    <td>" + cur.Name + "</th>\
                    <td> <a href=" + "https:" + cur.Link + ">Link</a> </th>\
                </tr>"
            );
        }
    });
}
