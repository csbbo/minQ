$(function(){
    var from = "auto";
    var to = "zh-CHS";
    $("#query").keyup(function(){
        translate();
    });
    $("#querybtn").click(function(){
        translate();
    });
    $("#minq").click(function(){
        $("#query").val("")
        $("#hidden").show()
        $("#translate").hide()
    });
    function translate(){
        var q = $("#query").val()
        if(q){
            if(q.length<20){
                language()
                var secretKey = "8z6MGtGsyVoervF5Fk3yET4xsNOqgjet"
                var appKey = "2ba19d7e3ed057cf"
                var salt = "8520"
                var sign = md5(appKey+q+salt+secretKey)
                var ext = "mp3"
                var voice = 0
                // 有道智云API
                var url = "http://openapi.youdao.com/api"
                var params = "?q="+q+"&from="+from+"&to="+to+"&appKey="+appKey+"&salt="+salt+"&sign="+sign+"&ext="+ext+"&voice="+voice
                var minQ = url+params
                $.get(minQ, function(data) {
                    console.log(data);
                    cleandata();
                    if($("#select").val() === "entoch"){
                        $("#qquery").text(data.query);
                        if(data.basic['us-phonetic']){
                            $("#us-phonetic").text("美["+data.basic["us-phonetic"]+"]");
                        }
                        if(data.basic['uk-phonetic']){
                            $("#uk-phonetic").text("英["+data.basic["uk-phonetic"]+"]");
                        }
                        if(data.basic.explains){
                            for (i=0;i<data.basic["explains"].length;i++){
                                $("#explains").append("<li>")
                                $("#explains").append(data.basic['explains'][i])
                                $("#explains").append("</li>")
                            }
                        }
                        if(data.basic.wfs)
                        {
                            $("#wfs").append("[ ")
                            for (j=0;j<data.basic["wfs"].length;j++){
                                $("#wfs").append(data.basic["wfs"][j]["wf"]["name"])
                                $("#wfs").append(" ")
                                $("#wfs").append(data.basic["wfs"][j]["wf"]["value"])
                                $("#wfs").append(" ")
                            }
                            $("#wfs").append("]")
                        }
                        if(data.web){
                            $("#webtitle").text("网络释义")
                            for (k=0;k<data.web.length;k++){
                                $("#web").append("<li>")
                                $("#web").append(data.web[k]["key"])
                                $("#web").append(" ")
                                $("#web").append(data.web[k]["value"]+" ")
                                $("#web").append("</li>")
                            }
                        } 
                    }else{
                        $("#translate").hide()
                        $("#translation").text(data.translation);
                    }
                }, 'jsonp');
            
                $("#hidden").hide()
                $("#translate").show()
            }else{
                alert("请使用翻译功能翻译句子")
            }
        }else
        {
            $("#hidden").show()
            $("#translate").hide()
        }
    };
    $("#espeak").click(function(){
        // alert("e")
    });
    $("#uspeak").click(function(){
        // alert("u")
    });
    function cleandata(){
        $("#qquery").text(" ");
        $("#uk-phonetic").text(" ");
        $("#us-phonetic").text(" ");
        $("#explains").text("")
        $("#wfs").text("")
        $("#web").text("")
        $("#webtitle").text("")
        $("#translation").text("")
    };
    function language(){
        var current_value = $("#select").val()
        switch(current_value)
        {
            case "chtoen":
                from = "zh-CHS";
                to = "EN";
                break;
            case "entoch":
                from = "EN";
                to = "zh-CHS";
                break;
            case "chtoja":
                from = "zh-CHS";
                to = "ja";
                break;
            case "chtoko":
                from = "zh-CHS";
                to = "ko";
                break;
            case "chtofr":
                from = "zh-CHS";
                to = "fr";
                break;
            case "chtode":
                from = "zh-CHS";
                to = "de";
                break;
            case "chtoru":
                from = "zh-CHS";
                to = "ru";
                break;
            case "chtoes":
                from = "zh-CHS";
                to = "es";
                break;
            case "chtopt":
                from = "zh-CHS";
                to = "pt";
                break;
            case "chtovi":
                from = "zh-CHS";
                to = "vi";
                break;
            case "chtoid":
                from = "zh-CHS";
                to = "id";
                break;
            case "chtoar":
                from = "zh-CHS";
                to = "ar";
                break;
            default:
                from = "auto";
                to = "zh-CHS";
        }
    }
    // 金山词霸每日一句英语开放API
    function daily(){
        $.get('http://open.iciba.com/dsapi/',function(data){
            console.log(data)
            $('#ensentence').text(data.content);
            $('#chsentence').text(data.note);
            $('#prettynote').text(data.translation);
        },'jsonp');
    }
    daily();
});