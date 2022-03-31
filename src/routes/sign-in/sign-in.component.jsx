import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'

const SignIn = () => {
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup(); // 팝업으로 구글 로그인
        const userDocRef = await createUserDocumentFromAuth(user); // 사용자 정보 전달 및 firebase document 생성
    }
    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>
            <SignUpForm />
        </div>
    )
}
export default SignIn