import "./PageTitle.css";

/**
 * Composant PageTitle réutilisable.
 * Il permet d'afficher un titre de page et prend en props un titre et une className (otpionnel).
 * Il est utile pour uniformiser l'affichage des titres sur les différentes pages de l'application.
 */

interface PageTitleProps {
    title: string;
    className?: string
}

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
    return (
        <div>
            <div className='pageTitle'>{title}</div>
        </div>
    );
}
  
export default PageTitle;