import { useRef, forwardRef } from "react"

function OptionGroup(props) {
    return (
        <div id="option-group" className="relative w-full max-w-[600px]">
            {
                props.options.length == 3 ? 
                <ThreeOptionsLayout >
                    <OptionButton {...props} col={0} option={props.options[0]}/>
                    <OptionButton {...props} col={1} option={props.options[1]}/>
                    <OptionButton {...props} col={2} option={props.options[2]}/>
                </ThreeOptionsLayout> 
                : props.options.length == 2 ?
                <TwoOptionsLayout > 
                    <OptionButton {...props} col={0} option={props.options[0]}/>
                    <OptionButton {...props} col={1} option={props.options[1]}/>
                </TwoOptionsLayout > 
                :
                <OptionButton option={null}/>
            }
        </div>
    )
}

function ThreeOptionsLayout({ children }) {
    return(
        <div className="grid grid-cols-3 grid-rows-2 h-[82px]">
            <div className="row-span-2 flex justify-center">
                {children[0]}
            </div>
            <div className="row-span-2 flex justify-center">
                {children[1]}
            </div>
            <div className="row-span-2 flex justify-center">
                {children[2]}
            </div>
        </div>
    )
}

function TwoOptionsLayout({ children }) {
    return (
        <div className="grid grid-cols-2 grid-rows-1 h-[82px]">
            <div className="flex items-center justify-center">
                {children[0]}
            </div>
            <div className="flex items-center justify-center">
                {children[1]}
            </div>
        </div>
    )
}

const OptionButton = (props) => {
    const {
        isActive, 
        option, 
        handleOptionButtonClick, 
        row, 
        col, 
        optionsLength
    } = props
    const iceType = useRef(Math.floor(Math.random() * (2 - 1 + 1)) + 1)

    return (
        <div 
            className="relative flex justify-center items-center w-[159px] h-[82px]"

            onClick={isActive ? () => handleOptionButtonClick(row, col, optionsLength) : null}
        >
            <img src={`/images/penguin-dash/ice-type-${iceType.current}.gif`} />
            <p className="absolute top-2 text-xl font-bold" style={{visibility: `${isActive? 'visible' : 'hidden'}`}}>{option}</p>            
        </div>
    )
}

const StartPlace = forwardRef((props, ref) => {
    return (
        <div ref={ref} id="start-place" className="relative flex justify-center items-center w-full max-w-[600px]">
            <OptionButton option={null} />
        </div>
    )
})

const FinishPlace = forwardRef(({ handleClick, isFinish }, ref) => {
  return (
    <div
      ref={ref}
      id="finish-place"
      className="relative flex justify-center items-center w-full max-w-[600px]"
      onClick={isFinish ? handleClick : null}
    >
      <OptionButton option={null} />
      {/* center the flag properly using translate-x-1/2 */}
      <img
        src="/images/penguin-dash/finish-flag.png"
        alt="Finish flag"
        className="absolute -top-12 left-1/2 w-[72px] h-[100px] -translate-x-1/2"
      />
    </div>
  )
})


export {OptionGroup, StartPlace, FinishPlace}