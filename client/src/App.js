import {Table} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([{
    id: '',
    title: '',
    price: ''
  }]);
  const [orders, setOrders] =useState([{
    id: '',
    item: '',
    output: [{
      id: '',
      title: '',
      price: ''
    }]
  }]);
  const [clients, setClients] = useState([{
    id: '',
    name: '',
    orderId: '',
    output: [{
      id: '',
      item: ''
    }]
  }])

  useEffect(() => {
    fetch('/products').then(res => {
      if(res.ok) {
        return res.json()
      }
    }).then(jsonRes => setProducts(jsonRes));
  }, [products])

  useEffect(() => {
    fetch('/orders').then(res => {
      if(res.ok) {
        return res.json()
      }
    }).then(jsonRes => setOrders(jsonRes));
  }, [orders]);
  useEffect(() => {
    fetch('/clients').then(res => {
      if(res.ok) {
        return res.json()
      }
    }).then(jsonRes => setClients(jsonRes));
  }, [clients])

  return (
    <div className="App">
      <h1>Products</h1>
      <Table striped bordered hover size="sm">
  <thead>
    <tr>
      <th>id</th>
      <th>title</th>
      <th>price</th>
    </tr>
  </thead>
  <tbody>
    
      {products.map(product => {
        return(
          <tr>
            <td>{product.id}</td>
            <td>{product.title}</td>
            <td>{product.price}</td>
          </tr>
        )
      })}
    
  </tbody>
</Table>
<h1>Orders</h1>
      <Table striped bordered hover size="sm">
  <thead>
    <tr>
      <th>id</th>
      <th>item</th>
      <th>amount</th>
    </tr>
  </thead>
  <tbody>
    
      {orders.map(order => {
        return(
          <tr>
            <td>{order.id}</td>
            <td>{order.item}</td>
            {order.output.map(el => {
              return(<td>{el.price}</td>)
            })}
          </tr>
        )
      })}
    
  </tbody>
</Table>
<h1>Clients</h1>
      <Table striped bordered hover size="sm">
  <thead>
    <tr>
      <th>id</th>
      <th>name</th>
      <th>order ID</th>
      <th>purchased item</th>
      <th>total cost</th>
    </tr>
  </thead>
  <tbody>
    
      {clients.map(client => {
        return(
          <tr>
            <td>{client.id}</td>
            <td>{client.name}</td>
            <td>{client.orderId}</td>
            {client.output.map(el => {
              return(<td>{el.item}</td>)
            })}
            {orders.filter(order => order.id === client.orderId).map(el => {
              return(
                <td>{el.output[0].price}</td>
              )
            })}
          </tr>
        )
      })}
    
  </tbody>
</Table>
    </div>
  );
}

export default App;
