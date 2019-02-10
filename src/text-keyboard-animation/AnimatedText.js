import React, { Component } from 'react';
import Typing, {Cursor} from 'react-typing-animation';

export default class AnimatedText extends Component {

  render() {
    return (
      <Typing>
        <Typing.Delay ms={1000}/>

        <span>This span will get typed.</span>
        <span>
        _ Hello world 
{"{"}
    Meu nome é  Buggy
    e meu sonho é ser programador,
    mas tenho dois grandes desafios;
{"}"}
        </span>
        <Cursor />
      </Typing>
    );
  }
}
