
import './App.css'
import Card from './components/Card'

function App() {



  const box = {
    width: 100,
    height: 100,
    backgroundColor: "#ff0088",
    borderRadius: 5,
  }

  const food = [
    ["🍅", 340, 10],
    ["🍊", 20, 40],
    ["🍋", 60, 90],
    // ["🍐", 80, 120],
    // ["🍏", 100, 140],
    // ["🫐", 205, 245],
    // ["🍆", 260, 290],
    // ["🍇", 290, 320],
  ]

  const container = {
    margin: "100px auto",
    maxWidth: 500,
    paddingBottom: 100,
    width: "100%",
  }

  return (
    <div className='bg-[#0D0D0D] text-white h-full pb-[100px]'>
      <div className='container mx-auto text-white '>
        <h1 className='text-5xl flex justify-center'>Framer Motion</h1>


        <div style={container}>
          {food.map(([emoji, hueA, hueB], i) => (
            <Card i={i} emoji={emoji} hueA={hueA} hueB={hueB} key={emoji} />
          ))}
        </div>

        
      </div>
    </div>
  )
}

export default App


