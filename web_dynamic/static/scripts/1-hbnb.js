/* global $ */
$(document).ready(function () {
  // initialise empty list to store the Amenity IDs
  const selectAmenities = {};

  // listen for changes on amenity checkboxes.
  $('input[type="checkbox"][data-id]').change(function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if ($().is(':checked')) {
      selectAmenities[amenityId] = amenityName;
    } else {
      delete selectAmenities[amenityId];
    }

    // update h4 tag with a list of a selected Amenities.
    updateAmenitiesList();
  });

  function updateAmenitiesList () {
    const amenitiesArray = Object.values(selectAmenities);
    let amenitiesList = amenitiesArray.join(', ');

    //
    if (amenitiesList.length > 31) {
      amenitiesList = amenitiesList.slice(0, 31) + '...';
    }

    $('.amenities h4').text(amenitiesList);
  }
});
