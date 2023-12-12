import '../../src/App.css';
import { useEffect, useState } from 'react';

export function Listar() {
    const [senhas, setSenhas] = useState([]);
    
    return (
        <>
            <h1>SENHAS GERADAS</h1>
            <table>
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th>Senha</th>
                    </tr>
                </thead>
                <tbody>
                    {senhas.map((senha) => (
                        <tr key={senha._id}>
                            <td>{senha.descricao}</td>
                            <td>{senha.senha}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
