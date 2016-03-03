var notification;

$(function()
{ 
       
        // ПОПОЛНЕНИЕ ТЕКУЩЕГО СЧЕТА
        
    $("#table1 .nt-item-action1").on("click", function()
    {
        $("#exampleInputAmount").val("");
        $('#addTransit').modal('show'); 
        var closestLi = $(this).closest("li");
        var number = closestLi.find(".number").html();
        var currency = closestLi.find(".currency").html();
        var currentSumm = closestLi.find(".currentSumm").html();         
        $('#addTransit .account-col h1').html(number);
        $('#addTransit #thisCurrency').html(currency);         
        $("#addTransit .modal-footer .btn-primary").data("this", closestLi.find(".currentSumm")).data("currentSumm", currentSumm); 
    });  
    
     $('#addTransit .modal-footer .btn-primary').on("click", function()
        {  
            var inputTransit = $("#exampleInputAmount").val();             
            if(notification)
               $(notification.ntf).remove();
            if(Math.sign (inputTransit)!==1)            
                new_NotificationFx("Введите число в правильном формате",'error',2500);                         
            
            else
            {       
                
                $('#addTransit').modal('hide');                  
                var currentSumm = $(this).data("currentSumm");                
                currentSumm = (+inputTransit + +currentSumm).toFixed(2);
                $(this).data("this").html(currentSumm); 
               // $('#table1').dataTable().fnUpdate(currentSumm, $(this).data("this"), 3 );
                new_NotificationFx("Транзитный курс пополнен",'success',3000);
            };                            
        });
    



// ПОПОЛНЕНИЕ БАЛАНСА

$("#table2 .nt-item-action2").on("click", function()
    {
        $("#exampleInputBalance").val("");
        $('#addBalance').modal('show'); 
        var closestLi = $(this).closest("li");
        var number = closestLi.find(".number").html();
        var currency = closestLi.find(".currency").html();
        var currentBalance = closestLi.find(".currentBalance").html();         
        $('#addBalance .account-col h1').html(number);
        $('#addBalance #thisCurrencyBalance').html(currency);         
        $("#addBalance .modal-footer .btn-primary").data("this", closestLi.find(".currentBalance")).data("currentBalance", currentBalance); 
    });  
    
     $('#addBalance .modal-footer .btn-primary').on("click", function()
        {  
            var inputBalance = $("#exampleInputBalance").val();             
           if(notification)
               $(notification.ntf).remove();
            if(Math.sign (inputBalance)!==1)            
                new_NotificationFx("Введите число в правильном формате",'error',2500);                         
            
            else
            {             
                $('#addBalance').modal('hide');                  
                var currentBalance = $(this).data("currentBalance");                
                currentBalance = (+inputBalance + +currentBalance).toFixed(2);
                console.info($(this).data("this"));
                $(this).data("this").html(currentBalance); 
               // $('#table2').dataTable().fnUpdate(currentBalance, $(this).data("this"), 7);
                new_NotificationFx("Баланс пополнен",'success',3000);
            };                            
        });
        
        
        
        // ИЗМЕНЕНИЕ ИМЕНИ
        
        $("#table2 .addName").on("click", function()
        {
            $("#exampleInputName").val("");
            $('#addName').modal('show'); 
            var closestLi = $(this).closest("li");
            var number = closestLi.find(".number").html();
            var currency = closestLi.find(".currency").html();             
            $('#addName .account-col h1').html(number);
            $('#addName #thisCurrencyName').html(currency);         
            $("#addName .modal-footer .btn-primary").data("this", closestLi.find(".curentName"));        
        });  
    
     $('#addName .modal-footer .btn-primary').on("click", function()
        {  
            var inputName = $.trim($("#exampleInputName").val());             
            if(notification)
               $(notification.ntf).remove();
            if(isValidFirstLetter(inputName))            
                new_NotificationFx("Введите имя в правильном формате",'error',2500);                      
            
            else if(inputName=="")            
                new_NotificationFx("Введенное имя пустое",'error',2500);    
            
            else
            {          
               $('#addName').modal('hide');
               $(this).data("this").html(inputName); 
               // $('#table2').dataTable().fnUpdate(inputName, $(this).data("this"), 8);
                new_NotificationFx("Имя счета изменено",'success',3000);
           };                            
        });
        
        
        // ДОБАВЛЕНИЕ В ИЗБРАННОЕ
        
       $("#table2 .addFavorites").on("click", function()
        {
            var closestLi = $(this).closest("li");
            var currentStatus = closestLi.find(".label-success");
            if(notification)
               $(notification.ntf).remove();
            if(currentStatus.hasClass( "favorites" ))
            {
               new_NotificationFx("Счёт удален из избранного",'success',3000);
               currentStatus.removeClass("favorites");
               $(this).find("i").removeClass("fa-star").addClass("fa-star-o");
               currentStatus.html('');            
            }            
           else
           {    new_NotificationFx("Счёт добавлен в избранные",'success',3000);               
                currentStatus.html('избран');              
                $(this).find("i").removeClass("fa-star-o").addClass("fa-star");
                currentStatus.addClass("favorites");
            }                        
        });
        
        // СБРОСИТь ПАРОЛЬ
        
        $("#table2 .resetPassword").on("click", function()
        {      if(notification)
               $(notification.ntf).remove();     
               new_NotificationFx("Пароль сброшен",'success',3000);
        });
        
        
        // ЗАБЛОКИРОВАТЬ СЧЕТ
        
        $("#table2 .addLock").on("click", function()
        {
            var closestLi = $(this).closest("li");
            var currentStatus = closestLi.find(".label-danger");
            if(notification)
               $(notification.ntf).remove();
            if(currentStatus.hasClass( "addLock" ))
            {
               new_NotificationFx("Счёт разблокирован",'success',3000);              
               currentStatus.removeClass("addLock");
               $(this).find("i").removeClass("fa-lock").addClass("fa-unlock");              
               currentStatus.html('');           
            }            
           else
           {            
                new_NotificationFx("Счёт заблокирован",'success',3000);                
                currentStatus.html("заблокирован");            
                $(this).find("i").removeClass("fa-unlock").addClass("fa-lock");
                currentStatus.addClass("addLock");
            }                        
        });
        
        
            $('.nt-item').mouseenter(function()               
    {
        $(this).find('.fadeIn').removeClass("animated fadeOutDown").addClass('animated fadeInUp').css({"visibility": "visible"});
       
      
        
    });
    
       $('.nt-item').mouseleave(function()               
    {
          $(this).find('.fadeIn').removeClass("animated fadeInUp").addClass('animated fadeOutDown').css({"visibility": "visible"});
      
       
        
    });
    
    
    $("#search1").on("keyup",function()
    {       
       var search = $(this).val();      
       
       $("#table1 .nt-item").each(function()
       {
           var found=false;
           
           $(this).find(".find").each(function()
                   {                       
                       if($(this).html().indexOf(search)>=0)
                       {    
                          found = true; 
                          return false;
                       }                       
                   });
            if (!found)
                $(this).hide();
            else
                $(this).show();
            
        });
    });
    
    
    $("#search2").on("keyup",function()
    {       
       var search = $(this).val();      
       
       $("#table2 .nt-item").each(function()
       {
           var found=false;
           
           $(this).find(".find").each(function()
                   {                       
                       if($(this).html().indexOf(search)>=0)
                       {    
                          found = true; 
                          return false;
                       }                       
                   });
            if (!found)
                $(this).hide();
            else
                $(this).show();
            
        });
    });
    
    
});       

function new_NotificationFx(message,type,ttl)
{
    notification = new NotificationFx(   
                        {
                           wrapper : document.body,
                           message : message,
                           layout : 'growl',
                           effect : 'jelly',
                           type : type,
                           ttl : ttl                               
                       });
    notification.show();                    
                       
}

function isValidFirstLetter(str)
{
 return /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str.charAt(0));
}

