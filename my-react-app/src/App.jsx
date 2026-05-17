import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  const[loading,setLoading]=useState(true)
  const[search,setSearch]=useState("")

  async function fetchProducts(){
    try{
      const resp=await fetch("https://dummyjson.com/products")
      const data=await resp.json()
      setProducts(data.products)
      setLoading(false)
    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    fetchProducts()
  },[])
  const filterProducts=products.filter((product)=>{
    return product.title.toLowerCase()
    .includes(search.toLowerCase())
  })
  return (
  <>
  <input type='text' placeholder='search products.....' value={search} onChange={(e)=>setSearch(e.target.value)}/>
    {filterProducts.map((product) => {
      return (
        <div key={product.id}>
          <img src={product.thumbnail} alt={product.title} />
          <h3>{product.title}</h3>
          <h4>{product.price}</h4>
          <button>ADD TO CART</button>
        </div>
      );
    })}
  </>
);
}
export default App
