import '../../src/App.css';
import { useState } from 'react';
import { Button } from '../components/Button';
import { DescriptionPass } from '../components/DescriptionPass';
import { GeneratedPass } from '../components/GeneratedPass';
import { CopyIcon } from '../components/Icons';

export function Gerar() {
    const [description, setDescription] = useState('Clique em Gerar');
    const [showCreated, setShowCreated] = useState('');
    const [namePass, setNamePass] = useState();

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleshowCreated = (e) => {
        setShowCreated(e.target.value);
    };

    const generatePassword = async () => {

        try {
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.3.0' },
                body: JSON.stringify({ descricao: description }),
            };

            const response = await fetch('/create-pass', options)/*
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err))*/;

            if (response.status === 200) {
                console.log("Password created sucessfully");
                setDescription("");
                const created = await response.json();
                setShowCreated(created.senha);
                setNamePass(created.descricao);
            } else {
                console.log("Error during process");
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <div className='page1'>
                <h1 className='description'>DESCRIÇÃO:</h1>
                <DescriptionPass onChange={handleDescriptionChange} value={description} />
                <Button name={"Gerar"} onclick={generatePassword} />
                <h1 className='generated'>SENHA GERADA:</h1>
                <h2 className='descriptionName'>{namePass}</h2>
                <GeneratedPass onChange={handleshowCreated} value={showCreated}/>
                <CopyIcon className='copyIcon' onclick={() => navigator.clipboard.writeText(showCreated)/* Copia senha criada*/}/>
            </div>
        </>
    )
}