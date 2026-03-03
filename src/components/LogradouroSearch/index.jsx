import './LogradouroSearch.style.css';

export default function LogradouroSearch({ logradouro, setLogradouro, handleSearchLogradouro, results, selectedCep, setSelectedCep, error, setError, loading }) {
  return (
    <section className='logradouro'>
      <h2>Buscar CEP via logradouro</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSearchLogradouro();
      }}>
        <input
          type="text"
          placeholder='Insira o logradouro'
          value={logradouro}
          onChange={(e) => {
            setLogradouro(e.target.value);
            setError('');
          }}
        />
        <button className='button-search' type='submit' disabled={loading}>Buscar</button>
      </form>

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
  )
}
