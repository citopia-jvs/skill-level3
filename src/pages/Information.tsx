import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useUserProvider } from "../provider/UserContext";

const Information: React.FC = () => {
    const { handleUserInformation, user } = useUserProvider();

    const initialValues = {
        firstName: "",
        lastName: "",
        birthDate: "",
    };

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("Prénom requis"),
        lastName: Yup.string().required("Nom requis"),
    });

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={() => {}}
            >
                {({ setFieldValue }) => {
                    const handleChange = (field: string, value: string) => {
                        setFieldValue(field, value);
                        handleUserInformation({ ...user, [field]: value });
                    };
                    return (
                        <Form className="flex flex-col items-center gap-y-4 w-full mt-12s">
                            <Field
                                className="border-2 border-indigo-500 h-12 p-2 w-[20%]"
                                placeholder="Prénom"
                                type="text"
                                name="firstName"
                                value={user?.firstName}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    handleChange("firstName", e.target.value);
                                }}
                            />
                            <ErrorMessage name="firstName" component="div" />
                            <Field
                                className="border-2 border-indigo-500 2 h-12 p-2 w-[20%]"
                                placeholder="Nom"
                                type="text"
                                name="lastName"
                                value={user?.lastName}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    handleChange("lastName", e.target.value);
                                }}
                            />
                            <ErrorMessage name="lastName" component="div" />
                            <Field
                                className="border-2 border-indigo-500 h-12 p-2 w-[20%]"
                                placeholder="Date de Naissance"
                                type="date"
                                name="birthDate"
                                value={user?.birthDate}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    handleChange("birthDate", e.target.value);
                                }}
                            />
                            <ErrorMessage name="birthDate" component="div" />
                        </Form>
                    );
                }}
            </Formik>
        </>
    );
};

export default Information;
