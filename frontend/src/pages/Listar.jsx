import '../../src/App.css';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { EditIcon, TrashIcon } from '../components/Icons';
import { DeleteConfirm } from '../components/DeleteConfirm';

export function Listar() {
    const [senhas, setSenhas] = useState([]);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(undefined);

    function dateFormat(received) {
        const noFormat = new Date(received);
        const day = noFormat.getDate().toString();
        const month = Number(noFormat.getMonth() + 1).toString();
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
                } else {
                    console.log("Erro durante o processo !")
                }
            } catch (err) {
                console.log(err);
            }

        }
        fetchData();
    }, [showDeleteConfirm]);

    const handleDeleteClick = (id) => {
        setShowDeleteConfirm(id);
    }

    async function handleConfirmDelete(isVisible) {

        try {
            const options = { method: 'DELETE', headers: { 'User-Agent': 'insomnia/8.3.0' } };

            const response = await fetch(`/delete-pass/${showDeleteConfirm}`, options);

            toast.success("Senha Apagada com sucesso !", {
                position: toast.POSITION.BOTTOM_RIGHT,
                theme: "dark"
            });

        } catch (error) {
            console.log(error)

        }
        setShowDeleteConfirm(isVisible);
    }

    return (
        <>
            <div className='page2'>
                <h1 className='generated'>SENHAS GERADAS</h1>
                <ul>
                    <li className='descri'>Descrição:</li>
                    <li className='descri'>Senha:</li>
                    <li className='descri'>Criação:</li>
                    <li className='descri'>Criado:</li>
                    <li className='descri'>Opções</li>
                </ul>
                <div className='table-container'>
                    <table>
                        <tbody>
                            {senhas && senhas.map((senha, index) => (
                                <tr key={senha._id} className={index % 2 === 0 ? 'trBack' : ''}>
                                    <td className='tdnowrap'>{senha.descricao}</td>
                                    <td>{senha.senha}</td>
                                    <td>{dateFormat(senha.criacao)}</td>
                                    <td className='tdnowrap'>{daysPassed(senha.criacao)}</td>
                                    <EditIcon />
                                    <TrashIcon onclick={() => { handleDeleteClick(senha._id) }} />
                                </tr>
                            )).reverse()}
                        </tbody>
                    </table>
                </div>
                {showDeleteConfirm && <DeleteConfirm className='boxDelete' onConfirmDelete={() => handleConfirmDelete(undefined)} />}
            </div>
            <ToastContainer />
        </>
    );
}
