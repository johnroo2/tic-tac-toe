import { useState} from "react"

function WinnerModal({state, reset}:any){
  return(
    <div className="absolute inset-0 flex items-center justify-center bg-black/[0.2]">
      <div className="self-center w-[250px] h-[250px] 
      flex flex-col items-center justify-center bg-white rounded
      text-3xl font-bold gap-2" data-aos="fade-up">
        Winner: {state === 1 ? <span className="text-rose-800 text-[2.5rem]">&times;</span>:
        <span className="text-indigo-800">&#x25CB;</span>}
        <button className="mt-4 text-black hover:text-rose-700 underline hover:underline
        transition rounded text-[0.6em] font-medium mb-[-0.5rem]"
        onClick={reset}>
          Reset Game
        </button>
      </div>
    </div>
  )
}

export default function Home() {
  const [turn, setTurn] = useState<number>(1)
  const [board, setBoard] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [modalState, setModalState] = useState<number>(0)

  const reset = () => {
    setBoard([0, 0, 0, 0, 0, 0, 0, 0, 0])
    setTurn(1)
    setModalState(0)
  }

  const checkState = (board:number[], turn:number) => {
    for (let i = 0; i < 3; i++) {
      if (Math.abs(board[i * 3] + board[i * 3 + 1] + board[i * 3 + 2]) === 3 ||
        Math.abs(board[i] + board[i + 3] + board[i + 6]) === 3) {
        setModalState(turn);
      }
    }
  
    if (Math.abs(board[0] + board[4] + board[8]) === 3 ||
        Math.abs(board[2] + board[4] + board[6]) === 3) {
      setModalState(turn);
    }
  }

  return (
    <>
      <main className="relative flex flex-col items-center justify-center h-screen gap-4" data-aos="fade-up">
        <div className="text-black font-bold text-5xl text-center">
          Tic-Tac-Toe
        </div>
        <div className="text-black font-medium text-xl text-center h-[2rem] flex flex-row items-center gap-[0.35em]">
          {turn === 1 ? <span className="text-rose-800 text-[1.65rem] mb-1">&times;</span>:
          <span className="text-indigo-800">&#x25CB;</span>} to move
        </div>
        <div className="flex flex-row flex-wrap w-[360px]">
          {board.map((square, index) => (
            <button className="w-[120px] h-[120px] border-black border-2 m-[-1px] 
            bg-white/[0.3] hover:bg-white/[0.9] flex items-center justify-center
            font-light transition" key={index}
            onClick={() => {
              setBoard((prev) => {
                const clone = [...prev]
                if(clone[index] === 0){
                  clone[index] = turn
                  checkState(clone, turn)
                  setTurn(prev => -prev)
                }
                return clone
              })
            }}>
              {square === -1 ? <span className="text-indigo-800 text-[65px]">&#x25CB;</span> : 
              square === 1 ? <span className="text-rose-800 mb-2 text-[80px]">&times;</span> : <></>}
            </button>
          ))}
        </div>
        <button className="mt-2 text-white bg-rose-700 hover:bg-rose-500 py-1 
        px-10 transition rounded text-md font-medium"
        onClick={reset}>
          New Game
        </button>
      </main>
      {modalState !== 0 && <WinnerModal state={modalState} reset={reset}/>}
    </>
  )
}
