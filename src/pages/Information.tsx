import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useUserProvider } from "../provider/UserContext";
import { User } from "../types/userTypes";

const Information: React.FC = () => {
    const { handleUserInformation, user } = useUserProvider();

    const initialValues: User = {
        firstName: user?.firstName,
        lastName: user?.lastName,
        birthDate: user?.birthDate,
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
                    const handleChange = (field: keyof User, value: string) => {
                        /* setFieldValue Inform Formik of field changes */
                        setFieldValue(field, value);

                        handleUserInformation({ [field]: value });
                    };
                    return (
                        <Form
                            role="form"
                            className="flex flex-col items-center gap-y-4 w-full mt-12s"
                        >
                            <div className="flex flex-col items-start lg:w-[20%]">
                                <label
                                    htmlFor="lastName"
                                    className="font-light text-indigo-800 pb-2"
                                >
                                    NOM
                                </label>
                                <Field
                                    className="border-2 border-indigo-500 2 h-12 p-2 lg:w-[100%]"
                                    placeholder="Nom"
                                    type="text"
                                    name="lastName"
                                    value={user?.lastName}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        handleChange(
                                            "lastName",
                                            e.target.value
                                        );
                                    }}
                                />
                                <ErrorMessage
                                    className="text-red-500"
                                    name="lastName"
                                    component="div"
                                />
                            </div>
                            <div className="flex flex-col items-start lg:w-[20%]">
                                <label
                                    htmlFor="firstName"
                                    className="font-light text-indigo-800 pb-2"
                                >
                                    PRENOM
                                </label>
                                <Field
                                    className="border-2 border-indigo-500 h-12 p-2 lg:w-[100%]"
                                    placeholder="Prénom"
                                    type="text"
                                    name="firstName"
                                    value={user?.firstName}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        handleChange(
                                            "firstName",
                                            e.target.value
                                        );
                                    }}
                                />
                                <ErrorMessage
                                    className="text-red-500"
                                    name="firstName"
                                    component="div"
                                />
                            </div>
                            <div className="flex flex-col items-start lg:w-[20%]">
                                <label
                                    htmlFor="birthDate"
                                    className="font-light text-indigo-800 pb-2"
                                >
                                    DATE DE NAISSANCE
                                </label>
                                <Field
                                    className="border-2 border-indigo-500 h-12 p-2 lg:w-[100%]"
                                    placeholder="Date de Naissance"
                                    type="date"
                                    name="birthDate"
                                    value={user?.birthDate}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        handleChange(
                                            "birthDate",
                                            e.target.value
                                        );
                                    }}
                                />
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </>
    );
};

export default Information;
