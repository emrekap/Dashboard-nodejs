
function getCurrDate(){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
        month = (month < 10 ? "0" : "") + month;
    var day  = date.getDate();
        day = (day < 10 ? "0" : "") + day;
    var currdate = year + "-"+ month + "-" + day;
    return currdate;
}

function getDateArr(startDate, endDate){
    var end = new Date(endDate);
    var daysOfYear = [];
    for (var d = new Date(startDate); d <= end; d.setDate(d.getDate() + 1)) {
        daysOfYear.push(formatDate(d));
    }
    return daysOfYear;
}

function formatDate(date){
    var d = new Date(date);
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
        month = (month < 10 ? "0" : "") + month;
    var day  = d.getDate();
        day = (day < 10 ? "0" : "") + day;
    var currdate = year + "-"+ month + "-" + day;
    return currdate;
}

function getUserList(){
    var userList = [];
    var list = [];
    var jsonData = $.ajax({
      url: "/api/employee/userlist",
      dataType: "json",
      async: false,
      success:function(jsonData){
         userList = $.map(jsonData, function(el) { return el });
         userList.forEach(function(element) {
             list.push(element.id);
         });
      }
    });
    return list;
}