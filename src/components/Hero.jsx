import { logo } from '../assets';

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
    <nav className="flex justify-between items-center w-full mb-10 pt-3 px-2"> 
        <img src={logo} alt="sumz_logo" className="w-14 object-contain" />

        <button
        type='button'
        onClick={() => window.open('https://github.com/SirWilliam254/ai-summarizer')}
        className='black_btn'
        >
            Github
        </button>
    </nav>
    <h1 className='head_text'>Summarize docs with <br /> <span className='orange_gradient'> Open AI GPT-4
    </span></h1>
    <h2 className='desc'>
        summarize lengthy Documentations to more succinct form using chat gpt
    </h2>
    </header>
  )
}

export default Hero
