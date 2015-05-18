/* global buildSummary:true, d3 */

buildSummary = null;

(function () {
    'use strict';

    buildSummary = 
        function (data, div) {

            var html = '';
            var handsPerHour = 25;
            var totalEarnings = 0;
            var totalHours = 0;
            var sessions = 0;
            var winningSessions = 0;
            var losingSessions = 0;
            var totalWins = 0;
            var totalLosses = 0;
            var bbWon = 0;

            data.forEach(function(d) {
                d.value = +d.winnings;
                totalEarnings += d.value;
                totalHours += +d.duration;
                sessions = d.session;
                d.total = totalEarnings;
                bbWon += d3.round(d.value/d.bb, 2);
                if (d.value > 0) {
                    winningSessions += 1;
                    totalWins += d.value;
                }
                else if (d.value < 0) {
                    losingSessions += 1;
                    totalLosses += d.value;
                }
            });

            html += '<table class="ui collapsing table"><thead><tr><th colspan="2">Summary</th></tr></thead><tbody>';
            html += '<tr><td>Earnings</td><td>' + totalEarnings + ' €</td></tr>';
            html += '<tr><td>Winrate</td><td>' + Math.round((100*bbWon)/(handsPerHour*totalHours))+ ' bb/100</td></tr>';
            html += '<tr><td>Hours</td><td>' + totalHours + '</td></tr>';
            html += '<tr><td>Hands</td><td>' + handsPerHour*totalHours+ '</td></tr>';
            html += '<tr><td>Sessions</td><td>' + sessions + '</td></tr>';
            html += '<tr><td>Average duration</td><td>' + Math.round(100*totalHours/sessions)/100+ ' H</td></tr>';
            html += '<tr><td>Winnings Sessions</td><td>' + winningSessions + ' (' + Math.round(100*winningSessions/sessions) + ' %)</td></tr>';
            html += '<tr><td>Losing Sessions</td><td>' + losingSessions + ' (' + Math.round(100*losingSessions/sessions) + ' %)</td></tr>';
            html += '</tbody></table>';

            div.empty().append(html);
        };
            
}());
