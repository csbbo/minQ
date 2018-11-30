
$(function(){
    var from = "auto";
    var to = "zh-CHS";
    $("#query").keyup(function(){
        translate();
    });
    $("#qquery").click(function(){
        translate();
    });
    $("#minq").click(function(){
        $("#translate").val("");
        $("#query").val("")
    });
    function translate(){
        var q = $("#query").val()
        q = q.replace(/\n/g, ' ')
        if(q){
            language()
            var secretKey = "8z6MGtGsyVoervF5Fk3yET4xsNOqgjet"
            var appKey = "2ba19d7e3ed057cf"
            var salt = "8520"
            var sign = md5(appKey+q+salt+secretKey)
            var ext = "mp3"
            var voice = 0

            var url = "http://openapi.youdao.com/api"
            var params = "?q="+q+"&from="+from+"&to="+to+"&appKey="+appKey+"&salt="+salt+"&sign="+sign+"&ext="+ext+"&voice="+voice
            var minQ = url+params

            $.get(minQ, function(data) {
                console.log(data);
                $("#translate").val("");
                $("#translate").val(data.translation);
            }, 'jsonp');
        }
        else{
            $("#translate").val("");
        }
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
});