

const Vars = {

	state: 0,
	states: {
		title:			0,
		shuffle: 		1,
		partition:		2,
		partitionloop:	3,
	},


	step: 0,
	steps: [
		{
			name: "Перемешаем массив",
		},
		{
			name: <span>Выберем <b>опорный</b> элемент</span>,
		},
		{
			name: "Переместим все элементы меньше оборного влево от него, а те что больше вправо",
		},
		{
			name: "Поделим оставшиеся элементы на 2 части и повторим все с ними",
		}
	],

	slide: {
		subtitle: "Перемешаем массив"
	},
	
	srcBuffer: [0,1,2,3,4,5,6,7,8],
	shuffleBuffer: [],
	sortParts: [],
	renderSlide: () => {},

	style: {
		size: 7
	},
	

	nums: {},
};

window["Vars"] = Vars;

class Num {

	constructor(props) {
		this.className = "";
		this.visible = true;
		for (let key of Object.keys(props)) {
			this[key] = props[key];
		}
		Vars.nums[this.id] = this;
	}


	setXIndex(index) {
		this.box.x = Vars.style.size*1.2*(.5+index-Vars.srcBuffer.length/2);
		// this.render();
	}
}


for (var i = 0; i < Vars.srcBuffer.length; i++) {
	let value = Vars.srcBuffer[i];
	new Num({
		id:i, 
		buffer:"src", 
		value:value+1, 
		box:{x:Vars.style.size*1.2*(.5+i-Vars.srcBuffer.length/2),y:0,w:Vars.style.size,h:Vars.style.size},
		style: {
			animationDelay: `${i/Vars.srcBuffer.length/2}s`,
		}
	});
}

let eLowIndex = new Num({
	visible: false,
	id:"lowindex", 
	buffer:"tools", 
	value:"^", 
	className: "lowindex",
	box:{x:0,y:Vars.style.size*1.2,w:Vars.style.size,h:Vars.style.size},
	style: {
		animationDelay: `${i/Vars.srcBuffer.length/2}s`,
	}
});

let eLowIndexName = new Num({
	visible: false,
	id:"lowindex-name", 
	buffer:"tools", 
	value:"low", 
	className: "lowindex-name",
	box:eLowIndex.box,
	style: {
		animationDelay: `${i/Vars.srcBuffer.length/2}s`,
	}
});

let eIndex = new Num({
	visible: false,
	id:"index", 
	buffer:"tools", 
	value:"^", 
	className: "index",
	box:{x:0,y:-Vars.style.size*1.2,w:Vars.style.size,h:Vars.style.size},
	style: {
		animationDelay: `${i/Vars.srcBuffer.length/2}s`,
	}
});
let eIndexName = new Num({
	visible: false,
	id:"index-name", 
	buffer:"tools", 
	value:"i", 
	className: "index-name",
	box:eIndex.box,
	style: {
		animationDelay: `${i/Vars.srcBuffer.length/2}s`,
	}
});

console.log('inited');

const swapNums = (i,j,delay=50) => {
    let temp = Vars.buffer[i];
    Vars.buffer[i] = Vars.buffer[j];
    Vars.buffer[j] = temp;

	let num1 = Vars.nums[Vars.buffer[i]];
	let num2 = Vars.nums[Vars.buffer[j]];

	num1.box.y += num1.box.h;
	num2.box.y -= num2.box.h;
	num1.render();
	num2.render();
	
	setTimeout(() => {
		let tmp1 = num1.box.x;
		num1.box.x = num2.box.x;
		num2.box.x = tmp1;
		num1.render();
		num2.render();
		setTimeout(() => {
			num1.box.y -= num1.box.h;
			num2.box.y += num2.box.h;
			num1.render();
			num2.render();
		}, delay);
	}, delay);
}

