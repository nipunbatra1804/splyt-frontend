import React, { useState, FormEvent } from "react";
import styled from "styled-components";


export type SliderProps = {
    color: string,
    defaultValue: number
    handleChange: (val:number) => void
};


export type StylesProps = {
  color: string
};

const sliderThumbStyles = (color:string) => (`
  width: 25px;
  height: 25px;
  background: ${color};
  cursor: pointer;
  outline: 5px solid #333;
  -webkit-transition: .2s;
  transition: opacity .2s;
`);

const Styles = styled.div`
  display: flex;
  align-items: center;
  color: #888;
  margin-top: 2rem;
  margin-bottom: 2rem;
  .value {
    flex: 1;
    font-size: 2rem;
  }
  .slider {
    flex: 6;
    -webkit-appearance: none;
    width: 100%;
    height: 15px;
    border-radius: 5px;
    background: #efefef;
    outline: none;
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      ${(props: StylesProps) => sliderThumbStyles(props.color)}
    }
    &::-moz-range-thumb {
      ${(props: StylesProps) => sliderThumbStyles(props.color)}
    }
  }
`;


function Slider(props:SliderProps): JSX.Element {
    const [value,setValue] = useState<number>(props.defaultValue);

    const handleOnChange = (e: FormEvent<HTMLInputElement>) =>  {
        setValue(parseInt(e.currentTarget.value));
        props.handleChange(parseInt(e.currentTarget.value));
    };

    return (
        <Styles color={props.color} >
            <input type="range" min={0} max={100} value={value} step={10} className="slider" onChange={handleOnChange} data-testid="slider"/>
            <div className="value">{value}</div>
        </Styles>
    );
}
  
export default Slider;