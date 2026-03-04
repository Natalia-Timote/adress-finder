import Button from '../Button';
import Card from '../Card';
import Input from '../Input';
import ResultItem from '../ResultItem';
import './CepSearch.style.css';

export default function CepSearch({ cep, setCep, handleSearchCep, adress, error, setError, loading }) {
    return (
        <section className='cep'>
            <h2>Buscar endereço via CEP</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSearchCep();
            }}>
                <Input
                    placeholder='Insira o CEP'
                    value={cep}
                    onChange={(e) => {
                        setCep(e.target.value);
                        setError('');
                    }} />
                <Button className='button-search' type='submit' disabled={loading}>Buscar</Button>
            </form>

            <div className='results'>
                {adress && (
                    <Card className='card'>
                        <ResultItem data={adress} />
                    </Card>
                )}
            </div>

            {error && <p className='error'>{error}</p>}
            {loading && <p>Carregando...</p>}
        </section>
    )
}