window.addEventListener("keydown", e => {
	if(e.key != 'Enter') return;
	Vars.state++;
	
	console.log(Vars.state);
	if(Vars.state == Vars.states.shuffle) {
		// Vars.slide.subtitle = "Выберем отрезок массива и ведущий элемент,\nустановим индекс (low) в начало";
		Vars.step = Vars.state;
		Vars.renderSlide();
		Vars.buffer = [];
		Vars.sorted = [];
		for (var i = 0; i < Vars.srcBuffer.length; i++) {
			Vars.buffer.push(Vars.srcBuffer[i]);
			Vars.sorted.push(false);
		}
		let delay = 1;
    	for (var it = Vars.buffer.length - 1; it >= 0; it--) {
			const i = it;
			setTimeout(() => {
    	    	var j = Math.floor(Math.random() * (i + 1));
				swapNums(i,j,25);
			}, 50*delay);
			delay++;
    	}
		setTimeout(() => {
			for (var i = 0; i < Vars.srcBuffer.length; i++) {
				Vars.nums[i].box.y += Vars.nums[i].box.h*2;
				Vars.nums[i].render();
			}
			Vars.renderSlide();

			Vars.sortParts = [{
				low: 0,
				high: Vars.srcBuffer.length-1,
			}];

		}, delay*100);
	}

	if(Vars.state == Vars.states.partition) {

		let sp = Vars.sortParts.shift();
		Vars.low = sp.low;
		Vars.lowindex = sp.low-1;
		Vars.high = sp.high;

		if(Vars.low == 0 && Vars.high == Vars.srcBuffer.length-1) Vars.step = Vars.state; 
			else Vars.step = 3;

		Vars.renderSlide();

		for (var i = Vars.low; i <= Vars.high; i++) {
			let num = Vars.nums[Vars.buffer[i]];
			num.box.y -= num.box.h*2;
			num.render();
		}
		
		Vars.slide.subtitle = "Переместим в начало каждый элемент мешьший ведущего";
		Vars.renderSlide();
		Vars.pivot = Vars.high;

		let ePivot = Vars.nums[Vars.buffer[Vars.high]];
		ePivot.className = "pivot";

		eLowIndex.visible = true;
		eLowIndexName.visible = true;

		eLowIndex.setXIndex(Vars.lowindex+1);
		eLowIndexName.setXIndex(Vars.lowindex+1);
		eLowIndex.render();
		eLowIndexName.render();
	}
	if(Vars.state == Vars.states.partitionloop) {
		Vars.step = Vars.state;
		Vars.renderSlide();
		let delay = 0;
		eIndex.visible = true;
		eIndexName.visible = true;
		for (let jj = Vars.low; jj <= Vars.high - 1; jj++) {
			const j = jj;
			setTimeout(() => {
            	eIndex.setXIndex(j);
            	eIndex.render();
            	eIndexName.setXIndex(j);
            	eIndexName.render();
            	if (Vars.buffer[j] < Vars.buffer[Vars.pivot]) {
					Vars.lowindex++;
					console.log('swap');

					let numj = Vars.nums[Vars.buffer[j]];
					let nump = Vars.nums[Vars.buffer[Vars.pivot]];

					numj.box.y += numj.box.h;
					nump.box.y += nump.box.h;
					numj.render();
					nump.render();

					setTimeout(() => {
						numj.box.y -= numj.box.h;
						nump.box.y -= nump.box.h;
						nump.render();
						setTimeout(() => {
							eLowIndex.setXIndex(Vars.lowindex+1);
							eLowIndexName.setXIndex(Vars.lowindex+1);
							eLowIndex.render();
							eLowIndexName.render();
							setTimeout(() => {
								swapNums(Vars.lowindex,j,100);
							}, 100);
						}, 100);
					}, 200);
				}
        	}, delay);
            if (Vars.buffer[j] < Vars.buffer[Vars.pivot]) {
        		delay+=1200;
        	} else {
        		delay+=500;
        	}
        }
		setTimeout(() => {
            eIndex.setXIndex(Vars.pivot);
            eIndex.render();
            eIndexName.setXIndex(Vars.pivot);
            eIndexName.render();
			setTimeout(() => {
				swapNums(Vars.lowindex+1,Vars.high);
				Vars.sorted[Vars.lowindex+1] = true;
				setTimeout(() => {
					let num = Vars.nums[Vars.buffer[Vars.lowindex+1]];
					num.className = "disabled";

					eIndex.visible = false;
					eIndexName.visible = false;
					eLowIndex.visible = false;
					eLowIndexName.visible = false;

					eIndex.render();
					eIndexName.render();
					eLowIndex.render();
					eLowIndexName.render();

					for (var i = Vars.low; i <= Vars.high; i++) {
						let num = Vars.nums[Vars.buffer[i]];
						num.box.y += num.box.h*2;
						num.render();
					}
					if(Vars.lowindex - Vars.low > 0) {
						Vars.sortParts.push({
							low: Vars.low,
							high: Vars.lowindex,
						});
					} else {
						for (var i = Vars.low; i <= Vars.lowindex; i++) {
							let num = Vars.nums[Vars.buffer[i]];
							num.className = "disabled";
							num.render();
						}
					}
					if(Vars.high - Vars.lowindex - 2 > 0) {
						Vars.sortParts.push({
							low: Vars.lowindex+2,
							high: Vars.high,
						});
					} else {
						for (var i = Vars.lowindex+2; i <= Vars.high; i++) {
							let num = Vars.nums[Vars.buffer[i]];
							num.className = "disabled";
							num.render();
						}
					}
					if(Vars.sortParts.length > 0) Vars.state = Vars.states.partition-1;
				}, 200);
			}, 200);
		}, delay);
	}
});






// new Num({id:0, buffer:"src", value:1, box:{x:0,y:0,w:7,h:7}});
// new Num({id:1, buffer:"src", value:2, box:{x:0,y:0,w:7,h:7}});
// new Num({id:2, buffer:"src", value:3, box:{x:0,y:0,w:7,h:7}});
// new Num({id:3, buffer:"src", value:4, box:{x:0,y:0,w:7,h:7}});
// new Num({id:4, buffer:"src", value:5, box:{x:0,y:0,w:7,h:7}});






export default Vars;