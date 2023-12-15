import '../../src/App.css';
import { useEffect, useState } from 'react';
import { EditIcon, TrashIcon } from '../components/Icons';

export function Listar() {
    const [senhas, setSenhas] = useState([]);

    function dateFormat(received) {
        const noFormat = new Date(received);
        const day = noFormat.getDate().toString();
        const month = noFormat.getMonth() + 1;
        const year = noFormat.getFullYear().toString();

        return `${day}/${month}/${year}`;
    }

    function daysPassed(received) {
        const today = new Date();
        const firstDate = new Date(received);

        const diffMs = today - firstDate;
        const diffDays = Math.floor(diffMs / (24 * 60 * 60 * 1000));

        if (diffDays === 0) {
            return `Hoje`;
        } else if (diffDays === 1) {
            return `há ${diffDays} dia`;
        } else {
            return `há ${diffDays} dias`;
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const options = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.3.0' }
                };

                const response = await fetch('/get-all-pass', options);

                const passList = await response.json();

                if (response.status === 200) {
                    setSenhas(passList);
                    console.log(passList);
                } else {
                    console.log("Erro durante o processo !")
                }
            } catch (err) {
                console.log(err);
            }

        }
        fetchData();
    }, []);

    return (
        <>
            <div className='page2'>
                <h1 className='generated'>SENHAS GERADAS</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Descrição</th>
                            <th>Senha</th>
                            <th>Criação</th>
                            <th>Criado</th>
                            <th>Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        {senhas && senhas.map((senha, index) => (
                            <tr key={senha._id} className={index % 2 === 0 ? 'trBack' : ''}>
                                <td className='tdnowrap'>{senha.descricao}</td>
                                <td>{senha.senha}</td>
                                <td>{dateFormat(senha.criacao)}</td>
                                <td className='tdnowrap'>{daysPassed(senha.criacao)}</td>
                                <EditIcon className='opIcon' />
                                <TrashIcon />
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
