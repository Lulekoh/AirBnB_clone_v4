const HOST = '0.0.0.0';

$(document).ready(function () {
  const amenityList = {}; // Dictionary to store Amenity IDs

  $('input#check_amenity').change(function () {
    const checkboxId = $(this).attr('data-id');

    if (this.checked) {
      // If the checkbox is checked, store the Amenity ID in the dictionary
      amenityList[checkboxId] = $(this).attr('data-name');
    } else {
      // If the checkbox is unchecked, remove the Amenity ID from the dictionary
      delete amenityList[checkboxId];
    }

    // Update the h4 tag inside the div Amenities with the list of Amenities checked
    $('div.amenities h4').text(Object.values(amenityList).join(', '));
  });
  apiStatus();
  fetchPlaces();
});

function apiStatus () {
  const apiUrl = 'http://0.0.0.0:5001/api/v1/status/';
  $.get(apiUrl, function (data, status) {
    if (data.status === 'OK' && status === 'success') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
}

function fetchPlaces () {
  const PLACES_URL = `http://${HOST}:5001/api/v1/places_search/`;
  $.ajax({
    url: PLACES_URL,
    type: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({}),
    success: function (response) {
      for (const r of response) {
        const article = [
          '<article>',
          '<div class="title_box">',
          `<h2>${r.name}</h2>`,
          `<div class="price_by_night">$${r.price_by_night}</div>`,
          '</div>',
          '<div class="information">',
          `<div class="max_guest">${r.max_guest} Guest(s)</div>`,
          `<div class="number_rooms">${r.number_rooms} Bedroom(s)</div>`,
          `<div class="number_bathrooms">${r.number_bathrooms} Bathroom(s)</div>`,
          '</div>',
          '<div class="description">',
          `${r.description}`,
          '</div>',
          '</article>'
        ];
        $('SECTION.places').append(article.join(''));
      }
    },
    error: function (error) {
      console.log(error);
    }
  });
}
