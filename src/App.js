/*eslint-disable*/

import logo from './logo.svg';
import './App.css';
import article from "./Articles.json"
import { useEffect, useState } from 'react';

function App() {
  const initialcounter = {
    "Kinder": 0,
    "Snickers": 0,
    "Lu": 0,
    "Gauffre": 0,
    "Coca": 0,
    "Orangina": 0,
    "Oasis": 0,
    "Cristaline": 0,
    "LaysBarbecue": 0,
    "LaysNature": 0,
    "DoritosCheddar": 0,
    "PringlesSourCream": 0
  }
  const [cart, setCart] = useState(0)
  const [counter, setCounter] = useState(initialcounter)
  const [productId, setProductId] = useState([])
  const [productDoesExist, setProductDoesExist] = useState(null)
  const [paying, setPaying] = useState(null)
  const [showProject, setShowProject] = useState(false)

  useEffect(() => {
    productId.length === 4 ? checkId(productId) : null
  }, [productId])

  useEffect(() => { !productDoesExist ? setTimeout(() => { setProductDoesExist(null), setProductId([]) }, [1000]) : null }, [productDoesExist])

  const addToCart = (price) => {
    console.log(price)
    setCart(cart + price)
  }

  const updateCounter = (name) => {
    setCounter({ ...counter, [name]: counter[name] + 1 })
    // console.log(counter.Kinder)
  }

  const clearCart = () => {
    setCart(0)
  }

  const clearCounter = () => {
    setCounter(initialcounter)
  }

  const clearProductId = () => {
    setProductId([])
    setProductDoesExist(null)
  }

  const checkId = (id) => {
    const pId = id.join('')
    let produit = article.machine.filter((prod) => { return prod.id === pId })
    produit.length !== 0 ? setProductDoesExist(true) : setProductDoesExist(false)
  }

  const addNumber = (number) => {
    productId.length < 4 ? setProductId(productId => [...productId, number]) : null
  }

  const addFromId = (pId) => {
    const prod = article.machine.filter((pro) => { return pro.id === pId.join('') })
    prod.length !== 0 ? (addToCart(prod[0].price), updateCounter(prod[0].name)) : null
    setProductId([])
    setProductDoesExist(null)
  }

  const pay = () => {
    setPaying(true)
    setTimeout(() => {
      clearCart(),
        setCounter(initialcounter)
      setPaying(false)
    }, [2000])
  }

  return (
    <div className="App">
      {showProject ?
        <div className='Black'>

          <div className='machine'>
            <h1>Distributeur automatique de Snacks Par Djibril Samassa</h1>
            <h3 className='open' onClick={() => { setShowProject(false) }}>Lire la fiche du projet</h3>
            <div className='container'>
              <div className='vitre'>
                {article.machine.map((art, i) => (
                  <div className={paying && counter[art.name] ? 'payment' : 'article'} onClick={() => { addToCart(art.price), updateCounter(art.name) }}>
                    <img className='artimg' src={`/photos/${art.name}.png`} alt='non trouvé' key={art.id} />
                    <h3>{art.name}</h3>
                    <h3 className='price'>{art.price} €</h3>
                    <p>Code produit : {art.id}</p>
                    {counter[art.name] !== 0 && !paying ? <span className='articleNumber'>{
                      counter[art.name]
                    }</span> : null}
                  </div>))}
              </div>
              <div className='right'>
                <div className='screen' >
                  <h3>{cart} €</h3>
                </div>
                <h3 onClick={() => { clearCart(), clearCounter(), clearProductId() }} className='clearButton'>Annuler  </h3>
                <div className='bottom'>
                  <div className='displayer'>
                    <h3>{productId.length !== 0 ? productId.join('') : 'Code'}</h3>
                  </div>
                  <div className='buttons'>
                    <span onClick={() => { addNumber(1) }}>1</span>
                    <span onClick={() => { addNumber(2) }}>2</span>
                    <span onClick={() => { addNumber(3) }}>3</span>
                    <span onClick={() => { addNumber(4) }}>4</span>
                    <span onClick={() => { addNumber(5) }}>5</span>
                    <span onClick={() => { addNumber(6) }}>6</span>
                    <span onClick={() => { addNumber(7) }}>7</span>
                    <span onClick={() => { addNumber(8) }}>8</span>
                    <span onClick={() => { addNumber(9) }}>9</span>
                    <span onClick={() => { addNumber(0) }}>0</span>
                  </div>
                  <span>{productDoesExist !== null ? productDoesExist ? <span className='add' onClick={() => { addFromId(productId) }}>ajouter</span> : <span>N'existe pas <br /> Réinitialisation </span> : null}</span>
                </div>
                {cart !== 0 ? <h3 onClick={() => { pay() }} className='pay'> Payer </h3> : null}
                <h3>{paying ? 'Distribution en cours' : null}</h3>
              </div>
            </div>

          </div>
        </div> :
        <div className='explication'>
          <h3 className='close' onClick={() => { setShowProject(true) }}>Fermer</h3>
          <h1>Bienvenue sur mon projet distributeur de Snacks</h1>
          <br />
          <div>
            <h2>Technologies utilisées</h2>
            <nav>
              <li>React JS</li>
              <li>Json</li>
            </nav>
          </div>
          <br />
          <h2 style={{ textAlign: 'left', fontWeight:'200' }}>C'est un distributeur automatique, il y 3 categories de produit: les biscuits/gateaux, les boissons, et les chips. Chaque produit posséde un code.<br /><br />
            On peut soit ajouter un produit au panier en le sélectionnant directement depuis l'interface, soit l'ajouter en tapant le code produit sur le clavier.
            Une fois une suite de 4 nombres entrée, on vérifie qu'un produit possède bien ce code. Si c'est le cas on propose à l'acheteur de l'ajouter au panier
            Sinon on réinitialise la selection.<br /><br /> A noté qu'on peut sélectionner plusieurs fois le même produit, il y a en haut à droite de chaque produit une pastille qui indique le nombre selectionné de chaque produit
            .<br /><br />Dès lors qu'il y a plus d'un produit dans le panier, on propose à l'acheteur de payer, lorsqu'il paye on lui distribue ce qu'il a commandé
            puis ensuit le panier est reinitialisé.</h2>
          <br />
          <div className='liens'>
            <h2>Mes liens</h2>
            <nav>
              <li><a href='https://github.com/Djibril-Samassa?tab=repositories' target="_blank">Github</a></li>
              <li><a href='https://www.linkedin.com/in/djibril-samassa/' target="_blank">Linkedin</a></li>
            </nav>
          </div>
        </div>}
    </div>
  );
}

export default App;