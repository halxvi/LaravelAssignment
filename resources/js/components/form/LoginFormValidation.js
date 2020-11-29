import * as yup from 'yup'

const FormikValidation = yup.object().shape({
  email: yup
    .string()
    .email('有効なメールアドレスを入力してください')
    .required('メールアドレスを入力してください'),
  password: yup
    .string()
    .required('パスワードを入力してください')
    .min(8, '8文字以上で入力してください')
    .max(30, '30文字以内で入力してください'),
})

export default FormikValidation
