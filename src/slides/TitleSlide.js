import React from 'react'
import {useState} from 'react'
import './TitleSlide.css'
import Vars from '../Vars'
import Number from './Number';

function TitleSlide() {

	const [visible, setVisible] = useState(1);
	const [repaints, setRepaints] = useState(1);
	Vars.renderSlide = () => {setRepaints(repaints => repaints+1)};
	
	

	// for (var i = 0; i < Vars.srcBuffer.length; i++) {
	// 	eNumb.push(<Number key={i}/>);
	// 	// eNumb.push(<div key={i} className="buffer-src-num" style={{
	// 		// animationDelay: `${i/Vars.srcBuffer.length/2}s`
	// 	// }}>{Vars.srcBuffer[i]}</div>);
	// }
	
	let eSteps = [];

	for (var i = 0; i < Vars.steps.length; i++) {
		let step = Vars.steps[i];
		let className = "";
		if(Vars.step == i) className = "shown";
		if(Vars.step > i) className = "hidden";
		eSteps.push(<h2 key={i} className={`title-action ${className}`}>{step.name}</h2>);
	}

	return <div className="title-slide-body">
				<h1 className={`title ${visible?"shown":"hidden"}`}>Быстрая сортировка</h1>
				{/*<h2 className={`title-action ${visible?"shown":"hidden"}`}>{Vars.slide.subtitle}</h2>*/}
				{eSteps}
				<div className="buffer-src-num-box">
				</div>
		   </div>
}


export default TitleSlide