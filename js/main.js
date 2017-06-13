//----------------------------------//
//    Home & Product Page           //
//----------------------------------//

//Product Page Variables
var productList=[];
var cart=[];
for (i=0;i<20;i++){
  cart.push(0);
}

function homeInit(){
  var ourRequest = new XMLHttpRequest();
  ourRequest.open('GET', 'https://jackfrozr.github.io/AucklandBooks/json/product.json');
  ourRequest.onload = function(){
      var ourData = JSON.parse(ourRequest.responseText);
      for(i=0;i<ourData.length;i++){
        if(ourData[i].popularity=="high"){
          loadProductFeatured(ourData[i].productId,ourData[i].name);
        }
        if(ourData[i].onsale=="yes"){
          loadProductSale(ourData[i].productId,ourData[i].name);
        }
      }
  };
  ourRequest.send();
}

function loadProductFeatured(productId,name){
  var product =
  "<div class='text-center col-md-3 col-xs-4'>"+
    "<div class='thumbnail text-center'>"+
      "<img class='img-responsive'src='image/"+productId+".jpg' alt='"+ productId + "'/>"+
      "<h1>"+name+"</h1>"+
    "</div>"+
  "</div>";
  $("#featured").append(product);
}

function loadProductSale(productId,name){
  var product =
  "<div class='text-center col-md-3 col-xs-4'>"+
    "<div class='thumbnail text-center'>"+
      "<img class='img-responsive'src='image/"+productId+".jpg' alt='"+ productId + "'/>"+
      "<h1>"+name+"</h1>"+
    "</div>"+
  "</div>";
  $("#sale").append(product);
}

function productInit(){
  var ourRequest = new XMLHttpRequest();
  ourRequest.open('GET', 'https://jackfrozr.github.io/AucklandBooks/json/product.json');
  ourRequest.onload = function(){
      var ourData = JSON.parse(ourRequest.responseText);
      for(i=0;i<ourData.length;i++){
        loadProduct(ourData[i].productId,ourData[i].name,ourData[i].description,ourData[i].price,i);
        productList.push(ourData[i]);
      }
  };

  ourRequest.send();
}

function loadProduct(productId,name,description,price,index){
var descriptionTrimmed="";
  if(description.length > 200){
    descriptionTrimmed= description.substring(0,197);
    descriptionTrimmed+="...";
  }
  else{
    descriptionTrimmed=description;
  }
  var product =
  "<div class='productColumn text-center col-md-4 col-xs-4'>"+
    "<div class='thumbnail text-center'>"+
      "<img class='img-responsive'src='image/"+productId+".jpg' alt='"+ productId + "'/>"+
      "<h1>"+name+"</h1>"+
      "<p>"+descriptionTrimmed+"</p>"+
      "<p class='price'>$"+price+"</p>"+
      "<button class='button' onclick='addCart("+index+")'>"+"Add To Cart <span class='glyphicon glyphicon-shopping-cart'></span>"+"</button>"+
    "</div>"+
  "</div>";
  $("#product").append(product);
}

function addCart(index){
  var total=0;
  $(".cartContent").remove();
  cart[index]++;
  for(i=0;i<cart.length;i++)
  {
    if(cart[i]>0)
    {
      var subtotal=productList[i].price*cart[i];
      total=total+subtotal;
      $("#cartList").append("<p class='cartContent'>"+productList[i].name+" "+cart[i]+" $"+subtotal+"</p>");
      $("#cartList").append("<button class='buttonAdd cartContent' onclick='addCart("+i+")'>Add</button> <button class='buttonSubstract cartContent' onclick='substractCart("+i+")'>Substract</button><br class='cartContent'><br class='cartContent'>");
    }
  }
  $("#cartList").append("<hr class='cartContent'><p class='cartContent'>Total: $"+total+"</p>");
}

function substractCart(index){
  var total=0;
  $(".cartContent").remove();
  cart[index]--;
  for(i=0;i<cart.length;i++)
  {
    if(cart[i]>0)
    {
      var subtotal=productList[i].price*cart[i]
      total=total+subtotal
      $("#cartList").append("<p class='cartContent'>"+productList[i].name+" "+cart[i]+" $"+subtotal+"</p>")
      $("#cartList").append("<button class='buttonAdd cartContent' onclick='addCart("+i+")'>Add</button> <button class='buttonSubstract cartContent' onclick='substractCart("+i+")'>Substract</button><br class='cartContent'><br class='cartContent'>")
    }
  }
  $("#cartList").append("<hr class='cartContent'><p class='cartContent'>Total: $"+total+"</p>");
}

