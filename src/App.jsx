import { useState } from 'react'
import './App.css'
import SearchSelector from './components/SearchSelector';
import CepSearch from './components/CepSearch';
import StreetSearch from './components/StreetSearch';
import { getCep, getStreet } from './services/viacep.service';

function App() {
  const [screen, setScreen] = useState('cep');

  const [cep, setCep] = useState('');
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [street, setStreet] = useState('');
  const [uf, setUf] = useState('');
  const [city, setCity] = useState('');
  const [results, setResults] = useState([]);
  const [selectedCep, setSelectedCep] = useState(null);

  function chooseScreen(type) {
    setScreen(type);
    setCep('');
    setAddress(null);
    setLoading(false);
    setError('');
    setStreet('');
    setUf('');
    setCity('');
    setResults([]);
    setSelectedCep(null);
  }

  async function handleSearchCep() {
    setLoading(true);

    if (!/^\d{8}$/.test(cep)) {
      setAddress(null);
      setLoading(false);
      setError('O CEP precisa conter 8 dígitos. Tente novamente!');
      return;
    }

    try {
      const data = await getCep(cep);

      setAddress(data);
      setError('');
    } catch (error) {
      setError(error.message);
      setAddress(null);
    } finally {
      setLoading(false);
    }
  }

  async function handleSearchStreet() {
    setLoading(true);
    setSelectedCep(null);

    if (!uf) {
      setError('Selecione um estado.');
      setLoading(false);
      return;
    }

    if (city.trim().length < 3) {
      setError('Digite uma cidade válida.');
      setLoading(false);
      return;
    }

    if (street.trim().length < 3) {
      setError('Digite pelo menos 3 caracteres.');
      setLoading(false);
      return;
    }

    try {
      const data = await getStreet(
        uf.toUpperCase(),
        city,
        street
      )

      setResults(data);
      setError('');
    } catch (error) {
      setError(error.message);
      setResults([]);
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
          address={address}
          error={error}
          setError={setError}
          loading={loading}
        />
      }

      {screen === 'street' &&
        <StreetSearch
          uf={uf}
          setUf={setUf}
          city={city}
          setCity={setCity}
          street={street}
          setStreet={setStreet}
          handleSearchStreet={handleSearchStreet}
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
