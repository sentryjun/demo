var chart = null;
$(function makegragh(){
            chart = Highcharts.chart('container',{
                chart : {
                    style :{
                        fontFamily: "Microsoft YaHei,'宋体' , Tahoma, Helvetica, Arial, '\5b8b\4f53', sans-serif",
                    },
                    type : "bubble",
                    zoomType:'yx',
                },
                credits : {
                    enabled:false,
                },
                title:{
                    text:'中国的关联词云',
                },
                xAxis : {
                    startOnTick:true,
                    endOnTick:true,
                    lineWidth:2,
                    gridWidth : 1,
                    title : {
                        text : '时间',
                    },
                    labels: {
                        format : '{value}',
                    },
                    plotLines:[{
                        colors:'black',
                        width : 2,
                    }]
                },
                yAxis : {
                    startOnTick:true,
                    endOnTick:true,
                    gridWidth : 1,
                    lineWidth : 2,
                    floor : 0,
                    title:{
                        text:'平均距离'
                    },
                    labels: {
                        format: '{value}'
                    },
                    plotLines:[{
                        colors:'black',
                        width : 2,
                    }]
                },
                tooltip : {
                useHTML: true,
                headerFormat: '<table>',
                pointFormat:'<tr><th colspan="2"><h3>{point.name}</h3></th></tr>' +
                '<tr><th>时间:</th><td>{point.x}</td></tr>' +
                '<tr><th>平均距离:</th><td>{point.y}</td></tr>' +
                '<tr><th>共现次数:</th><td>{point.z}</td></tr>',
                footerFormat: '</table>',
                followPointer:true,
            },
            plotOptions : {
                series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.name}',
                    style: {
                    fontWeight: 'bold',
                    fontSize: '16px',
                    textOutline: "0px 0px contrast"
                }
                }
            }
            },
            series : [
                {
                name: '中国的关联词云',
                data:[
                    {x:2015, y: 50, z: 100, name:'人民'},
                    {x:2016, y: 100, z:500, name:'政府'},
                    {x:2002, y: 11, z:512, name:'我的'},
                    {x:1994, y: 100, z: 152, name:'test'},
                    {x:1998, y: 150, z: 52, name:'我们'},
                    {x:2001, y:154, z:15,name:'北京'},
                    {x:2005, y: 252, z:75, name:'大学'},
                    {x:2007, y: 300, z:85, name:'abc'},
                    {x:2008, y: 152, z: 1000, name:'bcd'},
                ]
            }],
        })
})
var array =null

//$("#search").submit(function(){
$("#btn").click(function(){
    var index=$("#index").val();
    if (index=="")
    {
        alert("无效的输入");
        return false;
    }
    else
    {
        $.ajax({
            type:"get",
            url:"http://test.com",
            dataType:"json",
            data:index,
            success:function(datas)
            {
                //alert(datas);
                chart = Highcharts.chart('container',{
                    chart : {
                        style :{
                            fontFamily: "Microsoft YaHei,'宋体' , Tahoma, Helvetica, Arial, '\5b8b\4f53', sans-serif",
                        },
                        type : "bubble",
                        zoomType:'yx',
                    },
                    credits : {
                        enabled:false,
                    },
                    title:{
                        text:index+'的关联词云',
                    },
                    xAxis : {
                        startOnTick:true,
                        endOnTick:true,
                        lineWidth:2,
                        gridWidth : 1,
                        title : {
                            text : '时间',
                        },
                        labels: {
                            format : '{value}',
                        },
                        plotLines:[{
                            colors:'black',
                            width : 2,
                        }]
                    },
                    yAxis : {
                        startOnTick:true,
                        endOnTick:true,
                        gridWidth : 1,
                        lineWidth : 2,
                        floor : 0,
                        title:{
                            text:'平均距离'
                        },
                        labels: {
                            format: '{value}'
                        },
                        plotLines:[{
                            colors:'black',
                            width : 2,
                        }]
                    },
                    tooltip : {
                    useHTML: true,
                    headerFormat: '<table>',
                    pointFormat:'<tr><th colspan="2"><h3>{point.name}</h3></th></tr>' +
                    '<tr><th>时间:</th><td>{point.x}</td></tr>' +
                    '<tr><th>平均距离:</th><td>{point.y}</td></tr>' +
                    '<tr><th>共现次数:</th><td>{point.z}</td></tr>',
                    footerFormat: '</table>',
                    followPointer:true,
                },
                plotOptions : {
                    series: {
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}',
                        style: {
                        fontWeight: 'bold',
                        fontSize: '16px',
                        textOutline: "0px 0px contrast"
                    }
                    }
                }
                },
                series : [
                    {
                    name: index+'的关联词云',
                    data:datas.data,
                }],
            })
            }
        })
        //return false;
    }
})

