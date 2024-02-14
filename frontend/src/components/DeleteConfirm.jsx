import '../App.css';
import { CancelIcon, ConfirmIcon } from '../components/Icons';

export function DeleteConfirm(props) {

    const handleConfirmDelete = () => {
        props.onConfirmDelete();
    }

    return (
        <div className={'backGroundDe'}>
            <div className='confirmDelete'>
                <h1>Confirmar Exclusão?</h1>
                <div className='iconsOptions'>
                    <ConfirmIcon onClick={handleConfirmDelete} />
                    <CancelIcon />
                </div>
            </div>
        </div>
    )
}