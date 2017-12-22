#!/usr/bin/perl
#	Sample perl cgi script.  This script prints sales report of Bertha's Deluxe Chocolate.
#
#	CS545 Fall 2017
#
#	Mallikarjun, Pradeep
#   Account:jadrn033
#	CS545 Fall 2017
#	Project #4

use CGI;
use DBI;
use File::Path;

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
	<link rel="stylesheet" type="text/css" href="http://jadran.sdsu.edu/~jadrn033/proj4/styles/report.css" />
	<link href="https://www.fontify.me/wf/a899c3e7c4d07950ac58db0ee10c33f0" rel="stylesheet" type="text/css">
</head>
<body>
<h1>Sales Report</h1>
<div id="container">
<table>
END_HTML


my $host = "opatija.sdsu.edu";
my $port = "3306";
my $database = "jadrn033";
my $username = "jadrn033";
my $password = "tile";
my $database_source = "dbi:mysql:$database:$host:$port";

my $dbh = DBI->connect($database_source, $username, $password)
    or die 'Cannot connect to db';

my $sth = $dbh->prepare("SELECT orderdate, sku, title, quantity, cost, retail FROM orderinfo order by sku");
$sth->execute();

my $totalCost = 0;
my $totalQuantity = 0;
my $totalRetail = 0;
my $totalProfit = 0;
my $profit = 0;

print"<tr><th>Order Date</th> <th>SKU(s)</th> <th>Title</th> <th>Quantity</th> <th>Cost price</th> <th>Total Retail</th> <th>Profit</th></tr>";

while(my @row=$sth->fetchrow_array()) {

    $totalQuantity+=$row[3];
    $totalCost+= $row[4] * $row[3];
    $totalRetail+= $row[5];
    $profit = $row[5] - ($row[4] * $row[3]);
    print "<tr>";
    print "<td>$row[0]</td>";
    print "<td>$row[1]</td>";
    print "<td>$row[2]</td>";
    print "<td>$row[3]</td>";
    print "<td>$row[4]</td>";
    print "<td>$row[5]</td>";
    print "<td>$profit</td>";
    print "</tr>";

}

$totalProfit = $totalRetail - $totalCost;
$sth->finish();
$dbh->disconnect();
print "<tr>";
print "<td colspan='3'>Grand Total</td>";
print "<td>$totalQuantity</td>";
print "<td>$totalCost</td>";
print "<td>$totalRetail</td>";
print "<td>$totalProfit</td>";
print "</tr>";
print "</table>\n";
print "</div>\n";
print "</div>\n";
print "</body>\n";
print "</html>\n";
