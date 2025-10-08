import "./Input.css";

/**
 * Composant Input réutilisable (input text ou date) avec label associé.
 * Gère la liaison entre le label et le champ via l’attribut htmlFor, et propage les changements de valeur avec onChange.
 * Permet de personnaliser le type d'un input, son placeholder, sa classe CSS, le caractère 'required' du champ, etc.
 */

interface InputProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    type?: "text" | "date";
    placeholder?: string;
    className?: string;
}

const Input: React.FC<InputProps> = ({ label, name, value, onChange, required = true, type = "text", placeholder, className = "" }) => {
    return (
        <div className="input">
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                type={type}
                placeholder={placeholder}
                className={className}
            />
        </div>
       
    );
}
  
export default Input;
