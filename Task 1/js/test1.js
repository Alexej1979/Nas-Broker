$(function()
{
    $.ajax(
            { 
                url: "https://test-play-ground.firebaseio.com/.json" 
                }).done(function( data ) 
                {
                    var currencies =[];
                    var thisCurrency = -1;
                    var thisCurrencyName = "";
                    buildSystem(data);
                    for(i=0;i<data.systems.length;i++)
                    {
                        for (l=0; l < data.systems[i].methods.length; l++)
                        {
                            for (m=0; m < data.systems[i].methods[l].currencies.length; m++)
                            {  
                                currencies[currencies.length] = data.systems[i].methods[l].currencies[m];                                 
                            }
                        }
                    }    
                    var currenciesSorted = _.uniq(currencies);
                    for (m=0;m<currenciesSorted.length;m++)
                    {
                        var option=$("<option>");
                        $("#currency").append(option.attr("value",m).html(currenciesSorted[m]));                       
                    }
                    $("#currency").val("");                   
                    $("#system").val("");
                    $("#currency").on("change",function()
                    {
                        if ($("#system option:selected").length==0)
                        {       
                            $("#system option").remove();
                            $("#method option").remove();   
                            buildSystem(data);
                        }                       
                        thisCurrency = $('#currency').find(":selected").val();
                        thisCurrencyName = $('#currency').find(":selected").text();                       
                    });
                    $("#system").on("change",function()
                    {     
                        $("#method").prop("disabled", false);
                        $("#method option").remove();
                        var thisSelectedSystem = $('#system').find(":selected").val();
                        if (thisCurrency == -1)
                        {
                            $("#currency option").remove();                                    
                            for (j=0;j<data.systems[thisSelectedSystem].methods.length;j++)
                            {
                                var option=$("<option>");                                
                                $("#method").append(option.attr("value",j).html(data.systems[thisSelectedSystem].methods[j].name));
                            }
                            $("#method").val("");
                        }
                        else
                        {
                            for (j=0;j<data.systems[thisSelectedSystem].methods.length;j++)
                            {
                                for (n = 0; n<data.systems[thisSelectedSystem].methods[j].currencies.length;n++)
                                {
                                    var option=$("<option>");      
                                    if (data.systems[thisSelectedSystem].methods[j].currencies[n]==thisCurrencyName) 
                                    {
                                        $("#method").append(option.attr("value",n).html(data.systems[thisSelectedSystem].methods[j].name));
                                    }
                                }
                            }
                        }
                    });
                    $("#method").on("change",function()
                    { 
                        $("#currency option").remove();
                        var thisSelectedMethod = $('#method').find(":selected").val();
                        var thisSelectedSystem = $('#system').find(":selected").val(); 
                        for (k=0;k<data.systems[thisSelectedSystem].methods[thisSelectedMethod].currencies.length;k++)
                        {
                            var option=$("<option>");                                
                            $("#currency").append(option.attr("value",k).html(data.systems[thisSelectedSystem].methods[thisSelectedMethod].currencies[k]));
                        }                           
                    });  
                });
            });
            
function buildSystem(data)
{
    $("#system option").remove();    
    for(i=0;i<data.systems.length;i++)
    {
        var option=$("<option>");                       
        $("#system").append(option.attr("value",i).html(data.systems[i].name));                      
    }  
    $("#system").val("");               
}