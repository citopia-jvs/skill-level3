import './About.css';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserInfosAction } from '../../redux/slices/userSlice';
import { FormData } from '../../types';
import { RootState } from '../../redux/store';

const schema = z.object({
  nom: z.string().min(2, 'Le nom doit avoir au moins 2 caractères').max(60, 'Le nom doit avoir moins de 20 caractères').trim(),
  prenom: z.string().min(2, 'Le prénom doit avoir au moins 2 caractères').max(155, 'Le nom doit avoir moins de 20 caractères').trim(),
  dateNaissance: z.string().optional(),
});

function About() {
  const dispatch = useDispatch();
  const userValues = useSelector((state: RootState) => state.user);

  const {
    control,
    register,
    // watch,
    handleSubmit,
    formState: { errors, validatingFields, isDirty },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const userdata = Object.values(userValues).every((value) => value === null) ? data : { ...userValues, ...data };
    dispatch(registerUserInfosAction(userdata));
  };

  return (
    <>
      <h1 className='about-title' data-testid='about-title'>
        Vos informations
      </h1>

      <form className='about-form' data-testid='form' onFocus={() => isDirty && validatingFields} onBlur={handleSubmit(onSubmit)}>
        <div className='input-container'>
          <label htmlFor='nom'>Nom :&nbsp;</label>
          <input type='text' id='nom' {...register('nom', { required: true, value: userValues.nom })} />
          {errors.nom && <div style={{ color: 'red' }}>{errors.nom.message}</div>}
        </div>
        <div className='input-container'>
          <label htmlFor='prenom'>Prénom :&nbsp;</label>
          <input type='text' id='prenom' {...register('prenom', { required: true, value: userValues.prenom })} />
          {errors.prenom && <div style={{ color: 'red' }}>{errors.prenom.message}</div>}
        </div>
        <div className='input-container'>
          <label>Date de naissance :&nbsp;</label>
          <Controller
            control={control}
            name='dateNaissance'
            render={({ field }) => (
              <DatePicker
                locale='fr-FR'
                dayPlaceholder='Jour'
                monthPlaceholder='Mois'
                yearPlaceholder='Année'
                showLeadingZeros={true}
                disableCalendar={true}
                onChange={(date) => {
                  const year = date ? new Date(date.toString()).getFullYear().toString() : null;
                  if (date && !year?.startsWith('0')) {
                    field.onChange(date?.toString());
                  }
                }}
                value={userValues.dateNaissance}
              />
            )}
          />
          {errors.dateNaissance && <div style={{ color: 'red' }}>{errors.dateNaissance.message}</div>}
        </div>
      </form>
    </>
  );
}

export default About;
