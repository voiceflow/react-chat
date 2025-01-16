import { Coffee, ArrowRight } from 'lucide-react'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="relative mb-8">
        <Coffee className="w-24 h-24 text-stone-800" />
        <div className="absolute -top-4 -right-4 transform rotate-45">
          <Coffee className="w-12 h-12 text-stone-600" />
        </div>
        <div className="absolute -bottom-4 -left-4 transform -rotate-45">
          <Coffee className="w-12 h-12 text-stone-600" />
        </div>
      </div>
      <h1 className="text-3xl font-bold mb-2 text-gray-900">BeanScan</h1>
      <p className="text-base text-gray-600 mb-16">Scan & Explore Origins</p>
      <button className="bg-gray-900 text-white p-3 rounded-full hover:bg-gray-800 transition-colors">
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  )
}

export default App
