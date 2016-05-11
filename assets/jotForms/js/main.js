if(!$('stage')) {
    var getRefWidgets = $$('.getRef');
    var getRefForm = $$('.jotform-form')[0];
    
    getRefWidgets.each(function(el){
            // hide the field
            var parent = el.parentNode.parentNode.parentNode.parentNode;
            $(parent).hide();
            // populate
            el.value = document.referrer.match(/\?formID\=/g) ? window.location.href : document.referrer || window.location.href;
    });
    
    getRefForm.observe('submit',function(){
        getRefWidgets.each(function(el){
            // repopulate just to make sure
            el.value = document.referrer.match(/\?formID\=/g) ? window.location.href : document.referrer || window.location.href;
        });
    });
}