import React from 'react'
import Header from './Commun/Header'
import "./assets/css/style.scss"
function Home() {
  return (
    <div>
      <Header/>
   <main>
         {/* Section Hero */}
        <section className="section-1">
          <div className="hero d-flex align-items-center">
            <div className="container-fluid py-5">
              <div className="text-center">
                <span>Welcome Shop products</span>
                <h1>Smart tech <br />crafted with purpose</h1>
                <p>
               Discover devices engineered with accuracy, durability, and forward-thinking design. <br />
            Each product brings together innovation and craftsmanship to transform your ideas into seamless, powerful experiences.
                </p>
                <div className="mt-4">
                  <a className="btn btn-primary large">Contact Now</a>
                  <a  href="./Products"className="btn btn-secondary ms-2 large">View Products</a>
                </div>
              </div>
            </div>
          </div>
        </section>
















   </main>





    </div>
  )
}

export default Home
