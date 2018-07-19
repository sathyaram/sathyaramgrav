        


var options = {
  url: function(phrase) {
    return "https://api.cdnjs.com/libraries?search=";
  },

  getValue: function(element) {
    return element.latest;
  },

  ajaxSettings: {
    dataType: "json",
    method: "GET",
    data: {
      dataType: "json"
    }
  },
    categories: [
        {   //Category fruits
            listLocation: "results",
            header: "results"
        }
    ],

    list: {
        match: {
            enabled: true
        }
    },

    theme: "plate-dark",
    preparePostData: function(data) {
    data.phrase = $(".autoclass").val();
    return data;
  },

  requestDelay: 400
};

$(".autoclass.test").easyAutocomplete(options);
$("[data-action=add").click( function(){
    $(".test").removeClass("autoclass");
    var options = {
  url: function(phrase) {
    return "https://api.cdnjs.com/libraries?search=";
  },

  getValue: function(element) {
    return element.latest;
  },

  ajaxSettings: {
    dataType: "json",
    method: "GET",
    data: {
      dataType: "json"
    }
  },
    categories: [
        {   //Category fruits
            listLocation: "results",
            header: "results"
        }
    ],

    list: {
        match: {
            enabled: true
        }
    },

    theme: "plate-dark",
    preparePostData: function(data) {
    data.phrase = $(".autoclass.test").val();
    return data;
  },

  requestDelay: 400
};
    $(".autoclass.test").easyAutocomplete(options);
alert('button clicked');
});
