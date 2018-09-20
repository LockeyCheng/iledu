/**
 * Created by wenjguo on 2017/10/27.
 */
var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();
function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function (xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function deepClone(obj) {
    var copy;
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;
    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }
    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = deepClone(obj[i]);
        }
        return copy;
    }
    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = deepClone(obj[attr]);
        }
        return copy;
    }
    throw new Error("Unable to copy obj! Its type isn't supported.");
}


// For group
// var allData = new Vue({
//     el: '#main-area',
//     components: {
//     },
//     data: {
//         'assistent':{},
//         'content':'',
//         'date':null,
//         'last':null,
//         'next':null,
//         'paperStatistics':{},
//         'title':''
//     },
//
//     created: function () {
//         //this.fetchConfigData();
//     },
//     mounted: function () {
//         // this.monitorTableName();
//
//     },
//     updated: function () {
//         // this.refreshRuleRelation();
//     },
//
//     watch: {
//     },
//
//     filters: {},
//
//     methods: {
//         // fetch config data and generate initial value
//         fetchConfigData: function () {
//             var xhr = new XMLHttpRequest();
//             var self = this;
//             xhr.open('GET', "../static/2018_8_17_1.json", true);
//             xhr.onload = function () {
//                 var configData = JSON.parse(xhr.responseText);
//                 console.log(configData)
//             };
//             xhr.send()
//         }
//             }
// });

