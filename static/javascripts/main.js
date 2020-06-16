//let url = "https://www.hikingproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=10&key=200729730-1bcb658fe842858c9a2e0e30d0409975";
// when form is submitted
$("form").submit(
    // anonymous callback function is called
    function(e) {
    //get city coordinates from OSM
        //getCoords();
    //post city coordinates to the server
      //postCoords();
    // post state to the server
      //postState();
    // send call to getData() from server
    // get trail ID of favorited trail to save in "Favorited" database table
      //getID();
      getData();
      return false;
    }
  );
  
  // async function to get data
  async function getData() {
    try {
      let city = $(".city").val().toLowerCase();
      let state = $("#state").val().toLowerCase();
      if( city == "" || state == "") {
        return;
      }
      //format url
      let url = "http://localhost:3000/api/trails/" + city + "/" + state;
      //alert(url)
  
      // asyn javascript 
      return $.ajax({
        type: "GET", // method
        url: url // path
      }).done(result => {
        // tests
        console.log(result);
        $(".trails").html(JSON.stringify(result));
        
        return;


        // new empty string to hold html
        let str = "Trails for: " + $(".city").val();
        // loop through trails
        for (let i = 0; i < result.trails.length; i++) {
          // concat string
          str += "<li>" + result.trails[i].ascent + "</li>";
        }
        // insert the html string
        $(".trails").html(str);
  
      }).fail(error => {
        console.error("FAIL", JSON.stringify(error));
      }).always((result) => {
        console.log("ALWAYS");
        /* console.log("ALWAYS", JSON.stringify(result)) */
  
  
      });
    } catch (err) {
      console.error(err);
    }
  };
  
  //let data = getData();

  
