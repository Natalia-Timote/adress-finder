import Button from '../Button';
import './SearchSelector.style.css';

export default function SearchSelector({ onChangeScreen }) {
    return (
        <section className='search-selector'>
            <img className='address-logo' src="./address.png" alt="" />
            <h1>Address Finder</h1>
            <Button onClick={() => onChangeScreen('cep')}>Buscar com CEP</Button>
            <Button onClick={() => onChangeScreen('street')}>Buscar com logradouro</Button>
        </section>
    )
}
