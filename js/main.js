/*init datas*/
var chart = null;
var data = [
    {x: 2015, y: 50, z: 100, name: '人民'},
    {x: 2016, y: 100, z: 500, name: '政府'},
    {x: 2002, y: 11, z: 512, name: '我的'},
    {x: 1994, y: 100, z: 152, name: 'test'},
    {x: 1998, y: 150, z: 52, name: '我们'},
    {x: 2001, y: 154, z: 15, name: '北京'},
    {x: 2005, y: 252, z: 75, name: '大学'},
    {x: 2007, y: 300, z: 85, name: 'abc'},
    {x: 2008, y: 152, z: 1000, name: 'bcd'},
];
var input = "中国";

/*make init chart*/
$(function makegragh() {
    chart = {
        chart: {
            style: {
                fontFamily: "Microsoft YaHei,'宋体' , Tahoma, Helvetica, Arial, '\5b8b\4f53', sans-serif",
            },
            type: "bubble",
            zoomType: 'yx',
            renderTo: 'container'
        },
        credits: {
            enabled: false,
        },
        title: {
            text: '\"' + input + '\"的关联词云',
        },
        xAxis: {
            startOnTick: true,
            endOnTick: true,
            lineWidth: 2,
            gridWidth: 1,
            title: {
                text: '时间',
            },
            labels: {
                format: '{value}',
            },
            plotLines: [{
                colors: 'black',
                width: 2,
            }]
        },
        yAxis: {
            startOnTick: true,
            endOnTick: true,
            gridWidth: 1,
            lineWidth: 2,
            floor: 0,
            title: {
                text: '平均距离'
            },
            labels: {
                format: '{value}'
            },
            plotLines: [{
                colors: 'black',
                width: 2,
            }]
        },
        tooltip: {
            useHTML: true,
            headerFormat: '<table>',
            pointFormat: '<tr><th colspan="2"><h3>{point.name}</h3></th></tr>' +
            '<tr><th>时间:</th><td>{point.x}</td></tr>' +
            '<tr><th>平均距离:</th><td>{point.y}</td></tr>' +
            '<tr><th>共现次数:</th><td>{point.z}</td></tr>',
            footerFormat: '</table>',
            followPointer: true,
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.name}',
                    style: {
                        fontWeight: 'normal',
                        fontSize: '12px',
                        textOutline: "0px 0px contrast",
                        color: 'black'
                    }
                },
                colorByPoint: true
            }
        },
        series: [
            {
                name: '\"' + input + '\"的关联词云',
                data: data,
            }],
    };
    Highcharts.chart('container', chart);

    /*$('#bigger').on('mousedown', function () {
        $("#container").toggleClass('cmodal');
        //$('#c-container').toggleClass('cmodal');
        //chart.redraw()
        chart.reflow();
    });*/
});


/*form submit*/
$("#search").submit(function () {
    input = $("#input").val();

    if (input == "") {
        alert("无效的输入！");
    }
    else {
        $.ajax({
            type: "get",
            url: "test.php",
            dataType: "json",
            data: {"input": input},
            success: function (datas) {
                chart.series[0].data = datas.data;
                chart.series[0].name = '\"' + input + '\"的关联词云';
                chart.title.text = '\"' + input + '\"的关联词云';
                Highcharts.chart("container", chart);
            }
        })
    }
    return false;
});

/* search tips*/
/*jsonResult为返回值 为一个小于等于8 的Json数组，有两个属性id（编号0、1、2、3……）和name（即提示词）
 *
 *      e.g.
 *          [
 *          {"id":1, "name":tip1},
 *          {"id":2, "name":tip2}
 *          ]
 *
 * */
var $input = $(".typeahead");
$input.typeahead({
    source: function (query, process) {
        return $.ajax({
            url: "test1.php",
            type: 'post',
            data: {query: query},
            dataType: 'json',
            success: function (jsonResult) {
                return typeof jsonResult == 'undefined' ? false : process(jsonResult.data);
            }
        })
    },

    //autoSelect: true,
    delay: 250
});

$('#myModal').on('shown.bs.modal', function () {
    chart.plotOptions.series.dataLabels.style.fontSize = "16px";
    Highcharts.chart("container2", chart);
    chart.plotOptions.series.dataLabels.style.fontSize = "12px";
});
$('#myModal').on('hide.bs.modal', function () {
    $('#container2').highcharts().destroy();
});