function cleanProduct(){
  $(".thumbnail").remove();
  $(".productColumn").remove();
  $(".warningText").remove();
}

function filterCatergory(category){
  cleanProduct();
  var ourRequest = new XMLHttpRequest();
  ourRequest.open('GET', 'https://jackfrozr.github.io/AucklandBooks/json/product.json');
  ourRequest.onload = function(){
      var ourData = JSON.parse(ourRequest.responseText);
      var check=0;
      for(i=0;i<ourData.length;i++){
        if(ourData[i].category==category)
        {
          loadProduct(ourData[i].productId,ourData[i].name,ourData[i].description,ourData[i].price,i);
          check++;
        }
      }
      if(check==0){
          $("#product").append("<p class='warningText'>No product found</p>")
      }
  };
  ourRequest.send();
}


//----------------------------//
//  About & Membership page   //
//----------------------------//

// check all field empty or not
function validateForm() {
    var a = document.forms["myForm"]["email"].value;
    var b = document.forms["myForm"]["firstname"].value;
    var c = document.forms["myForm"]["lastname"].value;
    var d = document.forms["myForm"]["dateOfbirth"].value;
    var e = document.forms["myForm"]["gender"].value;
    if (a == "" || b == ""|| c== ""|| d== ""|| e== "") {
        alert("All filed must be filled or selected!!");
        return false;
    }

}

// cehck first name validation
function firstname_validate(firstname)
{
var regFirstname = /^([a-zA-Z]{3,})$/;
var fnamecolor = document.getElementById('firstname');


     if(regFirstname.test(firstname) == false)
    {
    document.getElementById("f-status").innerHTML    = "<span class='sanddanger'>Error! first name must be alphabet and at least 5 characters</span>";
    fnamecolor.style.backgroundColor = "#ff7755";

    }
    else
    {
    document.getElementById("f-status").innerHTML	= "<span class='sandcorrect'>Correct!</span>";
    fnamecolor.style.borderColor = "Green";
    fnamecolor.style.backgroundColor = "White";
    }
}


// cehck last name validation
function lastname_validate(lastname)
{
var regLastname = /^([a-zA-Z]{8,})$/;
var lastnamecolor = document.getElementById('lastname');


     if(regLastname.test(lastname) == false)
    {
    document.getElementById("l-status").innerHTML    = "<span class='sanddanger'>Error! Last name must be alphabet and at least 8 characters</span>";
    lastnamecolor.style.backgroundColor = "#ff7755";

    }
    else
    {
    document.getElementById("l-status").innerHTML	= "<span class='sandcorrect'>Correct!</span>";
    lastnamecolor.style.borderColor = "Green";
    lastnamecolor.style.backgroundColor = "White";
    }
}



// check email
function email_validate(email)
{
var regMail = /^([_a-zA-Z0-9-]+)(\.[_a-zA-Z0-9-]+)*@([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,3})$/;
var emailcolor = document.getElementById('email');
    if(regMail.test(email) == false)
    {
    document.getElementById("e-status").innerHTML    = "<span class='sanddanger'>Error! invalid email.</span>";
    emailcolor.style.backgroundColor = "#ff7755";
    }
    else
    {
    document.getElementById("e-status").innerHTML	= "<span class='sandcorrect'>Correct!</span>";
    emailcolor.style.borderColor = "Green";
    emailcolor.style.backgroundColor = "White";
    }
}


// validate date of birth
function dateOfbirth_validate(dateOfbirth)
{
var regdateOfbirth = /^(\d{2})[-\/](\d{2})[-\/](\d{4})$/;
var datecolor = document.getElementById('dateOfbirth');
    if(regdateOfbirth.test(dateOfbirth) == false)
    {
    document.getElementById("d-status").innerHTML	= "<span class='sanddanger'>error incorrect date of birth format</span>";
    datecolor.style.backgroundColor = "#ff7755";
    }
    else
    {
    document.getElementById("d-status").innerHTML	= "<span class='sandcorrect'>Correct!</span>";
    datecolor.style.borderColor = "Green";
    datecolor.style.backgroundColor = "White";
    }
}

//map
function initMap() {
  var uluru = {lat: -36.878566, lng: 174.694580};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}
