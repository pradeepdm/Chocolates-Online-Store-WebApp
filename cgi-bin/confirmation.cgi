#!/usr/bin/perl 
#Sample perl cgi script.  This script prints a list of the 
#products in the opatija proj3.products table.
#
#	Mallikarjun, Pradeep Account:jadrn033
#	CS545 Fall 2017
#	Project #4
#

use CGI;
use DBI;
use File::Path;

my $q = new CGI;

print <<END_HTML;
Content-type: text/html

<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

<head>
	<title>Bertha's Deluxe Chocolates</title>
	<meta http-equiv="content-type"
		content="text/html;charset=utf-8" />
	<script src="http://jadran.sdsu.edu/jquery/jquery.js"></script>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <link rel="stylesheet" type="text/css" href="http://jadran.sdsu.edu/~jadrn033/proj4/styles/styles.css" />
    <link rel="stylesheet" type="text/css" href="http://jadran.sdsu.edu/~jadrn033/proj4/styles/order-online.css" />
	<link href="https://www.fontify.me/wf/a899c3e7c4d07950ac58db0ee10c33f0" rel="stylesheet" type="text/css">
</head>

<body>
<div id="main">
 <div id="header">
			<h3> <b>Bertha's Deluxe Chocolates</b> </h3>
		</div>
	<div id="navigation">
		<ul>
      		<li><a href="http://jadran.sdsu.edu/~jadrn033/proj4/index.html" >Home</a></li>
      		<li><a href = "http://jadran.sdsu.edu/~jadrn033/proj4/pages/products.html">Products</a></li>
      		<li><a href = "http://jadran.sdsu.edu/~jadrn033/proj4/pages/order-online.html">Order Online</a></li>
      		<li id="current"><a href = "http://jadran.sdsu.edu/~jadrn033/proj4/pages/about-us.html">About Us</a></li>
      		<li><a href="http://jadran.sdsu.edu/~jadrn033/proj4/pages/contact-us.html">Contact</a> </li>
		</ul>
	</div>
  <div id="wrapper">
  <h1>Confirmation Page</h1>
END_HTML

sub getDate() {
    ($second, $minute, $hour, $dayofmonth, $month, $yearoffset, $dayofweek, $dayofyear, $daylightsavings) = localtime();
    $month += 1;
    $year = 1900 + $yearoffset;
    $date = "$year-$month-$dayofmonth";

    return $date;
}

sub getCustomerDetails() {

    foreach $key ($q->param) {

        if ($key =~ /fname/) {
            $FirstName = $q->param($key);
        }
        if ($key =~ /lname/) {
            $LastName = $q->param($key);
        }
        if ($key =~ /email/) {
            $Email = $q->param($key);
        }
        if ($key =~ /areacode/) {
            $a = $q->param($key);
        }
        if ($key =~ /prefix/) {
            $pr = $q->param($key);
        }
        if ($key =~ /phone/) {
            $ph = $q->param($key);
        }

        $Phone = $a . $pr . $ph;
        if ($key =~ /s_address1/) {
            $Address1 = $q->param($key);
        }
        if ($key =~ /s_address2/) {
            $Address2 = $q->param($key);
        }
        if ($key =~ /s_city/) {
            $City = $q->param($key);
        }
        if ($key =~ /s_state/) {
            $State = $q->param($key);
        }
        if ($key =~ /s_zip/) {
            $Zip = $q->param($key);
        }
    }
}

sub getOrderDetails() {
    foreach $key ($q->param) {
        if ($key =~ /SKUNumber/) {
            foreach $value ($q->param($key)) {
                if ($value ne "") {
                    push(@SKUArray, $value);
                }
            }
        }
        if ($key =~ /Title/) {
            foreach $value ($q->param($key)) {
                if ($value ne "") {
                    push(@TArray, $value);
                }
            }
        }
        if ($key =~ /Quantity/) {
            foreach $value ($q->param($key)) {
                push(@QtyArray, $value);
            }
        }
        if ($key =~ /CostPrice/) {
            foreach $value ($q->param($key)) {
                push(@CpArray, $value);
            }
        }
        if ($key =~ /Price/) {
            foreach $value ($q->param($key)) {
                push(@PriceArray, $value);
            }
        }

        if ($key =~ /Tax/) {
            $Tax = $q->param($key);
        }
        if ($key =~ /Shipping/) {
            $Shipping = $q->param($key);
        }
        if ($key =~ /Total/) {
            $TotalCharges = $q->param($key);
        }
    }
}

