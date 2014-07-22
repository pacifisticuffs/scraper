var //express = require('express'),
    request = require('request'),
    cheerio = require('cheerio'),
    // app     = express(),
    url     = 'http://stats.liahl.org/display-stats.php?league=1',
    selectors = {
      divisions: 'th[colspan="7"] a[name]'
    },
    rows, $,
    divisions = [];

request( url, function( error, response, html ) {
  if ( error ) {
    console.error( 'Something broke: ', error );
    return;
  }

  $ = cheerio.load( html );

  rows = $( 'tr' );

  rows.each(function( index, el ) {
    var $row = $( el );

    switch ( true ) {
      // This is a division
      case $row.find( selectors.divisions ).length:
        console.log( 'found a division' );
        divisions.push({
          id   : index,
          name : $row.find( selectors.divisions ).length
        });
        break;

      default:
        break;
    }
  });

  console.log( divisions );
});


// rows.each(function(index,el) {
//   var row = $(el);
//   if ( row.find(selectors.divisions) ) {
//     console.log( row.find( selectors.divisions ).text() )
//   }
//   return false;
// })