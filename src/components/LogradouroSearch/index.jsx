import Button from '../Button';
import Card from '../Card';
import Input from '../Input';
import ResultItem from '../ResultItem';
import './LogradouroSearch.style.css';

export default function LogradouroSearch({ logradouro, setLogradouro, handleSearchLogradouro, results, selectedCep, setSelectedCep, error, setError, loading }) {
  return (
    <section className='logradouro'>
      <h2>Buscar CEP via logradouro</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSearchLogradouro();
      }}>
        <Input
          placeholder='Insira o logradouro'
          value={logradouro}
          onChange={(e) => {
            setLogradouro(e.target.value);
            setError('');
          }}
        />
        <Button className='button-search' type='submit' disabled={loading}>Buscar</Button>
      </form>

      <div className='results'>
        {selectedCep && (
          <Card className='card-selected'>
            <ResultItem data={selectedCep} />
          </Card>
        )}
      </div>

      {results && (
        <div className='results'>
          <p>Resultados para Florianópolis - SC</p>
          {results.map((item) => {
            return (
              <Card className={`card ${selectedCep?.cep === item.cep ? 'selected' : ''}`} key={item.cep} onClick={() => setSelectedCep(item)}>
                <ResultItem data={item} />
              </Card>
            )

          })}
        </div>
      )}

      {error && <p className='error'>{error}</p>}
      {loading && <p>Carregando...</p>}
    </section>
  )
}
