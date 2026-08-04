import logo from '../../assets/ferrepalLogo.png';
import user from '../../assets/user.svg'

export const AsideMain = ({ logOut, username }) => {

    return (
        <>
            <img className='logoFerre' src={logo} />

            <div className="user">

                <button className='btnUser' onClick={() => {
                    document.getElementById('hide_Button').getAttribute('show') === "false" ?
                        (document.getElementById('hide_Button').setAttribute('show', true))
                        :
                        (document.getElementById('hide_Button').setAttribute('show', false))
                }}>
                    <img className='user_Auth_logo' src={user} />
                    <span className='user_name'>{username}</span>
                </button>

                <button className='hide_Button' id='hide_Button' show="false" onClick={logOut}>
                    <span>Cerrar sesion</span>
                </button>

            </div>
        </>
    )
}