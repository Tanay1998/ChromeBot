// document.addEventListener('DOMContentLoaded', () => {
//     chrome.storage.sync.get(null, function(data) {
//         if (data.settings['showAlerts'] && !$(this).hasClass('active')) {
//             $(this).toggleClass('active');
//         }
//         if (!data.settings['showAlerts'] && $(this).hasClass('active')) {
//             $(this).toggleClass('active');
//         }
//     });
// });

$(function(){
  $('.toggle').on('click', function(event){
    event.preventDefault();
    $(this).toggleClass('active');
    var showAlert =  $(this).hasClass('active');
    chrome.storage.sync.get(null, function(data) {
        data.settings['showAlerts'] = showAlert;
        chrome.storage.sync.set({ settings: data.settings })
    });
  });
});