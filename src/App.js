import './App.css';
import { useEffect, useState } from "react";
import Display from './components/Display';
import { balanceCalculator } from './helper/balance';


const App = () => {
  const [transactions, setTransactions] = useState(null);
  const [balance, setBalance] = useState('');
  const [price, setPrice] = useState('');
  const [name, setName] = useState('');
  const [datetime, setDatetime] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    getTransactions().then(transactions => {
      setTransactions(transactions);
      setBalance(balanceCalculator(transactions));
    });
  }, []);

  const getTransactions = async () => {
    const url = process.env.REACT_APP_API_URL + '/transactions';
    const res = await fetch(url);
    return await res.json();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = process.env.REACT_APP_API_URL + '/transaction';
    fetch(url, {
      method: 'POST',
      headers: {'Content-type':'application/json'},
      body: JSON.stringify({ 
      price,
      name,
      description, 
      datetime })
    }).then(res => {
      res.json().then(json => {
      setPrice('');
      setName('');
      setDatetime('');
      setDescription('');
      console.log('Result:', json);
      getTransactions().then(transactions => {
        setTransactions(transactions);
        setBalance(balanceCalculator(transactions));
      })
      })
    })
  }
  
  const integral = balance.split('.')[0];
  const fractional = balance.split('.')[1];

  return (
    <main>
      <h1>${ integral }<span>.{ fractional }</span></h1>

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="name">
            <input type="text" value={ name } onChange={e => setName(e.target.value)} placeholder="Activity" />
        </div>

        {/* Price + Date */}
        <div className="basic">
            <input type="number" value={ price } onChange={e => setPrice(e.target.value)} placeholder="Price" />
            <input type="date" value={ datetime } onChange={e => setDatetime(e.target.value)} />
        </div>

        {/* Description */}
        <div className="description">
            <input type="text" value={ description } onChange={e => setDescription(e.target.value)} placeholder="Description" />
        </div>

        {/* Button */}
        <button type="submit">Add new transaction.</button>
      </form>

      { transactions && transactions.map(transaction => <Display transaction={ transaction } key= { transaction._id } />) }
    </main>
  )
}

export default App;
