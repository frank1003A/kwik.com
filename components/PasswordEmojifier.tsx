import React, {useState, useEffect, useRef, FC} from 'react'
import styles from '../styles/Pemji.module.css'
import {RemoveRedEye} from '@mui/icons-material'
import { Checkbox } from '@mui/material'

interface Props {
    mask: string | string[],
}

const PasswordEmojifier:FC<Props> = ({mask}) => {
    const emojies = [
        "😜", "🐱‍👓", "😃", "🎂", "😂", "😎", "👌", "👀", "🤦‍♀️", "😎",
       "🤷‍♀️", "😉", "😉", "🐱‍🐉", "🐱‍🏍", "🐱‍👤", "😜", "🌹", "💋", "🐱‍🐉", "😂"
    ]
    const closedemoji = "🤐"
    const openedemoji = "😜"
    const [text, setText] = useState<string>('')
    const [emoji, setEmoji] = useState<string>('')
    //const [status, setStatus] = useState<string>('')
    const [mstate, setmstate] = useState<string>('')
    const [showemoji, setShowemoji] = useState<boolean>(false)

    const handleEmojiText = (e: React.ChangeEvent<HTMLInputElement>) => {
      let { value } = e.target;
      let textt = [value]
      let emoji = ""
      let txt = ""
      for (let i = 0; i < textt.length; i++) {
        emoji = openedemoji;
        txt = textt[i];
        setText(text);
        setEmoji(emoji);
      }
    };
    
    const getEmojiValue = (str: string | string[]) => {
      if (showemoji === false) return resetmask(str)
      if (showemoji === true) return getmask(str)
    }

    const getmask = (str: string | string[]) => {
      let mask = ''
      return mask
    };

    const resetmask = (str: string | string[]) => {
      return str
    }

  return (
    <div style={{display: 'flex'}}>
        <input type="text" placeholder="min. 8 characters"
        className={styles['pemj']}
        value={getEmojiValue(text)}
        onChange={(e) => handleEmojiText(e)}/>
    </div>
  )
}

export default PasswordEmojifier

/**
 * {//<Checkbox value={showemoji} onChange={(e) => setShowemoji(!showemoji)}/>//}
 * // let maskedtxt = [...mstate]
     //let maskedtxt = [...mstate].join('').toString()
     //console.log(maskedtxt)
     if (showemoji === false) return resetmask(text)
     if (showemoji === true) return getmask(text)
     // if (showemoji === true) return getmask(text) *

let oldvalue = key.toString()
let txt = oldvalue[oldvalue.length - 1]
setmstate(prevstate => [...prevstate, txt])
 let textt = [...key]
 let obj = []
 for (let i = 0; i < textt.length; i++) {
     const emjtxt = {
         emoji: openedemoji,
         text: textt[i]
     }
     obj.push(emjtxt)
 }
 let emoji = obj.map(o => {return o.emoji}).join('')
 let txts = obj.map(o => {return o.text}).join('')
 //  */



/**let emojies = obj.map(o => {return o.emoji}).join('')
        let txts = obj.map(o => {return o.text}).join('')
        if (showemoji === false) return mstate
        if(showemoji === true) {
          return emojies
        } */
//
//{text.length > 8 ? closedemoji : checktyping}
//<span style={{opacity : status === 'is_typing' ? 1 : 0}}>{openedemoji}</span>
/**
 * 
    let str = punnycode.encode("😜")
    let nstr = punnycode.decode(str)
 let textt = [...value]
        const emj = textt.map(txt =>  {
            return openedemoji
        }) */
        /**const emj = textt.map(txt =>  {
            const emjtxt = {
                emoji: openedemoji,
                text: txt
            }
            console.log(emjtxt.text)
            return emjtxt.emoji
        }) */

        /*
        const [text, setText] = useState('')
    const [emoji, setEmoji] = useState('')
    const [status, setStatus] = useState('')
    const [mstate, setmstate] = useState('')
    const [showemoji, setShowemoji] = useState(false)

    const handleEmojiText = (e) => {
        setText(e.target.value)
        setEmoji(init => [...init, openedemoji])
        //setStatus('is_typing')
    }

    const checktyping = () => {
        if (status === 'is_typing') return openedemoji 
    }

    const getEmojiValue = (value) => {
        let textt = [...value]
        let obj = []
        for (let i = 0; i < textt.length; i++) {
            const emjtxt = {
                emoji: openedemoji,
                text: textt[i]
            }
            obj.push(emjtxt)
        }
        console.log(obj)
        let emojies = obj.map(o => {return o.emoji}).join('')
        let txts = obj.map(o => {return o.text}).join('')
        if (showemoji === false) return txts
        if(showemoji === true) return emojies
    }*/


    /**import React from 'react';
import serialize from 'form-serialize';
import CustomMaskedPassword from 'react-custom-password-mask';

export default React.createClass({

  submitHandler(event) {
    event.preventDefault();

    // Using ref: secret
    console.log("Using ref:", this.refs.pswd.value);

    // From form: password=secret
    console.log("From form:", serialize(this.refs.form));
  },

  render() {
    return (
      <form ref="form" onSubmit={this.submitHandler}>
        <CustomMaskedPassword ref="pswd" name="password" mask="X"/>
        <button>Submit</button>
      </form>
    );
  }

});  */

/**import React from 'react';
import punycode from 'punycode';

export default class CustomMaskedPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: props.value || ''};
  }

  get value() {
    return this.state.value;
  }

  get mask() {
    let {mask="•"} = this.props;
    return this.encode([this.decode(mask)[0]]);
  }

  get maskedValue() {
    return this.mask.repeat(this.decode().length);
  }

  encode(str=this.value) {
    return punycode.ucs2.encode(str);
  }

  decode(str=this.value) {
    return punycode.ucs2.decode(str);
  }

  changeHandler(e) {
    let oldChars = this.decode();
    let newChars = this.decode(e.target.value);
    let maskCode = this.decode(this.mask)[0];
    let newValue = this.encode(newChars.map((c,i) => (
      c === maskCode ? (oldChars[i] || c) : c
    )));

    this.setState({value: newValue});
  }

  render() {
    return (
      <span>
        <input 
          type="text" 
          className={this.props.className}
          id={this.props.id}
          value={this.maskedValue} 
          onChange={::this.changeHandler}/>
        <input
          type="hidden"
          value={this.value}
          name={this.props.name}/>
      </span>
    );
  }
} */