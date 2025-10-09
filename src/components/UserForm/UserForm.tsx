import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUserStore } from "../../stores/userStore";
import { useEffect } from "react";
import "../../styles/components/UserForm.css";

const userSchema = z.object({
  firstName: z.string().min(1, "Le prénom est requis"),
  lastName: z.string().min(1, "Le nom est requis"),
  birthDate: z.string().min(1, "La date de naissance est requise"),
});

type UserFormData = z.infer<typeof userSchema>;

export const UserForm = () => {
  const { firstName, lastName, birthDate, setUser } = useUserStore();

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: { firstName, lastName, birthDate },
    mode: "onBlur",
  });

  useEffect(() => {
    const subscription = watch((value) => {
      setUser(value as Partial<UserFormData>);
    });
    return () => subscription.unsubscribe();
  }, [watch, setUser]);

  return (
    <form className="user-form">
      <div className="form-field">
        <label htmlFor="firstName">Prénom</label>
        <input
          id="firstName"
          type="text"
          {...register("firstName")}
          aria-invalid={errors.firstName ? "true" : "false"}
        />
        {errors.firstName && (
          <span className="error">{errors.firstName.message}</span>
        )}
      </div>
      <div className="form-field">
        <label htmlFor="lastName">Nom de Famille</label>
        <input
          id="lastName"
          type="text"
          {...register("lastName")}
          aria-invalid={errors.lastName ? "true" : "false"}
        />
        {errors.lastName && (
          <span className="error">{errors.lastName.message}</span>
        )}
      </div>
      <div className="form-field">
        <label htmlFor="birthDate">Date de naissance</label>
        <input
          id="birthDate"
          type="date"
          {...register("birthDate")}
          aria-invalid={errors.birthDate ? "true" : "false"}
        />
        {errors.birthDate && (
          <span className="error">{errors.birthDate.message}</span>
        )}
      </div>
    </form>
  );
};
