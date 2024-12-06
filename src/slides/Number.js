
import Vars from '../Vars'
import {useState} from 'react'


function Number(props) {

	const [repaints, setRepaints] = useState(1);
	
	let key = props.id;

	let num = Vars.nums[key];

	num.render = () => {setRepaints(repaints => repaints+1)};

	let style = {
		left: `calc(50% + ${num.box.x - num.box.w/2}vh)`,
		top: `calc(50% + ${-num.box.y - num.box.h/2}vh)`,
		width: `${num.box.w}vh`,
		height: `${num.box.h}vh`,
		fontSize: `${num.box.h*.7}vh`,
	};

	if(num.style != undefined)
	for (let key of Object.keys(num.style)) {
		style[key] = num.style[key];
	}

	// console.log(style);

	return <div className={`number ${num.visible ? "shown" : "hidden"} ` + num.className} style={style}>{num.value}</div>;

}


export default Number;