function get_post_data() {
    if(!formatValidate.nonChineseCheck(alertCreate.description) || !formatValidate.nonChineseCheck(alertCreate.title)){
        alert('(Title or Description error) Only alpha with punctuation allowed!')
        return false
    }
    var postData = {
        'id': alertCreate.jobId,

        'title': alertCreate.title,
        'description': alertCreate.description,
        'tableName': alertCreate.tableName,
        'alertType': alertCreate.alertTypeSelected,
        'aggPeriod': alertCreate.aggPeriodSelected,
        'aggLevel': alertCreate.aggLevelSelected,
        'ruleList': alertCreate.ruleList,
        'emailContent': alertCreate.emailContent,
        'frequence': alertCreate.selectedEmailFrequence.value,
        'published': alertCreate.published,
        'is_active':alertCreate.is_active,
        'dayOfMonth': alertCreate.selectedEmailMonthly,
        'dayOfMonth': alertCreate.selectedEmailMonthly,
        'dayOfWeek': alertCreate.selectedEmailWeekly.value,
    };
    return postData;
}
function genWordsDiv(flag,wordInfo,wordArr){
    var assStr = ''
    for(var ass in wordInfo){
            if(!flag){
                if(wordArr.indexOf(ass) <0){
                    continue
                }
            }
           var word = wordInfo[ass]
           var wordb = 'word'+ass
            try{
              var proEn = '<li class="peg" contenteditable="true">英：'+word['pron']['peg']+'</li>'
              var proAm =  '<li class="pam" contenteditable="true">美：'+word['pron']['pam']+'</li>'
            } catch(err) {
                var proEn =  '<li class="peg" contenteditable="true">英：'+word['pro_en']+'</li>'
                var proAm = '<li class="pam" contenteditable="true">美：'+word['pro_am']+'</li>'
            }

            if(!proEn){
                var proEn =  '<li class="peg" contenteditable="true">英：</li>'
            }
            if(!proAm){
               var proAm = '<li class="pam" contenteditable="true">美：</li>'
            }
            var proStr = '<div class="panel panel-default Pronounciation"><div class="panel-heading">Pronounciation</div><ul class="table">'+proEn+proAm+'</ul></div>'
            var exStr = ''
            for(var ex in word['ex']){
               exStr+='<li class="wordEx" contenteditable="true">'+word['ex'][ex]+'</li>'
            }
            var eg2 = ''
            for(var eg in word['eg2']){
               //var ecn = word['eg2'][eg][0]+'||'+word['eg2'][eg][1]
               eg2+='<li contenteditable="true" class="wordEg2">'+word['eg2'][eg][0]+'|||'+word['eg2'][eg][1]+'</li>'
            }
            eg2 = '<div class="panel panel-default Explanation"><div class="panel-heading"><span class="btn btn-primary fa fa-plus addExample"> Example</span></div><ul class="table">'+eg2+'</ul></div>'
           var exp = '<div class="panel panel-default Explanation"><div class="panel-heading"><span class="btn btn-primary fa fa-plus addExplanation"> Explanation</span></div><ul class="table">'+exStr+'</ul></div>'
            var transStr = ''
            var simStr = ''
           if(word['st']){
               if(word['st']['transform']){
                    var trs = word['st']['transform']
                   for(var tra in trs){
                        //var tratmp = trs[tra][0]+'||'+trs[tra][1]
                        transStr+= '<li contenteditable="true" class="wordTrans">'+trs[tra][0]+':'+trs[tra][1]+'</li>'
                   }
               }

               if(word['st']['similar']){
                    simStr = '<p class="similar" contenteditable="true">'+word['st']['similar']+'</p>'
               }
           }
           if(simStr == ''){
                simStr = '<p class="similar" contenteditable="true"></p>'
           }
           var wps = ''
            if(word['wp']){
               for(var key in word['wp']){
                   wps+= '<li contenteditable="true" class="wordWps">'+key+'|||'+word['wp'][key]+'</li>'
               }
            }
            var wordsExt = ''
        if(word['ext']){
                wordsExt = word['ext']
        }
        wordsExt = '<div class="panel panel-default Explanation"><div class="panel-heading"><span class="btn btn-primary fa fa-plus addExtension"> Extension</span></div><p class="wordExt" contenteditable="true">'+wordsExt+'</p></div>'
           wps = '<div class="panel panel-default Explanation"><div class="panel-heading"><span class="btn btn-primary fa fa-plus addWordPhrase"> Word Phrase</span></div><ul class="table">'+wps+'</ul></div>'
           var simTrans = '<div class="panel panel-default Explanation"><div class="panel-heading"><span class="btn btn-primary fa fa-plus-square addTransform"> Transform</span>&nbsp;&nbsp;<span class="btn btn-primary fa fa-plus addSimilar"> Similar</span></div><ul class="table transform">'+transStr+'</ul>'+simStr+'</div>'

           assStr+='<div class="panel panel-success"><div class="panel-heading"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion-assistantt"href="#'+wordb+'"><input class="line wordoo" value="'+ass+'"></a><span class="fa fa-remove removeWord">Remove</span></h4></div><div id="'+wordb+'" class="panel-collapse collapse in"><div class="panel-body">'+exp+proStr+eg2+simTrans+wps+wordsExt+'</div></div></div>'
        }
        return assStr
}
function getWordsData(){
    var wordsInfo = {}
    $('#accordion-assistantt').find('.panel-success').each(function(x,y){
        var word = $(y).find('.wordoo').val()
        var peg = $(y).find('.peg').text()
        peg1  = peg.replace('英：','')
        peg2  = peg1.replace('英','')
        var pam = $(y).find('.pam').text()
        pam1 = pam.replace('美：','')
        pam2 = pam1.replace('美','')
        var exs = []
        $(y).find('.wordEx').each(function(z,o){
            var ee = $(o).text()
            exs.push(ee)
        })

        var wps = {}
        $(y).find('.wordWps').each(function(z,o){
            var ee = $(o).text().split('|||')
            wps[ee[0]] = ee[1]
        })
        var egs = []
        $(y).find('.wordEg2').each(function(z,o){
            var ee = $(o).text().split('|||')
            egs.push([ee[0],ee[1]])
        })
        var wordExt = $(y).find('.wordExt').text()
        var trans = []
        $(y).find('.wordTrans').each(function(z,o){
            var ee = $(o).text().split(':')
            trans.push([ee[0],ee[1]])
        })
        var similar = $(y).find('.similar').text()
        var pron = {'pam':pam2,'peg':peg2}
        var st = {'transform':trans,'similar':similar}
        wordsInfo[word] = {}
        wordsInfo[word]['pron'] = pron
        wordsInfo[word]['st'] = st
        wordsInfo[word]['ex'] = exs
        wordsInfo[word]['wp'] = wps
        wordsInfo[word]['eg2'] = egs
        wordsInfo[word]['ext'] = wordExt
    })
    return wordsInfo
}

function getContent(){
    var article = $('#articleArea').val()
    return article
}

