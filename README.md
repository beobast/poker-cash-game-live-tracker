poker-cash-game-live-tracker
============================

## Problem

How to track your live poker cash game sessions ?

## Solution

After each session, remember :
- date
- session duration (hours)
- winnings
- blinds level

Then edit `cash-game.csv` file and add a new line :
```
<number>,<date>,<duration>,<big-blind>,<winnings>
``` 

Example :
```
session,date,duration,winnings
0,00/00/00,0.0,0
1,21/07/14,2,2,210
2,28/07/14,2.5,2,100
3,29/07/14,3,2,40
4,30/07/14,2,2,320
5,31/07/14,2.5,2,-85
6,05/08/14,2.5,2,300
7,06/08/14,3.5,2,-280
```

On July 31st, I played my 5th session at blinds 1/2 and I lost 85€ in 2 hours and a half.

Open `tracker.html` to see your stats.
