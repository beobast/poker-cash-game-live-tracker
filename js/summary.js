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

            /** http://forumserver.twoplustwo.com/showpost.php?p=12923088&postcount=4 */

            var bbPer100 = d3.round(100*bbWon/(handsPerHour*totalHours), 2);
            var stdTotal = 0;

            data.forEach(function (d) {
                if (d.session !== "0") {
                    var Xi = d3.round(d.winnings/d.bb, 2);
                    var µ = bbPer100;
                    var Ti = d3.round(handsPerHour*d.duration/100, 2);
                    stdTotal += d3.round((d3.round(Math.pow(d3.round(Xi - µ*Ti, 2), 2), 2) / Ti), 2);
                }
            });

            var std = d3.round(Math.sqrt(d3.round(stdTotal/sessions, 2)), 2);

            html += '<table class="ui collapsing table"><thead><tr><th colspan="2">Summary</th></tr></thead><tbody>';
            html += '<tr><td>Earnings</td><td>' + totalEarnings + ' €</td></tr>';
            html += '<tr><td>Winrate</td><td>' + bbPer100 + ' bb / 100 hands</td></tr>';
            html += '<tr><td>Winrate</td><td>' + d3.round(totalEarnings/totalHours, 2) + ' € / h</td></tr>';
            html += '<tr><td>Winrate</td><td>' + d3.round(totalEarnings/sessions, 2) + ' € / session</td></tr>';
            html += '<tr><td>Hours</td><td>' + totalHours + '</td></tr>';
            html += '<tr><td>Standard Deviation</td><td>' + std + ' bb / 100 hands</td></tr>';
            html += '<tr><td>Hands</td><td>' + handsPerHour*totalHours+ '</td></tr>';
            html += '<tr><td>Sessions</td><td>' + sessions + '</td></tr>';
            html += '<tr><td>Average duration</td><td>' + d3.round(totalHours/sessions, 2)+ ' h</td></tr>';
            html += '<tr><td>Winnings Sessions</td><td>' + winningSessions + ' / ' + sessions +  ' (' + 100*d3.round(winningSessions/sessions, 2) + ' %) - Average: ' + d3.round(totalWins/winningSessions, 2) + ' €</td></tr>';
            html += '<tr><td>Losing Sessions</td><td>' + losingSessions + ' / ' + sessions + ' (' + 100*d3.round(losingSessions/sessions, 2) + ' %) - Average: ' + d3.round(totalLosses/losingSessions, 2) + ' €</td></tr>';
            html += '</tbody></table>';

            $(div).empty().append(html);
        };
            
}());
