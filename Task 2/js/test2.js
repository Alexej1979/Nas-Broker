var notification;

$(function()
{ 
    
    var tableLang = 
        {
            "search": "Поиск:",
            "zeroRecords": "Данных нет"                    
        };
        
        
        
    $('#table1').DataTable(
        {
            "language": tableLang,         
            "bPaginate": false,
            "bLengthChange": false,
            "info":     false,
            order: [],
            columns: 
            [                    
                {"orderable": false},
                {"orderable": false},
                null,
                null                                                    
            ]
        });  
        
        // ПОПОЛНЕНИЕ ТЕКУЩЕГО СЧЕТА
        
    $("#table1 .add").on("click", function()
    {
        $("#exampleInputAmount").val("");
        $('#addTransit').modal('show'); 
        var closestTr = $(this).closest("tr");
        var number =closestTr.find(".number").html();
        var currency = closestTr.find(".currency").html();
        var currentSumm = closestTr.find(".currentSumm").html();        
        $('#addTransit .account-col h1').html(number);
        $('#addTransit #thisCurrency').html(currency);         
        $("#addTransit .modal-footer .btn-primary").data("this", $('#table1').DataTable().row(closestTr).index()).data("currentSumm", currentSumm); 
    });  
    
     $('#addTransit .modal-footer .btn-primary').on("click", function()
        {  
            var inputTransit = $("#exampleInputAmount").val();             
            if(notification)
               $(notification.ntf).remove();
            if(Math.sign (inputTransit)!==1 || inputTransit.charAt(0)=="0")            
                new_NotificationFx("Введите число в правильном формате",'error',2500);                         
            
            else
            {       
                
                $('#addTransit').modal('hide');                  
                var currentSumm = $(this).data("currentSumm");                
                currentSumm = (+inputTransit + +currentSumm).toFixed(2);
                $('#table1').dataTable().fnUpdate(currentSumm, $(this).data("this"), 3 );
                new_NotificationFx("Транзитный курс пополнен",'success',3000);
            };                            
        });
    



$('#table2').DataTable(
    {
        "language": tableLang,         
        "bPaginate": false,
        "bLengthChange": false,
        "info":     false,
        order: [],
        columns: 
            [                    
                {"orderable": false,  "width":"20%"},
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ] 
    }); 



// ПОПОЛНЕНИЕ БАЛАНСА

$("#table2 .add").on("click", function()
    {
        $("#exampleInputBalance").val("");
        $('#addBalance').modal('show'); 
        var closestTr = $(this).closest("tr");
        var number =closestTr.find(".number").html();
        var currency = closestTr.find(".currency").html();
        var currentBalance = closestTr.find(".currentBalance").html();        
        $('#addBalance .account-col h1').html(number);
        $('#addBalance #thisCurrencyBalance').html(currency);         
        $("#addBalance .modal-footer .btn-primary").data("this", $('#table2').DataTable().row(closestTr).index()).data("currentBalance", currentBalance); 
        console.info($("#table2 tbody tr").index(closestTr));
    });  
    
     $('#addBalance .modal-footer .btn-primary').on("click", function()
        {  
            var inputBalance = $("#exampleInputBalance").val();             
           if(notification)
               $(notification.ntf).remove();
            if(Math.sign (inputBalance)!==1 || inputBalance.charAt(0)=="0")            
                new_NotificationFx("Введите число в правильном формате",'error',2500);                         
            
            else
            {             
                $('#addBalance').modal('hide');                  
                var currentBalance = $(this).data("currentBalance");                
                currentBalance = (+inputBalance + +currentBalance).toFixed(2);
                console.info($(this).data("this"));
                $('#table2').dataTable().fnUpdate(currentBalance, $(this).data("this"), 7);
                new_NotificationFx("Баланс пополнен",'success',3000);
            };                            
        });
        
        
        
        // ИЗМЕНЕНИЕ ИМЕНИ
        
        $("#table2 .addName").on("click", function()
        {
            $("#exampleInputName").val("");
            $('#addName').modal('show'); 
            var closestTr = $(this).closest("tr");
            var number =closestTr.find(".number").html();
            var currency = closestTr.find(".currency").html();              
            $('#addName .account-col h1').html(number);
            $('#addName #thisCurrencyName').html(currency);         
            $("#addName .modal-footer .btn-primary").data("this", $('#table2').DataTable().row(closestTr).index());        
        });  
    
     $('#addName .modal-footer .btn-primary').on("click", function()
        {  
            var inputName = $.trim($("#exampleInputName").val());             
            if(notification)
               $(notification.ntf).remove();
            if(isValidFirstLetter(inputName))            
                new_NotificationFx("Введите имя в правильном формате",'error',2500);                      
            
            if(inputName=="")            
                new_NotificationFx("Введенное имя пустое",'error',2500);    
            
            else
            {          
               $('#addName').modal('hide');
                $('#table2').dataTable().fnUpdate(inputName, $(this).data("this"), 8);
                new_NotificationFx("Имя счета изменено",'success',3000);
           };                            
        });
        
        
        // ДОБАВЛЕНИЕ В ИЗБРАННОЕ
        
        $("#table2 .addFavorites").on("click", function()
        {
            var closestTr = $(this).closest("tr");
            var currentStatus = closestTr.find(".currentStatus");
            if(notification)
               $(notification.ntf).remove();
            if(currentStatus.hasClass( "favorites" ))
            {
               new_NotificationFx("Счёт удален из избранного",'success',3000);
               currentStatus.removeClass("favorites");
               $(this).find("i").removeClass("fa-star").addClass("fa-star-o");
               var text = currentStatus.html();                             
               text = text.replace('счёт избран',' ');
               $('#table2').dataTable().fnUpdate(text, $('#table2').DataTable().row(closestTr).index(), 9);
            }            
           else
           {
                new_NotificationFx("Счёт добавлен в избранные",'success',3000);
                var text = currentStatus.html();
                text = text + "<p class='colorGreen'>"+ " счёт избран ";
                $('#table2').dataTable().fnUpdate(text, $('#table2').DataTable().row(closestTr).index(), 9);
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
            var closestTr = $(this).closest("tr");
            var currentStatus = closestTr.find(".currentStatus");
            if(notification)
               $(notification.ntf).remove();
            if(currentStatus.hasClass( "addLock" ))
            {
               new_NotificationFx("Счёт разблокирован",'success',3000);              
               currentStatus.removeClass("addLock");
               $(this).find("i").removeClass("fa-lock").addClass("fa-unlock");
               var text = currentStatus.html();                             
               text = text.replace('счёт заблокирован',' ');
               $('#table2').dataTable().fnUpdate(text, $('#table2').DataTable().row(closestTr).index(), 9);
            }            
           else
           {            
                new_NotificationFx("Счёт заблокирован",'success',3000);
                var text = currentStatus.html();
                text = text + "<p class='colorRed'>"+ " счёт заблокирован ";
                $('#table2').dataTable().fnUpdate(text, $('#table2').DataTable().row(closestTr).index(), 9);
                $(this).find("i").removeClass("fa-unlock").addClass("fa-lock");
                currentStatus.addClass("addLock");
            }                        
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