sub printO_Confirmation() {
    if (@SKUArray) {
        print "<div id='confirmpage'><h2><center>Thank you for shopping with us!!!</center></h2>";
        print "<h2><center>$FirstName&nbsp;$LastName</center></h2>";
        my $date = &getDate();
        print "<table class='confirm-table'>";
        print "<tr><th><b class='orders-heading'>Order Details </b>(Date: $date)</th></tr><tr>";
        print "<tr><td></td></tr>";
        print "<th>SKU</th><th>Product Title</th><th>Quantity</th><th>&emsp;&emsp;Price</th>";
        print "</tr> ";
        for ($count = 0; $count < @SKUArray; $count++) {
            print "<tr>";
            print "<td> $SKUArray[$count] </td>";
            my $str = $TArray[$count];
            my $find = "-";
            my $replace = " ";
            $find = quotemeta $find;
            $str =~ s/$find/$replace/g;
            print "<td> $str </td>";
            print "<td><center> $QtyArray[$count] </center></td>";
            print "<td>&emsp;&emsp;\$$PriceArray[$count] </td>";
            print "</tr><br/>";
        }
        print "<tr><td></td></tr>";
        print "<tr><td></td></tr>";
        print "<tr><th><b>Estimated Tax:&nbsp;\$$Tax</b></th></tr>";
        print "<tr><th><b>Shipping Charges: &nbsp;\$$Shipping</b></th></tr>";
        print "<tr><th><b>Total Order Price:  \$$TotalCharges</b></th></tr>";
        print "<tr><td></td></tr>";
        print "<tr><th class='orders-heading'>Shipment Address</th></tr>";
        print "<tr><td><b>Address:</b> &nbsp; $Address1,&nbsp;&nbsp; $Address2</td></tr>";
        print "<tr><td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;$City, $State-$Zip</td></tr>";
        print "<tr><td><b>Email:</b>&nbsp; $Email</td><td><b>Tel:</b> &nbsp; ($a)-$pr-$ph</td></tr>";
        print "</table></div>";
        print "<h2 id='button_line'><a id='c_a' href='http://jadran.sdsu.edu/~jadrn033/proj4/pages/products.html'>Continue Shopping</a>";
        print "&emsp;&emsp;<a id='c_a2' href='http://jadran.sdsu.edu/~jadrn033/proj4/index.html'>Home</a></h2></div>";
    }

}

&getOrderDetails();
&getCustomerDetails();
&printO_Confirmation();

my $host = "opatija.sdsu.edu";
my $port = "3306";
my $database = "jadrn033";
my $username = "jadrn033";
my $password = "tile";
my $database_source = "dbi:mysql:$database:$host:$port";
my $query;

my $dbh = DBI->connect($database_source, $username, $password)
    or die 'Cannot connect to db';

if (@SKUArray) {
    for (my $count = 0; $count < @SKUArray; $count++) {
        my $str1 = $TArray[$count];
        my $find1 = "-";
        my $replace1 = " ";
        $find1 = quotemeta $find;
        $str1 =~ s/$find/$replace/g;

        $query = $dbh->prepare("INSERT INTO orderinfo(orderdate,sku,title,quantity,cost,retail) VALUES
		 ('$date','$SKUArray[$count]','$str1','$QtyArray[$count]','$CpArray[$count]','$PriceArray[$count]')");
        $query->execute();
    }
    $query->finish();
}

$dbh->disconnect();

undef @SKUArray;

print "</div>";
print "</body>";
print "</html>";


