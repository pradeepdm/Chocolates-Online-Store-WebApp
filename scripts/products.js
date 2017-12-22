/* 
    Mallikarjun, Pradeep
    Account:jadrn033
    CS0545 Fall 2017
    Project #4
    Reference: Alan Riggins
*/

var proj4_data;
var cart = new shopping_cart("jadrn033");

$(document).ready(function () {

    $('#count').text(cart.size());
    proj4_data = new Array();
    $.get('/perl/jadrn033/get_products.cgi', storeData);
    updateDisplay();

    $('#milkchocolate').on('click', function () {
        displayChocolates("Milk chocolate");
    });

    $('#darkchocolate').on('click', function() {
        displayChocolates("Dark chocolate");
    })

    $('#nuts').on('click', function() {
        displayChocolates("Nuts and chews");
    })

    $('#brittles').on('click', function() {
        displayChocolates("Brittles and toffies");
    })

    $('#truffles').on('click', function() {
        displayChocolates("Truffles");
    })

    $('#gifts').on('click', function() {
        displayChocolates("Gifts");
    })

    $('#holiday').on('click', function() {
        displayChocolates("Holiday assortments");
    });

    $('#chocolate-catrgory').change(function() {
        var getValue=$(this).val();
        get_products(getValue);
    });

    $('#order-reset').on('click',function(){
        $('#form1')[0].reset();
        $('#products').empty();
        $('#order-errormessage').text("");
        $("<option>--None--</option>").appendTo($("select[name='products']"));
    });

    $('#order-addtocart').on('click', function() {
        $('#o_errmessage').text("");
        $('#orderform').hide();
        var sku;
        var quant= $.trim($('#o_quant').val());
        var title= $.trim($('#products').val());
        title=title.split("-");
        title=title[0];

        for(var i=0; i < proj4_data.length; i++) {

            if(proj4_data[i][2] == title ) {
                sku= proj4_data[i][0];
                prc=proj4_data[i][6];
                break;
            }
        }
        if(sku != undefined){
            cart.add(sku,quant,prc,title);
            updateDisplay();
        }
        else {
            $('#order-errormessage').text("Select a Product");
        }
    });

    $('#cart-inline').on('click',"[name='delete-button']",function(){
        var idd=$(this).attr("id");
        cart.delete(idd);
        updateDisplay();
    });

    $('#cart-inline').on('click',"[id='cart-shop']",function(){
        window.location.href = "../pages/products.html";
    });

    $('#orderform').on('click',"[name='submit-order']",function(){
        cart.deleteall();
    });

    $('#a-bag').on('click',function(){
        window.location.href = "../pages/order-online.html";

        $('#orderform').show();
        $('[name="fname"]').focus();
        $('#hiddendiv').empty();
        var cartArrays = cart.getCartArray();
        var toWrites="";
        var TotalPrice = 0;
        var TaxPrice = 0;
        var ShippingPrice = 0;
        var productQty = 0;
        var productPrice = 0;
        var costPrice=0;
        var priceTax=0;
        if(cart.size() > 0) {
            var title;
            for(i=0; i < cartArrays.length; i++) {

                productQty += parseInt(cartArrays[i][1]);
                itemPrice = parseFloat(cartArrays[i][2]);
                itemPrice = Math.round(itemPrice * 100)/100;
                productPrice += parseFloat(cartArrays[i][2]);
                productPrice = Math.round(productPrice * 100)/100;

                toWrites += "<input  name='SKUNumber' value="+ cartArrays[i][0] + " />";
                toWrites += "<input  name='Quantity' value="+cartArrays[i][1]+" />";
                for(var j=0; j < proj4_data.length; j++) {
                    if(proj4_data[j][0] == cartArrays[i][0] ) {
                        costPrice=proj4_data[j][5];
                        break;
                    }
                }
                str=cartArrays[i][3];
                var res = str.replace(/ /g, "-");
                toWrites +="<input type='hidden' name='Price' value="+cartArrays[i][2]+" />";
                toWrites += "<input type='hidden' name='CostPrice' value="+$.trim(costPrice)+" />";
                toWrites += "<input type='hidden' size='50' name='Title' value="+res+" />"

            }
            ShippingPrice = parseInt(productQty, 10) * 2;
            TaxPrice = parseFloat(productPrice * 0.08);
            TaxPrice = Math.round(TaxPrice * 100)/100;
            TotalPrice = parseFloat(productPrice)+  parseFloat(TaxPrice) + parseFloat(ShippingPrice);
            TotalPrice = Math.round(TotalPrice * 100)/100;
            toWrites += "<input type='hidden' name='Shipping' value="+ShippingPrice+" />";
            toWrites += "<input type='hidden' name='Tax' value="+TaxPrice+" />";
            toWrites += "<input type='hidden' name='Total' value='"+TotalPrice+"' />";
            toWrites +="<p></p>"
        }
        $('#hiddendiv').html(toWrites);
        $('#count').text(cart.size());


    });

    $('#cart-inline').on('click',"[id='cart-checkout']",function(){
        $('#orderform').show();
        $('[name="fname"]').focus();
        $('#hiddendiv').empty();
        var cartArrays = cart.getCartArray();
        var toWrites="";
        var TotalPrice = 0;
        var TaxPrice = 0;
        var ShippingPrice = 0;
        var productQty = 0;
        var productPrice = 0;
        var costPrice=0;
        var priceTax=0;
        if(cart.size() > 0) {
            var title;
            for(i=0; i < cartArrays.length; i++) {

                productQty += parseInt(cartArrays[i][1]);
                itemPrice = parseFloat(cartArrays[i][2]);
                itemPrice = Math.round(itemPrice * 100)/100;
                productPrice += parseFloat(cartArrays[i][2]);
                productPrice = Math.round(productPrice * 100)/100;

                toWrites += "<input type='hidden' name='SKUNumber' value="+ cartArrays[i][0] + " />";
                toWrites += "<input type='hidden' name='Quantity' value="+cartArrays[i][1]+" />";
                for(var j=0; j < proj4_data.length; j++) {
                    if(proj4_data[j][0] == cartArrays[i][0] ) {
                        costPrice=proj4_data[j][5];
                        break;
                    }
                }
                str=cartArrays[i][3];
                var res = str.replace(/ /g, "-");
                toWrites +="<input type='hidden' name='Price' value="+cartArrays[i][2]+" />";
                toWrites += "<input type='hidden' name='CostPrice' value="+$.trim(costPrice)+" />";
                toWrites += "<input type='hidden' size='50' name='Title' value="+res+" />"

            }
            ShippingPrice = parseInt(productQty, 10) * 2;
            TaxPrice = parseFloat(productPrice * 0.08);
            TaxPrice = Math.round(TaxPrice * 100)/100;
            TotalPrice = parseFloat(productPrice)+  parseFloat(TaxPrice) + parseFloat(ShippingPrice);
            TotalPrice = Math.round(TotalPrice * 100)/100;
            toWrites += "<input type='hidden' name='Shipping' value="+ShippingPrice+" />";
            toWrites += "<input type='hidden' name='Tax' value="+TaxPrice+" />";
            toWrites += "<input type='hidden' name='Total' value='"+TotalPrice+"' />";
            toWrites +="<p></p>"
        }
        $('#hiddendiv').html(toWrites);
        $('#count').text(cart.size());

    });
});

