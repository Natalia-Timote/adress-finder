import { useState } from 'react'
import './App.css'
import SearchSelector from './components/SearchSelector';
import CepSearch from './components/CepSearch';
import LogradouroSearch from './components/LogradouroSearch';

function App() {
  const [screen, setScreen] = useState('cep');

  const [cep, setCep] = useState('');
  const [adress, setAdress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [logradouro, setLogradouro] = useState('');
  const [results, setResults] = useState([]);
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

    if (!/^\d{8}$/.test(cep)) {
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

    if (logradouro.trim().length < 3) {
      setError('Digite pelo menos 3 caracteres.');
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
      <SearchSelector onChangeScreen={chooseScreen} />

      {screen === 'cep' &&
        <CepSearch
          cep={cep}
          setCep={setCep}
          handleSearchCep={handleSearchCep}
          adress={adress}
          error={error}
          setError={setError}
          loading={loading}
        />
      }

      {screen === 'logradouro' &&
        <LogradouroSearch
          logradouro={logradouro}
          setLogradouro={setLogradouro}
          handleSearchLogradouro={handleSearchLogradouro}
          results={results}
          selectedCep={selectedCep}
          setSelectedCep={setSelectedCep}
          error={error}
          setError={setError}
          loading={loading}
        />
      }
    </main>
  )
}

export default App
