import { useEffect, useState } from "react"

const GRID_CONFIG = {
    boxSize: 72,
    gap: 10,
    targetBoxFillColor: '#FFEA00',
    inactiveBoxFillColor: '#064463'
}

export default function GameGrid({level, phase, setSelectedBoxes, currentSelectedBoxes}) {
    const {
        arenaSize,
        targets
    }  = level

    const [selectQuota, setSelectQuota] = useState(level.targets.length)

    const unselectBox = (position) => {
        setSelectedBoxes(currentSelectedBoxes.filter(box => (box.row != position.row) || (box.col != position.col)))
    }
    const selectBox = (position) => {
        setSelectedBoxes([...currentSelectedBoxes, { row: position.row, col: position.col }])
    }

    useEffect(() => {
        setSelectQuota(level.targets.length - currentSelectedBoxes.length)
    }, [currentSelectedBoxes])


    return(
        <div id="grid" className={`grid grid-cols-${arenaSize} grid-rows-${arenaSize}`} style={{gap: GRID_CONFIG.gap}}>
            {
                [...Array(arenaSize)].map((_, i) => {
                    const row = i
                    return (
                        [...Array(arenaSize)].map((_, col) => {
                            const isCurrentBoxTarget = targets.find(target => (target.row === row) && (target.col === col)) || false
                            return(
                                <Box 
                                    position={{row: row, col: col}} 
                                    isTarget={phase === 'recall' || phase === 'finish' ? false: isCurrentBoxTarget} 
                                    handleBoxCLicked={{ selectBox: selectBox, unselectBox: unselectBox }}
                                    selectable={selectQuota > 0 && phase === 'recall'}
                                    clickable={phase === 'recall'}
                                /> 
                            )
                    }))
                })
            }
        </div>
    )
    
}

function Box({handleBoxCLicked, position, isTarget, selectable, clickable}) {
    const [isSelected, setIsSelected] = useState(false)

    return(
        <div 
            style={{ 
                width: GRID_CONFIG.boxSize, 
                height: GRID_CONFIG.boxSize, 
                backgroundColor: (isSelected || isTarget) ? GRID_CONFIG.targetBoxFillColor : GRID_CONFIG.inactiveBoxFillColor 
            }} 
            className="rounded-lg"
            onClick={
                !clickable ?
                null
                :
                    !isSelected && selectable ? 
                    () => {
                        setIsSelected(true)
                        handleBoxCLicked.selectBox(position)
                    }
                    :
                        () => {
                            setIsSelected(false)
                            handleBoxCLicked.unselectBox(position)
                        }
                }
            
        ></div>
    )
    
}