function storeData(response) {
    var tmpArray = explodeArray(response, ';');
    for (var i = 0; i < tmpArray.length; i++) {
        innerArray = explodeArray(tmpArray[i], '|');
        proj4_data[i] = innerArray;
    }
    displayChocolates("Milk chocolate");
}

function explodeArray(item, delimiter) {
    tempArray = new Array(1);
    var Count = 0;
    var tempString = new String(item);

    while (tempString.indexOf(delimiter) > 0) {
        tempArray[Count] = tempString.substr(0, tempString.indexOf(delimiter));
        tempString = tempString.substr(tempString.indexOf(delimiter) + 1, tempString.length - tempString.indexOf(delimiter) + 1);
        Count = Count + 1
    }

    tempArray[Count] = tempString;
    return tempArray;
}

function get_products(val) {
    var c = $.trim(val);
    $('#products').empty();
    var p = $("select[name='products']");
    $("<option>--Choose a Product--</option>").appendTo(p);
    for (var i = 0; i < proj4_data.length; i++) {

        if (proj4_data[i][1] == c) {
            $("<option>" + proj4_data[i][2] + "-&nbsp&nbsp$" + proj4_data[i][6] + "</option>").appendTo(p);
        }
    }
}

function cartadd(val){
    sku= val;
    quant= "q"+sku;
    quant=$('#'+quant).val();
    for(var i=0; i < proj4_data.length; i++) {

        if(proj4_data[i][0] == sku ) {
            prc=proj4_data[i][6];
            ptitle= proj4_data[i][2]
            break;
        }
    }
    cart.add(sku,quant,prc,ptitle);
    updateDisplay();
}

