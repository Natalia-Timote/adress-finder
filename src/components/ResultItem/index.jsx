import './ResultItem.style.css';

export default function ResultItem({ data }) {
    return (
        <>
            <p>CEP: {data.cep}</p>
            <p>Endereço: {data.logradouro}</p>
            <p>Bairro: {data.bairro}</p>
            <p>Cidade: {data.localidade}</p>
            <p>Estado: {data.uf}</p>
        </>
    )
}
