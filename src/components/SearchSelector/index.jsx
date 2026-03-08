import Button from '../Button';
import './SearchSelector.style.css';

export default function SearchSelector({ onChangeScreen }) {
    return (
        <section className='search-selector'>
            <div>
                <img className='address-logo' src="./address.png" alt="" />
                <h1>Address Finder</h1>
            </div>
            <div className='screen-buttons'>
                <Button onClick={() => onChangeScreen('cep')}>Buscar com CEP</Button>
                <Button onClick={() => onChangeScreen('street')}>Buscar com logradouro</Button>
            </div>
        </section>
    )
}
