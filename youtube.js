function convert_url(){
    var url=document.getElementById('url').value;
    if(url!=null){
        var regxwww=/^(?:http|https):\/\/[a-zA-Z0-9=+_./-]+[.]+/;
        if(url.match(regxwww)){
            var regx_yutub=/^((?:http|https):\/\/(?:www|m)\.youtube\.com)\/watch\?v\=([a-zA-Z0-9]{1,15})/;
            var hasilrgx=url.match(regx_yutub);
            if(hasilrgx){
                url=hasilrgx[2];
            }
            regx_yutub=/^(?:http|https):\/\/youtu\.be\/([a-zA-Z0-9]{1,15})/;
            hasilrgx=url.match(regx_yutub);
            if(hasilrgx){
                url=hasilrgx[1];
            }
            return url;
        }else{
            alert("Incorrect URL address");
        }
    }
}
function formatEmbed(str){
    var embed='<iframe src="https://www.youtube.com/embed/'+str+'" width="480" height="360" title="Embedded Media"></iframe>';
    return embed;
}
function embedVideo(){
    var idvideo=convert_url();
    var mulaiEmbed=formatEmbed(idvideo);
	document.getElementById("hasil").value=mulaiEmbed;
}