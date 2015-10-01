/* global d3, $, buildSummary, buildGraph, buildAverage, buildMonths */

(function () {
    'use strict';

    var processData = 
        function (file, div, callback) {
        d3.csv(file, function(error, data) {
            if (error) {
                alert(error);
            }
            else {
                callback(data, div);
            }
        });
    };

    $('.item.summary').click(function() {
        var self = $(this);
        $('.menu').find('.item').removeClass('active');
        processData('cash-game.csv', '.content', buildSummary);
        self.addClass('active');
    });

    $('.item.graph').click(function() {
        var self = $(this);
        $('.menu').find('.item').removeClass('active');
        processData('cash-game.csv', '.content', buildGraph);
        self.addClass('active');
    });

    $('.item.average').click(function() {
        var self = $(this);
        $('.menu').find('.item').removeClass('active');
        processData('cash-game.csv', '.content', buildAverage);
        self.addClass('active');
    });

    $('.item.months').click(function() {
        var self = $(this);
        $('.menu').find('.item').removeClass('active');
        processData('cash-game.csv', '.content', buildMonths);
        self.addClass('active');
    });

    processData('cash-game.csv', '.content', buildSummary);

}());
