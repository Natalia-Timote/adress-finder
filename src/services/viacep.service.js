const BASE_URL = 'https://viacep.com.br/ws';

export async function getCep(cep) {
    const response = await fetch(`${BASE_URL}/${cep}/json`);

    if (!response.ok) {
        throw new Error('Erro na API');
    }

    const data = await response.json();

    if (data.erro) {
        throw new Error('Nenhum resultado encontrado.');
    }

    return data;
}

export async function getStreet(uf, cidade, street) {
    const response = await fetch(`${BASE_URL}/${uf}/${cidade}/${street}/json/`);

    if (!response.ok) {
        throw new Error('Erro na API');
    }

    const data = await response.json();

    if (data.length === 0) {
        throw new Error('Nenhum resultado encontrado.');
    }

    return data;
}
