const EMAIL_ERROR = "Некорректный e-mail";
const PASSWD_ERROR = `Пароль должен быть не короче 7 символов и содержать только латинские буквы, цифры и "_".`;

export const validateUserForm = (email: string, password: string) => {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return EMAIL_ERROR;
    } else if (
        !/^[a-zA-Z0-9_]{7,}$/.test(password) ||
        !/[a-z]+/.test(password) ||
        !/[A-Z]+/.test(password) ||
        !/[0-9]+/.test(password)
    ) {
        return PASSWD_ERROR;
    } else {
        return null;
    }
};
