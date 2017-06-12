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
  var product =
  "<div class='productColumn text-center col-md-4'>"+
    "<div class='thumbnail text-center'>"+
      "<img class='img-responsive'src='image/"+productId+".jpg' alt='"+ productId + "'/>"+
      "<h1>"+name+"</h1>"+
      "<p>"+description+"</p>"+
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
          loadProduct(ourData[i].productId,ourData[i].name,ourData[i].description,ourData[i].price);
          check++;
        }
      }
      if(check==0){
          $("#product").append("<p class='warningText'>No product found</p>")
      }
  };
  ourRequest.send();
}
