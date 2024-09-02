import React, { useCallback, useRef, useState } from 'react'
import { useEffect } from 'react'

const App = () => {
  const [password, setpassword] = useState('')
  const [range, setRange] = useState(6)
  const [number, setnumber] = useState(false)
  const [characters, setcharacters] = useState(false)

  const ref = useRef(false)


  const copyText = () => {
    ref.current?.select()
    navigator.clipboard.writeText(password)
    alert('Password Copy Sucessfull')
  }


  const randomPassword = useCallback(() => {
    let generate = ''
    let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (number) str += '1234567890'
    if (characters) str += '!@#$%^&*()_+{}[]|<>,.\/'

    for (let i = 1; i <= range; i++) {
      let random = str[Math.floor(Math.random() * str.length)]

      generate += random
    }
    setpassword(generate)
  },
    [range, number, characters],
  )

  useEffect(() => {
    randomPassword()

  }, [range, number, characters])


  return (
    <>
      <div className='flex items-center justify-center flex-col h-[100vh] w-full bg-black'>

        <div className='bg-slate-600 h-52 w-[29rem] rounded-2xl flex justify-center items-center flex-col'>
          <div className=''>
            <input type="text"
              className='h-10 w-80 rounded-xl p-4'
              value={password}
              readOnly
              ref={ref}
            />
            <button className='text-blue-500 bg-black h-10 w-20 mx-3 rounded-xl'
              onClick={copyText}
            >Copy</button>
          </div>

          <div className='flex items-center justify-center gap-2 mt-8'>
            <input type="range"
              min={6}
              max={100}
              value={range}
              onChange={(e) => { setRange(e.target.value) }}
              className='cursor-pointer'
            />
            <p>Length:{range}</p>

            <input type="checkbox" name="" id="number" onClick={() => setnumber(!number)} />
            <label htmlFor="number">Number</label>

            <input type="checkbox" id="characters" onClick={() => setcharacters(!characters)} />
            <label htmlFor="characters">Special Characters</label>


          </div>
        </div>
      </div>
    </>
  )
}

export default App
