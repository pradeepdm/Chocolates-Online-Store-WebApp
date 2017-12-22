#!/usr/bin/perl

use CGI;
use CGI::Cookie;
use CGI::Session;

my $q = new CGI;
my $msg = "";
my $session;
my $is_new;
my $sku;
my $qty;

my $sid = $q->cookie("jadrn000") || undef;
if($sid) {
    $msg .= "Found a cookie with ID: $sid";
    $session = new CGI::Session("driver:File", $sid, {Directory=>'/tmp'});
    $is_new = 0;
}
else {
    $msg .= "the session ID is new/undefined";
    $session = new CGI::Session("driver:File", undef, {Directory=>'/tmp'});
    $is_new = 1;
    $sid = $session->id();
}


if($is_new) {
    $cookie = $q->cookie("jadrn000" => $sid);
    print $q->header( -cookie=>$cookie );
}


$sku=$q->param('name');
$qty=$q->param('value');

if($sku) {
    $session->param($sku,$qty);
}

$msg .= "SID IS: $sid\n";
foreach my $item ($session->param) { $msg .= "ITEM: ".$item."=".$session->param($item)."\n";}

print "Content-type: text/html\n\n$msg";