function updateDisplay() {
    var cartArrays = cart.getCartArray();
    var toWrites="";
    var TotalPrice = 0;
    var TaxPrice = 0;
    var ShippingPrice = 0;
    var productQty = 0;
    var productPrice = 0;
    var productTitle;
    if(cart.size() > 0) {
        var toWrites = "<table class='displaycart'><tr><th><h5>Product</h5></th><th><h5>Quantity</h5></th><th><h5>Price</h5></th><th></th></tr>";

        for(i=0; i < cartArrays.length; i++) {

            productQty += parseInt(cartArrays[i][1]);
            itemPrice = parseFloat(cartArrays[i][2]);
            itemPrice = Math.round(itemPrice * 100)/100;
            productPrice += parseFloat(cartArrays[i][2]);
            productPrice = Math.round(productPrice * 100)/100;
            productTitle= $.trim(cartArrays[i][3]);


            toWrites += "<tr><td class='frow'>"+cartArrays[i][3]+"</td>";
            toWrites += "<td>"+cartArrays[i][1]+"</td>";
            toWrites += "<td class='p_row'>$"+Math.round(cartArrays[i][2] * 100)/100+"</td>";
            toWrites += "<td><input type='button' id="+cartArrays[i][0]+" value='Remove' name='delete-button' class='deletebutton'/></td></tr>";
        }
        ShippingPrice = parseInt(productQty, 10) * 2;
        TaxPrice = parseFloat(productPrice * 0.08);
        TaxPrice = Math.round(TaxPrice * 100)/100;
        TotalPrice = parseFloat(productPrice)+  parseFloat(TaxPrice) + parseFloat(ShippingPrice);
        TotalPrice = Math.round(TotalPrice * 100)/100;
        toWrites +="<tr><th>Shipping Charges: $"+ShippingPrice+"&nbsp;&nbsp;&nbsp;&nbsp;Tax: $"+TaxPrice+"&nbsp;&nbsp;&nbsp;&nbsp;Total: $"+TotalPrice+"</th></tr>";
        toWrites += "<tr><td><input type='button' id='cart-shop' class='orderbuttons' value='Continue Shopping'/><input type='button' id='cart-checkout' value='Proceed to Check Out' class='orderbuttons'</td></tr></table>";
    }
    $('#cart-inline').html(toWrites);
    $('#count').text(cart.size());

}

function displayChocolates(chocolateType) {
    innerHtmlString = "";
    innerHtmlString += "<table id='products_table'><h4>"+chocolateType+"</h4>";
    for(var i=0; i < proj4_data.length; i++) {

        if(proj4_data[i][1] == chocolateType) {

            innerHtmlString += "<tr><td><img id='product_img' src=\"/~jadrn000/PROJ4_IMAGES/"+ proj4_data[i][0]+".jpg\" alt=\""+proj4_data[i][2]+"\""+" />";
            innerHtmlString += "<td><h5>"+proj4_data[i][2]+"</h5><b>Price:</b> $"+proj4_data[i][6]+
                "<br/><label>Quantity:</label><input class='q_box' id='q"+proj4_data[i][0]+"' type='number' value='1' min='1'>"+
                "<button onclick='cartadd(\""+proj4_data[i][0]+"\")' id="+proj4_data[i][0]+" type='button' class='addtocart'>Add to Cart</button>"+
                "<br/>"+proj4_data[i][3]+"<br/>"+proj4_data[i][4];
            innerHtmlString += "<hr/>";

            var handle = document.getElementById('products-list');
            handle.innerHTML = innerHtmlString;
        }
    }
    innerHtmlString += "</table>";
}
    