function getStatistic(){
    var paperStatic = {}
    $('#paperStatic').find('.staticLi').each(function(x,y){
        var key = $(y).find('.label-info').text()
        var value = $(y).find('.staticVal').text()
        paperStatic[key] = value
    })
    return paperStatic
}

function getCommentPharse(){
    var ret = {}
    $('#phraseInfo').find('.panel-success').each(function(x,y){
        var title = $(y).find('.pharseTitle').text()
        ret[title]={}
        var exp = $(y).find('.exp').text()
        var analy = $(y).find('.analy').text()
        var eg2 = []
        $(y).find('.sampless').each(function(z,o){
            var ee = $(o).text().split('|||')
            eg2.push([ee[0],ee[1]])
        })
        ret[title]['analy'] = analy
        ret[title]['ex'] = exp
         ret[title]['eg2'] = eg2
    })
    return ret
}
function getCommentSentence(){
    var ret = []
    $('#sentenceInfo').find('.panel-success').each(function(x,y){
        var oo = $(y).find('.soo').text()
        var ee = $(y).find('.see').text()
        var xx = $(y).find('.sxx').text()
        ret.push([oo,ee,xx])
    })
    return ret
}
function getCommentGrammar(){
    var ret = []
    $('#grammarInfo').find('.panel-success').each(function(x,y){
        var oo = $(y).find('.soo').text()
        var ee = $(y).find('.see').text()
        var xx = $(y).find('.sxx').text()
        ret.push([oo,ee,xx])
    })
    return ret
}
function getCommentExtension(){
    var ret = []
    $('#extensionInfo').find('.panel-success').each(function(x,y){
        var oo = $(y).find('.soo').text()
        var ee = $(y).find('.see').text()
        var xx = $(y).find('.sxx').text()
        ret.push([oo,ee,xx])
    })
    return ret
}
$('#submit').click(function(){
    var data = {}
    var wordsInfo = getWordsData()
    var article = getContent()
    var paperStatistics = getStatistic()
    data['assistent'] = wordsInfo
    data['content'] = article
    data['paperStatistics'] =paperStatistics
     $('#singleInfo').find('.singleLi').each(function(x,y){
        var key = $(y).find('.label-info').text()
        var value = $(y).find('.singleVal').text()
        data[key] = value
    })
    data['comment'] = {}
    data['comment']['words'] = $('#wordsInfo').find('#commentWords').text().split(',')
    data['comment']['pharses'] = getCommentPharse()
    data['comment']['sentences'] = getCommentSentence()
    data['comment']['grammars'] = getCommentGrammar()
    data['comment']['extensions'] = getCommentExtension()
    var filename = $('#oopath').val()
    var postData = {
        'data':data,
        'file':filename
    }
    $.ajax({
            type: "POST",  //提交方式
            url: '/post_oo',//路径
            data: JSON.stringify(postData),//数据
            // data: conditions,//数据
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            success: function (response) {//返回数据根据结果进行相应的处理
                var ret = response.code
                alert(ret)
            }
            })

})
$('#loadoo').click(function(){
    var filename = $('#oopath').val()
    var postData = {'filepath':filename}
    $.ajax({
            type: "POST",  //提交方式
            url: '/get_oo',//路径
            data: JSON.stringify(postData),//数据
            // data: conditions,//数据
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            success: function (response) {//返回数据根据结果进行相应的处理
                var data = response.data
                var wordInfo = data['assistent']
                var outWordsInfo = '<p class="addWord"><span class="btn btn-primary fa fa-plus"> Add Word</span></p>'+genWordsDiv(true,wordInfo,false)

                var static = data['paperStatistics']
                var statciDiv = ''
                for(var i in static){
                    statciDiv += '<li class="staticLi" contenteditable="true"><span class="label label-info">'+i+'</span><p class="staticVal">'+static[i]+'</p></li>'
                }
                statciDiv = '<div class="panel panel-info static"><div class="panel-heading"><span class="btn btn-primary fa fa-plus"> Statistics</span></div><div class="panel-body"><ul class="table">'+statciDiv+'</ul></div></div>'

                var single = ''

                single+= '<li class="singleLi" contenteditable="true"><span class="label label-info">Date</span><p class="singleVal">'+data['Date']+'</p></li>'
                single+= '<li class="singleLi" contenteditable="true"><span class="label label-info">Last</span><p class="singleVal">'+data['Last']+'</p></li>'
                single+= '<li class="singleLi" contenteditable="true"><span class="label label-info">Next</span><p class="singleVal">'+data['Next']+'</p></li>'
                single+= '<li class="singleLi" contenteditable="true"><span class="label label-info">Title</span><p class="singleVal">'+data['Title']+'</p></li>'

                single = '<div class="panel panel-info single"><div class="panel-heading"><span class="btn btn-primary fa fa-plus"> Single</span></div><div class="panel-body"><ul class="table">'+single+'</ul></div></div>'


                $('#accordion-assistantt').html(outWordsInfo)
                $('#paperContent').html(data['content'])
                $('#articleArea').val(data['content'])
                $('#paperStatic').html(statciDiv)
                $('#singleInfo').html(single)
                try{
                    if(data['comment']['words']){
                            var words = data['comment']['words']
                            outWordsInfo = '<br/><p contenteditable="true" id="commentWords">'+words.join(',')+'</p>'+genWordsDiv(false,wordInfo,words)
                    }
                }catch (e) {
                    outWordsInfo = '<br/><p contenteditable="true" id="commentWords">'
                    console.log('no comment words',e)
                }
                //outWordsInfo = '<p class="addKeyWord"><span class="btn btn-primary fa fa-plus"> Add Word</span></p>'+outWordsInfo
                $('#wordsInfo').html(outWordsInfo)
                var resultStr1 = ''
                try{
                    if(data['comment']['pharses']){
                       for(var key in data['comment']['pharses']){
                           var ida = key.split(' ').join('_')
                           var aatmp = data['comment']['pharses'][key]
                           var ex = '<p contenteditable="true" class="exp">'+aatmp['ex']+'</p>'
                           var analy = '<p contenteditable="true" class="analy">'+aatmp['analy']+'</p>'
                           var samples = ''
                           for(var i in aatmp['eg2']){
                               samples += '<li contenteditable="true" class="sampless">'+aatmp['eg2'][i][0]+'|||'+aatmp['eg2'][i][1]+'</li>'
                           }
                       var wps = '<div class="panel panel-default Explanation"><div class="panel-heading"><span class="btn btn-primary fa fa-plus addPharsesSentences"> Sample sentences</span></div><ul class="table">'+samples+'</ul></div>'
                       resultStr1 += '<div class="panel panel-success"><div class="panel-heading"><h4 class="panel-title"><a data-toggle="collapse" class="pharseTitle" data-parent="#accordion-assistantt" contenteditable="true" href="#'+ida+'">'+key+'</a><span class="fa fa-remove">Remove</span></h4></div><div id="'+ida+'" class="panel-collapse collapse in"><div class="panel-body">'+ex+analy+wps+'</div></div></div>'
                       }

                    }
                }catch (e) {
                    console.log('can not find phrases')
                }
                $('#phraseInfo').html('<p class="addPhrase"><span class="btn btn-primary fa fa-plus"> Add Phrase</span></p>'+resultStr1)
                var resultStr1 = ''
                try{
                    if(data['comment']['sentences']){
                        var sentences = data['comment']['sentences']
                        for(var key in sentences){
                            var soo = sentences[key][0]
                            var see = '<p contenteditable="true" class="see">'+sentences[key][1]+'</p>'
                            var sxx = '<p contenteditable="true" class="sxx">'+sentences[key][2]+'</p>'
                            resultStr1 += '<div class="panel panel-success"><div class="panel-heading"><h4 class="panel-title"><a data-toggle="collapse" contenteditable="true" class="soo" data-parent="#accordion-assistantt"href="#'+ida+'">'+soo+'</a><span class="fa fa-remove removeWord">Remove</span></h4></div><div id="'+ida+'" class="panel-collapse collapse in"><div class="panel-body">'+see+sxx+'</div></div></div>'
                       }
                    }
                }catch (e) {
                    console.log('can not find sentences')
                }
                $('#sentenceInfo').html('<p class="addSentence"><span class="btn btn-primary fa fa-plus"> Add Sentence</span></p>'+resultStr1)
                var resultStr1 = ''
                try{
                    if(data['comment']['grammars']){
                        var sentences = data['comment']['grammars']
                        for(var key in sentences){
                            var soo = sentences[key][0]
                            var see = '<p contenteditable="true" class="see">'+sentences[key][1]+'</p>'
                            var sxx = '<p contenteditable="true" class="sxx">'+sentences[key][2]+'</p>'
                            resultStr1 += '<div class="panel panel-success"><div class="panel-heading"><h4 class="panel-title"><a data-toggle="collapse" contenteditable="true" class="soo" data-parent="#accordion-assistantt"href="#'+ida+'">'+soo+'</a><span class="fa fa-remove removeWord">Remove</span></h4></div><div id="'+ida+'" class="panel-collapse collapse in"><div class="panel-body">'+see+sxx+'</div></div></div>'
                       }
                    }
                }catch (e) {
                     console.log('can not find grammars')
                }
                $('#grammarInfo').html('<p class="addGrammars"><span class="btn btn-primary fa fa-plus"> Add grammars</span></p>'+resultStr1)
                var resultStr1 = ''
                try{
                    if(data['comment']['extensions']){
                        var sentences = data['comment']['extensions']
                        for(var key in sentences){
                            var soo = sentences[key][0]
                            var see = '<p contenteditable="true" class="see">'+sentences[key][1]+'</p>'
                            var sxx = '<p contenteditable="true" class="sxx">'+sentences[key][2]+'</p>'
                            resultStr1 += '<div class="panel panel-success"><div class="panel-heading"><h4 class="panel-title"><a data-toggle="collapse" contenteditable="true" class="soo" data-parent="#accordion-assistantt"href="#'+ida+'">'+soo+'</a><span class="fa fa-remove removeWord">Remove</span></h4></div><div id="'+ida+'" class="panel-collapse collapse in"><div class="panel-body">'+see+sxx+'</div></div></div>'
                       }
                    }
                }catch (e) {
                    console.log('can not find extensions')
                }
                $('#extensionInfo').html('<p class="addExtensions"><span class="btn btn-primary fa fa-plus"> Add Extensions</span></p>'+resultStr1)
               // allData.assistent= data['assistent']
               // allData.content= data['content']
               // allData.date= data['date']
               // allData.last= data['last']
               // allData.next= data['next']
               // allData.paperStatistics= data['paperStatistics']
               // allData.title= data['title']
               // console.log(allData)
            }
        });
})
$('body').on('click','.addKeyWord',function(){

})
$('#main-area').on('click','.fa-remove',function(){
    $(this).parent().parent().parent().remove()
})

