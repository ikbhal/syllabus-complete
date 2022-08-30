import './App.css';
import {reactSyllabus} from './data.js';
import {useState} from 'react';

function App() {
  
  var [syllabus, setSyllabus] = useState(reactSyllabus);
  const markComplete = (heading, topic) =>{
    console.log("inside mark complete h:", heading, ",topic:", topic);
    var si = syllabus.findIndex(s => s.heading == heading);
    var section = syllabus[si];

    console.log("section:", section);
    section.topicList.map(t => {

      if(t.text == topic){
        t.completed =true;
      }
      return t;
    });

    var newSyllabus = [...syllabus];
    for(var i=0;i<newSyllabus.length;i++){
      if(newSyllabus[i].heading == heading){
        newSyllabus[i] = {heading: section.heading, topicList: [...section.topicList] };
      }
    }
    setSyllabus(newSyllabus);
  }
  return (
    <div className="App">
      <h1>React js syllabus checklist</h1>
      {
        reactSyllabus.map((s,i) => <Section key={i} s={s} markComplete={markComplete}/>)
      }
    </div>
  );
}

function Section({s, markComplete}){
  console.log("inside section s:", s);
  return (
    <div className="section">
      <h2 className="heading">{s.heading}</h2>
      {s.topicList.map((t,i) =>
      
        <p key={i}>
          {/* {t.text} */}
          <input type="checkbox" 
            onChange={markComplete(s.heading, t)}
            checke={t.completed}
            ></input>  
          <a href={t.link}>{t.text}</a>
        </p>
        
        )}
    </div>
  );
}
export default App;
