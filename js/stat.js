'use strict';
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;

// Функция отрисовки "попапа"
var renderCloud = function(ctx, color, x, y) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// Функция с характеристиками текста
var renderText = function(ctx, text, x, y) {
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.textAlign = "center";
  ctx.fillText(text, x, y);
};

// Функция отрисовки столбца
var renderBar = function(ctx, color, x, y) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, BAR_WIDTH, barHeight);
}

// Функция, возвращающая случайный синий цвет
var getRandomColor = function () {
  var randomValue = Math.floor(Math.random() * 256);
  var randomBlue = 'rgba(0, 0, ' + randomValue + ', 1)';
  return randomBlue;
};

var getMaxElement = function(arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function(ctx, players, times) {
  renderCloud(ctx, 'rgba(0, 0, 0, 0.7)', CLOUD_X + GAP, CLOUD_Y + GAP); // Тень
  renderCloud(ctx, '#fff', CLOUD_X, CLOUD_Y); // Облако

  var headerX = CLOUD_X + CLOUD_WIDTH / 2; // Середина облака
  renderText(ctx, 'Ура вы победили!', headerX, CLOUD_Y + GAP*2);
  renderText(ctx, 'Список результатов:', headerX, CLOUD_Y + GAP*4);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = players[i] == 'Вы' ? 'rgba(255, 0, 0, 1)' : getRandomColor();  // определяем цвет столбца

    var GRAPH_HEIGHT = 150;
  var BAR_WIDTH = 40;
  var BAR_GAP = 50;
  var barHeight = GRAPH_HEIGHT * times[i] / maxTime; // расчет высоты столбца
  var barX = CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i; // расчет Х-координаты столбца
  var barY = CLOUD_HEIGHT - GAP - 20; // 20 от нижнего края облака
  var pointsY = barY - barHeight - 2*GAP; // расчет Y-координаты для вывода очков

    ctx.fillRect(barX, barY, BAR_WIDTH, (-1) * barHeight);
    renderText(ctx, players[i], barX + BAR_WIDTH / 2, barY + GAP); // Х-координата берется с середины столбца
    renderText(ctx, Math.ceil(times[i]), barX + BAR_WIDTH / 2, pointsY); //
  }
};