$('body').on('click','.addPhrase',function(){
    $(this).after('<div class="panel panel-success"><div class="panel-heading"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion-assistantt" href="#" class="pharseTitle" contenteditable="true">aa</a></h4></div><div class="panel-collapse collapse in"><div class="panel-body"><p contenteditable="true" class="exp">a</p><p contenteditable="true" class="analy">b</p><div class="panel panel-default Explanation"><div class="panel-heading"><span class="btn btn-primary fa fa-plus addPharsesSentences"> Sample sentences</span></div><ul class="table"></ul></div></div></div></div>')
})
$('body').on('click','.addSentence',function(){
    $(this).after('<div class="panel panel-success"><div class="panel-heading"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion-assistantt" href="#" contenteditable="true" class="soo">aaa</a></h4></div><div class="panel-collapse collapse in"><div class="panel-body"><p contenteditable="true" class="see">aa</p><p contenteditable="true" class="sxx">bb</p></div></div></div>')
})
$('body').on('click','.addExtensions',function(){
$(this).after('<div class="panel panel-success"><div class="panel-heading"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion-assistantt" href="#" class="collapsed soo" aria-expanded="false" contenteditable="true">a</a></h4></div><div class="panel-collapse collapse in"><div class="panel-body"><p contenteditable="true" class="see">a</p><p contenteditable="true" class="sxx">b</p></div></div></div>')
})
$('body').on('click','.addGrammars',function() {
    $(this).after('<div class="panel panel-success"><div class="panel-heading"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion-assistantt" href="#" class="soo" contenteditable="true">a</a></h4></div><div class="panel-collapse collapse in"><div class="panel-body"><p contenteditable="true" class="see">a</p><p contenteditable="true" class="sxx">b</p></div></div></div>')
})
$('body').on('click','.addPharsesSentences',function(){
    $(this).parent().next('ul').append('<li contenteditable="true" class="sampless"></li>')
})
$('body').on('click','.addExplanation',function(){
    $(this).parent().next('ul').append('<li class="wordEx" contenteditable="true"></li>')
})
$('body').on('click','.addExample',function(){
    $(this).parent().next('ul').append('<li contenteditable="true" class="wordEg2"></li>')
})
$('body').on('click','.addWordPhrase',function(){
    $(this).parent().next('ul').append('<li contenteditable="true" class="wordWps"></li>')
})
$('body').on('click','.addTransform',function(){
    $(this).parent().next('ul.transform').append('<li contenteditable="true" class="wordTrans"></li>')
})
$('body').on('click','.addWord',function(){
    var proEn = '<li class="peg" contenteditable="true">英： </li>'
    var proAm =  '<li class="pam" contenteditable="true">美： </li>'
    var proStr = '<div class="panel panel-default Pronounciation"><div class="panel-heading">Pronounciation</div><ul class="table">'+proEn+proAm+'</ul></div>'
    var wordsExt = '<div class="panel panel-default Explanation"><div class="panel-heading"><span class="btn btn-primary fa fa-plus addExtension"> Extension</span></div><p class="wordExt" contenteditable="true"></p></div>'
     var eg2 = '<div class="panel panel-default Example"><div class="panel-heading"><span class="btn btn-primary fa fa-plus addExample"> Example</span></div><ul class="table"></ul></div>'
     var exp = '<div class="panel panel-default Explanation"><div class="panel-heading"><span class="btn btn-primary fa fa-plus addExplanation"> Explanation</span></div><ul class="table"></ul></div>'
     var wps = '<div class="panel panel-default WordPhrase"><div class="panel-heading"><span class="btn btn-primary fa fa-plus addWordPhrase"> Word Phrase</span></div><ul class="table"></ul></div>'
     var simTrans = '<div class="panel panel-default Transform"><div class="panel-heading"><span class="btn btn-primary fa fa-plus-square addTransform"> Transform</span>&nbsp;&nbsp;<span class="btn btn-primary fa fa-plus addSimilar"> Similar</span></div><ul class="table transform"></ul>'+'<p class="similar" contenteditable="true"></p>'+'</div>'
     var assStr = '<div class="panel panel-success"><div class="panel-heading"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion-assistantt"href="#"><input class="line wordoo" value="a"></a></h4></div><div class="panel-collapse collapse in"><div class="panel-body">'+exp+proStr+eg2+simTrans+wps+wordsExt+'</div></div></div>'
    $(this).after(assStr)
})
$('#butSubmit').on('click', function () {
    if (check_fields()) {
        var postData = get_post_data();
        if(!postData){
            return false
        }
        if (postData['emailContent']) {
            var chart_column_arr = []
            $('#chartDimesionsChoosed').find('span').each(function (trindex, tritem) {
                var spanValue = $(tritem).text()
                chart_column_arr.push(spanValue)
            })
            var echartQuery = {
                title: alertCreate.title,
                table: alertCreate.tableName,
                //rules: alertCreate.ruleList,
                column: alertCreate.selectedDataSummaryDimension.value,
                chart_column: chart_column_arr
            }

            postData['echartQuery'] = echartQuery
        }
        $('#loading-bear-img').fadeIn(123)
        $.ajax({
            type: "POST",  //提交方式
            url: '../alert_create_submit',//路径
            data: JSON.stringify(postData),//数据
            // data: conditions,//数据
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            success: function (response) {//返回数据根据结果进行相应的处理
                $('#loading-bear-img').fadeOut(1024)
                if (response.result == 'Success') {
                    $('#successAlertText').html('<strong>SUCCESS!</strong>  ' + response.message);
                    $('#successAlertText').show();
                    setTimeout(window.location.href = "/library_my", 1600)
                }
                else if (response.result == 'Error') {
                    $('#dangerAlertText').html('<strong>ERROR!</strong>  ' + response.message);
                    $('#dangerAlertText').show();
                }
            }
        });
    }
});