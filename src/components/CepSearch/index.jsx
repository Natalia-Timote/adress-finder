import './CepSearch.style.css';

export default function CepSearch({ cep, setCep, handleSearchCep, adress, error, setError, loading }) {
    return (
        <section className='cep'>
            <h2>Buscar endereço via CEP</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSearchCep();
            }}>
                <input
                    type="text"
                    placeholder='Insira o CEP'
                    value={cep}
                    onChange={(e) => {
                        setCep(e.target.value);
                        setError('');
                    }} />
                <button className='button-search' type='submit' disabled={loading}>Buscar</button>
            </form>

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
    )
}
