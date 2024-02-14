import '../App.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function Header() {
    const [optionPage1, setOptionPage1] = useState(true);
    const [optionPage2, setOptionPage2] = useState(false);

    const handleOptionSelectedChange = (clickedOption) => {
        if (clickedOption === 'page1' && !optionPage1) {
            setOptionPage1(true);
            setOptionPage2(false);
        } else if (clickedOption === 'page2' && !optionPage2) {
            setOptionPage1(false);
            setOptionPage2(true);
        }
        console.log(optionPage1, optionPage2);
    };

    return (
        <header className="headerPass">
            <nav>
                <ul className='listlinks'>
                    <li className={optionPage2 === true ? 'linkBack' : 'linkh'} onClick={() => handleOptionSelectedChange("page1")}><Link to="/" className='linkRouter'>GERAR</Link></li>
                    <li li className={optionPage1 === true ? 'linkBack' : 'linkh'} onClick={() => handleOptionSelectedChange("page2")}><Link to="/pass-list" className='linkRouter'>VER</Link></li>
                </ul>
            </nav>
        </header>
    )
}