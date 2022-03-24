//  HTMLより要素の取得
const record = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop")
const resetButton = document.getElementById("reset");

//  デフォルトでのボタン入力制御
stopButton.disabled = true;
resetButton.disabled = true;

//  必須変数
let added;  //追加時間,startButtonで呼び出す為グローバル関数に
let elapsed = 0;  //経過時間,resetButtonで呼び出す為グローバル関数に
let stop;  //setIntervalのID格納

// 時間を測る関数 count()
function count() {
	let start = new Date().getTime();  //時刻の経過をミリ秒単位で取得
	stop = setInterval(function() { 
		added = new Date().getTime() - start + elapsed;  //addedを足さないとstopしたところから計測できない
		const milli = added % 1000;
		const second = Math.trunc(added / 1000) % 60;  //%60をしないと累積し続ける
		const minuite = Math.trunc(added / (1000 * 60)) % 60;
		const hour = Math.trunc(added / (1000 * 60 * 60)) % 60;
		const ms = milli.toString().padStart(3, "0");  //文字列変換＆0埋め
		const s = second.toString().padStart(2, "0");
		const m = minuite.toString().padStart(2, "0");
		const h = hour.toString().padStart(2, "0");
		record.textContent = h + ":" + m + ":" + s + "." + ms;  //計測時間の表示
  }, 10);
}

// start押下時の動作
startButton.addEventListener("click", function() {
	added = 0;
	count();
	startButton.disabled = true;
	stopButton.disabled = false;
	resetButton.disabled = false;
});

// stop押下時の動作
stopButton.addEventListener("click", function() {
	clearInterval(stop);
	elapsed = added;
	startButton.disabled = false;
	stopButton.disabled = true;
	resetButton.disabled = false;
});

// reset押下時の動作
resetButton.addEventListener("click", function() {
	elapsed = 0;  //経過時間のリセット
	clearInterval(stop);
	record.textContent = "00:00:00.000";
	startButton.disabled = false;
	stopButton.disabled = true;
	resetButton.disabled = true;
});