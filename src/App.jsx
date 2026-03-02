import { useState } from 'react'
import './App.css'

function App() {
  const [screen, setScreen] = useState('cep');

  const [cep, setCep] = useState('');
  const [adress, setAdress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [logradouro, setLogradouro] = useState('');
  const [results, setResults] = useState(null);
  const [selectedCep, setSelectedCep] = useState(null);

  function chooseScreen(type) {
    setScreen(type);
    setCep('');
    setAdress(null);
    setLoading(false);
    setError('');
    setLogradouro('');
    setResults(null);
    setSelectedCep(null);
  }

  async function handleSearchCep() {
    setLoading(true);

    if (cep.length !== 8) {
      setAdress(null);
      setLoading(false);
      setError('O CEP precisa conter 8 dígitos. Tente novamente!');
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

      if (!response.ok) {
        throw new Error('Erro na API');
      }

      const data = await response.json();

      if (data.erro) {
        setError('Nenhum resultado encontrado.');
        setAdress(null);
        return;
      }

      console.log(data);
      setAdress(data);
      setError('');
    } catch (error) {
      setError('Ocorreu um erro. Tente novamente!');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSearchLogradouro() {
    setLoading(true);
    setSelectedCep(null);

    if (!logradouro.trim()) {
      setError('Logradouro inválido. Tente novamente!');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/SC/Florianopolis/${logradouro}/json/`);

      if (!response.ok) {
        throw new Error('Erro na API');
      }

      const data = await response.json();

      if (data.length === 0) {
        setError('Nenhum resultado encontrado.');
        setResults([]);
        return;
      }

      console.log(data);
      setResults(data);
      setError('');
    } catch (error) {
      setError('Ocorreu um erro. Tente novamente!');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <section className='select-search'>
        <h1>Adress Finder</h1>
        <button onClick={() => chooseScreen('cep')}>Buscar com CEP</button>
        <button onClick={() => chooseScreen('logradouro')}>Buscar com logradouro</button>
      </section>

      {screen === 'cep' && (
        <section className='cep'>
          <h2>Buscar endereço via CEP</h2>
          <input type="text" placeholder='Insira o CEP' value={cep} onBlur={handleSearchCep} onChange={(e) => setCep(e.target.value)} />
          <button className='button-search' onClick={handleSearchCep}>Buscar</button>

          <div className='results'>
            {adress && (
              <div className='result'>
                <p>Endereço: {adress.logradouro}</p>
                <p>Bairro: {adress.bairro}</p>
                <p>Cidade: {adress.localidade}</p>
                <p>Estado: {adress.uf}</p>
              </div>
            )}
          </div>

          {error && <p className='error'>{error}</p>}
          {loading && <p>Carregando...</p>}
        </section>
      )}

      {screen === 'logradouro' && (
        <section className='logradouro'>
          <h2>Buscar CEP via logradouro</h2>
          <input type="text" placeholder='Insira o logradouro' value={logradouro} onChange={(e) => setLogradouro(e.target.value)} />
          <button className='button-search' onClick={handleSearchLogradouro}>Buscar</button>

          <div className='results'>
            {selectedCep && (
              <div className='selected'>
                <p>CEP: {selectedCep.cep}</p>
                <p>Endereço: {selectedCep.logradouro}</p>
                <p>Bairro: {selectedCep.bairro}</p>
                <p>Cidade: {selectedCep.localidade}</p>
                <p>Estado: {selectedCep.uf}</p>
              </div>
            )}
          </div>

          {results && (
            <div className='results'>
              <p>Resultados para Florianópolis - SC</p>
              {results.map((item) => {
                return (
                  <div className={`result ${selectedCep?.cep === item.cep ? 'selected' : ''}`} key={item.cep} onClick={() => setSelectedCep(item)}>
                    <p>CEP: {item.cep}</p>
                    <p>Endereço: {item.logradouro}</p>
                    <p>Bairro: {item.bairro}</p>
                    <p>Cidade: {item.localidade}</p>
                    <p>Estado: {item.uf}</p>
                  </div>
                )

              })}
            </div>
          )}

          {error && <p className='error'>{error}</p>}
          {loading && <p>Carregando...</p>}
        </section>
      )}
    </main>
  )
}

export default App
