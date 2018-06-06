'use strict';

var cloud = {
  X: 100,
  Y: 10,
  WIDTH: 420,
  HEIGHT: 270,
  COLOR: 'rgb(255, 255, 255, 1)',
  SHADOW_COLOR: 'rgba(0, 0, 0, 0.7)'
};

var fontStyle = {
  FONT: '16px PT Mono',
  COLOR: 'rgba(0, 0, 0, 1)',
  ALIGN: 'center',
  BASELINE: 'hanging'
};

var GAP = 10; // стандартный отступ

// Функция отрисовки "попапа"
var renderCloud = function (ctx, color, x, y) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, cloud.WIDTH, cloud.HEIGHT);
};

// Функция с характеристиками текста
var renderText = function (ctx, text, x, y) {
  ctx.fillStyle = fontStyle.COLOR;
  ctx.font = fontStyle.FONT;
  ctx.textAlign = fontStyle.ALIGN;
  ctx.textBaseline = fontStyle.BASELINE;
  ctx.fillText(text, x, y);
};

// Функция, возвращающая случайный синий цвет
var getRandomColor = function () {
  var randomValue = Math.floor(Math.random() * 256);
  var randomBlue = 'rgba(0, 0, ' + randomValue + ', 1)';
  return randomBlue;
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, cloud.SHADOW_COLOR, cloud.X + GAP, cloud.Y + GAP); // Тень
  renderCloud(ctx, cloud.COLOR, cloud.X, cloud.Y); // Облако

  var headerX = cloud.X + cloud.WIDTH / 2; // Середина облака
  renderText(ctx, 'Ура вы победили!', headerX, cloud.Y + GAP * 2);
  renderText(ctx, 'Список результатов:', headerX, cloud.Y + GAP * 4);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    var PLAYER_COLOR = 'rgba(255, 0, 0, 1)';
    var GRAPH_HEIGHT = 150;
    var BAR_WIDTH = 40;
    var BAR_GAP = 50;
    var barHeight = GRAPH_HEIGHT * times[i] / maxTime; // расчет высоты столбца
    var barX = cloud.X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i; // расчет Х-координаты столбца
    var barY = cloud.HEIGHT - GAP - 20; // 20 от нижнего края облака
    var pointsY = barY - barHeight - 2 * GAP; // расчет Y-координаты для вывода очков

    ctx.fillStyle = players[i] === 'Вы' ? PLAYER_COLOR : getRandomColor(); // определяем цвет столбца

    ctx.fillRect(barX, barY, BAR_WIDTH, (-1) * barHeight);
    renderText(ctx, players[i], barX + BAR_WIDTH / 2, barY + GAP); // Х-координата берется с середины столбца
    renderText(ctx, Math.ceil(times[i]), barX + BAR_WIDTH / 2, pointsY);
  }
};
