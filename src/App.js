import './App.css';
import React, { Component } from 'react';
import {useState} from 'react';

function Header(props) {
  //console.log('props', props.title);
  return <header>
    <h1><a href="/" onClick={(event)=>{
      event.preventDefault(); // a태그가 동작하는 기본동작을 막는것
      props.onChangeMode();
    }}>{props.title}</a></h1>
  </header>
}

function Article(props){
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}

function Nav(props){
  const lis = []
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/'+t.id} onClick={event=>{
        event.preventDefault();
        props.onChangeMode(Number(event.target.id));
      }}>{t.title}</a>
    </li>)
  }
  return <nav>
    <ol>
      {lis}
    </ol>
  </nav>
}

function App() {
  //const _mode = useState('WELCOME');
  //const mode = _mode[0];
  //const setMode = _mode[1];
  const [mode, setMode] = useState('WELCOME'); // 위 세줄이랑 같은 코드
  const [id, setId] = useState(null);

  const topics = [
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'js', body:'js is ...'},
  ]

  let content = null;

  if(mode === 'WELCOME'){
    content = <Article title="Welcome" body="Hello WEB"></Article>
  } else if(mode === 'READ'){
    let title, body = null;
    for(let i=0; i<topics.length; i++){
      console.log(topics[i].id, id);
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
  }
  return(
    <div>
      <Header title="WEB" onChangeMode={()=>{
        //alert('Header');
        setMode('WELCOME'); // 값을 바꿀때는 setMode를 사용
      }}></Header>
      <Nav topics={topics} onChangeMode={(id)=>{
        //alert(id);
        setMode('READ');
        setId(id);
      }}></Nav>
      {content}
    </div>
  );
}

export default App;
