import './App.scss';
import {useState} from 'react';


function App() {
    const [inputArray, setInputArray] = useState([]);
    const [comment, setComment] = useState({
        userName:"",
        userPhoto:"",
        userText:""
    });

    const validateName = () => {
        const {userName} = comment;
        const reg = new RegExp(/(^|\s)\S/g); 
        const cleanWords = userName.toLowerCase().trim();
        const validatedName=cleanWords.replace(reg, function(upperCase){return upperCase.toUpperCase()});
        return validatedName;
    }

    const onChangeHandler = (e) => {
        setComment(
            {...comment, [e.target.name] : e.target.value});
    }

    let handleChange = (e) =>{
        setInputArray(current => [...current, {...comment}]);
        console.log(comment);
        console.log(inputArray);
        e.preventDefault();
        setComment({userName:'', userPhoto:'', userText:''});
    }


    return (
        <div className="wrapper">
        <h1 className="heading">Сервис комментариев со спам фильтром</h1>
        <div className="main">
            <form className="comment-form form">
                <h3 className="form__heading">Оставьте ваш комментарий</h3>
                <fieldset className="agreement">
                    <div className="agreement__question question">
                        <legend className="question__label">Показывать ваше имя?</legend>
                    </div>
                    <div className="agreement__answer">
                        <input className="answer--1" type="radio" id="yes" name="answer" value="yes" />
                        <label className="answer-label--1" htmlFor="yes">Да</label>
                    </div>
                    <div className="agreement__answer">
                        <input className="answer--2" type="radio" id="no" name="answer" value="no" />
                        <label className="answer-label--2" htmlFor="no">Нет</label>
                    </div>
                </fieldset>
                <div className="form__body">
                    <div className="username">
                        <label className="username__label" htmlFor="usernameInput">Введите ваше ФИО:</label>
                        <input className="username__input" value={comment.userName} onChange={onChangeHandler} type="text" id="usernameInput" name="userName" />
                    </div>
                    <div className="userpic">
                        <label className="userpic__label" htmlFor="userpicInput">Введите ссылку вашего аватара:</label>
                        <input className="userpic__input"  value={comment.userPhoto} onChange={onChangeHandler} type="url" id="userpicInput" name='userPhoto'/>
                    </div>
                    <div className="text">
                        <label className="text__label" htmlFor="textInput">Оставьте комментарий</label>
                        <textarea className="text__input"  value={comment.userText} onChange={onChangeHandler} name="userText" id="textInput" maxLength="800"></textarea>
                    </div>
                    <div className="comment-button">
                        <button onClick={handleChange} className="button">Отправить</button>
                    </div>
                </div>
            </form>
            <section className="chat">
                <h3 className="chat__heading">Чат</h3>
                <div className="chat-block">
                    {
                        inputArray.reverse().map((item, index) => {
                            return(
                                <div key={index} className={index===0? 'chat__comment first-comment' : 'chat__comment'}>
                                    <div className='comment__image'>
                                        <img className='avatar' src={item.userPhoto} alt="userImage" />
                                    </div>
                                    <div className='comment__username'>{item.userName}</div>
                                    <div className='comment__content'>{item.userText}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </section>

        </div>

        </div>
    );
}

export default App;
