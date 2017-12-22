/*
     Mallikarjun, Pradeep
     Jadran Id: Jadrn033
     Project #4
     Fall 2017
     Code by Alan Riggins
*/

function shopping_cart(owner) {
    this.owner = $.trim(owner);
    this.skuArray = new Array();
    this.qtyArray = new Array();
    this.priceArray = new Array();
    this.titleArray = new Array();


    this.getCookieValues = function() {  
        var raw_string = document.cookie;        
        var arr = new Array();
        if(raw_string == undefined)
            return;
        var tmp = raw_string.split(";");
        var myValue = null;        
        for(i=0; i < tmp.length; i++)
            if(tmp[i].indexOf(owner) != -1)
                myValue = tmp[i].split("=");
        if(!myValue)
            return;
        arr = myValue[1].split("||");
        for(i=0; i < arr.length; i++) {
            var pair = arr[i].split("|"); 
            if(pair[0] == undefined || pair[1] == undefined || pair[2] == undefined || pair[3] == undefined) continue;
            this.skuArray[i] = pair[0];
            this.qtyArray[i] = pair[1];
	    	this.priceArray[i] = pair[2];
	    	this.titleArray[i] = pair[3];
            }         
        }
        
    this.writeCookie = function() {  
        var toWrite = this.owner+"=";
        for(i=0; i < this.skuArray.length; i++) 
            toWrite += this.skuArray[i] + "|" + this.qtyArray[i] +  "|" + this.priceArray[i] +"|" + this.titleArray[i] + "||";
        toWrite = toWrite.substring(0,toWrite.length - 2);
        document.cookie = toWrite;
        }
        
        
    this.add = function(sku, quantity, price, title) {
        sku = $.trim(sku);
        quantity = $.trim(quantity);
		price = $.trim(price);
		title= $.trim(title);
        this.getCookieValues(); 
        var found = false;
        for(i=0; i < this.skuArray.length; i++)
        if(this.skuArray[i] == sku) {        
            this.qtyArray[i] = parseInt(quantity,10) + parseInt(this.qtyArray[i],10);
	    	this.priceArray[i] = parseFloat(parseInt(this.qtyArray[i], 10) * price);
			this.titleArray[i] = title;
            found = true;            
            }
        if(!found) {       
            this.skuArray.push(sku);
            this.qtyArray.push(quantity);
	    	this.priceArray.push(parseFloat(parseInt(quantity, 10) * price));
	    	this.titleArray.push(title);
            }
        this.writeCookie();         
    }
    
    this.setQuantity = function(sku, quantity, price, title) {  
        sku = $.trim(sku);
        var found = false;
        if(sku == "") return;        
        quantity = $.trim(quantity);
		price = $.trim(price);
		title= $.trim(title);           
        this.getCookieValues();
        
        for(i=0; i < this.skuArray.length; i++)
            if(this.skuArray[i] == sku) {        
                this.qtyArray[i] = parseInt(quantity,10);
				this.priceArray[i] = parseFloat(parseInt(this.qtyArray[i], 10) * price);
				this.titleArray[i] = title;            
                found = true;
                }
        if(found)
            this.writeCookie();
        }    
    
    this.delete = function(sku) {
        sku = $.trim(sku);
        var index = -1;
        this.getCookieValues();       
        for(i=0; i < this.skuArray.length; i++)
        if(this.skuArray[i] == sku)  
            index = i;               
        if(index != -1) {      
            this.skuArray.splice(index,1);
            this.qtyArray.splice(index,1);
	    	this.priceArray.splice(index,1);
	    	this.titleArray.splice(index,1);
            }         
        if(this.skuArray.length == 0) {
            document.cookie = this.owner + "= ;expires=-1";
            }
        else
            this.writeCookie();
        }	
        
    this.size = function() {
        this.getCookieValues();
        var count = 0;
        for(i=0; i < this.qtyArray.length; i++)
            count += parseInt(this.qtyArray[i],10);
        return count;
        }        
        
    this.getCartArray = function() {
        this.getCookieValues();
        var returnArray = new Array();
        for(i=0; i < this.skuArray.length; i++) {
            returnArray[i] = new Array();
            returnArray[i].push(this.skuArray[i]);
            returnArray[i].push(this.qtyArray[i]);
	    	returnArray[i].push(this.priceArray[i]);
	    	returnArray[i].push(this.titleArray[i]);
            }
        return returnArray;
        }  
        
    this.deleteall = function() {
    	this.getCookieValues();
	if (this.skuArray.length > 0) {
	   this.skuArray.splice(0, this.skuArray.length);	   
	}
	if (this.qtyArray.length > 0) {
	   this.qtyArray.splice(0, this.qtyArray.length);	   
	}
	if (this.priceArray.length > 0) {
	   this.priceArray.splice(0, this.priceArray.length);	   
	}
	if (this.titleArray.length > 0) {
	   this.titleArray.splice(0, this.titleArray.length);	   
	}
	 if(this.skuArray.length == 0) {
            document.cookie = this.owner + "= ;expires=-1";
            }
        else
            this.writeCookie();
    
    }	                  
}    