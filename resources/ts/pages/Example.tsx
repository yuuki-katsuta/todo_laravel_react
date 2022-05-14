import React from 'react';
import ReactDOM from 'react-dom';

const message = 'hello !!';
const calc = (str: string) => str.length;

function Example() {
  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-md-8'>
          <div className='card'>
            <div className='card-header'>Example Component</div>
            <div className='card-body'>{message}</div>
            <button onClick={() => console.log(calc(message))}>押す</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Example;
