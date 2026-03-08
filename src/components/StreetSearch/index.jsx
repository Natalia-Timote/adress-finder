import { states } from '../../constants/states';
import Button from '../Button';
import Card from '../Card';
import Input from '../Input';
import ResultItem from '../ResultItem';
import ResultList from '../ResultList';
import './StreetSearch.style.css';

export default function StreetSearch({ uf, setUf, city, setCity, street, setStreet, handleSearchStreet, results, selectedCep, setSelectedCep, error, setError, loading }) {
  return (
    <section className='street'>
      <h2>Buscar CEP via logradouro</h2>
      <form className='form-street' onSubmit={(e) => {
        e.preventDefault();
        handleSearchStreet();
      }}>
        <Input
          placeholder='Logradouro'
          value={street}
          onChange={(e) => {
            setStreet(e.target.value);
            setError('');
          }}
        />
        <Input
          placeholder='Cidade'
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            setError('');
          }}
        />
        <select
          className='select-state'
          value={uf}
          onChange={(e) => {
            setUf(e.target.value);
            setError('');
          }}
        >
          <option value=''>Selecione um estado</option>
          {states.map((state) => (
            <option key={state.uf} value={state.uf}>
              {state.name} ({state.uf})
            </option>
          ))}
        </select>

        <Button className='button-search' type='submit' disabled={loading}>Buscar</Button>
      </form>

      <div className='results-container'>
        {selectedCep && (
          <Card className='card-selected'>
            <ResultItem data={selectedCep} />
          </Card>
        )}
      </div>

      {results.length > 0 && (
        <>
          <p style={{ textTransform: 'uppercase' }}>Resultados para {city} - {uf}</p>
          <div className='results-container'>
            <ResultList
              results={results}
              selectedCep={selectedCep}
              setSelectedCep={setSelectedCep}
            />
          </div>
        </>
      )}

      {error && <p className='error'>{error}</p>}
      {loading && <p>Carregando...</p>}
    </section>
  )
}
