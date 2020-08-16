$(document).ready(function(){
    fetch_data();
    $('.button').hide();
});

var count = 0, para = "", text="";
const people = [], selected = [], urlArray = [] ;

async function fetch_data(){
    // add the number to the api and push to array
    for (var i = 1; i<84;i++) {
        var api_url = "https://swapi.dev/api/people/"+i;
        urlArray.push(api_url);
    }
    //fetch the url with the url array 
    for (var j = 0; j<urlArray.length;j++) {
           let loader = `<div class="boxLoading"><img src="http://localhost/starwars/assets/img/robot.png" alt="robot"/><h2> Loading.. `+Math.round(j*1.22) +`% </h2></div>`;
            document.getElementById('names').innerHTML = loader;
            $('#names').html(loader).css({"justify-content":"center"})
        await fetch(urlArray[j])
        .then(response =>response.json())
        .then(data =>{
            people.push(data);
            text += `<div class="people-img" id="character-${urlArray.indexOf(urlArray[j])}"><div class="card"></div><button type="button" class="character" id="people-${urlArray.indexOf(urlArray[j])}" value="${urlArray.indexOf(urlArray[j])}" onclick="myFunc(this)">` + data.name+ `</button></div>`;
            $('#names').html(text).children().css('display', 'none');
            console.log(data.name);
        })
        .catch(err => console.log(err))
    }
    //delete the element id of the character not available
    document.getElementById("character-16").remove();
    //call the pagination function
    pagination();
    console.log(people);

}

//this character selection function
function myFunc(id){
    $('.button').show();
    //check the number of selection
    if(count<3){
        count += 1;
        selected.push(people[id.value]);
        $(`#people-${id.value}`).addClass('btn btn-success ').attr("disabled", true);
        if (selected.length == 1) {
            para = "You have selected "+selected[0].name+".";
        }else if (selected.length == 2) {
            para = "You have selected "+selected[0].name + " and " +selected[1].name+".";
        } else {
            para = "You have selected "+selected[0].name +", "+selected[1].name + " and "+selected[2].name+".";
        }
        $('#people').html(para);
    }else{
        alert(" You can only select 3 character.");
    }
    console.log(people.length);
    console.log(selected);
}

// this is reset function
function resetFunc(){
    //empty the array 
    while(selected.length>0){
        selected.pop();
        count = 0;
        $('.character').removeClass('btn btn-success').attr("disabled", false);
        $('#people').empty();
    }
    $('.button').hide();
    $('#people').html("SELECT 3 CHARACTERS!");
    return selected;
}

//function to display the page number 
function pagination (){
    var show_per_page = 9; 
    var number_of_items = people.length;
    var number_of_pages = Math.ceil(number_of_items/show_per_page);
    $('#current_page').val(0);
    var a = "Page "+(parseInt($('#current_page').val()) + 1)+"/"+number_of_pages;
    $('#page-no').html(a);
    $('#people').html("SELECT 3 CHARACTERS!");

    document.getElementById("show_per_page").value = show_per_page;
    var prev_html = '<a class="previous_link" href="javascript:previous();"><span>&#129092;</span></a>';
    var next_html = '<a class="next_link" href="javascript:next();"><span>&#129094;</span></a>';
    var current_link = 0;
    while(number_of_pages > current_link){
        prev_html += '<p hidden class="page_link" href="javascript:go_to_page(' + current_link +')" longdesc="' + current_link +'">'+ (current_link + 1) +'</p>';
        current_link++;
    }
    $('#page_navigation').html(prev_html).hide();
    $('#page_navigation1').html(next_html);
    $('#page_navigation .page_link:first').addClass('active_page');
    $('#names').children().slice(0, show_per_page).css('display', 'inline-flex');     
}

//previous link function
function previous(){
    new_page = parseInt($('#current_page').val()) - 1;
    if($('.active_page').prev('.page_link').length==true){
        go_to_page(new_page);
        var a = "Page "+(new_page+1)+"/10";
        $('#page-no').html(a);
        if (new_page == 0) {
               $('#page_navigation').hide();
        } else {
            $('#page_navigation').show();
        }
    }
}

//next link
function next(){
    new_page = parseInt($('#current_page').val()) + 1;
    if($('.active_page').next('.page_link').length==true){
        go_to_page(new_page);
        var a = "Page "+(new_page+1)+"/10";
        $('#page-no').html(a);
        $('#page_navigation').show();
    }
}

//next or prvious page
function go_to_page(page_num){
    var show_per_page = parseInt($('#show_per_page').val());
    start_from = page_num * show_per_page;
    end_on = start_from + show_per_page;
    $('#names').children().css('display', 'none').slice(start_from, end_on).css('display', 'inline-flex');
    $('.page_link[longdesc=' + page_num +']').addClass('active_page').siblings('.active_page').removeClass('active_page');
    $('#current_page').val(page_num);
}

//download csv file of selected character
function downloadFunc(){
    const replacer = (key, value) => value === null ? '' : value 
    const header = Object.keys(selected[0])
    let csv = selected.map(row => header.map(fieldName => 
    JSON.stringify(row[fieldName], replacer).replace(/(\r\n|\n|\r)/gm, "")).join(','))
    csv.unshift(header.join(','))
    csv = csv.join('\r\n')

    // Create link and download
    var link = document.createElement('a');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURIComponent(csv));
    link.setAttribute('download', 'character.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}