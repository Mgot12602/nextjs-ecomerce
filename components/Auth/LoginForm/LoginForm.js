import { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { loginApi, resetPasswordApi } from "../../../api/user";
import useAuth from "../../../hooks/useAuth";

export default function LoginForm({ showRegisterForm, onCloseModal }) {
  const [loading, setLoading] = useState(false);
  const { auth, login } = useAuth();
  console.log("auth inside loginForm", auth);

  const formik = useFormik({
    initialValues: initialValues(),
    validationShchema: Yup.object(validationShchema()),
    onSubmit: async (formData) => {
      console.log(formData);
      setLoading(true);
      const response = await loginApi(formData);
      if (response?.jwt) {
        login(response.jwt);
        onCloseModal();
      } else {
        toast.error("El email o la contraseña són incorrectos");
      }

      setLoading(false);
    },
  });

  const resetPassword = () => {
    formik.setErrors({});

    const validateEmail = Yup.string().email().required();
    console.log(formik.values.identifier);

    if (!validateEmail.isValidSync(formik.values.identifier)) {
      console.log("email incorrecto");
      formik.setErrors({ identifier: true });
    } else {
      resetPasswordApi(formik.values.identifier);
    }
  };
  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="identifier"
        type="text"
        placeholder="correo electronico"
        onChange={formik.handleChange}
        error={formik.errors.identifier}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Contraseña"
        onChange={formik.handleChange}
        error={formik.errors.password}
      />
      <div className="actions">
        <Button onClick={showRegisterForm} basic>
          Registrarse
        </Button>
        <div>
          <Button className="submit" type="submit" loading={loading}>
            Entrar
          </Button>
          <Button onClick={resetPassword} type="button">
            ¿Has olvidado la contraseña?
          </Button>
        </div>
      </div>
    </Form>
  );
}

function initialValues() {
  return {
    identifier: "",
    password: "",
  };
}

function validationShchema() {
  return {
    identifier: Yup.string().email(true).required(true),
    password: Yup.string().required(true),
  };
}
