function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName('tabcontent');
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none';
    }
    tablinks = document.getElementsByClassName('tablinks');
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(' active', '');
    }
    document.getElementById(tabName).style.display = 'block';
    evt.currentTarget.className += ' active';
}
document.getElementById('default-open').click();

$(function () {
    // handle close button text on use policy
    $('.intranet-use-policy-close-button').click(function () {
        if ($('#intranet-use-policy').hasClass('in')) {
            $('.intranet-use-policy-close-button').text('Open');
        }
        else {
            $('.intranet-use-policy-close-button').text('Close');
        }
    });

    // set parsley for required fields
    var requiredFields = ['title',
                          'document-type',
                          'division',
                          'file-object'];
    for (var i = 0; i < requiredFields.length; i++) {
        $('#' + requiredFields[i]).attr('data-parsley-required', '');
    }

// MAKE SURE END AND INCREMENT ARE THE SAME. START SHOULD ALWAYS START AT 0
var start = 0;
var end = 10;
var increment = 10;

    $.ajax({
        url: '/documents/search/',
        type: 'GET',
        dataType: 'json',
        data: {
            'sort_by': $('#sort-dropdown').find('option:selected').val(),
            'current_tab': $('.tablinks.active').val(),
            'search_term': $('#save-search-term').text(),
            'start': start.toString(),
            'end': end.toString()
        },
        success: function (data) {
            $('#instructions').html('');
            $('#policies-and-procedures').html('');
            $('#templates').html('');
            $('#training-materials').html('');
            $('#instructions').html(data['instructions']);
            $('#policies-and-procedures').html(data['policies_and_procedures']);
            $('#templates').html(data['templates']);
            $('#training-materials').html(data['training_materials']);

            if (data['instructions_max'] <= increment) {
                $('#prev').hide();
                $('#next').hide();
                $('#page-info').html(data['instructions_start'] + ' - ' + data['instructions_max'] + ' of ' + data['instructions_max']);
            }
            else if (data['instructions_start'] === 1) {
                $('#page-info').html(data['instructions_start'] + ' - ' + data['instructions_end'] + ' of ' + data['instructions_max']);
                $('#prev').hide();
                $('#next').show();
            }
            else {
                $('#page-info').html(data['instructions_start'] + ' - ' + data['instructions_end'] + ' of ' + data['instructions_max']);
                $('#prev').show();
            }
        }
    });

    $('#next').click(function () {
        start = start + increment;
        end = end + increment;
        $.ajax({
            url: '/documents/search/',
            type: 'GET',
            dataType: 'json',
            data: {
                'sort_by': $('#sort-dropdown').find('option:selected').val(),
                'current_tab': $('.tablinks.active').val(),
                'search_term': $('#save-search-term').text(),
                'start': start.toString(),
                'end': end.toString()
            },
            success: function (data) {
                $('#instructions').html('');
                $('#policies-and-procedures').html('');
                $('#templates').html('');
                $('#training-materials').html('');
                $('#instructions').html(data['instructions']);
                $('#policies-and-procedures').html(data['policies_and_procedures']);
                $('#templates').html(data['templates']);
                $('#training-materials').html(data['training_materials']);

                // set counter
                if (data['instructions_end'] >= data['instructions_max']) {
                    $('#page-info').html(data['instructions_start'] + ' - ' + data['instructions_max'] + ' of ' + data['instructions_max']);
                    $('#next').hide();
                }
                else {
                    $('#page-info').html(data['instructions_start'] + ' - ' + data['instructions_end'] + ' of ' + data['instructions_max']);
                }
                $('#prev').show();
            }
        });
    });

    $('#prev').click(function () {
        start = start - increment;
        end = end - increment;
        $.ajax({
            url: '/documents/search/',
            type: 'GET',
            dataType: 'json',
            data: {
                'sort_by': $('#sort-dropdown').find('option:selected').val(),
                'current_tab': $('.tablinks.active').val(),
                'search_term': $('#save-search-term').text(),
                'start': start.toString(),
                'end': end.toString()
            },
            success: function (data) {
                $('#instructions').html('');
                $('#policies-and-procedures').html('');
                $('#templates').html('');
                $('#training-materials').html('');
                $('#instructions').html(data['instructions']);
                $('#policies-and-procedures').html(data['policies_and_procedures']);
                $('#templates').html(data['templates']);
                $('#training-materials').html(data['training_materials']);

                // set counter
                if (data['instructions_start'] === 1) {
                    $('#prev').hide();
                }
                $('#next').show();
                $('#page-info').html(data['instructions_start'] + ' - ' + data['instructions_end'] + ' of ' + data['instructions_max']);
            }
        });
    });

    // handle sort by dropdown change event
    $('#sort-dropdown').change(function() {
        start = 0;
        end = increment;
        $.ajax({
            url: '/documents/search/',
            type: 'GET',
            dataType: 'json',
            data: {
                'sort_by': $('#sort-dropdown').find('option:selected').val(),
                'current_tab': $('.tablinks.active').val(),
                'search_term': $('#save-search-term').text(),
                'start': start.toString(),
                'end': end.toString()
            },
            success: function (data) {
                $('#instructions').html('');
                $('#policies-and-procedures').html('');
                $('#templates').html('');
                $('#training-materials').html('');
                $('#instructions').html(data['instructions']);
                $('#policies-and-procedures').html(data['policies_and_procedures']);
                $('#templates').html(data['templates']);
                $('#training-materials').html(data['training_materials']);

                if (data['instructions_max'] <= increment) {
                    $('#prev').hide();
                    $('#next').hide();
                    $('#page-info').html(data['instructions_start'] + ' - ' + data['instructions_max'] + ' of ' + data['instructions_max']);
                }
                else if (data['instructions_start'] === 1) {
                    $('#page-info').html(data['instructions_start'] + ' - ' + data['instructions_end'] + ' of ' + data['instructions_max']);
                    $('#prev').hide();
                    $('#next').show();
                }
                else {
                    $('#page-info').html(data['instructions_start'] + ' - ' + data['instructions_end'] + ' of ' + data['instructions_max']);
                    $('#prev').show();
                }
            }
        });
    });

    $('.documents-search-button').click(function() {
        var search_term = $('#document-search-term').val();
        $('#document-search-term').val('');
        start = 0;
        end = increment;
        $.ajax({
            url: '/documents/search/',
            type: 'GET',
            dataType: 'json',
            data: {
                'sort_by': $('#sort-dropdown').find('option:selected').val(),
                'current_tab': $('.tablinks.active').val(),
                'search_term': search_term,
                'start': start.toString(),
                'end': end.toString()
            },
            success: function (data) {
                $('#instructions').html('');
                $('#policies-and-procedures').html('');
                $('#templates').html('');
                $('#training-materials').html('');
                $('#instructions').html(data['instructions']);
                $('#policies-and-procedures').html(data['policies_and_procedures']);
                $('#templates').html(data['templates']);
                $('#training-materials').html(data['training_materials']);
                if (search_term !== '') {
                    $('#save-search-term').html(search_term);
                    $('#display-search-term').show()
                }
                else {
                    $('#save-search-term').html('');
                    $('#display-search-term').hide()
                }

                if (data['instructions_max'] == 0) {
                    $('#prev').hide();
                    $('#next').hide();
                    $('#page-info').html(0 + ' - ' + 0 + ' of ' + 0);
                }
                else if (data['instructions_max'] <= increment) {
                    $('#prev').hide();
                    $('#next').hide();
                    $('#page-info').html(data['instructions_start'] + ' - ' + data['instructions_max'] + ' of ' + data['instructions_max']);
                }
                else if (data['instructions_start'] === 1) {
                    $('#page-info').html(data['instructions_start'] + ' - ' + data['instructions_end'] + ' of ' + data['instructions_max']);
                    $('#prev').hide();
                    $('#next').show();
                }
                else {
                    $('#page-info').html(data['instructions_start'] + ' - ' + data['instructions_end'] + ' of ' + data['instructions_max']);
                    $('#prev').show();
                }
            }
        });
    });
});