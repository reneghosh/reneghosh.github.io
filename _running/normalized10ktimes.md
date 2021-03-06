---
keywords: running, René Ghosh
date: 2018-09-25 21:00:00 +0200
layout: article
title: My normalized 10k running times
---
# Normalized 10k times

_René Ghosh, {{page.date | date: "%a, %b %d, %y" }}_

I've taken all my runs and plotted the normalized 10k time using the Riegel correction.

I won't pretend that this chart will interest anyone else in the world except me, but I have had fun 
extracting my data to a flat csv file and using the jekyll data access plugin to load the data in a page
and chart it with chart.js.

<script src="../js/Chart.bundle.min.js"></script>
<style>
#myChart {
	width: 800px;
	height: 700px;
	max-width: 800px;
}
</style>
<canvas id="myChart" width="800" height="400"></canvas>
<script>
var runs = [ {% for run in site.data.runs %}  { time: "{{run.Temps}}", date: "{{ run.Date }}", distance: {{ run.Distance | replace: ',' , '.' }},},{% endfor %} ];


var runs_speed = [];

for (var i=0;i<runs.length;i++){
	var time_str = runs[i].time;
	var date_str = runs[i].date;
	var date_atoms = date_str.split("/");
	var time_atoms = time_str.split(":");
	var years = parseInt(date_atoms[2]);
	var months = parseInt(date_atoms[1]);
	var days = parseInt(date_atoms[0]);
	var hours = parseInt(time_atoms[0]);
	var minutes = parseInt(time_atoms[1]);
	var seconds = parseInt(time_atoms[2]);
	var distance = parseFloat(runs[i].distance);
	var time_seconds = ((hours*3600.0)+(minutes*60.0)+seconds)/3600.0;
	var speed = distance/time_seconds;
	var base = 10.0 // 10k
    var runDate = new Date(years, months-1, days-1);
    var lastYear = new Date(new Date().getTime()-365*24*3600*1000);
	normalized_time = time_seconds*Math.pow(base/distance, 1.06);
	normalized_speed = base/normalized_time;
    if (runDate.getTime() > lastYear.getTime()) {
	   runs_speed.push({x:runDate,y:normalized_time}); 
    }
}

function formatSecsAsMins(v){
	var normalized_time = v; //hours
	normalized_time *= 3600.0;
	normalized_hours = Math.trunc(normalized_time/3600.0);
	normalized_time = normalized_time - normalized_hours*3600.0;
	normalized_minutes = Math.trunc(normalized_time/60.0);
	normalized_time = normalized_time - normalized_minutes*60.0;
	normalized_seconds = Math.trunc(normalized_time);
	normalized_hours = ""+normalized_hours;
	normalized_minutes = ""+normalized_minutes;
	if (normalized_hours.length == 1){
		normalized_hours = "0"+normalized_hours;
	}
	if (normalized_minutes.length == 1){
		normalized_minutes = "0"+normalized_minutes;
	}
	return normalized_hours+":"+normalized_minutes
}
/*console.log(runs_speed);*/
var ctx = document.getElementById('myChart');
var chart = new Chart(ctx, {
    type: 'scatter',
    data: {
        datasets: [{
        	fill: false,
        	showLine: true,
        	lineTension: 0.3,
        	cubicInterpolationMode: "linear",
            backgroundColor: 'rgb(190, 190, 190)',
            borderColor: 'rgb(50, 50, 50)',
            borderWidth: 2,
            data: runs_speed
        }]
    },

    // Configuration options go here
    options: {
    	title: {
    		display: true,
    		text: "Normalized 10k time for all runs over the last 365 days"
    	},
    	legend: {
    		display: false,
    	},
    	elements: { point: { radius: 4 } },
    	scales: {
            xAxes: [{
                type: 'time',
                time: {
                    displayFormats: {
                        quarter: 'YYYY'
                    }
                }
            }],
            yAxes: [{
                ticks:{
                    callback:(v)=>this.formatSecsAsMins(v),
                }
            }],
        }
    }
});
</script>
