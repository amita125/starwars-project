function fetchPerson(id){

  fetch(`http://swapi.co/api/people/${id}`)
    .then( function(response){
      return response.json()
    })
    .then(function(json){
      console.log("data", json)

      if (!json.name){
        return;
      }

      const name = json.name;
      const birth_year = json.birth_year;

      /// If you were doing document.createElement
      //const character = document.createElement('div');
      //character.className = "character";
      //character.textContent = name + ": " + birth_year;
      //document.querySelector("#characters").appendChild(character)

      const html = `
        <div class="character">
          <div class="name">
            <a href="${json.url}">${name}</a>
          </div>
          <div class="year">${birth_year}</div>
        </div>`;
      
      document.querySelector("#names").insertAdjacentHTML('afterbegin', html)

    })
}

for (var i = 1; i <84; i++) {
  fetchPerson(i)
}

// $(document).ready(function () {
//     var text="";
//     for (i = 1; i < 84; i++) {
//         $.ajax({
//             url: "https://swapi.dev/api/people/"+i,
//             dataType: "json"
//         }).done(function (done) {
//             var peopleArray = [];
//             peopleArray.push(done);
//             text += "<div class='peopleList'><button class='characterButton' onclick='displayDate()' >" + done.name+i+ "</button></div>";
//             document.getElementById("names").innerHTML = text;
//         }).fail(function (err) {
//             console.log(err);
//         });

//     }
//    const clonePeople = [...peopleArray];
//    console.log(clonePeople);
  
// });


$(document).ready(function(){
    fetch_data();
});
 async function fetch_data(){
    var text="";
    var peopleArray = [];
    var people = [];
    for (var i = 1; i<84;i++) {
        var api_url = "https://swapi.dev/api/people/"+i;
        peopleArray.push(api_url);
    }
    console.log(peopleArray);
     for (var j = 0; j<peopleArray.length;j++) {
        await fetch(peopleArray[j])
        .then(response =>response.json())
        .then(data =>{
           //console.log(data);
           people.push(data);
            text += `<button class='characterButton' id="people-${peopleArray.indexOf(peopleArray[j+1])}" value="${data.name}" onclick="myFunc(this)">` + data.name+" - "+peopleArray.indexOf(peopleArray[j+1])+ `</button>`;
            document.getElementById("names").innerHTML = text;
        })
        .catch(err => console.log(err))

     }
     document.getElementById("people-17").remove();
     console.log(people[1]);
   
     
}
function myFunc(id){
    var a = id.value;
alert(a);

}
